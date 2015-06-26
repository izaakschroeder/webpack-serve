
/*
TODO: Consider a timeout?
	// HTTP unavailable.
	return next({ status: 503 });

 */

function ready(compiler, fn) {

	var callbacks = [], state = false;

	function invalidPlugin() {
		state = false;
	}

	function invalidAsyncPlugin(compiler, callback) {
		invalidPlugin();
		callback();
	}

	compiler.plugin('invalid', invalidPlugin);
	compiler.plugin('watch-run', invalidAsyncPlugin);
	compiler.plugin('run', invalidAsyncPlugin);

	compiler.plugin('done', function() {
		state = true;
		// execute callback that are delayed
		var cbs = callbacks;
		callbacks = [];
		cbs.forEach(function(cb) {
			cb();
		});
	});

	// wait for bundle valid
	return function ready(fn, req) {
		if(state) return fn();
		callbacks.push(fn);
	}

}

module.exports = ready;
