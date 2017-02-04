module.exports = function(grunt) 
{
	// Project configuration.
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		browserify: 
		{
			dist:
			{
				files:
				{
					'./build/main.js': ["./src/**/*.js"]
				}
			}
		}
	});

	// Load the plugin that provides the "browserify" task.
	grunt.loadNpmTasks('grunt-browserify')

	// Default task(s).
	grunt.registerTask('default', ['browserify']);

};