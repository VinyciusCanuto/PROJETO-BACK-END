import "dotenv/config"
import express, { response } from "express"
import cors from "cors"

// Importar conexão do banco
import conn from "./config/conn.js"

// Importar os Models
import tarefa from "./models/tarefaModel.js"

// Importação das rotas 
import tarefaRouter from "./routes/tarefaRouter.js"

const PORT = process.env.PORT || 3333

const app = express()

// 3 Middlewares

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Conexão com o banco
conn.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ON http://localhost:${PORT}`)
    })
})
.catch((error) => console.error(error))

// Utilizar Rotas
app.use("/tarefas", tarefaRouter)

app.get("/", () => {
    response.status(404).json({message: "Olá, mundo!"})
})
