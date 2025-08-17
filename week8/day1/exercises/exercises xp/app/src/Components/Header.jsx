// create a header component
// design using tailwindcss

import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Header = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-transparent border-b border-white/20 dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                    alt="logo"
                    className="w-10 h-10 rounded-full shadow-md"
                />
                <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
                    Geeks Institute
                </h1>
            </div>
            <button
                className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-800 font-semibold rounded-full text-base px-6 py-2 transition-all duration-200 shadow-md"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light Mode
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                        </svg>
                        Dark Mode
                    </>
                )}
            </button>
        </header>
    );
};

export default Header;