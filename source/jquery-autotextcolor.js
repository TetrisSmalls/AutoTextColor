/*
	* AutoTextColor jQuery Plugin
	*
	* @file: jquery-autotextcolor.js
	* @author: Mark Coyne
	* @site: www.coynem.com
	* @license: MIT License
*/

(function($) {
	$.fn.autotextcolor = function(options) {
		/*
			* default settings
		*/
		var settings = $.extend({
			// development mode
			// this will activate console debug messages
			'development': false
		}, options);



		/*
			* core function
			* main bulk of the code to loop through all of the items
		*/
		return this.each(function() {
			var $object = $(this);
			var background_color = getComputedStyle($object[0]).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)' ? getComputedStyle($object[0]).getPropertyValue('background-color') : get_parent_background_color($object);
			var luminance = get_luminance(background_color) ;

			luminance > 0.179 ? $object[0].style.color = 'black' : $object[0].style.color = 'white'; // set color
			debug(settings.development, 'Background Color: ' + background_color + ' - Luminance: ' + luminance); // development mode
		});
	};



	/*
		* debug function
		* send console messages if development setting is turned on
	*/
	function debug(debug, message) {
		if (debug && window.console && window.console.log) {
			window.console.log('jQuery-AutoTextColor: ' + message);
		};
	};



	/*
		* get_parent_background_color function
		* get the background color of the parent and return back
		* if none is defined / found, call function again
		* if none is defined / found, return black
	*/
	function get_parent_background_color(element) {
		return getComputedStyle(element.parent()[0]).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)' ? getComputedStyle(element.parent()[0]).getPropertyValue('background-color') : get_parent_background_color(element.parent());
	};



	/*
		* get_luminance function
		* get value of the luminance and return back
	*/
	function get_luminance(color) {
		var rgb = color.replace('rgb(', '').replace(')', '').split(',');
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];

		c = [r/255, g/255, b/255];

		for (var i = 0; i < c.length; ++i ) {
			if (c[i] <= 0.03928) {
				c[i] = c[i] / 12.92
			} else {
				c[i] = Math.pow((c[i] + 0.055) / 1.055, 2.4);
			};
		};

		l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

		return l;
	};
}(jQuery));