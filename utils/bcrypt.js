import bcrypt from 'bcryptjs';

export const encrypt = (password) => bcrypt. hashSync(password)

export const compare= (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword)