const { useState, useEffect } = React;

const PREFECTURES = [
    { code: "13", name: "東京都 (Tokyo)" },
    { code: "14", name: "神奈川県 (Kanagawa)" },
    { code: "11", name: "埼玉県 (Saitama)" },
    { code: "12", name: "千葉県 (Chiba)" },
    { code: "27", name: "大阪府 (Osaka)" },
    { code: "23", name: "愛知県 (Aichi)" },
    { code: "40", name: "福岡県 (Fukuoka)" },
    { code: "01", name: "北海道 (Hokkaido)" }
    // Add more as needed
];

function CitySearch({ onSelect }) {
    const [prefCode, setPrefCode] = useState("13"); // Default Tokyo
    const [cities, setCities] = useState([]);
    const [cityCode, setCityCode] = useState("");

    // Load cities when prefecture changes
    useEffect(() => {
        if (!prefCode) return;

        window.MlitService.fetchCities(prefCode).then(data => {
            // Data structure from XIT002 is typically like:
            // { id: "13101", name: "Chiyoda-ku", ... } checks API specific response
            // The API returns strictly: "13101" and "千代田区"
            // Let's assume the helper returns the raw array.
            setCities(data);
        });
    }, [prefCode]);

    const handleSearch = () => {
        if (!cityCode) {
            alert("市区町村を選択してください (Please select a city)");
            return;
        }
        const selectedCityObj = cities.find(c => c.id === cityCode);
        onSelect(cityCode, selectedCityObj ? selectedCityObj.name : "");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Simple Usage Guide */}
            <div style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <h3 className="text-gold" style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                    使い方 (How to Use)
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.5' }}>
                    1. <b>都道府県</b>を選択します。<br />
                    2. <b>市区町村</b>を選択します。<br />
                    3. <b>「調べる」</b>ボタンを押すと、最新の取引価格が表示されます。
                </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        都道府県 (Prefecture)
                    </label>
                    <select
                        style={{ width: '100%' }}
                        value={prefCode}
                        onChange={(e) => setPrefCode(e.target.value)}
                    >
                        {PREFECTURES.map(pref => (
                            <option key={pref.code} value={pref.code}>
                                {pref.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        市区町村 (City/Ward)
                    </label>
                    <select
                        style={{ width: '100%' }}
                        value={cityCode}
                        onChange={(e) => setCityCode(e.target.value)}
                        disabled={cities.length === 0}
                    >
                        <option value="">エリアを選択してください</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className="btn-primary"
                onClick={handleSearch}
                style={{ alignSelf: 'center', marginTop: '1rem', minWidth: '200px', fontSize: '1.1rem' }}
            >
                調べる
            </button>
        </div>
    );
}

window.CitySearch = CitySearch;
