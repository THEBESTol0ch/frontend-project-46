#!/usr/bin/env node

const { program } = require('commander');

program
	.usage('[options] <filepath1> <filepath2>')
	.description('Compares two configuration files and shows a difference.')
	.option('-V, --version', 'output the version number')
	.helpOption('-h, --help', 'display help for command')
	.option('-f, --format <type>', 'output format')
	.parse(process.argv);

const fs = require('fs');

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
