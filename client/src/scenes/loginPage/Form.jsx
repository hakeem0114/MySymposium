//React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Redux Import
import { useDispatch } from "react-redux";
import { setLogin } from "../../states/states";

//React Dropzone Import
import Dropzone from "react-dropzone";

//Material UI Imports
import {
    Box, 
    Button, 
    TextField, 
    Typography, 
    useTheme, 
    useMediaQuery,
} from '@mui/material'
//import ImageIcon from '@mui/icons-material/Image';
import PetsIcon from '@mui/icons-material/Pets';

//import { shadows } from '@mui/system';


//MUI components
import FlexBetween from "../../components/FlexBetween"

//Forms Library Import 
import { Formik } from "formik";

//Validation Library Import 
import * as yup from "yup" //Import everything



/*****YUP VALIDATION SCHEMA***/

//Registration Page
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    dogBreed: yup.string().required("required"),
    email: yup.string().email("must be a valid email").required("required"),
    password:  yup.string().min(5, 'must be at least 5 characters long').required("required"),
    location:  yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})


//Login Page
const loginSchema = yup.object().shape({
    email: yup.string().email("must be a valid email").required("required"),
    password:  yup.string().min(5, 'must be at least 5 characters long').required("required"),
})


/****YUP VALIDATION SCHEMA***/
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  dogBreed:  "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};   


/***FORMIT FORM****/
const Form = () => {

  //Saved states
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  //const isGuest = pageType === "guest";

  //Change States
  const dispatch = useDispatch();

  //Form themes
  const { palette } = useTheme();

  //React router
  const navigate = useNavigate();

  //Media Queries
  const isNonMobile = useMediaQuery("(min-width:600px)");



  //Register POST req
  const register = async (values, onSubmitProps) => {
    
      // this allows us to send form info with image
      const formData = new FormData();
      
      for (let value in values) {
        formData.append(value, values[value]);
      }

      formData.append("picturePath", values.picture.name);

      const savedUserResponse = await fetch(
        "https://mysymposium-server.onrender.com/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
  };


  //Login POST req
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://mysymposium-server.onrender.com/auth/login", 
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/MySymposium/home");
    }
  };

  //Handle formik on submit
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  /***GUEST***/
  const guestEmail = import.meta.env.VITE_GUEST_EMAIL
  const guestPassword = import.meta.env.VITE_GUEST_PASSWORD

  //Guest Login
  //const isGuest = login(guestEmail, guestPassword)


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}

    >

      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>



            {/**Submission Formik Form Css*/}
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(8, minmax(0, 1.2fr))"
            boxShadow= '10'
          >
            {/**If Form's state is on the register page, display the ff:**/}

            {isRegister && (
              <>
                    
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 4" }}
                />   

                <TextField
                  label="Dog Name or Breed"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dogBreed}
                  name="dogBreed"
                  error={Boolean(touched.dogBreed) && Boolean(errors.dogBreed)}
                  helperText={touched.dogBreed && errors.dogBreed}
                  sx={{ gridColumn: "span 4" }}
                />
    
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  
                  sx={{
                    gridColumn: "span 8",
                    "& > div": { gridColumn: isNonMobile ? "undefined" : "span 2" },
                  }}
                />

                {/**Profile Image Upload Using React DropZone*/}
                <Box
                  sx={{
                    gridColumn: "span 8",
                    "& > div": { gridColumn: isNonMobile ? "undefined" : "span 2" },
                  }}
                  border={`2px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  padding=".5rem"
                >
                  <Dropzone
                    acceptedFiles='.jpeg, .jpeg, .png'
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        borderRadius='15px'
                        border={`1px inset ${palette.primary.main}`}
                        padding="1.2rem"
                        sx={{ 
                            "&:hover": { 
                                transitionDelay:'100ms',
                                scale: '1.04',
                                cursor: "pointer" }
                             }}
                      >
                        {/**Wait for picture to be added to dropzone**/}
                        <input {...getInputProps()} />

                        {!values.picture ? (
                           <p> <i>Upload Photo</i> </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <PetsIcon/>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

                         

          {/**LOGIN & SIGNUP BUTTONS*/}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "1rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main , boxShadow: 5 },
              }}
            >
              {isLogin ? "LOGIN" : "SIGNUP"}
            </Button>


            {/**GUEST LOGIN BUTTONS*/}
            <Button
              fullWidth
              type="submit"
              sx={{
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main , boxShadow: 5 },
              }}
   
              onClick={()=> login(values.email=guestEmail,values.password=guestPassword )}
            >  
              {"GUEST LOGIN" }
              
            </Button>


            <Typography
                onClick={() => {
                  {/**Update form state*/}
                  setPageType(isLogin ? "register" : "login");
                  resetForm(); {/**Clean Up Past User Inputs*/}
                }}
                
                sx={{
                  mt: ".25rem",
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
                ?  `Join the dogmmunity here!`
                : "Already have an account. Login here!"}
            </Typography>
          </Box>

          
        </form>
      )}
    </Formik>
  );
};

export default Form;