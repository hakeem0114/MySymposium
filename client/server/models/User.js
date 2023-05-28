import mongoose from "mongoose";
import bcrypt from 'bcrypt';


//Refer to ERD diagrams 
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    dogBreed: {
        type: String,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    picturePath: {
        type: String,
        default: '',
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
    
}, {timestamps: true});

const User = mongoose.model('User', UserSchema) //user(s) in MongoDB collection

export default User;