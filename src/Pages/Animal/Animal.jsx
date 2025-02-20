import css from "./Animal.module.css";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import clsx from "clsx";

export function Animal({ selected, values }) {
  const location = useLocation();
  const thisLocation = location.pathname === "/";

  const container = clsx(css.container, !thisLocation && css.animalContainer);
  const innerContainer = clsx(
    css.innerContainer,
    !thisLocation && css.animalInnerContainer
  );

  const animal = useMemo(
    () => values.find((el) => el.name === selected) || null,
    [selected, values]
  );

  if (!animal) return <p className={css.title}>No animal selected</p>;

  return (
    <div className={container}>
      <div className={innerContainer}>
        <Link to={thisLocation ? `/${selected}` : `/`} className={css.button}>
          {thisLocation ? "Info" : "Back"}
        </Link>

        <img className={css.image} src={animal.avatar} alt={animal.name} />
        <h2 className={css.text}>{animal.name}</h2>
      </div>

      {!thisLocation && <p className={css.description}>{animal.description}</p>}
    </div>
  );
}
