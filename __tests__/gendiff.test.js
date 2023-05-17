const { gendiff } = require("../src/gendiff.js");

const expectedOutput1 = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true
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

const expectedOutput3 = {
  '-': { foo: { bar: { baz: 42, qux: 'hello' } }, spam: 'eggs' },
  '+': [
    { foo: { bar: { baz: 42, qux: 'world' } }, spam: 'eggs' }
  ]
};

describe('gendiff', () => {
  it('should return expectedOutput1 with correct stylish format', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file2.json'
    ];
    expect(gendiff(fakeArgv)).toEqual(expectedOutput1);
  });

  it('should return expectedOutput1 with incorrect stylish format', () => {
    const fakeArgv = [
      '--format',
      'stylish123',
      '__tests__/fixtures/file1.json',
      '__tests__/fixtures/file2.json'
    ];
    expect(gendiff(fakeArgv)).toEqual(expectedOutput1);
  });

  it('should return expectedOutput2 with correct stylish format', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '__tests__/fixtures/file3.json',
      '__tests__/fixtures/file4.json'
    ];
    expect(gendiff(fakeArgv)).toEqual(expectedOutput2);
  });

  it('should return expectedOutput3 with correct stylish format', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '__tests__/fixtures/file5.json',
      '__tests__/fixtures/file6.json'
    ];
    expect(gendiff(fakeArgv)).toEqual(expectedOutput3);
  });

  it('should return {} with correct stylish format', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '__tests__/fixtures/file1.yaml',
      '__tests__/fixtures/file2.txt'
    ];
    expect(gendiff(fakeArgv)).toEqual({});
  });

  it('should return {} with undefined path', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '',
      '__tests__/fixtures/file2.txt'
    ];
    expect(gendiff(fakeArgv)).toEqual({});
  });

  it('should return {} with equal paths', () => {
    const fakeArgv = [
      '--format',
      'stylish',
      '__tests__/fixtures/file1.yaml',
      '__tests__/fixtures/file1.yaml'
    ];
    expect(gendiff(fakeArgv)).toEqual({});
  });
});