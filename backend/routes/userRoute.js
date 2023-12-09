import express from "express";
import { deleteUser, logOut, login, register, updateProfile, userProfile } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', register)
router.post('/login', login)
router.post('/logout', logOut)
router.route('/profile').get(protect, userProfile).put(protect, updateProfile).delete(protect, deleteUser)

export default router