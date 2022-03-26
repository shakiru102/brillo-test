import { NextFunction, Request, Response } from "express";
import { userChangePasswordValidation, userLoginValidation, userSignupValidation, userUpdateDataValidation } from "../utils/joi";

export const signupAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSignupValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userLoginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}

export const updateDoc = (req: Request, res: Response, next: NextFunction) => {
    const { error }  = userUpdateDataValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}

export const updatePass = (req: Request, res: Response, next: NextFunction) => {
    const { error }  = userChangePasswordValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}