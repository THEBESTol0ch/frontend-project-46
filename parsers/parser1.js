const fs = require("fs");
const yaml = require("js-yaml");

function doParse(filePath) {
    if (filePath.endsWith(".json")) {
        const newfile = JSON.parse(fs.readFileSync(filePath));
        return newfile;
    }
    if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
        const newfile = yaml.load(fs.readFileSync(filePath));
        return newfile;
    }

    return undefined;
}

module.exports = doParse;