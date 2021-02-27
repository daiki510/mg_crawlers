const puppeteer  = require('puppeteer');
const headless = false;
const screenSize = {width: 1920, height: 1080};
const slowMo = 0;
const args = [
  // '--start-fullscreen',
  '--disable-infobars',
  '--incognito',
];

const main = async () => {
  console.log('start');
  const browser = await puppeteer.launch({headless, slowMo, args});
  const page = await browser.newPage();
  await page.setViewport(screenSize);
  
  const url = 'https://qiita.com/'
  await page.goto(url, { waitUntil: 'networkidle0' });
  // await page.type('input[title="検索"]', "puppeteer", { delay: 100 });
  // await page.click('input[value^="Google"]');
  // await page.waitForNavigation({timeout: 600000, waitUntil: "domcontentloaded"});
  await page.screenshot({ path: 'storage/screenshot.png' });

  // await page.title() でも良い
  const title = await page.title();
  console.log("============================");
  console.log(title);
  
  await browser.close();
  console.log('end');
}

main();