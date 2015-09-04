#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./build/development";
var watchFiles = [
	baseDir + "/js/*.js",
	baseDir + "/css/*.css",
	baseDir + "/index.html"
];

var onFilesChanged = function(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
};

var proxyOptions = url.parse("https://test.repository.huygens.knaw.nl");
proxyOptions.route = "/repository/api";
proxyOptions.via = true;

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [proxy(proxyOptions), modRewrite([
			"^/charterportaal/css/(.*)$ /css/$1 [L]",
			"^/charterportaal/js/(.*).js$ /js/$1.js [L]",
			"^/charterportaal/?.*$ /index.html [L]"
		])]
	}
});