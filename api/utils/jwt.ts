import jwt from 'jsonwebtoken'

// @ts-ignore
export const signJwt = (id: string) => jwt.sign({ id }, process.env.JWT, { expiresIn: '24hrs' })
// @ts-ignore
export const verifyJwt = (token: string) => jwt.verify(token, process.env.JWT)
// @ts-ignore
export const decodeJwt = (token: string) => jwt.decode(token, process.env.JWT)