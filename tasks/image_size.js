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

      var processedFiles = 0;

      this.files.forEach(function(file) {
        if (!file.src.length)
          return grunt.log.error(
            'No source files specified for ' + chalk.cyan(dest) + '.'
          );

        if (!file.dest) return grunt.log.error('No dest file specified.');

        var sizes = [];

        file.src.forEach(function(src) {
          if (!grunt.file.isFile(src)) return;

          var size = sizer(src);

          sizes.push({ name: src, width: size.width, height: size.height });

          grunt.verbose.writeln(
            'Size of ' +
              src +
              ' width: ' +
              size.width.toString() +
              ', height: ' +
              size.height.toString()
          );

          processedFiles++;
        });

        if (options.configObject && options.configObject.length) {
          grunt.config.set(options.configObject, sizes);
        }

        grunt.file.write(file.dest, JSON.stringify(sizes));
        grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');
      });

      grunt.log.ok(
        chalk.cyan(processedFiles) +
          ' ' +
          grunt.util.pluralize(processedFiles, 'file/files') +
          ' processed'
      );
    }
  );
};
