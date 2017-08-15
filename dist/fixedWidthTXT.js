(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("file-saver"));
	else if(typeof define === 'function' && define.amd)
		define(["file-saver"], factory);
	else if(typeof exports === 'object')
		exports["fixedWidthTXT"] = factory(require("file-saver"));
	else
		root["fixedWidthTXT"] = factory(root["saveAs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileGenerator", function() { return fileGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
    app name fixedWidthTXT
 */

/**
 * Class to create a fixed width text file
 * 
*/
var fileSaver = __webpack_require__(1);

var fileGenerator = function () {
    /**
     * When initializing a new instance of this class fileConfig is required.
     * fieldLength is the total length of the entry for that item
     * dataField will be used to identify what property to use from the data that is added to generate the file
     * data in each row of the file will be in the order you pass here
     * @param {{fieldLength: number, dataField: string}[]} fileConfig 
    */
    function fileGenerator(fileConfig) {
        _classCallCheck(this, fileGenerator);

        var configGood = fileGenerator.checkInitConfig(fileConfig);
        if (configGood === false) {
            throw new Error(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* incorrectFileProps */]);
        }
        this.fileProps = fileConfig;
    }

    _createClass(fileGenerator, [{
        key: "_createPadding",
        value: function _createPadding(data, fieldLength) {
            var paddingToCreate = fieldLength - data.length;
            return " ".repeat(paddingToCreate);
        }
    }, {
        key: "_ensureString",
        value: function _ensureString(data) {
            if (typeof data === 'number') {
                return data.toString();
            } else if (typeof data === 'string') {
                return data;
            } else {
                throw new Error(__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* invalidDataType */]);
            }
        }
    }, {
        key: "_createRow",
        value: function _createRow(rowObj) {
            var _this = this;

            var row = "";
            this.fileProps.forEach(function (prop) {
                var fieldData = _this._ensureString(rowObj[prop.dataField]);
                var padding = _this._createPadding(fieldData, prop.fieldLength);
                row += padding + fieldData;
            });
            return row;
        }
        /**
         * Adds data to be placed in the generated file. Data should be an array of objects.
         * ensure the properties of the object match the dataField property of the constructor parimeter.
         * 
         * @param {object[]} data 
         */

    }, {
        key: "addData",
        value: function addData(data) {
            if (!this.fileData) {
                this.fileData = [];
            }
            this.fileData = this.fileData.concat(data);
        }
        /**
         * Generates the text file from the data that was provided to the addData method.
         * Once the file is generated it will prompt yoou for a filename and a location to save the file.
         * @param {string} fileName 
         */

    }, {
        key: "generateFile",
        value: function generateFile() {
            var _this2 = this;

            var fileDataPrepped = [];

            this.fileData.forEach(function (currentRow) {
                fileDataPrepped.push(_this2._createRow(currentRow));
            });

            var blobData = new Blob([fileDataPrepped.join("\r\n")], { type: "text/plain;charset=utf-8" });
            fileSaver.saveAs(blobData);
        }
    }], [{
        key: "checkInitConfig",
        value: function checkInitConfig(data) {
            try {
                var isFileSaverSupported = !!new Blob();
            } catch (e) {
                alert(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* noBlobError */]);
                propsGood = false;
            }
            if (!String.prototype.repeat) {
                alert(__WEBPACK_IMPORTED_MODULE_0__constants__["d" /* noStringRepet */]);
            }
            if (!Array.isArray(data)) {
                //not an array, it must be array
                return false;
            }
            var propsGood = true;
            data.some(function (item) {
                if (!item.fieldLength || !item.dataField) {
                    propsGood = false;
                    return true;
                }
            });
            return propsGood;
        }
    }]);

    return fileGenerator;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return noBlobError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return incorrectFileProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return invalidDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return noStringRepet; });
var noBlobError = "Blob functionality is not supported in this browser.";
var incorrectFileProps = "An array of objects must be provided to setup initial configuration of file generator. Please see jsDocs for fileGenerator class";
var invalidDataType = "Invalid data type, file generator only accepts strings or numbers.";
var noStringRepet = "The string repeat method is not available, please polyfill to continue.";

/***/ })
/******/ ]);
});