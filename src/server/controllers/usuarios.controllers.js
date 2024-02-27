import * as sql from '../models/Usuarios.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import {jwtSign, jwtVerify} from '../../../utils/jwt.js'


//------------------------------------- OK
export const login = (req, res) =>
    sql.login(req.body.email, req.body.password)
        .then(([user]) => {
        if (user?.email) {
            const tokenData = {
            nombre: user.nombre,
            rol: user.rol
            };
            const token = jwtSign(tokenData);
            res.status(HTTP_STATUS.ok.code).json({ token, nombre: user.nombre, rol: user.rol });
        } else {
            res.status(HTTP_STATUS.unauthorized.code).json({ code: HTTP_STATUS.unauthorized.code, message: HTTP_STATUS.unauthorized.text.op0 });
        }
        })
        .catch((error) => res.status(HTTP_STATUS.internal_server_error).json(error));

//----------------------------------------------- sin usar
export const findUserByEmail = (req,res) => {
    const [, token] = req.headers.authorization.split(' ')
    const {email} = jwtVerify(token)

    sql.findUserByEmail(email)
        .then((user)=> res.status(HTTP_STATUS.ok.code).json(user))
        .catch((error)=> res.status(HTTP_STATUS.internal_server_error.code).json(error))
}
//----------------------------------------------


//-------------------------------------------- OK
export const register = (req, res) =>
    sql.register(req.body)
        .then(([user]) => res.status(HTTP_STATUS.created.code).json({usuario_id: user.usuario_id, email: user.email}))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))


//-------------------------------------------- OK
export const nuevoProducto = (req, res) => 
    sql.nuevoProducto (req.body)
        .then(([producto]) => res.status(HTTP_STATUS.created.code).json({ producto_id: producto.producto_id, nombre: producto.p_name }))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))

//-------------------------------------------- OK
export const ObtenerProductos = (req, res) => 
    sql.ObtenerProductos()
        .then((productos) => res.status(HTTP_STATUS.ok.code).json({ productos }))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));

//-------------------------------------------- OK
export const ObtenerProductoId = (req, res) => {
    const { producto_id } = req.params;
        sql.ObtenerProductoId(producto_id)
        .then((producto) => res.status(HTTP_STATUS.ok.code).json({ producto }))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));
        };

//-------------------------------------------- OK
export const eliminarProducto = (req, res) => {
    const { producto_id } = req.params;
        sql.eliminarProducto(producto_id)
            .then(() => res.status(HTTP_STATUS.ok.code).json({ message: 'Producto eliminado exitosamente' }))
            .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));
            };

//-------------------------------------------- OK
export const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { p_name, p_descripcion, p_precio,p_descuento, p_stock, p_category, p_img, p_feelings, p_negatives, p_helpwith, p_rating } = req.body;
            
        sql.actualizarProducto({ id, p_name, p_descripcion,p_descuento, p_precio, p_stock, p_category, p_img, p_feelings, p_negatives, p_helpwith, p_rating })
            .then((producto) => {
            console.log(producto); 
            res.status(HTTP_STATUS.ok.code).json({ producto_id: producto.producto_id, nombre: producto.p_name });
            })
            .catch((error) => {
            res.status(HTTP_STATUS.internal_server_error.code).json(error);
            });
        };

//-------------------------------------------- OK
// Operaciones de carrito
export const agregarProductoAlCarrito = async (req, res) => {
    const { usuario_id, producto_id, cantidad } = req.body;
    try {
      const carrito = await sql.agregarProductoAlCarrito(usuario_id, producto_id, cantidad);
      res.status(HTTP_STATUS.ok.code).json({ carrito });
    } catch (error) {
      res.status(HTTP_STATUS.internal_server_error.code).json(error);
    }
  };

export const obtenerProductosEnCarrito = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const productosEnCarrito = await sql.obtenerProductosEnCarrito(usuario_id);
        res.status(HTTP_STATUS.ok.code).json({ productosEnCarrito });
    } catch (error) {
        res.status(HTTP_STATUS.internal_server_error.code).json(error);
    }
};

export const eliminarProductoDelCarrito = async (req, res) => {
    const { carrito_id } = req.params;
    try {
        await sql.eliminarProductoDelCarrito(carrito_id);
        res.status(HTTP_STATUS.ok.code).json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        res.status(HTTP_STATUS.internal_server_error.code).json(error);
    }
};

// Operaciones de venta
export const crearVenta = async (req, res) => {
    const { usuario_id, total, fecha } = req.body;
    try {
        const venta = await sql.crearVenta(usuario_id, total, fecha);
        res.status(HTTP_STATUS.ok.code).json({ venta });
    } catch (error) {
        res.status(HTTP_STATUS.internal_server_error.code).json(error);
    }
};

export const obtenerVentasUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const ventasUsuario = await sql.obtenerVentasUsuario(usuario_id);
        res.status(HTTP_STATUS.ok.code).json({ ventasUsuario });
    } catch (error) {
        res.status(HTTP_STATUS.internal_server_error.code).json(error);
    }
};