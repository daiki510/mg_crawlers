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
  const URL = host + 'comics';
  await request.post({
    uri: URL,
    headers: {'Content-type': 'application/json'},
    json: data
  }, function(err, res, data){
    //TODO:レスポンスを受け取れるようにする
    console.log('============err==============')
    console.log(err)
    if (err) {
      return true
    }
    console.log('============res==============')
    console.log(res)
    console.log('============data==============')
    console.log(data)
    return false
  });
}

module.exports = transmitter;