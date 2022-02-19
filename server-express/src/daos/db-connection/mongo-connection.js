const {userMongoaaS, mongoose} = require("../config/mongooseConfigDb")

/*const mongoConnection = async () =>{
    try {
        return mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    } catch (error) {
        console.log(`Error al conectarse a MongoAtlas`)
    }
}*/


class mongoConnectionNoSingleton{
    
    static stringConnection = 'mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority';
    static config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    
    static async mongoConnection(){
        try {
            return await mongoose.connect(mongoConnectionNoSingleton.stringConnection, mongoConnectionNoSingleton.config)
        } catch (error) {
            console.log("Error al conectarse a MongoAtlas")
        }
    }

    static async mongoDisconnect(){
        try {
            return await mongoose.disconnect();
        } catch (error) {
            console.log("Error al desconectarse de MongoAtlas")
        }
    }
}

module.exports = mongoConnectionNoSingleton