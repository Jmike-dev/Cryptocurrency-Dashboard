import { useEffect } from "react";
import { useCoinsStore } from "../store/coins.store";
import { CircleDollarSign } from "lucide-react";

function CoinsList() {
    const { coins, loading, error, fetchCoins } = useCoinsStore();

    useEffect(() => {
        fetchCoins();
    }, [fetchCoins]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <section className="min-h-screen w-full bg-gray-900 p-6">
            <h1 className="mb-6 text-2xl font-bold text-white">Portfolio</h1>
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
        </section>
    );
}

export default CoinsList;
