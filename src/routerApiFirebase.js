// /* ------------------------------------------------------------------ */
// /*               FIREBASE                                             */
// /* ------------------------------------------------------------------ */

// /* ------------------------------------------------------------------ */
// /*               CONEXION A LA API DE FIREBASE                        */
// /* ------------------------------------------------------------------ */
// var admin = require("firebase-admin");

// var serviceAccount = require("./bd/backend-project-93108-firebase-adminsdk-g78q2-ba1b927f71.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// /* ------------------------------------------------------------------ */
// /*                TEST CONEXION
// /* ------------------------------------------------------------------ */

// // console.log("conectados a firebase")

// /* ------------------------------------------------------------------ */
// /*               CONEXION A FIRESTORE                                 */
// /* ------------------------------------------------------------------ */

// const db = admin.firestore();

// /* ------------------------------------------------------------------ */
// /*               CONEXION A COLLECTION                                */
// /* ------------------------------------------------------------------ */

// const usuariosCollection = db.collection("usuarios");

// //                .THEN
// /* ------------------------------------------------------------------ */
// // const doc = usuariosCollection.doc("2")
// // doc.create({
// //   name: "Antonio"
// // }).then(res => console.log(res))


// // async function createUser(){
// //   const doc = usuariosCollection.doc("3")
// //   const res = await doc.create({
// //     name: "Zun"
// //   })
// //   console.log(res)
// // }
// // createUser()
// /* ------------------------------------------------------------------ */


// /* ------------------------------------------------------------------ */
// async function find(){
//   const query = await usuariosCollection.get()
//   query.docs.map(d=>console.log(d.data()))
// }
// find()

// async function findId(id){
//   const doc = await usuariosCollection.doc(id)
//   const res = await doc.get()
//   console.log("-----------------------")
//   console.log(res.data())
// }
// findId("2")


// async function udpateId(id){
//   const doc = await usuariosCollection.doc(id)
//   const res = await doc.update({
//     name: "Antonio",
//     edad: 35
//   })
//   console.log("-----------------------")
//   console.log(res)
// }
// udpateId("2")

// async function deleteId(id){
//   const doc = await usuariosCollection.doc(id)
//   const res = await doc.delete()
//   console.log("-----------------------")
//   console.log(res)
// }
// deleteId("3")
// /* ------------------------------------------------------------------ */