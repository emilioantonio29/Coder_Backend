import React, {useState, useEffect} from 'react';
import { GlobalContext } from "../../context/GlobalContext";
import {Link} from 'react-router-dom';
import swal from 'sweetalert'
import { Helmet } from 'react-helmet';

const Item2 = ({producto}) => {
    
    const [contadorInicial, setContadorInicial] = useState(1);
    const [stockDisponible, setstockDisponible] = useState(producto.cantidad)
    const [show, setShow] = useState(true);
    const {setCartIcon,cart,setCart,prueba, setPrueba, globalTest, products, setProducts,load, setLoad,globalTest4} = React.useContext(GlobalContext);

    React.useEffect(()=>{
        console.log(producto)
        if(localStorage.getItem(producto.id) === null){
            setstockDisponible(producto.cantidad)
        }else{
            let variableCarrito = JSON.parse(localStorage.getItem(producto.id))
            setstockDisponible(producto.cantidad - variableCarrito[3])
        }
        document.title = `${contadorInicial}`
        document.title = `${stockDisponible}`
        return () => {
        }
    },[contadorInicial]);

    function agregarCarrito(){
        if(contadorInicial <= stockDisponible){
            setstockDisponible(stockDisponible - contadorInicial)
            setContadorInicial(1)
            setShow(false)
            localStorageAct()
            setCart([...cart, JSON.parse(localStorage.getItem(producto.id))])
            
        }else{
            alert("test")
        }
    } 
    function agregarCarrito2(){
        if(contadorInicial <= stockDisponible){
            setstockDisponible(stockDisponible - contadorInicial)
            setContadorInicial(1)
            setShow(false)
            localStorageAct()
            setCartIcon(true)
            agregarOk()
        }else{
            agregarNoStock()
        }
    } 

    function sumaCantidad(){
        if(contadorInicial <= stockDisponible - 1){
            setContadorInicial(contadorInicial + 1)
        }
    }
    const localStorageAct = () => {
    //   localStorage.setItem(producto.id, JSON.stringify([{
    //     id:producto.id,
    //     nombre:producto.nombre,
    //     precio:producto.precio,
    //     cantidad:producto.cantidad - (cantidad - contadorInicial),
    //     moneda:producto.moneda,
    //     tipo:producto.tipo,
    //     descript:producto.descript,
    //     imagen:producto.imagen,
    //     stock:producto.cantidad-(producto.cantidad - (cantidad - contadorInicial))
    //   }]))
        localStorage.setItem(producto.id, JSON.stringify([
            producto.id,
            producto.nombre,
            producto.precio,
            producto.cantidad - (stockDisponible - contadorInicial),//cantidad agregada al carrito
            producto.moneda,
            producto.tipo,
            producto.descript,
            producto.imagen,
            producto.cantidad-(producto.cantidad - (stockDisponible - contadorInicial)),//stock disponible
            producto.cantidad //stock real
            
        ]))     
    }

    const agregarOk= () =>{
        let Item = "Item"
        let agregado = "agregado"
        if(contadorInicial!==1){
            Item = "Items"
            agregado = "agregados"
        }
        swal({
            title: "",
            text: `${Item} ${agregado} correctamente al carrito.`,
            icon: "success",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    const agregarNoStock= () =>{
        let Item = "Item"
        let agregado = "agregado"
        if(contadorInicial!==1){
            Item = "Items"
            agregado = "agregados"
        }
        swal({
            title: "",
            text: `Lo sentimos, este producto ya no tiene stock disponible...`,
            icon: "warning",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }

    return (

        <div>
            <Helmet>
                <title>SoyGlucosa | ProyectoCoder</title>
            </Helmet>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p>
                            <Link to={`/`}> <button className="btn">Home</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p>
                            <Link to={`/${producto.tipo}`}> <button className="btn">{producto.tipo}</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> {producto.nombre}</p>
                        {/* <button onClick={ConsoleLogCompradores} style={{marginLeft:"500px"}}> ConsoleLogCompradores</button>
                        */}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-md-8 d-flex justify-content-center align-items-center noPad">
                        <div >
                            <div className="container py-3" >
                                <div className="card" style={{padding:"10px 0px 10px 0px"}}>
                                <div className="row ">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center flex-column">
                                    {/* <img src={`../imagenes/${producto.imagen}.png`} alt="" style={{marginTop:"30px"}}/> */}
                                    <img src={producto.imagen} alt="" style={{marginTop:"30px"}}/>   
                                    <p>Stock: {stockDisponible}</p>
                                    </div>
                                    <div className="col-md-8 px-3">
                                        <div className="card-block px-3">
                                        <h4 className="card-title">{producto.nombre}</h4>
                                        <p className="card-text">{producto.descript} {producto.tipo}</p>
                                        <p className="card-text">Precio: {producto.precio}{producto.moneda}</p>
                                        <div className="card-text">
                                            <div className="d-flex justify-content-left fixC">
                                                <div className="cantidad2">
                                                    <div className="center">
                                                        <button type="button" className="btn restarNowC carAdd" style={{paddingLeft:"0px"}}
                                                        onClick={()=>{setContadorInicial(contadorInicial < 2 ? contadorInicial : contadorInicial - 1 )}}>
                                                            <span className="material-icons carAdd"
                                                                >remove_circle_outline</span>
                                                        </button>
                                                    </div>
                                                    <div className="center">
                                                        <p className="cantidadItemDom cantidadItem1C">{contadorInicial}</p>
                                                    </div>
                                                    <div className="center">
                                                        <button type="button botonAdd carAdd" className="btn sumarNowC" onClick={()=>{sumaCantidad()}}>
                                                            <span className="material-icons carAdd"
                                                                >add_circle_outline</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="card-text">
                                            <button className="botonNow botonNow6 btnNoStyle" onClick={()=> {{agregarCarrito2()}}}>Agregar al carrito</button>   
                                        </p>
                                        </div>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    )}

export default Item2;
