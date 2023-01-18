const router = require("express").Router();

const {
  getVideogame,
  getByID,
  newVideogame,
} = require("../controllers/VgControllers");

router.get("/videogames", getVideogame); //to obtain all videogames or by query name

router.get("/videogames/:id", getByID); //to obtain videogame by ID

router.post("/videogames", newVideogame); //to create a videogame

module.exports = router;
