import knexFun from 'knex'
/*objeto next: funcion next llamandola con el objeto de configuracion*/

/*sintaxis require
const knex = require('knex')(opcions)

const knex = require('knex')
const knexObj = knex(option)*/


class ArticulosDB{
    constructor(config){
        const knex = knexFun({
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'emilio',
                password: 'test',
                database: 'coderhouse'
            }
        })

        this.knex = knex
        //this.knex = knexFun(config)
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('articulos').then(()=>{
            return this.knex.schema.createTable('articulos', table =>{
                table.increments('id').primary();
                table.string('title',100).notNullable();
                table.float('price');
                table.string('thumbnail',255).notNullable();
            })
        })
        
    }
    insertar(articulos){
        return this.knex('articulos').insert(articulos)
    }
    listar(){
        return this.knex('articulos').select()
    }
    listarPorId(id){
        return this.knex('articulos').where('id', id)
    }
    borrarPorId(id){
        return this.knex('articulos').where('id',id).del()
    }
    actualizarStockPorId(id, newTitle, newPrice, newThumbnail){
        return this.knex('articulos').where('id',id).update({title: newTitle, price: newPrice,thumbnail: newThumbnail})
    }
    cerrar(){
        return this.knex.destroy()
    }


}

export default ArticulosDB;