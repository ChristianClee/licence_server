import { dbReq, pool, dbTransactionReq, indexDb, indexTransactionDb } from "@/db.js"
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
    const sqlRequest_1 = 
        "SELECT * from Average_price";
        
    const response = await indexDb<i_averagePrice_table_db[]>('query', sqlRequest_1);
    if(is_filter)
    {
        return  filter_deleted_date_time(response)
    }
    return response
}
 
export async function addAveragePrice_Tr_Db(id_licence_type: number, price: number | null = null ): Promise<number | Error>
{
    const sqlRequest_1 = 
        "SELECT * FROM Average_price "
        + "WHERE Average_price.deleted_date_time IS NULL "
        + "AND Average_price.id_Licence_type = ?;"

    const sqlRequest_2 = 
        "UPDATE Average_price "
        + "SET Average_price.deleted_date_time = CURRENT_TIMESTAMP WHERE id = ?;"

    const sqlRequest_3 = 
        "INSERT INTO Average_price(id_Licence_type, price) "
        + "VALUES(?,?);"
        
    const connection = await pool.getConnection();
    let response: number = 0
    async function transaction()
    {
        const average_price_not_null_list = await indexTransactionDb< i_averagePrice_table_db []>(connection, 'execute', sqlRequest_1, [id_licence_type] )
        for(let i of average_price_not_null_list){
            const id_averagePrice = i[e_averagePrice_table.id]
            await indexTransactionDb<ResultSetHeader>(connection, 'execute', sqlRequest_2, [id_averagePrice] )
        }
        response = (await indexTransactionDb<ResultSetHeader>(connection, 'execute', sqlRequest_3, [id_licence_type, price] )).insertId
    }

    try{
        await connection.beginTransaction();
        await transaction()
        await connection.commit()
    }catch(err){
        await connection.rollback()
        throw err;
    }finally{
        connection.release()
    }
    return response
}