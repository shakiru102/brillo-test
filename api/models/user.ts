import { Schema, model } from 'mongoose'
import { userDetails } from '~/types/interface'



const useSchema = new Schema<userDetails>({
    email: String,
    interest: String,
    password: String,
    phonenumber: String,
    verified: Boolean,
    username: String
})

 const User =  model<userDetails>('users', useSchema)

 export default User