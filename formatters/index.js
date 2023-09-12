function setFormat(info) {
    const supportedFormats = ["stylish", "plain", "json"];
    let format = info[1];
    const includesStatus = supportedFormats.includes(format);
    if (includesStatus == false) {
        format = "stylish";
    }

    return format;
}

function formatFiles(file1, file2, format) {
    if (format == "json") {
        const compareFiles = require(`./stylish.js`);
        return compareFiles(file1, file2);
    } else {
        const compareFiles = require(`./${format}.js`);
        return compareFiles(file1, file2);
    }
}

module.exports = { setFormat, formatFiles };