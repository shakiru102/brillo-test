import { Request, Response } from "express";
import sendGrid from '@sendgrid/mail'
import User from "../models/user";
import { decodeJwt, signJwt, verifyJwt } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/bcrypt";


export const signup = async (req: Request, res: Response) => {
   // @ts-ignore
sendGrid.setApiKey(process.env.SENDGRID)

   try {
       const verify = await User.findOne({ email: req.body.email })
       if(verify) throw new Error('User is already registered')
       const user = await User.create({...req.body, verified: false, password: await hashPassword(req.body.password) })
       console.log(user);
       
       const token = signJwt(user.id)
       await sendGrid.send({
           from: {
               name: 'BRILLOCONNECTZ',
               email: 'ashakiru53@gmail.com'
           },
           to: user.email,
           subject: 'Account Verification',
           html: `<div style="background: #EEEEEE; padding: 5em 2em">
                <div style="margin-bottem: 1em;">Dear sir/ma</div>
                Thank you for signing up for our services, we hope you would get the best experience throughout you stay with us,
                please verify your account using the link below <br />
                <a href="${ process.env.BASEURI }/${ token }">
                ${ process.env.BASEURI }/${ token }
                </a>
                <div style="margin-top: 3em;">Thank you. <br />
                Brilloconnectz
                </div>
             </div>`
       } as any)
       res.status(200).send('Please verify your account, a mail has been sent to your registered email address ')
   } catch (error: any) {
       console.log(error.message)
       res.status(400).send(error.message)
   }
}

export const login = async (req: Request, res: Response) => {
    try {
        const isEmail = await User.findOne({ email: req.body.username })
        if(!isEmail) {
        const isPhonenumber = await User.findOne({ phonenumber: req.body.username })
        if(!isPhonenumber) throw new Error('Users credentials is not correct')
        const confirmPassword = await verifyPassword(req.body.password, isPhonenumber.password)
        if(!confirmPassword) throw new Error('Invalid password')
        if(!isPhonenumber.verified) throw new Error('Account has not been verified')
         const token = signJwt(isPhonenumber.id)
         res.cookie('brilloAuth', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
         res.status(200).send('User is authenticated')
         return
        }
        const confirmPassword = await verifyPassword(req.body.password, isEmail.password)
        console.log(confirmPassword)
        if(!confirmPassword) throw new Error('Invalid password')
        if(!isEmail.verified) throw new Error('Account has not been verified')
         const token = signJwt(isEmail.id)
         res.cookie('brilloAuth', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
         res.status(200).send('User is authenticated')
    } catch (error: any) {
        res.status(400).send(error.message)
    }

}

export const auth = async (req: Request, res: Response) => {
    try {
        const token = await req.cookies.brilloAuth
        if(!token) throw new Error('Unauthroized')
        const authtoken = verifyJwt(token)
        if(!authtoken) throw new Error('Unauthorized')
        // @ts-ignore
        const user = await User.findOne({ _id: authtoken.id }, { email: 1 , phonenumber: 1 , interest: 1, username: 1 })
        res.status(200).json(user)
    } catch (error: any) {
        res.cookie('brilloAuth', '', { maxAge: 1000 })
        res.status(400).send(error.message)
    }
    
}

export const updateData = async (req: Request, res: Response) =>{
    try {
        await User.updateOne({ _id: req.params.id }, {
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            interest: req.body.interest,
            username: req.body.username
        })
        res.status(200).send('Data has been updated successfully')
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    console.log(req.params.id);
    
       try {
        const user = await User.findOne({ _id: req.params.id })
        if(!user) throw new Error('Can not get user')
         const verifyPass = await verifyPassword(req.body.password, user.password)
         if(!verifyPass) throw new Error('password is incorrect')
        await User.updateOne({ _id: req.params.id }, { password: await hashPassword(req.body.newPassword) })
        res.status(200).send('Password has been updated successfully')
       } catch (error: any) {
           res.status(400).send(error.message)
       }
}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const token = decodeJwt(req.query.id)
        if(!token) throw new Error('Can not verify your account')
        // @ts-ignore
        await User.updateOne({ _id: token.id }, { verified: true })
        res.status(200).send('account verified')
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

// export const resendMail = async (req: Request, res: Response) => {
//     try {
//         //  @ts-ignore
//        sendGrid.setApiKey(process.env.SENDGRID)
//        const user = await User.findOne({ email: req.body.email })
//        if(!user) throw new Error('Email is not registered ')
//        const token = signJwt(user.id)
//        await sendGrid.send({
//         from: {
//             name: 'BRILLOCONNECTZ',
//             email: 'ashakiru53@gmail.com'
//         },
//         to: user.email,
//         subject: 'Account Verification',
//         html: `<div style="background: #EEEEEE; padding: 5em 2em">
//              <div style="margin-bottem: 1em;">Dear sir/ma</div>
//              Thank you for signing up for our services, we hope you would get the best experience throughout you stay with us,
//              please verify your account using the link below <br />
//              <a href="${ process.env.BASEURI }/${ token }">
//              ${ process.env.BASEURI }/${ token }
//              </a>
//              <div style="margin-top: 3em;">Thank you. <br />
//              Brilloconnectz
//              </div>
//           </div>`
//     } as any)
//     res.status(200).send('Email has been sent successfully')
//     } catch (error: any) {
//         res.status(400).send(error.message)
//     }



// }

export const signout = (req: Request, res: Response) => {
    res.cookie('brilloAuth', '', { maxAge: 1000 })
    res.send('signed out')
}