import express from 'express'
import {register} from '../controllers/auth.js'
import {updateUser,deleteUser,getUser,getUsers,createCustomer

} from '../controllers/users.js'
import {verifyToken,verifyUser,verifyAdmin} from '../utils/verifyToken.js'
// create new customer

const router = express.Router();
router.post("/register_customer", createCustomer);

router.get("/checkAuthentication",verifyToken,(req,res,next)=>{
   res.send('You are logged in')
})
router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
   res.send('You are logged in and you can delete all accounts')
})
router.post("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
   res.send('You are logged in and you can delete your account')
})
//create user route
router.post("/user", register);
// Update route
router.put("/:id",updateUser)
// Delete Route
router.delete("/:id", deleteUser)

//GET
//router.get("/:id",verifyUser, getUser)
router.get("/search/:phone", getUser)


// Get all users
router.get("/",getUsers)



export default router