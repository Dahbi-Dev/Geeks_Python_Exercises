import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePicker({selected, setSelected}) {
    const [showPicker, setShowPicker] = useState(false);

    const nextDay = () => {
        const next = new Date(selected);
        next.setDate(next.getDate() + 1);
        setSelected(next);
    };
    const prevDay = () => {
        const prev = new Date(selected);
        prev.setDate(prev.getDate() - 1);
        setSelected(prev);
    };
    const handleDateClick = () => setShowPicker((prev) => !prev);
    const handleSelect = (date) => {
        if (date) setSelected(date);
        setShowPicker(false);
    };

    return (
        <div className="flex flex-col items-center space-y-4 ">
            <div className="flex items-center space-x-2">
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    onClick={prevDay}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                    onClick={handleDateClick}
                >
                    {selected.toLocaleDateString()}
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    onClick={nextDay}
                >
                    Next
                </button>
            </div>
            {showPicker && (
                <div className="mt-2 shadow-lg rounded border border-white p-2">
                    <DayPicker
                        animate
                        mode="single"
                        selected={selected}
                        onSelect={handleSelect}
                        classNames={{

                            
                        }}
                        footer={
                            selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                        }
                    />
                </div>
            )}
        </div>
    );
}
