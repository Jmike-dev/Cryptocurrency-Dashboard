import axios from "axios";

const url = import.meta.env.VITE_COINGECKO;
const apiKey = import.meta.env.VITE_APIKEY;

export interface ExchangeRate {
    key: string;
    name: string;
    unit: string;
    value: number;
    type: string;
}

export async function getExchangeRates(): Promise<
    { success: true; data: ExchangeRate[] } | { success: false; error: any }
> {
    try {
        const response = await axios.get(
            `${url}exchange_rates?x_cg_demo_api_key=${apiKey}`,
        );

        const rates = Object.entries(response.data.rates).map(
            ([key, value]: any) => ({
                key,
                name: value.name,
                unit: value.unit,
                value: value.value,
                type: value.type,
            }),
        );

        return { success: true, data: rates };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data) {
                console.error("API Error:", error.response.data);
                return { success: false, error: error.response.data };
            }
            console.error("Axios Error:", error.message);
            return { success: false, error: { message: error.message } };
        } else {
            console.error("Unexpected Error:", error);
            return {
                success: false,
                error: { message: "Unexpected error occurred" },
            };
        }
    }
}
