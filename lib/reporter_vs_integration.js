define(function () {

	function report (obj) {
		console.log(JSON.stringify(obj));
	}

	function getSuiteStack(node) {
		var stack = [];
		while (node.parent) {
			node = node.parent;

			if (node.title) {
				stack.unshift(node.title);
			}
		}

		return stack;
	}

	var reporter = function (runner) {
		runner.on("pass", function (test) {
			report({
				suite: getSuiteStack(test),
				test: test.title,
				passed: true,
				duration: test.duration
			});
		});

		runner.on("fail", function (test, err) {
			report({
				suite: getSuiteStack(test),
				test: test.title,
				passed: false,
				duration: test.duration,
				error: err
			});
		});

		runner.on("end", function () {
			report({
				close: true
			});
		});
	}

	return reporter;
});
