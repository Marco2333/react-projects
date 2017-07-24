webpackJsonp([8],{

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

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = exports.stateKey = exports.reducer = exports.Tag = undefined;

var _tag = __webpack_require__(879);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = _defineProperty({}, _tag.stateKey, _tag.reducer);

var initialState = _defineProperty({}, _tag.stateKey, _tag.initialState);

exports.Tag = _tag2.default;
exports.reducer = reducer;
exports.stateKey = _tag.stateKey;
exports.initialState = initialState;

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTag = exports.tagFailure = exports.tagSuccess = exports.tagStarted = undefined;

var _actionTypes = __webpack_require__(878);

var _config = __webpack_require__(169);

var tagStarted = exports.tagStarted = function tagStarted() {
    return {
        type: _actionTypes.FETCH_STARTED
    };
};

var tagSuccess = exports.tagSuccess = function tagSuccess(articals) {
    return {
        type: _actionTypes.FETCH_SUCCESS,
        articals: articals
    };
};

var tagFailure = exports.tagFailure = function tagFailure(message) {
    return {
        type: _actionTypes.FETCH_FAILURE,
        message: message
    };
};

var getTag = exports.getTag = function getTag(tag) {
    return function (dispatch) {
        var apiUrl = _config.SERVERADDRESS + '/get-tag?tag=' + tag;
        dispatch(tagStarted());

        fetch(apiUrl).then(function (response) {

            if (response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(tagFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then(function (responseJson) {
                if (responseJson.status == 0) {
                    dispatch(tagFailure(responseJson.message));
                }
                dispatch(tagSuccess(responseJson.articals));
            }).catch(function (error) {
                console.log(error);
                dispatch(tagFailure(error));
            });
        }).catch(function (error) {
            console.log(error);
            dispatch(tagFailure(error));
        });
    };
};

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FETCH_STARTED = exports.FETCH_STARTED = 'TAG/STARTED';
var FETCH_SUCCESS = exports.FETCH_SUCCESS = 'TAG/SUCCESS';
var FETCH_FAILURE = exports.FETCH_FAILURE = 'TAG/FAILURE';

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = exports.stateKey = exports.reducer = exports.actions = undefined;

var _view = __webpack_require__(880);

var _view2 = _interopRequireDefault(_view);

var _actions = __webpack_require__(877);

var actions = _interopRequireWildcard(_actions);

var _reducer = __webpack_require__(881);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.actions = actions;
exports.reducer = _reducer2.default;
exports.stateKey = _view.stateKey;
exports.initialState = _view.initialState;
exports.default = _view2.default;

/***/ }),

/***/ 880:
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

var _actions = __webpack_require__(877);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stateKey = exports.stateKey = "tag";
var initialState = exports.initialState = {};

var Tag = function (_Component) {
    _inherits(Tag, _Component);

    function Tag() {
        _classCallCheck(this, Tag);

        return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
    }

    _createClass(Tag, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var tag = this.props.tag;

            if (tag !== '') {
                this.props.getTag(tag);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var tag = this.props.tag;


            if (tag !== nextProps.tag) {
                this.props.getTag(nextProps.tag);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var articalList = this.props.articalList;


            return _react2.default.createElement(_articalList2.default, { articals: articalList });
        }
    }]);

    return Tag;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        tag: state[stateKey] && state[stateKey].tag || '',
        articalList: state[stateKey] && state[stateKey].articals || null
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        getTag: function getTag(tag) {
            dispatch((0, _actions.getTag)(tag));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Tag);

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _status = __webpack_require__(170);

var Status = _interopRequireWildcard(_status);

var _actionTypes = __webpack_require__(878);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { status: Status.LOADING };
    var action = arguments[1];

    switch (action.type) {
        case _actionTypes.FETCH_STARTED:
            {
                return _extends({}, state, {
                    status: Status.LOADING
                });
            }
        case _actionTypes.FETCH_SUCCESS:
            {
                return _extends({}, state, {
                    status: Status.SUCCESS,
                    articals: action.articals
                });
            }
        case _actionTypes.FETCH_FAILURE:
            {
                return _extends({}, state, {
                    status: Status.FAILURE,
                    error: Status.message
                });
            }
        default:
            {
                return state;
            }
    }
};

/***/ })

});
//# sourceMappingURL=tag.chunk.js.map