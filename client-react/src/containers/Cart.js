import * as React from 'react';
import {Link} from 'react-router-dom';
import './style.css' 
import { UserGlobalContext } from '../context/UserGlobalContext';
import { GlobalContext } from '../context/GlobalContext';
import { CartGlobalContext } from '../context/CartGlobalContext';
// import { CartGlobalContext } from '../context/CartGlobalContext';
import axios from "axios";
import { createHashHistory } from "history";
import CartContainer from './CartContainer';
import CartContainerConfirmar from './CartContainerConfirmar';
import CartContainerDatos from './CartContainerDatos';

  const Cart = () =>{

    const history = createHashHistory();
    /*history.go("/login");*/
    const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, 
      loadVerifyUser, setLoadVerifyUser, renderCart, setRenderCart} = React.useContext(UserGlobalContext);
    
      const {dolar, getDolar, setCartIcon,fireMail, setFireMail,firePhone, setFirePhone,fireName, setFireName,buyers, setBuyers,cart,setCart,firstAsync,globalTest3,
      globalTest4,total, setTotal,arrayCart,globalTest,render, setRender,renderFunction, alturaCarrito, setAlturaCarrito} = React.useContext(GlobalContext);

      const {paso1, setPaso1,paso2, setPaso2,paso3, setPaso3} = React.useContext(CartGlobalContext);
  
      // const [paso1, setPaso1] = React.useState(true);
      // const [paso2, setPaso2] = React.useState(false);
      // const [paso3, setPaso3] = React.useState(false);

      // const cambio1 = () =>{
      //   setPaso1(true)
      //   setPaso2(false)
      //   setPaso3(false)
      // }
      // const cambio2 = () =>{
      //   setPaso1(false)
      //   setPaso2(true)
      //   setPaso3(false)
      // }
      // const cambio3 = () =>{
      //   setPaso1(false)
      //   setPaso2(false)
      //   setPaso3(true)
      // }


    React.useEffect(()=>{

      verifyUser ? setVerifyUser(false) : setVerifyUser(true)  
      // consultas a la BD, suscripciones como addeventlistener


      let height = document.getElementById('altura').offsetHeight
      setAlturaCarrito(height)

      return () => {
        setPaso1(true)
        setPaso2(false)
        setPaso3(false)
      }
  },[]);

    return(
        <>
            {/* <button onClick={(()=>console.log())}>console.log</button> */}
            <div id="altura">
              {paso1 ? <CartContainer altura={"900px"}/>: <></>}
            </div>
            <div id="">
              {paso2 ? <CartContainerDatos altura={"900px"}/>: <></>}
            </div>
            <div id="">
              {paso3 ? <CartContainerConfirmar altura={"900px"}/>: <></>}
            </div>
{/* 
            <button onClick={cambio1}>paso1 true</button>
            <button onClick={cambio2}>paso2 true</button>
            <button onClick={cambio3}>paso3 true</button> */}
        </>
    )

}
  
export default Cart;