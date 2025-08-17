import { useEffect, useState } from "react";
import ClockItem from "./ClockItem";

function ClockCircle({ totalItems, offset, activeIndex, itemLabel }) {
    const [totalTurns, setTotalTurns] = useState(0);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        if (activeIndex === 0) {
            setTotalTurns((prev) => prev + 1);
        }
    }, [activeIndex]);

    useEffect(() => {
        let newAngle;
        if (itemLabel === "week")
            newAngle = (90 / totalItems) * activeIndex + 90 * totalTurns;
        else newAngle = (360 / totalItems) * activeIndex + 360 * totalTurns;
        setAngle(newAngle);
    }, [activeIndex, totalItems, itemLabel, totalTurns]);

    const transformStyle = `rotate(-${angle}deg)`;

    function getItemLabel(index) {
        let labelIndex =
            itemLabel === "hour" ||
            itemLabel === "minute" ||
            itemLabel === "second"
                ? index
                : index + 1;
        let label = `${itemLabel} ${labelIndex.toString().padStart(2, "0")}`;
        return label;
    }

    return (
        <div
            className="clock-circle"
            style={{
                transform: transformStyle, // handles the rotation of the entire circle
                transition: "transform 1s ease-in-out",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
            }}
        >
            {[...Array(totalItems)].map((_, index) => (
                <ClockItem
                    index={index}
                    totalItems={totalItems}
                    offset={offset}
                    key={index}
                    activeIndex={activeIndex}
                    itemLabel={itemLabel}
                >
                    <span
                        className={`${
                            activeIndex === index
                                ? "text-white font-bold text-xl"
                                : "text-gray-400"
                        } transition-all duration-500 ease-in-out`}
                    >
                        {getItemLabel(index)}
                    </span>
                </ClockItem>
            ))}
        </div>
    );
}

export default ClockCircle;
