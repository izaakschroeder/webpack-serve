
var _ = require('lodash');
var Router = require('express/lib/router');

function group(compiler) {
	var compilers = _.has(compiler, 'compilers') ? compiler.compilers : [compiler];
	return _.groupBy(compilers, function(compiler) {
		if (compiler.options.target === 'node') {
			return 'middleware';
		} else if (compiler.options.target === 'web') {
			return 'files';
		} else {
			return 'other';
		}
	});
}

var handlers = {

	// Use middleware
	middleware: function(compiler, options) {
		_.forEach(modules, function(module) {
			require(modules);
		});
	},

	// Serve files
	files: function(compiler, options) {
		return serveStatic(compiler.options.output.path, {
			fs: compiler.outputFileSystem,
			fallthrough: false
		})
	}
}

function router(groups, options) {
	var router = new Router();

	_.forEach(groups, function(group, key) {
		_.forEach(group, function(compiler) {
			// Create the middleware.
			var middleware = handlers[key](compiler, options);
			// Only ever invoke the middleware once the compiler is ready.
			middleware = ready(compiler, middleware);
			// Inject it where it's supposed to go.
			router.use(compiler.options.output.publicPath || '/', middleware);
		});
	});

	return router;
}

function setup(compiler, options) {
	return router(group(compiler), options);
}

module.exports = setup;
