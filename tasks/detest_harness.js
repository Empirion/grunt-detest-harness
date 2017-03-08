/*
 * grunt-detest-harness
 * https://github.com/Empirion/grunt-detest-harness
 *
 * Copyright (c) 2017 gsmeets
 * Licensed under the MIT license.
 */

'use strict';

var reporters = {
	vs: "node_modules/grunt-detest-harness/lib/reporter_vs_integration.js"
};

var harnesses = {
	mocha: "node_modules/grunt-detest-harness/lib/testharness_mocha.html"
};

function toFilePath( baseUrl, file ) {
	if ( file.substr(-3) !== ".js" ) {
		return baseUrl + file + ".js";
	}
	return file;
}

function toAmdName( baseUrl, file ) {
	if ( file.substr(-3) === ".js" ) {
		file = file.substr( 0, file.length - 3 );
	}
	if ( file.indexOf( baseUrl ) === 0 ) {
		return file.substr( baseUrl.length );
	}
	return file;
}

module.exports = function (grunt) {
	grunt.registerMultiTask('detest_harness', 'Test harness generator for the Detest test runner.', function () {
		var options = this.options({
			mochaStyle: "bdd",
			harness: "mocha",
			runner: "testrunner.html",
			dependencies: [],
			reporter: "",
			preloads: []
		});

		options.amdBaseUrl = options.amdBaseUrl.substr(-1) === "/" ? options.amdBaseUrl : options.amdBaseUrl + "/";

		if ( options.reporter ) {
			options.reporter = reporters[ options.reporter ] || options.reporter;
		}

		options.harness = harnesses[ options.harness ] || options.harness;

		options.dependencies = options.dependencies
			.map( function ( dep ) {
				return toFilePath( options.amdBaseUrl, dep );
			});

		options.tests = grunt.file
			.expand( options.tests )
			.map( function ( test ) {
				return toAmdName( options.amdBaseUrl, test );
			});

		var contents = grunt.file.read(options.harness);
		var repl = grunt.template.process(contents, { data: options });
		grunt.file.write(options.runner, repl);

		grunt.log.ok();
	});
};
