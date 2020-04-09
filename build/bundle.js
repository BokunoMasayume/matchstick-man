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

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar parse = __webpack_require__(/*! ./lib/parse */ \"./lib/parse.js\");\n\nvar generateMotion = __webpack_require__(/*! ./lib/generateMotion */ \"./lib/generateMotion.js\"); // let obj = {//<g>\n//     eles:[\n//         {\n//             type: \"tag name\",\n//             attrs:{\n//                  //attributes\n//              }\n//         }\n//     ],\n//     trans:[\n//         \"translate(0 ,20)\",...\n//     ],\n//     subs:{\n//         \"name1\" : obj,//a <g>\n//         \"name2\" :obj,//a <g>\n//         ...\n//     }\n// }\n// body={\n//     group :Element,\n//     subs:{\n//         \"name1\":SVGGElement,\n//         \"name2\":SVGGElement\n//     }\n// }\n\n\nvar Matchstick = /*#__PURE__*/function () {\n  function Matchstick(stickObj) {\n    _classCallCheck(this, Matchstick);\n\n    //generate this.body\n    this.parseBody(stickObj);\n    this.motions = new Set();\n  }\n  /**\r\n   * parse body obj \r\n   * @param {Object} obj \r\n   */\n\n\n  _createClass(Matchstick, [{\n    key: \"parseBody\",\n    value: function parseBody(obj) {\n      this.body = parse(obj);\n      return this;\n    } //\n\n    /**\r\n     * remove all animite related to className's tags \r\n     * e.g. animateTransform.walk animate.walk\r\n     * @param {String} className \r\n     *  - not set clean all animate tags\r\n     *  - e.g. className = walk clean animateTransform.walk animate.walk ..\r\n     */\n\n  }, {\n    key: \"cleanAnims\",\n    value: function cleanAnims(className) {\n      this.body.group.querySelectorAll(className).forEach(function (ele) {\n        if (ele instanceof SVGSetElement || ele instanceof SVGAnimateElement || ele instanceof SVGAnimateTransformElement || ele instanceof SVGAnimateColorElement || ele instanceof SVGAnimateMotionElement) {\n          ele.parentNode.removeChild(ele);\n        }\n      });\n      return this;\n    } //invoke cleanAnimas\n\n  }, {\n    key: \"cancelMotion\",\n    value: function cancelMotion(motionName) {\n      this.cleanAnims(\"_\".concat(motionName, \"_motion\"));\n      return this;\n    }\n  }, {\n    key: \"registe\",\n    value: function registe(motionName, frames) {\n      this[motionName] = generateMotion(motionName, frames);\n\n      if (this[motionName instanceof Function]) {\n        this.motions.add(motionName);\n      }\n    }\n  }]);\n\n  return Matchstick;\n}();\n\nmodule.exports = Matchstick;\nwindow.Matchstick = Matchstick;\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/generateMotion.js":
/*!*******************************!*\
  !*** ./lib/generateMotion.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    transformTypes = _require.transformTypes,\n    getPathType = _require.getPathType;\n\nfunction generateMotion(name, frames) {\n  var obj = cookFrames(frames);\n  var gs = {};\n  var flat = []; //all animation related tags\n\n  Object.keys(obj).forEach(function (gn) {\n    //gn : xxx.xxx.xxx or #idname  -- #idname can support add animate to non-group tag\n    gs[gn] = createGroupAnimas(obj[gn], name);\n    flat = flat.concat(gs[gn]);\n  }); //attach class on every animate element\n\n  flat.forEach(function (e) {\n    e.classList.add(\"_\".concat(name, \"_motion\"));\n  }); //           =》 生成函数\n\n  /**\r\n   * @param {Object} opts\r\n   *  - dur\r\n   *  - calcMode\r\n   *  - repeatCount\r\n   *  - repeatDur\r\n   *  - keySpline // just one\r\n   */\n\n  return function (opts) {\n    var _this = this;\n\n    //this point to Matchstick instance\n    if (!(opts instanceof Object)) opts = {};\n    var dur = opts.dur || \"1s\";\n    var calcMode = opts.calcMode || \"linear\";\n    var repeatCount = opts.repeatCount || \"indefinite\";\n    var repeatDur = opts.repeatDur || null;\n    var keySpline = opts.keySpline || null;\n    flat.forEach(function (e) {\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"dur\", dur);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"calcMode\", calcMode);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"repeatCount\", repeatCount);\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"repeatDur\", repeatDur);\n      e.setAttribute(\"dur\", dur);\n      e.setAttribute(\"calcMode\", calcMode);\n      e.setAttribute(\"repeatCount\", repeatCount);\n      e.setAttribute(\"repeatDur\", repeatDur); //TODO keySplines waiting\n      // e.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"keySpine\", dur);\n    });\n    Object.keys(gs).forEach(function (finder) {\n      var p = parseFinder(finder);\n\n      if (p === null) {\n        console.warn(\"has a illegal path\", finder, \"in\", name, \"motion\");\n        return;\n      }\n\n      var warpper;\n\n      if (p.type == 'id') {\n        warpper = _this.body.group.querySelector(p.path);\n      } else if (p.type = \"normal\") {\n        warpper = p.path.reduce(function (acc, e) {\n          return acc.subs[e];\n        }, _this.body).group;\n      } else {\n        return;\n      } //append animation elements to the warpper\n\n\n      gs[finder].forEach(function (ele) {\n        warpper.appendChild(ele);\n      });\n    });\n  };\n}\n/**\r\n * \r\n * @param {String} finder \r\n * - xxx.yy.zzz or #idname format\r\n */\n\n\nfunction parseFinder(finder) {\n  var res = {};\n  res.type = getPathType(finder);\n\n  if (res.type === null) {\n    return null;\n  }\n\n  if (res.type == 'normal') {\n    res.path = finder.split('.');\n  }\n\n  if (res.type == \"id\") {\n    res.path = finder;\n  }\n\n  return res;\n} //           =》 分组-anima相关标签list\n\n\nfunction createGroupAnimas(obj) {\n  return Object.entries(obj).map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        attr = _ref2[0],\n        obj = _ref2[1];\n\n    return createSingleAnima(attr, obj);\n  });\n} //属性-百分比-值 =》 tag\n\n\nfunction createSingleAnima(attrName, transObj) {\n  var keyTimes = \"\";\n  var values = \"\";\n  var dom = null;\n  var source = Object.entries(transObj);\n\n  if (source[0][0] != 0) {\n    source.unshift([0, source[0][1]]);\n  }\n\n  if (source[source.length - 1][0] != 100) {\n    source.push([100, source[source.length - 1][1]]);\n  }\n\n  source.forEach(function (_ref3) {\n    var _ref4 = _slicedToArray(_ref3, 2),\n        k = _ref4[0],\n        v = _ref4[1];\n\n    if (k != 0) {\n      keyTimes += \";\" + k / 100;\n      values += \";\" + v;\n    } else {\n      keyTimes += k / 100;\n      values += v;\n    }\n  });\n\n  if (transformTypes.includes(attrName)) {\n    //animateTransform\n    dom = document.createElementNS(\"http://www.w3.org/2000/svg\", \"animateTransform\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"attributeName\", \"transform\");\n\n    dom.setAttribute(\"attributeName\", \"transform\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"type\", attrName);\n\n    dom.setAttribute(\"type\", attrName);\n  } else {\n    dom = document.createElementNS(\"http://www.w3.org/2000/svg\", \"animate\"); // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"attributeName\", attrName);\n\n    dom.setAttribute(\"attributeName\", attrName);\n  } //设置通用属性：keyTimes ,values ,additive\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"keyTimes\", keyTimes);\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"values\", values);\n  // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , \"additive\", \"sum\");\n\n\n  dom.setAttribute(\"keyTimes\", keyTimes);\n  dom.setAttribute(\"values\", values);\n  dom.setAttribute(\"additive\", \"sum\");\n  return dom;\n} // 拓扑一下 ：百分比-分组-属性-值\n//           =》 分组-百分比-属性-值\n//           =》 分组-属性-百分比-值 \n\n\nfunction cookFrames(frames) {\n  var obj = doTopo(frames);\n  Object.entries(obj).forEach(function (_ref5) {\n    var _ref6 = _slicedToArray(_ref5, 2),\n        groupname = _ref6[0],\n        percents = _ref6[1];\n\n    obj[groupname] = doTopo(percents);\n  });\n  return obj;\n} //单层拓扑\n\n\nfunction doTopo(obj) {\n  var res = {};\n  Object.keys(obj).forEach(function (outerEle) {\n    Object.keys(obj[outerEle]).forEach(function (innerEle) {\n      if (!(res[innerEle] instanceof Object)) res[innerEle] = {};\n      res[innerEle][outerEle] = obj[outerEle][innerEle];\n    });\n  });\n  return res;\n}\n\nmodule.exports = generateMotion;\n\n//# sourceURL=webpack:///./lib/generateMotion.js?");

/***/ }),

/***/ "./lib/parse.js":
/*!**********************!*\
  !*** ./lib/parse.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./util */ \"./lib/util.js\"),\n    isTransformType = _require.isTransformType,\n    nsEscape = _require.nsEscape;\n\nfunction parse(obj) {\n  var parsedObj = {};\n  parsedObj.group = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\");\n  parsedObj.subs = {};\n  attachTransform(parsedObj.group, obj.trans);\n  attachElements(parsedObj.group, obj.eles);\n\n  for (var sub in obj.subs) {\n    parsedObj.subs[sub] = parse(obj.subs[sub]);\n    parsedObj.group.appendChild(parsedObj.subs[sub].group);\n  }\n  /**\r\n   * @param {Object} parsedObj\r\n   *  - group : total Element\r\n   *  - subs : sub Elements\r\n   */\n\n\n  return parsedObj;\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Array} trans \r\n */\n\n\nfunction attachTransform(group, trans) {\n  if (!trans) return group;\n\n  if (trans instanceof String || typeof trans == 'string') {\n    // group.setAttributeNS(\"http://www.w3.org/2000/svg\" , 'transform', trans);\n    group.setAttribute('transform', trans);\n    return group;\n  }\n\n  var transStr = \"\";\n  trans.forEach(function (el) {\n    if ((el instanceof String || typeof el == 'string') && isTransformType(el)) {\n      transStr += \" \" + el;\n    }\n  }); // group.setAttributeNS(\"http://www.w3.org/2000/svg\" , 'transform', transStr);\n\n  group.setAttribute('transform', transStr);\n  return group;\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Array} eles \r\n */\n\n\nfunction attachElements(group, eles) {\n  if (!eles) return;\n  if (eles instanceof Object && !(eles instanceof Array)) eles = [eles];\n\n  for (var i = 0; i < eles.length; i++) {\n    var el = eles[i];\n    var dom = document.createElementNS(\"http://www.w3.org/2000/svg\", el.type);\n\n    if (!dom) {\n      continue;\n    }\n\n    if (!(el.attrs instanceof Object)) {\n      continue;\n    }\n\n    for (var attr in el.attrs) {\n      if (nsEscape.includes(attr)) {\n        dom.setAttribute(attr, el.attrs[attr]);\n      } else {\n        // dom.setAttributeNS(\"http://www.w3.org/2000/svg\" , attr, el.attrs[attr]);\n        dom.setAttribute(attr, el.attrs[attr]);\n      }\n    }\n\n    group.appendChild(dom);\n  }\n\n  return group;\n}\n\nmodule.exports = parse;\n\n//# sourceURL=webpack:///./lib/parse.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function isTransformType(str) {\n  var reg = /^\\s*(?:translate\\(.*\\)|rotate\\(.*\\)|scale\\(.*\\)|skew[XY]\\(.*\\))\\s*$/;\n  return reg.test(str);\n}\n\nmodule.exports.isTransformType = isTransformType;\nmodule.exports.transformTypes = [\"translate\", \"rotate\", \"scale\", \"skewX\", \"skewY\"];\nmodule.exports.nsEscape = [\"id\"]; // xxx.yyy.zzz or  #idname\n\nvar paths = {\n  normal: /^(?:[a-zA-Z_$][a-zA-Z0-9_$]*(?:\\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)$/,\n  id: /^(?:#[a-zA-Z_$][a-zA-Z0-9_$]*)$/\n};\nvar types = Object.keys(paths);\n\nmodule.exports.getPathType = function (str) {\n  for (var i = 0; i < types.length; i++) {\n    if (paths[types[i]].test(str)) {\n      return types[i];\n    }\n  }\n\n  return null;\n};\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });