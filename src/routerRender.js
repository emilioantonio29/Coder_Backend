import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import FS from 'session-file-store';
import MS from 'connect-mongo';

// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerRender(){

    //const MongoStore = MS(session)
    // const FileStore = FS(session)
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))
    routerApiProductos.use(cookieParser())
    // routerApiProductos.use(session({
    //     store: new FileStore({path:'./sesiones',ttl:300,retries:0}),
    //     secret: 'dontUseVar',
    //     resave: true,
    //     saveUninitialized: true,
    //     cookie: { maxAge: 10000 }
    //   }))

    routerApiProductos.use(session({
        store: MS.create(
            {mongoUrl:'mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/sesiones?retryWrites=true&w=majority'
            }),
        ttl: 60,
        secret: 'dontUseVar',
        resave: true,
        saveUninitialized: true/*,
        cookie: { maxAge: 10000 }*/
      }))
    
    var auth = function(req, res, next){
        if(req.session.nombre){
            return next();
        }else{
            return res.render("login", {
                bienvenida: "Para ver el contenido, por favor inicia sesión"
            });
        }
    }
    const expire = 60000
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/', auth, (req, res) =>{
        req.session.cookie.maxAge = expire
        res.render("index", {
            bienvenida: "¡Bienvenid@s al proyecto!",
            login: `Bienvenid@ ${req.session.nombre.nombre}`
        });
    })
    routerApiProductos.get('/login', (req, res) =>{
        if(req.session.nombre){
            res.render("login", {
                bienvenida: `Bienvenid@ ${req.session.nombre.nombre}, Ya iniciaste Sesión`,
                login: `Bienvenid@ ${req.session.nombre.nombre}`
            });
        }else{
            res.render("login", {
                bienvenida: "¡Bienvenid@: Por favor inicia sesión!",
                login: `Bienvenid@ ${req.session.nombre.nombre}`
            });
        }
    })


    // routerApiProductos.get('/loginAuth', (req, res) => {
    //     req.session.nombre = "Emilio"
    //     res.render("index", {
    //         bienvenida: "¡Bienvenidos al proyecto!"
    //     });
    // })

    routerApiProductos.get("/loginAuth/:nombre", (req, res)=>{
        req.session.cookie.maxAge = expire
        const nombre = req.params
        req.session.nombre = nombre
        res.json({login: `Bienvenid@ ${req.session.nombre.nombre}`})
    })


    routerApiProductos.get('/alta', auth, (req, res) =>{
        req.session.cookie.maxAge = expire
        res.render("alta", {
            bienvenida: "Formulario de alta de productos:",
            login: `Bienvenid@ ${req.session.nombre.nombre}`
        });
    })
    routerApiProductos.get('/mensajes', auth, (req, res) =>{
        req.session.cookie.maxAge = expire
        res.render("mensajes", {
            bienvenida: "Centro de Mensajes:",
            login: `Bienvenid@ ${req.session.nombre.nombre}`
        });
    })
    //GET DATA
    routerApiProductos.get("/productos", auth, (req, res)=>{
        req.session.cookie.maxAge = expire
        res.render("productos", {
            bienvenida: "¡Bienvenid@s al proyecto!",
            login: `Bienvenid@ ${req.session.nombre.nombre}`
        });
    })
    routerApiProductos.get('/logout', (req, res) => {
        //let name =  req.session.nombre.nombre
        //res.render("logout")
        if(!req.session.nombre){
            res.render("logout", {
                hastaluego: `Hola, aun no has iniciado sesión`
            });
        }else{
            let name =  req.session.nombre.nombre
            req.session.destroy(err => {
                if (err) {
                  res.json({ error: 'logout', body: err })
                } else {
                  res.render("logout", {
                      hastaluego: `HastaLuego ${name}`
                  });
                }
              })
        }
    })
    // routerApiProductos.get("/productos/:id", (req, res)=>{
    //     const {id} = req.params
    //     const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
    //     const productoArray = []
    //     productoArray.push(producto)
    //     if(producto){
    //        return res.render("productosId", {
    //             productoArray
    //         });
    //     }
    //     res.render("productosId", {
    //         errorNoInventarioId: "No se encontraron productos con ese ID"
    //     });
    // })
    //SEND DATA

    // UPDATE

    // DELETE

    return routerApiProductos;

}
export {routerRender}