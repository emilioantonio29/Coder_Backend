import express from 'express';
import { routerApiMongoDBaaS, ArticulosDAODBaaS } from './routerApiMongoDBaaS.js';
//import ArticulosDB from './db.js'
import mongoose from 'mongoose'
import pkg from "normalizr";
import utils from "util";

const { denormalize, normalize, schema } = pkg;
const SchemaLocal = mongoose.Schema

const articulosSchemaLocal = new SchemaLocal({
    title: {type: String},
    price: {type: Number},
    thumbnail: {type: String},
    id: {type: Number}
})
const mensajesSchemaLocal = new SchemaLocal({
    email: {type: String},
    nombre: {type: String},
    apellido: {type: String},
    mensaje: {type: String},
    id: {type: Number}
})
const ArticulosDAOLocal = mongoose.model('articulosLocal', articulosSchemaLocal)
const MensajesDAOLocal = mongoose.model('mensajesLocal', mensajesSchemaLocal)


const articulosMock = [
    {
        title: "Seiya de Pegaso MongoLocal",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        id: 1
    },
    {
        title: "Hyoga de Cisne MongoLocal",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        id: 2
    },
    {
        title: "Shun de Andromeda MongoLocal",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        id: 3
    },    
    {
        title: "Ikki de Fenix MongoLocal",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        id: 4
    },
    {
        title: "Shiriu del Dragon MongoLocal",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        id: 5
    }
]
/* --------------------------------------------------------------------------------------- */
/*               Conexión a la base de datos: Borro la tabla y creo productos              */
/* --------------------------------------------------------------------------------------- */
mongoose.connect('mongodb://localhost/productos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
    console.log("conectado a la base PRODUCTOS de Mongo")
    return ArticulosDAOLocal.deleteMany({})
})
.then((data) => {
    console.log(data)
})
.then(() => {
    return ArticulosDAOLocal.create(articulosMock)  
})
.then((data) => {
    console.log("Mock de productos creado en MongoD")
})
.catch(err => { throw new Error(`Error de conexion: ${err}`) })
.finally(() => {
    mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
})




// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerApiMongoD(){
    
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/', (req, res) =>{
        res.json({saludo:"Bienvenido a la raiz de la ruta API"})
    })
    //GET DATA
    routerApiProductos.get("/mensajes", (req, res)=>{
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return MensajesDAOLocal.find().then((mensajes)=>{
                if(mensajes.length<1){
                    return res.json({error: "no hay mensajes"})
                }
                else{
                    return res.json(mensajes)
                }
            })
        })
        .then((data) => {
            console.log("lista de mensajes entregada")
        })
        .catch(err => { throw new Error(`Error de conexion: ${err}`) })
        .finally(() => {
            mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        })

    })
    //GET DATA
    routerApiProductos.get("/productos", (req, res)=>{
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAOLocal.find().then((articulos)=>{
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
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAOLocal.find({id: {$eq: parseId}}).then((producto)=>{
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
        console.log("===========================")
        console.log(data)
        // data.id = articulos.length +1;
        // articulos.push(data);
        // res.status(200).json(data);
        let idPush = 1
        //const originalData = 
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAOLocal.findOne().sort( { id: -1 })
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
            return ArticulosDAOLocal.create(data)
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
    //SEND DATA
    routerApiProductos.post("/mensajes", (req, res)=>{
        const data = req.body;
        //console.log("===========================")
        console.log(data)
        const originalData = data;
        console.log("/* -------------- ORIGINAL ------------- */");
        console.log(utils.inspect(originalData, false, 4, true));
        console.log("length", JSON.stringify(originalData).length);

        // Define your comments schema
        const author = new schema.Entity("authors");

        const Comemnt = new schema.Entity("comments")

        // Define your article
        const article = new schema.Entity("articles", {
        author: author,
        comments: Comemnt,
        });

        const normalizedData = normalize(originalData, article);
        console.log("/* -------------- NORMALIZED ------------- */");
        console.log(utils.inspect(normalizedData, false, 4, true));
        console.log("length", JSON.stringify(normalizedData).length);
        let idPush = 1
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return MensajesDAOLocal.findOne().sort( { id: -1 })
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
            return MensajesDAOLocal.create(data)
        })
        .then((data) => {
            console.log("producto creado correctamente")
        })
        .then((mensaje)=>{
           res.status(200).json(mensaje);

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
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAOLocal.updateOne({id: parseId},{$set:{"title":data.title,"price":data.price,"thumbnail":data.thumbnail}})
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
        mongoose.connect('mongodb://localhost/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            return ArticulosDAOLocal.deleteOne({id: {$eq: parseId}}).then((producto)=>{
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
export {routerApiMongoD}