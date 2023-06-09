#!/usr/bin/env node

const { program } = require("commander");
const { gendiff } = require("./src/gendiff.js");

program
	.usage('[options] <filepath1> <filepath2>')
	.description('Compares two configuration files and shows a difference.')
	.option('-V, --version', 'output the version number')
	.helpOption('-h, --help', 'display help for command')
	.option('-f, --format <type>', 'output format')
	.parse(process.argv);

gendiff(process.argv.slice(2));