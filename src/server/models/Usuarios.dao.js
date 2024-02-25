import db from '../database/db.js'
import {encrypt, compare } from '../../../utils/bcrypt.js'

// login (ok)
export const login = async(email, password) => {
    const [user]= await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    return !compare(password, user.password) ?  []: [user]
}   

export const findUserByEmail = async (email = ' ') =>
await db('SELECT * FROM usuarios WHERE email = $1;', [email])

// Registrar un usuario (ok)
export const register = async ({nombre, fechanacimiento, email, direccion, password, rol}) => {
    const query = 'INSERT INTO usuarios (usuario_id,nombre, fechanacimiento, email,direccion, password, rol) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6) RETURNING *;'
    return await db(query, [nombre, fechanacimiento, email, direccion, encrypt(password), rol])
}

// Registrar un nuevo producto (proceso)
export const nuevoProducto = async ({p_name, p_descripcion, p_precio, p_descuento,p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img}) => {
    const query = 'INSERT INTO productos (producto_id, p_name, p_descripcion, p_precio,p_descuento, p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;'
    return await db(query, [p_name, p_descripcion, p_precio, p_descuento, p_stock, p_category,p_feelings,p_negatives,p_helpwith,p_rating,p_img])
}

// actualizar un producto
export const actualizarProducto = async ({ id, nombre, descripcion, precio, stock, categoria, producto_img }) => {
    const query = `UPDATE productos SET nombre = $2, descripcion = $3, precio = $4, stock = $5, categoria = $6, producto_img = $7 WHERE producto_id = $1 RETURNING *; `;
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

//Agregar Producto al Carrito 
export const agregarProductoAlCarrito = async (req, res) => {
    const { usuario_id, producto_id, cantidad } = req.body;

    // Obtener el precio del producto desde la base de datos
    const [producto] = await db('SELECT precio FROM productos WHERE producto_id = $1;', [producto_id]);

    // Calcular el precio total para este producto en el carrito
    const precio_venta = producto.precio * cantidad;

    // Insertar el producto en el detalle_carrito
    const query = 'INSERT INTO detalle_carrito (carrito_id, producto_id, cantidad, precio_venta) VALUES (DEFAULT, $1, $2, $3) RETURNING *;';
    const [detalle] = await db(query, [usuario_id, producto_id, cantidad, precio_venta]);

    // Actualizar el total en la tabla carrito
    await db('UPDATE carrito SET total = total + $1 WHERE carrito_id = $2;', [precio_venta, usuario_id]);

    // Puedes retornar el resultado directamente o manejarlo según tus necesidades
    return { detalle_carrito_id: detalle.detalle_carrito_id, producto_id, cantidad };
};


// Realizar Venta
export const realizarVenta = async (req, res) => {
    try {
        const { usuario_id } = req.body;

        // Actualizar el estado del carrito a 'completado'
        const queryCarrito = 'UPDATE carrito SET estado_pedido = $1 WHERE usuario_id = $2 AND estado_pedido = $3 RETURNING *;';
        const [carrito] = await db(queryCarrito, ['completado', usuario_id, 'pendiente']);

        // Obtener los productos del detalle_carrito
        const queryDetalle = 'SELECT * FROM detalle_carrito WHERE carrito_id = $1;';
        const productosCarrito = await db(queryDetalle, [carrito.carrito_id]);

        // Ajustar el inventario
        for (const productoCarrito of productosCarrito) {
            const { producto_id, cantidad } = productoCarrito;

            // Restar la cantidad vendida del stock en la tabla productos
            const queryStock = 'UPDATE productos SET stock = stock - $1 WHERE producto_id = $2 RETURNING *;';
            await db(queryStock, [cantidad, producto_id]);
        }

        res.status(HTTP_STATUS.ok.code).json({ message: 'Venta realizada con éxito.' });
    } catch (error) {
        res.status(HTTP_STATUS.internal_server_error.code).json({ error: error.message });
    }
};

