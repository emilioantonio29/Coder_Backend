const express = require('express')
// const bcrypt = require("bcryptjs");
const passport = require('passport')
const {userMongoaaS, mongoose} = require("./mongooseConfigDb")

const getUserDbMongo = async (username) =>{
    let data = await mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        let user = ""
        return user = userMongoaaS.findOne({username: username})
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data
}

// NO SE VALIDA SI EL USUARIO YA ESTA CREADO: ESTO SE VALIDA EN LA CAPA DE SERVICIO
const createUserDbMongo = async (userObj) => {
    let data = await mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        return userMongoaaS.create(userObj)
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data; 
}


module.exports= {
    getUserDbMongo,
    createUserDbMongo
}