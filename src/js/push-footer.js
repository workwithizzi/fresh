// Global Footer Component
// Make sure the footer stays at the bottom even when there isn't
// enough content on the page to push it down.
//
//- -----------------------------------------------------------------

function pushFooter() {
	var navHeight = document.getElementById('header').offsetHeight;
	var footerHeight = document.getElementById('footer').offsetHeight;

	// 2DO: Add a test to see if nav (or maybe header?) is 'position: fixed' and remove that elements height from the calculation if it is.
	// If not, then the footer will end up not being pushed down far enough because fixed elements don't affect the DOM flow

	var subtractHeight = navHeight + footerHeight + 'px';

	var calcHeight = `calc(100% - ${subtractHeight})`;

	document.getElementById('main').style.minHeight = calcHeight;
}

pushFooter();

// Run it again if window is resized
window.addEventListener('resize', pushFooter);


// make sure <body> height is defined at 100%
