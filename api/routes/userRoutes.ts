import { Router } from "express";
import { auth, login, signout, signup, updateData, updatePassword, verifyUser } from "../controllers/userControllers";
import { loginAuth, signupAuth, updateDoc, updatePass } from "../serverMiddlewares/userMiddleware";

const router = Router()

router.post('/user/signup', signupAuth, signup)
router.post('/user/login', loginAuth, login)
router.get('/user/auths', auth)
router.post('/user/updatedata/:id', updateDoc, updateData)
router.post('/user/updatepassword/:id', updatePass, updatePassword)
router.get('/user/verifyaccount', verifyUser)
router.get('/user/signout', signout)

export default router