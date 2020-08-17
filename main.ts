#!/usr/bin/env node

// Quickly check if a domain is active on GSuite (directly or as an alias in some other account)
import fetch from "node-fetch";
import { program } from "commander";
import { version } from "./package.json";

program.version(version);
program.description(`Checks if domain had gsuite by visiting https://www.google.com/a/\${domain}/DomainContact

Exit Codes:
  1 - No GSuite
  0 - GSuite available`);
program.arguments("<domain>").action(main);
program.parse(process.argv);

/**
 * Main
 */
async function main(domain: string): Promise<void> {
  let r = await fetch(`https://www.google.com/a/${domain}/DomainContact`);
  let data = await r.text();
  if (/Server error/i.test(data)) {
    process.exitCode = 1;
    console.log("Nope 👎");
  } else {
    process.exitCode = 0;
    console.log("Yup ✨");
  }
}
