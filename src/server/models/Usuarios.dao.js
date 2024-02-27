import db from '../database/db.js'
import {encrypt, compare } from '../../../utils/bcrypt.js'

// Login OK
export const login = async(email, password) => {
    const [user]= await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    return !compare(password, user.password) ?  []: [user]
}   

export const findUserByEmail = async (email = ' ') =>
await db('SELECT * FROM usuarios WHERE email = $1;', [email])

// Registrar usuario OK
export const register = async ({nombre, fechanacimiento, email, direccion, password, rol}) => {
    const query = 'INSERT INTO usuarios (usuario_id, nombre, fechanacimiento, email, direccion, password, rol) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6) RETURNING *;'
    return await db(query, [nombre, fechanacimiento, email, direccion, encrypt(password), rol])
}

// Registrar un nuevo producto (ok)
export const nuevoProducto = async ({p_name, p_descripcion, p_precio, p_descuento,p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img}) => {
    const query = 'INSERT INTO productos (producto_id, p_name, p_descripcion, p_precio,p_descuento, p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;'
    return await db(query, [p_name, p_descripcion, p_precio, p_descuento, p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img])
}

// Obtener datos de todos los productos OK
export const ObtenerProductos = async () => {
    const query = 'SELECT * FROM productos;';
    return await db(query,[]);
};

// Obtener dato de un producto OK
export const ObtenerProductoId = async (producto_id) => {
    const query = 'SELECT * FROM productos WHERE producto_id = $1';
    return await db(query,[producto_id]);
};

// Eliminar Producto OK
export const eliminarProducto = async (producto_id) => {
    const query = 'DELETE FROM productos WHERE producto_id = $1;';
    await db(query, [producto_id]);
};

// Editar o actualizar un producto OK
export const actualizarProducto = async ({ id, p_name, p_descripcion, p_precio, p_descuento, p_stock, p_category, p_feelings, p_negatives, p_helpwith, p_rating, p_img }) => {
    const query = `UPDATE productos SET p_name = $2, p_descripcion = $3, p_precio = $4, p_descuento = $5, p_stock = $6, p_category = $7, p_feelings = $8, p_negatives = $9, p_helpwith = $10, p_rating = $11, p_img = $12 WHERE producto_id = $1 RETURNING *; `;
    try {
        const result = await db(query, [id, p_name, p_descripcion, p_precio, p_descuento, p_stock, p_category, p_feelings, p_negatives, p_helpwith, p_rating, p_img]);
        console.log('Resultado de la base de datos:', result);
        return result;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
};

//---------------------------- VENTA - CARRITO -------------------------------------------------

// operaciones carrito
export const agregarProductoAlCarrito = async (usuario_id, producto_id, cantidad) => {
    const query = 'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *;';
    return await db(query, [usuario_id, producto_id, cantidad]);
  };
  
  export const obtenerProductosEnCarrito = async (usuario_id) => {
    const query = 'SELECT * FROM carrito WHERE usuario_id = $1;';
    return await db(query, [usuario_id]);
  };
  
  export const eliminarProductoDelCarrito = async (carrito_id) => {
    const query = 'DELETE FROM carrito WHERE carrito_id = $1;';
    return await db(query, [carrito_id]);
  };
  

// operaciones venta

// Realizar Venta
export const crearVenta = async (usuario_id, total, fecha) => {
    const query = 'INSERT INTO ventas (usuario_id, total, fecha) VALUES ($1, $2, $3) RETURNING *;';
    const result = await db(query, [usuario_id, total, fecha]);
  
    // Disminuir el inventario de los productos vendidos
    const updateQuery = `
      UPDATE productos 
      SET p_stock = p_stock - carrito.cantidad
      FROM carrito 
      WHERE productos.producto_id = carrito.producto_id AND carrito.usuario_id = $1;
    `;
    await db(updateQuery, [usuario_id]);
  
    // Limpiar el carrito después de la venta
    const clearCartQuery = 'DELETE FROM carrito WHERE usuario_id = $1;';
    await db(clearCartQuery, [usuario_id]);
  
    return result;
  };

  // Obtener venta de usuario
  export const obtenerVentasUsuario = async (usuario_id) => {
    const query = 'SELECT * FROM ventas WHERE usuario_id = $1;';
    return await db(query, [usuario_id]);
  };