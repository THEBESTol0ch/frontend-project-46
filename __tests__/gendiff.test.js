const gendiff = require("../src/gendiff.js");

const expectedOutput1 = {
  '  host': 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '- follow': false,
  '+ verbose': true,
};

const expectedOutput2 = {
  '  common': {
    '+ follow': false,
    '  setting1': 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': null,
    '+ setting4': 'blah blah',
    '+ setting5': { key5: 'value5' },
    '  setting6': {
      '  doge': { '- wow': '', '+ wow': 'so much' },
      '  key': 'value',
      '+ ops': 'vops'
    }
  },
  '  group1': {
    '- baz': 'bas',
    '+ baz': 'bars',
    '  foo': 'bar',
    '- nest': { key: 'value' },
    '+ nest': 'str'
  },
  '- group2': { abc: 12345, deep: { id: 45 } },
  '+ group3': { deep: { id: { number: 45 } }, fee: 100500 }
};

describe('gendiff', () => {
  it('should output correct difference between two JSON files', () => {
    const fakeArgv = [
      'C:\\CCARF',
      '',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file2.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual(expectedOutput1);
  });

  it('should output correct difference between two yaml files', () => {
    const fakeArgv = [
      'C:\\Program Files\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\frontend-project-46\\gendiff',
      '__tests__/fixtures/file1.yaml',
      '__tests__/fixtures/file2.yml'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual(expectedOutput1);
  });

  it('should output correct difference between two cross format files', () => {
    const fakeArgv = [
      '',
      'Some Text',
      '__tests__/fixtures/file1.yaml',
      '__tests__/fixtures/file2.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual(expectedOutput1);
  });

  it('should return an empty object for one JSON file', () => {
    const fakeArgv = [
      'C:\\Programs',
      'D:\\Locker\\Projects',
      '__tests__/fixtures/file1.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual({});
  });

  it('should return an empty object for one incorrect file format', () => {
    const fakeArgv = [
      'C:\\Program Files\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\frontend-project-46\\gendiff',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file2.txt'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual({});
  });

  it('should return an empty object for two identical JSON files', () => {
    const fakeArgv = [
      'B:\\Dev\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\some\\path',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file1.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual({});
  });

  it('should output correct difference between two large json files', () => {
    const fakeArgv = [
      'B:\\Roblox\\nodejs\\node.exe',
      'D:\\Chmod\\bruh\\some\\path',
      '__tests__/fixtures/large-file1.json',
      '__tests__/fixtures/large-file2.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual(expectedOutput2);
  });
});