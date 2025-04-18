# 헤드리스 모드
# 실제 창을 띄우지 않는 자동화 모드


from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import time
import csv

#임포트한 옵션으로 옵션을 정의
options = Options()
options.add_argument('--headless')

#드라이버 만들떄 옵션을 넣어준다.
driver = webdriver.Chrome(service = ChromeService( ChromeDriverManager().install() ), options=options)

driver.get("https://www.naver.com")
searchbox = driver.find_element(By.NAME, 'query')
searchbox.send_keys("Python programming")
searchbox.submit()

time.sleep(2)

html = driver.page_source
driver.quit



time.sleep(100)