// Primary Navigation Component
//
// Toggles '.is-active' class for '#js-nav' and '#js-toggle-menu' button
// Toggles 'area-expanded' attribute for '#js-toggle-menu' button
// ------------------------------------------------------------------

// Get the Nav Button for "Click" action
var navBtn = document.getElementById('js-toggle-menu');
// Get the main navigation for styling on button click
var navMain = document.getElementById('js-nav');


// Nav Button Interactions
navBtn.onclick = function () {
	// If the button 'is-active', then:
	if (-1 !== navBtn.className.indexOf('is-active')) {

		// Remove 'is-active' class from '#js-toggle-menu' button
		// and set 'aria-expanded' to false
		navBtn.className = navBtn.className.replace(' is-active', '');
		navBtn.setAttribute('aria-expanded', 'false');

		// Remove 'is-active' class from '#js-nav'
		navMain.className = navMain.className.replace(' is-active', '');

		// If the button is not 'is-active', then:
	} else {
		// Add 'is-active' class to '#js-toggle-menu' button
		// and set 'aria-expanded' to true
		navBtn.className += ' is-active';
		navBtn.setAttribute('aria-expanded', 'true');

		// Add 'is-active' class to '#js-nav'
		navMain.className += ' is-active';

	}
};


// ------------------------------------------------------------------

// Add this to your SASS for a quick test:
// #js-toggle-menu
// 	background-color: blue
// 	&.is-active
// 		background-color: seagreen

// #js-nav
// 	background-color: lighten(blue, 20%)
// 	&.is-active
// 		background-color: lighten(seagreen, 20%)
