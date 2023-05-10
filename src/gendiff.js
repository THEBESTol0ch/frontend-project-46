const fs = require("fs");

function gendiff(info) {
    let output = {};

    if (info[0] == undefined || info[1] == undefined) return output;
    if (info[0] == info[1]) return output;
    if (info[0].endsWith(".json") && info[1].endsWith(".json")) {
        const file1 = JSON.parse(fs.readFileSync(info[0]));
        const file2 = JSON.parse(fs.readFileSync(info[1]));

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
    }

    console.log(output);
    return output;
}

module.exports = gendiff;