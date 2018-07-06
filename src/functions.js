const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const home = require('user-home');
const prompts = require('prompts');
const Table = require('cli-table3');

const { log } = console;
const { initial } = require('./prompts.js');

// Save file
const file = path.join(home, '.focus');

const help = () => {
  log(`
    ${chalk.bold('🔎  Focus')}

    ${chalk.bold('Usage')}:

      focus [<flags>] <command> [<args> ...]

    ${chalk.bold('Flags')}:

      -h, --help\t\tOutput usage information.
      -v, --version\t\tShow application version.

    ${chalk.bold('Commands')}:

      h, help\t\t\tOutput usage information.
      n, new\t\t\tCreate a new project.
      v, view\t\t\tView a project's information.
      l, list\t\t\tView all project information.
      c, complete\t\tMark a project as completed.
      f, finish\t\t\tMark a project as completed.
      d, delete\t\t\tDelete an existing project.
      r, remove\t\t\tDelete an existing project.

    ${chalk.bold('Examples')}:

      Create a new project.
      $ focus new

      View the 'laundry' project.
      $ focus view laundry

      Delete the 'laundry' project.
      $ focus delete laundry

      List all projects.
      $ focus
        or
      $ focus list
  `);
};

const print = (contents) => {
  const { projects } = contents;
  let t1;
  let t2;

  const table = new Table({
    head: ['type', 'name', 'notes', 'priority'],
    wordWrap: true,
    colWidths: [6, 20, 30, 10],
  });

  const table2 = new Table({
    head: ['type', 'name', 'notes', 'priority'],
    wordWrap: true,
    colWidths: [6, 20, 30, 10],
  });

  // Sort by priority
  projects.sort((a, b) => {
    if (a.priority < b.priority) return 1;
    if (a.priority > b.priority) return -1;
    return 0;
  });

  // Populate tables
  projects.forEach((p) => {
    if (p.state === 'active') {
      t1 = true;
      table.push([p.type, p.name, p.notes, p.priority]);
    } else {
      t2 = true;
      table2.push([p.type, p.name, p.notes, p.priority]);
    }
  });

  if (t1) log(`${chalk.bold('\nActive:\n')}${table.toString()}\n`);
  if (t2) log(`${chalk.bold('\nCompleted:\n')}${table2.toString()}\n`);
};

async function list() {
  try {
    const contents = await fs.readJSON(file);
    if (!contents.projects || contents.projects.length === 0) {
      log('\n  No projects. Start one with `focus new`.\n');
    } else {
      print(contents);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function newProject() {
  log('\nLet\'s get focused.\n');
  const response = await prompts(initial);

  if (response.confirm) {
    try {
      const arr = await fs.readJSON(file);
      const { projects } = arr;
      let proj;

      projects.forEach((p) => {
        if (p.name === response.name) proj = p;
      });

      if (proj) {
        log(`\n  ${chalk.red('✖')} Project ${chalk.bold(response.name)} already exists!\n`);
      } else {
        delete response.confirm;
        response.state = 'active';
        projects.push(response);
        await fs.writeJSON(file, arr);
        log(`\n${chalk.green('✔')} Succesfully added ${chalk.bold(response.name)} to your stack.\n`);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

async function deleteProject(name) {
  try {
    const arr = await fs.readJSON(file);
    const { projects } = arr;
    let proj;

    projects.forEach((p) => {
      if (p.name === name) proj = p;
    });

    if (!proj || proj === '') {
      log(`\n  Project ${name} does not exist!\n`);
    } else {
      log('');
      const response = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete ${chalk.bold(name)}?`,
        initial: false,
      });
      if (response.confirm) {
        projects.splice(projects.indexOf(proj), projects.indexOf(proj) + 1);
        await fs.writeJSON(file, arr);
        log(`${chalk.red('✖')} Succesfully deleted ${chalk.bold(name)}.\n`);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function complete(name) {
  try {
    const arr = await fs.readJSON(file);
    const { projects } = arr;
    let proj;

    projects.forEach((p) => {
      if (p.name === name) proj = p;
    });

    if (!proj || proj === '') {
      log(`\n  Project ${name} does not exist!\n`);
    } else {
      log('');
      const response = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Mark ${chalk.bold(name)} as completed?`,
        initial: false,
      });
      if (response.confirm) {
        proj.state = 'complete';
        await fs.writeJSON(file, arr);
        log(`${chalk.red('✔')} Succesfully completed ${chalk.bold(name)}.\n`);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function viewProject(name) {
  try {
    const contents = await fs.readJSON(file);
    const { projects } = contents;

    let found = false;

    projects.forEach((p) => {
      if (p.name === name) {
        found = true;
        const table = new Table({
          head: ['type', 'name', 'notes', 'priority'],
          colWidths: [10, 20, 30, 10],
        });
        table.push([p.type, p.name, 'hey', p.priority]);
        log(`\n${table.toString()}\n`);
      }
    });

    if (!found) { log(`\n  Cannot find project ${chalk.bold(name)}.\n`); }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  file,
  newProject,
  deleteProject,
  viewProject,
  complete,
  help,
  list,
};
