import jwt from 'jsonwebtoken'

const KEY = process.env.JWT_SECRET_KEY

export const jwtSign = (payload) => jwt.sign(payload, KEY)

export const jwtVerify = (token) => jwt.verify(token, KEY)