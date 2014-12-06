#!/usr/bin/env node

require('colors');

var fs = require('fs');
var exec = require('child_process').exec;

var settings = require('./settings.js').parseArgs(process.argv);


function command(event, file) {
  var skip = false;

  if (event === 'rename' && file === null) {
    skip = true;
  }
  if (file) {
    if (file.indexOf('.TMP') !== -1) { // temp files
      skip = true;
    }
    if (file[0] === '.') { // hidden files
      skip = true;
    }
  }


  // console.log('change'.yellow, arguments, 'running:', command.running, 'skip:', skip);

  if (skip || command.running) return;

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