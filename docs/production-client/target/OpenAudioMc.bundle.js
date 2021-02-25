"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

!function (t) {
  function e(r) {
    if (n[r]) return n[r].exports;var o = n[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
  }var n = {};e.m = t, e.c = n, e.d = function (t, n, r) {
    e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
  }, e.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, e.t = function (t, n) {
    if (1 & n && (t = e(t)), 8 & n) return t;if (4 & n && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var r = Object.create(null);if (e.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & n && "string" != typeof t) for (var o in t) {
      e.d(r, o, function (e) {
        return t[e];
      }.bind(null, o));
    }return r;
  }, e.n = function (t) {
    var n = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return e.d(n, "a", n), n;
  }, e.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, e.p = "", e(e.s = 309);
}([function (t, e, n) {
  var r = n(1),
      o = n(7),
      i = n(14),
      s = n(11),
      a = n(17),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        h,
        f,
        d,
        p = t & c.F,
        g = t & c.G,
        m = t & c.S,
        v = t & c.P,
        y = t & c.B,
        b = g ? r : m ? r[e] || (r[e] = {}) : (r[e] || {})[u],
        w = g ? o : o[e] || (o[e] = {}),
        S = w[u] || (w[u] = {});for (l in g && (n = e), n) {
      f = ((h = !p && b && void 0 !== b[l]) ? b : n)[l], d = y && h ? a(f, r) : v && "function" == typeof f ? a(Function.call, f) : f, b && s(b, l, f, t & c.U), w[l] != f && i(w, l, d), v && S[l] != f && (S[l] = f);
    }
  };r.core = o, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
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
      o = n(29),
      i = n(1).Symbol,
      s = "function" == typeof i;(t.exports = function (t) {
    return r[t] || (r[t] = s && i[t] || (s ? i : o)("Symbol." + t));
  }).store = r;
}, function (t, e, n) {
  var r = n(19),
      o = Math.min;t.exports = function (t) {
    return 0 < t ? o(r(t), 9007199254740991) : 0;
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
      o = n(88),
      i = n(26),
      s = Object.defineProperty;e.f = n(8) ? Object.defineProperty : function (t, e, n) {
    if (r(t), e = i(e, !0), r(n), o) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var r = n(24);t.exports = function (t) {
    return Object(r(t));
  };
}, function (t, e, n) {
  var r = n(1),
      o = n(14),
      i = n(13),
      s = n(29)("src"),
      a = n(126),
      u = "toString",
      c = ("" + a).split(u);n(7).inspectSource = function (t) {
    return a.call(t);
  }, (t.exports = function (t, e, n, a) {
    var u = "function" == typeof n;u && (i(n, "name") || o(n, "name", e)), t[e] === n || (u && (i(n, s) || o(n, s, t[e] ? "" + t[e] : c.join(e + ""))), t === r ? t[e] = n : a ? t[e] ? t[e] = n : o(t, e, n) : (delete t[e], o(t, e, n)));
  })(Function.prototype, u, function () {
    return "function" == typeof this && this[s] || a.call(this);
  });
}, function (t, e, n) {
  var r = n(0),
      o = n(2),
      i = n(24),
      s = /"/g,
      a = function a(t, e, n, r) {
    var o = i(t) + "",
        a = "<" + e;return "" !== n && (a += " " + n + '="' + (r + "").replace(s, "&quot;") + '"'), a + ">" + o + "</" + e + ">";
  };t.exports = function (t, e) {
    var n = {};n[t] = e(a), r(r.P + r.F * o(function () {
      var e = ""[t]('"');return e !== e.toLowerCase() || 3 < e.split('"').length;
    }), "String", n);
  };
}, function (t) {
  var e = {}.hasOwnProperty;t.exports = function (t, n) {
    return e.call(t, n);
  };
}, function (t, e, n) {
  var r = n(9),
      o = n(28);t.exports = n(8) ? function (t, e, n) {
    return r.f(t, e, o(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(44),
      o = n(24);t.exports = function (t) {
    return r(o(t));
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
    } : 3 === n ? function (n, r, o) {
      return t.call(e, n, r, o);
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
      o = n(28),
      i = n(15),
      s = n(26),
      a = n(13),
      u = n(88),
      c = Object.getOwnPropertyDescriptor;e.f = n(8) ? c : function (t, e) {
    if (t = i(t), e = s(e, !0), u) try {
      return c(t, e);
    } catch (e) {}return a(t, e) ? o(!r.f.call(t, e), t[e]) : void 0;
  };
}, function (t, e, n) {
  var r = n(0),
      o = n(7),
      i = n(2);t.exports = function (t, e) {
    var n = (o.Object || {})[t] || Object[t],
        s = {};s[t] = e(n), r(r.S + r.F * i(function () {
      n(1);
    }), "Object", s);
  };
}, function (t, e, n) {
  var r = n(17),
      o = n(44),
      i = n(10),
      s = n(6),
      a = n(104);t.exports = function (t, e) {
    var n = 1 == t,
        u = 4 == t,
        c = 6 == t,
        l = e || a;return function (e, a, h) {
      for (var f, d, p = i(e), g = o(p), m = r(a, h, 3), v = s(g.length), y = 0, b = n ? l(e, v) : 2 == t ? l(e, 0) : void 0; v > y; y++) {
        if ((5 == t || c || y in g) && (d = m(f = g[y], y, p), t)) if (n) b[y] = d;else if (d) switch (t) {case 3:
            return !0;case 5:
            return f;case 6:
            return y;case 2:
            b.push(f);} else if (u) return !1;
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
        o = n(1),
        i = n(2),
        s = n(0),
        a = n(59),
        u = n(84),
        c = n(17),
        l = n(42),
        h = n(28),
        f = n(14),
        d = n(43),
        p = n(19),
        g = n(6),
        m = n(115),
        v = n(32),
        y = n(26),
        b = n(13),
        w = n(46),
        S = n(4),
        x = n(10),
        E = n(76),
        M = n(33),
        k = n(35),
        O = n(34).f,
        A = n(78),
        C = n(29),
        I = n(5),
        P = n(22),
        T = n(49),
        _ = n(47),
        R = n(80),
        N = n(40),
        F = n(52),
        L = n(41),
        B = n(79),
        D = n(106),
        j = n(9),
        U = n(20),
        V = j.f,
        H = U.f,
        z = o.RangeError,
        G = o.TypeError,
        K = o.Uint8Array,
        W = "ArrayBuffer",
        q = "Shared" + W,
        Y = "BYTES_PER_ELEMENT",
        J = "prototype",
        X = Array[J],
        $ = u.ArrayBuffer,
        Q = u.DataView,
        Z = P(0),
        tt = P(2),
        et = P(3),
        nt = P(4),
        rt = P(5),
        ot = P(6),
        it = T(!0),
        st = T(!1),
        at = R.values,
        ut = R.keys,
        ct = R.entries,
        lt = X.lastIndexOf,
        ht = X.reduce,
        ft = X.reduceRight,
        dt = X.join,
        pt = X.sort,
        gt = X.slice,
        mt = X.toString,
        vt = X.toLocaleString,
        yt = I("iterator"),
        bt = I("toStringTag"),
        wt = C("typed_constructor"),
        St = C("def_constructor"),
        xt = a.CONSTR,
        Et = a.TYPED,
        Mt = a.VIEW,
        kt = "Wrong length!",
        Ot = P(1, function (t, e) {
      return Tt(_(t, t[St]), e);
    }),
        At = i(function () {
      return 1 === new K(new Uint16Array([1]).buffer)[0];
    }),
        Ct = !!K && !!K[J].set && i(function () {
      new K(1).set({});
    }),
        It = function It(t, e) {
      var n = p(t);if (0 > n || n % e) throw z("Wrong offset!");return n;
    },
        Pt = function Pt(t) {
      if (S(t) && Et in t) return t;throw G(t + " is not a typed array!");
    },
        Tt = function Tt(t, e) {
      if (!S(t) || !(wt in t)) throw G("It is not a typed array constructor!");return new t(e);
    },
        _t = function _t(t, e) {
      return Rt(_(t, t[St]), e);
    },
        Rt = function Rt(t, e) {
      for (var n = 0, r = e.length, o = Tt(t, r); r > n;) {
        o[n] = e[n++];
      }return o;
    },
        Nt = function Nt(t, e, n) {
      V(t, e, { get: function get() {
          return this._d[n];
        } });
    },
        Ft = function Ft(t) {
      var e,
          n,
          r,
          o,
          i,
          s,
          a = x(t),
          u = arguments.length,
          l = 1 < u ? arguments[1] : void 0,
          h = void 0 !== l,
          f = A(a);if (null != f && !E(f)) {
        for (s = f.call(a), r = [], e = 0; !(i = s.next()).done; e++) {
          r.push(i.value);
        }a = r;
      }for (h && 2 < u && (l = c(l, arguments[2], 2)), e = 0, n = g(a.length), o = Tt(this, n); n > e; e++) {
        o[e] = h ? l(a[e], e) : a[e];
      }return o;
    },
        Lt = function Lt() {
      for (var t = 0, e = arguments.length, n = Tt(this, e); e > t;) {
        n[t] = arguments[t++];
      }return n;
    },
        Bt = !!K && i(function () {
      vt.call(new K(1));
    }),
        Dt = function Dt() {
      return vt.apply(Bt ? gt.call(Pt(this)) : Pt(this), arguments);
    },
        jt = { copyWithin: function copyWithin(t, e) {
        return D.call(Pt(this), t, e, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(t) {
        return nt(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return B.apply(Pt(this), arguments);
      }, filter: function filter(t) {
        return _t(this, tt(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0));
      }, find: function find(t) {
        return rt(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, findIndex: function findIndex(t) {
        return ot(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, forEach: function forEach(t) {
        Z(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, indexOf: function indexOf(t) {
        return st(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, includes: function includes(t) {
        return it(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, join: function join() {
        return dt.apply(Pt(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return lt.apply(Pt(this), arguments);
      }, map: function map(t) {
        return Ot(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return ht.apply(Pt(this), arguments);
      }, reduceRight: function reduceRight() {
        return ft.apply(Pt(this), arguments);
      }, reverse: function reverse() {
        for (var t, e = this, n = Pt(e).length, r = Math.floor(n / 2), o = 0; o < r;) {
          t = e[o], e[o++] = e[--n], e[n] = t;
        }return e;
      }, some: function some(t) {
        return et(Pt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, sort: function sort(t) {
        return pt.call(Pt(this), t);
      }, subarray: function subarray(t, e) {
        var n = Pt(this),
            r = n.length,
            o = v(t, r);return new (_(n, n[St]))(n.buffer, n.byteOffset + o * n.BYTES_PER_ELEMENT, g((void 0 === e ? r : v(e, r)) - o));
      } },
        Ut = function Ut(t, e) {
      return _t(this, gt.call(Pt(this), t, e));
    },
        Vt = function Vt(t) {
      Pt(this);var e = It(arguments[1], 1),
          n = this.length,
          r = x(t),
          o = g(r.length),
          i = 0;if (o + e > n) throw z(kt);for (; i < o;) {
        this[e + i] = r[i++];
      }
    },
        Ht = { entries: function entries() {
        return ct.call(Pt(this));
      }, keys: function keys() {
        return ut.call(Pt(this));
      }, values: function values() {
        return at.call(Pt(this));
      } },
        zt = function zt(t, e) {
      return S(t) && t[Et] && "symbol" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && e in t && +e + "" == e + "";
    },
        Gt = function Gt(t, e) {
      return zt(t, e = y(e, !0)) ? h(2, t[e]) : H(t, e);
    },
        Kt = function Kt(t, e, n) {
      return !(zt(t, e = y(e, !0)) && S(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(t, e, n) : (t[e] = n.value, t);
    };xt || (U.f = Gt, j.f = Kt), s(s.S + s.F * !xt, "Object", { getOwnPropertyDescriptor: Gt, defineProperty: Kt }), i(function () {
      mt.call({});
    }) && (mt = vt = function vt() {
      return dt.call(this);
    });var Wt = d({}, jt);d(Wt, Ht), f(Wt, yt, Ht.values), d(Wt, { slice: Ut, set: Vt, constructor: function constructor() {}, toString: mt, toLocaleString: Dt }), Nt(Wt, "buffer", "b"), Nt(Wt, "byteOffset", "o"), Nt(Wt, "byteLength", "l"), Nt(Wt, "length", "e"), V(Wt, bt, { get: function get() {
        return this[Et];
      } }), t.exports = function (t, e, n, u) {
      var c = t + ((u = !!u) ? "Clamped" : "") + "Array",
          h = o[c],
          d = h || {},
          p = h && k(h),
          v = !h || !a.ABV,
          y = {},
          b = h && h[J],
          x = function x(n, r) {
        var o = n._d;return o.v["get" + t](r * e + o.o, At);
      },
          E = function E(n, r, o) {
        var i = n._d;u && (o = 0 > (o = Math.round(o)) ? 0 : 255 < o ? 255 : 255 & o), i.v["set" + t](r * e + i.o, o, At);
      },
          A = function A(t, e) {
        V(t, e, { get: function get() {
            return x(this, e);
          }, set: function set(t) {
            return E(this, e, t);
          }, enumerable: !0 });
      };v ? (h = n(function (t, n, r, o) {
        l(t, h, c, "_d");var i,
            s,
            a,
            u,
            d = 0,
            p = 0;if (S(n)) {
          if (!(n instanceof $ || (u = w(n)) == W || u == q)) return Et in n ? Rt(h, n) : Ft.call(h, n);i = n, p = It(r, e);var v = n.byteLength;if (void 0 === o) {
            if (v % e) throw z(kt);if (0 > (s = v - p)) throw z(kt);
          } else if ((s = g(o) * e) + p > v) throw z(kt);a = s / e;
        } else a = m(n), i = new $(s = a * e);for (f(t, "_d", { b: i, o: p, l: s, e: a, v: new Q(i) }); d < a;) {
          A(t, d++);
        }
      }), b = h[J] = M(Wt), f(b, "constructor", h)) : (!i(function () {
        h(1);
      }) || !i(function () {
        new h(-1);
      }) || !F(function (t) {
        new h(), new h(null), new h(1.5), new h(t);
      }, !0)) && (h = n(function (t, n, r, o) {
        var i;return l(t, h, c), S(n) ? n instanceof $ || (i = w(n)) == W || i == q ? void 0 === o ? void 0 === r ? new d(n) : new d(n, It(r, e)) : new d(n, It(r, e), o) : Et in n ? Rt(h, n) : Ft.call(h, n) : new d(m(n));
      }), Z(p === Function.prototype ? O(d) : O(d).concat(O(p)), function (t) {
        t in h || f(h, t, d[t]);
      }), h[J] = b, !r && (b.constructor = h));var C = b[yt],
          I = !!C && ("values" == C.name || null == C.name),
          P = Ht.values;f(h, wt, !0), f(b, Et, c), f(b, Mt, !0), f(b, St, h), (u ? new h(1)[bt] != c : !(bt in b)) && V(b, bt, { get: function get() {
          return c;
        } }), y[c] = h, s(s.G + s.W + s.F * (h != d), y), s(s.S, c, { BYTES_PER_ELEMENT: e }), s(s.S + s.F * i(function () {
        d.of.call(h, 1);
      }), c, { from: Ft, of: Lt }), Y in b || f(b, Y, e), s(s.P, c, jt), L(c), s(s.P + s.F * Ct, c, { set: Vt }), s(s.P + s.F * !I, c, Ht), r || b.toString == mt || (b.toString = mt), s(s.P + s.F * i(function () {
        new h(1).slice();
      }), c, { slice: Ut }), s(s.P + s.F * (i(function () {
        return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
      }) || !i(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: Dt }), N[c] = I ? C : P, r || I || f(b, yt, P);
    };
  } else t.exports = function () {};
}, function (t, e, n) {
  var r = n(4);t.exports = function (t, e) {
    if (!r(t)) return t;var n, o;if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;throw TypeError("Can't convert object to primitive value");
  };
}, function (t, e, n) {
  var r = n(29)("meta"),
      o = n(4),
      i = n(13),
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
      if (!o(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!i(t, r)) {
        if (!u(t)) return "F";if (!e) return "E";l(t);
      }return t[r].i;
    }, getWeak: function getWeak(t, e) {
      if (!i(t, r)) {
        if (!u(t)) return !0;if (!e) return !1;l(t);
      }return t[r].w;
    }, onFreeze: function onFreeze(t) {
      return c && h.NEED && u(t) && !i(t, r) && l(t), t;
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
  var r = n(90),
      o = n(63);t.exports = Object.keys || function (t) {
    return r(t, o);
  };
}, function (t, e, n) {
  var r = n(19),
      o = Math.max,
      i = Math.min;t.exports = function (t, e) {
    return 0 > (t = r(t)) ? o(t + e, 0) : i(t, e);
  };
}, function (t, e, n) {
  var r = n(3),
      o = n(91),
      i = n(63),
      s = n(62)("IE_PROTO"),
      a = function a() {},
      u = "prototype",
      _c = function c() {
    var t,
        e = n(60)("iframe"),
        r = i.length;for (e.style.display = "none", n(64).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _c = t.F; r--;) {
      delete _c[u][i[r]];
    }return _c();
  };t.exports = Object.create || function (t, e) {
    var n;return null === t ? n = _c() : (a[u] = r(t), n = new a(), a[u] = null, n[s] = t), void 0 === e ? n : o(n, e);
  };
}, function (t, e, n) {
  var r = n(90),
      o = n(63).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {
    return r(t, o);
  };
}, function (t, e, n) {
  var r = n(13),
      o = n(10),
      i = n(62)("IE_PROTO"),
      s = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
    return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null;
  };
}, function (t, e, n) {
  var r = n(5)("unscopables"),
      o = Array.prototype;null == o[r] && n(14)(o, r, {}), t.exports = function (t) {
    o[r][t] = !0;
  };
}, function (t, e, n) {
  var r = n(4);t.exports = function (t, e) {
    if (!r(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");return t;
  };
}, function (t, e, n) {
  var r = n(9).f,
      o = n(13),
      i = n(5)("toStringTag");t.exports = function (t, e, n) {
    t && !o(t = n ? t : t.prototype, i) && r(t, i, { configurable: !0, value: e });
  };
}, function (t, e, n) {
  var r = n(0),
      o = n(24),
      i = n(2),
      s = n(66),
      a = "[" + s + "]",
      u = RegExp("^" + a + a + "*"),
      c = RegExp(a + a + "*$"),
      l = function l(t, e, n) {
    var o = {},
        a = i(function () {
      return !!s[t]() || "​" != "​"[t]();
    }),
        u = o[t] = a ? e(h) : s[t];n && (o[n] = u), r(r.P + r.F * a, "String", o);
  },
      h = l.trim = function (t, e) {
    return t = o(t) + "", 1 & e && (t = t.replace(u, "")), 2 & e && (t = t.replace(c, "")), t;
  };t.exports = l;
}, function (t) {
  t.exports = {};
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      o = n(9),
      i = n(8),
      s = n(5)("species");t.exports = function (t) {
    var e = r[t];i && e && !e[s] && o.f(e, s, { configurable: !0, get: function get() {
        return this;
      } });
  };
}, function (t) {
  t.exports = function (t, e, n, r) {
    if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");return t;
  };
}, function (t, e, n) {
  var r = n(11);t.exports = function (t, e, n) {
    for (var o in e) {
      r(t, o, e[o], n);
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
      o = n(5)("toStringTag"),
      i = "Arguments" == r(function () {
    return arguments;
  }());t.exports = function (t) {
    var e, n, s;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
      try {
        return t[e];
      } catch (e) {}
    }(e = Object(t), o)) ? n : i ? r(e) : "Object" == (s = r(e)) && "function" == typeof e.callee ? "Arguments" : s;
  };
}, function (t, e, n) {
  var r = n(3),
      o = n(18),
      i = n(5)("species");t.exports = function (t, e) {
    var n,
        s = r(t).constructor;return void 0 === s || null == (n = r(s)[i]) ? e : o(n);
  };
}, function (t, e, n) {
  var r = n(7),
      o = n(1),
      i = "__core-js_shared__",
      s = o[i] || (o[i] = {});(t.exports = function (t, e) {
    return s[t] || (s[t] = void 0 === e ? {} : e);
  })("versions", []).push({ version: r.version, mode: n(30) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
}, function (t, e, n) {
  var r = n(15),
      o = n(6),
      i = n(32);t.exports = function (t) {
    return function (e, n, s) {
      var a,
          u = r(e),
          c = o(u.length),
          l = i(s, c);if (t && n != n) {
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
      o = !1;try {
    var i = [7][r]();i.return = function () {
      o = !0;
    }, Array.from(i, function () {
      throw 2;
    });
  } catch (e) {}t.exports = function (t, e) {
    if (!e && !o) return !1;var n = !1;try {
      var i = [7],
          s = i[r]();s.next = function () {
        return { done: n = !0 };
      }, i[r] = function () {
        return s;
      }, t(i);
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
      o = RegExp.prototype.exec;t.exports = function (t, e) {
    var n = t.exec;if ("function" == typeof n) {
      var i = n.call(t, e);if ("object" != (typeof i === "undefined" ? "undefined" : _typeof(i))) throw new TypeError("RegExp exec method returned something other than an Object or null");return i;
    }if ("RegExp" !== r(t)) throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t, e);
  };
}, function (t, e, n) {
  "use strict";
  n(108);var r = n(11),
      o = n(14),
      i = n(2),
      s = n(24),
      a = n(5),
      u = n(81),
      c = a("species"),
      l = !i(function () {
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
    var f = a(t),
        d = !i(function () {
      var e = {};return e[f] = function () {
        return 7;
      }, 7 != ""[t](e);
    }),
        p = d ? !i(function () {
      var e = !1,
          n = /a/;return n.exec = function () {
        return e = !0, null;
      }, "split" === t && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[f](""), !e;
    }) : void 0;if (!d || !p || "replace" === t && !l || "split" === t && !h) {
      var g = /./[f],
          m = n(s, f, ""[t], function (t, e, n, r, o) {
        return e.exec === u ? d && !o ? { done: !0, value: g.call(e, n, r) } : { done: !0, value: t.call(n, e, r) } : { done: !1 };
      }),
          v = m[0],
          y = m[1];r(String.prototype, t, v), o(RegExp.prototype, f, 2 == e ? function (t, e) {
        return y.call(t, this, e);
      } : function (t) {
        return y.call(t, this);
      });
    }
  };
}, function (t, e, n) {
  var r = n(17),
      o = n(103),
      i = n(76),
      s = n(3),
      a = n(6),
      u = n(78),
      c = {},
      l = {};(e = t.exports = function (t, e, n, h, f) {
    var d,
        p,
        g,
        m,
        v = f ? function () {
      return t;
    } : u(t),
        y = r(n, h, e ? 2 : 1),
        b = 0;if ("function" != typeof v) throw TypeError(t + " is not iterable!");if (i(v)) {
      for (d = a(t.length); d > b; b++) {
        if ((m = e ? y(s(p = t[b])[0], p[1]) : y(t[b])) === c || m === l) return m;
      }
    } else for (g = v.call(t); !(p = g.next()).done;) {
      if ((m = o(g, y, p.value, e)) === c || m === l) return m;
    }
  }).BREAK = c, e.RETURN = l;
}, function (t, e, n) {
  var r = n(1).navigator;t.exports = r && r.userAgent || "";
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      o = n(0),
      i = n(11),
      s = n(43),
      a = n(27),
      u = n(56),
      c = n(42),
      l = n(4),
      h = n(2),
      f = n(52),
      d = n(38),
      p = n(67);t.exports = function (t, e, n, g, m, v) {
    var y = r[t],
        b = y,
        w = m ? "set" : "add",
        S = b && b.prototype,
        x = {},
        E = function E(t) {
      var e = S[t];i(S, t, "delete" == t || "has" == t ? function (t) {
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
          O = h(function () {
        M.has(1);
      }),
          A = f(function (t) {
        new b(t);
      }),
          C = !v && h(function () {
        for (var t = new b(), e = 5; e--;) {
          t[w](e, e);
        }return !t.has(-0);
      });A || ((b = e(function (e, n) {
        c(e, b, t);var r = p(new y(), e, b);return null != n && u(n, m, r[w], r), r;
      })).prototype = S, S.constructor = b), (O || C) && (E("delete"), E("has"), m && E("get")), (C || k) && E(w), v && S.clear && delete S.clear;
    } else b = g.getConstructor(e, t, m, w), s(b.prototype, n), a.NEED = !0;return d(b, t), x[t] = b, o(o.G + o.W + o.F * (b != y), x), v || g.setStrong(b, t, m), b;
  };
}, function (t, e, n) {
  for (var r, o = n(1), i = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!o.ArrayBuffer || !o.DataView), l = c, h = 0, f = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; h < 9;) {
    (r = o[f[h++]]) ? (i(r.prototype, a, !0), i(r.prototype, u, !0)) : l = !1;
  }t.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
}, function (t, e, n) {
  var r = n(4),
      o = n(1).document,
      i = r(o) && r(o.createElement);t.exports = function (t) {
    return i ? o.createElement(t) : {};
  };
}, function (t, e, n) {
  e.f = n(5);
}, function (t, e, n) {
  var r = n(48)("keys"),
      o = n(29);t.exports = function (t) {
    return r[t] || (r[t] = o(t));
  };
}, function (t) {
  t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, function (t, e, n) {
  var r = n(1).document;t.exports = r && r.documentElement;
}, function (t, e, n) {
  var r = n(4),
      o = n(3),
      i = function i(t, e) {
    if (o(t), !r(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
  };t.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, r) {
      try {
        (r = n(17)(Function.call, n(20).f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
      } catch (t) {
        e = !0;
      }return function (t, n) {
        return i(t, n), e ? _defaults(t, n) : r(t, n), t;
      };
    }({}, !1) : void 0), check: i };
}, function (t) {
  t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
}, function (t, e, n) {
  var r = n(4),
      o = n(65).set;t.exports = function (t, e, n) {
    var i,
        s = e.constructor;return s !== n && "function" == typeof s && (i = s.prototype) !== n.prototype && r(i) && o && o(t, i), t;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(19),
      o = n(24);t.exports = function (t) {
    var e = o(this) + "",
        n = "",
        i = r(t);if (0 > i || i == 1 / 0) throw RangeError("Count can't be negative");for (; 0 < i; (i >>>= 1) && (e += e)) {
      1 & i && (n += e);
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
      o = n(24);t.exports = function (t) {
    return function (e, n) {
      var i,
          s,
          a = o(e) + "",
          u = r(n),
          c = a.length;return 0 > u || u >= c ? t ? "" : void 0 : 55296 > (i = a.charCodeAt(u)) || 56319 < i || u + 1 === c || 56320 > (s = a.charCodeAt(u + 1)) || 57343 < s ? t ? a.charAt(u) : i : t ? a.slice(u, u + 2) : s - 56320 + (i - 55296 << 10) + 65536;
    };
  };
}, function (t, e, n) {
  "use strict";
  var r = n(30),
      o = n(0),
      i = n(11),
      s = n(14),
      a = n(40),
      u = n(102),
      c = n(38),
      l = n(35),
      h = n(5)("iterator"),
      f = !([].keys && "next" in [].keys()),
      d = "keys",
      p = "values",
      g = function g() {
    return this;
  };t.exports = function (t, e, n, m, v, y, b) {
    u(n, e, m);var w,
        S,
        x,
        E = function E(t) {
      return !f && t in A ? A[t] : function () {
        return new n(this, t);
      };
    },
        M = e + " Iterator",
        k = v == p,
        O = !1,
        A = t.prototype,
        C = A[h] || A["@@iterator"] || v && A[v],
        I = C || E(v),
        P = v ? k ? E("entries") : I : void 0,
        T = "Array" == e && A.entries || C;if (T && (x = l(T.call(new t()))) !== Object.prototype && x.next && (c(x, M, !0), !r && "function" != typeof x[h] && s(x, h, g)), k && C && C.name !== p && (O = !0, I = function I() {
      return C.call(this);
    }), (!r || b) && (f || O || !A[h]) && s(A, h, I), a[e] = I, a[M] = g, v) if (w = { values: k ? I : E(p), keys: y ? I : E(d), entries: P }, b) for (S in w) {
      S in A || i(A, S, w[S]);
    } else o(o.P + o.F * (f || O), e, w);return w;
  };
}, function (t, e, n) {
  var r = n(74),
      o = n(24);t.exports = function (t, e, n) {
    if (r(e)) throw TypeError("String#" + n + " doesn't accept regex!");return o(t) + "";
  };
}, function (t, e, n) {
  var r = n(4),
      o = n(23),
      i = n(5)("match");t.exports = function (t) {
    var e;return r(t) && (void 0 === (e = t[i]) ? "RegExp" == o(t) : !!e);
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
      o = n(5)("iterator"),
      i = Array.prototype;t.exports = function (t) {
    return void 0 !== t && (r.Array === t || i[o] === t);
  };
}, function (t, e, n) {
  "use strict";
  var r = n(9),
      o = n(28);t.exports = function (t, e, n) {
    e in t ? r.f(t, e, o(0, n)) : t[e] = n;
  };
}, function (t, e, n) {
  var r = n(46),
      o = n(5)("iterator"),
      i = n(40);t.exports = n(7).getIteratorMethod = function (t) {
    if (null != t) return t[o] || t["@@iterator"] || i[r(t)];
  };
}, function (t, e, n) {
  "use strict";
  var r = n(10),
      o = n(32),
      i = n(6);t.exports = function (t) {
    for (var e = r(this), n = i(e.length), s = arguments.length, a = o(1 < s ? arguments[1] : void 0, n), u = 2 < s ? arguments[2] : void 0, c = void 0 === u ? n : o(u, n); c > a;) {
      e[a++] = t;
    }return e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(36),
      o = n(107),
      i = n(40),
      s = n(15);t.exports = n(72)(Array, "Array", function (t, e) {
    this._t = s(t), this._i = 0, this._k = e;
  }, function () {
    var t = this._t,
        e = this._k,
        n = this._i++;return !t || n >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
  }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
}, function (t, e, n) {
  "use strict";
  var r = n(53),
      o = RegExp.prototype.exec,
      i = String.prototype.replace,
      s = o,
      a = "lastIndex",
      u = function () {
    var t = /a/,
        e = /b*/g;return o.call(t, "a"), o.call(e, "a"), 0 !== t[a] || 0 !== e[a];
  }(),
      c = void 0 !== /()??/.exec("")[1];(u || c) && (s = function s(t) {
    var e,
        n,
        s,
        l,
        h = this;return c && (n = new RegExp("^" + h.source + "$(?!\\s)", r.call(h))), u && (e = h[a]), s = o.call(h, t), u && s && (h[a] = h.global ? s.index + s[0].length : e), c && s && 1 < s.length && i.call(s[0], n, function () {
      for (l = 1; l < arguments.length - 2; l++) {
        void 0 === arguments[l] && (s[l] = void 0);
      }
    }), s;
  }), t.exports = s;
}, function (t, e, n) {
  "use strict";
  var r = n(71)(!0);t.exports = function (t, e, n) {
    return e + (n ? r(t, e).length : 1);
  };
}, function (t, e, n) {
  var r,
      o,
      i,
      s = n(17),
      a = n(96),
      u = n(64),
      c = n(60),
      l = n(1),
      h = l.process,
      f = l.setImmediate,
      d = l.clearImmediate,
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
  };f && d || (f = function f(t) {
    for (var e = [], n = 1; arguments.length > n;) {
      e.push(arguments[n++]);
    }return v[++m] = function () {
      a("function" == typeof t ? t : Function(t), e);
    }, r(m), m;
  }, d = function d(t) {
    delete v[t];
  }, "process" == n(23)(h) ? r = function r(t) {
    h.nextTick(s(b, t, 1));
  } : g && g.now ? r = function r(t) {
    g.now(s(b, t, 1));
  } : p ? (i = (o = new p()).port2, o.port1.onmessage = w, r = s(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function r(t) {
    l.postMessage(t + "", "*");
  }, l.addEventListener("message", w, !1)) : r = y in c("script") ? function (t) {
    u.appendChild(c("script"))[y] = function () {
      u.removeChild(this), b.call(t);
    };
  } : function (t) {
    setTimeout(s(b, t, 1), 0);
  }), t.exports = { set: f, clear: d };
}, function (t, e, n) {
  "use strict";
  function r(t, e, n) {
    var r,
        o,
        i,
        s = Array(n),
        a = 8 * n - e - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        l = 23 === e ? U(2, -24) - U(2, -77) : 0,
        h = 0,
        f = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for ((t = j(t)) != t || t === B ? (o = t == t ? 0 : 1, r = u) : (r = V(H(t) / z), 1 > t * (i = U(2, -r)) && (r--, i *= 2), 2 <= (t += 1 <= r + c ? l / i : l * U(2, 1 - c)) * i && (r++, i /= 2), r + c >= u ? (o = 0, r = u) : 1 <= r + c ? (o = (t * i - 1) * U(2, e), r += c) : (o = t * U(2, c - 1) * U(2, e), r = 0)); 8 <= e; s[h++] = 255 & o, o /= 256, e -= 8) {}for (r = r << e | o, a += e; 0 < a; s[h++] = 255 & r, r /= 256, a -= 8) {}return s[--h] |= 128 * f, s;
  }function o(t, e, n) {
    var r,
        o = 8 * n - e - 1,
        i = (1 << o) - 1,
        s = i >> 1,
        a = o - 7,
        u = n - 1,
        c = t[u--],
        l = 127 & c;for (c >>= 7; 0 < a; l = 256 * l + t[u], u--, a -= 8) {}for (r = l & (1 << -a) - 1, l >>= -a, a += e; 0 < a; r = 256 * r + t[u], u--, a -= 8) {}if (0 === l) l = 1 - s;else {
      if (l === i) return r ? NaN : c ? -B : B;r += U(2, e), l -= s;
    }return (c ? -1 : 1) * r * U(2, l - e);
  }function i(t) {
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
    O(t[T], e, { get: function get() {
        return this[n];
      } });
  }function f(t, e, n, r) {
    var o = M(+n);if (o + e > t[Y]) throw L(_);var i = t[q]._b,
        s = o + t[J],
        a = i.slice(s, s + e);return r ? a : a.reverse();
  }function d(t, e, n, r, o, i) {
    var s = M(+n);if (s + e > t[Y]) throw L(_);for (var a = t[q]._b, u = s + t[J], c = r(+o), l = 0; l < e; l++) {
      a[u + l] = c[i ? l : e - l - 1];
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
      M = n(115),
      k = n(34).f,
      O = n(9).f,
      A = n(79),
      C = n(38),
      I = "ArrayBuffer",
      P = "DataView",
      T = "prototype",
      _ = "Wrong index!",
      _R2 = p[I],
      _N = p[P],
      F = p.Math,
      L = p.RangeError,
      B = p.Infinity,
      D = _R2,
      j = F.abs,
      U = F.pow,
      V = F.floor,
      H = F.log,
      z = F.LN2,
      G = "buffer",
      K = "byteLength",
      W = "byteOffset",
      q = g ? "_b" : G,
      Y = g ? "_l" : K,
      J = g ? "_o" : W;if (v.ABV) {
    if (!w(function () {
      _R2(1);
    }) || !w(function () {
      new _R2(-1);
    }) || w(function () {
      return new _R2(), new _R2(1.5), new _R2(NaN), _R2.name != I;
    })) {
      for (var X, $ = (_R2 = function R(t) {
        return S(this, _R2), new D(M(t));
      })[T] = D[T], Q = k(D), Z = 0; Q.length > Z;) {
        (X = Q[Z++]) in _R2 || y(_R2, X, D[X]);
      }m || ($.constructor = _R2);
    }var tt = new _N(new _R2(2)),
        et = _N[T].setInt8;tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), (tt.getInt8(0) || !tt.getInt8(1)) && b(_N[T], { setInt8: function setInt8(t, e) {
        et.call(this, t, e << 24 >> 24);
      }, setUint8: function setUint8(t, e) {
        et.call(this, t, e << 24 >> 24);
      } }, !0);
  } else _R2 = function _R(t) {
    S(this, _R2, I);var e = M(t);this._b = A.call(Array(e), 0), this[Y] = e;
  }, _N = function N(t, e, n) {
    S(this, _N, P), S(t, _R2, P);var r = t[Y],
        o = x(e);if (0 > o || o > r) throw L("Wrong offset!");if (o + (n = void 0 === n ? r - o : E(n)) > r) throw L("Wrong length!");this[q] = t, this[J] = o, this[Y] = n;
  }, g && (h(_R2, K, "_l"), h(_N, G, "_b"), h(_N, K, "_l"), h(_N, W, "_o")), b(_N[T], { getInt8: function getInt8(t) {
      return f(this, 1, t)[0] << 24 >> 24;
    }, getUint8: function getUint8(t) {
      return f(this, 1, t)[0];
    }, getInt16: function getInt16(t) {
      var e = f(this, 2, t, arguments[1]);return (e[1] << 8 | e[0]) << 16 >> 16;
    }, getUint16: function getUint16(t) {
      var e = f(this, 2, t, arguments[1]);return e[1] << 8 | e[0];
    }, getInt32: function getInt32(t) {
      return i(f(this, 4, t, arguments[1]));
    }, getUint32: function getUint32(t) {
      return i(f(this, 4, t, arguments[1])) >>> 0;
    }, getFloat32: function getFloat32(t) {
      return o(f(this, 4, t, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(t) {
      return o(f(this, 8, t, arguments[1]), 52, 8);
    }, setInt8: function setInt8(t, e) {
      d(this, 1, t, s, e);
    }, setUint8: function setUint8(t, e) {
      d(this, 1, t, s, e);
    }, setInt16: function setInt16(t, e) {
      d(this, 2, t, a, e, arguments[2]);
    }, setUint16: function setUint16(t, e) {
      d(this, 2, t, a, e, arguments[2]);
    }, setInt32: function setInt32(t, e) {
      d(this, 4, t, u, e, arguments[2]);
    }, setUint32: function setUint32(t, e) {
      d(this, 4, t, u, e, arguments[2]);
    }, setFloat32: function setFloat32(t, e) {
      d(this, 4, t, l, e, arguments[2]);
    }, setFloat64: function setFloat64(t, e) {
      d(this, 8, t, c, e, arguments[2]);
    } });C(_R2, I), C(_N, P), y(_N[T], v.VIEW, !0), e[I] = _R2, e[P] = _N;
}, function (t) {
  var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
}, function (t) {
  t.exports = function (t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  t.exports = !n(120)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  t.exports = !n(8) && !n(2)(function () {
    return 7 != Object.defineProperty(n(60)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var r = n(1),
      o = n(7),
      i = n(30),
      s = n(61),
      a = n(9).f;t.exports = function (t) {
    var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});"_" == t.charAt(0) || t in e || a(e, t, { value: s.f(t) });
  };
}, function (t, e, n) {
  var r = n(13),
      o = n(15),
      i = n(49)(!1),
      s = n(62)("IE_PROTO");t.exports = function (t, e) {
    var n,
        a = o(t),
        u = 0,
        c = [];for (n in a) {
      n != s && r(a, n) && c.push(n);
    }for (; e.length > u;) {
      r(a, n = e[u++]) && (~i(c, n) || c.push(n));
    }return c;
  };
}, function (t, e, n) {
  var r = n(9),
      o = n(3),
      i = n(31);t.exports = n(8) ? Object.defineProperties : function (t, e) {
    o(t);for (var n, s = i(e), a = s.length, u = 0; a > u;) {
      r.f(t, n = s[u++], e[n]);
    }return t;
  };
}, function (t, e, n) {
  var r = n(15),
      o = n(34).f,
      i = {}.toString,
      s = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];t.exports.f = function (t) {
    return s && "[object Window]" == i.call(t) ? function (t) {
      try {
        return o(t);
      } catch (t) {
        return s.slice();
      }
    }(t) : o(r(t));
  };
}, function (t, e, n) {
  "use strict";
  var r = n(8),
      o = n(31),
      i = n(50),
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
    for (var e = a(t), n = arguments.length, c = 1, l = i.f, h = s.f; n > c;) {
      for (var f, d = u(arguments[c++]), p = l ? o(d).concat(l(d)) : o(d), g = p.length, m = 0; g > m;) {
        f = p[m++], (!r || h.call(d, f)) && (e[f] = d[f]);
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
      o = n(4),
      i = n(96),
      s = [].slice,
      a = {},
      u = function u(t, e, n) {
    if (!(e in a)) {
      for (var r = [], o = 0; o < e; o++) {
        r[o] = "a[" + o + "]";
      }a[e] = Function("F,a", "return new F(" + r.join(",") + ")");
    }return a[e](t, n);
  };t.exports = Function.bind || function (t) {
    var e = r(this),
        n = s.call(arguments, 1),
        a = function a() {
      var r = n.concat(s.call(arguments));return this instanceof a ? u(e, r.length, r) : i(e, r, t);
    };return o(e.prototype) && (a.prototype = e.prototype), a;
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
      o = n(39).trim,
      i = n(66),
      s = /^[-+]?0[xX]/;t.exports = 8 !== r(i + "08") || 22 !== r(i + "0x16") ? function (t, e) {
    var n = o(t + "", 3);return r(n, e >>> 0 || (s.test(n) ? 16 : 10));
  } : r;
}, function (t, e, n) {
  var r = n(1).parseFloat,
      o = n(39).trim;t.exports = 1 / r(n(66) + "-0") == -1 / 0 ? r : function (t) {
    var e = o(t + "", 3),
        n = r(e);return 0 === n && "-" == e.charAt(0) ? -0 : n;
  };
}, function (t, e, n) {
  var r = n(23);t.exports = function (t, e) {
    if ("number" != typeof t && "Number" != r(t)) throw TypeError(e);return +t;
  };
}, function (t, e, n) {
  var r = n(4),
      o = Math.floor;t.exports = function (t) {
    return !r(t) && isFinite(t) && o(t) === t;
  };
}, function (t) {
  t.exports = Math.log1p || function (t) {
    return -1e-8 < (t = +t) && 1e-8 > t ? t - t * t / 2 : Math.log(1 + t);
  };
}, function (t, e, n) {
  "use strict";
  var r = n(33),
      o = n(28),
      i = n(38),
      s = {};n(14)(s, n(5)("iterator"), function () {
    return this;
  }), t.exports = function (t, e, n) {
    t.prototype = r(s, { next: o(1, n) }), i(t, e + " Iterator");
  };
}, function (t, e, n) {
  var r = n(3);t.exports = function (t, e, n, o) {
    try {
      return o ? e(r(n)[0], n[1]) : e(n);
    } catch (n) {
      var i = t.return;throw void 0 !== i && r(i.call(t)), n;
    }
  };
}, function (t, e, n) {
  var r = n(216);t.exports = function (t, e) {
    return new (r(t))(e);
  };
}, function (t, e, n) {
  var r = n(18),
      o = n(10),
      i = n(44),
      s = n(6);t.exports = function (t, e, n, a, u) {
    r(e);var c = o(t),
        l = i(c),
        h = s(c.length),
        f = u ? h - 1 : 0,
        d = u ? -1 : 1;if (2 > n) for (;;) {
      if (f in l) {
        a = l[f], f += d;break;
      }if (f += d, u ? 0 > f : h <= f) throw TypeError("Reduce of empty array with no initial value");
    }for (; u ? 0 <= f : h > f; f += d) {
      f in l && (a = e(a, l[f], f, c));
    }return a;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(10),
      o = n(32),
      i = n(6);t.exports = [].copyWithin || function (t, e) {
    var n = r(this),
        s = i(n.length),
        a = o(t, s),
        u = o(e, s),
        c = 2 < arguments.length ? arguments[2] : void 0,
        l = Math.min((void 0 === c ? s : o(c, s)) - u, s - a),
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
  var r = n(81);n(0)({ target: "RegExp", proto: !0, forced: r !== /./.exec }, { exec: r });
}, function (t, e, n) {
  n(8) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", { configurable: !0, get: n(53) });
}, function (t, e, n) {
  "use strict";
  var r,
      o,
      i,
      s,
      a = n(30),
      u = n(1),
      c = n(17),
      l = n(46),
      h = n(0),
      f = n(4),
      d = n(18),
      p = n(42),
      g = n(56),
      m = n(47),
      v = n(83).set,
      y = n(236)(),
      b = n(111),
      w = n(237),
      S = n(57),
      x = n(112),
      E = "Promise",
      M = u.TypeError,
      k = u.process,
      O = k && k.versions,
      A = O && O.v8 || "",
      _C = u[E],
      I = "process" == l(k),
      P = function P() {},
      T = o = b.f,
      _ = !!function () {
    try {
      var t = _C.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(P, P);
      };return (I || "function" == typeof PromiseRejectionEvent) && t.then(P) instanceof e && 0 !== A.indexOf("6.6") && -1 === S.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      R = function R(t) {
    var e;return !(!f(t) || "function" != typeof (e = t.then)) && e;
  },
      N = function N(t, e) {
    if (!t._n) {
      t._n = !0;var n = t._c;y(function () {
        for (var r = t._v, o = 1 == t._s, i = 0, s = function s(e) {
          var n,
              i,
              s,
              a = o ? e.ok : e.fail,
              u = e.resolve,
              c = e.reject,
              l = e.domain;try {
            a ? (!o && (2 == t._h && B(t), t._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === e.promise ? c(M("Promise-chain cycle")) : (i = R(n)) ? i.call(n, u, c) : u(n)) : c(r);
          } catch (e) {
            l && !s && l.exit(), c(e);
          }
        }; n.length > i;) {
          s(n[i++]);
        }t._c = [], t._n = !1, e && !t._h && F(t);
      });
    }
  },
      F = function F(t) {
    v.call(u, function () {
      var e,
          n,
          r,
          o = t._v,
          i = L(t);if (i && (e = w(function () {
        I ? k.emit("unhandledRejection", o, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: o }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", o);
      }), t._h = I || L(t) ? 2 : 1), t._a = void 0, i && e.e) throw e.v;
    });
  },
      L = function L(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      B = function B(t) {
    v.call(u, function () {
      var e;I ? k.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      D = function D(t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, !e._a && (e._a = e._c.slice()), N(e, !0));
  },
      j = function j(t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw M("Promise can't be resolved itself");(e = R(t)) ? y(function () {
          var r = { _w: n, _d: !1 };try {
            e.call(t, c(j, r, 1), c(D, r, 1));
          } catch (t) {
            D.call(r, t);
          }
        }) : (n._v = t, n._s = 1, N(n, !1));
      } catch (e) {
        D.call({ _w: n, _d: !1 }, e);
      }
    }
  };_ || (_C = function C(t) {
    p(this, _C, E, "_h"), d(t), r.call(this);try {
      t(c(j, this, 1), c(D, this, 1));
    } catch (t) {
      D.call(this, t);
    }
  }, (r = function r() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_C.prototype, { then: function then(t, e) {
      var n = T(m(this, _C));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = I ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && N(this, !1), n.promise;
    }, catch: function _catch(t) {
      return this.then(void 0, t);
    } }), i = function i() {
    var t = new r();this.promise = t, this.resolve = c(j, t, 1), this.reject = c(D, t, 1);
  }, b.f = T = function T(t) {
    return t === _C || t === s ? new i(t) : o(t);
  }), h(h.G + h.W + h.F * !_, { Promise: _C }), n(38)(_C, E), n(41)(E), s = n(7)[E], h(h.S + h.F * !_, E, { reject: function reject(t) {
      var e = T(this);return (0, e.reject)(t), e.promise;
    } }), h(h.S + h.F * (a || !_), E, { resolve: function resolve(t) {
      return x(a && this === s ? _C : this, t);
    } }), h(h.S + h.F * !(_ && n(52)(function (t) {
    _C.all(t).catch(P);
  })), E, { all: function all(t) {
      var e = this,
          n = T(e),
          r = n.resolve,
          o = n.reject,
          i = w(function () {
        var n = [],
            i = 0,
            s = 1;g(t, !1, function (t) {
          var a = i++,
              u = !1;n.push(void 0), s++, e.resolve(t).then(function (t) {
            u || (u = !0, n[a] = t, --s || r(n));
          }, o);
        }), --s || r(n);
      });return i.e && o(i.v), n.promise;
    }, race: function race(t) {
      var e = this,
          n = T(e),
          r = n.reject,
          o = w(function () {
        g(t, !1, function (t) {
          e.resolve(t).then(n.resolve, r);
        });
      });return o.e && r(o.v), n.promise;
    } });
}, function (t, e, n) {
  "use strict";
  function r(t) {
    var e, n;this.promise = new t(function (t, r) {
      if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");e = t, n = r;
    }), this.resolve = o(e), this.reject = o(n);
  }var o = n(18);t.exports.f = function (t) {
    return new r(t);
  };
}, function (t, e, n) {
  var r = n(3),
      o = n(4),
      i = n(111);t.exports = function (t, e) {
    if (r(t), o(e) && e.constructor === t) return e;var n = i.f(t);return (0, n.resolve)(e), n.promise;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(9).f,
      o = n(33),
      i = n(43),
      s = n(17),
      a = n(42),
      u = n(56),
      c = n(72),
      l = n(107),
      h = n(41),
      f = n(8),
      d = n(27).fastKey,
      p = n(37),
      g = f ? "_s" : "size",
      m = function m(t, e) {
    var n,
        r = d(e);if ("F" !== r) return t._i[r];for (n = t._f; n; n = n.n) {
      if (n.k == e) return n;
    }
  };t.exports = { getConstructor: function getConstructor(t, e, n, c) {
      var l = t(function (t, r) {
        a(t, l, e, "_i"), t._t = e, t._i = o(null), t._f = void 0, t._l = void 0, t[g] = 0, null != r && u(r, n, t[c], t);
      });return i(l.prototype, { clear: function clear() {
          for (var t = p(this, e), n = t._i, r = t._f; r; r = r.n) {
            r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
          }t._f = t._l = void 0, t[g] = 0;
        }, delete: function _delete(t) {
          var n = p(this, e),
              r = m(n, t);if (r) {
            var o = r.n,
                i = r.p;delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[g]--;
          }return !!r;
        }, forEach: function forEach(t) {
          p(this, e);for (var n, r = s(t, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (r(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        }, has: function has(t) {
          return !!m(p(this, e), t);
        } }), f && r(l.prototype, "size", { get: function get() {
          return p(this, e)[g];
        } }), l;
    }, def: function def(t, e, n) {
      var r,
          o,
          i = m(t, e);return i ? i.v = n : (t._l = i = { i: o = d(e, !0), k: e, v: n, p: r = t._l, n: void 0, r: !1 }, !t._f && (t._f = i), r && (r.n = i), t[g]++, "F" !== o && (t._i[o] = i)), t;
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
      o = n(27).getWeak,
      i = n(3),
      s = n(4),
      a = n(42),
      u = n(56),
      c = n(22),
      l = n(13),
      h = n(37),
      f = c(5),
      d = c(6),
      p = 0,
      g = function g(t) {
    return t._l || (t._l = new m());
  },
      m = function m() {
    this.a = [];
  },
      v = function v(t, e) {
    return f(t.a, function (t) {
      return t[0] === e;
    });
  };m.prototype = { get: function get(t) {
      var e = v(this, t);if (e) return e[1];
    }, has: function has(t) {
      return !!v(this, t);
    }, set: function set(t, e) {
      var n = v(this, t);n ? n[1] = e : this.a.push([t, e]);
    }, delete: function _delete(t) {
      var e = d(this.a, function (e) {
        return e[0] === t;
      });return ~e && this.a.splice(e, 1), !!~e;
    } }, t.exports = { getConstructor: function getConstructor(t, e, n, i) {
      var c = t(function (t, r) {
        a(t, c, e, "_i"), t._t = e, t._i = p++, t._l = void 0, null != r && u(r, n, t[i], t);
      });return r(c.prototype, { delete: function _delete(t) {
          if (!s(t)) return !1;var n = o(t);return !0 === n ? g(h(this, e)).delete(t) : n && l(n, this._i) && delete n[this._i];
        }, has: function has(t) {
          if (!s(t)) return !1;var n = o(t);return !0 === n ? g(h(this, e)).has(t) : n && l(n, this._i);
        } }), c;
    }, def: function def(t, e, n) {
      var r = o(i(e), !0);return !0 === r ? g(t).set(e, n) : r[t._i] = n, t;
    }, ufstore: g };
}, function (t, e, n) {
  var r = n(19),
      o = n(6);t.exports = function (t) {
    if (void 0 === t) return 0;var e = r(t),
        n = o(e);if (e !== n) throw RangeError("Wrong length!");return n;
  };
}, function (t, e, n) {
  var r = n(34),
      o = n(50),
      i = n(3),
      s = n(1).Reflect;t.exports = s && s.ownKeys || function (t) {
    var e = r.f(i(t)),
        n = o.f;return n ? e.concat(n(t)) : e;
  };
}, function (t, e, n) {
  var r = n(6),
      o = n(68),
      i = n(24);t.exports = function (t, e, n, s) {
    var a = i(t) + "",
        u = a.length,
        c = void 0 === n ? " " : n + "",
        l = r(e);if (l <= u || "" == c) return a;var h = l - u,
        f = o.call(c, Math.ceil(h / c.length));return f.length > h && (f = f.slice(0, h)), s ? f + a : a + f;
  };
}, function (t, e, n) {
  var r = n(8),
      o = n(31),
      i = n(15),
      s = n(45).f;t.exports = function (t) {
    return function (e) {
      for (var n, a = i(e), u = o(a), c = u.length, l = 0, h = []; c > l;) {
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
}, function (t, e, n) {
  "use strict";
  (function (t) {
    function r() {
      return i();
    }n.d(e, "a", function () {
      return r;
    });var o = function o(t, e, n, r) {
      var i = function i(e, o, _i) {
        return new r(function (t) {
          null !== _i && (_i = n.stringify(_i)), t(_i);
        }).then(function (n) {
          return t(o, { method: e, body: n });
        }).then(function (t) {
          return t.json();
        });
      },
          s = function s(t, e) {
        return i(t, e, null);
      },
          a = s.bind(null, "GET"),
          u = i.bind(null, "PUT"),
          c = i.bind(null, "POST"),
          l = s.bind(null, "DELETE"),
          h = function h(t, e) {
        return function (n) {
          for (var _len = arguments.length, r = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            r[_key - 1] = arguments[_key];
          }

          return t.apply(undefined, [e(n)].concat(r));
        };
      },
          f = function f(t) {
        return function (o, i) {
          return r.resolve(new e(n.stringify({ address: o.slice(t.length), method: i.method, body: n.parse(i.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var i = "http://" + t,
              s = i + "/api";return { createUser: function createUser(t) {
              return c(s, { devicetype: t });
            }, user: function user(d) {
              Cookies.set("hueid", d, { expires: 30 });var p = s + "/" + d,
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
                  O = M(y),
                  A = M(b),
                  C = M(w),
                  I = M(S),
                  P = M(x),
                  T = M(E);return { getCapabilities: a.bind(null, g), deleteUser: h(l, function (t) {
                  return m + "/whitelist/" + t;
                }), getConfig: a.bind(null, m), setConfig: u.bind(null, m), getFullState: a.bind(null, p), getLights: a.bind(null, v), getNewLights: a.bind(null, v + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(v, t);
                }, getLight: h(a, k), setLight: h(u, k), setLightState: h(u, function (t) {
                  return k(t) + "/state";
                }), deleteLight: h(l, k), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: h(a, O), setGroup: h(u, O), setGroupState: h(u, function (t) {
                  return O(t) + "/action";
                }), deleteGroup: h(l, O), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: h(a, A), setSchedule: h(u, A), deleteSchedule: h(l, A), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return o(f(i), e, n, r).bridge(t).user(d);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: h(a, C), setScene: h(u, C), setSceneLightState: function setSceneLightState(t, e, n) {
                  return u(C(t) + "/lightstates/" + e, n);
                }, deleteScene: h(l, C), getSensors: a.bind(null, S), createSensor: c.bind(null, S), searchForNewSensors: c.bind(null, S, null), getNewSensors: a.bind(null, S + "/new"), getSensor: h(a, I), setSensor: h(u, I), setSensorConfig: h(u, function (t) {
                  return I(t) + "/config";
                }), setSensorState: h(u, function (t) {
                  return I(t) + "/state";
                }), deleteSensor: h(l, I), getRules: a.bind(null, x), createRule: c.bind(null, x), getRule: h(a, P), setRule: h(u, P), deleteRule: h(l, P), ruleActionGenerator: function ruleActionGenerator() {
                  return o(f(p), e, n, r).bridge(t).user(d);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: h(a, T), setResourceLink: h(u, T), deleteResourceLink: h(l, T) };
            } };
        } };
    };var i = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (i = o.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = i));
  }).call(this, n(308)(t));
}, function (t, e, n) {
  "use strict";
  n(123);var r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(n(295));r.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), r.default._babelPolyfill = !0;
}, function (t, e, n) {
  "use strict";
  n(124), n(267), n(269), n(272), n(274), n(276), n(278), n(280), n(282), n(284), n(286), n(288), n(290), n(294);
}, function (t, e, n) {
  n(125), n(128), n(129), n(130), n(131), n(132), n(133), n(134), n(135), n(136), n(137), n(138), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(206), n(207), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(217), n(218), n(219), n(220), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(228), n(229), n(80), n(230), n(108), n(231), n(109), n(232), n(233), n(234), n(235), n(110), n(238), n(239), n(240), n(241), n(242), n(243), n(244), n(245), n(246), n(247), n(248), n(249), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), t.exports = n(7);
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      o = n(13),
      i = n(8),
      s = n(0),
      a = n(11),
      u = n(27).KEY,
      c = n(2),
      l = n(48),
      h = n(38),
      f = n(29),
      d = n(5),
      p = n(61),
      g = n(89),
      m = n(127),
      v = n(51),
      y = n(3),
      b = n(4),
      w = n(10),
      S = n(15),
      x = n(26),
      E = n(28),
      M = n(33),
      k = n(92),
      O = n(20),
      A = n(50),
      C = n(9),
      I = n(31),
      P = O.f,
      T = C.f,
      _ = k.f,
      _R3 = r.Symbol,
      N = r.JSON,
      F = N && N.stringify,
      L = "prototype",
      B = d("_hidden"),
      D = d("toPrimitive"),
      j = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      V = l("symbols"),
      H = l("op-symbols"),
      z = Object[L],
      G = "function" == typeof _R3 && !!A.f,
      K = r.QObject,
      W = !K || !K[L] || !K[L].findChild,
      q = i && c(function () {
    return 7 != M(T({}, "a", { get: function get() {
        return T(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var r = P(z, e);r && delete z[e], T(t, e, n), r && t !== z && T(z, e, r);
  } : T,
      Y = function Y(t) {
    var e = V[t] = M(_R3[L]);return e._k = t, e;
  },
      J = G && "symbol" == _typeof(_R3.iterator) ? function (t) {
    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  } : function (t) {
    return t instanceof _R3;
  },
      X = function X(t, e, n) {
    return t === z && X(H, e, n), y(t), e = x(e, !0), y(n), o(V, e) ? (n.enumerable ? (o(t, B) && t[B][e] && (t[B][e] = !1), n = M(n, { enumerable: E(0, !1) })) : (!o(t, B) && T(t, B, E(1, {})), t[B][e] = !0), q(t, e, n)) : T(t, e, n);
  },
      $ = function $(t, e) {
    y(t);for (var n, r = m(e = S(e)), o = 0, i = r.length; i > o;) {
      X(t, n = r[o++], e[n]);
    }return t;
  },
      Q = function Q(t) {
    var e = j.call(this, t = x(t, !0));return (this !== z || !o(V, t) || o(H, t)) && (!(e || !o(this, t) || !o(V, t) || o(this, B) && this[B][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = S(t), e = x(e, !0), t !== z || !o(V, e) || o(H, e)) {
      var n = P(t, e);return n && o(V, e) && !(o(t, B) && t[B][e]) && (n.enumerable = !0), n;
    }
  },
      tt = function tt(t) {
    for (var e, n = _(S(t)), r = [], i = 0; n.length > i;) {
      o(V, e = n[i++]) || e == B || e == u || r.push(e);
    }return r;
  },
      et = function et(t) {
    for (var e, n = t === z, r = _(n ? H : S(t)), i = [], s = 0; r.length > s;) {
      o(V, e = r[s++]) && (!n || o(z, e)) && i.push(V[e]);
    }return i;
  };G || (a((_R3 = function R() {
    if (this instanceof _R3) throw TypeError("Symbol is not a constructor!");var t = f(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === z && e.call(H, n), o(this, B) && o(this[B], t) && (this[B][t] = !1), q(this, t, E(1, n));
    };return i && W && q(z, t, { configurable: !0, set: e }), Y(t);
  })[L], "toString", function () {
    return this._k;
  }), O.f = Z, C.f = X, n(34).f = k.f = tt, n(45).f = Q, A.f = et, i && !n(30) && a(z, "propertyIsEnumerable", Q, !0), p.f = function (t) {
    return Y(d(t));
  }), s(s.G + s.W + s.F * !G, { Symbol: _R3 });for (var nt = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], rt = 0; nt.length > rt;) {
    d(nt[rt++]);
  }for (var ot = I(d.store), it = 0; ot.length > it;) {
    g(ot[it++]);
  }s(s.S + s.F * !G, "Symbol", { for: function _for(t) {
      return o(U, t += "") ? U[t] : U[t] = _R3(t);
    }, keyFor: function keyFor(t) {
      if (!J(t)) throw TypeError(t + " is not a symbol!");for (var e in U) {
        if (U[e] === t) return e;
      }
    }, useSetter: function useSetter() {
      W = !0;
    }, useSimple: function useSimple() {
      W = !1;
    } }), s(s.S + s.F * !G, "Object", { create: function create(t, e) {
      return void 0 === e ? M(t) : $(M(t), e);
    }, defineProperty: X, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: tt, getOwnPropertySymbols: et });var st = c(function () {
    A.f(1);
  });s(s.S + s.F * st, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(t) {
      return A.f(w(t));
    } }), N && s(s.S + s.F * (!G || c(function () {
    var t = _R3();return "[null]" != F([t]) || "{}" != F({ a: t }) || "{}" != F(Object(t));
  })), "JSON", { stringify: function stringify(t) {
      for (var e, n, r = [t], o = 1; arguments.length > o;) {
        r.push(arguments[o++]);
      }if (n = e = r[1], (b(e) || void 0 !== t) && !J(t)) return v(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !J(_e)) return _e;
      }), r[1] = e, F.apply(N, r);
    } }), _R3[L][D] || n(14)(_R3[L], D, _R3[L].valueOf), h(_R3, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0);
}, function (t, e, n) {
  t.exports = n(48)("native-function-to-string", Function.toString);
}, function (t, e, n) {
  var r = n(31),
      o = n(50),
      i = n(45);t.exports = function (t) {
    var e = r(t),
        n = o.f;if (n) for (var s, a = n(t), u = i.f, c = 0; a.length > c;) {
      u.call(t, s = a[c++]) && e.push(s);
    }return e;
  };
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { create: n(33) });
}, function (t, e, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperty: n(9).f });
}, function (t, e, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperties: n(91) });
}, function (t, e, n) {
  var r = n(15),
      o = n(20).f;n(21)("getOwnPropertyDescriptor", function () {
    return function (t, e) {
      return o(r(t), e);
    };
  });
}, function (t, e, n) {
  var r = n(10),
      o = n(35);n(21)("getPrototypeOf", function () {
    return function (t) {
      return o(r(t));
    };
  });
}, function (t, e, n) {
  var r = n(10),
      o = n(31);n(21)("keys", function () {
    return function (t) {
      return o(r(t));
    };
  });
}, function (t, e, n) {
  n(21)("getOwnPropertyNames", function () {
    return n(92).f;
  });
}, function (t, e, n) {
  var r = n(4),
      o = n(27).onFreeze;n(21)("freeze", function (t) {
    return function (e) {
      return t && r(e) ? t(o(e)) : e;
    };
  });
}, function (t, e, n) {
  var r = n(4),
      o = n(27).onFreeze;n(21)("seal", function (t) {
    return function (e) {
      return t && r(e) ? t(o(e)) : e;
    };
  });
}, function (t, e, n) {
  var r = n(4),
      o = n(27).onFreeze;n(21)("preventExtensions", function (t) {
    return function (e) {
      return t && r(e) ? t(o(e)) : e;
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
  var r = n(0);r(r.S + r.F, "Object", { assign: n(93) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { is: n(94) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { setPrototypeOf: n(65).set });
}, function (t, e, n) {
  "use strict";
  var r = n(46);({})[n(5)("toStringTag")] = "z", n(11)(Object.prototype, "toString", function () {
    return "[object " + r(this) + "]";
  }, !0);
}, function (t, e, n) {
  var r = n(0);r(r.P, "Function", { bind: n(95) });
}, function (t, e, n) {
  var r = n(9).f,
      o = Function.prototype,
      i = /^\s*function ([^ (]*)/,
      s = "name";s in o || n(8) && r(o, s, { configurable: !0, get: function get() {
      try {
        return ("" + this).match(i)[1];
      } catch (t) {
        return "";
      }
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(4),
      o = n(35),
      i = n(5)("hasInstance"),
      s = Function.prototype;i in s || n(9).f(s, i, { value: function value(t) {
      if ("function" != typeof this || !r(t)) return !1;if (!r(this.prototype)) return t instanceof this;for (; t = o(t);) {
        if (this.prototype === t) return !0;
      }return !1;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(97);r(r.G + r.F * (parseInt != o), { parseInt: o });
}, function (t, e, n) {
  var r = n(0),
      o = n(98);r(r.G + r.F * (parseFloat != o), { parseFloat: o });
}, function (t, e, n) {
  "use strict";
  var r = n(1),
      o = n(13),
      i = n(23),
      s = n(67),
      a = n(26),
      u = n(2),
      c = n(34).f,
      l = n(20).f,
      h = n(9).f,
      f = n(39).trim,
      d = "Number",
      _p = r[d],
      g = _p,
      m = _p.prototype,
      v = i(n(33)(m)) == d,
      y = "trim" in String.prototype,
      b = function b(t) {
    var e = a(t, !1);if ("string" == typeof e && 2 < e.length) {
      var n,
          r,
          o,
          i = (e = y ? e.trim() : f(e, 3)).charCodeAt(0);if (43 === i || 45 === i) {
        if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
      } else if (48 === i) {
        switch (e.charCodeAt(1)) {case 66:case 98:
            r = 2, o = 49;break;case 79:case 111:
            r = 8, o = 55;break;default:
            return +e;}for (var s, u = e.slice(2), c = 0, l = u.length; c < l; c++) {
          if (48 > (s = u.charCodeAt(c)) || s > o) return NaN;
        }return parseInt(u, r);
      }
    }return +e;
  };if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
    _p = function p(t) {
      var e = 1 > arguments.length ? 0 : t,
          n = this;return n instanceof _p && (v ? u(function () {
        m.valueOf.call(n);
      }) : i(n) != d) ? s(new g(b(e)), n, _p) : b(e);
    };for (var w, S = n(8) ? c(g) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; S.length > x; x++) {
      o(g, w = S[x]) && !o(_p, w) && h(_p, w, l(g, w));
    }_p.prototype = m, m.constructor = _p, n(11)(r, d, _p);
  }
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(19),
      i = n(99),
      s = n(68),
      a = 1..toFixed,
      u = Math.floor,
      c = [0, 0, 0, 0, 0, 0],
      l = "Number.toFixed: incorrect invocation!",
      h = "0",
      f = function f(t, e) {
    for (var n = -1, r = e; 6 > ++n;) {
      r += t * c[n], c[n] = r % 1e7, r = u(r / 1e7);
    }
  },
      d = function d(t) {
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
          u = i(this, l),
          c = o(t),
          m = "",
          v = h;if (0 > c || 20 < c) throw RangeError(l);if (u != u) return "NaN";if (-1e21 >= u || 1e21 <= u) return u + "";if (0 > u && (m = "-", u = -u), 1e-21 < u) if (n = 0 > (e = function (t) {
        for (var e = 0, n = t; 4096 <= n;) {
          e += 12, n /= 4096;
        }for (; 2 <= n;) {
          e += 1, n /= 2;
        }return e;
      }(u * g(2, 69, 1)) - 69) ? u * g(2, -e, 1) : u / g(2, e, 1), n *= 4503599627370496, 0 < (e = 52 - e)) {
        for (f(0, n), r = c; 7 <= r;) {
          f(1e7, 0), r -= 7;
        }for (f(g(10, r, 1), 0), r = e - 1; 23 <= r;) {
          d(8388608), r -= 23;
        }d(1 << r), f(1, 1), d(2), v = p();
      } else f(0, n), f(1 << -e, 0), v = p() + s.call(h, c);return 0 < c ? v = m + ((a = v.length) <= c ? "0." + s.call(h, c - a) + v : v.slice(0, a - c) + "." + v.slice(a - c)) : v = m + v, v;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(2),
      i = n(99),
      s = 1..toPrecision;r(r.P + r.F * (o(function () {
    return "1" !== s.call(1, void 0);
  }) || !o(function () {
    s.call({});
  })), "Number", { toPrecision: function toPrecision(t) {
      var e = i(this, "Number#toPrecision: incorrect invocation!");return void 0 === t ? s.call(e) : s.call(e, t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { EPSILON: 2220446049250313e-31 });
}, function (t, e, n) {
  var r = n(0),
      o = n(1).isFinite;r(r.S, "Number", { isFinite: function isFinite(t) {
      return "number" == typeof t && o(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { isInteger: n(100) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { isNaN: function isNaN(t) {
      return t != t;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(100),
      i = Math.abs;r(r.S, "Number", { isSafeInteger: function isSafeInteger(t) {
      return o(t) && 9007199254740991 >= i(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
}, function (t, e, n) {
  var r = n(0),
      o = n(98);r(r.S + r.F * (Number.parseFloat != o), "Number", { parseFloat: o });
}, function (t, e, n) {
  var r = n(0),
      o = n(97);r(r.S + r.F * (Number.parseInt != o), "Number", { parseInt: o });
}, function (t, e, n) {
  var r = n(0),
      o = n(101),
      i = Math.sqrt,
      s = Math.acosh;r(r.S + r.F * !(s && 710 == Math.floor(s(Number.MAX_VALUE)) && s(1 / 0) == 1 / 0), "Math", { acosh: function acosh(t) {
      return 1 > (t = +t) ? NaN : 94906265.62425156 < t ? Math.log(t) + Math.LN2 : o(t - 1 + i(t - 1) * i(t + 1));
    } });
}, function (t, e, n) {
  var r = n(0),
      o = Math.asinh;r(r.S + r.F * !(o && 0 < 1 / o(0)), "Math", { asinh: function t(e) {
      return isFinite(e = +e) && 0 != e ? 0 > e ? -t(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = Math.atanh;r(r.S + r.F * !(o && 0 > 1 / o(-0)), "Math", { atanh: function atanh(t) {
      return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(69);r(r.S, "Math", { cbrt: function cbrt(t) {
      return o(t = +t) * Math.pow(Math.abs(t), 1 / 3);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { clz32: function clz32(t) {
      return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = Math.exp;r(r.S, "Math", { cosh: function cosh(t) {
      return (o(t = +t) + o(-t)) / 2;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(70);r(r.S + r.F * (o != Math.expm1), "Math", { expm1: o });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { fround: n(170) });
}, function (t, e, n) {
  var r = n(69),
      o = Math.pow,
      i = o(2, -52),
      s = o(2, -23),
      a = o(2, 127) * (2 - s),
      u = o(2, -126);t.exports = Math.fround || function (t) {
    var e,
        n,
        o = Math.abs(t),
        c = r(t);return o < u ? c * function (t) {
      return t + 1 / i - 1 / i;
    }(o / u / s) * u * s : (n = (e = (1 + s / i) * o) - (e - o)) > a || n != n ? c * (1 / 0) : c * n;
  };
}, function (t, e, n) {
  var r = n(0),
      o = Math.abs;r(r.S, "Math", { hypot: function hypot() {
      for (var t, e, n = 0, r = 0, i = arguments.length, s = 0; r < i;) {
        s < (t = o(arguments[r++])) ? (n = n * (e = s / t) * e + 1, s = t) : 0 < t ? n += (e = t / s) * e : n += t;
      }return s == 1 / 0 ? 1 / 0 : s * Math.sqrt(n);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = Math.imul;r(r.S + r.F * n(2)(function () {
    return -5 != o(4294967295, 5) || 2 != o.length;
  }), "Math", { imul: function imul(t, e) {
      var n = 65535,
          r = +t,
          o = +e,
          i = n & r,
          s = n & o;return 0 | i * s + ((n & r >>> 16) * s + i * (n & o >>> 16) << 16 >>> 0);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log10: function log10(t) {
      return Math.log(t) * Math.LOG10E;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log1p: n(101) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { log2: function log2(t) {
      return Math.log(t) / Math.LN2;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { sign: n(69) });
}, function (t, e, n) {
  var r = n(0),
      o = n(70),
      i = Math.exp;r(r.S + r.F * n(2)(function () {
    return !0;
  }), "Math", { sinh: function sinh(t) {
      return 1 > Math.abs(t = +t) ? (o(t) - o(-t)) / 2 : (i(t - 1) - i(-t - 1)) * (Math.E / 2);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(70),
      i = Math.exp;r(r.S, "Math", { tanh: function tanh(t) {
      var e = o(t = +t),
          n = o(-t);return e == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (e - n) / (i(t) + i(-t));
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Math", { trunc: function trunc(t) {
      return (0 < t ? Math.floor : Math.ceil)(t);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(32),
      i = String.fromCharCode,
      s = String.fromCodePoint;r(r.S + r.F * (!!s && 1 != s.length), "String", { fromCodePoint: function fromCodePoint() {
      for (var t, e = [], n = arguments.length, r = 0; n > r;) {
        if (t = +arguments[r++], o(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");e.push(65536 > t ? i(t) : i(55296 + ((t -= 65536) >> 10), t % 1024 + 56320));
      }return e.join("");
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(15),
      i = n(6);r(r.S, "String", { raw: function raw(t) {
      for (var e = o(t.raw), n = i(e.length), r = arguments.length, s = [], a = 0; n > a;) {
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
  var r = n(71)(!0);n(72)(String, "String", function (t) {
    this._t = t + "", this._i = 0;
  }, function () {
    var t,
        e = this._t,
        n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = r(e, n), this._i += t.length, { value: t, done: !1 });
  });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(71)(!1);r(r.P, "String", { codePointAt: function codePointAt(t) {
      return o(this, t);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(6),
      i = n(73),
      s = "endsWith";r(r.P + r.F * n(75)(s), "String", { endsWith: function endsWith(t) {
      var e = i(this, t, s),
          n = 1 < arguments.length ? arguments[1] : void 0,
          r = o(e.length),
          a = void 0 === n ? r : Math.min(o(n), r),
          u = t + "";return e.slice(a - u.length, a) === u;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(73),
      i = "includes";r(r.P + r.F * n(75)(i), "String", { includes: function includes(t) {
      return !!~o(this, t, i).indexOf(t, 1 < arguments.length ? arguments[1] : void 0);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.P, "String", { repeat: n(68) });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(6),
      i = n(73),
      s = "startsWith";r(r.P + r.F * n(75)(s), "String", { startsWith: function startsWith(t) {
      var e = i(this, t, s),
          n = o(Math.min(1 < arguments.length ? arguments[1] : void 0, e.length)),
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
      o = n(10),
      i = n(26);r(r.P + r.F * n(2)(function () {
    return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
        return 1;
      } });
  }), "Date", { toJSON: function toJSON() {
      var t = o(this),
          e = i(t);return "number" != typeof e || isFinite(e) ? t.toISOString() : null;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(205);r(r.P + r.F * (Date.prototype.toISOString !== o), "Date", { toISOString: o });
}, function (t, e, n) {
  "use strict";
  var r = n(2),
      o = Date.prototype.getTime,
      i = Date.prototype.toISOString,
      s = function s(t) {
    return 9 < t ? t : "0" + t;
  };t.exports = r(function () {
    return "0385-07-25T07:06:39.999Z" != i.call(new Date(-50000000000001));
  }) || !r(function () {
    i.call(new Date(NaN));
  }) ? function () {
    if (!isFinite(o.call(this))) throw RangeError("Invalid time value");var t = this,
        e = t.getUTCFullYear(),
        n = t.getUTCMilliseconds(),
        r = 0 > e ? "-" : 9999 < e ? "+" : "";return r + ("00000" + Math.abs(e)).slice(r ? -6 : -4) + "-" + s(t.getUTCMonth() + 1) + "-" + s(t.getUTCDate()) + "T" + s(t.getUTCHours()) + ":" + s(t.getUTCMinutes()) + ":" + s(t.getUTCSeconds()) + "." + (99 < n ? n : "0" + s(n)) + "Z";
  } : i;
}, function (t, e, n) {
  var r = Date.prototype,
      o = "Invalid Date",
      i = "toString",
      s = r[i],
      a = r.getTime;new Date(NaN) + "" != o && n(11)(r, i, function () {
    var t = a.call(this);return t == t ? s.call(this) : o;
  });
}, function (t, e, n) {
  var r = n(5)("toPrimitive"),
      o = Date.prototype;r in o || n(14)(o, r, n(208));
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      o = n(26),
      i = "number";t.exports = function (t) {
    if ("string" !== t && t !== i && "default" !== t) throw TypeError("Incorrect hint");return o(r(this), t != i);
  };
}, function (t, e, n) {
  var r = n(0);r(r.S, "Array", { isArray: n(51) });
}, function (t, e, n) {
  "use strict";
  var r = n(17),
      o = n(0),
      i = n(10),
      s = n(103),
      a = n(76),
      u = n(6),
      c = n(77),
      l = n(78);o(o.S + o.F * !n(52)(function (t) {
    Array.from(t);
  }), "Array", { from: function from(t) {
      var e,
          n,
          o,
          h,
          f = i(t),
          d = "function" == typeof this ? this : Array,
          p = arguments.length,
          g = 1 < p ? arguments[1] : void 0,
          m = void 0 !== g,
          v = 0,
          y = l(f);if (m && (g = r(g, 2 < p ? arguments[2] : void 0, 2)), null == y || d == Array && a(y)) for (n = new d(e = u(f.length)); e > v; v++) {
        c(n, v, m ? g(f[v], v) : f[v]);
      } else for (h = y.call(f), n = new d(); !(o = h.next()).done; v++) {
        c(n, v, m ? s(h, g, [o.value, v], !0) : o.value);
      }return n.length = v, n;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(77);r(r.S + r.F * n(2)(function () {
    function t() {}return !(Array.of.call(t) instanceof t);
  }), "Array", { of: function of() {
      for (var t = 0, e = arguments.length, n = new ("function" == typeof this ? this : Array)(e); e > t;) {
        o(n, t, arguments[t++]);
      }return n.length = e, n;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(15),
      i = [].join;r(r.P + r.F * (n(44) != Object || !n(16)(i)), "Array", { join: function join(t) {
      return i.call(o(this), void 0 === t ? "," : t);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(64),
      i = n(23),
      s = n(32),
      a = n(6),
      u = [].slice;r(r.P + r.F * n(2)(function () {
    o && u.call(o);
  }), "Array", { slice: function slice(t, e) {
      var n = a(this.length),
          r = i(this);if (e = void 0 === e ? n : e, "Array" == r) return u.call(this, t, e);for (var o = s(t, n), c = s(e, n), l = a(c - o), h = Array(l), f = 0; f < l; f++) {
        h[f] = "String" == r ? this.charAt(o + f) : this[o + f];
      }return h;
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(18),
      i = n(10),
      s = n(2),
      a = [].sort,
      u = [1, 2, 3];r(r.P + r.F * (s(function () {
    u.sort(void 0);
  }) || !s(function () {
    u.sort(null);
  }) || !n(16)(a)), "Array", { sort: function sort(t) {
      return void 0 === t ? a.call(i(this)) : a.call(i(this), o(t));
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(0),
      i = n(16)([].forEach, !0);r(r.P + r.F * !i, "Array", { forEach: function forEach(t) {
      return o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  var r = n(4),
      o = n(51),
      i = n(5)("species");t.exports = function (t) {
    var e;return o(t) && ("function" == typeof (e = t.constructor) && (e === Array || o(e.prototype)) && (e = void 0), r(e) && null === (e = e[i]) && (e = void 0)), void 0 === e ? Array : e;
  };
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(1);r(r.P + r.F * !n(16)([].map, !0), "Array", { map: function map(t) {
      return o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(2);r(r.P + r.F * !n(16)([].filter, !0), "Array", { filter: function filter(t) {
      return o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(3);r(r.P + r.F * !n(16)([].some, !0), "Array", { some: function some(t) {
      return o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(4);r(r.P + r.F * !n(16)([].every, !0), "Array", { every: function every(t) {
      return o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(105);r(r.P + r.F * !n(16)([].reduce, !0), "Array", { reduce: function reduce(t) {
      return o(this, t, arguments.length, arguments[1], !1);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(105);r(r.P + r.F * !n(16)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
      return o(this, t, arguments.length, arguments[1], !0);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(49)(!1),
      i = [].indexOf,
      s = !!i && 0 > 1 / [1].indexOf(1, -0);r(r.P + r.F * (s || !n(16)(i)), "Array", { indexOf: function indexOf(t) {
      return s ? i.apply(this, arguments) || 0 : o(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(15),
      i = n(19),
      s = n(6),
      a = [].lastIndexOf,
      u = !!a && 0 > 1 / [1].lastIndexOf(1, -0);r(r.P + r.F * (u || !n(16)(a)), "Array", { lastIndexOf: function lastIndexOf(t) {
      if (u) return a.apply(this, arguments) || 0;var e = o(this),
          n = s(e.length),
          r = n - 1;for (1 < arguments.length && (r = Math.min(r, i(arguments[1]))), 0 > r && (r = n + r); 0 <= r; r--) {
        if (r in e && e[r] === t) return r || 0;
      }return -1;
    } });
}, function (t, e, n) {
  var r = n(0);r(r.P, "Array", { copyWithin: n(106) }), n(36)("copyWithin");
}, function (t, e, n) {
  var r = n(0);r(r.P, "Array", { fill: n(79) }), n(36)("fill");
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(5),
      i = "find",
      s = !0;i in [] && [,][i](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { find: function find(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(i);
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(22)(6),
      i = "findIndex",
      s = !0;i in [] && [,][i](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { findIndex: function findIndex(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(i);
}, function (t, e, n) {
  n(41)("Array");
}, function (t, e, n) {
  var r = n(1),
      o = n(67),
      i = n(9).f,
      s = n(34).f,
      a = n(74),
      u = n(53),
      _c2 = r.RegExp,
      l = _c2,
      h = _c2.prototype,
      f = /a/g,
      d = /a/g,
      p = new _c2(f) !== f;if (n(8) && (!p || n(2)(function () {
    return d[n(5)("match")] = !1, _c2(f) != f || _c2(d) == d || "/a/i" != _c2(f, "i");
  }))) {
    _c2 = function c(t, e) {
      var n = this instanceof _c2,
          r = a(t),
          i = void 0 === e;return !n && r && t.constructor === _c2 && i ? t : o(p ? new l(r && !i ? t.source : t, e) : l((r = t instanceof _c2) ? t.source : t, r && i ? u.call(t) : e), n ? this : h, _c2);
    };for (var g = function g(t) {
      (t in _c2) || i(_c2, t, { configurable: !0, get: function get() {
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
  n(109);var r = n(3),
      o = n(53),
      i = n(8),
      s = "toString",
      a = /./[s],
      u = function u(t) {
    n(11)(RegExp.prototype, s, t, !0);
  };n(2)(function () {
    return "/a/b" != a.call({ source: "a", flags: "b" });
  }) ? u(function () {
    var t = r(this);return "/".concat(t.source, "/", "flags" in t ? t.flags : !i && t instanceof RegExp ? o.call(t) : void 0);
  }) : a.name != s && u(function () {
    return a.call(this);
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      o = n(6),
      i = n(82),
      s = n(54);n(55)("match", 1, function (t, e, n, a) {
    return [function (n) {
      var r = t(this),
          o = null == n ? void 0 : n[e];return void 0 === o ? new RegExp(n)[e](r + "") : o.call(n, r);
    }, function (t) {
      var e = a(n, t, this);if (e.done) return e.value;var u = r(t),
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var h, f = [], d = 0; null !== (h = s(u, c));) {
        var p = h[0] + "";f[d] = p, "" == p && (u.lastIndex = i(c, o(u.lastIndex), l)), d++;
      }return 0 == d ? null : f;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      o = n(10),
      i = n(6),
      s = n(19),
      a = n(82),
      u = n(54),
      c = Math.max,
      l = Math.min,
      h = Math.floor,
      f = /\$([$&`']|\d\d?|<[^>]*>)/g,
      d = /\$([$&`']|\d\d?)/g,
      p = function p(t) {
    return void 0 === t ? t : t + "";
  };n(55)("replace", 2, function (t, e, n, g) {
    function m(t, e, r, i, s, a) {
      var u = r + t.length,
          c = i.length,
          l = d;return void 0 !== s && (s = o(s), l = f), n.call(a, l, function (n, o) {
        var a;switch (o.charAt(0)) {case "$":
            return "$";case "&":
            return t;case "`":
            return e.slice(0, r);case "'":
            return e.slice(u);case "<":
            a = s[o.slice(1, -1)];break;default:
            var l = +o;if (0 == l) return n;if (l > c) {
              var f = h(l / 10);return 0 === f ? n : f <= c ? void 0 === i[f - 1] ? o.charAt(1) : i[f - 1] + o.charAt(1) : n;
            }a = i[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (r, o) {
      var i = t(this),
          s = null == r ? void 0 : r[e];return void 0 === s ? n.call(i + "", r, o) : s.call(r, i, o);
    }, function (t, e) {
      var o = g(n, t, this, e);if (o.done) return o.value;var h = r(t),
          f = this + "",
          d = "function" == typeof e;d || (e += "");var v = h.global;if (v) {
        var y = h.unicode;h.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(h, f)) && (w.push(b), v);) {
        "" == b[0] + "" && (h.lastIndex = a(f, i(h.lastIndex), y));
      }for (var S = "", x = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", k = c(l(s(b.index), f.length), 0), O = [], A = 1; A < b.length; A++) {
          O.push(p(b[A]));
        }var C = b.groups;if (d) {
          var I = [M].concat(O, k, f);void 0 !== C && I.push(C);var P = e.apply(void 0, I) + "";
        } else P = m(M, f, k, O, C, e);k >= x && (S += f.slice(x, k) + P, x = k + M.length);
      }return S + f.slice(x);
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      o = n(94),
      i = n(54);n(55)("search", 1, function (t, e, n, s) {
    return [function (n) {
      var r = t(this),
          o = null == n ? void 0 : n[e];return void 0 === o ? new RegExp(n)[e](r + "") : o.call(n, r);
    }, function (t) {
      var e = s(n, t, this);if (e.done) return e.value;var a = r(t),
          u = this + "",
          c = a.lastIndex;o(c, 0) || (a.lastIndex = 0);var l = i(a, u);return o(a.lastIndex, c) || (a.lastIndex = c), null === l ? -1 : l.index;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(74),
      o = n(3),
      i = n(47),
      s = n(82),
      a = n(6),
      u = n(54),
      c = n(81),
      l = n(2),
      h = Math.min,
      f = [].push,
      d = "split",
      p = "length",
      g = "lastIndex",
      m = 4294967295,
      v = !l(function () {
    RegExp(m, "y");
  });n(55)("split", 2, function (t, e, n, l) {
    var y;return y = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[p] || 2 != "ab"[d](/(?:ab)*/)[p] || 4 != "."[d](/(.?)(.?)/)[p] || 1 < "."[d](/()()/)[p] || ""[d](/.?/)[p] ? function (t, e) {
      var o = this + "";if (void 0 === t && 0 === e) return [];if (!r(t)) return n.call(o, t, e);for (var i, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), h = 0, d = void 0 === e ? m : e >>> 0, v = new RegExp(t.source, l + "g"); (i = c.call(v, o)) && !((s = v[g]) > h && (u.push(o.slice(h, i.index)), 1 < i[p] && i.index < o[p] && f.apply(u, i.slice(1)), a = i[0][p], h = s, u[p] >= d));) {
        v[g] === i.index && v[g]++;
      }return h === o[p] ? (a || !v.test("")) && u.push("") : u.push(o.slice(h)), u[p] > d ? u.slice(0, d) : u;
    } : "0"[d](void 0, 0)[p] ? function (t, e) {
      return void 0 === t && 0 === e ? [] : n.call(this, t, e);
    } : n, [function (n, r) {
      var o = t(this),
          i = null == n ? void 0 : n[e];return void 0 === i ? y.call(o + "", n, r) : i.call(n, o, r);
    }, function (t, e) {
      var r = l(y, t, this, e, y !== n);if (r.done) return r.value;var c = o(t),
          f = this + "",
          d = i(c, RegExp),
          p = c.unicode,
          g = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (v ? "y" : "g"),
          b = new d(v ? c : "^(?:" + c.source + ")", g),
          w = void 0 === e ? m : e >>> 0;if (0 == w) return [];if (0 === f.length) return null === u(b, f) ? [f] : [];for (var S = 0, x = 0, E = []; x < f.length;) {
        b.lastIndex = v ? x : 0;var M,
            k = u(b, v ? f : f.slice(x));if (null === k || (M = h(a(b.lastIndex + (v ? 0 : x)), f.length)) === S) x = s(f, x, p);else {
          if (E.push(f.slice(S, x)), E.length === w) return E;for (var O = 1; O <= k.length - 1; O++) {
            if (E.push(k[O]), E.length === w) return E;
          }x = S = M;
        }
      }return E.push(f.slice(S)), E;
    }];
  });
}, function (t, e, n) {
  var r = n(1),
      o = n(83).set,
      i = r.MutationObserver || r.WebKitMutationObserver,
      s = r.process,
      a = r.Promise,
      u = "process" == n(23)(s);t.exports = function () {
    var t,
        e,
        n,
        c = function c() {
      var r, o;for (u && (r = s.domain) && r.exit(); t;) {
        o = t.fn, t = t.next;try {
          o();
        } catch (o) {
          throw t ? n() : e = void 0, o;
        }
      }e = void 0, r && r.enter();
    };if (u) n = function n() {
      s.nextTick(c);
    };else if (!i || r.navigator && r.navigator.standalone) {
      if (a && a.resolve) {
        var l = a.resolve(void 0);n = function n() {
          l.then(c);
        };
      } else n = function n() {
        o.call(r, c);
      };
    } else {
      var h = !0,
          f = document.createTextNode("");new i(c).observe(f, { characterData: !0 }), n = function n() {
        f.data = h = !h;
      };
    }return function (r) {
      var o = { fn: r, next: void 0 };e && (e.next = o), t || (t = o, n()), e = o;
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
  var r = n(113),
      o = n(37),
      i = "Map";t.exports = n(58)(i, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { get: function get(t) {
      var e = r.getEntry(o(this, i), t);return e && e.v;
    }, set: function set(t, e) {
      return r.def(o(this, i), 0 === t ? 0 : t, e);
    } }, r, !0);
}, function (t, e, n) {
  "use strict";
  var r = n(113),
      o = n(37);t.exports = n(58)("Set", function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return r.def(o(this, "Set"), t = 0 === t ? 0 : t, t);
    } }, r);
}, function (t, e, n) {
  "use strict";
  var r,
      o = n(1),
      i = n(22)(0),
      s = n(11),
      a = n(27),
      u = n(93),
      c = n(114),
      l = n(4),
      h = n(37),
      f = n(37),
      d = !o.ActiveXObject && "ActiveXObject" in o,
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
      w = t.exports = n(58)(p, y, b, c, !0, !0);f && d && (u((r = c.getConstructor(y, p)).prototype, b), a.NEED = !0, i(["delete", "has", "get", "set"], function (t) {
    var e = w.prototype,
        n = e[t];s(e, t, function (e, o) {
      if (l(e) && !m(e)) {
        this._f || (this._f = new r());var i = this._f[t](e, o);return "set" == t ? this : i;
      }return n.call(this, e, o);
    });
  }));
}, function (t, e, n) {
  "use strict";
  var r = n(114),
      o = n(37),
      i = "WeakSet";n(58)(i, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return r.def(o(this, i), t, !0);
    } }, r, !1, !0);
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(59),
      i = n(84),
      s = n(3),
      a = n(32),
      u = n(6),
      c = n(4),
      l = n(1).ArrayBuffer,
      h = n(47),
      f = i.ArrayBuffer,
      d = i.DataView,
      p = o.ABV && l.isView,
      g = f.prototype.slice,
      m = o.VIEW,
      v = "ArrayBuffer";r(r.G + r.W + r.F * (l !== f), { ArrayBuffer: f }), r(r.S + r.F * !o.CONSTR, v, { isView: function isView(t) {
      return p && p(t) || c(t) && m in t;
    } }), r(r.P + r.U + r.F * n(2)(function () {
    return !new f(2).slice(1, void 0).byteLength;
  }), v, { slice: function slice(t, e) {
      if (void 0 !== g && void 0 === e) return g.call(s(this), t);for (var n = s(this).byteLength, r = a(t, n), o = a(void 0 === e ? n : e, n), i = new (h(this, f))(u(o - r)), c = new d(this), l = new d(i), p = 0; r < o;) {
        l.setUint8(p++, c.getUint8(r++));
      }return i;
    } }), n(41)(v);
}, function (t, e, n) {
  var r = n(0);r(r.G + r.W + r.F * !n(59).ABV, { DataView: n(84).DataView });
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
      o = n(18),
      i = n(3),
      s = (n(1).Reflect || {}).apply,
      a = Function.apply;r(r.S + r.F * !n(2)(function () {
    s(function () {});
  }), "Reflect", { apply: function apply(t, e, n) {
      var r = o(t),
          u = i(n);return s ? s(r, e, u) : a.call(r, e, u);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(33),
      i = n(18),
      s = n(3),
      a = n(4),
      u = n(2),
      c = n(95),
      l = (n(1).Reflect || {}).construct,
      h = u(function () {
    function t() {}return !(l(function () {}, [], t) instanceof t);
  }),
      f = !u(function () {
    l(function () {});
  });r(r.S + r.F * (h || f), "Reflect", { construct: function construct(t, e) {
      i(t), s(e);var n = 3 > arguments.length ? t : i(arguments[2]);if (f && !h) return l(t, e, n);if (t == n) {
        switch (e.length) {case 0:
            return new t();case 1:
            return new t(e[0]);case 2:
            return new t(e[0], e[1]);case 3:
            return new t(e[0], e[1], e[2]);case 4:
            return new t(e[0], e[1], e[2], e[3]);}var r = [null];return r.push.apply(r, e), new (c.apply(t, r))();
      }var u = n.prototype,
          d = o(a(u) ? u : Object.prototype),
          p = Function.apply.call(t, d, e);return a(p) ? p : d;
    } });
}, function (t, e, n) {
  var r = n(9),
      o = n(0),
      i = n(3),
      s = n(26);o(o.S + o.F * n(2)(function () {
    Reflect.defineProperty(r.f({}, 1, { value: 1 }), 1, { value: 2 });
  }), "Reflect", { defineProperty: function defineProperty(t, e, n) {
      i(t), e = s(e, !0), i(n);try {
        return r.f(t, e, n), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(20).f,
      i = n(3);r(r.S, "Reflect", { deleteProperty: function deleteProperty(t, e) {
      var n = o(i(t), e);return (!n || n.configurable) && delete t[e];
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(3),
      i = function i(t) {
    this._t = o(t), this._i = 0;var e,
        n = this._k = [];for (e in t) {
      n.push(e);
    }
  };n(102)(i, "Object", function () {
    var t,
        e = this,
        n = e._k;do {
      if (e._i >= n.length) return { value: void 0, done: !0 };
    } while (!((t = n[e._i++]) in e._t));return { value: t, done: !1 };
  }), r(r.S, "Reflect", { enumerate: function enumerate(t) {
      return new i(t);
    } });
}, function (t, e, n) {
  var r = n(20),
      o = n(35),
      i = n(13),
      s = n(0),
      a = n(4),
      u = n(3);s(s.S, "Reflect", { get: function t(e, n) {
      var s,
          c,
          l = 3 > arguments.length ? e : arguments[2];return u(e) === l ? e[n] : (s = r.f(e, n)) ? i(s, "value") ? s.value : void 0 === s.get ? void 0 : s.get.call(l) : a(c = o(e)) ? t(c, n, l) : void 0;
    } });
}, function (t, e, n) {
  var r = n(20),
      o = n(0),
      i = n(3);o(o.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, e) {
      return r.f(i(t), e);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(35),
      i = n(3);r(r.S, "Reflect", { getPrototypeOf: function getPrototypeOf(t) {
      return o(i(t));
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Reflect", { has: function has(t, e) {
      return e in t;
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(3),
      i = Object.isExtensible;r(r.S, "Reflect", { isExtensible: function isExtensible(t) {
      return o(t), !i || i(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Reflect", { ownKeys: n(116) });
}, function (t, e, n) {
  var r = n(0),
      o = n(3),
      i = Object.preventExtensions;r(r.S, "Reflect", { preventExtensions: function preventExtensions(t) {
      o(t);try {
        return i && i(t), !0;
      } catch (t) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var r = n(9),
      o = n(20),
      i = n(35),
      s = n(13),
      a = n(0),
      u = n(28),
      c = n(3),
      l = n(4);a(a.S, "Reflect", { set: function t(e, n, a) {
      var h,
          f,
          d = 4 > arguments.length ? e : arguments[3],
          p = o.f(c(e), n);if (!p) {
        if (l(f = i(e))) return t(f, n, a, d);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(d)) return !1;if (h = o.f(d, n)) {
          if (h.get || h.set || !1 === h.writable) return !1;h.value = a, r.f(d, n, h);
        } else r.f(d, n, u(0, a));return !0;
      }return void 0 !== p.set && (p.set.call(d, a), !0);
    } });
}, function (t, e, n) {
  var r = n(0),
      o = n(65);o && r(r.S, "Reflect", { setPrototypeOf: function setPrototypeOf(t, e) {
      o.check(t, e);try {
        return o.set(t, e), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  n(268), t.exports = n(7).Array.includes;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(49)(!0);r(r.P, "Array", { includes: function includes(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (t, e, n) {
  n(270), t.exports = n(7).Array.flatMap;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(271),
      i = n(10),
      s = n(6),
      a = n(18),
      u = n(104);r(r.P, "Array", { flatMap: function flatMap(t) {
      var e,
          n,
          r = i(this);return a(t), e = s(r.length), n = u(r, 0), o(n, r, r, e, 0, 1, t, arguments[1]), n;
    } }), n(36)("flatMap");
}, function (t, e, n) {
  "use strict";
  var r = n(51),
      o = n(4),
      i = n(6),
      s = n(17),
      a = n(5)("isConcatSpreadable");t.exports = function t(e, n, u, c, l, h, f, d) {
    for (var p, g, m = l, v = 0, y = !!f && s(f, d, 3); v < c;) {
      if (v in u) {
        if (p = y ? y(u[v], v, n) : u[v], g = !1, o(p) && (g = void 0 === (g = p[a]) ? r(p) : !!g), g && 0 < h) m = t(e, n, p, i(p.length), m, h - 1) - 1;else {
          if (9007199254740991 <= m) throw TypeError();e[m] = p;
        }m++;
      }v++;
    }return m;
  };
}, function (t, e, n) {
  n(273), t.exports = n(7).String.padStart;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(117),
      i = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);r(r.P + r.F * s, "String", { padStart: function padStart(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (t, e, n) {
  n(275), t.exports = n(7).String.padEnd;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(117),
      i = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);r(r.P + r.F * s, "String", { padEnd: function padEnd(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0, !1);
    } });
}, function (t, e, n) {
  n(277), t.exports = n(7).String.trimLeft;
}, function (t, e, n) {
  "use strict";
  n(39)("trimLeft", function (t) {
    return function () {
      return t(this, 1);
    };
  }, "trimStart");
}, function (t, e, n) {
  n(279), t.exports = n(7).String.trimRight;
}, function (t, e, n) {
  "use strict";
  n(39)("trimRight", function (t) {
    return function () {
      return t(this, 2);
    };
  }, "trimEnd");
}, function (t, e, n) {
  n(281), t.exports = n(61).f("asyncIterator");
}, function (t, e, n) {
  n(89)("asyncIterator");
}, function (t, e, n) {
  n(283), t.exports = n(7).Object.getOwnPropertyDescriptors;
}, function (t, e, n) {
  var r = n(0),
      o = n(116),
      i = n(15),
      s = n(20),
      a = n(77);r(r.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var e, n, r = i(t), u = s.f, c = o(r), l = {}, h = 0; c.length > h;) {
        void 0 !== (n = u(r, e = c[h++])) && a(l, e, n);
      }return l;
    } });
}, function (t, e, n) {
  n(285), t.exports = n(7).Object.values;
}, function (t, e, n) {
  var r = n(0),
      o = n(118)(!1);r(r.S, "Object", { values: function values(t) {
      return o(t);
    } });
}, function (t, e, n) {
  n(287), t.exports = n(7).Object.entries;
}, function (t, e, n) {
  var r = n(0),
      o = n(118)(!0);r(r.S, "Object", { entries: function entries(t) {
      return o(t);
    } });
}, function (t, e, n) {
  "use strict";
  n(110), n(289), t.exports = n(7).Promise.finally;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(7),
      i = n(1),
      s = n(47),
      a = n(112);r(r.P + r.R, "Promise", { finally: function _finally(t) {
      var e = s(this, o.Promise || i.Promise),
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
  n(291), n(292), n(293), t.exports = n(7);
}, function (t, e, n) {
  var r = n(1),
      o = n(0),
      i = n(57),
      s = [].slice,
      a = /MSIE .\./.test(i),
      u = function u(t) {
    return function (e, n) {
      var r = 2 < arguments.length,
          o = !!r && s.call(arguments, 2);return t(r ? function () {
        ("function" == typeof e ? e : Function(e)).apply(this, o);
      } : e, n);
    };
  };o(o.G + o.B + o.F * a, { setTimeout: u(r.setTimeout), setInterval: u(r.setInterval) });
}, function (t, e, n) {
  var r = n(0),
      o = n(83);r(r.G + r.B, { setImmediate: o.set, clearImmediate: o.clear });
}, function (t, e, n) {
  for (var r = n(80), o = n(31), i = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), h = c("toStringTag"), f = u.Array, d = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = o(d), g = 0; g < p.length; g++) {
    var m,
        v = p[g],
        y = d[v],
        b = s[v],
        w = b && b.prototype;if (w && (w[l] || a(w, l, f), w[h] || a(w, h, v), u[v] = f, y)) for (m in r) {
      w[m] || i(w, m, r[m], !0);
    }
  }
}, function (t) {
  var e = function (t) {
    "use strict";
    function e(t, e, n) {
      return Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }), t[e];
    }function n(t, e, n, r) {
      var i = e && e.prototype instanceof o ? e : o,
          s = Object.create(i.prototype),
          a = new d(r || []);return s._invoke = c(t, n, a), s;
    }function r(t, e, n) {
      try {
        return { type: "normal", arg: t.call(e, n) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }function o() {}function i() {}function s() {}function a(t) {
      ["next", "throw", "return"].forEach(function (n) {
        e(t, n, function (t) {
          return this._invoke(n, t);
        });
      });
    }function u(t, e) {
      function n(o, i, s, a) {
        var u = r(t[o], t, i);if ("throw" !== u.type) {
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
      }var o;this._invoke = function (t, r) {
        function i() {
          return new e(function (e, o) {
            n(t, r, e, o);
          });
        }return o = o ? o.then(i, i) : i();
      };
    }function c(t, e, n) {
      var o = x;return function (i, s) {
        if (o === M) throw new Error("Generator is already running");if (o === k) {
          if ("throw" === i) throw s;return { value: void 0, done: !0 };
        }for (n.method = i, n.arg = s;;) {
          var a = n.delegate;if (a) {
            var u = l(a, n);if (u) {
              if (u === O) continue;return u;
            }
          }if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === x) throw o = k, n.arg;n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);o = M;var c = r(t, e, n);if ("normal" === c.type) {
            if (o = n.done ? k : E, c.arg === O) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (o = k, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(t, e) {
      var n = t.iterator[e.method];if (void 0 === n) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, l(t, e), "throw" === e.method)) return O;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return O;
      }var o = r(n, t.iterator, e.arg);if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, O;var i = o.arg;return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, O) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, O);
    }function h(t) {
      var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }function f(t) {
      var e = t.completion || {};e.type = "normal", delete e.arg, t.completion = e;
    }function d(t) {
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
        O = {},
        A = {};A[b] = function () {
      return this;
    };var C = Object.getPrototypeOf,
        I = C && C(C(p([])));I && I !== m && v.call(I, b) && (A = I);var P = s.prototype = o.prototype = Object.create(A);return i.prototype = P.constructor = s, s.constructor = i, i.displayName = e(s, S, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;return !!e && (e === i || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (_defaults(t, s), e(t, S, "GeneratorFunction")), t.prototype = Object.create(P), t;
    }, t.awrap = function (t) {
      return { __await: t };
    }, a(u.prototype), u.prototype[w] = function () {
      return this;
    }, t.AsyncIterator = u, t.async = function (e, r, o, i, s) {
      void 0 === s && (s = Promise);var a = new u(n(e, r, o, i), s);return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, a(P), e(P, S, "Generator"), P[b] = function () {
      return this;
    }, P.toString = function () {
      return "[object Generator]";
    }, t.keys = function (t) {
      var e = [];for (var n in t) {
        e.push(n);
      }return e.reverse(), function n() {
        for (; e.length;) {
          var r = e.pop();if (r in t) return n.value = r, n.done = !1, n;
        }return n.done = !0, n;
      };
    }, t.values = p, d.prototype = { constructor: d, reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(f), !t) for (var e in this) {
          "t" === e.charAt(0) && v.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
        }
      }, stop: function stop() {
        this.done = !0;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
      }, dispatchException: function dispatchException(t) {
        function e(e, r) {
          return i.type = "throw", i.arg = t, n.next = e, r && (n.method = "next", n.arg = void 0), !!r;
        }if (this.done) throw t;for (var n = this, r = this.tryEntries.length - 1; 0 <= r; --r) {
          var o = this.tryEntries[r],
              i = o.completion;if ("root" === o.tryLoc) return e("end");if (o.tryLoc <= this.prev) {
            var s = v.call(o, "catchLoc"),
                a = v.call(o, "finallyLoc");if (s && a) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            } else if (s) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
            } else {
              if (!a) throw new Error("try statement without catch or finally");if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            }
          }
        }
      }, abrupt: function abrupt(t, e) {
        for (var n, r = this.tryEntries.length - 1; 0 <= r; --r) {
          if ((n = this.tryEntries[r]).tryLoc <= this.prev && v.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var o = n;break;
          }
        }o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);var i = o ? o.completion : {};return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, O) : this.complete(i);
      }, complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), O;
      }, finish: function finish(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).finallyLoc === t) return this.complete(e.completion, e.afterLoc), f(e), O;
        }
      }, catch: function _catch(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).tryLoc === t) {
            var r = e.completion;if ("throw" === r.type) {
              var o = r.arg;f(e);
            }return o;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function delegateYield(t, e, n) {
        return this.delegate = { iterator: p(t), resultName: e, nextLoc: n }, "next" === this.method && (this.arg = void 0), O;
      } }, t;
  }(t.exports);try {
    regeneratorRuntime = e;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(e);
  }
}, function (t, e, n) {
  n(296), t.exports = n(119).global;
}, function (t, e, n) {
  var r = n(297);r(r.G, { global: n(85) });
}, function (t, e, n) {
  var r = n(85),
      o = n(119),
      i = n(298),
      s = n(300),
      a = n(307),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        h,
        f,
        d = t & c.F,
        p = t & c.G,
        g = t & c.S,
        m = t & c.P,
        v = t & c.B,
        y = t & c.W,
        b = p ? o : o[e] || (o[e] = {}),
        w = b[u],
        S = p ? r : g ? r[e] : (r[e] || {})[u];for (l in p && (n = e), n) {
      (h = !d && S && void 0 !== S[l]) && a(b, l) || (f = h ? S[l] : n[l], b[l] = p && "function" != typeof S[l] ? n[l] : v && h ? i(f, r) : y && S[l] == f ? function (t) {
        var e = function e(_e3, n, r) {
          if (this instanceof t) {
            switch (arguments.length) {case 0:
                return new t();case 1:
                return new t(_e3);case 2:
                return new t(_e3, n);}return new t(_e3, n, r);
          }return t.apply(this, arguments);
        };return e[u] = t[u], e;
      }(f) : m && "function" == typeof f ? i(Function.call, f) : f, m && ((b.virtual || (b.virtual = {}))[l] = f, t & c.R && w && !w[l] && s(w, l, f)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t, e, n) {
  var r = n(299);t.exports = function (t, e, n) {
    return r(t), void 0 === e ? t : 1 === n ? function (n) {
      return t.call(e, n);
    } : 2 === n ? function (n, r) {
      return t.call(e, n, r);
    } : 3 === n ? function (n, r, o) {
      return t.call(e, n, r, o);
    } : function () {
      return t.apply(e, arguments);
    };
  };
}, function (t) {
  t.exports = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
  };
}, function (t, e, n) {
  var r = n(301),
      o = n(306);t.exports = n(87) ? function (t, e, n) {
    return r.f(t, e, o(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(302),
      o = n(303),
      i = n(305),
      s = Object.defineProperty;e.f = n(87) ? Object.defineProperty : function (t, e, n) {
    if (r(t), e = i(e, !0), r(n), o) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var r = n(86);t.exports = function (t) {
    if (!r(t)) throw TypeError(t + " is not an object!");return t;
  };
}, function (t, e, n) {
  t.exports = !n(87) && !n(120)(function () {
    return 7 != Object.defineProperty(n(304)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var r = n(86),
      o = n(85).document,
      i = r(o) && r(o.createElement);t.exports = function (t) {
    return i ? o.createElement(t) : {};
  };
}, function (t, e, n) {
  var r = n(86);t.exports = function (t, e) {
    if (!r(t)) return t;var n, o;if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;throw TypeError("Can't convert object to primitive value");
  };
}, function (t) {
  t.exports = function (t, e) {
    return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
  };
}, function (t) {
  var e = {}.hasOwnProperty;t.exports = function (t, n) {
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
  "use strict";
  function r(t) {
    console.log("[OpenAudioMc] " + t);
  }function o(t) {
    var e = document.querySelectorAll("[data-type=card]");var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _t2 = _step.value;
        _t2.style.display = "none";
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
  }function i(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function s(t) {
    return "string" != typeof t && (t += ""), t;
  }function a(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return tt.iterable && (e[Symbol.iterator] = function () {
      return e;
    }), e;
  }function u(t) {
    this.map = {}, t instanceof u ? t.forEach(function (t, e) {
      this.append(e, t);
    }, this) : Array.isArray(t) ? t.forEach(function (t) {
      this.append(t[0], t[1]);
    }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
      this.append(e, t[e]);
    }, this);
  }function c(t) {
    return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0);
  }function l(t) {
    return new Promise(function (e, n) {
      t.onload = function () {
        e(t.result);
      }, t.onerror = function () {
        n(t.error);
      };
    });
  }function h(t) {
    var e = new FileReader(),
        n = l(e);return e.readAsArrayBuffer(t), n;
  }function f(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function d() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : tt.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : tt.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : tt.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : tt.arrayBuffer && tt.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = f(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : tt.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || nt(t)) ? this._bodyArrayBuffer = f(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : tt.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, tt.blob && (this.blob = function () {
      var t = c(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? c(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h);
    }), this.text = function () {
      var t = c(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            n = l(e);return e.readAsText(t), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), n = Array(e.length), r = 0; r < e.length; r++) {
          n[r] = z(e[r]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, tt.formData && (this.formData = function () {
      return this.text().then(g);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function p(t, e) {
    var n = (e = e || {}).body;if (t instanceof p) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new u(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new u(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < rt.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function g(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var n = t.split("="),
            r = n.shift().replace(/\+/g, " "),
            o = n.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(r), decodeURIComponent(o));
      }
    }), e;
  }function m(t) {
    var e = new u();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var n = t.split(":"),
          r = n.shift().trim();if (r) {
        var o = n.join(":").trim();e.append(r, o);
      }
    }), e;
  }function v(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new u(e.headers), this.url = e.url || "", this._initBody(t);
  }function y(t, e) {
    return new Promise(function (n, r) {
      function o() {
        s.abort();
      }var i = new p(t, e);if (i.signal && i.signal.aborted) return r(new it("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var t = { status: s.status, statusText: s.statusText, headers: m(s.getAllResponseHeaders() || "") };t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");var e = "response" in s ? s.response : s.responseText;n(new v(e, t));
      }, s.onerror = function () {
        r(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        r(new TypeError("Network request failed"));
      }, s.onabort = function () {
        r(new it("Aborted", "AbortError"));
      }, s.open(i.method, i.url, !0), "include" === i.credentials ? s.withCredentials = !0 : "omit" === i.credentials && (s.withCredentials = !1), "responseType" in s && tt.blob && (s.responseType = "blob"), i.headers.forEach(function (t, e) {
        s.setRequestHeader(e, t);
      }), i.signal && (i.signal.addEventListener("abort", o), s.onreadystatechange = function () {
        4 === s.readyState && i.signal.removeEventListener("abort", o);
      }), s.send(void 0 === i._bodyInit ? null : i._bodyInit);
    });
  }function b(t) {
    console.log("[OpenAudioMc] " + t);
  }function w(t, e) {
    var n = e.media.loop,
        r = e.media.startInstant,
        o = e.media.mediaId,
        i = e.media.source,
        s = e.media.doPickup,
        a = e.media.fadeTime,
        u = e.distance,
        c = e.media.flag,
        l = e.maxDistance;var h = 100;null != e.media.volume && 0 != e.media.volume && (h = e.media.volume), t.getMediaManager().destroySounds(o, !1, !0);var f = new Z(o);f.trackable = !0;var d = new ft(i);if (d.openAudioMc = t, d.setOa(t), t.getMediaManager().mixer.addChannel(f), f.addSound(d), f.setChannelVolume(0), d.setLooping(n), f.setTag(o), 0 !== l) {
      var _t3 = this.convertDistanceToVolume(l, u);f.setTag("SPECIAL"), f.maxDistance = l, f.fadeChannel(_t3, a);
    } else f.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (f.setChannelVolume(h), f.updateFromMasterVolume()) : (f.updateFromMasterVolume(), f.fadeChannel(h, a));
    }, 1);f.setTag(c), t.getMediaManager().mixer.updateCurrent(), d.finalize().then(function () {
      s && d.startDate(r, !0), d.finish();
    });
  }function S(t, e) {
    var n = e.message;t.notificationModule.sendNotification(e.title, n), new $("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + n);
  }function x(t, e) {
    var n = parseInt(e.protocolRevision);if (console.log("[OpenAudioMc] Received PROTOCOL revision update"), 2 <= n && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0), 3 <= n && (console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks"), t.socketModule.supportsYoutube = !0), 4 <= n && (console.log("[OpenAudioMc] PROTO rev => 4, enabling volume callbacks"), t.mediaManager.startVolumeWatcher(t)), 3 > n) {
      new $("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function E(t, e) {
    var n = e.volume;t.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function M(t, e) {
    t.getMediaManager().destroySounds(e.soundId, e.all, !1, e.fadeTime);
  }function k(t, e) {
    var n = e.lights,
        r = e.hueColor,
        o = "rgba(" + r.r + "," + r.g + "," + r.b + "," + function (t, e, n) {
      return (t - e[0]) * (n[1] - n[0]) / (e[1] - e[0]) + n[0];
    }(r.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(n, o);
  }function O(t, e) {
    function n(t, e) {
      return G((t - e) / t * 100);
    }var r = e.mediaOptions.target,
        o = e.mediaOptions.fadeTime,
        i = e.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = t.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _e4 = _step2.value;
        _e4.hasTag(r) && _e4.fadeChannel(n(_e4.maxDistance, i), o);
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
  }function A(t, e) {
    var n = e.x,
        r = e.y,
        o = e.z,
        i = e.pitch,
        s = e.yaw;t.world.player.updateLocation(new mt(n, r, o), i, s);
  }function C(t, e) {
    var n = e.clientSpeaker,
        r = new mt(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        o = new vt(n.id, n.source, r, n.type, n.maxDistance, n.startInstant, t);t.world.addSpeaker(n.id, o);
  }function I(t, e) {
    var n = e.clientSpeaker;t.world.removeSpeaker(n.id);
  }function P(t, e) {
    if (e.clear) console.log("[OpenAudioMc] Clearing pre-fetched resources"), setTimeout(function () {
      lt = {};
    }, 2500);else {
      var _t4 = e.source;console.log("[OpenAudioMc] Pre-fetching resource.."), setTimeout(function () {
        !function (t) {
          t = ht.translate(t);var e = new Audio();e.autoplay = !1, e.src = t, e.load(), lt[t] = e;
        }(_t4);
      }, 2500);
    }
  }function T(t, e) {
    t.voiceModule.enable(e.streamServer, e.streamKey, e.radius);
  }function _(t, e) {
    t.voiceModule.addPeer(e.targetUuid, e.targetPlayerName, e.targetStreamKey, e.location);
  }function R(t, e) {
    null == e.streamKey ? t.voiceModule.removeAllPeers() : t.voiceModule.removePeer(e.streamKey);
  }function N(t, e) {
    for (var _n, _r = 0; _r < e.updateSet.length; _r++) {
      _n = e.updateSet[_r], t.voiceModule.peerLocationUpdate(_n.streamKey, _n.x, _n.y, _n.z);
    }
  }function F() {
    document.getElementById("vc-mic-mute").click();
  }function L(t, e, n) {
    y(st.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: e, message: t }) }).then(function (t) {
      null != n && n(), t.json().then(function (t) {
        console.log("Reported error. Reponse was: " + JSON.stringify(t));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function B(t, e) {
    function n(t, e) {
      var n = 0,
          o = e || t.innerHTML,
          i = o.length;wt.push(window.setInterval(function () {
        n >= i && (n = 0), o = r(o, n), t.innerHTML = o, n++;
      }, 0));
    }function r(t, e) {
      var n = z(function (t, e) {
        return K(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + n + t.substr(e + 1, t.length);
    }var o = void 0,
        i = void 0,
        s = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t5 = 0; _t5 < s; _t5++) {
        i = e.childNodes[_t5], 3 === i.nodeType && (o = document.createElement("span"), o.innerHTML = i.nodeValue, e.replaceChild(o, i), n(o));
      }
    } else n(e, t);
  }function D(t, e) {
    var n = e.length,
        r = document.createElement("span"),
        o = !1;for (var _i2 = 0; _i2 < n; _i2++) {
      r.style.cssText += St[e[_i2]] + ";", "§k" === e[_i2] && (B(t, r), o = !0);
    }return o || (r.innerHTML = t), r;
  }function j(t) {
    var e,
        n,
        r = t.match(/&.{1}/g) || [],
        o = [],
        i = [],
        s = document.createDocumentFragment(),
        a = r.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e5 = 0; _e5 < a; _e5++) {
      o.push(t.indexOf(r[_e5])), t = t.replace(r[_e5], "\0\0");
    }0 !== o[0] && s.appendChild(D(t.substring(0, o[0]), []));for (var _u = 0; _u < a; _u++) {
      if (2 === (n = o[_u + 1] - o[_u])) {
        for (; 2 == n;) {
          i.push(r[_u]), _u++, n = o[_u + 1] - o[_u];
        }i.push(r[_u]);
      } else i.push(r[_u]);-1 < i.lastIndexOf("§r") && (i = i.slice(i.lastIndexOf("§r") + 1)), e = t.substring(o[_u], o[_u + 1]), s.appendChild(D(e, i));
    }return s;
  }function U(t) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(t);
    });
  }function V() {
    kt.canStart && kt.start();
  }function H(t) {
    var e = document.querySelectorAll("[data-type=voice-card]");var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _t6 = _step3.value;
        _t6.style.display = "none";
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
  }var z = String.fromCharCode,
      G = Math.round,
      K = Math.floor;n.r(e), n(122);
  var W = function () {
    function W() {
      _classCallCheck(this, W);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1, this.lastRecordedPing = 0;
    }

    W.prototype.sync = function sync(t, e) {
      this.serverLocale = e;var n = new Date(t),
          r = new Date();this.isServerAhead = n.getTime() > r.getTime(), this.msOffset = this.isServerAhead ? n.getTime() - r.getTime() : r.getTime() - n.getTime(), this.hasSynced = !0;
    };

    W.prototype.localizeTime = function localizeTime(t) {
      this.hasSynced || new Date().getTime();var e = (this.getPredictedTime().getTime() - t) / 1e3;return this.lastRecordedPing = 1e3 * e, this.onPing(), e;
    };

    W.prototype.onPing = function onPing() {
      r("Current round trip time is " + this.lastRecordedPing + "MS");
    };

    W.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return W;
  }();

  var q = function () {
    function q(t) {
      _classCallCheck(this, q);

      this.fallback = "No message provided in oa+", this.main = t, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    q.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return q;
  }();

  var Y = function () {
    function Y(t) {
      _classCallCheck(this, Y);

      this.openAudioMc = t;
    }

    Y.prototype.changeColor = function changeColor(t, e) {
      var n = function (t) {
        return t = t.replace("#", ""), "rgb(" + parseInt(t.substring(0, 2), 16) + ", " + parseInt(t.substring(2, 4), 16) + ", " + parseInt(t.substring(4, 6), 16) + ")";
      }(t);document.querySelectorAll("*").forEach(function (t) {
        var r = window.getComputedStyle(t);Object.keys(r).reduce(function (o, i) {
          var s = r[i],
              a = r.getPropertyValue(s);if (0 <= a.indexOf(n)) {
            var _r2 = a.replace(n, e);0 <= s.indexOf("border-top") ? t.style.borderTop = "2px solid " + _r2 : t.style[s] = _r2;
          }
        });
      });
    };

    Y.prototype.setMessage = function setMessage(t) {
      document.getElementById("status-message").innerHTML = t;
    };

    Y.prototype.openApp = function openApp() {
      o(J.MAIN_UI), this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    };

    Y.prototype.kickScreen = function kickScreen(t) {
      o(J.KICKED), document.getElementById("kick-message").innerHTML = t;
    };

    return Y;
  }();

  var J = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" },
      X = "rtc_initialized";
  var $ = function () {
    function $(t, e) {
      _classCallCheck(this, $);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    $.prototype.show = function show(t) {
      var _this = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("p-3"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
        t.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _t7 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_t7);
        }, this.option.closeTime);
      }return this;
    };

    $.prototype.onClick = function onClick(t) {
      this.alertBox.onclick = t;
    };

    $.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(t), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return $;
  }();

  var Q = function () {
    function Q(t, e) {
      var _this3 = this;

      _classCallCheck(this, Q);

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

    Q.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", document.getElementById("hue-setup-box").style.display = "", document.getElementById("hue-bridge-menu-button").onclick = this.openModal, this.isSsl) return void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup(), this.requestBox = new $("#alert-area", { persistent: !0, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;">We found a hue bridge in your network<br/><br/><br/><a id="noti-perm-request-link" class="alert-message-button">hue settings</a></div>'), this.requestBox.onClick(this.openModal);
      } else this.openAudioMc.log("No hue bridges found");
    };

    Q.prototype.openModal = function openModal() {
      document.getElementById("hue-modal-parent").style.display = "";
    };

    Q.prototype.startSetup = function startSetup() {
      var t = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (e) {
        t.linkBridge(e.internalipaddress);
      });
    };

    Q.prototype.onConnect = function onConnect() {
      var _this4 = this;

      this.currentUser.getConfig().then(function (t) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this4.openAudioMc.getHueConfiguration().setBridgeName(t.name), _this4.currentUser.getLights().then(function (t) {
          var e = [];for (var _n2 in t) {
            t.hasOwnProperty(_n2) && e.push({ name: t[_n2].name, id: parseInt(_n2) });
          }_this4.openAudioMc.getHueConfiguration().setLightNamesAndIds(e);null != Cookies.get("hue-state") && (_this4.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this4.openAudioMc.getHueConfiguration().applyState(), _this4.openAudioMc.getHueConfiguration().updateState();
        }), _this4.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    Q.prototype.updateSelector = function updateSelector(t) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = t;
      }, 200);
    };

    Q.prototype.colorToHueHsv = function colorToHueHsv(t) {
      var e = this.color(t).toHSV();return { on: 0 != 2 * e.alpha * 127.5, hue: K(65535 * e.hue / 360), sat: K(255 * e.saturation), bri: G(2 * e.alpha * 127.5) };
    };

    Q.prototype.setLight = function setLight(t, e) {
      var _this5 = this;

      var n = [];if ("number" == typeof t) {
        var _e6 = this.openAudioMc.getHueConfiguration().getBulbStateById(t - 1);if (-1 === _e6) return !1;n.push(_e6);
      } else if (t.startsWith("[")) JSON.parse(t).forEach(function (t) {
        var e = _this5.openAudioMc.getHueConfiguration().getHueIdFromId(t - 1);return -1 !== e && void n.push(e);
      });else {
        var _e7 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(t) - 1);if (-1 === _e7) return !1;n.push(_e7);
      }n.forEach(function (t) {
        _this5.currentUser.setLightState(t, _this5.colorToHueHsv(e)).then(function () {});
      });
    };

    Q.prototype.linkBridge = function linkBridge(t, e) {
      var _this6 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == e && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(t).user(this.options.userid), void this.currentUser.getGroups().then(function (e) {
        null != e[0] && null == e[0].error ? _this6.linkBridge(t, "error") : (_this6.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this6.isLinked = !0, _this6.onConnect());
      });if (this.currentBridge = this.hue.bridge(t), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var n = this;var r = 0,
          o = -1;o = setInterval(function () {
        function t() {
          clearInterval(o);
        }if (r++, 60 < r) return t(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this6.startSetup();
        }, void _this6.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var e = 60 - r;document.getElementById("hue-linking-message").innerText = _this6.openAudioMc.getMessages().hueLinking.replace("%sec%", e), n.currentBridge.createUser("OpenAudioMc#WebClient").then(function (e) {
          null == e[0].error ? null != e[0].success && (n.currentUser = n.currentBridge.user(e[0].success.username), _this6.openAudioMc.log("Linked with hue bridge after " + r + " attempt(s)."), n.isLinked = !0, n.onConnect(), t()) : 101 === e[0].error.type || (t(), _this6.openAudioMc.log("Unexpected error while connecting: " + e[0].error.type));
        });
      }, 1e3);
    };

    return Q;
  }();

  var Z = function () {
    function Z(t) {
      _classCallCheck(this, Z);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    Z.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    Z.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    Z.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _t8 = _step4.value;
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

    Z.prototype.addSound = function addSound(t) {
      this.sounds.push(t);var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _t9 = _step5.value;
          _t9.registerMixer(this.mixer, this);
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

    Z.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    Z.prototype.registerMixer = function registerMixer(t) {
      this.mixer = t;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _t10 = _step6.value;
          _t10.registerMixer(this.mixer, this);
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

    Z.prototype.fadeChannel = function fadeChannel(t, e, n) {
      var _this7 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = t, this.isFading = !0, function (t, e, r, o) {
        e = e || 1e3, r = r || 0, o = o;var i = _this7.channelVolume,
            s = e / Math.abs(i - r),
            a = setInterval(function () {
          i = i > r ? i - 1 : i + 1;var t = _this7.mixer.masterVolume,
              e = i / 100 * t;var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this7.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _t12 = _step7.value;
              _t12.setVolume(e);
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

          if (_this7.channelVolume = i, i == r) {
            n(), clearInterval(a);var _t11 = _this7.fadeTimer.indexOf(a);-1 < _t11 && _this7.fadeTimer.splice(_t11, 1), _this7.isFading = !1, a = null;
          }
        }, s);_this7.fadeTimer.push(a);
      }(0, e, t, n);
    };

    Z.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.fadeTimer[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _t13 = _step8.value;
            clearInterval(_t13);
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

    Z.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.sounds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _t14 = _step9.value;
          _t14.setVolume(e);
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

    Z.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _t15 = _step10.value;
          _t15.setVolume(e);
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

    Z.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.sounds[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t16 = _step11.value;
          _t16.destroy();
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

    return Z;
  }();

  var tt = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (tt.arrayBuffer) var et = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      nt = ArrayBuffer.isView || function (t) {
    return t && -1 < et.indexOf(Object.prototype.toString.call(t));
  };u.prototype.append = function (t, e) {
    t = i(t), e = s(e);var n = this.map[t];this.map[t] = n ? n + ", " + e : e;
  }, u.prototype.delete = function (t) {
    delete this.map[i(t)];
  }, u.prototype.get = function (t) {
    return t = i(t), this.has(t) ? this.map[t] : null;
  }, u.prototype.has = function (t) {
    return this.map.hasOwnProperty(i(t));
  }, u.prototype.set = function (t, e) {
    this.map[i(t)] = s(e);
  }, u.prototype.forEach = function (t, e) {
    for (var n in this.map) {
      this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
    }
  }, u.prototype.keys = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push(n);
    }), a(t);
  }, u.prototype.values = function () {
    var t = [];return this.forEach(function (e) {
      t.push(e);
    }), a(t);
  }, u.prototype.entries = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push([n, e]);
    }), a(t);
  }, tt.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);var rt = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];p.prototype.clone = function () {
    return new p(this, { body: this._bodyInit });
  }, d.call(p.prototype), d.call(v.prototype), v.prototype.clone = function () {
    return new v(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new u(this.headers), url: this.url });
  }, v.error = function () {
    var t = new v(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var ot = [301, 302, 303, 307, 308];v.redirect = function (t, e) {
    if (-1 === ot.indexOf(e)) throw new RangeError("Invalid status code");return new v(null, { status: e, headers: { location: t } });
  };var it = self.DOMException;try {
    new it();
  } catch (e) {
    (it = function it(t, e) {
      this.message = t, this.name = e;var n = Error(t);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), it.prototype.constructor = it;
  }y.polyfill = !0, self.fetch || (self.fetch = y, self.Headers = u, self.Request = p, self.Response = v);var st = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var at = function () {
    function at(t, e, n, r, o) {
      _classCallCheck(this, at);

      this.publicServerKey = t, this.uuid = e, this.name = n, this.token = r, this.scope = o;
    }

    at.prototype.initialize = function initialize() {
      return new Promise(function (t) {
        var e = window.location.href;if (null != e) {
          if (2 <= e.split("?").length) {
            var _n3 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(t) {
                if (-1 == t.indexOf("&")) return {};var e = t.split("&");var n = {};for (var _t17 = 0; _t17 < e.length; _t17++) {
                  var _r4 = e[_t17].split("="),
                      _o2 = decodeURIComponent(_r4[0]),
                      _i4 = decodeURIComponent(_r4[1]);void 0 === n[_o2] ? n[_o2] = decodeURIComponent(_i4) : "string" == typeof n[_o2] ? n[_o2] = [n[_o2], decodeURIComponent(_i4)] : n[_o2].push(decodeURIComponent(_i4));
                }return n;
              };

              return _class;
            }().getParametersFromUrl(e.split("?")[1]);if (null == _n3.data) return void t(null);var _r3 = atob(_n3.data).split(":");if (4 !== _r3.length) return t(null), null;var _o = _r3[0],
                _i3 = _r3[1],
                _s = _r3[2],
                _a = _r3[3];null != _o && 16 >= _o.length && null != _i3 && 40 >= _i3.length && null != _s && 40 >= _s.length && null != _a && 5 >= _a.length || t(null);var _u2 = new at(_s, _i3, _o, _a);window.tokenCache = _u2, t(_u2);
          } else if (2 <= e.split("#").length) {
            var _n4 = e.split("#")[1];y(st.CLIENT_SESSION_SERVER + "?token=" + _n4).then(function (e) {
              e.json().then(function (e) {
                if (0 < e.errors.length) return console.log("Session error"), void t(null);var n = e.response;null == n.hasOwnProperty("serverIdentity") ? (b("No identity to fetch"), document.getElementById("top-head").src = "https://minotar.net/helm/" + n.playerName) : b("Loading identity");var r = new at(n.publicKey, n.playerUuid, n.playerName, n.session, n.scope);window.tokenCache = r, t(r);
              }).catch(function (t) {
                console.error(t);
              });
            }).catch(function (e) {
              console.error(e), t(null);
            });
          } else t(null);
        } else t(null);
      });
    };

    at.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return at;
  }();

  var ut = { PROXY: st.CONTENT_PROXY, YOUTUBE: st.YOUTUBE_PROXY, SOUNDCLOUD: st.SOUNDCLOUD_PROXY, DRIVE: st.DRIVE_PROXY };
  var ct = function () {
    function ct() {
      _classCallCheck(this, ct);

      this.startedRandomly = !1, this.lastIndex = 0;
    }

    ct.prototype.translate = function translate(t) {
      var e = this.handleRandomizedPlaylist(t);try {
        if (e.includes("media.openaudiomc.net")) return t;if (e = e.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !e.includes("http")) return null;if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", ut.DRIVE)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", ut.DRIVE)), e.includes("https://drive.google.com/") && (e = e.split("file/d/")[1], e = ut.DRIVE + e.split("/view")[0]), this.isYoutube = !1, e.includes("youtube.")) {
          var _t18 = e.split("v=")[1];_t18.includes("&") && (_t18 = _t18.split("&")[0]), e = ut.YOUTUBE + _t18, this.isYoutube = !0;
        } else if (e.includes("youtu.be")) {
          var _t19 = e.split(".be/")[1];e = ut.YOUTUBE + _t19, this.isYoutube = !0;
        }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (fetch("https://media.openaudiomc.net/2/soundcloud?u=" + e).then(function (t) {
          return t.json();
        }).then(function (t) {
          document.getElementById("sc-cover").style.display = "", document.getElementById("sc-title").style.display = "", document.getElementById("sc-title").innerText = t.artist + " - " + t.title, document.getElementById("sc-title").onclick = function () {
            window.open(t.link);
          }, document.getElementById("sc-cover").src = t.photo;
        }), e = ut.SOUNDCLOUD + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = ut.PROXY + e);
      } catch (n) {
        return console.log("Middleware error"), console.log(n), t;
      }var n = new at().fromCache();return e += e.includes("?") ? "&openAudioPlayerName=" + n.name : "?openAudioPlayerName=" + n.name, e += "&openAudioToken=" + n.token, e += "&openAudioPublicServerKey=" + n.publicServerKey, e;
    };

    ct.prototype.handleRandomizedPlaylist = function handleRandomizedPlaylist(t) {
      if (t.startsWith("[") && t.endsWith("]")) {
        var e = JSON.parse(t);if (!this.startedRandomly) {
          var _t20 = K(Math.random() * e.length);return this.lastIndex = _t20, this.startedRandomly = !0, e[_t20];
        }return this.lastIndex++, this.lastIndex > e.length - 1 && (this.lastIndex = 0), e[this.lastIndex];
      }return t;
    };

    return ct;
  }();

  var lt = {},
      ht = new ct();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
  var ft = function (_ct) {
    _inherits(ft, _ct);

    function ft(t) {
      var _this8;

      _classCallCheck(this, ft);

      (_this8 = _possibleConstructorReturn(this, _ct.call(this)), _this8), _this8.rawSource = t, t = _this8.translate(t), _this8.soundElement = function (t) {
        t = ht.translate(t);var e = lt[t];return null == e ? new Audio() : e;
      }(t), _this8.hadError = !1, _this8.source = t, _this8.error = null, _this8.trackable = !1, _this8.soundElement.onerror = function (t) {
        _this8.hadError = !0, _this8.error = t, _this8._handleError();
      }, _this8.soundElement.src = t, _this8.soundElement.setAttribute("preload", "auto"), _this8.soundElement.setAttribute("controls", "none"), _this8.soundElement.setAttribute("display", "none"), _this8.soundElement.preload = "auto", _this8.soundElement.abort = console.log, _this8.openAudioMc = null, _this8.onFinish = [], _this8.loop = !1, _this8.mixer = null, _this8.channel = null, _this8.finsishedInitializing = !1, _this8.gotShutDown = !1;return _this8;
    }

    ft.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    ft.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _t21 = this.soundElement.error.code,
            e = null;this.isYoutube ? e = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === _t21 ? e = "MEDIA_ERR_ABORTED" : 2 === _t21 ? e = "MEDIA_ERR_NETWORK" : 3 === _t21 ? e = "MEDIA_ERR_DECODE" : 4 === _t21 && (e = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != e && (console.log("[OpenAudioMc] Reporting media failure " + e), this.openAudioMc.socketModule.send("media_failure", { mediaError: e, source: this.soundElement.src }));
      }
    };

    ft.prototype.addNode = function addNode(t, e) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = ut.PROXY + this.soundElement.src), this.controller = t.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(e);
    };

    ft.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    ft.prototype.finalize = function finalize() {
      var _this9 = this;

      return new Promise(function (t) {
        _this9.soundElement.onended = function () {
          _this9.gotShutDown || !_this9.finsishedInitializing || (_this9.onFinish.forEach(function (t) {
            t();
          }), _this9.loop ? (_this9.soundElement.src = _this9.translate(_this9.rawSource), _this9.setTime(0), _this9.soundElement.play()) : (_this9.mixer.removeChannel(_this9.channel), !_this9.soundElement.paused && _this9.soundElement.pause()));
        };var e = !1;var n = function n() {
          if (!_this9.gotShutDown) {
            if (!e) {
              var _e8 = _this9.soundElement.play();_e8 instanceof Promise ? _e8.then(t).catch(t) : t();
            }e = !0;
          }
        };_this9.soundElement.onplay = function () {
          _this9.gotShutDown && (console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason."), _this9.soundElement.pause());
        }, _this9.soundElement.onprogress = n, _this9.soundElement.oncanplay = n, _this9.soundElement.oncanplaythrough = n;
      });
    };

    ft.prototype.setLooping = function setLooping(t) {
      this.loop = t;
    };

    ft.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    ft.prototype.setOnFinish = function setOnFinish(t) {
      this.onFinish.push(t);
    };

    ft.prototype.setVolume = function setVolume(t) {
      100 < t && (t = 100), this.soundElement.volume = t / 100;
    };

    ft.prototype.startDate = function startDate(t) {
      var e = new Date(t),
          n = this.openAudioMc.timeService.localizeTime(e.getTime()),
          r = this.soundElement.duration;if (n > r) {
        n -= K(n / r) * r;
      }this.setTime(n);
    };

    ft.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    ft.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return ft;
  }(ct);

  var dt = function () {
    function dt(t, e) {
      _classCallCheck(this, dt);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null;
    }

    dt.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var t = !1;this.channels.forEach(function (e) {
        e.hasSoundPlaying() && (t = !0);
      }), t != this.areSoundsPlaying && (this._playingStateChangeChanged(t), this.areSoundsPlaying = t);
    };

    dt.prototype._playingStateChangeChanged = function _playingStateChangeChanged(t) {
      null == this.ambianceSoundMedia || (t ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    dt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      var e = new Z("ambiance-lol-dics"),
          n = new ft(t);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), e.mixer = { masterVolume: this.masterVolume }, e.addSound(n), this.ambianceSoundMedia = e, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    dt.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, n) {
        var r = [];e.tags.forEach(function (t, e) {
          r.push(e);
        }), e.trackable && t.push({ name: n, tags: r });
      }), this._updatePlayingSounds();
    };

    dt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.channels.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _t22 = _step12.value;
          _t22.updateFromMasterVolume();
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

    dt.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof Z ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this._updatePlayingSounds();
    };

    dt.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    dt.prototype.addChannel = function addChannel(t) {
      if (!(t instanceof Z)) throw new Error("Argument isn't a channel");{
        var e = t.channelName,
            _n5 = this.channels.get(e);null != _n5 && _n5.destroy(), t.registerMixer(this), this.channels.set(e, t);
      }this._updatePlayingSounds();
    };

    return dt;
  }();

  var pt = function () {
    function pt(t) {
      var _this10 = this;

      _classCallCheck(this, pt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.startSound = null, this.mixer = new dt(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this10.setMasterVolume(t), Cookies.set("volume", t, { expires: 30 });
      };
    }

    pt.prototype.startVolumeMonitor = function startVolumeMonitor(t) {
      var _this11 = this;

      var e = -1;setInterval(function () {
        e != _this11.masterVolume && (e = _this11.masterVolume, t.socketModule.send("volume_changed", { volume: _this11.masterVolume }));
      }, 300);
    };

    pt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      "" == t || null == t || this.mixer.setupAmbianceSound(t);
    };

    pt.prototype.startVolumeWatcher = function startVolumeWatcher(t) {
      this.startVolumeMonitor(t);
    };

    pt.prototype.postBoot = function postBoot() {
      var _this12 = this;

      if (null != this.startSound) {
        var _t23 = new Z("startsound"),
            e = new ft(this.startSound);e.openAudioMc = this.openAudioMc, e.setOa(this.openAudioMc), e.setOnFinish(function () {
          setTimeout(function () {
            _this12.mixer._updatePlayingSounds();
          }, 1e3);
        }), e.finalize().then(function () {
          _this12.mixer.addChannel(_t23), _t23.addSound(e), _t23.setChannelVolume(100), _t23.updateFromMasterVolume(), e.finish();
        });
      } else setTimeout(function () {
        _this12.mixer._updatePlayingSounds();
      }, 500);
    };

    pt.prototype.destroySounds = function destroySounds(t, e, n, r) {
      var _this13 = this;

      var o = r;null == o && (o = 500), n && (o = 0);var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        var _loop = function _loop() {
          var n = _step13.value;
          e ? n.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(n);
          }) : null == t || "" === t ? n.hasTag("SPECIAL") || n.hasTag("REGION") || n.hasTag("SPEAKER") || n.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(n);
          }) : n.hasTag(t) && (n.sounds.forEach(function (t) {
            t.gotShutDown = !0;
          }), n.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(n);
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

    pt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, 0 === t ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Audio Volume: " + t + "%", Cookies.set("volume", t, { expires: 30 }), this.mixer.setMasterVolume(t);
    };

    pt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    pt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return pt;
  }();

  var gt = function () {
    function gt(t, e) {
      var _this14 = this;

      _classCallCheck(this, gt);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], null == new at().fromCache()) return console.log("Empty authentication"), void o(J.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token;var n = this;this.socket = io(e, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.socketModule.state = "ok", _this14.hasConnected = !0, _this14.outgoingQueue.forEach(function (t) {
          _this14.send(t.key, t.value);
        });
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            n = parseInt(e[1]),
            r = parseInt(e[0]);_this14.openAudioMc.getTimeService().sync(r, n);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), n.state = "closed", o(J.BAD_AUTH), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010), t.voiceModule.shutDown();
      }), this.socket.on("data", function (t) {
        var e = t.type.split("."),
            r = e[e.length - 1];null != n.handlers[r] && n.handlers[r](t.payload);
      }), this.socket.connect();
    }

    gt.prototype.send = function send(t, e) {
      this.hasConnected ? this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + t), this.socket.emit(t, e)) : console.log("[OpenAudioMc] could not satisfy callback " + t + " because the protocol is outdated") : this.outgoingQueue.push({ key: t, value: e });
    };

    gt.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return gt;
  }();

  var mt = function () {
    function mt(t, e, n) {
      _classCallCheck(this, mt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0;
    }

    mt.prototype.add = function add(t, e, n) {
      return this.x += t, this.y += e, this.z += n, this;
    };

    mt.prototype.applyQuaternion = function applyQuaternion(t) {
      var e = this.x,
          n = this.y,
          r = this.z,
          o = t.x,
          i = t.y,
          s = t.z,
          a = t.w,
          u = a * e + i * r - s * n,
          c = a * n + s * e - o * r,
          l = a * r + o * n - i * e,
          h = -o * e - i * n - s * r;return this.x = u * a + h * -o + c * -s - l * -i, this.y = c * a + h * -i + l * -o - u * -s, this.z = l * a + h * -s + u * -i - c * -o, this;
    };

    mt.prototype.square = function square(t) {
      return t * t;
    };

    mt.prototype.distance = function distance(t) {
      var e = this.square(this.x - t.x) + this.square(this.y - t.y) + this.square(this.z - t.z);return Math.sqrt(e);
    };

    return mt;
  }();

  var vt = function () {
    function vt(t, e, n, r, o, i, s) {
      _classCallCheck(this, vt);

      this.id = t, this.source = e, this.location = n, this.type = r, this.maxDistance = o, this.startInstant = i, this.openAudioMc = s, this.channel = null;
    }

    vt.prototype.getDistance = function getDistance(t, e) {
      return e.location.distance(this.location);
    };

    return vt;
  }();

  var yt = function yt(t) {
    _classCallCheck(this, yt);

    function e(e, n) {
      t.socketModule.registerHandler(e, function (e) {
        return n(t, e);
      });
    }e("ClientVersionPayload", x), e("NotificationPayload", S), e("HueColorPayload", k), e("ClientPlayerLocationPayload", A), e("ClientSpeakerCreatePayload", C), e("ClientSpeakerDestroyPayload", I), e("ClientPreFetchPayload", P), e("ClientUpdateMediaPayload", O), e("ClientCreateMediaPayload", w), e("ClientDestroyMediaPayload", M), e("ClientVolumePayload", E), e("ClientVoiceChatUnlockPayload", T), e("ClientVoiceSubscribePayload", _), e("ClientVoiceDropPayload", R), e("ClientVoiceUpdatePeerLocationsPayload", N), e("ClientVoiceChatToggleMicrophonePayload", F);
  };

  var bt = function () {
    function bt() {
      var _this15 = this;

      _classCallCheck(this, bt);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this15.select();
        };
      });
    }

    bt.prototype.setBridgeName = function setBridgeName(t) {
      document.getElementById("bridge-name").innerText = t;
    };

    bt.prototype.select = function select() {
      this.updateState();
    };

    bt.prototype.applyState = function applyState() {
      var _this16 = this;

      this.state.forEach(function (t) {
        _this16.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    bt.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this17.state.push(_this17.obtainSelection(t));
      }), Cookies.set("hue-state", this.state, { expires: 30 });
    };

    bt.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          n = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: n };
    };

    bt.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    bt.prototype.getInputById = function getInputById(t) {
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

    bt.prototype.getHueIdFromId = function getHueIdFromId(t) {
      return this.state[parseInt(t)].value;
    };

    bt.prototype.setLightNamesAndIds = function setLightNamesAndIds(t) {
      var e = "";t.forEach(function (t) {
        e += "<option data-light='" + t.id + "'>" + t.name + "</option>";
      }), this.dropdowns.forEach(function (t) {
        t.innerHTML = e;
      });
    };

    return bt;
  }();

  var wt = [],
      St = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t24 = wt.length; _t24--;) {
        clearInterval(wt[_t24]);
      }wt = [];
    }(), j(this + "");
  };
  var xt = function () {
    function xt(t) {
      _classCallCheck(this, xt);

      this.host = t;
    }

    xt.prototype.route = function route(t) {
      var _this18 = this;

      return new Promise(function (e, n) {
        _this18.tokenSet = new at().fromCache(), "ACCOUNT" === _this18.tokenSet.scope ? (r("Using account based profile system..."), function (t, e, n, o) {
          y("https://cloud.openaudiomc.net/api/v3/account-services/client/login/" + o.publicServerKey).then(function (o) {
            o.json().then(function (o) {
              if (null == o.errors || 0 != o.errors.length) return n(o.errors), void console.log(o.errors);var i = o.response;if (i.settings.banned) return void L("Declined connection due to ban " + window.location.host, "Steve", function () {
                window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
              });var s = i.secureEndpoint;console.log("[OpenAudioMc] accepting and applying settings");var a = i.settings.ambianceSound;null != i.settings.backgroundImage && "" != i.settings.backgroundImage && (i.settings.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + i.settings.backgroundImage);var u = i.settings.backgroundImage;"" !== u && (document.getElementById("banner-image").src = u);var c = i.settings.title,
                  l = i.settings.activeMessage,
                  h = i.settings.errorMessage;var f = "";j(h).childNodes.forEach(function (t) {
                f += t.outerHTML;
              });var d = "";j(l).childNodes.forEach(function (t) {
                d += t.outerHTML;
              }), "" !== h && (t.getMessages().errorMessage = f), "" !== l && (t.getMessages().welcomeMessage = d);var p = i.settings.welcomeMessage;p = p.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = p, document.getElementById("initialize-button").innerHTML = i.settings.startButton, document.documentElement.style.setProperty("--border-color-dark", i.settings.color);var g = function (t, e) {
                var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + ",0.4)";
              }(i.settings.color);if (document.documentElement.style.setProperty("--border-color-normal", i.settings.color), document.documentElement.style.setProperty("--border-color-light", g), t.getUserInterfaceModule().changeColor("#2c78f6", i.settings.color), t.getUserInterfaceModule().changeColor("#4F46E5", i.settings.color), "" != i.settings.startSound && (t.getMediaManager().startSound = i.settings.startSound), "default" !== c) {
                document.title = c;try {
                  parent.document.title = c;
                } catch (t) {}
              }r("Logging into " + i.name + " with " + i.playerCount + " online player(s)"), e({ host: s, background: u, ambianceSound: a });
            }).catch(function (t) {
              console.log("Dead end 1"), n(t);
            });
          }).catch(function (t) {
            console.log("Dead end 2"), n(t);
          });
        }(t, e, n, _this18.tokenSet)) : (r("Using LEGACY profile system..."), function (t, e, n, r) {
          y("https://cloud.openaudiomc.net/api/v2/account-services/client/login/" + r.publicServerKey).then(function (r) {
            r.json().then(function (r) {
              if (null == r.errors || 0 != r.errors.length) return n(r.errors), void console.log(r.errors);var o = r.response;if (o.banned) return void L("Declined connection due to ban " + window.location.host, "Steve", function () {
                window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
              });var i = o.secureEndpoint,
                  s = o.ambianceSound;console.log("[OpenAudioMc] accepting and applying settings"), t.debugPrint("Updating settings..."), null != o.backgroundImage && "" != o.backgroundImage && (o.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + o.backgroundImage);var a = o.backgroundImage;"" !== a && (document.getElementById("banner-image").src = a);var u = o.title,
                  c = o.clientWelcomeMessage,
                  l = o.clientErrorMessage;var h = "";j(l).childNodes.forEach(function (t) {
                h += t.outerHTML;
              });var f = "";j(c).childNodes.forEach(function (t) {
                f += t.outerHTML;
              }), "" !== l && (t.getMessages().errorMessage = h), "" !== c && (t.getMessages().welcomeMessage = f);var d = o.greetingMessage;d = d.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = d, document.getElementById("initialize-button").innerHTML = o.connectButtonText, document.documentElement.style.setProperty("--border-color-dark", o.accentColor);var p = function (t, e) {
                var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + ",0.4)";
              }(o.accentColor);if (document.documentElement.style.setProperty("--border-color-normal", o.accentColor), document.documentElement.style.setProperty("--border-color-light", p), t.getUserInterfaceModule().changeColor("#2c78f6", o.accentColor), t.getUserInterfaceModule().changeColor("#4F46E5", o.accentColor), "" != o.startSound && (t.getMediaManager().startSound = o.startSound), "default" !== u) {
                document.title = u;try {
                  parent.document.title = u;
                } catch (t) {}
              }e({ host: i, background: a, ambianceSound: s });
            }).catch(function (t) {
              console.log("Dead end 1"), n(t);
            });
          }).catch(function (t) {
            console.log("Dead end 2"), n(t);
          });
        }(t, e, n, _this18.tokenSet));
      });
    };

    return xt;
  }();

  var Et = function () {
    function Et(t) {
      _classCallCheck(this, Et);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    Et.prototype.setupPermissions = function setupPermissions() {
      var _this19 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new $("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><span id="noti-perm-request-link" class="alert-message-button">Setup</span></div>'), U(function () {
        document.getElementById("noti-perm-request-link").onclick = _this19.requestNotificationPermissions;
      }));
    };

    Et.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    Et.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this20 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this20.requestBox.hide(), new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this20.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return Et;
  }();

  var Mt = n(121);var kt = null;
  var Ot = function Ot(t, e, n) {
    _classCallCheck(this, Ot);

    this.x = t || 0, this.y = e || 0, this.z = n || 0;
  };

  var At = function () {
    function At(t, e, n, r) {
      _classCallCheck(this, At);

      this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === r ? 1 : r;
    }

    At.prototype.setFromEuler = function setFromEuler(t) {
      var e = Math.sin,
          n = Math.cos;var r = t.x,
          o = t.y,
          i = t.z,
          s = n(r / 2),
          a = n(o / 2),
          u = n(i / 2),
          c = e(r / 2),
          l = e(o / 2),
          h = e(i / 2);return this.x = c * a * u + s * l * h, this.y = s * l * u - c * a * h, this.z = s * a * h + c * l * u, this.w = s * a * u - c * l * h, this;
    };

    return At;
  }();

  var Ct = function () {
    function Ct() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mt();
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new At();

      _classCallCheck(this, Ct);

      this.position = t, this.rotation = e;
    }

    Ct.prototype.applyTo = function applyTo(t) {
      var e = this.position,
          n = new mt(0, 0, 1).applyQuaternion(this.rotation),
          r = new mt(0, 1, 0).applyQuaternion(this.rotation);t.positionX ? (t.positionX.value = e.x, t.positionY.value = e.y, t.positionZ.value = e.z) : t.setPosition(e.x, e.y, e.z), t instanceof PannerNode ? t.orientationX ? (t.orientationX.value = n.x, t.orientationY.value = n.y, t.orientationZ.value = n.z) : t.setOrientation(n.x, n.y, n.z) : t.forwardX ? (t.forwardX.value = n.x, t.forwardY.value = n.y, t.forwardZ.value = n.z, t.upX.value = r.x, t.upY.value = r.y, t.upZ.value = r.z) : t.setOrientation(n.x, n.y, n.z, r.x, r.y, r.z);
    };

    return Ct;
  }();

  var It = function () {
    function It(t, e, n, r) {
      _classCallCheck(this, It);

      this.world = t, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(e, n, r);
    }

    It.prototype.updateLocation = function updateLocation(t, e, n) {
      this.location = t, this.pitch = this.toRadians(e), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var r = new Ot(this.pitch, this.yaw, 0),
          o = new At();o.setFromEuler(r);new Ct(t, o).applyTo(this.listener), this.world.onLocationUpdate();
    };

    It.prototype.toRadians = function toRadians(t) {
      return t * (Math.PI / 180);
    };

    It.prototype.normalizeYaw = function normalizeYaw(t) {
      return 0 > (t %= 360) && (t += 360), t;
    };

    return It;
  }();

  var Pt = function Pt(t, e, n) {
    _classCallCheck(this, Pt);

    this.source = t, this.distance = e, this.speaker = n;
  };

  var Tt = "SPEAKER_2D";
  var _t = function _t(t, e, n, r) {
    _classCallCheck(this, _t);

    this.pannerNode = n.audioCtx.createPanner(), this.media = r, r.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = t.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var o = t.location;new Ct(o).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var Rt = function () {
    function Rt(t, e, n) {
      var _this21 = this;

      _classCallCheck(this, Rt);

      this.id = "SPEAKER__" + e, this.openAudioMc = t, this.speakerNodes = new Map();var r = new Z(this.id);r.trackable = !0, this.channel = r;var o = new ft(e);this.media = o, o.openAudioMc = t, o.setOa(t), r.mixer = this.openAudioMc.getMediaManager().mixer, r.addSound(o), r.setChannelVolume(0), o.startDate(n, !0), o.finalize().then(function () {
        t.getMediaManager().mixer.addChannel(r), o.setLooping(!0), r.setTag(_this21.id), r.setTag("SPECIAL"), _this21.openAudioMc.getMediaManager().mixer.updateCurrent(), o.startDate(n, !0), o.finish();
      });
    }

    Rt.prototype.removeSpeakerLocation = function removeSpeakerLocation(t) {
      null != this.speakerNodes.get(t) && this.speakerNodes.delete(t);
    };

    Rt.prototype.updateLocation = function updateLocation(t, e, n) {
      if (t.type == Tt) {
        var _r5 = t.getDistance(e, n),
            _o3 = this._convertDistanceToVolume(t.maxDistance, _r5);if (0 >= _o3) return;this.channel.fadeChannel(_o3, 100);
      } else this.speakerNodes.has(t.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(t.id, new _t(t, e, n, this.media)));
    };

    Rt.prototype._convertDistanceToVolume = function _convertDistanceToVolume(t, e) {
      return G((t - e) / t * 100);
    };

    Rt.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return Rt;
  }();

  var Nt = function () {
    function Nt(t) {
      _classCallCheck(this, Nt);

      this.openAudioMc = t, this.speakers = new Map(), this.audioMap = new Map(), this.player = new It(this, new mt(0, 0, 0), 0, 0);
    }

    Nt.prototype.getSpeakerById = function getSpeakerById(t) {
      return this.speakers.get(t);
    };

    Nt.prototype.addSpeaker = function addSpeaker(t, e) {
      this.speakers.set(t, e), this.renderAudio2D();
    };

    Nt.prototype.removeSpeaker = function removeSpeaker(t) {
      this.speakers.delete(t), this.audioMap.forEach(function (t, e) {
        t.removeSpeakerLocation(e);
      }), this.renderAudio2D();
    };

    Nt.prototype.getMediaForSource = function getMediaForSource(t, e) {
      var n = this.audioMap.get(t);if (null != n) return n;if (null == e) return null;var r = new Rt(this.openAudioMc, t, e);return this.audioMap.set(t, r), r;
    };

    Nt.prototype.removeMediaFromSource = function removeMediaFromSource(t) {
      var e = this.getMediaForSource(t);null == e || (e.remove(), this.audioMap.delete(t));
    };

    Nt.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    Nt.prototype.isMediaUsed = function isMediaUsed(t) {
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

    Nt.prototype.renderAudio2D = function renderAudio2D() {
      var _this22 = this;

      var t = [];this.speakers.forEach(function (e) {
        var n = e.getDistance(_this22, _this22.player);t.push(new Pt(e.source, n, e));
      });var e = new Map();var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = t[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _n6 = _step16.value;
          var _t26 = e.get(_n6.source);null != _t26 ? Array.isArray(_t26) ? (_t26.push(_n6), e.set(_n6.source, _t26)) : _t26.distance > _n6.distance && _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.speaker.type == Tt ? _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, [_n6]);
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
            var _t25 = _step17.value;
            _this22.getMediaForSource(_t25.source, _t25.speaker.startInstant).updateLocation(_t25.speaker, _this22, _this22.player);
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
        _this22.isMediaUsed(e) || _this22.removeMediaFromSource(e);
      });
    };

    return Nt;
  }();

  var Ft = function () {
    function Ft() {
      _classCallCheck(this, Ft);

      this.successCallback = alert, this.errorCallback = alert;
    }

    Ft.prototype.getUserMedia = function getUserMedia(t) {
      var _this23 = this;

      return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
        return _this23.successCallback(t);
      }).catch(function (t) {
        return _this23.errorCallback(t);
      }) : void navigator.webkitGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.getUserMedia(t, this.successCallback, this.errorCallback);
    };

    return Ft;
  }();

  var Lt = function () {
    function Lt(t, e, n, r) {
      var _this24 = this;

      _classCallCheck(this, Lt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.micStream = r, this.isMuted = !1, document.getElementById("vc-mic-mute").onchange = function () {
        _this24.setMute(!_this24.isMuted);
      }, document.getElementById("mute-wrapper").addEventListener("mouseup", function () {
        _this24.muteCooldown && Swal.fire({ icon: "warning", text: "Please wait a moment before doing this again", backdrop: "", timer: 3e3 });
      }), this.muteCooldown = !1;
    }

    Lt.prototype.start = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
        var _this25 = this;

        var e, n, o, i, _t27;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e = this.server + "webrtc/broadcaster/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                r("Starting stream"), this.pcSender = new RTCPeerConnection(), this.pcSender.onconnectionstatechange = function () {
                  r("State change " + _this25.pcSender.connectionState + " for " + _this25.streamKey);
                };n = !1, o = function o(e) {
                  if ("connected" === _this25.pcSender.connectionState || "connected" === e.target.iceConnectionState) {
                    if (n) return;n = !0, r("Finished handshake for" + _this25.streamKey), t(), _this25.openAudioMc.socketModule.send(X, { enabled: !0 });
                  }
                };
                this.pcSender.oniceconnectionstatechange = o, this.pcSender.addEventListener("connectionstatechange", o), this.pcSender.onicecandidate = function (t) {
                  r("Candidate event for " + _this25.streamKey + " nc " + (null == t.target));
                }, this.pcSender.onnegotiationneeded = function () {
                  r("Negotiation ended for " + _this25.streamKey);
                }, this.pcSender.onicecandidateerror = function (t) {
                  _this25.openAudioMc.sendError("Oh no, this wasn't supposed to happen at all! something went wrong while connecting you to the voice server.\nPlease report this as a bug with the following details.<br /><b>Code: </b>" + t.errorCode + "\n<br /><b>Side: </b>BROADCASTER\n<br /><b>Context: </b>" + t.errorText + "\n<br /><b>RUI: </b>" + t.url + "\n<br /><b>HC: </b>" + t.hostCandidate + "\nhostname=" + window.location.host + "\nuseragent=" + window.navigator.userAgent), console.log("Oh no, this wasn't supposed to happen at all! something went wrong while connecting you to the voice server.Please report this as a bug with the following details.<br /><b>Code: </b>" + t.errorCode + "<br /><b>Side: </b>BROADCASTER<br /><b>Context: </b>" + t.errorText + "<br /><b>RUI: </b>" + t.url + "<br /><b>HC: </b>" + t.hostCandidate);
                };i = this.micStream.getTracks();
                for (_t27 = 0; _t27 < i.length; _t27++) {
                  this.pcSender.addTrack(this.micStream.getTracks()[_t27]);
                }this.pcSender.createOffer().then(function (t) {
                  return _this25.pcSender.setLocalDescription(t);
                }).then(function () {
                  fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this25.pcSender.localDescription)) }) }).then(function (t) {
                    return t.json();
                  }).then(function (t) {
                    _this25.pcSender.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
                  }).catch(function (t) {
                    console.error(t);
                  });
                }).catch(console.error);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x5) {
        return _ref.apply(this, arguments);
      }

      return start;
    }();

    Lt.prototype.setMute = function setMute(t) {
      var _this26 = this;

      if (this.muteCooldown) Swal.fire("Please wait a moment before doing this again");else {
        this.isMuted = t, this.muteCooldown = !0, document.getElementById("vc-mic-mute").disabled = !0, setTimeout(function () {
          _this26.muteCooldown = !1, document.getElementById("vc-mic-mute").disabled = !1;
        }, 1500);for (var e = 0; e < this.micStream.getAudioTracks().length; e++) {
          this.micStream.getAudioTracks()[e].enabled = !t;
        }t ? this.openAudioMc.voiceModule.pushSocketEvent(Gt.MIC_MUTE) : this.openAudioMc.voiceModule.pushSocketEvent(Gt.MIC_UNMTE);
      }
    };

    Lt.prototype.stop = function stop() {
      this.micStream.getTracks().forEach(function (t) {
        t.stop();
      }), this.pcSender.close();
    };

    return Lt;
  }();

  var Bt = function () {
    function Bt(t, e, n, r) {
      var _this27 = this;

      _classCallCheck(this, Bt);

      this.playerName = t;var o = '\n        <div class="flex items-center p-2" id="vc-user-card-' + t + '">\n            <div class="w-16 h-16 rounded-full mr-3 overflow-hidden flex items-center">\n                <img src="https://visage.surgeplay.com/bust/512/' + e + '" class="w-16">\n            </div>\n            <div class="flex-1">\n                <div class="flex items-center">\n                    <div class="font-semibold text-lg text-teal-500">' + t + ' <small id="vc-user-card-' + t + '-volume-disp">(' + n + '% volume)</small>\n                    </div>\n                </div>\n                <div><input id="vc-user-card-' + t + '-volume-input"\n                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"\n                            type="range" min="0" max="120" step="1" value="' + n + '"/></div>\n            </div>\n        </div>\n        ';document.getElementById("vc-call-members").innerHTML += o, U(function () {
        document.getElementById("vc-user-card-" + t + "-volume-input").oninput = function () {
          var e = document.getElementById("vc-user-card-" + t + "-volume-input").value;r(e), _this27.updateVolumeDisplay(e);
        };
      });
    }

    Bt.prototype.remove = function remove() {
      document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName));
    };

    Bt.prototype.updateVolumeDisplay = function updateVolumeDisplay(t) {
      document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + t + "% volume)";
    };

    return Bt;
  }();

  var Dt = function () {
    function Dt(t, e, n, r, o) {
      _classCallCheck(this, Dt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.peerStreamKey = r, this.volume = o, this.volBooster = 1.2, this.track = null;
    }

    Dt.prototype.start = function start(t) {
      var _this28 = this;

      var e = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);e.onFinish(function (e) {
        r("Finished the promise! got " + e);var n = _this28.openAudioMc.world.player.audioCtx;_this28.setVolume(_this28.volume), _this28.gainNode = n.createGain();var o = new Audio();o.srcObject = e, _this28.track = o, _this28.gainNode.gain.value = _this28.volume / 100 * _this28.volBooster, o.onloadedmetadata = function () {
          r("Playing voice from " + _this28.peerStreamKey);var t = n.createMediaStreamSource(o.srcObject);if (o.play().then(console.log).catch(console.error), o.muted = !0, _this28.openAudioMc.voiceModule.surroundSwitch.isOn()) {
            var _e9 = _this28.gainNode;_this28.pannerNode = n.createPanner(), _this28.pannerNode.panningModel = "HRTF", _this28.pannerNode.maxDistance = _this28.openAudioMc.voiceModule.blocksRadius, _this28.pannerNode.rolloffFactor = 1, _this28.pannerNode.distanceModel = "linear", _this28.setLocation(_this28.x, _this28.y, _this28.z, !0), t.connect(_e9), _e9.connect(_this28.pannerNode), _this28.pannerNode.connect(n.destination);
          } else {
            var _e10 = _this28.gainNode;t.connect(_e10), _e10.connect(n.destination);
          }
        }, t();
      }), e.onReject(function (t) {
        r("Stream for " + _this28.peerStreamKey + " got denied: " + t);
      });
    };

    Dt.prototype.setLocation = function setLocation(t, e, n, r) {
      if (this.openAudioMc.voiceModule.useSurround) {
        if (r && null != this.pannerNode) {
          new Ct(new mt(this.x, this.y, this.z)).applyTo(this.pannerNode);
        }this.x = t, this.y = e, this.z = n;
      }
    };

    Dt.prototype.setVolume = function setVolume(t) {
      this.volume = t, null != this.gainNode && (this.gainNode.gain.value = this.volume / 100 * this.volBooster);
    };

    Dt.prototype.stop = function stop() {
      r("Closing voice link with " + this.peerStreamKey), null != this.track && this.track.pause();
    };

    return Dt;
  }();

  var jt = function () {
    function jt(t, e, n, r, o, i) {
      var _this29 = this;

      _classCallCheck(this, jt);

      this.openAudioMc = t, this.playerName = e, this.playerUuid = e, this.streamKey = r, this.active = !0, this.ready = !1, this.location = i, this.volume = 80;var s = Cookies.get("vc-volume-of-" + e);null != s && (this.volume = parseInt(s)), this.ui = new Bt(e, n, this.volume, function (t) {
        _this29.volume = t, Cookies.set("vc-volume-of-" + e, t, { expires: 30 }), _this29.ready && _this29.stream.setVolume(_this29.volume);
      }), this.stream = new Dt(t, o, t.voiceModule.streamKey, r, this.volume), this.stream.setLocation(i.x, i.y, i.z, !1), this.stream.start(function () {
        return _this29.active ? (_this29.stream.setVolume(_this29.volume), void (_this29.ready = !0)) : void _this29.stop();
      });
    }

    jt.prototype.updateLocation = function updateLocation(t, e, n) {
      this.stream.setLocation(t, e, n, !0);
    };

    jt.prototype.stop = function stop() {
      this.openAudioMc.voiceModule.peerManager.dropStream(this.streamKey), this.active = !1, this.ui.remove(), null != this.stream && this.stream.stop();
    };

    return jt;
  }();

  var Ut = function () {
    function Ut(t, e, n, r, o, i) {
      var _this30 = this;

      _classCallCheck(this, Ut);

      this.id = t, this.activeText = r, this.inactiveText = n, this.onToggle = i, this.state = null == Cookies.get(t) ? o : JSON.parse(Cookies.get(t));var s = '\n        <div style="text-align:center; display:inline-block;" class="w-3/5">\n            <h4>' + e + '</h4>\n            <input class="tgl tgl-skewed text-center" id="' + this.id + '" type="checkbox"/>\n            <label class="tgl-btn block w-max" data-tg-off="' + this.activeText + '" data-tg-on="' + this.inactiveText + '"\n                   for="' + this.id + '" style="width: 100%"></label>\n        </div>\n        ';document.getElementById("vc-toggles-wrapper").innerHTML += s, U(function () {
        document.getElementById(_this30.id).checked = !_this30.state, document.getElementById(_this30.id).onclick = function () {
          _this30.state = !_this30.state, Cookies.set(_this30.id, _this30.state, { expires: 30 }), _this30.onToggle(_this30.state);
        };
      });
    }

    Ut.prototype.getState = function getState() {
      return this.state;
    };

    Ut.prototype.isOn = function isOn() {
      return this.state;
    };

    return Ut;
  }();

  var Vt = function () {
    function Vt() {
      _classCallCheck(this, Vt);

      this.eventName = "", this.params = new Map();
    }

    Vt.prototype.fromString = function fromString(t) {
      this.original = t;var e = t.split("~");for (var _t28 = 0; _t28 < e.length; _t28++) {
        if (0 === _t28) this.eventName = e[_t28];else {
          var _n7 = e[_t28];if (-1 !== _n7.indexOf("=")) {
            var _t29 = _n7.split("=");this.params.set(_t29[0], _t29[1]);
          }
        }
      }return this;
    };

    Vt.prototype.setParam = function setParam(t, e) {
      return this.params.set(t, e), this;
    };

    Vt.prototype.getParam = function getParam(t) {
      return this.params.get(t);
    };

    Vt.prototype.setEventName = function setEventName(t) {
      return this.eventName = t, this;
    };

    Vt.prototype.getEventName = function getEventName() {
      return this.eventName;
    };

    Vt.prototype.serialize = function serialize() {
      var t = this.eventName + "~";var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = this.params[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _step18$value = _slicedToArray(_step18.value, 2),
              e = _step18$value[0],
              _n8 = _step18$value[1];

          t += e + "=" + _n8 + "~";
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

    Vt.prototype.trimmed = function trimmed() {
      var t = this.eventName.length,
          e = "";for (var _n9, _r6 = 0; _r6 < this.original.length; _r6++) {
        _n9 = this.original.charAt(_r6), _r6 <= t || (e += _n9);
      }return e;
    };

    return Vt;
  }();

  var Ht = function () {
    function Ht() {
      _classCallCheck(this, Ht);

      this.whenFinished = function () {
        r("A promised channel got finished before it got used");
      }, this.whenRejected = function () {
        r("A promised channel got finished before it got used");
      }, this.error = null, this.payload = null;
    }

    Ht.prototype.onFinish = function onFinish(t) {
      return null == this.payload ? void (this.whenFinished = t) : void t(this.payload);
    };

    Ht.prototype.onReject = function onReject(t) {
      return null == this.error ? void (this.whenRejected = t) : void t(this.error);
    };

    Ht.prototype.handleData = function handleData(t) {
      this.payload = t, this.whenFinished(t);
    };

    Ht.prototype.handleError = function handleError(t) {
      this.error = t, this.whenRejected(t);
    };

    return Ht;
  }();

  var zt = function () {
    function zt(t, e, n) {
      _classCallCheck(this, zt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.waitingPromises = new Map(), this.trackQueue = new Map(), this.updateNegotiation = !0;
    }

    zt.prototype.onStart = function onStart() {
      r("Confluence started");
    };

    zt.prototype.dropStream = function dropStream(t) {
      "open" === this.dataChannel.readyState ? this.dataChannel.send(new Vt().setEventName("DROP_STREAM").setParam("owner", t).serialize()) : r("Warning! can't drop a stream because the connection is closed");
    };

    zt.prototype.requestStream = function requestStream(t) {
      if ("open" === this.dataChannel.readyState) {
        var e = new Ht();return this.waitingPromises.set(t, e), this.dataChannel.send(new Vt().setEventName("REQUEST_STREAM").setParam("owner", t).serialize()), e;
      }{
        r("Warning! attempted to request a stream for " + t + " but the eb is closed");var _e11 = new Ht();return _e11.handleError("Connection is closed"), _e11;
      }
    };

    zt.prototype.registerDataChannel = function registerDataChannel(t, e) {
      var _this31 = this;

      t.addEventListener("open", function () {
        r("Opened RTC event bus");
      }), t.addEventListener("close", function () {
        r("Closed RTC event bus");
      }), t.addEventListener("message", function (t) {
        var n = t.data;var o = new Vt().fromString(n);switch (o.getEventName()) {case "PROCESS_OFFER":
            _this31.lastNegotiationRequest = performance.now();var _t30 = JSON.parse(o.trimmed());_this31.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_t30.sdp)))).then(function () {
              _this31.pcReceiver.createAnswer({ offerToReceiveAudio: !0 }).then(function (t) {
                var e = new Vt().setEventName("PROCESS_RESPONSE").serialize();e += btoa(JSON.stringify(t)), _this31.dataChannel.send(e);
              }).catch(console.error);
            }).catch(console.error);break;case "CONFIRM_NEGOTIATION":
            if (null != _this31.lastNegotiationRequest) {
              var _t31 = performance.now(),
                  _e12 = Math.ceil(_t31 - _this31.lastNegotiationRequest);r("Renegotiation took " + _e12 + " MS"), 100 < _e12 && r("Warning! Renegotiation took too long!");
            }break;case "NEGOTIATION_CANCELLED":
            r("Negotiation was ignored, server doesn't think it to be needed.");break;case "OK":
            null != e && e(), r("Received Confluence channel confirmation");break;case "REJECT_REQUEST":
            var _n10 = o.getParam("owner");r("The server rejected a stream request to " + _n10), _this31.waitingPromises.has(_n10) && (_this31.waitingPromises.get(_n10).handleError("Request got denied by the server"), _this31.waitingPromises.delete(_n10));break;case "CONFIRM_REQUEST":
            console.log(o), r("Server acknowledged a track request to " + o.getParam("name") + ". Expecting " + o.getParam("streamid")), _this31.trackQueue.set(o.getParam("streamid"), o.getParam("owner"));break;default:
            r("Warning! received a rtc packet called " + o.getEventName() + " but I don't have a clue what it does.");}
      });
    };

    zt.prototype.onInternalTrack = function onInternalTrack(t, e) {
      var _this32 = this;

      var n = t.id;if (!this.trackQueue.has(n)) return void r("Received an unknown track called " + n + ". Ignoring it.");var o = this.trackQueue.get(n),
          i = this.waitingPromises.get(o);return null == i ? void (e ? r("Got a stream that doesn't seem to be asked for, skipping it. it was " + n) : (r("Got a stream that doesn't seem to be asked for, trying again in 1s"), setTimeout(function () {
        _this32.onInternalTrack(t, !0);
      }, 1e3))) : (r("Setting up stream for " + n), console.log(t), void i.handleData(t));
    };

    zt.prototype.setup = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
        var _this33 = this;

        var e, n, o;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = this.server + "webrtc/confluence/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                this.pcReceiver = new RTCPeerConnection();n = !1, o = function o(t) {
                  if ("connected" === _this33.pcReceiver.connectionState || "connected" === t.target.iceConnectionState) {
                    if (n) return;n = !0, _this33.onStart();
                  }
                };
                this.pcReceiver.oniceconnectionstatechange = o, this.pcReceiver.addEventListener("connectionstatechange", o), this.pcReceiver.onnegotiationneeded = function () {
                  r("Finished negotiation round");
                }, this.dataChannel = this.pcReceiver.createDataChannel("eb"), this.registerDataChannel(this.dataChannel, t), this.listenForTracks(), this.pcReceiver.addTransceiver("audio", { direction: "recvonly" }), this.pcReceiver.createOffer().then(function (t) {
                  return _this33.pcReceiver.setLocalDescription(t);
                }).then(function () {
                  fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this33.pcReceiver.localDescription)) }) }).then(function (t) {
                    return t.json();
                  }).then(function (t) {
                    _this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
                  }).catch(function (t) {
                    console.error(t);
                  });
                }).catch(console.error);
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup(_x6) {
        return _ref2.apply(this, arguments);
      }

      return setup;
    }();

    zt.prototype.countActiveStreams = function countActiveStreams() {
      var t = 0;var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.pcReceiver.getReceivers()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var e = _step19.value;
          "live" == e.track.readyState && t++;
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

      return t;
    };

    zt.prototype.listenForTracks = function listenForTracks() {
      var _this34 = this;

      this.pcReceiver.addEventListener("track", function (t) {
        var _loop2 = function _loop2(e) {
          _this34.onInternalTrack(t.streams[e], !1);var n = t.transceiver.sender;t.streams[e].onremovetrack = function (t) {
            t.track.stop(), _this34.pcReceiver.removeTrack(n);
          };
        };

        for (var e = 0; e < t.streams.length; e++) {
          _loop2(e);
        }
      }, !1);
    };

    return zt;
  }();

  var Gt = { MIC_MUTE: "MICROPHONE_MUTED", MIC_UNMTE: "MICROPHONE_UNMUTE" };
  var Kt = function () {
    function Kt(t) {
      var _this35 = this;

      _classCallCheck(this, Kt);

      this.openAudioMc = t, this.streamer = null, this.peerMap = new Map(), this.loadedDeviceList = !1, this.loadeMicPreference = Cookies.get("preferred-mic"), this.surroundSwitch = new Ut("use-surround", "Sound Type", "Constant volume", "Surround", !0, function (t) {
        _this35.openAudioMc.socketModule.send(X, { enabled: !1 }), _this35.useSurround = t, _this35.onSurrroundUpdate();
      }), this.useSurround = this.surroundSwitch.isOn();
    }

    Kt.prototype.enable = function enable(t, e, n) {
      var _this36 = this;

      this.blocksRadius = n, this.server = t, this.streamKey = e, document.getElementById("vc-controls").style.display = "", document.getElementById("vc-block-range").innerText = this.blocksRadius + " block", document.getElementById("vc-concent-button").onclick = function () {
        _this36.consent(_this36.loadeMicPreference);
      }, H("vc-onboarding");
    };

    Kt.prototype.addPeer = function addPeer(t, e, n, o) {
      r("Trying to add peer " + e), this.peerMap.set(n, new jt(this.openAudioMc, e, t, n, this.server, o));
    };

    Kt.prototype.peerLocationUpdate = function peerLocationUpdate(t, e, n, r) {
      this.peerMap.has(t) && this.peerMap.get(t).updateLocation(e, n, r);
    };

    Kt.prototype.removeAllPeers = function removeAllPeers() {
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = this.peerMap[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var _step20$value = _slicedToArray(_step20.value, 2),
              t = _step20$value[0],
              e = _step20$value[1];

          this.removePeer(t);
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

    Kt.prototype.removePeer = function removePeer(t) {
      this.peerMap.has(t) ? (r("Removing peer " + t), this.peerMap.get(t).stop(), this.peerMap.delete(t)) : r("Couldn't remove peer " + t + " because, well, there is no such peer");
    };

    Kt.prototype.onSurrroundUpdate = function onSurrroundUpdate() {
      var _this37 = this;

      this.openAudioMc.socketModule.send(X, { enabled: !1 }), Swal.fire({ title: "Reloading voice system!", html: "Please wait while voice chat gets restarted to apply your new settings.. this shouldn't take long", timer: 3500, backdrop: "", showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && _this37.openAudioMc.socketModule.send(X, { enabled: !0 });
      });
    };

    Kt.prototype.handleAudioPermissions = function handleAudioPermissions(t) {
      var _this38 = this;

      this.loadedDeviceList || (navigator.mediaDevices.enumerateDevices().then(function (t) {
        var e = [];for (var _n11, _r7 = 0; _r7 < t.length; _r7++) {
          _n11 = t[_r7], "audioinput" === _n11.kind && e.push({ name: _n11.label, id: _n11.deviceId });
        }_this38.loadedDevices(e);
      }).catch(function (t) {
        console.error(t);
      }), this.loadedDeviceList = !0), Swal.fire({ backdrop: "", title: "Logging into voice chat...", html: "Please wait while we get you setup with a voice server.. hold on tight, shits shouldn't take too long.<br /><small>(but please report an issue if it does take too long, it's still work in progress after all.</small>", showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        } }), this.streamer = new Lt(this.openAudioMc, this.server, this.streamKey, t), this.streamer.start(this.onOutoingStreamStart).catch(console.error), null == this.peerManager && (this.peerManager = new zt(this.openAudioMc, this.server, this.streamKey), this.peerManager.setup().catch(console.error));
    };

    Kt.prototype.changeInput = function changeInput(t) {
      var _this39 = this;

      r("Stopping current streamer, and restarting with a diferent user input"), Cookies.set("preferred-mic", t, { expires: 30 }), this.streamer.setMute(!1), this.streamer.stop(), this.streamer = null, this.openAudioMc.socketModule.send(X, { enabled: !1 }), Swal.fire({ backdrop: "", title: "Updating microphone!", html: "Please wait while voice chat gets restarted with your new microphone.. this shouldn't take long", timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (e) {
        e.dismiss === Swal.DismissReason.timer && _this39.consent(t);
      });
    };

    Kt.prototype.loadedDevices = function loadedDevices(t) {
      var _this40 = this;

      var e = document.getElementById("vc-mic-select");for (; 0 < e.options.length;) {
        e.remove(0);
      }for (var _n12 = 0; _n12 < t.length; _n12++) {
        var _r8 = t[_n12],
            _o4 = document.createElement("option");null == this.loadeMicPreference && 0 == _n12 && (_o4.selected = !0), _o4.value = _r8.id, _o4.innerText = _r8.name, _o4.dataset.deviceId = _r8.id, e.add(_o4);
      }null != this.loadeMicPreference && (e.value = this.loadeMicPreference), e.onchange = function (t) {
        var e = t.target.value;_this40.changeInput(e);
      };
    };

    Kt.prototype.onOutoingStreamStart = function onOutoingStreamStart() {
      H("voice-home"), Swal.close();
    };

    Kt.prototype.consent = function consent(t) {
      var e = t ? { audio: { deviceId: { exact: t }, noiseSuppression: !1, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } } : { audio: { noiseSuppression: !1, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } },
          n = new Ft();n.successCallback = function (t) {
        this.openAudioMc.voiceModule.handleAudioPermissions(t);
      }.bind(this), n.errorCallback = function (t) {
        return console.error(t), "OverconstrainedError" === t.name || t instanceof OverconstrainedError ? (r("Couldn't get microphone, ignoring and trying again"), void this.consent(null)) : void this.openAudioMc.voiceModule.permissionError(t);
      }.bind(this), n.getUserMedia(e);
    };

    Kt.prototype.permissionError = function permissionError() {
      H("vc-onboarding"), Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Microphone error", text: 'Something went wrong while trying to access your microphone. Please press "allow" when your browser asks you for microphone permissions, or visit the wiki for more info.', footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' });
    };

    Kt.prototype.shutDown = function shutDown() {
      document.getElementById("vc-controls").style.display = "none", null != this.streamer && this.streamer.stop();var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = this.peerMap[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var _step21$value = _slicedToArray(_step21.value, 2),
              t = _step21$value[0],
              e = _step21$value[1];

          e.stop();
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
    };

    Kt.prototype.pushSocketEvent = function pushSocketEvent(t) {
      null != this.streamer && this.openAudioMc.socketModule.send(X, { event: t });
    };

    return Kt;
  }();

  n.d(e, "OpenAudioMc", function () {
    return Wt;
  });
  var Wt = function (_ref3) {
    _inherits(Wt, _ref3);

    function Wt() {
      var _this41, _ret3;

      _classCallCheck(this, Wt);

      if ((_this41 = _possibleConstructorReturn(this, _ref3.call(this)), _this41), r("Starting build __VERSION__"), _this41.canStart = !1, _this41.host = null, _this41.background = null, _this41.ambianceSound = "", _this41.tokenSet = new at().fromCache(), null == _this41.tokenSet) return _ret3 = void o(J.BAD_AUTH), _possibleConstructorReturn(_this41, _ret3);_this41.notificationModule = new Et(_this41), _this41.timeService = new W(), _this41.messages = new q(_this41), _this41.userInterfaceModule = new Y(_this41), _this41.hueConfiguration = new bt(_this41), _this41.mediaManager = new pt(_this41), _this41.voiceModule = new Kt(_this41);new xt(st.MAIN_BACKEND).route(_this41).then(function (t) {
        _this41.canStart = !0, _this41.host = t.host, _this41.background = t.background, _this41.ambianceSound = t.ambianceSound, o(J.WELCOME);var e = Cookies.get("volume");null != e && _this41.mediaManager.changeVolume(e);
      }).catch(function (t) {
        console.error(t), console.error("Exception thrown", t.stack), _this41.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this41);
    }

    Wt.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new Nt(this), this.hueModule = new Q(this, Object(Mt.a)()), this.socketModule = new gt(this, this.host), this.messages.apply(), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new yt(this), "" !== this.background && (document.getElementById("banner-image").src = this.background), this.mediaManager.postBoot());
    };

    Wt.prototype.sendError = function sendError(t) {
      L(t, this.tokenSet.name);
    };

    return Wt;
  }(function (_ref4) {
    _inherits(_class2, _ref4);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ref4.apply(this, arguments));
    }

    _class2.prototype.log = function log(t) {
      console.log("[OpenAudioMc] " + t);
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

  window.onload = function () {
    if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");new at().initialize().then(function (t) {
      return null == t ? (o(J.BAD_AUTH), window.location.href = "/login.html", void L("A faulty login attempt was done at " + window.location.host, "Steve")) : (null != t && null != t.name && (document.getElementById("in-game-name").innerText = t.name, kt = new Wt()), void document.body.addEventListener("click", V));
    });
  }, window.onhashchange = function () {
    return window.location.reload();
  };
}]);
