import React from "react";
import { NavLink } from "react-router-dom";

import "./menu.css";

export const Menu: React.FC = () => {
    const categories = [
        "splash",
        "ability"
    ];

    return (
        <div className="flex flex-col place-self-center items-center mt-44">
            {categories.map(categorie =>
                <NavLink className="categorie text-center" to={`/${categorie}`}>
                    <h2>{categorie}</h2>
                </NavLink>
            )}
        </div>
    );
}
