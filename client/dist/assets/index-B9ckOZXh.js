(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const l of o.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Cu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Nu = { exports: {} },
  Ui = {},
  Ru = { exports: {} },
  I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kr = Symbol.for("react.element"),
  Cd = Symbol.for("react.portal"),
  Nd = Symbol.for("react.fragment"),
  Rd = Symbol.for("react.strict_mode"),
  Pd = Symbol.for("react.profiler"),
  Td = Symbol.for("react.provider"),
  jd = Symbol.for("react.context"),
  Ld = Symbol.for("react.forward_ref"),
  Od = Symbol.for("react.suspense"),
  Id = Symbol.for("react.memo"),
  Dd = Symbol.for("react.lazy"),
  ea = Symbol.iterator;
function Ad(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ea && e[ea]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Pu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Tu = Object.assign,
  ju = {};
function _n(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = ju),
    (this.updater = n || Pu));
}
_n.prototype.isReactComponent = {};
_n.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
_n.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Lu() {}
Lu.prototype = _n.prototype;
function Kl(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = ju),
    (this.updater = n || Pu));
}
var ql = (Kl.prototype = new Lu());
ql.constructor = Kl;
Tu(ql, _n.prototype);
ql.isPureReactComponent = !0;
var ta = Array.isArray,
  Ou = Object.prototype.hasOwnProperty,
  Yl = { current: null },
  Iu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Du(e, t, n) {
  var r,
    i = {},
    o = null,
    l = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (l = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Ou.call(t, r) && !Iu.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return {
    $$typeof: kr,
    type: e,
    key: o,
    ref: l,
    props: i,
    _owner: Yl.current,
  };
}
function zd(e, t) {
  return {
    $$typeof: kr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Jl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === kr;
}
function Bd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var na = /\/+/g;
function po(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Bd("" + e.key)
    : t.toString(36);
}
function Jr(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (o) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case kr:
          case Cd:
            l = !0;
        }
    }
  if (l)
    return (
      (l = e),
      (i = i(l)),
      (e = r === "" ? "." + po(l, 0) : r),
      ta(i)
        ? ((n = ""),
          e != null && (n = e.replace(na, "$&/") + "/"),
          Jr(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (Jl(i) &&
            (i = zd(
              i,
              n +
                (!i.key || (l && l.key === i.key)
                  ? ""
                  : ("" + i.key).replace(na, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((l = 0), (r = r === "" ? "." : r + ":"), ta(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var a = r + po(o, s);
      l += Jr(o, t, n, a, i);
    }
  else if (((a = Ad(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(o = e.next()).done; )
      ((o = o.value), (a = r + po(o, s++)), (l += Jr(o, t, n, a, i)));
  else if (o === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return l;
}
function Lr(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Jr(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Fd(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var fe = { current: null },
  Xr = { transition: null },
  Md = {
    ReactCurrentDispatcher: fe,
    ReactCurrentBatchConfig: Xr,
    ReactCurrentOwner: Yl,
  };
function Au() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = {
  map: Lr,
  forEach: function (e, t, n) {
    Lr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Lr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Lr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Jl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
I.Component = _n;
I.Fragment = Nd;
I.Profiler = Pd;
I.PureComponent = Kl;
I.StrictMode = Rd;
I.Suspense = Od;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Md;
I.act = Au;
I.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Tu({}, e.props),
    i = e.key,
    o = e.ref,
    l = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (l = Yl.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      Ou.call(t, a) &&
        !Iu.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: kr, type: e.type, key: i, ref: o, props: r, _owner: l };
};
I.createContext = function (e) {
  return (
    (e = {
      $$typeof: jd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Td, _context: e }),
    (e.Consumer = e)
  );
};
I.createElement = Du;
I.createFactory = function (e) {
  var t = Du.bind(null, e);
  return ((t.type = e), t);
};
I.createRef = function () {
  return { current: null };
};
I.forwardRef = function (e) {
  return { $$typeof: Ld, render: e };
};
I.isValidElement = Jl;
I.lazy = function (e) {
  return { $$typeof: Dd, _payload: { _status: -1, _result: e }, _init: Fd };
};
I.memo = function (e, t) {
  return { $$typeof: Id, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function (e) {
  var t = Xr.transition;
  Xr.transition = {};
  try {
    e();
  } finally {
    Xr.transition = t;
  }
};
I.unstable_act = Au;
I.useCallback = function (e, t) {
  return fe.current.useCallback(e, t);
};
I.useContext = function (e) {
  return fe.current.useContext(e);
};
I.useDebugValue = function () {};
I.useDeferredValue = function (e) {
  return fe.current.useDeferredValue(e);
};
I.useEffect = function (e, t) {
  return fe.current.useEffect(e, t);
};
I.useId = function () {
  return fe.current.useId();
};
I.useImperativeHandle = function (e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function (e, t) {
  return fe.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function (e, t) {
  return fe.current.useLayoutEffect(e, t);
};
I.useMemo = function (e, t) {
  return fe.current.useMemo(e, t);
};
I.useReducer = function (e, t, n) {
  return fe.current.useReducer(e, t, n);
};
I.useRef = function (e) {
  return fe.current.useRef(e);
};
I.useState = function (e) {
  return fe.current.useState(e);
};
I.useSyncExternalStore = function (e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function () {
  return fe.current.useTransition();
};
I.version = "18.3.1";
Ru.exports = I;
var w = Ru.exports;
const zu = Cu(w);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $d = w,
  Ud = Symbol.for("react.element"),
  bd = Symbol.for("react.fragment"),
  Hd = Object.prototype.hasOwnProperty,
  Vd = $d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Wd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Bu(e, t, n) {
  var r,
    i = {},
    o = null,
    l = null;
  (n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (l = t.ref));
  for (r in t) Hd.call(t, r) && !Wd.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Ud,
    type: e,
    key: o,
    ref: l,
    props: i,
    _owner: Vd.current,
  };
}
Ui.Fragment = bd;
Ui.jsx = Bu;
Ui.jsxs = Bu;
Nu.exports = Ui;
var c = Nu.exports,
  Go = {},
  Fu = { exports: {} },
  Ee = {},
  Mu = { exports: {} },
  $u = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, j) {
    var O = T.length;
    T.push(j);
    e: for (; 0 < O; ) {
      var G = (O - 1) >>> 1,
        Z = T[G];
      if (0 < i(Z, j)) ((T[G] = j), (T[O] = Z), (O = G));
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var j = T[0],
      O = T.pop();
    if (O !== j) {
      T[0] = O;
      e: for (var G = 0, Z = T.length, Tr = Z >>> 1; G < Tr; ) {
        var It = 2 * (G + 1) - 1,
          fo = T[It],
          Dt = It + 1,
          jr = T[Dt];
        if (0 > i(fo, O))
          Dt < Z && 0 > i(jr, fo)
            ? ((T[G] = jr), (T[Dt] = O), (G = Dt))
            : ((T[G] = fo), (T[It] = O), (G = It));
        else if (Dt < Z && 0 > i(jr, O)) ((T[G] = jr), (T[Dt] = O), (G = Dt));
        else break e;
      }
    }
    return j;
  }
  function i(T, j) {
    var O = T.sortIndex - j.sortIndex;
    return O !== 0 ? O : T.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var l = Date,
      s = l.now();
    e.unstable_now = function () {
      return l.now() - s;
    };
  }
  var a = [],
    u = [],
    f = 1,
    d = null,
    m = 3,
    g = !1,
    v = !1,
    x = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(T) {
    for (var j = n(u); j !== null; ) {
      if (j.callback === null) r(u);
      else if (j.startTime <= T)
        (r(u), (j.sortIndex = j.expirationTime), t(a, j));
      else break;
      j = n(u);
    }
  }
  function S(T) {
    if (((x = !1), y(T), !v))
      if (n(a) !== null) ((v = !0), uo(N));
      else {
        var j = n(u);
        j !== null && co(S, j.startTime - T);
      }
  }
  function N(T, j) {
    ((v = !1), x && ((x = !1), h(P), (P = -1)), (g = !0));
    var O = m;
    try {
      for (
        y(j), d = n(a);
        d !== null && (!(d.expirationTime > j) || (T && !ve()));
      ) {
        var G = d.callback;
        if (typeof G == "function") {
          ((d.callback = null), (m = d.priorityLevel));
          var Z = G(d.expirationTime <= j);
          ((j = e.unstable_now()),
            typeof Z == "function" ? (d.callback = Z) : d === n(a) && r(a),
            y(j));
        } else r(a);
        d = n(a);
      }
      if (d !== null) var Tr = !0;
      else {
        var It = n(u);
        (It !== null && co(S, It.startTime - j), (Tr = !1));
      }
      return Tr;
    } finally {
      ((d = null), (m = O), (g = !1));
    }
  }
  var k = !1,
    C = null,
    P = -1,
    z = 5,
    L = -1;
  function ve() {
    return !(e.unstable_now() - L < z);
  }
  function Ot() {
    if (C !== null) {
      var T = e.unstable_now();
      L = T;
      var j = !0;
      try {
        j = C(!0, T);
      } finally {
        j ? ct() : ((k = !1), (C = null));
      }
    } else k = !1;
  }
  var ct;
  if (typeof p == "function")
    ct = function () {
      p(Ot);
    };
  else if (typeof MessageChannel < "u") {
    var Ln = new MessageChannel(),
      be = Ln.port2;
    ((Ln.port1.onmessage = Ot),
      (ct = function () {
        be.postMessage(null);
      }));
  } else
    ct = function () {
      E(Ot, 0);
    };
  function uo(T) {
    ((C = T), k || ((k = !0), ct()));
  }
  function co(T, j) {
    P = E(function () {
      T(e.unstable_now());
    }, j);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || g || ((v = !0), uo(N));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (z = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (T) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = m;
      }
      var O = m;
      m = j;
      try {
        return T();
      } finally {
        m = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, j) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var O = m;
      m = T;
      try {
        return j();
      } finally {
        m = O;
      }
    }),
    (e.unstable_scheduleCallback = function (T, j, O) {
      var G = e.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? G + O : G))
          : (O = G),
        T)
      ) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return (
        (Z = O + Z),
        (T = {
          id: f++,
          callback: j,
          priorityLevel: T,
          startTime: O,
          expirationTime: Z,
          sortIndex: -1,
        }),
        O > G
          ? ((T.sortIndex = O),
            t(u, T),
            n(a) === null &&
              T === n(u) &&
              (x ? (h(P), (P = -1)) : (x = !0), co(S, O - G)))
          : ((T.sortIndex = Z), t(a, T), v || g || ((v = !0), uo(N))),
        T
      );
    }),
    (e.unstable_shouldYield = ve),
    (e.unstable_wrapCallback = function (T) {
      var j = m;
      return function () {
        var O = m;
        m = j;
        try {
          return T.apply(this, arguments);
        } finally {
          m = O;
        }
      };
    }));
})($u);
Mu.exports = $u;
var Qd = Mu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gd = w,
  Se = Qd;
function _(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Uu = new Set(),
  rr = {};
function Gt(e, t) {
  (mn(e, t), mn(e + "Capture", t));
}
function mn(e, t) {
  for (rr[e] = t, e = 0; e < t.length; e++) Uu.add(t[e]);
}
var rt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ko = Object.prototype.hasOwnProperty,
  Kd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ra = {},
  ia = {};
function qd(e) {
  return Ko.call(ia, e)
    ? !0
    : Ko.call(ra, e)
      ? !1
      : Kd.test(e)
        ? (ia[e] = !0)
        : ((ra[e] = !0), !1);
}
function Yd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Jd(e, t, n, r) {
  if (t === null || typeof t > "u" || Yd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function de(e, t, n, r, i, o, l) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = l));
}
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ie[e] = new de(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ie[t] = new de(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ie[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ie[e] = new de(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ie[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ie[e] = new de(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ie[e] = new de(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ie[e] = new de(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ie[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Xl = /[\-:]([a-z])/g;
function Zl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xl, Zl);
    ie[t] = new de(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xl, Zl);
    ie[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Xl, Zl);
  ie[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ie[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new de(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ie[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function es(e, t, n, r) {
  var i = ie.hasOwnProperty(t) ? ie[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Jd(t, n, i, r) && (n = null),
    r || i === null
      ? qd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var at = Gd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Or = Symbol.for("react.element"),
  Yt = Symbol.for("react.portal"),
  Jt = Symbol.for("react.fragment"),
  ts = Symbol.for("react.strict_mode"),
  qo = Symbol.for("react.profiler"),
  bu = Symbol.for("react.provider"),
  Hu = Symbol.for("react.context"),
  ns = Symbol.for("react.forward_ref"),
  Yo = Symbol.for("react.suspense"),
  Jo = Symbol.for("react.suspense_list"),
  rs = Symbol.for("react.memo"),
  dt = Symbol.for("react.lazy"),
  Vu = Symbol.for("react.offscreen"),
  oa = Symbol.iterator;
function On(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (oa && e[oa]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var W = Object.assign,
  ho;
function bn(e) {
  if (ho === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ho = (t && t[1]) || "";
    }
  return (
    `
` +
    ho +
    e
  );
}
var mo = !1;
function yo(e, t) {
  if (!e || mo) return "";
  mo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          l = i.length - 1,
          s = o.length - 1;
        1 <= l && 0 <= s && i[l] !== o[s];
      )
        s--;
      for (; 1 <= l && 0 <= s; l--, s--)
        if (i[l] !== o[s]) {
          if (l !== 1 || s !== 1)
            do
              if ((l--, s--, 0 > s || i[l] !== o[s])) {
                var a =
                  `
` + i[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= l && 0 <= s);
          break;
        }
    }
  } finally {
    ((mo = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? bn(e) : "";
}
function Xd(e) {
  switch (e.tag) {
    case 5:
      return bn(e.type);
    case 16:
      return bn("Lazy");
    case 13:
      return bn("Suspense");
    case 19:
      return bn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = yo(e.type, !1)), e);
    case 11:
      return ((e = yo(e.type.render, !1)), e);
    case 1:
      return ((e = yo(e.type, !0)), e);
    default:
      return "";
  }
}
function Xo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Jt:
      return "Fragment";
    case Yt:
      return "Portal";
    case qo:
      return "Profiler";
    case ts:
      return "StrictMode";
    case Yo:
      return "Suspense";
    case Jo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Hu:
        return (e.displayName || "Context") + ".Consumer";
      case bu:
        return (e._context.displayName || "Context") + ".Provider";
      case ns:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case rs:
        return (
          (t = e.displayName || null),
          t !== null ? t : Xo(e.type) || "Memo"
        );
      case dt:
        ((t = e._payload), (e = e._init));
        try {
          return Xo(e(t));
        } catch {}
    }
  return null;
}
function Zd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Xo(t);
    case 8:
      return t === ts ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Rt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Wu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function ep(e) {
  var t = Wu(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (l) {
          ((r = "" + l), o.call(this, l));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Ir(e) {
  e._valueTracker || (e._valueTracker = ep(e));
}
function Qu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Wu(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function mi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Zo(e, t) {
  var n = t.checked;
  return W({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function la(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Rt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Gu(e, t) {
  ((t = t.checked), t != null && es(e, "checked", t, !1));
}
function el(e, t) {
  Gu(e, t);
  var n = Rt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? tl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && tl(e, t.type, Rt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function sa(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function tl(e, t, n) {
  (t !== "number" || mi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Hn = Array.isArray;
function un(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Rt(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function nl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return W({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function aa(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(_(92));
      if (Hn(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Rt(n) };
}
function Ku(e, t) {
  var n = Rt(t.value),
    r = Rt(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function ua(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function qu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function rl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? qu(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Dr,
  Yu = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Dr = Dr || document.createElement("div"),
          Dr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Dr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ir(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Kn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  tp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Kn).forEach(function (e) {
  tp.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Kn[t] = Kn[e]));
  });
});
function Ju(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Kn.hasOwnProperty(e) && Kn[e])
      ? ("" + t).trim()
      : t + "px";
}
function Xu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Ju(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
    }
}
var np = W(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function il(e, t) {
  if (t) {
    if (np[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
  }
}
function ol(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ll = null;
function is(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var sl = null,
  cn = null,
  fn = null;
function ca(e) {
  if ((e = _r(e))) {
    if (typeof sl != "function") throw Error(_(280));
    var t = e.stateNode;
    t && ((t = Qi(t)), sl(e.stateNode, e.type, t));
  }
}
function Zu(e) {
  cn ? (fn ? fn.push(e) : (fn = [e])) : (cn = e);
}
function ec() {
  if (cn) {
    var e = cn,
      t = fn;
    if (((fn = cn = null), ca(e), t)) for (e = 0; e < t.length; e++) ca(t[e]);
  }
}
function tc(e, t) {
  return e(t);
}
function nc() {}
var go = !1;
function rc(e, t, n) {
  if (go) return e(t, n);
  go = !0;
  try {
    return tc(e, t, n);
  } finally {
    ((go = !1), (cn !== null || fn !== null) && (nc(), ec()));
  }
}
function or(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Qi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(_(231, t, typeof n));
  return n;
}
var al = !1;
if (rt)
  try {
    var In = {};
    (Object.defineProperty(In, "passive", {
      get: function () {
        al = !0;
      },
    }),
      window.addEventListener("test", In, In),
      window.removeEventListener("test", In, In));
  } catch {
    al = !1;
  }
function rp(e, t, n, r, i, o, l, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (f) {
    this.onError(f);
  }
}
var qn = !1,
  yi = null,
  gi = !1,
  ul = null,
  ip = {
    onError: function (e) {
      ((qn = !0), (yi = e));
    },
  };
function op(e, t, n, r, i, o, l, s, a) {
  ((qn = !1), (yi = null), rp.apply(ip, arguments));
}
function lp(e, t, n, r, i, o, l, s, a) {
  if ((op.apply(this, arguments), qn)) {
    if (qn) {
      var u = yi;
      ((qn = !1), (yi = null));
    } else throw Error(_(198));
    gi || ((gi = !0), (ul = u));
  }
}
function Kt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ic(e) {
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
function fa(e) {
  if (Kt(e) !== e) throw Error(_(188));
}
function sp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Kt(e)), t === null)) throw Error(_(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return (fa(i), e);
        if (o === r) return (fa(i), t);
        o = o.sibling;
      }
      throw Error(_(188));
    }
    if (n.return !== r.return) ((n = i), (r = o));
    else {
      for (var l = !1, s = i.child; s; ) {
        if (s === n) {
          ((l = !0), (n = i), (r = o));
          break;
        }
        if (s === r) {
          ((l = !0), (r = i), (n = o));
          break;
        }
        s = s.sibling;
      }
      if (!l) {
        for (s = o.child; s; ) {
          if (s === n) {
            ((l = !0), (n = o), (r = i));
            break;
          }
          if (s === r) {
            ((l = !0), (r = o), (n = i));
            break;
          }
          s = s.sibling;
        }
        if (!l) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function oc(e) {
  return ((e = sp(e)), e !== null ? lc(e) : null);
}
function lc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = lc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var sc = Se.unstable_scheduleCallback,
  da = Se.unstable_cancelCallback,
  ap = Se.unstable_shouldYield,
  up = Se.unstable_requestPaint,
  K = Se.unstable_now,
  cp = Se.unstable_getCurrentPriorityLevel,
  os = Se.unstable_ImmediatePriority,
  ac = Se.unstable_UserBlockingPriority,
  vi = Se.unstable_NormalPriority,
  fp = Se.unstable_LowPriority,
  uc = Se.unstable_IdlePriority,
  bi = null,
  Qe = null;
function dp(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function")
    try {
      Qe.onCommitFiberRoot(bi, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Fe = Math.clz32 ? Math.clz32 : mp,
  pp = Math.log,
  hp = Math.LN2;
function mp(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((pp(e) / hp) | 0)) | 0);
}
var Ar = 64,
  zr = 4194304;
function Vn(e) {
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
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function xi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var s = l & ~i;
    s !== 0 ? (r = Vn(s)) : ((o &= l), o !== 0 && (r = Vn(o)));
  } else ((l = n & ~i), l !== 0 ? (r = Vn(l)) : o !== 0 && (r = Vn(o)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Fe(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
  return r;
}
function yp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
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
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function gp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;
  ) {
    var l = 31 - Fe(o),
      s = 1 << l,
      a = i[l];
    (a === -1
      ? (!(s & n) || s & r) && (i[l] = yp(s, t))
      : a <= t && (e.expiredLanes |= s),
      (o &= ~s));
  }
}
function cl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function cc() {
  var e = Ar;
  return ((Ar <<= 1), !(Ar & 4194240) && (Ar = 64), e);
}
function vo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Sr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Fe(t)),
    (e[t] = n));
}
function vp(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Fe(n),
      o = 1 << i;
    ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o));
  }
}
function ls(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n),
      i = 1 << r;
    ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
  }
}
var B = 0;
function fc(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var dc,
  ss,
  pc,
  hc,
  mc,
  fl = !1,
  Br = [],
  vt = null,
  xt = null,
  wt = null,
  lr = new Map(),
  sr = new Map(),
  ht = [],
  xp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function pa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      vt = null;
      break;
    case "dragenter":
    case "dragleave":
      xt = null;
      break;
    case "mouseover":
    case "mouseout":
      wt = null;
      break;
    case "pointerover":
    case "pointerout":
      lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      sr.delete(t.pointerId);
  }
}
function Dn(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = _r(t)), t !== null && ss(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function wp(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return ((vt = Dn(vt, e, t, n, r, i)), !0);
    case "dragenter":
      return ((xt = Dn(xt, e, t, n, r, i)), !0);
    case "mouseover":
      return ((wt = Dn(wt, e, t, n, r, i)), !0);
    case "pointerover":
      var o = i.pointerId;
      return (lr.set(o, Dn(lr.get(o) || null, e, t, n, r, i)), !0);
    case "gotpointercapture":
      return (
        (o = i.pointerId),
        sr.set(o, Dn(sr.get(o) || null, e, t, n, r, i)),
        !0
      );
  }
  return !1;
}
function yc(e) {
  var t = Bt(e.target);
  if (t !== null) {
    var n = Kt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = ic(n)), t !== null)) {
          ((e.blockedOn = t),
            mc(e.priority, function () {
              pc(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Zr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = dl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((ll = r), n.target.dispatchEvent(r), (ll = null));
    } else return ((t = _r(n)), t !== null && ss(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function ha(e, t, n) {
  Zr(e) && n.delete(t);
}
function kp() {
  ((fl = !1),
    vt !== null && Zr(vt) && (vt = null),
    xt !== null && Zr(xt) && (xt = null),
    wt !== null && Zr(wt) && (wt = null),
    lr.forEach(ha),
    sr.forEach(ha));
}
function An(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    fl ||
      ((fl = !0),
      Se.unstable_scheduleCallback(Se.unstable_NormalPriority, kp)));
}
function ar(e) {
  function t(i) {
    return An(i, e);
  }
  if (0 < Br.length) {
    An(Br[0], e);
    for (var n = 1; n < Br.length; n++) {
      var r = Br[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    vt !== null && An(vt, e),
      xt !== null && An(xt, e),
      wt !== null && An(wt, e),
      lr.forEach(t),
      sr.forEach(t),
      n = 0;
    n < ht.length;
    n++
  )
    ((r = ht[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < ht.length && ((n = ht[0]), n.blockedOn === null); )
    (yc(n), n.blockedOn === null && ht.shift());
}
var dn = at.ReactCurrentBatchConfig,
  wi = !0;
function Sp(e, t, n, r) {
  var i = B,
    o = dn.transition;
  dn.transition = null;
  try {
    ((B = 1), as(e, t, n, r));
  } finally {
    ((B = i), (dn.transition = o));
  }
}
function Ep(e, t, n, r) {
  var i = B,
    o = dn.transition;
  dn.transition = null;
  try {
    ((B = 4), as(e, t, n, r));
  } finally {
    ((B = i), (dn.transition = o));
  }
}
function as(e, t, n, r) {
  if (wi) {
    var i = dl(e, t, n, r);
    if (i === null) (Po(e, t, r, ki, n), pa(e, r));
    else if (wp(i, e, t, n, r)) r.stopPropagation();
    else if ((pa(e, r), t & 4 && -1 < xp.indexOf(e))) {
      for (; i !== null; ) {
        var o = _r(i);
        if (
          (o !== null && dc(o),
          (o = dl(e, t, n, r)),
          o === null && Po(e, t, r, ki, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Po(e, t, r, null, n);
  }
}
var ki = null;
function dl(e, t, n, r) {
  if (((ki = null), (e = is(r)), (e = Bt(e)), e !== null))
    if (((t = Kt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = ic(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((ki = e), null);
}
function gc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (cp()) {
        case os:
          return 1;
        case ac:
          return 4;
        case vi:
        case fp:
          return 16;
        case uc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yt = null,
  us = null,
  ei = null;
function vc() {
  if (ei) return ei;
  var e,
    t = us,
    n = t.length,
    r,
    i = "value" in yt ? yt.value : yt.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === i[o - r]; r++);
  return (ei = i.slice(e, 1 < r ? 1 - r : void 0));
}
function ti(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Fr() {
  return !0;
}
function ma() {
  return !1;
}
function _e(e) {
  function t(n, r, i, o, l) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = l),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Fr
        : ma),
      (this.isPropagationStopped = ma),
      this
    );
  }
  return (
    W(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Fr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Fr));
      },
      persist: function () {},
      isPersistent: Fr,
    }),
    t
  );
}
var Cn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  cs = _e(Cn),
  Er = W({}, Cn, { view: 0, detail: 0 }),
  _p = _e(Er),
  xo,
  wo,
  zn,
  Hi = W({}, Er, {
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
    getModifierState: fs,
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
      return "movementX" in e
        ? e.movementX
        : (e !== zn &&
            (zn && e.type === "mousemove"
              ? ((xo = e.screenX - zn.screenX), (wo = e.screenY - zn.screenY))
              : (wo = xo = 0),
            (zn = e)),
          xo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : wo;
    },
  }),
  ya = _e(Hi),
  Cp = W({}, Hi, { dataTransfer: 0 }),
  Np = _e(Cp),
  Rp = W({}, Er, { relatedTarget: 0 }),
  ko = _e(Rp),
  Pp = W({}, Cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Tp = _e(Pp),
  jp = W({}, Cn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Lp = _e(jp),
  Op = W({}, Cn, { data: 0 }),
  ga = _e(Op),
  Ip = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Dp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ap = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function zp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ap[e]) ? !!t[e] : !1;
}
function fs() {
  return zp;
}
var Bp = W({}, Er, {
    key: function (e) {
      if (e.key) {
        var t = Ip[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ti(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Dp[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fs,
    charCode: function (e) {
      return e.type === "keypress" ? ti(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ti(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Fp = _e(Bp),
  Mp = W({}, Hi, {
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
  va = _e(Mp),
  $p = W({}, Er, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fs,
  }),
  Up = _e($p),
  bp = W({}, Cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Hp = _e(bp),
  Vp = W({}, Hi, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Wp = _e(Vp),
  Qp = [9, 13, 27, 32],
  ds = rt && "CompositionEvent" in window,
  Yn = null;
rt && "documentMode" in document && (Yn = document.documentMode);
var Gp = rt && "TextEvent" in window && !Yn,
  xc = rt && (!ds || (Yn && 8 < Yn && 11 >= Yn)),
  xa = " ",
  wa = !1;
function wc(e, t) {
  switch (e) {
    case "keyup":
      return Qp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function kc(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Xt = !1;
function Kp(e, t) {
  switch (e) {
    case "compositionend":
      return kc(t);
    case "keypress":
      return t.which !== 32 ? null : ((wa = !0), xa);
    case "textInput":
      return ((e = t.data), e === xa && wa ? null : e);
    default:
      return null;
  }
}
function qp(e, t) {
  if (Xt)
    return e === "compositionend" || (!ds && wc(e, t))
      ? ((e = vc()), (ei = us = yt = null), (Xt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return xc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Yp = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
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
function ka(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Yp[e.type] : t === "textarea";
}
function Sc(e, t, n, r) {
  (Zu(r),
    (t = Si(t, "onChange")),
    0 < t.length &&
      ((n = new cs("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Jn = null,
  ur = null;
function Jp(e) {
  Ic(e, 0);
}
function Vi(e) {
  var t = tn(e);
  if (Qu(t)) return e;
}
function Xp(e, t) {
  if (e === "change") return t;
}
var Ec = !1;
if (rt) {
  var So;
  if (rt) {
    var Eo = "oninput" in document;
    if (!Eo) {
      var Sa = document.createElement("div");
      (Sa.setAttribute("oninput", "return;"),
        (Eo = typeof Sa.oninput == "function"));
    }
    So = Eo;
  } else So = !1;
  Ec = So && (!document.documentMode || 9 < document.documentMode);
}
function Ea() {
  Jn && (Jn.detachEvent("onpropertychange", _c), (ur = Jn = null));
}
function _c(e) {
  if (e.propertyName === "value" && Vi(ur)) {
    var t = [];
    (Sc(t, ur, e, is(e)), rc(Jp, t));
  }
}
function Zp(e, t, n) {
  e === "focusin"
    ? (Ea(), (Jn = t), (ur = n), Jn.attachEvent("onpropertychange", _c))
    : e === "focusout" && Ea();
}
function eh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Vi(ur);
}
function th(e, t) {
  if (e === "click") return Vi(t);
}
function nh(e, t) {
  if (e === "input" || e === "change") return Vi(t);
}
function rh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var $e = typeof Object.is == "function" ? Object.is : rh;
function cr(e, t) {
  if ($e(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Ko.call(t, i) || !$e(e[i], t[i])) return !1;
  }
  return !0;
}
function _a(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ca(e, t) {
  var n = _a(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = _a(n);
  }
}
function Cc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Cc(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Nc() {
  for (var e = window, t = mi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = mi(e.document);
  }
  return t;
}
function ps(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ih(e) {
  var t = Nc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Cc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ps(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        ((r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Ca(n, o)));
        var l = Ca(n, r);
        i &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var oh = rt && "documentMode" in document && 11 >= document.documentMode,
  Zt = null,
  pl = null,
  Xn = null,
  hl = !1;
function Na(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  hl ||
    Zt == null ||
    Zt !== mi(r) ||
    ((r = Zt),
    "selectionStart" in r && ps(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Xn && cr(Xn, r)) ||
      ((Xn = r),
      (r = Si(pl, "onSelect")),
      0 < r.length &&
        ((t = new cs("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Zt))));
}
function Mr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var en = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionend: Mr("Transition", "TransitionEnd"),
  },
  _o = {},
  Rc = {};
rt &&
  ((Rc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete en.animationend.animation,
    delete en.animationiteration.animation,
    delete en.animationstart.animation),
  "TransitionEvent" in window || delete en.transitionend.transition);
function Wi(e) {
  if (_o[e]) return _o[e];
  if (!en[e]) return e;
  var t = en[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Rc) return (_o[e] = t[n]);
  return e;
}
var Pc = Wi("animationend"),
  Tc = Wi("animationiteration"),
  jc = Wi("animationstart"),
  Lc = Wi("transitionend"),
  Oc = new Map(),
  Ra =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Tt(e, t) {
  (Oc.set(e, t), Gt(t, [e]));
}
for (var Co = 0; Co < Ra.length; Co++) {
  var No = Ra[Co],
    lh = No.toLowerCase(),
    sh = No[0].toUpperCase() + No.slice(1);
  Tt(lh, "on" + sh);
}
Tt(Pc, "onAnimationEnd");
Tt(Tc, "onAnimationIteration");
Tt(jc, "onAnimationStart");
Tt("dblclick", "onDoubleClick");
Tt("focusin", "onFocus");
Tt("focusout", "onBlur");
Tt(Lc, "onTransitionEnd");
mn("onMouseEnter", ["mouseout", "mouseover"]);
mn("onMouseLeave", ["mouseout", "mouseover"]);
mn("onPointerEnter", ["pointerout", "pointerover"]);
mn("onPointerLeave", ["pointerout", "pointerover"]);
Gt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Gt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Gt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Gt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Wn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ah = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wn));
function Pa(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), lp(r, t, void 0, e), (e.currentTarget = null));
}
function Ic(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var s = r[l],
            a = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), a !== o && i.isPropagationStopped())) break e;
          (Pa(i, s, u), (o = a));
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((s = r[l]),
            (a = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            a !== o && i.isPropagationStopped())
          )
            break e;
          (Pa(i, s, u), (o = a));
        }
    }
  }
  if (gi) throw ((e = ul), (gi = !1), (ul = null), e);
}
function M(e, t) {
  var n = t[xl];
  n === void 0 && (n = t[xl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Dc(t, e, 2, !1), n.add(r));
}
function Ro(e, t, n) {
  var r = 0;
  (t && (r |= 4), Dc(n, e, r, t));
}
var $r = "_reactListening" + Math.random().toString(36).slice(2);
function fr(e) {
  if (!e[$r]) {
    ((e[$r] = !0),
      Uu.forEach(function (n) {
        n !== "selectionchange" && (ah.has(n) || Ro(n, !1, e), Ro(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[$r] || ((t[$r] = !0), Ro("selectionchange", !1, t));
  }
}
function Dc(e, t, n, r) {
  switch (gc(t)) {
    case 1:
      var i = Sp;
      break;
    case 4:
      i = Ep;
      break;
    default:
      i = as;
  }
  ((n = i.bind(null, t, n, e)),
    (i = void 0),
    !al ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1));
}
function Po(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var a = l.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = l.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            l = l.return;
          }
        for (; s !== null; ) {
          if (((l = Bt(s)), l === null)) return;
          if (((a = l.tag), a === 5 || a === 6)) {
            r = o = l;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  rc(function () {
    var u = o,
      f = is(n),
      d = [];
    e: {
      var m = Oc.get(e);
      if (m !== void 0) {
        var g = cs,
          v = e;
        switch (e) {
          case "keypress":
            if (ti(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Fp;
            break;
          case "focusin":
            ((v = "focus"), (g = ko));
            break;
          case "focusout":
            ((v = "blur"), (g = ko));
            break;
          case "beforeblur":
          case "afterblur":
            g = ko;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = ya;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Np;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Up;
            break;
          case Pc:
          case Tc:
          case jc:
            g = Tp;
            break;
          case Lc:
            g = Hp;
            break;
          case "scroll":
            g = _p;
            break;
          case "wheel":
            g = Wp;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Lp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = va;
        }
        var x = (t & 4) !== 0,
          E = !x && e === "scroll",
          h = x ? (m !== null ? m + "Capture" : null) : m;
        x = [];
        for (var p = u, y; p !== null; ) {
          y = p;
          var S = y.stateNode;
          if (
            (y.tag === 5 &&
              S !== null &&
              ((y = S),
              h !== null && ((S = or(p, h)), S != null && x.push(dr(p, S, y)))),
            E)
          )
            break;
          p = p.return;
        }
        0 < x.length &&
          ((m = new g(m, v, null, n, f)), d.push({ event: m, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          m &&
            n !== ll &&
            (v = n.relatedTarget || n.fromElement) &&
            (Bt(v) || v[it]))
        )
          break e;
        if (
          (g || m) &&
          ((m =
            f.window === f
              ? f
              : (m = f.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          g
            ? ((v = n.relatedTarget || n.toElement),
              (g = u),
              (v = v ? Bt(v) : null),
              v !== null &&
                ((E = Kt(v)), v !== E || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((g = null), (v = u)),
          g !== v)
        ) {
          if (
            ((x = ya),
            (S = "onMouseLeave"),
            (h = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = va),
              (S = "onPointerLeave"),
              (h = "onPointerEnter"),
              (p = "pointer")),
            (E = g == null ? m : tn(g)),
            (y = v == null ? m : tn(v)),
            (m = new x(S, p + "leave", g, n, f)),
            (m.target = E),
            (m.relatedTarget = y),
            (S = null),
            Bt(f) === u &&
              ((x = new x(h, p + "enter", v, n, f)),
              (x.target = y),
              (x.relatedTarget = E),
              (S = x)),
            (E = S),
            g && v)
          )
            t: {
              for (x = g, h = v, p = 0, y = x; y; y = qt(y)) p++;
              for (y = 0, S = h; S; S = qt(S)) y++;
              for (; 0 < p - y; ) ((x = qt(x)), p--);
              for (; 0 < y - p; ) ((h = qt(h)), y--);
              for (; p--; ) {
                if (x === h || (h !== null && x === h.alternate)) break t;
                ((x = qt(x)), (h = qt(h)));
              }
              x = null;
            }
          else x = null;
          (g !== null && Ta(d, m, g, x, !1),
            v !== null && E !== null && Ta(d, E, v, x, !0));
        }
      }
      e: {
        if (
          ((m = u ? tn(u) : window),
          (g = m.nodeName && m.nodeName.toLowerCase()),
          g === "select" || (g === "input" && m.type === "file"))
        )
          var N = Xp;
        else if (ka(m))
          if (Ec) N = nh;
          else {
            N = eh;
            var k = Zp;
          }
        else
          (g = m.nodeName) &&
            g.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (N = th);
        if (N && (N = N(e, u))) {
          Sc(d, N, n, f);
          break e;
        }
        (k && k(e, m, u),
          e === "focusout" &&
            (k = m._wrapperState) &&
            k.controlled &&
            m.type === "number" &&
            tl(m, "number", m.value));
      }
      switch (((k = u ? tn(u) : window), e)) {
        case "focusin":
          (ka(k) || k.contentEditable === "true") &&
            ((Zt = k), (pl = u), (Xn = null));
          break;
        case "focusout":
          Xn = pl = Zt = null;
          break;
        case "mousedown":
          hl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((hl = !1), Na(d, n, f));
          break;
        case "selectionchange":
          if (oh) break;
        case "keydown":
        case "keyup":
          Na(d, n, f);
      }
      var C;
      if (ds)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        Xt
          ? wc(e, n) && (P = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      (P &&
        (xc &&
          n.locale !== "ko" &&
          (Xt || P !== "onCompositionStart"
            ? P === "onCompositionEnd" && Xt && (C = vc())
            : ((yt = f),
              (us = "value" in yt ? yt.value : yt.textContent),
              (Xt = !0))),
        (k = Si(u, P)),
        0 < k.length &&
          ((P = new ga(P, e, null, n, f)),
          d.push({ event: P, listeners: k }),
          C ? (P.data = C) : ((C = kc(n)), C !== null && (P.data = C)))),
        (C = Gp ? Kp(e, n) : qp(e, n)) &&
          ((u = Si(u, "onBeforeInput")),
          0 < u.length &&
            ((f = new ga("onBeforeInput", "beforeinput", null, n, f)),
            d.push({ event: f, listeners: u }),
            (f.data = C))));
    }
    Ic(d, t);
  });
}
function dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Si(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    (i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = or(e, n)),
      o != null && r.unshift(dr(e, o, i)),
      (o = or(e, t)),
      o != null && r.push(dr(e, o, i))),
      (e = e.return));
  }
  return r;
}
function qt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ta(e, t, n, r, i) {
  for (var o = t._reactName, l = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      u = s.stateNode;
    if (a !== null && a === r) break;
    (s.tag === 5 &&
      u !== null &&
      ((s = u),
      i
        ? ((a = or(n, o)), a != null && l.unshift(dr(n, a, s)))
        : i || ((a = or(n, o)), a != null && l.push(dr(n, a, s)))),
      (n = n.return));
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var uh = /\r\n?/g,
  ch = /\u0000|\uFFFD/g;
function ja(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      uh,
      `
`,
    )
    .replace(ch, "");
}
function Ur(e, t, n) {
  if (((t = ja(t)), ja(e) !== t && n)) throw Error(_(425));
}
function Ei() {}
var ml = null,
  yl = null;
function gl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var vl = typeof setTimeout == "function" ? setTimeout : void 0,
  fh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  La = typeof Promise == "function" ? Promise : void 0,
  dh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof La < "u"
        ? function (e) {
            return La.resolve(null).then(e).catch(ph);
          }
        : vl;
function ph(e) {
  setTimeout(function () {
    throw e;
  });
}
function To(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(i), ar(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  ar(t);
}
function kt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Oa(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Nn = Math.random().toString(36).slice(2),
  We = "__reactFiber$" + Nn,
  pr = "__reactProps$" + Nn,
  it = "__reactContainer$" + Nn,
  xl = "__reactEvents$" + Nn,
  hh = "__reactListeners$" + Nn,
  mh = "__reactHandles$" + Nn;
function Bt(e) {
  var t = e[We];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[it] || n[We])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Oa(e); e !== null; ) {
          if ((n = e[We])) return n;
          e = Oa(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function _r(e) {
  return (
    (e = e[We] || e[it]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function tn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function Qi(e) {
  return e[pr] || null;
}
var wl = [],
  nn = -1;
function jt(e) {
  return { current: e };
}
function $(e) {
  0 > nn || ((e.current = wl[nn]), (wl[nn] = null), nn--);
}
function F(e, t) {
  (nn++, (wl[nn] = e.current), (e.current = t));
}
var Pt = {},
  ae = jt(Pt),
  me = jt(!1),
  bt = Pt;
function yn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Pt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function ye(e) {
  return ((e = e.childContextTypes), e != null);
}
function _i() {
  ($(me), $(ae));
}
function Ia(e, t, n) {
  if (ae.current !== Pt) throw Error(_(168));
  (F(ae, t), F(me, n));
}
function Ac(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(_(108, Zd(e) || "Unknown", i));
  return W({}, n, r);
}
function Ci(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Pt),
    (bt = ae.current),
    F(ae, e),
    F(me, me.current),
    !0
  );
}
function Da(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  (n
    ? ((e = Ac(e, t, bt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      $(me),
      $(ae),
      F(ae, e))
    : $(me),
    F(me, n));
}
var Ze = null,
  Gi = !1,
  jo = !1;
function zc(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
function yh(e) {
  ((Gi = !0), zc(e));
}
function Lt() {
  if (!jo && Ze !== null) {
    jo = !0;
    var e = 0,
      t = B;
    try {
      var n = Ze;
      for (B = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ze = null), (Gi = !1));
    } catch (i) {
      throw (Ze !== null && (Ze = Ze.slice(e + 1)), sc(os, Lt), i);
    } finally {
      ((B = t), (jo = !1));
    }
  }
  return null;
}
var rn = [],
  on = 0,
  Ni = null,
  Ri = 0,
  Ne = [],
  Re = 0,
  Ht = null,
  et = 1,
  tt = "";
function At(e, t) {
  ((rn[on++] = Ri), (rn[on++] = Ni), (Ni = e), (Ri = t));
}
function Bc(e, t, n) {
  ((Ne[Re++] = et), (Ne[Re++] = tt), (Ne[Re++] = Ht), (Ht = e));
  var r = et;
  e = tt;
  var i = 32 - Fe(r) - 1;
  ((r &= ~(1 << i)), (n += 1));
  var o = 32 - Fe(t) + i;
  if (30 < o) {
    var l = i - (i % 5);
    ((o = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (i -= l),
      (et = (1 << (32 - Fe(t) + i)) | (n << i) | r),
      (tt = o + e));
  } else ((et = (1 << o) | (n << i) | r), (tt = e));
}
function hs(e) {
  e.return !== null && (At(e, 1), Bc(e, 1, 0));
}
function ms(e) {
  for (; e === Ni; )
    ((Ni = rn[--on]), (rn[on] = null), (Ri = rn[--on]), (rn[on] = null));
  for (; e === Ht; )
    ((Ht = Ne[--Re]),
      (Ne[Re] = null),
      (tt = Ne[--Re]),
      (Ne[Re] = null),
      (et = Ne[--Re]),
      (Ne[Re] = null));
}
var ke = null,
  we = null,
  U = !1,
  Be = null;
function Fc(e, t) {
  var n = Te(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Aa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ke = e), (we = kt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ke = e), (we = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ht !== null ? { id: et, overflow: tt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Te(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ke = e),
            (we = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function kl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Sl(e) {
  if (U) {
    var t = we;
    if (t) {
      var n = t;
      if (!Aa(e, t)) {
        if (kl(e)) throw Error(_(418));
        t = kt(n.nextSibling);
        var r = ke;
        t && Aa(e, t)
          ? Fc(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (U = !1), (ke = e));
      }
    } else {
      if (kl(e)) throw Error(_(418));
      ((e.flags = (e.flags & -4097) | 2), (U = !1), (ke = e));
    }
  }
}
function za(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ke = e;
}
function br(e) {
  if (e !== ke) return !1;
  if (!U) return (za(e), (U = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !gl(e.type, e.memoizedProps))),
    t && (t = we))
  ) {
    if (kl(e)) throw (Mc(), Error(_(418)));
    for (; t; ) (Fc(e, t), (t = kt(t.nextSibling)));
  }
  if ((za(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = kt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? kt(e.stateNode.nextSibling) : null;
  return !0;
}
function Mc() {
  for (var e = we; e; ) e = kt(e.nextSibling);
}
function gn() {
  ((we = ke = null), (U = !1));
}
function ys(e) {
  Be === null ? (Be = [e]) : Be.push(e);
}
var gh = at.ReactCurrentBatchConfig;
function Bn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (l) {
            var s = i.refs;
            l === null ? delete s[o] : (s[o] = l);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function Hr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      _(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Ba(e) {
  var t = e._init;
  return t(e._payload);
}
function $c(e) {
  function t(h, p) {
    if (e) {
      var y = h.deletions;
      y === null ? ((h.deletions = [p]), (h.flags |= 16)) : y.push(p);
    }
  }
  function n(h, p) {
    if (!e) return null;
    for (; p !== null; ) (t(h, p), (p = p.sibling));
    return null;
  }
  function r(h, p) {
    for (h = new Map(); p !== null; )
      (p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling));
    return h;
  }
  function i(h, p) {
    return ((h = Ct(h, p)), (h.index = 0), (h.sibling = null), h);
  }
  function o(h, p, y) {
    return (
      (h.index = y),
      e
        ? ((y = h.alternate),
          y !== null
            ? ((y = y.index), y < p ? ((h.flags |= 2), p) : y)
            : ((h.flags |= 2), p))
        : ((h.flags |= 1048576), p)
    );
  }
  function l(h) {
    return (e && h.alternate === null && (h.flags |= 2), h);
  }
  function s(h, p, y, S) {
    return p === null || p.tag !== 6
      ? ((p = Bo(y, h.mode, S)), (p.return = h), p)
      : ((p = i(p, y)), (p.return = h), p);
  }
  function a(h, p, y, S) {
    var N = y.type;
    return N === Jt
      ? f(h, p, y.props.children, S, y.key)
      : p !== null &&
          (p.elementType === N ||
            (typeof N == "object" &&
              N !== null &&
              N.$$typeof === dt &&
              Ba(N) === p.type))
        ? ((S = i(p, y.props)), (S.ref = Bn(h, p, y)), (S.return = h), S)
        : ((S = ai(y.type, y.key, y.props, null, h.mode, S)),
          (S.ref = Bn(h, p, y)),
          (S.return = h),
          S);
  }
  function u(h, p, y, S) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== y.containerInfo ||
      p.stateNode.implementation !== y.implementation
      ? ((p = Fo(y, h.mode, S)), (p.return = h), p)
      : ((p = i(p, y.children || [])), (p.return = h), p);
  }
  function f(h, p, y, S, N) {
    return p === null || p.tag !== 7
      ? ((p = Ut(y, h.mode, S, N)), (p.return = h), p)
      : ((p = i(p, y)), (p.return = h), p);
  }
  function d(h, p, y) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return ((p = Bo("" + p, h.mode, y)), (p.return = h), p);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Or:
          return (
            (y = ai(p.type, p.key, p.props, null, h.mode, y)),
            (y.ref = Bn(h, null, p)),
            (y.return = h),
            y
          );
        case Yt:
          return ((p = Fo(p, h.mode, y)), (p.return = h), p);
        case dt:
          var S = p._init;
          return d(h, S(p._payload), y);
      }
      if (Hn(p) || On(p))
        return ((p = Ut(p, h.mode, y, null)), (p.return = h), p);
      Hr(h, p);
    }
    return null;
  }
  function m(h, p, y, S) {
    var N = p !== null ? p.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return N !== null ? null : s(h, p, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Or:
          return y.key === N ? a(h, p, y, S) : null;
        case Yt:
          return y.key === N ? u(h, p, y, S) : null;
        case dt:
          return ((N = y._init), m(h, p, N(y._payload), S));
      }
      if (Hn(y) || On(y)) return N !== null ? null : f(h, p, y, S, null);
      Hr(h, y);
    }
    return null;
  }
  function g(h, p, y, S, N) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return ((h = h.get(y) || null), s(p, h, "" + S, N));
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Or:
          return (
            (h = h.get(S.key === null ? y : S.key) || null),
            a(p, h, S, N)
          );
        case Yt:
          return (
            (h = h.get(S.key === null ? y : S.key) || null),
            u(p, h, S, N)
          );
        case dt:
          var k = S._init;
          return g(h, p, y, k(S._payload), N);
      }
      if (Hn(S) || On(S)) return ((h = h.get(y) || null), f(p, h, S, N, null));
      Hr(p, S);
    }
    return null;
  }
  function v(h, p, y, S) {
    for (
      var N = null, k = null, C = p, P = (p = 0), z = null;
      C !== null && P < y.length;
      P++
    ) {
      C.index > P ? ((z = C), (C = null)) : (z = C.sibling);
      var L = m(h, C, y[P], S);
      if (L === null) {
        C === null && (C = z);
        break;
      }
      (e && C && L.alternate === null && t(h, C),
        (p = o(L, p, P)),
        k === null ? (N = L) : (k.sibling = L),
        (k = L),
        (C = z));
    }
    if (P === y.length) return (n(h, C), U && At(h, P), N);
    if (C === null) {
      for (; P < y.length; P++)
        ((C = d(h, y[P], S)),
          C !== null &&
            ((p = o(C, p, P)),
            k === null ? (N = C) : (k.sibling = C),
            (k = C)));
      return (U && At(h, P), N);
    }
    for (C = r(h, C); P < y.length; P++)
      ((z = g(C, h, P, y[P], S)),
        z !== null &&
          (e && z.alternate !== null && C.delete(z.key === null ? P : z.key),
          (p = o(z, p, P)),
          k === null ? (N = z) : (k.sibling = z),
          (k = z)));
    return (
      e &&
        C.forEach(function (ve) {
          return t(h, ve);
        }),
      U && At(h, P),
      N
    );
  }
  function x(h, p, y, S) {
    var N = On(y);
    if (typeof N != "function") throw Error(_(150));
    if (((y = N.call(y)), y == null)) throw Error(_(151));
    for (
      var k = (N = null), C = p, P = (p = 0), z = null, L = y.next();
      C !== null && !L.done;
      P++, L = y.next()
    ) {
      C.index > P ? ((z = C), (C = null)) : (z = C.sibling);
      var ve = m(h, C, L.value, S);
      if (ve === null) {
        C === null && (C = z);
        break;
      }
      (e && C && ve.alternate === null && t(h, C),
        (p = o(ve, p, P)),
        k === null ? (N = ve) : (k.sibling = ve),
        (k = ve),
        (C = z));
    }
    if (L.done) return (n(h, C), U && At(h, P), N);
    if (C === null) {
      for (; !L.done; P++, L = y.next())
        ((L = d(h, L.value, S)),
          L !== null &&
            ((p = o(L, p, P)),
            k === null ? (N = L) : (k.sibling = L),
            (k = L)));
      return (U && At(h, P), N);
    }
    for (C = r(h, C); !L.done; P++, L = y.next())
      ((L = g(C, h, P, L.value, S)),
        L !== null &&
          (e && L.alternate !== null && C.delete(L.key === null ? P : L.key),
          (p = o(L, p, P)),
          k === null ? (N = L) : (k.sibling = L),
          (k = L)));
    return (
      e &&
        C.forEach(function (Ot) {
          return t(h, Ot);
        }),
      U && At(h, P),
      N
    );
  }
  function E(h, p, y, S) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === Jt &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case Or:
          e: {
            for (var N = y.key, k = p; k !== null; ) {
              if (k.key === N) {
                if (((N = y.type), N === Jt)) {
                  if (k.tag === 7) {
                    (n(h, k.sibling),
                      (p = i(k, y.props.children)),
                      (p.return = h),
                      (h = p));
                    break e;
                  }
                } else if (
                  k.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === dt &&
                    Ba(N) === k.type)
                ) {
                  (n(h, k.sibling),
                    (p = i(k, y.props)),
                    (p.ref = Bn(h, k, y)),
                    (p.return = h),
                    (h = p));
                  break e;
                }
                n(h, k);
                break;
              } else t(h, k);
              k = k.sibling;
            }
            y.type === Jt
              ? ((p = Ut(y.props.children, h.mode, S, y.key)),
                (p.return = h),
                (h = p))
              : ((S = ai(y.type, y.key, y.props, null, h.mode, S)),
                (S.ref = Bn(h, p, y)),
                (S.return = h),
                (h = S));
          }
          return l(h);
        case Yt:
          e: {
            for (k = y.key; p !== null; ) {
              if (p.key === k)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === y.containerInfo &&
                  p.stateNode.implementation === y.implementation
                ) {
                  (n(h, p.sibling),
                    (p = i(p, y.children || [])),
                    (p.return = h),
                    (h = p));
                  break e;
                } else {
                  n(h, p);
                  break;
                }
              else t(h, p);
              p = p.sibling;
            }
            ((p = Fo(y, h.mode, S)), (p.return = h), (h = p));
          }
          return l(h);
        case dt:
          return ((k = y._init), E(h, p, k(y._payload), S));
      }
      if (Hn(y)) return v(h, p, y, S);
      if (On(y)) return x(h, p, y, S);
      Hr(h, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        p !== null && p.tag === 6
          ? (n(h, p.sibling), (p = i(p, y)), (p.return = h), (h = p))
          : (n(h, p), (p = Bo(y, h.mode, S)), (p.return = h), (h = p)),
        l(h))
      : n(h, p);
  }
  return E;
}
var vn = $c(!0),
  Uc = $c(!1),
  Pi = jt(null),
  Ti = null,
  ln = null,
  gs = null;
function vs() {
  gs = ln = Ti = null;
}
function xs(e) {
  var t = Pi.current;
  ($(Pi), (e._currentValue = t));
}
function El(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function pn(e, t) {
  ((Ti = e),
    (gs = ln = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (he = !0), (e.firstContext = null)));
}
function Le(e) {
  var t = e._currentValue;
  if (gs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), ln === null)) {
      if (Ti === null) throw Error(_(308));
      ((ln = e), (Ti.dependencies = { lanes: 0, firstContext: e }));
    } else ln = ln.next = e;
  return t;
}
var Ft = null;
function ws(e) {
  Ft === null ? (Ft = [e]) : Ft.push(e);
}
function bc(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), ws(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    ot(e, r)
  );
}
function ot(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var pt = !1;
function ks(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Hc(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function nt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function St(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), A & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      ot(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), ws(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    ot(e, n)
  );
}
function ni(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ls(e, n));
  }
}
function Fa(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (o === null ? (i = o = l) : (o = o.next = l), (n = n.next));
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function ji(e, t, n, r) {
  var i = e.updateQueue;
  pt = !1;
  var o = i.firstBaseUpdate,
    l = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var a = s,
      u = a.next;
    ((a.next = null), l === null ? (o = u) : (l.next = u), (l = a));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (s = f.lastBaseUpdate),
      s !== l &&
        (s === null ? (f.firstBaseUpdate = u) : (s.next = u),
        (f.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var d = i.baseState;
    ((l = 0), (f = u = a = null), (s = o));
    do {
      var m = s.lane,
        g = s.eventTime;
      if ((r & m) === m) {
        f !== null &&
          (f = f.next =
            {
              eventTime: g,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var v = e,
            x = s;
          switch (((m = t), (g = n), x.tag)) {
            case 1:
              if (((v = x.payload), typeof v == "function")) {
                d = v.call(g, d, m);
                break e;
              }
              d = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = x.payload),
                (m = typeof v == "function" ? v.call(g, d, m) : v),
                m == null)
              )
                break e;
              d = W({}, d, m);
              break e;
            case 2:
              pt = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = i.effects),
          m === null ? (i.effects = [s]) : m.push(s));
      } else
        ((g = {
          eventTime: g,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          f === null ? ((u = f = g), (a = d)) : (f = f.next = g),
          (l |= m));
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        ((m = s),
          (s = m.next),
          (m.next = null),
          (i.lastBaseUpdate = m),
          (i.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (a = d),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = f),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do ((l |= i.lane), (i = i.next));
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    ((Wt |= l), (e.lanes = l), (e.memoizedState = d));
  }
}
function Ma(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(_(191, i));
        i.call(r);
      }
    }
}
var Cr = {},
  Ge = jt(Cr),
  hr = jt(Cr),
  mr = jt(Cr);
function Mt(e) {
  if (e === Cr) throw Error(_(174));
  return e;
}
function Ss(e, t) {
  switch ((F(mr, t), F(hr, e), F(Ge, Cr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : rl(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = rl(t, e)));
  }
  ($(Ge), F(Ge, t));
}
function xn() {
  ($(Ge), $(hr), $(mr));
}
function Vc(e) {
  Mt(mr.current);
  var t = Mt(Ge.current),
    n = rl(t, e.type);
  t !== n && (F(hr, e), F(Ge, n));
}
function Es(e) {
  hr.current === e && ($(Ge), $(hr));
}
var H = jt(0);
function Li(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var Lo = [];
function _s() {
  for (var e = 0; e < Lo.length; e++)
    Lo[e]._workInProgressVersionPrimary = null;
  Lo.length = 0;
}
var ri = at.ReactCurrentDispatcher,
  Oo = at.ReactCurrentBatchConfig,
  Vt = 0,
  V = null,
  J = null,
  ee = null,
  Oi = !1,
  Zn = !1,
  yr = 0,
  vh = 0;
function oe() {
  throw Error(_(321));
}
function Cs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!$e(e[n], t[n])) return !1;
  return !0;
}
function Ns(e, t, n, r, i, o) {
  if (
    ((Vt = o),
    (V = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ri.current = e === null || e.memoizedState === null ? Sh : Eh),
    (e = n(r, i)),
    Zn)
  ) {
    o = 0;
    do {
      if (((Zn = !1), (yr = 0), 25 <= o)) throw Error(_(301));
      ((o += 1),
        (ee = J = null),
        (t.updateQueue = null),
        (ri.current = _h),
        (e = n(r, i)));
    } while (Zn);
  }
  if (
    ((ri.current = Ii),
    (t = J !== null && J.next !== null),
    (Vt = 0),
    (ee = J = V = null),
    (Oi = !1),
    t)
  )
    throw Error(_(300));
  return e;
}
function Rs() {
  var e = yr !== 0;
  return ((yr = 0), e);
}
function Ve() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (ee === null ? (V.memoizedState = ee = e) : (ee = ee.next = e), ee);
}
function Oe() {
  if (J === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = ee === null ? V.memoizedState : ee.next;
  if (t !== null) ((ee = t), (J = e));
  else {
    if (e === null) throw Error(_(310));
    ((J = e),
      (e = {
        memoizedState: J.memoizedState,
        baseState: J.baseState,
        baseQueue: J.baseQueue,
        queue: J.queue,
        next: null,
      }),
      ee === null ? (V.memoizedState = ee = e) : (ee = ee.next = e));
  }
  return ee;
}
function gr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Io(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = J,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var l = i.next;
      ((i.next = o.next), (o.next = l));
    }
    ((r.baseQueue = i = o), (n.pending = null));
  }
  if (i !== null) {
    ((o = i.next), (r = r.baseState));
    var s = (l = null),
      a = null,
      u = o;
    do {
      var f = u.lane;
      if ((Vt & f) === f)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var d = {
          lane: f,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (a === null ? ((s = a = d), (l = r)) : (a = a.next = d),
          (V.lanes |= f),
          (Wt |= f));
      }
      u = u.next;
    } while (u !== null && u !== o);
    (a === null ? (l = r) : (a.next = s),
      $e(r, t.memoizedState) || (he = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do ((o = i.lane), (V.lanes |= o), (Wt |= o), (i = i.next));
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Do(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var l = (i = i.next);
    do ((o = e(o, l.action)), (l = l.next));
    while (l !== i);
    ($e(o, t.memoizedState) || (he = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o));
  }
  return [o, r];
}
function Wc() {}
function Qc(e, t) {
  var n = V,
    r = Oe(),
    i = t(),
    o = !$e(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (he = !0)),
    (r = r.queue),
    Ps(qc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ee !== null && ee.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      vr(9, Kc.bind(null, n, r, i, t), void 0, null),
      te === null)
    )
      throw Error(_(349));
    Vt & 30 || Gc(n, t, i);
  }
  return i;
}
function Gc(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Kc(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Yc(t) && Jc(e));
}
function qc(e, t, n) {
  return n(function () {
    Yc(t) && Jc(e);
  });
}
function Yc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !$e(e, n);
  } catch {
    return !0;
  }
}
function Jc(e) {
  var t = ot(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function $a(e) {
  var t = Ve();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = kh.bind(null, V, e)),
    [t.memoizedState, e]
  );
}
function vr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Xc() {
  return Oe().memoizedState;
}
function ii(e, t, n, r) {
  var i = Ve();
  ((V.flags |= e),
    (i.memoizedState = vr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ki(e, t, n, r) {
  var i = Oe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (J !== null) {
    var l = J.memoizedState;
    if (((o = l.destroy), r !== null && Cs(r, l.deps))) {
      i.memoizedState = vr(t, n, o, r);
      return;
    }
  }
  ((V.flags |= e), (i.memoizedState = vr(1 | t, n, o, r)));
}
function Ua(e, t) {
  return ii(8390656, 8, e, t);
}
function Ps(e, t) {
  return Ki(2048, 8, e, t);
}
function Zc(e, t) {
  return Ki(4, 2, e, t);
}
function ef(e, t) {
  return Ki(4, 4, e, t);
}
function tf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function nf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Ki(4, 4, tf.bind(null, t, e), n)
  );
}
function Ts() {}
function rf(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function of(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function lf(e, t, n) {
  return Vt & 21
    ? ($e(n, t) || ((n = cc()), (V.lanes |= n), (Wt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (he = !0)), (e.memoizedState = n));
}
function xh(e, t) {
  var n = B;
  ((B = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Oo.transition;
  Oo.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((B = n), (Oo.transition = r));
  }
}
function sf() {
  return Oe().memoizedState;
}
function wh(e, t, n) {
  var r = _t(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    af(e))
  )
    uf(t, n);
  else if (((n = bc(e, t, n, r)), n !== null)) {
    var i = ce();
    (Me(n, e, r, i), cf(n, t, r));
  }
}
function kh(e, t, n) {
  var r = _t(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (af(e)) uf(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var l = t.lastRenderedState,
          s = o(l, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), $e(s, l))) {
          var a = t.interleaved;
          (a === null
            ? ((i.next = i), ws(t))
            : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i));
          return;
        }
      } catch {
      } finally {
      }
    ((n = bc(e, t, i, r)),
      n !== null && ((i = ce()), Me(n, e, r, i), cf(n, t, r)));
  }
}
function af(e) {
  var t = e.alternate;
  return e === V || (t !== null && t === V);
}
function uf(e, t) {
  Zn = Oi = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function cf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ls(e, n));
  }
}
var Ii = {
    readContext: Le,
    useCallback: oe,
    useContext: oe,
    useEffect: oe,
    useImperativeHandle: oe,
    useInsertionEffect: oe,
    useLayoutEffect: oe,
    useMemo: oe,
    useReducer: oe,
    useRef: oe,
    useState: oe,
    useDebugValue: oe,
    useDeferredValue: oe,
    useTransition: oe,
    useMutableSource: oe,
    useSyncExternalStore: oe,
    useId: oe,
    unstable_isNewReconciler: !1,
  },
  Sh = {
    readContext: Le,
    useCallback: function (e, t) {
      return ((Ve().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Le,
    useEffect: Ua,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ii(4194308, 4, tf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return ii(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ii(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ve();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ve();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = wh.bind(null, V, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ve();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: $a,
    useDebugValue: Ts,
    useDeferredValue: function (e) {
      return (Ve().memoizedState = e);
    },
    useTransition: function () {
      var e = $a(!1),
        t = e[0];
      return ((e = xh.bind(null, e[1])), (Ve().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = V,
        i = Ve();
      if (U) {
        if (n === void 0) throw Error(_(407));
        n = n();
      } else {
        if (((n = t()), te === null)) throw Error(_(349));
        Vt & 30 || Gc(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        Ua(qc.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        vr(9, Kc.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ve(),
        t = te.identifierPrefix;
      if (U) {
        var n = tt,
          r = et;
        ((n = (r & ~(1 << (32 - Fe(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = yr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = vh++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Eh = {
    readContext: Le,
    useCallback: rf,
    useContext: Le,
    useEffect: Ps,
    useImperativeHandle: nf,
    useInsertionEffect: Zc,
    useLayoutEffect: ef,
    useMemo: of,
    useReducer: Io,
    useRef: Xc,
    useState: function () {
      return Io(gr);
    },
    useDebugValue: Ts,
    useDeferredValue: function (e) {
      var t = Oe();
      return lf(t, J.memoizedState, e);
    },
    useTransition: function () {
      var e = Io(gr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: Wc,
    useSyncExternalStore: Qc,
    useId: sf,
    unstable_isNewReconciler: !1,
  },
  _h = {
    readContext: Le,
    useCallback: rf,
    useContext: Le,
    useEffect: Ps,
    useImperativeHandle: nf,
    useInsertionEffect: Zc,
    useLayoutEffect: ef,
    useMemo: of,
    useReducer: Do,
    useRef: Xc,
    useState: function () {
      return Do(gr);
    },
    useDebugValue: Ts,
    useDeferredValue: function (e) {
      var t = Oe();
      return J === null ? (t.memoizedState = e) : lf(t, J.memoizedState, e);
    },
    useTransition: function () {
      var e = Do(gr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: Wc,
    useSyncExternalStore: Qc,
    useId: sf,
    unstable_isNewReconciler: !1,
  };
function De(e, t) {
  if (e && e.defaultProps) {
    ((t = W({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function _l(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : W({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var qi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Kt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      i = _t(e),
      o = nt(r, i);
    ((o.payload = t),
      n != null && (o.callback = n),
      (t = St(e, o, i)),
      t !== null && (Me(t, e, i, r), ni(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      i = _t(e),
      o = nt(r, i);
    ((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = St(e, o, i)),
      t !== null && (Me(t, e, i, r), ni(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ce(),
      r = _t(e),
      i = nt(n, r);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = St(e, i, r)),
      t !== null && (Me(t, e, r, n), ni(t, e, r)));
  },
};
function ba(e, t, n, r, i, o, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, l)
      : t.prototype && t.prototype.isPureReactComponent
        ? !cr(n, r) || !cr(i, o)
        : !0
  );
}
function ff(e, t, n) {
  var r = !1,
    i = Pt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Le(o))
      : ((i = ye(t) ? bt : ae.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? yn(e, i) : Pt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = qi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Ha(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && qi.enqueueReplaceState(t, t.state, null));
}
function Cl(e, t, n, r) {
  var i = e.stateNode;
  ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), ks(e));
  var o = t.contextType;
  (typeof o == "object" && o !== null
    ? (i.context = Le(o))
    : ((o = ye(t) ? bt : ae.current), (i.context = yn(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (_l(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && qi.enqueueReplaceState(i, i.state, null),
      ji(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function wn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xd(r)), (r = r.return));
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Ao(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Nl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ch = typeof WeakMap == "function" ? WeakMap : Map;
function df(e, t, n) {
  ((n = nt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Ai || ((Ai = !0), (zl = r)), Nl(e, t));
    }),
    n
  );
}
function pf(e, t, n) {
  ((n = nt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    ((n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Nl(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        (Nl(e, t),
          typeof r != "function" &&
            (Et === null ? (Et = new Set([this])) : Et.add(this)));
        var l = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: l !== null ? l : "",
        });
      }),
    n
  );
}
function Va(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ch();
    var i = new Set();
    r.set(t, i);
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
  i.has(n) || (i.add(n), (e = Mh.bind(null, e, t, n)), t.then(e, e));
}
function Wa(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Qa(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = nt(-1, 1)), (t.tag = 2), St(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Nh = at.ReactCurrentOwner,
  he = !1;
function ue(e, t, n, r) {
  t.child = e === null ? Uc(t, null, n, r) : vn(t, e.child, n, r);
}
function Ga(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    pn(t, i),
    (r = Ns(e, t, n, r, o, i)),
    (n = Rs()),
    e !== null && !he
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        lt(e, t, i))
      : (U && n && hs(t), (t.flags |= 1), ue(e, t, r, i), t.child)
  );
}
function Ka(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Bs(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), hf(e, t, o, r, i))
      : ((e = ai(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var l = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : cr), n(l, r) && e.ref === t.ref)
    )
      return lt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Ct(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function hf(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (cr(o, r) && e.ref === t.ref)
      if (((he = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (he = !0);
      else return ((t.lanes = e.lanes), lt(e, t, i));
  }
  return Rl(e, t, n, r, i);
}
function mf(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        F(an, xe),
        (xe |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          F(an, xe),
          (xe |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        F(an, xe),
        (xe |= r));
    }
  else
    (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      F(an, xe),
      (xe |= r));
  return (ue(e, t, i, n), t.child);
}
function yf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Rl(e, t, n, r, i) {
  var o = ye(n) ? bt : ae.current;
  return (
    (o = yn(t, o)),
    pn(t, i),
    (n = Ns(e, t, n, r, o, i)),
    (r = Rs()),
    e !== null && !he
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        lt(e, t, i))
      : (U && r && hs(t), (t.flags |= 1), ue(e, t, n, i), t.child)
  );
}
function qa(e, t, n, r, i) {
  if (ye(n)) {
    var o = !0;
    Ci(t);
  } else o = !1;
  if ((pn(t, i), t.stateNode === null))
    (oi(e, t), ff(t, n, r), Cl(t, n, r, i), (r = !0));
  else if (e === null) {
    var l = t.stateNode,
      s = t.memoizedProps;
    l.props = s;
    var a = l.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Le(u))
      : ((u = ye(n) ? bt : ae.current), (u = yn(t, u)));
    var f = n.getDerivedStateFromProps,
      d =
        typeof f == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function";
    (d ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== r || a !== u) && Ha(t, l, r, u)),
      (pt = !1));
    var m = t.memoizedState;
    ((l.state = m),
      ji(t, r, l, i),
      (a = t.memoizedState),
      s !== r || m !== a || me.current || pt
        ? (typeof f == "function" && (_l(t, n, f, r), (a = t.memoizedState)),
          (s = pt || ba(t, n, s, r, m, a, u))
            ? (d ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (l.props = r),
          (l.state = a),
          (l.context = u),
          (r = s))
        : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((l = t.stateNode),
      Hc(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : De(t.type, s)),
      (l.props = u),
      (d = t.pendingProps),
      (m = l.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Le(a))
        : ((a = ye(n) ? bt : ae.current), (a = yn(t, a))));
    var g = n.getDerivedStateFromProps;
    ((f =
      typeof g == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== d || m !== a) && Ha(t, l, r, a)),
      (pt = !1),
      (m = t.memoizedState),
      (l.state = m),
      ji(t, r, l, i));
    var v = t.memoizedState;
    s !== d || m !== v || me.current || pt
      ? (typeof g == "function" && (_l(t, n, g, r), (v = t.memoizedState)),
        (u = pt || ba(t, n, u, r, m, v, a) || !1)
          ? (f ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(r, v, a),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, v, a)),
            typeof l.componentDidUpdate == "function" && (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (l.props = r),
        (l.state = v),
        (l.context = a),
        (r = u))
      : (typeof l.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Pl(e, t, n, r, o, i);
}
function Pl(e, t, n, r, i, o) {
  yf(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return (i && Da(t, n, !1), lt(e, t, o));
  ((r = t.stateNode), (Nh.current = t));
  var s =
    l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = vn(t, e.child, null, o)), (t.child = vn(t, null, s, o)))
      : ue(e, t, s, o),
    (t.memoizedState = r.state),
    i && Da(t, n, !0),
    t.child
  );
}
function gf(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Ia(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ia(e, t.context, !1),
    Ss(e, t.containerInfo));
}
function Ya(e, t, n, r, i) {
  return (gn(), ys(i), (t.flags |= 256), ue(e, t, n, r), t.child);
}
var Tl = { dehydrated: null, treeContext: null, retryLane: 0 };
function jl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vf(e, t, n) {
  var r = t.pendingProps,
    i = H.current,
    o = !1,
    l = (t.flags & 128) !== 0,
    s;
  if (
    ((s = l) ||
      (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    s
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    F(H, i & 1),
    e === null)
  )
    return (
      Sl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = l))
                : (o = Xi(l, r, 0, null)),
              (e = Ut(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = jl(n)),
              (t.memoizedState = Tl),
              e)
            : js(t, l))
    );
  if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
    return Rh(e, t, l, r, s, i, n);
  if (o) {
    ((o = r.fallback), (l = t.mode), (i = e.child), (s = i.sibling));
    var a = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Ct(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      s !== null ? (o = Ct(s, o)) : ((o = Ut(o, l, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? jl(n)
          : {
              baseLanes: l.baseLanes | n,
              cachePool: null,
              transitions: l.transitions,
            }),
      (o.memoizedState = l),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Tl),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Ct(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function js(e, t) {
  return (
    (t = Xi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Vr(e, t, n, r) {
  return (
    r !== null && ys(r),
    vn(t, e.child, null, n),
    (e = js(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Rh(e, t, n, r, i, o, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Ao(Error(_(422)))), Vr(e, t, l, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = Xi({ mode: "visible", children: r.children }, i, 0, null)),
          (o = Ut(o, i, l, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && vn(t, e.child, null, l),
          (t.child.memoizedState = jl(l)),
          (t.memoizedState = Tl),
          o);
  if (!(t.mode & 1)) return Vr(e, t, l, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return (
      (r = s),
      (o = Error(_(419))),
      (r = Ao(o, r, void 0)),
      Vr(e, t, l, r)
    );
  }
  if (((s = (l & e.childLanes) !== 0), he || s)) {
    if (((r = te), r !== null)) {
      switch (l & -l) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
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
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      ((i = i & (r.suspendedLanes | l) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), ot(e, i), Me(r, e, i, -1)));
    }
    return (zs(), (r = Ao(Error(_(421)))), Vr(e, t, l, r));
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = $h.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (we = kt(i.nextSibling)),
      (ke = t),
      (U = !0),
      (Be = null),
      e !== null &&
        ((Ne[Re++] = et),
        (Ne[Re++] = tt),
        (Ne[Re++] = Ht),
        (et = e.id),
        (tt = e.overflow),
        (Ht = t)),
      (t = js(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Ja(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), El(e.return, t, n));
}
function zo(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function xf(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((ue(e, t, r.children, n), (r = H.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ja(e, n, t);
        else if (e.tag === 19) Ja(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((F(H, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          ((e = n.alternate),
            e !== null && Li(e) === null && (i = n),
            (n = n.sibling));
        ((n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          zo(t, !1, i, n, o));
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Li(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
        }
        zo(t, !0, n, null, o);
        break;
      case "together":
        zo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function oi(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function lt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Wt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Ct(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = Ct(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Ph(e, t, n) {
  switch (t.tag) {
    case 3:
      (gf(t), gn());
      break;
    case 5:
      Vc(t);
      break;
    case 1:
      ye(t.type) && Ci(t);
      break;
    case 4:
      Ss(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      (F(Pi, r._currentValue), (r._currentValue = i));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (F(H, H.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? vf(e, t, n)
            : (F(H, H.current & 1),
              (e = lt(e, t, n)),
              e !== null ? e.sibling : null);
      F(H, H.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return xf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        F(H, H.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), mf(e, t, n));
  }
  return lt(e, t, n);
}
var wf, Ll, kf, Sf;
wf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
Ll = function () {};
kf = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    ((e = t.stateNode), Mt(Ge.current));
    var o = null;
    switch (n) {
      case "input":
        ((i = Zo(e, i)), (r = Zo(e, r)), (o = []));
        break;
      case "select":
        ((i = W({}, i, { value: void 0 })),
          (r = W({}, r, { value: void 0 })),
          (o = []));
        break;
      case "textarea":
        ((i = nl(e, i)), (r = nl(e, r)), (o = []));
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ei);
    }
    il(n, r);
    var l;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var s = i[u];
          for (l in s) s.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (rr.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((s = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== s && (a != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (l in s)
              !s.hasOwnProperty(l) ||
                (a && a.hasOwnProperty(l)) ||
                (n || (n = {}), (n[l] = ""));
            for (l in a)
              a.hasOwnProperty(l) &&
                s[l] !== a[l] &&
                (n || (n = {}), (n[l] = a[l]));
          } else (n || (o || (o = []), o.push(u, n)), (n = a));
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (o = o || []).push(u, a))
            : u === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (o = o || []).push(u, "" + a)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (rr.hasOwnProperty(u)
                  ? (a != null && u === "onScroll" && M("scroll", e),
                    o || s === a || (o = []))
                  : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Sf = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Fn(e, t) {
  if (!U)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling));
  else
    for (i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Th(e, t, n) {
  var r = t.pendingProps;
  switch ((ms(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (le(t), null);
    case 1:
      return (ye(t.type) && _i(), le(t), null);
    case 3:
      return (
        (r = t.stateNode),
        xn(),
        $(me),
        $(ae),
        _s(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (br(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Be !== null && (Ml(Be), (Be = null)))),
        Ll(e, t),
        le(t),
        null
      );
    case 5:
      Es(t);
      var i = Mt(mr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (kf(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return (le(t), null);
        }
        if (((e = Mt(Ge.current)), br(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[We] = t), (r[pr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (M("cancel", r), M("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              M("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Wn.length; i++) M(Wn[i], r);
              break;
            case "source":
              M("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (M("error", r), M("load", r));
              break;
            case "details":
              M("toggle", r);
              break;
            case "input":
              (la(r, o), M("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!o.multiple }),
                M("invalid", r));
              break;
            case "textarea":
              (aa(r, o), M("invalid", r));
          }
          (il(n, o), (i = null));
          for (var l in o)
            if (o.hasOwnProperty(l)) {
              var s = o[l];
              l === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Ur(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Ur(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : rr.hasOwnProperty(l) &&
                  s != null &&
                  l === "onScroll" &&
                  M("scroll", r);
            }
          switch (n) {
            case "input":
              (Ir(r), sa(r, o, !0));
              break;
            case "textarea":
              (Ir(r), ua(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ei);
          }
          ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((l = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = qu(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = l.createElement(n, { is: r.is }))
                  : ((e = l.createElement(n)),
                    n === "select" &&
                      ((l = e),
                      r.multiple
                        ? (l.multiple = !0)
                        : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[We] = t),
            (e[pr] = r),
            wf(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((l = ol(n, r)), n)) {
              case "dialog":
                (M("cancel", e), M("close", e), (i = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (M("load", e), (i = r));
                break;
              case "video":
              case "audio":
                for (i = 0; i < Wn.length; i++) M(Wn[i], e);
                i = r;
                break;
              case "source":
                (M("error", e), (i = r));
                break;
              case "img":
              case "image":
              case "link":
                (M("error", e), M("load", e), (i = r));
                break;
              case "details":
                (M("toggle", e), (i = r));
                break;
              case "input":
                (la(e, r), (i = Zo(e, r)), M("invalid", e));
                break;
              case "option":
                i = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = W({}, r, { value: void 0 })),
                  M("invalid", e));
                break;
              case "textarea":
                (aa(e, r), (i = nl(e, r)), M("invalid", e));
                break;
              default:
                i = r;
            }
            (il(n, i), (s = i));
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var a = s[o];
                o === "style"
                  ? Xu(e, a)
                  : o === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Yu(e, a))
                    : o === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && ir(e, a)
                        : typeof a == "number" && ir(e, "" + a)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (rr.hasOwnProperty(o)
                          ? a != null && o === "onScroll" && M("scroll", e)
                          : a != null && es(e, o, a, l));
              }
            switch (n) {
              case "input":
                (Ir(e), sa(e, r, !1));
                break;
              case "textarea":
                (Ir(e), ua(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Rt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? un(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      un(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Ei);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (le(t), null);
    case 6:
      if (e && t.stateNode != null) Sf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(_(166));
        if (((n = Mt(mr.current)), Mt(Ge.current), br(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[We] = t),
            (o = r.nodeValue !== n) && ((e = ke), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ur(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ur(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[We] = t),
            (t.stateNode = r));
      }
      return (le(t), null);
    case 13:
      if (
        ($(H),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (U && we !== null && t.mode & 1 && !(t.flags & 128))
          (Mc(), gn(), (t.flags |= 98560), (o = !1));
        else if (((o = br(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(_(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(_(317));
            o[We] = t;
          } else
            (gn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (le(t), (o = !1));
        } else (Be !== null && (Ml(Be), (Be = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || H.current & 1 ? X === 0 && (X = 3) : zs())),
          t.updateQueue !== null && (t.flags |= 4),
          le(t),
          null);
    case 4:
      return (
        xn(),
        Ll(e, t),
        e === null && fr(t.stateNode.containerInfo),
        le(t),
        null
      );
    case 10:
      return (xs(t.type._context), le(t), null);
    case 17:
      return (ye(t.type) && _i(), le(t), null);
    case 19:
      if (($(H), (o = t.memoizedState), o === null)) return (le(t), null);
      if (((r = (t.flags & 128) !== 0), (l = o.rendering), l === null))
        if (r) Fn(o, !1);
        else {
          if (X !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = Li(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    Fn(o, !1),
                    r = l.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (l = o.alternate),
                    l === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = l.childLanes),
                        (o.lanes = l.lanes),
                        (o.child = l.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = l.memoizedProps),
                        (o.memoizedState = l.memoizedState),
                        (o.updateQueue = l.updateQueue),
                        (o.type = l.type),
                        (e = l.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (F(H, (H.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null &&
            K() > kn &&
            ((t.flags |= 128), (r = !0), Fn(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Li(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Fn(o, !0),
              o.tail === null && o.tailMode === "hidden" && !l.alternate && !U)
            )
              return (le(t), null);
          } else
            2 * K() - o.renderingStartTime > kn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Fn(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = o.last),
            n !== null ? (n.sibling = l) : (t.child = l),
            (o.last = l));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = K()),
          (t.sibling = null),
          (n = H.current),
          F(H, r ? (n & 1) | 2 : n & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        As(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? xe & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function jh(e, t) {
  switch ((ms(t), t.tag)) {
    case 1:
      return (
        ye(t.type) && _i(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        xn(),
        $(me),
        $(ae),
        _s(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Es(t), null);
    case 13:
      if (($(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(_(340));
        gn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ($(H), null);
    case 4:
      return (xn(), null);
    case 10:
      return (xs(t.type._context), null);
    case 22:
    case 23:
      return (As(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Wr = !1,
  se = !1,
  Lh = typeof WeakSet == "function" ? WeakSet : Set,
  R = null;
function sn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Q(e, t, r);
      }
    else n.current = null;
}
function Ol(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Xa = !1;
function Oh(e, t) {
  if (((ml = wi), (e = Nc()), ps(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            s = -1,
            a = -1,
            u = 0,
            f = 0,
            d = e,
            m = null;
          t: for (;;) {
            for (
              var g;
              d !== n || (i !== 0 && d.nodeType !== 3) || (s = l + i),
                d !== o || (r !== 0 && d.nodeType !== 3) || (a = l + r),
                d.nodeType === 3 && (l += d.nodeValue.length),
                (g = d.firstChild) !== null;
            )
              ((m = d), (d = g));
            for (;;) {
              if (d === e) break t;
              if (
                (m === n && ++u === i && (s = l),
                m === o && ++f === r && (a = l),
                (g = d.nextSibling) !== null)
              )
                break;
              ((d = m), (m = d.parentNode));
            }
            d = g;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (yl = { focusedElem: e, selectionRange: n }, wi = !1, R = t; R !== null; )
    if (((t = R), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (R = e));
    else
      for (; R !== null; ) {
        t = R;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var x = v.memoizedProps,
                    E = v.memoizedState,
                    h = t.stateNode,
                    p = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : De(t.type, x),
                      E,
                    );
                  h.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(_(163));
            }
        } catch (S) {
          Q(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (R = e));
          break;
        }
        R = t.return;
      }
  return ((v = Xa), (Xa = !1), v);
}
function er(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        ((i.destroy = void 0), o !== void 0 && Ol(t, n, o));
      }
      i = i.next;
    } while (i !== r);
  }
}
function Yi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Il(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Ef(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Ef(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[We], delete t[pr], delete t[xl], delete t[hh], delete t[mh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function _f(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Za(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || _f(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Dl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ei)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Dl(e, t, n), e = e.sibling; e !== null; )
      (Dl(e, t, n), (e = e.sibling));
}
function Al(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Al(e, t, n), e = e.sibling; e !== null; )
      (Al(e, t, n), (e = e.sibling));
}
var ne = null,
  Ae = !1;
function ft(e, t, n) {
  for (n = n.child; n !== null; ) (Cf(e, t, n), (n = n.sibling));
}
function Cf(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function")
    try {
      Qe.onCommitFiberUnmount(bi, n);
    } catch {}
  switch (n.tag) {
    case 5:
      se || sn(n, t);
    case 6:
      var r = ne,
        i = Ae;
      ((ne = null),
        ft(e, t, n),
        (ne = r),
        (Ae = i),
        ne !== null &&
          (Ae
            ? ((e = ne),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ne.removeChild(n.stateNode)));
      break;
    case 18:
      ne !== null &&
        (Ae
          ? ((e = ne),
            (n = n.stateNode),
            e.nodeType === 8
              ? To(e.parentNode, n)
              : e.nodeType === 1 && To(e, n),
            ar(e))
          : To(ne, n.stateNode));
      break;
    case 4:
      ((r = ne),
        (i = Ae),
        (ne = n.stateNode.containerInfo),
        (Ae = !0),
        ft(e, t, n),
        (ne = r),
        (Ae = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !se &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            l = o.destroy;
          ((o = o.tag),
            l !== void 0 && (o & 2 || o & 4) && Ol(n, t, l),
            (i = i.next));
        } while (i !== r);
      }
      ft(e, t, n);
      break;
    case 1:
      if (
        !se &&
        (sn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (s) {
          Q(n, t, s);
        }
      ft(e, t, n);
      break;
    case 21:
      ft(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((se = (r = se) || n.memoizedState !== null), ft(e, t, n), (se = r))
        : ft(e, t, n);
      break;
    default:
      ft(e, t, n);
  }
}
function eu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Lh()),
      t.forEach(function (r) {
        var i = Uh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      }));
  }
}
function Ie(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          l = t,
          s = l;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              ((ne = s.stateNode), (Ae = !1));
              break e;
            case 3:
              ((ne = s.stateNode.containerInfo), (Ae = !0));
              break e;
            case 4:
              ((ne = s.stateNode.containerInfo), (Ae = !0));
              break e;
          }
          s = s.return;
        }
        if (ne === null) throw Error(_(160));
        (Cf(o, l, i), (ne = null), (Ae = !1));
        var a = i.alternate;
        (a !== null && (a.return = null), (i.return = null));
      } catch (u) {
        Q(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Nf(t, e), (t = t.sibling));
}
function Nf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ie(t, e), He(e), r & 4)) {
        try {
          (er(3, e, e.return), Yi(3, e));
        } catch (x) {
          Q(e, e.return, x);
        }
        try {
          er(5, e, e.return);
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      break;
    case 1:
      (Ie(t, e), He(e), r & 512 && n !== null && sn(n, n.return));
      break;
    case 5:
      if (
        (Ie(t, e),
        He(e),
        r & 512 && n !== null && sn(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          ir(i, "");
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          l = n !== null ? n.memoizedProps : o,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (s === "input" && o.type === "radio" && o.name != null && Gu(i, o),
              ol(s, l));
            var u = ol(s, o);
            for (l = 0; l < a.length; l += 2) {
              var f = a[l],
                d = a[l + 1];
              f === "style"
                ? Xu(i, d)
                : f === "dangerouslySetInnerHTML"
                  ? Yu(i, d)
                  : f === "children"
                    ? ir(i, d)
                    : es(i, f, d, u);
            }
            switch (s) {
              case "input":
                el(i, o);
                break;
              case "textarea":
                Ku(i, o);
                break;
              case "select":
                var m = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null
                  ? un(i, !!o.multiple, g, !1)
                  : m !== !!o.multiple &&
                    (o.defaultValue != null
                      ? un(i, !!o.multiple, o.defaultValue, !0)
                      : un(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[pr] = o;
          } catch (x) {
            Q(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Ie(t, e), He(e), r & 4)) {
        if (e.stateNode === null) throw Error(_(162));
        ((i = e.stateNode), (o = e.memoizedProps));
        try {
          i.nodeValue = o;
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (Ie(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ar(t.containerInfo);
        } catch (x) {
          Q(e, e.return, x);
        }
      break;
    case 4:
      (Ie(t, e), He(e));
      break;
    case 13:
      (Ie(t, e),
        He(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Is = K())),
        r & 4 && eu(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((se = (u = se) || f), Ie(t, e), (se = u)) : Ie(t, e),
        He(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !f && e.mode & 1)
        )
          for (R = e, f = e.child; f !== null; ) {
            for (d = R = f; R !== null; ) {
              switch (((m = R), (g = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  er(4, m, m.return);
                  break;
                case 1:
                  sn(m, m.return);
                  var v = m.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    ((r = m), (n = m.return));
                    try {
                      ((t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount());
                    } catch (x) {
                      Q(r, n, x);
                    }
                  }
                  break;
                case 5:
                  sn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    nu(d);
                    continue;
                  }
              }
              g !== null ? ((g.return = m), (R = g)) : nu(d);
            }
            f = f.sibling;
          }
        e: for (f = null, d = e; ; ) {
          if (d.tag === 5) {
            if (f === null) {
              f = d;
              try {
                ((i = d.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = d.stateNode),
                      (a = d.memoizedProps.style),
                      (l =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = Ju("display", l))));
              } catch (x) {
                Q(e, e.return, x);
              }
            }
          } else if (d.tag === 6) {
            if (f === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (x) {
                Q(e, e.return, x);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            ((d.child.return = d), (d = d.child));
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            (f === d && (f = null), (d = d.return));
          }
          (f === d && (f = null),
            (d.sibling.return = d.return),
            (d = d.sibling));
        }
      }
      break;
    case 19:
      (Ie(t, e), He(e), r & 4 && eu(e));
      break;
    case 21:
      break;
    default:
      (Ie(t, e), He(e));
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (_f(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (ir(i, ""), (r.flags &= -33));
          var o = Za(e);
          Al(e, o, i);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            s = Za(e);
          Dl(e, s, l);
          break;
        default:
          throw Error(_(161));
      }
    } catch (a) {
      Q(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ih(e, t, n) {
  ((R = e), Rf(e));
}
function Rf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var i = R,
      o = i.child;
    if (i.tag === 22 && r) {
      var l = i.memoizedState !== null || Wr;
      if (!l) {
        var s = i.alternate,
          a = (s !== null && s.memoizedState !== null) || se;
        s = Wr;
        var u = se;
        if (((Wr = l), (se = a) && !u))
          for (R = i; R !== null; )
            ((l = R),
              (a = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? ru(i)
                : a !== null
                  ? ((a.return = l), (R = a))
                  : ru(i));
        for (; o !== null; ) ((R = o), Rf(o), (o = o.sibling));
        ((R = i), (Wr = s), (se = u));
      }
      tu(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (R = o)) : tu(e);
  }
}
function tu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              se || Yi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !se)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && Ma(t, o, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ma(t, l, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var f = u.memoizedState;
                  if (f !== null) {
                    var d = f.dehydrated;
                    d !== null && ar(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(_(163));
          }
        se || (t.flags & 512 && Il(t));
      } catch (m) {
        Q(t, t.return, m);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (R = n));
      break;
    }
    R = t.return;
  }
}
function nu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (R = n));
      break;
    }
    R = t.return;
  }
}
function ru(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Yi(4, t);
          } catch (a) {
            Q(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              Q(t, i, a);
            }
          }
          var o = t.return;
          try {
            Il(t);
          } catch (a) {
            Q(t, o, a);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Il(t);
          } catch (a) {
            Q(t, l, a);
          }
      }
    } catch (a) {
      Q(t, t.return, a);
    }
    if (t === e) {
      R = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (R = s));
      break;
    }
    R = t.return;
  }
}
var Dh = Math.ceil,
  Di = at.ReactCurrentDispatcher,
  Ls = at.ReactCurrentOwner,
  je = at.ReactCurrentBatchConfig,
  A = 0,
  te = null,
  q = null,
  re = 0,
  xe = 0,
  an = jt(0),
  X = 0,
  xr = null,
  Wt = 0,
  Ji = 0,
  Os = 0,
  tr = null,
  pe = null,
  Is = 0,
  kn = 1 / 0,
  Xe = null,
  Ai = !1,
  zl = null,
  Et = null,
  Qr = !1,
  gt = null,
  zi = 0,
  nr = 0,
  Bl = null,
  li = -1,
  si = 0;
function ce() {
  return A & 6 ? K() : li !== -1 ? li : (li = K());
}
function _t(e) {
  return e.mode & 1
    ? A & 2 && re !== 0
      ? re & -re
      : gh.transition !== null
        ? (si === 0 && (si = cc()), si)
        : ((e = B),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : gc(e.type))),
          e)
    : 1;
}
function Me(e, t, n, r) {
  if (50 < nr) throw ((nr = 0), (Bl = null), Error(_(185)));
  (Sr(e, n, r),
    (!(A & 2) || e !== te) &&
      (e === te && (!(A & 2) && (Ji |= n), X === 4 && mt(e, re)),
      ge(e, r),
      n === 1 && A === 0 && !(t.mode & 1) && ((kn = K() + 500), Gi && Lt())));
}
function ge(e, t) {
  var n = e.callbackNode;
  gp(e, t);
  var r = xi(e, e === te ? re : 0);
  if (r === 0)
    (n !== null && da(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && da(n), t === 1))
      (e.tag === 0 ? yh(iu.bind(null, e)) : zc(iu.bind(null, e)),
        dh(function () {
          !(A & 6) && Lt();
        }),
        (n = null));
    else {
      switch (fc(r)) {
        case 1:
          n = os;
          break;
        case 4:
          n = ac;
          break;
        case 16:
          n = vi;
          break;
        case 536870912:
          n = uc;
          break;
        default:
          n = vi;
      }
      n = Af(n, Pf.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Pf(e, t) {
  if (((li = -1), (si = 0), A & 6)) throw Error(_(327));
  var n = e.callbackNode;
  if (hn() && e.callbackNode !== n) return null;
  var r = xi(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Bi(e, r);
  else {
    t = r;
    var i = A;
    A |= 2;
    var o = jf();
    (te !== e || re !== t) && ((Xe = null), (kn = K() + 500), $t(e, t));
    do
      try {
        Bh();
        break;
      } catch (s) {
        Tf(e, s);
      }
    while (!0);
    (vs(),
      (Di.current = o),
      (A = i),
      q !== null ? (t = 0) : ((te = null), (re = 0), (t = X)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = cl(e)), i !== 0 && ((r = i), (t = Fl(e, i)))), t === 1)
    )
      throw ((n = xr), $t(e, 0), mt(e, r), ge(e, K()), n);
    if (t === 6) mt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Ah(i) &&
          ((t = Bi(e, r)),
          t === 2 && ((o = cl(e)), o !== 0 && ((r = o), (t = Fl(e, o)))),
          t === 1))
      )
        throw ((n = xr), $t(e, 0), mt(e, r), ge(e, K()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          zt(e, pe, Xe);
          break;
        case 3:
          if (
            (mt(e, r), (r & 130023424) === r && ((t = Is + 500 - K()), 10 < t))
          ) {
            if (xi(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              (ce(), (e.pingedLanes |= e.suspendedLanes & i));
              break;
            }
            e.timeoutHandle = vl(zt.bind(null, e, pe, Xe), t);
            break;
          }
          zt(e, pe, Xe);
          break;
        case 4:
          if ((mt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var l = 31 - Fe(r);
            ((o = 1 << l), (l = t[l]), l > i && (i = l), (r &= ~o));
          }
          if (
            ((r = i),
            (r = K() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Dh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = vl(zt.bind(null, e, pe, Xe), r);
            break;
          }
          zt(e, pe, Xe);
          break;
        case 5:
          zt(e, pe, Xe);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return (ge(e, K()), e.callbackNode === n ? Pf.bind(null, e) : null);
}
function Fl(e, t) {
  var n = tr;
  return (
    e.current.memoizedState.isDehydrated && ($t(e, t).flags |= 256),
    (e = Bi(e, t)),
    e !== 2 && ((t = pe), (pe = n), t !== null && Ml(t)),
    e
  );
}
function Ml(e) {
  pe === null ? (pe = e) : pe.push.apply(pe, e);
}
function Ah(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!$e(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function mt(e, t) {
  for (
    t &= ~Os,
      t &= ~Ji,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - Fe(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function iu(e) {
  if (A & 6) throw Error(_(327));
  hn();
  var t = xi(e, 0);
  if (!(t & 1)) return (ge(e, K()), null);
  var n = Bi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = cl(e);
    r !== 0 && ((t = r), (n = Fl(e, r)));
  }
  if (n === 1) throw ((n = xr), $t(e, 0), mt(e, t), ge(e, K()), n);
  if (n === 6) throw Error(_(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    zt(e, pe, Xe),
    ge(e, K()),
    null
  );
}
function Ds(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    ((A = n), A === 0 && ((kn = K() + 500), Gi && Lt()));
  }
}
function Qt(e) {
  gt !== null && gt.tag === 0 && !(A & 6) && hn();
  var t = A;
  A |= 1;
  var n = je.transition,
    r = B;
  try {
    if (((je.transition = null), (B = 1), e)) return e();
  } finally {
    ((B = r), (je.transition = n), (A = t), !(A & 6) && Lt());
  }
}
function As() {
  ((xe = an.current), $(an));
}
function $t(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), fh(n)), q !== null))
    for (n = q.return; n !== null; ) {
      var r = n;
      switch ((ms(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && _i());
          break;
        case 3:
          (xn(), $(me), $(ae), _s());
          break;
        case 5:
          Es(r);
          break;
        case 4:
          xn();
          break;
        case 13:
          $(H);
          break;
        case 19:
          $(H);
          break;
        case 10:
          xs(r.type._context);
          break;
        case 22:
        case 23:
          As();
      }
      n = n.return;
    }
  if (
    ((te = e),
    (q = e = Ct(e.current, null)),
    (re = xe = t),
    (X = 0),
    (xr = null),
    (Os = Ji = Wt = 0),
    (pe = tr = null),
    Ft !== null)
  ) {
    for (t = 0; t < Ft.length; t++)
      if (((n = Ft[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var l = o.next;
          ((o.next = i), (r.next = l));
        }
        n.pending = r;
      }
    Ft = null;
  }
  return e;
}
function Tf(e, t) {
  do {
    var n = q;
    try {
      if ((vs(), (ri.current = Ii), Oi)) {
        for (var r = V.memoizedState; r !== null; ) {
          var i = r.queue;
          (i !== null && (i.pending = null), (r = r.next));
        }
        Oi = !1;
      }
      if (
        ((Vt = 0),
        (ee = J = V = null),
        (Zn = !1),
        (yr = 0),
        (Ls.current = null),
        n === null || n.return === null)
      ) {
        ((X = 1), (xr = t), (q = null));
        break;
      }
      e: {
        var o = e,
          l = n.return,
          s = n,
          a = t;
        if (
          ((t = re),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            f = s,
            d = f.tag;
          if (!(f.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var m = f.alternate;
            m
              ? ((f.updateQueue = m.updateQueue),
                (f.memoizedState = m.memoizedState),
                (f.lanes = m.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var g = Wa(l);
          if (g !== null) {
            ((g.flags &= -257),
              Qa(g, l, s, o, t),
              g.mode & 1 && Va(o, u, t),
              (t = g),
              (a = u));
            var v = t.updateQueue;
            if (v === null) {
              var x = new Set();
              (x.add(a), (t.updateQueue = x));
            } else v.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (Va(o, u, t), zs());
              break e;
            }
            a = Error(_(426));
          }
        } else if (U && s.mode & 1) {
          var E = Wa(l);
          if (E !== null) {
            (!(E.flags & 65536) && (E.flags |= 256),
              Qa(E, l, s, o, t),
              ys(wn(a, s)));
            break e;
          }
        }
        ((o = a = wn(a, s)),
          X !== 4 && (X = 2),
          tr === null ? (tr = [o]) : tr.push(o),
          (o = l));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var h = df(o, a, t);
              Fa(o, h);
              break e;
            case 1:
              s = a;
              var p = o.type,
                y = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (Et === null || !Et.has(y))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var S = pf(o, s, t);
                Fa(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Of(n);
    } catch (N) {
      ((t = N), q === n && n !== null && (q = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function jf() {
  var e = Di.current;
  return ((Di.current = Ii), e === null ? Ii : e);
}
function zs() {
  ((X === 0 || X === 3 || X === 2) && (X = 4),
    te === null || (!(Wt & 268435455) && !(Ji & 268435455)) || mt(te, re));
}
function Bi(e, t) {
  var n = A;
  A |= 2;
  var r = jf();
  (te !== e || re !== t) && ((Xe = null), $t(e, t));
  do
    try {
      zh();
      break;
    } catch (i) {
      Tf(e, i);
    }
  while (!0);
  if ((vs(), (A = n), (Di.current = r), q !== null)) throw Error(_(261));
  return ((te = null), (re = 0), X);
}
function zh() {
  for (; q !== null; ) Lf(q);
}
function Bh() {
  for (; q !== null && !ap(); ) Lf(q);
}
function Lf(e) {
  var t = Df(e.alternate, e, xe);
  ((e.memoizedProps = e.pendingProps),
    t === null ? Of(e) : (q = t),
    (Ls.current = null));
}
function Of(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = jh(n, t)), n !== null)) {
        ((n.flags &= 32767), (q = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((X = 6), (q = null));
        return;
      }
    } else if (((n = Th(n, t, xe)), n !== null)) {
      q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  X === 0 && (X = 5);
}
function zt(e, t, n) {
  var r = B,
    i = je.transition;
  try {
    ((je.transition = null), (B = 1), Fh(e, t, n, r));
  } finally {
    ((je.transition = i), (B = r));
  }
  return null;
}
function Fh(e, t, n, r) {
  do hn();
  while (gt !== null);
  if (A & 6) throw Error(_(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(_(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    (vp(e, o),
    e === te && ((q = te = null), (re = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Qr ||
      ((Qr = !0),
      Af(vi, function () {
        return (hn(), null);
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ((o = je.transition), (je.transition = null));
    var l = B;
    B = 1;
    var s = A;
    ((A |= 4),
      (Ls.current = null),
      Oh(e, n),
      Nf(n, e),
      ih(yl),
      (wi = !!ml),
      (yl = ml = null),
      (e.current = n),
      Ih(n),
      up(),
      (A = s),
      (B = l),
      (je.transition = o));
  } else e.current = n;
  if (
    (Qr && ((Qr = !1), (gt = e), (zi = i)),
    (o = e.pendingLanes),
    o === 0 && (Et = null),
    dp(n.stateNode),
    ge(e, K()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
  if (Ai) throw ((Ai = !1), (e = zl), (zl = null), e);
  return (
    zi & 1 && e.tag !== 0 && hn(),
    (o = e.pendingLanes),
    o & 1 ? (e === Bl ? nr++ : ((nr = 0), (Bl = e))) : (nr = 0),
    Lt(),
    null
  );
}
function hn() {
  if (gt !== null) {
    var e = fc(zi),
      t = je.transition,
      n = B;
    try {
      if (((je.transition = null), (B = 16 > e ? 16 : e), gt === null))
        var r = !1;
      else {
        if (((e = gt), (gt = null), (zi = 0), A & 6)) throw Error(_(331));
        var i = A;
        for (A |= 4, R = e.current; R !== null; ) {
          var o = R,
            l = o.child;
          if (R.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (R = u; R !== null; ) {
                  var f = R;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      er(8, f, o);
                  }
                  var d = f.child;
                  if (d !== null) ((d.return = f), (R = d));
                  else
                    for (; R !== null; ) {
                      f = R;
                      var m = f.sibling,
                        g = f.return;
                      if ((Ef(f), f === u)) {
                        R = null;
                        break;
                      }
                      if (m !== null) {
                        ((m.return = g), (R = m));
                        break;
                      }
                      R = g;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var x = v.child;
                if (x !== null) {
                  v.child = null;
                  do {
                    var E = x.sibling;
                    ((x.sibling = null), (x = E));
                  } while (x !== null);
                }
              }
              R = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null) ((l.return = o), (R = l));
          else
            e: for (; R !== null; ) {
              if (((o = R), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    er(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                ((h.return = o.return), (R = h));
                break e;
              }
              R = o.return;
            }
        }
        var p = e.current;
        for (R = p; R !== null; ) {
          l = R;
          var y = l.child;
          if (l.subtreeFlags & 2064 && y !== null) ((y.return = l), (R = y));
          else
            e: for (l = p; R !== null; ) {
              if (((s = R), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yi(9, s);
                  }
                } catch (N) {
                  Q(s, s.return, N);
                }
              if (s === l) {
                R = null;
                break e;
              }
              var S = s.sibling;
              if (S !== null) {
                ((S.return = s.return), (R = S));
                break e;
              }
              R = s.return;
            }
        }
        if (
          ((A = i), Lt(), Qe && typeof Qe.onPostCommitFiberRoot == "function")
        )
          try {
            Qe.onPostCommitFiberRoot(bi, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((B = n), (je.transition = t));
    }
  }
  return !1;
}
function ou(e, t, n) {
  ((t = wn(n, t)),
    (t = df(e, t, 1)),
    (e = St(e, t, 1)),
    (t = ce()),
    e !== null && (Sr(e, 1, t), ge(e, t)));
}
function Q(e, t, n) {
  if (e.tag === 3) ou(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ou(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Et === null || !Et.has(r)))
        ) {
          ((e = wn(n, e)),
            (e = pf(t, e, 1)),
            (t = St(t, e, 1)),
            (e = ce()),
            t !== null && (Sr(t, 1, e), ge(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Mh(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    te === e &&
      (re & n) === n &&
      (X === 4 || (X === 3 && (re & 130023424) === re && 500 > K() - Is)
        ? $t(e, 0)
        : (Os |= n)),
    ge(e, t));
}
function If(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = zr), (zr <<= 1), !(zr & 130023424) && (zr = 4194304))
      : (t = 1));
  var n = ce();
  ((e = ot(e, t)), e !== null && (Sr(e, t, n), ge(e, n)));
}
function $h(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), If(e, n));
}
function Uh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(_(314));
  }
  (r !== null && r.delete(t), If(e, n));
}
var Df;
Df = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || me.current) he = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((he = !1), Ph(e, t, n));
      he = !!(e.flags & 131072);
    }
  else ((he = !1), U && t.flags & 1048576 && Bc(t, Ri, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (oi(e, t), (e = t.pendingProps));
      var i = yn(t, ae.current);
      (pn(t, n), (i = Ns(null, t, r, e, i, n)));
      var o = Rs();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ye(r) ? ((o = !0), Ci(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            ks(t),
            (i.updater = qi),
            (t.stateNode = i),
            (i._reactInternals = t),
            Cl(t, r, e, n),
            (t = Pl(null, t, r, !0, o, n)))
          : ((t.tag = 0), U && o && hs(t), ue(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (oi(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Hh(r)),
          (e = De(r, e)),
          i)
        ) {
          case 0:
            t = Rl(null, t, r, e, n);
            break e;
          case 1:
            t = qa(null, t, r, e, n);
            break e;
          case 11:
            t = Ga(null, t, r, e, n);
            break e;
          case 14:
            t = Ka(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(_(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : De(r, i)),
        Rl(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : De(r, i)),
        qa(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((gf(t), e === null)) throw Error(_(387));
        ((r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Hc(e, t),
          ji(t, r, null, n));
        var l = t.memoizedState;
        if (((r = l.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((i = wn(Error(_(423)), t)), (t = Ya(e, t, r, n, i)));
            break e;
          } else if (r !== i) {
            ((i = wn(Error(_(424)), t)), (t = Ya(e, t, r, n, i)));
            break e;
          } else
            for (
              we = kt(t.stateNode.containerInfo.firstChild),
                ke = t,
                U = !0,
                Be = null,
                n = Uc(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((gn(), r === i)) {
            t = lt(e, t, n);
            break e;
          }
          ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Vc(t),
        e === null && Sl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (l = i.children),
        gl(r, i) ? (l = null) : o !== null && gl(r, o) && (t.flags |= 32),
        yf(e, t),
        ue(e, t, l, n),
        t.child
      );
    case 6:
      return (e === null && Sl(t), null);
    case 13:
      return vf(e, t, n);
    case 4:
      return (
        Ss(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = vn(t, null, r, n)) : ue(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : De(r, i)),
        Ga(e, t, r, i, n)
      );
    case 7:
      return (ue(e, t, t.pendingProps, n), t.child);
    case 8:
      return (ue(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (ue(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (l = i.value),
          F(Pi, r._currentValue),
          (r._currentValue = l),
          o !== null)
        )
          if ($e(o.value, l)) {
            if (o.children === i.children && !me.current) {
              t = lt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                l = o.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      ((a = nt(-1, n & -n)), (a.tag = 2));
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var f = u.pending;
                        (f === null
                          ? (a.next = a)
                          : ((a.next = f.next), (f.next = a)),
                          (u.pending = a));
                      }
                    }
                    ((o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      El(o.return, n, t),
                      (s.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((l = o.return), l === null)) throw Error(_(341));
                ((l.lanes |= n),
                  (s = l.alternate),
                  s !== null && (s.lanes |= n),
                  El(l, n, t),
                  (l = o.sibling));
              } else l = o.child;
              if (l !== null) l.return = o;
              else
                for (l = o; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((o = l.sibling), o !== null)) {
                    ((o.return = l.return), (l = o));
                    break;
                  }
                  l = l.return;
                }
              o = l;
            }
        (ue(e, t, i.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        pn(t, n),
        (i = Le(i)),
        (r = r(i)),
        (t.flags |= 1),
        ue(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = De(r, t.pendingProps)),
        (i = De(r.type, i)),
        Ka(e, t, r, i, n)
      );
    case 15:
      return hf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : De(r, i)),
        oi(e, t),
        (t.tag = 1),
        ye(r) ? ((e = !0), Ci(t)) : (e = !1),
        pn(t, n),
        ff(t, r, i),
        Cl(t, r, i, n),
        Pl(null, t, r, !0, e, n)
      );
    case 19:
      return xf(e, t, n);
    case 22:
      return mf(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function Af(e, t) {
  return sc(e, t);
}
function bh(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Te(e, t, n, r) {
  return new bh(e, t, n, r);
}
function Bs(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Hh(e) {
  if (typeof e == "function") return Bs(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ns)) return 11;
    if (e === rs) return 14;
  }
  return 2;
}
function Ct(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Te(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ai(e, t, n, r, i, o) {
  var l = 2;
  if (((r = e), typeof e == "function")) Bs(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case Jt:
        return Ut(n.children, i, o, t);
      case ts:
        ((l = 8), (i |= 8));
        break;
      case qo:
        return (
          (e = Te(12, n, t, i | 2)),
          (e.elementType = qo),
          (e.lanes = o),
          e
        );
      case Yo:
        return ((e = Te(13, n, t, i)), (e.elementType = Yo), (e.lanes = o), e);
      case Jo:
        return ((e = Te(19, n, t, i)), (e.elementType = Jo), (e.lanes = o), e);
      case Vu:
        return Xi(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case bu:
              l = 10;
              break e;
            case Hu:
              l = 9;
              break e;
            case ns:
              l = 11;
              break e;
            case rs:
              l = 14;
              break e;
            case dt:
              ((l = 16), (r = null));
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Te(l, n, t, i)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = o),
    t
  );
}
function Ut(e, t, n, r) {
  return ((e = Te(7, e, r, t)), (e.lanes = n), e);
}
function Xi(e, t, n, r) {
  return (
    (e = Te(22, e, r, t)),
    (e.elementType = Vu),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Bo(e, t, n) {
  return ((e = Te(6, e, null, t)), (e.lanes = n), e);
}
function Fo(e, t, n) {
  return (
    (t = Te(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Vh(e, t, n, r, i) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = vo(0)),
    (this.expirationTimes = vo(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = vo(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null));
}
function Fs(e, t, n, r, i, o, l, s, a) {
  return (
    (e = new Vh(e, t, n, s, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Te(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ks(o),
    e
  );
}
function Wh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Yt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function zf(e) {
  if (!e) return Pt;
  e = e._reactInternals;
  e: {
    if (Kt(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ye(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ye(n)) return Ac(e, n, t);
  }
  return t;
}
function Bf(e, t, n, r, i, o, l, s, a) {
  return (
    (e = Fs(n, r, !0, e, i, o, l, s, a)),
    (e.context = zf(null)),
    (n = e.current),
    (r = ce()),
    (i = _t(n)),
    (o = nt(r, i)),
    (o.callback = t ?? null),
    St(n, o, i),
    (e.current.lanes = i),
    Sr(e, i, r),
    ge(e, r),
    e
  );
}
function Zi(e, t, n, r) {
  var i = t.current,
    o = ce(),
    l = _t(i);
  return (
    (n = zf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = nt(o, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = St(i, t, l)),
    e !== null && (Me(e, i, l, o), ni(e, i, l)),
    l
  );
}
function Fi(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function lu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ms(e, t) {
  (lu(e, t), (e = e.alternate) && lu(e, t));
}
function Qh() {
  return null;
}
var Ff =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function $s(e) {
  this._internalRoot = e;
}
eo.prototype.render = $s.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  Zi(e, t, null, null);
};
eo.prototype.unmount = $s.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Qt(function () {
      Zi(null, e, null, null);
    }),
      (t[it] = null));
  }
};
function eo(e) {
  this._internalRoot = e;
}
eo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = hc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ht.length && t !== 0 && t < ht[n].priority; n++);
    (ht.splice(n, 0, e), n === 0 && yc(e));
  }
};
function Us(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function to(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function su() {}
function Gh(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = Fi(l);
        o.call(u);
      };
    }
    var l = Bf(t, r, e, 0, null, !1, !1, "", su);
    return (
      (e._reactRootContainer = l),
      (e[it] = l.current),
      fr(e.nodeType === 8 ? e.parentNode : e),
      Qt(),
      l
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = Fi(a);
      s.call(u);
    };
  }
  var a = Fs(e, 0, !1, null, null, !1, !1, "", su);
  return (
    (e._reactRootContainer = a),
    (e[it] = a.current),
    fr(e.nodeType === 8 ? e.parentNode : e),
    Qt(function () {
      Zi(t, a, n, r);
    }),
    a
  );
}
function no(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var a = Fi(l);
        s.call(a);
      };
    }
    Zi(t, l, e, i);
  } else l = Gh(n, t, e, i, r);
  return Fi(l);
}
dc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Vn(t.pendingLanes);
        n !== 0 &&
          (ls(t, n | 1), ge(t, K()), !(A & 6) && ((kn = K() + 500), Lt()));
      }
      break;
    case 13:
      (Qt(function () {
        var r = ot(e, 1);
        if (r !== null) {
          var i = ce();
          Me(r, e, 1, i);
        }
      }),
        Ms(e, 1));
  }
};
ss = function (e) {
  if (e.tag === 13) {
    var t = ot(e, 134217728);
    if (t !== null) {
      var n = ce();
      Me(t, e, 134217728, n);
    }
    Ms(e, 134217728);
  }
};
pc = function (e) {
  if (e.tag === 13) {
    var t = _t(e),
      n = ot(e, t);
    if (n !== null) {
      var r = ce();
      Me(n, e, t, r);
    }
    Ms(e, t);
  }
};
hc = function () {
  return B;
};
mc = function (e, t) {
  var n = B;
  try {
    return ((B = e), t());
  } finally {
    B = n;
  }
};
sl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((el(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Qi(r);
            if (!i) throw Error(_(90));
            (Qu(r), el(r, i));
          }
        }
      }
      break;
    case "textarea":
      Ku(e, n);
      break;
    case "select":
      ((t = n.value), t != null && un(e, !!n.multiple, t, !1));
  }
};
tc = Ds;
nc = Qt;
var Kh = { usingClientEntryPoint: !1, Events: [_r, tn, Qi, Zu, ec, Ds] },
  Mn = {
    findFiberByHostInstance: Bt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  qh = {
    bundleType: Mn.bundleType,
    version: Mn.version,
    rendererPackageName: Mn.rendererPackageName,
    rendererConfig: Mn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: at.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = oc(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Mn.findFiberByHostInstance || Qh,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Gr.isDisabled && Gr.supportsFiber)
    try {
      ((bi = Gr.inject(qh)), (Qe = Gr));
    } catch {}
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kh;
Ee.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Us(t)) throw Error(_(200));
  return Wh(e, t, null, n);
};
Ee.createRoot = function (e, t) {
  if (!Us(e)) throw Error(_(299));
  var n = !1,
    r = "",
    i = Ff;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Fs(e, 1, !1, null, null, n, !1, r, i)),
    (e[it] = t.current),
    fr(e.nodeType === 8 ? e.parentNode : e),
    new $s(t)
  );
};
Ee.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(_(188))
      : ((e = Object.keys(e).join(",")), Error(_(268, e)));
  return ((e = oc(t)), (e = e === null ? null : e.stateNode), e);
};
Ee.flushSync = function (e) {
  return Qt(e);
};
Ee.hydrate = function (e, t, n) {
  if (!to(t)) throw Error(_(200));
  return no(null, e, t, !0, n);
};
Ee.hydrateRoot = function (e, t, n) {
  if (!Us(e)) throw Error(_(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    l = Ff;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = Bf(t, null, e, 1, n ?? null, i, !1, o, l)),
    (e[it] = t.current),
    fr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i));
  return new eo(t);
};
Ee.render = function (e, t, n) {
  if (!to(t)) throw Error(_(200));
  return no(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function (e) {
  if (!to(e)) throw Error(_(40));
  return e._reactRootContainer
    ? (Qt(function () {
        no(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[it] = null));
        });
      }),
      !0)
    : !1;
};
Ee.unstable_batchedUpdates = Ds;
Ee.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!to(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return no(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function Mf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mf);
    } catch (e) {
      console.error(e);
    }
}
(Mf(), (Fu.exports = Ee));
var Yh = Fu.exports,
  au = Yh;
((Go.createRoot = au.createRoot), (Go.hydrateRoot = au.hydrateRoot));
/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var uu = "popstate";
function cu(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "pathname" in e &&
    "search" in e &&
    "hash" in e &&
    "state" in e &&
    "key" in e
  );
}
function Jh(e = {}) {
  function t(r, i) {
    var u;
    let o = (u = i.state) == null ? void 0 : u.masked,
      { pathname: l, search: s, hash: a } = o || r.location;
    return $l(
      "",
      { pathname: l, search: s, hash: a },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
      o
        ? {
            pathname: r.location.pathname,
            search: r.location.search,
            hash: r.location.hash,
          }
        : void 0,
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : wr(i);
  }
  return Zh(t, n, null, e);
}
function b(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Ue(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Xh() {
  return Math.random().toString(36).substring(2, 10);
}
function fu(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.unstable_mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function $l(e, t, n = null, r, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? Rn(t) : t),
    state: n,
    key: (t && t.key) || r || Xh(),
    unstable_mask: i,
  };
}
function wr({ pathname: e = "/", search: t = "", hash: n = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n),
    e
  );
}
function Rn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf("?");
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function Zh(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    l = i.history,
    s = "POP",
    a = null,
    u = f();
  u == null && ((u = 0), l.replaceState({ ...l.state, idx: u }, ""));
  function f() {
    return (l.state || { idx: null }).idx;
  }
  function d() {
    s = "POP";
    let E = f(),
      h = E == null ? null : E - u;
    ((u = E), a && a({ action: s, location: x.location, delta: h }));
  }
  function m(E, h) {
    s = "PUSH";
    let p = cu(E) ? E : $l(x.location, E, h);
    u = f() + 1;
    let y = fu(p, u),
      S = x.createHref(p.unstable_mask || p);
    try {
      l.pushState(y, "", S);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      i.location.assign(S);
    }
    o && a && a({ action: s, location: x.location, delta: 1 });
  }
  function g(E, h) {
    s = "REPLACE";
    let p = cu(E) ? E : $l(x.location, E, h);
    u = f();
    let y = fu(p, u),
      S = x.createHref(p.unstable_mask || p);
    (l.replaceState(y, "", S),
      o && a && a({ action: s, location: x.location, delta: 0 }));
  }
  function v(E) {
    return em(E);
  }
  let x = {
    get action() {
      return s;
    },
    get location() {
      return e(i, l);
    },
    listen(E) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(uu, d),
        (a = E),
        () => {
          (i.removeEventListener(uu, d), (a = null));
        }
      );
    },
    createHref(E) {
      return t(i, E);
    },
    createURL: v,
    encodeLocation(E) {
      let h = v(E);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: m,
    replace: g,
    go(E) {
      return l.go(E);
    },
  };
  return x;
}
function em(e, t = !1) {
  let n = "http://localhost";
  (typeof window < "u" &&
    (n =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    b(n, "No window.location.(origin|href) available to create URL"));
  let r = typeof e == "string" ? e : wr(e);
  return (
    (r = r.replace(/ $/, "%20")),
    !t && r.startsWith("//") && (r = n + r),
    new URL(r, n)
  );
}
function $f(e, t, n = "/") {
  return tm(e, t, n, !1);
}
function tm(e, t, n, r) {
  let i = typeof t == "string" ? Rn(t) : t,
    o = st(i.pathname || "/", n);
  if (o == null) return null;
  let l = Uf(e);
  nm(l);
  let s = null;
  for (let a = 0; s == null && a < l.length; ++a) {
    let u = pm(o);
    s = fm(l[a], u, r);
  }
  return s;
}
function Uf(e, t = [], n = [], r = "", i = !1) {
  let o = (l, s, a = i, u) => {
    let f = {
      relativePath: u === void 0 ? l.path || "" : u,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: s,
      route: l,
    };
    if (f.relativePath.startsWith("/")) {
      if (!f.relativePath.startsWith(r) && a) return;
      (b(
        f.relativePath.startsWith(r),
        `Absolute route path "${f.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (f.relativePath = f.relativePath.slice(r.length)));
    }
    let d = Ke([r, f.relativePath]),
      m = n.concat(f);
    (l.children &&
      l.children.length > 0 &&
      (b(
        l.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${d}".`,
      ),
      Uf(l.children, t, m, d, a)),
      !(l.path == null && !l.index) &&
        t.push({ path: d, score: um(d, l.index), routesMeta: m }));
  };
  return (
    e.forEach((l, s) => {
      var a;
      if (l.path === "" || !((a = l.path) != null && a.includes("?"))) o(l, s);
      else for (let u of bf(l.path)) o(l, s, !0, u);
    }),
    t
  );
}
function bf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let l = bf(r.join("/")),
    s = [];
  return (
    s.push(...l.map((a) => (a === "" ? o : [o, a].join("/")))),
    i && s.push(...l),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function nm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : cm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var rm = /^:[\w-]+$/,
  im = 3,
  om = 2,
  lm = 1,
  sm = 10,
  am = -2,
  du = (e) => e === "*";
function um(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(du) && (r += am),
    t && (r += om),
    n
      .filter((i) => !du(i))
      .reduce((i, o) => i + (rm.test(o) ? im : o === "" ? lm : sm), r)
  );
}
function cm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function fm(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    o = "/",
    l = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s],
      u = s === r.length - 1,
      f = o === "/" ? t : t.slice(o.length) || "/",
      d = Mi(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        f,
      ),
      m = a.route;
    if (
      (!d &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (d = Mi(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          f,
        )),
      !d)
    )
      return null;
    (Object.assign(i, d.params),
      l.push({
        params: i,
        pathname: Ke([o, d.pathname]),
        pathnameBase: gm(Ke([o, d.pathnameBase])),
        route: m,
      }),
      d.pathnameBase !== "/" && (o = Ke([o, d.pathnameBase])));
  }
  return l;
}
function Mi(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = dm(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    l = o.replace(/(.)\/+$/, "$1"),
    s = i.slice(1);
  return {
    params: r.reduce((u, { paramName: f, isOptional: d }, m) => {
      if (f === "*") {
        let v = s[m] || "";
        l = o.slice(0, o.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const g = s[m];
      return (
        d && !g ? (u[f] = void 0) : (u[f] = (g || "").replace(/%2F/g, "/")),
        u
      );
    }, {}),
    pathname: o,
    pathnameBase: l,
    pattern: e,
  };
}
function dm(e, t = !1, n = !0) {
  Ue(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (l, s, a, u, f) => {
          if ((r.push({ paramName: s, isOptional: a != null }), a)) {
            let d = f.charAt(u + l.length);
            return d && d !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function pm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Ue(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function st(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
var hm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function mm(e, t = "/") {
  let {
      pathname: n,
      search: r = "",
      hash: i = "",
    } = typeof e == "string" ? Rn(e) : e,
    o;
  return (
    n
      ? ((n = n.replace(/\/\/+/g, "/")),
        n.startsWith("/") ? (o = pu(n.substring(1), "/")) : (o = pu(n, t)))
      : (o = t),
    { pathname: o, search: vm(r), hash: xm(i) }
  );
}
function pu(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Mo(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function ym(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function bs(e) {
  let t = ym(e);
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase));
}
function ro(e, t, n, r = !1) {
  let i;
  typeof e == "string"
    ? (i = Rn(e))
    : ((i = { ...e }),
      b(
        !i.pathname || !i.pathname.includes("?"),
        Mo("?", "pathname", "search", i),
      ),
      b(
        !i.pathname || !i.pathname.includes("#"),
        Mo("#", "pathname", "hash", i),
      ),
      b(!i.search || !i.search.includes("#"), Mo("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    l = o ? "/" : i.pathname,
    s;
  if (l == null) s = n;
  else {
    let d = t.length - 1;
    if (!r && l.startsWith("..")) {
      let m = l.split("/");
      for (; m[0] === ".."; ) (m.shift(), (d -= 1));
      i.pathname = m.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let a = mm(i, s),
    u = l && l !== "/" && l.endsWith("/"),
    f = (o || l === ".") && n.endsWith("/");
  return (!a.pathname.endsWith("/") && (u || f) && (a.pathname += "/"), a);
}
var Ke = (e) => e.join("/").replace(/\/\/+/g, "/"),
  gm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  vm = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  xm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  wm = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ""),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n));
    }
  };
function km(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Sm(e) {
  return (
    e
      .map((t) => t.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var Hf =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Vf(e, t) {
  let n = e;
  if (typeof n != "string" || !hm.test(n))
    return { absoluteURL: void 0, isExternal: !1, to: n };
  let r = n,
    i = !1;
  if (Hf)
    try {
      let o = new URL(window.location.href),
        l = n.startsWith("//") ? new URL(o.protocol + n) : new URL(n),
        s = st(l.pathname, t);
      l.origin === o.origin && s != null
        ? (n = s + l.search + l.hash)
        : (i = !0);
    } catch {
      Ue(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: r, isExternal: i, to: n };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Wf = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Wf);
var Em = ["GET", ...Wf];
new Set(Em);
var Pn = w.createContext(null);
Pn.displayName = "DataRouter";
var io = w.createContext(null);
io.displayName = "DataRouterState";
var _m = w.createContext(!1),
  Qf = w.createContext({ isTransitioning: !1 });
Qf.displayName = "ViewTransition";
var Cm = w.createContext(new Map());
Cm.displayName = "Fetchers";
var Nm = w.createContext(null);
Nm.displayName = "Await";
var Ce = w.createContext(null);
Ce.displayName = "Navigation";
var Nr = w.createContext(null);
Nr.displayName = "Location";
var Je = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Je.displayName = "Route";
var Hs = w.createContext(null);
Hs.displayName = "RouteError";
var Gf = "REACT_ROUTER_ERROR",
  Rm = "REDIRECT",
  Pm = "ROUTE_ERROR_RESPONSE";
function Tm(e) {
  if (e.startsWith(`${Gf}:${Rm}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string" &&
        typeof t.location == "string" &&
        typeof t.reloadDocument == "boolean" &&
        typeof t.replace == "boolean"
      )
        return t;
    } catch {}
}
function jm(e) {
  if (e.startsWith(`${Gf}:${Pm}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string"
      )
        return new wm(t.status, t.statusText, t.data);
    } catch {}
}
function Lm(e, { relative: t } = {}) {
  b(Tn(), "useHref() may be used only in the context of a <Router> component.");
  let { basename: n, navigator: r } = w.useContext(Ce),
    { hash: i, pathname: o, search: l } = Rr(e, { relative: t }),
    s = o;
  return (
    n !== "/" && (s = o === "/" ? n : Ke([n, o])),
    r.createHref({ pathname: s, search: l, hash: i })
  );
}
function Tn() {
  return w.useContext(Nr) != null;
}
function ut() {
  return (
    b(
      Tn(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    w.useContext(Nr).location
  );
}
var Kf =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function qf(e) {
  w.useContext(Ce).static || w.useLayoutEffect(e);
}
function Vs() {
  let { isDataRoute: e } = w.useContext(Je);
  return e ? Vm() : Om();
}
function Om() {
  b(
    Tn(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = w.useContext(Pn),
    { basename: t, navigator: n } = w.useContext(Ce),
    { matches: r } = w.useContext(Je),
    { pathname: i } = ut(),
    o = JSON.stringify(bs(r)),
    l = w.useRef(!1);
  return (
    qf(() => {
      l.current = !0;
    }),
    w.useCallback(
      (a, u = {}) => {
        if ((Ue(l.current, Kf), !l.current)) return;
        if (typeof a == "number") {
          n.go(a);
          return;
        }
        let f = ro(a, JSON.parse(o), i, u.relative === "path");
        (e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : Ke([t, f.pathname])),
          (u.replace ? n.replace : n.push)(f, u.state, u));
      },
      [t, n, o, i, e],
    )
  );
}
w.createContext(null);
function Rr(e, { relative: t } = {}) {
  let { matches: n } = w.useContext(Je),
    { pathname: r } = ut(),
    i = JSON.stringify(bs(n));
  return w.useMemo(() => ro(e, JSON.parse(i), r, t === "path"), [e, i, r, t]);
}
function Im(e, t) {
  return Yf(e, t);
}
function Yf(e, t, n) {
  var E;
  b(
    Tn(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: r } = w.useContext(Ce),
    { matches: i } = w.useContext(Je),
    o = i[i.length - 1],
    l = o ? o.params : {},
    s = o ? o.pathname : "/",
    a = o ? o.pathnameBase : "/",
    u = o && o.route;
  {
    let h = (u && u.path) || "";
    Xf(
      s,
      !u || h.endsWith("*") || h.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${h}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${h}"> to <Route path="${h === "/" ? "*" : `${h}/*`}">.`,
    );
  }
  let f = ut(),
    d;
  if (t) {
    let h = typeof t == "string" ? Rn(t) : t;
    (b(
      a === "/" || ((E = h.pathname) == null ? void 0 : E.startsWith(a)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${a}" but pathname "${h.pathname}" was given in the \`location\` prop.`,
    ),
      (d = h));
  } else d = f;
  let m = d.pathname || "/",
    g = m;
  if (a !== "/") {
    let h = a.replace(/^\//, "").split("/");
    g = "/" + m.replace(/^\//, "").split("/").slice(h.length).join("/");
  }
  let v = $f(e, { pathname: g });
  (Ue(
    u || v != null,
    `No routes matched location "${d.pathname}${d.search}${d.hash}" `,
  ),
    Ue(
      v == null ||
        v[v.length - 1].route.element !== void 0 ||
        v[v.length - 1].route.Component !== void 0 ||
        v[v.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let x = Fm(
    v &&
      v.map((h) =>
        Object.assign({}, h, {
          params: Object.assign({}, l, h.params),
          pathname: Ke([
            a,
            r.encodeLocation
              ? r.encodeLocation(
                  h.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                ).pathname
              : h.pathname,
          ]),
          pathnameBase:
            h.pathnameBase === "/"
              ? a
              : Ke([
                  a,
                  r.encodeLocation
                    ? r.encodeLocation(
                        h.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : h.pathnameBase,
                ]),
        }),
      ),
    i,
    n,
  );
  return t && x
    ? w.createElement(
        Nr.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              unstable_mask: void 0,
              ...d,
            },
            navigationType: "POP",
          },
        },
        x,
      )
    : x;
}
function Dm() {
  let e = Hm(),
    t = km(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = "rgba(200,200,200, 0.5)",
    i = { padding: "0.5rem", backgroundColor: r },
    o = { padding: "2px 4px", backgroundColor: r },
    l = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (l = w.createElement(
      w.Fragment,
      null,
      w.createElement("p", null, "💿 Hey developer 👋"),
      w.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        w.createElement("code", { style: o }, "ErrorBoundary"),
        " or",
        " ",
        w.createElement("code", { style: o }, "errorElement"),
        " prop on your route.",
      ),
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement("h2", null, "Unexpected Application Error!"),
      w.createElement("h3", { style: { fontStyle: "italic" } }, t),
      n ? w.createElement("pre", { style: i }, n) : null,
      l,
    )
  );
}
var Am = w.createElement(Dm, null),
  Jf = class extends w.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const n = jm(e.digest);
        n && (e = n);
      }
      let t =
        e !== void 0
          ? w.createElement(
              Je.Provider,
              { value: this.props.routeContext },
              w.createElement(Hs.Provider, {
                value: e,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? w.createElement(zm, { error: e }, t) : t;
    }
  };
Jf.contextType = _m;
var $o = new WeakMap();
function zm({ children: e, error: t }) {
  let { basename: n } = w.useContext(Ce);
  if (
    typeof t == "object" &&
    t &&
    "digest" in t &&
    typeof t.digest == "string"
  ) {
    let r = Tm(t.digest);
    if (r) {
      let i = $o.get(t);
      if (i) throw i;
      let o = Vf(r.location, n);
      if (Hf && !$o.get(t))
        if (o.isExternal || r.reloadDocument)
          window.location.href = o.absoluteURL || o.to;
        else {
          const l = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(o.to, {
              replace: r.replace,
            }),
          );
          throw ($o.set(t, l), l);
        }
      return w.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${o.absoluteURL || o.to}`,
      });
    }
  }
  return e;
}
function Bm({ routeContext: e, match: t, children: n }) {
  let r = w.useContext(Pn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    w.createElement(Je.Provider, { value: e }, n)
  );
}
function Fm(e, t = [], n) {
  let r = n == null ? void 0 : n.state;
  if (e == null) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else return null;
  }
  let i = e,
    o = r == null ? void 0 : r.errors;
  if (o != null) {
    let f = i.findIndex(
      (d) => d.route.id && (o == null ? void 0 : o[d.route.id]) !== void 0,
    );
    (b(
      f >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`,
    ),
      (i = i.slice(0, Math.min(i.length, f + 1))));
  }
  let l = !1,
    s = -1;
  if (n && r) {
    l = r.renderFallback;
    for (let f = 0; f < i.length; f++) {
      let d = i[f];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (s = f),
        d.route.id)
      ) {
        let { loaderData: m, errors: g } = r,
          v =
            d.route.loader &&
            !m.hasOwnProperty(d.route.id) &&
            (!g || g[d.route.id] === void 0);
        if (d.route.lazy || v) {
          (n.isStatic && (l = !0),
            s >= 0 ? (i = i.slice(0, s + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  }
  let a = n == null ? void 0 : n.onError,
    u =
      r && a
        ? (f, d) => {
            var m, g;
            a(f, {
              location: r.location,
              params:
                ((g = (m = r.matches) == null ? void 0 : m[0]) == null
                  ? void 0
                  : g.params) ?? {},
              unstable_pattern: Sm(r.matches),
              errorInfo: d,
            });
          }
        : void 0;
  return i.reduceRight((f, d, m) => {
    let g,
      v = !1,
      x = null,
      E = null;
    r &&
      ((g = o && d.route.id ? o[d.route.id] : void 0),
      (x = d.route.errorElement || Am),
      l &&
        (s < 0 && m === 0
          ? (Xf(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (v = !0),
            (E = null))
          : s === m &&
            ((v = !0), (E = d.route.hydrateFallbackElement || null))));
    let h = t.concat(i.slice(0, m + 1)),
      p = () => {
        let y;
        return (
          g
            ? (y = x)
            : v
              ? (y = E)
              : d.route.Component
                ? (y = w.createElement(d.route.Component, null))
                : d.route.element
                  ? (y = d.route.element)
                  : (y = f),
          w.createElement(Bm, {
            match: d,
            routeContext: { outlet: f, matches: h, isDataRoute: r != null },
            children: y,
          })
        );
      };
    return r && (d.route.ErrorBoundary || d.route.errorElement || m === 0)
      ? w.createElement(Jf, {
          location: r.location,
          revalidation: r.revalidation,
          component: x,
          error: g,
          children: p(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
          onError: u,
        })
      : p();
  }, null);
}
function Ws(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Mm(e) {
  let t = w.useContext(Pn);
  return (b(t, Ws(e)), t);
}
function $m(e) {
  let t = w.useContext(io);
  return (b(t, Ws(e)), t);
}
function Um(e) {
  let t = w.useContext(Je);
  return (b(t, Ws(e)), t);
}
function Qs(e) {
  let t = Um(e),
    n = t.matches[t.matches.length - 1];
  return (
    b(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function bm() {
  return Qs("useRouteId");
}
function Hm() {
  var r;
  let e = w.useContext(Hs),
    t = $m("useRouteError"),
    n = Qs("useRouteError");
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n];
}
function Vm() {
  let { router: e } = Mm("useNavigate"),
    t = Qs("useNavigate"),
    n = w.useRef(!1);
  return (
    qf(() => {
      n.current = !0;
    }),
    w.useCallback(
      async (i, o = {}) => {
        (Ue(n.current, Kf),
          n.current &&
            (typeof i == "number"
              ? await e.navigate(i)
              : await e.navigate(i, { fromRouteId: t, ...o })));
      },
      [e, t],
    )
  );
}
var hu = {};
function Xf(e, t, n) {
  !t && !hu[e] && ((hu[e] = !0), Ue(!1, n));
}
w.memo(Wm);
function Wm({ routes: e, future: t, state: n, isStatic: r, onError: i }) {
  return Yf(e, void 0, { state: n, isStatic: r, onError: i });
}
function Qm({ to: e, replace: t, state: n, relative: r }) {
  b(
    Tn(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: i } = w.useContext(Ce);
  Ue(
    !i,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: o } = w.useContext(Je),
    { pathname: l } = ut(),
    s = Vs(),
    a = ro(e, bs(o), l, r === "path"),
    u = JSON.stringify(a);
  return (
    w.useEffect(() => {
      s(JSON.parse(u), { replace: t, state: n, relative: r });
    }, [s, u, r, t, n]),
    null
  );
}
function Qn(e) {
  b(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Gm({
  basename: e = "/",
  children: t = null,
  location: n,
  navigationType: r = "POP",
  navigator: i,
  static: o = !1,
  unstable_useTransitions: l,
}) {
  b(
    !Tn(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let s = e.replace(/^\/*/, "/"),
    a = w.useMemo(
      () => ({
        basename: s,
        navigator: i,
        static: o,
        unstable_useTransitions: l,
        future: {},
      }),
      [s, i, o, l],
    );
  typeof n == "string" && (n = Rn(n));
  let {
      pathname: u = "/",
      search: f = "",
      hash: d = "",
      state: m = null,
      key: g = "default",
      unstable_mask: v,
    } = n,
    x = w.useMemo(() => {
      let E = st(u, s);
      return E == null
        ? null
        : {
            location: {
              pathname: E,
              search: f,
              hash: d,
              state: m,
              key: g,
              unstable_mask: v,
            },
            navigationType: r,
          };
    }, [s, u, f, d, m, g, r, v]);
  return (
    Ue(
      x != null,
      `<Router basename="${s}"> is not able to match the URL "${u}${f}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    x == null
      ? null
      : w.createElement(
          Ce.Provider,
          { value: a },
          w.createElement(Nr.Provider, { children: t, value: x }),
        )
  );
}
function Km({ children: e, location: t }) {
  return Im(Ul(e), t);
}
function Ul(e, t = []) {
  let n = [];
  return (
    w.Children.forEach(e, (r, i) => {
      if (!w.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === w.Fragment) {
        n.push.apply(n, Ul(r.props.children, o));
        return;
      }
      (b(
        r.type === Qn,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        b(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        ));
      let l = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        middleware: r.props.middleware,
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
      (r.props.children && (l.children = Ul(r.props.children, o)), n.push(l));
    }),
    n
  );
}
var ui = "get",
  ci = "application/x-www-form-urlencoded";
function oo(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function qm(e) {
  return oo(e) && e.tagName.toLowerCase() === "button";
}
function Ym(e) {
  return oo(e) && e.tagName.toLowerCase() === "form";
}
function Jm(e) {
  return oo(e) && e.tagName.toLowerCase() === "input";
}
function Xm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Zm(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Xm(e);
}
var Kr = null;
function ey() {
  if (Kr === null)
    try {
      (new FormData(document.createElement("form"), 0), (Kr = !1));
    } catch {
      Kr = !0;
    }
  return Kr;
}
var ty = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Uo(e) {
  return e != null && !ty.has(e)
    ? (Ue(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ci}"`,
      ),
      null)
    : e;
}
function ny(e, t) {
  let n, r, i, o, l;
  if (Ym(e)) {
    let s = e.getAttribute("action");
    ((r = s ? st(s, t) : null),
      (n = e.getAttribute("method") || ui),
      (i = Uo(e.getAttribute("enctype")) || ci),
      (o = new FormData(e)));
  } else if (qm(e) || (Jm(e) && (e.type === "submit" || e.type === "image"))) {
    let s = e.form;
    if (s == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let a = e.getAttribute("formaction") || s.getAttribute("action");
    if (
      ((r = a ? st(a, t) : null),
      (n = e.getAttribute("formmethod") || s.getAttribute("method") || ui),
      (i =
        Uo(e.getAttribute("formenctype")) ||
        Uo(s.getAttribute("enctype")) ||
        ci),
      (o = new FormData(s, e)),
      !ey())
    ) {
      let { name: u, type: f, value: d } = e;
      if (f === "image") {
        let m = u ? `${u}.` : "";
        (o.append(`${m}x`, "0"), o.append(`${m}y`, "0"));
      } else u && o.append(u, d);
    }
  } else {
    if (oo(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((n = ui), (r = null), (i = ci), (l = e));
  }
  return (
    o && i === "text/plain" && ((l = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: o, body: l }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Gs(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function ry(e, t, n, r) {
  let i =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    n
      ? i.pathname.endsWith("/")
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === "/"
        ? (i.pathname = `_root.${r}`)
        : t && st(i.pathname, t) === "/"
          ? (i.pathname = `${t.replace(/\/$/, "")}/_root.${r}`)
          : (i.pathname = `${i.pathname.replace(/\/$/, "")}.${r}`),
    i
  );
}
async function iy(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return ((t[e.id] = n), n);
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function oy(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function ly(e, t, n) {
  let r = await Promise.all(
    e.map(async (i) => {
      let o = t.routes[i.route.id];
      if (o) {
        let l = await iy(o, n);
        return l.links ? l.links() : [];
      }
      return [];
    }),
  );
  return cy(
    r
      .flat(1)
      .filter(oy)
      .filter((i) => i.rel === "stylesheet" || i.rel === "preload")
      .map((i) =>
        i.rel === "stylesheet"
          ? { ...i, rel: "prefetch", as: "style" }
          : { ...i, rel: "prefetch" },
      ),
  );
}
function mu(e, t, n, r, i, o) {
  let l = (a, u) => (n[u] ? a.route.id !== n[u].route.id : !0),
    s = (a, u) => {
      var f;
      return (
        n[u].pathname !== a.pathname ||
        (((f = n[u].route.path) == null ? void 0 : f.endsWith("*")) &&
          n[u].params["*"] !== a.params["*"])
      );
    };
  return o === "assets"
    ? t.filter((a, u) => l(a, u) || s(a, u))
    : o === "data"
      ? t.filter((a, u) => {
          var d;
          let f = r.routes[a.route.id];
          if (!f || !f.hasLoader) return !1;
          if (l(a, u) || s(a, u)) return !0;
          if (a.route.shouldRevalidate) {
            let m = a.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin,
              ),
              currentParams: ((d = n[0]) == null ? void 0 : d.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: a.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof m == "boolean") return m;
          }
          return !0;
        })
      : [];
}
function sy(e, t, { includeHydrateFallback: n } = {}) {
  return ay(
    e
      .map((r) => {
        let i = t.routes[r.route.id];
        if (!i) return [];
        let o = [i.module];
        return (
          i.clientActionModule && (o = o.concat(i.clientActionModule)),
          i.clientLoaderModule && (o = o.concat(i.clientLoaderModule)),
          n &&
            i.hydrateFallbackModule &&
            (o = o.concat(i.hydrateFallbackModule)),
          i.imports && (o = o.concat(i.imports)),
          o
        );
      })
      .flat(1),
  );
}
function ay(e) {
  return [...new Set(e)];
}
function uy(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function cy(e, t) {
  let n = new Set();
  return (
    new Set(t),
    e.reduce((r, i) => {
      let o = JSON.stringify(uy(i));
      return (n.has(o) || (n.add(o), r.push({ key: o, link: i })), r);
    }, [])
  );
}
function Zf() {
  let e = w.useContext(Pn);
  return (
    Gs(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function fy() {
  let e = w.useContext(io);
  return (
    Gs(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Ks = w.createContext(void 0);
Ks.displayName = "FrameworkContext";
function ed() {
  let e = w.useContext(Ks);
  return (
    Gs(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function dy(e, t) {
  let n = w.useContext(Ks),
    [r, i] = w.useState(!1),
    [o, l] = w.useState(!1),
    {
      onFocus: s,
      onBlur: a,
      onMouseEnter: u,
      onMouseLeave: f,
      onTouchStart: d,
    } = t,
    m = w.useRef(null);
  (w.useEffect(() => {
    if ((e === "render" && l(!0), e === "viewport")) {
      let x = (h) => {
          h.forEach((p) => {
            l(p.isIntersecting);
          });
        },
        E = new IntersectionObserver(x, { threshold: 0.5 });
      return (
        m.current && E.observe(m.current),
        () => {
          E.disconnect();
        }
      );
    }
  }, [e]),
    w.useEffect(() => {
      if (r) {
        let x = setTimeout(() => {
          l(!0);
        }, 100);
        return () => {
          clearTimeout(x);
        };
      }
    }, [r]));
  let g = () => {
      i(!0);
    },
    v = () => {
      (i(!1), l(!1));
    };
  return n
    ? e !== "intent"
      ? [o, m, {}]
      : [
          o,
          m,
          {
            onFocus: $n(s, g),
            onBlur: $n(a, v),
            onMouseEnter: $n(u, g),
            onMouseLeave: $n(f, v),
            onTouchStart: $n(d, g),
          },
        ]
    : [!1, m, {}];
}
function $n(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function py({ page: e, ...t }) {
  let { router: n } = Zf(),
    r = w.useMemo(() => $f(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r ? w.createElement(my, { page: e, matches: r, ...t }) : null;
}
function hy(e) {
  let { manifest: t, routeModules: n } = ed(),
    [r, i] = w.useState([]);
  return (
    w.useEffect(() => {
      let o = !1;
      return (
        ly(e, t, n).then((l) => {
          o || i(l);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function my({ page: e, matches: t, ...n }) {
  let r = ut(),
    { future: i, manifest: o, routeModules: l } = ed(),
    { basename: s } = Zf(),
    { loaderData: a, matches: u } = fy(),
    f = w.useMemo(() => mu(e, t, u, o, r, "data"), [e, t, u, o, r]),
    d = w.useMemo(() => mu(e, t, u, o, r, "assets"), [e, t, u, o, r]),
    m = w.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let x = new Set(),
        E = !1;
      if (
        (t.forEach((p) => {
          var S;
          let y = o.routes[p.route.id];
          !y ||
            !y.hasLoader ||
            ((!f.some((N) => N.route.id === p.route.id) &&
              p.route.id in a &&
              (S = l[p.route.id]) != null &&
              S.shouldRevalidate) ||
            y.hasClientLoader
              ? (E = !0)
              : x.add(p.route.id));
        }),
        x.size === 0)
      )
        return [];
      let h = ry(e, s, i.unstable_trailingSlashAwareDataRequests, "data");
      return (
        E &&
          x.size > 0 &&
          h.searchParams.set(
            "_routes",
            t
              .filter((p) => x.has(p.route.id))
              .map((p) => p.route.id)
              .join(","),
          ),
        [h.pathname + h.search]
      );
    }, [s, i.unstable_trailingSlashAwareDataRequests, a, r, o, f, t, e, l]),
    g = w.useMemo(() => sy(d, o), [d, o]),
    v = hy(d);
  return w.createElement(
    w.Fragment,
    null,
    m.map((x) =>
      w.createElement("link", {
        key: x,
        rel: "prefetch",
        as: "fetch",
        href: x,
        ...n,
      }),
    ),
    g.map((x) =>
      w.createElement("link", { key: x, rel: "modulepreload", href: x, ...n }),
    ),
    v.map(({ key: x, link: E }) =>
      w.createElement("link", {
        key: x,
        nonce: n.nonce,
        ...E,
        crossOrigin: E.crossOrigin ?? n.crossOrigin,
      }),
    ),
  );
}
function yy(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var gy =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  gy && (window.__reactRouterVersion = "7.13.1");
} catch {}
function vy({
  basename: e,
  children: t,
  unstable_useTransitions: n,
  window: r,
}) {
  let i = w.useRef();
  i.current == null && (i.current = Jh({ window: r, v5Compat: !0 }));
  let o = i.current,
    [l, s] = w.useState({ action: o.action, location: o.location }),
    a = w.useCallback(
      (u) => {
        n === !1 ? s(u) : w.startTransition(() => s(u));
      },
      [n],
    );
  return (
    w.useLayoutEffect(() => o.listen(a), [o, a]),
    w.createElement(Gm, {
      basename: e,
      children: t,
      location: l.location,
      navigationType: l.action,
      navigator: o,
      unstable_useTransitions: n,
    })
  );
}
var td = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  nd = w.forwardRef(function (
    {
      onClick: t,
      discover: n = "render",
      prefetch: r = "none",
      relative: i,
      reloadDocument: o,
      replace: l,
      unstable_mask: s,
      state: a,
      target: u,
      to: f,
      preventScrollReset: d,
      viewTransition: m,
      unstable_defaultShouldRevalidate: g,
      ...v
    },
    x,
  ) {
    let {
        basename: E,
        navigator: h,
        unstable_useTransitions: p,
      } = w.useContext(Ce),
      y = typeof f == "string" && td.test(f),
      S = Vf(f, E);
    f = S.to;
    let N = Lm(f, { relative: i }),
      k = ut(),
      C = null;
    if (s) {
      let be = ro(s, [], k.unstable_mask ? k.unstable_mask.pathname : "/", !0);
      (E !== "/" &&
        (be.pathname = be.pathname === "/" ? E : Ke([E, be.pathname])),
        (C = h.createHref(be)));
    }
    let [P, z, L] = dy(r, v),
      ve = Sy(f, {
        replace: l,
        unstable_mask: s,
        state: a,
        target: u,
        preventScrollReset: d,
        relative: i,
        viewTransition: m,
        unstable_defaultShouldRevalidate: g,
        unstable_useTransitions: p,
      });
    function Ot(be) {
      (t && t(be), be.defaultPrevented || ve(be));
    }
    let ct = !(S.isExternal || o),
      Ln = w.createElement("a", {
        ...v,
        ...L,
        href: (ct ? C : void 0) || S.absoluteURL || N,
        onClick: ct ? Ot : t,
        ref: yy(x, z),
        target: u,
        "data-discover": !y && n === "render" ? "true" : void 0,
      });
    return P && !y
      ? w.createElement(w.Fragment, null, Ln, w.createElement(py, { page: N }))
      : Ln;
  });
nd.displayName = "Link";
var xy = w.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: i = !1,
    style: o,
    to: l,
    viewTransition: s,
    children: a,
    ...u
  },
  f,
) {
  let d = Rr(l, { relative: u.relative }),
    m = ut(),
    g = w.useContext(io),
    { navigator: v, basename: x } = w.useContext(Ce),
    E = g != null && Ry(d) && s === !0,
    h = v.encodeLocation ? v.encodeLocation(d).pathname : d.pathname,
    p = m.pathname,
    y =
      g && g.navigation && g.navigation.location
        ? g.navigation.location.pathname
        : null;
  (n ||
    ((p = p.toLowerCase()),
    (y = y ? y.toLowerCase() : null),
    (h = h.toLowerCase())),
    y && x && (y = st(y, x) || y));
  const S = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
  let N = p === h || (!i && p.startsWith(h) && p.charAt(S) === "/"),
    k =
      y != null &&
      (y === h || (!i && y.startsWith(h) && y.charAt(h.length) === "/")),
    C = { isActive: N, isPending: k, isTransitioning: E },
    P = N ? t : void 0,
    z;
  typeof r == "function"
    ? (z = r(C))
    : (z = [
        r,
        N ? "active" : null,
        k ? "pending" : null,
        E ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let L = typeof o == "function" ? o(C) : o;
  return w.createElement(
    nd,
    {
      ...u,
      "aria-current": P,
      className: z,
      ref: f,
      style: L,
      to: l,
      viewTransition: s,
    },
    typeof a == "function" ? a(C) : a,
  );
});
xy.displayName = "NavLink";
var wy = w.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: o,
      method: l = ui,
      action: s,
      onSubmit: a,
      relative: u,
      preventScrollReset: f,
      viewTransition: d,
      unstable_defaultShouldRevalidate: m,
      ...g
    },
    v,
  ) => {
    let { unstable_useTransitions: x } = w.useContext(Ce),
      E = Cy(),
      h = Ny(s, { relative: u }),
      p = l.toLowerCase() === "get" ? "get" : "post",
      y = typeof s == "string" && td.test(s),
      S = (N) => {
        if ((a && a(N), N.defaultPrevented)) return;
        N.preventDefault();
        let k = N.nativeEvent.submitter,
          C = (k == null ? void 0 : k.getAttribute("formmethod")) || l,
          P = () =>
            E(k || N.currentTarget, {
              fetcherKey: t,
              method: C,
              navigate: n,
              replace: i,
              state: o,
              relative: u,
              preventScrollReset: f,
              viewTransition: d,
              unstable_defaultShouldRevalidate: m,
            });
        x && n !== !1 ? w.startTransition(() => P()) : P();
      };
    return w.createElement("form", {
      ref: v,
      method: p,
      action: h,
      onSubmit: r ? a : S,
      ...g,
      "data-discover": !y && e === "render" ? "true" : void 0,
    });
  },
);
wy.displayName = "Form";
function ky(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function rd(e) {
  let t = w.useContext(Pn);
  return (b(t, ky(e)), t);
}
function Sy(
  e,
  {
    target: t,
    replace: n,
    unstable_mask: r,
    state: i,
    preventScrollReset: o,
    relative: l,
    viewTransition: s,
    unstable_defaultShouldRevalidate: a,
    unstable_useTransitions: u,
  } = {},
) {
  let f = Vs(),
    d = ut(),
    m = Rr(e, { relative: l });
  return w.useCallback(
    (g) => {
      if (Zm(g, t)) {
        g.preventDefault();
        let v = n !== void 0 ? n : wr(d) === wr(m),
          x = () =>
            f(e, {
              replace: v,
              unstable_mask: r,
              state: i,
              preventScrollReset: o,
              relative: l,
              viewTransition: s,
              unstable_defaultShouldRevalidate: a,
            });
        u ? w.startTransition(() => x()) : x();
      }
    },
    [d, f, m, n, r, i, t, e, o, l, s, a, u],
  );
}
var Ey = 0,
  _y = () => `__${String(++Ey)}__`;
function Cy() {
  let { router: e } = rd("useSubmit"),
    { basename: t } = w.useContext(Ce),
    n = bm(),
    r = e.fetch,
    i = e.navigate;
  return w.useCallback(
    async (o, l = {}) => {
      let { action: s, method: a, encType: u, formData: f, body: d } = ny(o, t);
      if (l.navigate === !1) {
        let m = l.fetcherKey || _y();
        await r(m, n, l.action || s, {
          unstable_defaultShouldRevalidate: l.unstable_defaultShouldRevalidate,
          preventScrollReset: l.preventScrollReset,
          formData: f,
          body: d,
          formMethod: l.method || a,
          formEncType: l.encType || u,
          flushSync: l.flushSync,
        });
      } else
        await i(l.action || s, {
          unstable_defaultShouldRevalidate: l.unstable_defaultShouldRevalidate,
          preventScrollReset: l.preventScrollReset,
          formData: f,
          body: d,
          formMethod: l.method || a,
          formEncType: l.encType || u,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [r, i, t, n],
  );
}
function Ny(e, { relative: t } = {}) {
  let { basename: n } = w.useContext(Ce),
    r = w.useContext(Je);
  b(r, "useFormAction must be used inside a RouteContext");
  let [i] = r.matches.slice(-1),
    o = { ...Rr(e || ".", { relative: t }) },
    l = ut();
  if (e == null) {
    o.search = l.search;
    let s = new URLSearchParams(o.search),
      a = s.getAll("index");
    if (a.some((f) => f === "")) {
      (s.delete("index"),
        a.filter((d) => d).forEach((d) => s.append("index", d)));
      let f = s.toString();
      o.search = f ? `?${f}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      i.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    n !== "/" && (o.pathname = o.pathname === "/" ? n : Ke([n, o.pathname])),
    wr(o)
  );
}
function Ry(e, { relative: t } = {}) {
  let n = w.useContext(Qf);
  b(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = rd("useViewTransitionState"),
    i = Rr(e, { relative: t });
  if (!n.isTransitioning) return !1;
  let o = st(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    l = st(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Mi(i.pathname, l) != null || Mi(i.pathname, o) != null;
}
const Py = {},
  yu = (e) => {
    let t;
    const n = new Set(),
      r = (f, d) => {
        const m = typeof f == "function" ? f(t) : f;
        if (!Object.is(m, t)) {
          const g = t;
          ((t =
            (d ?? (typeof m != "object" || m === null))
              ? m
              : Object.assign({}, t, m)),
            n.forEach((v) => v(t, g)));
        }
      },
      i = () => t,
      a = {
        setState: r,
        getState: i,
        getInitialState: () => u,
        subscribe: (f) => (n.add(f), () => n.delete(f)),
        destroy: () => {
          ((Py ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear());
        },
      },
      u = (t = e(r, i, a));
    return a;
  },
  Ty = (e) => (e ? yu(e) : yu);
var id = { exports: {} },
  od = {},
  ld = { exports: {} },
  sd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sn = w;
function jy(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ly = typeof Object.is == "function" ? Object.is : jy,
  Oy = Sn.useState,
  Iy = Sn.useEffect,
  Dy = Sn.useLayoutEffect,
  Ay = Sn.useDebugValue;
function zy(e, t) {
  var n = t(),
    r = Oy({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    o = r[1];
  return (
    Dy(
      function () {
        ((i.value = n), (i.getSnapshot = t), bo(i) && o({ inst: i }));
      },
      [e, n, t],
    ),
    Iy(
      function () {
        return (
          bo(i) && o({ inst: i }),
          e(function () {
            bo(i) && o({ inst: i });
          })
        );
      },
      [e],
    ),
    Ay(n),
    n
  );
}
function bo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ly(e, n);
  } catch {
    return !0;
  }
}
function By(e, t) {
  return t();
}
var Fy =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? By
    : zy;
sd.useSyncExternalStore =
  Sn.useSyncExternalStore !== void 0 ? Sn.useSyncExternalStore : Fy;
ld.exports = sd;
var My = ld.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lo = w,
  $y = My;
function Uy(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var by = typeof Object.is == "function" ? Object.is : Uy,
  Hy = $y.useSyncExternalStore,
  Vy = lo.useRef,
  Wy = lo.useEffect,
  Qy = lo.useMemo,
  Gy = lo.useDebugValue;
od.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var o = Vy(null);
  if (o.current === null) {
    var l = { hasValue: !1, value: null };
    o.current = l;
  } else l = o.current;
  o = Qy(
    function () {
      function a(g) {
        if (!u) {
          if (((u = !0), (f = g), (g = r(g)), i !== void 0 && l.hasValue)) {
            var v = l.value;
            if (i(v, g)) return (d = v);
          }
          return (d = g);
        }
        if (((v = d), by(f, g))) return v;
        var x = r(g);
        return i !== void 0 && i(v, x) ? ((f = g), v) : ((f = g), (d = x));
      }
      var u = !1,
        f,
        d,
        m = n === void 0 ? null : n;
      return [
        function () {
          return a(t());
        },
        m === null
          ? void 0
          : function () {
              return a(m());
            },
      ];
    },
    [t, n, r, i],
  );
  var s = Hy(e, o[0], o[1]);
  return (
    Wy(
      function () {
        ((l.hasValue = !0), (l.value = s));
      },
      [s],
    ),
    Gy(s),
    s
  );
};
id.exports = od;
var Ky = id.exports;
const qy = Cu(Ky),
  ad = {},
  { useDebugValue: Yy } = zu,
  { useSyncExternalStoreWithSelector: Jy } = qy;
let gu = !1;
const Xy = (e) => e;
function Zy(e, t = Xy, n) {
  (ad ? "production" : void 0) !== "production" &&
    n &&
    !gu &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (gu = !0));
  const r = Jy(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n,
  );
  return (Yy(r), r);
}
const vu = (e) => {
    (ad ? "production" : void 0) !== "production" &&
      typeof e != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const t = typeof e == "function" ? Ty(e) : e,
      n = (r, i) => Zy(t, r, i);
    return (Object.assign(n, t), n);
  },
  e0 = (e) => (e ? vu(e) : vu),
  Ye = Object.create(null);
Ye.open = "0";
Ye.close = "1";
Ye.ping = "2";
Ye.pong = "3";
Ye.message = "4";
Ye.upgrade = "5";
Ye.noop = "6";
const fi = Object.create(null);
Object.keys(Ye).forEach((e) => {
  fi[Ye[e]] = e;
});
const bl = { type: "error", data: "parser error" },
  ud =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  cd = typeof ArrayBuffer == "function",
  fd = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  qs = ({ type: e, data: t }, n, r) =>
    ud && t instanceof Blob
      ? n
        ? r(t)
        : xu(t, r)
      : cd && (t instanceof ArrayBuffer || fd(t))
        ? n
          ? r(t)
          : xu(new Blob([t]), r)
        : r(Ye[e] + (t || "")),
  xu = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const r = n.result.split(",")[1];
        t("b" + (r || ""));
      }),
      n.readAsDataURL(e)
    );
  };
function wu(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Ho;
function t0(e, t) {
  if (ud && e.data instanceof Blob)
    return e.data.arrayBuffer().then(wu).then(t);
  if (cd && (e.data instanceof ArrayBuffer || fd(e.data))) return t(wu(e.data));
  qs(e, !1, (n) => {
    (Ho || (Ho = new TextEncoder()), t(Ho.encode(n)));
  });
}
const ku = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Gn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ku.length; e++) Gn[ku.charCodeAt(e)] = e;
const n0 = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      r,
      i = 0,
      o,
      l,
      s,
      a;
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
    const u = new ArrayBuffer(t),
      f = new Uint8Array(u);
    for (r = 0; r < n; r += 4)
      ((o = Gn[e.charCodeAt(r)]),
        (l = Gn[e.charCodeAt(r + 1)]),
        (s = Gn[e.charCodeAt(r + 2)]),
        (a = Gn[e.charCodeAt(r + 3)]),
        (f[i++] = (o << 2) | (l >> 4)),
        (f[i++] = ((l & 15) << 4) | (s >> 2)),
        (f[i++] = ((s & 3) << 6) | (a & 63)));
    return u;
  },
  r0 = typeof ArrayBuffer == "function",
  Ys = (e, t) => {
    if (typeof e != "string") return { type: "message", data: dd(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: i0(e.substring(1), t) }
      : fi[n]
        ? e.length > 1
          ? { type: fi[n], data: e.substring(1) }
          : { type: fi[n] }
        : bl;
  },
  i0 = (e, t) => {
    if (r0) {
      const n = n0(e);
      return dd(n, t);
    } else return { base64: !0, data: e };
  },
  dd = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof Blob ? e : new Blob([e]);
      case "arraybuffer":
      default:
        return e instanceof ArrayBuffer ? e : e.buffer;
    }
  },
  pd = "",
  o0 = (e, t) => {
    const n = e.length,
      r = new Array(n);
    let i = 0;
    e.forEach((o, l) => {
      qs(o, !1, (s) => {
        ((r[l] = s), ++i === n && t(r.join(pd)));
      });
    });
  },
  l0 = (e, t) => {
    const n = e.split(pd),
      r = [];
    for (let i = 0; i < n.length; i++) {
      const o = Ys(n[i], t);
      if ((r.push(o), o.type === "error")) break;
    }
    return r;
  };
function s0() {
  return new TransformStream({
    transform(e, t) {
      t0(e, (n) => {
        const r = n.length;
        let i;
        if (r < 126)
          ((i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, r));
        else if (r < 65536) {
          i = new Uint8Array(3);
          const o = new DataView(i.buffer);
          (o.setUint8(0, 126), o.setUint16(1, r));
        } else {
          i = new Uint8Array(9);
          const o = new DataView(i.buffer);
          (o.setUint8(0, 127), o.setBigUint64(1, BigInt(r)));
        }
        (e.data && typeof e.data != "string" && (i[0] |= 128),
          t.enqueue(i),
          t.enqueue(n));
      });
    },
  });
}
let Vo;
function qr(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function Yr(e, t) {
  if (e[0].length === t) return e.shift();
  const n = new Uint8Array(t);
  let r = 0;
  for (let i = 0; i < t; i++)
    ((n[i] = e[0][r++]), r === e[0].length && (e.shift(), (r = 0)));
  return (e.length && r < e[0].length && (e[0] = e[0].slice(r)), n);
}
function a0(e, t) {
  Vo || (Vo = new TextDecoder());
  const n = [];
  let r = 0,
    i = -1,
    o = !1;
  return new TransformStream({
    transform(l, s) {
      for (n.push(l); ; ) {
        if (r === 0) {
          if (qr(n) < 1) break;
          const a = Yr(n, 1);
          ((o = (a[0] & 128) === 128),
            (i = a[0] & 127),
            i < 126 ? (r = 3) : i === 126 ? (r = 1) : (r = 2));
        } else if (r === 1) {
          if (qr(n) < 2) break;
          const a = Yr(n, 2);
          ((i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0)),
            (r = 3));
        } else if (r === 2) {
          if (qr(n) < 8) break;
          const a = Yr(n, 8),
            u = new DataView(a.buffer, a.byteOffset, a.length),
            f = u.getUint32(0);
          if (f > Math.pow(2, 21) - 1) {
            s.enqueue(bl);
            break;
          }
          ((i = f * Math.pow(2, 32) + u.getUint32(4)), (r = 3));
        } else {
          if (qr(n) < i) break;
          const a = Yr(n, i);
          (s.enqueue(Ys(o ? a : Vo.decode(a), t)), (r = 0));
        }
        if (i === 0 || i > e) {
          s.enqueue(bl);
          break;
        }
      }
    },
  });
}
const hd = 4;
function Y(e) {
  if (e) return u0(e);
}
function u0(e) {
  for (var t in Y.prototype) e[t] = Y.prototype[t];
  return e;
}
Y.prototype.on = Y.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  );
};
Y.prototype.once = function (e, t) {
  function n() {
    (this.off(e, n), t.apply(this, arguments));
  }
  return ((n.fn = t), this.on(e, n), this);
};
Y.prototype.off =
  Y.prototype.removeListener =
  Y.prototype.removeAllListeners =
  Y.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var n = this._callbacks["$" + e];
      if (!n) return this;
      if (arguments.length == 1) return (delete this._callbacks["$" + e], this);
      for (var r, i = 0; i < n.length; i++)
        if (((r = n[i]), r === t || r.fn === t)) {
          n.splice(i, 1);
          break;
        }
      return (n.length === 0 && delete this._callbacks["$" + e], this);
    };
Y.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var t = new Array(arguments.length - 1),
      n = this._callbacks["$" + e],
      r = 1;
    r < arguments.length;
    r++
  )
    t[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t);
  }
  return this;
};
Y.prototype.emitReserved = Y.prototype.emit;
Y.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}),
    this._callbacks["$" + e] || []
  );
};
Y.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const so =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (t) => Promise.resolve().then(t)
      : (t, n) => n(t, 0),
  Pe =
    typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : Function("return this")(),
  c0 = "arraybuffer";
function md(e, ...t) {
  return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const f0 = Pe.setTimeout,
  d0 = Pe.clearTimeout;
function ao(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = f0.bind(Pe)), (e.clearTimeoutFn = d0.bind(Pe)))
    : ((e.setTimeoutFn = Pe.setTimeout.bind(Pe)),
      (e.clearTimeoutFn = Pe.clearTimeout.bind(Pe)));
}
const p0 = 1.33;
function h0(e) {
  return typeof e == "string"
    ? m0(e)
    : Math.ceil((e.byteLength || e.size) * p0);
}
function m0(e) {
  let t = 0,
    n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    ((t = e.charCodeAt(r)),
      t < 128
        ? (n += 1)
        : t < 2048
          ? (n += 2)
          : t < 55296 || t >= 57344
            ? (n += 3)
            : (r++, (n += 4)));
  return n;
}
function yd() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function y0(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"),
      (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
  return t;
}
function g0(e) {
  let t = {},
    n = e.split("&");
  for (let r = 0, i = n.length; r < i; r++) {
    let o = n[r].split("=");
    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return t;
}
class v0 extends Error {
  constructor(t, n, r) {
    (super(t),
      (this.description = n),
      (this.context = r),
      (this.type = "TransportError"));
  }
}
class Js extends Y {
  constructor(t) {
    (super(),
      (this.writable = !1),
      ao(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket),
      (this.supportsBinary = !t.forceBase64));
  }
  onError(t, n, r) {
    return (super.emitReserved("error", new v0(t, n, r)), this);
  }
  open() {
    return ((this.readyState = "opening"), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    ((this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open"));
  }
  onData(t) {
    const n = Ys(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    ((this.readyState = "closed"), super.emitReserved("close", t));
  }
  pause(t) {}
  createUri(t, n = {}) {
    return (
      t +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(n)
    );
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(this.opts.port) !== 443) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(t) {
    const n = y0(t);
    return n.length ? "?" + n : "";
  }
}
class x0 extends Js {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      ((this.readyState = "paused"), t());
    };
    if (this._polling || !this.writable) {
      let r = 0;
      (this._polling &&
        (r++,
        this.once("pollComplete", function () {
          --r || n();
        })),
        this.writable ||
          (r++,
          this.once("drain", function () {
            --r || n();
          })));
    } else n();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved("poll"));
  }
  onData(t) {
    const n = (r) => {
      if (
        (this.readyState === "opening" && r.type === "open" && this.onOpen(),
        r.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }),
          !1
        );
      this.onPacket(r);
    };
    (l0(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll()));
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    ((this.writable = !1),
      o0(t, (n) => {
        this.doWrite(n, () => {
          ((this.writable = !0), this.emitReserved("drain"));
        });
      }));
  }
  uri() {
    const t = this.opts.secure ? "https" : "http",
      n = this.query || {};
    return (
      this.opts.timestampRequests !== !1 &&
        (n[this.opts.timestampParam] = yd()),
      !this.supportsBinary && !n.sid && (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
let gd = !1;
try {
  gd = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const w0 = gd;
function k0() {}
class S0 extends x0 {
  constructor(t) {
    if ((super(t), typeof location < "u")) {
      const n = location.protocol === "https:";
      let r = location.port;
      (r || (r = n ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && t.hostname !== location.hostname) ||
          r !== t.port));
    }
  }
  doWrite(t, n) {
    const r = this.request({ method: "POST", data: t });
    (r.on("success", n),
      r.on("error", (i, o) => {
        this.onError("xhr post error", i, o);
      }));
  }
  doPoll() {
    const t = this.request();
    (t.on("data", this.onData.bind(this)),
      t.on("error", (n, r) => {
        this.onError("xhr poll error", n, r);
      }),
      (this.pollXhr = t));
  }
}
class qe extends Y {
  constructor(t, n, r) {
    (super(),
      (this.createRequest = t),
      ao(this, r),
      (this._opts = r),
      (this._method = r.method || "GET"),
      (this._uri = n),
      (this._data = r.data !== void 0 ? r.data : null),
      this._create());
  }
  _create() {
    var t;
    const n = md(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref",
    );
    n.xdomain = !!this._opts.xd;
    const r = (this._xhr = this.createRequest(n));
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) &&
              r.setRequestHeader(i, this._opts.extraHeaders[i]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {}
      ((t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r),
        "withCredentials" in r &&
          (r.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout),
        (r.onreadystatechange = () => {
          var i;
          (r.readyState === 3 &&
            ((i = this._opts.cookieJar) === null ||
              i === void 0 ||
              i.parseCookies(r.getResponseHeader("set-cookie"))),
            r.readyState === 4 &&
              (r.status === 200 || r.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof r.status == "number" ? r.status : 0);
                  }, 0)));
        }),
        r.send(this._data));
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = qe.requestsCount++), (qe.requests[this._index] = this));
  }
  _onError(t) {
    (this.emitReserved("error", t, this._xhr), this._cleanup(!0));
  }
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = k0), t))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < "u" && delete qe.requests[this._index],
        (this._xhr = null));
    }
  }
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this._cleanup());
  }
  abort() {
    this._cleanup();
  }
}
qe.requestsCount = 0;
qe.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", Su);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Pe ? "pagehide" : "unload";
    addEventListener(e, Su, !1);
  }
}
function Su() {
  for (let e in qe.requests)
    qe.requests.hasOwnProperty(e) && qe.requests[e].abort();
}
const E0 = (function () {
  const e = vd({ xdomain: !1 });
  return e && e.responseType !== null;
})();
class _0 extends S0 {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = E0 && !n;
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd }, this.opts),
      new qe(vd, this.uri(), t)
    );
  }
}
function vd(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || w0)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new Pe[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const xd =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class C0 extends Js {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(),
      n = this.opts.protocols,
      r = xd
        ? {}
        : md(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity",
          );
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, n, r);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = (t) =>
        this.onClose({
          description: "websocket connection closed",
          context: t,
        })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t)));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = n === t.length - 1;
      qs(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {}
        i &&
          so(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" &&
      ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const t = this.opts.secure ? "wss" : "ws",
      n = this.query || {};
    return (
      this.opts.timestampRequests && (n[this.opts.timestampParam] = yd()),
      this.supportsBinary || (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
const Wo = Pe.WebSocket || Pe.MozWebSocket;
class N0 extends C0 {
  createSocket(t, n, r) {
    return xd ? new Wo(t, n, r) : n ? new Wo(t, n) : new Wo(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class R0 extends Js {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name],
      );
    } catch (t) {
      return this.emitReserved("error", t);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((t) => {
        this.onError("webtransport error", t);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((t) => {
          const n = a0(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            r = t.readable.pipeThrough(n).getReader(),
            i = s0();
          (i.readable.pipeTo(t.writable),
            (this._writer = i.writable.getWriter()));
          const o = () => {
            r.read()
              .then(({ done: s, value: a }) => {
                s || (this.onPacket(a), o());
              })
              .catch((s) => {});
          };
          o();
          const l = { type: "open" };
          (this.query.sid && (l.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(l).then(() => this.onOpen()));
        });
      }));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = n === t.length - 1;
      this._writer.write(r).then(() => {
        i &&
          so(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const P0 = { websocket: N0, webtransport: R0, polling: _0 },
  T0 =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  j0 = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function Hl(e) {
  if (e.length > 8e3) throw "URI too long";
  const t = e,
    n = e.indexOf("["),
    r = e.indexOf("]");
  n != -1 &&
    r != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, r).replace(/:/g, ";") +
      e.substring(r, e.length));
  let i = T0.exec(e || ""),
    o = {},
    l = 14;
  for (; l--; ) o[j0[l]] = i[l] || "";
  return (
    n != -1 &&
      r != -1 &&
      ((o.source = t),
      (o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":")),
      (o.authority = o.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (o.ipv6uri = !0)),
    (o.pathNames = L0(o, o.path)),
    (o.queryKey = O0(o, o.query)),
    o
  );
}
function L0(e, t) {
  const n = /\/{2,9}/g,
    r = t.replace(n, "/").split("/");
  return (
    (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1),
    t.slice(-1) == "/" && r.splice(r.length - 1, 1),
    r
  );
}
function O0(e, t) {
  const n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, i, o) {
      i && (n[i] = o);
    }),
    n
  );
}
const Vl =
    typeof addEventListener == "function" &&
    typeof removeEventListener == "function",
  di = [];
Vl &&
  addEventListener(
    "offline",
    () => {
      di.forEach((e) => e());
    },
    !1,
  );
class Nt extends Y {
  constructor(t, n) {
    if (
      (super(),
      (this.binaryType = c0),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      t && typeof t == "object" && ((n = t), (t = null)),
      t)
    ) {
      const r = Hl(t);
      ((n.hostname = r.host),
        (n.secure = r.protocol === "https" || r.protocol === "wss"),
        (n.port = r.port),
        r.query && (n.query = r.query));
    } else n.host && (n.hostname = Hl(n.host).host);
    (ao(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
            ? "443"
            : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      n.transports.forEach((r) => {
        const i = r.prototype.name;
        (this.transports.push(i), (this._transportsByName[i] = r));
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        n,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = g0(this.opts.query)),
      Vl &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            "beforeunload",
            this._beforeunloadEventListener,
            !1,
          )),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost",
            });
          }),
          di.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    ((n.EIO = hd), (n.transport = t), this.id && (n.sid = this.id));
    const r = Object.assign(
      {},
      this.opts,
      {
        query: n,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[t],
    );
    return new this._transportsByName[t](r);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const t =
      this.opts.rememberUpgrade &&
      Nt.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(t);
    (n.open(), this.setTransport(n));
  }
  setTransport(t) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (n) => this._onClose("transport close", n)));
  }
  onOpen() {
    ((this.readyState = "open"),
      (Nt.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush());
  }
  _onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          (this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout());
          break;
        case "error":
          const n = new Error("server error");
          ((n.code = t.data), this._onError(n));
          break;
        case "message":
          (this.emitReserved("data", t.data),
            this.emitReserved("message", t.data));
          break;
      }
  }
  onHandshake(t) {
    (this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this._pingInterval = t.pingInterval),
      (this._pingTimeout = t.pingTimeout),
      (this._maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + t),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, t)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved("drain")
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this._getWritablePackets();
      (this.transport.send(t),
        (this._prevBufferLen = t.length),
        this.emitReserved("flush"));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const i = this.writeBuffer[r].data;
      if ((i && (n += h0(i)), r > 0 && n > this._maxPayload))
        return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const t = Date.now() > this._pingTimeoutTime;
    return (
      t &&
        ((this._pingTimeoutTime = 0),
        so(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      t
    );
  }
  write(t, n, r) {
    return (this._sendPacket("message", t, n, r), this);
  }
  send(t, n, r) {
    return (this._sendPacket("message", t, n, r), this);
  }
  _sendPacket(t, n, r, i) {
    if (
      (typeof n == "function" && ((i = n), (n = void 0)),
      typeof r == "function" && ((i = r), (r = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    ((r = r || {}), (r.compress = r.compress !== !1));
    const o = { type: t, data: n, options: r };
    (this.emitReserved("packetCreate", o),
      this.writeBuffer.push(o),
      i && this.once("flush", i),
      this.flush());
  }
  close() {
    const t = () => {
        (this._onClose("forced close"), this.transport.close());
      },
      n = () => {
        (this.off("upgrade", n), this.off("upgradeError", n), t());
      },
      r = () => {
        (this.once("upgrade", n), this.once("upgradeError", n));
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? r() : t();
            })
          : this.upgrading
            ? r()
            : t()),
      this
    );
  }
  _onError(t) {
    if (
      ((Nt.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === "opening")
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved("error", t), this._onClose("transport error", t));
  }
  _onClose(t, n) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        Vl &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            ),
          this._offlineEventListener))
      ) {
        const r = di.indexOf(this._offlineEventListener);
        r !== -1 && di.splice(r, 1);
      }
      ((this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", t, n),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Nt.protocol = hd;
class I0 extends Nt {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let t = 0; t < this._upgrades.length; t++)
        this._probe(this._upgrades[t]);
  }
  _probe(t) {
    let n = this.createTransport(t),
      r = !1;
    Nt.priorWebsocketSuccess = !1;
    const i = () => {
      r ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (d) => {
          if (!r)
            if (d.type === "pong" && d.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              ((Nt.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  r ||
                    (this.readyState !== "closed" &&
                      (f(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const m = new Error("probe error");
              ((m.transport = n.name), this.emitReserved("upgradeError", m));
            }
        }));
    };
    function o() {
      r || ((r = !0), f(), n.close(), (n = null));
    }
    const l = (d) => {
      const m = new Error("probe error: " + d);
      ((m.transport = n.name), o(), this.emitReserved("upgradeError", m));
    };
    function s() {
      l("transport closed");
    }
    function a() {
      l("socket closed");
    }
    function u(d) {
      n && d.name !== n.name && o();
    }
    const f = () => {
      (n.removeListener("open", i),
        n.removeListener("error", l),
        n.removeListener("close", s),
        this.off("close", a),
        this.off("upgrading", u));
    };
    (n.once("open", i),
      n.once("error", l),
      n.once("close", s),
      this.once("close", a),
      this.once("upgrading", u),
      this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport"
        ? this.setTimeoutFn(() => {
            r || n.open();
          }, 200)
        : n.open());
  }
  onHandshake(t) {
    ((this._upgrades = this._filterUpgrades(t.upgrades)), super.onHandshake(t));
  }
  _filterUpgrades(t) {
    const n = [];
    for (let r = 0; r < t.length; r++)
      ~this.transports.indexOf(t[r]) && n.push(t[r]);
    return n;
  }
}
let D0 = class extends I0 {
  constructor(t, n = {}) {
    const r = typeof t == "object" ? t : n;
    ((!r.transports || (r.transports && typeof r.transports[0] == "string")) &&
      (r.transports = (r.transports || ["polling", "websocket", "webtransport"])
        .map((i) => P0[i])
        .filter((i) => !!i)),
      super(t, r));
  }
};
function A0(e, t = "", n) {
  let r = e;
  ((n = n || (typeof location < "u" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n < "u" ? (e = n.protocol + "//" + e) : (e = "https://" + e)),
      (r = Hl(e))),
    r.port ||
      (/^(http|ws)$/.test(r.protocol)
        ? (r.port = "80")
        : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
    (r.path = r.path || "/"));
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return (
    (r.id = r.protocol + "://" + o + ":" + r.port + t),
    (r.href =
      r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port)),
    r
  );
}
const z0 = typeof ArrayBuffer == "function",
  B0 = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  wd = Object.prototype.toString,
  F0 =
    typeof Blob == "function" ||
    (typeof Blob < "u" && wd.call(Blob) === "[object BlobConstructor]"),
  M0 =
    typeof File == "function" ||
    (typeof File < "u" && wd.call(File) === "[object FileConstructor]");
function Xs(e) {
  return (
    (z0 && (e instanceof ArrayBuffer || B0(e))) ||
    (F0 && e instanceof Blob) ||
    (M0 && e instanceof File)
  );
}
function pi(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, r = e.length; n < r; n++) if (pi(e[n])) return !0;
    return !1;
  }
  if (Xs(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return pi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && pi(e[n])) return !0;
  return !1;
}
function $0(e) {
  const t = [],
    n = e.data,
    r = e;
  return (
    (r.data = Wl(n, t)),
    (r.attachments = t.length),
    { packet: r, buffers: t }
  );
}
function Wl(e, t) {
  if (!e) return e;
  if (Xs(e)) {
    const n = { _placeholder: !0, num: t.length };
    return (t.push(e), n);
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let r = 0; r < e.length; r++) n[r] = Wl(e[r], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (n[r] = Wl(e[r], t));
    return n;
  }
  return e;
}
function U0(e, t) {
  return ((e.data = Ql(e.data, t)), delete e.attachments, e);
}
function Ql(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++) e[n] = Ql(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Ql(e[n], t));
  return e;
}
const b0 = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener",
];
var D;
(function (e) {
  ((e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK"));
})(D || (D = {}));
class H0 {
  constructor(t) {
    this.replacer = t;
  }
  encode(t) {
    return (t.type === D.EVENT || t.type === D.ACK) && pi(t)
      ? this.encodeAsBinary({
          type: t.type === D.EVENT ? D.BINARY_EVENT : D.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)];
  }
  encodeAsString(t) {
    let n = "" + t.type;
    return (
      (t.type === D.BINARY_EVENT || t.type === D.BINARY_ACK) &&
        (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(t) {
    const n = $0(t),
      r = this.encodeAsString(n.packet),
      i = n.buffers;
    return (i.unshift(r), i);
  }
}
class Zs extends Y {
  constructor(t) {
    (super(), (this.reviver = t));
  }
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const r = n.type === D.BINARY_EVENT;
      r || n.type === D.BINARY_ACK
        ? ((n.type = r ? D.EVENT : D.ACK),
          (this.reconstructor = new V0(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (Xs(t) || t.base64)
      if (this.reconstructor)
        ((n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n)));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + t);
  }
  decodeString(t) {
    let n = 0;
    const r = { type: Number(t.charAt(0)) };
    if (D[r.type] === void 0) throw new Error("unknown packet type " + r.type);
    if (r.type === D.BINARY_EVENT || r.type === D.BINARY_ACK) {
      const o = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const l = t.substring(o, n);
      if (l != Number(l) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(l);
    }
    if (t.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      r.nsp = t.substring(o, n);
    } else r.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const o = n + 1;
      for (; ++n; ) {
        const l = t.charAt(n);
        if (l == null || Number(l) != l) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      r.id = Number(t.substring(o, n + 1));
    }
    if (t.charAt(++n)) {
      const o = this.tryParse(t.substr(n));
      if (Zs.isPayloadValid(r.type, o)) r.data = o;
      else throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case D.CONNECT:
        return Eu(n);
      case D.DISCONNECT:
        return n === void 0;
      case D.CONNECT_ERROR:
        return typeof n == "string" || Eu(n);
      case D.EVENT:
      case D.BINARY_EVENT:
        return (
          Array.isArray(n) &&
          (typeof n[0] == "number" ||
            (typeof n[0] == "string" && b0.indexOf(n[0]) === -1))
        );
      case D.ACK:
      case D.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class V0 {
  constructor(t) {
    ((this.packet = t), (this.buffers = []), (this.reconPack = t));
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = U0(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), n);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
function Eu(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const W0 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Zs,
      Encoder: H0,
      get PacketType() {
        return D;
      },
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function ze(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const Q0 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class kd extends Y {
  constructor(t, n, r) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      ze(t, "open", this.onopen.bind(this)),
      ze(t, "packet", this.onpacket.bind(this)),
      ze(t, "error", this.onerror.bind(this)),
      ze(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return (t.unshift("message"), this.emit.apply(this, t), this);
  }
  emit(t, ...n) {
    var r, i, o;
    if (Q0.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (
      (n.unshift(t),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return (this._addToQueue(n), this);
    const l = { type: D.EVENT, data: n };
    if (
      ((l.options = {}),
      (l.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const f = this.ids++,
        d = n.pop();
      (this._registerAckCallback(f, d), (l.id = f));
    }
    const s =
        (i =
          (r = this.io.engine) === null || r === void 0
            ? void 0
            : r.transport) === null || i === void 0
          ? void 0
          : i.writable,
      a =
        this.connected &&
        !(
          !((o = this.io.engine) === null || o === void 0) &&
          o._hasPingExpired()
        );
    return (
      (this.flags.volatile && !s) ||
        (a
          ? (this.notifyOutgoingListeners(l), this.packet(l))
          : this.sendBuffer.push(l)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    var r;
    const i =
      (r = this.flags.timeout) !== null && r !== void 0
        ? r
        : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
        delete this.acks[t];
        for (let s = 0; s < this.sendBuffer.length; s++)
          this.sendBuffer[s].id === t && this.sendBuffer.splice(s, 1);
        n.call(this, new Error("operation has timed out"));
      }, i),
      l = (...s) => {
        (this.io.clearTimeoutFn(o), n.apply(this, s));
      };
    ((l.withError = !0), (this.acks[t] = l));
  }
  emitWithAck(t, ...n) {
    return new Promise((r, i) => {
      const o = (l, s) => (l ? i(l) : r(s));
      ((o.withError = !0), n.push(o), this.emit(t, ...n));
    });
  }
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (t.push(
      (i, ...o) => (
        this._queue[0],
        i !== null
          ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(i))
          : (this._queue.shift(), n && n(null, ...o)),
        (r.pending = !1),
        this._drainQueue()
      ),
    ),
      this._queue.push(r),
      this._drainQueue());
  }
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const n = this._queue[0];
    (n.pending && !t) ||
      ((n.pending = !0),
      n.tryCount++,
      (this.flags = n.flags),
      this.emit.apply(this, n.args));
  }
  packet(t) {
    ((t.nsp = this.nsp), this.io._packet(t));
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: D.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, n) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, n),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((r) => String(r.id) === t)) {
        const r = this.acks[t];
        (delete this.acks[t],
          r.withError &&
            r.call(this, new Error("socket has been disconnected")));
      }
    });
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case D.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                ),
              );
          break;
        case D.EVENT:
        case D.BINARY_EVENT:
          this.onevent(t);
          break;
        case D.ACK:
        case D.BINARY_ACK:
          this.onack(t);
          break;
        case D.DISCONNECT:
          this.ondisconnect();
          break;
        case D.CONNECT_ERROR:
          this.destroy();
          const r = new Error(t.data.message);
          ((r.data = t.data.data), this.emitReserved("connect_error", r));
          break;
      }
  }
  onevent(t) {
    const n = t.data || [];
    (t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n)));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n) r.apply(this, t);
    }
    (super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == "string" &&
        (this._lastOffset = t[t.length - 1]));
  }
  ack(t) {
    const n = this;
    let r = !1;
    return function (...i) {
      r || ((r = !0), n.packet({ type: D.ACK, id: t, data: i }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" &&
      (delete this.acks[t.id],
      n.withError && t.data.unshift(null),
      n.apply(this, t.data));
  }
  onconnect(t, n) {
    ((this.id = t),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this._drainQueue(!0),
      this.emitReserved("connect"));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        (this.notifyOutgoingListeners(t), this.packet(t));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose("io server disconnect"));
  }
  destroy() {
    (this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: D.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return ((this.flags.compress = t), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(t) {
    return ((this.flags.timeout = t), this);
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r]) return (n.splice(r, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r]) return (n.splice(r, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n) r.apply(this, t.data);
    }
  }
}
function jn(e) {
  ((e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0));
}
jn.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
};
jn.prototype.reset = function () {
  this.attempts = 0;
};
jn.prototype.setMin = function (e) {
  this.ms = e;
};
jn.prototype.setMax = function (e) {
  this.max = e;
};
jn.prototype.setJitter = function (e) {
  this.jitter = e;
};
class Gl extends Y {
  constructor(t, n) {
    var r;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      ao(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5,
      ),
      (this.backoff = new jn({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t));
    const i = n.parser || W0;
    ((this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), t || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new D0(this.uri, this.opts);
    const n = this.engine,
      r = this;
    ((this._readyState = "opening"), (this.skipReconnect = !1));
    const i = ze(n, "open", function () {
        (r.onopen(), t && t());
      }),
      o = (s) => {
        (this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", s),
          t ? t(s) : this.maybeReconnectOnOpen());
      },
      l = ze(n, "error", o);
    if (this._timeout !== !1) {
      const s = this._timeout,
        a = this.setTimeoutFn(() => {
          (i(), o(new Error("timeout")), n.close());
        }, s);
      (this.opts.autoUnref && a.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(a);
        }));
    }
    return (this.subs.push(i), this.subs.push(l), this);
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    (this.cleanup(), (this._readyState = "open"), this.emitReserved("open"));
    const t = this.engine;
    this.subs.push(
      ze(t, "ping", this.onping.bind(this)),
      ze(t, "data", this.ondata.bind(this)),
      ze(t, "error", this.onerror.bind(this)),
      ze(t, "close", this.onclose.bind(this)),
      ze(this.decoder, "decoded", this.ondecoded.bind(this)),
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(t) {
    so(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let r = this.nsps[t];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new kd(this, t, n)), (this.nsps[t] = r)),
      r
    );
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const r of n) if (this.nsps[r].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options);
  }
  cleanup() {
    (this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"));
  }
  disconnect() {
    return this._close();
  }
  onclose(t, n) {
    var r;
    (this.cleanup(),
      (r = this.engine) === null || r === void 0 || r.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1));
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", i))
                : t.onreconnect();
            }));
      }, n);
      (this.opts.autoUnref && r.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(r);
        }));
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    ((this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t));
  }
}
const Un = {};
function hi(e, t) {
  (typeof e == "object" && ((t = e), (e = void 0)), (t = t || {}));
  const n = A0(e, t.path || "/socket.io"),
    r = n.source,
    i = n.id,
    o = n.path,
    l = Un[i] && o in Un[i].nsps,
    s = t.forceNew || t["force new connection"] || t.multiplex === !1 || l;
  let a;
  return (
    s ? (a = new Gl(r, t)) : (Un[i] || (Un[i] = new Gl(r, t)), (a = Un[i])),
    n.query && !t.query && (t.query = n.queryKey),
    a.socket(n.path, t)
  );
}
Object.assign(hi, { Manager: Gl, Socket: kd, io: hi, connect: hi });
const G0 = "http://localhost:4200";
let Qo = null;
function En() {
  return (
    Qo ||
      (Qo = hi(G0, {
        autoConnect: !1,
        reconnection: !0,
        reconnectionDelay: 1e3,
        reconnectionAttempts: 10,
      })),
    Qo
  );
}
function K0() {
  En().connect();
}
function Sd() {
  let e = localStorage.getItem("monopoly_player_id");
  return (
    e ||
      ((e = crypto.randomUUID()),
      localStorage.setItem("monopoly_player_id", e)),
    e
  );
}
function Ed() {
  return localStorage.getItem("monopoly_player_name") ?? "";
}
function q0(e, t) {
  (localStorage.setItem("monopoly_player_name", e),
    localStorage.setItem("monopoly_game_id", t));
}
function $i() {
  localStorage.removeItem("monopoly_game_id");
}
function Y0(e, t, n, r) {
  if (t === n) return;
  const i = [];
  let o = t;
  for (let l = 0; l < 40 && ((o = (o + 1) % 40), i.push(o), o !== n); l++);
  (r((l) => ({
    animatingPlayerIds: [...new Set([...l.animatingPlayerIds, e])],
  })),
    i.forEach((l, s) => {
      setTimeout(
        () => {
          r((a) => ({
            playerDisplayPositions: { ...a.playerDisplayPositions, [e]: l },
            animatingPlayerIds:
              s === i.length - 1
                ? a.animatingPlayerIds.filter((u) => u !== e)
                : a.animatingPlayerIds,
          }));
        },
        (s + 1) * 200,
      );
    }));
}
const Pr = e0((e, t) => ({
    gameState: null,
    myPlayerId: null,
    connected: !1,
    lobbyPlayers: [],
    lobbyHostId: null,
    currentGameId: null,
    availableRooms: [],
    pendingPropertyLanded: null,
    lastRentPaid: null,
    lastCardDrawn: null,
    playerDisplayPositions: {},
    animatingPlayerIds: [],
    setGameState: (n) => e({ gameState: n }),
    updatePlayer: (n) =>
      e((r) =>
        r.gameState
          ? {
              gameState: {
                ...r.gameState,
                players: r.gameState.players.map((i) =>
                  i.id === n.id ? n : i,
                ),
              },
            }
          : r,
      ),
    setConnected: (n) => e({ connected: n }),
    setMyPlayerId: (n) => e({ myPlayerId: n }),
    clearPendingProperty: () => e({ pendingPropertyLanded: null }),
    clearRentPaid: () => e({ lastRentPaid: null }),
    clearCardDrawn: () => e({ lastCardDrawn: null }),
    leaveRoom: () => {
      const { currentGameId: n } = t();
      (n && (En().emit("leaveGame", { gameId: n }), $i()),
        e({
          currentGameId: null,
          lobbyPlayers: [],
          lobbyHostId: null,
          gameState: null,
        }));
    },
    initSocket: () => {
      const n = En();
      (n.on("connect", () => {
        const r = Sd();
        e({ connected: !0, myPlayerId: r });
        const i = localStorage.getItem("monopoly_game_id"),
          o = Ed();
        (i &&
          o &&
          n.emit("joinGame", { gameId: i, playerName: o, persistentId: r }),
          n.emit("listRooms"));
      }),
        n.on("disconnect", () => {
          e({ connected: !1 });
        }),
        n.on("roomsList", (r) => {
          e({ availableRooms: r });
        }),
        n.on("gameState", (r) => {
          const { playerDisplayPositions: i, animatingPlayerIds: o } = t(),
            l = [],
            s = {};
          for (const a of r.players) {
            const u = i[a.id];
            u === void 0
              ? (s[a.id] = a.position)
              : (u !== a.position &&
                  !o.includes(a.id) &&
                  l.push({ id: a.id, from: u, to: a.position }),
                (s[a.id] = u));
          }
          e({
            gameState: r,
            playerDisplayPositions: s,
            currentGameId: r.gameId,
          });
          for (const { id: a, from: u, to: f } of l) Y0(a, u, f, e);
        }),
        n.on("gameStarted", (r) => {
          const i = {};
          for (const o of r.players) i[o.id] = o.position;
          e({
            gameState: r,
            currentGameId: r.gameId,
            lobbyPlayers: [],
            lobbyHostId: null,
            playerDisplayPositions: i,
            animatingPlayerIds: [],
          });
        }),
        n.on("roomState", ({ players: r, hostId: i, gameId: o }) => {
          e({ lobbyPlayers: r, lobbyHostId: i, currentGameId: o });
        }),
        n.on("playerLeft", ({ playerId: r }) => {
          e((i) =>
            i.gameState
              ? {
                  gameState: {
                    ...i.gameState,
                    players: i.gameState.players.map((o) =>
                      o.id === r ? { ...o, isConnected: !1 } : o,
                    ),
                  },
                }
              : i,
          );
        }),
        n.on("propertyLanded", (r) => {
          e({ pendingPropertyLanded: r });
        }),
        n.on("propertyBought", () => {
          e({ pendingPropertyLanded: null });
        }),
        n.on("auctionStarted", () => {
          e({ pendingPropertyLanded: null });
        }),
        n.on("rentPaid", (r) => {
          e({ lastRentPaid: r });
        }),
        n.on("cardDrawn", (r) => {
          e({ lastCardDrawn: r });
        }),
        n.on("error", ({ message: r }) => {
          (console.error("[Server error]", r),
            (r.includes("in progress") ||
              r.includes("not found") ||
              r.includes("full")) &&
              ($i(),
              e({ currentGameId: null, lobbyPlayers: [], lobbyHostId: null })));
        }),
        K0());
    },
  })),
  J0 = {
    "room-1": {
      tag: "BEGINNER",
      gradient:
        "linear-gradient(160deg, #071528 0%, #0a1e3a 40%, #071020 100%)",
      tagColor: "#2a7a6a",
    },
    "room-2": {
      tag: "STANDARD",
      gradient:
        "linear-gradient(160deg, #080f1e 0%, #0c1830 40%, #060c18 100%)",
      tagColor: "#2a507a",
    },
    "room-3": {
      tag: "HIGH STAKES",
      gradient:
        "linear-gradient(160deg, #1a0c00 0%, #2a1400 40%, #120800 100%)",
      tagColor: "#7a4a10",
    },
    "room-4": {
      tag: "OPEN TABLE",
      gradient:
        "linear-gradient(160deg, #0e0720 0%, #160d30 40%, #090414 100%)",
      tagColor: "#4a2a7a",
    },
  },
  X0 = {
    tag: "ROOM",
    gradient: "linear-gradient(160deg, #0d0f16 0%, #111520 100%)",
    tagColor: "#3a4a5a",
  };
function Z0() {
  const { availableRooms: e, connected: t } = Pr(),
    [n, r] = w.useState(Ed),
    [i, o] = w.useState(null),
    [l, s] = w.useState(""),
    a = En();
  w.useEffect(() => {
    a.emit("listRooms");
    const f = setInterval(() => a.emit("listRooms"), 5e3);
    return () => clearInterval(f);
  }, [a]);
  function u(f) {
    const d = n.trim();
    if (!d) {
      s("Enter a name first.");
      return;
    }
    (s(""), o(f));
    const m = Sd();
    (q0(d, f),
      a.emit("joinGame", { gameId: f, playerName: d, persistentId: m }));
  }
  return c.jsxs("div", {
    className: "min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col",
    children: [
      c.jsxs("header", {
        className:
          "border-b border-[#1a1f2c] px-6 h-14 flex items-center justify-between shrink-0",
        children: [
          c.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              c.jsx("div", {
                className:
                  "w-8 h-8 border border-[#1e2230] rounded flex items-center justify-center",
                children: c.jsx("span", {
                  className: "text-xs font-bold text-slate-400",
                  children: "T",
                }),
              }),
              c.jsx("span", {
                className:
                  "font-bold tracking-[0.18em] text-xs uppercase text-slate-300",
                children: "NOPOLY",
              }),
            ],
          }),
          c.jsxs("div", {
            className: `flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase ${t ? "text-teal-600" : "text-red-600"}`,
            children: [
              c.jsx("div", {
                className: `w-1.5 h-1.5 rounded-full ${t ? "bg-teal-600" : "bg-red-600"}`,
              }),
              t ? "Online" : "Offline",
            ],
          }),
        ],
      }),
      c.jsxs("div", {
        className: "flex-1 max-w-4xl mx-auto w-full px-6 py-10",
        children: [
          c.jsxs("div", {
            className: "mb-10",
            children: [
              c.jsx("p", {
                className:
                  "text-[10px] text-[#2a3848] tracking-[0.25em] uppercase mb-2",
                children: "— High-Stakes Browser",
              }),
              c.jsx("h1", {
                className:
                  "text-4xl font-bold tracking-tight uppercase text-slate-100",
                children: "The Rooms",
              }),
            ],
          }),
          c.jsxs("div", {
            className: "mb-10",
            children: [
              c.jsx("label", {
                className:
                  "block text-[10px] text-[#3a4a5a] tracking-[0.2em] uppercase mb-2",
                children: "Your Name",
              }),
              c.jsx("input", {
                className:
                  "w-72 bg-[#0c0e15] border border-[#1a1f2c] text-slate-200 rounded px-4 py-2.5 text-sm font-mono placeholder-[#252d3a] focus:outline-none focus:border-[#2a3848] transition-colors",
                placeholder: "ENTER NAME…",
                value: n,
                onChange: (f) => {
                  (r(f.target.value), s(""));
                },
              }),
              l &&
                c.jsx("p", {
                  className: "text-red-500 text-xs mt-1.5 font-mono",
                  children: l,
                }),
            ],
          }),
          c.jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
              e.length === 0 &&
                c.jsx("p", {
                  className:
                    "col-span-2 text-[#2a3848] text-xs tracking-[0.2em] uppercase font-mono",
                  children: "Syncing rooms…",
                }),
              e.map((f) => {
                const d = f.playerCount >= f.capacity,
                  m = f.status === "started",
                  g = d || m || !t || i === f.id,
                  v = J0[f.id] ?? X0,
                  x = m ? "IN PROGRESS" : d ? "FULL" : v.tag,
                  E = m ? "#7a2020" : d ? "#3a4a5a" : v.tagColor;
                return c.jsxs(
                  "div",
                  {
                    className: `rounded-lg overflow-hidden border border-[#1a1f2c] flex flex-col transition-opacity ${g ? "opacity-40" : "hover:border-[#252b3a] transition-colors"}`,
                    children: [
                      c.jsxs("div", {
                        className:
                          "h-36 relative flex flex-col justify-between p-4",
                        style: { background: v.gradient },
                        children: [
                          c.jsx("div", {
                            className: "absolute inset-0 opacity-5",
                            style: {
                              backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                              backgroundSize: "20px 20px",
                            },
                          }),
                          c.jsxs("div", {
                            className:
                              "relative z-10 flex items-start justify-between",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded border font-semibold",
                                style: {
                                  color: E,
                                  borderColor: `${E}60`,
                                  backgroundColor: `${E}15`,
                                },
                                children: x,
                              }),
                              c.jsxs("span", {
                                className:
                                  "font-mono text-[10px] text-[#2a3848]",
                                children: [f.playerCount, "/", f.capacity],
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className: "relative z-10",
                            children: c.jsx("h3", {
                              className:
                                "text-lg font-bold uppercase tracking-wide text-slate-200",
                              children: f.name,
                            }),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className:
                          "bg-[#0c0e15] p-4 flex flex-col gap-3 border-t border-[#1a1f2c]",
                        children: [
                          c.jsxs("div", {
                            children: [
                              c.jsxs("p", {
                                className:
                                  "font-mono text-base font-semibold text-slate-300",
                                children: [
                                  "$",
                                  f.startingMoney.toLocaleString(),
                                  " ",
                                  c.jsx("span", {
                                    className:
                                      "text-[#3a4a5a] text-xs font-normal tracking-widest",
                                    children: "START",
                                  }),
                                ],
                              }),
                              c.jsxs("p", {
                                className:
                                  "text-[10px] text-[#2a3848] tracking-[0.15em] uppercase mt-0.5",
                                children: [f.capacity, " Player Max"],
                              }),
                            ],
                          }),
                          c.jsx("button", {
                            disabled: g,
                            onClick: () => u(f.id),
                            className:
                              "w-full text-[10px] font-semibold tracking-[0.2em] uppercase py-2.5 rounded border transition-colors disabled:cursor-not-allowed border-[#1e2230] text-[#3a4a5a] hover:border-[#2a3848] hover:text-slate-400 disabled:border-[#12151e] disabled:text-[#1e2530]",
                            children:
                              i === f.id
                                ? "JOINING…"
                                : m
                                  ? "IN PROGRESS"
                                  : d
                                    ? "ROOM FULL"
                                    : "JOIN ROOM",
                          }),
                        ],
                      }),
                    ],
                  },
                  f.id,
                );
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function eg() {
  const {
      myPlayerId: e,
      lobbyPlayers: t,
      lobbyHostId: n,
      currentGameId: r,
      availableRooms: i,
      leaveRoom: o,
    } = Pr(),
    l = En(),
    s = n === e,
    a = i.find((g) => g.id === r),
    u = (a == null ? void 0 : a.capacity) ?? 4,
    f = Math.max(0, u - t.length),
    d = [
      { user: "SYS", msg: "Room initialized. Awaiting nodes." },
      ...t.map((g, v) => ({
        user: `NODE_${String(v + 1).padStart(2, "0")}`,
        msg: `${g.name}: Connected.`,
      })),
    ];
  function m() {
    r && l.emit("startGame", { gameId: r });
  }
  return c.jsxs("div", {
    className: "min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col",
    children: [
      c.jsxs("header", {
        className:
          "border-b border-[#1a1f2c] px-6 h-14 flex items-center justify-between shrink-0",
        children: [
          c.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              c.jsx("div", {
                className:
                  "w-8 h-8 border border-[#1e2230] rounded flex items-center justify-center",
                children: c.jsx("span", {
                  className: "text-xs font-bold text-slate-400",
                  children: "T",
                }),
              }),
              c.jsx("span", {
                className:
                  "font-bold tracking-[0.18em] text-xs uppercase text-slate-300",
                children: "NOPOLY",
              }),
            ],
          }),
          c.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              c.jsxs("div", {
                className: "text-right",
                children: [
                  c.jsx("p", {
                    className:
                      "text-[10px] text-[#2a3848] tracking-[0.2em] uppercase",
                    children: "Lobby ID",
                  }),
                  c.jsx("p", {
                    className: "font-mono text-xs text-[#3a4a5a] mt-0.5",
                    children: r,
                  }),
                ],
              }),
              c.jsx("button", {
                className:
                  "text-[10px] text-[#2a3848] hover:text-red-600 tracking-[0.15em] uppercase transition-colors",
                onClick: o,
                children: "EXIT",
              }),
            ],
          }),
        ],
      }),
      c.jsxs("div", {
        className: "flex-1 flex flex-col md:flex-row relative overflow-hidden",
        children: [
          c.jsxs("div", {
            className:
              "flex-1 flex flex-col items-center justify-center px-6 py-12 gap-12 relative",
            children: [
              c.jsx("div", {
                className:
                  "absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden",
                children: c.jsx("h1", {
                  className:
                    "text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] uppercase whitespace-nowrap",
                  style: { color: "#0f1218" },
                  children: "WAITING FOR PLAYERS",
                }),
              }),
              c.jsxs("div", {
                className: "relative z-10 flex flex-wrap justify-center gap-4",
                children: [
                  t.map((g) => {
                    const v = g.id === e,
                      x = g.id === n;
                    return c.jsxs(
                      "div",
                      {
                        className:
                          "bg-[#0c0e15] border border-[#1e2230] rounded-xl flex flex-col items-center gap-3 p-5 w-36",
                        style: v ? { borderColor: "#1e3a30" } : {},
                        children: [
                          c.jsx("div", {
                            className:
                              "w-16 h-16 rounded-lg bg-[#0a0c12] border border-[#1a2030] flex items-center justify-center text-4xl",
                            children: g.token,
                          }),
                          c.jsx("p", {
                            className:
                              "text-xs font-semibold text-slate-300 text-center truncate w-full",
                            children: g.name,
                          }),
                          c.jsxs("div", {
                            className: "flex flex-wrap justify-center gap-1",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-[#1e3a30] text-[#2a7a5a]",
                                children: "READY",
                              }),
                              x &&
                                c.jsx("span", {
                                  className:
                                    "text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-[#1e2230] text-[#3a4a5a]",
                                  children: "HOST",
                                }),
                            ],
                          }),
                        ],
                      },
                      g.id,
                    );
                  }),
                  Array.from({ length: f }).map((g, v) =>
                    c.jsxs(
                      "div",
                      {
                        className:
                          "bg-[#0a0c12] border border-[#14181f] border-dashed rounded-xl w-36 flex flex-col items-center justify-center gap-2 p-5",
                        style: { height: "168px" },
                        children: [
                          c.jsx("span", {
                            className: "text-[#1e2530] text-2xl font-light",
                            children: "+",
                          }),
                          c.jsx("span", {
                            className:
                              "text-[10px] text-[#1e2530] tracking-[0.15em] uppercase",
                            children: "WAITING",
                          }),
                        ],
                      },
                      `empty-${v}`,
                    ),
                  ),
                ],
              }),
              c.jsx("div", {
                className:
                  "relative z-10 flex flex-col items-center gap-4 w-full max-w-xs",
                children: s
                  ? t.length >= 2
                    ? c.jsx("button", {
                        className:
                          "w-full py-3.5 rounded-full border border-[#2a3848] text-slate-300 text-xs font-semibold tracking-[0.25em] uppercase hover:border-[#3a5060] hover:text-slate-200 transition-colors",
                        onClick: m,
                        children: "START",
                      })
                    : c.jsx("p", {
                        className:
                          "text-[10px] text-[#2a3848] tracking-[0.2em] uppercase text-center",
                        children: "Need at least 2 players to start",
                      })
                  : c.jsx("p", {
                      className:
                        "text-[10px] text-[#2a3848] tracking-[0.2em] uppercase text-center",
                      children: "Waiting for host to start",
                    }),
              }),
            ],
          }),
          c.jsxs("div", {
            className:
              "md:absolute md:bottom-6 md:left-6 w-full md:w-72 bg-[#0c0e15] border border-[#1a1f2c] rounded-lg overflow-hidden shrink-0",
            children: [
              c.jsxs("div", {
                className:
                  "flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1f2c]",
                children: [
                  c.jsx("div", {
                    className: "w-1.5 h-1.5 rounded-full bg-[#1e3028]",
                  }),
                  c.jsx("span", {
                    className:
                      "text-[10px] tracking-[0.2em] uppercase text-[#3a4a5a]",
                    children: "Comms Link",
                  }),
                ],
              }),
              c.jsx("div", {
                className:
                  "px-4 py-3 flex flex-col gap-2 max-h-36 overflow-y-auto",
                children: d.map((g, v) =>
                  c.jsxs(
                    "p",
                    {
                      className:
                        "text-xs text-[#3a4a5a] leading-relaxed font-mono",
                      children: [
                        c.jsx("span", {
                          className: "text-[#2a5040]",
                          children: g.user,
                        }),
                        ": ",
                        c.jsx("span", {
                          className: "text-[#3a4a5a]",
                          children: g.msg,
                        }),
                      ],
                    },
                    v,
                  ),
                ),
              }),
              c.jsx("div", {
                className: "px-3 py-2 border-t border-[#1a1f2c]",
                children: c.jsx("input", {
                  className:
                    "w-full bg-transparent text-xs text-[#2a3848] placeholder-[#1e2530] focus:outline-none font-mono",
                  placeholder: "Transmit…",
                  readOnly: !0,
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const tg = {
    Brown: "#4a1c08",
    "Light Blue": "#073858",
    Pink: "#4a0720",
    Orange: "#4a2308",
    Red: "#4a0808",
    Yellow: "#3a3200",
    Green: "#084a08",
    "Dark Blue": "#08083a",
  },
  _u = ["#e05050", "#5070e0", "#40b858", "#d09030", "#b050d0", "#d05090"],
  _d = new Set([0, 10, 20, 30]);
function ng(e) {
  return e <= 10
    ? { row: 10, col: 10 - e }
    : e <= 20
      ? { row: 20 - e, col: 0 }
      : e <= 30
        ? { row: 0, col: e - 20 }
        : { row: e - 30, col: 10 };
}
function rg(e) {
  return _d.has(e)
    ? "0deg"
    : e < 10
      ? "180deg"
      : e < 20
        ? "-90deg"
        : e < 30
          ? "0deg"
          : "90deg";
}
function ig(e, t) {
  switch (e) {
    case "go":
      return "↗";
    case "jail":
      return "⛓";
    case "free_parking":
      return "◌";
    case "go_to_jail":
      return "⊗";
    case "chance":
      return "?";
    case "community_chest":
      return "⊞";
    case "tax":
      return t.includes("Income") ? "%" : "$";
    case "railroad":
      return "▷";
    case "utility":
      return t.includes("Electric") ? "⚡" : "~";
    default:
      return "";
  }
}
function og(e) {
  return e
    .replace("Avenue", "Ave")
    .replace("Railroad", "RR")
    .replace("Place", "Pl")
    .replace("Gardens", "Gdn")
    .replace(" Company", "")
    .replace("Mediterranean", "Med")
    .replace("Pennsylvania", "Penn")
    .replace("Connecticut", "CT")
    .replace("North Carolina", "NC");
}
function lg({ space: e, playersHere: t, playerColor: n, ownerColor: r }) {
  const { row: i, col: o } = ng(e.position),
    l = rg(e.position),
    s = _d.has(e.position),
    a = e.colorGroup ? (tg[e.colorGroup] ?? null) : null,
    u = s ? "0.5cqw" : "0.3cqw",
    f = s ? "clamp(8px,1.8cqw,18px)" : "clamp(5px,1.1cqw,12px)",
    d = s ? "clamp(14px,3cqw,36px)" : "clamp(9px,1.8cqw,20px)",
    m = "clamp(6px,1.1cqw,12px)",
    g = "clamp(4px,0.85cqw,10px)",
    v = "clamp(10px,1.8cqw,22px)",
    x = "clamp(4px,1cqw,12px)",
    E = "clamp(5px,1.2cqw,15px)";
  return c.jsx("div", {
    style: {
      gridRow: i + 1,
      gridColumn: o + 1,
      backgroundColor: "#0c0e15",
      border: "1px solid #1a1f2c",
      overflow: "hidden",
    },
    children: c.jsxs("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `rotate(${l})`,
        padding: u,
        boxSizing: "border-box",
      },
      children: [
        a
          ? c.jsx("div", {
              style: {
                width: "100%",
                height: "22%",
                minHeight: "6%",
                flexShrink: 0,
                backgroundColor: a,
                border: r
                  ? `2px solid ${r}`
                  : "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.2cqw",
              },
              children: e.hasHotel
                ? c.jsx("div", {
                    style: {
                      width: E,
                      height: E,
                      background: "#9a2020",
                      borderRadius: "1px",
                      flexShrink: 0,
                    },
                  })
                : Array.from({ length: e.houses }).map((h, p) =>
                    c.jsx(
                      "div",
                      {
                        style: {
                          width: x,
                          height: x,
                          background: "#1a7a1a",
                          borderRadius: "1px",
                          flexShrink: 0,
                        },
                      },
                      p,
                    ),
                  ),
            })
          : c.jsxs("div", {
              style: {
                fontSize: d,
                lineHeight: 1.1,
                textAlign: "center",
                color: s ? "#607080" : "#3a4a58",
                fontWeight: s ? 700 : 400,
              },
              children: [
                ig(e.type, e.name),
                s &&
                  c.jsxs("div", {
                    style: {
                      fontSize: m,
                      marginTop: "0.3cqw",
                      fontWeight: 700,
                      color: "#7080a0",
                      letterSpacing: "0.05em",
                    },
                    children: [
                      e.type === "go" && "ORIGIN",
                      e.type === "jail" && "DETENTION",
                      e.type === "free_parking" && "RESPITE",
                      e.type === "go_to_jail" && "LOCKDOWN",
                    ],
                  }),
              ],
            }),
        c.jsx("div", {
          style: {
            fontSize: f,
            lineHeight: 1.2,
            textAlign: "center",
            color: "#506070",
            fontWeight: 500,
            wordBreak: "break-word",
            overflow: "hidden",
            maxHeight: "40%",
            padding: "0 0.2cqw",
            letterSpacing: "0.02em",
          },
          children: og(e.name),
        }),
        (e.price || e.taxAmount) &&
          c.jsxs("div", {
            style: {
              fontSize: g,
              color: "#354050",
              fontWeight: 500,
              fontFamily: "monospace",
            },
            children: ["$", e.price ?? e.taxAmount],
          }),
        t.length > 0 &&
          c.jsx("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "0.2cqw",
              justifyContent: "center",
            },
            children: t.map((h) =>
              c.jsx(
                "div",
                {
                  title: h.name,
                  style: {
                    width: v,
                    height: v,
                    borderRadius: "50%",
                    backgroundColor: n(h.id),
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: `calc(${v} * 0.6)`,
                    flexShrink: 0,
                    lineHeight: 1,
                  },
                  children: h.token,
                },
                h.id,
              ),
            ),
          }),
      ],
    }),
  });
}
function sg({ spaces: e, players: t, playerDisplayPositions: n }) {
  function r(o) {
    const l = t.findIndex((s) => s.id === o);
    return _u[l % _u.length] ?? "#4a5a6a";
  }
  function i(o) {
    return o.ownerId ? r(o.ownerId) : null;
  }
  return c.jsxs("div", {
    style: {
      containerType: "inline-size",
      display: "grid",
      gridTemplateColumns: "repeat(11, 1fr)",
      gridTemplateRows: "repeat(11, 1fr)",
      width: "100%",
      height: "100%",
      aspectRatio: "1 / 1",
      border: "2px solid #1a1f2c",
      backgroundColor: "#0a0c12",
    },
    children: [
      e.map((o) =>
        c.jsx(
          lg,
          {
            space: o,
            playersHere: t.filter(
              (l) => (n[l.id] ?? l.position) === o.position && !l.isBankrupt,
            ),
            playerColor: r,
            ownerColor: i(o),
          },
          o.position,
        ),
      ),
      c.jsxs("div", {
        style: {
          gridRow: "2 / 11",
          gridColumn: "2 / 11",
          backgroundColor: "#0a0c12",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5%",
          pointerEvents: "none",
          userSelect: "none",
        },
        children: [
          c.jsx("div", {
            style: {
              fontSize: "clamp(14px,3.5cqw,42px)",
              fontWeight: 900,
              color: "#12151e",
              transform: "rotate(-45deg)",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
            },
            children: "NOPOLY",
          }),
          c.jsxs("div", {
            style: { display: "flex", gap: "6%", width: "60%" },
            children: [
              c.jsxs("div", {
                style: {
                  flex: 1,
                  aspectRatio: "2/3",
                  backgroundColor: "#0f1117",
                  border: "1px solid #1a2030",
                  borderRadius: "3px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8%",
                },
                children: [
                  c.jsx("span", {
                    style: {
                      fontSize: "clamp(8px,1.8cqw,20px)",
                      color: "#253545",
                    },
                    children: "⟐",
                  }),
                  c.jsx("span", {
                    style: {
                      fontSize: "clamp(4px,1cqw,11px)",
                      color: "#1e2a38",
                      letterSpacing: "0.15em",
                      fontWeight: 700,
                    },
                    children: "CHANCE",
                  }),
                ],
              }),
              c.jsxs("div", {
                style: {
                  flex: 1,
                  aspectRatio: "2/3",
                  backgroundColor: "#0f1117",
                  border: "1px solid #1a2030",
                  borderRadius: "3px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8%",
                },
                children: [
                  c.jsx("span", {
                    style: {
                      fontSize: "clamp(8px,1.8cqw,20px)",
                      color: "#253545",
                    },
                    children: "⬡",
                  }),
                  c.jsx("span", {
                    style: {
                      fontSize: "clamp(4px,1cqw,11px)",
                      color: "#1e2a38",
                      letterSpacing: "0.15em",
                      fontWeight: 700,
                    },
                    children: "VAULT",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const ag = {
    Brown: "#2d1005",
    "Light Blue": "#052535",
    Pink: "#2d0518",
    Orange: "#2d1605",
    Red: "#2d0505",
    Yellow: "#222000",
    Green: "#052005",
    "Dark Blue": "#050520",
  },
  ug = {
    Brown: "#9a5020",
    "Light Blue": "#3090c0",
    Pink: "#c04070",
    Orange: "#c07020",
    Red: "#c03030",
    Yellow: "#b0a010",
    Green: "#30a040",
    "Dark Blue": "#3050c0",
  };
function cg({
  space: e,
  canBuy: t,
  playerMoney: n,
  onBuy: r,
  onDecline: i,
  onClose: o,
}) {
  var g;
  const l = n !== void 0 ? n >= (e.price ?? 0) : !0,
    s = e.colorGroup ? (ag[e.colorGroup] ?? "#0f1117") : "#0f1117",
    a = e.colorGroup ? (ug[e.colorGroup] ?? "#4a6080") : "#4a6080",
    u =
      e.colorGroup ??
      (e.type === "railroad"
        ? "Railroad"
        : e.type === "utility"
          ? "Utility"
          : "Property"),
    f =
      ((g = e.rentLevels) == null ? void 0 : g[0]) ??
      (e.type === "railroad" ? 25 : null),
    d = e.rentLevels
      ? `×${(e.rentLevels[1] / (e.rentLevels[0] || 1)).toFixed(1)}`
      : e.type === "railroad"
        ? "×2 / RR"
        : e.type === "utility"
          ? "4× / 10×"
          : null,
    m = e.mortgageValue;
  return c.jsx("div", {
    className:
      "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4",
    children: c.jsxs("div", {
      className:
        "bg-[#0f1117] border border-[#1e2230] rounded-xl shadow-2xl w-72 overflow-hidden",
      children: [
        c.jsxs("div", {
          className: "px-5 pt-5 pb-4",
          style: { backgroundColor: s, borderBottom: `1px solid ${a}30` },
          children: [
            c.jsx("p", {
              className: "text-xs tracking-[0.2em] uppercase mb-2",
              style: { color: a },
              children: u,
            }),
            c.jsx("h2", {
              className:
                "text-xl font-bold uppercase tracking-wide text-slate-100",
              children: e.name,
            }),
            e.price &&
              c.jsxs("p", {
                className: "font-mono text-sm mt-1",
                style: { color: a },
                children: ["$", e.price],
              }),
          ],
        }),
        c.jsx("div", {
          className: "px-5 py-4 border-b border-[#1a1f2c]",
          children: c.jsxs("div", {
            className: "flex flex-col gap-3",
            children: [
              f !== null &&
                c.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    c.jsx("span", {
                      className:
                        "text-xs tracking-[0.15em] uppercase text-slate-600",
                      children: "Base Yield",
                    }),
                    c.jsxs("span", {
                      className: "font-mono text-sm text-slate-300",
                      children: ["$", f],
                    }),
                  ],
                }),
              d &&
                c.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    c.jsx("span", {
                      className:
                        "text-xs tracking-[0.15em] uppercase text-slate-600",
                      children: "Multiplier",
                    }),
                    c.jsx("span", {
                      className: "font-mono text-sm text-slate-300",
                      children: d,
                    }),
                  ],
                }),
              m &&
                c.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    c.jsx("span", {
                      className:
                        "text-xs tracking-[0.15em] uppercase text-slate-600",
                      children: "Liquidation",
                    }),
                    c.jsxs("span", {
                      className: "font-mono text-sm text-slate-300",
                      children: ["$", m],
                    }),
                  ],
                }),
              e.rentLevels &&
                c.jsxs("div", {
                  className:
                    "border-t border-[#1a1f2c] pt-3 flex flex-col gap-1.5",
                  children: [
                    [1, 2, 3, 4].map((v) =>
                      c.jsxs(
                        "div",
                        {
                          className: "flex justify-between",
                          children: [
                            c.jsxs("span", {
                              className: "text-xs text-[#2a3848]",
                              children: [v, " house", v > 1 ? "s" : ""],
                            }),
                            c.jsxs("span", {
                              className: "font-mono text-xs text-slate-600",
                              children: ["$", e.rentLevels[v + 1]],
                            }),
                          ],
                        },
                        v,
                      ),
                    ),
                    c.jsxs("div", {
                      className: "flex justify-between",
                      children: [
                        c.jsx("span", {
                          className: "text-xs text-[#2a3848]",
                          children: "Hotel",
                        }),
                        c.jsxs("span", {
                          className: "font-mono text-xs text-slate-600",
                          children: ["$", e.rentLevels[6]],
                        }),
                      ],
                    }),
                  ],
                }),
              e.type === "railroad" &&
                c.jsx("div", {
                  className:
                    "border-t border-[#1a1f2c] pt-3 flex flex-col gap-1",
                  children: [25, 50, 100, 200].map((v, x) =>
                    c.jsxs(
                      "div",
                      {
                        className: "flex justify-between",
                        children: [
                          c.jsxs("span", {
                            className: "text-xs text-[#2a3848]",
                            children: [x + 1, " railroad", x > 0 ? "s" : ""],
                          }),
                          c.jsxs("span", {
                            className: "font-mono text-xs text-slate-600",
                            children: ["$", v],
                          }),
                        ],
                      },
                      x,
                    ),
                  ),
                }),
              e.type === "utility" &&
                c.jsxs("div", {
                  className:
                    "border-t border-[#1a1f2c] pt-3 flex flex-col gap-1",
                  children: [
                    c.jsxs("div", {
                      className: "flex justify-between",
                      children: [
                        c.jsx("span", {
                          className: "text-xs text-[#2a3848]",
                          children: "1 utility",
                        }),
                        c.jsx("span", {
                          className: "font-mono text-xs text-slate-600",
                          children: "4× roll",
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "flex justify-between",
                      children: [
                        c.jsx("span", {
                          className: "text-xs text-[#2a3848]",
                          children: "Both owned",
                        }),
                        c.jsx("span", {
                          className: "font-mono text-xs text-slate-600",
                          children: "10× roll",
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
        }),
        c.jsx("div", {
          className: "px-5 py-4 flex gap-3",
          children: t
            ? c.jsxs(c.Fragment, {
                children: [
                  c.jsx("button", {
                    disabled: !l,
                    onClick: l ? r : void 0,
                    className:
                      "flex-1 py-2.5 rounded border text-xs font-semibold tracking-[0.15em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-slate-500 text-slate-200 hover:border-slate-300 hover:text-white disabled:border-slate-800 disabled:text-slate-700",
                    title: l ? void 0 : "Insufficient funds",
                    children: "Acquire",
                  }),
                  c.jsx("button", {
                    onClick: i,
                    className:
                      "flex-1 py-2.5 rounded border border-[#1e2230] text-[#3a4a5a] text-xs font-semibold tracking-[0.15em] uppercase hover:border-red-900 hover:text-red-500 transition-colors",
                    children: "Decline",
                  }),
                ],
              })
            : c.jsx("button", {
                onClick: o,
                className:
                  "w-full py-2.5 rounded border border-[#1e2230] text-slate-500 text-xs font-semibold tracking-[0.15em] uppercase hover:border-slate-600 hover:text-slate-400 transition-colors",
                children: "Close",
              }),
        }),
      ],
    }),
  });
}
function fg({ deck: e, card: t, playerName: n, onClose: r }) {
  const i = e === "chance",
    o = i ? "Chance" : "Community",
    l = i ? "⟐" : "⊞",
    s = i ? "#3060a0" : "#207050",
    a = i ? "#05102a" : "#051a10";
  return c.jsx("div", {
    className:
      "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4",
    onClick: r,
    children: c.jsxs("div", {
      className:
        "bg-[#0f1117] rounded-xl shadow-2xl max-w-sm w-full overflow-hidden",
      style: { border: `1px solid ${s}50` },
      onClick: (u) => u.stopPropagation(),
      children: [
        c.jsxs("div", {
          className: "px-6 py-5 flex items-center gap-4",
          style: { backgroundColor: a, borderBottom: `1px solid ${s}30` },
          children: [
            c.jsx("div", {
              className:
                "w-10 h-10 rounded border flex items-center justify-center text-xl shrink-0",
              style: { borderColor: `${s}60`, color: s },
              children: l,
            }),
            c.jsxs("div", {
              children: [
                c.jsx("p", {
                  className:
                    "font-bold text-slate-200 tracking-wide uppercase text-sm",
                  children: o,
                }),
                c.jsxs("p", {
                  className: "text-xs tracking-widest uppercase mt-0.5",
                  style: { color: s },
                  children: [n, " drew a card"],
                }),
              ],
            }),
          ],
        }),
        c.jsx("div", {
          className: "px-6 py-6",
          children: c.jsx("p", {
            className: "text-slate-300 text-sm leading-relaxed text-center",
            children: t.description,
          }),
        }),
        c.jsx("div", {
          className: "px-6 pb-5 flex justify-center",
          children: c.jsx("button", {
            className:
              "px-8 py-2.5 rounded border border-[#1e2230] text-slate-400 text-xs font-semibold tracking-[0.15em] uppercase hover:border-slate-500 hover:text-slate-300 transition-colors",
            onClick: r,
            children: "Acknowledge",
          }),
        }),
      ],
    }),
  });
}
const dg = {
  Brown: "#7a3510",
  "Light Blue": "#1a6080",
  Pink: "#803060",
  Orange: "#805010",
  Red: "#802020",
  Yellow: "#706800",
  Green: "#207020",
  "Dark Blue": "#1020a0",
};
function pg() {
  var N;
  const {
      gameState: e,
      myPlayerId: t,
      pendingPropertyLanded: n,
      lastRentPaid: r,
      lastCardDrawn: i,
      clearPendingProperty: o,
      clearRentPaid: l,
      clearCardDrawn: s,
      playerDisplayPositions: a,
      leaveRoom: u,
    } = Pr(),
    f = En(),
    [d, m] = w.useState(() =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1,
      }),
    );
  if (
    (w.useEffect(() => {
      const k = setInterval(
        () =>
          m(
            new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: !1,
            }),
          ),
        6e4,
      );
      return () => clearInterval(k);
    }, []),
    w.useEffect(() => {
      if (!r) return;
      const k = setTimeout(l, 3e3);
      return () => clearTimeout(k);
    }, [r, l]),
    !e)
  )
    return c.jsx("div", {
      className: "min-h-screen bg-[#0a0c10] flex items-center justify-center",
      children: c.jsx("span", {
        className:
          "text-[10px] text-[#2a3848] tracking-[0.2em] uppercase font-mono",
        children: "Loading…",
      }),
    });
  const g = e.players.find((k) => k.id === t),
    v = e.players[e.currentPlayerIndex],
    x = (v == null ? void 0 : v.id) === t;
  function E(k, C) {
    f.emit(k, { gameId: e.gameId, ...C });
  }
  const h = n !== null && n.playerId === t,
    p = x && e.diceRoll && !e.lastDiceRollWasDoubles && !h,
    y =
      x &&
      !(g != null && g.inJail) &&
      (!e.diceRoll || e.lastDiceRollWasDoubles),
    S = e.board.filter((k) => k.ownerId === t);
  return c.jsxs("div", {
    className:
      "flex flex-col h-screen bg-[#0a0c10] text-slate-100 overflow-hidden",
    children: [
      c.jsxs("header", {
        className:
          "shrink-0 flex items-center border-b border-[#1a1f2c] px-5 h-12 gap-4",
        children: [
          c.jsxs("div", {
            className: "flex items-center gap-2.5 shrink-0",
            children: [
              c.jsx("div", {
                className:
                  "w-7 h-7 border border-[#1e2230] rounded flex items-center justify-center",
                children: c.jsx("span", {
                  className: "text-[10px] font-bold text-slate-500",
                  children: "T",
                }),
              }),
              c.jsx("span", {
                className:
                  "font-bold tracking-[0.18em] text-[10px] uppercase text-slate-500 hidden sm:block",
                children: "NOPOLY",
              }),
            ],
          }),
          c.jsxs("div", {
            className: "flex items-center gap-3 ml-1",
            children: [
              c.jsx("span", {
                className: "font-mono text-xs text-[#3a4a5a]",
                children: d,
              }),
              g &&
                c.jsxs("span", {
                  className: "font-mono text-sm font-semibold text-slate-300",
                  children: ["$", g.money.toLocaleString()],
                }),
              e.diceRoll &&
                c.jsxs("div", {
                  className:
                    "flex items-center gap-1 font-mono text-xs text-[#2a3848]",
                  children: [
                    c.jsx("span", {
                      className:
                        "bg-[#0f1117] border border-[#1a1f2c] px-1.5 py-0.5 rounded text-slate-400",
                      children: e.diceRoll[0],
                    }),
                    c.jsx("span", { children: "+" }),
                    c.jsx("span", {
                      className:
                        "bg-[#0f1117] border border-[#1a1f2c] px-1.5 py-0.5 rounded text-slate-400",
                      children: e.diceRoll[1],
                    }),
                    e.lastDiceRollWasDoubles &&
                      c.jsx("span", {
                        className:
                          "text-[#2a5040] tracking-widest uppercase text-[10px] ml-1",
                        children: "×2",
                      }),
                  ],
                }),
            ],
          }),
          c.jsx("div", { className: "flex-1" }),
          c.jsxs("nav", {
            className:
              "hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] uppercase",
            children: [
              c.jsx("span", {
                className: `font-semibold ${x ? "text-[#2a6050]" : "text-[#2a3848]"}`,
                children: x
                  ? "Your Turn"
                  : `${v == null ? void 0 : v.name}'s Turn`,
              }),
              c.jsx("button", {
                className:
                  "text-[#2a3848] hover:text-red-600 transition-colors",
                onClick: () => {
                  ($i(), u());
                },
                children: "Exit",
              }),
            ],
          }),
          p &&
            c.jsx("button", {
              className:
                "text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors shrink-0 ml-2",
              onClick: () => E("endTurn"),
              children: "End Turn",
            }),
          g &&
            c.jsx("div", {
              className:
                "w-7 h-7 rounded-full bg-[#0f1117] border border-[#1e2230] flex items-center justify-center text-sm shrink-0",
              children: g.token,
            }),
        ],
      }),
      c.jsxs("div", {
        className: "flex flex-1 min-h-0",
        children: [
          c.jsxs("aside", {
            className:
              "hidden md:flex flex-col w-52 shrink-0 border-r border-[#1a1f2c] overflow-y-auto",
            children: [
              c.jsxs("div", {
                children: [
                  c.jsx("p", {
                    className:
                      "text-[10px] text-[#2a3848] tracking-[0.25em] uppercase px-4 py-2.5 border-b border-[#1a1f2c]",
                    children: "Registry",
                  }),
                  c.jsx("div", {
                    className: "divide-y divide-[#1a1f2c]",
                    children: e.players.map((k) => {
                      const C = k.id === (v == null ? void 0 : v.id),
                        P = k.id === t;
                      return c.jsxs(
                        "div",
                        {
                          className: `px-4 py-3 flex items-start gap-3 ${k.isBankrupt ? "opacity-25" : ""}`,
                          children: [
                            c.jsx("div", {
                              className:
                                "w-7 h-7 rounded border flex items-center justify-center text-sm shrink-0",
                              style: {
                                borderColor: C ? "#1e3a30" : "#1a1f2c",
                                backgroundColor: C ? "#0a1810" : "#0c0e15",
                              },
                              children: k.token,
                            }),
                            c.jsxs("div", {
                              className: "flex-1 min-w-0",
                              children: [
                                c.jsxs("div", {
                                  className: "flex items-center gap-1",
                                  children: [
                                    c.jsx("p", {
                                      className:
                                        "text-xs font-semibold truncate",
                                      style: {
                                        color: C ? "#3a8060" : "#4a5a70",
                                      },
                                      children: k.name,
                                    }),
                                    P &&
                                      c.jsx("span", {
                                        className:
                                          "text-[10px] text-[#2a3848] shrink-0",
                                        children: "you",
                                      }),
                                  ],
                                }),
                                c.jsxs("p", {
                                  className: "font-mono text-xs mt-0.5",
                                  style: { color: C ? "#c0d0c8" : "#2a3848" },
                                  children: ["$", k.money.toLocaleString()],
                                }),
                                c.jsx("p", {
                                  className:
                                    "text-[10px] tracking-[0.15em] uppercase mt-0.5",
                                  style: { color: C ? "#2a6050" : "#1e2a38" },
                                  children: k.isBankrupt
                                    ? "BANKRUPT"
                                    : k.inJail
                                      ? "DETAINED"
                                      : C
                                        ? "ACTIVE"
                                        : "IDLE",
                                }),
                              ],
                            }),
                            C &&
                              c.jsx("div", {
                                className:
                                  "w-1 h-1 rounded-full bg-[#2a6050] shrink-0 mt-1.5",
                              }),
                          ],
                        },
                        k.id,
                      );
                    }),
                  }),
                ],
              }),
              S.length > 0 &&
                c.jsxs("div", {
                  className: "border-t border-[#1a1f2c]",
                  children: [
                    c.jsx("p", {
                      className:
                        "text-[10px] text-[#2a3848] tracking-[0.25em] uppercase px-4 py-2.5 border-b border-[#1a1f2c]",
                      children: "Assets",
                    }),
                    c.jsx("div", {
                      className: "divide-y divide-[#14181f]",
                      children: S.map((k) =>
                        c.jsxs(
                          "div",
                          {
                            className: "px-4 py-2 flex items-center gap-2",
                            children: [
                              k.colorGroup &&
                                c.jsx("div", {
                                  className: "w-0.5 h-4 rounded-full shrink-0",
                                  style: {
                                    backgroundColor:
                                      dg[k.colorGroup] ?? "#3a4a5a",
                                  },
                                }),
                              c.jsx("p", {
                                className:
                                  "text-xs text-[#3a4a5a] flex-1 truncate",
                                children: k.name,
                              }),
                              c.jsxs("p", {
                                className:
                                  "font-mono text-[10px] text-[#2a3848] shrink-0",
                                children: ["$", k.price],
                              }),
                            ],
                          },
                          k.position,
                        ),
                      ),
                    }),
                  ],
                }),
              x &&
                (g == null ? void 0 : g.inJail) &&
                c.jsxs("div", {
                  className:
                    "border-t border-[#1a1f2c] px-3 py-3 flex flex-col gap-2 mt-auto",
                  children: [
                    c.jsx("button", {
                      className:
                        "text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a4038] hover:text-[#3a7060] transition-colors",
                      onClick: () => E("payJailFine"),
                      children: "Pay $50 Fine",
                    }),
                    g.getOutOfJailCards > 0 &&
                      c.jsx("button", {
                        className:
                          "text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a4038] hover:text-[#3a7060] transition-colors",
                        onClick: () => E("useJailCard"),
                        children: "Use GOOJF Card",
                      }),
                    c.jsx("button", {
                      className:
                        "text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-red-900/60 hover:text-red-600 transition-colors",
                      onClick: () => E("rollDice"),
                      children: "Try Doubles",
                    }),
                  ],
                }),
            ],
          }),
          c.jsx("main", {
            className:
              "flex-1 min-w-0 flex items-center justify-center p-3 overflow-hidden relative",
            children: c.jsxs("div", {
              className: "relative",
              style: {
                width: "100%",
                maxWidth: "calc(100vh - 80px)",
                aspectRatio: "1 / 1",
              },
              children: [
                c.jsx(sg, {
                  spaces: e.board,
                  players: e.players,
                  playerDisplayPositions: a,
                }),
                y &&
                  c.jsx("div", {
                    className:
                      "absolute inset-0 flex items-center justify-center pointer-events-none",
                    children: c.jsxs("button", {
                      className:
                        "bg-[#0c0e15]/90 hover:bg-[#111520] border border-[#1e2230] hover:border-[#2a3848] rounded-xl px-8 py-5 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#3a5060] hover:text-slate-400 transition-all pointer-events-auto shadow-2xl backdrop-blur-sm",
                      onClick: () => E("rollDice"),
                      children: [
                        "Roll Dice",
                        e.lastDiceRollWasDoubles &&
                          c.jsx("span", {
                            className:
                              "block text-[10px] text-[#2a6050] font-normal mt-1 text-center tracking-widest",
                            children: "Doubles — Roll Again",
                          }),
                      ],
                    }),
                  }),
              ],
            }),
          }),
          c.jsxs("aside", {
            className:
              "hidden md:flex flex-col w-64 shrink-0 border-l border-[#1a1f2c]",
            children: [
              c.jsxs("div", {
                className:
                  "flex items-center justify-between px-4 py-2.5 border-b border-[#1a1f2c] shrink-0",
                children: [
                  c.jsx("p", {
                    className:
                      "text-[10px] text-[#2a3848] tracking-[0.25em] uppercase",
                    children: "Transmission Log",
                  }),
                  c.jsxs("span", {
                    className: "font-mono text-[10px] text-[#1e2530]",
                    children: [String(e.log.length).padStart(3, "0"), ":R"],
                  }),
                ],
              }),
              c.jsx("div", {
                className:
                  "flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3",
                children: [...e.log]
                  .reverse()
                  .map((k, C) =>
                    c.jsxs(
                      "div",
                      {
                        className:
                          "flex gap-2.5 border-b border-[#10131a] pb-2.5 last:border-0",
                        children: [
                          c.jsx("span", {
                            className:
                              "font-mono text-[10px] text-[#1e2530] shrink-0 mt-0.5 pt-px",
                            children: String(e.log.length - C).padStart(3, "0"),
                          }),
                          c.jsx("p", {
                            className: "text-xs text-[#3a4a5a] leading-relaxed",
                            children: k,
                          }),
                        ],
                      },
                      C,
                    ),
                  ),
              }),
              c.jsx("div", {
                className: "shrink-0 border-t border-[#1a1f2c] p-3",
                children: c.jsxs("button", {
                  className:
                    "w-full flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase py-2.5 rounded border border-[#1a1f2c] text-[#2a3848] hover:border-[#1e2a38] hover:text-[#3a4a5a] transition-colors",
                  children: [
                    c.jsx("span", { className: "font-mono", children: "⇄" }),
                    c.jsx("span", { children: "Initiate Transfer" }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      c.jsxs("div", {
        className:
          "shrink-0 border-t border-[#1a1f2c] px-5 h-9 flex items-center justify-between",
        children: [
          c.jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              c.jsx("div", {
                className: "md:hidden flex gap-3 overflow-x-auto",
                children: e.players.map((k) =>
                  c.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-1.5 text-xs shrink-0 ${k.id === (v == null ? void 0 : v.id) ? "text-[#3a7060]" : "text-[#2a3848]"}`,
                      children: [
                        c.jsx("span", { children: k.token }),
                        c.jsxs("span", {
                          className: "font-mono",
                          children: ["$", k.money],
                        }),
                      ],
                    },
                    k.id,
                  ),
                ),
              }),
              c.jsxs("div", {
                className:
                  "hidden md:flex items-center gap-1.5 text-[10px] text-[#1e2530] tracking-[0.15em] uppercase",
                children: [
                  c.jsx("span", {
                    className: "w-1.5 h-1.5 rounded-full bg-[#1e3028]",
                  }),
                  c.jsx("span", { children: "Nodes Connected" }),
                ],
              }),
            ],
          }),
          c.jsx("div", {
            className: "flex items-center gap-1.5",
            children: e.players.map((k, C) =>
              c.jsxs(
                "div",
                {
                  className:
                    "text-[10px] font-mono px-1.5 py-0.5 rounded border",
                  style: {
                    borderColor:
                      k.id === (v == null ? void 0 : v.id)
                        ? "#1e4030"
                        : "#14181f",
                    color:
                      k.id === (v == null ? void 0 : v.id)
                        ? "#3a8060"
                        : "#2a3848",
                    backgroundColor:
                      k.id === (v == null ? void 0 : v.id)
                        ? "#0a1810"
                        : "transparent",
                  },
                  children: ["P", C + 1],
                },
                k.id,
              ),
            ),
          }),
        ],
      }),
      c.jsxs("div", {
        className:
          "md:hidden shrink-0 border-t border-[#1a1f2c] p-3 flex flex-wrap gap-2 bg-[#0c0e15]",
        children: [
          p &&
            c.jsx("button", {
              className:
                "text-[10px] tracking-widest uppercase px-4 py-2 rounded border border-[#2a3848] text-slate-400",
              onClick: () => E("endTurn"),
              children: "End Turn",
            }),
          y &&
            c.jsx("button", {
              className:
                "text-[10px] tracking-widest uppercase px-4 py-2 rounded border border-[#1e2230] text-[#3a4a5a]",
              onClick: () => E("rollDice"),
              children: "Roll Dice",
            }),
          x &&
            (g == null ? void 0 : g.inJail) &&
            c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  className:
                    "text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]",
                  onClick: () => E("payJailFine"),
                  children: "Pay $50",
                }),
                g.getOutOfJailCards > 0 &&
                  c.jsx("button", {
                    className:
                      "text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]",
                    onClick: () => E("useJailCard"),
                    children: "GOOJF",
                  }),
                c.jsx("button", {
                  className:
                    "text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]",
                  onClick: () => E("rollDice"),
                  children: "Doubles",
                }),
              ],
            }),
        ],
      }),
      n &&
        c.jsx(cg, {
          space: n.space,
          canBuy: h,
          playerMoney: g == null ? void 0 : g.money,
          onBuy: () => {
            (E("buyProperty", { position: n.position }), o());
          },
          onDecline: () => {
            (E("declineBuy", { position: n.position }), o());
          },
          onClose: o,
        }),
      r &&
        (() => {
          const k = e.players.find((z) => z.id === r.fromId),
            C = e.players.find((z) => z.id === r.toId),
            P = e.board[r.position];
          return c.jsxs("div", {
            className:
              "fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#0c0e15] border border-[#1e2230] rounded-lg px-5 py-3 shadow-2xl z-50 text-xs text-center pointer-events-none",
            children: [
              c.jsx("span", {
                className: "text-red-500/80",
                children: (k == null ? void 0 : k.name) ?? "Someone",
              }),
              " paid ",
              c.jsxs("span", {
                className: "font-mono text-slate-300",
                children: ["$", r.amount],
              }),
              " → ",
              c.jsx("span", {
                className: "text-[#3a8060]",
                children: (C == null ? void 0 : C.name) ?? "someone",
              }),
              P
                ? c.jsxs("span", {
                    className: "text-[#2a3848]",
                    children: [" · ", P.name],
                  })
                : null,
            ],
          });
        })(),
      i &&
        (() => {
          const k = e.players.find((C) => C.id === i.playerId);
          return c.jsx(fg, {
            deck: i.deck,
            card: i.card,
            playerName: (k == null ? void 0 : k.name) ?? "Someone",
            onClose: s,
          });
        })(),
      e.status === "ended" &&
        c.jsx("div", {
          className:
            "fixed inset-0 bg-black/75 flex items-center justify-center z-50",
          children: c.jsxs("div", {
            className:
              "bg-[#0f1117] border border-[#1e2230] rounded-xl p-10 text-center flex flex-col gap-5 max-w-sm w-full mx-4",
            children: [
              c.jsx("p", {
                className:
                  "text-[10px] text-[#2a3848] tracking-[0.25em] uppercase",
                children: "Game Over",
              }),
              c.jsxs("h2", {
                className:
                  "text-2xl font-bold tracking-tight text-slate-100 uppercase",
                children: [
                  ((N = e.players.find((k) => k.id === e.winner)) == null
                    ? void 0
                    : N.name) ?? "Someone",
                  " Wins",
                ],
              }),
              c.jsx("button", {
                className:
                  "text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a3848] hover:text-slate-400 transition-colors",
                onClick: () => {
                  ($i(), u());
                },
                children: "Back to Lobby",
              }),
            ],
          }),
        }),
    ],
  });
}
function hg() {
  const { gameState: e, currentGameId: t, lobbyPlayers: n } = Pr(),
    r = Vs();
  return (
    w.useEffect(() => {
      (e == null ? void 0 : e.status) === "started" ||
      (e == null ? void 0 : e.status) === "ended"
        ? r(`/game/${e.gameId}`, { replace: !0 })
        : t && n.length > 0
          ? r(`/room/${t}`, { replace: !0 })
          : !t && !e && r("/", { replace: !0 });
    }, [
      e == null ? void 0 : e.status,
      e == null ? void 0 : e.gameId,
      t,
      n.length,
    ]),
    null
  );
}
function mg() {
  const { initSocket: e, connected: t } = Pr();
  return (
    w.useEffect(() => {
      e();
    }, [e]),
    c.jsxs("div", {
      className: "min-h-screen bg-[#0b0d12] text-slate-100",
      children: [
        !t &&
          c.jsx("div", {
            className:
              "fixed top-0 inset-x-0 bg-red-900/80 border-b border-red-800 text-red-300 text-center text-xs tracking-widest uppercase py-1.5 z-50",
            children: "Connecting to server…",
          }),
        c.jsx(hg, {}),
        c.jsxs(Km, {
          children: [
            c.jsx(Qn, { path: "/", element: c.jsx(Z0, {}) }),
            c.jsx(Qn, { path: "/room/:gameId", element: c.jsx(eg, {}) }),
            c.jsx(Qn, { path: "/game/:gameId", element: c.jsx(pg, {}) }),
            c.jsx(Qn, {
              path: "*",
              element: c.jsx(Qm, { to: "/", replace: !0 }),
            }),
          ],
        }),
      ],
    })
  );
}
Go.createRoot(document.getElementById("root")).render(
  c.jsx(zu.StrictMode, { children: c.jsx(vy, { children: c.jsx(mg, {}) }) }),
);
