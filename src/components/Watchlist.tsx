import { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};

export default function Watchlist() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  useEffect(() => {
    if (watchlist.length > 0) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlist.join(
          ","
        )}`
      )
        .then((res) => res.json())
        .then((data) => setCoins(data));
    } else {
      setCoins([]);
    }
  }, [watchlist]);

  return (
    <div className="rounded-2xl bg-gray-800 p-6 text-white shadow-lg">
      <h2 className="mb-4 text-xl font-bold">⭐ My Watchlist</h2>
      {coins.length === 0 ? (
        <p className="text-gray-400">No coins in watchlist.</p>
      ) : (
        <ul className="space-y-3">
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
              <span className="font-semibold">${coin.current_price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
