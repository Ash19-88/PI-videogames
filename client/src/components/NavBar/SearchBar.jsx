import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, setPage } from "../../redux/actions";
import style from "../NavBar/SearchBar.module.css";

export default function SearchBar() {
  let [name, setName] = useState(""); //it creates an empty local state

  const dispatch = useDispatch();


  function handleInput(e) {
    //every time sth its written
    e.preventDefault();
    setName(e.target.value); //to set the value with the input on the local state
    //console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var search = getVideogamesByName(name);
    dispatch(search);
    //here the client gets the info what is searching
    setName(""); //to clean the search
    dispatch(setPage(1))
  }

  return (
    <div className={style.searchBar}>
      <input
        className={style.search}
        type="search"
        placeholder="  E.g. 'The witcher'"
        onChange={(e) => handleInput(e)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} 
        value={name}
        name={name}
      />
      <button
        className={style.buttonSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}> <b> •SEARCH•</b> </button>
    </div>
  );
}
