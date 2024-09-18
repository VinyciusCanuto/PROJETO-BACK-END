import { DataTypes } from "sequelize";
import { deflate } from "zlib";
import conn from "../config/conn.js"
import Perfil from "./perfilModel.js";
import Postagem from "./postagemModel.js";

const Comentario = conn.define("comentarios", {
    comentario:{
        type:DataTypes.STRING,
        allowNull: false,
    },
},
{ tableName: "comentarios" }
)

// Associação N:M
Perfil.belongsToMany(Postagem, {trough: "comentarios"})
Postagem.belongsToMany(Perfil, {trough: "comentarios"})

export default Comentario