import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, coin }) => {
	if (!isOpen || !coin) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl z-10 w-11/12 max-w-md">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
					<X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
				</button>

				<div className="space-y-4">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							{coin.name}
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							Symbol: {coin.symbol}
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-300">
								Price
							</p>
							<p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
								${parseFloat(coin.price_usd).toFixed(2)}
							</p>
						</div>
						<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-300">
								Market Cap
							</p>
							<p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
								$
								{parseFloat(
									coin.market_cap_usd
								).toLocaleString()}
							</p>
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100">
							Additional Information
						</h3>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<p className="text-gray-600 dark:text-gray-300">
								Rank
							</p>
							<p className="text-gray-900 dark:text-gray-100">
								{coin.rank}
							</p>
							<p className="text-gray-600 dark:text-gray-300">
								24h Volume
							</p>
							<p className="text-gray-900 dark:text-gray-100">
								${parseFloat(coin.volume24).toLocaleString()}
							</p>
							<p className="text-gray-600 dark:text-gray-300">
								Available Supply
							</p>
							<p className="text-gray-900 dark:text-gray-100">
								{parseFloat(coin.csupply).toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
