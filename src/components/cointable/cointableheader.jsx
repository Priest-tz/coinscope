import { SortHeader } from "./sortheader";

export const CoinTableHeader = ({ onSort, theme }) => (
	<thead
		className={`${
			theme === "dark" ? "bg-gray-800" : "bg-gray-50"
		} sticky top-0 z-10`}>
		<tr>
			<SortHeader
				label="Name"
				sortKey="name"
				className="pl-3 py-4 text-base"
				onSort={onSort}
			/>
			<SortHeader
				label="Symbol"
				sortKey="symbol"
				className="hidden sm:table-cell py-4 text-base"
				onSort={onSort}
			/>
			<SortHeader
				label="Price"
				sortKey="price_usd"
				className="py-4 text-base"
				onSort={onSort}
			/>
			<SortHeader
				label="Market Cap"
				sortKey="market_cap_usd"
				className="pr-3 py-4 text-base"
				onSort={onSort}
			/>
			<SortHeader
				label="Rank"
				sortKey="rank"
				className="hidden lg:table-cell py-4 text-base"
				onSort={onSort}
			/>
			<th className="hidden lg:table-cell px-2 py-4 text-left text-base">
				Actions
			</th>
		</tr>
	</thead>
);
