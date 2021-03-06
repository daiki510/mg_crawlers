"use strict";
const request = require('request');
const Log4js = require("log4js");
Log4js.configure("log-config.json");
const logger = Log4js.getLogger("system");
const errorLogger = Log4js.getLogger("error");
const host = 'http://127.0.0.1:9999/api/v1/';

const transmitter = async(row) => {
  const data = JSON.stringify(row);
  const URL = host + 'manga';
  await request.post({
    uri: URL,
    headers: {'Content-type': 'application/json'},
    json: data
  }, function(err, req, data){
    if (err) {
      return true
    }
    return false
  });
}

module.exports = transmitter;