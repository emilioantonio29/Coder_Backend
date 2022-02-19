
import * as React from 'react';
import { createContext, useEffect, useState } from "react";
import axios from "axios";

//import { getFirestore } from '../firebase';

export const CartGlobalContext = createContext();

export const CartGlobalProvider = ({children}) => {
    

    const [paso1, setPaso1] = React.useState(true);
    const [paso2, setPaso2] = React.useState(false);
    const [paso3, setPaso3] = React.useState(false);

    React.useEffect(() => {


        return () => {

     
        }
    },[]);     



    // console.log("soy el global")

    
    return <CartGlobalContext.Provider value={{paso1, setPaso1,paso2, setPaso2,paso3, setPaso3}}>

        {children}
    </CartGlobalContext.Provider>
}