const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const handlebars = require('express-handlebars');
let productos = [
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
app.engine("hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
    })
);

app.set('views', './public'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas

app.use(express.static('public'))
app.get('/', (req, res) =>{
    res.render("index");
});
const messages = []
io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    // envio los mensajes al cliente que se conecto
    socket.emit('productos', productos)
    socket.emit('messages', messages)
    // socket.emit("productos", productos_db)

    // escucho los mensajes enviado por el cliente y los envio tipo broadcast   
    socket.on("new-message", data=>{
        messages.push(data)
        io.sockets.emit('messages', messages);
    })
    socket.on("act", data=>{
        productos.push(data)
        io.sockets.emit('productos', productos);
    })

})


server.listen(7001, function() {
    console.log('Servidor corriendo en http://localhost:7001');
})
