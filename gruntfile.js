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
        expandedNestedWithDefaults: '<%= path.build.root %>/expandedNestedWithDefaults'
        // withError: '<%= path.build.root %>/withError.json'
      }
    }
  })

  grunt.loadTasks(grunt.config('path.tasks'))

  grunt.config('image_size', {
    singleWithDefaults: {
      src: '<%= path.source.single %>/*.{svg,png,jpg}',
      dest: '<%= path.build.singleWithDefaults %>'
    },
    multipleWithDefaults: {
      src: '<%= path.source.multiple %>/*.{svg,png,jpg}',
      dest: '<%= path.build.multipleWithDefaults %>'
    },
    nestedWithDefaults: {
      src: '<%= path.source.nested %>/{,**/}*.{svg,png,jpg}',
      dest: '<%= path.build.nestedWithDefaults %>'
    },
    expandedNestedWithDefaults: {
      files: [{
        expand: true,
        cwd: '<%= path.source.nested %>',
        src: ['{,**/}*.{svg,png,jpg}'],
        ext: '.json',
        dest: '<%= path.build.expandedNestedWithDefaults %>'
      }]
    }
    // withError: {
    //   src: '<%= path.source.withError %>/*',
    //   dest: '<%= path.build.withError %>'
    // }
  })

  grunt.config('clean', {
    build: {
      src: ['<%= path.build.root %>/*']
    }
  })

  grunt.registerTask('test', [
    'clean',
    'image_size'
  ])

  return grunt
}
