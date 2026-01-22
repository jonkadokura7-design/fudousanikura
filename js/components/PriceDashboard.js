function PriceDashboard({ prices, cityName }) {
    // Limit to top 50 for performance
    const displayPrices = prices.slice(0, 50);

    return (
        <div className="glass" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease' }}>
            <h2 className="title-display" style={{ marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>
                Market Trends: {cityName}
            </h2>

            <div style={{ overflowX: 'auto' }}>
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Price (JPY)</th>
                            <th>Area (m²)</th>
                            <th>Trade Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayPrices.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Type}</td>
                                <td>{item.DistrictName ? item.DistrictName : '-'}</td>
                                <td className="text-gold" style={{ fontWeight: 'bold' }}>
                                    {parseInt(item.TradePrice).toLocaleString()}
                                </td>
                                <td>{item.Area}</td>
                                <td style={{ color: 'var(--color-text-muted)' }}>{item.Period}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Source: MLIT Real Estate Transaction-price Information
            </div>
        </div>
    );
}

window.PriceDashboard = PriceDashboard;
