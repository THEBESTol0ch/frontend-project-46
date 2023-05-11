const gendiff = require("../src/gendiff.js");

describe('gendiff', () => {
  it('should output correct difference between two JSON files', () => {
    const expectedOutput = {
      '  host': 'hexlet.io',
      '- timeout': 50,
      '+ timeout': 20,
      '- proxy': '123.234.53.22',
      '- follow': false,
      '+ verbose': true,
    };
    const fakeArgv = [
      'C:\\Program Files\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\frontend-project-46\\gendiff',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file2.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual(expectedOutput);
  });

  it('should return an empty object for one JSON file', () => {
    const fakeArgv = [
      'C:\\Program Files\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\frontend-project-46\\gendiff',
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
      'C:\\Program Files\\nodejs\\node.exe',
      'D:\\Locker\\Projects\\frontend-project-46\\gendiff',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file1.json'
    ];
    expect(gendiff(fakeArgv.slice(2))).toEqual({});
  });
});