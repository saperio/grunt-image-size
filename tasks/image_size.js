/*
 * grunt-image-size
 *
 * Copyright (c) 2014 SAPer
 * Licensed under the MIT license.
 */

'use strict';

const { cyan } = require('chalk');
const sizer = require('image-size');

module.exports = ({
  registerMultiTask,
  log,
  verbose,
  file: { isFile, write },
  config,
  util: { pluralize }
}) =>
  registerMultiTask(
    'image_size',
    'Retrieve images size information',
    function() {
      const {
        configObject,
        processName,
        processEntry,
        processSizes,
        replacer,
        space
      } = this.options({ replacer: null, space: 2 });

      if (!this.files.length) return log.error('No files specified.');

      const shouldSetConfigObject = configObject && configObject.length;
      let processedFiles = 0;

      this.files.forEach(file => {
        if (!file.dest && !shouldSetConfigObject)
          return log.error('No dest file or `configObject` specified.');

        if (!file.src || !file.src.length)
          return log.error(
            `No source files specified for ${cyan(
              file.dest || `\`${configObject}\``
            )}.`
          );

        let sizes = [];

        file.src.forEach(src => {
          if (!isFile(src)) return;

          const { width, height } = sizer(src);
          let name = src;

          if (typeof processName === 'function')
            name = processName.call(file, src, file);

          let entry = { name, width, height };

          if (typeof processEntry === 'function')
            entry = processEntry.call(file, entry, src, file);

          sizes.push(entry);

          verbose.writeln(`Size of ${src} width: ${width}, height: ${height}`);

          processedFiles++;
        });

        if (typeof processSizes === 'function')
          sizes = processSizes.call(file, sizes, file);

        if (shouldSetConfigObject) config.set(configObject, sizes);

        if (file.dest) {
          write(file.dest, JSON.stringify(sizes, replacer, space));

          log.writeln(`File ${cyan(file.dest)} created.`);
        }
      });

      log.ok(
        `${cyan(processedFiles)} ${pluralize(
          processedFiles,
          'file/files'
        )} processed`
      );
    }
  );
