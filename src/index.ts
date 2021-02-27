const puppeteer  = require('puppeteer');

const main = async () => {
  console.log('poyo');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  
  const url = 'https://google.com/'
  await page.goto(url, { waitUntil: 'networkidle0' });

  // await page.screenshot({ path: 'home1.png' });

  // await page.title() でも良い
  const title = await page.title();
  console.log("============================")
  console.log(title)

  await browser.close();
}

main();