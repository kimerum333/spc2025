import requests
import os
from dotenv import load_dotenv

# 환경변수에서 API 키 불러오기
load_dotenv()
API_KEY = os.getenv("FMP_API_KEY")

# 대상 종목
symbol = "AAPL"
base_url = "https://financialmodelingprep.com/api/v3"

# URL 구성
profile_url = f"{base_url}/profile/{symbol}?apikey={API_KEY}"
ratios_url = f"{base_url}/ratios-ttm/{symbol}?apikey={API_KEY}"
market_cap_url = f"{base_url}/market-capitalization/{symbol}?apikey={API_KEY}"
income_url = f"{base_url}/income-statement/{symbol}?limit=1&apikey={API_KEY}"
balance_url = f"{base_url}/balance-sheet-statement/{symbol}?limit=1&apikey={API_KEY}"

# ===== API 요청 =====
def fetch_json(url):
    res = requests.get(url)
    if res.ok and res.json():
        return res.json()[0]
    return {}

profile = fetch_json(profile_url)
ratios = fetch_json(ratios_url)
market_cap = fetch_json(market_cap_url)
income = fetch_json(income_url)
balance = fetch_json(balance_url)

# ===== EPS 계산 =====
try:
    eps = float(income["netIncome"]) / float(income["weightedAverageShsOut"])
    eps = round(eps, 2)
except:
    eps = "N/A"

# BPS 계산
try:
    equity = float(balance.get("totalStockholdersEquity"))

    # sharesOutstanding 없으면 직접 계산
    price = float(profile.get("price"))
    market_cap_val = float(market_cap.get("marketCap"))
    shares = market_cap_val / price  # fallback 계산

    bps = round(equity / shares, 2)
except:
    bps = "N/A"
    
# 배당수익률 계산
try:
    last_div = float(profile.get("lastDiv"))
    price = float(profile.get("price"))
    dividend_yield = round(last_div / price * 100, 2)
except:
    dividend_yield = "N/A"

# ===== 결과 출력 =====
print(f"\n✅ [{symbol}] 주요 지표 수집 결과")
print(f"산업 (Industry): {profile.get('industry', 'N/A')}")
print(f"섹터 (Sector): {profile.get('sector', 'N/A')}")
print(f"시가총액 (Market Cap): {market_cap.get('marketCap', 'N/A')}")
print(f"ROE: {ratios.get('returnOnEquityTTM', 'N/A')}")
print(f"EPS (계산): {eps}")
print(f"BPS (계산): {bps}")
print(f"Beta: {profile.get('beta', 'N/A')}")
print(f"배당수익률 (Dividend Yield): {dividend_yield}%")