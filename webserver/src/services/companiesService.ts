import { dbReq } from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import  { e_company_table } from '@/types/tablesDb.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { i_company_table } from '@/types/tablesDb.js'

interface i_exist extends RowDataPacket
{
    exists_flag: number
}
interface i_company_table_db extends RowDataPacket, i_company_table {}
const companiesFolder = 'companies'


export async function addCompanyDb(id_super_admin:number, name:string):Promise<number | Error>{
    const response = await dbReq<ResultSetHeader>('execute',`${companiesFolder}/addCompany.sql`, [id_super_admin, name])
    console.log(response.insertId);
    return response.insertId
}

export async function setDeleteCompanyDb(id_set_delete: number):Promise<void | Error >{
    const isExist = await dbReq<i_exist[]>('execute', `${companiesFolder}/isExistCompany.sql`, [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой компании с id = ${id_set_delete}`)
    } 
    await dbReq<ResultSetHeader>('execute', `${companiesFolder}/setDeleteCompany.sql`, [id_set_delete])
}

export async function getAllCompanyDb( property_table: 'all', is_filter: boolean):Promise< i_company_table[]>
export async function getAllCompanyDb( property_table: 'count', is_filter: boolean):Promise<number>
export async function getAllCompanyDb( property_table: e_company_table.name, is_filter: boolean):Promise<e_company_table.name[]>
export async function getAllCompanyDb( property_table: e_company_table.name | 'all' | 'count', is_filter: boolean ): Promise< string[] | number | i_company_table[] | Error> {
    const response = await dbReq<i_company_table_db[]>('query', `${companiesFolder}/getAllCompanies.sql`);
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
