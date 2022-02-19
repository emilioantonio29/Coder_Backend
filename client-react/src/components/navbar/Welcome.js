import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
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




const Welcome = () =>{
  {/* LOGICA */}
  //const [url, setUrl] = useState(`${window.location.url}`)
  const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, 
    loadVerifyUser, setLoadVerifyUser, renderCart, setRenderCart} = React.useContext(UserGlobalContext);

  return(
    <>
        {/* <div className="gb2  d-flex align-items-center justify-content-center ">
            <div className="container d-flex justify-content-center">
                <div className=" col-md-12 row d-flex justify-content-center" style={{border: "1px solid red"}}>
                    <p>Bienvenid@ <strong>TEST</strong></p>
                    <p className='ml-auto'>                      
                    <NavLink style={{textDecoration: "none"}} to={`/inicio-de-sesion`} >
                          Inicia sesion
                      </NavLink></p>
                </div>
                
            </div>
        </div>  */}
        {userLoggedIn.nombre ? 
            <div className="gb2  d-flex align-items-center justify-content-center ">
                <div className="container d-flex justify-content-center">
                    <div className=" col-md-4 row d-flex justify-content-center" >
                        <p></p>
    
                    </div>
                    <div className=" col-md-4 row d-flex justify-content-center" >
                        <p>Bienvenid@ <strong>{userLoggedIn.nombre}</strong></p>
    
                    </div>
                    <div className=" col-md-4 row d-flex justify-content-center" >
                        <p></p>
    
                    </div>
                    
                </div>
            </div> 
        :
            <div className="gb3  d-flex align-items-center justify-content-center ">
                <div className="container d-flex justify-content-center">
                    <div className=" col-md-12 row d-flex justify-content-center" >
                        <p></p>

                    </div>
                    
                </div>
            </div> 
        }


    </>
  );
} 
export default Welcome;