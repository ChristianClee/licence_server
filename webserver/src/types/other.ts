import type{ RowDataPacket } from "mysql2";

export const pathDBactions = "../../db/actions/";

export enum e_updateType{
    delete,
}
export enum e_nameTablesDb{
    Super_admin = 'Super_admin',
    Company = 'Company',
    Licence_type = 'Licence_type',
    Url = 'Url',
    Average_price = 'Average_price',
    Price = 'Price',
    Licence_free = 'Licence_free',
    Licence_subscribe = 'Licence_subscribe',
    Mother_board = 'Mother_board',
    Permission = 'Permission',
    User = 'User',
    Changed_licence_req = 'Changed_licence_req',
    Bad_request = 'Bad_request'

}
export enum e_methodsDb{
    SetDeleted = 'SetDeleted',
    DeleteOne = 'DeleteOne',
    GetAll = 'GetAll',
    GetId = 'GetId',
    AddOne = 'AddOne',
    IsExist = 'IsExist',
}

export interface i_exist extends RowDataPacket
{
    exists_flag: number
}