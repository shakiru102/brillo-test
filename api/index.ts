import express from 'express';
import moongoose from 'mongoose';
import env from 'dotenv'
import UserRoutes from './routes/userRoutes'
import cookie from 'cookie-parser'

env.config()
// @ts-ignore
moongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
.then(() => console.log('Mongodb connected'))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie())
app.use('/', UserRoutes)

export default app

