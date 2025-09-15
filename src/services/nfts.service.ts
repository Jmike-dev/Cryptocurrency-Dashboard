// src/services/nfts.service.ts
const apiKey = import.meta.env.VITE_MORALIS_API_KEY;
const CONTRACT_ADDRESS = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

export interface NFT {
  token_id: string;
  name: string;
  metadata: string | null;
  token_uri: string | null;
  owner_of: string;
}

export interface GetNFTsResponse {
  success: boolean;
  data: NFT[];
  error?: string;
}

export async function getNFTs(): Promise<GetNFTsResponse> {
  try {
    if (!apiKey) throw new Error("Moralis API key is missing!");

    const res = await fetch(
      `https://deep-index.moralis.io/api/v2.2/nft/${CONTRACT_ADDRESS}/owners?chain=eth&format=decimal`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key": apiKey,
        },
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error("NFT Response Error:", text);
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = JSON.parse(text);

    if (!data || !Array.isArray(data.result)) {
      throw new Error("Invalid API response format");
    }

    const nfts: NFT[] = data.result.map((nft: any) => ({
      token_id: nft.token_id,
      name: nft.name || "Unnamed NFT",
      metadata: nft.metadata || null,
      token_uri: nft.token_uri || null,
      owner_of: nft.owner_of || "Unknown",
    }));

    return { success: true, data: nfts };
  } catch (error: any) {
    console.error("NFT fetch error:", error);
    return { success: false, data: [], error: error.message || "Failed to fetch NFTs" };
  }
}
