CREATE DATABASE tienda;

CREATE USER app WITH PASSWORD 'password123';

GRANT ALL PRIVILEGES ON DATABASE tienda TO app;

CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fechanacimiento DATE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE productos (
  producto_id SERIAL PRIMARY KEY,
  p_name VARCHAR(255) NOT NULL,
  p_descripcion VARCHAR(500),
  p_precio DECIMAL(10,2) NOT NULL,
  p_descuento DECIMAL(10,2) NOT NULL,
  p_stock INTEGER NOT NULL,
  p_category VARCHAR(255),
  p_feelings VARCHAR(255),
  p_negatives VARCHAR(255),
  p_helpwith VARCHAR(255),
  p_rating INTEGER NOT NULL,
  p_img VARCHAR(255)
);


CREATE TABLE carrito (
  carrito_id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  estado_pedido VARCHAR(50) NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


CREATE TABLE detalle_carrito (
  detalle_carrito_id SERIAL PRIMARY KEY,
  carrito_id INTEGER,
  producto_id INTEGER,
  cantidad INTEGER NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carrito(carrito_id),
  FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);