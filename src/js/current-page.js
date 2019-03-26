document.addEventListener('DOMContentLoaded', function () {
	// get all <a> tags
	const links = document.getElementsByTagName('a');
	for (let i = 0, l = links.length; i < l; i++) {
		const link = links[i];
		// get href attribute from <a> tag
		const href = link.href;

		// add id if href of <a> === current page
		if (href === window.location.href) {
			link.setAttribute('id', 'js-is-current')
			link.setAttribute('aria-describedby', 'js-a11y-current')
		}
	}
});

// aria - describedby="current"

// 	< div id = "current" > current page</div >
