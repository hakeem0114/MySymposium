import bcrypt from 'bcrypt'
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
        res.status(500).json(err)
    }
}

/****LOG IN USER***/
export const login =  async(req, res)=>{
    const {
        email,
        password
    }= req.body

    try{

    }
    catch(err){
        
    }
}