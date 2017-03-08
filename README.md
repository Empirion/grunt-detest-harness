# grunt-detest-harness

> Test harness generator for the Detest test runner.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-detest-harness --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-detest-harness');
```

## The "detest_harness" task

### Overview
In your project's Gruntfile, add a section named `detest_harness` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  detest_harness: {
   options: {
     // Generic options go here.
	},
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.amdBaseUrl
Type: `String`
Default value: ``

Base url for AMD path. This is used to generate the correct require paths for the test files that are found,
as well as generate the correct physical file paths for AMD paths.
i.e.:

```json
  {
    amdBaseUrl: "Scripts/foo"
  }
```
turns the file `Scripts/foo/lib/bar.js` into AMD path `lib/bar` and vice versa.

#### options.dependencies
Type: `Array`
Default value: `[]`

An array of dependencies that will be inserted into the page as script paths.
Typically this will include the requirejs file, the main application require configuration file,
and the require configuration overrides used during testing.

#### options.harness
Type: `String`
Default value: `mocha`

A built-in harness template, or a file path to a custom defined harness template.

There is currently one built-in harness: `mocha`.

#### options.preloads
Type: `Array`
Default value: `[]`

An array of dependencies that must  be require'd before the unit test files are require'd.
This might be necessary when using plugin loaders that need to have resolved before the tests are being resolved.

#### options.reporter
Type: `String`
Default value: ``

A built-in reporter, or an AMD path to a custom defined reporter.
If no reporter is defined the default (html) reporter is used.

There is currently one built-in reporter: `vs`. This needs to be used in for TFS build integration.

#### options.tests
Type: `File glob`
Default value: ``

A file glob that selects all unit test files that ought to be run.





### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  options: {
		dependencies: [
			"lib/require",
			"require.config",
			"require.test.config"
		],
		tests: [ "Scripts/app/**/*test*.js", "Scripts/test/**/*test*.js" ],
		preloads: [
			"plug!jquery"
		],
		amdBaseUrl: "Scripts"
	},
	dev: {},
	build: {
		options: {
			reporter: "vs"
		}
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
