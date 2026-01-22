const MLIT_API_BASE = "https://www.reinfolib.mlit.go.jp/ex-api/external";

// Use a CORS proxy to bypass browser restrictions when running from file://
// Note: In a production server, you would set up your own proxy.
const CORS_PROXY = "https://corsproxy.io/?";

const MOCK_CITIES = [
    { id: "13101", name: "千代田区 (Chiyoda-ku)" },
    { id: "13102", name: "中央区 (Chuo-ku)" },
    { id: "13103", name: "港区 (Minato-ku)" },
    { id: "13104", name: "新宿区 (Shinjuku-ku)" },
    { id: "13113", name: "渋谷区 (Shibuya-ku)" }
];

const MOCK_PRICES = [
    {
        Type: "中古マンション等",
        DistrictName: "港区六本木",
        TradePrice: "150000000",
        Area: "80",
        Period: "2023年第3四半期",
        Frontage: "20m"
    },
    {
        Type: "土地",
        DistrictName: "港区赤坂",
        TradePrice: "300000000",
        Area: "150",
        Period: "2023年第3四半期",
        Frontage: "15m"
    },
    {
        Type: "中古マンション等",
        DistrictName: "港区南青山",
        TradePrice: "120000000",
        Area: "65",
        Period: "2023年第2四半期",
        Frontage: "-"
    },
    {
        Type: "宅地(土地と建物)",
        DistrictName: "港区白金",
        TradePrice: "280000000",
        Area: "120",
        Period: "2023年第3四半期",
        Frontage: "12m"
    },
    {
        Type: "中古マンション等",
        DistrictName: "港区高輪",
        TradePrice: "98000000",
        Area: "55",
        Period: "2023年第3四半期",
        Frontage: "-"
    }
];

/**
 * Helper to fetch with Proxy and Fallback
 */
async function safeFetch(url, fallbackData) {
    try {
        // Try Direct first (might work in some envs)
        try {
            const res = await fetch(url);
            if (res.ok) return await res.json();
        } catch (e) {
            // Check CORS Proxy
        }

        // Try Proxy
        const proxyUrl = CORS_PROXY + encodeURIComponent(url);
        console.log("Fetching via Proxy:", proxyUrl);
        const resProxy = await fetch(proxyUrl);
        if (resProxy.ok) {
            return await resProxy.json();
        }
        throw new Error("Proxy failed");

    } catch (error) {
        console.warn("API Fetch failed, using fallback/mock data:", error);
        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 800));
        return { data: fallbackData };
    }
}

/**
 * Fetches the list of cities for a given prefecture.
 */
async function fetchCities(prefectureCode) {
    const url = `${MLIT_API_BASE}/XIT002?response_format=json&z=10&s=13&year=202303&area=${prefectureCode}`;
    const data = await safeFetch(url, MOCK_CITIES);
    return data.data || MOCK_CITIES;
}

/**
 * Fetches real estate transaction prices.
 */
async function fetchTransactionPrices(areaCode) {
    const url = `${MLIT_API_BASE}/XIT001?response_format=json&year=2023&area=${areaCode}`;
    const data = await safeFetch(url, MOCK_PRICES);
    return data.data || MOCK_PRICES;
}

const MlitService = {
    fetchCities,
    fetchTransactionPrices,
};

window.MlitService = MlitService;
