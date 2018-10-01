# Utilities/

The `utilities/` folder gathers all the config files and settings declarations across the project. Every global variable should be able to be defined or overridden from this folder.

Any 3-rd party libraries should be added to the `02-Vendors/` folder and imported after this folder.

---

The rule of thumb for this folder is that it should not output a single line of CSS when compiled on its own. These are nothing but Sass helpers.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Abstracts folder](http://sass-guidelin.es/#abstracts-folder)


## Luscious

If started from a Luscious starter project, then this folder will come with all of the default settings and overrides for Luscious. Changing these default settings will change settings in the core mixins. Add, change, modify, or delete these files as-needed per your project needs. If you want to restore them to their defaults, just copy the file or entire folder in-place of this one and make sure to import the index file first in the project. The backup is in `luscious/boilerplates/01-default-configs`.
