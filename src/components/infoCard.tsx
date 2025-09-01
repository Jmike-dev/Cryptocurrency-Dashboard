import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    percentageChange?: number;
    isPositive?: boolean;
}

export const InfoCard = ({
    icon: Icon,
    title,
    value,
    percentageChange,
    isPositive = true,
}: InfoCardProps) => {
    return (
        <div className="flex flex-col items-start space-y-4 rounded-lg bg-gray-800 p-6">
            {/* Icon and Title */}
            <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                    <Icon className="h-4 w-4 text-gray-800" />
                </div>
                <h3 className="text-sm font-medium text-white capitalize">
                    {title}
                </h3>
            </div>

            {/* Value */}
            <div className="text-2xl font-bold text-white">{value}</div>

            {/* Percentage Change */}
            <div
                className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
                {isPositive ? "+" : ""}
                {percentageChange}% per year
            </div>
        </div>
    );
};
