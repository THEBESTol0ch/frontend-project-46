const fs = require('fs');
const path = require('path');
const doParse = require("./parser1.js");
const { setFormat, formatFiles } = require("../formatters/index.js");

function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function gendiff(info) {
    let format = setFormat(info);
    let filePath1 = info[info.length - 2];
    let filePath2 = info[info.length - 1];
    let output = {};
    if (filePath1 == undefined || filePath2 == undefined) return output;
    if (filePath1 == filePath2) return output;

    const file1 = doParse(filePath1);
    const file2 = doParse(filePath2);

    if (file1 !== undefined && file2 !== undefined) {
        output = formatFiles(file1, file2, format);
    }

    if (format == "json") {
        const resultJSON = JSON.stringify(output);
        const outputPath = path.join(__dirname, "../formatters/output.json");
        fs.writeFile(outputPath, resultJSON, () => {});
    } else {
        return output;
    }

}

module.exports = { gendiff, isObject };