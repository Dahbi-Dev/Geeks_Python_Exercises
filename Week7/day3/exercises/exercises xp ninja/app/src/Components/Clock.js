import React, { useEffect } from "react";
import { monthNames } from "../utils";
import YearDisplay from "./YearDisplay";
import MonthDisplay from "./MonthDisplay";
import ClockCircle from "./ClockCircle";

export default function Clock() {
    const todaysDate = new Date();

    const [currentTime, setCurrentTime] = React.useState({
        year: todaysDate.getFullYear(),
        month: todaysDate.getMonth() + 1,
        week: Math.ceil(todaysDate.getDate() / 7),
        day: todaysDate.getDate(),
        hour: todaysDate.getHours(),
        minute: todaysDate.getMinutes(),
        second: todaysDate.getSeconds(),
    });

    const totalMonths = 12;
    const totalDaysInMonth = new Date(
        currentTime.year,
        currentTime.month,
        0
    ).getDate();
    const totalWeeksInMonth = Math.ceil(totalDaysInMonth / 7);
    const totalHours = 24;
    const totalMinutes = 60;
    const totalSeconds = 60;

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime({
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                week: Math.floor(now.getDate() / 7), // 
                day: now.getDate(),
                hour: now.getHours(), // 0 - 23
                minute: now.getMinutes(), // 0 - 59
                second: now.getSeconds(), // 0 - 59
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-screen bg-[#282c34] text-white flex justify-center items-center h-screen text-2xl overflow-hidden">
            {/* year display */}
            <YearDisplay year={currentTime.year} />

            {/* month name display */}
            <MonthDisplay month={monthNames[currentTime.month - 1]} />

            {/* main clock */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
                {/* months */}
                <ClockCircle
                    totalItems={totalMonths}
                    activeIndex={currentTime.month - 1}
                    offset={2.2}
                    itemLabel="month"
                />

                {/* weeks */}
                <ClockCircle
                    totalItems={totalWeeksInMonth}
                    activeIndex={currentTime.week}
                    offset={9}
                    itemLabel="week"
                />

                {/* days */}
                <ClockCircle
                    totalItems={totalDaysInMonth}
                    activeIndex={currentTime.day - 1}
                    offset={15}
                    itemLabel="day"
                />

                {/* hours */}
                <ClockCircle
                    totalItems={totalHours}
                    activeIndex={currentTime.hour}
                    offset={20}
                    itemLabel="hour"
                />

                {/* minutes */}
                <ClockCircle
                    totalItems={totalMinutes}
                    activeIndex={currentTime.minute}
                    offset={25.7}
                    itemLabel="minute"
                />

                {/* seconds */}
                <ClockCircle
                    totalItems={totalSeconds}
                    activeIndex={currentTime.second}
                    offset={33}
                    itemLabel="second"
                />
            </div>
        </div>
    );
}
