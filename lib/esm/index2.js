function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import React, { Component, createRef } from 'react';
import ResizeDetector from 'react-resize-detector/build/withPolyfill';
import cs from 'classnames';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import ShowMore from "./components/ShowMore";
import Tab from "./components/Tab";
import TabPanel from "./components/TabPanel";
import InkBar from "./components/InkBar";
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
            tabSelecteClassName = item.tabSelecteClassName,
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
          classNameSelected: tabSelecteClassName
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
          classNameSelected: classNameSelected
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
          isHidden = _ref3.isHidden;
      var _this$props3 = _this.props,
          tabClass = _this$props3.tabClass,
          panelClass = _this$props3.panelClass;

      switch (type) {
        case 'tab':
          return cs('RRT__tab', className, tabClass, (_cs = {
            'RRT__tab--first': !tabIndex
          }, _defineProperty(_cs, classNameSelected.length ? classNameSelected : 'RRT__tab--selected', selected), _defineProperty(_cs, 'RRT__tab--disabled', disabled), _defineProperty(_cs, 'RRT__tab--collapsed', collapsed), _cs));

        case 'panel':
          return cs('RRT__panel', className, panelClass, {
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
          return /*#__PURE__*/React.createElement(TabPanel, _this.getPanelProps(panels[key], "".concat(selectedTabKey) !== "".concat(key)));
        });
      }

      if (panels[selectedTabKey]) {
        // render only active tab if unmountOnExit === true
        return /*#__PURE__*/React.createElement(TabPanel, _this.getPanelProps(panels[selectedTabKey]));
      }

      return undefined;
    });

    _this.tabRefs = {};
    _this.tabsWrapper = /*#__PURE__*/createRef();
    _this.selectedTabKeyProp = props.selectedTabKey;
    _this.state = {
      tabDimensions: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null
    };
    _this.onResizeThrottled = throttle(_this.onResize, props.resizeThrottle, {
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
          containerClass = _this$props7.containerClass,
          tabsWrapperClass = _this$props7.tabsWrapperClass,
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
      var tabsClasses = cs('RRT__tabs', tabsWrapperClass, {
        RRT__accordion: isCollapsed
      });
      var handleResize = showMore || transform;
      return /*#__PURE__*/React.createElement(ResizeDetector, {
        handleWidth: handleResize,
        handleHeight: false,
        targetRef: this.tabsWrapper,
        onResize: this.onResizeThrottled
      }, function () {
        return /*#__PURE__*/React.createElement("div", {
          className: containerClasses,
          ref: _this2.tabsWrapper,
          onKeyDown: _this2.onKeyDown
        }, /*#__PURE__*/React.createElement("div", {
          className: tabsClasses
        }, tabsVisible.reduce(function (result, tab) {
          result.push( /*#__PURE__*/React.createElement(Tab, _this2.getTabProps(tab)));

          if (isCollapsed && (!unmountOnExit || selectedTabKey === tab.key)) {
            result.push( /*#__PURE__*/React.createElement(TabPanel, _this2.getPanelProps(panels[tab.key], selectedTabKey !== tab.key)));
          }

          return result;
        }, []), !isCollapsed && /*#__PURE__*/React.createElement(ShowMore, _this2.getShowMoreProps(showMore, isSelectedTabHidden, showMoreLabel), tabsHidden.map(function (tab) {
          return /*#__PURE__*/React.createElement(Tab, _this2.getTabProps(tab));
        }))), showInkBar && !isCollapsed && !isSelectedTabHidden && /*#__PURE__*/React.createElement(InkBar, {
          left: selectedTabDimensions.offset || 0,
          width: selectedTabDimensions.width || 0
        }), _this2.getExpandedTabs(panels, selectedTabKey, isCollapsed));
      });
    }
  }]);

  return Tabs;
}(Component);

export { Tabs as default };
Tabs.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  // list of tabs
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  /* eslint-enable react/no-unused-prop-types */
  // selected tab key
  selectedTabKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // show 'X' and remove tab
  allowRemove: PropTypes.bool,
  // show 'X' closing element only for active tab
  removeActiveOnly: PropTypes.bool,
  // move tabs to the special `Show more` tab if they don't fit into a screen
  showMore: PropTypes.bool,
  // materialUI-like rail under the selected tab
  showInkBar: PropTypes.bool,
  // transform to the accordion on small screens
  transform: PropTypes.bool,
  // tabs will be transformed to accodrion for screen sizes below `transformWidth`px
  transformWidth: PropTypes.number,
  // beforeChange callback: return false to prevent tab change
  beforeChange: PropTypes.func,
  // onChange active tab callback
  onChange: PropTypes.func,
  // onRemove callback
  onRemove: PropTypes.func,
  // frequency of onResize recalculation fires
  resizeThrottle: PropTypes.number,
  // unmounts the tab when it gets inactive (unselected)
  unmountOnExit: PropTypes.bool,
  // classnames
  containerClass: PropTypes.string,
  tabsWrapperClass: PropTypes.string,
  tabClass: PropTypes.string,
  tabClassSelected: PropTypes.string,
  panelClass: PropTypes.string,
  // optional external id. Force rerender when it changes
  // eslint-disable-next-line react/forbid-prop-types
  uid: PropTypes.any,
  // labels
  showMoreLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
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
  tabClassSelected: undefined,
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