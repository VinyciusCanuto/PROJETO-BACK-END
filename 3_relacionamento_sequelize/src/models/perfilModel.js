import { DataTypes } from "sequelize";
import conn from "../config/conn.js"

const Perfil = conn.define("perfis", {
    nome:{
        type:DataTypes.STRING,
        allowNull: true
    },
    bio:{
        type:DataTypes.STRING,
        allowNull: true
    }

},
{ tableName: "perfis" }
);

// Associação 1:1
Usuario.hasOne(Perfil)
Perfil.belongsTo(Usuario)

export default Perfil