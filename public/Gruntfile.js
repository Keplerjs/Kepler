'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: {
		sprite: {
			src: ['dist/images/*sprite.png']
		},		
		images: {
			src: ['dist/images/*']
		},
		css: {
			src: ['dist/*.min.css']
		},
		lib: {
			src: ['dist/*.lib.min.js']
		}
	},
	// concat: {
	// 	options: {
	// 		separator: ';\n',
	// 		stripBanners: {
	// 			block: true
	// 		}
	// 	},
	// 	lib: {
	// 		src: [
	// 		//'src/lib/jquery-1.8.3.min.js',
	// 		],
	// 		dest: 'dist/lib.min.js'
	// 	}
	// },
	// copy: {
	// 	uploadify: {
	// 		nonull: true,
	// 		src: 'src/lib/jquery-uploadify-3.2.1/uploadify.swf',
	// 		dest: 'dist/uploadify.swf'
	// 	}	
	// },
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
		lib: {
			src: ['dist/lib.*']
		},
		sprite: {
			src: ['dist/images/sprite.png']
		}
	}
});

grunt.registerTask('default', [
	'clean',
//	'copy',	
//	'concat',
	'svg2png',
	'newer:imagemin',	
	'rev'
]);

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-svg2png');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-newer');
grunt.loadNpmTasks('grunt-rev');

};