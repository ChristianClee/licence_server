import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";


interface i_name extends RowDataPacket {
    name: string
}


// ===================================================== licence group
// ============ licence_type
export async function addCompanyDb(id_super_admin:number, name:string):Promise<number>{
    const response = await dbReq<ResultSetHeader>('execute','addCompany.sql', [id_super_admin, name])
    console.log(response.insertId);
    return response.insertId
}

export async function setDeleteCompanyDb(id_set_delete: number):Promise<void>{
    const response = await dbReq<ResultSetHeader>('execute', 'company/setDeleteCompany.sql', [id_set_delete])
}

export async function getAllCompanyDb():Promise<string[]>{
    const response = await dbReq<i_name[]>('query', 'getCompany.sql');
    console.log(response.map(i => i.name));
    return response.map(i => i.name);
}
