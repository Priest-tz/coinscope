import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoins } from "../redux/action/cryptoactions";
import { setCurrentPage } from "../redux/slice/cryptoslice";
import { CoinTable } from "../components/cointable/cointable";
import { Pagination } from "../components/pagination/pagination";
import { Skeleton } from "../components/skeleton";
import Navbar from "../components/navbar";
import Modal from "../components/modal";

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

	return (
		<div
			className={`min-h-screen flex flex-col ${
				theme === "dark"
					? "bg-gray-900 text-white"
					: "bg-white text-black"
			}`}>
			<Navbar />

			<main className="flex-1 container mx-auto px-2 sm:px-4 py-6 flex flex-col">
				<div className="flex-1 flex flex-col min-h-0">
					{status === "loading" ? (
						<Skeleton />
					) : (
						<CoinTable
							coins={paginatedCoins}
							theme={theme}
							onSort={handleSort}
							onCoinDetails={handleCoinDetails}
						/>
					)}

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => dispatch(setCurrentPage(page))}
					/>
				</div>

				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					coin={selectedCoin}
				/>
			</main>
		</div>
	);
};

export default CoinsPage;
