CREATE DATABASE tienda;

CREATE USER app WITH PASSWORD 'password123';

GRANT ALL PRIVILEGES ON DATABASE tienda TO app;

CREATE TABLE usuarios (
  usuario_id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR (255) NOT NULL
);


CREATE TABLE productos (
  producto_id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  categoria VARCHAR(255),
  producto_img VARCHAR(255)
);


CREATE TABLE carrito (
  carrito_id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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