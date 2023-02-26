import React from "react";

import data from "../../const.json";
import "./footer.css";


export const Footer: React.FC = () => {
    return (
        <footer>
            <a className="flex items-center p-2" href="https://twitter.com/KojhyyLeWeeb">
                <img className="twitter-icon" src={data["siteUrl"] + "/images/twitter.png"} alt="Twitter"/>
                <p className="ml-2">Twitter</p>
            </a>
            <a className="flex items-center p-2" href="https://github.com/MathieuMarthy/infiniteLoldle">
                <img className="twitter-icon" src={data["siteUrl"] + "/images/github.png"} alt="Github"/>
                <p className="ml-2">Github</p>
            </a>
        </footer>
    );
}
