import { pool, dbReq } from "@/db.js"
import { e_updateType } from "@/types/other.js"
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const pathDbRequest = `price/${e_nameTablesDb.Price}_`

export async function getAllPriceDb(){
}
 
export async function addPriceDb(id_avarage_price: number, contract_price: number | null = null): Promise<number>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const response = await dbReq<ResultSetHeader>('execute', sqlRequest, [id_avarage_price, contract_price])
    return response.insertId
}

export async function updateAveragePriceDb(id_price: number){
}

export async function deletePriceDb(id_price: number){
    const sqlRequest_IsExist = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const sqlRequest_DeleteOne = `${pathDbRequest}${e_methodsDb.DeleteOne}.sql`

    const isExist = await dbReq<i_exist[]>('execute', sqlRequest_IsExist, [id_price])
    if( isExist[0]?.exists_flag){
        dbReq('execute', sqlRequest_DeleteOne, [id_price])
    }
}