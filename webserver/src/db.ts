// do not replace this file;
import mysql from 'mysql2/promise';
import path from 'path'
import fs from "fs"
import { fileURLToPath } from "url"
import type { RowDataPacket, ResultSetHeader, PoolConnection } from 'mysql2/promise';
import { pathDBactions } from '@/types/other.js'

interface UrlRow extends RowDataPacket {
  url: string;
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));


export function getFullDbPath( fileName: string ){
  const sql_tables = fs.readFileSync(path.join(__dirname, pathDBactions + fileName), 'utf8');
  return sql_tables
}
export const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '123',
  database: 'mishkov_db',
});

const get_all_urls_path = getFullDbPath("urls/getAllUrls.sql");
let urls:string[] = [];


const [rows] = await pool.query<UrlRow[]>(get_all_urls_path);
urls = rows.map(i => i.url)
export { urls };


export async function dbReq<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  method: 'query',
  fileNameSql: string
): Promise<T>;

export async function dbReq<T extends RowDataPacket[] | RowDataPacket[][]| ResultSetHeader>(
  method: 'execute',
  fileNameSql: string,
  sqlReqArgs: any[]
): Promise<T>;

export async function dbReq<T extends RowDataPacket[] | RowDataPacket[][]| ResultSetHeader>(
  method: 'query' | 'execute',
  fileNameSql: string,
  sqlReqArgs: any[] = []
): Promise<T>
{
  const text = fs.readFileSync(path.join(__dirname, pathDBactions + fileNameSql), 'utf8');
  if (method === 'query') {
    const [rows] = await pool.query<T>(text, sqlReqArgs);
    return rows;
  }
  const [rows] = await pool.execute(text, sqlReqArgs);
  return rows as T;
}

export async function indexDb<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  method: 'query',
  sqlRequest: string
): Promise<T>;

export async function indexDb<T extends RowDataPacket[] | RowDataPacket[][]| ResultSetHeader>(
  method: 'execute',
  sqlRequest: string,
  sqlReqArgs: any[]
): Promise<T>;

export async function indexDb<T extends RowDataPacket[] | RowDataPacket[][]| ResultSetHeader>(
  method: 'query' | 'execute',
  sqlRequest: string,
  sqlReqArgs: any[] = []
): Promise<T>
{
  if (method === 'query') {
    const [rows] = await pool.query<T>(sqlRequest, sqlReqArgs);
    return rows;
  }
  const [rows] = await pool.execute(sqlRequest, sqlReqArgs);
  return rows as T;
}



export async function dbTransactionReq<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'query',
  fileNameSql: string
): Promise<T>;
export async function dbTransactionReq<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'execute',
  fileNameSql: string,
  sqlReqArgs: any[]
): Promise<T>;
export async function dbTransactionReq<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'query' | 'execute',
  fileNameSql: string,
  sqlReqArgs: any[] = []
): Promise<T>
{
  const text = fs.readFileSync(path.join(__dirname, pathDBactions + fileNameSql), 'utf8');
  if (method === 'query') {
    const [rows] = await connection.query<T>(text, sqlReqArgs);
    return rows;
  }
  const [rows] = await connection.execute(text, sqlReqArgs);
  return rows as T;
}

export async function indexTransactionDb<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'query',
  sqlRequest: string
): Promise<T>;
export async function indexTransactionDb<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'execute',
  sqlRequest: string,
  sqlReqArgs: any[]
): Promise<T>;
export async function indexTransactionDb<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  connection: PoolConnection,
  method: 'query' | 'execute',
  sqlRequest: string,
  sqlReqArgs: any[] = []
): Promise<T>
{
  // const text = fs.readFileSync(path.join(__dirname, pathDBactions + fileNameSql), 'utf8');
  if (method === 'query') {
    const [rows] = await connection.query<T>(sqlRequest, sqlReqArgs);
    return rows;
  }
  const [rows] = await connection.execute(sqlRequest, sqlReqArgs);
  return rows as T;
}