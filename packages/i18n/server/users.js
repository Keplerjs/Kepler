
 var findLangByCode = function(code) {
	if(code && i18n._langs[code]) {		
		return i18n._langs[code].split(',')[0];
	}
	else
		return null
}

Meteor.users.before.find(function(userId, selector, options, cursor) {
	
	var lang = K.Util.getPath(options,'fields.lang');
	
	if(lang) {
		options.transform = function(doc) {
			doc.lang = findLangByCode(doc.lang);
			return doc;
		};
	}
});