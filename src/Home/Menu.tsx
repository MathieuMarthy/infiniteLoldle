import React, { FunctionComponent } from "react";
import "./menu.css";

const Menu: FunctionComponent = () => {
    const categories = [
        "splash",
        "ability"
    ];

    return (
        <div className="grid grid-cols-1 gap-2 mt-40">
            {categories.map((categorie) => (
                <div className="categorie">
                    <p>{categorie}</p>
                </div>
            ))}
        </div>
    );
}

export default Menu;
