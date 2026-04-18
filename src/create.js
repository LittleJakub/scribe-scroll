#!/usr/bin/env node
/**
 * scribe scrOll — create a new .docx document from text content
 *
 * Usage:
 *   node create.js --title "Document Title" --content "Paragraph text" --output report.docx
 *   node create.js --title "Report" --content "Line 1\nLine 2\nLine 3" --output doc.docx
 *   node create.js --title "Report" --content "Line 1\nLine 2" --heading-levels "1,2" --output doc.docx
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
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

  if (!args.title) {
    console.error('Error: --title is required');
    process.exit(1);
  }
  if (!args.content) {
    console.error('Error: --content is required');
    process.exit(1);
  }
  if (!args.output) {
    console.error('Error: --output is required');
    process.exit(1);
  }

  // Parse heading levels if provided
  const headingLevels = args.headingLevel
    ? args.headingLevel.split(',').map(l => parseInt(l.trim(), 10))
    : [];

  const lines = args.content.split(/\\n|\n/);
  const children = [];

  lines.forEach((line, idx) => {
    const headingLevel = headingLevels.includes(idx + 1)
      ? HeadingLevel.HEADING_1
      : undefined;

    if (headingLevel) {
      children.push(new Paragraph({
        heading: headingLevel,
        children: [new TextRun(line)],
      }));
    } else {
      children.push(new Paragraph({
        children: [new TextRun(line)],
      }));
    }
  });

  const doc = new Document({
    creator: 'scribe scrOll',
    title: args.title,
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 24, // 12pt in half-points
          },
        },
      },
    },
    sections: [{
      properties: {},
      children: children,
    }],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(args.output, buffer);
    console.log(`Document created: ${args.output}`);
  }).catch((err) => {
    console.error('Error creating document:', err.message);
    process.exit(1);
  });
}

main();
