import { useState } from "react";

import { FaBrain, FaBars, FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";

const Header: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleMenu = () => setOpen(!open);

    return (

        <header className="fixed top-0 w-full bg-white bg-opacity-95 backdrop-blur-sm border-b z-50">

            <div className="container mx-auto px-4 flex items-center justify-between h-16">

                {/* Logo */}

                <div className="flex items-center gap-2">

                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">

                        <FaBrain className="w-6 h-6 text-white" />

                    </div>

                    <span className="text-xl font-bold">CareerBoost AI</span>

                </div>

                {/* Desktop Nav */}

                <nav className="hidden md:flex">

                    <ul className="flex gap-8">

                        <li>

                            <Link

                                to="/features"

                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >

                                Features

                            </Link>

                        </li>

                        <li>

                            <Link

                                to="/how-it-works"

                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >

                                How It Works

                            </Link>

                        </li>

                        <li>

                            <Link

                                to="/pricing"

                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >

                                Pricing

                            </Link>

                        </li>

                        <li>

                            <Link

                                to="/faq"

                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >

                                FAQ

                            </Link>

                        </li>

                    </ul>

                </nav>

                {/* Desktop CTA */}

                <div className="hidden md:flex gap-4">

                    <Link

                        to="/signin"

                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        Sign In

                    </Link>

                    <Link

                        to="/get-started"

                        className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-transform hover:scale-105"
                    >

                        Get Started

                    </Link>

                </div>

                {/* Mobile Toggle */}

                <button

                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"

                    onClick={toggleMenu}
                >

                    {
                        open ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />
                    }

                </button>

            </div>

            {/* Mobile Nav */}

            {

                open && (

                    <div className="md:hidden py-4 border-t">

                        <ul className="flex flex-col gap-3 px-3">

                            <li>

                                <Link

                                    to="/features"

                                    className="text-gray-600 hover:text-blue-600 font-medium"

                                    onClick={toggleMenu}
                                >

                                    Features

                                </Link>

                            </li>

                            <li>

                                <Link

                                    to="/how-it-works"

                                    className="text-gray-600 hover:text-blue-600 font-medium"

                                    onClick={toggleMenu}
                                >

                                    How It Works

                                </Link>

                            </li>

                            <li>

                                <Link

                                    to="/pricing"

                                    className="text-gray-600 hover:text-blue-600 font-medium"

                                    onClick={toggleMenu}
                                >

                                    Pricing

                                </Link>

                            </li>

                            <li>

                                <Link

                                    to="/faq"

                                    className="text-gray-600 hover:text-blue-600 font-medium"

                                    onClick={toggleMenu}
                                >

                                    FAQ

                                </Link>

                            </li>

                            <li>

                                <Link

                                    to="/signin"

                                    className="text-gray-600 hover:text-blue-600 font-medium"

                                    onClick={toggleMenu}
                                >

                                    Sign In

                                </Link>

                            </li>

                            <li>

                                <Link

                                    to="/get-started"

                                    className="block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-center"

                                    onClick={toggleMenu}
                                >

                                    Get Started

                                </Link>

                            </li>

                        </ul>

                    </div>
                )
            }
            
        </header>
    );
};

export default Header;