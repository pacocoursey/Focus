# Focus

Simple CLI project manager, for all those package ideas that pop into your head at 2 AM.

![Focus screenshot](screenshot.png)

## Install

```
$ sudo npm install -g pacocoursey/focus
```

## Usage

```
    🔎  Focus

    Usage:

      focus [<flags>] <command> [<args> ...]

    Flags:

      -h, --help                Output usage information.
      -v, --version             Show application version.

    Commands:

      h, help                   Output usage information.
      n, new                    Create a new project.
      v, view                   View a project's information.
      l, list                   View all project information.
      c, complete               Mark a project as completed.
      f, finish                 Mark a project as completed.
      d, delete                 Delete an existing project.
      r, remove                 Delete an existing project.

    Examples:

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
```
