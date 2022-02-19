import * as React from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { UserGlobalContext } from '../context/UserGlobalContext';
import { CartGlobalContext } from '../context/CartGlobalContext';
import {Link} from 'react-router-dom';
// import { getFirestore } from '../firebase';
import ItemCartDatos from '../components/Item/ItemCartDatos';
import swal from 'sweetalert'
import { Helmet } from 'react-helmet';
import cEmpty from './cEmpty.png'
import axios from "axios";



const CartContainerConfirmar = (props) =>{
    const {setCartIcon,dolar, getDolar,fireEnvio, setFireEnvio,fireLocalidad, setFireLocalidad,fireCP, setFireCP,fireDireccion, setFireDireccion,
        fireMail, setFireMail,firePhone, setFirePhone,fireName, setFireName,buyers, setBuyers,cart,setCart,firstAsync,
        globalTest3,globalTest4,total, setTotal,arrayCart,globalTest,render, setRender,renderFunction} = React.useContext(GlobalContext);
    
    const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, 
        loadVerifyUser, setLoadVerifyUser, cartPaso1, 
        setCartPaso1, cartPaso2, setCartPaso2, cartPaso3, setCartPaso3, renderCart, setRenderCart} = React.useContext(UserGlobalContext);
          
    const {paso1, setPaso1,paso2, setPaso2,paso3, setPaso3} = React.useContext(CartGlobalContext);

    // const [show, setShow] = React.useState(true);
    const [carrito, setCarrito] = React.useState([]);
    const [carritoS, setCarritoS] = React.useState([]);
    const [carritoFire, setCarritoFire] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [showCart, setShowCart] = React.useState(false);
    const [showTable, setShowTable] = React.useState(true);
    const [moneda, setMoneda] = React.useState(true);
    const [totalDolar, setTotalDolar] = React.useState();
 
    React.useEffect(()=>{
        if(localStorage.length!=0){
            setShowCart(false)
        }else{
            setShowCart(true)
        }
        setCarrito([])
        setCarritoS([])
        const myPromise = new Promise ((resolve, reject) => {
            resolve(arrayCart);
        });
        myPromise.then((result) => setCarritoS(result));
       
        globalTest()
        // console.log("soy el cart")
        // setCarrito([])
        let total2 = 0
        let prueba = []
        for(let i =0; i < localStorage.length; i++){
            let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            // console.log(key[0])
            total2 = total2 + ((key[2])*(key[3]))
            carrito.push(key); 

        }
        
        setTotal(total2)
        // console.log(total2)
        document.title = `${total}`
        // console.log(cart)
        // console.log(carrito)
        setTotalDolar((total / dolar).toFixed(2))
        document.title = `${totalDolar}`
        return () => {

            // console.log("soy el cart unmon")
            // globalTest3()
            // setCarrito([])
            // setCart([])
            globalTest3()
            globalTest()
        }
    },[render]);

    async function fireBuy(newOrder) {
        if(localStorage.length!=0){
            axios.post('/apiFirebase/comprar', 
                  {
                    comprador: userLoggedIn,
                    detalleCompra: carritoS,
                    totalCompra: total
                  }
            ).then((data)=>{
                console.log(data)
                let id = 'IDTEST'
                comprarok(id)
                eliminarTodo()
                setDisabled(true)
                setCartIcon(false)
            }).catch((error)=>{
                console.log(error)
            })

            /*for(let i =0; i < localStorage.length; i++){
                const bd = getFirestore();
                let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
                carritoFire.push({
                    id: key[0],//idproducto
                    nombre: key[1],//nombre del producto
                    precio: key[2], //precio actual del producto
                    cantidadComprada: key[3], // cantidad comprada por el cliente
                    categoria: key[5],
                    stockAfterBuy: key[8] // stock que quedará si se realiza la compra
                })
            }
            let newOrder = {comprador: {nombre: fireName, email: fireMail, telefono: firePhone}, items: carritoFire, total: total, date: new Date()}
            const db = getFirestore()
            const { id } = await db.collection("ordenes").add(newOrder)*/
            //alert("TU NRO DE ORDEN ES :" + id)
            // let id = 'IDTEST'
            // comprarok(id)
            // eliminarTodo()
            // setDisabled(true)
            // setCartIcon(false)
        }
      }



    /*const ConsoleLogCompradores = () => {
        // fireBuy2()
        console.log(fireName)
        console.log(firePhone)
        console.log(fireMail)
        const db = getFirestore()
        const itemCollection = db.collection("ordenes");// guardamos la referencia
        itemCollection.get().then((value) => {
            // console.log(value.docs.keys)
            let temp = value.docs.map(element => {
                // return {...element.data(), id:element.id}
                return {"ordenes": {...element.data(), id:element.id}}
            })
                
            // value.docs.map(element => {console.log(element.data())})
            // value.docs.map(element => {console.log({...element.data(), id:element.id})})
            setBuyers(temp)
        })
        console.log(buyers)
        console.log(arrayCart)
        // if(showCart===true){
        //     setShowCart(false)
        // }else{
        //     setShowCart(true)
        // }
    }*/
    const eliminarTodo = () => {
        localStorage.clear()
        globalTest3()
        globalTest4()
        // window.location.reload(false)
        // setCarrito([])
        // setTotal(0)
        // setCart([])
        renderFunction()
       
    }

    const showDireccion = () => {
        if (showTable===true){
            setShowTable(false)
            setFireEnvio(false)
        }else{
            setShowTable(true)
            setFireEnvio(true)
        }
        console.log(fireEnvio)
    }
    const comprarok= (id) =>{
        swal({
            title: `¡Compra realizada con exito!`,
            text: `Gracias por tu compra ${fireName}!           Tu numero de orden es ${id}`,
            icon: "success",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    
    const dolarTotal = () => {
        if(moneda === true){
            setMoneda(false)
            renderFunction()
        }
        else{
            setMoneda(true)
        }
    }

    const cambio1 = () =>{
        setPaso1(true)
        setPaso2(false)
        setPaso3(false)
      }
      const cambio2 = () =>{
        setPaso1(false)
        setPaso2(true)
        setPaso3(false)
      }
      const cambio3 = () =>{
        setPaso1(false)
        setPaso2(false)
        setPaso3(true)
      }


    return(
        <>
        <Helmet>
            <title>SoyGlucosa | ProyectoCoder</title>
        </Helmet>
        <button onClick={(()=>console.log(carritoS))}> Console.log</button>

        {showCart ? (
            <div className="d-flex flex-column">
            <div className="d-flex justify-content-center" >
                <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                    <p >
                        <Link to={`/`}>
                        <button className="btn">Home</button>
                        </Link>
                    </p>
                    <p><i className="fa fa-angle-right"></i></p>
                    <p style={{paddingLeft:"10px"}}> Cart</p>
                    {/* <button onClick={ConsoleLogCompradores} onClick={ConsoleLogCompradores} style={{marginLeft:"500px"}}> ConsoleLogCompradores</button> */}

                </div>
            </div>
            <div className="d-flex justify-content-center" >
                <div className="col-md-8 d-flex justify-content-center align-items-center cajaCart">
                     <img src={cEmpty} alt="ImagenCartEmpty"/>
                </div>
            </div>
            <div className="d-flex justify-content-center" >
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <p>No hay productos agregados al carrito ...</p>
                    {/* <button onClick={ConsoleLogCompradores}> ConsoleLogCompradores</button> */}
                </div>
            </div>
        </div>


        ) : (
            <div style={{minHeight: props.altura}}>
                <div className="d-flex flex-column">
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p >
                            <Link to={`/`}>
                            <button className="btn">Home</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> Cart</p>

                    </div>
                </div>
                <div className="d-flex justify-content-center" >
                <div className="col-md-8 d-flex justify-content-left align-items-center ">
                        <p style={{padding:"0px 10px 0px 80px"}}> <span  className="material-icons subdirectory_arrow_right">
                        subdirectory_arrow_right
                        </span></p>
                        <p style={{padding:"0px 10px 0px 10px"}}>Paso 1/3: Checkout</p>
                        <p style={{padding:"0px 10px 0px 10px"}}><i className="fa fa-angle-right"></i></p>
                        <p style={{padding:"0px 10px 0px 10px"}}>Paso 2/3: Datos Cliente</p>
                        <p style={{padding:"0px 10px 0px 10px"}}><i className="fa fa-angle-right"></i></p>
                        <div className="cart_tab">
                            <div className="cart_tab_left_on" id="login_tab_select_left"></div>
                            <div className="cart_tab_on" id="login_tab_select">Paso 3/3: Confirmar Compra</div>
                            <div className="cart_tab_right_on" id="login_tab_select_right"></div>
                        </div>
                        {/* <Link to={`/carritoDatos`}>
                            <button className="btn">Home</button>
                        </Link> */}
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="col-md-8">
                    <br/>
                    {/* <button onClick={ConsoleLogCompradores}> ConsoleLogCompradores</button> */}
                    <div className="container col-md-12" >
                        <div className="">
                            <table className="table"> 
                                <thead className="fondo shoC">
                                    <tr>
                                        <th style={{width:"20%"}}>DATOS PERSONALES</th>
                                        <th style={{width:"20%"}}></th>
                                        <th style={{width:"20%"}}></th>
                                        <th style={{width:"20%"}} className="">
                                            {fireEnvio ? ("DIRECCIÓN DE ENVÍO") : ("")}  
                                        </th>
                                        <th style={{width:"20%"}} className=""></th>
                                        {/* <th style={{width:"16%"}} className="centre"></th> */}
                                    </tr>
                                </thead>
                                {/* BODY START */}
                                <tbody>
                                    <tr>
                                        <td style={{width:"20%"}}>Nombre Completo:</td>
                                        <td style={{width:"20%"}}>{fireName}</td>
                                        <td style={{width:"20%"}} className=""></td>
                                        <td style={{width:"20%"}} className="">
                                            {fireEnvio ? ("Calle y Nro:") : ("")}  
                                        </td>
                                        <td style={{width:"20%"}} className="">{fireDireccion}</td>                       
                                    </tr>
                                    <tr>
                                        <td style={{width:"20%"}}>Teléfono:</td>
                                        <td style={{width:"20%"}}>{firePhone}</td>
                                        <td style={{width:"20%"}} className=""></td>
                                        <td style={{width:"20%"}} className="">
                                            {fireEnvio ? ("Codigo Postal:") : ("")}  
                                        </td>
                                        <td style={{width:"20%"}} className="">{fireCP}</td>                
                                    </tr>
                                    <tr>
                                        <td style={{width:"20%"}}>Email:</td>
                                        <td style={{width:"20%"}}>{fireMail}
                                        </td>
                                        <td style={{width:"20%"}} className=""></td>
                                        <td style={{width:"20%"}} className="centre">
                                            {fireEnvio ? ("Localidad") : ("")}  
                                        </td>
                                        <td style={{width:"20%"}} className="centre">{fireLocalidad}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"20%"}}>Retiro en local:</td>
                                        <td style={{width:"20%"}} className="AgregarDireccion">
                                            {fireEnvio ? ("No") : ("Si")}
                                        </td>
                                        <td style={{width:"20%"}} className=""></td>
                                        <td style={{width:"20%"}} className="centre"></td>
                                        <td style={{width:"20%"}} className="centre"></td>
                                    </tr>
                                </tbody>
                                {/* FOOT START */}
                                <tfoot className="">
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    
                    <div className="container col-md-12">
                        <div className="table-responsive">
                            <table className="table tableFix"> 
                                <thead className="fondo shoC">
                                    <tr></tr>
                                </thead>
                                {/* BODY START */}
                                <tbody>
                                    <tr></tr>
                                </tbody>
                                {/* FOOT START */}
                                <tfoot className="">
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    </div>
                </div>      
                <div className="d-flex justify-content-center">
                    <div className="col-md-8">
                    <br/>
                    
                    {/* <button onClick={ConsoleLogCompradores}> ConsoleLogCompradores</button> */}
                    <div className="container col-md-12" >
                        <div className="">
                            <table className="table"> 
                                <thead className="fondo shoC">
                                    <tr>
                                        <th style={{width:"25%"}}>DETALLE DE PRODUCTOS</th>
                                        <th style={{width:"25%"}}></th>
                                        <th style={{width:"16%"}} className="centre">PRECIO</th>
                                        <th style={{width:"16%"}} className="centre">CANTIDAD</th>
                                        <th style={{width:"16%"}} className="centre">SUBTOTAL</th>
                                    </tr>
                                </thead>
                                {/* BODY START */}
                                <tbody>
                                    <tr></tr>
                                </tbody>
                                {/* FOOT START */}
                                <tfoot className="">
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    
                    {/* <button onClick={ConsoleLogCar}> ConsoleLogcar</button> */}

                    {/* <h1>ItemID: {cart[0].name}</h1> */}
                    
                    {/* <div>
                        {show ? ("") : ("hola")}
                    </div> */}
                    <div>
                        
                            {   
                                // cart.map((productCart)=>{
                                //         return <ItemCart key={productCart.id} productCart={productCart}/>
                                carritoS.map((productCart)=>{
                                    // console.log("cart")
                                    return <ItemCartDatos key={productCart} productCart={productCart}/>
                                })
                                                    
                                // <ItemCart  />
                                // carrito.map(cards => {
                                //     return <pre>{"s"}</pre>
                                // })
                                
                            }
                        


                    </div>  
                    <div className="container col-md-12">
                        <div className="table-responsive">
                            <table className="table tableFix"> 
                                <thead className="fondo shoC">
                                    <tr></tr>
                                </thead>
                                {/* BODY START */}
                                <tbody>
                                    <tr></tr>
                                </tbody>
                                {/* FOOT START */}
                                <tfoot className="">
                                    <tr className="" >
                                        <th className="" style={{width:"25%"}}></th>
                                        <th className="" style={{width:"25%"}}>
                                            <label className="d-flex justify-content-left"></label>
                                        </th>
                                        <th className="" style={{width:"16%"}}>
                                            <label className="d-flex justify-content-center"></label>
                                        </th>
                                        <th className=" fondo" style={{width:"16%"}}>
                                            <div className="d-flex justify-content-center">
                                                {/* <button onClick={dolarTotal} type="button" className="btn btn-sm btn-toggle" data-toggle="button" aria-pressed="false"
                                                    id="moneda">
                                                    <div className="handle"></div>
                                                </button> */}
                                                {moneda ? (
                                                <button id="" onClick={dolarTotal} type="button" className="btn btn-sm btn-toggle active" data-toggle="button" aria-pressed="false"
                                                autoComplete="off" id="">
                                                <div className="handle"></div>
                                                </button>
                                                ) : (
                                                    <button id="" onClick={dolarTotal} type="button" className="btn btn-sm btn-toggle" data-toggle="button" aria-pressed="false"
                                                    autoComplete="off" id="">
                                                    <div className="handle"></div>
                                                    </button>

                                                )}
                                            </div>
                                        </th>
                                        <th className=" fondo" style={{width:"16%"}}>
                                            <div>
                                                <label className="d-flex justify-content-center">TOTAL</label>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr className="" style={{height: "100px"}}>
                                        <th className="" style={{width:"25%"}}>
                                            <div className="d-flex justify-content-center fixC">
                                                {/* <p className="" id=""><button onClick={eliminarTodo}> VaciarCarrito</button></p> */}
                                            </div>
                                        </th>
                                        <th className="monedaArs" style={{width:"25%"}}>
                                            <div className="d-flex justify-content-center fixC">
                                                {/* <p className="" id=""><button onClick={fireBuy} className="btn-success" disabled={false}>Comprar</button></p> */}
                                            </div>
                                        </th>
                                        <th className=" monedaUsd" style={{width:"16%"}}>
                                            <div className="d-flex justify-content-center fixC">
                                                <p className="" id=""></p>
                                            </div>
                                        </th>
                                        <th className=" monedaArs" style={{width:"16%"}}>
                                            <div className="d-flex justify-content-center fixC">
                                                <div className="alert-box2 addDown">$</div>
                                                <p className="" id="total">
                                                    {moneda ? ("USD") : ("ARS")}
                                                </p>
                                            </div>
                                        </th>
                                        <th className=" monedaUsd" style={{width:"16%"}}>
                                            <div className="d-flex justify-content-center fixC">
                                                <div className="" id="totalDolar">
                                                {!moneda ? (total) : (<p style={{color:"green"}}>${totalDolar}</p>)}
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    </div>
                    
                </div>            
                <br />
                <div className="d-flex justify-content-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center noPad">
                        <div className="col-md- d-flex justify-content-left align-items-center ">
                        </div>
                        <div className="col-md- d-flex justify-content-right align-items-center noPad2">
                            <div className="test">
                                <Link to={`/carrito`} ><button onClick={cambio2} className="previo">Paso Anterior</button></Link>
                                <Link to={`#`}  onMouseOver={e => e.preventDefault()}><button className="disabled " disabled>1</button></Link>
                                <Link to={`#`}  onMouseOver={e => e.preventDefault()}><button className="disabled " disabled>2</button></Link>
                                <Link to={`#`}  onMouseOver={e => e.preventDefault()}><button className="disabled activated" disabled>3</button></Link>
                                <Link to={`/`} ><button className=" comprar" onClick={fireBuy}>COMPRAR</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )} 

        
        </>

    )

}

export default CartContainerConfirmar;
