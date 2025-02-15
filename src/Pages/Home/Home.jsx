import axios from "axios";
import { useState, useEffect } from "react";
import { Select } from "../../Components/Select/Select";
import { Animal } from "../Animal/Animal";

export function Home({ values, selected, setSelected }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((res) => setTimeout(res, 3000));
      try {
        const { data } = await axios.get("/animals.json");
        localStorage.setItem("savedAnimals", JSON.stringify(data));
        setDataLoaded(true);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (!dataLoaded) return null;

  return (
    <>
      <Select values={values} selected={selected} setSelected={setSelected} />
      <Animal selected={selected} values={values} />
    </>
  );
}
