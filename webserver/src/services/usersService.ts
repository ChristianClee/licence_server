import { dbReq, indexDb } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'

// const pathDbRequest = `users/${e_nameTablesDb.User}_`


export async function getAllUserDb(){

}

export async function addUserDb(
    id_company: number,
    id_permission: number,
    password: string,
    email: string,
    phone: string | null = null
): Promise <number | Error>
{
    const sqlRequest_1 = 
    "INSERT INTO User(id_Company, id_Permission, password, email, phone) "
    + "VALUES (?,?,?,?,?)"
    + ";"
    const response = await indexDb<ResultSetHeader>('execute', sqlRequest_1 , [id_company, id_permission, password, email, phone]);
    return response.insertId
}

export async function setDeleteUserDb(id_set_delete: number){

}