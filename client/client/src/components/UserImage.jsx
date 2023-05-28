import {Box} from "@mui/material"


//Profile Pic for each user. Similar CSS to old dashboard project
//IMAGE COMPONENT FROM LOCAL STORAGE
const UserImage = ({image, size = '60px'}) =>{
    return(
        <Box width={size} height={size}>
            <img 
                style={{
                    borderRadius:'50%',
                    objectFit: "cover"
                }}
                width={size}
                height={size}
                alt="user"
                src={`https://mysymposium-server.onrender.com/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;