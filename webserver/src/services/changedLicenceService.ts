import { dbReq, pool, dbTransactionReq, indexDb, indexTransactionDb } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type { i_exist, i_id } from '@/types/other.js'

import type { i_motherBoard_table } from '@/types/tablesDb.js'
import { e_motherBoard_table } from '@/types/tablesDb.js'


// const pathDbRequest = `changedLicence/${e_nameTablesDb.Changed_licence_req}_`
interface i_common_table extends RowDataPacket, i_motherBoard_table {}

export async function getAllChangedLicenceDb(){

}
export async function addChangedLicenceDb(
    id_user: number,
    id_motherBoard: number,
    serial_number_new_board: string,
    model_number_new_board: string,
    created_ip: string,

): Promise<number | Error>
{

    const isExist = await isExistChangedLicenceDb(serial_number_new_board, model_number_new_board)
    if( isExist.exists_flag ){
        throw new Error(`serial_number_new_board = ${serial_number_new_board} and model_number_new_board = ${model_number_new_board} are existed already in DB`)
    }

    const sqlRequest_1 =
        "INSERT INTO Changed_licence_req(id_User, id_Mother_board, serial_number_new_board, model_number_new_board, created_ip) "
        + "VALUES (?,?,?,?,?)"
        + ";"

    const response = await indexDb<ResultSetHeader>('execute', sqlRequest_1, [id_user, id_motherBoard, serial_number_new_board, model_number_new_board, created_ip])
    return response.insertId;
}

export async function setDeleteChangedLicenceDb(id_set_delete: number){

}

export async function isExistChangedLicenceDb(serial_number_new_board: string , model_number_new_board: string):Promise<i_exist >
{
    const sqlRequest_1 = 
        "SELECT EXISTS( "
        + "SELECT * FROM Changed_licence_req "
        + "WHERE Changed_licence_req.serial_number_new_board = ? "
        + "AND Changed_licence_req.model_number_new_board = ? ) "
        + "AS exists_flag"
        + ";"
    const isExist = await indexDb<i_exist[]>('execute',sqlRequest_1 , [serial_number_new_board, model_number_new_board])
    if(isExist[0]){
        return isExist[0]
    }else{
        throw new Error('unseccesfully atampt to select form Db')
    }
}

export async function getIdChangedLicenceDb(serial_number_new_board: string, model_number_new_board: string):Promise< number | null >
{
    const sqlRequest_1 = 
        "SELECT Mother_board.id "
        + "FROM Mother_board "
        + "JOIN Changed_licence_req ON Changed_licence_req.id_Mother_board = Mother_board.id "
        + "WHERE Mother_board.deleted_date_time IS NULL "
        + "AND Changed_licence_req.deleted_date_time IS NULL "
        + "AND Changed_licence_req.serial_number_new_board = ? "
        + "AND Changed_licence_req.model_number_new_board = ? "
        + ";"
    const id_motherBoard = await dbReq<i_id[]>('execute', sqlRequest_1, [serial_number_new_board, model_number_new_board])
    if(id_motherBoard[0]?.id)
    {
        return id_motherBoard[0].id
    }
    else
    {
        return null
    }
}

export async function changeLicence_tr_Db(
    id_motherBoard: number,
    motherboard_serial_number: string,
    motherboard_model_number: string
):Promise< void >
{
    const sqlRequest_1 =
        "UPDATE Mother_board "
        + "SET Mother_board.deleted_date_time = CURRENT_TIMESTAMP "
        + "WHERE id = ?"
        + ";"
    const sqlRequest_2 =
        "SELECT * FROM Mother_board "
        + "WHERE Mother_board.id = ?"
        + ";"
    const sqlRequest_3 =
        "INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number) "
        + "VALUES (?,?,?)"
        + ";"

    const connection = await pool.getConnection();
    async function transaction()
    {
        await indexTransactionDb<ResultSetHeader>(connection, 'execute', sqlRequest_1, [id_motherBoard])
        const deleted_motherBoard =  (await indexTransactionDb<i_common_table[]>(connection, 'execute', sqlRequest_2, [id_motherBoard]))[0]
        if(! deleted_motherBoard ) throw new Error('No subscribed licence')
        const id_Licence_subscribe = deleted_motherBoard[e_motherBoard_table.id_Licence_subscribe]
        await indexTransactionDb(connection, 'execute', sqlRequest_3, [id_Licence_subscribe, motherboard_serial_number, motherboard_model_number] )
    }

    try{
        await connection.beginTransaction();
        await transaction();
        await connection.commit();
    }catch(err){
        await connection.rollback();
        throw err
    }finally{
        connection.release()
    }
}