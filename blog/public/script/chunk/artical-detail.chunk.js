webpackJsonp([6],{

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = exports.stateKey = exports.reducer = exports.ArticalDetail = undefined;

var _articalDetail = __webpack_require__(857);

var _articalDetail2 = _interopRequireDefault(_articalDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = _defineProperty({}, _articalDetail.stateKey, _articalDetail.reducer);

var initialState = _defineProperty({}, _articalDetail.stateKey, _articalDetail.initialState);

exports.ArticalDetail = _articalDetail2.default;
exports.reducer = reducer;
exports.stateKey = _articalDetail.stateKey;
exports.initialState = initialState;

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getArticalDetail = exports.fetchADetailFailure = exports.fetchADetailSuccess = exports.fetchADetailStarted = undefined;

var _actionTypes = __webpack_require__(839);

var _config = __webpack_require__(169);

var fetchADetailStarted = exports.fetchADetailStarted = function fetchADetailStarted() {
    return {
        type: _actionTypes.FETCH_STARTED
    };
};

var fetchADetailSuccess = exports.fetchADetailSuccess = function fetchADetailSuccess(infos) {
    return {
        type: _actionTypes.FETCH_SUCCESS,
        infos: infos
    };
};

var fetchADetailFailure = exports.fetchADetailFailure = function fetchADetailFailure(message) {
    return {
        type: _actionTypes.FETCH_FAILURE,
        message: message
    };
};

var getArticalDetail = exports.getArticalDetail = function getArticalDetail(id) {
    return function (dispatch) {
        var apiUrl = _config.SERVERADDRESS + '/get-artical-detail/' + id;
        dispatch(fetchADetailStarted());

        fetch(apiUrl).then(function (response) {

            if (response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(fetchADetailFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then(function (responseJson) {
                if (responseJson.status == 0) {
                    dispatch(fetchADetailFailure(responseJson.message));
                }
                dispatch(fetchADetailSuccess(responseJson.infos));
            }).catch(function (error) {
                dispatch(fetchADetailFailure(error));
            });
        }).catch(function (error) {
            dispatch(fetchADetailFailure(error));
        });
    };
};

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FETCH_STARTED = exports.FETCH_STARTED = 'ADETAIL/STARTED';
var FETCH_SUCCESS = exports.FETCH_SUCCESS = 'ADETAIL/SUCCESS';
var FETCH_FAILURE = exports.FETCH_FAILURE = 'ADETAIL/FAILURE';

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = exports.stateKey = exports.reducer = exports.actions = undefined;

var _view = __webpack_require__(858);

var _view2 = _interopRequireDefault(_view);

var _actions = __webpack_require__(838);

var actions = _interopRequireWildcard(_actions);

var _reducer = __webpack_require__(861);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.actions = actions;
exports.reducer = _reducer2.default;
exports.stateKey = _view.stateKey;
exports.initialState = _view.initialState;
exports.default = _view2.default;

/***/ }),

/***/ 858:
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

var _actions = __webpack_require__(838);

__webpack_require__(859);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stateKey = exports.stateKey = 'artical-detail';
var initialState = exports.initialState = {};

var ArticalDetail = function (_Component) {
    _inherits(ArticalDetail, _Component);

    function ArticalDetail() {
        _classCallCheck(this, ArticalDetail);

        return _possibleConstructorReturn(this, (ArticalDetail.__proto__ || Object.getPrototypeOf(ArticalDetail)).apply(this, arguments));
    }

    _createClass(ArticalDetail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                id = _props.id,
                getDetail = _props.getDetail;

            console.log('hh');
            getDetail(id);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props2 = this.props,
                id = _props2.id,
                getDetail = _props2.getDetail;


            if (id != nextProps.id) {
                console.log(123);
                getDetail(nextProps.id);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$detail = this.props.detail,
                title = _props$detail.title,
                body = _props$detail.body,
                tag = _props$detail.tag,
                category = _props$detail.category,
                created_at = _props$detail.created_at,
                updated_at = _props$detail.updated_at,
                views = _props$detail.views,
                type = _props$detail.type;

            return _react2.default.createElement(
                'div',
                { className: 'artical-detail' },
                _react2.default.createElement(
                    'h3',
                    { className: 'blog-title' },
                    type == 2 ? "[转]" : type == 3 ? "[译]" : "",
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'blog-top' },
                    _react2.default.createElement(
                        'span',
                        null,
                        'Last Modified : \xA0',
                        updated_at ? updated_at : created_at
                    ),
                    _react2.default.createElement('span', { className: 'spliter' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6D4F\u89C8 : \xA0  ',
                        views
                    ),
                    _react2.default.createElement('span', { className: 'spliter' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6807\u7B7E : \xA0  ',
                        tag
                    )
                ),
                _react2.default.createElement('div', { className: 'blog-content', dangerouslySetInnerHTML: { __html: body } }),
                _react2.default.createElement('script', { src: '' })
            );
        }
    }]);

    return ArticalDetail;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        id: state[stateKey] && state[stateKey].id || null,
        detail: state[stateKey] || {}
    };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
    return {
        getDetail: function getDetail(id) {
            dispatch((0, _actions.getArticalDetail)(id));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)(ArticalDetail);

/***/ }),

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(860);
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

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".artical-detail {\n  padding: 15px 35px;\n  margin: 15px 0;\n  font-size: 14px;\n  box-shadow: 0 0 6px #666; }\n\n.blog-title {\n  padding: 7px 0;\n  font-size: 19px;\n  font-weight: bold; }\n\n.blog-top {\n  color: #aaa;\n  margin-top: -2px;\n  margin-bottom: 11px; }\n  .blog-top > .spliter {\n    height: 11px;\n    margin: 0 8px;\n    border-color: #ccc;\n    display: inline-block;\n    vertical-align: -2px;\n    border-left: 1px solid #aaa; }\n\n.blog-content {\n  margin: 22px 0;\n  font-size: 15px;\n  word-spacing: 2px;\n  line-height: 22px;\n  overflow: auto;\n  word-wrap: break-word; }\n", ""]);

// exports


/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _status = __webpack_require__(170);

var Status = _interopRequireWildcard(_status);

var _actionTypes = __webpack_require__(839);

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
                    status: Status.SUCCESS
                }, action.infos);
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
//# sourceMappingURL=artical-detail.chunk.js.map