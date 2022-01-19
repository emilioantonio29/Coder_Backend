import React, {useState, useEffect} from 'react';
import Item from '../Item/Item';


const ItemList = ({products}) =>{



    return(
        <>
            {/* <div className="col-md-8 ">
                <div className="col-md-8 d-flex  justify-content-start ">
                {products.map((product)=>{
                        return <Item key={product.producto.id} product={product}/>;
                    })}


                </div>
            </div> */}

                    {/* <div className="container" style={{:"1px solid blue"}}>
                        <div className="row"> */}
                        <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <div  className="itemList d-flex flex-wrap">
                                {products.map((product)=>{
                                    return <Item key={product.producto.id} product={product}/>;
                                })}
                            </div>
                            </div>
                            </div>
                        {/* </div>
                    </div> */}
                    
                    

        </>
    )

}

export default ItemList;