import Post from '../models/Post.js'
import User from '../models/User.js'

/***POST: Create Post***/
export const createPost = async (req, res)=>{
    try{
        const {userId, description, picturePath} = req.body
        const user = await User.findById(userId)

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location, 
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        //Save to dB
        await newPost.save()

        //Find & return ALL posts from dB to update all current posts on clients 
        const post = await Post.find()

        res.status(201).json(post)

    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}


/***GET***/
export const getFeedPosts = async (req, res)=>{
    try{
        const post = await Post.find() //Get ALL User posts
        res.status(200).json(post)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) =>{
    try{
        const {userId} = req.params
        const post = await Post.find({userId}) //Get specific user post

        res.status(200).json(post)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

/***UPDATE***/
export const likePost = async (req, res)=>{
    try{
        const {id} = req.params; //post's ID
        const {userId} = req.body; //current user's ID 

        const post = await Post.findById(id) //Get specific post
        const isLiked = post.likes.get(userId) //Returns userID if inside likes MAP data structure

        //If user has liked a post, unlike it, else like it
        if(isLiked){    
            post.likes.delete(userId) //map data structure methods like .has(), .delete(), .set()
        }else{
            post.likes.set(userId, true)
        }

        //Update specific post
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes},
            {new:true}
        );

        //Update client after liking post
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(404).json({message: err.message})
    }
}