// do not replace this file;
import mysql from 'mysql2/promise';
import path from 'path'
import fs from "fs"
import { fileURLToPath } from "url"
import type { RowDataPacket } from 'mysql2/promise';

interface UrlRow extends RowDataPacket {
  url: string;
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db_req = "../../db/user_req/";

export function getFullDbPath( fileName: string ){
    const sql_tables = fs.readFileSync(path.join(__dirname, db_req + fileName), 'utf8');
    return sql_tables
}
export const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '123',
  database: 'mishkov_db',
});

const get_all_urls_path = getFullDbPath("get_all_urls.sql");
let urls:string[] = [];

try{
  const [rows] = await pool.query<UrlRow[]>(get_all_urls_path);
  urls = rows.map(i => i.url)
}
catch(e){
  // to do / здесь нужно придумать обработку на случай пустого 
}

export { urls };