// src/store/nfts.store.ts
import { create } from "zustand";
import { getNFTs } from "../services/nfts.service";
import type { NFT } from "../services/nfts.service"; // type-only import

interface NFTsState {
  allNfts: NFT[];
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
      const res = await getNFTs();

      if (!res || !res.success) {
        const errMsg = res?.error || "Failed to fetch NFTs";
        console.warn("NFT fetch warning:", errMsg);
        set({ allNfts: [], error: errMsg });
        return;
      }

      // Deduplicate by token_id
      const uniqueNFTsMap = new Map<string, NFT>();
      res.data?.forEach((nft: NFT) => {
        if (nft?.token_id && !uniqueNFTsMap.has(nft.token_id)) {
          uniqueNFTsMap.set(nft.token_id, nft);
        }
      });

      // Convert map to array and sort by token_id
      const uniqueNFTs = Array.from(uniqueNFTsMap.values()).sort(
        (a, b) => Number(a.token_id) - Number(b.token_id)
      );

      set({ allNfts: uniqueNFTs, error: null });
    } catch (err: any) {
      console.error("fetchNFTs caught error:", err);
      //set({ allNfts: [], error: err?.message || "Unexpected error occurred" });
    } finally {
      set({ loading: false });
    }
  },
}));
