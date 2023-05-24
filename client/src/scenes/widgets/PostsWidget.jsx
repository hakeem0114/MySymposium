 //React Imports
 import { useEffect} from "react";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";

//Import States
import { setPosts } from "../../states/states";

//Widget Imports
import PostWidget from "./PostWidget";
//import Footer from './FooterWidget'


/***ALL PAGE POSTS WIDGET***/
const PostsWidget = ({ userId, isProfile = false }) => {

    //Redux States
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
  
    //GET API Call for ALL POSTS
    const getPosts = async () => {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
  
    //GET API Call for User Only Posts
    const getUserPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
  
    //Calls & Renders user profile after browser has finished rendering.

    //If on user/profile path, getUserPosts,else, get all posts on MySymposium/home
    useEffect(() => {
      if (isProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    }, []);  
  
    //console.log(posts.values)
    //Fixed posts map by only mapping while its truthy
    return (
      <>
        {posts.length && posts.map(({
              
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                />
              )
          )}
      </>
    );
  };
  
  export default PostsWidget;
