import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun, Menu, X } from "lucide-react";
import { setSearchQuery } from "../redux/slice/cryptoslice";
import { toggleTheme, selectTheme } from "../redux/slice/themeslice";
import logo from "../assets/logo.svg";

const Navbar = () => {
	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);
	const { searchQuery } = useSelector((state) => state.crypto);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<nav
			className={`sticky top-0 z-50 w-full border-b ${
				theme === "dark"
					? "bg-gray-900 border-gray-800 text-white"
					: "bg-white border-gray-200 text-gray-800"
			}`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<div className="flex-shrink-0">
						<img
							src={logo}
							alt="Company Logo"
							className="h-10 w-auto"
						/>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-8 ml-8">
						<a
							href="#cryptocurrencies"
							className="hover:text-blue-500 transition-colors">
							Cryptocurrencies
						</a>
						<a
							href="#exchange"
							className="hover:text-blue-500 transition-colors">
							Exchange
						</a>
						<a
							href="#nft"
							className="hover:text-blue-500 transition-colors">
							NFT
						</a>
						<a
							href="#products"
							className="hover:text-blue-500 transition-colors">
							Products
						</a>
					</div>

					{/* Search Bar - Desktop */}
					<div className="hidden lg:flex flex-1 justify-center px-8">
						<input
							type="text"
							placeholder="Search coins..."
							value={searchQuery}
							onChange={(e) =>
								dispatch(setSearchQuery(e.target.value))
							}
							className={`px-4 py-2 rounded-lg border w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								theme === "dark"
									? "bg-gray-800 border-gray-700 text-white"
									: "bg-white border-gray-300 text-black"
							}`}
						/>
					</div>

					{/* Right Side Items - Desktop */}
					<div className="hidden lg:flex items-center space-x-4">
						<a
							href="#login"
							className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							Login
						</a>
						<a
							href="#signup"
							className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
							Sign Up
						</a>
						<button
							onClick={() => dispatch(toggleTheme())}
							className={`p-2 rounded-lg transition-colors ${
								theme === "dark"
									? "hover:bg-gray-700 text-yellow-300"
									: "hover:bg-gray-200 text-yellow-500"
							}`}
							aria-label="Toggle theme">
							{theme === "dark" ? (
								<Sun className="w-6 h-6" />
							) : (
								<Moon className="w-6 h-6" />
							)}
						</button>
					</div>

					{/* Theme Button - Mobile */}
					<div className="lg:hidden">
						<button
							onClick={() => dispatch(toggleTheme())}
							className={`p-2 rounded-lg transition-colors ${
								theme === "dark"
									? "hover:bg-gray-700 text-yellow-300"
									: "hover:bg-gray-200 text-yellow-500"
							}`}
							aria-label="Toggle theme">
							{theme === "dark" ? (
								<Sun className="w-6 h-6" />
							) : (
								<Moon className="w-6 h-6" />
							)}
						</button>
					</div>

					{/* Mobile Menu Button */}
					<div className="lg:hidden flex ">
						<button
							onClick={toggleMobileMenu}
							className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
							{isMobileMenuOpen ? (
								<X className="w-8 h-8" />
							) : (
								<Menu className="w-8 h-8" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu with Slide Down Animation */}
				{isMobileMenuOpen && (
					<div
						className={`lg:hidden fixed inset-x-0 top-20 transition-transform transform ${
							isMobileMenuOpen
								? "translate-y-0"
								: "-translate-y-full"
						} ${
							theme === "dark" ? "bg-gray-900" : "bg-white"
						} shadow-lg`}>
						{/* Mobile Navigation Links */}
						<div className="p-4 space-y-4">
							<a
								href="#cryptocurrencies"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
								Cryptocurrencies
							</a>
							<a
								href="#exchange"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
								Exchange
							</a>
							<a
								href="#nft"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
								NFT
							</a>
							<a
								href="#products"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
								Products
							</a>
							<div className="flex flex-col items-center space-y-3 mt-4">
								<a
									href="#login"
									className="block w-full px-4 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
									Login
								</a>
								<a
									href="#signup"
									className="block w-full px-4 py-2 text-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
									Sign Up
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
