webpackJsonp([3],{

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Home = exports.initialState = exports.reducer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Articals = __webpack_require__(842);

var _Articals2 = _interopRequireDefault(_Articals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Articals2.default, { current: 1, count: 15, type: 1, carousel: true })
            );
        }
    }]);

    return Home;
}(_react.Component);

var initialState = _defineProperty({}, _Articals.stateKey, _Articals.initialState);

var reducer = _defineProperty({}, _Articals.stateKey, _Articals.reducer);

exports.reducer = reducer;
exports.initialState = initialState;
exports.Home = Home;

/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articalItem = __webpack_require__(829);

var _articalItem2 = _interopRequireDefault(_articalItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticalList = function ArticalList(_ref) {
    var articals = _ref.articals;

    return _react2.default.createElement(
        'div',
        { className: 'artical-list' },
        articals ? articals.map(function (artical) {
            return _react2.default.createElement(
                'div',
                { key: artical.id },
                _react2.default.createElement(_articalItem2.default, artical)
            );
        }) : ''
    );
};

exports.default = ArticalList;

/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = __webpack_require__(50);

var _row = __webpack_require__(51);

var _row2 = _interopRequireDefault(_row);

var _css2 = __webpack_require__(52);

var _col = __webpack_require__(53);

var _col2 = _interopRequireDefault(_col);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(49);

__webpack_require__(830);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticalItem = function (_Component) {
    _inherits(ArticalItem, _Component);

    function ArticalItem() {
        _classCallCheck(this, ArticalItem);

        return _possibleConstructorReturn(this, (ArticalItem.__proto__ || Object.getPrototypeOf(ArticalItem)).apply(this, arguments));
    }

    _createClass(ArticalItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                title = _props.title,
                theme = _props.theme,
                tag = _props.tag,
                created_at = _props.created_at,
                abstract = _props.abstract,
                views = _props.views,
                img_url = _props.img_url;


            return _react2.default.createElement(
                'div',
                { className: 'artical-item' },
                img_url ? _react2.default.createElement(
                    _row2.default,
                    null,
                    _react2.default.createElement(
                        _col2.default,
                        { xs: 0, sm: 8 },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/artical-detail/' + id },
                            _react2.default.createElement('img', { src: img_url, alt: '' })
                        )
                    ),
                    _react2.default.createElement(
                        _col2.default,
                        { xs: 24, sm: 16 },
                        _react2.default.createElement(
                            'div',
                            { className: 'artical-body' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/artical-detail/' + id },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    title
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'post @ ',
                                    created_at
                                ),
                                '\xA0\xA0',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'category: ',
                                    theme
                                ),
                                '\xA0\xA0',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Tag: ',
                                    tag
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'artical-abstract' },
                                abstract,
                                ' ...'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'artical-link' },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/artical-detail/' + id },
                                    '\u9605\u8BFB\u5168\u6587 >>'
                                )
                            )
                        )
                    )
                ) : _react2.default.createElement(
                    'div',
                    { className: 'artical-body' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/artical-detail/' + id },
                        _react2.default.createElement(
                            'h4',
                            null,
                            title
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            'post @ ',
                            created_at
                        ),
                        '\xA0\xA0',
                        _react2.default.createElement(
                            'span',
                            null,
                            'category: ',
                            theme
                        ),
                        '\xA0\xA0',
                        _react2.default.createElement(
                            'span',
                            null,
                            'Tag: ',
                            tag
                        ),
                        '\xA0\xA0',
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u6D4F\u89C8: ',
                            views
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'artical-abstract' },
                        abstract,
                        ' ...'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'artical-link' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/artical-detail/' + id },
                            '\u9605\u8BFB\u5168\u6587 >>'
                        )
                    )
                )
            );
        }
    }]);

    return ArticalItem;
}(_react.Component);

exports.default = ArticalItem;

/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(831);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.28.4/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.28.4/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: #f9f9f9; }\n\n.text-center {\n  text-align: center; }\n\n.bg-white {\n  background-color: #fff; }\n\n.panel-heading {\n  padding: 10px 15px;\n  color: #333;\n  font-size: 16px;\n  background-color: #f8f8f8;\n  border-bottom: 1px solid #ddd; }\n\n.panel-body {\n  padding: 15px; }\n\n.fl {\n  float: left; }\n\n.pagination {\n  margin: 15px 0;\n  text-align: right; }\n\n.clearfix {\n  *zoom: 1; }\n\n.clearfix:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.container {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n\n@media (min-width: 768px) {\n  .container {\n    width: 750px; } }\n\n@media (min-width: 992px) {\n  .container {\n    width: 970px; } }\n\n@media (min-width: 1200px) {\n  .container {\n    width: 1100px; } }\n\n.artical-item {\n  margin: 25px 0;\n  padding: 18px 25px 15px;\n  font-size: 16px;\n  background-color: #fff;\n  box-shadow: 0 0 5px #aaa;\n  transition: box-shadow ease-in 300ms; }\n  .artical-item:hover {\n    box-shadow: 0 0 15px #333; }\n\n.artical-body h4 {\n  font-size: 16px;\n  font-weight: bold; }\n\n.artical-body > p {\n  margin: 8px 0;\n  color: #999;\n  font-size: 13px; }\n\n.artical-abstract {\n  color: #333;\n  font-size: 15px; }\n\n.artical-link {\n  display: inline-block;\n  margin-top: 9px;\n  font-size: 12px; }\n  .artical-link > a {\n    color: #3197EF;\n    font-weight: bold; }\n", ""]);

// exports


/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getArticalList = exports.fetchArticalsFailure = exports.fetchArticalsSuccess = exports.fetchArticalsStarted = undefined;

var _actionType = __webpack_require__(833);

var _config = __webpack_require__(169);

var fetchArticalsStarted = exports.fetchArticalsStarted = function fetchArticalsStarted() {
    return {
        type: _actionType.ARTICALS_STARTED
    };
};

var fetchArticalsSuccess = exports.fetchArticalsSuccess = function fetchArticalsSuccess(articals) {
    return {
        type: _actionType.ARTICALS_SUCCESS,
        articals: articals
    };
};

var fetchArticalsFailure = exports.fetchArticalsFailure = function fetchArticalsFailure(message) {
    return {
        type: _actionType.ARTICALS_FAILURE,
        message: message
    };
};

var getArticalList = exports.getArticalList = function getArticalList() {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return function (dispatch) {
        var apiUrl = _config.SERVERADDRESS + '/get-artical-list?current=' + current + '&count=' + count + '&type=' + type;
        dispatch(fetchArticalsStarted());

        fetch(apiUrl).then(function (response) {

            if (response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(fetchArticalsFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then(function (responseJson) {
                if (responseJson.status == 0) {
                    dispatch(fetchArticalsFailure(responseJson.message));
                }
                dispatch(fetchArticalsSuccess(responseJson.articals));
            }).catch(function (error) {
                console.log(error);
                dispatch(fetchArticalsFailure(error));
            });
        }).catch(function (error) {
            console.log(error);
            dispatch(fetchArticalsFailure(error));
        });
    };
};

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ARTICALS_STARTED = exports.ARTICALS_STARTED = 'HOME_ARTICALS/STARTED';
var ARTICALS_SUCCESS = exports.ARTICALS_SUCCESS = 'HOME_ARTICALS/SUCCESS';
var ARTICALS_FAILURE = exports.ARTICALS_FAILURE = 'HOME_ARTICALS/FAILURE';

/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actions = exports.initialState = exports.stateKey = exports.reducer = undefined;

var _view = __webpack_require__(843);

var _view2 = _interopRequireDefault(_view);

var _reducer = __webpack_require__(847);

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = __webpack_require__(832);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reducer = _reducer2.default;
exports.stateKey = _view.stateKey;
exports.initialState = _view.initialState;
exports.actions = actions;
exports.default = _view2.default;

/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = exports.stateKey = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(106);

var _articalList = __webpack_require__(828);

var _articalList2 = _interopRequireDefault(_articalList);

var _listCarousel = __webpack_require__(844);

var _listCarousel2 = _interopRequireDefault(_listCarousel);

var _actions = __webpack_require__(832);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stateKey = exports.stateKey = "home-articals";
var initialState = exports.initialState = [];

var Articals = function (_Component) {
    _inherits(Articals, _Component);

    function Articals() {
        _classCallCheck(this, Articals);

        return _possibleConstructorReturn(this, (Articals.__proto__ || Object.getPrototypeOf(Articals)).apply(this, arguments));
    }

    _createClass(Articals, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                _props$current = _props.current,
                current = _props$current === undefined ? 1 : _props$current,
                _props$count = _props.count,
                count = _props$count === undefined ? 10 : _props$count,
                _props$type = _props.type,
                type = _props$type === undefined ? 1 : _props$type;

            this.props.getArticalList(current, count, type);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                articalList = _props2.articalList,
                carousel = _props2.carousel;


            return _react2.default.createElement(
                'div',
                null,
                articalList && carousel ? _react2.default.createElement(_listCarousel2.default, { links: articalList.map(function (artical) {
                        return {
                            link: '/artical-detail/' + artical.id,
                            value: '' + artical.title
                        };
                    }) }) : null,
                _react2.default.createElement(_articalList2.default, { articals: articalList })
            );
        }
    }]);

    return Articals;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        articalList: state[stateKey].articals || null
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        getArticalList: function getArticalList(current, count, type) {
            dispatch((0, _actions.getArticalList)(current, count, type));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Articals);

/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(49);

__webpack_require__(845);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListCarousel = function (_Component) {
    _inherits(ListCarousel, _Component);

    function ListCarousel(props) {
        _classCallCheck(this, ListCarousel);

        var _this = _possibleConstructorReturn(this, (ListCarousel.__proto__ || Object.getPrototypeOf(ListCarousel)).call(this, props));

        _this.componentWillUnmount = function () {
            clearInterval(_this._handle);
        };

        _this.state = {
            index: 0
        };
        return _this;
    }

    _createClass(ListCarousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var length = this.props.links && this.props.links.length || 0;
            if (length === 0) {
                return;
            }

            this._handle = setInterval(function () {
                return _this2.setState({
                    index: (_this2.state.index + 1) % length
                });
            }, 5000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                _props$title = _props.title,
                title = _props$title === undefined ? "最新文章" : _props$title,
                links = _props.links;

            return _react2.default.createElement(
                'div',
                { className: 'list-head-carousel-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'list-head-carousel-title' },
                    title,
                    ':'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'list-head-carousel' },
                    links.map(function (link, index) {
                        return _react2.default.createElement(
                            'p',
                            { style: index === _this3.state.index ? { opacity: 1 } : null, key: index },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: link.link },
                                link.value
                            )
                        );
                    })
                )
            );
        }
    }]);

    return ListCarousel;
}(_react.Component);

exports.default = ListCarousel;

/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(846);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.28.4/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.28.4/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".list-head-carousel-wrap {\n  height: 36px;\n  margin: 15px 0;\n  font-size: 13px;\n  background-color: #fafafa;\n  box-shadow: 0 0 6px #aaa; }\n\n.list-head-carousel-title {\n  display: inline-block;\n  height: 36px;\n  margin: 0 15px 0 25px;\n  line-height: 36px;\n  vertical-align: top; }\n\n.list-head-carousel {\n  position: relative;\n  display: inline-block;\n  height: 36px;\n  width: 500px;\n  max-width: 60%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n  .list-head-carousel > p {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    height: 36px;\n    padding: 0;\n    line-height: 36px;\n    opacity: 0;\n    transition: opacity ease-in 1000ms; }\n", ""]);

// exports


/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _status = __webpack_require__(170);

var Status = _interopRequireWildcard(_status);

var _actionType = __webpack_require__(833);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { status: Status.LOADING };
    var action = arguments[1];

    switch (action.type) {
        case _actionType.ARTICALS_STARTED:
            {
                return {
                    status: Status.LOADING
                };
            }
        case _actionType.ARTICALS_SUCCESS:
            {
                return _extends({}, state, {
                    status: Status.SUCCESS,
                    articals: action.articals
                });
            }
        case _actionType.ARTICALS_FAILURE:
            {
                return {
                    status: Status.FAILURE,
                    error: Status.message
                };
            }
        default:
            {
                return state;
            }
    }
};

/***/ })

});
//# sourceMappingURL=home.chunk.js.map