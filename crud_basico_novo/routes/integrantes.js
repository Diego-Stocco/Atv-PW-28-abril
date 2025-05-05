const express = require('express');
const router = express.Router();

//Rota principal
router.get("/", (req, res) => {
    res.render("base",{
        title: "Integrantes",
        view: "integrantes/show",
    });
});

module.exports = router;