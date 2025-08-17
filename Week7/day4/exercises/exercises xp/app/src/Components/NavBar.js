import logo from "../logo.svg";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block size-6" src={logo} />
                            <svg
                                className="hidden size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/shop"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }
                                >
                                    Shop
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
