import { useEffect } from "react";
import { useCoinsStore } from "../store/coins.store";

function CoinsList() {
    const { coins, loading, error, fetchCoins } = useCoinsStore();

    useEffect(() => {
        fetchCoins();
    }, [fetchCoins]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <h1>{coins.length}</h1>
            <ul>
                {coins.map((coin) => (
                    <li key={coin.id}>
                        {coin.name} ({coin.symbol})
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CoinsList;
