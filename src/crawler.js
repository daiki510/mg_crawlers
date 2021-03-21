"use strict";
const puppeteer  = require('puppeteer');
const Log4js = require("log4js");
Log4js.configure("log-config.json");
const logger = Log4js.getLogger("system");
const errorLogger = Log4js.getLogger("error");
const headless = true;
const screenSize = {width: 1920, height: 1080};
const slowMo = 0;
const args = [
  '--disable-infobars',
  '--incognito'
];
const mangaList = require('./mangaList');
const util = require('./lib/util');
const transmitter = require('./lib/transmitter');
let rows = [];

const crawling = async () => {
  logger.info('=============クローリングを開始します=============');
  const browser = await puppeteer.launch({headless, slowMo, args});
  try {
    const page = await browser.newPage();
    await page.setViewport(screenSize);
    
    const topPageUrl = 'https://manga1000.com/'
    await page.goto(topPageUrl, { waitUntil: 'networkidle0' });

    for (let manga of mangaList) {
      try {
        let row = {};
        logger.info(`「${manga.title}」をクローリング中...`);
        row.title = manga.title;
        //漫画の検索
        await search(page, manga);
        
        //検索結果より対象の漫画リンクへ遷移
        await crawlingList(page, manga);
        // throw new Error ('テストエラー')

        //漫画内の一覧ページのクローリング
        await crawlingDetail(page, row)
        .then(async row => {
          try {
            // APIに収集したデータ送信
            await transmitter(row); 
          } catch (e) {
            errorLogger.error(`「${manga.title}」の登録に失敗しました`);
            errorLogger.error(e);
          }
        })
      } catch (e) {
        errorLogger.error(`「${manga.title}」の収集に失敗しました`);
        errorLogger.error(e);
      } finally {
        logger.info(`「${manga.title}」のクローリング処理完了！`);
        await page.goto(topPageUrl, { waitUntil: 'networkidle0' });
      }
    }
    logger.info(rows);

    
    //検索フォームで特定のキーワードにて検索
  } catch (e) {
    errorLogger.error('=============クローラーが異常終了しました=============');
    errorLogger.error(e);
  } finally {
    await browser.close();
    logger.info('=============クローリングが完了しました=============');
  }
}
crawling();

/**
 * トップページから対象の漫画を検索する
 * @param {void} page トップページ
 * @param {Object} manga 対象の漫画情報
 * @return {void}
 */
const search = async (page, manga) => {
  await page.type(selectors.searchForm, manga.title);
  
  //検索ボタンをクリック
  await Promise.all([
    page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }),
    page.click(selectors.searchButton)
  ]);
}

/**
 * 検索結果より対象の漫画リンクへ遷移する
 * @param {void} page 検索結果ページ
 * @param {Object} manga 対象の漫画情報
 * @return {void}
 */
const crawlingList = async (page, manga) => {
  let chapterLink = getMangaLink(manga.id)
  await Promise.all([
    page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }),
    page.click(chapterLink)
  ]);
}

/**
 * 漫画内の一覧ページのクローリング
 * @param {void} page 漫画詳細ページ
 * @param {Object} row 収集した情報
 * @return {void}
 */
const crawlingDetail = async (page, row) => {
  const chapter = await page.$x(xPath.latestChapter);
  const chapterTitle = await(await chapter[0].getProperty('text')).jsonValue();
  const chapterUrl = await(await chapter[0].getProperty('href')).jsonValue();
  row.chapterOrg = chapterTitle;
  row.chapterNo = util.getChapterNo(chapterTitle);
  row.chapterUrl = chapterUrl;
  row.detailUrl = page.url();
  rows.push(row);
  return row
}

/**
 * 対象漫画のSelectorを取得する
 * @param {Number} id 対象漫画のID
 * @return {String} 対象漫画のSelector
 */
const getMangaLink = id => {
  return `#post-${id} > div > div.featured-thumb > a`;
}

const selectors = {
  searchForm: '#sticky-wrapper > div > div > div.search-holder > div > form > input',
  searchButton: '#sticky-wrapper > div > div > div.search-holder > div > form > button',
}

const xPath = {
  latestChapter: `//div[@class='chaplist']/table[@class='table table-hover']/tbody/tr[1]/td/p/a`
}

module.exports = crawling;