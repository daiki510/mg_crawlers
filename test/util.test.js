const util = require('../src/lib/util');

describe('test getChapterNo', () => {
  it('チャプターNoが正常に取得できる', () => {
    expect(util.getChapterNo('テスト - Raw 【第140話】')).toBe('140');
  });

  it('チャプターNoが取得できない', () => {
    expect(util.getChapterNo('テスト - Raw')).toBe('');
  });
});

describe('test toUnderscoreCase', () => {
  it('スネークケースに変換できること', () => {
    const str = 'chapterOrg'
    expect(util.toUnderscoreCase(str)).toBe('chapter_org');
  });
  it('キャメルケースでない場合も対応できること', () => {
    const str = 'title'
    expect(util.toUnderscoreCase(str)).toBe('title');
  });
  it('もともとスネークケースの場合も対応できること', () => {
    const str = 'chapter_org'
    expect(util.toUnderscoreCase(str)).toBe('chapter_org');
  });
});

describe('test toUnderscoreCaseObject', () => {
  it('オブジェクトをスネークケースに変換できること', () => {
    const obj = {
      title: 'テスト',
      chapterOrg: '・テスト - Raw 【第1話】',
      chapterNo: '1',
      chapterUrl: 'https://test.com/test1',
      detailUrl: 'https://test.com/test2',
    }
    const expectObj = {
      title: 'テスト',
      chapter_org: '・テスト - Raw 【第1話】',
      chapter_no: '1',
      chapter_url: 'https://test.com/test1',
      detail_url: 'https://test.com/test2'
    }
    expect(util.toUnderscoreCaseObject(obj)).toEqual(expectObj);
  });
});