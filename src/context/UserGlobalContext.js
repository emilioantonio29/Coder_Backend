
import * as React from 'react';
import { createContext, useEffect, useState } from "react";
import axios from "axios";

//import { getFirestore } from '../firebase';

export const UserGlobalContext = createContext();

export const UserGlobalProvider = ({children}) => {
    const [load2, setLoad2] = React.useState("CARGANDO . . .");
    const [userLoggedIn, setUserLoggedIn] = React.useState({})
    const [verifyUser, setVerifyUser] = React.useState(false)
    const [loadVerifyUser, setLoadVerifyUser] = React.useState(true)
    const [cartPaso1, setCartPaso1] = React.useState(true)
    const [cartPaso2, setCartPaso2] = React.useState(false)
    const [cartPaso3, setCartPaso3] = React.useState(false)
    const [renderCart, setRenderCart] = React.useState(false)
    const [loginButton, setLoginButton] = React.useState(true)

    React.useEffect(() => {

        if(userLoggedIn.nombre !== undefined){
            setLoginButton(false)
        }

        console.log("UserGlobalContext Calling")
        console.log("UserGlobalContext Calling: loadVerifyuser - "+ loadVerifyUser)
       
        axios.get('/apiMongo/user').then((response) => {
            console.log(response)
            return response.data
          }).then((data)=>{
              console.log("SOY EL LLAMADO A /USER " + data)
            if(data !== ""){
                setUserLoggedIn(data)
                setLoginButton(false)
                setLoadVerifyUser(false)
            }else if(data === ""){
                setLoginButton(true)
                setUserLoggedIn({})
                setLoadVerifyUser(false)
            }
          }).catch((err)=>{
            console.log(err)
            setLoadVerifyUser(false)
            setLoginButton(true)
        })



        return () => {

     
        }
    },[verifyUser]);     



    // console.log("soy el global")

    
    return <UserGlobalContext.Provider value={{load2, setLoad2, userLoggedIn, 
    setUserLoggedIn, verifyUser, setVerifyUser, loadVerifyUser, setLoadVerifyUser, cartPaso1, setCartPaso1,
    cartPaso2, setCartPaso2,cartPaso3, setCartPaso3, renderCart, setRenderCart, loginButton, setLoginButton}}>

        {children}
    </UserGlobalContext.Provider>
}