/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	__webpack_require__(1)

	function ReachedBottom(element)
	{
	    this.element = element
	    this._setStyle()
	    this._bindEvents()
	}

	// TODO - this should be user responsibility?
	ReachedBottom.prototype._setStyle = function ()
	{
	    this.element.style.overflow = 'auto'
	}

	ReachedBottom.prototype._bindEvents = function ()
	{
	    this.element.addEventListener('scroll', this._calcPosition.bind(this))
	}

	ReachedBottom.prototype._calcPosition = function ()
	{
	    let bottom = this.element.scrollTop
	    let max = this.element.scrollHeight - this.element.clientHeight
	    if(bottom === max)
	        this._dispatchEvent()
	}

	ReachedBottom.prototype._dispatchEvent = function ()
	{
	    this.element.dispatchEvent(new Event('reachedbottom'))
	}

	window.addEventListener('eventlisteneradded', e =>
	{
	    if (e.base.type === 'reachedbottom')
	        new ReachedBottom(e.base.target)
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict'

	const event_listener_label = 'eventlisteneradded'
	const native_event_listener =  EventTarget.prototype.addEventListener

	let dispatch_event_listener_added = (type, target) =>
	{
	    let evt = new Event(event_listener_label)
	    evt.base = {
	        type: type,
	        target: target
	    }
	    window.dispatchEvent(evt)
	}

	EventTarget.prototype.addEventListener = (function()
	{
	    return function(type)
	    {
	        dispatch_event_listener_added(type, this)
	        native_event_listener.apply(this, arguments)
	        return true
	    }
	}())


/***/ }
/******/ ]);