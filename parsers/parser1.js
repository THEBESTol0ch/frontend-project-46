const fs = require("fs");
const yaml = require("js-yaml");

function doParse(file) {
    if (file.endsWith(".json")) {
        const newfile = JSON.parse(fs.readFileSync(file));
        return newfile;
    }
    if (file.endsWith(".yml") || file.endsWith(".yaml")) {
        const newfile = yaml.load(fs.readFileSync(file));
        return newfile;
    }

    return undefined;
}

module.exports = doParse;