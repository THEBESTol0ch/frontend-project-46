function setFormat(info) {
    const supportedFormats = ["stylish", "plain"];
    let format = info[1];
    const includesStatus = supportedFormats.includes(format);
    if (includesStatus == false) {
        format = "stylish";
    }

    return format;
}

function formatFiles(file1, file2, format) {
    const compareFiles = require(`./${format}.js`);
    return compareFiles(file1, file2);
}

module.exports = { setFormat, formatFiles };