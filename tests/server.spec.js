const request = require("supertest");
const server = require("../src/index").default;

describe("Registro de Usuarios", () => {
  it("Debería fallar al registrar un nuevo usuario (400)", async () => {
    const usuarioValido = {
      nombre: "Ejemplo",
      email: "correo@gmail.com", // Correo electrónico valido
      password: "123456789", // Contraseña corta
      rol: "usuario_regular",
    };

    const response = await request(server).post("/usuarios").send(usuarioValido);
    const status = response.statusCode;

    console.log('Respuesta del servidor:', response);
    console.log('Cuerpo de la respuesta:', response.body);

    expect(status).toBe(201);
  });
});
