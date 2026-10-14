import { dbReq } from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import  { e_company_table } from '@/types/tablesDb.js'
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { i_company_table } from '@/types/tablesDb.js'

interface i_company_table_db extends RowDataPacket, i_company_table {}
const pathDbRequest = `companies/${e_nameTablesDb.Company}_`

export async function addCompanyDb(id_super_admin:number, name:string):Promise<number | Error>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const response = await dbReq<ResultSetHeader>('execute',sqlRequest , [id_super_admin, name])
    return response.insertId
}

export async function setDeletedCompanyDb(id_set_delete: number):Promise<void | Error>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const isExist = await dbReq<i_exist[]>('execute',sqlRequest , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой компании с id = ${id_set_delete}`)
    } 
    await dbReq<ResultSetHeader>('execute', `${pathDbRequest}${e_methodsDb.SetDeleted}.sql`, [id_set_delete])
}

export async function getAllCompanyDb( property_table: 'all', is_filter: boolean):Promise< i_company_table[]>
export async function getAllCompanyDb( property_table: 'count', is_filter: boolean):Promise<number>
export async function getAllCompanyDb( property_table: e_company_table.name, is_filter: boolean):Promise<e_company_table.name[]>
export async function getAllCompanyDb( property_table: e_company_table.name | 'all' | 'count', is_filter: boolean ): Promise< string[] | number | i_company_table[] | Error> 
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetAll}.sql`
    const response = await dbReq<i_company_table_db[]>('query', sqlRequest);
    if(property_table == e_company_table.name)
    {
        if(is_filter)
        {
            return filter_deleted_date_time(response).map(i => i[e_company_table.name])
        }
        return response.map(i => i[e_company_table.name])
    }
    else if(property_table == 'count')
    {
        if(is_filter)
        {
            return filter_deleted_date_time(response).length
        }
        return response.length
    }
    else{
        if(is_filter)
        {
            return filter_deleted_date_time(response)
        }
        return response
    }
}
