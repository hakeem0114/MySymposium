//React Imports
import { useState } from "react"

//Redux Imports
import { useDispatch,useSelector } from "react-redux"
import { setMode, setLogout} from "states/states"

//React Router Imports
import { useNavigate } from "react-router-dom"


//Material UI Imports
import {
    Box, 
    IconButton, 
    InputBase, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    useTheme, 
    useMediaQuery
} from '@mui/material'
import{
    Search, 
    Message, 
    DarkMode, 
    LightMode, 
    Notifications, 
    Help, 
    Menu, 
    Close
} from "@mui/icons-material"

//Components Imports
import FlexBetween from "components/FlexBetween"



const NavBar = ()=>{
    return(
        <div>
            NavBar
        </div>
    )
}

export{
    NavBar
}