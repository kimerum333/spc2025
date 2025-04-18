#셀레니움?
#pip install selenium
#pip install webdriver_manager

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

import time


driver = webdriver.Chrome(service = ChromeService( ChromeDriverManager().install() ))

driver.get("https://www.naver.com")
searchbox = driver.find_element(By.NAME, 'query')
searchbox.send_keys("Python programming")
searchbox.submit()

time.sleep(2)

html = driver.page_source
driver.quit

time.sleep(100)