import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import  type { i_url_table } from '@/types/tablesDb.js'
import  { e_url_table, } from '@/types/tablesDb.js'
import { filter_deleted_date_time } from '@/utils/index.js'


interface i_common_table extends RowDataPacket, i_url_table {}

const pathDbRequest = `urls/${e_nameTablesDb.Url}_`


export async function getAllUrlsDb(){

}
export async function  getOneUrlParamDb(url:string):Promise< number | undefined | Error> {
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetId}.sql`
    const response = await dbReq<i_common_table[]>('execute', sqlRequest, [url]);
    // filter_deleted_date_time(response)

    return response[0]?.[e_url_table.id_Company]

}

export async function addUrlDb(
    id_company: number,
    id_licence_type: number,
    url: string,
){

}

export async function setDeleteUrlDb(id_set_delete: number){

}