const doParse = require("../parsers/parser1.js");

function gendiff(info) {
    let output = {};

    if (info[0] == undefined || info[1] == undefined) return output;
    if (info[0] == info[1]) return output;
    const file1 = doParse(info[0]);
    const file2 = doParse(info[1]);

    if (file1 !== undefined && file2 !== undefined) {
        for (const key in file1) {
            if (!file2.hasOwnProperty(key)) {
                output[`- ${key}`] = file1[key];
            } else if (JSON.stringify(file1[key]) !== JSON.stringify(file2[key])) {
                output[`- ${key}`] = file1[key];
                output[`+ ${key}`] = file2[key];
            } else {
                output[`  ${key}`] = file1[key];
            }
        }

        for (const key in file2) {
            if (!file1.hasOwnProperty(key)) {
                output[`+ ${key}`] = file2[key];
            }
        }

        console.log(output);
    }

    return output;
}

module.exports = gendiff;