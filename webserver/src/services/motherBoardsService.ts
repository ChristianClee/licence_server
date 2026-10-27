import { dbReq, indexDb } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import type { i_motherBoard_table } from '@/types/tablesDb.js'
import { filter_deleted_date_time } from '@/utils/index.js'

// export const pathDbRequest = `motherboard/${e_nameTablesDb.Mother_board}_`
interface i_common_table extends RowDataPacket, i_motherBoard_table {}


export async function getAllMotherBoardDb(id_company: number, is_filter:boolean, ): Promise <i_motherBoard_table[] >
{
    // const sqlRequest = `${pathDbRequest}${e_methodsDb.GetAll}.sql`
    const sqlRequest_1 = 
        "SELECT Mother_board.* "
        + "FROM Mother_board "
        + "JOIN Licence_subscribe ON Mother_board.id_Licence_subscribe = Licence_subscribe.id "
        + "JOIN Licence_free ON Licence_subscribe.id_Licence_free = Licence_free.id "
        + "JOIN Company ON Licence_free.id_Company = Company.id "
        + "WHERE Company.id = ? "
        + ";"
    const response = await indexDb<i_common_table[]>('execute', sqlRequest_1 , [id_company])
    if(is_filter)
    {
        return filter_deleted_date_time(response)
    }
    return response
}
export async function addMotherBoardDb(id_licence_subscribe:number, serial_number:string, model_number:string):Promise < number >
{
    const sqlRequest_1 = 
        "INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number) "
        + "VALUES (?,?,?);"
    const response = await indexDb<ResultSetHeader>('execute', sqlRequest_1, [id_licence_subscribe, serial_number, model_number])
    return response.insertId

}
export async function setDeleteMotherBoardDb(id_set_delete:number)
{
    const sqlRequest_1 = 
        "SELECT EXISTS ( "
        + "SELECT * FROM Mother_board "
        + "WHERE id = ?) "
        + "AS exists_flag"
        + ";"

    const sqlRequest_2 = 
        "UPDATE Mother_board "
        + "SET Mother_board.deleted_date_time  = CURRENT_TIMESTAMP "
        + "WHERE id = ?"
        + ";"
    const isExist = await indexDb<i_exist[]>('execute', sqlRequest_1, [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await indexDb<ResultSetHeader>('execute', sqlRequest_2, [id_set_delete])
}

export async function isExistSerialAndModelInMotherBoardDb(motherboard_serial_number:string, motherboard_model_number: string): Promise<boolean>
{
    // const sqlRequest_IsExist = `${pathDbRequest}IsExist_by_serial_and_model_number.sql`
    const sqlRequest_1 = 
        "SELECT EXISTS ( "
        "SELECT * "
        "FROM Mother_board "
        "WHERE Mother_board.serial_number = ? "
        "AND Mother_board.model_number = ? "
        "AND Mother_board.deleted_date_time IS NULL ) "
        "AS exists_flag"
        ";"
    const isExist = await indexDb<i_exist[]>('execute', sqlRequest_1 , [motherboard_serial_number, motherboard_model_number])
    if( isExist[0]?.exists_flag)
    {
        return true
    }
    return false
}