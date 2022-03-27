import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (hashPassword: string, password: string) => await bcrypt.compare(hashPassword, password)