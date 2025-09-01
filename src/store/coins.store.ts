// src/store/coinsStore.ts
import { create } from "zustand";
import { getCoinsList } from "../services/coins.service";

interface Coin {
    id: string;
    symbol: string;
    name: string;
}

interface CoinsState {
    coins: Coin[];
    loading: boolean;
    error: string | null;
    fetchCoins: () => Promise<void>;
}

export const useCoinsStore = create<CoinsState>((set) => ({
    coins: [],
    loading: false,
    error: null,

    fetchCoins: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getCoinsList();

            if ("success" in data && !data.success) {
                set({
                    coins: [],
                    error:
                        data.error?.status?.error_message ||
                        "Failed to fetch coins",
                });
            } else {
                set({ coins: data, error: null });
            }
        } catch (err: any) {
            set({ coins: [], error: err.message || "Unexpected error" });
        } finally {
            set({ loading: false });
        }
    },
}));
