"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withPolyfill = _interopRequireDefault(require("react-resize-detector/build/withPolyfill"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ShowMore = _interopRequireDefault(require("./components/ShowMore"));

var _Tab = _interopRequireDefault(require("./components/Tab"));

var _TabPanel = _interopRequireDefault(require("./components/TabPanel"));

var _InkBar = _interopRequireDefault(require("./components/InkBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tabPrefix = 'tab-';
var panelPrefix = 'panel-';

var Tabs = /*#__PURE__*/function (_Component) {
  _inherits(Tabs, _Component);

  var _super = _createSuper(Tabs);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      if (_this.tabsWrapper.current) {
        var currentIsCollapsed = _this.getIsCollapsed();

        _this.setState({
          blockWidth: _this.tabsWrapper.current.offsetWidth
        }, function () {
          var items = _this.props.items;
          var selectedTabKey = _this.state.selectedTabKey;

          var nextIsCollapsed = _this.getIsCollapsed();

          if (currentIsCollapsed && !nextIsCollapsed && selectedTabKey === -1 && items && items.length) {
            var firstTabKey = items[0].key || 0;

            _this.setState({
              selectedTabKey: firstTabKey
            });
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeTab", function (nextTabKey, evt) {
      var _this$props = _this.props,
          beforeChange = _this$props.beforeChange,
          onChange = _this$props.onChange;
      var selectedTabKey = _this.state.selectedTabKey;

      if (typeof beforeChange === 'function') {
        var beforeChangeRes = beforeChange({
          selectedTabKey: selectedTabKey,
          nextTabKey: nextTabKey
        });

        if (beforeChangeRes === false) {
          evt.preventDefault();
          return;
        }
      }

      var isCollapsed = _this.getIsCollapsed();

      if (isCollapsed && selectedTabKey === nextTabKey) {
        // hide on mobile
        _this.setState({
          selectedTabKey: -1
        });
      } else {
        // change active tab
        _this.setState({
          selectedTabKey: nextTabKey
        });
      }

      if (onChange) {
        onChange(nextTabKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocusTab", function (focusedTabKey) {
      return function () {
        return _this.setState({
          focusedTabKey: focusedTabKey
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onBlurTab", function () {
      return _this.setState({
        focusedTabKey: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var focusedTabKey = _this.state.focusedTabKey;

      if (event.keyCode === 13 && focusedTabKey !== null) {
        _this.setState({
          selectedTabKey: focusedTabKey
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setTabsDimensions", function () {
      if (!_this.tabsWrapper.current) {
        // it shouldn't happen ever. Just a paranoic check
        return;
      }

      var tabDimensions = _this.state.tabDimensions; // initial wrapper width calculation

      var blockWidth = _this.tabsWrapper.current.offsetWidth; // calculate width and offset for each tab

      var tabsTotalWidth = 0;
      var tabDimensionsNext = {};
      Object.keys(_this.tabRefs).forEach(function (key) {
        if (_this.tabRefs[key]) {
          var tabKey = key.replace(tabPrefix, '');
          var width = _this.tabRefs[key].tab.offsetWidth;

          if (width) {
            tabDimensionsNext[tabKey] = {
              width: width,
              offset: tabsTotalWidth
            };
          } else {
            tabDimensionsNext[tabKey] = tabDimensions[tabKey];
          }

          tabsTotalWidth += tabDimensionsNext[tabKey].width;
        }
      });

      _this.setState({
        tabDimensions: tabDimensionsNext,
        tabsTotalWidth: tabsTotalWidth,
        blockWidth: blockWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTabs", function () {
      var _this$props2 = _this.props,
          showMore = _this$props2.showMore,
          transform = _this$props2.transform,
          transformWidth = _this$props2.transformWidth,
          items = _this$props2.items,
          allowRemove = _this$props2.allowRemove,
          removeActiveOnly = _this$props2.removeActiveOnly,
          _onRemove = _this$props2.onRemove;
      var _this$state = _this.state,
          blockWidth = _this$state.blockWidth,
          tabsTotalWidth = _this$state.tabsTotalWidth,
          tabDimensions = _this$state.tabDimensions,
          showMoreWidth = _this$state.showMoreWidth;

      var selectedTabKey = _this.getSelectedTabKey();

      var collapsed = blockWidth && transform && blockWidth < transformWidth;
      var tabIndex = 0;
      var availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);
      return items.reduce(function (result, item, index) {
        var _item$key = item.key,
            key = _item$key === void 0 ? index : _item$key,
            title = item.title,
            content = item.content,
            getContent = item.getContent,
            disabled = item.disabled,
            tabClassName = item.tabClassName,
            tabSelectedClassName = item.tabSelectedClassName,
            tabDisabledClassName = item.tabDisabledClassName,
            tabCollapsedClassName = item.tabCollapsedClassName,
            tabFirstClassName = item.tabFirstClassName,
            panelClassName = item.panelClassName;
        var selected = selectedTabKey === key;
        var payload = {
          tabIndex: tabIndex,
          collapsed: collapsed,
          selected: selected,
          disabled: disabled,
          key: key
        };

        var tabPayload = _objectSpread(_objectSpread({}, payload), {}, {
          title: title,
          onRemove: function onRemove(evt) {
            if (typeof _onRemove === 'function') {
              _onRemove(key, evt);
            }
          },
          allowRemove: allowRemove && (!removeActiveOnly || selected),
          className: tabClassName,
          classNameSelected: tabSelectedClassName,
          classNameDisabled: tabDisabledClassName,
          classNameCollapsed: tabCollapsedClassName,
          classNameFirst: tabFirstClassName
        });

        var panelPayload = _objectSpread(_objectSpread({}, payload), {}, {
          content: content,
          getContent: getContent,
          className: panelClassName
        });

        var tabWidth = tabDimensions[key] ? tabDimensions[key].width : 0;
        tabIndex += 1;
        /* eslint-disable no-param-reassign */

        if ( // don't need to `Show more` button
        !showMore || // initial call
        !blockWidth || // collapsed mode
        collapsed || // all tabs are fit into the block
        blockWidth > tabsTotalWidth || // current tab fit into the block
        availableWidth - tabWidth > 0) {
          result.tabsVisible.push(tabPayload);
        } else {
          result.tabsHidden.push(tabPayload);
          if (selected) result.isSelectedTabHidden = true;
        }
        /* eslint-enable no-param-reassign */


        result.panels[key] = panelPayload; // eslint-disable-line no-param-reassign

        availableWidth -= tabWidth;
        return result;
      }, {
        tabsVisible: [],
        tabsHidden: [],
        panels: {},
        isSelectedTabHidden: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTabProps", function (_ref) {
      var title = _ref.title,
          key = _ref.key,
          selected = _ref.selected,
          collapsed = _ref.collapsed,
          tabIndex = _ref.tabIndex,
          disabled = _ref.disabled,
          className = _ref.className,
          classNameSelected = _ref.classNameSelected,
          classNameDisabled = _ref.classNameDisabled,
          classNameCollapsed = _ref.classNameCollapsed,
          classNameFirst = _ref.classNameFirst,
          onRemove = _ref.onRemove,
          allowRemove = _ref.allowRemove;
      return {
        selected: selected,
        allowRemove: allowRemove,
        children: title,
        key: tabPrefix + key,
        id: tabPrefix + key,
        ref: function ref(e) {
          return _this.tabRefs[tabPrefix + key] = e;
        },
        originalKey: key,
        onClick: _this.onChangeTab,
        onFocus: _this.onFocusTab,
        onBlur: _this.onBlurTab,
        onRemove: onRemove,
        panelId: panelPrefix + key,
        classNames: _this.getClassNamesFor('tab', {
          selected: selected,
          collapsed: collapsed,
          tabIndex: tabIndex,
          disabled: disabled,
          className: className,
          classNameSelected: classNameSelected,
          classNameDisabled: classNameDisabled,
          classNameCollapsed: classNameCollapsed,
          classNameFirst: classNameFirst
        })
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getPanelProps", function (_ref2, isHidden) {
      var key = _ref2.key,
          content = _ref2.content,
          getContent = _ref2.getContent,
          className = _ref2.className;
      return {
        getContent: getContent,
        children: content,
        key: panelPrefix + key,
        id: panelPrefix + key,
        tabId: tabPrefix + key,
        classNames: _this.getClassNamesFor('panel', {
          className: className,
          isHidden: isHidden
        }),
        isHidden: isHidden
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getShowMoreProps", function (isShown, isSelectedTabHidden, showMoreLabel) {
      return {
        onShowMoreChanged: _this.showMoreChanged,
        isShown: isShown,
        label: showMoreLabel,
        hasChildSelected: isSelectedTabHidden
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getClassNamesFor", function (type, _ref3) {
      var _cs;

      var selected = _ref3.selected,
          collapsed = _ref3.collapsed,
          tabIndex = _ref3.tabIndex,
          disabled = _ref3.disabled,
          _ref3$className = _ref3.className,
          className = _ref3$className === void 0 ? '' : _ref3$className,
          _ref3$classNameSelect = _ref3.classNameSelected,
          classNameSelected = _ref3$classNameSelect === void 0 ? '' : _ref3$classNameSelect,
          _ref3$classNameDisabl = _ref3.classNameDisabled,
          classNameDisabled = _ref3$classNameDisabl === void 0 ? '' : _ref3$classNameDisabl,
          _ref3$classNameCollap = _ref3.classNameCollapsed,
          classNameCollapsed = _ref3$classNameCollap === void 0 ? '' : _ref3$classNameCollap,
          _ref3$classNameFirst = _ref3.classNameFirst,
          classNameFirst = _ref3$classNameFirst === void 0 ? '' : _ref3$classNameFirst,
          isHidden = _ref3.isHidden;
      var _this$props3 = _this.props,
          tabClass = _this$props3.tabClass,
          panelClass = _this$props3.panelClass;

      switch (type) {
        case 'tab':
          return (0, _classnames["default"])(className.length ? className : 'RRT__tab', tabClass, (_cs = {}, _defineProperty(_cs, classNameFirst.length ? classNameFirst : 'RRT__tab--first', !tabIndex), _defineProperty(_cs, classNameSelected.length ? classNameSelected : 'RRT__tab--selected', selected), _defineProperty(_cs, classNameDisabled.length ? classNameDisabled : 'RRT__tab--disabled', disabled), _defineProperty(_cs, classNameCollapsed.length ? classNameCollapsed : 'RRT__tab--collapsed', collapsed), _cs));

        case 'panel':
          return (0, _classnames["default"])(className.length ? className : 'RRT__panel', panelClass, {
            'RRT__panel--hidden': isHidden
          });

        default:
          return '';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedTabKey", function () {
      var items = _this.props.items;
      var selectedTabKey = _this.state.selectedTabKey;

      if (typeof selectedTabKey === 'undefined') {
        if (!items[0]) {
          return undefined;
        }

        return items[0].key || 0;
      }

      return selectedTabKey;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsCollapsed", function () {
      var _this$props4 = _this.props,
          transform = _this$props4.transform,
          transformWidth = _this$props4.transformWidth;
      var blockWidth = _this.state.blockWidth;
      return blockWidth && transform && blockWidth < transformWidth;
    });

    _defineProperty(_assertThisInitialized(_this), "showMoreChanged", function (element) {
      if (!element) {
        return;
      }

      var showMoreWidth = _this.state.showMoreWidth;
      var offsetWidth = element.offsetWidth;

      if (showMoreWidth === offsetWidth) {
        return;
      }

      _this.setState({
        showMoreWidth: offsetWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getExpandedTabs", function (panels, selectedTabKey, isCollapsed) {
      var unmountOnExit = _this.props.unmountOnExit;

      if (isCollapsed) {
        return undefined;
      }

      if (!unmountOnExit) {
        // render all tabs if unmountOnExit === false (inactive are hidden)
        return Object.keys(panels).map(function (key) {
          return /*#__PURE__*/_react["default"].createElement(_TabPanel["default"], _this.getPanelProps(panels[key], "".concat(selectedTabKey) !== "".concat(key)));
        });
      }

      if (panels[selectedTabKey]) {
        // render only active tab if unmountOnExit === true
        return /*#__PURE__*/_react["default"].createElement(_TabPanel["default"], _this.getPanelProps(panels[selectedTabKey]));
      }

      return undefined;
    });

    _this.tabRefs = {};
    _this.tabsWrapper = /*#__PURE__*/(0, _react.createRef)();
    _this.selectedTabKeyProp = props.selectedTabKey;
    _this.state = {
      tabDimensions: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null
    };
    _this.onResizeThrottled = (0, _lodash["default"])(_this.onResize, props.resizeThrottle, {
      trailing: true
    });
    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTabsDimensions();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$state2 = this.state,
          selectedTabKey = _this$state2.selectedTabKey,
          tabsTotalWidth = _this$state2.tabsTotalWidth,
          blockWidth = _this$state2.blockWidth,
          showMoreWidth = _this$state2.showMoreWidth;
      var _this$props5 = this.props,
          items = _this$props5.items,
          transform = _this$props5.transform,
          showMore = _this$props5.showMore,
          showInkBar = _this$props5.showInkBar,
          allowRemove = _this$props5.allowRemove,
          removeActiveOnly = _this$props5.removeActiveOnly,
          uid = _this$props5.uid;
      return items !== nextProps.items || nextProps.uid !== uid || nextProps.transform !== transform || nextProps.showMore !== showMore || nextProps.showInkBar !== showInkBar || nextProps.allowRemove !== allowRemove || nextProps.removeActiveOnly !== removeActiveOnly || nextState.tabsTotalWidth !== tabsTotalWidth || nextState.blockWidth !== blockWidth || nextState.showMoreWidth !== showMoreWidth || nextProps.selectedTabKey !== this.selectedTabKeyProp || nextState.selectedTabKey !== selectedTabKey;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
          uid = _this$props6.uid,
          items = _this$props6.items,
          selectedTabKey = _this$props6.selectedTabKey;

      if (this.selectedTabKeyProp !== selectedTabKey) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          selectedTabKey: selectedTabKey
        });
      }

      if (uid !== prevProps.uid || items.length !== prevProps.items.length || items.every(function (item, i) {
        return item.title !== prevProps.items[i].title;
      })) {
        this.setTabsDimensions();
      }

      this.selectedTabKeyProp = selectedTabKey;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props7 = this.props,
          showInkBar = _this$props7.showInkBar,
          tabsClass = _this$props7.tabsClass,
          containerClass = _this$props7.containerClass,
          tabsWrapperClass = _this$props7.tabsWrapperClass,
          accordionClass = _this$props7.accordionClass,
          showMore = _this$props7.showMore,
          transform = _this$props7.transform,
          showMoreLabel = _this$props7.showMoreLabel,
          unmountOnExit = _this$props7.unmountOnExit;
      var tabDimensions = this.state.tabDimensions;

      var _this$getTabs = this.getTabs(),
          tabsVisible = _this$getTabs.tabsVisible,
          tabsHidden = _this$getTabs.tabsHidden,
          panels = _this$getTabs.panels,
          isSelectedTabHidden = _this$getTabs.isSelectedTabHidden;

      var isCollapsed = this.getIsCollapsed();
      var selectedTabKey = this.getSelectedTabKey();
      var selectedTabDimensions = tabDimensions[selectedTabKey] || {};
      var containerClasses = containerClass !== undefined ? containerClass : 'RRT__container';
      var tabsClasses = (0, _classnames["default"])(tabsClass !== undefined ? tabsClass : 'RRT__tabs', tabsWrapperClass, _defineProperty({}, accordionClass !== undefined ? accordionClass : 'RRT__accordion', isCollapsed));
      var handleResize = showMore || transform;
      return /*#__PURE__*/_react["default"].createElement(_withPolyfill["default"], {
        handleWidth: handleResize,
        handleHeight: false,
        targetRef: this.tabsWrapper,
        onResize: this.onResizeThrottled
      }, function () {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: containerClasses,
          ref: _this2.tabsWrapper,
          onKeyDown: _this2.onKeyDown
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: tabsClasses
        }, tabsVisible.reduce(function (result, tab) {
          result.push( /*#__PURE__*/_react["default"].createElement(_Tab["default"], _this2.getTabProps(tab)));

          if (isCollapsed && (!unmountOnExit || selectedTabKey === tab.key)) {
            result.push( /*#__PURE__*/_react["default"].createElement(_TabPanel["default"], _this2.getPanelProps(panels[tab.key], selectedTabKey !== tab.key)));
          }

          return result;
        }, []), !isCollapsed && /*#__PURE__*/_react["default"].createElement(_ShowMore["default"], _this2.getShowMoreProps(showMore, isSelectedTabHidden, showMoreLabel), tabsHidden.map(function (tab) {
          return /*#__PURE__*/_react["default"].createElement(_Tab["default"], _this2.getTabProps(tab));
        }))), showInkBar && !isCollapsed && !isSelectedTabHidden && /*#__PURE__*/_react["default"].createElement(_InkBar["default"], {
          left: selectedTabDimensions.offset || 0,
          width: selectedTabDimensions.width || 0
        }), _this2.getExpandedTabs(panels, selectedTabKey, isCollapsed));
      });
    }
  }]);

  return Tabs;
}(_react.Component);

exports["default"] = Tabs;
Tabs.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  // list of tabs
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]),

  /* eslint-enable react/no-unused-prop-types */
  // selected tab key
  selectedTabKey: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  // show 'X' and remove tab
  allowRemove: _propTypes["default"].bool,
  // show 'X' closing element only for active tab
  removeActiveOnly: _propTypes["default"].bool,
  // move tabs to the special `Show more` tab if they don't fit into a screen
  showMore: _propTypes["default"].bool,
  // materialUI-like rail under the selected tab
  showInkBar: _propTypes["default"].bool,
  // transform to the accordion on small screens
  transform: _propTypes["default"].bool,
  // tabs will be transformed to accodrion for screen sizes below `transformWidth`px
  transformWidth: _propTypes["default"].number,
  // beforeChange callback: return false to prevent tab change
  beforeChange: _propTypes["default"].func,
  // onChange active tab callback
  onChange: _propTypes["default"].func,
  // onRemove callback
  onRemove: _propTypes["default"].func,
  // frequency of onResize recalculation fires
  resizeThrottle: _propTypes["default"].number,
  // unmounts the tab when it gets inactive (unselected)
  unmountOnExit: _propTypes["default"].bool,
  // classnames
  containerClass: _propTypes["default"].string,
  tabsWrapperClass: _propTypes["default"].string,
  tabClass: _propTypes["default"].string,
  panelClass: _propTypes["default"].string,
  // optional external id. Force rerender when it changes
  // eslint-disable-next-line react/forbid-prop-types
  uid: _propTypes["default"].any,
  // labels
  showMoreLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
};
Tabs.defaultProps = {
  items: [],
  uid: undefined,
  selectedTabKey: undefined,
  showMore: true,
  showInkBar: false,
  allowRemove: false,
  removeActiveOnly: false,
  transform: true,
  transformWidth: 800,
  resizeThrottle: 100,
  containerClass: undefined,
  tabsWrapperClass: undefined,
  tabClass: undefined,
  panelClass: undefined,
  showMoreLabel: '...',
  unmountOnExit: true,
  beforeChange: undefined,
  onChange: function onChange() {
    return null;
  },
  onRemove: function onRemove() {
    return null;
  }
};