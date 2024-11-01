import { ArrowUpDown } from "lucide-react";

export const SortHeader = ({ label, sortKey, className = "", onSort }) => (
	<th
		className={`px-2 py-3 text-left text-sm cursor-pointer group whitespace-nowrap ${className}`}
		onClick={() => onSort(sortKey)}>
		<div className="flex items-center gap-1">
			{label}
			<ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
		</div>
	</th>
);
