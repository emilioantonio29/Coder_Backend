const express = require('express')
// const bcrypt = require("bcryptjs");
const passport = require('passport')
const {userMongoaaS, mongoose} = require("../config/mongooseConfigDb")
const mongoConnectionNoSingleton = require("../db-connection/mongo-connection")

const getUserDbMongo = async (username) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let user = ""
        return user = userMongoaaS.findOne({username: username})
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        //mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data
}

const passwordRecoveryDbMongo = async (username) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let user = ""
        return user = userMongoaaS.findOne({username: username})
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data
}

// NO SE VALIDA SI EL USUARIO YA ESTA CREADO: ESTO SE VALIDA EN LA CAPA DE SERVICIO
const createUserDbMongo = async (userObj) => {
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        return userMongoaaS.create(userObj)
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data; 
}


module.exports= {
    getUserDbMongo,
    createUserDbMongo,
    passwordRecoveryDbMongo
}