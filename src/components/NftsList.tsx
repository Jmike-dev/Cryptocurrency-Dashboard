import React, { useEffect } from "react";
import { useNFTsStore } from "../store/nfts.store";
import { ChevronDown } from "lucide-react";

function NftsList() {
    // const { allNfts, loading, fetchNFTs } = useNFTsStore();

    // useEffect(() => {
    //     fetchNFTs();
    // }, [fetchNFTs]);
    const dummyAllNfts = [
        {
            id: "1",
            contract_address: "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305",
            name: "AlphaSharks NFT",
            asset_platform_id: "ethereum",
            symbol: "ALPHASHARKS",
        },
        {
            id: "2",
            contract_address: "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305",
            name: "AlphaSharks NFT",
            asset_platform_id: "ethereum",
            symbol: "ALPHASHARKS",
        },
        {
            id: "3",
            contract_address: "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305",
            name: "AlphaSharks NFT",
            asset_platform_id: "ethereum",
            symbol: "ALPHASHARKS",
        },
        {
            id: "4",
            contract_address: "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305",
            name: "AlphaSharks NFT",
            asset_platform_id: "ethereum",
            symbol: "ALPHASHARKS",
        },
    ];
    return (
        <section className="w-full rounded-lg bg-[#111] p-4 text-white">
            <table className="w-full text-lg">
                <thead>
                    <tr className="border-b border-gray-700 text-gray-400">
                        <th className="py-3 text-left">NFT name</th>
                        <th className="text-left">Network</th>
                        <th className="text-left">Contract</th>
                        <th className="text-left">Symbol</th>
                        <th className="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyAllNfts.map((nft) => (
                        <tr
                            key={nft.id}
                            className="border-b border-gray-800 hover:bg-gray-900"
                        >
                            <td className="flex items-center gap-2 py-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                                    <span className="text-xs font-bold">
                                        {nft.symbol[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{nft.name}</p>
                                    <p className="text-xs text-gray-400">
                                        ID #{nft.id}
                                    </p>
                                </div>
                            </td>

                            <td className="capitalize">
                                {nft.asset_platform_id}
                            </td>

                            <td className="max-w-[200px] truncate text-gray-400">
                                {nft.contract_address}
                            </td>

                            <td>{nft.symbol}</td>

                            <td>
                                <button className="rounded-full p-2 hover:bg-gray-700">
                                    <ChevronDown size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default NftsList;
