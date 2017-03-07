/*
 * grunt-detest-harness
 * https://github.com/Empirion/grunt-detest-harness
 *
 * Copyright (c) 2017 gsmeets
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('detest_harness', 'Test harness generator for the Detest test runner.', function() {
	var options = this
		.options({
			mochaStyle: "bdd",
			harness: "testharness.html",
			runner: "testrunner.html",
			dependencies: [],
			interactive: true
		});

		function toAmdName ( file ) {
			if ( file.substr( -3 ) === ".js" ) {
				file = file.substr( 0, file.length -3 );
			}
			if ( file.indexOf( options.amdBaseUrl ) === 0 ) {
				return file.substr( options.amdBaseUrl.length );
			}
			return file;
		}

		options.amdBaseUrl = options.amdBaseUrl.substr( -1 ) === "/" ? options.amdBaseUrl : options.amdBaseUrl + "/";
		options.tests = grunt.file.expand( options.tests ).map( toAmdName );
		
		var contents = grunt.file.read( options.harness );
		var repl = grunt.template.process( contents, { data: options });
		grunt.file.write( options.runner, repl );
		
		grunt.log.ok();
	});

};
