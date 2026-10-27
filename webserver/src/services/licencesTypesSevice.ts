import { dbReq, indexDb } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type{ i_licenceType_table} from "@/types/tablesDb.js"
import { e_licenceType_table} from "@/types/tablesDb.js"

interface i_common_table extends RowDataPacket, i_licenceType_table {}

export async function getAllLicencesTypeDb(param: 'all'): Promise<i_licenceType_table[]>
export async function getAllLicencesTypeDb(param: 'names'): Promise<string[]>
export async function getAllLicencesTypeDb(param: 'all' | 'names'): Promise<(i_licenceType_table | string)[]>

{
    const sqlRequest_1 = 
    "SELECT * "
    + "FROM Licence_type "
    + ";"
    const response = await indexDb<i_common_table[]>('execute', sqlRequest_1 , []);
    if(param == 'names')
    {
        return response.map(i => i[e_licenceType_table.name])
    }
    else
    {   
        return response
    }
}