import React, { useEffect, useState } from "react";
import { CoinTableHeader } from "./cointableheader";
import { CoinRow } from "./coinrow";

export const CoinTable = ({ coins, theme, onSort, onCoinDetails }) => {
	const [rowHeight, setRowHeight] = useState("");

	useEffect(() => {
		const calculateRowHeight = () => {
			// Get available height (viewport height - navbar - pagination - padding - header)
			const availableHeight = window.innerHeight - (64 + 64 + 48 + 56);
			// Calculate row height based on 10 items per page
			const calculatedHeight = Math.floor(availableHeight / 10);
			// Set minimum height to prevent too small rows
			const finalHeight = Math.max(calculatedHeight, 64);
			setRowHeight(`${finalHeight}px`);
		};

		calculateRowHeight();
		window.addEventListener("resize", calculateRowHeight);
		return () => window.removeEventListener("resize", calculateRowHeight);
	}, []);

	return (
		<div className="h-[calc(100vh-13rem)] flex flex-col rounded-lg border dark:border-gray-700">
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-hidden">
					<table className="w-full border-collapse">
						<CoinTableHeader onSort={onSort} theme={theme} />
						<tbody>
							{coins.map((coin) => (
								<CoinRow
									key={coin.id}
									coin={coin}
									theme={theme}
									onDetailsClick={onCoinDetails}
									className={`h-[${rowHeight}]`}
								/>
							))}
							{/* Add empty rows to ensure consistent height */}
							{coins.length < 10 &&
								[...Array(10 - coins.length)].map((_, i) => (
									<tr
										key={`empty-${i}`}
										style={{ height: rowHeight }}>
										<td
											colSpan="6"
											className="border-t dark:border-gray-700"></td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
