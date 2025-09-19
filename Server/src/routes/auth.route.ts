import {Router} from 'express'
import { login, signup, verifyRecruiter } from '../controller/auth.controller'

const authRouter = Router()

authRouter.post('/login',login)

authRouter.post('/signup',signup)

authRouter.get('/verify',verifyRecruiter)

export default authRouter