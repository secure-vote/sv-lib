# Contributing

## What you should commit

You should use `git add` to specify the files you want for each commit, and you should not `git commit -a` because you'll get `./lib` and `./docs` included which we only want to include if we're doing a release.

## Notes on build

When you run a build it'll also generate docs and lib, so be sure to not include them when committing. You can use `git rm --cached ./dist ./lib` to remove them from the staged changes.

Also, although bundles are currently created they aren't functional.
