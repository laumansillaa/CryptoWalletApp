const passport = require('')
const { Router } = require('express');
const { User } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const postUser = require("./users/postUser");
const putUser = require("./users/putUser");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post("/createUser", postUser);
router.put("/users/:id", putUser);



module.exports = router;
