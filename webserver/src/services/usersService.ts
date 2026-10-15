import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'

const pathDbRequest = `users/${e_nameTablesDb.User}_`


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
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const response = await dbReq<ResultSetHeader>('execute', sqlRequest , [id_company, id_permission, password, email, phone]);
    return response.insertId
}

export async function setDeleteUserDb(id_set_delete: number){

}