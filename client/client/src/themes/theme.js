/***BASE LEVEL COLOUR THEME FOR ENTIRE FRONT-END****/
//Template from material UI's repo


// Assign colour to each token
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#fffde7",
      100: "#fff9c4",
      200: "#fff59d",
      300: "#fff176",
      400: "#ffee58",
      500: "#ffeb3b",
      600: "#fdd835",
      700: "#fbc02d",
      800: "#f9a825",
      900: "#f57f17",
    },
  };


/**MATERIAL UI TRANSITIONS (MUI)**/
//Use principles of UI/UX motion design

//Set default themes
export const themeSettings = (mode) =>{
    return{
        palette: {
          mode: mode,

          //If theme mode = dark, use tenary to 
          ...(mode === "dark"
            ? {
                // palette values for dark mode
                primary: {
                  dark: colorTokens.primary[200],
                  main: colorTokens.primary[500],
                  light: colorTokens.primary[800],
                },
                neutral: {
                  dark: colorTokens.grey[100],
                  main: colorTokens.grey[200],
                  mediumMain: colorTokens.grey[300],
                  medium: colorTokens.grey[400],
                  light: colorTokens.grey[700],
                },
                background: {
                  default: colorTokens.grey[900],
                  alt: colorTokens.grey[800],
                },
              }
            : {
                // palette values for light mode
                primary: {
                  dark: colorTokens.primary[700],
                  main: colorTokens.primary[500],
                  light: colorTokens.primary[50],
                },
                neutral: {
                  dark: colorTokens.grey[700],
                  main: colorTokens.grey[500],
                  mediumMain: colorTokens.grey[400],
                  medium: colorTokens.grey[300],
                  light: colorTokens.grey[50],
                },
                background: {
                  default: colorTokens.grey[10],
                  alt: colorTokens.grey[0],
                },
              }),
        },
        typography: {
          fontFamily: ["Raleway", "sans-serif"].join(","),
          fontSize: 12,
          h1: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 40,
          },
          h2: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 32,
          },
          h3: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 24,
          },
          h4: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 20,
          },
          h5: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 16,
          },
          h6: {
            fontFamily: ["Raleway", "sans-serif"].join(","),
            fontSize: 14,
          },
        },
      };
    };