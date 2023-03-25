import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get(`/videogames`);
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/videogames/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(`Error on action GET_DETAIL`, error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

/*-----> using fetch and then <-----*/
/*
export function getGenres(){
    return function(dispatch){
        return fetch('/genres')
        .then((response) => response.json())
        .then(json => dispatch({
            type: 'GET_GENRES',
            payload: json
        }))
    }
}
*/

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterBySource(payload) {
  return {
    type: "FILTER_BY_SOURCE",
    payload
  }
}

export const createVideogame = (payload) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(
        "/videogames",
        payload
      );
      return dispatch({
        type: "CREATE_VIDEOGAME",
        payload: data,
      });
    } catch (error) {}
  };
};

export function setPage(payload){
  return function (dispatch){
    return (dispatch)({
      type: "SET_PAGE",
      payload
    })
  }
}

export function cleanDetail() {
  return function (dispatch) {
    return (dispatch) ({
      type: "CLEAN_DETAIL",
      payload: []
    })
  }
}

export function cleanState() {
  return function (dispatch) {
    return (dispatch) ({
      type: "CLEAN_STATE",
      payload: []
    })
  }
}
