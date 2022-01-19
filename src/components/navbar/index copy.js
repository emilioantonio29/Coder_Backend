import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import axios from "axios";
import "./style.css";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Logo from './logo.png'
import CartWidget from '../../containers/CartWidget';
import { UserGlobalContext } from '../../context/UserGlobalContext';




const NavBarComponent = () =>{
  {/* LOGICA */}
  //const [url, setUrl] = useState(`${window.location.url}`)
  const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, 
    loadVerifyUser, setLoadVerifyUser, renderCart, setRenderCart} = React.useContext(UserGlobalContext);

  return(
    <>
        <div className="gb2  d-flex align-items-center ">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <p>Bienvenid@ <strong>TEST</strong></p>
                </div>
            </div>
        </div> 
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center reset" style={{position:"relative !important"}}>
          <div className="d-flex align-items-center col-md-10 reset" style={{paddingLeft:"0px"}}>
          {/* <img src={Logo} alt=""/> */}

          <NavLink to={`/`}><img src={Logo} alt=""/></NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
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
                      
        
              </ul>
          {/* </div> */}
          {/* <div className="ml-auto">
              <div>
                inicia sesion
              </div>
          </div> */}
          <div className="ml-auto">
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