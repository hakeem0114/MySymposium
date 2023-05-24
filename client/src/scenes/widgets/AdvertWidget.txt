//MUI Imports
import { useTheme, Typography } from "@mui/material";

  //Style Components
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";



/***ADVERTISEMENT FOR DESKTOP ONLY***/

const AdvertWidget = () => {

    //Themes
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>For advertisers</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="../../../public/coke.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>CokaCola</Typography>
        <Typography color={medium}>cocacola.com</Typography>
      </FlexBetween>

      <Typography color={medium} m="0.5rem 0">
        Here is What Happens When You Combine A Moment, 
        A Meal, And An Ice-Cold Coca-Cola®. Unlock Signature Recipes. 
        Unlock Bonus Content. Share Your Recipe. Get A Custom Image
      </Typography>

    </WidgetWrapper>
  );
};

export default AdvertWidget;