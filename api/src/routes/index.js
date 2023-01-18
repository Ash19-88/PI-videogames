const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const videogameRouter = require('./VgRoute.js');
const genreRouter = require('./GenRoute.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', videogameRouter);
router.use('/', genreRouter);

module.exports = router;
