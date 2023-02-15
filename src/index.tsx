import React from "react";
import ReactDOM from "react-dom";

import Menu from "./Home/Menu";
import App from "./Home/App";


ReactDOM.render(
    <App />,
    document.getElementById("title")
);

ReactDOM.render(
    <Menu />,
    document.getElementById("menu")
);
