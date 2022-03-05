const HttpCode = {
    SUCCESS: '200',
    CREATED: '201',
    UNAUTHORIZED: '401',
    DUPLICATED: '409',
    USER_NOT_FOUND: '404'
}

const HttpMessage = {
    SUCCESS: 'Se completo la acción con exito',
    CREATED: 'Se guarda con exito',
    UNAUTHORIZED: 'Codigo no valido',
    DUPLICATED: 'Esta cuenta ya existe',
    USER_NOT_FOUND: 'El correo no se encuentra registrado',
    EMAIL_WAS_SENDED: 'El codigo fue enviado al email registrado con exito'
}

module.exports = { HttpCode, HttpMessage }