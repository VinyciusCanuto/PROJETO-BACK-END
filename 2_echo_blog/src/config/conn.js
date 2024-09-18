import { Sequelize } from "sequelize";

const conn = new Sequelize("postagem3E", "root", "Sen@iDev77!.", {
    host: "localhost",
    dialect: "mysql"
})

try {
    await conn.authenticate()
    console.log("Connection Mysql")
} catch (error) {
    console.error("Error", error)
}

export default conn