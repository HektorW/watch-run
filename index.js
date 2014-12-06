#!/usr/bin/env node

require('colors');

var fs = require('fs');
var exec = require('child_process').exec;

var settings = require('./settings.js').parseArgs(process.argv);


function command() {
  if (command.running) return;

  command.running = true;

  console.log('Change detected, running command\n'.cyan);

  exec(settings.command, function(error, stdout, stderr) {
    command.running = false;

    if (error) {
      console.error(error);
    } else {
      console.log('Stdout:'.green);
      console.log(stdout);
    }

    console.log('Command finished, watching for changes'.cyan);
  });

}




// Setup
settings.directories.forEach(function(dir) {
  fs.watch(dir, command);
});