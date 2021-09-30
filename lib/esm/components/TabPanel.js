function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var TabPanel = /*#__PURE__*/function (_Component) {
  _inherits(TabPanel, _Component);

  var _super = _createSuper(TabPanel);

  function TabPanel(props) {
    var _this;

    _classCallCheck(this, TabPanel);

    _this = _super.call(this, props);
    _this.state = {
      renderedAtLeastOnce: !props.isHidden
    };
    return _this;
  }

  _createClass(TabPanel, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          children = _this$props.children,
          getContent = _this$props.getContent,
          classNames = _this$props.classNames,
          isHidden = _this$props.isHidden;
      return getContent !== nextProps.getContent || children !== nextProps.children || classNames !== nextProps.classNames || isHidden !== nextProps.isHidden;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classNames = _this$props2.classNames,
          id = _this$props2.id,
          tabId = _this$props2.tabId,
          children = _this$props2.children,
          getContent = _this$props2.getContent,
          isHidden = _this$props2.isHidden;
      var renderedAtLeastOnce = this.state.renderedAtLeastOnce;
      return /*#__PURE__*/React.createElement("div", {
        className: classNames,
        role: "tabpanel",
        id: id,
        "aria-labelledby": tabId,
        "aria-hidden": isHidden
      }, getContent && renderedAtLeastOnce && getContent(), !getContent && children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        renderedAtLeastOnce: state.renderedAtLeastOnce || !props.isHidden
      };
    }
  }]);

  return TabPanel;
}(Component);

export { TabPanel as default };
TabPanel.propTypes = {
  getContent: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  id: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  // generic props
  classNames: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired
};
TabPanel.defaultProps = {
  getContent: undefined,
  children: undefined,
  isHidden: false
};