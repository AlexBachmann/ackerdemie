var SVGSprite = require('svg-sprite');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var phantomjs = require('phantomjs').path;
var execFile = require("child_process").execFile;
var async = require('async');
var sizeOf = require('image-size');
var datauri = require('datauri');

var exports = module.exports = {};

var split =	function (uristring) {
	var parts = uristring.split(',');
	var content = parts[1];
	var splitcontent = content.replace(/(.{76})/g, "$1\n");
	return parts[0] + ',\n' + splitcontent;
}

exports.generate = function (options, callback) {
	options.mixintemplate = 'mixin.scss';
	options.icontemplate = 'icon.scss';
	options.iconfile = 'icon.scss';
	options.mixinfile = 'mixin.scss';
	exports.generateSVGSprite(options, function (error) {
		if (error) {
			callback(error);
		}
		callback();
	});
}

exports.generateSVGSprite = function (options, callback) {
	var templatePathMixin = path.join(path.dirname(__dirname), 'templates', options.mixintemplate);
	var templatePathIcon = path.join(path.dirname(__dirname), 'templates', options.icontemplate);

	if(options.templatePathMixin) {
		templatePathMixin = options.templatePathMixin;
	}

	if(options.templatePathIcon) {
		templatePathIcon = options.templatePathIcon;
	}

	var spriter = new SVGSprite({
		dest: options.out,
		mode: {
			css: {
				dest: options.scssPath,
				sprite: options.spritePath,
				render: {
					scss: {
						template: templatePathIcon,
						dest: options.iconfile,
						scss: true
					}
				}
			}
		},
		shape: {
			spacing: {
				padding: 0
			}
		}
	});

	var files = fs.readdirSync(options.iconsPathSvg);
	files.forEach(function (svg, index) {
		var svgPath = options.iconsPathSvg + '/' + svg;
		if (svg.indexOf('.svg') !== -1) {
			spriter.add(
				path.resolve(svgPath),
				svg,
				fs.readFileSync(svgPath, {encoding: 'utf-8'})
			);
		}
	});

	spriter.compile(function(error, result, data) {
		var sprites = [];
		for (var type in result.css) {

			mkdirp.sync(path.dirname(result.css[type].path));
			fs.writeFileSync(result.css[type].path, result.css[type].contents);
			
			if (type === 'sprite') {
				console.log(result.css[type].path + ' created');
				sprites.push(result.css[type].path);
			}
		}

		fs.readFile(templatePathMixin, 'utf8', function (err, mixin) {
			if (err) {
				callback(err);
			}

			var spriteSVGPath = sprites[0];
			var spritesSVGPathSplit = spriteSVGPath.split('/');

			var spriteSVG = options.cssSpritePath + '/' + spritesSVGPathSplit[spritesSVGPathSplit.length - 1];

			var dimensions = sizeOf(spriteSVGPath);

			mixin = mixin.split('{{svgSprite}}').join(spriteSVG);
			mixin = mixin.split('{{dimX}}').join(dimensions.width);
			mixin = mixin.split('{{dimY}}').join(dimensions.height);


			fs.writeFile(options.out + '/' + options.scssPath + '/' + options.mixinfile, mixin, function (err) {
				console.log(options.out + '/' + options.scssPath + '/' + options.mixinfile + ' created');
				callback(err);
			});
		});
	});
};
