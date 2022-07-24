import express from 'express'
import { userLogin, userProfile, userRegestration, updateUserProfile } from "../controllers/userController.js"
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/login').post(userLogin)
router.route('/profile').get(protect, userProfile)
router.route('/profile').put(protect, updateUserProfile)
router.route('/').post(userRegestration)


export default router