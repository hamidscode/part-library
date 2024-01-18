'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">part-library documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/LibraryModule.html\" data-type=\"entity-link\" >LibraryModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'data-bs-target="#xs-controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'id="xs-controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/LibraryController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LibraryController</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"controllers/LibraryProcessController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LibraryProcessController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'data-bs-target="#xs-injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'id="xs-injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookRequestFactory.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookRequestFactory</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookRequestMapper.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookRequestMapper</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookRequestRepository.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookRequestRepository</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookRequestRetryJob.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookRequestRetryJob</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookRequestUseCase.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookRequestUseCase</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/BookReservationUseCase.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BookReservationUseCase</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/NoticeProxy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NoticeProxy</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ProcessBookProxy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProcessBookProxy</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links"' : 'data-bs-target="#xs-controllers-links"', ">\n                                <span class=\"icon ion-md-swap\"></span>\n                                <span>Controllers</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"controllers/LibraryController.html\" data-type=\"entity-link\" >LibraryController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/LibraryProcessController.html\" data-type=\"entity-link\" >LibraryProcessController</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/BaseEntity.html\" data-type=\"entity-link\" >BaseEntity</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BaseFactory.html\" data-type=\"entity-link\" >BaseFactory</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BaseRepository.html\" data-type=\"entity-link\" >BaseRepository</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BaseSchema.html\" data-type=\"entity-link\" >BaseSchema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BookRequestDto.html\" data-type=\"entity-link\" >BookRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BookRequestEntity.html\" data-type=\"entity-link\" >BookRequestEntity</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BookRequestSchema.html\" data-type=\"entity-link\" >BookRequestSchema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ChangeBookRequestStatusCommand.html\" data-type=\"entity-link\" >ChangeBookRequestStatusCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ChangeBookRequestStatusEvent.html\" data-type=\"entity-link\" >ChangeBookRequestStatusEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ChangeBookRequestStatusEventHandler.html\" data-type=\"entity-link\" >ChangeBookRequestStatusEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ChangeBookRequestStatusHandler.html\" data-type=\"entity-link\" >ChangeBookRequestStatusHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateBookRequestCommand.html\" data-type=\"entity-link\" >CreateBookRequestCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateBookRequestEvent.html\" data-type=\"entity-link\" >CreateBookRequestEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateBookRequestEventHandler.html\" data-type=\"entity-link\" >CreateBookRequestEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateBookRequestHandler.html\" data-type=\"entity-link\" >CreateBookRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetAllBookRequestsHandler.html\" data-type=\"entity-link\" >GetAllBookRequestsHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetAllBookRequestsQuery.html\" data-type=\"entity-link\" >GetAllBookRequestsQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetBookRequestHandler.html\" data-type=\"entity-link\" >GetBookRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetBookRequestQuery.html\" data-type=\"entity-link\" >GetBookRequestQuery</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookRequestFactory.html\" data-type=\"entity-link\" >BookRequestFactory</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookRequestMapper.html\" data-type=\"entity-link\" >BookRequestMapper</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookRequestRepository.html\" data-type=\"entity-link\" >BookRequestRepository</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookRequestRetryJob.html\" data-type=\"entity-link\" >BookRequestRetryJob</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookRequestUseCase.html\" data-type=\"entity-link\" >BookRequestUseCase</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/BookReservationUseCase.html\" data-type=\"entity-link\" >BookReservationUseCase</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/NoticeProxy.html\" data-type=\"entity-link\" >NoticeProxy</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProcessBookProxy.html\" data-type=\"entity-link\" >ProcessBookProxy</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/BaseMapper.html\" data-type=\"entity-link\" >BaseMapper</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/BookProcessResultInterface.html\" data-type=\"entity-link\" >BookProcessResultInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/BookRequestInterface.html\" data-type=\"entity-link\" >BookRequestInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/FilterType.html\" data-type=\"entity-link\" >FilterType</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));