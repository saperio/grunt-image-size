# grunt-image-size

Retrieve image size information. The [image-size](https://github.com/netroy/image-size) port for grunt. 

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-size --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-size');
```

## The "image_size" task

### Overview
This task produces a vector of an image size data from all provided source files:
```js
[
    {
        name : 'path/to/file'
        width : 100,
        height : 100
    },
    ...
]
```
And outputs it to grunt Config Data and/or to dest file (as json).

### Options

#### options.configObject
Type: `String`
Default value: `''`

A string value that is used as a name for grunt config object for outputing data.


### Usage Examples
After processing all images from `img/` script writes size information to `image_data` config object and image_data.json file.

```js
grunt.initConfig({
    image_size: {
        options: {
            configObject : 'image_data'
        },
        files: [{
            src : 'img/*',
            dest : 'image_data.json'
        }]
    }
})
```
From `image_data` it can be accessed with `grunt.config.get('image_data')` or via template `<%= image_data %>`


## License
Copyright (c) 2014 SAPer. Licensed under the MIT license.