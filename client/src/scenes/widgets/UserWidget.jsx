 //Fix loading page on UserWidget's user profile before sucessful get req
 
 //React Imports
 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";

//Redux Imports
 import { useSelector } from "react-redux";


//MUI Imports
import {
    ManageAccountsOutlined, 
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import PetsIcon from '@mui/icons-material/Pets';
  import { Box, Typography, Divider, useTheme } from "@mui/material";
   //Profile Loading
   //import CircularProgress from "@mui/material/CircularProgress";


  //Image Components
  import UserImage from "../../components/UserImage";

  //Style Components
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";

 
  


  /*****USER WIDGET****/


  const UserWidget = ({userId, picturePath})=>{
    
    //Loading
    //const [isFetching, setIsFetching] = useState(true); 

    //Grab states & populate user profile
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const token = useSelector((state)=> state.token);
    
    const navigate = useNavigate();

    //Widget Themes
    const main = palette.neutral.main;
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

    //GET API Call to server
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
  //Calls & Renders user profile after browser has finished rendering. 
    // useEffect(() => {
    //     getUser();
    //     setIsFetching(false);
    // }, []); 
    
    //Loading Widget
    // if ( !user && isFetching) {
    //     return (
    //       <Box sx={{ display: "flex", justifyContent: "center" }}>
    //         <CircularProgress />
    //       </Box>
    //     );
    // }

    useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) {
        return null;
      }

    //Destructure user info after API call
    const{
        firstName,
        lastName,
        location,
        dogBreed,
        occupation,
        viewedProfile,
        impressions,
        friends,
      } = user;

    
      return(
        <WidgetWrapper>
            {/*1st Section: User Photo & Info*/}
            <FlexBetween
                gap="0.5rem"
                paddingBottom="1rem"
                onClick={() => {
                    navigate(`/MySymposium/profile/${userId}`, { replace: true })

                  }}
                //onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                        <Box>
                            <Typography
                                variant="h3"
                                color={dark}
                                fontWeight="400"
                                sx={{
                                    "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                    },
                                }}
                                >
                                {firstName} {lastName}
                            </Typography>

                            <Typography color={medium}>
                                { (friends.length == 0)? `Find a friend`:(friends.length == 1)?`${friends.length} connection`:`${friends.length} connections`} 
                            </Typography>
                        </Box>
                </FlexBetween>

                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* 2nd Section: Dog Info */}
            <Box padding=".8rem 0">
                <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.6rem"
                    marginLeft='0.3rem'
                >
                    <PetsIcon/> <Typography color={medium}>{dogBreed}</Typography>
                </Box>
                
            </Box>

            <Divider />

            {/* 3rd Section: Location & Work */}
            <Box padding=".8rem 0">
                <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.6rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />
            

            {/* 4th Section: Views*/}
            <Box padding="1rem 0">
                <FlexBetween marginBottom="0.5rem">
                    <Typography color={medium}>Profile Views</Typography>
                    
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>

                <FlexBetween>
                    <Typography color={medium}>Impressions</Typography>
                    
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* 5th Section: Social Media*/}
            <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Media 
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../../../public/assets/instagram.gif" alt="insta" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Instagram
                                </Typography>                  
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../../../public/assets/linkedin.gif" alt="LinkedIn" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    LinkedIn
                                </Typography>                  
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../../../public/assets/twitter.gif" alt="bird app" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                   Twitter
                                </Typography>                  
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

              </Box>

        </WidgetWrapper>
      );
 
};

export default UserWidget; 