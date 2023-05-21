import express from 'express'
import{
    getUser, 
    getUserFriends, 
    addRemoveFriend, 
} from "../controllers/authUsers.js"
import{verifyToken} from '../middleware/authMiddleware.js'

const router = express.Router()

/***GET***/
//Query strings to GET(read) user's id in mongoDB***/
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

//router.get("/:id/removedFriends", verifyToken, getRemoveFriend)
//In the future, add another page for removed friends with functionalities



/***PATCH (UPDATE)**/
router.patch('/:id/friendId', verifyToken, addRemoveFriend)



export default router