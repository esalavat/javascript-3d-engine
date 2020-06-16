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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gameEngine.js":
/*!***************************!*\
  !*** ./src/gameEngine.js ***!
  \***************************/
/*! exports provided: GameEngine, Vertex3d, Triangle, Mesh, Matrix4x4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameEngine", function() { return GameEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vertex3d", function() { return Vertex3d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return Triangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix4x4", function() { return Matrix4x4; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameEngine = /*#__PURE__*/function () {
  function GameEngine(canvasId) {
    _classCallCheck(this, GameEngine);

    _defineProperty(this, "meshes", []);

    _defineProperty(this, "near", .1);

    _defineProperty(this, "far", 1000);

    _defineProperty(this, "fov", 90);

    _defineProperty(this, "lastRenderTime", Date.now());

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.screenHeight = this.canvas.height;
    this.screenWidth = this.canvas.width;
    this.camera = new Vertex3d(0, 0, 0);
    this.lightDir = new Vertex3d(1, -1, -1);
  }

  _createClass(GameEngine, [{
    key: "setFov",
    value: function setFov(near, far, fov) {
      this.near = near;
      this.far = far;
      this.fov = fov;
    }
  }, {
    key: "createProjectionMatrix",
    value: function createProjectionMatrix() {
      var aspectRatio = this.screenHeight / this.screenWidth;
      var fovRad = 1.0 / Math.tan(this.fov * 0.5 / 180.0 * 3.14159);
      var projectionMat = new Matrix4x4();
      projectionMat.m[0][0] = aspectRatio * fovRad;
      projectionMat.m[1][1] = fovRad;
      projectionMat.m[2][2] = this.far / (this.far - this.near);
      projectionMat.m[3][2] = -1 * this.far * this.near / (this.far - this.near);
      projectionMat.m[2][3] = 1.0;
      projectionMat.m[3][3] = 0;
      return projectionMat;
    } //i = Vertex3d, m = Matrix4x4

  }, {
    key: "multiplyMatrixVector",
    value: function multiplyMatrixVector(i, m) {
      var o = new Vertex3d();
      o.x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + m.m[3][0];
      o.y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + m.m[3][1];
      o.z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + m.m[3][2];
      var w = i.x * m.m[0][3] + i.y * m.m[1][3] + i.z * m.m[2][3] + m.m[3][3];

      if (w != 0.0) {
        o.x = o.x / w;
        o.y = o.y / w;
        o.z = o.z / w;
      }

      return o;
    }
  }, {
    key: "crossProduct",
    value: function crossProduct(vec1, vec2) {
      var returnVec = new Vertex3d();
      returnVec.x = vec1.y * vec2.z - vec1.z * vec2.y;
      returnVec.y = vec1.z * vec2.x - vec1.x * vec2.z;
      returnVec.z = vec1.x * vec2.y - vec1.y * vec2.x;
      return returnVec;
    }
  }, {
    key: "dotProduct",
    value: function dotProduct(vec1, vec2) {
      return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }
  }, {
    key: "drawTriangle",
    value: function drawTriangle(tri) {
      this.drawLine(tri.verticies[0].x, tri.verticies[0].y, tri.verticies[1].x, tri.verticies[1].y, tri.color);
      this.drawLine(tri.verticies[1].x, tri.verticies[1].y, tri.verticies[2].x, tri.verticies[2].y, tri.color);
      this.drawLine(tri.verticies[2].x, tri.verticies[2].y, tri.verticies[0].x, tri.verticies[0].y, tri.color);
    }
  }, {
    key: "fillTriangle",
    value: function fillTriangle(tri) {
      var x1 = tri.verticies[0].x;
      var y1 = tri.verticies[0].y;
      var x2 = tri.verticies[1].x;
      var y2 = tri.verticies[1].y;
      var x3 = tri.verticies[2].x;
      var y3 = tri.verticies[2].y;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.closePath();
      this.ctx.strokeStyle = tri.color;
      this.ctx.fillStyle = tri.color;
      this.ctx.fill();
    }
  }, {
    key: "drawLine",
    value: function drawLine(x1, y1, x2, y2, color) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    }
  }, {
    key: "start",
    value: function start() {
      this.drawLoop();
    }
  }, {
    key: "addMesh",
    value: function addMesh(mesh) {
      this.meshes.push(mesh);
    }
  }, {
    key: "sleep",
    value: function sleep(milliseconds) {
      var date = Date.now();
      var currentDate = null;

      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }
  }, {
    key: "drawLoop",
    value: function drawLoop() {
      requestAnimationFrame(this.drawLoop.bind(this));
      var now = Date.now();
      var elapsedTime = now - this.lastRenderTime; //clear the screen 

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var renderTris = [];
      var projMatrix = this.createProjectionMatrix();

      var _iterator = _createForOfIteratorHelper(this.meshes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mesh = _step.value;

          var _iterator2 = _createForOfIteratorHelper(mesh.tris),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _tri = _step2.value;
              //rotate
              var theta = .001 * elapsedTime;
              var matrixRotateZ = new Matrix4x4();
              matrixRotateZ.m[0][0] = Math.cos(theta);
              matrixRotateZ.m[0][1] = Math.sin(theta);
              matrixRotateZ.m[1][0] = Math.sin(theta) * -1;
              matrixRotateZ.m[1][1] = Math.cos(theta);
              matrixRotateZ.m[2][2] = 1;
              matrixRotateZ.m[3][3] = 1;
              var matrixRotateX = new Matrix4x4();
              matrixRotateX.m[0][0] = 1;
              matrixRotateX.m[1][1] = Math.cos(theta * .45);
              matrixRotateX.m[1][2] = Math.sin(theta * .45);
              matrixRotateX.m[2][1] = Math.sin(theta * .45) * -1;
              matrixRotateX.m[2][2] = Math.cos(theta * .45);
              matrixRotateX.m[3][3] = 1;
              var rotatedTri = new Triangle();
              rotatedTri.verticies[0] = this.multiplyMatrixVector(_tri.verticies[0], matrixRotateZ);
              rotatedTri.verticies[1] = this.multiplyMatrixVector(_tri.verticies[1], matrixRotateZ);
              rotatedTri.verticies[2] = this.multiplyMatrixVector(_tri.verticies[2], matrixRotateZ);
              rotatedTri.verticies[0] = this.multiplyMatrixVector(rotatedTri.verticies[0], matrixRotateX);
              rotatedTri.verticies[1] = this.multiplyMatrixVector(rotatedTri.verticies[1], matrixRotateX);
              rotatedTri.verticies[2] = this.multiplyMatrixVector(rotatedTri.verticies[2], matrixRotateX); //translate

              var translatedTri = new Triangle();
              translatedTri.copy(rotatedTri);
              translatedTri.verticies[0].z += 3;
              translatedTri.verticies[1].z += 3;
              translatedTri.verticies[2].z += 3; //create normal

              var line1 = new Vertex3d();
              var line2 = new Vertex3d();
              line1.x = translatedTri.verticies[1].x - translatedTri.verticies[0].x;
              line1.y = translatedTri.verticies[1].y - translatedTri.verticies[0].y;
              line1.z = translatedTri.verticies[1].z - translatedTri.verticies[0].z;
              line2.x = translatedTri.verticies[2].x - translatedTri.verticies[0].x;
              line2.y = translatedTri.verticies[2].y - translatedTri.verticies[0].y;
              line2.z = translatedTri.verticies[2].z - translatedTri.verticies[0].z;
              var normal = this.crossProduct(line1, line2);
              var l = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
              normal.x = normal.x / l;
              normal.y = normal.y / l;
              normal.z = normal.z / l;

              if (normal.x * (translatedTri.verticies[0].x - this.camera.x) + normal.y * (translatedTri.verticies[0].y - this.camera.y) + normal.z * (translatedTri.verticies[0].z - this.camera.z) < 0) {
                //figure out shading
                var color = this.getColor(mesh.color, this.getShading(normal)); //Perspective projection 

                var projTri = new Triangle(this.multiplyMatrixVector(translatedTri.verticies[0], projMatrix), this.multiplyMatrixVector(translatedTri.verticies[1], projMatrix), this.multiplyMatrixVector(translatedTri.verticies[2], projMatrix), color); //scale to screen coordinates

                projTri.verticies[0].x += 1;
                projTri.verticies[0].y += 1;
                projTri.verticies[1].x += 1;
                projTri.verticies[1].y += 1;
                projTri.verticies[2].x += 1;
                projTri.verticies[2].y += 1;
                projTri.verticies[0].x *= .5 * this.screenWidth;
                projTri.verticies[0].y *= .5 * this.screenHeight;
                projTri.verticies[1].x *= .5 * this.screenWidth;
                projTri.verticies[1].y *= .5 * this.screenHeight;
                projTri.verticies[2].x *= .5 * this.screenWidth;
                projTri.verticies[2].y *= .5 * this.screenHeight;
                renderTris.push(projTri);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      renderTris.sort(function (a, b) {
        var aZ = (a.verticies[0].z + a.verticies[1].z + a.verticies[2].z) / 3.0;
        var bZ = (b.verticies[0].z + b.verticies[1].z + b.verticies[2].z) / 3.0;
        return bZ - aZ;
      });

      for (var _i = 0, _renderTris = renderTris; _i < _renderTris.length; _i++) {
        var tri = _renderTris[_i];
        this.fillTriangle(tri); //draw wireframe
        //tri.color = "#000000";
        //this.drawTriangle(tri);
      } //this.fixAntialiasing()

    }
  }, {
    key: "getShading",
    value: function getShading(normal) {
      var l = Math.sqrt(this.lightDir.x * this.lightDir.x + this.lightDir.y * this.lightDir.y + this.lightDir.z * this.lightDir.z);
      var lightNormalized = new Vertex3d();
      lightNormalized.x = this.lightDir.x / l;
      lightNormalized.y = this.lightDir.y / l;
      lightNormalized.z = this.lightDir.z / l;
      var dp = this.dotProduct(lightNormalized, normal);
      return dp;
    }
  }, {
    key: "getColor",
    value: function getColor(fullColor, lum) {
      var minPercent = .3;
      var red = (fullColor.r - fullColor.r * minPercent) * lum + fullColor.r * minPercent;
      var green = (fullColor.g - fullColor.g * minPercent) * lum + fullColor.g * minPercent;
      var blue = (fullColor.b - fullColor.b * minPercent) * lum + fullColor.b * minPercent;
      return "rgb(" + red + "," + green + "," + blue + ")";
    }
  }, {
    key: "fixAntialiasing",
    value: function fixAntialiasing() {
      var imageData = this.ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);

      for (var i = 0; i != imageData.data.length; i++) {
        if (imageData.data[i] != 0x00) imageData.data[i] = 0xFF;
      }

      this.ctx.putImageData(imageData, 0, 0);
    }
  }]);

  return GameEngine;
}();

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function () {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
    /* function FrameRequestCallback */
    callback,
    /* DOMElement Element */
    element) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();
}

var Vertex3d = function Vertex3d(x, y, z) {
  _classCallCheck(this, Vertex3d);

  _defineProperty(this, "x", void 0);

  _defineProperty(this, "y", void 0);

  _defineProperty(this, "z", void 0);

  this.x = x;
  this.y = y;
  this.z = z;
};

var Triangle = /*#__PURE__*/function () {
  function Triangle(vertex1, vertex2, vertex3, color) {
    _classCallCheck(this, Triangle);

    _defineProperty(this, "verticies", []);

    _defineProperty(this, "color", "#ffffff");

    this.verticies[0] = vertex1;
    this.verticies[1] = vertex2;
    this.verticies[2] = vertex3;
    this.color = color;
  }

  _createClass(Triangle, [{
    key: "copy",
    value: function copy(tri) {
      var vert1 = new Vertex3d();
      var vert2 = new Vertex3d();
      var vert3 = new Vertex3d();
      vert1.x = tri.verticies[0].x;
      vert2.x = tri.verticies[1].x;
      vert3.x = tri.verticies[2].x;
      vert1.y = tri.verticies[0].y;
      vert2.y = tri.verticies[1].y;
      vert3.y = tri.verticies[2].y;
      vert1.z = tri.verticies[0].z;
      vert2.z = tri.verticies[1].z;
      vert3.z = tri.verticies[2].z;
      this.verticies[0] = vert1;
      this.verticies[1] = vert2;
      this.verticies[2] = vert3;
      this.color = tri.color;
    }
  }]);

  return Triangle;
}();

var Mesh = /*#__PURE__*/function () {
  function Mesh(tris, color) {
    _classCallCheck(this, Mesh);

    _defineProperty(this, "tris", []);

    _defineProperty(this, "color", "#ffffff");

    this.tris = tris;
    this.color = color;
  }

  _createClass(Mesh, [{
    key: "loadFromObj",
    value: function loadFromObj(objdata, invertY) {
      var lines = objdata.split("\n");
      var verticies = [];
      var tris = [];

      var _iterator3 = _createForOfIteratorHelper(lines),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var line = _step3.value;
          var lineSplit = line.split(" ");

          if (lineSplit[0] == "v") {
            var vertex = new Vertex3d();
            vertex.x = lineSplit[1];
            vertex.y = lineSplit[2];
            vertex.z = lineSplit[3]; //if(invertY) { vertex.y = vertex.y * -1 }

            verticies.push(vertex);
          }

          if (lineSplit[0] == "f") {
            var tri = new Triangle();
            tri.verticies[0] = verticies[lineSplit[1] - 1];
            tri.verticies[1] = verticies[lineSplit[2] - 1];
            tri.verticies[2] = verticies[lineSplit[3] - 1];
            tris.push(tri);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.tris = tris;
    }
  }]);

  return Mesh;
}();

var Matrix4x4 = function Matrix4x4() {
  _classCallCheck(this, Matrix4x4);

  _defineProperty(this, "m", []);

  for (var i = 0; i < 4; i++) {
    var col = [];

    for (var j = 0; j < 4; j++) {
      col[j] = 0;
    }

    this.m[i] = col;
  }
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameEngine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameEngine.js */ "./src/gameEngine.js");

$(function () {
  var meshUrl = '/assets/Salavatcioglu2.obj';
  window.Game = {
    controls: {
      turnLeft: false,
      turnRight: false,
      forward: false,
      back: false,
      left: false,
      right: false
    }
  }; //reference canvas

  var ge = new _gameEngine_js__WEBPACK_IMPORTED_MODULE_0__["GameEngine"]("screen1"); //get obj

  fetch(meshUrl).then(function (response) {
    return response.text();
  }).then(function (data) {
    var mesh = new _gameEngine_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"]();
    mesh.loadFromObj(data, true);
    mesh.color = {
      r: 100,
      g: 100,
      b: 255
    };
    console.log(mesh);
    ge.addMesh(mesh);
    ge.start();
  });
});
var lastTime = Date.now();

function drawLoop() {
  requestAnimationFrame(drawLoop);
  var now = Date.now();
  var elapsedTime = now - lastTime; //clear the screen 

  ctx1.clearRect(0, 0, c1.width, c1.height); //draw top down
  //change variables for next frame

  if (Game.controls.turnLeft) {
    Game.player.direction -= Game.player.turnSpeed * elapsedTime;
  }

  if (Game.controls.turnRight) {
    Game.player.direction += Game.player.turnSpeed * elapsedTime;
  }

  if (Game.controls.left) {
    Game.player.x += Math.sin(Game.player.direction);
    Game.player.y -= Math.cos(Game.player.direction);
  }

  if (Game.controls.right) {
    Game.player.x -= Math.sin(Game.player.direction);
    Game.player.y += Math.cos(Game.player.direction);
  }

  if (Game.controls.forward) {
    Game.player.x += Math.cos(Game.player.direction);
    Game.player.y += Math.sin(Game.player.direction);
  }

  if (Game.controls.back) {
    Game.player.x -= Math.cos(Game.player.direction);
    Game.player.y -= Math.sin(Game.player.direction);
  }

  lastTime = now;
}

function FNcross(x1, y1, x2, y2) {
  return x1 * y2 - x2 * y1;
}

function Intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  var x = FNcross(x1, y1, x2, y2);
  var y = FNcross(x3, y3, x4, y4);
  var det = FNcross(x1 - x2, y1 - y2, x3 - x4, y3 - y4);
  x = FNcross(x, x1 - x2, y, x3 - x4) / det;
  y = FNcross(x, y1 - y2, y, y3 - y4) / det;
  return {
    x: x,
    y: y
  };
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function () {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
    /* function FrameRequestCallback */
    callback,
    /* DOMElement Element */
    element) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();
}

window.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
      // left arrow
      Game.controls.turnLeft = true;
      break;

    case 38:
      // up arrow
      Game.controls.forward = true;
      break;

    case 39:
      // right arrow
      Game.controls.turnRight = true;
      break;

    case 40:
      // down arrow
      Game.controls.back = true;
      break;

    case 81:
      // q
      Game.controls.left = true;
      break;

    case 69:
      // e
      Game.controls.right = true;
      break;
  }
}, false);
window.addEventListener("keyup", function (e) {
  switch (e.keyCode) {
    case 37:
      // left arrow
      Game.controls.turnLeft = false;
      break;

    case 38:
      // up arrow
      Game.controls.forward = false;
      break;

    case 39:
      // right arrow
      Game.controls.turnRight = false;
      break;

    case 40:
      // down arrow
      Game.controls.back = false;
      break;

    case 81:
      // q
      Game.controls.left = false;
      break;

    case 69:
      // e
      Game.controls.right = false;
      break;
  }
}, false);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map