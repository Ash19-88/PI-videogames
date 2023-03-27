import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import style from "../Home/Home.module.css";



export default function Home(){
    return(
        <div className={style.mainHome}>
            <NavBar />
            <Cards />
        </div>
    );
}
