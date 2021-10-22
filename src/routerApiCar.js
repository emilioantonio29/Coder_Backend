import express from 'express';
import { returnArray } from './routerApi.js';

// const tester = returnArray()
// console.log(tester)
const mascotas = []
let nextIdmascotas = 0

const articulosCarMock = []



// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerApiCar(){
    
    const routerApiCarProductos = express.Router()
    routerApiCarProductos.use(express.json())
    routerApiCarProductos.use(express.urlencoded({extended: true}))
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    routerApiCarProductos.get("/itemsCarrito/:id", (req, res)=>{
        const id = req.params
        const indexSearch = parseInt(id.id)
        console.log(indexSearch)
        for(let i=0;i<articulosCarMock.length; i++){
            if(articulosCarMock[i].id === indexSearch){
                return res.json(articulosCarMock[i])
            }
        }

        return res.json({NoExisteCarrito: "No Existe Carrito con el Id informado"})
    })
    //SEND DATA
    routerApiCarProductos.post("/crearCarrito", (req, res)=>{
        let newid = ''
        newid = articulosCarMock.length +1
        console.log(newid)
        articulosCarMock.push({id:newid, productos: []})
        newid = newid-1
        console.log(articulosCarMock[newid])
        // console.log(articulosCarMock[newid+1])
        // console.log(articulosCarMock[newid])
        return res.json({idCarrito:articulosCarMock[newid]});
    })
    routerApiCarProductos.post("/agregarItemCar", (req, res)=>{
        if(articulosCarMock.length === 0){
            return res.json({NoHayCarritosCreados: `no hay ningun CarritoID Creado`})
        }
        //EJEMPLO PARA PEGARLE A ESTE ENDPOINT
        //http://localhost:7001/apiCar/agregarItemCar?idCarrito=1&idProducto=1
        const productos = returnArray()

        const idCarrito = parseInt(req.query.idCarrito);
        const idProducto = parseInt(req.query.idProducto);
        console.log(idCarrito+' '+idProducto)
        for(let i=0;i<articulosCarMock.length; i++){
            //console.log(articulosCarMock[i])
            //console.log(articulosCarMock[i].id)
            if(articulosCarMock[i].id === idCarrito){
                for(let i2=0;i2<productos.length; i2++){
                    if(productos[i2].id === idProducto){
                        // return res.json({ok: `ok`})
                        articulosCarMock[i].productos.push(productos[i2])
                        console.log(articulosCarMock[i])
                        return res.json({ArticuloAgregado: articulosCarMock[i]})
                    }
                }
            }
        }
        return res.json({NoExisteIDCarOIdProducto: `No existe el IdProducto o el IdCarrito Informado`})
        // return res.json({CarritoIdNoExiste: `no hay Carrito con el ID informado`})

       /* console.log("agregar al carrito:=================================================")
        const id = req.params
        const indexDelete = parseInt(id.id)
        for(let i=0;i<articulosCarMock.length; i++){
            //console.log(articulosCarMock[i])
            //console.log(articulosCarMock[i].id)
            if(articulosCarMock[i].id === indexDelete){
                articulosCarMock.splice(i,1);
                res.json({CarritoEliminado: `${indexDelete}`})
            }
        }
        console.log(articulosCarMock)
        res.json({CarritoNoEliminado: `${indexDelete}`})//el delete no suele enviar dato*/
       // res.json({test: `test`})


    })


    // DELETE ID EN CARRITO
    routerApiCarProductos.delete("/test", (req, res)=>{
        // const {id} = req.params
        // const devolver = PRODUCTOS_DB.filter(user => user.id === parseInt(id))
        // PRODUCTOS_DB = PRODUCTOS_DB.filter(user => user.id !== parseInt(id));
        // res.json({productoEliminado: devolver})//el delete no suele enviar dato
    })
    // DELETECARRITO
    routerApiCarProductos.delete("/borrarCarrito/:id", (req, res)=>{
        console.log("borrarCarrito:=================================================")
        const id = req.params
        const indexDelete = parseInt(id.id)
        for(let i=0;i<articulosCarMock.length; i++){
            //console.log(articulosCarMock[i])
            //console.log(articulosCarMock[i].id)
            if(articulosCarMock[i].id === indexDelete){
                articulosCarMock.splice(i,1);
                res.json({CarritoEliminado: `${indexDelete}`})
            }
        }
        console.log(articulosCarMock)
        //console.log(indexDelete)
        //console.log(articulosCarMock[parseInt(id.id)])
        //articulosCarMock.splice(indexDelete,1);
        //console.log(articulosCarMock)
        // const devolver = articulosCarMock.filter(user => user.id === parseInt(id))
        // articulosCarMock = articulosCarMock.filter(user => user.id !== parseInt(id));
        //res.json({CarritoNoEliminado: "no se encontraron carritos con el ID ingresado"})//el delete no suele enviar dato
        res.json({CarritoNoEliminado: `${indexDelete}`})//el delete no suele enviar dato

    })

    return routerApiCarProductos;

}


export {routerApiCar}