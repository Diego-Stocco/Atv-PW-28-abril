const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS como view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Rota principal
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Rota para os Integrantes
const integranteRouter = require("./routes/integrantes");
app.use('/integrantes', integranteRouter);

// Rotas para categorias
const categoriaRouter = require("./routes/categorias");
app.use("/categorias", categoriaRouter);

// Rota para alunos
const alunoRouter = require("./routes/alunos");
app.use("/alunos", alunoRouter);

// Rota para professores
const professorRouter = require("./routes/professores");
app.use("/professores", professorRouter);

// Iniciar o servidor e sincronizar com o banco de dados
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor em execução na porta 3000");
    });
});

// Exportar o app para o Vercel
module.exports = app;