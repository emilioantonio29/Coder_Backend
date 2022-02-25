const koa = require("koa")
const Router = require("koa-router")
const  {graphqlHTTP}  = require('koa-graphql');
const { buyersSchema, buyerRoot } = require("./src/graphQL/firebaseSchema")

const app = new koa()
const router = new Router()

router.all('/', graphqlHTTP({
    schema: buyersSchema,
    rootValue: buyerRoot,
    graphiql: true
}))

app.use(router.routes()).use(router.allowedMethods())

const PORT = process.env.PORT || 7002;
app.listen(PORT, ()=>{
    console.log("Server Running")
})