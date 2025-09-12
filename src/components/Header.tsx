import { useEffect, useState } from "react";
import { useNFTsStore } from "../store/nfts.store";
import { InfoCard } from "./infoCard";
import { Coins, Image } from "lucide-react";

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
}

function Header() {
  const { allNfts, fetchNFTs } = useNFTsStore();
  const [coins, setCoins] = useState<CoinGeckoCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();

    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [fetchNFTs]);

  const totalCoins = coins.length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {loading ? (
        <p className="text-gray-400">Loading coins...</p>
      ) : (
        <InfoCard
          icon={Coins}
          title="Total Coins"
          value={totalCoins.toLocaleString()}
          className="bg-gray-900 bg-opacity-80 shadow-lg"
        />
      )}
      <InfoCard
        icon={Image}
        title="Number of NFTs"
        value={allNfts.length.toLocaleString()}
        className="bg-gray-900 bg-opacity-80 shadow-lg"
      />
    </section>
  );
}

export default Header;
