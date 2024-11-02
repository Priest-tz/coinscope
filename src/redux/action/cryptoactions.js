import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCoins = createAsyncThunk(
	"crypto/fetchAllCoins",
	async ({ start = 0, limit = 100 }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`
			);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCoinById = createAsyncThunk(
	"crypto/fetchCoinById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://api.coinlore.net/api/ticker/?id=${id}`
			);
			return response.data[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
