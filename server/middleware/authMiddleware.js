//Handle user authorization 
    //Hit API endpoints for verified users

import jwt  from 'jsonwebtoken'
import  dotenv  from "dotenv"; 

dotenv.config(); //To use dotenv files

//Create custom middleware to verify token
export const verifyToken = async(req, res, next) =>{
    try{//Send req

        //Let token's reqesu header be = "Authorization: Bearer"
        let token = req.header("Authorization") 

        if(!token){
            return res.status(403).send("Access Denied!")
        }

        if(token.startWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft() 
            //.trimLeft() removed white space from left of JWT
        }

        //Send verified token as part of JWT to browser
        const verified  = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified

        next() //Process to next middlware

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}