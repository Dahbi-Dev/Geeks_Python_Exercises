import { useSelector } from 'react-redux'
import reactLogo from '../assets/react.svg'
export default function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src={reactLogo} className="h-8 w-8" alt="React Logo" />
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Logout
                            </button>
                        ) : (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
