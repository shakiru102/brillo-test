import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (hashPassword: string, password: string) => {
    return await bcrypt.compare(hashPassword, password)
}