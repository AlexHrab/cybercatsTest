import React from "react";
import ReactDOM from "react-dom/client";
import AnimalAutocomplete from "./AnimalAutocomplete.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimalAutocomplete />
    </BrowserRouter>
  </React.StrictMode>
);
