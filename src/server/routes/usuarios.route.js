import express from 'express';
import * as usuarios from '../controllers/usuarios.controllers.js';
import {authToken} from '../middlewares/cursos.middlewares.js';

const router = express.Router();

// crear usuario (ok)
router.post('/login', usuarios.login)

//router.get('/usuarios', authToken, usuarios.findUserByEmail)//xx
router.post('/usuarios', usuarios.register)

// crear producto (ok)
router.post('/productos/nuevo', usuarios.nuevoProducto)

// obtener productos para gallery (ok)
router.get('/productos', usuarios.ObtenerProductos);
router.get('/productos/:producto_id', usuarios.ObtenerProductoId);

// borrar productos (ok)
router.delete('/productos/:producto_id', usuarios.eliminarProducto);

// editar productos (ok)
router.put('/productos/edit/:id', usuarios.actualizarProducto)


//=============== VENTA =========================================

// Operaciones relacionadas con el carrito
router.post('/carrito', usuarios.agregarProductoAlCarrito);
router.get('/carrito/:usuario_id', usuarios.obtenerProductosEnCarrito);
router.delete('/carrito/:carrito_id', usuarios.eliminarProductoDelCarrito);

// Operaciones relacionadas con las ventas
router.post('/ventasimple', usuarios.ventaSimple);
router.get('/ventas/:usuario_id', usuarios.obtenerVentasUsuario)

export default router;