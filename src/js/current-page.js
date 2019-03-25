document.addEventListener('DOMContentLoaded', function() {
	// get all <a> tags
	const links = document.getElementsByTagName('a');
	for (let i = 0, l = links.length; i < l; i++) {
		const link = links[i];

		// basically a.href attribute have a full uri when the site is running
		// so there are 2 ways to implement it

		// 1 delete all the stuff before actual local href
		// for example http://localhost:3000/demo-html/text.html will be /demo-html/text.html
		// var href = link.href.replace(/^.*\/\/[^\/]+/, '');
		// if (href === window.location.pathname) {
		// add class to the <a> tag
		// console.log(window.location.pathname);
		// 	link.className += ' is-current-page';
		// }

		// 2 use the href prop over pathname, as href gives the full uri
		// get href attribute from <a> tag
		const href = link.href;

		// if href of <a> tag is the same as rendered by the browser
		if (href === window.location.href) {
			// add class to the <a> tag
			link.className += ' is-current-page';
		}
	}
});
