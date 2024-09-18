import { Sequelize } from "sequelize";

// Recebe 3 parametros = nome do banco, usuario e senha
const conn = new Sequelize("todo3E", "root", "Sen@iDev77!.", {
    host:"localhost",
    dialect: "mysql"
})

try {
    await conn.authenticate()
    console.log("Connection Mysql")
} catch (error) {
    console.error("Error", error)
}


export default conn