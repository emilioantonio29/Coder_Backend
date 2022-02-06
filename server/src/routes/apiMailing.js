const express = require('express')
const app = express()
const server = require('http').Server(app)
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase-admin/auth');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require("path");
const serviceAccount = require('../../serviceAccountKey.json');
const {auth} = require('./apiMongo.js')
import { createTransport } from 'nodemailer';



const apiMailing = () =>{

  const TEST_MAIL = 'xxxxxxxx@ethereal.email'

  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'xxxxxxxx'
    }
  });



  return routerApiMailing;
}

module.exports ={
  apiMailing
}