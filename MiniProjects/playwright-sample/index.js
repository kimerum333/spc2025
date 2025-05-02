const { chromium } = require('playwright'); // 브라우저는 Chromium 기준

(async () => {
  const browser = await chromium.launch({ headless: false }); // 실제 브라우저 창 열림
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.naver.com');
  await page.screenshot({ path: 'naver.png' }); // 화면 캡처

  console.log('✅ 완료: example.com 방문 및 스크린샷 저장');
  await browser.close();
})();
