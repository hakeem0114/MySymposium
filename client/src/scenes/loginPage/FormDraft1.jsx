//REFRACTORED TO FORM.JSX


//React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Redux Import
import { useDispatch } from "react-redux";
import { setFriends, setLogin } from "../../states/states";

//React Dropzone Import
import Dropzone from "react-dropzone";

//Material UI Imports
import {
    Box, 
    Button, 
    InputBase, 
    TextField, 
    Typography, 
    useTheme, 
    useMediaQuery,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
//import PetsIcon from '@mui/icons-material/Pets';
import { shadows } from '@mui/system';


//MUI components
import FlexBetween from "../../components/FlexBetween"

//Forms Library Import 
import { Formik } from "formik";

//Validation Library Import 
import * as yup from "yup" //Import everything


/*****YUP VALIDATION SCHEMA***/
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    dogBreed: yup.string().required("required"),
    email: yup.string().email("must be a valid email").required("required"),
    password:  yup.string().min(5, 'must be at least 5 characters long').required("required"),
    location:  yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("must be a valid email").required("required"),
    password:  yup.string().min(5, 'must be at least 5 characters long').required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName:  "",
    dogBreed:  "",
    email: "",
    password: "",
    location: "",
    occupation:  "",
    picture:  "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};


/***FORMIK FORM CREATION****/
//Render different form depending on pageType

const Form = ()=>{
    

    //MUI themes
    const {palette} = useTheme();

    //Redux state dispatcher
    const dispatch = useDispatch();

    //React router
    const navigate = useNavigate();

    //Destop & Mobile Media Queries
    const isNonMobileScreens = useMediaQuery('(min-width:600px)');


    //Redux States
    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';


    //Send register data to server using Fetch API & handle response
    const register = async(values, onSubmitProps)=>{
        
        //Send image with req.body to server (refer to MDN)
        const formData = new FormData();

        for(let value in values){
            formData.append(value, values[value]);
        }

        formData.append('picturePath', values.picture.name);

        //POST req to server
        const getSavedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method:"POST",
                body: formData,
            }
        )

        //GET req from server
        const newSavedUser = await getSavedUserResponse.json();

        //Reset form after submission
        onSubmitProps.resetForm();

        //If GET is sucessful
        if(newSavedUser){
            //Update state to login
            setPageType("login");
        }
    }

    //Send login data to server using Fetch API & handle response
    const login = async(values, onSubmitProps)=>{
    
    
            //POST req to server
            const getLoggedInResponse = await fetch(
                "http://localhost:3001/auth/login",
                {
                    method:"POST",
                    headers:{ "Content-Type": "application/json"},
                    body: JSON.stringify(values),
                }
            )

            //GET req from server
            const newLoggedInUser = await getLoggedInResponse.json()

    
            //Reset form after submission
            onSubmitProps.resetForm()
    
            //If GET is sucessful
            if(newLoggedInUser){
                //Authorize user to logIn by passing its user info & JWT to client redux state variables
                //Dispatch actions from redux reducers
                dispatch(
                    setLogin({
                        user:newLoggedInUser.user,
                        token: newLoggedInUser.token,
                    })
                )
                //Redirect to homePage
                navigate('/home');
            }
    }

    //FORMIK SUBMIT HANDLER (refer to docs)
    const handleFormSubmit = async (values, onSubmitProps) =>{
        
        if(isLogin){
            await login(values, onSubmitProps)
        }

        if(isRegister){
            await register(values, onSubmitProps)
        }
    }

    
    return(
        <Formik
            
            onSubmit = {handleFormSubmit}

            initialValuesLogin = {isLogin ? initialValuesLogin : initialValuesRegister }

            validationSchema = {isLogin ? loginSchema: registerSchema }
 
        >
            {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue, 
                    resetForm,
                }) => (
                        <form onSubmit={handleSubmit}>

                                {/**Submission Formik Form Css*/}
                                <Box
                                    display="grid"
                                    gap="30px"
                                
                                    gridTemplateColumns="repeat(2,minmax(0,1.2fr)"
                                    sx={{
                                        boxShadow= '3',

                                        "& > div": {
                                            gridColumn: isNonMobileScreens ? undefined : 'span 4'
                                        }
                                    }}
                                >   
                                    {/**If Form's state is on the register page, display the ff:**/}
                                    {isRegister &&(
                                        <>
                                            <TextField
                                                label = "First Name"

                                                onBlur ={handleBlur}
                                                onChange = {handleChange}
                                                value = {values.firstName}
                                                name = "firstName"


                                                error = {Boolean (touched.firstName) && Boolean(errors.firstName)}
                                                helperText = {touched.firstName && errors.firstName}
                                                sx= {{gridColumn: 'span 2'}}
                                            />

                                            <TextField
                                                label = "Last Name"

                                                onBlur ={handleBlur}
                                                onChange = {handleChange}
                                                value = {values.lastName}
                                                name = "lastName"

                                                error = {Boolean (touched.lastName) && Boolean(errors.lastName)}
                                                helperText = {touched.lastName && errors.lastName}
                                                sx= {{gridColumn: 'span 2'}}
                                            />

                                            <TextField
                                                label = "Dog Name"

                                                onBlur ={handleBlur}
                                                onChange = {handleChange}
                                                value = {values.dogBreed}
                                                name = "dogBreed"

  
                                                error = {Boolean (touched.dogBreed) && Boolean(errors.dogBreed)}
                                                helperText = {touched.dogBreed && errors.dogBreed}
                                                sx= {{gridColumn: 'span 2'}}
                                            />                                        
                                        
                                        <TextField
                                                label = "Location"

                                                onBlur ={handleBlur}
                                                onChange = {handleChange}
                                                value = {values.location}
                                                name = "location"

                                                error = {Boolean (touched.location) && Boolean(errors.location)}
                                                helperText = {touched.location && errors.location}
                                                sx= {{gridColumn: 'span 4'}}
                                            />

                                            <TextField
                                                label = "Occupation"

                                                onBlur ={handleBlur}
                                                onChange = {handleChange}
                                                value = {values.occupation}
                                                name = "occupation"

                                                error = {Boolean (touched.occupation) && Boolean(errors.occupation)}
                                                helperText = {touched.occupation && errors.occupation}
                                                sx= {{gridColumn: 'span 4'}}
                                            />
                            
                                            {/**Profile Image Upload Using React DropZone*/}
                                            <Box
                                                gridColumn='span 4'
                                                border = {`2px solid ${palette.neutral.medium}`}
                                                borderRadius="5px"
                                                padding = '1rem'
                                            >
                                                    <Dropzone

                                                        acceptedFiles='.jpeg, .jpeg, .png'
                                                        multiple={false}
                                                        onDrop={ (acceptedFiles)=>{
                                                            setFieldValue("picture", acceptedFiles[0])
                                                        }}
                                                    >
                                                        {/**Get React Dropzone props to setup the upload**/}
                                                    {({getRootProps, getInputProps })=>(
                                                            <Box
                                                                {...getRootProps()}
                                                                borderRadius='10px'
                                                                border={`4px dashed ${palette.primary.main}`}
                                                                padding="1.2rem"
                                                                sx={{
                                                                    "&:hover":{
                                                                        cursor: "pointer"
                                                                    }
                                                                }}
                                                            >
                                                                {/**Wait for picture to be added to dropzone**/}
                                                                <input{...getInputProps()} />
                                                                    {!values.picture ?(
                                                                        <p> <em>Upload Photo</em></p>
                                                                    ):(
                                                                        <FlexBetween> 
                                                                            <Typography
                                                                                textAlign='center'
                                                                            >
                                                                                {values.picture.name}
                                                                            </Typography>
                                                                            <ImageIcon/>
                                                                        </FlexBetween>
                                                                    )
                                                                }
                                                                
                                                                

                                                            </Box>
                                                    )}
                                                    </Dropzone>
                                            </Box>
                                        </>
                                    )}

                                    {/**REST OF THE FORM WITH LOGIN & SIGNUP BUTTONS*/}
                                    <TextField
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={
                                            Boolean(touched.email) && Boolean(errors.email)
                                        }
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={
                                            Boolean(touched.password) && Boolean(errors.password)
                                        }
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    {/**Buttons**/}
                                    <Box>
                                            <Button
                                                fullWidth
                                                type="submit"
                                                sx={{
                                                    m: "2rem 0",
                                                    p: "1rem",
                                                    backgroundColor: palette.primary.main,
                                                    color: palette.background.alt,
                                                    "&:hover": { color: palette.primary.main, boxShadow: 5 },
                                                }}
                                            >
                                                
                                                {/**If Form's state is on the login page, display the ff:**/}
                                                {isLogin ? "LOGIN" : "SIGNUP"}
                                            </Button>

                                            <Typography
                                                onClick={() => {
                                                    {/**Update form state*/}
                                                    setPageType(isLogin ? "register" : "login");
                                                    resetForm(); {/**Clean Up Past User Inputs*/}
                                                }}
                                                sx={{
                                                    
                                                    color: palette.primary.main,
                                                    "&:hover": {
                                                    cursor: "pointer",
                                                    color: palette.primary.light,
                                                    boxShadow: 10,
                                                    },
                                                }}
                                            >
                                                {/**Conditional comments for login & signup forms**/}
                                                {isLogin
                                                    ? `Join the dogmmunity here!. ${PetsIcon}`
                                                    : "Already have an account. Login here!"}
                                            </Typography>
                                    </Box>




                                        
                                </Box>

                        </form>
                      )
            }
        </Formik>
    )

}

export default Form