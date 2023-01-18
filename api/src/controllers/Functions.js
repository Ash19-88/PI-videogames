const axios = require("axios");
const { Genre,  Videogame } = require("../db");
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
          platforms: vg.platforms.map((p) => p.platform.name).join(', '),
          genres: vg.genres?.map((g) => g.name).join(', '),
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
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
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
    const genres = api.data.results.map((genre) => genre.name);

    genres.forEach((g) =>
      Genre.findOrCreate({
        where: {
          name: g,
        },
      })
    );
    const searchGenres = await Genre.findAll();
    return searchGenres;
  } catch (error) {
    console.log(error);
  }
};

const allIds = async (id) => {
  let videoId;
    if(id.includes("-")){
        //search videogame by ID on Db
        try {
            videoId = await Videogame.findByPk(id,{
              include: [ {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
              }]
            })
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            const apiId = await axios.get(`http://api.rawg.io/api/games/${id}?key=${API_KEY}`);
           if(apiId){
            const detail = await apiId.data;
            // console.log(detail);
            videoId = {
                id: detail.id,
                name: detail.name,
                background_image: detail.background_image,
                description: detail.description,
                rating: detail.rating,
                released: detail.released,
                platforms: detail.platforms?.map((e) => e.platform.name).join(', '),
                genres: detail.genres?.map((e) => e.name).join(', '),
            };
            console.log(videoId)
            return videoId
           }else{
            return ("Videogame not found on API")
           }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
  getApiInfo,
  getApiInfo,
  getAllInfo,
  allGenres,
  allIds
};
