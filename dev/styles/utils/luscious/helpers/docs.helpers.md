### Helpers

Luscious contains a few helper tools for internal mixins/functions that are imported directly after `settings/`. These internal tools will likely not be needed during project development with the exception of `tests` and `info`.

Tests
The `__test` mixin can be used anywhere in the project to output an example of the SASS input and CSS output for debugging and education.
Example: `__test(clearfix)`

Info
The `__info` mixin can be used anywhere in the project to output more information to the command line about the function in question and any related Luscious tools.
Example: `__info(clearfix)`