import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Animal } from "./Pages/Animal/Animal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="animal/:name" element={<Animal />} />
      </Routes>
    </>
  );
}

export default App;
