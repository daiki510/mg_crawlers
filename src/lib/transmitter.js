'use strict';
const request = require('request');
const Log4js = require('log4js');
Log4js.configure('log-config.json');
const logger = Log4js.getLogger('system');
const errorLogger = Log4js.getLogger('error');
const util = require('./util')
const host = 'http://127.0.0.1:3001/api/v1/';

const transmitter = async(row) => {
  const data = JSON.stringify(util.toUnderscoreCaseObject(row));
  console.log('============data==============')
  console.log(data)
  const URL = host + 'comics';
  const options = {
    uri: URL,
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  }
  await request.post(options, function(err, res, data){
    //TODO:ログが出力されるようにする
    if (data.error) {
      throw new Error (data.error)
    }
    if (data.status === 201) {
      logger.info(`「${manga.title}」の最新話を登録しました！`);
    }
    if (data.status === 304) {
      logger.info(`「${manga.title}」の更新はありませんでした`);
    }
  });
}

module.exports = transmitter;