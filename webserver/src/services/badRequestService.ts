import { dbReq, pool, dbTransactionReq, indexDb } from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import { e_updateType } from "@/types/other.js"
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type { i_averagePrice_table } from '@/types/tablesDb.js'
import { e_averagePrice_table,  } from '@/types/tablesDb.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2"


export const pathDbRequest = `badRequest/${e_nameTablesDb.Bad_request}_`



export async function addBadRequestDb(
    id_Url: number | null,
    serial_number: string,
    model_number: string,
    created_ip: string,
    err: Error
): Promise<number>
{
    const sqlRequest_1 = 
    "INSERT INTO Bad_request(id_Url, serial_number, model_number, created_ip,  error_message) "
    + "VALUES (?, ?, ?, ?, ?)"

    let response
    if(id_Url){
        response = await indexDb<ResultSetHeader>('execute', sqlRequest_1, [ id_Url, serial_number, model_number, created_ip, err.stack ])
    }else{
        response = await indexDb<ResultSetHeader>('execute', sqlRequest_1, [ null,  serial_number, model_number, created_ip, err.stack ])
    }
    return response.insertId;

}