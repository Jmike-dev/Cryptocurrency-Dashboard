import { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};

export default function CoinsList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  const toggleWatchlist = (coinId: string) => {
    let updated: string[];
    if (watchlist.includes(coinId)) {
      updated = watchlist.filter((id) => id !== coinId);
    } else {
      updated = [...watchlist, coinId];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="space-y-2 rounded-2xl bg-gray-800 p-4 text-white shadow-lg">
      <h2 className="text-lg font-bold">Top Coins</h2>
      <ul className="space-y-2">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="flex items-center justify-between rounded-lg bg-gray-700 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="h-6 w-6 rounded-full" />
              <span>{coin.name}</span>
              <span className="text-sm text-gray-400">({coin.symbol})</span>
            </div>
            <button
              onClick={() => toggleWatchlist(coin.id)}
              className={`text-lg ${
                watchlist.includes(coin.id) ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
