import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import NavBarComponent from "./components/navbar/index.js";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import TestComponent from './components/test/index.js';
import TestComponent2 from './components/test/index2.js';
import { GlobalProvider } from './context/GlobalContext';
import { CartGlobalProvider } from './context/CartGlobalContext';
import { UserGlobalContext } from './context/UserGlobalContext';
// import { CartGlobalProvider } from './context/CartGlobalContext';
import ItemListContainer from './containers/ItemListContainer';
import ItemListContainerMermelada from './containers/ItemListContainerMermelada';
import ItemListContainerPan from './containers/ItemListContainerPan';
import ItemListContainerGolfeado from './containers/ItemListContainerGolfeado';
import ItemDetailContainer from './containers/ItemDetailContainer';
import Cart from './containers/Cart';
import CartNotLoggedIn from './containers/CartNotLoggedIn';
import CartContainer from './containers/CartContainer';
import CartContainerDatos from './containers/CartContainerDatos';
import CartContainerConfirmar from './containers/CartContainerConfirmar';
import FooterComponent from './components/footer/footer';
import LoggedIn from './containers/LoggedIn';
import Register from './containers/Register';
import Welcome from './components/navbar/Welcome';
import NotLoggedIn from './containers/NotLoggedIn';




const App = () =>{

  const {load2, setLoad2, userLoggedIn, setUserLoggedIn} = React.useContext(UserGlobalContext);

  {/* LOGICA */}
  //const [url, setUrl] = useState(`${window.location.url}`)
  const [usuarios, setUsuarios] = useState([])
  const [other, setOther] = useState([])

  useState(()=>{
    // axios.get("/users.json").then((response) => {
    //   setUsuarios(response.data);
    // });

    // axios.get("/api").then((response) => {
    //   console.log("test");
    //   console.log(response)
    // });


  },[])
  
  return(

        <>
        <GlobalProvider>
          <CartGlobalProvider>
            <BrowserRouter>
              <Welcome></Welcome>
              <NavBarComponent/>
              <Routes>
                <Route path="/" element={<ItemListContainer/>}/>
                <Route path='/mermeladas' exact={true} element={<ItemListContainerMermelada/>} />
                <Route path='/panes-de-jamon' exact={true} element={<ItemListContainerPan/>} />
                <Route path='/golfeados' exact={true} element={<ItemListContainerGolfeado/>} />
                <Route path='/detalle-producto/:productoID' exact={true} element={<ItemDetailContainer/>} />
                {/* <CartGlobalProvider> */}
                <Route path='/carrito' element={userLoggedIn.nombre === undefined ? <CartNotLoggedIn/> : <Cart/>} />
                {/* <Route path='/carrito' element={<Cart/>} /> */}
                {/* </CartGlobalProvider> */}
                {/* <Route path='/carritoTest' exact={true} element={<Cart/>} /> */}
                {/* <Route path='/carrito/paso-1' exact={true} element={<CartContainer/>} />
                <Route path='/carrito/paso-2' exact={true} element={<CartContainerDatos/>} />
                <Route path='/carrito/paso-3' exact={true} element={<CartContainerConfirmar/>} /> */}
                <Route path="/testcomponent" element={<TestComponent/>}/>
                <Route path="/registro" element={<Register/>}/>
                <Route path='/inicio-de-sesion' element={userLoggedIn.nombre === undefined ? <NotLoggedIn/> : <LoggedIn/>} />
                {/* <Route path="/inicio-de-sesion" element={<LoggedIn/>}/>
                <Route path="/inicio-de-sesionNO" element={<NotLoggedIn/>}/> */}
                <Route path='*' exact={true} element={<div>Not Found</div>} />
              </Routes>
              <FooterComponent/>
            </BrowserRouter>
          </CartGlobalProvider>
        </GlobalProvider>
        </> 

  );
} 
export default App;
