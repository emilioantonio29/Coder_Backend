const { buildSchema } = require("graphql")
const { buyersListService, addBuyerService } = require("../../services/firebaseService")


const tester = {
    items:[
        {   cantidadComprada:6,
            stockAfterBuy:24,
            nombre:"Golfeado",
            precio:220,
            id:"21qS0AUU1VZm8UHE8OLz",
            categoria:"Golfeados"}
        ],
    comprador:{telefono:"",nombre:"",email:""},
    total:1320,
    date:{_seconds:1617714446,_nanoseconds:972000000},
    id:"1X7QaPB7eHmkhctX0LCs"}

const buyersSchema = buildSchema(`

    type Items {
        cantidadComprada: Int,
        categoria: String,
        precio: Int
        nombre: String,
        id: String
        stockAfterBuy: Int
    }

    type Date{
        _seconds: Int,
        _nanoseconds: Int
    }

    type Comprador {
        email:	String,
        nombre:	String,
        telefono: String
    }

    input ItemsInput {
        cantidadComprada: Int,
        categoria: String,
        precio: Int
        nombre: String,
        id: String
        stockAfterBuy: Int
    }

    input DateInput {
        _seconds: Int,
        _nanoseconds: Int
    }

    input CompradorInput {
        email:	String,
        nombre:	String,
        telefono: String
    }

    type Compras {
        id: String,
        comprador: Comprador,
        date: Date,
        items: [Items],
        total: Int
    }

    type CompraId{
        id: String
    }

    type Query { 
        orders : [Compras]
    }

    type Mutation {
        addOrden(comprador: CompradorInput, date: DateInput, items: [ItemsInput], total: Int) : Compras
    }


`)

/*
    type Mutation {
        addOrden(comprador: Comprador, date: Date, items: [Items], total: Int) : String
    }
*/

const buyerRoot = {
    orders : async () =>{
        let compradores = await buyersListService()
        //console.log(compradores)
        return compradores
    },

    addOrden : async (data) =>{
        let comprador = {'comprador': data.comprador, 'date': data.date, 'items': data.items, 'total': data.total};
        let ordenDeCompraId = await addBuyerService(comprador)
        return ordenDeCompraId;
    }

}


module.exports = {
    buyersSchema,
    buyerRoot
}

