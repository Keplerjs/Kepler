## CONTRIBUTING

Join the [Roadmap](http://bit.ly/KeplerJsRoadmap)

Most of the base code is contained in the plugins.
Each plugin can be disabled or taken and modified or created by new ones.

If you want to implement your functionality to keep them generic and compatible with the basic platform I can give you a space as a collaborator in the KeplerJs Organization on Github.

If you also want to help me correct some translation errors or add new langs… see the i18n core package.

Alternatively, if you want to create your own personal adapter, I recommend you to make it as a KeplerJs plugin1 and publish it with the same license in a your public repository and then publish it at Atmospherejs.com!

A good idea to begin to understand basic functionality is to disable all plugins using meteor remove for each meteor package plugin.
If you want to start kepler adapting to your study case right now, you should take one of the plugin code example, for example keplerjs:share and study its code.

Learn more in [Contribute Documentation](http://docs.keplerjs.io/contribute.html)

## Github Contribution

If you would like to contribute, please note that we are using a [branching model](http://nvie.com/posts/a-successful-git-branching-model/) to structure our git workflow and are following [commit message guidelines](https://api.coala.io/en/latest/Developers/Writing_Good_Commits.html).

For minor bugfixes use the development branch:

	git checkout development

For new features, please create a new branch:

	git checkout -b feature_branch

In every case do a [pull request](https://help.github.com/articles/creating-a-pull-request/) to our development branch. Be sure to pull the latest changes beforehand and fix any emerging conflicts.

To enable console output information and logging for bugfixing and feature development do:

	grunt dev
