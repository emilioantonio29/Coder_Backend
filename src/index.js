import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserGlobalProvider } from './context/UserGlobalContext';


ReactDOM.render(
    <UserGlobalProvider>
        <App />
    </UserGlobalProvider>
    , document.getElementById("root"));