module.exports = function(options = {all: "section"}) {
	return function(files, metalsmith, done) {
		const jsdom = require('jsdom').JSDOM;
		Object.keys(files).filter(f => f.endsWith(".html")).forEach(function(filename) {
			let html = new jsdom(files[filename].content);
			
			["h1", "h2", "h3", "h4", "h5", "h6"].forEach(function(h) {
				let wrapper = options.h || options.all;
				html.window.document.querySelectorAll(h)
			});
		});
	};
};