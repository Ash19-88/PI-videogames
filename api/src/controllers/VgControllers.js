const { getAllInfo, allIds } = require("../controllers/Functions");
const { Genre, Videogame } = require("../db");

//To obtain all videogames or only one by title passed by query
const getVideogame = async (req, res, next) => {
  try {
    const { name } = req.query;
    let totalVideogames = await getAllInfo();

    if (name) {
      let vgName = totalVideogames.filter((vg) =>
        vg.name.toLowerCase().includes(name.toLowerCase())
      );

      vgName.length
        ? res.status(200).send(vgName.slice(0, 15))
        : res.status(400).send("Videogame not found");
    } else {
      res.status(200).send(totalVideogames);
    }
  } catch (error) {
    next(error);
  }
};

//To obtain videogame by ID (ex => /videogame/:id)
const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const totalIds = await allIds(id);
     res.json(totalIds)
  } catch (error) {
    res.status(500).send("Videogame not found by getById")
  }
};

//To post a new videogame
const newVideogame = async (req, res, next) => {
  const {name, background_image, rating, released, genres, platforms, description, createdInDb} = req.body;
  try {
       if(name){
        const allVideogames = await getAllInfo();
        const vgFound = allVideogames.find((v) => v.name.toLowerCase() === name.toLowerCase());
        if(!vgFound) {
            const newVg = await Videogame.create({
                name,
                background_image,
                rating,
                released,
                platforms : (Object.values(platforms)),
                genres,
                description,
                createdInDb
            })
            const dbGenre = await Genre.findAll({
                where: {name: genres},
            })
            await newVg.addGenre(dbGenre)
             return res.status(200).json(newVg)
        }
        res.status(404).send("A videogame with this name already exists");
       }
       if(!name) return res.status(404).send("A name is required to create a videogame")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogame,
    getByID,
    newVideogame
}