import joi from 'joi'
import { changePassword, loginDetails, userDetails } from '~/types/interface'

const userSignupSchema = joi.object<userDetails>({
    email: joi.string().email().required(),
    interest: joi.string().required(),
    password: joi.string().required().min(8),
    phonenumber: joi.string().required()
})

const userLoginSchema = joi.object({
    username: joi.string(),
    password: joi.string().required()
})

const userChangePasswordSchema = joi.object({
    password: joi.string().required().min(8),
    newPassword: joi.string().required().min(8)
})

const userUpdateData = joi.object<userDetails>({
    email: joi.string().email().required(),
    interest: joi.string().required(),
    phonenumber: joi.string().required(),
    username: joi.string()
})


export const userSignupValidation = (doc: userDetails) => userSignupSchema.validate(doc)
// @ts-ignore
export const userLoginValidation = (doc: loginDetails) => userLoginSchema.validate(doc)

export const userChangePasswordValidation = (doc: changePassword) => userChangePasswordSchema.validate(doc)

export const userUpdateDataValidation = (doc: userDetails) => userUpdateData.validate(doc)