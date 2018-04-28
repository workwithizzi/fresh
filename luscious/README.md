# Luscious SASS
*A Library or SASS functions/mixin/variables/stuff*

**Current Version: v0.0.5 on Master branch**
After testing, Stable version will be released as v1.0.0


**A work in progress.**
Still need to:
1. A documentation.
2. A proper README.
3. Test a few things.
4. Add a few things.
5. Make another cup of coffee.

Good luck :)

---

## Todo
- Figure out bug with hamburgers
- Clean up deprecated functions
- Clean up un-needed utility class mixins.

## Changelog
- v0.0.5
	- Added function alias to `rem()` or `rem_calc()` function. You can now use `r()` to calculate the rem equivalent or a `px` unit.
	- Changed units used in Scaffold to now use the `r()` (rem) function instead of using rem units directly in the SASS.
- v0.0.4
	- A bunch of minor updates to scaffold files.
	- Added basic navigation styling.
	- Added variables to settings file for accessibility.
	- Added skipnav/skiplink styling.
	- Removed Font-Awesome from Luscious-core in favor of using npm to get it.
	- Added default animation to settings.
- v0.0.3
	- Moved styles scaffold to the root directory and removed `__rsc__` directory
	- Added import for Font Awesome sass to `main.sass`.
- v0.0.2
	- So. Many. Changes. This is why it's still a beta version. I'm not even going to write them down here. :)
- v0.0.1
	- Added initial task files