import { dbReq, pool, dbTransactionReq } from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import { e_updateType } from "@/types/other.js"
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type { i_averagePrice_table } from '@/types/tablesDb.js'
import { e_averagePrice_table,  } from '@/types/tablesDb.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2"


export const pathDbRequest = `badRequest/${e_nameTablesDb.Bad_request}_`



export async function addBadRequestDb(id_Url: number | null, created_ip: string, err: Error,): Promise<number>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    let response
    if(id_Url){
        response = await dbReq<ResultSetHeader>('execute', sqlRequest, [ id_Url, created_ip, err ])
    }else{
        response = await dbReq<ResultSetHeader>('execute', sqlRequest, [ null, created_ip, err ])
    }
    return response.insertId;

}