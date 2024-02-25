import * as sql from '../models/Usuarios.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import {jwtSign, jwtVerify} from '../../../utils/jwt.js'


//------------------------------------- ok
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


//-------------------------------------------- ok
export const register = (req, res) =>
sql.register(req.body)
    .then(([user]) => res.status(HTTP_STATUS.created.code).json({usuario_id: user.usuario_id, email: user.email}))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))


//-------------------------------------------- ok
export const nuevoProducto = (req, res) => 
sql.nuevoProducto (req.body)
    .then(([producto]) => res.status(HTTP_STATUS.created.code).json({ producto_id: producto.producto_id, nombre: producto.p_name }))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))
    

//-------------------------------------------- ok
 export const ObtenerProductos = (req, res) => 
sql.ObtenerProductos()
    .then((productos) => res.status(HTTP_STATUS.ok.code).json({ productos }))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error));
    





    
//-------------------------------------------- ok
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



export const agregarProductoAlCarrito = async (req, res) => {
            try {
                const resultado = await sql.agregarProductoAlCarrito();
                res.status(HTTP_STATUS.ok.code).json(resultado);
            } catch (error) {
                res.status(HTTP_STATUS.internal_server_error.code).json({ error: error.message });
            }
        };
        
        
 export const realizarVenta = async (req, res) => {
            try {
                const resultado = await sql.realizarVenta();
                res.status(HTTP_STATUS.ok.code).json(resultado);
            } catch (error) {
                res.status(HTTP_STATUS.internal_server_error.code).json({ error: error.message });
            }
        };
        