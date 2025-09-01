import React, { useEffect } from "react";
import { useCoinsStore } from "../store/coins.store";
import { InfoCard } from "./infoCard";
import { Coins } from "lucide-react";
import { useNFTsStore } from "../store/nfts.store";

function Header() {
    const { coins, fetchCoins } = useCoinsStore();
    const { allNfts, fetchNFTs } = useNFTsStore();
    useEffect(() => {
        fetchCoins();
        fetchNFTs();
    }, [fetchCoins]);

    return (
        <>
            <section className="flex gap-8">
                <InfoCard
                    icon={Coins}
                    title="total coins"
                    value={`${coins.length}`}
                />
                <InfoCard
                    icon={Coins}
                    title="number of NFTS"
                    value={`${allNfts.length}`}
                />
            </section>
        </>
    );
}

export default Header;
