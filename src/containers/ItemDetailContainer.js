import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Item2 from '../components/Item/Item2';
import Item from '../components/Item/Item';
import { GlobalContext } from '../context/GlobalContext';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ItemDetailContainer = () =>{
    const { productoID } = useParams();
    // const [products, setProducts] = React.useState([]);
    // const [load, setLoad] = React.useState("CARGANDO . . .");
    const {cart,setCart,prueba, setPrueba, globalTest, products, setProducts} = React.useContext(GlobalContext);
    const [load, setLoad] = React.useState("CARGANDO . . .");
    // const cart = React.useContext(GlobalContext);

    // React.useEffect(() => {
    //     const myPromise = new Promise ((resolve, reject) => {
    //         setTimeout(() => {    
    //             resolve(ProductList);
    //             setLoad("");    
    //         }, 3000);
    // });
    
    //     myPromise.then((result) => setProducts(result));

    // },[]);    
     
    React.useEffect(()=>{
        // consultas a la BD, suscripciones como addeventlistener
        // console.log("im glibal")
        return () => {

            console.log("unmounted RIP Detail")
            // window.location.reload(false)
        }
    },[]);

    const test3 = () => {
        // console.log(products)
        // console.log(productoID)
        // console.log(load)
        // console.log(products2)
        console.log(products.producto.id)
        console.log(products)
    }

    return(
        <>
        <Helmet>
            <title>SoyGlucosa | ProyectoCoder</title>
        </Helmet>
            {/* <button onClick={test3}> test3</button> */}

            {/* <h1>ItemID: {productoID}</h1>
            <p>DETALLE DE PRODUCTO DEL ITEMDETAILCONTAINER</p> */}
            {/* <Link to={`/`}>
            <button>volver</button>
             </Link> */}
            {/* <h1>ItemID: {productoMostrar}</h1> */}
            {/* <button onClick={() => {test3()}}>console.log</button> */}
            {/* <button onClick={() => {setCart([...cart, {products}])}}>agre</button> */}

            
            {/* <div className="d-flex justify-content-center">
                <h1>{load}</h1>
            </div> */}
            

                    {
                        products.filter(product => product.producto.id === productoID)
                            .map((producto)=>{
                                return <Item2 key={producto.producto.id} producto={producto.producto}/>
                      })
                        
                    }
 
        </>
    )

}

export default ItemDetailContainer;