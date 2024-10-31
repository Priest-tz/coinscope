// CoinsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoins, fetchCoinById } from "../redux/action/cryptoactions";
import { setCurrentPage } from "../redux/slice/cryptoslice";
import Navbar from "./navbar";
import Modal from "./modal";
import { ArrowUpDown, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { FaDollarSign, FaIndustry } from "react-icons/fa";

const CoinsPage = () => {
	const dispatch = useDispatch();
	const { coins, status, searchQuery, currentPage, itemsPerPage } =
		useSelector((state) => state.crypto);
	const theme = useSelector((state) => state.theme.mode);
	const [selectedCoin, setSelectedCoin] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [sortConfig, setSortConfig] = useState({
		key: "rank",
		direction: "asc",
	});

	useEffect(() => {
		dispatch(fetchAllCoins({ start: 0, limit: 100 }));
	}, [dispatch]);

	const handleSort = (key) => {
		setSortConfig((current) => ({
			key,
			direction:
				current.key === key && current.direction === "asc"
					? "desc"
					: "asc",
		}));
	};

	const sortedAndFilteredCoins = React.useMemo(() => {
		let result = [...coins].filter(
			(coin) =>
				coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (sortConfig.key) {
			result.sort((a, b) => {
				if (
					sortConfig.key === "price_usd" ||
					sortConfig.key === "market_cap_usd"
				) {
					return sortConfig.direction === "asc"
						? parseFloat(a[sortConfig.key]) -
								parseFloat(b[sortConfig.key])
						: parseFloat(b[sortConfig.key]) -
								parseFloat(a[sortConfig.key]);
				}
				return sortConfig.direction === "asc"
					? a[sortConfig.key] > b[sortConfig.key]
						? 1
						: -1
					: b[sortConfig.key] > a[sortConfig.key]
					? 1
					: -1;
			});
		}

		return result;
	}, [coins, searchQuery, sortConfig]);

	const paginatedCoins = sortedAndFilteredCoins.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(sortedAndFilteredCoins.length / itemsPerPage);

	const handleCoinDetails = (coin) => {
		setSelectedCoin(coin);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const SortableHeader = ({ label, sortKey, className = "" }) => (
		<th
			className={`px-2 py-3 text-left text-sm cursor-pointer group whitespace-nowrap ${className}`}
			onClick={() => handleSort(sortKey)}>
			<div className="flex items-center gap-1">
				{label}
				<ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
			</div>
		</th>
	);

	return (
		<div
			className={`min-h-screen ${
				theme === "dark"
					? "bg-gray-900 text-white"
					: "bg-white text-black"
			}`}>
			<Navbar />

			<main className="container mx-auto px-2 sm:px-4 mt-6">
				{status === "loading" ? (
					<div className="space-y-4">
						{[...Array(10)].map((_, i) => (
							<div
								key={i}
								className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
							/>
						))}
					</div>
				) : (
					<div className="rounded-lg border dark:border-gray-700">
						<div className="overflow-x-auto">
							<table className="w-full border-collapse">
								<thead
									className={`${
										theme === "dark"
											? "bg-gray-800"
											: "bg-gray-50"
									}`}>
									<tr>
										{/* Always visible columns */}
										<SortableHeader
											label="Name"
											sortKey="name"
											className="pl-3"
										/>
										<SortableHeader
											label="Symbol"
											sortKey="symbol"
											className="hidden sm:table-cell"
										/>
										<SortableHeader
											label="Price"
											sortKey="price_usd"
										/>
										<SortableHeader
											label="Market Cap"
											sortKey="market_cap_usd"
											className="pr-3"
										/>
										{/* Additional columns for larger screens */}
										<SortableHeader
											label="Rank"
											sortKey="rank"
											className="hidden lg:table-cell"
										/>
										<th className="hidden lg:table-cell px-2 py-3 text-left text-sm">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{paginatedCoins.map((coin) => (
										<tr
											key={coin.id}
											onClick={() =>
												handleCoinDetails(coin)
											}
											className={`border-t dark:border-gray-700 cursor-pointer ${
												theme === "dark"
													? "hover:bg-gray-800"
													: "hover:bg-gray-50"
											}`}>
											{/* Always visible columns */}
											<td className="pl-3 py-3 text-sm">
												<div className="flex items-center gap-2">
													<span className="font-medium">
														{coin.name}
													</span>
													<Info className="w-4 h-4 text-blue-500 lg:hidden" />
												</div>
											</td>
											<td className="hidden sm:table-cell px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
												{coin.symbol}
											</td>
											<td className="px-2 py-3 text-sm">
												<div className="flex items-center gap-1 whitespace-nowrap">
													<FaDollarSign className="text-gray-400" />
													{parseFloat(
														coin.price_usd
													).toFixed(2)}
												</div>
											</td>
											<td className="pr-3 py-3 text-sm">
												<div className="flex items-center gap-1">
													<FaIndustry className="text-gray-400" />
													<span className="whitespace-nowrap">
														{parseFloat(
															coin.market_cap_usd
														).toLocaleString(
															undefined,
															{
																notation:
																	"compact",
																maximumFractionDigits: 2,
															}
														)}
													</span>
												</div>
											</td>
											{/* Additional columns for larger screens */}
											<td className="hidden lg:table-cell px-2 py-3 text-sm">
												{coin.rank}
											</td>
											<td className="hidden lg:table-cell px-2 py-3 text-sm">
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleCoinDetails(coin);
													}}
													className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
													Details
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Pagination */}
				<div className="flex justify-center items-center gap-1 mt-6 px-2">
					<button
						onClick={() =>
							dispatch(
								setCurrentPage(Math.max(1, currentPage - 1))
							)
						}
						disabled={currentPage === 1}
						className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700">
						<ChevronLeft className="w-4 h-4" />
					</button>

					{[...Array(totalPages)].map((_, i) => {
						//  limited page numbers on mobile
						if (window.innerWidth < 640) {
							if (
								i === 0 ||
								i === totalPages - 1 ||
								i === currentPage - 1
							) {
								return (
									<button
										key={i}
										onClick={() =>
											dispatch(setCurrentPage(i + 1))
										}
										className={`px-3 py-1 rounded-lg border dark:border-gray-700 text-sm ${
											currentPage === i + 1
												? "bg-blue-500 text-white"
												: "hover:bg-gray-100 dark:hover:bg-gray-700"
										}`}>
										{i + 1}
									</button>
								);
							}
							if (i === 1 || i === totalPages - 2) {
								return (
									<span key={i} className="px-1">
										...
									</span>
								);
							}
							return null;
						}

						// more page numbers on desktop
						if (
							i === 0 ||
							i === totalPages - 1 ||
							i === currentPage - 1 ||
							Math.abs(i - (currentPage - 1)) <= 1
						) {
							return (
								<button
									key={i}
									onClick={() =>
										dispatch(setCurrentPage(i + 1))
									}
									className={`px-3 py-1 rounded-lg border dark:border-gray-700 ${
										currentPage === i + 1
											? "bg-blue-500 text-white"
											: "hover:bg-gray-100 dark:hover:bg-gray-700"
									}`}>
									{i + 1}
								</button>
							);
						}
						if (i === 1 || i === totalPages - 2) {
							return (
								<span key={i} className="px-1">
									...
								</span>
							);
						}
						return null;
					})}

					<button
						onClick={() =>
							dispatch(
								setCurrentPage(
									Math.min(totalPages, currentPage + 1)
								)
							)
						}
						disabled={currentPage === totalPages}
						className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700">
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>

				<Modal
					isOpen={showModal}
					onClose={closeModal}
					coin={selectedCoin}
				/>
			</main>
		</div>
	);
};

export default CoinsPage;
