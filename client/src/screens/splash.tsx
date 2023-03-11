import {SplashQuiz} from "../components/splashQuiz/splashQuiz";
import {FooterMode} from "../components/footerMode/footerMode";
import {getCookie, setCookie} from "typescript-cookie";
import {useState} from "react";


export const Splash = () => {
    const cookieScoreKey = "scoreSplash"
    const [scoreCookie, setScoreCookie] = useState<number>(parseInt(getCookie(cookieScoreKey)!!))

    const setScore = (score: number) => {
        setScoreCookie(score)
        setCookie(cookieScoreKey, score)
    }

    if (!scoreCookie === undefined) {
        setCookie(cookieScoreKey, 0)
    }

    return (
        <div>
            <SplashQuiz
                score={scoreCookie}
                setScore={setScore}
            />
            <FooterMode
                score={scoreCookie}
            />
        </div>
    );
}
