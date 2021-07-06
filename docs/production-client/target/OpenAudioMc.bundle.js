"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

!function (t) {
  function e(r) {
    if (n[r]) return n[r].exports;var i = n[r] = { i: r, l: !1, exports: {} };return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
  }var n = {};e.m = t, e.c = n, e.d = function (t, n, r) {
    e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
  }, e.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, e.t = function (t, n) {
    if (1 & n && (t = e(t)), 8 & n) return t;if (4 & n && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var r = Object.create(null);if (e.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & n && "string" != typeof t) for (var i in t) {
      e.d(r, i, function (e) {
        return t[e];
      }.bind(null, i));
    }return r;
  }, e.n = function (t) {
    var n = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return e.d(n, "a", n), n;
  }, e.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, e.p = "", e(e.s = 334);
}([function (t, e, n) {
  var r = n(1),
      i = n(7),
      o = n(14),
      s = n(11),
      a = n(17),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        h,
        d,
        f,
        p = t & c.F,
        g = t & c.G,
        m = t & c.S,
        v = t & c.P,
        y = t & c.B,
        b = g ? r : m ? r[e] || (r[e] = {}) : (r[e] || {})[u],
        w = g ? i : i[e] || (i[e] = {}),
        S = w[u] || (w[u] = {});for (l in g && (n = e), n) {
      d = ((h = !p && b && void 0 !== b[l]) ? b : n)[l], f = y && h ? a(d, r) : v && "function" == typeof d ? a(Function.call, d) : d, b && s(b, l, d, t & c.U), w[l] != d && o(w, l, f), v && S[l] != d && (S[l] = d);
    }
  };r.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t) {
  var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
}, function (t) {
  t.exports = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  };
}, function (t, e, n) {
  var r = n(4);t.exports = function (t) {
    if (!r(t)) throw TypeError(t + " is not an object!");return t;
  };
}, function (t) {
  t.exports = function (t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  var r = n(48)("wks"),
      i = n(29),
      o = n(1).Symbol,
      s = "function" == typeof o;(t.exports = function (t) {
    return r[t] || (r[t] = s && o[t] || (s ? o : i)("Symbol." + t));
  }).store = r;
}, function (t, e, n) {
  var r = n(19),
      i = Math.min;t.exports = function (t) {
    return 0 < t ? i(r(t), 9007199254740991) : 0;
  };
}, function (t) {
  var e = t.exports = { version: "2.6.11" };"number" == typeof __e && (__e = e);
}, function (t, e, n) {
  t.exports = !n(2)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var r = n(3),
      i = n(89),
      o = n(26),
      s = Object.defineProperty;e.f = n(8) ? Object.defineProperty : function (t, e, n) {
    if (r(t), e = o(e, !0), r(n), i) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var r = n(24);t.exports = function (t) {
    return Object(r(t));
  };
}, function (t, e, n) {
  var r = n(1),
      i = n(14),
      o = n(13),
      s = n(29)("src"),
      a = n(138),
      u = "toString",
      c = ("" + a).split(u);n(7).inspectSource = function (t) {
    return a.call(t);
  }, (t.exports = function (t, e, n, a) {
    var u = "function" == typeof n;u && (o(n, "name") || i(n, "name", e)), t[e] === n || (u && (o(n, s) || i(n, s, t[e] ? "" + t[e] : c.join(e + ""))), t === r ? t[e] = n : a ? t[e] ? t[e] = n : i(t, e, n) : (delete t[e], i(t, e, n)));
  })(Function.prototype, u, function () {
    return "function" == typeof this && this[s] || a.call(this);
  });
}, function (t, e, n) {
  var r = n(0),
      i = n(2),
      o = n(24),
      s = /"/g,
      a = function a(t, e, n, r) {
    var i = o(t) + "",
        a = "<" + e;return "" !== n && (a += " " + n + '="' + (r + "").replace(s, "&quot;") + '"'), a + ">" + i + "</" + e + ">";
  };t.exports = function (t, e) {
    var n = {};n[t] = e(a), r(r.P + r.F * i(function () {
      var e = ""[t]('"');return e !== e.toLowerCase() || 3 < e.split('"').length;
    }), "String", n);
  };
}, function (t) {
  var e = {}.hasOwnProperty;t.exports = function (t, n) {
    return e.call(t, n);
  };
}, function (t, e, n) {
  var r = n(9),
      i = n(28);t.exports = n(8) ? function (t, e, n) {
    return r.f(t, e, i(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(44),
      i = n(24);t.exports = function (t) {
    return r(i(t));
  };
}, function (t, e, n) {
  "use strict";
  var r = n(2);t.exports = function (t, e) {
    return !!t && r(function () {
      e ? t.call(null, function () {}, 1) : t.call(null);
    });
  };
}, function (t, e, n) {
  var r = n(18);t.exports = function (t, e, n) {
    return r(t), void 0 === e ? t : 1 === n ? function (n) {
      return t.call(e, n);
    } : 2 === n ? function (n, r) {
      return t.call(e, n, r);
    } : 3 === n ? function (n, r, i) {
      return t.call(e, n, r, i);
    } : function () {
      return t.apply(e, arguments);
    };
  };
}, function (t) {
  t.exports = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
  };
}, function (t) {
  var e = Math.ceil,
      n = Math.floor;t.exports = function (t) {
    return isNaN(t = +t) ? 0 : (0 < t ? n : e)(t);
  };
}, function (t, e, n) {
  var r = n(45),
      i = n(28),
      o = n(15),
      s = n(26),
      a = n(13),
      u = n(89),
      c = Object.getOwnPropertyDescriptor;e.f = n(8) ? c : function (t, e) {
    if (t = o(t), e = s(e, !0), u) try {
      return c(t, e);
    } catch (e) {}return a(t, e) ? i(!r.f.call(t, e), t[e]) : void 0;
  };
}, function (t, e, n) {
  var r = n(0),
      i = n(7),
      o = n(2);t.exports = function (t, e) {
    var n = (i.Object || {})[t] || Object[t],
        s = {};s[t] = e(n), r(r.S + r.F * o(function () {
      n(1);
    }), "Object", s);
  };
}, function (t, e, n) {
  var r = n(17),
      i = n(44),
      o = n(10),
      s = n(6),
      a = n(105);t.exports = function (t, e) {
    var n = 1 == t,
        u = 4 == t,
        c = 6 == t,
        l = e || a;return function (e, a, h) {
      for (var d, f, p = o(e), g = i(p), m = r(a, h, 3), v = s(g.length), y = 0, b = n ? l(e, v) : 2 == t ? l(e, 0) : void 0; v > y; y++) {
        if ((5 == t || c || y in g) && (f = m(d = g[y], y, p), t)) if (n) b[y] = f;else if (f) switch (t) {case 3:
            return !0;case 5:
            return d;case 6:
            return y;case 2:
            b.push(d);} else if (u) return !1;
      }return c ? -1 : 3 == t || u ? u : b;
    };
  };
}, function (t) {
  var e = {}.toString;t.exports = function (t) {
    return e.call(t).slice(8, -1);
  };
}, function (t) {
  t.exports = function (t) {
    if (null == t) throw TypeError("Can't call method on  " + t);return t;
  };
}, function (t, e, n) {
  "use strict";
  if (n(8)) {
    var r = n(30),
        i = n(1),
        o = n(2),
        s = n(0),
        a = n(59),
        u = n(85),
        c = n(17),
        l = n(42),
        h = n(28),
        d = n(14),
        f = n(43),
        p = n(19),
        g = n(6),
        m = n(116),
        v = n(32),
        y = n(26),
        b = n(13),
        w = n(46),
        S = n(4),
        x = n(10),
        E = n(77),
        M = n(33),
        k = n(35),
        C = n(34).f,
        O = n(79),
        T = n(29),
        _ = n(5),
        A = n(22),
        P = n(49),
        I = n(47),
        N = n(81),
        R = n(40),
        F = n(52),
        L = n(41),
        B = n(80),
        D = n(107),
        j = n(9),
        U = n(20),
        V = j.f,
        z = U.f,
        H = i.RangeError,
        G = i.TypeError,
        W = i.Uint8Array,
        K = "ArrayBuffer",
        q = "Shared" + K,
        J = "BYTES_PER_ELEMENT",
        Y = "prototype",
        X = Array[Y],
        $ = u.ArrayBuffer,
        Q = u.DataView,
        Z = A(0),
        tt = A(2),
        et = A(3),
        nt = A(4),
        rt = A(5),
        it = A(6),
        ot = P(!0),
        st = P(!1),
        at = N.values,
        ut = N.keys,
        ct = N.entries,
        lt = X.lastIndexOf,
        ht = X.reduce,
        dt = X.reduceRight,
        ft = X.join,
        pt = X.sort,
        gt = X.slice,
        mt = X.toString,
        vt = X.toLocaleString,
        yt = _("iterator"),
        bt = _("toStringTag"),
        wt = T("typed_constructor"),
        St = T("def_constructor"),
        xt = a.CONSTR,
        Et = a.TYPED,
        Mt = a.VIEW,
        kt = "Wrong length!",
        Ct = A(1, function (t, e) {
      return Pt(I(t, t[St]), e);
    }),
        Ot = o(function () {
      return 1 === new W(new Uint16Array([1]).buffer)[0];
    }),
        Tt = !!W && !!W[Y].set && o(function () {
      new W(1).set({});
    }),
        _t = function _t(t, e) {
      var n = p(t);if (0 > n || n % e) throw H("Wrong offset!");return n;
    },
        At = function At(t) {
      if (S(t) && Et in t) return t;throw G(t + " is not a typed array!");
    },
        Pt = function Pt(t, e) {
      if (!S(t) || !(wt in t)) throw G("It is not a typed array constructor!");return new t(e);
    },
        It = function It(t, e) {
      return Nt(I(t, t[St]), e);
    },
        Nt = function Nt(t, e) {
      for (var n = 0, r = e.length, i = Pt(t, r); r > n;) {
        i[n] = e[n++];
      }return i;
    },
        Rt = function Rt(t, e, n) {
      V(t, e, { get: function get() {
          return this._d[n];
        } });
    },
        Ft = function Ft(t) {
      var e,
          n,
          r,
          i,
          o,
          s,
          a = x(t),
          u = arguments.length,
          l = 1 < u ? arguments[1] : void 0,
          h = void 0 !== l,
          d = O(a);if (null != d && !E(d)) {
        for (s = d.call(a), r = [], e = 0; !(o = s.next()).done; e++) {
          r.push(o.value);
        }a = r;
      }for (h && 2 < u && (l = c(l, arguments[2], 2)), e = 0, n = g(a.length), i = Pt(this, n); n > e; e++) {
        i[e] = h ? l(a[e], e) : a[e];
      }return i;
    },
        Lt = function Lt() {
      for (var t = 0, e = arguments.length, n = Pt(this, e); e > t;) {
        n[t] = arguments[t++];
      }return n;
    },
        Bt = !!W && o(function () {
      vt.call(new W(1));
    }),
        Dt = function Dt() {
      return vt.apply(Bt ? gt.call(At(this)) : At(this), arguments);
    },
        jt = { copyWithin: function copyWithin(t, e) {
        return D.call(At(this), t, e, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(t) {
        return nt(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return B.apply(At(this), arguments);
      }, filter: function filter(t) {
        return It(this, tt(At(this), t, 1 < arguments.length ? arguments[1] : void 0));
      }, find: function find(t) {
        return rt(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, findIndex: function findIndex(t) {
        return it(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, forEach: function forEach(t) {
        Z(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, indexOf: function indexOf(t) {
        return st(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, includes: function includes(t) {
        return ot(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, join: function join() {
        return ft.apply(At(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return lt.apply(At(this), arguments);
      }, map: function map(t) {
        return Ct(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return ht.apply(At(this), arguments);
      }, reduceRight: function reduceRight() {
        return dt.apply(At(this), arguments);
      }, reverse: function reverse() {
        for (var t, e = this, n = At(e).length, r = Math.floor(n / 2), i = 0; i < r;) {
          t = e[i], e[i++] = e[--n], e[n] = t;
        }return e;
      }, some: function some(t) {
        return et(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, sort: function sort(t) {
        return pt.call(At(this), t);
      }, subarray: function subarray(t, e) {
        var n = At(this),
            r = n.length,
            i = v(t, r);return new (I(n, n[St]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, g((void 0 === e ? r : v(e, r)) - i));
      } },
        Ut = function Ut(t, e) {
      return It(this, gt.call(At(this), t, e));
    },
        Vt = function Vt(t) {
      At(this);var e = _t(arguments[1], 1),
          n = this.length,
          r = x(t),
          i = g(r.length),
          o = 0;if (i + e > n) throw H(kt);for (; o < i;) {
        this[e + o] = r[o++];
      }
    },
        zt = { entries: function entries() {
        return ct.call(At(this));
      }, keys: function keys() {
        return ut.call(At(this));
      }, values: function values() {
        return at.call(At(this));
      } },
        Ht = function Ht(t, e) {
      return S(t) && t[Et] && "symbol" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && e in t && +e + "" == e + "";
    },
        Gt = function Gt(t, e) {
      return Ht(t, e = y(e, !0)) ? h(2, t[e]) : z(t, e);
    },
        Wt = function Wt(t, e, n) {
      return !(Ht(t, e = y(e, !0)) && S(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(t, e, n) : (t[e] = n.value, t);
    };xt || (U.f = Gt, j.f = Wt), s(s.S + s.F * !xt, "Object", { getOwnPropertyDescriptor: Gt, defineProperty: Wt }), o(function () {
      mt.call({});
    }) && (mt = vt = function vt() {
      return ft.call(this);
    });var Kt = f({}, jt);f(Kt, zt), d(Kt, yt, zt.values), f(Kt, { slice: Ut, set: Vt, constructor: function constructor() {}, toString: mt, toLocaleString: Dt }), Rt(Kt, "buffer", "b"), Rt(Kt, "byteOffset", "o"), Rt(Kt, "byteLength", "l"), Rt(Kt, "length", "e"), V(Kt, bt, { get: function get() {
        return this[Et];
      } }), t.exports = function (t, e, n, u) {
      var c = t + ((u = !!u) ? "Clamped" : "") + "Array",
          h = i[c],
          f = h || {},
          p = h && k(h),
          v = !h || !a.ABV,
          y = {},
          b = h && h[Y],
          x = function x(n, r) {
        var i = n._d;return i.v["get" + t](r * e + i.o, Ot);
      },
          E = function E(n, r, i) {
        var o = n._d;u && (i = 0 > (i = Math.round(i)) ? 0 : 255 < i ? 255 : 255 & i), o.v["set" + t](r * e + o.o, i, Ot);
      },
          O = function O(t, e) {
        V(t, e, { get: function get() {
            return x(this, e);
          }, set: function set(t) {
            return E(this, e, t);
          }, enumerable: !0 });
      };v ? (h = n(function (t, n, r, i) {
        l(t, h, c, "_d");var o,
            s,
            a,
            u,
            f = 0,
            p = 0;if (S(n)) {
          if (!(n instanceof $ || (u = w(n)) == K || u == q)) return Et in n ? Nt(h, n) : Ft.call(h, n);o = n, p = _t(r, e);var v = n.byteLength;if (void 0 === i) {
            if (v % e) throw H(kt);if (0 > (s = v - p)) throw H(kt);
          } else if ((s = g(i) * e) + p > v) throw H(kt);a = s / e;
        } else a = m(n), o = new $(s = a * e);for (d(t, "_d", { b: o, o: p, l: s, e: a, v: new Q(o) }); f < a;) {
          O(t, f++);
        }
      }), b = h[Y] = M(Kt), d(b, "constructor", h)) : (!o(function () {
        h(1);
      }) || !o(function () {
        new h(-1);
      }) || !F(function (t) {
        new h(), new h(null), new h(1.5), new h(t);
      }, !0)) && (h = n(function (t, n, r, i) {
        var o;return l(t, h, c), S(n) ? n instanceof $ || (o = w(n)) == K || o == q ? void 0 === i ? void 0 === r ? new f(n) : new f(n, _t(r, e)) : new f(n, _t(r, e), i) : Et in n ? Nt(h, n) : Ft.call(h, n) : new f(m(n));
      }), Z(p === Function.prototype ? C(f) : C(f).concat(C(p)), function (t) {
        t in h || d(h, t, f[t]);
      }), h[Y] = b, !r && (b.constructor = h));var T = b[yt],
          _ = !!T && ("values" == T.name || null == T.name),
          A = zt.values;d(h, wt, !0), d(b, Et, c), d(b, Mt, !0), d(b, St, h), (u ? new h(1)[bt] != c : !(bt in b)) && V(b, bt, { get: function get() {
          return c;
        } }), y[c] = h, s(s.G + s.W + s.F * (h != f), y), s(s.S, c, { BYTES_PER_ELEMENT: e }), s(s.S + s.F * o(function () {
        f.of.call(h, 1);
      }), c, { from: Ft, of: Lt }), J in b || d(b, J, e), s(s.P, c, jt), L(c), s(s.P + s.F * Tt, c, { set: Vt }), s(s.P + s.F * !_, c, zt), r || b.toString == mt || (b.toString = mt), s(s.P + s.F * o(function () {
        new h(1).slice();
      }), c, { slice: Ut }), s(s.P + s.F * (o(function () {
        return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
      }) || !o(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: Dt }), R[c] = _ ? T : A, r || _ || d(b, yt, A);
    };
  } else t.exports = function () {};
}, function (t, e, n) {
  var r = n(4);t.exports = function (t, e) {
    if (!r(t)) return t;var n, i;if (e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;if ("function" == typeof (n = t.valueOf) && !r(i = n.call(t))) return i;if (!e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;throw TypeError("Can't convert object to primitive value");
  };
}, function (t, e, n) {
  var r = n(29)("meta"),
      i = n(4),
      o = n(13),
      s = n(9).f,
      a = 0,
      u = Object.isExtensible || function () {
    return !0;
  },
      c = !n(2)(function () {
    return u(Object.preventExtensions({}));
  }),
      l = function l(t) {
    s(t, r, { value: { i: "O" + ++a, w: {} } });
  },
      h = t.exports = { KEY: r, NEED: !1, fastKey: function fastKey(t, e) {
      if (!i(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!o(t, r)) {
        if (!u(t)) return "F";if (!e) return "E";l(t);
      }return t[r].i;
    }, getWeak: function getWeak(t, e) {
      if (!o(t, r)) {
        if (!u(t)) return !0;if (!e) return !1;l(t);
      }return t[r].w;
    }, onFreeze: function onFreeze(t) {
      return c && h.NEED && u(t) && !o(t, r) && l(t), t;
    } };
}, function (t) {
  t.exports = function (t, e) {
    return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
  };
}, function (t) {
  var e = 0,
      n = Math.random();t.exports = function (t) {
    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + n).toString(36));
  };
}, function (t) {
  t.exports = !1;
}, function (t, e, n) {
  var r = n(91),
      i = n(64);t.exports = Object.keys || function (t) {
    return r(t, i);
  };
}, function (t, e, n) {
  var r = n(19),
      i = Math.max,
      o = Math.min;t.exports = function (t, e) {
    return 0 > (t = r(t)) ? i(t + e, 0) : o(t, e);
  };
}, function (t, e, n) {
  var r = n(3),
      i = n(92),
      o = n(64),
      s = n(63)("IE_PROTO"),
      a = function a() {},
      u = "prototype",
      _c = function c() {
    var t,
        e = n(61)("iframe"),
        r = o.length;for (e.style.display = "none", n(65).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _c = t.F; r--;) {
      delete _c[u][o[r]];
    }return _c();
  };t.exports = Object.create || function (t, e) {
    var n;return null === t ? n = _c() : (a[u] = r(t), n = new a(), a[u] = null, n[s] = t), void 0 === e ? n : i(n, e);
  };
}, function (t, e, n) {
  var r = n(91),
      i = n(64).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {
    return r(t, i);
  };
}, function (t, e, n) {
  var r = n(13),
      i = n(10),
      o = n(63)("IE_PROTO"),
      s = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
    return t = i(t), r(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null;
  };
}, function (t, e, n) {
  var r = n(5)("unscopables"),
      i = Array.prototype;null == i[r] && n(14)(i, r, {}), t.exports = function (t) {
    i[r][t] = !0;
  };
}, function (t, e, n) {
  var r = n(4);t.exports = function (t, e) {
    if (!r(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");return t;
  };
}, function (t, e, n) {
  var r = n(9).f,
      i = n(13),
      o = n(5)("toStringTag");t.exports = function (t, e, n) {
    t && !i(t = n ? t : t.prototype, o) && r(t, o, { configurable: !0, value: e });
  };
}, function (t, e, n) {
  var r = n(0),
      i = n(24),
      o = n(2),
      s = n(67),
      a = "[" + s + "]",
      u = RegExp("^" + a + a + "*"),
      c = RegExp(a + a + "*$"),
      l = function l(t, e, n) {
    var i = {},
        a = o(function () {
      return !!s[t]() || "​" != "​"[t]();
    }),
        u = i[t] = a ? e(h) : s[t];n && (i[n] = u), r(r.P + r.F * a, "String", i);
  },
      h = l.trim = function (t, e) {
    return t = i(t) + "", 1 & e && (t = t.replace(u, "")), 2 & e && (t = t.replace(c, "")), t;
  };t.exports = l;
}, function (t) {
  t.exports = {};
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      i = n(9),
      o = n(8),
      s = n(5)("species");t.exports = function (t) {
    var e = r[t];o && e && !e[s] && i.f(e, s, { configurable: !0, get: function get() {
        return this;
      } });
  };
}, function (t) {
  t.exports = function (t, e, n, r) {
    if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");return t;
  };
}, function (t, e, n) {
  var r = n(11);t.exports = function (t, e, n) {
    for (var i in e) {
      r(t, i, e[i], n);
    }return t;
  };
}, function (t, e, n) {
  var r = n(23);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
    return "String" == r(t) ? t.split("") : Object(t);
  };
}, function (t, e) {
  e.f = {}.propertyIsEnumerable;
}, function (t, e, n) {
  var r = n(23),
      i = n(5)("toStringTag"),
      o = "Arguments" == r(function () {
    return arguments;
  }());t.exports = function (t) {
    var e, n, s;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
      try {
        return t[e];
      } catch (e) {}
    }(e = Object(t), i)) ? n : o ? r(e) : "Object" == (s = r(e)) && "function" == typeof e.callee ? "Arguments" : s;
  };
}, function (t, e, n) {
  var r = n(3),
      i = n(18),
      o = n(5)("species");t.exports = function (t, e) {
    var n,
        s = r(t).constructor;return void 0 === s || null == (n = r(s)[o]) ? e : i(n);
  };
}, function (t, e, n) {
  var r = n(7),
      i = n(1),
      o = "__core-js_shared__",
      s = i[o] || (i[o] = {});(t.exports = function (t, e) {
    return s[t] || (s[t] = void 0 === e ? {} : e);
  })("versions", []).push({ version: r.version, mode: n(30) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
}, function (t, e, n) {
  var r = n(15),
      i = n(6),
      o = n(32);t.exports = function (t) {
    return function (e, n, s) {
      var a,
          u = r(e),
          c = i(u.length),
          l = o(s, c);if (t && n != n) {
        for (; c > l;) {
          if ((a = u[l++]) != a) return !0;
        }
      } else for (; c > l; l++) {
        if ((t || l in u) && u[l] === n) return t || l || 0;
      }return !t && -1;
    };
  };
}, function (t, e) {
  e.f = Object.getOwnPropertySymbols;
}, function (t, e, n) {
  var r = n(23);t.exports = Array.isArray || function (t) {
    return "Array" == r(t);
  };
}, function (t, e, n) {
  var r = n(5)("iterator"),
      i = !1;try {
    var o = [7][r]();o.return = function () {
      i = !0;
    }, Array.from(o, function () {
      throw 2;
    });
  } catch (e) {}t.exports = function (t, e) {
    if (!e && !i) return !1;var n = !1;try {
      var o = [7],
          s = o[r]();s.next = function () {
        return { done: n = !0 };
      }, o[r] = function () {
        return s;
      }, t(o);
    } catch (e) {}return n;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(3);t.exports = function () {
    var t = r(this),
        e = "";return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(46),
      i = RegExp.prototype.exec;t.exports = function (t, e) {
    var n = t.exec;if ("function" == typeof n) {
      var o = n.call(t, e);if ("object" != (typeof o === "undefined" ? "undefined" : _typeof(o))) throw new TypeError("RegExp exec method returned something other than an Object or null");return o;
    }if ("RegExp" !== r(t)) throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t, e);
  };
}, function (t, e, n) {
  "use strict";
  n(109);var r = n(11),
      i = n(14),
      o = n(2),
      s = n(24),
      a = n(5),
      u = n(82),
      c = a("species"),
      l = !o(function () {
    var t = /./;return t.exec = function () {
      var t = [];return t.groups = { a: "7" }, t;
    }, "7" !== "".replace(t, "$<a>");
  }),
      h = function () {
    var t = /(?:)/,
        e = t.exec;t.exec = function () {
      return e.apply(this, arguments);
    };var n = "ab".split(t);return 2 === n.length && "a" === n[0] && "b" === n[1];
  }();t.exports = function (t, e, n) {
    var d = a(t),
        f = !o(function () {
      var e = {};return e[d] = function () {
        return 7;
      }, 7 != ""[t](e);
    }),
        p = f ? !o(function () {
      var e = !1,
          n = /a/;return n.exec = function () {
        return e = !0, null;
      }, "split" === t && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[d](""), !e;
    }) : void 0;if (!f || !p || "replace" === t && !l || "split" === t && !h) {
      var g = /./[d],
          m = n(s, d, ""[t], function (t, e, n, r, i) {
        return e.exec === u ? f && !i ? { done: !0, value: g.call(e, n, r) } : { done: !0, value: t.call(n, e, r) } : { done: !1 };
      }),
          v = m[0],
          y = m[1];r(String.prototype, t, v), i(RegExp.prototype, d, 2 == e ? function (t, e) {
        return y.call(t, this, e);
      } : function (t) {
        return y.call(t, this);
      });
    }
  };
}, function (t, e, n) {
  var r = n(17),
      i = n(104),
      o = n(77),
      s = n(3),
      a = n(6),
      u = n(79),
      c = {},
      l = {};(e = t.exports = function (t, e, n, h, d) {
    var f,
        p,
        g,
        m,
        v = d ? function () {
      return t;
    } : u(t),
        y = r(n, h, e ? 2 : 1),
        b = 0;if ("function" != typeof v) throw TypeError(t + " is not iterable!");if (o(v)) {
      for (f = a(t.length); f > b; b++) {
        if ((m = e ? y(s(p = t[b])[0], p[1]) : y(t[b])) === c || m === l) return m;
      }
    } else for (g = v.call(t); !(p = g.next()).done;) {
      if ((m = i(g, y, p.value, e)) === c || m === l) return m;
    }
  }).BREAK = c, e.RETURN = l;
}, function (t, e, n) {
  var r = n(1).navigator;t.exports = r && r.userAgent || "";
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      i = n(0),
      o = n(11),
      s = n(43),
      a = n(27),
      u = n(56),
      c = n(42),
      l = n(4),
      h = n(2),
      d = n(52),
      f = n(38),
      p = n(68);t.exports = function (t, e, n, g, m, v) {
    var y = r[t],
        b = y,
        w = m ? "set" : "add",
        S = b && b.prototype,
        x = {},
        E = function E(t) {
      var e = S[t];o(S, t, "delete" == t || "has" == t ? function (t) {
        return (!v || l(t)) && e.call(this, 0 === t ? 0 : t);
      } : "get" == t ? function (t) {
        return v && !l(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
      } : "add" == t ? function (t) {
        return e.call(this, 0 === t ? 0 : t), this;
      } : function (t, n) {
        return e.call(this, 0 === t ? 0 : t, n), this;
      });
    };if ("function" == typeof b && (v || S.forEach && !h(function () {
      new b().entries().next();
    }))) {
      var M = new b(),
          k = M[w](v ? {} : -0, 1) != M,
          C = h(function () {
        M.has(1);
      }),
          O = d(function (t) {
        new b(t);
      }),
          T = !v && h(function () {
        for (var t = new b(), e = 5; e--;) {
          t[w](e, e);
        }return !t.has(-0);
      });O || ((b = e(function (e, n) {
        c(e, b, t);var r = p(new y(), e, b);return null != n && u(n, m, r[w], r), r;
      })).prototype = S, S.constructor = b), (C || T) && (E("delete"), E("has"), m && E("get")), (T || k) && E(w), v && S.clear && delete S.clear;
    } else b = g.getConstructor(e, t, m, w), s(b.prototype, n), a.NEED = !0;return f(b, t), x[t] = b, i(i.G + i.W + i.F * (b != y), x), v || g.setStrong(b, t, m), b;
  };
}, function (t, e, n) {
  for (var r, i = n(1), o = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!i.ArrayBuffer || !i.DataView), l = c, h = 0, d = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; h < 9;) {
    (r = i[d[h++]]) ? (o(r.prototype, a, !0), o(r.prototype, u, !0)) : l = !1;
  }t.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
}, function (t, e, n) {
  "use strict";
  (function (t, r) {
    n.d(e, "a", function () {
      return i;
    }), function (e) {
      if ("function" == typeof bootstrap) bootstrap("hark", e);else if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports))) t.exports = e();else if ("function" == typeof define && n(332)) define(e);else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;ses.makeHark = e;
      } else "undefined" == typeof window ? r.hark = e() : window.hark = e();
    }(function () {
      return function (t, e, n) {
        function r(n, o) {
          if (!e[n]) {
            if (!t[n]) {
              if (i) return i(n, !0);throw new Error("Cannot find module '" + n + "'");
            }var s = e[n] = { exports: {} };t[n][0].call(s.exports, function (e) {
              var i = t[n][1][e];return r(i || e);
            }, s, s.exports);
          }return e[n].exports;
        }for (var i = !1, o = 0; o < n.length; o++) {
          r(n[o]);
        }return r;
      }({ 1: [function (t, e) {
          var n,
              r = t("wildemitter");"undefined" != typeof window && (n = window.AudioContext || window.webkitAudioContext);var i = null;e.exports = function (t, e) {
            var o = new r();if (!n) return o;var s,
                a,
                u,
                c = (e = e || {}).smoothing || .1,
                l = e.interval || 50,
                h = e.threshold,
                d = e.play,
                f = e.history || 10,
                p = !0;i = e.audioContext || i || new n(), (u = i.createAnalyser()).fftSize = 512, u.smoothingTimeConstant = c, a = new Float32Array(u.frequencyBinCount), t.jquery && (t = t[0]), t instanceof HTMLAudioElement || t instanceof HTMLVideoElement ? (s = i.createMediaElementSource(t), void 0 === d && (d = !0), h = h || -50) : (s = i.createMediaStreamSource(t), h = h || -50), s.connect(u), d && u.connect(i.destination), o.speaking = !1, o.getThreshold = function () {
              return h;
            }, o.suspend = function () {
              return i.suspend();
            }, o.resume = function () {
              return i.resume();
            }, Object.defineProperty(o, "state", { get: function get() {
                return i.state;
              } }), i.onstatechange = function () {
              o.emit("state_change", i.state);
            }, o.setThreshold = function (t) {
              h = t;
            }, o.setInterval = function (t) {
              l = t;
            }, o.stop = function () {
              p = !1, o.emit("volume_change", -100, h), o.speaking && (o.speaking = !1, o.emit("stopped_speaking")), u.disconnect(), s.disconnect();
            }, o.speakingHistory = [];for (var g = 0; g < f; g++) {
              o.speakingHistory.push(0);
            }var m = function m() {
              setTimeout(function () {
                if (p) {
                  var t = function (t, e) {
                    var n = -1 / 0;t.getFloatFrequencyData(e);for (var r = 4, i = e.length; r < i; r++) {
                      e[r] > n && 0 > e[r] && (n = e[r]);
                    }return n;
                  }(u, a);o.emit("volume_change", t, h);var e = 0;if (t > h && !o.speaking) {
                    for (var n = o.speakingHistory.length - 3; n < o.speakingHistory.length; n++) {
                      e += o.speakingHistory[n];
                    }2 <= e && (o.speaking = !0, o.emit("speaking"));
                  } else if (t < h && o.speaking) {
                    for (n = 0; n < o.speakingHistory.length; n++) {
                      e += o.speakingHistory[n];
                    }0 == e && (o.speaking = !1, o.emit("stopped_speaking"));
                  }o.speakingHistory.shift(), o.speakingHistory.push(0 + (t > h)), m();
                }
              }, l);
            };return m(), o;
          };
        }, { wildemitter: 2 }], 2: [function (t, e) {
          function n() {}e.exports = n, n.mixin = function (t) {
            var e = t.prototype || t;e.isWildEmitter = !0, e.on = function (t) {
              this.callbacks = this.callbacks || {};var e = 3 === arguments.length,
                  n = e ? arguments[1] : void 0,
                  r = e ? arguments[2] : arguments[1];return r._groupName = n, (this.callbacks[t] = this.callbacks[t] || []).push(r), this;
            }, e.once = function (t) {
              function e() {
                n.off(t, e), o.apply(this, arguments);
              }var n = this,
                  r = 3 === arguments.length,
                  i = r ? arguments[1] : void 0,
                  o = r ? arguments[2] : arguments[1];return this.on(t, i, e), this;
            }, e.releaseGroup = function (t) {
              var e, n, r, i;for (e in this.callbacks = this.callbacks || {}, this.callbacks) {
                for (n = 0, r = (i = this.callbacks[e]).length; n < r; n++) {
                  i[n]._groupName === t && (i.splice(n, 1), n--, r--);
                }
              }return this;
            }, e.off = function (t, e) {
              this.callbacks = this.callbacks || {};var n,
                  r = this.callbacks[t];return r ? 1 === arguments.length ? (delete this.callbacks[t], this) : (n = r.indexOf(e), r.splice(n, 1), 0 === r.length && delete this.callbacks[t], this) : this;
            }, e.emit = function (t) {
              this.callbacks = this.callbacks || {};var e,
                  n,
                  r,
                  i = [].slice.call(arguments, 1),
                  o = this.callbacks[t],
                  s = this.getWildcardCallbacks(t);if (o) for (e = 0, n = (r = o.slice()).length; e < n && r[e]; ++e) {
                r[e].apply(this, i);
              }if (s) for (n = s.length, e = 0, n = (r = s.slice()).length; e < n && r[e]; ++e) {
                r[e].apply(this, [t].concat(i));
              }return this;
            }, e.getWildcardCallbacks = function (t) {
              this.callbacks = this.callbacks || {};var e,
                  n,
                  r = [];for (e in this.callbacks) {
                n = e.split("*"), ("*" === e || 2 === n.length && t.slice(0, n[0].length) === n[0]) && (r = r.concat(this.callbacks[e]));
              }return r;
            };
          }, n.mixin(n);
        }, {}] }, {}, [1])(1);
    });var i = window.hark;
  }).call(this, n(130)(t), n(331));
}, function (t, e, n) {
  var r = n(4),
      i = n(1).document,
      o = r(i) && r(i.createElement);t.exports = function (t) {
    return o ? i.createElement(t) : {};
  };
}, function (t, e, n) {
  e.f = n(5);
}, function (t, e, n) {
  var r = n(48)("keys"),
      i = n(29);t.exports = function (t) {
    return r[t] || (r[t] = i(t));
  };
}, function (t) {
  t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, function (t, e, n) {
  var r = n(1).document;t.exports = r && r.documentElement;
}, function (t, e, n) {
  var r = n(4),
      i = n(3),
      o = function o(t, e) {
    if (i(t), !r(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
  };t.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, r) {
      try {
        (r = n(17)(Function.call, n(20).f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
      } catch (t) {
        e = !0;
      }return function (t, n) {
        return o(t, n), e ? _defaults(t, n) : r(t, n), t;
      };
    }({}, !1) : void 0), check: o };
}, function (t) {
  t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
}, function (t, e, n) {
  var r = n(4),
      i = n(66).set;t.exports = function (t, e, n) {
    var o,
        s = e.constructor;return s !== n && "function" == typeof s && (o = s.prototype) !== n.prototype && r(o) && i && i(t, o), t;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(19),
      i = n(24);t.exports = function (t) {
    var e = i(this) + "",
        n = "",
        o = r(t);if (0 > o || o == 1 / 0) throw RangeError("Count can't be negative");for (; 0 < o; (o >>>= 1) && (e += e)) {
      1 & o && (n += e);
    }return n;
  };
}, function (t) {
  t.exports = Math.sign || function (t) {
    return 0 == (t = +t) || t != t ? t : 0 > t ? -1 : 1;
  };
}, function (t) {
  var e = Math.expm1;t.exports = !e || 22025.465794806718 < e(10) || 22025.465794806718 > e(10) || -2e-17 != e(-2e-17) ? function (t) {
    return 0 == (t = +t) ? t : -1e-6 < t && 1e-6 > t ? t + t * t / 2 : Math.exp(t) - 1;
  } : e;
}, function (t, e, n) {
  var r = n(19),
      i = n(24);t.exports = function (t) {
    return function (e, n) {
      var o,
          s,
          a = i(e) + "",
          u = r(n),
          c = a.length;return 0 > u || u >= c ? t ? "" : void 0 : 55296 > (o = a.charCodeAt(u)) || 56319 < o || u + 1 === c || 56320 > (s = a.charCodeAt(u + 1)) || 57343 < s ? t ? a.charAt(u) : o : t ? a.slice(u, u + 2) : s - 56320 + (o - 55296 << 10) + 65536;
    };
  };
}, function (t, e, n) {
  "use strict";
  var r = n(30),
      i = n(0),
      o = n(11),
      s = n(14),
      a = n(40),
      u = n(103),
      c = n(38),
      l = n(35),
      h = n(5)("iterator"),
      d = !([].keys && "next" in [].keys()),
      f = "keys",
      p = "values",
      g = function g() {
    return this;
  };t.exports = function (t, e, n, m, v, y, b) {
    u(n, e, m);var w,
        S,
        x,
        E = function E(t) {
      return !d && t in O ? O[t] : function () {
        return new n(this, t);
      };
    },
        M = e + " Iterator",
        k = v == p,
        C = !1,
        O = t.prototype,
        T = O[h] || O["@@iterator"] || v && O[v],
        _ = T || E(v),
        A = v ? k ? E("entries") : _ : void 0,
        P = "Array" == e && O.entries || T;if (P && (x = l(P.call(new t()))) !== Object.prototype && x.next && (c(x, M, !0), !r && "function" != typeof x[h] && s(x, h, g)), k && T && T.name !== p && (C = !0, _ = function _() {
      return T.call(this);
    }), (!r || b) && (d || C || !O[h]) && s(O, h, _), a[e] = _, a[M] = g, v) if (w = { values: k ? _ : E(p), keys: y ? _ : E(f), entries: A }, b) for (S in w) {
      S in O || o(O, S, w[S]);
    } else i(i.P + i.F * (d || C), e, w);return w;
  };
}, function (t, e, n) {
  var r = n(75),
      i = n(24);t.exports = function (t, e, n) {
    if (r(e)) throw TypeError("String#" + n + " doesn't accept regex!");return i(t) + "";
  };
}, function (t, e, n) {
  var r = n(4),
      i = n(23),
      o = n(5)("match");t.exports = function (t) {
    var e;return r(t) && (void 0 === (e = t[o]) ? "RegExp" == i(t) : !!e);
  };
}, function (t, e, n) {
  var r = n(5)("match");t.exports = function (t) {
    var e = /./;try {
      "/./"[t](e);
    } catch (n) {
      try {
        return e[r] = !1, !"/./"[t](e);
      } catch (t) {}
    }return !0;
  };
}, function (t, e, n) {
  var r = n(40),
      i = n(5)("iterator"),
      o = Array.prototype;t.exports = function (t) {
    return void 0 !== t && (r.Array === t || o[i] === t);
  };
}, function (t, e, n) {
  "use strict";
  var r = n(9),
      i = n(28);t.exports = function (t, e, n) {
    e in t ? r.f(t, e, i(0, n)) : t[e] = n;
  };
}, function (t, e, n) {
  var r = n(46),
      i = n(5)("iterator"),
      o = n(40);t.exports = n(7).getIteratorMethod = function (t) {
    if (null != t) return t[i] || t["@@iterator"] || o[r(t)];
  };
}, function (t, e, n) {
  "use strict";
  var r = n(10),
      i = n(32),
      o = n(6);t.exports = function (t) {
    for (var e = r(this), n = o(e.length), s = arguments.length, a = i(1 < s ? arguments[1] : void 0, n), u = 2 < s ? arguments[2] : void 0, c = void 0 === u ? n : i(u, n); c > a;) {
      e[a++] = t;
    }return e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(36),
      i = n(108),
      o = n(40),
      s = n(15);t.exports = n(73)(Array, "Array", function (t, e) {
    this._t = s(t), this._i = 0, this._k = e;
  }, function () {
    var t = this._t,
        e = this._k,
        n = this._i++;return !t || n >= t.length ? (this._t = void 0, i(1)) : i(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
  }, "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries");
}, function (t, e, n) {
  "use strict";
  var r = n(53),
      i = RegExp.prototype.exec,
      o = String.prototype.replace,
      s = i,
      a = "lastIndex",
      u = function () {
    var t = /a/,
        e = /b*/g;return i.call(t, "a"), i.call(e, "a"), 0 !== t[a] || 0 !== e[a];
  }(),
      c = void 0 !== /()??/.exec("")[1];(u || c) && (s = function s(t) {
    var e,
        n,
        s,
        l,
        h = this;return c && (n = new RegExp("^" + h.source + "$(?!\\s)", r.call(h))), u && (e = h[a]), s = i.call(h, t), u && s && (h[a] = h.global ? s.index + s[0].length : e), c && s && 1 < s.length && o.call(s[0], n, function () {
      for (l = 1; l < arguments.length - 2; l++) {
        void 0 === arguments[l] && (s[l] = void 0);
      }
    }), s;
  }), t.exports = s;
}, function (t, e, n) {
  "use strict";
  var r = n(72)(!0);t.exports = function (t, e, n) {
    return e + (n ? r(t, e).length : 1);
  };
}, function (t, e, n) {
  var r,
      i,
      o,
      s = n(17),
      a = n(97),
      u = n(65),
      c = n(61),
      l = n(1),
      h = l.process,
      d = l.setImmediate,
      f = l.clearImmediate,
      p = l.MessageChannel,
      g = l.Dispatch,
      m = 0,
      v = {},
      y = "onreadystatechange",
      b = function b() {
    var t = +this;if (v.hasOwnProperty(t)) {
      var e = v[t];delete v[t], e();
    }
  },
      w = function w(t) {
    b.call(t.data);
  };d && f || (d = function d(t) {
    for (var e = [], n = 1; arguments.length > n;) {
      e.push(arguments[n++]);
    }return v[++m] = function () {
      a("function" == typeof t ? t : Function(t), e);
    }, r(m), m;
  }, f = function f(t) {
    delete v[t];
  }, "process" == n(23)(h) ? r = function r(t) {
    h.nextTick(s(b, t, 1));
  } : g && g.now ? r = function r(t) {
    g.now(s(b, t, 1));
  } : p ? (o = (i = new p()).port2, i.port1.onmessage = w, r = s(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function r(t) {
    l.postMessage(t + "", "*");
  }, l.addEventListener("message", w, !1)) : r = y in c("script") ? function (t) {
    u.appendChild(c("script"))[y] = function () {
      u.removeChild(this), b.call(t);
    };
  } : function (t) {
    setTimeout(s(b, t, 1), 0);
  }), t.exports = { set: d, clear: f };
}, function (t, e, n) {
  "use strict";
  function r(t, e, n) {
    var r,
        i,
        o,
        s = Array(n),
        a = 8 * n - e - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        l = 23 === e ? U(2, -24) - U(2, -77) : 0,
        h = 0,
        d = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for ((t = j(t)) != t || t === B ? (i = t == t ? 0 : 1, r = u) : (r = V(z(t) / H), 1 > t * (o = U(2, -r)) && (r--, o *= 2), 2 <= (t += 1 <= r + c ? l / o : l * U(2, 1 - c)) * o && (r++, o /= 2), r + c >= u ? (i = 0, r = u) : 1 <= r + c ? (i = (t * o - 1) * U(2, e), r += c) : (i = t * U(2, c - 1) * U(2, e), r = 0)); 8 <= e; s[h++] = 255 & i, i /= 256, e -= 8) {}for (r = r << e | i, a += e; 0 < a; s[h++] = 255 & r, r /= 256, a -= 8) {}return s[--h] |= 128 * d, s;
  }function i(t, e, n) {
    var r,
        i = 8 * n - e - 1,
        o = (1 << i) - 1,
        s = o >> 1,
        a = i - 7,
        u = n - 1,
        c = t[u--],
        l = 127 & c;for (c >>= 7; 0 < a; l = 256 * l + t[u], u--, a -= 8) {}for (r = l & (1 << -a) - 1, l >>= -a, a += e; 0 < a; r = 256 * r + t[u], u--, a -= 8) {}if (0 === l) l = 1 - s;else {
      if (l === o) return r ? NaN : c ? -B : B;r += U(2, e), l -= s;
    }return (c ? -1 : 1) * r * U(2, l - e);
  }function o(t) {
    return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
  }function s(t) {
    return [255 & t];
  }function a(t) {
    return [255 & t, 255 & t >> 8];
  }function u(t) {
    return [255 & t, 255 & t >> 8, 255 & t >> 16, 255 & t >> 24];
  }function c(t) {
    return r(t, 52, 8);
  }function l(t) {
    return r(t, 23, 4);
  }function h(t, e, n) {
    C(t[P], e, { get: function get() {
        return this[n];
      } });
  }function d(t, e, n, r) {
    var i = M(+n);if (i + e > t[J]) throw L(I);var o = t[q]._b,
        s = i + t[Y],
        a = o.slice(s, s + e);return r ? a : a.reverse();
  }function f(t, e, n, r, i, o) {
    var s = M(+n);if (s + e > t[J]) throw L(I);for (var a = t[q]._b, u = s + t[Y], c = r(+i), l = 0; l < e; l++) {
      a[u + l] = c[o ? l : e - l - 1];
    }
  }var p = n(1),
      g = n(8),
      m = n(30),
      v = n(59),
      y = n(14),
      b = n(43),
      w = n(2),
      S = n(42),
      x = n(19),
      E = n(6),
      M = n(116),
      k = n(34).f,
      C = n(9).f,
      O = n(80),
      T = n(38),
      _ = "ArrayBuffer",
      A = "DataView",
      P = "prototype",
      I = "Wrong index!",
      _N2 = p[_],
      _R = p[A],
      F = p.Math,
      L = p.RangeError,
      B = p.Infinity,
      D = _N2,
      j = F.abs,
      U = F.pow,
      V = F.floor,
      z = F.log,
      H = F.LN2,
      G = "buffer",
      W = "byteLength",
      K = "byteOffset",
      q = g ? "_b" : G,
      J = g ? "_l" : W,
      Y = g ? "_o" : K;if (v.ABV) {
    if (!w(function () {
      _N2(1);
    }) || !w(function () {
      new _N2(-1);
    }) || w(function () {
      return new _N2(), new _N2(1.5), new _N2(NaN), _N2.name != _;
    })) {
      for (var X, $ = (_N2 = function N(t) {
        return S(this, _N2), new D(M(t));
      })[P] = D[P], Q = k(D), Z = 0; Q.length > Z;) {
        (X = Q[Z++]) in _N2 || y(_N2, X, D[X]);
      }m || ($.constructor = _N2);
    }var tt = new _R(new _N2(2)),
        et = _R[P].setInt8;tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), (tt.getInt8(0) || !tt.getInt8(1)) && b(_R[P], { setInt8: function setInt8(t, e) {
        et.call(this, t, e << 24 >> 24);
      }, setUint8: function setUint8(t, e) {
        et.call(this, t, e << 24 >> 24);
      } }, !0);
  } else _N2 = function _N(t) {
    S(this, _N2, _);var e = M(t);this._b = O.call(Array(e), 0), this[J] = e;
  }, _R = function R(t, e, n) {
    S(this, _R, A), S(t, _N2, A);var r = t[J],
        i = x(e);if (0 > i || i > r) throw L("Wrong offset!");if (i + (n = void 0 === n ? r - i : E(n)) > r) throw L("Wrong length!");this[q] = t, this[Y] = i, this[J] = n;
  }, g && (h(_N2, W, "_l"), h(_R, G, "_b"), h(_R, W, "_l"), h(_R, K, "_o")), b(_R[P], { getInt8: function getInt8(t) {
      return d(this, 1, t)[0] << 24 >> 24;
    }, getUint8: function getUint8(t) {
      return d(this, 1, t)[0];
    }, getInt16: function getInt16(t) {
      var e = d(this, 2, t, arguments[1]);return (e[1] << 8 | e[0]) << 16 >> 16;
    }, getUint16: function getUint16(t) {
      var e = d(this, 2, t, arguments[1]);return e[1] << 8 | e[0];
    }, getInt32: function getInt32(t) {
      return o(d(this, 4, t, arguments[1]));
    }, getUint32: function getUint32(t) {
      return o(d(this, 4, t, arguments[1])) >>> 0;
    }, getFloat32: function getFloat32(t) {
      return i(d(this, 4, t, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(t) {
      return i(d(this, 8, t, arguments[1]), 52, 8);
    }, setInt8: function setInt8(t, e) {
      f(this, 1, t, s, e);
    }, setUint8: function setUint8(t, e) {
      f(this, 1, t, s, e);
    }, setInt16: function setInt16(t, e) {
      f(this, 2, t, a, e, arguments[2]);
    }, setUint16: function setUint16(t, e) {
      f(this, 2, t, a, e, arguments[2]);
    }, setInt32: function setInt32(t, e) {
      f(this, 4, t, u, e, arguments[2]);
    }, setUint32: function setUint32(t, e) {
      f(this, 4, t, u, e, arguments[2]);
    }, setFloat32: function setFloat32(t, e) {
      f(this, 4, t, l, e, arguments[2]);
    }, setFloat64: function setFloat64(t, e) {
      f(this, 8, t, c, e, arguments[2]);
    } });T(_N2, _), T(_R, A), y(_R[P], v.VIEW, !0), e[_] = _N2, e[A] = _R;
}, function (t) {
  var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
}, function (t) {
  t.exports = function (t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  t.exports = !n(121)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  t.exports = !n(8) && !n(2)(function () {
    return 7 != Object.defineProperty(n(61)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var r = n(1),
      i = n(7),
      o = n(30),
      s = n(62),
      a = n(9).f;t.exports = function (t) {
    var e = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});"_" == t.charAt(0) || t in e || a(e, t, { value: s.f(t) });
  };
}, function (t, e, n) {
  var r = n(13),
      i = n(15),
      o = n(49)(!1),
      s = n(63)("IE_PROTO");t.exports = function (t, e) {
    var n,
        a = i(t),
        u = 0,
        c = [];for (n in a) {
      n != s && r(a, n) && c.push(n);
    }for (; e.length > u;) {
      r(a, n = e[u++]) && (~o(c, n) || c.push(n));
    }return c;
  };
}, function (t, e, n) {
  var r = n(9),
      i = n(3),
      o = n(31);t.exports = n(8) ? Object.defineProperties : function (t, e) {
    i(t);for (var n, s = o(e), a = s.length, u = 0; a > u;) {
      r.f(t, n = s[u++], e[n]);
    }return t;
  };
}, function (t, e, n) {
  var r = n(15),
      i = n(34).f,
      o = {}.toString,
      s = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];t.exports.f = function (t) {
    return s && "[object Window]" == o.call(t) ? function (t) {
      try {
        return i(t);
      } catch (t) {
        return s.slice();
      }
    }(t) : i(r(t));
  };
}, function (t, e, n) {
  "use strict";
  var r = n(8),
      i = n(31),
      o = n(50),
      s = n(45),
      a = n(10),
      u = n(44),
      c = Object.assign;t.exports = !c || n(2)(function () {
    var t = {},
        e = {},
        n = Symbol(),
        r = "abcdefghijklmnopqrst";return t[n] = 7, r.split("").forEach(function (t) {
      e[t] = t;
    }), 7 != c({}, t)[n] || Object.keys(c({}, e)).join("") != r;
  }) ? function (t) {
    for (var e = a(t), n = arguments.length, c = 1, l = o.f, h = s.f; n > c;) {
      for (var d, f = u(arguments[c++]), p = l ? i(f).concat(l(f)) : i(f), g = p.length, m = 0; g > m;) {
        d = p[m++], (!r || h.call(f, d)) && (e[d] = f[d]);
      }
    }return e;
  } : c;
}, function (t) {
  t.exports = Object.is || function (t, e) {
    return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(18),
      i = n(4),
      o = n(97),
      s = [].slice,
      a = {},
      u = function u(t, e, n) {
    if (!(e in a)) {
      for (var r = [], i = 0; i < e; i++) {
        r[i] = "a[" + i + "]";
      }a[e] = Function("F,a", "return new F(" + r.join(",") + ")");
    }return a[e](t, n);
  };t.exports = Function.bind || function (t) {
    var e = r(this),
        n = s.call(arguments, 1),
        a = function a() {
      var r = n.concat(s.call(arguments));return this instanceof a ? u(e, r.length, r) : o(e, r, t);
    };return i(e.prototype) && (a.prototype = e.prototype), a;
  };
}, function (t) {
  t.exports = function (t, e, n) {
    var r = void 0 === n;switch (e.length) {case 0:
        return r ? t() : t.call(n);case 1:
        return r ? t(e[0]) : t.call(n, e[0]);case 2:
        return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);case 3:
        return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);case 4:
        return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);}return t.apply(n, e);
  };
}, function (t, e, n) {
  var r = n(1).parseInt,
      i = n(39).trim,
      o = n(67),
      s = /^[-+]?0[xX]/;t.exports = 8 !== r(o + "08") || 22 !== r(o + "0x16") ? function (t, e) {
    var n = i(t + "", 3);return r(n, e >>> 0 || (s.test(n) ? 16 : 10));
  } : r;
}, function (t, e, n) {
  var r = n(1).parseFloat,
      i = n(39).trim;t.exports = 1 / r(n(67) + "-0") == -1 / 0 ? r : function (t) {
    var e = i(t + "", 3),
        n = r(e);return 0 === n && "-" == e.charAt(0) ? -0 : n;
  };
}, function (t, e, n) {
  var r = n(23);t.exports = function (t, e) {
    if ("number" != typeof t && "Number" != r(t)) throw TypeError(e);return +t;
  };
}, function (t, e, n) {
  var r = n(4),
      i = Math.floor;t.exports = function (t) {
    return !r(t) && isFinite(t) && i(t) === t;
  };
}, function (t) {
  t.exports = Math.log1p || function (t) {
    return -1e-8 < (t = +t) && 1e-8 > t ? t - t * t / 2 : Math.log(1 + t);
  };
}, function (t, e, n) {
  "use strict";
  var r = n(33),
      i = n(28),
      o = n(38),
      s = {};n(14)(s, n(5)("iterator"), function () {
    return this;
  }), t.exports = function (t, e, n) {
    t.prototype = r(s, { next: i(1, n) }), o(t, e + " Iterator");
  };
}, function (t, e, n) {
  var r = n(3);t.exports = function (t, e, n, i) {
    try {
      return i ? e(r(n)[0], n[1]) : e(n);
    } catch (n) {
      var o = t.return;throw void 0 !== o && r(o.call(t)), n;
    }
  };
}, function (t, e, n) {
  var r = n(228);t.exports = function (t, e) {
    return new (r(t))(e);
  };
}, function (t, e, n) {
  var r = n(18),
      i = n(10),
      o = n(44),
      s = n(6);t.exports = function (t, e, n, a, u) {
    r(e);var c = i(t),
        l = o(c),
        h = s(c.length),
        d = u ? h - 1 : 0,
        f = u ? -1 : 1;if (2 > n) for (;;) {
      if (d in l) {
        a = l[d], d += f;break;
      }if (d += f, u ? 0 > d : h <= d) throw TypeError("Reduce of empty array with no initial value");
    }for (; u ? 0 <= d : h > d; d += f) {
      d in l && (a = e(a, l[d], d, c));
    }return a;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(10),
      i = n(32),
      o = n(6);t.exports = [].copyWithin || function (t, e) {
    var n = r(this),
        s = o(n.length),
        a = i(t, s),
        u = i(e, s),
        c = 2 < arguments.length ? arguments[2] : void 0,
        l = Math.min((void 0 === c ? s : i(c, s)) - u, s - a),
        h = 1;for (u < a && a < u + l && (h = -1, u += l - 1, a += l - 1); 0 < l--;) {
      u in n ? n[a] = n[u] : delete n[a], a += h, u += h;
    }return n;
  };
}, function (t) {
  t.exports = function (t, e) {
    return { value: e, done: !!t };
  };
}, function (t, e, n) {
  "use strict";
  var r = n(82);n(0)({ target: "RegExp", proto: !0, forced: r !== /./.exec }, { exec: r });
}, function (t, e, n) {
  n(8) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", { configurable: !0, get: n(53) });
}, function (t, e, n) {
  "use strict";
  var r,
      i,
      o,
      s,
      a = n(30),
      u = n(1),
      c = n(17),
      l = n(46),
      h = n(0),
      d = n(4),
      f = n(18),
      p = n(42),
      g = n(56),
      m = n(47),
      v = n(84).set,
      y = n(248)(),
      b = n(112),
      w = n(249),
      S = n(57),
      x = n(113),
      E = "Promise",
      M = u.TypeError,
      k = u.process,
      C = k && k.versions,
      O = C && C.v8 || "",
      _T = u[E],
      _ = "process" == l(k),
      A = function A() {},
      P = i = b.f,
      I = !!function () {
    try {
      var t = _T.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(A, A);
      };return (_ || "function" == typeof PromiseRejectionEvent) && t.then(A) instanceof e && 0 !== O.indexOf("6.6") && -1 === S.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      N = function N(t) {
    var e;return !(!d(t) || "function" != typeof (e = t.then)) && e;
  },
      R = function R(t, e) {
    if (!t._n) {
      t._n = !0;var n = t._c;y(function () {
        for (var r = t._v, i = 1 == t._s, o = 0, s = function s(e) {
          var n,
              o,
              s,
              a = i ? e.ok : e.fail,
              u = e.resolve,
              c = e.reject,
              l = e.domain;try {
            a ? (!i && (2 == t._h && B(t), t._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === e.promise ? c(M("Promise-chain cycle")) : (o = N(n)) ? o.call(n, u, c) : u(n)) : c(r);
          } catch (e) {
            l && !s && l.exit(), c(e);
          }
        }; n.length > o;) {
          s(n[o++]);
        }t._c = [], t._n = !1, e && !t._h && F(t);
      });
    }
  },
      F = function F(t) {
    v.call(u, function () {
      var e,
          n,
          r,
          i = t._v,
          o = L(t);if (o && (e = w(function () {
        _ ? k.emit("unhandledRejection", i, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: i }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", i);
      }), t._h = _ || L(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;
    });
  },
      L = function L(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      B = function B(t) {
    v.call(u, function () {
      var e;_ ? k.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      D = function D(t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, !e._a && (e._a = e._c.slice()), R(e, !0));
  },
      j = function j(t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw M("Promise can't be resolved itself");(e = N(t)) ? y(function () {
          var r = { _w: n, _d: !1 };try {
            e.call(t, c(j, r, 1), c(D, r, 1));
          } catch (t) {
            D.call(r, t);
          }
        }) : (n._v = t, n._s = 1, R(n, !1));
      } catch (e) {
        D.call({ _w: n, _d: !1 }, e);
      }
    }
  };I || (_T = function T(t) {
    p(this, _T, E, "_h"), f(t), r.call(this);try {
      t(c(j, this, 1), c(D, this, 1));
    } catch (t) {
      D.call(this, t);
    }
  }, (r = function r() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_T.prototype, { then: function then(t, e) {
      var n = P(m(this, _T));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = _ ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise;
    }, catch: function _catch(t) {
      return this.then(void 0, t);
    } }), o = function o() {
    var t = new r();this.promise = t, this.resolve = c(j, t, 1), this.reject = c(D, t, 1);
  }, b.f = P = function P(t) {
    return t === _T || t === s ? new o(t) : i(t);
  }), h(h.G + h.W + h.F * !I, { Promise: _T }), n(38)(_T, E), n(41)(E), s = n(7)[E], h(h.S + h.F * !I, E, { reject: function reject(t) {
      var e = P(this);return (0, e.reject)(t), e.promise;
    } }), h(h.S + h.F * (a || !I), E, { resolve: function resolve(t) {
      return x(a && this === s ? _T : this, t);
    } }), h(h.S + h.F * !(I && n(52)(function (t) {
    _T.all(t).catch(A);
  })), E, { all: function all(t) {
      var e = this,
          n = P(e),
          r = n.resolve,
          i = n.reject,
          o = w(function () {
        var n = [],
            o = 0,
            s = 1;g(t, !1, function (t) {
          var a = o++,
              u = !1;n.push(void 0), s++, e.resolve(t).then(function (t) {
            u || (u = !0, n[a] = t, --s || r(n));
          }, i);
        }), --s || r(n);
      });return o.e && i(o.v), n.promise;
    }, race: function race(t) {
      var e = this,
          n = P(e),
          r = n.reject,
          i = w(function () {
        g(t, !1, function (t) {
          e.resolve(t).then(n.resolve, r);
        });
      });return i.e && r(i.v), n.promise;
    } });
}, function (t, e, n) {
  "use strict";
  function r(t) {
    var e, n;this.promise = new t(function (t, r) {
      if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");e = t, n = r;
    }), this.resolve = i(e), this.reject = i(n);
  }var i = n(18);t.exports.f = function (t) {
    return new r(t);
  };
}, function (t, e, n) {
  var r = n(3),
      i = n(4),
      o = n(112);t.exports = function (t, e) {
    if (r(t), i(e) && e.constructor === t) return e;var n = o.f(t);return (0, n.resolve)(e), n.promise;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(9).f,
      i = n(33),
      o = n(43),
      s = n(17),
      a = n(42),
      u = n(56),
      c = n(73),
      l = n(108),
      h = n(41),
      d = n(8),
      f = n(27).fastKey,
      p = n(37),
      g = d ? "_s" : "size",
      m = function m(t, e) {
    var n,
        r = f(e);if ("F" !== r) return t._i[r];for (n = t._f; n; n = n.n) {
      if (n.k == e) return n;
    }
  };t.exports = { getConstructor: function getConstructor(t, e, n, c) {
      var l = t(function (t, r) {
        a(t, l, e, "_i"), t._t = e, t._i = i(null), t._f = void 0, t._l = void 0, t[g] = 0, null != r && u(r, n, t[c], t);
      });return o(l.prototype, { clear: function clear() {
          for (var t = p(this, e), n = t._i, r = t._f; r; r = r.n) {
            r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
          }t._f = t._l = void 0, t[g] = 0;
        }, delete: function _delete(t) {
          var n = p(this, e),
              r = m(n, t);if (r) {
            var i = r.n,
                o = r.p;delete n._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), n._f == r && (n._f = i), n._l == r && (n._l = o), n[g]--;
          }return !!r;
        }, forEach: function forEach(t) {
          p(this, e);for (var n, r = s(t, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (r(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        }, has: function has(t) {
          return !!m(p(this, e), t);
        } }), d && r(l.prototype, "size", { get: function get() {
          return p(this, e)[g];
        } }), l;
    }, def: function def(t, e, n) {
      var r,
          i,
          o = m(t, e);return o ? o.v = n : (t._l = o = { i: i = f(e, !0), k: e, v: n, p: r = t._l, n: void 0, r: !1 }, !t._f && (t._f = o), r && (r.n = o), t[g]++, "F" !== i && (t._i[i] = o)), t;
    }, getEntry: m, setStrong: function setStrong(t, e, n) {
      c(t, e, function (t, n) {
        this._t = p(t, e), this._k = n, this._l = void 0;
      }, function () {
        for (var t = this, e = t._k, n = t._l; n && n.r;) {
          n = n.p;
        }return t._t && (t._l = n = n ? n.n : t._t._f) ? l(0, "keys" == e ? n.k : "values" == e ? n.v : [n.k, n.v]) : (t._t = void 0, l(1));
      }, n ? "entries" : "values", !n, !0), h(e);
    } };
}, function (t, e, n) {
  "use strict";
  var r = n(43),
      i = n(27).getWeak,
      o = n(3),
      s = n(4),
      a = n(42),
      u = n(56),
      c = n(22),
      l = n(13),
      h = n(37),
      d = c(5),
      f = c(6),
      p = 0,
      g = function g(t) {
    return t._l || (t._l = new m());
  },
      m = function m() {
    this.a = [];
  },
      v = function v(t, e) {
    return d(t.a, function (t) {
      return t[0] === e;
    });
  };m.prototype = { get: function get(t) {
      var e = v(this, t);if (e) return e[1];
    }, has: function has(t) {
      return !!v(this, t);
    }, set: function set(t, e) {
      var n = v(this, t);n ? n[1] = e : this.a.push([t, e]);
    }, delete: function _delete(t) {
      var e = f(this.a, function (e) {
        return e[0] === t;
      });return ~e && this.a.splice(e, 1), !!~e;
    } }, t.exports = { getConstructor: function getConstructor(t, e, n, o) {
      var c = t(function (t, r) {
        a(t, c, e, "_i"), t._t = e, t._i = p++, t._l = void 0, null != r && u(r, n, t[o], t);
      });return r(c.prototype, { delete: function _delete(t) {
          if (!s(t)) return !1;var n = i(t);return !0 === n ? g(h(this, e)).delete(t) : n && l(n, this._i) && delete n[this._i];
        }, has: function has(t) {
          if (!s(t)) return !1;var n = i(t);return !0 === n ? g(h(this, e)).has(t) : n && l(n, this._i);
        } }), c;
    }, def: function def(t, e, n) {
      var r = i(o(e), !0);return !0 === r ? g(t).set(e, n) : r[t._i] = n, t;
    }, ufstore: g };
}, function (t, e, n) {
  var r = n(19),
      i = n(6);t.exports = function (t) {
    if (void 0 === t) return 0;var e = r(t),
        n = i(e);if (e !== n) throw RangeError("Wrong length!");return n;
  };
}, function (t, e, n) {
  var r = n(34),
      i = n(50),
      o = n(3),
      s = n(1).Reflect;t.exports = s && s.ownKeys || function (t) {
    var e = r.f(o(t)),
        n = i.f;return n ? e.concat(n(t)) : e;
  };
}, function (t, e, n) {
  var r = n(6),
      i = n(69),
      o = n(24);t.exports = function (t, e, n, s) {
    var a = o(t) + "",
        u = a.length,
        c = void 0 === n ? " " : n + "",
        l = r(e);if (l <= u || "" == c) return a;var h = l - u,
        d = i.call(c, Math.ceil(h / c.length));return d.length > h && (d = d.slice(0, h)), s ? d + a : a + d;
  };
}, function (t, e, n) {
  var r = n(8),
      i = n(31),
      o = n(15),
      s = n(45).f;t.exports = function (t) {
    return function (e) {
      for (var n, a = o(e), u = i(a), c = u.length, l = 0, h = []; c > l;) {
        n = u[l++], (!r || s.call(a, n)) && h.push(t ? [n, a[n]] : a[n]);
      }return h;
    };
  };
}, function (t) {
  var e = t.exports = { version: "2.6.11" };"number" == typeof __e && (__e = e);
}, function (t) {
  t.exports = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  };
}, function (t) {
  t.exports = { "border-radius": 1, "border-top-left-radius": 1, "border-top-right-radius": 1, "border-bottom-left-radius": 1, "border-bottom-right-radius": 1, "box-shadow": 1, order: 1, flex: function flex(t, e) {
      return [e + "box-flex"];
    }, "box-flex": 1, "box-align": 1, animation: 1, "animation-duration": 1, "animation-name": 1, transition: 1, "transition-duration": 1, transform: 1, "transform-style": 1, "transform-origin": 1, "backface-visibility": 1, perspective: 1, "box-pack": 1 };
}, function (t) {
  t.exports = { animation: 1, "column-count": 1, columns: 1, "font-weight": 1, opacity: 1, "order  ": 1, "z-index": 1, zoom: 1, flex: 1, "box-flex": 1, transform: 1, perspective: 1, "box-pack": 1, "box-align": 1, colspan: 1, rowspan: 1 };
}, function (t, e, n) {
  "use strict";
  n(125);var r = n(321),
      i = n(128),
      o = n(127),
      s = n(129),
      a = n(326),
      u = n(327),
      c = function c(t, e, n, i) {
    r(e).forEach(function (e) {
      t[i ? i(e) : e] = n;
    });
  },
      l = { cssUnitless: n(123) },
      h = function h(t, e, n, r) {
    "string" == typeof t && (t = function (t) {
      t = (t || "").split(";");var e = {};return t.forEach(function (t) {
        var n = t.split(":");2 == n.length && (e[n[0].trim()] = n[1].trim());
      }), e;
    }(t)), (e = e || l).cssUnitless = e.cssUnitless || l.cssUnitless, r = r || {};var d,
        f,
        p,
        g,
        m,
        v,
        y,
        b,
        w = e.scope || {},
        S = null == e.addUnits ? !(w && null != w.addUnits) || w.addUnits : e.addUnits,
        x = (null == e.cssUnitless ? w ? w.cssUnitless : null : e.cssUnitless) || {},
        E = (e.cssUnit || w ? w.cssUnit : null) || "px",
        M = e.prefixProperties || (w ? w.prefixProperties : null) || {},
        k = e.camelize ? o : i;for (p in t) {
      if (s(t, p)) {
        if (g = t[p], f = i(n ? n + p : p), d = !1, b = !1, u(g) && (y = g.call(w || t, g, p, f, t), a(y) && null != y.value ? (g = y.value, b = y.prefix, f = y.name ? i(y.name) : f) : g = y), v = "number" == (m = typeof g === "undefined" ? "undefined" : _typeof(g)) || "string" == m && "" != g && 1 * g == g, null == g || null == f || "" === f) continue;if ((v || "string" == m) && (d = !0), !d && null != g.value && g.prefix && (d = !0, b = g.prefix, g = g.value), d) {
          if (b = b || !!M[f], v && (g = S && !(f in x) ? g + E : g + ""), "border" != f && (f.indexOf("border") || ~f.indexOf("radius") || ~f.indexOf("width")) || !v || (f += "-width"), !f.indexOf("border-radius-") && (f.replace(/border(-radius)(-(.*))/, function (t, e, n) {
            var r = { "-top": ["-top-left", "-top-right"], "-left": ["-top-left", "-bottom-left"], "-right": ["-top-right", "-bottom-right"], "-bottom": ["-bottom-left", "-bottom-right"] };n in r ? (f = [], r[n].forEach(function (t) {
              f.push("border" + t + e);
            })) : f = "border" + n + e;
          }), Array.isArray(f))) {
            f.forEach(function (t) {
              b ? c(r, t, g, k) : r[k(t)] = g;
            });continue;
          }b ? c(r, f, g, k) : r[k(f)] = g;
        } else h(g, e, f + "-", r);
      }
    }return r;
  };t.exports = h;
}, function (t, e, n) {
  "use strict";
  var r = n(126),
      i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
      o = "undefined" == typeof document ? {} : document.documentElement.style,
      s = function () {
    var t = function () {
      for (var t in o) {
        if (i.test(t)) return t.match(i)[0];
      }return "WebkitOpacity" in o ? "Webkit" : "KhtmlOpacity" in o ? "Khtml" : "";
    }(),
        e = t.toLowerCase();return { style: t, css: "-" + e + "-", dom: { Webkit: "WebKit", ms: "MS", o: "WebKit" }[t] || r(t) };
  }();t.exports = s;
}, function (t) {
  "use strict";
  t.exports = function (t) {
    return t.length ? t.charAt(0).toUpperCase() + t.substring(1) : t;
  };
}, function (t, e, n) {
  "use strict";
  var r = function r(t, e) {
    return e ? e.toUpperCase() : "";
  },
      i = n(323);t.exports = function (t) {
    return t ? t.replace(i, r) : "";
  };
}, function (t, e, n) {
  "use strict";
  var r = n(324);t.exports = function (t) {
    return r(t).toLowerCase();
  };
}, function (t) {
  "use strict";
  var e = Object.prototype.hasOwnProperty;t.exports = function (t, n) {
    return e.call(t, n);
  };
}, function (t) {
  t.exports = function (t) {
    if (!t.webpackPolyfill) {
      var e = Object.create(t);e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function get() {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: !0, get: function get() {
          return e.i;
        } }), Object.defineProperty(e, "exports", { enumerable: !0 }), e.webpackPolyfill = 1;
    }return e;
  };
}, function (t, e, n) {
  function r(t, e) {
    this._init(t, e);
  }var i = n(320).string,
      o = n(329),
      s = n(330);r.prototype._init = function (t, e) {
    this.container = document.createElement("div"), this.container.id = "j3-info-popup";_extends({}, s.defaultContainerStyles, e || {});var n = i(s.defaultContainerStyles, { addUnits: !0 });n && (this.container.style.cssText = n), (t || document.body).appendChild(this.container);
  }, r.prototype.addPanel = function (t, e) {
    var n = document.createElement("div");if (n.classList.add("panel"), 0 < this.container.children.length && (n.style.cssText = i(s.defaultPanelStyles)), t) {
      var r = document.createElement("div");r.style.cssText = i(s.defaultPanelTitleStyles), r.innerText = t, n.appendChild(r);
    }if (e) {
      var a = document.createElement("div");a.style.cssText = i(s.defaultPanelContentStyles), o.number(e) || o.boolean(e) || o.string(e) ? this._generatePrimitive(n, a, e) : o.function(e) ? this._generateFunction(n, a, e) : e.nodeType && 1 === e.nodeType ? this._generateDOMElement(n, a, e) : o.object(e) ? this._generateObject(n, a, e) : console.error("Unsupported content data type");
    }this.container.appendChild(n);
  }, r.prototype._generatePrimitive = function (t, e, n) {
    e.innerText = n, t.appendChild(e);
  }, r.prototype._generateFunction = function (t, e, n) {
    t.appendChild(e);var r = function r() {
      var t = n();t ? (e.innerText = t, requestAnimationFrame(r)) : (e.innerText = "void function", console.warn("Detected void return in callback function. Callback function executed only once"));
    };requestAnimationFrame(r);
  }, r.prototype._generateDOMElement = function (t, e, n) {
    e.innerHTML = n.innerHTML, t.appendChild(e);
  }, r.prototype._generateObject = function (t, e, n) {
    e.innerText = JSON.stringify(n), t.appendChild(e);
  }, t.exports = r;
}, function (t, e, n) {
  "use strict";
  (function (t) {
    function r() {
      return o();
    }n.d(e, "a", function () {
      return r;
    });var i = function i(t, e, n, r) {
      var o = function o(e, i, _o) {
        return new r(function (t) {
          null !== _o && (_o = n.stringify(_o)), t(_o);
        }).then(function (n) {
          return t(i, { method: e, body: n });
        }).then(function (t) {
          return t.json();
        });
      },
          s = function s(t, e) {
        return o(t, e, null);
      },
          a = s.bind(null, "GET"),
          u = o.bind(null, "PUT"),
          c = o.bind(null, "POST"),
          l = s.bind(null, "DELETE"),
          h = function h(t, e) {
        return function (n) {
          for (var _len = arguments.length, r = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            r[_key - 1] = arguments[_key];
          }

          return t.apply(undefined, [e(n)].concat(r));
        };
      },
          d = function d(t) {
        return function (i, o) {
          return r.resolve(new e(n.stringify({ address: i.slice(t.length), method: o.method, body: n.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var o = "http://" + t,
              s = o + "/api";return { createUser: function createUser(t) {
              return c(s, { devicetype: t });
            }, user: function user(f) {
              Cookies.set("hueid", f, { expires: 30 });var p = s + "/" + f,
                  g = p + "/capabilities",
                  m = p + "/config",
                  v = p + "/lights",
                  y = p + "/groups",
                  b = p + "/schedules",
                  w = p + "/scenes",
                  S = p + "/sensors",
                  x = p + "/rules",
                  E = p + "/resourcelinks",
                  M = function M(t) {
                return function (e) {
                  return t + "/" + e;
                };
              },
                  k = M(v),
                  C = M(y),
                  O = M(b),
                  T = M(w),
                  _ = M(S),
                  A = M(x),
                  P = M(E);return { getCapabilities: a.bind(null, g), deleteUser: h(l, function (t) {
                  return m + "/whitelist/" + t;
                }), getConfig: a.bind(null, m), setConfig: u.bind(null, m), getFullState: a.bind(null, p), getLights: a.bind(null, v), getNewLights: a.bind(null, v + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(v, t);
                }, getLight: h(a, k), setLight: h(u, k), setLightState: h(u, function (t) {
                  return k(t) + "/state";
                }), deleteLight: h(l, k), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: h(a, C), setGroup: h(u, C), setGroupState: h(u, function (t) {
                  return C(t) + "/action";
                }), deleteGroup: h(l, C), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: h(a, O), setSchedule: h(u, O), deleteSchedule: h(l, O), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return i(d(o), e, n, r).bridge(t).user(f);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: h(a, T), setScene: h(u, T), setSceneLightState: function setSceneLightState(t, e, n) {
                  return u(T(t) + "/lightstates/" + e, n);
                }, deleteScene: h(l, T), getSensors: a.bind(null, S), createSensor: c.bind(null, S), searchForNewSensors: c.bind(null, S, null), getNewSensors: a.bind(null, S + "/new"), getSensor: h(a, _), setSensor: h(u, _), setSensorConfig: h(u, function (t) {
                  return _(t) + "/config";
                }), setSensorState: h(u, function (t) {
                  return _(t) + "/state";
                }), deleteSensor: h(l, _), getRules: a.bind(null, x), createRule: c.bind(null, x), getRule: h(a, A), setRule: h(u, A), deleteRule: h(l, A), ruleActionGenerator: function ruleActionGenerator() {
                  return i(d(p), e, n, r).bridge(t).user(f);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: h(a, P), setResourceLink: h(u, P), deleteResourceLink: h(l, P) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = i.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = o));
  }).call(this, n(130)(t));
}, function (t, e, n) {
  function r(t) {
    if (this.support = i.webAudio && i.mediaStream, this.gain = 1, this.support) {
      var e = this.context = new i.AudioContext();this.microphone = e.createMediaStreamSource(t), this.gainFilter = e.createGain(), this.destination = e.createMediaStreamDestination(), this.outputStream = this.destination.stream, this.microphone.connect(this.gainFilter), this.gainFilter.connect(this.destination), t.addTrack(this.outputStream.getAudioTracks()[0]), t.removeTrack(t.getAudioTracks()[0]);
    }this.stream = t;
  }var i = n(333);r.prototype.setGain = function (t) {
    this.support && (this.gainFilter.gain.value = t, this.gain = t);
  }, r.prototype.getGain = function () {
    return this.gain;
  }, r.prototype.off = function () {
    return this.setGain(0);
  }, r.prototype.on = function () {
    this.setGain(1);
  }, t.exports = r;
}, function (t, e, n) {
  "use strict";
  n(135);var r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(n(307));r.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), r.default._babelPolyfill = !0;
}, function (t, e, n) {
  "use strict";
  n(136), n(279), n(281), n(284), n(286), n(288), n(290), n(292), n(294), n(296), n(298), n(300), n(302), n(306);
}, function (t, e, n) {
  n(137), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(216), n(218), n(219), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(229), n(230), n(231), n(232), n(233), n(234), n(235), n(236), n(237), n(238), n(239), n(240), n(241), n(81), n(242), n(109), n(243), n(110), n(244), n(245), n(246), n(247), n(111), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), n(267), n(268), n(269), n(270), n(271), n(272), n(273), n(274), n(275), n(276), n(277), n(278), t.exports = n(7);
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      i = n(13),
      o = n(8),
      s = n(0),
      a = n(11),
      u = n(27).KEY,
      c = n(2),
      l = n(48),
      h = n(38),
      d = n(29),
      f = n(5),
      p = n(62),
      g = n(90),
      m = n(139),
      v = n(51),
      y = n(3),
      b = n(4),
      w = n(10),
      S = n(15),
      x = n(26),
      E = n(28),
      M = n(33),
      k = n(93),
      C = n(20),
      O = n(50),
      T = n(9),
      _ = n(31),
      A = C.f,
      P = T.f,
      I = k.f,
      _N3 = r.Symbol,
      R = r.JSON,
      F = R && R.stringify,
      L = "prototype",
      B = f("_hidden"),
      D = f("toPrimitive"),
      j = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      V = l("symbols"),
      z = l("op-symbols"),
      H = Object[L],
      G = "function" == typeof _N3 && !!O.f,
      W = r.QObject,
      K = !W || !W[L] || !W[L].findChild,
      q = o && c(function () {
    return 7 != M(P({}, "a", { get: function get() {
        return P(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var r = A(H, e);r && delete H[e], P(t, e, n), r && t !== H && P(H, e, r);
  } : P,
      J = function J(t) {
    var e = V[t] = M(_N3[L]);return e._k = t, e;
  },
      Y = G && "symbol" == _typeof(_N3.iterator) ? function (t) {
    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  } : function (t) {
    return t instanceof _N3;
  },
      X = function X(t, e, n) {
    return t === H && X(z, e, n), y(t), e = x(e, !0), y(n), i(V, e) ? (n.enumerable ? (i(t, B) && t[B][e] && (t[B][e] = !1), n = M(n, { enumerable: E(0, !1) })) : (!i(t, B) && P(t, B, E(1, {})), t[B][e] = !0), q(t, e, n)) : P(t, e, n);
  },
      $ = function $(t, e) {
    y(t);for (var n, r = m(e = S(e)), i = 0, o = r.length; o > i;) {
      X(t, n = r[i++], e[n]);
    }return t;
  },
      Q = function Q(t) {
    var e = j.call(this, t = x(t, !0));return (this !== H || !i(V, t) || i(z, t)) && (!(e || !i(this, t) || !i(V, t) || i(this, B) && this[B][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = S(t), e = x(e, !0), t !== H || !i(V, e) || i(z, e)) {
      var n = A(t, e);return n && i(V, e) && !(i(t, B) && t[B][e]) && (n.enumerable = !0), n;
    }
  },
      tt = function tt(t) {
    for (var e, n = I(S(t)), r = [], o = 0; n.length > o;) {
      i(V, e = n[o++]) || e == B || e == u || r.push(e);
    }return r;
  },
      et = function et(t) {
    for (var e, n = t === H, r = I(n ? z : S(t)), o = [], s = 0; r.length > s;) {
      i(V, e = r[s++]) && (!n || i(H, e)) && o.push(V[e]);
    }return o;
  };G || (a((_N3 = function N() {
    if (this instanceof _N3) throw TypeError("Symbol is not a constructor!");var t = d(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === H && e.call(z, n), i(this, B) && i(this[B], t) && (this[B][t] = !1), q(this, t, E(1, n));
    };return o && K && q(H, t, { configurable: !0, set: e }), J(t);
  })[L], "toString", function () {
    return this._k;
  }), C.f = Z, T.f = X, n(34).f = k.f = tt, n(45).f = Q, O.f = et, o && !n(30) && a(H, "propertyIsEnumerable", Q, !0), p.f = function (t) {
    return J(f(t));
  }), s(s.G + s.W + s.F * !G, { Symbol: _N3 });for (var nt = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], rt = 0; nt.length > rt;) {
    f(nt[rt++]);
  }for (var it = _(f.store), ot = 0; it.length > ot;) {
    g(it[ot++]);
  }s(s.S + s.F * !G, "Symbol", { for: function _for(t) {
      return i(U, t += "") ? U[t] : U[t] = _N3(t);
    }, keyFor: function keyFor(t) {
      if (!Y(t)) throw TypeError(t + " is not a symbol!");for (var e in U) {
        if (U[e] === t) return e;
      }
    }, useSetter: function useSetter() {
      K = !0;
    }, useSimple: function useSimple() {
      K = !1;
    } }), s(s.S + s.F * !G, "Object", { create: function create(t, e) {
      return void 0 === e ? M(t) : $(M(t), e);
    }, defineProperty: X, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: tt, getOwnPropertySymbols: et });var st = c(function () {
    O.f(1);
  });s(s.S + s.F * st, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(t) {
      return O.f(w(t));
    } }), R && s(s.S + s.F * (!G || c(function () {
    var t = _N3();return "[null]" != F([t]) || "{}" != F({ a: t }) || "{}" != F(Object(t));
  })), "JSON", { stringify: function stringify(t) {
      for (var e, n, r = [t], i = 1; arguments.length > i;) {
        r.push(arguments[i++]);
      }if (n = e = r[1], (b(e) || void 0 !== t) && !Y(t)) return v(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !Y(_e)) return _e;
      }), r[1] = e, F.apply(R, r);
    } }), _N3[L][D] || n(14)(_N3[L], D, _N3[L].valueOf), h(_N3, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0);
}, function (t, e, n) {
  t.exports = n(48)("native-function-to-string", Function.toString);
}, function (t, e, n) {
  var r = n(31),
      i = n(50),
      o = n(45);t.exports = function (t) {
    var e = r(t),
        n = i.f;if (n) for (var s, a = n(t), u = o.f, c = 0; a.length > c;) {
      u.call(t, s = a[c++]) && e.push(s);
    }return e;
  };
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { create: n(33) });
}, function (t, e, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperty: n(9).f });
}, function (t, e, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperties: n(92) });
}, function (t, e, n) {
  var r = n(15),
      i = n(20).f;n(21)("getOwnPropertyDescriptor", function () {
    return function (t, e) {
      return i(r(t), e);
    };
  });
}, function (t, e, n) {
  var r = n(10),
      i = n(35);n(21)("getPrototypeOf", function () {
    return function (t) {
      return i(r(t));
    };
  });
}, function (t, e, n) {
  var r = n(10),
      i = n(31);n(21)("keys", function () {
    return function (t) {
      return i(r(t));
    };
  });
}, function (t, e, n) {
  n(21)("getOwnPropertyNames", function () {
    return n(93).f;
  });
}, function (t, e, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("freeze", function (t) {
    return function (e) {
      return t && r(e) ? t(i(e)) : e;
    };
  });
}, function (t, e, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("seal", function (t) {
    return function (e) {
      return t && r(e) ? t(i(e)) : e;
    };
  });
}, function (t, e, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("preventExtensions", function (t) {
    return function (e) {
      return t && r(e) ? t(i(e)) : e;
    };
  });
}, function (t, e, n) {
  var r = n(4);n(21)("isFrozen", function (t) {
    return function (e) {
      return !r(e) || !!t && t(e);
    };
  });
}, function (t, e, n) {
  var r = n(4);n(21)("isSealed", function (t) {
    return function (e) {
      return !r(e) || !!t && t(e);
    };
  });
}, function (t, e, n) {
  var r = n(4);n(21)("isExtensible", function (t) {
    return function (e) {
      return !!r(e) && (!t || t(e));
    };
  });
}, function (t, e, n) {
  var r = n(0);r(r.S + r.F, "Object", { assign: n(94) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { is: n(95) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { setPrototypeOf: n(66).set });
}, function (t, e, n) {
  "use strict";
  var r = n(46);({})[n(5)("toStringTag")] = "z", n(11)(Object.prototype, "toString", function () {
    return "[object " + r(this) + "]";
  }, !0);
}, function (t, e, n) {
  var r = n(0);r(r.P, "Function", { bind: n(96) });
}, function (t, e, n) {
  var r = n(9).f,
      i = Function.prototype,
      o = /^\s*function ([^ (]*)/,
      s = "name";s in i || n(8) && r(i, s, { configurable: !0, get: function get() {
      try {
        return ("" + this).match(o)[1];
      } catch (t) {
        return "";
      }
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(4),
      i = n(35),
      o = n(5)("hasInstance"),
      s = Function.prototype;o in s || n(9).f(s, o, { value: function value(t) {
      if ("function" != typeof this || !r(t)) return !1;if (!r(this.prototype)) return t instanceof this;for (; t = i(t);) {
        if (this.prototype === t) return !0;
      }return !1;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(98);r(r.G + r.F * (parseInt != i), { parseInt: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(99);r(r.G + r.F * (parseFloat != i), { parseFloat: i });
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      i = n(13),
      o = n(23),
      s = n(68),
      a = n(26),
      u = n(2),
      c = n(34).f,
      l = n(20).f,
      h = n(9).f,
      d = n(39).trim,
      f = "Number",
      _p = r[f],
      g = _p,
      m = _p.prototype,
      v = o(n(33)(m)) == f,
      y = "trim" in String.prototype,
      b = function b(t) {
    var e = a(t, !1);if ("string" == typeof e && 2 < e.length) {
      var n,
          r,
          i,
          o = (e = y ? e.trim() : d(e, 3)).charCodeAt(0);if (43 === o || 45 === o) {
        if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
      } else if (48 === o) {
        switch (e.charCodeAt(1)) {case 66:case 98:
            r = 2, i = 49;break;case 79:case 111:
            r = 8, i = 55;break;default:
            return +e;}for (var s, u = e.slice(2), c = 0, l = u.length; c < l; c++) {
          if (48 > (s = u.charCodeAt(c)) || s > i) return NaN;
        }return parseInt(u, r);
      }
    }return +e;
  };if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
    _p = function p(t) {
      var e = 1 > arguments.length ? 0 : t,
          n = this;return n instanceof _p && (v ? u(function () {
        m.valueOf.call(n);
      }) : o(n) != f) ? s(new g(b(e)), n, _p) : b(e);
    };for (var w, S = n(8) ? c(g) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; S.length > x; x++) {
      i(g, w = S[x]) && !i(_p, w) && h(_p, w, l(g, w));
    }_p.prototype = m, m.constructor = _p, n(11)(r, f, _p);
  }
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(19),
      o = n(100),
      s = n(69),
      a = 1..toFixed,
      u = Math.floor,
      c = [0, 0, 0, 0, 0, 0],
      l = "Number.toFixed: incorrect invocation!",
      h = "0",
      d = function d(t, e) {
    for (var n = -1, r = e; 6 > ++n;) {
      r += t * c[n], c[n] = r % 1e7, r = u(r / 1e7);
    }
  },
      f = function f(t) {
    for (var e = 6, n = 0; 0 <= --e;) {
      n += c[e], c[e] = u(n / t), n = n % t * 1e7;
    }
  },
      p = function p() {
    for (var t = 6, e = ""; 0 <= --t;) {
      if ("" !== e || 0 == t || 0 !== c[t]) {
        var n = c[t] + "";e = "" === e ? n : e + s.call(h, 7 - n.length) + n;
      }
    }return e;
  },
      g = function g(t, e, n) {
    return 0 === e ? n : 1 == e % 2 ? g(t, e - 1, n * t) : g(t * t, e / 2, n);
  };r(r.P + r.F * ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0) || !n(2)(function () {
    a.call({});
  })), "Number", { toFixed: function toFixed(t) {
      var e,
          n,
          r,
          a,
          u = o(this, l),
          c = i(t),
          m = "",
          v = h;if (0 > c || 20 < c) throw RangeError(l);if (u != u) return "NaN";if (-1e21 >= u || 1e21 <= u) return u + "";if (0 > u && (m = "-", u = -u), 1e-21 < u) if (n = 0 > (e = function (t) {
        for (var e = 0, n = t; 4096 <= n;) {
          e += 12, n /= 4096;
        }for (; 2 <= n;) {
          e += 1, n /= 2;
        }return e;
      }(u * g(2, 69, 1)) - 69) ? u * g(2, -e, 1) : u / g(2, e, 1), n *= 4503599627370496, 0 < (e = 52 - e)) {
        for (d(0, n), r = c; 7 <= r;) {
          d(1e7, 0), r -= 7;
        }for (d(g(10, r, 1), 0), r = e - 1; 23 <= r;) {
          f(8388608), r -= 23;
        }f(1 << r), d(1, 1), f(2), v = p();
      } else d(0, n), d(1 << -e, 0), v = p() + s.call(h, c);return 0 < c ? v = m + ((a = v.length) <= c ? "0." + s.call(h, c - a) + v : v.slice(0, a - c) + "." + v.slice(a - c)) : v = m + v, v;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(2),
      o = n(100),
      s = 1..toPrecision;r(r.P + r.F * (i(function () {
    return "1" !== s.call(1, void 0);
  }) || !i(function () {
    s.call({});
  })), "Number", { toPrecision: function toPrecision(t) {
      var e = o(this, "Number#toPrecision: incorrect invocation!");return void 0 === t ? s.call(e) : s.call(e, t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { EPSILON: 2220446049250313e-31 });
}, function (t, e, n) {
  var r = n(0),
      i = n(1).isFinite;r(r.S, "Number", { isFinite: function isFinite(t) {
      return "number" == typeof t && i(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { isInteger: n(101) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { isNaN: function isNaN(t) {
      return t != t;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(101),
      o = Math.abs;r(r.S, "Number", { isSafeInteger: function isSafeInteger(t) {
      return i(t) && 9007199254740991 >= o(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
}, function (t, e, n) {
  var r = n(0),
      i = n(99);r(r.S + r.F * (Number.parseFloat != i), "Number", { parseFloat: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(98);r(r.S + r.F * (Number.parseInt != i), "Number", { parseInt: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(102),
      o = Math.sqrt,
      s = Math.acosh;r(r.S + r.F * !(s && 710 == Math.floor(s(Number.MAX_VALUE)) && s(1 / 0) == 1 / 0), "Math", { acosh: function acosh(t) {
      return 1 > (t = +t) ? NaN : 94906265.62425156 < t ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1));
    } });
}, function (t, e, n) {
  var r = n(0),
      i = Math.asinh;r(r.S + r.F * !(i && 0 < 1 / i(0)), "Math", { asinh: function t(e) {
      return isFinite(e = +e) && 0 != e ? 0 > e ? -t(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = Math.atanh;r(r.S + r.F * !(i && 0 > 1 / i(-0)), "Math", { atanh: function atanh(t) {
      return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(70);r(r.S, "Math", { cbrt: function cbrt(t) {
      return i(t = +t) * Math.pow(Math.abs(t), 1 / 3);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { clz32: function clz32(t) {
      return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = Math.exp;r(r.S, "Math", { cosh: function cosh(t) {
      return (i(t = +t) + i(-t)) / 2;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(71);r(r.S + r.F * (i != Math.expm1), "Math", { expm1: i });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { fround: n(182) });
}, function (t, e, n) {
  var r = n(70),
      i = Math.pow,
      o = i(2, -52),
      s = i(2, -23),
      a = i(2, 127) * (2 - s),
      u = i(2, -126);t.exports = Math.fround || function (t) {
    var e,
        n,
        i = Math.abs(t),
        c = r(t);return i < u ? c * function (t) {
      return t + 1 / o - 1 / o;
    }(i / u / s) * u * s : (n = (e = (1 + s / o) * i) - (e - i)) > a || n != n ? c * (1 / 0) : c * n;
  };
}, function (t, e, n) {
  var r = n(0),
      i = Math.abs;r(r.S, "Math", { hypot: function hypot() {
      for (var t, e, n = 0, r = 0, o = arguments.length, s = 0; r < o;) {
        s < (t = i(arguments[r++])) ? (n = n * (e = s / t) * e + 1, s = t) : 0 < t ? n += (e = t / s) * e : n += t;
      }return s == 1 / 0 ? 1 / 0 : s * Math.sqrt(n);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = Math.imul;r(r.S + r.F * n(2)(function () {
    return -5 != i(4294967295, 5) || 2 != i.length;
  }), "Math", { imul: function imul(t, e) {
      var n = 65535,
          r = +t,
          i = +e,
          o = n & r,
          s = n & i;return 0 | o * s + ((n & r >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log10: function log10(t) {
      return Math.log(t) * Math.LOG10E;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log1p: n(102) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log2: function log2(t) {
      return Math.log(t) / Math.LN2;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { sign: n(70) });
}, function (t, e, n) {
  var r = n(0),
      i = n(71),
      o = Math.exp;r(r.S + r.F * n(2)(function () {
    return !0;
  }), "Math", { sinh: function sinh(t) {
      return 1 > Math.abs(t = +t) ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(71),
      o = Math.exp;r(r.S, "Math", { tanh: function tanh(t) {
      var e = i(t = +t),
          n = i(-t);return e == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (e - n) / (o(t) + o(-t));
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { trunc: function trunc(t) {
      return (0 < t ? Math.floor : Math.ceil)(t);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(32),
      o = String.fromCharCode,
      s = String.fromCodePoint;r(r.S + r.F * (!!s && 1 != s.length), "String", { fromCodePoint: function fromCodePoint() {
      for (var t, e = [], n = arguments.length, r = 0; n > r;) {
        if (t = +arguments[r++], i(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");e.push(65536 > t ? o(t) : o(55296 + ((t -= 65536) >> 10), t % 1024 + 56320));
      }return e.join("");
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(15),
      o = n(6);r(r.S, "String", { raw: function raw(t) {
      for (var e = i(t.raw), n = o(e.length), r = arguments.length, s = [], a = 0; n > a;) {
        s.push(e[a++] + ""), a < r && s.push(arguments[a] + "");
      }return s.join("");
    } });
}, function (t, e, n) {
  "use strict";
  n(39)("trim", function (t) {
    return function () {
      return t(this, 3);
    };
  });
}, function (t, e, n) {
  "use strict";
  var r = n(72)(!0);n(73)(String, "String", function (t) {
    this._t = t + "", this._i = 0;
  }, function () {
    var t,
        e = this._t,
        n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = r(e, n), this._i += t.length, { value: t, done: !1 });
  });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(72)(!1);r(r.P, "String", { codePointAt: function codePointAt(t) {
      return i(this, t);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(6),
      o = n(74),
      s = "endsWith";r(r.P + r.F * n(76)(s), "String", { endsWith: function endsWith(t) {
      var e = o(this, t, s),
          n = 1 < arguments.length ? arguments[1] : void 0,
          r = i(e.length),
          a = void 0 === n ? r : Math.min(i(n), r),
          u = t + "";return e.slice(a - u.length, a) === u;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(74),
      o = "includes";r(r.P + r.F * n(76)(o), "String", { includes: function includes(t) {
      return !!~i(this, t, o).indexOf(t, 1 < arguments.length ? arguments[1] : void 0);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.P, "String", { repeat: n(69) });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(6),
      o = n(74),
      s = "startsWith";r(r.P + r.F * n(76)(s), "String", { startsWith: function startsWith(t) {
      var e = o(this, t, s),
          n = i(Math.min(1 < arguments.length ? arguments[1] : void 0, e.length)),
          r = t + "";return e.slice(n, n + r.length) === r;
    } });
}, function (t, e, n) {
  "use strict";
  n(12)("anchor", function (t) {
    return function (e) {
      return t(this, "a", "name", e);
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("big", function (t) {
    return function () {
      return t(this, "big", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("blink", function (t) {
    return function () {
      return t(this, "blink", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("bold", function (t) {
    return function () {
      return t(this, "b", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("fixed", function (t) {
    return function () {
      return t(this, "tt", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("fontcolor", function (t) {
    return function (e) {
      return t(this, "font", "color", e);
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("fontsize", function (t) {
    return function (e) {
      return t(this, "font", "size", e);
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("italics", function (t) {
    return function () {
      return t(this, "i", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("link", function (t) {
    return function (e) {
      return t(this, "a", "href", e);
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("small", function (t) {
    return function () {
      return t(this, "small", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("strike", function (t) {
    return function () {
      return t(this, "strike", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("sub", function (t) {
    return function () {
      return t(this, "sub", "", "");
    };
  });
}, function (t, e, n) {
  "use strict";
  n(12)("sup", function (t) {
    return function () {
      return t(this, "sup", "", "");
    };
  });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Date", { now: function now() {
      return new Date().getTime();
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(10),
      o = n(26);r(r.P + r.F * n(2)(function () {
    return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
        return 1;
      } });
  }), "Date", { toJSON: function toJSON() {
      var t = i(this),
          e = o(t);return "number" != typeof e || isFinite(e) ? t.toISOString() : null;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(217);r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", { toISOString: i });
}, function (t, e, n) {
  "use strict";
  var r = n(2),
      i = Date.prototype.getTime,
      o = Date.prototype.toISOString,
      s = function s(t) {
    return 9 < t ? t : "0" + t;
  };t.exports = r(function () {
    return "0385-07-25T07:06:39.999Z" != o.call(new Date(-50000000000001));
  }) || !r(function () {
    o.call(new Date(NaN));
  }) ? function () {
    if (!isFinite(i.call(this))) throw RangeError("Invalid time value");var t = this,
        e = t.getUTCFullYear(),
        n = t.getUTCMilliseconds(),
        r = 0 > e ? "-" : 9999 < e ? "+" : "";return r + ("00000" + Math.abs(e)).slice(r ? -6 : -4) + "-" + s(t.getUTCMonth() + 1) + "-" + s(t.getUTCDate()) + "T" + s(t.getUTCHours()) + ":" + s(t.getUTCMinutes()) + ":" + s(t.getUTCSeconds()) + "." + (99 < n ? n : "0" + s(n)) + "Z";
  } : o;
}, function (t, e, n) {
  var r = Date.prototype,
      i = "Invalid Date",
      o = "toString",
      s = r[o],
      a = r.getTime;new Date(NaN) + "" != i && n(11)(r, o, function () {
    var t = a.call(this);return t == t ? s.call(this) : i;
  });
}, function (t, e, n) {
  var r = n(5)("toPrimitive"),
      i = Date.prototype;r in i || n(14)(i, r, n(220));
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      i = n(26),
      o = "number";t.exports = function (t) {
    if ("string" !== t && t !== o && "default" !== t) throw TypeError("Incorrect hint");return i(r(this), t != o);
  };
}, function (t, e, n) {
  var r = n(0);r(r.S, "Array", { isArray: n(51) });
}, function (t, e, n) {
  "use strict";
  var r = n(17),
      i = n(0),
      o = n(10),
      s = n(104),
      a = n(77),
      u = n(6),
      c = n(78),
      l = n(79);i(i.S + i.F * !n(52)(function (t) {
    Array.from(t);
  }), "Array", { from: function from(t) {
      var e,
          n,
          i,
          h,
          d = o(t),
          f = "function" == typeof this ? this : Array,
          p = arguments.length,
          g = 1 < p ? arguments[1] : void 0,
          m = void 0 !== g,
          v = 0,
          y = l(d);if (m && (g = r(g, 2 < p ? arguments[2] : void 0, 2)), null == y || f == Array && a(y)) for (n = new f(e = u(d.length)); e > v; v++) {
        c(n, v, m ? g(d[v], v) : d[v]);
      } else for (h = y.call(d), n = new f(); !(i = h.next()).done; v++) {
        c(n, v, m ? s(h, g, [i.value, v], !0) : i.value);
      }return n.length = v, n;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(78);r(r.S + r.F * n(2)(function () {
    function t() {}return !(Array.of.call(t) instanceof t);
  }), "Array", { of: function of() {
      for (var t = 0, e = arguments.length, n = new ("function" == typeof this ? this : Array)(e); e > t;) {
        i(n, t, arguments[t++]);
      }return n.length = e, n;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(15),
      o = [].join;r(r.P + r.F * (n(44) != Object || !n(16)(o)), "Array", { join: function join(t) {
      return o.call(i(this), void 0 === t ? "," : t);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(65),
      o = n(23),
      s = n(32),
      a = n(6),
      u = [].slice;r(r.P + r.F * n(2)(function () {
    i && u.call(i);
  }), "Array", { slice: function slice(t, e) {
      var n = a(this.length),
          r = o(this);if (e = void 0 === e ? n : e, "Array" == r) return u.call(this, t, e);for (var i = s(t, n), c = s(e, n), l = a(c - i), h = Array(l), d = 0; d < l; d++) {
        h[d] = "String" == r ? this.charAt(i + d) : this[i + d];
      }return h;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(18),
      o = n(10),
      s = n(2),
      a = [].sort,
      u = [1, 2, 3];r(r.P + r.F * (s(function () {
    u.sort(void 0);
  }) || !s(function () {
    u.sort(null);
  }) || !n(16)(a)), "Array", { sort: function sort(t) {
      return void 0 === t ? a.call(o(this)) : a.call(o(this), i(t));
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(0),
      o = n(16)([].forEach, !0);r(r.P + r.F * !o, "Array", { forEach: function forEach(t) {
      return i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  var r = n(4),
      i = n(51),
      o = n(5)("species");t.exports = function (t) {
    var e;return i(t) && ("function" == typeof (e = t.constructor) && (e === Array || i(e.prototype)) && (e = void 0), r(e) && null === (e = e[o]) && (e = void 0)), void 0 === e ? Array : e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(1);r(r.P + r.F * !n(16)([].map, !0), "Array", { map: function map(t) {
      return i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(2);r(r.P + r.F * !n(16)([].filter, !0), "Array", { filter: function filter(t) {
      return i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(3);r(r.P + r.F * !n(16)([].some, !0), "Array", { some: function some(t) {
      return i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(4);r(r.P + r.F * !n(16)([].every, !0), "Array", { every: function every(t) {
      return i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(106);r(r.P + r.F * !n(16)([].reduce, !0), "Array", { reduce: function reduce(t) {
      return i(this, t, arguments.length, arguments[1], !1);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(106);r(r.P + r.F * !n(16)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
      return i(this, t, arguments.length, arguments[1], !0);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(49)(!1),
      o = [].indexOf,
      s = !!o && 0 > 1 / [1].indexOf(1, -0);r(r.P + r.F * (s || !n(16)(o)), "Array", { indexOf: function indexOf(t) {
      return s ? o.apply(this, arguments) || 0 : i(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(15),
      o = n(19),
      s = n(6),
      a = [].lastIndexOf,
      u = !!a && 0 > 1 / [1].lastIndexOf(1, -0);r(r.P + r.F * (u || !n(16)(a)), "Array", { lastIndexOf: function lastIndexOf(t) {
      if (u) return a.apply(this, arguments) || 0;var e = i(this),
          n = s(e.length),
          r = n - 1;for (1 < arguments.length && (r = Math.min(r, o(arguments[1]))), 0 > r && (r = n + r); 0 <= r; r--) {
        if (r in e && e[r] === t) return r || 0;
      }return -1;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.P, "Array", { copyWithin: n(107) }), n(36)("copyWithin");
}, function (t, e, n) {
  var r = n(0);r(r.P, "Array", { fill: n(80) }), n(36)("fill");
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(5),
      o = "find",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { find: function find(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(22)(6),
      o = "findIndex",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { findIndex: function findIndex(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (t, e, n) {
  n(41)("Array");
}, function (t, e, n) {
  var r = n(1),
      i = n(68),
      o = n(9).f,
      s = n(34).f,
      a = n(75),
      u = n(53),
      _c2 = r.RegExp,
      l = _c2,
      h = _c2.prototype,
      d = /a/g,
      f = /a/g,
      p = new _c2(d) !== d;if (n(8) && (!p || n(2)(function () {
    return f[n(5)("match")] = !1, _c2(d) != d || _c2(f) == f || "/a/i" != _c2(d, "i");
  }))) {
    _c2 = function c(t, e) {
      var n = this instanceof _c2,
          r = a(t),
          o = void 0 === e;return !n && r && t.constructor === _c2 && o ? t : i(p ? new l(r && !o ? t.source : t, e) : l((r = t instanceof _c2) ? t.source : t, r && o ? u.call(t) : e), n ? this : h, _c2);
    };for (var g = function g(t) {
      (t in _c2) || o(_c2, t, { configurable: !0, get: function get() {
          return l[t];
        }, set: function set(e) {
          l[t] = e;
        } });
    }, m = s(l), v = 0; m.length > v;) {
      g(m[v++]);
    }h.constructor = _c2, _c2.prototype = h, n(11)(r, "RegExp", _c2);
  }n(41)("RegExp");
}, function (t, e, n) {
  "use strict";
  n(110);var r = n(3),
      i = n(53),
      o = n(8),
      s = "toString",
      a = /./[s],
      u = function u(t) {
    n(11)(RegExp.prototype, s, t, !0);
  };n(2)(function () {
    return "/a/b" != a.call({ source: "a", flags: "b" });
  }) ? u(function () {
    var t = r(this);return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0);
  }) : a.name != s && u(function () {
    return a.call(this);
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      i = n(6),
      o = n(83),
      s = n(54);n(55)("match", 1, function (t, e, n, a) {
    return [function (n) {
      var r = t(this),
          i = null == n ? void 0 : n[e];return void 0 === i ? new RegExp(n)[e](r + "") : i.call(n, r);
    }, function (t) {
      var e = a(n, t, this);if (e.done) return e.value;var u = r(t),
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var h, d = [], f = 0; null !== (h = s(u, c));) {
        var p = h[0] + "";d[f] = p, "" == p && (u.lastIndex = o(c, i(u.lastIndex), l)), f++;
      }return 0 == f ? null : d;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      i = n(10),
      o = n(6),
      s = n(19),
      a = n(83),
      u = n(54),
      c = Math.max,
      l = Math.min,
      h = Math.floor,
      d = /\$([$&`']|\d\d?|<[^>]*>)/g,
      f = /\$([$&`']|\d\d?)/g,
      p = function p(t) {
    return void 0 === t ? t : t + "";
  };n(55)("replace", 2, function (t, e, n, g) {
    function m(t, e, r, o, s, a) {
      var u = r + t.length,
          c = o.length,
          l = f;return void 0 !== s && (s = i(s), l = d), n.call(a, l, function (n, i) {
        var a;switch (i.charAt(0)) {case "$":
            return "$";case "&":
            return t;case "`":
            return e.slice(0, r);case "'":
            return e.slice(u);case "<":
            a = s[i.slice(1, -1)];break;default:
            var l = +i;if (0 == l) return n;if (l > c) {
              var d = h(l / 10);return 0 === d ? n : d <= c ? void 0 === o[d - 1] ? i.charAt(1) : o[d - 1] + i.charAt(1) : n;
            }a = o[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (r, i) {
      var o = t(this),
          s = null == r ? void 0 : r[e];return void 0 === s ? n.call(o + "", r, i) : s.call(r, o, i);
    }, function (t, e) {
      var i = g(n, t, this, e);if (i.done) return i.value;var h = r(t),
          d = this + "",
          f = "function" == typeof e;f || (e += "");var v = h.global;if (v) {
        var y = h.unicode;h.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(h, d)) && (w.push(b), v);) {
        "" == b[0] + "" && (h.lastIndex = a(d, o(h.lastIndex), y));
      }for (var S = "", x = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", k = c(l(s(b.index), d.length), 0), C = [], O = 1; O < b.length; O++) {
          C.push(p(b[O]));
        }var T = b.groups;if (f) {
          var _ = [M].concat(C, k, d);void 0 !== T && _.push(T);var A = e.apply(void 0, _) + "";
        } else A = m(M, d, k, C, T, e);k >= x && (S += d.slice(x, k) + A, x = k + M.length);
      }return S + d.slice(x);
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      i = n(95),
      o = n(54);n(55)("search", 1, function (t, e, n, s) {
    return [function (n) {
      var r = t(this),
          i = null == n ? void 0 : n[e];return void 0 === i ? new RegExp(n)[e](r + "") : i.call(n, r);
    }, function (t) {
      var e = s(n, t, this);if (e.done) return e.value;var a = r(t),
          u = this + "",
          c = a.lastIndex;i(c, 0) || (a.lastIndex = 0);var l = o(a, u);return i(a.lastIndex, c) || (a.lastIndex = c), null === l ? -1 : l.index;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(75),
      i = n(3),
      o = n(47),
      s = n(83),
      a = n(6),
      u = n(54),
      c = n(82),
      l = n(2),
      h = Math.min,
      d = [].push,
      f = "split",
      p = "length",
      g = "lastIndex",
      m = 4294967295,
      v = !l(function () {
    RegExp(m, "y");
  });n(55)("split", 2, function (t, e, n, l) {
    var y;return y = "c" == "abbc"[f](/(b)*/)[1] || 4 != "test"[f](/(?:)/, -1)[p] || 2 != "ab"[f](/(?:ab)*/)[p] || 4 != "."[f](/(.?)(.?)/)[p] || 1 < "."[f](/()()/)[p] || ""[f](/.?/)[p] ? function (t, e) {
      var i = this + "";if (void 0 === t && 0 === e) return [];if (!r(t)) return n.call(i, t, e);for (var o, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), h = 0, f = void 0 === e ? m : e >>> 0, v = new RegExp(t.source, l + "g"); (o = c.call(v, i)) && !((s = v[g]) > h && (u.push(i.slice(h, o.index)), 1 < o[p] && o.index < i[p] && d.apply(u, o.slice(1)), a = o[0][p], h = s, u[p] >= f));) {
        v[g] === o.index && v[g]++;
      }return h === i[p] ? (a || !v.test("")) && u.push("") : u.push(i.slice(h)), u[p] > f ? u.slice(0, f) : u;
    } : "0"[f](void 0, 0)[p] ? function (t, e) {
      return void 0 === t && 0 === e ? [] : n.call(this, t, e);
    } : n, [function (n, r) {
      var i = t(this),
          o = null == n ? void 0 : n[e];return void 0 === o ? y.call(i + "", n, r) : o.call(n, i, r);
    }, function (t, e) {
      var r = l(y, t, this, e, y !== n);if (r.done) return r.value;var c = i(t),
          d = this + "",
          f = o(c, RegExp),
          p = c.unicode,
          g = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (v ? "y" : "g"),
          b = new f(v ? c : "^(?:" + c.source + ")", g),
          w = void 0 === e ? m : e >>> 0;if (0 == w) return [];if (0 === d.length) return null === u(b, d) ? [d] : [];for (var S = 0, x = 0, E = []; x < d.length;) {
        b.lastIndex = v ? x : 0;var M,
            k = u(b, v ? d : d.slice(x));if (null === k || (M = h(a(b.lastIndex + (v ? 0 : x)), d.length)) === S) x = s(d, x, p);else {
          if (E.push(d.slice(S, x)), E.length === w) return E;for (var C = 1; C <= k.length - 1; C++) {
            if (E.push(k[C]), E.length === w) return E;
          }x = S = M;
        }
      }return E.push(d.slice(S)), E;
    }];
  });
}, function (t, e, n) {
  var r = n(1),
      i = n(84).set,
      o = r.MutationObserver || r.WebKitMutationObserver,
      s = r.process,
      a = r.Promise,
      u = "process" == n(23)(s);t.exports = function () {
    var t,
        e,
        n,
        c = function c() {
      var r, i;for (u && (r = s.domain) && r.exit(); t;) {
        i = t.fn, t = t.next;try {
          i();
        } catch (i) {
          throw t ? n() : e = void 0, i;
        }
      }e = void 0, r && r.enter();
    };if (u) n = function n() {
      s.nextTick(c);
    };else if (!o || r.navigator && r.navigator.standalone) {
      if (a && a.resolve) {
        var l = a.resolve(void 0);n = function n() {
          l.then(c);
        };
      } else n = function n() {
        i.call(r, c);
      };
    } else {
      var h = !0,
          d = document.createTextNode("");new o(c).observe(d, { characterData: !0 }), n = function n() {
        d.data = h = !h;
      };
    }return function (r) {
      var i = { fn: r, next: void 0 };e && (e.next = i), t || (t = i, n()), e = i;
    };
  };
}, function (t) {
  t.exports = function (t) {
    try {
      return { e: !1, v: t() };
    } catch (t) {
      return { e: !0, v: t };
    }
  };
}, function (t, e, n) {
  "use strict";
  var r = n(114),
      i = n(37),
      o = "Map";t.exports = n(58)(o, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { get: function get(t) {
      var e = r.getEntry(i(this, o), t);return e && e.v;
    }, set: function set(t, e) {
      return r.def(i(this, o), 0 === t ? 0 : t, e);
    } }, r, !0);
}, function (t, e, n) {
  "use strict";
  var r = n(114),
      i = n(37);t.exports = n(58)("Set", function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return r.def(i(this, "Set"), t = 0 === t ? 0 : t, t);
    } }, r);
}, function (t, e, n) {
  "use strict";
  var r,
      i = n(1),
      o = n(22)(0),
      s = n(11),
      a = n(27),
      u = n(94),
      c = n(115),
      l = n(4),
      h = n(37),
      d = n(37),
      f = !i.ActiveXObject && "ActiveXObject" in i,
      p = "WeakMap",
      g = a.getWeak,
      m = Object.isExtensible,
      v = c.ufstore,
      y = function y(t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  },
      b = { get: function get(t) {
      if (l(t)) {
        var e = g(t);return !0 === e ? v(h(this, p)).get(t) : e ? e[this._i] : void 0;
      }
    }, set: function set(t, e) {
      return c.def(h(this, p), t, e);
    } },
      w = t.exports = n(58)(p, y, b, c, !0, !0);d && f && (u((r = c.getConstructor(y, p)).prototype, b), a.NEED = !0, o(["delete", "has", "get", "set"], function (t) {
    var e = w.prototype,
        n = e[t];s(e, t, function (e, i) {
      if (l(e) && !m(e)) {
        this._f || (this._f = new r());var o = this._f[t](e, i);return "set" == t ? this : o;
      }return n.call(this, e, i);
    });
  }));
}, function (t, e, n) {
  "use strict";
  var r = n(115),
      i = n(37),
      o = "WeakSet";n(58)(o, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return r.def(i(this, o), t, !0);
    } }, r, !1, !0);
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(59),
      o = n(85),
      s = n(3),
      a = n(32),
      u = n(6),
      c = n(4),
      l = n(1).ArrayBuffer,
      h = n(47),
      d = o.ArrayBuffer,
      f = o.DataView,
      p = i.ABV && l.isView,
      g = d.prototype.slice,
      m = i.VIEW,
      v = "ArrayBuffer";r(r.G + r.W + r.F * (l !== d), { ArrayBuffer: d }), r(r.S + r.F * !i.CONSTR, v, { isView: function isView(t) {
      return p && p(t) || c(t) && m in t;
    } }), r(r.P + r.U + r.F * n(2)(function () {
    return !new d(2).slice(1, void 0).byteLength;
  }), v, { slice: function slice(t, e) {
      if (void 0 !== g && void 0 === e) return g.call(s(this), t);for (var n = s(this).byteLength, r = a(t, n), i = a(void 0 === e ? n : e, n), o = new (h(this, d))(u(i - r)), c = new f(this), l = new f(o), p = 0; r < i;) {
        l.setUint8(p++, c.getUint8(r++));
      }return o;
    } }), n(41)(v);
}, function (t, e, n) {
  var r = n(0);r(r.G + r.W + r.F * !n(59).ABV, { DataView: n(85).DataView });
}, function (t, e, n) {
  n(25)("Int8", 1, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Uint8", 1, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Uint8", 1, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  }, !0);
}, function (t, e, n) {
  n(25)("Int16", 2, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Uint16", 2, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Int32", 4, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Uint32", 4, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Float32", 4, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  n(25)("Float64", 8, function (t) {
    return function (e, n, r) {
      return t(this, e, n, r);
    };
  });
}, function (t, e, n) {
  var r = n(0),
      i = n(18),
      o = n(3),
      s = (n(1).Reflect || {}).apply,
      a = Function.apply;r(r.S + r.F * !n(2)(function () {
    s(function () {});
  }), "Reflect", { apply: function apply(t, e, n) {
      var r = i(t),
          u = o(n);return s ? s(r, e, u) : a.call(r, e, u);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(33),
      o = n(18),
      s = n(3),
      a = n(4),
      u = n(2),
      c = n(96),
      l = (n(1).Reflect || {}).construct,
      h = u(function () {
    function t() {}return !(l(function () {}, [], t) instanceof t);
  }),
      d = !u(function () {
    l(function () {});
  });r(r.S + r.F * (h || d), "Reflect", { construct: function construct(t, e) {
      o(t), s(e);var n = 3 > arguments.length ? t : o(arguments[2]);if (d && !h) return l(t, e, n);if (t == n) {
        switch (e.length) {case 0:
            return new t();case 1:
            return new t(e[0]);case 2:
            return new t(e[0], e[1]);case 3:
            return new t(e[0], e[1], e[2]);case 4:
            return new t(e[0], e[1], e[2], e[3]);}var r = [null];return r.push.apply(r, e), new (c.apply(t, r))();
      }var u = n.prototype,
          f = i(a(u) ? u : Object.prototype),
          p = Function.apply.call(t, f, e);return a(p) ? p : f;
    } });
}, function (t, e, n) {
  var r = n(9),
      i = n(0),
      o = n(3),
      s = n(26);i(i.S + i.F * n(2)(function () {
    Reflect.defineProperty(r.f({}, 1, { value: 1 }), 1, { value: 2 });
  }), "Reflect", { defineProperty: function defineProperty(t, e, n) {
      o(t), e = s(e, !0), o(n);try {
        return r.f(t, e, n), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(20).f,
      o = n(3);r(r.S, "Reflect", { deleteProperty: function deleteProperty(t, e) {
      var n = i(o(t), e);return (!n || n.configurable) && delete t[e];
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(3),
      o = function o(t) {
    this._t = i(t), this._i = 0;var e,
        n = this._k = [];for (e in t) {
      n.push(e);
    }
  };n(103)(o, "Object", function () {
    var t,
        e = this,
        n = e._k;do {
      if (e._i >= n.length) return { value: void 0, done: !0 };
    } while (!((t = n[e._i++]) in e._t));return { value: t, done: !1 };
  }), r(r.S, "Reflect", { enumerate: function enumerate(t) {
      return new o(t);
    } });
}, function (t, e, n) {
  var r = n(20),
      i = n(35),
      o = n(13),
      s = n(0),
      a = n(4),
      u = n(3);s(s.S, "Reflect", { get: function t(e, n) {
      var s,
          c,
          l = 3 > arguments.length ? e : arguments[2];return u(e) === l ? e[n] : (s = r.f(e, n)) ? o(s, "value") ? s.value : void 0 === s.get ? void 0 : s.get.call(l) : a(c = i(e)) ? t(c, n, l) : void 0;
    } });
}, function (t, e, n) {
  var r = n(20),
      i = n(0),
      o = n(3);i(i.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, e) {
      return r.f(o(t), e);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(35),
      o = n(3);r(r.S, "Reflect", { getPrototypeOf: function getPrototypeOf(t) {
      return i(o(t));
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Reflect", { has: function has(t, e) {
      return e in t;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(3),
      o = Object.isExtensible;r(r.S, "Reflect", { isExtensible: function isExtensible(t) {
      return i(t), !o || o(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Reflect", { ownKeys: n(117) });
}, function (t, e, n) {
  var r = n(0),
      i = n(3),
      o = Object.preventExtensions;r(r.S, "Reflect", { preventExtensions: function preventExtensions(t) {
      i(t);try {
        return o && o(t), !0;
      } catch (t) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var r = n(9),
      i = n(20),
      o = n(35),
      s = n(13),
      a = n(0),
      u = n(28),
      c = n(3),
      l = n(4);a(a.S, "Reflect", { set: function t(e, n, a) {
      var h,
          d,
          f = 4 > arguments.length ? e : arguments[3],
          p = i.f(c(e), n);if (!p) {
        if (l(d = o(e))) return t(d, n, a, f);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(f)) return !1;if (h = i.f(f, n)) {
          if (h.get || h.set || !1 === h.writable) return !1;h.value = a, r.f(f, n, h);
        } else r.f(f, n, u(0, a));return !0;
      }return void 0 !== p.set && (p.set.call(f, a), !0);
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(66);i && r(r.S, "Reflect", { setPrototypeOf: function setPrototypeOf(t, e) {
      i.check(t, e);try {
        return i.set(t, e), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  n(280), t.exports = n(7).Array.includes;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(49)(!0);r(r.P, "Array", { includes: function includes(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (t, e, n) {
  n(282), t.exports = n(7).Array.flatMap;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(283),
      o = n(10),
      s = n(6),
      a = n(18),
      u = n(105);r(r.P, "Array", { flatMap: function flatMap(t) {
      var e,
          n,
          r = o(this);return a(t), e = s(r.length), n = u(r, 0), i(n, r, r, e, 0, 1, t, arguments[1]), n;
    } }), n(36)("flatMap");
}, function (t, e, n) {
  "use strict";
  var r = n(51),
      i = n(4),
      o = n(6),
      s = n(17),
      a = n(5)("isConcatSpreadable");t.exports = function t(e, n, u, c, l, h, d, f) {
    for (var p, g, m = l, v = 0, y = !!d && s(d, f, 3); v < c;) {
      if (v in u) {
        if (p = y ? y(u[v], v, n) : u[v], g = !1, i(p) && (g = void 0 === (g = p[a]) ? r(p) : !!g), g && 0 < h) m = t(e, n, p, o(p.length), m, h - 1) - 1;else {
          if (9007199254740991 <= m) throw TypeError();e[m] = p;
        }m++;
      }v++;
    }return m;
  };
}, function (t, e, n) {
  n(285), t.exports = n(7).String.padStart;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(118),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padStart: function padStart(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (t, e, n) {
  n(287), t.exports = n(7).String.padEnd;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(118),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padEnd: function padEnd(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0, !1);
    } });
}, function (t, e, n) {
  n(289), t.exports = n(7).String.trimLeft;
}, function (t, e, n) {
  "use strict";
  n(39)("trimLeft", function (t) {
    return function () {
      return t(this, 1);
    };
  }, "trimStart");
}, function (t, e, n) {
  n(291), t.exports = n(7).String.trimRight;
}, function (t, e, n) {
  "use strict";
  n(39)("trimRight", function (t) {
    return function () {
      return t(this, 2);
    };
  }, "trimEnd");
}, function (t, e, n) {
  n(293), t.exports = n(62).f("asyncIterator");
}, function (t, e, n) {
  n(90)("asyncIterator");
}, function (t, e, n) {
  n(295), t.exports = n(7).Object.getOwnPropertyDescriptors;
}, function (t, e, n) {
  var r = n(0),
      i = n(117),
      o = n(15),
      s = n(20),
      a = n(78);r(r.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var e, n, r = o(t), u = s.f, c = i(r), l = {}, h = 0; c.length > h;) {
        void 0 !== (n = u(r, e = c[h++])) && a(l, e, n);
      }return l;
    } });
}, function (t, e, n) {
  n(297), t.exports = n(7).Object.values;
}, function (t, e, n) {
  var r = n(0),
      i = n(119)(!1);r(r.S, "Object", { values: function values(t) {
      return i(t);
    } });
}, function (t, e, n) {
  n(299), t.exports = n(7).Object.entries;
}, function (t, e, n) {
  var r = n(0),
      i = n(119)(!0);r(r.S, "Object", { entries: function entries(t) {
      return i(t);
    } });
}, function (t, e, n) {
  "use strict";
  n(111), n(301), t.exports = n(7).Promise.finally;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(7),
      o = n(1),
      s = n(47),
      a = n(113);r(r.P + r.R, "Promise", { finally: function _finally(t) {
      var e = s(this, i.Promise || o.Promise),
          n = "function" == typeof t;return this.then(n ? function (n) {
        return a(e, t()).then(function () {
          return n;
        });
      } : t, n ? function (n) {
        return a(e, t()).then(function () {
          throw n;
        });
      } : t);
    } });
}, function (t, e, n) {
  n(303), n(304), n(305), t.exports = n(7);
}, function (t, e, n) {
  var r = n(1),
      i = n(0),
      o = n(57),
      s = [].slice,
      a = /MSIE .\./.test(o),
      u = function u(t) {
    return function (e, n) {
      var r = 2 < arguments.length,
          i = !!r && s.call(arguments, 2);return t(r ? function () {
        ("function" == typeof e ? e : Function(e)).apply(this, i);
      } : e, n);
    };
  };i(i.G + i.B + i.F * a, { setTimeout: u(r.setTimeout), setInterval: u(r.setInterval) });
}, function (t, e, n) {
  var r = n(0),
      i = n(84);r(r.G + r.B, { setImmediate: i.set, clearImmediate: i.clear });
}, function (t, e, n) {
  for (var r = n(81), i = n(31), o = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), h = c("toStringTag"), d = u.Array, f = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = i(f), g = 0; g < p.length; g++) {
    var m,
        v = p[g],
        y = f[v],
        b = s[v],
        w = b && b.prototype;if (w && (w[l] || a(w, l, d), w[h] || a(w, h, v), u[v] = d, y)) for (m in r) {
      w[m] || o(w, m, r[m], !0);
    }
  }
}, function (t) {
  var e = function (t) {
    "use strict";
    function e(t, e, n) {
      return Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }), t[e];
    }function n(t, e, n, r) {
      var o = e && e.prototype instanceof i ? e : i,
          s = Object.create(o.prototype),
          a = new f(r || []);return s._invoke = c(t, n, a), s;
    }function r(t, e, n) {
      try {
        return { type: "normal", arg: t.call(e, n) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }function i() {}function o() {}function s() {}function a(t) {
      ["next", "throw", "return"].forEach(function (n) {
        e(t, n, function (t) {
          return this._invoke(n, t);
        });
      });
    }function u(t, e) {
      function n(i, o, s, a) {
        var u = r(t[i], t, o);if ("throw" !== u.type) {
          var c = u.arg,
              l = c.value;return l && "object" == (typeof l === "undefined" ? "undefined" : _typeof(l)) && v.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
            n("next", t, s, a);
          }, function (t) {
            n("throw", t, s, a);
          }) : e.resolve(l).then(function (t) {
            c.value = t, s(c);
          }, function (t) {
            return n("throw", t, s, a);
          });
        }a(u.arg);
      }var i;this._invoke = function (t, r) {
        function o() {
          return new e(function (e, i) {
            n(t, r, e, i);
          });
        }return i = i ? i.then(o, o) : o();
      };
    }function c(t, e, n) {
      var i = x;return function (o, s) {
        if (i === M) throw new Error("Generator is already running");if (i === k) {
          if ("throw" === o) throw s;return { value: void 0, done: !0 };
        }for (n.method = o, n.arg = s;;) {
          var a = n.delegate;if (a) {
            var u = l(a, n);if (u) {
              if (u === C) continue;return u;
            }
          }if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (i === x) throw i = k, n.arg;n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);i = M;var c = r(t, e, n);if ("normal" === c.type) {
            if (i = n.done ? k : E, c.arg === C) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (i = k, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(t, e) {
      var n = t.iterator[e.method];if (void 0 === n) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, l(t, e), "throw" === e.method)) return C;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return C;
      }var i = r(n, t.iterator, e.arg);if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, C;var o = i.arg;return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, C) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, C);
    }function h(t) {
      var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }function d(t) {
      var e = t.completion || {};e.type = "normal", delete e.arg, t.completion = e;
    }function f(t) {
      this.tryEntries = [{ tryLoc: "root" }], t.forEach(h, this), this.reset(!0);
    }function p(t) {
      if (t) {
        var e = t[b];if (e) return e.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
          var n = -1,
              r = function e() {
            for (; ++n < t.length;) {
              if (v.call(t, n)) return e.value = t[n], e.done = !1, e;
            }return e.value = void 0, e.done = !0, e;
          };return r.next = r;
        }
      }return { next: g };
    }function g() {
      return { value: void 0, done: !0 };
    }var m = Object.prototype,
        v = m.hasOwnProperty,
        y = "function" == typeof Symbol ? Symbol : {},
        b = y.iterator || "@@iterator",
        w = y.asyncIterator || "@@asyncIterator",
        S = y.toStringTag || "@@toStringTag";try {
      e({}, "");
    } catch (t) {
      e = function e(t, _e2, n) {
        return t[_e2] = n;
      };
    }t.wrap = n;var x = "suspendedStart",
        E = "suspendedYield",
        M = "executing",
        k = "completed",
        C = {},
        O = {};O[b] = function () {
      return this;
    };var T = Object.getPrototypeOf,
        _ = T && T(T(p([])));_ && _ !== m && v.call(_, b) && (O = _);var A = s.prototype = i.prototype = Object.create(O);return o.prototype = A.constructor = s, s.constructor = o, o.displayName = e(s, S, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (_defaults(t, s), e(t, S, "GeneratorFunction")), t.prototype = Object.create(A), t;
    }, t.awrap = function (t) {
      return { __await: t };
    }, a(u.prototype), u.prototype[w] = function () {
      return this;
    }, t.AsyncIterator = u, t.async = function (e, r, i, o, s) {
      void 0 === s && (s = Promise);var a = new u(n(e, r, i, o), s);return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, a(A), e(A, S, "Generator"), A[b] = function () {
      return this;
    }, A.toString = function () {
      return "[object Generator]";
    }, t.keys = function (t) {
      var e = [];for (var n in t) {
        e.push(n);
      }return e.reverse(), function n() {
        for (; e.length;) {
          var r = e.pop();if (r in t) return n.value = r, n.done = !1, n;
        }return n.done = !0, n;
      };
    }, t.values = p, f.prototype = { constructor: f, reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(d), !t) for (var e in this) {
          "t" === e.charAt(0) && v.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
        }
      }, stop: function stop() {
        this.done = !0;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
      }, dispatchException: function dispatchException(t) {
        function e(e, r) {
          return o.type = "throw", o.arg = t, n.next = e, r && (n.method = "next", n.arg = void 0), !!r;
        }if (this.done) throw t;for (var n = this, r = this.tryEntries.length - 1; 0 <= r; --r) {
          var i = this.tryEntries[r],
              o = i.completion;if ("root" === i.tryLoc) return e("end");if (i.tryLoc <= this.prev) {
            var s = v.call(i, "catchLoc"),
                a = v.call(i, "finallyLoc");if (s && a) {
              if (this.prev < i.catchLoc) return e(i.catchLoc, !0);if (this.prev < i.finallyLoc) return e(i.finallyLoc);
            } else if (s) {
              if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
            } else {
              if (!a) throw new Error("try statement without catch or finally");if (this.prev < i.finallyLoc) return e(i.finallyLoc);
            }
          }
        }
      }, abrupt: function abrupt(t, e) {
        for (var n, r = this.tryEntries.length - 1; 0 <= r; --r) {
          if ((n = this.tryEntries[r]).tryLoc <= this.prev && v.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var i = n;break;
          }
        }i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, C) : this.complete(o);
      }, complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), C;
      }, finish: function finish(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).finallyLoc === t) return this.complete(e.completion, e.afterLoc), d(e), C;
        }
      }, catch: function _catch(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).tryLoc === t) {
            var r = e.completion;if ("throw" === r.type) {
              var i = r.arg;d(e);
            }return i;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function delegateYield(t, e, n) {
        return this.delegate = { iterator: p(t), resultName: e, nextLoc: n }, "next" === this.method && (this.arg = void 0), C;
      } }, t;
  }(t.exports);try {
    regeneratorRuntime = e;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(e);
  }
}, function (t, e, n) {
  n(308), t.exports = n(120).global;
}, function (t, e, n) {
  var r = n(309);r(r.G, { global: n(86) });
}, function (t, e, n) {
  var r = n(86),
      i = n(120),
      o = n(310),
      s = n(312),
      a = n(319),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        h,
        d,
        f = t & c.F,
        p = t & c.G,
        g = t & c.S,
        m = t & c.P,
        v = t & c.B,
        y = t & c.W,
        b = p ? i : i[e] || (i[e] = {}),
        w = b[u],
        S = p ? r : g ? r[e] : (r[e] || {})[u];for (l in p && (n = e), n) {
      (h = !f && S && void 0 !== S[l]) && a(b, l) || (d = h ? S[l] : n[l], b[l] = p && "function" != typeof S[l] ? n[l] : v && h ? o(d, r) : y && S[l] == d ? function (t) {
        var e = function e(_e3, n, r) {
          if (this instanceof t) {
            switch (arguments.length) {case 0:
                return new t();case 1:
                return new t(_e3);case 2:
                return new t(_e3, n);}return new t(_e3, n, r);
          }return t.apply(this, arguments);
        };return e[u] = t[u], e;
      }(d) : m && "function" == typeof d ? o(Function.call, d) : d, m && ((b.virtual || (b.virtual = {}))[l] = d, t & c.R && w && !w[l] && s(w, l, d)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t, e, n) {
  var r = n(311);t.exports = function (t, e, n) {
    return r(t), void 0 === e ? t : 1 === n ? function (n) {
      return t.call(e, n);
    } : 2 === n ? function (n, r) {
      return t.call(e, n, r);
    } : 3 === n ? function (n, r, i) {
      return t.call(e, n, r, i);
    } : function () {
      return t.apply(e, arguments);
    };
  };
}, function (t) {
  t.exports = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
  };
}, function (t, e, n) {
  var r = n(313),
      i = n(318);t.exports = n(88) ? function (t, e, n) {
    return r.f(t, e, i(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(314),
      i = n(315),
      o = n(317),
      s = Object.defineProperty;e.f = n(88) ? Object.defineProperty : function (t, e, n) {
    if (r(t), e = o(e, !0), r(n), i) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var r = n(87);t.exports = function (t) {
    if (!r(t)) throw TypeError(t + " is not an object!");return t;
  };
}, function (t, e, n) {
  t.exports = !n(88) && !n(121)(function () {
    return 7 != Object.defineProperty(n(316)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var r = n(87),
      i = n(86).document,
      o = r(i) && r(i.createElement);t.exports = function (t) {
    return o ? i.createElement(t) : {};
  };
}, function (t, e, n) {
  var r = n(87);t.exports = function (t, e) {
    if (!r(t)) return t;var n, i;if (e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;if ("function" == typeof (n = t.valueOf) && !r(i = n.call(t))) return i;if (!e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;throw TypeError("Can't convert object to primitive value");
  };
}, function (t) {
  t.exports = function (t, e) {
    return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
  };
}, function (t) {
  var e = {}.hasOwnProperty;t.exports = function (t, n) {
    return e.call(t, n);
  };
}, function (t, e, n) {
  "use strict";
  t.exports = { prefixProperties: n(122), cssUnitless: n(123), object: n(124), string: n(328) };
}, function (t, e, n) {
  t.exports = n(322)();
}, function (t, e, n) {
  "use strict";
  var r = n(127),
      i = n(128),
      o = n(325),
      s = n(126),
      a = n(125),
      u = n(122),
      c = "undefined" == typeof document ? {} : document.documentElement.style;t.exports = function (t) {
    return function (e, n) {
      n = n || {};var l = o(r(e)),
          h = i(e),
          d = t ? l : h,
          f = a.style ? t ? a.style : a.css : "";if (l in c) return n.asString ? d : [d];var p = d,
          g = u[h],
          m = [];if (t && (p = s(d)), "function" == typeof g) {
        var v = g(d, f) || [];v && !Array.isArray(v) && (v = [v]), v.length && (v = v.map(function (e) {
          return t ? o(r(e)) : i(e);
        })), m = m.concat(v);
      }return f && m.push(f + p), m.push(d), n.asString || 1 == m.length ? m[0] : m;
    };
  };
}, function (t) {
  t.exports = /[-\s]+(.)?/g;
}, function (t) {
  "use strict";
  var e = /::/g,
      n = /([A-Z]+)([A-Z][a-z])/g,
      r = /([a-z\d])([A-Z])/g,
      i = /_/g;t.exports = function (t, o) {
    return t ? t.replace(e, "/").replace(n, "$1_$2").replace(r, "$1_$2").replace(i, o || "-") : "";
  };
}, function (t) {
  "use strict";
  t.exports = function (t) {
    return t.length ? t.charAt(0).toLowerCase() + t.substring(1) : t;
  };
}, function (t) {
  "use strict";
  var e = Object.prototype.toString;t.exports = function (t) {
    return !!t && "[object Object]" === e.call(t);
  };
}, function (t) {
  "use strict";
  var e = Object.prototype.toString;t.exports = function (t) {
    return "[object Function]" === e.apply(t);
  };
}, function (t, e, n) {
  "use strict";
  var r = n(124),
      i = n(129);t.exports = function (t, e) {
    t = r(t, e);var n,
        o = [];for (n in t) {
      i(t, n) && o.push(n + ": " + t[n]);
    }return o.join("; ");
  };
}, function (t, e, n) {
  var r;!function () {
    "use strict";
    function i(t) {
      return null != t;
    }function o(t) {
      return "number" == typeof t && t > V && t < z;
    }function s(t) {
      return "number" == typeof t && 0 == t % 1;
    }function a(t, e) {
      return o(t) && t > e;
    }function u(t, e) {
      return o(t) && t < e;
    }function c(t, e) {
      return o(t) && t >= e;
    }function l(t, e) {
      return o(t) && t <= e;
    }function h(t) {
      return "string" == typeof t;
    }function d(t) {
      return h(t) && "" !== t;
    }function _f(t) {
      return "[object Object]" === Object.prototype.toString.call(t);
    }function p(t, e) {
      try {
        return t instanceof e;
      } catch (t) {
        return !1;
      }
    }function g(t) {
      return H(t);
    }function m(t) {
      return i(t) && c(t.length, 0);
    }function v(t) {
      return "function" == typeof t;
    }function y(t, e) {
      var n;for (n = 0; n < t.length; n += 1) {
        if (t[n] === e) return e;
      }return !e;
    }function b(t, e) {
      var n, r;for (n in t) {
        if (t.hasOwnProperty(n)) {
          if (_f(r = t[n]) && b(r, e) === e) return e;if (r === e) return e;
        }
      }return !e;
    }function w(t, e) {
      return Object.keys(e).forEach(function (n) {
        t[n] = e[n];
      }), t;
    }function S(t, e) {
      return function () {
        return x(t, arguments, e);
      };
    }function x(t, e, n) {
      var r = t.l || t.length,
          i = e[r],
          o = e[r + 1];return E(t.apply(null, e), d(i) ? i : n, v(o) ? o : TypeError), e[0];
    }function E(t, e, n) {
      if (t) return t;throw new (n || Error)(e || "Assertion failed");
    }function M(t) {
      var e = function e() {
        return k(t.apply(null, arguments));
      };return e.l = t.length, e;
    }function k(t) {
      return !t;
    }function C(t, e, n) {
      var r = function r() {
        var r, o;if (r = arguments[0], "maybe" === t && B.assigned(r)) return !0;if (!e(r)) return !1;r = O(e, r), o = U.call(arguments, 1);try {
          r.forEach(function (e) {
            if (("maybe" !== t || i(e)) && !n.apply(null, [e].concat(o))) throw 0;
          });
        } catch (t) {
          return !1;
        }return !0;
      };return r.l = n.length, r;
    }function O(t, e) {
      return t === m ? U.call(e) : t === _f ? Object.keys(e).map(function (t) {
        return e[t];
      }) : e;
    }function T(t, e) {
      return _([t, R, e]);
    }function _(t) {
      var e, n, r, i;return e = t.shift(), n = t.pop(), r = t.pop(), i = n || {}, Object.keys(r).forEach(function (n) {
        Object.defineProperty(i, n, { configurable: !1, enumerable: !0, writable: !1, value: e.apply(null, t.concat(r[n], N[n])) });
      }), i;
    }function A(t, e) {
      return _([t, e, null]);
    }function P(t, e) {
      j.forEach(function (n) {
        t[n].of = A(e, R[n].of);
      });
    }var I, N, R, F, L, B, D, j, U, V, z, H, G;I = { v: "value", n: "number", s: "string", b: "boolean", o: "object", t: "type", a: "array", al: "array-like", i: "iterable", d: "date", f: "function", l: "length" }, N = {}, R = {}, [{ n: "equal", f: function f(t, e) {
        return t === e;
      }, s: "v" }, { n: "undefined", f: function f(t) {
        return void 0 === t;
      }, s: "v" }, { n: "null", f: function f(t) {
        return null === t;
      }, s: "v" }, { n: "assigned", f: i, s: "v" }, { n: "primitive", f: function f(t) {
        var e;return !(null != t && !1 !== t && !0 !== t) || "string" === (e = typeof t === "undefined" ? "undefined" : _typeof(t)) || "number" === e || G && "symbol" === e;
      }, s: "v" }, { n: "includes", f: function f(t, e) {
        var n, r, o, s, a;if (!i(t)) return !1;if (G && t[Symbol.iterator] && v(t.values)) {
          n = t.values();do {
            if ((r = n.next()).value === e) return !0;
          } while (!r.done);return !1;
        }for (s = (o = Object.keys(t)).length, a = 0; a < s; ++a) {
          if (t[o[a]] === e) return !0;
        }return !1;
      }, s: "v" }, { n: "zero", f: function f(t) {
        return 0 === t;
      } }, { n: "infinity", f: function f(t) {
        return t === V || t === z;
      } }, { n: "number", f: o }, { n: "integer", f: s }, { n: "even", f: function f(t) {
        return "number" == typeof t && 0 == t % 2;
      } }, { n: "odd", f: function f(t) {
        return s(t) && 0 != t % 2;
      } }, { n: "greater", f: a }, { n: "less", f: u }, { n: "between", f: function f(t, e, n) {
        return e < n ? a(t, e) && t < n : u(t, e) && t > n;
      } }, { n: "greaterOrEqual", f: c }, { n: "lessOrEqual", f: l }, { n: "inRange", f: function f(t, e, n) {
        return e < n ? c(t, e) && t <= n : l(t, e) && t >= n;
      } }, { n: "positive", f: function f(t) {
        return a(t, 0);
      } }, { n: "negative", f: function f(t) {
        return u(t, 0);
      } }, { n: "string", f: h, s: "s" }, { n: "emptyString", f: function f(t) {
        return "" === t;
      }, s: "s" }, { n: "nonEmptyString", f: d, s: "s" }, { n: "contains", f: function f(t, e) {
        return h(t) && -1 !== t.indexOf(e);
      }, s: "s" }, { n: "match", f: function f(t, e) {
        return h(t) && !!t.match(e);
      }, s: "s" }, { n: "boolean", f: function f(t) {
        return !1 === t || !0 === t;
      }, s: "b" }, { n: "object", f: _f, s: "o" }, { n: "emptyObject", f: function f(t) {
        return _f(t) && 0 === Object.keys(t).length;
      }, s: "o" }, { n: "nonEmptyObject", f: function f(t) {
        return _f(t) && 0 < Object.keys(t).length;
      }, s: "o" }, { n: "instanceStrict", f: p, s: "t" }, { n: "instance", f: function f(t, e) {
        try {
          return p(t, e) || t.constructor.name === e.name || Object.prototype.toString.call(t) === "[object " + e.name + "]";
        } catch (t) {
          return !1;
        }
      }, s: "t" }, { n: "like", f: function t(e, n) {
        for (var r in n) {
          if (n.hasOwnProperty(r)) {
            if (!1 === e.hasOwnProperty(r) || _typeof(e[r]) != _typeof(n[r])) return !1;if (_f(e[r]) && !1 === t(e[r], n[r])) return !1;
          }
        }return !0;
      }, s: "t" }, { n: "array", f: g, s: "a" }, { n: "emptyArray", f: function f(t) {
        return g(t) && 0 === t.length;
      }, s: "a" }, { n: "nonEmptyArray", f: function f(t) {
        return g(t) && a(t.length, 0);
      }, s: "a" }, { n: "arrayLike", f: m, s: "al" }, { n: "iterable", f: function f(t) {
        return G ? i(t) && v(t[Symbol.iterator]) : m(t);
      }, s: "i" }, { n: "date", f: function f(t) {
        return p(t, Date) && s(t.getTime());
      }, s: "d" }, { n: "function", f: v, s: "f" }, { n: "hasLength", f: function f(t, e) {
        return i(t) && t.length === e;
      }, s: "l" }].map(function (t) {
      var e = t.n;N[e] = "Invalid " + I[t.s || "n"], R[e] = t.f;
    }), F = { apply: function apply(t, e) {
        return L.array(t), v(e) ? t.map(function (t) {
          return e(t);
        }) : (L.array(e), L.hasLength(t, e.length), t.map(function (t, n) {
          return e[n](t);
        }));
      }, map: function map(t, e) {
        return L.object(t), v(e) ? function (t, e) {
          var n = {};return Object.keys(t).forEach(function (r) {
            n[r] = e(t[r]);
          }), n;
        }(t, e) : (L.object(e), function t(e, n) {
          var r = {};return Object.keys(n).forEach(function (i) {
            var o = n[i];v(o) ? B.assigned(e) ? r[i] = !!o.m : r[i] = o(e[i]) : _f(o) && (r[i] = t(e[i], o));
          }), r;
        }(t, e));
      }, all: function all(t) {
        return g(t) ? y(t, !1) : (L.object(t), b(t, !1));
      }, any: function any(t) {
        return g(t) ? y(t, !0) : (L.object(t), b(t, !0));
      } }, j = ["array", "arrayLike", "iterable", "object"], U = Array.prototype.slice, V = Number.NEGATIVE_INFINITY, z = Number.POSITIVE_INFINITY, H = Array.isArray, G = "function" == typeof Symbol, F = w(F, R), L = T(S, E), B = T(M, k), D = T(function (t) {
      var e = function e() {
        return !!B.assigned(arguments[0]) || t.apply(null, arguments);
      };return e.l = t.length, e.m = !0, e;
    }, function (t) {
      return !(!1 !== i(t)) || t;
    }), L.not = A(S, B), L.maybe = A(S, D), j.forEach(function (t) {
      R[t].of = _([C.bind(null, null), R[t], R, null]);
    }), P(L, S), P(B, M), j.forEach(function (t) {
      D[t].of = _([C.bind(null, "maybe"), R[t], R, null]), L.maybe[t].of = A(S, D[t].of), L.not[t].of = A(S, B[t].of);
    }), function (i) {
      void 0 === (r = function () {
        return i;
      }.call(e, n, e, t)) || (t.exports = r);
    }(w(F, { assert: L, not: B, maybe: D }));
  }();
}, function (t) {
  t.exports = { defaultContainerStyles: { backgroundColor: "rgba(0,0,0,0.8)", minWidth: 100, minHeight: 45, position: "fixed", top: 10, right: 10, padding: 15, fontSize: 16, color: "white", borderRadius: 3, boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.2)", fontFamily: "sans-serif" }, defaultPanelStyles: { borderTop: "1px solid #4a4444", marginTop: 5, paddingTop: 5 }, defaultPanelTitleStyles: { color: "#b1b0b0" }, defaultPanelContentStyles: { fontSize: 12 } };
}, function (t) {
  var e = function () {
    return this;
  }();try {
    e = e || new Function("return this")();
  } catch (t) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (e = window);
  }t.exports = e;
}, function (t) {
  (function (e) {
    t.exports = e;
  }).call(this, {});
}, function (t) {
  var e, n;window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (e = "moz", n = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (e = "webkit", n = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));var r = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
      i = window.mozRTCIceCandidate || window.RTCIceCandidate,
      o = window.mozRTCSessionDescription || window.RTCSessionDescription,
      s = window.webkitMediaStream || window.MediaStream,
      a = "https:" === window.location.protocol && ("webkit" === e && 26 <= n || "moz" === e && 33 <= n),
      u = window.AudioContext || window.webkitAudioContext,
      c = document.createElement("video"),
      l = c && c.canPlayType && "probably" === c.canPlayType('video/webm; codecs="vp8", vorbis'),
      h = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;t.exports = { prefix: e, browserVersion: n, support: !!r && l && !!h, supportRTCPeerConnection: !!r, supportVp8: l, supportGetUserMedia: !!h, supportDataChannel: !!(r && r.prototype && r.prototype.createDataChannel), supportWebAudio: !(!u || !u.prototype.createMediaStreamSource), supportMediaStream: !(!s || !s.prototype.removeTrack), supportScreenSharing: !!a, dataChannel: !!(r && r.prototype && r.prototype.createDataChannel), webAudio: !(!u || !u.prototype.createMediaStreamSource), mediaStream: !(!s || !s.prototype.removeTrack), screenSharing: !!a, AudioContext: u, PeerConnection: r, SessionDescription: o, IceCandidate: i, MediaStream: s, getUserMedia: h };
}, function (t, e, n) {
  "use strict";
  function r(t, e, n) {
    if (t in it) for (var _n, _r = 0; _r < it[t].length; _r++) {
      _n = it[t][_r], _n.element.setAttribute(_n.att, e);
    } else {
      c("Building property cache for " + t);var _i = [];(function e(r) {
        if (r.children.length) for (var _o2 = 0; _o2 < r.children.length; _o2++) {
          e(r.children[_o2]);var _s = r.children[_o2].attributes;for (var _e4, _a = 0; _a < _s.length; _a++) {
            _e4 = _s[_a], -1 !== _e4.value.indexOf(t) && (r.children[_o2].removeAttribute(_e4.name), _i.push({ element: r.children[_o2], att: n }));
          }
        }
      })(document), it[t] = _i, r(t, e);
    }
  }function i(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    function i(t) {
      return (t + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }if (t in rt && !r) for (var _r2 = 0; _r2 < rt[t].length; _r2++) {
      if (n && "RAW" === rt[t][_r2].parentElement.tagName) {
        var _n2 = rt[t][_r2].parentElement;for (; _n2.hasChildNodes();) {
          _n2.removeChild(_n2.childNodes[0]);
        }var _i2 = o(e);for (var _e5 = 0; _e5 < _i2.length; _e5++) {
          _n2.appendChild(_i2[_e5]), rt[t][_r2] = _n2.childNodes[0];
        }
      } else rt[t][_r2].nodeValue = e;
    } else c("Building element cache for " + t), function () {
      var t = [];return function e(n) {
        if (n.childNodes.length) for (var r = 0; r < n.childNodes.length; r++) {
          e(n.childNodes[r]);
        } else n.nodeType === Node.TEXT_NODE && t.push(n);
      }(document), t;
    }().forEach(function (r) {
      if (-1 !== r.nodeValue.indexOf(t)) {
        var _s2 = rt[t];if (null == _s2 && (_s2 = []), n && "RAW" === r.parentElement.tagName) {
          var _n3 = r.parentElement;for (; _n3.hasChildNodes();) {
            _n3.removeChild(_n3.childNodes[0]);
          }var _s3 = o(r.nodeValue.replace(new RegExp(i(t), "g"), e));for (var _t2 = 0; _t2 < _s3.length; _t2++) {
            _n3.appendChild(_s3[_t2]), r = _n3.childNodes[0];
          }
        } else r.nodeValue = r.nodeValue.replace(new RegExp(i(t), "g"), e);_s2.push(r), rt[t] = _s2;
      }
    });
  }function o(t) {
    var e = document.createElement("template");return e.innerHTML = t, e.content.childNodes;
  }function s(t) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(t);
    });
  }function a() {
    window.debugUi = new nt.a(document.body, { zIndex: 999999999, backgroundColor: "black" }), s(function () {
      document.getElementById("j3-info-popup").style.zIndex = 99999999, document.getElementById("j3-info-popup").style.backgroundColor = "black";
    }), window.debugUi.addPanel(ot.BUILD, function () {
      return me.build + " by " + me.compiler + " " + me.envDescription;
    });for (var _t3 = 0; _t3 < ut.length; _t3++) {
      ut[_t3]();
    }if (!st) {
      st = !0;for (var _t4 = 0; _t4 < at.length; _t4++) {
        at[_t4]();
      }
    }c("Enabling debug mode");
  }function u(t) {
    return st ? (!me.isProd && t(), void ut.push(t)) : void at.push(t);
  }function c(t) {
    console.log("[OpenAudioMc] " + t), ct.push(t), 7 < ct.length && ct.shift();
  }function l(t) {
    var e = document.querySelectorAll("[data-type=card]");var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _t5 = _step.value;
        _t5.style.display = "none";
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    document.getElementById(t).style.display = "";
  }function h(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function d(t) {
    return "string" != typeof t && (t += ""), t;
  }function f(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return vt.iterable && (e[Symbol.iterator] = function () {
      return e;
    }), e;
  }function p(t) {
    this.map = {}, t instanceof p ? t.forEach(function (t, e) {
      this.append(e, t);
    }, this) : Array.isArray(t) ? t.forEach(function (t) {
      this.append(t[0], t[1]);
    }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
      this.append(e, t[e]);
    }, this);
  }function g(t) {
    return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0);
  }function m(t) {
    return new Promise(function (e, n) {
      t.onload = function () {
        e(t.result);
      }, t.onerror = function () {
        n(t.error);
      };
    });
  }function v(t) {
    var e = new FileReader(),
        n = m(e);return e.readAsArrayBuffer(t), n;
  }function y(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function b() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : vt.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : vt.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : vt.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : vt.arrayBuffer && vt.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = y(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : vt.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || bt(t)) ? this._bodyArrayBuffer = y(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : vt.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, vt.blob && (this.blob = function () {
      var t = g(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? g(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(v);
    }), this.text = function () {
      var t = g(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            n = m(e);return e.readAsText(t), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), n = Array(e.length), r = 0; r < e.length; r++) {
          n[r] = $(e[r]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, vt.formData && (this.formData = function () {
      return this.text().then(S);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function w(t, e) {
    var n = (e = e || {}).body;if (t instanceof w) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new p(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new p(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < wt.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function S(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var n = t.split("="),
            r = n.shift().replace(/\+/g, " "),
            i = n.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(r), decodeURIComponent(i));
      }
    }), e;
  }function x(t) {
    var e = new p();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var n = t.split(":"),
          r = n.shift().trim();if (r) {
        var i = n.join(":").trim();e.append(r, i);
      }
    }), e;
  }function E(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new p(e.headers), this.url = e.url || "", this._initBody(t);
  }function M(t, e) {
    return new Promise(function (n, r) {
      function i() {
        s.abort();
      }var o = new w(t, e);if (o.signal && o.signal.aborted) return r(new xt("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var t = { status: s.status, statusText: s.statusText, headers: x(s.getAllResponseHeaders() || "") };t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");var e = "response" in s ? s.response : s.responseText;n(new E(e, t));
      }, s.onerror = function () {
        r(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        r(new TypeError("Network request failed"));
      }, s.onabort = function () {
        r(new xt("Aborted", "AbortError"));
      }, s.open(o.method, o.url, !0), "include" === o.credentials ? s.withCredentials = !0 : "omit" === o.credentials && (s.withCredentials = !1), "responseType" in s && vt.blob && (s.responseType = "blob"), o.headers.forEach(function (t, e) {
        s.setRequestHeader(e, t);
      }), o.signal && (o.signal.addEventListener("abort", i), s.onreadystatechange = function () {
        4 === s.readyState && o.signal.removeEventListener("abort", i);
      }), s.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function k(t) {
    c(t);
  }function C(t, e, n) {
    M(Et.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: e, message: "build 578: " + t }) }).then(function (t) {
      null != n && n(), t.json().then(function (t) {
        console.log("Reported error. Reponse was: " + JSON.stringify(t));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function O(t, e) {
    var n = e.media.loop,
        r = e.media.startInstant,
        i = e.media.mediaId,
        o = e.media.source,
        s = e.media.doPickup,
        a = e.media.fadeTime,
        u = e.distance,
        c = e.media.flag,
        l = e.maxDistance;var h = 100;null != e.media.volume && 0 != e.media.volume && (h = e.media.volume), t.getMediaManager().destroySounds(i, !1, !0);var d = new mt(i);d.trackable = !0;var f = new _t(o);if (f.openAudioMc = t, f.setOa(t), t.getMediaManager().mixer.addChannel(d), d.addSound(f), d.setChannelVolume(0), f.setLooping(n), d.setTag(i), 0 !== l) {
      var _t6 = this.convertDistanceToVolume(l, u);d.setTag("SPECIAL"), d.maxDistance = l, d.fadeChannel(_t6, a);
    } else d.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (d.setChannelVolume(h), d.updateFromMasterVolume()) : (d.updateFromMasterVolume(), d.fadeChannel(h, a));
    }, 1);d.setTag(c), t.getMediaManager().mixer.updateCurrent(), f.finalize().then(function () {
      s && f.startDate(r, !0), f.finish();
    });
  }function T(t, e) {
    var n = e.message;t.notificationModule.sendNotification(e.title, n), new pt("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + n);
  }function _(t, e) {
    var n = parseInt(e.protocolRevision);if (c("Received PROTOCOL revision update"), 2 <= n && (c("PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0), 3 <= n && (c("PROTO rev => 3, enabling youtube callbacks"), t.socketModule.supportsYoutube = !0), 4 <= n && (c("PROTO rev => 4, enabling volume callbacks"), t.mediaManager.startVolumeWatcher(t)), 3 > n) {
      new pt("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function A(t, e) {
    var n = e.volume;t.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function P(t, e) {
    t.getMediaManager().destroySounds(e.soundId, e.all, !1, e.fadeTime);
  }function I(t, e) {
    var n = e.lights,
        r = e.hueColor,
        i = "rgba(" + r.r + "," + r.g + "," + r.b + "," + function (t, e, n) {
      return (t - e[0]) * (n[1] - n[0]) / (e[1] - e[0]) + n[0];
    }(r.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(n, i);
  }function N(t, e) {
    function n(t, e) {
      return Z((t - e) / t * 100);
    }var r = e.mediaOptions.target,
        i = e.mediaOptions.fadeTime,
        o = e.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = t.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _e6 = _step2.value;
        _e6.hasTag(r) && _e6.fadeChannel(n(_e6.maxDistance, o), i);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }function R(t, e) {
    var n = e.x,
        r = e.y,
        i = e.z,
        o = e.pitch,
        s = e.yaw;t.world.player.updateLocation(new Nt(n, r, i), o, s);
  }function F(t, e) {
    var n = e.clientSpeaker,
        r = new Nt(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        i = new Rt(n.id, n.source, r, n.type, n.maxDistance, n.startInstant, t);t.world.addSpeaker(n.id, i);
  }function L(t, e) {
    var n = e.clientSpeaker;t.world.removeSpeaker(n.id);
  }function B(t, e) {
    if (e.clear) c("Clearing pre-fetched resources"), setTimeout(function () {
      Ot = {};
    }, 2500);else {
      var _t7 = e.source;c("Pre-fetching resource.."), setTimeout(function () {
        !function (t) {
          t = Tt.translate(t);var e = new Audio();e.autoplay = !1, e.src = t, e.load(), Ot[t] = e;
        }(_t7);
      }, 2500);
    }
  }function D(t, e) {
    return null == RTCPeerConnection ? void Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "WebRTC is disabled!", text: "Your browser doesn't  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it." }) : void t.voiceModule.enable(e.streamServer, e.streamKey, e.radius);
  }function j(t, e) {
    t.voiceModule.addPeer(e.targetUuid, e.targetPlayerName, e.targetStreamKey, e.location);
  }function U(t, e) {
    null == e.streamKey ? t.voiceModule.removeAllPeers() : t.voiceModule.removePeer(e.streamKey);
  }function V(t, e) {
    for (var _n4, _r3 = 0; _r3 < e.updateSet.length; _r3++) {
      _n4 = e.updateSet[_r3], t.voiceModule.peerLocationUpdate(_n4.streamKey, _n4.x, _n4.y, _n4.z);
    }
  }function z() {
    (0, document.getElementById("vc-mic-mute").onmousedown)();
  }function H(t, e) {
    e.blurred ? t.voiceModule.blurWithReason() : t.voiceModule.unblur();
  }function G(t, e) {
    function n(t, e) {
      var n = 0,
          i = e || t.innerHTML,
          o = i.length;Bt.push(window.setInterval(function () {
        n >= o && (n = 0), i = r(i, n), t.innerHTML = i, n++;
      }, 0));
    }function r(t, e) {
      var n = $(function (t, e) {
        return tt(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + n + t.substr(e + 1, t.length);
    }var i = void 0,
        o = void 0,
        s = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t8 = 0; _t8 < s; _t8++) {
        o = e.childNodes[_t8], 3 === o.nodeType && (i = document.createElement("span"), i.innerHTML = o.nodeValue, e.replaceChild(i, o), n(i));
      }
    } else n(e, t);
  }function W(t, e) {
    var n = e.length,
        r = document.createElement("span"),
        i = !1;for (var _o3 = 0; _o3 < n; _o3++) {
      r.style.cssText += Dt[e[_o3]] + ";", "§k" === e[_o3] && (G(t, r), i = !0);
    }return i || (r.innerHTML = t), r;
  }function K(t, e, n, i) {
    M("https://cloud.openaudiomc.net/api/v3/account-services/client/login/" + i.publicServerKey).then(function (i) {
      i.json().then(function (i) {
        function o(t) {
          r("{{ oam.side_image }}", t), r("{{ oam.bg_image_map }}", "--bg-map:url('" + t + "');");
        }function s(e) {
          document.documentElement.style.setProperty("--border-color-dark", e);var n = function (t, e) {
            var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + "," + e / 100 + ")";
          }(e, 40);document.documentElement.style.setProperty("--border-color-normal", e), document.documentElement.style.setProperty("--border-color-light", n);for (var _n5 = 0; _n5 < jt.length; _n5++) {
            t.getUserInterfaceModule().changeColor(jt[_n5], e);
          }jt = [e];
        }if (null == i.errors || 0 != i.errors.length) return n(i.errors), void console.log(i.errors);var a = i.response;if (a.settings.banned) return void C("Declined connection due to ban " + window.location.host, "Steve", function () {
          window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
        });var u = a.secureEndpoint;c("accepting and applying settings");var l = a.settings.ambianceSound;null != a.settings.backgroundImage && "" != a.settings.backgroundImage && (a.settings.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + a.settings.backgroundImage);var h = a.settings.backgroundImage;window.debugHooks.setBgImage = o, "" !== h && o(h);var d = a.settings.title,
            f = a.settings.activeMessage;var p = a.settings.welcomeMessage;if (p = p.replace("%name", t.tokenSet.name), i.response.settings.useTranslations || (t.messageModule.setKey("landing.clickBelow", p), t.messageModule.setKey("landing.connectButton", a.settings.startButton), t.messageModule.setKey("main.content", f)), s(a.settings.color), window.debugHooks.setBgColor = s, "" != a.settings.startSound && (t.getMediaManager().startSound = a.settings.startSound), "default" !== d) {
          document.title = d;try {
            parent.document.title = d;
          } catch (t) {}
        }c("Logging into " + a.name + " with " + a.playerCount + " online player(s)"), e({ fromCache: i.fromCache, host: u, background: h, ambianceSound: l, playerCount: i.response.playerCount, claimed: i.response.claimed, rtc: i.response.rtc, serverName: i.response.name, isPatreon: i.response.isPatreon, countryCode: i.response.countryCode, useTranslations: i.response.settings.useTranslations });
      }).catch(function (t) {
        console.log("Dead end 1"), n(t);
      });
    }).catch(function (t) {
      console.log("Dead end 2"), n(t);
    });
  }function q() {
    Ht.canStart && Ht.start();
  }function J(t) {
    r("{{ oam.loading_tagline_style }}", "", "style"), i("{{ oam.loading_tagline_text }}", t);
  }function Y() {
    i("{{ oam.rtc_peer_count }}", "(" + ee + ")");
  }function X(t) {
    var e = document.querySelectorAll("[data-type=voice-card]");var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _t9 = _step3.value;
        _t9.style.display = "none";
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    document.getElementById(t).style.display = "";
  }var $ = String.fromCharCode,
      Q = Math.abs,
      Z = Math.round,
      tt = Math.floor;n.r(e);n(134);var et = n(131),
      nt = n.n(et);var rt = {},
      it = {},
      ot = { BUILD: "Build", UI: "Ui Templating", SESSION: "Session", ACCOUNT: "Account", AUDIO: "Mixer", SOCKET: "Socket", LOG: "Latest Log", RTC: "Streaming" };var st = !1,
      at = [],
      ut = [],
      ct = [];
  var lt = function () {
    function lt() {
      _classCallCheck(this, lt);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    lt.prototype.sync = function sync(t) {
      var e = new Date(t),
          n = new Date();this.isServerAhead = e.getTime() > n.getTime(), this.msOffset = this.isServerAhead ? e.getTime() - n.getTime() : n.getTime() - e.getTime(), this.hasSynced = !0;
    };

    lt.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return lt;
  }();

  Date.prototype.addHours = function (t) {
    return this.setTime(this.getTime() + 60 * t * 60 * 1e3), this;
  };
  var ht = function () {
    function ht(t) {
      _classCallCheck(this, ht);

      this.openAudioMc = t;
    }

    ht.prototype.changeColor = function changeColor(t, e) {
      var n = function (t) {
        return t = t.replace("#", ""), "rgb(" + parseInt(t.substring(0, 2), 16) + ", " + parseInt(t.substring(2, 4), 16) + ", " + parseInt(t.substring(4, 6), 16) + ")";
      }(t);document.querySelectorAll("*").forEach(function (t) {
        var r = window.getComputedStyle(t);Object.keys(r).reduce(function (i, o) {
          var s = r[o],
              a = r.getPropertyValue(s);if (0 <= a.indexOf(n)) {
            var _r4 = a.replace(n, e);0 <= s.indexOf("border-top") ? t.style.borderTop = "2px solid " + _r4 : t.style[s] = _r4;
          }
        });
      });
    };

    ht.prototype.openApp = function openApp() {
      l(dt.MAIN_UI);
    };

    ht.prototype.kickScreen = function kickScreen(t) {
      l(dt.KICKED), document.getElementById("kick-message").innerHTML = t;
    };

    return ht;
  }();

  var dt = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" },
      ft = "rtc_initialized";
  var pt = function () {
    function pt(t, e) {
      _classCallCheck(this, pt);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    pt.prototype.show = function show(t) {
      var _this = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("p-3"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
        t.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _t10 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_t10);
        }, this.option.closeTime);
      }return this;
    };

    pt.prototype.onClick = function onClick(t) {
      this.alertBox.onclick = t;
    };

    pt.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(t), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return pt;
  }();

  var gt = function () {
    function gt(t, e) {
      var _this3 = this;

      _classCallCheck(this, gt);

      return this.hue = e, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = t, this.isSsl ? void this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue") : (this.hue.discover().then(function (t) {
        t.forEach(function (t) {
          _this3.bridges.push(t), _this3.onDiscover();
        });
      }).catch(function (t) {
        return console.log("Error finding bridges", t);
      }), void (document.getElementById("hue-start-linking-button").onclick = function () {
        _this3.startSetup();
      }));
    }

    gt.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", document.getElementById("hue-setup-box").style.display = "", document.getElementById("hue-bridge-menu-button").onclick = this.openModal, this.isSsl) return void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    gt.prototype.openModal = function openModal() {
      document.getElementById("hue-modal-parent").style.display = "";
    };

    gt.prototype.startSetup = function startSetup() {
      var t = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (e) {
        t.linkBridge(e.internalipaddress);
      });
    };

    gt.prototype.onConnect = function onConnect() {
      var _this4 = this;

      this.currentUser.getConfig().then(function (t) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this4.openAudioMc.getHueConfiguration().setBridgeName(t.name), _this4.currentUser.getLights().then(function (t) {
          var e = [];for (var _n6 in t) {
            t.hasOwnProperty(_n6) && e.push({ name: t[_n6].name, id: parseInt(_n6) });
          }_this4.openAudioMc.getHueConfiguration().setLightNamesAndIds(e);null != Cookies.get("hue-state") && (_this4.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this4.openAudioMc.getHueConfiguration().applyState(), _this4.openAudioMc.getHueConfiguration().updateState();
        }), _this4.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    gt.prototype.updateSelector = function updateSelector(t) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = t;
      }, 200);
    };

    gt.prototype.colorToHueHsv = function colorToHueHsv(t) {
      var e = this.color(t).toHSV();return { on: 0 != 2 * e.alpha * 127.5, hue: tt(65535 * e.hue / 360), sat: tt(255 * e.saturation), bri: Z(2 * e.alpha * 127.5) };
    };

    gt.prototype.setLight = function setLight(t, e) {
      var _this5 = this;

      var n = [];if ("number" == typeof t) {
        var _e7 = this.openAudioMc.getHueConfiguration().getBulbStateById(t - 1);if (-1 === _e7) return !1;n.push(_e7);
      } else if (t.startsWith("[")) JSON.parse(t).forEach(function (t) {
        var e = _this5.openAudioMc.getHueConfiguration().getHueIdFromId(t - 1);return -1 !== e && void n.push(e);
      });else {
        var _e8 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(t) - 1);if (-1 === _e8) return !1;n.push(_e8);
      }n.forEach(function (t) {
        _this5.currentUser.setLightState(t, _this5.colorToHueHsv(e)).then(function () {});
      });
    };

    gt.prototype.linkBridge = function linkBridge(t, e) {
      var _this6 = this;

      if (i("{{ hue.linkingUpdate }}", window.getMessageString("hue.preparing")), null == e && null != this.options.userid) return i("{{ hue.linkingUpdate }}", window.getMessageString("hue.loggingIn")), this.currentUser = this.hue.bridge(t).user(this.options.userid), void this.currentUser.getGroups().then(function (e) {
        null != e[0] && null == e[0].error ? _this6.linkBridge(t, "error") : (_this6.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this6.isLinked = !0, _this6.onConnect());
      });if (this.currentBridge = this.hue.bridge(t), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var n = this;var r = 0,
          o = -1;o = setInterval(function () {
        function t() {
          clearInterval(o);
        }if (r++, 60 < r) return t(), _this6.startSetup(), void _this6.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var e = 60 - r;i("{{ hue.linkingUpdate }}", window.getMessageString("hue.linking"), [["%sec", e]]), n.currentBridge.createUser("OpenAudioMc#WebClient").then(function (e) {
          null == e[0].error ? null != e[0].success && (n.currentUser = n.currentBridge.user(e[0].success.username), _this6.openAudioMc.log("Linked with hue bridge after " + r + " attempt(s)."), n.isLinked = !0, n.onConnect(), t()) : 101 === e[0].error.type || (t(), _this6.openAudioMc.log("Unexpected error while connecting: " + e[0].error.type));
        });
      }, 1e3);
    };

    return gt;
  }();

  var mt = function () {
    function mt(t) {
      _classCallCheck(this, mt);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    mt.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    mt.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    mt.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _t11 = _step4.value;
          return !0;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return !1;
    };

    mt.prototype.addSound = function addSound(t) {
      this.sounds.push(t);var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _t12 = _step5.value;
          _t12.registerMixer(this.mixer, this);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this._updateVolume();
    };

    mt.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    mt.prototype.registerMixer = function registerMixer(t) {
      this.mixer = t;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _t13 = _step6.value;
          _t13.registerMixer(this.mixer, this);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    };

    mt.prototype.fadeChannel = function fadeChannel(t, e, n) {
      var _this7 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = t, this.isFading = !0, function (t, e, r, i) {
        e = e || 1e3, r = r || 0, i = i;var o = _this7.channelVolume,
            s = e / Q(o - r),
            a = setInterval(function () {
          o = o > r ? o - 1 : o + 1;var t = _this7.mixer.masterVolume,
              e = o / 100 * t;var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this7.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _t15 = _step7.value;
              _t15.setVolume(e);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          if (_this7.channelVolume = o, o == r) {
            n(), clearInterval(a);var _t14 = _this7.fadeTimer.indexOf(a);-1 < _t14 && _this7.fadeTimer.splice(_t14, 1), _this7.isFading = !1, a = null;
          }
        }, s);_this7.fadeTimer.push(a);
      }(0, e, t, n);
    };

    mt.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.fadeTimer[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _t16 = _step8.value;
            clearInterval(_t16);
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }
    };

    mt.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.sounds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _t17 = _step9.value;
          _t17.setVolume(e);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    };

    mt.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _t18 = _step10.value;
          _t18.setVolume(e);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    };

    mt.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.sounds[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t19 = _step11.value;
          _t19.destroy();
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }
    };

    return mt;
  }();

  var vt = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (vt.arrayBuffer) var yt = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      bt = ArrayBuffer.isView || function (t) {
    return t && -1 < yt.indexOf(Object.prototype.toString.call(t));
  };p.prototype.append = function (t, e) {
    t = h(t), e = d(e);var n = this.map[t];this.map[t] = n ? n + ", " + e : e;
  }, p.prototype.delete = function (t) {
    delete this.map[h(t)];
  }, p.prototype.get = function (t) {
    return t = h(t), this.has(t) ? this.map[t] : null;
  }, p.prototype.has = function (t) {
    return this.map.hasOwnProperty(h(t));
  }, p.prototype.set = function (t, e) {
    this.map[h(t)] = d(e);
  }, p.prototype.forEach = function (t, e) {
    for (var n in this.map) {
      this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
    }
  }, p.prototype.keys = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push(n);
    }), f(t);
  }, p.prototype.values = function () {
    var t = [];return this.forEach(function (e) {
      t.push(e);
    }), f(t);
  }, p.prototype.entries = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push([n, e]);
    }), f(t);
  }, vt.iterable && (p.prototype[Symbol.iterator] = p.prototype.entries);var wt = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];w.prototype.clone = function () {
    return new w(this, { body: this._bodyInit });
  }, b.call(w.prototype), b.call(E.prototype), E.prototype.clone = function () {
    return new E(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new p(this.headers), url: this.url });
  }, E.error = function () {
    var t = new E(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var St = [301, 302, 303, 307, 308];E.redirect = function (t, e) {
    if (-1 === St.indexOf(e)) throw new RangeError("Invalid status code");return new E(null, { status: e, headers: { location: t } });
  };var xt = self.DOMException;try {
    new xt();
  } catch (e) {
    (xt = function xt(t, e) {
      this.message = t, this.name = e;var n = Error(t);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), xt.prototype.constructor = xt;
  }M.polyfill = !0, self.fetch || (self.fetch = M, self.Headers = p, self.Request = w, self.Response = E);var Et = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var Mt = function () {
    function Mt(t, e, n, r, i) {
      _classCallCheck(this, Mt);

      this.publicServerKey = t, this.uuid = e, this.name = n, this.token = r, this.scope = i, this.attempts = 0;
    }

    Mt.prototype.initialize = function initialize() {
      var _this8 = this;

      return new Promise(function (t) {
        var e = window.location.href;if (null != e) {
          if (2 <= e.split("?").length) {
            var _n7 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(t) {
                if (-1 == t.indexOf("&")) return {};var e = t.split("&");var n = {};for (var _t20 = 0; _t20 < e.length; _t20++) {
                  var _r6 = e[_t20].split("="),
                      _i4 = decodeURIComponent(_r6[0]),
                      _o5 = decodeURIComponent(_r6[1]);void 0 === n[_i4] ? n[_i4] = decodeURIComponent(_o5) : "string" == typeof n[_i4] ? n[_i4] = [n[_i4], decodeURIComponent(_o5)] : n[_i4].push(decodeURIComponent(_o5));
                }return n;
              };

              return _class;
            }().getParametersFromUrl(e.split("?")[1]);if (null == _n7.data) return void t(null);var _r5 = atob(_n7.data).split(":");if (4 !== _r5.length) return t(null), null;var _i3 = _r5[0],
                _o4 = _r5[1],
                _s4 = _r5[2],
                _a2 = _r5[3];null != _i3 && 16 >= _i3.length && null != _o4 && 40 >= _o4.length && null != _s4 && 40 >= _s4.length && null != _a2 && 5 >= _a2.length || t(null);var _u = new Mt(_s4, _o4, _i3, _a2);window.tokenCache = _u, t(_u);
          } else if (2 <= e.split("#").length) {
            var _n8 = e.split("#")[1];M(Et.CLIENT_SESSION_SERVER + "?token=" + _n8).then(function (e) {
              e.json().then(function (e) {
                if (0 < e.errors.length) return void (3 > _this8.attempts ? (c("Failed to load session, trying again in a bit."), setTimeout(function () {
                  _this8.requestWasPreviouslyAttempted = !0, _this8.initialize().then(t), _this8.attempts++;
                }, 1e3)) : (console.log("Session error"), t(null)));var n = e.response;null == n.hasOwnProperty("serverIdentity") ? (k("No identity to fetch"), r("{{ oam.logo_image }}", "https://minotar.net/helm/" + n.playerName)) : function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, e) {
                    var n, i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            k("Fetching identity..");_context.next = 3;
                            return M("https://cloud.openaudiomc.net/identity?token=" + t);

                          case 3:
                            n = _context.sent;
                            _context.next = 6;
                            return n.json();

                          case 6:
                            i = _context.sent;
                            return _context.abrupt("return", 0 < i.errors.length ? void console.error("Could not load identity " + t) : (document.querySelector("link[rel*='icon']").href = i.response.icon + "&name=" + e, r("{{ oam.logo_image }}", i.response.icon + "&name=" + e), k("Native minecraft version: " + i.response.version), void k("Minecraft motd: " + i.response.motd)));

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x5, _x6) {
                    return _ref.apply(this, arguments);
                  };
                }()(n.serverIdentity, n.playerName).then(function () {
                  return console.log;
                }).catch(function () {
                  return console.log;
                });var i = new Mt(n.publicKey, n.playerUuid, n.playerName, n.session, n.scope);window.tokenCache = i, t(i);
              }).catch(function (t) {
                console.error(t);
              });
            }).catch(function (t) {
              C("Something went while requesting tokens. Error: " + t.toJSON(), window.tokenCache.name), console.error(t);
            });
          } else t(null);
        } else t(null);
      });
    };

    Mt.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return Mt;
  }();

  var kt = { PROXY: Et.CONTENT_PROXY, YOUTUBE: Et.YOUTUBE_PROXY, SOUNDCLOUD: Et.SOUNDCLOUD_PROXY, DRIVE: Et.DRIVE_PROXY };
  var Ct = function () {
    function Ct() {
      _classCallCheck(this, Ct);

      this.startedRandomly = !1, this.lastIndex = 0;
    }

    Ct.prototype.translate = function translate(t) {
      var e = this.handleRandomizedPlaylist(t);try {
        if (e.includes("media.openaudiomc.net")) return t;if (e = e.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !e.includes("http")) return null;if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", kt.DRIVE)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", kt.DRIVE)), e.includes("https://drive.google.com/") && (e = e.split("file/d/")[1], e = kt.DRIVE + e.split("/view")[0]), this.isYoutube = !1, e.includes("youtube.")) {
          var _t21 = e.split("v=")[1];_t21.includes("&") && (_t21 = _t21.split("&")[0]), e = kt.YOUTUBE + _t21, this.isYoutube = !0;
        } else if (e.includes("youtu.be")) {
          var _t22 = e.split(".be/")[1];e = kt.YOUTUBE + _t22, this.isYoutube = !0;
        }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (fetch("https://media.openaudiomc.net/2/soundcloud?u=" + e).then(function (t) {
          return t.json();
        }).then(function (t) {
          document.getElementById("sc-cover").style.display = "", document.getElementById("sc-title").style.display = "", i("{{ oam.soundcloud_title }}", t.artist + " - " + t.title), document.getElementById("sc-title").onclick = function () {
            window.open(t.link);
          }, document.getElementById("sc-cover").src = t.photo;
        }), e = kt.SOUNDCLOUD + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = kt.PROXY + e);
      } catch (e) {
        return console.log("Middleware error"), console.log(e), t;
      }return e;
    };

    Ct.prototype.handleRandomizedPlaylist = function handleRandomizedPlaylist(t) {
      if (t.startsWith("[") && t.endsWith("]")) {
        var e = JSON.parse(t);if (!this.startedRandomly) {
          var _t23 = tt(Math.random() * e.length);return this.lastIndex = _t23, this.startedRandomly = !0, e[_t23];
        }return this.lastIndex++, this.lastIndex > e.length - 1 && (this.lastIndex = 0), e[this.lastIndex];
      }return t;
    };

    return Ct;
  }();

  var Ot = {},
      Tt = new Ct();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
  var _t = function (_Ct) {
    _inherits(_t, _Ct);

    function _t(t) {
      var _this9;

      _classCallCheck(this, _t);

      (_this9 = _possibleConstructorReturn(this, _Ct.call(this)), _this9), _this9.rawSource = t, t = _this9.translate(t), _this9.soundElement = function (t) {
        t = Tt.translate(t);var e = Ot[t];return null == e ? new Audio() : e;
      }(t), _this9.hadError = !1, _this9.source = t, _this9.error = null, _this9.trackable = !1, _this9.soundElement.onerror = function (t) {
        _this9.hadError = !0, _this9.error = t, _this9._handleError();
      }, _this9.soundElement.src = t, _this9.soundElement.setAttribute("preload", "auto"), _this9.soundElement.setAttribute("controls", "none"), _this9.soundElement.setAttribute("display", "none"), _this9.soundElement.preload = "auto", _this9.soundElement.abort = console.log, _this9.openAudioMc = null, _this9.onFinish = [], _this9.loop = !1, _this9.mixer = null, _this9.channel = null, _this9.finsishedInitializing = !1, _this9.gotShutDown = !1;return _this9;
    }

    _t.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    _t.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _t24 = this.soundElement.error.code,
            e = null;this.isYoutube ? e = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === _t24 ? e = "MEDIA_ERR_ABORTED" : 2 === _t24 ? e = "MEDIA_ERR_NETWORK" : 3 === _t24 ? e = "MEDIA_ERR_DECODE" : 4 === _t24 && (e = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != e && (c("Reporting media failure " + e), this.openAudioMc.socketModule.send("media_failure", { mediaError: e, source: this.soundElement.src }));
      }
    };

    _t.prototype.addNode = function addNode(t, e) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = kt.PROXY + this.soundElement.src), this.controller = t.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(e);
    };

    _t.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    _t.prototype.finalize = function finalize() {
      var _this10 = this;

      return new Promise(function (t) {
        _this10.soundElement.onended = function () {
          _this10.gotShutDown || !_this10.finsishedInitializing || (_this10.onFinish.forEach(function (t) {
            t();
          }), _this10.loop ? (_this10.soundElement.src = _this10.translate(_this10.rawSource), _this10.setTime(0), _this10.soundElement.play()) : (_this10.mixer.removeChannel(_this10.channel), !_this10.soundElement.paused && _this10.soundElement.pause()));
        };var e = !1;var n = function n() {
          if (!_this10.gotShutDown) {
            if (!e) {
              var _e9 = _this10.soundElement.play();_e9 instanceof Promise ? _e9.then(t).catch(t) : t();
            }e = !0;
          }
        };_this10.soundElement.onplay = function () {
          _this10.gotShutDown && (c("Canceled a sound that started to play, for some reason."), _this10.soundElement.pause());
        }, _this10.soundElement.onprogress = n, _this10.soundElement.oncanplay = n, _this10.soundElement.oncanplaythrough = n;
      });
    };

    _t.prototype.setLooping = function setLooping(t) {
      this.loop = t;
    };

    _t.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    _t.prototype.setOnFinish = function setOnFinish(t) {
      this.onFinish.push(t);
    };

    _t.prototype.setVolume = function setVolume(t) {
      100 < t && (t = 100), this.soundElement.volume = t / 100;
    };

    _t.prototype.startDate = function startDate(t) {
      var e = new Date(t),
          n = (this.openAudioMc.timeService.getPredictedTime() - e) / 1e3;c("Started " + n + " ago");var r = this.soundElement.duration;if (n > r) {
        n -= tt(n / r) * r;
      }c("Starting " + n + " in"), this.setTime(n);
    };

    _t.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    _t.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return _t;
  }(Ct);

  var At = function () {
    function At(t, e) {
      var _this11 = this;

      _classCallCheck(this, At);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null, this.recentSource = "/none", u(function () {
        window.debugUi.addPanel(ot.AUDIO, function () {
          return "playingChannels=" + _this11.channels.size + ", prefetched=" + Object.keys(Ot).length + ", recent=" + _this11.recentSource.split("/")[_this11.recentSource.split("/").length - 1];
        });
      });
    }

    At.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var t = !1;this.channels.forEach(function (e) {
        e.hasSoundPlaying() && (t = !0);
      }), t != this.areSoundsPlaying && (this._playingStateChangeChanged(t), this.areSoundsPlaying = t);
    };

    At.prototype._playingStateChangeChanged = function _playingStateChangeChanged(t) {
      null == this.ambianceSoundMedia || (t ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    At.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      var e = new mt("ambiance-lol-dics"),
          n = new _t(t);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), e.mixer = { masterVolume: this.masterVolume }, e.addSound(n), this.ambianceSoundMedia = e, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    At.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, n) {
        var r = [];e.tags.forEach(function (t, e) {
          r.push(e);
        }), e.trackable && t.push({ name: n, tags: r });
      }), this._updatePlayingSounds();
    };

    At.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.channels.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _t25 = _step12.value;
          _t25.updateFromMasterVolume();
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      null != this.ambianceSoundMedia && (this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.updateFromMasterVolume(t));
    };

    At.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof mt ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this._updatePlayingSounds();
    };

    At.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    At.prototype.addChannel = function addChannel(t) {
      var _this12 = this;

      if (!(t instanceof mt)) throw new Error("Argument isn't a channel");{
        var e = t.channelName,
            _n9 = this.channels.get(e);null != _n9 && _n9.destroy(), t.registerMixer(this), this.channels.set(e, t), setTimeout(function () {
          for (var _e10 in t.sounds) {
            _this12.recentSource = t.sounds[_e10].rawSource;
          }
        }, 1e3);
      }this._updatePlayingSounds();
    };

    return At;
  }();

  var Pt = function () {
    function Pt(t) {
      var _this13 = this;

      _classCallCheck(this, Pt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.startSound = null, this.mixer = new At(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this13.setMasterVolume(t), Cookies.set("volume", t, { expires: 30 });
      };
    }

    Pt.prototype.startVolumeMonitor = function startVolumeMonitor(t) {
      var _this14 = this;

      var e = -1;setInterval(function () {
        e != _this14.masterVolume && (e = _this14.masterVolume, t.socketModule.send("volume_changed", { volume: _this14.masterVolume }));
      }, 300);
    };

    Pt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      "" == t || null == t || this.mixer.setupAmbianceSound(t);
    };

    Pt.prototype.startVolumeWatcher = function startVolumeWatcher(t) {
      this.startVolumeMonitor(t);
    };

    Pt.prototype.postBoot = function postBoot() {
      var _this15 = this;

      if (null != this.startSound) {
        var _t26 = new mt("startsound"),
            e = new _t(this.startSound);e.openAudioMc = this.openAudioMc, e.setOa(this.openAudioMc), e.setOnFinish(function () {
          setTimeout(function () {
            _this15.mixer._updatePlayingSounds();
          }, 1e3);
        }), e.finalize().then(function () {
          _this15.mixer.addChannel(_t26), _t26.addSound(e), _t26.setChannelVolume(100), _t26.updateFromMasterVolume(), e.finish();
        });
      } else setTimeout(function () {
        _this15.mixer._updatePlayingSounds();
      }, 500);
    };

    Pt.prototype.destroySounds = function destroySounds(t, e, n, r) {
      var _this16 = this;

      var i = r;null == i && (i = 500), n && (i = 0);var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        var _loop = function _loop() {
          var n = _step13.value;
          e ? n.fadeChannel(0, i, function () {
            _this16.mixer.removeChannel(n);
          }) : null == t || "" === t ? n.hasTag("SPECIAL") || n.hasTag("REGION") || n.hasTag("SPEAKER") || n.fadeChannel(0, i, function () {
            _this16.mixer.removeChannel(n);
          }) : n.hasTag(t) && (n.sounds.forEach(function (t) {
            t.gotShutDown = !0;
          }), n.fadeChannel(0, i, function () {
            _this16.mixer.removeChannel(n);
          }));
        };

        for (var _iterator13 = this.mixer.getChannels()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    };

    Pt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, i("{{ oam.volume }}", 0 === t ? t + "(muted)" : t + "%"), Cookies.set("volume", t, { expires: 30 }), this.mixer.setMasterVolume(t);
    };

    Pt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    Pt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return Pt;
  }();

  var It = function () {
    function It(t, e) {
      var _this17 = this;

      _classCallCheck(this, It);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], this.inCount = 0, this.outCount = 0, u(function () {
        window.debugUi.addPanel(ot.SOCKET, function () {
          return "in=" + _this17.inCount + ", out=" + _this17.outCount + ", ok=" + _this17.socket.connected;
        });
      }), null == new Mt().fromCache()) return console.log("Empty authentication"), void l(dt.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token;var n = this;this.socket = io(e, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.socketModule.state = "ok", _this17.hasConnected = !0, _this17.outgoingQueue.forEach(function (t) {
          _this17.send(t.key, t.value);
        });
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            n = parseInt(e[1]),
            r = parseInt(e[0]);_this17.openAudioMc.getTimeService().sync(r, n);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), n.state = "closed", l(dt.BAD_AUTH), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010), t.voiceModule.shutDown();
      }), this.socket.on("data", function (t) {
        var e = t.type.split("."),
            r = e[e.length - 1];null != n.handlers[r] && n.handlers[r](t.payload), _this17.inCount++;
      }), this.socket.connect();
    }

    It.prototype.send = function send(t, e) {
      if (this.outCount++, this.hasConnected) {
        if (!this.callbacksEnabled) return void c("could not satisfy callback " + t + " because the protocol is outdated");c("Submitting value for " + t), this.socket.emit(t, e);
      } else this.outgoingQueue.push({ key: t, value: e });
    };

    It.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return It;
  }();

  var Nt = function () {
    function Nt(t, e, n) {
      _classCallCheck(this, Nt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0;
    }

    Nt.prototype.add = function add(t, e, n) {
      return this.x += t, this.y += e, this.z += n, this;
    };

    Nt.prototype.applyQuaternion = function applyQuaternion(t) {
      var e = this.x,
          n = this.y,
          r = this.z,
          i = t.x,
          o = t.y,
          s = t.z,
          a = t.w,
          u = a * e + o * r - s * n,
          c = a * n + s * e - i * r,
          l = a * r + i * n - o * e,
          h = -i * e - o * n - s * r;return this.x = u * a + h * -i + c * -s - l * -o, this.y = c * a + h * -o + l * -i - u * -s, this.z = l * a + h * -s + u * -o - c * -i, this;
    };

    Nt.prototype.square = function square(t) {
      return t * t;
    };

    Nt.prototype.distance = function distance(t) {
      var e = this.square(this.x - t.x) + this.square(this.y - t.y) + this.square(this.z - t.z);return Math.sqrt(e);
    };

    return Nt;
  }();

  var Rt = function () {
    function Rt(t, e, n, r, i, o, s) {
      _classCallCheck(this, Rt);

      this.id = t, this.source = e, this.location = n, this.type = r, this.maxDistance = i, this.startInstant = o, this.openAudioMc = s, this.channel = null;
    }

    Rt.prototype.getDistance = function getDistance(t, e) {
      return e.location.distance(this.location);
    };

    return Rt;
  }();

  window.enableOpenAudioDebugMode = function () {
    me.isProd = !1, a();
  };
  var Ft = function Ft(t) {
    _classCallCheck(this, Ft);

    function e(e, n) {
      t.socketModule.registerHandler(e, function (e) {
        return n(t, e);
      });
    }e("ClientVersionPayload", _), e("NotificationPayload", T), e("HueColorPayload", I), e("ClientPlayerLocationPayload", R), e("ClientSpeakerCreatePayload", F), e("ClientSpeakerDestroyPayload", L), e("ClientPreFetchPayload", B), e("ClientUpdateMediaPayload", N), e("ClientCreateMediaPayload", O), e("ClientDestroyMediaPayload", P), e("ClientVolumePayload", A), e("ClientVoiceChatUnlockPayload", D), e("ClientVoiceSubscribePayload", j), e("ClientVoiceDropPayload", U), e("ClientVoiceUpdatePeerLocationsPayload", V), e("ClientVoiceChatToggleMicrophonePayload", z), e("ClientVoiceBlurUiPayload", H);
  };

  var Lt = function () {
    function Lt() {
      var _this18 = this;

      _classCallCheck(this, Lt);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this18.select();
        };
      });
    }

    Lt.prototype.setBridgeName = function setBridgeName(t) {
      i("{{ oam.hue_bridge_name }}", t);
    };

    Lt.prototype.select = function select() {
      this.updateState();
    };

    Lt.prototype.applyState = function applyState() {
      var _this19 = this;

      this.state.forEach(function (t) {
        _this19.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    Lt.prototype.updateState = function updateState() {
      var _this20 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this20.state.push(_this20.obtainSelection(t));
      }), Cookies.set("hue-state", this.state, { expires: 30 });
    };

    Lt.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          n = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: n };
    };

    Lt.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    Lt.prototype.getInputById = function getInputById(t) {
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = this.dropdowns[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var e = _step14.value;
          if (e.dataset.bulb == t) return e;
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14.return) {
            _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }
    };

    Lt.prototype.getHueIdFromId = function getHueIdFromId(t) {
      return this.state[parseInt(t)].value;
    };

    Lt.prototype.setLightNamesAndIds = function setLightNamesAndIds(t) {
      var e = "";t.forEach(function (t) {
        e += "<option data-light='" + t.id + "'>" + t.name + "</option>";
      }), this.dropdowns.forEach(function (t) {
        t.innerHTML = e;
      });
    };

    return Lt;
  }();

  var Bt = [],
      Dt = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t27 = Bt.length; _t27--;) {
        clearInterval(Bt[_t27]);
      }Bt = [];
    }(), function (t) {
      var e,
          n,
          r = t.match(/&.{1}/g) || [],
          i = [],
          o = [],
          s = document.createDocumentFragment(),
          a = r.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e11 = 0; _e11 < a; _e11++) {
        i.push(t.indexOf(r[_e11])), t = t.replace(r[_e11], "\0\0");
      }0 !== i[0] && s.appendChild(W(t.substring(0, i[0]), []));for (var _u2 = 0; _u2 < a; _u2++) {
        if (2 === (n = i[_u2 + 1] - i[_u2])) {
          for (; 2 == n;) {
            o.push(r[_u2]), _u2++, n = i[_u2 + 1] - i[_u2];
          }o.push(r[_u2]);
        } else o.push(r[_u2]);-1 < o.lastIndexOf("§r") && (o = o.slice(o.lastIndexOf("§r") + 1)), e = t.substring(i[_u2], i[_u2 + 1]), s.appendChild(W(e, o));
      }return s;
    }(this + "");
  };var jt = ["#2c78f6", "#4F46E5"];
  var Ut = function () {
    function Ut(t) {
      _classCallCheck(this, Ut);

      this.host = t;
    }

    Ut.prototype.route = function route(t) {
      var _this21 = this;

      return new Promise(function (e, n) {
        _this21.tokenSet = new Mt().fromCache(), "ACCOUNT" === _this21.tokenSet.scope && (c("Using account based profile system..."), K(t, e, n, _this21.tokenSet));
      });
    };

    return Ut;
  }();

  var Vt = function () {
    function Vt(t) {
      _classCallCheck(this, Vt);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    Vt.prototype.setupPermissions = function setupPermissions() {
      var _this22 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new pt("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><span id="noti-perm-request-link" class="alert-message-button">Setup</span></div>'), s(function () {
        document.getElementById("noti-perm-request-link").onclick = _this22.requestNotificationPermissions;
      }));
    };

    Vt.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    Vt.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this23 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this23.requestBox.hide(), new pt("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this23.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return Vt;
  }();

  var zt = n(132);var Ht = null;
  var Gt = function Gt(t, e, n) {
    _classCallCheck(this, Gt);

    this.x = t || 0, this.y = e || 0, this.z = n || 0;
  };

  var Wt = function () {
    function Wt(t, e, n, r) {
      _classCallCheck(this, Wt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === r ? 1 : r;
    }

    Wt.prototype.setFromEuler = function setFromEuler(t) {
      var e = Math.sin,
          n = Math.cos;var r = t.x,
          i = t.y,
          o = t.z,
          s = n(r / 2),
          a = n(i / 2),
          u = n(o / 2),
          c = e(r / 2),
          l = e(i / 2),
          h = e(o / 2);return this.x = c * a * u + s * l * h, this.y = s * l * u - c * a * h, this.z = s * a * h + c * l * u, this.w = s * a * u - c * l * h, this;
    };

    return Wt;
  }();

  var Kt = function () {
    function Kt() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Nt();
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Wt();

      _classCallCheck(this, Kt);

      this.position = t, this.rotation = e;
    }

    Kt.prototype.applyTo = function applyTo(t) {
      var e = this.position,
          n = new Nt(0, 0, 1).applyQuaternion(this.rotation),
          r = new Nt(0, 1, 0).applyQuaternion(this.rotation);t.positionX ? (t.positionX.value = e.x, t.positionY.value = e.y, t.positionZ.value = e.z) : t.setPosition(e.x, e.y, e.z), t instanceof PannerNode ? t.orientationX ? (t.orientationX.value = n.x, t.orientationY.value = n.y, t.orientationZ.value = n.z) : t.setOrientation(n.x, n.y, n.z) : t.forwardX ? (t.forwardX.value = n.x, t.forwardY.value = n.y, t.forwardZ.value = n.z, t.upX.value = r.x, t.upY.value = r.y, t.upZ.value = r.z) : t.setOrientation(n.x, n.y, n.z, r.x, r.y, r.z);
    };

    return Kt;
  }();

  var qt = function () {
    function qt(t, e, n, r) {
      _classCallCheck(this, qt);

      this.world = t, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(e, n, r);
    }

    qt.prototype.updateLocation = function updateLocation(t, e, n) {
      this.location = t, this.pitch = this.toRadians(e), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var r = new Gt(this.pitch, this.yaw, 0),
          i = new Wt();i.setFromEuler(r);new Kt(t, i).applyTo(this.listener), this.world.onLocationUpdate();
    };

    qt.prototype.toRadians = function toRadians(t) {
      return t * (Math.PI / 180);
    };

    qt.prototype.normalizeYaw = function normalizeYaw(t) {
      return 0 > (t %= 360) && (t += 360), t;
    };

    return qt;
  }();

  var Jt = function Jt(t, e, n) {
    _classCallCheck(this, Jt);

    this.source = t, this.distance = e, this.speaker = n;
  };

  var Yt = "SPEAKER_2D";
  var Xt = function Xt(t, e, n, r) {
    _classCallCheck(this, Xt);

    this.pannerNode = n.audioCtx.createPanner(), this.media = r, r.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear", this.pannerNode.maxDistance = t.maxDistance;var i = t.location;new Kt(i).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var $t = function () {
    function $t(t, e, n) {
      var _this24 = this;

      _classCallCheck(this, $t);

      this.id = "SPEAKER__" + e, this.openAudioMc = t, this.speakerNodes = new Map();var r = new mt(this.id);r.trackable = !0, this.channel = r;var i = new _t(e);this.media = i, i.openAudioMc = t, i.setOa(t), r.mixer = this.openAudioMc.getMediaManager().mixer, r.addSound(i), r.setChannelVolume(0), i.startDate(n, !0), i.finalize().then(function () {
        t.getMediaManager().mixer.addChannel(r), i.setLooping(!0), r.setTag(_this24.id), r.setTag("SPECIAL"), _this24.openAudioMc.getMediaManager().mixer.updateCurrent(), i.startDate(n, !0), i.finish();
      });
    }

    $t.prototype.removeSpeakerLocation = function removeSpeakerLocation(t) {
      null != this.speakerNodes.get(t) && this.speakerNodes.delete(t);
    };

    $t.prototype.updateLocation = function updateLocation(t, e, n) {
      if (t.type == Yt) {
        var _r7 = t.getDistance(e, n),
            _i5 = this._convertDistanceToVolume(t.maxDistance, _r7);if (0 >= _i5) return;this.channel.fadeChannel(_i5, 100);
      } else this.speakerNodes.has(t.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(t.id, new Xt(t, e, n, this.media)));
    };

    $t.prototype._convertDistanceToVolume = function _convertDistanceToVolume(t, e) {
      return Z((t - e) / t * 100);
    };

    $t.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return $t;
  }();

  var Qt = function () {
    function Qt(t) {
      _classCallCheck(this, Qt);

      this.openAudioMc = t, this.speakers = new Map(), this.audioMap = new Map(), this.player = new qt(this, new Nt(0, 0, 0), 0, 0);
    }

    Qt.prototype.getSpeakerById = function getSpeakerById(t) {
      return this.speakers.get(t);
    };

    Qt.prototype.addSpeaker = function addSpeaker(t, e) {
      this.speakers.set(t, e), this.renderAudio2D();
    };

    Qt.prototype.removeSpeaker = function removeSpeaker(t) {
      this.speakers.delete(t), this.audioMap.forEach(function (t, e) {
        t.removeSpeakerLocation(e);
      }), this.renderAudio2D();
    };

    Qt.prototype.getMediaForSource = function getMediaForSource(t, e) {
      var n = this.audioMap.get(t);if (null != n) return n;if (null == e) return null;var r = new $t(this.openAudioMc, t, e);return this.audioMap.set(t, r), r;
    };

    Qt.prototype.removeMediaFromSource = function removeMediaFromSource(t) {
      var e = this.getMediaForSource(t);null == e || (e.remove(), this.audioMap.delete(t));
    };

    Qt.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    Qt.prototype.isMediaUsed = function isMediaUsed(t) {
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = this.speakers.values()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var e = _step15.value;
          if (e.source == t) return !0;
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15.return) {
            _iterator15.return();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      return !1;
    };

    Qt.prototype.renderAudio2D = function renderAudio2D() {
      var _this25 = this;

      var t = [];this.speakers.forEach(function (e) {
        var n = e.getDistance(_this25, _this25.player);t.push(new Jt(e.source, n, e));
      });var e = new Map();var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = t[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _n10 = _step16.value;
          var _t29 = e.get(_n10.source);null != _t29 ? Array.isArray(_t29) ? (_t29.push(_n10), e.set(_n10.source, _t29)) : _t29.distance > _n10.distance && _n10.distance <= _n10.speaker.maxDistance && e.set(_n10.source, _n10) : _n10.speaker.type == Yt ? _n10.distance <= _n10.speaker.maxDistance && e.set(_n10.source, _n10) : _n10.distance <= _n10.speaker.maxDistance && e.set(_n10.source, [_n10]);
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      e.forEach(function (t) {
        var e = Array.isArray(t) ? t : [t];var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
          for (var _iterator17 = e[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            var _t28 = _step17.value;
            _this25.getMediaForSource(_t28.source, _t28.speaker.startInstant).updateLocation(_t28.speaker, _this25, _this25.player);
          }
        } catch (err) {
          _didIteratorError17 = true;
          _iteratorError17 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion17 && _iterator17.return) {
              _iterator17.return();
            }
          } finally {
            if (_didIteratorError17) {
              throw _iteratorError17;
            }
          }
        }
      }), this.audioMap.forEach(function (t, e) {
        _this25.isMediaUsed(e) || _this25.removeMediaFromSource(e);
      });
    };

    return Qt;
  }();

  var Zt = function () {
    function Zt() {
      _classCallCheck(this, Zt);

      this.successCallback = alert, this.errorCallback = alert;
    }

    Zt.prototype.getUserMedia = function getUserMedia(t) {
      var _this26 = this;

      return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
        return _this26.successCallback(t);
      }).catch(function (t) {
        return _this26.errorCallback(t);
      }) : void navigator.webkitGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.getUserMedia(t, this.successCallback, this.errorCallback);
    };

    return Zt;
  }();

  var te = {};window.handlePeerVolumeEvent = function (t) {
    var e = te[t.id];null != e && e(t);
  };var ee = 0;Y();
  var ne = function () {
    function ne(t, e, n, r, i) {
      var _this27 = this;

      _classCallCheck(this, ne);

      this.openAudioMc = t, this.playerName = e, this.onVolumeChange = i, this.removed = !1;var o = '\n        <div class="flex items-center p-2" id="vc-user-card-' + e + '">\n            <div class="w-12 h-12 rounded-full mr-3 overflow-hidden flex items-center" id="vc-user-card-' + e + '-indicator">\n                <img id="vc-user-card-' + e + '-picture" src="https://visage.surgeplay.com/bust/512/' + n + '" class="w-16">\n            </div>\n            <div class="flex-1">\n                <div class="flex items-center">\n                    <div class="font-semibold text-normal text-teal-500"><svg id="vc-user-card-' + e + '-muted" class="h-8 w-8 text-red-500" style="display: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="1" y1="1" x2="23" y2="23" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /> <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /> <line x1="12" y1="19" x2="12" y2="23" /> <line x1="8" y1="23" x2="16" y2="23" /></svg>' + e + ' <small id="vc-user-card-' + e + '-volume-disp">(' + r + '% volume)</small>\n                    </div>\n                </div>\n                <div><input id="vc-user-card-' + e + '-volume-input" oninput="handlePeerVolumeEvent(this)"\n                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"\n                            type="range" min="0" max="120" step="1" value="' + r + '"/></div>\n            </div>\n        </div>\n        ';document.getElementById("vc-call-members").innerHTML += o, ee++, Y(), te["vc-user-card-" + this.playerName + "-volume-input"] = function (t) {
        this.callingSliderUpdate(t);
      }.bind(this), setTimeout(function () {
        _this27.updatePlaceholder();
      }, 10);
    }

    ne.prototype.callingSliderUpdate = function callingSliderUpdate() {
      if (!this.removed) {
        var t = document.getElementById("vc-user-card-" + this.playerName + "-volume-input").value;this.onVolumeChange(t), this.updateVolumeDisplay(t);
      }
    };

    ne.prototype.updatePlaceholder = function updatePlaceholder() {
      document.getElementById("empty-call-placeholder").style.display = 0 == this.openAudioMc.voiceModule.peerMap.size ? "" : "none";
    };

    ne.prototype.remove = function remove() {
      ee--, Y(), this.removed = !0, document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName)), this.updatePlaceholder(), delete te["vc-user-card-" + this.playerName + "-volume-input"];
    };

    ne.prototype.setVisuallyTalking = function setVisuallyTalking(t) {
      this.removed || (t ? (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = "lime", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "0 0 10pt 2pt lime") : (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = ""));
    };

    ne.prototype.setVisuallyMuted = function setVisuallyMuted(t) {
      this.removed || (t ? (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "0.2", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "inline") : (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "1", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "none"));
    };

    ne.prototype.updateVolumeDisplay = function updateVolumeDisplay(t) {
      this.removed || (document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + t + "% volume)");
    };

    return ne;
  }();

  var re = n(60);
  var ie = function () {
    function ie(t, e, n, r, i, o) {
      _classCallCheck(this, ie);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.peerStreamKey = r, this.volume = i, this.volBooster = 1.2, this.uiInst = o, this.harkEvents = null;
    }

    ie.prototype.start = function start(t) {
      var _this28 = this;

      var e = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);e.onFinish(function (e) {
        var n = _this28.openAudioMc.world.player.audioCtx;_this28.setVolume(_this28.volume), _this28.gainNode = n.createGain(), _this28.audio = new Audio(), _this28.audio.autoplay = !0, _this28.audio.srcObject = e, _this28.gainNode.gain.value = _this28.volume / 100 * _this28.volBooster, window.debugAudio = _this28.audio, _this28.audio.muted = !0;var r = n.createMediaStreamSource(_this28.audio.srcObject);if (_this28.harkEvents = Object(re.a)(e, {}), _this28.harkEvents.setThreshold(-75), _this28.harkEvents.on("speaking", function () {
          _this28.uiInst.setVisuallyTalking(!0);
        }), _this28.harkEvents.on("stopped_speaking", function () {
          _this28.uiInst.setVisuallyTalking(!1);
        }), _this28.audio.muted = !0, _this28.openAudioMc.voiceModule.surroundSwitch.isOn()) {
          var _t30 = _this28.gainNode;_this28.pannerNode = n.createPanner(), _this28.pannerNode.maxDistance = _this28.openAudioMc.voiceModule.blocksRadius, _this28.pannerNode.panningModel = "HRTF", _this28.pannerNode.rolloffFactor = .65, _this28.pannerNode.distanceModel = "linear", _this28.pannerNode.coneOuterGain = .7, _this28.pannerNode.coneInnerAngle = 120, _this28.setLocation(_this28.x, _this28.y, _this28.z, !0), r.connect(_t30), _t30.connect(_this28.pannerNode), _this28.pannerNode.connect(n.destination);
        } else {
          var _t31 = _this28.gainNode;r.connect(_t31), _t31.connect(n.destination);
        }_this28.audio.play().then(function () {}).catch(function (t) {
          console.log("Denied from promise", t);
        }), t();
      }), e.onReject(function (t) {
        c("Stream for " + _this28.peerStreamKey + " got denied: " + t);
      });
    };

    ie.prototype.setLocation = function setLocation(t, e, n, r) {
      if (this.openAudioMc.voiceModule.useSurround) {
        if (r && null != this.pannerNode) {
          new Kt(new Nt(this.x, this.y, this.z)).applyTo(this.pannerNode);
        } else r && c("Warning, attempted to update a peer location while the panner node is nil");this.x = t, this.y = e, this.z = n;
      }
    };

    ie.prototype.setVolume = function setVolume(t) {
      this.volume = t, null != this.gainNode && (this.gainNode.gain.value = this.volume / 100 * this.volBooster);
    };

    ie.prototype.stop = function stop() {
      null != this.audio && (this.audio.pause(), this.audio.src = null, this.audio.srcObject = null, this.gainNode.gain.value = 0), null != this.harkEvents && this.harkEvents.stop();
    };

    return ie;
  }();

  var oe = function () {
    function oe(t, e, n, r, i, o) {
      var _this29 = this;

      _classCallCheck(this, oe);

      this.openAudioMc = t, this.playerName = e, this.playerUuid = e, this.streamKey = r, this.active = !0, this.ready = !1, this.location = o, this.volume = 80;var s = Cookies.get("vc-volume-of-" + e);null != s && (this.volume = parseInt(s)), this.ui = new ne(this.openAudioMc, e, n, this.volume, function (t) {
        _this29.volume = t, Cookies.set("vc-volume-of-" + e, t, { expires: 30 }), _this29.ready && _this29.stream.setVolume(_this29.volume);
      }), this.stream = new ie(t, i, t.voiceModule.streamKey, r, this.volume, this.ui), this.stream.setLocation(o.x, o.y, o.z, !1), this.stream.start(function () {
        return _this29.active ? (_this29.stream.setVolume(_this29.volume), void (_this29.ready = !0)) : void _this29.stop();
      });
    }

    oe.prototype.updateLocation = function updateLocation(t, e, n) {
      this.stream.setLocation(t, e, n, !0);
    };

    oe.prototype.stop = function stop() {
      null != this.openAudioMc.voiceModule.peerManager && this.openAudioMc.voiceModule.peerManager.dropStream(this.streamKey), this.active = !1, this.ui.remove(), null != this.stream && this.stream.stop();
    };

    return oe;
  }();

  var se = function () {
    function se(t, e, n) {
      var _this30 = this;

      _classCallCheck(this, se);

      this.id = t, this.onToggle = n, this.state = null == Cookies.get(t) ? e : JSON.parse(Cookies.get(t)), this.setVisuallyActive(this.state), s(function () {
        document.getElementById(_this30.id).checked = !_this30.state, document.getElementById(_this30.id).onclick = function () {
          _this30.state = !_this30.state, Cookies.set(_this30.id, _this30.state, { expires: 30 }), _this30.onToggle(_this30.state), _this30.setVisuallyActive(_this30.state);
        };
      });
    }

    se.prototype.setVisuallyActive = function setVisuallyActive(t) {
      t ? (document.getElementById(this.id).style.backgroundColor = "", document.getElementById(this.id).style.color = "") : (document.getElementById(this.id).style.backgroundColor = "#EF4444", document.getElementById(this.id).style.color = "#F3F4F6");
    };

    se.prototype.getState = function getState() {
      return this.state;
    };

    se.prototype.isOn = function isOn() {
      return this.state;
    };

    return se;
  }();

  var ae = function () {
    function ae() {
      _classCallCheck(this, ae);

      this.eventName = "", this.params = new Map();
    }

    ae.prototype.fromString = function fromString(t) {
      this.original = t;var e = t.split("~");for (var _t32 = 0; _t32 < e.length; _t32++) {
        if (0 === _t32) this.eventName = e[_t32];else {
          var _n11 = e[_t32];if (-1 !== _n11.indexOf("=")) {
            var _t33 = _n11.split("=");this.params.set(_t33[0], _t33[1]);
          }
        }
      }return this;
    };

    ae.prototype.setParam = function setParam(t, e) {
      return this.params.set(t, e), this;
    };

    ae.prototype.getParam = function getParam(t) {
      return this.params.get(t);
    };

    ae.prototype.setEventName = function setEventName(t) {
      return this.eventName = t, me.isProd || c("Building bus message " + t), this;
    };

    ae.prototype.getEventName = function getEventName() {
      return this.eventName;
    };

    ae.prototype.serialize = function serialize() {
      var t = this.eventName + "~";var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = this.params[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _step18$value = _slicedToArray(_step18.value, 2),
              e = _step18$value[0],
              _n12 = _step18$value[1];

          t += e + "=" + _n12 + "~";
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18.return) {
            _iterator18.return();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }

      return t;
    };

    ae.prototype.trimmed = function trimmed() {
      var t = this.eventName.length,
          e = "";for (var _n13, _r8 = 0; _r8 < this.original.length; _r8++) {
        _n13 = this.original.charAt(_r8), _r8 <= t || (e += _n13);
      }return e;
    };

    return ae;
  }();

  var ue = function () {
    function ue() {
      _classCallCheck(this, ue);

      this.whenFinished = function () {
        c("A promised channel got finished before it got used");
      }, this.whenRejected = function () {
        c("A promised channel got finished before it got used");
      }, this.error = null, this.payload = null;
    }

    ue.prototype.onFinish = function onFinish(t) {
      return null == this.payload ? void (this.whenFinished = t) : void t(this.payload);
    };

    ue.prototype.onReject = function onReject(t) {
      return null == this.error ? void (this.whenRejected = t) : void t(this.error);
    };

    ue.prototype.handleData = function handleData(t) {
      this.payload = t, this.whenFinished(t);
    };

    ue.prototype.handleError = function handleError(t) {
      this.error = t, this.whenRejected(t);
    };

    return ue;
  }();

  var ce = function () {
    function ce(t, e, n, r, i) {
      var _this31 = this;

      _classCallCheck(this, ce);

      this.openAudioMc = t, this.server = e, this.micProcessor = i, this.streamKey = n, this.waitingPromises = new Map(), this.trackQueue = new Map(), this.updateNegotiation = !0, this.micStream = r, this.isMuted = !1, document.getElementById("vc-mic-mute").onmousedown = function () {
        return _this31.muteCooldown ? void Swal.fire({ icon: "warning", text: "Please wait a moment before doing this again", backdrop: "", timer: 3e3 }) : void _this31.setMute(!_this31.isMuted);
      }, this.muteCooldown = !1;
    }

    ce.prototype.onStart = function onStart() {
      c("Confluence started"), this.openAudioMc.socketModule.send(ft, { enabled: !0 });
    };

    ce.prototype.dropStream = function dropStream(t) {
      "open" === this.dataChannel.readyState ? this.dataChannel.send(new ae().setEventName("DROP_STREAM").setParam("owner", t).serialize()) : c("Warning! can't drop a stream because the connection is closed");
    };

    ce.prototype.requestStream = function requestStream(t) {
      if ("open" === this.dataChannel.readyState) {
        var e = new ue();return this.waitingPromises.set(t, e), this.dataChannel.send(new ae().setEventName("REQUEST_STREAM").setParam("owner", t).serialize()), e;
      }{
        c("Warning! attempted to request a stream for " + t + " but the eb is closed");var _e12 = new ue();return _e12.handleError("Connection is closed"), _e12;
      }
    };

    ce.prototype.initializeRenegotiation = function initializeRenegotiation() {
      var _this32 = this;

      this.lastNegotiationRequest = performance.now(), this.pcReceiver.createOffer().then(function (t) {
        return _this32.pcReceiver.setLocalDescription(t);
      }).then(function () {
        var t = JSON.stringify({ sdp: btoa(JSON.stringify(_this32.pcReceiver.localDescription)) }),
            e = new ae().setEventName("KICKSTART_RENEG").serialize();e += t, _this32.dataChannel.send(e);
      }).catch(function (t) {
        _this32.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
      });
    };

    ce.prototype.handleRenagEnd = function handleRenagEnd() {
      if (null != this.lastNegotiationRequest) {
        var t = performance.now(),
            e = Math.ceil(t - this.lastNegotiationRequest);c("Renegotiation took " + e + " MS - " + (500 < e ? "Warning! Renegotiation took too long!" : ""));
      }
    };

    ce.prototype.registerDataChannel = function registerDataChannel(t, e) {
      var _this33 = this;

      t.addEventListener("open", function () {
        c("Opened RTC event bus");
      }), t.addEventListener("close", function () {
        c("Closed RTC event bus");
      }), t.addEventListener("message", function (t) {
        var n = t.data;var r = new ae().fromString(n);switch (me.isProd || c("Handling bus " + r.getEventName()), r.getEventName()) {case "REQUEST_NEG_INIT":
            c("Server requested renag start"), _this33.initializeRenegotiation();break;case "NEGOTIATION_RESPONSE":
            var _t34 = r.trimmed(),
                _n14 = JSON.parse(_t34);c("response was " + _t34.length), _this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_n14.sdp)))).then(function () {
              _this33.handleRenagEnd(), _this33.dataChannel.send(new ae().setEventName("CLIENT_CONFIRMED_NEG").serialize());
            });break;case "PROCESS_OFFER":
            _this33.lastNegotiationRequest = performance.now();var _i6 = JSON.parse(r.trimmed());_this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_i6.sdp)))).then(function () {
              _this33.pcReceiver.createAnswer().then(function (t) {
                var e = new ae().setEventName("PROCESS_RESPONSE").serialize();e += btoa(JSON.stringify(t)), _this33.dataChannel.send(e), _this33.pcReceiver.setLocalDescription(t).catch(function (t) {
                  _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                });
              }).catch(function (t) {
                _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
              });
            }).catch(function (t) {
              _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
            });break;case "CONFIRM_NEGOTIATION":
            _this33.handleRenagEnd();break;case "NEGOTIATION_CANCELLED":
            c("Negotiation was ignored, server doesn't think it to be needed.");break;case "OK":
            null != e && e(), c("Received Confluence channel confirmation");break;case "REJECT_REQUEST":
            var _o6 = r.getParam("owner");c("The server rejected a stream request to " + _o6), _this33.waitingPromises.has(_o6) && (_this33.waitingPromises.get(_o6).handleError("Request got denied by the server"), _this33.waitingPromises.delete(_o6));break;case "CONFIRM_REQUEST":
            _this33.trackQueue.set(r.getParam("streamid"), r.getParam("owner"));break;case "CONTEXT_EVENT":
            _this33.contextEvent(r);break;case "IDENTIFY_SELF":
            _this33.dataChannel.send(new ae().setEventName("VERSION").setParam("build", me.build + "").setParam("author", me.compiler).setParam("isProd", me.isProd + "").serialize());break;default:
            c("Warning! received a rtc packet called " + r.getEventName() + " but I don't have a clue what it does.");}
      });
    };

    ce.prototype.contextEvent = function contextEvent(t) {
      var e = t.getParam("type");"client-muted" === e ? this.openAudioMc.voiceModule.peerMap.get(t.getParam("who")).ui.setVisuallyMuted(!0) : "client-unmuted" === e && this.openAudioMc.voiceModule.peerMap.get(t.getParam("who")).ui.setVisuallyMuted(!1);
    };

    ce.prototype.onInternalTrack = function onInternalTrack(t, e, n) {
      var _this34 = this;

      var r = t.id;if (!t.active) return void c("Received an inactive track! cancelling.");if (!this.trackQueue.has(r)) return void c("Received an unknown track called " + r + ". Ignoring it.");var i = this.trackQueue.get(r),
          o = this.waitingPromises.get(i);return null == o ? void (e ? c("Got a stream that doesn't seem to be asked for, skipping it. it was " + r) : (c("Got a stream that doesn't seem to be asked for, trying again in 1s"), setTimeout(function () {
        _this34.onInternalTrack(t, !0, n);
      }, 1e3))) : (o.handleData(t), this.waitingPromises.delete(i), void this.trackQueue.delete(r));
    };

    ce.prototype.setup = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
        var _this35 = this;

        var e, n, r, i, _t35;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = this.server + "webrtc/confluence/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                this.pcReceiver = new RTCPeerConnection();n = !1, r = function r(t) {
                  if ("connected" === _this35.pcReceiver.connectionState || "connected" === t.target.iceConnectionState) {
                    if (n) return;n = !0, _this35.onStart();
                  }
                };
                this.pcReceiver.oniceconnectionstatechange = r, this.pcReceiver.addEventListener("connectionstatechange", r), this.pcReceiver.onnegotiationneeded = function () {
                  c("Finished negotiation round");
                }, this.dataChannel = this.pcReceiver.createDataChannel("eb"), this.registerDataChannel(this.dataChannel, t), this.listenForTracks();i = this.micStream.getTracks();
                for (_t35 = 0; _t35 < i.length; _t35++) {
                  this.pcReceiver.addTrack(this.micStream.getTracks()[_t35]);
                }this.pcReceiver.createOffer().then(function (t) {
                  return _this35.pcReceiver.setLocalDescription(t);
                }).then(function () {
                  fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this35.pcReceiver.localDescription)) }) }).then(function (t) {
                    200 === t.status ? t.json().then(function (t) {
                      _this35.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
                    }) : (Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Connection error", text: "Something went wrong while connecting to the OpenAudioMc voice service. Please try again in a minute or so.", footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' }), t.json().then(function (e) {
                      _this35.openAudioMc.voiceModule.handleCrash("RTC connection error, received status body " + JSON.stringify(e) + " " + t.status);
                    }));
                  }).catch(function (t) {
                    console.error(t), _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                  });
                }).catch(function (t) {
                  _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                }), window.rtcHook = this.pcReceiver;
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup(_x9) {
        return _ref2.apply(this, arguments);
      }

      return setup;
    }();

    ce.prototype.setMute = function setMute(t) {
      var _this36 = this;

      if (this.muteCooldown) Swal.fire("Please wait a moment before doing this again");else {
        this.isMuted = t, this.setVisualMuteState(!t), this.muteCooldown = !0, setTimeout(function () {
          _this36.muteCooldown = !1;
        }, 500);for (var e = 0; e < this.micStream.getAudioTracks().length; e++) {
          this.micStream.getAudioTracks()[e].enabled = !t;
        }t ? (this.openAudioMc.voiceModule.microphoneProcessing.onMute(), this.openAudioMc.voiceModule.pushSocketEvent(fe.MIC_MUTE), this.dataChannel.send(new ae().setEventName("CONTEXT_EVENT").setParam("type", "muted-stream").serialize())) : (this.openAudioMc.voiceModule.microphoneProcessing.onUnmute(), this.openAudioMc.voiceModule.pushSocketEvent(fe.MIC_UNMTE), this.dataChannel.send(new ae().setEventName("CONTEXT_EVENT").setParam("type", "unmuted-stream").serialize()));
      }
    };

    ce.prototype.setVisualMuteState = function setVisualMuteState(t) {
      t ? (document.getElementById("vc-mic-mute").style.backgroundColor = "", document.getElementById("vc-mic-mute").style.color = "") : (document.getElementById("vc-mic-mute").style.backgroundColor = "#EF4444", document.getElementById("vc-mic-mute").style.color = "#F3F4F6");
    };

    ce.prototype.stop = function stop() {
      this.micStream.getTracks().forEach(function (t) {
        t.stop();
      }), this.pcReceiver.close();
    };

    ce.prototype.listenForTracks = function listenForTracks() {
      var _this37 = this;

      this.pcReceiver.addEventListener("track", function (t) {
        for (var e = 0; e < t.streams.length; e++) {
          if ("dead-mans-track" === t.streams[e].id) return;t.track.onended = function () {
            _this37.dataChannel.send(new ae().setEventName("SCHEDULE_RENAG").serialize());
          }, _this37.onInternalTrack(t.streams[e], !1, t.track);
        }
      });
    };

    return ce;
  }();

  var le = n(133),
      he = n.n(le);
  var de = function () {
    function de(t, e, n) {
      var _this38 = this;

      _classCallCheck(this, de);

      this.openAudioMc = t, this.stream = n, this.voiceModule = e, this.id = "visual-speaking-indicator", this.startedTalking = null, this.shortTriggers = 0, this.isStreaming = !1, this.isMuted = !1, this.harkEvents = Object(re.a)(this.stream, {}), this.gainController = new he.a(n), this.gainController.on(), this.loadDefaults(), this.longSessions = 0, setInterval(function () {
        if (_this38.isSpeaking) {
          10 < (new Date().getTime() - _this38.startedTalking) / 1e3 && (_this38.longSessions++, _this38.startedTalking = new Date().getTime()), 1 < _this38.longSessions && (_this38.decreaseSensitivity(), _this38.longSessions = 0, _this38.startedTalking = new Date().getTime());
        }
      }, 500), this.hookListeners();
    }

    de.prototype.updateSensitivity = function updateSensitivity(t) {
      var e = -Q(t);this.harkEvents.setThreshold(e), Cookies.set("mic-sensitivity", e + "", { expires: 30 }), this.currentThreshold = this.harkEvents.getThreshold();
    };

    de.prototype.decreaseSensitivity = function decreaseSensitivity() {
      if (!this.enabledAutoAdjustments) return;var t = Q(this.currentThreshold);t -= 5, this.updateSensitivity(t), document.getElementById("mic-sensitive-slider").value = t;
    };

    de.prototype.onMute = function onMute() {
      this.isMuted = !0, this.isSpeaking && this.shouldStream(!1);
    };

    de.prototype.onUnmute = function onUnmute() {
      this.isMuted = !1, this.isSpeaking && this.shouldStream(!0);
    };

    de.prototype.onSpeakStart = function onSpeakStart() {
      this.isMuted || this.shouldStream(!0);
    };

    de.prototype.onSpeakEnd = function onSpeakEnd() {
      this.isMuted || this.shouldStream(!1);
    };

    de.prototype.stop = function stop() {
      this.harkEvents.stop();
    };

    de.prototype.shouldStream = function shouldStream(t) {
      var _this39 = this;

      t ? (!this.isStreaming && (this.isStreaming = !0, "open" === this.openAudioMc.voiceModule.peerManager.dataChannel.readyState && this.openAudioMc.voiceModule.peerManager.dataChannel.send(new ae().setEventName("DISTRIBUTE_RTP").serialize())), document.getElementById(this.id).style.backgroundColor = "#34D399", document.getElementById(this.id).style.color = "#EC4899", clearTimeout(this.haltRtpTask)) : (this.haltRtpTask = setTimeout(function () {
        "open" === _this39.openAudioMc.voiceModule.peerManager.dataChannel.readyState && (_this39.isStreaming = !1, _this39.openAudioMc.voiceModule.peerManager.dataChannel.send(new ae().setEventName("HALT_RTP").serialize()));
      }, 500), document.getElementById(this.id).style.backgroundColor = "", document.getElementById(this.id).style.color = "");
    };

    de.prototype.loadDefaults = function loadDefaults() {
      var _this40 = this;

      this.enabledAutoAdjustments = "enabled" === Cookies.get("mic-sensitivity-bot"), document.getElementById("enable-auto-adjustments").checked = this.enabledAutoAdjustments, document.getElementById("enable-auto-adjustments").onchange = function (t) {
        t.target.checked ? (_this40.enabledAutoAdjustments = !0, Cookies.set("enable-auto-adjustments", "enabled", { expires: 30 })) : (_this40.enabledAutoAdjustments = !1, Cookies.set("enable-auto-adjustments", "disabled", { expires: 30 }));
      };var t = Cookies.get("mic-sensitivity");null != t && (t = parseInt(t), this.harkEvents.setThreshold(t)), document.getElementById("mic-sensitive-slider").value = Q(this.harkEvents.getThreshold()), this.currentThreshold = this.harkEvents.getThreshold(), this.isSpeaking = !1, this.harkEvents.setInterval(5), document.getElementById("mic-sensitive-slider").oninput = function (t) {
        _this40.updateSensitivity(t.target.value);
      };
    };

    de.prototype.hookListeners = function hookListeners() {
      var _this41 = this;

      this.harkEvents.on("speaking", function () {
        _this41.isSpeaking = !0, _this41.startedTalking = new Date().getTime(), _this41.onSpeakStart();
      }), this.harkEvents.on("stopped_speaking", function () {
        _this41.isSpeaking = !1, _this41.onSpeakEnd(), 1.5 > (new Date().getTime() - _this41.startedTalking) / 1e3 ? (_this41.shortTriggers++, 25 < _this41.shortTriggers && (_this41.decreaseSensitivity(), _this41.shortTriggers = 0)) : _this41.shortTriggers = 0;
      });
    };

    return de;
  }();

  var fe = { MIC_MUTE: "MICROPHONE_MUTED", MIC_UNMTE: "MICROPHONE_UNMUTE" };
  var pe = function () {
    function pe(t) {
      var _this42 = this;

      _classCallCheck(this, pe);

      this.openAudioMc = t, this.peerManager = null, this.peerMap = new Map(), this.loadedDeviceList = !1, this.loadeMicPreference = Cookies.get("preferred-mic"), this.loudnessDetectionEnabled = !1, this.surroundSwitch = new se("use-surround", !0, function (t) {
        _this42.openAudioMc.socketModule.send(ft, { enabled: !1 }), _this42.useSurround = t, _this42.onSurrroundUpdate();
      }), this.useSurround = this.surroundSwitch.isOn();
    }

    pe.prototype.enable = function enable(t, e, n) {
      var _this43 = this;

      this.blocksRadius = n, this.server = t, this.streamKey = e, document.getElementById("vc-controls").style.display = "", i("{{ vc.onboarding.panel }}", window.getMessageString("vc.onboarding", [["%range", this.blocksRadius + " blocks"]])), document.getElementById("vc-connect-button").onclick = function () {
        _this43.consent(_this43.loadeMicPreference);
      }, X("vc-onboarding");
    };

    pe.prototype.addPeer = function addPeer(t, e, n, r) {
      this.peerMap.set(n, new oe(this.openAudioMc, e, t, n, this.server, r));
    };

    pe.prototype.peerLocationUpdate = function peerLocationUpdate(t, e, n, r) {
      this.peerMap.has(t) && this.peerMap.get(t).updateLocation(e, n, r);
    };

    pe.prototype.removeAllPeers = function removeAllPeers() {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.peerMap[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var _step19$value = _slicedToArray(_step19.value, 2),
              t = _step19$value[0],
              e = _step19$value[1];

          this.removePeer(t);
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19.return) {
            _iterator19.return();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }
    };

    pe.prototype.removePeer = function removePeer(t) {
      if (this.peerMap.has(t)) {
        var e = this.peerMap.get(t);this.peerMap.delete(t), e.stop();
      } else c("Couldn't remove peer " + t + " because, well, there is no such peer");
    };

    pe.prototype.onSurrroundUpdate = function onSurrroundUpdate() {
      var _this44 = this;

      this.openAudioMc.socketModule.send(ft, { enabled: !1 }), Swal.fire({ title: window.getMessageString("vc.reloadingPopupTitle"), html: window.getMessageString("vc.reloadingPopup"), timer: 3500, showCloseButton: !1, backdrop: "", showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && _this44.openAudioMc.socketModule.send(ft, { enabled: !0 });
      });
    };

    pe.prototype.handleCrash = function handleCrash(t) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong while starting your voice chat session. Please report this problem and try again later.", backdrop: "" }), C("Something went wrong while enabling voicechat. Error: " + t, window.tokenCache.name);
    };

    pe.prototype.handleAudioPermissions = function handleAudioPermissions(t) {
      var _this45 = this;

      document.getElementById("welcome-back-box").style.display = "none", this.loadedDeviceList || (navigator.mediaDevices.enumerateDevices().then(function (t) {
        var e = [];for (var _n15, _r9 = 0; _r9 < t.length; _r9++) {
          _n15 = t[_r9], "audioinput" === _n15.kind && e.push({ name: _n15.label, id: _n15.deviceId });
        }_this45.loadedDevices(e);
      }).catch(function (t) {
        console.error(t), _this45.handleCrash(JSON.stringify(t.toJSON()));
      }), this.loadedDeviceList = !0), Swal.fire({ backdrop: "", title: window.getMessageString("vc.startingPopupTitle"), html: window.getMessageString("vc.startingPopup"), showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        } }), this.microphoneProcessing = new de(this.openAudioMc, this, t), this.peerManager = new ce(this.openAudioMc, this.server, this.streamKey, t, this.microphoneProcessing), this.peerManager.setup(this.onOutoingStreamStart).catch(function (t) {
        _this45.handleCrash(JSON.stringify(t.toJSON()));
      }), u(function () {
        c("Enabling rtc debugging"), window.debugUi.addPanel(ot.RTC, function () {
          return "waitingPromises=" + _this45.peerManager.waitingPromises.size + ", trackQueue=" + _this45.peerManager.trackQueue.size + ", state=" + _this45.peerManager.pcReceiver.connectionState + ", ice=" + _this45.peerManager.pcReceiver.iceConnectionState + ", isSpeaking=" + _this45.microphoneProcessing.isSpeaking + ", transceivers=" + _this45.peerManager.pcReceiver.getTransceivers().length + ", muxPolicy=" + _this45.peerManager.pcReceiver.getConfiguration().rtcpMuxPolicy;
        });
      });
    };

    pe.prototype.changeInput = function changeInput(t) {
      var _this46 = this;

      c("Stopping current streamer, and restarting with a diferent user input"), Cookies.set("preferred-mic", t, { expires: 30 }), this.peerManager.setMute(!1), this.peerManager.stop(), this.peerManager = null, this.openAudioMc.socketModule.send(ft, { enabled: !1 }), Swal.fire({ backdrop: "", title: window.getMessageString("vc.updatingMicPopupTitle"), html: window.getMessageString("vc.updatingMicPopup"), timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (e) {
        e.dismiss === Swal.DismissReason.timer && _this46.consent(t);
      });
    };

    pe.prototype.loadedDevices = function loadedDevices(t) {
      var _this47 = this;

      var e = document.getElementById("vc-mic-select");for (; 0 < e.options.length;) {
        e.remove(0);
      }for (var _n16 = 0; _n16 < t.length; _n16++) {
        var _r10 = t[_n16],
            _i7 = document.createElement("option");null == this.loadeMicPreference && 0 == _n16 && (_i7.selected = !0), _i7.value = _r10.id, _i7.innerText = _r10.name, _i7.dataset.deviceId = _r10.id, e.add(_i7);
      }null != this.loadeMicPreference && (e.value = this.loadeMicPreference), e.onchange = function (t) {
        var e = t.target.value;_this47.changeInput(e);
      };
    };

    pe.prototype.onOutoingStreamStart = function onOutoingStreamStart() {
      X("voice-home"), Swal.close();
    };

    pe.prototype.consent = function consent(t) {
      var e = t ? { audio: { deviceId: { exact: t }, noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } } : { audio: { noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } },
          n = new Zt();n.successCallback = function (t) {
        this.openAudioMc.voiceModule.handleAudioPermissions(t);
      }.bind(this), n.errorCallback = function (e) {
        return null == t ? (console.error(e), "OverconstrainedError" === e.name || e instanceof OverconstrainedError ? (c("Couldn't get microphone, ignoring and trying again"), void this.consent(null)) : void this.openAudioMc.voiceModule.permissionError(e)) : (Cookies.remove("preferred-mic"), void this.consent(null));
      }.bind(this), n.getUserMedia(e);
    };

    pe.prototype.permissionError = function permissionError() {
      X("vc-onboarding"), Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: window.getMessageString("vc.micErrorPopupTitle"), text: window.getMessageString("vc.micErrorPopup"), footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' });
    };

    pe.prototype.shutDown = function shutDown() {
      document.getElementById("vc-controls").style.display = "none", null != this.peerManager && this.peerManager.stop(), null != this.microphoneProcessing && this.microphoneProcessing.stop();var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = this.peerMap[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var _step20$value = _slicedToArray(_step20.value, 2),
              t = _step20$value[0],
              e = _step20$value[1];

          e.stop();
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20.return) {
            _iterator20.return();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }
    };

    pe.prototype.pushSocketEvent = function pushSocketEvent(t) {
      null != this.peerManager && this.openAudioMc.socketModule.send(ft, { event: t });
    };

    pe.prototype.blurWithReason = function blurWithReason() {
      document.getElementById("vc-content").classList.add("filter"), document.getElementById("vc-content").classList.add("blur-md"), document.getElementById("vc-disabled-overlay").style.display = "", i("{{ oam.vc.disabled }}", window.getMessageString("vc.disabled"), [["%server", this.openAudioMc.serverName]]);
    };

    pe.prototype.unblur = function unblur() {
      document.getElementById("vc-content").classList.remove("filter"), document.getElementById("vc-content").classList.remove("blur-md"), document.getElementById("vc-disabled-overlay").style.display = "none";
    };

    return pe;
  }();

  var ge = function () {
    function ge() {
      _classCallCheck(this, ge);

      this.messages = {}, this.seeded = !1, this.seededValues = [], this.currentLangFile = "", this.forcedValues = {}, this.languageMappings = { gb: "en.lang", us: "en.lang", nl: "nl.lang", be: "nl.lang", fr: "fr.lang", ru: "ru.lang", ua: "ru.lang", kz: "ru.lang", md: "ru.lang", hk: "chi.lang", cn: "chi.lang", ro: "ro.lang" }, window.getMessageString = this.getString, window.debugHooks.loadLanguage = this.load;
    }

    ge.prototype.setKey = function setKey(t, e) {
      this.forcedValues[t] = e;
    };

    ge.prototype.handleCountry = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
        var e;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                t = t.toLowerCase();e = this.languageMappings[t];
                _context3.t0 = null != e;

                if (!_context3.t0) {
                  _context3.next = 7;
                  break;
                }

                c("Switching to " + t + " > " + e);
                _context3.next = 7;
                return this.load(e);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleCountry(_x10) {
        return _ref3.apply(this, arguments);
      }

      return handleCountry;
    }();

    ge.prototype.updateBanner = function updateBanner() {
      var _this48 = this;

      if (Cookies.get("preferred-lang") === this.currentLangFile) return void (document.getElementById("lang-change-banner").style.display = "none");var t = [["%langName", getMessageString("lang.name")]];i("{{ ui.lang.detectedAs }}", getMessageString("lang.detectedAs", t)), i("{{ ui.lang.toEn }}", getMessageString("lang.toEn", t)), i("{{ ui.lang.keep }}", getMessageString("lang.keep", t)), document.getElementById("lang-back-to-en").onclick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this48.load("en.lang");

              case 2:
                document.getElementById("lang-change-banner").style.display = "none";

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this48);
      })), document.getElementById("lang-keep").onclick = function () {
        Cookies.set("preferred-lang", _this48.currentLangFile, { expires: 30 }), document.getElementById("lang-change-banner").style.display = "none";
      }, document.getElementById("lang-change-banner").style.display = "";
    };

    ge.prototype.getString = function getString(t) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var n = window.openAudioMc.messageModule.messages[t];if (null == n) return c("Couldn't find message key " + t), "?? " + t + " ??";var r = window.openAudioMc.messageModule.forcedValues[t];null != r && (n = r);for (var _t36 = 0; _t36 < e.length; _t36++) {
        n = n.replace(e[_t36][0], e[_t36][1]);
      }return n;
    };

    ge.prototype.renderKeyToDom = function renderKeyToDom(t, e) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var r = this.getString(e, n),
          o = window.openAudioMc.messageModule.forcedValues[t];null != o && (r = o), i(t, r, !0);
    };

    ge.prototype.seedStatic = function seedStatic(t) {
      var e = function (t) {
        function e() {
          var t = [];return function e(n) {
            if (n.childNodes.length) for (var r = 0; r < n.childNodes.length; r++) {
              e(n.childNodes[r]);
            } else n.nodeType === Node.TEXT_NODE && t.push(n);
          }(document), t;
        }var n = [];for (var _r11, _i8 = 0; _i8 < e().length; _i8++) {
          _r11 = e()[_i8], -1 !== _r11.nodeValue.indexOf(t) && n.push(_r11.nodeValue);
        }return n;
      }("{%"),
          n = {};for (var _t37 = 0; _t37 < e.length; _t37++) {
        var r = e[_t37];var _i9 = "",
            _o7 = !1;var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
          for (var _iterator21 = r[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
            var _t38 = _step21.value;
            _o7 ? _i9 += _t38 : " " !== _t38 && "\n" !== _t38 && (_o7 = !0, _i9 += _t38);
          }
        } catch (err) {
          _didIteratorError21 = true;
          _iteratorError21 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion21 && _iterator21.return) {
              _iterator21.return();
            }
          } finally {
            if (_didIteratorError21) {
              throw _iteratorError21;
            }
          }
        }

        n[r = _i9] = r.split(" ")[1];
      }for (var _e13 in n) {
        this.seededValues.push({ key: _e13, value: n[_e13], placeholders: t }), this.renderKeyToDom(_e13, n[_e13], t);
      }this.seeded = !0;
    };

    ge.prototype.fetcWithFialover = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var n, r;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                n = e ? Et.CONTENT_PROXY + "https://client.openaudiomc.net/" : window.location.pathname + window.location.search;
                _context5.next = 3;
                return fetch(n + t);

              case 3:
                r = _context5.sent;

                if (!(200 === r.status || e)) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 7;
                return r.text();

              case 7:
                _context5.t0 = _context5.sent.split("\n");
                _context5.next = 14;
                break;

              case 10:
                c("Using fetch fail over for lang");
                _context5.next = 13;
                return window.openAudioMc.messageModule.fetcWithFialover(t, !0);

              case 13:
                _context5.t0 = _context5.sent;

              case 14:
                return _context5.abrupt("return", _context5.t0);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetcWithFialover(_x14) {
        return _ref5.apply(this, arguments);
      }

      return fetcWithFialover;
    }();

    ge.prototype.load = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(t) {
        var e, _t39, _n17, _r12, _i10, _o8, _e14, _n18, _t40, _e15;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.currentLangFile === t)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                e = [];
                _context6.next = 5;
                return window.openAudioMc.messageModule.fetcWithFialover(t);

              case 5:
                e = _context6.sent;
                _n17 = 0;

              case 7:
                if (!(_n17 < e.length)) {
                  _context6.next = 16;
                  break;
                }

                if (!(_t39 = e[_n17], _t39.startsWith("#") || 5 > _t39.length)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("continue", 13);

              case 10:
                _r12 = !1, _i10 = "", _o8 = "";
                for (_n18 = 0; _n18 < _t39.length; _n18++) {
                  _e14 = _t39[_n18], _r12 ? _o8 += _e14 : "=" === _e14 ? _r12 = !0 : _i10 += _e14;
                }"" !== _o8 && (window.openAudioMc.messageModule.messages[_i10] = _o8);

              case 13:
                _n17++;
                _context6.next = 7;
                break;

              case 16:
                if (this.currentLangFile = t, window.openAudioMc.messageModule.seeded) {
                  for (_e15 = 0; _e15 < window.openAudioMc.messageModule.seededValues.length; _e15++) {
                    _t40 = window.openAudioMc.messageModule.seededValues[_e15], window.openAudioMc.messageModule.renderKeyToDom(_t40.key, _t40.value, _t40.placeholders);
                  }window.openAudioMc.messageModule.updateBanner();
                }
              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function load(_x15) {
        return _ref6.apply(this, arguments);
      }

      return load;
    }();

    return ge;
  }();

  n.d(e, "OpenAudioEnv", function () {
    return me;
  }), n.d(e, "OpenAudioMc", function () {
    return ve;
  });var me = { build: "578", compiler: "Mindgamesnl", platform: "Production", environment: "Linux", isProd: JSON.parse("true"), envDescription: "default-prod" };window.debugHooks = {}, u(function () {
    window.debugUi.addPanel(ot.UI, function () {
      return "componentElementCache=" + Object.keys(rt).length + ", propertyCache=" + Object.keys(it).length;
    });
  });
  var ve = function (_ref7) {
    _inherits(ve, _ref7);

    function ve() {
      var _this50 = this;

      var _this49, _ret2;

      _classCallCheck(this, ve);

      if ((_this49 = _possibleConstructorReturn(this, _ref7.call(this)), _this49), c("Starting build " + JSON.stringify(me)), _this49.messageModule = new ge(), _this49.canStart = !1, _this49.host = null, _this49.background = null, _this49.ambianceSound = "", _this49.isPatreon = !1, _this49.tokenSet = new Mt().fromCache(), null == _this49.tokenSet) return _ret2 = void l(dt.BAD_AUTH), _possibleConstructorReturn(_this49, _ret2);_this49.notificationModule = new Vt(_this49), _this49.timeService = new lt(), _this49.userInterfaceModule = new ht(_this49), _this49.hueConfiguration = new Lt(_this49), _this49.mediaManager = new Pt(_this49), _this49.voiceModule = new pe(_this49), J("preparing session, welcome " + _this49.tokenSet.name);new Ut(Et.MAIN_BACKEND).route(_this49).then(function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t) {
          var e;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  J("Loading language, welcome " + _this49.tokenSet.name);
                  _context7.next = 3;
                  return _this49.messageModule.load("en.lang");

                case 3:
                  _this49.messageModule.seedStatic([["%player", _this49.tokenSet.name], ["%server", t.serverName]]);

                  _context7.t0 = t.useTranslations;

                  if (!_context7.t0) {
                    _context7.next = 9;
                    break;
                  }

                  c("Enabling automatic translations");
                  _context7.next = 9;
                  return _this49.messageModule.handleCountry(t.countryCode);

                case 9:
                  _this49.serverName = t.serverName;
                  _this49.canStart = !0;
                  _this49.host = t.host;
                  _this49.background = t.background;
                  _this49.ambianceSound = t.ambianceSound;
                  _this49.isPatreon = t.isPatreon;
                  l(dt.WELCOME);
                  c("Server: " + t.serverName);
                  u(function () {
                    window.debugUi.addPanel(ot.ACCOUNT, "cached=" + t.fromCache + ", pc=" + t.playerCount + ", claimed=" + t.claimed + ", sfu=" + t.host + ", rtc=" + t.rtc);
                  });
                  e = Cookies.get("volume");
                  null == e ? _this49.mediaManager.changeVolume(25) : _this49.mediaManager.changeVolume(e), _this49.isPatreon && c("This server is supporting the project on Patreon! that's awesome!"), i("{{ craftmend.account.serverName }}", t.serverName), setTimeout(function () {
                    r("{{ oam.loader_style }}", "display: none;", "style");
                  }, 250);
                case 20:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, _this50);
        }));

        return function (_x16) {
          return _ref8.apply(this, arguments);
        };
      }()).catch(function (t) {
        console.error(t), console.error("Exception thrown", t.stack), _this49.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this49);
    }

    ve.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new Qt(this), this.hueModule = new gt(this, Object(zt.a)()), this.socketModule = new It(this, this.host), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new Ft(this), "" !== this.background && (r("{{ oam.side_image }}", this.background), r("{{ oam.bg_image_map }}", "--bg-map:url('" + this.background + "');")), this.mediaManager.postBoot());
    };

    ve.prototype.sendError = function sendError(t) {
      C(t, this.tokenSet.name);
    };

    return ve;
  }(function (_ref9) {
    _inherits(_class2, _ref9);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ref9.apply(this, arguments));
    }

    _class2.prototype.log = function log(t) {
      c(t);
    };

    _class2.prototype.getMessages = function getMessages() {
      return this.messages;
    };

    _class2.prototype.getTimeService = function getTimeService() {
      return this.timeService;
    };

    _class2.prototype.getHueConfiguration = function getHueConfiguration() {
      return this.hueConfiguration;
    };

    _class2.prototype.debugPrint = function debugPrint(t) {
      this.log(t);
    };

    _class2.prototype.getMediaManager = function getMediaManager() {
      return this.mediaManager;
    };

    _class2.prototype.getHueModule = function getHueModule() {
      return this.hueModule;
    };

    _class2.prototype.getUserInterfaceModule = function getUserInterfaceModule() {
      return this.userInterfaceModule;
    };

    return _class2;
  }(function () {
    function _class3() {
      _classCallCheck(this, _class3);

      console.log("%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", "background: linear-gradient(#D33106, #571402);border: 1px solid #3E0E02;color: white;display: block;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;line-height: 40px;text-align: center;font-weight: bold"), this.log("Enabling the web client for " + window.navigator.userAgent);
    }

    return _class3;
  }()));

  J("loading the client..."), window.onload = function () {
    J("loading assets..."), me.isProd || a(), u(function () {
      window.debugUi.addPanel(ot.LOG, function () {
        return ct.join("\n");
      });
    });if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");r("{{ oam.side_image }}", "assets/bg.jpg", "src"), r("{{ oam.logo_image }}", "assets/logo.png", "src"), r("{{ oam.bg_image_map }}", "--bg-map:url('../assets/bg.jpg');", "style"), i("{{ oam.hue_bridge_name }}", "No bridge"), J("logging in..."), new Mt().initialize().then(function (t) {
      return null == t ? (l(dt.BAD_AUTH), window.location = location.protocol + "//" + window.location.host + window.location.pathname + "/login.html", void C("A faulty login attempt was done at " + window.location.host, "Steve")) : (u(function () {
        window.debugUi.addPanel(ot.SESSION, t.name + "@" + t.publicServerKey + "/" + t.scope);
      }), null != t && null != t.name && (i("{{ oam.player_name }}", t.name), Ht = new ve(), window.openAudioMc = Ht), void document.body.addEventListener("click", q));
    });
  }, window.onhashchange = function () {
    return window.location.reload();
  }, "toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
}]);
