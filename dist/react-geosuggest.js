(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Geosuggest = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],3:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */

// Escapes special characters in user input for regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geosuggest component
 */

var Geosuggest = function (_React$Component) {
  _inherits(Geosuggest, _React$Component);

  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */
  function Geosuggest(props) {
    _classCallCheck(this, Geosuggest);

    var _this = _possibleConstructorReturn(this, (Geosuggest.__proto__ || Object.getPrototypeOf(Geosuggest)).call(this, props));

    _this.onInputChange = function (userInput) {
      _this.setState({ userInput: userInput }, _this.onAfterInputChange);
    };

    _this.onAfterInputChange = function () {
      if (!_this.state.isSuggestsHidden) {
        _this.showSuggests();
      }
      _this.props.onChange(_this.state.userInput);
    };

    _this.onInputFocus = function () {
      _this.props.onFocus();
      _this.showSuggests();
    };

    _this.onInputBlur = function () {
      if (!_this.state.ignoreBlur) {
        _this.hideSuggests();
      }
    };

    _this.onNext = function () {
      return _this.activateSuggest('next');
    };

    _this.onPrev = function () {
      return _this.activateSuggest('prev');
    };

    _this.onSelect = function () {
      return _this.selectSuggest(_this.state.activeSuggest);
    };

    _this.onSuggestMouseDown = function () {
      return _this.setState({ ignoreBlur: true });
    };

    _this.onSuggestMouseOut = function () {
      return _this.setState({ ignoreBlur: false });
    };

    _this.onSuggestNoResults = function () {
      _this.props.onSuggestNoResults(_this.state.userInput);
    };

    _this.hideSuggests = function () {
      _this.props.onBlur(_this.state.userInput);
      _this.timer = setTimeout(function () {
        _this.setState({
          isSuggestsHidden: true,
          activeSuggest: null
        });
      }, 100);
    };

    _this.selectSuggest = function (suggest) {
      if (!suggest) {
        suggest = {
          label: _this.state.userInput
        };
      }

      _this.setState({
        isSuggestsHidden: true,
        userInput: suggest.label
      });

      if (suggest.location) {
        _this.setState({ ignoreBlur: false });
        _this.props.onSuggestSelect(suggest);
        return;
      }

      _this.geocodeSuggest(suggest);
    };

    _this.state = {
      isSuggestsHidden: true,
      isLoading: false,
      userInput: props.initialValue,
      activeSuggest: null,
      suggests: []
    };

    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);

    if (props.queryDelay) {
      _this.onAfterInputChange = (0, _lodash2.default)(_this.onAfterInputChange, props.queryDelay);
    }
    return _this;
  }

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */


  _createClass(Geosuggest, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.initialValue !== props.initialValue) {
        this.setState({ userInput: props.initialValue });
      }
    }

    /**
     * Called on the client side after component is mounted.
     * Google api sdk object will be obtained and cached as a instance property.
     * Necessary objects of google api will also be determined and saved.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof window === 'undefined') {
        return;
      }

      var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
      window.google.maps || this.googleMaps;

      /* istanbul ignore next */
      if (!googleMaps) {
        console.error( // eslint-disable-line no-console
        'Google map api was not found in the page.');
        return;
      }
      this.googleMaps = googleMaps;

      this.autocompleteService = new googleMaps.places.AutocompleteService();
      this.geocoder = new googleMaps.Geocoder();
    }

    /**
     * When the component will unmount
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    }

    /**
     * When the input changed
     * @param {String} userInput The input value of the user
     */


    /**
     * On After the input got changed
     */


    /**
     * When the input gets focused
     */


    /**
     * When the input gets blurred
     */

  }, {
    key: 'focus',


    /**
     * Focus the input
     */
    value: function focus() {
      this.refs.input.focus();
    }

    /**
     * Blur the input
     */

  }, {
    key: 'blur',
    value: function blur() {
      this.refs.input.blur();
    }

    /**
     * Update the value of the user input
     * @param {String} userInput the new value of the user input
     */

  }, {
    key: 'update',
    value: function update(userInput) {
      this.setState({ userInput: userInput });
      this.props.onChange(userInput);
    }

    /*
     * Clear the input and close the suggestion pane
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.setState({ userInput: '' }, this.hideSuggests);
    }

    /**
     * Search for new suggests
     */

  }, {
    key: 'searchSuggests',
    value: function searchSuggests() {
      var _this2 = this;

      if (!this.state.userInput) {
        this.updateSuggests();
        return;
      }

      var options = {
        input: this.state.userInput
      };

      ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
        if (_this2.props[option]) {
          options[option] = _this2.props[option];
        }
      });

      if (this.props.country) {
        options.componentRestrictions = {
          country: this.props.country
        };
      }

      this.setState({ isLoading: true }, function () {
        _this2.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
          _this2.setState({ isLoading: false });
          _this2.updateSuggests(suggestsGoogle || [], // can be null
          function () {
            if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
              _this2.activateSuggest('next');
            }
          });
        });
      });
    }

    /**
     * Update the suggests
     * @param {Array} suggestsGoogle The new google suggests
     * @param {Function} callback Called once the state has been updated
     */

  }, {
    key: 'updateSuggests',
    value: function updateSuggests() {
      var _this3 = this;

      var suggestsGoogle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var callback = arguments[1];

      var suggests = [],
          regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
          skipSuggest = this.props.skipSuggest,
          maxFixtures = 10,
          fixturesSearched = 0,
          activeSuggest = null;

      this.props.fixtures.forEach(function (suggest) {
        if (fixturesSearched >= maxFixtures) {
          return;
        }

        if (!skipSuggest(suggest) && suggest.label.match(regex)) {
          fixturesSearched++;

          suggest.placeId = suggest.label;
          suggest.isFixture = true;
          suggests.push(suggest);
        }
      });

      suggestsGoogle.forEach(function (suggest) {
        if (!skipSuggest(suggest)) {
          suggests.push({
            label: _this3.props.getSuggestLabel(suggest),
            placeId: suggest.place_id,
            isFixture: false
          });
        }
      });

      activeSuggest = this.updateActiveSuggest(suggests);
      this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
    }

    /**
     * Return the new activeSuggest object after suggests have been updated
     * @param {Array} suggests The new list of suggests
     * @return {Object} The new activeSuggest
     **/

  }, {
    key: 'updateActiveSuggest',
    value: function updateActiveSuggest() {
      var suggests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var activeSuggest = this.state.activeSuggest;

      if (activeSuggest) {
        var newSuggest = suggests.find(function (listedSuggest) {
          return activeSuggest.placeId === listedSuggest.placeId && activeSuggest.isFixture === listedSuggest.isFixture;
        });

        activeSuggest = newSuggest || null;
      }

      return activeSuggest;
    }

    /**
     * Show the suggestions
     */

  }, {
    key: 'showSuggests',
    value: function showSuggests() {
      this.searchSuggests();
      this.setState({ isSuggestsHidden: false });
    }

    /**
     * Hide the suggestions
     */

  }, {
    key: 'activateSuggest',


    /**
     * Activate a new suggest
     * @param {String} direction The direction in which to activate new suggest
     */
    value: function activateSuggest(direction) {
      // eslint-disable-line complexity
      if (this.state.isSuggestsHidden) {
        this.showSuggests();
        return;
      }

      var suggestsCount = this.state.suggests.length - 1,
          next = direction === 'next';
      var newActiveSuggest = null,
          newIndex = 0,
          i = 0;

      for (i; i <= suggestsCount; i++) {
        if (this.state.suggests[i] === this.state.activeSuggest) {
          newIndex = next ? i + 1 : i - 1;
        }
      }

      if (!this.state.activeSuggest) {
        newIndex = next ? 0 : suggestsCount;
      }

      if (newIndex >= 0 && newIndex <= suggestsCount) {
        newActiveSuggest = this.state.suggests[newIndex];
      }

      this.props.onActivateSuggest(newActiveSuggest);

      this.setState({ activeSuggest: newActiveSuggest });
    }

    /**
     * When an item got selected
     * @param {GeosuggestItem} suggest The selected suggest item
     */

  }, {
    key: 'geocodeSuggest',


    /**
     * Geocode a suggest
     * @param  {Object} suggest The suggest
     */
    value: function geocodeSuggest(suggest) {
      var _this4 = this;

      this.geocoder.geocode(suggest.placeId && !suggest.isFixture ? { placeId: suggest.placeId } : { address: suggest.label }, function (results, status) {
        if (status === _this4.googleMaps.GeocoderStatus.OK) {
          var gmaps = results[0],
              location = gmaps.geometry.location;

          suggest.gmaps = gmaps;
          suggest.location = {
            lat: location.lat(),
            lng: location.lng()
          };
        }
        _this4.props.onSuggestSelect(suggest);
      });
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */

  }, {
    key: 'render',
    value: function render() {
      var attributes = (0, _filterInputAttributes2.default)(this.props),
          classes = (0, _classnames2.default)('geosuggest', this.props.className, { 'geosuggest--loading': this.state.isLoading }),
          shouldRenderLabel = this.props.label && attributes.id,
          input = _react2.default.createElement(_input2.default, _extends({ className: this.props.inputClassName,
        ref: 'input',
        value: this.state.userInput,
        ignoreEnter: !this.state.isSuggestsHidden,
        ignoreTab: this.props.ignoreTab,
        style: this.props.style.input,
        onChange: this.onInputChange,
        placeholderMaterial: this.props.placeholder,
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyPress: this.props.onKeyPress,
        onNext: this.onNext,
        onPrev: this.onPrev,
        onSelect: this.onSelect,
        onEscape: this.hideSuggests }, attributes)),
          suggestionsList = _react2.default.createElement(_suggestList2.default, { isHidden: this.state.isSuggestsHidden,
        style: this.props.style.suggests,
        suggestItemStyle: this.props.style.suggestItem,
        suggestsClassName: this.props.suggestsClassName,
        suggestItemClassName: this.props.suggestItemClassName,
        suggests: this.state.suggests,
        hiddenClassName: this.props.suggestsHiddenClassName,
        suggestItemActiveClassName: this.props.suggestItemActiveClassName,
        activeSuggest: this.state.activeSuggest,
        onSuggestNoResults: this.onSuggestNoResults,
        onSuggestMouseDown: this.onSuggestMouseDown,
        onSuggestMouseOut: this.onSuggestMouseOut,
        onSuggestSelect: this.selectSuggest });

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'geosuggest__input-wrapper' },
          shouldRenderLabel && _react2.default.createElement(
            'label',
            { className: 'geosuggest__label',
              htmlFor: attributes.id },
            this.props.label
          ),
          input
        ),
        _react2.default.createElement(
          'div',
          { className: 'geosuggest__suggests-wrapper' },
          suggestionsList
        )
      );
    }
  }]);

  return Geosuggest;
}(_react2.default.Component);

/**
 * Types for the properties
 * @type {Object}
 */


Geosuggest.propTypes = _propTypes2.default;

/**
 * Default values for the properties
 * @type {Object}
 */
Geosuggest.defaultProps = _defaults2.default;

exports.default = Geosuggest;

},{"./defaults":6,"./filter-input-attributes":7,"./input":8,"./prop-types":10,"./suggest-list":12,"classnames":1,"lodash.debounce":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* istanbul ignore next */
/**
 * Default values
 */
exports.default = {
  fixtures: [],
  initialValue: '',
  placeholder: 'Search places',
  disabled: false,
  className: '',
  inputClassName: '',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  queryDelay: 250,
  googleMaps: null,
  onActivateSuggest: function onActivateSuggest() {},
  onSuggestSelect: function onSuggestSelect() {},
  onSuggestNoResults: function onSuggestNoResults() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  skipSuggest: function skipSuggest() {},
  getSuggestLabel: function getSuggestLabel(suggest) {
    return suggest.description;
  },
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var attributes = {};

  allowedAttributes.forEach(function (allowedAttribute) {
    if (props[allowedAttribute]) {
      attributes[allowedAttribute] = props[allowedAttribute];
    }
  });

  return attributes;
};

/**
 * Attributes allowed on input elements
 */
var allowedAttributes = ['autoFocus', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'height', 'id', 'inputMode', 'maxLength', 'name', 'onClick', 'onContextMenu', 'onCopy', 'onCut', 'onDoubleClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPaste', 'pattern', 'readOnly', 'required', 'size', 'spellCheck', 'tabIndex', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-placeholder', 'aria-readonly', 'aria-required'];

/**
 * Filter the properties for only allowed input properties
 * @param  {Object} props The properties to filter
 * @return {Object} The filtered, allowed properties
 */

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _shallowCompare = require('react/lib/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _material = require('./material');

var _material2 = _interopRequireDefault(_material);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


var RunMDL = new _material2.default();
/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function () {
      _this.props.onChange(_this.refs.input.value);
    }, _this.onFocus = function () {
      _this.props.onFocus();
    }, _this.onBlur = function () {
      _this.props.onBlur();
    }, _this.onKeyPress = function (event) {
      _this.props.onKeyPress(event);
    }, _this.onInputKeyDown = function (event) {
      // eslint-disable-line complexity
      switch (event.which) {
        case 40:
          // DOWN
          event.preventDefault();
          _this.props.onNext();
          break;
        case 38:
          // UP
          event.preventDefault();
          _this.props.onPrev();
          break;
        case 13:
          // ENTER
          if (_this.props.ignoreEnter) {
            event.preventDefault();
          }

          _this.props.onSelect();
          break;
        case 9:
          // TAB
          if (!_this.props.ignoreTab) {
            _this.props.onSelect();
          }
          break;
        case 27:
          // ESC
          _this.props.onEscape();
          break;
        /* istanbul ignore next */
        default:
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'shouldComponentUpdate',

    /**
     * Whether or not the component should update
     * @param {Object} nextProps The new properties
     * @param {Object} nextState The new state
     * @return {Boolean} Update or not?
     */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shallowCompare2.default)(this, nextProps, nextState);
    }

    /**
     * When the input got changed
     */


    /**
     * When the input got focused
     */


    /**
     * When the input loses focus
     */


    /**
     * When a key gets pressed in the input
     * @param  {Event} event The keypress event
     */


    /**
     * When a key gets pressed in the input
     * @param  {Event} event The keydown event
     */

  }, {
    key: 'focus',


    /**
     * Focus the input
     */
    value: function focus() {
      this.refs.input.focus();
    }

    /**
     * Blur the input
     */

  }, {
    key: 'blur',
    value: function blur() {
      this.refs.input.blur();
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */

  }, {
    key: 'render',
    value: function render() {
      var attributes = (0, _filterInputAttributes2.default)(this.props),
          classes = (0, _classnames2.default)('geosuggest__input', 'mdl-textfield__input', this.props.className);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label' },
          _react2.default.createElement('input', _extends({ className: classes,
            ref: 'input',
            type: 'text',
            id: 'sample1',
            autoComplete: 'off'
          }, attributes, {
            value: this.props.value,
            style: this.props.style,
            onKeyDown: this.onInputKeyDown,
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
            onFocus: this.onFocus,
            onBlur: this.onBlur })),
          _react2.default.createElement(
            'label',
            { className: 'mdl-textfield__label', htmlFor: 'sample1' },
            this.props.placeholderMaterial
          )
        )
      );
    }
  }]);

  return Input;
}(_react2.default.Component);

/**
 * Default values for the properties
 * @type {Object}
 */


Input.defaultProps = {
  className: '',
  value: '',
  ignoreTab: false,
  onKeyDown: function onKeyDown() {},
  onKeyPress: function onKeyPress() {}
};

exports.default = Input;

},{"./filter-input-attributes":7,"./material":9,"classnames":1,"react/lib/shallowCompare":4}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var material = function material() {
  _classCallCheck(this, material);

  var componentHandler = {
    /**
     * Searches existing DOM for elements of our component type and upgrades them
     * if they have not already been upgraded.
     *
     * @param {string=} optJsClass the programatic name of the element class we
     * need to create a new instance of.
     * @param {string=} optCssClass the name of the CSS class elements of this
     * type will have.
     */
    upgradeDom: function upgradeDom(optJsClass, optCssClass) {},
    /**
     * Upgrades a specific element rather than all in the DOM.
     *
     * @param {!Element} element The element we wish to upgrade.
     * @param {string=} optJsClass Optional name of the class we want to upgrade
     * the element to.
     */
    upgradeElement: function upgradeElement(element, optJsClass) {},
    /**
     * Upgrades a specific list of elements rather than all in the DOM.
     *
     * @param {!Element|!Array<!Element>|!NodeList|!HTMLCollection} elements
     * The elements we wish to upgrade.
     */
    upgradeElements: function upgradeElements(elements) {},
    /**
     * Upgrades all registered components found in the current DOM. This is
     * automatically called on window load.
     */
    upgradeAllRegistered: function upgradeAllRegistered() {},
    /**
     * Allows user to be alerted to any upgrades that are performed for a given
     * component type
     *
     * @param {string} jsClass The class name of the MDL component we wish
     * to hook into for any upgrades performed.
     * @param {function(!HTMLElement)} callback The function to call upon an
     * upgrade. This function should expect 1 parameter - the HTMLElement which
     * got upgraded.
     */
    registerUpgradedCallback: function registerUpgradedCallback(jsClass, callback) {},
    /**
     * Registers a class for future use and attempts to upgrade existing DOM.
     *
     * @param {componentHandler.ComponentConfigPublic} config the registration configuration
     */
    register: function register(config) {},
    /**
     * Downgrade either a given node, an array of nodes, or a NodeList.
     *
     * @param {!Node|!Array<!Node>|!NodeList} nodes
     */
    downgradeElements: function downgradeElements(nodes) {}
  };

  componentHandler = function () {
    'use strict';

    /** @type {!Array<componentHandler.ComponentConfig>} */

    var registeredComponents_ = [];

    /** @type {!Array<componentHandler.Component>} */
    var createdComponents_ = [];

    var componentConfigProperty_ = 'mdlComponentConfigInternal_';

    /**
     * Searches registered components for a class we are interested in using.
     * Optionally replaces a match with passed object if specified.
     *
     * @param {string} name The name of a class we want to use.
     * @param {componentHandler.ComponentConfig=} optReplace Optional object to replace match with.
     * @return {!Object|boolean}
     * @private
     */
    function findRegisteredClass_(name, optReplace) {
      for (var i = 0; i < registeredComponents_.length; i++) {
        if (registeredComponents_[i].className === name) {
          if (typeof optReplace !== 'undefined') {
            registeredComponents_[i] = optReplace;
          }
          return registeredComponents_[i];
        }
      }
      return false;
    }

    /**
     * Returns an array of the classNames of the upgraded classes on the element.
     *
     * @param {!Element} element The element to fetch data from.
     * @return {!Array<string>}
     * @private
     */
    function getUpgradedListOfElement_(element) {
      var dataUpgraded = element.getAttribute('data-upgraded');
      // Use `['']` as default value to conform the `,name,name...` style.
      return dataUpgraded === null ? [''] : dataUpgraded.split(',');
    }

    /**
     * Returns true if the given element has already been upgraded for the given
     * class.
     *
     * @param {!Element} element The element we want to check.
     * @param {string} jsClass The class to check for.
     * @returns {boolean}
     * @private
     */
    function isElementUpgraded_(element, jsClass) {
      var upgradedList = getUpgradedListOfElement_(element);
      return upgradedList.indexOf(jsClass) !== -1;
    }

    /**
     * Create an event object.
     *
     * @param {string} eventType The type name of the event.
     * @param {boolean} bubbles Whether the event should bubble up the DOM.
     * @param {boolean} cancelable Whether the event can be canceled.
     * @returns {!Event}
     */
    function createEvent_(eventType, bubbles, cancelable) {
      if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
        return new CustomEvent(eventType, {
          bubbles: bubbles,
          cancelable: cancelable
        });
      } else {
        var ev = document.createEvent('Events');
        ev.initEvent(eventType, bubbles, cancelable);
        return ev;
      }
    }

    /**
     * Searches existing DOM for elements of our component type and upgrades them
     * if they have not already been upgraded.
     *
     * @param {string=} optJsClass the programatic name of the element class we
     * need to create a new instance of.
     * @param {string=} optCssClass the name of the CSS class elements of this
     * type will have.
     */
    function upgradeDomInternal(optJsClass, optCssClass) {
      if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
        for (var i = 0; i < registeredComponents_.length; i++) {
          upgradeDomInternal(registeredComponents_[i].className, registeredComponents_[i].cssClass);
        }
      } else {
        var jsClass = /** @type {string} */optJsClass;
        if (typeof optCssClass === 'undefined') {
          var registeredClass = findRegisteredClass_(jsClass);
          if (registeredClass) {
            optCssClass = registeredClass.cssClass;
          }
        }

        var elements = document.querySelectorAll('.' + optCssClass);
        for (var n = 0; n < elements.length; n++) {
          upgradeElementInternal(elements[n], jsClass);
        }
      }
    }

    /**
     * Upgrades a specific element rather than all in the DOM.
     *
     * @param {!Element} element The element we wish to upgrade.
     * @param {string=} optJsClass Optional name of the class we want to upgrade
     * the element to.
     */
    function upgradeElementInternal(element, optJsClass) {
      // Verify argument type.
      if (!((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element instanceof Element)) {
        throw new Error('Invalid argument provided to upgrade MDL element.');
      }
      // Allow upgrade to be canceled by canceling emitted event.
      var upgradingEv = createEvent_('mdl-componentupgrading', true, true);
      element.dispatchEvent(upgradingEv);
      if (upgradingEv.defaultPrevented) {
        return;
      }

      var upgradedList = getUpgradedListOfElement_(element);
      var classesToUpgrade = [];
      // If jsClass is not provided scan the registered components to find the
      // ones matching the element's CSS classList.
      if (!optJsClass) {
        var classList = element.classList;
        registeredComponents_.forEach(function (component) {
          // Match CSS & Not to be upgraded & Not upgraded.
          if (classList.contains(component.cssClass) && classesToUpgrade.indexOf(component) === -1 && !isElementUpgraded_(element, component.className)) {
            classesToUpgrade.push(component);
          }
        });
      } else if (!isElementUpgraded_(element, optJsClass)) {
        classesToUpgrade.push(findRegisteredClass_(optJsClass));
      }

      // Upgrade the element for each classes.
      for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
        registeredClass = classesToUpgrade[i];
        if (registeredClass) {
          // Mark element as upgraded.
          upgradedList.push(registeredClass.className);
          element.setAttribute('data-upgraded', upgradedList.join(','));
          var instance = new registeredClass.classConstructor(element);
          instance[componentConfigProperty_] = registeredClass;
          createdComponents_.push(instance);
          // Call any callbacks the user has registered with this component type.
          for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
            registeredClass.callbacks[j](element);
          }

          if (registeredClass.widget) {
            // Assign per element instance for control over API
            element[registeredClass.className] = instance;
          }
        } else {
          throw new Error('Unable to find a registered component for the given class.');
        }

        var upgradedEv = createEvent_('mdl-componentupgraded', true, false);
        element.dispatchEvent(upgradedEv);
      }
    }

    /**
     * Upgrades a specific list of elements rather than all in the DOM.
     *
     * @param {!Element|!Array<!Element>|!NodeList|!HTMLCollection} elements
     * The elements we wish to upgrade.
     */
    function upgradeElementsInternal(elements) {
      if (!Array.isArray(elements)) {
        if (elements instanceof Element) {
          elements = [elements];
        } else {
          elements = Array.prototype.slice.call(elements);
        }
      }
      for (var i = 0, n = elements.length, element; i < n; i++) {
        element = elements[i];
        if (element instanceof HTMLElement) {
          upgradeElementInternal(element);
          if (element.children.length > 0) {
            upgradeElementsInternal(element.children);
          }
        }
      }
    }

    /**
     * Registers a class for future use and attempts to upgrade existing DOM.
     *
     * @param {componentHandler.ComponentConfigPublic} config
     */
    function registerInternal(config) {
      // In order to support both Closure-compiled and uncompiled code accessing
      // this method, we need to allow for both the dot and array syntax for
      // property access. You'll therefore see the `foo.bar || foo['bar']`
      // pattern repeated across this method.
      var widgetMissing = typeof config.widget === 'undefined' && typeof config['widget'] === 'undefined';
      var widget = true;

      if (!widgetMissing) {
        widget = config.widget || config['widget'];
      }

      var newConfig = /** @type {componentHandler.ComponentConfig} */{
        classConstructor: config.constructor || config['constructor'],
        className: config.classAsString || config['classAsString'],
        cssClass: config.cssClass || config['cssClass'],
        widget: widget,
        callbacks: []
      };

      registeredComponents_.forEach(function (item) {
        if (item.cssClass === newConfig.cssClass) {
          throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
        }
        if (item.className === newConfig.className) {
          throw new Error('The provided className has already been registered');
        }
      });

      if (config.constructor.prototype.hasOwnProperty(componentConfigProperty_)) {
        throw new Error('MDL component classes must not have ' + componentConfigProperty_ + ' defined as a property.');
      }

      var found = findRegisteredClass_(config.classAsString, newConfig);

      if (!found) {
        registeredComponents_.push(newConfig);
      }
    }

    /**
     * Allows user to be alerted to any upgrades that are performed for a given
     * component type
     *
     * @param {string} jsClass The class name of the MDL component we wish
     * to hook into for any upgrades performed.
     * @param {function(!HTMLElement)} callback The function to call upon an
     * upgrade. This function should expect 1 parameter - the HTMLElement which
     * got upgraded.
     */
    function registerUpgradedCallbackInternal(jsClass, callback) {
      var regClass = findRegisteredClass_(jsClass);
      if (regClass) {
        regClass.callbacks.push(callback);
      }
    }

    /**
     * Upgrades all registered components found in the current DOM. This is
     * automatically called on window load.
     */
    function upgradeAllRegisteredInternal() {
      for (var n = 0; n < registeredComponents_.length; n++) {
        upgradeDomInternal(registeredComponents_[n].className);
      }
    }

    /**
     * Check the component for the downgrade method.
     * Execute if found.
     * Remove component from createdComponents list.
     *
     * @param {?componentHandler.Component} component
     */
    function deconstructComponentInternal(component) {
      if (component) {
        var componentIndex = createdComponents_.indexOf(component);
        createdComponents_.splice(componentIndex, 1);

        var upgrades = component.element_.getAttribute('data-upgraded').split(',');
        var componentPlace = upgrades.indexOf(component[componentConfigProperty_].classAsString);
        upgrades.splice(componentPlace, 1);
        component.element_.setAttribute('data-upgraded', upgrades.join(','));

        var ev = createEvent_('mdl-componentdowngraded', true, false);
        component.element_.dispatchEvent(ev);
      }
    }

    /**
     * Downgrade either a given node, an array of nodes, or a NodeList.
     *
     * @param {!Node|!Array<!Node>|!NodeList} nodes
     */
    function downgradeNodesInternal(nodes) {
      /**
       * Auxiliary function to downgrade a single node.
       * @param  {!Node} node the node to be downgraded
       */
      var downgradeNode = function downgradeNode(node) {
        createdComponents_.filter(function (item) {
          return item.element_ === node;
        }).forEach(deconstructComponentInternal);
      };
      if (nodes instanceof Array || nodes instanceof NodeList) {
        for (var n = 0; n < nodes.length; n++) {
          downgradeNode(nodes[n]);
        }
      } else if (nodes instanceof Node) {
        downgradeNode(nodes);
      } else {
        throw new Error('Invalid argument provided to downgrade MDL nodes.');
      }
    }

    // Now return the functions that should be made public with their publicly
    // facing names...
    return {
      upgradeDom: upgradeDomInternal,
      upgradeElement: upgradeElementInternal,
      upgradeElements: upgradeElementsInternal,
      upgradeAllRegistered: upgradeAllRegisteredInternal,
      registerUpgradedCallback: registerUpgradedCallbackInternal,
      register: registerInternal,
      downgradeElements: downgradeNodesInternal
    };
  }();

  /**
   * Describes the type of a registered component type managed by
   * componentHandler. Provided for benefit of the Closure compiler.
   *
   * @typedef {{
   *   constructor: Function,
   *   classAsString: string,
   *   cssClass: string,
   *   widget: (string|boolean|undefined)
   * }}
   */
  componentHandler.ComponentConfigPublic; // jshint ignore:line

  /**
   * Describes the type of a registered component type managed by
   * componentHandler. Provided for benefit of the Closure compiler.
   *
   * @typedef {{
   *   constructor: !Function,
   *   className: string,
   *   cssClass: string,
   *   widget: (string|boolean),
   *   callbacks: !Array<function(!HTMLElement)>
   * }}
   */
  componentHandler.ComponentConfig; // jshint ignore:line

  /**
   * Created component (i.e., upgraded element) type as managed by
   * componentHandler. Provided for benefit of the Closure compiler.
   *
   * @typedef {{
   *   element_: !HTMLElement,
   *   className: string,
   *   classAsString: string,
   *   cssClass: string,
   *   widget: string
   * }}
   */
  componentHandler.Component; // jshint ignore:line

  // Export all symbols, for the benefit of Closure compiler.
  // No effect on uncompiled code.
  componentHandler['upgradeDom'] = componentHandler.upgradeDom;
  componentHandler['upgradeElement'] = componentHandler.upgradeElement;
  componentHandler['upgradeElements'] = componentHandler.upgradeElements;
  componentHandler['upgradeAllRegistered'] = componentHandler.upgradeAllRegistered;
  componentHandler['registerUpgradedCallback'] = componentHandler.registerUpgradedCallback;
  componentHandler['register'] = componentHandler.register;
  componentHandler['downgradeElements'] = componentHandler.downgradeElements;
  window.componentHandler = componentHandler;
  window['componentHandler'] = componentHandler;

  window.addEventListener('load', function () {
    'use strict';

    /**
     * Performs a "Cutting the mustard" test. If the browser supports the features
     * tested, adds a mdl-js class to the <html> element. It then upgrades all MDL
     * components requiring JavaScript.
     */

    if ('classList' in document.createElement('div') && 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
      document.documentElement.classList.add('mdl-js');
      componentHandler.upgradeAllRegistered();
    } else {
      /**
       * Dummy function to avoid JS errors.
       */
      componentHandler.upgradeElement = function () {};
      /**
       * Dummy function to avoid JS errors.
       */
      componentHandler.register = function () {};
    }
  });

  // Source: https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
  // Adapted from https://gist.github.com/paulirish/1579671 which derived from
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller.
  // Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
  // MIT license
  if (!Date.now) {
    /**
     * Date.now polyfill.
     * @return {number} the current Date
     */
    Date.now = function () {
      return new Date().getTime();
    };
    Date['now'] = Date.now;
  }
  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    window['requestAnimationFrame'] = window.requestAnimationFrame;
    window['cancelAnimationFrame'] = window.cancelAnimationFrame;
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    /**
     * requestAnimationFrame polyfill.
     * @param  {!Function} callback the callback function.
     */
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
    window['requestAnimationFrame'] = window.requestAnimationFrame;
    window['cancelAnimationFrame'] = window.cancelAnimationFrame;
  }

  /**
   * @license
   * Copyright 2015 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  /**
     * Class constructor for Textfield MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @constructor
     * @param {HTMLElement} element The element that will be upgraded.
     */
  var MaterialTextfield = function MaterialTextfield(element) {
    this.element_ = element;
    this.maxRows = this.Constant_.NO_MAX_ROWS;
    // Initialize instance.
    this.init();
  };
  window['MaterialTextfield'] = MaterialTextfield;
  /**
     * Store constants in one place so they can be updated easily.
     *
     * @enum {string | number}
     * @private
     */
  MaterialTextfield.prototype.Constant_ = {
    NO_MAX_ROWS: -1,
    MAX_ROWS_ATTRIBUTE: 'maxrows'
  };
  /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
  MaterialTextfield.prototype.CssClasses_ = {
    LABEL: 'mdl-textfield__label',
    INPUT: 'mdl-textfield__input',
    IS_DIRTY: 'is-dirty',
    IS_FOCUSED: 'is-focused',
    IS_DISABLED: 'is-disabled',
    IS_INVALID: 'is-invalid',
    IS_UPGRADED: 'is-upgraded',
    HAS_PLACEHOLDER: 'has-placeholder'
  };
  /**
     * Handle input being entered.
     *
     * @param {Event} event The event that fired.
     * @private
     */
  MaterialTextfield.prototype.onKeyDown_ = function (event) {
    var currentRowCount = event.target.value.split('\n').length;
    if (event.keyCode === 13) {
      if (currentRowCount >= this.maxRows) {
        event.preventDefault();
      }
    }
  };
  /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
  MaterialTextfield.prototype.onFocus_ = function (event) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
  };
  /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
  MaterialTextfield.prototype.onBlur_ = function (event) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  };
  /**
     * Handle reset event from out side.
     *
     * @param {Event} event The event that fired.
     * @private
     */
  MaterialTextfield.prototype.onReset_ = function (event) {
    this.updateClasses_();
  };
  /**
     * Handle class updates.
     *
     * @private
     */
  MaterialTextfield.prototype.updateClasses_ = function () {
    this.checkDisabled();
    this.checkValidity();
    this.checkDirty();
    this.checkFocus();
  };
  // Public methods.
  /**
     * Check the disabled state and update field accordingly.
     *
     * @public
     */
  MaterialTextfield.prototype.checkDisabled = function () {
    if (this.input_.disabled) {
      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    }
  };
  MaterialTextfield.prototype['checkDisabled'] = MaterialTextfield.prototype.checkDisabled;
  /**
    * Check the focus state and update field accordingly.
    *
    * @public
    */
  MaterialTextfield.prototype.checkFocus = function () {
    if (Boolean(this.element_.querySelector(':focus'))) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    }
  };
  MaterialTextfield.prototype['checkFocus'] = MaterialTextfield.prototype.checkFocus;
  /**
     * Check the validity state and update field accordingly.
     *
     * @public
     */
  MaterialTextfield.prototype.checkValidity = function () {
    if (this.input_.validity) {
      if (this.input_.validity.valid) {
        this.element_.classList.remove(this.CssClasses_.IS_INVALID);
      } else {
        this.element_.classList.add(this.CssClasses_.IS_INVALID);
      }
    }
  };
  MaterialTextfield.prototype['checkValidity'] = MaterialTextfield.prototype.checkValidity;
  /**
     * Check the dirty state and update field accordingly.
     *
     * @public
     */
  MaterialTextfield.prototype.checkDirty = function () {
    if (this.input_.value && this.input_.value.length > 0) {
      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
    }
  };
  MaterialTextfield.prototype['checkDirty'] = MaterialTextfield.prototype.checkDirty;
  /**
     * Disable text field.
     *
     * @public
     */
  MaterialTextfield.prototype.disable = function () {
    this.input_.disabled = true;
    this.updateClasses_();
  };
  MaterialTextfield.prototype['disable'] = MaterialTextfield.prototype.disable;
  /**
     * Enable text field.
     *
     * @public
     */
  MaterialTextfield.prototype.enable = function () {
    this.input_.disabled = false;
    this.updateClasses_();
  };
  MaterialTextfield.prototype['enable'] = MaterialTextfield.prototype.enable;
  /**
     * Update text field value.
     *
     * @param {string} value The value to which to set the control (optional).
     * @public
     */
  MaterialTextfield.prototype.change = function (value) {
    this.input_.value = value || '';
    this.updateClasses_();
  };
  MaterialTextfield.prototype['change'] = MaterialTextfield.prototype.change;
  /**
     * Initialize element.
     */
  MaterialTextfield.prototype.init = function () {
    if (this.element_) {
      this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
      this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
      if (this.input_) {
        if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
          this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
          if (isNaN(this.maxRows)) {
            this.maxRows = this.Constant_.NO_MAX_ROWS;
          }
        }
        if (this.input_.hasAttribute('placeholder')) {
          this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
        }
        this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
        this.boundFocusHandler = this.onFocus_.bind(this);
        this.boundBlurHandler = this.onBlur_.bind(this);
        this.boundResetHandler = this.onReset_.bind(this);
        this.input_.addEventListener('input', this.boundUpdateClassesHandler);
        this.input_.addEventListener('focus', this.boundFocusHandler);
        this.input_.addEventListener('blur', this.boundBlurHandler);
        this.input_.addEventListener('reset', this.boundResetHandler);
        if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
          // TODO: This should handle pasting multi line text.
          // Currently doesn't.
          this.boundKeyDownHandler = this.onKeyDown_.bind(this);
          this.input_.addEventListener('keydown', this.boundKeyDownHandler);
        }
        var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
        this.updateClasses_();
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        if (invalid) {
          this.element_.classList.add(this.CssClasses_.IS_INVALID);
        }
        if (this.input_.hasAttribute('autofocus')) {
          this.element_.focus();
          this.checkFocus();
        }
      }
    }
  };
  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialTextfield,
    classAsString: 'MaterialTextfield',
    cssClass: 'mdl-js-textfield',
    widget: true
  });
};

;

exports.default = material;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default values
 */
exports.default = {
  fixtures: _react2.default.PropTypes.array,
  initialValue: _react2.default.PropTypes.string,
  placeholderMaterial: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  inputClassName: _react2.default.PropTypes.string,
  suggestsClassName: _react2.default.PropTypes.string,
  suggestsHiddenClassName: _react2.default.PropTypes.string,
  suggestItemClassName: _react2.default.PropTypes.string,
  suggestItemActiveClassName: _react2.default.PropTypes.string,
  location: _react2.default.PropTypes.object,
  radius: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  bounds: _react2.default.PropTypes.object,
  country: _react2.default.PropTypes.string,
  types: _react2.default.PropTypes.array,
  queryDelay: _react2.default.PropTypes.number,
  googleMaps: _react2.default.PropTypes.object,
  onSuggestSelect: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onKeyPress: _react2.default.PropTypes.func,
  skipSuggest: _react2.default.PropTypes.func,
  getSuggestLabel: _react2.default.PropTypes.func,
  autoActivateFirstSuggest: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.shape({
    input: _react2.default.PropTypes.object,
    suggests: _react2.default.PropTypes.object,
    suggestItem: _react2.default.PropTypes.object
  }),
  ignoreTab: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _shallowCompare = require('react/lib/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestItem = function (_React$Component) {
  _inherits(SuggestItem, _React$Component);

  function SuggestItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuggestItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuggestItem.__proto__ || Object.getPrototypeOf(SuggestItem)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      event.preventDefault();
      _this.props.onSelect(_this.props.suggest);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuggestItem, [{
    key: 'shouldComponentUpdate',

    /**
     * Whether or not the component should update
     * @param {Object} nextProps The new properties
     * @param {Object} nextState The new state
     * @return {Boolean} Update or not?
     */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shallowCompare2.default)(this, nextProps, nextState);
    }

    /**
     * When the suggest item got clicked
     * @param {Event} event The click event
     */

  }, {
    key: 'render',


    /**
     * Render the view
     * @return {Function} The React element to render
     */
    value: function render() {
      var classes = (0, _classnames3.default)('geosuggest__item', this.props.className, this.props.suggestItemClassName, { 'geosuggest__item--active': this.props.isActive }, _defineProperty({}, this.props.activeClassname, this.props.activeClassname ? this.props.isActive : null));

      return _react2.default.createElement(
        'li',
        { className: classes,
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onMouseOut: this.props.onMouseOut,
          onClick: this.onClick },
        this.props.suggest.label
      );
    }
  }]);

  return SuggestItem;
}(_react2.default.Component);

/**
 * Default values for the properties
 * @type {Object}
 */


exports.default = SuggestItem;
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};

},{"classnames":1,"react/lib/shallowCompare":4}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _shallowCompare = require('react/lib/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _suggestItem = require('./suggest-item');

var _suggestItem2 = _interopRequireDefault(_suggestItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestList = function (_React$Component) {
  _inherits(SuggestList, _React$Component);

  function SuggestList() {
    _classCallCheck(this, SuggestList);

    return _possibleConstructorReturn(this, (SuggestList.__proto__ || Object.getPrototypeOf(SuggestList)).apply(this, arguments));
  }

  _createClass(SuggestList, [{
    key: 'shouldComponentUpdate',

    /**
     * Whether or not the component should update
     * @param {Object} nextProps The new properties
     * @param {Object} nextState The new state
     * @return {Boolean} Update or not?
     */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shallowCompare2.default)(this, nextProps, nextState);
    }

    /**
     * Whether or not it is hidden
     * @return {Boolean} Hidden or not?
     */

  }, {
    key: 'isHidden',
    value: function isHidden() {
      return this.props.isHidden || this.props.suggests.length === 0;
    }

    /**
     * There are new properties available for the list
     * @param {Object} nextProps The new properties
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.suggests !== this.props.suggests) {
        if (nextProps.suggests.length === 0) {
          this.props.onSuggestNoResults();
        }
      }
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = (0, _classnames3.default)('geosuggest__suggests', this.props.suggestsClassName, { 'geosuggest__suggests--hidden': this.isHidden() }, _defineProperty({}, this.props.hiddenClassName, this.props.hiddenClassName ? this.isHidden() : null));

      return _react2.default.createElement(
        'ul',
        { className: classes, style: this.props.style },
        this.props.suggests.map(function (suggest) {
          var isActive = _this2.props.activeSuggest && suggest.placeId === _this2.props.activeSuggest.placeId;

          return _react2.default.createElement(_suggestItem2.default, { key: suggest.placeId,
            className: suggest.className,
            suggest: suggest,
            style: _this2.props.suggestItemStyle,
            suggestItemClassName: _this2.props.suggestItemClassName,
            isActive: isActive,
            activeClassname: _this2.props.suggestItemActiveClassName,
            onMouseDown: _this2.props.onSuggestMouseDown,
            onMouseOut: _this2.props.onSuggestMouseOut,
            onSelect: _this2.props.onSuggestSelect });
        })
      );
    }
  }]);

  return SuggestList;
}(_react2.default.Component);

/**
 * Default values for the properties
 * @type {Object}
 */


exports.default = SuggestList;
SuggestList.defaultProps = {
  isHidden: true,
  suggests: []
};

},{"./suggest-item":11,"classnames":1,"react/lib/shallowCompare":4}]},{},[5])(5)
});