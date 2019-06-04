## keplerjs:upload

keplerjs plugin for files upload

Need writable path to upload file from browser and serve it by url
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

The template ```{{> inputFile_upload}}``` accept this parameters:
* target: defined in settings.upload.targets
* params: addition custom options pass to remote method
* onSelect: callback run when a file il selected(before upload)
* onUploaded: callback run after the file is uploaded in server

Usage from other Kepler plugins:
```
<template id="panelSettings_photos">
	{{> inputFile_upload target='photos_avatars' onUploaded=setAvatar}}
</template>
```
expose a method accpet the result of uploading, usually a url of published file.
```
Template.panelSettings_photos.helpers({
	setAvatar: function() {
		return K.Profile.setAvatar;
	}
});
```


*nginx.conf*
```
    location /static/ { 
        alias /var/www/static.app_meteor.net/;
    }
```

*/var/www/static.app_meteor.net* is outside of Meteor root path to avoid the auto reload application.