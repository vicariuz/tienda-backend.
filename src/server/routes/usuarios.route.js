import express from 'express'
import * as usuarios from '../controllers/usuarios.controllers.js'
import {authToken} from '../middlewares/cursos.middlewares.js'


const router = express.Router()

router.post('/login', usuarios.login)
router.get('/usuarios', authToken, usuarios.findUserByEmail)
router.post('/usuarios', usuarios.register)

export default router