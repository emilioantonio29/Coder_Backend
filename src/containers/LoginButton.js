import * as React from 'react';
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router-dom'
import './style.css' 
import { GlobalContext } from '../context/GlobalContext';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


  const LoginButton = () =>{
    const {cartIcon, setCartIcon} = React.useContext(GlobalContext);


    React.useEffect(()=>{
      // consultas a la BD, suscripciones como addeventlistener

      return () => {


      }
  },[]);

    return(
        <>
        <ul className="navbar-nav linkEffect">
          <li>


            <NavLink to={`/inicio-de-sesion`} exact activeClassName="linkEffectActive">
            <button type="button" className="btn notification" data-toggle="modal" data-target="#staticBackdrop2">
              {/* <!-- <i className="material-icons add_shopping_cart" data-target="#staticBackdrop2">&#xe854;</i> --> */}
              <span className="material-icons sizeC">
                account_circle
              </span>
              {/* <span className="material-icons cirC">
              lens
              </span> */}
            </button>
            </NavLink>
            
          </li>
        </ul>
          
        </>
    )

}
  
  
  export default LoginButton;