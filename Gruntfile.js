module.exports = function(grunt) 
{
	grunt.initConfig(
	{
		globalConfig: {
			serverDir: "D:/xampp/htdocs/stia"
		},
	
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
				},
				options:
				{
					browserifyOptions:
					{
						debug: true
					}
				}
			}
		},
		copy : {
			main: {
				options: {
					banner: "/*! <%= globalConfig.serverDir %> */\n"
				},
				files: [
					{expand: true, src: ["./build/**"], dest: "<%= globalConfig.serverDir %>/"},
					{expand: true, src: ["./external/**"], dest: "<%= globalConfig.serverDir %>/"},
					{src: "./index.html", dest: '<%= globalConfig.serverDir %>/index.html'}
				]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint")
	grunt.loadNpmTasks("grunt-contrib-copy")
	grunt.loadNpmTasks("grunt-browserify")

	grunt.registerTask("default", ["jshint","browserify"])
	grunt.registerTask("deploy", ["jshint", "browserify", "copy:main"])
};