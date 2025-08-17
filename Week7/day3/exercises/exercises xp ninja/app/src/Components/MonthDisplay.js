import React from "react";

export default function MonthDisplay({ month }) {
    return (
            <p className="absolute bottom-10 right-10">
                <span className="text-5xl font-bolder me-1">
                    {month}
                </span>
            </p>

    );
}
