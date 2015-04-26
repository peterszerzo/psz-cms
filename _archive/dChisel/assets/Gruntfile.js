module.exports = function(grunt) {

    var name, latest,
        bannerContent,
        devRelease, minRelease,
        sourceMap, sourceMapUrl, lDevRelease, lMinRelease,
        lSourceMapMin, sourceFiles, ownSourceFiles, thirdPartySourceFiles;

    ownSourceFiles = [

        'script/src/setup.js',
        'script/src/modal.js',
        //'script/src/formValidateScript.js',
        'script/src/playPBA.js',

    ];

    thirdPartySourceFiles = [

        'script/src/jquery-2.1.1.js',
        'script/src/processing.js'

    ];

    sourceFiles = thirdPartySourceFiles.concat(ownSourceFiles);


    latest = '<%= pkg.name %>';
    name = '<%= pkg.name %>-v<%= pkg.version%>';

    bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        ' *  Copyright: <%= pkg.author %>, 2014 */\n\n';

    devRelease = 'script/build/' + name + '.js';
    minRelease = 'script/build/' + name + '.min.js';

    sourceMapMin = 'script/build/' + name + '.min.js.map';
    sourceMapUrl = 'script/' + name + '.min.js.map';

    lDevRelease = 'script/build/' + latest + '.js';
    lMinRelease = 'script/build/' + latest + '.min.js';
    lSourceMapMin = 'script/build/' + latest + '.min.js.map';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {

            development: {
                src: devRelease,
                dest: lDevRelease
            },

            minified: {
                src: minRelease,
                dest: lMinRelease
            },

            smMinified: {
                src: sourceMapMin,
                dest: lSourceMapMin
            }

        },


        uglify: {

            options: {

                banner: bannerContent,
                sourceMapRoot: '../',
                sourceMap: sourceMapMin,
                sourceMappingURL: sourceMapUrl

            },

            target: {
                src: sourceFiles,
                dest: minRelease
            }

        },


        concat: {

            options: {

                banner: bannerContent

            },

            target: {

                src: sourceFiles,
                dest: devRelease

            }

        },


        jshint: {

            options: {

                trailing: true,
                eqeqeq: true

            },

            target: {

                src: ownSourceFiles

            }

        },


        jsbeautifier: {

            files: ["script/src/**/*.js", "Gruntfile.js"],
            options: {}

        },

        sass: {

            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'style/main.css': 'style/main.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['jsbeautifier', 'jshint', 'concat', 'uglify', 'copy', 'sass']);
    grunt.registerTask('s', ['sass']);

};
