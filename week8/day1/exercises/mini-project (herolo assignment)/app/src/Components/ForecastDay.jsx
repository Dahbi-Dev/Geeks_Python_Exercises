import React from 'react'

export default function ForcastDay({forecastDay}) {
    const dateObj = new Date(forecastDay?.Date);

    const dayIndex = dateObj.getDay();
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
    const date = dateObj.toLocaleDateString('en-GB');
    const min = forecastDay?.Temperature.Minimum.Value;
    const max = forecastDay?.Temperature.Maximum.Value;
    const text = forecastDay?.Day.IconPhrase;

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center w-48">
            <div className="text-lg font-bold text-indigo-600 mb-1">{day}</div>
            <div className="text-sm text-gray-500 mb-2">{date}</div>
            <div className="text-xl font-semibold mb-1">
                {min}°C - {max}°C
            </div>
            <div className="text-md text-gray-700">{text}</div>
        </div>
    )
}
