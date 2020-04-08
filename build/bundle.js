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

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar parse = __webpack_require__(/*! ./lib/parse */ \"./lib/parse.js\"); // let obj = {//<g>\n//     eles:[\n//         {\n//             type: \"tag name\",\n//             attrs:{\n//                  //attributes\n//              }\n//         }\n//     ],\n//     trans:[\n//         \"translate(0 ,20)\",...\n//     ],\n//     subs:{\n//         \"name1\" : obj,//a <g>\n//         \"name2\" :obj,//a <g>\n//         ...\n//     }\n// }\n// body={\n//     group :Element,\n//     subs:{\n//         \"name1\":SVGGElement,\n//         \"name2\":SVGGElement\n//     }\n// }\n\n\nvar Matchstick = /*#__PURE__*/function () {\n  function Matchstick(stickObj) {\n    _classCallCheck(this, Matchstick);\n\n    //generate this.body\n    this.parseBody(stickObj);\n    this.motions = [];\n  }\n  /**\r\n   * parse body obj \r\n   * @param {Object} obj \r\n   */\n\n\n  _createClass(Matchstick, [{\n    key: \"parseBody\",\n    value: function parseBody(obj) {\n      this.body = parse(obj);\n      return this;\n    } //\n\n    /**\r\n     * remove all animite related to className's tags \r\n     * e.g. animateTransform.walk animate.walk\r\n     * @param {String} className \r\n     *  - not set clean all animate tags\r\n     *  - e.g. className = walk clean animateTransform.walk animate.walk ..\r\n     */\n\n  }, {\n    key: \"cleanAnims\",\n    value: function cleanAnims(className) {\n      this.body.group.querySelectorAll(className).forEach(function (ele) {\n        if (ele instanceof SVGSetElement || ele instanceof SVGAnimateElement || ele instanceof SVGAnimateTransformElement || ele instanceof SVGAnimateColorElement || ele instanceof SVGAnimateMotionElement) {\n          ele.parentNode.removeChild(ele);\n        }\n      });\n      return this;\n    } //invoke cleanAnimas\n\n  }, {\n    key: \"cancelMotion\",\n    value: function cancelMotion(motionName) {\n      this.cleanAnims(motionName);\n      return this;\n    }\n  }, {\n    key: \"registe\",\n    value: function registe(motionName, frames) {}\n  }]);\n\n  return Matchstick;\n}();\n\nmodule.exports = Matchstick;\nwindow.Matchstick = Matchstick;\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/parse.js":
/*!**********************!*\
  !*** ./lib/parse.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function parse(obj) {\n  var parsedObj = {};\n  parsedObj.group = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\");\n  parsedObj.subs = {};\n  attachTransform(parsedObj.group, obj.trans);\n  attachElements(parsedObj.group, obj.eles);\n\n  for (var sub in obj.subs) {\n    parsedObj.subs[sub] = parse(obj.subs[sub]);\n    parsedObj.group.appendChild(parsedObj.subs[sub].group);\n  }\n  /**\r\n   * @param {Object} parsedObj\r\n   *  - group : total Element\r\n   *  - subs : sub Elements\r\n   */\n\n\n  return parsedObj;\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Array} trans \r\n */\n\n\nfunction attachTransform(group, trans) {\n  if (!trans) return group;\n\n  if (trans instanceof String || typeof trans == 'string') {\n    group.setAttributeNS(\"http://www.w3.org/2000/svg\", 'transform', trans);\n    return group;\n  }\n\n  var transStr = \"\";\n  trans.forEach(function (el) {\n    if ((el instanceof String || typeof el == 'string') && isTransformType(el)) {\n      transStr += \" \" + el;\n    }\n  });\n  group.setAttributeNS(\"http://www.w3.org/2000/svg\", 'transform', transStr);\n  return group;\n}\n\nfunction isTransformType(str) {\n  var reg = /^\\s*(?:translate\\(.*\\)|rotate\\(.*\\)|scale\\(.*\\)|skew[XY]\\(.*\\))\\s*$/;\n  return reg.test(str);\n}\n/**\r\n * \r\n * @param {SVGGElement} group \r\n * @param {Object} eles \r\n */\n\n\nfunction attachElements(group, eles) {\n  for (var i = 0; i < eles.length; i++) {\n    var el = eles[i];\n    var dom = document.createElementNS(\"http://www.w3.org/2000/svg\", el.type);\n\n    if (!dom) {\n      continue;\n    }\n\n    if (!(el.attrs instanceof Object)) {\n      continue;\n    }\n\n    for (var attr in el.attrs) {\n      dom.setAttributeNS(\"http://www.w3.org/2000/svg\", attr, el.attrs[attr]);\n    }\n\n    group.appendChild(dom);\n  }\n\n  return group;\n}\n\nmodule.exports = parse;\n\n//# sourceURL=webpack:///./lib/parse.js?");

/***/ })

/******/ });