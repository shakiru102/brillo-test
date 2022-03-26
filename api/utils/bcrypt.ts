import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

export const verifyPassword = (hashPassword: string, password: string) => bcrypt.compare(hashPassword, password)