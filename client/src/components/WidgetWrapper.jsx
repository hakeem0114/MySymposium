import {Box} from "@mui/material"
import {styled} from "@mui/system"

//Styled components for all homepage widgets
//STYLE COMPONENT 
const WidgetWrapper = styled(Box)(({theme})=>({
    padding: '1.25rem 1.25rem 0.75rem 1.25rem',
     backgroundColor: theme.palette.background.alt,
     borderRadius: "0.75rem"
}))

export default WidgetWrapper