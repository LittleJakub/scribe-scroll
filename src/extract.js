#!/usr/bin/env node
/**
 * scribe scrOll — extract text from a .docx document
 *
 * Usage:
 *   node extract.js --input report.docx
 *   node extract.js --input report.docx --format json
 */

const mammoth = require('mammoth');
const fs = require('fs');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);

  if (!args.input) {
    console.error('Error: --input is required');
    process.exit(1);
  }

  const inputPath = args.input;
  const format = args.format || 'text';

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: file not found: ${inputPath}`);
    process.exit(1);
  }

  mammoth.extractRawText({ path: inputPath })
    .then((result) => {
      const text = result.value;
      if (format === 'json') {
        console.log(JSON.stringify(text.split('\n').filter(l => l.trim()), null, 2));
      } else {
        console.log(text);
      }
    })
    .catch((err) => {
      console.error('Error extracting text:', err.message);
      process.exit(1);
    });
}

main();
