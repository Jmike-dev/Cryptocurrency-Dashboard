import { useEffect } from "react";
import { useCoinsStore } from "../store/coins.store";
import { CircleDollarSign } from "lucide-react";

function CoinsList() {
    const { coins, loading, error, fetchCoins } = useCoinsStore();

    useEffect(() => {
        fetchCoins();
    }, [fetchCoins]);

    if (loading) {
        return (
            <section className="min-h-screen w-full bg-gray-900 p-6">
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Coin listing
                </h1>
                <div className="max-h-screen overflow-y-auto pr-2">
                    <ul className="space-y-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex animate-pulse items-center justify-between rounded-xl bg-gray-800 p-4 shadow-md"
                            >
                                {/* Left: Icon skeleton */}
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-gray-700 p-6" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 rounded bg-gray-700" />
                                        <div className="h-3 w-20 rounded bg-gray-700" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

    return (
        <section className="min-h-screen w-full bg-gray-900 p-6">
            <h1 className="mb-6 text-2xl font-bold text-white">
                Coins listing
            </h1>
            <div className="max-h-screen overflow-y-auto pr-2">
                <ul className="space-y-4">
                    {coins.map((coin) => (
                        <li
                            key={coin.id}
                            className="flex items-center justify-between rounded-xl bg-gray-800 p-4 shadow-md"
                        >
                            {/* Left: Icon */}
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-gray-700 p-3">
                                    <CircleDollarSign className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">
                                        {coin.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {/* {coin.price} */}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default CoinsList;
