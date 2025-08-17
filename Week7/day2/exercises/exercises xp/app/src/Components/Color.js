import { useEffect, useState } from "react";

export default function Color() {
    const [favoriteColor, setFavoriteColor] = useState("red");

    useEffect(() => {
        alert("UseEffect reached");
        setFavoriteColor("yellow");
    }, []);

    return <div>
        My favorite color is {favoriteColor}
        <button onClick={() => setFavoriteColor("blue")}>
            Change Color
        </button>
        </div>;
}
