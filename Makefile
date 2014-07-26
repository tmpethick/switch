.PHONY: styles, js
js:
	- minify switch.js > switch.min.js
styles:
	- stylus stylus -u nib -o ./ -w
