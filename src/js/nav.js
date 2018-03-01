// Primary Navigation Component
//
// Adds '.is-active' class to '.js-nav' and '.sidebar-active'
// class to '<main>' when '#js-toggle-menu' (nav button) is clicked.
// ------------------------------------------------------------------


// Set button to click.
var navBtn = document.getElementById('js-toggle-menu');

// Click the button.

// Control svg animation of button.
navBtn.onclick = function() {

	// Toggle class "opened". Set also aria-expanded to true or false.
	if (-1 !== navBtn.className.indexOf('is-active')) {
		navBtn.className = navBtn.className.replace(' is-active', '');
		navBtn.setAttribute('aria-expanded', 'false');
	} else {
		navBtn.className += ' is-active';
		navBtn.setAttribute('aria-expanded', 'true');
	}

};

// Add 'is-active' class to '.c-nav'
$(function() {
	$('#js-toggle-menu').click(function(e) {
		e.preventDefault();
		$('.js-nav').toggleClass('is-active');
	});
});

// Add 'sidebar-active' class to '<main>'
$(function() {
	$('#js-toggle-menu').click(function(e) {
		e.preventDefault();
		$('main').toggleClass('sidebar-active');
	});
});
