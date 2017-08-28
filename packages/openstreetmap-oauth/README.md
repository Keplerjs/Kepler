OpenStreetMap OAuth flow.

Since OSM implements OAuth1, we followed the implementation of [twitter-oauth](https://github.com/meteor/meteor/tree/devel/packages/twitter-oauth) as suggested [here](https://stackoverflow.com/a/33976160).

In theory, you do not want to use this package directly. If you want to use OSM OAuth in your Meteor project, we recommend to use [mstn:accounts-openstreetmap](/) which is based on this package.
