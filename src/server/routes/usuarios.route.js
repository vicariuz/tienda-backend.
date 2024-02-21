import express from 'express'
import * as usuarios from '../controllers/usuarios.controllers.js'
import {authToken} from '../middlewares/cursos.middlewares.js'


const router = express.Router()

router.post('/login', usuarios.login)
router.get('/usuarios', authToken, usuarios.findUserByEmail)
router.post('/usuarios', usuarios.register)
router.post('/productos/nuevo', usuarios.nuevoProducto)
router.put('/productos/edit/:id', usuarios.actualizarProducto)
router.delete('/productos/:id', authToken, usuarios.eliminarProducto);
router.get('/productos', authToken, usuarios.ObtenerProductos);
router.post('agregarProductoAlCarrito', usuarios.agregarProductoAlCarrito);
router.post('/realizarVenta', authToken, usuarios.realizarVenta)


export default router