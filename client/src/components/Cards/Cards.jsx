import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Cards/Cards";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import Pagination from "./Pagination";
import {
  filterByGenre,
  filterBySource,
  getGenres,
  getVideogames,
  orderByName,
  orderByRating,
  setPage,
} from "../../redux/actions";
import style from "./Cards.module.css";

export default function Cards() {
  /*requests to state redux ----> useSelector */
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const currentPage = useSelector((state) => state.currentPage);

  /* -- Pagination -- */
  // const [currentPage, setCurrentPage] = useState(1);  //instead I use a global state to set changes
  const [videogamesPerPage] = useState(15);
  const lastGameIndex = currentPage * videogamesPerPage;
  const firstGameIndex = lastGameIndex - videogamesPerPage;
  const currentGames = allVideogames.slice(firstGameIndex, lastGameIndex);

  /* -- empty states to renderize order -- */
  const [ order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const paginado = (currentPage) => {
    dispatch(setPage(currentPage));
  };

  /* -- handlers -- */
  const handlerFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    dispatch(setPage(1));
  };

  const handlerFilterSource = (e) => {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    dispatch(setPage(1))
  }

  const handlerOrderByName = (e) => {
    dispatch(orderByName(e.target.value));
    dispatch(setPage(1));
    setOrder(!order);
  };

  const handlerOrderByRating = (e) => {
    dispatch(orderByRating(e.target.value));
    dispatch(setPage(1));
    setOrder(!order);
  };

  return (
    <div className={style.cards}>
      <div className={style.filtersContainer}>
      <select className={style.orderAlpha} onChange={handlerOrderByName}>
        <option className={style.option}>Sort by Alphabet</option>
        <option value="ASC">From A to Z</option>
        <option>From Z to A</option>
      </select>
      <select className={style.orderRating} onChange={handlerOrderByRating}>
        <option hidden className="option">
          Sort by Rating
        </option>
        <option value="MIN">Worst Rated</option>
        <option value="MAX">Best Rated</option>
      </select>
      <select
        className={style.optionGenre}
        onChange={(e) => handlerFilterByGenre(e)}
      >
        <option hidden value="All">
          {" "}
          Filter by Genre{" "}
        </option>
        {allGenres?.map((g) => (
          <option key={g.name} value={g.name}>
            {g.name[0].toUpperCase() + g.name.slice(1)}
          </option>
        ))}
      </select>
      <select className={style.optionGenre} onChange={(e) => handlerFilterSource(e)} >
        <option hidden value="All"> Filter By Source </option>
          <option value="DB"> Created </option>
          <option value='API'> From API </option>
      </select>
      </div>
      <br />
      
      <Pagination
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
        currentPage={currentPage}
        setPage={setPage}
      />
      <div className={style.cardBox}>
        {currentGames.length > 0 ? (
          currentGames.map((game) => {
            return (
              <Link
                key={game.id}
                to={`videogames/${game.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  rating={game.rating}
                  background_image={game.background_image}
                  genres={game.genres}
                />
              </Link>
            );
          })
        ) : (
              <span className={style.loader}></span>
        )}
      </div>
    </div>
  );
}
