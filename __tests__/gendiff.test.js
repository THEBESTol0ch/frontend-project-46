import gendiff from "../src/index.js";
import resultStylish from "../__fixtures__/resultStylish.js";
import resultPlain from "../__fixtures__/resultPlain.js";

describe('gendiff', () => {
  test("json", () => {
    expect(gendiff("__fixtures__/file1.json", "__fixtures__/file2.json")).toStrictEqual(resultStylish);
  });
  test("yaml", () => {
    expect(gendiff("__fixtures__/file1.yaml", "__fixtures__/file2.yaml")).toStrictEqual(resultStylish);
  });
  test("yml", () => {
    expect(gendiff("__fixtures__/file1.yml", "__fixtures__/file2.yml")).toStrictEqual(resultStylish);
  });
});

describe('plain', () => {
  test("json", () => {
    expect(gendiff("__fixtures__/file1.json", "__fixtures__/file2.json", "plain")).toStrictEqual(resultPlain);
  });
  test("yaml", () => {
    expect(gendiff("__fixtures__/file1.yaml", "__fixtures__/file2.yaml", "plain")).toStrictEqual(resultPlain);
  });
  test("yml", () => {
    expect(gendiff("__fixtures__/file1.yml", "__fixtures__/file2.yml", "plain")).toStrictEqual(resultPlain);
  });
});