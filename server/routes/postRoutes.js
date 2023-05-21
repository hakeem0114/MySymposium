import express from 'express'
import {
    getFeedPosts, 
    getUserPosts, 
    likePost
} from "../controllers/postController.js"
import {verifyToken} from '../middleware/authMiddleware.js'


const router = express.Router()


/*****GET****/
router.get('/', verifyToken, getFeedPosts) //Use OpenAI to curate relevant feed on homepage
router.get('/:userId/posts', verifyToken, getUserPosts) //Retrict to user only posts on their page


/***PATCH (UPDATE)**/
router.patch('/:id/like', verifyToken, likePost)


export default router