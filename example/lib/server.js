var requestHandler = require("./handler.js");

module.exports = function(req, res, next) {
	requestHandler(req, res, next);
}

if (require.main === module) {
	var server = require("http").createServer();
	server.on("request", requestHandler);
	server.listen(process.env.PORT);
}

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept("./handler.js", function() {
        // replace request handler of server
        requestHandler = require("./handler.js");
    });

}
