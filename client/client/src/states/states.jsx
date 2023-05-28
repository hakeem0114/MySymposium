//Redux Toolkit Import 
import { createSlice } from "@reduxjs/toolkit";


//Global state (no need for props)
const initialState = {
    mode: "light", 
    user: null,
    token: null,
    posts: [],
}

//Redux function to modifiy global states in "initialState"
export const  authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) =>{
            //light/dark mode on click
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action)=>{
            //Assign new paramaters to each state from server
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state)=>{
            //Reset states
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action)=>{
            if(state.user){
                //Store user friends in new state if they exist in database
                state.user.friends = action.payload.friends;
            }else{
                console.error("User Friends DNE")
            }
        },
        setPosts: (state, action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state, action)=>{
            const  updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post;

                return post
            })
            state.posts = updatedPosts;
        }

    }
})

//Export reducers using Redux toolkit
export const {
    setMode, 
    setLogin, 
    setLogout,
    setFriends,
    setPosts,
    setPost
} = authSlice.actions


//Export the initial states
export default authSlice.reducer