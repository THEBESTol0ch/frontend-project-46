import { gendiff } from '../src/gendiff.js';

describe('gendiff', () => {
  it('should compare two JSON files and output the differences', () => {
    const path1 = './file1.json';
    const path2 = './file2.json';

    const expectedOutput = {
      '- key1': 'value1',
      '+ key2': 'value2',
      '  key3': 'value3',
    };

    expect(gendiff(path1, path2)).toEqual(expectedOutput);
  });

  it('should return an empty object if the JSON files are identical', () => {
    const path1 = './file1.json';
    const path2 = './file1.json';

    const expectedOutput = {};

    expect(gendiff(path1, path2)).toEqual(expectedOutput);
  });
});

