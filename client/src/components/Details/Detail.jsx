import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../redux/actions";
import style from "../Details/Detail.module.css";
import videogames from "../../images/videogames.png";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail())
    }
  }, [dispatch, id]);

  const shownVg = useSelector((state) => state.detail);
  console.log(shownVg)

  return (
    <div className={style.detailContainer}>
    <div>
    <Link to="/home" className={style.btn} style={{ textDecoration: "none" }}>
      <p>Go Back</p>
      </Link>
    </div>
    {shownVg.length ? (
        shownVg.map((video) => {
          return (
            <div className={style.main}>
              <div className={style.left}>
                <div className={style.info}>
                  <h1 className={style.name}>{video.name || "name not found"}</h1>
                  <div className={style.more}>
                    <p className={style.rating}>⭐<b>{video.rating || "rating not found"}</b></p>
                    <p className={style.released}>📅<b>{video.released || "released not found"} </b></p>
                    <p className={style.genres}><b>{video.Genres?.map((g) => g.name).join(", ") || video.genres || "genres not found"} </b></p>
                  </div>
                  <div className={style.description}>{video.description.replace(/<[^>]+>/g, "") || "description not found"}
                  </div>
                  <div className={style.plataforms}>🎮<b> {video.platforms?.map((p) => p).join(", ") || "platforms not found"} </b> </div>
                </div>
              </div>
              <div className={style.right}>
                {video.background_image ? (
                  <img src={video.background_image || "image not found"} alt={`${video.name}`} width="275vh" className={style.image} />
                ) : <img alt="default" src={videogames} />}
              </div>
            </div>
          )
        })
      ) : (<span className={style.loader}></span>)}
    </div>
  )
};