import React from "react";
import {Routes, Route} from "react-router-dom";
import {Header} from "./components/header/header";

import {Home} from "./screens/home";
import {Splash} from "./screens/splash"
import {Footer} from "./components/footer/footer";


function App() {
    return (
        <div className="main">
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/splash" element={<Splash/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
