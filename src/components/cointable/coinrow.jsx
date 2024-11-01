import { Info } from "lucide-react";
import { FaDollarSign, FaIndustry } from "react-icons/fa";

export const CoinRow = ({ coin, theme, onDetailsClick, className = "" }) => (
	<tr
		className={`border-t dark:border-gray-700 cursor-pointer ${
			theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"
		} ${className}`}
		onClick={() => onDetailsClick(coin)}>
		<td className="pl-3 py-4 text-base">
			<div className="flex items-center gap-2">
				<span className="font-medium">{coin.name}</span>
				<Info className="w-5 h-5 text-blue-500 lg:hidden" />
			</div>
		</td>
		<td className="hidden sm:table-cell px-2 py-4 text-base text-gray-500 dark:text-gray-400">
			{coin.symbol}
		</td>
		<td className="px-2 py-4 text-base">
			<div className="flex items-center gap-1 whitespace-nowrap">
				<FaDollarSign className="text-gray-400" />
				{parseFloat(coin.price_usd).toFixed(2)}
			</div>
		</td>
		<td className="pr-3 py-4 text-base">
			<div className="flex items-center gap-1">
				<FaIndustry className="text-gray-400" />
				<span className="whitespace-nowrap">
					{parseFloat(coin.market_cap_usd).toLocaleString(undefined, {
						notation: "compact",
						maximumFractionDigits: 2,
					})}
				</span>
			</div>
		</td>
		<td className="hidden lg:table-cell px-2 py-4 text-base">
			{coin.rank}
		</td>
		<td className="hidden lg:table-cell px-2 py-4 text-base">
			<button
				onClick={(e) => {
					e.stopPropagation();
					onDetailsClick(coin);
				}}
				className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
				Details
			</button>
		</td>
	</tr>
);
