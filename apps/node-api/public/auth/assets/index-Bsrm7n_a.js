(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) r(d);
  new MutationObserver((d) => {
    for (const y of d)
      if (y.type === 'childList')
        for (const z of y.addedNodes)
          z.tagName === 'LINK' && z.rel === 'modulepreload' && r(z);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(d) {
    const y = {};
    return (
      d.integrity && (y.integrity = d.integrity),
      d.referrerPolicy && (y.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === 'use-credentials'
        ? (y.credentials = 'include')
        : d.crossOrigin === 'anonymous'
        ? (y.credentials = 'omit')
        : (y.credentials = 'same-origin'),
      y
    );
  }
  function r(d) {
    if (d.ep) return;
    d.ep = !0;
    const y = o(d);
    fetch(d.href, y);
  }
})();
var xf = { exports: {} },
  Du = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Md;
function _0() {
  if (Md) return Du;
  Md = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function o(r, d, y) {
    var z = null;
    if (
      (y !== void 0 && (z = '' + y),
      d.key !== void 0 && (z = '' + d.key),
      'key' in d)
    ) {
      y = {};
      for (var N in d) N !== 'key' && (y[N] = d[N]);
    } else y = d;
    return (
      (d = y.ref),
      { $$typeof: c, type: r, key: z, ref: d !== void 0 ? d : null, props: y }
    );
  }
  return (Du.Fragment = s), (Du.jsx = o), (Du.jsxs = o), Du;
}
var _d;
function j0() {
  return _d || ((_d = 1), (xf.exports = _0())), xf.exports;
}
var b = j0(),
  Ef = { exports: {} },
  te = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jd;
function U0() {
  if (jd) return te;
  jd = 1;
  var c = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    y = Symbol.for('react.consumer'),
    z = Symbol.for('react.context'),
    N = Symbol.for('react.forward_ref'),
    S = Symbol.for('react.suspense'),
    h = Symbol.for('react.memo'),
    A = Symbol.for('react.lazy'),
    w = Symbol.iterator;
  function U(v) {
    return v === null || typeof v != 'object'
      ? null
      : ((v = (w && v[w]) || v['@@iterator']),
        typeof v == 'function' ? v : null);
  }
  var q = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    H = Object.assign,
    V = {};
  function G(v, C, Q) {
    (this.props = v),
      (this.context = C),
      (this.refs = V),
      (this.updater = Q || q);
  }
  (G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (v, C) {
      if (typeof v != 'object' && typeof v != 'function' && v != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, v, C, 'setState');
    }),
    (G.prototype.forceUpdate = function (v) {
      this.updater.enqueueForceUpdate(this, v, 'forceUpdate');
    });
  function B() {}
  B.prototype = G.prototype;
  function I(v, C, Q) {
    (this.props = v),
      (this.context = C),
      (this.refs = V),
      (this.updater = Q || q);
  }
  var X = (I.prototype = new B());
  (X.constructor = I), H(X, G.prototype), (X.isPureReactComponent = !0);
  var ie = Array.isArray,
    $ = { H: null, A: null, T: null, S: null, V: null },
    ve = Object.prototype.hasOwnProperty;
  function fe(v, C, Q, Y, J, re) {
    return (
      (Q = re.ref),
      { $$typeof: c, type: v, key: C, ref: Q !== void 0 ? Q : null, props: re }
    );
  }
  function oe(v, C) {
    return fe(v.type, C, void 0, void 0, void 0, v.props);
  }
  function he(v) {
    return typeof v == 'object' && v !== null && v.$$typeof === c;
  }
  function Ye(v) {
    var C = { '=': '=0', ':': '=2' };
    return (
      '$' +
      v.replace(/[=:]/g, function (Q) {
        return C[Q];
      })
    );
  }
  var $e = /\/+/g;
  function Qe(v, C) {
    return typeof v == 'object' && v !== null && v.key != null
      ? Ye('' + v.key)
      : C.toString(36);
  }
  function El() {}
  function Tl(v) {
    switch (v.status) {
      case 'fulfilled':
        return v.value;
      case 'rejected':
        throw v.reason;
      default:
        switch (
          (typeof v.status == 'string'
            ? v.then(El, El)
            : ((v.status = 'pending'),
              v.then(
                function (C) {
                  v.status === 'pending' &&
                    ((v.status = 'fulfilled'), (v.value = C));
                },
                function (C) {
                  v.status === 'pending' &&
                    ((v.status = 'rejected'), (v.reason = C));
                }
              )),
          v.status)
        ) {
          case 'fulfilled':
            return v.value;
          case 'rejected':
            throw v.reason;
        }
    }
    throw v;
  }
  function Ze(v, C, Q, Y, J) {
    var re = typeof v;
    (re === 'undefined' || re === 'boolean') && (v = null);
    var ee = !1;
    if (v === null) ee = !0;
    else
      switch (re) {
        case 'bigint':
        case 'string':
        case 'number':
          ee = !0;
          break;
        case 'object':
          switch (v.$$typeof) {
            case c:
            case s:
              ee = !0;
              break;
            case A:
              return (ee = v._init), Ze(ee(v._payload), C, Q, Y, J);
          }
      }
    if (ee)
      return (
        (J = J(v)),
        (ee = Y === '' ? '.' + Qe(v, 0) : Y),
        ie(J)
          ? ((Q = ''),
            ee != null && (Q = ee.replace($e, '$&/') + '/'),
            Ze(J, C, Q, '', function (Wt) {
              return Wt;
            }))
          : J != null &&
            (he(J) &&
              (J = oe(
                J,
                Q +
                  (J.key == null || (v && v.key === J.key)
                    ? ''
                    : ('' + J.key).replace($e, '$&/') + '/') +
                  ee
              )),
            C.push(J)),
        1
      );
    ee = 0;
    var tt = Y === '' ? '.' : Y + ':';
    if (ie(v))
      for (var Te = 0; Te < v.length; Te++)
        (Y = v[Te]), (re = tt + Qe(Y, Te)), (ee += Ze(Y, C, Q, re, J));
    else if (((Te = U(v)), typeof Te == 'function'))
      for (v = Te.call(v), Te = 0; !(Y = v.next()).done; )
        (Y = Y.value), (re = tt + Qe(Y, Te++)), (ee += Ze(Y, C, Q, re, J));
    else if (re === 'object') {
      if (typeof v.then == 'function') return Ze(Tl(v), C, Q, Y, J);
      throw (
        ((C = String(v)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (C === '[object Object]'
              ? 'object with keys {' + Object.keys(v).join(', ') + '}'
              : C) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      );
    }
    return ee;
  }
  function M(v, C, Q) {
    if (v == null) return v;
    var Y = [],
      J = 0;
    return (
      Ze(v, Y, '', '', function (re) {
        return C.call(Q, re, J++);
      }),
      Y
    );
  }
  function L(v) {
    if (v._status === -1) {
      var C = v._result;
      (C = C()),
        C.then(
          function (Q) {
            (v._status === 0 || v._status === -1) &&
              ((v._status = 1), (v._result = Q));
          },
          function (Q) {
            (v._status === 0 || v._status === -1) &&
              ((v._status = 2), (v._result = Q));
          }
        ),
        v._status === -1 && ((v._status = 0), (v._result = C));
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var F =
    typeof reportError == 'function'
      ? reportError
      : function (v) {
          if (
            typeof window == 'object' &&
            typeof window.ErrorEvent == 'function'
          ) {
            var C = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof v == 'object' &&
                v !== null &&
                typeof v.message == 'string'
                  ? String(v.message)
                  : String(v),
              error: v,
            });
            if (!window.dispatchEvent(C)) return;
          } else if (
            typeof process == 'object' &&
            typeof process.emit == 'function'
          ) {
            process.emit('uncaughtException', v);
            return;
          }
          console.error(v);
        };
  function Se() {}
  return (
    (te.Children = {
      map: M,
      forEach: function (v, C, Q) {
        M(
          v,
          function () {
            C.apply(this, arguments);
          },
          Q
        );
      },
      count: function (v) {
        var C = 0;
        return (
          M(v, function () {
            C++;
          }),
          C
        );
      },
      toArray: function (v) {
        return (
          M(v, function (C) {
            return C;
          }) || []
        );
      },
      only: function (v) {
        if (!he(v))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          );
        return v;
      },
    }),
    (te.Component = G),
    (te.Fragment = o),
    (te.Profiler = d),
    (te.PureComponent = I),
    (te.StrictMode = r),
    (te.Suspense = S),
    (te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (te.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (v) {
        return $.H.useMemoCache(v);
      },
    }),
    (te.cache = function (v) {
      return function () {
        return v.apply(null, arguments);
      };
    }),
    (te.cloneElement = function (v, C, Q) {
      if (v == null)
        throw Error(
          'The argument must be a React element, but you passed ' + v + '.'
        );
      var Y = H({}, v.props),
        J = v.key,
        re = void 0;
      if (C != null)
        for (ee in (C.ref !== void 0 && (re = void 0),
        C.key !== void 0 && (J = '' + C.key),
        C))
          !ve.call(C, ee) ||
            ee === 'key' ||
            ee === '__self' ||
            ee === '__source' ||
            (ee === 'ref' && C.ref === void 0) ||
            (Y[ee] = C[ee]);
      var ee = arguments.length - 2;
      if (ee === 1) Y.children = Q;
      else if (1 < ee) {
        for (var tt = Array(ee), Te = 0; Te < ee; Te++)
          tt[Te] = arguments[Te + 2];
        Y.children = tt;
      }
      return fe(v.type, J, void 0, void 0, re, Y);
    }),
    (te.createContext = function (v) {
      return (
        (v = {
          $$typeof: z,
          _currentValue: v,
          _currentValue2: v,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (v.Provider = v),
        (v.Consumer = { $$typeof: y, _context: v }),
        v
      );
    }),
    (te.createElement = function (v, C, Q) {
      var Y,
        J = {},
        re = null;
      if (C != null)
        for (Y in (C.key !== void 0 && (re = '' + C.key), C))
          ve.call(C, Y) &&
            Y !== 'key' &&
            Y !== '__self' &&
            Y !== '__source' &&
            (J[Y] = C[Y]);
      var ee = arguments.length - 2;
      if (ee === 1) J.children = Q;
      else if (1 < ee) {
        for (var tt = Array(ee), Te = 0; Te < ee; Te++)
          tt[Te] = arguments[Te + 2];
        J.children = tt;
      }
      if (v && v.defaultProps)
        for (Y in ((ee = v.defaultProps), ee))
          J[Y] === void 0 && (J[Y] = ee[Y]);
      return fe(v, re, void 0, void 0, null, J);
    }),
    (te.createRef = function () {
      return { current: null };
    }),
    (te.forwardRef = function (v) {
      return { $$typeof: N, render: v };
    }),
    (te.isValidElement = he),
    (te.lazy = function (v) {
      return { $$typeof: A, _payload: { _status: -1, _result: v }, _init: L };
    }),
    (te.memo = function (v, C) {
      return { $$typeof: h, type: v, compare: C === void 0 ? null : C };
    }),
    (te.startTransition = function (v) {
      var C = $.T,
        Q = {};
      $.T = Q;
      try {
        var Y = v(),
          J = $.S;
        J !== null && J(Q, Y),
          typeof Y == 'object' &&
            Y !== null &&
            typeof Y.then == 'function' &&
            Y.then(Se, F);
      } catch (re) {
        F(re);
      } finally {
        $.T = C;
      }
    }),
    (te.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (te.use = function (v) {
      return $.H.use(v);
    }),
    (te.useActionState = function (v, C, Q) {
      return $.H.useActionState(v, C, Q);
    }),
    (te.useCallback = function (v, C) {
      return $.H.useCallback(v, C);
    }),
    (te.useContext = function (v) {
      return $.H.useContext(v);
    }),
    (te.useDebugValue = function () {}),
    (te.useDeferredValue = function (v, C) {
      return $.H.useDeferredValue(v, C);
    }),
    (te.useEffect = function (v, C, Q) {
      var Y = $.H;
      if (typeof Q == 'function')
        throw Error(
          'useEffect CRUD overload is not enabled in this build of React.'
        );
      return Y.useEffect(v, C);
    }),
    (te.useId = function () {
      return $.H.useId();
    }),
    (te.useImperativeHandle = function (v, C, Q) {
      return $.H.useImperativeHandle(v, C, Q);
    }),
    (te.useInsertionEffect = function (v, C) {
      return $.H.useInsertionEffect(v, C);
    }),
    (te.useLayoutEffect = function (v, C) {
      return $.H.useLayoutEffect(v, C);
    }),
    (te.useMemo = function (v, C) {
      return $.H.useMemo(v, C);
    }),
    (te.useOptimistic = function (v, C) {
      return $.H.useOptimistic(v, C);
    }),
    (te.useReducer = function (v, C, Q) {
      return $.H.useReducer(v, C, Q);
    }),
    (te.useRef = function (v) {
      return $.H.useRef(v);
    }),
    (te.useState = function (v) {
      return $.H.useState(v);
    }),
    (te.useSyncExternalStore = function (v, C, Q) {
      return $.H.useSyncExternalStore(v, C, Q);
    }),
    (te.useTransition = function () {
      return $.H.useTransition();
    }),
    (te.version = '19.1.0'),
    te
  );
}
var Ud;
function _f() {
  return Ud || ((Ud = 1), (Ef.exports = U0())), Ef.exports;
}
var D = _f(),
  Tf = { exports: {} },
  Ou = {},
  Af = { exports: {} },
  Nf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cd;
function C0() {
  return (
    Cd ||
      ((Cd = 1),
      (function (c) {
        function s(M, L) {
          var F = M.length;
          M.push(L);
          e: for (; 0 < F; ) {
            var Se = (F - 1) >>> 1,
              v = M[Se];
            if (0 < d(v, L)) (M[Se] = L), (M[F] = v), (F = Se);
            else break e;
          }
        }
        function o(M) {
          return M.length === 0 ? null : M[0];
        }
        function r(M) {
          if (M.length === 0) return null;
          var L = M[0],
            F = M.pop();
          if (F !== L) {
            M[0] = F;
            e: for (var Se = 0, v = M.length, C = v >>> 1; Se < C; ) {
              var Q = 2 * (Se + 1) - 1,
                Y = M[Q],
                J = Q + 1,
                re = M[J];
              if (0 > d(Y, F))
                J < v && 0 > d(re, Y)
                  ? ((M[Se] = re), (M[J] = F), (Se = J))
                  : ((M[Se] = Y), (M[Q] = F), (Se = Q));
              else if (J < v && 0 > d(re, F))
                (M[Se] = re), (M[J] = F), (Se = J);
              else break e;
            }
          }
          return L;
        }
        function d(M, L) {
          var F = M.sortIndex - L.sortIndex;
          return F !== 0 ? F : M.id - L.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' &&
            typeof performance.now == 'function')
        ) {
          var y = performance;
          c.unstable_now = function () {
            return y.now();
          };
        } else {
          var z = Date,
            N = z.now();
          c.unstable_now = function () {
            return z.now() - N;
          };
        }
        var S = [],
          h = [],
          A = 1,
          w = null,
          U = 3,
          q = !1,
          H = !1,
          V = !1,
          G = !1,
          B = typeof setTimeout == 'function' ? setTimeout : null,
          I = typeof clearTimeout == 'function' ? clearTimeout : null,
          X = typeof setImmediate < 'u' ? setImmediate : null;
        function ie(M) {
          for (var L = o(h); L !== null; ) {
            if (L.callback === null) r(h);
            else if (L.startTime <= M)
              r(h), (L.sortIndex = L.expirationTime), s(S, L);
            else break;
            L = o(h);
          }
        }
        function $(M) {
          if (((V = !1), ie(M), !H))
            if (o(S) !== null) (H = !0), ve || ((ve = !0), Qe());
            else {
              var L = o(h);
              L !== null && Ze($, L.startTime - M);
            }
        }
        var ve = !1,
          fe = -1,
          oe = 5,
          he = -1;
        function Ye() {
          return G ? !0 : !(c.unstable_now() - he < oe);
        }
        function $e() {
          if (((G = !1), ve)) {
            var M = c.unstable_now();
            he = M;
            var L = !0;
            try {
              e: {
                (H = !1), V && ((V = !1), I(fe), (fe = -1)), (q = !0);
                var F = U;
                try {
                  t: {
                    for (
                      ie(M), w = o(S);
                      w !== null && !(w.expirationTime > M && Ye());

                    ) {
                      var Se = w.callback;
                      if (typeof Se == 'function') {
                        (w.callback = null), (U = w.priorityLevel);
                        var v = Se(w.expirationTime <= M);
                        if (((M = c.unstable_now()), typeof v == 'function')) {
                          (w.callback = v), ie(M), (L = !0);
                          break t;
                        }
                        w === o(S) && r(S), ie(M);
                      } else r(S);
                      w = o(S);
                    }
                    if (w !== null) L = !0;
                    else {
                      var C = o(h);
                      C !== null && Ze($, C.startTime - M), (L = !1);
                    }
                  }
                  break e;
                } finally {
                  (w = null), (U = F), (q = !1);
                }
                L = void 0;
              }
            } finally {
              L ? Qe() : (ve = !1);
            }
          }
        }
        var Qe;
        if (typeof X == 'function')
          Qe = function () {
            X($e);
          };
        else if (typeof MessageChannel < 'u') {
          var El = new MessageChannel(),
            Tl = El.port2;
          (El.port1.onmessage = $e),
            (Qe = function () {
              Tl.postMessage(null);
            });
        } else
          Qe = function () {
            B($e, 0);
          };
        function Ze(M, L) {
          fe = B(function () {
            M(c.unstable_now());
          }, L);
        }
        (c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (c.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (oe = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return U;
          }),
          (c.unstable_next = function (M) {
            switch (U) {
              case 1:
              case 2:
              case 3:
                var L = 3;
                break;
              default:
                L = U;
            }
            var F = U;
            U = L;
            try {
              return M();
            } finally {
              U = F;
            }
          }),
          (c.unstable_requestPaint = function () {
            G = !0;
          }),
          (c.unstable_runWithPriority = function (M, L) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var F = U;
            U = M;
            try {
              return L();
            } finally {
              U = F;
            }
          }),
          (c.unstable_scheduleCallback = function (M, L, F) {
            var Se = c.unstable_now();
            switch (
              (typeof F == 'object' && F !== null
                ? ((F = F.delay),
                  (F = typeof F == 'number' && 0 < F ? Se + F : Se))
                : (F = Se),
              M)
            ) {
              case 1:
                var v = -1;
                break;
              case 2:
                v = 250;
                break;
              case 5:
                v = 1073741823;
                break;
              case 4:
                v = 1e4;
                break;
              default:
                v = 5e3;
            }
            return (
              (v = F + v),
              (M = {
                id: A++,
                callback: L,
                priorityLevel: M,
                startTime: F,
                expirationTime: v,
                sortIndex: -1,
              }),
              F > Se
                ? ((M.sortIndex = F),
                  s(h, M),
                  o(S) === null &&
                    M === o(h) &&
                    (V ? (I(fe), (fe = -1)) : (V = !0), Ze($, F - Se)))
                : ((M.sortIndex = v),
                  s(S, M),
                  H || q || ((H = !0), ve || ((ve = !0), Qe()))),
              M
            );
          }),
          (c.unstable_shouldYield = Ye),
          (c.unstable_wrapCallback = function (M) {
            var L = U;
            return function () {
              var F = U;
              U = L;
              try {
                return M.apply(this, arguments);
              } finally {
                U = F;
              }
            };
          });
      })(Nf)),
    Nf
  );
}
var Hd;
function H0() {
  return Hd || ((Hd = 1), (Af.exports = C0())), Af.exports;
}
var Rf = { exports: {} },
  Je = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wd;
function w0() {
  if (wd) return Je;
  wd = 1;
  var c = _f();
  function s(S) {
    var h = 'https://react.dev/errors/' + S;
    if (1 < arguments.length) {
      h += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        h += '&args[]=' + encodeURIComponent(arguments[A]);
    }
    return (
      'Minified React error #' +
      S +
      '; visit ' +
      h +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var r = {
      d: {
        f: o,
        r: function () {
          throw Error(s(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for('react.portal');
  function y(S, h, A) {
    var w =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: w == null ? null : '' + w,
      children: S,
      containerInfo: h,
      implementation: A,
    };
  }
  var z = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function N(S, h) {
    if (S === 'font') return '';
    if (typeof h == 'string') return h === 'use-credentials' ? h : '';
  }
  return (
    (Je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Je.createPortal = function (S, h) {
      var A =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(s(299));
      return y(S, h, null, A);
    }),
    (Je.flushSync = function (S) {
      var h = z.T,
        A = r.p;
      try {
        if (((z.T = null), (r.p = 2), S)) return S();
      } finally {
        (z.T = h), (r.p = A), r.d.f();
      }
    }),
    (Je.preconnect = function (S, h) {
      typeof S == 'string' &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == 'string'
                ? h === 'use-credentials'
                  ? h
                  : ''
                : void 0))
          : (h = null),
        r.d.C(S, h));
    }),
    (Je.prefetchDNS = function (S) {
      typeof S == 'string' && r.d.D(S);
    }),
    (Je.preinit = function (S, h) {
      if (typeof S == 'string' && h && typeof h.as == 'string') {
        var A = h.as,
          w = N(A, h.crossOrigin),
          U = typeof h.integrity == 'string' ? h.integrity : void 0,
          q = typeof h.fetchPriority == 'string' ? h.fetchPriority : void 0;
        A === 'style'
          ? r.d.S(S, typeof h.precedence == 'string' ? h.precedence : void 0, {
              crossOrigin: w,
              integrity: U,
              fetchPriority: q,
            })
          : A === 'script' &&
            r.d.X(S, {
              crossOrigin: w,
              integrity: U,
              fetchPriority: q,
              nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
            });
      }
    }),
    (Je.preinitModule = function (S, h) {
      if (typeof S == 'string')
        if (typeof h == 'object' && h !== null) {
          if (h.as == null || h.as === 'script') {
            var A = N(h.as, h.crossOrigin);
            r.d.M(S, {
              crossOrigin: A,
              integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
              nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
            });
          }
        } else h == null && r.d.M(S);
    }),
    (Je.preload = function (S, h) {
      if (
        typeof S == 'string' &&
        typeof h == 'object' &&
        h !== null &&
        typeof h.as == 'string'
      ) {
        var A = h.as,
          w = N(A, h.crossOrigin);
        r.d.L(S, A, {
          crossOrigin: w,
          integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
          nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
          type: typeof h.type == 'string' ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == 'string' ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == 'string' ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == 'string' ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == 'string' ? h.imageSizes : void 0,
          media: typeof h.media == 'string' ? h.media : void 0,
        });
      }
    }),
    (Je.preloadModule = function (S, h) {
      if (typeof S == 'string')
        if (h) {
          var A = N(h.as, h.crossOrigin);
          r.d.m(S, {
            as: typeof h.as == 'string' && h.as !== 'script' ? h.as : void 0,
            crossOrigin: A,
            integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
          });
        } else r.d.m(S);
    }),
    (Je.requestFormReset = function (S) {
      r.d.r(S);
    }),
    (Je.unstable_batchedUpdates = function (S, h) {
      return S(h);
    }),
    (Je.useFormState = function (S, h, A) {
      return z.H.useFormState(S, h, A);
    }),
    (Je.useFormStatus = function () {
      return z.H.useHostTransitionStatus();
    }),
    (Je.version = '19.1.0'),
    Je
  );
}
var Bd;
function B0() {
  if (Bd) return Rf.exports;
  Bd = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return c(), (Rf.exports = w0()), Rf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qd;
function q0() {
  if (qd) return Ou;
  qd = 1;
  var c = H0(),
    s = _f(),
    o = B0();
  function r(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function y(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function z(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function N(e) {
    if (y(e) !== e) throw Error(r(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = y(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var u = l.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === l) return N(u), e;
          if (n === a) return N(u), t;
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== a.return) (l = u), (a = n);
      else {
        for (var i = !1, f = u.child; f; ) {
          if (f === l) {
            (i = !0), (l = u), (a = n);
            break;
          }
          if (f === a) {
            (i = !0), (a = u), (l = n);
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = n.child; f; ) {
            if (f === l) {
              (i = !0), (l = n), (a = u);
              break;
            }
            if (f === a) {
              (i = !0), (a = n), (l = u);
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (l.alternate !== a) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? e : t;
  }
  function h(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = h(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var A = Object.assign,
    w = Symbol.for('react.element'),
    U = Symbol.for('react.transitional.element'),
    q = Symbol.for('react.portal'),
    H = Symbol.for('react.fragment'),
    V = Symbol.for('react.strict_mode'),
    G = Symbol.for('react.profiler'),
    B = Symbol.for('react.provider'),
    I = Symbol.for('react.consumer'),
    X = Symbol.for('react.context'),
    ie = Symbol.for('react.forward_ref'),
    $ = Symbol.for('react.suspense'),
    ve = Symbol.for('react.suspense_list'),
    fe = Symbol.for('react.memo'),
    oe = Symbol.for('react.lazy'),
    he = Symbol.for('react.activity'),
    Ye = Symbol.for('react.memo_cache_sentinel'),
    $e = Symbol.iterator;
  function Qe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = ($e && e[$e]) || e['@@iterator']),
        typeof e == 'function' ? e : null);
  }
  var El = Symbol.for('react.client.reference');
  function Tl(e) {
    if (e == null) return null;
    if (typeof e == 'function')
      return e.$$typeof === El ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case H:
        return 'Fragment';
      case G:
        return 'Profiler';
      case V:
        return 'StrictMode';
      case $:
        return 'Suspense';
      case ve:
        return 'SuspenseList';
      case he:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case q:
          return 'Portal';
        case X:
          return (e.displayName || 'Context') + '.Provider';
        case I:
          return (e._context.displayName || 'Context') + '.Consumer';
        case ie:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case fe:
          return (
            (t = e.displayName || null), t !== null ? t : Tl(e.type) || 'Memo'
          );
        case oe:
          (t = e._payload), (e = e._init);
          try {
            return Tl(e(t));
          } catch {}
      }
    return null;
  }
  var Ze = Array.isArray,
    M = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    L = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    F = { pending: !1, data: null, method: null, action: null },
    Se = [],
    v = -1;
  function C(e) {
    return { current: e };
  }
  function Q(e) {
    0 > v || ((e.current = Se[v]), (Se[v] = null), v--);
  }
  function Y(e, t) {
    v++, (Se[v] = e.current), (e.current = t);
  }
  var J = C(null),
    re = C(null),
    ee = C(null),
    tt = C(null);
  function Te(e, t) {
    switch ((Y(ee, t), Y(re, e), Y(J, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? ud(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = ud(t)), (e = nd(t, e));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    Q(J), Y(J, e);
  }
  function Wt() {
    Q(J), Q(re), Q(ee);
  }
  function ni(e) {
    e.memoizedState !== null && Y(tt, e);
    var t = J.current,
      l = nd(t, e.type);
    t !== l && (Y(re, e), Y(J, l));
  }
  function Bu(e) {
    re.current === e && (Q(J), Q(re)),
      tt.current === e && (Q(tt), (Tu._currentValue = F));
  }
  var ii = Object.prototype.hasOwnProperty,
    ci = c.unstable_scheduleCallback,
    fi = c.unstable_cancelCallback,
    rh = c.unstable_shouldYield,
    sh = c.unstable_requestPaint,
    Tt = c.unstable_now,
    oh = c.unstable_getCurrentPriorityLevel,
    Bf = c.unstable_ImmediatePriority,
    qf = c.unstable_UserBlockingPriority,
    qu = c.unstable_NormalPriority,
    dh = c.unstable_LowPriority,
    Yf = c.unstable_IdlePriority,
    hh = c.log,
    mh = c.unstable_setDisableYieldValue,
    _a = null,
    lt = null;
  function Ft(e) {
    if (
      (typeof hh == 'function' && mh(e),
      lt && typeof lt.setStrictMode == 'function')
    )
      try {
        lt.setStrictMode(_a, e);
      } catch {}
  }
  var at = Math.clz32 ? Math.clz32 : gh,
    yh = Math.log,
    vh = Math.LN2;
  function gh(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((yh(e) / vh) | 0)) | 0;
  }
  var Yu = 256,
    Lu = 4194304;
  function Al(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Gu(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = e.suspendedLanes,
      i = e.pingedLanes;
    e = e.warmLanes;
    var f = a & 134217727;
    return (
      f !== 0
        ? ((a = f & ~n),
          a !== 0
            ? (u = Al(a))
            : ((i &= f),
              i !== 0
                ? (u = Al(i))
                : l || ((l = f & ~e), l !== 0 && (u = Al(l)))))
        : ((f = a & ~n),
          f !== 0
            ? (u = Al(f))
            : i !== 0
            ? (u = Al(i))
            : l || ((l = a & ~e), l !== 0 && (u = Al(l)))),
      u === 0
        ? 0
        : t !== 0 &&
          t !== u &&
          (t & n) === 0 &&
          ((n = u & -u),
          (l = t & -t),
          n >= l || (n === 32 && (l & 4194048) !== 0))
        ? t
        : u
    );
  }
  function ja(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function bh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Lf() {
    var e = Yu;
    return (Yu <<= 1), (Yu & 4194048) === 0 && (Yu = 256), e;
  }
  function Gf() {
    var e = Lu;
    return (Lu <<= 1), (Lu & 62914560) === 0 && (Lu = 4194304), e;
  }
  function ri(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ua(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function ph(e, t, l, a, u, n) {
    var i = e.pendingLanes;
    (e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0);
    var f = e.entanglements,
      m = e.expirationTimes,
      E = e.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var O = 31 - at(l),
        j = 1 << O;
      (f[O] = 0), (m[O] = -1);
      var T = E[O];
      if (T !== null)
        for (E[O] = null, O = 0; O < T.length; O++) {
          var R = T[O];
          R !== null && (R.lane &= -536870913);
        }
      l &= ~j;
    }
    a !== 0 && Xf(e, a, 0),
      n !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= n & ~(i & ~t));
  }
  function Xf(e, t, l) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var a = 31 - at(t);
    (e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194090));
  }
  function Qf(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - at(l),
        u = 1 << a;
      (u & t) | (e[a] & t) && (e[a] |= t), (l &= ~u);
    }
  }
  function si(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function oi(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Zf() {
    var e = L.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Ad(e.type));
  }
  function Sh(e, t) {
    var l = L.p;
    try {
      return (L.p = e), t();
    } finally {
      L.p = l;
    }
  }
  var Pt = Math.random().toString(36).slice(2),
    Ve = '__reactFiber$' + Pt,
    We = '__reactProps$' + Pt,
    Zl = '__reactContainer$' + Pt,
    di = '__reactEvents$' + Pt,
    xh = '__reactListeners$' + Pt,
    Eh = '__reactHandles$' + Pt,
    Vf = '__reactResources$' + Pt,
    Ca = '__reactMarker$' + Pt;
  function hi(e) {
    delete e[Ve], delete e[We], delete e[di], delete e[xh], delete e[Eh];
  }
  function Vl(e) {
    var t = e[Ve];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Zl] || l[Ve])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = rd(e); e !== null; ) {
            if ((l = e[Ve])) return l;
            e = rd(e);
          }
        return t;
      }
      (e = l), (l = e.parentNode);
    }
    return null;
  }
  function Kl(e) {
    if ((e = e[Ve] || e[Zl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ha(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Jl(e) {
    var t = e[Vf];
    return (
      t ||
        (t = e[Vf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function He(e) {
    e[Ca] = !0;
  }
  var Kf = new Set(),
    Jf = {};
  function Nl(e, t) {
    kl(e, t), kl(e + 'Capture', t);
  }
  function kl(e, t) {
    for (Jf[e] = t, e = 0; e < t.length; e++) Kf.add(t[e]);
  }
  var Th = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    kf = {},
    $f = {};
  function Ah(e) {
    return ii.call($f, e)
      ? !0
      : ii.call(kf, e)
      ? !1
      : Th.test(e)
      ? ($f[e] = !0)
      : ((kf[e] = !0), !1);
  }
  function Xu(e, t, l) {
    if (Ah(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var a = t.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + l);
      }
  }
  function Qu(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + l);
    }
  }
  function _t(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, '' + a);
    }
  }
  var mi, Wf;
  function $l(e) {
    if (mi === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        (mi = (t && t[1]) || ''),
          (Wf =
            -1 <
            l.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < l.stack.indexOf('@')
              ? '@unknown:0:0'
              : '');
      }
    return (
      `
` +
      mi +
      e +
      Wf
    );
  }
  var yi = !1;
  function vi(e, t) {
    if (!e || yi) return '';
    yi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var j = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(j.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(j, []);
                } catch (R) {
                  var T = R;
                }
                Reflect.construct(e, [], j);
              } else {
                try {
                  j.call();
                } catch (R) {
                  T = R;
                }
                e.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                T = R;
              }
              (j = e()) &&
                typeof j.catch == 'function' &&
                j.catch(function () {});
            }
          } catch (R) {
            if (R && T && typeof R.stack == 'string') return [R.stack, T.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        'name'
      );
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var n = a.DetermineComponentFrameRoot(),
        i = n[0],
        f = n[1];
      if (i && f) {
        var m = i.split(`
`),
          E = f.split(`
`);
        for (
          u = a = 0;
          a < m.length && !m[a].includes('DetermineComponentFrameRoot');

        )
          a++;
        for (; u < E.length && !E[u].includes('DetermineComponentFrameRoot'); )
          u++;
        if (a === m.length || u === E.length)
          for (
            a = m.length - 1, u = E.length - 1;
            1 <= a && 0 <= u && m[a] !== E[u];

          )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (m[a] !== E[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || m[a] !== E[u])) {
                  var O =
                    `
` + m[a].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      O.includes('<anonymous>') &&
                      (O = O.replace('<anonymous>', e.displayName)),
                    O
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      (yi = !1), (Error.prepareStackTrace = l);
    }
    return (l = e ? e.displayName || e.name : '') ? $l(l) : '';
  }
  function Nh(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return $l(e.type);
      case 16:
        return $l('Lazy');
      case 13:
        return $l('Suspense');
      case 19:
        return $l('SuspenseList');
      case 0:
      case 15:
        return vi(e.type, !1);
      case 11:
        return vi(e.type.render, !1);
      case 1:
        return vi(e.type, !0);
      case 31:
        return $l('Activity');
      default:
        return '';
    }
  }
  function Ff(e) {
    try {
      var t = '';
      do (t += Nh(e)), (e = e.return);
      while (e);
      return t;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  function ot(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function Pf(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    );
  }
  function Rh(e) {
    var t = Pf(e) ? 'checked' : 'value',
      l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof l < 'u' &&
      typeof l.get == 'function' &&
      typeof l.set == 'function'
    ) {
      var u = l.get,
        n = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            (a = '' + i), n.call(this, i);
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (i) {
            a = '' + i;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Zu(e) {
    e._valueTracker || (e._valueTracker = Rh(e));
  }
  function If(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = '';
    return (
      e && (a = Pf(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Vu(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var zh = /[\n"\\]/g;
  function dt(e) {
    return e.replace(zh, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function gi(e, t, l, a, u, n, i, f) {
    (e.name = ''),
      i != null &&
      typeof i != 'function' &&
      typeof i != 'symbol' &&
      typeof i != 'boolean'
        ? (e.type = i)
        : e.removeAttribute('type'),
      t != null
        ? i === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) &&
            (e.value = '' + ot(t))
          : e.value !== '' + ot(t) && (e.value = '' + ot(t))
        : (i !== 'submit' && i !== 'reset') || e.removeAttribute('value'),
      t != null
        ? bi(e, i, ot(t))
        : l != null
        ? bi(e, i, ot(l))
        : a != null && e.removeAttribute('value'),
      u == null && n != null && (e.defaultChecked = !!n),
      u != null &&
        (e.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      f != null &&
      typeof f != 'function' &&
      typeof f != 'symbol' &&
      typeof f != 'boolean'
        ? (e.name = '' + ot(f))
        : e.removeAttribute('name');
  }
  function er(e, t, l, a, u, n, i, f) {
    if (
      (n != null &&
        typeof n != 'function' &&
        typeof n != 'symbol' &&
        typeof n != 'boolean' &&
        (e.type = n),
      t != null || l != null)
    ) {
      if (!((n !== 'submit' && n !== 'reset') || t != null)) return;
      (l = l != null ? '' + ot(l) : ''),
        (t = t != null ? '' + ot(t) : l),
        f || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (a = a ?? u),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (e.checked = f ? e.checked : !!a),
      (e.defaultChecked = !!a),
      i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (e.name = i);
  }
  function bi(e, t, l) {
    (t === 'number' && Vu(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function Wl(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < l.length; u++) t['$' + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        (u = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== u && (e[l].selected = u),
          u && a && (e[l].defaultSelected = !0);
    } else {
      for (l = '' + ot(l), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === l) {
          (e[u].selected = !0), a && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function tr(e, t, l) {
    if (
      t != null &&
      ((t = '' + ot(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + ot(l) : '';
  }
  function lr(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(r(92));
        if (Ze(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ''), (t = l);
    }
    (l = ot(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== '' && a !== null && (e.value = a);
  }
  function Fl(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Dh = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function ar(e, t, l) {
    var a = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? e.setProperty(t, '')
        : t === 'float'
        ? (e.cssFloat = '')
        : (e[t] = '')
      : a
      ? e.setProperty(t, l)
      : typeof l != 'number' || l === 0 || Dh.has(t)
      ? t === 'float'
        ? (e.cssFloat = l)
        : (e[t] = ('' + l).trim())
      : (e[t] = l + 'px');
  }
  function ur(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(r(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? e.setProperty(a, '')
            : a === 'float'
            ? (e.cssFloat = '')
            : (e[a] = ''));
      for (var u in t)
        (a = t[u]), t.hasOwnProperty(u) && l[u] !== a && ar(e, u, a);
    } else for (var n in t) t.hasOwnProperty(n) && ar(e, n, t[n]);
  }
  function pi(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Oh = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    Mh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ku(e) {
    return Mh.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Si = null;
  function xi(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Pl = null,
    Il = null;
  function nr(e) {
    var t = Kl(e);
    if (t && (e = t.stateNode)) {
      var l = e[We] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (gi(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === 'radio' && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + dt('' + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var u = a[We] || null;
                if (!u) throw Error(r(90));
                gi(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              (a = l[t]), a.form === e.form && If(a);
          }
          break e;
        case 'textarea':
          tr(e, l.value, l.defaultValue);
          break e;
        case 'select':
          (t = l.value), t != null && Wl(e, !!l.multiple, t, !1);
      }
    }
  }
  var Ei = !1;
  function ir(e, t, l) {
    if (Ei) return e(t, l);
    Ei = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Ei = !1),
        (Pl !== null || Il !== null) &&
          (jn(), Pl && ((t = Pl), (e = Il), (Il = Pl = null), nr(t), e)))
      )
        for (t = 0; t < e.length; t++) nr(e[t]);
    }
  }
  function wa(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[We] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        (a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !a);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != 'function') throw Error(r(231, t, typeof l));
    return l;
  }
  var jt = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ti = !1;
  if (jt)
    try {
      var Ba = {};
      Object.defineProperty(Ba, 'passive', {
        get: function () {
          Ti = !0;
        },
      }),
        window.addEventListener('test', Ba, Ba),
        window.removeEventListener('test', Ba, Ba);
    } catch {
      Ti = !1;
    }
  var It = null,
    Ai = null,
    Ju = null;
  function cr() {
    if (Ju) return Ju;
    var e,
      t = Ai,
      l = t.length,
      a,
      u = 'value' in It ? It.value : It.textContent,
      n = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++);
    var i = l - e;
    for (a = 1; a <= i && t[l - a] === u[n - a]; a++);
    return (Ju = u.slice(e, 1 < a ? 1 - a : void 0));
  }
  function ku(e) {
    var t = e.keyCode;
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function $u() {
    return !0;
  }
  function fr() {
    return !1;
  }
  function Fe(e) {
    function t(l, a, u, n, i) {
      (this._reactName = l),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null);
      for (var f in e)
        e.hasOwnProperty(f) && ((l = e[f]), (this[f] = l ? l(n) : n[f]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? $u
          : fr),
        (this.isPropagationStopped = fr),
        this
      );
    }
    return (
      A(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = $u));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = $u));
        },
        persist: function () {},
        isPersistent: $u,
      }),
      t
    );
  }
  var Rl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Wu = Fe(Rl),
    qa = A({}, Rl, { view: 0, detail: 0 }),
    _h = Fe(qa),
    Ni,
    Ri,
    Ya,
    Fu = A({}, qa, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Di,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Ya &&
              (Ya && e.type === 'mousemove'
                ? ((Ni = e.screenX - Ya.screenX), (Ri = e.screenY - Ya.screenY))
                : (Ri = Ni = 0),
              (Ya = e)),
            Ni);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Ri;
      },
    }),
    rr = Fe(Fu),
    jh = A({}, Fu, { dataTransfer: 0 }),
    Uh = Fe(jh),
    Ch = A({}, qa, { relatedTarget: 0 }),
    zi = Fe(Ch),
    Hh = A({}, Rl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    wh = Fe(Hh),
    Bh = A({}, Rl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    qh = Fe(Bh),
    Yh = A({}, Rl, { data: 0 }),
    sr = Fe(Yh),
    Lh = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Gh = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Xh = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function Qh(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Xh[e])
      ? !!t[e]
      : !1;
  }
  function Di() {
    return Qh;
  }
  var Zh = A({}, qa, {
      key: function (e) {
        if (e.key) {
          var t = Lh[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = ku(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
          ? Gh[e.keyCode] || 'Unidentified'
          : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Di,
      charCode: function (e) {
        return e.type === 'keypress' ? ku(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? ku(e)
          : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
      },
    }),
    Vh = Fe(Zh),
    Kh = A({}, Fu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    or = Fe(Kh),
    Jh = A({}, qa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Di,
    }),
    kh = Fe(Jh),
    $h = A({}, Rl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wh = Fe($h),
    Fh = A({}, Fu, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Ph = Fe(Fh),
    Ih = A({}, Rl, { newState: 0, oldState: 0 }),
    em = Fe(Ih),
    tm = [9, 13, 27, 32],
    Oi = jt && 'CompositionEvent' in window,
    La = null;
  jt && 'documentMode' in document && (La = document.documentMode);
  var lm = jt && 'TextEvent' in window && !La,
    dr = jt && (!Oi || (La && 8 < La && 11 >= La)),
    hr = ' ',
    mr = !1;
  function yr(e, t) {
    switch (e) {
      case 'keyup':
        return tm.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function vr(e) {
    return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
  }
  var ea = !1;
  function am(e, t) {
    switch (e) {
      case 'compositionend':
        return vr(t);
      case 'keypress':
        return t.which !== 32 ? null : ((mr = !0), hr);
      case 'textInput':
        return (e = t.data), e === hr && mr ? null : e;
      default:
        return null;
    }
  }
  function um(e, t) {
    if (ea)
      return e === 'compositionend' || (!Oi && yr(e, t))
        ? ((e = cr()), (Ju = Ai = It = null), (ea = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return dr && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var nm = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function gr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!nm[e.type] : t === 'textarea';
  }
  function br(e, t, l, a) {
    Pl ? (Il ? Il.push(a) : (Il = [a])) : (Pl = a),
      (t = qn(t, 'onChange')),
      0 < t.length &&
        ((l = new Wu('onChange', 'change', null, l, a)),
        e.push({ event: l, listeners: t }));
  }
  var Ga = null,
    Xa = null;
  function im(e) {
    Io(e, 0);
  }
  function Pu(e) {
    var t = Ha(e);
    if (If(t)) return e;
  }
  function pr(e, t) {
    if (e === 'change') return t;
  }
  var Sr = !1;
  if (jt) {
    var Mi;
    if (jt) {
      var _i = 'oninput' in document;
      if (!_i) {
        var xr = document.createElement('div');
        xr.setAttribute('oninput', 'return;'),
          (_i = typeof xr.oninput == 'function');
      }
      Mi = _i;
    } else Mi = !1;
    Sr = Mi && (!document.documentMode || 9 < document.documentMode);
  }
  function Er() {
    Ga && (Ga.detachEvent('onpropertychange', Tr), (Xa = Ga = null));
  }
  function Tr(e) {
    if (e.propertyName === 'value' && Pu(Xa)) {
      var t = [];
      br(t, Xa, e, xi(e)), ir(im, t);
    }
  }
  function cm(e, t, l) {
    e === 'focusin'
      ? (Er(), (Ga = t), (Xa = l), Ga.attachEvent('onpropertychange', Tr))
      : e === 'focusout' && Er();
  }
  function fm(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
      return Pu(Xa);
  }
  function rm(e, t) {
    if (e === 'click') return Pu(t);
  }
  function sm(e, t) {
    if (e === 'input' || e === 'change') return Pu(t);
  }
  function om(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ut = typeof Object.is == 'function' ? Object.is : om;
  function Qa(e, t) {
    if (ut(e, t)) return !0;
    if (
      typeof e != 'object' ||
      e === null ||
      typeof t != 'object' ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var u = l[a];
      if (!ii.call(t, u) || !ut(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Ar(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Nr(e, t) {
    var l = Ar(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Ar(l);
    }
  }
  function Rr(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Rr(e, t.parentNode)
        : 'contains' in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function zr(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Vu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Vu(e.document);
    }
    return t;
  }
  function ji(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var dm = jt && 'documentMode' in document && 11 >= document.documentMode,
    ta = null,
    Ui = null,
    Za = null,
    Ci = !1;
  function Dr(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ci ||
      ta == null ||
      ta !== Vu(a) ||
      ((a = ta),
      'selectionStart' in a && ji(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Za && Qa(Za, a)) ||
        ((Za = a),
        (a = qn(Ui, 'onSelect')),
        0 < a.length &&
          ((t = new Wu('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = ta))));
  }
  function zl(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var la = {
      animationend: zl('Animation', 'AnimationEnd'),
      animationiteration: zl('Animation', 'AnimationIteration'),
      animationstart: zl('Animation', 'AnimationStart'),
      transitionrun: zl('Transition', 'TransitionRun'),
      transitionstart: zl('Transition', 'TransitionStart'),
      transitioncancel: zl('Transition', 'TransitionCancel'),
      transitionend: zl('Transition', 'TransitionEnd'),
    },
    Hi = {},
    Or = {};
  jt &&
    ((Or = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete la.animationend.animation,
      delete la.animationiteration.animation,
      delete la.animationstart.animation),
    'TransitionEvent' in window || delete la.transitionend.transition);
  function Dl(e) {
    if (Hi[e]) return Hi[e];
    if (!la[e]) return e;
    var t = la[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Or) return (Hi[e] = t[l]);
    return e;
  }
  var Mr = Dl('animationend'),
    _r = Dl('animationiteration'),
    jr = Dl('animationstart'),
    hm = Dl('transitionrun'),
    mm = Dl('transitionstart'),
    ym = Dl('transitioncancel'),
    Ur = Dl('transitionend'),
    Cr = new Map(),
    wi =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  wi.push('scrollEnd');
  function St(e, t) {
    Cr.set(e, t), Nl(t, [e]);
  }
  var Hr = new WeakMap();
  function ht(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Hr.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Ff(t) }), Hr.set(e, t), t);
    }
    return { value: e, source: t, stack: Ff(t) };
  }
  var mt = [],
    aa = 0,
    Bi = 0;
  function Iu() {
    for (var e = aa, t = (Bi = aa = 0); t < e; ) {
      var l = mt[t];
      mt[t++] = null;
      var a = mt[t];
      mt[t++] = null;
      var u = mt[t];
      mt[t++] = null;
      var n = mt[t];
      if (((mt[t++] = null), a !== null && u !== null)) {
        var i = a.pending;
        i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)),
          (a.pending = u);
      }
      n !== 0 && wr(l, u, n);
    }
  }
  function en(e, t, l, a) {
    (mt[aa++] = e),
      (mt[aa++] = t),
      (mt[aa++] = l),
      (mt[aa++] = a),
      (Bi |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a);
  }
  function qi(e, t, l, a) {
    return en(e, t, l, a), tn(e);
  }
  function ua(e, t) {
    return en(e, null, null, t), tn(e);
  }
  function wr(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var u = !1, n = e.return; n !== null; )
      (n.childLanes |= l),
        (a = n.alternate),
        a !== null && (a.childLanes |= l),
        n.tag === 22 &&
          ((e = n.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = n),
        (n = n.return);
    return e.tag === 3
      ? ((n = e.stateNode),
        u &&
          t !== null &&
          ((u = 31 - at(l)),
          (e = n.hiddenUpdates),
          (a = e[u]),
          a === null ? (e[u] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        n)
      : null;
  }
  function tn(e) {
    if (50 < yu) throw ((yu = 0), (Zc = null), Error(r(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var na = {};
  function vm(e, t, l, a) {
    (this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function nt(e, t, l, a) {
    return new vm(e, t, l, a);
  }
  function Yi(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Ut(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = nt(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function Br(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ln(e, t, l, a, u, n) {
    var i = 0;
    if (((a = e), typeof e == 'function')) Yi(e) && (i = 1);
    else if (typeof e == 'string')
      i = b0(e, l, J.current)
        ? 26
        : e === 'html' || e === 'head' || e === 'body'
        ? 27
        : 5;
    else
      e: switch (e) {
        case he:
          return (e = nt(31, l, t, u)), (e.elementType = he), (e.lanes = n), e;
        case H:
          return Ol(l.children, u, n, t);
        case V:
          (i = 8), (u |= 24);
          break;
        case G:
          return (
            (e = nt(12, l, t, u | 2)), (e.elementType = G), (e.lanes = n), e
          );
        case $:
          return (e = nt(13, l, t, u)), (e.elementType = $), (e.lanes = n), e;
        case ve:
          return (e = nt(19, l, t, u)), (e.elementType = ve), (e.lanes = n), e;
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case B:
              case X:
                i = 10;
                break e;
              case I:
                i = 9;
                break e;
              case ie:
                i = 11;
                break e;
              case fe:
                i = 14;
                break e;
              case oe:
                (i = 16), (a = null);
                break e;
            }
          (i = 29),
            (l = Error(r(130, e === null ? 'null' : typeof e, ''))),
            (a = null);
      }
    return (
      (t = nt(i, l, t, u)), (t.elementType = e), (t.type = a), (t.lanes = n), t
    );
  }
  function Ol(e, t, l, a) {
    return (e = nt(7, e, a, t)), (e.lanes = l), e;
  }
  function Li(e, t, l) {
    return (e = nt(6, e, null, t)), (e.lanes = l), e;
  }
  function Gi(e, t, l) {
    return (
      (t = nt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var ia = [],
    ca = 0,
    an = null,
    un = 0,
    yt = [],
    vt = 0,
    Ml = null,
    Ct = 1,
    Ht = '';
  function _l(e, t) {
    (ia[ca++] = un), (ia[ca++] = an), (an = e), (un = t);
  }
  function qr(e, t, l) {
    (yt[vt++] = Ct), (yt[vt++] = Ht), (yt[vt++] = Ml), (Ml = e);
    var a = Ct;
    e = Ht;
    var u = 32 - at(a) - 1;
    (a &= ~(1 << u)), (l += 1);
    var n = 32 - at(t) + u;
    if (30 < n) {
      var i = u - (u % 5);
      (n = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (u -= i),
        (Ct = (1 << (32 - at(t) + u)) | (l << u) | a),
        (Ht = n + e);
    } else (Ct = (1 << n) | (l << u) | a), (Ht = e);
  }
  function Xi(e) {
    e.return !== null && (_l(e, 1), qr(e, 1, 0));
  }
  function Qi(e) {
    for (; e === an; )
      (an = ia[--ca]), (ia[ca] = null), (un = ia[--ca]), (ia[ca] = null);
    for (; e === Ml; )
      (Ml = yt[--vt]),
        (yt[vt] = null),
        (Ht = yt[--vt]),
        (yt[vt] = null),
        (Ct = yt[--vt]),
        (yt[vt] = null);
  }
  var ke = null,
    ze = null,
    de = !1,
    jl = null,
    At = !1,
    Zi = Error(r(519));
  function Ul(e) {
    var t = Error(r(418, ''));
    throw (Ja(ht(t, e)), Zi);
  }
  function Yr(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[Ve] = e), (t[We] = a), l)) {
      case 'dialog':
        ne('cancel', t), ne('close', t);
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ne('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < gu.length; l++) ne(gu[l], t);
        break;
      case 'source':
        ne('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        ne('error', t), ne('load', t);
        break;
      case 'details':
        ne('toggle', t);
        break;
      case 'input':
        ne('invalid', t),
          er(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ),
          Zu(t);
        break;
      case 'select':
        ne('invalid', t);
        break;
      case 'textarea':
        ne('invalid', t), lr(t, a.value, a.defaultValue, a.children), Zu(t);
    }
    (l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      ad(t.textContent, l)
        ? (a.popover != null && (ne('beforetoggle', t), ne('toggle', t)),
          a.onScroll != null && ne('scroll', t),
          a.onScrollEnd != null && ne('scrollend', t),
          a.onClick != null && (t.onclick = Yn),
          (t = !0))
        : (t = !1),
      t || Ul(e);
  }
  function Lr(e) {
    for (ke = e.return; ke; )
      switch (ke.tag) {
        case 5:
        case 13:
          At = !1;
          return;
        case 27:
        case 3:
          At = !0;
          return;
        default:
          ke = ke.return;
      }
  }
  function Va(e) {
    if (e !== ke) return !1;
    if (!de) return Lr(e), (de = !0), !1;
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== 'form' && l !== 'button') || cf(e.type, e.memoizedProps))),
        (l = !l)),
      l && ze && Ul(e),
      Lr(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((l = e.data), l === '/$')) {
              if (t === 0) {
                ze = Et(e.nextSibling);
                break e;
              }
              t--;
            } else (l !== '$' && l !== '$!' && l !== '$?') || t++;
          e = e.nextSibling;
        }
        ze = null;
      }
    } else
      t === 27
        ? ((t = ze), yl(e.type) ? ((e = of), (of = null), (ze = e)) : (ze = t))
        : (ze = ke ? Et(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Ka() {
    (ze = ke = null), (de = !1);
  }
  function Gr() {
    var e = jl;
    return (
      e !== null &&
        (et === null ? (et = e) : et.push.apply(et, e), (jl = null)),
      e
    );
  }
  function Ja(e) {
    jl === null ? (jl = [e]) : jl.push(e);
  }
  var Vi = C(null),
    Cl = null,
    wt = null;
  function el(e, t, l) {
    Y(Vi, t._currentValue), (t._currentValue = l);
  }
  function Bt(e) {
    (e._currentValue = Vi.current), Q(Vi);
  }
  function Ki(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function Ji(e, t, l, a) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        e: for (; n !== null; ) {
          var f = n;
          n = u;
          for (var m = 0; m < t.length; m++)
            if (f.context === t[m]) {
              (n.lanes |= l),
                (f = n.alternate),
                f !== null && (f.lanes |= l),
                Ki(n.return, l, e),
                a || (i = null);
              break e;
            }
          n = f.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(r(341));
        (i.lanes |= l),
          (n = i.alternate),
          n !== null && (n.lanes |= l),
          Ki(i, l, e),
          (i = null);
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === e) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            (u.return = i.return), (i = u);
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function ka(e, t, l, a) {
    e = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(r(387));
        if (((i = i.memoizedProps), i !== null)) {
          var f = u.type;
          ut(u.pendingProps.value, i.value) ||
            (e !== null ? e.push(f) : (e = [f]));
        }
      } else if (u === tt.current) {
        if (((i = u.alternate), i === null)) throw Error(r(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(Tu) : (e = [Tu]));
      }
      u = u.return;
    }
    e !== null && Ji(t, e, l, a), (t.flags |= 262144);
  }
  function nn(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ut(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Hl(e) {
    (Cl = e),
      (wt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Ke(e) {
    return Xr(Cl, e);
  }
  function cn(e, t) {
    return Cl === null && Hl(e), Xr(e, t);
  }
  function Xr(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), wt === null)) {
      if (e === null) throw Error(r(308));
      (wt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else wt = wt.next = t;
    return l;
  }
  var gm =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                });
            };
          },
    bm = c.unstable_scheduleCallback,
    pm = c.unstable_NormalPriority,
    Ue = {
      $$typeof: X,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function ki() {
    return { controller: new gm(), data: new Map(), refCount: 0 };
  }
  function $a(e) {
    e.refCount--,
      e.refCount === 0 &&
        bm(pm, function () {
          e.controller.abort();
        });
  }
  var Wa = null,
    $i = 0,
    fa = 0,
    ra = null;
  function Sm(e, t) {
    if (Wa === null) {
      var l = (Wa = []);
      ($i = 0),
        (fa = Fc()),
        (ra = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        });
    }
    return $i++, t.then(Qr, Qr), t;
  }
  function Qr() {
    if (--$i === 0 && Wa !== null) {
      ra !== null && (ra.status = 'fulfilled');
      var e = Wa;
      (Wa = null), (fa = 0), (ra = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function xm(e, t) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      e.then(
        function () {
          (a.status = 'fulfilled'), (a.value = t);
          for (var u = 0; u < l.length; u++) (0, l[u])(t);
        },
        function (u) {
          for (a.status = 'rejected', a.reason = u, u = 0; u < l.length; u++)
            (0, l[u])(void 0);
        }
      ),
      a
    );
  }
  var Zr = M.S;
  M.S = function (e, t) {
    typeof t == 'object' &&
      t !== null &&
      typeof t.then == 'function' &&
      Sm(e, t),
      Zr !== null && Zr(e, t);
  };
  var wl = C(null);
  function Wi() {
    var e = wl.current;
    return e !== null ? e : Ee.pooledCache;
  }
  function fn(e, t) {
    t === null ? Y(wl, wl.current) : Y(wl, t.pool);
  }
  function Vr() {
    var e = Wi();
    return e === null ? null : { parent: Ue._currentValue, pool: e };
  }
  var Fa = Error(r(460)),
    Kr = Error(r(474)),
    rn = Error(r(542)),
    Fi = { then: function () {} };
  function Jr(e) {
    return (e = e.status), e === 'fulfilled' || e === 'rejected';
  }
  function sn() {}
  function kr(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(sn, sn), (t = l)),
      t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Wr(e), e);
      default:
        if (typeof t.status == 'string') t.then(sn, sn);
        else {
          if (((e = Ee), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          (e = t),
            (e.status = 'pending'),
            e.then(
              function (a) {
                if (t.status === 'pending') {
                  var u = t;
                  (u.status = 'fulfilled'), (u.value = a);
                }
              },
              function (a) {
                if (t.status === 'pending') {
                  var u = t;
                  (u.status = 'rejected'), (u.reason = a);
                }
              }
            );
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Wr(e), e);
        }
        throw ((Pa = t), Fa);
    }
  }
  var Pa = null;
  function $r() {
    if (Pa === null) throw Error(r(459));
    var e = Pa;
    return (Pa = null), e;
  }
  function Wr(e) {
    if (e === Fa || e === rn) throw Error(r(483));
  }
  var tl = !1;
  function Pi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ii(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function ll(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function al(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (me & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (a.pending = t),
        (t = tn(e)),
        wr(e, null, l),
        t
      );
    }
    return en(e, a, t, l), tn(e);
  }
  function Ia(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Qf(e, l);
    }
  }
  function ec(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var u = null,
        n = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          n === null ? (u = n = i) : (n = n.next = i), (l = l.next);
        } while (l !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      (l = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l);
      return;
    }
    (e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t);
  }
  var tc = !1;
  function eu() {
    if (tc) {
      var e = ra;
      if (e !== null) throw e;
    }
  }
  function tu(e, t, l, a) {
    tc = !1;
    var u = e.updateQueue;
    tl = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var m = f,
        E = m.next;
      (m.next = null), i === null ? (n = E) : (i.next = E), (i = m);
      var O = e.alternate;
      O !== null &&
        ((O = O.updateQueue),
        (f = O.lastBaseUpdate),
        f !== i &&
          (f === null ? (O.firstBaseUpdate = E) : (f.next = E),
          (O.lastBaseUpdate = m)));
    }
    if (n !== null) {
      var j = u.baseState;
      (i = 0), (O = E = m = null), (f = n);
      do {
        var T = f.lane & -536870913,
          R = T !== f.lane;
        if (R ? (ce & T) === T : (a & T) === T) {
          T !== 0 && T === fa && (tc = !0),
            O !== null &&
              (O = O.next =
                {
                  lane: 0,
                  tag: f.tag,
                  payload: f.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var P = e,
              k = f;
            T = t;
            var pe = l;
            switch (k.tag) {
              case 1:
                if (((P = k.payload), typeof P == 'function')) {
                  j = P.call(pe, j, T);
                  break e;
                }
                j = P;
                break e;
              case 3:
                P.flags = (P.flags & -65537) | 128;
              case 0:
                if (
                  ((P = k.payload),
                  (T = typeof P == 'function' ? P.call(pe, j, T) : P),
                  T == null)
                )
                  break e;
                j = A({}, j, T);
                break e;
              case 2:
                tl = !0;
            }
          }
          (T = f.callback),
            T !== null &&
              ((e.flags |= 64),
              R && (e.flags |= 8192),
              (R = u.callbacks),
              R === null ? (u.callbacks = [T]) : R.push(T));
        } else
          (R = {
            lane: T,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null,
          }),
            O === null ? ((E = O = R), (m = j)) : (O = O.next = R),
            (i |= T);
        if (((f = f.next), f === null)) {
          if (((f = u.shared.pending), f === null)) break;
          (R = f),
            (f = R.next),
            (R.next = null),
            (u.lastBaseUpdate = R),
            (u.shared.pending = null);
        }
      } while (!0);
      O === null && (m = j),
        (u.baseState = m),
        (u.firstBaseUpdate = E),
        (u.lastBaseUpdate = O),
        n === null && (u.shared.lanes = 0),
        (ol |= i),
        (e.lanes = i),
        (e.memoizedState = j);
    }
  }
  function Fr(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function Pr(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Fr(l[e], t);
  }
  var sa = C(null),
    on = C(0);
  function Ir(e, t) {
    (e = Zt), Y(on, e), Y(sa, t), (Zt = e | t.baseLanes);
  }
  function lc() {
    Y(on, Zt), Y(sa, sa.current);
  }
  function ac() {
    (Zt = on.current), Q(sa), Q(on);
  }
  var ul = 0,
    le = null,
    ge = null,
    _e = null,
    dn = !1,
    oa = !1,
    Bl = !1,
    hn = 0,
    lu = 0,
    da = null,
    Em = 0;
  function Oe() {
    throw Error(r(321));
  }
  function uc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!ut(e[l], t[l])) return !1;
    return !0;
  }
  function nc(e, t, l, a, u, n) {
    return (
      (ul = n),
      (le = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (M.H = e === null || e.memoizedState === null ? ws : Bs),
      (Bl = !1),
      (n = l(a, u)),
      (Bl = !1),
      oa && (n = ts(t, l, a, u)),
      es(e),
      n
    );
  }
  function es(e) {
    M.H = pn;
    var t = ge !== null && ge.next !== null;
    if (((ul = 0), (_e = ge = le = null), (dn = !1), (lu = 0), (da = null), t))
      throw Error(r(300));
    e === null ||
      we ||
      ((e = e.dependencies), e !== null && nn(e) && (we = !0));
  }
  function ts(e, t, l, a) {
    le = e;
    var u = 0;
    do {
      if ((oa && (da = null), (lu = 0), (oa = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (_e = ge = null), e.updateQueue != null)) {
        var n = e.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (M.H = Om), (n = t(l, a));
    } while (oa);
    return n;
  }
  function Tm() {
    var e = M.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? au(t) : t),
      (e = e.useState()[0]),
      (ge !== null ? ge.memoizedState : null) !== e && (le.flags |= 1024),
      t
    );
  }
  function ic() {
    var e = hn !== 0;
    return (hn = 0), e;
  }
  function cc(e, t, l) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l);
  }
  function fc(e) {
    if (dn) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      dn = !1;
    }
    (ul = 0), (_e = ge = le = null), (oa = !1), (lu = hn = 0), (da = null);
  }
  function Pe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return _e === null ? (le.memoizedState = _e = e) : (_e = _e.next = e), _e;
  }
  function je() {
    if (ge === null) {
      var e = le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ge.next;
    var t = _e === null ? le.memoizedState : _e.next;
    if (t !== null) (_e = t), (ge = e);
    else {
      if (e === null)
        throw le.alternate === null ? Error(r(467)) : Error(r(310));
      (ge = e),
        (e = {
          memoizedState: ge.memoizedState,
          baseState: ge.baseState,
          baseQueue: ge.baseQueue,
          queue: ge.queue,
          next: null,
        }),
        _e === null ? (le.memoizedState = _e = e) : (_e = _e.next = e);
    }
    return _e;
  }
  function rc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function au(e) {
    var t = lu;
    return (
      (lu += 1),
      da === null && (da = []),
      (e = kr(da, e, t)),
      (t = le),
      (_e === null ? t.memoizedState : _e.next) === null &&
        ((t = t.alternate),
        (M.H = t === null || t.memoizedState === null ? ws : Bs)),
      e
    );
  }
  function mn(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return au(e);
      if (e.$$typeof === X) return Ke(e);
    }
    throw Error(r(438, String(e)));
  }
  function sc(e) {
    var t = null,
      l = le.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = le.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = rc()), (le.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = Ye;
    return t.index++, l;
  }
  function qt(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function yn(e) {
    var t = je();
    return oc(t, ge, e);
  }
  function oc(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = l;
    var u = e.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        (u.next = n.next), (n.next = i);
      }
      (t.baseQueue = u = n), (a.pending = null);
    }
    if (((n = e.baseState), u === null)) e.memoizedState = n;
    else {
      t = u.next;
      var f = (i = null),
        m = null,
        E = t,
        O = !1;
      do {
        var j = E.lane & -536870913;
        if (j !== E.lane ? (ce & j) === j : (ul & j) === j) {
          var T = E.revertLane;
          if (T === 0)
            m !== null &&
              (m = m.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: E.action,
                  hasEagerState: E.hasEagerState,
                  eagerState: E.eagerState,
                  next: null,
                }),
              j === fa && (O = !0);
          else if ((ul & T) === T) {
            (E = E.next), T === fa && (O = !0);
            continue;
          } else
            (j = {
              lane: 0,
              revertLane: E.revertLane,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null,
            }),
              m === null ? ((f = m = j), (i = n)) : (m = m.next = j),
              (le.lanes |= T),
              (ol |= T);
          (j = E.action),
            Bl && l(n, j),
            (n = E.hasEagerState ? E.eagerState : l(n, j));
        } else
          (T = {
            lane: j,
            revertLane: E.revertLane,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null,
          }),
            m === null ? ((f = m = T), (i = n)) : (m = m.next = T),
            (le.lanes |= j),
            (ol |= j);
        E = E.next;
      } while (E !== null && E !== t);
      if (
        (m === null ? (i = n) : (m.next = f),
        !ut(n, e.memoizedState) && ((we = !0), O && ((l = ra), l !== null)))
      )
        throw l;
      (e.memoizedState = n),
        (e.baseState = i),
        (e.baseQueue = m),
        (a.lastRenderedState = n);
    }
    return u === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function dc(e) {
    var t = je(),
      l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      u = l.pending,
      n = t.memoizedState;
    if (u !== null) {
      l.pending = null;
      var i = (u = u.next);
      do (n = e(n, i.action)), (i = i.next);
      while (i !== u);
      ut(n, t.memoizedState) || (we = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (l.lastRenderedState = n);
    }
    return [n, a];
  }
  function ls(e, t, l) {
    var a = le,
      u = je(),
      n = de;
    if (n) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = t();
    var i = !ut((ge || u).memoizedState, l);
    i && ((u.memoizedState = l), (we = !0)), (u = u.queue);
    var f = ns.bind(null, a, u, e);
    if (
      (uu(2048, 8, f, [e]),
      u.getSnapshot !== t || i || (_e !== null && _e.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ha(9, vn(), us.bind(null, a, u, l, t), null),
        Ee === null)
      )
        throw Error(r(349));
      n || (ul & 124) !== 0 || as(a, t, l);
    }
    return l;
  }
  function as(e, t, l) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = le.updateQueue),
      t === null
        ? ((t = rc()), (le.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e));
  }
  function us(e, t, l, a) {
    (t.value = l), (t.getSnapshot = a), is(t) && cs(e);
  }
  function ns(e, t, l) {
    return l(function () {
      is(t) && cs(e);
    });
  }
  function is(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !ut(e, l);
    } catch {
      return !0;
    }
  }
  function cs(e) {
    var t = ua(e, 2);
    t !== null && st(t, e, 2);
  }
  function hc(e) {
    var t = Pe();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), Bl)) {
        Ft(!0);
        try {
          l();
        } finally {
          Ft(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function fs(e, t, l, a) {
    return (e.baseState = l), oc(e, ge, typeof a == 'function' ? a : qt);
  }
  function Am(e, t, l, a, u) {
    if (bn(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var n = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      M.T !== null ? l(!0) : (n.isTransition = !1),
        a(n),
        (l = t.pending),
        l === null
          ? ((n.next = t.pending = n), rs(t, n))
          : ((n.next = l.next), (t.pending = l.next = n));
    }
  }
  function rs(e, t) {
    var l = t.action,
      a = t.payload,
      u = e.state;
    if (t.isTransition) {
      var n = M.T,
        i = {};
      M.T = i;
      try {
        var f = l(u, a),
          m = M.S;
        m !== null && m(i, f), ss(e, t, f);
      } catch (E) {
        mc(e, t, E);
      } finally {
        M.T = n;
      }
    } else
      try {
        (n = l(u, a)), ss(e, t, n);
      } catch (E) {
        mc(e, t, E);
      }
  }
  function ss(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            os(e, t, a);
          },
          function (a) {
            return mc(e, t, a);
          }
        )
      : os(e, t, l);
  }
  function os(e, t, l) {
    (t.status = 'fulfilled'),
      (t.value = l),
      ds(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), rs(e, l)));
  }
  function mc(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do (t.status = 'rejected'), (t.reason = l), ds(t), (t = t.next);
      while (t !== a);
    }
    e.action = null;
  }
  function ds(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function hs(e, t) {
    return t;
  }
  function ms(e, t) {
    if (de) {
      var l = Ee.formState;
      if (l !== null) {
        e: {
          var a = le;
          if (de) {
            if (ze) {
              t: {
                for (var u = ze, n = At; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = Et(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (n = u.data), (u = n === 'F!' || n === 'F' ? u : null);
              }
              if (u) {
                (ze = Et(u.nextSibling)), (a = u.data === 'F!');
                break e;
              }
            }
            Ul(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = Pe()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hs,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Us.bind(null, le, a)),
      (a.dispatch = l),
      (a = hc(!1)),
      (n = pc.bind(null, le, !1, a.queue)),
      (a = Pe()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = u),
      (l = Am.bind(null, le, u, n, l)),
      (u.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function ys(e) {
    var t = je();
    return vs(t, ge, e);
  }
  function vs(e, t, l) {
    if (
      ((t = oc(e, t, hs)[0]),
      (e = yn(qt)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var a = au(t);
      } catch (i) {
        throw i === Fa ? rn : i;
      }
    else a = t;
    t = je();
    var u = t.queue,
      n = u.dispatch;
    return (
      l !== t.memoizedState &&
        ((le.flags |= 2048), ha(9, vn(), Nm.bind(null, u, l), null)),
      [a, n, e]
    );
  }
  function Nm(e, t) {
    e.action = t;
  }
  function gs(e) {
    var t = je(),
      l = ge;
    if (l !== null) return vs(t, l, e);
    je(), (t = t.memoizedState), (l = je());
    var a = l.queue.dispatch;
    return (l.memoizedState = e), [t, a, !1];
  }
  function ha(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = le.updateQueue),
      t === null && ((t = rc()), (le.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function vn() {
    return { destroy: void 0, resource: void 0 };
  }
  function bs() {
    return je().memoizedState;
  }
  function gn(e, t, l, a) {
    var u = Pe();
    (a = a === void 0 ? null : a),
      (le.flags |= e),
      (u.memoizedState = ha(1 | t, vn(), l, a));
  }
  function uu(e, t, l, a) {
    var u = je();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    ge !== null && a !== null && uc(a, ge.memoizedState.deps)
      ? (u.memoizedState = ha(t, n, l, a))
      : ((le.flags |= e), (u.memoizedState = ha(1 | t, n, l, a)));
  }
  function ps(e, t) {
    gn(8390656, 8, e, t);
  }
  function Ss(e, t) {
    uu(2048, 8, e, t);
  }
  function xs(e, t) {
    return uu(4, 2, e, t);
  }
  function Es(e, t) {
    return uu(4, 4, e, t);
  }
  function Ts(e, t) {
    if (typeof t == 'function') {
      e = e();
      var l = t(e);
      return function () {
        typeof l == 'function' ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function As(e, t, l) {
    (l = l != null ? l.concat([e]) : null), uu(4, 4, Ts.bind(null, t, e), l);
  }
  function yc() {}
  function Ns(e, t) {
    var l = je();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && uc(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function Rs(e, t) {
    var l = je();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && uc(t, a[1])) return a[0];
    if (((a = e()), Bl)) {
      Ft(!0);
      try {
        e();
      } finally {
        Ft(!1);
      }
    }
    return (l.memoizedState = [a, t]), a;
  }
  function vc(e, t, l) {
    return l === void 0 || (ul & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Mo()), (le.lanes |= e), (ol |= e), l);
  }
  function zs(e, t, l, a) {
    return ut(l, t)
      ? l
      : sa.current !== null
      ? ((e = vc(e, l, a)), ut(e, t) || (we = !0), e)
      : (ul & 42) === 0
      ? ((we = !0), (e.memoizedState = l))
      : ((e = Mo()), (le.lanes |= e), (ol |= e), t);
  }
  function Ds(e, t, l, a, u) {
    var n = L.p;
    L.p = n !== 0 && 8 > n ? n : 8;
    var i = M.T,
      f = {};
    (M.T = f), pc(e, !1, t, l);
    try {
      var m = u(),
        E = M.S;
      if (
        (E !== null && E(f, m),
        m !== null && typeof m == 'object' && typeof m.then == 'function')
      ) {
        var O = xm(m, a);
        nu(e, t, O, rt(e));
      } else nu(e, t, a, rt(e));
    } catch (j) {
      nu(e, t, { then: function () {}, status: 'rejected', reason: j }, rt());
    } finally {
      (L.p = n), (M.T = i);
    }
  }
  function Rm() {}
  function gc(e, t, l, a) {
    if (e.tag !== 5) throw Error(r(476));
    var u = Os(e).queue;
    Ds(
      e,
      u,
      t,
      F,
      l === null
        ? Rm
        : function () {
            return Ms(e), l(a);
          }
    );
  }
  function Os(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qt,
        lastRenderedState: F,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: qt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Ms(e) {
    var t = Os(e).next.queue;
    nu(e, t, {}, rt());
  }
  function bc() {
    return Ke(Tu);
  }
  function _s() {
    return je().memoizedState;
  }
  function js() {
    return je().memoizedState;
  }
  function zm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = rt();
          e = ll(l);
          var a = al(t, e, l);
          a !== null && (st(a, t, l), Ia(a, t, l)),
            (t = { cache: ki() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Dm(e, t, l) {
    var a = rt();
    (l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      bn(e)
        ? Cs(t, l)
        : ((l = qi(e, t, l, a)), l !== null && (st(l, e, a), Hs(l, t, a)));
  }
  function Us(e, t, l) {
    var a = rt();
    nu(e, t, l, a);
  }
  function nu(e, t, l, a) {
    var u = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (bn(e)) Cs(t, u);
    else {
      var n = e.alternate;
      if (
        e.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var i = t.lastRenderedState,
            f = n(i, l);
          if (((u.hasEagerState = !0), (u.eagerState = f), ut(f, i)))
            return en(e, t, u, 0), Ee === null && Iu(), !1;
        } catch {
        } finally {
        }
      if (((l = qi(e, t, u, a)), l !== null))
        return st(l, e, a), Hs(l, t, a), !0;
    }
    return !1;
  }
  function pc(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Fc(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      bn(e))
    ) {
      if (t) throw Error(r(479));
    } else (t = qi(e, l, a, 2)), t !== null && st(t, e, 2);
  }
  function bn(e) {
    var t = e.alternate;
    return e === le || (t !== null && t === le);
  }
  function Cs(e, t) {
    oa = dn = !0;
    var l = e.pending;
    l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t);
  }
  function Hs(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Qf(e, l);
    }
  }
  var pn = {
      readContext: Ke,
      use: mn,
      useCallback: Oe,
      useContext: Oe,
      useEffect: Oe,
      useImperativeHandle: Oe,
      useLayoutEffect: Oe,
      useInsertionEffect: Oe,
      useMemo: Oe,
      useReducer: Oe,
      useRef: Oe,
      useState: Oe,
      useDebugValue: Oe,
      useDeferredValue: Oe,
      useTransition: Oe,
      useSyncExternalStore: Oe,
      useId: Oe,
      useHostTransitionStatus: Oe,
      useFormState: Oe,
      useActionState: Oe,
      useOptimistic: Oe,
      useMemoCache: Oe,
      useCacheRefresh: Oe,
    },
    ws = {
      readContext: Ke,
      use: mn,
      useCallback: function (e, t) {
        return (Pe().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ke,
      useEffect: ps,
      useImperativeHandle: function (e, t, l) {
        (l = l != null ? l.concat([e]) : null),
          gn(4194308, 4, Ts.bind(null, t, e), l);
      },
      useLayoutEffect: function (e, t) {
        return gn(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        gn(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = Pe();
        t = t === void 0 ? null : t;
        var a = e();
        if (Bl) {
          Ft(!0);
          try {
            e();
          } finally {
            Ft(!1);
          }
        }
        return (l.memoizedState = [a, t]), a;
      },
      useReducer: function (e, t, l) {
        var a = Pe();
        if (l !== void 0) {
          var u = l(t);
          if (Bl) {
            Ft(!0);
            try {
              l(t);
            } finally {
              Ft(!1);
            }
          }
        } else u = t;
        return (
          (a.memoizedState = a.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (a.queue = e),
          (e = e.dispatch = Dm.bind(null, le, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Pe();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = hc(e);
        var t = e.queue,
          l = Us.bind(null, le, t);
        return (t.dispatch = l), [e.memoizedState, l];
      },
      useDebugValue: yc,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return vc(l, e, t);
      },
      useTransition: function () {
        var e = hc(!1);
        return (
          (e = Ds.bind(null, le, e.queue, !0, !1)),
          (Pe().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, l) {
        var a = le,
          u = Pe();
        if (de) {
          if (l === void 0) throw Error(r(407));
          l = l();
        } else {
          if (((l = t()), Ee === null)) throw Error(r(349));
          (ce & 124) !== 0 || as(a, t, l);
        }
        u.memoizedState = l;
        var n = { value: l, getSnapshot: t };
        return (
          (u.queue = n),
          ps(ns.bind(null, a, n, e), [e]),
          (a.flags |= 2048),
          ha(9, vn(), us.bind(null, a, n, l, t), null),
          l
        );
      },
      useId: function () {
        var e = Pe(),
          t = Ee.identifierPrefix;
        if (de) {
          var l = Ht,
            a = Ct;
          (l = (a & ~(1 << (32 - at(a) - 1))).toString(32) + l),
            (t = '«' + t + 'R' + l),
            (l = hn++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '»');
        } else (l = Em++), (t = '«' + t + 'r' + l.toString(32) + '»');
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: bc,
      useFormState: ms,
      useActionState: ms,
      useOptimistic: function (e) {
        var t = Pe();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = l),
          (t = pc.bind(null, le, !0, l)),
          (l.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: sc,
      useCacheRefresh: function () {
        return (Pe().memoizedState = zm.bind(null, le));
      },
    },
    Bs = {
      readContext: Ke,
      use: mn,
      useCallback: Ns,
      useContext: Ke,
      useEffect: Ss,
      useImperativeHandle: As,
      useInsertionEffect: xs,
      useLayoutEffect: Es,
      useMemo: Rs,
      useReducer: yn,
      useRef: bs,
      useState: function () {
        return yn(qt);
      },
      useDebugValue: yc,
      useDeferredValue: function (e, t) {
        var l = je();
        return zs(l, ge.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yn(qt)[0],
          t = je().memoizedState;
        return [typeof e == 'boolean' ? e : au(e), t];
      },
      useSyncExternalStore: ls,
      useId: _s,
      useHostTransitionStatus: bc,
      useFormState: ys,
      useActionState: ys,
      useOptimistic: function (e, t) {
        var l = je();
        return fs(l, ge, e, t);
      },
      useMemoCache: sc,
      useCacheRefresh: js,
    },
    Om = {
      readContext: Ke,
      use: mn,
      useCallback: Ns,
      useContext: Ke,
      useEffect: Ss,
      useImperativeHandle: As,
      useInsertionEffect: xs,
      useLayoutEffect: Es,
      useMemo: Rs,
      useReducer: dc,
      useRef: bs,
      useState: function () {
        return dc(qt);
      },
      useDebugValue: yc,
      useDeferredValue: function (e, t) {
        var l = je();
        return ge === null ? vc(l, e, t) : zs(l, ge.memoizedState, e, t);
      },
      useTransition: function () {
        var e = dc(qt)[0],
          t = je().memoizedState;
        return [typeof e == 'boolean' ? e : au(e), t];
      },
      useSyncExternalStore: ls,
      useId: _s,
      useHostTransitionStatus: bc,
      useFormState: gs,
      useActionState: gs,
      useOptimistic: function (e, t) {
        var l = je();
        return ge !== null
          ? fs(l, ge, e, t)
          : ((l.baseState = e), [e, l.queue.dispatch]);
      },
      useMemoCache: sc,
      useCacheRefresh: js,
    },
    ma = null,
    iu = 0;
  function Sn(e) {
    var t = iu;
    return (iu += 1), ma === null && (ma = []), kr(ma, e, t);
  }
  function cu(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function xn(e, t) {
    throw t.$$typeof === w
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]'
              ? 'object with keys {' + Object.keys(t).join(', ') + '}'
              : e
          )
        ));
  }
  function qs(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ys(e) {
    function t(p, g) {
      if (e) {
        var x = p.deletions;
        x === null ? ((p.deletions = [g]), (p.flags |= 16)) : x.push(g);
      }
    }
    function l(p, g) {
      if (!e) return null;
      for (; g !== null; ) t(p, g), (g = g.sibling);
      return null;
    }
    function a(p) {
      for (var g = new Map(); p !== null; )
        p.key !== null ? g.set(p.key, p) : g.set(p.index, p), (p = p.sibling);
      return g;
    }
    function u(p, g) {
      return (p = Ut(p, g)), (p.index = 0), (p.sibling = null), p;
    }
    function n(p, g, x) {
      return (
        (p.index = x),
        e
          ? ((x = p.alternate),
            x !== null
              ? ((x = x.index), x < g ? ((p.flags |= 67108866), g) : x)
              : ((p.flags |= 67108866), g))
          : ((p.flags |= 1048576), g)
      );
    }
    function i(p) {
      return e && p.alternate === null && (p.flags |= 67108866), p;
    }
    function f(p, g, x, _) {
      return g === null || g.tag !== 6
        ? ((g = Li(x, p.mode, _)), (g.return = p), g)
        : ((g = u(g, x)), (g.return = p), g);
    }
    function m(p, g, x, _) {
      var Z = x.type;
      return Z === H
        ? O(p, g, x.props.children, _, x.key)
        : g !== null &&
          (g.elementType === Z ||
            (typeof Z == 'object' &&
              Z !== null &&
              Z.$$typeof === oe &&
              qs(Z) === g.type))
        ? ((g = u(g, x.props)), cu(g, x), (g.return = p), g)
        : ((g = ln(x.type, x.key, x.props, null, p.mode, _)),
          cu(g, x),
          (g.return = p),
          g);
    }
    function E(p, g, x, _) {
      return g === null ||
        g.tag !== 4 ||
        g.stateNode.containerInfo !== x.containerInfo ||
        g.stateNode.implementation !== x.implementation
        ? ((g = Gi(x, p.mode, _)), (g.return = p), g)
        : ((g = u(g, x.children || [])), (g.return = p), g);
    }
    function O(p, g, x, _, Z) {
      return g === null || g.tag !== 7
        ? ((g = Ol(x, p.mode, _, Z)), (g.return = p), g)
        : ((g = u(g, x)), (g.return = p), g);
    }
    function j(p, g, x) {
      if (
        (typeof g == 'string' && g !== '') ||
        typeof g == 'number' ||
        typeof g == 'bigint'
      )
        return (g = Li('' + g, p.mode, x)), (g.return = p), g;
      if (typeof g == 'object' && g !== null) {
        switch (g.$$typeof) {
          case U:
            return (
              (x = ln(g.type, g.key, g.props, null, p.mode, x)),
              cu(x, g),
              (x.return = p),
              x
            );
          case q:
            return (g = Gi(g, p.mode, x)), (g.return = p), g;
          case oe:
            var _ = g._init;
            return (g = _(g._payload)), j(p, g, x);
        }
        if (Ze(g) || Qe(g))
          return (g = Ol(g, p.mode, x, null)), (g.return = p), g;
        if (typeof g.then == 'function') return j(p, Sn(g), x);
        if (g.$$typeof === X) return j(p, cn(p, g), x);
        xn(p, g);
      }
      return null;
    }
    function T(p, g, x, _) {
      var Z = g !== null ? g.key : null;
      if (
        (typeof x == 'string' && x !== '') ||
        typeof x == 'number' ||
        typeof x == 'bigint'
      )
        return Z !== null ? null : f(p, g, '' + x, _);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case U:
            return x.key === Z ? m(p, g, x, _) : null;
          case q:
            return x.key === Z ? E(p, g, x, _) : null;
          case oe:
            return (Z = x._init), (x = Z(x._payload)), T(p, g, x, _);
        }
        if (Ze(x) || Qe(x)) return Z !== null ? null : O(p, g, x, _, null);
        if (typeof x.then == 'function') return T(p, g, Sn(x), _);
        if (x.$$typeof === X) return T(p, g, cn(p, x), _);
        xn(p, x);
      }
      return null;
    }
    function R(p, g, x, _, Z) {
      if (
        (typeof _ == 'string' && _ !== '') ||
        typeof _ == 'number' ||
        typeof _ == 'bigint'
      )
        return (p = p.get(x) || null), f(g, p, '' + _, Z);
      if (typeof _ == 'object' && _ !== null) {
        switch (_.$$typeof) {
          case U:
            return (
              (p = p.get(_.key === null ? x : _.key) || null), m(g, p, _, Z)
            );
          case q:
            return (
              (p = p.get(_.key === null ? x : _.key) || null), E(g, p, _, Z)
            );
          case oe:
            var ae = _._init;
            return (_ = ae(_._payload)), R(p, g, x, _, Z);
        }
        if (Ze(_) || Qe(_)) return (p = p.get(x) || null), O(g, p, _, Z, null);
        if (typeof _.then == 'function') return R(p, g, x, Sn(_), Z);
        if (_.$$typeof === X) return R(p, g, x, cn(g, _), Z);
        xn(g, _);
      }
      return null;
    }
    function P(p, g, x, _) {
      for (
        var Z = null, ae = null, K = g, W = (g = 0), qe = null;
        K !== null && W < x.length;
        W++
      ) {
        K.index > W ? ((qe = K), (K = null)) : (qe = K.sibling);
        var se = T(p, K, x[W], _);
        if (se === null) {
          K === null && (K = qe);
          break;
        }
        e && K && se.alternate === null && t(p, K),
          (g = n(se, g, W)),
          ae === null ? (Z = se) : (ae.sibling = se),
          (ae = se),
          (K = qe);
      }
      if (W === x.length) return l(p, K), de && _l(p, W), Z;
      if (K === null) {
        for (; W < x.length; W++)
          (K = j(p, x[W], _)),
            K !== null &&
              ((g = n(K, g, W)),
              ae === null ? (Z = K) : (ae.sibling = K),
              (ae = K));
        return de && _l(p, W), Z;
      }
      for (K = a(K); W < x.length; W++)
        (qe = R(K, p, W, x[W], _)),
          qe !== null &&
            (e &&
              qe.alternate !== null &&
              K.delete(qe.key === null ? W : qe.key),
            (g = n(qe, g, W)),
            ae === null ? (Z = qe) : (ae.sibling = qe),
            (ae = qe));
      return (
        e &&
          K.forEach(function (Sl) {
            return t(p, Sl);
          }),
        de && _l(p, W),
        Z
      );
    }
    function k(p, g, x, _) {
      if (x == null) throw Error(r(151));
      for (
        var Z = null, ae = null, K = g, W = (g = 0), qe = null, se = x.next();
        K !== null && !se.done;
        W++, se = x.next()
      ) {
        K.index > W ? ((qe = K), (K = null)) : (qe = K.sibling);
        var Sl = T(p, K, se.value, _);
        if (Sl === null) {
          K === null && (K = qe);
          break;
        }
        e && K && Sl.alternate === null && t(p, K),
          (g = n(Sl, g, W)),
          ae === null ? (Z = Sl) : (ae.sibling = Sl),
          (ae = Sl),
          (K = qe);
      }
      if (se.done) return l(p, K), de && _l(p, W), Z;
      if (K === null) {
        for (; !se.done; W++, se = x.next())
          (se = j(p, se.value, _)),
            se !== null &&
              ((g = n(se, g, W)),
              ae === null ? (Z = se) : (ae.sibling = se),
              (ae = se));
        return de && _l(p, W), Z;
      }
      for (K = a(K); !se.done; W++, se = x.next())
        (se = R(K, p, W, se.value, _)),
          se !== null &&
            (e &&
              se.alternate !== null &&
              K.delete(se.key === null ? W : se.key),
            (g = n(se, g, W)),
            ae === null ? (Z = se) : (ae.sibling = se),
            (ae = se));
      return (
        e &&
          K.forEach(function (M0) {
            return t(p, M0);
          }),
        de && _l(p, W),
        Z
      );
    }
    function pe(p, g, x, _) {
      if (
        (typeof x == 'object' &&
          x !== null &&
          x.type === H &&
          x.key === null &&
          (x = x.props.children),
        typeof x == 'object' && x !== null)
      ) {
        switch (x.$$typeof) {
          case U:
            e: {
              for (var Z = x.key; g !== null; ) {
                if (g.key === Z) {
                  if (((Z = x.type), Z === H)) {
                    if (g.tag === 7) {
                      l(p, g.sibling),
                        (_ = u(g, x.props.children)),
                        (_.return = p),
                        (p = _);
                      break e;
                    }
                  } else if (
                    g.elementType === Z ||
                    (typeof Z == 'object' &&
                      Z !== null &&
                      Z.$$typeof === oe &&
                      qs(Z) === g.type)
                  ) {
                    l(p, g.sibling),
                      (_ = u(g, x.props)),
                      cu(_, x),
                      (_.return = p),
                      (p = _);
                    break e;
                  }
                  l(p, g);
                  break;
                } else t(p, g);
                g = g.sibling;
              }
              x.type === H
                ? ((_ = Ol(x.props.children, p.mode, _, x.key)),
                  (_.return = p),
                  (p = _))
                : ((_ = ln(x.type, x.key, x.props, null, p.mode, _)),
                  cu(_, x),
                  (_.return = p),
                  (p = _));
            }
            return i(p);
          case q:
            e: {
              for (Z = x.key; g !== null; ) {
                if (g.key === Z)
                  if (
                    g.tag === 4 &&
                    g.stateNode.containerInfo === x.containerInfo &&
                    g.stateNode.implementation === x.implementation
                  ) {
                    l(p, g.sibling),
                      (_ = u(g, x.children || [])),
                      (_.return = p),
                      (p = _);
                    break e;
                  } else {
                    l(p, g);
                    break;
                  }
                else t(p, g);
                g = g.sibling;
              }
              (_ = Gi(x, p.mode, _)), (_.return = p), (p = _);
            }
            return i(p);
          case oe:
            return (Z = x._init), (x = Z(x._payload)), pe(p, g, x, _);
        }
        if (Ze(x)) return P(p, g, x, _);
        if (Qe(x)) {
          if (((Z = Qe(x)), typeof Z != 'function')) throw Error(r(150));
          return (x = Z.call(x)), k(p, g, x, _);
        }
        if (typeof x.then == 'function') return pe(p, g, Sn(x), _);
        if (x.$$typeof === X) return pe(p, g, cn(p, x), _);
        xn(p, x);
      }
      return (typeof x == 'string' && x !== '') ||
        typeof x == 'number' ||
        typeof x == 'bigint'
        ? ((x = '' + x),
          g !== null && g.tag === 6
            ? (l(p, g.sibling), (_ = u(g, x)), (_.return = p), (p = _))
            : (l(p, g), (_ = Li(x, p.mode, _)), (_.return = p), (p = _)),
          i(p))
        : l(p, g);
    }
    return function (p, g, x, _) {
      try {
        iu = 0;
        var Z = pe(p, g, x, _);
        return (ma = null), Z;
      } catch (K) {
        if (K === Fa || K === rn) throw K;
        var ae = nt(29, K, null, p.mode);
        return (ae.lanes = _), (ae.return = p), ae;
      } finally {
      }
    };
  }
  var ya = Ys(!0),
    Ls = Ys(!1),
    gt = C(null),
    Nt = null;
  function nl(e) {
    var t = e.alternate;
    Y(Ce, Ce.current & 1),
      Y(gt, e),
      Nt === null &&
        (t === null || sa.current !== null || t.memoizedState !== null) &&
        (Nt = e);
  }
  function Gs(e) {
    if (e.tag === 22) {
      if ((Y(Ce, Ce.current), Y(gt, e), Nt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Nt = e);
      }
    } else il();
  }
  function il() {
    Y(Ce, Ce.current), Y(gt, gt.current);
  }
  function Yt(e) {
    Q(gt), Nt === e && (Nt = null), Q(Ce);
  }
  var Ce = C(0);
  function En(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === '$?' || sf(l))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function Sc(e, t, l, a) {
    (t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : A({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var xc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        u = ll(a);
      (u.payload = t),
        l != null && (u.callback = l),
        (t = al(e, u, a)),
        t !== null && (st(t, e, a), Ia(t, e, a));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        u = ll(a);
      (u.tag = 1),
        (u.payload = t),
        l != null && (u.callback = l),
        (t = al(e, u, a)),
        t !== null && (st(t, e, a), Ia(t, e, a));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = rt(),
        a = ll(l);
      (a.tag = 2),
        t != null && (a.callback = t),
        (t = al(e, a, l)),
        t !== null && (st(t, e, l), Ia(t, e, l));
    },
  };
  function Xs(e, t, l, a, u, n, i) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(a, n, i)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Qa(l, a) || !Qa(u, n)
        : !0
    );
  }
  function Qs(e, t, l, a) {
    (e = t.state),
      typeof t.componentWillReceiveProps == 'function' &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && xc.enqueueReplaceState(t, t.state, null);
  }
  function ql(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var a in t) a !== 'ref' && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = A({}, l));
      for (var u in e) l[u] === void 0 && (l[u] = e[u]);
    }
    return l;
  }
  var Tn =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          if (
            typeof window == 'object' &&
            typeof window.ErrorEvent == 'function'
          ) {
            var t = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == 'object' &&
                e !== null &&
                typeof e.message == 'string'
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == 'object' &&
            typeof process.emit == 'function'
          ) {
            process.emit('uncaughtException', e);
            return;
          }
          console.error(e);
        };
  function Zs(e) {
    Tn(e);
  }
  function Vs(e) {
    console.error(e);
  }
  function Ks(e) {
    Tn(e);
  }
  function An(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Js(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Ec(e, t, l) {
    return (
      (l = ll(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        An(e, t);
      }),
      l
    );
  }
  function ks(e) {
    return (e = ll(e)), (e.tag = 3), e;
  }
  function $s(e, t, l, a) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var n = a.value;
      (e.payload = function () {
        return u(n);
      }),
        (e.callback = function () {
          Js(t, l, a);
        });
    }
    var i = l.stateNode;
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (e.callback = function () {
        Js(t, l, a),
          typeof u != 'function' &&
            (dl === null ? (dl = new Set([this])) : dl.add(this));
        var f = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: f !== null ? f : '',
        });
      });
  }
  function Mm(e, t, l, a, u) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == 'object' && typeof a.then == 'function')
    ) {
      if (
        ((t = l.alternate),
        t !== null && ka(t, l, u, !0),
        (l = gt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              Nt === null ? Kc() : l.alternate === null && De === 0 && (De = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              a === Fi
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  kc(e, a, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Fi
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  kc(e, a, u)),
              !1
            );
        }
        throw Error(r(435, l.tag));
      }
      return kc(e, a, u), Kc(), !1;
    }
    if (de)
      return (
        (t = gt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            a !== Zi && ((e = Error(r(422), { cause: a })), Ja(ht(e, l))))
          : (a !== Zi && ((t = Error(r(423), { cause: a })), Ja(ht(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (a = ht(a, l)),
            (u = Ec(e.stateNode, a, u)),
            ec(e, u),
            De !== 4 && (De = 2)),
        !1
      );
    var n = Error(r(520), { cause: a });
    if (
      ((n = ht(n, l)),
      mu === null ? (mu = [n]) : mu.push(n),
      De !== 4 && (De = 2),
      t === null)
    )
      return !0;
    (a = ht(a, l)), (l = t);
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = u & -u),
            (l.lanes |= e),
            (e = Ec(l.stateNode, a, e)),
            ec(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (n = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (n !== null &&
                  typeof n.componentDidCatch == 'function' &&
                  (dl === null || !dl.has(n)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = ks(u)),
              $s(u, e, l, a),
              ec(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Ws = Error(r(461)),
    we = !1;
  function Le(e, t, l, a) {
    t.child = e === null ? Ls(t, null, l, a) : ya(t, e.child, l, a);
  }
  function Fs(e, t, l, a, u) {
    l = l.render;
    var n = t.ref;
    if ('ref' in a) {
      var i = {};
      for (var f in a) f !== 'ref' && (i[f] = a[f]);
    } else i = a;
    return (
      Hl(t),
      (a = nc(e, t, l, i, n, u)),
      (f = ic()),
      e !== null && !we
        ? (cc(e, t, u), Lt(e, t, u))
        : (de && f && Xi(t), (t.flags |= 1), Le(e, t, a, u), t.child)
    );
  }
  function Ps(e, t, l, a, u) {
    if (e === null) {
      var n = l.type;
      return typeof n == 'function' &&
        !Yi(n) &&
        n.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = n), Is(e, t, n, a, u))
        : ((e = ln(l.type, null, a, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((n = e.child), !Mc(e, u))) {
      var i = n.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Qa), l(i, a) && e.ref === t.ref)
      )
        return Lt(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = Ut(n, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Is(e, t, l, a, u) {
    if (e !== null) {
      var n = e.memoizedProps;
      if (Qa(n, a) && e.ref === t.ref)
        if (((we = !1), (t.pendingProps = a = n), Mc(e, u)))
          (e.flags & 131072) !== 0 && (we = !0);
        else return (t.lanes = e.lanes), Lt(e, t, u);
    }
    return Tc(e, t, l, a, u);
  }
  function eo(e, t, l) {
    var a = t.pendingProps,
      u = a.children,
      n = e !== null ? e.memoizedState : null;
    if (a.mode === 'hidden') {
      if ((t.flags & 128) !== 0) {
        if (((a = n !== null ? n.baseLanes | l : l), e !== null)) {
          for (u = t.child = e.child, n = 0; u !== null; )
            (n = n | u.lanes | u.childLanes), (u = u.sibling);
          t.childLanes = n & ~a;
        } else (t.childLanes = 0), (t.child = null);
        return to(e, t, a, l);
      }
      if ((l & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && fn(t, n !== null ? n.cachePool : null),
          n !== null ? Ir(t, n) : lc(),
          Gs(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          to(e, t, n !== null ? n.baseLanes | l : l, l)
        );
    } else
      n !== null
        ? (fn(t, n.cachePool), Ir(t, n), il(), (t.memoizedState = null))
        : (e !== null && fn(t, null), lc(), il());
    return Le(e, t, u, l), t.child;
  }
  function to(e, t, l, a) {
    var u = Wi();
    return (
      (u = u === null ? null : { parent: Ue._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: l, cachePool: u }),
      e !== null && fn(t, null),
      lc(),
      Gs(t),
      e !== null && ka(e, t, a, !0),
      null
    );
  }
  function Nn(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(r(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Tc(e, t, l, a, u) {
    return (
      Hl(t),
      (l = nc(e, t, l, a, void 0, u)),
      (a = ic()),
      e !== null && !we
        ? (cc(e, t, u), Lt(e, t, u))
        : (de && a && Xi(t), (t.flags |= 1), Le(e, t, l, u), t.child)
    );
  }
  function lo(e, t, l, a, u, n) {
    return (
      Hl(t),
      (t.updateQueue = null),
      (l = ts(t, a, l, u)),
      es(e),
      (a = ic()),
      e !== null && !we
        ? (cc(e, t, n), Lt(e, t, n))
        : (de && a && Xi(t), (t.flags |= 1), Le(e, t, l, n), t.child)
    );
  }
  function ao(e, t, l, a, u) {
    if ((Hl(t), t.stateNode === null)) {
      var n = na,
        i = l.contextType;
      typeof i == 'object' && i !== null && (n = Ke(i)),
        (n = new l(a, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = xc),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = a),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Pi(t),
        (i = l.contextType),
        (n.context = typeof i == 'object' && i !== null ? Ke(i) : na),
        (n.state = t.memoizedState),
        (i = l.getDerivedStateFromProps),
        typeof i == 'function' && (Sc(t, l, i, a), (n.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof n.getSnapshotBeforeUpdate == 'function' ||
          (typeof n.UNSAFE_componentWillMount != 'function' &&
            typeof n.componentWillMount != 'function') ||
          ((i = n.state),
          typeof n.componentWillMount == 'function' && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == 'function' &&
            n.UNSAFE_componentWillMount(),
          i !== n.state && xc.enqueueReplaceState(n, n.state, null),
          tu(t, a, n, u),
          eu(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == 'function' && (t.flags |= 4194308),
        (a = !0);
    } else if (e === null) {
      n = t.stateNode;
      var f = t.memoizedProps,
        m = ql(l, f);
      n.props = m;
      var E = n.context,
        O = l.contextType;
      (i = na), typeof O == 'object' && O !== null && (i = Ke(O));
      var j = l.getDerivedStateFromProps;
      (O =
        typeof j == 'function' ||
        typeof n.getSnapshotBeforeUpdate == 'function'),
        (f = t.pendingProps !== f),
        O ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((f || E !== i) && Qs(t, n, a, i)),
        (tl = !1);
      var T = t.memoizedState;
      (n.state = T),
        tu(t, a, n, u),
        eu(),
        (E = t.memoizedState),
        f || T !== E || tl
          ? (typeof j == 'function' && (Sc(t, l, j, a), (E = t.memoizedState)),
            (m = tl || Xs(t, l, m, a, T, E, i))
              ? (O ||
                  (typeof n.UNSAFE_componentWillMount != 'function' &&
                    typeof n.componentWillMount != 'function') ||
                  (typeof n.componentWillMount == 'function' &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == 'function' &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == 'function' &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = E)),
            (n.props = a),
            (n.state = E),
            (n.context = i),
            (a = m))
          : (typeof n.componentDidMount == 'function' && (t.flags |= 4194308),
            (a = !1));
    } else {
      (n = t.stateNode),
        Ii(e, t),
        (i = t.memoizedProps),
        (O = ql(l, i)),
        (n.props = O),
        (j = t.pendingProps),
        (T = n.context),
        (E = l.contextType),
        (m = na),
        typeof E == 'object' && E !== null && (m = Ke(E)),
        (f = l.getDerivedStateFromProps),
        (E =
          typeof f == 'function' ||
          typeof n.getSnapshotBeforeUpdate == 'function') ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((i !== j || T !== m) && Qs(t, n, a, m)),
        (tl = !1),
        (T = t.memoizedState),
        (n.state = T),
        tu(t, a, n, u),
        eu();
      var R = t.memoizedState;
      i !== j ||
      T !== R ||
      tl ||
      (e !== null && e.dependencies !== null && nn(e.dependencies))
        ? (typeof f == 'function' && (Sc(t, l, f, a), (R = t.memoizedState)),
          (O =
            tl ||
            Xs(t, l, O, a, T, R, m) ||
            (e !== null && e.dependencies !== null && nn(e.dependencies)))
            ? (E ||
                (typeof n.UNSAFE_componentWillUpdate != 'function' &&
                  typeof n.componentWillUpdate != 'function') ||
                (typeof n.componentWillUpdate == 'function' &&
                  n.componentWillUpdate(a, R, m),
                typeof n.UNSAFE_componentWillUpdate == 'function' &&
                  n.UNSAFE_componentWillUpdate(a, R, m)),
              typeof n.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == 'function' &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != 'function' ||
                (i === e.memoizedProps && T === e.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != 'function' ||
                (i === e.memoizedProps && T === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = R)),
          (n.props = a),
          (n.state = R),
          (n.context = m),
          (a = O))
        : (typeof n.componentDidUpdate != 'function' ||
            (i === e.memoizedProps && T === e.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != 'function' ||
            (i === e.memoizedProps && T === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      Nn(e, t),
      (a = (t.flags & 128) !== 0),
      n || a
        ? ((n = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != 'function'
              ? null
              : n.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = ya(t, e.child, null, u)),
              (t.child = ya(t, null, l, u)))
            : Le(e, t, l, u),
          (t.memoizedState = n.state),
          (e = t.child))
        : (e = Lt(e, t, u)),
      e
    );
  }
  function uo(e, t, l, a) {
    return Ka(), (t.flags |= 256), Le(e, t, l, a), t.child;
  }
  var Ac = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Nc(e) {
    return { baseLanes: e, cachePool: Vr() };
  }
  function Rc(e, t, l) {
    return (e = e !== null ? e.childLanes & ~l : 0), t && (e |= bt), e;
  }
  function no(e, t, l) {
    var a = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      i;
    if (
      ((i = n) ||
        (i =
          e !== null && e.memoizedState === null ? !1 : (Ce.current & 2) !== 0),
      i && ((u = !0), (t.flags &= -129)),
      (i = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (de) {
        if ((u ? nl(t) : il(), de)) {
          var f = ze,
            m;
          if ((m = f)) {
            e: {
              for (m = f, f = At; m.nodeType !== 8; ) {
                if (!f) {
                  f = null;
                  break e;
                }
                if (((m = Et(m.nextSibling)), m === null)) {
                  f = null;
                  break e;
                }
              }
              f = m;
            }
            f !== null
              ? ((t.memoizedState = {
                  dehydrated: f,
                  treeContext: Ml !== null ? { id: Ct, overflow: Ht } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (m = nt(18, null, null, 0)),
                (m.stateNode = f),
                (m.return = t),
                (t.child = m),
                (ke = t),
                (ze = null),
                (m = !0))
              : (m = !1);
          }
          m || Ul(t);
        }
        if (
          ((f = t.memoizedState),
          f !== null && ((f = f.dehydrated), f !== null))
        )
          return sf(f) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        Yt(t);
      }
      return (
        (f = a.children),
        (a = a.fallback),
        u
          ? (il(),
            (u = t.mode),
            (f = Rn({ mode: 'hidden', children: f }, u)),
            (a = Ol(a, u, l, null)),
            (f.return = t),
            (a.return = t),
            (f.sibling = a),
            (t.child = f),
            (u = t.child),
            (u.memoizedState = Nc(l)),
            (u.childLanes = Rc(e, i, l)),
            (t.memoizedState = Ac),
            a)
          : (nl(t), zc(t, f))
      );
    }
    if (
      ((m = e.memoizedState), m !== null && ((f = m.dehydrated), f !== null))
    ) {
      if (n)
        t.flags & 256
          ? (nl(t), (t.flags &= -257), (t = Dc(e, t, l)))
          : t.memoizedState !== null
          ? (il(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (il(),
            (u = a.fallback),
            (f = t.mode),
            (a = Rn({ mode: 'visible', children: a.children }, f)),
            (u = Ol(u, f, l, null)),
            (u.flags |= 2),
            (a.return = t),
            (u.return = t),
            (a.sibling = u),
            (t.child = a),
            ya(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = Nc(l)),
            (a.childLanes = Rc(e, i, l)),
            (t.memoizedState = Ac),
            (t = u));
      else if ((nl(t), sf(f))) {
        if (((i = f.nextSibling && f.nextSibling.dataset), i)) var E = i.dgst;
        (i = E),
          (a = Error(r(419))),
          (a.stack = ''),
          (a.digest = i),
          Ja({ value: a, source: null, stack: null }),
          (t = Dc(e, t, l));
      } else if (
        (we || ka(e, t, l, !1), (i = (l & e.childLanes) !== 0), we || i)
      ) {
        if (
          ((i = Ee),
          i !== null &&
            ((a = l & -l),
            (a = (a & 42) !== 0 ? 1 : si(a)),
            (a = (a & (i.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== m.retryLane))
        )
          throw ((m.retryLane = a), ua(e, a), st(i, e, a), Ws);
        f.data === '$?' || Kc(), (t = Dc(e, t, l));
      } else
        f.data === '$?'
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = m.treeContext),
            (ze = Et(f.nextSibling)),
            (ke = t),
            (de = !0),
            (jl = null),
            (At = !1),
            e !== null &&
              ((yt[vt++] = Ct),
              (yt[vt++] = Ht),
              (yt[vt++] = Ml),
              (Ct = e.id),
              (Ht = e.overflow),
              (Ml = t)),
            (t = zc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (il(),
        (u = a.fallback),
        (f = t.mode),
        (m = e.child),
        (E = m.sibling),
        (a = Ut(m, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = m.subtreeFlags & 65011712),
        E !== null ? (u = Ut(E, u)) : ((u = Ol(u, f, l, null)), (u.flags |= 2)),
        (u.return = t),
        (a.return = t),
        (a.sibling = u),
        (t.child = a),
        (a = u),
        (u = t.child),
        (f = e.child.memoizedState),
        f === null
          ? (f = Nc(l))
          : ((m = f.cachePool),
            m !== null
              ? ((E = Ue._currentValue),
                (m = m.parent !== E ? { parent: E, pool: E } : m))
              : (m = Vr()),
            (f = { baseLanes: f.baseLanes | l, cachePool: m })),
        (u.memoizedState = f),
        (u.childLanes = Rc(e, i, l)),
        (t.memoizedState = Ac),
        a)
      : (nl(t),
        (l = e.child),
        (e = l.sibling),
        (l = Ut(l, { mode: 'visible', children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((i = t.deletions),
          i === null ? ((t.deletions = [e]), (t.flags |= 16)) : i.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function zc(e, t) {
    return (
      (t = Rn({ mode: 'visible', children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Rn(e, t) {
    return (
      (e = nt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Dc(e, t, l) {
    return (
      ya(t, e.child, null, l),
      (e = zc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function io(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Ki(e.return, t, l);
  }
  function Oc(e, t, l, a, u) {
    var n = e.memoizedState;
    n === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: u,
        })
      : ((n.isBackwards = t),
        (n.rendering = null),
        (n.renderingStartTime = 0),
        (n.last = a),
        (n.tail = l),
        (n.tailMode = u));
  }
  function co(e, t, l) {
    var a = t.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    if ((Le(e, t, a.children, l), (a = Ce.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && io(e, l, t);
          else if (e.tag === 19) io(e, l, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      a &= 1;
    }
    switch ((Y(Ce, a), u)) {
      case 'forwards':
        for (l = t.child, u = null; l !== null; )
          (e = l.alternate),
            e !== null && En(e) === null && (u = l),
            (l = l.sibling);
        (l = u),
          l === null
            ? ((u = t.child), (t.child = null))
            : ((u = l.sibling), (l.sibling = null)),
          Oc(t, !1, u, l, n);
        break;
      case 'backwards':
        for (l = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && En(e) === null)) {
            t.child = u;
            break;
          }
          (e = u.sibling), (u.sibling = l), (l = u), (u = e);
        }
        Oc(t, !0, l, null, n);
        break;
      case 'together':
        Oc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Lt(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (ol |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ka(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, l = Ut(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (l = l.sibling = Ut(e, e.pendingProps)),
          (l.return = t);
      l.sibling = null;
    }
    return t.child;
  }
  function Mc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && nn(e)));
  }
  function _m(e, t, l) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo),
          el(t, Ue, e.memoizedState.cache),
          Ka();
        break;
      case 27:
      case 5:
        ni(t);
        break;
      case 4:
        Te(t, t.stateNode.containerInfo);
        break;
      case 10:
        el(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (nl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
            ? no(e, t, l)
            : (nl(t), (e = Lt(e, t, l)), e !== null ? e.sibling : null);
        nl(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (ka(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          u)
        ) {
          if (a) return co(e, t, l);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Y(Ce, Ce.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), eo(e, t, l);
      case 24:
        el(t, Ue, e.memoizedState.cache);
    }
    return Lt(e, t, l);
  }
  function fo(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) we = !0;
      else {
        if (!Mc(e, l) && (t.flags & 128) === 0) return (we = !1), _m(e, t, l);
        we = (e.flags & 131072) !== 0;
      }
    else (we = !1), de && (t.flags & 1048576) !== 0 && qr(t, un, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            u = a._init;
          if (((a = u(a._payload)), (t.type = a), typeof a == 'function'))
            Yi(a)
              ? ((e = ql(a, e)), (t.tag = 1), (t = ao(null, t, a, e, l)))
              : ((t.tag = 0), (t = Tc(null, t, a, e, l)));
          else {
            if (a != null) {
              if (((u = a.$$typeof), u === ie)) {
                (t.tag = 11), (t = Fs(null, t, a, e, l));
                break e;
              } else if (u === fe) {
                (t.tag = 14), (t = Ps(null, t, a, e, l));
                break e;
              }
            }
            throw ((t = Tl(a) || a), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return Tc(e, t, t.type, t.pendingProps, l);
      case 1:
        return (a = t.type), (u = ql(a, t.pendingProps)), ao(e, t, a, u, l);
      case 3:
        e: {
          if ((Te(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          (u = n.element), Ii(e, t), tu(t, a, null, l);
          var i = t.memoizedState;
          if (
            ((a = i.cache),
            el(t, Ue, a),
            a !== n.cache && Ji(t, [Ue], l, !0),
            eu(),
            (a = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: i.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = uo(e, t, a, l);
              break e;
            } else if (a !== u) {
              (u = ht(Error(r(424)), t)), Ja(u), (t = uo(e, t, a, l));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e;
              }
              for (
                ze = Et(e.firstChild),
                  ke = t,
                  de = !0,
                  jl = null,
                  At = !0,
                  l = Ls(t, null, a, l),
                  t.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
            }
          else {
            if ((Ka(), a === u)) {
              t = Lt(e, t, l);
              break e;
            }
            Le(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Nn(e, t),
          e === null
            ? (l = hd(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : de ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Ln(ee.current).createElement(l)),
                (a[Ve] = t),
                (a[We] = e),
                Xe(a, l, e),
                He(a),
                (t.stateNode = a))
            : (t.memoizedState = hd(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          ni(t),
          e === null &&
            de &&
            ((a = t.stateNode = sd(t.type, t.pendingProps, ee.current)),
            (ke = t),
            (At = !0),
            (u = ze),
            yl(t.type) ? ((of = u), (ze = Et(a.firstChild))) : (ze = u)),
          Le(e, t, t.pendingProps.children, l),
          Nn(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            de &&
            ((u = a = ze) &&
              ((a = n0(a, t.type, t.pendingProps, At)),
              a !== null
                ? ((t.stateNode = a),
                  (ke = t),
                  (ze = Et(a.firstChild)),
                  (At = !1),
                  (u = !0))
                : (u = !1)),
            u || Ul(t)),
          ni(t),
          (u = t.type),
          (n = t.pendingProps),
          (i = e !== null ? e.memoizedProps : null),
          (a = n.children),
          cf(u, n) ? (a = null) : i !== null && cf(u, i) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = nc(e, t, Tm, null, null, l)), (Tu._currentValue = u)),
          Nn(e, t),
          Le(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            de &&
            ((e = l = ze) &&
              ((l = i0(l, t.pendingProps, At)),
              l !== null
                ? ((t.stateNode = l), (ke = t), (ze = null), (e = !0))
                : (e = !1)),
            e || Ul(t)),
          null
        );
      case 13:
        return no(e, t, l);
      case 4:
        return (
          Te(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = ya(t, null, a, l)) : Le(e, t, a, l),
          t.child
        );
      case 11:
        return Fs(e, t, t.type, t.pendingProps, l);
      case 7:
        return Le(e, t, t.pendingProps, l), t.child;
      case 8:
        return Le(e, t, t.pendingProps.children, l), t.child;
      case 12:
        return Le(e, t, t.pendingProps.children, l), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          el(t, t.type, a.value),
          Le(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (a = t.pendingProps.children),
          Hl(t),
          (u = Ke(u)),
          (a = a(u)),
          (t.flags |= 1),
          Le(e, t, a, l),
          t.child
        );
      case 14:
        return Ps(e, t, t.type, t.pendingProps, l);
      case 15:
        return Is(e, t, t.type, t.pendingProps, l);
      case 19:
        return co(e, t, l);
      case 31:
        return (
          (a = t.pendingProps),
          (l = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((l = Rn(a, l)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l))
            : ((l = Ut(e.child, a)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l)),
          t
        );
      case 22:
        return eo(e, t, l);
      case 24:
        return (
          Hl(t),
          (a = Ke(Ue)),
          e === null
            ? ((u = Wi()),
              u === null &&
                ((u = Ee),
                (n = ki()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= l),
                (u = n)),
              (t.memoizedState = { parent: a, cache: u }),
              Pi(t),
              el(t, Ue, u))
            : ((e.lanes & l) !== 0 && (Ii(e, t), tu(t, null, null, l), eu()),
              (u = e.memoizedState),
              (n = t.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  el(t, Ue, a))
                : ((a = n.cache),
                  el(t, Ue, a),
                  a !== u.cache && Ji(t, [Ue], l, !0))),
          Le(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Gt(e) {
    e.flags |= 4;
  }
  function ro(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !bd(t))) {
      if (
        ((t = gt.current),
        t !== null &&
          ((ce & 4194048) === ce
            ? Nt !== null
            : ((ce & 62914560) !== ce && (ce & 536870912) === 0) || t !== Nt))
      )
        throw ((Pa = Fi), Kr);
      e.flags |= 8192;
    }
  }
  function zn(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Gf() : 536870912), (e.lanes |= t), (pa |= t));
  }
  function fu(e, t) {
    if (!de)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), (t = t.sibling);
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = e.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), (l = l.sibling);
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Ne(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var u = e.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling);
    else
      for (u = e.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = e),
          (u = u.sibling);
    return (e.subtreeFlags |= a), (e.childLanes = l), t;
  }
  function jm(e, t, l) {
    var a = t.pendingProps;
    switch ((Qi(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ne(t), null;
      case 1:
        return Ne(t), null;
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Bt(Ue),
          Wt(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Va(t)
              ? Gt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Gr())),
          Ne(t),
          null
        );
      case 26:
        return (
          (l = t.memoizedState),
          e === null
            ? (Gt(t),
              l !== null ? (Ne(t), ro(t, l)) : (Ne(t), (t.flags &= -16777217)))
            : l
            ? l !== e.memoizedState
              ? (Gt(t), Ne(t), ro(t, l))
              : (Ne(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && Gt(t), Ne(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        Bu(t), (l = ee.current);
        var u = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && Gt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return Ne(t), null;
          }
          (e = J.current),
            Va(t) ? Yr(t) : ((e = sd(u, a, l)), (t.stateNode = e), Gt(t));
        }
        return Ne(t), null;
      case 5:
        if ((Bu(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Gt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return Ne(t), null;
          }
          if (((e = J.current), Va(t))) Yr(t);
          else {
            switch (((u = Ln(ee.current)), e)) {
              case 1:
                e = u.createElementNS('http://www.w3.org/2000/svg', l);
                break;
              case 2:
                e = u.createElementNS('http://www.w3.org/1998/Math/MathML', l);
                break;
              default:
                switch (l) {
                  case 'svg':
                    e = u.createElementNS('http://www.w3.org/2000/svg', l);
                    break;
                  case 'math':
                    e = u.createElementNS(
                      'http://www.w3.org/1998/Math/MathML',
                      l
                    );
                    break;
                  case 'script':
                    (e = u.createElement('div')),
                      (e.innerHTML = '<script></script>'),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case 'select':
                    (e =
                      typeof a.is == 'string'
                        ? u.createElement('select', { is: a.is })
                        : u.createElement('select')),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size);
                    break;
                  default:
                    e =
                      typeof a.is == 'string'
                        ? u.createElement(l, { is: a.is })
                        : u.createElement(l);
                }
            }
            (e[Ve] = t), (e[We] = a);
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            t.stateNode = e;
            e: switch ((Xe(e, l, a), l)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                e = !!a.autoFocus;
                break e;
              case 'img':
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Gt(t);
          }
        }
        return Ne(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Gt(t);
        else {
          if (typeof a != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = ee.current), Va(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (u = ke),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            (e[Ve] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                ad(e.nodeValue, l)
              )),
              e || Ul(t);
          } else (e = Ln(e).createTextNode(a)), (e[Ve] = t), (t.stateNode = e);
        }
        return Ne(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = Va(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[Ve] = t;
            } else
              Ka(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Ne(t), (u = !1);
          } else
            (u = Gr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
        }
        if ((Yt(t), (t.flags & 128) !== 0)) return (t.lanes = l), t;
        if (
          ((l = a !== null), (e = e !== null && e.memoizedState !== null), l)
        ) {
          (a = t.child),
            (u = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (u = a.alternate.memoizedState.cachePool.pool);
          var n = null;
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (n = a.memoizedState.cachePool.pool),
            n !== u && (a.flags |= 2048);
        }
        return (
          l !== e && l && (t.child.flags |= 8192),
          zn(t, t.updateQueue),
          Ne(t),
          null
        );
      case 4:
        return Wt(), e === null && tf(t.stateNode.containerInfo), Ne(t), null;
      case 10:
        return Bt(t.type), Ne(t), null;
      case 19:
        if ((Q(Ce), (u = t.memoizedState), u === null)) return Ne(t), null;
        if (((a = (t.flags & 128) !== 0), (n = u.rendering), n === null))
          if (a) fu(u, !1);
          else {
            if (De !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((n = En(e)), n !== null)) {
                  for (
                    t.flags |= 128,
                      fu(u, !1),
                      e = n.updateQueue,
                      t.updateQueue = e,
                      zn(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;

                  )
                    Br(l, e), (l = l.sibling);
                  return Y(Ce, (Ce.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null &&
              Tt() > Mn &&
              ((t.flags |= 128), (a = !0), fu(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = En(n)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                zn(t, e),
                fu(u, !0),
                u.tail === null &&
                  u.tailMode === 'hidden' &&
                  !n.alternate &&
                  !de)
              )
                return Ne(t), null;
            } else
              2 * Tt() - u.renderingStartTime > Mn &&
                l !== 536870912 &&
                ((t.flags |= 128), (a = !0), fu(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((e = u.last),
              e !== null ? (e.sibling = n) : (t.child = n),
              (u.last = n));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = Tt()),
            (t.sibling = null),
            (e = Ce.current),
            Y(Ce, a ? (e & 1) | 2 : e & 1),
            t)
          : (Ne(t), null);
      case 22:
      case 23:
        return (
          Yt(t),
          ac(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ne(t),
          (l = t.updateQueue),
          l !== null && zn(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && Q(wl),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Bt(Ue),
          Ne(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function Um(e, t) {
    switch ((Qi(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Bt(Ue),
          Wt(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Bu(t), null;
      case 13:
        if (
          (Yt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          Ka();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return Q(Ce), null;
      case 4:
        return Wt(), null;
      case 10:
        return Bt(t.type), null;
      case 22:
      case 23:
        return (
          Yt(t),
          ac(),
          e !== null && Q(wl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return Bt(Ue), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function so(e, t) {
    switch ((Qi(t), t.tag)) {
      case 3:
        Bt(Ue), Wt();
        break;
      case 26:
      case 27:
      case 5:
        Bu(t);
        break;
      case 4:
        Wt();
        break;
      case 13:
        Yt(t);
        break;
      case 19:
        Q(Ce);
        break;
      case 10:
        Bt(t.type);
        break;
      case 22:
      case 23:
        Yt(t), ac(), e !== null && Q(wl);
        break;
      case 24:
        Bt(Ue);
    }
  }
  function ru(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var n = l.create,
              i = l.inst;
            (a = n()), (i.destroy = a);
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (f) {
      xe(t, t.return, f);
    }
  }
  function cl(e, t, l) {
    try {
      var a = t.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            var i = a.inst,
              f = i.destroy;
            if (f !== void 0) {
              (i.destroy = void 0), (u = t);
              var m = l,
                E = f;
              try {
                E();
              } catch (O) {
                xe(u, m, O);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (O) {
      xe(t, t.return, O);
    }
  }
  function oo(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Pr(t, l);
      } catch (a) {
        xe(e, e.return, a);
      }
    }
  }
  function ho(e, t, l) {
    (l.props = ql(e.type, e.memoizedProps)), (l.state = e.memoizedState);
    try {
      l.componentWillUnmount();
    } catch (a) {
      xe(e, t, a);
    }
  }
  function su(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == 'function' ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (u) {
      xe(e, t, u);
    }
  }
  function Rt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (u) {
          xe(e, t, u);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          xe(e, t, u);
        }
      else l.current = null;
  }
  function mo(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break e;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (u) {
      xe(e, e.return, u);
    }
  }
  function _c(e, t, l) {
    try {
      var a = e.stateNode;
      e0(a, e.type, l, t), (a[We] = t);
    } catch (u) {
      xe(e, e.return, u);
    }
  }
  function yo(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && yl(e.type)) ||
      e.tag === 4
    );
  }
  function jc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || yo(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && yl(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Uc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
              ? l.ownerDocument.body
              : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Yn));
    else if (
      a !== 4 &&
      (a === 27 && yl(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Uc(e, t, l), e = e.sibling; e !== null; )
        Uc(e, t, l), (e = e.sibling);
  }
  function Dn(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (
      a !== 4 &&
      (a === 27 && yl(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (Dn(e, t, l), e = e.sibling; e !== null; )
        Dn(e, t, l), (e = e.sibling);
  }
  function vo(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Xe(t, a, l), (t[Ve] = e), (t[We] = l);
    } catch (n) {
      xe(e, e.return, n);
    }
  }
  var Xt = !1,
    Me = !1,
    Cc = !1,
    go = typeof WeakSet == 'function' ? WeakSet : Set,
    Be = null;
  function Cm(e, t) {
    if (((e = e.containerInfo), (uf = Kn), (e = zr(e)), ji(e))) {
      if ('selectionStart' in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, n.nodeType;
            } catch {
              l = null;
              break e;
            }
            var i = 0,
              f = -1,
              m = -1,
              E = 0,
              O = 0,
              j = e,
              T = null;
            t: for (;;) {
              for (
                var R;
                j !== l || (u !== 0 && j.nodeType !== 3) || (f = i + u),
                  j !== n || (a !== 0 && j.nodeType !== 3) || (m = i + a),
                  j.nodeType === 3 && (i += j.nodeValue.length),
                  (R = j.firstChild) !== null;

              )
                (T = j), (j = R);
              for (;;) {
                if (j === e) break t;
                if (
                  (T === l && ++E === u && (f = i),
                  T === n && ++O === a && (m = i),
                  (R = j.nextSibling) !== null)
                )
                  break;
                (j = T), (T = j.parentNode);
              }
              j = R;
            }
            l = f === -1 || m === -1 ? null : { start: f, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      nf = { focusedElem: e, selectionRange: l }, Kn = !1, Be = t;
      Be !== null;

    )
      if (
        ((t = Be), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (Be = e);
      else
        for (; Be !== null; ) {
          switch (((t = Be), (n = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && n !== null) {
                (e = void 0),
                  (l = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = l.stateNode);
                try {
                  var P = ql(l.type, u, l.elementType === l.type);
                  (e = a.getSnapshotBeforeUpdate(P, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = e);
                } catch (k) {
                  xe(l, l.return, k);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  rf(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      rf(e);
                      break;
                    default:
                      e.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Be = e);
            break;
          }
          Be = t.return;
        }
  }
  function bo(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        fl(e, l), a & 4 && ru(5, l);
        break;
      case 1:
        if ((fl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (i) {
              xe(l, l.return, i);
            }
          else {
            var u = ql(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              xe(l, l.return, i);
            }
          }
        a & 64 && oo(l), a & 512 && su(l, l.return);
        break;
      case 3:
        if ((fl(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Pr(e, t);
          } catch (i) {
            xe(l, l.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && vo(l);
      case 26:
      case 5:
        fl(e, l), t === null && a & 4 && mo(l), a & 512 && su(l, l.return);
        break;
      case 12:
        fl(e, l);
        break;
      case 13:
        fl(e, l),
          a & 4 && xo(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = Qm.bind(null, l)), c0(e, l))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Xt), !a)) {
          (t = (t !== null && t.memoizedState !== null) || Me), (u = Xt);
          var n = Me;
          (Xt = a),
            (Me = t) && !n ? rl(e, l, (l.subtreeFlags & 8772) !== 0) : fl(e, l),
            (Xt = u),
            (Me = n);
        }
        break;
      case 30:
        break;
      default:
        fl(e, l);
    }
  }
  function po(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), po(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && hi(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Ae = null,
    Ie = !1;
  function Qt(e, t, l) {
    for (l = l.child; l !== null; ) So(e, t, l), (l = l.sibling);
  }
  function So(e, t, l) {
    if (lt && typeof lt.onCommitFiberUnmount == 'function')
      try {
        lt.onCommitFiberUnmount(_a, l);
      } catch {}
    switch (l.tag) {
      case 26:
        Me || Rt(l, t),
          Qt(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
        break;
      case 27:
        Me || Rt(l, t);
        var a = Ae,
          u = Ie;
        yl(l.type) && ((Ae = l.stateNode), (Ie = !1)),
          Qt(e, t, l),
          pu(l.stateNode),
          (Ae = a),
          (Ie = u);
        break;
      case 5:
        Me || Rt(l, t);
      case 6:
        if (
          ((a = Ae),
          (u = Ie),
          (Ae = null),
          Qt(e, t, l),
          (Ae = a),
          (Ie = u),
          Ae !== null)
        )
          if (Ie)
            try {
              (Ae.nodeType === 9
                ? Ae.body
                : Ae.nodeName === 'HTML'
                ? Ae.ownerDocument.body
                : Ae
              ).removeChild(l.stateNode);
            } catch (n) {
              xe(l, t, n);
            }
          else
            try {
              Ae.removeChild(l.stateNode);
            } catch (n) {
              xe(l, t, n);
            }
        break;
      case 18:
        Ae !== null &&
          (Ie
            ? ((e = Ae),
              fd(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === 'HTML'
                  ? e.ownerDocument.body
                  : e,
                l.stateNode
              ),
              zu(e))
            : fd(Ae, l.stateNode));
        break;
      case 4:
        (a = Ae),
          (u = Ie),
          (Ae = l.stateNode.containerInfo),
          (Ie = !0),
          Qt(e, t, l),
          (Ae = a),
          (Ie = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Me || cl(2, l, t), Me || cl(4, l, t), Qt(e, t, l);
        break;
      case 1:
        Me ||
          (Rt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == 'function' && ho(l, t, a)),
          Qt(e, t, l);
        break;
      case 21:
        Qt(e, t, l);
        break;
      case 22:
        (Me = (a = Me) || l.memoizedState !== null), Qt(e, t, l), (Me = a);
        break;
      default:
        Qt(e, t, l);
    }
  }
  function xo(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        zu(e);
      } catch (l) {
        xe(t, t.return, l);
      }
  }
  function Hm(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new go()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new go()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Hc(e, t) {
    var l = Hm(e);
    t.forEach(function (a) {
      var u = Zm.bind(null, e, a);
      l.has(a) || (l.add(a), a.then(u, u));
    });
  }
  function it(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var u = l[a],
          n = e,
          i = t,
          f = i;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (yl(f.type)) {
                (Ae = f.stateNode), (Ie = !1);
                break e;
              }
              break;
            case 5:
              (Ae = f.stateNode), (Ie = !1);
              break e;
            case 3:
            case 4:
              (Ae = f.stateNode.containerInfo), (Ie = !0);
              break e;
          }
          f = f.return;
        }
        if (Ae === null) throw Error(r(160));
        So(n, i, u),
          (Ae = null),
          (Ie = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) Eo(t, e), (t = t.sibling);
  }
  var xt = null;
  function Eo(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        it(t, e),
          ct(e),
          a & 4 && (cl(3, e, e.return), ru(3, e), cl(5, e, e.return));
        break;
      case 1:
        it(t, e),
          ct(e),
          a & 512 && (Me || l === null || Rt(l, l.return)),
          a & 64 &&
            Xt &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a)))));
        break;
      case 26:
        var u = xt;
        if (
          (it(t, e),
          ct(e),
          a & 512 && (Me || l === null || Rt(l, l.return)),
          a & 4)
        ) {
          var n = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  (a = e.type),
                    (l = e.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (a) {
                    case 'title':
                      (n = u.getElementsByTagName('title')[0]),
                        (!n ||
                          n[Ca] ||
                          n[Ve] ||
                          n.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          n.hasAttribute('itemprop')) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector('head > title')
                          )),
                        Xe(n, a, l),
                        (n[Ve] = e),
                        He(n),
                        (a = n);
                      break e;
                    case 'link':
                      var i = vd('link', 'href', u).get(a + (l.href || ''));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute('href') ===
                              (l.href == null || l.href === ''
                                ? null
                                : l.href) &&
                              n.getAttribute('rel') ===
                                (l.rel == null ? null : l.rel) &&
                              n.getAttribute('title') ===
                                (l.title == null ? null : l.title) &&
                              n.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(a)),
                        Xe(n, a, l),
                        u.head.appendChild(n);
                      break;
                    case 'meta':
                      if (
                        (i = vd('meta', 'content', u).get(
                          a + (l.content || '')
                        ))
                      ) {
                        for (f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              n.getAttribute('name') ===
                                (l.name == null ? null : l.name) &&
                              n.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              n.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              n.getAttribute('charset') ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(a)),
                        Xe(n, a, l),
                        u.head.appendChild(n);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  (n[Ve] = e), He(n), (a = n);
                }
                e.stateNode = a;
              } else gd(u, e.type, e.stateNode);
            else e.stateNode = yd(u, a, e.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : n.count--,
                a === null
                  ? gd(u, e.type, e.stateNode)
                  : yd(u, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                _c(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        it(t, e),
          ct(e),
          a & 512 && (Me || l === null || Rt(l, l.return)),
          l !== null && a & 4 && _c(e, e.memoizedProps, l.memoizedProps);
        break;
      case 5:
        if (
          (it(t, e),
          ct(e),
          a & 512 && (Me || l === null || Rt(l, l.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            Fl(u, '');
          } catch (R) {
            xe(e, e.return, R);
          }
        }
        a & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), _c(e, u, l !== null ? l.memoizedProps : u)),
          a & 1024 && (Cc = !0);
        break;
      case 6:
        if ((it(t, e), ct(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          (a = e.memoizedProps), (l = e.stateNode);
          try {
            l.nodeValue = a;
          } catch (R) {
            xe(e, e.return, R);
          }
        }
        break;
      case 3:
        if (
          ((Qn = null),
          (u = xt),
          (xt = Gn(t.containerInfo)),
          it(t, e),
          (xt = u),
          ct(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            zu(t.containerInfo);
          } catch (R) {
            xe(e, e.return, R);
          }
        Cc && ((Cc = !1), To(e));
        break;
      case 4:
        (a = xt),
          (xt = Gn(e.stateNode.containerInfo)),
          it(t, e),
          ct(e),
          (xt = a);
        break;
      case 12:
        it(t, e), ct(e);
        break;
      case 13:
        it(t, e),
          ct(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Gc = Tt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Hc(e, a)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null,
          E = Xt,
          O = Me;
        if (
          ((Xt = E || u),
          (Me = O || m),
          it(t, e),
          (Me = O),
          (Xt = E),
          ct(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (l === null || m || Xt || Me || Yl(e)),
              l = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                m = l = t;
                try {
                  if (((n = m.stateNode), u))
                    (i = n.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none');
                  else {
                    f = m.stateNode;
                    var j = m.memoizedProps.style,
                      T =
                        j != null && j.hasOwnProperty('display')
                          ? j.display
                          : null;
                    f.style.display =
                      T == null || typeof T == 'boolean' ? '' : ('' + T).trim();
                  }
                } catch (R) {
                  xe(m, m.return, R);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                m = t;
                try {
                  m.stateNode.nodeValue = u ? '' : m.memoizedProps;
                } catch (R) {
                  xe(m, m.return, R);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), (t = t.return);
            }
            l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Hc(e, l))));
        break;
      case 19:
        it(t, e),
          ct(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Hc(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        it(t, e), ct(e);
    }
  }
  function ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (yo(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              n = jc(e);
            Dn(e, n, u);
            break;
          case 5:
            var i = l.stateNode;
            l.flags & 32 && (Fl(i, ''), (l.flags &= -33));
            var f = jc(e);
            Dn(e, f, i);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo,
              E = jc(e);
            Uc(e, E, m);
            break;
          default:
            throw Error(r(161));
        }
      } catch (O) {
        xe(e, e.return, O);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function To(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        To(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function fl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) bo(e, t.alternate, t), (t = t.sibling);
  }
  function Yl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          cl(4, t, t.return), Yl(t);
          break;
        case 1:
          Rt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == 'function' && ho(t, t.return, l),
            Yl(t);
          break;
        case 27:
          pu(t.stateNode);
        case 26:
        case 5:
          Rt(t, t.return), Yl(t);
          break;
        case 22:
          t.memoizedState === null && Yl(t);
          break;
        case 30:
          Yl(t);
          break;
        default:
          Yl(t);
      }
      e = e.sibling;
    }
  }
  function rl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        u = e,
        n = t,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          rl(u, n, l), ru(4, n);
          break;
        case 1:
          if (
            (rl(u, n, l),
            (a = n),
            (u = a.stateNode),
            typeof u.componentDidMount == 'function')
          )
            try {
              u.componentDidMount();
            } catch (E) {
              xe(a, a.return, E);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var f = a.stateNode;
            try {
              var m = u.shared.hiddenCallbacks;
              if (m !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < m.length; u++)
                  Fr(m[u], f);
            } catch (E) {
              xe(a, a.return, E);
            }
          }
          l && i & 64 && oo(n), su(n, n.return);
          break;
        case 27:
          vo(n);
        case 26:
        case 5:
          rl(u, n, l), l && a === null && i & 4 && mo(n), su(n, n.return);
          break;
        case 12:
          rl(u, n, l);
          break;
        case 13:
          rl(u, n, l), l && i & 4 && xo(u, n);
          break;
        case 22:
          n.memoizedState === null && rl(u, n, l), su(n, n.return);
          break;
        case 30:
          break;
        default:
          rl(u, n, l);
      }
      t = t.sibling;
    }
  }
  function wc(e, t) {
    var l = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && $a(l));
  }
  function Bc(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && $a(e));
  }
  function zt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Ao(e, t, l, a), (t = t.sibling);
  }
  function Ao(e, t, l, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zt(e, t, l, a), u & 2048 && ru(9, t);
        break;
      case 1:
        zt(e, t, l, a);
        break;
      case 3:
        zt(e, t, l, a),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && $a(e)));
        break;
      case 12:
        if (u & 2048) {
          zt(e, t, l, a), (e = t.stateNode);
          try {
            var n = t.memoizedProps,
              i = n.id,
              f = n.onPostCommit;
            typeof f == 'function' &&
              f(
                i,
                t.alternate === null ? 'mount' : 'update',
                e.passiveEffectDuration,
                -0
              );
          } catch (m) {
            xe(t, t.return, m);
          }
        } else zt(e, t, l, a);
        break;
      case 13:
        zt(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        (n = t.stateNode),
          (i = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? zt(e, t, l, a)
              : ou(e, t)
            : n._visibility & 2
            ? zt(e, t, l, a)
            : ((n._visibility |= 2),
              va(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
          u & 2048 && wc(i, t);
        break;
      case 24:
        zt(e, t, l, a), u & 2048 && Bc(t.alternate, t);
        break;
      default:
        zt(e, t, l, a);
    }
  }
  function va(e, t, l, a, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var n = e,
        i = t,
        f = l,
        m = a,
        E = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          va(n, i, f, m, u), ru(8, i);
          break;
        case 23:
          break;
        case 22:
          var O = i.stateNode;
          i.memoizedState !== null
            ? O._visibility & 2
              ? va(n, i, f, m, u)
              : ou(n, i)
            : ((O._visibility |= 2), va(n, i, f, m, u)),
            u && E & 2048 && wc(i.alternate, i);
          break;
        case 24:
          va(n, i, f, m, u), u && E & 2048 && Bc(i.alternate, i);
          break;
        default:
          va(n, i, f, m, u);
      }
      t = t.sibling;
    }
  }
  function ou(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          u = a.flags;
        switch (a.tag) {
          case 22:
            ou(l, a), u & 2048 && wc(a.alternate, a);
            break;
          case 24:
            ou(l, a), u & 2048 && Bc(a.alternate, a);
            break;
          default:
            ou(l, a);
        }
        t = t.sibling;
      }
  }
  var du = 8192;
  function ga(e) {
    if (e.subtreeFlags & du)
      for (e = e.child; e !== null; ) No(e), (e = e.sibling);
  }
  function No(e) {
    switch (e.tag) {
      case 26:
        ga(e),
          e.flags & du &&
            e.memoizedState !== null &&
            S0(xt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        ga(e);
        break;
      case 3:
      case 4:
        var t = xt;
        (xt = Gn(e.stateNode.containerInfo)), ga(e), (xt = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = du), (du = 16777216), ga(e), (du = t))
            : ga(e));
        break;
      default:
        ga(e);
    }
  }
  function Ro(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function hu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Be = a), Do(a, e);
        }
      Ro(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) zo(e), (e = e.sibling);
  }
  function zo(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        hu(e), e.flags & 2048 && cl(9, e, e.return);
        break;
      case 3:
        hu(e);
        break;
      case 12:
        hu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), On(e))
          : hu(e);
        break;
      default:
        hu(e);
    }
  }
  function On(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Be = a), Do(a, e);
        }
      Ro(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          cl(8, t, t.return), On(t);
          break;
        case 22:
          (l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), On(t));
          break;
        default:
          On(t);
      }
      e = e.sibling;
    }
  }
  function Do(e, t) {
    for (; Be !== null; ) {
      var l = Be;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          cl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          $a(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) (a.return = l), (Be = a);
      else
        e: for (l = e; Be !== null; ) {
          a = Be;
          var u = a.sibling,
            n = a.return;
          if ((po(a), a === l)) {
            Be = null;
            break e;
          }
          if (u !== null) {
            (u.return = n), (Be = u);
            break e;
          }
          Be = n;
        }
    }
  }
  var wm = {
      getCacheForType: function (e) {
        var t = Ke(Ue),
          l = t.data.get(e);
        return l === void 0 && ((l = e()), t.data.set(e, l)), l;
      },
    },
    Bm = typeof WeakMap == 'function' ? WeakMap : Map,
    me = 0,
    Ee = null,
    ue = null,
    ce = 0,
    ye = 0,
    ft = null,
    sl = !1,
    ba = !1,
    qc = !1,
    Zt = 0,
    De = 0,
    ol = 0,
    Ll = 0,
    Yc = 0,
    bt = 0,
    pa = 0,
    mu = null,
    et = null,
    Lc = !1,
    Gc = 0,
    Mn = 1 / 0,
    _n = null,
    dl = null,
    Ge = 0,
    hl = null,
    Sa = null,
    xa = 0,
    Xc = 0,
    Qc = null,
    Oo = null,
    yu = 0,
    Zc = null;
  function rt() {
    if ((me & 2) !== 0 && ce !== 0) return ce & -ce;
    if (M.T !== null) {
      var e = fa;
      return e !== 0 ? e : Fc();
    }
    return Zf();
  }
  function Mo() {
    bt === 0 && (bt = (ce & 536870912) === 0 || de ? Lf() : 536870912);
    var e = gt.current;
    return e !== null && (e.flags |= 32), bt;
  }
  function st(e, t, l) {
    ((e === Ee && (ye === 2 || ye === 9)) || e.cancelPendingCommit !== null) &&
      (Ea(e, 0), ml(e, ce, bt, !1)),
      Ua(e, l),
      ((me & 2) === 0 || e !== Ee) &&
        (e === Ee &&
          ((me & 2) === 0 && (Ll |= l), De === 4 && ml(e, ce, bt, !1)),
        Dt(e));
  }
  function _o(e, t, l) {
    if ((me & 6) !== 0) throw Error(r(327));
    var a = (!l && (t & 124) === 0 && (t & e.expiredLanes) === 0) || ja(e, t),
      u = a ? Lm(e, t) : Jc(e, t, !0),
      n = a;
    do {
      if (u === 0) {
        ba && !a && ml(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), n && !qm(l))) {
          (u = Jc(e, t, !1)), (n = !1);
          continue;
        }
        if (u === 2) {
          if (((n = t), e.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            (i = e.pendingLanes & -536870913),
              (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0);
          if (i !== 0) {
            t = i;
            e: {
              var f = e;
              u = mu;
              var m = f.current.memoizedState.isDehydrated;
              if ((m && (Ea(f, i).flags |= 256), (i = Jc(f, i, !1)), i !== 2)) {
                if (qc && !m) {
                  (f.errorRecoveryDisabledLanes |= n), (Ll |= n), (u = 4);
                  break e;
                }
                (n = et),
                  (et = u),
                  n !== null && (et === null ? (et = n) : et.push.apply(et, n));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          Ea(e, 0), ml(e, t, 0, !0);
          break;
        }
        e: {
          switch (((a = e), (n = u), n)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ml(a, t, bt, !sl);
              break e;
            case 2:
              et = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((u = Gc + 300 - Tt()), 10 < u)) {
            if ((ml(a, t, bt, !sl), Gu(a, 0, !0) !== 0)) break e;
            a.timeoutHandle = id(
              jo.bind(null, a, l, et, _n, Lc, t, bt, Ll, pa, sl, n, 2, -0, 0),
              u
            );
            break e;
          }
          jo(a, l, et, _n, Lc, t, bt, Ll, pa, sl, n, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Dt(e);
  }
  function jo(e, t, l, a, u, n, i, f, m, E, O, j, T, R) {
    if (
      ((e.timeoutHandle = -1),
      (j = t.subtreeFlags),
      (j & 8192 || (j & 16785408) === 16785408) &&
        ((Eu = { stylesheets: null, count: 0, unsuspend: p0 }),
        No(t),
        (j = x0()),
        j !== null))
    ) {
      (e.cancelPendingCommit = j(
        Yo.bind(null, e, t, n, l, a, u, i, f, m, O, 1, T, R)
      )),
        ml(e, n, i, !E);
      return;
    }
    Yo(e, t, n, l, a, u, i, f, m);
  }
  function qm(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var u = l[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ut(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        (l.return = t), (t = l);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function ml(e, t, l, a) {
    (t &= ~Yc),
      (t &= ~Ll),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes);
    for (var u = t; 0 < u; ) {
      var n = 31 - at(u),
        i = 1 << n;
      (a[n] = -1), (u &= ~i);
    }
    l !== 0 && Xf(e, l, t);
  }
  function jn() {
    return (me & 6) === 0 ? (vu(0), !1) : !0;
  }
  function Vc() {
    if (ue !== null) {
      if (ye === 0) var e = ue.return;
      else (e = ue), (wt = Cl = null), fc(e), (ma = null), (iu = 0), (e = ue);
      for (; e !== null; ) so(e.alternate, e), (e = e.return);
      ue = null;
    }
  }
  function Ea(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && ((e.timeoutHandle = -1), l0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      Vc(),
      (Ee = e),
      (ue = l = Ut(e.current, null)),
      (ce = t),
      (ye = 0),
      (ft = null),
      (sl = !1),
      (ba = ja(e, t)),
      (qc = !1),
      (pa = bt = Yc = Ll = ol = De = 0),
      (et = mu = null),
      (Lc = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var u = 31 - at(a),
          n = 1 << u;
        (t |= e[u]), (a &= ~n);
      }
    return (Zt = t), Iu(), l;
  }
  function Uo(e, t) {
    (le = null),
      (M.H = pn),
      t === Fa || t === rn
        ? ((t = $r()), (ye = 3))
        : t === Kr
        ? ((t = $r()), (ye = 4))
        : (ye =
            t === Ws
              ? 8
              : t !== null &&
                typeof t == 'object' &&
                typeof t.then == 'function'
              ? 6
              : 1),
      (ft = t),
      ue === null && ((De = 1), An(e, ht(t, e.current)));
  }
  function Co() {
    var e = M.H;
    return (M.H = pn), e === null ? pn : e;
  }
  function Ho() {
    var e = M.A;
    return (M.A = wm), e;
  }
  function Kc() {
    (De = 4),
      sl || ((ce & 4194048) !== ce && gt.current !== null) || (ba = !0),
      ((ol & 134217727) === 0 && (Ll & 134217727) === 0) ||
        Ee === null ||
        ml(Ee, ce, bt, !1);
  }
  function Jc(e, t, l) {
    var a = me;
    me |= 2;
    var u = Co(),
      n = Ho();
    (Ee !== e || ce !== t) && ((_n = null), Ea(e, t)), (t = !1);
    var i = De;
    e: do
      try {
        if (ye !== 0 && ue !== null) {
          var f = ue,
            m = ft;
          switch (ye) {
            case 8:
              Vc(), (i = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0);
              var E = ye;
              if (((ye = 0), (ft = null), Ta(e, f, m, E), l && ba)) {
                i = 0;
                break e;
              }
              break;
            default:
              (E = ye), (ye = 0), (ft = null), Ta(e, f, m, E);
          }
        }
        Ym(), (i = De);
        break;
      } catch (O) {
        Uo(e, O);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (wt = Cl = null),
      (me = a),
      (M.H = u),
      (M.A = n),
      ue === null && ((Ee = null), (ce = 0), Iu()),
      i
    );
  }
  function Ym() {
    for (; ue !== null; ) wo(ue);
  }
  function Lm(e, t) {
    var l = me;
    me |= 2;
    var a = Co(),
      u = Ho();
    Ee !== e || ce !== t
      ? ((_n = null), (Mn = Tt() + 500), Ea(e, t))
      : (ba = ja(e, t));
    e: do
      try {
        if (ye !== 0 && ue !== null) {
          t = ue;
          var n = ft;
          t: switch (ye) {
            case 1:
              (ye = 0), (ft = null), Ta(e, t, n, 1);
              break;
            case 2:
            case 9:
              if (Jr(n)) {
                (ye = 0), (ft = null), Bo(t);
                break;
              }
              (t = function () {
                (ye !== 2 && ye !== 9) || Ee !== e || (ye = 7), Dt(e);
              }),
                n.then(t, t);
              break e;
            case 3:
              ye = 7;
              break e;
            case 4:
              ye = 5;
              break e;
            case 7:
              Jr(n)
                ? ((ye = 0), (ft = null), Bo(t))
                : ((ye = 0), (ft = null), Ta(e, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (ue.tag) {
                case 26:
                  i = ue.memoizedState;
                case 5:
                case 27:
                  var f = ue;
                  if (!i || bd(i)) {
                    (ye = 0), (ft = null);
                    var m = f.sibling;
                    if (m !== null) ue = m;
                    else {
                      var E = f.return;
                      E !== null ? ((ue = E), Un(E)) : (ue = null);
                    }
                    break t;
                  }
              }
              (ye = 0), (ft = null), Ta(e, t, n, 5);
              break;
            case 6:
              (ye = 0), (ft = null), Ta(e, t, n, 6);
              break;
            case 8:
              Vc(), (De = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        Gm();
        break;
      } catch (O) {
        Uo(e, O);
      }
    while (!0);
    return (
      (wt = Cl = null),
      (M.H = a),
      (M.A = u),
      (me = l),
      ue !== null ? 0 : ((Ee = null), (ce = 0), Iu(), De)
    );
  }
  function Gm() {
    for (; ue !== null && !rh(); ) wo(ue);
  }
  function wo(e) {
    var t = fo(e.alternate, e, Zt);
    (e.memoizedProps = e.pendingProps), t === null ? Un(e) : (ue = t);
  }
  function Bo(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = lo(l, t, t.pendingProps, t.type, void 0, ce);
        break;
      case 11:
        t = lo(l, t, t.pendingProps, t.type.render, t.ref, ce);
        break;
      case 5:
        fc(t);
      default:
        so(l, t), (t = ue = Br(t, Zt)), (t = fo(l, t, Zt));
    }
    (e.memoizedProps = e.pendingProps), t === null ? Un(e) : (ue = t);
  }
  function Ta(e, t, l, a) {
    (wt = Cl = null), fc(t), (ma = null), (iu = 0);
    var u = t.return;
    try {
      if (Mm(e, u, t, l, ce)) {
        (De = 1), An(e, ht(l, e.current)), (ue = null);
        return;
      }
    } catch (n) {
      if (u !== null) throw ((ue = u), n);
      (De = 1), An(e, ht(l, e.current)), (ue = null);
      return;
    }
    t.flags & 32768
      ? (de || a === 1
          ? (e = !0)
          : ba || (ce & 536870912) !== 0
          ? (e = !1)
          : ((sl = e = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = gt.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        qo(t, e))
      : Un(t);
  }
  function Un(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        qo(t, sl);
        return;
      }
      e = t.return;
      var l = jm(t.alternate, t, Zt);
      if (l !== null) {
        ue = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    De === 0 && (De = 5);
  }
  function qo(e, t) {
    do {
      var l = Um(e.alternate, e);
      if (l !== null) {
        (l.flags &= 32767), (ue = l);
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ue = e;
        return;
      }
      ue = e = l;
    } while (e !== null);
    (De = 6), (ue = null);
  }
  function Yo(e, t, l, a, u, n, i, f, m) {
    e.cancelPendingCommit = null;
    do Cn();
    while (Ge !== 0);
    if ((me & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= Bi),
        ph(e, l, n, i, f, m),
        e === Ee && ((ue = Ee = null), (ce = 0)),
        (Sa = t),
        (hl = e),
        (xa = l),
        (Xc = n),
        (Qc = u),
        (Oo = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Vm(qu, function () {
              return Zo(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = M.T), (M.T = null), (u = L.p), (L.p = 2), (i = me), (me |= 4);
        try {
          Cm(e, t, l);
        } finally {
          (me = i), (L.p = u), (M.T = a);
        }
      }
      (Ge = 1), Lo(), Go(), Xo();
    }
  }
  function Lo() {
    if (Ge === 1) {
      Ge = 0;
      var e = hl,
        t = Sa,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        (l = M.T), (M.T = null);
        var a = L.p;
        L.p = 2;
        var u = me;
        me |= 4;
        try {
          Eo(t, e);
          var n = nf,
            i = zr(e.containerInfo),
            f = n.focusedElem,
            m = n.selectionRange;
          if (
            i !== f &&
            f &&
            f.ownerDocument &&
            Rr(f.ownerDocument.documentElement, f)
          ) {
            if (m !== null && ji(f)) {
              var E = m.start,
                O = m.end;
              if ((O === void 0 && (O = E), 'selectionStart' in f))
                (f.selectionStart = E),
                  (f.selectionEnd = Math.min(O, f.value.length));
              else {
                var j = f.ownerDocument || document,
                  T = (j && j.defaultView) || window;
                if (T.getSelection) {
                  var R = T.getSelection(),
                    P = f.textContent.length,
                    k = Math.min(m.start, P),
                    pe = m.end === void 0 ? k : Math.min(m.end, P);
                  !R.extend && k > pe && ((i = pe), (pe = k), (k = i));
                  var p = Nr(f, k),
                    g = Nr(f, pe);
                  if (
                    p &&
                    g &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== p.node ||
                      R.anchorOffset !== p.offset ||
                      R.focusNode !== g.node ||
                      R.focusOffset !== g.offset)
                  ) {
                    var x = j.createRange();
                    x.setStart(p.node, p.offset),
                      R.removeAllRanges(),
                      k > pe
                        ? (R.addRange(x), R.extend(g.node, g.offset))
                        : (x.setEnd(g.node, g.offset), R.addRange(x));
                  }
                }
              }
            }
            for (j = [], R = f; (R = R.parentNode); )
              R.nodeType === 1 &&
                j.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (
              typeof f.focus == 'function' && f.focus(), f = 0;
              f < j.length;
              f++
            ) {
              var _ = j[f];
              (_.element.scrollLeft = _.left), (_.element.scrollTop = _.top);
            }
          }
          (Kn = !!uf), (nf = uf = null);
        } finally {
          (me = u), (L.p = a), (M.T = l);
        }
      }
      (e.current = t), (Ge = 2);
    }
  }
  function Go() {
    if (Ge === 2) {
      Ge = 0;
      var e = hl,
        t = Sa,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        (l = M.T), (M.T = null);
        var a = L.p;
        L.p = 2;
        var u = me;
        me |= 4;
        try {
          bo(e, t.alternate, t);
        } finally {
          (me = u), (L.p = a), (M.T = l);
        }
      }
      Ge = 3;
    }
  }
  function Xo() {
    if (Ge === 4 || Ge === 3) {
      (Ge = 0), sh();
      var e = hl,
        t = Sa,
        l = xa,
        a = Oo;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ge = 5)
        : ((Ge = 0), (Sa = hl = null), Qo(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (dl = null),
        oi(l),
        (t = t.stateNode),
        lt && typeof lt.onCommitFiberRoot == 'function')
      )
        try {
          lt.onCommitFiberRoot(_a, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (t = M.T), (u = L.p), (L.p = 2), (M.T = null);
        try {
          for (var n = e.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            n(f.value, { componentStack: f.stack });
          }
        } finally {
          (M.T = t), (L.p = u);
        }
      }
      (xa & 3) !== 0 && Cn(),
        Dt(e),
        (u = e.pendingLanes),
        (l & 4194090) !== 0 && (u & 42) !== 0
          ? e === Zc
            ? yu++
            : ((yu = 0), (Zc = e))
          : (yu = 0),
        vu(0);
    }
  }
  function Qo(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), $a(t)));
  }
  function Cn(e) {
    return Lo(), Go(), Xo(), Zo();
  }
  function Zo() {
    if (Ge !== 5) return !1;
    var e = hl,
      t = Xc;
    Xc = 0;
    var l = oi(xa),
      a = M.T,
      u = L.p;
    try {
      (L.p = 32 > l ? 32 : l), (M.T = null), (l = Qc), (Qc = null);
      var n = hl,
        i = xa;
      if (((Ge = 0), (Sa = hl = null), (xa = 0), (me & 6) !== 0))
        throw Error(r(331));
      var f = me;
      if (
        ((me |= 4),
        zo(n.current),
        Ao(n, n.current, i, l),
        (me = f),
        vu(0, !1),
        lt && typeof lt.onPostCommitFiberRoot == 'function')
      )
        try {
          lt.onPostCommitFiberRoot(_a, n);
        } catch {}
      return !0;
    } finally {
      (L.p = u), (M.T = a), Qo(e, t);
    }
  }
  function Vo(e, t, l) {
    (t = ht(l, t)),
      (t = Ec(e.stateNode, t, 2)),
      (e = al(e, t, 2)),
      e !== null && (Ua(e, 2), Dt(e));
  }
  function xe(e, t, l) {
    if (e.tag === 3) Vo(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Vo(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' &&
              (dl === null || !dl.has(a)))
          ) {
            (e = ht(l, e)),
              (l = ks(2)),
              (a = al(t, l, 2)),
              a !== null && ($s(l, a, t, e), Ua(a, 2), Dt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function kc(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Bm();
      var u = new Set();
      a.set(t, u);
    } else (u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u));
    u.has(l) ||
      ((qc = !0), u.add(l), (e = Xm.bind(null, e, t, l)), t.then(e, e));
  }
  function Xm(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ee === e &&
        (ce & l) === l &&
        (De === 4 || (De === 3 && (ce & 62914560) === ce && 300 > Tt() - Gc)
          ? (me & 2) === 0 && Ea(e, 0)
          : (Yc |= l),
        pa === ce && (pa = 0)),
      Dt(e);
  }
  function Ko(e, t) {
    t === 0 && (t = Gf()), (e = ua(e, t)), e !== null && (Ua(e, t), Dt(e));
  }
  function Qm(e) {
    var t = e.memoizedState,
      l = 0;
    t !== null && (l = t.retryLane), Ko(e, l);
  }
  function Zm(e, t) {
    var l = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          u = e.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(t), Ko(e, l);
  }
  function Vm(e, t) {
    return ci(e, t);
  }
  var Hn = null,
    Aa = null,
    $c = !1,
    wn = !1,
    Wc = !1,
    Gl = 0;
  function Dt(e) {
    e !== Aa &&
      e.next === null &&
      (Aa === null ? (Hn = Aa = e) : (Aa = Aa.next = e)),
      (wn = !0),
      $c || (($c = !0), Jm());
  }
  function vu(e, t) {
    if (!Wc && wn) {
      Wc = !0;
      do
        for (var l = !1, a = Hn; a !== null; ) {
          if (e !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes,
                f = a.pingedLanes;
              (n = (1 << (31 - at(42 | e) + 1)) - 1),
                (n &= u & ~(i & ~f)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((l = !0), Wo(a, n));
          } else
            (n = ce),
              (n = Gu(
                a,
                a === Ee ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (n & 3) === 0 || ja(a, n) || ((l = !0), Wo(a, n));
          a = a.next;
        }
      while (l);
      Wc = !1;
    }
  }
  function Km() {
    Jo();
  }
  function Jo() {
    wn = $c = !1;
    var e = 0;
    Gl !== 0 && (t0() && (e = Gl), (Gl = 0));
    for (var t = Tt(), l = null, a = Hn; a !== null; ) {
      var u = a.next,
        n = ko(a, t);
      n === 0
        ? ((a.next = null),
          l === null ? (Hn = u) : (l.next = u),
          u === null && (Aa = l))
        : ((l = a), (e !== 0 || (n & 3) !== 0) && (wn = !0)),
        (a = u);
    }
    vu(e);
  }
  function ko(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        u = e.expirationTimes,
        n = e.pendingLanes & -62914561;
      0 < n;

    ) {
      var i = 31 - at(n),
        f = 1 << i,
        m = u[i];
      m === -1
        ? ((f & l) === 0 || (f & a) !== 0) && (u[i] = bh(f, t))
        : m <= t && (e.expiredLanes |= f),
        (n &= ~f);
    }
    if (
      ((t = Ee),
      (l = ce),
      (l = Gu(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (ye === 2 || ye === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && fi(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || ja(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && fi(a), oi(l))) {
        case 2:
        case 8:
          l = qf;
          break;
        case 32:
          l = qu;
          break;
        case 268435456:
          l = Yf;
          break;
        default:
          l = qu;
      }
      return (
        (a = $o.bind(null, e)),
        (l = ci(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && fi(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function $o(e, t) {
    if (Ge !== 0 && Ge !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var l = e.callbackNode;
    if (Cn() && e.callbackNode !== l) return null;
    var a = ce;
    return (
      (a = Gu(
        e,
        e === Ee ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (_o(e, a, t),
          ko(e, Tt()),
          e.callbackNode != null && e.callbackNode === l
            ? $o.bind(null, e)
            : null)
    );
  }
  function Wo(e, t) {
    if (Cn()) return null;
    _o(e, t, !0);
  }
  function Jm() {
    a0(function () {
      (me & 6) !== 0 ? ci(Bf, Km) : Jo();
    });
  }
  function Fc() {
    return Gl === 0 && (Gl = Lf()), Gl;
  }
  function Fo(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
      ? e
      : Ku('' + e);
  }
  function Po(e, t) {
    var l = t.ownerDocument.createElement('input');
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute('form', e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function km(e, t, l, a, u) {
    if (t === 'submit' && l && l.stateNode === u) {
      var n = Fo((u[We] || null).action),
        i = a.submitter;
      i &&
        ((t = (t = i[We] || null)
          ? Fo(t.formAction)
          : i.getAttribute('formAction')),
        t !== null && ((n = t), (i = null)));
      var f = new Wu('action', 'action', null, a, u);
      e.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Gl !== 0) {
                  var m = i ? Po(u, i) : new FormData(u);
                  gc(
                    l,
                    { pending: !0, data: m, method: u.method, action: n },
                    null,
                    m
                  );
                }
              } else
                typeof n == 'function' &&
                  (f.preventDefault(),
                  (m = i ? Po(u, i) : new FormData(u)),
                  gc(
                    l,
                    { pending: !0, data: m, method: u.method, action: n },
                    n,
                    m
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Pc = 0; Pc < wi.length; Pc++) {
    var Ic = wi[Pc],
      $m = Ic.toLowerCase(),
      Wm = Ic[0].toUpperCase() + Ic.slice(1);
    St($m, 'on' + Wm);
  }
  St(Mr, 'onAnimationEnd'),
    St(_r, 'onAnimationIteration'),
    St(jr, 'onAnimationStart'),
    St('dblclick', 'onDoubleClick'),
    St('focusin', 'onFocus'),
    St('focusout', 'onBlur'),
    St(hm, 'onTransitionRun'),
    St(mm, 'onTransitionStart'),
    St(ym, 'onTransitionCancel'),
    St(Ur, 'onTransitionEnd'),
    kl('onMouseEnter', ['mouseout', 'mouseover']),
    kl('onMouseLeave', ['mouseout', 'mouseover']),
    kl('onPointerEnter', ['pointerout', 'pointerover']),
    kl('onPointerLeave', ['pointerout', 'pointerover']),
    Nl(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    Nl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Nl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Nl(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Nl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Nl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    );
  var gu =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Fm = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'
        .split(' ')
        .concat(gu)
    );
  function Io(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        u = a.event;
      a = a.listeners;
      e: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i],
              m = f.instance,
              E = f.currentTarget;
            if (((f = f.listener), m !== n && u.isPropagationStopped()))
              break e;
            (n = f), (u.currentTarget = E);
            try {
              n(u);
            } catch (O) {
              Tn(O);
            }
            (u.currentTarget = null), (n = m);
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((f = a[i]),
              (m = f.instance),
              (E = f.currentTarget),
              (f = f.listener),
              m !== n && u.isPropagationStopped())
            )
              break e;
            (n = f), (u.currentTarget = E);
            try {
              n(u);
            } catch (O) {
              Tn(O);
            }
            (u.currentTarget = null), (n = m);
          }
      }
    }
  }
  function ne(e, t) {
    var l = t[di];
    l === void 0 && (l = t[di] = new Set());
    var a = e + '__bubble';
    l.has(a) || (ed(t, e, 2, !1), l.add(a));
  }
  function ef(e, t, l) {
    var a = 0;
    t && (a |= 4), ed(l, e, a, t);
  }
  var Bn = '_reactListening' + Math.random().toString(36).slice(2);
  function tf(e) {
    if (!e[Bn]) {
      (e[Bn] = !0),
        Kf.forEach(function (l) {
          l !== 'selectionchange' && (Fm.has(l) || ef(l, !1, e), ef(l, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Bn] || ((t[Bn] = !0), ef('selectionchange', !1, t));
    }
  }
  function ed(e, t, l, a) {
    switch (Ad(t)) {
      case 2:
        var u = A0;
        break;
      case 8:
        u = N0;
        break;
      default:
        u = vf;
    }
    (l = u.bind(null, t, l, e)),
      (u = void 0),
      !Ti ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (u = !0),
      a
        ? u !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: u })
          : e.addEventListener(t, l, !0)
        : u !== void 0
        ? e.addEventListener(t, l, { passive: u })
        : e.addEventListener(t, l, !1);
  }
  function lf(e, t, l, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var m = i.tag;
              if ((m === 3 || m === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (((i = Vl(f)), i === null)) return;
            if (((m = i.tag), m === 5 || m === 6 || m === 26 || m === 27)) {
              a = n = i;
              continue e;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    ir(function () {
      var E = n,
        O = xi(l),
        j = [];
      e: {
        var T = Cr.get(e);
        if (T !== void 0) {
          var R = Wu,
            P = e;
          switch (e) {
            case 'keypress':
              if (ku(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              R = Vh;
              break;
            case 'focusin':
              (P = 'focus'), (R = zi);
              break;
            case 'focusout':
              (P = 'blur'), (R = zi);
              break;
            case 'beforeblur':
            case 'afterblur':
              R = zi;
              break;
            case 'click':
              if (l.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              R = rr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = Uh;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = kh;
              break;
            case Mr:
            case _r:
            case jr:
              R = wh;
              break;
            case Ur:
              R = Wh;
              break;
            case 'scroll':
            case 'scrollend':
              R = _h;
              break;
            case 'wheel':
              R = Ph;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = qh;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = or;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = em;
          }
          var k = (t & 4) !== 0,
            pe = !k && (e === 'scroll' || e === 'scrollend'),
            p = k ? (T !== null ? T + 'Capture' : null) : T;
          k = [];
          for (var g = E, x; g !== null; ) {
            var _ = g;
            if (
              ((x = _.stateNode),
              (_ = _.tag),
              (_ !== 5 && _ !== 26 && _ !== 27) ||
                x === null ||
                p === null ||
                ((_ = wa(g, p)), _ != null && k.push(bu(g, _, x))),
              pe)
            )
              break;
            g = g.return;
          }
          0 < k.length &&
            ((T = new R(T, P, null, l, O)), j.push({ event: T, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((T = e === 'mouseover' || e === 'pointerover'),
            (R = e === 'mouseout' || e === 'pointerout'),
            T &&
              l !== Si &&
              (P = l.relatedTarget || l.fromElement) &&
              (Vl(P) || P[Zl]))
          )
            break e;
          if (
            (R || T) &&
            ((T =
              O.window === O
                ? O
                : (T = O.ownerDocument)
                ? T.defaultView || T.parentWindow
                : window),
            R
              ? ((P = l.relatedTarget || l.toElement),
                (R = E),
                (P = P ? Vl(P) : null),
                P !== null &&
                  ((pe = y(P)),
                  (k = P.tag),
                  P !== pe || (k !== 5 && k !== 27 && k !== 6)) &&
                  (P = null))
              : ((R = null), (P = E)),
            R !== P)
          ) {
            if (
              ((k = rr),
              (_ = 'onMouseLeave'),
              (p = 'onMouseEnter'),
              (g = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((k = or),
                (_ = 'onPointerLeave'),
                (p = 'onPointerEnter'),
                (g = 'pointer')),
              (pe = R == null ? T : Ha(R)),
              (x = P == null ? T : Ha(P)),
              (T = new k(_, g + 'leave', R, l, O)),
              (T.target = pe),
              (T.relatedTarget = x),
              (_ = null),
              Vl(O) === E &&
                ((k = new k(p, g + 'enter', P, l, O)),
                (k.target = x),
                (k.relatedTarget = pe),
                (_ = k)),
              (pe = _),
              R && P)
            )
              t: {
                for (k = R, p = P, g = 0, x = k; x; x = Na(x)) g++;
                for (x = 0, _ = p; _; _ = Na(_)) x++;
                for (; 0 < g - x; ) (k = Na(k)), g--;
                for (; 0 < x - g; ) (p = Na(p)), x--;
                for (; g--; ) {
                  if (k === p || (p !== null && k === p.alternate)) break t;
                  (k = Na(k)), (p = Na(p));
                }
                k = null;
              }
            else k = null;
            R !== null && td(j, T, R, k, !1),
              P !== null && pe !== null && td(j, pe, P, k, !0);
          }
        }
        e: {
          if (
            ((T = E ? Ha(E) : window),
            (R = T.nodeName && T.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && T.type === 'file'))
          )
            var Z = pr;
          else if (gr(T))
            if (Sr) Z = sm;
            else {
              Z = fm;
              var ae = cm;
            }
          else
            (R = T.nodeName),
              !R ||
              R.toLowerCase() !== 'input' ||
              (T.type !== 'checkbox' && T.type !== 'radio')
                ? E && pi(E.elementType) && (Z = pr)
                : (Z = rm);
          if (Z && (Z = Z(e, E))) {
            br(j, Z, l, O);
            break e;
          }
          ae && ae(e, T, E),
            e === 'focusout' &&
              E &&
              T.type === 'number' &&
              E.memoizedProps.value != null &&
              bi(T, 'number', T.value);
        }
        switch (((ae = E ? Ha(E) : window), e)) {
          case 'focusin':
            (gr(ae) || ae.contentEditable === 'true') &&
              ((ta = ae), (Ui = E), (Za = null));
            break;
          case 'focusout':
            Za = Ui = ta = null;
            break;
          case 'mousedown':
            Ci = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (Ci = !1), Dr(j, l, O);
            break;
          case 'selectionchange':
            if (dm) break;
          case 'keydown':
          case 'keyup':
            Dr(j, l, O);
        }
        var K;
        if (Oi)
          e: {
            switch (e) {
              case 'compositionstart':
                var W = 'onCompositionStart';
                break e;
              case 'compositionend':
                W = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                W = 'onCompositionUpdate';
                break e;
            }
            W = void 0;
          }
        else
          ea
            ? yr(e, l) && (W = 'onCompositionEnd')
            : e === 'keydown' &&
              l.keyCode === 229 &&
              (W = 'onCompositionStart');
        W &&
          (dr &&
            l.locale !== 'ko' &&
            (ea || W !== 'onCompositionStart'
              ? W === 'onCompositionEnd' && ea && (K = cr())
              : ((It = O),
                (Ai = 'value' in It ? It.value : It.textContent),
                (ea = !0))),
          (ae = qn(E, W)),
          0 < ae.length &&
            ((W = new sr(W, e, null, l, O)),
            j.push({ event: W, listeners: ae }),
            K ? (W.data = K) : ((K = vr(l)), K !== null && (W.data = K)))),
          (K = lm ? am(e, l) : um(e, l)) &&
            ((W = qn(E, 'onBeforeInput')),
            0 < W.length &&
              ((ae = new sr('onBeforeInput', 'beforeinput', null, l, O)),
              j.push({ event: ae, listeners: W }),
              (ae.data = K))),
          km(j, e, E, l, O);
      }
      Io(j, t);
    });
  }
  function bu(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function qn(e, t) {
    for (var l = t + 'Capture', a = []; e !== null; ) {
      var u = e,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = wa(e, l)),
          u != null && a.unshift(bu(e, u, n)),
          (u = wa(e, t)),
          u != null && a.push(bu(e, u, n))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function Na(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function td(e, t, l, a, u) {
    for (var n = t._reactName, i = []; l !== null && l !== a; ) {
      var f = l,
        m = f.alternate,
        E = f.stateNode;
      if (((f = f.tag), m !== null && m === a)) break;
      (f !== 5 && f !== 26 && f !== 27) ||
        E === null ||
        ((m = E),
        u
          ? ((E = wa(l, n)), E != null && i.unshift(bu(l, E, m)))
          : u || ((E = wa(l, n)), E != null && i.push(bu(l, E, m)))),
        (l = l.return);
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var Pm = /\r\n?/g,
    Im = /\u0000|\uFFFD/g;
  function ld(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Pm,
        `
`
      )
      .replace(Im, '');
  }
  function ad(e, t) {
    return (t = ld(t)), ld(e) === t;
  }
  function Yn() {}
  function be(e, t, l, a, u, n) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? t === 'body' || (t === 'textarea' && a === '') || Fl(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') &&
            t !== 'body' &&
            Fl(e, '' + a);
        break;
      case 'className':
        Qu(e, 'class', a);
        break;
      case 'tabIndex':
        Qu(e, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Qu(e, l, a);
        break;
      case 'style':
        ur(e, a, n);
        break;
      case 'data':
        if (t !== 'object') {
          Qu(e, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (t !== 'a' || l !== 'href')) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == 'function' ||
          typeof a == 'symbol' ||
          typeof a == 'boolean'
        ) {
          e.removeAttribute(l);
          break;
        }
        (a = Ku('' + a)), e.setAttribute(l, a);
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && be(e, t, 'name', u.name, u, null),
                be(e, t, 'formEncType', u.formEncType, u, null),
                be(e, t, 'formMethod', u.formMethod, u, null),
                be(e, t, 'formTarget', u.formTarget, u, null))
              : (be(e, t, 'encType', u.encType, u, null),
                be(e, t, 'method', u.method, u, null),
                be(e, t, 'target', u.target, u, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        (a = Ku('' + a)), e.setAttribute(l, a);
        break;
      case 'onClick':
        a != null && (e.onclick = Yn);
        break;
      case 'onScroll':
        a != null && ne('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && ne('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        e.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        e.muted = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (
          a == null ||
          typeof a == 'function' ||
          typeof a == 'boolean' ||
          typeof a == 'symbol'
        ) {
          e.removeAttribute('xlink:href');
          break;
        }
        (l = Ku('' + a)),
          e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l);
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        a != null && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '' + a)
          : e.removeAttribute(l);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        a && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '')
          : e.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? e.setAttribute(l, '')
          : a !== !1 &&
            a != null &&
            typeof a != 'function' &&
            typeof a != 'symbol'
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null &&
        typeof a != 'function' &&
        typeof a != 'symbol' &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case 'popover':
        ne('beforetoggle', e), ne('toggle', e), Xu(e, 'popover', a);
        break;
      case 'xlinkActuate':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        _t(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        _t(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        _t(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        _t(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Xu(e, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== 'o' && l[0] !== 'O') ||
          (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Oh.get(l) || l), Xu(e, l, a));
    }
  }
  function af(e, t, l, a, u, n) {
    switch (l) {
      case 'style':
        ur(e, a, n);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? Fl(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && Fl(e, '' + a);
        break;
      case 'onScroll':
        a != null && ne('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && ne('scrollend', e);
        break;
      case 'onClick':
        a != null && (e.onclick = Yn);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!Jf.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (t = l.slice(2, u ? l.length - 7 : void 0)),
              (n = e[We] || null),
              (n = n != null ? n[l] : null),
              typeof n == 'function' && e.removeEventListener(t, n, u),
              typeof a == 'function')
            ) {
              typeof n != 'function' &&
                n !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, u);
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
              ? e.setAttribute(l, '')
              : Xu(e, l, a);
          }
    }
  }
  function Xe(e, t, l) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        ne('error', e), ne('load', e);
        var a = !1,
          u = !1,
          n;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var i = l[n];
            if (i != null)
              switch (n) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, t));
                default:
                  be(e, t, n, i, l, null);
              }
          }
        u && be(e, t, 'srcSet', l.srcSet, l, null),
          a && be(e, t, 'src', l.src, l, null);
        return;
      case 'input':
        ne('invalid', e);
        var f = (n = i = u = null),
          m = null,
          E = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var O = l[a];
            if (O != null)
              switch (a) {
                case 'name':
                  u = O;
                  break;
                case 'type':
                  i = O;
                  break;
                case 'checked':
                  m = O;
                  break;
                case 'defaultChecked':
                  E = O;
                  break;
                case 'value':
                  n = O;
                  break;
                case 'defaultValue':
                  f = O;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (O != null) throw Error(r(137, t));
                  break;
                default:
                  be(e, t, a, O, l, null);
              }
          }
        er(e, n, f, m, E, i, u, !1), Zu(e);
        return;
      case 'select':
        ne('invalid', e), (a = i = n = null);
        for (u in l)
          if (l.hasOwnProperty(u) && ((f = l[u]), f != null))
            switch (u) {
              case 'value':
                n = f;
                break;
              case 'defaultValue':
                i = f;
                break;
              case 'multiple':
                a = f;
              default:
                be(e, t, u, f, l, null);
            }
        (t = n),
          (l = i),
          (e.multiple = !!a),
          t != null ? Wl(e, !!a, t, !1) : l != null && Wl(e, !!a, l, !0);
        return;
      case 'textarea':
        ne('invalid', e), (n = u = a = null);
        for (i in l)
          if (l.hasOwnProperty(i) && ((f = l[i]), f != null))
            switch (i) {
              case 'value':
                a = f;
                break;
              case 'defaultValue':
                u = f;
                break;
              case 'children':
                n = f;
                break;
              case 'dangerouslySetInnerHTML':
                if (f != null) throw Error(r(91));
                break;
              default:
                be(e, t, i, f, l, null);
            }
        lr(e, a, u, n), Zu(e);
        return;
      case 'option':
        for (m in l)
          if (l.hasOwnProperty(m) && ((a = l[m]), a != null))
            switch (m) {
              case 'selected':
                e.selected =
                  a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                be(e, t, m, a, l, null);
            }
        return;
      case 'dialog':
        ne('beforetoggle', e), ne('toggle', e), ne('cancel', e), ne('close', e);
        break;
      case 'iframe':
      case 'object':
        ne('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < gu.length; a++) ne(gu[a], e);
        break;
      case 'image':
        ne('error', e), ne('load', e);
        break;
      case 'details':
        ne('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        ne('error', e), ne('load', e);
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (E in l)
          if (l.hasOwnProperty(E) && ((a = l[E]), a != null))
            switch (E) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                be(e, t, E, a, l, null);
            }
        return;
      default:
        if (pi(t)) {
          for (O in l)
            l.hasOwnProperty(O) &&
              ((a = l[O]), a !== void 0 && af(e, t, O, a, l, void 0));
          return;
        }
    }
    for (f in l)
      l.hasOwnProperty(f) && ((a = l[f]), a != null && be(e, t, f, a, l, null));
  }
  function e0(e, t, l, a) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var u = null,
          n = null,
          i = null,
          f = null,
          m = null,
          E = null,
          O = null;
        for (R in l) {
          var j = l[R];
          if (l.hasOwnProperty(R) && j != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                m = j;
              default:
                a.hasOwnProperty(R) || be(e, t, R, null, a, j);
            }
        }
        for (var T in a) {
          var R = a[T];
          if (((j = l[T]), a.hasOwnProperty(T) && (R != null || j != null)))
            switch (T) {
              case 'type':
                n = R;
                break;
              case 'name':
                u = R;
                break;
              case 'checked':
                E = R;
                break;
              case 'defaultChecked':
                O = R;
                break;
              case 'value':
                i = R;
                break;
              case 'defaultValue':
                f = R;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(r(137, t));
                break;
              default:
                R !== j && be(e, t, T, R, a, j);
            }
        }
        gi(e, i, f, m, E, O, n, u);
        return;
      case 'select':
        R = i = f = T = null;
        for (n in l)
          if (((m = l[n]), l.hasOwnProperty(n) && m != null))
            switch (n) {
              case 'value':
                break;
              case 'multiple':
                R = m;
              default:
                a.hasOwnProperty(n) || be(e, t, n, null, a, m);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (m = l[u]),
            a.hasOwnProperty(u) && (n != null || m != null))
          )
            switch (u) {
              case 'value':
                T = n;
                break;
              case 'defaultValue':
                f = n;
                break;
              case 'multiple':
                i = n;
              default:
                n !== m && be(e, t, u, n, a, m);
            }
        (t = f),
          (l = i),
          (a = R),
          T != null
            ? Wl(e, !!l, T, !1)
            : !!a != !!l &&
              (t != null ? Wl(e, !!l, t, !0) : Wl(e, !!l, l ? [] : '', !1));
        return;
      case 'textarea':
        R = T = null;
        for (f in l)
          if (
            ((u = l[f]),
            l.hasOwnProperty(f) && u != null && !a.hasOwnProperty(f))
          )
            switch (f) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                be(e, t, f, null, a, u);
            }
        for (i in a)
          if (
            ((u = a[i]),
            (n = l[i]),
            a.hasOwnProperty(i) && (u != null || n != null))
          )
            switch (i) {
              case 'value':
                T = u;
                break;
              case 'defaultValue':
                R = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== n && be(e, t, i, u, a, n);
            }
        tr(e, T, R);
        return;
      case 'option':
        for (var P in l)
          if (
            ((T = l[P]),
            l.hasOwnProperty(P) && T != null && !a.hasOwnProperty(P))
          )
            switch (P) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                be(e, t, P, null, a, T);
            }
        for (m in a)
          if (
            ((T = a[m]),
            (R = l[m]),
            a.hasOwnProperty(m) && T !== R && (T != null || R != null))
          )
            switch (m) {
              case 'selected':
                e.selected =
                  T && typeof T != 'function' && typeof T != 'symbol';
                break;
              default:
                be(e, t, m, T, a, R);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var k in l)
          (T = l[k]),
            l.hasOwnProperty(k) &&
              T != null &&
              !a.hasOwnProperty(k) &&
              be(e, t, k, null, a, T);
        for (E in a)
          if (
            ((T = a[E]),
            (R = l[E]),
            a.hasOwnProperty(E) && T !== R && (T != null || R != null))
          )
            switch (E) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (T != null) throw Error(r(137, t));
                break;
              default:
                be(e, t, E, T, a, R);
            }
        return;
      default:
        if (pi(t)) {
          for (var pe in l)
            (T = l[pe]),
              l.hasOwnProperty(pe) &&
                T !== void 0 &&
                !a.hasOwnProperty(pe) &&
                af(e, t, pe, void 0, a, T);
          for (O in a)
            (T = a[O]),
              (R = l[O]),
              !a.hasOwnProperty(O) ||
                T === R ||
                (T === void 0 && R === void 0) ||
                af(e, t, O, T, a, R);
          return;
        }
    }
    for (var p in l)
      (T = l[p]),
        l.hasOwnProperty(p) &&
          T != null &&
          !a.hasOwnProperty(p) &&
          be(e, t, p, null, a, T);
    for (j in a)
      (T = a[j]),
        (R = l[j]),
        !a.hasOwnProperty(j) ||
          T === R ||
          (T == null && R == null) ||
          be(e, t, j, T, a, R);
  }
  var uf = null,
    nf = null;
  function Ln(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ud(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function nd(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function cf(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ff = null;
  function t0() {
    var e = window.event;
    return e && e.type === 'popstate'
      ? e === ff
        ? !1
        : ((ff = e), !0)
      : ((ff = null), !1);
  }
  var id = typeof setTimeout == 'function' ? setTimeout : void 0,
    l0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    cd = typeof Promise == 'function' ? Promise : void 0,
    a0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof cd < 'u'
        ? function (e) {
            return cd.resolve(null).then(e).catch(u0);
          }
        : id;
  function u0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function yl(e) {
    return e === 'head';
  }
  function fd(e, t) {
    var l = t,
      a = 0,
      u = 0;
    do {
      var n = l.nextSibling;
      if ((e.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === '/$')) {
          if (0 < a && 8 > a) {
            l = a;
            var i = e.ownerDocument;
            if ((l & 1 && pu(i.documentElement), l & 2 && pu(i.body), l & 4))
              for (l = i.head, pu(l), i = l.firstChild; i; ) {
                var f = i.nextSibling,
                  m = i.nodeName;
                i[Ca] ||
                  m === 'SCRIPT' ||
                  m === 'STYLE' ||
                  (m === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
                  l.removeChild(i),
                  (i = f);
              }
          }
          if (u === 0) {
            e.removeChild(n), zu(t);
            return;
          }
          u--;
        } else
          l === '$' || l === '$?' || l === '$!'
            ? u++
            : (a = l.charCodeAt(0) - 48);
      else a = 0;
      l = n;
    } while (l);
    zu(t);
  }
  function rf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          rf(l), hi(l);
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(l);
    }
  }
  function n0(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (a) {
        if (!e[Ca])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((n = e.getAttribute('rel')),
                n === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                n !== u.rel ||
                e.getAttribute('href') !==
                  (u.href == null || u.href === '' ? null : u.href) ||
                e.getAttribute('crossorigin') !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute('title') !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((n = e.getAttribute('src')),
                (n !== (u.src == null ? null : u.src) ||
                  e.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  e.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var n = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && e.getAttribute('name') === n) return e;
      } else return e;
      if (((e = Et(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function i0(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') &&
          !l) ||
        ((e = Et(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function sf(e) {
    return (
      e.data === '$!' ||
      (e.data === '$?' && e.ownerDocument.readyState === 'complete')
    );
  }
  function c0(e, t) {
    var l = e.ownerDocument;
    if (e.data !== '$?' || l.readyState === 'complete') t();
    else {
      var a = function () {
        t(), l.removeEventListener('DOMContentLoaded', a);
      };
      l.addEventListener('DOMContentLoaded', a), (e._reactRetry = a);
    }
  }
  function Et(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' || t === '$!' || t === '$?' || t === 'F!' || t === 'F')
        )
          break;
        if (t === '/$') return null;
      }
    }
    return e;
  }
  var of = null;
  function rd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '$' || l === '$!' || l === '$?') {
          if (t === 0) return e;
          t--;
        } else l === '/$' && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function sd(e, t, l) {
    switch (((t = Ln(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function pu(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    hi(e);
  }
  var pt = new Map(),
    od = new Set();
  function Gn(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var Vt = L.d;
  L.d = { f: f0, r: r0, D: s0, C: o0, L: d0, m: h0, X: y0, S: m0, M: v0 };
  function f0() {
    var e = Vt.f(),
      t = jn();
    return e || t;
  }
  function r0(e) {
    var t = Kl(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Ms(t) : Vt.r(e);
  }
  var Ra = typeof document > 'u' ? null : document;
  function dd(e, t, l) {
    var a = Ra;
    if (a && typeof t == 'string' && t) {
      var u = dt(t);
      (u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        od.has(u) ||
          (od.add(u),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(u) === null &&
            ((t = a.createElement('link')),
            Xe(t, 'link', e),
            He(t),
            a.head.appendChild(t)));
    }
  }
  function s0(e) {
    Vt.D(e), dd('dns-prefetch', e, null);
  }
  function o0(e, t) {
    Vt.C(e, t), dd('preconnect', e, t);
  }
  function d0(e, t, l) {
    Vt.L(e, t, l);
    var a = Ra;
    if (a && e && t) {
      var u = 'link[rel="preload"][as="' + dt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + dt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' &&
            (u += '[imagesizes="' + dt(l.imageSizes) + '"]'))
        : (u += '[href="' + dt(e) + '"]');
      var n = u;
      switch (t) {
        case 'style':
          n = za(e);
          break;
        case 'script':
          n = Da(e);
      }
      pt.has(n) ||
        ((e = A(
          {
            rel: 'preload',
            href: t === 'image' && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        pt.set(n, e),
        a.querySelector(u) !== null ||
          (t === 'style' && a.querySelector(Su(n))) ||
          (t === 'script' && a.querySelector(xu(n))) ||
          ((t = a.createElement('link')),
          Xe(t, 'link', e),
          He(t),
          a.head.appendChild(t)));
    }
  }
  function h0(e, t) {
    Vt.m(e, t);
    var l = Ra;
    if (l && e) {
      var a = t && typeof t.as == 'string' ? t.as : 'script',
        u =
          'link[rel="modulepreload"][as="' + dt(a) + '"][href="' + dt(e) + '"]',
        n = u;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          n = Da(e);
      }
      if (
        !pt.has(n) &&
        ((e = A({ rel: 'modulepreload', href: e }, t)),
        pt.set(n, e),
        l.querySelector(u) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(xu(n))) return;
        }
        (a = l.createElement('link')),
          Xe(a, 'link', e),
          He(a),
          l.head.appendChild(a);
      }
    }
  }
  function m0(e, t, l) {
    Vt.S(e, t, l);
    var a = Ra;
    if (a && e) {
      var u = Jl(a).hoistableStyles,
        n = za(e);
      t = t || 'default';
      var i = u.get(n);
      if (!i) {
        var f = { loading: 0, preload: null };
        if ((i = a.querySelector(Su(n)))) f.loading = 5;
        else {
          (e = A({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = pt.get(n)) && df(e, l);
          var m = (i = a.createElement('link'));
          He(m),
            Xe(m, 'link', e),
            (m._p = new Promise(function (E, O) {
              (m.onload = E), (m.onerror = O);
            })),
            m.addEventListener('load', function () {
              f.loading |= 1;
            }),
            m.addEventListener('error', function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            Xn(i, t, a);
        }
        (i = { type: 'stylesheet', instance: i, count: 1, state: f }),
          u.set(n, i);
      }
    }
  }
  function y0(e, t) {
    Vt.X(e, t);
    var l = Ra;
    if (l && e) {
      var a = Jl(l).hoistableScripts,
        u = Da(e),
        n = a.get(u);
      n ||
        ((n = l.querySelector(xu(u))),
        n ||
          ((e = A({ src: e, async: !0 }, t)),
          (t = pt.get(u)) && hf(e, t),
          (n = l.createElement('script')),
          He(n),
          Xe(n, 'link', e),
          l.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function v0(e, t) {
    Vt.M(e, t);
    var l = Ra;
    if (l && e) {
      var a = Jl(l).hoistableScripts,
        u = Da(e),
        n = a.get(u);
      n ||
        ((n = l.querySelector(xu(u))),
        n ||
          ((e = A({ src: e, async: !0, type: 'module' }, t)),
          (t = pt.get(u)) && hf(e, t),
          (n = l.createElement('script')),
          He(n),
          Xe(n, 'link', e),
          l.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function hd(e, t, l, a) {
    var u = (u = ee.current) ? Gn(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = za(l.href)),
            (l = Jl(u).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: 'style', instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          e = za(l.href);
          var n = Jl(u).hoistableStyles,
            i = n.get(e);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(e, i),
              (n = u.querySelector(Su(e))) &&
                !n._p &&
                ((i.instance = n), (i.state.loading = 5)),
              pt.has(e) ||
                ((l = {
                  rel: 'preload',
                  as: 'style',
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                pt.set(e, l),
                n || g0(u, e, l, i.state))),
            t && a === null)
          )
            throw Error(r(528, ''));
          return i;
        }
        if (t && a !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' &&
          t &&
          typeof t != 'function' &&
          typeof t != 'symbol'
            ? ((t = Da(l)),
              (l = Jl(u).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: 'script',
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function za(e) {
    return 'href="' + dt(e) + '"';
  }
  function Su(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function md(e) {
    return A({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function g0(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (a.loading = 1)
      : ((t = e.createElement('link')),
        (a.preload = t),
        t.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        Xe(t, 'link', l),
        He(t),
        e.head.appendChild(t));
  }
  function Da(e) {
    return '[src="' + dt(e) + '"]';
  }
  function xu(e) {
    return 'script[async]' + e;
  }
  function yd(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var a = e.querySelector('style[data-href~="' + dt(l.href) + '"]');
          if (a) return (t.instance = a), He(a), a;
          var u = A({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement('style')),
            He(a),
            Xe(a, 'style', u),
            Xn(a, l.precedence, e),
            (t.instance = a)
          );
        case 'stylesheet':
          u = za(l.href);
          var n = e.querySelector(Su(u));
          if (n) return (t.state.loading |= 4), (t.instance = n), He(n), n;
          (a = md(l)),
            (u = pt.get(u)) && df(a, u),
            (n = (e.ownerDocument || e).createElement('link')),
            He(n);
          var i = n;
          return (
            (i._p = new Promise(function (f, m) {
              (i.onload = f), (i.onerror = m);
            })),
            Xe(n, 'link', a),
            (t.state.loading |= 4),
            Xn(n, l.precedence, e),
            (t.instance = n)
          );
        case 'script':
          return (
            (n = Da(l.src)),
            (u = e.querySelector(xu(n)))
              ? ((t.instance = u), He(u), u)
              : ((a = l),
                (u = pt.get(n)) && ((a = A({}, l)), hf(a, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement('script')),
                He(u),
                Xe(u, 'link', a),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Xn(a, l.precedence, e));
    return t.instance;
  }
  function Xn(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        i = 0;
      i < a.length;
      i++
    ) {
      var f = a[i];
      if (f.dataset.precedence === t) n = f;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(e, n.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function df(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function hf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Qn = null;
  function vd(e, t, l) {
    if (Qn === null) {
      var a = new Map(),
        u = (Qn = new Map());
      u.set(l, a);
    } else (u = Qn), (a = u.get(l)), a || ((a = new Map()), u.set(l, a));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), u = 0;
      u < l.length;
      u++
    ) {
      var n = l[u];
      if (
        !(
          n[Ca] ||
          n[Ve] ||
          (e === 'link' && n.getAttribute('rel') === 'stylesheet')
        ) &&
        n.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var i = n.getAttribute(t) || '';
        i = e + i;
        var f = a.get(i);
        f ? f.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function gd(e, t, l) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === 'title' ? e.querySelector('head > title') : null
      );
  }
  function b0(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (
          typeof t.precedence != 'string' ||
          typeof t.href != 'string' ||
          t.href === ''
        )
          break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case 'stylesheet':
            return (
              (e = t.disabled), typeof t.precedence == 'string' && e == null
            );
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function bd(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  var Eu = null;
  function p0() {}
  function S0(e, t, l) {
    if (Eu === null) throw Error(r(475));
    var a = Eu;
    if (
      t.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var u = za(l.href),
          n = e.querySelector(Su(u));
        if (n) {
          (e = n._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (a.count++, (a = Zn.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = n),
            He(n);
          return;
        }
        (n = e.ownerDocument || e),
          (l = md(l)),
          (u = pt.get(u)) && df(l, u),
          (n = n.createElement('link')),
          He(n);
        var i = n;
        (i._p = new Promise(function (f, m) {
          (i.onload = f), (i.onerror = m);
        })),
          Xe(n, 'link', l),
          (t.instance = n);
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = Zn.bind(a)),
          e.addEventListener('load', t),
          e.addEventListener('error', t));
    }
  }
  function x0() {
    if (Eu === null) throw Error(r(475));
    var e = Eu;
    return (
      e.stylesheets && e.count === 0 && mf(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && mf(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                (e.unsuspend = null), a();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(l);
              }
            );
          }
        : null
    );
  }
  function Zn() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) mf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Vn = null;
  function mf(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Vn = new Map()),
        t.forEach(E0, e),
        (Vn = null),
        Zn.call(e));
  }
  function E0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Vn.get(e);
      if (l) var a = l.get(null);
      else {
        (l = new Map()), Vn.set(e, l);
        for (
          var u = e.querySelectorAll(
              'link[data-precedence],style[data-precedence]'
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === 'LINK' || i.getAttribute('media') !== 'not all') &&
            (l.set(i.dataset.precedence, i), (a = i));
        }
        a && l.set(null, a);
      }
      (u = t.instance),
        (i = u.getAttribute('data-precedence')),
        (n = l.get(i) || a),
        n === a && l.set(null, u),
        l.set(i, u),
        this.count++,
        (a = Zn.bind(this)),
        u.addEventListener('load', a),
        u.addEventListener('error', a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Tu = {
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0,
  };
  function T0(e, t, l, a, u, n, i, f) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ri(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ri(0)),
      (this.hiddenUpdates = ri(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map());
  }
  function pd(e, t, l, a, u, n, i, f, m, E, O, j) {
    return (
      (e = new T0(e, t, l, i, f, m, E, j)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = nt(3, null, null, t)),
      (e.current = n),
      (n.stateNode = e),
      (t = ki()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: a, isDehydrated: l, cache: t }),
      Pi(n),
      e
    );
  }
  function Sd(e) {
    return e ? ((e = na), e) : na;
  }
  function xd(e, t, l, a, u, n) {
    (u = Sd(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = ll(t)),
      (a.payload = { element: l }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (l = al(e, a, t)),
      l !== null && (st(l, e, t), Ia(l, e, t));
  }
  function Ed(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function yf(e, t) {
    Ed(e, t), (e = e.alternate) && Ed(e, t);
  }
  function Td(e) {
    if (e.tag === 13) {
      var t = ua(e, 67108864);
      t !== null && st(t, e, 67108864), yf(e, 67108864);
    }
  }
  var Kn = !0;
  function A0(e, t, l, a) {
    var u = M.T;
    M.T = null;
    var n = L.p;
    try {
      (L.p = 2), vf(e, t, l, a);
    } finally {
      (L.p = n), (M.T = u);
    }
  }
  function N0(e, t, l, a) {
    var u = M.T;
    M.T = null;
    var n = L.p;
    try {
      (L.p = 8), vf(e, t, l, a);
    } finally {
      (L.p = n), (M.T = u);
    }
  }
  function vf(e, t, l, a) {
    if (Kn) {
      var u = gf(a);
      if (u === null) lf(e, t, a, Jn, l), Nd(e, a);
      else if (z0(u, e, t, l, a)) a.stopPropagation();
      else if ((Nd(e, a), t & 4 && -1 < R0.indexOf(e))) {
        for (; u !== null; ) {
          var n = Kl(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Al(n.pendingLanes);
                  if (i !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var m = 1 << (31 - at(i));
                      (f.entanglements[1] |= m), (i &= ~m);
                    }
                    Dt(n), (me & 6) === 0 && ((Mn = Tt() + 500), vu(0));
                  }
                }
                break;
              case 13:
                (f = ua(n, 2)), f !== null && st(f, n, 2), jn(), yf(n, 2);
            }
          if (((n = gf(a)), n === null && lf(e, t, a, Jn, l), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else lf(e, t, a, null, l);
    }
  }
  function gf(e) {
    return (e = xi(e)), bf(e);
  }
  var Jn = null;
  function bf(e) {
    if (((Jn = null), (e = Vl(e)), e !== null)) {
      var t = y(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = z(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (Jn = e), null;
  }
  function Ad(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (oh()) {
          case Bf:
            return 2;
          case qf:
            return 8;
          case qu:
          case dh:
            return 32;
          case Yf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var pf = !1,
    vl = null,
    gl = null,
    bl = null,
    Au = new Map(),
    Nu = new Map(),
    pl = [],
    R0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Nd(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        vl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        gl = null;
        break;
      case 'mouseover':
      case 'mouseout':
        bl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Au.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Nu.delete(t.pointerId);
    }
  }
  function Ru(e, t, l, a, u, n) {
    return e === null || e.nativeEvent !== n
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = Kl(t)), t !== null && Td(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function z0(e, t, l, a, u) {
    switch (t) {
      case 'focusin':
        return (vl = Ru(vl, e, t, l, a, u)), !0;
      case 'dragenter':
        return (gl = Ru(gl, e, t, l, a, u)), !0;
      case 'mouseover':
        return (bl = Ru(bl, e, t, l, a, u)), !0;
      case 'pointerover':
        var n = u.pointerId;
        return Au.set(n, Ru(Au.get(n) || null, e, t, l, a, u)), !0;
      case 'gotpointercapture':
        return (
          (n = u.pointerId), Nu.set(n, Ru(Nu.get(n) || null, e, t, l, a, u)), !0
        );
    }
    return !1;
  }
  function Rd(e) {
    var t = Vl(e.target);
    if (t !== null) {
      var l = y(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = z(l)), t !== null)) {
            (e.blockedOn = t),
              Sh(e.priority, function () {
                if (l.tag === 13) {
                  var a = rt();
                  a = si(a);
                  var u = ua(l, a);
                  u !== null && st(u, l, a), yf(l, a);
                }
              });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function kn(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = gf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        (Si = a), l.target.dispatchEvent(a), (Si = null);
      } else return (t = Kl(l)), t !== null && Td(t), (e.blockedOn = l), !1;
      t.shift();
    }
    return !0;
  }
  function zd(e, t, l) {
    kn(e) && l.delete(t);
  }
  function D0() {
    (pf = !1),
      vl !== null && kn(vl) && (vl = null),
      gl !== null && kn(gl) && (gl = null),
      bl !== null && kn(bl) && (bl = null),
      Au.forEach(zd),
      Nu.forEach(zd);
  }
  function $n(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      pf ||
        ((pf = !0),
        c.unstable_scheduleCallback(c.unstable_NormalPriority, D0)));
  }
  var Wn = null;
  function Dd(e) {
    Wn !== e &&
      ((Wn = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        Wn === e && (Wn = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            u = e[t + 2];
          if (typeof a != 'function') {
            if (bf(a || l) === null) continue;
            break;
          }
          var n = Kl(l);
          n !== null &&
            (e.splice(t, 3),
            (t -= 3),
            gc(n, { pending: !0, data: u, method: l.method, action: a }, a, u));
        }
      }));
  }
  function zu(e) {
    function t(m) {
      return $n(m, e);
    }
    vl !== null && $n(vl, e),
      gl !== null && $n(gl, e),
      bl !== null && $n(bl, e),
      Au.forEach(t),
      Nu.forEach(t);
    for (var l = 0; l < pl.length; l++) {
      var a = pl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < pl.length && ((l = pl[0]), l.blockedOn === null); )
      Rd(l), l.blockedOn === null && pl.shift();
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var u = l[a],
          n = l[a + 1],
          i = u[We] || null;
        if (typeof n == 'function') i || Dd(l);
        else if (i) {
          var f = null;
          if (n && n.hasAttribute('formAction')) {
            if (((u = n), (i = n[We] || null))) f = i.formAction;
            else if (bf(u) !== null) continue;
          } else f = i.action;
          typeof f == 'function' ? (l[a + 1] = f) : (l.splice(a, 3), (a -= 3)),
            Dd(l);
        }
      }
  }
  function Sf(e) {
    this._internalRoot = e;
  }
  (Fn.prototype.render = Sf.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var l = t.current,
        a = rt();
      xd(l, a, e, t, null, null);
    }),
    (Fn.prototype.unmount = Sf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          xd(e.current, 2, null, e, null, null), jn(), (t[Zl] = null);
        }
      });
  function Fn(e) {
    this._internalRoot = e;
  }
  Fn.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Zf();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < pl.length && t !== 0 && t < pl[l].priority; l++);
      pl.splice(l, 0, e), l === 0 && Rd(e);
    }
  };
  var Od = s.version;
  if (Od !== '19.1.0') throw Error(r(527, Od, '19.1.0'));
  L.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return (
      (e = S(t)),
      (e = e !== null ? h(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var O0 = {
    bundleType: 0,
    version: '19.1.0',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: M,
    reconcilerVersion: '19.1.0',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Pn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pn.isDisabled && Pn.supportsFiber)
      try {
        (_a = Pn.inject(O0)), (lt = Pn);
      } catch {}
  }
  return (
    (Ou.createRoot = function (e, t) {
      if (!d(e)) throw Error(r(299));
      var l = !1,
        a = '',
        u = Zs,
        n = Vs,
        i = Ks,
        f = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (f = t.unstable_transitionCallbacks)),
        (t = pd(e, 1, !1, null, null, l, a, u, n, i, f, null)),
        (e[Zl] = t.current),
        tf(e),
        new Sf(t)
      );
    }),
    (Ou.hydrateRoot = function (e, t, l) {
      if (!d(e)) throw Error(r(299));
      var a = !1,
        u = '',
        n = Zs,
        i = Vs,
        f = Ks,
        m = null,
        E = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (n = l.onUncaughtError),
          l.onCaughtError !== void 0 && (i = l.onCaughtError),
          l.onRecoverableError !== void 0 && (f = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (m = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (E = l.formState)),
        (t = pd(e, 1, !0, t, l ?? null, a, u, n, i, f, m, E)),
        (t.context = Sd(null)),
        (l = t.current),
        (a = rt()),
        (a = si(a)),
        (u = ll(a)),
        (u.callback = null),
        al(l, u, a),
        (l = a),
        (t.current.lanes = l),
        Ua(t, l),
        Dt(t),
        (e[Zl] = t.current),
        tf(e),
        new Fn(t)
      );
    }),
    (Ou.version = '19.1.0'),
    Ou
  );
}
var Yd;
function Y0() {
  if (Yd) return Tf.exports;
  Yd = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return c(), (Tf.exports = q0()), Tf.exports;
}
var L0 = Y0(),
  Mu = {},
  Ld;
function G0() {
  if (Ld) return Mu;
  (Ld = 1),
    Object.defineProperty(Mu, '__esModule', { value: !0 }),
    (Mu.parse = z),
    (Mu.serialize = h);
  const c = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    s = /^[\u0021-\u003A\u003C-\u007E]*$/,
    o =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    d = Object.prototype.toString,
    y = (() => {
      const U = function () {};
      return (U.prototype = Object.create(null)), U;
    })();
  function z(U, q) {
    const H = new y(),
      V = U.length;
    if (V < 2) return H;
    const G = (q == null ? void 0 : q.decode) || A;
    let B = 0;
    do {
      const I = U.indexOf('=', B);
      if (I === -1) break;
      const X = U.indexOf(';', B),
        ie = X === -1 ? V : X;
      if (I > ie) {
        B = U.lastIndexOf(';', I - 1) + 1;
        continue;
      }
      const $ = N(U, B, I),
        ve = S(U, I, $),
        fe = U.slice($, ve);
      if (H[fe] === void 0) {
        let oe = N(U, I + 1, ie),
          he = S(U, ie, oe);
        const Ye = G(U.slice(oe, he));
        H[fe] = Ye;
      }
      B = ie + 1;
    } while (B < V);
    return H;
  }
  function N(U, q, H) {
    do {
      const V = U.charCodeAt(q);
      if (V !== 32 && V !== 9) return q;
    } while (++q < H);
    return H;
  }
  function S(U, q, H) {
    for (; q > H; ) {
      const V = U.charCodeAt(--q);
      if (V !== 32 && V !== 9) return q + 1;
    }
    return H;
  }
  function h(U, q, H) {
    const V = (H == null ? void 0 : H.encode) || encodeURIComponent;
    if (!c.test(U)) throw new TypeError(`argument name is invalid: ${U}`);
    const G = V(q);
    if (!s.test(G)) throw new TypeError(`argument val is invalid: ${q}`);
    let B = U + '=' + G;
    if (!H) return B;
    if (H.maxAge !== void 0) {
      if (!Number.isInteger(H.maxAge))
        throw new TypeError(`option maxAge is invalid: ${H.maxAge}`);
      B += '; Max-Age=' + H.maxAge;
    }
    if (H.domain) {
      if (!o.test(H.domain))
        throw new TypeError(`option domain is invalid: ${H.domain}`);
      B += '; Domain=' + H.domain;
    }
    if (H.path) {
      if (!r.test(H.path))
        throw new TypeError(`option path is invalid: ${H.path}`);
      B += '; Path=' + H.path;
    }
    if (H.expires) {
      if (!w(H.expires) || !Number.isFinite(H.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${H.expires}`);
      B += '; Expires=' + H.expires.toUTCString();
    }
    if (
      (H.httpOnly && (B += '; HttpOnly'),
      H.secure && (B += '; Secure'),
      H.partitioned && (B += '; Partitioned'),
      H.priority)
    )
      switch (
        typeof H.priority == 'string' ? H.priority.toLowerCase() : void 0
      ) {
        case 'low':
          B += '; Priority=Low';
          break;
        case 'medium':
          B += '; Priority=Medium';
          break;
        case 'high':
          B += '; Priority=High';
          break;
        default:
          throw new TypeError(`option priority is invalid: ${H.priority}`);
      }
    if (H.sameSite)
      switch (
        typeof H.sameSite == 'string' ? H.sameSite.toLowerCase() : H.sameSite
      ) {
        case !0:
        case 'strict':
          B += '; SameSite=Strict';
          break;
        case 'lax':
          B += '; SameSite=Lax';
          break;
        case 'none':
          B += '; SameSite=None';
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${H.sameSite}`);
      }
    return B;
  }
  function A(U) {
    if (U.indexOf('%') === -1) return U;
    try {
      return decodeURIComponent(U);
    } catch {
      return U;
    }
  }
  function w(U) {
    return d.call(U) === '[object Date]';
  }
  return Mu;
}
G0();
var Gd = 'popstate';
function X0(c = {}) {
  function s(r, d) {
    let { pathname: y, search: z, hash: N } = r.location;
    return Of(
      '',
      { pathname: y, search: z, hash: N },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || 'default'
    );
  }
  function o(r, d) {
    return typeof d == 'string' ? d : ju(d);
  }
  return Z0(s, o, null, c);
}
function Re(c, s) {
  if (c === !1 || c === null || typeof c > 'u') throw new Error(s);
}
function Ot(c, s) {
  if (!c) {
    typeof console < 'u' && console.warn(s);
    try {
      throw new Error(s);
    } catch {}
  }
}
function Q0() {
  return Math.random().toString(36).substring(2, 10);
}
function Xd(c, s) {
  return { usr: c.state, key: c.key, idx: s };
}
function Of(c, s, o = null, r) {
  return {
    pathname: typeof c == 'string' ? c : c.pathname,
    search: '',
    hash: '',
    ...(typeof s == 'string' ? Oa(s) : s),
    state: o,
    key: (s && s.key) || r || Q0(),
  };
}
function ju({ pathname: c = '/', search: s = '', hash: o = '' }) {
  return (
    s && s !== '?' && (c += s.charAt(0) === '?' ? s : '?' + s),
    o && o !== '#' && (c += o.charAt(0) === '#' ? o : '#' + o),
    c
  );
}
function Oa(c) {
  let s = {};
  if (c) {
    let o = c.indexOf('#');
    o >= 0 && ((s.hash = c.substring(o)), (c = c.substring(0, o)));
    let r = c.indexOf('?');
    r >= 0 && ((s.search = c.substring(r)), (c = c.substring(0, r))),
      c && (s.pathname = c);
  }
  return s;
}
function Z0(c, s, o, r = {}) {
  let { window: d = document.defaultView, v5Compat: y = !1 } = r,
    z = d.history,
    N = 'POP',
    S = null,
    h = A();
  h == null && ((h = 0), z.replaceState({ ...z.state, idx: h }, ''));
  function A() {
    return (z.state || { idx: null }).idx;
  }
  function w() {
    N = 'POP';
    let G = A(),
      B = G == null ? null : G - h;
    (h = G), S && S({ action: N, location: V.location, delta: B });
  }
  function U(G, B) {
    N = 'PUSH';
    let I = Of(V.location, G, B);
    h = A() + 1;
    let X = Xd(I, h),
      ie = V.createHref(I);
    try {
      z.pushState(X, '', ie);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') throw $;
      d.location.assign(ie);
    }
    y && S && S({ action: N, location: V.location, delta: 1 });
  }
  function q(G, B) {
    N = 'REPLACE';
    let I = Of(V.location, G, B);
    h = A();
    let X = Xd(I, h),
      ie = V.createHref(I);
    z.replaceState(X, '', ie),
      y && S && S({ action: N, location: V.location, delta: 0 });
  }
  function H(G) {
    return V0(G);
  }
  let V = {
    get action() {
      return N;
    },
    get location() {
      return c(d, z);
    },
    listen(G) {
      if (S) throw new Error('A history only accepts one active listener');
      return (
        d.addEventListener(Gd, w),
        (S = G),
        () => {
          d.removeEventListener(Gd, w), (S = null);
        }
      );
    },
    createHref(G) {
      return s(d, G);
    },
    createURL: H,
    encodeLocation(G) {
      let B = H(G);
      return { pathname: B.pathname, search: B.search, hash: B.hash };
    },
    push: U,
    replace: q,
    go(G) {
      return z.go(G);
    },
  };
  return V;
}
function V0(c, s = !1) {
  let o = 'http://localhost';
  typeof window < 'u' &&
    (o =
      window.location.origin !== 'null'
        ? window.location.origin
        : window.location.href),
    Re(o, 'No window.location.(origin|href) available to create URL');
  let r = typeof c == 'string' ? c : ju(c);
  return (
    (r = r.replace(/ $/, '%20')),
    !s && r.startsWith('//') && (r = o + r),
    new URL(r, o)
  );
}
function Jd(c, s, o = '/') {
  return K0(c, s, o, !1);
}
function K0(c, s, o, r) {
  let d = typeof s == 'string' ? Oa(s) : s,
    y = kt(d.pathname || '/', o);
  if (y == null) return null;
  let z = kd(c);
  J0(z);
  let N = null;
  for (let S = 0; N == null && S < z.length; ++S) {
    let h = uy(y);
    N = ly(z[S], h, r);
  }
  return N;
}
function kd(c, s = [], o = [], r = '') {
  let d = (y, z, N) => {
    let S = {
      relativePath: N === void 0 ? y.path || '' : N,
      caseSensitive: y.caseSensitive === !0,
      childrenIndex: z,
      route: y,
    };
    S.relativePath.startsWith('/') &&
      (Re(
        S.relativePath.startsWith(r),
        `Absolute route path "${S.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (S.relativePath = S.relativePath.slice(r.length)));
    let h = Jt([r, S.relativePath]),
      A = o.concat(S);
    y.children &&
      y.children.length > 0 &&
      (Re(
        y.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
      ),
      kd(y.children, s, A, h)),
      !(y.path == null && !y.index) &&
        s.push({ path: h, score: ey(h, y.index), routesMeta: A });
  };
  return (
    c.forEach((y, z) => {
      var N;
      if (y.path === '' || !((N = y.path) != null && N.includes('?'))) d(y, z);
      else for (let S of $d(y.path)) d(y, z, S);
    }),
    s
  );
}
function $d(c) {
  let s = c.split('/');
  if (s.length === 0) return [];
  let [o, ...r] = s,
    d = o.endsWith('?'),
    y = o.replace(/\?$/, '');
  if (r.length === 0) return d ? [y, ''] : [y];
  let z = $d(r.join('/')),
    N = [];
  return (
    N.push(...z.map((S) => (S === '' ? y : [y, S].join('/')))),
    d && N.push(...z),
    N.map((S) => (c.startsWith('/') && S === '' ? '/' : S))
  );
}
function J0(c) {
  c.sort((s, o) =>
    s.score !== o.score
      ? o.score - s.score
      : ty(
          s.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var k0 = /^:[\w-]+$/,
  $0 = 3,
  W0 = 2,
  F0 = 1,
  P0 = 10,
  I0 = -2,
  Qd = (c) => c === '*';
function ey(c, s) {
  let o = c.split('/'),
    r = o.length;
  return (
    o.some(Qd) && (r += I0),
    s && (r += W0),
    o
      .filter((d) => !Qd(d))
      .reduce((d, y) => d + (k0.test(y) ? $0 : y === '' ? F0 : P0), r)
  );
}
function ty(c, s) {
  return c.length === s.length && c.slice(0, -1).every((r, d) => r === s[d])
    ? c[c.length - 1] - s[s.length - 1]
    : 0;
}
function ly(c, s, o = !1) {
  let { routesMeta: r } = c,
    d = {},
    y = '/',
    z = [];
  for (let N = 0; N < r.length; ++N) {
    let S = r[N],
      h = N === r.length - 1,
      A = y === '/' ? s : s.slice(y.length) || '/',
      w = li(
        { path: S.relativePath, caseSensitive: S.caseSensitive, end: h },
        A
      ),
      U = S.route;
    if (
      (!w &&
        h &&
        o &&
        !r[r.length - 1].route.index &&
        (w = li(
          { path: S.relativePath, caseSensitive: S.caseSensitive, end: !1 },
          A
        )),
      !w)
    )
      return null;
    Object.assign(d, w.params),
      z.push({
        params: d,
        pathname: Jt([y, w.pathname]),
        pathnameBase: fy(Jt([y, w.pathnameBase])),
        route: U,
      }),
      w.pathnameBase !== '/' && (y = Jt([y, w.pathnameBase]));
  }
  return z;
}
function li(c, s) {
  typeof c == 'string' && (c = { path: c, caseSensitive: !1, end: !0 });
  let [o, r] = ay(c.path, c.caseSensitive, c.end),
    d = s.match(o);
  if (!d) return null;
  let y = d[0],
    z = y.replace(/(.)\/+$/, '$1'),
    N = d.slice(1);
  return {
    params: r.reduce((h, { paramName: A, isOptional: w }, U) => {
      if (A === '*') {
        let H = N[U] || '';
        z = y.slice(0, y.length - H.length).replace(/(.)\/+$/, '$1');
      }
      const q = N[U];
      return (
        w && !q ? (h[A] = void 0) : (h[A] = (q || '').replace(/%2F/g, '/')), h
      );
    }, {}),
    pathname: y,
    pathnameBase: z,
    pattern: c,
  };
}
function ay(c, s = !1, o = !0) {
  Ot(
    c === '*' || !c.endsWith('*') || c.endsWith('/*'),
    `Route path "${c}" will be treated as if it were "${c.replace(
      /\*$/,
      '/*'
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${c.replace(
      /\*$/,
      '/*'
    )}".`
  );
  let r = [],
    d =
      '^' +
      c
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (z, N, S) => (
            r.push({ paramName: N, isOptional: S != null }),
            S ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        );
  return (
    c.endsWith('*')
      ? (r.push({ paramName: '*' }),
        (d += c === '*' || c === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
      ? (d += '\\/*$')
      : c !== '' && c !== '/' && (d += '(?:(?=\\/|$))'),
    [new RegExp(d, s ? void 0 : 'i'), r]
  );
}
function uy(c) {
  try {
    return c
      .split('/')
      .map((s) => decodeURIComponent(s).replace(/\//g, '%2F'))
      .join('/');
  } catch (s) {
    return (
      Ot(
        !1,
        `The URL path "${c}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`
      ),
      c
    );
  }
}
function kt(c, s) {
  if (s === '/') return c;
  if (!c.toLowerCase().startsWith(s.toLowerCase())) return null;
  let o = s.endsWith('/') ? s.length - 1 : s.length,
    r = c.charAt(o);
  return r && r !== '/' ? null : c.slice(o) || '/';
}
function ny(c, s = '/') {
  let {
    pathname: o,
    search: r = '',
    hash: d = '',
  } = typeof c == 'string' ? Oa(c) : c;
  return {
    pathname: o ? (o.startsWith('/') ? o : iy(o, s)) : s,
    search: ry(r),
    hash: sy(d),
  };
}
function iy(c, s) {
  let o = s.replace(/\/+$/, '').split('/');
  return (
    c.split('/').forEach((d) => {
      d === '..' ? o.length > 1 && o.pop() : d !== '.' && o.push(d);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function zf(c, s, o, r) {
  return `Cannot include a '${c}' character in a manually specified \`to.${s}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function cy(c) {
  return c.filter(
    (s, o) => o === 0 || (s.route.path && s.route.path.length > 0)
  );
}
function Wd(c) {
  let s = cy(c);
  return s.map((o, r) => (r === s.length - 1 ? o.pathname : o.pathnameBase));
}
function Fd(c, s, o, r = !1) {
  let d;
  typeof c == 'string'
    ? (d = Oa(c))
    : ((d = { ...c }),
      Re(
        !d.pathname || !d.pathname.includes('?'),
        zf('?', 'pathname', 'search', d)
      ),
      Re(
        !d.pathname || !d.pathname.includes('#'),
        zf('#', 'pathname', 'hash', d)
      ),
      Re(!d.search || !d.search.includes('#'), zf('#', 'search', 'hash', d)));
  let y = c === '' || d.pathname === '',
    z = y ? '/' : d.pathname,
    N;
  if (z == null) N = o;
  else {
    let w = s.length - 1;
    if (!r && z.startsWith('..')) {
      let U = z.split('/');
      for (; U[0] === '..'; ) U.shift(), (w -= 1);
      d.pathname = U.join('/');
    }
    N = w >= 0 ? s[w] : '/';
  }
  let S = ny(d, N),
    h = z && z !== '/' && z.endsWith('/'),
    A = (y || z === '.') && o.endsWith('/');
  return !S.pathname.endsWith('/') && (h || A) && (S.pathname += '/'), S;
}
var Jt = (c) => c.join('/').replace(/\/\/+/g, '/'),
  fy = (c) => c.replace(/\/+$/, '').replace(/^\/*/, '/'),
  ry = (c) => (!c || c === '?' ? '' : c.startsWith('?') ? c : '?' + c),
  sy = (c) => (!c || c === '#' ? '' : c.startsWith('#') ? c : '#' + c);
function oy(c) {
  return (
    c != null &&
    typeof c.status == 'number' &&
    typeof c.statusText == 'string' &&
    typeof c.internal == 'boolean' &&
    'data' in c
  );
}
var Pd = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Pd);
var dy = ['GET', ...Pd];
new Set(dy);
var Ma = D.createContext(null);
Ma.displayName = 'DataRouter';
var ai = D.createContext(null);
ai.displayName = 'DataRouterState';
var Id = D.createContext({ isTransitioning: !1 });
Id.displayName = 'ViewTransition';
var hy = D.createContext(new Map());
hy.displayName = 'Fetchers';
var my = D.createContext(null);
my.displayName = 'Await';
var Mt = D.createContext(null);
Mt.displayName = 'Navigation';
var Cu = D.createContext(null);
Cu.displayName = 'Location';
var $t = D.createContext({ outlet: null, matches: [], isDataRoute: !1 });
$t.displayName = 'Route';
var jf = D.createContext(null);
jf.displayName = 'RouteError';
function yy(c, { relative: s } = {}) {
  Re(
    Hu(),
    'useHref() may be used only in the context of a <Router> component.'
  );
  let { basename: o, navigator: r } = D.useContext(Mt),
    { hash: d, pathname: y, search: z } = wu(c, { relative: s }),
    N = y;
  return (
    o !== '/' && (N = y === '/' ? o : Jt([o, y])),
    r.createHref({ pathname: N, search: z, hash: d })
  );
}
function Hu() {
  return D.useContext(Cu) != null;
}
function Xl() {
  return (
    Re(
      Hu(),
      'useLocation() may be used only in the context of a <Router> component.'
    ),
    D.useContext(Cu).location
  );
}
var eh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function th(c) {
  D.useContext(Mt).static || D.useLayoutEffect(c);
}
function Ql() {
  let { isDataRoute: c } = D.useContext($t);
  return c ? Dy() : vy();
}
function vy() {
  Re(
    Hu(),
    'useNavigate() may be used only in the context of a <Router> component.'
  );
  let c = D.useContext(Ma),
    { basename: s, navigator: o } = D.useContext(Mt),
    { matches: r } = D.useContext($t),
    { pathname: d } = Xl(),
    y = JSON.stringify(Wd(r)),
    z = D.useRef(!1);
  return (
    th(() => {
      z.current = !0;
    }),
    D.useCallback(
      (S, h = {}) => {
        if ((Ot(z.current, eh), !z.current)) return;
        if (typeof S == 'number') {
          o.go(S);
          return;
        }
        let A = Fd(S, JSON.parse(y), d, h.relative === 'path');
        c == null &&
          s !== '/' &&
          (A.pathname = A.pathname === '/' ? s : Jt([s, A.pathname])),
          (h.replace ? o.replace : o.push)(A, h.state, h);
      },
      [s, o, y, d, c]
    )
  );
}
D.createContext(null);
function wu(c, { relative: s } = {}) {
  let { matches: o } = D.useContext($t),
    { pathname: r } = Xl(),
    d = JSON.stringify(Wd(o));
  return D.useMemo(() => Fd(c, JSON.parse(d), r, s === 'path'), [c, d, r, s]);
}
function gy(c, s) {
  return lh(c, s);
}
function lh(c, s, o, r) {
  var I;
  Re(
    Hu(),
    'useRoutes() may be used only in the context of a <Router> component.'
  );
  let { navigator: d, static: y } = D.useContext(Mt),
    { matches: z } = D.useContext($t),
    N = z[z.length - 1],
    S = N ? N.params : {},
    h = N ? N.pathname : '/',
    A = N ? N.pathnameBase : '/',
    w = N && N.route;
  {
    let X = (w && w.path) || '';
    ah(
      h,
      !w || X.endsWith('*') || X.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${X}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${X}"> to <Route path="${
        X === '/' ? '*' : `${X}/*`
      }">.`
    );
  }
  let U = Xl(),
    q;
  if (s) {
    let X = typeof s == 'string' ? Oa(s) : s;
    Re(
      A === '/' || ((I = X.pathname) == null ? void 0 : I.startsWith(A)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${A}" but pathname "${X.pathname}" was given in the \`location\` prop.`
    ),
      (q = X);
  } else q = U;
  let H = q.pathname || '/',
    V = H;
  if (A !== '/') {
    let X = A.replace(/^\//, '').split('/');
    V = '/' + H.replace(/^\//, '').split('/').slice(X.length).join('/');
  }
  let G =
    !y && o && o.matches && o.matches.length > 0
      ? o.matches
      : Jd(c, { pathname: V });
  Ot(
    w || G != null,
    `No routes matched location "${q.pathname}${q.search}${q.hash}" `
  ),
    Ot(
      G == null ||
        G[G.length - 1].route.element !== void 0 ||
        G[G.length - 1].route.Component !== void 0 ||
        G[G.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${q.pathname}${q.search}${q.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let B = Ey(
    G &&
      G.map((X) =>
        Object.assign({}, X, {
          params: Object.assign({}, S, X.params),
          pathname: Jt([
            A,
            d.encodeLocation
              ? d.encodeLocation(X.pathname).pathname
              : X.pathname,
          ]),
          pathnameBase:
            X.pathnameBase === '/'
              ? A
              : Jt([
                  A,
                  d.encodeLocation
                    ? d.encodeLocation(X.pathnameBase).pathname
                    : X.pathnameBase,
                ]),
        })
      ),
    z,
    o,
    r
  );
  return s && B
    ? D.createElement(
        Cu.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              ...q,
            },
            navigationType: 'POP',
          },
        },
        B
      )
    : B;
}
function by() {
  let c = zy(),
    s = oy(c)
      ? `${c.status} ${c.statusText}`
      : c instanceof Error
      ? c.message
      : JSON.stringify(c),
    o = c instanceof Error ? c.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    d = { padding: '0.5rem', backgroundColor: r },
    y = { padding: '2px 4px', backgroundColor: r },
    z = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', c),
    (z = D.createElement(
      D.Fragment,
      null,
      D.createElement('p', null, '💿 Hey developer 👋'),
      D.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        D.createElement('code', { style: y }, 'ErrorBoundary'),
        ' or',
        ' ',
        D.createElement('code', { style: y }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    D.createElement(
      D.Fragment,
      null,
      D.createElement('h2', null, 'Unexpected Application Error!'),
      D.createElement('h3', { style: { fontStyle: 'italic' } }, s),
      o ? D.createElement('pre', { style: d }, o) : null,
      z
    )
  );
}
var py = D.createElement(by, null),
  Sy = class extends D.Component {
    constructor(c) {
      super(c),
        (this.state = {
          location: c.location,
          revalidation: c.revalidation,
          error: c.error,
        });
    }
    static getDerivedStateFromError(c) {
      return { error: c };
    }
    static getDerivedStateFromProps(c, s) {
      return s.location !== c.location ||
        (s.revalidation !== 'idle' && c.revalidation === 'idle')
        ? { error: c.error, location: c.location, revalidation: c.revalidation }
        : {
            error: c.error !== void 0 ? c.error : s.error,
            location: s.location,
            revalidation: c.revalidation || s.revalidation,
          };
    }
    componentDidCatch(c, s) {
      console.error(
        'React Router caught the following error during render',
        c,
        s
      );
    }
    render() {
      return this.state.error !== void 0
        ? D.createElement(
            $t.Provider,
            { value: this.props.routeContext },
            D.createElement(jf.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function xy({ routeContext: c, match: s, children: o }) {
  let r = D.useContext(Ma);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (s.route.errorElement || s.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = s.route.id),
    D.createElement($t.Provider, { value: c }, o)
  );
}
function Ey(c, s = [], o = null, r = null) {
  if (c == null) {
    if (!o) return null;
    if (o.errors) c = o.matches;
    else if (s.length === 0 && !o.initialized && o.matches.length > 0)
      c = o.matches;
    else return null;
  }
  let d = c,
    y = o == null ? void 0 : o.errors;
  if (y != null) {
    let S = d.findIndex(
      (h) => h.route.id && (y == null ? void 0 : y[h.route.id]) !== void 0
    );
    Re(
      S >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        y
      ).join(',')}`
    ),
      (d = d.slice(0, Math.min(d.length, S + 1)));
  }
  let z = !1,
    N = -1;
  if (o)
    for (let S = 0; S < d.length; S++) {
      let h = d[S];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (N = S),
        h.route.id)
      ) {
        let { loaderData: A, errors: w } = o,
          U =
            h.route.loader &&
            !A.hasOwnProperty(h.route.id) &&
            (!w || w[h.route.id] === void 0);
        if (h.route.lazy || U) {
          (z = !0), N >= 0 ? (d = d.slice(0, N + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  return d.reduceRight((S, h, A) => {
    let w,
      U = !1,
      q = null,
      H = null;
    o &&
      ((w = y && h.route.id ? y[h.route.id] : void 0),
      (q = h.route.errorElement || py),
      z &&
        (N < 0 && A === 0
          ? (ah(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (U = !0),
            (H = null))
          : N === A &&
            ((U = !0), (H = h.route.hydrateFallbackElement || null))));
    let V = s.concat(d.slice(0, A + 1)),
      G = () => {
        let B;
        return (
          w
            ? (B = q)
            : U
            ? (B = H)
            : h.route.Component
            ? (B = D.createElement(h.route.Component, null))
            : h.route.element
            ? (B = h.route.element)
            : (B = S),
          D.createElement(xy, {
            match: h,
            routeContext: { outlet: S, matches: V, isDataRoute: o != null },
            children: B,
          })
        );
      };
    return o && (h.route.ErrorBoundary || h.route.errorElement || A === 0)
      ? D.createElement(Sy, {
          location: o.location,
          revalidation: o.revalidation,
          component: q,
          error: w,
          children: G(),
          routeContext: { outlet: null, matches: V, isDataRoute: !0 },
        })
      : G();
  }, null);
}
function Uf(c) {
  return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ty(c) {
  let s = D.useContext(Ma);
  return Re(s, Uf(c)), s;
}
function Ay(c) {
  let s = D.useContext(ai);
  return Re(s, Uf(c)), s;
}
function Ny(c) {
  let s = D.useContext($t);
  return Re(s, Uf(c)), s;
}
function Cf(c) {
  let s = Ny(c),
    o = s.matches[s.matches.length - 1];
  return (
    Re(
      o.route.id,
      `${c} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  );
}
function Ry() {
  return Cf('useRouteId');
}
function zy() {
  var r;
  let c = D.useContext(jf),
    s = Ay('useRouteError'),
    o = Cf('useRouteError');
  return c !== void 0 ? c : (r = s.errors) == null ? void 0 : r[o];
}
function Dy() {
  let { router: c } = Ty('useNavigate'),
    s = Cf('useNavigate'),
    o = D.useRef(!1);
  return (
    th(() => {
      o.current = !0;
    }),
    D.useCallback(
      async (d, y = {}) => {
        Ot(o.current, eh),
          o.current &&
            (typeof d == 'number'
              ? c.navigate(d)
              : await c.navigate(d, { fromRouteId: s, ...y }));
      },
      [c, s]
    )
  );
}
var Zd = {};
function ah(c, s, o) {
  !s && !Zd[c] && ((Zd[c] = !0), Ot(!1, o));
}
D.memo(Oy);
function Oy({ routes: c, future: s, state: o }) {
  return lh(c, void 0, o, s);
}
function xl(c) {
  Re(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function My({
  basename: c = '/',
  children: s = null,
  location: o,
  navigationType: r = 'POP',
  navigator: d,
  static: y = !1,
}) {
  Re(
    !Hu(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let z = c.replace(/^\/*/, '/'),
    N = D.useMemo(
      () => ({ basename: z, navigator: d, static: y, future: {} }),
      [z, d, y]
    );
  typeof o == 'string' && (o = Oa(o));
  let {
      pathname: S = '/',
      search: h = '',
      hash: A = '',
      state: w = null,
      key: U = 'default',
    } = o,
    q = D.useMemo(() => {
      let H = kt(S, z);
      return H == null
        ? null
        : {
            location: { pathname: H, search: h, hash: A, state: w, key: U },
            navigationType: r,
          };
    }, [z, S, h, A, w, U, r]);
  return (
    Ot(
      q != null,
      `<Router basename="${z}"> is not able to match the URL "${S}${h}${A}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    q == null
      ? null
      : D.createElement(
          Mt.Provider,
          { value: N },
          D.createElement(Cu.Provider, { children: s, value: q })
        )
  );
}
function _y({ children: c, location: s }) {
  return gy(Mf(c), s);
}
function Mf(c, s = []) {
  let o = [];
  return (
    D.Children.forEach(c, (r, d) => {
      if (!D.isValidElement(r)) return;
      let y = [...s, d];
      if (r.type === D.Fragment) {
        o.push.apply(o, Mf(r.props.children, y));
        return;
      }
      Re(
        r.type === xl,
        `[${
          typeof r.type == 'string' ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Re(
          !r.props.index || !r.props.children,
          'An index route cannot have child routes.'
        );
      let z = {
        id: r.props.id || y.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (z.children = Mf(r.props.children, y)), o.push(z);
    }),
    o
  );
}
var ei = 'get',
  ti = 'application/x-www-form-urlencoded';
function ui(c) {
  return c != null && typeof c.tagName == 'string';
}
function jy(c) {
  return ui(c) && c.tagName.toLowerCase() === 'button';
}
function Uy(c) {
  return ui(c) && c.tagName.toLowerCase() === 'form';
}
function Cy(c) {
  return ui(c) && c.tagName.toLowerCase() === 'input';
}
function Hy(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function wy(c, s) {
  return c.button === 0 && (!s || s === '_self') && !Hy(c);
}
var In = null;
function By() {
  if (In === null)
    try {
      new FormData(document.createElement('form'), 0), (In = !1);
    } catch {
      In = !0;
    }
  return In;
}
var qy = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);
function Df(c) {
  return c != null && !qy.has(c)
    ? (Ot(
        !1,
        `"${c}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ti}"`
      ),
      null)
    : c;
}
function Yy(c, s) {
  let o, r, d, y, z;
  if (Uy(c)) {
    let N = c.getAttribute('action');
    (r = N ? kt(N, s) : null),
      (o = c.getAttribute('method') || ei),
      (d = Df(c.getAttribute('enctype')) || ti),
      (y = new FormData(c));
  } else if (jy(c) || (Cy(c) && (c.type === 'submit' || c.type === 'image'))) {
    let N = c.form;
    if (N == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let S = c.getAttribute('formaction') || N.getAttribute('action');
    if (
      ((r = S ? kt(S, s) : null),
      (o = c.getAttribute('formmethod') || N.getAttribute('method') || ei),
      (d =
        Df(c.getAttribute('formenctype')) ||
        Df(N.getAttribute('enctype')) ||
        ti),
      (y = new FormData(N, c)),
      !By())
    ) {
      let { name: h, type: A, value: w } = c;
      if (A === 'image') {
        let U = h ? `${h}.` : '';
        y.append(`${U}x`, '0'), y.append(`${U}y`, '0');
      } else h && y.append(h, w);
    }
  } else {
    if (ui(c))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (o = ei), (r = null), (d = ti), (z = c);
  }
  return (
    y && d === 'text/plain' && ((z = y), (y = void 0)),
    { action: r, method: o.toLowerCase(), encType: d, formData: y, body: z }
  );
}
function Hf(c, s) {
  if (c === !1 || c === null || typeof c > 'u') throw new Error(s);
}
async function Ly(c, s) {
  if (c.id in s) return s[c.id];
  try {
    let o = await import(c.module);
    return (s[c.id] = o), o;
  } catch (o) {
    return (
      console.error(
        `Error loading route module \`${c.module}\`, reloading page...`
      ),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Gy(c) {
  return c == null
    ? !1
    : c.href == null
    ? c.rel === 'preload' &&
      typeof c.imageSrcSet == 'string' &&
      typeof c.imageSizes == 'string'
    : typeof c.rel == 'string' && typeof c.href == 'string';
}
async function Xy(c, s, o) {
  let r = await Promise.all(
    c.map(async (d) => {
      let y = s.routes[d.route.id];
      if (y) {
        let z = await Ly(y, o);
        return z.links ? z.links() : [];
      }
      return [];
    })
  );
  return Ky(
    r
      .flat(1)
      .filter(Gy)
      .filter((d) => d.rel === 'stylesheet' || d.rel === 'preload')
      .map((d) =>
        d.rel === 'stylesheet'
          ? { ...d, rel: 'prefetch', as: 'style' }
          : { ...d, rel: 'prefetch' }
      )
  );
}
function Vd(c, s, o, r, d, y) {
  let z = (S, h) => (o[h] ? S.route.id !== o[h].route.id : !0),
    N = (S, h) => {
      var A;
      return (
        o[h].pathname !== S.pathname ||
        (((A = o[h].route.path) == null ? void 0 : A.endsWith('*')) &&
          o[h].params['*'] !== S.params['*'])
      );
    };
  return y === 'assets'
    ? s.filter((S, h) => z(S, h) || N(S, h))
    : y === 'data'
    ? s.filter((S, h) => {
        var w;
        let A = r.routes[S.route.id];
        if (!A || !A.hasLoader) return !1;
        if (z(S, h) || N(S, h)) return !0;
        if (S.route.shouldRevalidate) {
          let U = S.route.shouldRevalidate({
            currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
            currentParams: ((w = o[0]) == null ? void 0 : w.params) || {},
            nextUrl: new URL(c, window.origin),
            nextParams: S.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof U == 'boolean') return U;
        }
        return !0;
      })
    : [];
}
function Qy(c, s, { includeHydrateFallback: o } = {}) {
  return Zy(
    c
      .map((r) => {
        let d = s.routes[r.route.id];
        if (!d) return [];
        let y = [d.module];
        return (
          d.clientActionModule && (y = y.concat(d.clientActionModule)),
          d.clientLoaderModule && (y = y.concat(d.clientLoaderModule)),
          o &&
            d.hydrateFallbackModule &&
            (y = y.concat(d.hydrateFallbackModule)),
          d.imports && (y = y.concat(d.imports)),
          y
        );
      })
      .flat(1)
  );
}
function Zy(c) {
  return [...new Set(c)];
}
function Vy(c) {
  let s = {},
    o = Object.keys(c).sort();
  for (let r of o) s[r] = c[r];
  return s;
}
function Ky(c, s) {
  let o = new Set();
  return (
    new Set(s),
    c.reduce((r, d) => {
      let y = JSON.stringify(Vy(d));
      return o.has(y) || (o.add(y), r.push({ key: y, link: d })), r;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Jy = new Set([100, 101, 204, 205]);
function ky(c, s) {
  let o =
    typeof c == 'string'
      ? new URL(
          c,
          typeof window > 'u' ? 'server://singlefetch/' : window.location.origin
        )
      : c;
  return (
    o.pathname === '/'
      ? (o.pathname = '_root.data')
      : s && kt(o.pathname, s) === '/'
      ? (o.pathname = `${s.replace(/\/$/, '')}/_root.data`)
      : (o.pathname = `${o.pathname.replace(/\/$/, '')}.data`),
    o
  );
}
function uh() {
  let c = D.useContext(Ma);
  return (
    Hf(
      c,
      'You must render this element inside a <DataRouterContext.Provider> element'
    ),
    c
  );
}
function $y() {
  let c = D.useContext(ai);
  return (
    Hf(
      c,
      'You must render this element inside a <DataRouterStateContext.Provider> element'
    ),
    c
  );
}
var wf = D.createContext(void 0);
wf.displayName = 'FrameworkContext';
function nh() {
  let c = D.useContext(wf);
  return (
    Hf(c, 'You must render this element inside a <HydratedRouter> element'), c
  );
}
function Wy(c, s) {
  let o = D.useContext(wf),
    [r, d] = D.useState(!1),
    [y, z] = D.useState(!1),
    {
      onFocus: N,
      onBlur: S,
      onMouseEnter: h,
      onMouseLeave: A,
      onTouchStart: w,
    } = s,
    U = D.useRef(null);
  D.useEffect(() => {
    if ((c === 'render' && z(!0), c === 'viewport')) {
      let V = (B) => {
          B.forEach((I) => {
            z(I.isIntersecting);
          });
        },
        G = new IntersectionObserver(V, { threshold: 0.5 });
      return (
        U.current && G.observe(U.current),
        () => {
          G.disconnect();
        }
      );
    }
  }, [c]),
    D.useEffect(() => {
      if (r) {
        let V = setTimeout(() => {
          z(!0);
        }, 100);
        return () => {
          clearTimeout(V);
        };
      }
    }, [r]);
  let q = () => {
      d(!0);
    },
    H = () => {
      d(!1), z(!1);
    };
  return o
    ? c !== 'intent'
      ? [y, U, {}]
      : [
          y,
          U,
          {
            onFocus: _u(N, q),
            onBlur: _u(S, H),
            onMouseEnter: _u(h, q),
            onMouseLeave: _u(A, H),
            onTouchStart: _u(w, q),
          },
        ]
    : [!1, U, {}];
}
function _u(c, s) {
  return (o) => {
    c && c(o), o.defaultPrevented || s(o);
  };
}
function Fy({ page: c, ...s }) {
  let { router: o } = uh(),
    r = D.useMemo(() => Jd(o.routes, c, o.basename), [o.routes, c, o.basename]);
  return r ? D.createElement(Iy, { page: c, matches: r, ...s }) : null;
}
function Py(c) {
  let { manifest: s, routeModules: o } = nh(),
    [r, d] = D.useState([]);
  return (
    D.useEffect(() => {
      let y = !1;
      return (
        Xy(c, s, o).then((z) => {
          y || d(z);
        }),
        () => {
          y = !0;
        }
      );
    }, [c, s, o]),
    r
  );
}
function Iy({ page: c, matches: s, ...o }) {
  let r = Xl(),
    { manifest: d, routeModules: y } = nh(),
    { basename: z } = uh(),
    { loaderData: N, matches: S } = $y(),
    h = D.useMemo(() => Vd(c, s, S, d, r, 'data'), [c, s, S, d, r]),
    A = D.useMemo(() => Vd(c, s, S, d, r, 'assets'), [c, s, S, d, r]),
    w = D.useMemo(() => {
      if (c === r.pathname + r.search + r.hash) return [];
      let H = new Set(),
        V = !1;
      if (
        (s.forEach((B) => {
          var X;
          let I = d.routes[B.route.id];
          !I ||
            !I.hasLoader ||
            ((!h.some((ie) => ie.route.id === B.route.id) &&
              B.route.id in N &&
              (X = y[B.route.id]) != null &&
              X.shouldRevalidate) ||
            I.hasClientLoader
              ? (V = !0)
              : H.add(B.route.id));
        }),
        H.size === 0)
      )
        return [];
      let G = ky(c, z);
      return (
        V &&
          H.size > 0 &&
          G.searchParams.set(
            '_routes',
            s
              .filter((B) => H.has(B.route.id))
              .map((B) => B.route.id)
              .join(',')
          ),
        [G.pathname + G.search]
      );
    }, [z, N, r, d, h, s, c, y]),
    U = D.useMemo(() => Qy(A, d), [A, d]),
    q = Py(A);
  return D.createElement(
    D.Fragment,
    null,
    w.map((H) =>
      D.createElement('link', {
        key: H,
        rel: 'prefetch',
        as: 'fetch',
        href: H,
        ...o,
      })
    ),
    U.map((H) =>
      D.createElement('link', { key: H, rel: 'modulepreload', href: H, ...o })
    ),
    q.map(({ key: H, link: V }) => D.createElement('link', { key: H, ...V }))
  );
}
function ev(...c) {
  return (s) => {
    c.forEach((o) => {
      typeof o == 'function' ? o(s) : o != null && (o.current = s);
    });
  };
}
var ih =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u';
try {
  ih && (window.__reactRouterVersion = '7.6.0');
} catch {}
function tv({ basename: c, children: s, window: o }) {
  let r = D.useRef();
  r.current == null && (r.current = X0({ window: o, v5Compat: !0 }));
  let d = r.current,
    [y, z] = D.useState({ action: d.action, location: d.location }),
    N = D.useCallback(
      (S) => {
        D.startTransition(() => z(S));
      },
      [z]
    );
  return (
    D.useLayoutEffect(() => d.listen(N), [d, N]),
    D.createElement(My, {
      basename: c,
      children: s,
      location: y.location,
      navigationType: y.action,
      navigator: d,
    })
  );
}
var ch = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Uu = D.forwardRef(function (
    {
      onClick: s,
      discover: o = 'render',
      prefetch: r = 'none',
      relative: d,
      reloadDocument: y,
      replace: z,
      state: N,
      target: S,
      to: h,
      preventScrollReset: A,
      viewTransition: w,
      ...U
    },
    q
  ) {
    let { basename: H } = D.useContext(Mt),
      V = typeof h == 'string' && ch.test(h),
      G,
      B = !1;
    if (typeof h == 'string' && V && ((G = h), ih))
      try {
        let he = new URL(window.location.href),
          Ye = h.startsWith('//') ? new URL(he.protocol + h) : new URL(h),
          $e = kt(Ye.pathname, H);
        Ye.origin === he.origin && $e != null
          ? (h = $e + Ye.search + Ye.hash)
          : (B = !0);
      } catch {
        Ot(
          !1,
          `<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let I = yy(h, { relative: d }),
      [X, ie, $] = Wy(r, U),
      ve = nv(h, {
        replace: z,
        state: N,
        target: S,
        preventScrollReset: A,
        relative: d,
        viewTransition: w,
      });
    function fe(he) {
      s && s(he), he.defaultPrevented || ve(he);
    }
    let oe = D.createElement('a', {
      ...U,
      ...$,
      href: G || I,
      onClick: B || y ? s : fe,
      ref: ev(q, ie),
      target: S,
      'data-discover': !V && o === 'render' ? 'true' : void 0,
    });
    return X && !V
      ? D.createElement(D.Fragment, null, oe, D.createElement(Fy, { page: I }))
      : oe;
  });
Uu.displayName = 'Link';
var lv = D.forwardRef(function (
  {
    'aria-current': s = 'page',
    caseSensitive: o = !1,
    className: r = '',
    end: d = !1,
    style: y,
    to: z,
    viewTransition: N,
    children: S,
    ...h
  },
  A
) {
  let w = wu(z, { relative: h.relative }),
    U = Xl(),
    q = D.useContext(ai),
    { navigator: H, basename: V } = D.useContext(Mt),
    G = q != null && sv(w) && N === !0,
    B = H.encodeLocation ? H.encodeLocation(w).pathname : w.pathname,
    I = U.pathname,
    X =
      q && q.navigation && q.navigation.location
        ? q.navigation.location.pathname
        : null;
  o ||
    ((I = I.toLowerCase()),
    (X = X ? X.toLowerCase() : null),
    (B = B.toLowerCase())),
    X && V && (X = kt(X, V) || X);
  const ie = B !== '/' && B.endsWith('/') ? B.length - 1 : B.length;
  let $ = I === B || (!d && I.startsWith(B) && I.charAt(ie) === '/'),
    ve =
      X != null &&
      (X === B || (!d && X.startsWith(B) && X.charAt(B.length) === '/')),
    fe = { isActive: $, isPending: ve, isTransitioning: G },
    oe = $ ? s : void 0,
    he;
  typeof r == 'function'
    ? (he = r(fe))
    : (he = [
        r,
        $ ? 'active' : null,
        ve ? 'pending' : null,
        G ? 'transitioning' : null,
      ]
        .filter(Boolean)
        .join(' '));
  let Ye = typeof y == 'function' ? y(fe) : y;
  return D.createElement(
    Uu,
    {
      ...h,
      'aria-current': oe,
      className: he,
      ref: A,
      style: Ye,
      to: z,
      viewTransition: N,
    },
    typeof S == 'function' ? S(fe) : S
  );
});
lv.displayName = 'NavLink';
var av = D.forwardRef(
  (
    {
      discover: c = 'render',
      fetcherKey: s,
      navigate: o,
      reloadDocument: r,
      replace: d,
      state: y,
      method: z = ei,
      action: N,
      onSubmit: S,
      relative: h,
      preventScrollReset: A,
      viewTransition: w,
      ...U
    },
    q
  ) => {
    let H = fv(),
      V = rv(N, { relative: h }),
      G = z.toLowerCase() === 'get' ? 'get' : 'post',
      B = typeof N == 'string' && ch.test(N),
      I = (X) => {
        if ((S && S(X), X.defaultPrevented)) return;
        X.preventDefault();
        let ie = X.nativeEvent.submitter,
          $ = (ie == null ? void 0 : ie.getAttribute('formmethod')) || z;
        H(ie || X.currentTarget, {
          fetcherKey: s,
          method: $,
          navigate: o,
          replace: d,
          state: y,
          relative: h,
          preventScrollReset: A,
          viewTransition: w,
        });
      };
    return D.createElement('form', {
      ref: q,
      method: G,
      action: V,
      onSubmit: r ? S : I,
      ...U,
      'data-discover': !B && c === 'render' ? 'true' : void 0,
    });
  }
);
av.displayName = 'Form';
function uv(c) {
  return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function fh(c) {
  let s = D.useContext(Ma);
  return Re(s, uv(c)), s;
}
function nv(
  c,
  {
    target: s,
    replace: o,
    state: r,
    preventScrollReset: d,
    relative: y,
    viewTransition: z,
  } = {}
) {
  let N = Ql(),
    S = Xl(),
    h = wu(c, { relative: y });
  return D.useCallback(
    (A) => {
      if (wy(A, s)) {
        A.preventDefault();
        let w = o !== void 0 ? o : ju(S) === ju(h);
        N(c, {
          replace: w,
          state: r,
          preventScrollReset: d,
          relative: y,
          viewTransition: z,
        });
      }
    },
    [S, N, h, o, r, s, c, d, y, z]
  );
}
var iv = 0,
  cv = () => `__${String(++iv)}__`;
function fv() {
  let { router: c } = fh('useSubmit'),
    { basename: s } = D.useContext(Mt),
    o = Ry();
  return D.useCallback(
    async (r, d = {}) => {
      let { action: y, method: z, encType: N, formData: S, body: h } = Yy(r, s);
      if (d.navigate === !1) {
        let A = d.fetcherKey || cv();
        await c.fetch(A, o, d.action || y, {
          preventScrollReset: d.preventScrollReset,
          formData: S,
          body: h,
          formMethod: d.method || z,
          formEncType: d.encType || N,
          flushSync: d.flushSync,
        });
      } else
        await c.navigate(d.action || y, {
          preventScrollReset: d.preventScrollReset,
          formData: S,
          body: h,
          formMethod: d.method || z,
          formEncType: d.encType || N,
          replace: d.replace,
          state: d.state,
          fromRouteId: o,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition,
        });
    },
    [c, s, o]
  );
}
function rv(c, { relative: s } = {}) {
  let { basename: o } = D.useContext(Mt),
    r = D.useContext($t);
  Re(r, 'useFormAction must be used inside a RouteContext');
  let [d] = r.matches.slice(-1),
    y = { ...wu(c || '.', { relative: s }) },
    z = Xl();
  if (c == null) {
    y.search = z.search;
    let N = new URLSearchParams(y.search),
      S = N.getAll('index');
    if (S.some((A) => A === '')) {
      N.delete('index'),
        S.filter((w) => w).forEach((w) => N.append('index', w));
      let A = N.toString();
      y.search = A ? `?${A}` : '';
    }
  }
  return (
    (!c || c === '.') &&
      d.route.index &&
      (y.search = y.search ? y.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (y.pathname = y.pathname === '/' ? o : Jt([o, y.pathname])),
    ju(y)
  );
}
function sv(c, s = {}) {
  let o = D.useContext(Id);
  Re(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = fh('useViewTransitionState'),
    d = wu(c, { relative: s.relative });
  if (!o.isTransitioning) return !1;
  let y = kt(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    z = kt(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return li(d.pathname, z) != null || li(d.pathname, y) != null;
}
[...Jy];
function Kd() {
  Ql();
  const [c, s] = D.useState(!1),
    [o, r] = D.useState(''),
    [d, y] = D.useState({
      email: 'tushar@example.com',
      password: 'password123',
    }),
    z = (S) => {
      const { name: h, value: A } = S.target;
      y((w) => ({ ...w, [h]: A }));
    },
    N = async (S) => {
      S.preventDefault(), s(!0), r('');
      try {
        const h = await fetch(
          'https://api.pixelperfects.in/api/v1/user/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(d),
          }
        );
        if (!h.ok) throw new Error('Login failed');
        const A = await h.json();
        if ((console.log('Login response data:', A), !A.token))
          throw new Error('No token returned from server');
        window.location.href = `http://localhost:3000?token=${A.token}`;
      } catch (h) {
        r(h.message || 'Failed to sign in.');
      } finally {
        s(!1);
      }
    };
  return b.jsxs('div', {
    className:
      'min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative',
    children: [
      b.jsx('div', {
        className: 'absolute top-6 left-6 z-20',
        children: b.jsx('img', {
          src: 'https://media.pixelperfects.in/pixelperfect03.png',
          alt: 'Logo',
          className: 'w-24 h-auto drop-shadow-lg',
        }),
      }),
      b.jsx('div', {
        className: 'w-full max-w-md',
        children: b.jsxs('div', {
          className:
            'bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100',
          children: [
            b.jsxs('div', {
              className: 'text-center mb-8',
              children: [
                b.jsx('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-2',
                  children: 'Welcome Back',
                }),
                b.jsx('p', {
                  className: 'text-gray-600',
                  children: 'Sign in to your account',
                }),
              ],
            }),
            o &&
              b.jsx('div', {
                className:
                  'mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm',
                children: o,
              }),
            b.jsxs('form', {
              onSubmit: N,
              className: 'space-y-6',
              children: [
                b.jsxs('div', {
                  children: [
                    b.jsx('label', {
                      className:
                        'block text-sm font-semibold text-gray-700 mb-2',
                      htmlFor: 'email',
                      children: 'Email Address',
                    }),
                    b.jsx('input', {
                      type: 'email',
                      id: 'email',
                      name: 'email',
                      value: d.email,
                      onChange: z,
                      className:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white',
                      placeholder: 'Enter your email',
                      required: !0,
                    }),
                  ],
                }),
                b.jsxs('div', {
                  children: [
                    b.jsx('label', {
                      className:
                        'block text-sm font-semibold text-gray-700 mb-2',
                      htmlFor: 'password',
                      children: 'Password',
                    }),
                    b.jsx('input', {
                      type: 'password',
                      id: 'password',
                      name: 'password',
                      value: d.password,
                      onChange: z,
                      className:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white',
                      placeholder: 'Enter your password',
                      required: !0,
                    }),
                    b.jsx('div', {
                      className: 'mt-3 text-right',
                      children: b.jsx(Uu, {
                        to: '/forgot-password',
                        className:
                          'text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors',
                        children: 'Forgot password?',
                      }),
                    }),
                  ],
                }),
                b.jsx('button', {
                  type: 'submit',
                  disabled: c,
                  className:
                    'w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl',
                  children: c ? 'Signing In...' : 'Sign In',
                }),
              ],
            }),
            b.jsx('div', {
              className: 'mt-8 pt-6 border-t border-gray-200',
              children: b.jsxs('p', {
                className: 'text-center text-sm text-gray-600',
                children: [
                  "Don't have an account?",
                  ' ',
                  b.jsx(Uu, {
                    to: '/signup',
                    className:
                      'text-blue-600 hover:text-blue-800 font-semibold transition-colors',
                    children: 'Create an account',
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
function ov() {
  const c = Ql(),
    [s, o] = D.useState(!1),
    [r, d] = D.useState(''),
    [y, z] = D.useState({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'IN',
      zipCode: '400001',
      password: 'password123',
      confirmPassword: 'password123',
    }),
    N = (h) => {
      const { name: A, value: w } = h.target;
      z((U) => ({ ...U, [A]: w }));
    },
    S = async (h) => {
      if (
        (h.preventDefault(), o(!0), d(''), y.password !== y.confirmPassword)
      ) {
        d('Passwords do not match'), o(!1);
        return;
      }
      if (y.phone.length < 10) {
        d('Please enter a valid phone number'), o(!1);
        return;
      }
      if (y.password.length < 6) {
        d('Password must be at least 6 characters long'), o(!1);
        return;
      }
      try {
        const A = await fetch(
          'https://api.pixelperfects.in/api/v1/user/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: y.name,
              email: y.email,
              phone: y.phone,
              address: y.address,
              city: y.city,
              state: y.state,
              country: y.country,
              zipCode: y.zipCode,
              password: y.password,
            }),
          }
        );
        if (!A.ok) {
          const U = await A.json();
          throw new Error(U.message || 'Failed to create account');
        }
        const w = await A.json();
        w.token && localStorage.setItem('authToken', w.token),
          w.user && localStorage.setItem('user', JSON.stringify(w.user)),
          c('/Create-Store');
      } catch (A) {
        d(A.message || 'Failed to create account. Please try again.');
      } finally {
        o(!1);
      }
    };
  return b.jsxs('div', {
    className:
      'min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6 relative overflow-hidden',
    children: [
      b.jsx('div', {
        className:
          'absolute w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse',
      }),
      b.jsx('div', {
        className:
          'absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] bottom-0 right-0 animate-pulse',
      }),
      b.jsx('div', {
        className: 'absolute top-6 left-6 z-20',
        children: b.jsx('img', {
          src: 'https://media.pixelperfects.in/pixelperfect03.png',
          alt: 'Logo',
          className: 'w-24 h-auto drop-shadow-lg',
        }),
      }),
      b.jsxs('div', {
        className: 'w-full max-w-3xl relative z-10',
        children: [
          ' ',
          b.jsxs('div', {
            className:
              'bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/40',
            children: [
              ' ',
              b.jsxs('div', {
                className: 'text-center mb-10',
                children: [
                  b.jsx('h1', {
                    className:
                      'text-4xl font-extrabold tracking-tight text-gray-900 mb-3',
                    children: 'Create Account',
                  }),
                  b.jsxs('p', {
                    className: 'text-gray-600 text-lg',
                    children: [
                      'Join us and start building your online store',
                      ' ',
                    ],
                  }),
                ],
              }),
              r &&
                b.jsx('div', {
                  className:
                    'mb-8 p-4 bg-red-50/80 border border-red-200 text-red-700 rounded-xl text-sm shadow-sm',
                  children: r,
                }),
              b.jsxs('form', {
                onSubmit: S,
                className: 'space-y-8',
                children: [
                  b.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
                    children: [
                      b.jsx(Kt, {
                        label: 'Full Name *',
                        name: 'name',
                        type: 'text',
                        value: y.name,
                        onChange: N,
                        required: !0,
                      }),
                      b.jsx(Kt, {
                        label: 'Email Address *',
                        name: 'email',
                        type: 'email',
                        value: y.email,
                        onChange: N,
                        required: !0,
                      }),
                    ],
                  }),
                  b.jsx(Kt, {
                    label: 'Phone Number *',
                    name: 'phone',
                    type: 'tel',
                    value: y.phone,
                    onChange: N,
                    required: !0,
                  }),
                  b.jsx(Kt, {
                    label: 'Street Address',
                    name: 'address',
                    type: 'text',
                    value: y.address,
                    onChange: N,
                  }),
                  b.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
                    children: [
                      b.jsx(Kt, {
                        label: 'City',
                        name: 'city',
                        type: 'text',
                        value: y.city,
                        onChange: N,
                      }),
                      b.jsx(Kt, {
                        label: 'State',
                        name: 'state',
                        type: 'text',
                        value: y.state,
                        onChange: N,
                      }),
                    ],
                  }),
                  b.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
                    children: [
                      b.jsxs('div', {
                        children: [
                          b.jsx('label', {
                            className:
                              'block text-sm font-semibold text-slate-700 mb-2',
                            children: 'Country',
                          }),
                          b.jsxs('select', {
                            name: 'country',
                            value: y.country,
                            onChange: N,
                            className:
                              'w-full p-4 border border-slate-300 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
                            children: [
                              b.jsx('option', {
                                value: '',
                                children: 'Select Country',
                              }),
                              b.jsx('option', {
                                value: 'IN',
                                children: 'India',
                              }),
                              b.jsx('option', {
                                value: 'US',
                                children: 'United States',
                              }),
                              b.jsx('option', {
                                value: 'CA',
                                children: 'Canada',
                              }),
                              b.jsx('option', {
                                value: 'UK',
                                children: 'United Kingdom',
                              }),
                              b.jsx('option', {
                                value: 'AU',
                                children: 'Australia',
                              }),
                            ],
                          }),
                        ],
                      }),
                      b.jsx(Kt, {
                        label: 'ZIP/Postal Code',
                        name: 'zipCode',
                        type: 'text',
                        value: y.zipCode,
                        onChange: N,
                      }),
                    ],
                  }),
                  b.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
                    children: [
                      b.jsx(Kt, {
                        label: 'Password *',
                        name: 'password',
                        type: 'password',
                        value: y.password,
                        onChange: N,
                        required: !0,
                      }),
                      b.jsx(Kt, {
                        label: 'Confirm Password *',
                        name: 'confirmPassword',
                        type: 'password',
                        value: y.confirmPassword,
                        onChange: N,
                        required: !0,
                      }),
                    ],
                  }),
                  b.jsx('button', {
                    type: 'submit',
                    disabled: s,
                    className:
                      'w-full py-5 px-8 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] text-lg',
                    children: s ? 'Creating Account...' : 'Create Account',
                  }),
                ],
              }),
              b.jsx('div', {
                className: 'mt-10 text-center',
                children: b.jsxs('p', {
                  className: 'text-slate-600 text-base',
                  children: [
                    'Already have an account?',
                    ' ',
                    b.jsx(Uu, {
                      to: '/Login',
                      className:
                        'text-blue-600 hover:text-blue-700 font-medium hover:underline',
                      children: 'Sign in here',
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Kt({ label: c, ...s }) {
  return b.jsxs('div', {
    children: [
      b.jsx('label', {
        className: 'block text-sm font-semibold text-slate-700 mb-2',
        children: c,
      }),
      b.jsx('input', {
        ...s,
        className:
          'w-full p-4 border border-slate-300 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
      }),
    ],
  });
}
function dv() {
  var G, B, I, X, ie, $;
  const c = Ql(),
    [s, o] = D.useState(!1),
    [r, d] = D.useState(''),
    [y, z] = D.useState(!1),
    [N, S] = D.useState(null),
    [h, A] = D.useState({
      name: '',
      businessType: '',
      color: '#3b82f6',
      file: null,
    }),
    w = (ve) => {
      const { name: fe, value: oe } = ve.target;
      A((he) => ({ ...he, [fe]: oe }));
    },
    U = (ve) => {
      const fe = ve.target.files[0];
      A((oe) => ({ ...oe, logo: fe }));
    },
    q = (ve) => {
      A((fe) => ({ ...fe, color: ve.target.value }));
    },
    H = async (ve) => {
      ve.preventDefault(), o(!0), d('');
      try {
        const fe = localStorage.getItem('authToken'),
          oe = new FormData();
        oe.append('name', h.name),
          oe.append('businessTypes', h.businessType),
          oe.append('colour', h.color),
          h.logo && oe.append('file', h.logo);
        const he = await fetch(
          'https://api.pixelperfects.in/api/v1/user/create-store',
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${fe}` },
            body: oe,
          }
        );
        if (!he.ok) {
          const $e = await he.json();
          throw new Error($e.message || 'Failed to create store');
        }
        const Ye = await he.json();
        S(Ye), z(!0);
      } catch (fe) {
        d(fe.message || 'Failed to create store. Please try again.');
      } finally {
        o(!1);
      }
    },
    V = () => {
      localStorage.setItem('createdStore', JSON.stringify(N)),
        c('/domain-question');
    };
  return y
    ? b.jsx('div', {
        className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16',
        children: b.jsxs('div', {
          className: 'text-center',
          children: [
            b.jsx('div', {
              className:
                'w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4',
              children: b.jsx('svg', {
                className: 'w-8 h-8 text-green-600',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24',
                children: b.jsx('path', {
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M5 13l4 4L19 7',
                }),
              }),
            }),
            b.jsx('h2', {
              className: 'text-2xl font-bold text-green-600 mb-2',
              children: 'Success!',
            }),
            b.jsx('p', {
              className: 'text-gray-600 mb-4',
              children: N == null ? void 0 : N.message,
            }),
            b.jsxs('div', {
              className: 'bg-gray-50 p-4 rounded-lg mb-6 text-left',
              children: [
                b.jsx('h3', {
                  className: 'font-semibold mb-2',
                  children: 'Store Details:',
                }),
                b.jsxs('p', {
                  children: [
                    b.jsx('strong', { children: 'Store ID:' }),
                    ' ',
                    (G = N == null ? void 0 : N.store) == null ? void 0 : G.id,
                  ],
                }),
                b.jsxs('p', {
                  children: [
                    b.jsx('strong', { children: 'Domain:' }),
                    ' ',
                    (B = N == null ? void 0 : N.store) == null
                      ? void 0
                      : B.domain,
                  ],
                }),
                b.jsxs('p', {
                  children: [
                    b.jsx('strong', { children: 'Name:' }),
                    ' ',
                    (X =
                      (I = N == null ? void 0 : N.store) == null
                        ? void 0
                        : I.storeInfo) == null
                      ? void 0
                      : X.name,
                  ],
                }),
                b.jsxs('p', {
                  children: [
                    b.jsx('strong', { children: 'Business Type:' }),
                    ' ',
                    ($ =
                      (ie = N == null ? void 0 : N.store) == null
                        ? void 0
                        : ie.storeInfo) == null
                      ? void 0
                      : $.businessTypes,
                  ],
                }),
              ],
            }),
            b.jsx('button', {
              onClick: V,
              className:
                'w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors',
              children: 'Next',
            }),
          ],
        }),
      })
    : b.jsxs('div', {
        className: 'max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8',
        children: [
          b.jsx('h1', {
            className: 'text-2xl font-bold mb-6 text-center',
            children: 'Create Your Store',
          }),
          r &&
            b.jsx('div', {
              className: 'mb-4 p-3 bg-red-100 text-red-700 rounded',
              children: r,
            }),
          b.jsxs('form', {
            onSubmit: H,
            children: [
              b.jsxs('div', {
                className: 'mb-4',
                children: [
                  b.jsx('label', {
                    className: 'block text-sm font-medium mb-1',
                    htmlFor: 'name',
                    children: 'Store Name *',
                  }),
                  b.jsx('input', {
                    type: 'text',
                    id: 'name',
                    name: 'name',
                    value: h.name,
                    onChange: w,
                    className:
                      'w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none',
                    placeholder: 'Enter your store name',
                    required: !0,
                  }),
                ],
              }),
              b.jsxs('div', {
                className: 'mb-4',
                children: [
                  b.jsx('label', {
                    className: 'block text-sm font-medium mb-1',
                    htmlFor: 'businessType',
                    children: 'Business Type *',
                  }),
                  b.jsxs('select', {
                    id: 'businessType',
                    name: 'businessType',
                    value: h.businessType,
                    onChange: w,
                    className:
                      'w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none',
                    required: !0,
                    children: [
                      b.jsx('option', {
                        value: '',
                        children: 'Select Business Type',
                      }),
                      b.jsx('option', {
                        value: 'electronics',
                        children: 'Electronics',
                      }),
                      b.jsx('option', {
                        value: 'clothing',
                        children: 'Clothing & Fashion',
                      }),
                      b.jsx('option', {
                        value: 'food',
                        children: 'Food & Beverages',
                      }),
                      b.jsx('option', {
                        value: 'books',
                        children: 'Books & Media',
                      }),
                      b.jsx('option', {
                        value: 'home',
                        children: 'Home & Garden',
                      }),
                      b.jsx('option', {
                        value: 'sports',
                        children: 'Sports & Outdoors',
                      }),
                      b.jsx('option', {
                        value: 'beauty',
                        children: 'Beauty & Personal Care',
                      }),
                      b.jsx('option', {
                        value: 'automotive',
                        children: 'Automotive',
                      }),
                      b.jsx('option', {
                        value: 'toys',
                        children: 'Toys & Games',
                      }),
                      b.jsx('option', {
                        value: 'jewelry',
                        children: 'Jewelry & Accessories',
                      }),
                      b.jsx('option', { value: 'other', children: 'Other' }),
                    ],
                  }),
                ],
              }),
              b.jsxs('div', {
                className: 'mb-4',
                children: [
                  b.jsx('label', {
                    className: 'block text-sm font-medium mb-1',
                    htmlFor: 'color',
                    children: 'Shop Name Color *',
                  }),
                  b.jsxs('div', {
                    className: 'flex items-center space-x-3',
                    children: [
                      b.jsx('input', {
                        type: 'color',
                        id: 'color',
                        name: 'color',
                        value: h.color,
                        onChange: q,
                        className: 'w-12 h-10 border rounded cursor-pointer',
                      }),
                      b.jsx('input', {
                        type: 'text',
                        value: h.color,
                        onChange: q,
                        className:
                          'flex-1 p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none',
                        placeholder: '#3b82f6',
                      }),
                    ],
                  }),
                  b.jsx('div', {
                    className:
                      'mt-2 p-2 rounded text-center text-white font-medium',
                    style: { backgroundColor: h.color },
                    children: h.name || 'Your Store Name',
                  }),
                ],
              }),
              b.jsxs('div', {
                className: 'mb-6',
                children: [
                  b.jsx('label', {
                    className: 'block text-sm font-medium mb-1',
                    htmlFor: 'logo',
                    children: 'Store Logo',
                  }),
                  b.jsx('input', {
                    type: 'file',
                    id: 'logo',
                    name: 'logo',
                    onChange: U,
                    accept: 'image/*',
                    className:
                      'w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none',
                  }),
                  h.logo &&
                    b.jsx('div', {
                      className: 'mt-2',
                      children: b.jsxs('p', {
                        className: 'text-sm text-gray-600',
                        children: ['Selected: ', h.logo.name],
                      }),
                    }),
                ],
              }),
              b.jsx('button', {
                type: 'submit',
                disabled: s,
                className:
                  'w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 focus:ring focus:ring-green-300 disabled:opacity-50 transition-colors',
                children: s ? 'Creating Store...' : 'Create Store',
              }),
            ],
          }),
        ],
      });
}
function hv() {
  const c = Ql(),
    s = () => {
      window.location.href = 'htpp://localhost:3000/';
    },
    o = () => {
      c('/domain-setup');
    };
  return b.jsx('div', {
    className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16',
    children: b.jsxs('div', {
      className: 'text-center',
      children: [
        b.jsx('h2', {
          className: 'text-2xl font-bold mb-6',
          children: 'Domain Setup',
        }),
        b.jsx('p', {
          className: 'text-gray-600 mb-8',
          children: 'Do you have your own domain?',
        }),
        b.jsxs('div', {
          className: 'space-y-4',
          children: [
            b.jsx('button', {
              onClick: o,
              className:
                'w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors',
              children: 'Yes, I have a domain',
            }),
            b.jsx('button', {
              onClick: s,
              className:
                'w-full py-3 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:ring focus:ring-gray-300 transition-colors',
              children: 'No, I need a domain',
            }),
          ],
        }),
      ],
    }),
  });
}
function mv() {
  const c = Ql(),
    s = { aRecord: '62.72.58.149', cnameRecord: 'srv679222' },
    o = () => {
      localStorage.setItem('dnsRecords', JSON.stringify(s)),
        c('/domain-verify');
    };
  return b.jsxs('div', {
    className: 'max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md ',
    children: [
      b.jsx('h2', {
        className: 'text-2xl font-bold mb-3 text-center',
        children: 'DNS Configuration',
      }),
      b.jsxs('div', {
        className: 'mb-3 p-4 bg-blue-50 rounded-lg',
        children: [
          b.jsx('h3', {
            className: 'font-semibold text-blue-800 mb-2',
            children: 'Instructions:',
          }),
          b.jsxs('ul', {
            className: 'text-blue-700 text-sm list-disc list-inside space-y-2',
            children: [
              b.jsx('li', {
                children:
                  'Log in to your domain provider’s control panel (e.g., GoDaddy, Namecheap, Google Domains).',
              }),
              b.jsx('li', {
                children:
                  'Locate the section to manage DNS or DNS Zone Records.',
              }),
              b.jsxs('li', {
                children: [
                  'Add the following two DNS records exactly as shown below:',
                  b.jsxs('ul', {
                    className: 'ml-4 list-decimal list-inside mt-1 space-y-1',
                    children: [
                      b.jsxs('li', {
                        children: [
                          b.jsx('strong', { children: 'A Record' }),
                          ': Points your domain to our server using an IP address.',
                        ],
                      }),
                      b.jsxs('li', {
                        children: [
                          b.jsx('strong', { children: 'CNAME Record' }),
                          ': Ensures that www.yourdomain.com redirects to the root domain.',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              b.jsxs('li', {
                children: [
                  'After you’ve added the records, click the ',
                  b.jsx('strong', { children: 'Next' }),
                  ' ',
                  'button below to proceed with domain verification.',
                ],
              }),
              b.jsx('li', {
                children:
                  'Note: DNS changes might take a few minutes to propagate globally (up to 24 hours in rare cases).',
              }),
            ],
          }),
        ],
      }),
      b.jsxs('div', {
        className: 'mb-3',
        children: [
          b.jsx('label', {
            className: 'block text-sm font-medium mb-1',
            children: 'A Record *',
          }),
          b.jsxs('div', {
            className: 'grid grid-cols-3 gap-4',
            children: [
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: 'A',
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: '@',
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: s.aRecord,
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
            ],
          }),
          b.jsx('p', {
            className: 'text-xs text-gray-500 mt-1',
            children: 'Points your domain to our server IP address',
          }),
        ],
      }),
      b.jsxs('div', {
        className: 'mb-4',
        children: [
          b.jsx('label', {
            className: 'block text-sm font-medium mb-1',
            children: 'CNAME Record *',
          }),
          b.jsxs('div', {
            className: 'grid grid-cols-3 gap-4',
            children: [
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: 'CNAME',
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: 'www',
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
              b.jsx('input', {
                type: 'text',
                disabled: !0,
                value: s.cnameRecord,
                className: 'p-2 border rounded bg-gray-100 text-center',
              }),
            ],
          }),
          b.jsx('p', {
            className: 'text-xs text-gray-500 mt-1',
            children: 'Redirects www to your root domain',
          }),
        ],
      }),
      b.jsx('button', {
        onClick: o,
        className:
          'w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors',
        children: 'Next',
      }),
    ],
  });
}
const yv = async (c) => {
  if ((await new Promise((s) => setTimeout(s, 2e3)), c && c.includes('.')))
    return { success: !0, message: 'Domain verified successfully!' };
  throw new Error(
    'Domain verification failed. Please check your domain and DNS settings.'
  );
};
function vv() {
  const c = Ql(),
    [s, o] = D.useState(''),
    [r, d] = D.useState(!1),
    [y, z] = D.useState(''),
    [N, S] = D.useState(!1),
    h = async () => {
      if (!s) {
        z('Please enter your domain');
        return;
      }
      d(!0), z('');
      try {
        const A = await yv(s);
        S(!0),
          localStorage.setItem('verifiedDomain', s),
          setTimeout(() => {
            c('/Login');
          }, 2e3);
      } catch (A) {
        z(A.message || 'Verification failed. Please try again.');
      } finally {
        d(!1);
      }
    };
  return N
    ? b.jsx('div', {
        className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16',
        children: b.jsxs('div', {
          className: 'text-center',
          children: [
            b.jsx('div', {
              className:
                'w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4',
              children: b.jsx('svg', {
                className: 'w-8 h-8 text-green-600',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24',
                children: b.jsx('path', {
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M5 13l4 4L19 7',
                }),
              }),
            }),
            b.jsx('h2', {
              className: 'text-2xl font-bold text-green-600 mb-2',
              children: 'Domain Verified!',
            }),
            b.jsxs('p', {
              className: 'text-gray-600 mb-4',
              children: ['Your domain ', s, ' has been successfully verified.'],
            }),
            b.jsx('p', {
              className: 'text-sm text-gray-500',
              children: 'Redirecting to login...',
            }),
          ],
        }),
      })
    : b.jsxs('div', {
        className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16',
        children: [
          b.jsx('h2', {
            className: 'text-2xl font-bold mb-6 text-center',
            children: 'Verify Your Domain',
          }),
          y &&
            b.jsx('div', {
              className: 'mb-4 p-3 bg-red-100 text-red-700 rounded',
              children: y,
            }),
          b.jsxs('div', {
            className: 'mb-6',
            children: [
              b.jsx('label', {
                className: 'block text-sm font-medium mb-1',
                htmlFor: 'domain',
                children: 'Enter Your Domain *',
              }),
              b.jsx('input', {
                type: 'text',
                id: 'domain',
                value: s,
                onChange: (A) => o(A.target.value),
                className:
                  'w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none',
                placeholder: 'e.g., yourdomain.com',
                required: !0,
              }),
              b.jsx('p', {
                className: 'text-xs text-gray-500 mt-1',
                children: 'Enter the domain you configured with DNS records',
              }),
            ],
          }),
          b.jsx('button', {
            onClick: h,
            disabled: r || !s,
            className:
              'w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 focus:ring focus:ring-green-300 disabled:opacity-50 transition-colors',
            children: r ? 'Verifying...' : 'Verify Domain',
          }),
        ],
      });
}
function gv() {
  return b.jsx(tv, {
    children: b.jsxs(_y, {
      children: [
        b.jsx(xl, { path: '/Login', element: b.jsx(Kd, {}) }),
        b.jsx(xl, { path: '/signup', element: b.jsx(ov, {}) }),
        b.jsx(xl, { path: '/Create-Store', element: b.jsx(dv, {}) }),
        b.jsx(xl, { path: '/domain-question', element: b.jsx(hv, {}) }),
        b.jsx(xl, { path: '/domain-setup', element: b.jsx(mv, {}) }),
        b.jsx(xl, { path: '/domain-verify', element: b.jsx(vv, {}) }),
        b.jsx(xl, { path: '/', element: b.jsx(Kd, {}) }),
      ],
    }),
  });
}
L0.createRoot(document.getElementById('root')).render(
  b.jsx(D.StrictMode, { children: b.jsx(gv, {}) })
);
