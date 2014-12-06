
module.exports = {
  
  parseArgs: function(argv) {
    var settings = {};

    var args = [].slice.call(argv, 2);

    settings.command = args[0];
    settings.directories = args.slice(1);

    if (!settings.directories.length) {
      settings.directories.push('.');
    }

    return settings;
  }
};