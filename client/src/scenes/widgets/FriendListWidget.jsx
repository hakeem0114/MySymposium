 //React Imports
 import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import States
import { setFriends} from "../../states/states";

//MUI Imports
import { Box, Typography, useTheme } from "@mui/material";

//Style Components
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";

  

const FriendListWidget = ({ userId }) => {

  const dispatch = useDispatch();

  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);


  const getFriends = async () => {
    const response = await fetch(
      `https://mysymposium-server.onrender.com//users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); 

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;