#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Quickly check if a domain is active on GSuite (directly or as an alias in some other account)
const node_fetch_1 = __importDefault(require("node-fetch"));
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
commander_1.program.version(package_json_1.version);
commander_1.program.description(`Checks if domain had gsuite by visiting https://www.google.com/a/\${domain}/DomainContact

Exit Codes:
  1 - No GSuite
  0 - GSuite available`);
commander_1.program.arguments("<domain>").action(main);
commander_1.program.parse(process.argv);
/**
 * Main
 */
async function main(domain) {
    let r = await node_fetch_1.default(`https://www.google.com/a/${domain}/DomainContact`);
    let data = await r.text();
    if (/Server error/i.test(data)) {
        process.exitCode = 1;
        console.log("Nope 👎");
    }
    else {
        process.exitCode = 0;
        console.log("Yup ✨");
    }
}
