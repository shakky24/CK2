/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 69548:
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extractRoutes: () => (/* binding */ extractRoutes),
/* harmony export */   renderApplication: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.renderApplication),
/* harmony export */   renderModule: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.renderModule),
/* harmony export */   "ɵSERVER_CONTEXT": () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__["ɵSERVER_CONTEXT"])
/* harmony export */ });
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/node */ 47892);
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/ssr */ 51340);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ 63248);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:fs */ 80662);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:path */ 18864);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_main_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/main.server */ 99532);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-server */ 82792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 75388);







// The Express app is exported so that it can be used by serverless Functions.
function app() {
  const server = express__WEBPACK_IMPORTED_MODULE_2__();
  const distFolder = (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(process.cwd(), 'dist/app-sample/browser');
  const indexHtml = (0,node_fs__WEBPACK_IMPORTED_MODULE_3__.existsSync)((0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.original.html')) ? (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.original.html') : (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.html');
  const commonEngine = new _angular_ssr__WEBPACK_IMPORTED_MODULE_1__.CommonEngine();
  server.set('view engine', 'html');
  server.set('views', distFolder);
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express__WEBPACK_IMPORTED_MODULE_2__["static"](distFolder, {
    maxAge: '1y'
  }));
  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const {
      protocol,
      originalUrl,
      baseUrl,
      headers
    } = req;
    commonEngine.render({
      bootstrap: _src_main_server__WEBPACK_IMPORTED_MODULE_5__["default"],
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: distFolder,
      providers: [{
        provide: _angular_common__WEBPACK_IMPORTED_MODULE_6__.APP_BASE_HREF,
        useValue: baseUrl
      }]
    }).then(html => res.send(html)).catch(err => next(err));
  });
  return server;
}
function run() {
  const port = process.env['PORT'] || 2000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
const mainModule = require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_main_server__WEBPACK_IMPORTED_MODULE_5__["default"]);

  // EXPORTS added by @angular-devkit/build-angular
  
  /**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



async function* getRoutesFromRouterConfig(routes, compiler, parentInjector, parentRoute = '') {
    for (const route of routes) {
        const { path, redirectTo, loadChildren, children } = route;
        if (path === undefined) {
            continue;
        }
        const currentRoutePath = buildRoutePath(parentRoute, path);
        if (redirectTo !== undefined) {
            // TODO: handle `redirectTo`.
            yield { route: currentRoutePath, success: false, redirect: true };
            continue;
        }
        if (/[:*]/.test(path)) {
            // TODO: handle parameterized routes population.
            yield { route: currentRoutePath, success: false, redirect: false };
            continue;
        }
        yield { route: currentRoutePath, success: true, redirect: false };
        if (children?.length) {
            yield* getRoutesFromRouterConfig(children, compiler, parentInjector, currentRoutePath);
        }
        if (loadChildren) {
            const loadedChildRoutes = await (0,_angular_router__WEBPACK_IMPORTED_MODULE_8__["ɵloadChildren"])(route, compiler, parentInjector).toPromise();
            if (loadedChildRoutes) {
                const { routes: childRoutes, injector = parentInjector } = loadedChildRoutes;
                yield* getRoutesFromRouterConfig(childRoutes, compiler, injector, currentRoutePath);
            }
        }
    }
}
async function* extractRoutes(bootstrapAppFnOrModule, document) {
    const platformRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.createPlatformFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_9__.platformCore, 'server', [
        {
            provide: _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.INITIAL_CONFIG,
            useValue: { document, url: '' },
        },
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵConsole"],
            /** An Angular Console Provider that does not print a set of predefined logs. */
            useFactory: () => {
                class Console extends _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵConsole"] {
                    ignoredLogs = new Set(['Angular is running in development mode.']);
                    log(message) {
                        if (!this.ignoredLogs.has(message)) {
                            super.log(message);
                        }
                    }
                }
                return new Console();
            },
        },
        ..._angular_platform_server__WEBPACK_IMPORTED_MODULE_7__["ɵINTERNAL_SERVER_PLATFORM_PROVIDERS"],
    ])();
    try {
        let applicationRef;
        if (isBootstrapFn(bootstrapAppFnOrModule)) {
            applicationRef = await bootstrapAppFnOrModule();
        }
        else {
            const moduleRef = await platformRef.bootstrapModule(bootstrapAppFnOrModule);
            applicationRef = moduleRef.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_9__.ApplicationRef);
        }
        // Wait until the application is stable.
        await (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵwhenStable"])(applicationRef);
        const injector = applicationRef.injector;
        const router = injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router);
        if (router.config.length === 0) {
            // In case there are no routes available
            yield { route: '', success: true, redirect: false };
        }
        else {
            const compiler = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_9__.Compiler);
            // Extract all the routes from the config.
            yield* getRoutesFromRouterConfig(router.config, compiler, injector);
        }
    }
    finally {
        platformRef.destroy();
    }
}
function isBootstrapFn(value) {
    // We can differentiate between a module and a bootstrap function by reading compiler-generated `ɵmod` static property:
    return typeof value === 'function' && !('ɵmod' in value);
}
function buildRoutePath(...routeParts) {
    return routeParts.filter(Boolean).join('/');
}


/***/ }),

/***/ 23372:
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutComponent: () => (/* binding */ AboutComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 75388);




class AboutComponent {
  constructor(router) {
    this.router = router;
  }
  clickHome() {
    this.router.navigate(['']);
  }
  static #_ = this.ɵfac = function AboutComponent_Factory(t) {
    return new (t || AboutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AboutComponent,
    selectors: [["app-about"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 28,
    vars: 0,
    consts: [[1, "about-us-container"], [2, "display", "grid", "justify-content", "end"], [2, "text-align", "center", "font-family", "Jost", "font-size", "1.5rem", "cursor", "pointer", ";padding", ".8rem", "border-radius", "12px", "display", "grid", "background-color", "#333", "justify-content", "start", 3, "click"], ["src", "assets/images/au.jpg", "alt", "", 2, "height", "100%", "width", "100%", "border-radius", "12px", "margin", ".4rem 0"], [1, "main-content"], [1, "about-us-section"], [2, "color", "rgb(154, 153, 153)", ";text-align", "left", "font-size", "1rem", "line-height", "1.5", "font-weight", "300", "letter-spacing", ".5px"], [2, "display", "grid", "color", "rgb(154, 153, 153)", "margin", "1rem 1rem", "text-align", "left", "font-size", "1rem", "line-height", "1.5", "font-weight", "300", "letter-spacing", ".4px"]],
    template: function AboutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AboutComponent_Template_header_click_2_listener() {
          return ctx.clickHome();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "section", 4)(7, "div", 5)(8, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "About Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Welcome to Cinema Kompany, a cinematic powerhouse founded in 2011 by Harikrishnan R and Creative Director Avinash G Nair. Formerly known as BOOM Cinemaz, our brand has earned widespread acclaim for successfully promoting over 18 films in Malayalam and Tamil. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br")(14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " In 2024, BOOM Cinemaz took a bold step forward by merging with DIB Global's sister concern, DIB Global Entertainments. This strategic alliance sparked a transformative rebranding initiative, giving birth to Cinema Kompany. As an essential part of DIB Global Entertainments, we are dedicated to revolutionizing the entertainment landscape. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br")(17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Cinema Kompany is set to make waves in the OTT platform space, with exciting plans to deliver captivating, intimate content that resonates with our discerning audience. We're thrilled to announce the upcoming launch of our YouTube entertainment channel by mid-next year. This channel will be a vibrant hub for short films, unplugged performances, and engaging content, all curated under the creative direction of award-winning writer Arun Sukumaran Nair. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br")(20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " DIB Global, through Cinema Kompany, is not only synonymous with cinematic excellence but also a dominant force in movie charting for theaters in Kollam. Our operations are expanding, reaching every corner of Kerala\u2019s dynamic entertainment landscape. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "br")(23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Join us as we continue to shape the future of entertainment, blending creativity, innovation, and an unwavering passion for storytelling. Welcome to Cinema Kompany, where every frame tells a compelling story with unmatched professionalism and dedication. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "br")(26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Contact us @ info@cinemakompany.com ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
    },
    dependencies: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIcon],
    styles: ["\n\n\n\n.about-us-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n\n\n.header[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: #fff;\n  padding: 20px;\n  text-align: center;\n}\n\n\n\n.main-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  margin-top: 20px;\n}\n\n\n\n.about-us-section[_ngcontent-%COMP%] {\n  background-color: transparent;\n  padding: 0 20px;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n.about-us-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #ffffff;\n  margin-bottom: 10px;\n}\n\n.about-us-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #dedede;\n}\n\n\n\n.footer[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: #fff;\n  padding: 10px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkJBQUE7QUFFQSxjQUFBO0FBQ0E7RUFDSSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0FBQUo7O0FBR0UsV0FBQTtBQUNBO0VBQ0Usc0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0UsaUJBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSwwQkFBQTtFQUVBLGdCQUFBO0FBREo7O0FBSUUscUJBQUE7QUFDQTtFQUNFLDZCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUNBQUE7QUFESjs7QUFJRTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQURKOztBQUlFO0VBQ0UsY0FBQTtBQURKOztBQUlFLFdBQUE7QUFDQTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQURKIiwic291cmNlc0NvbnRlbnQiOlsiLyogYWJvdXQtdXMuY29tcG9uZW50LmNzcyAqL1xyXG5cclxuLyogQ29udGFpbmVyICovXHJcbi5hYm91dC11cy1jb250YWluZXIge1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIEhlYWRlciAqL1xyXG4gIC5oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLyogTWFpbiBDb250ZW50ICovXHJcbiAgLm1haW4tY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICAvLyBnYXA6IDIwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIH1cclxuICBcclxuICAvKiBBYm91dCBVcyBTZWN0aW9uICovXHJcbiAgLmFib3V0LXVzLXNlY3Rpb24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICBwYWRkaW5nOiAwIDIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxuICBcclxuICAuYWJvdXQtdXMtc2VjdGlvbiBoMiB7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5hYm91dC11cy1zZWN0aW9uIHAge1xyXG4gICAgY29sb3I6ICNkZWRlZGU7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIEZvb3RlciAqL1xyXG4gIC5mb290ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 21248:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule),
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about/about.component */ 23372);
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-page/home-page.component */ 60328);
/* harmony import */ var _news_news_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./news/news.component */ 62456);
/* harmony import */ var _news_single_news_single_news_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news/single-news/single-news.component */ 88144);
/* harmony import */ var _page1_page1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page1/page1.component */ 97660);
/* harmony import */ var _page2_page2_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page2/page2.component */ 3604);
/* harmony import */ var _review_review_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./review/review.component */ 6448);
/* harmony import */ var _review_reviewsinglemovie_reviewsinglemovie_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./review/reviewsinglemovie/reviewsinglemovie.component */ 27212);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 68308);











const routes = [{
  path: 'page1',
  component: _page1_page1_component__WEBPACK_IMPORTED_MODULE_4__.Page1Component
}, {
  path: 'page2',
  component: _page2_page2_component__WEBPACK_IMPORTED_MODULE_5__.Page2Component
}, {
  path: 'news',
  component: _news_news_component__WEBPACK_IMPORTED_MODULE_2__.NewsComponent
}, {
  path: '',
  component: _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_1__.HomePageComponent
}, {
  path: 'news/:movie_id',
  component: _news_single_news_single_news_component__WEBPACK_IMPORTED_MODULE_3__.SingleNewsComponent
}, {
  path: 'about',
  component: _about_about_component__WEBPACK_IMPORTED_MODULE_0__.AboutComponent
}, {
  path: 'reviews',
  component: _review_review_component__WEBPACK_IMPORTED_MODULE_6__.ReviewComponent
}, {
  path: 'reviews/:movie_id',
  component: _review_reviewsinglemovie_reviewsinglemovie_component__WEBPACK_IMPORTED_MODULE_7__.ReviewsinglemovieComponent
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
  });
})();

/***/ }),

/***/ 81164:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/footer/footer.component */ 48816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 68308);




class AppComponent {
  constructor() {
    this.title = 'app-sample';
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 5,
    vars: 0,
    consts: [[2, "display", "grid"], [2, "display", "grid", ";grid-template-rows", "0 auto"], [1, "footer-wrapper"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_0__.FooterComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 43936:
/*!**************************************!*\
  !*** ./src/app/app.config.server.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-server */ 82792);
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.config */ 47948);



const serverConfig = {
  providers: [(0,_angular_platform_server__WEBPACK_IMPORTED_MODULE_1__.provideServerRendering)()]
};
const config = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.mergeApplicationConfig)(_app_config__WEBPACK_IMPORTED_MODULE_0__.appConfig, serverConfig);

/***/ }),

/***/ 47948:
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ 71856);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 21248);




const appConfig = {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_1__.provideRouter)(_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.routes), (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.provideClientHydration)(), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.provideAnimations)()]
};

/***/ }),

/***/ 70849:
/*!************************************!*\
  !*** ./src/app/constants/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAIN_MENU_ITEMS: () => (/* binding */ MAIN_MENU_ITEMS)
/* harmony export */ });
const MAIN_MENU_ITEMS = [{
  id: 1,
  text: 'Overview',
  route: '/dashboard',
  icon: 'chrome_reader_mode'
}, {
  id: 2,
  text: 'Savings Bank',
  route: '/dashboard',
  icon: 'account_box',
  children: [{
    id: 11,
    text: 'Account Info',
    route: '/accounts/info',
    icon: "local_hospital",
    color: "#b5d5c8"
    // }, {
    // 	id: 12,
    // 	text: 'Manage Accounts',
    // 	route: '/accounts/manage',
    // 	icon: "tag_faces",
    // 	color: "#f2ebc0"
  }, {
    id: 13,
    text: 'Account Statement',
    route: '/accounts/statements',
    icon: "tag_faces",
    color: "#f2ebc0"
  }]
}, {
  id: 3,
  text: 'Transfers',
  route: 'dashboard',
  icon: 'payment',
  children: [{
    id: 31,
    text: 'Add Funds',
    route: '/transfers/manage-funds',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 32,
    text: 'Beneficiary list',
    route: '/transfers/beneficiaries',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 33,
    text: 'Send Money',
    route: '/transfers/send-money',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 34,
    text: 'Recieve Money',
    route: '/transfers/receive-money',
    icon: "local_hospital",
    color: "#b5d5c8"
  }]
}, {
  id: 4,
  text: 'Insurance',
  route: 'dashboard',
  icon: 'beach_access',
  children: [{
    id: 41,
    text: 'Recommended Plans',
    route: '/insurance/plans',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 42,
    text: 'Buy Health Insurance',
    route: '/insurance/buy',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 43,
    text: 'Renew Health Insurance',
    route: '/insurance/renew',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 44,
    text: 'Manage Insurances',
    route: '/insurance/manage',
    icon: "local_hospital",
    color: "#b5d5c8"
  }]
}, {
  id: 5,
  text: 'Support',
  route: '/support',
  icon: 'supervisor_account',
  children: [{
    id: 51,
    text: 'Help',
    route: '/support/help',
    icon: "local_hospital",
    color: "#b5d5c8"
  }, {
    id: 52,
    text: 'Customer care',
    route: '/support/care',
    icon: "local_hospital",
    color: "#b5d5c8"
  }]
  // }, {
  // 	id: 6,
  // 	text: 'Log Off',
  // 	route: '/log-off',
  // 	icon: 'supervisor_account'
}];

/***/ }),

/***/ 77996:
/*!*********************************************************************!*\
  !*** ./src/app/home-page/cover-page/carousel/carousel.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CarouselComponent: () => (/* binding */ CarouselComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/animations */ 11432);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/constants */ 70849);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 75388);













const _c0 = a0 => ({
  "active": a0
});
function CarouselComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("touchstart", function CarouselComponent_div_18_Template_div_touchstart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.onTouchStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "img", 11)(3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div")(5, "div", 13)(6, "div", 14)(7, "div", 15)(8, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 15)(19, "div", 21)(20, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Cast :");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Director :");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Genre :");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "img", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 25)(34, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "polygon", 28)(37, "circle", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const slide_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](20, _c0, i_r2 === ctx_r0.currentIndex_));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", ctx_r0.slides[ctx_r0.currentIndex_].image, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", "Slide ", slide_r1.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@textAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@textAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.movieName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@textAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.movieTag);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@overlayAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.imdb);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", slide_r1.subDescription, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@textAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.cast);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.director);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](slide_r1.genre);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", ctx_r0.slides[ctx_r0.currentIndex_].image, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", "Slide ", slide_r1.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@overlayAnimation", ctx_r0.animationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("href", slide_r1.videoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@overlayAnimation", ctx_r0.animationState);
  }
}
class CarouselComponent {
  constructor(metaService, titleService, movieService, sharedDataService, router, el, document, zone, renderer) {
    this.metaService = metaService;
    this.titleService = titleService;
    this.movieService = movieService;
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.el = el;
    this.document = document;
    this.zone = zone;
    this.renderer = renderer;
    this.animationState = 'hidden';
    this.menuItems = src_app_constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_MENU_ITEMS;
    this.showIndex = -1;
    this.a = 0;
    this.currentIndex_ = 0; // Index of the currently displayed slide
    // private interval_: any;
    this.touchStartX = 0;
    this.isTouchSlide = false;
    this.videoUrl = "";
    this.movieName = "";
    this.isDropdownVisible = {
      home: false,
      reviews: false
    };
    this.finalArray = [];
    this.activeDropdown = null;
    this.slides = []; // Replace with your image URLs
    this.dragging = false;
    this.threshold = 50;
    this.carouselHeight = 1080; // Height in pixels
    this.carouselWidth = 1920; // Width in pixels
  }
  startCarousel() {
    this.zone.runOutsideAngular(() => {
      console.log('sf');
      this.interval_ = setInterval(() => {
        console.log('ssf');
        this.zone.run(() => {
          this.currentIndex_ = this.currentIndex_ % this.slides.length;
        });
      }, 1000); // Change 3000 to your desired interval_ in milliseconds
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval_);
  }
  ngOnInit() {
    console.log("ssjsjhsjs");
    this.startCarousel();
    // / Wait for 100ms before starting the animation
    // this.titleService.setTitle('Home-CinemaKompany');
    // this.metaService.updateTag({ property: 'og:title', content: 'Dynamic Page Title' });
    // this.metaService.updateTag({ property: 'og:description', content: 'Description of the page' });
    // this.metaService.updateTag({ property: 'og:image', content: 'https://example.com/dynamic-image.jpg' });
    this.movieService.getMoviesDataFromHomeCarousel().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.slides = data;
      console.log(this.slides);
    });
    // this.finalArray = this.slides.slice(0,2);
    // this.slides = [
    //   { id: 1, image: 'assets/images/NowinTheatres/2018.jpg' },
    //   { id: 2, image: 'assets/images/NowinTheatres/VOS.jpg' },
    //   { id: 3, image: 'assets/images/NowinTheatres/2018.jpg' },
    // ];
  }
  onItemClick(item) {
    // Assuming your route paths are the same as the dropdown items
    this.router.navigate([item]);
  }
  ngAfterViewInit() {
    this.startSlideShow();
  }
  startSlideShow() {
    // this.onFinalArray();
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
    this.zone.runOutsideAngular(() => {
      let i = setInterval(() => {
        console.log('aaaaaaaaaaaaaaaaaaaa', this.a);
        this.a += 10;
      }, 2000);
      if (this.a == 50) {
        console.log(this.a);
        clearInterval(i);
      }
    });
    this.zone.runOutsideAngular(() => {
      this.interval_ = setInterval(() => {
        if (!this.isTouchSlide) {
          this.nextSlide();
        }
      }, 4000);
    });
  }
  previousSlide() {
    this.currentIndex_ = this.currentIndex_ === 0 ? this.slides.length - 1 : this.currentIndex_ - 1;
  }
  onTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.dragging = true;
    this.isTouchSlide = true;
  }
  onTouchMove(event) {
    if (this.dragging) {
      const x = event.touches[0].clientX;
      const dx = x - this.touchStartX;
      if (dx > this.threshold) {
        this.previousSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      } else if (dx < -this.threshold) {
        this.nextSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      }
    }
  }
  prevSlide() {
    this.currentIndex_ = this.currentIndex_ === 0 ? this.slides.length - 1 : this.currentIndex_ - 1;
  }
  nextSlide() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.currentIndex_);
    this.currentIndex_ = this.currentIndex_ === this.slides.length - 1 ? 0 : this.currentIndex_ + 1;
  }
  clickPrevSlide() {
    clearInterval(this.interval_);
    this.currentIndex_ = this.currentIndex_ === 0 ? this.slides.length - 1 : this.currentIndex_ - 1;
    this.interval_ = setTimeout(() => {
      this.prevSlide();
    }, 4000);
  }
  clickNextSlide() {
    clearInterval(this.interval_);
    this.currentIndex_ = this.currentIndex_ === this.slides.length - 1 ? 0 : this.currentIndex_ + 1;
    this.interval_ = setTimeout(() => {
      this.nextSlide();
    }, 4000);
  }
  onFinalArray() {
    this.finalArray.push(this.slides[this.currentIndex_ + 1]);
    console.log("current", this.currentIndex_, this.finalArray);
  }
  goToSlide(index) {
    this.currentIndex_ = index;
  }
  clickCarouselMovie(movie) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/now_in_theatre'], {
      state: {
        data: movie
      }
    });
  }
  onHomeClick() {
    this.router.navigate(['/home-page/']);
  }
  onAboutClick() {
    this.router.navigate(['/about/']);
  }
  onNewsClick() {
    this.updateMetaTags();
    window.open('news', '_blank');
  }
  onReviewClick() {
    // const newWindow = window.open('', '_blank');
    // this.router.navigate(['/reviews']).then(result => {  window.open(link, '_blank'); });
    // this.router.navigate([]).then(result => {  window.open( `/reviews`, '_blank'); });
    // window.open('/reviews', '_blank');
    // this.router.navigate(['home-page/reviews']);
    // this.router.navigateByUrl('/reviews', { skipLocationChange: true }).then(() => {
    // window.open('/reviews', '_blank');
    // });
    window.open('reviews', '_blank');
    // this.router.navigate(['home-page/reviews'], { state: { newWindow: true } });
    // this.router.navigate(['/reviews/']);
  }
  showDropdown(menuItem) {
    this.activeDropdown = menuItem;
  }
  hideDropdown() {
    this.activeDropdown = null;
  }
  onMenuClick(evt) {
    console.debug('MenuBarComponent/onMenuClick()');
    if (!('children' in evt)) {
      this.router.navigateByUrl(evt.route);
    }
  }
  scrollToNowInTheatres() {
    this.document.getElementById("nowInTheatresContent")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  scrollToForthcomingReleases() {
    this.document.getElementById("forthcomingReleasesContent")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  scrollToOTT() {
    this.document.getElementById("ottContent")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  updateMetaTags() {
    const staticData = {
      title: 'App component',
      description: 'app componentr description',
      imageUrl: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg',
      url: 'https://example.com/static-url'
    };
    // Update Open Graph meta tags dynamically using dynamicContent
    const titleTag = this.document.querySelector('meta[property="og:title"]');
    if (titleTag) {
      titleTag.setAttribute('content', staticData.title);
    }
    const descriptionTag = this.document.querySelector('meta[property="og:description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', staticData.description);
    }
    const imageTag = this.document.querySelector('meta[property="og:image"]');
    if (imageTag) {
      imageTag.setAttribute('content', staticData.imageUrl);
    }
    const widthTag = this.document.querySelector('meta[property="og:image:width"]');
    if (widthTag) {
      widthTag.setAttribute('content', '100'); // Set the actual width of the image in pixels
    }
    const heightTag = this.document.querySelector('meta[property="og:image:height"]');
    if (heightTag) {
      heightTag.setAttribute('content', '100'); // Set the actual height of the image in pixels
    }
    const urlTag = this.document.querySelector('meta[property="og:url"]');
    if (urlTag) {
      urlTag.setAttribute('content', staticData.url);
    }
  }
  static #_ = this.ɵfac = function CarouselComponent_Factory(t) {
    return new (t || CarouselComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: CarouselComponent,
    selectors: [["app-carousel"]],
    hostBindings: function CarouselComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("touchstart", function CarouselComponent_touchstart_HostBindingHandler($event) {
          return ctx.onTouchStart($event);
        })("touchmove", function CarouselComponent_touchmove_HostBindingHandler($event) {
          return ctx.onTouchMove($event);
        });
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 19,
    vars: 8,
    consts: [[1, "main"], [2, "position", "absolute", "left", "2%", "z-index", "999", "top", "0%"], ["height", "35%", "width", "35%", "src", "assets/images/logo3.png", "alt", "Logo"], [1, "header"], [1, "menu-item"], [1, "menu-link", 3, "mouseover", "mouseleave"], [1, "menu-link", 3, "click", "mouseover", "mouseleave"], [1, "carousel-container"], ["class", "carousel-slide", 3, "ngClass", "touchstart", 4, "ngFor", "ngForOf"], [1, "carousel-slide", 3, "ngClass", "touchstart"], [1, "gradient-overlay"], [1, "image", 3, "src", "alt"], [1, "gradient"], [1, "text"], [1, "textCntainer"], [2, "display", "grid"], [1, "movieName"], [1, "movieTag"], [2, "display", "grid", "grid-template-columns", "min-content min-content", "column-gap", ".5rem", "margin", "1rem"], ["src", "assets/images/imdb.png", "alt", "Google Play Store", 1, "imdbText"], [2, "display", "grid", "align-items", "center"], [1, "movie-info"], [1, "info-label"], [1, "info-value"], [1, "thumbnailImage", 3, "src", "alt"], [1, "playIcon"], [1, "playBut", 3, "href"], ["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", 0, "xmlns", "a", "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/", "x", "0px", "y", "0px", "width", "80.7px", "height", "80.7px", "viewBox", "0 0 213.7 213.7", "enable-background", "new 0 0 213.7 213.7", 0, "xml", "space", "preserve"], ["id", "XMLID_18_", "fill", "none", "stroke-width", "7", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "points", "\n                                  73.5,62.5 148.5,105.8 73.5,149.1 ", 1, "triangle"], ["id", "XMLID_17_", "fill", "none", "stroke-width", "7", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "cx", "106.8", "cy", "106.8", "r", "103.3", 1, "circle"]],
    template: function CarouselComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 3)(5, "div", 4)(6, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function CarouselComponent_Template_p_mouseover_6_listener() {
          return ctx.showDropdown("home");
        })("mouseleave", function CarouselComponent_Template_p_mouseleave_6_listener() {
          return ctx.hideDropdown();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 4)(9, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CarouselComponent_Template_p_click_9_listener() {
          return ctx.onReviewClick();
        })("mouseover", function CarouselComponent_Template_p_mouseover_9_listener() {
          return ctx.showDropdown("reviews");
        })("mouseleave", function CarouselComponent_Template_p_mouseleave_9_listener() {
          return ctx.hideDropdown();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 4)(12, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CarouselComponent_Template_p_click_12_listener() {
          return ctx.onNewsClick();
        })("mouseover", function CarouselComponent_Template_p_mouseover_12_listener() {
          return ctx.showDropdown("reviews");
        })("mouseleave", function CarouselComponent_Template_p_mouseleave_12_listener() {
          return ctx.hideDropdown();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "News");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 4)(15, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CarouselComponent_Template_p_click_15_listener() {
          return ctx.onAboutClick();
        })("mouseover", function CarouselComponent_Template_p_mouseover_15_listener() {
          return ctx.showDropdown("about");
        })("mouseleave", function CarouselComponent_Template_p_mouseleave_15_listener() {
          return ctx.hideDropdown();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, CarouselComponent_div_18_Template, 38, 22, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", ctx.activeDropdown === "home");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", ctx.activeDropdown === "reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", ctx.activeDropdown === "reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@slideAnimation", ctx.currentIndex_);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.slides);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule],
    styles: [".main[_ngcontent-%COMP%] {\n  display: grid;\n  position: relative;\n}\n\n.header[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 4%;\n  z-index: 999;\n  top: 5%;\n  display: grid;\n  grid-auto-flow: column;\n  font-family: \"Jost\", sans-serif;\n  font-size: 0.5rem;\n}\n\n.menu-item[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n\n.menu-link[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  cursor: pointer;\n}\n\n.dropdown-content[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  padding: 12px;\n  z-index: 1;\n}\n\n.menu-item.selected[_ngcontent-%COMP%]   .menu-link[_ngcontent-%COMP%] {\n  color: #fff; \n\n  background-color: #333; \n\n}\n\n.menu-item.selected[_ngcontent-%COMP%]   .dropdown-content[_ngcontent-%COMP%] {\n  background-color: #fff; \n\n  color: #333; \n\n}\n\n.menu-item[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.textCntainer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: min-content;\n  overflow: auto;\n}\n\n.gradient-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  \n\n  width: 100%;\n  \n\n  height: 100%;\n  \n\n}\n\n.gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(to right, rgba(11, 16, 23, 0.8) 0%, rgba(11, 16, 23, 0.6) 100%);\n}\n\n.movieName[_ngcontent-%COMP%] {\n  font-family: \"Jost\", sans-serif;\n  font-size: 1rem;\n  margin: 0 1rem;\n  font-weight: 600;\n  line-height: 1.2rem;\n}\n\n.movieTag[_ngcontent-%COMP%] {\n  display: none;\n  font-size: 1.1rem !important;\n  font-family: \"Roboto\", sans-serif !important;\n  font-weight: normal !important;\n  font-size: normal !important;\n  margin: 0 1rem;\n  color: #cecfd1;\n  line-height: 2;\n}\n\n.arrowButtonsLeft[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 40%;\n  left: 1%;\n  opacity: 0.7;\n  z-index: 3;\n  height: 1rem;\n  width: 1rem;\n  font-size: 1rem;\n}\n\n.arrowButtonsRight[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0.7;\n  top: 40%;\n  right: 0;\n  z-index: 3;\n  height: 1rem;\n  width: 1rem;\n  font-size: 1rem;\n}\n\n.carousel-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  justify-items: center;\n  justify-content: center;\n}\n\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  transition: transform 0.5s ease-in-out;\n}\n\n.carousel-slide.active[_ngcontent-%COMP%] {\n  transform: translateX(0);\n}\n\n.carousel-slide[_ngcontent-%COMP%]:not(.active) {\n  position: absolute;\n  top: 0;\n  left: 100%;\n}\n\n.text[_ngcontent-%COMP%] {\n  position: absolute;\n  align-items: center;\n  top: 70%;\n  line-height: 3px;\n  width: 100%;\n  overflow: auto;\n  left: 4%;\n  font-weight: 800;\n  background-image: linear-gradient(to left, #fd9696, #000000);\n  background-clip: text;\n  -webkit-background-clip: text;\n  font-family: \"Poppins\", sans-serif;\n  font-weight: 600;\n  border-left: 0.4px solid #e50916;\n  color: white;\n}\n\n.imdbText[_ngcontent-%COMP%] {\n  display: grid;\n  top: 25%;\n  line-height: 1rem;\n  margin-bottom: 1rem;\n  color: rgb(255, 208, 0);\n}\n\n@media screen and (min-width: 740px) {\n  .header[_ngcontent-%COMP%] {\n    right: 4%;\n    z-index: 999;\n    top: 4%;\n    display: grid;\n    grid-auto-flow: column !important;\n    font-size: 1.2rem !important;\n  }\n  .gradient[_ngcontent-%COMP%] {\n    background: linear-gradient(to right, rgb(11, 16, 23) 0%, rgba(11, 16, 23, 0.6) 100%) !important;\n  }\n  .main[_ngcontent-%COMP%] {\n    display: grid;\n    height: 100% !important;\n    position: relative;\n  }\n  .textCntainer[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr !important;\n  }\n  .movie-info[_ngcontent-%COMP%] {\n    padding: 0 1rem !important;\n    font-size: 1rem !important;\n    line-height: 2rem !important;\n  }\n  .movieName[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    line-height: 1.2;\n    padding: 0.8rem 0;\n  }\n  .movieTag[_ngcontent-%COMP%] {\n    display: grid;\n    font-size: 1.1rem !important;\n    line-height: 1.4rem;\n    font-weight: 400 !important;\n  }\n  .thumbnailImage[_ngcontent-%COMP%] {\n    position: relative;\n    top: 25% !important;\n    left: 45% !important;\n    height: auto;\n    width: 45% !important;\n    overflow: hidden;\n    border: 0.2px solid rgba(192, 192, 192, 0.3);\n    background: linear-gradient(black black black black) !important;\n    filter: brightness(70%);\n  }\n  .text[_ngcontent-%COMP%] {\n    top: 15% !important;\n    padding: 2rem 0.8rem;\n    width: 37% !important;\n    left: 4% !important;\n    margin: 0 0 15px 0 !important;\n    line-height: 28px !important;\n  }\n  .headerNames[_ngcontent-%COMP%] {\n    display: grid !important;\n    position: absolute;\n    grid-template-columns: 1fr 1fr;\n    top: 1%;\n    right: 2%;\n    z-index: 99;\n    width: 100%;\n    display: grid;\n    grid-auto-flow: column;\n    padding: 0 1rem;\n    font-family: \"Jost\", sans-serif;\n    font-size: 1rem;\n  }\n  .playIcon[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 40% !important;\n    left: 65% !important;\n    z-index: 3;\n  }\n  .imdbText[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    height: 1.5rem;\n    width: 3rem;\n    top: 25%;\n    line-height: 1rem;\n  }\n  .arrowButtonsLeft[_ngcontent-%COMP%] {\n    height: 2.5rem;\n    width: 2.5rem;\n    font-size: 2.5rem;\n  }\n  .arrowButtonsRight[_ngcontent-%COMP%] {\n    height: 2.5rem;\n    width: 2.5rem;\n    font-size: 2.5rem;\n  }\n  .menu-item[_ngcontent-%COMP%] {\n    display: grid;\n    padding: 1rem !important;\n    position: relative;\n    grid-auto-flow: column;\n    right: 0;\n    z-index: 100;\n    font-size: 1.4rem;\n    font-weight: 800;\n    -webkit-text-decoration: linear-gradient(to left, #f82424, #000000);\n            text-decoration: linear-gradient(to left, #f82424, #000000);\n    background-clip: text;\n    color: rgb(236, 236, 236);\n    -webkit-background-clip: text;\n  }\n  .menu-item[_ngcontent-%COMP%]:hover {\n    cursor: pointer;\n    background-color: rgb(46, 46, 46);\n    color: #fdc50f;\n  }\n  .menu-item[_ngcontent-%COMP%]:hover    > span[_ngcontent-%COMP%] {\n    display: grid;\n  }\n  span[_ngcontent-%COMP%] {\n    display: none;\n    position: absolute;\n    top: 3rem;\n    left: 0;\n    background-color: #ffffff;\n    border-radius: 5px;\n    width: max-content;\n    z-index: 9;\n  }\n  span[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n    padding: 0.5rem 1rem;\n    text-decoration: none;\n    color: #000;\n  }\n  span[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:hover {\n    background-color: #b9b2b2;\n    color: #fff;\n  }\n}\n.headerNames[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.image[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.slide[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  transition: opacity 0.5s;\n  max-width: 100%;\n  height: auto;\n}\n\n.dot-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 50%;\n  position: relative;\n  top: 50%;\n  z-index: 200;\n  margin-right: 0.5rem;\n  border: 1px solid #999999;\n  cursor: pointer;\n  display: grid;\n  transition: transform 0.2s ease-in-out;\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] {\n  background-color: rgb(255, 208, 0);\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover {\n  transform: scale(1.3);\n}\n\n.thumbnailImage[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 15%;\n  left: 25%;\n  height: auto;\n  width: 50%;\n  overflow: hidden;\n}\n\n.playIcon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 25%;\n  left: 45%;\n  z-index: 3;\n}\n\n.container[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  margin-top: 25vh;\n}\n\n.circle[_ngcontent-%COMP%] {\n  stroke: #ffffff;\n  stroke-dasharray: 750;\n  stroke-dashoffset: 750;\n  -webkit-transition: all 0.5s ease-in-out;\n  opacity: 0.3;\n}\n\n.playBut[_ngcontent-%COMP%] {\n  \n\n  display: inline-block;\n  -webkit-transition: all 0.5s ease;\n}\n.playBut[_ngcontent-%COMP%]   .triangle[_ngcontent-%COMP%] {\n  -webkit-transition: all 0.7s ease-in-out;\n  stroke-dasharray: 240;\n  stroke-dashoffset: 480;\n  stroke: #ffffff;\n  transform: translateY(0);\n}\n.playBut[_ngcontent-%COMP%]:hover   .triangle[_ngcontent-%COMP%] {\n  stroke-dashoffset: 0;\n  opacity: 1;\n  stroke: #ffffff;\n  animation: _ngcontent-%COMP%_nudge 0.7s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_nudge {\n  0% {\n    transform: translateX(0);\n  }\n  30% {\n    transform: translateX(-5px);\n  }\n  50% {\n    transform: translateX(5px);\n  }\n  70% {\n    transform: translateX(-2px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.playBut[_ngcontent-%COMP%]:hover   .circle[_ngcontent-%COMP%] {\n  stroke-dashoffset: 0;\n  opacity: 1;\n}\n\n.menu-item[_ngcontent-%COMP%] {\n  display: grid;\n  padding: 0.3rem;\n  position: relative;\n  grid-auto-flow: column;\n  right: 0;\n  z-index: 100;\n  font-size: 1rem;\n  font-weight: 800;\n  -webkit-text-decoration: linear-gradient(to left, #f82424, #000000);\n          text-decoration: linear-gradient(to left, #f82424, #000000);\n  background-clip: text;\n  color: rgb(236, 236, 236);\n  -webkit-background-clip: text;\n}\n.menu-item[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  background-color: rgb(46, 46, 46);\n  color: rgb(205, 172, 82);\n}\n.menu-item[_ngcontent-%COMP%]:hover    > span[_ngcontent-%COMP%] {\n  display: grid;\n}\n\nspan[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: 3rem;\n  left: 0;\n  background-color: #ffffff;\n  border-radius: 5px;\n  width: max-content;\n  z-index: 9;\n}\nspan[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  text-decoration: none;\n  color: #000;\n}\nspan[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:hover {\n  background-color: #b9b2b2;\n  color: #fff;\n}\n\n.dropdown-content[_ngcontent-%COMP%] {\n  display: grid;\n  position: absolute;\n  background-color: rgb(25, 25, 25);\n  border: 0.1px solid rgb(34, 34, 34);\n  top: 80%;\n  max-width: 190px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  padding: 10px;\n  left: 0%;\n}\n\n.menu-item[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%] {\n  display: block;\n  opacity: 1;\n}\n\n.movie-info[_ngcontent-%COMP%] {\n  display: grid;\n  margin-top: 1rem;\n  grid-template-columns: max-content 1fr;\n  font-size: 8px;\n  font-family: \"Jost\";\n  padding: 0;\n  height: min-content;\n  color: #e50916;\n  line-height: 2;\n  font-size: 0.6rem;\n  column-gap: 0.3rem;\n}\n\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  font-family: \"Jost\";\n}\n\n.info-value[_ngcontent-%COMP%] {\n  color: white;\n  text-align: left;\n  font-weight: normal;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS1wYWdlL2NvdmVyLXBhZ2UvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxhQUFBO0VBRUEsa0JBQUE7QUFERjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsK0JBQUE7RUFDQSxpQkFBQTtBQUZGOztBQVFBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtBQUxGOztBQVFBO0VBQ0UsZUFBQTtFQUNBLGVBQUE7QUFMRjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLCtDQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QUFMRjs7QUFRQTtFQUNFLFdBQUEsRUFBQSx1Q0FBQTtFQUNBLHNCQUFBLEVBQUEsa0RBQUE7QUFMRjs7QUFRQTtFQUNFLHNCQUFBLEVBQUEsK0RBQUE7RUFDQSxXQUFBLEVBQUEsZ0VBQUE7QUFMRjs7QUFRQTtFQUNFLGNBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVlBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHVDQUFBO0VBQ0EsV0FBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0FBVEY7O0FBY0E7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFFQSwyRkFBQTtBQVpGOztBQW9CQTtFQUNFLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBakJGOztBQW9CQTtFQUNFLGFBQUE7RUFHQSw0QkFBQTtFQUNBLDRDQUFBO0VBQ0EsOEJBQUE7RUFDQSw0QkFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtBQW5CRjs7QUF3QkE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFyQkY7O0FBd0JBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBckJGOztBQXdCQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0FBckJGOztBQTBCQTtFQUNFLGNBQUE7RUFDQSxzQ0FBQTtBQXZCRjs7QUEwQkE7RUFDRSx3QkFBQTtBQXZCRjs7QUEwQkE7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBdkJGOztBQTBCQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUVBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLDREQUFBO0VBQ0EscUJBQUE7RUFDQSw2QkFBQTtFQUNBLGtDQUFBO0VBRUEsZ0JBQUE7RUFDQSxnQ0FBQTtFQUVBLFlBQUE7QUExQkY7O0FBOEJBO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUEzQkY7O0FBa0NBO0VBRUU7SUFDRSxTQUFBO0lBQ0EsWUFBQTtJQUNBLE9BQUE7SUFDQSxhQUFBO0lBQ0EsaUNBQUE7SUFDQSw0QkFBQTtFQWhDRjtFQW9DQTtJQUdFLGdHQUFBO0VBcENGO0VBNENBO0lBRUUsYUFBQTtJQUNBLHVCQUFBO0lBQ0Esa0JBQUE7RUEzQ0Y7RUErQ0E7SUFDRSxhQUFBO0lBQ0EscUNBQUE7RUE3Q0Y7RUFnREE7SUFFRSwwQkFBQTtJQUNBLDBCQUFBO0lBQ0EsNEJBQUE7RUEvQ0Y7RUFtREE7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7SUFDQSxpQkFBQTtFQWpERjtFQW9EQTtJQUNFLGFBQUE7SUFFQSw0QkFBQTtJQUNBLG1CQUFBO0lBQ0EsMkJBQUE7RUFuREY7RUFzREE7SUFDRSxrQkFBQTtJQUNBLG1CQUFBO0lBQ0Esb0JBQUE7SUFDQSxZQUFBO0lBQ0EscUJBQUE7SUFDQSxnQkFBQTtJQUNBLDRDQUFBO0lBRUEsK0RBQUE7SUFDQSx1QkFBQTtFQXJERjtFQTBEQTtJQUNFLG1CQUFBO0lBQ0Esb0JBQUE7SUFFQSxxQkFBQTtJQUNBLG1CQUFBO0lBQ0EsNkJBQUE7SUFDQSw0QkFBQTtFQXpERjtFQStEQTtJQUNFLHdCQUFBO0lBQ0Esa0JBQUE7SUFDQSw4QkFBQTtJQUNBLE9BQUE7SUFFQSxTQUFBO0lBQ0EsV0FBQTtJQUNBLFdBQUE7SUFDQSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxlQUFBO0lBQ0EsK0JBQUE7SUFDQSxlQUFBO0VBOURGO0VBd0VBO0lBQ0Usa0JBQUE7SUFDQSxtQkFBQTtJQUNBLG9CQUFBO0lBQ0EsVUFBQTtFQXRFRjtFQTJFQTtJQUNFLGVBQUE7SUFDQSxjQUFBO0lBQ0EsV0FBQTtJQUNBLFFBQUE7SUFDQSxpQkFBQTtFQXpFRjtFQWtGQTtJQUVFLGNBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUFqRkY7RUFvRkE7SUFFRSxjQUFBO0lBQ0EsYUFBQTtJQUNBLGlCQUFBO0VBbkZGO0VBc0ZBO0lBQ0UsYUFBQTtJQUNBLHdCQUFBO0lBQ0Esa0JBQUE7SUFDQSxzQkFBQTtJQUNBLFFBQUE7SUFDQSxZQUFBO0lBQ0EsaUJBQUE7SUFDQSxnQkFBQTtJQUNBLG1FQUFBO1lBQUEsMkRBQUE7SUFDQSxxQkFBQTtJQUNBLHlCQUFBO0lBQ0EsNkJBQUE7RUFwRkY7RUF3RkU7SUFDRSxlQUFBO0lBQ0EsaUNBQUE7SUFDQSxjQUFBO0VBdEZKO0VBd0ZJO0lBQ0UsYUFBQTtFQXRGTjtFQTJGQTtJQUNFLGFBQUE7SUFDQSxrQkFBQTtJQUNBLFNBQUE7SUFDQSxPQUFBO0lBQ0EseUJBQUE7SUFFQSxrQkFBQTtJQUNBLGtCQUFBO0lBQ0EsVUFBQTtFQTFGRjtFQTRGRTtJQUNFLG9CQUFBO0lBQ0EscUJBQUE7SUFDQSxXQUFBO0VBMUZKO0VBNEZJO0lBQ0UseUJBQUE7SUFDQSxXQUFBO0VBMUZOO0FBQ0Y7QUFnR0E7RUFDRSxhQUFBO0FBOUZGOztBQWtHQTtFQUVFLFlBQUE7RUFDQSxXQUFBO0FBaEdGOztBQXVHQTtFQUNFLGNBQUE7RUFDQSx3QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBcEdGOztBQXVHQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQXBHRjs7QUF3R0E7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsWUFBQTtFQUNBLG9CQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHNDQUFBO0FBdEdGOztBQXlHQTtFQUNFLGtDQUFBO0FBdEdGOztBQTBHQTtFQUNFLHFCQUFBO0FBdkdGOztBQTRHQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0FBekdGOztBQTRHQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBekdGOztBQThHQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBM0dGOztBQThHQTtFQUNFLGVBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0Esd0NBQUE7RUFDQSxZQUFBO0FBM0dGOztBQThHQTtFQUNFLDJCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQ0FBQTtBQTNHRjtBQTZHRTtFQUNFLHdDQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSx3QkFBQTtBQTNHSjtBQWlISTtFQUNFLG9CQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtBQS9HTjtBQWlITTtFQUNFO0lBQ0Usd0JBQUE7RUEvR1I7RUFrSE07SUFDRSwyQkFBQTtFQWhIUjtFQW1ITTtJQUNFLDBCQUFBO0VBakhSO0VBb0hNO0lBQ0UsMkJBQUE7RUFsSFI7RUFxSE07SUFDRSx3QkFBQTtFQW5IUjtBQUNGO0FBdUhJO0VBQ0Usb0JBQUE7RUFDQSxVQUFBO0FBckhOOztBQThIQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUVBQUE7VUFBQSwyREFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSw2QkFBQTtBQTNIRjtBQStIRTtFQUNFLGVBQUE7RUFDQSxpQ0FBQTtFQUNBLHdCQUFBO0FBN0hKO0FBK0hJO0VBQ0UsYUFBQTtBQTdITjs7QUFrSUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLHlCQUFBO0VBRUEsa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFoSUY7QUFrSUU7RUFDRSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtBQWhJSjtBQWtJSTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQWhJTjs7QUFzSUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsUUFBQTtFQUVBLGdCQUFBO0VBQ0EsK0NBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7QUFwSUY7O0FBdUlBO0VBQ0UsY0FBQTtFQUNBLFVBQUE7QUFwSUY7O0FBdUlBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0NBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFwSUY7O0FBd0lBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtBQXJJRjs7QUF3SUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQXJJRiIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluIHtcclxuXHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICAvLyBoZWlnaHQ6IDQ1cmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAvLyBtYXJnaW46IC40cmVtO1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDQlO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICB0b3A6IDUlO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcclxuICBmb250LWZhbWlseTogJ0pvc3QnLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogLjVyZW07XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5tZW51LWl0ZW0ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5tZW51LWxpbmsge1xyXG4gIHBhZGRpbmc6IDAgMXJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1jb250ZW50IHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEwMCU7XHJcbiAgbGVmdDogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4ubWVudS1pdGVtLnNlbGVjdGVkIC5tZW51LWxpbmsge1xyXG4gIGNvbG9yOiAjZmZmOyAvKiBTZXQgdGhlIGNvbG9yIGZvciB0aGUgc2VsZWN0ZWQgdGFiICovXHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgLyogU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgc2VsZWN0ZWQgdGFiICovXHJcbn1cclxuXHJcbi5tZW51LWl0ZW0uc2VsZWN0ZWQgLmRyb3Bkb3duLWNvbnRlbnQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IC8qIFNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHNlbGVjdGVkIGRyb3Bkb3duIGNvbnRlbnQgKi9cclxuICBjb2xvcjogIzMzMzsgLyogU2V0IHRoZSBjb2xvciBmb3IgdGhlIHRleHQgaW4gdGhlIHNlbGVjdGVkIGRyb3Bkb3duIGNvbnRlbnQgKi9cclxufVxyXG5cclxuLm1lbnUtaXRlbTpob3ZlciAuZHJvcGRvd24tY29udGVudCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLnRleHRDbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudDtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuXHJcblxyXG4uZ3JhZGllbnQtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAvKiBvciBibG9jaywgZGVwZW5kaW5nIG9uIHlvdXIgbGF5b3V0ICovXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgLyogQWRqdXN0IHRoZSB3aWR0aCBhcyBuZWVkZWQgKi9cclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgLyogQWRqdXN0IHRoZSBoZWlnaHQgYXMgbmVlZGVkICovXHJcbn1cclxuXHJcblxyXG5cclxuLmdyYWRpZW50IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIC8vIGZpbHRlcjogYnJpZ2h0bmVzcyg4MCUpO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMSwgMTYsIDIzLCAuOCkgMCUsIHJnYmEoMTEsIDE2LCAyMywgMC42MCkgMTAwJSk7XHJcblxyXG5cclxuICAvLyBvcGFjaXR5OiAwLjc7XHJcbiAgLy8gYW5pbWF0aW9uOiBtb3ZlR3JhZGllbnQgNXMgbGluZWFyIGluZmluaXRlLCByb3RhdGVHcmFkaWVudCA1cyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgLy8gYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7IC8qIEFkanVzdCBncmFkaWVudCBjb2xvcnMgYW5kIGRpcmVjdGlvbiAqL1xyXG59XHJcblxyXG4ubW92aWVOYW1lIHtcclxuICBmb250LWZhbWlseTogJ0pvc3QnLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBtYXJnaW46IDAgMXJlbTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjJyZW07XHJcbn1cclxuXHJcbi5tb3ZpZVRhZyB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuXHJcblxyXG4gIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XHJcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogbm9ybWFsICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luOiAwIDFyZW07XHJcbiAgY29sb3I6ICNjZWNmZDE7XHJcbiAgbGluZS1oZWlnaHQ6IDI7XHJcbn1cclxuXHJcblxyXG5cclxuLmFycm93QnV0dG9uc0xlZnQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDQwJTtcclxuICBsZWZ0OiAxJTtcclxuICBvcGFjaXR5OiAuNztcclxuICB6LWluZGV4OiAzO1xyXG4gIGhlaWdodDogMXJlbTtcclxuICB3aWR0aDogMXJlbTtcclxuICBmb250LXNpemU6IDFyZW07XHJcbn1cclxuXHJcbi5hcnJvd0J1dHRvbnNSaWdodCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG9wYWNpdHk6IC43O1xyXG4gIHRvcDogNDAlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgaGVpZ2h0OiAxcmVtO1xyXG4gIHdpZHRoOiAxcmVtO1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxufVxyXG5cclxuLmNhcm91c2VsLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIC8vIG1hcmdpbjogM3JlbTtcclxuICAvLyBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtc2xpZGUge1xyXG4gIGZsZXg6IDAgMCAxMDAlO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtc2xpZGUuYWN0aXZlIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XHJcbn1cclxuXHJcbi5jYXJvdXNlbC1zbGlkZTpub3QoLmFjdGl2ZSkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMTAwJTtcclxufVxyXG5cclxuLnRleHQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRvcDogNzAlO1xyXG4gIGxpbmUtaGVpZ2h0OiAzcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcblxyXG4gIGxlZnQ6IDQlO1xyXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICNmZDk2OTYsICMwMDAwMDApO1xyXG4gIGJhY2tncm91bmQtY2xpcDogdGV4dDtcclxuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcclxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG4gIC8vIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBib3JkZXItbGVmdDogLjRweCBzb2xpZCAjZTUwOTE2O1xyXG5cclxuICBjb2xvcjogd2hpdGU7XHJcblxyXG59XHJcblxyXG4uaW1kYlRleHQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgdG9wOiAyNSU7XHJcbiAgbGluZS1oZWlnaHQ6IDFyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICBjb2xvcjogcmdiKDI1NSwgMjA4LCAwKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGggOjc0MHB4KSB7XHJcblxyXG4gIC5oZWFkZXIge1xyXG4gICAgcmlnaHQ6IDQlO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gICAgdG9wOiA0JTtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLWF1dG8tZmxvdzogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDEuMnJlbSAhaW1wb3J0YW50O1xyXG4gIFxyXG4gIH1cclxuXHJcbiAgLmdyYWRpZW50IHtcclxuXHJcbiAgICAvLyBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMSwgMTYsIDIzLCAxKSAwJSwgcmdiYSgxMSwgMTYsIDIzLCAwLjYwKSAxMDAlKSAhaW1wb3J0YW50O1xyXG5cclxuXHJcbiAgICAvLyBvcGFjaXR5OiAwLjc7XHJcbiAgICAvLyBhbmltYXRpb246IG1vdmVHcmFkaWVudCA1cyBsaW5lYXIgaW5maW5pdGUsIHJvdGF0ZUdyYWRpZW50IDVzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgIC8vIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgMC41KSwgdHJhbnNwYXJlbnQpOyAvKiBBZGp1c3QgZ3JhZGllbnQgY29sb3JzIGFuZCBkaXJlY3Rpb24gKi9cclxuICB9XHJcblxyXG4gIC5tYWluIHtcclxuXHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAvLyBtYXJnaW46IC40cmVtO1xyXG4gIH1cclxuXHJcbiAgLnRleHRDbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5tb3ZpZS1pbmZvIHtcclxuICAgIC8vIHBhZGRpbmc6IDAgNHJlbSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAxcmVtICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDFyZW0gIWltcG9ydGFudDtcclxuICAgIGxpbmUtaGVpZ2h0OiAycmVtICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLm1vdmllTmFtZSB7XHJcbiAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS4yO1xyXG4gICAgcGFkZGluZzogLjhyZW0gMDtcclxuICB9XHJcblxyXG4gIC5tb3ZpZVRhZyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XHJcbiAgICBsaW5lLWhlaWdodDogMS40cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLnRodW1ibmFpbEltYWdlIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogMjUlICFpbXBvcnRhbnQ7XHJcbiAgICBsZWZ0OiA0NSUgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIHdpZHRoOiA0NSUgIWltcG9ydGFudDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBib3JkZXI6IC4ycHggc29saWQgcmdiKDE5MiwgMTkyLCAxOTIsIDAuMyk7XHJcblxyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KGJsYWNrIGJsYWNrIGJsYWNrIGJsYWNrKSAhaW1wb3J0YW50O1xyXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDcwJSkgLy8gb3BhY2l0eTogMC40ICFpbXBvcnRhbnQ7XHJcblxyXG5cclxuICB9XHJcblxyXG4gIC50ZXh0IHtcclxuICAgIHRvcDogMTUlICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAycmVtIC44cmVtO1xyXG5cclxuICAgIHdpZHRoOiAzNyUgIWltcG9ydGFudDtcclxuICAgIGxlZnQ6IDQlICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW46IDAgMCAxNXB4IDAgIWltcG9ydGFudDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICAuaGVhZGVyTmFtZXMge1xyXG4gICAgZGlzcGxheTogZ3JpZCAhaW1wb3J0YW50O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xyXG4gICAgdG9wOiAxJTtcclxuICAgIC8vIGxlZnQ6IDElO1xyXG4gICAgcmlnaHQ6IDIlO1xyXG4gICAgei1pbmRleDogOTk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xyXG4gICAgcGFkZGluZzogMCAxcmVtO1xyXG4gICAgZm9udC1mYW1pbHk6ICdKb3N0Jywgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAucGxheUljb24ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA0MCUgIWltcG9ydGFudDtcclxuICAgIGxlZnQ6IDY1JSAhaW1wb3J0YW50O1xyXG4gICAgei1pbmRleDogMztcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLmltZGJUZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGhlaWdodDogMS41cmVtO1xyXG4gICAgd2lkdGg6IDNyZW07XHJcbiAgICB0b3A6IDI1JTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxcmVtO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgLmFycm93QnV0dG9uc0xlZnQge1xyXG5cclxuICAgIGhlaWdodDogMi41cmVtO1xyXG4gICAgd2lkdGg6IDIuNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gIH1cclxuXHJcbiAgLmFycm93QnV0dG9uc1JpZ2h0IHtcclxuXHJcbiAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICAgIHdpZHRoOiAyLjVyZW07XHJcbiAgICBmb250LXNpemU6IDIuNXJlbTtcclxuICB9XHJcblxyXG4gIC5tZW51LWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHBhZGRpbmc6IDFyZW0gIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XHJcbiAgICByaWdodDogMDtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICNmODI0MjQsICMwMDAwMDApO1xyXG4gICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG4gICAgY29sb3I6IHJnYigyMzYsIDIzNiwgMjM2KTtcclxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG4gICAgLy8gd2lkdGg6IDEwMHZ3O1xyXG5cclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNDYsIDQ2LCA0Nik7XHJcbiAgICAgIGNvbG9yOiAjZmRjNTBmO1xyXG5cclxuICAgICAgPnNwYW4ge1xyXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogM3JlbTtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgLy8gYm94LXNoYWRvdzogMCAxcHggNXB4ICM4ODg4ODg1NDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHdpZHRoOiBtYXgtY29udGVudDtcclxuICAgIHotaW5kZXg6IDk7XHJcblxyXG4gICAgPmEge1xyXG4gICAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICBjb2xvcjogIzAwMDtcclxuXHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNiOWIyYjI7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG4uaGVhZGVyTmFtZXMge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcblxyXG59XHJcblxyXG4uaW1hZ2Uge1xyXG4gIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgLy8gb3BhY2l0eTogLjI7XHJcbn1cclxuXHJcblxyXG4udGV4dFN0eWxlIHt9XHJcblxyXG4uc2xpZGUge1xyXG4gIGZsZXg6IDAgMCAxMDAlO1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cztcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uZG90LWluZGljYXRvcnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgLy8gcGFkZGluZzogMXJlbTtcclxufVxyXG5cclxuLmRvdC1pbmRpY2F0b3JzIHNwYW4ge1xyXG4gIHdpZHRoOiAuNHJlbTtcclxuICBoZWlnaHQ6IC40cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiA1MCU7XHJcbiAgLy8gbGVmdDogNTAlO1xyXG4gIHotaW5kZXg6IDIwMDtcclxuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjOTk5OTk5O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG4uZG90LWluZGljYXRvcnMgc3Bhbi5hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDIwOCwgMCk7XHJcblxyXG59XHJcblxyXG4uZG90LWluZGljYXRvcnMgc3Bhbjpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xyXG59XHJcblxyXG5cclxuXHJcbi50aHVtYm5haWxJbWFnZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTUlO1xyXG4gIGxlZnQ6IDI1JTtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgd2lkdGg6IDUwJTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4ucGxheUljb24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDI1JTtcclxuICBsZWZ0OiA0NSU7XHJcbiAgei1pbmRleDogMztcclxuXHJcbn1cclxuXHJcblxyXG4uY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMjV2aDtcclxufVxyXG5cclxuLmNpcmNsZSB7XHJcbiAgc3Ryb2tlOiAjZmZmZmZmO1xyXG4gIHN0cm9rZS1kYXNoYXJyYXk6IDc1MDtcclxuICBzdHJva2UtZGFzaG9mZnNldDogNzUwO1xyXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XHJcbiAgb3BhY2l0eTogMC4zO1xyXG59XHJcblxyXG4ucGxheUJ1dCB7XHJcbiAgLyogIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsqL1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XHJcblxyXG4gIC50cmlhbmdsZSB7XHJcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjdzIGVhc2UtaW4tb3V0O1xyXG4gICAgc3Ryb2tlLWRhc2hhcnJheTogMjQwO1xyXG4gICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDQ4MDtcclxuICAgIHN0cm9rZTogI2ZmZmZmZjtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKVxyXG4gIH1cclxuXHJcblxyXG4gICY6aG92ZXIge1xyXG5cclxuICAgIC50cmlhbmdsZSB7XHJcbiAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAwO1xyXG4gICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICBzdHJva2U6ICNmZmZmZmY7XHJcbiAgICAgIGFuaW1hdGlvbjogbnVkZ2UgMC43cyBlYXNlLWluLW91dDtcclxuXHJcbiAgICAgIEBrZXlmcmFtZXMgbnVkZ2Uge1xyXG4gICAgICAgIDAlIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgMzAlIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNXB4KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgNTAlIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1cHgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICA3MCUge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ycHgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAxMDAlIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5jaXJjbGUge1xyXG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4ubWVudS1pdGVtIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIHBhZGRpbmc6IC4zcmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHotaW5kZXg6IDEwMDtcclxuICBmb250LXNpemU6IDFyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICB0ZXh0LWRlY29yYXRpb246IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCAjZjgyNDI0LCAjMDAwMDAwKTtcclxuICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XHJcbiAgY29sb3I6IHJnYigyMzYsIDIzNiwgMjM2KTtcclxuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcclxuICAvLyB3aWR0aDogMTAwdnc7XHJcblxyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig0NiwgNDYsIDQ2KTtcclxuICAgIGNvbG9yOiByZ2IoMjA1LCAxNzIsIDgyKTtcclxuXHJcbiAgICA+c3BhbiB7XHJcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5zcGFuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDNyZW07XHJcbiAgbGVmdDogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIC8vIGJveC1zaGFkb3c6IDAgMXB4IDVweCAjODg4ODg4NTQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHdpZHRoOiBtYXgtY29udGVudDtcclxuICB6LWluZGV4OiA5O1xyXG5cclxuICA+YSB7XHJcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjliMmIyO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG4uZHJvcGRvd24tY29udGVudCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyNSwgMjUsICk7XHJcbiAgYm9yZGVyOiAuMXB4IHNvbGlkIHJnYigzNCwgMzQsIDM0KTtcclxuICB0b3A6IDgwJTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBcclxuICBtYXgtd2lkdGg6IDE5MHB4O1xyXG4gIGJveC1zaGFkb3c6IDBweCA4cHggMTZweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG4gIHotaW5kZXg6IDE7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBsZWZ0OiAwJTtcclxufVxyXG5cclxuLm1lbnUtaXRlbTpob3ZlciAuZHJvcGRvd24tY29udGVudCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgb3BhY2l0eTogMTtcclxufVxyXG5cclxuLm1vdmllLWluZm8ge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcclxuICBmb250LXNpemU6IDhweDtcclxuICBmb250LWZhbWlseTogJ0pvc3QnO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcclxuICBjb2xvcjogI2U1MDkxNjtcclxuICBsaW5lLWhlaWdodDogMjtcclxuICBmb250LXNpemU6IC42cmVtO1xyXG4gIGNvbHVtbi1nYXA6IC4zcmVtO1xyXG5cclxufVxyXG5cclxuLmluZm8tbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgZm9udC1mYW1pbHk6ICdKb3N0JztcclxufVxyXG5cclxuLmluZm8tdmFsdWUge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.trigger)('slideAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.transition)('* <=> *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.query)('.carousel-slide', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        transform: 'translateX(80%)',
        opacity: 0
      })], {
        optional: true
      }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.query)('.carousel-slide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.stagger)('0ms', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.animate)('.6s ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        transform: 'translateX(0)',
        opacity: 1
      }))]), {
        optional: true
      })])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.trigger)('textAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        opacity: 0,
        transform: 'translateX(-80px)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        opacity: 1,
        transform: 'translateX(0)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.transition)('hidden => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.animate)('400ms'))]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.trigger)('overlayAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        opacity: 0,
        transform: 'translateX(-100px)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.style)({
        opacity: 1,
        transform: 'translateX(0)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.transition)('hidden => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_9__.animate)('400ms 800ms')) // Delay the overlay animation by 1 second
      ])]
    }
  });
}

/***/ }),

/***/ 60328:
/*!**************************************************!*\
  !*** ./src/app/home-page/home-page.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageComponent: () => (/* binding */ HomePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _cover_page_carousel_carousel_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cover-page/carousel/carousel.component */ 77996);
/* harmony import */ var _image_carousel_image_carousel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-carousel/image-carousel.component */ 46011);
/* harmony import */ var _now_in_ott_now_in_ott_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./now-in-ott/now-in-ott.component */ 45931);
/* harmony import */ var _now_in_theatres_now_in_theatres_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./now-in-theatres/now-in-theatres.component */ 16232);
/* harmony import */ var _top_regional_shows_top_regional_shows_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./top-regional-shows/top-regional-shows.component */ 70768);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 72448);








class HomePageComponent {
  constructor(meta) {
    this.meta = meta;
  }
  ngOnInit() {
    this.meta.addTag({
      name: 'description',
      content: 'Stay updated with the latest entertainment news, in-depth movie reviews, and box office updates at Cinema Kompany. Get exclusive content and insights on all your favorite films.'
    }, true);
    this.meta.addTag({
      name: 'title',
      content: 'Cinema Kompany: Entertainment News, Movie Reviews, Box Office'
    }, true);
    this.meta.addTag({
      name: 'image',
      content: '../../assets/images/logo3.png'
    }, true);
  }
  static #_ = this.ɵfac = function HomePageComponent_Factory(t) {
    return new (t || HomePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Meta));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: HomePageComponent,
    selectors: [["app-home-page"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 11,
    vars: 0,
    consts: [[2, "display", "grid", "row-gap", "3rem"], [2, "display", "grid"], ["id", "nowInTheatresContent", 2, "display", "grid"], ["id", "forthcomingReleasesContent", 2, "display", "grid"], ["id", "ottContent", 2, "display", "grid"]],
    template: function HomePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-carousel");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "app-now-in-theatres");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "app-top-regional-shows");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "app-image-carousel");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "app-now-in-ott");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_now_in_ott_now_in_ott_component__WEBPACK_IMPORTED_MODULE_2__.NowInOttComponent, _image_carousel_image_carousel_component__WEBPACK_IMPORTED_MODULE_1__.ImageCarouselComponent, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, _top_regional_shows_top_regional_shows_component__WEBPACK_IMPORTED_MODULE_4__.TopRegionalShowsComponent, _now_in_theatres_now_in_theatres_component__WEBPACK_IMPORTED_MODULE_3__.NowInTheatresComponent, _cover_page_carousel_carousel_component__WEBPACK_IMPORTED_MODULE_0__.CarouselComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 46011:
/*!**********************************************************************!*\
  !*** ./src/app/home-page/image-carousel/image-carousel.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCarouselComponent: () => (/* binding */ ImageCarouselComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/animations */ 11432);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 68308);










const _c0 = a0 => ({
  "active": a0
});
function ImageCarouselComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("touchstart", function ImageCarouselComponent_div_4_Template_div_touchstart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.onTouchStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const slide_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, i_r2 === ctx_r0.currentIndex));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", slide_r1.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", "Slide ", slide_r1.id, "");
  }
}
class ImageCarouselComponent {
  // Array to store the carousel slides
  constructor(movieService, zone) {
    this.movieService = movieService;
    this.zone = zone;
    // images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add your image URLs
    this.slides = [{
      id: 1,
      image: 'assets/images/NowinTheatres/2018.jpg'
    }];
    this.currentImage = '';
    // currentIndex: number = 0;
    // state: string = 'center';
    // backgroundImagePath: any;
    // private autoSlideInterval: any;
    this.animationState = 'hidden';
    this.showIndex = -1;
    this.currentIndex = 0; // Index of the currently displayed slide
    this.touchStartX = 0;
    this.isTouchSlide = false;
    this.dragging = false;
    this.threshold = 50;
    this.carouselHeight = 1080; // Height in pixels
    this.carouselWidth = 1920; // Width in pixels
    this.movieService.getMoviesDataFromAdvertisement().subscribe(ele => {
      ele.sort((a, b) => a.id - b.id);
      console.log(ele);
      this.slides = ele;
      console.log(this.slides);
      this.currentImage = "https://craftangelsbysita.com/" + this.slides[this.currentIndex].image;
      console.log(this.currentImage);
    });
  }
  ngOnInit() {
    console.log("loading component");
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100); // Wait for 100ms before starting the animation
    this.startSlideShow();
    console.log("component loaded");
  }
  startSlideShow() {
    this.zone.runOutsideAngular(() => {
      console.log("zonee1");
      this.interval = setInterval(() => {
        if (!this.isTouchSlide) {
          console.log("zonee2");
          this.zone.run(() => {
            this.nextSlide();
          });
        }
      }, 4000);
    });
  }
  stopSlideShow() {
    clearInterval(this.interval);
  }
  previousSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }
  onTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.dragging = true;
    this.isTouchSlide = true;
  }
  onTouchMove(event) {
    if (this.dragging) {
      const x = event.touches[0].clientX;
      const dx = x - this.touchStartX;
      if (dx > this.threshold) {
        this.previousSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      } else if (dx < -this.threshold) {
        this.nextSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      }
    }
  }
  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }
  nextSlide() {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
  }
  clickPrevSlide() {
    clearInterval(this.interval);
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.interval = setTimeout(() => {
      this.prevSlide();
    }, 4000);
  }
  clickNextSlide() {
    clearInterval(this.interval);
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
    this.interval = setTimeout(() => {
      this.nextSlide();
    }, 4000);
  }
  goToSlide(index) {
    this.currentIndex = index;
  }
  ngOnChanges() {
    console.log("changes");
    this.currentImage = "https://craftangelsbysita.com/" + this.slides[this.currentIndex].image;
    console.log(this.currentImage);
  }
  getCurrentImage() {
    console.log("this.slides", this.slides, this.currentIndex, "https://craftangelsbysita.com/" + this.slides[this.currentIndex].image);
    return "https://craftangelsbysita.com/" + this.slides[this.currentIndex].image;
  }
  getNextImage() {
    console.log("this.slides", this.slides);
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    return "https://craftangelsbysita.com/" + this.slides[nextIndex].image;
  }
  getPreviousImage() {
    console.log("this.slides", this.slides);
    const previousIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    return "https://craftangelsbysita.com/" + this.slides[previousIndex].image;
  }
  handleTopButtonClick() {
    this.stopSlideShow();
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    // Add logic for top button click
    this.startSlideShow();
  }
  handleBottomButtonClick() {
    this.stopSlideShow();
    // Move to the next image
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.startSlideShow();
  }
  static #_ = this.ɵfac = function ImageCarouselComponent_Factory(t) {
    return new (t || ImageCarouselComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ImageCarouselComponent,
    selectors: [["app-image-carousel"]],
    hostBindings: function ImageCarouselComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("touchstart", function ImageCarouselComponent_touchstart_HostBindingHandler($event) {
          return ctx.onTouchStart($event);
        })("touchmove", function ImageCarouselComponent_touchmove_HostBindingHandler($event) {
          return ctx.onTouchMove($event);
        });
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 17,
    vars: 5,
    consts: [[2, "font-family", "'Jost', sans-serif", "font-size", "28px", "font-weight", "600", "margin", "0 1rem  1rem 1rem", "padding", ".5rem"], [1, "main"], [1, "carousel-container"], ["class", "carousel-slide", 3, "ngClass", "touchstart", 4, "ngFor", "ngForOf"], [1, "center-display"], ["alt", "Previous Slide", 1, "previous-image", 3, "src", "click"], ["alt", "Current Slide", 1, "current-image", 3, "src"], ["alt", "Next Slide", 1, "next-image", 3, "src", "click"], [2, "position", "absolute", "right", "6%", "top", "3%", "z-index", "99", "opacity", ".7"], [1, "top-button", 3, "click"], [2, "display", "grid", "font-size", "5rem", "height", "5rem", "width", "5rem", "background-color", "transparent", "color", "red", "font-weight", "600"], [2, "position", "absolute", "right", "6%", "bottom", "12%", ";z-index", "99", "opacity", ".7"], [1, "bottom-button", 3, "click"], [1, "carousel-slide", 3, "ngClass", "touchstart"], [1, "image", 3, "src", "alt"]],
    template: function ImageCarouselComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Promo");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1)(3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ImageCarouselComponent_div_4_Template, 2, 5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ImageCarouselComponent_Template_img_click_6_listener() {
          return ctx.handleTopButtonClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ImageCarouselComponent_Template_img_click_8_listener() {
          return ctx.handleBottomButtonClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 8)(10, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ImageCarouselComponent_Template_button_click_10_listener() {
          return ctx.handleBottomButtonClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "keyboard_arrow_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 11)(14, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ImageCarouselComponent_Template_button_click_14_listener() {
          return ctx.handleTopButtonClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "keyboard_arrow_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@slideAnimation", ctx.currentIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.slides);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.getPreviousImage(), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.getCurrentImage(), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.getNextImage(), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule],
    styles: [".main[_ngcontent-%COMP%] {\n  display: grid;\n  position: relative;\n  margin: 0.4rem;\n}\n\n.gradient-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  \n\n  width: 100%;\n  \n\n  height: 100%;\n  \n\n}\n\n.gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(to left, rgba(11, 16, 23, 0.4) 0%, rgba(11, 16, 23, 0.1) 100%) !important;\n}\n\n.arrowButtonsLeft[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 40%;\n  left: 1%;\n  opacity: 0.6;\n  z-index: 3;\n  height: 1rem;\n  width: 1rem;\n  font-size: 1rem;\n}\n\n.arrowButtonsRight[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0.5;\n  top: 40%;\n  right: 0;\n  z-index: 3;\n  height: 1rem;\n  width: 1rem;\n  font-size: 1rem;\n}\n\n.carousel-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  justify-items: center;\n  justify-content: center;\n}\n\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n}\n\n.carousel-slide[_ngcontent-%COMP%]:not(.active) {\n  position: absolute;\n  top: 0;\n  left: 100%;\n}\n\n.headerNames[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.dot-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 50%;\n  position: relative;\n  top: 50%;\n  z-index: 200;\n  margin-right: 0.5rem;\n  border: 1px solid #999999;\n  cursor: pointer;\n  display: grid;\n  transition: transform 0.2s ease-in-out;\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] {\n  background-color: rgb(255, 208, 0);\n}\n\n.dot-indicators[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n}\n\n.circle[_ngcontent-%COMP%] {\n  stroke: #ffffff;\n  stroke-dasharray: 750;\n  stroke-dashoffset: 750;\n  -webkit-transition: all 0.5s ease-in-out;\n  opacity: 0.3;\n}\n\n.vertical-carousel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 30%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.vertical-carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 10%;\n}\n\n.vertical-carousel-slide[_ngcontent-%COMP%]:not(.active) {\n  position: absolute;\n  top: 0;\n  left: 100%;\n}\n\n.vertical-carousel-image[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.vertical-carousel-slide.active[_ngcontent-%COMP%] {\n  transform: translateY(0);\n}\n\n.main[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.center-display[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  position: absolute;\n  height: 45%;\n  top: 22%;\n  left: 0;\n  right: 1%;\n  bottom: 0;\n  overflow: hidden;\n}\n\n.previous-image[_ngcontent-%COMP%], .next-image[_ngcontent-%COMP%] {\n  max-height: 28%;\n  width: 20%;\n  transform: scale(0.8);\n  padding: 0.2rem 0;\n  z-index: 99;\n}\n\n.current-image[_ngcontent-%COMP%] {\n  max-height: 35%;\n  width: 20%;\n  transform: scale(1.1);\n  opacity: 0.65;\n}\n\n.previous-image[_ngcontent-%COMP%], .next-image[_ngcontent-%COMP%] {\n  opacity: 0.55;\n}\n\n.previous-image[_ngcontent-%COMP%], .next-image[_ngcontent-%COMP%], .center-image[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.bottom-button[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n}\n\n.top-button[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n}\n\n.previous-image[_ngcontent-%COMP%] {\n  bottom: 72%;\n}\n\n.next-image[_ngcontent-%COMP%] {\n  top: 72%;\n}\n\n.image[_ngcontent-%COMP%] {\n  object-fit: contain;\n  width: 87%;\n}\n\n@media screen and (min-width: 740px) {\n  .image[_ngcontent-%COMP%] {\n    height: 26rem;\n    width: 97%;\n    object-fit: cover;\n  }\n}\n@media screen and (min-width: 740px) {\n  .main[_ngcontent-%COMP%] {\n    display: grid;\n    height: 100% !important;\n    position: relative;\n  }\n  .arrowButtonsLeft[_ngcontent-%COMP%] {\n    height: 2.5rem;\n    width: 2.5rem;\n    font-size: 2.5rem;\n  }\n  .arrowButtonsRight[_ngcontent-%COMP%] {\n    height: 2.5rem;\n    width: 2.5rem;\n    font-size: 2.5rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS1wYWdlL2ltYWdlLWNhcm91c2VsL2ltYWdlLWNhcm91c2VsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUsYUFBQTtFQUVBLGtCQUFBO0VBQ0EsY0FBQTtBQURGOztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHVDQUFBO0VBQ0EsV0FBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFHQSxxR0FBQTtBQUpGOztBQVlBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBVEY7O0FBWUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFURjs7QUFZQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0FBVEY7O0FBY0E7RUFDRSxjQUFBO0FBWEY7O0FBZ0JBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBQWJGOztBQW1CQTtFQUNFLGFBQUE7QUFoQkY7O0FBcUJBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBbEJGOztBQXNCQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFFQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0Esc0NBQUE7QUFwQkY7O0FBdUJBO0VBQ0Usa0NBQUE7QUFwQkY7O0FBd0JBO0VBQ0UscUJBQUE7QUFyQkY7O0FBMkJBO0VBQ0UsZUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSx3Q0FBQTtFQUNBLFlBQUE7QUF4QkY7O0FBMkJBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUF4QkY7O0FBMkJBO0VBQ0UsYUFBQTtBQXhCRjs7QUE0QkE7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBekJGOztBQTRCQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBekJGOztBQTRCQTtFQUNFLHdCQUFBO0FBekJGOztBQTZCQTtFQUNFLGtCQUFBO0FBMUJGOztBQTZCQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBMUJGOztBQThCQTs7RUFHRSxlQUFBO0VBQ0EsVUFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FBNUJGOztBQWdDQTtFQUVFLGVBQUE7RUFDQSxVQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0FBOUJGOztBQWlDQTs7RUFFRSxhQUFBO0FBOUJGOztBQW1DQTs7O0VBR0Usa0JBQUE7QUFoQ0Y7O0FBbUNBO0VBQ0UsNkJBQUE7RUFDQSxZQUFBO0FBaENGOztBQW1DQTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtBQWhDRjs7QUFtQ0E7RUFDRSxXQUFBO0FBaENGOztBQW1DQTtFQUNFLFFBQUE7QUFoQ0Y7O0FBb0NBO0VBRUUsbUJBQUE7RUFDQSxVQUFBO0FBbENGOztBQXdDQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLFVBQUE7SUFDQSxpQkFBQTtFQXJDRjtBQUNGO0FBeUNBO0VBS0U7SUFFRSxhQUFBO0lBQ0EsdUJBQUE7SUFDQSxrQkFBQTtFQTVDRjtFQWdEQTtJQUVFLGNBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUEvQ0Y7RUFrREE7SUFFRSxjQUFBO0lBQ0EsYUFBQTtJQUNBLGlCQUFBO0VBakRGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XHJcblxyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgLy8gaGVpZ2h0OiA0NXJlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luOiAuNHJlbTtcclxufVxyXG5cclxuXHJcbi5ncmFkaWVudC1vdmVybGF5IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIC8qIG9yIGJsb2NrLCBkZXBlbmRpbmcgb24geW91ciBsYXlvdXQgKi9cclxuICB3aWR0aDogMTAwJTtcclxuICAvKiBBZGp1c3QgdGhlIHdpZHRoIGFzIG5lZWRlZCAqL1xyXG4gIGhlaWdodDogMTAwJTtcclxuICAvKiBBZGp1c3QgdGhlIGhlaWdodCBhcyBuZWVkZWQgKi9cclxufVxyXG5cclxuLmdyYWRpZW50IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIC8vIGZpbHRlcjogYnJpZ2h0bmVzcyg4MCUpO1xyXG4gIC8vIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMSwgMTYsIDIzLCAuOCkgMCUsIHJnYmEoMTEsIDE2LCAyMywgMC42MCkgMTAwJSk7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIHJnYmEoMTEsIDE2LCAyMywgLjQpIDAlLCByZ2JhKDExLCAxNiwgMjMsIDAuMSkgMTAwJSkgIWltcG9ydGFudDtcclxuXHJcblxyXG4gIC8vIG9wYWNpdHk6IDAuNztcclxuICAvLyBhbmltYXRpb246IG1vdmVHcmFkaWVudCA1cyBsaW5lYXIgaW5maW5pdGUsIHJvdGF0ZUdyYWRpZW50IDVzIGxpbmVhciBpbmZpbml0ZTtcclxuICAvLyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTsgLyogQWRqdXN0IGdyYWRpZW50IGNvbG9ycyBhbmQgZGlyZWN0aW9uICovXHJcbn1cclxuXHJcbi5hcnJvd0J1dHRvbnNMZWZ0IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA0MCU7XHJcbiAgbGVmdDogMSU7XHJcbiAgb3BhY2l0eTogLjY7XHJcbiAgei1pbmRleDogMztcclxuICBoZWlnaHQ6IDFyZW07XHJcbiAgd2lkdGg6IDFyZW07XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcblxyXG4uYXJyb3dCdXR0b25zUmlnaHQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBvcGFjaXR5OiAuNTtcclxuICB0b3A6IDQwJTtcclxuICByaWdodDogMDtcclxuICB6LWluZGV4OiAzO1xyXG4gIGhlaWdodDogMXJlbTtcclxuICB3aWR0aDogMXJlbTtcclxuICBmb250LXNpemU6IDFyZW07XHJcbn1cclxuXHJcbi5jYXJvdXNlbC1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAvLyBtYXJnaW46IDNyZW07XHJcbiAgLy8gb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmNhcm91c2VsLXNsaWRlIHtcclxuICBmbGV4OiAwIDAgMTAwJTtcclxuICAvLyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDtcclxufVxyXG5cclxuXHJcbi5jYXJvdXNlbC1zbGlkZTpub3QoLmFjdGl2ZSkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMTAwJTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLmhlYWRlck5hbWVzIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG5cclxufVxyXG5cclxuXHJcbi5kb3QtaW5kaWNhdG9ycyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAvLyBwYWRkaW5nOiAxcmVtO1xyXG59XHJcblxyXG4uZG90LWluZGljYXRvcnMgc3BhbiB7XHJcbiAgd2lkdGg6IC40cmVtO1xyXG4gIGhlaWdodDogLjRyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IDUwJTtcclxuICAvLyBsZWZ0OiA1MCU7XHJcbiAgei1pbmRleDogMjAwO1xyXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICM5OTk5OTk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbi5kb3QtaW5kaWNhdG9ycyBzcGFuLmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjA4LCAwKTtcclxuXHJcbn1cclxuXHJcbi5kb3QtaW5kaWNhdG9ycyBzcGFuOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5jaXJjbGUge1xyXG4gIHN0cm9rZTogI2ZmZmZmZjtcclxuICBzdHJva2UtZGFzaGFycmF5OiA3NTA7XHJcbiAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDc1MDtcclxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xyXG4gIG9wYWNpdHk6IDAuMztcclxufVxyXG5cclxuLnZlcnRpY2FsLWNhcm91c2VsIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHdpZHRoOiAzMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4udmVydGljYWwtY2Fyb3VzZWwtc2xpZGUge1xyXG4gIGZsZXg6IDAgMCAxMCU7XHJcbiAgLy8gdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbC1jYXJvdXNlbC1zbGlkZTpub3QoLmFjdGl2ZSkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMTAwJTtcclxufVxyXG5cclxuLnZlcnRpY2FsLWNhcm91c2VsLWltYWdlIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbC1jYXJvdXNlbC1zbGlkZS5hY3RpdmUge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxufVxyXG5cclxuXHJcbi5tYWluIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5jZW50ZXItZGlzcGxheSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGhlaWdodDogNDUlO1xyXG4gIHRvcDogMjIlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDElO1xyXG4gIGJvdHRvbTogMDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIC8vIHBhZGRpbmc6IC44cmVtIDA7XHJcbn1cclxuXHJcbi5wcmV2aW91cy1pbWFnZSxcclxuLy8gLmN1cnJlbnQtaW1hZ2UsXHJcbi5uZXh0LWltYWdlIHtcclxuICBtYXgtaGVpZ2h0OiAyOCU7XHJcbiAgd2lkdGg6IDIwJTtcclxuICB0cmFuc2Zvcm06IHNjYWxlKC44KTtcclxuICBwYWRkaW5nOiAuMnJlbSAwO1xyXG4gIHotaW5kZXg6IDk5O1xyXG5cclxufVxyXG5cclxuLmN1cnJlbnQtaW1hZ2Uge1xyXG4gIC8vIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gIG1heC1oZWlnaHQ6IDM1JTtcclxuICB3aWR0aDogMjAlO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICBvcGFjaXR5OiAuNjU7XHJcbn1cclxuXHJcbi5wcmV2aW91cy1pbWFnZSxcclxuLm5leHQtaW1hZ2Uge1xyXG4gIG9wYWNpdHk6IC41NSA7XHJcbiAgLy8gYm9yZGVyOiAycHggc29saWQgd2hpdGU7XHJcblxyXG59XHJcblxyXG4ucHJldmlvdXMtaW1hZ2UsXHJcbi5uZXh0LWltYWdlLFxyXG4uY2VudGVyLWltYWdlIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuXHJcbi5ib3R0b20tYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi50b3AtYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5wcmV2aW91cy1pbWFnZSB7XHJcbiAgYm90dG9tOiA3MiU7XHJcbn1cclxuXHJcbi5uZXh0LWltYWdlIHtcclxuICB0b3A6IDcyJTtcclxufVxyXG5cclxuXHJcbi5pbWFnZSB7XHJcbiAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbiAgd2lkdGg6IDg3JTtcclxuICAvLyBvcGFjaXR5OiAuMjtcclxuICBcclxufVxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc0MHB4KSB7XHJcbiAgLmltYWdle1xyXG4gICAgaGVpZ2h0OiAyNnJlbTtcclxuICAgIHdpZHRoOiA5NyU7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoIDo3NDBweCkge1xyXG5cclxuXHJcblxyXG5cclxuICAubWFpbiB7XHJcblxyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgLy8gbWFyZ2luOiAuNHJlbTtcclxuICB9XHJcblxyXG4gIC5hcnJvd0J1dHRvbnNMZWZ0IHtcclxuXHJcbiAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICAgIHdpZHRoOiAyLjVyZW07XHJcbiAgICBmb250LXNpemU6IDIuNXJlbTtcclxuICB9XHJcblxyXG4gIC5hcnJvd0J1dHRvbnNSaWdodCB7XHJcblxyXG4gICAgaGVpZ2h0OiAyLjVyZW07XHJcbiAgICB3aWR0aDogMi41cmVtO1xyXG4gICAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.trigger)('slideAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.transition)('* <=> *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.query)('.carousel-slide', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        transform: 'translateX(80%)',
        opacity: 0
      })], {
        optional: true
      }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.query)('.carousel-slide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.stagger)('0ms', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.animate)('.6s ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        transform: 'translateX(0)',
        opacity: 1
      }))]), {
        optional: true
      })])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.trigger)('textAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        opacity: 0,
        transform: 'translateX(-80px)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        opacity: 1,
        transform: 'translateX(0)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.transition)('hidden => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.animate)('400ms'))]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.trigger)('overlayAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        opacity: 0,
        transform: 'translateX(-100px)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
        opacity: 1,
        transform: 'translateX(0)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.transition)('hidden => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.animate)('400ms 800ms')) // Delay the overlay animation by 1 second
      ])]
    }
  });
}

/***/ }),

/***/ 45931:
/*!**************************************************************!*\
  !*** ./src/app/home-page/now-in-ott/now-in-ott.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NowInOttComponent: () => (/* binding */ NowInOttComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../more-videos-modal/more-videos-modal.component */ 39188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 12572);













function NowInOttComponent_div_8_img_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 24);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const movie_r2 = ctx_r8.$implicit;
    const i_r3 = ctx_r8.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", movie_r2.imageURL, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", "Slide ", i_r3 + 1, "");
  }
}
const _c0 = a0 => ({
  "filled": a0
});
function NowInOttComponent_div_8_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u2605");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const star_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c0, star_r9.filled));
  }
}
function NowInOttComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NowInOttComponent_div_8_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);
      const movie_r2 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r10.clickNowInTheatres(movie_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, NowInOttComponent_div_8_img_4_Template, 1, 2, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 12)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 13)(9, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " favorite_border ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "share");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, " add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, NowInOttComponent_div_8_span_18_Template, 2, 3, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 19)(20, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 21)(23, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const movie_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", movie_r2.imageURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r2 == null ? null : movie_r2.title, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.getStars(movie_r2.rating));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r2 == null ? null : movie_r2.platForm, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", movie_r2 == null ? null : movie_r2.type, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](movie_r2 == null ? null : movie_r2.subDiscription);
  }
}
class NowInOttComponent {
  constructor(movieService, sharedDataService, router, el, dialog) {
    this.movieService = movieService;
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.el = el;
    this.dialog = dialog;
    this.movies = [];
    this.movieService.getMovieFromNowInOtt().subscribe(ele => {
      ele.sort((a, b) => a.id - b.id);
      this.movies = ele;
    });
  }
  ngOnInit() {}
  clickNowInTheatres(movie) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/home-page/now_in_theatre'], {
      state: {
        data: movie
      }
    });
  }
  getStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({
        filled: i <= rating
      });
    }
    return stars;
  }
  openMoreVideosModal() {
    const dialogRef = this.dialog.open(_more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__.MoreVideosModalComponent, {
      height: '90%',
      // Adjust the width as per your design
      width: '75%',
      // Adjust the width as per your design
      data: {
        movies: this.movies
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  static #_ = this.ɵfac = function NowInOttComponent_Factory(t) {
    return new (t || NowInOttComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: NowInOttComponent,
    selectors: [["app-now-in-ott"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 9,
    vars: 1,
    consts: [["id", "scrollTarget"], ["scrollTarget", ""], [2, "display", "grid", "grid-template-columns", ".7fr .4fr", "margin", "1rem 0"], [2, "justify-content", "start", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "28px", "font-weight", "600", "line-height", "36px", "font-style", "normal", "padding", ".5rem 0", "margin", "0 1rem"], [2, "border", "none", "justify-self", "end", "align-items", "center", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "font-size", "14px", "font-weight", "bold", ";font-style", "normal", "text-transform", "uppercase", "background-color", "#e50916", "color", "white", "padding", "0 1.5rem", "margin-right", "18px", 3, "click"], [1, "main"], ["class", "carousel-slide", 3, "click", 4, "ngFor", "ngForOf"], [1, "carousel-slide", 3, "click"], ["scrollContainer", ""], [1, "slide-content"], ["content", ""], [3, "src", "alt", 4, "ngIf"], [1, "play-icon"], [2, "position", "absolute", "top", "85%", "right", "10%", "align-items", "center"], [1, "material-icons", 2, "padding", "0 .4rem"], [2, "padding", "0 .4rem"], [2, "display", "grid", "text-align", "start", "padding", ".8rem", "text-transform", "capitalize", "font-family", "'Jost'", "letter-spacing", "0.02em", "margin", "0", "font-size", "20px"], [1, "star-rating"], ["class", "star", 3, "ngClass", 4, "ngFor", "ngForOf"], [2, "display", "grid", "grid-template-columns", "auto auto", "margin", "0 .8rem", "grid-auto-flow", "column", "align-items", "center"], [2, "margin", "0", "text-transform", "capitalize", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "16px", "line-height", "normal", "color", "#cecfd1", "text-align", "left", "overflow", "auto"], [2, "display", "grid", "grid-template-columns", "min-content auto", "align-items", "center"], [2, "font-size", ".5rem", "align-items", "center", "display", "grid", "align-items", "center"], [2, "text-align", "start", "color", "#e50916", "font-weight", "600"], [3, "src", "alt"], [1, "star", 3, "ngClass"]],
    template: function NowInOttComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0, 1)(2, "div", 2)(3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " Now in OTT");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NowInOttComponent_Template_button_click_5_listener() {
          return ctx.openMoreVideosModal();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "See More");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, NowInOttComponent_div_8_Template, 29, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.movies);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule],
    styles: [".main[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-x: auto;\n  padding: 0px 0px 60px 0px;\n  margin: 0 0.4rem 0 0.4rem;\n  width: 96vw;\n}\n\n.play-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  visibility: hidden;\n  background-color: #b81d24; \n\n  border-radius: 50%; \n\n  width: 3rem; \n\n  height: 3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.play-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white; \n\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover   .play-icon[_ngcontent-%COMP%] {\n  visibility: visible;\n}\n\n.moreVideos[_ngcontent-%COMP%] {\n  display: grid;\n  justify-content: end;\n  margin-right: 0.2rem !important;\n}\n\n.heading[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  margin: 1rem;\n}\n\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  display: grid;\n  width: 50% !important;\n  height: 100%;\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05); \n\n  transition: transform 0.3s ease; \n\n}\n\n.slide-content[_ngcontent-%COMP%] {\n  display: grid;\n  position: relative;\n  padding-bottom: 125%; \n\n  margin: 0 0.3rem;\n}\n\n.slide-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: grid;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%; \n\n  height: 100%;\n  object-fit: cover;\n  filter: brightness(70%);\n}\n\n@media screen and (min-width: 650px) {\n  .main[_ngcontent-%COMP%] {\n    margin: 0 1rem !important;\n  }\n  .moreVideos[_ngcontent-%COMP%] {\n    margin-right: 2rem !important;\n  }\n  .heading[_ngcontent-%COMP%] {\n    margin: 1rem;\n  }\n  .carousel-slide[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 20% !important;\n    width: 100%;\n  }\n}\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n\n.star-rating[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.8rem;\n}\n\n.star[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #ffffff; \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #ffd700; \n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS1wYWdlL25vdy1pbi1vdHQvbm93LWluLW90dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBLEVBQUEseUNBQUE7RUFDQSxrQkFBQSxFQUFBLHlDQUFBO0VBQ0EsV0FBQSxFQUFBLHlFQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBLEVBQUEsZUFBQTtBQUZGOztBQUtBO0VBQ0UsbUJBQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLCtCQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQUZGOztBQU9BO0VBQ0Usc0JBQUEsRUFBQSxzREFBQTtFQUNBLCtCQUFBLEVBQUEsbUNBQUE7QUFKRjs7QUFPQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBLEVBQUEsc0VBQUE7RUFDQSxnQkFBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBLEVBQUEsNkRBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSx1QkFBQTtBQUpGOztBQVNBO0VBQ0U7SUFDRSx5QkFBQTtFQU5GO0VBVUE7SUFDRSw2QkFBQTtFQVJGO0VBV0E7SUFDRSxZQUFBO0VBVEY7RUFZQTtJQUNFLGNBQUE7SUFDQSxxQkFBQTtJQUVBLFdBQUE7RUFYRjtBQUNGO0FBY0Esa0NBQUE7QUFDQTtFQUNFLFFBQUE7RUFDQSxTQUFBO0FBWkY7O0FBZUEsMERBQUE7QUFDQTtFQUNFLHVCQUFBO0FBWkY7O0FBZUEsb0VBQUE7QUFDQTtFQUNFLHVCQUFBO0FBWkY7O0FBZUE7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBQVpGOztBQWVBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBLEVBQUEsdUJBQUE7QUFaRjs7QUFlQTtFQUNFLGNBQUEsRUFBQSxzQkFBQTtBQVpGIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICBwYWRkaW5nOiAwcHggMHB4IDYwcHggMHB4O1xyXG4gIG1hcmdpbjogMCAuNHJlbSAwIC40cmVtO1xyXG4gIHdpZHRoOiA5NnZ3O1xyXG5cclxuICAvLyBnYXA6IDFyZW07XHJcbn1cclxuXHJcblxyXG4ucGxheS1pY29uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiNiODFkMjQ7IC8qIEJhY2tncm91bmQgY29sb3IgZm9yIHRoZSBwbGF5IGJ1dHRvbiAqL1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTsgLyogTWFrZXMgdGhlIGJhY2tncm91bmQgcGVyZmVjdGx5IHJvdW5kICovXHJcbiAgd2lkdGg6IDNyZW07IC8qIFNldCB0aGUgd2lkdGggYW5kIGhlaWdodCB0byBjb250cm9sIHRoZSBzaXplIG9mIHRoZSByb3VuZCBiYWNrZ3JvdW5kICovXHJcbiAgaGVpZ2h0OiAzcmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnBsYXktaWNvbiBtYXQtaWNvbiB7XHJcbiAgY29sb3I6IHdoaXRlOyAvKiBJY29uIGNvbG9yICovXHJcbn1cclxuXHJcbi5jYXJvdXNlbC1zbGlkZTpob3ZlciAucGxheS1pY29uIHtcclxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG59XHJcblxyXG4ubW9yZVZpZGVvcyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcclxuICBtYXJnaW4tcmlnaHQ6IC4ycmVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5oZWFkaW5nIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcclxuICBtYXJnaW46IDFyZW07XHJcbn1cclxuXHJcbi5jYXJvdXNlbC1zbGlkZSB7XHJcbiAgZmxleDogMCAwIGF1dG87XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICB3aWR0aDogY2FsYygxMDAlIC8gMikgIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgLy8gd2lkdGg6IGF1O1xyXG5cclxufVxyXG5cclxuLmNhcm91c2VsLXNsaWRlOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpOyAvKiBBZGp1c3QgdGhlIHNjYWxlIGZhY3RvciB0byBjb250cm9sIHRoZSB6b29tIGxldmVsICovXHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTsgLyogQWRkIGEgc21vb3RoIHRyYW5zaXRpb24gZWZmZWN0ICovXHJcbn1cclxuXHJcbi5zbGlkZS1jb250ZW50IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWJvdHRvbTogMTI1JTsgLyogQWRqdXN0IHRoZSBwYWRkaW5nLWJvdHRvbSB2YWx1ZSB0byBjb250cm9sIHRoZSBoZWlnaHQgb2YgdGhlIGNhcmQgKi9cclxuICBtYXJnaW46IDAgLjNyZW07XHJcbn1cclxuXHJcbi5zbGlkZS1jb250ZW50IGltZyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7IC8qIFNldCB0aGUgd2lkdGggdG8gMTAwJSB0byB0YWtlIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBjYXJkICovXHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gIGZpbHRlcjogYnJpZ2h0bmVzcyg3MCUpO1xyXG59XHJcblxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGggOjY1MHB4KSB7XHJcbiAgLm1haW4ge1xyXG4gICAgbWFyZ2luOiAwIDFyZW0gIWltcG9ydGFudDtcclxuXHJcblxyXG4gIH1cclxuICAubW9yZVZpZGVvc3tcclxuICAgIG1hcmdpbi1yaWdodDogMnJlbSAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLmhlYWRpbmcge1xyXG4gICAgbWFyZ2luOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLmNhcm91c2VsLXNsaWRlIHtcclxuICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAvIDUpICFpbXBvcnRhbnQ7XHJcbiAgICAvLyBoZWlnaHQ6IDYwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxufVxyXG5cclxuLyogSGlkZSB0aGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG59XHJcblxyXG4vKiBPcHRpb25hbDogU3R5bGUgdGhlIHRyYWNrICh0aGUgYXJlYSBiZWhpbmQgdGhlIHRodW1iKSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4uc3Rhci1yYXRpbmcge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcGFkZGluZzogLjhyZW1cclxufVxyXG5cclxuLnN0YXIge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGNvbG9yOiAjZmZmZmZmOyAvKiBkZWZhdWx0IHN0YXIgY29sb3IgKi9cclxufVxyXG5cclxuLnN0YXIuZmlsbGVkIHtcclxuICBjb2xvcjogI2ZmZDcwMDsgLyogZmlsbGVkIHN0YXIgY29sb3IgKi9cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 16232:
/*!************************************************************************!*\
  !*** ./src/app/home-page/now-in-theatres/now-in-theatres.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NowInTheatresComponent: () => (/* binding */ NowInTheatresComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../more-videos-modal/more-videos-modal.component */ 39188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 12572);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 75388);













function NowInTheatresComponent_div_6_img_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 20);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const movie_r1 = ctx_r5.$implicit;
    const i_r2 = ctx_r5.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", movie_r1.imageURL, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", "Slide ", i_r2 + 1, "");
  }
}
const _c0 = a0 => ({
  "filled": a0
});
function NowInTheatresComponent_div_6_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u2605");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const star_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c0, star_r6.filled));
  }
}
function NowInTheatresComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NowInTheatresComponent_div_6_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const movie_r1 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.clickNowInTheatres(movie_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, NowInTheatresComponent_div_6_img_2_Template, 1, 2, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 8)(4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 9)(7, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " favorite_border ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "share");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, NowInTheatresComponent_div_6_span_16_Template, 2, 3, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 15)(18, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 17)(21, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const movie_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", movie_r1.imageURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r1 == null ? null : movie_r1.title, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.getStars(movie_r1.rating));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r1 == null ? null : movie_r1.duration, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", movie_r1 == null ? null : movie_r1.type, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](movie_r1 == null ? null : movie_r1.subDiscription);
  }
}
class NowInTheatresComponent {
  constructor(dialog, movieService, sharedDataService, router) {
    this.dialog = dialog;
    this.movieService = movieService;
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.movies = [];
  }
  ngOnInit() {
    this.movieService.getMoviesData().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.movies = data;
    });
  }
  clickNowInTheatres(movie) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/now_in_theatre'], {
      state: {
        data: movie
      }
    });
  }
  getStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({
        filled: i <= rating
      });
    }
    return stars;
  }
  openMoreVideosModal() {
    const dialogRef = this.dialog.open(_more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__.MoreVideosModalComponent, {
      height: '90%',
      // Adjust the width as per your design
      width: '75%',
      data: {
        movies: this.movies
      }
    });
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    overlayContainer?.classList.add('dialog-open');
    dialogRef.afterClosed().subscribe(() => {
      // Remove the class when the dialog is closed
      overlayContainer?.classList.remove('dialog-open');
    });
  }
  static #_ = this.ɵfac = function NowInTheatresComponent_Factory(t) {
    return new (t || NowInTheatresComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: NowInTheatresComponent,
    selectors: [["app-now-in-theatres"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 7,
    vars: 1,
    consts: [[2, "display", "grid", "grid-template-columns", ".7fr .4fr", "margin", "1rem 0"], [2, "justify-content", "start", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "28px", "font-weight", "600", "line-height", "36px", "font-style", "normal", "padding", ".5rem 0", "margin", "0 1rem"], [2, "border", "none", "justify-self", "end", "align-items", "center", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "font-size", "14px", "font-weight", "bold", "line-height", "36px", "font-style", "normal", "text-transform", "uppercase", "background-color", "#e50916", "color", "white", "padding", "0 1.5rem", "margin-right", "18px", 3, "click"], [1, "main"], ["class", "carousel-slide", 3, "click", 4, "ngFor", "ngForOf"], [1, "carousel-slide", 3, "click"], [1, "slide-content"], [3, "src", "alt", 4, "ngIf"], [1, "play-icon"], [2, "position", "absolute", "top", "85%", "right", "10%", "align-items", "center"], [1, "material-icons", 2, "padding", "0 .4rem"], [2, "padding", "0 .4rem"], [2, "display", "grid", "text-align", "start", "padding", ".8rem", "text-transform", "capitalize", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "20px"], [1, "star-rating"], ["class", "star", 3, "ngClass", 4, "ngFor", "ngForOf"], [2, "display", "grid", "grid-template-columns", "auto auto", "margin", "0 .8rem", "grid-auto-flow", "column", "align-items", "center"], [2, "margin", "0", "text-transform", "capitalize", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "16px", "line-height", "normal", "color", "#cecfd1", "text-align", "left", "overflow", "auto"], [2, "display", "grid", "grid-template-columns", "min-content auto", "align-items", "center"], [2, "font-size", ".5rem", "align-items", "center", "display", "grid", "align-items", "center"], [2, "text-align", "start", "color", "#e50916", "font-weight", "600"], [3, "src", "alt"], [1, "star", 3, "ngClass"]],
    template: function NowInTheatresComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Now In Theatre");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NowInTheatresComponent_Template_button_click_3_listener() {
          return ctx.openMoreVideosModal();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "See More");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, NowInTheatresComponent_div_6_Template, 27, 6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.movies);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule],
    styles: [".main[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-y: hidden;\n  margin: 0 0.4rem;\n  width: 96vw;\n}\n\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: 50%;\n  height: 100%;\n}\n\n\n\n.mat-dialog-container[_ngcontent-%COMP%]  .cdk-overlay-container {\n  position: relative;\n}\n.mat-dialog-container[_ngcontent-%COMP%]  .cdk-overlay-container.dialog-open {\n  filter: blur(5px); \n\n  pointer-events: none; \n\n}\n\n\n\n.mat-dialog-container[_ngcontent-%COMP%]  .mat-dialog-container {\n  filter: none;\n  pointer-events: auto; \n\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n  \n\n  transition: transform 0.3s ease;\n  \n\n}\n\n.slide-content[_ngcontent-%COMP%] {\n  display: grid;\n  position: relative;\n  padding-bottom: 125%;\n  margin: 0 0.3rem;\n}\n\n.slide-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: grid;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  filter: brightness(70%);\n  object-fit: cover;\n  overflow-y: hidden;\n  overflow-x: auto;\n}\n\n.moreVideos[_ngcontent-%COMP%] {\n  display: grid;\n  justify-content: end;\n  margin-right: 0.2rem !important;\n}\n\n.play-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  visibility: hidden;\n  background-color: #b81d24; \n\n  border-radius: 50%; \n\n  width: 3rem; \n\n  height: 3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.play-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white; \n\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover   .play-icon[_ngcontent-%COMP%] {\n  visibility: visible;\n}\n\n@media screen and (min-width: 650px) {\n  .carousel-slide[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 20% !important;\n    height: 60% !important;\n    width: 25%;\n  }\n  .moreVideos[_ngcontent-%COMP%] {\n    margin-right: 2rem !important;\n  }\n  .main[_ngcontent-%COMP%] {\n    margin: 0 1rem;\n  }\n}\n.star-rating[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.6rem;\n}\n\n.star[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #ffffff; \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #ffd700; \n\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS1wYWdlL25vdy1pbi10aGVhdHJlcy9ub3ctaW4tdGhlYXRyZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUdBLCtEQUFBO0FBQ0E7RUFDRSxrQkFBQTtBQUFGO0FBRUU7RUFDRSxpQkFBQSxFQUFBLHFDQUFBO0VBQ0Esb0JBQUEsRUFBQSxrREFBQTtBQUFKOztBQUlBLGlEQUFBO0FBQ0E7RUFDRSxZQUFBO0VBQ0Esb0JBQUEsRUFBQSx1REFBQTtBQURGOztBQVFBO0VBQ0UscUJBQUE7RUFDQSxzREFBQTtFQUNBLCtCQUFBO0VBQ0EsbUNBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLGFBQUE7RUFFQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQVJGOztBQWFBO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsK0JBQUE7QUFWRjs7QUFhQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUEsRUFBQSx5Q0FBQTtFQUNBLGtCQUFBLEVBQUEseUNBQUE7RUFDQSxXQUFBLEVBQUEseUVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFWRjs7QUFhQTtFQUNFLFlBQUEsRUFBQSxlQUFBO0FBVkY7O0FBYUE7RUFDRSxtQkFBQTtBQVZGOztBQWVBO0VBQ0U7SUFDRSxjQUFBO0lBQ0EscUJBQUE7SUFDQSxzQkFBQTtJQUNBLFVBQUE7RUFaRjtFQWNBO0lBQ0UsNkJBQUE7RUFaRjtFQWVBO0lBQ0UsY0FBQTtFQWJGO0FBQ0Y7QUFnQkE7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBQWRGOztBQWlCQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQSxFQUFBLHVCQUFBO0FBZEY7O0FBaUJBO0VBQ0UsY0FBQSxFQUFBLHNCQUFBO0FBZEY7O0FBaUJBLGtDQUFBO0FBQ0E7RUFDRSxRQUFBO0VBQ0EsU0FBQTtBQWRGOztBQWlCQSwwREFBQTtBQUNBO0VBQ0UsdUJBQUE7QUFkRjs7QUFpQkEsb0VBQUE7QUFDQTtFQUNFLHVCQUFBO0FBZEYiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgbWFyZ2luOiAwIC40cmVtO1xyXG4gIHdpZHRoOiA5NnZ3O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtc2xpZGUge1xyXG4gIGZsZXg6IDAgMCBhdXRvO1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLyAyKTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgLy8gd2lkdGg6IDgwJTtcclxuXHJcbn1cclxuLyogQXBwbHkgYSBibHVyIGVmZmVjdCB0byB0aGUgb3ZlcmxheSB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlbiAqL1xyXG4ubWF0LWRpYWxvZy1jb250YWluZXI6Om5nLWRlZXAgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAmLmRpYWxvZy1vcGVuIHtcclxuICAgIGZpbHRlcjogYmx1cig1cHgpOyAvKiBBZGp1c3QgdGhlIGJsdXIgYW1vdW50IGFzIG5lZWRlZCAqL1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IC8qIEFsbG93IGludGVyYWN0aW9uIHdpdGggdGhlIHVuZGVybHlpbmcgY29udGVudCAqL1xyXG4gIH1cclxufVxyXG5cclxuLyogUmVzZXQgdGhlIGJsdXIgZWZmZWN0IGZvciB0aGUgZGlhbG9nIGNvbnRlbnQgKi9cclxuLm1hdC1kaWFsb2ctY29udGFpbmVyOjpuZy1kZWVwIC5tYXQtZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgZmlsdGVyOiBub25lO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvOyAvKiBSZXN0b3JlIG5vcm1hbCBpbnRlcmFjdGlvbiB3aXRoIHRoZSBkaWFsb2cgY29udGVudCAqL1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLmNhcm91c2VsLXNsaWRlOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMTApO1xyXG4gIC8qIEFkanVzdCB0aGUgc2NhbGUgZmFjdG9yIHRvIGNvbnRyb2wgdGhlIHpvb20gbGV2ZWwgKi9cclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xyXG4gIC8qIEFkZCBhIHNtb290aCB0cmFuc2l0aW9uIGVmZmVjdCAqL1xyXG59XHJcblxyXG5cclxuXHJcbi5zbGlkZS1jb250ZW50IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWJvdHRvbTogMTI1JTtcclxuICBtYXJnaW46IDAgLjNyZW07XHJcbn1cclxuXHJcbi5zbGlkZS1jb250ZW50IGltZyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICAvLyBib3JkZXI6LjZweCBzb2xpZCByZ2IoNzksIDc5LCA3OSk7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBmaWx0ZXI6IGJyaWdodG5lc3MoNzAlKTtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICAvLyBib3JkZXI6IDNweCBzb2xpZCByZ2IoMTkyLCAxOTIsIDE5MiwwLjUpO1xyXG5cclxufVxyXG5cclxuLm1vcmVWaWRlb3Mge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBlbmQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAuMnJlbSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ucGxheS1pY29uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiNiODFkMjQ7IC8qIEJhY2tncm91bmQgY29sb3IgZm9yIHRoZSBwbGF5IGJ1dHRvbiAqL1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTsgLyogTWFrZXMgdGhlIGJhY2tncm91bmQgcGVyZmVjdGx5IHJvdW5kICovXHJcbiAgd2lkdGg6IDNyZW07IC8qIFNldCB0aGUgd2lkdGggYW5kIGhlaWdodCB0byBjb250cm9sIHRoZSBzaXplIG9mIHRoZSByb3VuZCBiYWNrZ3JvdW5kICovXHJcbiAgaGVpZ2h0OiAzcmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnBsYXktaWNvbiBtYXQtaWNvbiB7XHJcbiAgY29sb3I6IHdoaXRlOyAvKiBJY29uIGNvbG9yICovXHJcbn1cclxuXHJcbi5jYXJvdXNlbC1zbGlkZTpob3ZlciAucGxheS1pY29uIHtcclxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG59XHJcblxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGggOjY1MHB4KSB7XHJcbiAgLmNhcm91c2VsLXNsaWRlIHtcclxuICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAvIDUpICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDYwJSAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IDI1JTtcclxuICB9XHJcbiAgLm1vcmVWaWRlb3N7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDJyZW0gIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5tYWluIHtcclxuICAgIG1hcmdpbjogMCAxcmVtO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXItcmF0aW5nIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBhZGRpbmc6IC42cmVtXHJcbn1cclxuXHJcbi5zdGFyIHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBjb2xvcjogI2ZmZmZmZjsgLyogZGVmYXVsdCBzdGFyIGNvbG9yICovXHJcbn1cclxuXHJcbi5zdGFyLmZpbGxlZCB7XHJcbiAgY29sb3I6ICNmZmQ3MDA7IC8qIGZpbGxlZCBzdGFyIGNvbG9yICovXHJcbn1cclxuXHJcbi8qIEhpZGUgdGhlIGhvcml6b250YWwgc2Nyb2xsYmFyICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiAwO1xyXG4gIGhlaWdodDogMDtcclxufVxyXG5cclxuLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0cmFjayAodGhlIGFyZWEgYmVoaW5kIHRoZSB0aHVtYikgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi8qIE9wdGlvbmFsOiBTdHlsZSB0aGUgdGh1bWIgKHRoZSBkcmFnZ2FibGUgcGFydCBvZiB0aGUgc2Nyb2xsYmFyKSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 70768:
/*!******************************************************************************!*\
  !*** ./src/app/home-page/top-regional-shows/top-regional-shows.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopRegionalShowsComponent: () => (/* binding */ TopRegionalShowsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../more-videos-modal/more-videos-modal.component */ 39188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 12572);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 75388);













function TopRegionalShowsComponent_div_7_img_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 17);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const movie_r1 = ctx_r5.$implicit;
    const i_r2 = ctx_r5.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", movie_r1.imageURL, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", "Slide ", i_r2 + 1, "");
  }
}
const _c0 = a0 => ({
  "filled": a0
});
function TopRegionalShowsComponent_div_7_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u2605");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const star_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c0, star_r7.filled));
  }
}
function TopRegionalShowsComponent_div_7_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, TopRegionalShowsComponent_div_7_div_7_span_1_Template, 2, 3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r4.getStars(movie_r1.rating));
  }
}
function TopRegionalShowsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopRegionalShowsComponent_div_7_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const movie_r1 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.clickNowInTheatres(movie_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, TopRegionalShowsComponent_div_7_img_1_Template, 1, 2, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 8)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, TopRegionalShowsComponent_div_7_div_7_Template, 2, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 11)(9, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 13)(12, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const movie_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", movie_r1 == null ? null : movie_r1.imageURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r1 == null ? null : movie_r1.title, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.showStar);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r1 == null ? null : movie_r1.duration, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", movie_r1 == null ? null : movie_r1.type, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", movie_r1 == null ? null : movie_r1.subDiscription, "");
  }
}
class TopRegionalShowsComponent {
  constructor(dialog, movieService, sharedDataService, router) {
    this.dialog = dialog;
    this.movieService = movieService;
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.movies = [];
    this.showStar = false;
  }
  ngOnInit() {
    this.movieService.getMoviesDataFromForthcomingReleases().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.movies = data;
    });
  }
  clickNowInTheatres(movie) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/home-page/now_in_theatre'], {
      state: {
        data: movie
      }
    });
  }
  getStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({
        filled: i <= rating
      });
    }
    return stars;
  }
  openMoreVideosModal() {
    const dialogRef = this.dialog.open(_more_videos_modal_more_videos_modal_component__WEBPACK_IMPORTED_MODULE_2__.MoreVideosModalComponent, {
      height: '90%',
      // Adjust the width as per your design
      width: '75%',
      // Adjust the width as per your design
      data: {
        movies: this.movies
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  static #_ = this.ɵfac = function TopRegionalShowsComponent_Factory(t) {
    return new (t || TopRegionalShowsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: TopRegionalShowsComponent,
    selectors: [["app-top-regional-shows"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 8,
    vars: 1,
    consts: [[2, "display", "grid", "grid-template-columns", ".7fr .4fr", "margin", "1rem 0"], [2, "justify-content", "start", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "28px", "font-weight", "600", "line-height", "36px", "font-style", "normal", "padding", ".5rem 0", "margin", "0 1rem"], [2, "border", "none", "justify-self", "end", "align-items", "center", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "font-size", "14px", "font-weight", "bold", "line-height", "36px", "font-style", "normal", "text-transform", "uppercase", "background-color", "#e50916", "color", "white", "padding", "0 1.5rem", "margin-right", "18px", 3, "click"], [1, "carousel-container"], [1, "carousel"], ["class", "carousel-slide", 3, "click", 4, "ngFor", "ngForOf"], [1, "carousel-slide", 3, "click"], [3, "src", "alt", 4, "ngIf"], [1, "play-icon"], [2, "display", "grid", "text-align", "start", "padding", ".8rem", "text-transform", "capitalize", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "20px"], ["class", "star-rating", 4, "ngIf"], [2, "display", "grid", "grid-template-columns", "auto auto", "margin", "0 .8rem", "grid-auto-flow", "column", "align-items", "center"], [2, "margin", "0", "text-transform", "capitalize", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "16px", "line-height", "normal", "color", "#cecfd1", "text-align", "left", "overflow", "auto"], [2, "display", "grid", "grid-template-columns", "min-content auto", "align-items", "center"], [2, "font-size", ".5rem", "align-items", "center", "display", "grid", "align-items", "center"], [2, "text-align", "start", "color", "#e50916", "font-weight", "600"], [2, "display", "grid", "text-align", "center", "margin", "0", "font-family", "'Jost', sans-serif", "letter-spacing", "0.02em", "margin", "0", "font-size", "20px", "font-weight", "400", "line-height", "28px", "font-style", "normal", "text-transform", "capitalize"], [3, "src", "alt"], [1, "star-rating"], ["class", "star", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "star", 3, "ngClass"]],
    template: function TopRegionalShowsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Forthcoming Releases");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopRegionalShowsComponent_Template_button_click_3_listener() {
          return ctx.openMoreVideosModal();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "See More");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3)(6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, TopRegionalShowsComponent_div_7_Template, 18, 6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.movies);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule],
    styles: [".carousel-container[_ngcontent-%COMP%] {\n  overflow-x: scroll;\n  margin: 0 1rem;\n}\n\n.carousel[_ngcontent-%COMP%] {\n  display: flex;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 50%;\n  height: auto;\n  max-width: 30rem; \n\n}\n\n.play-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 40%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  visibility: hidden;\n  background-color: #b81d24; \n\n  border-radius: 50%; \n\n  width: 3rem; \n\n  height: 3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.play-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white; \n\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover   .play-icon[_ngcontent-%COMP%] {\n  visibility: visible;\n}\n\n.carousel-slide[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n\n.carousel-slide[_ngcontent-%COMP%]:hover {\n  transform: scale(1.07); \n\n  transition: transform 0.3s ease; \n\n}\n\n.moreVideos[_ngcontent-%COMP%] {\n  display: grid;\n  justify-content: end;\n  margin-right: 0.5rem !important;\n}\n\n.star-rating[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.8rem;\n}\n\n.star[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #ffffff; \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #ffd700; \n\n}\n\n.carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 98% !important;\n  height: 85% !important;\n  object-fit: cover;\n}\n\n@media screen and (min-width: 740px) {\n  .carousel-slide[_ngcontent-%COMP%] {\n    flex: 0 0 20%;\n    height: auto;\n    filter: brightness(80%) !important;\n    padding: 0 0 3rem 0;\n  }\n  .moreVideos[_ngcontent-%COMP%] {\n    margin-right: 2rem !important;\n  }\n  .carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    display: grid;\n    justify-content: center;\n    width: 99% !important;\n    height: 80% !important;\n    justify-content: center !important;\n    object-fit: cover;\n  }\n}\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n\n@media screen and (max-width: 520px) {\n  .carousel-container[_ngcontent-%COMP%] {\n    overflow-x: scroll;\n    margin: 0 1rem;\n    width: 96vw;\n  }\n  .carousel[_ngcontent-%COMP%] {\n    display: flex;\n    width: 100%;\n  }\n  .carousel-slide[_ngcontent-%COMP%] {\n    flex: 0 0 50%;\n    height: auto;\n    max-width: 30rem;\n    \n\n    flex: 0 0 auto;\n    display: grid;\n    width: 50% !important;\n    height: 100%;\n  }\n  .play-icon[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 40%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    visibility: hidden;\n    background-color: #b81d24;\n    \n\n    border-radius: 50%;\n    \n\n    width: 3rem;\n    \n\n    height: 3rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .play-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    color: white;\n    \n\n  }\n  .carousel-slide[_ngcontent-%COMP%]:hover   .play-icon[_ngcontent-%COMP%] {\n    visibility: visible;\n  }\n  .carousel-slide[_ngcontent-%COMP%]:last-child {\n    margin-right: 0;\n  }\n  .carousel-slide[_ngcontent-%COMP%]:hover {\n    transform: scale(1.07);\n    \n\n    transition: transform 0.3s ease;\n    \n\n  }\n  .moreVideos[_ngcontent-%COMP%] {\n    display: grid;\n    justify-content: end;\n    margin-right: 0.5rem !important;\n  }\n  .star-rating[_ngcontent-%COMP%] {\n    display: flex;\n    padding: 0.8rem;\n  }\n  .star[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    color: #ffffff;\n    \n\n  }\n  .star.filled[_ngcontent-%COMP%] {\n    color: #ffd700;\n    \n\n  }\n  .carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    display: grid;\n    justify-content: center;\n    \n\n    justify-content: center !important;\n    width: 96%;\n  }\n  \n\n  \n\n  \n\n}\n@media screen and (max-width: 520px) and (min-width: 740px) {\n  .carousel-slide[_ngcontent-%COMP%] {\n    flex: 0 0 20%;\n    height: auto;\n    filter: brightness(80%) !important;\n    padding: 0 0 3rem 0;\n    flex: 0 0 auto;\n    display: grid;\n    width: 50% !important;\n    height: 100%;\n  }\n  .moreVideos[_ngcontent-%COMP%] {\n    margin-right: 2rem !important;\n  }\n  .carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    flex: 0 0 20%;\n    height: auto;\n    filter: brightness(80%) !important;\n    padding: 0 0 3rem 0;\n    flex: 0 0 auto;\n    display: grid;\n    width: 50% !important;\n    height: 100%;\n  }\n}\n@media screen and (max-width: 520px) {\n  [_ngcontent-%COMP%]::-webkit-scrollbar {\n    width: 0;\n    height: 0;\n  }\n  [_ngcontent-%COMP%]::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  [_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n    background: transparent;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS1wYWdlL3RvcC1yZWdpb25hbC1zaG93cy90b3AtcmVnaW9uYWwtc2hvd3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxrQkFBQTtFQUVBLGNBQUE7QUFERjs7QUFPQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUFBLGtCQUFBO0FBSkY7O0FBT0E7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUVBLGdCQUFBLEVBQUEsc0NBQUE7QUFMRjs7QUFZQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUEsRUFBQSx5Q0FBQTtFQUNBLGtCQUFBLEVBQUEseUNBQUE7RUFDQSxXQUFBLEVBQUEseUVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFURjs7QUFZQTtFQUNFLFlBQUEsRUFBQSxlQUFBO0FBVEY7O0FBWUE7RUFDRSxtQkFBQTtBQVRGOztBQWFBO0VBQ0UsZUFBQTtBQVZGOztBQVlBO0VBQ0Usc0JBQUEsRUFBQSxzREFBQTtFQUNBLCtCQUFBLEVBQUEsbUNBQUE7QUFURjs7QUFXQTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLCtCQUFBO0FBUkY7O0FBWUE7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBQVRGOztBQVlBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBLEVBQUEsdUJBQUE7QUFURjs7QUFZQTtFQUNFLGNBQUEsRUFBQSxzQkFBQTtBQVRGOztBQWFBO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0FBVkY7O0FBY0E7RUFDRTtJQUNFLGFBQUE7SUFDQSxZQUFBO0lBQ0Esa0NBQUE7SUFDQSxtQkFBQTtFQVhGO0VBaUJBO0lBQ0UsNkJBQUE7RUFmRjtFQWlCQTtJQUNFLGFBQUE7SUFDQSx1QkFBQTtJQUNBLHFCQUFBO0lBQ0Esc0JBQUE7SUFDQSxrQ0FBQTtJQUNBLGlCQUFBO0VBZkY7QUFDRjtBQXlCQSxrQ0FBQTtBQUNBO0VBQ0UsUUFBQTtFQUNBLFNBQUE7QUF2QkY7O0FBMEJBLDBEQUFBO0FBQ0E7RUFDRSx1QkFBQTtBQXZCRjs7QUEwQkEsb0VBQUE7QUFDQTtFQUNFLHVCQUFBO0FBdkJGOztBQTJCQTtFQUNFO0lBRUUsa0JBQUE7SUFFQSxjQUFBO0lBQ0EsV0FBQTtFQTFCRjtFQStCQTtJQUNFLGFBQUE7SUFDQSxXQUFBO0VBN0JGO0VBZ0NBO0lBQ0UsYUFBQTtJQUNBLFlBQUE7SUFFQSxnQkFBQTtJQUNBLHNDQUFBO0lBSUEsY0FBQTtJQUNBLGFBQUE7SUFDQSxxQkFBQTtJQUNBLFlBQUE7RUFsQ0Y7RUF3Q0E7SUFDRSxrQkFBQTtJQUNBLFFBQUE7SUFDQSxTQUFBO0lBQ0EsZ0NBQUE7SUFDQSxrQkFBQTtJQUNBLHlCQUFBO0lBQ0EseUNBQUE7SUFDQSxrQkFBQTtJQUNBLHlDQUFBO0lBQ0EsV0FBQTtJQUNBLHlFQUFBO0lBQ0EsWUFBQTtJQUNBLGFBQUE7SUFDQSx1QkFBQTtJQUNBLG1CQUFBO0VBdENGO0VBeUNBO0lBQ0UsWUFBQTtJQUNBLGVBQUE7RUF2Q0Y7RUEwQ0E7SUFDRSxtQkFBQTtFQXhDRjtFQTRDQTtJQUNFLGVBQUE7RUExQ0Y7RUE2Q0E7SUFDRSxzQkFBQTtJQUNBLHNEQUFBO0lBQ0EsK0JBQUE7SUFDQSxtQ0FBQTtFQTNDRjtFQThDQTtJQUNFLGFBQUE7SUFDQSxvQkFBQTtJQUNBLCtCQUFBO0VBNUNGO0VBZ0RBO0lBQ0UsYUFBQTtJQUNBLGVBQUE7RUE5Q0Y7RUFpREE7SUFDRSxpQkFBQTtJQUNBLGNBQUE7SUFDQSx1QkFBQTtFQS9DRjtFQWtEQTtJQUNFLGNBQUE7SUFDQSxzQkFBQTtFQWhERjtFQW9EQTtJQUNFLGFBQUE7SUFDQSx1QkFBQTtJQUNBLDRCQUFBO0lBQ0Esa0NBQUE7SUFDQSxVQUFBO0VBbERGO0VBK0ZBLGtDQUFBO0VBTUEsMERBQUE7RUFLQSxvRUFBQTtBQXRHRjtBQWlERTtFQUNFO0lBQ0UsYUFBQTtJQUNBLFlBQUE7SUFDQSxrQ0FBQTtJQUNBLG1CQUFBO0lBRUEsY0FBQTtJQUNBLGFBQUE7SUFDQSxxQkFBQTtJQUNBLFlBQUE7RUFoREo7RUF1REU7SUFDRSw2QkFBQTtFQXJESjtFQXdERTtJQUNFLGFBQUE7SUFDQSxZQUFBO0lBQ0Esa0NBQUE7SUFDQSxtQkFBQTtJQUVBLGNBQUE7SUFDQSxhQUFBO0lBQ0EscUJBQUE7SUFDQSxZQUFBO0VBdkRKO0FBQ0Y7QUFqRkE7RUFvSkU7SUFDRSxRQUFBO0lBQ0EsU0FBQTtFQWhFRjtFQW9FQTtJQUNFLHVCQUFBO0VBbEVGO0VBc0VBO0lBQ0UsdUJBQUE7RUFwRUY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJvdXNlbC1jb250YWluZXIge1xyXG4gIC8vIHdpZHRoOiA5NSU7XHJcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG4gIC8vIHBhZGRpbmc6IDAgMCA2MHB4IDA7XHJcbiAgbWFyZ2luOiAwIDFyZW07XHJcbiAgXHJcblxyXG4gIFxyXG59XHJcblxyXG4uY2Fyb3VzZWwge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtc2xpZGUge1xyXG4gIGZsZXg6IDAgMCA1MCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIC8vIG1pbi1oZWlnaHQ6IDE4cmVtO1xyXG4gIG1heC13aWR0aDogMzByZW07IC8qIExpbWl0IHRoZSBtYXhpbXVtIHdpZHRoIGlmIG5lZWRlZCAqL1xyXG4gIC8vIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICAvLyBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcclxuICBcclxufVxyXG5cclxuXHJcbi5wbGF5LWljb24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDQwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gIGJhY2tncm91bmQtY29sb3I6I2I4MWQyNDsgLyogQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHBsYXkgYnV0dG9uICovXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlOyAvKiBNYWtlcyB0aGUgYmFja2dyb3VuZCBwZXJmZWN0bHkgcm91bmQgKi9cclxuICB3aWR0aDogM3JlbTsgLyogU2V0IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IHRvIGNvbnRyb2wgdGhlIHNpemUgb2YgdGhlIHJvdW5kIGJhY2tncm91bmQgKi9cclxuICBoZWlnaHQ6IDNyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ucGxheS1pY29uIG1hdC1pY29uIHtcclxuICBjb2xvcjogd2hpdGU7IC8qIEljb24gY29sb3IgKi9cclxufVxyXG5cclxuLmNhcm91c2VsLXNsaWRlOmhvdmVyIC5wbGF5LWljb24ge1xyXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbn1cclxuXHJcblxyXG4uY2Fyb3VzZWwtc2xpZGU6bGFzdC1jaGlsZCB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwO1xyXG59XHJcbi5jYXJvdXNlbC1zbGlkZTpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA3KTsgLyogQWRqdXN0IHRoZSBzY2FsZSBmYWN0b3IgdG8gY29udHJvbCB0aGUgem9vbSBsZXZlbCAqL1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7IC8qIEFkZCBhIHNtb290aCB0cmFuc2l0aW9uIGVmZmVjdCAqL1xyXG59XHJcbi5tb3JlVmlkZW9zIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGp1c3RpZnktY29udGVudDogZW5kO1xyXG4gIG1hcmdpbi1yaWdodDogLjVyZW0gIWltcG9ydGFudDtcclxufVxyXG5cclxuXHJcbi5zdGFyLXJhdGluZyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwYWRkaW5nOiAuOHJlbVxyXG59XHJcblxyXG4uc3RhciB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgY29sb3I6ICNmZmZmZmY7IC8qIGRlZmF1bHQgc3RhciBjb2xvciAqL1xyXG59XHJcblxyXG4uc3Rhci5maWxsZWQge1xyXG4gIGNvbG9yOiAjZmZkNzAwOyAvKiBmaWxsZWQgc3RhciBjb2xvciAqL1xyXG59XHJcblxyXG5cclxuLmNhcm91c2VsLXNsaWRlIGltZyB7XHJcbiAgd2lkdGg6IDk4JSAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogODUlICFpbXBvcnRhbnQ7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgLy8gYm9yZGVyOiAxcHggc29saWQgcmdiKDc5LCA3OSwgNzkpO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoIDo3NDBweCkge1xyXG4gIC5jYXJvdXNlbC1zbGlkZSB7XHJcbiAgICBmbGV4OiAwIDAgMjAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSkgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDAgMCAzcmVtIDA7XHJcblxyXG4gICAgLy8gbWluLWhlaWdodDogNDByZW07XHJcbiAgfVxyXG5cclxuXHJcbiAgLm1vcmVWaWRlb3N7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDJyZW0gIWltcG9ydGFudDtcclxuICB9XHJcbiAgLmNhcm91c2VsLXNsaWRlIGltZyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB3aWR0aDogOTklICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDgwJSAhaW1wb3J0YW50O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXIgIWltcG9ydGFudDtcclxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgXHJcbiAgICAvLyBib3JkZXI6IDFweCBzb2xpZCByZ2IoNzksIDc5LCA3OSk7XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG4vLyAuaW1hZ2Uge1xyXG4vLyAgIGhlaWdodDogMTByZW07XHJcbi8vICAgd2lkdGg6IDJyZW07XHJcbi8vIH1cclxuLyogSGlkZSB0aGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG59XHJcblxyXG4vKiBPcHRpb25hbDogU3R5bGUgdGhlIHRyYWNrICh0aGUgYXJlYSBiZWhpbmQgdGhlIHRodW1iKSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTIwcHgpe1xyXG4gIC5jYXJvdXNlbC1jb250YWluZXIge1xyXG4gICAgLy8gd2lkdGg6IDk1JTtcclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIC8vIHBhZGRpbmc6IDAgMCA2MHB4IDA7XHJcbiAgICBtYXJnaW46IDAgMXJlbTtcclxuICAgIHdpZHRoOiA5NnZ3O1xyXG4gIFxyXG4gIFxyXG4gIH1cclxuICBcclxuICAuY2Fyb3VzZWwge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMDAlXHJcbiAgfVxyXG4gIFxyXG4gIC5jYXJvdXNlbC1zbGlkZSB7XHJcbiAgICBmbGV4OiAwIDAgNTAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgLy8gbWluLWhlaWdodDogMThyZW07XHJcbiAgICBtYXgtd2lkdGg6IDMwcmVtO1xyXG4gICAgLyogTGltaXQgdGhlIG1heGltdW0gd2lkdGggaWYgbmVlZGVkICovXHJcbiAgICAvLyBtYXJnaW4tcmlnaHQ6IDFyZW07XHJcbiAgICAvLyBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcclxuICBcclxuICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICBcclxuICBcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLnBsYXktaWNvbiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDQwJTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2I4MWQyNDtcclxuICAgIC8qIEJhY2tncm91bmQgY29sb3IgZm9yIHRoZSBwbGF5IGJ1dHRvbiAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLyogTWFrZXMgdGhlIGJhY2tncm91bmQgcGVyZmVjdGx5IHJvdW5kICovXHJcbiAgICB3aWR0aDogM3JlbTtcclxuICAgIC8qIFNldCB0aGUgd2lkdGggYW5kIGhlaWdodCB0byBjb250cm9sIHRoZSBzaXplIG9mIHRoZSByb3VuZCBiYWNrZ3JvdW5kICovXHJcbiAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAucGxheS1pY29uIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIC8qIEljb24gY29sb3IgKi9cclxuICB9XHJcbiAgXHJcbiAgLmNhcm91c2VsLXNsaWRlOmhvdmVyIC5wbGF5LWljb24ge1xyXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmNhcm91c2VsLXNsaWRlOmxhc3QtY2hpbGQge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gIH1cclxuICBcclxuICAuY2Fyb3VzZWwtc2xpZGU6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA3KTtcclxuICAgIC8qIEFkanVzdCB0aGUgc2NhbGUgZmFjdG9yIHRvIGNvbnRyb2wgdGhlIHpvb20gbGV2ZWwgKi9cclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XHJcbiAgICAvKiBBZGQgYSBzbW9vdGggdHJhbnNpdGlvbiBlZmZlY3QgKi9cclxuICB9XHJcbiAgXHJcbiAgLm1vcmVWaWRlb3Mge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAuNXJlbSAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICAuc3Rhci1yYXRpbmcge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHBhZGRpbmc6IC44cmVtXHJcbiAgfVxyXG4gIFxyXG4gIC5zdGFyIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAvKiBkZWZhdWx0IHN0YXIgY29sb3IgKi9cclxuICB9XHJcbiAgXHJcbiAgLnN0YXIuZmlsbGVkIHtcclxuICAgIGNvbG9yOiAjZmZkNzAwO1xyXG4gICAgLyogZmlsbGVkIHN0YXIgY29sb3IgKi9cclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmNhcm91c2VsLXNsaWRlIGltZyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAvKiB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyAqL1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiA5NiU7XHJcbiAgfVxyXG4gIFxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGggOjc0MHB4KSB7XHJcbiAgICAuY2Fyb3VzZWwtc2xpZGUge1xyXG4gICAgICBmbGV4OiAwIDAgMjAlO1xyXG4gICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg4MCUpICFpbXBvcnRhbnQ7XHJcbiAgICAgIHBhZGRpbmc6IDAgMCAzcmVtIDA7XHJcbiAgXHJcbiAgICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICB3aWR0aDogNTAlICFpbXBvcnRhbnQ7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICBcclxuICBcclxuICAgICAgLy8gbWluLWhlaWdodDogNDByZW07XHJcbiAgICB9XHJcbiAgXHJcbiAgXHJcbiAgICAubW9yZVZpZGVvcyB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMnJlbSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLmNhcm91c2VsLXNsaWRlIGltZyB7XHJcbiAgICAgIGZsZXg6IDAgMCAyMCU7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSkgIWltcG9ydGFudDtcclxuICAgICAgcGFkZGluZzogMCAwIDNyZW0gMDtcclxuICBcclxuICAgICAgZmxleDogMCAwIGF1dG87XHJcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAvLyBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBcclxuICAgICAgLy8gYm9yZGVyOiAxcHggc29saWQgcmdiKDc5LCA3OSwgNzkpO1xyXG4gICAgfVxyXG4gIFxyXG4gIH1cclxuICBcclxuICAvLyAuaW1hZ2Uge1xyXG4gIC8vICAgaGVpZ2h0OiAxMHJlbTtcclxuICAvLyAgIHdpZHRoOiAycmVtO1xyXG4gIC8vIH1cclxuICAvKiBIaWRlIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhciAqL1xyXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIE9wdGlvbmFsOiBTdHlsZSB0aGUgdHJhY2sgKHRoZSBhcmVhIGJlaGluZCB0aGUgdGh1bWIpICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9XHJcbiAgXHJcbiAgLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 48816:
/*!***************************************************!*\
  !*** ./src/app/layout/footer/footer.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);

class FooterComponent {
  onInstaClick() {
    window.open('https://www.instagram.com/cinemakompanyofficial/', '_blank');
  }
  onFbClick() {
    window.open('https://www.facebook.com/BOOMCinemazOfficial', '_blank');
  }
  onTwitterClick() {
    window.open('https://twitter.com/BOOMCinemaz', '_blank');
  }
  static #_ = this.ɵfac = function FooterComponent_Factory(t) {
    return new (t || FooterComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: FooterComponent,
    selectors: [["app-footer"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 8,
    vars: 0,
    consts: [[1, "footer"], ["height", "100%", "width", "100%", "src", "assets/images/Final Footer.jpeg", "alt", ""], [2, "display", "grid"], ["src", "assets/images/fbb.png", "alt", "", 2, "height", "8%", "width", "4%", "position", "absolute", "top", "65%", "left", "21%", "cursor", "pointer", 3, "click"], ["src", "assets/images/twitter.png", "alt", "", 2, "height", "8%", "width", "4%", "position", "absolute", "top", "65%", "left", "26%", "cursor", "pointer", 3, "click"], ["src", "assets/images/instaa.png", "alt", "", 2, "height", "8%", "width", "3.5%", "position", "absolute", "top", "65%", "left", "31%", "cursor", "pointer", 3, "click"]],
    template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_img_click_3_listener() {
          return ctx.onFbClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2)(5, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_img_click_5_listener() {
          return ctx.onTwitterClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2)(7, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_img_click_7_listener() {
          return ctx.onInstaClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
    },
    styles: ["[_nghost-%COMP%] {\n  display: grid;\n  align-items: end;\n}\n\n.footer[_ngcontent-%COMP%] {\n  position: relative;\n  color: #fff;\n  \n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFHSSxhQUFBO0VBQ0EsZ0JBQUE7QUFESjs7QUFTRTtFQUdFLGtCQUFBO0VBR0EsV0FBQTtFQUdBLHFFQUFBO0FBWkoiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICAvLyBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcclxuICAgIC8vIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGFsaWduLWl0ZW1zOiBlbmQ7XHJcbiAgICAvLyBwYWRkaW5nOiAycmVtIDAgMTVyZW0gMDtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICMyMjFmMWY7XHJcbiAgICAvLyBiYWNrZ3JvdW5kOiB1cmwoJy4vLi4vLi4vLi4vLmFzc2V0cy9pbWFnZXMvZm9vdGVyQmFja2dyb3VuZC5qcGcnKTtcclxuICAgIC8vIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAvLyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgXHJcbiAgfVxyXG4gIC5mb290ZXIge1xyXG4gICAgXHJcbiAgICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gXHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIC8vIHBhZGRpbmc6IDYwcHggMCAxMDBweCAwO1xyXG5cclxuICAgIC8qICdjb3ZlcicgZW5zdXJlcyB0aGUgYmFja2dyb3VuZCBpbWFnZSBjb3ZlcnMgdGhlIGVudGlyZSBjb250YWluZXIgKi9cclxuICB9XHJcbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 39188:
/*!******************************************************************!*\
  !*** ./src/app/more-videos-modal/more-videos-modal.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoreVideosModalComponent: () => (/* binding */ MoreVideosModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 12572);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 75388);









function MoreVideosModalComponent_div_5_img_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 10);
  }
  if (rf & 2) {
    const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", movie_r1.imageURL, "", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("alt", movie_r1.title);
  }
}
function MoreVideosModalComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MoreVideosModalComponent_div_5_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const movie_r1 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.clickOnMovieCard(movie_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MoreVideosModalComponent_div_5_img_1_Template, 1, 2, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 9)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const movie_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", movie_r1.imageURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](movie_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](movie_r1.subDiscription);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Duration: ", movie_r1.duration, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Type: ", movie_r1.type, "");
  }
}
class MoreVideosModalComponent {
  constructor(dialogRef, sharedDataService, router, data) {
    this.dialogRef = dialogRef;
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.data = data;
  }
  onClose() {
    this.dialogRef.close();
  }
  clickOnMovieCard(movie) {
    console.log("clickOnMovieCard", movie);
    this.sharedDataService.updateMovieData(movie);
    this.dialogRef.close();
    this.router.navigate(['/home-page/now_in_theatre'], {
      state: {
        data: movie[0]
      }
    });
  }
  static #_ = this.ɵfac = function MoreVideosModalComponent_Factory(t) {
    return new (t || MoreVideosModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MoreVideosModalComponent,
    selectors: [["app-more-videos-modal"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 9,
    vars: 1,
    consts: [[2, "display", "grid", "justify-content", "end", 3, "click"], [2, "display", "grid"], [2, "color", "black"], ["mat-dialog-content", ""], ["class", "movie-card", 3, "click", 4, "ngFor", "ngForOf"], [2, "display", "grid", "color", "black", "padding", ".5rem"], [2, "height", "2rem", 3, "click"], [1, "movie-card", 3, "click"], ["class", "image", 3, "src", "alt", 4, "ngIf"], [1, "card-content"], [1, "image", 3, "src", "alt"]],
    template: function MoreVideosModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MoreVideosModalComponent_Template_div_click_0_listener() {
          return ctx.onClose();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 1)(2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, MoreVideosModalComponent_div_5_Template, 11, 5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5)(7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MoreVideosModalComponent_Template_button_click_7_listener() {
          return ctx.onClose();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.data.movies);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon],
    styles: [".movie-card[_ngcontent-%COMP%] {\n  display: grid;\n  background-color: #161616;\n  grid-template-rows: 0.7fr 0.3fr;\n  justify-items: center;\n  margin: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 8px;\n  overflow: auto;\n}\n.movie-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100px;\n  \n\n  height: 150px;\n  \n\n  margin-right: 1rem;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.movie-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.movie-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin-bottom: 0.5rem;\n}\n.movie-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n}\n\n.mat-dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  place-items: center;\n}\n\nbutton[mat-icon-button][_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 8px;\n}\n\n.image[_ngcontent-%COMP%] {\n  height: 100% !important;\n  width: 10rem !important;\n}\n\n@media screen and (min-width: 650px) {\n  .image[_ngcontent-%COMP%] {\n    height: 100% !important;\n    width: 10rem !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9yZS12aWRlb3MtbW9kYWwvbW9yZS12aWRlb3MtbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EseUJBQUE7RUFFQSwrQkFBQTtFQUNBLHFCQUFBO0VBRUEsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFESjtBQUdJO0VBQ0ksWUFBQTtFQUNBLHVDQUFBO0VBQ0EsYUFBQTtFQUNBLHVDQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBRFI7QUFJSTtFQUNJLE9BQUE7QUFGUjtBQUtJO0VBQ0ksaUJBQUE7RUFDQSxxQkFBQTtBQUhSO0FBTUk7RUFDSSxnQkFBQTtBQUpSOztBQVFBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQUxKOztBQVFBO0VBQ0ksa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QUFMSjs7QUFRQTtFQUNJLHVCQUFBO0VBQ0EsdUJBQUE7QUFMSjs7QUFTQTtFQUNJO0lBQ0ksdUJBQUE7SUFDQSx1QkFBQTtFQU5OO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIubW92aWUtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE2MTYxNjtcclxuXHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IC43ZnIgLjNmcjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBtYXJnaW46IDAuNXJlbTtcclxuICAgIHBhZGRpbmc6IC41cmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICAgICAgLyogQWRqdXN0IHRoZSBzaXplIGFzIHBlciB5b3VyIGRlc2lnbiAqL1xyXG4gICAgICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICAgICAgLyogQWRqdXN0IHRoZSBzaXplIGFzIHBlciB5b3VyIGRlc2lnbiAqL1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtY29udGVudCB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgIH1cclxuXHJcbiAgICBoMyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIHAge1xyXG4gICAgICAgIG1hcmdpbjogMC4ycmVtIDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5tYXQtZGlhbG9nLWNvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbmJ1dHRvblttYXQtaWNvbi1idXR0b25dIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbn1cclxuXHJcbi5pbWFnZSB7XHJcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiAxMHJlbSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6NjUwcHgpIHtcclxuICAgIC5pbWFnZSB7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgd2lkdGg6IDEwcmVtICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICBcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 62456:
/*!****************************************!*\
  !*** ./src/app/news/news.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsComponent: () => (/* binding */ NewsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _services_movies_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/movies.service */ 18052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 75388);








function NewsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NewsComponent_div_2_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.clickOnReview(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NewsComponent_div_2_Template_a_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.showFullReview(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Read More");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", item_r1.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", item_r1 == null ? null : item_r1.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](7, 3, item_r1.news, 0, ctx_r0.reviewLength), "... ");
  }
}
class NewsComponent {
  constructor(titleService, router, meta, movieService) {
    this.titleService = titleService;
    this.router = router;
    this.meta = meta;
    this.movieService = movieService;
    this.items = [];
    this.reviewLength = 200;
    this.titleService.setTitle('News-CinemaKompany');
    // this.meta.addTag(
    //   { name: 'description', content: 'summary_large_image' },
    // );
    this.meta.addTag({
      property: 'og:description',
      content: "Cinema Kompany"
    });
    this.meta.addTag({
      property: 'og:image',
      content: "../../assets/images/logo3.png"
    });
  }
  ngOnInit() {
    // setTimeout(() => {
    //   console.log("this.meta", this.meta.getTags('description'), this.meta.getTag('name=description'), this.meta.getTag('title'), this.meta)
    // }, 5000)
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map(() => this.activatedRoute),
    //     map((route) => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     }),
    //     filter((route) => route.outlet === 'primary'),
    //     mergeMap((route) => route.data),
    //     tap(({ title, description }: Data) => {
    //       this.metaService.updateTitle(title);
    //       this.metaService.updateDescription(description);
    //     })
    //   ).subscribe();
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    // )
    //   .subscribe(() => {
    //     var rt = this.getChild(this.activatedRoute)
    //     rt.data.subscribe((data:any) => {
    //       console.log(data);
    //       this.titleService.setTitle(data.title)
    //       if (data.descrption) {
    //         this.metaService.updateTag({ name: 'description', content: data.descrption })
    //       } else {
    //         this.metaService.removeTag("name='description'")
    //       }
    //       if (data.robots) {
    //         this.metaService.updateTag({ name: 'robots', content: data.robots })
    //       } else {
    //         this.metaService.updateTag({ name: 'robots', content: "follow,index" })
    //       }
    //       if (data.ogUrl) {
    //         this.metaService.updateTag({ property: 'og:url', content: data.ogUrl })
    //       } else {
    //         this.metaService.updateTag({ property: 'og:url', content: this.router.url })
    //       }
    //       if (data.ogTitle) {
    //         this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
    //       } else {
    //         this.metaService.removeTag("property='og:title'")
    //       }
    //       if (data.ogDescription) {
    //         this.metaService.updateTag({ property: 'og:description', content: data.ogDescription })
    //       } else {
    //         this.metaService.removeTag("property='og:description'")
    //       }
    //       if (data.ogImage) {
    //         this.metaService.updateTag({ property: 'og:image', content: data.ogImage })
    //       } else {
    //         this.metaService.removeTag("property='og:image'")
    //       }
    //     })
    //   })
    // this.movieService.getMovieNews().subscribe((data: any[]) => {
    //   data.sort((a, b) => a.id - b.id);
    //   this.items = data;
    // });
    // NEWS.sort((a: any, b: any) => a.id - b.id);
    // this.items = NEWS;
    this.movieService.getMovieNews().subscribe(ele => {
      ele.sort((a, b) => a.id - b.id);
      let image_url = `https://craftangelsbysita.com/${ele.image}`;
      ele['image'] = image_url;
      console.log(ele);
      this.items = ele;
    });
  }
  getChild(activatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
  updateTitle() {
    // Logic to update title dynamically based on your page content
    this.titleService.setTitle('News-CinemaKompany');
  }
  clickOnReview(movie) {
    // this.sharedDataService.updateNewsData(movie);
    this.router.navigate([`news/${movie?.id}`], {
      state: {
        data: movie
      }
    });
  }
  showFullReview(movie) {
    // this.sharedDataService.updateMovieDataFromReview(movie);
    this.router.navigate([`news/${movie?.id}`], {
      state: {
        data: movie
      }
    });
    // item.review = !item.review;
  }
  goToHomePage() {
    this.router.navigate(['/home-page/']);
  }
  static #_ = this.ɵfac = function NewsComponent_Factory(t) {
    return new (t || NewsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_movies_service__WEBPACK_IMPORTED_MODULE_0__.MovieService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: NewsComponent,
    selectors: [["app-news"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_services_movies_service__WEBPACK_IMPORTED_MODULE_0__.MovieService, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 1,
    consts: [[2, "display", "grid", "justify-content", "end", "margin", ".8rem"], [1, "image-grid"], ["class", "grid-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "grid-item", 3, "click"], ["alt", "Image", 1, "image", 3, "src"], [2, "font-family", "Jost", "font-weight", "700", "margin-top", "1.2rem", "font-size", "1.4rem", "min-height", "4rem", "word-wrap", "break-word", "overflow-wrap", "break-word", "line-height", "1.2"], [1, "description"], [2, "cursor", "pointer", 3, "click"]],
    template: function NewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, NewsComponent_div_2_Template, 10, 7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.items);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.SlicePipe, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule],
    styles: [".image-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 20px;\n  overflow-x: auto;\n}\n\n.grid-item[_ngcontent-%COMP%] {\n  justify-items: center;\n  align-items: center;\n  text-align: center;\n  padding: 10px;\n  border: 1px solid #353535;\n  border-radius: 5px;\n}\n\n.image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: 50%;\n}\n\n.description[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  text-align: justify;\n}\n\n.header[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: #fff;\n  display: grid;\n  padding: 20px;\n  text-align: center;\n  font-size: large;\n  border: 1px solid white;\n  border-radius: 12px;\n  cursor: pointer;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbmV3cy9uZXdzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUU7RUFHRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQURKOztBQUlFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7QUFESjs7QUFJRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFNRTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBSEo7O0FBTUUsa0NBQUE7QUFDQTtFQUNFLFFBQUE7RUFDQSxTQUFBO0FBSEo7O0FBTUUsMERBQUE7QUFDQTtFQUNFLHVCQUFBO0FBSEo7O0FBTUUsb0VBQUE7QUFDQTtFQUNFLHVCQUFBO0FBSEoiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1hZ2UtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDIwcHg7XHJcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIH1cclxuICBcclxuICAuZ3JpZC1pdGVtIHtcclxuICAgIC8vIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAvLyA6IGNvbHVtbjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzM1MzUzNTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICB9XHJcbiAgXHJcbiAgLmltYWdlIHtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNTAlO1xyXG4gIH1cclxuICBcclxuICAuZGVzY3JpcHRpb24ge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBcclxuICAvKiBIaWRlIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhciAqL1xyXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIE9wdGlvbmFsOiBTdHlsZSB0aGUgdHJhY2sgKHRoZSBhcmVhIGJlaGluZCB0aGUgdGh1bWIpICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9XHJcbiAgXHJcbiAgLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 88144:
/*!***********************************************************!*\
  !*** ./src/app/news/single-news/single-news.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleNewsComponent: () => (/* binding */ SingleNewsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var src_app_pipes_split_paragraph_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pipes/split-paragraph.pipe */ 14664);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var src_app_services_seo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/seo.service */ 97368);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 72448);












function SingleNewsComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SingleNewsComponent_div_24_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.onNewsClick(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", item_r1.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r1.description);
  }
}
class SingleNewsComponent {
  constructor(sharedDataService, router, route, meta, movieService, titleService) {
    // this.meta.addTag({ property: 'og:description', content: "1" });
    // this.meta.addTag({ property: 'og:image', content: "1" });
    // this.meta.addTag({ property: 'og:title', content: "1" });
    // this.meta.addTag({ property: 'og:description', content: "2" });
    // this.meta.addTag({ property: 'og:image', content: "2" });
    // this.meta.addTag({ property: 'og:title', content: "2" });
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.route = route;
    this.meta = meta;
    this.movieService = movieService;
    this.titleService = titleService;
    this.imageSource = '';
    this.description = '';
    this.descriptionLimit = 150; // Adjust this as needed
    this.title = '';
    this.news = '';
    this.rating = 3;
    this.movieName = '';
    this.verdict = '';
    this.paragrapgh2 = '';
    this.paragrapgh3 = '';
    this.paragrapgh4 = '';
    this.paragrapgh5 = '';
    this.paragrapgh6 = '';
    this.paragrapgh7 = '';
    this.reviewLength = 1000;
    this.dynamicContent = {
      title: 'Review Cinema Kompany',
      description: 'Dynamic Description',
      imageUrl: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg',
      url: 'https://example.com/content/1' // Replace '1' with the actual content ID
    };
    this.route.params.subscribe(params => {
      console.log(params);
      // const imageURL = `https://craftangelsbysita.com/assets/images/reviews/${movieName}.jpg`;
      // this.metaService.updateTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
      this.id = params['movie_id'];
      console.log();
      this.loadMovieData(this.id);
      console.log(this.title);
    });
    this.movieService.getMovieNews().subscribe(doc => {
      doc.map(ele => {
        if (ele.id == this.id) {
          this.movieName = ele.movieName;
          this.description = ele.description;
          this.imageSource = ele.image;
          this.news = ele.news;
          console.log('sss', ele);
          this.meta.addTag({
            name: 'image',
            content: `https://craftangelsbysita.com/${ele.image}`
          });
          this.meta.addTag({
            name: 'title',
            content: ele.description
          });
          this.meta.addTag({
            name: 'image',
            content: `https://craftangelsbysita.com/${ele.image}`
          });
          this.meta.addTag({
            name: 'title',
            content: ele.description
          });
          this.meta.addTag({
            property: 'og:image',
            content: ele.image
          });
          this.meta.addTag({
            property: 'og:title',
            content: ele.description
          });
          this.meta.updateTag({
            property: 'og:image',
            content: `https://craftangelsbysita.com/${ele.image}`
          });
          this.meta.updateTag({
            property: 'og:title',
            content: ele.description
          });
          this.titleService.setTitle(`${ele?.description}`);
          let data = ele;
          this.title = data?.title;
          this.rating = data?.rating;
          this.movieName = data?.movieName;
          this.verdict = data?.verdict;
          this.paragrapgh2 = data?.paragrapgh2;
          this.paragrapgh3 = data?.paragrapgh3;
          this.paragrapgh4 = data?.paragrapgh4;
          this.paragrapgh5 = data?.paragrapgh5;
          this.paragrapgh6 = data?.paragrapgh6;
          this.paragrapgh7 = data?.paragrapgh7;
          this.description = data?.description;
          this.news = data?.news;
          // console.log("updated", this.meta.getTag("'property=og:description'"))
        }
      });
    });
    // this.data = NEWS.filter(ele => {
    //   if (ele.id == this.id) {
    //     this.movieName = ele.movieName;
    //     this.description = ele.description;
    //     this.imageSource = ele.image
    //     this.meta.addTag({ name: 'description', content: ele.description });
    //     this.meta.addTag({ name: 'image', content: `https://craftangelsbysita.com/${ele.image}` });
    //     this.meta.addTag({ name: 'title', content: ele.movieName });
    //     this.meta.addTag({ name: 'description', content: ele.description });
    //     this.meta.addTag({ name: 'image', content: `https://craftangelsbysita.com/${ele.image}` });
    //     this.meta.addTag({ name: 'title', content: ele.movieName });
    //     this.meta.addTag({ property: 'og:description', content: ele.description });
    //     this.meta.addTag({ property: 'og:image', content: ele.image });
    //     this.meta.addTag({ property: 'og:title', content: ele.movieName });
    //     this.meta.updateTag({ property: 'og:description', content: ele.description });
    //     this.meta.updateTag({ property: 'og:image', content: `https://craftangelsbysita.com/${ele.image}` });
    //     this.meta.updateTag({ property: 'og:title', content: ele.movieName });
    //     // console.log("updated", this.meta.getTag("'property=og:description'"))
    //   }
    // })
    // this.meta.addTag({ property: 'og:description', content: 'hello welcome' });
    // this.meta.addTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.addTag({ property: 'og:url', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.updateTag({ property: 'og:description', content: 'hello welcome' });
    // this.meta.updateTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.updateTag({ property: 'og:url', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
  }
  ngOnInit() {
    this.fetchCarouselData();
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.route),
    //   map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    //  )
    //  .subscribe((event) => {
    //   console.log(event)
    //    this.sEOService.updateTitle(event['title']);
    //    this.sEOService.updateOgUrl(event['ogUrl']);
    //    //Updating Description tag dynamically with title
    //    this.sEOService.updateDescription(event['title'] + event['description'])
    //  }); 
    // this.metaService.updateTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
    // this.imageSource = 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg';
    // this.updateOgImageMetaTag();
    // // this.metaService.addTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' }, true);
  }
  updateOgImageMetaTag() {
    this.meta.updateTag({
      property: 'og:image',
      content: this.imageSource
    });
  }
  showFullDescription() {
    this.descriptionLimit = this.description.length;
  }
  showFullReview() {
    this.reviewLength = this.news.length;
  }
  onMoreReviewClick() {
    this.router.navigate(['/news']);
  }
  loadMovieData(id) {
    const data = this.sharedDataService.getNewsData();
    if (data) {
      // Assuming the data is stored as an object with movie IDs as keys
      if (data.id == id) {
        // // this.titleService.setTitle(`${data?.movieName} Review`);
        // // this.metaService.updateTag({ property: 'og:title', content: `${data?.movieName} Movie Review From CinemaKompany` });
        // // this.metaService.updateTag({ property: 'og:description', content: data?.review });
        // // const imageURL = `https://craftangelsbysita.com/assets/images/reviews/${data?.movieName}.jpg`;
        // // Compress and update image
        // this.compressAndUpdateImage(imageURL);
        this.imageSource = data?.image;
        this.title = data?.title;
        this.rating = data?.rating;
        this.movieName = data?.movieName;
        this.verdict = data?.verdict;
        this.paragrapgh2 = data?.paragrapgh2;
        this.paragrapgh3 = data?.paragrapgh3;
        this.paragrapgh4 = data?.paragrapgh4;
        this.paragrapgh5 = data?.paragrapgh5;
        this.paragrapgh6 = data?.paragrapgh6;
        this.paragrapgh7 = data?.paragrapgh7;
        this.description = data?.description;
        this.news = data?.news;
      }
    }
  }
  shareContent() {
    const dynamicContent = {
      title: 'Dynamic Title',
      description: 'Dynamic Description',
      imageUrl: 'https://craftangelsbysita.com/assets/images/reviews/${data?.movieName}.jpg',
      url: 'https://example.com/content/1' // Replace '1' with the actual content ID
    };
    const shareUrl = `whatsapp://send?text=${encodeURIComponent(dynamicContent.title + ' - ' + dynamicContent.description + '\n' + dynamicContent.url)}`;
    window.location.href = shareUrl;
  }
  copyToClipboard() {
    const shareableUrl = this.getShareableUrl();
    const textField = document.createElement('textarea');
    textField.innerText = shareableUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Link copied to clipboard!');
  }
  getShareableUrl() {
    this.updateDynamicContent();
    return `${this.dynamicContent.url}`;
  }
  updateDynamicContent() {
    // Perform any operations to update dynamic content
    this.dynamicContent.description = `${this.movieName} Review`;
    this.dynamicContent.imageUrl = `${this.imageSource}`;
    this.dynamicContent.url = `https://Review-of-${this.movieName}.com/`;
  }
  fetchCarouselData() {
    this.movieService.getMovieNews().subscribe(data => {
      console.log(data);
      data.sort((a, b) => a.id - b.id);
      let counter = 0;
      this.items = data.filter(doc => {
        counter += 1;
        if (doc.id != this.id && counter >= 1 && counter <= data.length - 1) {
          return doc;
        }
      });
    });
  }
  onNewsClick(movie) {
    this.router.navigate([]).then(res => {
      window.open(`/news/${movie?.id}`, '_blank');
    });
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.fetchCarouselData();
  }
  static #_ = this.ɵfac = function SingleNewsComponent_Factory(t) {
    return new (t || SingleNewsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Title));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: SingleNewsComponent,
    selectors: [["app-single-news"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_1__.SharedDataService, src_app_services_seo_service__WEBPACK_IMPORTED_MODULE_3__.SEOService, src_app_pipes_split_paragraph_pipe__WEBPACK_IMPORTED_MODULE_0__.SplitParagraphPipe, src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_2__.MovieService, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 25,
    vars: 8,
    consts: [[1, "top-section"], [2, "display", "grid"], ["alt", "Image", 2, "justify-self", "center", 3, "src"], [2, "font-family", "Jost", "font-size", "2rem", "font-weight", "700", "padding", "1rem 0", "text-align", "start"], [2, "text-align", "start", "font-family", "Jost", "font-weight", "400", "font-size", "1.2rem", "word-wrap", "break-word", "overflow-wrap", "break-word"], [2, "text-align", "justify", "text-decoration", "dotted", "color", "#c4c4c4", "font-size", "1.2rem", "word-wrap", "break-word", "overflow-wrap", "break-word"], [1, "bottom-section"], [2, "display", "grid", "width", "12rem", "padding", "1rem", "justify-self", "center", "border", "1px solid black", "border-radius", "12px", "font-family", "Poppins", "font-weight", "bold", "cursor", "pointer", 3, "click"], [1, "carousel-wrapper"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["alt", "Image", 1, "carousel-image", 2, "justify-self", "center", 3, "src"], [2, "font-family", "Jost", "font-size", "1.2rem", "font-weight", "400"]],
    template: function SingleNewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5)(8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 6)(21, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SingleNewsComponent_Template_button_click_21_listener() {
          return ctx.onMoreReviewClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "More News");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, SingleNewsComponent_div_24_Template, 4, 2, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", ctx.imageSource, "", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.movieName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.description, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.news);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.paragrapgh2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.paragrapgh3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.paragrapgh4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.items);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule],
    styles: [".container[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  \n\n  grid-template-rows: 2fr auto;\n  \n\n  min-height: 100vh;\n  \n\n}\n\n.top-section[_ngcontent-%COMP%] {\n  display: grid;\n  justify-self: center;\n  margin: 2rem;\n  text-align: center;\n  overflow: auto;\n  width: 94vw;\n}\n\n.top-section[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 73%;\n  height: 72%;\n}\n\n.top-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px;\n  \n\n}\n\n@media (max-width: 768px) {\n  .top-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n.bottom-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-row: 2/3;\n  margin: 1rem 0.4rem;\n}\n\n.star-rating[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  font-size: 24px;\n  text-align: start;\n  padding: 0.6rem 0;\n}\n\n.star[_ngcontent-%COMP%] {\n  color: #ccc;\n  \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #FFD700;\n  \n\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n\n.carousel-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  justify-items: center;\n  margin-top: 1.2rem;\n  min-height: 17rem;\n}\n\n.carousel-image[_ngcontent-%COMP%] {\n  width: 22rem;\n  height: 12rem;\n  cursor: pointer;\n}\n\n.carousel-image[_ngcontent-%COMP%]:hover {\n  width: 24rem;\n  height: 14rem;\n  cursor: pointer;\n  transition: 0.2s ease-out;\n}\n\n@media screen and (max-width: 1280px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    min-height: 32rem;\n  }\n}\n@media screen and (max-width: 1170px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    min-height: 36rem;\n  }\n}\n@media screen and (max-width: 740px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    position: relative;\n  }\n  .carousel-image[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 12rem;\n    cursor: pointer;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbmV3cy9zaW5nbGUtbmV3cy9zaW5nbGUtbmV3cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG9EQUFBO0VBQ0EsNEJBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0VBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUVBLGNBQUE7RUFDQSxXQUFBO0FBQUY7O0FBSUE7RUFDRSxjQUFBO0VBQ0EsV0FBQTtBQURGOztBQU9BO0VBQ0UsZUFBQTtFQUNBLHFCQUFBO0FBSkY7O0FBT0E7RUFDRTtJQUNFLGVBQUE7RUFKRjtBQUNGO0FBU0E7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBUEY7O0FBVUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUFQRjs7QUFVQTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtBQVBGOztBQVVBO0VBQ0UsY0FBQTtFQUNBLHNCQUFBO0FBUEY7O0FBV0Esa0NBQUE7QUFDQTtFQUNFLFFBQUE7RUFDQSxTQUFBO0FBUkY7O0FBV0EsMERBQUE7QUFDQTtFQUNFLHVCQUFBO0FBUkY7O0FBV0Esb0VBQUE7QUFDQTtFQUNFLHVCQUFBO0FBUkY7O0FBV0E7RUFDRSxhQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFSRjs7QUFXQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVdBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFSRjs7QUFXQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLGtDQUFBO0lBQ0EscUJBQUE7SUFDQSxrQkFBQTtJQUNBLGlCQUFBO0VBUkY7QUFDRjtBQVdBO0VBQ0U7SUFDRSxhQUFBO0lBQ0EsOEJBQUE7SUFDQSxxQkFBQTtJQUNBLGtCQUFBO0lBQ0EsaUJBQUE7RUFURjtBQUNGO0FBWUE7RUFDRTtJQUNFLGFBQUE7SUFDQSwwQkFBQTtJQUNBLHFCQUFBO0lBQ0Esa0JBQUE7SUFDQSxrQkFBQTtFQVZGO0VBYUE7SUFDRSxXQUFBO0lBQ0EsYUFBQTtJQUNBLGVBQUE7RUFYRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBwbGFjZS1pdGVtczogY2VudGVyO1xyXG4gIC8qIENlbnRlciBjb250ZW50IGJvdGggaG9yaXpvbnRhbGx5IGFuZCB2ZXJ0aWNhbGx5ICovXHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyZnIgYXV0bztcclxuICAvKiA3NSUgdG9wLCByZW1haW5pbmcgYm90dG9tICovXHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgLyogRW5zdXJlIHRoZSBjb250YWluZXIgdGFrZXMgdXAgYXQgbGVhc3QgdGhlIGZ1bGwgdmlld3BvcnQgaGVpZ2h0ICovXHJcbn1cclxuXHJcbi50b3Atc2VjdGlvbiB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcclxuICBtYXJnaW46IDJyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIC8vIGhlaWdodDogOTB2aDtcclxuICBvdmVyZmxvdzogYXV0bztcclxuICB3aWR0aDogOTR2dztcclxuICAvLyBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAyZnI7XHJcbn1cclxuXHJcbi50b3Atc2VjdGlvbiBpbWcge1xyXG4gIG1heC13aWR0aDogNzMlO1xyXG4gIGhlaWdodDogNzIlO1xyXG4gIC8vIG1heC1oZWlnaHQ6IDMwJTtcclxuICAvLyBvYmplY3QtZml0OiBjb250YWluO1xyXG4gIC8vIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnRvcC1zZWN0aW9uIHAge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICAvKiBBZGp1c3QgYXMgbmVlZGVkICovXHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC50b3Atc2VjdGlvbiBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuLmJvdHRvbS1zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtcm93OiAyIC8gMztcclxuICBtYXJnaW46IDFyZW0gLjRyZW07XHJcbn1cclxuXHJcbi5zdGFyLXJhdGluZyB7XHJcbiAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xyXG4gIHBhZGRpbmc6IC42cmVtIDA7XHJcbn1cclxuXHJcbi5zdGFyIHtcclxuICBjb2xvcjogI2NjYztcclxuICAvKiBEZWZhdWx0IHN0YXIgY29sb3IgKi9cclxufVxyXG5cclxuLnN0YXIuZmlsbGVkIHtcclxuICBjb2xvcjogI0ZGRDcwMDtcclxuICAvKiBGaWxsZWQgc3RhciBjb2xvciAqL1xyXG59XHJcblxyXG5cclxuLyogSGlkZSB0aGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG59XHJcblxyXG4vKiBPcHRpb25hbDogU3R5bGUgdGhlIHRyYWNrICh0aGUgYXJlYSBiZWhpbmQgdGhlIHRodW1iKSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtd3JhcHBlciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMS4ycmVtO1xyXG4gIG1pbi1oZWlnaHQ6IDE3cmVtO1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtaW1hZ2Uge1xyXG4gIHdpZHRoOiAyMnJlbTtcclxuICBoZWlnaHQ6IDEycmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNhcm91c2VsLWltYWdlOmhvdmVyIHtcclxuICB3aWR0aDogMjRyZW07XHJcbiAgaGVpZ2h0OiAxNHJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogMC4ycyBlYXNlLW91dDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aCA6MTI4MHB4KSB7XHJcbiAgLmNhcm91c2VsLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxLjJyZW07XHJcbiAgICBtaW4taGVpZ2h0OiAzMnJlbTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjExNzBweCkge1xyXG4gIC5jYXJvdXNlbC13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxLjJyZW07XHJcbiAgICBtaW4taGVpZ2h0OiAzNnJlbTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjc0MHB4KSB7XHJcbiAgLmNhcm91c2VsLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMS4ycmVtO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuXHJcbiAgLmNhcm91c2VsLWltYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMnJlbTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 97660:
/*!******************************************!*\
  !*** ./src/app/page1/page1.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Page1Component: () => (/* binding */ Page1Component)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 72448);


class Page1Component {
  constructor(meta) {
    this.meta = meta;
    this.meta.addTag({
      name: 'description',
      content: 'page1'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'page1'
    });
  }
  static #_ = this.ɵfac = function Page1Component_Factory(t) {
    return new (t || Page1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.Meta));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: Page1Component,
    selectors: [["app-page1"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 0,
    template: function Page1Component_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "page1 works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3604:
/*!******************************************!*\
  !*** ./src/app/page2/page2.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Page2Component: () => (/* binding */ Page2Component)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 72448);


class Page2Component {
  constructor(meta) {
    this.meta = meta;
    this.meta.addTag({
      name: 'description',
      content: 'page2'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'page2'
    });
  }
  static #_ = this.ɵfac = function Page2Component_Factory(t) {
    return new (t || Page2Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.Meta));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: Page2Component,
    selectors: [["app-page2"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 0,
    template: function Page2Component_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "page2 works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 14664:
/*!***********************************************!*\
  !*** ./src/app/pipes/split-paragraph.pipe.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitParagraphPipe: () => (/* binding */ SplitParagraphPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);

class SplitParagraphPipe {
  transform(value, maxWordsPerParagraph) {
    if (!value) return [];
    const sentences = value.split(/[.!?]/); // Split by common sentence-ending punctuation
    let currentParagraph = '';
    const paragraphs = [];
    sentences.forEach(sentence => {
      const wordsInSentence = sentence.split(' ');
      if (currentParagraph.split(' ').length + wordsInSentence.length <= maxWordsPerParagraph) {
        currentParagraph += sentence + ' ';
      } else {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = sentence + ' ';
      }
    });
    if (currentParagraph.trim().length > 0) {
      paragraphs.push(currentParagraph.trim());
    }
    return paragraphs;
  }
  static #_ = this.ɵfac = function SplitParagraphPipe_Factory(t) {
    return new (t || SplitParagraphPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "splitParagraph",
    type: SplitParagraphPipe,
    pure: true,
    standalone: true
  });
}

/***/ }),

/***/ 6448:
/*!********************************************!*\
  !*** ./src/app/review/review.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewComponent: () => (/* binding */ ReviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 55432);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 75388);












const _c0 = a0 => ({
  "filled": a0
});
function ReviewComponent_div_5_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2605");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r3 = ctx.$implicit;
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, i_r3 <= item_r1.rating));
  }
}
const _c1 = () => [1, 2, 3, 4, 5];
function ReviewComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewComponent_div_5_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.clickOnReview(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ReviewComponent_div_5_span_5_Template, 2, 3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewComponent_div_5_Template_a_click_10_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.showFullReview(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Read More");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", item_r1.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](8, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind3"](9, 4, item_r1.review, 0, ctx_r0.reviewLength), "... ");
  }
}
class ReviewComponent {
  constructor(titleService, metaService, sharedDataService, movieService, router) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.sharedDataService = sharedDataService;
    this.movieService = movieService;
    this.router = router;
    this.items = [];
    this.reviewLength = 200;
    this.updateTitle();
    this.movieService.getMovieReviws().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.items = data;
    });
  }
  ngOnInit() {}
  updateTitle() {
    // Logic to update title dynamically based on your page content
    this.titleService.setTitle('Reviews-CinemaKompany');
    this.metaService.addTag({
      property: 'og:description',
      content: "Cinema Kompany"
    });
    this.metaService.addTag({
      property: 'og:image',
      content: "../../assets/images/logo3.png"
    });
  }
  clickOnReview(movie) {
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.router.navigate([`/reviews/${movie?.id}`], {
      state: {
        data: movie
      }
    });
  }
  showFullReview(movie) {
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.router.navigate([`/reviews/${movie?.id}`], {
      state: {
        data: movie
      }
    });
    // item.review = !item.review;
  }
  goToHomePage() {
    this.router.navigate(['']);
  }
  static #_ = this.ɵfac = function ReviewComponent_Factory(t) {
    return new (t || ReviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ReviewComponent,
    selectors: [["app-review"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService, src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 6,
    vars: 1,
    consts: [[2, "display", "grid", "justify-content", "end", "margin", ".8rem"], [2, "text-align", "center", "font-family", "Jost", "font-size", "1.5rem", "cursor", "pointer", ";padding", ".8rem", "border-radius", "12px", "display", "grid", "background-color", "#333", "justify-content", "start", 3, "click"], [1, "image-grid"], ["class", "grid-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "grid-item", 3, "click"], ["alt", "Image", 1, "image", 3, "src"], [2, "font-family", "Jost", "font-weight", "700", "margin-top", "1.2rem", "font-size", "1.4rem", "min-height", "8rem", "word-wrap", "break-word", "overflow-wrap", "break-word", "line-height", "1.2"], [1, "star-rating"], ["class", "star", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "description"], [2, "cursor", "pointer", 3, "click"], [1, "star", 3, "ngClass"]],
    template: function ReviewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewComponent_Template_header_click_1_listener() {
          return ctx.goToHomePage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "home");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ReviewComponent_div_5_Template, 12, 9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.items);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.SlicePipe, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon],
    styles: [".image-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));\n  gap: 20px;\n  overflow-x: auto;\n}\n\n.grid-item[_ngcontent-%COMP%] {\n  justify-items: center;\n  align-items: center;\n  text-align: center;\n  padding: 10px;\n  border: 1px solid #353535;\n  border-radius: 5px;\n  min-height: 30rem;\n}\n\n.image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: 32%;\n}\n\n.description[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  text-align: justify;\n}\n\n.star-rating[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 24px;\n  text-align: start;\n}\n\n.star[_ngcontent-%COMP%] {\n  color: #ccc;\n  \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #FFD700;\n  \n\n}\n\n.header[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: #fff;\n  display: grid;\n  padding: 20px;\n  text-align: center;\n  font-size: large;\n  border: 1px solid white;\n  border-radius: 12px;\n  cursor: pointer;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3L3Jldmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSw0REFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBR0UscUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBREY7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsdUJBQUE7QUFERjs7QUFJQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtBQURGOztBQUtBO0VBQ0Usc0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFGRjs7QUFLQSxrQ0FBQTtBQUNBO0VBQ0UsUUFBQTtFQUNBLFNBQUE7QUFGRjs7QUFLQSwwREFBQTtBQUNBO0VBQ0UsdUJBQUE7QUFGRjs7QUFLQSxvRUFBQTtBQUNBO0VBQ0UsdUJBQUE7QUFGRiIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZS1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDQwMHB4LCAxZnIpKTtcclxuICBnYXA6IDIwcHg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG5cclxuLmdyaWQtaXRlbSB7XHJcbiAgLy8gZGlzcGxheTogZ3JpZDtcclxuICAvLyA6IGNvbHVtbjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjMzUzNTM1O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBtaW4taGVpZ2h0OiAzMHJlbTtcclxufVxyXG5cclxuLmltYWdlIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzMiU7XHJcbn1cclxuXHJcbi5kZXNjcmlwdGlvbiB7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG59XHJcblxyXG4uc3Rhci1yYXRpbmcge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xyXG59XHJcblxyXG4uc3RhciB7XHJcbiAgY29sb3I6ICNjY2M7XHJcbiAgLyogRGVmYXVsdCBzdGFyIGNvbG9yICovXHJcbn1cclxuXHJcbi5zdGFyLmZpbGxlZCB7XHJcbiAgY29sb3I6ICNGRkQ3MDA7XHJcbiAgLyogRmlsbGVkIHN0YXIgY29sb3IgKi9cclxufVxyXG5cclxuXHJcbi5oZWFkZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IGxhcmdlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4vKiBIaWRlIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhciAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogMDtcclxuICBoZWlnaHQ6IDA7XHJcbn1cclxuXHJcbi8qIE9wdGlvbmFsOiBTdHlsZSB0aGUgdHJhY2sgKHRoZSBhcmVhIGJlaGluZCB0aGUgdGh1bWIpICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4vKiBPcHRpb25hbDogU3R5bGUgdGhlIHRodW1iICh0aGUgZHJhZ2dhYmxlIHBhcnQgb2YgdGhlIHNjcm9sbGJhcikgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 27212:
/*!*************************************************************************!*\
  !*** ./src/app/review/reviewsinglemovie/reviewsinglemovie.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewsinglemovieComponent: () => (/* binding */ ReviewsinglemovieComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 11728);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 6564);
/* harmony import */ var src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/SharedDataService */ 48676);
/* harmony import */ var src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/movies.service */ 18052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 75388);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var ngx_image_compress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-image-compress */ 25500);











const _c0 = a0 => ({
  "filled": a0
});
function ReviewsinglemovieComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2605");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, i_r2 <= ctx_r0.rating));
  }
}
function ReviewsinglemovieComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewsinglemovieComponent_div_30_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const item_r3 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r4.onReviewClick(item_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", item_r3.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r3.description);
  }
}
const _c1 = () => [1, 2, 3, 4, 5];
class ReviewsinglemovieComponent {
  constructor(sharedDataService, router, route, metaService, titleService, imageCompress, movieService) {
    this.sharedDataService = sharedDataService;
    this.router = router;
    this.route = route;
    this.metaService = metaService;
    this.titleService = titleService;
    this.imageCompress = imageCompress;
    this.movieService = movieService;
    this.imageSource = '';
    this.description = '';
    this.descriptionLimit = 150; // Adjust this as needed
    this.title = '';
    this.review = '';
    this.rating = 3;
    this.movieName = '';
    this.verdict = '';
    this.paragrapgh2 = '';
    this.paragrapgh3 = '';
    this.paragrapgh4 = '';
    this.paragrapgh5 = '';
    this.paragrapgh6 = '';
    this.paragrapgh7 = '';
    this.reviewLength = 1000;
    this.items = [];
  }
  ngOnInit() {
    console.log("first");
    // this.metaService.updateTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });
    this.route.params.subscribe(params => {
      this.id = params['movie_id'];
      console.log("paramsssssss", params);
      this.loadMovieData(this.id);
    });
    this.movieService.getMovieReviws().subscribe(doc => {
      doc.map(data => {
        console.log(data);
        if (data.id == this.id) {
          this.titleService.setTitle(`${data?.description}`);
          this.metaService.updateTag({
            property: 'og:title',
            content: `${data?.description}`
          });
          this.metaService.updateTag({
            property: 'og:image',
            content: `https://craftangelsbysita.com/${data.image}`
          });
          this.title = data?.title;
          this.rating = data?.rating;
          this.movieName = data?.movieName;
          this.verdict = data?.verdict;
          this.paragrapgh2 = data?.paragrapgh2;
          this.paragrapgh3 = data?.paragrapgh3;
          this.paragrapgh4 = data?.paragrapgh4;
          this.paragrapgh5 = data?.paragrapgh5;
          this.paragrapgh6 = data?.paragrapgh6;
          this.paragrapgh7 = data?.paragrapgh7;
          this.description = data?.description;
          this.review = data?.review;
          const imageURL = `https://craftangelsbysita.com/${data?.image}`;
          // Compress and update image
          this.compressAndUpdateImage(imageURL);
          this.imageSource = data?.image;
        }
        console.log(this.description);
      });
    });
    this.fetchCarouselData();
  }
  showFullDescription() {
    this.descriptionLimit = this.description.length;
  }
  showFullReview() {
    this.reviewLength = this.review.length;
  }
  onMoreReviewClick() {
    this.router.navigate(['reviews']);
  }
  loadMovieData(id) {
    const data = this.sharedDataService.getMovieDataReview();
    if (data) {
      // Assuming the data is stored as an object with movie IDs as keys
      if (data.id == id) {
        const imageURL = `https://craftangelsbysita.com/assets/images/reviews/${data?.movieName}.jpg`;
        // Compress and update image
        this.compressAndUpdateImage(imageURL);
        this.imageSource = data?.image;
        // this.title = data?.title;
        // this.rating = data?.rating;
        // this.movieName = data?.movieName;
        // this.verdict = data?.verdict;
        // this.paragrapgh2 = data?.paragrapgh2;
        // this.paragrapgh3 = data?.paragrapgh3;
        // this.paragrapgh4 = data?.paragrapgh4;
        // this.paragrapgh5 = data?.paragrapgh5;
        // this.paragrapgh6 = data?.paragrapgh6;
        // this.paragrapgh7 = data?.paragrapgh7;
        // this.description = data?.description;
        // this.review = data?.review;
      }
    }
  }
  compressAndUpdateImage(imageURL) {
    fetch(imageURL).then(response => response.blob()).then(blob => this.compressImage(blob)).then(compressedBlob => {
      const compressedImageURL = URL.createObjectURL(compressedBlob);
      // this.metaService.updateTag({ property: 'og:image', content: compressedImageURL });
      URL.revokeObjectURL(compressedImageURL); // Clean up
    }).catch(error => console.error('Error compressing image:', error));
  }
  compressImage(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = 300; // Set width to 300px
            canvas.height = img.height * (canvas.width / img.width);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(resolve, 'image/jpeg', 0.75); // JPEG with 75% quality
          } else {
            reject(new Error('Canvas context is null'));
          }
        };
        img.onerror = error => reject(error);
      };
      reader.onerror = error => reject(error);
    });
  }
  fetchCarouselData() {
    this.movieService.getMovieReviws().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      let counter = 0;
      this.items = data.filter(doc => {
        counter += 1;
        if (doc.id != this.id && counter >= 1 && counter <= data.length - 1) {
          return doc;
        }
      });
    });
  }
  onReviewClick(movie) {
    this.router.navigate([]).then(res => {
      window.open(`/reviews/${movie?.id}`, '_blank');
    });
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.fetchCarouselData();
  }
  static #_ = this.ɵfac = function ReviewsinglemovieComponent_Factory(t) {
    return new (t || ReviewsinglemovieComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_image_compress__WEBPACK_IMPORTED_MODULE_5__.NgxImageCompressService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ReviewsinglemovieComponent,
    selectors: [["app-reviewsinglemovie"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([src_app_services_SharedDataService__WEBPACK_IMPORTED_MODULE_0__.SharedDataService, src_app_services_movies_service__WEBPACK_IMPORTED_MODULE_1__.MovieService]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 31,
    vars: 11,
    consts: [[1, "top-section"], [2, "display", "grid"], ["alt", "Image", 2, "justify-self", "center", 3, "src"], [2, "font-family", "Jost", "font-size", "2rem", "font-weight", "700", "padding", "1rem 0", "text-align", "start"], [2, "text-align", "start", "font-family", "Jost", "font-weight", "400", "font-size", "1.2rem", "word-wrap", "break-word", "overflow-wrap", "break-word"], [1, "star-rating"], ["class", "star", 3, "ngClass", 4, "ngFor", "ngForOf"], [2, "text-align", "justify", "text-decoration", "dotted", "color", "#c4c4c4", "font-size", "1.2rem", "word-wrap", "break-word", "overflow-wrap", "break-word"], [1, "", 2, "font-size", "1.2rem", "text-align", "start"], [2, "font-weight", "bold", "color", "rgb(238, 238, 159)", "font-size", "1.2rem"], [1, "bottom-section"], [2, "display", "grid", "width", "12rem", "padding", "1rem", "justify-self", "center", "border", "1px solid black", "border-radius", "12px", "font-family", "Poppins", "font-weight", "bold", "cursor", "pointer", 3, "click"], [1, "carousel-wrapper"], [3, "click", 4, "ngFor", "ngForOf"], [1, "star", 3, "ngClass"], [3, "click"], ["alt", "Image", 1, "carousel-image", 2, "justify-self", "center", 3, "src"], [2, "font-family", "Jost", "font-size", "1.2rem", "font-weight", "400"]],
    template: function ReviewsinglemovieComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ReviewsinglemovieComponent_span_8_Template, 2, 3, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 7)(10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " Verdict : ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 10)(27, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewsinglemovieComponent_Template_button_click_27_listener() {
          return ctx.onMoreReviewClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "More Reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](30, ReviewsinglemovieComponent_div_30_Template, 4, 2, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://craftangelsbysita.com/", ctx.imageSource, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.movieName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.description, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](10, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.review);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.paragrapgh2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.paragrapgh3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.paragrapgh4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.verdict);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.items);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule],
    styles: [".container[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center; \n\n  grid-template-rows: 2fr auto; \n\n  min-height: 100vh; \n\n}\n\n.top-section[_ngcontent-%COMP%] {\n  display: grid;\n  justify-self: center;\n  margin: 2rem;\n  text-align: center;\n  overflow: auto;\n  width: 94vw;\n}\n\n.top-section[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 73%;\n  height: 72%;\n}\n\n.top-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px; \n\n}\n\n@media (max-width: 768px) {\n  .top-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n.bottom-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-row: 2/3;\n  margin: 1rem 0.4rem;\n}\n\n.star-rating[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  font-size: 24px;\n  text-align: start;\n  padding: 0.6rem 0;\n}\n\n.star[_ngcontent-%COMP%] {\n  color: #ccc; \n\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #FFD700; \n\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: transparent;\n}\n\n.carousel-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  justify-items: center;\n  margin-top: 1.2rem;\n  min-height: 17rem;\n}\n\n.carousel-image[_ngcontent-%COMP%] {\n  width: 22rem;\n  height: 12rem;\n  cursor: pointer;\n}\n\n.carousel-image[_ngcontent-%COMP%]:hover {\n  width: 24rem;\n  height: 14rem;\n  cursor: pointer;\n  transition: 0.2s ease-out;\n}\n\n@media screen and (max-width: 1280px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    min-height: 32rem;\n  }\n}\n@media screen and (max-width: 1170px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    min-height: 36rem;\n  }\n}\n@media screen and (max-width: 740px) {\n  .carousel-wrapper[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n    justify-items: center;\n    margin-top: 1.2rem;\n    position: relative;\n  }\n  .carousel-image[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 12rem;\n    cursor: pointer;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3L3Jldmlld3NpbmdsZW1vdmllL3Jldmlld3NpbmdsZW1vdmllLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBLEVBQUEsb0RBQUE7RUFDQSw0QkFBQSxFQUFBLDhCQUFBO0VBQ0EsaUJBQUEsRUFBQSxvRUFBQTtBQUNKOztBQUNFO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBRUEsY0FBQTtFQUVBLFdBQUE7QUFBSjs7QUFJRTtFQUNFLGNBQUE7RUFDQSxXQUFBO0FBREo7O0FBT0U7RUFDRSxlQUFBLEVBQUEscUJBQUE7QUFKSjs7QUFPRTtFQUNFO0lBQ0UsZUFBQTtFQUpKO0FBQ0Y7QUFTRTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFQSjs7QUFVRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQVBKOztBQVVFO0VBQ0UsV0FBQSxFQUFBLHVCQUFBO0FBUEo7O0FBVUU7RUFDRSxjQUFBLEVBQUEsc0JBQUE7QUFQSjs7QUFXQSxrQ0FBQTtBQUNBO0VBQ0UsUUFBQTtFQUNBLFNBQUE7QUFSRjs7QUFXQSwwREFBQTtBQUNBO0VBQ0UsdUJBQUE7QUFSRjs7QUFXQSxvRUFBQTtBQUNBO0VBQ0UsdUJBQUE7QUFSRjs7QUFXQTtFQUNFLGFBQUE7RUFDQSxzQ0FBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQVJGOztBQVdBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FBUkY7O0FBV0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQVJGOztBQVdBO0VBQ0U7SUFDRSxhQUFBO0lBQ0Esa0NBQUE7SUFDQSxxQkFBQTtJQUNBLGtCQUFBO0lBQ0EsaUJBQUE7RUFSRjtBQUNGO0FBV0E7RUFDRTtJQUNFLGFBQUE7SUFDQSw4QkFBQTtJQUNBLHFCQUFBO0lBQ0Esa0JBQUE7SUFDQSxpQkFBQTtFQVRGO0FBQ0Y7QUFZQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLDBCQUFBO0lBQ0EscUJBQUE7SUFDQSxrQkFBQTtJQUNBLGtCQUFBO0VBVkY7RUFhQTtJQUNFLFdBQUE7SUFDQSxhQUFBO0lBQ0EsZUFBQTtFQVhGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBwbGFjZS1pdGVtczogY2VudGVyOyAvKiBDZW50ZXIgY29udGVudCBib3RoIGhvcml6b250YWxseSBhbmQgdmVydGljYWxseSAqL1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyZnIgYXV0bzsgLyogNzUlIHRvcCwgcmVtYWluaW5nIGJvdHRvbSAqL1xyXG4gICAgbWluLWhlaWdodDogMTAwdmg7IC8qIEVuc3VyZSB0aGUgY29udGFpbmVyIHRha2VzIHVwIGF0IGxlYXN0IHRoZSBmdWxsIHZpZXdwb3J0IGhlaWdodCAqL1xyXG4gIH1cclxuICAudG9wLXNlY3Rpb257XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDJyZW07XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAvLyBoZWlnaHQ6IDkwdmg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuXHJcbiAgICB3aWR0aDogOTR2dztcclxuICAgIC8vIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDJmcjtcclxuICB9XHJcbiAgXHJcbiAgLnRvcC1zZWN0aW9uIGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDczJTtcclxuICAgIGhlaWdodDogNzIlO1xyXG4gICAgLy8gbWF4LWhlaWdodDogMzAlO1xyXG4gICAgLy8gb2JqZWN0LWZpdDogY29udGFpbjtcclxuICAgIC8vIGhlaWdodDogYXV0bztcclxuICB9XHJcbiAgXHJcbiAgLnRvcC1zZWN0aW9uIHAge1xyXG4gICAgZm9udC1zaXplOiAxOHB4OyAvKiBBZGp1c3QgYXMgbmVlZGVkICovXHJcbiAgfVxyXG4gIFxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgLnRvcC1zZWN0aW9uIHAge1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gIH1cclxuICBcclxuICAuYm90dG9tLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtcm93OiAyIC8gMztcclxuICAgIG1hcmdpbjogMXJlbSAuNHJlbTtcclxuICB9XHJcbiAgXHJcbiAgLnN0YXItcmF0aW5nIHtcclxuICAgIG1hcmdpbjogMXJlbSAwO1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgdGV4dC1hbGlnbjogc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAuNnJlbSAwO1xyXG4gIH1cclxuICBcclxuICAuc3RhciB7XHJcbiAgICBjb2xvcjogI2NjYzsgLyogRGVmYXVsdCBzdGFyIGNvbG9yICovXHJcbiAgfVxyXG4gIFxyXG4gIC5zdGFyLmZpbGxlZCB7XHJcbiAgICBjb2xvcjogI0ZGRDcwMDsgLyogRmlsbGVkIHN0YXIgY29sb3IgKi9cclxuICB9IFxyXG5cclxuICBcclxuLyogSGlkZSB0aGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG59XHJcblxyXG4vKiBPcHRpb25hbDogU3R5bGUgdGhlIHRyYWNrICh0aGUgYXJlYSBiZWhpbmQgdGhlIHRodW1iKSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogT3B0aW9uYWw6IFN0eWxlIHRoZSB0aHVtYiAodGhlIGRyYWdnYWJsZSBwYXJ0IG9mIHRoZSBzY3JvbGxiYXIpICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtd3JhcHBlciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMS4ycmVtO1xyXG4gIG1pbi1oZWlnaHQ6IDE3cmVtO1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtaW1hZ2Uge1xyXG4gIHdpZHRoOiAyMnJlbTtcclxuICBoZWlnaHQ6IDEycmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNhcm91c2VsLWltYWdlOmhvdmVyIHtcclxuICB3aWR0aDogMjRyZW07XHJcbiAgaGVpZ2h0OiAxNHJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogMC4ycyBlYXNlLW91dDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aCA6MTI4MHB4KSB7XHJcbiAgLmNhcm91c2VsLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxLjJyZW07XHJcbiAgICBtaW4taGVpZ2h0OiAzMnJlbTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjExNzBweCkge1xyXG4gIC5jYXJvdXNlbC13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxLjJyZW07XHJcbiAgICBtaW4taGVpZ2h0OiAzNnJlbTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjc0MHB4KSB7XHJcbiAgLmNhcm91c2VsLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMS4ycmVtO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuXHJcbiAgLmNhcm91c2VsLWltYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMnJlbTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 48676:
/*!***********************************************!*\
  !*** ./src/app/services/SharedDataService.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedDataService: () => (/* binding */ SharedDataService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);

class SharedDataService {
  constructor() {
    this.storageKey = 'movieData';
    this.storageKeyReview = 'ReviewmovieData';
    this.storageKeyNews = 'NewsData';
  }
  updateMovieData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
  updateMovieDataFromReview(data) {
    localStorage.setItem(this.storageKeyReview, JSON.stringify(data));
  }
  updateNewsData(data) {
    localStorage.setItem(this.storageKeyNews, JSON.stringify(data));
  }
  getNewsData() {
    const data = localStorage.getItem(this.storageKeyNews);
    return data ? JSON.parse(data) : null;
  }
  getMovieData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
  getMovieDataReview() {
    const data = localStorage.getItem(this.storageKeyReview);
    return data ? JSON.parse(data) : null;
  }
  static #_ = this.ɵfac = function SharedDataService_Factory(t) {
    return new (t || SharedDataService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: SharedDataService,
    factory: SharedDataService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 18052:
/*!********************************************!*\
  !*** ./src/app/services/movies.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MovieService: () => (/* binding */ MovieService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6564);


class MovieService {
  constructor(http) {
    this.http = http;
  }
  getMoviesData() {
    // return assets/images/NowinTheatres/now_in_theatres.json
    // return this.http.get<any[]>('assets/images/NowinTheatres/now_in_theatres.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/NowinTheatres/now_in_theatres.json');
  }
  getMoviesDataFromForthcomingReleases() {
    // return this.http.get<any[]>('assets/images/ForthcomingReleases/ForthcomingReleases.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/ForthcomingReleases/ForthcomingReleases.json');
  }
  getMoviesDataFromHomeCarousel() {
    // return this.http.get<any[]>('assets/images/home-carousel/Home_Carousel.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/home-carousel/Home_Carousel.json');
  }
  getMoviesDataFromAdvertisement() {
    console.log("Called");
    // return this.http.get<any[]>('assets/images/advertisement/advertisement.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/advertisement/advertisement.json');
  }
  getMovieReviws() {
    // return this.http.get<any[]>('assets/images/reviews/reviews.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/reviews/reviews.json');
  }
  getMovieNews() {
    // return this.http.get<any[]>('assets/images/news/news.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/news/news.json');
  }
  getMovieFromNowInOtt() {
    // return this.http.get<any[]>('assets/images/NowinOTT/Now_in_Ott.json');
    return this.http.get('https://craftangelsbysita.com/assets/images/NowinOTT/Now_in_Ott.json');
  }
  static #_ = this.ɵfac = function MovieService_Factory(t) {
    return new (t || MovieService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: MovieService,
    factory: MovieService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 97368:
/*!*****************************************!*\
  !*** ./src/app/services/seo.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEOService: () => (/* binding */ SEOService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 68308);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6564);



class SEOService {
  constructor(title, meta, http) {
    this.title = title;
    this.meta = meta;
    this.http = http;
  }
  updateTitle(title) {
    this.title.setTitle(title);
  }
  updateOgUrl(url) {
    this.meta.updateTag({
      name: 'og:url',
      content: url
    });
  }
  updateDescription(desc) {
    this.meta.updateTag({
      name: 'og:description',
      content: "desc-1"
    });
  }
  addTag(desc) {
    this.meta.updateTag;
  }
  getDynamicContent(url) {
    // Make an HTTP request to your server or API to fetch dynamic content based on the URL
    return this.http.get(`https://jsonplaceholder.typicode.com/todos/1`);
  }
  static #_ = this.ɵfac = function SEOService_Factory(t) {
    return new (t || SEOService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: SEOService,
    factory: SEOService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 99532:
/*!****************************!*\
  !*** ./src/main.server.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 72448);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 81164);
/* harmony import */ var _app_app_config_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config.server */ 43936);
// export { AppServerModule as default } from './app/app.module.server';



const bootstrap = () => (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _app_app_config_server__WEBPACK_IMPORTED_MODULE_1__.config);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bootstrap);

/***/ }),

/***/ 28516:
/*!****************************************!*\
  !*** ./node_modules/express/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 28516;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 16914:
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 52588:
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 87968:
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 90467:
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 2058:
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 86136:
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 51256:
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 72872:
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 80662:
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 23520:
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ 18864:
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 11502:
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 88558:
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 67072:
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 23742:
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 48378:
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 98680:
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 95664:
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 43340:
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 78716:
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 50970:
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 60592:
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		__webpack_require__.O(undefined, [968], () => (__webpack_require__(25808)))
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [968], () => (__webpack_require__(69548)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + (chunkId === 968 ? "vendor" : chunkId) + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			590: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(968);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map