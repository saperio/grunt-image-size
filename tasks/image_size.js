/*
 * grunt-image-size
 *
 * Copyright (c) 2014 SAPer
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var chalk = require('chalk');
var sizer = require('image-size');

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'image_size',
    'Retrieve images size information',
    function() {
      var options = this.options({
        configObject: ''
      });

      if (!this.files.length && !options.configObject.length) {
        return grunt.log.error('No files or `options.configObject` specified.');
      }

      this.files.forEach(function(file) {
        if (!file.src.length)
          return grunt.log.error(
            'No source files specified for ' + chalk.cyan(dest) + '.'
          );
        if (!file.dest) return grunt.log.error('No dest file specified');

        var output = [];

        file.src.forEach(function(src) {
          if (!grunt.file.isFile(src)) return;

          var dimensions = sizer(src);

          output.push({
            name: src,
            width: dimensions.width,
            height: dimensions.height
          });

          grunt.verbose.writeln(
            'dimensions of ' +
              src +
              ' width: ' +
              dimensions.width.toString() +
              ', height: ' +
              dimensions.height.toString()
          );
        });

        if (options.configObject && options.configObject.length) {
          grunt.config.set(options.configObject, output);
        }

        grunt.file.write(file.dest, JSON.stringify(output));
        grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');
      });
    }
  );
};
