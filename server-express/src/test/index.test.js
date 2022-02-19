const assert = require("assert")
const mongoConnectionNoSingleton = require("../daos/db-connection/mongo-connection")
const {firestoreConnection} = require("../daos/db-connection/firebase-connection")
const app = require("../../index")
const request = require("supertest")
const { expect } = require("chai")

describe("CONEXION MONGOATLAS", () =>{

    // _hasOpened: true,
    it("MongoAtlas: Probando conexion a la base de datos", async ()=>{
        const testConnection = await mongoConnectionNoSingleton.mongoConnection()
        //console.log(test.connections[0]._hasOpened)
        assert.notDeepEqual(testConnection, true)
    })

    it("MongoAtlas: Probando desconexion a la base de datos", async ()=>{
        const testDisconnect = await mongoConnectionNoSingleton.mongoDisconnect()
        assert.equal(testDisconnect, undefined)
    })
})


describe("CONEXION FIREBASE", () =>{

    // _hasOpened: true,
    it("Firebase: Probando conexion a la base de datos", async ()=>{
        let testConnection;
        //console.log(testConnection)
        testConnection = await firestoreConnection.collection('producto').get();
        //console.log(testConnection._size)
        assert.notEqual(testConnection._size, 0)
    })

})

describe("API FIREBASE", () => {
    it("Get a productos deberia retornar 200", async () =>{
        let res = await request(app).get("/apiFirebase/productos")
        //console.log(res.statusCode)
        expect(res.statusCode).to.eql(200)
    })
})

describe("DESCONEXION FIREBASE", () =>{

    it("Firebase: Probando desconexion a la base de datos", async ()=>{
        let testDisconnect;
        //console.log(testConnection)
        testDisconnect = await firestoreConnection.terminate()
        console.log(testDisconnect)
        // assert ???
    })

})

/*
    PRUEBAS MONGO
*/