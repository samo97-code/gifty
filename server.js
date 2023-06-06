const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("https://gifty-json-server.vercel.app/db")
const middlewares = jsonServer.defaults({
    static: './build'
})

const fs = require('fs')
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)

const port = process.env.Port || 8081
server.use(middlewares)
server.use(
    jsonServer.rewriter({
        "/api/*":"/$1"
    })
)

server.use(router)
server.listen(port,()=>{console.log(`Server is running on ${port}`)})

// module.exports = server;