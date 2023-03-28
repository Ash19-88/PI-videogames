import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, cleanState, getDetail } from "../../redux/actions";
import style from "../Details/Detail.module.css";
import videogames from "../../images/videogames.png";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(cleanState());
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const shownVg = useSelector((state) => state.detail);


  return (
    <div className={style.detailContainer}>
    <div>
    <Link to="/home" className={style.btn} style={{ textDecoration: "none" }}>
      <p>Go Back</p>
      </Link>
    </div>
    {shownVg.length > 0 ? (
      <div className={style.main}>
        <div className={style.left}>
        <div className={style.info}>
        <h1 className={style.name}>{shownVg[0].name || "name not found"}</h1>
        <div className={style.more}>
        <p className={style.rating}>⭐<b>{shownVg[0].rating || "rating not found"}</b></p>
        <p className={style.released}>📅<b>{shownVg[0].released || "released not found"} </b></p>
        <p className={style.genres}><b>{shownVg[0].Genres?.map((g) => g.name).join(", ") ||shownVg[0].genres || "genres not found"} </b></p>
        </div>
        <div className={style.description}>{shownVg[0].description.replace(/<[^>]+>/g, "") || "description not found"} </div>
        <div className={style.plataforms}>🎮<b> {shownVg[0].platforms?.map((p) => p).join(", ") || "platforms not found"} </b> </div>
        </div>
        </div>
        <div className={style.right}>
          {shownVg[0].background_image ? (
        <img src={shownVg[0].background_image || "image not found"} alt={`${shownVg[0].name}`} width="275vh" className={style.image} />
          ): <img alt="default" src={videogames} />}
        </div>
      </div>
      ) : (<span className={style.loaderDetail}></span>)}
    </div>
  )
};
