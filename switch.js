(function() {
    "use strict";

    var supportsTransitions = (function() {
        var s = (document.body || document.documentElement).style;
        return 'transition' in s ||
               'WebkitTransition' in s ||
               'MozTransition' in s ||
               'msTransition' in s ||
               'OTransition' in s;
    }());

    var jsSwitch = function(element, options) {
        var testEl = document.createElement("_"),
            key;

        if (!("classList" in testEl) ||
            !("getBoundingClientRect" in testEl) ||
            !document.addEventListener ||
            !('ontouchstart' in window) ||
            !supportsTransitions) {
            return;
        }

        this.el = element;
        this.options = options || {};

        for (key in jsSwitch.defaults) {
            if (jsSwitch.defaults.hasOwnProperty(key) && this.options[key] === undefined) {
                this.options[key] = jsSwitch.defaults[key];
            }
        }

        this.init();
    };

    jsSwitch.defaults = {
        classPrefix: 'js-switch-',
        styleClass:'switch'
    };

    jsSwitch.prototype.init = function() {
        var background = this.background = document.createElement('div');
        background.className = this.options.classPrefix + 'background';
        this.el.appendChild(background);

        var button = this.button = document.createElement('div');
        button.className = this.options.classPrefix + 'button';
        this.el.appendChild(button);

        this.input = document.getElementById(this.el.getAttribute('for'));
        this.input.classList.add(this.options.classPrefix.substring(0, this.options.classPrefix.length -1));
        this.input.classList.add(this.options.styleClass);

        this.containerRect = this.el.getBoundingClientRect();
        this.buttonRect = this.button.getBoundingClientRect();
        this.maxX = this.containerRect.width - this.buttonRect.width - 2;
        this.minX = 0;
        this.currentX = null;

        this.el.addEventListener('touchstart', this._touchStart.bind(this));
        this.el.addEventListener('touchmove', this._touchMove.bind(this));
        this.el.addEventListener('touchend', this._touchEnd.bind(this));

    };

    jsSwitch.prototype._touchStart = function(e) {
        if (this.input.disabled) return;
        var touch = e.targetTouches[0];
        this.relativeButtonTouchStartX = touch.clientX - this.button.getBoundingClientRect().left;
        // disables animations.
        this.el.classList.add(this.options.classPrefix + 'active');

        // The minimum class is used to hide the colored border.
        if (!this.input.checked) this.el.classList.add(this.options.classPrefix + 'minimum');
        e.preventDefault();
    };

    jsSwitch.prototype._touchMove = function(e) {
        if (this.input.disabled) return;
        if (this.input.getAttribute('type').toLowerCase() === 'radio' && this.input.checked) return;
        var containerRect = this.el.getBoundingClientRect(),
            touch = e.targetTouches[0],
            newButtonX;

        newButtonX = touch.clientX - containerRect.left - this.relativeButtonTouchStartX;
        if (newButtonX < this.minX) newButtonX = this.minX;
        if (newButtonX > this.maxX) newButtonX = this.maxX;
        this.button.style.left = '' + newButtonX + 'px';
        this.background.style.width = '' + (this.buttonRect.width + newButtonX) + 'px';

        if (newButtonX <= 0) {
            this.el.classList.add(this.options.classPrefix + 'minimum');
        } else {
            this.el.classList.remove(this.options.classPrefix + 'minimum');
        }

        this.currentX = newButtonX;
        e.preventDefault();
    };

    jsSwitch.prototype._touchEnd = function(e) {
        if (this.input.disabled) return;
        // reenable animations.
        this.el.classList.remove(this.options.classPrefix + 'active');

        // check if finger has moved.
        if (this.currentX !== null) {
            if (this.currentX >= this.maxX / 2) {
                this.checkInput(true);
            } else {
                this.checkInput(false);
            }
        } else {
            // toggle the checkbox if the finger hasn't moved.
            this.checkInput(!this.input.checked);
        }

        if (this.input.checked) this.el.classList.remove(this.options.classPrefix + 'minimum');
        this.button.style.left = '';
        this.background.style.width = '';
        this.currentX = null;

        e.preventDefault();
    };

    jsSwitch.prototype.checkInput = function(check) {
        if (this.input.getAttribute('type').toLowerCase() === 'radio' && !check) return;
        this.input.checked = check;
    };

    this.jsSwitch = jsSwitch;

}).call(this);
