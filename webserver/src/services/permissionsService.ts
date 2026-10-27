import { dbReq, indexDb } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type { i_permission_table } from '@/types/tablesDb.js'

interface i_common_table extends RowDataPacket, i_permission_table {}

// const pathDbRequest = `permission/${e_nameTablesDb.Permission}_`

export async function getAllPermissionsDb(): Promise<i_permission_table[] | Error>
{
    const sqlRequest_1 =
        "SELECT * FROM Permission "
        + ";"
    const response = await indexDb<i_common_table[]>('query', sqlRequest_1 )
    return response

}