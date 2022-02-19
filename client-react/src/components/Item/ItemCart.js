import * as React from 'react'; 
import { GlobalContext } from "../../context/GlobalContext";
import './style.css'
import swal from 'sweetalert'
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const ItemCart = ({productCart}) => {
    const [show, setShow] = React.useState(false);
    const {cart, setCart, globalTest,globalTest4,globalTest3,prueba, setPrueba, total,setTotal,renderFunction} = React.useContext(GlobalContext);
    const [productCarts, setProducts] = React.useState([]);
    const [contadorInicial, setContadorInicial] = React.useState(1);
    const [stockDisponible, setstockDisponible] = React.useState(productCart[9])//stock
   
    
    React.useEffect(()=>{
       
        document.title = `${contadorInicial}`
        document.title = `${stockDisponible}`
        // console.log("mounted stockDisponible")
        if(localStorage.getItem(productCart[0]) === null){
            setstockDisponible(productCart[9])
            
        }else{
            let variableCarrito = JSON.parse(localStorage.getItem(productCart[0]))
            setstockDisponible(productCart[9] - variableCarrito[3])
        }

        
        return () => {
            
        }
    },[contadorInicial]);
   
    const consoleLogItemCard = () => {
        // console.log(total)
        // console.log(cart)
        // localStorage.getItem("2")
        // let user = JSON.parse(localStorage.getItem(productCart))
        // console.log(user.idProducto)
        // console.log(JSON.parse(productCart).id)
        // console.log(productCart.length)
        // console.log(cart[0])
        // console.log(cart)
        

        // console.log(JSON.parse(localStorage.getItem(productCart[0]))[0])
        // console.log(productCart[9])
        // console.log(stockDisponible+" "+contadorInicial)
        // console.log(productCart[9]-stockDisponible)
        // console.log(typeof(productCart[2]))
    }

    const eliminarItem = () => {

        localStorage.removeItem(JSON.parse(localStorage.getItem(productCart[0]))[0])
        // window.location.reload(false)
        globalTest3()
        globalTest4()
        // window.location.reload(false)
        renderFunction()
        borrarCarritoMsg()
      
    }
    ////////////////TEST
    function agregarCarrito(){
        if(contadorInicial <= stockDisponible){
            setstockDisponible(stockDisponible - contadorInicial)
            setContadorInicial(1)
            setShow(false)
            addLocalStorage()
            setCart([...cart, JSON.parse(localStorage.getItem(productCart[0]))])
            
        }else{
            alert("test")
        }
    } 
    function agregarCarrito2(){
        if(contadorInicial <= stockDisponible){
            setstockDisponible(stockDisponible - contadorInicial)
            setContadorInicial(1)
            setShow(false)
            addLocalStorage()
        }else{
            agregarNoStock()
        }
    } 
    function agregarCarrito3(){
        if(productCart[9]-stockDisponible>1 ){
            setstockDisponible(stockDisponible + contadorInicial)
            setContadorInicial(1)
            setShow(false)
            addLocalStorage2()
        }else{
            // alert("No hay mas Stock")
        }
    } 

    function sumastockDisponible(){
        if(contadorInicial <= stockDisponible - 1){
            setContadorInicial(contadorInicial + 1)
        }
    }
 
    const addLocalStorage = () => {
        localStorage.setItem(productCart[0], JSON.stringify([
            productCart[0],
            productCart[1],
            productCart[2],
            productCart[9] - (stockDisponible - contadorInicial),//stockDisponible agregada al carrito
            productCart[4],
            productCart[5],
            productCart[6],
            productCart[7],
            productCart[3]-(productCart[3] - (stockDisponible - contadorInicial)),
            productCart[9]//stock disponible
        ]))
        let total2 = 0
        for(let i =0; i < localStorage.length; i++){
            let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            // console.log(key[0])
            total2 = total2 + ((key[2])*(key[3]))
            // total = total + key
        }
        setTotal(total2)
        // console.log(total2)
        
    }
    const addLocalStorage2 = () => {
        localStorage.setItem(productCart[0], JSON.stringify([
            productCart[0],
            productCart[1],
            productCart[2],
            productCart[9] - (stockDisponible + contadorInicial),//stockDisponible agregada al carrito
            productCart[4],
            productCart[5],
            productCart[6],
            productCart[7],
            productCart[3]-(productCart[3] - (stockDisponible + contadorInicial)),
            productCart[9]//stock disponible
        ]))
        let total2 = 0
        for(let i =0; i < localStorage.length; i++){
            let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            // console.log(key[0])
            total2 = total2 + ((key[2])*(key[3]))
            // total = total + key
        }
        setTotal(total2)
        // console.log(total2)
        
    }
    // const test4 = () => {
    //     console.log(JSON.parse(localStorage.getItem(producto.id))[4])
    // }    
    const agregarOk= () =>{
        
        swal({
            title: "",
            text: ``,
            icon: "success",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    const agregarNoStock= () =>{
        
        swal({
            title: "",
            text: `Lo sentimos, este producto ya no tiene stock disponible...`,
            icon: "warning",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    const borrarCarritoMsg= () =>{
        swal({
            title: "",
            text: `El item fue eliminado del carrito`,
            icon: "",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }


    return( 
        <>        
            <Helmet>
                <title>SoyGlucosa | ProyectoCoder</title>
            </Helmet>
            <div className="container col-md-12">
                <div className="table-responsive">
                    <table className="table"> 
                        <thead className="fondo shoC">
                            <tr></tr>
                        </thead>
                        {/* BODY START */}
                        <tbody>
                            <tr className="disappear1" style={{height: "100px"}}>
                                <td className="align-middle" style={{width:"25%"}}>
                                    <div className="d-flex justify-content-left align-items-center borderImg2">
                                        {/* <img src={`../imagenes/${productCart[7]}.png`} alt="" /> */}
                                        <img src={productCart[7]} alt="" />
                                        <div className="trashC">
                                            <div>
                                                <button className="btnTrash test2" onClick={eliminarItem}>
                                                    <span className="material-icons trash rounded">
                                                        delete_forever
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="trashOverlay rounded">
                                                <button className="trashText rounded test2" onClick={eliminarItem}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle" style={{width:"25%"}}>
                                    <div className="">
                                        <p>{productCart[1]}</p>
                                    </div>
                                </td>
                                <td className="align-middle" style={{width:"16%"}}>
                                    <div className="d-flex justify-content-center">
                                        <p>{productCart[2]}{productCart[4]}</p>
                                    </div>
                                </td>
                                <td className="align-middle" style={{width:"16%"}}>
                                    <div className="d-flex justify-content-center fixC">
                                        <div className="cantidad2">
                                            <div className="center">
                                                <button type="button" className="btn restarNowC carAdd" data-toggle="modal"
                                                    data-target=""  onClick={() => {{agregarCarrito3()}}}>
                                                    <span className="material-icons carAdd"
                                                        >remove_circle_outline</span>
                                                </button>
                                            </div>
                                            <div className="center">
                                                <p className="cantidadItemDom cantidadItem1C">{productCart[9]-stockDisponible}</p>
                                            </div>
                                            <div className="center">
                                                <button type="button botonAdd carAdd" className="btn sumarNowC" data-toggle="modal"
                                                    data-target=""  onClick={() => {{agregarCarrito2()}}}>
                                                    <span className="material-icons carAdd"
                                                      >add_circle_outline</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle" style={{width:"16%"}}>
                                    <div className="d-flex justify-content-center">
                                        <p className="subtotal sub1">{(productCart[2]*(productCart[9]-stockDisponible))}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        {/* FOOT START */}
                        <tfoot className="">
                            <tr></tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        {/* <p>stock Disponible: {stockDisponible}</p> */}

        </>
    )
    
}

export default ItemCart;

