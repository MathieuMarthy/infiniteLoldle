import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./screens/home";
import { Splash } from "./screens/splash"


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/splash" element={ <Splash/> }/>
            </Routes>
        </div>
    );
}

export default App;
