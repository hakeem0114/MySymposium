import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
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
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: { //O(1) constant lookup for MAP instead of array "Map.has(#)"
        type: Map,
        of: Boolean,
    },
    comments:{
        type: Array,
        default: []
    }
    
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema) //Post(s) in MongoDB collection

export default Post