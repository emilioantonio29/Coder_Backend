const { buildSchema } = require("graphql")
const { buyersListService, addBuyerService } = require("../../services/firebaseService")


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
        ordersByUser(email: String) : [Compras]
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
    },

    ordersByUser : async (data) =>{
        let compradores = await buyersListService()
        let comprador = compradores.filter((elem) => elem.comprador.email == data.email)
        //console.log(comprador)
        //console.log(compradores)
        return comprador
    }

}


module.exports = {
    buyersSchema,
    buyerRoot
}

