const express = require("express");
const app = express(); // create express app
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getAuth, createUserWithEmailAndPassword } = require('firebase-admin/auth');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require("path");
const serviceAccount = require('../../serviceAccountKey.json');
// const {auth} = require('./apiMongo.js')
const { createTransport } = require('nodemailer');


initializeApp({
    credential: cert(serviceAccount)
  });

const db = getFirestore();


const getProductsFirebase = async () =>{
    const snapshot = await db.collection('producto').get();
    const productos = await snapshot.docs.map(element => {
      return {"producto": {...element.data(), id:element.id}}
    })
    return productos
}





module.exports = {
    getProductsFirebase,
}


