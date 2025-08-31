const url = import.meta.env.VITE_COINGECKO;
const apiKey = import.meta.env.VITE_APIkEY;
function App() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world! {url}{" "}
            </h1>
            {/* <h2>{apiKey}</h2> */}
        </>
    );
}

export default App;
