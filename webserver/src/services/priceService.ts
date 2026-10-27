import { pool, dbReq, indexDb } from "@/db.js"
import { e_updateType } from "@/types/other.js"
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// const pathDbRequest = `price/${e_nameTablesDb.Price}_`

export async function getAllPriceDb(){
}
 
export async function addPriceDb(id_avarage_price: number, contract_price: number | null = null): Promise<number>
{
    const sqlRequest_1 = 
        "INSERT INTO Price(id_Average_price, contract_price) "
        + "VALUES (?,?);"
    const response = await indexDb<ResultSetHeader>('execute', sqlRequest_1, [id_avarage_price, contract_price])
    return response.insertId
}

export async function updateAveragePriceDb(id_price: number){
}

export async function deletePriceDb(id_price: number){
    const sqlRequest_1 = 
        "SELECT EXISTS ( "
        + "SELECT * FROM Price WHERE id = ? ) "
        + "AS exists_flag"
        + ";"
    const sqlRequest_2 = 
        "DELETE FROM Price WHERE id = ?;"

    const isExist = await indexDb<i_exist[]>('execute', sqlRequest_1, [id_price])
    if( isExist[0]?.exists_flag){
        dbReq('execute', sqlRequest_2, [id_price])
    }
}