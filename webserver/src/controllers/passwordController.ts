import type { Request, Response } from 'express'
import { getHashPasswordDb, getPermissionFromUsersAdmins } from "@/services/loginService.js"
import bcrypt from 'bcrypt'
import { e_passwords } from '@/types/tablesDb.js'
import jwt from 'jsonwebtoken'



export async function checkPasswordController(reg:Request, res:Response){
    const password:string = reg.body.password
    const email:string = reg.body.email
    if( !password || !email )
        {
            res.status(400).json({error: 'Invalid request body'})
            return
        }
    try{
        const password_data = await getHashPasswordDb(email)
        if(!password_data){
            res.status(401).json({message: "password or email is wrong"})
            return
        }
        const isMatch = await bcrypt.compare(password, password_data.hash)
        if(!isMatch){
            res.status(401).json({message: "password or email is wrong"})
            return
        }
        const permission = await getPermissionFromUsersAdmins(password_data[e_passwords.id])
        if(!permission){
            res.status(500).end()
        }
        // ================= jwt tocken
        const JWT_SECRET = 'dev-secret-change-me-1234567890' // to do replace it to .env

        const token = jwt.sign(
        { permission }, 
        JWT_SECRET,     
        { expiresIn: '30d' }  
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
            })

        // ================= jwt tocken
        res.status(200).json({permission})
    }catch(err){
        console.error(err)
        res.status(500).end()
    }
}