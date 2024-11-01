import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationButton } from "./paginationbutton";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const renderPageNumbers = () => {
		return [...Array(totalPages)].map((_, i) => {
			// Show limited page numbers on mobile
			if (window.innerWidth < 640) {
				if (i === 0 || i === totalPages - 1 || i === currentPage - 1) {
					return (
						<PaginationButton
							key={i}
							onClick={() => onPageChange(i + 1)}
							className={`px-3 py-1 text-sm ${
								currentPage === i + 1
									? "bg-blue-500 text-white"
									: ""
							}`}>
							{i + 1}
						</PaginationButton>
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

			// Show more page numbers on desktop
			if (
				i === 0 ||
				i === totalPages - 1 ||
				i === currentPage - 1 ||
				Math.abs(i - (currentPage - 1)) <= 1
			) {
				return (
					<PaginationButton
						key={i}
						onClick={() => onPageChange(i + 1)}
						className={`px-3 py-1 ${
							currentPage === i + 1
								? "bg-blue-500 text-white"
								: ""
						}`}>
						{i + 1}
					</PaginationButton>
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
		});
	};

	return (
		<div className="flex justify-center items-center gap-1 mt-6 px-2">
			<PaginationButton
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}>
				<ChevronLeft className="w-4 h-4" />
			</PaginationButton>

			{renderPageNumbers()}

			<PaginationButton
				onClick={() =>
					onPageChange(Math.min(totalPages, currentPage + 1))
				}
				disabled={currentPage === totalPages}>
				<ChevronRight className="w-4 h-4" />
			</PaginationButton>
		</div>
	);
};

