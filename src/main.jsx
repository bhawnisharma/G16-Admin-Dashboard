// Owner: Bhawni - app setup and routing wrapper

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AppState from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppState>
        <App />
      </AppState>
    </BrowserRouter>
  </React.StrictMode>
);
