"use strict";
const puppeteer  = require('puppeteer');
const headless = false;
const screenSize = {width: 1920, height: 1080};
const slowMo = 0;
const args = [
  // '--start-fullscreen',
  '--disable-infobars',
  '--incognito',
  // '--window-size=1920,1080'
];
//TODO:複数ワードで検索できるようにする
const searchWord = '怪獣8号';

const main = async () => {
  console.log('start');
  const browser = await puppeteer.launch({headless, slowMo, args});
  try {
    let row = {};
    const page = await browser.newPage();
    await page.setViewport(screenSize);
    
    const url = 'https://manga1000.com/'
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    //検索フォームで特定のキーワードにて検索
    await page.type(selectors.searchForm, searchWord);
    //検索ボタンをクリック
    await page.click(selectors.searchButton);
    //漫画内の一覧ページへ遷移
    //TODO:完全一致したタイトルをクリックできるようにする
    await page.click(selectors.chapterListLink);
    //チュプターの最新話を取得
    const chapter = await page.$x(`//div[@class='chaplist']/table[@class='table table-hover']/tbody/tr[1]/td/p/a`);
    //TODO:タイトルの番号だけを取得するようにする
    //patternmatchingの追加
    const chapterTitle = await(await chapter[0].getProperty('text')).jsonValue();
    const chapterUrl = await(await chapter[0].getProperty('href')).jsonValue();
    row.title = '怪獣8号';
    row.chapter = chapterTitle;
    row.url = chapterUrl;
    console.log(row);
  } catch (e) {
    console.log('=============error================');
    console.log(e);
  } finally {
    await browser.close();
    console.log('end');
  }
}

// const search = async (page) => {
//    //検索フォームで特定のキーワードにて検索
//    await page.type(selectors.searchForm, searchWord);
//    //検索ボタンをクリック
//    await page.click(selectors.searchButton);
// }

// const getText = async (elements) => {
//   await(await elements[0].getProperty('text')).jsonValue();
// }

const selectors = {
  searchForm: '#sticky-wrapper > div > div > div.search-holder > div > form > input',
  searchButton: '#sticky-wrapper > div > div > div.search-holder > div > form > button',
  //TODO:どのタイトルでもクリックできるようにする
  chapterListLink: '#post-465392 > div > div.featured-thumb > a',
  // chapterListLink: '#post-22224 > div > div.featured-thumb > a',
  chapterLink: '#post-22224 > div > div > div > div > div.chaplist > table > tbody > tr:nth-child(1) > td > p > a'
}

main();