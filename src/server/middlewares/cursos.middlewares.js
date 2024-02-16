import HTTP_STATUS from "../../config/constants.js";
import { jwtVerify } from "../../../utils/jwt.js";

export const authToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(HTTP_STATUS.unauthorized.code).json({
            code: HTTP_STATUS.unauthorized.code,
            message: HTTP_STATUS.unauthorized.text.op1
        });
    }

    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(HTTP_STATUS.unauthorized.code).json({
            code: HTTP_STATUS.unauthorized.code,
            message: HTTP_STATUS.unauthorized.text.op2
        });
    }

    try {
        jwtVerify(token);
        next();
    } catch (error) {
        console.error('Error verificando el token:', error);
        res.status(HTTP_STATUS.unauthorized.code).json({
            code: HTTP_STATUS.unauthorized.code,
            message: 'Token inválido.'
        });
    }
};
