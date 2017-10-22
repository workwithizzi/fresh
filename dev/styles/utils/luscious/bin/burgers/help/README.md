# hamburgers

hamburgers is a collection of tasty CSS-animated burger icons. Also included is the source as a [Sass](#sass) library. It’s modular and customizable, so cook up your own burger.

![](http://i.imgur.com/t7cUjDu.gif)

### Table of Contents

- [Usage](#usage)
- [Sass](#sass)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)

## Usage

1. [Download](https://github.com/jonsuh/hamburgers/blob/master/dist/hamburgers.css) and include the CSS in the `<head>` of your site:

	```html
	<link href="dist/burgers.css" rel="stylesheet">
	```

2. Add the base burger markup:

	```html
	<button class="burger" type="button">
		<span class="burger-box">
			<span class="burger-inner"></span>
		</span>
	</button>  
	```

	You *can* use `<div>`s if you insist, but they’re not [accessible](#accessibility) as a menu button.

	```html
	<div class="burger">
		<div class="burger-box">
			<div class="burger-inner"></div>
		</div>
	</div>
	```

3. Append the class name of the type of burger you’re craving:

	```html
	<button class="burger burger--collapse" type="button">
		<span class="burger-box">
			<span class="burger-inner"></span>
		</span>
	</button>
	```

	Here’s the list of burger-type classes you can choose from:

	```
	burger--3dx
	burger--3dx-r
	burger--3dy
	burger--3dy-r
	burger--arrow
	burger--arrow-r
	burger--arrowalt
	burger--arrowalt-r
	burger--boring
	burger--collapse
	burger--collapse-r
	burger--elastic
	burger--elastic-r
	burger--emphatic
	burger--emphatic-r
	burger--slider
	burger--slider-r
	burger--spin
	burger--spin-r
	burger--spring
	burger--spring-r
	burger--stand
	burger--stand-r
	burger--squeeze
	burger--vortex
	burger--vortex-r
	```

	Note: `-r` classes are reverse variants (e.g. `burger--spin` spins clockwise whereas `burger--spin-r` spins counterclockwise.

4. Trigger the active state by appending class name `is-active`:

	```html
	<button class="burger burger--collapse is-active" type="button">
		<span class="burger-box">
			<span class="burger-inner"></span>
		</span>
	</button>
	```

	Since the class name would have to be toggled via JavaScript and implementation would differ based on the context of how you plan on using the burger, I’m going to leave the rest up to you.

## Sass

`.scss` source files are available if you use Sass as your CSS precompiler. It’s customizable and modular.

1. burgers is available on [npm](https://www.npmjs.com/package/hamburgers), yarn and [Bower](http://bower.io/search/?q=css-hamburgers).

	```
	npm install burgers

	yarn get burgers

	bower install css-burgers
	```

	Also available as a [Ruby gem](https://rubygems.org/gems/hamburgers) to use within your Rails application—see [below](#install-for-ruby-on-rails) for more information.

	Or to manually install it, [download](https://github.com/jonsuh/hamburgers/archive/master.zip) and unzip the source files, then copy the files from the `_sass/burgers` directory into your project.

2. Import the `burgers.scss` file in your Sass manifest file:

	```scss
	@import "path/to/burgers";
	```

3. Customize your burger and/or remove any types you don’t want in `burgers.scss`.
4. Compile your Sass*, and voila!

\* Be sure to run the CSS through [Autoprefixer](https://github.com/postcss/autoprefixer) since the Sass doesn’t account for vendor prefixes.

### Install for Ruby on Rails

1. Add burgers to your Gemfile.

	```
	gem 'burgers'
	```

2. Run `bundle install`.
3. Include burgers by using Sass’s native `@import`**:

	```scss
	// application.scss
	@import "burgers";
	```

	\** [More information](https://blog.pivotal.io/pivotal-labs/labs/structure-your-sass-files-with-import) on why Sass’s native `@import` + why you should ditch Sprockets directives altogether.

## Customization

To override default settings, declare them before importing burgers:

```scss
$burgers-padding-x: 20px;
$burgers-padding-y: 15px;
$burger-types     : (collapse);

@import "burgers";
```

You can also create a separate file (e.g. `burgers-settings.scss`) with those declarations, then import it before burgers:

```scss
@import "burgers-settings"
@import "burgers";
```

Here is the full list of default settings (found in `_sass/burgers/burgers.scss`);

```scss
$burger-padding-x                       : 15px;
$burger-padding-y                       : 15px;
$burger-layer-width                     : 40px;
$burger-layer-height                    : 4px;
$burger-layer-spacing                   : 6px;
$burger-layer-color                     : #000;
$burger-layer-border-radius             : 4px;
$burger-hover-opacity                   : 0.7;
$burger-hover-transition-duration       : 0.15s;
$burger-hover-transition-timing-function: linear;

// To use CSS filters as the hover effect instead of opacity,
// set $burger-hover-use-filter as true and
// change the value of $burger-hover-filter accordingly.
$burger-hover-use-filter: false;
$burger-hover-filter    : opacity(50%);

// Remove or comment out the burger types you don’t want
// or need, so they get excluded from the compiled CSS.
$burger-types: (
	3dx,
	3dx-r,
	3dy,
	3dy-r,
	arrow,
	arrow-r,
	arrowalt,
	arrowalt-r,
	boring,
	collapse,
	collapse-r,
	elastic,
	elastic-r,
	emphatic,
	emphatic-r,
	slider,
	slider-r,
	spring,
	spring-r,
	stand,
	stand-r,
	spin,
	spin-r,
	squeeze,
	vortex,
	vortex-r
);
```

#### `ems` or `rems`

Wanna work with `ems` or `rems` instead of `px`? Just change all the `px` values to the unit of your choice. Note: Be consistent (all `px` or all `ems`), otherwise it may break—the math behind the customization will fail if it attempts to perform operations with values of different units.

### Not satisfied?

Dig into `_base.scss` or `types/` and customize to your heart’s content. Fair warning: It‘s pretty delicate and may break, especially if you tweak the animations themselves.

## Accessibility

burger menu icons can be useful in the right context, but they’re not the most accessible.

ARIA will help make it accessible to people with disabilities.

```html
<nav>
	<button class="burger burger--elastic" type="button"
					aria-label="Menu" aria-controls="navigation" aria-expanded="true/false">
		<span class="burger-box">
			<span class="burger-inner"></span>
		</span>
	</button>

	<div id="navigation">
		<!--navigation goes here-->
	</div>
</nav>
```

You will need JavaScript to toggle between `aria-expanded` attribute being set to `true` and `false`, as this will indicate to visually impaired users whether the menu is opened or closed.

The burger button belongs __inside__ the `<nav>` so that assistive technologies will be able to locate the navigation, and to allow these users to easily locatate the burger button, without having to search up and down the DOM, once they realize they've found themselves in an empty navigation.

If you insist on using `<div>`s, by default they’re not focusable (i.e. via keyboard or assistive technology). Add the `tabindex` attribute alongside ARIA. You will also need to recreate expected keyboard functionality for these `<div>`s. Using JavaScript, you will need to make sure that both <kbd>Space</kbd> and <kbd>Enter</kbd> will toggle the burger states.

```html
<nav id="navigation">

	<div class="burger burger--elastic" tabindex="0"
			 aria-label="Menu" role="button" aria-controls="navigation" aria-expanded="true/false">
		<div class="burger-box">
			<div class="burger-inner"></div>
		</div>
	</div>

	<div id="navigation">
		<!--navigation goes here-->
	</div>
</nav>
```

A label will help make it more obvious that it toggles a menu.

```html
<button class="burger burger--collapse" type="button">
	<span class="burger-box">
		<span class="burger-inner"></span>
	</span>
	<span class="burger-label">Menu</span>
</button>
```

Here are [some](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) [resources](https://webaccessibility.withgoogle.com/course) on [web](http://a11yproject.com/) [accessibility](http://www.html5accessibility.com/) and [ARIA](https://w3c.github.io/aria-in-html/).

## Browser Support

Animations use CSS3 3D transforms (`translate3d` whenever possible for GPU acceleration), which is supported by most browsers (not supported by IE9 and older and Opera Mini). For detailed browser support, check [caniuse.com](http://caniuse.com/#search=translate3d).
