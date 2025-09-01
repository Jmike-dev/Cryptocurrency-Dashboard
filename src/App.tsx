import CoinsList from "./components/CoinsList";

const url = import.meta.env.VITE_COINGECKO;
// const apiKey = import.meta.env.VITE_APIkEY;
function App() {
    return (
        <>
            <CoinsList />
        </>
    );
}

export default App;
