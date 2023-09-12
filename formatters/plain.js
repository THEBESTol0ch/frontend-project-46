const { isObject } = require("../src/gendiff.js");

function compareObjects(obj1, obj2, path = '') {
    const output = [];

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = Array.from(new Set([...keys1, ...keys2])).sort();

    for (const key of allKeys) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        const currentPath = path ? `${path}.${key}` : key;

        if (!obj2.hasOwnProperty(key)) {
            output.push(`Property '${currentPath}' was removed`);
        } else if (!obj1.hasOwnProperty(key)) {
            output.push(`Property '${currentPath}' was added with value: ${formatValue(value2)}`);
        } else if (isObject(value1) && isObject(value2)) {
            const nestedOutput = compareObjects(value1, value2, currentPath);
            output.push(...nestedOutput);
        } else if (value1 !== value2) {
            output.push(`Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`);
        }
    }

    return output;
}

function compareFiles(file1, file2) {
    if (isObject(file1) && isObject(file2)) {
        return compareObjects(file1, file2);
    } else {
        return [];
    }
}

function formatValue(value) {
    if (isObject(value)) {
        return '[complex value]';
    } else if (typeof value === 'string') {
        return `'${value}'`;
    } else {
        return value;
    }
}

module.exports = compareFiles;