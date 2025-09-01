import CoinsList from "./components/CoinsList";
import Header from "./components/Header";
import NftsList from "./components/NftsList";

function App() {
    return (
        <section className="cursor-default space-y-8 p-8">
            <Header />
            {/* listing tables and column */}
            <section className="flex gap-4">
                <div className="w-1/5">
                    <CoinsList />
                </div>
                <div className="w-full">
                    <NftsList />
                </div>
            </section>
            <NftsList />
        </section>
    );
}

export default App;
