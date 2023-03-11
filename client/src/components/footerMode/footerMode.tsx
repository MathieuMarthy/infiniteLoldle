import React from "react";

type FooterModeProps = {
    score: Number
}

export const FooterMode: React.FC<FooterModeProps> = (props) => {
    return (
        <div>
            <p className="flex justify-center fixed bottom-12 w-full">{`vous avez gagné ${props.score} partie${props.score > 1 ? "s": ""}`}</p>
        </div>
    );
}
