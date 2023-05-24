import bcrypt from 'bcrypt'
import  dotenv  from "dotenv"; 
import jwt  from 'jsonwebtoken'
import User from '../models/User.js'

/***REGISTER USER***/
export const register = async (req, res)=>{
    try{
        //destructure from client's form 
        const{
            firstName,
            lastName,
            friends,
            dogBreed,
            email,
            password,
            picturePath,
            location,
            occupation,
            viewedProfile,
            impressions,
            a,
        } = req.body

        console.log('Received req.body')
        
        //Hash new user password with Bcrypt
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        //Create newUser model with the hashed password
        const newUser = new User ({
            firstName,
            lastName,
            friends,
            dogBreed,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile: Math.ceil(Math.random()*10000),
            impressions: Math.floor(Math.random()*10000),
        })

        //Save to database
        const savedUser = await newUser.save()
        
        //Response Code to client (POST-Sucess)
        res.status(201).json(savedUser)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

/****LOG IN USER***/
export const login =  async(req, res)=>{
    try{
        const {
            email,
            password
        }= req.body

        //Get user model with its email in dB
        const user = await User.findOne({email: email}) //since prop are the same, can use {email}
        if(!user) return res.status(400).json({msg: "Invalid User"})


        //Check if password matches database using bcrypt
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)return res.status(400).json({msg: "Invalid Password"})

        
        //Create JWT to send cookie to browser after confirming user login
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        //Delete password so its not sent to client. even with httpsOnly option (better to be safe)
        delete user.password

        //Send response to client (GET-sucess)
        res.status(200).json({token, user})

        console.log('Logged In User')

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}