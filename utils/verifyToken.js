import {createError} from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{
    const token= req.cookies.access_token
    console.log("Token", token)
    if(!token){ 
        return next(createError(401, 'You are not authenticated'))
    }
    jwt.verify(token,"#@%itsx#$%trong",(err, user)=>{
        if(err) return next(createError(403, 'invalid token'))
        req.user=user
    next()
    })
}
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
            
        }else{
        if(err) return next(createError(403, 'You are not authorized'))
   
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.user.isAdmin){
            next()
        }else{
         return next(createError(403, ' Not authorized as Admin'))
   
        }
    })
}