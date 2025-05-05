const express = require("express");
const router = express.Router();
const { Aluno } = require("../models");

//Listar Aluno
router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render(
        "base", {
        title: "Listar Alunos",
        view: "alunos/show",
        alunos,
    });
});

//Adicionar novo Aluno - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
        title: "Adicionar Aluno",
        view: "alunos/add",
    });
});

// Adicionar Aluno - no BD
router.post("/add", async (req, res) => {
    await Aluno.create(
        {
            nome: req.body.nome,
            numero: req.body.numero
        },
    );
    res.redirect("/alunos");
});

//editar Aluno - formulário
router.get("/edit/:id", async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    res.render(
        "base", {
        title: "Editar Aluno",
        view: "alunos/edit",
        aluno,
    });
});

//editar Aluno - no BD
router.post("/edit/:id", async (req, res) => {
    await Aluno.update(
        {
            nome: req.body.nome,
            numero: req.body.numero
        },
        { where: { id: req.params.id } }
    );
    res.redirect("/alunos")
});

//excluir Aluno
router.post("/delete/:id", async (req, res) => {
    await Aluno.destroy({ where: { id: req.params.id } });
    res.redirect("/alunos")
});

module.exports = router;