import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import {AuthContextProvider} from "./context/authContext.js";
import {DarkModeContextProvider} from "./context/darkModeContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App/>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);