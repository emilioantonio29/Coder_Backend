import * as React from 'react';
import {Link} from 'react-router-dom';
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


  const LogoutButton = () =>{
    const {cartIcon, setCartIcon} = React.useContext(GlobalContext);


    React.useEffect(()=>{
      // consultas a la BD, suscripciones como addeventlistener

      return () => {


      }
  },[]);

    return(
        <>
        <Link to={`/inicio-de-sesion`} exact activeClassName="linkEffectActive">Cerrar sesion</Link>
          
        </>
    )

}
  
  
  export default LogoutButton;