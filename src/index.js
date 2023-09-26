import fs from 'fs';
import path from 'path';
import doParse from './parser.js';
import stylishDiff from './formatters/stylish.js';
import plainDiff from './formatters/plain.js';

const gendiff = (filePath1, filePath2, format = "stylish") => {
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
    const outputPath = "src/formatters/output.json";
    fs.writeFile(outputPath, resultJSON, (err) => {
        if (err) {
            console.error('Error writing to output.json:', err);
        }
    });

    return result;
}

export default gendiff;