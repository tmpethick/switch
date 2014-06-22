Mobile Switch
=============

This is a really simple and lightweight library meant only for mobile use. To keep it this lightweight it is build as a library you would copy and tweak to your needs. To give you an idea what this means the js doesn't control any of the styling. So in order to e.g. change the color of the switch you would need to modify the css.

This is also why it currently only supports iOS and Android. So when you go check out [the demo](https://tmpethick.github.io/switch) do it on your phone or use the [touch emulator in chrome](https://developer.chrome.com/devtools/docs/mobile-emulation#emulate-touch-events) (remember to reload the page after having enabled it).

### Browser support
As mentioned only iOS and Android is supported. This is because support for mouse events would make the js way more complex since the mouse event on the switch is not triggered when dragged outside the element.

If support for other than iOS and Android is needed a plain `css` solution is possible with this library (by adding the class `switch` to the input–see [`index.html`](index.html) for further detail).

#### Touch test
Testing for touch support can be a bit tricky as explained in [this article](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/) and the [modernizr touch test](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js) but  a simple test for `ontouchstart` will work for iOS and Android and will only falsely return true on very rare setups.

Right now the lib has the following requirements:
* [`classList`](http://caniuse.com/classlist)
* [`transition`](http://caniuse.com/transition)
* [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect#Browser_compatibility)
* [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector#Browser_Compatibility)
* [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener#Browser_compatibility)
* [`touch`](http://caniuse.com/touch)
* [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Browser_compatibility)

`getBoundingClientRect` is the one setting the limit here but even this is supported by most Android and iOS versions.

#### Windows Phone
Support for Windows Phone could easily be added (just follow [this guide](http://blogs.windows.com/windows_phone/b/wpdev/archive/2012/11/15/adapting-your-webkit-optimized-site-for-internet-explorer-10.aspx#step4) if you need it).

### Usage
For the switch to work two requirements have to met:
* The label has to be places right after the input.
* The `for` attribute on the label should match the `id` on the input.

```html
<input type="checkbox" id="cb" />
<label for="cb"></label>
```

To enable the switch run:
```js
var switch = new Switch(document.getElementById('cb'));
```

You can enable the plain css fallback for devices that are not support by added a class (in this example for Windows Phone):
```
if (navigator.maxTouchPoints || navigator.msMaxTouchPoints) {
  document.getElementById('cb').className = 'switch';
}
```

###Development
It uses stylus as it's css preprocessor (extended by `nib` to handle browser specific prefixes). To install these to libraries run:
```
npm install stylus -g
npm install nib -g
```

With the following command the stylus files can now automatically be compiled on change:
```
make
```

If you would like to add support for another switch color you could add the following to `stylus/switch.styl`:
``` stylus
input[type="checkbox"].switch.black
input[type="radio"].switch.black
  + label
    .js-switch-background
    &:before
      background-color #000
  &:checked + label
      .js-switch-background
      &:before
        box-shadow 0 0 0 1px #000
  &:checked + label
  + label
      &.js-switch-active
        .js-switch-background
          box-shadow 0 0 0 1px #000
```
