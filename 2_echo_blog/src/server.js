import "dotenv/config"
import express from "express"
import cors from "cors"

import conn from "./config/conn.js"

import Postagens from "./models/postagemModel.js"
import Usuario from "./models/usuarioModel.js"

import postagemRouter from "./routes/postagemRouter.js"
import usuarioRouter from "./routes/usuarioRouter.js"

const PORT = process.env.PORT || 3333

const app = express()

// Middlewares

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

conn.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ON http://localhost:${PORT}`)
    })
})
.catch((error) => console.error(error))

// Rotas
app.use("/postagens", postagemRouter)
app.use("/usuarios", usuarioRouter)

app.get("/", () => {
    response.status(404).json({message: "Olá, mundo!"})
})