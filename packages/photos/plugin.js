
K.Plugin({
	name: 'photos',
	templates: {
		tabPlace: {
			'tabPlace_photos': { order:-10 },
		},
		panelPlaceEdit: 'panelPlaceEdit_photos',		
		panelSettings: {
			'panelSettings_photos': { order:-10},
		},
		panelProfile: 'panelProfile_photos'
	},
	schemas: {
		place: {
			//TODO editedAt: '',//last edit date
			photos: []   //user creator of place
		},
		user: {
			photos: []	   //places created by user
		},
		photo: {
			createdAt: null,
			title: '',         //Topic for the place wall or subject for the private convers
			path: '',
			targetId: '',      //if null is a private users convers		
			targetType: '',	   //type of target: user, place, event, pois		
			userId: '',        //owner/sender of conversation		
			loc: null,			//location
			exif: null			//exif data of photo
		}
	},
	filters: {
		currentUser: {
			fields: {
				photos:1
			}
		},
		placePanel: {
			fields: {
				photos:1
			}
		},
		friendPanel: {
			fields: {
				photos:1
			}
		},
		photoItem: {
			fields: {
				exif: {}
			}
		}
	},
	settings: {
		/**
		 * define a targets used by plugin upload
		 */
		"upload": {
			"targets": {
				"photos_avatars": {
					//pass uploaded object to this method
					"method": "updateAvatar",
					"maxFileSize": 5800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": ""
				},
				"photos_places": {
					//pass uploaded object to this method
					"method": "insertPlacePhotos",
					"maxFileSize": 5800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": ""
				}
			}
		}
	}
});
