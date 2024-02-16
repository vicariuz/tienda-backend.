import db from '../database/db.js'
import {encrypt, compare } from '../../../utils/bcrypt.js'

export const login = async(email, password) => {
    const [user]= await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    return !compare(password, user.password) ?  []: [user]
}   

export const findUserByEmail = async (email = ' ') =>
await db('SELECT * FROM usuarios WHERE email = $1;', [email])

export const register = async ({email, password, rol, lenguage}) => {
    const query = 'INSERT INTO usuarios (id,email,password,rol,lenguage) VALUES (DEFAULT, $1,$2,$3,$4) RETURNING *;'
    return await db(query, [email,encrypt(password), rol, lenguage])
}
