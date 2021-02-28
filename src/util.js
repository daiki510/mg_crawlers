/**
 * チャプタータイトルよりNoを取得する
 * @param {String} text 対象のチャプターの名前
 * @return {String} チャプターNo
 */
const getChapterNo = text => {
  const regex = /(?<=【第)(\d+)(?=話】)/g;
  const results = text.match(regex);
  return results[0];
}

module.exports = {
  getChapterNo: getChapterNo
}