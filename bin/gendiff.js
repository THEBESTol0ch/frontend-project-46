#!/usr/bin/env node

const { program } = require("commander");
const { gendiff } = require("../src/index.js");

program
	.version("0.1.0")
	.description('Compares two configuration files and shows a difference.')
	.option("-f, --format [type]", "output format", "stylish")
	.arguments("<filePath1> <filePath2>")
	.action((filePath1, filePath2) => {
		console.log(gendiff(filePath1, filePath2, program.opts().format));
	})
	.parse(process.argv);