import React, { useState } from "react";
import style from "./paginado.module.css";

export default function Pagination({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const numberofPages = [];
  const [page, SetPage] = useState(1);
  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    numberofPages.push(i + 1);
  }

  return (
    <nav >
      <ul className={style.pages}>
        <li>
          <p
            className={style.buttonPage}
            onClick={() => {if (page > 1) paginado(page - 1); if (page > 1) SetPage(page - 1);}}> ⪻ </p>
        </li>
        {numberofPages &&
          numberofPages.map((n) => (
            <li key={n} className={style.page}>
              <p
                onClick={() => {paginado(n); SetPage(n);}}
                className={page  === n ? style.active : page === n + 1 || page === n - 1 ? style.side : style.inactive}>{n}</p>
            </li>
          ))}
          <li>
            <p className={style.buttonPage} onClick={() => {if(page < numberofPages.length) paginado(page + 1); if(page < numberofPages.length) SetPage(page + 1)}} >
            ⪼
            </p>
          </li>
      </ul>
    </nav>
  );
}

