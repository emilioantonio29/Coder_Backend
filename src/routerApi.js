import express from 'express';
import ArticulosDB from './db.js'

const mascotas = []
let nextIdmascotas = 0
let USERS_DB = [
    {
        title: "Seiya de Pegaso",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        // id: 1
    },
    {
        title: "Hyoga de Cisne",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        // id: 2
    },
    {
        title: "Shun de Andromeda",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        // id: 3
    },    
    {
        title: "Ikki de Fenix",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        // id: 4
    },
    {
        title: "Shiriu del Dragon",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        // id: 5
    }
]
const config = {
    client: 'sqlite3',
    connection: {filename:"./DB/DB.sqlite3"}
}
const articulosDB = new ArticulosDB(config)

articulosDB.crearTabla().then(()=>{
    console.log("createTableOk")
    return articulosDB.insertar(USERS_DB)
}).then(()=>{
    console.log("insertOk")
}).catch((err)=>{
    console.log(err)
})
.finally(()=>{
    // articulosDB.cerrar()
})
// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerApi(){
    
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/', (req, res) =>{
        res.json({saludo:"Bienvenido a la raiz de la ruta API"})
    })
    //GET DATA
    routerApiProductos.get("/productos", (req, res)=>{
        if(USERS_DB.length<1){
            return res.json({error: "no hay productos agregados"})
        }
        articulosDB.listar().then((listado)=>{
            res.json(listado)
        })
    })
    routerApiProductos.get("/productos/:id", (req, res)=>{
        const {id} = req.params
        // const producto = USERS_DB.filter(product => product.price == parseInt(id))[0];
        let parseId = parseInt(id)
        articulosDB.listarPorId(parseId).then((producto)=>{
            if(producto){
                console.log(producto)
                return res.json(producto)
            }else{
                res.json({error: "producto no encontrado"})
            }
        })
        // if(producto){
        //     return res.json(producto)
        // }
        // res.json({error: "usuario no encontrado"})
    })
    //SEND DATA
    routerApiProductos.post("/productos", (req, res)=>{
        const data = req.body;
        console.log(data)
        // data.id = USERS_DB.length +1;
        // USERS_DB.push(data);
        // res.status(200).json(data);
        articulosDB.insertar(data)
            .then((producto)=>{
                //return res.json(producto)
                //res.render("productos")
                res.status(200).json(data);
            }).catch((err)=>{
                console.log(err)
            })
    })

    // UPDATE
    routerApiProductos.put("/productos/:id", (req, res)=>{
        const data = req.body
        const {id} = req.params
        if(!data.title && !data.price && !data.thumbnail){
            return res.json({"Solo pueden actualizarse las siguientes propiedades del producto:": "title:text, price:number, thumbnail:text"})
        }
        let parseId = parseInt(id)
        // const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
        articulosDB.actualizarStockPorId(parseId,data.title,data.price,data.thumbnail).then((producto)=>{
            if(!producto){
                return res.json({error: "No hay productos con ese ID"})
            }else{
                return res.json({"El producto quedó Actualizado de la siguiente forma": producto})
            }
        })
        // if(!producto){
        //     return res.json({error: "No hay productos con ese ID"})
        // }
        // if(!data.title && !data.price && !data.thumbnail){
        //     return res.json({"Solo pueden actualizarse las siguientes propiedades del producto:": "title:text, price:number, thumbnail:text"})
        // }
        // if(producto){
        //     if(USERS_DB[parseInt(id)-1].title){
        //         USERS_DB[parseInt(id)-1].title=data.title
        //     }else if(USERS_DB[parseInt(id)-1].price){
        //         USERS_DB[parseInt(id)-1].price=data.price
        //     }else if(USERS_DB[parseInt(id)-1].thumbnail){
        //         USERS_DB[parseInt(id)-1].thumbnail=data.thumbnail
        //     }
        //     // return res.json(USERS_DB[parseInt(id)-1])
        //     return res.json({"El producto quedó Actualizado de la siguiente forma": USERS_DB[parseInt(id)-1]})
        // }

    })

    // DELETE
    routerApiProductos.delete("/productos/:id", (req, res)=>{
        const {id} = req.params
        let parseId = parseInt(id)
        // const devolver = USERS_DB.filter(user => user.id === parseInt(id))
        // USERS_DB = USERS_DB.filter(user => user.id !== parseInt(id));
        // res.json({productoEliminado: devolver})//el delete no suele enviar dato
        articulosDB.borrarPorId(parseId).then((producto)=>{
            if(producto){
                console.log(producto)
                return res.json({productoEliminado: producto})//el delete no suele enviar dato
            }else{
                res.json({error: "producto no encontrado; no se pudo eliminar"})
            }
        })
    })

    return routerApiProductos;

}
export {routerApi}