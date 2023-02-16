import React from "react";

import "./menu.css";

export const Menu: React.FC = () => {
    const categories = [
        "splash",
        "ability"
    ];

    return (
        <div className="categories place-self-center flex mt-44">
            {categories.map(categorie =>
                <a className="categorie text-center" href="https://www.youtube.com/watch?v=yHoI0n2VxMU&t=1155s">
                    <h2>{categorie}</h2>
                </a>
            )}
        </div>
    );
}
