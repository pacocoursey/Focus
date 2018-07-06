#!/usr/bin/env node
const fs = require('fs-extra');
const Co = require('@pacocoursey/co');
const {
  viewProject,
  newProject,
  help,
  list,
  deleteProject,
  complete,
  file,
} = require('./functions.js');

const { version } = require('../package.json');

// Before setup, ensure ~/.focus file exists
if (!fs.existsSync(file)) {
  fs.ensureFileSync(file);
  fs.writeJSONSync(file, { projects: [] });
}

// CLI parsing
Co.command('view', 'v').action(viewProject);
Co.command('new', 'n').action(newProject);
Co.command('help', ['-h', 'h']).action(help);
Co.command('list', 'l').action(list).setDefault();
Co.command('delete', ['d', 'r', 'remove']).action(deleteProject);
Co.command('finish', ['f', 'c', 'complete']).action(complete);
Co.version(version)
  .command('version', ['-v', '--version'])
  .action(() => { Co.displayVersion(); });
Co.parse();
