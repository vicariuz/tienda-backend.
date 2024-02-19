import db from '../database/db.js'
import {encrypt, compare } from '../../../utils/bcrypt.js'

// login
export const login = async(email, password) => {
    const [user]= await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    return !compare(password, user.password) ?  []: [user]
}   

export const findUserByEmail = async (email = ' ') =>
await db('SELECT * FROM usuarios WHERE email = $1;', [email])

// Registrar un usuario
export const register = async ({nombre, email, password, rol}) => {
    const query = 'INSERT INTO usuarios (usuario_id,nombre,email,password,rol) VALUES (DEFAULT, $1,$2,$3,$4) RETURNING *;'
    return await db(query, [nombre, email,encrypt(password), rol])
}

// Registrar un nuevo producto
export const nuevoProducto = async ({nombre, descripcion, precio, stock, categoria,producto_img}) => {
    const query = 'INSERT INTO productos (producto_id, nombre, descripcion, precio, stock, categoria, producto_img) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6) RETURNING *;'
    return await db(query, [nombre, descripcion, precio, stock, categoria,producto_img])
}

// actualizar un producto
export const actualizarProducto = async ({ id, nombre, descripcion, precio, stock, categoria, producto_img }) => {
    const query = ` UPDATE productos SET nombre = $2, descripcion = $3, precio = $4, stock = $5, categoria = $6, producto_img = $7 WHERE producto_id = $1 RETURNING *; `;
    return await db(query, [id, nombre, descripcion, precio, stock, categoria, producto_img]);
};

// eliminar Producto
export const eliminarProducto = async (productoId) => {
    const query = 'DELETE FROM productos WHERE producto_id = $1;';
    return await db(query, [productoId]);
};

// Obtener todos los productos
export const ObtenerProductos = async () => {
    const query = 'SELECT * FROM productos;';
    return await db(query,[]);
};