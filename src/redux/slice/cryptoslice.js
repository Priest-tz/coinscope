import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCoins, fetchCoinById } from "../action/cryptoactions";

const cryptoSlice = createSlice({
	name: "crypto",
	initialState: {
		coins: [],
		status: "idle",
		error: null,
		searchQuery: "",
		currentPage: 1,
		itemsPerPage: 10,
	},
	reducers: {
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch All Coins
			.addCase(fetchAllCoins.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllCoins.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.coins = action.payload;
				state.error = null;
			})
			.addCase(fetchAllCoins.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			// Fetch Specific Coin by ID
			.addCase(fetchCoinById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCoinById.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.coins = [action.payload];
				state.error = null;
			})
			.addCase(fetchCoinById.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { setSearchQuery, setCurrentPage } = cryptoSlice.actions;
export default cryptoSlice.reducer;
