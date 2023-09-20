const fs = require("fs");
const path = require('path');
const doParse = require("../src/parser.js");
const stylishDiff = require("../src/formatters/stylish.js");
const plainDiff = require("../src/formatters/plain.js");

function gendiff(filePath1, filePath2, format) {
    const file1 = doParse(filePath1);
    const file2 = doParse(filePath2);
    let result;

    if (format == "stylish") {
        result = stylishDiff(file1, file2);
    }
    if (format == "plain") {
        result = plainDiff(file1, file2); 
    }
    
    const resultJSON = JSON.stringify(result);
    const outputPath = path.join(__dirname, "formatters/output.json");
    fs.writeFile(outputPath, resultJSON, (err) => {
        if (err) {
            console.error('Error writing to output.json:', err);
        } else {
            console.log('Data has been written to output.json');
        }
    });

    return result;
}

module.exports = { gendiff };