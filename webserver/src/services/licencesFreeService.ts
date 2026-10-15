import { dbReq, dbTransactionReq, pool} from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import { e_licenceFree_table, e_licenceType_table } from '@/types/tablesDb.js'
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import {e_licenceType_column} from '@/types/columnsDb.js'
import type{ i_exist } from '@/types/other.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import type { i_licenceFree_table } from '@/types/tablesDb.js'

// interface i_exist extends RowDataPacket
// {
//     exists_flag: number
// }
interface i_common_table extends RowDataPacket, i_licenceFree_table {}


const pathDbRequest = `licencesFree/${e_nameTablesDb.Licence_free}_`

export async function addFreeLicencesDb(
    id_company: number,
    id_super_admin: number,
    id_price: number,
    licence_count: number
)
: Promise<number[] | Error>
{
        // only for super_admin
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const connection = await pool.getConnection();
    const response:number[] = []
    try{
        await connection.beginTransaction();
        for(let i = 0 ; i < licence_count; i ++){
            const resp = await dbTransactionReq<ResultSetHeader>(connection, 'execute', sqlRequest, [id_company, id_super_admin, id_price])
            response.push(resp.insertId)
        }
        await connection.commit();
    }catch(err){
        await connection.rollback();
        throw err;
    }finally{
        connection.release();
    }
    return response;
}

export async function setDeletedFreeLicenceDb(id_set_delete:number): Promise<void | Error>
{
    // only for super_admin
    const sqlRequest_IsExist = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const sqlRequest_SetDeleted = `${pathDbRequest}${e_methodsDb.SetDeleted}.sql`

    const isExist = await dbReq<i_exist[]>('execute', sqlRequest_IsExist , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await dbReq<ResultSetHeader>('execute', sqlRequest_SetDeleted, [id_set_delete])
}

export async function getAllFreeLicenceDb(     
    id_company: number,
    is_filter: boolean
): Promise<i_licenceFree_table[]>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetAll}.sql`
    const response = await dbReq<i_common_table[]>('execute', sqlRequest , [id_company])
    if(is_filter)
    {
        return filter_deleted_date_time(response)
    }
    return response;
}
