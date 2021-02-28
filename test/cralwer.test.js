// const crawling = require('../src/crawler');
// const mangaList = require('../src/mangaList');
const topPageUrl = 'https://manga1000.com/';

describe('Manga Raw', () => {
  // const resutls = crawling();
  // console.log(resutls);
  beforeAll(async () => {
    // console.log(mangaList);
    await page.goto(topPageUrl);
  });

  it('should be titled "Manga Raw"', async () => {
    await expect(page.title()).resolves.toContain('Manga Raw');
  });
});