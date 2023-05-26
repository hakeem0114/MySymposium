//React Router Imports
import { useState, useMemo } from "react" //Use memo to store cache on user's local storage to re-use for future requests
import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom"

//Redux Imports
import { useSelector } from "react-redux" //Extract properties from initialState redux object

//Scenes Imports
import   HomePage  from "./scenes/homePage/homePage"
import { LoginPage } from "./scenes/loginPage/loginPage"
import { ProfilePage } from "./scenes/profilePage/profilePage"

//Material Motion UI Imports
import { CssBaseline, ThemeProvider} from '@mui/material' //CssBaseline resets css across all browsers
import {createTheme} from '@mui/material/styles'
import { themeSettings } from "./themes/theme"


function App() {
  const mode = useSelector((state)=> state.mode) 
  const theme = useMemo( ()=> createTheme(themeSettings(mode)), [mode]) //Store light/dark theme mode in cache

  //Once a user has signed in & received userID & token, boolean =true
  const isAuth = Boolean(useSelector((state)=> state.token)) 

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/MySymposium" element={<LoginPage />} />
            <Route
              path="/MySymposium/home"
              element={isAuth ? <HomePage /> : <Navigate to="/MySymposium" />}
            />
            <Route
              path="/MySymposium/profile/:userId"      
              element={isAuth ? <ProfilePage /> : <Navigate to="/MySymposium" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
