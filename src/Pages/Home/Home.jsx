import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Select } from "../../Components/Select/Select";
import { Animal } from "../Animal/Animal";

export function Home({ values, selected, setSelected }) {
  const [isLoading, setIsloading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    function getAnimals() {
      setTimeout(async () => {
        try {
          const result = await axios.get("/animals.json");
          window.localStorage.setItem(
            "savedAnimals",
            JSON.stringify(result.data)
          );
          setDataLoaded(true);
        } catch (error) {
          alert(error.message);
        } finally {
          setIsloading(false);
        }
      }, 3000);
    }
    getAnimals();
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && dataLoaded && (
        <Select values={values} selected={selected} setSelected={setSelected} />
      )}
      {!isLoading && dataLoaded && (
        <Animal selected={selected} values={values} />
      )}
    </>
  );
}
