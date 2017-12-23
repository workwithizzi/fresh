## v3.0.2
- instead of symlinking core dependencies from `./node_modules`, now using automated install script to move them to `./dependencies` directory. This should be a lot less error prone on Windows OS and will give you the ability to optionally track them in the repo in case you need to make changes to the core for a specific project.
