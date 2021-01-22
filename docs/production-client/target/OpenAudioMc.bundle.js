"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        f,
        h,
        d,
        p = t & c.F,
        v = t & c.G,
        m = t & c.S,
        g = t & c.P,
        y = t & c.B,
        b = v ? r : m ? r[e] || (r[e] = {}) : (r[e] || {})[u],
        w = v ? o : o[e] || (o[e] = {}),
        S = w[u] || (w[u] = {});for (l in v && (n = e), n) {
      h = ((f = !p && b && void 0 !== b[l]) ? b : n)[l], d = y && f ? a(h, r) : g && "function" == typeof h ? a(Function.call, h) : h, b && s(b, l, h, t & c.U), w[l] != h && i(w, l, d), g && S[l] != h && (S[l] = h);
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
      a = n(125),
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
        l = e || a;return function (e, a, f) {
      for (var h, d, p = i(e), v = o(p), m = r(a, f, 3), g = s(v.length), y = 0, b = n ? l(e, g) : 2 == t ? l(e, 0) : void 0; g > y; y++) {
        if ((5 == t || c || y in v) && (d = m(h = v[y], y, p), t)) if (n) b[y] = d;else if (d) switch (t) {case 3:
            return !0;case 5:
            return h;case 6:
            return y;case 2:
            b.push(h);} else if (u) return !1;
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
        f = n(28),
        h = n(14),
        d = n(43),
        p = n(19),
        v = n(6),
        m = n(115),
        g = n(32),
        y = n(26),
        b = n(13),
        w = n(46),
        S = n(4),
        x = n(10),
        E = n(76),
        M = n(33),
        O = n(35),
        _ = n(34).f,
        A = n(78),
        P = n(29),
        T = n(5),
        k = n(22),
        C = n(49),
        I = n(47),
        N = n(80),
        R = n(40),
        F = n(52),
        L = n(41),
        D = n(79),
        B = n(106),
        j = n(9),
        U = n(20),
        V = j.f,
        G = U.f,
        z = o.RangeError,
        K = o.TypeError,
        H = o.Uint8Array,
        W = "ArrayBuffer",
        Y = "Shared" + W,
        q = "BYTES_PER_ELEMENT",
        X = "prototype",
        J = Array[X],
        $ = u.ArrayBuffer,
        Q = u.DataView,
        Z = k(0),
        tt = k(2),
        et = k(3),
        nt = k(4),
        rt = k(5),
        ot = k(6),
        it = C(!0),
        st = C(!1),
        at = N.values,
        ut = N.keys,
        ct = N.entries,
        lt = J.lastIndexOf,
        ft = J.reduce,
        ht = J.reduceRight,
        dt = J.join,
        pt = J.sort,
        vt = J.slice,
        mt = J.toString,
        gt = J.toLocaleString,
        yt = T("iterator"),
        bt = T("toStringTag"),
        wt = P("typed_constructor"),
        St = P("def_constructor"),
        xt = a.CONSTR,
        Et = a.TYPED,
        Mt = a.VIEW,
        Ot = "Wrong length!",
        _t = k(1, function (t, e) {
      return Ct(I(t, t[St]), e);
    }),
        At = i(function () {
      return 1 === new H(new Uint16Array([1]).buffer)[0];
    }),
        Pt = !!H && !!H[X].set && i(function () {
      new H(1).set({});
    }),
        Tt = function Tt(t, e) {
      var n = p(t);if (0 > n || n % e) throw z("Wrong offset!");return n;
    },
        kt = function kt(t) {
      if (S(t) && Et in t) return t;throw K(t + " is not a typed array!");
    },
        Ct = function Ct(t, e) {
      if (!S(t) || !(wt in t)) throw K("It is not a typed array constructor!");return new t(e);
    },
        It = function It(t, e) {
      return Nt(I(t, t[St]), e);
    },
        Nt = function Nt(t, e) {
      for (var n = 0, r = e.length, o = Ct(t, r); r > n;) {
        o[n] = e[n++];
      }return o;
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
          o,
          i,
          s,
          a = x(t),
          u = arguments.length,
          l = 1 < u ? arguments[1] : void 0,
          f = void 0 !== l,
          h = A(a);if (null != h && !E(h)) {
        for (s = h.call(a), r = [], e = 0; !(i = s.next()).done; e++) {
          r.push(i.value);
        }a = r;
      }for (f && 2 < u && (l = c(l, arguments[2], 2)), e = 0, n = v(a.length), o = Ct(this, n); n > e; e++) {
        o[e] = f ? l(a[e], e) : a[e];
      }return o;
    },
        Lt = function Lt() {
      for (var t = 0, e = arguments.length, n = Ct(this, e); e > t;) {
        n[t] = arguments[t++];
      }return n;
    },
        Dt = !!H && i(function () {
      gt.call(new H(1));
    }),
        Bt = function Bt() {
      return gt.apply(Dt ? vt.call(kt(this)) : kt(this), arguments);
    },
        jt = { copyWithin: function copyWithin(t, e) {
        return B.call(kt(this), t, e, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(t) {
        return nt(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return D.apply(kt(this), arguments);
      }, filter: function filter(t) {
        return It(this, tt(kt(this), t, 1 < arguments.length ? arguments[1] : void 0));
      }, find: function find(t) {
        return rt(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, findIndex: function findIndex(t) {
        return ot(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, forEach: function forEach(t) {
        Z(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, indexOf: function indexOf(t) {
        return st(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, includes: function includes(t) {
        return it(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, join: function join() {
        return dt.apply(kt(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return lt.apply(kt(this), arguments);
      }, map: function map(t) {
        return _t(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return ft.apply(kt(this), arguments);
      }, reduceRight: function reduceRight() {
        return ht.apply(kt(this), arguments);
      }, reverse: function reverse() {
        for (var t, e = this, n = kt(e).length, r = Math.floor(n / 2), o = 0; o < r;) {
          t = e[o], e[o++] = e[--n], e[n] = t;
        }return e;
      }, some: function some(t) {
        return et(kt(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, sort: function sort(t) {
        return pt.call(kt(this), t);
      }, subarray: function subarray(t, e) {
        var n = kt(this),
            r = n.length,
            o = g(t, r);return new (I(n, n[St]))(n.buffer, n.byteOffset + o * n.BYTES_PER_ELEMENT, v((void 0 === e ? r : g(e, r)) - o));
      } },
        Ut = function Ut(t, e) {
      return It(this, vt.call(kt(this), t, e));
    },
        Vt = function Vt(t) {
      kt(this);var e = Tt(arguments[1], 1),
          n = this.length,
          r = x(t),
          o = v(r.length),
          i = 0;if (o + e > n) throw z(Ot);for (; i < o;) {
        this[e + i] = r[i++];
      }
    },
        Gt = { entries: function entries() {
        return ct.call(kt(this));
      }, keys: function keys() {
        return ut.call(kt(this));
      }, values: function values() {
        return at.call(kt(this));
      } },
        zt = function zt(t, e) {
      return S(t) && t[Et] && "symbol" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && e in t && +e + "" == e + "";
    },
        Kt = function Kt(t, e) {
      return zt(t, e = y(e, !0)) ? f(2, t[e]) : G(t, e);
    },
        Ht = function Ht(t, e, n) {
      return !(zt(t, e = y(e, !0)) && S(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(t, e, n) : (t[e] = n.value, t);
    };xt || (U.f = Kt, j.f = Ht), s(s.S + s.F * !xt, "Object", { getOwnPropertyDescriptor: Kt, defineProperty: Ht }), i(function () {
      mt.call({});
    }) && (mt = gt = function gt() {
      return dt.call(this);
    });var Wt = d({}, jt);d(Wt, Gt), h(Wt, yt, Gt.values), d(Wt, { slice: Ut, set: Vt, constructor: function constructor() {}, toString: mt, toLocaleString: Bt }), Rt(Wt, "buffer", "b"), Rt(Wt, "byteOffset", "o"), Rt(Wt, "byteLength", "l"), Rt(Wt, "length", "e"), V(Wt, bt, { get: function get() {
        return this[Et];
      } }), t.exports = function (t, e, n, u) {
      var c = t + ((u = !!u) ? "Clamped" : "") + "Array",
          f = o[c],
          d = f || {},
          p = f && O(f),
          g = !f || !a.ABV,
          y = {},
          b = f && f[X],
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
      };g ? (f = n(function (t, n, r, o) {
        l(t, f, c, "_d");var i,
            s,
            a,
            u,
            d = 0,
            p = 0;if (S(n)) {
          if (!(n instanceof $ || (u = w(n)) == W || u == Y)) return Et in n ? Nt(f, n) : Ft.call(f, n);i = n, p = Tt(r, e);var g = n.byteLength;if (void 0 === o) {
            if (g % e) throw z(Ot);if (0 > (s = g - p)) throw z(Ot);
          } else if ((s = v(o) * e) + p > g) throw z(Ot);a = s / e;
        } else a = m(n), i = new $(s = a * e);for (h(t, "_d", { b: i, o: p, l: s, e: a, v: new Q(i) }); d < a;) {
          A(t, d++);
        }
      }), b = f[X] = M(Wt), h(b, "constructor", f)) : (!i(function () {
        f(1);
      }) || !i(function () {
        new f(-1);
      }) || !F(function (t) {
        new f(), new f(null), new f(1.5), new f(t);
      }, !0)) && (f = n(function (t, n, r, o) {
        var i;return l(t, f, c), S(n) ? n instanceof $ || (i = w(n)) == W || i == Y ? void 0 === o ? void 0 === r ? new d(n) : new d(n, Tt(r, e)) : new d(n, Tt(r, e), o) : Et in n ? Nt(f, n) : Ft.call(f, n) : new d(m(n));
      }), Z(p === Function.prototype ? _(d) : _(d).concat(_(p)), function (t) {
        t in f || h(f, t, d[t]);
      }), f[X] = b, !r && (b.constructor = f));var P = b[yt],
          T = !!P && ("values" == P.name || null == P.name),
          k = Gt.values;h(f, wt, !0), h(b, Et, c), h(b, Mt, !0), h(b, St, f), (u ? new f(1)[bt] != c : !(bt in b)) && V(b, bt, { get: function get() {
          return c;
        } }), y[c] = f, s(s.G + s.W + s.F * (f != d), y), s(s.S, c, { BYTES_PER_ELEMENT: e }), s(s.S + s.F * i(function () {
        d.of.call(f, 1);
      }), c, { from: Ft, of: Lt }), q in b || h(b, q, e), s(s.P, c, jt), L(c), s(s.P + s.F * Pt, c, { set: Vt }), s(s.P + s.F * !T, c, Gt), r || b.toString == mt || (b.toString = mt), s(s.P + s.F * i(function () {
        new f(1).slice();
      }), c, { slice: Ut }), s(s.P + s.F * (i(function () {
        return [1, 2].toLocaleString() != new f([1, 2]).toLocaleString();
      }) || !i(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: Bt }), R[c] = T ? P : k, r || T || h(b, yt, k);
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
      f = t.exports = { KEY: r, NEED: !1, fastKey: function fastKey(t, e) {
      if (!o(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!i(t, r)) {
        if (!u(t)) return "F";if (!e) return "E";l(t);
      }return t[r].i;
    }, getWeak: function getWeak(t, e) {
      if (!i(t, r)) {
        if (!u(t)) return !0;if (!e) return !1;l(t);
      }return t[r].w;
    }, onFreeze: function onFreeze(t) {
      return c && f.NEED && u(t) && !i(t, r) && l(t), t;
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
        u = o[t] = a ? e(f) : s[t];n && (o[n] = u), r(r.P + r.F * a, "String", o);
  },
      f = l.trim = function (t, e) {
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
      f = function () {
    var t = /(?:)/,
        e = t.exec;t.exec = function () {
      return e.apply(this, arguments);
    };var n = "ab".split(t);return 2 === n.length && "a" === n[0] && "b" === n[1];
  }();t.exports = function (t, e, n) {
    var h = a(t),
        d = !i(function () {
      var e = {};return e[h] = function () {
        return 7;
      }, 7 != ""[t](e);
    }),
        p = d ? !i(function () {
      var e = !1,
          n = /a/;return n.exec = function () {
        return e = !0, null;
      }, "split" === t && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[h](""), !e;
    }) : void 0;if (!d || !p || "replace" === t && !l || "split" === t && !f) {
      var v = /./[h],
          m = n(s, h, ""[t], function (t, e, n, r, o) {
        return e.exec === u ? d && !o ? { done: !0, value: v.call(e, n, r) } : { done: !0, value: t.call(n, e, r) } : { done: !1 };
      }),
          g = m[0],
          y = m[1];r(String.prototype, t, g), o(RegExp.prototype, h, 2 == e ? function (t, e) {
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
      l = {};(e = t.exports = function (t, e, n, f, h) {
    var d,
        p,
        v,
        m,
        g = h ? function () {
      return t;
    } : u(t),
        y = r(n, f, e ? 2 : 1),
        b = 0;if ("function" != typeof g) throw TypeError(t + " is not iterable!");if (i(g)) {
      for (d = a(t.length); d > b; b++) {
        if ((m = e ? y(s(p = t[b])[0], p[1]) : y(t[b])) === c || m === l) return m;
      }
    } else for (v = g.call(t); !(p = v.next()).done;) {
      if ((m = o(v, y, p.value, e)) === c || m === l) return m;
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
      f = n(2),
      h = n(52),
      d = n(38),
      p = n(67);t.exports = function (t, e, n, v, m, g) {
    var y = r[t],
        b = y,
        w = m ? "set" : "add",
        S = b && b.prototype,
        x = {},
        E = function E(t) {
      var e = S[t];i(S, t, "delete" == t || "has" == t ? function (t) {
        return (!g || l(t)) && e.call(this, 0 === t ? 0 : t);
      } : "get" == t ? function (t) {
        return g && !l(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
      } : "add" == t ? function (t) {
        return e.call(this, 0 === t ? 0 : t), this;
      } : function (t, n) {
        return e.call(this, 0 === t ? 0 : t, n), this;
      });
    };if ("function" == typeof b && (g || S.forEach && !f(function () {
      new b().entries().next();
    }))) {
      var M = new b(),
          O = M[w](g ? {} : -0, 1) != M,
          _ = f(function () {
        M.has(1);
      }),
          A = h(function (t) {
        new b(t);
      }),
          P = !g && f(function () {
        for (var t = new b(), e = 5; e--;) {
          t[w](e, e);
        }return !t.has(-0);
      });A || ((b = e(function (e, n) {
        c(e, b, t);var r = p(new y(), e, b);return null != n && u(n, m, r[w], r), r;
      })).prototype = S, S.constructor = b), (_ || P) && (E("delete"), E("has"), m && E("get")), (P || O) && E(w), g && S.clear && delete S.clear;
    } else b = v.getConstructor(e, t, m, w), s(b.prototype, n), a.NEED = !0;return d(b, t), x[t] = b, o(o.G + o.W + o.F * (b != y), x), g || v.setStrong(b, t, m), b;
  };
}, function (t, e, n) {
  for (var r, o = n(1), i = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!o.ArrayBuffer || !o.DataView), l = c, f = 0, h = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; f < 9;) {
    (r = o[h[f++]]) ? (i(r.prototype, a, !0), i(r.prototype, u, !0)) : l = !1;
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
      f = n(5)("iterator"),
      h = !([].keys && "next" in [].keys()),
      d = "keys",
      p = "values",
      v = function v() {
    return this;
  };t.exports = function (t, e, n, m, g, y, b) {
    u(n, e, m);var w,
        S,
        x,
        E = function E(t) {
      return !h && t in A ? A[t] : function () {
        return new n(this, t);
      };
    },
        M = e + " Iterator",
        O = g == p,
        _ = !1,
        A = t.prototype,
        P = A[f] || A["@@iterator"] || g && A[g],
        T = P || E(g),
        k = g ? O ? E("entries") : T : void 0,
        C = "Array" == e && A.entries || P;if (C && (x = l(C.call(new t()))) !== Object.prototype && x.next && (c(x, M, !0), !r && "function" != typeof x[f] && s(x, f, v)), O && P && P.name !== p && (_ = !0, T = function T() {
      return P.call(this);
    }), (!r || b) && (h || _ || !A[f]) && s(A, f, T), a[e] = T, a[M] = v, g) if (w = { values: O ? T : E(p), keys: y ? T : E(d), entries: k }, b) for (S in w) {
      S in A || i(A, S, w[S]);
    } else o(o.P + o.F * (h || _), e, w);return w;
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
        f = this;return c && (n = new RegExp("^" + f.source + "$(?!\\s)", r.call(f))), u && (e = f[a]), s = o.call(f, t), u && s && (f[a] = f.global ? s.index + s[0].length : e), c && s && 1 < s.length && i.call(s[0], n, function () {
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
      f = l.process,
      h = l.setImmediate,
      d = l.clearImmediate,
      p = l.MessageChannel,
      v = l.Dispatch,
      m = 0,
      g = {},
      y = "onreadystatechange",
      b = function b() {
    var t = +this;if (g.hasOwnProperty(t)) {
      var e = g[t];delete g[t], e();
    }
  },
      w = function w(t) {
    b.call(t.data);
  };h && d || (h = function h(t) {
    for (var e = [], n = 1; arguments.length > n;) {
      e.push(arguments[n++]);
    }return g[++m] = function () {
      a("function" == typeof t ? t : Function(t), e);
    }, r(m), m;
  }, d = function d(t) {
    delete g[t];
  }, "process" == n(23)(f) ? r = function r(t) {
    f.nextTick(s(b, t, 1));
  } : v && v.now ? r = function r(t) {
    v.now(s(b, t, 1));
  } : p ? (i = (o = new p()).port2, o.port1.onmessage = w, r = s(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function r(t) {
    l.postMessage(t + "", "*");
  }, l.addEventListener("message", w, !1)) : r = y in c("script") ? function (t) {
    u.appendChild(c("script"))[y] = function () {
      u.removeChild(this), b.call(t);
    };
  } : function (t) {
    setTimeout(s(b, t, 1), 0);
  }), t.exports = { set: h, clear: d };
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
        f = 0,
        h = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for ((t = j(t)) != t || t === D ? (o = t == t ? 0 : 1, r = u) : (r = V(G(t) / z), 1 > t * (i = U(2, -r)) && (r--, i *= 2), 2 <= (t += 1 <= r + c ? l / i : l * U(2, 1 - c)) * i && (r++, i /= 2), r + c >= u ? (o = 0, r = u) : 1 <= r + c ? (o = (t * i - 1) * U(2, e), r += c) : (o = t * U(2, c - 1) * U(2, e), r = 0)); 8 <= e; s[f++] = 255 & o, o /= 256, e -= 8) {}for (r = r << e | o, a += e; 0 < a; s[f++] = 255 & r, r /= 256, a -= 8) {}return s[--f] |= 128 * h, s;
  }function o(t, e, n) {
    var r,
        o = 8 * n - e - 1,
        i = (1 << o) - 1,
        s = i >> 1,
        a = o - 7,
        u = n - 1,
        c = t[u--],
        l = 127 & c;for (c >>= 7; 0 < a; l = 256 * l + t[u], u--, a -= 8) {}for (r = l & (1 << -a) - 1, l >>= -a, a += e; 0 < a; r = 256 * r + t[u], u--, a -= 8) {}if (0 === l) l = 1 - s;else {
      if (l === i) return r ? NaN : c ? -D : D;r += U(2, e), l -= s;
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
  }function f(t, e, n) {
    _(t[C], e, { get: function get() {
        return this[n];
      } });
  }function h(t, e, n, r) {
    var o = M(+n);if (o + e > t[q]) throw L(I);var i = t[Y]._b,
        s = o + t[X],
        a = i.slice(s, s + e);return r ? a : a.reverse();
  }function d(t, e, n, r, o, i) {
    var s = M(+n);if (s + e > t[q]) throw L(I);for (var a = t[Y]._b, u = s + t[X], c = r(+o), l = 0; l < e; l++) {
      a[u + l] = c[i ? l : e - l - 1];
    }
  }var p = n(1),
      v = n(8),
      m = n(30),
      g = n(59),
      y = n(14),
      b = n(43),
      w = n(2),
      S = n(42),
      x = n(19),
      E = n(6),
      M = n(115),
      O = n(34).f,
      _ = n(9).f,
      A = n(79),
      P = n(38),
      T = "ArrayBuffer",
      k = "DataView",
      C = "prototype",
      I = "Wrong index!",
      _N2 = p[T],
      _R = p[k],
      F = p.Math,
      L = p.RangeError,
      D = p.Infinity,
      B = _N2,
      j = F.abs,
      U = F.pow,
      V = F.floor,
      G = F.log,
      z = F.LN2,
      K = "buffer",
      H = "byteLength",
      W = "byteOffset",
      Y = v ? "_b" : K,
      q = v ? "_l" : H,
      X = v ? "_o" : W;if (g.ABV) {
    if (!w(function () {
      _N2(1);
    }) || !w(function () {
      new _N2(-1);
    }) || w(function () {
      return new _N2(), new _N2(1.5), new _N2(NaN), _N2.name != T;
    })) {
      for (var J, $ = (_N2 = function N(t) {
        return S(this, _N2), new B(M(t));
      })[C] = B[C], Q = O(B), Z = 0; Q.length > Z;) {
        (J = Q[Z++]) in _N2 || y(_N2, J, B[J]);
      }m || ($.constructor = _N2);
    }var tt = new _R(new _N2(2)),
        et = _R[C].setInt8;tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), (tt.getInt8(0) || !tt.getInt8(1)) && b(_R[C], { setInt8: function setInt8(t, e) {
        et.call(this, t, e << 24 >> 24);
      }, setUint8: function setUint8(t, e) {
        et.call(this, t, e << 24 >> 24);
      } }, !0);
  } else _N2 = function _N(t) {
    S(this, _N2, T);var e = M(t);this._b = A.call(Array(e), 0), this[q] = e;
  }, _R = function R(t, e, n) {
    S(this, _R, k), S(t, _N2, k);var r = t[q],
        o = x(e);if (0 > o || o > r) throw L("Wrong offset!");if (o + (n = void 0 === n ? r - o : E(n)) > r) throw L("Wrong length!");this[Y] = t, this[X] = o, this[q] = n;
  }, v && (f(_N2, H, "_l"), f(_R, K, "_b"), f(_R, H, "_l"), f(_R, W, "_o")), b(_R[C], { getInt8: function getInt8(t) {
      return h(this, 1, t)[0] << 24 >> 24;
    }, getUint8: function getUint8(t) {
      return h(this, 1, t)[0];
    }, getInt16: function getInt16(t) {
      var e = h(this, 2, t, arguments[1]);return (e[1] << 8 | e[0]) << 16 >> 16;
    }, getUint16: function getUint16(t) {
      var e = h(this, 2, t, arguments[1]);return e[1] << 8 | e[0];
    }, getInt32: function getInt32(t) {
      return i(h(this, 4, t, arguments[1]));
    }, getUint32: function getUint32(t) {
      return i(h(this, 4, t, arguments[1])) >>> 0;
    }, getFloat32: function getFloat32(t) {
      return o(h(this, 4, t, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(t) {
      return o(h(this, 8, t, arguments[1]), 52, 8);
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
    } });P(_N2, T), P(_R, k), y(_R[C], g.VIEW, !0), e[T] = _N2, e[k] = _R;
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
    for (var e = a(t), n = arguments.length, c = 1, l = i.f, f = s.f; n > c;) {
      for (var h, d = u(arguments[c++]), p = l ? o(d).concat(l(d)) : o(d), v = p.length, m = 0; v > m;) {
        h = p[m++], (!r || f.call(d, h)) && (e[h] = d[h]);
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
  var r = n(215);t.exports = function (t, e) {
    return new (r(t))(e);
  };
}, function (t, e, n) {
  var r = n(18),
      o = n(10),
      i = n(44),
      s = n(6);t.exports = function (t, e, n, a, u) {
    r(e);var c = o(t),
        l = i(c),
        f = s(c.length),
        h = u ? f - 1 : 0,
        d = u ? -1 : 1;if (2 > n) for (;;) {
      if (h in l) {
        a = l[h], h += d;break;
      }if (h += d, u ? 0 > h : f <= h) throw TypeError("Reduce of empty array with no initial value");
    }for (; u ? 0 <= h : f > h; h += d) {
      h in l && (a = e(a, l[h], h, c));
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
        f = 1;for (u < a && a < u + l && (f = -1, u += l - 1, a += l - 1); 0 < l--;) {
      u in n ? n[a] = n[u] : delete n[a], a += f, u += f;
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
      f = n(0),
      h = n(4),
      d = n(18),
      p = n(42),
      v = n(56),
      m = n(47),
      g = n(83).set,
      y = n(235)(),
      b = n(111),
      w = n(236),
      S = n(57),
      x = n(112),
      E = "Promise",
      M = u.TypeError,
      O = u.process,
      _ = O && O.versions,
      A = _ && _.v8 || "",
      _P = u[E],
      T = "process" == l(O),
      k = function k() {},
      C = o = b.f,
      I = !!function () {
    try {
      var t = _P.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(k, k);
      };return (T || "function" == typeof PromiseRejectionEvent) && t.then(k) instanceof e && 0 !== A.indexOf("6.6") && -1 === S.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      N = function N(t) {
    var e;return !(!h(t) || "function" != typeof (e = t.then)) && e;
  },
      R = function R(t, e) {
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
            a ? (!o && (2 == t._h && D(t), t._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === e.promise ? c(M("Promise-chain cycle")) : (i = N(n)) ? i.call(n, u, c) : u(n)) : c(r);
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
    g.call(u, function () {
      var e,
          n,
          r,
          o = t._v,
          i = L(t);if (i && (e = w(function () {
        T ? O.emit("unhandledRejection", o, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: o }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", o);
      }), t._h = T || L(t) ? 2 : 1), t._a = void 0, i && e.e) throw e.v;
    });
  },
      L = function L(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      D = function D(t) {
    g.call(u, function () {
      var e;T ? O.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      B = function B(t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, !e._a && (e._a = e._c.slice()), R(e, !0));
  },
      j = function j(t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw M("Promise can't be resolved itself");(e = N(t)) ? y(function () {
          var r = { _w: n, _d: !1 };try {
            e.call(t, c(j, r, 1), c(B, r, 1));
          } catch (t) {
            B.call(r, t);
          }
        }) : (n._v = t, n._s = 1, R(n, !1));
      } catch (e) {
        B.call({ _w: n, _d: !1 }, e);
      }
    }
  };I || (_P = function P(t) {
    p(this, _P, E, "_h"), d(t), r.call(this);try {
      t(c(j, this, 1), c(B, this, 1));
    } catch (t) {
      B.call(this, t);
    }
  }, (r = function r() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_P.prototype, { then: function then(t, e) {
      var n = C(m(this, _P));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = T ? O.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise;
    }, catch: function _catch(t) {
      return this.then(void 0, t);
    } }), i = function i() {
    var t = new r();this.promise = t, this.resolve = c(j, t, 1), this.reject = c(B, t, 1);
  }, b.f = C = function C(t) {
    return t === _P || t === s ? new i(t) : o(t);
  }), f(f.G + f.W + f.F * !I, { Promise: _P }), n(38)(_P, E), n(41)(E), s = n(7)[E], f(f.S + f.F * !I, E, { reject: function reject(t) {
      var e = C(this);return (0, e.reject)(t), e.promise;
    } }), f(f.S + f.F * (a || !I), E, { resolve: function resolve(t) {
      return x(a && this === s ? _P : this, t);
    } }), f(f.S + f.F * !(I && n(52)(function (t) {
    _P.all(t).catch(k);
  })), E, { all: function all(t) {
      var e = this,
          n = C(e),
          r = n.resolve,
          o = n.reject,
          i = w(function () {
        var n = [],
            i = 0,
            s = 1;v(t, !1, function (t) {
          var a = i++,
              u = !1;n.push(void 0), s++, e.resolve(t).then(function (t) {
            u || (u = !0, n[a] = t, --s || r(n));
          }, o);
        }), --s || r(n);
      });return i.e && o(i.v), n.promise;
    }, race: function race(t) {
      var e = this,
          n = C(e),
          r = n.reject,
          o = w(function () {
        v(t, !1, function (t) {
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
      f = n(41),
      h = n(8),
      d = n(27).fastKey,
      p = n(37),
      v = h ? "_s" : "size",
      m = function m(t, e) {
    var n,
        r = d(e);if ("F" !== r) return t._i[r];for (n = t._f; n; n = n.n) {
      if (n.k == e) return n;
    }
  };t.exports = { getConstructor: function getConstructor(t, e, n, c) {
      var l = t(function (t, r) {
        a(t, l, e, "_i"), t._t = e, t._i = o(null), t._f = void 0, t._l = void 0, t[v] = 0, null != r && u(r, n, t[c], t);
      });return i(l.prototype, { clear: function clear() {
          for (var t = p(this, e), n = t._i, r = t._f; r; r = r.n) {
            r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
          }t._f = t._l = void 0, t[v] = 0;
        }, delete: function _delete(t) {
          var n = p(this, e),
              r = m(n, t);if (r) {
            var o = r.n,
                i = r.p;delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[v]--;
          }return !!r;
        }, forEach: function forEach(t) {
          p(this, e);for (var n, r = s(t, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (r(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        }, has: function has(t) {
          return !!m(p(this, e), t);
        } }), h && r(l.prototype, "size", { get: function get() {
          return p(this, e)[v];
        } }), l;
    }, def: function def(t, e, n) {
      var r,
          o,
          i = m(t, e);return i ? i.v = n : (t._l = i = { i: o = d(e, !0), k: e, v: n, p: r = t._l, n: void 0, r: !1 }, !t._f && (t._f = i), r && (r.n = i), t[v]++, "F" !== o && (t._i[o] = i)), t;
    }, getEntry: m, setStrong: function setStrong(t, e, n) {
      c(t, e, function (t, n) {
        this._t = p(t, e), this._k = n, this._l = void 0;
      }, function () {
        for (var t = this, e = t._k, n = t._l; n && n.r;) {
          n = n.p;
        }return t._t && (t._l = n = n ? n.n : t._t._f) ? l(0, "keys" == e ? n.k : "values" == e ? n.v : [n.k, n.v]) : (t._t = void 0, l(1));
      }, n ? "entries" : "values", !n, !0), f(e);
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
      f = n(37),
      h = c(5),
      d = c(6),
      p = 0,
      v = function v(t) {
    return t._l || (t._l = new m());
  },
      m = function m() {
    this.a = [];
  },
      g = function g(t, e) {
    return h(t.a, function (t) {
      return t[0] === e;
    });
  };m.prototype = { get: function get(t) {
      var e = g(this, t);if (e) return e[1];
    }, has: function has(t) {
      return !!g(this, t);
    }, set: function set(t, e) {
      var n = g(this, t);n ? n[1] = e : this.a.push([t, e]);
    }, delete: function _delete(t) {
      var e = d(this.a, function (e) {
        return e[0] === t;
      });return ~e && this.a.splice(e, 1), !!~e;
    } }, t.exports = { getConstructor: function getConstructor(t, e, n, i) {
      var c = t(function (t, r) {
        a(t, c, e, "_i"), t._t = e, t._i = p++, t._l = void 0, null != r && u(r, n, t[i], t);
      });return r(c.prototype, { delete: function _delete(t) {
          if (!s(t)) return !1;var n = o(t);return !0 === n ? v(f(this, e)).delete(t) : n && l(n, this._i) && delete n[this._i];
        }, has: function has(t) {
          if (!s(t)) return !1;var n = o(t);return !0 === n ? v(f(this, e)).has(t) : n && l(n, this._i);
        } }), c;
    }, def: function def(t, e, n) {
      var r = o(i(e), !0);return !0 === r ? v(t).set(e, n) : r[t._i] = n, t;
    }, ufstore: v };
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
        l = r(e);if (l <= u || "" == c) return a;var f = l - u,
        h = o.call(c, Math.ceil(f / c.length));return h.length > f && (h = h.slice(0, f)), s ? h + a : a + h;
  };
}, function (t, e, n) {
  var r = n(8),
      o = n(31),
      i = n(15),
      s = n(45).f;t.exports = function (t) {
    return function (e) {
      for (var n, a = i(e), u = o(a), c = u.length, l = 0, f = []; c > l;) {
        n = u[l++], (!r || s.call(a, n)) && f.push(t ? [n, a[n]] : a[n]);
      }return f;
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
  n(122);var r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(n(294));r.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), r.default._babelPolyfill = !0;
}, function (t, e, n) {
  "use strict";
  n(123), n(266), n(268), n(271), n(273), n(275), n(277), n(279), n(281), n(283), n(285), n(287), n(289), n(293);
}, function (t, e, n) {
  n(124), n(127), n(128), n(129), n(130), n(131), n(132), n(133), n(134), n(135), n(136), n(137), n(138), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(205), n(206), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(216), n(217), n(218), n(219), n(220), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(228), n(80), n(229), n(108), n(230), n(109), n(231), n(232), n(233), n(234), n(110), n(237), n(238), n(239), n(240), n(241), n(242), n(243), n(244), n(245), n(246), n(247), n(248), n(249), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), t.exports = n(7);
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
      f = n(38),
      h = n(29),
      d = n(5),
      p = n(61),
      v = n(89),
      m = n(126),
      g = n(51),
      y = n(3),
      b = n(4),
      w = n(10),
      S = n(15),
      x = n(26),
      E = n(28),
      M = n(33),
      O = n(92),
      _ = n(20),
      A = n(50),
      P = n(9),
      T = n(31),
      k = _.f,
      C = P.f,
      I = O.f,
      _N3 = r.Symbol,
      R = r.JSON,
      F = R && R.stringify,
      L = "prototype",
      D = d("_hidden"),
      B = d("toPrimitive"),
      j = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      V = l("symbols"),
      G = l("op-symbols"),
      z = Object[L],
      K = "function" == typeof _N3 && !!A.f,
      H = r.QObject,
      W = !H || !H[L] || !H[L].findChild,
      Y = i && c(function () {
    return 7 != M(C({}, "a", { get: function get() {
        return C(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var r = k(z, e);r && delete z[e], C(t, e, n), r && t !== z && C(z, e, r);
  } : C,
      q = function q(t) {
    var e = V[t] = M(_N3[L]);return e._k = t, e;
  },
      X = K && "symbol" == _typeof(_N3.iterator) ? function (t) {
    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  } : function (t) {
    return t instanceof _N3;
  },
      J = function J(t, e, n) {
    return t === z && J(G, e, n), y(t), e = x(e, !0), y(n), o(V, e) ? (n.enumerable ? (o(t, D) && t[D][e] && (t[D][e] = !1), n = M(n, { enumerable: E(0, !1) })) : (!o(t, D) && C(t, D, E(1, {})), t[D][e] = !0), Y(t, e, n)) : C(t, e, n);
  },
      $ = function $(t, e) {
    y(t);for (var n, r = m(e = S(e)), o = 0, i = r.length; i > o;) {
      J(t, n = r[o++], e[n]);
    }return t;
  },
      Q = function Q(t) {
    var e = j.call(this, t = x(t, !0));return (this !== z || !o(V, t) || o(G, t)) && (!(e || !o(this, t) || !o(V, t) || o(this, D) && this[D][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = S(t), e = x(e, !0), t !== z || !o(V, e) || o(G, e)) {
      var n = k(t, e);return n && o(V, e) && !(o(t, D) && t[D][e]) && (n.enumerable = !0), n;
    }
  },
      tt = function tt(t) {
    for (var e, n = I(S(t)), r = [], i = 0; n.length > i;) {
      o(V, e = n[i++]) || e == D || e == u || r.push(e);
    }return r;
  },
      et = function et(t) {
    for (var e, n = t === z, r = I(n ? G : S(t)), i = [], s = 0; r.length > s;) {
      o(V, e = r[s++]) && (!n || o(z, e)) && i.push(V[e]);
    }return i;
  };K || (a((_N3 = function N() {
    if (this instanceof _N3) throw TypeError("Symbol is not a constructor!");var t = h(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === z && e.call(G, n), o(this, D) && o(this[D], t) && (this[D][t] = !1), Y(this, t, E(1, n));
    };return i && W && Y(z, t, { configurable: !0, set: e }), q(t);
  })[L], "toString", function () {
    return this._k;
  }), _.f = Z, P.f = J, n(34).f = O.f = tt, n(45).f = Q, A.f = et, i && !n(30) && a(z, "propertyIsEnumerable", Q, !0), p.f = function (t) {
    return q(d(t));
  }), s(s.G + s.W + s.F * !K, { Symbol: _N3 });for (var nt = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], rt = 0; nt.length > rt;) {
    d(nt[rt++]);
  }for (var ot = T(d.store), it = 0; ot.length > it;) {
    v(ot[it++]);
  }s(s.S + s.F * !K, "Symbol", { for: function _for(t) {
      return o(U, t += "") ? U[t] : U[t] = _N3(t);
    }, keyFor: function keyFor(t) {
      if (!X(t)) throw TypeError(t + " is not a symbol!");for (var e in U) {
        if (U[e] === t) return e;
      }
    }, useSetter: function useSetter() {
      W = !0;
    }, useSimple: function useSimple() {
      W = !1;
    } }), s(s.S + s.F * !K, "Object", { create: function create(t, e) {
      return void 0 === e ? M(t) : $(M(t), e);
    }, defineProperty: J, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: tt, getOwnPropertySymbols: et });var st = c(function () {
    A.f(1);
  });s(s.S + s.F * st, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(t) {
      return A.f(w(t));
    } }), R && s(s.S + s.F * (!K || c(function () {
    var t = _N3();return "[null]" != F([t]) || "{}" != F({ a: t }) || "{}" != F(Object(t));
  })), "JSON", { stringify: function stringify(t) {
      for (var e, n, r = [t], o = 1; arguments.length > o;) {
        r.push(arguments[o++]);
      }if (n = e = r[1], (b(e) || void 0 !== t) && !X(t)) return g(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !X(_e)) return _e;
      }), r[1] = e, F.apply(R, r);
    } }), _N3[L][B] || n(14)(_N3[L], B, _N3[L].valueOf), f(_N3, "Symbol"), f(Math, "Math", !0), f(r.JSON, "JSON", !0);
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
      f = n(9).f,
      h = n(39).trim,
      d = "Number",
      _p = r[d],
      v = _p,
      m = _p.prototype,
      g = i(n(33)(m)) == d,
      y = "trim" in String.prototype,
      b = function b(t) {
    var e = a(t, !1);if ("string" == typeof e && 2 < e.length) {
      var n,
          r,
          o,
          i = (e = y ? e.trim() : h(e, 3)).charCodeAt(0);if (43 === i || 45 === i) {
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
          n = this;return n instanceof _p && (g ? u(function () {
        m.valueOf.call(n);
      }) : i(n) != d) ? s(new v(b(e)), n, _p) : b(e);
    };for (var w, S = n(8) ? c(v) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; S.length > x; x++) {
      o(v, w = S[x]) && !o(_p, w) && f(_p, w, l(v, w));
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
      f = "0",
      h = function h(t, e) {
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
        var n = c[t] + "";e = "" === e ? n : e + s.call(f, 7 - n.length) + n;
      }
    }return e;
  },
      v = function v(t, e, n) {
    return 0 === e ? n : 1 == e % 2 ? v(t, e - 1, n * t) : v(t * t, e / 2, n);
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
          g = f;if (0 > c || 20 < c) throw RangeError(l);if (u != u) return "NaN";if (-1e21 >= u || 1e21 <= u) return u + "";if (0 > u && (m = "-", u = -u), 1e-21 < u) if (n = 0 > (e = function (t) {
        for (var e = 0, n = t; 4096 <= n;) {
          e += 12, n /= 4096;
        }for (; 2 <= n;) {
          e += 1, n /= 2;
        }return e;
      }(u * v(2, 69, 1)) - 69) ? u * v(2, -e, 1) : u / v(2, e, 1), n *= 4503599627370496, 0 < (e = 52 - e)) {
        for (h(0, n), r = c; 7 <= r;) {
          h(1e7, 0), r -= 7;
        }for (h(v(10, r, 1), 0), r = e - 1; 23 <= r;) {
          d(8388608), r -= 23;
        }d(1 << r), h(1, 1), d(2), g = p();
      } else h(0, n), h(1 << -e, 0), g = p() + s.call(f, c);return 0 < c ? g = m + ((a = g.length) <= c ? "0." + s.call(f, c - a) + g : g.slice(0, a - c) + "." + g.slice(a - c)) : g = m + g, g;
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
  var r = n(0);r(r.S, "Math", { fround: n(169) });
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
      o = n(204);r(r.P + r.F * (Date.prototype.toISOString !== o), "Date", { toISOString: o });
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
      o = Date.prototype;r in o || n(14)(o, r, n(207));
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
          f,
          h = i(t),
          d = "function" == typeof this ? this : Array,
          p = arguments.length,
          v = 1 < p ? arguments[1] : void 0,
          m = void 0 !== v,
          g = 0,
          y = l(h);if (m && (v = r(v, 2 < p ? arguments[2] : void 0, 2)), null == y || d == Array && a(y)) for (n = new d(e = u(h.length)); e > g; g++) {
        c(n, g, m ? v(h[g], g) : h[g]);
      } else for (f = y.call(h), n = new d(); !(o = f.next()).done; g++) {
        c(n, g, m ? s(f, v, [o.value, g], !0) : o.value);
      }return n.length = g, n;
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
          r = i(this);if (e = void 0 === e ? n : e, "Array" == r) return u.call(this, t, e);for (var o = s(t, n), c = s(e, n), l = a(c - o), f = Array(l), h = 0; h < l; h++) {
        f[h] = "String" == r ? this.charAt(o + h) : this[o + h];
      }return f;
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
      f = _c2.prototype,
      h = /a/g,
      d = /a/g,
      p = new _c2(h) !== h;if (n(8) && (!p || n(2)(function () {
    return d[n(5)("match")] = !1, _c2(h) != h || _c2(d) == d || "/a/i" != _c2(h, "i");
  }))) {
    _c2 = function c(t, e) {
      var n = this instanceof _c2,
          r = a(t),
          i = void 0 === e;return !n && r && t.constructor === _c2 && i ? t : o(p ? new l(r && !i ? t.source : t, e) : l((r = t instanceof _c2) ? t.source : t, r && i ? u.call(t) : e), n ? this : f, _c2);
    };for (var v = function v(t) {
      (t in _c2) || i(_c2, t, { configurable: !0, get: function get() {
          return l[t];
        }, set: function set(e) {
          l[t] = e;
        } });
    }, m = s(l), g = 0; m.length > g;) {
      v(m[g++]);
    }f.constructor = _c2, _c2.prototype = f, n(11)(r, "RegExp", _c2);
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
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var f, h = [], d = 0; null !== (f = s(u, c));) {
        var p = f[0] + "";h[d] = p, "" == p && (u.lastIndex = i(c, o(u.lastIndex), l)), d++;
      }return 0 == d ? null : h;
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
      f = Math.floor,
      h = /\$([$&`']|\d\d?|<[^>]*>)/g,
      d = /\$([$&`']|\d\d?)/g,
      p = function p(t) {
    return void 0 === t ? t : t + "";
  };n(55)("replace", 2, function (t, e, n, v) {
    function m(t, e, r, i, s, a) {
      var u = r + t.length,
          c = i.length,
          l = d;return void 0 !== s && (s = o(s), l = h), n.call(a, l, function (n, o) {
        var a;switch (o.charAt(0)) {case "$":
            return "$";case "&":
            return t;case "`":
            return e.slice(0, r);case "'":
            return e.slice(u);case "<":
            a = s[o.slice(1, -1)];break;default:
            var l = +o;if (0 == l) return n;if (l > c) {
              var h = f(l / 10);return 0 === h ? n : h <= c ? void 0 === i[h - 1] ? o.charAt(1) : i[h - 1] + o.charAt(1) : n;
            }a = i[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (r, o) {
      var i = t(this),
          s = null == r ? void 0 : r[e];return void 0 === s ? n.call(i + "", r, o) : s.call(r, i, o);
    }, function (t, e) {
      var o = v(n, t, this, e);if (o.done) return o.value;var f = r(t),
          h = this + "",
          d = "function" == typeof e;d || (e += "");var g = f.global;if (g) {
        var y = f.unicode;f.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(f, h)) && (w.push(b), g);) {
        "" == b[0] + "" && (f.lastIndex = a(h, i(f.lastIndex), y));
      }for (var S = "", x = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", O = c(l(s(b.index), h.length), 0), _ = [], A = 1; A < b.length; A++) {
          _.push(p(b[A]));
        }var P = b.groups;if (d) {
          var T = [M].concat(_, O, h);void 0 !== P && T.push(P);var k = e.apply(void 0, T) + "";
        } else k = m(M, h, O, _, P, e);O >= x && (S += h.slice(x, O) + k, x = O + M.length);
      }return S + h.slice(x);
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
      f = Math.min,
      h = [].push,
      d = "split",
      p = "length",
      v = "lastIndex",
      m = 4294967295,
      g = !l(function () {
    RegExp(m, "y");
  });n(55)("split", 2, function (t, e, n, l) {
    var y;return y = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[p] || 2 != "ab"[d](/(?:ab)*/)[p] || 4 != "."[d](/(.?)(.?)/)[p] || 1 < "."[d](/()()/)[p] || ""[d](/.?/)[p] ? function (t, e) {
      var o = this + "";if (void 0 === t && 0 === e) return [];if (!r(t)) return n.call(o, t, e);for (var i, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), f = 0, d = void 0 === e ? m : e >>> 0, g = new RegExp(t.source, l + "g"); (i = c.call(g, o)) && !((s = g[v]) > f && (u.push(o.slice(f, i.index)), 1 < i[p] && i.index < o[p] && h.apply(u, i.slice(1)), a = i[0][p], f = s, u[p] >= d));) {
        g[v] === i.index && g[v]++;
      }return f === o[p] ? (a || !g.test("")) && u.push("") : u.push(o.slice(f)), u[p] > d ? u.slice(0, d) : u;
    } : "0"[d](void 0, 0)[p] ? function (t, e) {
      return void 0 === t && 0 === e ? [] : n.call(this, t, e);
    } : n, [function (n, r) {
      var o = t(this),
          i = null == n ? void 0 : n[e];return void 0 === i ? y.call(o + "", n, r) : i.call(n, o, r);
    }, function (t, e) {
      var r = l(y, t, this, e, y !== n);if (r.done) return r.value;var c = o(t),
          h = this + "",
          d = i(c, RegExp),
          p = c.unicode,
          v = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (g ? "y" : "g"),
          b = new d(g ? c : "^(?:" + c.source + ")", v),
          w = void 0 === e ? m : e >>> 0;if (0 == w) return [];if (0 === h.length) return null === u(b, h) ? [h] : [];for (var S = 0, x = 0, E = []; x < h.length;) {
        b.lastIndex = g ? x : 0;var M,
            O = u(b, g ? h : h.slice(x));if (null === O || (M = f(a(b.lastIndex + (g ? 0 : x)), h.length)) === S) x = s(h, x, p);else {
          if (E.push(h.slice(S, x)), E.length === w) return E;for (var _ = 1; _ <= O.length - 1; _++) {
            if (E.push(O[_]), E.length === w) return E;
          }x = S = M;
        }
      }return E.push(h.slice(S)), E;
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
      var f = !0,
          h = document.createTextNode("");new i(c).observe(h, { characterData: !0 }), n = function n() {
        h.data = f = !f;
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
      f = n(37),
      h = n(37),
      d = !o.ActiveXObject && "ActiveXObject" in o,
      p = "WeakMap",
      v = a.getWeak,
      m = Object.isExtensible,
      g = c.ufstore,
      y = function y(t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  },
      b = { get: function get(t) {
      if (l(t)) {
        var e = v(t);return !0 === e ? g(f(this, p)).get(t) : e ? e[this._i] : void 0;
      }
    }, set: function set(t, e) {
      return c.def(f(this, p), t, e);
    } },
      w = t.exports = n(58)(p, y, b, c, !0, !0);h && d && (u((r = c.getConstructor(y, p)).prototype, b), a.NEED = !0, i(["delete", "has", "get", "set"], function (t) {
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
      f = n(47),
      h = i.ArrayBuffer,
      d = i.DataView,
      p = o.ABV && l.isView,
      v = h.prototype.slice,
      m = o.VIEW,
      g = "ArrayBuffer";r(r.G + r.W + r.F * (l !== h), { ArrayBuffer: h }), r(r.S + r.F * !o.CONSTR, g, { isView: function isView(t) {
      return p && p(t) || c(t) && m in t;
    } }), r(r.P + r.U + r.F * n(2)(function () {
    return !new h(2).slice(1, void 0).byteLength;
  }), g, { slice: function slice(t, e) {
      if (void 0 !== v && void 0 === e) return v.call(s(this), t);for (var n = s(this).byteLength, r = a(t, n), o = a(void 0 === e ? n : e, n), i = new (f(this, h))(u(o - r)), c = new d(this), l = new d(i), p = 0; r < o;) {
        l.setUint8(p++, c.getUint8(r++));
      }return i;
    } }), n(41)(g);
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
      f = u(function () {
    function t() {}return !(l(function () {}, [], t) instanceof t);
  }),
      h = !u(function () {
    l(function () {});
  });r(r.S + r.F * (f || h), "Reflect", { construct: function construct(t, e) {
      i(t), s(e);var n = 3 > arguments.length ? t : i(arguments[2]);if (h && !f) return l(t, e, n);if (t == n) {
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
      var f,
          h,
          d = 4 > arguments.length ? e : arguments[3],
          p = o.f(c(e), n);if (!p) {
        if (l(h = i(e))) return t(h, n, a, d);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(d)) return !1;if (f = o.f(d, n)) {
          if (f.get || f.set || !1 === f.writable) return !1;f.value = a, r.f(d, n, f);
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
  n(267), t.exports = n(7).Array.includes;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(49)(!0);r(r.P, "Array", { includes: function includes(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (t, e, n) {
  n(269), t.exports = n(7).Array.flatMap;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(270),
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
      a = n(5)("isConcatSpreadable");t.exports = function t(e, n, u, c, l, f, h, d) {
    for (var p, v, m = l, g = 0, y = !!h && s(h, d, 3); g < c;) {
      if (g in u) {
        if (p = y ? y(u[g], g, n) : u[g], v = !1, o(p) && (v = void 0 === (v = p[a]) ? r(p) : !!v), v && 0 < f) m = t(e, n, p, i(p.length), m, f - 1) - 1;else {
          if (9007199254740991 <= m) throw TypeError();e[m] = p;
        }m++;
      }g++;
    }return m;
  };
}, function (t, e, n) {
  n(272), t.exports = n(7).String.padStart;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(117),
      i = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);r(r.P + r.F * s, "String", { padStart: function padStart(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (t, e, n) {
  n(274), t.exports = n(7).String.padEnd;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      o = n(117),
      i = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);r(r.P + r.F * s, "String", { padEnd: function padEnd(t) {
      return o(this, t, 1 < arguments.length ? arguments[1] : void 0, !1);
    } });
}, function (t, e, n) {
  n(276), t.exports = n(7).String.trimLeft;
}, function (t, e, n) {
  "use strict";
  n(39)("trimLeft", function (t) {
    return function () {
      return t(this, 1);
    };
  }, "trimStart");
}, function (t, e, n) {
  n(278), t.exports = n(7).String.trimRight;
}, function (t, e, n) {
  "use strict";
  n(39)("trimRight", function (t) {
    return function () {
      return t(this, 2);
    };
  }, "trimEnd");
}, function (t, e, n) {
  n(280), t.exports = n(61).f("asyncIterator");
}, function (t, e, n) {
  n(89)("asyncIterator");
}, function (t, e, n) {
  n(282), t.exports = n(7).Object.getOwnPropertyDescriptors;
}, function (t, e, n) {
  var r = n(0),
      o = n(116),
      i = n(15),
      s = n(20),
      a = n(77);r(r.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var e, n, r = i(t), u = s.f, c = o(r), l = {}, f = 0; c.length > f;) {
        void 0 !== (n = u(r, e = c[f++])) && a(l, e, n);
      }return l;
    } });
}, function (t, e, n) {
  n(284), t.exports = n(7).Object.values;
}, function (t, e, n) {
  var r = n(0),
      o = n(118)(!1);r(r.S, "Object", { values: function values(t) {
      return o(t);
    } });
}, function (t, e, n) {
  n(286), t.exports = n(7).Object.entries;
}, function (t, e, n) {
  var r = n(0),
      o = n(118)(!0);r(r.S, "Object", { entries: function entries(t) {
      return o(t);
    } });
}, function (t, e, n) {
  "use strict";
  n(110), n(288), t.exports = n(7).Promise.finally;
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
  n(290), n(291), n(292), t.exports = n(7);
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
  for (var r = n(80), o = n(31), i = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), f = c("toStringTag"), h = u.Array, d = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = o(d), v = 0; v < p.length; v++) {
    var m,
        g = p[v],
        y = d[g],
        b = s[g],
        w = b && b.prototype;if (w && (w[l] || a(w, l, h), w[f] || a(w, f, g), u[g] = h, y)) for (m in r) {
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
              l = c.value;return l && "object" == (typeof l === "undefined" ? "undefined" : _typeof(l)) && g.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
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
        if (o === M) throw new Error("Generator is already running");if (o === O) {
          if ("throw" === i) throw s;return { value: void 0, done: !0 };
        }for (n.method = i, n.arg = s;;) {
          var a = n.delegate;if (a) {
            var u = l(a, n);if (u) {
              if (u === _) continue;return u;
            }
          }if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === x) throw o = O, n.arg;n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);o = M;var c = r(t, e, n);if ("normal" === c.type) {
            if (o = n.done ? O : E, c.arg === _) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (o = O, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(t, e) {
      var n = t.iterator[e.method];if (void 0 === n) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, l(t, e), "throw" === e.method)) return _;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return _;
      }var o = r(n, t.iterator, e.arg);if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, _;var i = o.arg;return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, _) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, _);
    }function f(t) {
      var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }function h(t) {
      var e = t.completion || {};e.type = "normal", delete e.arg, t.completion = e;
    }function d(t) {
      this.tryEntries = [{ tryLoc: "root" }], t.forEach(f, this), this.reset(!0);
    }function p(t) {
      if (t) {
        var e = t[b];if (e) return e.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
          var n = -1,
              r = function e() {
            for (; ++n < t.length;) {
              if (g.call(t, n)) return e.value = t[n], e.done = !1, e;
            }return e.value = void 0, e.done = !0, e;
          };return r.next = r;
        }
      }return { next: v };
    }function v() {
      return { value: void 0, done: !0 };
    }var m = Object.prototype,
        g = m.hasOwnProperty,
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
        O = "completed",
        _ = {},
        A = {};A[b] = function () {
      return this;
    };var P = Object.getPrototypeOf,
        T = P && P(P(p([])));T && T !== m && g.call(T, b) && (A = T);var k = s.prototype = o.prototype = Object.create(A);return i.prototype = k.constructor = s, s.constructor = i, i.displayName = e(s, S, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;return !!e && (e === i || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (_defaults(t, s), e(t, S, "GeneratorFunction")), t.prototype = Object.create(k), t;
    }, t.awrap = function (t) {
      return { __await: t };
    }, a(u.prototype), u.prototype[w] = function () {
      return this;
    }, t.AsyncIterator = u, t.async = function (e, r, o, i, s) {
      void 0 === s && (s = Promise);var a = new u(n(e, r, o, i), s);return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, a(k), e(k, S, "Generator"), k[b] = function () {
      return this;
    }, k.toString = function () {
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
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(h), !t) for (var e in this) {
          "t" === e.charAt(0) && g.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
        }
      }, stop: function stop() {
        this.done = !0;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
      }, dispatchException: function dispatchException(t) {
        function e(e, r) {
          return i.type = "throw", i.arg = t, n.next = e, r && (n.method = "next", n.arg = void 0), !!r;
        }if (this.done) throw t;for (var n = this, r = this.tryEntries.length - 1; 0 <= r; --r) {
          var o = this.tryEntries[r],
              i = o.completion;if ("root" === o.tryLoc) return e("end");if (o.tryLoc <= this.prev) {
            var s = g.call(o, "catchLoc"),
                a = g.call(o, "finallyLoc");if (s && a) {
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
          if ((n = this.tryEntries[r]).tryLoc <= this.prev && g.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var o = n;break;
          }
        }o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);var i = o ? o.completion : {};return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, _) : this.complete(i);
      }, complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), _;
      }, finish: function finish(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).finallyLoc === t) return this.complete(e.completion, e.afterLoc), h(e), _;
        }
      }, catch: function _catch(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).tryLoc === t) {
            var r = e.completion;if ("throw" === r.type) {
              var o = r.arg;h(e);
            }return o;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function delegateYield(t, e, n) {
        return this.delegate = { iterator: p(t), resultName: e, nextLoc: n }, "next" === this.method && (this.arg = void 0), _;
      } }, t;
  }(t.exports);try {
    regeneratorRuntime = e;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(e);
  }
}, function (t, e, n) {
  n(295), t.exports = n(119).global;
}, function (t, e, n) {
  var r = n(296);r(r.G, { global: n(85) });
}, function (t, e, n) {
  var r = n(85),
      o = n(119),
      i = n(297),
      s = n(299),
      a = n(306),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        f,
        h,
        d = t & c.F,
        p = t & c.G,
        v = t & c.S,
        m = t & c.P,
        g = t & c.B,
        y = t & c.W,
        b = p ? o : o[e] || (o[e] = {}),
        w = b[u],
        S = p ? r : v ? r[e] : (r[e] || {})[u];for (l in p && (n = e), n) {
      (f = !d && S && void 0 !== S[l]) && a(b, l) || (h = f ? S[l] : n[l], b[l] = p && "function" != typeof S[l] ? n[l] : g && f ? i(h, r) : y && S[l] == h ? function (t) {
        var e = function e(_e3, n, r) {
          if (this instanceof t) {
            switch (arguments.length) {case 0:
                return new t();case 1:
                return new t(_e3);case 2:
                return new t(_e3, n);}return new t(_e3, n, r);
          }return t.apply(this, arguments);
        };return e[u] = t[u], e;
      }(h) : m && "function" == typeof h ? i(Function.call, h) : h, m && ((b.virtual || (b.virtual = {}))[l] = h, t & c.R && w && !w[l] && s(w, l, h)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t, e, n) {
  var r = n(298);t.exports = function (t, e, n) {
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
  var r = n(300),
      o = n(305);t.exports = n(87) ? function (t, e, n) {
    return r.f(t, e, o(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(301),
      o = n(302),
      i = n(304),
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
    return 7 != Object.defineProperty(n(303)("div"), "a", { get: function get() {
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
}, function (t, e, n) {
  "use strict";
  (function (t) {
    var e = function e(t, n, r, o) {
      var i = function i(e, n, _i) {
        return new o(function (t) {
          null !== _i && (_i = r.stringify(_i)), t(_i);
        }).then(function (r) {
          return t(n, { method: e, body: r });
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
          f = function f(t, e) {
        return function (n) {
          for (var _len = arguments.length, r = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            r[_key - 1] = arguments[_key];
          }

          return t.apply(undefined, [e(n)].concat(r));
        };
      },
          h = function h(t) {
        return function (e, i) {
          return o.resolve(new n(r.stringify({ address: e.slice(t.length), method: i.method, body: r.parse(i.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var i = "http://" + t,
              s = i + "/api";return { createUser: function createUser(t) {
              return c(s, { devicetype: t });
            }, user: function user(d) {
              Cookies.set("hueid", d, { expires: 30 });var p = s + "/" + d,
                  v = p + "/capabilities",
                  m = p + "/config",
                  g = p + "/lights",
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
                  O = M(g),
                  _ = M(y),
                  A = M(b),
                  P = M(w),
                  T = M(S),
                  k = M(x),
                  C = M(E);return { getCapabilities: a.bind(null, v), deleteUser: f(l, function (t) {
                  return m + "/whitelist/" + t;
                }), getConfig: a.bind(null, m), setConfig: u.bind(null, m), getFullState: a.bind(null, p), getLights: a.bind(null, g), getNewLights: a.bind(null, g + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(g, t);
                }, getLight: f(a, O), setLight: f(u, O), setLightState: f(u, function (t) {
                  return O(t) + "/state";
                }), deleteLight: f(l, O), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: f(a, _), setGroup: f(u, _), setGroupState: f(u, function (t) {
                  return _(t) + "/action";
                }), deleteGroup: f(l, _), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: f(a, A), setSchedule: f(u, A), deleteSchedule: f(l, A), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return e(h(i), n, r, o).bridge(t).user(d);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: f(a, P), setScene: f(u, P), setSceneLightState: function setSceneLightState(t, e, n) {
                  return u(P(t) + "/lightstates/" + e, n);
                }, deleteScene: f(l, P), getSensors: a.bind(null, S), createSensor: c.bind(null, S), searchForNewSensors: c.bind(null, S, null), getNewSensors: a.bind(null, S + "/new"), getSensor: f(a, T), setSensor: f(u, T), setSensorConfig: f(u, function (t) {
                  return T(t) + "/config";
                }), setSensorState: f(u, function (t) {
                  return T(t) + "/state";
                }), deleteSensor: f(l, T), getRules: a.bind(null, x), createRule: c.bind(null, x), getRule: f(a, k), setRule: f(u, k), deleteRule: f(l, k), ruleActionGenerator: function ruleActionGenerator() {
                  return e(h(p), n, r, o).bridge(t).user(d);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: f(a, C), setResourceLink: f(u, C), deleteResourceLink: f(l, C) };
            } };
        } };
    };var n = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (n = e.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = n));
  }).call(this, n(308)(t));
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
  }function o(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function i(t) {
    return "string" != typeof t && (t += ""), t;
  }function s(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return Z.iterable && (e[Symbol.iterator] = function () {
      return e;
    }), e;
  }function a(t) {
    this.map = {}, t instanceof a ? t.forEach(function (t, e) {
      this.append(e, t);
    }, this) : Array.isArray(t) ? t.forEach(function (t) {
      this.append(t[0], t[1]);
    }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
      this.append(e, t[e]);
    }, this);
  }function u(t) {
    return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0);
  }function c(t) {
    return new Promise(function (e, n) {
      t.onload = function () {
        e(t.result);
      }, t.onerror = function () {
        n(t.error);
      };
    });
  }function l(t) {
    var e = new FileReader(),
        n = c(e);return e.readAsArrayBuffer(t), n;
  }function f(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function h() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : Z.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : Z.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : Z.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : Z.arrayBuffer && Z.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = f(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : Z.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || et(t)) ? this._bodyArrayBuffer = f(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : Z.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, Z.blob && (this.blob = function () {
      var t = u(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? u(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l);
    }), this.text = function () {
      var t = u(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            n = c(e);return e.readAsText(t), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), n = Array(e.length), r = 0; r < e.length; r++) {
          n[r] = G(e[r]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, Z.formData && (this.formData = function () {
      return this.text().then(p);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function d(t, e) {
    var n = (e = e || {}).body;if (t instanceof d) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new a(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new a(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < nt.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function p(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var n = t.split("="),
            r = n.shift().replace(/\+/g, " "),
            o = n.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(r), decodeURIComponent(o));
      }
    }), e;
  }function v(t) {
    var e = new a();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var n = t.split(":"),
          r = n.shift().trim();if (r) {
        var o = n.join(":").trim();e.append(r, o);
      }
    }), e;
  }function m(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new a(e.headers), this.url = e.url || "", this._initBody(t);
  }function g(t, e) {
    return new Promise(function (n, r) {
      function o() {
        s.abort();
      }var i = new d(t, e);if (i.signal && i.signal.aborted) return r(new ot("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var t = { status: s.status, statusText: s.statusText, headers: v(s.getAllResponseHeaders() || "") };t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");var e = "response" in s ? s.response : s.responseText;n(new m(e, t));
      }, s.onerror = function () {
        r(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        r(new TypeError("Network request failed"));
      }, s.onabort = function () {
        r(new ot("Aborted", "AbortError"));
      }, s.open(i.method, i.url, !0), "include" === i.credentials ? s.withCredentials = !0 : "omit" === i.credentials && (s.withCredentials = !1), "responseType" in s && Z.blob && (s.responseType = "blob"), i.headers.forEach(function (t, e) {
        s.setRequestHeader(e, t);
      }), i.signal && (i.signal.addEventListener("abort", o), s.onreadystatechange = function () {
        4 === s.readyState && i.signal.removeEventListener("abort", o);
      }), s.send(void 0 === i._bodyInit ? null : i._bodyInit);
    });
  }function y(t) {
    console.log("[OpenAudioMc] " + t);
  }function b(t, e) {
    var n = e.media.loop,
        r = e.media.startInstant,
        o = e.media.mediaId,
        i = e.media.source,
        s = e.media.doPickup,
        a = e.media.fadeTime,
        u = e.distance,
        c = e.media.flag,
        l = e.maxDistance;var f = 100;null != e.media.volume && 0 != e.media.volume && (f = e.media.volume), t.getMediaManager().destroySounds(o, !1, !0);var h = new Q(o);h.trackable = !0;var d = new ft(i);if (d.openAudioMc = t, d.setOa(t), t.getMediaManager().mixer.addChannel(h), h.addSound(d), h.setChannelVolume(0), d.setLooping(n), h.setTag(o), 0 !== l) {
      var _t3 = this.convertDistanceToVolume(l, u);h.setTag("SPECIAL"), h.maxDistance = l, h.fadeChannel(_t3, a);
    } else h.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (h.setChannelVolume(f), h.updateFromMasterVolume()) : (h.updateFromMasterVolume(), h.fadeChannel(f, a));
    }, 1);h.setTag(c), t.getMediaManager().mixer.updateCurrent(), d.finalize().then(function () {
      s && d.startDate(r, !0), d.finish();
    });
  }function w(t, e) {
    var n = e.message;t.notificationModule.sendNotification(e.title, n), new $("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + n);
  }function S(t, e) {
    var n = parseInt(e.protocolRevision);if (console.log("[OpenAudioMc] Received PROTOCOL revision update"), 2 <= n && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0), 3 <= n && (console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks"), t.socketModule.supportsYoutube = !0), 4 <= n && (console.log("[OpenAudioMc] PROTO rev => 4, enabling volume callbacks"), t.mediaManager.startVolumeWatcher(t)), 3 > n) {
      new $("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function x(t, e) {
    var n = e.volume;t.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function E(t, e) {
    t.getMediaManager().destroySounds(e.soundId, e.all, !1, e.fadeTime);
  }function M(t, e) {
    var n = e.lights,
        r = e.hueColor,
        o = "rgba(" + r.r + "," + r.g + "," + r.b + "," + function (t, e, n) {
      return (t - e[0]) * (n[1] - n[0]) / (e[1] - e[0]) + n[0];
    }(r.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(n, o);
  }function O(t, e) {
    function n(t, e) {
      return K((t - e) / t * 100);
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
  }function _(t, e) {
    var n = e.x,
        r = e.y,
        o = e.z,
        i = e.pitch,
        s = e.yaw;t.world.player.updateLocation(new vt(n, r, o), i, s);
  }function A(t, e) {
    var n = e.clientSpeaker,
        r = new vt(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        o = new mt(n.id, n.source, r, n.type, n.maxDistance, n.startInstant, t);t.world.addSpeaker(n.id, o);
  }function P(t, e) {
    var n = e.clientSpeaker;t.world.removeSpeaker(n.id);
  }function T(t, e) {
    if (e.clear) console.log("[OpenAudioMc] Clearing pre-fetched resources"), setTimeout(function () {
      ct = {};
    }, 2500);else {
      var _t4 = e.source;console.log("[OpenAudioMc] Pre-fetching resource.."), setTimeout(function () {
        !function (t) {
          t = lt.translate(t);var e = new Audio();e.autoplay = !1, e.src = t, e.load(), ct[t] = e;
        }(_t4);
      }, 2500);
    }
  }function k(t, e) {
    t.voiceModule.enable(e.streamServer, e.streamKey, e.radius);
  }function C(t, e) {
    t.voiceModule.addPeer(e.targetUuid, e.targetPlayerName, e.targetStreamKey, e.location);
  }function I(t, e) {
    t.voiceModule.removePeer(e.streamKey);
  }function N(t, e) {
    for (var _n, _r = 0; _r < e.updateSet.length; _r++) {
      _n = e.updateSet[_r], t.voiceModule.peerLocationUpdate(_n.streamKey, _n.x, _n.y, _n.z);
    }
  }function R(t, e) {
    function n(t, e) {
      var n = 0,
          o = e || t.innerHTML,
          i = o.length;bt.push(window.setInterval(function () {
        n >= i && (n = 0), o = r(o, n), t.innerHTML = o, n++;
      }, 0));
    }function r(t, e) {
      var n = G(function (t, e) {
        return H(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + n + t.substr(e + 1, t.length);
    }var o = void 0,
        i = void 0,
        s = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t5 = 0; _t5 < s; _t5++) {
        i = e.childNodes[_t5], 3 === i.nodeType && (o = document.createElement("span"), o.innerHTML = i.nodeValue, e.replaceChild(o, i), n(o));
      }
    } else n(e, t);
  }function F(t, e) {
    var n = e.length,
        r = document.createElement("span"),
        o = !1;for (var _i2 = 0; _i2 < n; _i2++) {
      r.style.cssText += wt[e[_i2]] + ";", "§k" === e[_i2] && (R(t, r), o = !0);
    }return o || (r.innerHTML = t), r;
  }function L(t) {
    var e,
        n,
        r = t.match(/&.{1}/g) || [],
        o = [],
        i = [],
        s = document.createDocumentFragment(),
        a = r.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e5 = 0; _e5 < a; _e5++) {
      o.push(t.indexOf(r[_e5])), t = t.replace(r[_e5], "\0\0");
    }0 !== o[0] && s.appendChild(F(t.substring(0, o[0]), []));for (var _u = 0; _u < a; _u++) {
      if (2 === (n = o[_u + 1] - o[_u])) {
        for (; 2 == n;) {
          i.push(r[_u]), _u++, n = o[_u + 1] - o[_u];
        }i.push(r[_u]);
      } else i.push(r[_u]);-1 < i.lastIndexOf("§r") && (i = i.slice(i.lastIndexOf("§r") + 1)), e = t.substring(o[_u], o[_u + 1]), s.appendChild(F(e, i));
    }return s;
  }function D(t, e, n) {
    g(it.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: e, message: t }) }).then(function (t) {
      null != n && n(), t.json().then(function (t) {
        console.log("Reported error. Reponse was: " + JSON.stringify(t));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function B() {
    Et.canStart && Et.start();
  }function j(t) {
    console.log("[OpenAudioMc] " + t);
  }function U(t) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(t);
    });
  }function V(t) {
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
  }var G = String.fromCharCode,
      z = Math.abs,
      K = Math.round,
      H = Math.floor;n.r(e), n(121);
  var W = function () {
    function W() {
      _classCallCheck(this, W);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    W.prototype.sync = function sync(t, e) {
      var n = new Date(t),
          r = new Date().getTime();r += 60 * e * 60 * 1e3;var o = new Date(r);this.isServerAhead = n.getTime() > o.getTime(), this.msOffset = this.isServerAhead ? n.getTime() - o.getTime() : o.getTime() - n.getTime(), this.hasSynced = !0;
    };

    W.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return W;
  }();

  var Y = function () {
    function Y(t) {
      _classCallCheck(this, Y);

      this.fallback = "No message provided in oa+", this.main = t, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    Y.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return Y;
  }();

  var q = function () {
    function q(t) {
      _classCallCheck(this, q);

      this.openAudioMc = t;
    }

    q.prototype.changeColor = function changeColor(t, e) {
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

    q.prototype.setMessage = function setMessage(t) {
      document.getElementById("status-message").innerHTML = t;
    };

    q.prototype.openApp = function openApp() {
      r(X.MAIN_UI), this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    };

    q.prototype.kickScreen = function kickScreen(t) {
      r(X.KICKED), document.getElementById("kick-message").innerHTML = t;
    };

    return q;
  }();

  var X = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" },
      J = "rtc_initialized";
  var $ = function () {
    function $(t, e) {
      _classCallCheck(this, $);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    $.prototype.show = function show(t) {
      var _this = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
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
    function Q(t) {
      _classCallCheck(this, Q);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    Q.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    Q.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    Q.prototype.hasSoundPlaying = function hasSoundPlaying() {
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

    Q.prototype.addSound = function addSound(t) {
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

    Q.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    Q.prototype.registerMixer = function registerMixer(t) {
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

    Q.prototype.fadeChannel = function fadeChannel(t, e, n) {
      var _this3 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = t, this.isFading = !0, function (t, e, r, o) {
        e = e || 1e3, r = r || 0, o = o;var i = _this3.channelVolume,
            s = e / z(i - r),
            a = setInterval(function () {
          i = i > r ? i - 1 : i + 1;var t = _this3.mixer.masterVolume,
              e = i / 100 * t;var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this3.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
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

          if (_this3.channelVolume = i, i == r) {
            n(), clearInterval(a);var _t11 = _this3.fadeTimer.indexOf(a);-1 < _t11 && _this3.fadeTimer.splice(_t11, 1), _this3.isFading = !1, a = null;
          }
        }, s);_this3.fadeTimer.push(a);
      }(0, e, t, n);
    };

    Q.prototype.interruptFade = function interruptFade() {
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

    Q.prototype._updateVolume = function _updateVolume() {
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

    Q.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
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

    Q.prototype.destroy = function destroy() {
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

    return Q;
  }();

  var Z = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (Z.arrayBuffer) var tt = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      et = ArrayBuffer.isView || function (t) {
    return t && -1 < tt.indexOf(Object.prototype.toString.call(t));
  };a.prototype.append = function (t, e) {
    t = o(t), e = i(e);var n = this.map[t];this.map[t] = n ? n + ", " + e : e;
  }, a.prototype.delete = function (t) {
    delete this.map[o(t)];
  }, a.prototype.get = function (t) {
    return t = o(t), this.has(t) ? this.map[t] : null;
  }, a.prototype.has = function (t) {
    return this.map.hasOwnProperty(o(t));
  }, a.prototype.set = function (t, e) {
    this.map[o(t)] = i(e);
  }, a.prototype.forEach = function (t, e) {
    for (var n in this.map) {
      this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
    }
  }, a.prototype.keys = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push(n);
    }), s(t);
  }, a.prototype.values = function () {
    var t = [];return this.forEach(function (e) {
      t.push(e);
    }), s(t);
  }, a.prototype.entries = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push([n, e]);
    }), s(t);
  }, Z.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);var nt = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];d.prototype.clone = function () {
    return new d(this, { body: this._bodyInit });
  }, h.call(d.prototype), h.call(m.prototype), m.prototype.clone = function () {
    return new m(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new a(this.headers), url: this.url });
  }, m.error = function () {
    var t = new m(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var rt = [301, 302, 303, 307, 308];m.redirect = function (t, e) {
    if (-1 === rt.indexOf(e)) throw new RangeError("Invalid status code");return new m(null, { status: e, headers: { location: t } });
  };var ot = self.DOMException;try {
    new ot();
  } catch (e) {
    (ot = function ot(t, e) {
      this.message = t, this.name = e;var n = Error(t);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), ot.prototype.constructor = ot;
  }g.polyfill = !0, self.fetch || (self.fetch = g, self.Headers = a, self.Request = d, self.Response = m);var it = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", SERVER_STATUS: "https://client.openaudiomc.net/status?referee=", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var st = function () {
    function st(t, e, n, r) {
      _classCallCheck(this, st);

      this.publicServerKey = t, this.uuid = e, this.name = n, this.token = r;
    }

    st.prototype.initialize = function initialize() {
      return new Promise(function (t) {
        var e = window.location.href;if (null != e) {
          if (2 <= e.split("?").length) {
            var _n2 = function () {
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
            }().getParametersFromUrl(e.split("?")[1]);if (null == _n2.data) return void t(null);var _r3 = atob(_n2.data).split(":");if (4 !== _r3.length) return t(null), null;var _o = _r3[0],
                _i3 = _r3[1],
                _s = _r3[2],
                _a = _r3[3];null != _o && 16 >= _o.length && null != _i3 && 40 >= _i3.length && null != _s && 40 >= _s.length && null != _a && 5 >= _a.length || t(null);var _u2 = new st(_s, _i3, _o, _a);window.tokenCache = _u2, t(_u2);
          } else if (2 <= e.split("#").length) {
            var _n3 = e.split("#")[1];g(it.CLIENT_SESSION_SERVER + "?token=" + _n3).then(function (e) {
              e.json().then(function (e) {
                if (0 < e.errors.length) return console.log("Session error"), void t(null);var n = e.response;null == n.hasOwnProperty("serverIdentity") ? (y("No identity to fetch"), document.getElementById("top-head").src = "https://minotar.net/helm/" + n.playerName) : (y("Loading identity"), function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, e) {
                    var n, r;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            y("Fetching identity..");_context.next = 3;
                            return g("https://cloud.openaudiomc.net/identity?token=" + t);

                          case 3:
                            n = _context.sent;
                            _context.next = 6;
                            return n.json();

                          case 6:
                            r = _context.sent;
                            return _context.abrupt("return", 0 < r.errors.length ? void console.error("Could not load identity " + t) : (document.querySelector("link[rel*='icon']").href = r.response.icon + "&name=" + e, document.getElementById("top-head").src = r.response.icon + "&name=" + e, y("Native minecraft version: " + r.response.version), void y("Minecraft motd: " + r.response.motd)));

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }()(n.serverIdentity, n.playerName).then(function () {
                  return console.log;
                }).catch(function () {
                  return console.log;
                }));var r = new st(n.publicKey, n.playerUuid, n.playerName, n.session);window.tokenCache = r, t(r);
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

    st.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return st;
  }();

  var at = { PROXY: it.CONTENT_PROXY, YOUTUBE: it.YOUTUBE_PROXY, SOUNDCLOUD: it.SOUNDCLOUD_PROXY, DRIVE: it.DRIVE_PROXY };
  var ut = function () {
    function ut() {
      _classCallCheck(this, ut);
    }

    ut.prototype.translate = function translate(t) {
      var e = t = function (t) {
        if (t.startsWith("[") && t.endsWith("]")) {
          var _e6 = JSON.parse(t);return _e6[H(Math.random() * _e6.length)];
        }return t;
      }(t);try {
        if (e.includes("media.openaudiomc.net")) return t;if (e = e.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !e.includes("http")) return null;if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", at.DRIVE)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", at.DRIVE)), e.includes("https://drive.google.com/") && (e = e.split("file/d/")[1], e = at.DRIVE + e.split("/view")[0]), this.isYoutube = !1, e.includes("youtube.")) {
          var _t18 = e.split("v=")[1];e = at.YOUTUBE + _t18, this.isYoutube = !0;
        } else if (e.includes("youtu.be")) {
          var _t19 = e.split(".be/")[1];e = at.YOUTUBE + _t19, this.isYoutube = !0;
        }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (fetch("https://media.openaudiomc.net/2/soundcloud?u=" + e).then(function (t) {
          return t.json();
        }).then(function (t) {
          document.getElementById("sc-cover").style.display = "", document.getElementById("sc-title").style.display = "", document.getElementById("sc-title").innerText = t.artist + " - " + t.title, document.getElementById("sc-title").onclick = function () {
            window.open(t.link);
          }, document.getElementById("sc-cover").src = t.photo;
        }), e = at.SOUNDCLOUD + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = at.PROXY + e);
      } catch (n) {
        return console.log("Middleware error"), console.log(n), t;
      }var n = new st().fromCache();return e += e.includes("?") ? "&openAudioPlayerName=" + n.name : "?openAudioPlayerName=" + n.name, e += "&openAudioToken=" + n.token, e += "&openAudioPublicServerKey=" + n.publicServerKey, e;
    };

    return ut;
  }();

  var ct = {},
      lt = new ut();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
  var ft = function (_ut) {
    _inherits(ft, _ut);

    function ft(t) {
      var _this4;

      _classCallCheck(this, ft);

      (_this4 = _possibleConstructorReturn(this, _ut.call(this)), _this4), t = _this4.translate(t), _this4.soundElement = function (t) {
        t = lt.translate(t);var e = ct[t];return null == e ? new Audio() : e;
      }(t), _this4.hadError = !1, _this4.source = t, _this4.error = null, _this4.trackable = !1, _this4.soundElement.onerror = function (t) {
        _this4.hadError = !0, _this4.error = t, _this4._handleError();
      }, _this4.soundElement.src = t, _this4.soundElement.setAttribute("preload", "auto"), _this4.soundElement.setAttribute("controls", "none"), _this4.soundElement.setAttribute("display", "none"), _this4.soundElement.preload = "auto", _this4.soundElement.abort = console.log, _this4.openAudioMc = null, _this4.onFinish = [], _this4.loop = !1, _this4.mixer = null, _this4.channel = null, _this4.finsishedInitializing = !1, _this4.gotShutDown = !1;return _this4;
    }

    ft.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    ft.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var e = this.soundElement.error.code,
            _n4 = null;if (this.isYoutube ? _n4 = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === e ? _n4 = "MEDIA_ERR_ABORTED" : 2 === e ? _n4 = "MEDIA_ERR_NETWORK" : 3 === e ? _n4 = "MEDIA_ERR_DECODE" : 4 === e && (_n4 = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != _n4) {
          console.log("[OpenAudioMc] Reporting media failure " + _n4);var t = function t(_t20, e, n) {
            var r = {};return Object.getOwnPropertyNames(_t20).forEach(function (e) {
              r[e] = _t20[e];
            }), JSON.stringify(r, e, n);
          };null != this.source && "null" != this.source && this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + _n4 + "\ndump=" + t(this.error, null, "\t") + t(this.soundElement.error, null, "\t") + "\nhostname=" + window.location.host + "\nuseragent=" + window.navigator.userAgent), this.openAudioMc.socketModule.send("media_failure", { mediaError: _n4, source: this.soundElement.src });
        }
      }
    };

    ft.prototype.addNode = function addNode(t, e) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = at.PROXY + this.soundElement.src), this.controller = t.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(e);
    };

    ft.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    ft.prototype.finalize = function finalize() {
      var _this5 = this;

      return new Promise(function (t) {
        _this5.soundElement.onended = function () {
          _this5.gotShutDown || !_this5.finsishedInitializing || (_this5.onFinish.forEach(function (t) {
            t();
          }), _this5.loop ? (_this5.setTime(0), _this5.soundElement.play()) : (_this5.mixer.removeChannel(_this5.channel), !_this5.soundElement.paused && _this5.soundElement.pause()));
        };var e = !1;var n = function n() {
          if (!_this5.gotShutDown) {
            if (!e) {
              var _e7 = _this5.soundElement.play();_e7 instanceof Promise ? _e7.then(t).catch(t) : t();
            }e = !0;
          }
        };_this5.soundElement.onplay = function () {
          _this5.gotShutDown && (console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason."), _this5.soundElement.pause());
        }, _this5.soundElement.onprogress = n, _this5.soundElement.oncanplay = n, _this5.soundElement.oncanplaythrough = n;
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
          n = z((e.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          r = this.soundElement.duration;if (n > r) {
        n -= H(n / r) * r;
      }this.setTime(n);
    };

    ft.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    ft.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return ft;
  }(ut);

  var ht = function () {
    function ht(t, e) {
      _classCallCheck(this, ht);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null;
    }

    ht.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var t = !1;this.channels.forEach(function (e) {
        e.hasSoundPlaying() && (t = !0);
      }), t != this.areSoundsPlaying && (this._playingStateChangeChanged(t), this.areSoundsPlaying = t);
    };

    ht.prototype._playingStateChangeChanged = function _playingStateChangeChanged(t) {
      null == this.ambianceSoundMedia || (t ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    ht.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      var e = new Q("ambiance-lol-dics"),
          n = new ft(t);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), e.mixer = { masterVolume: this.masterVolume }, e.addSound(n), this.ambianceSoundMedia = e, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    ht.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, n) {
        var r = [];e.tags.forEach(function (t, e) {
          r.push(e);
        }), e.trackable && t.push({ name: n, tags: r });
      }), this._updatePlayingSounds();
    };

    ht.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.channels.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _t21 = _step12.value;
          _t21.updateFromMasterVolume();
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

    ht.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof Q ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this._updatePlayingSounds();
    };

    ht.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    ht.prototype.addChannel = function addChannel(t) {
      if (!(t instanceof Q)) throw new Error("Argument isn't a channel");{
        var e = t.channelName,
            _n5 = this.channels.get(e);null != _n5 && _n5.destroy(), t.registerMixer(this), this.channels.set(e, t);
      }this._updatePlayingSounds();
    };

    return ht;
  }();

  var dt = function () {
    function dt(t) {
      var _this6 = this;

      _classCallCheck(this, dt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.startSound = null, this.mixer = new ht(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this6.setMasterVolume(t), Cookies.set("volume", t, { expires: 30 });
      };
    }

    dt.prototype.startVolumeMonitor = function startVolumeMonitor(t) {
      var _this7 = this;

      var e = -1;setInterval(function () {
        e != _this7.masterVolume && (e = _this7.masterVolume, t.socketModule.send("volume_changed", { volume: _this7.masterVolume }));
      }, 300);
    };

    dt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      "" == t || null == t || this.mixer.setupAmbianceSound(t);
    };

    dt.prototype.startVolumeWatcher = function startVolumeWatcher(t) {
      this.startVolumeMonitor(t);
    };

    dt.prototype.postBoot = function postBoot() {
      var _this8 = this;

      if (null != this.startSound) {
        var _t22 = new Q("startsound"),
            e = new ft(this.startSound);e.openAudioMc = this.openAudioMc, e.setOa(this.openAudioMc), e.setOnFinish(function () {
          setTimeout(function () {
            _this8.mixer._updatePlayingSounds();
          }, 1e3);
        }), e.finalize().then(function () {
          _this8.mixer.addChannel(_t22), _t22.addSound(e), _t22.setChannelVolume(100), _t22.updateFromMasterVolume(), e.finish();
        });
      } else setTimeout(function () {
        _this8.mixer._updatePlayingSounds();
      }, 500);
    };

    dt.prototype.destroySounds = function destroySounds(t, e, n, r) {
      var _this9 = this;

      var o = r;null == o && (o = 500), n && (o = 0);var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        var _loop = function _loop() {
          var n = _step13.value;
          e ? n.fadeChannel(0, o, function () {
            _this9.mixer.removeChannel(n);
          }) : null == t || "" === t ? n.hasTag("SPECIAL") || n.hasTag("REGION") || n.hasTag("SPEAKER") || n.fadeChannel(0, o, function () {
            _this9.mixer.removeChannel(n);
          }) : n.hasTag(t) && (n.sounds.forEach(function (t) {
            t.gotShutDown = !0;
          }), n.fadeChannel(0, o, function () {
            _this9.mixer.removeChannel(n);
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

    dt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, 0 === t ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Audio Volume: " + t + "%", Cookies.set("volume", t, { expires: 30 }), this.mixer.setMasterVolume(t);
    };

    dt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    dt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return dt;
  }();

  var pt = function () {
    function pt(t, e) {
      var _this10 = this;

      _classCallCheck(this, pt);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], null == new st().fromCache()) return console.log("Empty authentication"), void r(X.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token;var n = this;this.socket = io(e, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.socketModule.state = "ok", _this10.hasConnected = !0, _this10.outgoingQueue.forEach(function (t) {
          _this10.send(t.key, t.value);
        });
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            n = parseInt(e[1]),
            r = parseInt(e[0]);_this10.openAudioMc.getTimeService().sync(r, n);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), n.state = "closed", r(X.BAD_AUTH), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010), t.voiceModule.shutDown();
      }), this.socket.on("data", function (t) {
        var e = t.type.split("."),
            r = e[e.length - 1];null != n.handlers[r] && n.handlers[r](t.payload);
      }), this.socket.connect();
    }

    pt.prototype.send = function send(t, e) {
      this.hasConnected ? this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + t), this.socket.emit(t, e)) : console.log("[OpenAudioMc] could not satisfy callback " + t + " because the protocol is outdated") : this.outgoingQueue.push({ key: t, value: e });
    };

    pt.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return pt;
  }();

  var vt = function () {
    function vt(t, e, n) {
      _classCallCheck(this, vt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0;
    }

    vt.prototype.add = function add(t, e, n) {
      return this.x += t, this.y += e, this.z += n, this;
    };

    vt.prototype.applyQuaternion = function applyQuaternion(t) {
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
          f = -o * e - i * n - s * r;return this.x = u * a + f * -o + c * -s - l * -i, this.y = c * a + f * -i + l * -o - u * -s, this.z = l * a + f * -s + u * -i - c * -o, this;
    };

    vt.prototype.square = function square(t) {
      return t * t;
    };

    vt.prototype.distance = function distance(t) {
      var e = this.square(this.x - t.x) + this.square(this.y - t.y) + this.square(this.z - t.z);return Math.sqrt(e);
    };

    return vt;
  }();

  var mt = function () {
    function mt(t, e, n, r, o, i, s) {
      _classCallCheck(this, mt);

      this.id = t, this.source = e, this.location = n, this.type = r, this.maxDistance = o, this.startInstant = i, this.openAudioMc = s, this.channel = null;
    }

    mt.prototype.getDistance = function getDistance(t, e) {
      return e.location.distance(this.location);
    };

    return mt;
  }();

  var gt = function gt(t) {
    _classCallCheck(this, gt);

    function e(e, n) {
      t.socketModule.registerHandler(e, function (e) {
        return n(t, e);
      });
    }e("ClientVersionPayload", S), e("NotificationPayload", w), e("HueColorPayload", M), e("ClientPlayerLocationPayload", _), e("ClientSpeakerCreatePayload", A), e("ClientSpeakerDestroyPayload", P), e("ClientPreFetchPayload", T), e("ClientUpdateMediaPayload", O), e("ClientCreateMediaPayload", b), e("ClientDestroyMediaPayload", E), e("ClientVolumePayload", x), e("ClientVoiceChatUnlockPayload", k), e("ClientVoiceSubscribePayload", C), e("ClientVoiceDropPayload", I), e("ClientVoiceUpdatePeerLocationsPayload", N);
  };

  var yt = function () {
    function yt() {
      var _this11 = this;

      _classCallCheck(this, yt);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this11.select();
        };
      });
    }

    yt.prototype.setBridgeName = function setBridgeName(t) {
      document.getElementById("bridge-name").innerText = t;
    };

    yt.prototype.select = function select() {
      this.updateState();
    };

    yt.prototype.applyState = function applyState() {
      var _this12 = this;

      this.state.forEach(function (t) {
        _this12.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    yt.prototype.updateState = function updateState() {
      var _this13 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this13.state.push(_this13.obtainSelection(t));
      }), Cookies.set("hue-state", this.state, { expires: 30 });
    };

    yt.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          n = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: n };
    };

    yt.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    yt.prototype.getInputById = function getInputById(t) {
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

    yt.prototype.getHueIdFromId = function getHueIdFromId(t) {
      return this.state[parseInt(t)].value;
    };

    yt.prototype.setLightNamesAndIds = function setLightNamesAndIds(t) {
      var e = "";t.forEach(function (t) {
        e += "<option data-light='" + t.id + "'>" + t.name + "</option>";
      }), this.dropdowns.forEach(function (t) {
        t.innerHTML = e;
      });
    };

    return yt;
  }();

  var bt = [],
      wt = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t23 = bt.length; _t23--;) {
        clearInterval(bt[_t23]);
      }bt = [];
    }(), L(this + "");
  };
  var St = function () {
    function St(t) {
      _classCallCheck(this, St);

      this.host = t;
    }

    St.prototype.route = function route(t) {
      var _this14 = this;

      return new Promise(function (e, n) {
        _this14.tokenSet = new st().fromCache(), g("https://cloud.openaudiomc.net/api/v2/account-services/client/login/" + _this14.tokenSet.publicServerKey).then(function (r) {
          r.json().then(function (r) {
            if (null == r.errors || 0 != r.errors.length) return n(r.errors), void console.log(r.errors);var o = r.response;if (o.banned) return void D("Declined connection due to ban " + window.location.host, "Steve", function () {
              window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
            });var i = o.secureEndpoint,
                s = o.ambianceSound;console.log("[OpenAudioMc] accepting and applying settings"), t.debugPrint("Updating settings..."), null != o.backgroundImage && "" != o.backgroundImage && (o.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + o.backgroundImage);var a = o.backgroundImage;"" !== a && (document.getElementById("banner-image").src = a);var u = o.title,
                c = o.clientWelcomeMessage,
                l = o.clientErrorMessage;var f = "";L(l).childNodes.forEach(function (t) {
              f += t.outerHTML;
            });var h = "";L(c).childNodes.forEach(function (t) {
              h += t.outerHTML;
            }), "" !== l && (t.getMessages().errorMessage = f), "" !== c && (t.getMessages().welcomeMessage = h);var d = o.greetingMessage;d = d.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = d, document.getElementById("initialize-button").innerHTML = o.connectButtonText, document.documentElement.style.setProperty("--border-color-dark", o.accentColor);var p = function (t, e) {
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
      });
    };

    return St;
  }();

  var xt = function () {
    function xt(t) {
      _classCallCheck(this, xt);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    xt.prototype.setupPermissions = function setupPermissions() {
      var _this15 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new $("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this15.requestNotificationPermissions();
      });
    };

    xt.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    xt.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this16 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this16.requestBox.hide(), new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this16.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return xt;
  }();

  n(307);var Et = null;
  var Mt = function Mt(t, e, n) {
    _classCallCheck(this, Mt);

    this.x = t || 0, this.y = e || 0, this.z = n || 0;
  };

  var Ot = function () {
    function Ot(t, e, n, r) {
      _classCallCheck(this, Ot);

      this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === r ? 1 : r;
    }

    Ot.prototype.setFromEuler = function setFromEuler(t) {
      var e = Math.sin,
          n = Math.cos;var r = t.x,
          o = t.y,
          i = t.z,
          s = n(r / 2),
          a = n(o / 2),
          u = n(i / 2),
          c = e(r / 2),
          l = e(o / 2),
          f = e(i / 2);return this.x = c * a * u + s * l * f, this.y = s * l * u - c * a * f, this.z = s * a * f + c * l * u, this.w = s * a * u - c * l * f, this;
    };

    return Ot;
  }();

  var _t = function () {
    function _t() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new vt();
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ot();

      _classCallCheck(this, _t);

      this.position = t, this.rotation = e;
    }

    _t.prototype.applyTo = function applyTo(t) {
      var e = this.position,
          n = new vt(0, 0, 1).applyQuaternion(this.rotation),
          r = new vt(0, 1, 0).applyQuaternion(this.rotation);t.positionX ? (t.positionX.value = e.x, t.positionY.value = e.y, t.positionZ.value = e.z) : t.setPosition(e.x, e.y, e.z), t instanceof PannerNode ? t.orientationX ? (t.orientationX.value = n.x, t.orientationY.value = n.y, t.orientationZ.value = n.z) : t.setOrientation(n.x, n.y, n.z) : t.forwardX ? (t.forwardX.value = n.x, t.forwardY.value = n.y, t.forwardZ.value = n.z, t.upX.value = r.x, t.upY.value = r.y, t.upZ.value = r.z) : t.setOrientation(n.x, n.y, n.z, r.x, r.y, r.z);
    };

    return _t;
  }();

  var At = function () {
    function At(t, e, n, r) {
      _classCallCheck(this, At);

      this.world = t, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(e, n, r);
    }

    At.prototype.updateLocation = function updateLocation(t, e, n) {
      this.location = t, this.pitch = this.toRadians(e), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var r = new Mt(this.pitch, this.yaw, 0),
          o = new Ot();o.setFromEuler(r);new _t(t, o).applyTo(this.listener), this.world.onLocationUpdate();
    };

    At.prototype.toRadians = function toRadians(t) {
      return t * (Math.PI / 180);
    };

    At.prototype.normalizeYaw = function normalizeYaw(t) {
      return 0 > (t %= 360) && (t += 360), t;
    };

    return At;
  }();

  var Pt = function Pt(t, e, n) {
    _classCallCheck(this, Pt);

    this.source = t, this.distance = e, this.speaker = n;
  };

  var Tt = "SPEAKER_2D";
  var kt = function kt(t, e, n, r) {
    _classCallCheck(this, kt);

    this.pannerNode = n.audioCtx.createPanner(), this.media = r, r.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = t.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var o = t.location;new _t(o).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var Ct = function () {
    function Ct(t, e, n) {
      var _this17 = this;

      _classCallCheck(this, Ct);

      this.id = "SPEAKER__" + e, this.openAudioMc = t, this.speakerNodes = new Map();var r = new Q(this.id);r.trackable = !0, this.channel = r;var o = new ft(e);this.media = o, o.openAudioMc = t, o.setOa(t), r.mixer = this.openAudioMc.getMediaManager().mixer, r.addSound(o), r.setChannelVolume(0), o.startDate(n, !0), o.finalize().then(function () {
        t.getMediaManager().mixer.addChannel(r), o.setLooping(!0), r.setTag(_this17.id), r.setTag("SPECIAL"), _this17.openAudioMc.getMediaManager().mixer.updateCurrent(), o.startDate(n, !0), o.finish();
      });
    }

    Ct.prototype.removeSpeakerLocation = function removeSpeakerLocation(t) {
      null != this.speakerNodes.get(t) && this.speakerNodes.delete(t);
    };

    Ct.prototype.updateLocation = function updateLocation(t, e, n) {
      if (t.type == Tt) {
        var _r5 = t.getDistance(e, n),
            _o3 = this._convertDistanceToVolume(t.maxDistance, _r5);if (0 >= _o3) return;this.channel.fadeChannel(_o3, 100);
      } else this.speakerNodes.has(t.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(t.id, new kt(t, e, n, this.media)));
    };

    Ct.prototype._convertDistanceToVolume = function _convertDistanceToVolume(t, e) {
      return K((t - e) / t * 100);
    };

    Ct.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return Ct;
  }();

  var It = function () {
    function It(t) {
      _classCallCheck(this, It);

      this.openAudioMc = t, this.speakers = new Map(), this.audioMap = new Map(), this.player = new At(this, new vt(0, 0, 0), 0, 0);
    }

    It.prototype.getSpeakerById = function getSpeakerById(t) {
      return this.speakers.get(t);
    };

    It.prototype.addSpeaker = function addSpeaker(t, e) {
      this.speakers.set(t, e), this.renderAudio2D();
    };

    It.prototype.removeSpeaker = function removeSpeaker(t) {
      this.speakers.delete(t), this.audioMap.forEach(function (t, e) {
        t.removeSpeakerLocation(e);
      }), this.renderAudio2D();
    };

    It.prototype.getMediaForSource = function getMediaForSource(t, e) {
      var n = this.audioMap.get(t);if (null != n) return n;if (null == e) return null;var r = new Ct(this.openAudioMc, t, e);return this.audioMap.set(t, r), r;
    };

    It.prototype.removeMediaFromSource = function removeMediaFromSource(t) {
      var e = this.getMediaForSource(t);null == e || (e.remove(), this.audioMap.delete(t));
    };

    It.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    It.prototype.isMediaUsed = function isMediaUsed(t) {
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

    It.prototype.renderAudio2D = function renderAudio2D() {
      var _this18 = this;

      var t = [];this.speakers.forEach(function (e) {
        var n = e.getDistance(_this18, _this18.player);t.push(new Pt(e.source, n, e));
      });var e = new Map();var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = t[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _n6 = _step16.value;
          var _t25 = e.get(_n6.source);null != _t25 ? Array.isArray(_t25) ? (_t25.push(_n6), e.set(_n6.source, _t25)) : _t25.distance > _n6.distance && _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.speaker.type == Tt ? _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, [_n6]);
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
            var _t24 = _step17.value;
            _this18.getMediaForSource(_t24.source, _t24.speaker.startInstant).updateLocation(_t24.speaker, _this18, _this18.player);
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
        _this18.isMediaUsed(e) || _this18.removeMediaFromSource(e);
      });
    };

    return It;
  }();

  var Nt = function () {
    function Nt() {
      _classCallCheck(this, Nt);

      this.successCallback = alert, this.errorCallback = alert;
    }

    Nt.prototype.getUserMedia = function getUserMedia(t) {
      var _this19 = this;

      return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
        return _this19.successCallback(t);
      }).catch(function (t) {
        return _this19.errorCallback(t);
      }) : void navigator.webkitGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.getUserMedia(t, this.successCallback, this.errorCallback);
    };

    return Nt;
  }();

  var Rt = function () {
    function Rt(t, e, n, r) {
      var _this20 = this;

      _classCallCheck(this, Rt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.micStream = r, this.isMuted = !1, document.getElementById("vc-mic-mute").onchange = function () {
        _this20.setMute(!_this20.isMuted);
      }, this.muteCooldown = !1;
    }

    Rt.prototype.start = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
        var _this21 = this;

        var e, n, r, o, _t26;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = this.server + "webrtc/broadcaster/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                j("Starting stream"), this.pcSender = new RTCPeerConnection({ iceServers: [{ urls: "stun:de2.voice.openaudiomc.net" }] }), this.pcSender.onconnectionstatechange = function () {
                  console.log("state " + _this21.pcSender.connectionState), j("State change " + _this21.pcSender.connectionState + " for " + _this21.streamKey);
                };n = !1, r = function r(e) {
                  if ("connected" === _this21.pcSender.connectionState || "connected" === e.target.iceConnectionState) {
                    if (n) return;n = !0, j("Finished handshake for" + _this21.streamKey), t(), _this21.openAudioMc.socketModule.send(J, { enabled: !0 });
                  }
                };
                this.pcSender.oniceconnectionstatechange = r, this.pcSender.addEventListener("connectionstatechange", r), this.pcSender.onicecandidate = function (t) {
                  j("Candidate event for " + _this21.streamKey + " nc " + (null == t.target));
                }, this.pcSender.onnegotiationneeded = function () {
                  j("Negotiation ended for " + _this21.streamKey);
                }, this.pcSender.onicecandidateerror = function (t) {
                  Swal.fire({ title: "Something went terribly wrong, and everything exploded", html: "Oh no, this wasn't supposed to happen at all! something went wrong while connecting you to the voice server.Please report this as a bug with the following details.<br /><b>Code: </b>" + t.errorCode + "<br /><b>Side: </b>BROADCASTER<br /><b>Context: </b>" + t.errorText + "<br /><b>RUI: </b>" + t.url + "<br /><b>HC: </b>" + t.hostCandidate, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1 });
                };o = this.micStream.getTracks();
                for (_t26 = 0; _t26 < o.length; _t26++) {
                  this.pcSender.addTrack(this.micStream.getTracks()[_t26]);
                }this.pcSender.createOffer().then(function (t) {
                  return _this21.pcSender.setLocalDescription(t);
                }).then(function () {
                  fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this21.pcSender.localDescription)) }) }).then(function (t) {
                    return t.json();
                  }).then(function (t) {
                    _this21.pcSender.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
                  }).catch(function (t) {
                    console.error(t);
                  });
                }).catch(console.error);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start(_x7) {
        return _ref2.apply(this, arguments);
      }

      return start;
    }();

    Rt.prototype.setMute = function setMute(t) {
      var _this22 = this;

      if (this.muteCooldown) Swal.fire("Please wait a moment before doing this again");else {
        this.isMuted = t, this.muteCooldown = !0, document.getElementById("vc-mic-mute").disabled = !0, setTimeout(function () {
          _this22.muteCooldown = !1, document.getElementById("vc-mic-mute").disabled = !1;
        }, 1500);for (var e = 0; e < this.micStream.getAudioTracks().length; e++) {
          this.micStream.getAudioTracks()[e].enabled = !t;
        }t ? this.openAudioMc.voiceModule.pushSocketEvent(jt.MIC_MUTE) : this.openAudioMc.voiceModule.pushSocketEvent(jt.MIC_UNMTE);
      }
    };

    Rt.prototype.stop = function stop() {
      this.micStream.getTracks().forEach(function (t) {
        t.stop();
      }), this.pcSender.close();
    };

    return Rt;
  }();

  var Ft = function () {
    function Ft(t, e, n, r) {
      var _this23 = this;

      _classCallCheck(this, Ft);

      this.playerName = t;var o = '\n        <div class="flex items-center p-2" id="vc-user-card-' + t + '">\n            <div class="w-16 h-16 rounded-full mr-3 overflow-hidden flex items-center">\n                <img src="https://visage.surgeplay.com/bust/512/' + e + '" class="w-16">\n            </div>\n            <div class="flex-1">\n                <div class="flex items-center">\n                    <div class="font-semibold text-lg text-teal-500">' + t + ' <small id="vc-user-card-' + t + '-volume-disp">(' + n + '% volume)</small>\n                    </div>\n                </div>\n                <div><input id="vc-user-card-' + t + '-volume-input"\n                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"\n                            type="range" min="0" max="120" step="1" value="' + n + '"/></div>\n            </div>\n        </div>\n        ';document.getElementById("vc-call-members").innerHTML += o, U(function () {
        document.getElementById("vc-user-card-" + t + "-volume-input").oninput = function () {
          var e = document.getElementById("vc-user-card-" + t + "-volume-input").value;r(e), _this23.updateVolumeDisplay(e);
        };
      });
    }

    Ft.prototype.remove = function remove() {
      document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName));
    };

    Ft.prototype.updateVolumeDisplay = function updateVolumeDisplay(t) {
      document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + t + "% volume)";
    };

    return Ft;
  }();

  var Lt = function () {
    function Lt(t, e, n, r, o) {
      _classCallCheck(this, Lt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.peerStreamKey = r, this.volume = o, this.volBooster = 1.2;
    }

    Lt.prototype.start = function start(t) {
      var _this24 = this;

      var e = this.server + "webrtc/listener/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/tg/" + this.peerStreamKey + "/sk/" + this.streamKey;this.pcReceiver = new RTCPeerConnection({ iceServers: [{ urls: "stun:de2.voice.openaudiomc.net" }] });var n = !1,
          r = function r(e) {
        if ("connected" === _this24.pcReceiver.connectionState || "connected" === e.target.iceConnectionState) {
          if (n) return;n = !0, j("Finished handshake for" + _this24.streamKey), t();
        }
      };this.pcReceiver.oniceconnectionstatechange = r, this.pcReceiver.addEventListener("connectionstatechange", r), this.pcReceiver.ontrack = function (t) {
        var e = t.streams[0],
            n = _this24.openAudioMc.world.player.audioCtx;_this24.setVolume(_this24.volume), _this24.gainNode = n.createGain();var r = new Audio();r.srcObject = e, _this24.gainNode.gain.value = _this24.volume / 100 * _this24.volBooster, r.onloadedmetadata = function () {
          var t = n.createMediaStreamSource(r.srcObject);if (r.play(), r.muted = !0, _this24.openAudioMc.voiceModule.surroundSwitch.isOn()) {
            var _e8 = _this24.gainNode;_this24.pannerNode = n.createPanner(), _this24.pannerNode.panningModel = "HRTF", _this24.pannerNode.maxDistance = _this24.openAudioMc.voiceModule.blocksRadius, _this24.pannerNode.rolloffFactor = 1, _this24.pannerNode.distanceModel = "linear", _this24.setLocation(_this24.x, _this24.y, _this24.z, !0), t.connect(_e8), _e8.connect(_this24.pannerNode), _this24.pannerNode.connect(n.destination);
          } else {
            var _e9 = _this24.gainNode;t.connect(_e9), _e9.connect(n.destination);
          }
        };
      }, this.pcReceiver.addTransceiver("audio", { direction: "recvonly" }), this.pcReceiver.createOffer().then(function (t) {
        return _this24.pcReceiver.setLocalDescription(t);
      }).then(function () {
        fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this24.pcReceiver.localDescription)) }) }).then(function (t) {
          return t.json();
        }).then(function (t) {
          return _this24.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
        }).catch(function (t) {
          console.error(t);
        });
      }).catch(console.error);
    };

    Lt.prototype.setLocation = function setLocation(t, e, n, r) {
      if (this.openAudioMc.voiceModule.useSurround) {
        if (r && null != this.pannerNode) {
          new _t(new vt(this.x, this.y, this.z)).applyTo(this.pannerNode);
        }this.x = t, this.y = e, this.z = n;
      }
    };

    Lt.prototype.setVolume = function setVolume(t) {
      this.volume = t, null != this.gainNode && (this.gainNode.gain.value = this.volume / 100 * this.volBooster);
    };

    Lt.prototype.stop = function stop() {
      j("Closing voice link with " + this.peerStreamKey);var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = this.pcReceiver.getReceivers()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var t = _step18.value;
          t.track.stop();
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

      this.pcReceiver.close();
    };

    return Lt;
  }();

  var Dt = function () {
    function Dt(t, e, n, r, o, i) {
      var _this25 = this;

      _classCallCheck(this, Dt);

      this.openAudioMc = t, this.playerName = e, this.playerUuid = e, this.streamKey = r, this.active = !0, this.ready = !1, this.location = i, this.volume = 80;var s = Cookies.get("vc-volume-of-" + e);null != s && (this.volume = parseInt(s)), this.ui = new Ft(e, n, this.volume, function (t) {
        _this25.volume = t, Cookies.set("vc-volume-of-" + e, t, { expires: 30 }), _this25.ready && _this25.stream.setVolume(_this25.volume);
      }), this.stream = new Lt(t, o, t.voiceModule.streamKey, r, this.volume), this.stream.setLocation(i.x, i.y, i.z, !1), this.stream.start(function () {
        return _this25.active ? (_this25.stream.setVolume(_this25.volume), void (_this25.ready = !0)) : void _this25.stop();
      });
    }

    Dt.prototype.updateLocation = function updateLocation(t, e, n) {
      this.stream.setLocation(t, e, n, !0);
    };

    Dt.prototype.stop = function stop() {
      this.active = !1, this.ui.remove(), null != this.stream && this.stream.stop();
    };

    return Dt;
  }();

  var Bt = function () {
    function Bt(t, e, n, r, o, i) {
      var _this26 = this;

      _classCallCheck(this, Bt);

      this.id = t, this.activeText = r, this.inactiveText = n, this.onToggle = i, this.state = null == Cookies.get(t) ? o : JSON.parse(Cookies.get(t));var s = '\n        <div style="text-align:center; width:100%">\n            <h4>' + e + '</h4>\n            <input class="tgl tgl-skewed" id="' + this.id + '" type="checkbox"/>\n            <label class="tgl-btn block w-max" data-tg-off="' + this.activeText + '" data-tg-on="' + this.inactiveText + '"\n                   for="' + this.id + '" style="width: 100%"></label>\n        </div>\n        ';document.getElementById("vc-toggles-wrapper").innerHTML += s, U(function () {
        document.getElementById(_this26.id).checked = !_this26.state, document.getElementById(_this26.id).onclick = function () {
          _this26.state = !_this26.state, Cookies.set(_this26.id, _this26.state, { expires: 30 }), _this26.onToggle(_this26.state);
        };
      });
    }

    Bt.prototype.getState = function getState() {
      return this.state;
    };

    Bt.prototype.isOn = function isOn() {
      return this.state;
    };

    return Bt;
  }();

  var jt = { MIC_MUTE: "MICROPHONE_MUTED", MIC_UNMTE: "MICROPHONE_UNMUTE" };
  var Ut = function () {
    function Ut(t) {
      var _this27 = this;

      _classCallCheck(this, Ut);

      this.openAudioMc = t, this.streamer = null, this.peerMap = new Map(), this.loadedDeviceList = !1, this.loadeMicPreference = Cookies.get("preferred-mic"), this.surroundSwitch = new Bt("use-surround", "Sound Type", "Constant volume", "Surround", !0, function (t) {
        _this27.openAudioMc.socketModule.send(J, { enabled: !1 }), _this27.useSurround = t, _this27.onSurrroundUpdate();
      }), this.useSurround = this.surroundSwitch.isOn();
    }

    Ut.prototype.enable = function enable(t, e, n) {
      var _this28 = this;

      this.blocksRadius = n, this.server = t, this.streamKey = e, document.getElementById("vc-controls").style.display = "", document.getElementById("vc-block-range").innerText = this.blocksRadius + " block", document.getElementById("vc-concent-button").onclick = function () {
        _this28.consent(_this28.loadeMicPreference);
      }, V("vc-onboarding");
    };

    Ut.prototype.addPeer = function addPeer(t, e, n, r) {
      j("Trying to add peer " + e), this.peerMap.set(n, new Dt(this.openAudioMc, e, t, n, this.server, r));
    };

    Ut.prototype.peerLocationUpdate = function peerLocationUpdate(t, e, n, r) {
      this.peerMap.has(t) && this.peerMap.get(t).updateLocation(e, n, r);
    };

    Ut.prototype.removePeer = function removePeer(t) {
      this.peerMap.has(t) ? (j("Removing peer " + t), this.peerMap.get(t).stop(), this.peerMap.delete(t)) : j("Couldn't remove peer " + t + " because, well, there is no such peer");
    };

    Ut.prototype.onSurrroundUpdate = function onSurrroundUpdate() {
      var _this29 = this;

      this.openAudioMc.socketModule.send(J, { enabled: !1 }), Swal.fire({ title: "Reloading voice system!", html: "Please wait while voice chat gets restarted to apply your new settings.. this shouldn't take long", timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && _this29.openAudioMc.socketModule.send(J, { enabled: !0 });
      });
    };

    Ut.prototype.handleAudioPermissions = function handleAudioPermissions(t) {
      var _this30 = this;

      this.loadedDeviceList || (navigator.mediaDevices.enumerateDevices().then(function (t) {
        var e = [];for (var _n7, _r6 = 0; _r6 < t.length; _r6++) {
          _n7 = t[_r6], "audioinput" === _n7.kind && e.push({ name: _n7.label, id: _n7.deviceId });
        }_this30.loadedDevices(e);
      }).catch(function (t) {
        console.error(t);
      }), this.loadedDeviceList = !0), Swal.fire({ title: "Logging into voice chat...", html: "Please wait while we get you setup with a voice server.. hold on tight, shits shouldn't take too long.<br /><small>(but please report an issue if it does take too long, it's still work in progress after all.</small>", showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        } }), this.streamer = new Rt(this.openAudioMc, this.server, this.streamKey, t), this.streamer.start(this.onOutoingStreamStart).catch(console.error);
    };

    Ut.prototype.changeInput = function changeInput(t) {
      var _this31 = this;

      j("Stopping current streamer, and restarting with a diferent user input"), Cookies.set("preferred-mic", t, { expires: 30 }), this.streamer.setMute(!1), this.streamer.stop(), this.streamer = null, this.openAudioMc.socketModule.send(J, { enabled: !1 }), Swal.fire({ title: "Updating microphone!", html: "Please wait while voice chat gets restarted with your new microphone.. this shouldn't take long", timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (e) {
        e.dismiss === Swal.DismissReason.timer && _this31.consent(t);
      });
    };

    Ut.prototype.loadedDevices = function loadedDevices(t) {
      var _this32 = this;

      var e = document.getElementById("vc-mic-select");for (; 0 < e.options.length;) {
        e.remove(0);
      }for (var _n8 = 0; _n8 < t.length; _n8++) {
        var _r7 = t[_n8],
            _o4 = document.createElement("option");null == this.loadeMicPreference && 0 == _n8 && (_o4.selected = !0), _o4.value = _r7.id, _o4.innerText = _r7.name, _o4.dataset.deviceId = _r7.id, e.add(_o4);
      }null != this.loadeMicPreference && (e.value = this.loadeMicPreference), e.onchange = function (t) {
        var e = t.target.value;_this32.changeInput(e);
      };
    };

    Ut.prototype.onOutoingStreamStart = function onOutoingStreamStart() {
      V("voice-home"), Swal.close();
    };

    Ut.prototype.consent = function consent(t) {
      var e = t ? { audio: { deviceId: { exact: t }, noiseSuppression: !1, sampleRate: 64e3, echoCancellation: !1, autoGainControl: !1 } } : { audio: { noiseSuppression: !1, sampleRate: 64e3, echoCancellation: !1, autoGainControl: !1 } },
          n = new Nt();n.successCallback = function (t) {
        this.openAudioMc.voiceModule.handleAudioPermissions(t);
      }.bind(this), n.errorCallback = function (t) {
        console.error(t), this.openAudioMc.voiceModule.permissionError(t);
      }.bind(this), n.getUserMedia(e);
    };

    Ut.prototype.permissionError = function permissionError() {
      V("vc-onboarding"), Swal.fire({ showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Microphone error", text: 'Something went wrong while trying to access your microphone. Please press "allow" when your browser asks you for microphone permissions, or visit the wiki for more info.', footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' });
    };

    Ut.prototype.shutDown = function shutDown() {
      document.getElementById("vc-controls").style.display = "none", null != this.streamer && this.streamer.stop();var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.peerMap[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var _step19$value = _slicedToArray(_step19.value, 2),
              t = _step19$value[0],
              e = _step19$value[1];

          e.stop();
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

    Ut.prototype.pushSocketEvent = function pushSocketEvent(t) {
      null != this.streamer && this.openAudioMc.socketModule.send(J, { event: t });
    };

    return Ut;
  }();

  n.d(e, "OpenAudioMc", function () {
    return Vt;
  });
  var Vt = function (_ref3) {
    _inherits(Vt, _ref3);

    function Vt() {
      var _this33, _ret2;

      _classCallCheck(this, Vt);

      if ((_this33 = _possibleConstructorReturn(this, _ref3.call(this)), _this33), _this33.canStart = !1, _this33.host = null, _this33.background = null, _this33.ambianceSound = "", _this33.tokenSet = new st().fromCache(), null == _this33.tokenSet) return _ret2 = void r(X.BAD_AUTH), _possibleConstructorReturn(_this33, _ret2);_this33.notificationModule = new xt(_this33), _this33.timeService = new W(), _this33.messages = new Y(_this33), _this33.userInterfaceModule = new q(_this33), _this33.hueConfiguration = new yt(_this33), _this33.mediaManager = new dt(_this33), _this33.voiceModule = new Ut(_this33);new St(it.MAIN_BACKEND).route(_this33).then(function (t) {
        _this33.canStart = !0, _this33.host = t.host, _this33.background = t.background, _this33.ambianceSound = t.ambianceSound, r(X.WELCOME);var e = Cookies.get("volume");null != e && _this33.mediaManager.changeVolume(e);
      }).catch(function (t) {
        console.error("Exception thrown", t.stack), _this33.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this33);
    }

    Vt.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new It(this), this.socketModule = new pt(this, this.host), this.messages.apply(), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new gt(this), "" !== this.background && (document.getElementById("banner-image").src = this.background), this.mediaManager.postBoot());
    };

    Vt.prototype.sendError = function sendError(t) {
      D(t, this.tokenSet.name);
    };

    return Vt;
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
    if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");new st().initialize().then(function (t) {
      return null == t ? (r(X.BAD_AUTH), window.location.href = "/login.html", void D("A faulty login attempt was done at " + window.location.host, "Steve")) : (null != t && null != t.name && (document.getElementById("in-game-name").innerText = t.name, Et = new Vt()), document.body.addEventListener("click", B), void (.5 <= Math.random() && g(it.SERVER_STATUS + t.name).then(function (t) {
        t.json().then(function (t) {
          t.offline ? (console.log("Redirecting because network error"), window.location.href = "https://help.openaudiomc.net/network_error.html") : console.log("[OpenAudioMc] Server status:" + JSON.stringify(t));
        });
      })));
    }).catch(function (t) {
      console.log(t), window.location.href = "https://help.openaudiomc.net/network_error.html";
    });
  }, window.onhashchange = function () {
    return window.location.reload();
  };
}]);
