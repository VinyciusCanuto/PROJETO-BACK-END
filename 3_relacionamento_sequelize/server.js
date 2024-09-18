import express from "express"
import conn from "./src/config/conn.js"

const PORT = 3333


// MODELS
import Perfil from "./src/models/perfilModel";

const app = express()

app.get("/", (request, response) => {
    
})

