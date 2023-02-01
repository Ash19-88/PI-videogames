const { allGenres } = require("./Functions")


const getGenres = async (req, res, next) => {
    try {
        let genres = await allGenres();
        genres.map((genre) => {
            return {
                name: genre.name,
            }
        });
        res.status(200).json(genres)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getGenres
}