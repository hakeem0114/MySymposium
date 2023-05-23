//MUI Imports
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";


  //React Imports
  import { useState } from "react";
  import Dropzone from "react-dropzone";

  //Redux Imports
  import { useDispatch, useSelector } from "react-redux";

  //Image Components
  import UserImage from "../../components/UserImage";

  //Style Components
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";

//Import States
  import { setPosts } from "../../states/states";
  
  const MyPostWidget = ({ picturePath }) => {

    //Dispatch state with redux
    const dispatch = useDispatch();
    
    //States for post & image contents
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    //Get user auth data: id & tokens
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    //Mobile queries
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

    //Themes
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  

/****HANDLE MYPOST***/
const handlePost = async () => {

      const formData = new FormData();

      //Need formData & react dropzone again like in the registration page
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      //POST API call
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();

      //Update setPosts reduce with redux dispatch & wait for props
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
                placeholder="Share what you did today..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
                }}
            />
        </FlexBetween>

        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            marginTop="1rem"
            padding="1rem"
          >
                <Dropzone
                acceptedFiles=".jpg, .jpeg, .png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                    <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                        <input {...getInputProps()} />
                        {!image ? (
                        <p>Add Image Here</p>
                        ) : (
                        <FlexBetween>
                            <Typography>{image.name}</Typography>
                            <EditOutlined />
                        </FlexBetween>
                        )}
                    </Box>
                    {image && (
                        <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "19%" }}
                        >
                        <DeleteOutlined />
                        </IconButton>
                    )}
                    </FlexBetween>
                )}
                </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Reel</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>

        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;