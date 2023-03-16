const axios = require("axios");
const { Genre, Videogame } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

//Functions to use on controllers

//To bring data from the API

const getApiInfo = async () => {
  try {
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let apiInfo = []; //an empty array to save the result  of the answer
    //each page has 20vg so I create a forloop,
    //to go over each page 5 times to bring me 100 vg.
    for (let i = 0; i < 5; i++) {
      const answer = await axios.get(apiUrl); //making the call
      answer.data.results.map((vg) => {
        apiInfo.push({
          id: vg.id,
          background_image: vg.background_image,
          name: vg.name,
          rating: vg.rating,
          released: vg.released,
          platforms: vg.platforms.map((p) => p.platform.name).join(", "),
          genres: vg.genres?.map((g) => g.name).join(", "),
        });
      });
      apiUrl = answer.data.next; //check if this line is neccessary to continue,
      //it goes to the next page, trying commmenting it.
    }
    return apiInfo;
  } catch (error) {
    console.log(error);
  }
};

//To save genres on Db
const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: [{
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }]
    });
  } catch (error) {
    console.log(error);
  }
};

//To concatenate all the data
const getAllInfo = async () => {
  try {
    const fromApi = await getApiInfo();
    const fromDb = await getDbInfo();
    const allInfo = fromApi.concat(fromDb);

    return allInfo;
  } catch (error) {
    console.log(error);
  }
};

//to save genres on Db
const allGenres = async () => {
  try {
    const api = await axios.get(`http://api.rawg.io/api/genres?key=${API_KEY}`);
    //To bring genres from the api
    const genres = await api.data.results.map((genre) => genre.name);

    genres.map((g) =>
      Genre.findOrCreate({
        where: {
          name: g,
        },
      })
    );
    
    return Genre.findAll();
  } catch (error) {
    console.log(error);
  }
};

const allIds = async (id) => {

  if (isNaN(id)) {
    try {
      const vgFromDb = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
      })
      return [vgFromDb];
    } catch (error) {
      console.log(error, "Error searching vg on Db");
    }
    // id = parseInt(id);
  } else {
    /*  Searching by ID on API */

    try {
      const vgAPI = await axios.get(
        `http://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      vgApiobj = {
        id: vgAPI.data.id,
        background_image: vgAPI.data.background_image,
        name: vgAPI.data.name,
        rating: vgAPI.data.rating,
        description: vgAPI.data.description,
        released: vgAPI.data.released,
        platforms: vgAPI.data.platforms.map((p) => p.platform.name),
        genres: vgAPI.data.genres?.map((g) => g.name).join(", ").toString(),
      };
      return [vgApiobj];
    } catch (error) {
      console.log(error, "Error searching on API");
    }
  }
};

module.exports = {
  getApiInfo,
  getApiInfo,
  getAllInfo,
  allGenres,
  allIds,
};
