const mongoose = require('mongoose')
const SchemaLocal = mongoose.Schema
const userSchema = new SchemaLocal({
  nombre: {type: String},
  apellido: {type: String},
  username: {type: String},
  password: {type: String},
  provincia: {type: String},
  localidad: {type: String},
  calle: {type: String},
  altura: {type: String},
  zip: {type: String},
  telefono: {type: String},
  tyc: {type: Boolean}, 
  fecha: {type: String}
})
const userMongoaaS = mongoose.model('users', userSchema)

module.exports = {
    userMongoaaS, mongoose
}