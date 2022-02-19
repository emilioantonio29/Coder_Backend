const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue  } = require('firebase-admin/firestore');
const serviceAccount = require('../config/firebaseAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
  });

const firestoreConnection = getFirestore();

module.exports = {
    firestoreConnection
}
