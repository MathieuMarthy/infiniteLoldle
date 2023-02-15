import React, { FunctionComponent } from "react";
import "./app.css"
import fs from "fs";
import path from "path";

const BackgroundRandom = () => {
    // open the folder assets/backgrounds
    const files = fs.readdirSync(path.join(__dirname, "assets", "backgrounds"));

    // return the relative path of a random file
    return path.join("assets", "backgrounds", files[Math.floor(Math.random() * files.length)]);
}

const App: FunctionComponent = () => {
    return (
        <h1 className="text-3xl title mt-32">Infinite Loldle</h1>
    );
}

export default App;
