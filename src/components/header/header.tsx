import React from "react";
import "./header.css"
import "../../style.css"
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <header className="flex justify-center ">
            <NavLink to="/">
                <h1 className="text-center headerTitle">Infinite loldle</h1>
            </NavLink>
        </header>
    );
}
