const HTTP_STATUS = {
    ok: {code: 200},
    created: {code: 201},
    unauthorized: {
        code: 401,
        text: {
            op0: 'Usuario o contrasena incorrecta.',
            op1: 'Token no proporcionado.',
            op2: 'Formato de token invalido.',
            op3: 'Token invalido.'
        }
    },
    not_found: {code:404, text: ' Resource not found.'},
    internal_server_error: {code:500}
}

export default HTTP_STATUS