const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
  currentPage: 1,
  isLoading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        isLoading: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "ORDER_BY_NAME":     //If it's an ascendant value, sort compares them
      const videogamesOrdered =
        action.payload === "ASC" //and places them to the rigth or left depending on whether they're larger or shorter
          ? state.allVideogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0; //if they're equals it doesn't change
            })
          : state.allVideogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: videogamesOrdered,
      };
      case "ORDER_BY_RATING":
        const orderedRating = action.payload === 'MIN' ?
        state.allVideogames.sort((a,b) => {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0;
        })
        : state.allVideogames.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0;
        });
        return {
          ...state,
          videogames: orderedRating,
        };
        case "FILTER_BY_GENRE":
          let games = action.payload
          state.videogames = state.allVideogames.filter(vg => vg.genres?.includes(games))
          if(action.payload === "All") state.videogames = state.allVideogames
          if(state.videogames.length === 0) {
            alert("Sorry, it seems that we didn't found videogames from that genre")
            state.videogames = state.allVideogames
          }
          return {
            ...state,
            videogames: state.videogames
          };
      case "FILTER_BY_SOURCE":
        const allGames = state.allVideogames
        const sourceFilter = action.payload === 'DB' ? allGames.filter(fromDataBase => fromDataBase.createdInDb)
        : allGames.filter(not => !not.createdInDb)
        return {
          ...state,
          videogames: action.payload === 'All' ? allGames: sourceFilter
        };
      case "CREATE_VIDEOGAME":
        return{
          ...state,
          allVideogames: action.payload
        };
      case "SET_PAGE":
        return {
          ...state,
          currentPage: action.payload
        };
    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: action.payload
      };
    case "CLEAN_STATE":
        return{
          ...state,
          videogames: action.payload
        }
      default:
      return { ...state };
  }
}

export default rootReducer;