import React from 'react';
import ForcastDay from './ForecastDay';

export default function WeatherCard({ weatherData, city, forecastData }) {
    // weatherData is expected to be an array with one object
    if (!weatherData || !Array.isArray(weatherData) || weatherData.length === 0) {
        return null;
    }

    const data = weatherData[0];

    // Dummy cityInfo and forecastData for demonstration if not provided
    // In your real app, pass these as props from parent or fetch them
    const cityName = city?.LocalizedName || "";
    const country = city?.Country.LocalizedName || "";

    // Format date
    const dateObj = new Date(data.LocalObservationDateTime);
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const dayName = days[dateObj.getDay()];
    const dateStr = dateObj.toLocaleDateString('en-GB');

    return (
        <div
            className="mx-auto my-8 p-8 rounded-lg shadow-lg border border-gray-400 bg-white max-w-6xl"
            style={{ minHeight: 350 }}
        >
            {/* Top section */}
            <div className="flex items-center justify-between mb-8">
                {/* Weather icon */}
                <div className="flex flex-col items-center w-1/6">
                    {/* Replace with real icon if available */}
                    <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="5" fill="#444" />
                        <g stroke="#444" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="4" />
                            <line x1="12" y1="20" x2="12" y2="23" />
                            <line x1="1" y1="12" x2="4" y2="12" />
                            <line x1="20" y1="12" x2="23" y2="12" />
                            <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
                            <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
                            <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
                            <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
                        </g>
                    </svg>
                </div>
                {/* Center info */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-xl font-semibold">{dayName}</div>
                    <div className="text-md mb-2">{dateStr}</div>
                    <div className="text-2xl font-bold text-indigo-600">{cityName},</div>
                    <div className="text-md font-semibold text-gray-700">{country}</div>
                </div>
                {/* Weather summary */}
                <div className="flex flex-col items-center w-1/4">
                    <div className="text-2xl font-bold mb-2">{data.WeatherText}</div>
                    <div className="text-4xl font-extrabold text-gray-700">
                        {data.Temperature.Metric.Value}°C
                    </div>
                </div>
                {/* Heart icon */}
                <div className="w-1/12 flex justify-end">
                    <svg width="36" height="36" fill="none" stroke="#444" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21s-6.5-5.5-9-9.5C.5 8.5 2.5 5 6 5c2 0 3.5 1.5 4 2.5C10.5 6.5 12 5 14 5c3.5 0 5.5 3.5 3 6.5-2.5 4-9 9.5-9 9.5z" />
                    </svg>
                </div>
            </div>
            {/* Forecast cards */}
            <div className="flex gap-4 justify-center">
                {forecastData.map((f, i) => (
                    <ForcastDay forecastDay={f} key={i} />
                    
                ))}
            </div>
        </div>
    );
}

