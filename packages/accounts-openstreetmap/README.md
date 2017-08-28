OpenStreetMap OAuth with [Meteor Accounts](https://www.meteor.com/accounts).

## Getting started

Add the package to your Meteor project

```
$ meteor add mstn:accounts-openstreetmap
```

Get a customer key and a secret from OSM. Add them to the Meteor application.

```javascript
// on the server
Meteor.startup( function() {
    ServiceConfiguration.configurations.upsert(
      { service: 'openstreetmap' },
      {
        $set: {
          secret: 'SECRET',
          consumerKey: 'KEY',
          loginStyle: 'redirect'
        }
      }
    );
});
```

And login!

```javascript
// on the client
Meteor.loginWithOSM();
```

The access token for OSM API is available only on the server side in the user object.
