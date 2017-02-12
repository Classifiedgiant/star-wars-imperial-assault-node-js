module.exports = function(grunt) 
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON("package.json"),
		jshint:
		{
			all: ["./src/**/*.js"],
			options:
			{
				eqeqeq: true,
				esversion: 6
			}
		},
		browserify: 
		{
			dist:
			{
				files:
				{
					"./build/main.js": ["./src/**/*.js", "./external/**/*.js"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint")
	grunt.loadNpmTasks("grunt-browserify")

	grunt.registerTask("default", ["jshint","browserify"])

};