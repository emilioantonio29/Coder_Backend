const express = require('express')
const app = express()
const server = require('http').Server(app)
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase-admin/auth');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require("path");
const serviceAccount = require('../../serviceAccountKey.json');
const {auth} = require('./apiMongo.js')
const { createTransport } = require('nodemailer');



const apiFirebase = () =>{

  let TEST_MAIL = ''
  
  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'stefanie.dickinson22@ethereal.email',
        pass: 'ZBa185z5rcqJDxKnDP'
    }
  });

  const routerApi = express.Router()
  routerApi.use(express.json())
  routerApi.use(express.urlencoded({extended: true}))
  routerApi.get('/test', paso1)
  initializeApp({
    credential: cert(serviceAccount)
  });
  const db = getFirestore();

  const traerProductos = async () => {
    const snapshot = await db.collection('producto').get();
    // const productos = snapshot.docs.map((e)=>e.data())
    const productos = snapshot.docs.map(element => {
      // return {...element.data(), id:element.id}
      return {"producto": {...element.data(), id:element.id}}
    })
    return productos
  }

  routerApi.get('/', (req, res) =>{
    res.json({saludo:"prueba localhost:8080/apiFire"})
  })

  routerApi.get('/productos', (req, res) =>{
    traerProductos().then(data=>{res.json(data)})
  })


  function paso1(req, res, next){
    console.log("paso1")
    res.json({cambialo: true})
    next();
  }

  const enviarMail = async (mailOptions) => {
    const info = await transporter.sendMail(mailOptions)
    return info
  }

  routerApi.post('/comprar', (req, res) =>{

    res.send("working on it")

    /*console.log(req.body)
    console.log(req.body.comprador.username)
    //TEST_MAIL = req.body.comprador.username
    const mailOptions = {
      from: 'SoyGlucosa Project',
      to: req.body.comprador.username,
      subject: 'Gracias por tu compra: SoyGlucosa Project',
      html: 
      
      `
        <h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>
      `
   }
    enviarMail(mailOptions).then((data)=>{
      console.log(data)
      res.json("recibido")
    }).catch((error)=>{
      console.log("no enviado")
      console.log(error)
      res.json(error)
    })*/
    
  })

 

  return routerApi;
}

module.exports ={
  apiFirebase
}