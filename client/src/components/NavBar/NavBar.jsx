import React from "react";
import SearchBar from "../NavBar/SearchBar";
import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";

export default function NavBar(){

    const path = window.location.pathname;
    const pathSearch = "/home";
    const dispatch = useDispatch();

    const handleRefresh = (e) => {
        dispatch(getVideogames());
    }

    return(
        <nav className={style.nav}>
            <div className={style.h}>
                <h1 className={style.videogames}>VIDEOGAMES</h1>
            </div>
            <div className={style.btns}>
                <Link to="/">
                    <button className={style.btnNav}> WELCOME PAGE</button>
                </Link>
                <Link  to="/create">
                    <button className={style.btnNav}>
                        CREATE
                    </button>
                </Link>
                <button className={style.btnNav} onClick={e => handleRefresh(e)}>REFRESH</button>
            <div className={style.search}>
                {path === pathSearch ? <SearchBar/> : null}
            </div>
            </div>
        </nav>
    )
}