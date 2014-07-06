/*
 * grunt-image-size
 *
 * Copyright (c) 2014 SAPer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var path = require('path');
	var chalk = require('chalk');
	var sizer = require('image-size');
	var types = [
		'.png',
		'.gif',
		'.bmp',
		'.psd',
		'.jpg',
		'.tiff',
		'.webp'
	];

	grunt.registerMultiTask('image_size', 'retrieve image saze information', function() {
		var options = this.options({
			configObject : ''
		});

		this.files.forEach(function (file) {
			if ((!options.configObject || !options.configObject.length) && !file.dest) {
				grunt.fail.warn('Neither options.configObject nor dest specified for this task.');
				return;
			}

			var output = [];
			file.src.forEach(function (src) {
				if (grunt.file.exists(src) && grunt.file.isFile(src) && types.indexOf(path.extname(src).toLowerCase()) !== -1) {
					var dimensions = sizer(src);
					output.push({
						name : src,
						width : dimensions.width,
						height : dimensions.height
					});

					grunt.verbose.writeln('dimensions of ' + src + ' width: ' + dimensions.width.toString() + ', height: ' + dimensions.height.toString());
				}
			});

			if (options.configObject && options.configObject.length) {
				grunt.config.set(options.configObject, output);
			}

			if (file.dest) {
				grunt.file.write(file.dest, JSON.stringify(output));
				grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');
			}
		});
	});
};
