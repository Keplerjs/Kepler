
Kepler.Import = {
	importnameFromFile: function(fileObj) {
		return K.Util.sanitize.fileName(fileObj.name, true) || K.Util.timeName();
	}
};
