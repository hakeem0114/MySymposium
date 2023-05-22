//React Imports
import React from 'react'
import ReactDOM from 'react-dom/client'

//React Components Imports
import App from './App.jsx'

//Css Imports
import './index.css'

//Redux Imports
import authReducer from './states/states.jsx' 
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit' //Combines slice reducers
import { Provider } from 'react-redux'

//Redux Persist Imports
import {
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER
} from "redux-persist" //Selectively store the state into local storage 
import storage  from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

/*
 This delays the rendering of your app's UI until your persisted
  state has been retrieved and saved to redux.

  The rest is setup from their github repo
*/
const persistConfig = {
  key: 'root',
  storage,
}
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const persistedReducer = persistReducer(persistConfig, authReducer)

//Persistor's store
const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }),
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={ persistStore(store) }>
               <App />
          </PersistGate>
       </Provider>

  </React.StrictMode>,
)
