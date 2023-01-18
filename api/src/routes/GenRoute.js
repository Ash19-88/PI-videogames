const { getGenres } = require("../controllers/GenController");
const router = require("express").Router();

router.get('/genres', getGenres);

module.exports = router;