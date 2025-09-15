// src/store/watchlist.store.ts
import { create } from "zustand";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../services/watchlist.service";
import axios from "axios";

const url = import.meta.env.VITE_COINGECKO;
const apiKey = import.meta.env.VITE_APIKEY;

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price?: number;
}

interface WatchlistState {
  watchlist: string[];
  coins: Coin[];
  fetchWatchlistCoins: () => Promise<void>;
  addCoin: (coinId: string) => void;
  removeCoin: (coinId: string) => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: getWatchlist(),
  coins: [],

  fetchWatchlistCoins: async () => {
    const list = getWatchlist();
    if (list.length === 0) {
      set({ coins: [] });
      return;
    }
    const response = await axios.get(
      `${url}coins/markets?vs_currency=usd&ids=${list.join(",")}&x_cg_demo_api_key=${apiKey}`
    );
    set({ coins: response.data });
  },

  addCoin: (coinId: string) => {
    const list = addToWatchlist(coinId);
    set({ watchlist: list });
  },

  removeCoin: (coinId: string) => {
    const list = removeFromWatchlist(coinId);
    set({ watchlist: list });
  },
}));
