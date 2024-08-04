import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Animal } from "./Pages/Animal/Animal";

function App() {
  const [values] = useState(() => {
    const savedValues = JSON.parse(window.localStorage.getItem("savedAnimals"));
    return savedValues || [];
  });
  const [selected, setSelected] = useState("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              values={values}
              selected={selected}
              setSelected={setSelected}
            />
          }
        />
        <Route
          path="/animal/:name"
          element={<Animal selected={selected} values={values} />}
        />
      </Routes>
    </>
  );
}

export default App;
