module.exports = function(options = {all: "section"}) {
	return function(files, metalsmith, done) {
		const jsdom = require('jsdom').JSDOM;
		Object.keys(files).filter(f => f.endsWith(".html")).forEach(function(filename) {
			let doc = new jsdom(files[filename].content).window.document;
			
			["h1", "h2", "h3", "h4", "h5", "h6"].forEach(function(headingTag) {
				let wrapper = options[headingTag] || options.all;
				if(!wrapper) return;
				
				let headings = Array.from(doc.querySelectorAll(headingTag)).forEach(function(heading) {
					let pile = [heading];
					
					let sibling = heading.nextElementSibling;
					while(sibling != undefined || sibling.tagName != headingTag) {
						pile.push(sibling);
						sibling = sibling.nextElementSibling;
					} 
					
					// Create a container before the start of the pile and then move the pile into it
				});
			});
		});
	};
};