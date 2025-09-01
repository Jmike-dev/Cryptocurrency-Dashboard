import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useExchangeRatesStore } from "../store/exchange-rates.store";

function ExchangeRatesList() {
    const { rates, loading, error, fetchRates } = useExchangeRatesStore();

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    if (loading) {
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
                            {Array.from({ length: 6 }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="animate-pulse border-b border-gray-800"
                                >
                                    {/* Name cell skeleton */}
                                    <td className="flex items-center gap-2 py-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-700" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 rounded bg-gray-700" />
                                            <div className="h-3 w-16 rounded bg-gray-700" />
                                        </div>
                                    </td>

                                    {/* Unit skeleton */}
                                    <td>
                                        <div className="h-4 w-12 rounded bg-gray-700" />
                                    </td>

                                    {/* Value skeleton */}
                                    <td>
                                        <div className="h-4 w-20 rounded bg-gray-700" />
                                    </td>

                                    {/* Type skeleton */}
                                    <td>
                                        <div className="h-4 w-16 rounded bg-gray-700" />
                                    </td>

                                    {/* Action skeleton */}
                                    <td>
                                        <div className="h-6 w-6 rounded-full bg-gray-700" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }

    if (error)
        return (
            <p className="text-red-500">
                Error: {error.message || "Something went wrong"}
            </p>
        );

    return (
        <section className="w-full rounded-lg bg-[#111] p-4 text-white">
            <h1 className="p-6 text-3xl">Exchange Rates</h1>
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
