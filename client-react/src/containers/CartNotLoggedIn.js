import * as React from 'react';
import {Link} from 'react-router-dom';
import './style.css' 
import { UserGlobalContext } from '../context/UserGlobalContext';
import axios from "axios";
import loginRequired from './loginRequired.png'
import loginRequired2 from './loginRequired2.png'

  const CartNotLoggedIn = () =>{
    const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, loadVerifyUser, setLoadVerifyUser} = React.useContext(UserGlobalContext);

    
    React.useEffect(()=>{
      // consultas a la BD, suscripciones como addeventlistener
      console.log("CART")
      verifyUser ? setVerifyUser(false) : setVerifyUser(true)  

      /*axios.get('/apiMongo/user').then((response) => {
        console.log(response)
        return response.data
      }).then((data)=>{
          console.log("SOY EL LLAMADO A /USER " + data)
        if(data !== ""){
            setUserLoggedIn(data)
        }else if(data === ""){
            setUserLoggedIn({})
        }
      }).catch((err)=>{
        console.log(err)
      })*/


      return () => {

          console.log("CART")

      }
  },[]);

    return(
        <>
            {loadVerifyUser ? (
                <div className="d-flex flex-column" style={{minHeight:"600px"}}>
                    <div className="d-flex justify-content-center" >
                        <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                            <p >
                                <Link to={`/`}>
                                <button disabled className="btn">Home</button>
                                </Link>
                            </p>
                            <p><i className="fa fa-angle-right"></i></p>
                            <p style={{paddingLeft:"10px"}}> Carrito</p>
 
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" >
                        <div className="col-md-8 d-flex justify-content-center  flex-column align-items-center noPad">
                            <div className="spinner-border" role="status" style={{marginTop:"170px"}}>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div>
                                <p>
                                    Cargando ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                
                
                <div className="d-flex flex-column">
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p>
                            <Link to={`/`}>
                            <button className="btn">Home</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> Cart</p>
                        {/* <button onClick={ConsoleLogCompradores} style={{marginLeft:"500px"}}> ConsoleLogCompradores</button> */}
                      
                    </div>
                </div>
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-center align-items-center cajaCart">
                        {/* <img src={`../imagenes/cEmpty.png`} alt="ImagenCartEmpty"/> */}
                        <img src={loginRequired2} alt="ImagenCartEmpty"/>
                    </div>
                </div>
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <p>Por favor inicia sesión para gestionar tus compras...</p>
                        {/* <button onClick={ConsoleLogCompradores}> ConsoleLogCompradores</button> */}
                    </div>
                </div>
            </div>
                
                

            )}
        </>
        
    )

}
  
export default CartNotLoggedIn;