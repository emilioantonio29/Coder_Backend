import * as React from 'react';
import './style.css' 
import { GlobalContext } from '../context/GlobalContext';
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router-dom'


  const CartWidget = () =>{
    const {cartIcon, setCartIcon} = React.useContext(GlobalContext);


    React.useEffect(()=>{
      // consultas a la BD, suscripciones como addeventlistener
      console.log("CarritoIcon")
      return () => {

          console.log("CarritoIcon_Out")

      }
  },[]);

    return(
        <>
            <div className="ml-auto">
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  {/* <!-- Button trigger modal --> */}
                 
                  {/* <button type="button" className="btn notification" data-toggle="modal" data-target="#staticBackdrop">
                    <span className="material-icons sizeC2 favorite">
                      favorite_border
                    </span>
                    <span className="material-icons sizeC2 favorite2 escon">
                      favorite
                    </span>
                  </button> */}
                  
                  {/* <!-- carrito --> */}
                  {cartIcon ? (
                      <NavLink to={`/carrito`} exact activeClassName="linkEffectActive">
                        <button type="button" className="btn notification" data-toggle="modal" data-target="#staticBackdrop2">
                          <span className="material-icons sizeC">
                            shopping_cart
                          </span>
                          <span className="material-icons cirC">
                            lens
                          </span>
                        </button>
                      </NavLink>
                  ):(
                    <NavLink to={`/carrito`} exact activeClassName="linkEffectActive">
                      <button type="button" className="btn notification" data-toggle="modal" data-target="#staticBackdrop2">
                        {/* <!-- <i className="material-icons add_shopping_cart" data-target="#staticBackdrop2">&#xe854;</i> --> */}
                        <span className="material-icons sizeC">
                          shopping_cart
                        </span>
                        {/* <span className="material-icons cirC">
                          lens
                        </span> */}
                      </button>
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
        </div>
        </>
    )

}
  
  
  export default CartWidget;