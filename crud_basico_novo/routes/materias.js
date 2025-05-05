const express = require("express");
const router = express.Router();
const { Materia, Professor } = require("../models");

// Mostrar todos os materias
router.get("/", async (req, res) => {
    try {
        const materias = await Materia.findAll({
            include: [{ model: Professor, as: "Professor" }],
        });
        res.render("base", {
            title: "Materias",
            view: "materias/show",
            materias,
        });
    } catch (err) { //Tratamento de erro
        console.error(err);
        res.status(500).send("Erro ao recuperar materias");
    }
});

// Formulário para adicionar um novo materia
router.get("/add", async (req, res) => {
    try {
        const professores = await Professor.findAll();
        res.render("base", {
            title: "Add Materia",
            view: "materias/add",
            professores,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar professores");
    }
});

// Adicionar um novo materia
router.post("/add", async (req, res) => {
    try {
        const { nome, professorId } = req.body;
        await Materia.create({
            nome,
            professorId,
        });
        res.redirect("/materias");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar materia");
    }
});

// Formulário para editar um materia
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materia.findByPk(id, {
            include: [{ model: Professor, as: "Professor" }],
        });
        const professores = await Professor.findAll();
        if (materia) {
            res.render("base", {
                title: "Edit Materia",
                view: "materias/edit",
                materia,
                professores,
            });
        } else {
            res.status(404).send("Materia não encontrada");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar materia");
    }
});

// Atualizar um materia
router.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, professorId } = req.body;
        const materia = await Materia.findByPk(id);
        if (materia) {
            await materia.update({ nome, professorId });
            res.redirect("/materias");
        } else {
            res.status(404).send("Materia não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar a materia");
    }
});

// Deletar um materia
router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materia.findByPk(id);
        if (materia) {
            await materia.destroy();
            res.redirect("/materias");
        } else {
            res.status(404).send("Materia não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir materia");
    }
});

module.exports = router;