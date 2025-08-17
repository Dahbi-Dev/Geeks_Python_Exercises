import { useState } from "react";

export default function Component() {

    const [hasError, setHasError] = useState(false)

    if (hasError)
        throw new Error("I crashed");

    return (
        <div>
            <button onClick={
                () => setHasError(true)
            }>
                occur error!
            </button>
        </div>
    )
}
