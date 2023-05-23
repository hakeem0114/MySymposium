//MUI Imports
import {Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from './Form'




const LoginPage = ()=>{

    //Use MUI theme
    const theme = useTheme()

    //Desktop screen media query
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    return <Box> 
                {/**Desktop Login Page Background Box**/}  
                <Box  
                    width="100%" 
                    backgroundColor={theme.palette.background.alt} 
                    padding="1rem 10%"
                    textAlign="center"
                 >   
                        <Typography
                                fontWeight="bold"
                                fontSize="35px"
                                color="primary"
                        >          
                            MySymposium
                        </Typography>    
                 </Box> 

                {/**Mobile Login Page BackGround based on media query**/}  
                 <Box
                    width={isNonMobileScreens ? "47%": "90%"}
                    margin="2rem auto"
                    padding = "2rem"
                    borderRadius="1.5rem"

                    backgroundColor = {theme.palette.background.alt}
                 >
                        <Typography
                                fontWeight="450"
                                sx={{marginBottom:"1.5rem"}}
                                variant ='h5'
                                align= 'center'
                        >          
                          
                         The Social App for Fellow dog moms, dads & lovers!
                        </Typography>  

                        <Form>  

                        </Form>
                 </Box>

        </Box>
}

export{
    LoginPage
}