/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/draw.ts":
/*!*********************!*\
  !*** ./src/draw.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"draw\": () => (/* binding */ draw)\n/* harmony export */ });\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n\n\nconst backgroundImage = new Image();\nbackgroundImage.src = 'assets/bg.png';\nlet gameOverFlag = false; // a flag to indicate if the game is over\nfunction draw(bird, ctx) {\n    if (gameOverFlag) {\n        // stop the game loop if the game is over\n        return;\n    }\n    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n    drawBackground(ctx);\n    drawBird(bird, ctx);\n    drawColumns(bird, ctx);\n    detectCollisions(bird, ctx);\n    updateScore(bird);\n    drawScore(bird, ctx);\n    drawHighestScore(ctx);\n    moveColumns(ctx, _main__WEBPACK_IMPORTED_MODULE_1__.columns);\n}\nfunction drawBird(bird, ctx) {\n    // Update the bird's position based on its velocity\n    if (bird.velocity < 2) {\n        bird.velocity += 0.1;\n    }\n    bird.y += bird.velocity;\n    ctx.save(); // save the current canvas state\n    ctx.translate(bird.x + 25, bird.y + 25); // move the origin to the center of the bird\n    if (bird.velocity >= 0) {\n        // If the bird is falling or not moving, rotate clockwise\n        ctx.rotate(((Math.PI / 3) * bird.velocity) / 5);\n    }\n    else {\n        // If the bird is jumping, rotate counter-clockwise\n        ctx.rotate(-Math.PI / 4);\n    }\n    ctx.drawImage(bird.image, -25, -25, 50, 50); // draw the bird at the new origin\n    ctx.restore(); // restore the saved canvas state\n}\nfunction drawColumns(bird, ctx) {\n    const canvas = ctx.canvas;\n    for (const column of _main__WEBPACK_IMPORTED_MODULE_1__.columns) {\n        // Draw the bottom of the column\n        ctx.fillStyle = 'black';\n        ctx.fillRect(column.x, column.y, column.width, column.height);\n        if (column.y + column.height === canvas.height) {\n            ctx.fillStyle = \"#006400\"; // dark green color\n            ctx.fillRect(column.x, column.y, column.width, 50);\n        }\n        else {\n            ctx.fillStyle = \"#006400\"; // dark green color\n            ctx.fillRect(column.x, column.height - 50, column.width, 50);\n        }\n    }\n}\nlet backgroundX = 0;\nconst backgroundSpeed = 2;\nfunction drawBackground(ctx) {\n    // Move the background image to the left\n    backgroundX -= backgroundSpeed;\n    // If the background image has scrolled all the way to the left, reset its position\n    if (backgroundX <= -backgroundImage.width) {\n        backgroundX = 0;\n    }\n    // Draw the background image on the canvas\n    ctx.drawImage(backgroundImage, backgroundX, 0);\n    // Draw a second copy of the background image to the right of the first copy\n    ctx.drawImage(backgroundImage, backgroundX + backgroundImage.width, 0);\n}\nfunction detectCollisions(bird, ctx) {\n    const canvas = ctx.canvas;\n    const birdBox = { x: bird.x, y: bird.y - 4, width: 50, height: 50 };\n    for (const column of _main__WEBPACK_IMPORTED_MODULE_1__.columns) {\n        const columnBox = {\n            x: column.x,\n            y: column.y,\n            width: column.width,\n            height: column.height\n        };\n        if (isOverlap(birdBox, columnBox)) {\n            gameOver(bird);\n            return;\n        }\n    }\n}\nfunction isOverlap(rect1, rect2) {\n    return (rect1.x < rect2.x + rect2.width &&\n        rect1.x + rect1.width > rect2.x &&\n        rect1.y < rect2.y + rect2.height &&\n        rect1.y + rect1.height > rect2.y);\n}\n// Game over functionality\nfunction gameOver(bird) {\n    gameOverFlag = true;\n    alert(`Game over! Your score was ${bird.score}.`);\n    // Update the highest score if the bird's score is higher\n    if (bird.score > _main__WEBPACK_IMPORTED_MODULE_1__.highestScore) {\n        console.log('high score', _main__WEBPACK_IMPORTED_MODULE_1__.highestScore);\n        localStorage.setItem('highestScore', _main__WEBPACK_IMPORTED_MODULE_1__.highestScore.toString());\n    }\n    location.reload(); // Refresh the page to restart the game\n}\nfunction moveColumns(ctx, columns) {\n    for (const column of columns) {\n        column.x -= 5; // Move the column to the left by 5 pixels\n        // If the column has gone off the left side of the canvas, remove it from the columns array and generate a new column to replace it\n        if (column.x + column.width < 0) {\n            const index = columns.indexOf(column);\n            columns.splice(index, 1);\n            (0,_helper__WEBPACK_IMPORTED_MODULE_0__.generateColumns)(ctx, columns, 1);\n        }\n    }\n}\n// Check if the bird has passed a column and increase its score\nfunction updateScore(bird) {\n    for (const column of _main__WEBPACK_IMPORTED_MODULE_1__.columns) {\n        if (column.x + column.width < bird.x && !column.scored) {\n            bird.score += 1;\n            column.scored = true;\n        }\n    }\n}\n// Draw the current score in the top-left corner of the canvas\nfunction drawScore(bird, ctx) {\n    ctx.font = '24px Arial';\n    ctx.fillStyle = '#49e349';\n    ctx.fillText(`Score: ${bird.score}`, 10, 30);\n}\nfunction drawHighestScore(ctx) {\n    const canvas = ctx.canvas;\n    ctx.font = '24px Arial';\n    ctx.fillStyle = '#53b053';\n    ctx.fillText(`Highest Score: ${_main__WEBPACK_IMPORTED_MODULE_1__.highestScore}`, 10, 50);\n}\n\n\n//# sourceURL=webpack:///./src/draw.ts?");

/***/ }),

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateColumns\": () => (/* binding */ generateColumns)\n/* harmony export */ });\nfunction generateColumns(ctx, columns, numColumns) {\n    const canvas = ctx.canvas;\n    const minGap = 150;\n    const maxGap = 250;\n    const minWidth = 50;\n    const maxWidth = 70;\n    const minHeight = 50;\n    const maxHeight = 150;\n    for (let i = 0; i < numColumns; i++) {\n        const gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;\n        const height1 = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;\n        const height2 = canvas.height - height1 - gap;\n        const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);\n        const x = columns.length > 0 ? columns[columns.length - 1].x + 150 : 0; // Start each column after the previous one, or at x-coordinate 0 if there are no previous columns\n        const column1 = { x, y: 0, width, height: height1, gap, scored: false };\n        const column2 = { x, y: height1 + gap, width, height: height2, gap, scored: false };\n        columns.push(column1, column2);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/helper.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"columns\": () => (/* binding */ columns),\n/* harmony export */   \"highestScore\": () => (/* binding */ highestScore)\n/* harmony export */ });\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw */ \"./src/draw.ts\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/helper.ts\");\n\n\nconst canvas = document.getElementById('gameCanvas');\nconst highestScore = parseInt(localStorage.getItem(\"highestScore\") || '0');\n// Get the canvas context\nconst ctx = canvas.getContext('2d');\nlet columns = [];\n(0,_helper__WEBPACK_IMPORTED_MODULE_1__.generateColumns)(ctx, columns, 10);\n// Define the bird image\nconst birdImage = new Image();\nbirdImage.src = 'assets/bird.png';\nconst bird = {\n    x: 200,\n    y: 100,\n    velocity: 2,\n    score: 0,\n    image: birdImage\n};\ncolumns = columns.filter(col => col.x > bird.x + 200);\n// Set up the game loop\nconst fps = 60;\nconst interval = 1000 / fps;\nlet lastUpdateTime = 0;\nfunction gameLoop(timestamp) {\n    // Calculate the time since the last update\n    const elapsed = timestamp - lastUpdateTime;\n    // Only update the game if enough time has elapsed\n    if (elapsed > interval) {\n        // Update the game logic here\n        // Render the game\n        (0,_draw__WEBPACK_IMPORTED_MODULE_0__.draw)(bird, ctx);\n        // Update the last update time\n        lastUpdateTime = timestamp - (elapsed % interval);\n    }\n    // Call the game loop again on the next frame\n    requestAnimationFrame(gameLoop);\n}\n// Start the game loop\nrequestAnimationFrame(gameLoop);\ndocument.addEventListener('keydown', function (event) {\n    if (event.code === 'Space') {\n        bird.velocity -= 3;\n        //bird.x += 5;\n    }\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;