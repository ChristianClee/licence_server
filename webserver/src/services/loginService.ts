import { indexTransactionDb, indexDb, pool } from "@/db.js"
import {e_permissionRole_column, e_permissionRole_superUser } from '@/types/columnsDb.js'
import type { i_exist, i_id } from '@/types/other.js'
import  { e_passwords, e_permission_table } from '@/types/tablesDb.js'
import type { i_passwords } from '@/types/tablesDb.js'
import type{ RowDataPacket } from "mysql2";

interface i_passwords_all extends RowDataPacket, i_passwords {}
interface i_permission_name extends RowDataPacket {
    [e_permission_table.name]: e_permissionRole_column
}


export async function getHashPasswordDb(
    email: string
):Promise< i_passwords | null>
{
    const sqlRequest_1 =
        "SELECT * FROM Passwords "
        + "WHERE Passwords.email = ? "
        + ";"

    const hash = await indexDb<i_passwords_all[]>('execute', sqlRequest_1 , [email])
    if(hash[0]){
        return hash[0]
    }else{
        return null
    }
}

export async function getPermissionFromUsersAdmins(id_password:number): Promise<e_permissionRole_superUser | e_permissionRole_column | null>
{
    const sqlRequest_1 =
    "SELECT EXISTS "
    + "( SELECT * FROM Super_admin "
    + "WHERE Super_admin.id_Passwords = ?) "
    + "AS exists_flag "
    + ";"
    const sqlRequest_2 =
    "SELECT EXISTS "
    + "( SELECT * FROM User "
    + "WHERE User.id_Passwords = ?) "
    + "AS exists_flag "
    + ";"
    const sqlRequest_3 =
    "SELECT Permission.name FROM User "
    + "JOIN Permission ON User.id_Permission = Permission.id "
    + "WHERE User.id_Passwords = ?"
    + ";"

    const isExist_1 = await indexDb<i_exist[]>('execute',sqlRequest_1 , [id_password])
    if(isExist_1[0]){
        if(isExist_1[0].exists_flag){
            return e_permissionRole_superUser.super_admin
        }
    }
    const isExist_2 = await indexDb<i_exist[]>('execute',sqlRequest_2 , [id_password])
    if(isExist_2[0]){
        if(isExist_2[0].exists_flag){
            const name_permission = (await indexDb<i_permission_name[]>('execute', sqlRequest_3, [id_password]))[0]
            if(name_permission){
                return name_permission[e_permission_table.name]
            }
        }
    }
    return null
}   