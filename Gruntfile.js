module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main-unprefixed.css' : 'scss/main.scss'
                }
            }
        },

        autoprefixer: {
            main: {
                src: "css/main-unprefixed.css",
                dest: "css/main.css"
            }
        },

        shell : {
            jekyllServe : {
                command : 'jekyll serve'
            },

            jekyllBuild : {
                command : 'jekyll build'
            }  
        },

        watch: {
            stylesheets: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild']
            },
            site: {
                files: ['index.html', '_layouts/*.html', '_posts/*.md', '_includes/*.html', '/index.html', '_config.yml'],
                tasks: ['shell:jekyllBuild']
            },
            options: {
                spawn : false,
                livereload: true
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    // Define the tasks
    grunt.registerTask('serve', ['shell:jekyllServe']);
    grunt.registerTask('default', ['watch']);
    }