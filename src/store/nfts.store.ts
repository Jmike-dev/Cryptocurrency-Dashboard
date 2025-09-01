import { create } from "zustand";
import { getNFTS } from "../services/nfts.service";

interface NFTs {
    id: string;
    contract_address: string;
    name: string;
    asset_platform_id: string;
    symbol: string;
}
interface NFTsState {
    allNfts: NFTs[];
    loading: boolean;
    error: string | null;
    fetchNFTs: () => Promise<void>;
}
export const useNFTsStore = create<NFTsState>((set) => ({
    allNfts: [],
    loading: false,
    error: null,

    fetchNFTs: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getNFTS();

            if ("success" in data && !data.success) {
                set({
                    allNfts: [],
                    error:
                        data.error?.status?.error_message ||
                        "Failed to fetch allNfts",
                });
            } else {
                set({ allNfts: data, error: null });
            }
        } catch (err: any) {
            set({ allNfts: [], error: err.message || "Unexpected error" });
        } finally {
            set({ loading: false });
        }
    },
}));
