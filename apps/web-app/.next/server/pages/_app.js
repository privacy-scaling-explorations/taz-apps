/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/IdentityContextProvider.tsx":
/*!*********************************************!*\
  !*** ./context/IdentityContextProvider.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IdentityContextProvider\": () => (/* binding */ IdentityContextProvider),\n/* harmony export */   \"useIdentityContext\": () => (/* binding */ useIdentityContext),\n/* harmony export */   \"useIdentityLoginContext\": () => (/* binding */ useIdentityLoginContext)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_contextFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/contextFactory */ \"./context/helpers/contextFactory.ts\");\n\n\n\nconst [useIdentityContext, IdentityContext] = (0,_helpers_contextFactory__WEBPACK_IMPORTED_MODULE_2__.contextFactory)();\nconst [useIdentityLoginContext, IdentityLoginContext] = (0,_helpers_contextFactory__WEBPACK_IMPORTED_MODULE_2__.contextFactory)();\n\nconst getInitialIdentityValue = ()=>{\n    try {\n        if (false) {}\n        return \"\";\n    } catch  {\n        return \"\";\n    }\n};\nfunction IdentityContextProvider({ children  }) {\n    const { 0: identity , 1: setIdentity  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getInitialIdentityValue());\n    const onSetIdentity = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{\n        setIdentity(value);\n        window.localStorage.setItem(\"identity\", value);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(IdentityContext.Provider, {\n        value: identity,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(IdentityLoginContext.Provider, {\n            value: onSetIdentity,\n            children: children\n        }, void 0, false, {\n            fileName: \"/home/cedoor/Projects/Semaphore/TAZ/taz-apps/apps/web-app/context/IdentityContextProvider.tsx\",\n            lineNumber: 36,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/cedoor/Projects/Semaphore/TAZ/taz-apps/apps/web-app/context/IdentityContextProvider.tsx\",\n        lineNumber: 35,\n        columnNumber: 9\n    }, this);\n} // Context.Consumer and Context.Provider\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0lkZW50aXR5Q29udGV4dFByb3ZpZGVyLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQW9EO0FBQ0s7QUFJekQsTUFBTSxDQUFDSSxrQkFBa0IsRUFBRUMsZUFBZSxDQUFDLEdBQUdGLHVFQUFjLEVBQVk7QUFDeEUsTUFBTSxDQUFDRyx1QkFBdUIsRUFBRUMsb0JBQW9CLENBQUMsR0FBR0osdUVBQWMsRUFBNkI7QUFFN0M7QUFNdEQsTUFBTUssdUJBQXVCLEdBQUcsSUFBTTtJQUNsQyxJQUFJO1FBQ0EsSUFBSSxLQUE2QixFQUFFLEVBRWxDO1FBQ0QsT0FBTyxFQUFFO0lBQ2IsRUFBRSxPQUFNO1FBQ0osT0FBTyxFQUFFO0lBQ2IsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTSSx1QkFBdUIsQ0FBQyxFQUFFQyxRQUFRLEdBQWdDLEVBQUU7SUFDaEYsTUFBTSxLQUFDQyxRQUFRLE1BQUVDLFdBQVcsTUFBSWIsK0NBQVEsQ0FBV00sdUJBQXVCLEVBQUUsQ0FBQztJQUU3RSxNQUFNUSxhQUFhLEdBQUdmLGtEQUFXLENBQUMsQ0FBQ2dCLEtBQWUsR0FBSztRQUNuREYsV0FBVyxDQUFDRSxLQUFLLENBQUM7UUFDbEJSLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDUSxPQUFPLENBQUMsVUFBVSxFQUFFRCxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVOLHFCQUNJLDhEQUFDWixlQUFlLENBQUNjLFFBQVE7UUFBQ0YsS0FBSyxFQUFFSCxRQUFRO2tCQUNyQyw0RUFBQ1Asb0JBQW9CLENBQUNZLFFBQVE7WUFBQ0YsS0FBSyxFQUFFRCxhQUFhO3NCQUFHSCxRQUFROzs7OztnQkFBaUM7Ozs7O1lBQ3hFLENBQzlCO0FBQ0wsQ0FBQyxDQUVELHdDQUF3QyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1hcHAvLi9jb250ZXh0L0lkZW50aXR5Q29udGV4dFByb3ZpZGVyLnRzeD8zZjg5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgY29udGV4dEZhY3RvcnkgfSBmcm9tIFwiLi9oZWxwZXJzL2NvbnRleHRGYWN0b3J5XCJcblxuZXhwb3J0IHR5cGUgSWRlbnRpdHkgPSBzdHJpbmdcblxuY29uc3QgW3VzZUlkZW50aXR5Q29udGV4dCwgSWRlbnRpdHlDb250ZXh0XSA9IGNvbnRleHRGYWN0b3J5PElkZW50aXR5PigpXG5jb25zdCBbdXNlSWRlbnRpdHlMb2dpbkNvbnRleHQsIElkZW50aXR5TG9naW5Db250ZXh0XSA9IGNvbnRleHRGYWN0b3J5PCh2YWx1ZTogSWRlbnRpdHkpID0+IHZvaWQ+KClcblxuZXhwb3J0IHsgdXNlSWRlbnRpdHlDb250ZXh0LCB1c2VJZGVudGl0eUxvZ2luQ29udGV4dCB9XG5cbmV4cG9ydCB0eXBlIElkZW50aXR5Q29udGV4dFByb3ZpZGVyUHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZVxufVxuXG5jb25zdCBnZXRJbml0aWFsSWRlbnRpdHlWYWx1ZSA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkZW50aXR5XCIpIHx8IFwiXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIlxuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gXCJcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElkZW50aXR5Q29udGV4dFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogSWRlbnRpdHlDb250ZXh0UHJvdmlkZXJQcm9wcykge1xuICAgIGNvbnN0IFtpZGVudGl0eSwgc2V0SWRlbnRpdHldID0gdXNlU3RhdGU8SWRlbnRpdHk+KGdldEluaXRpYWxJZGVudGl0eVZhbHVlKCkpXG5cbiAgICBjb25zdCBvblNldElkZW50aXR5ID0gdXNlQ2FsbGJhY2soKHZhbHVlOiBJZGVudGl0eSkgPT4ge1xuICAgICAgICBzZXRJZGVudGl0eSh2YWx1ZSlcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRlbnRpdHlcIiwgdmFsdWUpXG4gICAgfSwgW10pXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8SWRlbnRpdHlDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtpZGVudGl0eX0+XG4gICAgICAgICAgICA8SWRlbnRpdHlMb2dpbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e29uU2V0SWRlbnRpdHl9PntjaGlsZHJlbn08L0lkZW50aXR5TG9naW5Db250ZXh0LlByb3ZpZGVyPlxuICAgICAgICA8L0lkZW50aXR5Q29udGV4dC5Qcm92aWRlcj5cbiAgICApXG59XG5cbi8vIENvbnRleHQuQ29uc3VtZXIgYW5kIENvbnRleHQuUHJvdmlkZXJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNhbGxiYWNrIiwidXNlU3RhdGUiLCJjb250ZXh0RmFjdG9yeSIsInVzZUlkZW50aXR5Q29udGV4dCIsIklkZW50aXR5Q29udGV4dCIsInVzZUlkZW50aXR5TG9naW5Db250ZXh0IiwiSWRlbnRpdHlMb2dpbkNvbnRleHQiLCJnZXRJbml0aWFsSWRlbnRpdHlWYWx1ZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJJZGVudGl0eUNvbnRleHRQcm92aWRlciIsImNoaWxkcmVuIiwiaWRlbnRpdHkiLCJzZXRJZGVudGl0eSIsIm9uU2V0SWRlbnRpdHkiLCJ2YWx1ZSIsInNldEl0ZW0iLCJQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/IdentityContextProvider.tsx\n");

/***/ }),

/***/ "./context/helpers/contextFactory.ts":
/*!*******************************************!*\
  !*** ./context/helpers/contextFactory.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"contextFactory\": () => (/* binding */ contextFactory)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * This context factory creates a new context and a method to consume it\n */ const contextFactory = ()=>{\n    // Create new context\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);\n    // Create the context consumer method\n    // If context value is undefined it means that either the context provider did not provide any value\n    // or the consumer was used outside of the provider. In both cases, an error will be thrown to indicate\n    // the the context is not consumer correctly\n    const useCtx = ()=>{\n        const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(context);\n        if (ctx === undefined) {\n            throw new Error(\"useContext must be used inside of a Provider with a value.\");\n        }\n        return ctx;\n    };\n    // Return a tuple with the method to consume the context and context\n    return [\n        useCtx,\n        context\n    ];\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L2hlbHBlcnMvY29udGV4dEZhY3RvcnkudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWlEO0FBRWpEOztDQUVDLEdBQ00sTUFBTUUsY0FBYyxHQUFHLElBQWdDO0lBQzFELHFCQUFxQjtJQUNyQixNQUFNQyxPQUFPLEdBQUdILG9EQUFhLENBQWdCSSxTQUFTLENBQUM7SUFDdkQscUNBQXFDO0lBQ3JDLG9HQUFvRztJQUNwRyx1R0FBdUc7SUFDdkcsNENBQTRDO0lBQzVDLE1BQU1DLE1BQU0sR0FBRyxJQUFNO1FBQ2pCLE1BQU1DLEdBQUcsR0FBR0wsaURBQVUsQ0FBQ0UsT0FBTyxDQUFDO1FBQy9CLElBQUlHLEdBQUcsS0FBS0YsU0FBUyxFQUFFO1lBQ25CLE1BQU0sSUFBSUcsS0FBSyxDQUFDLDREQUE0RCxDQUFDO1FBQ2pGLENBQUM7UUFDRCxPQUFPRCxHQUFHO0lBQ2QsQ0FBQztJQUVELG9FQUFvRTtJQUNwRSxPQUFPO1FBQUNELE1BQU07UUFBRUYsT0FBTztLQUFDLENBQVM7QUFDckMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1hcHAvLi9jb250ZXh0L2hlbHBlcnMvY29udGV4dEZhY3RvcnkudHM/MzM4MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCJcblxuLyoqXG4gKiBUaGlzIGNvbnRleHQgZmFjdG9yeSBjcmVhdGVzIGEgbmV3IGNvbnRleHQgYW5kIGEgbWV0aG9kIHRvIGNvbnN1bWUgaXRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHRGYWN0b3J5ID0gPEEgZXh0ZW5kcyB1bmtub3duIHwgbnVsbD4oKSA9PiB7XG4gICAgLy8gQ3JlYXRlIG5ldyBjb250ZXh0XG4gICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKVxuICAgIC8vIENyZWF0ZSB0aGUgY29udGV4dCBjb25zdW1lciBtZXRob2RcbiAgICAvLyBJZiBjb250ZXh0IHZhbHVlIGlzIHVuZGVmaW5lZCBpdCBtZWFucyB0aGF0IGVpdGhlciB0aGUgY29udGV4dCBwcm92aWRlciBkaWQgbm90IHByb3ZpZGUgYW55IHZhbHVlXG4gICAgLy8gb3IgdGhlIGNvbnN1bWVyIHdhcyB1c2VkIG91dHNpZGUgb2YgdGhlIHByb3ZpZGVyLiBJbiBib3RoIGNhc2VzLCBhbiBlcnJvciB3aWxsIGJlIHRocm93biB0byBpbmRpY2F0ZVxuICAgIC8vIHRoZSB0aGUgY29udGV4dCBpcyBub3QgY29uc3VtZXIgY29ycmVjdGx5XG4gICAgY29uc3QgdXNlQ3R4ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjdHggPSB1c2VDb250ZXh0KGNvbnRleHQpXG4gICAgICAgIGlmIChjdHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlQ29udGV4dCBtdXN0IGJlIHVzZWQgaW5zaWRlIG9mIGEgUHJvdmlkZXIgd2l0aCBhIHZhbHVlLlwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdHhcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSB0dXBsZSB3aXRoIHRoZSBtZXRob2QgdG8gY29uc3VtZSB0aGUgY29udGV4dCBhbmQgY29udGV4dFxuICAgIHJldHVybiBbdXNlQ3R4LCBjb250ZXh0XSBhcyBjb25zdFxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwiY29udGV4dEZhY3RvcnkiLCJjb250ZXh0IiwidW5kZWZpbmVkIiwidXNlQ3R4IiwiY3R4IiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/helpers/contextFactory.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_IdentityContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/IdentityContextProvider */ \"./context/IdentityContextProvider.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_drawingComponent_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/drawingComponent.css */ \"./styles/drawingComponent.css\");\n/* harmony import */ var _styles_drawingComponent_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_drawingComponent_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst MyApp = ({ Component , pageProps  })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_IdentityContextProvider__WEBPACK_IMPORTED_MODULE_1__.IdentityContextProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/home/cedoor/Projects/Semaphore/TAZ/taz-apps/apps/web-app/pages/_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/cedoor/Projects/Semaphore/TAZ/taz-apps/apps/web-app/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, undefined);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBRTRFO0FBQzlDO0FBQ1M7QUFFdkMsTUFBTUMsS0FBSyxHQUFHLENBQUMsRUFBRUMsU0FBUyxHQUFFQyxTQUFTLEdBQVksaUJBQzdDLDhEQUFDSCxxRkFBdUI7a0JBQ3BCLDRFQUFDRSxTQUFTO1lBQUUsR0FBR0MsU0FBUzs7Ozs7cUJBQUk7Ozs7O2lCQUNOO0FBRzlCLGlFQUFlRixLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLWFwcC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiXG5cbmltcG9ydCB7IElkZW50aXR5Q29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvSWRlbnRpdHlDb250ZXh0UHJvdmlkZXJcIlxuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCJcbmltcG9ydCBcIi4uL3N0eWxlcy9kcmF3aW5nQ29tcG9uZW50LmNzc1wiXG5cbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpID0+IChcbiAgICA8SWRlbnRpdHlDb250ZXh0UHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0lkZW50aXR5Q29udGV4dFByb3ZpZGVyPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sIm5hbWVzIjpbIklkZW50aXR5Q29udGV4dFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/drawingComponent.css":
/*!*************************************!*\
  !*** ./styles/drawingComponent.css ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();