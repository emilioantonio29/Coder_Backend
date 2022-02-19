import * as React from 'react';
import ItemList from '../components/ItemList/ItemList';
import {Link} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Helmet } from 'react-helmet';




const ItemListContainer = () =>{
    const {cart,setCart,prueba, setPrueba, globalTest,globalTest2,cart2,setCart2,firstAsync,globalTest3,globalTest4,products, setProducts} = React.useContext(GlobalContext);
    // const [products, setProducts] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const [contenido, setContenido] = React.useState(false);
  
    React.useEffect(() => {
        if(products.length===0){
            setLoad(true)
        }else{
            setTimeout(() => {  

                setLoad(false) 
                setContenido(false)
                }, 300);
        }
        // console.log("itemListContainer")
        setTimeout(() => {  

            setLoad(false) 
            setContenido(false)
            }, 1500);
     
        return () => {
            console.log("itemListContainer_Out")
        }
    },[]);     


    // console.log(products)
    // console.log(products)
    return(
        <><div style={{minHeight:"60vh"}}>
        <Helmet>
            <title>SoyGlucosa | ProyectoCoder</title>
        </Helmet>
            {load ? (
                <div className="d-flex flex-column" style={{minHeight:"600px"}}>
                    <div className="d-flex justify-content-center" >
                        <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                            <p >
                                <Link to={`/`}>
                                <button disabled className="btn">Home</button>
                                </Link>
                            </p>
 
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
                // <div>
                //     <br/>
                // <div className="d-flex justify-content-center" style={{maxHeight:"1000px"}}>
                //     <div className="col-md-8 d-flex justify-content-around position-relative" style={{border:"1px solid red"}}>
                //         <ItemList products={products} key={products}/>
                //     </div>
                // </div>
                // </div>
              
                // <div className="container">
                //     <div className="container">
                //         <div>
     
                        /* </div>

                    </div>

                </div> */
                // <Container fluid>
                //     <Row>
                //         <ItemList products={products} key={products}/>
                //     </Row>
                // </Container>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center" >
                        <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                            <p >
                                <Link to={`/`}>
                                <button disabled className="btn">Home</button>
                                </Link>
                            </p>
 
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="d-flex justify-content-center" >
                         <ItemList products={products} key={products}/>
                    </div>
 
                </div>
                
                

            )}


        </div>
    </>
    )

}

export default ItemListContainer;