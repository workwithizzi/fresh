### Objects
Objects are the smallest building blocks of a website. They should be self contained and have the ability to be added almost anywhere in your site without affecting surrounding elements. If you’ve heard of Atomic Design, consider objects to be a hybrid of elements and molecules.
Objects should be unaware of their specific context, so if you are styling an object for a specific placement, you should put that object in it's related component file. For example, `.o_email-signup__btn` might go in a `components/email_signup.sass` file.

Objects have the following properties:
	1. Objects can use the `.o_` prefix for better clarity. But don't have to.
	2. Certain objects can ignore the .o_ prefix when it makes sense.
	3. They cannot contain other objects or components.
	4. They are unaware of context

- For more info, read https://goo.gl/3PCoLh
