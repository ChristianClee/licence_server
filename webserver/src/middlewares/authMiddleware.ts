import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { e_permissionRole_column, e_permissionRole_superUser } from '@/types/columnsDb.js'

const JWT_SECRET = 'dev-secret-change-me-1234567890' // TODO: вынести в .env

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ error: 'unauthorized' })
    return 
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { permission: e_permissionRole_column | e_permissionRole_superUser; iat: number; exp: number }
    req.user = payload 
    next()
  } catch {
    return res.status(401).json({ error: 'invalid or expired token' })
  }
}