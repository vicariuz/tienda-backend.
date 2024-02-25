import express from 'express';
import * as usuarios from '../controllers/usuarios.controllers.js';
import {authToken} from '../middlewares/cursos.middlewares.js';


const router = express.Router();

// crear uusario (ok)
router.post('/login', usuarios.login)

//router.get('/usuarios', authToken, usuarios.findUserByEmail)//xx
router.post('/usuarios', usuarios.register)

// crear producto (ok)
router.post('/productos/nuevo', usuarios.nuevoProducto)

// obtener productos para gallery (proceso)
router.get('/productos', usuarios.ObtenerProductos);

router.put('/productos/edit/:id', usuarios.actualizarProducto)
router.delete('/productos/:id', authToken, usuarios.eliminarProducto);
router.post('agregarProductoAlCarrito', usuarios.agregarProductoAlCarrito);
router.post('/realizarVenta', authToken, usuarios.realizarVenta)


export default router;