import * as sql from '../models/Usuarios.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import {jwtSign, jwtVerify} from '../../../utils/jwt.js'

export const login = (req,res) =>
sql.login(req.body.email, req.body.password)
.then(([user])=> user?.email
    ? res.status(HTTP_STATUS.ok.code).json({token: jwtSign({email: user.email, rol: user.rol, lenguage: user.lenguage})})
    : res.status(HTTP_STATUS.unauthorized.code).json({code:HTTP_STATUS.unauthorized.code, message:HTTP_STATUS.unauthorized.text.op0})
)
.catch((error)=> res.status(HTTP_STATUS.internal_server_error).json(error))


export const findUserByEmail = (req,res) => {
    const [, token] = req.headers.authorization.split(' ')
    const {email} = jwtVerify(token)

    sql.findUserByEmail(email)
        .then((user)=> res.status(HTTP_STATUS.ok.code).json(user))
        .catch((error)=> res.status(HTTP_STATUS.internal_server_error.code).json(error))
}

export const register = (req, res) =>
sql.register(req.body)
    .then(([user]) => res.status(HTTP_STATUS.created.code).json({usuario_id: user.usuario_id, email: user.email}))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))

export const nuevoProducto = (req, res) => 
sql.nuevoProducto (req.body)
    .then(([producto]) => res.status(HTTP_STATUS.created.code).json({ producto_id: producto.producto_id, nombre: producto.nombre }))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))
            

export const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, producto_img } = req.body;

    sql.actualizarProducto({ id, nombre, descripcion, precio, stock, categoria, producto_img })
        .then(([producto]) => {
            res.status(HTTP_STATUS.ok.code).json({ producto_id: producto.producto_id, nombre: producto.nombre });
        })
        .catch((error) => {
            res.status(HTTP_STATUS.internal_server_error.code).json(error);
        });
};

export const eliminarProducto = (req, res) => {
    const { id } = req.params;
    sql.eliminarProducto(id)
        .then(() => res.status(HTTP_STATUS.ok.code).json({ message: 'Producto eliminado exitosamente' }))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));
};

export const ObtenerProductos = (req, res) => 
    sql.ObtenerProductos()
        .then((productos) => res.status(HTTP_STATUS.ok.code).json({ productos }))
        .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));
