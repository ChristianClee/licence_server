import { dbReq, pool, dbTransactionReq } from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import { e_updateType } from "@/types/other.js"
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type { i_averagePrice_table } from '@/types/tablesDb.js'
import { e_averagePrice_table,  } from '@/types/tablesDb.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2"


const pathDbRequest = `averagePrice/${e_nameTablesDb.Average_price}_`

interface i_averagePrice_table_db extends RowDataPacket, i_averagePrice_table{}


export async function getAllAveragePriceDb(is_filter:boolean): Promise<i_averagePrice_table[] | Error>
{ 
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetAll}.sql`
    const response = await dbReq<i_averagePrice_table_db[]>('query', sqlRequest);
    if(is_filter)
    {
        return  filter_deleted_date_time(response)
    }
    return response
}
 
export async function addAveragePriceDb(id_licence_type: number, price: number | null = null ): Promise<number | Error>
{
    const sqlRequest_GetId = `${pathDbRequest}${e_methodsDb.GetId}.sql`
    const sqlRequest_SetDeleted = `${pathDbRequest}${e_methodsDb.SetDeleted}.sql`
    const sqlRequest_AddOne = `${pathDbRequest}${e_methodsDb.AddOne}.sql`

    const connection = await pool.getConnection();
    let response: number = 0
    try{

        await connection.beginTransaction();
        const average_price_not_null_list = await dbTransactionReq< i_averagePrice_table_db []>(connection, 'execute', sqlRequest_GetId, [id_licence_type] )
        for(let i of average_price_not_null_list){
            const id_averagePrice = i[e_averagePrice_table.id]
            await dbTransactionReq<ResultSetHeader>(connection, 'execute', sqlRequest_SetDeleted, [id_averagePrice] )
        }
        response = (await dbTransactionReq<ResultSetHeader>(connection, 'execute', sqlRequest_AddOne, [id_licence_type, price] )).insertId
        await connection.commit()
    }catch(err){
        await connection.rollback()
        throw err;
    }finally{
        connection.release()
    }
    return response
}