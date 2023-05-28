//MUI Imports
import {Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from './Form'


//import Footer from './FooterWidget'

const LoginPage = ()=>{

    //Use MUI theme
    const theme = useTheme()

    //Desktop screen media query
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    //Main Back Image
    //const backImage = '../../../public/backImage.jpg'
    //const backImage = '/public/backImage.jpg'
    const backImage = '../../../public/assets/backImage.jpg'
    
    return <Box
                sx={{
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: "100%",
                    height: "100%",
                    
                }}
            > 
                {/**Header At Top Of Login Page**/}  
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

                {/**Mobile & Destop Login Page Form Size based on media query**/}  
                 <Box
                    width={isNonMobileScreens ? "30%": "90%"}
                    
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
                          
                         The Social App for fellow dog moms, dads & lovers!
                        </Typography>  

                        <Form>  

                        </Form>
                 </Box>

        </Box>
}

export{
    LoginPage
}