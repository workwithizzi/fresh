### 04_objects
Objects (.o_) are the smallest building blocks of a website. Consider them to be Lego blocks where you can copy-paste anywhere in your website. If you’ve heard of Atomic Design by Brad Frost, consider objects to be a hybrid of elements and molecules.
Objects have the following properties:
	1. Objects uses the .o_ prefix
	2. They cannot contain other objects or components.
	3. They are context independent.
	4. Certain objects can ignore the .o_ prefix when it makes sense.

- Objects should be unaware of it's context, so if you are styling an object for a specific placement, you should put that object in it's related component file. For example,  `.o_email-signup__btn` might go in the `05_components/email_signup.sass` file.
- For more info, read https://goo.gl/3PCoLh