import { NavLink } from "react-router"


export default function Header() {
    return (
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg ">
            <div className="container flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <span className="text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl shadow-md">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas" data-icon="rainbow"
                            className="svg-inline--fa fa-rainbow fa-w-18 fa-4x "
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" color="#7744a2"><path fill="currentColor" d="M268.3 32.7C115.4 42.9 0 176.9 0 330.2V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C64 186.8 180.9 80.3 317.5 97.9 430.4 112.4 512 214 512 327.8V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-165.3-140-298.6-307.7-287.3zm-5.6 96.9C166 142 96 229.1 96 326.7V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-74.8 64.5-134.8 140.8-127.4 66.5 6.5 115.2 66.2 115.2 133.1V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-114.2-100.2-205.4-217.3-190.4zm6.2 96.3c-45.6 8.9-76.9 51.5-76.9 97.9V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-17.6 14.3-32 32-32s32 14.4 32 32v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-59.2-53.8-106-115.1-94.1z"></path></svg>
                    </span>
                    <h1 className="text-white text-2xl font-semibold tracking-wide">Weather App</h1>
                </div>
                <nav className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className="text-gray-200 hover:text-blue-400 transition-colors duration-200 font-medium px-2 py-1 rounded"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className="text-gray-200 hover:text-blue-400 transition-colors duration-200 font-medium px-2 py-1 rounded"
                    >
                        Favorites
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
