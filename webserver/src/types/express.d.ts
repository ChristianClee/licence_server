import 'express'
import { e_permissionRole_column, e_permissionRole_superUser } from '@/types/columnsDb.ts'

declare global {
  namespace Express {
    interface Request {
      user?: { permission: e_permissionRole_column | e_permissionRole_superUser; iat: number; exp: number }
    }
  }
}