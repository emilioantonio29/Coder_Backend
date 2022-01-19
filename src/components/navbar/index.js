import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import axios from "axios";
import "./style.css";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Logo from './logo.png'
import CartWidget from '../../containers/CartWidget';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import LoginButton from '../../containers/LoginButton';
import { UserGlobalContext } from '../../context/UserGlobalContext';
import LogoutButton from '../../containers/LogoutButton';


const NavBarComponent = () =>{
  {/* LOGICA */}
  //const [url, setUrl] = useState(`${window.location.url}`)

  const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, 
    loadVerifyUser, setLoadVerifyUser, renderCart, setRenderCart, loginButton, setLoginButton} = React.useContext(UserGlobalContext);
    React.useEffect(()=>{
      
      return () => {
      }
    },[loginButton]);
  return(
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center reset" style={{position:"relative !important"}}>
          <div className="d-flex align-items-center col-md-8 reset" style={{paddingLeft:"0px"}}>
          {/* <img src={Logo} alt=""/> */}

          <NavLink to={`/`}><img src={Logo} alt=""/></NavLink>

          {/* <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavDropdown"> */}
              <ul className="navbar-nav linkEffect" style={{marginLeft: "30px"}}>
                      <li>
                      <NavLink to={`/`} exact activeClassName="linkEffectActive">
                          Todos los Productos
                      </NavLink>
                      </li>
                      <li>
                      <NavLink to={`/mermeladas`} exact activeClassName="linkEffectActive">
                          Mermeladas
                      </NavLink>
                      </li>
                      <li>
                      <NavLink to={`/panes-de-jamon`} exact activeClassName="linkEffectActive">
                          Pan de Jamon
                      </NavLink>
                      </li>
                      <li>
                      <NavLink to={'/golfeados'} exact activeClassName="linkEffectActive">
                          Golfeados
                      </NavLink>
                      </li>
                      {/* <li>
                      <NavLink to={'/carrito'} exact activeClassName="linkEffectActive">
                          carritoTEst
                      </NavLink>
                      </li> */}
                      
        
              </ul>
          {/* </div> */}
          {/* <div className="ml-auto">
              <div>
                inicia sesion
              </div>
          </div> */}
          <div className="ml-auto d-flex">
            <div className='d-flex align-items-center'>
              <LoginButton/>
              </div>
              <div className='d-flex align-items-center'>
              <CartWidget/>
              </div>
          </div>
          </div>
      </nav>



    </>
  );
} 
export default NavBarComponent;