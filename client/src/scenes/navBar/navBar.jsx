//React Imports
import { useState } from "react"

//Redux Imports
import { useDispatch,useSelector } from "react-redux"
import { setMode, setLogout} from "../../states/states"

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
    useMediaQuery,
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

//React Icons Imports
//import {SiDatadog} from 'react-icons/si'

//Components Imports
import FlexBetween from "../../components/FlexBetween"



const NavBar = ()=>{


    //Dispatch actions from reducer
    const dispatch = useDispatch()

    //Navigate react routes
    const navigate = useNavigate()

    //Select global states for current user
    const user = useSelector((state)=> state.user)

    //Material UI
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false) //Initally on desktop
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)") //Material UI version of CSS mediaQuery
    
    const theme = useTheme() //MUI hook gives access to the themeSettings in ./themes
    const neutralLight = theme.palette.neutral.light 
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt 

    //User Info
    //const fullName = `Test Name`
    const fullName = `${user.firstName} ${user.lastName}`
    
    //Default theme = dark
    theme.palette.mode === "dark" 

    return(
        <FlexBetween  padding="1rem 6%" background={alt} >
            <FlexBetween   gap="1.75rem" >

                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.5rem)"
                        color="primary"
                        onClick={ ()=> navigate("/MySymposium/home")}
                        sx={{
                            /*Add in custom css with pseudo selectors*/
                            /*sx prop is a shortcut for defining custom styles that has access to the theme.*/
                            /*Hover is applied to root div*/
                            "&:hover":{
                                    color: primaryLight,
                                    cursor: "pointer",
                            },
                        }}
                    >          
                        MySymposium
                    </Typography>
                    

                    {/**Show Search Bar For Non-Mobile Screens**/}
                    {isNonMobileScreens && (
                        <FlexBetween 
                            backgroundColor={neutralLight}
                            borderRadius="9px"
                            gap="3rem"
                            padding="0.1rem 1.5rem"
                        >
                            <InputBase placeholder="Search Name..."   />

                            <IconButton>    
                                <Search/>
                            </IconButton>

                        </FlexBetween>
                    )}
                    
            </FlexBetween>


            {/***DESKTOP NAVBAR***/}
            {isNonMobileScreens 
            ?(
                <FlexBetween  gap="2rem">
                    <IconButton  onClick={()=> dispatch(setMode())}  >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx= {{fontSize: "25px"}} />
                        ):(
                            <LightMode sx={{color:dark, fontSize:"25px"}} />
                        )}              
                    </IconButton>

                    <Message  sx= {{ fontSize: "25px"}} />

                    <Notifications  sx= {{fontSize: "25px"}}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx= {{
                                        "&:hover":{
                                            color: primaryLight,
                                            cursor: "pointer",
                                        },
                                    }} />
                            ):(
                                <LightMode sx={{color:dark, fontSize:"25px"}} />
                            )}        
                    </Notifications> 
                    
                    <Help  sx= {{fontSize: "25px"}} />

                    {/***Custom Drop-down To Show User Profile & Logout**/}
                    <FormControl variant= "outlined" value={fullName}>
                            <Select
                                    value = {fullName}
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root":{
                                            pr: "0.25rem",
                                            width: "3rem"
                                        },
                                        "& .MuiSelect-select:focus":{
                                            backgroundColor: neutralLight
                                        }
                                    }}
                                    input={<InputBase />}
                            >
                                <MenuItem  value={fullName} >
                                    <Typography>{fullName}</Typography>
                                </MenuItem>

                                <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>         
                            </Select>                           
                    </FormControl>
                </FlexBetween>
             ) 
            : (
                
                <IconButton 
                    onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                > 
                    {/**MOBILE MENU toggles on/off on click***/}
                    <Menu/>
                </IconButton>
             )}


            {/***MOBILE NAVBAR***/}
                {/**If its a mobile screen & its mobile menu nav have been toggled, ..**/}
            {!isNonMobileScreens && isMobileMenuToggled &&(
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/** CLOSE ICON**/}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                             onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}   
                        >
                            <Close/>
                        </IconButton>   
                    </Box>


                    {/**MENU ITEMS**/}
                    <FlexBetween  
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center"  
                        alignItems="center"
                        gap="3rem"
                    >
                            <IconButton  
                                onClick={()=> dispatch(setMode())}  
                                sx={{fontSize:"25px"}}
                            >
                                    {theme.palette.mode === "dark" ? (
                                        <DarkMode sx= {{fontSize: "25px"}} />
                                    ):(
                                        <LightMode sx={{color:dark, fontSize:"25px"}} />
                                    )}              
                            </IconButton>

                            <Message  sx= {{fontSize: "25px"}} />
                            <Notifications  sx= {{fontSize: "25px"}} />
                            <Help  sx= {{fontSize: "25px"}} />
                            <FormControl variant= "standard" value={fullName}>
                            
                                    <Select
                                        value = {fullName}
                                        sx={{
                                                backgroundColor: neutralLight,
                                                width: "150px",
                                                borderRadius: "0.25rem",
                                                p: "0.25rem 1rem",
                                                "& .MuiSvgIcon-root":{
                                                pr: "0.25rem",
                                                width: "3rem"
                                                },
                                                "& .MuiSelect-select:focus":{
                                                    backgroundColor: neutralLight
                                                }
                                            }}
                                        
                                        input={<InputBase />}
                                    >
                                    
                                            <MenuItem  value={fullName} >
                                                <Typography>{fullName}</Typography>
                                            </MenuItem>

                                            <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
                                    </Select>
                            
                            </FormControl>
                            
                        </FlexBetween>                
                </Box>
            )}
             

        </FlexBetween>
    )
}

export{
    NavBar
}