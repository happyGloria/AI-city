module.exports = function(grunt){
	// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除文件，文件夹
    clean:{
      all: 'build/**',
      css: ['template/css/all.css', 'template/css/all.min.css']
    },
    //代码合并(应包含三个部分，js, css, image)
    concat: {
      option: {
        separator: ';',
        stripbanners: true,//是否去除文件中的注释
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      one: {
        src: ['template/css/*.css'],
        dest: 'template/css/all.css'
      },
      two: {
       // src: 'build/js/**',
        //dest: 'build/js/main1.js'
      }
    },
    //压缩js代码
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //src: 'build/js/main1.js',
       // dest: 'build/js/main2.js'
      }
    },
    //压缩css代码
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          //'template/css/all.min.css': 'template/css/all.css'
        }
      }
    },
    //检查js语法错误 
    jshint: {
      build: ['Gruntfile.js', 'js/template/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //复制文件夹
    copy: {
      main: {
        files: [
          {
            //expand: true,
            //src:['css/**', 'html/**','js/**','img/**','lib/**','index.html'],
            //dest: 'build/'
          }
        ]
      }
    },
    //实时监控文件变化
    watch: {
      build: {
        //files: ['js/*.js', 'css/*.css'],
        //tasks: ['jshint','uglify'],
        //options: {spawn: false}
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat']);
};