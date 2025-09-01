import CoinsList from "./components/CoinsList";
import ExchangeRatesList from "./components/ExchangeRatesList";
import Header from "./components/Header";
import NftsList from "./components/NftsList";

function App() {
    return (
        <section className="cursor-default space-y-8 p-8">
            <Header />

            {/* Layout wrapper */}
            <section className="flex gap-4">
                {/* Sidebar for Coins */}
                <div className="h-screen w-1/5">
                    <CoinsList />
                </div>

                {/* Main content */}
                <div className="w-full space-y-8">
                    {/* Two tables side by side */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full">
                            <ExchangeRatesList />
                        </div>
                        <div className="w-full">
                            <NftsList />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default App;
