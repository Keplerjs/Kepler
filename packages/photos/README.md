## keplerjs:photos

keplerjs plugin for manage photos

**Requirements:**
- [Imagemagick](http://www.imagemagick.org/)

Need writable path to photos file from browser and serve it by url
*settings.json*
```
"upload": {
    "targets": {
        "photos_avatars": {
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