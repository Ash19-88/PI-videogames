import React from "react";
import style from "../Cards/Card.module.css";

export default function Card({name, background_image, genres, rating}){
    return(
        <div className={style.containerCard}>
            <img src={background_image} alt={`${name}`} className={style.img} width="300px" height="250px" />
            <div className={style.card}>
                <h3 className={style.title}>{name}</h3>
                <p className={style.genres}>{genres}</p>
                <p className={style.rating}>{rating}</p>
            <button className={style.more} ><span>more info...</span></button>
            </div>
        </div>
    )
}