import {Box} from "@mui/material"
import {styled} from '@mui/system'

//Use Css style components to avoid duplication 
const FlexBetween = styled(Box)({ //Box lets you pass styles as props in MUI componets 
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween