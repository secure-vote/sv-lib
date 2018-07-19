(function (global, factory) {
       typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
       typeof define === 'function' && define.amd ? define(factory) :
       (global.svLib = factory());
}(this, (function () { 'use strict';

       function _isPlaceholder(a) {
              return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
       }

       /**
        * Optimized internal one-arity curry function.
        *
        * @private
        * @category Function
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */
       function _curry1(fn) {
         return function f1(a) {
           if (arguments.length === 0 || _isPlaceholder(a)) {
             return f1;
           } else {
             return fn.apply(this, arguments);
           }
         };
       }

       /**
        * Returns a function that always returns the given value. Note that for
        * non-primitives the value returned is a reference to the original value.
        *
        * This function is known as `const`, `constant`, or `K` (for K combinator) in
        * other languages and libraries.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig a -> (* -> a)
        * @param {*} val The value to wrap in a function
        * @return {Function} A Function :: * -> val.
        * @example
        *
        *      var t = R.always('Tee');
        *      t(); //=> 'Tee'
        */
       var always = /*#__PURE__*/_curry1(function always(val) {
         return function () {
           return val;
         };
       });

       /**
        * A function that always returns `false`. Any passed in parameters are ignored.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category Function
        * @sig * -> Boolean
        * @param {*}
        * @return {Boolean}
        * @see R.always, R.T
        * @example
        *
        *      R.F(); //=> false
        */
       var F = /*#__PURE__*/always(false);

       /**
        * A function that always returns `true`. Any passed in parameters are ignored.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category Function
        * @sig * -> Boolean
        * @param {*}
        * @return {Boolean}
        * @see R.always, R.F
        * @example
        *
        *      R.T(); //=> true
        */
       var T = /*#__PURE__*/always(true);

       /**
        * A special placeholder value used to specify "gaps" within curried functions,
        * allowing partial application of any combination of arguments, regardless of
        * their positions.
        *
        * If `g` is a curried ternary function and `_` is `R.__`, the following are
        * equivalent:
        *
        *   - `g(1, 2, 3)`
        *   - `g(_, 2, 3)(1)`
        *   - `g(_, _, 3)(1)(2)`
        *   - `g(_, _, 3)(1, 2)`
        *   - `g(_, 2, _)(1, 3)`
        *   - `g(_, 2)(1)(3)`
        *   - `g(_, 2)(1, 3)`
        *   - `g(_, 2)(_, 3)(1)`
        *
        * @constant
        * @memberOf R
        * @since v0.6.0
        * @category Function
        * @example
        *
        *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
        *      greet('Alice'); //=> 'Hello, Alice!'
        */

       /**
        * Optimized internal two-arity curry function.
        *
        * @private
        * @category Function
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */
       function _curry2(fn) {
         return function f2(a, b) {
           switch (arguments.length) {
             case 0:
               return f2;
             case 1:
               return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
                 return fn(a, _b);
               });
             default:
               return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
                 return fn(_a, b);
               }) : _isPlaceholder(b) ? _curry1(function (_b) {
                 return fn(a, _b);
               }) : fn(a, b);
           }
         };
       }

       /**
        * Adds two values.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Math
        * @sig Number -> Number -> Number
        * @param {Number} a
        * @param {Number} b
        * @return {Number}
        * @see R.subtract
        * @example
        *
        *      R.add(2, 3);       //=>  5
        *      R.add(7)(10);      //=> 17
        */
       var add = /*#__PURE__*/_curry2(function add(a, b) {
         return Number(a) + Number(b);
       });

       /**
        * Private `concat` function to merge two array-like objects.
        *
        * @private
        * @param {Array|Arguments} [set1=[]] An array-like object.
        * @param {Array|Arguments} [set2=[]] An array-like object.
        * @return {Array} A new, merged array.
        * @example
        *
        *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
        */
       function _concat(set1, set2) {
         set1 = set1 || [];
         set2 = set2 || [];
         var idx;
         var len1 = set1.length;
         var len2 = set2.length;
         var result = [];

         idx = 0;
         while (idx < len1) {
           result[result.length] = set1[idx];
           idx += 1;
         }
         idx = 0;
         while (idx < len2) {
           result[result.length] = set2[idx];
           idx += 1;
         }
         return result;
       }

       function _arity(n, fn) {
         /* eslint-disable no-unused-vars */
         switch (n) {
           case 0:
             return function () {
               return fn.apply(this, arguments);
             };
           case 1:
             return function (a0) {
               return fn.apply(this, arguments);
             };
           case 2:
             return function (a0, a1) {
               return fn.apply(this, arguments);
             };
           case 3:
             return function (a0, a1, a2) {
               return fn.apply(this, arguments);
             };
           case 4:
             return function (a0, a1, a2, a3) {
               return fn.apply(this, arguments);
             };
           case 5:
             return function (a0, a1, a2, a3, a4) {
               return fn.apply(this, arguments);
             };
           case 6:
             return function (a0, a1, a2, a3, a4, a5) {
               return fn.apply(this, arguments);
             };
           case 7:
             return function (a0, a1, a2, a3, a4, a5, a6) {
               return fn.apply(this, arguments);
             };
           case 8:
             return function (a0, a1, a2, a3, a4, a5, a6, a7) {
               return fn.apply(this, arguments);
             };
           case 9:
             return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
               return fn.apply(this, arguments);
             };
           case 10:
             return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
               return fn.apply(this, arguments);
             };
           default:
             throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
         }
       }

       /**
        * Internal curryN function.
        *
        * @private
        * @category Function
        * @param {Number} length The arity of the curried function.
        * @param {Array} received An array of arguments received thus far.
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */
       function _curryN(length, received, fn) {
         return function () {
           var combined = [];
           var argsIdx = 0;
           var left = length;
           var combinedIdx = 0;
           while (combinedIdx < received.length || argsIdx < arguments.length) {
             var result;
             if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
               result = received[combinedIdx];
             } else {
               result = arguments[argsIdx];
               argsIdx += 1;
             }
             combined[combinedIdx] = result;
             if (!_isPlaceholder(result)) {
               left -= 1;
             }
             combinedIdx += 1;
           }
           return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
         };
       }

       /**
        * Returns a curried equivalent of the provided function, with the specified
        * arity. The curried function has two unusual capabilities. First, its
        * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
        * following are equivalent:
        *
        *   - `g(1)(2)(3)`
        *   - `g(1)(2, 3)`
        *   - `g(1, 2)(3)`
        *   - `g(1, 2, 3)`
        *
        * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
        * "gaps", allowing partial application of any combination of arguments,
        * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
        * the following are equivalent:
        *
        *   - `g(1, 2, 3)`
        *   - `g(_, 2, 3)(1)`
        *   - `g(_, _, 3)(1)(2)`
        *   - `g(_, _, 3)(1, 2)`
        *   - `g(_, 2)(1)(3)`
        *   - `g(_, 2)(1, 3)`
        *   - `g(_, 2)(_, 3)(1)`
        *
        * @func
        * @memberOf R
        * @since v0.5.0
        * @category Function
        * @sig Number -> (* -> a) -> (* -> a)
        * @param {Number} length The arity for the returned function.
        * @param {Function} fn The function to curry.
        * @return {Function} A new, curried function.
        * @see R.curry
        * @example
        *
        *      var sumArgs = (...args) => R.sum(args);
        *
        *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
        *      var f = curriedAddFourNumbers(1, 2);
        *      var g = f(3);
        *      g(4); //=> 10
        */
       var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
         if (length === 1) {
           return _curry1(fn);
         }
         return _arity(length, _curryN(length, [], fn));
       });

       /**
        * Optimized internal three-arity curry function.
        *
        * @private
        * @category Function
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */
       function _curry3(fn) {
         return function f3(a, b, c) {
           switch (arguments.length) {
             case 0:
               return f3;
             case 1:
               return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
                 return fn(a, _b, _c);
               });
             case 2:
               return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
                 return fn(_a, b, _c);
               }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
                 return fn(a, _b, _c);
               }) : _curry1(function (_c) {
                 return fn(a, b, _c);
               });
             default:
               return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
                 return fn(_a, _b, c);
               }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
                 return fn(_a, b, _c);
               }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
                 return fn(a, _b, _c);
               }) : _isPlaceholder(a) ? _curry1(function (_a) {
                 return fn(_a, b, c);
               }) : _isPlaceholder(b) ? _curry1(function (_b) {
                 return fn(a, _b, c);
               }) : _isPlaceholder(c) ? _curry1(function (_c) {
                 return fn(a, b, _c);
               }) : fn(a, b, c);
           }
         };
       }

       /**
        * Tests whether or not an object is an array.
        *
        * @private
        * @param {*} val The object to test.
        * @return {Boolean} `true` if `val` is an array, `false` otherwise.
        * @example
        *
        *      _isArray([]); //=> true
        *      _isArray(null); //=> false
        *      _isArray({}); //=> false
        */
       var _isArray = Array.isArray || function _isArray(val) {
         return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
       };

       function _isTransformer(obj) {
         return typeof obj['@@transducer/step'] === 'function';
       }

       /**
        * Returns a function that dispatches with different strategies based on the
        * object in list position (last argument). If it is an array, executes [fn].
        * Otherwise, if it has a function with one of the given method names, it will
        * execute that function (functor case). Otherwise, if it is a transformer,
        * uses transducer [xf] to return a new transformer (transducer case).
        * Otherwise, it will default to executing [fn].
        *
        * @private
        * @param {Array} methodNames properties to check for a custom implementation
        * @param {Function} xf transducer to initialize if object is transformer
        * @param {Function} fn default ramda implementation
        * @return {Function} A function that dispatches on object in list position
        */
       function _dispatchable(methodNames, xf, fn) {
         return function () {
           if (arguments.length === 0) {
             return fn();
           }
           var args = Array.prototype.slice.call(arguments, 0);
           var obj = args.pop();
           if (!_isArray(obj)) {
             var idx = 0;
             while (idx < methodNames.length) {
               if (typeof obj[methodNames[idx]] === 'function') {
                 return obj[methodNames[idx]].apply(obj, args);
               }
               idx += 1;
             }
             if (_isTransformer(obj)) {
               var transducer = xf.apply(null, args);
               return transducer(obj);
             }
           }
           return fn.apply(this, arguments);
         };
       }

       function _reduced(x) {
         return x && x['@@transducer/reduced'] ? x : {
           '@@transducer/value': x,
           '@@transducer/reduced': true
         };
       }

       var _xfBase = {
         init: function () {
           return this.xf['@@transducer/init']();
         },
         result: function (result) {
           return this.xf['@@transducer/result'](result);
         }
       };

       var XAll = /*#__PURE__*/function () {
         function XAll(f, xf) {
           this.xf = xf;
           this.f = f;
           this.all = true;
         }
         XAll.prototype['@@transducer/init'] = _xfBase.init;
         XAll.prototype['@@transducer/result'] = function (result) {
           if (this.all) {
             result = this.xf['@@transducer/step'](result, true);
           }
           return this.xf['@@transducer/result'](result);
         };
         XAll.prototype['@@transducer/step'] = function (result, input) {
           if (!this.f(input)) {
             this.all = false;
             result = _reduced(this.xf['@@transducer/step'](result, false));
           }
           return result;
         };

         return XAll;
       }();

       var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
         return new XAll(f, xf);
       });

       /**
        * Returns `true` if all elements of the list match the predicate, `false` if
        * there are any that don't.
        *
        * Dispatches to the `all` method of the second argument, if present.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig (a -> Boolean) -> [a] -> Boolean
        * @param {Function} fn The predicate function.
        * @param {Array} list The array to consider.
        * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
        *         otherwise.
        * @see R.any, R.none, R.transduce
        * @example
        *
        *      var equals3 = R.equals(3);
        *      R.all(equals3)([3, 3, 3, 3]); //=> true
        *      R.all(equals3)([3, 3, 1, 3]); //=> false
        */
       var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
         var idx = 0;
         while (idx < list.length) {
           if (!fn(list[idx])) {
             return false;
           }
           idx += 1;
         }
         return true;
       }));

       /**
        * Returns the larger of its two arguments.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Relation
        * @sig Ord a => a -> a -> a
        * @param {*} a
        * @param {*} b
        * @return {*}
        * @see R.maxBy, R.min
        * @example
        *
        *      R.max(789, 123); //=> 789
        *      R.max('a', 'b'); //=> 'b'
        */
       var max = /*#__PURE__*/_curry2(function max(a, b) {
         return b > a ? b : a;
       });

       function _map(fn, functor) {
         var idx = 0;
         var len = functor.length;
         var result = Array(len);
         while (idx < len) {
           result[idx] = fn(functor[idx]);
           idx += 1;
         }
         return result;
       }

       function _isString(x) {
         return Object.prototype.toString.call(x) === '[object String]';
       }

       /**
        * Tests whether or not an object is similar to an array.
        *
        * @private
        * @category Type
        * @category List
        * @sig * -> Boolean
        * @param {*} x The object to test.
        * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
        * @example
        *
        *      _isArrayLike([]); //=> true
        *      _isArrayLike(true); //=> false
        *      _isArrayLike({}); //=> false
        *      _isArrayLike({length: 10}); //=> false
        *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
        */
       var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
         if (_isArray(x)) {
           return true;
         }
         if (!x) {
           return false;
         }
         if (typeof x !== 'object') {
           return false;
         }
         if (_isString(x)) {
           return false;
         }
         if (x.nodeType === 1) {
           return !!x.length;
         }
         if (x.length === 0) {
           return true;
         }
         if (x.length > 0) {
           return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
         }
         return false;
       });

       var XWrap = /*#__PURE__*/function () {
         function XWrap(fn) {
           this.f = fn;
         }
         XWrap.prototype['@@transducer/init'] = function () {
           throw new Error('init not implemented on XWrap');
         };
         XWrap.prototype['@@transducer/result'] = function (acc) {
           return acc;
         };
         XWrap.prototype['@@transducer/step'] = function (acc, x) {
           return this.f(acc, x);
         };

         return XWrap;
       }();

       function _xwrap(fn) {
         return new XWrap(fn);
       }

       /**
        * Creates a function that is bound to a context.
        * Note: `R.bind` does not provide the additional argument-binding capabilities of
        * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
        *
        * @func
        * @memberOf R
        * @since v0.6.0
        * @category Function
        * @category Object
        * @sig (* -> *) -> {*} -> (* -> *)
        * @param {Function} fn The function to bind to context
        * @param {Object} thisObj The context to bind `fn` to
        * @return {Function} A function that will execute in the context of `thisObj`.
        * @see R.partial
        * @example
        *
        *      var log = R.bind(console.log, console);
        *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
        *      // logs {a: 2}
        * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
        */
       var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
         return _arity(fn.length, function () {
           return fn.apply(thisObj, arguments);
         });
       });

       function _arrayReduce(xf, acc, list) {
         var idx = 0;
         var len = list.length;
         while (idx < len) {
           acc = xf['@@transducer/step'](acc, list[idx]);
           if (acc && acc['@@transducer/reduced']) {
             acc = acc['@@transducer/value'];
             break;
           }
           idx += 1;
         }
         return xf['@@transducer/result'](acc);
       }

       function _iterableReduce(xf, acc, iter) {
         var step = iter.next();
         while (!step.done) {
           acc = xf['@@transducer/step'](acc, step.value);
           if (acc && acc['@@transducer/reduced']) {
             acc = acc['@@transducer/value'];
             break;
           }
           step = iter.next();
         }
         return xf['@@transducer/result'](acc);
       }

       function _methodReduce(xf, acc, obj, methodName) {
         return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
       }

       var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

       function _reduce(fn, acc, list) {
         if (typeof fn === 'function') {
           fn = _xwrap(fn);
         }
         if (_isArrayLike(list)) {
           return _arrayReduce(fn, acc, list);
         }
         if (typeof list['fantasy-land/reduce'] === 'function') {
           return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
         }
         if (list[symIterator] != null) {
           return _iterableReduce(fn, acc, list[symIterator]());
         }
         if (typeof list.next === 'function') {
           return _iterableReduce(fn, acc, list);
         }
         if (typeof list.reduce === 'function') {
           return _methodReduce(fn, acc, list, 'reduce');
         }

         throw new TypeError('reduce: list must be array or iterable');
       }

       var XMap = /*#__PURE__*/function () {
         function XMap(f, xf) {
           this.xf = xf;
           this.f = f;
         }
         XMap.prototype['@@transducer/init'] = _xfBase.init;
         XMap.prototype['@@transducer/result'] = _xfBase.result;
         XMap.prototype['@@transducer/step'] = function (result, input) {
           return this.xf['@@transducer/step'](result, this.f(input));
         };

         return XMap;
       }();

       var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
         return new XMap(f, xf);
       });

       function _has(prop, obj) {
         return Object.prototype.hasOwnProperty.call(obj, prop);
       }

       var toString = Object.prototype.toString;
       var _isArguments = function () {
         return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
           return toString.call(x) === '[object Arguments]';
         } : function _isArguments(x) {
           return _has('callee', x);
         };
       };

       // cover IE < 9 keys issues
       var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
       var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
       // Safari bug
       var hasArgsEnumBug = /*#__PURE__*/function () {

         return arguments.propertyIsEnumerable('length');
       }();

       var contains = function contains(list, item) {
         var idx = 0;
         while (idx < list.length) {
           if (list[idx] === item) {
             return true;
           }
           idx += 1;
         }
         return false;
       };

       /**
        * Returns a list containing the names of all the enumerable own properties of
        * the supplied object.
        * Note that the order of the output array is not guaranteed to be consistent
        * across different JS platforms.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Object
        * @sig {k: v} -> [k]
        * @param {Object} obj The object to extract properties from
        * @return {Array} An array of the object's own properties.
        * @see R.keysIn, R.values
        * @example
        *
        *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
        */
       var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
         return Object(obj) !== obj ? [] : Object.keys(obj);
       } : function keys(obj) {
         if (Object(obj) !== obj) {
           return [];
         }
         var prop, nIdx;
         var ks = [];
         var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
         for (prop in obj) {
           if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
             ks[ks.length] = prop;
           }
         }
         if (hasEnumBug) {
           nIdx = nonEnumerableProps.length - 1;
           while (nIdx >= 0) {
             prop = nonEnumerableProps[nIdx];
             if (_has(prop, obj) && !contains(ks, prop)) {
               ks[ks.length] = prop;
             }
             nIdx -= 1;
           }
         }
         return ks;
       };
       var keys = /*#__PURE__*/_curry1(_keys);

       /**
        * Takes a function and
        * a [functor](https://github.com/fantasyland/fantasy-land#functor),
        * applies the function to each of the functor's values, and returns
        * a functor of the same shape.
        *
        * Ramda provides suitable `map` implementations for `Array` and `Object`,
        * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
        *
        * Dispatches to the `map` method of the second argument, if present.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * Also treats functions as functors and will compose them together.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Functor f => (a -> b) -> f a -> f b
        * @param {Function} fn The function to be called on every element of the input `list`.
        * @param {Array} list The list to be iterated over.
        * @return {Array} The new list.
        * @see R.transduce, R.addIndex
        * @example
        *
        *      var double = x => x * 2;
        *
        *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
        *
        *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
        * @symb R.map(f, [a, b]) = [f(a), f(b)]
        * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
        * @symb R.map(f, functor_o) = functor_o.map(f)
        */
       var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
         switch (Object.prototype.toString.call(functor)) {
           case '[object Function]':
             return curryN(functor.length, function () {
               return fn.call(this, functor.apply(this, arguments));
             });
           case '[object Object]':
             return _reduce(function (acc, key) {
               acc[key] = fn(functor[key]);
               return acc;
             }, {}, keys(functor));
           default:
             return _map(fn, functor);
         }
       }));

       /**
        * Retrieve the value at a given path.
        *
        * @func
        * @memberOf R
        * @since v0.2.0
        * @category Object
        * @typedefn Idx = String | Int
        * @sig [Idx] -> {a} -> a | Undefined
        * @param {Array} path The path to use.
        * @param {Object} obj The object to retrieve the nested property from.
        * @return {*} The data at `path`.
        * @see R.prop
        * @example
        *
        *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
        *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
        */
       var path = /*#__PURE__*/_curry2(function path(paths, obj) {
         var val = obj;
         var idx = 0;
         while (idx < paths.length) {
           if (val == null) {
             return;
           }
           val = val[paths[idx]];
           idx += 1;
         }
         return val;
       });

       /**
        * Returns a function that when supplied an object returns the indicated
        * property of that object, if it exists.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Object
        * @sig s -> {s: a} -> a | Undefined
        * @param {String} p The property name
        * @param {Object} obj The object to query
        * @return {*} The value at `obj.p`.
        * @see R.path
        * @example
        *
        *      R.prop('x', {x: 100}); //=> 100
        *      R.prop('x', {}); //=> undefined
        */

       var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
         return path([p], obj);
       });

       /**
        * Returns a new list by plucking the same named property off all objects in
        * the list supplied.
        *
        * `pluck` will work on
        * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
        * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Functor f => k -> f {k: v} -> f v
        * @param {Number|String} key The key name to pluck off of each object.
        * @param {Array} f The array or functor to consider.
        * @return {Array} The list of values for the given key.
        * @see R.props
        * @example
        *
        *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
        *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
        *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
        * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
        * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
        */
       var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
         return map(prop(p), list);
       });

       /**
        * Returns a single item by iterating through the list, successively calling
        * the iterator function and passing it an accumulator value and the current
        * value from the array, and then passing the result to the next call.
        *
        * The iterator function receives two values: *(acc, value)*. It may use
        * [`R.reduced`](#reduced) to shortcut the iteration.
        *
        * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
        * is *(value, acc)*.
        *
        * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
        * arrays), unlike the native `Array.prototype.reduce` method. For more details
        * on this behavior, see:
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
        *
        * Dispatches to the `reduce` method of the third argument, if present. When
        * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
        * shortcuting, as this is not implemented by `reduce`.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig ((a, b) -> a) -> a -> [b] -> a
        * @param {Function} fn The iterator function. Receives two values, the accumulator and the
        *        current element from the array.
        * @param {*} acc The accumulator value.
        * @param {Array} list The list to iterate over.
        * @return {*} The final, accumulated value.
        * @see R.reduced, R.addIndex, R.reduceRight
        * @example
        *
        *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
        *      //          -               -10
        *      //         / \              / \
        *      //        -   4           -6   4
        *      //       / \              / \
        *      //      -   3   ==>     -3   3
        *      //     / \              / \
        *      //    -   2           -1   2
        *      //   / \              / \
        *      //  0   1            0   1
        *
        * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
        */
       var reduce = /*#__PURE__*/_curry3(_reduce);

       /**
        * ap applies a list of functions to a list of values.
        *
        * Dispatches to the `ap` method of the second argument, if present. Also
        * treats curried functions as applicatives.
        *
        * @func
        * @memberOf R
        * @since v0.3.0
        * @category Function
        * @sig [a -> b] -> [a] -> [b]
        * @sig Apply f => f (a -> b) -> f a -> f b
        * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
        * @param {*} applyF
        * @param {*} applyX
        * @return {*}
        * @example
        *
        *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
        *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
        *
        *      // R.ap can also be used as S combinator
        *      // when only two functions are passed
        *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
        * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
        */
       var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
         return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
           return applyF(x)(applyX(x));
         } :
         // else
         _reduce(function (acc, f) {
           return _concat(acc, map(f, applyX));
         }, [], applyF);
       });

       /**
        * Determine if the passed argument is an integer.
        *
        * @private
        * @param {*} n
        * @category Type
        * @return {Boolean}
        */

       function _isFunction(x) {
         return Object.prototype.toString.call(x) === '[object Function]';
       }

       /**
        * "lifts" a function to be the specified arity, so that it may "map over" that
        * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
        *
        * @func
        * @memberOf R
        * @since v0.7.0
        * @category Function
        * @sig Number -> (*... -> *) -> ([*]... -> [*])
        * @param {Function} fn The function to lift into higher context
        * @return {Function} The lifted function.
        * @see R.lift, R.ap
        * @example
        *
        *      var madd3 = R.liftN(3, (...args) => R.sum(args));
        *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
        */
       var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
         var lifted = curryN(arity, fn);
         return curryN(arity, function () {
           return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
         });
       });

       /**
        * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
        * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
        *
        * @func
        * @memberOf R
        * @since v0.7.0
        * @category Function
        * @sig (*... -> *) -> ([*]... -> [*])
        * @param {Function} fn The function to lift into higher context
        * @return {Function} The lifted function.
        * @see R.liftN
        * @example
        *
        *      var madd3 = R.lift((a, b, c) => a + b + c);
        *
        *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
        *
        *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
        *
        *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
        */
       var lift = /*#__PURE__*/_curry1(function lift(fn) {
         return liftN(fn.length, fn);
       });

       /**
        * Returns a curried equivalent of the provided function. The curried function
        * has two unusual capabilities. First, its arguments needn't be provided one
        * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
        * following are equivalent:
        *
        *   - `g(1)(2)(3)`
        *   - `g(1)(2, 3)`
        *   - `g(1, 2)(3)`
        *   - `g(1, 2, 3)`
        *
        * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
        * "gaps", allowing partial application of any combination of arguments,
        * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
        * the following are equivalent:
        *
        *   - `g(1, 2, 3)`
        *   - `g(_, 2, 3)(1)`
        *   - `g(_, _, 3)(1)(2)`
        *   - `g(_, _, 3)(1, 2)`
        *   - `g(_, 2)(1)(3)`
        *   - `g(_, 2)(1, 3)`
        *   - `g(_, 2)(_, 3)(1)`
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig (* -> a) -> (* -> a)
        * @param {Function} fn The function to curry.
        * @return {Function} A new, curried function.
        * @see R.curryN
        * @example
        *
        *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
        *
        *      var curriedAddFourNumbers = R.curry(addFourNumbers);
        *      var f = curriedAddFourNumbers(1, 2);
        *      var g = f(3);
        *      g(4); //=> 10
        */
       var curry = /*#__PURE__*/_curry1(function curry(fn) {
         return curryN(fn.length, fn);
       });

       /**
        * Returns the result of calling its first argument with the remaining
        * arguments. This is occasionally useful as a converging function for
        * [`R.converge`](#converge): the first branch can produce a function while the
        * remaining branches produce values to be passed to that function as its
        * arguments.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category Function
        * @sig (*... -> a),*... -> a
        * @param {Function} fn The function to apply to the remaining arguments.
        * @param {...*} args Any number of positional arguments.
        * @return {*}
        * @see R.apply
        * @example
        *
        *      R.call(R.add, 1, 2); //=> 3
        *
        *      var indentN = R.pipe(R.repeat(' '),
        *                           R.join(''),
        *                           R.replace(/^(?!$)/gm));
        *
        *      var format = R.converge(R.call, [
        *                                  R.pipe(R.prop('indent'), indentN),
        *                                  R.prop('value')
        *                              ]);
        *
        *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
        * @symb R.call(f, a, b) = f(a, b)
        */
       var call = /*#__PURE__*/curry(function call(fn) {
         return fn.apply(this, Array.prototype.slice.call(arguments, 1));
       });

       /**
        * `_makeFlat` is a helper function that returns a one-level or fully recursive
        * function based on the flag passed in.
        *
        * @private
        */
       function _makeFlat(recursive) {
         return function flatt(list) {
           var value, jlen, j;
           var result = [];
           var idx = 0;
           var ilen = list.length;

           while (idx < ilen) {
             if (_isArrayLike(list[idx])) {
               value = recursive ? flatt(list[idx]) : list[idx];
               j = 0;
               jlen = value.length;
               while (j < jlen) {
                 result[result.length] = value[j];
                 j += 1;
               }
             } else {
               result[result.length] = list[idx];
             }
             idx += 1;
           }
           return result;
         };
       }

       function _forceReduced(x) {
         return {
           '@@transducer/value': x,
           '@@transducer/reduced': true
         };
       }

       var preservingReduced = function (xf) {
         return {
           '@@transducer/init': _xfBase.init,
           '@@transducer/result': function (result) {
             return xf['@@transducer/result'](result);
           },
           '@@transducer/step': function (result, input) {
             var ret = xf['@@transducer/step'](result, input);
             return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
           }
         };
       };

       var _flatCat = function _xcat(xf) {
         var rxf = preservingReduced(xf);
         return {
           '@@transducer/init': _xfBase.init,
           '@@transducer/result': function (result) {
             return rxf['@@transducer/result'](result);
           },
           '@@transducer/step': function (result, input) {
             return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
           }
         };
       };

       var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
         return map(f, _flatCat(xf));
       });

       /**
        * `chain` maps a function over a list and concatenates the results. `chain`
        * is also known as `flatMap` in some libraries
        *
        * Dispatches to the `chain` method of the second argument, if present,
        * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
        *
        * @func
        * @memberOf R
        * @since v0.3.0
        * @category List
        * @sig Chain m => (a -> m b) -> m a -> m b
        * @param {Function} fn The function to map with
        * @param {Array} list The list to map over
        * @return {Array} The result of flat-mapping `list` with `fn`
        * @example
        *
        *      var duplicate = n => [n, n];
        *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
        *
        *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
        */
       var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
         if (typeof monad === 'function') {
           return function (x) {
             return fn(monad(x))(x);
           };
         }
         return _makeFlat(false)(map(fn, monad));
       }));

       /**
        * Gives a single-word string description of the (native) type of a value,
        * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
        * attempt to distinguish user Object types any further, reporting them all as
        * 'Object'.
        *
        * @func
        * @memberOf R
        * @since v0.8.0
        * @category Type
        * @sig (* -> {*}) -> String
        * @param {*} val The value to test
        * @return {String}
        * @example
        *
        *      R.type({}); //=> "Object"
        *      R.type(1); //=> "Number"
        *      R.type(false); //=> "Boolean"
        *      R.type('s'); //=> "String"
        *      R.type(null); //=> "Null"
        *      R.type([]); //=> "Array"
        *      R.type(/[A-z]/); //=> "RegExp"
        *      R.type(() => {}); //=> "Function"
        *      R.type(undefined); //=> "Undefined"
        */
       var type = /*#__PURE__*/_curry1(function type(val) {
         return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
       });

       /**
        * A function that returns the `!` of its argument. It will return `true` when
        * passed false-y value, and `false` when passed a truth-y one.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Logic
        * @sig * -> Boolean
        * @param {*} a any value
        * @return {Boolean} the logical inverse of passed argument.
        * @see R.complement
        * @example
        *
        *      R.not(true); //=> false
        *      R.not(false); //=> true
        *      R.not(0); //=> true
        *      R.not(1); //=> false
        */
       var not = /*#__PURE__*/_curry1(function not(a) {
         return !a;
       });

       /**
        * Takes a function `f` and returns a function `g` such that if called with the same arguments
        * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
        *
        * `R.complement` may be applied to any functor
        *
        * @func
        * @memberOf R
        * @since v0.12.0
        * @category Logic
        * @sig (*... -> *) -> (*... -> Boolean)
        * @param {Function} f
        * @return {Function}
        * @see R.not
        * @example
        *
        *      var isNotNil = R.complement(R.isNil);
        *      isNil(null); //=> true
        *      isNotNil(null); //=> false
        *      isNil(7); //=> false
        *      isNotNil(7); //=> true
        */
       var complement = /*#__PURE__*/lift(not);

       function _pipe(f, g) {
         return function () {
           return g.call(this, f.apply(this, arguments));
         };
       }

       /**
        * This checks whether a function has a [methodname] function. If it isn't an
        * array it will execute that function otherwise it will default to the ramda
        * implementation.
        *
        * @private
        * @param {Function} fn ramda implemtation
        * @param {String} methodname property to check for a custom implementation
        * @return {Object} Whatever the return value of the method is.
        */
       function _checkForMethod(methodname, fn) {
         return function () {
           var length = arguments.length;
           if (length === 0) {
             return fn();
           }
           var obj = arguments[length - 1];
           return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
         };
       }

       /**
        * Returns the elements of the given list or string (or object with a `slice`
        * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
        *
        * Dispatches to the `slice` method of the third argument, if present.
        *
        * @func
        * @memberOf R
        * @since v0.1.4
        * @category List
        * @sig Number -> Number -> [a] -> [a]
        * @sig Number -> Number -> String -> String
        * @param {Number} fromIndex The start index (inclusive).
        * @param {Number} toIndex The end index (exclusive).
        * @param {*} list
        * @return {*}
        * @example
        *
        *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
        *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
        *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
        *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
        *      R.slice(0, 3, 'ramda');                     //=> 'ram'
        */
       var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
         return Array.prototype.slice.call(list, fromIndex, toIndex);
       }));

       /**
        * Returns all but the first element of the given list or string (or object
        * with a `tail` method).
        *
        * Dispatches to the `slice` method of the first argument, if present.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig [a] -> [a]
        * @sig String -> String
        * @param {*} list
        * @return {*}
        * @see R.head, R.init, R.last
        * @example
        *
        *      R.tail([1, 2, 3]);  //=> [2, 3]
        *      R.tail([1, 2]);     //=> [2]
        *      R.tail([1]);        //=> []
        *      R.tail([]);         //=> []
        *
        *      R.tail('abc');  //=> 'bc'
        *      R.tail('ab');   //=> 'b'
        *      R.tail('a');    //=> ''
        *      R.tail('');     //=> ''
        */
       var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));

       /**
        * Performs left-to-right function composition. The leftmost function may have
        * any arity; the remaining functions must be unary.
        *
        * In some libraries this function is named `sequence`.
        *
        * **Note:** The result of pipe is not automatically curried.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
        * @param {...Function} functions
        * @return {Function}
        * @see R.compose
        * @example
        *
        *      var f = R.pipe(Math.pow, R.negate, R.inc);
        *
        *      f(3, 4); // -(3^4) + 1
        * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
        */
       function pipe() {
         if (arguments.length === 0) {
           throw new Error('pipe requires at least one argument');
         }
         return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
       }

       /**
        * Returns a new list or string with the elements or characters in reverse
        * order.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig [a] -> [a]
        * @sig String -> String
        * @param {Array|String} list
        * @return {Array|String}
        * @example
        *
        *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
        *      R.reverse([1, 2]);     //=> [2, 1]
        *      R.reverse([1]);        //=> [1]
        *      R.reverse([]);         //=> []
        *
        *      R.reverse('abc');      //=> 'cba'
        *      R.reverse('ab');       //=> 'ba'
        *      R.reverse('a');        //=> 'a'
        *      R.reverse('');         //=> ''
        */
       var reverse = /*#__PURE__*/_curry1(function reverse(list) {
         return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
       });

       /**
        * Performs right-to-left function composition. The rightmost function may have
        * any arity; the remaining functions must be unary.
        *
        * **Note:** The result of compose is not automatically curried.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
        * @param {...Function} ...functions The functions to compose
        * @return {Function}
        * @see R.pipe
        * @example
        *
        *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
        *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
        *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
        *
        *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
        *
        * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
        */
       function compose() {
         if (arguments.length === 0) {
           throw new Error('compose requires at least one argument');
         }
         return pipe.apply(this, reverse(arguments));
       }

       function _arrayFromIterator(iter) {
         var list = [];
         var next;
         while (!(next = iter.next()).done) {
           list.push(next.value);
         }
         return list;
       }

       function _containsWith(pred, x, list) {
         var idx = 0;
         var len = list.length;

         while (idx < len) {
           if (pred(x, list[idx])) {
             return true;
           }
           idx += 1;
         }
         return false;
       }

       function _functionName(f) {
         // String(x => x) evaluates to "x => x", so the pattern may not match.
         var match = String(f).match(/^function (\w*)/);
         return match == null ? '' : match[1];
       }

       /**
        * Returns true if its arguments are identical, false otherwise. Values are
        * identical if they reference the same memory. `NaN` is identical to `NaN`;
        * `0` and `-0` are not identical.
        *
        * @func
        * @memberOf R
        * @since v0.15.0
        * @category Relation
        * @sig a -> a -> Boolean
        * @param {*} a
        * @param {*} b
        * @return {Boolean}
        * @example
        *
        *      var o = {};
        *      R.identical(o, o); //=> true
        *      R.identical(1, 1); //=> true
        *      R.identical(1, '1'); //=> false
        *      R.identical([], []); //=> false
        *      R.identical(0, -0); //=> false
        *      R.identical(NaN, NaN); //=> true
        */
       var identical = /*#__PURE__*/_curry2(function identical(a, b) {
         // SameValue algorithm
         if (a === b) {
           // Steps 1-5, 7-10
           // Steps 6.b-6.e: +0 != -0
           return a !== 0 || 1 / a === 1 / b;
         } else {
           // Step 6.a: NaN == NaN
           return a !== a && b !== b;
         }
       });

       /**
        * private _uniqContentEquals function.
        * That function is checking equality of 2 iterator contents with 2 assumptions
        * - iterators lengths are the same
        * - iterators values are unique
        *
        * false-positive result will be returned for comparision of, e.g.
        * - [1,2,3] and [1,2,3,4]
        * - [1,1,1] and [1,2,3]
        * */

       function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
         var a = _arrayFromIterator(aIterator);
         var b = _arrayFromIterator(bIterator);

         function eq(_a, _b) {
           return _equals(_a, _b, stackA.slice(), stackB.slice());
         }

         // if *a* array contains any element that is not included in *b*
         return !_containsWith(function (b, aItem) {
           return !_containsWith(eq, aItem, b);
         }, b, a);
       }

       function _equals(a, b, stackA, stackB) {
         if (identical(a, b)) {
           return true;
         }

         var typeA = type(a);

         if (typeA !== type(b)) {
           return false;
         }

         if (a == null || b == null) {
           return false;
         }

         if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
           return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
         }

         if (typeof a.equals === 'function' || typeof b.equals === 'function') {
           return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
         }

         switch (typeA) {
           case 'Arguments':
           case 'Array':
           case 'Object':
             if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
               return a === b;
             }
             break;
           case 'Boolean':
           case 'Number':
           case 'String':
             if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
               return false;
             }
             break;
           case 'Date':
             if (!identical(a.valueOf(), b.valueOf())) {
               return false;
             }
             break;
           case 'Error':
             return a.name === b.name && a.message === b.message;
           case 'RegExp':
             if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
               return false;
             }
             break;
         }

         var idx = stackA.length - 1;
         while (idx >= 0) {
           if (stackA[idx] === a) {
             return stackB[idx] === b;
           }
           idx -= 1;
         }

         switch (typeA) {
           case 'Map':
             if (a.size !== b.size) {
               return false;
             }

             return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
           case 'Set':
             if (a.size !== b.size) {
               return false;
             }

             return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
           case 'Arguments':
           case 'Array':
           case 'Object':
           case 'Boolean':
           case 'Number':
           case 'String':
           case 'Date':
           case 'Error':
           case 'RegExp':
           case 'Int8Array':
           case 'Uint8Array':
           case 'Uint8ClampedArray':
           case 'Int16Array':
           case 'Uint16Array':
           case 'Int32Array':
           case 'Uint32Array':
           case 'Float32Array':
           case 'Float64Array':
           case 'ArrayBuffer':
             break;
           default:
             // Values of other types are only equal if identical.
             return false;
         }

         var keysA = keys(a);
         if (keysA.length !== keys(b).length) {
           return false;
         }

         var extendedStackA = stackA.concat([a]);
         var extendedStackB = stackB.concat([b]);

         idx = keysA.length - 1;
         while (idx >= 0) {
           var key = keysA[idx];
           if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
             return false;
           }
           idx -= 1;
         }
         return true;
       }

       /**
        * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
        * cyclical data structures.
        *
        * Dispatches symmetrically to the `equals` methods of both arguments, if
        * present.
        *
        * @func
        * @memberOf R
        * @since v0.15.0
        * @category Relation
        * @sig a -> b -> Boolean
        * @param {*} a
        * @param {*} b
        * @return {Boolean}
        * @example
        *
        *      R.equals(1, 1); //=> true
        *      R.equals(1, '1'); //=> false
        *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
        *
        *      var a = {}; a.v = a;
        *      var b = {}; b.v = b;
        *      R.equals(a, b); //=> true
        */
       var equals = /*#__PURE__*/_curry2(function equals(a, b) {
         return _equals(a, b, [], []);
       });

       function _indexOf(list, a, idx) {
         var inf, item;
         // Array.prototype.indexOf doesn't exist below IE9
         if (typeof list.indexOf === 'function') {
           switch (typeof a) {
             case 'number':
               if (a === 0) {
                 // manually crawl the list to distinguish between +0 and -0
                 inf = 1 / a;
                 while (idx < list.length) {
                   item = list[idx];
                   if (item === 0 && 1 / item === inf) {
                     return idx;
                   }
                   idx += 1;
                 }
                 return -1;
               } else if (a !== a) {
                 // NaN
                 while (idx < list.length) {
                   item = list[idx];
                   if (typeof item === 'number' && item !== item) {
                     return idx;
                   }
                   idx += 1;
                 }
                 return -1;
               }
               // non-zero numbers can utilise Set
               return list.indexOf(a, idx);

             // all these types can utilise Set
             case 'string':
             case 'boolean':
             case 'function':
             case 'undefined':
               return list.indexOf(a, idx);

             case 'object':
               if (a === null) {
                 // null can utilise Set
                 return list.indexOf(a, idx);
               }
           }
         }
         // anything else not covered above, defer to R.equals
         while (idx < list.length) {
           if (equals(list[idx], a)) {
             return idx;
           }
           idx += 1;
         }
         return -1;
       }

       function _contains(a, list) {
         return _indexOf(list, a, 0) >= 0;
       }

       function _quote(s) {
         var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
         .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

         return '"' + escaped.replace(/"/g, '\\"') + '"';
       }

       /**
        * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
        */
       var pad = function pad(n) {
         return (n < 10 ? '0' : '') + n;
       };

       var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
         return d.toISOString();
       } : function _toISOString(d) {
         return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
       };

       function _complement(f) {
         return function () {
           return !f.apply(this, arguments);
         };
       }

       function _filter(fn, list) {
         var idx = 0;
         var len = list.length;
         var result = [];

         while (idx < len) {
           if (fn(list[idx])) {
             result[result.length] = list[idx];
           }
           idx += 1;
         }
         return result;
       }

       function _isObject(x) {
         return Object.prototype.toString.call(x) === '[object Object]';
       }

       var XFilter = /*#__PURE__*/function () {
         function XFilter(f, xf) {
           this.xf = xf;
           this.f = f;
         }
         XFilter.prototype['@@transducer/init'] = _xfBase.init;
         XFilter.prototype['@@transducer/result'] = _xfBase.result;
         XFilter.prototype['@@transducer/step'] = function (result, input) {
           return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
         };

         return XFilter;
       }();

       var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
         return new XFilter(f, xf);
       });

       /**
        * Takes a predicate and a `Filterable`, and returns a new filterable of the
        * same type containing the members of the given filterable which satisfy the
        * given predicate. Filterable objects include plain objects or any object
        * that has a filter method such as `Array`.
        *
        * Dispatches to the `filter` method of the second argument, if present.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Filterable f => (a -> Boolean) -> f a -> f a
        * @param {Function} pred
        * @param {Array} filterable
        * @return {Array} Filterable
        * @see R.reject, R.transduce, R.addIndex
        * @example
        *
        *      var isEven = n => n % 2 === 0;
        *
        *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
        *
        *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
        */
       var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
         return _isObject(filterable) ? _reduce(function (acc, key) {
           if (pred(filterable[key])) {
             acc[key] = filterable[key];
           }
           return acc;
         }, {}, keys(filterable)) :
         // else
         _filter(pred, filterable);
       }));

       /**
        * The complement of [`filter`](#filter).
        *
        * Acts as a transducer if a transformer is given in list position. Filterable
        * objects include plain objects or any object that has a filter method such
        * as `Array`.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Filterable f => (a -> Boolean) -> f a -> f a
        * @param {Function} pred
        * @param {Array} filterable
        * @return {Array}
        * @see R.filter, R.transduce, R.addIndex
        * @example
        *
        *      var isOdd = (n) => n % 2 === 1;
        *
        *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
        *
        *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
        */
       var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
         return filter(_complement(pred), filterable);
       });

       function _toString(x, seen) {
         var recur = function recur(y) {
           var xs = seen.concat([x]);
           return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
         };

         //  mapPairs :: (Object, [String]) -> [String]
         var mapPairs = function (obj, keys$$1) {
           return _map(function (k) {
             return _quote(k) + ': ' + recur(obj[k]);
           }, keys$$1.slice().sort());
         };

         switch (Object.prototype.toString.call(x)) {
           case '[object Arguments]':
             return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
           case '[object Array]':
             return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
               return (/^\d+$/.test(k)
               );
             }, keys(x)))).join(', ') + ']';
           case '[object Boolean]':
             return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
           case '[object Date]':
             return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
           case '[object Null]':
             return 'null';
           case '[object Number]':
             return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
           case '[object String]':
             return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
           case '[object Undefined]':
             return 'undefined';
           default:
             if (typeof x.toString === 'function') {
               var repr = x.toString();
               if (repr !== '[object Object]') {
                 return repr;
               }
             }
             return '{' + mapPairs(x, keys(x)).join(', ') + '}';
         }
       }

       /**
        * Returns the string representation of the given value. `eval`'ing the output
        * should result in a value equivalent to the input value. Many of the built-in
        * `toString` methods do not satisfy this requirement.
        *
        * If the given value is an `[object Object]` with a `toString` method other
        * than `Object.prototype.toString`, this method is invoked with no arguments
        * to produce the return value. This means user-defined constructor functions
        * can provide a suitable `toString` method. For example:
        *
        *     function Point(x, y) {
        *       this.x = x;
        *       this.y = y;
        *     }
        *
        *     Point.prototype.toString = function() {
        *       return 'new Point(' + this.x + ', ' + this.y + ')';
        *     };
        *
        *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
        *
        * @func
        * @memberOf R
        * @since v0.14.0
        * @category String
        * @sig * -> String
        * @param {*} val
        * @return {String}
        * @example
        *
        *      R.toString(42); //=> '42'
        *      R.toString('abc'); //=> '"abc"'
        *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
        *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
        *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
        */
       var toString$1 = /*#__PURE__*/_curry1(function toString(val) {
         return _toString(val, []);
       });

       /**
        * Returns the result of concatenating the given lists or strings.
        *
        * Note: `R.concat` expects both arguments to be of the same type,
        * unlike the native `Array.prototype.concat` method. It will throw
        * an error if you `concat` an Array with a non-Array value.
        *
        * Dispatches to the `concat` method of the first argument, if present.
        * Can also concatenate two members of a [fantasy-land
        * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig [a] -> [a] -> [a]
        * @sig String -> String -> String
        * @param {Array|String} firstList The first list
        * @param {Array|String} secondList The second list
        * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
        * `secondList`.
        *
        * @example
        *
        *      R.concat('ABC', 'DEF'); // 'ABCDEF'
        *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
        *      R.concat([], []); //=> []
        */
       var concat = /*#__PURE__*/_curry2(function concat(a, b) {
         if (_isArray(a)) {
           if (_isArray(b)) {
             return a.concat(b);
           }
           throw new TypeError(toString$1(b) + ' is not an array');
         }
         if (_isString(a)) {
           if (_isString(b)) {
             return a + b;
           }
           throw new TypeError(toString$1(b) + ' is not a string');
         }
         if (a != null && _isFunction(a['fantasy-land/concat'])) {
           return a['fantasy-land/concat'](b);
         }
         if (a != null && _isFunction(a.concat)) {
           return a.concat(b);
         }
         throw new TypeError(toString$1(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
       });

       /**
        * Accepts a converging function and a list of branching functions and returns
        * a new function. When invoked, this new function is applied to some
        * arguments, each branching function is applied to those same arguments. The
        * results of each branching function are passed as arguments to the converging
        * function to produce the return value.
        *
        * @func
        * @memberOf R
        * @since v0.4.2
        * @category Function
        * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
        * @param {Function} after A function. `after` will be invoked with the return values of
        *        `fn1` and `fn2` as its arguments.
        * @param {Array} functions A list of functions.
        * @return {Function} A new function.
        * @see R.useWith
        * @example
        *
        *      var average = R.converge(R.divide, [R.sum, R.length])
        *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
        *
        *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
        *      strangeConcat("Yodel") //=> "YODELyodel"
        *
        * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
        */
       var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
         return curryN(reduce(max, 0, pluck('length', fns)), function () {
           var args = arguments;
           var context = this;
           return after.apply(context, _map(function (fn) {
             return fn.apply(context, args);
           }, fns));
         });
       });

       var XReduceBy = /*#__PURE__*/function () {
         function XReduceBy(valueFn, valueAcc, keyFn, xf) {
           this.valueFn = valueFn;
           this.valueAcc = valueAcc;
           this.keyFn = keyFn;
           this.xf = xf;
           this.inputs = {};
         }
         XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
         XReduceBy.prototype['@@transducer/result'] = function (result) {
           var key;
           for (key in this.inputs) {
             if (_has(key, this.inputs)) {
               result = this.xf['@@transducer/step'](result, this.inputs[key]);
               if (result['@@transducer/reduced']) {
                 result = result['@@transducer/value'];
                 break;
               }
             }
           }
           this.inputs = null;
           return this.xf['@@transducer/result'](result);
         };
         XReduceBy.prototype['@@transducer/step'] = function (result, input) {
           var key = this.keyFn(input);
           this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
           this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
           return result;
         };

         return XReduceBy;
       }();

       var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
         return new XReduceBy(valueFn, valueAcc, keyFn, xf);
       });

       /**
        * Groups the elements of the list according to the result of calling
        * the String-returning function `keyFn` on each element and reduces the elements
        * of each group to a single value via the reducer function `valueFn`.
        *
        * This function is basically a more general [`groupBy`](#groupBy) function.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.20.0
        * @category List
        * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
        * @param {Function} valueFn The function that reduces the elements of each group to a single
        *        value. Receives two values, accumulator for a particular group and the current element.
        * @param {*} acc The (initial) accumulator value for each group.
        * @param {Function} keyFn The function that maps the list's element into a key.
        * @param {Array} list The array to group.
        * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
        *         `valueFn` for elements which produced that key when passed to `keyFn`.
        * @see R.groupBy, R.reduce
        * @example
        *
        *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
        *      var namesByGrade = reduceToNamesBy(function(student) {
        *        var score = student.score;
        *        return score < 65 ? 'F' :
        *               score < 70 ? 'D' :
        *               score < 80 ? 'C' :
        *               score < 90 ? 'B' : 'A';
        *      });
        *      var students = [{name: 'Lucy', score: 92},
        *                      {name: 'Drew', score: 85},
        *                      // ...
        *                      {name: 'Bart', score: 62}];
        *      namesByGrade(students);
        *      // {
        *      //   'A': ['Lucy'],
        *      //   'B': ['Drew']
        *      //   // ...,
        *      //   'F': ['Bart']
        *      // }
        */
       var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
         return _reduce(function (acc, elt) {
           var key = keyFn(elt);
           acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
           return acc;
         }, {}, list);
       }));

       /**
        * Counts the elements of a list according to how many match each value of a
        * key generated by the supplied function. Returns an object mapping the keys
        * produced by `fn` to the number of occurrences in the list. Note that all
        * keys are coerced to strings because of how JavaScript objects work.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Relation
        * @sig (a -> String) -> [a] -> {*}
        * @param {Function} fn The function used to map values to keys.
        * @param {Array} list The list to count elements from.
        * @return {Object} An object mapping keys to number of occurrences in the list.
        * @example
        *
        *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
        *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
        *
        *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
        *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
        */
       var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
         return acc + 1;
       }, 0);

       /**
        * Decrements its argument.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category Math
        * @sig Number -> Number
        * @param {Number} n
        * @return {Number} n - 1
        * @see R.inc
        * @example
        *
        *      R.dec(42); //=> 41
        */
       var dec = /*#__PURE__*/add(-1);

       var XDropRepeatsWith = /*#__PURE__*/function () {
         function XDropRepeatsWith(pred, xf) {
           this.xf = xf;
           this.pred = pred;
           this.lastValue = undefined;
           this.seenFirstValue = false;
         }

         XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
         XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
         XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
           var sameAsLast = false;
           if (!this.seenFirstValue) {
             this.seenFirstValue = true;
           } else if (this.pred(this.lastValue, input)) {
             sameAsLast = true;
           }
           this.lastValue = input;
           return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
         };

         return XDropRepeatsWith;
       }();

       var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
         return new XDropRepeatsWith(pred, xf);
       });

       /**
        * Returns the nth element of the given list or string. If n is negative the
        * element at index length + n is returned.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Number -> [a] -> a | Undefined
        * @sig Number -> String -> String
        * @param {Number} offset
        * @param {*} list
        * @return {*}
        * @example
        *
        *      var list = ['foo', 'bar', 'baz', 'quux'];
        *      R.nth(1, list); //=> 'bar'
        *      R.nth(-1, list); //=> 'quux'
        *      R.nth(-99, list); //=> undefined
        *
        *      R.nth(2, 'abc'); //=> 'c'
        *      R.nth(3, 'abc'); //=> ''
        * @symb R.nth(-1, [a, b, c]) = c
        * @symb R.nth(0, [a, b, c]) = a
        * @symb R.nth(1, [a, b, c]) = b
        */
       var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
         var idx = offset < 0 ? list.length + offset : offset;
         return _isString(list) ? list.charAt(idx) : list[idx];
       });

       /**
        * Returns the last element of the given list or string.
        *
        * @func
        * @memberOf R
        * @since v0.1.4
        * @category List
        * @sig [a] -> a | Undefined
        * @sig String -> String
        * @param {*} list
        * @return {*}
        * @see R.init, R.head, R.tail
        * @example
        *
        *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
        *      R.last([]); //=> undefined
        *
        *      R.last('abc'); //=> 'c'
        *      R.last(''); //=> ''
        */
       var last = /*#__PURE__*/nth(-1);

       /**
        * Returns a new list without any consecutively repeating elements. Equality is
        * determined by applying the supplied predicate to each pair of consecutive elements. The
        * first element in a series of equal elements will be preserved.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.14.0
        * @category List
        * @sig ((a, a) -> Boolean) -> [a] -> [a]
        * @param {Function} pred A predicate used to test whether two items are equal.
        * @param {Array} list The array to consider.
        * @return {Array} `list` without repeating elements.
        * @see R.transduce
        * @example
        *
        *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
        *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
        */
       var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
         var result = [];
         var idx = 1;
         var len = list.length;
         if (len !== 0) {
           result[0] = list[0];
           while (idx < len) {
             if (!pred(last(result), list[idx])) {
               result[result.length] = list[idx];
             }
             idx += 1;
           }
         }
         return result;
       }));

       /**
        * Returns a new list without any consecutively repeating elements.
        * [`R.equals`](#equals) is used to determine equality.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.14.0
        * @category List
        * @sig [a] -> [a]
        * @param {Array} list The array to consider.
        * @return {Array} `list` without repeating elements.
        * @see R.transduce
        * @example
        *
        *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
        */
       var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));

       /**
        * Returns a new function much like the supplied one, except that the first two
        * arguments' order is reversed.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
        * @param {Function} fn The function to invoke with its first two parameters reversed.
        * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
        * @example
        *
        *      var mergeThree = (a, b, c) => [].concat(a, b, c);
        *
        *      mergeThree(1, 2, 3); //=> [1, 2, 3]
        *
        *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
        * @symb R.flip(f)(a, b, c) = f(b, a, c)
        */
       var flip = /*#__PURE__*/_curry1(function flip(fn) {
         return curryN(fn.length, function (a, b) {
           var args = Array.prototype.slice.call(arguments, 0);
           args[0] = b;
           args[1] = a;
           return fn.apply(this, args);
         });
       });

       /**
        * Splits a list into sub-lists stored in an object, based on the result of
        * calling a String-returning function on each element, and grouping the
        * results according to values returned.
        *
        * Dispatches to the `groupBy` method of the second argument, if present.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig (a -> String) -> [a] -> {String: [a]}
        * @param {Function} fn Function :: a -> String
        * @param {Array} list The array to group
        * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
        *         that produced that key when passed to `fn`.
        * @see R.transduce
        * @example
        *
        *      var byGrade = R.groupBy(function(student) {
        *        var score = student.score;
        *        return score < 65 ? 'F' :
        *               score < 70 ? 'D' :
        *               score < 80 ? 'C' :
        *               score < 90 ? 'B' : 'A';
        *      });
        *      var students = [{name: 'Abby', score: 84},
        *                      {name: 'Eddy', score: 58},
        *                      // ...
        *                      {name: 'Jack', score: 69}];
        *      byGrade(students);
        *      // {
        *      //   'A': [{name: 'Dianne', score: 99}],
        *      //   'B': [{name: 'Abby', score: 84}]
        *      //   // ...,
        *      //   'F': [{name: 'Eddy', score: 58}]
        *      // }
        */
       var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
         if (acc == null) {
           acc = [];
         }
         acc.push(item);
         return acc;
       }, null)));

       /**
        * Returns the first element of the given list or string. In some libraries
        * this function is named `first`.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig [a] -> a | Undefined
        * @sig String -> String
        * @param {Array|String} list
        * @return {*}
        * @see R.tail, R.init, R.last
        * @example
        *
        *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
        *      R.head([]); //=> undefined
        *
        *      R.head('abc'); //=> 'a'
        *      R.head(''); //=> ''
        */
       var head = /*#__PURE__*/nth(0);

       function _identity(x) {
         return x;
       }

       /**
        * A function that does nothing but return the parameter supplied to it. Good
        * as a default or placeholder function.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig a -> a
        * @param {*} x The value to return.
        * @return {*} The input value, `x`.
        * @example
        *
        *      R.identity(1); //=> 1
        *
        *      var obj = {};
        *      R.identity(obj) === obj; //=> true
        * @symb R.identity(a) = a
        */
       var identity = /*#__PURE__*/_curry1(_identity);

       /**
        * Increments its argument.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category Math
        * @sig Number -> Number
        * @param {Number} n
        * @return {Number} n + 1
        * @see R.dec
        * @example
        *
        *      R.inc(42); //=> 43
        */
       var inc = /*#__PURE__*/add(1);

       /**
        * Given a function that generates a key, turns a list of objects into an
        * object indexing the objects by the given key. Note that if multiple
        * objects generate the same value for the indexing key only the last value
        * will be included in the generated object.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.19.0
        * @category List
        * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
        * @param {Function} fn Function :: a -> String
        * @param {Array} array The array of objects to index
        * @return {Object} An object indexing each array element by the given property.
        * @example
        *
        *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
        *      R.indexBy(R.prop('id'), list);
        *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
        */
       var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
         return elem;
       }, null);

       /**
        * Returns all but the last element of the given list or string.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category List
        * @sig [a] -> [a]
        * @sig String -> String
        * @param {*} list
        * @return {*}
        * @see R.last, R.head, R.tail
        * @example
        *
        *      R.init([1, 2, 3]);  //=> [1, 2]
        *      R.init([1, 2]);     //=> [1]
        *      R.init([1]);        //=> []
        *      R.init([]);         //=> []
        *
        *      R.init('abc');  //=> 'ab'
        *      R.init('ab');   //=> 'a'
        *      R.init('a');    //=> ''
        *      R.init('');     //=> ''
        */
       var init = /*#__PURE__*/slice(0, -1);

       var _Set = /*#__PURE__*/function () {
         function _Set() {
           /* globals Set */
           this._nativeSet = typeof Set === 'function' ? new Set() : null;
           this._items = {};
         }

         // until we figure out why jsdoc chokes on this
         // @param item The item to add to the Set
         // @returns {boolean} true if the item did not exist prior, otherwise false
         //
         _Set.prototype.add = function (item) {
           return !hasOrAdd(item, true, this);
         };

         //
         // @param item The item to check for existence in the Set
         // @returns {boolean} true if the item exists in the Set, otherwise false
         //
         _Set.prototype.has = function (item) {
           return hasOrAdd(item, false, this);
         };

         //
         // Combines the logic for checking whether an item is a member of the set and
         // for adding a new item to the set.
         //
         // @param item       The item to check or add to the Set instance.
         // @param shouldAdd  If true, the item will be added to the set if it doesn't
         //                   already exist.
         // @param set        The set instance to check or add to.
         // @return {boolean} true if the item already existed, otherwise false.
         //
         return _Set;
       }();

       function hasOrAdd(item, shouldAdd, set) {
         var type = typeof item;
         var prevSize, newSize;
         switch (type) {
           case 'string':
           case 'number':
             // distinguish between +0 and -0
             if (item === 0 && 1 / item === -Infinity) {
               if (set._items['-0']) {
                 return true;
               } else {
                 if (shouldAdd) {
                   set._items['-0'] = true;
                 }
                 return false;
               }
             }
             // these types can all utilise the native Set
             if (set._nativeSet !== null) {
               if (shouldAdd) {
                 prevSize = set._nativeSet.size;
                 set._nativeSet.add(item);
                 newSize = set._nativeSet.size;
                 return newSize === prevSize;
               } else {
                 return set._nativeSet.has(item);
               }
             } else {
               if (!(type in set._items)) {
                 if (shouldAdd) {
                   set._items[type] = {};
                   set._items[type][item] = true;
                 }
                 return false;
               } else if (item in set._items[type]) {
                 return true;
               } else {
                 if (shouldAdd) {
                   set._items[type][item] = true;
                 }
                 return false;
               }
             }

           case 'boolean':
             // set._items['boolean'] holds a two element array
             // representing [ falseExists, trueExists ]
             if (type in set._items) {
               var bIdx = item ? 1 : 0;
               if (set._items[type][bIdx]) {
                 return true;
               } else {
                 if (shouldAdd) {
                   set._items[type][bIdx] = true;
                 }
                 return false;
               }
             } else {
               if (shouldAdd) {
                 set._items[type] = item ? [false, true] : [true, false];
               }
               return false;
             }

           case 'function':
             // compare functions for reference equality
             if (set._nativeSet !== null) {
               if (shouldAdd) {
                 prevSize = set._nativeSet.size;
                 set._nativeSet.add(item);
                 newSize = set._nativeSet.size;
                 return newSize === prevSize;
               } else {
                 return set._nativeSet.has(item);
               }
             } else {
               if (!(type in set._items)) {
                 if (shouldAdd) {
                   set._items[type] = [item];
                 }
                 return false;
               }
               if (!_contains(item, set._items[type])) {
                 if (shouldAdd) {
                   set._items[type].push(item);
                 }
                 return false;
               }
               return true;
             }

           case 'undefined':
             if (set._items[type]) {
               return true;
             } else {
               if (shouldAdd) {
                 set._items[type] = true;
               }
               return false;
             }

           case 'object':
             if (item === null) {
               if (!set._items['null']) {
                 if (shouldAdd) {
                   set._items['null'] = true;
                 }
                 return false;
               }
               return true;
             }
           /* falls through */
           default:
             // reduce the search size of heterogeneous sets by creating buckets
             // for each type.
             type = Object.prototype.toString.call(item);
             if (!(type in set._items)) {
               if (shouldAdd) {
                 set._items[type] = [item];
               }
               return false;
             }
             // scan through all previously applied items
             if (!_contains(item, set._items[type])) {
               if (shouldAdd) {
                 set._items[type].push(item);
               }
               return false;
             }
             return true;
         }
       }

       /**
        * Returns a new list containing only one copy of each element in the original
        * list, based upon the value returned by applying the supplied function to
        * each list element. Prefers the first item if the supplied function produces
        * the same value on two items. [`R.equals`](#equals) is used for comparison.
        *
        * @func
        * @memberOf R
        * @since v0.16.0
        * @category List
        * @sig (a -> b) -> [a] -> [a]
        * @param {Function} fn A function used to produce a value to use during comparisons.
        * @param {Array} list The array to consider.
        * @return {Array} The list of unique items.
        * @example
        *
        *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
        */
       var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
         var set = new _Set();
         var result = [];
         var idx = 0;
         var appliedItem, item;

         while (idx < list.length) {
           item = list[idx];
           appliedItem = fn(item);
           if (set.add(appliedItem)) {
             result.push(item);
           }
           idx += 1;
         }
         return result;
       });

       /**
        * Returns a new list containing only one copy of each element in the original
        * list. [`R.equals`](#equals) is used to determine equality.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig [a] -> [a]
        * @param {Array} list The array to consider.
        * @return {Array} The list of unique items.
        * @example
        *
        *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
        *      R.uniq([1, '1']);     //=> [1, '1']
        *      R.uniq([[42], [42]]); //=> [[42]]
        */
       var uniq = /*#__PURE__*/uniqBy(identity);

       /**
        * Turns a named method with a specified arity into a function that can be
        * called directly supplied with arguments and a target object.
        *
        * The returned function is curried and accepts `arity + 1` parameters where
        * the final parameter is the target object.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
        * @param {Number} arity Number of arguments the returned function should take
        *        before the target object.
        * @param {String} method Name of the method to call.
        * @return {Function} A new curried function.
        * @see R.construct
        * @example
        *
        *      var sliceFrom = R.invoker(1, 'slice');
        *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
        *      var sliceFrom6 = R.invoker(2, 'slice')(6);
        *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
        * @symb R.invoker(0, 'method')(o) = o['method']()
        * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
        * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
        */
       var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
         return curryN(arity + 1, function () {
           var target = arguments[arity];
           if (target != null && _isFunction(target[method])) {
             return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
           }
           throw new TypeError(toString$1(target) + ' does not have a method named "' + method + '"');
         });
       });

       /**
        * Returns a string made by inserting the `separator` between each element and
        * concatenating all the elements into a single string.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig String -> [a] -> String
        * @param {Number|String} separator The string used to separate the elements.
        * @param {Array} xs The elements to join into a string.
        * @return {String} str The string made by concatenating `xs` with `separator`.
        * @see R.split
        * @example
        *
        *      var spacer = R.join(' ');
        *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
        *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
        */
       var join = /*#__PURE__*/invoker(1, 'join');

       /**
        * juxt applies a list of functions to a list of values.
        *
        * @func
        * @memberOf R
        * @since v0.19.0
        * @category Function
        * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
        * @param {Array} fns An array of functions
        * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
        * @see R.applySpec
        * @example
        *
        *      var getRange = R.juxt([Math.min, Math.max]);
        *      getRange(3, 4, 9, -3); //=> [-3, 9]
        * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
        */
       var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
         return converge(function () {
           return Array.prototype.slice.call(arguments, 0);
         }, fns);
       });

       /**
        * Adds together all the elements of a list.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Math
        * @sig [Number] -> Number
        * @param {Array} list An array of numbers
        * @return {Number} The sum of all the numbers in the list.
        * @see R.reduce
        * @example
        *
        *      R.sum([2,4,6,8,100,1]); //=> 121
        */
       var sum = /*#__PURE__*/reduce(add, 0);

       /**
        * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
        * additional function that will be applied to a given argument set and used to
        * create the cache key under which the results of the function to be memoized
        * will be stored. Care must be taken when implementing key generation to avoid
        * clashes that may overwrite previous entries erroneously.
        *
        *
        * @func
        * @memberOf R
        * @since v0.24.0
        * @category Function
        * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
        * @param {Function} fn The function to generate the cache key.
        * @param {Function} fn The function to memoize.
        * @return {Function} Memoized version of `fn`.
        * @see R.memoize
        * @example
        *
        *      let count = 0;
        *      const factorial = R.memoizeWith(R.identity, n => {
        *        count += 1;
        *        return R.product(R.range(1, n + 1));
        *      });
        *      factorial(5); //=> 120
        *      factorial(5); //=> 120
        *      factorial(5); //=> 120
        *      count; //=> 1
        */
       var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
         var cache = {};
         return _arity(fn.length, function () {
           var key = mFn.apply(this, arguments);
           if (!_has(key, cache)) {
             cache[key] = fn.apply(this, arguments);
           }
           return cache[key];
         });
       });

       /**
        * Creates a new function that, when invoked, caches the result of calling `fn`
        * for a given argument set and returns the result. Subsequent calls to the
        * memoized `fn` with the same argument set will not result in an additional
        * call to `fn`; instead, the cached result for that set of arguments will be
        * returned.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig (*... -> a) -> (*... -> a)
        * @param {Function} fn The function to memoize.
        * @return {Function} Memoized version of `fn`.
        * @see R.memoizeWith
        * @deprecated since v0.25.0
        * @example
        *
        *      let count = 0;
        *      const factorial = R.memoize(n => {
        *        count += 1;
        *        return R.product(R.range(1, n + 1));
        *      });
        *      factorial(5); //=> 120
        *      factorial(5); //=> 120
        *      factorial(5); //=> 120
        *      count; //=> 1
        */
       var memoize = /*#__PURE__*/memoizeWith(function () {
         return toString$1(arguments);
       });

       /**
        * Multiplies two numbers. Equivalent to `a * b` but curried.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Math
        * @sig Number -> Number -> Number
        * @param {Number} a The first value.
        * @param {Number} b The second value.
        * @return {Number} The result of `a * b`.
        * @see R.divide
        * @example
        *
        *      var double = R.multiply(2);
        *      var triple = R.multiply(3);
        *      double(3);       //=>  6
        *      triple(4);       //=> 12
        *      R.multiply(2, 5);  //=> 10
        */
       var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
         return a * b;
       });

       function _createPartialApplicator(concat) {
         return _curry2(function (fn, args) {
           return _arity(Math.max(0, fn.length - args.length), function () {
             return fn.apply(this, concat(args, arguments));
           });
         });
       }

       /**
        * Takes a function `f` and a list of arguments, and returns a function `g`.
        * When applied, `g` returns the result of applying `f` to the arguments
        * provided to `g` followed by the arguments provided initially.
        *
        * @func
        * @memberOf R
        * @since v0.10.0
        * @category Function
        * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
        * @param {Function} f
        * @param {Array} args
        * @return {Function}
        * @see R.partial
        * @example
        *
        *      var greet = (salutation, title, firstName, lastName) =>
        *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
        *
        *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
        *
        *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
        * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
        */
       var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));

       /**
        * Takes a predicate and a list or other `Filterable` object and returns the
        * pair of filterable objects of the same type of elements which do and do not
        * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
        * that has a filter method such as `Array`.
        *
        * @func
        * @memberOf R
        * @since v0.1.4
        * @category List
        * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
        * @param {Function} pred A predicate to determine which side the element belongs to.
        * @param {Array} filterable the list (or other filterable) to partition.
        * @return {Array} An array, containing first the subset of elements that satisfy the
        *         predicate, and second the subset of elements that do not satisfy.
        * @see R.filter, R.reject
        * @example
        *
        *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
        *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
        *
        *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
        *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
        */
       var partition = /*#__PURE__*/juxt([filter, reject]);

       /**
        * Similar to `pick` except that this one includes a `key: undefined` pair for
        * properties that don't exist.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Object
        * @sig [k] -> {k: v} -> {k: v}
        * @param {Array} names an array of String property names to copy onto a new object
        * @param {Object} obj The object to copy from
        * @return {Object} A new object with only properties from `names` on it.
        * @see R.pick
        * @example
        *
        *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
        *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
        */
       var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
         var result = {};
         var idx = 0;
         var len = names.length;
         while (idx < len) {
           var name = names[idx];
           result[name] = obj[name];
           idx += 1;
         }
         return result;
       });

       /**
        * Multiplies together all the elements of a list.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Math
        * @sig [Number] -> Number
        * @param {Array} list An array of numbers
        * @return {Number} The product of all the numbers in the list.
        * @see R.reduce
        * @example
        *
        *      R.product([2,4,6,8,100,1]); //=> 38400
        */
       var product = /*#__PURE__*/reduce(multiply, 1);

       /**
        * Accepts a function `fn` and a list of transformer functions and returns a
        * new curried function. When the new function is invoked, it calls the
        * function `fn` with parameters consisting of the result of calling each
        * supplied handler on successive arguments to the new function.
        *
        * If more arguments are passed to the returned function than transformer
        * functions, those arguments are passed directly to `fn` as additional
        * parameters. If you expect additional arguments that don't need to be
        * transformed, although you can ignore them, it's best to pass an identity
        * function so that the new function reports the correct arity.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
        * @param {Function} fn The function to wrap.
        * @param {Array} transformers A list of transformer functions
        * @return {Function} The wrapped function.
        * @see R.converge
        * @example
        *
        *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
        *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
        *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
        *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
        * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
        */
       var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
         return curryN(transformers.length, function () {
           var args = [];
           var idx = 0;
           while (idx < transformers.length) {
             args.push(transformers[idx].call(this, arguments[idx]));
             idx += 1;
           }
           return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
         });
       });

       /**
        * Reasonable analog to SQL `select` statement.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Object
        * @category Relation
        * @sig [k] -> [{k: v}] -> [{k: v}]
        * @param {Array} props The property names to project
        * @param {Array} objs The objects to query
        * @return {Array} An array of objects with just the `props` properties.
        * @example
        *
        *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
        *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
        *      var kids = [abby, fred];
        *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
        */
       var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

       /**
        * Calls an input function `n` times, returning an array containing the results
        * of those function calls.
        *
        * `fn` is passed one argument: The current value of `n`, which begins at `0`
        * and is gradually incremented to `n - 1`.
        *
        * @func
        * @memberOf R
        * @since v0.2.3
        * @category List
        * @sig (Number -> a) -> Number -> [a]
        * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
        * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
        * @return {Array} An array containing the return values of all calls to `fn`.
        * @see R.repeat
        * @example
        *
        *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
        * @symb R.times(f, 0) = []
        * @symb R.times(f, 1) = [f(0)]
        * @symb R.times(f, 2) = [f(0), f(1)]
        */
       var times = /*#__PURE__*/_curry2(function times(fn, n) {
         var len = Number(n);
         var idx = 0;
         var list;

         if (len < 0 || isNaN(len)) {
           throw new RangeError('n must be a non-negative number');
         }
         list = new Array(len);
         while (idx < len) {
           list[idx] = fn(idx);
           idx += 1;
         }
         return list;
       });

       /**
        * Returns a fixed list of size `n` containing a specified identical value.
        *
        * @func
        * @memberOf R
        * @since v0.1.1
        * @category List
        * @sig a -> n -> [a]
        * @param {*} value The value to repeat.
        * @param {Number} n The desired size of the output list.
        * @return {Array} A new array containing `n` `value`s.
        * @see R.times
        * @example
        *
        *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
        *
        *      var obj = {};
        *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
        *      repeatedObjs[0] === repeatedObjs[1]; //=> true
        * @symb R.repeat(a, 0) = []
        * @symb R.repeat(a, 1) = [a]
        * @symb R.repeat(a, 2) = [a, a]
        */
       var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
         return times(always(value), n);
       });

       /**
        * Splits a string into an array of strings based on the given
        * separator.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category String
        * @sig (String | RegExp) -> String -> [String]
        * @param {String|RegExp} sep The pattern.
        * @param {String} str The string to separate into an array.
        * @return {Array} The array of strings from `str` separated by `str`.
        * @see R.join
        * @example
        *
        *      var pathComponents = R.split('/');
        *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
        *
        *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
        */
       var split = /*#__PURE__*/invoker(1, 'split');

       /**
        * Splits a collection into slices of the specified length.
        *
        * @func
        * @memberOf R
        * @since v0.16.0
        * @category List
        * @sig Number -> [a] -> [[a]]
        * @sig Number -> String -> [String]
        * @param {Number} n
        * @param {Array} list
        * @return {Array}
        * @example
        *
        *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
        *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
        */
       var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
         if (n <= 0) {
           throw new Error('First argument to splitEvery must be a positive integer');
         }
         var result = [];
         var idx = 0;
         while (idx < list.length) {
           result.push(slice(idx, idx += n, list));
         }
         return result;
       });

       /**
        * The lower case version of a string.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category String
        * @sig String -> String
        * @param {String} str The string to lower case.
        * @return {String} The lower case version of `str`.
        * @see R.toUpper
        * @example
        *
        *      R.toLower('XYZ'); //=> 'xyz'
        */
       var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');

       /**
        * The upper case version of a string.
        *
        * @func
        * @memberOf R
        * @since v0.9.0
        * @category String
        * @sig String -> String
        * @param {String} str The string to upper case.
        * @return {String} The upper case version of `str`.
        * @see R.toLower
        * @example
        *
        *      R.toUpper('abc'); //=> 'ABC'
        */
       var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');

       /**
        * Initializes a transducer using supplied iterator function. Returns a single
        * item by iterating through the list, successively calling the transformed
        * iterator function and passing it an accumulator value and the current value
        * from the array, and then passing the result to the next call.
        *
        * The iterator function receives two values: *(acc, value)*. It will be
        * wrapped as a transformer to initialize the transducer. A transformer can be
        * passed directly in place of an iterator function. In both cases, iteration
        * may be stopped early with the [`R.reduced`](#reduced) function.
        *
        * A transducer is a function that accepts a transformer and returns a
        * transformer and can be composed directly.
        *
        * A transformer is an an object that provides a 2-arity reducing iterator
        * function, step, 0-arity initial value function, init, and 1-arity result
        * extraction function, result. The step function is used as the iterator
        * function in reduce. The result function is used to convert the final
        * accumulator into the return type and in most cases is
        * [`R.identity`](#identity). The init function can be used to provide an
        * initial accumulator, but is ignored by transduce.
        *
        * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
        *
        * @func
        * @memberOf R
        * @since v0.12.0
        * @category List
        * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
        * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
        * @param {Function} fn The iterator function. Receives two values, the accumulator and the
        *        current element from the array. Wrapped as transformer, if necessary, and used to
        *        initialize the transducer
        * @param {*} acc The initial accumulator value.
        * @param {Array} list The list to iterate over.
        * @return {*} The final, accumulated value.
        * @see R.reduce, R.reduced, R.into
        * @example
        *
        *      var numbers = [1, 2, 3, 4];
        *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
        *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
        *
        *      var isOdd = (x) => x % 2 === 1;
        *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
        *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
        */
       var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
         return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
       });

       var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
       var zeroWidth = '\u200b';
       var hasProtoTrim = typeof String.prototype.trim === 'function';
       /**
        * Removes (strips) whitespace from both ends of the string.
        *
        * @func
        * @memberOf R
        * @since v0.6.0
        * @category String
        * @sig String -> String
        * @param {String} str The string to trim.
        * @return {String} Trimmed version of `str`.
        * @example
        *
        *      R.trim('   xyz  '); //=> 'xyz'
        *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
        */
       var _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {
         var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
         var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
         return str.replace(beginRx, '').replace(endRx, '');
       } : function trim(str) {
         return str.trim();
       };

       /**
        * Combines two lists into a set (i.e. no duplicates) composed of the elements
        * of each list.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Relation
        * @sig [*] -> [*] -> [*]
        * @param {Array} as The first list.
        * @param {Array} bs The second list.
        * @return {Array} The first and second lists concatenated, with
        *         duplicates removed.
        * @example
        *
        *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
        */
       var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));

       /**
        * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
        * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
        *
        * @func
        * @memberOf R
        * @since v0.3.0
        * @category List
        * @sig Chain c => c (c a) -> c a
        * @param {*} list
        * @return {*}
        * @see R.flatten, R.chain
        * @example
        *
        *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
        *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
        */
       var unnest = /*#__PURE__*/chain(_identity);

       var global$1 = (typeof global !== "undefined" ? global :
                   typeof self !== "undefined" ? self :
                   typeof window !== "undefined" ? window : {});

       var lookup = [];
       var revLookup = [];
       var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
       var inited = false;
       function init$1 () {
         inited = true;
         var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
         for (var i = 0, len = code.length; i < len; ++i) {
           lookup[i] = code[i];
           revLookup[code.charCodeAt(i)] = i;
         }

         revLookup['-'.charCodeAt(0)] = 62;
         revLookup['_'.charCodeAt(0)] = 63;
       }

       function toByteArray (b64) {
         if (!inited) {
           init$1();
         }
         var i, j, l, tmp, placeHolders, arr;
         var len = b64.length;

         if (len % 4 > 0) {
           throw new Error('Invalid string. Length must be a multiple of 4')
         }

         // the number of equal signs (place holders)
         // if there are two placeholders, than the two characters before it
         // represent one byte
         // if there is only one, then the three characters before it represent 2 bytes
         // this is just a cheap hack to not do indexOf twice
         placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

         // base64 is 4/3 + up to two characters of the original data
         arr = new Arr(len * 3 / 4 - placeHolders);

         // if there are placeholders, only get up to the last complete 4 chars
         l = placeHolders > 0 ? len - 4 : len;

         var L = 0;

         for (i = 0, j = 0; i < l; i += 4, j += 3) {
           tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
           arr[L++] = (tmp >> 16) & 0xFF;
           arr[L++] = (tmp >> 8) & 0xFF;
           arr[L++] = tmp & 0xFF;
         }

         if (placeHolders === 2) {
           tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
           arr[L++] = tmp & 0xFF;
         } else if (placeHolders === 1) {
           tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
           arr[L++] = (tmp >> 8) & 0xFF;
           arr[L++] = tmp & 0xFF;
         }

         return arr
       }

       function tripletToBase64 (num) {
         return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
       }

       function encodeChunk (uint8, start, end) {
         var tmp;
         var output = [];
         for (var i = start; i < end; i += 3) {
           tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
           output.push(tripletToBase64(tmp));
         }
         return output.join('')
       }

       function fromByteArray (uint8) {
         if (!inited) {
           init$1();
         }
         var tmp;
         var len = uint8.length;
         var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
         var output = '';
         var parts = [];
         var maxChunkLength = 16383; // must be multiple of 3

         // go through the array every three bytes, we'll deal with trailing stuff later
         for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
           parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
         }

         // pad the end with zeros, but make sure to not forget the extra bytes
         if (extraBytes === 1) {
           tmp = uint8[len - 1];
           output += lookup[tmp >> 2];
           output += lookup[(tmp << 4) & 0x3F];
           output += '==';
         } else if (extraBytes === 2) {
           tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
           output += lookup[tmp >> 10];
           output += lookup[(tmp >> 4) & 0x3F];
           output += lookup[(tmp << 2) & 0x3F];
           output += '=';
         }

         parts.push(output);

         return parts.join('')
       }

       function read (buffer, offset, isLE, mLen, nBytes) {
         var e, m;
         var eLen = nBytes * 8 - mLen - 1;
         var eMax = (1 << eLen) - 1;
         var eBias = eMax >> 1;
         var nBits = -7;
         var i = isLE ? (nBytes - 1) : 0;
         var d = isLE ? -1 : 1;
         var s = buffer[offset + i];

         i += d;

         e = s & ((1 << (-nBits)) - 1);
         s >>= (-nBits);
         nBits += eLen;
         for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

         m = e & ((1 << (-nBits)) - 1);
         e >>= (-nBits);
         nBits += mLen;
         for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

         if (e === 0) {
           e = 1 - eBias;
         } else if (e === eMax) {
           return m ? NaN : ((s ? -1 : 1) * Infinity)
         } else {
           m = m + Math.pow(2, mLen);
           e = e - eBias;
         }
         return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
       }

       function write (buffer, value, offset, isLE, mLen, nBytes) {
         var e, m, c;
         var eLen = nBytes * 8 - mLen - 1;
         var eMax = (1 << eLen) - 1;
         var eBias = eMax >> 1;
         var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
         var i = isLE ? 0 : (nBytes - 1);
         var d = isLE ? 1 : -1;
         var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

         value = Math.abs(value);

         if (isNaN(value) || value === Infinity) {
           m = isNaN(value) ? 1 : 0;
           e = eMax;
         } else {
           e = Math.floor(Math.log(value) / Math.LN2);
           if (value * (c = Math.pow(2, -e)) < 1) {
             e--;
             c *= 2;
           }
           if (e + eBias >= 1) {
             value += rt / c;
           } else {
             value += rt * Math.pow(2, 1 - eBias);
           }
           if (value * c >= 2) {
             e++;
             c /= 2;
           }

           if (e + eBias >= eMax) {
             m = 0;
             e = eMax;
           } else if (e + eBias >= 1) {
             m = (value * c - 1) * Math.pow(2, mLen);
             e = e + eBias;
           } else {
             m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
             e = 0;
           }
         }

         for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

         e = (e << mLen) | m;
         eLen += mLen;
         for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

         buffer[offset + i - d] |= s * 128;
       }

       var toString$2 = {}.toString;

       var isArray = Array.isArray || function (arr) {
         return toString$2.call(arr) == '[object Array]';
       };

       var INSPECT_MAX_BYTES = 50;

       /**
        * If `Buffer.TYPED_ARRAY_SUPPORT`:
        *   === true    Use Uint8Array implementation (fastest)
        *   === false   Use Object implementation (most compatible, even IE6)
        *
        * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
        * Opera 11.6+, iOS 4.2+.
        *
        * Due to various browser bugs, sometimes the Object implementation will be used even
        * when the browser supports typed arrays.
        *
        * Note:
        *
        *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
        *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
        *
        *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
        *
        *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
        *     incorrect length in some situations.

        * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
        * get the Object implementation, which is slower but behaves correctly.
        */
       Buffer$1.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
         ? global$1.TYPED_ARRAY_SUPPORT
         : true;

       /*
        * Export kMaxLength after typed array support is determined.
        */
       var _kMaxLength = kMaxLength();

       function kMaxLength () {
         return Buffer$1.TYPED_ARRAY_SUPPORT
           ? 0x7fffffff
           : 0x3fffffff
       }

       function createBuffer (that, length) {
         if (kMaxLength() < length) {
           throw new RangeError('Invalid typed array length')
         }
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           // Return an augmented `Uint8Array` instance, for best performance
           that = new Uint8Array(length);
           that.__proto__ = Buffer$1.prototype;
         } else {
           // Fallback: Return an object instance of the Buffer class
           if (that === null) {
             that = new Buffer$1(length);
           }
           that.length = length;
         }

         return that
       }

       /**
        * The Buffer constructor returns instances of `Uint8Array` that have their
        * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
        * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
        * and the `Uint8Array` methods. Square bracket notation works as expected -- it
        * returns a single octet.
        *
        * The `Uint8Array` prototype remains unmodified.
        */

       function Buffer$1 (arg, encodingOrOffset, length) {
         if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
           return new Buffer$1(arg, encodingOrOffset, length)
         }

         // Common case.
         if (typeof arg === 'number') {
           if (typeof encodingOrOffset === 'string') {
             throw new Error(
               'If encoding is specified then the first argument must be a string'
             )
           }
           return allocUnsafe(this, arg)
         }
         return from(this, arg, encodingOrOffset, length)
       }

       Buffer$1.poolSize = 8192; // not used by this implementation

       // TODO: Legacy, not needed anymore. Remove in next major version.
       Buffer$1._augment = function (arr) {
         arr.__proto__ = Buffer$1.prototype;
         return arr
       };

       function from (that, value, encodingOrOffset, length) {
         if (typeof value === 'number') {
           throw new TypeError('"value" argument must not be a number')
         }

         if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
           return fromArrayBuffer(that, value, encodingOrOffset, length)
         }

         if (typeof value === 'string') {
           return fromString(that, value, encodingOrOffset)
         }

         return fromObject(that, value)
       }

       /**
        * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
        * if value is a number.
        * Buffer.from(str[, encoding])
        * Buffer.from(array)
        * Buffer.from(buffer)
        * Buffer.from(arrayBuffer[, byteOffset[, length]])
        **/
       Buffer$1.from = function (value, encodingOrOffset, length) {
         return from(null, value, encodingOrOffset, length)
       };

       if (Buffer$1.TYPED_ARRAY_SUPPORT) {
         Buffer$1.prototype.__proto__ = Uint8Array.prototype;
         Buffer$1.__proto__ = Uint8Array;
       }

       function assertSize (size) {
         if (typeof size !== 'number') {
           throw new TypeError('"size" argument must be a number')
         } else if (size < 0) {
           throw new RangeError('"size" argument must not be negative')
         }
       }

       function alloc (that, size, fill, encoding) {
         assertSize(size);
         if (size <= 0) {
           return createBuffer(that, size)
         }
         if (fill !== undefined) {
           // Only pay attention to encoding if it's a string. This
           // prevents accidentally sending in a number that would
           // be interpretted as a start offset.
           return typeof encoding === 'string'
             ? createBuffer(that, size).fill(fill, encoding)
             : createBuffer(that, size).fill(fill)
         }
         return createBuffer(that, size)
       }

       /**
        * Creates a new filled Buffer instance.
        * alloc(size[, fill[, encoding]])
        **/
       Buffer$1.alloc = function (size, fill, encoding) {
         return alloc(null, size, fill, encoding)
       };

       function allocUnsafe (that, size) {
         assertSize(size);
         that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
         if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
           for (var i = 0; i < size; ++i) {
             that[i] = 0;
           }
         }
         return that
       }

       /**
        * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
        * */
       Buffer$1.allocUnsafe = function (size) {
         return allocUnsafe(null, size)
       };
       /**
        * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
        */
       Buffer$1.allocUnsafeSlow = function (size) {
         return allocUnsafe(null, size)
       };

       function fromString (that, string, encoding) {
         if (typeof encoding !== 'string' || encoding === '') {
           encoding = 'utf8';
         }

         if (!Buffer$1.isEncoding(encoding)) {
           throw new TypeError('"encoding" must be a valid string encoding')
         }

         var length = byteLength(string, encoding) | 0;
         that = createBuffer(that, length);

         var actual = that.write(string, encoding);

         if (actual !== length) {
           // Writing a hex string, for example, that contains invalid characters will
           // cause everything after the first invalid character to be ignored. (e.g.
           // 'abxxcd' will be treated as 'ab')
           that = that.slice(0, actual);
         }

         return that
       }

       function fromArrayLike (that, array) {
         var length = array.length < 0 ? 0 : checked(array.length) | 0;
         that = createBuffer(that, length);
         for (var i = 0; i < length; i += 1) {
           that[i] = array[i] & 255;
         }
         return that
       }

       function fromArrayBuffer (that, array, byteOffset, length) {
         array.byteLength; // this throws if `array` is not a valid ArrayBuffer

         if (byteOffset < 0 || array.byteLength < byteOffset) {
           throw new RangeError('\'offset\' is out of bounds')
         }

         if (array.byteLength < byteOffset + (length || 0)) {
           throw new RangeError('\'length\' is out of bounds')
         }

         if (byteOffset === undefined && length === undefined) {
           array = new Uint8Array(array);
         } else if (length === undefined) {
           array = new Uint8Array(array, byteOffset);
         } else {
           array = new Uint8Array(array, byteOffset, length);
         }

         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           // Return an augmented `Uint8Array` instance, for best performance
           that = array;
           that.__proto__ = Buffer$1.prototype;
         } else {
           // Fallback: Return an object instance of the Buffer class
           that = fromArrayLike(that, array);
         }
         return that
       }

       function fromObject (that, obj) {
         if (internalIsBuffer(obj)) {
           var len = checked(obj.length) | 0;
           that = createBuffer(that, len);

           if (that.length === 0) {
             return that
           }

           obj.copy(that, 0, 0, len);
           return that
         }

         if (obj) {
           if ((typeof ArrayBuffer !== 'undefined' &&
               obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
             if (typeof obj.length !== 'number' || isnan(obj.length)) {
               return createBuffer(that, 0)
             }
             return fromArrayLike(that, obj)
           }

           if (obj.type === 'Buffer' && isArray(obj.data)) {
             return fromArrayLike(that, obj.data)
           }
         }

         throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
       }

       function checked (length) {
         // Note: cannot use `length < kMaxLength()` here because that fails when
         // length is NaN (which is otherwise coerced to zero.)
         if (length >= kMaxLength()) {
           throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                                'size: 0x' + kMaxLength().toString(16) + ' bytes')
         }
         return length | 0
       }

       function SlowBuffer (length) {
         if (+length != length) { // eslint-disable-line eqeqeq
           length = 0;
         }
         return Buffer$1.alloc(+length)
       }
       Buffer$1.isBuffer = isBuffer;
       function internalIsBuffer (b) {
         return !!(b != null && b._isBuffer)
       }

       Buffer$1.compare = function compare (a, b) {
         if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
           throw new TypeError('Arguments must be Buffers')
         }

         if (a === b) return 0

         var x = a.length;
         var y = b.length;

         for (var i = 0, len = Math.min(x, y); i < len; ++i) {
           if (a[i] !== b[i]) {
             x = a[i];
             y = b[i];
             break
           }
         }

         if (x < y) return -1
         if (y < x) return 1
         return 0
       };

       Buffer$1.isEncoding = function isEncoding (encoding) {
         switch (String(encoding).toLowerCase()) {
           case 'hex':
           case 'utf8':
           case 'utf-8':
           case 'ascii':
           case 'latin1':
           case 'binary':
           case 'base64':
           case 'ucs2':
           case 'ucs-2':
           case 'utf16le':
           case 'utf-16le':
             return true
           default:
             return false
         }
       };

       Buffer$1.concat = function concat (list, length) {
         if (!isArray(list)) {
           throw new TypeError('"list" argument must be an Array of Buffers')
         }

         if (list.length === 0) {
           return Buffer$1.alloc(0)
         }

         var i;
         if (length === undefined) {
           length = 0;
           for (i = 0; i < list.length; ++i) {
             length += list[i].length;
           }
         }

         var buffer = Buffer$1.allocUnsafe(length);
         var pos = 0;
         for (i = 0; i < list.length; ++i) {
           var buf = list[i];
           if (!internalIsBuffer(buf)) {
             throw new TypeError('"list" argument must be an Array of Buffers')
           }
           buf.copy(buffer, pos);
           pos += buf.length;
         }
         return buffer
       };

       function byteLength (string, encoding) {
         if (internalIsBuffer(string)) {
           return string.length
         }
         if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
             (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
           return string.byteLength
         }
         if (typeof string !== 'string') {
           string = '' + string;
         }

         var len = string.length;
         if (len === 0) return 0

         // Use a for loop to avoid recursion
         var loweredCase = false;
         for (;;) {
           switch (encoding) {
             case 'ascii':
             case 'latin1':
             case 'binary':
               return len
             case 'utf8':
             case 'utf-8':
             case undefined:
               return utf8ToBytes(string).length
             case 'ucs2':
             case 'ucs-2':
             case 'utf16le':
             case 'utf-16le':
               return len * 2
             case 'hex':
               return len >>> 1
             case 'base64':
               return base64ToBytes(string).length
             default:
               if (loweredCase) return utf8ToBytes(string).length // assume utf8
               encoding = ('' + encoding).toLowerCase();
               loweredCase = true;
           }
         }
       }
       Buffer$1.byteLength = byteLength;

       function slowToString (encoding, start, end) {
         var loweredCase = false;

         // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
         // property of a typed array.

         // This behaves neither like String nor Uint8Array in that we set start/end
         // to their upper/lower bounds if the value passed is out of range.
         // undefined is handled specially as per ECMA-262 6th Edition,
         // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
         if (start === undefined || start < 0) {
           start = 0;
         }
         // Return early if start > this.length. Done here to prevent potential uint32
         // coercion fail below.
         if (start > this.length) {
           return ''
         }

         if (end === undefined || end > this.length) {
           end = this.length;
         }

         if (end <= 0) {
           return ''
         }

         // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
         end >>>= 0;
         start >>>= 0;

         if (end <= start) {
           return ''
         }

         if (!encoding) encoding = 'utf8';

         while (true) {
           switch (encoding) {
             case 'hex':
               return hexSlice(this, start, end)

             case 'utf8':
             case 'utf-8':
               return utf8Slice(this, start, end)

             case 'ascii':
               return asciiSlice(this, start, end)

             case 'latin1':
             case 'binary':
               return latin1Slice(this, start, end)

             case 'base64':
               return base64Slice(this, start, end)

             case 'ucs2':
             case 'ucs-2':
             case 'utf16le':
             case 'utf-16le':
               return utf16leSlice(this, start, end)

             default:
               if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
               encoding = (encoding + '').toLowerCase();
               loweredCase = true;
           }
         }
       }

       // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
       // Buffer instances.
       Buffer$1.prototype._isBuffer = true;

       function swap (b, n, m) {
         var i = b[n];
         b[n] = b[m];
         b[m] = i;
       }

       Buffer$1.prototype.swap16 = function swap16 () {
         var len = this.length;
         if (len % 2 !== 0) {
           throw new RangeError('Buffer size must be a multiple of 16-bits')
         }
         for (var i = 0; i < len; i += 2) {
           swap(this, i, i + 1);
         }
         return this
       };

       Buffer$1.prototype.swap32 = function swap32 () {
         var len = this.length;
         if (len % 4 !== 0) {
           throw new RangeError('Buffer size must be a multiple of 32-bits')
         }
         for (var i = 0; i < len; i += 4) {
           swap(this, i, i + 3);
           swap(this, i + 1, i + 2);
         }
         return this
       };

       Buffer$1.prototype.swap64 = function swap64 () {
         var len = this.length;
         if (len % 8 !== 0) {
           throw new RangeError('Buffer size must be a multiple of 64-bits')
         }
         for (var i = 0; i < len; i += 8) {
           swap(this, i, i + 7);
           swap(this, i + 1, i + 6);
           swap(this, i + 2, i + 5);
           swap(this, i + 3, i + 4);
         }
         return this
       };

       Buffer$1.prototype.toString = function toString () {
         var length = this.length | 0;
         if (length === 0) return ''
         if (arguments.length === 0) return utf8Slice(this, 0, length)
         return slowToString.apply(this, arguments)
       };

       Buffer$1.prototype.equals = function equals (b) {
         if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
         if (this === b) return true
         return Buffer$1.compare(this, b) === 0
       };

       Buffer$1.prototype.inspect = function inspect () {
         var str = '';
         var max = INSPECT_MAX_BYTES;
         if (this.length > 0) {
           str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
           if (this.length > max) str += ' ... ';
         }
         return '<Buffer ' + str + '>'
       };

       Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
         if (!internalIsBuffer(target)) {
           throw new TypeError('Argument must be a Buffer')
         }

         if (start === undefined) {
           start = 0;
         }
         if (end === undefined) {
           end = target ? target.length : 0;
         }
         if (thisStart === undefined) {
           thisStart = 0;
         }
         if (thisEnd === undefined) {
           thisEnd = this.length;
         }

         if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
           throw new RangeError('out of range index')
         }

         if (thisStart >= thisEnd && start >= end) {
           return 0
         }
         if (thisStart >= thisEnd) {
           return -1
         }
         if (start >= end) {
           return 1
         }

         start >>>= 0;
         end >>>= 0;
         thisStart >>>= 0;
         thisEnd >>>= 0;

         if (this === target) return 0

         var x = thisEnd - thisStart;
         var y = end - start;
         var len = Math.min(x, y);

         var thisCopy = this.slice(thisStart, thisEnd);
         var targetCopy = target.slice(start, end);

         for (var i = 0; i < len; ++i) {
           if (thisCopy[i] !== targetCopy[i]) {
             x = thisCopy[i];
             y = targetCopy[i];
             break
           }
         }

         if (x < y) return -1
         if (y < x) return 1
         return 0
       };

       // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
       // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
       //
       // Arguments:
       // - buffer - a Buffer to search
       // - val - a string, Buffer, or number
       // - byteOffset - an index into `buffer`; will be clamped to an int32
       // - encoding - an optional encoding, relevant is val is a string
       // - dir - true for indexOf, false for lastIndexOf
       function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
         // Empty buffer means no match
         if (buffer.length === 0) return -1

         // Normalize byteOffset
         if (typeof byteOffset === 'string') {
           encoding = byteOffset;
           byteOffset = 0;
         } else if (byteOffset > 0x7fffffff) {
           byteOffset = 0x7fffffff;
         } else if (byteOffset < -0x80000000) {
           byteOffset = -0x80000000;
         }
         byteOffset = +byteOffset;  // Coerce to Number.
         if (isNaN(byteOffset)) {
           // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
           byteOffset = dir ? 0 : (buffer.length - 1);
         }

         // Normalize byteOffset: negative offsets start from the end of the buffer
         if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
         if (byteOffset >= buffer.length) {
           if (dir) return -1
           else byteOffset = buffer.length - 1;
         } else if (byteOffset < 0) {
           if (dir) byteOffset = 0;
           else return -1
         }

         // Normalize val
         if (typeof val === 'string') {
           val = Buffer$1.from(val, encoding);
         }

         // Finally, search either indexOf (if dir is true) or lastIndexOf
         if (internalIsBuffer(val)) {
           // Special case: looking for empty string/buffer always fails
           if (val.length === 0) {
             return -1
           }
           return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
         } else if (typeof val === 'number') {
           val = val & 0xFF; // Search for a byte value [0-255]
           if (Buffer$1.TYPED_ARRAY_SUPPORT &&
               typeof Uint8Array.prototype.indexOf === 'function') {
             if (dir) {
               return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
             } else {
               return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
             }
           }
           return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
         }

         throw new TypeError('val must be string, number or Buffer')
       }

       function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
         var indexSize = 1;
         var arrLength = arr.length;
         var valLength = val.length;

         if (encoding !== undefined) {
           encoding = String(encoding).toLowerCase();
           if (encoding === 'ucs2' || encoding === 'ucs-2' ||
               encoding === 'utf16le' || encoding === 'utf-16le') {
             if (arr.length < 2 || val.length < 2) {
               return -1
             }
             indexSize = 2;
             arrLength /= 2;
             valLength /= 2;
             byteOffset /= 2;
           }
         }

         function read$$1 (buf, i) {
           if (indexSize === 1) {
             return buf[i]
           } else {
             return buf.readUInt16BE(i * indexSize)
           }
         }

         var i;
         if (dir) {
           var foundIndex = -1;
           for (i = byteOffset; i < arrLength; i++) {
             if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
               if (foundIndex === -1) foundIndex = i;
               if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
             } else {
               if (foundIndex !== -1) i -= i - foundIndex;
               foundIndex = -1;
             }
           }
         } else {
           if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
           for (i = byteOffset; i >= 0; i--) {
             var found = true;
             for (var j = 0; j < valLength; j++) {
               if (read$$1(arr, i + j) !== read$$1(val, j)) {
                 found = false;
                 break
               }
             }
             if (found) return i
           }
         }

         return -1
       }

       Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
         return this.indexOf(val, byteOffset, encoding) !== -1
       };

       Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
         return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
       };

       Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
         return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
       };

       function hexWrite (buf, string, offset, length) {
         offset = Number(offset) || 0;
         var remaining = buf.length - offset;
         if (!length) {
           length = remaining;
         } else {
           length = Number(length);
           if (length > remaining) {
             length = remaining;
           }
         }

         // must be an even number of digits
         var strLen = string.length;
         if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

         if (length > strLen / 2) {
           length = strLen / 2;
         }
         for (var i = 0; i < length; ++i) {
           var parsed = parseInt(string.substr(i * 2, 2), 16);
           if (isNaN(parsed)) return i
           buf[offset + i] = parsed;
         }
         return i
       }

       function utf8Write (buf, string, offset, length) {
         return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
       }

       function asciiWrite (buf, string, offset, length) {
         return blitBuffer(asciiToBytes(string), buf, offset, length)
       }

       function latin1Write (buf, string, offset, length) {
         return asciiWrite(buf, string, offset, length)
       }

       function base64Write (buf, string, offset, length) {
         return blitBuffer(base64ToBytes(string), buf, offset, length)
       }

       function ucs2Write (buf, string, offset, length) {
         return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
       }

       Buffer$1.prototype.write = function write$$1 (string, offset, length, encoding) {
         // Buffer#write(string)
         if (offset === undefined) {
           encoding = 'utf8';
           length = this.length;
           offset = 0;
         // Buffer#write(string, encoding)
         } else if (length === undefined && typeof offset === 'string') {
           encoding = offset;
           length = this.length;
           offset = 0;
         // Buffer#write(string, offset[, length][, encoding])
         } else if (isFinite(offset)) {
           offset = offset | 0;
           if (isFinite(length)) {
             length = length | 0;
             if (encoding === undefined) encoding = 'utf8';
           } else {
             encoding = length;
             length = undefined;
           }
         // legacy write(string, encoding, offset, length) - remove in v0.13
         } else {
           throw new Error(
             'Buffer.write(string, encoding, offset[, length]) is no longer supported'
           )
         }

         var remaining = this.length - offset;
         if (length === undefined || length > remaining) length = remaining;

         if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
           throw new RangeError('Attempt to write outside buffer bounds')
         }

         if (!encoding) encoding = 'utf8';

         var loweredCase = false;
         for (;;) {
           switch (encoding) {
             case 'hex':
               return hexWrite(this, string, offset, length)

             case 'utf8':
             case 'utf-8':
               return utf8Write(this, string, offset, length)

             case 'ascii':
               return asciiWrite(this, string, offset, length)

             case 'latin1':
             case 'binary':
               return latin1Write(this, string, offset, length)

             case 'base64':
               // Warning: maxLength not taken into account in base64Write
               return base64Write(this, string, offset, length)

             case 'ucs2':
             case 'ucs-2':
             case 'utf16le':
             case 'utf-16le':
               return ucs2Write(this, string, offset, length)

             default:
               if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
               encoding = ('' + encoding).toLowerCase();
               loweredCase = true;
           }
         }
       };

       Buffer$1.prototype.toJSON = function toJSON () {
         return {
           type: 'Buffer',
           data: Array.prototype.slice.call(this._arr || this, 0)
         }
       };

       function base64Slice (buf, start, end) {
         if (start === 0 && end === buf.length) {
           return fromByteArray(buf)
         } else {
           return fromByteArray(buf.slice(start, end))
         }
       }

       function utf8Slice (buf, start, end) {
         end = Math.min(buf.length, end);
         var res = [];

         var i = start;
         while (i < end) {
           var firstByte = buf[i];
           var codePoint = null;
           var bytesPerSequence = (firstByte > 0xEF) ? 4
             : (firstByte > 0xDF) ? 3
             : (firstByte > 0xBF) ? 2
             : 1;

           if (i + bytesPerSequence <= end) {
             var secondByte, thirdByte, fourthByte, tempCodePoint;

             switch (bytesPerSequence) {
               case 1:
                 if (firstByte < 0x80) {
                   codePoint = firstByte;
                 }
                 break
               case 2:
                 secondByte = buf[i + 1];
                 if ((secondByte & 0xC0) === 0x80) {
                   tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                   if (tempCodePoint > 0x7F) {
                     codePoint = tempCodePoint;
                   }
                 }
                 break
               case 3:
                 secondByte = buf[i + 1];
                 thirdByte = buf[i + 2];
                 if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                   tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                   if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                     codePoint = tempCodePoint;
                   }
                 }
                 break
               case 4:
                 secondByte = buf[i + 1];
                 thirdByte = buf[i + 2];
                 fourthByte = buf[i + 3];
                 if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                   tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                   if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                     codePoint = tempCodePoint;
                   }
                 }
             }
           }

           if (codePoint === null) {
             // we did not generate a valid codePoint so insert a
             // replacement char (U+FFFD) and advance only 1 byte
             codePoint = 0xFFFD;
             bytesPerSequence = 1;
           } else if (codePoint > 0xFFFF) {
             // encode to utf16 (surrogate pair dance)
             codePoint -= 0x10000;
             res.push(codePoint >>> 10 & 0x3FF | 0xD800);
             codePoint = 0xDC00 | codePoint & 0x3FF;
           }

           res.push(codePoint);
           i += bytesPerSequence;
         }

         return decodeCodePointsArray(res)
       }

       // Based on http://stackoverflow.com/a/22747272/680742, the browser with
       // the lowest limit is Chrome, with 0x10000 args.
       // We go 1 magnitude less, for safety
       var MAX_ARGUMENTS_LENGTH = 0x1000;

       function decodeCodePointsArray (codePoints) {
         var len = codePoints.length;
         if (len <= MAX_ARGUMENTS_LENGTH) {
           return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
         }

         // Decode in chunks to avoid "call stack size exceeded".
         var res = '';
         var i = 0;
         while (i < len) {
           res += String.fromCharCode.apply(
             String,
             codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
           );
         }
         return res
       }

       function asciiSlice (buf, start, end) {
         var ret = '';
         end = Math.min(buf.length, end);

         for (var i = start; i < end; ++i) {
           ret += String.fromCharCode(buf[i] & 0x7F);
         }
         return ret
       }

       function latin1Slice (buf, start, end) {
         var ret = '';
         end = Math.min(buf.length, end);

         for (var i = start; i < end; ++i) {
           ret += String.fromCharCode(buf[i]);
         }
         return ret
       }

       function hexSlice (buf, start, end) {
         var len = buf.length;

         if (!start || start < 0) start = 0;
         if (!end || end < 0 || end > len) end = len;

         var out = '';
         for (var i = start; i < end; ++i) {
           out += toHex(buf[i]);
         }
         return out
       }

       function utf16leSlice (buf, start, end) {
         var bytes = buf.slice(start, end);
         var res = '';
         for (var i = 0; i < bytes.length; i += 2) {
           res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
         }
         return res
       }

       Buffer$1.prototype.slice = function slice (start, end) {
         var len = this.length;
         start = ~~start;
         end = end === undefined ? len : ~~end;

         if (start < 0) {
           start += len;
           if (start < 0) start = 0;
         } else if (start > len) {
           start = len;
         }

         if (end < 0) {
           end += len;
           if (end < 0) end = 0;
         } else if (end > len) {
           end = len;
         }

         if (end < start) end = start;

         var newBuf;
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           newBuf = this.subarray(start, end);
           newBuf.__proto__ = Buffer$1.prototype;
         } else {
           var sliceLen = end - start;
           newBuf = new Buffer$1(sliceLen, undefined);
           for (var i = 0; i < sliceLen; ++i) {
             newBuf[i] = this[i + start];
           }
         }

         return newBuf
       };

       /*
        * Need to make sure that buffer isn't trying to write out of bounds.
        */
       function checkOffset (offset, ext, length) {
         if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
         if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
       }

       Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) checkOffset(offset, byteLength, this.length);

         var val = this[offset];
         var mul = 1;
         var i = 0;
         while (++i < byteLength && (mul *= 0x100)) {
           val += this[offset + i] * mul;
         }

         return val
       };

       Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) {
           checkOffset(offset, byteLength, this.length);
         }

         var val = this[offset + --byteLength];
         var mul = 1;
         while (byteLength > 0 && (mul *= 0x100)) {
           val += this[offset + --byteLength] * mul;
         }

         return val
       };

       Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 1, this.length);
         return this[offset]
       };

       Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 2, this.length);
         return this[offset] | (this[offset + 1] << 8)
       };

       Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 2, this.length);
         return (this[offset] << 8) | this[offset + 1]
       };

       Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);

         return ((this[offset]) |
             (this[offset + 1] << 8) |
             (this[offset + 2] << 16)) +
             (this[offset + 3] * 0x1000000)
       };

       Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);

         return (this[offset] * 0x1000000) +
           ((this[offset + 1] << 16) |
           (this[offset + 2] << 8) |
           this[offset + 3])
       };

       Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) checkOffset(offset, byteLength, this.length);

         var val = this[offset];
         var mul = 1;
         var i = 0;
         while (++i < byteLength && (mul *= 0x100)) {
           val += this[offset + i] * mul;
         }
         mul *= 0x80;

         if (val >= mul) val -= Math.pow(2, 8 * byteLength);

         return val
       };

       Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) checkOffset(offset, byteLength, this.length);

         var i = byteLength;
         var mul = 1;
         var val = this[offset + --i];
         while (i > 0 && (mul *= 0x100)) {
           val += this[offset + --i] * mul;
         }
         mul *= 0x80;

         if (val >= mul) val -= Math.pow(2, 8 * byteLength);

         return val
       };

       Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 1, this.length);
         if (!(this[offset] & 0x80)) return (this[offset])
         return ((0xff - this[offset] + 1) * -1)
       };

       Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 2, this.length);
         var val = this[offset] | (this[offset + 1] << 8);
         return (val & 0x8000) ? val | 0xFFFF0000 : val
       };

       Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 2, this.length);
         var val = this[offset + 1] | (this[offset] << 8);
         return (val & 0x8000) ? val | 0xFFFF0000 : val
       };

       Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);

         return (this[offset]) |
           (this[offset + 1] << 8) |
           (this[offset + 2] << 16) |
           (this[offset + 3] << 24)
       };

       Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);

         return (this[offset] << 24) |
           (this[offset + 1] << 16) |
           (this[offset + 2] << 8) |
           (this[offset + 3])
       };

       Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);
         return read(this, offset, true, 23, 4)
       };

       Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 4, this.length);
         return read(this, offset, false, 23, 4)
       };

       Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 8, this.length);
         return read(this, offset, true, 52, 8)
       };

       Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
         if (!noAssert) checkOffset(offset, 8, this.length);
         return read(this, offset, false, 52, 8)
       };

       function checkInt (buf, value, offset, ext, max, min) {
         if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
         if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
         if (offset + ext > buf.length) throw new RangeError('Index out of range')
       }

       Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
         value = +value;
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) {
           var maxBytes = Math.pow(2, 8 * byteLength) - 1;
           checkInt(this, value, offset, byteLength, maxBytes, 0);
         }

         var mul = 1;
         var i = 0;
         this[offset] = value & 0xFF;
         while (++i < byteLength && (mul *= 0x100)) {
           this[offset + i] = (value / mul) & 0xFF;
         }

         return offset + byteLength
       };

       Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
         value = +value;
         offset = offset | 0;
         byteLength = byteLength | 0;
         if (!noAssert) {
           var maxBytes = Math.pow(2, 8 * byteLength) - 1;
           checkInt(this, value, offset, byteLength, maxBytes, 0);
         }

         var i = byteLength - 1;
         var mul = 1;
         this[offset + i] = value & 0xFF;
         while (--i >= 0 && (mul *= 0x100)) {
           this[offset + i] = (value / mul) & 0xFF;
         }

         return offset + byteLength
       };

       Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
         if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
         this[offset] = (value & 0xff);
         return offset + 1
       };

       function objectWriteUInt16 (buf, value, offset, littleEndian) {
         if (value < 0) value = 0xffff + value + 1;
         for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
           buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
             (littleEndian ? i : 1 - i) * 8;
         }
       }

       Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value & 0xff);
           this[offset + 1] = (value >>> 8);
         } else {
           objectWriteUInt16(this, value, offset, true);
         }
         return offset + 2
       };

       Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value >>> 8);
           this[offset + 1] = (value & 0xff);
         } else {
           objectWriteUInt16(this, value, offset, false);
         }
         return offset + 2
       };

       function objectWriteUInt32 (buf, value, offset, littleEndian) {
         if (value < 0) value = 0xffffffff + value + 1;
         for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
           buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
         }
       }

       Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset + 3] = (value >>> 24);
           this[offset + 2] = (value >>> 16);
           this[offset + 1] = (value >>> 8);
           this[offset] = (value & 0xff);
         } else {
           objectWriteUInt32(this, value, offset, true);
         }
         return offset + 4
       };

       Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value >>> 24);
           this[offset + 1] = (value >>> 16);
           this[offset + 2] = (value >>> 8);
           this[offset + 3] = (value & 0xff);
         } else {
           objectWriteUInt32(this, value, offset, false);
         }
         return offset + 4
       };

       Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) {
           var limit = Math.pow(2, 8 * byteLength - 1);

           checkInt(this, value, offset, byteLength, limit - 1, -limit);
         }

         var i = 0;
         var mul = 1;
         var sub = 0;
         this[offset] = value & 0xFF;
         while (++i < byteLength && (mul *= 0x100)) {
           if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
             sub = 1;
           }
           this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
         }

         return offset + byteLength
       };

       Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) {
           var limit = Math.pow(2, 8 * byteLength - 1);

           checkInt(this, value, offset, byteLength, limit - 1, -limit);
         }

         var i = byteLength - 1;
         var mul = 1;
         var sub = 0;
         this[offset + i] = value & 0xFF;
         while (--i >= 0 && (mul *= 0x100)) {
           if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
             sub = 1;
           }
           this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
         }

         return offset + byteLength
       };

       Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
         if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
         if (value < 0) value = 0xff + value + 1;
         this[offset] = (value & 0xff);
         return offset + 1
       };

       Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value & 0xff);
           this[offset + 1] = (value >>> 8);
         } else {
           objectWriteUInt16(this, value, offset, true);
         }
         return offset + 2
       };

       Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value >>> 8);
           this[offset + 1] = (value & 0xff);
         } else {
           objectWriteUInt16(this, value, offset, false);
         }
         return offset + 2
       };

       Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value & 0xff);
           this[offset + 1] = (value >>> 8);
           this[offset + 2] = (value >>> 16);
           this[offset + 3] = (value >>> 24);
         } else {
           objectWriteUInt32(this, value, offset, true);
         }
         return offset + 4
       };

       Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
         value = +value;
         offset = offset | 0;
         if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
         if (value < 0) value = 0xffffffff + value + 1;
         if (Buffer$1.TYPED_ARRAY_SUPPORT) {
           this[offset] = (value >>> 24);
           this[offset + 1] = (value >>> 16);
           this[offset + 2] = (value >>> 8);
           this[offset + 3] = (value & 0xff);
         } else {
           objectWriteUInt32(this, value, offset, false);
         }
         return offset + 4
       };

       function checkIEEE754 (buf, value, offset, ext, max, min) {
         if (offset + ext > buf.length) throw new RangeError('Index out of range')
         if (offset < 0) throw new RangeError('Index out of range')
       }

       function writeFloat (buf, value, offset, littleEndian, noAssert) {
         if (!noAssert) {
           checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
         }
         write(buf, value, offset, littleEndian, 23, 4);
         return offset + 4
       }

       Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
         return writeFloat(this, value, offset, true, noAssert)
       };

       Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
         return writeFloat(this, value, offset, false, noAssert)
       };

       function writeDouble (buf, value, offset, littleEndian, noAssert) {
         if (!noAssert) {
           checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
         }
         write(buf, value, offset, littleEndian, 52, 8);
         return offset + 8
       }

       Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
         return writeDouble(this, value, offset, true, noAssert)
       };

       Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
         return writeDouble(this, value, offset, false, noAssert)
       };

       // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
       Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
         if (!start) start = 0;
         if (!end && end !== 0) end = this.length;
         if (targetStart >= target.length) targetStart = target.length;
         if (!targetStart) targetStart = 0;
         if (end > 0 && end < start) end = start;

         // Copy 0 bytes; we're done
         if (end === start) return 0
         if (target.length === 0 || this.length === 0) return 0

         // Fatal error conditions
         if (targetStart < 0) {
           throw new RangeError('targetStart out of bounds')
         }
         if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
         if (end < 0) throw new RangeError('sourceEnd out of bounds')

         // Are we oob?
         if (end > this.length) end = this.length;
         if (target.length - targetStart < end - start) {
           end = target.length - targetStart + start;
         }

         var len = end - start;
         var i;

         if (this === target && start < targetStart && targetStart < end) {
           // descending copy from end
           for (i = len - 1; i >= 0; --i) {
             target[i + targetStart] = this[i + start];
           }
         } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
           // ascending copy from start
           for (i = 0; i < len; ++i) {
             target[i + targetStart] = this[i + start];
           }
         } else {
           Uint8Array.prototype.set.call(
             target,
             this.subarray(start, start + len),
             targetStart
           );
         }

         return len
       };

       // Usage:
       //    buffer.fill(number[, offset[, end]])
       //    buffer.fill(buffer[, offset[, end]])
       //    buffer.fill(string[, offset[, end]][, encoding])
       Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
         // Handle string cases:
         if (typeof val === 'string') {
           if (typeof start === 'string') {
             encoding = start;
             start = 0;
             end = this.length;
           } else if (typeof end === 'string') {
             encoding = end;
             end = this.length;
           }
           if (val.length === 1) {
             var code = val.charCodeAt(0);
             if (code < 256) {
               val = code;
             }
           }
           if (encoding !== undefined && typeof encoding !== 'string') {
             throw new TypeError('encoding must be a string')
           }
           if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
             throw new TypeError('Unknown encoding: ' + encoding)
           }
         } else if (typeof val === 'number') {
           val = val & 255;
         }

         // Invalid ranges are not set to a default, so can range check early.
         if (start < 0 || this.length < start || this.length < end) {
           throw new RangeError('Out of range index')
         }

         if (end <= start) {
           return this
         }

         start = start >>> 0;
         end = end === undefined ? this.length : end >>> 0;

         if (!val) val = 0;

         var i;
         if (typeof val === 'number') {
           for (i = start; i < end; ++i) {
             this[i] = val;
           }
         } else {
           var bytes = internalIsBuffer(val)
             ? val
             : utf8ToBytes(new Buffer$1(val, encoding).toString());
           var len = bytes.length;
           for (i = 0; i < end - start; ++i) {
             this[i + start] = bytes[i % len];
           }
         }

         return this
       };

       // HELPER FUNCTIONS
       // ================

       var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

       function base64clean (str) {
         // Node strips out invalid characters like \n and \t from the string, base64-js does not
         str = stringtrim(str).replace(INVALID_BASE64_RE, '');
         // Node converts strings with length < 2 to ''
         if (str.length < 2) return ''
         // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
         while (str.length % 4 !== 0) {
           str = str + '=';
         }
         return str
       }

       function stringtrim (str) {
         if (str.trim) return str.trim()
         return str.replace(/^\s+|\s+$/g, '')
       }

       function toHex (n) {
         if (n < 16) return '0' + n.toString(16)
         return n.toString(16)
       }

       function utf8ToBytes (string, units) {
         units = units || Infinity;
         var codePoint;
         var length = string.length;
         var leadSurrogate = null;
         var bytes = [];

         for (var i = 0; i < length; ++i) {
           codePoint = string.charCodeAt(i);

           // is surrogate component
           if (codePoint > 0xD7FF && codePoint < 0xE000) {
             // last char was a lead
             if (!leadSurrogate) {
               // no lead yet
               if (codePoint > 0xDBFF) {
                 // unexpected trail
                 if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                 continue
               } else if (i + 1 === length) {
                 // unpaired lead
                 if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                 continue
               }

               // valid lead
               leadSurrogate = codePoint;

               continue
             }

             // 2 leads in a row
             if (codePoint < 0xDC00) {
               if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
               leadSurrogate = codePoint;
               continue
             }

             // valid surrogate pair
             codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
           } else if (leadSurrogate) {
             // valid bmp char, but last char was a lead
             if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
           }

           leadSurrogate = null;

           // encode utf8
           if (codePoint < 0x80) {
             if ((units -= 1) < 0) break
             bytes.push(codePoint);
           } else if (codePoint < 0x800) {
             if ((units -= 2) < 0) break
             bytes.push(
               codePoint >> 0x6 | 0xC0,
               codePoint & 0x3F | 0x80
             );
           } else if (codePoint < 0x10000) {
             if ((units -= 3) < 0) break
             bytes.push(
               codePoint >> 0xC | 0xE0,
               codePoint >> 0x6 & 0x3F | 0x80,
               codePoint & 0x3F | 0x80
             );
           } else if (codePoint < 0x110000) {
             if ((units -= 4) < 0) break
             bytes.push(
               codePoint >> 0x12 | 0xF0,
               codePoint >> 0xC & 0x3F | 0x80,
               codePoint >> 0x6 & 0x3F | 0x80,
               codePoint & 0x3F | 0x80
             );
           } else {
             throw new Error('Invalid code point')
           }
         }

         return bytes
       }

       function asciiToBytes (str) {
         var byteArray = [];
         for (var i = 0; i < str.length; ++i) {
           // Node's code seems to be doing this and not & 0x7F..
           byteArray.push(str.charCodeAt(i) & 0xFF);
         }
         return byteArray
       }

       function utf16leToBytes (str, units) {
         var c, hi, lo;
         var byteArray = [];
         for (var i = 0; i < str.length; ++i) {
           if ((units -= 2) < 0) break

           c = str.charCodeAt(i);
           hi = c >> 8;
           lo = c % 256;
           byteArray.push(lo);
           byteArray.push(hi);
         }

         return byteArray
       }


       function base64ToBytes (str) {
         return toByteArray(base64clean(str))
       }

       function blitBuffer (src, dst, offset, length) {
         for (var i = 0; i < length; ++i) {
           if ((i + offset >= dst.length) || (i >= src.length)) break
           dst[i + offset] = src[i];
         }
         return i
       }

       function isnan (val) {
         return val !== val // eslint-disable-line no-self-compare
       }


       // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
       // The _isBuffer check is for Safari 5-7 support, because it's missing
       // Object.prototype.constructor. Remove this eventually
       function isBuffer(obj) {
         return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
       }

       function isFastBuffer (obj) {
         return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
       }

       // For Node v0.10 support. Remove this eventually.
       function isSlowBuffer (obj) {
         return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
       }

       var bufferEs6 = /*#__PURE__*/Object.freeze({
              INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
              kMaxLength: _kMaxLength,
              Buffer: Buffer$1,
              SlowBuffer: SlowBuffer,
              isBuffer: isBuffer
       });

       // shim for using process in browser
       // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

       function defaultSetTimout() {
           throw new Error('setTimeout has not been defined');
       }
       function defaultClearTimeout () {
           throw new Error('clearTimeout has not been defined');
       }
       var cachedSetTimeout = defaultSetTimout;
       var cachedClearTimeout = defaultClearTimeout;
       if (typeof global$1.setTimeout === 'function') {
           cachedSetTimeout = setTimeout;
       }
       if (typeof global$1.clearTimeout === 'function') {
           cachedClearTimeout = clearTimeout;
       }

       function runTimeout(fun) {
           if (cachedSetTimeout === setTimeout) {
               //normal enviroments in sane situations
               return setTimeout(fun, 0);
           }
           // if setTimeout wasn't available but was latter defined
           if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
               cachedSetTimeout = setTimeout;
               return setTimeout(fun, 0);
           }
           try {
               // when when somebody has screwed with setTimeout but no I.E. maddness
               return cachedSetTimeout(fun, 0);
           } catch(e){
               try {
                   // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                   return cachedSetTimeout.call(null, fun, 0);
               } catch(e){
                   // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                   return cachedSetTimeout.call(this, fun, 0);
               }
           }


       }
       function runClearTimeout(marker) {
           if (cachedClearTimeout === clearTimeout) {
               //normal enviroments in sane situations
               return clearTimeout(marker);
           }
           // if clearTimeout wasn't available but was latter defined
           if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
               cachedClearTimeout = clearTimeout;
               return clearTimeout(marker);
           }
           try {
               // when when somebody has screwed with setTimeout but no I.E. maddness
               return cachedClearTimeout(marker);
           } catch (e){
               try {
                   // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                   return cachedClearTimeout.call(null, marker);
               } catch (e){
                   // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                   // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                   return cachedClearTimeout.call(this, marker);
               }
           }



       }
       var queue = [];
       var draining = false;
       var currentQueue;
       var queueIndex = -1;

       function cleanUpNextTick() {
           if (!draining || !currentQueue) {
               return;
           }
           draining = false;
           if (currentQueue.length) {
               queue = currentQueue.concat(queue);
           } else {
               queueIndex = -1;
           }
           if (queue.length) {
               drainQueue();
           }
       }

       function drainQueue() {
           if (draining) {
               return;
           }
           var timeout = runTimeout(cleanUpNextTick);
           draining = true;

           var len = queue.length;
           while(len) {
               currentQueue = queue;
               queue = [];
               while (++queueIndex < len) {
                   if (currentQueue) {
                       currentQueue[queueIndex].run();
                   }
               }
               queueIndex = -1;
               len = queue.length;
           }
           currentQueue = null;
           draining = false;
           runClearTimeout(timeout);
       }
       function nextTick(fun) {
           var args = new Array(arguments.length - 1);
           if (arguments.length > 1) {
               for (var i = 1; i < arguments.length; i++) {
                   args[i - 1] = arguments[i];
               }
           }
           queue.push(new Item(fun, args));
           if (queue.length === 1 && !draining) {
               runTimeout(drainQueue);
           }
       }
       // v8 likes predictible objects
       function Item(fun, array) {
           this.fun = fun;
           this.array = array;
       }
       Item.prototype.run = function () {
           this.fun.apply(null, this.array);
       };
       var title = 'browser';
       var platform = 'browser';
       var browser = true;
       var env = {};
       var argv = [];
       var version = ''; // empty string to avoid regexp issues
       var versions = {};
       var release = {};
       var config = {};

       function noop() {}

       var on = noop;
       var addListener = noop;
       var once$1 = noop;
       var off = noop;
       var removeListener = noop;
       var removeAllListeners = noop;
       var emit = noop;

       function binding(name) {
           throw new Error('process.binding is not supported');
       }

       function cwd () { return '/' }
       function chdir (dir) {
           throw new Error('process.chdir is not supported');
       }function umask() { return 0; }

       // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
       var performance = global$1.performance || {};
       var performanceNow =
         performance.now        ||
         performance.mozNow     ||
         performance.msNow      ||
         performance.oNow       ||
         performance.webkitNow  ||
         function(){ return (new Date()).getTime() };

       // generate timestamp or delta
       // see http://nodejs.org/api/process.html#process_process_hrtime
       function hrtime(previousTimestamp){
         var clocktime = performanceNow.call(performance)*1e-3;
         var seconds = Math.floor(clocktime);
         var nanoseconds = Math.floor((clocktime%1)*1e9);
         if (previousTimestamp) {
           seconds = seconds - previousTimestamp[0];
           nanoseconds = nanoseconds - previousTimestamp[1];
           if (nanoseconds<0) {
             seconds--;
             nanoseconds += 1e9;
           }
         }
         return [seconds,nanoseconds]
       }

       var startTime = new Date();
       function uptime() {
         var currentTime = new Date();
         var dif = currentTime - startTime;
         return dif / 1000;
       }

       var process = {
         nextTick: nextTick,
         title: title,
         browser: browser,
         env: env,
         argv: argv,
         version: version,
         versions: versions,
         on: on,
         addListener: addListener,
         once: once$1,
         off: off,
         removeListener: removeListener,
         removeAllListeners: removeAllListeners,
         emit: emit,
         binding: binding,
         cwd: cwd,
         chdir: chdir,
         umask: umask,
         hrtime: hrtime,
         platform: platform,
         release: release,
         config: config,
         uptime: uptime
       };

       var inherits;
       if (typeof Object.create === 'function'){
         inherits = function inherits(ctor, superCtor) {
           // implementation from standard node.js 'util' module
           ctor.super_ = superCtor;
           ctor.prototype = Object.create(superCtor.prototype, {
             constructor: {
               value: ctor,
               enumerable: false,
               writable: true,
               configurable: true
             }
           });
         };
       } else {
         inherits = function inherits(ctor, superCtor) {
           ctor.super_ = superCtor;
           var TempCtor = function () {};
           TempCtor.prototype = superCtor.prototype;
           ctor.prototype = new TempCtor();
           ctor.prototype.constructor = ctor;
         };
       }
       var inherits$1 = inherits;

       /**
        * Echos the value of a value. Trys to print the value out
        * in the best way possible given the different types.
        *
        * @param {Object} obj The object to print out.
        * @param {Object} opts Optional options object that alters the output.
        */
       /* legacy: obj, showHidden, depth, colors*/
       function inspect(obj, opts) {
         // default options
         var ctx = {
           seen: [],
           stylize: stylizeNoColor
         };
         // legacy...
         if (arguments.length >= 3) ctx.depth = arguments[2];
         if (arguments.length >= 4) ctx.colors = arguments[3];
         if (isBoolean(opts)) {
           // legacy...
           ctx.showHidden = opts;
         } else if (opts) {
           // got an "options" object
           _extend(ctx, opts);
         }
         // set default options
         if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
         if (isUndefined(ctx.depth)) ctx.depth = 2;
         if (isUndefined(ctx.colors)) ctx.colors = false;
         if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
         if (ctx.colors) ctx.stylize = stylizeWithColor;
         return formatValue(ctx, obj, ctx.depth);
       }

       // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
       inspect.colors = {
         'bold' : [1, 22],
         'italic' : [3, 23],
         'underline' : [4, 24],
         'inverse' : [7, 27],
         'white' : [37, 39],
         'grey' : [90, 39],
         'black' : [30, 39],
         'blue' : [34, 39],
         'cyan' : [36, 39],
         'green' : [32, 39],
         'magenta' : [35, 39],
         'red' : [31, 39],
         'yellow' : [33, 39]
       };

       // Don't use 'blue' not visible on cmd.exe
       inspect.styles = {
         'special': 'cyan',
         'number': 'yellow',
         'boolean': 'yellow',
         'undefined': 'grey',
         'null': 'bold',
         'string': 'green',
         'date': 'magenta',
         // "name": intentionally not styling
         'regexp': 'red'
       };


       function stylizeWithColor(str, styleType) {
         var style = inspect.styles[styleType];

         if (style) {
           return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                  '\u001b[' + inspect.colors[style][1] + 'm';
         } else {
           return str;
         }
       }


       function stylizeNoColor(str, styleType) {
         return str;
       }


       function arrayToHash(array) {
         var hash = {};

         array.forEach(function(val, idx) {
           hash[val] = true;
         });

         return hash;
       }


       function formatValue(ctx, value, recurseTimes) {
         // Provide a hook for user-specified inspect functions.
         // Check that value is an object with an inspect function on it
         if (ctx.customInspect &&
             value &&
             isFunction(value.inspect) &&
             // Filter out the util module, it's inspect function is special
             value.inspect !== inspect &&
             // Also filter out any prototype objects using the circular check.
             !(value.constructor && value.constructor.prototype === value)) {
           var ret = value.inspect(recurseTimes, ctx);
           if (!isString(ret)) {
             ret = formatValue(ctx, ret, recurseTimes);
           }
           return ret;
         }

         // Primitive types cannot have properties
         var primitive = formatPrimitive(ctx, value);
         if (primitive) {
           return primitive;
         }

         // Look up the keys of the object.
         var keys = Object.keys(value);
         var visibleKeys = arrayToHash(keys);

         if (ctx.showHidden) {
           keys = Object.getOwnPropertyNames(value);
         }

         // IE doesn't make error fields non-enumerable
         // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
         if (isError(value)
             && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
           return formatError(value);
         }

         // Some type of object without properties can be shortcutted.
         if (keys.length === 0) {
           if (isFunction(value)) {
             var name = value.name ? ': ' + value.name : '';
             return ctx.stylize('[Function' + name + ']', 'special');
           }
           if (isRegExp(value)) {
             return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
           }
           if (isDate(value)) {
             return ctx.stylize(Date.prototype.toString.call(value), 'date');
           }
           if (isError(value)) {
             return formatError(value);
           }
         }

         var base = '', array = false, braces = ['{', '}'];

         // Make Array say that they are Array
         if (isArray$1(value)) {
           array = true;
           braces = ['[', ']'];
         }

         // Make functions say that they are functions
         if (isFunction(value)) {
           var n = value.name ? ': ' + value.name : '';
           base = ' [Function' + n + ']';
         }

         // Make RegExps say that they are RegExps
         if (isRegExp(value)) {
           base = ' ' + RegExp.prototype.toString.call(value);
         }

         // Make dates with properties first say the date
         if (isDate(value)) {
           base = ' ' + Date.prototype.toUTCString.call(value);
         }

         // Make error with message first say the error
         if (isError(value)) {
           base = ' ' + formatError(value);
         }

         if (keys.length === 0 && (!array || value.length == 0)) {
           return braces[0] + base + braces[1];
         }

         if (recurseTimes < 0) {
           if (isRegExp(value)) {
             return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
           } else {
             return ctx.stylize('[Object]', 'special');
           }
         }

         ctx.seen.push(value);

         var output;
         if (array) {
           output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
         } else {
           output = keys.map(function(key) {
             return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
           });
         }

         ctx.seen.pop();

         return reduceToSingleString(output, base, braces);
       }


       function formatPrimitive(ctx, value) {
         if (isUndefined(value))
           return ctx.stylize('undefined', 'undefined');
         if (isString(value)) {
           var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                    .replace(/'/g, "\\'")
                                                    .replace(/\\"/g, '"') + '\'';
           return ctx.stylize(simple, 'string');
         }
         if (isNumber(value))
           return ctx.stylize('' + value, 'number');
         if (isBoolean(value))
           return ctx.stylize('' + value, 'boolean');
         // For some reason typeof null is "object", so special case here.
         if (isNull(value))
           return ctx.stylize('null', 'null');
       }


       function formatError(value) {
         return '[' + Error.prototype.toString.call(value) + ']';
       }


       function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
         var output = [];
         for (var i = 0, l = value.length; i < l; ++i) {
           if (hasOwnProperty(value, String(i))) {
             output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                 String(i), true));
           } else {
             output.push('');
           }
         }
         keys.forEach(function(key) {
           if (!key.match(/^\d+$/)) {
             output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                 key, true));
           }
         });
         return output;
       }


       function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
         var name, str, desc;
         desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
         if (desc.get) {
           if (desc.set) {
             str = ctx.stylize('[Getter/Setter]', 'special');
           } else {
             str = ctx.stylize('[Getter]', 'special');
           }
         } else {
           if (desc.set) {
             str = ctx.stylize('[Setter]', 'special');
           }
         }
         if (!hasOwnProperty(visibleKeys, key)) {
           name = '[' + key + ']';
         }
         if (!str) {
           if (ctx.seen.indexOf(desc.value) < 0) {
             if (isNull(recurseTimes)) {
               str = formatValue(ctx, desc.value, null);
             } else {
               str = formatValue(ctx, desc.value, recurseTimes - 1);
             }
             if (str.indexOf('\n') > -1) {
               if (array) {
                 str = str.split('\n').map(function(line) {
                   return '  ' + line;
                 }).join('\n').substr(2);
               } else {
                 str = '\n' + str.split('\n').map(function(line) {
                   return '   ' + line;
                 }).join('\n');
               }
             }
           } else {
             str = ctx.stylize('[Circular]', 'special');
           }
         }
         if (isUndefined(name)) {
           if (array && key.match(/^\d+$/)) {
             return str;
           }
           name = JSON.stringify('' + key);
           if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
             name = name.substr(1, name.length - 2);
             name = ctx.stylize(name, 'name');
           } else {
             name = name.replace(/'/g, "\\'")
                        .replace(/\\"/g, '"')
                        .replace(/(^"|"$)/g, "'");
             name = ctx.stylize(name, 'string');
           }
         }

         return name + ': ' + str;
       }


       function reduceToSingleString(output, base, braces) {
         var length = output.reduce(function(prev, cur) {
           if (cur.indexOf('\n') >= 0) ;
           return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
         }, 0);

         if (length > 60) {
           return braces[0] +
                  (base === '' ? '' : base + '\n ') +
                  ' ' +
                  output.join(',\n  ') +
                  ' ' +
                  braces[1];
         }

         return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
       }


       // NOTE: These type checking functions intentionally don't use `instanceof`
       // because it is fragile and can be easily faked with `Object.create()`.
       function isArray$1(ar) {
         return Array.isArray(ar);
       }

       function isBoolean(arg) {
         return typeof arg === 'boolean';
       }

       function isNull(arg) {
         return arg === null;
       }

       function isNumber(arg) {
         return typeof arg === 'number';
       }

       function isString(arg) {
         return typeof arg === 'string';
       }

       function isUndefined(arg) {
         return arg === void 0;
       }

       function isRegExp(re) {
         return isObject(re) && objectToString(re) === '[object RegExp]';
       }

       function isObject(arg) {
         return typeof arg === 'object' && arg !== null;
       }

       function isDate(d) {
         return isObject(d) && objectToString(d) === '[object Date]';
       }

       function isError(e) {
         return isObject(e) &&
             (objectToString(e) === '[object Error]' || e instanceof Error);
       }

       function isFunction(arg) {
         return typeof arg === 'function';
       }

       function objectToString(o) {
         return Object.prototype.toString.call(o);
       }

       function _extend(origin, add) {
         // Don't do anything if add isn't an object
         if (!add || !isObject(add)) return origin;

         var keys = Object.keys(add);
         var i = keys.length;
         while (i--) {
           origin[keys[i]] = add[keys[i]];
         }
         return origin;
       }
       function hasOwnProperty(obj, prop) {
         return Object.prototype.hasOwnProperty.call(obj, prop);
       }

       var _functionsHaveNames;
       function functionsHaveNames() {
         if (typeof _functionsHaveNames !== 'undefined') {
           return _functionsHaveNames;
         }
         return _functionsHaveNames = (function () {
           return function foo() {}.name === 'foo';
         }());
       }

       // 2. The AssertionError is defined in assert.
       // new assert.AssertionError({ message: message,
       //                             actual: actual,
       //                             expected: expected })

       var regex = /\s*function\s+([^\(\s]*)\s*/;
       // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
       function getName(func) {
         if (!isFunction(func)) {
           return;
         }
         if (functionsHaveNames()) {
           return func.name;
         }
         var str = func.toString();
         var match = str.match(regex);
         return match && match[1];
       }
       function AssertionError(options) {
         this.name = 'AssertionError';
         this.actual = options.actual;
         this.expected = options.expected;
         this.operator = options.operator;
         if (options.message) {
           this.message = options.message;
           this.generatedMessage = false;
         } else {
           this.message = getMessage(this);
           this.generatedMessage = true;
         }
         var stackStartFunction = options.stackStartFunction || fail;
         if (Error.captureStackTrace) {
           Error.captureStackTrace(this, stackStartFunction);
         } else {
           // non v8 browsers so we can have a stacktrace
           var err = new Error();
           if (err.stack) {
             var out = err.stack;

             // try to strip useless frames
             var fn_name = getName(stackStartFunction);
             var idx = out.indexOf('\n' + fn_name);
             if (idx >= 0) {
               // once we have located the function frame
               // we need to strip out everything before it (and its line)
               var next_line = out.indexOf('\n', idx + 1);
               out = out.substring(next_line + 1);
             }

             this.stack = out;
           }
         }
       }

       // assert.AssertionError instanceof Error
       inherits$1(AssertionError, Error);

       function truncate(s, n) {
         if (typeof s === 'string') {
           return s.length < n ? s : s.slice(0, n);
         } else {
           return s;
         }
       }
       function inspect$1(something) {
         if (functionsHaveNames() || !isFunction(something)) {
           return inspect(something);
         }
         var rawname = getName(something);
         var name = rawname ? ': ' + rawname : '';
         return '[Function' +  name + ']';
       }
       function getMessage(self) {
         return truncate(inspect$1(self.actual), 128) + ' ' +
                self.operator + ' ' +
                truncate(inspect$1(self.expected), 128);
       }

       // At present only the three keys mentioned above are used and
       // understood by the spec. Implementations or sub modules can pass
       // other keys to the AssertionError's constructor - they will be
       // ignored.

       // 3. All of the following functions must throw an AssertionError
       // when a corresponding condition is not met, with a message that
       // may be undefined if not provided.  All assertion methods provide
       // both the actual and expected values to the assertion error for
       // display purposes.

       function fail(actual, expected, message, operator, stackStartFunction) {
         throw new AssertionError({
           message: message,
           actual: actual,
           expected: expected,
           operator: operator,
           stackStartFunction: stackStartFunction
         });
       }
       function equal(actual, expected, message) {
         if (actual != expected) fail(actual, expected, message, '==', equal);
       }

       var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

       function commonjsRequire () {
       	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
       }

       function createCommonjsModule(fn, module) {
       	return module = { exports: {} }, fn(module, module.exports), module.exports;
       }

       var underscore = createCommonjsModule(function (module, exports) {
       //     Underscore.js 1.8.3
       //     http://underscorejs.org
       //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
       //     Underscore may be freely distributed under the MIT license.

       (function() {

         // Baseline setup
         // --------------

         // Establish the root object, `window` in the browser, or `exports` on the server.
         var root = this;

         // Save the previous value of the `_` variable.
         var previousUnderscore = root._;

         // Save bytes in the minified (but not gzipped) version:
         var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

         // Create quick reference variables for speed access to core prototypes.
         var
           push             = ArrayProto.push,
           slice            = ArrayProto.slice,
           toString         = ObjProto.toString,
           hasOwnProperty   = ObjProto.hasOwnProperty;

         // All **ECMAScript 5** native function implementations that we hope to use
         // are declared here.
         var
           nativeIsArray      = Array.isArray,
           nativeKeys         = Object.keys,
           nativeBind         = FuncProto.bind,
           nativeCreate       = Object.create;

         // Naked function reference for surrogate-prototype-swapping.
         var Ctor = function(){};

         // Create a safe reference to the Underscore object for use below.
         var _ = function(obj) {
           if (obj instanceof _) return obj;
           if (!(this instanceof _)) return new _(obj);
           this._wrapped = obj;
         };

         // Export the Underscore object for **Node.js**, with
         // backwards-compatibility for the old `require()` API. If we're in
         // the browser, add `_` as a global object.
         {
           if (module.exports) {
             exports = module.exports = _;
           }
           exports._ = _;
         }

         // Current version.
         _.VERSION = '1.8.3';

         // Internal function that returns an efficient (for current engines) version
         // of the passed-in callback, to be repeatedly applied in other Underscore
         // functions.
         var optimizeCb = function(func, context, argCount) {
           if (context === void 0) return func;
           switch (argCount == null ? 3 : argCount) {
             case 1: return function(value) {
               return func.call(context, value);
             };
             case 2: return function(value, other) {
               return func.call(context, value, other);
             };
             case 3: return function(value, index, collection) {
               return func.call(context, value, index, collection);
             };
             case 4: return function(accumulator, value, index, collection) {
               return func.call(context, accumulator, value, index, collection);
             };
           }
           return function() {
             return func.apply(context, arguments);
           };
         };

         // A mostly-internal function to generate callbacks that can be applied
         // to each element in a collection, returning the desired result — either
         // identity, an arbitrary callback, a property matcher, or a property accessor.
         var cb = function(value, context, argCount) {
           if (value == null) return _.identity;
           if (_.isFunction(value)) return optimizeCb(value, context, argCount);
           if (_.isObject(value)) return _.matcher(value);
           return _.property(value);
         };
         _.iteratee = function(value, context) {
           return cb(value, context, Infinity);
         };

         // An internal function for creating assigner functions.
         var createAssigner = function(keysFunc, undefinedOnly) {
           return function(obj) {
             var length = arguments.length;
             if (length < 2 || obj == null) return obj;
             for (var index = 1; index < length; index++) {
               var source = arguments[index],
                   keys = keysFunc(source),
                   l = keys.length;
               for (var i = 0; i < l; i++) {
                 var key = keys[i];
                 if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
               }
             }
             return obj;
           };
         };

         // An internal function for creating a new object that inherits from another.
         var baseCreate = function(prototype) {
           if (!_.isObject(prototype)) return {};
           if (nativeCreate) return nativeCreate(prototype);
           Ctor.prototype = prototype;
           var result = new Ctor;
           Ctor.prototype = null;
           return result;
         };

         var property = function(key) {
           return function(obj) {
             return obj == null ? void 0 : obj[key];
           };
         };

         // Helper for collection methods to determine whether a collection
         // should be iterated as an array or as an object
         // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
         // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
         var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
         var getLength = property('length');
         var isArrayLike = function(collection) {
           var length = getLength(collection);
           return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
         };

         // Collection Functions
         // --------------------

         // The cornerstone, an `each` implementation, aka `forEach`.
         // Handles raw objects in addition to array-likes. Treats all
         // sparse array-likes as if they were dense.
         _.each = _.forEach = function(obj, iteratee, context) {
           iteratee = optimizeCb(iteratee, context);
           var i, length;
           if (isArrayLike(obj)) {
             for (i = 0, length = obj.length; i < length; i++) {
               iteratee(obj[i], i, obj);
             }
           } else {
             var keys = _.keys(obj);
             for (i = 0, length = keys.length; i < length; i++) {
               iteratee(obj[keys[i]], keys[i], obj);
             }
           }
           return obj;
         };

         // Return the results of applying the iteratee to each element.
         _.map = _.collect = function(obj, iteratee, context) {
           iteratee = cb(iteratee, context);
           var keys = !isArrayLike(obj) && _.keys(obj),
               length = (keys || obj).length,
               results = Array(length);
           for (var index = 0; index < length; index++) {
             var currentKey = keys ? keys[index] : index;
             results[index] = iteratee(obj[currentKey], currentKey, obj);
           }
           return results;
         };

         // Create a reducing function iterating left or right.
         function createReduce(dir) {
           // Optimized iterator function as using arguments.length
           // in the main function will deoptimize the, see #1991.
           function iterator(obj, iteratee, memo, keys, index, length) {
             for (; index >= 0 && index < length; index += dir) {
               var currentKey = keys ? keys[index] : index;
               memo = iteratee(memo, obj[currentKey], currentKey, obj);
             }
             return memo;
           }

           return function(obj, iteratee, memo, context) {
             iteratee = optimizeCb(iteratee, context, 4);
             var keys = !isArrayLike(obj) && _.keys(obj),
                 length = (keys || obj).length,
                 index = dir > 0 ? 0 : length - 1;
             // Determine the initial value if none is provided.
             if (arguments.length < 3) {
               memo = obj[keys ? keys[index] : index];
               index += dir;
             }
             return iterator(obj, iteratee, memo, keys, index, length);
           };
         }

         // **Reduce** builds up a single result from a list of values, aka `inject`,
         // or `foldl`.
         _.reduce = _.foldl = _.inject = createReduce(1);

         // The right-associative version of reduce, also known as `foldr`.
         _.reduceRight = _.foldr = createReduce(-1);

         // Return the first value which passes a truth test. Aliased as `detect`.
         _.find = _.detect = function(obj, predicate, context) {
           var key;
           if (isArrayLike(obj)) {
             key = _.findIndex(obj, predicate, context);
           } else {
             key = _.findKey(obj, predicate, context);
           }
           if (key !== void 0 && key !== -1) return obj[key];
         };

         // Return all the elements that pass a truth test.
         // Aliased as `select`.
         _.filter = _.select = function(obj, predicate, context) {
           var results = [];
           predicate = cb(predicate, context);
           _.each(obj, function(value, index, list) {
             if (predicate(value, index, list)) results.push(value);
           });
           return results;
         };

         // Return all the elements for which a truth test fails.
         _.reject = function(obj, predicate, context) {
           return _.filter(obj, _.negate(cb(predicate)), context);
         };

         // Determine whether all of the elements match a truth test.
         // Aliased as `all`.
         _.every = _.all = function(obj, predicate, context) {
           predicate = cb(predicate, context);
           var keys = !isArrayLike(obj) && _.keys(obj),
               length = (keys || obj).length;
           for (var index = 0; index < length; index++) {
             var currentKey = keys ? keys[index] : index;
             if (!predicate(obj[currentKey], currentKey, obj)) return false;
           }
           return true;
         };

         // Determine if at least one element in the object matches a truth test.
         // Aliased as `any`.
         _.some = _.any = function(obj, predicate, context) {
           predicate = cb(predicate, context);
           var keys = !isArrayLike(obj) && _.keys(obj),
               length = (keys || obj).length;
           for (var index = 0; index < length; index++) {
             var currentKey = keys ? keys[index] : index;
             if (predicate(obj[currentKey], currentKey, obj)) return true;
           }
           return false;
         };

         // Determine if the array or object contains a given item (using `===`).
         // Aliased as `includes` and `include`.
         _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
           if (!isArrayLike(obj)) obj = _.values(obj);
           if (typeof fromIndex != 'number' || guard) fromIndex = 0;
           return _.indexOf(obj, item, fromIndex) >= 0;
         };

         // Invoke a method (with arguments) on every item in a collection.
         _.invoke = function(obj, method) {
           var args = slice.call(arguments, 2);
           var isFunc = _.isFunction(method);
           return _.map(obj, function(value) {
             var func = isFunc ? method : value[method];
             return func == null ? func : func.apply(value, args);
           });
         };

         // Convenience version of a common use case of `map`: fetching a property.
         _.pluck = function(obj, key) {
           return _.map(obj, _.property(key));
         };

         // Convenience version of a common use case of `filter`: selecting only objects
         // containing specific `key:value` pairs.
         _.where = function(obj, attrs) {
           return _.filter(obj, _.matcher(attrs));
         };

         // Convenience version of a common use case of `find`: getting the first object
         // containing specific `key:value` pairs.
         _.findWhere = function(obj, attrs) {
           return _.find(obj, _.matcher(attrs));
         };

         // Return the maximum element (or element-based computation).
         _.max = function(obj, iteratee, context) {
           var result = -Infinity, lastComputed = -Infinity,
               value, computed;
           if (iteratee == null && obj != null) {
             obj = isArrayLike(obj) ? obj : _.values(obj);
             for (var i = 0, length = obj.length; i < length; i++) {
               value = obj[i];
               if (value > result) {
                 result = value;
               }
             }
           } else {
             iteratee = cb(iteratee, context);
             _.each(obj, function(value, index, list) {
               computed = iteratee(value, index, list);
               if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                 result = value;
                 lastComputed = computed;
               }
             });
           }
           return result;
         };

         // Return the minimum element (or element-based computation).
         _.min = function(obj, iteratee, context) {
           var result = Infinity, lastComputed = Infinity,
               value, computed;
           if (iteratee == null && obj != null) {
             obj = isArrayLike(obj) ? obj : _.values(obj);
             for (var i = 0, length = obj.length; i < length; i++) {
               value = obj[i];
               if (value < result) {
                 result = value;
               }
             }
           } else {
             iteratee = cb(iteratee, context);
             _.each(obj, function(value, index, list) {
               computed = iteratee(value, index, list);
               if (computed < lastComputed || computed === Infinity && result === Infinity) {
                 result = value;
                 lastComputed = computed;
               }
             });
           }
           return result;
         };

         // Shuffle a collection, using the modern version of the
         // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
         _.shuffle = function(obj) {
           var set = isArrayLike(obj) ? obj : _.values(obj);
           var length = set.length;
           var shuffled = Array(length);
           for (var index = 0, rand; index < length; index++) {
             rand = _.random(0, index);
             if (rand !== index) shuffled[index] = shuffled[rand];
             shuffled[rand] = set[index];
           }
           return shuffled;
         };

         // Sample **n** random values from a collection.
         // If **n** is not specified, returns a single random element.
         // The internal `guard` argument allows it to work with `map`.
         _.sample = function(obj, n, guard) {
           if (n == null || guard) {
             if (!isArrayLike(obj)) obj = _.values(obj);
             return obj[_.random(obj.length - 1)];
           }
           return _.shuffle(obj).slice(0, Math.max(0, n));
         };

         // Sort the object's values by a criterion produced by an iteratee.
         _.sortBy = function(obj, iteratee, context) {
           iteratee = cb(iteratee, context);
           return _.pluck(_.map(obj, function(value, index, list) {
             return {
               value: value,
               index: index,
               criteria: iteratee(value, index, list)
             };
           }).sort(function(left, right) {
             var a = left.criteria;
             var b = right.criteria;
             if (a !== b) {
               if (a > b || a === void 0) return 1;
               if (a < b || b === void 0) return -1;
             }
             return left.index - right.index;
           }), 'value');
         };

         // An internal function used for aggregate "group by" operations.
         var group = function(behavior) {
           return function(obj, iteratee, context) {
             var result = {};
             iteratee = cb(iteratee, context);
             _.each(obj, function(value, index) {
               var key = iteratee(value, index, obj);
               behavior(result, value, key);
             });
             return result;
           };
         };

         // Groups the object's values by a criterion. Pass either a string attribute
         // to group by, or a function that returns the criterion.
         _.groupBy = group(function(result, value, key) {
           if (_.has(result, key)) result[key].push(value); else result[key] = [value];
         });

         // Indexes the object's values by a criterion, similar to `groupBy`, but for
         // when you know that your index values will be unique.
         _.indexBy = group(function(result, value, key) {
           result[key] = value;
         });

         // Counts instances of an object that group by a certain criterion. Pass
         // either a string attribute to count by, or a function that returns the
         // criterion.
         _.countBy = group(function(result, value, key) {
           if (_.has(result, key)) result[key]++; else result[key] = 1;
         });

         // Safely create a real, live array from anything iterable.
         _.toArray = function(obj) {
           if (!obj) return [];
           if (_.isArray(obj)) return slice.call(obj);
           if (isArrayLike(obj)) return _.map(obj, _.identity);
           return _.values(obj);
         };

         // Return the number of elements in an object.
         _.size = function(obj) {
           if (obj == null) return 0;
           return isArrayLike(obj) ? obj.length : _.keys(obj).length;
         };

         // Split a collection into two arrays: one whose elements all satisfy the given
         // predicate, and one whose elements all do not satisfy the predicate.
         _.partition = function(obj, predicate, context) {
           predicate = cb(predicate, context);
           var pass = [], fail = [];
           _.each(obj, function(value, key, obj) {
             (predicate(value, key, obj) ? pass : fail).push(value);
           });
           return [pass, fail];
         };

         // Array Functions
         // ---------------

         // Get the first element of an array. Passing **n** will return the first N
         // values in the array. Aliased as `head` and `take`. The **guard** check
         // allows it to work with `_.map`.
         _.first = _.head = _.take = function(array, n, guard) {
           if (array == null) return void 0;
           if (n == null || guard) return array[0];
           return _.initial(array, array.length - n);
         };

         // Returns everything but the last entry of the array. Especially useful on
         // the arguments object. Passing **n** will return all the values in
         // the array, excluding the last N.
         _.initial = function(array, n, guard) {
           return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
         };

         // Get the last element of an array. Passing **n** will return the last N
         // values in the array.
         _.last = function(array, n, guard) {
           if (array == null) return void 0;
           if (n == null || guard) return array[array.length - 1];
           return _.rest(array, Math.max(0, array.length - n));
         };

         // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
         // Especially useful on the arguments object. Passing an **n** will return
         // the rest N values in the array.
         _.rest = _.tail = _.drop = function(array, n, guard) {
           return slice.call(array, n == null || guard ? 1 : n);
         };

         // Trim out all falsy values from an array.
         _.compact = function(array) {
           return _.filter(array, _.identity);
         };

         // Internal implementation of a recursive `flatten` function.
         var flatten = function(input, shallow, strict, startIndex) {
           var output = [], idx = 0;
           for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
             var value = input[i];
             if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
               //flatten current level of array or arguments object
               if (!shallow) value = flatten(value, shallow, strict);
               var j = 0, len = value.length;
               output.length += len;
               while (j < len) {
                 output[idx++] = value[j++];
               }
             } else if (!strict) {
               output[idx++] = value;
             }
           }
           return output;
         };

         // Flatten out an array, either recursively (by default), or just one level.
         _.flatten = function(array, shallow) {
           return flatten(array, shallow, false);
         };

         // Return a version of the array that does not contain the specified value(s).
         _.without = function(array) {
           return _.difference(array, slice.call(arguments, 1));
         };

         // Produce a duplicate-free version of the array. If the array has already
         // been sorted, you have the option of using a faster algorithm.
         // Aliased as `unique`.
         _.uniq = _.unique = function(array, isSorted, iteratee, context) {
           if (!_.isBoolean(isSorted)) {
             context = iteratee;
             iteratee = isSorted;
             isSorted = false;
           }
           if (iteratee != null) iteratee = cb(iteratee, context);
           var result = [];
           var seen = [];
           for (var i = 0, length = getLength(array); i < length; i++) {
             var value = array[i],
                 computed = iteratee ? iteratee(value, i, array) : value;
             if (isSorted) {
               if (!i || seen !== computed) result.push(value);
               seen = computed;
             } else if (iteratee) {
               if (!_.contains(seen, computed)) {
                 seen.push(computed);
                 result.push(value);
               }
             } else if (!_.contains(result, value)) {
               result.push(value);
             }
           }
           return result;
         };

         // Produce an array that contains the union: each distinct element from all of
         // the passed-in arrays.
         _.union = function() {
           return _.uniq(flatten(arguments, true, true));
         };

         // Produce an array that contains every item shared between all the
         // passed-in arrays.
         _.intersection = function(array) {
           var result = [];
           var argsLength = arguments.length;
           for (var i = 0, length = getLength(array); i < length; i++) {
             var item = array[i];
             if (_.contains(result, item)) continue;
             for (var j = 1; j < argsLength; j++) {
               if (!_.contains(arguments[j], item)) break;
             }
             if (j === argsLength) result.push(item);
           }
           return result;
         };

         // Take the difference between one array and a number of other arrays.
         // Only the elements present in just the first array will remain.
         _.difference = function(array) {
           var rest = flatten(arguments, true, true, 1);
           return _.filter(array, function(value){
             return !_.contains(rest, value);
           });
         };

         // Zip together multiple lists into a single array -- elements that share
         // an index go together.
         _.zip = function() {
           return _.unzip(arguments);
         };

         // Complement of _.zip. Unzip accepts an array of arrays and groups
         // each array's elements on shared indices
         _.unzip = function(array) {
           var length = array && _.max(array, getLength).length || 0;
           var result = Array(length);

           for (var index = 0; index < length; index++) {
             result[index] = _.pluck(array, index);
           }
           return result;
         };

         // Converts lists into objects. Pass either a single array of `[key, value]`
         // pairs, or two parallel arrays of the same length -- one of keys, and one of
         // the corresponding values.
         _.object = function(list, values) {
           var result = {};
           for (var i = 0, length = getLength(list); i < length; i++) {
             if (values) {
               result[list[i]] = values[i];
             } else {
               result[list[i][0]] = list[i][1];
             }
           }
           return result;
         };

         // Generator function to create the findIndex and findLastIndex functions
         function createPredicateIndexFinder(dir) {
           return function(array, predicate, context) {
             predicate = cb(predicate, context);
             var length = getLength(array);
             var index = dir > 0 ? 0 : length - 1;
             for (; index >= 0 && index < length; index += dir) {
               if (predicate(array[index], index, array)) return index;
             }
             return -1;
           };
         }

         // Returns the first index on an array-like that passes a predicate test
         _.findIndex = createPredicateIndexFinder(1);
         _.findLastIndex = createPredicateIndexFinder(-1);

         // Use a comparator function to figure out the smallest index at which
         // an object should be inserted so as to maintain order. Uses binary search.
         _.sortedIndex = function(array, obj, iteratee, context) {
           iteratee = cb(iteratee, context, 1);
           var value = iteratee(obj);
           var low = 0, high = getLength(array);
           while (low < high) {
             var mid = Math.floor((low + high) / 2);
             if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
           }
           return low;
         };

         // Generator function to create the indexOf and lastIndexOf functions
         function createIndexFinder(dir, predicateFind, sortedIndex) {
           return function(array, item, idx) {
             var i = 0, length = getLength(array);
             if (typeof idx == 'number') {
               if (dir > 0) {
                   i = idx >= 0 ? idx : Math.max(idx + length, i);
               } else {
                   length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
               }
             } else if (sortedIndex && idx && length) {
               idx = sortedIndex(array, item);
               return array[idx] === item ? idx : -1;
             }
             if (item !== item) {
               idx = predicateFind(slice.call(array, i, length), _.isNaN);
               return idx >= 0 ? idx + i : -1;
             }
             for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
               if (array[idx] === item) return idx;
             }
             return -1;
           };
         }

         // Return the position of the first occurrence of an item in an array,
         // or -1 if the item is not included in the array.
         // If the array is large and already in sort order, pass `true`
         // for **isSorted** to use binary search.
         _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
         _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

         // Generate an integer Array containing an arithmetic progression. A port of
         // the native Python `range()` function. See
         // [the Python documentation](http://docs.python.org/library/functions.html#range).
         _.range = function(start, stop, step) {
           if (stop == null) {
             stop = start || 0;
             start = 0;
           }
           step = step || 1;

           var length = Math.max(Math.ceil((stop - start) / step), 0);
           var range = Array(length);

           for (var idx = 0; idx < length; idx++, start += step) {
             range[idx] = start;
           }

           return range;
         };

         // Function (ahem) Functions
         // ------------------

         // Determines whether to execute a function as a constructor
         // or a normal function with the provided arguments
         var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
           if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
           var self = baseCreate(sourceFunc.prototype);
           var result = sourceFunc.apply(self, args);
           if (_.isObject(result)) return result;
           return self;
         };

         // Create a function bound to a given object (assigning `this`, and arguments,
         // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
         // available.
         _.bind = function(func, context) {
           if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
           if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
           var args = slice.call(arguments, 2);
           var bound = function() {
             return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
           };
           return bound;
         };

         // Partially apply a function by creating a version that has had some of its
         // arguments pre-filled, without changing its dynamic `this` context. _ acts
         // as a placeholder, allowing any combination of arguments to be pre-filled.
         _.partial = function(func) {
           var boundArgs = slice.call(arguments, 1);
           var bound = function() {
             var position = 0, length = boundArgs.length;
             var args = Array(length);
             for (var i = 0; i < length; i++) {
               args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
             }
             while (position < arguments.length) args.push(arguments[position++]);
             return executeBound(func, bound, this, this, args);
           };
           return bound;
         };

         // Bind a number of an object's methods to that object. Remaining arguments
         // are the method names to be bound. Useful for ensuring that all callbacks
         // defined on an object belong to it.
         _.bindAll = function(obj) {
           var i, length = arguments.length, key;
           if (length <= 1) throw new Error('bindAll must be passed function names');
           for (i = 1; i < length; i++) {
             key = arguments[i];
             obj[key] = _.bind(obj[key], obj);
           }
           return obj;
         };

         // Memoize an expensive function by storing its results.
         _.memoize = function(func, hasher) {
           var memoize = function(key) {
             var cache = memoize.cache;
             var address = '' + (hasher ? hasher.apply(this, arguments) : key);
             if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
             return cache[address];
           };
           memoize.cache = {};
           return memoize;
         };

         // Delays a function for the given number of milliseconds, and then calls
         // it with the arguments supplied.
         _.delay = function(func, wait) {
           var args = slice.call(arguments, 2);
           return setTimeout(function(){
             return func.apply(null, args);
           }, wait);
         };

         // Defers a function, scheduling it to run after the current call stack has
         // cleared.
         _.defer = _.partial(_.delay, _, 1);

         // Returns a function, that, when invoked, will only be triggered at most once
         // during a given window of time. Normally, the throttled function will run
         // as much as it can, without ever going more than once per `wait` duration;
         // but if you'd like to disable the execution on the leading edge, pass
         // `{leading: false}`. To disable execution on the trailing edge, ditto.
         _.throttle = function(func, wait, options) {
           var context, args, result;
           var timeout = null;
           var previous = 0;
           if (!options) options = {};
           var later = function() {
             previous = options.leading === false ? 0 : _.now();
             timeout = null;
             result = func.apply(context, args);
             if (!timeout) context = args = null;
           };
           return function() {
             var now = _.now();
             if (!previous && options.leading === false) previous = now;
             var remaining = wait - (now - previous);
             context = this;
             args = arguments;
             if (remaining <= 0 || remaining > wait) {
               if (timeout) {
                 clearTimeout(timeout);
                 timeout = null;
               }
               previous = now;
               result = func.apply(context, args);
               if (!timeout) context = args = null;
             } else if (!timeout && options.trailing !== false) {
               timeout = setTimeout(later, remaining);
             }
             return result;
           };
         };

         // Returns a function, that, as long as it continues to be invoked, will not
         // be triggered. The function will be called after it stops being called for
         // N milliseconds. If `immediate` is passed, trigger the function on the
         // leading edge, instead of the trailing.
         _.debounce = function(func, wait, immediate) {
           var timeout, args, context, timestamp, result;

           var later = function() {
             var last = _.now() - timestamp;

             if (last < wait && last >= 0) {
               timeout = setTimeout(later, wait - last);
             } else {
               timeout = null;
               if (!immediate) {
                 result = func.apply(context, args);
                 if (!timeout) context = args = null;
               }
             }
           };

           return function() {
             context = this;
             args = arguments;
             timestamp = _.now();
             var callNow = immediate && !timeout;
             if (!timeout) timeout = setTimeout(later, wait);
             if (callNow) {
               result = func.apply(context, args);
               context = args = null;
             }

             return result;
           };
         };

         // Returns the first function passed as an argument to the second,
         // allowing you to adjust arguments, run code before and after, and
         // conditionally execute the original function.
         _.wrap = function(func, wrapper) {
           return _.partial(wrapper, func);
         };

         // Returns a negated version of the passed-in predicate.
         _.negate = function(predicate) {
           return function() {
             return !predicate.apply(this, arguments);
           };
         };

         // Returns a function that is the composition of a list of functions, each
         // consuming the return value of the function that follows.
         _.compose = function() {
           var args = arguments;
           var start = args.length - 1;
           return function() {
             var i = start;
             var result = args[start].apply(this, arguments);
             while (i--) result = args[i].call(this, result);
             return result;
           };
         };

         // Returns a function that will only be executed on and after the Nth call.
         _.after = function(times, func) {
           return function() {
             if (--times < 1) {
               return func.apply(this, arguments);
             }
           };
         };

         // Returns a function that will only be executed up to (but not including) the Nth call.
         _.before = function(times, func) {
           var memo;
           return function() {
             if (--times > 0) {
               memo = func.apply(this, arguments);
             }
             if (times <= 1) func = null;
             return memo;
           };
         };

         // Returns a function that will be executed at most one time, no matter how
         // often you call it. Useful for lazy initialization.
         _.once = _.partial(_.before, 2);

         // Object Functions
         // ----------------

         // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
         var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
         var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                             'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

         function collectNonEnumProps(obj, keys) {
           var nonEnumIdx = nonEnumerableProps.length;
           var constructor = obj.constructor;
           var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

           // Constructor is a special case.
           var prop = 'constructor';
           if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

           while (nonEnumIdx--) {
             prop = nonEnumerableProps[nonEnumIdx];
             if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
               keys.push(prop);
             }
           }
         }

         // Retrieve the names of an object's own properties.
         // Delegates to **ECMAScript 5**'s native `Object.keys`
         _.keys = function(obj) {
           if (!_.isObject(obj)) return [];
           if (nativeKeys) return nativeKeys(obj);
           var keys = [];
           for (var key in obj) if (_.has(obj, key)) keys.push(key);
           // Ahem, IE < 9.
           if (hasEnumBug) collectNonEnumProps(obj, keys);
           return keys;
         };

         // Retrieve all the property names of an object.
         _.allKeys = function(obj) {
           if (!_.isObject(obj)) return [];
           var keys = [];
           for (var key in obj) keys.push(key);
           // Ahem, IE < 9.
           if (hasEnumBug) collectNonEnumProps(obj, keys);
           return keys;
         };

         // Retrieve the values of an object's properties.
         _.values = function(obj) {
           var keys = _.keys(obj);
           var length = keys.length;
           var values = Array(length);
           for (var i = 0; i < length; i++) {
             values[i] = obj[keys[i]];
           }
           return values;
         };

         // Returns the results of applying the iteratee to each element of the object
         // In contrast to _.map it returns an object
         _.mapObject = function(obj, iteratee, context) {
           iteratee = cb(iteratee, context);
           var keys =  _.keys(obj),
                 length = keys.length,
                 results = {},
                 currentKey;
             for (var index = 0; index < length; index++) {
               currentKey = keys[index];
               results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
             }
             return results;
         };

         // Convert an object into a list of `[key, value]` pairs.
         _.pairs = function(obj) {
           var keys = _.keys(obj);
           var length = keys.length;
           var pairs = Array(length);
           for (var i = 0; i < length; i++) {
             pairs[i] = [keys[i], obj[keys[i]]];
           }
           return pairs;
         };

         // Invert the keys and values of an object. The values must be serializable.
         _.invert = function(obj) {
           var result = {};
           var keys = _.keys(obj);
           for (var i = 0, length = keys.length; i < length; i++) {
             result[obj[keys[i]]] = keys[i];
           }
           return result;
         };

         // Return a sorted list of the function names available on the object.
         // Aliased as `methods`
         _.functions = _.methods = function(obj) {
           var names = [];
           for (var key in obj) {
             if (_.isFunction(obj[key])) names.push(key);
           }
           return names.sort();
         };

         // Extend a given object with all the properties in passed-in object(s).
         _.extend = createAssigner(_.allKeys);

         // Assigns a given object with all the own properties in the passed-in object(s)
         // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
         _.extendOwn = _.assign = createAssigner(_.keys);

         // Returns the first key on an object that passes a predicate test
         _.findKey = function(obj, predicate, context) {
           predicate = cb(predicate, context);
           var keys = _.keys(obj), key;
           for (var i = 0, length = keys.length; i < length; i++) {
             key = keys[i];
             if (predicate(obj[key], key, obj)) return key;
           }
         };

         // Return a copy of the object only containing the whitelisted properties.
         _.pick = function(object, oiteratee, context) {
           var result = {}, obj = object, iteratee, keys;
           if (obj == null) return result;
           if (_.isFunction(oiteratee)) {
             keys = _.allKeys(obj);
             iteratee = optimizeCb(oiteratee, context);
           } else {
             keys = flatten(arguments, false, false, 1);
             iteratee = function(value, key, obj) { return key in obj; };
             obj = Object(obj);
           }
           for (var i = 0, length = keys.length; i < length; i++) {
             var key = keys[i];
             var value = obj[key];
             if (iteratee(value, key, obj)) result[key] = value;
           }
           return result;
         };

          // Return a copy of the object without the blacklisted properties.
         _.omit = function(obj, iteratee, context) {
           if (_.isFunction(iteratee)) {
             iteratee = _.negate(iteratee);
           } else {
             var keys = _.map(flatten(arguments, false, false, 1), String);
             iteratee = function(value, key) {
               return !_.contains(keys, key);
             };
           }
           return _.pick(obj, iteratee, context);
         };

         // Fill in a given object with default properties.
         _.defaults = createAssigner(_.allKeys, true);

         // Creates an object that inherits from the given prototype object.
         // If additional properties are provided then they will be added to the
         // created object.
         _.create = function(prototype, props) {
           var result = baseCreate(prototype);
           if (props) _.extendOwn(result, props);
           return result;
         };

         // Create a (shallow-cloned) duplicate of an object.
         _.clone = function(obj) {
           if (!_.isObject(obj)) return obj;
           return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
         };

         // Invokes interceptor with the obj, and then returns obj.
         // The primary purpose of this method is to "tap into" a method chain, in
         // order to perform operations on intermediate results within the chain.
         _.tap = function(obj, interceptor) {
           interceptor(obj);
           return obj;
         };

         // Returns whether an object has a given set of `key:value` pairs.
         _.isMatch = function(object, attrs) {
           var keys = _.keys(attrs), length = keys.length;
           if (object == null) return !length;
           var obj = Object(object);
           for (var i = 0; i < length; i++) {
             var key = keys[i];
             if (attrs[key] !== obj[key] || !(key in obj)) return false;
           }
           return true;
         };


         // Internal recursive comparison function for `isEqual`.
         var eq = function(a, b, aStack, bStack) {
           // Identical objects are equal. `0 === -0`, but they aren't identical.
           // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
           if (a === b) return a !== 0 || 1 / a === 1 / b;
           // A strict comparison is necessary because `null == undefined`.
           if (a == null || b == null) return a === b;
           // Unwrap any wrapped objects.
           if (a instanceof _) a = a._wrapped;
           if (b instanceof _) b = b._wrapped;
           // Compare `[[Class]]` names.
           var className = toString.call(a);
           if (className !== toString.call(b)) return false;
           switch (className) {
             // Strings, numbers, regular expressions, dates, and booleans are compared by value.
             case '[object RegExp]':
             // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
             case '[object String]':
               // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
               // equivalent to `new String("5")`.
               return '' + a === '' + b;
             case '[object Number]':
               // `NaN`s are equivalent, but non-reflexive.
               // Object(NaN) is equivalent to NaN
               if (+a !== +a) return +b !== +b;
               // An `egal` comparison is performed for other numeric values.
               return +a === 0 ? 1 / +a === 1 / b : +a === +b;
             case '[object Date]':
             case '[object Boolean]':
               // Coerce dates and booleans to numeric primitive values. Dates are compared by their
               // millisecond representations. Note that invalid dates with millisecond representations
               // of `NaN` are not equivalent.
               return +a === +b;
           }

           var areArrays = className === '[object Array]';
           if (!areArrays) {
             if (typeof a != 'object' || typeof b != 'object') return false;

             // Objects with different constructors are not equivalent, but `Object`s or `Array`s
             // from different frames are.
             var aCtor = a.constructor, bCtor = b.constructor;
             if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                                      _.isFunction(bCtor) && bCtor instanceof bCtor)
                                 && ('constructor' in a && 'constructor' in b)) {
               return false;
             }
           }
           // Assume equality for cyclic structures. The algorithm for detecting cyclic
           // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

           // Initializing stack of traversed objects.
           // It's done here since we only need them for objects and arrays comparison.
           aStack = aStack || [];
           bStack = bStack || [];
           var length = aStack.length;
           while (length--) {
             // Linear search. Performance is inversely proportional to the number of
             // unique nested structures.
             if (aStack[length] === a) return bStack[length] === b;
           }

           // Add the first object to the stack of traversed objects.
           aStack.push(a);
           bStack.push(b);

           // Recursively compare objects and arrays.
           if (areArrays) {
             // Compare array lengths to determine if a deep comparison is necessary.
             length = a.length;
             if (length !== b.length) return false;
             // Deep compare the contents, ignoring non-numeric properties.
             while (length--) {
               if (!eq(a[length], b[length], aStack, bStack)) return false;
             }
           } else {
             // Deep compare objects.
             var keys = _.keys(a), key;
             length = keys.length;
             // Ensure that both objects contain the same number of properties before comparing deep equality.
             if (_.keys(b).length !== length) return false;
             while (length--) {
               // Deep compare each member
               key = keys[length];
               if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
             }
           }
           // Remove the first object from the stack of traversed objects.
           aStack.pop();
           bStack.pop();
           return true;
         };

         // Perform a deep comparison to check if two objects are equal.
         _.isEqual = function(a, b) {
           return eq(a, b);
         };

         // Is a given array, string, or object empty?
         // An "empty" object has no enumerable own-properties.
         _.isEmpty = function(obj) {
           if (obj == null) return true;
           if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
           return _.keys(obj).length === 0;
         };

         // Is a given value a DOM element?
         _.isElement = function(obj) {
           return !!(obj && obj.nodeType === 1);
         };

         // Is a given value an array?
         // Delegates to ECMA5's native Array.isArray
         _.isArray = nativeIsArray || function(obj) {
           return toString.call(obj) === '[object Array]';
         };

         // Is a given variable an object?
         _.isObject = function(obj) {
           var type = typeof obj;
           return type === 'function' || type === 'object' && !!obj;
         };

         // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
         _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
           _['is' + name] = function(obj) {
             return toString.call(obj) === '[object ' + name + ']';
           };
         });

         // Define a fallback version of the method in browsers (ahem, IE < 9), where
         // there isn't any inspectable "Arguments" type.
         if (!_.isArguments(arguments)) {
           _.isArguments = function(obj) {
             return _.has(obj, 'callee');
           };
         }

         // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
         // IE 11 (#1621), and in Safari 8 (#1929).
         if (typeof Int8Array != 'object') {
           _.isFunction = function(obj) {
             return typeof obj == 'function' || false;
           };
         }

         // Is a given object a finite number?
         _.isFinite = function(obj) {
           return isFinite(obj) && !isNaN(parseFloat(obj));
         };

         // Is the given value `NaN`? (NaN is the only number which does not equal itself).
         _.isNaN = function(obj) {
           return _.isNumber(obj) && obj !== +obj;
         };

         // Is a given value a boolean?
         _.isBoolean = function(obj) {
           return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
         };

         // Is a given value equal to null?
         _.isNull = function(obj) {
           return obj === null;
         };

         // Is a given variable undefined?
         _.isUndefined = function(obj) {
           return obj === void 0;
         };

         // Shortcut function for checking if an object has a given property directly
         // on itself (in other words, not on a prototype).
         _.has = function(obj, key) {
           return obj != null && hasOwnProperty.call(obj, key);
         };

         // Utility Functions
         // -----------------

         // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
         // previous owner. Returns a reference to the Underscore object.
         _.noConflict = function() {
           root._ = previousUnderscore;
           return this;
         };

         // Keep the identity function around for default iteratees.
         _.identity = function(value) {
           return value;
         };

         // Predicate-generating functions. Often useful outside of Underscore.
         _.constant = function(value) {
           return function() {
             return value;
           };
         };

         _.noop = function(){};

         _.property = property;

         // Generates a function for a given object that returns a given property.
         _.propertyOf = function(obj) {
           return obj == null ? function(){} : function(key) {
             return obj[key];
           };
         };

         // Returns a predicate for checking whether an object has a given set of
         // `key:value` pairs.
         _.matcher = _.matches = function(attrs) {
           attrs = _.extendOwn({}, attrs);
           return function(obj) {
             return _.isMatch(obj, attrs);
           };
         };

         // Run a function **n** times.
         _.times = function(n, iteratee, context) {
           var accum = Array(Math.max(0, n));
           iteratee = optimizeCb(iteratee, context, 1);
           for (var i = 0; i < n; i++) accum[i] = iteratee(i);
           return accum;
         };

         // Return a random integer between min and max (inclusive).
         _.random = function(min, max) {
           if (max == null) {
             max = min;
             min = 0;
           }
           return min + Math.floor(Math.random() * (max - min + 1));
         };

         // A (possibly faster) way to get the current timestamp as an integer.
         _.now = Date.now || function() {
           return new Date().getTime();
         };

          // List of HTML entities for escaping.
         var escapeMap = {
           '&': '&amp;',
           '<': '&lt;',
           '>': '&gt;',
           '"': '&quot;',
           "'": '&#x27;',
           '`': '&#x60;'
         };
         var unescapeMap = _.invert(escapeMap);

         // Functions for escaping and unescaping strings to/from HTML interpolation.
         var createEscaper = function(map) {
           var escaper = function(match) {
             return map[match];
           };
           // Regexes for identifying a key that needs to be escaped
           var source = '(?:' + _.keys(map).join('|') + ')';
           var testRegexp = RegExp(source);
           var replaceRegexp = RegExp(source, 'g');
           return function(string) {
             string = string == null ? '' : '' + string;
             return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
           };
         };
         _.escape = createEscaper(escapeMap);
         _.unescape = createEscaper(unescapeMap);

         // If the value of the named `property` is a function then invoke it with the
         // `object` as context; otherwise, return it.
         _.result = function(object, property, fallback) {
           var value = object == null ? void 0 : object[property];
           if (value === void 0) {
             value = fallback;
           }
           return _.isFunction(value) ? value.call(object) : value;
         };

         // Generate a unique integer id (unique within the entire client session).
         // Useful for temporary DOM ids.
         var idCounter = 0;
         _.uniqueId = function(prefix) {
           var id = ++idCounter + '';
           return prefix ? prefix + id : id;
         };

         // By default, Underscore uses ERB-style template delimiters, change the
         // following template settings to use alternative delimiters.
         _.templateSettings = {
           evaluate    : /<%([\s\S]+?)%>/g,
           interpolate : /<%=([\s\S]+?)%>/g,
           escape      : /<%-([\s\S]+?)%>/g
         };

         // When customizing `templateSettings`, if you don't want to define an
         // interpolation, evaluation or escaping regex, we need one that is
         // guaranteed not to match.
         var noMatch = /(.)^/;

         // Certain characters need to be escaped so that they can be put into a
         // string literal.
         var escapes = {
           "'":      "'",
           '\\':     '\\',
           '\r':     'r',
           '\n':     'n',
           '\u2028': 'u2028',
           '\u2029': 'u2029'
         };

         var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

         var escapeChar = function(match) {
           return '\\' + escapes[match];
         };

         // JavaScript micro-templating, similar to John Resig's implementation.
         // Underscore templating handles arbitrary delimiters, preserves whitespace,
         // and correctly escapes quotes within interpolated code.
         // NB: `oldSettings` only exists for backwards compatibility.
         _.template = function(text, settings, oldSettings) {
           if (!settings && oldSettings) settings = oldSettings;
           settings = _.defaults({}, settings, _.templateSettings);

           // Combine delimiters into one regular expression via alternation.
           var matcher = RegExp([
             (settings.escape || noMatch).source,
             (settings.interpolate || noMatch).source,
             (settings.evaluate || noMatch).source
           ].join('|') + '|$', 'g');

           // Compile the template source, escaping string literals appropriately.
           var index = 0;
           var source = "__p+='";
           text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
             source += text.slice(index, offset).replace(escaper, escapeChar);
             index = offset + match.length;

             if (escape) {
               source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
             } else if (interpolate) {
               source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
             } else if (evaluate) {
               source += "';\n" + evaluate + "\n__p+='";
             }

             // Adobe VMs need the match returned to produce the correct offest.
             return match;
           });
           source += "';\n";

           // If a variable is not specified, place data values in local scope.
           if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

           source = "var __t,__p='',__j=Array.prototype.join," +
             "print=function(){__p+=__j.call(arguments,'');};\n" +
             source + 'return __p;\n';

           try {
             var render = new Function(settings.variable || 'obj', '_', source);
           } catch (e) {
             e.source = source;
             throw e;
           }

           var template = function(data) {
             return render.call(this, data, _);
           };

           // Provide the compiled source as a convenience for precompilation.
           var argument = settings.variable || 'obj';
           template.source = 'function(' + argument + '){\n' + source + '}';

           return template;
         };

         // Add a "chain" function. Start chaining a wrapped Underscore object.
         _.chain = function(obj) {
           var instance = _(obj);
           instance._chain = true;
           return instance;
         };

         // OOP
         // ---------------
         // If Underscore is called as a function, it returns a wrapped object that
         // can be used OO-style. This wrapper holds altered versions of all the
         // underscore functions. Wrapped objects may be chained.

         // Helper function to continue chaining intermediate results.
         var result = function(instance, obj) {
           return instance._chain ? _(obj).chain() : obj;
         };

         // Add your own custom functions to the Underscore object.
         _.mixin = function(obj) {
           _.each(_.functions(obj), function(name) {
             var func = _[name] = obj[name];
             _.prototype[name] = function() {
               var args = [this._wrapped];
               push.apply(args, arguments);
               return result(this, func.apply(_, args));
             };
           });
         };

         // Add all of the Underscore functions to the wrapper object.
         _.mixin(_);

         // Add all mutator Array functions to the wrapper.
         _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
           var method = ArrayProto[name];
           _.prototype[name] = function() {
             var obj = this._wrapped;
             method.apply(obj, arguments);
             if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
             return result(this, obj);
           };
         });

         // Add all accessor Array functions to the wrapper.
         _.each(['concat', 'join', 'slice'], function(name) {
           var method = ArrayProto[name];
           _.prototype[name] = function() {
             return result(this, method.apply(this._wrapped, arguments));
           };
         });

         // Extracts the result from a wrapped and chained object.
         _.prototype.value = function() {
           return this._wrapped;
         };

         // Provide unwrapping proxy for some methods used in engine operations
         // such as arithmetic and JSON stringification.
         _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

         _.prototype.toString = function() {
           return '' + this._wrapped;
         };

         // AMD registration happens at the end for compatibility with AMD loaders
         // that may not enforce next-turn semantics on modules. Even though general
         // practice for AMD registration is to be anonymous, underscore registers
         // as a named module because, like jQuery, it is a base library that is
         // popular enough to be bundled in a third party lib, but not be part of
         // an AMD load request. Those cases could generate an error when an
         // anonymous define() is called outside of a loader request.
         if (typeof undefined === 'function' && undefined.amd) {
           undefined('underscore', [], function() {
             return _;
           });
         }
       }.call(commonjsGlobal));
       });
       var underscore_1 = underscore._;

       var bn = createCommonjsModule(function (module) {
       (function (module, exports) {

         // Utils
         function assert (val, msg) {
           if (!val) throw new Error(msg || 'Assertion failed');
         }

         // Could use `inherits` module, but don't want to move from single file
         // architecture yet.
         function inherits (ctor, superCtor) {
           ctor.super_ = superCtor;
           var TempCtor = function () {};
           TempCtor.prototype = superCtor.prototype;
           ctor.prototype = new TempCtor();
           ctor.prototype.constructor = ctor;
         }

         // BN

         function BN (number, base, endian) {
           if (BN.isBN(number)) {
             return number;
           }

           this.negative = 0;
           this.words = null;
           this.length = 0;

           // Reduction context
           this.red = null;

           if (number !== null) {
             if (base === 'le' || base === 'be') {
               endian = base;
               base = 10;
             }

             this._init(number || 0, base || 10, endian || 'be');
           }
         }
         if (typeof module === 'object') {
           module.exports = BN;
         } else {
           exports.BN = BN;
         }

         BN.BN = BN;
         BN.wordSize = 26;

         var Buffer;
         try {
           Buffer = commonjsRequire('buf' + 'fer').Buffer;
         } catch (e) {
         }

         BN.isBN = function isBN (num) {
           if (num instanceof BN) {
             return true;
           }

           return num !== null && typeof num === 'object' &&
             num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
         };

         BN.max = function max (left, right) {
           if (left.cmp(right) > 0) return left;
           return right;
         };

         BN.min = function min (left, right) {
           if (left.cmp(right) < 0) return left;
           return right;
         };

         BN.prototype._init = function init (number, base, endian) {
           if (typeof number === 'number') {
             return this._initNumber(number, base, endian);
           }

           if (typeof number === 'object') {
             return this._initArray(number, base, endian);
           }

           if (base === 'hex') {
             base = 16;
           }
           assert(base === (base | 0) && base >= 2 && base <= 36);

           number = number.toString().replace(/\s+/g, '');
           var start = 0;
           if (number[0] === '-') {
             start++;
           }

           if (base === 16) {
             this._parseHex(number, start);
           } else {
             this._parseBase(number, base, start);
           }

           if (number[0] === '-') {
             this.negative = 1;
           }

           this.strip();

           if (endian !== 'le') return;

           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initNumber = function _initNumber (number, base, endian) {
           if (number < 0) {
             this.negative = 1;
             number = -number;
           }
           if (number < 0x4000000) {
             this.words = [ number & 0x3ffffff ];
             this.length = 1;
           } else if (number < 0x10000000000000) {
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff
             ];
             this.length = 2;
           } else {
             assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff,
               1
             ];
             this.length = 3;
           }

           if (endian !== 'le') return;

           // Reverse the bytes
           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initArray = function _initArray (number, base, endian) {
           // Perhaps a Uint8Array
           assert(typeof number.length === 'number');
           if (number.length <= 0) {
             this.words = [ 0 ];
             this.length = 1;
             return this;
           }

           this.length = Math.ceil(number.length / 3);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           var off = 0;
           if (endian === 'be') {
             for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
               w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           } else if (endian === 'le') {
             for (i = 0, j = 0; i < number.length; i += 3) {
               w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           }
           return this.strip();
         };

         function parseHex (str, start, end) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r <<= 4;

             // 'a' - 'f'
             if (c >= 49 && c <= 54) {
               r |= c - 49 + 0xa;

             // 'A' - 'F'
             } else if (c >= 17 && c <= 22) {
               r |= c - 17 + 0xa;

             // '0' - '9'
             } else {
               r |= c & 0xf;
             }
           }
           return r;
         }

         BN.prototype._parseHex = function _parseHex (number, start) {
           // Create possibly bigger array to ensure that it fits the number
           this.length = Math.ceil((number.length - start) / 6);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           // Scan 24-bit chunks and add them to the number
           var off = 0;
           for (i = number.length - 6, j = 0; i >= start; i -= 6) {
             w = parseHex(number, i, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
             off += 24;
             if (off >= 26) {
               off -= 26;
               j++;
             }
           }
           if (i + 6 !== start) {
             w = parseHex(number, start, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
           }
           this.strip();
         };

         function parseBase (str, start, end, mul) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r *= mul;

             // 'a'
             if (c >= 49) {
               r += c - 49 + 0xa;

             // 'A'
             } else if (c >= 17) {
               r += c - 17 + 0xa;

             // '0' - '9'
             } else {
               r += c;
             }
           }
           return r;
         }

         BN.prototype._parseBase = function _parseBase (number, base, start) {
           // Initialize as zero
           this.words = [ 0 ];
           this.length = 1;

           // Find length of limb in base
           for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
             limbLen++;
           }
           limbLen--;
           limbPow = (limbPow / base) | 0;

           var total = number.length - start;
           var mod = total % limbLen;
           var end = Math.min(total, total - mod) + start;

           var word = 0;
           for (var i = start; i < end; i += limbLen) {
             word = parseBase(number, i, i + limbLen, base);

             this.imuln(limbPow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }

           if (mod !== 0) {
             var pow = 1;
             word = parseBase(number, i, number.length, base);

             for (i = 0; i < mod; i++) {
               pow *= base;
             }

             this.imuln(pow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }
         };

         BN.prototype.copy = function copy (dest) {
           dest.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             dest.words[i] = this.words[i];
           }
           dest.length = this.length;
           dest.negative = this.negative;
           dest.red = this.red;
         };

         BN.prototype.clone = function clone () {
           var r = new BN(null);
           this.copy(r);
           return r;
         };

         BN.prototype._expand = function _expand (size) {
           while (this.length < size) {
             this.words[this.length++] = 0;
           }
           return this;
         };

         // Remove leading `0` from `this`
         BN.prototype.strip = function strip () {
           while (this.length > 1 && this.words[this.length - 1] === 0) {
             this.length--;
           }
           return this._normSign();
         };

         BN.prototype._normSign = function _normSign () {
           // -0 = 0
           if (this.length === 1 && this.words[0] === 0) {
             this.negative = 0;
           }
           return this;
         };

         BN.prototype.inspect = function inspect () {
           return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
         };

         /*

         var zeros = [];
         var groupSizes = [];
         var groupBases = [];

         var s = '';
         var i = -1;
         while (++i < BN.wordSize) {
           zeros[i] = s;
           s += '0';
         }
         groupSizes[0] = 0;
         groupSizes[1] = 0;
         groupBases[0] = 0;
         groupBases[1] = 0;
         var base = 2 - 1;
         while (++base < 36 + 1) {
           var groupSize = 0;
           var groupBase = 1;
           while (groupBase < (1 << BN.wordSize) / base) {
             groupBase *= base;
             groupSize += 1;
           }
           groupSizes[base] = groupSize;
           groupBases[base] = groupBase;
         }

         */

         var zeros = [
           '',
           '0',
           '00',
           '000',
           '0000',
           '00000',
           '000000',
           '0000000',
           '00000000',
           '000000000',
           '0000000000',
           '00000000000',
           '000000000000',
           '0000000000000',
           '00000000000000',
           '000000000000000',
           '0000000000000000',
           '00000000000000000',
           '000000000000000000',
           '0000000000000000000',
           '00000000000000000000',
           '000000000000000000000',
           '0000000000000000000000',
           '00000000000000000000000',
           '000000000000000000000000',
           '0000000000000000000000000'
         ];

         var groupSizes = [
           0, 0,
           25, 16, 12, 11, 10, 9, 8,
           8, 7, 7, 7, 7, 6, 6,
           6, 6, 6, 6, 6, 5, 5,
           5, 5, 5, 5, 5, 5, 5,
           5, 5, 5, 5, 5, 5, 5
         ];

         var groupBases = [
           0, 0,
           33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
           43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
           16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
           6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
           24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
         ];

         BN.prototype.toString = function toString (base, padding) {
           base = base || 10;
           padding = padding | 0 || 1;

           var out;
           if (base === 16 || base === 'hex') {
             out = '';
             var off = 0;
             var carry = 0;
             for (var i = 0; i < this.length; i++) {
               var w = this.words[i];
               var word = (((w << off) | carry) & 0xffffff).toString(16);
               carry = (w >>> (24 - off)) & 0xffffff;
               if (carry !== 0 || i !== this.length - 1) {
                 out = zeros[6 - word.length] + word + out;
               } else {
                 out = word + out;
               }
               off += 2;
               if (off >= 26) {
                 off -= 26;
                 i--;
               }
             }
             if (carry !== 0) {
               out = carry.toString(16) + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           if (base === (base | 0) && base >= 2 && base <= 36) {
             // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
             var groupSize = groupSizes[base];
             // var groupBase = Math.pow(base, groupSize);
             var groupBase = groupBases[base];
             out = '';
             var c = this.clone();
             c.negative = 0;
             while (!c.isZero()) {
               var r = c.modn(groupBase).toString(base);
               c = c.idivn(groupBase);

               if (!c.isZero()) {
                 out = zeros[groupSize - r.length] + r + out;
               } else {
                 out = r + out;
               }
             }
             if (this.isZero()) {
               out = '0' + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           assert(false, 'Base should be between 2 and 36');
         };

         BN.prototype.toNumber = function toNumber () {
           var ret = this.words[0];
           if (this.length === 2) {
             ret += this.words[1] * 0x4000000;
           } else if (this.length === 3 && this.words[2] === 0x01) {
             // NOTE: at this stage it is known that the top bit is set
             ret += 0x10000000000000 + (this.words[1] * 0x4000000);
           } else if (this.length > 2) {
             assert(false, 'Number can only safely store up to 53 bits');
           }
           return (this.negative !== 0) ? -ret : ret;
         };

         BN.prototype.toJSON = function toJSON () {
           return this.toString(16);
         };

         BN.prototype.toBuffer = function toBuffer (endian, length) {
           assert(typeof Buffer !== 'undefined');
           return this.toArrayLike(Buffer, endian, length);
         };

         BN.prototype.toArray = function toArray (endian, length) {
           return this.toArrayLike(Array, endian, length);
         };

         BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
           var byteLength = this.byteLength();
           var reqLength = length || Math.max(1, byteLength);
           assert(byteLength <= reqLength, 'byte array longer than desired length');
           assert(reqLength > 0, 'Requested array length <= 0');

           this.strip();
           var littleEndian = endian === 'le';
           var res = new ArrayType(reqLength);

           var b, i;
           var q = this.clone();
           if (!littleEndian) {
             // Assume big-endian
             for (i = 0; i < reqLength - byteLength; i++) {
               res[i] = 0;
             }

             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[reqLength - i - 1] = b;
             }
           } else {
             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[i] = b;
             }

             for (; i < reqLength; i++) {
               res[i] = 0;
             }
           }

           return res;
         };

         if (Math.clz32) {
           BN.prototype._countBits = function _countBits (w) {
             return 32 - Math.clz32(w);
           };
         } else {
           BN.prototype._countBits = function _countBits (w) {
             var t = w;
             var r = 0;
             if (t >= 0x1000) {
               r += 13;
               t >>>= 13;
             }
             if (t >= 0x40) {
               r += 7;
               t >>>= 7;
             }
             if (t >= 0x8) {
               r += 4;
               t >>>= 4;
             }
             if (t >= 0x02) {
               r += 2;
               t >>>= 2;
             }
             return r + t;
           };
         }

         BN.prototype._zeroBits = function _zeroBits (w) {
           // Short-cut
           if (w === 0) return 26;

           var t = w;
           var r = 0;
           if ((t & 0x1fff) === 0) {
             r += 13;
             t >>>= 13;
           }
           if ((t & 0x7f) === 0) {
             r += 7;
             t >>>= 7;
           }
           if ((t & 0xf) === 0) {
             r += 4;
             t >>>= 4;
           }
           if ((t & 0x3) === 0) {
             r += 2;
             t >>>= 2;
           }
           if ((t & 0x1) === 0) {
             r++;
           }
           return r;
         };

         // Return number of used bits in a BN
         BN.prototype.bitLength = function bitLength () {
           var w = this.words[this.length - 1];
           var hi = this._countBits(w);
           return (this.length - 1) * 26 + hi;
         };

         function toBitArray (num) {
           var w = new Array(num.bitLength());

           for (var bit = 0; bit < w.length; bit++) {
             var off = (bit / 26) | 0;
             var wbit = bit % 26;

             w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
           }

           return w;
         }

         // Number of trailing zero bits
         BN.prototype.zeroBits = function zeroBits () {
           if (this.isZero()) return 0;

           var r = 0;
           for (var i = 0; i < this.length; i++) {
             var b = this._zeroBits(this.words[i]);
             r += b;
             if (b !== 26) break;
           }
           return r;
         };

         BN.prototype.byteLength = function byteLength () {
           return Math.ceil(this.bitLength() / 8);
         };

         BN.prototype.toTwos = function toTwos (width) {
           if (this.negative !== 0) {
             return this.abs().inotn(width).iaddn(1);
           }
           return this.clone();
         };

         BN.prototype.fromTwos = function fromTwos (width) {
           if (this.testn(width - 1)) {
             return this.notn(width).iaddn(1).ineg();
           }
           return this.clone();
         };

         BN.prototype.isNeg = function isNeg () {
           return this.negative !== 0;
         };

         // Return negative clone of `this`
         BN.prototype.neg = function neg () {
           return this.clone().ineg();
         };

         BN.prototype.ineg = function ineg () {
           if (!this.isZero()) {
             this.negative ^= 1;
           }

           return this;
         };

         // Or `num` with `this` in-place
         BN.prototype.iuor = function iuor (num) {
           while (this.length < num.length) {
             this.words[this.length++] = 0;
           }

           for (var i = 0; i < num.length; i++) {
             this.words[i] = this.words[i] | num.words[i];
           }

           return this.strip();
         };

         BN.prototype.ior = function ior (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuor(num);
         };

         // Or `num` with `this`
         BN.prototype.or = function or (num) {
           if (this.length > num.length) return this.clone().ior(num);
           return num.clone().ior(this);
         };

         BN.prototype.uor = function uor (num) {
           if (this.length > num.length) return this.clone().iuor(num);
           return num.clone().iuor(this);
         };

         // And `num` with `this` in-place
         BN.prototype.iuand = function iuand (num) {
           // b = min-length(num, this)
           var b;
           if (this.length > num.length) {
             b = num;
           } else {
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = this.words[i] & num.words[i];
           }

           this.length = b.length;

           return this.strip();
         };

         BN.prototype.iand = function iand (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuand(num);
         };

         // And `num` with `this`
         BN.prototype.and = function and (num) {
           if (this.length > num.length) return this.clone().iand(num);
           return num.clone().iand(this);
         };

         BN.prototype.uand = function uand (num) {
           if (this.length > num.length) return this.clone().iuand(num);
           return num.clone().iuand(this);
         };

         // Xor `num` with `this` in-place
         BN.prototype.iuxor = function iuxor (num) {
           // a.length > b.length
           var a;
           var b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = a.words[i] ^ b.words[i];
           }

           if (this !== a) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = a.length;

           return this.strip();
         };

         BN.prototype.ixor = function ixor (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuxor(num);
         };

         // Xor `num` with `this`
         BN.prototype.xor = function xor (num) {
           if (this.length > num.length) return this.clone().ixor(num);
           return num.clone().ixor(this);
         };

         BN.prototype.uxor = function uxor (num) {
           if (this.length > num.length) return this.clone().iuxor(num);
           return num.clone().iuxor(this);
         };

         // Not ``this`` with ``width`` bitwidth
         BN.prototype.inotn = function inotn (width) {
           assert(typeof width === 'number' && width >= 0);

           var bytesNeeded = Math.ceil(width / 26) | 0;
           var bitsLeft = width % 26;

           // Extend the buffer with leading zeroes
           this._expand(bytesNeeded);

           if (bitsLeft > 0) {
             bytesNeeded--;
           }

           // Handle complete words
           for (var i = 0; i < bytesNeeded; i++) {
             this.words[i] = ~this.words[i] & 0x3ffffff;
           }

           // Handle the residue
           if (bitsLeft > 0) {
             this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
           }

           // And remove leading zeroes
           return this.strip();
         };

         BN.prototype.notn = function notn (width) {
           return this.clone().inotn(width);
         };

         // Set `bit` of `this`
         BN.prototype.setn = function setn (bit, val) {
           assert(typeof bit === 'number' && bit >= 0);

           var off = (bit / 26) | 0;
           var wbit = bit % 26;

           this._expand(off + 1);

           if (val) {
             this.words[off] = this.words[off] | (1 << wbit);
           } else {
             this.words[off] = this.words[off] & ~(1 << wbit);
           }

           return this.strip();
         };

         // Add `num` to `this` in-place
         BN.prototype.iadd = function iadd (num) {
           var r;

           // negative + positive
           if (this.negative !== 0 && num.negative === 0) {
             this.negative = 0;
             r = this.isub(num);
             this.negative ^= 1;
             return this._normSign();

           // positive + negative
           } else if (this.negative === 0 && num.negative !== 0) {
             num.negative = 0;
             r = this.isub(num);
             num.negative = 1;
             return r._normSign();
           }

           // a.length > b.length
           var a, b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }

           this.length = a.length;
           if (carry !== 0) {
             this.words[this.length] = carry;
             this.length++;
           // Copy the rest of the words
           } else if (a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           return this;
         };

         // Add `num` to `this`
         BN.prototype.add = function add (num) {
           var res;
           if (num.negative !== 0 && this.negative === 0) {
             num.negative = 0;
             res = this.sub(num);
             num.negative ^= 1;
             return res;
           } else if (num.negative === 0 && this.negative !== 0) {
             this.negative = 0;
             res = num.sub(this);
             this.negative = 1;
             return res;
           }

           if (this.length > num.length) return this.clone().iadd(num);

           return num.clone().iadd(this);
         };

         // Subtract `num` from `this` in-place
         BN.prototype.isub = function isub (num) {
           // this - (-num) = this + num
           if (num.negative !== 0) {
             num.negative = 0;
             var r = this.iadd(num);
             num.negative = 1;
             return r._normSign();

           // -this - num = -(this + num)
           } else if (this.negative !== 0) {
             this.negative = 0;
             this.iadd(num);
             this.negative = 1;
             return this._normSign();
           }

           // At this point both numbers are positive
           var cmp = this.cmp(num);

           // Optimization - zeroify
           if (cmp === 0) {
             this.negative = 0;
             this.length = 1;
             this.words[0] = 0;
             return this;
           }

           // a > b
           var a, b;
           if (cmp > 0) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }

           // Copy rest of the words
           if (carry === 0 && i < a.length && a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = Math.max(this.length, i);

           if (a !== this) {
             this.negative = 1;
           }

           return this.strip();
         };

         // Subtract `num` from `this`
         BN.prototype.sub = function sub (num) {
           return this.clone().isub(num);
         };

         function smallMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           var len = (self.length + num.length) | 0;
           out.length = len;
           len = (len - 1) | 0;

           // Peel one iteration (compiler can't do it, because of code complexity)
           var a = self.words[0] | 0;
           var b = num.words[0] | 0;
           var r = a * b;

           var lo = r & 0x3ffffff;
           var carry = (r / 0x4000000) | 0;
           out.words[0] = lo;

           for (var k = 1; k < len; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = carry >>> 26;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = (k - j) | 0;
               a = self.words[i] | 0;
               b = num.words[j] | 0;
               r = a * b + rword;
               ncarry += (r / 0x4000000) | 0;
               rword = r & 0x3ffffff;
             }
             out.words[k] = rword | 0;
             carry = ncarry | 0;
           }
           if (carry !== 0) {
             out.words[k] = carry | 0;
           } else {
             out.length--;
           }

           return out.strip();
         }

         // TODO(indutny): it may be reasonable to omit it for users who don't need
         // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
         // multiplication (like elliptic secp256k1).
         var comb10MulTo = function comb10MulTo (self, num, out) {
           var a = self.words;
           var b = num.words;
           var o = out.words;
           var c = 0;
           var lo;
           var mid;
           var hi;
           var a0 = a[0] | 0;
           var al0 = a0 & 0x1fff;
           var ah0 = a0 >>> 13;
           var a1 = a[1] | 0;
           var al1 = a1 & 0x1fff;
           var ah1 = a1 >>> 13;
           var a2 = a[2] | 0;
           var al2 = a2 & 0x1fff;
           var ah2 = a2 >>> 13;
           var a3 = a[3] | 0;
           var al3 = a3 & 0x1fff;
           var ah3 = a3 >>> 13;
           var a4 = a[4] | 0;
           var al4 = a4 & 0x1fff;
           var ah4 = a4 >>> 13;
           var a5 = a[5] | 0;
           var al5 = a5 & 0x1fff;
           var ah5 = a5 >>> 13;
           var a6 = a[6] | 0;
           var al6 = a6 & 0x1fff;
           var ah6 = a6 >>> 13;
           var a7 = a[7] | 0;
           var al7 = a7 & 0x1fff;
           var ah7 = a7 >>> 13;
           var a8 = a[8] | 0;
           var al8 = a8 & 0x1fff;
           var ah8 = a8 >>> 13;
           var a9 = a[9] | 0;
           var al9 = a9 & 0x1fff;
           var ah9 = a9 >>> 13;
           var b0 = b[0] | 0;
           var bl0 = b0 & 0x1fff;
           var bh0 = b0 >>> 13;
           var b1 = b[1] | 0;
           var bl1 = b1 & 0x1fff;
           var bh1 = b1 >>> 13;
           var b2 = b[2] | 0;
           var bl2 = b2 & 0x1fff;
           var bh2 = b2 >>> 13;
           var b3 = b[3] | 0;
           var bl3 = b3 & 0x1fff;
           var bh3 = b3 >>> 13;
           var b4 = b[4] | 0;
           var bl4 = b4 & 0x1fff;
           var bh4 = b4 >>> 13;
           var b5 = b[5] | 0;
           var bl5 = b5 & 0x1fff;
           var bh5 = b5 >>> 13;
           var b6 = b[6] | 0;
           var bl6 = b6 & 0x1fff;
           var bh6 = b6 >>> 13;
           var b7 = b[7] | 0;
           var bl7 = b7 & 0x1fff;
           var bh7 = b7 >>> 13;
           var b8 = b[8] | 0;
           var bl8 = b8 & 0x1fff;
           var bh8 = b8 >>> 13;
           var b9 = b[9] | 0;
           var bl9 = b9 & 0x1fff;
           var bh9 = b9 >>> 13;

           out.negative = self.negative ^ num.negative;
           out.length = 19;
           /* k = 0 */
           lo = Math.imul(al0, bl0);
           mid = Math.imul(al0, bh0);
           mid = (mid + Math.imul(ah0, bl0)) | 0;
           hi = Math.imul(ah0, bh0);
           var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
           w0 &= 0x3ffffff;
           /* k = 1 */
           lo = Math.imul(al1, bl0);
           mid = Math.imul(al1, bh0);
           mid = (mid + Math.imul(ah1, bl0)) | 0;
           hi = Math.imul(ah1, bh0);
           lo = (lo + Math.imul(al0, bl1)) | 0;
           mid = (mid + Math.imul(al0, bh1)) | 0;
           mid = (mid + Math.imul(ah0, bl1)) | 0;
           hi = (hi + Math.imul(ah0, bh1)) | 0;
           var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
           w1 &= 0x3ffffff;
           /* k = 2 */
           lo = Math.imul(al2, bl0);
           mid = Math.imul(al2, bh0);
           mid = (mid + Math.imul(ah2, bl0)) | 0;
           hi = Math.imul(ah2, bh0);
           lo = (lo + Math.imul(al1, bl1)) | 0;
           mid = (mid + Math.imul(al1, bh1)) | 0;
           mid = (mid + Math.imul(ah1, bl1)) | 0;
           hi = (hi + Math.imul(ah1, bh1)) | 0;
           lo = (lo + Math.imul(al0, bl2)) | 0;
           mid = (mid + Math.imul(al0, bh2)) | 0;
           mid = (mid + Math.imul(ah0, bl2)) | 0;
           hi = (hi + Math.imul(ah0, bh2)) | 0;
           var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
           w2 &= 0x3ffffff;
           /* k = 3 */
           lo = Math.imul(al3, bl0);
           mid = Math.imul(al3, bh0);
           mid = (mid + Math.imul(ah3, bl0)) | 0;
           hi = Math.imul(ah3, bh0);
           lo = (lo + Math.imul(al2, bl1)) | 0;
           mid = (mid + Math.imul(al2, bh1)) | 0;
           mid = (mid + Math.imul(ah2, bl1)) | 0;
           hi = (hi + Math.imul(ah2, bh1)) | 0;
           lo = (lo + Math.imul(al1, bl2)) | 0;
           mid = (mid + Math.imul(al1, bh2)) | 0;
           mid = (mid + Math.imul(ah1, bl2)) | 0;
           hi = (hi + Math.imul(ah1, bh2)) | 0;
           lo = (lo + Math.imul(al0, bl3)) | 0;
           mid = (mid + Math.imul(al0, bh3)) | 0;
           mid = (mid + Math.imul(ah0, bl3)) | 0;
           hi = (hi + Math.imul(ah0, bh3)) | 0;
           var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
           w3 &= 0x3ffffff;
           /* k = 4 */
           lo = Math.imul(al4, bl0);
           mid = Math.imul(al4, bh0);
           mid = (mid + Math.imul(ah4, bl0)) | 0;
           hi = Math.imul(ah4, bh0);
           lo = (lo + Math.imul(al3, bl1)) | 0;
           mid = (mid + Math.imul(al3, bh1)) | 0;
           mid = (mid + Math.imul(ah3, bl1)) | 0;
           hi = (hi + Math.imul(ah3, bh1)) | 0;
           lo = (lo + Math.imul(al2, bl2)) | 0;
           mid = (mid + Math.imul(al2, bh2)) | 0;
           mid = (mid + Math.imul(ah2, bl2)) | 0;
           hi = (hi + Math.imul(ah2, bh2)) | 0;
           lo = (lo + Math.imul(al1, bl3)) | 0;
           mid = (mid + Math.imul(al1, bh3)) | 0;
           mid = (mid + Math.imul(ah1, bl3)) | 0;
           hi = (hi + Math.imul(ah1, bh3)) | 0;
           lo = (lo + Math.imul(al0, bl4)) | 0;
           mid = (mid + Math.imul(al0, bh4)) | 0;
           mid = (mid + Math.imul(ah0, bl4)) | 0;
           hi = (hi + Math.imul(ah0, bh4)) | 0;
           var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
           w4 &= 0x3ffffff;
           /* k = 5 */
           lo = Math.imul(al5, bl0);
           mid = Math.imul(al5, bh0);
           mid = (mid + Math.imul(ah5, bl0)) | 0;
           hi = Math.imul(ah5, bh0);
           lo = (lo + Math.imul(al4, bl1)) | 0;
           mid = (mid + Math.imul(al4, bh1)) | 0;
           mid = (mid + Math.imul(ah4, bl1)) | 0;
           hi = (hi + Math.imul(ah4, bh1)) | 0;
           lo = (lo + Math.imul(al3, bl2)) | 0;
           mid = (mid + Math.imul(al3, bh2)) | 0;
           mid = (mid + Math.imul(ah3, bl2)) | 0;
           hi = (hi + Math.imul(ah3, bh2)) | 0;
           lo = (lo + Math.imul(al2, bl3)) | 0;
           mid = (mid + Math.imul(al2, bh3)) | 0;
           mid = (mid + Math.imul(ah2, bl3)) | 0;
           hi = (hi + Math.imul(ah2, bh3)) | 0;
           lo = (lo + Math.imul(al1, bl4)) | 0;
           mid = (mid + Math.imul(al1, bh4)) | 0;
           mid = (mid + Math.imul(ah1, bl4)) | 0;
           hi = (hi + Math.imul(ah1, bh4)) | 0;
           lo = (lo + Math.imul(al0, bl5)) | 0;
           mid = (mid + Math.imul(al0, bh5)) | 0;
           mid = (mid + Math.imul(ah0, bl5)) | 0;
           hi = (hi + Math.imul(ah0, bh5)) | 0;
           var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
           w5 &= 0x3ffffff;
           /* k = 6 */
           lo = Math.imul(al6, bl0);
           mid = Math.imul(al6, bh0);
           mid = (mid + Math.imul(ah6, bl0)) | 0;
           hi = Math.imul(ah6, bh0);
           lo = (lo + Math.imul(al5, bl1)) | 0;
           mid = (mid + Math.imul(al5, bh1)) | 0;
           mid = (mid + Math.imul(ah5, bl1)) | 0;
           hi = (hi + Math.imul(ah5, bh1)) | 0;
           lo = (lo + Math.imul(al4, bl2)) | 0;
           mid = (mid + Math.imul(al4, bh2)) | 0;
           mid = (mid + Math.imul(ah4, bl2)) | 0;
           hi = (hi + Math.imul(ah4, bh2)) | 0;
           lo = (lo + Math.imul(al3, bl3)) | 0;
           mid = (mid + Math.imul(al3, bh3)) | 0;
           mid = (mid + Math.imul(ah3, bl3)) | 0;
           hi = (hi + Math.imul(ah3, bh3)) | 0;
           lo = (lo + Math.imul(al2, bl4)) | 0;
           mid = (mid + Math.imul(al2, bh4)) | 0;
           mid = (mid + Math.imul(ah2, bl4)) | 0;
           hi = (hi + Math.imul(ah2, bh4)) | 0;
           lo = (lo + Math.imul(al1, bl5)) | 0;
           mid = (mid + Math.imul(al1, bh5)) | 0;
           mid = (mid + Math.imul(ah1, bl5)) | 0;
           hi = (hi + Math.imul(ah1, bh5)) | 0;
           lo = (lo + Math.imul(al0, bl6)) | 0;
           mid = (mid + Math.imul(al0, bh6)) | 0;
           mid = (mid + Math.imul(ah0, bl6)) | 0;
           hi = (hi + Math.imul(ah0, bh6)) | 0;
           var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
           w6 &= 0x3ffffff;
           /* k = 7 */
           lo = Math.imul(al7, bl0);
           mid = Math.imul(al7, bh0);
           mid = (mid + Math.imul(ah7, bl0)) | 0;
           hi = Math.imul(ah7, bh0);
           lo = (lo + Math.imul(al6, bl1)) | 0;
           mid = (mid + Math.imul(al6, bh1)) | 0;
           mid = (mid + Math.imul(ah6, bl1)) | 0;
           hi = (hi + Math.imul(ah6, bh1)) | 0;
           lo = (lo + Math.imul(al5, bl2)) | 0;
           mid = (mid + Math.imul(al5, bh2)) | 0;
           mid = (mid + Math.imul(ah5, bl2)) | 0;
           hi = (hi + Math.imul(ah5, bh2)) | 0;
           lo = (lo + Math.imul(al4, bl3)) | 0;
           mid = (mid + Math.imul(al4, bh3)) | 0;
           mid = (mid + Math.imul(ah4, bl3)) | 0;
           hi = (hi + Math.imul(ah4, bh3)) | 0;
           lo = (lo + Math.imul(al3, bl4)) | 0;
           mid = (mid + Math.imul(al3, bh4)) | 0;
           mid = (mid + Math.imul(ah3, bl4)) | 0;
           hi = (hi + Math.imul(ah3, bh4)) | 0;
           lo = (lo + Math.imul(al2, bl5)) | 0;
           mid = (mid + Math.imul(al2, bh5)) | 0;
           mid = (mid + Math.imul(ah2, bl5)) | 0;
           hi = (hi + Math.imul(ah2, bh5)) | 0;
           lo = (lo + Math.imul(al1, bl6)) | 0;
           mid = (mid + Math.imul(al1, bh6)) | 0;
           mid = (mid + Math.imul(ah1, bl6)) | 0;
           hi = (hi + Math.imul(ah1, bh6)) | 0;
           lo = (lo + Math.imul(al0, bl7)) | 0;
           mid = (mid + Math.imul(al0, bh7)) | 0;
           mid = (mid + Math.imul(ah0, bl7)) | 0;
           hi = (hi + Math.imul(ah0, bh7)) | 0;
           var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
           w7 &= 0x3ffffff;
           /* k = 8 */
           lo = Math.imul(al8, bl0);
           mid = Math.imul(al8, bh0);
           mid = (mid + Math.imul(ah8, bl0)) | 0;
           hi = Math.imul(ah8, bh0);
           lo = (lo + Math.imul(al7, bl1)) | 0;
           mid = (mid + Math.imul(al7, bh1)) | 0;
           mid = (mid + Math.imul(ah7, bl1)) | 0;
           hi = (hi + Math.imul(ah7, bh1)) | 0;
           lo = (lo + Math.imul(al6, bl2)) | 0;
           mid = (mid + Math.imul(al6, bh2)) | 0;
           mid = (mid + Math.imul(ah6, bl2)) | 0;
           hi = (hi + Math.imul(ah6, bh2)) | 0;
           lo = (lo + Math.imul(al5, bl3)) | 0;
           mid = (mid + Math.imul(al5, bh3)) | 0;
           mid = (mid + Math.imul(ah5, bl3)) | 0;
           hi = (hi + Math.imul(ah5, bh3)) | 0;
           lo = (lo + Math.imul(al4, bl4)) | 0;
           mid = (mid + Math.imul(al4, bh4)) | 0;
           mid = (mid + Math.imul(ah4, bl4)) | 0;
           hi = (hi + Math.imul(ah4, bh4)) | 0;
           lo = (lo + Math.imul(al3, bl5)) | 0;
           mid = (mid + Math.imul(al3, bh5)) | 0;
           mid = (mid + Math.imul(ah3, bl5)) | 0;
           hi = (hi + Math.imul(ah3, bh5)) | 0;
           lo = (lo + Math.imul(al2, bl6)) | 0;
           mid = (mid + Math.imul(al2, bh6)) | 0;
           mid = (mid + Math.imul(ah2, bl6)) | 0;
           hi = (hi + Math.imul(ah2, bh6)) | 0;
           lo = (lo + Math.imul(al1, bl7)) | 0;
           mid = (mid + Math.imul(al1, bh7)) | 0;
           mid = (mid + Math.imul(ah1, bl7)) | 0;
           hi = (hi + Math.imul(ah1, bh7)) | 0;
           lo = (lo + Math.imul(al0, bl8)) | 0;
           mid = (mid + Math.imul(al0, bh8)) | 0;
           mid = (mid + Math.imul(ah0, bl8)) | 0;
           hi = (hi + Math.imul(ah0, bh8)) | 0;
           var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
           w8 &= 0x3ffffff;
           /* k = 9 */
           lo = Math.imul(al9, bl0);
           mid = Math.imul(al9, bh0);
           mid = (mid + Math.imul(ah9, bl0)) | 0;
           hi = Math.imul(ah9, bh0);
           lo = (lo + Math.imul(al8, bl1)) | 0;
           mid = (mid + Math.imul(al8, bh1)) | 0;
           mid = (mid + Math.imul(ah8, bl1)) | 0;
           hi = (hi + Math.imul(ah8, bh1)) | 0;
           lo = (lo + Math.imul(al7, bl2)) | 0;
           mid = (mid + Math.imul(al7, bh2)) | 0;
           mid = (mid + Math.imul(ah7, bl2)) | 0;
           hi = (hi + Math.imul(ah7, bh2)) | 0;
           lo = (lo + Math.imul(al6, bl3)) | 0;
           mid = (mid + Math.imul(al6, bh3)) | 0;
           mid = (mid + Math.imul(ah6, bl3)) | 0;
           hi = (hi + Math.imul(ah6, bh3)) | 0;
           lo = (lo + Math.imul(al5, bl4)) | 0;
           mid = (mid + Math.imul(al5, bh4)) | 0;
           mid = (mid + Math.imul(ah5, bl4)) | 0;
           hi = (hi + Math.imul(ah5, bh4)) | 0;
           lo = (lo + Math.imul(al4, bl5)) | 0;
           mid = (mid + Math.imul(al4, bh5)) | 0;
           mid = (mid + Math.imul(ah4, bl5)) | 0;
           hi = (hi + Math.imul(ah4, bh5)) | 0;
           lo = (lo + Math.imul(al3, bl6)) | 0;
           mid = (mid + Math.imul(al3, bh6)) | 0;
           mid = (mid + Math.imul(ah3, bl6)) | 0;
           hi = (hi + Math.imul(ah3, bh6)) | 0;
           lo = (lo + Math.imul(al2, bl7)) | 0;
           mid = (mid + Math.imul(al2, bh7)) | 0;
           mid = (mid + Math.imul(ah2, bl7)) | 0;
           hi = (hi + Math.imul(ah2, bh7)) | 0;
           lo = (lo + Math.imul(al1, bl8)) | 0;
           mid = (mid + Math.imul(al1, bh8)) | 0;
           mid = (mid + Math.imul(ah1, bl8)) | 0;
           hi = (hi + Math.imul(ah1, bh8)) | 0;
           lo = (lo + Math.imul(al0, bl9)) | 0;
           mid = (mid + Math.imul(al0, bh9)) | 0;
           mid = (mid + Math.imul(ah0, bl9)) | 0;
           hi = (hi + Math.imul(ah0, bh9)) | 0;
           var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
           w9 &= 0x3ffffff;
           /* k = 10 */
           lo = Math.imul(al9, bl1);
           mid = Math.imul(al9, bh1);
           mid = (mid + Math.imul(ah9, bl1)) | 0;
           hi = Math.imul(ah9, bh1);
           lo = (lo + Math.imul(al8, bl2)) | 0;
           mid = (mid + Math.imul(al8, bh2)) | 0;
           mid = (mid + Math.imul(ah8, bl2)) | 0;
           hi = (hi + Math.imul(ah8, bh2)) | 0;
           lo = (lo + Math.imul(al7, bl3)) | 0;
           mid = (mid + Math.imul(al7, bh3)) | 0;
           mid = (mid + Math.imul(ah7, bl3)) | 0;
           hi = (hi + Math.imul(ah7, bh3)) | 0;
           lo = (lo + Math.imul(al6, bl4)) | 0;
           mid = (mid + Math.imul(al6, bh4)) | 0;
           mid = (mid + Math.imul(ah6, bl4)) | 0;
           hi = (hi + Math.imul(ah6, bh4)) | 0;
           lo = (lo + Math.imul(al5, bl5)) | 0;
           mid = (mid + Math.imul(al5, bh5)) | 0;
           mid = (mid + Math.imul(ah5, bl5)) | 0;
           hi = (hi + Math.imul(ah5, bh5)) | 0;
           lo = (lo + Math.imul(al4, bl6)) | 0;
           mid = (mid + Math.imul(al4, bh6)) | 0;
           mid = (mid + Math.imul(ah4, bl6)) | 0;
           hi = (hi + Math.imul(ah4, bh6)) | 0;
           lo = (lo + Math.imul(al3, bl7)) | 0;
           mid = (mid + Math.imul(al3, bh7)) | 0;
           mid = (mid + Math.imul(ah3, bl7)) | 0;
           hi = (hi + Math.imul(ah3, bh7)) | 0;
           lo = (lo + Math.imul(al2, bl8)) | 0;
           mid = (mid + Math.imul(al2, bh8)) | 0;
           mid = (mid + Math.imul(ah2, bl8)) | 0;
           hi = (hi + Math.imul(ah2, bh8)) | 0;
           lo = (lo + Math.imul(al1, bl9)) | 0;
           mid = (mid + Math.imul(al1, bh9)) | 0;
           mid = (mid + Math.imul(ah1, bl9)) | 0;
           hi = (hi + Math.imul(ah1, bh9)) | 0;
           var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
           w10 &= 0x3ffffff;
           /* k = 11 */
           lo = Math.imul(al9, bl2);
           mid = Math.imul(al9, bh2);
           mid = (mid + Math.imul(ah9, bl2)) | 0;
           hi = Math.imul(ah9, bh2);
           lo = (lo + Math.imul(al8, bl3)) | 0;
           mid = (mid + Math.imul(al8, bh3)) | 0;
           mid = (mid + Math.imul(ah8, bl3)) | 0;
           hi = (hi + Math.imul(ah8, bh3)) | 0;
           lo = (lo + Math.imul(al7, bl4)) | 0;
           mid = (mid + Math.imul(al7, bh4)) | 0;
           mid = (mid + Math.imul(ah7, bl4)) | 0;
           hi = (hi + Math.imul(ah7, bh4)) | 0;
           lo = (lo + Math.imul(al6, bl5)) | 0;
           mid = (mid + Math.imul(al6, bh5)) | 0;
           mid = (mid + Math.imul(ah6, bl5)) | 0;
           hi = (hi + Math.imul(ah6, bh5)) | 0;
           lo = (lo + Math.imul(al5, bl6)) | 0;
           mid = (mid + Math.imul(al5, bh6)) | 0;
           mid = (mid + Math.imul(ah5, bl6)) | 0;
           hi = (hi + Math.imul(ah5, bh6)) | 0;
           lo = (lo + Math.imul(al4, bl7)) | 0;
           mid = (mid + Math.imul(al4, bh7)) | 0;
           mid = (mid + Math.imul(ah4, bl7)) | 0;
           hi = (hi + Math.imul(ah4, bh7)) | 0;
           lo = (lo + Math.imul(al3, bl8)) | 0;
           mid = (mid + Math.imul(al3, bh8)) | 0;
           mid = (mid + Math.imul(ah3, bl8)) | 0;
           hi = (hi + Math.imul(ah3, bh8)) | 0;
           lo = (lo + Math.imul(al2, bl9)) | 0;
           mid = (mid + Math.imul(al2, bh9)) | 0;
           mid = (mid + Math.imul(ah2, bl9)) | 0;
           hi = (hi + Math.imul(ah2, bh9)) | 0;
           var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
           w11 &= 0x3ffffff;
           /* k = 12 */
           lo = Math.imul(al9, bl3);
           mid = Math.imul(al9, bh3);
           mid = (mid + Math.imul(ah9, bl3)) | 0;
           hi = Math.imul(ah9, bh3);
           lo = (lo + Math.imul(al8, bl4)) | 0;
           mid = (mid + Math.imul(al8, bh4)) | 0;
           mid = (mid + Math.imul(ah8, bl4)) | 0;
           hi = (hi + Math.imul(ah8, bh4)) | 0;
           lo = (lo + Math.imul(al7, bl5)) | 0;
           mid = (mid + Math.imul(al7, bh5)) | 0;
           mid = (mid + Math.imul(ah7, bl5)) | 0;
           hi = (hi + Math.imul(ah7, bh5)) | 0;
           lo = (lo + Math.imul(al6, bl6)) | 0;
           mid = (mid + Math.imul(al6, bh6)) | 0;
           mid = (mid + Math.imul(ah6, bl6)) | 0;
           hi = (hi + Math.imul(ah6, bh6)) | 0;
           lo = (lo + Math.imul(al5, bl7)) | 0;
           mid = (mid + Math.imul(al5, bh7)) | 0;
           mid = (mid + Math.imul(ah5, bl7)) | 0;
           hi = (hi + Math.imul(ah5, bh7)) | 0;
           lo = (lo + Math.imul(al4, bl8)) | 0;
           mid = (mid + Math.imul(al4, bh8)) | 0;
           mid = (mid + Math.imul(ah4, bl8)) | 0;
           hi = (hi + Math.imul(ah4, bh8)) | 0;
           lo = (lo + Math.imul(al3, bl9)) | 0;
           mid = (mid + Math.imul(al3, bh9)) | 0;
           mid = (mid + Math.imul(ah3, bl9)) | 0;
           hi = (hi + Math.imul(ah3, bh9)) | 0;
           var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
           w12 &= 0x3ffffff;
           /* k = 13 */
           lo = Math.imul(al9, bl4);
           mid = Math.imul(al9, bh4);
           mid = (mid + Math.imul(ah9, bl4)) | 0;
           hi = Math.imul(ah9, bh4);
           lo = (lo + Math.imul(al8, bl5)) | 0;
           mid = (mid + Math.imul(al8, bh5)) | 0;
           mid = (mid + Math.imul(ah8, bl5)) | 0;
           hi = (hi + Math.imul(ah8, bh5)) | 0;
           lo = (lo + Math.imul(al7, bl6)) | 0;
           mid = (mid + Math.imul(al7, bh6)) | 0;
           mid = (mid + Math.imul(ah7, bl6)) | 0;
           hi = (hi + Math.imul(ah7, bh6)) | 0;
           lo = (lo + Math.imul(al6, bl7)) | 0;
           mid = (mid + Math.imul(al6, bh7)) | 0;
           mid = (mid + Math.imul(ah6, bl7)) | 0;
           hi = (hi + Math.imul(ah6, bh7)) | 0;
           lo = (lo + Math.imul(al5, bl8)) | 0;
           mid = (mid + Math.imul(al5, bh8)) | 0;
           mid = (mid + Math.imul(ah5, bl8)) | 0;
           hi = (hi + Math.imul(ah5, bh8)) | 0;
           lo = (lo + Math.imul(al4, bl9)) | 0;
           mid = (mid + Math.imul(al4, bh9)) | 0;
           mid = (mid + Math.imul(ah4, bl9)) | 0;
           hi = (hi + Math.imul(ah4, bh9)) | 0;
           var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
           w13 &= 0x3ffffff;
           /* k = 14 */
           lo = Math.imul(al9, bl5);
           mid = Math.imul(al9, bh5);
           mid = (mid + Math.imul(ah9, bl5)) | 0;
           hi = Math.imul(ah9, bh5);
           lo = (lo + Math.imul(al8, bl6)) | 0;
           mid = (mid + Math.imul(al8, bh6)) | 0;
           mid = (mid + Math.imul(ah8, bl6)) | 0;
           hi = (hi + Math.imul(ah8, bh6)) | 0;
           lo = (lo + Math.imul(al7, bl7)) | 0;
           mid = (mid + Math.imul(al7, bh7)) | 0;
           mid = (mid + Math.imul(ah7, bl7)) | 0;
           hi = (hi + Math.imul(ah7, bh7)) | 0;
           lo = (lo + Math.imul(al6, bl8)) | 0;
           mid = (mid + Math.imul(al6, bh8)) | 0;
           mid = (mid + Math.imul(ah6, bl8)) | 0;
           hi = (hi + Math.imul(ah6, bh8)) | 0;
           lo = (lo + Math.imul(al5, bl9)) | 0;
           mid = (mid + Math.imul(al5, bh9)) | 0;
           mid = (mid + Math.imul(ah5, bl9)) | 0;
           hi = (hi + Math.imul(ah5, bh9)) | 0;
           var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
           w14 &= 0x3ffffff;
           /* k = 15 */
           lo = Math.imul(al9, bl6);
           mid = Math.imul(al9, bh6);
           mid = (mid + Math.imul(ah9, bl6)) | 0;
           hi = Math.imul(ah9, bh6);
           lo = (lo + Math.imul(al8, bl7)) | 0;
           mid = (mid + Math.imul(al8, bh7)) | 0;
           mid = (mid + Math.imul(ah8, bl7)) | 0;
           hi = (hi + Math.imul(ah8, bh7)) | 0;
           lo = (lo + Math.imul(al7, bl8)) | 0;
           mid = (mid + Math.imul(al7, bh8)) | 0;
           mid = (mid + Math.imul(ah7, bl8)) | 0;
           hi = (hi + Math.imul(ah7, bh8)) | 0;
           lo = (lo + Math.imul(al6, bl9)) | 0;
           mid = (mid + Math.imul(al6, bh9)) | 0;
           mid = (mid + Math.imul(ah6, bl9)) | 0;
           hi = (hi + Math.imul(ah6, bh9)) | 0;
           var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
           w15 &= 0x3ffffff;
           /* k = 16 */
           lo = Math.imul(al9, bl7);
           mid = Math.imul(al9, bh7);
           mid = (mid + Math.imul(ah9, bl7)) | 0;
           hi = Math.imul(ah9, bh7);
           lo = (lo + Math.imul(al8, bl8)) | 0;
           mid = (mid + Math.imul(al8, bh8)) | 0;
           mid = (mid + Math.imul(ah8, bl8)) | 0;
           hi = (hi + Math.imul(ah8, bh8)) | 0;
           lo = (lo + Math.imul(al7, bl9)) | 0;
           mid = (mid + Math.imul(al7, bh9)) | 0;
           mid = (mid + Math.imul(ah7, bl9)) | 0;
           hi = (hi + Math.imul(ah7, bh9)) | 0;
           var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
           w16 &= 0x3ffffff;
           /* k = 17 */
           lo = Math.imul(al9, bl8);
           mid = Math.imul(al9, bh8);
           mid = (mid + Math.imul(ah9, bl8)) | 0;
           hi = Math.imul(ah9, bh8);
           lo = (lo + Math.imul(al8, bl9)) | 0;
           mid = (mid + Math.imul(al8, bh9)) | 0;
           mid = (mid + Math.imul(ah8, bl9)) | 0;
           hi = (hi + Math.imul(ah8, bh9)) | 0;
           var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
           w17 &= 0x3ffffff;
           /* k = 18 */
           lo = Math.imul(al9, bl9);
           mid = Math.imul(al9, bh9);
           mid = (mid + Math.imul(ah9, bl9)) | 0;
           hi = Math.imul(ah9, bh9);
           var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
           w18 &= 0x3ffffff;
           o[0] = w0;
           o[1] = w1;
           o[2] = w2;
           o[3] = w3;
           o[4] = w4;
           o[5] = w5;
           o[6] = w6;
           o[7] = w7;
           o[8] = w8;
           o[9] = w9;
           o[10] = w10;
           o[11] = w11;
           o[12] = w12;
           o[13] = w13;
           o[14] = w14;
           o[15] = w15;
           o[16] = w16;
           o[17] = w17;
           o[18] = w18;
           if (c !== 0) {
             o[19] = c;
             out.length++;
           }
           return out;
         };

         // Polyfill comb
         if (!Math.imul) {
           comb10MulTo = smallMulTo;
         }

         function bigMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           out.length = self.length + num.length;

           var carry = 0;
           var hncarry = 0;
           for (var k = 0; k < out.length - 1; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = hncarry;
             hncarry = 0;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = k - j;
               var a = self.words[i] | 0;
               var b = num.words[j] | 0;
               var r = a * b;

               var lo = r & 0x3ffffff;
               ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
               lo = (lo + rword) | 0;
               rword = lo & 0x3ffffff;
               ncarry = (ncarry + (lo >>> 26)) | 0;

               hncarry += ncarry >>> 26;
               ncarry &= 0x3ffffff;
             }
             out.words[k] = rword;
             carry = ncarry;
             ncarry = hncarry;
           }
           if (carry !== 0) {
             out.words[k] = carry;
           } else {
             out.length--;
           }

           return out.strip();
         }

         function jumboMulTo (self, num, out) {
           var fftm = new FFTM();
           return fftm.mulp(self, num, out);
         }

         BN.prototype.mulTo = function mulTo (num, out) {
           var res;
           var len = this.length + num.length;
           if (this.length === 10 && num.length === 10) {
             res = comb10MulTo(this, num, out);
           } else if (len < 63) {
             res = smallMulTo(this, num, out);
           } else if (len < 1024) {
             res = bigMulTo(this, num, out);
           } else {
             res = jumboMulTo(this, num, out);
           }

           return res;
         };

         // Cooley-Tukey algorithm for FFT
         // slightly revisited to rely on looping instead of recursion

         function FFTM (x, y) {
           this.x = x;
           this.y = y;
         }

         FFTM.prototype.makeRBT = function makeRBT (N) {
           var t = new Array(N);
           var l = BN.prototype._countBits(N) - 1;
           for (var i = 0; i < N; i++) {
             t[i] = this.revBin(i, l, N);
           }

           return t;
         };

         // Returns binary-reversed representation of `x`
         FFTM.prototype.revBin = function revBin (x, l, N) {
           if (x === 0 || x === N - 1) return x;

           var rb = 0;
           for (var i = 0; i < l; i++) {
             rb |= (x & 1) << (l - i - 1);
             x >>= 1;
           }

           return rb;
         };

         // Performs "tweedling" phase, therefore 'emulating'
         // behaviour of the recursive algorithm
         FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
           for (var i = 0; i < N; i++) {
             rtws[i] = rws[rbt[i]];
             itws[i] = iws[rbt[i]];
           }
         };

         FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
           this.permute(rbt, rws, iws, rtws, itws, N);

           for (var s = 1; s < N; s <<= 1) {
             var l = s << 1;

             var rtwdf = Math.cos(2 * Math.PI / l);
             var itwdf = Math.sin(2 * Math.PI / l);

             for (var p = 0; p < N; p += l) {
               var rtwdf_ = rtwdf;
               var itwdf_ = itwdf;

               for (var j = 0; j < s; j++) {
                 var re = rtws[p + j];
                 var ie = itws[p + j];

                 var ro = rtws[p + j + s];
                 var io = itws[p + j + s];

                 var rx = rtwdf_ * ro - itwdf_ * io;

                 io = rtwdf_ * io + itwdf_ * ro;
                 ro = rx;

                 rtws[p + j] = re + ro;
                 itws[p + j] = ie + io;

                 rtws[p + j + s] = re - ro;
                 itws[p + j + s] = ie - io;

                 /* jshint maxdepth : false */
                 if (j !== l) {
                   rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                   itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                   rtwdf_ = rx;
                 }
               }
             }
           }
         };

         FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
           var N = Math.max(m, n) | 1;
           var odd = N & 1;
           var i = 0;
           for (N = N / 2 | 0; N; N = N >>> 1) {
             i++;
           }

           return 1 << i + 1 + odd;
         };

         FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
           if (N <= 1) return;

           for (var i = 0; i < N / 2; i++) {
             var t = rws[i];

             rws[i] = rws[N - i - 1];
             rws[N - i - 1] = t;

             t = iws[i];

             iws[i] = -iws[N - i - 1];
             iws[N - i - 1] = -t;
           }
         };

         FFTM.prototype.normalize13b = function normalize13b (ws, N) {
           var carry = 0;
           for (var i = 0; i < N / 2; i++) {
             var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
               Math.round(ws[2 * i] / N) +
               carry;

             ws[i] = w & 0x3ffffff;

             if (w < 0x4000000) {
               carry = 0;
             } else {
               carry = w / 0x4000000 | 0;
             }
           }

           return ws;
         };

         FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
           var carry = 0;
           for (var i = 0; i < len; i++) {
             carry = carry + (ws[i] | 0);

             rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
             rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
           }

           // Pad with zeroes
           for (i = 2 * len; i < N; ++i) {
             rws[i] = 0;
           }

           assert(carry === 0);
           assert((carry & ~0x1fff) === 0);
         };

         FFTM.prototype.stub = function stub (N) {
           var ph = new Array(N);
           for (var i = 0; i < N; i++) {
             ph[i] = 0;
           }

           return ph;
         };

         FFTM.prototype.mulp = function mulp (x, y, out) {
           var N = 2 * this.guessLen13b(x.length, y.length);

           var rbt = this.makeRBT(N);

           var _ = this.stub(N);

           var rws = new Array(N);
           var rwst = new Array(N);
           var iwst = new Array(N);

           var nrws = new Array(N);
           var nrwst = new Array(N);
           var niwst = new Array(N);

           var rmws = out.words;
           rmws.length = N;

           this.convert13b(x.words, x.length, rws, N);
           this.convert13b(y.words, y.length, nrws, N);

           this.transform(rws, _, rwst, iwst, N, rbt);
           this.transform(nrws, _, nrwst, niwst, N, rbt);

           for (var i = 0; i < N; i++) {
             var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
             iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
             rwst[i] = rx;
           }

           this.conjugate(rwst, iwst, N);
           this.transform(rwst, iwst, rmws, _, N, rbt);
           this.conjugate(rmws, _, N);
           this.normalize13b(rmws, N);

           out.negative = x.negative ^ y.negative;
           out.length = x.length + y.length;
           return out.strip();
         };

         // Multiply `this` by `num`
         BN.prototype.mul = function mul (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return this.mulTo(num, out);
         };

         // Multiply employing FFT
         BN.prototype.mulf = function mulf (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return jumboMulTo(this, num, out);
         };

         // In-place Multiplication
         BN.prototype.imul = function imul (num) {
           return this.clone().mulTo(num, this);
         };

         BN.prototype.imuln = function imuln (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);

           // Carry
           var carry = 0;
           for (var i = 0; i < this.length; i++) {
             var w = (this.words[i] | 0) * num;
             var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
             carry >>= 26;
             carry += (w / 0x4000000) | 0;
             // NOTE: lo is 27bit maximum
             carry += lo >>> 26;
             this.words[i] = lo & 0x3ffffff;
           }

           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }

           return this;
         };

         BN.prototype.muln = function muln (num) {
           return this.clone().imuln(num);
         };

         // `this` * `this`
         BN.prototype.sqr = function sqr () {
           return this.mul(this);
         };

         // `this` * `this` in-place
         BN.prototype.isqr = function isqr () {
           return this.imul(this.clone());
         };

         // Math.pow(`this`, `num`)
         BN.prototype.pow = function pow (num) {
           var w = toBitArray(num);
           if (w.length === 0) return new BN(1);

           // Skip leading zeroes
           var res = this;
           for (var i = 0; i < w.length; i++, res = res.sqr()) {
             if (w[i] !== 0) break;
           }

           if (++i < w.length) {
             for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
               if (w[i] === 0) continue;

               res = res.mul(q);
             }
           }

           return res;
         };

         // Shift-left in-place
         BN.prototype.iushln = function iushln (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;
           var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
           var i;

           if (r !== 0) {
             var carry = 0;

             for (i = 0; i < this.length; i++) {
               var newCarry = this.words[i] & carryMask;
               var c = ((this.words[i] | 0) - newCarry) << r;
               this.words[i] = c | carry;
               carry = newCarry >>> (26 - r);
             }

             if (carry) {
               this.words[i] = carry;
               this.length++;
             }
           }

           if (s !== 0) {
             for (i = this.length - 1; i >= 0; i--) {
               this.words[i + s] = this.words[i];
             }

             for (i = 0; i < s; i++) {
               this.words[i] = 0;
             }

             this.length += s;
           }

           return this.strip();
         };

         BN.prototype.ishln = function ishln (bits) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushln(bits);
         };

         // Shift-right in-place
         // NOTE: `hint` is a lowest bit before trailing zeroes
         // NOTE: if `extended` is present - it will be filled with destroyed bits
         BN.prototype.iushrn = function iushrn (bits, hint, extended) {
           assert(typeof bits === 'number' && bits >= 0);
           var h;
           if (hint) {
             h = (hint - (hint % 26)) / 26;
           } else {
             h = 0;
           }

           var r = bits % 26;
           var s = Math.min((bits - r) / 26, this.length);
           var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
           var maskedWords = extended;

           h -= s;
           h = Math.max(0, h);

           // Extended mode, copy masked part
           if (maskedWords) {
             for (var i = 0; i < s; i++) {
               maskedWords.words[i] = this.words[i];
             }
             maskedWords.length = s;
           }

           if (s === 0) ; else if (this.length > s) {
             this.length -= s;
             for (i = 0; i < this.length; i++) {
               this.words[i] = this.words[i + s];
             }
           } else {
             this.words[0] = 0;
             this.length = 1;
           }

           var carry = 0;
           for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
             var word = this.words[i] | 0;
             this.words[i] = (carry << (26 - r)) | (word >>> r);
             carry = word & mask;
           }

           // Push carried bits as a mask
           if (maskedWords && carry !== 0) {
             maskedWords.words[maskedWords.length++] = carry;
           }

           if (this.length === 0) {
             this.words[0] = 0;
             this.length = 1;
           }

           return this.strip();
         };

         BN.prototype.ishrn = function ishrn (bits, hint, extended) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushrn(bits, hint, extended);
         };

         // Shift-left
         BN.prototype.shln = function shln (bits) {
           return this.clone().ishln(bits);
         };

         BN.prototype.ushln = function ushln (bits) {
           return this.clone().iushln(bits);
         };

         // Shift-right
         BN.prototype.shrn = function shrn (bits) {
           return this.clone().ishrn(bits);
         };

         BN.prototype.ushrn = function ushrn (bits) {
           return this.clone().iushrn(bits);
         };

         // Test if n bit is set
         BN.prototype.testn = function testn (bit) {
           assert(typeof bit === 'number' && bit >= 0);
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) return false;

           // Check bit and return
           var w = this.words[s];

           return !!(w & q);
         };

         // Return only lowers bits of number (in-place)
         BN.prototype.imaskn = function imaskn (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;

           assert(this.negative === 0, 'imaskn works only with positive numbers');

           if (this.length <= s) {
             return this;
           }

           if (r !== 0) {
             s++;
           }
           this.length = Math.min(s, this.length);

           if (r !== 0) {
             var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
             this.words[this.length - 1] &= mask;
           }

           return this.strip();
         };

         // Return only lowers bits of number
         BN.prototype.maskn = function maskn (bits) {
           return this.clone().imaskn(bits);
         };

         // Add plain number `num` to `this`
         BN.prototype.iaddn = function iaddn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.isubn(-num);

           // Possible sign change
           if (this.negative !== 0) {
             if (this.length === 1 && (this.words[0] | 0) < num) {
               this.words[0] = num - (this.words[0] | 0);
               this.negative = 0;
               return this;
             }

             this.negative = 0;
             this.isubn(num);
             this.negative = 1;
             return this;
           }

           // Add without checks
           return this._iaddn(num);
         };

         BN.prototype._iaddn = function _iaddn (num) {
           this.words[0] += num;

           // Carry
           for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
             this.words[i] -= 0x4000000;
             if (i === this.length - 1) {
               this.words[i + 1] = 1;
             } else {
               this.words[i + 1]++;
             }
           }
           this.length = Math.max(this.length, i + 1);

           return this;
         };

         // Subtract plain number `num` from `this`
         BN.prototype.isubn = function isubn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.iaddn(-num);

           if (this.negative !== 0) {
             this.negative = 0;
             this.iaddn(num);
             this.negative = 1;
             return this;
           }

           this.words[0] -= num;

           if (this.length === 1 && this.words[0] < 0) {
             this.words[0] = -this.words[0];
             this.negative = 1;
           } else {
             // Carry
             for (var i = 0; i < this.length && this.words[i] < 0; i++) {
               this.words[i] += 0x4000000;
               this.words[i + 1] -= 1;
             }
           }

           return this.strip();
         };

         BN.prototype.addn = function addn (num) {
           return this.clone().iaddn(num);
         };

         BN.prototype.subn = function subn (num) {
           return this.clone().isubn(num);
         };

         BN.prototype.iabs = function iabs () {
           this.negative = 0;

           return this;
         };

         BN.prototype.abs = function abs () {
           return this.clone().iabs();
         };

         BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
           var len = num.length + shift;
           var i;

           this._expand(len);

           var w;
           var carry = 0;
           for (i = 0; i < num.length; i++) {
             w = (this.words[i + shift] | 0) + carry;
             var right = (num.words[i] | 0) * mul;
             w -= right & 0x3ffffff;
             carry = (w >> 26) - ((right / 0x4000000) | 0);
             this.words[i + shift] = w & 0x3ffffff;
           }
           for (; i < this.length - shift; i++) {
             w = (this.words[i + shift] | 0) + carry;
             carry = w >> 26;
             this.words[i + shift] = w & 0x3ffffff;
           }

           if (carry === 0) return this.strip();

           // Subtraction overflow
           assert(carry === -1);
           carry = 0;
           for (i = 0; i < this.length; i++) {
             w = -(this.words[i] | 0) + carry;
             carry = w >> 26;
             this.words[i] = w & 0x3ffffff;
           }
           this.negative = 1;

           return this.strip();
         };

         BN.prototype._wordDiv = function _wordDiv (num, mode) {
           var shift = this.length - num.length;

           var a = this.clone();
           var b = num;

           // Normalize
           var bhi = b.words[b.length - 1] | 0;
           var bhiBits = this._countBits(bhi);
           shift = 26 - bhiBits;
           if (shift !== 0) {
             b = b.ushln(shift);
             a.iushln(shift);
             bhi = b.words[b.length - 1] | 0;
           }

           // Initialize quotient
           var m = a.length - b.length;
           var q;

           if (mode !== 'mod') {
             q = new BN(null);
             q.length = m + 1;
             q.words = new Array(q.length);
             for (var i = 0; i < q.length; i++) {
               q.words[i] = 0;
             }
           }

           var diff = a.clone()._ishlnsubmul(b, 1, m);
           if (diff.negative === 0) {
             a = diff;
             if (q) {
               q.words[m] = 1;
             }
           }

           for (var j = m - 1; j >= 0; j--) {
             var qj = (a.words[b.length + j] | 0) * 0x4000000 +
               (a.words[b.length + j - 1] | 0);

             // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
             // (0x7ffffff)
             qj = Math.min((qj / bhi) | 0, 0x3ffffff);

             a._ishlnsubmul(b, qj, j);
             while (a.negative !== 0) {
               qj--;
               a.negative = 0;
               a._ishlnsubmul(b, 1, j);
               if (!a.isZero()) {
                 a.negative ^= 1;
               }
             }
             if (q) {
               q.words[j] = qj;
             }
           }
           if (q) {
             q.strip();
           }
           a.strip();

           // Denormalize
           if (mode !== 'div' && shift !== 0) {
             a.iushrn(shift);
           }

           return {
             div: q || null,
             mod: a
           };
         };

         // NOTE: 1) `mode` can be set to `mod` to request mod only,
         //       to `div` to request div only, or be absent to
         //       request both div & mod
         //       2) `positive` is true if unsigned mod is requested
         BN.prototype.divmod = function divmod (num, mode, positive) {
           assert(!num.isZero());

           if (this.isZero()) {
             return {
               div: new BN(0),
               mod: new BN(0)
             };
           }

           var div, mod, res;
           if (this.negative !== 0 && num.negative === 0) {
             res = this.neg().divmod(num, mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.iadd(num);
               }
             }

             return {
               div: div,
               mod: mod
             };
           }

           if (this.negative === 0 && num.negative !== 0) {
             res = this.divmod(num.neg(), mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             return {
               div: div,
               mod: res.mod
             };
           }

           if ((this.negative & num.negative) !== 0) {
             res = this.neg().divmod(num.neg(), mode);

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.isub(num);
               }
             }

             return {
               div: res.div,
               mod: mod
             };
           }

           // Both numbers are positive at this point

           // Strip both numbers to approximate shift value
           if (num.length > this.length || this.cmp(num) < 0) {
             return {
               div: new BN(0),
               mod: this
             };
           }

           // Very short reduction
           if (num.length === 1) {
             if (mode === 'div') {
               return {
                 div: this.divn(num.words[0]),
                 mod: null
               };
             }

             if (mode === 'mod') {
               return {
                 div: null,
                 mod: new BN(this.modn(num.words[0]))
               };
             }

             return {
               div: this.divn(num.words[0]),
               mod: new BN(this.modn(num.words[0]))
             };
           }

           return this._wordDiv(num, mode);
         };

         // Find `this` / `num`
         BN.prototype.div = function div (num) {
           return this.divmod(num, 'div', false).div;
         };

         // Find `this` % `num`
         BN.prototype.mod = function mod (num) {
           return this.divmod(num, 'mod', false).mod;
         };

         BN.prototype.umod = function umod (num) {
           return this.divmod(num, 'mod', true).mod;
         };

         // Find Round(`this` / `num`)
         BN.prototype.divRound = function divRound (num) {
           var dm = this.divmod(num);

           // Fast case - exact division
           if (dm.mod.isZero()) return dm.div;

           var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

           var half = num.ushrn(1);
           var r2 = num.andln(1);
           var cmp = mod.cmp(half);

           // Round down
           if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

           // Round up
           return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
         };

         BN.prototype.modn = function modn (num) {
           assert(num <= 0x3ffffff);
           var p = (1 << 26) % num;

           var acc = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             acc = (p * acc + (this.words[i] | 0)) % num;
           }

           return acc;
         };

         // In-place division by number
         BN.prototype.idivn = function idivn (num) {
           assert(num <= 0x3ffffff);

           var carry = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var w = (this.words[i] | 0) + carry * 0x4000000;
             this.words[i] = (w / num) | 0;
             carry = w % num;
           }

           return this.strip();
         };

         BN.prototype.divn = function divn (num) {
           return this.clone().idivn(num);
         };

         BN.prototype.egcd = function egcd (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var x = this;
           var y = p.clone();

           if (x.negative !== 0) {
             x = x.umod(p);
           } else {
             x = x.clone();
           }

           // A * x + B * y = x
           var A = new BN(1);
           var B = new BN(0);

           // C * x + D * y = y
           var C = new BN(0);
           var D = new BN(1);

           var g = 0;

           while (x.isEven() && y.isEven()) {
             x.iushrn(1);
             y.iushrn(1);
             ++g;
           }

           var yp = y.clone();
           var xp = x.clone();

           while (!x.isZero()) {
             for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               x.iushrn(i);
               while (i-- > 0) {
                 if (A.isOdd() || B.isOdd()) {
                   A.iadd(yp);
                   B.isub(xp);
                 }

                 A.iushrn(1);
                 B.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               y.iushrn(j);
               while (j-- > 0) {
                 if (C.isOdd() || D.isOdd()) {
                   C.iadd(yp);
                   D.isub(xp);
                 }

                 C.iushrn(1);
                 D.iushrn(1);
               }
             }

             if (x.cmp(y) >= 0) {
               x.isub(y);
               A.isub(C);
               B.isub(D);
             } else {
               y.isub(x);
               C.isub(A);
               D.isub(B);
             }
           }

           return {
             a: C,
             b: D,
             gcd: y.iushln(g)
           };
         };

         // This is reduced incarnation of the binary EEA
         // above, designated to invert members of the
         // _prime_ fields F(p) at a maximal speed
         BN.prototype._invmp = function _invmp (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var a = this;
           var b = p.clone();

           if (a.negative !== 0) {
             a = a.umod(p);
           } else {
             a = a.clone();
           }

           var x1 = new BN(1);
           var x2 = new BN(0);

           var delta = b.clone();

           while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
             for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               a.iushrn(i);
               while (i-- > 0) {
                 if (x1.isOdd()) {
                   x1.iadd(delta);
                 }

                 x1.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               b.iushrn(j);
               while (j-- > 0) {
                 if (x2.isOdd()) {
                   x2.iadd(delta);
                 }

                 x2.iushrn(1);
               }
             }

             if (a.cmp(b) >= 0) {
               a.isub(b);
               x1.isub(x2);
             } else {
               b.isub(a);
               x2.isub(x1);
             }
           }

           var res;
           if (a.cmpn(1) === 0) {
             res = x1;
           } else {
             res = x2;
           }

           if (res.cmpn(0) < 0) {
             res.iadd(p);
           }

           return res;
         };

         BN.prototype.gcd = function gcd (num) {
           if (this.isZero()) return num.abs();
           if (num.isZero()) return this.abs();

           var a = this.clone();
           var b = num.clone();
           a.negative = 0;
           b.negative = 0;

           // Remove common factor of two
           for (var shift = 0; a.isEven() && b.isEven(); shift++) {
             a.iushrn(1);
             b.iushrn(1);
           }

           do {
             while (a.isEven()) {
               a.iushrn(1);
             }
             while (b.isEven()) {
               b.iushrn(1);
             }

             var r = a.cmp(b);
             if (r < 0) {
               // Swap `a` and `b` to make `a` always bigger than `b`
               var t = a;
               a = b;
               b = t;
             } else if (r === 0 || b.cmpn(1) === 0) {
               break;
             }

             a.isub(b);
           } while (true);

           return b.iushln(shift);
         };

         // Invert number in the field F(num)
         BN.prototype.invm = function invm (num) {
           return this.egcd(num).a.umod(num);
         };

         BN.prototype.isEven = function isEven () {
           return (this.words[0] & 1) === 0;
         };

         BN.prototype.isOdd = function isOdd () {
           return (this.words[0] & 1) === 1;
         };

         // And first word and num
         BN.prototype.andln = function andln (num) {
           return this.words[0] & num;
         };

         // Increment at the bit position in-line
         BN.prototype.bincn = function bincn (bit) {
           assert(typeof bit === 'number');
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) {
             this._expand(s + 1);
             this.words[s] |= q;
             return this;
           }

           // Add bit and propagate, if needed
           var carry = q;
           for (var i = s; carry !== 0 && i < this.length; i++) {
             var w = this.words[i] | 0;
             w += carry;
             carry = w >>> 26;
             w &= 0x3ffffff;
             this.words[i] = w;
           }
           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }
           return this;
         };

         BN.prototype.isZero = function isZero () {
           return this.length === 1 && this.words[0] === 0;
         };

         BN.prototype.cmpn = function cmpn (num) {
           var negative = num < 0;

           if (this.negative !== 0 && !negative) return -1;
           if (this.negative === 0 && negative) return 1;

           this.strip();

           var res;
           if (this.length > 1) {
             res = 1;
           } else {
             if (negative) {
               num = -num;
             }

             assert(num <= 0x3ffffff, 'Number is too big');

             var w = this.words[0] | 0;
             res = w === num ? 0 : w < num ? -1 : 1;
           }
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Compare two numbers and return:
         // 1 - if `this` > `num`
         // 0 - if `this` == `num`
         // -1 - if `this` < `num`
         BN.prototype.cmp = function cmp (num) {
           if (this.negative !== 0 && num.negative === 0) return -1;
           if (this.negative === 0 && num.negative !== 0) return 1;

           var res = this.ucmp(num);
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Unsigned comparison
         BN.prototype.ucmp = function ucmp (num) {
           // At this point both numbers have the same sign
           if (this.length > num.length) return 1;
           if (this.length < num.length) return -1;

           var res = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var a = this.words[i] | 0;
             var b = num.words[i] | 0;

             if (a === b) continue;
             if (a < b) {
               res = -1;
             } else if (a > b) {
               res = 1;
             }
             break;
           }
           return res;
         };

         BN.prototype.gtn = function gtn (num) {
           return this.cmpn(num) === 1;
         };

         BN.prototype.gt = function gt (num) {
           return this.cmp(num) === 1;
         };

         BN.prototype.gten = function gten (num) {
           return this.cmpn(num) >= 0;
         };

         BN.prototype.gte = function gte (num) {
           return this.cmp(num) >= 0;
         };

         BN.prototype.ltn = function ltn (num) {
           return this.cmpn(num) === -1;
         };

         BN.prototype.lt = function lt (num) {
           return this.cmp(num) === -1;
         };

         BN.prototype.lten = function lten (num) {
           return this.cmpn(num) <= 0;
         };

         BN.prototype.lte = function lte (num) {
           return this.cmp(num) <= 0;
         };

         BN.prototype.eqn = function eqn (num) {
           return this.cmpn(num) === 0;
         };

         BN.prototype.eq = function eq (num) {
           return this.cmp(num) === 0;
         };

         //
         // A reduce context, could be using montgomery or something better, depending
         // on the `m` itself.
         //
         BN.red = function red (num) {
           return new Red(num);
         };

         BN.prototype.toRed = function toRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           assert(this.negative === 0, 'red works only with positives');
           return ctx.convertTo(this)._forceRed(ctx);
         };

         BN.prototype.fromRed = function fromRed () {
           assert(this.red, 'fromRed works only with numbers in reduction context');
           return this.red.convertFrom(this);
         };

         BN.prototype._forceRed = function _forceRed (ctx) {
           this.red = ctx;
           return this;
         };

         BN.prototype.forceRed = function forceRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           return this._forceRed(ctx);
         };

         BN.prototype.redAdd = function redAdd (num) {
           assert(this.red, 'redAdd works only with red numbers');
           return this.red.add(this, num);
         };

         BN.prototype.redIAdd = function redIAdd (num) {
           assert(this.red, 'redIAdd works only with red numbers');
           return this.red.iadd(this, num);
         };

         BN.prototype.redSub = function redSub (num) {
           assert(this.red, 'redSub works only with red numbers');
           return this.red.sub(this, num);
         };

         BN.prototype.redISub = function redISub (num) {
           assert(this.red, 'redISub works only with red numbers');
           return this.red.isub(this, num);
         };

         BN.prototype.redShl = function redShl (num) {
           assert(this.red, 'redShl works only with red numbers');
           return this.red.shl(this, num);
         };

         BN.prototype.redMul = function redMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.mul(this, num);
         };

         BN.prototype.redIMul = function redIMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.imul(this, num);
         };

         BN.prototype.redSqr = function redSqr () {
           assert(this.red, 'redSqr works only with red numbers');
           this.red._verify1(this);
           return this.red.sqr(this);
         };

         BN.prototype.redISqr = function redISqr () {
           assert(this.red, 'redISqr works only with red numbers');
           this.red._verify1(this);
           return this.red.isqr(this);
         };

         // Square root over p
         BN.prototype.redSqrt = function redSqrt () {
           assert(this.red, 'redSqrt works only with red numbers');
           this.red._verify1(this);
           return this.red.sqrt(this);
         };

         BN.prototype.redInvm = function redInvm () {
           assert(this.red, 'redInvm works only with red numbers');
           this.red._verify1(this);
           return this.red.invm(this);
         };

         // Return negative clone of `this` % `red modulo`
         BN.prototype.redNeg = function redNeg () {
           assert(this.red, 'redNeg works only with red numbers');
           this.red._verify1(this);
           return this.red.neg(this);
         };

         BN.prototype.redPow = function redPow (num) {
           assert(this.red && !num.red, 'redPow(normalNum)');
           this.red._verify1(this);
           return this.red.pow(this, num);
         };

         // Prime numbers with efficient reduction
         var primes = {
           k256: null,
           p224: null,
           p192: null,
           p25519: null
         };

         // Pseudo-Mersenne prime
         function MPrime (name, p) {
           // P = 2 ^ N - K
           this.name = name;
           this.p = new BN(p, 16);
           this.n = this.p.bitLength();
           this.k = new BN(1).iushln(this.n).isub(this.p);

           this.tmp = this._tmp();
         }

         MPrime.prototype._tmp = function _tmp () {
           var tmp = new BN(null);
           tmp.words = new Array(Math.ceil(this.n / 13));
           return tmp;
         };

         MPrime.prototype.ireduce = function ireduce (num) {
           // Assumes that `num` is less than `P^2`
           // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
           var r = num;
           var rlen;

           do {
             this.split(r, this.tmp);
             r = this.imulK(r);
             r = r.iadd(this.tmp);
             rlen = r.bitLength();
           } while (rlen > this.n);

           var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
           if (cmp === 0) {
             r.words[0] = 0;
             r.length = 1;
           } else if (cmp > 0) {
             r.isub(this.p);
           } else {
             r.strip();
           }

           return r;
         };

         MPrime.prototype.split = function split (input, out) {
           input.iushrn(this.n, 0, out);
         };

         MPrime.prototype.imulK = function imulK (num) {
           return num.imul(this.k);
         };

         function K256 () {
           MPrime.call(
             this,
             'k256',
             'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
         }
         inherits(K256, MPrime);

         K256.prototype.split = function split (input, output) {
           // 256 = 9 * 26 + 22
           var mask = 0x3fffff;

           var outLen = Math.min(input.length, 9);
           for (var i = 0; i < outLen; i++) {
             output.words[i] = input.words[i];
           }
           output.length = outLen;

           if (input.length <= 9) {
             input.words[0] = 0;
             input.length = 1;
             return;
           }

           // Shift by 9 limbs
           var prev = input.words[9];
           output.words[output.length++] = prev & mask;

           for (i = 10; i < input.length; i++) {
             var next = input.words[i] | 0;
             input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
             prev = next;
           }
           prev >>>= 22;
           input.words[i - 10] = prev;
           if (prev === 0 && input.length > 10) {
             input.length -= 10;
           } else {
             input.length -= 9;
           }
         };

         K256.prototype.imulK = function imulK (num) {
           // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
           num.words[num.length] = 0;
           num.words[num.length + 1] = 0;
           num.length += 2;

           // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
           var lo = 0;
           for (var i = 0; i < num.length; i++) {
             var w = num.words[i] | 0;
             lo += w * 0x3d1;
             num.words[i] = lo & 0x3ffffff;
             lo = w * 0x40 + ((lo / 0x4000000) | 0);
           }

           // Fast length reduction
           if (num.words[num.length - 1] === 0) {
             num.length--;
             if (num.words[num.length - 1] === 0) {
               num.length--;
             }
           }
           return num;
         };

         function P224 () {
           MPrime.call(
             this,
             'p224',
             'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
         }
         inherits(P224, MPrime);

         function P192 () {
           MPrime.call(
             this,
             'p192',
             'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
         }
         inherits(P192, MPrime);

         function P25519 () {
           // 2 ^ 255 - 19
           MPrime.call(
             this,
             '25519',
             '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
         }
         inherits(P25519, MPrime);

         P25519.prototype.imulK = function imulK (num) {
           // K = 0x13
           var carry = 0;
           for (var i = 0; i < num.length; i++) {
             var hi = (num.words[i] | 0) * 0x13 + carry;
             var lo = hi & 0x3ffffff;
             hi >>>= 26;

             num.words[i] = lo;
             carry = hi;
           }
           if (carry !== 0) {
             num.words[num.length++] = carry;
           }
           return num;
         };

         // Exported mostly for testing purposes, use plain name instead
         BN._prime = function prime (name) {
           // Cached version of prime
           if (primes[name]) return primes[name];

           var prime;
           if (name === 'k256') {
             prime = new K256();
           } else if (name === 'p224') {
             prime = new P224();
           } else if (name === 'p192') {
             prime = new P192();
           } else if (name === 'p25519') {
             prime = new P25519();
           } else {
             throw new Error('Unknown prime ' + name);
           }
           primes[name] = prime;

           return prime;
         };

         //
         // Base reduction engine
         //
         function Red (m) {
           if (typeof m === 'string') {
             var prime = BN._prime(m);
             this.m = prime.p;
             this.prime = prime;
           } else {
             assert(m.gtn(1), 'modulus must be greater than 1');
             this.m = m;
             this.prime = null;
           }
         }

         Red.prototype._verify1 = function _verify1 (a) {
           assert(a.negative === 0, 'red works only with positives');
           assert(a.red, 'red works only with red numbers');
         };

         Red.prototype._verify2 = function _verify2 (a, b) {
           assert((a.negative | b.negative) === 0, 'red works only with positives');
           assert(a.red && a.red === b.red,
             'red works only with red numbers');
         };

         Red.prototype.imod = function imod (a) {
           if (this.prime) return this.prime.ireduce(a)._forceRed(this);
           return a.umod(this.m)._forceRed(this);
         };

         Red.prototype.neg = function neg (a) {
           if (a.isZero()) {
             return a.clone();
           }

           return this.m.sub(a)._forceRed(this);
         };

         Red.prototype.add = function add (a, b) {
           this._verify2(a, b);

           var res = a.add(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.iadd = function iadd (a, b) {
           this._verify2(a, b);

           var res = a.iadd(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res;
         };

         Red.prototype.sub = function sub (a, b) {
           this._verify2(a, b);

           var res = a.sub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.isub = function isub (a, b) {
           this._verify2(a, b);

           var res = a.isub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res;
         };

         Red.prototype.shl = function shl (a, num) {
           this._verify1(a);
           return this.imod(a.ushln(num));
         };

         Red.prototype.imul = function imul (a, b) {
           this._verify2(a, b);
           return this.imod(a.imul(b));
         };

         Red.prototype.mul = function mul (a, b) {
           this._verify2(a, b);
           return this.imod(a.mul(b));
         };

         Red.prototype.isqr = function isqr (a) {
           return this.imul(a, a.clone());
         };

         Red.prototype.sqr = function sqr (a) {
           return this.mul(a, a);
         };

         Red.prototype.sqrt = function sqrt (a) {
           if (a.isZero()) return a.clone();

           var mod3 = this.m.andln(3);
           assert(mod3 % 2 === 1);

           // Fast case
           if (mod3 === 3) {
             var pow = this.m.add(new BN(1)).iushrn(2);
             return this.pow(a, pow);
           }

           // Tonelli-Shanks algorithm (Totally unoptimized and slow)
           //
           // Find Q and S, that Q * 2 ^ S = (P - 1)
           var q = this.m.subn(1);
           var s = 0;
           while (!q.isZero() && q.andln(1) === 0) {
             s++;
             q.iushrn(1);
           }
           assert(!q.isZero());

           var one = new BN(1).toRed(this);
           var nOne = one.redNeg();

           // Find quadratic non-residue
           // NOTE: Max is such because of generalized Riemann hypothesis.
           var lpow = this.m.subn(1).iushrn(1);
           var z = this.m.bitLength();
           z = new BN(2 * z * z).toRed(this);

           while (this.pow(z, lpow).cmp(nOne) !== 0) {
             z.redIAdd(nOne);
           }

           var c = this.pow(z, q);
           var r = this.pow(a, q.addn(1).iushrn(1));
           var t = this.pow(a, q);
           var m = s;
           while (t.cmp(one) !== 0) {
             var tmp = t;
             for (var i = 0; tmp.cmp(one) !== 0; i++) {
               tmp = tmp.redSqr();
             }
             assert(i < m);
             var b = this.pow(c, new BN(1).iushln(m - i - 1));

             r = r.redMul(b);
             c = b.redSqr();
             t = t.redMul(c);
             m = i;
           }

           return r;
         };

         Red.prototype.invm = function invm (a) {
           var inv = a._invmp(this.m);
           if (inv.negative !== 0) {
             inv.negative = 0;
             return this.imod(inv).redNeg();
           } else {
             return this.imod(inv);
           }
         };

         Red.prototype.pow = function pow (a, num) {
           if (num.isZero()) return new BN(1);
           if (num.cmpn(1) === 0) return a.clone();

           var windowSize = 4;
           var wnd = new Array(1 << windowSize);
           wnd[0] = new BN(1).toRed(this);
           wnd[1] = a;
           for (var i = 2; i < wnd.length; i++) {
             wnd[i] = this.mul(wnd[i - 1], a);
           }

           var res = wnd[0];
           var current = 0;
           var currentLen = 0;
           var start = num.bitLength() % 26;
           if (start === 0) {
             start = 26;
           }

           for (i = num.length - 1; i >= 0; i--) {
             var word = num.words[i];
             for (var j = start - 1; j >= 0; j--) {
               var bit = (word >> j) & 1;
               if (res !== wnd[0]) {
                 res = this.sqr(res);
               }

               if (bit === 0 && current === 0) {
                 currentLen = 0;
                 continue;
               }

               current <<= 1;
               current |= bit;
               currentLen++;
               if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

               res = this.mul(res, wnd[current]);
               currentLen = 0;
               current = 0;
             }
             start = 26;
           }

           return res;
         };

         Red.prototype.convertTo = function convertTo (num) {
           var r = num.umod(this.m);

           return r === num ? r.clone() : r;
         };

         Red.prototype.convertFrom = function convertFrom (num) {
           var res = num.clone();
           res.red = null;
           return res;
         };

         //
         // Montgomery method engine
         //

         BN.mont = function mont (num) {
           return new Mont(num);
         };

         function Mont (m) {
           Red.call(this, m);

           this.shift = this.m.bitLength();
           if (this.shift % 26 !== 0) {
             this.shift += 26 - (this.shift % 26);
           }

           this.r = new BN(1).iushln(this.shift);
           this.r2 = this.imod(this.r.sqr());
           this.rinv = this.r._invmp(this.m);

           this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
           this.minv = this.minv.umod(this.r);
           this.minv = this.r.sub(this.minv);
         }
         inherits(Mont, Red);

         Mont.prototype.convertTo = function convertTo (num) {
           return this.imod(num.ushln(this.shift));
         };

         Mont.prototype.convertFrom = function convertFrom (num) {
           var r = this.imod(num.mul(this.rinv));
           r.red = null;
           return r;
         };

         Mont.prototype.imul = function imul (a, b) {
           if (a.isZero() || b.isZero()) {
             a.words[0] = 0;
             a.length = 1;
             return a;
           }

           var t = a.imul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;

           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.mul = function mul (a, b) {
           if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

           var t = a.mul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;
           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.invm = function invm (a) {
           // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
           var res = this.imod(a._invmp(this.m).mul(this.r2));
           return res._forceRed(this);
         };
       })(module, commonjsGlobal);
       });

       var bn$1 = createCommonjsModule(function (module) {
       (function (module, exports) {

         // Utils
         function assert (val, msg) {
           if (!val) throw new Error(msg || 'Assertion failed');
         }

         // Could use `inherits` module, but don't want to move from single file
         // architecture yet.
         function inherits (ctor, superCtor) {
           ctor.super_ = superCtor;
           var TempCtor = function () {};
           TempCtor.prototype = superCtor.prototype;
           ctor.prototype = new TempCtor();
           ctor.prototype.constructor = ctor;
         }

         // BN

         function BN (number, base, endian) {
           if (BN.isBN(number)) {
             return number;
           }

           this.negative = 0;
           this.words = null;
           this.length = 0;

           // Reduction context
           this.red = null;

           if (number !== null) {
             if (base === 'le' || base === 'be') {
               endian = base;
               base = 10;
             }

             this._init(number || 0, base || 10, endian || 'be');
           }
         }
         if (typeof module === 'object') {
           module.exports = BN;
         } else {
           exports.BN = BN;
         }

         BN.BN = BN;
         BN.wordSize = 26;

         var Buffer;
         try {
           Buffer = commonjsRequire('buf' + 'fer').Buffer;
         } catch (e) {
         }

         BN.isBN = function isBN (num) {
           if (num instanceof BN) {
             return true;
           }

           return num !== null && typeof num === 'object' &&
             num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
         };

         BN.max = function max (left, right) {
           if (left.cmp(right) > 0) return left;
           return right;
         };

         BN.min = function min (left, right) {
           if (left.cmp(right) < 0) return left;
           return right;
         };

         BN.prototype._init = function init (number, base, endian) {
           if (typeof number === 'number') {
             return this._initNumber(number, base, endian);
           }

           if (typeof number === 'object') {
             return this._initArray(number, base, endian);
           }

           if (base === 'hex') {
             base = 16;
           }
           assert(base === (base | 0) && base >= 2 && base <= 36);

           number = number.toString().replace(/\s+/g, '');
           var start = 0;
           if (number[0] === '-') {
             start++;
           }

           if (base === 16) {
             this._parseHex(number, start);
           } else {
             this._parseBase(number, base, start);
           }

           if (number[0] === '-') {
             this.negative = 1;
           }

           this.strip();

           if (endian !== 'le') return;

           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initNumber = function _initNumber (number, base, endian) {
           if (number < 0) {
             this.negative = 1;
             number = -number;
           }
           if (number < 0x4000000) {
             this.words = [ number & 0x3ffffff ];
             this.length = 1;
           } else if (number < 0x10000000000000) {
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff
             ];
             this.length = 2;
           } else {
             assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff,
               1
             ];
             this.length = 3;
           }

           if (endian !== 'le') return;

           // Reverse the bytes
           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initArray = function _initArray (number, base, endian) {
           // Perhaps a Uint8Array
           assert(typeof number.length === 'number');
           if (number.length <= 0) {
             this.words = [ 0 ];
             this.length = 1;
             return this;
           }

           this.length = Math.ceil(number.length / 3);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           var off = 0;
           if (endian === 'be') {
             for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
               w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           } else if (endian === 'le') {
             for (i = 0, j = 0; i < number.length; i += 3) {
               w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           }
           return this.strip();
         };

         function parseHex (str, start, end) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r <<= 4;

             // 'a' - 'f'
             if (c >= 49 && c <= 54) {
               r |= c - 49 + 0xa;

             // 'A' - 'F'
             } else if (c >= 17 && c <= 22) {
               r |= c - 17 + 0xa;

             // '0' - '9'
             } else {
               r |= c & 0xf;
             }
           }
           return r;
         }

         BN.prototype._parseHex = function _parseHex (number, start) {
           // Create possibly bigger array to ensure that it fits the number
           this.length = Math.ceil((number.length - start) / 6);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           // Scan 24-bit chunks and add them to the number
           var off = 0;
           for (i = number.length - 6, j = 0; i >= start; i -= 6) {
             w = parseHex(number, i, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
             off += 24;
             if (off >= 26) {
               off -= 26;
               j++;
             }
           }
           if (i + 6 !== start) {
             w = parseHex(number, start, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
           }
           this.strip();
         };

         function parseBase (str, start, end, mul) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r *= mul;

             // 'a'
             if (c >= 49) {
               r += c - 49 + 0xa;

             // 'A'
             } else if (c >= 17) {
               r += c - 17 + 0xa;

             // '0' - '9'
             } else {
               r += c;
             }
           }
           return r;
         }

         BN.prototype._parseBase = function _parseBase (number, base, start) {
           // Initialize as zero
           this.words = [ 0 ];
           this.length = 1;

           // Find length of limb in base
           for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
             limbLen++;
           }
           limbLen--;
           limbPow = (limbPow / base) | 0;

           var total = number.length - start;
           var mod = total % limbLen;
           var end = Math.min(total, total - mod) + start;

           var word = 0;
           for (var i = start; i < end; i += limbLen) {
             word = parseBase(number, i, i + limbLen, base);

             this.imuln(limbPow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }

           if (mod !== 0) {
             var pow = 1;
             word = parseBase(number, i, number.length, base);

             for (i = 0; i < mod; i++) {
               pow *= base;
             }

             this.imuln(pow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }
         };

         BN.prototype.copy = function copy (dest) {
           dest.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             dest.words[i] = this.words[i];
           }
           dest.length = this.length;
           dest.negative = this.negative;
           dest.red = this.red;
         };

         BN.prototype.clone = function clone () {
           var r = new BN(null);
           this.copy(r);
           return r;
         };

         BN.prototype._expand = function _expand (size) {
           while (this.length < size) {
             this.words[this.length++] = 0;
           }
           return this;
         };

         // Remove leading `0` from `this`
         BN.prototype.strip = function strip () {
           while (this.length > 1 && this.words[this.length - 1] === 0) {
             this.length--;
           }
           return this._normSign();
         };

         BN.prototype._normSign = function _normSign () {
           // -0 = 0
           if (this.length === 1 && this.words[0] === 0) {
             this.negative = 0;
           }
           return this;
         };

         BN.prototype.inspect = function inspect () {
           return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
         };

         /*

         var zeros = [];
         var groupSizes = [];
         var groupBases = [];

         var s = '';
         var i = -1;
         while (++i < BN.wordSize) {
           zeros[i] = s;
           s += '0';
         }
         groupSizes[0] = 0;
         groupSizes[1] = 0;
         groupBases[0] = 0;
         groupBases[1] = 0;
         var base = 2 - 1;
         while (++base < 36 + 1) {
           var groupSize = 0;
           var groupBase = 1;
           while (groupBase < (1 << BN.wordSize) / base) {
             groupBase *= base;
             groupSize += 1;
           }
           groupSizes[base] = groupSize;
           groupBases[base] = groupBase;
         }

         */

         var zeros = [
           '',
           '0',
           '00',
           '000',
           '0000',
           '00000',
           '000000',
           '0000000',
           '00000000',
           '000000000',
           '0000000000',
           '00000000000',
           '000000000000',
           '0000000000000',
           '00000000000000',
           '000000000000000',
           '0000000000000000',
           '00000000000000000',
           '000000000000000000',
           '0000000000000000000',
           '00000000000000000000',
           '000000000000000000000',
           '0000000000000000000000',
           '00000000000000000000000',
           '000000000000000000000000',
           '0000000000000000000000000'
         ];

         var groupSizes = [
           0, 0,
           25, 16, 12, 11, 10, 9, 8,
           8, 7, 7, 7, 7, 6, 6,
           6, 6, 6, 6, 6, 5, 5,
           5, 5, 5, 5, 5, 5, 5,
           5, 5, 5, 5, 5, 5, 5
         ];

         var groupBases = [
           0, 0,
           33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
           43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
           16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
           6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
           24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
         ];

         BN.prototype.toString = function toString (base, padding) {
           base = base || 10;
           padding = padding | 0 || 1;

           var out;
           if (base === 16 || base === 'hex') {
             out = '';
             var off = 0;
             var carry = 0;
             for (var i = 0; i < this.length; i++) {
               var w = this.words[i];
               var word = (((w << off) | carry) & 0xffffff).toString(16);
               carry = (w >>> (24 - off)) & 0xffffff;
               if (carry !== 0 || i !== this.length - 1) {
                 out = zeros[6 - word.length] + word + out;
               } else {
                 out = word + out;
               }
               off += 2;
               if (off >= 26) {
                 off -= 26;
                 i--;
               }
             }
             if (carry !== 0) {
               out = carry.toString(16) + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           if (base === (base | 0) && base >= 2 && base <= 36) {
             // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
             var groupSize = groupSizes[base];
             // var groupBase = Math.pow(base, groupSize);
             var groupBase = groupBases[base];
             out = '';
             var c = this.clone();
             c.negative = 0;
             while (!c.isZero()) {
               var r = c.modn(groupBase).toString(base);
               c = c.idivn(groupBase);

               if (!c.isZero()) {
                 out = zeros[groupSize - r.length] + r + out;
               } else {
                 out = r + out;
               }
             }
             if (this.isZero()) {
               out = '0' + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           assert(false, 'Base should be between 2 and 36');
         };

         BN.prototype.toNumber = function toNumber () {
           var ret = this.words[0];
           if (this.length === 2) {
             ret += this.words[1] * 0x4000000;
           } else if (this.length === 3 && this.words[2] === 0x01) {
             // NOTE: at this stage it is known that the top bit is set
             ret += 0x10000000000000 + (this.words[1] * 0x4000000);
           } else if (this.length > 2) {
             assert(false, 'Number can only safely store up to 53 bits');
           }
           return (this.negative !== 0) ? -ret : ret;
         };

         BN.prototype.toJSON = function toJSON () {
           return this.toString(16);
         };

         BN.prototype.toBuffer = function toBuffer (endian, length) {
           assert(typeof Buffer !== 'undefined');
           return this.toArrayLike(Buffer, endian, length);
         };

         BN.prototype.toArray = function toArray (endian, length) {
           return this.toArrayLike(Array, endian, length);
         };

         BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
           var byteLength = this.byteLength();
           var reqLength = length || Math.max(1, byteLength);
           assert(byteLength <= reqLength, 'byte array longer than desired length');
           assert(reqLength > 0, 'Requested array length <= 0');

           this.strip();
           var littleEndian = endian === 'le';
           var res = new ArrayType(reqLength);

           var b, i;
           var q = this.clone();
           if (!littleEndian) {
             // Assume big-endian
             for (i = 0; i < reqLength - byteLength; i++) {
               res[i] = 0;
             }

             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[reqLength - i - 1] = b;
             }
           } else {
             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[i] = b;
             }

             for (; i < reqLength; i++) {
               res[i] = 0;
             }
           }

           return res;
         };

         if (Math.clz32) {
           BN.prototype._countBits = function _countBits (w) {
             return 32 - Math.clz32(w);
           };
         } else {
           BN.prototype._countBits = function _countBits (w) {
             var t = w;
             var r = 0;
             if (t >= 0x1000) {
               r += 13;
               t >>>= 13;
             }
             if (t >= 0x40) {
               r += 7;
               t >>>= 7;
             }
             if (t >= 0x8) {
               r += 4;
               t >>>= 4;
             }
             if (t >= 0x02) {
               r += 2;
               t >>>= 2;
             }
             return r + t;
           };
         }

         BN.prototype._zeroBits = function _zeroBits (w) {
           // Short-cut
           if (w === 0) return 26;

           var t = w;
           var r = 0;
           if ((t & 0x1fff) === 0) {
             r += 13;
             t >>>= 13;
           }
           if ((t & 0x7f) === 0) {
             r += 7;
             t >>>= 7;
           }
           if ((t & 0xf) === 0) {
             r += 4;
             t >>>= 4;
           }
           if ((t & 0x3) === 0) {
             r += 2;
             t >>>= 2;
           }
           if ((t & 0x1) === 0) {
             r++;
           }
           return r;
         };

         // Return number of used bits in a BN
         BN.prototype.bitLength = function bitLength () {
           var w = this.words[this.length - 1];
           var hi = this._countBits(w);
           return (this.length - 1) * 26 + hi;
         };

         function toBitArray (num) {
           var w = new Array(num.bitLength());

           for (var bit = 0; bit < w.length; bit++) {
             var off = (bit / 26) | 0;
             var wbit = bit % 26;

             w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
           }

           return w;
         }

         // Number of trailing zero bits
         BN.prototype.zeroBits = function zeroBits () {
           if (this.isZero()) return 0;

           var r = 0;
           for (var i = 0; i < this.length; i++) {
             var b = this._zeroBits(this.words[i]);
             r += b;
             if (b !== 26) break;
           }
           return r;
         };

         BN.prototype.byteLength = function byteLength () {
           return Math.ceil(this.bitLength() / 8);
         };

         BN.prototype.toTwos = function toTwos (width) {
           if (this.negative !== 0) {
             return this.abs().inotn(width).iaddn(1);
           }
           return this.clone();
         };

         BN.prototype.fromTwos = function fromTwos (width) {
           if (this.testn(width - 1)) {
             return this.notn(width).iaddn(1).ineg();
           }
           return this.clone();
         };

         BN.prototype.isNeg = function isNeg () {
           return this.negative !== 0;
         };

         // Return negative clone of `this`
         BN.prototype.neg = function neg () {
           return this.clone().ineg();
         };

         BN.prototype.ineg = function ineg () {
           if (!this.isZero()) {
             this.negative ^= 1;
           }

           return this;
         };

         // Or `num` with `this` in-place
         BN.prototype.iuor = function iuor (num) {
           while (this.length < num.length) {
             this.words[this.length++] = 0;
           }

           for (var i = 0; i < num.length; i++) {
             this.words[i] = this.words[i] | num.words[i];
           }

           return this.strip();
         };

         BN.prototype.ior = function ior (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuor(num);
         };

         // Or `num` with `this`
         BN.prototype.or = function or (num) {
           if (this.length > num.length) return this.clone().ior(num);
           return num.clone().ior(this);
         };

         BN.prototype.uor = function uor (num) {
           if (this.length > num.length) return this.clone().iuor(num);
           return num.clone().iuor(this);
         };

         // And `num` with `this` in-place
         BN.prototype.iuand = function iuand (num) {
           // b = min-length(num, this)
           var b;
           if (this.length > num.length) {
             b = num;
           } else {
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = this.words[i] & num.words[i];
           }

           this.length = b.length;

           return this.strip();
         };

         BN.prototype.iand = function iand (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuand(num);
         };

         // And `num` with `this`
         BN.prototype.and = function and (num) {
           if (this.length > num.length) return this.clone().iand(num);
           return num.clone().iand(this);
         };

         BN.prototype.uand = function uand (num) {
           if (this.length > num.length) return this.clone().iuand(num);
           return num.clone().iuand(this);
         };

         // Xor `num` with `this` in-place
         BN.prototype.iuxor = function iuxor (num) {
           // a.length > b.length
           var a;
           var b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = a.words[i] ^ b.words[i];
           }

           if (this !== a) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = a.length;

           return this.strip();
         };

         BN.prototype.ixor = function ixor (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuxor(num);
         };

         // Xor `num` with `this`
         BN.prototype.xor = function xor (num) {
           if (this.length > num.length) return this.clone().ixor(num);
           return num.clone().ixor(this);
         };

         BN.prototype.uxor = function uxor (num) {
           if (this.length > num.length) return this.clone().iuxor(num);
           return num.clone().iuxor(this);
         };

         // Not ``this`` with ``width`` bitwidth
         BN.prototype.inotn = function inotn (width) {
           assert(typeof width === 'number' && width >= 0);

           var bytesNeeded = Math.ceil(width / 26) | 0;
           var bitsLeft = width % 26;

           // Extend the buffer with leading zeroes
           this._expand(bytesNeeded);

           if (bitsLeft > 0) {
             bytesNeeded--;
           }

           // Handle complete words
           for (var i = 0; i < bytesNeeded; i++) {
             this.words[i] = ~this.words[i] & 0x3ffffff;
           }

           // Handle the residue
           if (bitsLeft > 0) {
             this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
           }

           // And remove leading zeroes
           return this.strip();
         };

         BN.prototype.notn = function notn (width) {
           return this.clone().inotn(width);
         };

         // Set `bit` of `this`
         BN.prototype.setn = function setn (bit, val) {
           assert(typeof bit === 'number' && bit >= 0);

           var off = (bit / 26) | 0;
           var wbit = bit % 26;

           this._expand(off + 1);

           if (val) {
             this.words[off] = this.words[off] | (1 << wbit);
           } else {
             this.words[off] = this.words[off] & ~(1 << wbit);
           }

           return this.strip();
         };

         // Add `num` to `this` in-place
         BN.prototype.iadd = function iadd (num) {
           var r;

           // negative + positive
           if (this.negative !== 0 && num.negative === 0) {
             this.negative = 0;
             r = this.isub(num);
             this.negative ^= 1;
             return this._normSign();

           // positive + negative
           } else if (this.negative === 0 && num.negative !== 0) {
             num.negative = 0;
             r = this.isub(num);
             num.negative = 1;
             return r._normSign();
           }

           // a.length > b.length
           var a, b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }

           this.length = a.length;
           if (carry !== 0) {
             this.words[this.length] = carry;
             this.length++;
           // Copy the rest of the words
           } else if (a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           return this;
         };

         // Add `num` to `this`
         BN.prototype.add = function add (num) {
           var res;
           if (num.negative !== 0 && this.negative === 0) {
             num.negative = 0;
             res = this.sub(num);
             num.negative ^= 1;
             return res;
           } else if (num.negative === 0 && this.negative !== 0) {
             this.negative = 0;
             res = num.sub(this);
             this.negative = 1;
             return res;
           }

           if (this.length > num.length) return this.clone().iadd(num);

           return num.clone().iadd(this);
         };

         // Subtract `num` from `this` in-place
         BN.prototype.isub = function isub (num) {
           // this - (-num) = this + num
           if (num.negative !== 0) {
             num.negative = 0;
             var r = this.iadd(num);
             num.negative = 1;
             return r._normSign();

           // -this - num = -(this + num)
           } else if (this.negative !== 0) {
             this.negative = 0;
             this.iadd(num);
             this.negative = 1;
             return this._normSign();
           }

           // At this point both numbers are positive
           var cmp = this.cmp(num);

           // Optimization - zeroify
           if (cmp === 0) {
             this.negative = 0;
             this.length = 1;
             this.words[0] = 0;
             return this;
           }

           // a > b
           var a, b;
           if (cmp > 0) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }

           // Copy rest of the words
           if (carry === 0 && i < a.length && a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = Math.max(this.length, i);

           if (a !== this) {
             this.negative = 1;
           }

           return this.strip();
         };

         // Subtract `num` from `this`
         BN.prototype.sub = function sub (num) {
           return this.clone().isub(num);
         };

         function smallMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           var len = (self.length + num.length) | 0;
           out.length = len;
           len = (len - 1) | 0;

           // Peel one iteration (compiler can't do it, because of code complexity)
           var a = self.words[0] | 0;
           var b = num.words[0] | 0;
           var r = a * b;

           var lo = r & 0x3ffffff;
           var carry = (r / 0x4000000) | 0;
           out.words[0] = lo;

           for (var k = 1; k < len; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = carry >>> 26;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = (k - j) | 0;
               a = self.words[i] | 0;
               b = num.words[j] | 0;
               r = a * b + rword;
               ncarry += (r / 0x4000000) | 0;
               rword = r & 0x3ffffff;
             }
             out.words[k] = rword | 0;
             carry = ncarry | 0;
           }
           if (carry !== 0) {
             out.words[k] = carry | 0;
           } else {
             out.length--;
           }

           return out.strip();
         }

         // TODO(indutny): it may be reasonable to omit it for users who don't need
         // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
         // multiplication (like elliptic secp256k1).
         var comb10MulTo = function comb10MulTo (self, num, out) {
           var a = self.words;
           var b = num.words;
           var o = out.words;
           var c = 0;
           var lo;
           var mid;
           var hi;
           var a0 = a[0] | 0;
           var al0 = a0 & 0x1fff;
           var ah0 = a0 >>> 13;
           var a1 = a[1] | 0;
           var al1 = a1 & 0x1fff;
           var ah1 = a1 >>> 13;
           var a2 = a[2] | 0;
           var al2 = a2 & 0x1fff;
           var ah2 = a2 >>> 13;
           var a3 = a[3] | 0;
           var al3 = a3 & 0x1fff;
           var ah3 = a3 >>> 13;
           var a4 = a[4] | 0;
           var al4 = a4 & 0x1fff;
           var ah4 = a4 >>> 13;
           var a5 = a[5] | 0;
           var al5 = a5 & 0x1fff;
           var ah5 = a5 >>> 13;
           var a6 = a[6] | 0;
           var al6 = a6 & 0x1fff;
           var ah6 = a6 >>> 13;
           var a7 = a[7] | 0;
           var al7 = a7 & 0x1fff;
           var ah7 = a7 >>> 13;
           var a8 = a[8] | 0;
           var al8 = a8 & 0x1fff;
           var ah8 = a8 >>> 13;
           var a9 = a[9] | 0;
           var al9 = a9 & 0x1fff;
           var ah9 = a9 >>> 13;
           var b0 = b[0] | 0;
           var bl0 = b0 & 0x1fff;
           var bh0 = b0 >>> 13;
           var b1 = b[1] | 0;
           var bl1 = b1 & 0x1fff;
           var bh1 = b1 >>> 13;
           var b2 = b[2] | 0;
           var bl2 = b2 & 0x1fff;
           var bh2 = b2 >>> 13;
           var b3 = b[3] | 0;
           var bl3 = b3 & 0x1fff;
           var bh3 = b3 >>> 13;
           var b4 = b[4] | 0;
           var bl4 = b4 & 0x1fff;
           var bh4 = b4 >>> 13;
           var b5 = b[5] | 0;
           var bl5 = b5 & 0x1fff;
           var bh5 = b5 >>> 13;
           var b6 = b[6] | 0;
           var bl6 = b6 & 0x1fff;
           var bh6 = b6 >>> 13;
           var b7 = b[7] | 0;
           var bl7 = b7 & 0x1fff;
           var bh7 = b7 >>> 13;
           var b8 = b[8] | 0;
           var bl8 = b8 & 0x1fff;
           var bh8 = b8 >>> 13;
           var b9 = b[9] | 0;
           var bl9 = b9 & 0x1fff;
           var bh9 = b9 >>> 13;

           out.negative = self.negative ^ num.negative;
           out.length = 19;
           /* k = 0 */
           lo = Math.imul(al0, bl0);
           mid = Math.imul(al0, bh0);
           mid = (mid + Math.imul(ah0, bl0)) | 0;
           hi = Math.imul(ah0, bh0);
           var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
           w0 &= 0x3ffffff;
           /* k = 1 */
           lo = Math.imul(al1, bl0);
           mid = Math.imul(al1, bh0);
           mid = (mid + Math.imul(ah1, bl0)) | 0;
           hi = Math.imul(ah1, bh0);
           lo = (lo + Math.imul(al0, bl1)) | 0;
           mid = (mid + Math.imul(al0, bh1)) | 0;
           mid = (mid + Math.imul(ah0, bl1)) | 0;
           hi = (hi + Math.imul(ah0, bh1)) | 0;
           var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
           w1 &= 0x3ffffff;
           /* k = 2 */
           lo = Math.imul(al2, bl0);
           mid = Math.imul(al2, bh0);
           mid = (mid + Math.imul(ah2, bl0)) | 0;
           hi = Math.imul(ah2, bh0);
           lo = (lo + Math.imul(al1, bl1)) | 0;
           mid = (mid + Math.imul(al1, bh1)) | 0;
           mid = (mid + Math.imul(ah1, bl1)) | 0;
           hi = (hi + Math.imul(ah1, bh1)) | 0;
           lo = (lo + Math.imul(al0, bl2)) | 0;
           mid = (mid + Math.imul(al0, bh2)) | 0;
           mid = (mid + Math.imul(ah0, bl2)) | 0;
           hi = (hi + Math.imul(ah0, bh2)) | 0;
           var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
           w2 &= 0x3ffffff;
           /* k = 3 */
           lo = Math.imul(al3, bl0);
           mid = Math.imul(al3, bh0);
           mid = (mid + Math.imul(ah3, bl0)) | 0;
           hi = Math.imul(ah3, bh0);
           lo = (lo + Math.imul(al2, bl1)) | 0;
           mid = (mid + Math.imul(al2, bh1)) | 0;
           mid = (mid + Math.imul(ah2, bl1)) | 0;
           hi = (hi + Math.imul(ah2, bh1)) | 0;
           lo = (lo + Math.imul(al1, bl2)) | 0;
           mid = (mid + Math.imul(al1, bh2)) | 0;
           mid = (mid + Math.imul(ah1, bl2)) | 0;
           hi = (hi + Math.imul(ah1, bh2)) | 0;
           lo = (lo + Math.imul(al0, bl3)) | 0;
           mid = (mid + Math.imul(al0, bh3)) | 0;
           mid = (mid + Math.imul(ah0, bl3)) | 0;
           hi = (hi + Math.imul(ah0, bh3)) | 0;
           var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
           w3 &= 0x3ffffff;
           /* k = 4 */
           lo = Math.imul(al4, bl0);
           mid = Math.imul(al4, bh0);
           mid = (mid + Math.imul(ah4, bl0)) | 0;
           hi = Math.imul(ah4, bh0);
           lo = (lo + Math.imul(al3, bl1)) | 0;
           mid = (mid + Math.imul(al3, bh1)) | 0;
           mid = (mid + Math.imul(ah3, bl1)) | 0;
           hi = (hi + Math.imul(ah3, bh1)) | 0;
           lo = (lo + Math.imul(al2, bl2)) | 0;
           mid = (mid + Math.imul(al2, bh2)) | 0;
           mid = (mid + Math.imul(ah2, bl2)) | 0;
           hi = (hi + Math.imul(ah2, bh2)) | 0;
           lo = (lo + Math.imul(al1, bl3)) | 0;
           mid = (mid + Math.imul(al1, bh3)) | 0;
           mid = (mid + Math.imul(ah1, bl3)) | 0;
           hi = (hi + Math.imul(ah1, bh3)) | 0;
           lo = (lo + Math.imul(al0, bl4)) | 0;
           mid = (mid + Math.imul(al0, bh4)) | 0;
           mid = (mid + Math.imul(ah0, bl4)) | 0;
           hi = (hi + Math.imul(ah0, bh4)) | 0;
           var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
           w4 &= 0x3ffffff;
           /* k = 5 */
           lo = Math.imul(al5, bl0);
           mid = Math.imul(al5, bh0);
           mid = (mid + Math.imul(ah5, bl0)) | 0;
           hi = Math.imul(ah5, bh0);
           lo = (lo + Math.imul(al4, bl1)) | 0;
           mid = (mid + Math.imul(al4, bh1)) | 0;
           mid = (mid + Math.imul(ah4, bl1)) | 0;
           hi = (hi + Math.imul(ah4, bh1)) | 0;
           lo = (lo + Math.imul(al3, bl2)) | 0;
           mid = (mid + Math.imul(al3, bh2)) | 0;
           mid = (mid + Math.imul(ah3, bl2)) | 0;
           hi = (hi + Math.imul(ah3, bh2)) | 0;
           lo = (lo + Math.imul(al2, bl3)) | 0;
           mid = (mid + Math.imul(al2, bh3)) | 0;
           mid = (mid + Math.imul(ah2, bl3)) | 0;
           hi = (hi + Math.imul(ah2, bh3)) | 0;
           lo = (lo + Math.imul(al1, bl4)) | 0;
           mid = (mid + Math.imul(al1, bh4)) | 0;
           mid = (mid + Math.imul(ah1, bl4)) | 0;
           hi = (hi + Math.imul(ah1, bh4)) | 0;
           lo = (lo + Math.imul(al0, bl5)) | 0;
           mid = (mid + Math.imul(al0, bh5)) | 0;
           mid = (mid + Math.imul(ah0, bl5)) | 0;
           hi = (hi + Math.imul(ah0, bh5)) | 0;
           var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
           w5 &= 0x3ffffff;
           /* k = 6 */
           lo = Math.imul(al6, bl0);
           mid = Math.imul(al6, bh0);
           mid = (mid + Math.imul(ah6, bl0)) | 0;
           hi = Math.imul(ah6, bh0);
           lo = (lo + Math.imul(al5, bl1)) | 0;
           mid = (mid + Math.imul(al5, bh1)) | 0;
           mid = (mid + Math.imul(ah5, bl1)) | 0;
           hi = (hi + Math.imul(ah5, bh1)) | 0;
           lo = (lo + Math.imul(al4, bl2)) | 0;
           mid = (mid + Math.imul(al4, bh2)) | 0;
           mid = (mid + Math.imul(ah4, bl2)) | 0;
           hi = (hi + Math.imul(ah4, bh2)) | 0;
           lo = (lo + Math.imul(al3, bl3)) | 0;
           mid = (mid + Math.imul(al3, bh3)) | 0;
           mid = (mid + Math.imul(ah3, bl3)) | 0;
           hi = (hi + Math.imul(ah3, bh3)) | 0;
           lo = (lo + Math.imul(al2, bl4)) | 0;
           mid = (mid + Math.imul(al2, bh4)) | 0;
           mid = (mid + Math.imul(ah2, bl4)) | 0;
           hi = (hi + Math.imul(ah2, bh4)) | 0;
           lo = (lo + Math.imul(al1, bl5)) | 0;
           mid = (mid + Math.imul(al1, bh5)) | 0;
           mid = (mid + Math.imul(ah1, bl5)) | 0;
           hi = (hi + Math.imul(ah1, bh5)) | 0;
           lo = (lo + Math.imul(al0, bl6)) | 0;
           mid = (mid + Math.imul(al0, bh6)) | 0;
           mid = (mid + Math.imul(ah0, bl6)) | 0;
           hi = (hi + Math.imul(ah0, bh6)) | 0;
           var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
           w6 &= 0x3ffffff;
           /* k = 7 */
           lo = Math.imul(al7, bl0);
           mid = Math.imul(al7, bh0);
           mid = (mid + Math.imul(ah7, bl0)) | 0;
           hi = Math.imul(ah7, bh0);
           lo = (lo + Math.imul(al6, bl1)) | 0;
           mid = (mid + Math.imul(al6, bh1)) | 0;
           mid = (mid + Math.imul(ah6, bl1)) | 0;
           hi = (hi + Math.imul(ah6, bh1)) | 0;
           lo = (lo + Math.imul(al5, bl2)) | 0;
           mid = (mid + Math.imul(al5, bh2)) | 0;
           mid = (mid + Math.imul(ah5, bl2)) | 0;
           hi = (hi + Math.imul(ah5, bh2)) | 0;
           lo = (lo + Math.imul(al4, bl3)) | 0;
           mid = (mid + Math.imul(al4, bh3)) | 0;
           mid = (mid + Math.imul(ah4, bl3)) | 0;
           hi = (hi + Math.imul(ah4, bh3)) | 0;
           lo = (lo + Math.imul(al3, bl4)) | 0;
           mid = (mid + Math.imul(al3, bh4)) | 0;
           mid = (mid + Math.imul(ah3, bl4)) | 0;
           hi = (hi + Math.imul(ah3, bh4)) | 0;
           lo = (lo + Math.imul(al2, bl5)) | 0;
           mid = (mid + Math.imul(al2, bh5)) | 0;
           mid = (mid + Math.imul(ah2, bl5)) | 0;
           hi = (hi + Math.imul(ah2, bh5)) | 0;
           lo = (lo + Math.imul(al1, bl6)) | 0;
           mid = (mid + Math.imul(al1, bh6)) | 0;
           mid = (mid + Math.imul(ah1, bl6)) | 0;
           hi = (hi + Math.imul(ah1, bh6)) | 0;
           lo = (lo + Math.imul(al0, bl7)) | 0;
           mid = (mid + Math.imul(al0, bh7)) | 0;
           mid = (mid + Math.imul(ah0, bl7)) | 0;
           hi = (hi + Math.imul(ah0, bh7)) | 0;
           var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
           w7 &= 0x3ffffff;
           /* k = 8 */
           lo = Math.imul(al8, bl0);
           mid = Math.imul(al8, bh0);
           mid = (mid + Math.imul(ah8, bl0)) | 0;
           hi = Math.imul(ah8, bh0);
           lo = (lo + Math.imul(al7, bl1)) | 0;
           mid = (mid + Math.imul(al7, bh1)) | 0;
           mid = (mid + Math.imul(ah7, bl1)) | 0;
           hi = (hi + Math.imul(ah7, bh1)) | 0;
           lo = (lo + Math.imul(al6, bl2)) | 0;
           mid = (mid + Math.imul(al6, bh2)) | 0;
           mid = (mid + Math.imul(ah6, bl2)) | 0;
           hi = (hi + Math.imul(ah6, bh2)) | 0;
           lo = (lo + Math.imul(al5, bl3)) | 0;
           mid = (mid + Math.imul(al5, bh3)) | 0;
           mid = (mid + Math.imul(ah5, bl3)) | 0;
           hi = (hi + Math.imul(ah5, bh3)) | 0;
           lo = (lo + Math.imul(al4, bl4)) | 0;
           mid = (mid + Math.imul(al4, bh4)) | 0;
           mid = (mid + Math.imul(ah4, bl4)) | 0;
           hi = (hi + Math.imul(ah4, bh4)) | 0;
           lo = (lo + Math.imul(al3, bl5)) | 0;
           mid = (mid + Math.imul(al3, bh5)) | 0;
           mid = (mid + Math.imul(ah3, bl5)) | 0;
           hi = (hi + Math.imul(ah3, bh5)) | 0;
           lo = (lo + Math.imul(al2, bl6)) | 0;
           mid = (mid + Math.imul(al2, bh6)) | 0;
           mid = (mid + Math.imul(ah2, bl6)) | 0;
           hi = (hi + Math.imul(ah2, bh6)) | 0;
           lo = (lo + Math.imul(al1, bl7)) | 0;
           mid = (mid + Math.imul(al1, bh7)) | 0;
           mid = (mid + Math.imul(ah1, bl7)) | 0;
           hi = (hi + Math.imul(ah1, bh7)) | 0;
           lo = (lo + Math.imul(al0, bl8)) | 0;
           mid = (mid + Math.imul(al0, bh8)) | 0;
           mid = (mid + Math.imul(ah0, bl8)) | 0;
           hi = (hi + Math.imul(ah0, bh8)) | 0;
           var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
           w8 &= 0x3ffffff;
           /* k = 9 */
           lo = Math.imul(al9, bl0);
           mid = Math.imul(al9, bh0);
           mid = (mid + Math.imul(ah9, bl0)) | 0;
           hi = Math.imul(ah9, bh0);
           lo = (lo + Math.imul(al8, bl1)) | 0;
           mid = (mid + Math.imul(al8, bh1)) | 0;
           mid = (mid + Math.imul(ah8, bl1)) | 0;
           hi = (hi + Math.imul(ah8, bh1)) | 0;
           lo = (lo + Math.imul(al7, bl2)) | 0;
           mid = (mid + Math.imul(al7, bh2)) | 0;
           mid = (mid + Math.imul(ah7, bl2)) | 0;
           hi = (hi + Math.imul(ah7, bh2)) | 0;
           lo = (lo + Math.imul(al6, bl3)) | 0;
           mid = (mid + Math.imul(al6, bh3)) | 0;
           mid = (mid + Math.imul(ah6, bl3)) | 0;
           hi = (hi + Math.imul(ah6, bh3)) | 0;
           lo = (lo + Math.imul(al5, bl4)) | 0;
           mid = (mid + Math.imul(al5, bh4)) | 0;
           mid = (mid + Math.imul(ah5, bl4)) | 0;
           hi = (hi + Math.imul(ah5, bh4)) | 0;
           lo = (lo + Math.imul(al4, bl5)) | 0;
           mid = (mid + Math.imul(al4, bh5)) | 0;
           mid = (mid + Math.imul(ah4, bl5)) | 0;
           hi = (hi + Math.imul(ah4, bh5)) | 0;
           lo = (lo + Math.imul(al3, bl6)) | 0;
           mid = (mid + Math.imul(al3, bh6)) | 0;
           mid = (mid + Math.imul(ah3, bl6)) | 0;
           hi = (hi + Math.imul(ah3, bh6)) | 0;
           lo = (lo + Math.imul(al2, bl7)) | 0;
           mid = (mid + Math.imul(al2, bh7)) | 0;
           mid = (mid + Math.imul(ah2, bl7)) | 0;
           hi = (hi + Math.imul(ah2, bh7)) | 0;
           lo = (lo + Math.imul(al1, bl8)) | 0;
           mid = (mid + Math.imul(al1, bh8)) | 0;
           mid = (mid + Math.imul(ah1, bl8)) | 0;
           hi = (hi + Math.imul(ah1, bh8)) | 0;
           lo = (lo + Math.imul(al0, bl9)) | 0;
           mid = (mid + Math.imul(al0, bh9)) | 0;
           mid = (mid + Math.imul(ah0, bl9)) | 0;
           hi = (hi + Math.imul(ah0, bh9)) | 0;
           var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
           w9 &= 0x3ffffff;
           /* k = 10 */
           lo = Math.imul(al9, bl1);
           mid = Math.imul(al9, bh1);
           mid = (mid + Math.imul(ah9, bl1)) | 0;
           hi = Math.imul(ah9, bh1);
           lo = (lo + Math.imul(al8, bl2)) | 0;
           mid = (mid + Math.imul(al8, bh2)) | 0;
           mid = (mid + Math.imul(ah8, bl2)) | 0;
           hi = (hi + Math.imul(ah8, bh2)) | 0;
           lo = (lo + Math.imul(al7, bl3)) | 0;
           mid = (mid + Math.imul(al7, bh3)) | 0;
           mid = (mid + Math.imul(ah7, bl3)) | 0;
           hi = (hi + Math.imul(ah7, bh3)) | 0;
           lo = (lo + Math.imul(al6, bl4)) | 0;
           mid = (mid + Math.imul(al6, bh4)) | 0;
           mid = (mid + Math.imul(ah6, bl4)) | 0;
           hi = (hi + Math.imul(ah6, bh4)) | 0;
           lo = (lo + Math.imul(al5, bl5)) | 0;
           mid = (mid + Math.imul(al5, bh5)) | 0;
           mid = (mid + Math.imul(ah5, bl5)) | 0;
           hi = (hi + Math.imul(ah5, bh5)) | 0;
           lo = (lo + Math.imul(al4, bl6)) | 0;
           mid = (mid + Math.imul(al4, bh6)) | 0;
           mid = (mid + Math.imul(ah4, bl6)) | 0;
           hi = (hi + Math.imul(ah4, bh6)) | 0;
           lo = (lo + Math.imul(al3, bl7)) | 0;
           mid = (mid + Math.imul(al3, bh7)) | 0;
           mid = (mid + Math.imul(ah3, bl7)) | 0;
           hi = (hi + Math.imul(ah3, bh7)) | 0;
           lo = (lo + Math.imul(al2, bl8)) | 0;
           mid = (mid + Math.imul(al2, bh8)) | 0;
           mid = (mid + Math.imul(ah2, bl8)) | 0;
           hi = (hi + Math.imul(ah2, bh8)) | 0;
           lo = (lo + Math.imul(al1, bl9)) | 0;
           mid = (mid + Math.imul(al1, bh9)) | 0;
           mid = (mid + Math.imul(ah1, bl9)) | 0;
           hi = (hi + Math.imul(ah1, bh9)) | 0;
           var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
           w10 &= 0x3ffffff;
           /* k = 11 */
           lo = Math.imul(al9, bl2);
           mid = Math.imul(al9, bh2);
           mid = (mid + Math.imul(ah9, bl2)) | 0;
           hi = Math.imul(ah9, bh2);
           lo = (lo + Math.imul(al8, bl3)) | 0;
           mid = (mid + Math.imul(al8, bh3)) | 0;
           mid = (mid + Math.imul(ah8, bl3)) | 0;
           hi = (hi + Math.imul(ah8, bh3)) | 0;
           lo = (lo + Math.imul(al7, bl4)) | 0;
           mid = (mid + Math.imul(al7, bh4)) | 0;
           mid = (mid + Math.imul(ah7, bl4)) | 0;
           hi = (hi + Math.imul(ah7, bh4)) | 0;
           lo = (lo + Math.imul(al6, bl5)) | 0;
           mid = (mid + Math.imul(al6, bh5)) | 0;
           mid = (mid + Math.imul(ah6, bl5)) | 0;
           hi = (hi + Math.imul(ah6, bh5)) | 0;
           lo = (lo + Math.imul(al5, bl6)) | 0;
           mid = (mid + Math.imul(al5, bh6)) | 0;
           mid = (mid + Math.imul(ah5, bl6)) | 0;
           hi = (hi + Math.imul(ah5, bh6)) | 0;
           lo = (lo + Math.imul(al4, bl7)) | 0;
           mid = (mid + Math.imul(al4, bh7)) | 0;
           mid = (mid + Math.imul(ah4, bl7)) | 0;
           hi = (hi + Math.imul(ah4, bh7)) | 0;
           lo = (lo + Math.imul(al3, bl8)) | 0;
           mid = (mid + Math.imul(al3, bh8)) | 0;
           mid = (mid + Math.imul(ah3, bl8)) | 0;
           hi = (hi + Math.imul(ah3, bh8)) | 0;
           lo = (lo + Math.imul(al2, bl9)) | 0;
           mid = (mid + Math.imul(al2, bh9)) | 0;
           mid = (mid + Math.imul(ah2, bl9)) | 0;
           hi = (hi + Math.imul(ah2, bh9)) | 0;
           var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
           w11 &= 0x3ffffff;
           /* k = 12 */
           lo = Math.imul(al9, bl3);
           mid = Math.imul(al9, bh3);
           mid = (mid + Math.imul(ah9, bl3)) | 0;
           hi = Math.imul(ah9, bh3);
           lo = (lo + Math.imul(al8, bl4)) | 0;
           mid = (mid + Math.imul(al8, bh4)) | 0;
           mid = (mid + Math.imul(ah8, bl4)) | 0;
           hi = (hi + Math.imul(ah8, bh4)) | 0;
           lo = (lo + Math.imul(al7, bl5)) | 0;
           mid = (mid + Math.imul(al7, bh5)) | 0;
           mid = (mid + Math.imul(ah7, bl5)) | 0;
           hi = (hi + Math.imul(ah7, bh5)) | 0;
           lo = (lo + Math.imul(al6, bl6)) | 0;
           mid = (mid + Math.imul(al6, bh6)) | 0;
           mid = (mid + Math.imul(ah6, bl6)) | 0;
           hi = (hi + Math.imul(ah6, bh6)) | 0;
           lo = (lo + Math.imul(al5, bl7)) | 0;
           mid = (mid + Math.imul(al5, bh7)) | 0;
           mid = (mid + Math.imul(ah5, bl7)) | 0;
           hi = (hi + Math.imul(ah5, bh7)) | 0;
           lo = (lo + Math.imul(al4, bl8)) | 0;
           mid = (mid + Math.imul(al4, bh8)) | 0;
           mid = (mid + Math.imul(ah4, bl8)) | 0;
           hi = (hi + Math.imul(ah4, bh8)) | 0;
           lo = (lo + Math.imul(al3, bl9)) | 0;
           mid = (mid + Math.imul(al3, bh9)) | 0;
           mid = (mid + Math.imul(ah3, bl9)) | 0;
           hi = (hi + Math.imul(ah3, bh9)) | 0;
           var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
           w12 &= 0x3ffffff;
           /* k = 13 */
           lo = Math.imul(al9, bl4);
           mid = Math.imul(al9, bh4);
           mid = (mid + Math.imul(ah9, bl4)) | 0;
           hi = Math.imul(ah9, bh4);
           lo = (lo + Math.imul(al8, bl5)) | 0;
           mid = (mid + Math.imul(al8, bh5)) | 0;
           mid = (mid + Math.imul(ah8, bl5)) | 0;
           hi = (hi + Math.imul(ah8, bh5)) | 0;
           lo = (lo + Math.imul(al7, bl6)) | 0;
           mid = (mid + Math.imul(al7, bh6)) | 0;
           mid = (mid + Math.imul(ah7, bl6)) | 0;
           hi = (hi + Math.imul(ah7, bh6)) | 0;
           lo = (lo + Math.imul(al6, bl7)) | 0;
           mid = (mid + Math.imul(al6, bh7)) | 0;
           mid = (mid + Math.imul(ah6, bl7)) | 0;
           hi = (hi + Math.imul(ah6, bh7)) | 0;
           lo = (lo + Math.imul(al5, bl8)) | 0;
           mid = (mid + Math.imul(al5, bh8)) | 0;
           mid = (mid + Math.imul(ah5, bl8)) | 0;
           hi = (hi + Math.imul(ah5, bh8)) | 0;
           lo = (lo + Math.imul(al4, bl9)) | 0;
           mid = (mid + Math.imul(al4, bh9)) | 0;
           mid = (mid + Math.imul(ah4, bl9)) | 0;
           hi = (hi + Math.imul(ah4, bh9)) | 0;
           var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
           w13 &= 0x3ffffff;
           /* k = 14 */
           lo = Math.imul(al9, bl5);
           mid = Math.imul(al9, bh5);
           mid = (mid + Math.imul(ah9, bl5)) | 0;
           hi = Math.imul(ah9, bh5);
           lo = (lo + Math.imul(al8, bl6)) | 0;
           mid = (mid + Math.imul(al8, bh6)) | 0;
           mid = (mid + Math.imul(ah8, bl6)) | 0;
           hi = (hi + Math.imul(ah8, bh6)) | 0;
           lo = (lo + Math.imul(al7, bl7)) | 0;
           mid = (mid + Math.imul(al7, bh7)) | 0;
           mid = (mid + Math.imul(ah7, bl7)) | 0;
           hi = (hi + Math.imul(ah7, bh7)) | 0;
           lo = (lo + Math.imul(al6, bl8)) | 0;
           mid = (mid + Math.imul(al6, bh8)) | 0;
           mid = (mid + Math.imul(ah6, bl8)) | 0;
           hi = (hi + Math.imul(ah6, bh8)) | 0;
           lo = (lo + Math.imul(al5, bl9)) | 0;
           mid = (mid + Math.imul(al5, bh9)) | 0;
           mid = (mid + Math.imul(ah5, bl9)) | 0;
           hi = (hi + Math.imul(ah5, bh9)) | 0;
           var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
           w14 &= 0x3ffffff;
           /* k = 15 */
           lo = Math.imul(al9, bl6);
           mid = Math.imul(al9, bh6);
           mid = (mid + Math.imul(ah9, bl6)) | 0;
           hi = Math.imul(ah9, bh6);
           lo = (lo + Math.imul(al8, bl7)) | 0;
           mid = (mid + Math.imul(al8, bh7)) | 0;
           mid = (mid + Math.imul(ah8, bl7)) | 0;
           hi = (hi + Math.imul(ah8, bh7)) | 0;
           lo = (lo + Math.imul(al7, bl8)) | 0;
           mid = (mid + Math.imul(al7, bh8)) | 0;
           mid = (mid + Math.imul(ah7, bl8)) | 0;
           hi = (hi + Math.imul(ah7, bh8)) | 0;
           lo = (lo + Math.imul(al6, bl9)) | 0;
           mid = (mid + Math.imul(al6, bh9)) | 0;
           mid = (mid + Math.imul(ah6, bl9)) | 0;
           hi = (hi + Math.imul(ah6, bh9)) | 0;
           var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
           w15 &= 0x3ffffff;
           /* k = 16 */
           lo = Math.imul(al9, bl7);
           mid = Math.imul(al9, bh7);
           mid = (mid + Math.imul(ah9, bl7)) | 0;
           hi = Math.imul(ah9, bh7);
           lo = (lo + Math.imul(al8, bl8)) | 0;
           mid = (mid + Math.imul(al8, bh8)) | 0;
           mid = (mid + Math.imul(ah8, bl8)) | 0;
           hi = (hi + Math.imul(ah8, bh8)) | 0;
           lo = (lo + Math.imul(al7, bl9)) | 0;
           mid = (mid + Math.imul(al7, bh9)) | 0;
           mid = (mid + Math.imul(ah7, bl9)) | 0;
           hi = (hi + Math.imul(ah7, bh9)) | 0;
           var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
           w16 &= 0x3ffffff;
           /* k = 17 */
           lo = Math.imul(al9, bl8);
           mid = Math.imul(al9, bh8);
           mid = (mid + Math.imul(ah9, bl8)) | 0;
           hi = Math.imul(ah9, bh8);
           lo = (lo + Math.imul(al8, bl9)) | 0;
           mid = (mid + Math.imul(al8, bh9)) | 0;
           mid = (mid + Math.imul(ah8, bl9)) | 0;
           hi = (hi + Math.imul(ah8, bh9)) | 0;
           var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
           w17 &= 0x3ffffff;
           /* k = 18 */
           lo = Math.imul(al9, bl9);
           mid = Math.imul(al9, bh9);
           mid = (mid + Math.imul(ah9, bl9)) | 0;
           hi = Math.imul(ah9, bh9);
           var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
           w18 &= 0x3ffffff;
           o[0] = w0;
           o[1] = w1;
           o[2] = w2;
           o[3] = w3;
           o[4] = w4;
           o[5] = w5;
           o[6] = w6;
           o[7] = w7;
           o[8] = w8;
           o[9] = w9;
           o[10] = w10;
           o[11] = w11;
           o[12] = w12;
           o[13] = w13;
           o[14] = w14;
           o[15] = w15;
           o[16] = w16;
           o[17] = w17;
           o[18] = w18;
           if (c !== 0) {
             o[19] = c;
             out.length++;
           }
           return out;
         };

         // Polyfill comb
         if (!Math.imul) {
           comb10MulTo = smallMulTo;
         }

         function bigMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           out.length = self.length + num.length;

           var carry = 0;
           var hncarry = 0;
           for (var k = 0; k < out.length - 1; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = hncarry;
             hncarry = 0;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = k - j;
               var a = self.words[i] | 0;
               var b = num.words[j] | 0;
               var r = a * b;

               var lo = r & 0x3ffffff;
               ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
               lo = (lo + rword) | 0;
               rword = lo & 0x3ffffff;
               ncarry = (ncarry + (lo >>> 26)) | 0;

               hncarry += ncarry >>> 26;
               ncarry &= 0x3ffffff;
             }
             out.words[k] = rword;
             carry = ncarry;
             ncarry = hncarry;
           }
           if (carry !== 0) {
             out.words[k] = carry;
           } else {
             out.length--;
           }

           return out.strip();
         }

         function jumboMulTo (self, num, out) {
           var fftm = new FFTM();
           return fftm.mulp(self, num, out);
         }

         BN.prototype.mulTo = function mulTo (num, out) {
           var res;
           var len = this.length + num.length;
           if (this.length === 10 && num.length === 10) {
             res = comb10MulTo(this, num, out);
           } else if (len < 63) {
             res = smallMulTo(this, num, out);
           } else if (len < 1024) {
             res = bigMulTo(this, num, out);
           } else {
             res = jumboMulTo(this, num, out);
           }

           return res;
         };

         // Cooley-Tukey algorithm for FFT
         // slightly revisited to rely on looping instead of recursion

         function FFTM (x, y) {
           this.x = x;
           this.y = y;
         }

         FFTM.prototype.makeRBT = function makeRBT (N) {
           var t = new Array(N);
           var l = BN.prototype._countBits(N) - 1;
           for (var i = 0; i < N; i++) {
             t[i] = this.revBin(i, l, N);
           }

           return t;
         };

         // Returns binary-reversed representation of `x`
         FFTM.prototype.revBin = function revBin (x, l, N) {
           if (x === 0 || x === N - 1) return x;

           var rb = 0;
           for (var i = 0; i < l; i++) {
             rb |= (x & 1) << (l - i - 1);
             x >>= 1;
           }

           return rb;
         };

         // Performs "tweedling" phase, therefore 'emulating'
         // behaviour of the recursive algorithm
         FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
           for (var i = 0; i < N; i++) {
             rtws[i] = rws[rbt[i]];
             itws[i] = iws[rbt[i]];
           }
         };

         FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
           this.permute(rbt, rws, iws, rtws, itws, N);

           for (var s = 1; s < N; s <<= 1) {
             var l = s << 1;

             var rtwdf = Math.cos(2 * Math.PI / l);
             var itwdf = Math.sin(2 * Math.PI / l);

             for (var p = 0; p < N; p += l) {
               var rtwdf_ = rtwdf;
               var itwdf_ = itwdf;

               for (var j = 0; j < s; j++) {
                 var re = rtws[p + j];
                 var ie = itws[p + j];

                 var ro = rtws[p + j + s];
                 var io = itws[p + j + s];

                 var rx = rtwdf_ * ro - itwdf_ * io;

                 io = rtwdf_ * io + itwdf_ * ro;
                 ro = rx;

                 rtws[p + j] = re + ro;
                 itws[p + j] = ie + io;

                 rtws[p + j + s] = re - ro;
                 itws[p + j + s] = ie - io;

                 /* jshint maxdepth : false */
                 if (j !== l) {
                   rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                   itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                   rtwdf_ = rx;
                 }
               }
             }
           }
         };

         FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
           var N = Math.max(m, n) | 1;
           var odd = N & 1;
           var i = 0;
           for (N = N / 2 | 0; N; N = N >>> 1) {
             i++;
           }

           return 1 << i + 1 + odd;
         };

         FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
           if (N <= 1) return;

           for (var i = 0; i < N / 2; i++) {
             var t = rws[i];

             rws[i] = rws[N - i - 1];
             rws[N - i - 1] = t;

             t = iws[i];

             iws[i] = -iws[N - i - 1];
             iws[N - i - 1] = -t;
           }
         };

         FFTM.prototype.normalize13b = function normalize13b (ws, N) {
           var carry = 0;
           for (var i = 0; i < N / 2; i++) {
             var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
               Math.round(ws[2 * i] / N) +
               carry;

             ws[i] = w & 0x3ffffff;

             if (w < 0x4000000) {
               carry = 0;
             } else {
               carry = w / 0x4000000 | 0;
             }
           }

           return ws;
         };

         FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
           var carry = 0;
           for (var i = 0; i < len; i++) {
             carry = carry + (ws[i] | 0);

             rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
             rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
           }

           // Pad with zeroes
           for (i = 2 * len; i < N; ++i) {
             rws[i] = 0;
           }

           assert(carry === 0);
           assert((carry & ~0x1fff) === 0);
         };

         FFTM.prototype.stub = function stub (N) {
           var ph = new Array(N);
           for (var i = 0; i < N; i++) {
             ph[i] = 0;
           }

           return ph;
         };

         FFTM.prototype.mulp = function mulp (x, y, out) {
           var N = 2 * this.guessLen13b(x.length, y.length);

           var rbt = this.makeRBT(N);

           var _ = this.stub(N);

           var rws = new Array(N);
           var rwst = new Array(N);
           var iwst = new Array(N);

           var nrws = new Array(N);
           var nrwst = new Array(N);
           var niwst = new Array(N);

           var rmws = out.words;
           rmws.length = N;

           this.convert13b(x.words, x.length, rws, N);
           this.convert13b(y.words, y.length, nrws, N);

           this.transform(rws, _, rwst, iwst, N, rbt);
           this.transform(nrws, _, nrwst, niwst, N, rbt);

           for (var i = 0; i < N; i++) {
             var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
             iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
             rwst[i] = rx;
           }

           this.conjugate(rwst, iwst, N);
           this.transform(rwst, iwst, rmws, _, N, rbt);
           this.conjugate(rmws, _, N);
           this.normalize13b(rmws, N);

           out.negative = x.negative ^ y.negative;
           out.length = x.length + y.length;
           return out.strip();
         };

         // Multiply `this` by `num`
         BN.prototype.mul = function mul (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return this.mulTo(num, out);
         };

         // Multiply employing FFT
         BN.prototype.mulf = function mulf (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return jumboMulTo(this, num, out);
         };

         // In-place Multiplication
         BN.prototype.imul = function imul (num) {
           return this.clone().mulTo(num, this);
         };

         BN.prototype.imuln = function imuln (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);

           // Carry
           var carry = 0;
           for (var i = 0; i < this.length; i++) {
             var w = (this.words[i] | 0) * num;
             var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
             carry >>= 26;
             carry += (w / 0x4000000) | 0;
             // NOTE: lo is 27bit maximum
             carry += lo >>> 26;
             this.words[i] = lo & 0x3ffffff;
           }

           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }

           return this;
         };

         BN.prototype.muln = function muln (num) {
           return this.clone().imuln(num);
         };

         // `this` * `this`
         BN.prototype.sqr = function sqr () {
           return this.mul(this);
         };

         // `this` * `this` in-place
         BN.prototype.isqr = function isqr () {
           return this.imul(this.clone());
         };

         // Math.pow(`this`, `num`)
         BN.prototype.pow = function pow (num) {
           var w = toBitArray(num);
           if (w.length === 0) return new BN(1);

           // Skip leading zeroes
           var res = this;
           for (var i = 0; i < w.length; i++, res = res.sqr()) {
             if (w[i] !== 0) break;
           }

           if (++i < w.length) {
             for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
               if (w[i] === 0) continue;

               res = res.mul(q);
             }
           }

           return res;
         };

         // Shift-left in-place
         BN.prototype.iushln = function iushln (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;
           var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
           var i;

           if (r !== 0) {
             var carry = 0;

             for (i = 0; i < this.length; i++) {
               var newCarry = this.words[i] & carryMask;
               var c = ((this.words[i] | 0) - newCarry) << r;
               this.words[i] = c | carry;
               carry = newCarry >>> (26 - r);
             }

             if (carry) {
               this.words[i] = carry;
               this.length++;
             }
           }

           if (s !== 0) {
             for (i = this.length - 1; i >= 0; i--) {
               this.words[i + s] = this.words[i];
             }

             for (i = 0; i < s; i++) {
               this.words[i] = 0;
             }

             this.length += s;
           }

           return this.strip();
         };

         BN.prototype.ishln = function ishln (bits) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushln(bits);
         };

         // Shift-right in-place
         // NOTE: `hint` is a lowest bit before trailing zeroes
         // NOTE: if `extended` is present - it will be filled with destroyed bits
         BN.prototype.iushrn = function iushrn (bits, hint, extended) {
           assert(typeof bits === 'number' && bits >= 0);
           var h;
           if (hint) {
             h = (hint - (hint % 26)) / 26;
           } else {
             h = 0;
           }

           var r = bits % 26;
           var s = Math.min((bits - r) / 26, this.length);
           var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
           var maskedWords = extended;

           h -= s;
           h = Math.max(0, h);

           // Extended mode, copy masked part
           if (maskedWords) {
             for (var i = 0; i < s; i++) {
               maskedWords.words[i] = this.words[i];
             }
             maskedWords.length = s;
           }

           if (s === 0) ; else if (this.length > s) {
             this.length -= s;
             for (i = 0; i < this.length; i++) {
               this.words[i] = this.words[i + s];
             }
           } else {
             this.words[0] = 0;
             this.length = 1;
           }

           var carry = 0;
           for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
             var word = this.words[i] | 0;
             this.words[i] = (carry << (26 - r)) | (word >>> r);
             carry = word & mask;
           }

           // Push carried bits as a mask
           if (maskedWords && carry !== 0) {
             maskedWords.words[maskedWords.length++] = carry;
           }

           if (this.length === 0) {
             this.words[0] = 0;
             this.length = 1;
           }

           return this.strip();
         };

         BN.prototype.ishrn = function ishrn (bits, hint, extended) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushrn(bits, hint, extended);
         };

         // Shift-left
         BN.prototype.shln = function shln (bits) {
           return this.clone().ishln(bits);
         };

         BN.prototype.ushln = function ushln (bits) {
           return this.clone().iushln(bits);
         };

         // Shift-right
         BN.prototype.shrn = function shrn (bits) {
           return this.clone().ishrn(bits);
         };

         BN.prototype.ushrn = function ushrn (bits) {
           return this.clone().iushrn(bits);
         };

         // Test if n bit is set
         BN.prototype.testn = function testn (bit) {
           assert(typeof bit === 'number' && bit >= 0);
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) return false;

           // Check bit and return
           var w = this.words[s];

           return !!(w & q);
         };

         // Return only lowers bits of number (in-place)
         BN.prototype.imaskn = function imaskn (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;

           assert(this.negative === 0, 'imaskn works only with positive numbers');

           if (this.length <= s) {
             return this;
           }

           if (r !== 0) {
             s++;
           }
           this.length = Math.min(s, this.length);

           if (r !== 0) {
             var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
             this.words[this.length - 1] &= mask;
           }

           return this.strip();
         };

         // Return only lowers bits of number
         BN.prototype.maskn = function maskn (bits) {
           return this.clone().imaskn(bits);
         };

         // Add plain number `num` to `this`
         BN.prototype.iaddn = function iaddn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.isubn(-num);

           // Possible sign change
           if (this.negative !== 0) {
             if (this.length === 1 && (this.words[0] | 0) < num) {
               this.words[0] = num - (this.words[0] | 0);
               this.negative = 0;
               return this;
             }

             this.negative = 0;
             this.isubn(num);
             this.negative = 1;
             return this;
           }

           // Add without checks
           return this._iaddn(num);
         };

         BN.prototype._iaddn = function _iaddn (num) {
           this.words[0] += num;

           // Carry
           for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
             this.words[i] -= 0x4000000;
             if (i === this.length - 1) {
               this.words[i + 1] = 1;
             } else {
               this.words[i + 1]++;
             }
           }
           this.length = Math.max(this.length, i + 1);

           return this;
         };

         // Subtract plain number `num` from `this`
         BN.prototype.isubn = function isubn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.iaddn(-num);

           if (this.negative !== 0) {
             this.negative = 0;
             this.iaddn(num);
             this.negative = 1;
             return this;
           }

           this.words[0] -= num;

           if (this.length === 1 && this.words[0] < 0) {
             this.words[0] = -this.words[0];
             this.negative = 1;
           } else {
             // Carry
             for (var i = 0; i < this.length && this.words[i] < 0; i++) {
               this.words[i] += 0x4000000;
               this.words[i + 1] -= 1;
             }
           }

           return this.strip();
         };

         BN.prototype.addn = function addn (num) {
           return this.clone().iaddn(num);
         };

         BN.prototype.subn = function subn (num) {
           return this.clone().isubn(num);
         };

         BN.prototype.iabs = function iabs () {
           this.negative = 0;

           return this;
         };

         BN.prototype.abs = function abs () {
           return this.clone().iabs();
         };

         BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
           var len = num.length + shift;
           var i;

           this._expand(len);

           var w;
           var carry = 0;
           for (i = 0; i < num.length; i++) {
             w = (this.words[i + shift] | 0) + carry;
             var right = (num.words[i] | 0) * mul;
             w -= right & 0x3ffffff;
             carry = (w >> 26) - ((right / 0x4000000) | 0);
             this.words[i + shift] = w & 0x3ffffff;
           }
           for (; i < this.length - shift; i++) {
             w = (this.words[i + shift] | 0) + carry;
             carry = w >> 26;
             this.words[i + shift] = w & 0x3ffffff;
           }

           if (carry === 0) return this.strip();

           // Subtraction overflow
           assert(carry === -1);
           carry = 0;
           for (i = 0; i < this.length; i++) {
             w = -(this.words[i] | 0) + carry;
             carry = w >> 26;
             this.words[i] = w & 0x3ffffff;
           }
           this.negative = 1;

           return this.strip();
         };

         BN.prototype._wordDiv = function _wordDiv (num, mode) {
           var shift = this.length - num.length;

           var a = this.clone();
           var b = num;

           // Normalize
           var bhi = b.words[b.length - 1] | 0;
           var bhiBits = this._countBits(bhi);
           shift = 26 - bhiBits;
           if (shift !== 0) {
             b = b.ushln(shift);
             a.iushln(shift);
             bhi = b.words[b.length - 1] | 0;
           }

           // Initialize quotient
           var m = a.length - b.length;
           var q;

           if (mode !== 'mod') {
             q = new BN(null);
             q.length = m + 1;
             q.words = new Array(q.length);
             for (var i = 0; i < q.length; i++) {
               q.words[i] = 0;
             }
           }

           var diff = a.clone()._ishlnsubmul(b, 1, m);
           if (diff.negative === 0) {
             a = diff;
             if (q) {
               q.words[m] = 1;
             }
           }

           for (var j = m - 1; j >= 0; j--) {
             var qj = (a.words[b.length + j] | 0) * 0x4000000 +
               (a.words[b.length + j - 1] | 0);

             // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
             // (0x7ffffff)
             qj = Math.min((qj / bhi) | 0, 0x3ffffff);

             a._ishlnsubmul(b, qj, j);
             while (a.negative !== 0) {
               qj--;
               a.negative = 0;
               a._ishlnsubmul(b, 1, j);
               if (!a.isZero()) {
                 a.negative ^= 1;
               }
             }
             if (q) {
               q.words[j] = qj;
             }
           }
           if (q) {
             q.strip();
           }
           a.strip();

           // Denormalize
           if (mode !== 'div' && shift !== 0) {
             a.iushrn(shift);
           }

           return {
             div: q || null,
             mod: a
           };
         };

         // NOTE: 1) `mode` can be set to `mod` to request mod only,
         //       to `div` to request div only, or be absent to
         //       request both div & mod
         //       2) `positive` is true if unsigned mod is requested
         BN.prototype.divmod = function divmod (num, mode, positive) {
           assert(!num.isZero());

           if (this.isZero()) {
             return {
               div: new BN(0),
               mod: new BN(0)
             };
           }

           var div, mod, res;
           if (this.negative !== 0 && num.negative === 0) {
             res = this.neg().divmod(num, mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.iadd(num);
               }
             }

             return {
               div: div,
               mod: mod
             };
           }

           if (this.negative === 0 && num.negative !== 0) {
             res = this.divmod(num.neg(), mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             return {
               div: div,
               mod: res.mod
             };
           }

           if ((this.negative & num.negative) !== 0) {
             res = this.neg().divmod(num.neg(), mode);

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.isub(num);
               }
             }

             return {
               div: res.div,
               mod: mod
             };
           }

           // Both numbers are positive at this point

           // Strip both numbers to approximate shift value
           if (num.length > this.length || this.cmp(num) < 0) {
             return {
               div: new BN(0),
               mod: this
             };
           }

           // Very short reduction
           if (num.length === 1) {
             if (mode === 'div') {
               return {
                 div: this.divn(num.words[0]),
                 mod: null
               };
             }

             if (mode === 'mod') {
               return {
                 div: null,
                 mod: new BN(this.modn(num.words[0]))
               };
             }

             return {
               div: this.divn(num.words[0]),
               mod: new BN(this.modn(num.words[0]))
             };
           }

           return this._wordDiv(num, mode);
         };

         // Find `this` / `num`
         BN.prototype.div = function div (num) {
           return this.divmod(num, 'div', false).div;
         };

         // Find `this` % `num`
         BN.prototype.mod = function mod (num) {
           return this.divmod(num, 'mod', false).mod;
         };

         BN.prototype.umod = function umod (num) {
           return this.divmod(num, 'mod', true).mod;
         };

         // Find Round(`this` / `num`)
         BN.prototype.divRound = function divRound (num) {
           var dm = this.divmod(num);

           // Fast case - exact division
           if (dm.mod.isZero()) return dm.div;

           var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

           var half = num.ushrn(1);
           var r2 = num.andln(1);
           var cmp = mod.cmp(half);

           // Round down
           if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

           // Round up
           return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
         };

         BN.prototype.modn = function modn (num) {
           assert(num <= 0x3ffffff);
           var p = (1 << 26) % num;

           var acc = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             acc = (p * acc + (this.words[i] | 0)) % num;
           }

           return acc;
         };

         // In-place division by number
         BN.prototype.idivn = function idivn (num) {
           assert(num <= 0x3ffffff);

           var carry = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var w = (this.words[i] | 0) + carry * 0x4000000;
             this.words[i] = (w / num) | 0;
             carry = w % num;
           }

           return this.strip();
         };

         BN.prototype.divn = function divn (num) {
           return this.clone().idivn(num);
         };

         BN.prototype.egcd = function egcd (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var x = this;
           var y = p.clone();

           if (x.negative !== 0) {
             x = x.umod(p);
           } else {
             x = x.clone();
           }

           // A * x + B * y = x
           var A = new BN(1);
           var B = new BN(0);

           // C * x + D * y = y
           var C = new BN(0);
           var D = new BN(1);

           var g = 0;

           while (x.isEven() && y.isEven()) {
             x.iushrn(1);
             y.iushrn(1);
             ++g;
           }

           var yp = y.clone();
           var xp = x.clone();

           while (!x.isZero()) {
             for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               x.iushrn(i);
               while (i-- > 0) {
                 if (A.isOdd() || B.isOdd()) {
                   A.iadd(yp);
                   B.isub(xp);
                 }

                 A.iushrn(1);
                 B.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               y.iushrn(j);
               while (j-- > 0) {
                 if (C.isOdd() || D.isOdd()) {
                   C.iadd(yp);
                   D.isub(xp);
                 }

                 C.iushrn(1);
                 D.iushrn(1);
               }
             }

             if (x.cmp(y) >= 0) {
               x.isub(y);
               A.isub(C);
               B.isub(D);
             } else {
               y.isub(x);
               C.isub(A);
               D.isub(B);
             }
           }

           return {
             a: C,
             b: D,
             gcd: y.iushln(g)
           };
         };

         // This is reduced incarnation of the binary EEA
         // above, designated to invert members of the
         // _prime_ fields F(p) at a maximal speed
         BN.prototype._invmp = function _invmp (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var a = this;
           var b = p.clone();

           if (a.negative !== 0) {
             a = a.umod(p);
           } else {
             a = a.clone();
           }

           var x1 = new BN(1);
           var x2 = new BN(0);

           var delta = b.clone();

           while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
             for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               a.iushrn(i);
               while (i-- > 0) {
                 if (x1.isOdd()) {
                   x1.iadd(delta);
                 }

                 x1.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               b.iushrn(j);
               while (j-- > 0) {
                 if (x2.isOdd()) {
                   x2.iadd(delta);
                 }

                 x2.iushrn(1);
               }
             }

             if (a.cmp(b) >= 0) {
               a.isub(b);
               x1.isub(x2);
             } else {
               b.isub(a);
               x2.isub(x1);
             }
           }

           var res;
           if (a.cmpn(1) === 0) {
             res = x1;
           } else {
             res = x2;
           }

           if (res.cmpn(0) < 0) {
             res.iadd(p);
           }

           return res;
         };

         BN.prototype.gcd = function gcd (num) {
           if (this.isZero()) return num.abs();
           if (num.isZero()) return this.abs();

           var a = this.clone();
           var b = num.clone();
           a.negative = 0;
           b.negative = 0;

           // Remove common factor of two
           for (var shift = 0; a.isEven() && b.isEven(); shift++) {
             a.iushrn(1);
             b.iushrn(1);
           }

           do {
             while (a.isEven()) {
               a.iushrn(1);
             }
             while (b.isEven()) {
               b.iushrn(1);
             }

             var r = a.cmp(b);
             if (r < 0) {
               // Swap `a` and `b` to make `a` always bigger than `b`
               var t = a;
               a = b;
               b = t;
             } else if (r === 0 || b.cmpn(1) === 0) {
               break;
             }

             a.isub(b);
           } while (true);

           return b.iushln(shift);
         };

         // Invert number in the field F(num)
         BN.prototype.invm = function invm (num) {
           return this.egcd(num).a.umod(num);
         };

         BN.prototype.isEven = function isEven () {
           return (this.words[0] & 1) === 0;
         };

         BN.prototype.isOdd = function isOdd () {
           return (this.words[0] & 1) === 1;
         };

         // And first word and num
         BN.prototype.andln = function andln (num) {
           return this.words[0] & num;
         };

         // Increment at the bit position in-line
         BN.prototype.bincn = function bincn (bit) {
           assert(typeof bit === 'number');
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) {
             this._expand(s + 1);
             this.words[s] |= q;
             return this;
           }

           // Add bit and propagate, if needed
           var carry = q;
           for (var i = s; carry !== 0 && i < this.length; i++) {
             var w = this.words[i] | 0;
             w += carry;
             carry = w >>> 26;
             w &= 0x3ffffff;
             this.words[i] = w;
           }
           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }
           return this;
         };

         BN.prototype.isZero = function isZero () {
           return this.length === 1 && this.words[0] === 0;
         };

         BN.prototype.cmpn = function cmpn (num) {
           var negative = num < 0;

           if (this.negative !== 0 && !negative) return -1;
           if (this.negative === 0 && negative) return 1;

           this.strip();

           var res;
           if (this.length > 1) {
             res = 1;
           } else {
             if (negative) {
               num = -num;
             }

             assert(num <= 0x3ffffff, 'Number is too big');

             var w = this.words[0] | 0;
             res = w === num ? 0 : w < num ? -1 : 1;
           }
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Compare two numbers and return:
         // 1 - if `this` > `num`
         // 0 - if `this` == `num`
         // -1 - if `this` < `num`
         BN.prototype.cmp = function cmp (num) {
           if (this.negative !== 0 && num.negative === 0) return -1;
           if (this.negative === 0 && num.negative !== 0) return 1;

           var res = this.ucmp(num);
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Unsigned comparison
         BN.prototype.ucmp = function ucmp (num) {
           // At this point both numbers have the same sign
           if (this.length > num.length) return 1;
           if (this.length < num.length) return -1;

           var res = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var a = this.words[i] | 0;
             var b = num.words[i] | 0;

             if (a === b) continue;
             if (a < b) {
               res = -1;
             } else if (a > b) {
               res = 1;
             }
             break;
           }
           return res;
         };

         BN.prototype.gtn = function gtn (num) {
           return this.cmpn(num) === 1;
         };

         BN.prototype.gt = function gt (num) {
           return this.cmp(num) === 1;
         };

         BN.prototype.gten = function gten (num) {
           return this.cmpn(num) >= 0;
         };

         BN.prototype.gte = function gte (num) {
           return this.cmp(num) >= 0;
         };

         BN.prototype.ltn = function ltn (num) {
           return this.cmpn(num) === -1;
         };

         BN.prototype.lt = function lt (num) {
           return this.cmp(num) === -1;
         };

         BN.prototype.lten = function lten (num) {
           return this.cmpn(num) <= 0;
         };

         BN.prototype.lte = function lte (num) {
           return this.cmp(num) <= 0;
         };

         BN.prototype.eqn = function eqn (num) {
           return this.cmpn(num) === 0;
         };

         BN.prototype.eq = function eq (num) {
           return this.cmp(num) === 0;
         };

         //
         // A reduce context, could be using montgomery or something better, depending
         // on the `m` itself.
         //
         BN.red = function red (num) {
           return new Red(num);
         };

         BN.prototype.toRed = function toRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           assert(this.negative === 0, 'red works only with positives');
           return ctx.convertTo(this)._forceRed(ctx);
         };

         BN.prototype.fromRed = function fromRed () {
           assert(this.red, 'fromRed works only with numbers in reduction context');
           return this.red.convertFrom(this);
         };

         BN.prototype._forceRed = function _forceRed (ctx) {
           this.red = ctx;
           return this;
         };

         BN.prototype.forceRed = function forceRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           return this._forceRed(ctx);
         };

         BN.prototype.redAdd = function redAdd (num) {
           assert(this.red, 'redAdd works only with red numbers');
           return this.red.add(this, num);
         };

         BN.prototype.redIAdd = function redIAdd (num) {
           assert(this.red, 'redIAdd works only with red numbers');
           return this.red.iadd(this, num);
         };

         BN.prototype.redSub = function redSub (num) {
           assert(this.red, 'redSub works only with red numbers');
           return this.red.sub(this, num);
         };

         BN.prototype.redISub = function redISub (num) {
           assert(this.red, 'redISub works only with red numbers');
           return this.red.isub(this, num);
         };

         BN.prototype.redShl = function redShl (num) {
           assert(this.red, 'redShl works only with red numbers');
           return this.red.shl(this, num);
         };

         BN.prototype.redMul = function redMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.mul(this, num);
         };

         BN.prototype.redIMul = function redIMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.imul(this, num);
         };

         BN.prototype.redSqr = function redSqr () {
           assert(this.red, 'redSqr works only with red numbers');
           this.red._verify1(this);
           return this.red.sqr(this);
         };

         BN.prototype.redISqr = function redISqr () {
           assert(this.red, 'redISqr works only with red numbers');
           this.red._verify1(this);
           return this.red.isqr(this);
         };

         // Square root over p
         BN.prototype.redSqrt = function redSqrt () {
           assert(this.red, 'redSqrt works only with red numbers');
           this.red._verify1(this);
           return this.red.sqrt(this);
         };

         BN.prototype.redInvm = function redInvm () {
           assert(this.red, 'redInvm works only with red numbers');
           this.red._verify1(this);
           return this.red.invm(this);
         };

         // Return negative clone of `this` % `red modulo`
         BN.prototype.redNeg = function redNeg () {
           assert(this.red, 'redNeg works only with red numbers');
           this.red._verify1(this);
           return this.red.neg(this);
         };

         BN.prototype.redPow = function redPow (num) {
           assert(this.red && !num.red, 'redPow(normalNum)');
           this.red._verify1(this);
           return this.red.pow(this, num);
         };

         // Prime numbers with efficient reduction
         var primes = {
           k256: null,
           p224: null,
           p192: null,
           p25519: null
         };

         // Pseudo-Mersenne prime
         function MPrime (name, p) {
           // P = 2 ^ N - K
           this.name = name;
           this.p = new BN(p, 16);
           this.n = this.p.bitLength();
           this.k = new BN(1).iushln(this.n).isub(this.p);

           this.tmp = this._tmp();
         }

         MPrime.prototype._tmp = function _tmp () {
           var tmp = new BN(null);
           tmp.words = new Array(Math.ceil(this.n / 13));
           return tmp;
         };

         MPrime.prototype.ireduce = function ireduce (num) {
           // Assumes that `num` is less than `P^2`
           // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
           var r = num;
           var rlen;

           do {
             this.split(r, this.tmp);
             r = this.imulK(r);
             r = r.iadd(this.tmp);
             rlen = r.bitLength();
           } while (rlen > this.n);

           var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
           if (cmp === 0) {
             r.words[0] = 0;
             r.length = 1;
           } else if (cmp > 0) {
             r.isub(this.p);
           } else {
             r.strip();
           }

           return r;
         };

         MPrime.prototype.split = function split (input, out) {
           input.iushrn(this.n, 0, out);
         };

         MPrime.prototype.imulK = function imulK (num) {
           return num.imul(this.k);
         };

         function K256 () {
           MPrime.call(
             this,
             'k256',
             'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
         }
         inherits(K256, MPrime);

         K256.prototype.split = function split (input, output) {
           // 256 = 9 * 26 + 22
           var mask = 0x3fffff;

           var outLen = Math.min(input.length, 9);
           for (var i = 0; i < outLen; i++) {
             output.words[i] = input.words[i];
           }
           output.length = outLen;

           if (input.length <= 9) {
             input.words[0] = 0;
             input.length = 1;
             return;
           }

           // Shift by 9 limbs
           var prev = input.words[9];
           output.words[output.length++] = prev & mask;

           for (i = 10; i < input.length; i++) {
             var next = input.words[i] | 0;
             input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
             prev = next;
           }
           prev >>>= 22;
           input.words[i - 10] = prev;
           if (prev === 0 && input.length > 10) {
             input.length -= 10;
           } else {
             input.length -= 9;
           }
         };

         K256.prototype.imulK = function imulK (num) {
           // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
           num.words[num.length] = 0;
           num.words[num.length + 1] = 0;
           num.length += 2;

           // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
           var lo = 0;
           for (var i = 0; i < num.length; i++) {
             var w = num.words[i] | 0;
             lo += w * 0x3d1;
             num.words[i] = lo & 0x3ffffff;
             lo = w * 0x40 + ((lo / 0x4000000) | 0);
           }

           // Fast length reduction
           if (num.words[num.length - 1] === 0) {
             num.length--;
             if (num.words[num.length - 1] === 0) {
               num.length--;
             }
           }
           return num;
         };

         function P224 () {
           MPrime.call(
             this,
             'p224',
             'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
         }
         inherits(P224, MPrime);

         function P192 () {
           MPrime.call(
             this,
             'p192',
             'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
         }
         inherits(P192, MPrime);

         function P25519 () {
           // 2 ^ 255 - 19
           MPrime.call(
             this,
             '25519',
             '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
         }
         inherits(P25519, MPrime);

         P25519.prototype.imulK = function imulK (num) {
           // K = 0x13
           var carry = 0;
           for (var i = 0; i < num.length; i++) {
             var hi = (num.words[i] | 0) * 0x13 + carry;
             var lo = hi & 0x3ffffff;
             hi >>>= 26;

             num.words[i] = lo;
             carry = hi;
           }
           if (carry !== 0) {
             num.words[num.length++] = carry;
           }
           return num;
         };

         // Exported mostly for testing purposes, use plain name instead
         BN._prime = function prime (name) {
           // Cached version of prime
           if (primes[name]) return primes[name];

           var prime;
           if (name === 'k256') {
             prime = new K256();
           } else if (name === 'p224') {
             prime = new P224();
           } else if (name === 'p192') {
             prime = new P192();
           } else if (name === 'p25519') {
             prime = new P25519();
           } else {
             throw new Error('Unknown prime ' + name);
           }
           primes[name] = prime;

           return prime;
         };

         //
         // Base reduction engine
         //
         function Red (m) {
           if (typeof m === 'string') {
             var prime = BN._prime(m);
             this.m = prime.p;
             this.prime = prime;
           } else {
             assert(m.gtn(1), 'modulus must be greater than 1');
             this.m = m;
             this.prime = null;
           }
         }

         Red.prototype._verify1 = function _verify1 (a) {
           assert(a.negative === 0, 'red works only with positives');
           assert(a.red, 'red works only with red numbers');
         };

         Red.prototype._verify2 = function _verify2 (a, b) {
           assert((a.negative | b.negative) === 0, 'red works only with positives');
           assert(a.red && a.red === b.red,
             'red works only with red numbers');
         };

         Red.prototype.imod = function imod (a) {
           if (this.prime) return this.prime.ireduce(a)._forceRed(this);
           return a.umod(this.m)._forceRed(this);
         };

         Red.prototype.neg = function neg (a) {
           if (a.isZero()) {
             return a.clone();
           }

           return this.m.sub(a)._forceRed(this);
         };

         Red.prototype.add = function add (a, b) {
           this._verify2(a, b);

           var res = a.add(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.iadd = function iadd (a, b) {
           this._verify2(a, b);

           var res = a.iadd(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res;
         };

         Red.prototype.sub = function sub (a, b) {
           this._verify2(a, b);

           var res = a.sub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.isub = function isub (a, b) {
           this._verify2(a, b);

           var res = a.isub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res;
         };

         Red.prototype.shl = function shl (a, num) {
           this._verify1(a);
           return this.imod(a.ushln(num));
         };

         Red.prototype.imul = function imul (a, b) {
           this._verify2(a, b);
           return this.imod(a.imul(b));
         };

         Red.prototype.mul = function mul (a, b) {
           this._verify2(a, b);
           return this.imod(a.mul(b));
         };

         Red.prototype.isqr = function isqr (a) {
           return this.imul(a, a.clone());
         };

         Red.prototype.sqr = function sqr (a) {
           return this.mul(a, a);
         };

         Red.prototype.sqrt = function sqrt (a) {
           if (a.isZero()) return a.clone();

           var mod3 = this.m.andln(3);
           assert(mod3 % 2 === 1);

           // Fast case
           if (mod3 === 3) {
             var pow = this.m.add(new BN(1)).iushrn(2);
             return this.pow(a, pow);
           }

           // Tonelli-Shanks algorithm (Totally unoptimized and slow)
           //
           // Find Q and S, that Q * 2 ^ S = (P - 1)
           var q = this.m.subn(1);
           var s = 0;
           while (!q.isZero() && q.andln(1) === 0) {
             s++;
             q.iushrn(1);
           }
           assert(!q.isZero());

           var one = new BN(1).toRed(this);
           var nOne = one.redNeg();

           // Find quadratic non-residue
           // NOTE: Max is such because of generalized Riemann hypothesis.
           var lpow = this.m.subn(1).iushrn(1);
           var z = this.m.bitLength();
           z = new BN(2 * z * z).toRed(this);

           while (this.pow(z, lpow).cmp(nOne) !== 0) {
             z.redIAdd(nOne);
           }

           var c = this.pow(z, q);
           var r = this.pow(a, q.addn(1).iushrn(1));
           var t = this.pow(a, q);
           var m = s;
           while (t.cmp(one) !== 0) {
             var tmp = t;
             for (var i = 0; tmp.cmp(one) !== 0; i++) {
               tmp = tmp.redSqr();
             }
             assert(i < m);
             var b = this.pow(c, new BN(1).iushln(m - i - 1));

             r = r.redMul(b);
             c = b.redSqr();
             t = t.redMul(c);
             m = i;
           }

           return r;
         };

         Red.prototype.invm = function invm (a) {
           var inv = a._invmp(this.m);
           if (inv.negative !== 0) {
             inv.negative = 0;
             return this.imod(inv).redNeg();
           } else {
             return this.imod(inv);
           }
         };

         Red.prototype.pow = function pow (a, num) {
           if (num.isZero()) return new BN(1);
           if (num.cmpn(1) === 0) return a.clone();

           var windowSize = 4;
           var wnd = new Array(1 << windowSize);
           wnd[0] = new BN(1).toRed(this);
           wnd[1] = a;
           for (var i = 2; i < wnd.length; i++) {
             wnd[i] = this.mul(wnd[i - 1], a);
           }

           var res = wnd[0];
           var current = 0;
           var currentLen = 0;
           var start = num.bitLength() % 26;
           if (start === 0) {
             start = 26;
           }

           for (i = num.length - 1; i >= 0; i--) {
             var word = num.words[i];
             for (var j = start - 1; j >= 0; j--) {
               var bit = (word >> j) & 1;
               if (res !== wnd[0]) {
                 res = this.sqr(res);
               }

               if (bit === 0 && current === 0) {
                 currentLen = 0;
                 continue;
               }

               current <<= 1;
               current |= bit;
               currentLen++;
               if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

               res = this.mul(res, wnd[current]);
               currentLen = 0;
               current = 0;
             }
             start = 26;
           }

           return res;
         };

         Red.prototype.convertTo = function convertTo (num) {
           var r = num.umod(this.m);

           return r === num ? r.clone() : r;
         };

         Red.prototype.convertFrom = function convertFrom (num) {
           var res = num.clone();
           res.red = null;
           return res;
         };

         //
         // Montgomery method engine
         //

         BN.mont = function mont (num) {
           return new Mont(num);
         };

         function Mont (m) {
           Red.call(this, m);

           this.shift = this.m.bitLength();
           if (this.shift % 26 !== 0) {
             this.shift += 26 - (this.shift % 26);
           }

           this.r = new BN(1).iushln(this.shift);
           this.r2 = this.imod(this.r.sqr());
           this.rinv = this.r._invmp(this.m);

           this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
           this.minv = this.minv.umod(this.r);
           this.minv = this.r.sub(this.minv);
         }
         inherits(Mont, Red);

         Mont.prototype.convertTo = function convertTo (num) {
           return this.imod(num.ushln(this.shift));
         };

         Mont.prototype.convertFrom = function convertFrom (num) {
           var r = this.imod(num.mul(this.rinv));
           r.red = null;
           return r;
         };

         Mont.prototype.imul = function imul (a, b) {
           if (a.isZero() || b.isZero()) {
             a.words[0] = 0;
             a.length = 1;
             return a;
           }

           var t = a.imul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;

           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.mul = function mul (a, b) {
           if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

           var t = a.mul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;
           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.invm = function invm (a) {
           // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
           var res = this.imod(a._invmp(this.m).mul(this.r2));
           return res._forceRed(this);
         };
       })(module, commonjsGlobal);
       });

       /**
        * Returns a `Boolean` on whether or not the a `String` starts with '0x'
        * @param {String} str the string input value
        * @return {Boolean} a boolean if it is or is not hex prefixed
        * @throws if the str input is not a string
        */
       var src = function isHexPrefixed(str) {
         if (typeof str !== 'string') {
           throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + (typeof str) + ", while checking isHexPrefixed.");
         }

         return str.slice(0, 2) === '0x';
       };

       /**
        * Removes '0x' from a given `String` is present
        * @param {String} str the string value
        * @return {String|Optional} a string by pass if necessary
        */
       var src$1 = function stripHexPrefix(str) {
         if (typeof str !== 'string') {
           return str;
         }

         return src(str) ? str.slice(2) : str;
       };

       /**
        * Returns a BN object, converts a number value to a BN
        * @param {String|Number|Object} `arg` input a string number, hex string number, number, BigNumber or BN object
        * @return {Object} `output` BN object of the number
        * @throws if the argument is not an array, object that isn't a bignumber, not a string number or number
        */
       var src$2 = function numberToBN(arg) {
         if (typeof arg === 'string' || typeof arg === 'number') {
           var multiplier = new bn$1(1); // eslint-disable-line
           var formattedString = String(arg).toLowerCase().trim();
           var isHexPrefixed = formattedString.substr(0, 2) === '0x' || formattedString.substr(0, 3) === '-0x';
           var stringArg = src$1(formattedString); // eslint-disable-line
           if (stringArg.substr(0, 1) === '-') {
             stringArg = src$1(stringArg.slice(1));
             multiplier = new bn$1(-1, 10);
           }
           stringArg = stringArg === '' ? '0' : stringArg;

           if ((!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/))
             || stringArg.match(/^[a-fA-F]+$/)
             || (isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/))) {
             return new bn$1(stringArg, 16).mul(multiplier);
           }

           if ((stringArg.match(/^-?[0-9]+$/) || stringArg === '') && isHexPrefixed === false) {
             return new bn$1(stringArg, 10).mul(multiplier);
           }
         } else if (typeof arg === 'object' && arg.toString && (!arg.pop && !arg.push)) {
           if (arg.toString(10).match(/^-?[0-9]+$/) && (arg.mul || arg.dividedToIntegerBy)) {
             return new bn$1(arg.toString(10), 10);
           }
         }

         throw new Error('[number-to-bn] while converting number ' + JSON.stringify(arg) + ' to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.');
       };

       var zero = new bn(0);
       var negative1 = new bn(-1);

       // complete ethereum unit map
       var unitMap = {
         'noether': '0', // eslint-disable-line
         'wei': '1', // eslint-disable-line
         'kwei': '1000', // eslint-disable-line
         'Kwei': '1000', // eslint-disable-line
         'babbage': '1000', // eslint-disable-line
         'femtoether': '1000', // eslint-disable-line
         'mwei': '1000000', // eslint-disable-line
         'Mwei': '1000000', // eslint-disable-line
         'lovelace': '1000000', // eslint-disable-line
         'picoether': '1000000', // eslint-disable-line
         'gwei': '1000000000', // eslint-disable-line
         'Gwei': '1000000000', // eslint-disable-line
         'shannon': '1000000000', // eslint-disable-line
         'nanoether': '1000000000', // eslint-disable-line
         'nano': '1000000000', // eslint-disable-line
         'szabo': '1000000000000', // eslint-disable-line
         'microether': '1000000000000', // eslint-disable-line
         'micro': '1000000000000', // eslint-disable-line
         'finney': '1000000000000000', // eslint-disable-line
         'milliether': '1000000000000000', // eslint-disable-line
         'milli': '1000000000000000', // eslint-disable-line
         'ether': '1000000000000000000', // eslint-disable-line
         'kether': '1000000000000000000000', // eslint-disable-line
         'grand': '1000000000000000000000', // eslint-disable-line
         'mether': '1000000000000000000000000', // eslint-disable-line
         'gether': '1000000000000000000000000000', // eslint-disable-line
         'tether': '1000000000000000000000000000000' };

       /**
        * Returns value of unit in Wei
        *
        * @method getValueOfUnit
        * @param {String} unit the unit to convert to, default ether
        * @returns {BigNumber} value of the unit (in Wei)
        * @throws error if the unit is not correct:w
        */
       function getValueOfUnit(unitInput) {
         var unit = unitInput ? unitInput.toLowerCase() : 'ether';
         var unitValue = unitMap[unit]; // eslint-disable-line

         if (typeof unitValue !== 'string') {
           throw new Error('[ethjs-unit] the unit provided ' + unitInput + ' doesn\'t exists, please use the one of the following units ' + JSON.stringify(unitMap, null, 2));
         }

         return new bn(unitValue, 10);
       }

       function numberToString(arg) {
         if (typeof arg === 'string') {
           if (!arg.match(/^-?[0-9.]+$/)) {
             throw new Error('while converting number to string, invalid number value \'' + arg + '\', should be a number matching (^-?[0-9.]+).');
           }
           return arg;
         } else if (typeof arg === 'number') {
           return String(arg);
         } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
           if (arg.toPrecision) {
             return String(arg.toPrecision());
           } else {
             // eslint-disable-line
             return arg.toString(10);
           }
         }
         throw new Error('while converting number to string, invalid number value \'' + arg + '\' type ' + typeof arg + '.');
       }

       function fromWei(weiInput, unit, optionsInput) {
         var wei = src$2(weiInput); // eslint-disable-line
         var negative = wei.lt(zero); // eslint-disable-line
         var base = getValueOfUnit(unit);
         var baseLength = unitMap[unit].length - 1 || 1;
         var options = optionsInput || {};

         if (negative) {
           wei = wei.mul(negative1);
         }

         var fraction = wei.mod(base).toString(10); // eslint-disable-line

         while (fraction.length < baseLength) {
           fraction = '0' + fraction;
         }

         if (!options.pad) {
           fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
         }

         var whole = wei.div(base).toString(10); // eslint-disable-line

         if (options.commify) {
           whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
         }

         var value = '' + whole + (fraction == '0' ? '' : '.' + fraction); // eslint-disable-line

         if (negative) {
           value = '-' + value;
         }

         return value;
       }

       function toWei(etherInput, unit) {
         var ether = numberToString(etherInput); // eslint-disable-line
         var base = getValueOfUnit(unit);
         var baseLength = unitMap[unit].length - 1 || 1;

         // Is it negative?
         var negative = ether.substring(0, 1) === '-'; // eslint-disable-line
         if (negative) {
           ether = ether.substring(1);
         }

         if (ether === '.') {
           throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, invalid value');
         }

         // Split it into a whole and fractional part
         var comps = ether.split('.'); // eslint-disable-line
         if (comps.length > 2) {
           throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei,  too many decimal points');
         }

         var whole = comps[0],
             fraction = comps[1]; // eslint-disable-line

         if (!whole) {
           whole = '0';
         }
         if (!fraction) {
           fraction = '0';
         }
         if (fraction.length > baseLength) {
           throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, too many decimal places');
         }

         while (fraction.length < baseLength) {
           fraction += '0';
         }

         whole = new bn(whole);
         fraction = new bn(fraction);
         var wei = whole.mul(base).add(fraction); // eslint-disable-line

         if (negative) {
           wei = wei.mul(negative1);
         }

         return new bn(wei.toString(10), 10);
       }

       var lib = {
         unitMap: unitMap,
         numberToString: numberToString,
         getValueOfUnit: getValueOfUnit,
         fromWei: fromWei,
         toWei: toWei
       };

       var bn$2 = createCommonjsModule(function (module) {
       (function (module, exports) {

         // Utils
         function assert (val, msg) {
           if (!val) throw new Error(msg || 'Assertion failed');
         }

         // Could use `inherits` module, but don't want to move from single file
         // architecture yet.
         function inherits (ctor, superCtor) {
           ctor.super_ = superCtor;
           var TempCtor = function () {};
           TempCtor.prototype = superCtor.prototype;
           ctor.prototype = new TempCtor();
           ctor.prototype.constructor = ctor;
         }

         // BN

         function BN (number, base, endian) {
           if (BN.isBN(number)) {
             return number;
           }

           this.negative = 0;
           this.words = null;
           this.length = 0;

           // Reduction context
           this.red = null;

           if (number !== null) {
             if (base === 'le' || base === 'be') {
               endian = base;
               base = 10;
             }

             this._init(number || 0, base || 10, endian || 'be');
           }
         }
         if (typeof module === 'object') {
           module.exports = BN;
         } else {
           exports.BN = BN;
         }

         BN.BN = BN;
         BN.wordSize = 26;

         var Buffer;
         try {
           Buffer = commonjsRequire('buf' + 'fer').Buffer;
         } catch (e) {
         }

         BN.isBN = function isBN (num) {
           if (num instanceof BN) {
             return true;
           }

           return num !== null && typeof num === 'object' &&
             num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
         };

         BN.max = function max (left, right) {
           if (left.cmp(right) > 0) return left;
           return right;
         };

         BN.min = function min (left, right) {
           if (left.cmp(right) < 0) return left;
           return right;
         };

         BN.prototype._init = function init (number, base, endian) {
           if (typeof number === 'number') {
             return this._initNumber(number, base, endian);
           }

           if (typeof number === 'object') {
             return this._initArray(number, base, endian);
           }

           if (base === 'hex') {
             base = 16;
           }
           assert(base === (base | 0) && base >= 2 && base <= 36);

           number = number.toString().replace(/\s+/g, '');
           var start = 0;
           if (number[0] === '-') {
             start++;
           }

           if (base === 16) {
             this._parseHex(number, start);
           } else {
             this._parseBase(number, base, start);
           }

           if (number[0] === '-') {
             this.negative = 1;
           }

           this.strip();

           if (endian !== 'le') return;

           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initNumber = function _initNumber (number, base, endian) {
           if (number < 0) {
             this.negative = 1;
             number = -number;
           }
           if (number < 0x4000000) {
             this.words = [ number & 0x3ffffff ];
             this.length = 1;
           } else if (number < 0x10000000000000) {
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff
             ];
             this.length = 2;
           } else {
             assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
             this.words = [
               number & 0x3ffffff,
               (number / 0x4000000) & 0x3ffffff,
               1
             ];
             this.length = 3;
           }

           if (endian !== 'le') return;

           // Reverse the bytes
           this._initArray(this.toArray(), base, endian);
         };

         BN.prototype._initArray = function _initArray (number, base, endian) {
           // Perhaps a Uint8Array
           assert(typeof number.length === 'number');
           if (number.length <= 0) {
             this.words = [ 0 ];
             this.length = 1;
             return this;
           }

           this.length = Math.ceil(number.length / 3);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           var off = 0;
           if (endian === 'be') {
             for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
               w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           } else if (endian === 'le') {
             for (i = 0, j = 0; i < number.length; i += 3) {
               w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
               this.words[j] |= (w << off) & 0x3ffffff;
               this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
               off += 24;
               if (off >= 26) {
                 off -= 26;
                 j++;
               }
             }
           }
           return this.strip();
         };

         function parseHex (str, start, end) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r <<= 4;

             // 'a' - 'f'
             if (c >= 49 && c <= 54) {
               r |= c - 49 + 0xa;

             // 'A' - 'F'
             } else if (c >= 17 && c <= 22) {
               r |= c - 17 + 0xa;

             // '0' - '9'
             } else {
               r |= c & 0xf;
             }
           }
           return r;
         }

         BN.prototype._parseHex = function _parseHex (number, start) {
           // Create possibly bigger array to ensure that it fits the number
           this.length = Math.ceil((number.length - start) / 6);
           this.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             this.words[i] = 0;
           }

           var j, w;
           // Scan 24-bit chunks and add them to the number
           var off = 0;
           for (i = number.length - 6, j = 0; i >= start; i -= 6) {
             w = parseHex(number, i, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
             off += 24;
             if (off >= 26) {
               off -= 26;
               j++;
             }
           }
           if (i + 6 !== start) {
             w = parseHex(number, start, i + 6);
             this.words[j] |= (w << off) & 0x3ffffff;
             this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
           }
           this.strip();
         };

         function parseBase (str, start, end, mul) {
           var r = 0;
           var len = Math.min(str.length, end);
           for (var i = start; i < len; i++) {
             var c = str.charCodeAt(i) - 48;

             r *= mul;

             // 'a'
             if (c >= 49) {
               r += c - 49 + 0xa;

             // 'A'
             } else if (c >= 17) {
               r += c - 17 + 0xa;

             // '0' - '9'
             } else {
               r += c;
             }
           }
           return r;
         }

         BN.prototype._parseBase = function _parseBase (number, base, start) {
           // Initialize as zero
           this.words = [ 0 ];
           this.length = 1;

           // Find length of limb in base
           for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
             limbLen++;
           }
           limbLen--;
           limbPow = (limbPow / base) | 0;

           var total = number.length - start;
           var mod = total % limbLen;
           var end = Math.min(total, total - mod) + start;

           var word = 0;
           for (var i = start; i < end; i += limbLen) {
             word = parseBase(number, i, i + limbLen, base);

             this.imuln(limbPow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }

           if (mod !== 0) {
             var pow = 1;
             word = parseBase(number, i, number.length, base);

             for (i = 0; i < mod; i++) {
               pow *= base;
             }

             this.imuln(pow);
             if (this.words[0] + word < 0x4000000) {
               this.words[0] += word;
             } else {
               this._iaddn(word);
             }
           }
         };

         BN.prototype.copy = function copy (dest) {
           dest.words = new Array(this.length);
           for (var i = 0; i < this.length; i++) {
             dest.words[i] = this.words[i];
           }
           dest.length = this.length;
           dest.negative = this.negative;
           dest.red = this.red;
         };

         BN.prototype.clone = function clone () {
           var r = new BN(null);
           this.copy(r);
           return r;
         };

         BN.prototype._expand = function _expand (size) {
           while (this.length < size) {
             this.words[this.length++] = 0;
           }
           return this;
         };

         // Remove leading `0` from `this`
         BN.prototype.strip = function strip () {
           while (this.length > 1 && this.words[this.length - 1] === 0) {
             this.length--;
           }
           return this._normSign();
         };

         BN.prototype._normSign = function _normSign () {
           // -0 = 0
           if (this.length === 1 && this.words[0] === 0) {
             this.negative = 0;
           }
           return this;
         };

         BN.prototype.inspect = function inspect () {
           return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
         };

         /*

         var zeros = [];
         var groupSizes = [];
         var groupBases = [];

         var s = '';
         var i = -1;
         while (++i < BN.wordSize) {
           zeros[i] = s;
           s += '0';
         }
         groupSizes[0] = 0;
         groupSizes[1] = 0;
         groupBases[0] = 0;
         groupBases[1] = 0;
         var base = 2 - 1;
         while (++base < 36 + 1) {
           var groupSize = 0;
           var groupBase = 1;
           while (groupBase < (1 << BN.wordSize) / base) {
             groupBase *= base;
             groupSize += 1;
           }
           groupSizes[base] = groupSize;
           groupBases[base] = groupBase;
         }

         */

         var zeros = [
           '',
           '0',
           '00',
           '000',
           '0000',
           '00000',
           '000000',
           '0000000',
           '00000000',
           '000000000',
           '0000000000',
           '00000000000',
           '000000000000',
           '0000000000000',
           '00000000000000',
           '000000000000000',
           '0000000000000000',
           '00000000000000000',
           '000000000000000000',
           '0000000000000000000',
           '00000000000000000000',
           '000000000000000000000',
           '0000000000000000000000',
           '00000000000000000000000',
           '000000000000000000000000',
           '0000000000000000000000000'
         ];

         var groupSizes = [
           0, 0,
           25, 16, 12, 11, 10, 9, 8,
           8, 7, 7, 7, 7, 6, 6,
           6, 6, 6, 6, 6, 5, 5,
           5, 5, 5, 5, 5, 5, 5,
           5, 5, 5, 5, 5, 5, 5
         ];

         var groupBases = [
           0, 0,
           33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
           43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
           16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
           6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
           24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
         ];

         BN.prototype.toString = function toString (base, padding) {
           base = base || 10;
           padding = padding | 0 || 1;

           var out;
           if (base === 16 || base === 'hex') {
             out = '';
             var off = 0;
             var carry = 0;
             for (var i = 0; i < this.length; i++) {
               var w = this.words[i];
               var word = (((w << off) | carry) & 0xffffff).toString(16);
               carry = (w >>> (24 - off)) & 0xffffff;
               if (carry !== 0 || i !== this.length - 1) {
                 out = zeros[6 - word.length] + word + out;
               } else {
                 out = word + out;
               }
               off += 2;
               if (off >= 26) {
                 off -= 26;
                 i--;
               }
             }
             if (carry !== 0) {
               out = carry.toString(16) + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           if (base === (base | 0) && base >= 2 && base <= 36) {
             // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
             var groupSize = groupSizes[base];
             // var groupBase = Math.pow(base, groupSize);
             var groupBase = groupBases[base];
             out = '';
             var c = this.clone();
             c.negative = 0;
             while (!c.isZero()) {
               var r = c.modn(groupBase).toString(base);
               c = c.idivn(groupBase);

               if (!c.isZero()) {
                 out = zeros[groupSize - r.length] + r + out;
               } else {
                 out = r + out;
               }
             }
             if (this.isZero()) {
               out = '0' + out;
             }
             while (out.length % padding !== 0) {
               out = '0' + out;
             }
             if (this.negative !== 0) {
               out = '-' + out;
             }
             return out;
           }

           assert(false, 'Base should be between 2 and 36');
         };

         BN.prototype.toNumber = function toNumber () {
           var ret = this.words[0];
           if (this.length === 2) {
             ret += this.words[1] * 0x4000000;
           } else if (this.length === 3 && this.words[2] === 0x01) {
             // NOTE: at this stage it is known that the top bit is set
             ret += 0x10000000000000 + (this.words[1] * 0x4000000);
           } else if (this.length > 2) {
             assert(false, 'Number can only safely store up to 53 bits');
           }
           return (this.negative !== 0) ? -ret : ret;
         };

         BN.prototype.toJSON = function toJSON () {
           return this.toString(16);
         };

         BN.prototype.toBuffer = function toBuffer (endian, length) {
           assert(typeof Buffer !== 'undefined');
           return this.toArrayLike(Buffer, endian, length);
         };

         BN.prototype.toArray = function toArray (endian, length) {
           return this.toArrayLike(Array, endian, length);
         };

         BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
           var byteLength = this.byteLength();
           var reqLength = length || Math.max(1, byteLength);
           assert(byteLength <= reqLength, 'byte array longer than desired length');
           assert(reqLength > 0, 'Requested array length <= 0');

           this.strip();
           var littleEndian = endian === 'le';
           var res = new ArrayType(reqLength);

           var b, i;
           var q = this.clone();
           if (!littleEndian) {
             // Assume big-endian
             for (i = 0; i < reqLength - byteLength; i++) {
               res[i] = 0;
             }

             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[reqLength - i - 1] = b;
             }
           } else {
             for (i = 0; !q.isZero(); i++) {
               b = q.andln(0xff);
               q.iushrn(8);

               res[i] = b;
             }

             for (; i < reqLength; i++) {
               res[i] = 0;
             }
           }

           return res;
         };

         if (Math.clz32) {
           BN.prototype._countBits = function _countBits (w) {
             return 32 - Math.clz32(w);
           };
         } else {
           BN.prototype._countBits = function _countBits (w) {
             var t = w;
             var r = 0;
             if (t >= 0x1000) {
               r += 13;
               t >>>= 13;
             }
             if (t >= 0x40) {
               r += 7;
               t >>>= 7;
             }
             if (t >= 0x8) {
               r += 4;
               t >>>= 4;
             }
             if (t >= 0x02) {
               r += 2;
               t >>>= 2;
             }
             return r + t;
           };
         }

         BN.prototype._zeroBits = function _zeroBits (w) {
           // Short-cut
           if (w === 0) return 26;

           var t = w;
           var r = 0;
           if ((t & 0x1fff) === 0) {
             r += 13;
             t >>>= 13;
           }
           if ((t & 0x7f) === 0) {
             r += 7;
             t >>>= 7;
           }
           if ((t & 0xf) === 0) {
             r += 4;
             t >>>= 4;
           }
           if ((t & 0x3) === 0) {
             r += 2;
             t >>>= 2;
           }
           if ((t & 0x1) === 0) {
             r++;
           }
           return r;
         };

         // Return number of used bits in a BN
         BN.prototype.bitLength = function bitLength () {
           var w = this.words[this.length - 1];
           var hi = this._countBits(w);
           return (this.length - 1) * 26 + hi;
         };

         function toBitArray (num) {
           var w = new Array(num.bitLength());

           for (var bit = 0; bit < w.length; bit++) {
             var off = (bit / 26) | 0;
             var wbit = bit % 26;

             w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
           }

           return w;
         }

         // Number of trailing zero bits
         BN.prototype.zeroBits = function zeroBits () {
           if (this.isZero()) return 0;

           var r = 0;
           for (var i = 0; i < this.length; i++) {
             var b = this._zeroBits(this.words[i]);
             r += b;
             if (b !== 26) break;
           }
           return r;
         };

         BN.prototype.byteLength = function byteLength () {
           return Math.ceil(this.bitLength() / 8);
         };

         BN.prototype.toTwos = function toTwos (width) {
           if (this.negative !== 0) {
             return this.abs().inotn(width).iaddn(1);
           }
           return this.clone();
         };

         BN.prototype.fromTwos = function fromTwos (width) {
           if (this.testn(width - 1)) {
             return this.notn(width).iaddn(1).ineg();
           }
           return this.clone();
         };

         BN.prototype.isNeg = function isNeg () {
           return this.negative !== 0;
         };

         // Return negative clone of `this`
         BN.prototype.neg = function neg () {
           return this.clone().ineg();
         };

         BN.prototype.ineg = function ineg () {
           if (!this.isZero()) {
             this.negative ^= 1;
           }

           return this;
         };

         // Or `num` with `this` in-place
         BN.prototype.iuor = function iuor (num) {
           while (this.length < num.length) {
             this.words[this.length++] = 0;
           }

           for (var i = 0; i < num.length; i++) {
             this.words[i] = this.words[i] | num.words[i];
           }

           return this.strip();
         };

         BN.prototype.ior = function ior (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuor(num);
         };

         // Or `num` with `this`
         BN.prototype.or = function or (num) {
           if (this.length > num.length) return this.clone().ior(num);
           return num.clone().ior(this);
         };

         BN.prototype.uor = function uor (num) {
           if (this.length > num.length) return this.clone().iuor(num);
           return num.clone().iuor(this);
         };

         // And `num` with `this` in-place
         BN.prototype.iuand = function iuand (num) {
           // b = min-length(num, this)
           var b;
           if (this.length > num.length) {
             b = num;
           } else {
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = this.words[i] & num.words[i];
           }

           this.length = b.length;

           return this.strip();
         };

         BN.prototype.iand = function iand (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuand(num);
         };

         // And `num` with `this`
         BN.prototype.and = function and (num) {
           if (this.length > num.length) return this.clone().iand(num);
           return num.clone().iand(this);
         };

         BN.prototype.uand = function uand (num) {
           if (this.length > num.length) return this.clone().iuand(num);
           return num.clone().iuand(this);
         };

         // Xor `num` with `this` in-place
         BN.prototype.iuxor = function iuxor (num) {
           // a.length > b.length
           var a;
           var b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           for (var i = 0; i < b.length; i++) {
             this.words[i] = a.words[i] ^ b.words[i];
           }

           if (this !== a) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = a.length;

           return this.strip();
         };

         BN.prototype.ixor = function ixor (num) {
           assert((this.negative | num.negative) === 0);
           return this.iuxor(num);
         };

         // Xor `num` with `this`
         BN.prototype.xor = function xor (num) {
           if (this.length > num.length) return this.clone().ixor(num);
           return num.clone().ixor(this);
         };

         BN.prototype.uxor = function uxor (num) {
           if (this.length > num.length) return this.clone().iuxor(num);
           return num.clone().iuxor(this);
         };

         // Not ``this`` with ``width`` bitwidth
         BN.prototype.inotn = function inotn (width) {
           assert(typeof width === 'number' && width >= 0);

           var bytesNeeded = Math.ceil(width / 26) | 0;
           var bitsLeft = width % 26;

           // Extend the buffer with leading zeroes
           this._expand(bytesNeeded);

           if (bitsLeft > 0) {
             bytesNeeded--;
           }

           // Handle complete words
           for (var i = 0; i < bytesNeeded; i++) {
             this.words[i] = ~this.words[i] & 0x3ffffff;
           }

           // Handle the residue
           if (bitsLeft > 0) {
             this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
           }

           // And remove leading zeroes
           return this.strip();
         };

         BN.prototype.notn = function notn (width) {
           return this.clone().inotn(width);
         };

         // Set `bit` of `this`
         BN.prototype.setn = function setn (bit, val) {
           assert(typeof bit === 'number' && bit >= 0);

           var off = (bit / 26) | 0;
           var wbit = bit % 26;

           this._expand(off + 1);

           if (val) {
             this.words[off] = this.words[off] | (1 << wbit);
           } else {
             this.words[off] = this.words[off] & ~(1 << wbit);
           }

           return this.strip();
         };

         // Add `num` to `this` in-place
         BN.prototype.iadd = function iadd (num) {
           var r;

           // negative + positive
           if (this.negative !== 0 && num.negative === 0) {
             this.negative = 0;
             r = this.isub(num);
             this.negative ^= 1;
             return this._normSign();

           // positive + negative
           } else if (this.negative === 0 && num.negative !== 0) {
             num.negative = 0;
             r = this.isub(num);
             num.negative = 1;
             return r._normSign();
           }

           // a.length > b.length
           var a, b;
           if (this.length > num.length) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             this.words[i] = r & 0x3ffffff;
             carry = r >>> 26;
           }

           this.length = a.length;
           if (carry !== 0) {
             this.words[this.length] = carry;
             this.length++;
           // Copy the rest of the words
           } else if (a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           return this;
         };

         // Add `num` to `this`
         BN.prototype.add = function add (num) {
           var res;
           if (num.negative !== 0 && this.negative === 0) {
             num.negative = 0;
             res = this.sub(num);
             num.negative ^= 1;
             return res;
           } else if (num.negative === 0 && this.negative !== 0) {
             this.negative = 0;
             res = num.sub(this);
             this.negative = 1;
             return res;
           }

           if (this.length > num.length) return this.clone().iadd(num);

           return num.clone().iadd(this);
         };

         // Subtract `num` from `this` in-place
         BN.prototype.isub = function isub (num) {
           // this - (-num) = this + num
           if (num.negative !== 0) {
             num.negative = 0;
             var r = this.iadd(num);
             num.negative = 1;
             return r._normSign();

           // -this - num = -(this + num)
           } else if (this.negative !== 0) {
             this.negative = 0;
             this.iadd(num);
             this.negative = 1;
             return this._normSign();
           }

           // At this point both numbers are positive
           var cmp = this.cmp(num);

           // Optimization - zeroify
           if (cmp === 0) {
             this.negative = 0;
             this.length = 1;
             this.words[0] = 0;
             return this;
           }

           // a > b
           var a, b;
           if (cmp > 0) {
             a = this;
             b = num;
           } else {
             a = num;
             b = this;
           }

           var carry = 0;
           for (var i = 0; i < b.length; i++) {
             r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }
           for (; carry !== 0 && i < a.length; i++) {
             r = (a.words[i] | 0) + carry;
             carry = r >> 26;
             this.words[i] = r & 0x3ffffff;
           }

           // Copy rest of the words
           if (carry === 0 && i < a.length && a !== this) {
             for (; i < a.length; i++) {
               this.words[i] = a.words[i];
             }
           }

           this.length = Math.max(this.length, i);

           if (a !== this) {
             this.negative = 1;
           }

           return this.strip();
         };

         // Subtract `num` from `this`
         BN.prototype.sub = function sub (num) {
           return this.clone().isub(num);
         };

         function smallMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           var len = (self.length + num.length) | 0;
           out.length = len;
           len = (len - 1) | 0;

           // Peel one iteration (compiler can't do it, because of code complexity)
           var a = self.words[0] | 0;
           var b = num.words[0] | 0;
           var r = a * b;

           var lo = r & 0x3ffffff;
           var carry = (r / 0x4000000) | 0;
           out.words[0] = lo;

           for (var k = 1; k < len; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = carry >>> 26;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = (k - j) | 0;
               a = self.words[i] | 0;
               b = num.words[j] | 0;
               r = a * b + rword;
               ncarry += (r / 0x4000000) | 0;
               rword = r & 0x3ffffff;
             }
             out.words[k] = rword | 0;
             carry = ncarry | 0;
           }
           if (carry !== 0) {
             out.words[k] = carry | 0;
           } else {
             out.length--;
           }

           return out.strip();
         }

         // TODO(indutny): it may be reasonable to omit it for users who don't need
         // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
         // multiplication (like elliptic secp256k1).
         var comb10MulTo = function comb10MulTo (self, num, out) {
           var a = self.words;
           var b = num.words;
           var o = out.words;
           var c = 0;
           var lo;
           var mid;
           var hi;
           var a0 = a[0] | 0;
           var al0 = a0 & 0x1fff;
           var ah0 = a0 >>> 13;
           var a1 = a[1] | 0;
           var al1 = a1 & 0x1fff;
           var ah1 = a1 >>> 13;
           var a2 = a[2] | 0;
           var al2 = a2 & 0x1fff;
           var ah2 = a2 >>> 13;
           var a3 = a[3] | 0;
           var al3 = a3 & 0x1fff;
           var ah3 = a3 >>> 13;
           var a4 = a[4] | 0;
           var al4 = a4 & 0x1fff;
           var ah4 = a4 >>> 13;
           var a5 = a[5] | 0;
           var al5 = a5 & 0x1fff;
           var ah5 = a5 >>> 13;
           var a6 = a[6] | 0;
           var al6 = a6 & 0x1fff;
           var ah6 = a6 >>> 13;
           var a7 = a[7] | 0;
           var al7 = a7 & 0x1fff;
           var ah7 = a7 >>> 13;
           var a8 = a[8] | 0;
           var al8 = a8 & 0x1fff;
           var ah8 = a8 >>> 13;
           var a9 = a[9] | 0;
           var al9 = a9 & 0x1fff;
           var ah9 = a9 >>> 13;
           var b0 = b[0] | 0;
           var bl0 = b0 & 0x1fff;
           var bh0 = b0 >>> 13;
           var b1 = b[1] | 0;
           var bl1 = b1 & 0x1fff;
           var bh1 = b1 >>> 13;
           var b2 = b[2] | 0;
           var bl2 = b2 & 0x1fff;
           var bh2 = b2 >>> 13;
           var b3 = b[3] | 0;
           var bl3 = b3 & 0x1fff;
           var bh3 = b3 >>> 13;
           var b4 = b[4] | 0;
           var bl4 = b4 & 0x1fff;
           var bh4 = b4 >>> 13;
           var b5 = b[5] | 0;
           var bl5 = b5 & 0x1fff;
           var bh5 = b5 >>> 13;
           var b6 = b[6] | 0;
           var bl6 = b6 & 0x1fff;
           var bh6 = b6 >>> 13;
           var b7 = b[7] | 0;
           var bl7 = b7 & 0x1fff;
           var bh7 = b7 >>> 13;
           var b8 = b[8] | 0;
           var bl8 = b8 & 0x1fff;
           var bh8 = b8 >>> 13;
           var b9 = b[9] | 0;
           var bl9 = b9 & 0x1fff;
           var bh9 = b9 >>> 13;

           out.negative = self.negative ^ num.negative;
           out.length = 19;
           /* k = 0 */
           lo = Math.imul(al0, bl0);
           mid = Math.imul(al0, bh0);
           mid = (mid + Math.imul(ah0, bl0)) | 0;
           hi = Math.imul(ah0, bh0);
           var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
           w0 &= 0x3ffffff;
           /* k = 1 */
           lo = Math.imul(al1, bl0);
           mid = Math.imul(al1, bh0);
           mid = (mid + Math.imul(ah1, bl0)) | 0;
           hi = Math.imul(ah1, bh0);
           lo = (lo + Math.imul(al0, bl1)) | 0;
           mid = (mid + Math.imul(al0, bh1)) | 0;
           mid = (mid + Math.imul(ah0, bl1)) | 0;
           hi = (hi + Math.imul(ah0, bh1)) | 0;
           var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
           w1 &= 0x3ffffff;
           /* k = 2 */
           lo = Math.imul(al2, bl0);
           mid = Math.imul(al2, bh0);
           mid = (mid + Math.imul(ah2, bl0)) | 0;
           hi = Math.imul(ah2, bh0);
           lo = (lo + Math.imul(al1, bl1)) | 0;
           mid = (mid + Math.imul(al1, bh1)) | 0;
           mid = (mid + Math.imul(ah1, bl1)) | 0;
           hi = (hi + Math.imul(ah1, bh1)) | 0;
           lo = (lo + Math.imul(al0, bl2)) | 0;
           mid = (mid + Math.imul(al0, bh2)) | 0;
           mid = (mid + Math.imul(ah0, bl2)) | 0;
           hi = (hi + Math.imul(ah0, bh2)) | 0;
           var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
           w2 &= 0x3ffffff;
           /* k = 3 */
           lo = Math.imul(al3, bl0);
           mid = Math.imul(al3, bh0);
           mid = (mid + Math.imul(ah3, bl0)) | 0;
           hi = Math.imul(ah3, bh0);
           lo = (lo + Math.imul(al2, bl1)) | 0;
           mid = (mid + Math.imul(al2, bh1)) | 0;
           mid = (mid + Math.imul(ah2, bl1)) | 0;
           hi = (hi + Math.imul(ah2, bh1)) | 0;
           lo = (lo + Math.imul(al1, bl2)) | 0;
           mid = (mid + Math.imul(al1, bh2)) | 0;
           mid = (mid + Math.imul(ah1, bl2)) | 0;
           hi = (hi + Math.imul(ah1, bh2)) | 0;
           lo = (lo + Math.imul(al0, bl3)) | 0;
           mid = (mid + Math.imul(al0, bh3)) | 0;
           mid = (mid + Math.imul(ah0, bl3)) | 0;
           hi = (hi + Math.imul(ah0, bh3)) | 0;
           var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
           w3 &= 0x3ffffff;
           /* k = 4 */
           lo = Math.imul(al4, bl0);
           mid = Math.imul(al4, bh0);
           mid = (mid + Math.imul(ah4, bl0)) | 0;
           hi = Math.imul(ah4, bh0);
           lo = (lo + Math.imul(al3, bl1)) | 0;
           mid = (mid + Math.imul(al3, bh1)) | 0;
           mid = (mid + Math.imul(ah3, bl1)) | 0;
           hi = (hi + Math.imul(ah3, bh1)) | 0;
           lo = (lo + Math.imul(al2, bl2)) | 0;
           mid = (mid + Math.imul(al2, bh2)) | 0;
           mid = (mid + Math.imul(ah2, bl2)) | 0;
           hi = (hi + Math.imul(ah2, bh2)) | 0;
           lo = (lo + Math.imul(al1, bl3)) | 0;
           mid = (mid + Math.imul(al1, bh3)) | 0;
           mid = (mid + Math.imul(ah1, bl3)) | 0;
           hi = (hi + Math.imul(ah1, bh3)) | 0;
           lo = (lo + Math.imul(al0, bl4)) | 0;
           mid = (mid + Math.imul(al0, bh4)) | 0;
           mid = (mid + Math.imul(ah0, bl4)) | 0;
           hi = (hi + Math.imul(ah0, bh4)) | 0;
           var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
           w4 &= 0x3ffffff;
           /* k = 5 */
           lo = Math.imul(al5, bl0);
           mid = Math.imul(al5, bh0);
           mid = (mid + Math.imul(ah5, bl0)) | 0;
           hi = Math.imul(ah5, bh0);
           lo = (lo + Math.imul(al4, bl1)) | 0;
           mid = (mid + Math.imul(al4, bh1)) | 0;
           mid = (mid + Math.imul(ah4, bl1)) | 0;
           hi = (hi + Math.imul(ah4, bh1)) | 0;
           lo = (lo + Math.imul(al3, bl2)) | 0;
           mid = (mid + Math.imul(al3, bh2)) | 0;
           mid = (mid + Math.imul(ah3, bl2)) | 0;
           hi = (hi + Math.imul(ah3, bh2)) | 0;
           lo = (lo + Math.imul(al2, bl3)) | 0;
           mid = (mid + Math.imul(al2, bh3)) | 0;
           mid = (mid + Math.imul(ah2, bl3)) | 0;
           hi = (hi + Math.imul(ah2, bh3)) | 0;
           lo = (lo + Math.imul(al1, bl4)) | 0;
           mid = (mid + Math.imul(al1, bh4)) | 0;
           mid = (mid + Math.imul(ah1, bl4)) | 0;
           hi = (hi + Math.imul(ah1, bh4)) | 0;
           lo = (lo + Math.imul(al0, bl5)) | 0;
           mid = (mid + Math.imul(al0, bh5)) | 0;
           mid = (mid + Math.imul(ah0, bl5)) | 0;
           hi = (hi + Math.imul(ah0, bh5)) | 0;
           var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
           w5 &= 0x3ffffff;
           /* k = 6 */
           lo = Math.imul(al6, bl0);
           mid = Math.imul(al6, bh0);
           mid = (mid + Math.imul(ah6, bl0)) | 0;
           hi = Math.imul(ah6, bh0);
           lo = (lo + Math.imul(al5, bl1)) | 0;
           mid = (mid + Math.imul(al5, bh1)) | 0;
           mid = (mid + Math.imul(ah5, bl1)) | 0;
           hi = (hi + Math.imul(ah5, bh1)) | 0;
           lo = (lo + Math.imul(al4, bl2)) | 0;
           mid = (mid + Math.imul(al4, bh2)) | 0;
           mid = (mid + Math.imul(ah4, bl2)) | 0;
           hi = (hi + Math.imul(ah4, bh2)) | 0;
           lo = (lo + Math.imul(al3, bl3)) | 0;
           mid = (mid + Math.imul(al3, bh3)) | 0;
           mid = (mid + Math.imul(ah3, bl3)) | 0;
           hi = (hi + Math.imul(ah3, bh3)) | 0;
           lo = (lo + Math.imul(al2, bl4)) | 0;
           mid = (mid + Math.imul(al2, bh4)) | 0;
           mid = (mid + Math.imul(ah2, bl4)) | 0;
           hi = (hi + Math.imul(ah2, bh4)) | 0;
           lo = (lo + Math.imul(al1, bl5)) | 0;
           mid = (mid + Math.imul(al1, bh5)) | 0;
           mid = (mid + Math.imul(ah1, bl5)) | 0;
           hi = (hi + Math.imul(ah1, bh5)) | 0;
           lo = (lo + Math.imul(al0, bl6)) | 0;
           mid = (mid + Math.imul(al0, bh6)) | 0;
           mid = (mid + Math.imul(ah0, bl6)) | 0;
           hi = (hi + Math.imul(ah0, bh6)) | 0;
           var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
           w6 &= 0x3ffffff;
           /* k = 7 */
           lo = Math.imul(al7, bl0);
           mid = Math.imul(al7, bh0);
           mid = (mid + Math.imul(ah7, bl0)) | 0;
           hi = Math.imul(ah7, bh0);
           lo = (lo + Math.imul(al6, bl1)) | 0;
           mid = (mid + Math.imul(al6, bh1)) | 0;
           mid = (mid + Math.imul(ah6, bl1)) | 0;
           hi = (hi + Math.imul(ah6, bh1)) | 0;
           lo = (lo + Math.imul(al5, bl2)) | 0;
           mid = (mid + Math.imul(al5, bh2)) | 0;
           mid = (mid + Math.imul(ah5, bl2)) | 0;
           hi = (hi + Math.imul(ah5, bh2)) | 0;
           lo = (lo + Math.imul(al4, bl3)) | 0;
           mid = (mid + Math.imul(al4, bh3)) | 0;
           mid = (mid + Math.imul(ah4, bl3)) | 0;
           hi = (hi + Math.imul(ah4, bh3)) | 0;
           lo = (lo + Math.imul(al3, bl4)) | 0;
           mid = (mid + Math.imul(al3, bh4)) | 0;
           mid = (mid + Math.imul(ah3, bl4)) | 0;
           hi = (hi + Math.imul(ah3, bh4)) | 0;
           lo = (lo + Math.imul(al2, bl5)) | 0;
           mid = (mid + Math.imul(al2, bh5)) | 0;
           mid = (mid + Math.imul(ah2, bl5)) | 0;
           hi = (hi + Math.imul(ah2, bh5)) | 0;
           lo = (lo + Math.imul(al1, bl6)) | 0;
           mid = (mid + Math.imul(al1, bh6)) | 0;
           mid = (mid + Math.imul(ah1, bl6)) | 0;
           hi = (hi + Math.imul(ah1, bh6)) | 0;
           lo = (lo + Math.imul(al0, bl7)) | 0;
           mid = (mid + Math.imul(al0, bh7)) | 0;
           mid = (mid + Math.imul(ah0, bl7)) | 0;
           hi = (hi + Math.imul(ah0, bh7)) | 0;
           var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
           w7 &= 0x3ffffff;
           /* k = 8 */
           lo = Math.imul(al8, bl0);
           mid = Math.imul(al8, bh0);
           mid = (mid + Math.imul(ah8, bl0)) | 0;
           hi = Math.imul(ah8, bh0);
           lo = (lo + Math.imul(al7, bl1)) | 0;
           mid = (mid + Math.imul(al7, bh1)) | 0;
           mid = (mid + Math.imul(ah7, bl1)) | 0;
           hi = (hi + Math.imul(ah7, bh1)) | 0;
           lo = (lo + Math.imul(al6, bl2)) | 0;
           mid = (mid + Math.imul(al6, bh2)) | 0;
           mid = (mid + Math.imul(ah6, bl2)) | 0;
           hi = (hi + Math.imul(ah6, bh2)) | 0;
           lo = (lo + Math.imul(al5, bl3)) | 0;
           mid = (mid + Math.imul(al5, bh3)) | 0;
           mid = (mid + Math.imul(ah5, bl3)) | 0;
           hi = (hi + Math.imul(ah5, bh3)) | 0;
           lo = (lo + Math.imul(al4, bl4)) | 0;
           mid = (mid + Math.imul(al4, bh4)) | 0;
           mid = (mid + Math.imul(ah4, bl4)) | 0;
           hi = (hi + Math.imul(ah4, bh4)) | 0;
           lo = (lo + Math.imul(al3, bl5)) | 0;
           mid = (mid + Math.imul(al3, bh5)) | 0;
           mid = (mid + Math.imul(ah3, bl5)) | 0;
           hi = (hi + Math.imul(ah3, bh5)) | 0;
           lo = (lo + Math.imul(al2, bl6)) | 0;
           mid = (mid + Math.imul(al2, bh6)) | 0;
           mid = (mid + Math.imul(ah2, bl6)) | 0;
           hi = (hi + Math.imul(ah2, bh6)) | 0;
           lo = (lo + Math.imul(al1, bl7)) | 0;
           mid = (mid + Math.imul(al1, bh7)) | 0;
           mid = (mid + Math.imul(ah1, bl7)) | 0;
           hi = (hi + Math.imul(ah1, bh7)) | 0;
           lo = (lo + Math.imul(al0, bl8)) | 0;
           mid = (mid + Math.imul(al0, bh8)) | 0;
           mid = (mid + Math.imul(ah0, bl8)) | 0;
           hi = (hi + Math.imul(ah0, bh8)) | 0;
           var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
           w8 &= 0x3ffffff;
           /* k = 9 */
           lo = Math.imul(al9, bl0);
           mid = Math.imul(al9, bh0);
           mid = (mid + Math.imul(ah9, bl0)) | 0;
           hi = Math.imul(ah9, bh0);
           lo = (lo + Math.imul(al8, bl1)) | 0;
           mid = (mid + Math.imul(al8, bh1)) | 0;
           mid = (mid + Math.imul(ah8, bl1)) | 0;
           hi = (hi + Math.imul(ah8, bh1)) | 0;
           lo = (lo + Math.imul(al7, bl2)) | 0;
           mid = (mid + Math.imul(al7, bh2)) | 0;
           mid = (mid + Math.imul(ah7, bl2)) | 0;
           hi = (hi + Math.imul(ah7, bh2)) | 0;
           lo = (lo + Math.imul(al6, bl3)) | 0;
           mid = (mid + Math.imul(al6, bh3)) | 0;
           mid = (mid + Math.imul(ah6, bl3)) | 0;
           hi = (hi + Math.imul(ah6, bh3)) | 0;
           lo = (lo + Math.imul(al5, bl4)) | 0;
           mid = (mid + Math.imul(al5, bh4)) | 0;
           mid = (mid + Math.imul(ah5, bl4)) | 0;
           hi = (hi + Math.imul(ah5, bh4)) | 0;
           lo = (lo + Math.imul(al4, bl5)) | 0;
           mid = (mid + Math.imul(al4, bh5)) | 0;
           mid = (mid + Math.imul(ah4, bl5)) | 0;
           hi = (hi + Math.imul(ah4, bh5)) | 0;
           lo = (lo + Math.imul(al3, bl6)) | 0;
           mid = (mid + Math.imul(al3, bh6)) | 0;
           mid = (mid + Math.imul(ah3, bl6)) | 0;
           hi = (hi + Math.imul(ah3, bh6)) | 0;
           lo = (lo + Math.imul(al2, bl7)) | 0;
           mid = (mid + Math.imul(al2, bh7)) | 0;
           mid = (mid + Math.imul(ah2, bl7)) | 0;
           hi = (hi + Math.imul(ah2, bh7)) | 0;
           lo = (lo + Math.imul(al1, bl8)) | 0;
           mid = (mid + Math.imul(al1, bh8)) | 0;
           mid = (mid + Math.imul(ah1, bl8)) | 0;
           hi = (hi + Math.imul(ah1, bh8)) | 0;
           lo = (lo + Math.imul(al0, bl9)) | 0;
           mid = (mid + Math.imul(al0, bh9)) | 0;
           mid = (mid + Math.imul(ah0, bl9)) | 0;
           hi = (hi + Math.imul(ah0, bh9)) | 0;
           var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
           w9 &= 0x3ffffff;
           /* k = 10 */
           lo = Math.imul(al9, bl1);
           mid = Math.imul(al9, bh1);
           mid = (mid + Math.imul(ah9, bl1)) | 0;
           hi = Math.imul(ah9, bh1);
           lo = (lo + Math.imul(al8, bl2)) | 0;
           mid = (mid + Math.imul(al8, bh2)) | 0;
           mid = (mid + Math.imul(ah8, bl2)) | 0;
           hi = (hi + Math.imul(ah8, bh2)) | 0;
           lo = (lo + Math.imul(al7, bl3)) | 0;
           mid = (mid + Math.imul(al7, bh3)) | 0;
           mid = (mid + Math.imul(ah7, bl3)) | 0;
           hi = (hi + Math.imul(ah7, bh3)) | 0;
           lo = (lo + Math.imul(al6, bl4)) | 0;
           mid = (mid + Math.imul(al6, bh4)) | 0;
           mid = (mid + Math.imul(ah6, bl4)) | 0;
           hi = (hi + Math.imul(ah6, bh4)) | 0;
           lo = (lo + Math.imul(al5, bl5)) | 0;
           mid = (mid + Math.imul(al5, bh5)) | 0;
           mid = (mid + Math.imul(ah5, bl5)) | 0;
           hi = (hi + Math.imul(ah5, bh5)) | 0;
           lo = (lo + Math.imul(al4, bl6)) | 0;
           mid = (mid + Math.imul(al4, bh6)) | 0;
           mid = (mid + Math.imul(ah4, bl6)) | 0;
           hi = (hi + Math.imul(ah4, bh6)) | 0;
           lo = (lo + Math.imul(al3, bl7)) | 0;
           mid = (mid + Math.imul(al3, bh7)) | 0;
           mid = (mid + Math.imul(ah3, bl7)) | 0;
           hi = (hi + Math.imul(ah3, bh7)) | 0;
           lo = (lo + Math.imul(al2, bl8)) | 0;
           mid = (mid + Math.imul(al2, bh8)) | 0;
           mid = (mid + Math.imul(ah2, bl8)) | 0;
           hi = (hi + Math.imul(ah2, bh8)) | 0;
           lo = (lo + Math.imul(al1, bl9)) | 0;
           mid = (mid + Math.imul(al1, bh9)) | 0;
           mid = (mid + Math.imul(ah1, bl9)) | 0;
           hi = (hi + Math.imul(ah1, bh9)) | 0;
           var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
           w10 &= 0x3ffffff;
           /* k = 11 */
           lo = Math.imul(al9, bl2);
           mid = Math.imul(al9, bh2);
           mid = (mid + Math.imul(ah9, bl2)) | 0;
           hi = Math.imul(ah9, bh2);
           lo = (lo + Math.imul(al8, bl3)) | 0;
           mid = (mid + Math.imul(al8, bh3)) | 0;
           mid = (mid + Math.imul(ah8, bl3)) | 0;
           hi = (hi + Math.imul(ah8, bh3)) | 0;
           lo = (lo + Math.imul(al7, bl4)) | 0;
           mid = (mid + Math.imul(al7, bh4)) | 0;
           mid = (mid + Math.imul(ah7, bl4)) | 0;
           hi = (hi + Math.imul(ah7, bh4)) | 0;
           lo = (lo + Math.imul(al6, bl5)) | 0;
           mid = (mid + Math.imul(al6, bh5)) | 0;
           mid = (mid + Math.imul(ah6, bl5)) | 0;
           hi = (hi + Math.imul(ah6, bh5)) | 0;
           lo = (lo + Math.imul(al5, bl6)) | 0;
           mid = (mid + Math.imul(al5, bh6)) | 0;
           mid = (mid + Math.imul(ah5, bl6)) | 0;
           hi = (hi + Math.imul(ah5, bh6)) | 0;
           lo = (lo + Math.imul(al4, bl7)) | 0;
           mid = (mid + Math.imul(al4, bh7)) | 0;
           mid = (mid + Math.imul(ah4, bl7)) | 0;
           hi = (hi + Math.imul(ah4, bh7)) | 0;
           lo = (lo + Math.imul(al3, bl8)) | 0;
           mid = (mid + Math.imul(al3, bh8)) | 0;
           mid = (mid + Math.imul(ah3, bl8)) | 0;
           hi = (hi + Math.imul(ah3, bh8)) | 0;
           lo = (lo + Math.imul(al2, bl9)) | 0;
           mid = (mid + Math.imul(al2, bh9)) | 0;
           mid = (mid + Math.imul(ah2, bl9)) | 0;
           hi = (hi + Math.imul(ah2, bh9)) | 0;
           var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
           w11 &= 0x3ffffff;
           /* k = 12 */
           lo = Math.imul(al9, bl3);
           mid = Math.imul(al9, bh3);
           mid = (mid + Math.imul(ah9, bl3)) | 0;
           hi = Math.imul(ah9, bh3);
           lo = (lo + Math.imul(al8, bl4)) | 0;
           mid = (mid + Math.imul(al8, bh4)) | 0;
           mid = (mid + Math.imul(ah8, bl4)) | 0;
           hi = (hi + Math.imul(ah8, bh4)) | 0;
           lo = (lo + Math.imul(al7, bl5)) | 0;
           mid = (mid + Math.imul(al7, bh5)) | 0;
           mid = (mid + Math.imul(ah7, bl5)) | 0;
           hi = (hi + Math.imul(ah7, bh5)) | 0;
           lo = (lo + Math.imul(al6, bl6)) | 0;
           mid = (mid + Math.imul(al6, bh6)) | 0;
           mid = (mid + Math.imul(ah6, bl6)) | 0;
           hi = (hi + Math.imul(ah6, bh6)) | 0;
           lo = (lo + Math.imul(al5, bl7)) | 0;
           mid = (mid + Math.imul(al5, bh7)) | 0;
           mid = (mid + Math.imul(ah5, bl7)) | 0;
           hi = (hi + Math.imul(ah5, bh7)) | 0;
           lo = (lo + Math.imul(al4, bl8)) | 0;
           mid = (mid + Math.imul(al4, bh8)) | 0;
           mid = (mid + Math.imul(ah4, bl8)) | 0;
           hi = (hi + Math.imul(ah4, bh8)) | 0;
           lo = (lo + Math.imul(al3, bl9)) | 0;
           mid = (mid + Math.imul(al3, bh9)) | 0;
           mid = (mid + Math.imul(ah3, bl9)) | 0;
           hi = (hi + Math.imul(ah3, bh9)) | 0;
           var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
           w12 &= 0x3ffffff;
           /* k = 13 */
           lo = Math.imul(al9, bl4);
           mid = Math.imul(al9, bh4);
           mid = (mid + Math.imul(ah9, bl4)) | 0;
           hi = Math.imul(ah9, bh4);
           lo = (lo + Math.imul(al8, bl5)) | 0;
           mid = (mid + Math.imul(al8, bh5)) | 0;
           mid = (mid + Math.imul(ah8, bl5)) | 0;
           hi = (hi + Math.imul(ah8, bh5)) | 0;
           lo = (lo + Math.imul(al7, bl6)) | 0;
           mid = (mid + Math.imul(al7, bh6)) | 0;
           mid = (mid + Math.imul(ah7, bl6)) | 0;
           hi = (hi + Math.imul(ah7, bh6)) | 0;
           lo = (lo + Math.imul(al6, bl7)) | 0;
           mid = (mid + Math.imul(al6, bh7)) | 0;
           mid = (mid + Math.imul(ah6, bl7)) | 0;
           hi = (hi + Math.imul(ah6, bh7)) | 0;
           lo = (lo + Math.imul(al5, bl8)) | 0;
           mid = (mid + Math.imul(al5, bh8)) | 0;
           mid = (mid + Math.imul(ah5, bl8)) | 0;
           hi = (hi + Math.imul(ah5, bh8)) | 0;
           lo = (lo + Math.imul(al4, bl9)) | 0;
           mid = (mid + Math.imul(al4, bh9)) | 0;
           mid = (mid + Math.imul(ah4, bl9)) | 0;
           hi = (hi + Math.imul(ah4, bh9)) | 0;
           var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
           w13 &= 0x3ffffff;
           /* k = 14 */
           lo = Math.imul(al9, bl5);
           mid = Math.imul(al9, bh5);
           mid = (mid + Math.imul(ah9, bl5)) | 0;
           hi = Math.imul(ah9, bh5);
           lo = (lo + Math.imul(al8, bl6)) | 0;
           mid = (mid + Math.imul(al8, bh6)) | 0;
           mid = (mid + Math.imul(ah8, bl6)) | 0;
           hi = (hi + Math.imul(ah8, bh6)) | 0;
           lo = (lo + Math.imul(al7, bl7)) | 0;
           mid = (mid + Math.imul(al7, bh7)) | 0;
           mid = (mid + Math.imul(ah7, bl7)) | 0;
           hi = (hi + Math.imul(ah7, bh7)) | 0;
           lo = (lo + Math.imul(al6, bl8)) | 0;
           mid = (mid + Math.imul(al6, bh8)) | 0;
           mid = (mid + Math.imul(ah6, bl8)) | 0;
           hi = (hi + Math.imul(ah6, bh8)) | 0;
           lo = (lo + Math.imul(al5, bl9)) | 0;
           mid = (mid + Math.imul(al5, bh9)) | 0;
           mid = (mid + Math.imul(ah5, bl9)) | 0;
           hi = (hi + Math.imul(ah5, bh9)) | 0;
           var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
           w14 &= 0x3ffffff;
           /* k = 15 */
           lo = Math.imul(al9, bl6);
           mid = Math.imul(al9, bh6);
           mid = (mid + Math.imul(ah9, bl6)) | 0;
           hi = Math.imul(ah9, bh6);
           lo = (lo + Math.imul(al8, bl7)) | 0;
           mid = (mid + Math.imul(al8, bh7)) | 0;
           mid = (mid + Math.imul(ah8, bl7)) | 0;
           hi = (hi + Math.imul(ah8, bh7)) | 0;
           lo = (lo + Math.imul(al7, bl8)) | 0;
           mid = (mid + Math.imul(al7, bh8)) | 0;
           mid = (mid + Math.imul(ah7, bl8)) | 0;
           hi = (hi + Math.imul(ah7, bh8)) | 0;
           lo = (lo + Math.imul(al6, bl9)) | 0;
           mid = (mid + Math.imul(al6, bh9)) | 0;
           mid = (mid + Math.imul(ah6, bl9)) | 0;
           hi = (hi + Math.imul(ah6, bh9)) | 0;
           var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
           w15 &= 0x3ffffff;
           /* k = 16 */
           lo = Math.imul(al9, bl7);
           mid = Math.imul(al9, bh7);
           mid = (mid + Math.imul(ah9, bl7)) | 0;
           hi = Math.imul(ah9, bh7);
           lo = (lo + Math.imul(al8, bl8)) | 0;
           mid = (mid + Math.imul(al8, bh8)) | 0;
           mid = (mid + Math.imul(ah8, bl8)) | 0;
           hi = (hi + Math.imul(ah8, bh8)) | 0;
           lo = (lo + Math.imul(al7, bl9)) | 0;
           mid = (mid + Math.imul(al7, bh9)) | 0;
           mid = (mid + Math.imul(ah7, bl9)) | 0;
           hi = (hi + Math.imul(ah7, bh9)) | 0;
           var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
           w16 &= 0x3ffffff;
           /* k = 17 */
           lo = Math.imul(al9, bl8);
           mid = Math.imul(al9, bh8);
           mid = (mid + Math.imul(ah9, bl8)) | 0;
           hi = Math.imul(ah9, bh8);
           lo = (lo + Math.imul(al8, bl9)) | 0;
           mid = (mid + Math.imul(al8, bh9)) | 0;
           mid = (mid + Math.imul(ah8, bl9)) | 0;
           hi = (hi + Math.imul(ah8, bh9)) | 0;
           var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
           w17 &= 0x3ffffff;
           /* k = 18 */
           lo = Math.imul(al9, bl9);
           mid = Math.imul(al9, bh9);
           mid = (mid + Math.imul(ah9, bl9)) | 0;
           hi = Math.imul(ah9, bh9);
           var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
           c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
           w18 &= 0x3ffffff;
           o[0] = w0;
           o[1] = w1;
           o[2] = w2;
           o[3] = w3;
           o[4] = w4;
           o[5] = w5;
           o[6] = w6;
           o[7] = w7;
           o[8] = w8;
           o[9] = w9;
           o[10] = w10;
           o[11] = w11;
           o[12] = w12;
           o[13] = w13;
           o[14] = w14;
           o[15] = w15;
           o[16] = w16;
           o[17] = w17;
           o[18] = w18;
           if (c !== 0) {
             o[19] = c;
             out.length++;
           }
           return out;
         };

         // Polyfill comb
         if (!Math.imul) {
           comb10MulTo = smallMulTo;
         }

         function bigMulTo (self, num, out) {
           out.negative = num.negative ^ self.negative;
           out.length = self.length + num.length;

           var carry = 0;
           var hncarry = 0;
           for (var k = 0; k < out.length - 1; k++) {
             // Sum all words with the same `i + j = k` and accumulate `ncarry`,
             // note that ncarry could be >= 0x3ffffff
             var ncarry = hncarry;
             hncarry = 0;
             var rword = carry & 0x3ffffff;
             var maxJ = Math.min(k, num.length - 1);
             for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
               var i = k - j;
               var a = self.words[i] | 0;
               var b = num.words[j] | 0;
               var r = a * b;

               var lo = r & 0x3ffffff;
               ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
               lo = (lo + rword) | 0;
               rword = lo & 0x3ffffff;
               ncarry = (ncarry + (lo >>> 26)) | 0;

               hncarry += ncarry >>> 26;
               ncarry &= 0x3ffffff;
             }
             out.words[k] = rword;
             carry = ncarry;
             ncarry = hncarry;
           }
           if (carry !== 0) {
             out.words[k] = carry;
           } else {
             out.length--;
           }

           return out.strip();
         }

         function jumboMulTo (self, num, out) {
           var fftm = new FFTM();
           return fftm.mulp(self, num, out);
         }

         BN.prototype.mulTo = function mulTo (num, out) {
           var res;
           var len = this.length + num.length;
           if (this.length === 10 && num.length === 10) {
             res = comb10MulTo(this, num, out);
           } else if (len < 63) {
             res = smallMulTo(this, num, out);
           } else if (len < 1024) {
             res = bigMulTo(this, num, out);
           } else {
             res = jumboMulTo(this, num, out);
           }

           return res;
         };

         // Cooley-Tukey algorithm for FFT
         // slightly revisited to rely on looping instead of recursion

         function FFTM (x, y) {
           this.x = x;
           this.y = y;
         }

         FFTM.prototype.makeRBT = function makeRBT (N) {
           var t = new Array(N);
           var l = BN.prototype._countBits(N) - 1;
           for (var i = 0; i < N; i++) {
             t[i] = this.revBin(i, l, N);
           }

           return t;
         };

         // Returns binary-reversed representation of `x`
         FFTM.prototype.revBin = function revBin (x, l, N) {
           if (x === 0 || x === N - 1) return x;

           var rb = 0;
           for (var i = 0; i < l; i++) {
             rb |= (x & 1) << (l - i - 1);
             x >>= 1;
           }

           return rb;
         };

         // Performs "tweedling" phase, therefore 'emulating'
         // behaviour of the recursive algorithm
         FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
           for (var i = 0; i < N; i++) {
             rtws[i] = rws[rbt[i]];
             itws[i] = iws[rbt[i]];
           }
         };

         FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
           this.permute(rbt, rws, iws, rtws, itws, N);

           for (var s = 1; s < N; s <<= 1) {
             var l = s << 1;

             var rtwdf = Math.cos(2 * Math.PI / l);
             var itwdf = Math.sin(2 * Math.PI / l);

             for (var p = 0; p < N; p += l) {
               var rtwdf_ = rtwdf;
               var itwdf_ = itwdf;

               for (var j = 0; j < s; j++) {
                 var re = rtws[p + j];
                 var ie = itws[p + j];

                 var ro = rtws[p + j + s];
                 var io = itws[p + j + s];

                 var rx = rtwdf_ * ro - itwdf_ * io;

                 io = rtwdf_ * io + itwdf_ * ro;
                 ro = rx;

                 rtws[p + j] = re + ro;
                 itws[p + j] = ie + io;

                 rtws[p + j + s] = re - ro;
                 itws[p + j + s] = ie - io;

                 /* jshint maxdepth : false */
                 if (j !== l) {
                   rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                   itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                   rtwdf_ = rx;
                 }
               }
             }
           }
         };

         FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
           var N = Math.max(m, n) | 1;
           var odd = N & 1;
           var i = 0;
           for (N = N / 2 | 0; N; N = N >>> 1) {
             i++;
           }

           return 1 << i + 1 + odd;
         };

         FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
           if (N <= 1) return;

           for (var i = 0; i < N / 2; i++) {
             var t = rws[i];

             rws[i] = rws[N - i - 1];
             rws[N - i - 1] = t;

             t = iws[i];

             iws[i] = -iws[N - i - 1];
             iws[N - i - 1] = -t;
           }
         };

         FFTM.prototype.normalize13b = function normalize13b (ws, N) {
           var carry = 0;
           for (var i = 0; i < N / 2; i++) {
             var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
               Math.round(ws[2 * i] / N) +
               carry;

             ws[i] = w & 0x3ffffff;

             if (w < 0x4000000) {
               carry = 0;
             } else {
               carry = w / 0x4000000 | 0;
             }
           }

           return ws;
         };

         FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
           var carry = 0;
           for (var i = 0; i < len; i++) {
             carry = carry + (ws[i] | 0);

             rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
             rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
           }

           // Pad with zeroes
           for (i = 2 * len; i < N; ++i) {
             rws[i] = 0;
           }

           assert(carry === 0);
           assert((carry & ~0x1fff) === 0);
         };

         FFTM.prototype.stub = function stub (N) {
           var ph = new Array(N);
           for (var i = 0; i < N; i++) {
             ph[i] = 0;
           }

           return ph;
         };

         FFTM.prototype.mulp = function mulp (x, y, out) {
           var N = 2 * this.guessLen13b(x.length, y.length);

           var rbt = this.makeRBT(N);

           var _ = this.stub(N);

           var rws = new Array(N);
           var rwst = new Array(N);
           var iwst = new Array(N);

           var nrws = new Array(N);
           var nrwst = new Array(N);
           var niwst = new Array(N);

           var rmws = out.words;
           rmws.length = N;

           this.convert13b(x.words, x.length, rws, N);
           this.convert13b(y.words, y.length, nrws, N);

           this.transform(rws, _, rwst, iwst, N, rbt);
           this.transform(nrws, _, nrwst, niwst, N, rbt);

           for (var i = 0; i < N; i++) {
             var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
             iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
             rwst[i] = rx;
           }

           this.conjugate(rwst, iwst, N);
           this.transform(rwst, iwst, rmws, _, N, rbt);
           this.conjugate(rmws, _, N);
           this.normalize13b(rmws, N);

           out.negative = x.negative ^ y.negative;
           out.length = x.length + y.length;
           return out.strip();
         };

         // Multiply `this` by `num`
         BN.prototype.mul = function mul (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return this.mulTo(num, out);
         };

         // Multiply employing FFT
         BN.prototype.mulf = function mulf (num) {
           var out = new BN(null);
           out.words = new Array(this.length + num.length);
           return jumboMulTo(this, num, out);
         };

         // In-place Multiplication
         BN.prototype.imul = function imul (num) {
           return this.clone().mulTo(num, this);
         };

         BN.prototype.imuln = function imuln (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);

           // Carry
           var carry = 0;
           for (var i = 0; i < this.length; i++) {
             var w = (this.words[i] | 0) * num;
             var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
             carry >>= 26;
             carry += (w / 0x4000000) | 0;
             // NOTE: lo is 27bit maximum
             carry += lo >>> 26;
             this.words[i] = lo & 0x3ffffff;
           }

           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }

           return this;
         };

         BN.prototype.muln = function muln (num) {
           return this.clone().imuln(num);
         };

         // `this` * `this`
         BN.prototype.sqr = function sqr () {
           return this.mul(this);
         };

         // `this` * `this` in-place
         BN.prototype.isqr = function isqr () {
           return this.imul(this.clone());
         };

         // Math.pow(`this`, `num`)
         BN.prototype.pow = function pow (num) {
           var w = toBitArray(num);
           if (w.length === 0) return new BN(1);

           // Skip leading zeroes
           var res = this;
           for (var i = 0; i < w.length; i++, res = res.sqr()) {
             if (w[i] !== 0) break;
           }

           if (++i < w.length) {
             for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
               if (w[i] === 0) continue;

               res = res.mul(q);
             }
           }

           return res;
         };

         // Shift-left in-place
         BN.prototype.iushln = function iushln (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;
           var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
           var i;

           if (r !== 0) {
             var carry = 0;

             for (i = 0; i < this.length; i++) {
               var newCarry = this.words[i] & carryMask;
               var c = ((this.words[i] | 0) - newCarry) << r;
               this.words[i] = c | carry;
               carry = newCarry >>> (26 - r);
             }

             if (carry) {
               this.words[i] = carry;
               this.length++;
             }
           }

           if (s !== 0) {
             for (i = this.length - 1; i >= 0; i--) {
               this.words[i + s] = this.words[i];
             }

             for (i = 0; i < s; i++) {
               this.words[i] = 0;
             }

             this.length += s;
           }

           return this.strip();
         };

         BN.prototype.ishln = function ishln (bits) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushln(bits);
         };

         // Shift-right in-place
         // NOTE: `hint` is a lowest bit before trailing zeroes
         // NOTE: if `extended` is present - it will be filled with destroyed bits
         BN.prototype.iushrn = function iushrn (bits, hint, extended) {
           assert(typeof bits === 'number' && bits >= 0);
           var h;
           if (hint) {
             h = (hint - (hint % 26)) / 26;
           } else {
             h = 0;
           }

           var r = bits % 26;
           var s = Math.min((bits - r) / 26, this.length);
           var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
           var maskedWords = extended;

           h -= s;
           h = Math.max(0, h);

           // Extended mode, copy masked part
           if (maskedWords) {
             for (var i = 0; i < s; i++) {
               maskedWords.words[i] = this.words[i];
             }
             maskedWords.length = s;
           }

           if (s === 0) ; else if (this.length > s) {
             this.length -= s;
             for (i = 0; i < this.length; i++) {
               this.words[i] = this.words[i + s];
             }
           } else {
             this.words[0] = 0;
             this.length = 1;
           }

           var carry = 0;
           for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
             var word = this.words[i] | 0;
             this.words[i] = (carry << (26 - r)) | (word >>> r);
             carry = word & mask;
           }

           // Push carried bits as a mask
           if (maskedWords && carry !== 0) {
             maskedWords.words[maskedWords.length++] = carry;
           }

           if (this.length === 0) {
             this.words[0] = 0;
             this.length = 1;
           }

           return this.strip();
         };

         BN.prototype.ishrn = function ishrn (bits, hint, extended) {
           // TODO(indutny): implement me
           assert(this.negative === 0);
           return this.iushrn(bits, hint, extended);
         };

         // Shift-left
         BN.prototype.shln = function shln (bits) {
           return this.clone().ishln(bits);
         };

         BN.prototype.ushln = function ushln (bits) {
           return this.clone().iushln(bits);
         };

         // Shift-right
         BN.prototype.shrn = function shrn (bits) {
           return this.clone().ishrn(bits);
         };

         BN.prototype.ushrn = function ushrn (bits) {
           return this.clone().iushrn(bits);
         };

         // Test if n bit is set
         BN.prototype.testn = function testn (bit) {
           assert(typeof bit === 'number' && bit >= 0);
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) return false;

           // Check bit and return
           var w = this.words[s];

           return !!(w & q);
         };

         // Return only lowers bits of number (in-place)
         BN.prototype.imaskn = function imaskn (bits) {
           assert(typeof bits === 'number' && bits >= 0);
           var r = bits % 26;
           var s = (bits - r) / 26;

           assert(this.negative === 0, 'imaskn works only with positive numbers');

           if (this.length <= s) {
             return this;
           }

           if (r !== 0) {
             s++;
           }
           this.length = Math.min(s, this.length);

           if (r !== 0) {
             var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
             this.words[this.length - 1] &= mask;
           }

           return this.strip();
         };

         // Return only lowers bits of number
         BN.prototype.maskn = function maskn (bits) {
           return this.clone().imaskn(bits);
         };

         // Add plain number `num` to `this`
         BN.prototype.iaddn = function iaddn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.isubn(-num);

           // Possible sign change
           if (this.negative !== 0) {
             if (this.length === 1 && (this.words[0] | 0) < num) {
               this.words[0] = num - (this.words[0] | 0);
               this.negative = 0;
               return this;
             }

             this.negative = 0;
             this.isubn(num);
             this.negative = 1;
             return this;
           }

           // Add without checks
           return this._iaddn(num);
         };

         BN.prototype._iaddn = function _iaddn (num) {
           this.words[0] += num;

           // Carry
           for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
             this.words[i] -= 0x4000000;
             if (i === this.length - 1) {
               this.words[i + 1] = 1;
             } else {
               this.words[i + 1]++;
             }
           }
           this.length = Math.max(this.length, i + 1);

           return this;
         };

         // Subtract plain number `num` from `this`
         BN.prototype.isubn = function isubn (num) {
           assert(typeof num === 'number');
           assert(num < 0x4000000);
           if (num < 0) return this.iaddn(-num);

           if (this.negative !== 0) {
             this.negative = 0;
             this.iaddn(num);
             this.negative = 1;
             return this;
           }

           this.words[0] -= num;

           if (this.length === 1 && this.words[0] < 0) {
             this.words[0] = -this.words[0];
             this.negative = 1;
           } else {
             // Carry
             for (var i = 0; i < this.length && this.words[i] < 0; i++) {
               this.words[i] += 0x4000000;
               this.words[i + 1] -= 1;
             }
           }

           return this.strip();
         };

         BN.prototype.addn = function addn (num) {
           return this.clone().iaddn(num);
         };

         BN.prototype.subn = function subn (num) {
           return this.clone().isubn(num);
         };

         BN.prototype.iabs = function iabs () {
           this.negative = 0;

           return this;
         };

         BN.prototype.abs = function abs () {
           return this.clone().iabs();
         };

         BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
           var len = num.length + shift;
           var i;

           this._expand(len);

           var w;
           var carry = 0;
           for (i = 0; i < num.length; i++) {
             w = (this.words[i + shift] | 0) + carry;
             var right = (num.words[i] | 0) * mul;
             w -= right & 0x3ffffff;
             carry = (w >> 26) - ((right / 0x4000000) | 0);
             this.words[i + shift] = w & 0x3ffffff;
           }
           for (; i < this.length - shift; i++) {
             w = (this.words[i + shift] | 0) + carry;
             carry = w >> 26;
             this.words[i + shift] = w & 0x3ffffff;
           }

           if (carry === 0) return this.strip();

           // Subtraction overflow
           assert(carry === -1);
           carry = 0;
           for (i = 0; i < this.length; i++) {
             w = -(this.words[i] | 0) + carry;
             carry = w >> 26;
             this.words[i] = w & 0x3ffffff;
           }
           this.negative = 1;

           return this.strip();
         };

         BN.prototype._wordDiv = function _wordDiv (num, mode) {
           var shift = this.length - num.length;

           var a = this.clone();
           var b = num;

           // Normalize
           var bhi = b.words[b.length - 1] | 0;
           var bhiBits = this._countBits(bhi);
           shift = 26 - bhiBits;
           if (shift !== 0) {
             b = b.ushln(shift);
             a.iushln(shift);
             bhi = b.words[b.length - 1] | 0;
           }

           // Initialize quotient
           var m = a.length - b.length;
           var q;

           if (mode !== 'mod') {
             q = new BN(null);
             q.length = m + 1;
             q.words = new Array(q.length);
             for (var i = 0; i < q.length; i++) {
               q.words[i] = 0;
             }
           }

           var diff = a.clone()._ishlnsubmul(b, 1, m);
           if (diff.negative === 0) {
             a = diff;
             if (q) {
               q.words[m] = 1;
             }
           }

           for (var j = m - 1; j >= 0; j--) {
             var qj = (a.words[b.length + j] | 0) * 0x4000000 +
               (a.words[b.length + j - 1] | 0);

             // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
             // (0x7ffffff)
             qj = Math.min((qj / bhi) | 0, 0x3ffffff);

             a._ishlnsubmul(b, qj, j);
             while (a.negative !== 0) {
               qj--;
               a.negative = 0;
               a._ishlnsubmul(b, 1, j);
               if (!a.isZero()) {
                 a.negative ^= 1;
               }
             }
             if (q) {
               q.words[j] = qj;
             }
           }
           if (q) {
             q.strip();
           }
           a.strip();

           // Denormalize
           if (mode !== 'div' && shift !== 0) {
             a.iushrn(shift);
           }

           return {
             div: q || null,
             mod: a
           };
         };

         // NOTE: 1) `mode` can be set to `mod` to request mod only,
         //       to `div` to request div only, or be absent to
         //       request both div & mod
         //       2) `positive` is true if unsigned mod is requested
         BN.prototype.divmod = function divmod (num, mode, positive) {
           assert(!num.isZero());

           if (this.isZero()) {
             return {
               div: new BN(0),
               mod: new BN(0)
             };
           }

           var div, mod, res;
           if (this.negative !== 0 && num.negative === 0) {
             res = this.neg().divmod(num, mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.iadd(num);
               }
             }

             return {
               div: div,
               mod: mod
             };
           }

           if (this.negative === 0 && num.negative !== 0) {
             res = this.divmod(num.neg(), mode);

             if (mode !== 'mod') {
               div = res.div.neg();
             }

             return {
               div: div,
               mod: res.mod
             };
           }

           if ((this.negative & num.negative) !== 0) {
             res = this.neg().divmod(num.neg(), mode);

             if (mode !== 'div') {
               mod = res.mod.neg();
               if (positive && mod.negative !== 0) {
                 mod.isub(num);
               }
             }

             return {
               div: res.div,
               mod: mod
             };
           }

           // Both numbers are positive at this point

           // Strip both numbers to approximate shift value
           if (num.length > this.length || this.cmp(num) < 0) {
             return {
               div: new BN(0),
               mod: this
             };
           }

           // Very short reduction
           if (num.length === 1) {
             if (mode === 'div') {
               return {
                 div: this.divn(num.words[0]),
                 mod: null
               };
             }

             if (mode === 'mod') {
               return {
                 div: null,
                 mod: new BN(this.modn(num.words[0]))
               };
             }

             return {
               div: this.divn(num.words[0]),
               mod: new BN(this.modn(num.words[0]))
             };
           }

           return this._wordDiv(num, mode);
         };

         // Find `this` / `num`
         BN.prototype.div = function div (num) {
           return this.divmod(num, 'div', false).div;
         };

         // Find `this` % `num`
         BN.prototype.mod = function mod (num) {
           return this.divmod(num, 'mod', false).mod;
         };

         BN.prototype.umod = function umod (num) {
           return this.divmod(num, 'mod', true).mod;
         };

         // Find Round(`this` / `num`)
         BN.prototype.divRound = function divRound (num) {
           var dm = this.divmod(num);

           // Fast case - exact division
           if (dm.mod.isZero()) return dm.div;

           var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

           var half = num.ushrn(1);
           var r2 = num.andln(1);
           var cmp = mod.cmp(half);

           // Round down
           if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

           // Round up
           return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
         };

         BN.prototype.modn = function modn (num) {
           assert(num <= 0x3ffffff);
           var p = (1 << 26) % num;

           var acc = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             acc = (p * acc + (this.words[i] | 0)) % num;
           }

           return acc;
         };

         // In-place division by number
         BN.prototype.idivn = function idivn (num) {
           assert(num <= 0x3ffffff);

           var carry = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var w = (this.words[i] | 0) + carry * 0x4000000;
             this.words[i] = (w / num) | 0;
             carry = w % num;
           }

           return this.strip();
         };

         BN.prototype.divn = function divn (num) {
           return this.clone().idivn(num);
         };

         BN.prototype.egcd = function egcd (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var x = this;
           var y = p.clone();

           if (x.negative !== 0) {
             x = x.umod(p);
           } else {
             x = x.clone();
           }

           // A * x + B * y = x
           var A = new BN(1);
           var B = new BN(0);

           // C * x + D * y = y
           var C = new BN(0);
           var D = new BN(1);

           var g = 0;

           while (x.isEven() && y.isEven()) {
             x.iushrn(1);
             y.iushrn(1);
             ++g;
           }

           var yp = y.clone();
           var xp = x.clone();

           while (!x.isZero()) {
             for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               x.iushrn(i);
               while (i-- > 0) {
                 if (A.isOdd() || B.isOdd()) {
                   A.iadd(yp);
                   B.isub(xp);
                 }

                 A.iushrn(1);
                 B.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               y.iushrn(j);
               while (j-- > 0) {
                 if (C.isOdd() || D.isOdd()) {
                   C.iadd(yp);
                   D.isub(xp);
                 }

                 C.iushrn(1);
                 D.iushrn(1);
               }
             }

             if (x.cmp(y) >= 0) {
               x.isub(y);
               A.isub(C);
               B.isub(D);
             } else {
               y.isub(x);
               C.isub(A);
               D.isub(B);
             }
           }

           return {
             a: C,
             b: D,
             gcd: y.iushln(g)
           };
         };

         // This is reduced incarnation of the binary EEA
         // above, designated to invert members of the
         // _prime_ fields F(p) at a maximal speed
         BN.prototype._invmp = function _invmp (p) {
           assert(p.negative === 0);
           assert(!p.isZero());

           var a = this;
           var b = p.clone();

           if (a.negative !== 0) {
             a = a.umod(p);
           } else {
             a = a.clone();
           }

           var x1 = new BN(1);
           var x2 = new BN(0);

           var delta = b.clone();

           while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
             for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
             if (i > 0) {
               a.iushrn(i);
               while (i-- > 0) {
                 if (x1.isOdd()) {
                   x1.iadd(delta);
                 }

                 x1.iushrn(1);
               }
             }

             for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
             if (j > 0) {
               b.iushrn(j);
               while (j-- > 0) {
                 if (x2.isOdd()) {
                   x2.iadd(delta);
                 }

                 x2.iushrn(1);
               }
             }

             if (a.cmp(b) >= 0) {
               a.isub(b);
               x1.isub(x2);
             } else {
               b.isub(a);
               x2.isub(x1);
             }
           }

           var res;
           if (a.cmpn(1) === 0) {
             res = x1;
           } else {
             res = x2;
           }

           if (res.cmpn(0) < 0) {
             res.iadd(p);
           }

           return res;
         };

         BN.prototype.gcd = function gcd (num) {
           if (this.isZero()) return num.abs();
           if (num.isZero()) return this.abs();

           var a = this.clone();
           var b = num.clone();
           a.negative = 0;
           b.negative = 0;

           // Remove common factor of two
           for (var shift = 0; a.isEven() && b.isEven(); shift++) {
             a.iushrn(1);
             b.iushrn(1);
           }

           do {
             while (a.isEven()) {
               a.iushrn(1);
             }
             while (b.isEven()) {
               b.iushrn(1);
             }

             var r = a.cmp(b);
             if (r < 0) {
               // Swap `a` and `b` to make `a` always bigger than `b`
               var t = a;
               a = b;
               b = t;
             } else if (r === 0 || b.cmpn(1) === 0) {
               break;
             }

             a.isub(b);
           } while (true);

           return b.iushln(shift);
         };

         // Invert number in the field F(num)
         BN.prototype.invm = function invm (num) {
           return this.egcd(num).a.umod(num);
         };

         BN.prototype.isEven = function isEven () {
           return (this.words[0] & 1) === 0;
         };

         BN.prototype.isOdd = function isOdd () {
           return (this.words[0] & 1) === 1;
         };

         // And first word and num
         BN.prototype.andln = function andln (num) {
           return this.words[0] & num;
         };

         // Increment at the bit position in-line
         BN.prototype.bincn = function bincn (bit) {
           assert(typeof bit === 'number');
           var r = bit % 26;
           var s = (bit - r) / 26;
           var q = 1 << r;

           // Fast case: bit is much higher than all existing words
           if (this.length <= s) {
             this._expand(s + 1);
             this.words[s] |= q;
             return this;
           }

           // Add bit and propagate, if needed
           var carry = q;
           for (var i = s; carry !== 0 && i < this.length; i++) {
             var w = this.words[i] | 0;
             w += carry;
             carry = w >>> 26;
             w &= 0x3ffffff;
             this.words[i] = w;
           }
           if (carry !== 0) {
             this.words[i] = carry;
             this.length++;
           }
           return this;
         };

         BN.prototype.isZero = function isZero () {
           return this.length === 1 && this.words[0] === 0;
         };

         BN.prototype.cmpn = function cmpn (num) {
           var negative = num < 0;

           if (this.negative !== 0 && !negative) return -1;
           if (this.negative === 0 && negative) return 1;

           this.strip();

           var res;
           if (this.length > 1) {
             res = 1;
           } else {
             if (negative) {
               num = -num;
             }

             assert(num <= 0x3ffffff, 'Number is too big');

             var w = this.words[0] | 0;
             res = w === num ? 0 : w < num ? -1 : 1;
           }
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Compare two numbers and return:
         // 1 - if `this` > `num`
         // 0 - if `this` == `num`
         // -1 - if `this` < `num`
         BN.prototype.cmp = function cmp (num) {
           if (this.negative !== 0 && num.negative === 0) return -1;
           if (this.negative === 0 && num.negative !== 0) return 1;

           var res = this.ucmp(num);
           if (this.negative !== 0) return -res | 0;
           return res;
         };

         // Unsigned comparison
         BN.prototype.ucmp = function ucmp (num) {
           // At this point both numbers have the same sign
           if (this.length > num.length) return 1;
           if (this.length < num.length) return -1;

           var res = 0;
           for (var i = this.length - 1; i >= 0; i--) {
             var a = this.words[i] | 0;
             var b = num.words[i] | 0;

             if (a === b) continue;
             if (a < b) {
               res = -1;
             } else if (a > b) {
               res = 1;
             }
             break;
           }
           return res;
         };

         BN.prototype.gtn = function gtn (num) {
           return this.cmpn(num) === 1;
         };

         BN.prototype.gt = function gt (num) {
           return this.cmp(num) === 1;
         };

         BN.prototype.gten = function gten (num) {
           return this.cmpn(num) >= 0;
         };

         BN.prototype.gte = function gte (num) {
           return this.cmp(num) >= 0;
         };

         BN.prototype.ltn = function ltn (num) {
           return this.cmpn(num) === -1;
         };

         BN.prototype.lt = function lt (num) {
           return this.cmp(num) === -1;
         };

         BN.prototype.lten = function lten (num) {
           return this.cmpn(num) <= 0;
         };

         BN.prototype.lte = function lte (num) {
           return this.cmp(num) <= 0;
         };

         BN.prototype.eqn = function eqn (num) {
           return this.cmpn(num) === 0;
         };

         BN.prototype.eq = function eq (num) {
           return this.cmp(num) === 0;
         };

         //
         // A reduce context, could be using montgomery or something better, depending
         // on the `m` itself.
         //
         BN.red = function red (num) {
           return new Red(num);
         };

         BN.prototype.toRed = function toRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           assert(this.negative === 0, 'red works only with positives');
           return ctx.convertTo(this)._forceRed(ctx);
         };

         BN.prototype.fromRed = function fromRed () {
           assert(this.red, 'fromRed works only with numbers in reduction context');
           return this.red.convertFrom(this);
         };

         BN.prototype._forceRed = function _forceRed (ctx) {
           this.red = ctx;
           return this;
         };

         BN.prototype.forceRed = function forceRed (ctx) {
           assert(!this.red, 'Already a number in reduction context');
           return this._forceRed(ctx);
         };

         BN.prototype.redAdd = function redAdd (num) {
           assert(this.red, 'redAdd works only with red numbers');
           return this.red.add(this, num);
         };

         BN.prototype.redIAdd = function redIAdd (num) {
           assert(this.red, 'redIAdd works only with red numbers');
           return this.red.iadd(this, num);
         };

         BN.prototype.redSub = function redSub (num) {
           assert(this.red, 'redSub works only with red numbers');
           return this.red.sub(this, num);
         };

         BN.prototype.redISub = function redISub (num) {
           assert(this.red, 'redISub works only with red numbers');
           return this.red.isub(this, num);
         };

         BN.prototype.redShl = function redShl (num) {
           assert(this.red, 'redShl works only with red numbers');
           return this.red.shl(this, num);
         };

         BN.prototype.redMul = function redMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.mul(this, num);
         };

         BN.prototype.redIMul = function redIMul (num) {
           assert(this.red, 'redMul works only with red numbers');
           this.red._verify2(this, num);
           return this.red.imul(this, num);
         };

         BN.prototype.redSqr = function redSqr () {
           assert(this.red, 'redSqr works only with red numbers');
           this.red._verify1(this);
           return this.red.sqr(this);
         };

         BN.prototype.redISqr = function redISqr () {
           assert(this.red, 'redISqr works only with red numbers');
           this.red._verify1(this);
           return this.red.isqr(this);
         };

         // Square root over p
         BN.prototype.redSqrt = function redSqrt () {
           assert(this.red, 'redSqrt works only with red numbers');
           this.red._verify1(this);
           return this.red.sqrt(this);
         };

         BN.prototype.redInvm = function redInvm () {
           assert(this.red, 'redInvm works only with red numbers');
           this.red._verify1(this);
           return this.red.invm(this);
         };

         // Return negative clone of `this` % `red modulo`
         BN.prototype.redNeg = function redNeg () {
           assert(this.red, 'redNeg works only with red numbers');
           this.red._verify1(this);
           return this.red.neg(this);
         };

         BN.prototype.redPow = function redPow (num) {
           assert(this.red && !num.red, 'redPow(normalNum)');
           this.red._verify1(this);
           return this.red.pow(this, num);
         };

         // Prime numbers with efficient reduction
         var primes = {
           k256: null,
           p224: null,
           p192: null,
           p25519: null
         };

         // Pseudo-Mersenne prime
         function MPrime (name, p) {
           // P = 2 ^ N - K
           this.name = name;
           this.p = new BN(p, 16);
           this.n = this.p.bitLength();
           this.k = new BN(1).iushln(this.n).isub(this.p);

           this.tmp = this._tmp();
         }

         MPrime.prototype._tmp = function _tmp () {
           var tmp = new BN(null);
           tmp.words = new Array(Math.ceil(this.n / 13));
           return tmp;
         };

         MPrime.prototype.ireduce = function ireduce (num) {
           // Assumes that `num` is less than `P^2`
           // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
           var r = num;
           var rlen;

           do {
             this.split(r, this.tmp);
             r = this.imulK(r);
             r = r.iadd(this.tmp);
             rlen = r.bitLength();
           } while (rlen > this.n);

           var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
           if (cmp === 0) {
             r.words[0] = 0;
             r.length = 1;
           } else if (cmp > 0) {
             r.isub(this.p);
           } else {
             r.strip();
           }

           return r;
         };

         MPrime.prototype.split = function split (input, out) {
           input.iushrn(this.n, 0, out);
         };

         MPrime.prototype.imulK = function imulK (num) {
           return num.imul(this.k);
         };

         function K256 () {
           MPrime.call(
             this,
             'k256',
             'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
         }
         inherits(K256, MPrime);

         K256.prototype.split = function split (input, output) {
           // 256 = 9 * 26 + 22
           var mask = 0x3fffff;

           var outLen = Math.min(input.length, 9);
           for (var i = 0; i < outLen; i++) {
             output.words[i] = input.words[i];
           }
           output.length = outLen;

           if (input.length <= 9) {
             input.words[0] = 0;
             input.length = 1;
             return;
           }

           // Shift by 9 limbs
           var prev = input.words[9];
           output.words[output.length++] = prev & mask;

           for (i = 10; i < input.length; i++) {
             var next = input.words[i] | 0;
             input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
             prev = next;
           }
           prev >>>= 22;
           input.words[i - 10] = prev;
           if (prev === 0 && input.length > 10) {
             input.length -= 10;
           } else {
             input.length -= 9;
           }
         };

         K256.prototype.imulK = function imulK (num) {
           // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
           num.words[num.length] = 0;
           num.words[num.length + 1] = 0;
           num.length += 2;

           // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
           var lo = 0;
           for (var i = 0; i < num.length; i++) {
             var w = num.words[i] | 0;
             lo += w * 0x3d1;
             num.words[i] = lo & 0x3ffffff;
             lo = w * 0x40 + ((lo / 0x4000000) | 0);
           }

           // Fast length reduction
           if (num.words[num.length - 1] === 0) {
             num.length--;
             if (num.words[num.length - 1] === 0) {
               num.length--;
             }
           }
           return num;
         };

         function P224 () {
           MPrime.call(
             this,
             'p224',
             'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
         }
         inherits(P224, MPrime);

         function P192 () {
           MPrime.call(
             this,
             'p192',
             'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
         }
         inherits(P192, MPrime);

         function P25519 () {
           // 2 ^ 255 - 19
           MPrime.call(
             this,
             '25519',
             '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
         }
         inherits(P25519, MPrime);

         P25519.prototype.imulK = function imulK (num) {
           // K = 0x13
           var carry = 0;
           for (var i = 0; i < num.length; i++) {
             var hi = (num.words[i] | 0) * 0x13 + carry;
             var lo = hi & 0x3ffffff;
             hi >>>= 26;

             num.words[i] = lo;
             carry = hi;
           }
           if (carry !== 0) {
             num.words[num.length++] = carry;
           }
           return num;
         };

         // Exported mostly for testing purposes, use plain name instead
         BN._prime = function prime (name) {
           // Cached version of prime
           if (primes[name]) return primes[name];

           var prime;
           if (name === 'k256') {
             prime = new K256();
           } else if (name === 'p224') {
             prime = new P224();
           } else if (name === 'p192') {
             prime = new P192();
           } else if (name === 'p25519') {
             prime = new P25519();
           } else {
             throw new Error('Unknown prime ' + name);
           }
           primes[name] = prime;

           return prime;
         };

         //
         // Base reduction engine
         //
         function Red (m) {
           if (typeof m === 'string') {
             var prime = BN._prime(m);
             this.m = prime.p;
             this.prime = prime;
           } else {
             assert(m.gtn(1), 'modulus must be greater than 1');
             this.m = m;
             this.prime = null;
           }
         }

         Red.prototype._verify1 = function _verify1 (a) {
           assert(a.negative === 0, 'red works only with positives');
           assert(a.red, 'red works only with red numbers');
         };

         Red.prototype._verify2 = function _verify2 (a, b) {
           assert((a.negative | b.negative) === 0, 'red works only with positives');
           assert(a.red && a.red === b.red,
             'red works only with red numbers');
         };

         Red.prototype.imod = function imod (a) {
           if (this.prime) return this.prime.ireduce(a)._forceRed(this);
           return a.umod(this.m)._forceRed(this);
         };

         Red.prototype.neg = function neg (a) {
           if (a.isZero()) {
             return a.clone();
           }

           return this.m.sub(a)._forceRed(this);
         };

         Red.prototype.add = function add (a, b) {
           this._verify2(a, b);

           var res = a.add(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.iadd = function iadd (a, b) {
           this._verify2(a, b);

           var res = a.iadd(b);
           if (res.cmp(this.m) >= 0) {
             res.isub(this.m);
           }
           return res;
         };

         Red.prototype.sub = function sub (a, b) {
           this._verify2(a, b);

           var res = a.sub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res._forceRed(this);
         };

         Red.prototype.isub = function isub (a, b) {
           this._verify2(a, b);

           var res = a.isub(b);
           if (res.cmpn(0) < 0) {
             res.iadd(this.m);
           }
           return res;
         };

         Red.prototype.shl = function shl (a, num) {
           this._verify1(a);
           return this.imod(a.ushln(num));
         };

         Red.prototype.imul = function imul (a, b) {
           this._verify2(a, b);
           return this.imod(a.imul(b));
         };

         Red.prototype.mul = function mul (a, b) {
           this._verify2(a, b);
           return this.imod(a.mul(b));
         };

         Red.prototype.isqr = function isqr (a) {
           return this.imul(a, a.clone());
         };

         Red.prototype.sqr = function sqr (a) {
           return this.mul(a, a);
         };

         Red.prototype.sqrt = function sqrt (a) {
           if (a.isZero()) return a.clone();

           var mod3 = this.m.andln(3);
           assert(mod3 % 2 === 1);

           // Fast case
           if (mod3 === 3) {
             var pow = this.m.add(new BN(1)).iushrn(2);
             return this.pow(a, pow);
           }

           // Tonelli-Shanks algorithm (Totally unoptimized and slow)
           //
           // Find Q and S, that Q * 2 ^ S = (P - 1)
           var q = this.m.subn(1);
           var s = 0;
           while (!q.isZero() && q.andln(1) === 0) {
             s++;
             q.iushrn(1);
           }
           assert(!q.isZero());

           var one = new BN(1).toRed(this);
           var nOne = one.redNeg();

           // Find quadratic non-residue
           // NOTE: Max is such because of generalized Riemann hypothesis.
           var lpow = this.m.subn(1).iushrn(1);
           var z = this.m.bitLength();
           z = new BN(2 * z * z).toRed(this);

           while (this.pow(z, lpow).cmp(nOne) !== 0) {
             z.redIAdd(nOne);
           }

           var c = this.pow(z, q);
           var r = this.pow(a, q.addn(1).iushrn(1));
           var t = this.pow(a, q);
           var m = s;
           while (t.cmp(one) !== 0) {
             var tmp = t;
             for (var i = 0; tmp.cmp(one) !== 0; i++) {
               tmp = tmp.redSqr();
             }
             assert(i < m);
             var b = this.pow(c, new BN(1).iushln(m - i - 1));

             r = r.redMul(b);
             c = b.redSqr();
             t = t.redMul(c);
             m = i;
           }

           return r;
         };

         Red.prototype.invm = function invm (a) {
           var inv = a._invmp(this.m);
           if (inv.negative !== 0) {
             inv.negative = 0;
             return this.imod(inv).redNeg();
           } else {
             return this.imod(inv);
           }
         };

         Red.prototype.pow = function pow (a, num) {
           if (num.isZero()) return new BN(1);
           if (num.cmpn(1) === 0) return a.clone();

           var windowSize = 4;
           var wnd = new Array(1 << windowSize);
           wnd[0] = new BN(1).toRed(this);
           wnd[1] = a;
           for (var i = 2; i < wnd.length; i++) {
             wnd[i] = this.mul(wnd[i - 1], a);
           }

           var res = wnd[0];
           var current = 0;
           var currentLen = 0;
           var start = num.bitLength() % 26;
           if (start === 0) {
             start = 26;
           }

           for (i = num.length - 1; i >= 0; i--) {
             var word = num.words[i];
             for (var j = start - 1; j >= 0; j--) {
               var bit = (word >> j) & 1;
               if (res !== wnd[0]) {
                 res = this.sqr(res);
               }

               if (bit === 0 && current === 0) {
                 currentLen = 0;
                 continue;
               }

               current <<= 1;
               current |= bit;
               currentLen++;
               if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

               res = this.mul(res, wnd[current]);
               currentLen = 0;
               current = 0;
             }
             start = 26;
           }

           return res;
         };

         Red.prototype.convertTo = function convertTo (num) {
           var r = num.umod(this.m);

           return r === num ? r.clone() : r;
         };

         Red.prototype.convertFrom = function convertFrom (num) {
           var res = num.clone();
           res.red = null;
           return res;
         };

         //
         // Montgomery method engine
         //

         BN.mont = function mont (num) {
           return new Mont(num);
         };

         function Mont (m) {
           Red.call(this, m);

           this.shift = this.m.bitLength();
           if (this.shift % 26 !== 0) {
             this.shift += 26 - (this.shift % 26);
           }

           this.r = new BN(1).iushln(this.shift);
           this.r2 = this.imod(this.r.sqr());
           this.rinv = this.r._invmp(this.m);

           this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
           this.minv = this.minv.umod(this.r);
           this.minv = this.r.sub(this.minv);
         }
         inherits(Mont, Red);

         Mont.prototype.convertTo = function convertTo (num) {
           return this.imod(num.ushln(this.shift));
         };

         Mont.prototype.convertFrom = function convertFrom (num) {
           var r = this.imod(num.mul(this.rinv));
           r.red = null;
           return r;
         };

         Mont.prototype.imul = function imul (a, b) {
           if (a.isZero() || b.isZero()) {
             a.words[0] = 0;
             a.length = 1;
             return a;
           }

           var t = a.imul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;

           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.mul = function mul (a, b) {
           if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

           var t = a.mul(b);
           var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
           var u = t.isub(c).iushrn(this.shift);
           var res = u;
           if (u.cmp(this.m) >= 0) {
             res = u.isub(this.m);
           } else if (u.cmpn(0) < 0) {
             res = u.iadd(this.m);
           }

           return res._forceRed(this);
         };

         Mont.prototype.invm = function invm (a) {
           // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
           var res = this.imod(a._invmp(this.m).mul(this.r2));
           return res._forceRed(this);
         };
       })(module, commonjsGlobal);
       });

       (function(root) {

       	// Detect free variables `exports`
       	var freeExports = typeof exports == 'object' && exports;

       	// Detect free variable `module`
       	var freeModule = typeof module == 'object' && module &&
       		module.exports == freeExports && module;

       	// Detect free variable `global`, from Node.js or Browserified code,
       	// and use it as `root`
       	var freeGlobal = typeof global$1 == 'object' && global$1;
       	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
       		root = freeGlobal;
       	}

       	/*--------------------------------------------------------------------------*/

       	var stringFromCharCode = String.fromCharCode;

       	// Taken from https://mths.be/punycode
       	function ucs2decode(string) {
       		var output = [];
       		var counter = 0;
       		var length = string.length;
       		var value;
       		var extra;
       		while (counter < length) {
       			value = string.charCodeAt(counter++);
       			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
       				// high surrogate, and there is a next character
       				extra = string.charCodeAt(counter++);
       				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
       					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
       				} else {
       					// unmatched surrogate; only append this code unit, in case the next
       					// code unit is the high surrogate of a surrogate pair
       					output.push(value);
       					counter--;
       				}
       			} else {
       				output.push(value);
       			}
       		}
       		return output;
       	}

       	// Taken from https://mths.be/punycode
       	function ucs2encode(array) {
       		var length = array.length;
       		var index = -1;
       		var value;
       		var output = '';
       		while (++index < length) {
       			value = array[index];
       			if (value > 0xFFFF) {
       				value -= 0x10000;
       				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
       				value = 0xDC00 | value & 0x3FF;
       			}
       			output += stringFromCharCode(value);
       		}
       		return output;
       	}

       	function checkScalarValue(codePoint) {
       		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
       			throw Error(
       				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
       				' is not a scalar value'
       			);
       		}
       	}
       	/*--------------------------------------------------------------------------*/

       	function createByte(codePoint, shift) {
       		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
       	}

       	function encodeCodePoint(codePoint) {
       		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
       			return stringFromCharCode(codePoint);
       		}
       		var symbol = '';
       		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
       			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
       		}
       		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
       			checkScalarValue(codePoint);
       			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
       			symbol += createByte(codePoint, 6);
       		}
       		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
       			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
       			symbol += createByte(codePoint, 12);
       			symbol += createByte(codePoint, 6);
       		}
       		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
       		return symbol;
       	}

       	function utf8encode(string) {
       		var codePoints = ucs2decode(string);
       		var length = codePoints.length;
       		var index = -1;
       		var codePoint;
       		var byteString = '';
       		while (++index < length) {
       			codePoint = codePoints[index];
       			byteString += encodeCodePoint(codePoint);
       		}
       		return byteString;
       	}

       	/*--------------------------------------------------------------------------*/

       	function readContinuationByte() {
       		if (byteIndex >= byteCount) {
       			throw Error('Invalid byte index');
       		}

       		var continuationByte = byteArray[byteIndex] & 0xFF;
       		byteIndex++;

       		if ((continuationByte & 0xC0) == 0x80) {
       			return continuationByte & 0x3F;
       		}

       		// If we end up here, it’s not a continuation byte
       		throw Error('Invalid continuation byte');
       	}

       	function decodeSymbol() {
       		var byte1;
       		var byte2;
       		var byte3;
       		var byte4;
       		var codePoint;

       		if (byteIndex > byteCount) {
       			throw Error('Invalid byte index');
       		}

       		if (byteIndex == byteCount) {
       			return false;
       		}

       		// Read first byte
       		byte1 = byteArray[byteIndex] & 0xFF;
       		byteIndex++;

       		// 1-byte sequence (no continuation bytes)
       		if ((byte1 & 0x80) == 0) {
       			return byte1;
       		}

       		// 2-byte sequence
       		if ((byte1 & 0xE0) == 0xC0) {
       			var byte2 = readContinuationByte();
       			codePoint = ((byte1 & 0x1F) << 6) | byte2;
       			if (codePoint >= 0x80) {
       				return codePoint;
       			} else {
       				throw Error('Invalid continuation byte');
       			}
       		}

       		// 3-byte sequence (may include unpaired surrogates)
       		if ((byte1 & 0xF0) == 0xE0) {
       			byte2 = readContinuationByte();
       			byte3 = readContinuationByte();
       			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
       			if (codePoint >= 0x0800) {
       				checkScalarValue(codePoint);
       				return codePoint;
       			} else {
       				throw Error('Invalid continuation byte');
       			}
       		}

       		// 4-byte sequence
       		if ((byte1 & 0xF8) == 0xF0) {
       			byte2 = readContinuationByte();
       			byte3 = readContinuationByte();
       			byte4 = readContinuationByte();
       			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
       				(byte3 << 0x06) | byte4;
       			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
       				return codePoint;
       			}
       		}

       		throw Error('Invalid UTF-8 detected');
       	}

       	var byteArray;
       	var byteCount;
       	var byteIndex;
       	function utf8decode(byteString) {
       		byteArray = ucs2decode(byteString);
       		byteCount = byteArray.length;
       		byteIndex = 0;
       		var codePoints = [];
       		var tmp;
       		while ((tmp = decodeSymbol()) !== false) {
       			codePoints.push(tmp);
       		}
       		return ucs2encode(codePoints);
       	}

       	/*--------------------------------------------------------------------------*/

       	var utf8 = {
       		'version': '2.0.0',
       		'encode': utf8encode,
       		'decode': utf8decode
       	};

       	// Some AMD build optimizers, like r.js, check for specific condition patterns
       	// like the following:
       	if (
       		typeof define == 'function' &&
       		typeof define.amd == 'object' &&
       		define.amd
       	) {
       		define(function() {
       			return utf8;
       		});
       	}	else if (freeExports && !freeExports.nodeType) {
       		if (freeModule) { // in Node.js or RingoJS v0.8.0+
       			freeModule.exports = utf8;
       		} else { // in Narwhal or RingoJS v0.7.0-
       			var object = {};
       			var hasOwnProperty = object.hasOwnProperty;
       			for (var key in utf8) {
       				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
       			}
       		}
       	} else { // in Rhino or a web browser
       		root.utf8 = utf8;
       	}

       }(undefined));

       var utf8 = /*#__PURE__*/Object.freeze({

       });

       // This was ported from https://github.com/emn178/js-sha3, with some minor
       // modifications and pruning. It is licensed under MIT:
       //
       // Copyright 2015-2016 Chen, Yi-Cyuan
       //  
       // Permission is hereby granted, free of charge, to any person obtaining
       // a copy of this software and associated documentation files (the
       // "Software"), to deal in the Software without restriction, including
       // without limitation the rights to use, copy, modify, merge, publish,
       // distribute, sublicense, and/or sell copies of the Software, and to
       // permit persons to whom the Software is furnished to do so, subject to
       // the following conditions:
       // 
       // The above copyright notice and this permission notice shall be
       // included in all copies or substantial portions of the Software.
       // 
       // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
       // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
       // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
       // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
       // LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
       // OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
       // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

       var HEX_CHARS = '0123456789abcdef'.split('');
       var KECCAK_PADDING = [1, 256, 65536, 16777216];
       var SHIFT = [0, 8, 16, 24];
       var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

       var Keccak = function Keccak(bits) {
         return {
           blocks: [],
           reset: true,
           block: 0,
           start: 0,
           blockCount: 1600 - (bits << 1) >> 5,
           outputBlocks: bits >> 5,
           s: function (s) {
             return [].concat(s, s, s, s, s);
           }([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
         };
       };

       var update$1 = function update(state, message) {
         var length = message.length,
             blocks = state.blocks,
             byteCount = state.blockCount << 2,
             blockCount = state.blockCount,
             outputBlocks = state.outputBlocks,
             s = state.s,
             index = 0,
             i,
             code;

         // update
         while (index < length) {
           if (state.reset) {
             state.reset = false;
             blocks[0] = state.block;
             for (i = 1; i < blockCount + 1; ++i) {
               blocks[i] = 0;
             }
           }
           if (typeof message !== "string") {
             for (i = state.start; index < length && i < byteCount; ++index) {
               blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
             }
           } else {
             for (i = state.start; index < length && i < byteCount; ++index) {
               code = message.charCodeAt(index);
               if (code < 0x80) {
                 blocks[i >> 2] |= code << SHIFT[i++ & 3];
               } else if (code < 0x800) {
                 blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
               } else if (code < 0xd800 || code >= 0xe000) {
                 blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
               } else {
                 code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                 blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
               }
             }
           }
           state.lastByteIndex = i;
           if (i >= byteCount) {
             state.start = i - byteCount;
             state.block = blocks[blockCount];
             for (i = 0; i < blockCount; ++i) {
               s[i] ^= blocks[i];
             }
             f(s);
             state.reset = true;
           } else {
             state.start = i;
           }
         }

         // finalize
         i = state.lastByteIndex;
         blocks[i >> 2] |= KECCAK_PADDING[i & 3];
         if (state.lastByteIndex === byteCount) {
           blocks[0] = blocks[blockCount];
           for (i = 1; i < blockCount + 1; ++i) {
             blocks[i] = 0;
           }
         }
         blocks[blockCount - 1] |= 0x80000000;
         for (i = 0; i < blockCount; ++i) {
           s[i] ^= blocks[i];
         }
         f(s);

         // toString
         var hex = '',
             i = 0,
             j = 0,
             block;
         while (j < outputBlocks) {
           for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
             block = s[i];
             hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
           }
           if (j % blockCount === 0) {
             f(s);
             i = 0;
           }
         }
         return "0x" + hex;
       };

       var f = function f(s) {
         var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

         for (n = 0; n < 48; n += 2) {
           c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
           c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
           c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
           c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
           c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
           c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
           c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
           c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
           c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
           c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

           h = c8 ^ (c2 << 1 | c3 >>> 31);
           l = c9 ^ (c3 << 1 | c2 >>> 31);
           s[0] ^= h;
           s[1] ^= l;
           s[10] ^= h;
           s[11] ^= l;
           s[20] ^= h;
           s[21] ^= l;
           s[30] ^= h;
           s[31] ^= l;
           s[40] ^= h;
           s[41] ^= l;
           h = c0 ^ (c4 << 1 | c5 >>> 31);
           l = c1 ^ (c5 << 1 | c4 >>> 31);
           s[2] ^= h;
           s[3] ^= l;
           s[12] ^= h;
           s[13] ^= l;
           s[22] ^= h;
           s[23] ^= l;
           s[32] ^= h;
           s[33] ^= l;
           s[42] ^= h;
           s[43] ^= l;
           h = c2 ^ (c6 << 1 | c7 >>> 31);
           l = c3 ^ (c7 << 1 | c6 >>> 31);
           s[4] ^= h;
           s[5] ^= l;
           s[14] ^= h;
           s[15] ^= l;
           s[24] ^= h;
           s[25] ^= l;
           s[34] ^= h;
           s[35] ^= l;
           s[44] ^= h;
           s[45] ^= l;
           h = c4 ^ (c8 << 1 | c9 >>> 31);
           l = c5 ^ (c9 << 1 | c8 >>> 31);
           s[6] ^= h;
           s[7] ^= l;
           s[16] ^= h;
           s[17] ^= l;
           s[26] ^= h;
           s[27] ^= l;
           s[36] ^= h;
           s[37] ^= l;
           s[46] ^= h;
           s[47] ^= l;
           h = c6 ^ (c0 << 1 | c1 >>> 31);
           l = c7 ^ (c1 << 1 | c0 >>> 31);
           s[8] ^= h;
           s[9] ^= l;
           s[18] ^= h;
           s[19] ^= l;
           s[28] ^= h;
           s[29] ^= l;
           s[38] ^= h;
           s[39] ^= l;
           s[48] ^= h;
           s[49] ^= l;

           b0 = s[0];
           b1 = s[1];
           b32 = s[11] << 4 | s[10] >>> 28;
           b33 = s[10] << 4 | s[11] >>> 28;
           b14 = s[20] << 3 | s[21] >>> 29;
           b15 = s[21] << 3 | s[20] >>> 29;
           b46 = s[31] << 9 | s[30] >>> 23;
           b47 = s[30] << 9 | s[31] >>> 23;
           b28 = s[40] << 18 | s[41] >>> 14;
           b29 = s[41] << 18 | s[40] >>> 14;
           b20 = s[2] << 1 | s[3] >>> 31;
           b21 = s[3] << 1 | s[2] >>> 31;
           b2 = s[13] << 12 | s[12] >>> 20;
           b3 = s[12] << 12 | s[13] >>> 20;
           b34 = s[22] << 10 | s[23] >>> 22;
           b35 = s[23] << 10 | s[22] >>> 22;
           b16 = s[33] << 13 | s[32] >>> 19;
           b17 = s[32] << 13 | s[33] >>> 19;
           b48 = s[42] << 2 | s[43] >>> 30;
           b49 = s[43] << 2 | s[42] >>> 30;
           b40 = s[5] << 30 | s[4] >>> 2;
           b41 = s[4] << 30 | s[5] >>> 2;
           b22 = s[14] << 6 | s[15] >>> 26;
           b23 = s[15] << 6 | s[14] >>> 26;
           b4 = s[25] << 11 | s[24] >>> 21;
           b5 = s[24] << 11 | s[25] >>> 21;
           b36 = s[34] << 15 | s[35] >>> 17;
           b37 = s[35] << 15 | s[34] >>> 17;
           b18 = s[45] << 29 | s[44] >>> 3;
           b19 = s[44] << 29 | s[45] >>> 3;
           b10 = s[6] << 28 | s[7] >>> 4;
           b11 = s[7] << 28 | s[6] >>> 4;
           b42 = s[17] << 23 | s[16] >>> 9;
           b43 = s[16] << 23 | s[17] >>> 9;
           b24 = s[26] << 25 | s[27] >>> 7;
           b25 = s[27] << 25 | s[26] >>> 7;
           b6 = s[36] << 21 | s[37] >>> 11;
           b7 = s[37] << 21 | s[36] >>> 11;
           b38 = s[47] << 24 | s[46] >>> 8;
           b39 = s[46] << 24 | s[47] >>> 8;
           b30 = s[8] << 27 | s[9] >>> 5;
           b31 = s[9] << 27 | s[8] >>> 5;
           b12 = s[18] << 20 | s[19] >>> 12;
           b13 = s[19] << 20 | s[18] >>> 12;
           b44 = s[29] << 7 | s[28] >>> 25;
           b45 = s[28] << 7 | s[29] >>> 25;
           b26 = s[38] << 8 | s[39] >>> 24;
           b27 = s[39] << 8 | s[38] >>> 24;
           b8 = s[48] << 14 | s[49] >>> 18;
           b9 = s[49] << 14 | s[48] >>> 18;

           s[0] = b0 ^ ~b2 & b4;
           s[1] = b1 ^ ~b3 & b5;
           s[10] = b10 ^ ~b12 & b14;
           s[11] = b11 ^ ~b13 & b15;
           s[20] = b20 ^ ~b22 & b24;
           s[21] = b21 ^ ~b23 & b25;
           s[30] = b30 ^ ~b32 & b34;
           s[31] = b31 ^ ~b33 & b35;
           s[40] = b40 ^ ~b42 & b44;
           s[41] = b41 ^ ~b43 & b45;
           s[2] = b2 ^ ~b4 & b6;
           s[3] = b3 ^ ~b5 & b7;
           s[12] = b12 ^ ~b14 & b16;
           s[13] = b13 ^ ~b15 & b17;
           s[22] = b22 ^ ~b24 & b26;
           s[23] = b23 ^ ~b25 & b27;
           s[32] = b32 ^ ~b34 & b36;
           s[33] = b33 ^ ~b35 & b37;
           s[42] = b42 ^ ~b44 & b46;
           s[43] = b43 ^ ~b45 & b47;
           s[4] = b4 ^ ~b6 & b8;
           s[5] = b5 ^ ~b7 & b9;
           s[14] = b14 ^ ~b16 & b18;
           s[15] = b15 ^ ~b17 & b19;
           s[24] = b24 ^ ~b26 & b28;
           s[25] = b25 ^ ~b27 & b29;
           s[34] = b34 ^ ~b36 & b38;
           s[35] = b35 ^ ~b37 & b39;
           s[44] = b44 ^ ~b46 & b48;
           s[45] = b45 ^ ~b47 & b49;
           s[6] = b6 ^ ~b8 & b0;
           s[7] = b7 ^ ~b9 & b1;
           s[16] = b16 ^ ~b18 & b10;
           s[17] = b17 ^ ~b19 & b11;
           s[26] = b26 ^ ~b28 & b20;
           s[27] = b27 ^ ~b29 & b21;
           s[36] = b36 ^ ~b38 & b30;
           s[37] = b37 ^ ~b39 & b31;
           s[46] = b46 ^ ~b48 & b40;
           s[47] = b47 ^ ~b49 & b41;
           s[8] = b8 ^ ~b0 & b2;
           s[9] = b9 ^ ~b1 & b3;
           s[18] = b18 ^ ~b10 & b12;
           s[19] = b19 ^ ~b11 & b13;
           s[28] = b28 ^ ~b20 & b22;
           s[29] = b29 ^ ~b21 & b23;
           s[38] = b38 ^ ~b30 & b32;
           s[39] = b39 ^ ~b31 & b33;
           s[48] = b48 ^ ~b40 & b42;
           s[49] = b49 ^ ~b41 & b43;

           s[0] ^= RC[n];
           s[1] ^= RC[n + 1];
         }
       };

       var keccak = function keccak(bits) {
         return function (str) {
           var msg;
           if (str.slice(0, 2) === "0x") {
             msg = [];
             for (var i = 2, l = str.length; i < l; i += 2) {
               msg.push(parseInt(str.slice(i, i + 2), 16));
             }
           } else {
             msg = str;
           }
           return update$1(Keccak(bits, bits), msg);
         };
       };

       var hash = {
         keccak256: keccak(256),
         keccak512: keccak(512),
         keccak256s: keccak(256),
         keccak512s: keccak(512)
       };

       /*
        This file is part of web3.js.

        web3.js is free software: you can redistribute it and/or modify
        it under the terms of the GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        web3.js is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU Lesser General Public License for more details.

        You should have received a copy of the GNU Lesser General Public License
        along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
        */
       /**
        * @file utils.js
        * @author Fabian Vogelsteller <fabian@ethereum.org>
        * @date 2017
        */








       /**
        * Returns true if object is BN, otherwise false
        *
        * @method isBN
        * @param {Object} object
        * @return {Boolean}
        */
       var isBN = function (object) {
           return object instanceof bn$2 ||
               (object && object.constructor && object.constructor.name === 'BN');
       };

       /**
        * Returns true if object is BigNumber, otherwise false
        *
        * @method isBigNumber
        * @param {Object} object
        * @return {Boolean}
        */
       var isBigNumber = function (object) {
           return object && object.constructor && object.constructor.name === 'BigNumber';
       };

       /**
        * Takes an input and transforms it into an BN
        *
        * @method toBN
        * @param {Number|String|BN} number, string, HEX string or BN
        * @return {BN} BN
        */
       var toBN = function(number){
           try {
               return src$2.apply(null, arguments);
           } catch(e) {
               throw new Error(e + ' Given value: "'+ number +'"');
           }
       };


       /**
        * Takes and input transforms it into BN and if it is negative value, into two's complement
        *
        * @method toTwosComplement
        * @param {Number|String|BN} number
        * @return {String}
        */
       var toTwosComplement = function (number) {
           return '0x'+ toBN(number).toTwos(256).toString(16, 64);
       };

       /**
        * Checks if the given string is an address
        *
        * @method isAddress
        * @param {String} address the given HEX address
        * @return {Boolean}
        */
       var isAddress = function (address) {
           // check if it has the basic requirements of an address
           if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
               return false;
               // If it's ALL lowercase or ALL upppercase
           } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
               return true;
               // Otherwise check each case
           } else {
               return checkAddressChecksum(address);
           }
       };



       /**
        * Checks if the given string is a checksummed address
        *
        * @method checkAddressChecksum
        * @param {String} address the given HEX address
        * @return {Boolean}
        */
       var checkAddressChecksum = function (address) {
           // Check each case
           address = address.replace(/^0x/i,'');
           var addressHash = sha3(address.toLowerCase()).replace(/^0x/i,'');

           for (var i = 0; i < 40; i++ ) {
               // the nth letter should be uppercase if the nth digit of casemap is 1
               if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                   return false;
               }
           }
           return true;
       };

       /**
        * Should be called to pad string to expected length
        *
        * @method leftPad
        * @param {String} string to be padded
        * @param {Number} chars that result string should have
        * @param {String} sign, by default 0
        * @returns {String} right aligned string
        */
       var leftPad = function (string, chars, sign) {
           var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
           string = string.toString(16).replace(/^0x/i,'');

           var padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;

           return (hasPrefix ? '0x' : '') + new Array(padding).join(sign ? sign : "0") + string;
       };

       /**
        * Should be called to pad string to expected length
        *
        * @method rightPad
        * @param {String} string to be padded
        * @param {Number} chars that result string should have
        * @param {String} sign, by default 0
        * @returns {String} right aligned string
        */
       var rightPad = function (string, chars, sign) {
           var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
           string = string.toString(16).replace(/^0x/i,'');

           var padding = (chars - string.length + 1 >= 0) ? chars - string.length + 1 : 0;

           return (hasPrefix ? '0x' : '') + string + (new Array(padding).join(sign ? sign : "0"));
       };


       /**
        * Should be called to get hex representation (prefixed by 0x) of utf8 string
        *
        * @method utf8ToHex
        * @param {String} str
        * @returns {String} hex representation of input string
        */
       var utf8ToHex = function(str) {
           str = utf8.encode(str);
           var hex = "";

           // remove \u0000 padding from either side
           str = str.replace(/^(?:\u0000)*/,'');
           str = str.split("").reverse().join("");
           str = str.replace(/^(?:\u0000)*/,'');
           str = str.split("").reverse().join("");

           for(var i = 0; i < str.length; i++) {
               var code = str.charCodeAt(i);
               // if (code !== 0) {
               var n = code.toString(16);
               hex += n.length < 2 ? '0' + n : n;
               // }
           }

           return "0x" + hex;
       };

       /**
        * Should be called to get utf8 from it's hex representation
        *
        * @method hexToUtf8
        * @param {String} hex
        * @returns {String} ascii string representation of hex value
        */
       var hexToUtf8 = function(hex) {
           if (!isHexStrict(hex))
               throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

           var str = "";
           var code = 0;
           hex = hex.replace(/^0x/i,'');

           // remove 00 padding from either side
           hex = hex.replace(/^(?:00)*/,'');
           hex = hex.split("").reverse().join("");
           hex = hex.replace(/^(?:00)*/,'');
           hex = hex.split("").reverse().join("");

           var l = hex.length;

           for (var i=0; i < l; i+=2) {
               code = parseInt(hex.substr(i, 2), 16);
               // if (code !== 0) {
               str += String.fromCharCode(code);
               // }
           }

           return utf8.decode(str);
       };


       /**
        * Converts value to it's number representation
        *
        * @method hexToNumber
        * @param {String|Number|BN} value
        * @return {String}
        */
       var hexToNumber = function (value) {
           if (!value) {
               return value;
           }

           return toBN(value).toNumber();
       };

       /**
        * Converts value to it's decimal representation in string
        *
        * @method hexToNumberString
        * @param {String|Number|BN} value
        * @return {String}
        */
       var hexToNumberString = function (value) {
           if (!value) return value;

           return toBN(value).toString(10);
       };


       /**
        * Converts value to it's hex representation
        *
        * @method numberToHex
        * @param {String|Number|BN} value
        * @return {String}
        */
       var numberToHex = function (value) {
           if (underscore.isNull(value) || underscore.isUndefined(value)) {
               return value;
           }

           if (!isFinite(value) && !isHexStrict(value)) {
               throw new Error('Given input "'+value+'" is not a number.');
           }

           var number = toBN(value);
           var result = number.toString(16);

           return number.lt(new bn$2(0)) ? '-0x' + result.substr(1) : '0x' + result;
       };


       /**
        * Convert a byte array to a hex string
        *
        * Note: Implementation from crypto-js
        *
        * @method bytesToHex
        * @param {Array} bytes
        * @return {String} the hex string
        */
       var bytesToHex = function(bytes) {
           for (var hex = [], i = 0; i < bytes.length; i++) {
               /* jshint ignore:start */
               hex.push((bytes[i] >>> 4).toString(16));
               hex.push((bytes[i] & 0xF).toString(16));
               /* jshint ignore:end */
           }
           return '0x'+ hex.join("");
       };

       /**
        * Convert a hex string to a byte array
        *
        * Note: Implementation from crypto-js
        *
        * @method hexToBytes
        * @param {string} hex
        * @return {Array} the byte array
        */
       var hexToBytes = function(hex) {
           hex = hex.toString(16);

           if (!isHexStrict(hex)) {
               throw new Error('Given value "'+ hex +'" is not a valid hex string.');
           }

           hex = hex.replace(/^0x/i,'');

           for (var bytes = [], c = 0; c < hex.length; c += 2)
               bytes.push(parseInt(hex.substr(c, 2), 16));
           return bytes;
       };

       /**
        * Auto converts any given value into it's hex representation.
        *
        * And even stringifys objects before.
        *
        * @method toHex
        * @param {String|Number|BN|Object} value
        * @param {Boolean} returnType
        * @return {String}
        */
       var toHex$1 = function (value, returnType) {
           /*jshint maxcomplexity: false */

           if (isAddress(value)) {
               return returnType ? 'address' : '0x'+ value.toLowerCase().replace(/^0x/i,'');
           }

           if (underscore.isBoolean(value)) {
               return returnType ? 'bool' : value ? '0x01' : '0x00';
           }


           if (underscore.isObject(value) && !isBigNumber(value) && !isBN(value)) {
               return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
           }

           // if its a negative number, pass it through numberToHex
           if (underscore.isString(value)) {
               if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
                   return returnType ? 'int256' : numberToHex(value);
               } else if(value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
                   return returnType ? 'bytes' : value;
               } else if (!isFinite(value)) {
                   return returnType ? 'string' : utf8ToHex(value);
               }
           }

           return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
       };


       /**
        * Check if string is HEX, requires a 0x in front
        *
        * @method isHexStrict
        * @param {String} hex to be checked
        * @returns {Boolean}
        */
       var isHexStrict = function (hex) {
           return ((underscore.isString(hex) || underscore.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
       };

       /**
        * Check if string is HEX
        *
        * @method isHex
        * @param {String} hex to be checked
        * @returns {Boolean}
        */
       var isHex = function (hex) {
           return ((underscore.isString(hex) || underscore.isNumber(hex)) && /^(-0x|0x)?[0-9a-f]*$/i.test(hex));
       };


       /**
        * Returns true if given string is a valid Ethereum block header bloom.
        *
        * TODO UNDOCUMENTED
        *
        * @method isBloom
        * @param {String} hex encoded bloom filter
        * @return {Boolean}
        */
       var isBloom = function (bloom) {
           if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
               return false;
           } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
               return true;
           }
           return false;
       };

       /**
        * Returns true if given string is a valid log topic.
        *
        * TODO UNDOCUMENTED
        *
        * @method isTopic
        * @param {String} hex encoded topic
        * @return {Boolean}
        */
       var isTopic = function (topic) {
           if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
               return false;
           } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
               return true;
           }
           return false;
       };


       /**
        * Hashes values to a sha3 hash using keccak 256
        *
        * To hash a HEX string the hex must have 0x in front.
        *
        * @method sha3
        * @return {String} the sha3 string
        */
       var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

       var sha3 = function (value) {
           if (isHexStrict(value) && /^0x/i.test((value).toString())) {
               value = hexToBytes(value);
           }

           var returnValue = hash.keccak256(value); // jshint ignore:line

           if(returnValue === SHA3_NULL_S) {
               return null;
           } else {
               return returnValue;
           }
       };
       // expose the under the hood keccak256
       sha3._Hash = hash;


       var utils = {
           BN: bn$2,
           isBN: isBN,
           isBigNumber: isBigNumber,
           toBN: toBN,
           isAddress: isAddress,
           isBloom: isBloom, // TODO UNDOCUMENTED
           isTopic: isTopic, // TODO UNDOCUMENTED
           checkAddressChecksum: checkAddressChecksum,
           utf8ToHex: utf8ToHex,
           hexToUtf8: hexToUtf8,
           hexToNumber: hexToNumber,
           hexToNumberString: hexToNumberString,
           numberToHex: numberToHex,
           toHex: toHex$1,
           hexToBytes: hexToBytes,
           bytesToHex: bytesToHex,
           isHex: isHex,
           isHexStrict: isHexStrict,
           leftPad: leftPad,
           rightPad: rightPad,
           toTwosComplement: toTwosComplement,
           sha3: sha3
       };

       /*
        This file is part of web3.js.

        web3.js is free software: you can redistribute it and/or modify
        it under the terms of the GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        web3.js is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU Lesser General Public License for more details.

        You should have received a copy of the GNU Lesser General Public License
        along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
        */
       /**
        * @file soliditySha3.js
        * @author Fabian Vogelsteller <fabian@ethereum.org>
        * @date 2017
        */






       var _elementaryName = function (name) {
           /*jshint maxcomplexity:false */

           if (name.startsWith('int[')) {
               return 'int256' + name.slice(3);
           } else if (name === 'int') {
               return 'int256';
           } else if (name.startsWith('uint[')) {
               return 'uint256' + name.slice(4);
           } else if (name === 'uint') {
               return 'uint256';
           } else if (name.startsWith('fixed[')) {
               return 'fixed128x128' + name.slice(5);
           } else if (name === 'fixed') {
               return 'fixed128x128';
           } else if (name.startsWith('ufixed[')) {
               return 'ufixed128x128' + name.slice(6);
           } else if (name === 'ufixed') {
               return 'ufixed128x128';
           }
           return name;
       };

       // Parse N from type<N>
       var _parseTypeN = function (type) {
           var typesize = /^\D+(\d+).*$/.exec(type);
           return typesize ? parseInt(typesize[1], 10) : null;
       };

       // Parse N from type[<N>]
       var _parseTypeNArray = function (type) {
           var arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
           return arraySize ? parseInt(arraySize[1], 10) : null;
       };

       var _parseNumber = function (arg) {
           var type = typeof arg;
           if (type === 'string') {
               if (utils.isHexStrict(arg)) {
                   return new bn$2(arg.replace(/0x/i,''), 16);
               } else {
                   return new bn$2(arg, 10);
               }
           } else if (type === 'number') {
               return new bn$2(arg);
           } else if (utils.isBigNumber(arg)) {
               return new bn$2(arg.toString(10));
           } else if (utils.isBN(arg)) {
               return arg;
           } else {
               throw new Error(arg +' is not a number');
           }
       };

       var _solidityPack = function (type, value, arraySize) {
           /*jshint maxcomplexity:false */

           var size, num;
           type = _elementaryName(type);


           if (type === 'bytes') {

               if (value.replace(/^0x/i,'').length % 2 !== 0) {
                   throw new Error('Invalid bytes characters '+ value.length);
               }

               return value;
           } else if (type === 'string') {
               return utils.utf8ToHex(value);
           } else if (type === 'bool') {
               return value ? '01' : '00';
           } else if (type.startsWith('address')) {
               if(arraySize) {
                   size = 64;
               } else {
                   size = 40;
               }

               if(!utils.isAddress(value)) {
                   throw new Error(value +' is not a valid address, or the checksum is invalid.');
               }

               return utils.leftPad(value.toLowerCase(), size);
           }

           size = _parseTypeN(type);

           if (type.startsWith('bytes')) {

               if(!size) {
                   throw new Error('bytes[] not yet supported in solidity');
               }

               // must be 32 byte slices when in an array
               if(arraySize) {
                   size = 32;
               }

               if (size < 1 || size > 32 || size < value.replace(/^0x/i,'').length / 2 ) {
                   throw new Error('Invalid bytes' + size +' for '+ value);
               }

               return utils.rightPad(value, size * 2);
           } else if (type.startsWith('uint')) {

               if ((size % 8) || (size < 8) || (size > 256)) {
                   throw new Error('Invalid uint'+size+' size');
               }

               num = _parseNumber(value);
               if (num.bitLength() > size) {
                   throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
               }

               if(num.lt(new bn$2(0))) {
                   throw new Error('Supplied uint '+ num.toString() +' is negative');
               }

               return size ? utils.leftPad(num.toString('hex'), size/8 * 2) : num;
           } else if (type.startsWith('int')) {

               if ((size % 8) || (size < 8) || (size > 256)) {
                   throw new Error('Invalid int'+size+' size');
               }

               num = _parseNumber(value);
               if (num.bitLength() > size) {
                   throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
               }

               if(num.lt(new bn$2(0))) {
                   return num.toTwos(size).toString('hex');
               } else {
                   return size ? utils.leftPad(num.toString('hex'), size/8 * 2) : num;
               }

           } else {
               // FIXME: support all other types
               throw new Error('Unsupported or invalid type: ' + type);
           }
       };


       var _processSoliditySha3Args = function (arg) {
           /*jshint maxcomplexity:false */

           if(underscore.isArray(arg)) {
               throw new Error('Autodetection of array types is not supported.');
           }

           var type, value = '';
           var hexArg, arraySize;

           // if type is given
           if (underscore.isObject(arg) && (arg.hasOwnProperty('v') || arg.hasOwnProperty('t') || arg.hasOwnProperty('value') || arg.hasOwnProperty('type'))) {
               type = arg.hasOwnProperty('t') ? arg.t : arg.type;
               value = arg.hasOwnProperty('v') ? arg.v : arg.value;

           // otherwise try to guess the type
           } else {

               type = utils.toHex(arg, true);
               value = utils.toHex(arg);

               if (!type.startsWith('int') && !type.startsWith('uint')) {
                   type = 'bytes';
               }
           }

           if ((type.startsWith('int') || type.startsWith('uint')) &&  typeof value === 'string' && !/^(-)?0x/i.test(value)) {
               value = new bn$2(value);
           }

           // get the array size
           if(underscore.isArray(value)) {
               arraySize = _parseTypeNArray(type);
               if(arraySize && value.length !== arraySize) {
                   throw new Error(type +' is not matching the given array '+ JSON.stringify(value));
               } else {
                   arraySize = value.length;
               }
           }


           if (underscore.isArray(value)) {
               hexArg = value.map(function (val) {
                   return _solidityPack(type, val, arraySize).toString('hex').replace('0x','');
               });
               return hexArg.join('');
           } else {
               hexArg = _solidityPack(type, value, arraySize);
               return hexArg.toString('hex').replace('0x','');
           }

       };

       /**
        * Hashes solidity values to a sha3 hash using keccak 256
        *
        * @method soliditySha3
        * @return {Object} the sha3
        */
       var soliditySha3 = function () {
           /*jshint maxcomplexity:false */

           var args = Array.prototype.slice.call(arguments);

           var hexArgs = underscore.map(args, _processSoliditySha3Args);

           // console.log(args, hexArgs);
           // console.log('0x'+ hexArgs.join(''));

           return utils.sha3('0x'+ hexArgs.join(''));
       };


       var soliditySha3_1 = soliditySha3;

       var empty$1 = {};

       var empty$2 = /*#__PURE__*/Object.freeze({
              default: empty$1
       });

       var require$$0 = ( empty$2 && empty$1 ) || empty$2;

       var crypto = require$$0;

       var randomHex = function(size, callback) {
           var crypto$$1 = crypto;
           var isCallback = (typeof callback === 'function');

           
           if (size > 65536) {
               if(isCallback) {
                   callback(new Error('Requested too many random bytes.'));
               } else {
                   throw new Error('Requested too many random bytes.');
               }
           }

           // is node
           if (typeof crypto$$1 !== 'undefined' && crypto$$1.randomBytes) {

               if(isCallback) {
                   crypto$$1.randomBytes(size, function(err, result){
                       if(!err) {
                           callback(null, '0x'+ result.toString('hex'));
                       } else {
                           callback(error);
                       }
                   });
               } else {
                   return '0x'+ crypto$$1.randomBytes(size).toString('hex');
               }

           // is browser
           } else {
               var cryptoLib;

               if (typeof crypto$$1 !== 'undefined') {
                   cryptoLib = crypto$$1;
               } else if(typeof msCrypto !== 'undefined') {
                   cryptoLib = msCrypto;
               }

               if (cryptoLib && cryptoLib.getRandomValues) {
                   var randomBytes = cryptoLib.getRandomValues(new Uint8Array(size));
                   var returnValue = '0x'+ Array.from(randomBytes).map(function(arr){ return arr.toString(16); }).join('');

                   if(isCallback) {
                       callback(null, returnValue);
                   } else {
                       return returnValue;
                   }

               // not crypto object
               } else {
                   var error = new Error('No "crypto" object available. This Browser doesn\'t support generating secure random bytes.');

                   if(isCallback) {
                       callback(error);
                   } else {
                      throw error;
                   }
               }
           }
       };


       var src$3 = randomHex;

       /*
        This file is part of web3.js.

        web3.js is free software: you can redistribute it and/or modify
        it under the terms of the GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        web3.js is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU Lesser General Public License for more details.

        You should have received a copy of the GNU Lesser General Public License
        along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
        */
       /**
        * @file utils.js
        * @author Marek Kotewicz <marek@parity.io>
        * @author Fabian Vogelsteller <fabian@ethereum.org>
        * @date 2017
        */










       /**
        * Fires an error in an event emitter and callback and returns the eventemitter
        *
        * @method _fireError
        * @param {Object} error a string, a error, or an object with {message, data}
        * @param {Object} emitter
        * @param {Function} reject
        * @param {Function} callback
        * @return {Object} the emitter
        */
       var _fireError = function (error, emitter, reject, callback) {
           /*jshint maxcomplexity: 10 */

           // add data if given
           if(underscore.isObject(error) && !(error instanceof Error) &&  error.data) {
               if(underscore.isObject(error.data) || underscore.isArray(error.data)) {
                   error.data = JSON.stringify(error.data, null, 2);
               }

               error = error.message +"\n"+ error.data;
           }

           if(underscore.isString(error)) {
               error = new Error(error);
           }

           if (underscore.isFunction(callback)) {
               callback(error);
           }
           if (underscore.isFunction(reject)) {
               // suppress uncatched error if an error listener is present
               // OR suppress uncatched error if an callback listener is present
               if (emitter &&
                   (underscore.isFunction(emitter.listeners) &&
                   emitter.listeners('error').length) || underscore.isFunction(callback)) {
                   emitter.catch(function(){});
               }
               // reject later, to be able to return emitter
               setTimeout(function () {
                   reject(error);
               }, 1);
           }

           if(emitter && underscore.isFunction(emitter.emit)) {
               // emit later, to be able to return emitter
               setTimeout(function () {
                   emitter.emit('error', error);
                   emitter.removeAllListeners();
               }, 1);
           }

           return emitter;
       };

       /**
        * Should be used to create full function/event name from json abi
        *
        * @method _jsonInterfaceMethodToString
        * @param {Object} json
        * @return {String} full function/event name
        */
       var _jsonInterfaceMethodToString = function (json) {
           if (underscore.isObject(json) && json.name && json.name.indexOf('(') !== -1) {
               return json.name;
           }

           var typeName = json.inputs.map(function(i){return i.type; }).join(',');
           return json.name + '(' + typeName + ')';
       };



       /**
        * Should be called to get ascii from it's hex representation
        *
        * @method hexToAscii
        * @param {String} hex
        * @returns {String} ascii string representation of hex value
        */
       var hexToAscii = function(hex) {
           if (!utils.isHexStrict(hex))
               throw new Error('The parameter must be a valid HEX string.');

           var str = "";
           var i = 0, l = hex.length;
           if (hex.substring(0, 2) === '0x') {
               i = 2;
           }
           for (; i < l; i+=2) {
               var code = parseInt(hex.substr(i, 2), 16);
               str += String.fromCharCode(code);
           }

           return str;
       };

       /**
        * Should be called to get hex representation (prefixed by 0x) of ascii string
        *
        * @method asciiToHex
        * @param {String} str
        * @returns {String} hex representation of input string
        */
       var asciiToHex = function(str) {
           if(!str)
               return "0x00";
           var hex = "";
           for(var i = 0; i < str.length; i++) {
               var code = str.charCodeAt(i);
               var n = code.toString(16);
               hex += n.length < 2 ? '0' + n : n;
           }

           return "0x" + hex;
       };



       /**
        * Returns value of unit in Wei
        *
        * @method getUnitValue
        * @param {String} unit the unit to convert to, default ether
        * @returns {BN} value of the unit (in Wei)
        * @throws error if the unit is not correct:w
        */
       var getUnitValue = function (unit) {
           unit = unit ? unit.toLowerCase() : 'ether';
           if (!lib.unitMap[unit]) {
               throw new Error('This unit "'+ unit +'" doesn\'t exist, please use the one of the following units' + JSON.stringify(lib.unitMap, null, 2));
           }
           return unit;
       };

       /**
        * Takes a number of wei and converts it to any other ether unit.
        *
        * Possible units are:
        *   SI Short   SI Full        Effigy       Other
        * - kwei       femtoether     babbage
        * - mwei       picoether      lovelace
        * - gwei       nanoether      shannon      nano
        * - --         microether     szabo        micro
        * - --         milliether     finney       milli
        * - ether      --             --
        * - kether                    --           grand
        * - mether
        * - gether
        * - tether
        *
        * @method fromWei
        * @param {Number|String} number can be a number, number string or a HEX of a decimal
        * @param {String} unit the unit to convert to, default ether
        * @return {String|Object} When given a BN object it returns one as well, otherwise a number
        */
       var fromWei$1 = function(number, unit) {
           unit = getUnitValue(unit);

           if(!utils.isBN(number) && !underscore.isString(number)) {
               throw new Error('Please pass numbers as strings or BigNumber objects to avoid precision errors.');
           }

           return utils.isBN(number) ? lib.fromWei(number, unit) : lib.fromWei(number, unit).toString(10);
       };

       /**
        * Takes a number of a unit and converts it to wei.
        *
        * Possible units are:
        *   SI Short   SI Full        Effigy       Other
        * - kwei       femtoether     babbage
        * - mwei       picoether      lovelace
        * - gwei       nanoether      shannon      nano
        * - --         microether     szabo        micro
        * - --         microether     szabo        micro
        * - --         milliether     finney       milli
        * - ether      --             --
        * - kether                    --           grand
        * - mether
        * - gether
        * - tether
        *
        * @method toWei
        * @param {Number|String|BN} number can be a number, number string or a HEX of a decimal
        * @param {String} unit the unit to convert from, default ether
        * @return {String|Object} When given a BN object it returns one as well, otherwise a number
        */
       var toWei$1 = function(number, unit) {
           unit = getUnitValue(unit);

           if(!utils.isBN(number) && !underscore.isString(number)) {
               throw new Error('Please pass numbers as strings or BigNumber objects to avoid precision errors.');
           }

           return utils.isBN(number) ? lib.toWei(number, unit) : lib.toWei(number, unit).toString(10);
       };




       /**
        * Converts to a checksum address
        *
        * @method toChecksumAddress
        * @param {String} address the given HEX address
        * @return {String}
        */
       var toChecksumAddress = function (address) {
           if (typeof address === 'undefined') return '';

           if(!/^(0x)?[0-9a-f]{40}$/i.test(address))
               throw new Error('Given address "'+ address +'" is not a valid Ethereum address.');



           address = address.toLowerCase().replace(/^0x/i,'');
           var addressHash = utils.sha3(address).replace(/^0x/i,'');
           var checksumAddress = '0x';

           for (var i = 0; i < address.length; i++ ) {
               // If ith character is 9 to f then make it uppercase
               if (parseInt(addressHash[i], 16) > 7) {
                   checksumAddress += address[i].toUpperCase();
               } else {
                   checksumAddress += address[i];
               }
           }
           return checksumAddress;
       };



       var src$4 = {
           _fireError: _fireError,
           _jsonInterfaceMethodToString: _jsonInterfaceMethodToString,
           // extractDisplayName: extractDisplayName,
           // extractTypeName: extractTypeName,
           randomHex: src$3,
           _: underscore,
           BN: utils.BN,
           isBN: utils.isBN,
           isBigNumber: utils.isBigNumber,
           isHex: utils.isHex,
           isHexStrict: utils.isHexStrict,
           sha3: utils.sha3,
           keccak256: utils.sha3,
           soliditySha3: soliditySha3_1,
           isAddress: utils.isAddress,
           checkAddressChecksum: utils.checkAddressChecksum,
           toChecksumAddress: toChecksumAddress,
           toHex: utils.toHex,
           toBN: utils.toBN,

           bytesToHex: utils.bytesToHex,
           hexToBytes: utils.hexToBytes,

           hexToNumberString: utils.hexToNumberString,

           hexToNumber: utils.hexToNumber,
           toDecimal: utils.hexToNumber, // alias

           numberToHex: utils.numberToHex,
           fromDecimal: utils.numberToHex, // alias

           hexToUtf8: utils.hexToUtf8,
           hexToString: utils.hexToUtf8,
           toUtf8: utils.hexToUtf8,

           utf8ToHex: utils.utf8ToHex,
           stringToHex: utils.utf8ToHex,
           fromUtf8: utils.utf8ToHex,

           hexToAscii: hexToAscii,
           toAscii: hexToAscii,
           asciiToHex: asciiToHex,
           fromAscii: asciiToHex,

           unitMap: lib.unitMap,
           toWei: toWei$1,
           fromWei: fromWei$1,

           padLeft: utils.leftPad,
           leftPad: utils.leftPad,
           padRight: utils.rightPad,
           rightPad: utils.rightPad,
           toTwosComplement: utils.toTwosComplement
       };
       var src_6 = src$4.isBN;
       var src_9 = src$4.isHexStrict;
       var src_12 = src$4.soliditySha3;
       var src_16 = src$4.toHex;
       var src_18 = src$4.bytesToHex;
       var src_19 = src$4.hexToBytes;
       var src_38 = src$4.padLeft;
       var src_40 = src$4.padRight;

       const Bytes = require("./bytes");
       const Nat = require("./nat");
       const elliptic = require("elliptic");
       const rlp = require("./rlp");
       const secp256k1 = new elliptic.ec("secp256k1"); // eslint-disable-line
       const { keccak256, keccak256s } = require("./hash");

       const create = entropy => {
         const innerHex = keccak256(Bytes.concat(Bytes.random(32), entropy || Bytes.random(32)));
         const middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
         const outerHex = keccak256(middleHex);
         return fromPrivate(outerHex);
       };

       const toChecksum = address => {
         const addressHash = keccak256s(address.slice(2));
         let checksumAddress = "0x";
         for (let i = 0; i < 40; i++) checksumAddress += parseInt(addressHash[i + 2], 16) > 7 ? address[i + 2].toUpperCase() : address[i + 2];
         return checksumAddress;
       };

       const fromPrivate = privateKey => {
         const buffer = new Buffer$1(privateKey.slice(2), "hex");
         const ecKey = secp256k1.keyFromPrivate(buffer);
         const publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
         const publicHash = keccak256(publicKey);
         const address = toChecksum("0x" + publicHash.slice(-40));
         return {
           address: address,
           privateKey: privateKey
         };
       };

       const encodeSignature = ([v, r, s]) => Bytes.flatten([r, s, v]);

       const decodeSignature = hex => [Bytes.slice(64, Bytes.length(hex), hex), Bytes.slice(0, 32, hex), Bytes.slice(32, 64, hex)];

       const makeSigner = addToV => (hash, privateKey) => {
         const signature = secp256k1.keyFromPrivate(new Buffer$1(privateKey.slice(2), "hex")).sign(new Buffer$1(hash.slice(2), "hex"), { canonical: true });
         return encodeSignature([Nat.fromString(Bytes.fromNumber(addToV + signature.recoveryParam)), Bytes.pad(32, Bytes.fromNat("0x" + signature.r.toString(16))), Bytes.pad(32, Bytes.fromNat("0x" + signature.s.toString(16)))]);
       };

       const sign = makeSigner(27); // v=27|28 instead of 0|1...

       const recover = (hash, signature) => {
         const vals = decodeSignature(signature);
         const vrs = { v: Bytes.toNumber(vals[0]), r: vals[1].slice(2), s: vals[2].slice(2) };
         const ecPublicKey = secp256k1.recoverPubKey(new Buffer$1(hash.slice(2), "hex"), vrs, vrs.v < 2 ? vrs.v : 1 - vrs.v % 2); // because odd vals mean v=0... sadly that means v=0 means v=1... I hate that
         const publicKey = "0x" + ecPublicKey.encode("hex", false).slice(2);
         const publicHash = keccak256(publicKey);
         const address = toChecksum("0x" + publicHash.slice(-40));
         return address;
       };

       module.exports = {
         create,
         toChecksum,
         fromPrivate,
         sign,
         makeSigner,
         recover,
         encodeSignature,
         decodeSignature
       };

       // This was ported from https://github.com/emn178/js-sha3, with some minor
       // modifications and pruning. It is licensed under MIT:
       //
       // Copyright 2015-2016 Chen, Yi-Cyuan
       //  
       // Permission is hereby granted, free of charge, to any person obtaining
       // a copy of this software and associated documentation files (the
       // "Software"), to deal in the Software without restriction, including
       // without limitation the rights to use, copy, modify, merge, publish,
       // distribute, sublicense, and/or sell copies of the Software, and to
       // permit persons to whom the Software is furnished to do so, subject to
       // the following conditions:
       // 
       // The above copyright notice and this permission notice shall be
       // included in all copies or substantial portions of the Software.
       // 
       // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
       // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
       // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
       // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
       // LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
       // OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
       // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

       const HEX_CHARS$1 = '0123456789abcdef'.split('');
       const KECCAK_PADDING$1 = [1, 256, 65536, 16777216];
       const SHIFT$1 = [0, 8, 16, 24];
       const RC$1 = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

       const Keccak$1 = bits => ({
         blocks: [],
         reset: true,
         block: 0,
         start: 0,
         blockCount: 1600 - (bits << 1) >> 5,
         outputBlocks: bits >> 5,
         s: (s => [].concat(s, s, s, s, s))([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
       });

       const update$2 = (state, message) => {
         var length = message.length,
             blocks = state.blocks,
             byteCount = state.blockCount << 2,
             blockCount = state.blockCount,
             outputBlocks = state.outputBlocks,
             s = state.s,
             index = 0,
             i,
             code;

         // update
         while (index < length) {
           if (state.reset) {
             state.reset = false;
             blocks[0] = state.block;
             for (i = 1; i < blockCount + 1; ++i) {
               blocks[i] = 0;
             }
           }
           if (typeof message !== "string") {
             for (i = state.start; index < length && i < byteCount; ++index) {
               blocks[i >> 2] |= message[index] << SHIFT$1[i++ & 3];
             }
           } else {
             for (i = state.start; index < length && i < byteCount; ++index) {
               code = message.charCodeAt(index);
               if (code < 0x80) {
                 blocks[i >> 2] |= code << SHIFT$1[i++ & 3];
               } else if (code < 0x800) {
                 blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT$1[i++ & 3];
               } else if (code < 0xd800 || code >= 0xe000) {
                 blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT$1[i++ & 3];
               } else {
                 code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                 blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT$1[i++ & 3];
                 blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT$1[i++ & 3];
               }
             }
           }
           state.lastByteIndex = i;
           if (i >= byteCount) {
             state.start = i - byteCount;
             state.block = blocks[blockCount];
             for (i = 0; i < blockCount; ++i) {
               s[i] ^= blocks[i];
             }
             f$1(s);
             state.reset = true;
           } else {
             state.start = i;
           }
         }

         // finalize
         i = state.lastByteIndex;
         blocks[i >> 2] |= KECCAK_PADDING$1[i & 3];
         if (state.lastByteIndex === byteCount) {
           blocks[0] = blocks[blockCount];
           for (i = 1; i < blockCount + 1; ++i) {
             blocks[i] = 0;
           }
         }
         blocks[blockCount - 1] |= 0x80000000;
         for (i = 0; i < blockCount; ++i) {
           s[i] ^= blocks[i];
         }
         f$1(s);

         // toString
         var hex = '',
             i = 0,
             j = 0,
             block;
         while (j < outputBlocks) {
           for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
             block = s[i];
             hex += HEX_CHARS$1[block >> 4 & 0x0F] + HEX_CHARS$1[block & 0x0F] + HEX_CHARS$1[block >> 12 & 0x0F] + HEX_CHARS$1[block >> 8 & 0x0F] + HEX_CHARS$1[block >> 20 & 0x0F] + HEX_CHARS$1[block >> 16 & 0x0F] + HEX_CHARS$1[block >> 28 & 0x0F] + HEX_CHARS$1[block >> 24 & 0x0F];
           }
           if (j % blockCount === 0) {
             f$1(s);
             i = 0;
           }
         }
         return "0x" + hex;
       };

       const f$1 = s => {
         var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

         for (n = 0; n < 48; n += 2) {
           c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
           c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
           c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
           c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
           c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
           c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
           c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
           c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
           c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
           c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

           h = c8 ^ (c2 << 1 | c3 >>> 31);
           l = c9 ^ (c3 << 1 | c2 >>> 31);
           s[0] ^= h;
           s[1] ^= l;
           s[10] ^= h;
           s[11] ^= l;
           s[20] ^= h;
           s[21] ^= l;
           s[30] ^= h;
           s[31] ^= l;
           s[40] ^= h;
           s[41] ^= l;
           h = c0 ^ (c4 << 1 | c5 >>> 31);
           l = c1 ^ (c5 << 1 | c4 >>> 31);
           s[2] ^= h;
           s[3] ^= l;
           s[12] ^= h;
           s[13] ^= l;
           s[22] ^= h;
           s[23] ^= l;
           s[32] ^= h;
           s[33] ^= l;
           s[42] ^= h;
           s[43] ^= l;
           h = c2 ^ (c6 << 1 | c7 >>> 31);
           l = c3 ^ (c7 << 1 | c6 >>> 31);
           s[4] ^= h;
           s[5] ^= l;
           s[14] ^= h;
           s[15] ^= l;
           s[24] ^= h;
           s[25] ^= l;
           s[34] ^= h;
           s[35] ^= l;
           s[44] ^= h;
           s[45] ^= l;
           h = c4 ^ (c8 << 1 | c9 >>> 31);
           l = c5 ^ (c9 << 1 | c8 >>> 31);
           s[6] ^= h;
           s[7] ^= l;
           s[16] ^= h;
           s[17] ^= l;
           s[26] ^= h;
           s[27] ^= l;
           s[36] ^= h;
           s[37] ^= l;
           s[46] ^= h;
           s[47] ^= l;
           h = c6 ^ (c0 << 1 | c1 >>> 31);
           l = c7 ^ (c1 << 1 | c0 >>> 31);
           s[8] ^= h;
           s[9] ^= l;
           s[18] ^= h;
           s[19] ^= l;
           s[28] ^= h;
           s[29] ^= l;
           s[38] ^= h;
           s[39] ^= l;
           s[48] ^= h;
           s[49] ^= l;

           b0 = s[0];
           b1 = s[1];
           b32 = s[11] << 4 | s[10] >>> 28;
           b33 = s[10] << 4 | s[11] >>> 28;
           b14 = s[20] << 3 | s[21] >>> 29;
           b15 = s[21] << 3 | s[20] >>> 29;
           b46 = s[31] << 9 | s[30] >>> 23;
           b47 = s[30] << 9 | s[31] >>> 23;
           b28 = s[40] << 18 | s[41] >>> 14;
           b29 = s[41] << 18 | s[40] >>> 14;
           b20 = s[2] << 1 | s[3] >>> 31;
           b21 = s[3] << 1 | s[2] >>> 31;
           b2 = s[13] << 12 | s[12] >>> 20;
           b3 = s[12] << 12 | s[13] >>> 20;
           b34 = s[22] << 10 | s[23] >>> 22;
           b35 = s[23] << 10 | s[22] >>> 22;
           b16 = s[33] << 13 | s[32] >>> 19;
           b17 = s[32] << 13 | s[33] >>> 19;
           b48 = s[42] << 2 | s[43] >>> 30;
           b49 = s[43] << 2 | s[42] >>> 30;
           b40 = s[5] << 30 | s[4] >>> 2;
           b41 = s[4] << 30 | s[5] >>> 2;
           b22 = s[14] << 6 | s[15] >>> 26;
           b23 = s[15] << 6 | s[14] >>> 26;
           b4 = s[25] << 11 | s[24] >>> 21;
           b5 = s[24] << 11 | s[25] >>> 21;
           b36 = s[34] << 15 | s[35] >>> 17;
           b37 = s[35] << 15 | s[34] >>> 17;
           b18 = s[45] << 29 | s[44] >>> 3;
           b19 = s[44] << 29 | s[45] >>> 3;
           b10 = s[6] << 28 | s[7] >>> 4;
           b11 = s[7] << 28 | s[6] >>> 4;
           b42 = s[17] << 23 | s[16] >>> 9;
           b43 = s[16] << 23 | s[17] >>> 9;
           b24 = s[26] << 25 | s[27] >>> 7;
           b25 = s[27] << 25 | s[26] >>> 7;
           b6 = s[36] << 21 | s[37] >>> 11;
           b7 = s[37] << 21 | s[36] >>> 11;
           b38 = s[47] << 24 | s[46] >>> 8;
           b39 = s[46] << 24 | s[47] >>> 8;
           b30 = s[8] << 27 | s[9] >>> 5;
           b31 = s[9] << 27 | s[8] >>> 5;
           b12 = s[18] << 20 | s[19] >>> 12;
           b13 = s[19] << 20 | s[18] >>> 12;
           b44 = s[29] << 7 | s[28] >>> 25;
           b45 = s[28] << 7 | s[29] >>> 25;
           b26 = s[38] << 8 | s[39] >>> 24;
           b27 = s[39] << 8 | s[38] >>> 24;
           b8 = s[48] << 14 | s[49] >>> 18;
           b9 = s[49] << 14 | s[48] >>> 18;

           s[0] = b0 ^ ~b2 & b4;
           s[1] = b1 ^ ~b3 & b5;
           s[10] = b10 ^ ~b12 & b14;
           s[11] = b11 ^ ~b13 & b15;
           s[20] = b20 ^ ~b22 & b24;
           s[21] = b21 ^ ~b23 & b25;
           s[30] = b30 ^ ~b32 & b34;
           s[31] = b31 ^ ~b33 & b35;
           s[40] = b40 ^ ~b42 & b44;
           s[41] = b41 ^ ~b43 & b45;
           s[2] = b2 ^ ~b4 & b6;
           s[3] = b3 ^ ~b5 & b7;
           s[12] = b12 ^ ~b14 & b16;
           s[13] = b13 ^ ~b15 & b17;
           s[22] = b22 ^ ~b24 & b26;
           s[23] = b23 ^ ~b25 & b27;
           s[32] = b32 ^ ~b34 & b36;
           s[33] = b33 ^ ~b35 & b37;
           s[42] = b42 ^ ~b44 & b46;
           s[43] = b43 ^ ~b45 & b47;
           s[4] = b4 ^ ~b6 & b8;
           s[5] = b5 ^ ~b7 & b9;
           s[14] = b14 ^ ~b16 & b18;
           s[15] = b15 ^ ~b17 & b19;
           s[24] = b24 ^ ~b26 & b28;
           s[25] = b25 ^ ~b27 & b29;
           s[34] = b34 ^ ~b36 & b38;
           s[35] = b35 ^ ~b37 & b39;
           s[44] = b44 ^ ~b46 & b48;
           s[45] = b45 ^ ~b47 & b49;
           s[6] = b6 ^ ~b8 & b0;
           s[7] = b7 ^ ~b9 & b1;
           s[16] = b16 ^ ~b18 & b10;
           s[17] = b17 ^ ~b19 & b11;
           s[26] = b26 ^ ~b28 & b20;
           s[27] = b27 ^ ~b29 & b21;
           s[36] = b36 ^ ~b38 & b30;
           s[37] = b37 ^ ~b39 & b31;
           s[46] = b46 ^ ~b48 & b40;
           s[47] = b47 ^ ~b49 & b41;
           s[8] = b8 ^ ~b0 & b2;
           s[9] = b9 ^ ~b1 & b3;
           s[18] = b18 ^ ~b10 & b12;
           s[19] = b19 ^ ~b11 & b13;
           s[28] = b28 ^ ~b20 & b22;
           s[29] = b29 ^ ~b21 & b23;
           s[38] = b38 ^ ~b30 & b32;
           s[39] = b39 ^ ~b31 & b33;
           s[48] = b48 ^ ~b40 & b42;
           s[49] = b49 ^ ~b41 & b43;

           s[0] ^= RC$1[n];
           s[1] ^= RC$1[n + 1];
         }
       };

       const keccak$1 = bits => str => {
         var msg;
         if (str.slice(0, 2) === "0x") {
           msg = [];
           for (var i = 2, l = str.length; i < l; i += 2) msg.push(parseInt(str.slice(i, i + 2), 16));
         } else {
           msg = str;
         }
         return update$2(Keccak$1(bits, bits), msg);
       };

       var hash$1 = {
         keccak256: keccak$1(256),
         keccak512: keccak$1(512),
         keccak256s: keccak$1(256),
         keccak512s: keccak$1(512)
       };
       var hash_3$1 = hash$1.keccak256s;

       /**
        * Like web3.eth.accounts.hashMessage without the envelope.
        *
        * @param {*} data
        *  A message to hash - if it is hex it'll be UTF8 decoded.
        *
        * @returns {*}
        *  The hashed message (using keccak256)
        */
       var hashMsgRaw = function (data) {
           var msg = src_9(data) ? src_19(data) : data;
           var msgBuffer = Buffer.from(msg);
           return hash_3$1(msgBuffer);
       };
       /**
        * Sign a message such that it can be verified with `ecrecover`.
        * Similar to `web3.eth.accounts.sign` except that we sign the hash directly.
        *
        * @param {*} messageHash
        *  Hash of a message, as returned by `web3.utils.soliditySha3` or similar.
        * @param {*} privateKey
        *  Privkey to sign with.
        *
        * @returns {{messageHash: string, r: string, s: string, v: string}}
        */
       var ethSignHash = function (messageHash, privateKey) {
           // near identical to web3-eth-accounts (web3 v1)
           // the main difference is we don't envelop the data.
           var signature = undefined(messageHash, privateKey);
           var vrs = undefined(signature);
           return {
               messageHash: messageHash,
               v: vrs[0],
               r: vrs[1],
               s: vrs[2],
               signature: signature
           };
       };
       var ethVerifySig = function (messageHash, _a) {
           var v = _a[0], r = _a[1], s = _a[2];
           var address = undefined(messageHash, undefined([v, r, s]));
           return {
               verified: true,
               address: address
           };
       };

       var crypto$1 = /*#__PURE__*/Object.freeze({
              hashMsgRaw: hashMsgRaw,
              ethSignHash: ethSignHash,
              ethVerifySig: ethVerifySig
       });

       var BN = require('bn.js');
       /**
        * This object tracks the flags used for SV ballot boxes. They determine the submission
        * methods and whether ballots are tracked as binding, official, or testing.
        *
        * For more info see docs.secure.vote
        */
       var flags = {
           // flags on submission methods
           USE_ETH: Math.pow(2, 0),
           USE_SIGNED: Math.pow(2, 1),
           USE_NO_ENC: Math.pow(2, 2),
           USE_ENC: Math.pow(2, 3),
           // other ballot settings
           IS_BINDING: Math.pow(2, 13),
           IS_OFFICIAL: Math.pow(2, 14),
           USE_TESTING: Math.pow(2, 15)
       };
       /**
        * Creates a packed copy of start and end times with submissionBits
        *
        * @param {number} start
        *  Start time in seconds since epoch
        * @param {number} end
        *  End time in seconds since epoch
        * @param {number} submissionBits
        *  Submission bits - can be created using mkSubmissionBits
        * @returns {BN}
        *  Returns a `bn.js` BigNum of the packed values.
        *  Format: [submissionBits(16)][startTime(64)][endTime(64)]
        */
       var mkPacked = function (start, end, submissionBits) {
           var max64Bit = new BN('ffffffffffffffff', 16);
           var s = new BN(start);
           equal(s.lte(max64Bit) && s.gtn(0), true, 'start time must be >0 and <2^64');
           var e = new BN(end);
           equal(e.lte(max64Bit) && e.gtn(0), true, 'end time must be >0 and <2^64');
           var sb = new BN(submissionBits);
           equal(sb.ltn(Math.pow(2, 16)) && sb.gtn(0), true, 'submission bits must be >0 and <2^16'); // note: submission bits of 0 is invalid
           return sb
               .shln(64)
               .add(s)
               .shln(64)
               .add(e);
       };
       /**
        * This combines flags into a finished submissionBits. It also does some validation.
        * @param {*} toCombine
        *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
        *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
        * @returns {number}
        *  A 16 bit integer of combined flags.
        */
       var mkSubmissionBits = function () {
           var toCombine = [];
           for (var _i = 0; _i < arguments.length; _i++) {
               toCombine[_i] = arguments[_i];
           }
           if (Array.isArray(toCombine[0]) && typeof toCombine[0][0] == 'number') {
               console.warn('Warning: mkSubmissionBits does not take an Array<number> anymore.');
               toCombine = toCombine[0];
           }
           var toRet = reduce(function (acc, i) { return acc | i; }, 0, toCombine);
           equal(all(function (i) { return typeof i == 'number'; }, toCombine), true, "Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: " + toCombine);
           equal(all(function (i) { return i === (i | 0); }, toCombine), true, "Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: " + toCombine);
           equal(toRet, sum(toCombine), "Bad input provided to mkSubmissionBits. Logical OR and sum sanity check failed. Input was: " + toCombine);
           equal(toRet < Math.pow(2, 16), true, "Submission bits must fit into a 16 bit integer (i.e. less than 2^16). Result was: " + toRet);
           return toRet;
       };
       /**
        * Take the arguments and produce web3 data fitting the `submitProxyVote` method.
        * @param {string} ballotId
        *  a BN.js or Hex ballotId
        * @param {number} sequence
        *  the sequence number to use (0 < sequence < 2^32)
        * @param {string} voteData
        *  the vote data to use, should be 32 bytes hex encoded
        * @param {string} extra
        *  any extra data included with the vote (such as curve25519 pubkeys)
        * @param {string} privateKey
        *  the privkey used to sign
        * @param {object?} opts
        *  options:
        *   - skipSequenceSizeCheck: boolean (will not throw if sequence is >= 2^32)
        * @returns {object}
        *  { proxyReq (bytes32[5]), extra (bytes) } in the required format for `submitProxyVote`
        */
       var mkSignedBallotForProxy = function (ballotId, sequence$$1, voteData, extra, privateKey, opts) {
           if (opts === void 0) { opts = {}; }
           if (opts.skipSequenceSizeCheck !== true)
               equal(0 < sequence$$1 && sequence$$1 < Math.pow(2, 32), true, 'sequence number out of bounds');
           equal(src_9(ballotId) || src_6(ballotId), true, 'ballotId incorrect format (either not a BN or not hex)');
           equal(src_9(voteData), true, 'vote data is not hex (strict)');
           equal(src_9(extra), true, 'extra param is not hex (strict)');
           var _ballotId = src_6(ballotId)
               ? src_38(src_16(ballotId), 64)
               : ballotId;
           equal(_ballotId.length, 66, 'ballotId incorrect length');
           equal(voteData.length, 66, 'voteData incorrect length');
           var sequenceHex = src_38(src_16(sequence$$1), 8);
           var messageHash = src_12({ t: 'bytes31', v: src_38(sequenceHex, '62') }, { t: 'bytes32', v: _ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
           var _a = ethSignHash(messageHash, privateKey), v = _a.v, r = _a.r, s = _a.s;
           var vBytes = src_19(v);
           var midBytes = src_19(src_40('0x', 54));
           var sequenceBytes = src_19(sequenceHex);
           var packed2Bytes = concat(vBytes, concat(midBytes, sequenceBytes));
           var packed2 = src_18(packed2Bytes);
           return {
               proxyReq: [r, s, packed2, _ballotId, voteData],
               extra: extra
           };
       };
       /**
        * Verify a signed vote to be submitted via proxy as generated by `mkSignedBallotForProxy`
        *
        * @param {ProxyVote} proxyVote The ProxyVote object
        * @param {*} [opts={}] Not used currently; for future options
        * @returns {{verified: bool, address: EthAddress}}
        */
       var verifySignedBallotForProxy = function (proxyVote, opts) {
           if (opts === void 0) { opts = {}; }
           var _a = proxyVote.proxyReq, r = _a[0], s = _a[1], packed2 = _a[2], ballotId = _a[3], voteData = _a[4], extra = proxyVote.extra;
           var p2Bytes = src_19(packed2);
           var v = src_18(p2Bytes.slice(0, 1));
           var seqNum = src_18(p2Bytes.slice(27, 32));
           var messageHash = src_12({ t: 'bytes31', v: src_18(p2Bytes.slice(1)) }, { t: 'bytes32', v: ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
           return ethVerifySig(messageHash, [v, r, s]);
       };
       /**
        * Prepares voteData for a Range3 ballot from an array of votes
        *
        * @param {array} votesArray
        *  Takes an array of numbers which represent the votes to be transformed
        *  Format: [1, 2, -1]
        *
        * @returns {string}
        *  Returns an eth hex string of the vote data
        */
       var genRange3VoteData = function (votesArray) {
           equal(all(function (v) { return (v | 0) === v; }, votesArray), true, 'All array elements must be defined and integers.');
           equal(all(function (v) { return -3 <= v && v <= 3; }, votesArray), true, 'Votes must be in range -3 to 3.');
           equal(votesArray.length <= 85, true, 'Too many votes; maximum capacity of 32 bytes is 85 individual items.');
           // Generate list of binary encoded votes. Read bottom to top.
           var binaryVotes = compose(
           // pad to 3 bits
           map(function (vBin) { return join('', repeat('0', 3 - vBin.length)) + vBin; }), 
           // convert votes to binary
           map(function (v) { return v.toString(2); }), 
           // offset votes to be in range 0,6
           map(function (v) { return v + 3; }))(votesArray);
           // check we have converted votes to bitstring representation of length 3
           equal(all(function (bVote) { return bVote.length == 3; }, binaryVotes), true, 'Assertion failed: all binary-encoded votes should be 3 bits long');
           // create the binary voteData
           var rawBinVotes = join('', binaryVotes);
           // and pad it with 0s to length 256 (32 bytes total)
           var binVoteData = rawBinVotes + join('', repeat('0', 32 * 8 - rawBinVotes.length));
           equal(binVoteData.length, 256, 'Assertion failed: generated voteData bit string does not have length 256');
           // Convert to bytes
           var voteBytes = map(function (bStr) { return parseInt(bStr, 2); }, splitEvery(8, binVoteData));
           // check bytes are in range
           equal(all(function (vByte) { return 0 <= vByte && vByte <= 255; }, voteBytes), true, 'Assertion failed: voteBytes (byte array) had a byte out of bounds (<0 or >255)');
           // generate final hex
           var voteData = src_18(voteBytes);
           equal(voteData.length, 66, 'Assertion failed: final hex was not 66 characters long (32 bytes)');
           return voteData;
       };

       var ballotBox = /*#__PURE__*/Object.freeze({
              flags: flags,
              mkPacked: mkPacked,
              mkSubmissionBits: mkSubmissionBits,
              mkSignedBallotForProxy: mkSignedBallotForProxy,
              verifySignedBallotForProxy: verifySignedBallotForProxy,
              genRange3VoteData: genRange3VoteData
       });

       var zeroAddr = "0x0000000000000000000000000000000000000000";
       var zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
       var _raw_networkVars = {
           kovan: {
               indexContractName: "index.kov.sv",
               auxContract: "0x0d31706febd1b8177c722fe39432f3e47143ccd9",
               httpProvider: "https://kovan.eth.secure.vote/tokenvote-dev",
               delegationContractName: "delegation-2018-06-19.kov.sv",
               ensResolver: "0xc8c73829348cb15da4b0785a110017464fb8af51",
               ens: "0xd6F4f22eeC158c434b17d01f62f5dF33b108Ae93",
               etherscanLink: "https://kovan.etherscan.io/",
               name: "Kovan",
               archiveUrl: "https://archive.test.secure.vote/",
               archivePushUrl: "https://archive.test.push.secure.vote/",
               lookupAddress: "0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE"
           },
           mainnet: {
               indexContractName: "index.tokenvote.eth",
               auxContract: "0xff553fe4183f27e2165299b3fc0ae8c3b5c07084",
               httpProvider: "https://mainnet.eth.secure.vote/tokenvote",
               delegationContractName: "delegate.secvote.eth",
               ensResolver: "0x5FfC014343cd971B7eb70732021E26C35B744cc4",
               ens: "0x314159265dd8dbb310642f98f50c066173c1259b",
               etherscanLink: "https://etherscan.io/",
               name: "Mainnet",
               archiveUrl: "https://archive.secure.vote/",
               archivePushUrl: "https://archive.push.secure.vote/",
               lookupAddress: "0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE"
           },
           ropsten: {
               indexContractName: "",
               auxContract: "",
               httpProvider: "https://ropsten.eth.secure.vote/tokenvote-dev",
               delegationContractName: "",
               ensResolver: "",
               ens: "",
               etherscanLink: "https://ropsten.etherscan.io/",
               name: "Ropsten",
               archiveUrl: "https://archive.test.secure.vote/",
               archivePushUrl: "https://archive.test.push.secure.vote/",
               lookupAddress: ""
           },
           classic: {
               indexContractName: "",
               auxContract: "",
               httpProvider: "https://classic.eth.secure.vote/tokenvote-dev",
               delegationContractName: "",
               ensResolver: "",
               ens: "",
               etherscanLink: "https://gastracker.io/",
               name: "Classic",
               archiveUrl: "https://archive.secure.vote/",
               archivePushUrl: "https://archive.push.secure.vote/",
               lookupAddress: ""
           },
       };
       var networkVars = new Proxy(_raw_networkVars, {
           get: function (obj, prop) {
               console.warn("Warning: const.networkVars is deprecated; please use const.getNetwork(..)");
               return obj[prop];
           }
       });
       var networkName = function (networkId) {
           console.warn("Warning: const.networkName(..) is deprecated. Please use const.getNetwork(..).name");
           switch (networkId) {
               case 1:
                   return "Mainnet";
               case 2:
                   return "Morden";
               case 3:
                   return "Ropsten";
               case 4:
                   return "Rinkeby";
               case 42:
                   return "Kovan";
               default:
                   return "Unknown";
           }
       };
       var getNetwork = function (networkId, chainId) {
           switch (networkId) {
               case 1:
                   if (chainId === 1)
                       return _raw_networkVars.mainnet;
                   if (chainId === 61)
                       return _raw_networkVars.classic;
                   break;
               case 3:
                   return _raw_networkVars.ropsten;
               case 42:
                   return _raw_networkVars.kovan;
               default:
                   break;
           }
           throw Error("Cannot find network with net_id " + networkId + " and chainId " + chainId);
       };

       var _const = /*#__PURE__*/Object.freeze({
              zeroAddr: zeroAddr,
              zeroHash: zeroHash,
              networkVars: networkVars,
              networkName: networkName,
              getNetwork: getNetwork
       });

       /*! *****************************************************************************
       Copyright (c) Microsoft Corporation. All rights reserved.
       Licensed under the Apache License, Version 2.0 (the "License"); you may not use
       this file except in compliance with the License. You may obtain a copy of the
       License at http://www.apache.org/licenses/LICENSE-2.0

       THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
       WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
       MERCHANTABLITY OR NON-INFRINGEMENT.

       See the Apache Version 2.0 License for specific language governing permissions
       and limitations under the License.
       ***************************************************************************** */

       var __assign = Object.assign || function __assign(t) {
           for (var s, i = 1, n = arguments.length; i < n; i++) {
               s = arguments[i];
               for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
           }
           return t;
       };

       function __awaiter(thisArg, _arguments, P, generator) {
           return new (P || (P = Promise))(function (resolve, reject) {
               function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
               function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
               function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
               step((generator = generator.apply(thisArg, _arguments || [])).next());
           });
       }

       function __generator(thisArg, body) {
           var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
           return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
           function verb(n) { return function (v) { return step([n, v]); }; }
           function step(op) {
               if (f) throw new TypeError("Generator is already executing.");
               while (_) try {
                   if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                   if (y = 0, t) op = [op[0] & 2, t.value];
                   switch (op[0]) {
                       case 0: case 1: t = op; break;
                       case 4: _.label++; return { value: op[1], done: false };
                       case 5: _.label++; y = op[1]; op = [0]; continue;
                       case 7: op = _.ops.pop(); _.trys.pop(); continue;
                       default:
                           if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                           if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                           if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                           if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                           if (t[2]) _.ops.pop();
                           _.trys.pop(); continue;
                   }
                   op = body.call(thisArg, _);
               } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
               if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
           }
       }

       var sha3$1 = require('js-sha3').keccak_256;
       var uts46 = require('idna-uts46-hx');

       function namehash (inputName) {
         // Reject empty names:
         var node = '';
         for (var i = 0; i < 32; i++) {
           node += '00';
         }

         name = normalize(inputName);

         if (name) {
           var labels = name.split('.');

           for(var i = labels.length - 1; i >= 0; i--) {
             var labelSha = sha3$1(labels[i]);
             node = sha3$1(new Buffer$1(node + labelSha, 'hex'));
           }
         }

         return '0x' + node
       }

       function normalize(name) {
         return name ? uts46.toUnicode(name, {useStd3ASCII: true, transitional: false}) : name
       }

       exports.hash = namehash;
       exports.normalize = normalize;

       var bind$1 = function bind(fn, thisArg) {
         return function wrap() {
           var args = new Array(arguments.length);
           for (var i = 0; i < args.length; i++) {
             args[i] = arguments[i];
           }
           return fn.apply(thisArg, args);
         };
       };

       /*!
        * Determine if an object is a Buffer
        *
        * @author   Feross Aboukhadijeh <https://feross.org>
        * @license  MIT
        */

       // The _isBuffer check is for Safari 5-7 support, because it's missing
       // Object.prototype.constructor. Remove this eventually
       var isBuffer_1 = function (obj) {
         return obj != null && (isBuffer$2(obj) || isSlowBuffer$1(obj) || !!obj._isBuffer)
       };

       function isBuffer$2 (obj) {
         return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
       }

       // For Node v0.10 support. Remove this eventually.
       function isSlowBuffer$1 (obj) {
         return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$2(obj.slice(0, 0))
       }

       /*global toString:true*/

       // utils is a library of generic helper functions non-specific to axios

       var toString$3 = Object.prototype.toString;

       /**
        * Determine if a value is an Array
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is an Array, otherwise false
        */
       function isArray$2(val) {
         return toString$3.call(val) === '[object Array]';
       }

       /**
        * Determine if a value is an ArrayBuffer
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is an ArrayBuffer, otherwise false
        */
       function isArrayBuffer(val) {
         return toString$3.call(val) === '[object ArrayBuffer]';
       }

       /**
        * Determine if a value is a FormData
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is an FormData, otherwise false
        */
       function isFormData(val) {
         return (typeof FormData !== 'undefined') && (val instanceof FormData);
       }

       /**
        * Determine if a value is a view on an ArrayBuffer
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
        */
       function isArrayBufferView(val) {
         var result;
         if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
           result = ArrayBuffer.isView(val);
         } else {
           result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
         }
         return result;
       }

       /**
        * Determine if a value is a String
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a String, otherwise false
        */
       function isString$1(val) {
         return typeof val === 'string';
       }

       /**
        * Determine if a value is a Number
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a Number, otherwise false
        */
       function isNumber$1(val) {
         return typeof val === 'number';
       }

       /**
        * Determine if a value is undefined
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if the value is undefined, otherwise false
        */
       function isUndefined$1(val) {
         return typeof val === 'undefined';
       }

       /**
        * Determine if a value is an Object
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is an Object, otherwise false
        */
       function isObject$1(val) {
         return val !== null && typeof val === 'object';
       }

       /**
        * Determine if a value is a Date
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a Date, otherwise false
        */
       function isDate$1(val) {
         return toString$3.call(val) === '[object Date]';
       }

       /**
        * Determine if a value is a File
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a File, otherwise false
        */
       function isFile(val) {
         return toString$3.call(val) === '[object File]';
       }

       /**
        * Determine if a value is a Blob
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a Blob, otherwise false
        */
       function isBlob(val) {
         return toString$3.call(val) === '[object Blob]';
       }

       /**
        * Determine if a value is a Function
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a Function, otherwise false
        */
       function isFunction$1(val) {
         return toString$3.call(val) === '[object Function]';
       }

       /**
        * Determine if a value is a Stream
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a Stream, otherwise false
        */
       function isStream(val) {
         return isObject$1(val) && isFunction$1(val.pipe);
       }

       /**
        * Determine if a value is a URLSearchParams object
        *
        * @param {Object} val The value to test
        * @returns {boolean} True if value is a URLSearchParams object, otherwise false
        */
       function isURLSearchParams(val) {
         return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
       }

       /**
        * Trim excess whitespace off the beginning and end of a string
        *
        * @param {String} str The String to trim
        * @returns {String} The String freed of excess whitespace
        */
       function trim$1(str) {
         return str.replace(/^\s*/, '').replace(/\s*$/, '');
       }

       /**
        * Determine if we're running in a standard browser environment
        *
        * This allows axios to run in a web worker, and react-native.
        * Both environments support XMLHttpRequest, but not fully standard globals.
        *
        * web workers:
        *  typeof window -> undefined
        *  typeof document -> undefined
        *
        * react-native:
        *  navigator.product -> 'ReactNative'
        */
       function isStandardBrowserEnv() {
         if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
           return false;
         }
         return (
           typeof window !== 'undefined' &&
           typeof document !== 'undefined'
         );
       }

       /**
        * Iterate over an Array or an Object invoking a function for each item.
        *
        * If `obj` is an Array callback will be called passing
        * the value, index, and complete array for each item.
        *
        * If 'obj' is an Object callback will be called passing
        * the value, key, and complete object for each property.
        *
        * @param {Object|Array} obj The object to iterate
        * @param {Function} fn The callback to invoke for each item
        */
       function forEach$1(obj, fn) {
         // Don't bother if no value provided
         if (obj === null || typeof obj === 'undefined') {
           return;
         }

         // Force an array if not already something iterable
         if (typeof obj !== 'object') {
           /*eslint no-param-reassign:0*/
           obj = [obj];
         }

         if (isArray$2(obj)) {
           // Iterate over array values
           for (var i = 0, l = obj.length; i < l; i++) {
             fn.call(null, obj[i], i, obj);
           }
         } else {
           // Iterate over object keys
           for (var key in obj) {
             if (Object.prototype.hasOwnProperty.call(obj, key)) {
               fn.call(null, obj[key], key, obj);
             }
           }
         }
       }

       /**
        * Accepts varargs expecting each argument to be an object, then
        * immutably merges the properties of each object and returns result.
        *
        * When multiple objects contain the same key the later object in
        * the arguments list will take precedence.
        *
        * Example:
        *
        * ```js
        * var result = merge({foo: 123}, {foo: 456});
        * console.log(result.foo); // outputs 456
        * ```
        *
        * @param {Object} obj1 Object to merge
        * @returns {Object} Result of all merge properties
        */
       function merge$1(/* obj1, obj2, obj3, ... */) {
         var result = {};
         function assignValue(val, key) {
           if (typeof result[key] === 'object' && typeof val === 'object') {
             result[key] = merge$1(result[key], val);
           } else {
             result[key] = val;
           }
         }

         for (var i = 0, l = arguments.length; i < l; i++) {
           forEach$1(arguments[i], assignValue);
         }
         return result;
       }

       /**
        * Extends object a by mutably adding to it the properties of object b.
        *
        * @param {Object} a The object to be extended
        * @param {Object} b The object to copy properties from
        * @param {Object} thisArg The object to bind function to
        * @return {Object} The resulting value of object a
        */
       function extend(a, b, thisArg) {
         forEach$1(b, function assignValue(val, key) {
           if (thisArg && typeof val === 'function') {
             a[key] = bind$1(val, thisArg);
           } else {
             a[key] = val;
           }
         });
         return a;
       }

       var utils$1 = {
         isArray: isArray$2,
         isArrayBuffer: isArrayBuffer,
         isBuffer: isBuffer_1,
         isFormData: isFormData,
         isArrayBufferView: isArrayBufferView,
         isString: isString$1,
         isNumber: isNumber$1,
         isObject: isObject$1,
         isUndefined: isUndefined$1,
         isDate: isDate$1,
         isFile: isFile,
         isBlob: isBlob,
         isFunction: isFunction$1,
         isStream: isStream,
         isURLSearchParams: isURLSearchParams,
         isStandardBrowserEnv: isStandardBrowserEnv,
         forEach: forEach$1,
         merge: merge$1,
         extend: extend,
         trim: trim$1
       };

       var utils$2 = require('./utils');
       var normalizeHeaderName = require('./helpers/normalizeHeaderName');

       var DEFAULT_CONTENT_TYPE = {
         'Content-Type': 'application/x-www-form-urlencoded'
       };

       function setContentTypeIfUnset(headers, value) {
         if (!utils$2.isUndefined(headers) && utils$2.isUndefined(headers['Content-Type'])) {
           headers['Content-Type'] = value;
         }
       }

       function getDefaultAdapter() {
         var adapter;
         if (typeof XMLHttpRequest !== 'undefined') {
           // For browsers use XHR adapter
           adapter = require('./adapters/xhr');
         } else if (typeof process !== 'undefined') {
           // For node use HTTP adapter
           adapter = require('./adapters/http');
         }
         return adapter;
       }

       var defaults = {
         adapter: getDefaultAdapter(),

         transformRequest: [function transformRequest(data, headers) {
           normalizeHeaderName(headers, 'Content-Type');
           if (utils$2.isFormData(data) ||
             utils$2.isArrayBuffer(data) ||
             utils$2.isBuffer(data) ||
             utils$2.isStream(data) ||
             utils$2.isFile(data) ||
             utils$2.isBlob(data)
           ) {
             return data;
           }
           if (utils$2.isArrayBufferView(data)) {
             return data.buffer;
           }
           if (utils$2.isURLSearchParams(data)) {
             setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
             return data.toString();
           }
           if (utils$2.isObject(data)) {
             setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
             return JSON.stringify(data);
           }
           return data;
         }],

         transformResponse: [function transformResponse(data) {
           /*eslint no-param-reassign:0*/
           if (typeof data === 'string') {
             try {
               data = JSON.parse(data);
             } catch (e) { /* Ignore */ }
           }
           return data;
         }],

         /**
          * A timeout in milliseconds to abort a request. If set to 0 (default) a
          * timeout is not created.
          */
         timeout: 0,

         xsrfCookieName: 'XSRF-TOKEN',
         xsrfHeaderName: 'X-XSRF-TOKEN',

         maxContentLength: -1,

         validateStatus: function validateStatus(status) {
           return status >= 200 && status < 300;
         }
       };

       defaults.headers = {
         common: {
           'Accept': 'application/json, text/plain, */*'
         }
       };

       utils$2.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
         defaults.headers[method] = {};
       });

       utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
         defaults.headers[method] = utils$2.merge(DEFAULT_CONTENT_TYPE);
       });

       module.exports = defaults;

       var defaults$1 = /*#__PURE__*/Object.freeze({

       });

       function InterceptorManager() {
         this.handlers = [];
       }

       /**
        * Add a new interceptor to the stack
        *
        * @param {Function} fulfilled The function to handle `then` for a `Promise`
        * @param {Function} rejected The function to handle `reject` for a `Promise`
        *
        * @return {Number} An ID used to remove interceptor later
        */
       InterceptorManager.prototype.use = function use(fulfilled, rejected) {
         this.handlers.push({
           fulfilled: fulfilled,
           rejected: rejected
         });
         return this.handlers.length - 1;
       };

       /**
        * Remove an interceptor from the stack
        *
        * @param {Number} id The ID that was returned by `use`
        */
       InterceptorManager.prototype.eject = function eject(id) {
         if (this.handlers[id]) {
           this.handlers[id] = null;
         }
       };

       /**
        * Iterate over all the registered interceptors
        *
        * This method is particularly useful for skipping over any
        * interceptors that may have become `null` calling `eject`.
        *
        * @param {Function} fn The function to call for each interceptor
        */
       InterceptorManager.prototype.forEach = function forEach(fn) {
         utils$1.forEach(this.handlers, function forEachHandler(h) {
           if (h !== null) {
             fn(h);
           }
         });
       };

       var InterceptorManager_1 = InterceptorManager;

       /**
        * Transform the data for a request or a response
        *
        * @param {Object|String} data The data to be transformed
        * @param {Array} headers The headers for the request or response
        * @param {Array|Function} fns A single function or Array of functions
        * @returns {*} The resulting transformed data
        */
       var transformData = function transformData(data, headers, fns) {
         /*eslint no-param-reassign:0*/
         utils$1.forEach(fns, function transform(fn) {
           data = fn(data, headers);
         });

         return data;
       };

       var isCancel = function isCancel(value) {
         return !!(value && value.__CANCEL__);
       };

       /**
        * Determines whether the specified URL is absolute
        *
        * @param {string} url The URL to test
        * @returns {boolean} True if the specified URL is absolute, otherwise false
        */
       var isAbsoluteURL = function isAbsoluteURL(url) {
         // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
         // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
         // by any combination of letters, digits, plus, period, or hyphen.
         return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
       };

       /**
        * Creates a new URL by combining the specified URLs
        *
        * @param {string} baseURL The base URL
        * @param {string} relativeURL The relative URL
        * @returns {string} The combined URL
        */
       var combineURLs = function combineURLs(baseURL, relativeURL) {
         return relativeURL
           ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
           : baseURL;
       };

       /**
        * Throws a `Cancel` if cancellation has been requested.
        */
       function throwIfCancellationRequested(config) {
         if (config.cancelToken) {
           config.cancelToken.throwIfRequested();
         }
       }

       /**
        * Dispatch a request to the server using the configured adapter.
        *
        * @param {object} config The config that is to be used for the request
        * @returns {Promise} The Promise to be fulfilled
        */
       var dispatchRequest = function dispatchRequest(config) {
         throwIfCancellationRequested(config);

         // Support baseURL config
         if (config.baseURL && !isAbsoluteURL(config.url)) {
           config.url = combineURLs(config.baseURL, config.url);
         }

         // Ensure headers exist
         config.headers = config.headers || {};

         // Transform request data
         config.data = transformData(
           config.data,
           config.headers,
           config.transformRequest
         );

         // Flatten headers
         config.headers = utils$1.merge(
           config.headers.common || {},
           config.headers[config.method] || {},
           config.headers || {}
         );

         utils$1.forEach(
           ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
           function cleanHeaderConfig(method) {
             delete config.headers[method];
           }
         );

         var adapter = config.adapter || defaults$1.adapter;

         return adapter(config).then(function onAdapterResolution(response) {
           throwIfCancellationRequested(config);

           // Transform response data
           response.data = transformData(
             response.data,
             response.headers,
             config.transformResponse
           );

           return response;
         }, function onAdapterRejection(reason) {
           if (!isCancel(reason)) {
             throwIfCancellationRequested(config);

             // Transform response data
             if (reason && reason.response) {
               reason.response.data = transformData(
                 reason.response.data,
                 reason.response.headers,
                 config.transformResponse
               );
             }
           }

           return Promise.reject(reason);
         });
       };

       /**
        * Create a new instance of Axios
        *
        * @param {Object} instanceConfig The default config for the instance
        */
       function Axios(instanceConfig) {
         this.defaults = instanceConfig;
         this.interceptors = {
           request: new InterceptorManager_1(),
           response: new InterceptorManager_1()
         };
       }

       /**
        * Dispatch a request
        *
        * @param {Object} config The config specific for this request (merged with this.defaults)
        */
       Axios.prototype.request = function request(config) {
         /*eslint no-param-reassign:0*/
         // Allow for axios('example/url'[, config]) a la fetch API
         if (typeof config === 'string') {
           config = utils$1.merge({
             url: arguments[0]
           }, arguments[1]);
         }

         config = utils$1.merge(defaults$1, {method: 'get'}, this.defaults, config);
         config.method = config.method.toLowerCase();

         // Hook up interceptors middleware
         var chain = [dispatchRequest, undefined];
         var promise = Promise.resolve(config);

         this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
           chain.unshift(interceptor.fulfilled, interceptor.rejected);
         });

         this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
           chain.push(interceptor.fulfilled, interceptor.rejected);
         });

         while (chain.length) {
           promise = promise.then(chain.shift(), chain.shift());
         }

         return promise;
       };

       // Provide aliases for supported request methods
       utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
         /*eslint func-names:0*/
         Axios.prototype[method] = function(url, config) {
           return this.request(utils$1.merge(config || {}, {
             method: method,
             url: url
           }));
         };
       });

       utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
         /*eslint func-names:0*/
         Axios.prototype[method] = function(url, data, config) {
           return this.request(utils$1.merge(config || {}, {
             method: method,
             url: url,
             data: data
           }));
         };
       });

       var Axios_1 = Axios;

       /**
        * A `Cancel` is an object that is thrown when an operation is canceled.
        *
        * @class
        * @param {string=} message The message.
        */
       function Cancel(message) {
         this.message = message;
       }

       Cancel.prototype.toString = function toString() {
         return 'Cancel' + (this.message ? ': ' + this.message : '');
       };

       Cancel.prototype.__CANCEL__ = true;

       var Cancel_1 = Cancel;

       /**
        * A `CancelToken` is an object that can be used to request cancellation of an operation.
        *
        * @class
        * @param {Function} executor The executor function.
        */
       function CancelToken(executor) {
         if (typeof executor !== 'function') {
           throw new TypeError('executor must be a function.');
         }

         var resolvePromise;
         this.promise = new Promise(function promiseExecutor(resolve) {
           resolvePromise = resolve;
         });

         var token = this;
         executor(function cancel(message) {
           if (token.reason) {
             // Cancellation has already been requested
             return;
           }

           token.reason = new Cancel_1(message);
           resolvePromise(token.reason);
         });
       }

       /**
        * Throws a `Cancel` if cancellation has been requested.
        */
       CancelToken.prototype.throwIfRequested = function throwIfRequested() {
         if (this.reason) {
           throw this.reason;
         }
       };

       /**
        * Returns an object that contains a new `CancelToken` and a function that, when called,
        * cancels the `CancelToken`.
        */
       CancelToken.source = function source() {
         var cancel;
         var token = new CancelToken(function executor(c) {
           cancel = c;
         });
         return {
           token: token,
           cancel: cancel
         };
       };

       var CancelToken_1 = CancelToken;

       /**
        * Syntactic sugar for invoking a function and expanding an array for arguments.
        *
        * Common use case would be to use `Function.prototype.apply`.
        *
        *  ```js
        *  function f(x, y, z) {}
        *  var args = [1, 2, 3];
        *  f.apply(null, args);
        *  ```
        *
        * With `spread` this example can be re-written.
        *
        *  ```js
        *  spread(function(x, y, z) {})([1, 2, 3]);
        *  ```
        *
        * @param {Function} callback
        * @returns {Function}
        */
       var spread = function spread(callback) {
         return function wrap(arr) {
           return callback.apply(null, arr);
         };
       };

       /**
        * Create an instance of Axios
        *
        * @param {Object} defaultConfig The default config for the instance
        * @return {Axios} A new instance of Axios
        */
       function createInstance(defaultConfig) {
         var context = new Axios_1(defaultConfig);
         var instance = bind$1(Axios_1.prototype.request, context);

         // Copy axios.prototype to instance
         utils$1.extend(instance, Axios_1.prototype, context);

         // Copy context to instance
         utils$1.extend(instance, context);

         return instance;
       }

       // Create the default instance to be exported
       var axios = createInstance(defaults$1);

       // Expose Axios class to allow class inheritance
       axios.Axios = Axios_1;

       // Factory for creating new instances
       axios.create = function create(instanceConfig) {
         return createInstance(utils$1.merge(defaults$1, instanceConfig));
       };

       // Expose Cancel & CancelToken
       axios.Cancel = Cancel_1;
       axios.CancelToken = CancelToken_1;
       axios.isCancel = isCancel;

       // Expose all/spread
       axios.all = function all(promises) {
         return Promise.all(promises);
       };
       axios.spread = spread;

       var axios_1 = axios;

       // Allow use of default import syntax in TypeScript
       var default_1 = axios;
       axios_1.default = default_1;

       var axios$1 = axios_1;

       var safeBuffer = createCommonjsModule(function (module, exports) {
       /* eslint-disable node/no-deprecated-api */

       var Buffer = bufferEs6.Buffer;

       // alternative to using Object.keys for old browsers
       function copyProps (src, dst) {
         for (var key in src) {
           dst[key] = src[key];
         }
       }
       if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
         module.exports = bufferEs6;
       } else {
         // Copy properties from require('buffer')
         copyProps(bufferEs6, exports);
         exports.Buffer = SafeBuffer;
       }

       function SafeBuffer (arg, encodingOrOffset, length) {
         return Buffer(arg, encodingOrOffset, length)
       }

       // Copy static methods from Buffer
       copyProps(Buffer, SafeBuffer);

       SafeBuffer.from = function (arg, encodingOrOffset, length) {
         if (typeof arg === 'number') {
           throw new TypeError('Argument must not be a number')
         }
         return Buffer(arg, encodingOrOffset, length)
       };

       SafeBuffer.alloc = function (size, fill, encoding) {
         if (typeof size !== 'number') {
           throw new TypeError('Argument must be a number')
         }
         var buf = Buffer(size);
         if (fill !== undefined) {
           if (typeof encoding === 'string') {
             buf.fill(fill, encoding);
           } else {
             buf.fill(fill);
           }
         } else {
           buf.fill(0);
         }
         return buf
       };

       SafeBuffer.allocUnsafe = function (size) {
         if (typeof size !== 'number') {
           throw new TypeError('Argument must be a number')
         }
         return Buffer(size)
       };

       SafeBuffer.allocUnsafeSlow = function (size) {
         if (typeof size !== 'number') {
           throw new TypeError('Argument must be a number')
         }
         return bufferEs6.SlowBuffer(size)
       };
       });
       var safeBuffer_1 = safeBuffer.Buffer;

       // base-x encoding
       // Forked from https://github.com/cryptocoinjs/bs58
       // Originally written by Mike Hearn for BitcoinJ
       // Copyright (c) 2011 Google Inc
       // Ported to JavaScript by Stefan Thomas
       // Merged Buffer refactorings from base58-native by Stephen Pair
       // Copyright (c) 2013 BitPay Inc

       var Buffer$2 = safeBuffer.Buffer;

       var baseX = function base (ALPHABET) {
         var ALPHABET_MAP = {};
         var BASE = ALPHABET.length;
         var LEADER = ALPHABET.charAt(0);

         // pre-compute lookup table
         for (var z = 0; z < ALPHABET.length; z++) {
           var x = ALPHABET.charAt(z);

           if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
           ALPHABET_MAP[x] = z;
         }

         function encode (source) {
           if (source.length === 0) return ''

           var digits = [0];
           for (var i = 0; i < source.length; ++i) {
             for (var j = 0, carry = source[i]; j < digits.length; ++j) {
               carry += digits[j] << 8;
               digits[j] = carry % BASE;
               carry = (carry / BASE) | 0;
             }

             while (carry > 0) {
               digits.push(carry % BASE);
               carry = (carry / BASE) | 0;
             }
           }

           var string = '';

           // deal with leading zeros
           for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER;
           // convert digits to a string
           for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

           return string
         }

         function decodeUnsafe (string) {
           if (typeof string !== 'string') throw new TypeError('Expected String')
           if (string.length === 0) return Buffer$2.allocUnsafe(0)

           var bytes = [0];
           for (var i = 0; i < string.length; i++) {
             var value = ALPHABET_MAP[string[i]];
             if (value === undefined) return

             for (var j = 0, carry = value; j < bytes.length; ++j) {
               carry += bytes[j] * BASE;
               bytes[j] = carry & 0xff;
               carry >>= 8;
             }

             while (carry > 0) {
               bytes.push(carry & 0xff);
               carry >>= 8;
             }
           }

           // deal with leading zeros
           for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
             bytes.push(0);
           }

           return Buffer$2.from(bytes.reverse())
         }

         function decode (string) {
           var buffer = decodeUnsafe(string);
           if (buffer) return buffer

           throw new Error('Non-base' + BASE + ' character')
         }

         return {
           encode: encode,
           decodeUnsafe: decodeUnsafe,
           decode: decode
         }
       };

       var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

       var bs58 = baseX(ALPHABET);

       var SV_ENS_Resolver_abi = [{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"setText","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentTypes","type":"uint256"}],"name":"ABI","outputs":[{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"name":"setPubkey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"}],"name":"text","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"name":"setABI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes32"}],"name":"setContent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"pubkey","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"addr","type":"address"}],"name":"setAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"ensAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"a","type":"address"}],"name":"AddrChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes32"}],"name":"ContentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"contentType","type":"uint256"}],"name":"ABIChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"y","type":"bytes32"}],"name":"PubkeyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"indexedKey","type":"string"},{"indexed":false,"name":"key","type":"string"}],"name":"TextChanged","type":"event"}];

       var ResolverAbi = /*#__PURE__*/Object.freeze({
              default: SV_ENS_Resolver_abi
       });

       var SVLightIndex_abi = [{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"catId","type":"uint256"}],"name":"dDeprecateCategory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVersion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"bbFarmId","type":"uint8"}],"name":"getBBFarm","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"bbFarmId","type":"uint8"},{"name":"_bbFarm","type":"address"}],"name":"deprecateBBFarm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"enabled","type":"bool"}],"name":"dSetCommunityBallotsEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"catName","type":"bytes32"},{"name":"hasParent","type":"bool"},{"name":"parent","type":"uint256"}],"name":"dAddCategory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"specHash","type":"bytes32"},{"name":"extraData","type":"bytes32"},{"name":"packed","type":"uint256"}],"name":"dDeployBallot","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"nextSC","type":"address"}],"name":"doUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"setDNoEditors","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"payoutAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"bbFarm","type":"address"}],"name":"addBBFarm","outputs":[{"name":"bbFarmId","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBackend","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ensOwnerPx","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"dDisableErc20OwnerClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"dDowngradeToBasic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"key","type":"bytes"},{"name":"value","type":"bytes"}],"name":"dSetArbitraryData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"dOwnerErc20Claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toSet","type":"bytes32"},{"name":"newSC","type":"address"}],"name":"setABackend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUpgradePointer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"specHash","type":"bytes32"},{"name":"extraData","type":"bytes32"},{"name":"packedTimes","type":"uint128"}],"name":"dDeployCommunityBallot","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPayments","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"bbNamespace","type":"bytes4"}],"name":"getBBFarmID","outputs":[{"name":"bbFarmId","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"newOwner","type":"address"}],"name":"setDOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"ballotId","type":"uint256"},{"name":"packed","type":"uint256"}],"name":"dAddBallot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"dUpgradeToPremium","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"defaultErc20","type":"address"},{"name":"disableErc20OwnerClaim","type":"bool"}],"name":"dInit","outputs":[{"name":"","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getCommAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"newErc20","type":"address"}],"name":"setDErc20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"editor","type":"address"},{"name":"canEdit","type":"bool"}],"name":"setDEditor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_b","type":"address"},{"name":"_pay","type":"address"},{"name":"_ensOwnerPx","type":"address"},{"name":"_bbFarm0","type":"address"},{"name":"_commAuction","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"payTo","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"PayoutAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"valAndRemainder","type":"uint256[2]"}],"name":"PaymentMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bbFarmId","type":"uint8"}],"name":"AddedBBFarm","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"setWhat","type":"bytes32"},{"indexed":false,"name":"newSC","type":"address"}],"name":"SetBackend","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bbFarmId","type":"uint8"}],"name":"DeprecatedBBFarm","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"ballotId","type":"uint256"}],"name":"CommunityBallot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"ballotId","type":"uint256"},{"indexed":false,"name":"packed","type":"uint256"}],"name":"ManuallyAddedBallot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ballotId","type":"uint256"}],"name":"BallotCreatedWithID","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"namespace","type":"bytes4"}],"name":"BBFarmInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"}],"name":"NewDemoc","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"erc20","type":"address"}],"name":"ManuallyAddedDemoc","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"ballotN","type":"uint256"}],"name":"NewBallot","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"DemocOwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"editor","type":"address"},{"indexed":false,"name":"canEdit","type":"bool"}],"name":"DemocEditorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"DemocEditorsWiped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"erc20","type":"address"}],"name":"DemocErc20Set","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"keyHash","type":"bytes32"}],"name":"DemocDataSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"catId","type":"uint256"}],"name":"DemocCatAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"catId","type":"uint256"}],"name":"DemocCatDeprecated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"enabled","type":"bool"}],"name":"DemocCommunityBallotsEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"DemocErc20OwnerClaimDisabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"DemocClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"EmergencyDemocOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"UpgradedToPremium","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"additionalSeconds","type":"uint256"},{"indexed":false,"name":"ref","type":"bytes32"}],"name":"GrantedAccountTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"additionalSeconds","type":"uint256"}],"name":"AccountPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetCommunityBallotFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetBasicCentsPricePer30Days","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"multiplier","type":"uint8"}],"name":"SetPremiumMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"DowngradeToBasic","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"UpgradeToPremium","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"weiPerCent","type":"uint256"}],"name":"SetExchangeRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"}],"name":"FreeExtension","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetBallotsPer30Days","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"hasFreeExt","type":"bool"}],"name":"SetFreeExtension","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"isPremiumDenied","type":"bool"}],"name":"SetDenyPremium","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"payTo","type":"address"}],"name":"SetPayTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minorEditsAddr","type":"address"}],"name":"SetMinorEditsAddr","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetMinWeiForDInit","type":"event"}];

       var IndexAbi = /*#__PURE__*/Object.freeze({
              default: SVLightIndex_abi
       });

       var SVLightIndexBackend_abi = [
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDCategoriesN",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "catId",
                   "type": "uint256"
               }],
               "name": "dDeprecateCategory",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "getVersion",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "pure",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "erc20",
                   "type": "address"
               },
               {
                   "name": "disableErc20OwnerClaim",
                   "type": "bool"
               }],
               "name": "dAdd",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [],
               "name": "doLockdown",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "newOwner",
                   "type": "address"
               }],
               "name": "setOwner",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "id",
                   "type": "uint256"
               }],
               "name": "getGDemoc",
               "outputs": [
               {
                   "name": "",
                   "type": "bytes32"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "a",
                   "type": "address"
               }],
               "name": "hasPermissions",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "n",
                   "type": "uint256"
               }],
               "name": "getAdminLog",
               "outputs": [
               {
                   "name": "",
                   "type": "address"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "a",
                   "type": "address"
               }],
               "name": "isAdmin",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "enabled",
                   "type": "bool"
               }],
               "name": "dSetCommunityBallotsEnabled",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "catId",
                   "type": "uint256"
               }],
               "name": "getDCategory",
               "outputs": [
               {
                   "name": "deprecated",
                   "type": "bool"
               },
               {
                   "name": "name",
                   "type": "bytes32"
               },
               {
                   "name": "hasParent",
                   "type": "bool"
               },
               {
                   "name": "parent",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "name",
                   "type": "bytes32"
               },
               {
                   "name": "hasParent",
                   "type": "bool"
               },
               {
                   "name": "parent",
                   "type": "uint256"
               }],
               "name": "dAddCategory",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "currAdminEpoch",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "getAdminLogN",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [],
               "name": "incAdminEpoch",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "a",
                   "type": "address"
               },
               {
                   "name": "_givePerms",
                   "type": "bool"
               }],
               "name": "setAdmin",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "setDNoEditors",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [],
               "name": "payoutAll",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "newSC",
                   "type": "address"
               }],
               "name": "upgradeMe",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "adminsDisabledForever",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDErc20",
               "outputs": [
               {
                   "name": "",
                   "type": "address"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "prefix",
                   "type": "bytes13"
               }],
               "name": "getDHash",
               "outputs": [
               {
                   "name": "",
                   "type": "bytes32"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "e",
                   "type": "address"
               },
               {
                   "name": "_editPerms",
                   "type": "bool"
               }],
               "name": "setPermissions",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "n",
                   "type": "uint256"
               }],
               "name": "getDCountedBasicBallotID",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDCommBallotsEnabled",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDOwner",
               "outputs": [
               {
                   "name": "",
                   "type": "address"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "key",
                   "type": "bytes"
               }],
               "name": "getDEditorArbitraryData",
               "outputs": [
               {
                   "name": "",
                   "type": "bytes"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "dDisableErc20OwnerClaim",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "adminLockdown",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "newAdmin",
                   "type": "address"
               }],
               "name": "upgradeMeAdmin",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDErc20OwnerClaimEnabled",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDBallotsN",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "owner",
               "outputs": [
               {
                   "name": "",
                   "type": "address"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "key",
                   "type": "bytes"
               },
               {
                   "name": "value",
                   "type": "bytes"
               }],
               "name": "dSetArbitraryData",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "ballotId",
                   "type": "uint256"
               },
               {
                   "name": "packed",
                   "type": "uint256"
               },
               {
                   "name": "countTowardsLimit",
                   "type": "bool"
               }],
               "name": "dAddBallot",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "key",
                   "type": "bytes"
               },
               {
                   "name": "value",
                   "type": "bytes"
               }],
               "name": "dSetEditorArbitraryData",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "oldSC",
                   "type": "address"
               },
               {
                   "name": "newSC",
                   "type": "address"
               }],
               "name": "upgradePermissionedSC",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "getGDemocsN",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "erc20",
                   "type": "address"
               }],
               "name": "getGErc20ToDemocs",
               "outputs": [
               {
                   "name": "democHashes",
                   "type": "bytes32[]"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "defaultErc20",
                   "type": "address"
               },
               {
                   "name": "initOwner",
                   "type": "address"
               },
               {
                   "name": "disableErc20OwnerClaim",
                   "type": "bool"
               }],
               "name": "dInit",
               "outputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDInfo",
               "outputs": [
               {
                   "name": "erc20",
                   "type": "address"
               },
               {
                   "name": "owner",
                   "type": "address"
               },
               {
                   "name": "nBallots",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "newOwner",
                   "type": "address"
               }],
               "name": "setDOwner",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "n",
                   "type": "uint256"
               }],
               "name": "getDBallotID",
               "outputs": [
               {
                   "name": "ballotId",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "editor",
                   "type": "address"
               }],
               "name": "isDEditor",
               "outputs": [
               {
                   "name": "",
                   "type": "bool"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "newErc20",
                   "type": "address"
               }],
               "name": "setDErc20",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "getDCountedBasicBallotsN",
               "outputs": [
               {
                   "name": "",
                   "type": "uint256"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "editor",
                   "type": "address"
               },
               {
                   "name": "canEdit",
                   "type": "bool"
               }],
               "name": "setDEditor",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "key",
                   "type": "bytes"
               }],
               "name": "getDArbitraryData",
               "outputs": [
               {
                   "name": "",
                   "type": "bytes"
               }],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": false,
               "inputs": [
               {
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "name": "newOwner",
                   "type": "address"
               }],
               "name": "setDOwnerFromClaim",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "inputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "constructor"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "payTo",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "name": "value",
                   "type": "uint256"
               }],
               "name": "PayoutAll",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "editAddr",
                   "type": "address"
               }],
               "name": "PermissionError",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "editAddr",
                   "type": "address"
               }],
               "name": "PermissionGranted",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "editAddr",
                   "type": "address"
               }],
               "name": "PermissionRevoked",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "oldSC",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "name": "newSC",
                   "type": "address"
               }],
               "name": "PermissionsUpgraded",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "oldSC",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "name": "newSC",
                   "type": "address"
               }],
               "name": "SelfUpgrade",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [],
               "name": "AdminLockdown",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "newAdmin",
                   "type": "address"
               }],
               "name": "AdminAdded",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "oldAdmin",
                   "type": "address"
               }],
               "name": "AdminRemoved",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [],
               "name": "AdminEpochInc",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [],
               "name": "AdminDisabledForever",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "newOwner",
                   "type": "address"
               }],
               "name": "OwnerChanged",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "NewDemoc",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": false,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "erc20",
                   "type": "address"
               }],
               "name": "ManuallyAddedDemoc",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "ballotN",
                   "type": "uint256"
               }],
               "name": "NewBallot",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "owner",
                   "type": "address"
               }],
               "name": "DemocOwnerSet",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "editor",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "name": "canEdit",
                   "type": "bool"
               }],
               "name": "DemocEditorSet",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "DemocEditorsWiped",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "erc20",
                   "type": "address"
               }],
               "name": "DemocErc20Set",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "keyHash",
                   "type": "bytes32"
               }],
               "name": "DemocDataSet",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "catId",
                   "type": "uint256"
               }],
               "name": "DemocCatAdded",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "catId",
                   "type": "uint256"
               }],
               "name": "DemocCatDeprecated",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               },
               {
                   "indexed": false,
                   "name": "enabled",
                   "type": "bool"
               }],
               "name": "DemocCommunityBallotsEnabled",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "DemocErc20OwnerClaimDisabled",
               "type": "event"
           },
           {
               "anonymous": false,
               "inputs": [
               {
                   "indexed": true,
                   "name": "democHash",
                   "type": "bytes32"
               }],
               "name": "DemocClaimed",
               "type": "event"
           }];

       var BackendAbi = /*#__PURE__*/Object.freeze({
              default: SVLightIndexBackend_abi
       });

       var SVPayments_abi = [{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"payForDemocracy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"additionalSeconds","type":"uint256"},{"name":"ref","type":"bytes32"}],"name":"giveTimeToDemoc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setBasicCentsPricePer30Days","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCommunityBallotCentsPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"doLockdown","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"getDenyPremium","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"emergencySetOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minorEditsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"c","type":"uint256"}],"name":"centsToWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"address"}],"name":"hasPermissions","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getAdminLog","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"address"}],"name":"isAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"isPremiumDenied","type":"bool"}],"name":"setDenyPremium","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"accountInGoodStanding","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"address"}],"name":"setMinorEditsAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currAdminEpoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"downgradeToBasic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAdminLogN","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"incAdminEpoch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"address"},{"name":"_givePerms","type":"bool"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"payoutAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newSC","type":"address"}],"name":"upgradeMe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBasicBallotsPer30Days","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminsDisabledForever","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCommunityBallotWeiPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"e","type":"address"},{"name":"_editPerms","type":"bool"}],"name":"setPermissions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newPayTo","type":"address"}],"name":"setPayTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"getFreeExtension","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setCommunityBallotCentsPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPaymentLogN","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"w","type":"uint256"}],"name":"weiToCents","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"emergencyAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"getPremiumStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPremiumMultiplier","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLockdown","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWeiPerCent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"upgradeMeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setBasicBallotsPer30Days","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBasicExtraBallotFeeWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"oldSC","type":"address"},{"name":"newSC","type":"address"}],"name":"upgradePermissionedSC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"},{"name":"hasFreeExt","type":"bool"}],"name":"setFreeExtension","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"upgradeToPremium","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wpc","type":"uint256"}],"name":"setWeiPerCent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"getAccount","outputs":[{"name":"isPremium","type":"bool"},{"name":"lastPaymentTs","type":"uint256"},{"name":"paidUpTill","type":"uint256"},{"name":"hasFreeExtension","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsdEthExchangeRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"m","type":"uint8"}],"name":"setPremiumMultiplier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBasicCentsPricePer30Days","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPremiumCentsPricePer30Days","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"getSecondsRemaining","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPayTo","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"amount","type":"uint256"}],"name":"weiBuysHowManySeconds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPaymentLog","outputs":[{"name":"_external","type":"bool"},{"name":"_democHash","type":"bytes32"},{"name":"_seconds","type":"uint256"},{"name":"_ethValue","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"democHash","type":"bytes32"}],"name":"doFreeExtension","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_emergencyAdmin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"UpgradedToPremium","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"additionalSeconds","type":"uint256"},{"indexed":false,"name":"ref","type":"bytes32"}],"name":"GrantedAccountTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"},{"indexed":false,"name":"additionalSeconds","type":"uint256"}],"name":"AccountPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetCommunityBallotFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"SetBasicCentsPricePer30Days","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"multiplier","type":"uint8"}],"name":"SetPremiumMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"DowngradeToBasic","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"democHash","type":"bytes32"}],"name":"UpgradeToPremium","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"weiPerCent","type":"uint256"}],"name":"SetExchangeRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"democHash","type":"bytes32"}],"name":"FreeExtension","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"editAddr","type":"address"}],"name":"PermissionError","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"editAddr","type":"address"}],"name":"PermissionGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"editAddr","type":"address"}],"name":"PermissionRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldSC","type":"address"},{"indexed":false,"name":"newSC","type":"address"}],"name":"PermissionsUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldSC","type":"address"},{"indexed":false,"name":"newSC","type":"address"}],"name":"SelfUpgrade","type":"event"},{"anonymous":false,"inputs":[],"name":"AdminLockdown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newAdmin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldAdmin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[],"name":"AdminEpochInc","type":"event"},{"anonymous":false,"inputs":[],"name":"AdminDisabledForever","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"}];

       var PaymentsAbi = /*#__PURE__*/Object.freeze({
              default: SVPayments_abi
       });

       var AuxAbi_abi = [
                 {
                   "constant": true,
                   "inputs": [
                     {
                       "name": "ballotId",
                       "type": "uint256"
                     },
                     {
                       "name": "bbFarmAddress",
                       "type": "address"
                     },
                     {
                       "name": "voterAddress",
                       "type": "address"
                     }
                   ],
                   "name": "getBallotDetails",
                   "outputs": [
                     {
                       "name": "hasVoted",
                       "type": "bool"
                     },
                     {
                       "name": "nVotesCast",
                       "type": "uint256"
                     },
                     {
                       "name": "secKey",
                       "type": "bytes32"
                     },
                     {
                       "name": "submissionBits",
                       "type": "uint16"
                     },
                     {
                       "name": "startTime",
                       "type": "uint64"
                     },
                     {
                       "name": "endTime",
                       "type": "uint64"
                     },
                     {
                       "name": "specHash",
                       "type": "bytes32"
                     },
                     {
                       "name": "deprecated",
                       "type": "bool"
                     },
                     {
                       "name": "ballotOwner",
                       "type": "address"
                     },
                     {
                       "name": "extraData",
                       "type": "bytes16"
                     }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
                 },
                 {
                   "constant": true,
                   "inputs": [
                     {
                       "name": "backendAddress",
                       "type": "address"
                     },
                     {
                       "name": "indexAddress",
                       "type": "address"
                     },
                     {
                       "name": "democHash",
                       "type": "bytes32"
                     },
                     {
                       "name": "ballotIndex",
                       "type": "uint256"
                     }
                   ],
                   "name": "getBBFarmAddressAndBallotId",
                   "outputs": [
                     {
                       "name": "bbFarmAddress",
                       "type": "address"
                     },
                     {
                       "name": "id",
                       "type": "uint256"
                     }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
                 }
               ];

       var AuxAbi = /*#__PURE__*/Object.freeze({
              default: AuxAbi_abi
       });

       var _this = undefined;
       // import * as ERC20Abi from './smart_contracts/ERC20.abi.json'
       var initializeSvLight = function (svConfig) { return __awaiter(_this, void 0, void 0, function () {
           var indexContractName, ensResolver, httpProvider, auxContract, Web3, web3, resolver, index, _a, _b, _c, backendAddress, backend, aux, payments, _d, _e, _f;
           return __generator(this, function (_g) {
               switch (_g.label) {
                   case 0:
                       indexContractName = svConfig.indexContractName, ensResolver = svConfig.ensResolver, httpProvider = svConfig.httpProvider, auxContract = svConfig.auxContract;
                       Web3 = require('web3');
                       web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
                       resolver = new web3.eth.Contract(ResolverAbi, ensResolver);
                       _b = (_a = web3.eth.Contract).bind;
                       _c = [void 0, IndexAbi];
                       return [4 /*yield*/, resolveEnsAddress({ resolver: resolver }, indexContractName)];
                   case 1:
                       index = new (_b.apply(_a, _c.concat([_g.sent()])))();
                       return [4 /*yield*/, getBackendAddress({ index: index })];
                   case 2:
                       backendAddress = _g.sent();
                       backend = new web3.eth.Contract(BackendAbi, backendAddress);
                       aux = new web3.eth.Contract(AuxAbi, auxContract);
                       _e = (_d = web3.eth.Contract).bind;
                       _f = [void 0, PaymentsAbi];
                       return [4 /*yield*/, index.methods.getPayments().call()];
                   case 3:
                       payments = new (_e.apply(_d, _f.concat([_g.sent()])))();
                       return [2 /*return*/, {
                               svConfig: svConfig,
                               web3: web3,
                               resolver: resolver,
                               index: index,
                               backend: backend,
                               aux: aux,
                               payments: payments
                           }];
               }
           });
       }); };
       var resolveEnsAddress = function (_a, ensName) {
           var resolver = _a.resolver;
           return __awaiter(_this, void 0, void 0, function () {
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0: return [4 /*yield*/, resolver.methods.addr(undefined(ensName)).call()];
                       case 1: return [2 /*return*/, _b.sent()];
                   }
               });
           });
       };
       var getBackendAddress = function (_a) {
           var index = _a.index;
           return __awaiter(_this, void 0, void 0, function () {
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0: return [4 /*yield*/, index.methods.getBackend().call()];
                       case 1: return [2 /*return*/, _b.sent()];
                   }
               });
           });
       };
       var getDemocInfo = function (_a) {
           var backend = _a.backend, democHash = _a.democHash;
           return __awaiter(_this, void 0, void 0, function () {
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0: return [4 /*yield*/, backend.methods.getDInfo(democHash).call()];
                       case 1: return [2 /*return*/, _b.sent()];
                   }
               });
           });
       };
       var getDemocNthBallot = function (_a, democBallotInfo) {
           var svNetwork = _a.svNetwork;
           return __awaiter(_this, void 0, void 0, function () {
               var index, backend, aux, svConfig, democHash, nthBallot, indexAddress, backendAddress, archiveUrl, bbFarmAndBallotId, id, bbFarmAddress, userEthAddress, ethBallotDetails, ballotSpec, ballotObject;
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0:
                           index = svNetwork.index, backend = svNetwork.backend, aux = svNetwork.aux, svConfig = svNetwork.svConfig;
                           democHash = democBallotInfo.democHash, nthBallot = democBallotInfo.nthBallot;
                           indexAddress = index._address;
                           backendAddress = backend._address;
                           archiveUrl = { svConfig: svConfig };
                           return [4 /*yield*/, aux.methods
                                   .getBBFarmAddressAndBallotId(backendAddress, indexAddress, democHash, nthBallot)
                                   .call()
                               // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);
                           ];
                       case 1:
                           bbFarmAndBallotId = _b.sent();
                           id = bbFarmAndBallotId.id, bbFarmAddress = bbFarmAndBallotId.bbFarmAddress;
                           userEthAddress = '0x0000000000000000000000000000000000000000';
                           return [4 /*yield*/, aux.methods
                                   .getBallotDetails(id, bbFarmAddress, userEthAddress)
                                   .call()];
                       case 2:
                           ethBallotDetails = _b.sent();
                           return [4 /*yield*/, getBallotSpec(archiveUrl, ethBallotDetails.specHash)
                               // console.log('ballotSpec :', ballotSpec);
                               // .then(x => console.log('Then called', x))
                               // .catch(x => console.log('Caught error', x));
                           ];
                       case 3:
                           ballotSpec = _b.sent();
                           ballotObject = __assign({}, bbFarmAndBallotId, ethBallotDetails, { data: __assign({}, ballotSpec.data) });
                           return [2 /*return*/, ballotObject];
                   }
               });
           });
       };
       var getBallotSpec = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
           return __generator(this, function (_a) {
               // TODO refactor to be a bit more elegant
               return [2 /*return*/, new Promise(function (res, rej) {
                       var done = false;
                       var doRes = function (obj) {
                           if (!done) {
                               done = true;
                               res(obj);
                           }
                       };
                       getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
                       setTimeout(function () {
                           if (!done) {
                               getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                                   .then(doRes)
                                   .catch(rej);
                           }
                       }, 3500);
                   })];
           });
       }); };
       var getBallotObjectFromS3 = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
           return __generator(this, function (_a) {
               return [2 /*return*/, axios$1.get(archiveUrl + ballotSpecHash + '.json')];
           });
       }); };
       var getBallotObjectFromIpfs = function (ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
           var ipfsUrl, cidHex, bytes, cid;
           return __generator(this, function (_a) {
               switch (_a.label) {
                   case 0:
                       ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
                       cidHex = '1220' + ballotSpecHash.substr(2);
                       bytes = Buffer.from(cidHex, 'hex');
                       cid = undefined(bytes);
                       return [4 /*yield*/, axios$1.get(ipfsUrl + cid)];
                   case 1: return [2 /*return*/, _a.sent()];
               }
           });
       }); };
       // Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
       var getDemocBallots = function (_a) {
           var svNetwork = _a.svNetwork, democHash = _a.democHash;
           return __awaiter(_this, void 0, void 0, function () {
               var backend, democInfo, erc20, owner, numBallots, ballotsArray, i, _b, _c;
               return __generator(this, function (_d) {
                   switch (_d.label) {
                       case 0:
                           backend = svNetwork.backend;
                           return [4 /*yield*/, getDemocInfo({ backend: backend, democHash: democHash })
                               // Throw an error if the democ info is not correct
                           ];
                       case 1:
                           democInfo = _d.sent();
                           erc20 = democInfo.erc20, owner = democInfo.owner;
                           if (owner === '0x0000000000000000000000000000000000000000') {
                               throw new Error('Democracy Hash does not resolve to a democracy');
                           }
                           numBallots = democInfo.nBallots;
                           ballotsArray = [];
                           i = 0;
                           _d.label = 2;
                       case 2:
                           if (!(i < numBallots)) return [3 /*break*/, 5];
                           _b = ballotsArray;
                           _c = i;
                           return [4 /*yield*/, getDemocNthBallot({ svNetwork: svNetwork }, { democHash: democHash, nthBallot: i })];
                       case 3:
                           _b[_c] = _d.sent();
                           _d.label = 4;
                       case 4:
                           i++;
                           return [3 /*break*/, 2];
                       case 5: return [2 /*return*/, ballotsArray];
                   }
               });
           });
       };
       /** Takes in the svNetwork object and returns all relevant addresses */
       var getContractAddresses = function (_a) {
           var svNetwork = _a.svNetwork;
           return __awaiter(_this, void 0, void 0, function () {
               var index, resolver, backend, aux, svConfig, delegationContractName, lookupAddress, _b;
               return __generator(this, function (_c) {
                   switch (_c.label) {
                       case 0:
                           index = svNetwork.index, resolver = svNetwork.resolver, backend = svNetwork.backend, aux = svNetwork.aux, svConfig = svNetwork.svConfig;
                           delegationContractName = svConfig.delegationContractName, lookupAddress = svConfig.lookupAddress;
                           _b = {
                               indexAddress: index._address,
                               backendAddress: backend._address,
                               auxAddress: aux._address,
                               lookupAddress: lookupAddress,
                               resolverAddress: resolver._address
                           };
                           return [4 /*yield*/, index.methods.getCommAuction().call()];
                       case 1:
                           _b.communityAuctionAddress = _c.sent();
                           return [4 /*yield*/, resolveEnsAddress({ resolver: resolver }, delegationContractName)];
                       case 2:
                           _b.delegationAddress = _c.sent();
                           return [4 /*yield*/, index.methods.getPayments().call()];
                       case 3: return [2 /*return*/, (_b.paymentsAddress = _c.sent(),
                               _b)];
                   }
               });
           });
       };
       var weiToCents = function (_a, wei) {
           var payments = _a.payments;
           return __awaiter(_this, void 0, void 0, function () {
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0: return [4 /*yield*/, payments.methods.weiToCents(wei).call()];
                       case 1: return [2 /*return*/, _b.sent()];
                   }
               });
           });
       };
       var getCommunityBallotPrice = function (_a, democHash) {
           var payments = _a.payments;
           return __awaiter(_this, void 0, void 0, function () {
               return __generator(this, function (_b) {
                   switch (_b.label) {
                       case 0: return [4 /*yield*/, payments.methods.getNextPrice(democHash).call()];
                       case 1: return [2 /*return*/, _b.sent()];
                   }
               });
           });
       };
       var checkIfAddressIsEditor = function (_a, _b) {
           var svNetwork = _a.svNetwork;
           var userAddress = _b.userAddress, democHash = _b.democHash;
           return __awaiter(_this, void 0, void 0, function () {
               var backend;
               return __generator(this, function (_c) {
                   switch (_c.label) {
                       case 0:
                           backend = svNetwork.backend;
                           return [4 /*yield*/, backend.methods.isDEditor(democHash, userAddress).call()];
                       case 1: return [2 /*return*/, _c.sent()];
                   }
               });
           });
       };
       // Checks the current ethereum gas price and returns a couple of values
       var getCurrentGasPrice = function () { return __awaiter(_this, void 0, void 0, function () {
           var gasStationInfo, data;
           return __generator(this, function (_a) {
               switch (_a.label) {
                   case 0: return [4 /*yield*/, axios$1.get('https://ethgasstation.info/json/ethgasAPI.json')];
                   case 1:
                       gasStationInfo = _a.sent();
                       data = gasStationInfo.data;
                       return [2 /*return*/, {
                               safeLow: data.safeLow / 10,
                               average: data.average / 10,
                               fast: data.fast / 10,
                               fastest: data.fastest / 10
                           }];
               }
           });
       }); };
       /**
        * Verify a BallotSpec's hash
        *
        * @param {*} rawBallotSpecString The raw string/bytes before JSON.parse
        * @param {*} expectedSpecHash The expected hash as Eth Hex
        *
        * @returns {boolean} Whether the ballotSpec matched the expected hash
        */
       var checkBallotHashBSpec = function (rawBallotSpecString, expectedSpecHash) {
           throw Error('Unimplemented (check code for details)');
           // NOTE: This function is unsafe - JSON does not have deterministic key order
           // a ballotSpec object is not suitable to verify the hash; you need the _raw_
           // string before it is parsed to JSON
           // Original function
           // let contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2))
           // if (assertSpecHash === contentHash) {
           //   return true
           // } else {
           //   return false
           // }
       };
       // Checks the ballot hash against a ballot global ballot object
       // Does this by destructuring the specHash and data out of it
       var checkBallotHashGBallot = function (ballotObject) {
           var data = ballotObject.data, specHash = ballotObject.specHash;
           return checkBallotHashBSpec(data, specHash);
       };

       var light = /*#__PURE__*/Object.freeze({
              initializeSvLight: initializeSvLight,
              resolveEnsAddress: resolveEnsAddress,
              getBackendAddress: getBackendAddress,
              getDemocInfo: getDemocInfo,
              getDemocNthBallot: getDemocNthBallot,
              getBallotSpec: getBallotSpec,
              getBallotObjectFromS3: getBallotObjectFromS3,
              getBallotObjectFromIpfs: getBallotObjectFromIpfs,
              getDemocBallots: getDemocBallots,
              getContractAddresses: getContractAddresses,
              weiToCents: weiToCents,
              getCommunityBallotPrice: getCommunityBallotPrice,
              checkIfAddressIsEditor: checkIfAddressIsEditor,
              getCurrentGasPrice: getCurrentGasPrice,
              checkBallotHashBSpec: checkBallotHashBSpec,
              checkBallotHashGBallot: checkBallotHashGBallot
       });

       /**
        * This will take an Ethereum hex string (or a normal hex string) and
        * output a normal hex string (no '0x' header) or throw an error on a
        * bad hex string.
        *
        * @param {string} hex
        *
        * @returns {string}
        *  the hex string.
        */
       var cleanEthHex = function (hex) {
           if (hex === '0x0') {
               return '00';
           }
           // hex must be even - only exception above
           if (hex.length % 2 !== 0) {
               throw Error("Bad hex string: " + hex);
           }
           // this covers the case hex=="0x" => ""
           if (hex.slice(0, 2) === '0x') {
               return hex.slice(2);
           }
           return hex;
       };
       /**
        * This compares ethereum addresses (taking into account case, etc)
        *
        * @param {string} addr1
        * @param {string} addr2
        *
        * @returns {bool}
        */
       var ethAddrEq = function (addr1, addr2) {
           var _clean = function (a) { return module.exports.cleanEthHex(a).toLowerCase(); };
           // throw a length check in there to ensure we have valid addresses
           return _clean(addr1) === _clean(addr2) && addr1.length === 42;
       };
       // this is from the bech32 spec (Bitcoin)
       var B32_ALPHA = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
       var toAlphabet = function (arr) {
           var ret = '';
           for (var i = 0; i < arr.length; i++) {
               ret += B32_ALPHA.charAt(arr[i]);
           }
           return ret;
       };
       /**
        * This will convert a hex string to Base32 in the bech32 format WITHOUT a checksum.
        *
        * @param {string} hex
        *  The hex string to convert to Base32 - can be an EthHex or plain hex string.
        *
        * @returns {string}
        *  The Base32 version of the hex string.
        */
       var hexToBase32 = function (hex) {
           var _hex = cleanEthHex(hex);
           var buf = Buffer.from(_hex, 'hex');
           var digits = [0];
           var digitlength = 1;
           var carry;
           for (var i = 0; i < buf.length; ++i) {
               carry = buf[i];
               for (var j = 0; j < digitlength; ++j) {
                   carry += digits[j] * 256;
                   digits[j] = carry % 32;
                   carry = (carry / 32) | 0;
               }
               while (carry > 0) {
                   digits[digitlength] = carry % 32;
                   digitlength++;
                   carry = (carry / 32) | 0;
               }
           }
           return toAlphabet(reverse(digits.slice(0, digitlength)));
       };

       var utils$3 = /*#__PURE__*/Object.freeze({
              cleanEthHex: cleanEthHex,
              ethAddrEq: ethAddrEq,
              hexToBase32: hexToBase32
       });

       var index = { ballotBox: ballotBox, crypto: crypto$1, light: light, utils: utils$3, const: _const };

       return index;

})));
//# sourceMappingURL=bundle.umd.js.map
