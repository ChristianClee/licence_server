import { dbReq, pool, dbTransactionReq, indexDb, indexTransactionDb } from "@/db.js"
// import { PoolConnection } from ''
import type { RowDataPacket, ResultSetHeader, PoolConnection } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'

// const pathDbRequest = `licencesSubscribed/${e_nameTablesDb.Licence_subscribe}_`


export async function getAllSubscribedLicenceDb(){ 

}
export async function addSubscribeLicence_tr_Db(
    id_licence_free: number,
    id_url: number,
    created_ip: string,
    serial_number_motherBoard: string,
    model_number_motherBoard: string,
):Promise< void >{ 
    const sqlRequest_1 = 
        "INSERT INTO Licence_subscribe(id_Licence_free, id_Url, created_ip) "
        + "VALUES (?,?,?)"
        + ";"
    const sqlRequest_2 = 
        "INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number)"
        + "VALUES (?,?,?)"
        + ";"
    async function transaction()
    {
        const id_licence_subscribed = (await indexTransactionDb<ResultSetHeader>(
            connection,
            'execute',
            sqlRequest_1,
            [id_licence_free, id_url, created_ip]
        )).insertId
        await indexTransactionDb<ResultSetHeader>(
            connection,
            'execute',
            sqlRequest_2,
            [id_licence_subscribed, serial_number_motherBoard, model_number_motherBoard]
        )
    }
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        await transaction();
        await connection.commit();
    }catch(err){
        await connection.rollback();
        throw err;
    }finally{
        connection.release();
    }
}

export async function setDeletedSubscribedLicenceDb(id_set_delete:number): Promise<void | Error>{
    const sqlRequest_1 = 
        "SELECT EXISTS ( "
        + "SELECT * FROM Licence_subscribe " 
        + "WHERE Licence_free.id = ? ) "
        + "AS exists_flag"
        + ";"
    const sqlRequest_2 = 
        "UPDATE Licence_free " 
        + "SET Licence_subscribe.deleted_date_time = CURRENT_TIMESTAMP " 
        + "WHERE id = ?"
        + ";"
    const isExist = await indexDb<i_exist[]>('execute', sqlRequest_1 , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await indexDb<ResultSetHeader>('execute', sqlRequest_2, [id_set_delete])
}


   