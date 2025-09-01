import axios from "axios";

const url = import.meta.env.VITE_COINGECKO;
const apiKey = import.meta.env.VITE_APIKEY;

export async function getNFTS() {
    try {
        const response = await axios.get(
            `${url}nfts/list?x_cg_demo_api_key=${apiKey}`,
        );
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data) {
                console.error("API Error:", error.response.data);
                return {
                    success: false,
                    error: error.response.data,
                };
            }
            console.error("Axios Error:", error.message);
            return {
                success: false,
                error: { message: error.message },
            };
        } else {
            console.error("Unexpected Error:", error);
            return {
                success: false,
                error: { message: "Unexpected error occurred" },
            };
        }
    }
}
