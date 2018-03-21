'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SentryCdn = function SentryCdn(_ref) {
  var dsn = _ref.dsn,
      _ref$version = _ref.version,
      version = _ref$version === undefined ? '3.21.0' : _ref$version;
  return dsn ? _react2.default.createElement('script', {
    src: 'https://cdn.ravenjs.com/' + version + '/raven.min.js',
    crossOrigin: 'anonymous'
  }) : null;
};

SentryCdn.propTypes = {
  // Sentry public DSN.
  // (obtained from https://docs.sentry.io/clients/javascript/#configuring-the-client)
  //
  // If omitted, Raven.js will be excluded from the build, and Sentry will be disabled.
  dsn: _propTypes2.default.string,
  // The version of Raven.js to load.
  version: _propTypes2.default.string
};

SentryCdn.defaultProps = {
  dsn: null,
  version: '3.21.0'
};

var SentryInstall = function SentryInstall(_ref2) {
  var dsn = _ref2.dsn,
      _ref2$config = _ref2.config,
      config = _ref2$config === undefined ? {} : _ref2$config;

  return dsn ? _react2.default.createElement('script', {
    type: 'text/javascript',
    dangerouslySetInnerHTML: {
      __html: 'Raven.config(\'' + dsn + '\', ' + JSON.stringify(config) + ').install();'
    }
  }) : null;
};

SentryInstall.propTypes = {
  // Sentry public DSN.
  // (obtained from https://docs.sentry.io/clients/javascript/#configuring-the-client)
  //
  // If omitted, Raven.js will be excluded from the build, and Sentry will be disabled.
  dsn: _propTypes2.default.string,
  // The Raven.js configuration object.
  // See: https://docs.sentry.io/clients/javascript/config/.
  config: _propTypes2.default.object
};

SentryCdn.defaultProps = {
  dsn: null,
  config: {}
};

exports.onRenderBody = function (_ref3, _ref4) {
  var setHeadComponents = _ref3.setHeadComponents;
  var version = _ref4.version,
      dsn = _ref4.dsn,
      config = _ref4.config;

  if (process.env.NODE_ENV === 'production') {
    return setHeadComponents([_react2.default.createElement(SentryCdn, { dsn: dsn, version: version, key: 'gatsby-plugin-sentry-cdn' }), _react2.default.createElement(SentryInstall, {
      dsn: dsn,
      config: config,
      key: 'gatsby-plugin-sentry-install'
    })]);
  }

  return null;
};