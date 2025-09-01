import { create } from "zustand";
import {
    type ExchangeRate,
    getExchangeRates,
} from "../services/exchange.service";

interface ExchangeRatesState {
    rates: ExchangeRate[];
    loading: boolean;
    error: any;
    fetchRates: () => Promise<void>;
}

export const useExchangeRatesStore = create<ExchangeRatesState>((set) => ({
    rates: [],
    loading: false,
    error: null,

    fetchRates: async () => {
        set({ loading: true, error: null });
        const result = await getExchangeRates();
        if (result.success) {
            set({ rates: result.data, loading: false });
        } else {
            set({ error: result.error, loading: false });
        }
    },
}));
