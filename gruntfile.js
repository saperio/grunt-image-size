module.exports = (grunt) => {
  require('jit-grunt')(grunt)

  grunt.initConfig({
    path: {
      tasks: 'tasks',

      source: {
        root: 'tests/fixtures',
        single: '<%= path.source.root %>/single',
        multiple: '<%= path.source.root %>/multiple',
        nested: '<%= path.source.root %>/nested'
        // withError: '<%= path.source.root %>/withError'
      },

      build: {
        root: 'build',
        singleWithDefaults: '<%= path.build.root %>/singleWithDefaults.json',
        multipleWithDefaults: '<%= path.build.root %>/multipleWithDefaults.json',
        nestedWithDefaults: '<%= path.build.root %>/nestedWithDefaults.json',
        expandedNestedWithDefaults: '<%= path.build.root %>/expandedNestedWithDefaults',
        notImage: '<%= path.build.root %>/not-image.json'
      }
    }
  })

  grunt.loadTasks(grunt.config('path.tasks'))

  grunt.config('image_size', {
    singleWithDefaults: {
      src: '<%= path.source.single %>/*',
      dest: '<%= path.build.singleWithDefaults %>'
    },
    multipleWithDefaults: {
      src: '<%= path.source.multiple %>/*',
      dest: '<%= path.build.multipleWithDefaults %>'
    },
    nestedWithDefaults: {
      src: '<%= path.source.nested %>/{,**/}*',
      dest: '<%= path.build.nestedWithDefaults %>'
    },
    expandedNestedWithDefaults: {
      files: [{
        expand: true,
        cwd: '<%= path.source.nested %>',
        src: ['{,**/}*'],
        ext: '.json',
        dest: '<%= path.build.expandedNestedWithDefaults %>'
      }]
    },
    notImage: {
      src: '<%= path.source.notImage %>/*',
      dest: '<%= path.build.notImage %>'
    }
  })

  grunt.config('clean', {
    build: {
      src: ['<%= path.build.root %>/*']
    }
  })

  // This is just for manual testing. It isn't used anywhere
  // Instead, Jest manually calls task which it needs to test
  grunt.registerTask('test', [
    'clean',
    'image_size'
  ])

  return grunt
}
