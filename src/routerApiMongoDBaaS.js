import express from 'express';
//import ArticulosDB from './db.js'
import mongoose from 'mongoose'
const SchemaDBaaS = mongoose.Schema

const articulosMock = [
    {
        title: "Seiya de Pegaso",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        id: 1
    },
    {
        title: "Hyoga de Cisne",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        id: 2
    },
    {
        title: "Shun de Andromeda",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        id: 3
    },    
    {
        title: "Ikki de Fenix",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        id: 4
    },
    {
        title: "Shiriu del Dragon",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        id: 5
    }
]

const articulosSchemaDBaaS = new SchemaDBaaS({
    title: {type: String},
    price: {type: Number},
    thumbnail: {type: String},
    id: {type: Number}
})
const ArticulosDAODBaaS = mongoose.model('articulosDBaaS', articulosSchemaDBaaS)

var connectDBaaS = true;
/* --------------------------------------------------------------------------------------- */
/*               Conexión a la base de datos: Borro la tabla y creo productos              */
/* --------------------------------------------------------------------------------------- */

// mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//     })
//     .then(() => {
//         console.log("conectado a la base PRODUCTOS de Mongo")
//         return ArticulosDAODBaaS.deleteMany({})
//     })
//     .then((data) => {
//         console.log(data)
//     })
//     .then(() => {
//         return ArticulosDAODBaaS.create(articulosMock)  
//     })
//     .then((data) => {
//         console.log("Mock de productos creado en MongoDBaaS")
//     })
//     .catch(err => { throw new Error(`Error de conexion: ${err}`) })
//     .finally(() => {
//         mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
// })


// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerApiMongoDBaaS(){
    
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
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAODBaaS.find().then((articulos)=>{
                if(articulos.length<1){
                    return res.json({error: "no hay productos agregados"})
                }
                else{
                    return res.json(articulos)
                }
            })
        })
        .then((data) => {
            console.log("lista de productos entregada")
        })
        .catch(err => { throw new Error(`Error de conexion: ${err}`) })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        })

    })
    routerApiProductos.get("/productos/:id", (req, res)=>{
        const {id} = req.params
        // const producto = articulos.filter(product => product.price == parseInt(id))[0];
        let parseId = parseInt(id)
        mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(()=>{
            if(!connectDBaaS){
                ArticulosDAODBaaS.deleteMany({})
                .then((data) => {
                    console.log(data)
                })
                .then(() => {
                    return ArticulosDAODBaaS.create(articulosMock)  
                })
                .then((data) => {
                    console.log("Mock de productos creado en MongoDBaaS")
                    connectDBaaS = true
                })
                .catch(err => { throw new Error(`Error de conexion: ${err}`) })
            }
        })
        .then(() => {
            return ArticulosDAODBaaS.find({id: {$eq: parseId}}).then((producto)=>{
                if(producto.length){
                    console.log(producto)
                    return res.json(producto)
                }else{
                    return res.json({error: "producto no encontrado"})
                }
            })
        })
        .then((data) => {
            console.log("producto filtrado por ID entregado")
        })
        .catch(err => { throw new Error(`Error de conexion: ${err}`) })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
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
        // data.id = articulos.length +1;
        // articulos.push(data);
        // res.status(200).json(data);
        let idPush = 1
        mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAODBaaS.findOne().sort( { id: -1 })
        })
        .then((find) => {
            if(find === null){
                return idPush
            }else{
                idPush = find.id+1
            }
        })
        .then(() => {
            data.id = idPush
            return ArticulosDAODBaaS.create(data)
        })
        .then((data) => {
            console.log("producto creado correctamente")
        })
        .then((producto)=>{
           res.status(200).json(producto);

        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        })

    })

    // UPDATE
    routerApiProductos.put("/productos/:id", (req, res)=>{
        const data = req.body
        console.log(data)
        const {id} = req.params
        console.log(id)
        if(!data.title && !data.price && !data.thumbnail){
            return res.json({"Solo pueden actualizarse las siguientes propiedades del producto:": "title:text, price:number, thumbnail:text"})
        }
        let parseId = parseInt(id)
        mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAODBaaS.updateOne({id: parseId},{$set:{"title":data.title,"price":data.price,"thumbnail":data.thumbnail}})
        })
        .then((producto)=>{
            console.log(producto)
            if(producto.n==0){
                return res.json({error: "No hay productos con ese ID"})
            }else{
                return res.json({"El producto quedó Actualizado de la siguiente forma": producto})
            }
            // return res.json({"El producto quedó Actualizado de la siguiente forma": producto})
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        })
      
        // const producto = articulos.filter(product => product.id == parseInt(id))[0];


        // articulosDB.actualizarStockPorId(parseId,data.title,data.price,data.thumbnail).then((producto)=>{
        //     if(!producto){
        //         return res.json({error: "No hay productos con ese ID"})
        //     }else{
        //         return res.json({"El producto quedó Actualizado de la siguiente forma": producto})
        //     }
        // })
        // if(!producto){
        //     return res.json({error: "No hay productos con ese ID"})
        // }
        // if(!data.title && !data.price && !data.thumbnail){
        //     return res.json({"Solo pueden actualizarse las siguientes propiedades del producto:": "title:text, price:number, thumbnail:text"})
        // }
        // if(producto){
        //     if(articulos[parseInt(id)-1].title){
        //         articulos[parseInt(id)-1].title=data.title
        //     }else if(articulos[parseInt(id)-1].price){
        //         articulos[parseInt(id)-1].price=data.price
        //     }else if(articulos[parseInt(id)-1].thumbnail){
        //         articulos[parseInt(id)-1].thumbnail=data.thumbnail
        //     }
        //     // return res.json(articulos[parseInt(id)-1])
        //     return res.json({"El producto quedó Actualizado de la siguiente forma": articulos[parseInt(id)-1]})
        // }

    })

    // DELETE
    routerApiProductos.delete("/productos/:id", (req, res)=>{
        const {id} = req.params
        let parseId = parseInt(id)
        // const devolver = articulos.filter(user => user.id === parseInt(id))
        // articulos = articulos.filter(user => user.id !== parseInt(id));
        // res.json({productoEliminado: devolver})//el delete no suele enviar dato
        mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAODBaaS.deleteOne({id: {$eq: parseId}}).then((producto)=>{
                if(producto.deletedCount != 0){
                    console.log(producto)
                    return res.json({productoEliminado: producto})//el delete no suele enviar dato
                }else{
                    res.json({error: "producto no encontrado; no se pudo eliminar"})
                }
            })
        })
        .then((producto)=>{
            console.log("Producto Eliminado correctamente")
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        })

    })

    return routerApiProductos;

}
export {routerApiMongoDBaaS, ArticulosDAODBaaS}