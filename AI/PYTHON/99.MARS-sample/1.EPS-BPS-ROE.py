import requests, os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("FMP_API_KEY")

def fetch_eps_bps_roe(symbol: str):
    url = f"https://financialmodelingprep.com/api/v3/key-metrics-ttm/{symbol}"
    params = {"apikey": api_key}
    try:
        res = requests.get(url, params=params)
        res.raise_for_status()
        metrics = res.json()[0]

        eps = metrics.get("netIncomePerShareTTM")
        bps = metrics.get("bookValuePerShareTTM")
        roe = metrics.get("roeTTM") * 100 if metrics.get("roeTTM") is not None else None

        return {
            "symbol": symbol,
            "EPS": eps,
            "BPS": bps,
            "ROE(%)": round(roe, 2) if roe else None
        }

    except Exception as e:
        print(f"❌ Failed to fetch for {symbol}: {e}")
        return None

# 테스트
print(fetch_eps_bps_roe("AAPL"))
