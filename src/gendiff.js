const doParse = require("../parsers/parser1.js");

function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function compareObjects(obj1, obj2) {
    const output = {};

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = Array.from(new Set([...keys1, ...keys2])).sort();

    for (const key of allKeys) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (!obj2.hasOwnProperty(key)) {
            output[`- ${key}`] = value1;
        } else if (!obj1.hasOwnProperty(key)) {
            output[`+ ${key}`] = value2;
        } else if (isObject(value1) && isObject(value2)) {
            const nestedOutput = compareObjects(value1, value2);
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

function compareFiles(file1, file2) {
    if (isObject(file1) && isObject(file2)) {
        return compareObjects(file1, file2);
    } else {
        return {
            '-': file1,
            '+': file2
        };
    }
}

function gendiff(info) {
    let output = {};

    if (info[0] == undefined || info[1] == undefined) return output;
    if (info[0] == info[1]) return output;

    const file1 = doParse(info[0]);
    const file2 = doParse(info[1]);

    if (file1 !== undefined && file2 !== undefined) {
        output = compareFiles(file1, file2);
    }

    console.dir(output, {depth: 15});
    return output;
}

module.exports = gendiff;