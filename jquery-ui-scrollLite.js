//requires mousewheel.js https://github.com/brandonaaron/jquery-mousewheel
(function ($, undefined) {

    $.widget("SP.scrollLite", {
        version: 0.1,
        options: {
            orientation: "vertical",
            hidden: false,
            mousewheel: true
        },
        
        _create: function () {
        	
        	this.wrapper = this.element.addClass('scrollLite')
        		.wrapInner('<div class="scrollLite-content" />')
        		.find('.scrollLite-content');
       		if(this.options.hidden){
       			this.wrapper.hover(function () {
	                    that.find('.slider-vertical').stop(true).fadeIn();
	                }, function () {
	                    that.find('.slider-vertical').stop(true).fadeOut();
	                });
       		}
       		if(this.options.mousewheel){
       			this.wrapper.mousewheel(function (event, delta) {
	                    event.preventDefault();
	                    var position = that.slider.slider('value');
	                    position = position + delta;
	                    if(position<0){
	                    	position = 0;
	                    }else if(position > 100){
	                    	position = 100;
	                    }
	                    that.slider.slider('value', position);
	                    that.slide(position);
	                })
       		}
        },

        _init: function () {
        	that = this;
        	this.height = this.element.height();
        	this.innerHeight = this.wrapper.height();
			
        	if(this.innerHeight > this.height){
        		
        		this.element.css({
        			position: 'relative',
        			overflow: 'hidden'
        		});
        		this.wrapper.css({
        			position: 'absolute'
        		});
        		if(!this.hasOwnProperty('slider')){
					that.slider = $('<div class="slider-vertical">').prependTo(this.element).slider({
	                    orientation: this.options.orientation,
	                    range: "min",
	                    min: 0,
	                    max: 100,
	                    value: 100
	                });
				}
				
				that.slider.unbind('slide').bind( 'slide', function (event, ui) {
                	that.slide(ui.value);
                });
        	}
        },
        
        slide: function(value){
        	this.wrapper.css("top", Math.round((that.innerHeight - that.height)*(value/100 - 1)) + "px");
        },
        
        _setOption: function (key, value) {
            this.options[key] = value;

            // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
            $.Widget.prototype._setOption.apply(this, arguments);
            // In jQuery UI 1.9 and above, you use the _super method instead
            //this._super( "_setOption", key, value );
        },

        destroy: function () {
            // In jQuery UI 1.8, you must invoke the destroy method from the base widget
            $.Widget.prototype.destroy.call(this);
            // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
        }
    });
}(jQuery));

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=true,g=0,h=0;b=a.event.fix(c);b.type="mousewheel";if(c.wheelDelta){e=c.wheelDelta/40}if(c.detail){e=-c.detail/3}h=e;if(c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS){h=0;g=-1*e}if(c.wheelDeltaY!==undefined){h=c.wheelDeltaY/120}if(c.wheelDeltaX!==undefined){g=-1*c.wheelDeltaX/120}d.unshift(b,e,g,h);return(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks){for(var c=b.length;c;){a.event.fixHooks[b[--c]]=a.event.mouseHooks}}a.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var a=b.length;a;){this.addEventListener(b[--a],d,false)}}else{this.onmousewheel=d}},teardown:function(){if(this.removeEventListener){for(var a=b.length;a;){this.removeEventListener(b[--a],d,false)}}else{this.onmousewheel=null}}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);