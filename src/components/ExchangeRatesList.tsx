import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useExchangeRatesStore } from "../store/exchange-rates.store";

function ExchangeRatesList() {
    const { rates, loading, error, fetchRates } = useExchangeRatesStore();

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    if (loading) return <p className="text-white">Loading exchange rates...</p>;
    if (error)
        return (
            <p className="text-red-500">
                Error: {error.message || "Something went wrong"}
            </p>
        );

    return (
        <section className="w-full rounded-lg bg-[#111] p-4 text-white">
            <h1>Exchange Rates</h1>
            <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-lg">
                    <thead>
                        <tr className="border-b border-gray-700 text-gray-400">
                            <th className="py-3 text-left">Name</th>
                            <th className="text-left">Unit</th>
                            <th className="text-left">Value</th>
                            <th className="text-left">Type</th>
                            <th className="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((rate) => (
                            <tr
                                key={rate.key}
                                className="border-b border-gray-800 hover:bg-gray-900"
                            >
                                {/* Name + Icon */}
                                <td className="flex items-center gap-2 py-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                                        <span className="text-xs font-bold">
                                            {rate.unit[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {rate.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {rate.key}
                                        </p>
                                    </div>
                                </td>

                                <td>{rate.unit}</td>
                                <td className="text-gray-400">{rate.value}</td>
                                <td className="capitalize">{rate.type}</td>

                                <td>
                                    <button className="rounded-full p-2 hover:bg-gray-700">
                                        <ChevronDown size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ExchangeRatesList;
