import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import  type { i_url_table } from '@/types/tablesDb.js'
import  { e_company_table, e_url_table, } from '@/types/tablesDb.js'
import { filter_deleted_date_time } from '@/utils/index.js'
import { pathDbRequest as companyPathDbReq } from '@/services/companiesService.js'
import type { i_company_table } from '@/types/tablesDb.js'

interface i_common_table extends RowDataPacket, i_url_table {}
interface i_common_company_table extends RowDataPacket, i_company_table {}

const pathDbRequest = `urls/${e_nameTablesDb.Url}_`


export async function getAllUrlsDb(){

}
export async function  getIdUrlParamDb(url:string ):Promise< i_url_table> {
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetId}.sql`
    const response = await dbReq<i_common_table[]>('execute', sqlRequest, [url]);
    if ( !response[0]?.[e_url_table.id] ) throw new Error(`In Data base no ${url} route`)
    if ( !response[0]?.[e_url_table.id_Company] ) throw new Error(`In Data base no ${url} route`)
    return response[0]
}

export async function  getIdCompanyParamDb(id_Company: number, url: string):Promise< number | Error> {
    // const id_Company = await getIdUrlParamDb(url)

    const sqlRequest_GetID = `${companyPathDbReq}${e_methodsDb.GetId}.sql`

    const response_company = await dbReq<i_common_company_table[]>('execute', sqlRequest_GetID, [id_Company]);
    if(!response_company.length) throw new Error(`No one company matched to ${url} `)

    const filteredCompanies = filter_deleted_date_time(response_company)
    if(!filteredCompanies.length) throw new Error(`The ${response_company[0]?.[e_company_table.name]}company was Removed`);

    if(!response_company[0]?.[e_company_table.id]) throw new Error(`No one company matched to ${url}, type 2 `)
    return response_company[0][e_company_table.id]
}


export async function addUrlDb(
    id_company: number,
    id_licence_type: number,
    url: string,
){

}

export async function setDeleteUrlDb(id_set_delete: number){

}