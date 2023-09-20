function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function compareO(o1, o2) {
  const output = {};
  const allKeys = Array.from(new Set([...Object.keys(o1), ...Object.keys(o2)])).sort();

  for (const key of allKeys) {
      const value1 = o1[key];
      const value2 = o2[key];

      if (!o2.hasOwnProperty(key)) {
          output[`- ${key}`] = value1;
      } else if (!o1.hasOwnProperty(key)) {
          output[`+ ${key}`] = value2;
      } else if (isObject(value1) && isObject(value2)) {
          const nestedOutput = compareO(value1, value2);
          if (Object.keys(nestedOutput).length > 0) {
              output[`  ${key}`] = nestedOutput;
          }
      } else if (JSON.stringify(value1) !== JSON.stringify(value2)) {
          output[`- ${key}`] = value1;
          output[`+ ${key}`] = value2;
      } else {
          output[`  ${key}`] = value1;
      }
  }

  return output;
}

function stylishDiff(file1, file2) {
  if (isObject(file1) && isObject(file2)) {
      return compareO(file1, file2);
  } else {
      return {
          '-': file1,
          '+': file2
      };
  }
}
  
module.exports = stylishDiff;