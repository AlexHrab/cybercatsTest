import css from "./Animal.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

export function Animal({ selected, values }) {
  const [animal, setAnimal] = useState(null);
  const location = useLocation();
  const thisLocation = location.pathname === "/" ? true : false;

  const container = clsx(css.container, !thisLocation && css.animalContainer);
  const innerContainer = clsx(
    css.innerContainer,
    !thisLocation && css.animalInnerContainer
  );

  useEffect(() => {
    const foundAnimal = values.find((el) => el.name === selected);
    setAnimal(foundAnimal);
  }, [selected, values]);

  return (
    <>
      {animal ? (
        <div className={container}>
          <div className={innerContainer}>
            <Link
              to={thisLocation ? `/animal/${selected}` : `/`}
              className={css.button}
            >
              {thisLocation ? "Info" : "Back"}
            </Link>

            <img className={css.image} src={animal.avatar} alt={animal.name} />
            <h2 className={css.text}>{animal.name}</h2>
          </div>
          {!thisLocation && (
            <p className={css.description}>{animal.description}</p>
          )}
        </div>
      ) : (
        <p className={css.title}>No animal selected</p>
      )}
    </>
  );
}
