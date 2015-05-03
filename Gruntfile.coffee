module.exports = (grunt) ->

    script =

        vendor: [
            'assets/vendor/jquery/dist/jquery.js'
            'assets/vendor/d3/d3.js'
        ]

        coffee: [
            'assets/script/src/app.js.coffee'
            'assets/script/src/globe/globe.js.coffee'
        ]


    grunt.initConfig

        pkg: grunt.file.readJSON('package.json')

        coffee: 
            source:
                files: 
                    'assets/script/build/_coffee.js': script.coffee


        concat: 
            options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n' },
            dist: 
                src: script.vendor.concat([ 'assets/script/build/_coffee.js' ]),
                dest: 'public/scripts/site.js'


        uglify: 
            options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n' },
            dist: 
                files: 
                    'public/scripts/site.min.js': 'public/scripts/site.js'


        sass: 
            dist: 
                options: 
                    style: 'compressed'
                files:
                    'public/styles/site.css': 'assets/style/style.scss'


        'gh-pages': 
            options:
                base: ''
            src: [
                'index.html'
                'CNAME'
                'assets/data/**/*'
                'assets/images/**/*'
                'assets/style/style.css'
                'assets/vendor/font-awesome/**/*'
                'assets/script/build/app.js'
                'assets/script/build/app.min.js'
                'projectsites/*.html'
            ]

        watch:
            scripts:
                files: [ script.coffee ]
                tasks: [ 'coffee', 'concat', 'uglify' ]
            style: 
                files: [ 'assets/style/**/*.scss' ]
                tasks: [ 'sass' ]


    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-gh-pages')
    grunt.loadNpmTasks('grunt-contrib-coffee')

    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'sass'])

    grunt.registerTask('style', [ 'sass' ])
    grunt.registerTask('script', [ 'coffee', 'concat', 'uglify' ])

    grunt.registerTask('pg', [ 'gh-pages' ])
    grunt.registerTask('dev', [ 'watch' ])