const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("meu_banco", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
})

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });

const TbExemplo = sequelize.define(
    "Tb_Exemplo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        tableName: "Tb_Exemplo",
        timestamps: false,
    }
);

module.exports = {
    sequelize,
    TbExemplo,
};