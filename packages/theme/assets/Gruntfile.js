'use strict';

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-svg2png');
grunt.loadNpmTasks('grunt-newer');
grunt.loadNpmTasks('grunt-rev');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: {
		sprite: {
			src: ['dist/images/*sprite.png']
		},		
		images: {
			src: ['dist/images/*']
		}
	},
	svg2png: {
		sprite: {
			files: [
				{src: ['images/sprite.svg'], dest: 'images/'}
			]
		}
	},	
	imagemin: {
		sprite: {
			options: {
				//optimizationLevel: 1,
				pngquant: true
			},
			files: [{
				expand: true,
				src: ['images/*.png'],
				dest: 'dist/'
			}]
		}
	},
	rev: {
		sprite: {
			src: ['dist/images/sprite.png']
		}
	}
});

grunt.registerTask('default', [
	'clean',
	'svg2png',
	'newer:imagemin',	
	//'rev'
]);

};