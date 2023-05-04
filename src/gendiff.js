import fs from 'fs';

function gendiff() {
    const args = process.argv.slice(2);
    const [path1, path2] = args;

    const file1 = JSON.parse(fs.readFileSync(path1));
    const file2 = JSON.parse(fs.readFileSync(path2));

    const output = {};

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
    return output;
}

export { gendiff };

