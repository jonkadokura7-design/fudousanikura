const { useState, useEffect } = React;

function App() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCitySelect = async (cityCode, cityName) => {
        setLoading(true);
        setError(null);
        setSelectedCity({ code: cityCode, name: cityName });

        try {
            const data = await window.MlitService.fetchTransactionPrices(cityCode);
            if (!data || data.length === 0) {
                setError("No data found for this area.");
                setPrices([]);
            } else {
                setPrices(data);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load data. Please try again.");
            setPrices([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 className="title-display" style={{ fontSize: '3rem', margin: 0 }}>
                    不動産いくら？
                </h1>
                <p style={{ color: 'var(--color-primary)', marginTop: '0.5rem', letterSpacing: '2px' }}>
                    LUXURY REAL ESTATE INSIGHTS
                </p>
            </header>

            <div className="glass" style={{ padding: '2rem' }}>
                <CitySearch onSelect={handleCitySelect} />
            </div>

            {loading && (
                <div className="loading-spinner"></div>
            )}

            {error && !loading && (
                <div className="glass" style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    textAlign: 'center',
                    borderColor: '#ff4444',
                    color: '#ffdddd'
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && prices.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <PriceDashboard prices={prices} cityName={selectedCity?.name} />
                </div>
            )}

            {!loading && !error && selectedCity && prices.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>

                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
