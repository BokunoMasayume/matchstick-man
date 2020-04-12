/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _require = __webpack_require__(/*! ./lib/parse */ \"./lib/parse.js\"),\n    parse = _require.parse,\n    reparse = _require.reparse;\n\nvar generateMotion = __webpack_require__(/*! ./lib/generateMotion */ \"./lib/generateMotion.js\");\n\nvar getOrigin = __webpack_require__(/*! ./lib/getOrigin */ \"./lib/getOrigin.js\");\n\nvar attach = __webpack_require__(/*! ./lib/events */ \"./lib/events.js\");\n\nvar resetTransform = __webpack_require__(/*! ./lib/reset */ \"./lib/reset.js\");\n\nvar gf = __webpack_require__(/*! ./lib/getFrame */ \"./lib/getFrame.js\");\n\nvar _require2 = __webpack_require__(/*! ./lib/util */ \"./lib/util.js\"),\n    parseFinder = _require2.parseFinder,\n    getPathType = _require2.getPathType,\n    hasChildNode = _require2.hasChildNode;\n\nvar Matchstick = /*#__PURE__*/function () {\n  /**\r\n   * \r\n   * @constructor\r\n   * @param {Array} obj - object build message\r\n   *  - eles  - {Object[]|Object} - elements in the group \r\n   *  - trans - {String[]|String} - transforms for this group\r\n   *  - subs  - Array subgroups\r\n   * @param {{tagName:{attrname:String}}} defaults\r\n   */\n  function Matchstick(stickObj, defaults, className) {\n    _classCallCheck(this, Matchstick);\n\n    this.use(defaults); //generate this.body\n\n    this.parseBody(stickObj, className);\n    this.motions = new Set();\n  }\n  /**\r\n   * set default value to attribute of specific tag\r\n   * @param {{tagName:{attr:string}}} opt \r\n   * @param {{clean:boolean}} optopt - options\r\n   *  - clean : defalut false ,clean all other default values of all other tagnanes\r\n   *  - cover:  default false, clean all other default values of specifced tag in opt\r\n   * @example\r\n   * this.use({\r\n   *      line:{\r\n   *          'stroke-width':10\r\n   *      }\r\n   * },{\r\n   *  clean:true\r\n   * })\r\n   */\n\n\n  _createClass(Matchstick, [{\n    key: \"use\",\n    value: function use(opt, optopt) {\n      var _this = this;\n\n      if (!opt) return;\n\n      if (!(opt instanceof Object)) {\n        console.warn(\"optoins in Matchstick.use must be a object,but is \", opt);\n        return;\n      }\n\n      if (!optopt) optopt = {};\n      var clean = optopt.clean || false;\n      var cover = optopt.cover || false;\n\n      if (!(this.defaultes instanceof Object) || clean) {\n        this.defaultes = {};\n      }\n\n      Object.keys(opt).forEach(function (tag) {\n        if (cover || !_this.defaultes[tag]) {\n          _this.defaultes[tag] = {};\n        }\n\n        Object.assign(_this.defaultes[tag], opt[tag]);\n      });\n      return this;\n    }\n    /**\r\n     * parse body obj \r\n     * @param {Array} obj - object build message\r\n     *  - eles  - {Object[]|Object} - elements in the group \r\n     *  - trans - {String[]|String} - transforms for this group\r\n     *  - subs  - Array subgroups\r\n     * @param {String} className - class name attach to this.body.group\r\n     */\n\n  }, {\n    key: \"parseBody\",\n    value: function parseBody(obj, className) {\n      this.body = parse(obj, this.defaultes, className);\n      return this;\n    } //\n\n    /**\r\n     * remove all animite related to className's tags \r\n     * e.g. animateTransform.walk animate.walk\r\n     * @param {String} className \r\n     *  - not set clean all animate tags\r\n     *  - e.g. className = walk clean animateTransform.walk animate.walk ..\r\n     */\n\n  }, {\n    key: \"cleanAnims\",\n    value: function cleanAnims(className) {\n      this.body.group.querySelectorAll(className).forEach(function (ele) {\n        if (ele instanceof SVGSetElement || ele instanceof SVGAnimateElement || ele instanceof SVGAnimateTransformElement || ele instanceof SVGAnimateColorElement || ele instanceof SVGAnimateMotionElement) {\n          ele.parentNode.removeChild(ele);\n        }\n      });\n      return this;\n    } //invoke cleanAnimas\n\n  }, {\n    key: \"cancelMotion\",\n    value: function cancelMotion(motionName) {\n      this.cleanAnims(\"._\".concat(motionName, \"_motion\"));\n      return this;\n    }\n    /**\r\n     * \r\n     * @param {String} motionName - motion's name like 'walk' 'idle'\r\n     * @param {Object} frames - keyframes \r\n     * @example\r\n     * this.registe('walk',{\r\n     *      0:{\r\n     *          body:{\r\n     *              rotate:10\r\n     *          }\r\n     *      },\r\n     *      50:{\r\n     *          arm:{\r\n     *              skewX:12\r\n     *          }\r\n     *      },\r\n     *      100:{\r\n     *          body:{\r\n     *              rotate:20\r\n     *          }\r\n     *      }\r\n     * })\r\n     */\n\n  }, {\n    key: \"registe\",\n    value: function registe(motionName, frames) {\n      this[motionName] = generateMotion(motionName, frames);\n\n      if (this[motionName instanceof Function]) {\n        this.motions.add(motionName);\n      }\n\n      return this;\n    }\n    /**\r\n     * attacj origin object to every level group\r\n     */\n\n  }, {\n    key: \"attachOrigin\",\n    value: function attachOrigin() {\n      var parentMat = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];\n      getOrigin(this.body, parentMat);\n      return this;\n    } //TODO for regexp detect group name\n    // getFlatList(prefix){\n    //     this.flatMap = {};\n    //     if(!this.body)return;\n    //     let pre = prefix || \"\";\n    // }\n\n  }, {\n    key: \"attachEvent\",\n    value: function attachEvent(finder, type) {\n      attach(finder, type, this.body);\n      return this;\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      resetTransform(this.body);\n      return this;\n    }\n  }, {\n    key: \"getFrame\",\n    value: function getFrame() {\n      var frame = {};\n      gf(\"\", this.body, frame);\n      return frame;\n    }\n  }, {\n    key: \"addSub\",\n    value: function addSub(finder, subname, subms) {\n      if (!subname || /[.#*%@()]/.test(subname)) {\n        console.warn(\"not legal subname:\", subname);\n        return this;\n      }\n\n      if (!(subms instanceof Matchstick)) {\n        console.warn(\"must an instance of Matchstick\");\n        return this;\n      }\n\n      var p = parseFinder(finder);\n\n      if (!p || p.type != \"normal\") {\n        console.warn(\"finder '\".concat(finder, \"' is not legal\"));\n        return this;\n      }\n\n      var parent = p.path.reduce(function (acc, e) {\n        return acc.subs[e];\n      }, this.body);\n\n      if (parent.subs[subname]) {\n        console.warn(\"fail to add sub :under '\".concat(finder, \"' '\").concat(subname, \"' has already exist\"));\n        return this;\n      }\n\n      parent.subs[subname] = subms.body;\n      this.reparseBody();\n      return this;\n    }\n  }, {\n    key: \"removeSub\",\n    value: function removeSub(finder) {\n      var p = parseFinder(finder);\n\n      if (!p || p.type != 'normal') {\n        console.warn(\"finder '\".concat(finder, \"' is not legal\"));\n        return this;\n      }\n\n      var parent;\n      var subname;\n      var sub = p.path.reduce(function (acc, e) {\n        parent = acc;\n        subname = e;\n        return acc.subs[e];\n      }, this.body);\n\n      if (hasChildNode(parent.group, sub.group)) {\n        parent.group.removeChild(sub.group);\n      }\n\n      delete parent.subs[subname];\n    }\n  }, {\n    key: \"reparseBody\",\n    value: function reparseBody() {\n      // let prev = this.body.group;\n      reparse(this.body); // if(prev.parentElement){\n      //     prev.parentElement.insertBefore(this.body.group , prev);\n      //     prev.parentElement.removeChild(prev);\n      // }\n\n      return this;\n    }\n  }]);\n\n  return Matchstick;\n}();\n\nmodule.exports = Matchstick;\nwindow.Matchstick = Matchstick;\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/events.js":
/*!***********************!*\
  !*** ./lib/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    transformTypes = _require.transformTypes,\n    parseFinder = _require.parseFinder,\n    getTransformTypeAndValue = _require.getTransformTypeAndValue;\n\nvar m3 = __webpack_require__(/*! ./m3 */ \"./lib/m3.js\");\n/**\r\n * \r\n * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} obj \r\n * @param {{mat:[],tmpTrans:[]}[]} ancestors\r\n * \r\n */\n\n\nfunction attachRotate(obj, ancestors) {\n  if (!obj.origin) {\n    console.warn(\"events.js attachRotate: run '\".concat(attachOrigin, \"' before attach event\"));\n    return;\n  }\n\n  if (!obj.tmpTrans) {\n    obj.tmpTrans = [];\n  }\n\n  var preX = null;\n  var preY = null;\n  obj.group.addEventListener(\"mouseleave\", function (e) {\n    // console.log(\"leave\");\n    preX = null;\n    preY = null; // e.stopPropagation();\n\n    return false;\n  });\n  /**\r\n   * calculate degree\r\n   * cross mul = x1*y2 - x2*y1 = |a||b|*sin(degree)\r\n   * dot mul = x1*x2 + y1*y2 = |a||b|*cos(degree)\r\n   * tan(degree) = cross / dot\r\n   * degree = atan(degree)\r\n   */\n\n  obj.group.addEventListener(\"mousemove\", function (e) {\n    if (e.buttons != 1) {\n      preX = null;\n      preY = null;\n      return false;\n    }\n\n    if (!preX || !preY || preX == obj.origin.x || preY == obj.origin.y) {\n      preX = e.offsetX;\n      preY = e.offsetY; // console.log(\"offset\" , e.offsetX , e.offsetY);\n\n      return false;\n    } // console.log(\"------------------------------\");\n\n\n    var mat = m3.unit();\n    ancestors.forEach(function (anc) {\n      // console.log(\"mul:\" ,anc.mat )\n      mat = m3.multipy(mat, anc.mat); // console.log(\"--res:\", mat);\n\n      if (anc.tmpTrans) {\n        anc.tmpTrans.forEach(function (tran) {\n          var res = getTransformTypeAndValue(tran);\n          if (res === null) return; // console.log(\"mul:\" ,m3[res.type](...res.args) )\n\n          mat = m3.multipy(mat, m3[res.type].apply(m3, _toConsumableArray(res.args))); // console.log(\"--res:\", mat);\n        });\n      }\n    });\n    var origin = {\n      x: mat[0][2],\n      y: mat[1][2]\n    };\n    var cross = (preX - origin.x) * (e.offsetY - origin.y) - (preY - origin.y) * (e.offsetX - origin.x);\n    var dot = (preX - origin.x) * (e.offsetX - origin.x) + (preY - origin.y) * (e.offsetY - origin.y);\n    var degree = 185 * Math.atan(cross / dot) / Math.PI;\n\n    if (obj.tmpTrans.length == 0 || !obj.tmpTrans[obj.tmpTrans.length - 1].startsWith(\"rotate\")) {\n      obj.tmpTrans.push(\"rotate(\".concat(degree, \")\"));\n    } else {\n      var idx = obj.tmpTrans.length - 1;\n      obj.tmpTrans[idx] = \"rotate(\".concat(degree + parseFloat(getTransformTypeAndValue(obj.tmpTrans[idx]).args[0]), \")\");\n    }\n\n    var str = obj.trans.join(\" \");\n    str += \" \" + obj.tmpTrans.join(\" \");\n    e.currentTarget.setAttribute(\"transform\", str);\n    preX = e.offsetX;\n    preY = e.offsetY;\n    e.stopPropagation();\n    return false;\n  });\n}\n\nfunction attachTranslate(obj) {\n  console.warn(\"not implemented\");\n}\n\nfunction attachScale(obj) {\n  console.warn(\"not implemented\");\n}\n\nfunction attachSkewX(obj) {\n  console.warn(\"not implemented\");\n}\n\nfunction attachSkewY(obj) {\n  console.warn(\"not implemented\");\n}\n\neventAttaches = {\n  rotate: attachRotate,\n  translate: attachTranslate,\n  scale: attachScale,\n  skewX: attachSkewX,\n  skewY: attachSkewY\n};\n/**\r\n * \r\n * @param {String} finder \r\n * @param {String} type \r\n * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} body\r\n * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} parentbody\r\n * @example\r\n * attach('body.head' , 'rotate' , ms.body)\r\n */\n\nfunction attach(finder, type, body) {\n  if (!transformTypes.includes(type)) {\n    console.warn(\"events.js attach :type '\".concat(type, \"' not supported\"));\n    return;\n  }\n\n  var p = parseFinder(finder);\n\n  if (p === null) {\n    console.warn(\"has a illegal path\", finder, \"in\", name, \"motion\");\n    return;\n  }\n\n  var warpper;\n  var ancestors = [body];\n\n  if (p.type == 'id') {\n    warpper = body.group.querySelector(p.path);\n    return; //nono\n  } else if (p.type = \"normal\") {\n    warpper = p.path.reduce(function (acc, e, i) {\n      ancestors.push(acc.subs[e]);\n      return acc.subs[e];\n    }, body);\n  } else {\n    return;\n  }\n\n  eventAttaches[type](warpper, ancestors);\n}\n\nmodule.exports = attach;\n\n//# sourceURL=webpack:///./lib/events.js?");

/***/ }),

/***/ "./lib/generateMotion.js":
/*!*******************************!*\
  !*** ./lib/generateMotion.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    transformTypes = _require.transformTypes,\n    parseFinder = _require.parseFinder;\n\nfunction generateMotion(name, frames) {\n  var obj = cookFrames(frames);\n  var gs = {};\n  var flat = []; //all animation related tags\n\n  Object.keys(obj).forEach(function (gn) {\n    //gn : xxx.xxx.xxx or #idname  -- #idname can support add animate to non-group tag\n    gs[gn] = createGroupAnimas(obj[gn], name);\n    flat = flat.concat(gs[gn]);\n  }); //attach class on every animate element\n\n  flat.forEach(function (e) {\n    e.classList.add(\"_\".concat(name, \"_motion\"));\n  }); //           =》 生成函数\n\n  /**\r\n   * @param {Object} opts\r\n   *  - dur\r\n   *  - calcMode\r\n   *  - repeatCount\r\n   *  - repeatDur\r\n   *  - keySpline // just one\r\n   */\n\n  return function (opts) {\n    var _this = this;\n\n    //this point to Matchstick instance\n    if (!(opts instanceof Object)) opts = {};\n    var dur = opts.dur || \"1s\";\n    var calcMode = opts.calcMode || \"linear\";\n    var repeatCount = opts.repeatCount || \"indefinite\";\n    var repeatDur = opts.repeatDur || null;\n    var keySpline = opts.keySpline || null;\n    flat.forEach(function (e) {\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"dur\", dur);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"calcMode\", calcMode);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"repeatCount\", repeatCount);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"repeatDur\", repeatDur);\n      e.setAttribute(\"dur\", dur);\n      e.setAttribute(\"calcMode\", calcMode);\n      e.setAttribute(\"repeatCount\", repeatCount);\n      e.setAttribute(\"repeatDur\", repeatDur); //TODO keySplines waiting\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"keySpine\", dur);\n    });\n    Object.keys(gs).forEach(function (finder) {\n      var p = parseFinder(finder);\n\n      if (p === null) {\n        console.warn(\"has a illegal path\", finder, \"in\", name, \"motion\");\n        return;\n      }\n\n      var warpper;\n\n      if (p.type == 'id') {\n        warpper = _this.body.group.querySelector(p.path);\n      } else if (p.type = \"normal\") {\n        warpper = p.path.reduce(function (acc, e) {\n          return acc.subs[e];\n        }, _this.body).group;\n      } else {\n        return;\n      } //append animation elements to the warpper\n\n\n      gs[finder].forEach(function (ele) {\n        warpper.appendChild(ele);\n      });\n    });\n  };\n} //           =》 分组-anima相关标签list\n\n\nfunction createGroupAnimas(obj) {\n  return Object.entries(obj).map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        attr = _ref2[0],\n        obj = _ref2[1];\n\n    return createSingleAnima(attr, obj);\n  });\n} //属性-百分比-值 =》 tag\n\n\nfunction createSingleAnima(attrName, transObj) {\n  var keyTimes = \"\";\n  var values = \"\";\n  var dom = null;\n  var source = Object.entries(transObj);\n\n  if (source[0][0] != 0) {\n    source.unshift([0, source[0][1]]);\n  }\n\n  if (source[source.length - 1][0] != 100) {\n    source.push([100, source[source.length - 1][1]]);\n  }\n\n  source.forEach(function (_ref3) {\n    var _ref4 = _slicedToArray(_ref3, 2),\n        k = _ref4[0],\n        v = _ref4[1];\n\n    if (k != 0) {\n      keyTimes += \";\" + k / 100;\n      values += \";\" + v;\n    } else {\n      keyTimes += k / 100;\n      values += v;\n    }\n  });\n\n  if (transformTypes.includes(attrName)) {\n    //animateTransform\n    dom = document.createElementNS(\"http://www.w3.org/2000/svg\", \"animateTransform\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"attributeName\", \"transform\");\n\n    dom.setAttribute(\"attributeName\", \"transform\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"type\", attrName);\n\n    dom.setAttribute(\"type\", attrName);\n  } else {\n    dom = document.createElementNS(\"http://www.w3.org/2000/svg\", \"animate\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"attributeName\", attrName);\n\n    dom.setAttribute(\"attributeName\", attrName);\n  } //设置通用属性：keyTimes ,values ,additive\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"keyTimes\", keyTimes);\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"values\", values);\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"additive\", \"sum\");\n\n\n  dom.setAttribute(\"keyTimes\", keyTimes);\n  dom.setAttribute(\"values\", values);\n  dom.setAttribute(\"additive\", \"sum\");\n  return dom;\n} // 拓扑一下 ：百分比-分组-属性-值\n//           =》 分组-百分比-属性-值\n//           =》 分组-属性-百分比-值 \n\n\nfunction cookFrames(frames) {\n  var obj = doTopo(frames);\n  Object.entries(obj).forEach(function (_ref5) {\n    var _ref6 = _slicedToArray(_ref5, 2),\n        groupname = _ref6[0],\n        percents = _ref6[1];\n\n    obj[groupname] = doTopo(percents);\n  });\n  return obj;\n} //单层拓扑\n\n\nfunction doTopo(obj) {\n  var res = {};\n  Object.keys(obj).forEach(function (outerEle) {\n    Object.keys(obj[outerEle]).forEach(function (innerEle) {\n      if (!(res[innerEle] instanceof Object)) res[innerEle] = {};\n      res[innerEle][outerEle] = obj[outerEle][innerEle];\n    });\n  });\n  return res;\n}\n\nmodule.exports = generateMotion;\n\n//# sourceURL=webpack:///./lib/generateMotion.js?");

/***/ }),

/***/ "./lib/getFrame.js":
/*!*************************!*\
  !*** ./lib/getFrame.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    getTransformTypeAndValue = _require.getTransformTypeAndValue;\n\nfunction getSubFrame(prefix, obj, frame) {\n  if (obj.subs) Object.keys(obj.subs).forEach(function (sub) {\n    // console.log(sub);\n    var pre = prefix ? \"\".concat(prefix, \".\").concat(sub) : sub;\n\n    if (obj.subs[sub].tmpTrans && obj.subs[sub].tmpTrans.length) {\n      frame[pre] = {};\n      obj.subs[sub].tmpTrans.forEach(function (tran) {\n        var res = getTransformTypeAndValue(tran);\n        if (!res) return;\n        res.args = res.args.filter(function (arg) {\n          return arg;\n        });\n        frame[pre][res.type] = res.args.join();\n      });\n    }\n\n    getSubFrame(pre, obj.subs[sub], frame);\n  });\n}\n\nmodule.exports = getSubFrame;\n\n//# sourceURL=webpack:///./lib/getFrame.js?");

/***/ }),

/***/ "./lib/getOrigin.js":
/*!**************************!*\
  !*** ./lib/getOrigin.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    getTransformTypeAndValue = _require.getTransformTypeAndValue;\n\nvar m3 = __webpack_require__(/*! ./m3 */ \"./lib/m3.js\");\n/**\r\n * get origin position\r\n * @param {Object} body \r\n * @param {Array[]} parentMat \r\n */\n\n\nfunction getOrigin(body, parentMat) {\n  var trans = body.trans;\n  var mat = m3.unit();\n  trans.forEach(function (tran) {\n    var res = getTransformTypeAndValue(tran);\n    if (res === null) return;\n    mat = m3.multipy(mat, m3[res.type].apply(m3, _toConsumableArray(res.args)));\n  });\n  body.mat = mat;\n  body.origin = {\n    x: mat[0][2],\n    y: mat[1][2]\n  };\n\n  if (body.subs) {\n    Object.keys(body.subs).forEach(function (sub) {\n      getOrigin(body.subs[sub], mat);\n    });\n  }\n}\n\nmodule.exports = getOrigin;\n\n//# sourceURL=webpack:///./lib/getOrigin.js?");

/***/ }),

/***/ "./lib/m3.js":
/*!*******************!*\
  !*** ./lib/m3.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Math.cos/tan/sin ... 是使用弧度制！！！\r\n */\nmodule.exports.multipy = function (m1, m2) {\n  var m = [[], [], []];\n\n  for (var i = 0; i < 3; i++) {\n    for (var j = 0; j < 3; j++) {\n      m[i][j] = 0;\n\n      for (var k = 0; k < 3; k++) {\n        m[i][j] += m1[i][k] * m2[k][j];\n      }\n    }\n  }\n\n  return m;\n};\n\nmodule.exports.rotate = function (degree) {\n  var radian = Math.PI * degree / 180;\n  return [[Math.cos(radian), -Math.sin(radian), 0], [Math.sin(radian), Math.cos(radian), 0], [0, 0, 1]];\n};\n\nmodule.exports.scale = function (sx, sy) {\n  var x = sx === undefined ? 1 : sx;\n  var y = sy === undefined ? x : sy;\n  return [[x, 0, 0], [0, y, 0], [0, 0, 1]];\n};\n\nmodule.exports.translate = function (tx, ty) {\n  var x = tx === undefined ? 0 : tx;\n  var y = ty === undefined ? x : ty;\n  return [[1, 0, x], [0, 1, y], [0, 0, 1]];\n};\n\nmodule.exports.skewX = function (degree) {\n  var radian = Math.PI * degree / 180;\n  return [[1, Math.tan(radian), 0], [0, 1, 0], [0, 0, 1]];\n};\n\nmodule.exports.skewY = function (degree) {\n  var radian = Math.PI * degree / 180;\n  return [[1, 0, 0], [Math.tan(radian), 1, 0], [0, 0, 1]];\n};\n\nmodule.exports.unit = function () {\n  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];\n};\n\n//# sourceURL=webpack:///./lib/m3.js?");

/***/ }),

/***/ "./lib/parse.js":
/*!**********************!*\
  !*** ./lib/parse.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    isTransformType = _require.isTransformType,\n    nsEscape = _require.nsEscape,\n    hasChildNode = _require.hasChildNode;\n\nfunction reparse_depreecated(obj) {\n  obj.group = obj.primeGroup.cloneNode(true);\n\n  for (var sub in obj.subs) {\n    reparse(obj.subs[sub]);\n    obj.group.appendChild(obj.subs[sub].group);\n  }\n}\n\nfunction reparse(obj) {\n  for (var sub in obj.subs) {\n    // console.log(sub);\n    if (!hasChildNode(obj.group, obj.subs[sub].group)) {\n      obj.group.appendChild(obj.subs[sub].group);\n    }\n\n    reparse(obj.subs[sub]);\n  }\n}\n\nfunction parse(obj, defaults, className) {\n  var parsedObj = {};\n  parsedObj.group = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\");\n  className ? parsedObj.group.classList.add(className) : \"\";\n  parsedObj.subs = {};\n  attachTransform(parsedObj.group, obj.trans, parsedObj);\n  attachElements(parsedObj.group, obj.eles, defaults);\n  parsedObj.primeGroup = parsedObj.group.cloneNode(true);\n\n  for (var sub in obj.subs) {\n    parsedObj.subs[sub] = parse(obj.subs[sub], defaults, sub);\n    parsedObj.group.appendChild(parsedObj.subs[sub].group);\n  }\n  /**\r\n   * @param {Object} parsedObj\r\n   *  - group : total Element\r\n   *  - subs : sub Elements\r\n   */\n\n\n  return parsedObj;\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Array} trans \r\n */\n\n\nfunction attachTransform(group, trans, obj) {\n  obj.trans = [];\n  if (!trans) return group;\n\n  if (trans instanceof String || typeof trans == 'string') {\n    // group.setAttributeNS(\"http://www.w3.org/2000/svg\" , 'transform', trans);\n    // group.setAttribute('transform', trans);\n    // return group;\n    trans = trans.split(/\\s+/); // console.log(trans);\n  }\n\n  var transStr = \"\";\n  trans.forEach(function (el) {\n    if ((el instanceof String || typeof el == 'string') && isTransformType(el)) {\n      transStr += \" \" + el;\n      obj.trans.push(el);\n    }\n  }); // group.setAttributeNS(\"http://www.w3.org/2000/svg\" , 'transform', transStr);\n\n  group.setAttribute('transform', transStr);\n  return group;\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Array} eles\r\n * @param {{tagName:{attrname:String}}} defaults \r\n */\n\n\nfunction attachElements(group, eles, defaults) {\n  if (!eles) return;\n  if (eles instanceof Object && !(eles instanceof Array)) eles = [eles];\n\n  for (var i = 0; i < eles.length; i++) {\n    var el = eles[i]; // console.log(el);\n\n    /**\r\n     * attach default value to specific attribute\r\n     */\n\n    var defa = defaults ? defaults[el.type] : null;\n\n    if (defa) {\n      el.attrs = Object.assign({}, defa, el.attrs);\n    }\n\n    var dom = document.createElementNS(\"http://www.w3.org/2000/svg\", el.type);\n\n    if (!dom) {\n      continue;\n    }\n\n    if (!(el.attrs instanceof Object)) {\n      continue;\n    }\n\n    for (var attr in el.attrs) {\n      if (nsEscape.includes(attr)) {\n        dom.setAttribute(attr, el.attrs[attr]);\n      } else {\n        // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , attr, el.attrs[attr]);\n        dom.setAttribute(attr, el.attrs[attr]);\n      }\n    }\n\n    group.appendChild(dom);\n  }\n\n  return group;\n}\n\nmodule.exports.parse = parse;\nmodule.exports.reparse = reparse;\n\n//# sourceURL=webpack:///./lib/parse.js?");

/***/ }),

/***/ "./lib/reset.js":
/*!**********************!*\
  !*** ./lib/reset.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function resetTransform(obj) {\n  if (!obj.trans) obj.trans = [];\n  obj.group.setAttribute(\"transform\", obj.trans.join(\" \"));\n  obj.group.tmpTrans = [];\n  if (!obj.subs) obj.subs = [];\n  obj.subs.forEach(function (sub) {\n    resetTransform(obj.subs[sub]);\n  });\n}\n\nmodule.exports = resetTransform;\n\n//# sourceURL=webpack:///./lib/reset.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function isTransformType(str) {\n  var reg = /^\\s*(?:translate\\(.*\\)|rotate\\(.*\\)|scale\\(.*\\)|skew[XY]\\(.*\\))\\s*$/;\n  return reg.test(str);\n}\n\nmodule.exports.isTransformType = isTransformType;\nmodule.exports.transformTypes = [\"translate\", \"rotate\", \"scale\", \"skewX\", \"skewY\"];\nmodule.exports.nsEscape = [\"id\"]; // xxx.yyy.zzz or  #idname\n\nvar paths = {\n  normal: /^(?:[a-zA-Z_$][a-zA-Z0-9_$]*(?:\\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)$/,\n  id: /^(?:#[a-zA-Z_$][a-zA-Z0-9_$]*)$/\n};\nvar types = Object.keys(paths);\n\nfunction getPathType(str) {\n  for (var i = 0; i < types.length; i++) {\n    if (paths[types[i]].test(str)) {\n      return types[i];\n    }\n  }\n\n  return null;\n}\n\nmodule.exports.getPathType = getPathType;\nvar tnvreg = /^\\s*(translate|rotate|scale|skewX|skewY)\\((-?[0-9.]+)(?:,(-?[0-9.]+))*\\)\\s*$/;\n\nmodule.exports.getTransformTypeAndValue = function (str) {\n  var res = tnvreg.exec(str);\n  if (res === null) return res;\n  return {\n    type: res[1],\n    args: res.slice(2)\n  };\n};\n/**\r\n * \r\n * @param {String} finder \r\n * - xxx.yy.zzz or #idname format\r\n */\n\n\nfunction parseFinder(finder) {\n  if (finder == \"\") return {\n    type: \"normal\",\n    path: []\n  };\n  var res = {};\n  res.type = getPathType(finder);\n\n  if (res.type === null) {\n    return null;\n  }\n\n  if (res.type == 'normal') {\n    res.path = finder.split('.');\n  }\n\n  if (res.type == \"id\") {\n    res.path = finder;\n  }\n\n  return res;\n}\n\nmodule.exports.parseFinder = parseFinder;\n\nfunction hasChildNode(parent, child) {\n  var test = document.createElement('p');\n\n  try {\n    parent.insertBefore(test, child);\n    parent.removeChild(test); // console.log(\"有\");\n\n    return true;\n  } catch (e) {\n    // console.log(\"没有\");\n    return false;\n  }\n}\n\nmodule.exports.hasChildNode = hasChildNode;\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });