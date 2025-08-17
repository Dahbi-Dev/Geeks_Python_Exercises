import React from "react";

export default function YearDisplay({ year }) {
    return (
        <p className="absolute top-10 left-10">
            <span className="text-5xl font-bolder me-1">
                {year}
            </span>
            <small>/Year</small>
        </p>
    );
}
