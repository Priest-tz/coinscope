import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun, Menu, X } from "lucide-react";
import { setSearchQuery } from "../redux/slice/cryptoslice";
import { toggleTheme, selectTheme } from "../redux/slice/themeslice";

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
					? "bg-gray-900 border-gray-800"
					: "bg-white border-gray-200"
			}`}>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo*/}
					<div className="flex items-center">
						<h1 className="text-2xl font-bold">CoinScope</h1>
					</div>

					{/* Desktop Navigation Items */}
					<div className="hidden md:flex gap-4 items-center">
						<a
							href="#cryptocurrencies"
							className={`${
								theme === "dark" ? "text-white" : "text-black"
							}`}>
							Cryptocurrencies
						</a>
						<a
							href="#exchange"
							className={`${
								theme === "dark" ? "text-white" : "text-black"
							}`}>
							Exchange
						</a>
						<a
							href="#nft"
							className={`${
								theme === "dark" ? "text-white" : "text-black"
							}`}>
							NFT
						</a>
						<a
							href="#products"
							className={`${
								theme === "dark" ? "text-white" : "text-black"
							}`}>
							Products
						</a>
					</div>

					{/* Search Bar */}
					<div className="flex-1 mx-4 hidden md:block">
						<input
							type="text"
							placeholder="Search coins..."
							value={searchQuery}
							onChange={(e) =>
								dispatch(setSearchQuery(e.target.value))
							}
							className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
								theme === "dark"
									? "bg-gray-800 border-gray-700 text-white"
									: "bg-white border-gray-300 text-black"
							}`}
						/>
					</div>

					{/* Right Side Buttons: Theme Toggle */}
					<div className="flex items-center gap-4">
						{/* Theme Toggle */}
						<button
							onClick={() => dispatch(toggleTheme())}
							className={`p-3 rounded-lg transition-colors ${
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

						{/* Hamburger Menu for Mobile */}
						<button
							onClick={toggleMobileMenu}
							className="md:hidden p-2">
							{isMobileMenuOpen ? (
								<X className="w-6 h-6 text-gray-700" />
							) : (
								<Menu className="w-6 h-6 text-gray-700" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden flex flex-col gap-4 pt-4 pb-6 bg-gray-100 dark:bg-gray-900">
						<a
							href="#cryptocurrencies"
							className="text-gray-700 dark:text-white px-4">
							Cryptocurrencies
						</a>
						<a
							href="#exchange"
							className="text-gray-700 dark:text-white px-4">
							Exchange
						</a>
						<a
							href="#nft"
							className="text-gray-700 dark:text-white px-4">
							NFT
						</a>
						<a
							href="#products"
							className="text-gray-700 dark:text-white px-4">
							Products
						</a>
						{/* Login and Sign Up buttons moved inside mobile menu */}
						<a
							href="#login"
							className="text-gray-700 dark:text-white px-4">
							Login
						</a>
						<a
							href="#signup"
							className="px-4 py-2 rounded-lg bg-blue-500 text-white mx-4">
							Sign Up
						</a>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
