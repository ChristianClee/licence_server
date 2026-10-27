import { dbReq, dbTransactionReq, pool, indexDb , indexTransactionDb} from "@/db.js"
import { filter_deleted_date_time } from '@/utils/index.js'
import { e_licenceFree_table, e_averagePrice_table, e_company_table, e_licenceType_table } from '@/types/tablesDb.js'
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import {e_licenceType_column} from '@/types/columnsDb.js'
import type{ i_exist, i_count, i_id } from '@/types/other.js'
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import type { i_licenceFree_table, i_averagePrice_table } from '@/types/tablesDb.js'


interface i_licenceFree_response extends RowDataPacket, i_licenceFree_table {}

interface i_averagePrice_response extends RowDataPacket, i_averagePrice_table {}


// const pathDbRequest = `licencesFree/${e_nameTablesDb.Licence_free}_`

export async function addFreeLicences_Tr_Db(
    id_Company: number,
    id_super_admin: number,
    id_licence_type: number,
    contract_price: number | null,
    licence_count: number
)
: Promise<number[] | Error>
{
    
        // only for super_admin
    const sqlRequest_0 = 
        "SELECT Average_price.id "
        + "FROM Average_price "
        + "JOIN Licence_type ON Average_price.id_Licence_type = Licence_type.id "
        + "WHERE Licence_type.id = ? "
        + "AND Average_price.deleted_date_time IS NULL "
        + ";"
    const sqlRequest_1 = 
        "INSERT INTO Price(id_Average_price, contract_price) "
        + "VALUES (?,?);" 
    const sqlRequest_2 = 
        "INSERT INTO Licence_free( id_Super_admin, id_Company, id_Price ) "
        + "VALUES(?,?,?)"
        + ";"
    const connection = await pool.getConnection();
    const response:number[] = []
    async function transaction()
    {
        const id_Average_price = (await indexTransactionDb<i_averagePrice_response[]>(connection,'execute', sqlRequest_0, [id_licence_type]))[0]?.[e_averagePrice_table.id]
        if(!id_Average_price) throw new Error(`Data base has no id_licence_type = ${id_licence_type}, or All average prices is deleted`)
        const id_price = (await indexTransactionDb<ResultSetHeader>(connection, 'execute', sqlRequest_1, [id_Average_price, contract_price])).insertId
        for(let i = 0 ; i < licence_count; i ++){
            const resp = await indexTransactionDb<ResultSetHeader>(connection, 'execute', sqlRequest_2, [id_super_admin, id_Company, id_price, ])
            response.push(resp.insertId)
        }
    }
    try{
        await connection.beginTransaction();
        await transaction();
        await connection.commit();
    }catch(err){
        await connection.rollback();
        throw err;
    }finally{
        connection.release();
    }
    return response;
}

export async function setDeletedFreeLicenceDb(id_set_delete:number): Promise< void >
{
    // only for super_admin
    const sqlRequest_1 =
        "SELECT EXISTS( "
        + "SELECT * FROM Licence_free "
        + "WHERE Licence_free.id = ?) "
        + "AS exists_flag"
        + ";"
    const sqlRequest_2 =
        "UPDATE Licence_free "
        + "SET Licence_free.deleted_date_time = CURRENT_TIMESTAMP "
        + "WHERE id = ?"
        + ";"

    const isExist = await indexDb<i_exist[]>('execute', sqlRequest_1 , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await indexDb<ResultSetHeader>('execute', sqlRequest_2, [id_set_delete])
}

export async function getAllFreeLicenceDb(     
    id_company: number,
    is_filter: boolean
): Promise<i_licenceFree_table[] >
{
    const sqlRequest_1 = 
        "SELECT * FROM Licence_free "
        + "WHERE Licence_free.id_Company = ?"
        + ";"

    const response = await indexDb<i_licenceFree_response[]>('execute', sqlRequest_1 , [id_company])
    if(is_filter)
    {
        return filter_deleted_date_time(response)
    }
    return response;
}



export async function getNotSubscribedFreeLicenceDb(
    id_company: number,
    id_url: number
)
{
    const sqlRequest_1 = 
        "SELECT Licence_free.id "
        + "FROM Licence_free "
        + "LEFT JOIN Licence_subscribe ON Licence_subscribe.id_Licence_free = Licence_free.id "
        + "JOIN Company ON Licence_free.id_Company = Company.id "
        + "JOIN Price ON Licence_free.id_Price = Price.id "
        + "JOIN Average_price ON Price.id_Average_price = Average_price.id "
        + "JOIN Licence_type ON Average_price.id_Licence_type = Licence_type.id "
        + "JOIN Url ON Licence_type.id = Url.id_Licence_type "
        + "WHERE "
        + "Licence_subscribe.id IS NULL "
        + "AND Company.id = ? "
        + "AND Url.id = ? "
        + "AND Licence_free.deleted_date_time IS NULL"
        + ";"
    const count = await indexDb<i_id[]>('execute',sqlRequest_1 , [id_company, id_url])
    return count
}