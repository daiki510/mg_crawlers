const util = require('../src/util');

describe('test util', () => {
  it('チャプターNoが正常に取得できる', () => {
    expect(util.getChapterNo('テスト - Raw 【第140話】')).toBe('140');
  });

  it('チャプターNoが取得できない', () => {
    expect(util.getChapterNo('テスト - Raw')).toBe('');
  });
});