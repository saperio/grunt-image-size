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

      if (!this.files.length) {
        return log.error('No files specified.');
      }

      const shouldSetConfigObject = configObject && configObject.length;
      const all = this.files.reduce((prev, file) => {
        if (!file.dest && !shouldSetConfigObject) {
          log.error('No dest file or `configObject` specified.');
          return prev;
        }

        if (!file.src || !file.src.length) {
          log.error(
            `No source files specified for ${cyan(
              file.dest || `\`${configObject}\``
            )}.`
          );
          return prev;
        }

        const sizes = file.src.filter(src => isFile(src)).map(src => {
          const { width, height } = sizer(src);

          let name = src;
          if (typeof processName === 'function') {
            name = processName.call(file, src, file);
          }

          let entry = { name, width, height };
          if (typeof processEntry === 'function') {
            entry = processEntry.call(file, entry, src, file);
          }

          verbose.writeln(`Size of ${src} width: ${width}, height: ${height}`);
          return entry;
        });

        if (file.dest) {
          let output = sizes;
          if (typeof processSizes === 'function') {
            output = processSizes.call(file, sizes.slice(), file);
          }

          write(file.dest, JSON.stringify(output, replacer, space));
          log.writeln(`File ${cyan(file.dest)} created.`);
        }

        return prev.concat(sizes);
      }, []);

      if (shouldSetConfigObject) {
        config.set(configObject, all);
      }

      log.ok(
        `${cyan(all.length)} ${pluralize(all.length, 'file/files')} processed`
      );
    }
  );
