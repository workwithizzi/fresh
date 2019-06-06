document.addEventListener('DOMContentLoaded', function () {
	// get all <a> tags
	const links = document.getElementsByTagName('a');
	for (let i = 0, l = links.length; i < l; i++) {
		const link = links[i];
		// get href attribute from <a> tag
		const href = link.href;

		if (href === window.location.href) {
			// add class if href of <a> === current page
			link.className += ' js-is-current';

			const text = link.textContent;
			// Append 'current-page' to link text for the screen reader to read
			// REVIEW: Not sure if this would work with translated pages.
			link.setAttribute('aria-label', text + ', current page')
		}
	}
});


// ------------------------------------------------------------------


// All you need to do for special styling is target the class in CSS. Like:
// .c-nav .js-is-current {
//   background-color: hotpink;
// }
