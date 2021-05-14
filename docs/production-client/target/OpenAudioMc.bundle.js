"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

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
  }, e.p = "", e(e.s = 332);
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
        f,
        d,
        p = t & c.F,
        g = t & c.G,
        m = t & c.S,
        v = t & c.P,
        y = t & c.B,
        b = g ? r : m ? r[e] || (r[e] = {}) : (r[e] || {})[u],
        w = g ? i : i[e] || (i[e] = {}),
        S = w[u] || (w[u] = {});for (l in g && (n = e), n) {
      f = ((h = !p && b && void 0 !== b[l]) ? b : n)[l], d = y && h ? a(f, r) : v && "function" == typeof f ? a(Function.call, f) : f, b && s(b, l, f, t & c.U), w[l] != f && o(w, l, d), v && S[l] != f && (S[l] = f);
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
      i = n(90),
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
      a = n(137),
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
      u = n(90),
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
      a = n(106);t.exports = function (t, e) {
    var n = 1 == t,
        u = 4 == t,
        c = 6 == t,
        l = e || a;return function (e, a, h) {
      for (var f, d, p = o(e), g = i(p), m = r(a, h, 3), v = s(g.length), y = 0, b = n ? l(e, v) : 2 == t ? l(e, 0) : void 0; v > y; y++) {
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
        i = n(1),
        o = n(2),
        s = n(0),
        a = n(59),
        u = n(85),
        c = n(17),
        l = n(42),
        h = n(28),
        f = n(14),
        d = n(43),
        p = n(19),
        g = n(6),
        m = n(117),
        v = n(32),
        y = n(26),
        b = n(13),
        w = n(46),
        S = n(4),
        x = n(10),
        E = n(77),
        M = n(33),
        k = n(35),
        O = n(34).f,
        C = n(79),
        _ = n(29),
        I = n(5),
        A = n(22),
        P = n(49),
        T = n(47),
        N = n(81),
        R = n(40),
        L = n(52),
        F = n(41),
        B = n(80),
        j = n(108),
        D = n(9),
        U = n(20),
        V = D.f,
        H = U.f,
        z = i.RangeError,
        G = i.TypeError,
        W = i.Uint8Array,
        q = "ArrayBuffer",
        K = "Shared" + q,
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
        ft = X.reduceRight,
        dt = X.join,
        pt = X.sort,
        gt = X.slice,
        mt = X.toString,
        vt = X.toLocaleString,
        yt = I("iterator"),
        bt = I("toStringTag"),
        wt = _("typed_constructor"),
        St = _("def_constructor"),
        xt = a.CONSTR,
        Et = a.TYPED,
        Mt = a.VIEW,
        kt = "Wrong length!",
        Ot = A(1, function (t, e) {
      return Pt(T(t, t[St]), e);
    }),
        Ct = o(function () {
      return 1 === new W(new Uint16Array([1]).buffer)[0];
    }),
        _t = !!W && !!W[Y].set && o(function () {
      new W(1).set({});
    }),
        It = function It(t, e) {
      var n = p(t);if (0 > n || n % e) throw z("Wrong offset!");return n;
    },
        At = function At(t) {
      if (S(t) && Et in t) return t;throw G(t + " is not a typed array!");
    },
        Pt = function Pt(t, e) {
      if (!S(t) || !(wt in t)) throw G("It is not a typed array constructor!");return new t(e);
    },
        Tt = function Tt(t, e) {
      return Nt(T(t, t[St]), e);
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
        Lt = function Lt(t) {
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
          f = C(a);if (null != f && !E(f)) {
        for (s = f.call(a), r = [], e = 0; !(o = s.next()).done; e++) {
          r.push(o.value);
        }a = r;
      }for (h && 2 < u && (l = c(l, arguments[2], 2)), e = 0, n = g(a.length), i = Pt(this, n); n > e; e++) {
        i[e] = h ? l(a[e], e) : a[e];
      }return i;
    },
        Ft = function Ft() {
      for (var t = 0, e = arguments.length, n = Pt(this, e); e > t;) {
        n[t] = arguments[t++];
      }return n;
    },
        Bt = !!W && o(function () {
      vt.call(new W(1));
    }),
        jt = function jt() {
      return vt.apply(Bt ? gt.call(At(this)) : At(this), arguments);
    },
        Dt = { copyWithin: function copyWithin(t, e) {
        return j.call(At(this), t, e, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(t) {
        return nt(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return B.apply(At(this), arguments);
      }, filter: function filter(t) {
        return Tt(this, tt(At(this), t, 1 < arguments.length ? arguments[1] : void 0));
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
        return dt.apply(At(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return lt.apply(At(this), arguments);
      }, map: function map(t) {
        return Ot(At(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return ht.apply(At(this), arguments);
      }, reduceRight: function reduceRight() {
        return ft.apply(At(this), arguments);
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
            i = v(t, r);return new (T(n, n[St]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, g((void 0 === e ? r : v(e, r)) - i));
      } },
        Ut = function Ut(t, e) {
      return Tt(this, gt.call(At(this), t, e));
    },
        Vt = function Vt(t) {
      At(this);var e = It(arguments[1], 1),
          n = this.length,
          r = x(t),
          i = g(r.length),
          o = 0;if (i + e > n) throw z(kt);for (; o < i;) {
        this[e + o] = r[o++];
      }
    },
        Ht = { entries: function entries() {
        return ct.call(At(this));
      }, keys: function keys() {
        return ut.call(At(this));
      }, values: function values() {
        return at.call(At(this));
      } },
        zt = function zt(t, e) {
      return S(t) && t[Et] && "symbol" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && e in t && +e + "" == e + "";
    },
        Gt = function Gt(t, e) {
      return zt(t, e = y(e, !0)) ? h(2, t[e]) : H(t, e);
    },
        Wt = function Wt(t, e, n) {
      return !(zt(t, e = y(e, !0)) && S(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(t, e, n) : (t[e] = n.value, t);
    };xt || (U.f = Gt, D.f = Wt), s(s.S + s.F * !xt, "Object", { getOwnPropertyDescriptor: Gt, defineProperty: Wt }), o(function () {
      mt.call({});
    }) && (mt = vt = function vt() {
      return dt.call(this);
    });var qt = d({}, Dt);d(qt, Ht), f(qt, yt, Ht.values), d(qt, { slice: Ut, set: Vt, constructor: function constructor() {}, toString: mt, toLocaleString: jt }), Rt(qt, "buffer", "b"), Rt(qt, "byteOffset", "o"), Rt(qt, "byteLength", "l"), Rt(qt, "length", "e"), V(qt, bt, { get: function get() {
        return this[Et];
      } }), t.exports = function (t, e, n, u) {
      var c = t + ((u = !!u) ? "Clamped" : "") + "Array",
          h = i[c],
          d = h || {},
          p = h && k(h),
          v = !h || !a.ABV,
          y = {},
          b = h && h[Y],
          x = function x(n, r) {
        var i = n._d;return i.v["get" + t](r * e + i.o, Ct);
      },
          E = function E(n, r, i) {
        var o = n._d;u && (i = 0 > (i = Math.round(i)) ? 0 : 255 < i ? 255 : 255 & i), o.v["set" + t](r * e + o.o, i, Ct);
      },
          C = function C(t, e) {
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
            d = 0,
            p = 0;if (S(n)) {
          if (!(n instanceof $ || (u = w(n)) == q || u == K)) return Et in n ? Nt(h, n) : Lt.call(h, n);o = n, p = It(r, e);var v = n.byteLength;if (void 0 === i) {
            if (v % e) throw z(kt);if (0 > (s = v - p)) throw z(kt);
          } else if ((s = g(i) * e) + p > v) throw z(kt);a = s / e;
        } else a = m(n), o = new $(s = a * e);for (f(t, "_d", { b: o, o: p, l: s, e: a, v: new Q(o) }); d < a;) {
          C(t, d++);
        }
      }), b = h[Y] = M(qt), f(b, "constructor", h)) : (!o(function () {
        h(1);
      }) || !o(function () {
        new h(-1);
      }) || !L(function (t) {
        new h(), new h(null), new h(1.5), new h(t);
      }, !0)) && (h = n(function (t, n, r, i) {
        var o;return l(t, h, c), S(n) ? n instanceof $ || (o = w(n)) == q || o == K ? void 0 === i ? void 0 === r ? new d(n) : new d(n, It(r, e)) : new d(n, It(r, e), i) : Et in n ? Nt(h, n) : Lt.call(h, n) : new d(m(n));
      }), Z(p === Function.prototype ? O(d) : O(d).concat(O(p)), function (t) {
        t in h || f(h, t, d[t]);
      }), h[Y] = b, !r && (b.constructor = h));var _ = b[yt],
          I = !!_ && ("values" == _.name || null == _.name),
          A = Ht.values;f(h, wt, !0), f(b, Et, c), f(b, Mt, !0), f(b, St, h), (u ? new h(1)[bt] != c : !(bt in b)) && V(b, bt, { get: function get() {
          return c;
        } }), y[c] = h, s(s.G + s.W + s.F * (h != d), y), s(s.S, c, { BYTES_PER_ELEMENT: e }), s(s.S + s.F * o(function () {
        d.of.call(h, 1);
      }), c, { from: Lt, of: Ft }), J in b || f(b, J, e), s(s.P, c, Dt), F(c), s(s.P + s.F * _t, c, { set: Vt }), s(s.P + s.F * !I, c, Ht), r || b.toString == mt || (b.toString = mt), s(s.P + s.F * o(function () {
        new h(1).slice();
      }), c, { slice: Ut }), s(s.P + s.F * (o(function () {
        return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
      }) || !o(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: jt }), R[c] = I ? _ : A, r || I || f(b, yt, A);
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
  var r = n(92),
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
      i = n(93),
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
  var r = n(92),
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
  n(110);var r = n(11),
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
    var f = a(t),
        d = !o(function () {
      var e = {};return e[f] = function () {
        return 7;
      }, 7 != ""[t](e);
    }),
        p = d ? !o(function () {
      var e = !1,
          n = /a/;return n.exec = function () {
        return e = !0, null;
      }, "split" === t && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[f](""), !e;
    }) : void 0;if (!d || !p || "replace" === t && !l || "split" === t && !h) {
      var g = /./[f],
          m = n(s, f, ""[t], function (t, e, n, r, i) {
        return e.exec === u ? d && !i ? { done: !0, value: g.call(e, n, r) } : { done: !0, value: t.call(n, e, r) } : { done: !1 };
      }),
          v = m[0],
          y = m[1];r(String.prototype, t, v), i(RegExp.prototype, f, 2 == e ? function (t, e) {
        return y.call(t, this, e);
      } : function (t) {
        return y.call(t, this);
      });
    }
  };
}, function (t, e, n) {
  var r = n(17),
      i = n(105),
      o = n(77),
      s = n(3),
      a = n(6),
      u = n(79),
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
        b = 0;if ("function" != typeof v) throw TypeError(t + " is not iterable!");if (o(v)) {
      for (d = a(t.length); d > b; b++) {
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
      f = n(52),
      d = n(38),
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
          O = h(function () {
        M.has(1);
      }),
          C = f(function (t) {
        new b(t);
      }),
          _ = !v && h(function () {
        for (var t = new b(), e = 5; e--;) {
          t[w](e, e);
        }return !t.has(-0);
      });C || ((b = e(function (e, n) {
        c(e, b, t);var r = p(new y(), e, b);return null != n && u(n, m, r[w], r), r;
      })).prototype = S, S.constructor = b), (O || _) && (E("delete"), E("has"), m && E("get")), (_ || k) && E(w), v && S.clear && delete S.clear;
    } else b = g.getConstructor(e, t, m, w), s(b.prototype, n), a.NEED = !0;return d(b, t), x[t] = b, i(i.G + i.W + i.F * (b != y), x), v || g.setStrong(b, t, m), b;
  };
}, function (t, e, n) {
  for (var r, i = n(1), o = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!i.ArrayBuffer || !i.DataView), l = c, h = 0, f = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; h < 9;) {
    (r = i[f[h++]]) ? (o(r.prototype, a, !0), o(r.prototype, u, !0)) : l = !1;
  }t.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
}, function (t, e, n) {
  "use strict";
  (function (t, r) {
    n.d(e, "a", function () {
      return i;
    }), function (e) {
      if ("function" == typeof bootstrap) bootstrap("hark", e);else if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports))) t.exports = e();else if ("function" == typeof define && n(331)) define(e);else if ("undefined" != typeof ses) {
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
                f = e.play,
                d = e.history || 10,
                p = !0;i = e.audioContext || i || new n(), (u = i.createAnalyser()).fftSize = 512, u.smoothingTimeConstant = c, a = new Float32Array(u.frequencyBinCount), t.jquery && (t = t[0]), t instanceof HTMLAudioElement || t instanceof HTMLVideoElement ? (s = i.createMediaElementSource(t), void 0 === f && (f = !0), h = h || -50) : (s = i.createMediaStreamSource(t), h = h || -50), s.connect(u), f && u.connect(i.destination), o.speaking = !1, o.suspend = function () {
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
            }, o.speakingHistory = [];for (var g = 0; g < d; g++) {
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
  }).call(this, n(131)(t), n(330));
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
      u = n(104),
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
      return !f && t in C ? C[t] : function () {
        return new n(this, t);
      };
    },
        M = e + " Iterator",
        k = v == p,
        O = !1,
        C = t.prototype,
        _ = C[h] || C["@@iterator"] || v && C[v],
        I = _ || E(v),
        A = v ? k ? E("entries") : I : void 0,
        P = "Array" == e && C.entries || _;if (P && (x = l(P.call(new t()))) !== Object.prototype && x.next && (c(x, M, !0), !r && "function" != typeof x[h] && s(x, h, g)), k && _ && _.name !== p && (O = !0, I = function I() {
      return _.call(this);
    }), (!r || b) && (f || O || !C[h]) && s(C, h, I), a[e] = I, a[M] = g, v) if (w = { values: k ? I : E(p), keys: y ? I : E(d), entries: A }, b) for (S in w) {
      S in C || o(C, S, w[S]);
    } else i(i.P + i.F * (f || O), e, w);return w;
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
      i = n(109),
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
      a = n(98),
      u = n(65),
      c = n(61),
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
  } : p ? (o = (i = new p()).port2, i.port1.onmessage = w, r = s(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function r(t) {
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
        i,
        o,
        s = Array(n),
        a = 8 * n - e - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        l = 23 === e ? U(2, -24) - U(2, -77) : 0,
        h = 0,
        f = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for ((t = D(t)) != t || t === B ? (i = t == t ? 0 : 1, r = u) : (r = V(H(t) / z), 1 > t * (o = U(2, -r)) && (r--, o *= 2), 2 <= (t += 1 <= r + c ? l / o : l * U(2, 1 - c)) * o && (r++, o /= 2), r + c >= u ? (i = 0, r = u) : 1 <= r + c ? (i = (t * o - 1) * U(2, e), r += c) : (i = t * U(2, c - 1) * U(2, e), r = 0)); 8 <= e; s[h++] = 255 & i, i /= 256, e -= 8) {}for (r = r << e | i, a += e; 0 < a; s[h++] = 255 & r, r /= 256, a -= 8) {}return s[--h] |= 128 * f, s;
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
    O(t[P], e, { get: function get() {
        return this[n];
      } });
  }function f(t, e, n, r) {
    var i = M(+n);if (i + e > t[J]) throw F(T);var o = t[K]._b,
        s = i + t[Y],
        a = o.slice(s, s + e);return r ? a : a.reverse();
  }function d(t, e, n, r, i, o) {
    var s = M(+n);if (s + e > t[J]) throw F(T);for (var a = t[K]._b, u = s + t[Y], c = r(+i), l = 0; l < e; l++) {
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
      M = n(117),
      k = n(34).f,
      O = n(9).f,
      C = n(80),
      _ = n(38),
      I = "ArrayBuffer",
      A = "DataView",
      P = "prototype",
      T = "Wrong index!",
      _N2 = p[I],
      _R = p[A],
      L = p.Math,
      F = p.RangeError,
      B = p.Infinity,
      j = _N2,
      D = L.abs,
      U = L.pow,
      V = L.floor,
      H = L.log,
      z = L.LN2,
      G = "buffer",
      W = "byteLength",
      q = "byteOffset",
      K = g ? "_b" : G,
      J = g ? "_l" : W,
      Y = g ? "_o" : q;if (v.ABV) {
    if (!w(function () {
      _N2(1);
    }) || !w(function () {
      new _N2(-1);
    }) || w(function () {
      return new _N2(), new _N2(1.5), new _N2(NaN), _N2.name != I;
    })) {
      for (var X, $ = (_N2 = function N(t) {
        return S(this, _N2), new j(M(t));
      })[P] = j[P], Q = k(j), Z = 0; Q.length > Z;) {
        (X = Q[Z++]) in _N2 || y(_N2, X, j[X]);
      }m || ($.constructor = _N2);
    }var tt = new _R(new _N2(2)),
        et = _R[P].setInt8;tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), (tt.getInt8(0) || !tt.getInt8(1)) && b(_R[P], { setInt8: function setInt8(t, e) {
        et.call(this, t, e << 24 >> 24);
      }, setUint8: function setUint8(t, e) {
        et.call(this, t, e << 24 >> 24);
      } }, !0);
  } else _N2 = function _N(t) {
    S(this, _N2, I);var e = M(t);this._b = C.call(Array(e), 0), this[J] = e;
  }, _R = function R(t, e, n) {
    S(this, _R, A), S(t, _N2, A);var r = t[J],
        i = x(e);if (0 > i || i > r) throw F("Wrong offset!");if (i + (n = void 0 === n ? r - i : E(n)) > r) throw F("Wrong length!");this[K] = t, this[Y] = i, this[J] = n;
  }, g && (h(_N2, W, "_l"), h(_R, G, "_b"), h(_R, W, "_l"), h(_R, q, "_o")), b(_R[P], { getInt8: function getInt8(t) {
      return f(this, 1, t)[0] << 24 >> 24;
    }, getUint8: function getUint8(t) {
      return f(this, 1, t)[0];
    }, getInt16: function getInt16(t) {
      var e = f(this, 2, t, arguments[1]);return (e[1] << 8 | e[0]) << 16 >> 16;
    }, getUint16: function getUint16(t) {
      var e = f(this, 2, t, arguments[1]);return e[1] << 8 | e[0];
    }, getInt32: function getInt32(t) {
      return o(f(this, 4, t, arguments[1]));
    }, getUint32: function getUint32(t) {
      return o(f(this, 4, t, arguments[1])) >>> 0;
    }, getFloat32: function getFloat32(t) {
      return i(f(this, 4, t, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(t) {
      return i(f(this, 8, t, arguments[1]), 52, 8);
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
    } });_(_N2, I), _(_R, A), y(_R[P], v.VIEW, !0), e[I] = _N2, e[A] = _R;
}, function (t) {
  var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
}, function (t) {
  t.exports = function (t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  t.exports = !n(122)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  function r(t, e) {
    this._init(t, e);
  }var i = n(319).string,
      o = n(328),
      s = n(329);r.prototype._init = function (t, e) {
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
      for (var f, d = u(arguments[c++]), p = l ? i(d).concat(l(d)) : i(d), g = p.length, m = 0; g > m;) {
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
      i = n(4),
      o = n(98),
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
  var r = n(227);t.exports = function (t, e) {
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
      f = n(4),
      d = n(18),
      p = n(42),
      g = n(56),
      m = n(47),
      v = n(84).set,
      y = n(247)(),
      b = n(113),
      w = n(248),
      S = n(57),
      x = n(114),
      E = "Promise",
      M = u.TypeError,
      k = u.process,
      O = k && k.versions,
      C = O && O.v8 || "",
      _2 = u[E],
      I = "process" == l(k),
      A = function A() {},
      P = i = b.f,
      T = !!function () {
    try {
      var t = _2.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(A, A);
      };return (I || "function" == typeof PromiseRejectionEvent) && t.then(A) instanceof e && 0 !== C.indexOf("6.6") && -1 === S.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      N = function N(t) {
    var e;return !(!f(t) || "function" != typeof (e = t.then)) && e;
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
        }t._c = [], t._n = !1, e && !t._h && L(t);
      });
    }
  },
      L = function L(t) {
    v.call(u, function () {
      var e,
          n,
          r,
          i = t._v,
          o = F(t);if (o && (e = w(function () {
        I ? k.emit("unhandledRejection", i, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: i }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", i);
      }), t._h = I || F(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;
    });
  },
      F = function F(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      B = function B(t) {
    v.call(u, function () {
      var e;I ? k.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      j = function j(t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, !e._a && (e._a = e._c.slice()), R(e, !0));
  },
      D = function D(t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw M("Promise can't be resolved itself");(e = N(t)) ? y(function () {
          var r = { _w: n, _d: !1 };try {
            e.call(t, c(D, r, 1), c(j, r, 1));
          } catch (t) {
            j.call(r, t);
          }
        }) : (n._v = t, n._s = 1, R(n, !1));
      } catch (e) {
        j.call({ _w: n, _d: !1 }, e);
      }
    }
  };T || (_2 = function _(t) {
    p(this, _2, E, "_h"), d(t), r.call(this);try {
      t(c(D, this, 1), c(j, this, 1));
    } catch (t) {
      j.call(this, t);
    }
  }, (r = function r() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_2.prototype, { then: function then(t, e) {
      var n = P(m(this, _2));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = I ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise;
    }, catch: function _catch(t) {
      return this.then(void 0, t);
    } }), o = function o() {
    var t = new r();this.promise = t, this.resolve = c(D, t, 1), this.reject = c(j, t, 1);
  }, b.f = P = function P(t) {
    return t === _2 || t === s ? new o(t) : i(t);
  }), h(h.G + h.W + h.F * !T, { Promise: _2 }), n(38)(_2, E), n(41)(E), s = n(7)[E], h(h.S + h.F * !T, E, { reject: function reject(t) {
      var e = P(this);return (0, e.reject)(t), e.promise;
    } }), h(h.S + h.F * (a || !T), E, { resolve: function resolve(t) {
      return x(a && this === s ? _2 : this, t);
    } }), h(h.S + h.F * !(T && n(52)(function (t) {
    _2.all(t).catch(A);
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
      o = n(113);t.exports = function (t, e) {
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
      l = n(109),
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
        } }), f && r(l.prototype, "size", { get: function get() {
          return p(this, e)[g];
        } }), l;
    }, def: function def(t, e, n) {
      var r,
          i,
          o = m(t, e);return o ? o.v = n : (t._l = o = { i: i = d(e, !0), k: e, v: n, p: r = t._l, n: void 0, r: !1 }, !t._f && (t._f = o), r && (r.n = o), t[g]++, "F" !== i && (t._i[i] = o)), t;
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
        f = i.call(c, Math.ceil(h / c.length));return f.length > h && (f = f.slice(0, h)), s ? f + a : a + f;
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
  n(126);var r = n(320),
      i = n(129),
      o = n(128),
      s = n(130),
      a = n(325),
      u = n(326),
      c = function c(t, e, n, i) {
    r(e).forEach(function (e) {
      t[i ? i(e) : e] = n;
    });
  },
      l = { cssUnitless: n(124) },
      h = function h(t, e, n, r) {
    "string" == typeof t && (t = function (t) {
      t = (t || "").split(";");var e = {};return t.forEach(function (t) {
        var n = t.split(":");2 == n.length && (e[n[0].trim()] = n[1].trim());
      }), e;
    }(t)), (e = e || l).cssUnitless = e.cssUnitless || l.cssUnitless, r = r || {};var f,
        d,
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
        if (g = t[p], d = i(n ? n + p : p), f = !1, b = !1, u(g) && (y = g.call(w || t, g, p, d, t), a(y) && null != y.value ? (g = y.value, b = y.prefix, d = y.name ? i(y.name) : d) : g = y), v = "number" == (m = typeof g === "undefined" ? "undefined" : _typeof(g)) || "string" == m && "" != g && 1 * g == g, null == g || null == d || "" === d) continue;if ((v || "string" == m) && (f = !0), !f && null != g.value && g.prefix && (f = !0, b = g.prefix, g = g.value), f) {
          if (b = b || !!M[d], v && (g = S && !(d in x) ? g + E : g + ""), "border" != d && (d.indexOf("border") || ~d.indexOf("radius") || ~d.indexOf("width")) || !v || (d += "-width"), !d.indexOf("border-radius-") && (d.replace(/border(-radius)(-(.*))/, function (t, e, n) {
            var r = { "-top": ["-top-left", "-top-right"], "-left": ["-top-left", "-bottom-left"], "-right": ["-top-right", "-bottom-right"], "-bottom": ["-bottom-left", "-bottom-right"] };n in r ? (d = [], r[n].forEach(function (t) {
              d.push("border" + t + e);
            })) : d = "border" + n + e;
          }), Array.isArray(d))) {
            d.forEach(function (t) {
              b ? c(r, t, g, k) : r[k(t)] = g;
            });continue;
          }b ? c(r, d, g, k) : r[k(d)] = g;
        } else h(g, e, d + "-", r);
      }
    }return r;
  };t.exports = h;
}, function (t, e, n) {
  "use strict";
  var r = n(127),
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
      i = n(322);t.exports = function (t) {
    return t ? t.replace(i, r) : "";
  };
}, function (t, e, n) {
  "use strict";
  var r = n(323);t.exports = function (t) {
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
          f = function f(t) {
        return function (i, o) {
          return r.resolve(new e(n.stringify({ address: i.slice(t.length), method: o.method, body: n.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var o = "http://" + t,
              s = o + "/api";return { createUser: function createUser(t) {
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
                  C = M(b),
                  _ = M(w),
                  I = M(S),
                  A = M(x),
                  P = M(E);return { getCapabilities: a.bind(null, g), deleteUser: h(l, function (t) {
                  return m + "/whitelist/" + t;
                }), getConfig: a.bind(null, m), setConfig: u.bind(null, m), getFullState: a.bind(null, p), getLights: a.bind(null, v), getNewLights: a.bind(null, v + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(v, t);
                }, getLight: h(a, k), setLight: h(u, k), setLightState: h(u, function (t) {
                  return k(t) + "/state";
                }), deleteLight: h(l, k), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: h(a, O), setGroup: h(u, O), setGroupState: h(u, function (t) {
                  return O(t) + "/action";
                }), deleteGroup: h(l, O), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: h(a, C), setSchedule: h(u, C), deleteSchedule: h(l, C), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return i(f(o), e, n, r).bridge(t).user(d);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: h(a, _), setScene: h(u, _), setSceneLightState: function setSceneLightState(t, e, n) {
                  return u(_(t) + "/lightstates/" + e, n);
                }, deleteScene: h(l, _), getSensors: a.bind(null, S), createSensor: c.bind(null, S), searchForNewSensors: c.bind(null, S, null), getNewSensors: a.bind(null, S + "/new"), getSensor: h(a, I), setSensor: h(u, I), setSensorConfig: h(u, function (t) {
                  return I(t) + "/config";
                }), setSensorState: h(u, function (t) {
                  return I(t) + "/state";
                }), deleteSensor: h(l, I), getRules: a.bind(null, x), createRule: c.bind(null, x), getRule: h(a, A), setRule: h(u, A), deleteRule: h(l, A), ruleActionGenerator: function ruleActionGenerator() {
                  return i(f(p), e, n, r).bridge(t).user(d);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: h(a, P), setResourceLink: h(u, P), deleteResourceLink: h(l, P) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = i.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = o));
  }).call(this, n(131)(t));
}, function (t, e, n) {
  "use strict";
  n(134);var r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(n(306));r.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), r.default._babelPolyfill = !0;
}, function (t, e, n) {
  "use strict";
  n(135), n(278), n(280), n(283), n(285), n(287), n(289), n(291), n(293), n(295), n(297), n(299), n(301), n(305);
}, function (t, e, n) {
  n(136), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(217), n(218), n(220), n(221), n(222), n(223), n(224), n(225), n(226), n(228), n(229), n(230), n(231), n(232), n(233), n(234), n(235), n(236), n(237), n(238), n(239), n(240), n(81), n(241), n(110), n(242), n(111), n(243), n(244), n(245), n(246), n(112), n(249), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), n(267), n(268), n(269), n(270), n(271), n(272), n(273), n(274), n(275), n(276), n(277), t.exports = n(7);
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
      f = n(29),
      d = n(5),
      p = n(62),
      g = n(91),
      m = n(138),
      v = n(51),
      y = n(3),
      b = n(4),
      w = n(10),
      S = n(15),
      x = n(26),
      E = n(28),
      M = n(33),
      k = n(94),
      O = n(20),
      C = n(50),
      _ = n(9),
      I = n(31),
      A = O.f,
      P = _.f,
      T = k.f,
      _N3 = r.Symbol,
      R = r.JSON,
      L = R && R.stringify,
      F = "prototype",
      B = d("_hidden"),
      j = d("toPrimitive"),
      D = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      V = l("symbols"),
      H = l("op-symbols"),
      z = Object[F],
      G = "function" == typeof _N3 && !!C.f,
      W = r.QObject,
      q = !W || !W[F] || !W[F].findChild,
      K = o && c(function () {
    return 7 != M(P({}, "a", { get: function get() {
        return P(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var r = A(z, e);r && delete z[e], P(t, e, n), r && t !== z && P(z, e, r);
  } : P,
      J = function J(t) {
    var e = V[t] = M(_N3[F]);return e._k = t, e;
  },
      Y = G && "symbol" == _typeof(_N3.iterator) ? function (t) {
    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  } : function (t) {
    return t instanceof _N3;
  },
      X = function X(t, e, n) {
    return t === z && X(H, e, n), y(t), e = x(e, !0), y(n), i(V, e) ? (n.enumerable ? (i(t, B) && t[B][e] && (t[B][e] = !1), n = M(n, { enumerable: E(0, !1) })) : (!i(t, B) && P(t, B, E(1, {})), t[B][e] = !0), K(t, e, n)) : P(t, e, n);
  },
      $ = function $(t, e) {
    y(t);for (var n, r = m(e = S(e)), i = 0, o = r.length; o > i;) {
      X(t, n = r[i++], e[n]);
    }return t;
  },
      Q = function Q(t) {
    var e = D.call(this, t = x(t, !0));return (this !== z || !i(V, t) || i(H, t)) && (!(e || !i(this, t) || !i(V, t) || i(this, B) && this[B][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = S(t), e = x(e, !0), t !== z || !i(V, e) || i(H, e)) {
      var n = A(t, e);return n && i(V, e) && !(i(t, B) && t[B][e]) && (n.enumerable = !0), n;
    }
  },
      tt = function tt(t) {
    for (var e, n = T(S(t)), r = [], o = 0; n.length > o;) {
      i(V, e = n[o++]) || e == B || e == u || r.push(e);
    }return r;
  },
      et = function et(t) {
    for (var e, n = t === z, r = T(n ? H : S(t)), o = [], s = 0; r.length > s;) {
      i(V, e = r[s++]) && (!n || i(z, e)) && o.push(V[e]);
    }return o;
  };G || (a((_N3 = function N() {
    if (this instanceof _N3) throw TypeError("Symbol is not a constructor!");var t = f(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === z && e.call(H, n), i(this, B) && i(this[B], t) && (this[B][t] = !1), K(this, t, E(1, n));
    };return o && q && K(z, t, { configurable: !0, set: e }), J(t);
  })[F], "toString", function () {
    return this._k;
  }), O.f = Z, _.f = X, n(34).f = k.f = tt, n(45).f = Q, C.f = et, o && !n(30) && a(z, "propertyIsEnumerable", Q, !0), p.f = function (t) {
    return J(d(t));
  }), s(s.G + s.W + s.F * !G, { Symbol: _N3 });for (var nt = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], rt = 0; nt.length > rt;) {
    d(nt[rt++]);
  }for (var it = I(d.store), ot = 0; it.length > ot;) {
    g(it[ot++]);
  }s(s.S + s.F * !G, "Symbol", { for: function _for(t) {
      return i(U, t += "") ? U[t] : U[t] = _N3(t);
    }, keyFor: function keyFor(t) {
      if (!Y(t)) throw TypeError(t + " is not a symbol!");for (var e in U) {
        if (U[e] === t) return e;
      }
    }, useSetter: function useSetter() {
      q = !0;
    }, useSimple: function useSimple() {
      q = !1;
    } }), s(s.S + s.F * !G, "Object", { create: function create(t, e) {
      return void 0 === e ? M(t) : $(M(t), e);
    }, defineProperty: X, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: tt, getOwnPropertySymbols: et });var st = c(function () {
    C.f(1);
  });s(s.S + s.F * st, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(t) {
      return C.f(w(t));
    } }), R && s(s.S + s.F * (!G || c(function () {
    var t = _N3();return "[null]" != L([t]) || "{}" != L({ a: t }) || "{}" != L(Object(t));
  })), "JSON", { stringify: function stringify(t) {
      for (var e, n, r = [t], i = 1; arguments.length > i;) {
        r.push(arguments[i++]);
      }if (n = e = r[1], (b(e) || void 0 !== t) && !Y(t)) return v(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !Y(_e)) return _e;
      }), r[1] = e, L.apply(R, r);
    } }), _N3[F][j] || n(14)(_N3[F], j, _N3[F].valueOf), h(_N3, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0);
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
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperties: n(93) });
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
    return n(94).f;
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
  var r = n(0);r(r.S + r.F, "Object", { assign: n(95) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { is: n(96) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Object", { setPrototypeOf: n(66).set });
}, function (t, e, n) {
  "use strict";
  var r = n(46);({})[n(5)("toStringTag")] = "z", n(11)(Object.prototype, "toString", function () {
    return "[object " + r(this) + "]";
  }, !0);
}, function (t, e, n) {
  var r = n(0);r(r.P, "Function", { bind: n(97) });
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
      i = n(99);r(r.G + r.F * (parseInt != i), { parseInt: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(100);r(r.G + r.F * (parseFloat != i), { parseFloat: i });
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
      f = n(39).trim,
      d = "Number",
      _p = r[d],
      g = _p,
      m = _p.prototype,
      v = o(n(33)(m)) == d,
      y = "trim" in String.prototype,
      b = function b(t) {
    var e = a(t, !1);if ("string" == typeof e && 2 < e.length) {
      var n,
          r,
          i,
          o = (e = y ? e.trim() : f(e, 3)).charCodeAt(0);if (43 === o || 45 === o) {
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
      }) : o(n) != d) ? s(new g(b(e)), n, _p) : b(e);
    };for (var w, S = n(8) ? c(g) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; S.length > x; x++) {
      i(g, w = S[x]) && !i(_p, w) && h(_p, w, l(g, w));
    }_p.prototype = m, m.constructor = _p, n(11)(r, d, _p);
  }
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(19),
      o = n(101),
      s = n(69),
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
      i = n(2),
      o = n(101),
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
  var r = n(0);r(r.S, "Number", { isInteger: n(102) });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { isNaN: function isNaN(t) {
      return t != t;
    } });
}, function (t, e, n) {
  var r = n(0),
      i = n(102),
      o = Math.abs;r(r.S, "Number", { isSafeInteger: function isSafeInteger(t) {
      return i(t) && 9007199254740991 >= o(t);
    } });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
}, function (t, e, n) {
  var r = n(0);r(r.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
}, function (t, e, n) {
  var r = n(0),
      i = n(100);r(r.S + r.F * (Number.parseFloat != i), "Number", { parseFloat: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(99);r(r.S + r.F * (Number.parseInt != i), "Number", { parseInt: i });
}, function (t, e, n) {
  var r = n(0),
      i = n(103),
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
  var r = n(0);r(r.S, "Math", { fround: n(181) });
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
  var r = n(0);r(r.S, "Math", { log1p: n(103) });
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
      i = n(216);r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", { toISOString: i });
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
      i = Date.prototype;r in i || n(14)(i, r, n(219));
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
      s = n(105),
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
          f = o(t),
          d = "function" == typeof this ? this : Array,
          p = arguments.length,
          g = 1 < p ? arguments[1] : void 0,
          m = void 0 !== g,
          v = 0,
          y = l(f);if (m && (g = r(g, 2 < p ? arguments[2] : void 0, 2)), null == y || d == Array && a(y)) for (n = new d(e = u(f.length)); e > v; v++) {
        c(n, v, m ? g(f[v], v) : f[v]);
      } else for (h = y.call(f), n = new d(); !(i = h.next()).done; v++) {
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
          r = o(this);if (e = void 0 === e ? n : e, "Array" == r) return u.call(this, t, e);for (var i = s(t, n), c = s(e, n), l = a(c - i), h = Array(l), f = 0; f < l; f++) {
        h[f] = "String" == r ? this.charAt(i + f) : this[i + f];
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
      i = n(107);r(r.P + r.F * !n(16)([].reduce, !0), "Array", { reduce: function reduce(t) {
      return i(this, t, arguments.length, arguments[1], !1);
    } });
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(107);r(r.P + r.F * !n(16)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
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
  var r = n(0);r(r.P, "Array", { copyWithin: n(108) }), n(36)("copyWithin");
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
      f = /a/g,
      d = /a/g,
      p = new _c2(f) !== f;if (n(8) && (!p || n(2)(function () {
    return d[n(5)("match")] = !1, _c2(f) != f || _c2(d) == d || "/a/i" != _c2(f, "i");
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
  n(111);var r = n(3),
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
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var h, f = [], d = 0; null !== (h = s(u, c));) {
        var p = h[0] + "";f[d] = p, "" == p && (u.lastIndex = o(c, i(u.lastIndex), l)), d++;
      }return 0 == d ? null : f;
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
      f = /\$([$&`']|\d\d?|<[^>]*>)/g,
      d = /\$([$&`']|\d\d?)/g,
      p = function p(t) {
    return void 0 === t ? t : t + "";
  };n(55)("replace", 2, function (t, e, n, g) {
    function m(t, e, r, o, s, a) {
      var u = r + t.length,
          c = o.length,
          l = d;return void 0 !== s && (s = i(s), l = f), n.call(a, l, function (n, i) {
        var a;switch (i.charAt(0)) {case "$":
            return "$";case "&":
            return t;case "`":
            return e.slice(0, r);case "'":
            return e.slice(u);case "<":
            a = s[i.slice(1, -1)];break;default:
            var l = +i;if (0 == l) return n;if (l > c) {
              var f = h(l / 10);return 0 === f ? n : f <= c ? void 0 === o[f - 1] ? i.charAt(1) : o[f - 1] + i.charAt(1) : n;
            }a = o[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (r, i) {
      var o = t(this),
          s = null == r ? void 0 : r[e];return void 0 === s ? n.call(o + "", r, i) : s.call(r, o, i);
    }, function (t, e) {
      var i = g(n, t, this, e);if (i.done) return i.value;var h = r(t),
          f = this + "",
          d = "function" == typeof e;d || (e += "");var v = h.global;if (v) {
        var y = h.unicode;h.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(h, f)) && (w.push(b), v);) {
        "" == b[0] + "" && (h.lastIndex = a(f, o(h.lastIndex), y));
      }for (var S = "", x = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", k = c(l(s(b.index), f.length), 0), O = [], C = 1; C < b.length; C++) {
          O.push(p(b[C]));
        }var _ = b.groups;if (d) {
          var I = [M].concat(O, k, f);void 0 !== _ && I.push(_);var A = e.apply(void 0, I) + "";
        } else A = m(M, f, k, O, _, e);k >= x && (S += f.slice(x, k) + A, x = k + M.length);
      }return S + f.slice(x);
    }];
  });
}, function (t, e, n) {
  "use strict";
  var r = n(3),
      i = n(96),
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
      f = [].push,
      d = "split",
      p = "length",
      g = "lastIndex",
      m = 4294967295,
      v = !l(function () {
    RegExp(m, "y");
  });n(55)("split", 2, function (t, e, n, l) {
    var y;return y = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[p] || 2 != "ab"[d](/(?:ab)*/)[p] || 4 != "."[d](/(.?)(.?)/)[p] || 1 < "."[d](/()()/)[p] || ""[d](/.?/)[p] ? function (t, e) {
      var i = this + "";if (void 0 === t && 0 === e) return [];if (!r(t)) return n.call(i, t, e);for (var o, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), h = 0, d = void 0 === e ? m : e >>> 0, v = new RegExp(t.source, l + "g"); (o = c.call(v, i)) && !((s = v[g]) > h && (u.push(i.slice(h, o.index)), 1 < o[p] && o.index < i[p] && f.apply(u, o.slice(1)), a = o[0][p], h = s, u[p] >= d));) {
        v[g] === o.index && v[g]++;
      }return h === i[p] ? (a || !v.test("")) && u.push("") : u.push(i.slice(h)), u[p] > d ? u.slice(0, d) : u;
    } : "0"[d](void 0, 0)[p] ? function (t, e) {
      return void 0 === t && 0 === e ? [] : n.call(this, t, e);
    } : n, [function (n, r) {
      var i = t(this),
          o = null == n ? void 0 : n[e];return void 0 === o ? y.call(i + "", n, r) : o.call(n, i, r);
    }, function (t, e) {
      var r = l(y, t, this, e, y !== n);if (r.done) return r.value;var c = i(t),
          f = this + "",
          d = o(c, RegExp),
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
          f = document.createTextNode("");new o(c).observe(f, { characterData: !0 }), n = function n() {
        f.data = h = !h;
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
  var r = n(115),
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
  var r = n(115),
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
      u = n(95),
      c = n(116),
      l = n(4),
      h = n(37),
      f = n(37),
      d = !i.ActiveXObject && "ActiveXObject" in i,
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
      w = t.exports = n(58)(p, y, b, c, !0, !0);f && d && (u((r = c.getConstructor(y, p)).prototype, b), a.NEED = !0, o(["delete", "has", "get", "set"], function (t) {
    var e = w.prototype,
        n = e[t];s(e, t, function (e, i) {
      if (l(e) && !m(e)) {
        this._f || (this._f = new r());var o = this._f[t](e, i);return "set" == t ? this : o;
      }return n.call(this, e, i);
    });
  }));
}, function (t, e, n) {
  "use strict";
  var r = n(116),
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
      f = o.ArrayBuffer,
      d = o.DataView,
      p = i.ABV && l.isView,
      g = f.prototype.slice,
      m = i.VIEW,
      v = "ArrayBuffer";r(r.G + r.W + r.F * (l !== f), { ArrayBuffer: f }), r(r.S + r.F * !i.CONSTR, v, { isView: function isView(t) {
      return p && p(t) || c(t) && m in t;
    } }), r(r.P + r.U + r.F * n(2)(function () {
    return !new f(2).slice(1, void 0).byteLength;
  }), v, { slice: function slice(t, e) {
      if (void 0 !== g && void 0 === e) return g.call(s(this), t);for (var n = s(this).byteLength, r = a(t, n), i = a(void 0 === e ? n : e, n), o = new (h(this, f))(u(i - r)), c = new d(this), l = new d(o), p = 0; r < i;) {
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
      c = n(97),
      l = (n(1).Reflect || {}).construct,
      h = u(function () {
    function t() {}return !(l(function () {}, [], t) instanceof t);
  }),
      f = !u(function () {
    l(function () {});
  });r(r.S + r.F * (h || f), "Reflect", { construct: function construct(t, e) {
      o(t), s(e);var n = 3 > arguments.length ? t : o(arguments[2]);if (f && !h) return l(t, e, n);if (t == n) {
        switch (e.length) {case 0:
            return new t();case 1:
            return new t(e[0]);case 2:
            return new t(e[0], e[1]);case 3:
            return new t(e[0], e[1], e[2]);case 4:
            return new t(e[0], e[1], e[2], e[3]);}var r = [null];return r.push.apply(r, e), new (c.apply(t, r))();
      }var u = n.prototype,
          d = i(a(u) ? u : Object.prototype),
          p = Function.apply.call(t, d, e);return a(p) ? p : d;
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
  };n(104)(o, "Object", function () {
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
  var r = n(0);r(r.S, "Reflect", { ownKeys: n(118) });
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
          f,
          d = 4 > arguments.length ? e : arguments[3],
          p = i.f(c(e), n);if (!p) {
        if (l(f = o(e))) return t(f, n, a, d);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(d)) return !1;if (h = i.f(d, n)) {
          if (h.get || h.set || !1 === h.writable) return !1;h.value = a, r.f(d, n, h);
        } else r.f(d, n, u(0, a));return !0;
      }return void 0 !== p.set && (p.set.call(d, a), !0);
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
  n(279), t.exports = n(7).Array.includes;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(49)(!0);r(r.P, "Array", { includes: function includes(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (t, e, n) {
  n(281), t.exports = n(7).Array.flatMap;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(282),
      o = n(10),
      s = n(6),
      a = n(18),
      u = n(106);r(r.P, "Array", { flatMap: function flatMap(t) {
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
      a = n(5)("isConcatSpreadable");t.exports = function t(e, n, u, c, l, h, f, d) {
    for (var p, g, m = l, v = 0, y = !!f && s(f, d, 3); v < c;) {
      if (v in u) {
        if (p = y ? y(u[v], v, n) : u[v], g = !1, i(p) && (g = void 0 === (g = p[a]) ? r(p) : !!g), g && 0 < h) m = t(e, n, p, o(p.length), m, h - 1) - 1;else {
          if (9007199254740991 <= m) throw TypeError();e[m] = p;
        }m++;
      }v++;
    }return m;
  };
}, function (t, e, n) {
  n(284), t.exports = n(7).String.padStart;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(119),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padStart: function padStart(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (t, e, n) {
  n(286), t.exports = n(7).String.padEnd;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(119),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padEnd: function padEnd(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0, !1);
    } });
}, function (t, e, n) {
  n(288), t.exports = n(7).String.trimLeft;
}, function (t, e, n) {
  "use strict";
  n(39)("trimLeft", function (t) {
    return function () {
      return t(this, 1);
    };
  }, "trimStart");
}, function (t, e, n) {
  n(290), t.exports = n(7).String.trimRight;
}, function (t, e, n) {
  "use strict";
  n(39)("trimRight", function (t) {
    return function () {
      return t(this, 2);
    };
  }, "trimEnd");
}, function (t, e, n) {
  n(292), t.exports = n(62).f("asyncIterator");
}, function (t, e, n) {
  n(91)("asyncIterator");
}, function (t, e, n) {
  n(294), t.exports = n(7).Object.getOwnPropertyDescriptors;
}, function (t, e, n) {
  var r = n(0),
      i = n(118),
      o = n(15),
      s = n(20),
      a = n(78);r(r.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var e, n, r = o(t), u = s.f, c = i(r), l = {}, h = 0; c.length > h;) {
        void 0 !== (n = u(r, e = c[h++])) && a(l, e, n);
      }return l;
    } });
}, function (t, e, n) {
  n(296), t.exports = n(7).Object.values;
}, function (t, e, n) {
  var r = n(0),
      i = n(120)(!1);r(r.S, "Object", { values: function values(t) {
      return i(t);
    } });
}, function (t, e, n) {
  n(298), t.exports = n(7).Object.entries;
}, function (t, e, n) {
  var r = n(0),
      i = n(120)(!0);r(r.S, "Object", { entries: function entries(t) {
      return i(t);
    } });
}, function (t, e, n) {
  "use strict";
  n(112), n(300), t.exports = n(7).Promise.finally;
}, function (t, e, n) {
  "use strict";
  var r = n(0),
      i = n(7),
      o = n(1),
      s = n(47),
      a = n(114);r(r.P + r.R, "Promise", { finally: function _finally(t) {
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
  n(302), n(303), n(304), t.exports = n(7);
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
  for (var r = n(81), i = n(31), o = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), h = c("toStringTag"), f = u.Array, d = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = i(d), g = 0; g < p.length; g++) {
    var m,
        v = p[g],
        y = d[v],
        b = s[v],
        w = b && b.prototype;if (w && (w[l] || a(w, l, f), w[h] || a(w, h, v), u[v] = f, y)) for (m in r) {
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
          a = new d(r || []);return s._invoke = c(t, n, a), s;
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
              if (u === O) continue;return u;
            }
          }if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (i === x) throw i = k, n.arg;n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);i = M;var c = r(t, e, n);if ("normal" === c.type) {
            if (i = n.done ? k : E, c.arg === O) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (i = k, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(t, e) {
      var n = t.iterator[e.method];if (void 0 === n) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, l(t, e), "throw" === e.method)) return O;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return O;
      }var i = r(n, t.iterator, e.arg);if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, O;var o = i.arg;return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, O) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, O);
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
        C = {};C[b] = function () {
      return this;
    };var _ = Object.getPrototypeOf,
        I = _ && _(_(p([])));I && I !== m && v.call(I, b) && (C = I);var A = s.prototype = i.prototype = Object.create(C);return o.prototype = A.constructor = s, s.constructor = o, o.displayName = e(s, S, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
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
    }, t.values = p, d.prototype = { constructor: d, reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(f), !t) for (var e in this) {
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
        }i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, O) : this.complete(o);
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
              var i = r.arg;f(e);
            }return i;
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
  n(307), t.exports = n(121).global;
}, function (t, e, n) {
  var r = n(308);r(r.G, { global: n(86) });
}, function (t, e, n) {
  var r = n(86),
      i = n(121),
      o = n(309),
      s = n(311),
      a = n(318),
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
        b = p ? i : i[e] || (i[e] = {}),
        w = b[u],
        S = p ? r : g ? r[e] : (r[e] || {})[u];for (l in p && (n = e), n) {
      (h = !d && S && void 0 !== S[l]) && a(b, l) || (f = h ? S[l] : n[l], b[l] = p && "function" != typeof S[l] ? n[l] : v && h ? o(f, r) : y && S[l] == f ? function (t) {
        var e = function e(_e3, n, r) {
          if (this instanceof t) {
            switch (arguments.length) {case 0:
                return new t();case 1:
                return new t(_e3);case 2:
                return new t(_e3, n);}return new t(_e3, n, r);
          }return t.apply(this, arguments);
        };return e[u] = t[u], e;
      }(f) : m && "function" == typeof f ? o(Function.call, f) : f, m && ((b.virtual || (b.virtual = {}))[l] = f, t & c.R && w && !w[l] && s(w, l, f)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t, e, n) {
  var r = n(310);t.exports = function (t, e, n) {
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
  var r = n(312),
      i = n(317);t.exports = n(88) ? function (t, e, n) {
    return r.f(t, e, i(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var r = n(313),
      i = n(314),
      o = n(316),
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
  t.exports = !n(88) && !n(122)(function () {
    return 7 != Object.defineProperty(n(315)("div"), "a", { get: function get() {
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
  t.exports = { prefixProperties: n(123), cssUnitless: n(124), object: n(125), string: n(327) };
}, function (t, e, n) {
  t.exports = n(321)();
}, function (t, e, n) {
  "use strict";
  var r = n(128),
      i = n(129),
      o = n(324),
      s = n(127),
      a = n(126),
      u = n(123),
      c = "undefined" == typeof document ? {} : document.documentElement.style;t.exports = function (t) {
    return function (e, n) {
      n = n || {};var l = o(r(e)),
          h = i(e),
          f = t ? l : h,
          d = a.style ? t ? a.style : a.css : "";if (l in c) return n.asString ? f : [f];var p = f,
          g = u[h],
          m = [];if (t && (p = s(f)), "function" == typeof g) {
        var v = g(f, d) || [];v && !Array.isArray(v) && (v = [v]), v.length && (v = v.map(function (e) {
          return t ? o(r(e)) : i(e);
        })), m = m.concat(v);
      }return d && m.push(d + p), m.push(f), n.asString || 1 == m.length ? m[0] : m;
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
  var r = n(125),
      i = n(130);t.exports = function (t, e) {
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
      return "number" == typeof t && t > V && t < H;
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
    }function f(t) {
      return h(t) && "" !== t;
    }function d(t) {
      return "[object Object]" === Object.prototype.toString.call(t);
    }function p(t, e) {
      try {
        return t instanceof e;
      } catch (t) {
        return !1;
      }
    }function g(t) {
      return z(t);
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
          if (d(r = t[n]) && b(r, e) === e) return e;if (r === e) return e;
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
          o = e[r + 1];return E(t.apply(null, e), f(i) ? i : n, v(o) ? o : TypeError), e[0];
    }function E(t, e, n) {
      if (t) return t;throw new (n || Error)(e || "Assertion failed");
    }function M(t) {
      var e = function e() {
        return k(t.apply(null, arguments));
      };return e.l = t.length, e;
    }function k(t) {
      return !t;
    }function O(t, e, n) {
      var r = function r() {
        var r, o;if (r = arguments[0], "maybe" === t && B.assigned(r)) return !0;if (!e(r)) return !1;r = C(e, r), o = U.call(arguments, 1);try {
          r.forEach(function (e) {
            if (("maybe" !== t || i(e)) && !n.apply(null, [e].concat(o))) throw 0;
          });
        } catch (t) {
          return !1;
        }return !0;
      };return r.l = n.length, r;
    }function C(t, e) {
      return t === m ? U.call(e) : t === d ? Object.keys(e).map(function (t) {
        return e[t];
      }) : e;
    }function _(t, e) {
      return I([t, R, e]);
    }function I(t) {
      var e, n, r, i;return e = t.shift(), n = t.pop(), r = t.pop(), i = n || {}, Object.keys(r).forEach(function (n) {
        Object.defineProperty(i, n, { configurable: !1, enumerable: !0, writable: !1, value: e.apply(null, t.concat(r[n], N[n])) });
      }), i;
    }function A(t, e) {
      return I([t, e, null]);
    }function P(t, e) {
      D.forEach(function (n) {
        t[n].of = A(e, R[n].of);
      });
    }var T, N, R, L, F, B, j, D, U, V, H, z, G;T = { v: "value", n: "number", s: "string", b: "boolean", o: "object", t: "type", a: "array", al: "array-like", i: "iterable", d: "date", f: "function", l: "length" }, N = {}, R = {}, [{ n: "equal", f: function f(t, e) {
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
        return t === V || t === H;
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
      }, s: "s" }, { n: "nonEmptyString", f: f, s: "s" }, { n: "contains", f: function f(t, e) {
        return h(t) && -1 !== t.indexOf(e);
      }, s: "s" }, { n: "match", f: function f(t, e) {
        return h(t) && !!t.match(e);
      }, s: "s" }, { n: "boolean", f: function f(t) {
        return !1 === t || !0 === t;
      }, s: "b" }, { n: "object", f: d, s: "o" }, { n: "emptyObject", f: function f(t) {
        return d(t) && 0 === Object.keys(t).length;
      }, s: "o" }, { n: "nonEmptyObject", f: function f(t) {
        return d(t) && 0 < Object.keys(t).length;
      }, s: "o" }, { n: "instanceStrict", f: p, s: "t" }, { n: "instance", f: function f(t, e) {
        try {
          return p(t, e) || t.constructor.name === e.name || Object.prototype.toString.call(t) === "[object " + e.name + "]";
        } catch (t) {
          return !1;
        }
      }, s: "t" }, { n: "like", f: function t(e, n) {
        for (var r in n) {
          if (n.hasOwnProperty(r)) {
            if (!1 === e.hasOwnProperty(r) || _typeof(e[r]) != _typeof(n[r])) return !1;if (d(e[r]) && !1 === t(e[r], n[r])) return !1;
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
      var e = t.n;N[e] = "Invalid " + T[t.s || "n"], R[e] = t.f;
    }), L = { apply: function apply(t, e) {
        return F.array(t), v(e) ? t.map(function (t) {
          return e(t);
        }) : (F.array(e), F.hasLength(t, e.length), t.map(function (t, n) {
          return e[n](t);
        }));
      }, map: function map(t, e) {
        return F.object(t), v(e) ? function (t, e) {
          var n = {};return Object.keys(t).forEach(function (r) {
            n[r] = e(t[r]);
          }), n;
        }(t, e) : (F.object(e), function t(e, n) {
          var r = {};return Object.keys(n).forEach(function (i) {
            var o = n[i];v(o) ? B.assigned(e) ? r[i] = !!o.m : r[i] = o(e[i]) : d(o) && (r[i] = t(e[i], o));
          }), r;
        }(t, e));
      }, all: function all(t) {
        return g(t) ? y(t, !1) : (F.object(t), b(t, !1));
      }, any: function any(t) {
        return g(t) ? y(t, !0) : (F.object(t), b(t, !0));
      } }, D = ["array", "arrayLike", "iterable", "object"], U = Array.prototype.slice, V = Number.NEGATIVE_INFINITY, H = Number.POSITIVE_INFINITY, z = Array.isArray, G = "function" == typeof Symbol, L = w(L, R), F = _(S, E), B = _(M, k), j = _(function (t) {
      var e = function e() {
        return !!B.assigned(arguments[0]) || t.apply(null, arguments);
      };return e.l = t.length, e.m = !0, e;
    }, function (t) {
      return !(!1 !== i(t)) || t;
    }), F.not = A(S, B), F.maybe = A(S, j), D.forEach(function (t) {
      R[t].of = I([O.bind(null, null), R[t], R, null]);
    }), P(F, S), P(B, M), D.forEach(function (t) {
      j[t].of = I([O.bind(null, "maybe"), R[t], R, null]), F.maybe[t].of = A(S, j[t].of), F.not[t].of = A(S, B[t].of);
    }), function (i) {
      void 0 === (r = function () {
        return i;
      }.call(e, n, e, t)) || (t.exports = r);
    }(w(L, { assert: F, not: B, maybe: j }));
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
}, function (t, e, n) {
  "use strict";
  function r(t) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(t);
    });
  }function i() {
    window.debugUi = new X.a(document.body, { zIndex: 999999999, backgroundColor: "black" }), r(function () {
      document.getElementById("j3-info-popup").style.zIndex = 99999999, document.getElementById("j3-info-popup").style.backgroundColor = "black";
    }), window.debugUi.addPanel($.BUILD, function () {
      return ee.build + " by " + ee.compiler + " " + ee.envDescription;
    });for (var _t2 = 0; _t2 < Q.length; _t2++) {
      Q[_t2]();
    }s("Enabling debug mode");
  }function o(t) {
    ee.isProd || t(), Q.push(t);
  }function s(t) {
    console.log("[OpenAudioMc] " + t), Z.push(t), 5 < Z.length && Z.shift();
  }function a(t) {
    var e = document.querySelectorAll("[data-type=card]");var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _t3 = _step.value;
        _t3.style.display = "none";
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
  }function u(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function c(t) {
    return "string" != typeof t && (t += ""), t;
  }function l(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return ut.iterable && (e[Symbol.iterator] = function () {
      return e;
    }), e;
  }function h(t) {
    this.map = {}, t instanceof h ? t.forEach(function (t, e) {
      this.append(e, t);
    }, this) : Array.isArray(t) ? t.forEach(function (t) {
      this.append(t[0], t[1]);
    }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
      this.append(e, t[e]);
    }, this);
  }function f(t) {
    return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0);
  }function d(t) {
    return new Promise(function (e, n) {
      t.onload = function () {
        e(t.result);
      }, t.onerror = function () {
        n(t.error);
      };
    });
  }function p(t) {
    var e = new FileReader(),
        n = d(e);return e.readAsArrayBuffer(t), n;
  }function g(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function m() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : ut.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : ut.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : ut.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : ut.arrayBuffer && ut.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = g(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : ut.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || lt(t)) ? this._bodyArrayBuffer = g(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : ut.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, ut.blob && (this.blob = function () {
      var t = f(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(p);
    }), this.text = function () {
      var t = f(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            n = d(e);return e.readAsText(t), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), n = Array(e.length), r = 0; r < e.length; r++) {
          n[r] = W(e[r]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, ut.formData && (this.formData = function () {
      return this.text().then(y);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function v(t, e) {
    var n = (e = e || {}).body;if (t instanceof v) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new h(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new h(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < ht.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function y(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var n = t.split("="),
            r = n.shift().replace(/\+/g, " "),
            i = n.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(r), decodeURIComponent(i));
      }
    }), e;
  }function b(t) {
    var e = new h();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var n = t.split(":"),
          r = n.shift().trim();if (r) {
        var i = n.join(":").trim();e.append(r, i);
      }
    }), e;
  }function w(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new h(e.headers), this.url = e.url || "", this._initBody(t);
  }function S(t, e) {
    return new Promise(function (n, r) {
      function i() {
        s.abort();
      }var o = new v(t, e);if (o.signal && o.signal.aborted) return r(new dt("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var t = { status: s.status, statusText: s.statusText, headers: b(s.getAllResponseHeaders() || "") };t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");var e = "response" in s ? s.response : s.responseText;n(new w(e, t));
      }, s.onerror = function () {
        r(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        r(new TypeError("Network request failed"));
      }, s.onabort = function () {
        r(new dt("Aborted", "AbortError"));
      }, s.open(o.method, o.url, !0), "include" === o.credentials ? s.withCredentials = !0 : "omit" === o.credentials && (s.withCredentials = !1), "responseType" in s && ut.blob && (s.responseType = "blob"), o.headers.forEach(function (t, e) {
        s.setRequestHeader(e, t);
      }), o.signal && (o.signal.addEventListener("abort", i), s.onreadystatechange = function () {
        4 === s.readyState && o.signal.removeEventListener("abort", i);
      }), s.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function x(t, e, n) {
    S(pt.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: e, message: "build 177: " + t }) }).then(function (t) {
      null != n && n(), t.json().then(function (t) {
        console.log("Reported error. Reponse was: " + JSON.stringify(t));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function E(t, e) {
    var n = e.media.loop,
        r = e.media.startInstant,
        i = e.media.mediaId,
        o = e.media.source,
        s = e.media.doPickup,
        a = e.media.fadeTime,
        u = e.distance,
        c = e.media.flag,
        l = e.maxDistance;var h = 100;null != e.media.volume && 0 != e.media.volume && (h = e.media.volume), t.getMediaManager().destroySounds(i, !1, !0);var f = new at(i);f.trackable = !0;var d = new wt(o);if (d.openAudioMc = t, d.setOa(t), t.getMediaManager().mixer.addChannel(f), f.addSound(d), f.setChannelVolume(0), d.setLooping(n), f.setTag(i), 0 !== l) {
      var _t4 = this.convertDistanceToVolume(l, u);f.setTag("SPECIAL"), f.maxDistance = l, f.fadeChannel(_t4, a);
    } else f.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (f.setChannelVolume(h), f.updateFromMasterVolume()) : (f.updateFromMasterVolume(), f.fadeChannel(h, a));
    }, 1);f.setTag(c), t.getMediaManager().mixer.updateCurrent(), d.finalize().then(function () {
      s && d.startDate(r, !0), d.finish();
    });
  }function M(t, e) {
    var n = e.message;t.notificationModule.sendNotification(e.title, n), new ot("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + n);
  }function k(t, e) {
    var n = parseInt(e.protocolRevision);if (s("Received PROTOCOL revision update"), 2 <= n && (s("PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0), 3 <= n && (s("PROTO rev => 3, enabling youtube callbacks"), t.socketModule.supportsYoutube = !0), 4 <= n && (s("PROTO rev => 4, enabling volume callbacks"), t.mediaManager.startVolumeWatcher(t)), 5 <= n && (s("PROTO rev => 5, enabling loudness callbacks"), t.voiceModule.loudnessDetectionEnabled = !0), 3 > n) {
      new ot("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function O(t, e) {
    var n = e.volume;t.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function C(t, e) {
    t.getMediaManager().destroySounds(e.soundId, e.all, !1, e.fadeTime);
  }function _(t, e) {
    var n = e.lights,
        r = e.hueColor,
        i = "rgba(" + r.r + "," + r.g + "," + r.b + "," + function (t, e, n) {
      return (t - e[0]) * (n[1] - n[0]) / (e[1] - e[0]) + n[0];
    }(r.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(n, i);
  }function I(t, e) {
    function n(t, e) {
      return K((t - e) / t * 100);
    }var r = e.mediaOptions.target,
        i = e.mediaOptions.fadeTime,
        o = e.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = t.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _e4 = _step2.value;
        _e4.hasTag(r) && _e4.fadeChannel(n(_e4.maxDistance, o), i);
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
        i = e.z,
        o = e.pitch,
        s = e.yaw;t.world.player.updateLocation(new Mt(n, r, i), o, s);
  }function P(t, e) {
    var n = e.clientSpeaker,
        r = new Mt(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        i = new kt(n.id, n.source, r, n.type, n.maxDistance, n.startInstant, t);t.world.addSpeaker(n.id, i);
  }function T(t, e) {
    var n = e.clientSpeaker;t.world.removeSpeaker(n.id);
  }function N(t, e) {
    if (e.clear) s("Clearing pre-fetched resources"), setTimeout(function () {
      yt = {};
    }, 2500);else {
      var _t5 = e.source;s("Pre-fetching resource.."), setTimeout(function () {
        !function (t) {
          t = bt.translate(t);var e = new Audio();e.autoplay = !1, e.src = t, e.load(), yt[t] = e;
        }(_t5);
      }, 2500);
    }
  }function R(t, e) {
    ee.isProd && (ee.isProd = !1, i()), t.voiceModule.enable(e.streamServer, e.streamKey, e.radius);
  }function L(t, e) {
    t.voiceModule.addPeer(e.targetUuid, e.targetPlayerName, e.targetStreamKey, e.location);
  }function F(t, e) {
    null == e.streamKey ? t.voiceModule.removeAllPeers() : t.voiceModule.removePeer(e.streamKey);
  }function B(t, e) {
    for (var _n, _r = 0; _r < e.updateSet.length; _r++) {
      _n = e.updateSet[_r], t.voiceModule.peerLocationUpdate(_n.streamKey, _n.x, _n.y, _n.z);
    }
  }function j() {
    document.getElementById("vc-mic-mute").click();
  }function D(t, e) {
    function n(t, e) {
      var n = 0,
          i = e || t.innerHTML,
          o = i.length;_t.push(window.setInterval(function () {
        n >= o && (n = 0), i = r(i, n), t.innerHTML = i, n++;
      }, 0));
    }function r(t, e) {
      var n = W(function (t, e) {
        return J(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + n + t.substr(e + 1, t.length);
    }var i = void 0,
        o = void 0,
        s = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t6 = 0; _t6 < s; _t6++) {
        o = e.childNodes[_t6], 3 === o.nodeType && (i = document.createElement("span"), i.innerHTML = o.nodeValue, e.replaceChild(i, o), n(i));
      }
    } else n(e, t);
  }function U(t, e) {
    var n = e.length,
        r = document.createElement("span"),
        i = !1;for (var _o2 = 0; _o2 < n; _o2++) {
      r.style.cssText += It[e[_o2]] + ";", "§k" === e[_o2] && (D(t, r), i = !0);
    }return i || (r.innerHTML = t), r;
  }function V(t) {
    var e,
        n,
        r = t.match(/&.{1}/g) || [],
        i = [],
        o = [],
        s = document.createDocumentFragment(),
        a = r.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e5 = 0; _e5 < a; _e5++) {
      i.push(t.indexOf(r[_e5])), t = t.replace(r[_e5], "\0\0");
    }0 !== i[0] && s.appendChild(U(t.substring(0, i[0]), []));for (var _u = 0; _u < a; _u++) {
      if (2 === (n = i[_u + 1] - i[_u])) {
        for (; 2 == n;) {
          o.push(r[_u]), _u++, n = i[_u + 1] - i[_u];
        }o.push(r[_u]);
      } else o.push(r[_u]);-1 < o.lastIndexOf("§r") && (o = o.slice(o.lastIndexOf("§r") + 1)), e = t.substring(i[_u], i[_u + 1]), s.appendChild(U(e, o));
    }return s;
  }function H() {
    Nt.canStart && Nt.start();
  }function z(t, e) {
    s("Loading on the fly library " + t), fetch(t).then(function (t) {
      t.text().then(function (t) {
        var n = function (t) {
          for (var e = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = n.length, i = 0; i < t; i++) {
            e += n.charAt(J(Math.random() * r));
          }return e;
        }(10);window.randomLoadCallbacks.set(n, function () {
          e(), window.randomLoadCallbacks.delete(n);
        }), window.eval.call(window, t + ';window.randomLoadCallbacks.get("' + n + '")()');
      });
    });
  }function G(t) {
    var e = document.querySelectorAll("[data-type=voice-card]");var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _t7 = _step3.value;
        _t7.style.display = "none";
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
  }var W = String.fromCharCode,
      q = Math.abs,
      K = Math.round,
      J = Math.floor;n.r(e);n(133);var Y = n(89),
      X = n.n(Y);var $ = { BUILD: "Build", SESSION: "Session", ACCOUNT: "Account", AUDIO: "Mixer", SOCKET: "Socket", LOG: "Latest Log", RTC: "Streaming" };var Q = [],
      Z = [];
  var tt = function () {
    function tt() {
      _classCallCheck(this, tt);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    tt.prototype.sync = function sync(t) {
      var e = new Date(t),
          n = new Date();this.isServerAhead = e.getTime() > n.getTime(), this.msOffset = this.isServerAhead ? e.getTime() - n.getTime() : n.getTime() - e.getTime(), this.hasSynced = !0;
    };

    tt.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return tt;
  }();

  Date.prototype.addHours = function (t) {
    return this.setTime(this.getTime() + 60 * t * 60 * 1e3), this;
  };
  var et = function () {
    function et(t) {
      _classCallCheck(this, et);

      this.fallback = "No message provided in oa+", this.main = t, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    et.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return et;
  }();

  var nt = function () {
    function nt(t) {
      _classCallCheck(this, nt);

      this.openAudioMc = t;
    }

    nt.prototype.changeColor = function changeColor(t, e) {
      var n = function (t) {
        return t = t.replace("#", ""), "rgb(" + parseInt(t.substring(0, 2), 16) + ", " + parseInt(t.substring(2, 4), 16) + ", " + parseInt(t.substring(4, 6), 16) + ")";
      }(t);document.querySelectorAll("*").forEach(function (t) {
        var r = window.getComputedStyle(t);Object.keys(r).reduce(function (i, o) {
          var s = r[o],
              a = r.getPropertyValue(s);if (0 <= a.indexOf(n)) {
            var _r2 = a.replace(n, e);0 <= s.indexOf("border-top") ? t.style.borderTop = "2px solid " + _r2 : t.style[s] = _r2;
          }
        });
      });
    };

    nt.prototype.setMessage = function setMessage(t) {
      document.getElementById("status-message").innerHTML = t;
    };

    nt.prototype.openApp = function openApp() {
      a(rt.MAIN_UI), this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    };

    nt.prototype.kickScreen = function kickScreen(t) {
      a(rt.KICKED), document.getElementById("kick-message").innerHTML = t;
    };

    return nt;
  }();

  var rt = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" },
      it = "rtc_initialized";
  var ot = function () {
    function ot(t, e) {
      _classCallCheck(this, ot);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    ot.prototype.show = function show(t) {
      var _this = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("p-3"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
        t.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _t8 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_t8);
        }, this.option.closeTime);
      }return this;
    };

    ot.prototype.onClick = function onClick(t) {
      this.alertBox.onclick = t;
    };

    ot.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(t), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return ot;
  }();

  var st = function () {
    function st(t, e) {
      var _this3 = this;

      _classCallCheck(this, st);

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

    st.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", document.getElementById("hue-setup-box").style.display = "", document.getElementById("hue-bridge-menu-button").onclick = this.openModal, this.isSsl) return void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup(), this.requestBox = new ot("#alert-area", { persistent: !0, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;">We found a hue bridge in your network<br/><br/><br/><a id="noti-perm-request-link" class="alert-message-button">hue settings</a></div>'), this.requestBox.onClick(this.openModal);
      } else this.openAudioMc.log("No hue bridges found");
    };

    st.prototype.openModal = function openModal() {
      document.getElementById("hue-modal-parent").style.display = "";
    };

    st.prototype.startSetup = function startSetup() {
      var t = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (e) {
        t.linkBridge(e.internalipaddress);
      });
    };

    st.prototype.onConnect = function onConnect() {
      var _this4 = this;

      this.currentUser.getConfig().then(function (t) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this4.openAudioMc.getHueConfiguration().setBridgeName(t.name), _this4.currentUser.getLights().then(function (t) {
          var e = [];for (var _n2 in t) {
            t.hasOwnProperty(_n2) && e.push({ name: t[_n2].name, id: parseInt(_n2) });
          }_this4.openAudioMc.getHueConfiguration().setLightNamesAndIds(e);null != Cookies.get("hue-state") && (_this4.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this4.openAudioMc.getHueConfiguration().applyState(), _this4.openAudioMc.getHueConfiguration().updateState();
        }), _this4.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    st.prototype.updateSelector = function updateSelector(t) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = t;
      }, 200);
    };

    st.prototype.colorToHueHsv = function colorToHueHsv(t) {
      var e = this.color(t).toHSV();return { on: 0 != 2 * e.alpha * 127.5, hue: J(65535 * e.hue / 360), sat: J(255 * e.saturation), bri: K(2 * e.alpha * 127.5) };
    };

    st.prototype.setLight = function setLight(t, e) {
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

    st.prototype.linkBridge = function linkBridge(t, e) {
      var _this6 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == e && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(t).user(this.options.userid), void this.currentUser.getGroups().then(function (e) {
        null != e[0] && null == e[0].error ? _this6.linkBridge(t, "error") : (_this6.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this6.isLinked = !0, _this6.onConnect());
      });if (this.currentBridge = this.hue.bridge(t), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var n = this;var r = 0,
          i = -1;i = setInterval(function () {
        function t() {
          clearInterval(i);
        }if (r++, 60 < r) return t(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this6.startSetup();
        }, void _this6.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var e = 60 - r;document.getElementById("hue-linking-message").innerText = _this6.openAudioMc.getMessages().hueLinking.replace("%sec%", e), n.currentBridge.createUser("OpenAudioMc#WebClient").then(function (e) {
          null == e[0].error ? null != e[0].success && (n.currentUser = n.currentBridge.user(e[0].success.username), _this6.openAudioMc.log("Linked with hue bridge after " + r + " attempt(s)."), n.isLinked = !0, n.onConnect(), t()) : 101 === e[0].error.type || (t(), _this6.openAudioMc.log("Unexpected error while connecting: " + e[0].error.type));
        });
      }, 1e3);
    };

    return st;
  }();

  var at = function () {
    function at(t) {
      _classCallCheck(this, at);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    at.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    at.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    at.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _t9 = _step4.value;
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

    at.prototype.addSound = function addSound(t) {
      this.sounds.push(t);var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _t10 = _step5.value;
          _t10.registerMixer(this.mixer, this);
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

    at.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    at.prototype.registerMixer = function registerMixer(t) {
      this.mixer = t;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _t11 = _step6.value;
          _t11.registerMixer(this.mixer, this);
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

    at.prototype.fadeChannel = function fadeChannel(t, e, n) {
      var _this7 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = t, this.isFading = !0, function (t, e, r, i) {
        e = e || 1e3, r = r || 0, i = i;var o = _this7.channelVolume,
            s = e / q(o - r),
            a = setInterval(function () {
          o = o > r ? o - 1 : o + 1;var t = _this7.mixer.masterVolume,
              e = o / 100 * t;var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this7.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _t13 = _step7.value;
              _t13.setVolume(e);
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
            n(), clearInterval(a);var _t12 = _this7.fadeTimer.indexOf(a);-1 < _t12 && _this7.fadeTimer.splice(_t12, 1), _this7.isFading = !1, a = null;
          }
        }, s);_this7.fadeTimer.push(a);
      }(0, e, t, n);
    };

    at.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.fadeTimer[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _t14 = _step8.value;
            clearInterval(_t14);
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

    at.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.sounds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _t15 = _step9.value;
          _t15.setVolume(e);
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

    at.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _t16 = _step10.value;
          _t16.setVolume(e);
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

    at.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.sounds[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t17 = _step11.value;
          _t17.destroy();
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

    return at;
  }();

  var ut = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (ut.arrayBuffer) var ct = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      lt = ArrayBuffer.isView || function (t) {
    return t && -1 < ct.indexOf(Object.prototype.toString.call(t));
  };h.prototype.append = function (t, e) {
    t = u(t), e = c(e);var n = this.map[t];this.map[t] = n ? n + ", " + e : e;
  }, h.prototype.delete = function (t) {
    delete this.map[u(t)];
  }, h.prototype.get = function (t) {
    return t = u(t), this.has(t) ? this.map[t] : null;
  }, h.prototype.has = function (t) {
    return this.map.hasOwnProperty(u(t));
  }, h.prototype.set = function (t, e) {
    this.map[u(t)] = c(e);
  }, h.prototype.forEach = function (t, e) {
    for (var n in this.map) {
      this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
    }
  }, h.prototype.keys = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push(n);
    }), l(t);
  }, h.prototype.values = function () {
    var t = [];return this.forEach(function (e) {
      t.push(e);
    }), l(t);
  }, h.prototype.entries = function () {
    var t = [];return this.forEach(function (e, n) {
      t.push([n, e]);
    }), l(t);
  }, ut.iterable && (h.prototype[Symbol.iterator] = h.prototype.entries);var ht = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];v.prototype.clone = function () {
    return new v(this, { body: this._bodyInit });
  }, m.call(v.prototype), m.call(w.prototype), w.prototype.clone = function () {
    return new w(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new h(this.headers), url: this.url });
  }, w.error = function () {
    var t = new w(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var ft = [301, 302, 303, 307, 308];w.redirect = function (t, e) {
    if (-1 === ft.indexOf(e)) throw new RangeError("Invalid status code");return new w(null, { status: e, headers: { location: t } });
  };var dt = self.DOMException;try {
    new dt();
  } catch (e) {
    (dt = function dt(t, e) {
      this.message = t, this.name = e;var n = Error(t);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), dt.prototype.constructor = dt;
  }S.polyfill = !0, self.fetch || (self.fetch = S, self.Headers = h, self.Request = v, self.Response = w);var pt = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var gt = function () {
    function gt(t, e, n, r, i) {
      _classCallCheck(this, gt);

      this.publicServerKey = t, this.uuid = e, this.name = n, this.token = r, this.scope = i, this.attempts = 0;
    }

    gt.prototype.initialize = function initialize() {
      var _this8 = this;

      return new Promise(function (t) {
        var e = window.location.href;if (null != e) {
          if (2 <= e.split("?").length) {
            var _n3 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(t) {
                if (-1 == t.indexOf("&")) return {};var e = t.split("&");var n = {};for (var _t18 = 0; _t18 < e.length; _t18++) {
                  var _r4 = e[_t18].split("="),
                      _i2 = decodeURIComponent(_r4[0]),
                      _o4 = decodeURIComponent(_r4[1]);void 0 === n[_i2] ? n[_i2] = decodeURIComponent(_o4) : "string" == typeof n[_i2] ? n[_i2] = [n[_i2], decodeURIComponent(_o4)] : n[_i2].push(decodeURIComponent(_o4));
                }return n;
              };

              return _class;
            }().getParametersFromUrl(e.split("?")[1]);if (null == _n3.data) return void t(null);var _r3 = atob(_n3.data).split(":");if (4 !== _r3.length) return t(null), null;var _i = _r3[0],
                _o3 = _r3[1],
                _s = _r3[2],
                _a = _r3[3];null != _i && 16 >= _i.length && null != _o3 && 40 >= _o3.length && null != _s && 40 >= _s.length && null != _a && 5 >= _a.length || t(null);var _u2 = new gt(_s, _o3, _i, _a);window.tokenCache = _u2, t(_u2);
          } else if (2 <= e.split("#").length) {
            var _n4 = e.split("#")[1];S(pt.CLIENT_SESSION_SERVER + "?token=" + _n4).then(function (e) {
              e.json().then(function (e) {
                if (0 < e.errors.length) return void (3 > _this8.attempts ? (s("Failed to load session, trying again in a bit."), setTimeout(function () {
                  _this8.requestWasPreviouslyAttempted = !0, _this8.initialize().then(t), _this8.attempts++;
                }, 1e3)) : (console.log("Session error"), t(null)));var n = e.response;null != n.hasOwnProperty("serverIdentity") || (function (t) {
                  oalog(t);
                }("No identity to fetch"), document.getElementById("top-head").src = "https://minotar.net/helm/" + n.playerName);var r = new gt(n.publicKey, n.playerUuid, n.playerName, n.session, n.scope);window.tokenCache = r, t(r);
              }).catch(function (t) {
                console.error(t);
              });
            }).catch(function (t) {
              x("Something went while requesting tokens. Error: " + t.toJSON(), window.tokenCache.name), console.error(t);
            });
          } else t(null);
        } else t(null);
      });
    };

    gt.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return gt;
  }();

  var mt = { PROXY: pt.CONTENT_PROXY, YOUTUBE: pt.YOUTUBE_PROXY, SOUNDCLOUD: pt.SOUNDCLOUD_PROXY, DRIVE: pt.DRIVE_PROXY };
  var vt = function () {
    function vt() {
      _classCallCheck(this, vt);

      this.startedRandomly = !1, this.lastIndex = 0;
    }

    vt.prototype.translate = function translate(t) {
      var e = this.handleRandomizedPlaylist(t);try {
        if (e.includes("media.openaudiomc.net")) return t;if (e = e.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !e.includes("http")) return null;if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", mt.DRIVE)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", mt.DRIVE)), e.includes("https://drive.google.com/") && (e = e.split("file/d/")[1], e = mt.DRIVE + e.split("/view")[0]), this.isYoutube = !1, e.includes("youtube.")) {
          var _t19 = e.split("v=")[1];_t19.includes("&") && (_t19 = _t19.split("&")[0]), e = mt.YOUTUBE + _t19, this.isYoutube = !0;
        } else if (e.includes("youtu.be")) {
          var _t20 = e.split(".be/")[1];e = mt.YOUTUBE + _t20, this.isYoutube = !0;
        }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (fetch("https://media.openaudiomc.net/2/soundcloud?u=" + e).then(function (t) {
          return t.json();
        }).then(function (t) {
          document.getElementById("sc-cover").style.display = "", document.getElementById("sc-title").style.display = "", document.getElementById("sc-title").innerText = t.artist + " - " + t.title, document.getElementById("sc-title").onclick = function () {
            window.open(t.link);
          }, document.getElementById("sc-cover").src = t.photo;
        }), e = mt.SOUNDCLOUD + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = mt.PROXY + e);
      } catch (e) {
        return console.log("Middleware error"), console.log(e), t;
      }return e;
    };

    vt.prototype.handleRandomizedPlaylist = function handleRandomizedPlaylist(t) {
      if (t.startsWith("[") && t.endsWith("]")) {
        var e = JSON.parse(t);if (!this.startedRandomly) {
          var _t21 = J(Math.random() * e.length);return this.lastIndex = _t21, this.startedRandomly = !0, e[_t21];
        }return this.lastIndex++, this.lastIndex > e.length - 1 && (this.lastIndex = 0), e[this.lastIndex];
      }return t;
    };

    return vt;
  }();

  var yt = {},
      bt = new vt();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
  var wt = function (_vt) {
    _inherits(wt, _vt);

    function wt(t) {
      var _this9;

      _classCallCheck(this, wt);

      (_this9 = _possibleConstructorReturn(this, _vt.call(this)), _this9), _this9.rawSource = t, t = _this9.translate(t), _this9.soundElement = function (t) {
        t = bt.translate(t);var e = yt[t];return null == e ? new Audio() : e;
      }(t), _this9.hadError = !1, _this9.source = t, _this9.error = null, _this9.trackable = !1, _this9.soundElement.onerror = function (t) {
        _this9.hadError = !0, _this9.error = t, _this9._handleError();
      }, _this9.soundElement.src = t, _this9.soundElement.setAttribute("preload", "auto"), _this9.soundElement.setAttribute("controls", "none"), _this9.soundElement.setAttribute("display", "none"), _this9.soundElement.preload = "auto", _this9.soundElement.abort = console.log, _this9.openAudioMc = null, _this9.onFinish = [], _this9.loop = !1, _this9.mixer = null, _this9.channel = null, _this9.finsishedInitializing = !1, _this9.gotShutDown = !1;return _this9;
    }

    wt.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    wt.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _t22 = this.soundElement.error.code,
            e = null;this.isYoutube ? e = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === _t22 ? e = "MEDIA_ERR_ABORTED" : 2 === _t22 ? e = "MEDIA_ERR_NETWORK" : 3 === _t22 ? e = "MEDIA_ERR_DECODE" : 4 === _t22 && (e = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != e && (s("Reporting media failure " + e), this.openAudioMc.socketModule.send("media_failure", { mediaError: e, source: this.soundElement.src }));
      }
    };

    wt.prototype.addNode = function addNode(t, e) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = mt.PROXY + this.soundElement.src), this.controller = t.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(e);
    };

    wt.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    wt.prototype.finalize = function finalize() {
      var _this10 = this;

      return new Promise(function (t) {
        _this10.soundElement.onended = function () {
          _this10.gotShutDown || !_this10.finsishedInitializing || (_this10.onFinish.forEach(function (t) {
            t();
          }), _this10.loop ? (_this10.soundElement.src = _this10.translate(_this10.rawSource), _this10.setTime(0), _this10.soundElement.play()) : (_this10.mixer.removeChannel(_this10.channel), !_this10.soundElement.paused && _this10.soundElement.pause()));
        };var e = !1;var n = function n() {
          if (!_this10.gotShutDown) {
            if (!e) {
              var _e8 = _this10.soundElement.play();_e8 instanceof Promise ? _e8.then(t).catch(t) : t();
            }e = !0;
          }
        };_this10.soundElement.onplay = function () {
          _this10.gotShutDown && (s("Canceled a sound that started to play, for some reason."), _this10.soundElement.pause());
        }, _this10.soundElement.onprogress = n, _this10.soundElement.oncanplay = n, _this10.soundElement.oncanplaythrough = n;
      });
    };

    wt.prototype.setLooping = function setLooping(t) {
      this.loop = t;
    };

    wt.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    wt.prototype.setOnFinish = function setOnFinish(t) {
      this.onFinish.push(t);
    };

    wt.prototype.setVolume = function setVolume(t) {
      100 < t && (t = 100), this.soundElement.volume = t / 100;
    };

    wt.prototype.startDate = function startDate(t) {
      var e = new Date(t),
          n = (this.openAudioMc.timeService.getPredictedTime() - e) / 1e3;s("Started " + n + " ago");var r = this.soundElement.duration;if (n > r) {
        n -= J(n / r) * r;
      }s("Starting " + n + " in"), this.setTime(n);
    };

    wt.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    wt.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return wt;
  }(vt);

  var St = function () {
    function St(t, e) {
      var _this11 = this;

      _classCallCheck(this, St);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null, this.recentSource = "/none", o(function () {
        window.debugUi.addPanel($.AUDIO, function () {
          return "playingChannels=" + _this11.channels.size + ", prefetched=" + Object.keys(yt).length + ", recent=" + _this11.recentSource.split("/")[_this11.recentSource.split("/").length - 1];
        });
      });
    }

    St.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var t = !1;this.channels.forEach(function (e) {
        e.hasSoundPlaying() && (t = !0);
      }), t != this.areSoundsPlaying && (this._playingStateChangeChanged(t), this.areSoundsPlaying = t);
    };

    St.prototype._playingStateChangeChanged = function _playingStateChangeChanged(t) {
      null == this.ambianceSoundMedia || (t ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    St.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      var e = new at("ambiance-lol-dics"),
          n = new wt(t);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), e.mixer = { masterVolume: this.masterVolume }, e.addSound(n), this.ambianceSoundMedia = e, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    St.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, n) {
        var r = [];e.tags.forEach(function (t, e) {
          r.push(e);
        }), e.trackable && t.push({ name: n, tags: r });
      }), this._updatePlayingSounds();
    };

    St.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.channels.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _t23 = _step12.value;
          _t23.updateFromMasterVolume();
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

    St.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof at ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this._updatePlayingSounds();
    };

    St.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    St.prototype.addChannel = function addChannel(t) {
      var _this12 = this;

      if (!(t instanceof at)) throw new Error("Argument isn't a channel");{
        var e = t.channelName,
            _n5 = this.channels.get(e);null != _n5 && _n5.destroy(), t.registerMixer(this), this.channels.set(e, t), setTimeout(function () {
          for (var _e9 in t.sounds) {
            _this12.recentSource = t.sounds[_e9].rawSource;
          }
        }, 1e3);
      }this._updatePlayingSounds();
    };

    return St;
  }();

  var xt = function () {
    function xt(t) {
      var _this13 = this;

      _classCallCheck(this, xt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.startSound = null, this.mixer = new St(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this13.setMasterVolume(t), Cookies.set("volume", t, { expires: 30 });
      };
    }

    xt.prototype.startVolumeMonitor = function startVolumeMonitor(t) {
      var _this14 = this;

      var e = -1;setInterval(function () {
        e != _this14.masterVolume && (e = _this14.masterVolume, t.socketModule.send("volume_changed", { volume: _this14.masterVolume }));
      }, 300);
    };

    xt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      "" == t || null == t || this.mixer.setupAmbianceSound(t);
    };

    xt.prototype.startVolumeWatcher = function startVolumeWatcher(t) {
      this.startVolumeMonitor(t);
    };

    xt.prototype.postBoot = function postBoot() {
      var _this15 = this;

      if (null != this.startSound) {
        var _t24 = new at("startsound"),
            e = new wt(this.startSound);e.openAudioMc = this.openAudioMc, e.setOa(this.openAudioMc), e.setOnFinish(function () {
          setTimeout(function () {
            _this15.mixer._updatePlayingSounds();
          }, 1e3);
        }), e.finalize().then(function () {
          _this15.mixer.addChannel(_t24), _t24.addSound(e), _t24.setChannelVolume(100), _t24.updateFromMasterVolume(), e.finish();
        });
      } else setTimeout(function () {
        _this15.mixer._updatePlayingSounds();
      }, 500);
    };

    xt.prototype.destroySounds = function destroySounds(t, e, n, r) {
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

    xt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, 0 === t ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Audio Volume: " + t + "%", Cookies.set("volume", t, { expires: 30 }), this.mixer.setMasterVolume(t);
    };

    xt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    xt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return xt;
  }();

  var Et = function () {
    function Et(t, e) {
      var _this17 = this;

      _classCallCheck(this, Et);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], this.inCount = 0, this.outCount = 0, o(function () {
        window.debugUi.addPanel($.SOCKET, function () {
          return "in=" + _this17.inCount + ", out=" + _this17.outCount + ", ok=" + _this17.socket.connected;
        });
      }), null == new gt().fromCache()) return console.log("Empty authentication"), void a(rt.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token;var n = this;this.socket = io(e, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.socketModule.state = "ok", _this17.hasConnected = !0, _this17.outgoingQueue.forEach(function (t) {
          _this17.send(t.key, t.value);
        });
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            n = parseInt(e[1]),
            r = parseInt(e[0]);_this17.openAudioMc.getTimeService().sync(r, n);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), n.state = "closed", a(rt.BAD_AUTH), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010), t.voiceModule.shutDown();
      }), this.socket.on("data", function (t) {
        var e = t.type.split("."),
            r = e[e.length - 1];null != n.handlers[r] && n.handlers[r](t.payload), _this17.inCount++;
      }), this.socket.connect();
    }

    Et.prototype.send = function send(t, e) {
      if (this.outCount++, this.hasConnected) {
        if (!this.callbacksEnabled) return void s("could not satisfy callback " + t + " because the protocol is outdated");s("Submitting value for " + t), this.socket.emit(t, e);
      } else this.outgoingQueue.push({ key: t, value: e });
    };

    Et.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return Et;
  }();

  var Mt = function () {
    function Mt(t, e, n) {
      _classCallCheck(this, Mt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0;
    }

    Mt.prototype.add = function add(t, e, n) {
      return this.x += t, this.y += e, this.z += n, this;
    };

    Mt.prototype.applyQuaternion = function applyQuaternion(t) {
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

    Mt.prototype.square = function square(t) {
      return t * t;
    };

    Mt.prototype.distance = function distance(t) {
      var e = this.square(this.x - t.x) + this.square(this.y - t.y) + this.square(this.z - t.z);return Math.sqrt(e);
    };

    return Mt;
  }();

  var kt = function () {
    function kt(t, e, n, r, i, o, s) {
      _classCallCheck(this, kt);

      this.id = t, this.source = e, this.location = n, this.type = r, this.maxDistance = i, this.startInstant = o, this.openAudioMc = s, this.channel = null;
    }

    kt.prototype.getDistance = function getDistance(t, e) {
      return e.location.distance(this.location);
    };

    return kt;
  }();

  var Ot = function Ot(t) {
    _classCallCheck(this, Ot);

    function e(e, n) {
      t.socketModule.registerHandler(e, function (e) {
        return n(t, e);
      });
    }e("ClientVersionPayload", k), e("NotificationPayload", M), e("HueColorPayload", _), e("ClientPlayerLocationPayload", A), e("ClientSpeakerCreatePayload", P), e("ClientSpeakerDestroyPayload", T), e("ClientPreFetchPayload", N), e("ClientUpdateMediaPayload", I), e("ClientCreateMediaPayload", E), e("ClientDestroyMediaPayload", C), e("ClientVolumePayload", O), e("ClientVoiceChatUnlockPayload", R), e("ClientVoiceSubscribePayload", L), e("ClientVoiceDropPayload", F), e("ClientVoiceUpdatePeerLocationsPayload", B), e("ClientVoiceChatToggleMicrophonePayload", j);
  };

  var Ct = function () {
    function Ct() {
      var _this18 = this;

      _classCallCheck(this, Ct);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this18.select();
        };
      });
    }

    Ct.prototype.setBridgeName = function setBridgeName(t) {
      document.getElementById("bridge-name").innerText = t;
    };

    Ct.prototype.select = function select() {
      this.updateState();
    };

    Ct.prototype.applyState = function applyState() {
      var _this19 = this;

      this.state.forEach(function (t) {
        _this19.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    Ct.prototype.updateState = function updateState() {
      var _this20 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this20.state.push(_this20.obtainSelection(t));
      }), Cookies.set("hue-state", this.state, { expires: 30 });
    };

    Ct.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          n = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: n };
    };

    Ct.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    Ct.prototype.getInputById = function getInputById(t) {
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

    Ct.prototype.getHueIdFromId = function getHueIdFromId(t) {
      return this.state[parseInt(t)].value;
    };

    Ct.prototype.setLightNamesAndIds = function setLightNamesAndIds(t) {
      var e = "";t.forEach(function (t) {
        e += "<option data-light='" + t.id + "'>" + t.name + "</option>";
      }), this.dropdowns.forEach(function (t) {
        t.innerHTML = e;
      });
    };

    return Ct;
  }();

  var _t = [],
      It = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t25 = _t.length; _t25--;) {
        clearInterval(_t[_t25]);
      }_t = [];
    }(), V(this + "");
  };
  var At = function () {
    function At(t) {
      _classCallCheck(this, At);

      this.host = t;
    }

    At.prototype.route = function route(t) {
      var _this21 = this;

      return new Promise(function (e, n) {
        _this21.tokenSet = new gt().fromCache(), "ACCOUNT" === _this21.tokenSet.scope ? (s("Using account based profile system..."), function (t, e, n, r) {
          S("https://cloud.openaudiomc.net/api/v3/account-services/client/login/" + r.publicServerKey).then(function (r) {
            r.json().then(function (r) {
              if (null == r.errors || 0 != r.errors.length) return n(r.errors), void console.log(r.errors);var i = r.response;if (i.settings.banned) return void x("Declined connection due to ban " + window.location.host, "Steve", function () {
                window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
              });var o = i.secureEndpoint;s("accepting and applying settings");var a = i.settings.ambianceSound;null != i.settings.backgroundImage && "" != i.settings.backgroundImage && (i.settings.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + i.settings.backgroundImage);var u = i.settings.backgroundImage;"" !== u && (document.getElementById("banner-image").src = u);var c = i.settings.title,
                  l = i.settings.activeMessage,
                  h = i.settings.errorMessage;var f = "";V(h).childNodes.forEach(function (t) {
                f += t.outerHTML;
              });var d = "";V(l).childNodes.forEach(function (t) {
                d += t.outerHTML;
              }), "" !== h && (t.getMessages().errorMessage = f), "" !== l && (t.getMessages().welcomeMessage = d);var p = i.settings.welcomeMessage;p = p.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = p, document.getElementById("initialize-button").innerHTML = i.settings.startButton, document.documentElement.style.setProperty("--border-color-dark", i.settings.color);var g = function (t, e) {
                var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + ",0.4)";
              }(i.settings.color);if (document.documentElement.style.setProperty("--border-color-normal", i.settings.color), document.documentElement.style.setProperty("--border-color-light", g), t.getUserInterfaceModule().changeColor("#2c78f6", i.settings.color), t.getUserInterfaceModule().changeColor("#4F46E5", i.settings.color), "" != i.settings.startSound && (t.getMediaManager().startSound = i.settings.startSound), "default" !== c) {
                document.title = c;try {
                  parent.document.title = c;
                } catch (t) {}
              }s("Logging into " + i.name + " with " + i.playerCount + " online player(s)"), e({ fromCache: r.fromCache, host: o, background: u, ambianceSound: a, playerCount: r.response.playerCount, claimed: r.response.claimed, rtc: r.response.rtc });
            }).catch(function (t) {
              console.log("Dead end 1"), n(t);
            });
          }).catch(function (t) {
            console.log("Dead end 2"), n(t);
          });
        }(t, e, n, _this21.tokenSet)) : (s("Using LEGACY profile system..."), function (t, e, n, r) {
          S("https://cloud.openaudiomc.net/api/v2/account-services/client/login/" + r.publicServerKey).then(function (r) {
            r.json().then(function (r) {
              if (null == r.errors || 0 != r.errors.length) return n(r.errors), void console.log(r.errors);var i = r.response;if (i.banned) return void x("Declined connection due to ban " + window.location.host, "Steve", function () {
                window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
              });var o = i.secureEndpoint,
                  a = i.ambianceSound;s("accepting and applying settings"), t.debugPrint("Updating settings..."), null != i.backgroundImage && "" != i.backgroundImage && (i.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + i.backgroundImage);var u = i.backgroundImage;"" !== u && (document.getElementById("banner-image").src = u);var c = i.title,
                  l = i.clientWelcomeMessage,
                  h = i.clientErrorMessage;var f = "";V(h).childNodes.forEach(function (t) {
                f += t.outerHTML;
              });var d = "";V(l).childNodes.forEach(function (t) {
                d += t.outerHTML;
              }), "" !== h && (t.getMessages().errorMessage = f), "" !== l && (t.getMessages().welcomeMessage = d);var p = i.greetingMessage;p = p.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = p, document.getElementById("initialize-button").innerHTML = i.connectButtonText, document.documentElement.style.setProperty("--border-color-dark", i.accentColor);var g = function (t, e) {
                var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + ",0.4)";
              }(i.accentColor);if (document.documentElement.style.setProperty("--border-color-normal", i.accentColor), document.documentElement.style.setProperty("--border-color-light", g), t.getUserInterfaceModule().changeColor("#2c78f6", i.accentColor), t.getUserInterfaceModule().changeColor("#4F46E5", i.accentColor), "" != i.startSound && (t.getMediaManager().startSound = i.startSound), "default" !== c) {
                document.title = c;try {
                  parent.document.title = c;
                } catch (t) {}
              }e({ host: o, background: u, ambianceSound: a });
            }).catch(function (t) {
              console.log("Dead end 1"), n(t);
            });
          }).catch(function (t) {
            console.log("Dead end 2"), n(t);
          });
        }(t, e, n, _this21.tokenSet));
      });
    };

    return At;
  }();

  var Pt = function () {
    function Pt(t) {
      _classCallCheck(this, Pt);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    Pt.prototype.setupPermissions = function setupPermissions() {
      var _this22 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new ot("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><span id="noti-perm-request-link" class="alert-message-button">Setup</span></div>'), r(function () {
        document.getElementById("noti-perm-request-link").onclick = _this22.requestNotificationPermissions;
      }));
    };

    Pt.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    Pt.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this23 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this23.requestBox.hide(), new ot("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this23.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return Pt;
  }();

  var Tt = n(132);var Nt = null;
  var Rt = function Rt(t, e, n) {
    _classCallCheck(this, Rt);

    this.x = t || 0, this.y = e || 0, this.z = n || 0;
  };

  var Lt = function () {
    function Lt(t, e, n, r) {
      _classCallCheck(this, Lt);

      this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === r ? 1 : r;
    }

    Lt.prototype.setFromEuler = function setFromEuler(t) {
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

    return Lt;
  }();

  var Ft = function () {
    function Ft() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Mt();
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Lt();

      _classCallCheck(this, Ft);

      this.position = t, this.rotation = e;
    }

    Ft.prototype.applyTo = function applyTo(t) {
      var e = this.position,
          n = new Mt(0, 0, 1).applyQuaternion(this.rotation),
          r = new Mt(0, 1, 0).applyQuaternion(this.rotation);t.positionX ? (t.positionX.value = e.x, t.positionY.value = e.y, t.positionZ.value = e.z) : t.setPosition(e.x, e.y, e.z), t instanceof PannerNode ? t.orientationX ? (t.orientationX.value = n.x, t.orientationY.value = n.y, t.orientationZ.value = n.z) : t.setOrientation(n.x, n.y, n.z) : t.forwardX ? (t.forwardX.value = n.x, t.forwardY.value = n.y, t.forwardZ.value = n.z, t.upX.value = r.x, t.upY.value = r.y, t.upZ.value = r.z) : t.setOrientation(n.x, n.y, n.z, r.x, r.y, r.z);
    };

    return Ft;
  }();

  var Bt = function () {
    function Bt(t, e, n, r) {
      _classCallCheck(this, Bt);

      this.world = t, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(e, n, r);
    }

    Bt.prototype.updateLocation = function updateLocation(t, e, n) {
      this.location = t, this.pitch = this.toRadians(e), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var r = new Rt(this.pitch, this.yaw, 0),
          i = new Lt();i.setFromEuler(r);new Ft(t, i).applyTo(this.listener), this.world.onLocationUpdate();
    };

    Bt.prototype.toRadians = function toRadians(t) {
      return t * (Math.PI / 180);
    };

    Bt.prototype.normalizeYaw = function normalizeYaw(t) {
      return 0 > (t %= 360) && (t += 360), t;
    };

    return Bt;
  }();

  var jt = function jt(t, e, n) {
    _classCallCheck(this, jt);

    this.source = t, this.distance = e, this.speaker = n;
  };

  var Dt = "SPEAKER_2D";
  var Ut = function Ut(t, e, n, r) {
    _classCallCheck(this, Ut);

    this.pannerNode = n.audioCtx.createPanner(), this.media = r, r.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = t.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var i = t.location;new Ft(i).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var Vt = function () {
    function Vt(t, e, n) {
      var _this24 = this;

      _classCallCheck(this, Vt);

      this.id = "SPEAKER__" + e, this.openAudioMc = t, this.speakerNodes = new Map();var r = new at(this.id);r.trackable = !0, this.channel = r;var i = new wt(e);this.media = i, i.openAudioMc = t, i.setOa(t), r.mixer = this.openAudioMc.getMediaManager().mixer, r.addSound(i), r.setChannelVolume(0), i.startDate(n, !0), i.finalize().then(function () {
        t.getMediaManager().mixer.addChannel(r), i.setLooping(!0), r.setTag(_this24.id), r.setTag("SPECIAL"), _this24.openAudioMc.getMediaManager().mixer.updateCurrent(), i.startDate(n, !0), i.finish();
      });
    }

    Vt.prototype.removeSpeakerLocation = function removeSpeakerLocation(t) {
      null != this.speakerNodes.get(t) && this.speakerNodes.delete(t);
    };

    Vt.prototype.updateLocation = function updateLocation(t, e, n) {
      if (t.type == Dt) {
        var _r5 = t.getDistance(e, n),
            _i3 = this._convertDistanceToVolume(t.maxDistance, _r5);if (0 >= _i3) return;this.channel.fadeChannel(_i3, 100);
      } else this.speakerNodes.has(t.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(t.id, new Ut(t, e, n, this.media)));
    };

    Vt.prototype._convertDistanceToVolume = function _convertDistanceToVolume(t, e) {
      return K((t - e) / t * 100);
    };

    Vt.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return Vt;
  }();

  var Ht = function () {
    function Ht(t) {
      _classCallCheck(this, Ht);

      this.openAudioMc = t, this.speakers = new Map(), this.audioMap = new Map(), this.player = new Bt(this, new Mt(0, 0, 0), 0, 0);
    }

    Ht.prototype.getSpeakerById = function getSpeakerById(t) {
      return this.speakers.get(t);
    };

    Ht.prototype.addSpeaker = function addSpeaker(t, e) {
      this.speakers.set(t, e), this.renderAudio2D();
    };

    Ht.prototype.removeSpeaker = function removeSpeaker(t) {
      this.speakers.delete(t), this.audioMap.forEach(function (t, e) {
        t.removeSpeakerLocation(e);
      }), this.renderAudio2D();
    };

    Ht.prototype.getMediaForSource = function getMediaForSource(t, e) {
      var n = this.audioMap.get(t);if (null != n) return n;if (null == e) return null;var r = new Vt(this.openAudioMc, t, e);return this.audioMap.set(t, r), r;
    };

    Ht.prototype.removeMediaFromSource = function removeMediaFromSource(t) {
      var e = this.getMediaForSource(t);null == e || (e.remove(), this.audioMap.delete(t));
    };

    Ht.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    Ht.prototype.isMediaUsed = function isMediaUsed(t) {
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

    Ht.prototype.renderAudio2D = function renderAudio2D() {
      var _this25 = this;

      var t = [];this.speakers.forEach(function (e) {
        var n = e.getDistance(_this25, _this25.player);t.push(new jt(e.source, n, e));
      });var e = new Map();var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = t[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _n6 = _step16.value;
          var _t27 = e.get(_n6.source);null != _t27 ? Array.isArray(_t27) ? (_t27.push(_n6), e.set(_n6.source, _t27)) : _t27.distance > _n6.distance && _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.speaker.type == Dt ? _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, _n6) : _n6.distance <= _n6.speaker.maxDistance && e.set(_n6.source, [_n6]);
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
            var _t26 = _step17.value;
            _this25.getMediaForSource(_t26.source, _t26.speaker.startInstant).updateLocation(_t26.speaker, _this25, _this25.player);
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

    return Ht;
  }();

  var zt = function () {
    function zt() {
      _classCallCheck(this, zt);

      this.successCallback = alert, this.errorCallback = alert;
    }

    zt.prototype.getUserMedia = function getUserMedia(t) {
      var _this26 = this;

      return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
        return _this26.successCallback(t);
      }).catch(function (t) {
        return _this26.errorCallback(t);
      }) : void navigator.webkitGetUserMedia(t, this.successCallback, this.errorCallback) : void navigator.getUserMedia(t, this.successCallback, this.errorCallback);
    };

    return zt;
  }();

  var Gt = function () {
    function Gt(t, e, n, i, o) {
      var _this27 = this;

      _classCallCheck(this, Gt);

      this.openAudioMc = t, this.playerName = e, this.removed = !1;var s = '\n        <div class="flex items-center p-2" id="vc-user-card-' + e + '">\n            <div class="w-16 h-16 rounded-full mr-3 overflow-hidden flex items-center" id="vc-user-card-' + e + '-indicator">\n                <img id="vc-user-card-' + e + '-picture" src="https://visage.surgeplay.com/bust/512/' + n + '" class="w-16">\n            </div>\n            <div class="flex-1">\n                <div class="flex items-center">\n                    <div class="font-semibold text-lg text-teal-500"><svg id="vc-user-card-' + e + '-muted" class="h-8 w-8 text-red-500" style="display: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="1" y1="1" x2="23" y2="23" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /> <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /> <line x1="12" y1="19" x2="12" y2="23" /> <line x1="8" y1="23" x2="16" y2="23" /></svg>' + e + ' <small id="vc-user-card-' + e + '-volume-disp">(' + i + '% volume)</small>\n                    </div>\n                </div>\n                <div><input id="vc-user-card-' + e + '-volume-input"\n                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"\n                            type="range" min="0" max="120" step="1" value="' + i + '"/></div>\n            </div>\n        </div>\n        ';document.getElementById("vc-call-members").innerHTML += s, r(function () {
        var t = document.getElementById("vc-user-card-" + e + "-volume-input");null != t && (t.oninput = function () {
          if (!_this27.removed) {
            var _t28 = document.getElementById("vc-user-card-" + e + "-volume-input").value;o(_t28), _this27.updateVolumeDisplay(_t28);
          }
        });
      }), setTimeout(function () {
        _this27.updatePlaceholder();
      }, 10);
    }

    Gt.prototype.updatePlaceholder = function updatePlaceholder() {
      document.getElementById("empty-call-placeholder").style.display = 0 == this.openAudioMc.voiceModule.peerMap.size ? "" : "none";
    };

    Gt.prototype.remove = function remove() {
      this.removed = !0, document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName)), this.updatePlaceholder();
    };

    Gt.prototype.setVisuallyTalking = function setVisuallyTalking(t) {
      this.removed || (t ? (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = "lime", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "0 0 10pt 2pt lime") : (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = ""));
    };

    Gt.prototype.setVisuallyMuted = function setVisuallyMuted(t) {
      this.removed || (t ? (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "0.2", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "inline") : (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "1", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "none"));
    };

    Gt.prototype.updateVolumeDisplay = function updateVolumeDisplay(t) {
      this.removed || (document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + t + "% volume)");
    };

    return Gt;
  }();

  var Wt = n(60);
  var qt = function () {
    function qt(t, e, n, r, i, o) {
      _classCallCheck(this, qt);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.peerStreamKey = r, this.volume = i, this.volBooster = 1.2, this.uiInst = o, this.harkEvents = null;
    }

    qt.prototype.start = function start(t) {
      var _this28 = this;

      var e = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);e.onFinish(function (e) {
        var n = _this28.openAudioMc.world.player.audioCtx;_this28.setVolume(_this28.volume), _this28.gainNode = n.createGain(), _this28.audio = new Audio(), _this28.audio.autoplay = !0, _this28.audio.srcObject = e, _this28.gainNode.gain.value = _this28.volume / 100 * _this28.volBooster, window.debugAudio = _this28.audio, _this28.audio.muted = !0, s("Playing voice from " + _this28.audio);var r = n.createMediaStreamSource(_this28.audio.srcObject);if (_this28.harkEvents = Object(Wt.a)(e, {}), _this28.harkEvents.on("speaking", function () {
          _this28.uiInst.setVisuallyTalking(!0);
        }), _this28.harkEvents.on("stopped_speaking", function () {
          _this28.uiInst.setVisuallyTalking(!1);
        }), _this28.audio.muted = !0, _this28.openAudioMc.voiceModule.surroundSwitch.isOn()) {
          var _t29 = _this28.gainNode;_this28.pannerNode = n.createPanner(), _this28.pannerNode.panningModel = "HRTF", _this28.pannerNode.maxDistance = _this28.openAudioMc.voiceModule.blocksRadius, _this28.pannerNode.rolloffFactor = 1, _this28.pannerNode.distanceModel = "linear", _this28.setLocation(_this28.x, _this28.y, _this28.z, !0), r.connect(_t29), _t29.connect(_this28.pannerNode), _this28.pannerNode.connect(n.destination);
        } else {
          var _t30 = _this28.gainNode;r.connect(_t30), _t30.connect(n.destination);
        }_this28.audio.play().then(function (t) {
          console.log("Started from the promise", t);
        }).catch(function (t) {
          console.log("Denied from promise", t);
        }), t();
      }), e.onReject(function (t) {
        s("Stream for " + _this28.peerStreamKey + " got denied: " + t);
      });
    };

    qt.prototype.setLocation = function setLocation(t, e, n, r) {
      if (this.openAudioMc.voiceModule.useSurround) {
        if (r && null != this.pannerNode) {
          new Ft(new Mt(this.x, this.y, this.z)).applyTo(this.pannerNode);
        } else r && s("Warning, attempted to update a peer location while the panner node is nil");this.x = t, this.y = e, this.z = n;
      }
    };

    qt.prototype.setVolume = function setVolume(t) {
      this.volume = t, null != this.gainNode && (this.gainNode.gain.value = this.volume / 100 * this.volBooster);
    };

    qt.prototype.stop = function stop() {
      null != this.audio && (s("Closing voice link with " + this.peerStreamKey), this.audio.pause(), this.audio.src = null, this.audio.srcObject = null, this.gainNode.gain.value = 0), null != this.harkEvents && this.harkEvents.stop();
    };

    return qt;
  }();

  var Kt = function () {
    function Kt(t, e, n, r, i, o) {
      var _this29 = this;

      _classCallCheck(this, Kt);

      this.openAudioMc = t, this.playerName = e, this.playerUuid = e, this.streamKey = r, this.active = !0, this.ready = !1, this.location = o, this.volume = 80;var s = Cookies.get("vc-volume-of-" + e);null != s && (this.volume = parseInt(s)), this.ui = new Gt(this.openAudioMc, e, n, this.volume, function (t) {
        _this29.volume = t, Cookies.set("vc-volume-of-" + e, t, { expires: 30 }), _this29.ready && _this29.stream.setVolume(_this29.volume);
      }), this.stream = new qt(t, i, t.voiceModule.streamKey, r, this.volume, this.ui), this.stream.setLocation(o.x, o.y, o.z, !1), this.stream.start(function () {
        return _this29.active ? (_this29.stream.setVolume(_this29.volume), void (_this29.ready = !0)) : void _this29.stop();
      });
    }

    Kt.prototype.updateLocation = function updateLocation(t, e, n) {
      this.stream.setLocation(t, e, n, !0);
    };

    Kt.prototype.stop = function stop() {
      null != this.openAudioMc.voiceModule.peerManager && this.openAudioMc.voiceModule.peerManager.dropStream(this.streamKey), this.active = !1, this.ui.remove(), null != this.stream && this.stream.stop();
    };

    return Kt;
  }();

  var Jt = function () {
    function Jt(t, e, n, i, o, s) {
      var _this30 = this;

      _classCallCheck(this, Jt);

      this.id = t, this.activeText = i, this.inactiveText = n, this.onToggle = s, this.state = null == Cookies.get(t) ? o : JSON.parse(Cookies.get(t));var a = '\n        <div style="text-align:center; display:inline-block;" class="w-3/5">\n            <h4>' + e + '</h4>\n            <input class="tgl tgl-skewed text-center" id="' + this.id + '" type="checkbox"/>\n            <label class="tgl-btn block w-max" data-tg-off="' + this.activeText + '" data-tg-on="' + this.inactiveText + '"\n                   for="' + this.id + '" style="width: 100%"></label>\n        </div>\n        ';document.getElementById("vc-toggles-wrapper").innerHTML += a, r(function () {
        document.getElementById(_this30.id).checked = !_this30.state, document.getElementById(_this30.id).onclick = function () {
          _this30.state = !_this30.state, Cookies.set(_this30.id, _this30.state, { expires: 30 }), _this30.onToggle(_this30.state);
        };
      });
    }

    Jt.prototype.getState = function getState() {
      return this.state;
    };

    Jt.prototype.isOn = function isOn() {
      return this.state;
    };

    return Jt;
  }();

  var Yt = function () {
    function Yt() {
      _classCallCheck(this, Yt);

      this.eventName = "", this.params = new Map();
    }

    Yt.prototype.fromString = function fromString(t) {
      this.original = t;var e = t.split("~");for (var _t31 = 0; _t31 < e.length; _t31++) {
        if (0 === _t31) this.eventName = e[_t31];else {
          var _n7 = e[_t31];if (-1 !== _n7.indexOf("=")) {
            var _t32 = _n7.split("=");this.params.set(_t32[0], _t32[1]);
          }
        }
      }return this;
    };

    Yt.prototype.setParam = function setParam(t, e) {
      return this.params.set(t, e), this;
    };

    Yt.prototype.getParam = function getParam(t) {
      return this.params.get(t);
    };

    Yt.prototype.setEventName = function setEventName(t) {
      return this.eventName = t, this;
    };

    Yt.prototype.getEventName = function getEventName() {
      return this.eventName;
    };

    Yt.prototype.serialize = function serialize() {
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

    Yt.prototype.trimmed = function trimmed() {
      var t = this.eventName.length,
          e = "";for (var _n9, _r6 = 0; _r6 < this.original.length; _r6++) {
        _n9 = this.original.charAt(_r6), _r6 <= t || (e += _n9);
      }return e;
    };

    return Yt;
  }();

  var Xt = function () {
    function Xt() {
      _classCallCheck(this, Xt);

      this.whenFinished = function () {
        s("A promised channel got finished before it got used");
      }, this.whenRejected = function () {
        s("A promised channel got finished before it got used");
      }, this.error = null, this.payload = null;
    }

    Xt.prototype.onFinish = function onFinish(t) {
      return null == this.payload ? void (this.whenFinished = t) : void t(this.payload);
    };

    Xt.prototype.onReject = function onReject(t) {
      return null == this.error ? void (this.whenRejected = t) : void t(this.error);
    };

    Xt.prototype.handleData = function handleData(t) {
      this.payload = t, this.whenFinished(t);
    };

    Xt.prototype.handleError = function handleError(t) {
      this.error = t, this.whenRejected(t);
    };

    return Xt;
  }();

  var $t = function () {
    function $t(t, e, n, r) {
      var _this31 = this;

      _classCallCheck(this, $t);

      this.openAudioMc = t, this.server = e, this.streamKey = n, this.waitingPromises = new Map(), this.trackQueue = new Map(), this.updateNegotiation = !0, this.micStream = r, this.chromeBugWorkaround = [], this.isMuted = !1, document.getElementById("vc-mic-mute").onchange = function () {
        _this31.setMute(!_this31.isMuted);
      }, document.getElementById("mute-wrapper").addEventListener("mouseup", function () {
        _this31.muteCooldown && Swal.fire({ icon: "warning", text: "Please wait a moment before doing this again", backdrop: "", timer: 3e3 });
      }), this.muteCooldown = !1;
    }

    $t.prototype.onStart = function onStart() {
      s("Confluence started"), this.openAudioMc.socketModule.send(it, { enabled: !0 });
    };

    $t.prototype.dropStream = function dropStream(t) {
      "open" === this.dataChannel.readyState ? this.dataChannel.send(new Yt().setEventName("DROP_STREAM").setParam("owner", t).serialize()) : s("Warning! can't drop a stream because the connection is closed");
    };

    $t.prototype.requestStream = function requestStream(t) {
      if ("open" === this.dataChannel.readyState) {
        var e = new Xt();return this.waitingPromises.set(t, e), this.dataChannel.send(new Yt().setEventName("REQUEST_STREAM").setParam("owner", t).serialize()), e;
      }{
        s("Warning! attempted to request a stream for " + t + " but the eb is closed");var _e10 = new Xt();return _e10.handleError("Connection is closed"), _e10;
      }
    };

    $t.prototype.initializeRenegotiation = function initializeRenegotiation() {
      var _this32 = this;

      this.lastNegotiationRequest = performance.now(), this.pcReceiver.createOffer().then(function (t) {
        return _this32.pcReceiver.setLocalDescription(t);
      }).then(function () {
        var t = JSON.stringify({ sdp: btoa(JSON.stringify(_this32.pcReceiver.localDescription)) }),
            e = new Yt().setEventName("KICKSTART_RENEG").serialize();e += t, _this32.dataChannel.send(e);
      }).catch(function (t) {
        _this32.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
      });
    };

    $t.prototype.handleRenagEnd = function handleRenagEnd() {
      if (null != this.lastNegotiationRequest) {
        var t = performance.now(),
            e = Math.ceil(t - this.lastNegotiationRequest);s("Renegotiation took " + e + " MS"), 100 < e && s("Warning! Renegotiation took too long!");
      }
    };

    $t.prototype.registerDataChannel = function registerDataChannel(t, e) {
      var _this33 = this;

      t.addEventListener("open", function () {
        s("Opened RTC event bus");
      }), t.addEventListener("close", function () {
        s("Closed RTC event bus");
      }), t.addEventListener("message", function (t) {
        var n = t.data;var r = new Yt().fromString(n);switch (r.getEventName()) {case "REQUEST_NEG_INIT":
            s("Server requested renag start"), _this33.initializeRenegotiation();break;case "NEGOTIATION_RESPONSE":
            var _t33 = r.trimmed(),
                _n10 = JSON.parse(_t33);s("response was " + _t33.length), _this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_n10.sdp)))).then(function () {
              _this33.handleRenagEnd(), _this33.dataChannel.send(new Yt().setEventName("CLIENT_CONFIRMED_NEG").serialize());
            });break;case "PROCESS_OFFER":
            _this33.lastNegotiationRequest = performance.now();var _i4 = JSON.parse(r.trimmed());_this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_i4.sdp)))).then(function () {
              _this33.pcReceiver.createAnswer().then(function (t) {
                var e = new Yt().setEventName("PROCESS_RESPONSE").serialize();e += btoa(JSON.stringify(t)), _this33.dataChannel.send(e), _this33.pcReceiver.setLocalDescription(t).catch(function (t) {
                  _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                });
              }).catch(function (t) {
                _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
              });
            }).catch(function (t) {
              _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
            });break;case "CONFIRM_NEGOTIATION":
            _this33.handleRenagEnd();break;case "NEGOTIATION_CANCELLED":
            s("Negotiation was ignored, server doesn't think it to be needed.");break;case "OK":
            null != e && e(), s("Received Confluence channel confirmation");break;case "REJECT_REQUEST":
            var _o5 = r.getParam("owner");s("The server rejected a stream request to " + _o5), _this33.waitingPromises.has(_o5) && (_this33.waitingPromises.get(_o5).handleError("Request got denied by the server"), _this33.waitingPromises.delete(_o5));break;case "CONFIRM_REQUEST":
            s("Server acknowledged a track request to " + r.getParam("name") + ". Expecting " + r.getParam("streamid")), _this33.trackQueue.set(r.getParam("streamid"), r.getParam("owner"));break;case "CONTEXT_EVENT":
            _this33.contextEvent(r);break;default:
            s("Warning! received a rtc packet called " + r.getEventName() + " but I don't have a clue what it does.");}
      });
    };

    $t.prototype.contextEvent = function contextEvent(t) {
      var e = t.getParam("type");"client-muted" === e ? (s(t.getParam("who") + " muted their microphone"), this.openAudioMc.voiceModule.peerMap.get(t.getParam("who")).ui.setVisuallyMuted(!0)) : "client-unmuted" === e && (s(t.getParam("who") + " unmuted their microphone"), this.openAudioMc.voiceModule.peerMap.get(t.getParam("who")).ui.setVisuallyMuted(!1));
    };

    $t.prototype.onInternalTrack = function onInternalTrack(t, e, n) {
      var _this34 = this;

      var r = t.id;if (!t.active) return void s("Received an inactive track! cancelling.");if (!this.trackQueue.has(r)) return void s("Received an unknown track called " + r + ". Ignoring it.");var i = this.trackQueue.get(r),
          o = this.waitingPromises.get(i);return null == o ? void (e ? s("Got a stream that doesn't seem to be asked for, skipping it. it was " + r) : (s("Got a stream that doesn't seem to be asked for, trying again in 1s"), setTimeout(function () {
        _this34.onInternalTrack(t, !0, n);
      }, 1e3))) : (s("Setting up stream for " + r), console.log(t), o.handleData(t), this.waitingPromises.delete(i), void this.trackQueue.delete(r));
    };

    $t.prototype.setup = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
        var _this35 = this;

        var e, n, r, i, _t34;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e = this.server + "webrtc/confluence/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                this.pcReceiver = new RTCPeerConnection();n = !1, r = function r(t) {
                  if ("connected" === _this35.pcReceiver.connectionState || "connected" === t.target.iceConnectionState) {
                    if (n) return;n = !0, _this35.onStart();
                  }
                };
                this.pcReceiver.oniceconnectionstatechange = r, this.pcReceiver.addEventListener("connectionstatechange", r), this.pcReceiver.onnegotiationneeded = function () {
                  s("Finished negotiation round");
                }, this.dataChannel = this.pcReceiver.createDataChannel("eb"), this.registerDataChannel(this.dataChannel, t), this.listenForTracks();i = this.micStream.getTracks();
                for (_t34 = 0; _t34 < i.length; _t34++) {
                  this.pcReceiver.addTrack(this.micStream.getTracks()[_t34]);
                }this.pcReceiver.createOffer().then(function (t) {
                  return _this35.pcReceiver.setLocalDescription(t);
                }).then(function () {
                  fetch(e, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this35.pcReceiver.localDescription)) }) }).then(function (t) {
                    200 == t.status ? t.json().then(function (t) {
                      _this35.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(t.Sdp))));
                    }) : (Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Connection error", text: "Something went wrong while connecting to the OpenAudioMc voice service. Please try again in a minute or so.", footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' }), _this35.openAudioMc.voiceModule.handleCrash("RTC connection error"));
                  }).catch(function (t) {
                    console.error(t), _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                  });
                }).catch(function (t) {
                  _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(t.toJSON()));
                }), window.rtcHook = this.pcReceiver;
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setup(_x5) {
        return _ref.apply(this, arguments);
      }

      return setup;
    }();

    $t.prototype.setMute = function setMute(t) {
      var _this36 = this;

      if (this.muteCooldown) Swal.fire("Please wait a moment before doing this again");else {
        this.isMuted = t, this.muteCooldown = !0, document.getElementById("vc-mic-mute").disabled = !0, setTimeout(function () {
          _this36.muteCooldown = !1, document.getElementById("vc-mic-mute").disabled = !1;
        }, 500);for (var e = 0; e < this.micStream.getAudioTracks().length; e++) {
          this.micStream.getAudioTracks()[e].enabled = !t;
        }t ? (this.openAudioMc.voiceModule.pushSocketEvent(Zt.MIC_MUTE), this.dataChannel.send(new Yt().setEventName("CONTEXT_EVENT").setParam("type", "muted-stream").serialize())) : (this.openAudioMc.voiceModule.pushSocketEvent(Zt.MIC_UNMTE), this.dataChannel.send(new Yt().setEventName("CONTEXT_EVENT").setParam("type", "unmuted-stream").serialize()));
      }
    };

    $t.prototype.stop = function stop() {
      this.micStream.getTracks().forEach(function (t) {
        t.stop();
      }), this.pcReceiver.close();
    };

    $t.prototype.listenForTracks = function listenForTracks() {
      var _this37 = this;

      this.pcReceiver.addEventListener("track", function (t) {
        for (var e = 0; e < t.streams.length; e++) {
          if ("dead-mans-track" === t.streams[e].id) return;t.track.onended = function () {
            _this37.dataChannel.send(new Yt().setEventName("SCHEDULE_RENAG").serialize());
          }, _this37.onInternalTrack(t.streams[e], !1, t.track);
        }
      });
    };

    return $t;
  }();

  window.randomLoadCallbacks = new Map();
  var Qt = function () {
    function Qt(t, e, n) {
      var _this38 = this;

      _classCallCheck(this, Qt);

      this.openAudioMc = t, s("Enabling voice data collection"), this.harkEvents = Object(Wt.a)(n, {}), this.loudnessHistory = [], this.isSpeaking = !1, this.filledHistory = !1, this.state = Zt.LEVEL_NORMAL, this.delta = 20, this.averageState = [0], this.harkEvents.on("speaking", function () {
        _this38.isSpeaking = !0, _this38.isReady() || s("Starting loudness data detection");
      }), this.harkEvents.on("volume_change", function (t) {
        if (_this38.isSpeaking) {
          var _e11 = q(t);200 < _this38.loudnessHistory.length && (_this38.loudnessHistory.shift(), !_this38.filledHistory && (_this38.filledHistory = !0, _this38.onStart()), _this38.onUpdate(t)), _this38.loudnessHistory.push(_e11), 20 < _this38.averageState.length && _this38.averageState.shift(), _this38.averageState.push(_this38.state);
        }
      }), this.harkEvents.on("stopped_speaking", function () {
        _this38.isSpeaking = !1, _this38.isReady() || s("Pausing loudness data detection");
      });
    }

    Qt.prototype.findAverageState = function findAverageState() {
      var t = this.averageState.reduce(function (t, e) {
        return t + e;
      }, 0) / this.averageState.length || 0;return 0 > t ? Zt.LEVEL_WHISPERING : 1 < t ? Zt.LEVEL_SHOUTING : Zt.LEVEL_NORMAL;
    };

    Qt.prototype.isReady = function isReady() {
      return 180 < this.loudnessHistory.length;
    };

    Qt.prototype.findAverageLoudness = function findAverageLoudness() {
      return this.loudnessHistory.reduce(function (t, e) {
        return t + e;
      }, 0) / this.loudnessHistory.length || 0;
    };

    Qt.prototype.onStart = function onStart() {
      s("Starting voice loudness detection");
    };

    Qt.prototype.onUpdate = function onUpdate(t) {
      if (this.isReady()) {
        t = q(t), q(this.findAverageLoudness() - t) > this.delta ? t > this.findAverageLoudness() ? this.onChange(Zt.LEVEL_SHOUTING) : this.onChange(Zt.LEVEL_WHISPERING) : this.onChange(Zt.LEVEL_NORMAL);
      }
    };

    Qt.prototype.onChange = function onChange(t) {
      t != this.state && (this.state = t, this.openAudioMc.voiceModule.loudnessDetectionEnabled && (s("Changing special voice flair to " + this.state), this.openAudioMc.voiceModule.pushSocketEvent(this.state)));
    };

    Qt.prototype.stop = function stop() {
      this.harkEvents.stop();
    };

    return Qt;
  }();

  var Zt = { MIC_MUTE: "MICROPHONE_MUTED", MIC_UNMTE: "MICROPHONE_UNMUTE", LEVEL_WHISPERING: "LEVEL_WHISPERING", LEVEL_NORMAL: "LEVEL_NORMAL", LEVEL_SHOUTING: "LEVEL_SHOUTING" };
  var te = function () {
    function te(t) {
      var _this39 = this;

      _classCallCheck(this, te);

      this.openAudioMc = t, this.peerManager = null, this.peerMap = new Map(), this.loadedDeviceList = !1, this.loadeMicPreference = Cookies.get("preferred-mic"), this.loudnessDetectionEnabled = !1, this.surroundSwitch = new Jt("use-surround", "Sound Type", "Constant volume", "Surround", !0, function (t) {
        _this39.openAudioMc.socketModule.send(it, { enabled: !1 }), _this39.useSurround = t, _this39.onSurrroundUpdate();
      }), this.useSurround = this.surroundSwitch.isOn();
    }

    te.prototype.enable = function enable(t, e, n) {
      var _this40 = this;

      this.blocksRadius = n, this.server = t, this.streamKey = e, document.getElementById("vc-controls").style.display = "", document.getElementById("vc-block-range").innerText = this.blocksRadius + " block", document.getElementById("vc-concent-button").onclick = function () {
        _this40.consent(_this40.loadeMicPreference);
      }, G("vc-onboarding"), null != Cookies.get("vc-beta-call-to-action") || (z("https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js", function () {
        window.confetti.start(2500), Swal.fire({ title: "Voice BETA 0.2", html: '\n            <b>Its finally here!</b><br />\n            Your client just updated to beta R2, adding a bunch of new features and fixing a ton of pesky bugs.\n            <br />\n            Please check <u><a href="https://help.openaudiomc.net/blog/voicechat-R2">our latest blog post</a></u> to read up on changes and new things to look out for in the future.<br />\n            Please reach out <u><a href="https://discord.openaudiomc.net/">in the OpenAudioMc Discord</a></u> if you have any questions or feedback.\n            <h1>enjoy!</h1>\n            ', imageUrl: "https://media.hearthpwn.com/attachments/96/921/tada.png", imageWidth: 200, imageHeight: 200, imageAlt: "TADAAAA", backdrop: "", allowOutsideClick: !1 });
      }), Cookies.set("vc-beta-call-to-action", !0));
    };

    te.prototype.addPeer = function addPeer(t, e, n, r) {
      s("Trying to add peer " + e), this.peerMap.set(n, new Kt(this.openAudioMc, e, t, n, this.server, r));
    };

    te.prototype.peerLocationUpdate = function peerLocationUpdate(t, e, n, r) {
      this.peerMap.has(t) && this.peerMap.get(t).updateLocation(e, n, r);
    };

    te.prototype.removeAllPeers = function removeAllPeers() {
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

    te.prototype.removePeer = function removePeer(t) {
      if (this.peerMap.has(t)) {
        s("Removing peer " + t);var e = this.peerMap.get(t);this.peerMap.delete(t), e.stop();
      } else s("Couldn't remove peer " + t + " because, well, there is no such peer");
    };

    te.prototype.onSurrroundUpdate = function onSurrroundUpdate() {
      var _this41 = this;

      this.openAudioMc.socketModule.send(it, { enabled: !1 }), Swal.fire({ title: "Reloading voice system!", html: "Please wait while voice chat gets restarted to apply your new settings.. this shouldn't take long", timer: 3500, showCloseButton: !1, backdrop: "", showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && _this41.openAudioMc.socketModule.send(it, { enabled: !0 });
      });
    };

    te.prototype.handleCrash = function handleCrash(t) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong while starting your voice chat session. Please report this problem and try again later.", backdrop: "" }), x("Something went wrong while enabling voicechat. Error: " + t, window.tokenCache.name);
    };

    te.prototype.handleAudioPermissions = function handleAudioPermissions(t) {
      var _this42 = this;

      this.loadedDeviceList || (navigator.mediaDevices.enumerateDevices().then(function (t) {
        var e = [];for (var _n11, _r7 = 0; _r7 < t.length; _r7++) {
          _n11 = t[_r7], "audioinput" === _n11.kind && e.push({ name: _n11.label, id: _n11.deviceId });
        }_this42.loadedDevices(e);
      }).catch(function (t) {
        console.error(t), _this42.handleCrash(JSON.stringify(t.toJSON()));
      }), this.loadedDeviceList = !0), Swal.fire({ backdrop: "", title: "Logging into voice chat...", html: "Please wait while we get you setup with a voice server.. hold on tight, shits shouldn't take too long.<br /><small>(but please report an issue if it does take too long, it's still work in progress after all.</small>", showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        } }), this.peerManager = new $t(this.openAudioMc, this.server, this.streamKey, t), this.peerManager.setup(this.onOutoingStreamStart).catch(function (t) {
        _this42.handleCrash(JSON.stringify(t.toJSON()));
      }), this.microphoneProcessing = new Qt(this.openAudioMc, this, t), o(function () {
        s("Enabling rtc debugging"), window.debugUi.addPanel($.RTC, function () {
          return "waitingPromises=" + _this42.peerManager.waitingPromises.size + ", trackQueue=" + _this42.peerManager.trackQueue.size + ", state=" + _this42.peerManager.pcReceiver.connectionState + ", ice=" + _this42.peerManager.pcReceiver.iceConnectionState + ", isSpeaking=" + _this42.microphoneProcessing.isSpeaking + ", transceivers=" + _this42.peerManager.pcReceiver.getTransceivers().length + ", muxPolicy=" + _this42.peerManager.pcReceiver.getConfiguration().rtcpMuxPolicy;
        });
      });
    };

    te.prototype.changeInput = function changeInput(t) {
      var _this43 = this;

      s("Stopping current streamer, and restarting with a diferent user input"), Cookies.set("preferred-mic", t, { expires: 30 }), this.peerManager.setMute(!1), this.peerManager.stop(), this.peerManager = null, this.openAudioMc.socketModule.send(it, { enabled: !1 }), Swal.fire({ backdrop: "", title: "Updating microphone!", html: "Please wait while voice chat gets restarted with your new microphone.. this shouldn't take long", timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (e) {
        e.dismiss === Swal.DismissReason.timer && _this43.consent(t);
      });
    };

    te.prototype.loadedDevices = function loadedDevices(t) {
      var _this44 = this;

      var e = document.getElementById("vc-mic-select");for (; 0 < e.options.length;) {
        e.remove(0);
      }for (var _n12 = 0; _n12 < t.length; _n12++) {
        var _r8 = t[_n12],
            _i5 = document.createElement("option");null == this.loadeMicPreference && 0 == _n12 && (_i5.selected = !0), _i5.value = _r8.id, _i5.innerText = _r8.name, _i5.dataset.deviceId = _r8.id, e.add(_i5);
      }null != this.loadeMicPreference && (e.value = this.loadeMicPreference), e.onchange = function (t) {
        var e = t.target.value;_this44.changeInput(e);
      };
    };

    te.prototype.onOutoingStreamStart = function onOutoingStreamStart() {
      G("voice-home"), Swal.close();
    };

    te.prototype.consent = function consent(t) {
      var e = t ? { audio: { deviceId: { exact: t }, noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } } : { audio: { noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } },
          n = new zt();n.successCallback = function (t) {
        this.openAudioMc.voiceModule.handleAudioPermissions(t);
      }.bind(this), n.errorCallback = function (t) {
        return console.error(t), "OverconstrainedError" === t.name || t instanceof OverconstrainedError ? (s("Couldn't get microphone, ignoring and trying again"), void this.consent(null)) : void this.openAudioMc.voiceModule.permissionError(t);
      }.bind(this), n.getUserMedia(e);
    };

    te.prototype.permissionError = function permissionError() {
      G("vc-onboarding"), Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Microphone error", text: 'Something went wrong while trying to access your microphone. Please press "allow" when your browser asks you for microphone permissions, or visit the wiki for more info.', footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' });
    };

    te.prototype.shutDown = function shutDown() {
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

    te.prototype.pushSocketEvent = function pushSocketEvent(t) {
      null != this.peerManager && this.openAudioMc.socketModule.send(it, { event: t });
    };

    return te;
  }();

  n.d(e, "OpenAudioEnv", function () {
    return ee;
  }), n.d(e, "OpenAudioMc", function () {
    return ne;
  });var ee = { build: "177", compiler: "Mindgamesnl", platform: "Production", environment: "Linux", isProd: JSON.parse("true"), envDescription: "default-prod" };
  var ne = function (_ref2) {
    _inherits(ne, _ref2);

    function ne() {
      var _this45, _ret2;

      _classCallCheck(this, ne);

      if ((_this45 = _possibleConstructorReturn(this, _ref2.call(this)), _this45), s("Starting build " + JSON.stringify(ee)), _this45.canStart = !1, _this45.host = null, _this45.background = null, _this45.ambianceSound = "", _this45.tokenSet = new gt().fromCache(), null == _this45.tokenSet) return _ret2 = void a(rt.BAD_AUTH), _possibleConstructorReturn(_this45, _ret2);_this45.notificationModule = new Pt(_this45), _this45.timeService = new tt(), _this45.messages = new et(_this45), _this45.userInterfaceModule = new nt(_this45), _this45.hueConfiguration = new Ct(_this45), _this45.mediaManager = new xt(_this45), _this45.voiceModule = new te(_this45);new At(pt.MAIN_BACKEND).route(_this45).then(function (t) {
        _this45.canStart = !0, _this45.host = t.host, _this45.background = t.background, _this45.ambianceSound = t.ambianceSound, a(rt.WELCOME), o(function () {
          window.debugUi.addPanel($.ACCOUNT, "cached=" + t.fromCache + ", pc=" + t.playerCount + ", claimed=" + t.claimed + ", sfu=" + t.host + ", rtc=" + t.rtc);
        });var e = Cookies.get("volume");null != e && _this45.mediaManager.changeVolume(e);
      }).catch(function (t) {
        console.error(t), console.error("Exception thrown", t.stack), _this45.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this45);
    }

    ne.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new Ht(this), this.hueModule = new st(this, Object(Tt.a)()), this.socketModule = new Et(this, this.host), this.messages.apply(), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new Ot(this), "" !== this.background && (document.getElementById("banner-image").src = this.background), this.mediaManager.postBoot());
    };

    ne.prototype.sendError = function sendError(t) {
      x(t, this.tokenSet.name);
    };

    return ne;
  }(function (_ref3) {
    _inherits(_class2, _ref3);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ref3.apply(this, arguments));
    }

    _class2.prototype.log = function log(t) {
      s(t);
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
    ee.isProd || i(), o(function () {
      window.debugUi.addPanel($.LOG, function () {
        return Z.join("\n");
      });
    });if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");new gt().initialize().then(function (t) {
      return null == t ? (a(rt.BAD_AUTH), window.location = location.protocol + "//" + window.location.host + window.location.pathname + "/login.html", void x("A faulty login attempt was done at " + window.location.host, "Steve")) : (o(function () {
        window.debugUi.addPanel($.SESSION, t.name + "@" + t.publicServerKey + "/" + t.scope);
      }), null != t && null != t.name && (document.getElementById("in-game-name").innerText = t.name, Nt = new ne()), void document.body.addEventListener("click", H));
    });
  }, window.onhashchange = function () {
    return window.location.reload();
  }, "toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
}]);
