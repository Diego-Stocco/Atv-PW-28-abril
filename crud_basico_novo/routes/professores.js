const express = require("express");
const router = express.Router();
const { Professor } = require("../models");

// Listar professores

router.get("/", async (req, res) => {
  const professores = await Professor.findAll();
  res.render("base", {
    title: "Professores",
    view: "professores/show",
    professores,
  });
});

// Adicionar Professor - formulário
router.get("/add", (req, res) => {
  res.render("base", {
    title: "Add Professor",
    view: "professores/add",
  });
});


// Adicionar Professor - no BD
router.post("/add", async (req, res) => { 
  await Professor.create(
    { 
      nome: req.body.nome, 
      numero: req.body.numero 
    }
  );
  res.redirect("/professores")
});

//editar Professor - formulário
router.get("/edit/:id", async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  res.render(
      "base", {
          title: "Editar Professor",
          view: "professores/edit",
          professor,
  });
});

//editar Professor - no BD
router.post("/edit/:id", async(req, res) =>{
  await Professor.update(
      {
        nome: req.body.nome,
        numero: req.body.numero 
      },
      { where:{id: req.params.id} }
  );
  res.redirect("/professores")
});

//excluir Professor
router.post("/delete/:id", async(req, res) =>{
  await Professor.destroy({where:{id: req.params.id}});
  res.redirect("/professores")
});

module.exports = router;