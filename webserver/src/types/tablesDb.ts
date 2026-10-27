import { e_licenceType_column, e_permissionRole_column } from './columnsDb.js'

// tables enums
export enum e_passwords{
    id = 'id',
    hash = 'hash',
    email = 'email'
}
export enum e_superAdmin_table{
    id = 'id',
    id_Passwords = 'id_Passwords'
}
export enum e_company_table{
    id = 'id',
    id_Super_admin = 'id_Super_admin',
    name = 'name',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
};
export enum e_licenceType_table{
    id = 'id',
    name = 'name',
};
export enum e_url_table{
    id = 'id',
    id_Licence_type = 'id_Licence_type',
    id_Company = 'id_Company',
    url = 'url',
};
export enum e_averagePrice_table{
    id = 'id',
    id_Licence_type = 'id_Licence_type',
    price = 'price',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_price_table{
    id = 'id',
    id_Average_price = 'id_Average_price',
    contract_price = 'contract_price',
}
export enum e_licenceFree_table{
    id = 'id',
    id_Company = 'id_Company',
    id_Price = 'id_Price',
    id_Super_admin = 'id_Super_admin',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_licenceSubscribe_table{
    id = 'id',
    id_Licence_free = 'id_Licence_free',
    id_Url = 'id_Url',
    created_ip = 'created_ip',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_motherBoard_table{
    id = 'id',
    id_Licence_subscribe = 'id_Licence_subscribe',
    serial_number = 'serial_number',
    model_number = 'model_number',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_permission_table{
    id = 'id',
    name = 'name'
}
export enum e_user_table{
    id = 'id',
    id_Company = 'id_Company',
    id_Passwords = 'id_Passwords',
    id_Permission = 'id_Permission',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_changedLicenceReq_table{
    id = 'id',
    id_User = 'id_User',
    id_Mother_board = 'id_Mother_board',
    serial_number_new_board = 'serial_number_new_board',
    model_number_new_board = 'model_number_new_board',
    created_ip = 'created_ip',
    created_date_time = 'created_date_time',
    deleted_date_time = 'deleted_date_time',
}
export enum e_bad_request{
    id = 'id',
    id_Url = 'id_Url',
    error_message = 'error_message',
    serial_number = 'serial_number',
    model_number = 'model_number',
    created_ip = 'created_ip',
    created_date_time = 'created_date_time'
}


// tables interfaces
export interface i_passwords{
    [e_passwords.id] : number,
    [e_passwords.hash] : string,
    [e_passwords.email] : string,
}
export interface i_superAdmin_table{
    [e_superAdmin_table.id] : number,
    [e_superAdmin_table.id_Passwords] : number,
}
export interface i_company_table{
    [e_company_table.id] : number,
    [e_company_table.id_Super_admin]: number,
    [e_company_table.name] : string,
    [e_company_table.created_date_time] : Date,
    [e_company_table.deleted_date_time] : Date | null,
}
export interface i_licenceType_table{
    [e_licenceType_table.id] : number,
    [e_licenceType_table.name] : e_licenceType_column,
}
export interface i_url_table{
    [e_url_table.id] : number,
    [e_url_table.id_Licence_type] : number,
    [e_url_table.id_Company] : number,
    [e_url_table.url] : string,
}
export interface i_averagePrice_table{
    [e_averagePrice_table.id] : number,
    [e_averagePrice_table.id_Licence_type] : number,
    [e_averagePrice_table.price] : number,
    [e_averagePrice_table.created_date_time] : Date,
    [e_averagePrice_table.deleted_date_time] : Date | null,
}
export interface i_price_table{
    [e_price_table.id] : number,
    [e_price_table.id_Average_price] : number,
    [e_price_table.contract_price] : number,
}
export interface i_licenceFree_table{
    [e_licenceFree_table.id] : number,
    [e_licenceFree_table.id_Company] : number,
    [e_licenceFree_table.id_Price] : number,
    [e_licenceFree_table.id_Super_admin] : number,
    [e_licenceFree_table.created_date_time] : Date,
    [e_licenceFree_table.deleted_date_time] : Date | null,
}
export interface i_licenceSubscribe_table{
    [e_licenceSubscribe_table.id] : number,
    [e_licenceSubscribe_table.id_Licence_free] : number,
    [e_licenceSubscribe_table.id_Url] : number,
    [e_licenceSubscribe_table.created_ip] : string,
    [e_licenceSubscribe_table.created_date_time] : Date,
    [e_licenceSubscribe_table.deleted_date_time] : Date | null,
}
export interface i_motherBoard_table{
    [e_motherBoard_table.id] : number,
    [e_motherBoard_table.id_Licence_subscribe] : number,
    [e_motherBoard_table.serial_number] : string,
    [e_motherBoard_table.model_number] : string,
    [e_motherBoard_table.created_date_time] : Date,
    [e_motherBoard_table.deleted_date_time] : Date | null,
}
export interface i_permission_table{
    [e_permission_table.id] : number,
    [e_permission_table.name] : e_permissionRole_column,
}
export interface i_user_table{
    [e_user_table.id] : number,
    [e_user_table.id_Company] : number,
    [e_user_table.id_Passwords] : number,
    [e_user_table.id_Permission] : number,
    [e_user_table.created_date_time] : Date,
    [e_user_table.deleted_date_time] : Date | null,
}
export interface i_changedLicenceReq_table{
    [e_changedLicenceReq_table.id] : number,
    [e_changedLicenceReq_table.id_User] : number,
    [e_changedLicenceReq_table.id_Mother_board] : number,
    [e_changedLicenceReq_table.serial_number_new_board] : string,
    [e_changedLicenceReq_table.model_number_new_board] : string,
    [e_changedLicenceReq_table.created_ip] : string,
    [e_changedLicenceReq_table.created_date_time] : Date,
    [e_changedLicenceReq_table.deleted_date_time] : Date | null,
}
export interface i_bad_request{
    [e_bad_request.id]: number,
    [e_bad_request.id_Url]: number,
    [e_bad_request.created_ip]: string,
    [e_bad_request.serial_number]: string,
    [e_bad_request.model_number]: string,
    [e_bad_request.error_message]: string,
    [e_bad_request.created_date_time]: Date
}

