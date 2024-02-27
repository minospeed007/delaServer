import express from 'express'

import { login,register,registerAdmin,AdminLogin, } from '../controllers/auth.js'
import {deposit} from '../controllers/deposit.js'
import {withdraw} from '../controllers/withdrawal.js'

const router = express.Router();

router.post('/register', register)
router.post('/admin', registerAdmin)

router.post('/login', login)
router.post('/admin_login', AdminLogin)
//deposit route
router.post('/deposit', deposit)
// withdrawal route
router.post('/withdrawal', withdraw)







export default router