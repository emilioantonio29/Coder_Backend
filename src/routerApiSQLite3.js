import express from 'express';
import {ArticulosDB, ArticulosDBMySql} from './db.js'

const articulosMock = [
    {
        title: "Seiya de Pegaso SQLite3",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        //id: 1
    },
    {
        title: "Hyoga de Cisne SQLite3",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        //id: 2
    },
    {
        title: "Shun de Andromeda SQLite3",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        //id: 3
    },    
    {
        title: "Ikki de Fenix SQLite3",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        //id: 4
    },
    {
        title: "Shiriu del Dragon SQLite3",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        //id: 5
    }
]
const articulosMockMYSQL = [
    {
        title: "Seiya de Pegaso MYSQL",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        //id: 1
    },
    {
        title: "Hyoga de Cisne MYSQL",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        //id: 2
    },
    {
        title: "Shun de Andromeda MYSQL",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        //id: 3
    },    
    {
        title: "Ikki de Fenix MYSQL",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        //id: 4
    },
    {
        title: "Shiriu del Dragon MYSQL",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        //id: 5
    }
]
/* --------------------------------------------------------------------------------------- */
/*               Conexión a la base de datos SQLite3: Borro la tabla y creo productos              */
/* --------------------------------------------------------------------------------------- */
const config = {
    client: 'sqlite3',
    connection: {filename:"./DB/DB.sqlite3"}
}
const articulosDB = new ArticulosDB(config)

articulosDB.crearTabla().then(()=>{
    console.log("createTableOkSQLite3")
    return articulosDB.insertar(articulosMock)
}).then(()=>{
    console.log("insertOkSQLite3")
}).catch((err)=>{
    console.log(err)
})
.finally(()=>{
    articulosDB.cerrar()
})
/* --------------------------------------------------------------------------------------- */
/*               Conexión a la base de datos MySQL: Borro la tabla y creo productos              */
/* --------------------------------------------------------------------------------------- */
const configMySql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'emilio',
        password: 'test',
        database: 'coderhouse'
    }
}
const ArticulosDB2 = new ArticulosDBMySql(configMySql)
ArticulosDB2.crearTabla().then(()=>{
    console.log("createTableOkMySQL")
    return ArticulosDB2.insertar(articulosMockMYSQL)
}).then(()=>{
    console.log("insertOkMySQL")
}).catch((err)=>{
    console.log(err)
})
.finally(()=>{
    ArticulosDB2.cerrar()
})


// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerApiSQLite3(){
    
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
        const config = {
            client: 'sqlite3',
            connection: {filename:"./DB/DB.sqlite3"}
        }
        const articulosDB = new ArticulosDB(config)
        if(articulosMock.length<1){
            return res.json({error: "no hay productos agregados"})
        }
        articulosDB.listar()
            .then((listado)=>{
                res.json(listado)
            })
            .then(()=>{
                console.log("SQLite3 productos entregados")
            })
            .catch(err => { throw new Error(`Error de conexion: ${err}`) })
            .finally(() => {
                articulosDB.cerrar()
            })
    })
    routerApiProductos.get("/productos/:id", (req, res)=>{
        const config = {
            client: 'sqlite3',
            connection: {filename:"./DB/DB.sqlite3"}
        }
        const articulosDB = new ArticulosDB(config)
        const {id} = req.params
        // const producto = USERS_DB.filter(product => product.price == parseInt(id))[0];
        let parseId = parseInt(id)
        articulosDB.listarPorId(parseId)
            .then((producto)=>{
                if(producto){
                    console.log(producto)
                    return res.json(producto)
                }else{
                    res.json({error: "producto no encontrado"})
                }
            })
            .then(()=>{
                console.log("SQLite3 producto por ID entregado")
            })
            .catch(err => { throw new Error(`Error de conexion: ${err}`) })
            .finally(() => {
                articulosDB.cerrar()
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
        const config = {
            client: 'sqlite3',
            connection: {filename:"./DB/DB.sqlite3"}
        }
        const articulosDB = new ArticulosDB(config)
        articulosDB.insertar(data)
            .then((producto)=>{
                res.status(200).json(data);
            })
            .then(()=>{
                console.log("SQLite3 productos agregado")
            })
            .catch(err => { throw new Error(`Error de conexion: ${err}`) })
            .finally(() => {
                articulosDB.cerrar()
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
        const config = {
            client: 'sqlite3',
            connection: {filename:"./DB/DB.sqlite3"}
        }
        const articulosDB = new ArticulosDB(config)
        articulosDB.actualizarStockPorId(parseId,data.title,data.price,data.thumbnail)
        .then((producto)=>{
            if(!producto){
                return res.json({error: "No hay productos con ese ID"})
            }else{
                return res.json({"El producto quedó Actualizado de la siguiente forma": producto})
            }
        })
        .then(()=>{
            console.log("SQLite3 producto actualizado")
        })
        .catch(err => { throw new Error(`Error de conexion: ${err}`) })
        .finally(() => {
            articulosDB.cerrar()
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
        const config = {
            client: 'sqlite3',
            connection: {filename:"./DB/DB.sqlite3"}
        }
        const articulosDB = new ArticulosDB(config)
        articulosDB.borrarPorId(parseId)
        .then((producto)=>{
            if(producto){
                console.log(producto)
                return res.json({productoEliminado: producto})//el delete no suele enviar dato
            }else{
                res.json({error: "producto no encontrado; no se pudo eliminar"})
            }
        })
        .then(()=>{
            console.log("SQLite3 productos eliminado")
        })
        .catch(err => { throw new Error(`Error de conexion: ${err}`) })
        .finally(() => {
            articulosDB.cerrar()
        })
    })

    return routerApiProductos;

}
export {routerApiSQLite3}