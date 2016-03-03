module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
	    , browserify: {
		    js: {
                src: "client/app.js"
                , dest: "public/app.js"
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
                src: ['**/*.html', '**/*.css', '**/*.png', '**/*.ico', '**/*.png', '**/*.json', 'lib/**'],
                dest: 'public'
            }
        }

        , uglify: {
            my_target: {
                files: {
                    "public/app.js": ["public/app.js"]
                }
            }
        }
    })

	grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-contrib-copy');    
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'copy', 'uglify']);
}
