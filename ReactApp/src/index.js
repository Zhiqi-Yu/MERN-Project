console.log("This is the index.js file for the React application. Test hot reloading!!!")
// alert("Welcome to the React Appl")
import React from "react";
import * as ReactDOM from "react-dom/client";
import Application from "./App/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Application />
);