import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import { pathDbRequest as motherboardDbRequest } from '@/services/motherBoardsService.js'


const pathDbRequest = `changedLicence/${e_nameTablesDb.Changed_licence_req}_`


export async function getAllChangedLicenceDb(){

}
export async function addChangedLicenceDb(
    id_user: number,
    id_motherBoard: number,
    serial_number_new_board: string,
    model_number_new_board: string,
    created_ip: string,

): Promise<number | Error>
{
    const isExist = await isChangedLicenceDb(serial_number_new_board, model_number_new_board)
    if( isExist.exists_flag ){
        throw new Error(`serial_number_new_board = ${serial_number_new_board} and model_number_new_board = ${model_number_new_board} are existed already in DB`)
    }

    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`

    const response = await dbReq<ResultSetHeader>('execute', sqlRequest, [id_user, id_motherBoard, serial_number_new_board, model_number_new_board, created_ip])
    return response.insertId;
}
export async function setDeleteChangedLicenceDb(id_set_delete: number){

}

export async function isChangedLicenceDb(serial_number_new_board: string , model_number_new_board: string):Promise<i_exist >
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const isExist = await dbReq<i_exist[]>('execute',sqlRequest , [serial_number_new_board, model_number_new_board])
    if(isExist[0]){
        return isExist[0]
    }else{
        throw new Error('unseccesfully atampt to select form Db')
    }

}