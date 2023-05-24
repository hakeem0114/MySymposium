//Redux Imports
import { useSelector } from "react-redux";

//MUI Imports
import { Box, useMediaQuery } from "@mui/material";

//Widget Imports
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

//Scene Imports
import { NavBar } from "../navBar/navBar";



/**HOMEPAGE LAYOUT**/
const HomePage = () =>{

    //isNon will be used as a boolean later on & modify the query for Samsung phones later
    const isNonMobileScreens = useMediaQuery("(min-width:600px)");

    const { _id, picturePath } = useSelector((state) => state.user);
  
    return (
      <Box>
            <NavBar/>

            <Box
                width="100%"
                padding="2rem 11%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >

                <Box flexBasis={isNonMobileScreens ? "31%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    marginTop={isNonMobileScreens ? undefined : "1.6rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>

                {/**Only show friend's list & ads on desktop with ~20ish% of view**/}
                {isNonMobileScreens && (
                    <Box flexBasis="24%">
                        <AdvertWidget />

                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
      </Box>
    );
  };

export default HomePage