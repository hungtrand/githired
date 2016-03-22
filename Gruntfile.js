module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
	    , browserify: {
		    js: {
                src: "client/app_dev.js"
                , dest: "client/app.js"
            }
	    }

        , clean: {
            contents: ['public/*']
        }

        , copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'client/',
                src: ['**/*.html', '**/*.css', '**/*.png', '**/*.ico', '**/*.png', '**/*.json', '**/*.ttf', '**/*.woff', '**/*.woff2', 'lib/**'],
                dest: 'public'
            }
        }

        , watch: {
            files: ['client/**/*.js', '!client/app.js']
            , tasks: ['browserify']
        }

        , uglify: {
            my_target: {
                files: {
                    "public/app.js": ["client/app.js"]
                }
            }
        }
    })

	grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-contrib-copy');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify', 'copy', 'uglify']);
}
