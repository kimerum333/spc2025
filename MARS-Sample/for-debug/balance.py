import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("FMP_API_KEY")

symbol = "AAPL"
base_url = "https://financialmodelingprep.com/api/v3"
balance_url = f"{base_url}/balance-sheet-statement/{symbol}?limit=1&apikey={API_KEY}"

res = requests.get(balance_url)
if res.status_code != 200:
    print(f"❌ 요청 실패: {res.status_code}")
    exit()

data = res.json()

print("=== balance-sheet-statement 응답 ===")
print(json.dumps(data, indent=2))
