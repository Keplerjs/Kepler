## keplerjs:upload

keplerjs plugin for files upload

Need writable path to upload file from browser and serve it by url
*settings.json*
```
"upload": {
    "targets": {
        "avatars": {
            "url": "/static/avatars/",
            "path": "/var/www/static.app_meteor.net/avatars/"
        }
    }
}
```

*nginx.conf*
```
    location /static/ { 
        alias /var/www/static.app_meteor.net/;
    }
```

*/var/www/static.app_meteor.net* is outside of Meteor root path to avoid the auto reload application.