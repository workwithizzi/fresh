document.addEventListener('DOMContentLoaded', function(event) {
	// console.log(window.location.pathname);
	var links = document.getElementsByTagName('a');
	for (var i = 0, l = links.length; i < l; i++) {
		var link = links[i];
		// basically a.href attribute have a full uri when the site is running
		// so there are 2 ways to implement it

		// 1 delete all the stuff before actual local href
		// for example http://localhost:3000/demo-html/text.html will be /demo-html/text.html
		// var href = link.href.replace(/^.*\/\/[^\/]+/, '');
		// if (href === window.location.pathname) {
		// add class to the <a> tag
		// console.log(window.location.pathname);
		// 	links[i].className += ' is-current-page';
		// }

		// 2 use the href prop over pathname, as href gives the full uri
		var href = link.href;
		if (href === window.location.href) {
			// add class to the <a> tag
			// console.log(window.location.pathname);
			links[i].className += ' is-current-page';
		}
	}
});

// if (location.pathname == '/') {
// 	console.log('Home Page');
// }

// document.addEventListener('DOMContentLoaded', function(event) {
// 	var path = location.pathname;
// 	var links = document.getElementsByTagName('a');
// 	for (var i = 0, l = links.length; i < l; i++) {
// 		var link = links[i];
// 		console.log(link);
// 	}
// });

// document.addEventListener('DOMContentLoaded', function(event) {
// 	var path = location.pathname;
// 	var links = document.getElementsByTagName('a');
// 	for (var i = 0, l = links.length; i < l; i++) {
// 		var link = links[i];
// 		if (link == path) console.log(link);
// 	}
// });
