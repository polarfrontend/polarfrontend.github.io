module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            main: {
                files: {
                    '_includes/loadcss.js' : ['js/loadcss.js'],
                    'js/prism.min.js' : ['js/prism.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
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

        svgstore: {
            options: {
                prefix : 'icon-',
                svg: {
                    style: 'display: none;'
                }
            },
            default: {
                files: {
                    '_includes/svg-defs.svg': ['svg/*.svg']
                }
            }
        },

        watch: {
            stylesheets: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild']
            },
            javascript: {
                files: ['js/*.js'],
                tasks: ['uglify', 'shell:jekyllBuild']
            },
            site: {
                files: ['index.html', '_layouts/*.html', '_posts/*.md', '_includes/*', '/index.html', '_config.yml'],
                tasks: ['shell:jekyllBuild']
            },
            svg: {
                files: ['svg/*.svg'],
                tasks: ['svgstore', 'shell:jekyllBuild']
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