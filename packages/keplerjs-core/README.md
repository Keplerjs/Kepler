## keplerjs:core

contains the heart of Kepler, and itself depends on a set of core packages: *keplerjs:lib*, *keplerjs:i18n*

```
├── client
│   ├── Accounts.js
│   ├── Map.js
│   ├── Map_layers.js
│   ├── Map_controls.js
│   ├── Place.js
│   ├── Profile.js
│   ├── router.js
│   └── User.js
│
├── collections
│   ├── queries
│   │   ├── places.js
│   │   └── users.js
│   │
│   ├── places.js
│   └── users.js
│
├── modules
│   ├── Cache.js
│   ├── filters.js
│   ├── placeholders.js
│   ├── Plugin.js
│   ├── schemas.js
│   ├── settings.js
│   ├── Util_geo.js
│   ├── Util_humanize.js
│   ├── Util.js
│   └── Util_valid.js
│
├── server
│   ├── pubs
│   │   ├── places.js
│   │   ├── profile.js
│   │   └── users.js
│   │
│   ├── Accounts.js
│   ├── places.js
│   └── profile.js
│
├── Kepler.js
└── package.js
```