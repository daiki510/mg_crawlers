const puppeteer  = require('puppeteer');
const topPageUrl = 'https://manga1000.com/';
const selectors = {
  searchForm: '#sticky-wrapper > div > div > div.search-holder > div > form > input',
  searchButton: '#sticky-wrapper > div > div > div.search-holder > div > form > button',
  chapterLink: '#post-22224 > div > div.featured-thumb > a',
}

const xPath = {
  latestChapter: `//div[@class='chaplist']/table[@class='table table-hover']/tbody/tr[1]/td/p/a`
}

describe('Manga Raw', () => {
  beforeAll(async () => {
    await page.goto(topPageUrl);
  });

  it('タイトルが「Manga Raw」であること', async () => {
    await expect(page.title()).resolves.toContain('Manga Raw');
  });

  it('検索フォームに入力し、検索ができること', async () => {
    await expect(page).toFill(selectors.searchForm, '呪術廻戦')
    await expect(page).toClick(selectors.searchButton)
  });
});