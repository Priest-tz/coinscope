import { useState, useEffect } from "react";
export const Skeleton = () => {
	const [rowHeight, setRowHeight] = useState("64px");

	useEffect(() => {
		const calculateRowHeight = () => {
			const availableHeight = window.innerHeight - (64 + 64 + 48 + 56);
			const calculatedHeight = Math.floor(availableHeight / 10);
			const finalHeight = Math.max(calculatedHeight, 64);
			setRowHeight(`${finalHeight}px`);
		};

		calculateRowHeight();
		window.addEventListener("resize", calculateRowHeight);
		return () => window.removeEventListener("resize", calculateRowHeight);
	}, []);

	return (
		<div className="h-[calc(100vh-13rem)] space-y-4 overflow-hidden">
			{[...Array(10)].map((_, i) => (
				<div
					key={i}
					style={{ height: rowHeight }}
					className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
				/>
			))}
		</div>
	);
};
