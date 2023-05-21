import User from "../models/User.js"

/***GET***/
export const getUser = async(req, res) =>{
    try{
        const {id} = req.params 
        const user = await User.findById(id)

        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

export const getUserFriends = async (req, res) =>{
    try{
        const {id} = req.params 
        const user = await User.findById(id)

        //Format updated friends list for client
            //Get array of user's friends as per ERD
            //Promise.all() to resolve only when ALL the friend's IDs are retrieved
            const friends = await Promise.all(
                user.friends.map((id)=> User.findById(id))
            )

            //Format data properly for client to match schema
            const formattedFriends = friends.map(
                ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                    return(
                        {_id, firstName, lastName, occupation, location, picturePath}
                    )
                }
            )

            res.status(200).json(formattedFriends)
    }
    catch(err){
        res.status(404).json({error: err.message})
    }
}

/***PATCH (UPDATE)**/
export const addRemoveFriend = async (req, res)=>{
    try{
        const {id, friendId} = req.params

        const user = await User.findById(id) //User model contains "friends"
        const friend = await User.findById(friendId) //Another user for to hold the friend

        //If user has a friend's ID, REMOVE IT (Will be button on the client to do trigger this)
        if(user.friends.includes(friendId)){

            //Remove friend from current User schema by making its friendID not equal user's ID
            //Same with the other friend

            user.friends = user.friends.filter((id)=> id !== friendId)
            friend.friends = friend.friends.filter((id)=> id !== id)
        }else{
            //Click button to add friend

            user.friends.push(friendId)
            friend.friends.push(id)
        }

        //Save/Update on database
        await user.save()
        await friend.save()

        //Format updated friends list for user
            //Get array of user's friends as per ERD
            //Promise.all() to resolve only when ALL the friend's IDs are retrieved
            const friends = await Promise.all(
                user.friends.map((id)=> User.findById(id))
            )

            //Format data properly for client to match schema
            const formattedFriends = friends.map(
                ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                    return(
                        {_id, firstName, lastName, occupation, location, picturePath}
                    )
                }
            )

            res.status(200).json(formattedFriends)
    }
    catch(err){
        res.status(404).json({error: err.message})
    }
}