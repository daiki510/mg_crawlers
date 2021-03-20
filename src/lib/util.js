const { createNoSubstitutionTemplateLiteral } = require("typescript");

/**
 * チャプタータイトルよりNoを取得する
 * @param {String} text 対象のチャプターの名前
 * @return {String} チャプターNo
 */
const getChapterNo = text => {
  const regex = /(?<=【第)(\d+)(?=話】)/g;
  const results = text.match(regex);
  return results ? results[0] : '';
}

const toUnderscoreCase = str => {
  return str.split(/(?=[A-Z])/).join('_').toLowerCase()
}

const toUnderscoreCaseObject = obj => {
  const result = {}
  Object.keys(obj).forEach(key => {
    result[toUnderscoreCase(key)] = obj[key]
  })
  return result
}

module.exports = {
  getChapterNo: getChapterNo,
  toUnderscoreCase: toUnderscoreCase,
  toUnderscoreCaseObject: toUnderscoreCaseObject
}