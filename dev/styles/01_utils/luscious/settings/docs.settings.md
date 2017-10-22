### 02_settings
Contains variables and settings for Luscious that will, by default, be passed on to the project. To override these, I recommend you:
- Create a settings file/directory after the `01_utils/` and copy any overrides there.
- Then make your changes there and remove the `!default` flag from the variable.

No CSS should be produced before the settings files so that all of your overrides will take affect.