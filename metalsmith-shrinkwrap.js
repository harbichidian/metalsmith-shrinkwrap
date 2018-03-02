module.exports = function(options = {all: "section"}) {
	return function(files, metalsmith, done) {
		const JSDOM = require('jsdom').JSDOM;
		Object.keys(files).filter(f => f.endsWith(".html")).forEach(function(filename) {
			let doc = (new JSDOM(files[filename].content)).window.document;
			
			["h1", "h2", "h3", "h4", "h5", "h6"].forEach(function(headingTag) {
				let wrapperTag = options[headingTag] || options.all;
				if(!wrapperTag) return;
				
				let headings = Array.from(doc.querySelectorAll(headingTag)).forEach(function(heading) {
					let pile = [heading];
					
					let sibling = heading.nextElementSibling;
					while(sibling != undefined || sibling.tagName != headingTag) {
						pile.push(sibling);
						sibling = sibling.nextElementSibling;
					} 
					
					let wrapper = doc.createElement(wrapperTag);
					heading.insertAdjacentElement("beforebegin", wrapper);
					pile.forEach(el => wrapper.appendChild(el));
				});
			});
		});
	};
};