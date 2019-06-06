// Primary Navigation Component
//
// Toggles '.is-active' class for '#js-nav' and '#js-toggle-menu' button
// Toggles 'area-expanded' attribute for '#js-toggle-menu' button
// ------------------------------------------------------------------

// Nav <button> for "Click" action
var navBtn = document.getElementById('js-toggle-menu');
// Nav component for styling on button click
var navMain = document.getElementById('js-nav');
// Text or icon inside the Nav <button> depending on current state
var toggleClose = document.querySelector('.nav__toggle--close');
var toggleOpen = document.querySelector('.nav__toggle--open');



// Nav Button Interactions
navBtn.onclick = function () {
	// If the button 'is-active', then onClick:
	if (-1 !== navBtn.className.indexOf('is-active')) {

		// Remove 'is-active' class from '#js-toggle-menu' button
		// Set 'aria-expanded' to false
		navBtn.classList.toggle('is-active');
		navBtn.setAttribute('aria-expanded', 'false');

		// Removes ".u_hidden" class from ".nav__toggle--close"
		toggleClose.classList.toggle('u_hidden');
		// Adds ".u_hidden" class to ".nav__toggle--open"
		toggleOpen.classList.toggle('u_hidden');

		// Remove 'is-active' class from '#js-nav'
		navMain.classList.toggle('is-active');


		// If the button is not 'is-active', then onClick:
	} else {
		// Add 'is-active' class to '#js-toggle-menu' button
		// Set 'aria-expanded' to true
		navBtn.classList.toggle('is-active');
		navBtn.setAttribute('aria-expanded', 'true');

		// Adds ".u_hidden" class to ".nav__toggle--close"
		toggleClose.classList.toggle('u_hidden');
		// Removes ".u_hidden" class from ".nav__toggle--open"
		toggleOpen.classList.toggle('u_hidden');

		// Add 'is-active' class to '#js-nav'
		navMain.classList.toggle('is-active');

	}
};




// ------------------------------------------------------------------

// Add this to your SASS for a quick test:
// #js-toggle-menu
// 	background-color: blue
// 	&.is-active
// 		background-color: seagreen
//
// #js-nav
// 	background-color: lighten(blue, 20%)
// 	&.is-active
// 		background-color: lighten(seagreen, 20%)
