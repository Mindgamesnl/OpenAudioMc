"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

!function (t) {
  function e(i) {
    if (n[i]) return n[i].exports;var r = n[i] = { i: i, l: !1, exports: {} };return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports;
  }var n = {};e.m = t, e.c = n, e.d = function (t, n, i) {
    e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: i });
  }, e.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, e.t = function (t, n) {
    if (1 & n && (t = e(t)), 8 & n) return t;if (4 & n && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var i = Object.create(null);if (e.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & n && "string" != typeof t) for (var r in t) {
      e.d(i, r, function (e) {
        return t[e];
      }.bind(null, r));
    }return i;
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
  var i = n(1),
      r = n(7),
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
        m = t & c.G,
        g = t & c.S,
        v = t & c.P,
        y = t & c.B,
        b = m ? i : g ? i[e] || (i[e] = {}) : (i[e] || {})[u],
        w = m ? r : r[e] || (r[e] = {}),
        x = w[u] || (w[u] = {});for (l in m && (n = e), n) {
      f = ((h = !p && b && void 0 !== b[l]) ? b : n)[l], d = y && h ? a(f, i) : v && "function" == typeof f ? a(Function.call, f) : f, b && s(b, l, f, t & c.U), w[l] != f && o(w, l, d), v && x[l] != f && (x[l] = f);
    }
  };i.core = r, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
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
  var i = n(4);t.exports = function (t) {
    if (!i(t)) throw TypeError(t + " is not an object!");return t;
  };
}, function (t) {
  t.exports = function (t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
  };
}, function (t, e, n) {
  var i = n(48)("wks"),
      r = n(29),
      o = n(1).Symbol,
      s = "function" == typeof o;(t.exports = function (t) {
    return i[t] || (i[t] = s && o[t] || (s ? o : r)("Symbol." + t));
  }).store = i;
}, function (t, e, n) {
  var i = n(19),
      r = Math.min;t.exports = function (t) {
    return 0 < t ? r(i(t), 9007199254740991) : 0;
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
  var i = n(3),
      r = n(88),
      o = n(26),
      s = Object.defineProperty;e.f = n(8) ? Object.defineProperty : function (t, e, n) {
    if (i(t), e = o(e, !0), i(n), r) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var i = n(24);t.exports = function (t) {
    return Object(i(t));
  };
}, function (t, e, n) {
  var i = n(1),
      r = n(14),
      o = n(13),
      s = n(29)("src"),
      a = n(126),
      u = "toString",
      c = ("" + a).split(u);n(7).inspectSource = function (t) {
    return a.call(t);
  }, (t.exports = function (t, e, n, a) {
    var u = "function" == typeof n;u && (o(n, "name") || r(n, "name", e)), t[e] === n || (u && (o(n, s) || r(n, s, t[e] ? "" + t[e] : c.join(e + ""))), t === i ? t[e] = n : a ? t[e] ? t[e] = n : r(t, e, n) : (delete t[e], r(t, e, n)));
  })(Function.prototype, u, function () {
    return "function" == typeof this && this[s] || a.call(this);
  });
}, function (t, e, n) {
  var i = n(0),
      r = n(2),
      o = n(24),
      s = /"/g,
      a = function a(t, e, n, i) {
    var r = o(t) + "",
        a = "<" + e;return "" !== n && (a += " " + n + '="' + (i + "").replace(s, "&quot;") + '"'), a + ">" + r + "</" + e + ">";
  };t.exports = function (t, e) {
    var n = {};n[t] = e(a), i(i.P + i.F * r(function () {
      var e = ""[t]('"');return e !== e.toLowerCase() || 3 < e.split('"').length;
    }), "String", n);
  };
}, function (t) {
  var e = {}.hasOwnProperty;t.exports = function (t, n) {
    return e.call(t, n);
  };
}, function (t, e, n) {
  var i = n(9),
      r = n(28);t.exports = n(8) ? function (t, e, n) {
    return i.f(t, e, r(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var i = n(44),
      r = n(24);t.exports = function (t) {
    return i(r(t));
  };
}, function (t, e, n) {
  "use strict";
  var i = n(2);t.exports = function (t, e) {
    return !!t && i(function () {
      e ? t.call(null, function () {}, 1) : t.call(null);
    });
  };
}, function (t, e, n) {
  var i = n(18);t.exports = function (t, e, n) {
    return i(t), void 0 === e ? t : 1 === n ? function (n) {
      return t.call(e, n);
    } : 2 === n ? function (n, i) {
      return t.call(e, n, i);
    } : 3 === n ? function (n, i, r) {
      return t.call(e, n, i, r);
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
  var i = n(45),
      r = n(28),
      o = n(15),
      s = n(26),
      a = n(13),
      u = n(88),
      c = Object.getOwnPropertyDescriptor;e.f = n(8) ? c : function (t, e) {
    if (t = o(t), e = s(e, !0), u) try {
      return c(t, e);
    } catch (e) {}return a(t, e) ? r(!i.f.call(t, e), t[e]) : void 0;
  };
}, function (t, e, n) {
  var i = n(0),
      r = n(7),
      o = n(2);t.exports = function (t, e) {
    var n = (r.Object || {})[t] || Object[t],
        s = {};s[t] = e(n), i(i.S + i.F * o(function () {
      n(1);
    }), "Object", s);
  };
}, function (t, e, n) {
  var i = n(17),
      r = n(44),
      o = n(10),
      s = n(6),
      a = n(104);t.exports = function (t, e) {
    var n = 1 == t,
        u = 4 == t,
        c = 6 == t,
        l = e || a;return function (e, a, h) {
      for (var f, d, p = o(e), m = r(p), g = i(a, h, 3), v = s(m.length), y = 0, b = n ? l(e, v) : 2 == t ? l(e, 0) : void 0; v > y; y++) {
        if ((5 == t || c || y in m) && (d = g(f = m[y], y, p), t)) if (n) b[y] = d;else if (d) switch (t) {case 3:
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
    var i = n(30),
        r = n(1),
        o = n(2),
        s = n(0),
        a = n(59),
        u = n(84),
        c = n(17),
        l = n(42),
        h = n(28),
        f = n(14),
        d = n(43),
        p = n(19),
        m = n(6),
        g = n(115),
        v = n(32),
        y = n(26),
        b = n(13),
        w = n(46),
        x = n(4),
        S = n(10),
        E = n(76),
        M = n(33),
        _ = n(35),
        A = n(34).f,
        k = n(78),
        I = n(29),
        T = n(5),
        O = n(22),
        C = n(49),
        P = n(47),
        B = n(80),
        F = n(40),
        N = n(52),
        R = n(41),
        L = n(79),
        D = n(106),
        j = n(9),
        U = n(20),
        z = j.f,
        V = U.f,
        H = r.RangeError,
        W = r.TypeError,
        q = r.Uint8Array,
        G = "ArrayBuffer",
        Y = "Shared" + G,
        K = "BYTES_PER_ELEMENT",
        X = "prototype",
        J = Array[X],
        $ = u.ArrayBuffer,
        Q = u.DataView,
        Z = O(0),
        tt = O(2),
        et = O(3),
        nt = O(4),
        it = O(5),
        rt = O(6),
        ot = C(!0),
        st = C(!1),
        at = B.values,
        ut = B.keys,
        ct = B.entries,
        lt = J.lastIndexOf,
        ht = J.reduce,
        ft = J.reduceRight,
        dt = J.join,
        pt = J.sort,
        mt = J.slice,
        gt = J.toString,
        vt = J.toLocaleString,
        yt = T("iterator"),
        bt = T("toStringTag"),
        wt = I("typed_constructor"),
        xt = I("def_constructor"),
        St = a.CONSTR,
        Et = a.TYPED,
        Mt = a.VIEW,
        _t = "Wrong length!",
        At = O(1, function (t, e) {
      return Ct(P(t, t[xt]), e);
    }),
        kt = o(function () {
      return 1 === new q(new Uint16Array([1]).buffer)[0];
    }),
        It = !!q && !!q[X].set && o(function () {
      new q(1).set({});
    }),
        Tt = function Tt(t, e) {
      var n = p(t);if (0 > n || n % e) throw H("Wrong offset!");return n;
    },
        Ot = function Ot(t) {
      if (x(t) && Et in t) return t;throw W(t + " is not a typed array!");
    },
        Ct = function Ct(t, e) {
      if (!x(t) || !(wt in t)) throw W("It is not a typed array constructor!");return new t(e);
    },
        Pt = function Pt(t, e) {
      return Bt(P(t, t[xt]), e);
    },
        Bt = function Bt(t, e) {
      for (var n = 0, i = e.length, r = Ct(t, i); i > n;) {
        r[n] = e[n++];
      }return r;
    },
        Ft = function Ft(t, e, n) {
      z(t, e, { get: function get() {
          return this._d[n];
        } });
    },
        Nt = function Nt(t) {
      var e,
          n,
          i,
          r,
          o,
          s,
          a = S(t),
          u = arguments.length,
          l = 1 < u ? arguments[1] : void 0,
          h = void 0 !== l,
          f = k(a);if (null != f && !E(f)) {
        for (s = f.call(a), i = [], e = 0; !(o = s.next()).done; e++) {
          i.push(o.value);
        }a = i;
      }for (h && 2 < u && (l = c(l, arguments[2], 2)), e = 0, n = m(a.length), r = Ct(this, n); n > e; e++) {
        r[e] = h ? l(a[e], e) : a[e];
      }return r;
    },
        Rt = function Rt() {
      for (var t = 0, e = arguments.length, n = Ct(this, e); e > t;) {
        n[t] = arguments[t++];
      }return n;
    },
        Lt = !!q && o(function () {
      vt.call(new q(1));
    }),
        Dt = function Dt() {
      return vt.apply(Lt ? mt.call(Ot(this)) : Ot(this), arguments);
    },
        jt = { copyWithin: function copyWithin(t, e) {
        return D.call(Ot(this), t, e, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(t) {
        return nt(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return L.apply(Ot(this), arguments);
      }, filter: function filter(t) {
        return Pt(this, tt(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0));
      }, find: function find(t) {
        return it(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, findIndex: function findIndex(t) {
        return rt(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, forEach: function forEach(t) {
        Z(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, indexOf: function indexOf(t) {
        return st(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, includes: function includes(t) {
        return ot(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, join: function join() {
        return dt.apply(Ot(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return lt.apply(Ot(this), arguments);
      }, map: function map(t) {
        return At(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return ht.apply(Ot(this), arguments);
      }, reduceRight: function reduceRight() {
        return ft.apply(Ot(this), arguments);
      }, reverse: function reverse() {
        for (var t, e = this, n = Ot(e).length, i = Math.floor(n / 2), r = 0; r < i;) {
          t = e[r], e[r++] = e[--n], e[n] = t;
        }return e;
      }, some: function some(t) {
        return et(Ot(this), t, 1 < arguments.length ? arguments[1] : void 0);
      }, sort: function sort(t) {
        return pt.call(Ot(this), t);
      }, subarray: function subarray(t, e) {
        var n = Ot(this),
            i = n.length,
            r = v(t, i);return new (P(n, n[xt]))(n.buffer, n.byteOffset + r * n.BYTES_PER_ELEMENT, m((void 0 === e ? i : v(e, i)) - r));
      } },
        Ut = function Ut(t, e) {
      return Pt(this, mt.call(Ot(this), t, e));
    },
        zt = function zt(t) {
      Ot(this);var e = Tt(arguments[1], 1),
          n = this.length,
          i = S(t),
          r = m(i.length),
          o = 0;if (r + e > n) throw H(_t);for (; o < r;) {
        this[e + o] = i[o++];
      }
    },
        Vt = { entries: function entries() {
        return ct.call(Ot(this));
      }, keys: function keys() {
        return ut.call(Ot(this));
      }, values: function values() {
        return at.call(Ot(this));
      } },
        Ht = function Ht(t, e) {
      return x(t) && t[Et] && "symbol" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && e in t && +e + "" == e + "";
    },
        Wt = function Wt(t, e) {
      return Ht(t, e = y(e, !0)) ? h(2, t[e]) : V(t, e);
    },
        qt = function qt(t, e, n) {
      return !(Ht(t, e = y(e, !0)) && x(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? z(t, e, n) : (t[e] = n.value, t);
    };St || (U.f = Wt, j.f = qt), s(s.S + s.F * !St, "Object", { getOwnPropertyDescriptor: Wt, defineProperty: qt }), o(function () {
      gt.call({});
    }) && (gt = vt = function vt() {
      return dt.call(this);
    });var Gt = d({}, jt);d(Gt, Vt), f(Gt, yt, Vt.values), d(Gt, { slice: Ut, set: zt, constructor: function constructor() {}, toString: gt, toLocaleString: Dt }), Ft(Gt, "buffer", "b"), Ft(Gt, "byteOffset", "o"), Ft(Gt, "byteLength", "l"), Ft(Gt, "length", "e"), z(Gt, bt, { get: function get() {
        return this[Et];
      } }), t.exports = function (t, e, n, u) {
      var c = t + ((u = !!u) ? "Clamped" : "") + "Array",
          h = r[c],
          d = h || {},
          p = h && _(h),
          v = !h || !a.ABV,
          y = {},
          b = h && h[X],
          S = function S(n, i) {
        var r = n._d;return r.v["get" + t](i * e + r.o, kt);
      },
          E = function E(n, i, r) {
        var o = n._d;u && (r = 0 > (r = Math.round(r)) ? 0 : 255 < r ? 255 : 255 & r), o.v["set" + t](i * e + o.o, r, kt);
      },
          k = function k(t, e) {
        z(t, e, { get: function get() {
            return S(this, e);
          }, set: function set(t) {
            return E(this, e, t);
          }, enumerable: !0 });
      };v ? (h = n(function (t, n, i, r) {
        l(t, h, c, "_d");var o,
            s,
            a,
            u,
            d = 0,
            p = 0;if (x(n)) {
          if (!(n instanceof $ || (u = w(n)) == G || u == Y)) return Et in n ? Bt(h, n) : Nt.call(h, n);o = n, p = Tt(i, e);var v = n.byteLength;if (void 0 === r) {
            if (v % e) throw H(_t);if (0 > (s = v - p)) throw H(_t);
          } else if ((s = m(r) * e) + p > v) throw H(_t);a = s / e;
        } else a = g(n), o = new $(s = a * e);for (f(t, "_d", { b: o, o: p, l: s, e: a, v: new Q(o) }); d < a;) {
          k(t, d++);
        }
      }), b = h[X] = M(Gt), f(b, "constructor", h)) : (!o(function () {
        h(1);
      }) || !o(function () {
        new h(-1);
      }) || !N(function (t) {
        new h(), new h(null), new h(1.5), new h(t);
      }, !0)) && (h = n(function (t, n, i, r) {
        var o;return l(t, h, c), x(n) ? n instanceof $ || (o = w(n)) == G || o == Y ? void 0 === r ? void 0 === i ? new d(n) : new d(n, Tt(i, e)) : new d(n, Tt(i, e), r) : Et in n ? Bt(h, n) : Nt.call(h, n) : new d(g(n));
      }), Z(p === Function.prototype ? A(d) : A(d).concat(A(p)), function (t) {
        t in h || f(h, t, d[t]);
      }), h[X] = b, !i && (b.constructor = h));var I = b[yt],
          T = !!I && ("values" == I.name || null == I.name),
          O = Vt.values;f(h, wt, !0), f(b, Et, c), f(b, Mt, !0), f(b, xt, h), (u ? new h(1)[bt] != c : !(bt in b)) && z(b, bt, { get: function get() {
          return c;
        } }), y[c] = h, s(s.G + s.W + s.F * (h != d), y), s(s.S, c, { BYTES_PER_ELEMENT: e }), s(s.S + s.F * o(function () {
        d.of.call(h, 1);
      }), c, { from: Nt, of: Rt }), K in b || f(b, K, e), s(s.P, c, jt), R(c), s(s.P + s.F * It, c, { set: zt }), s(s.P + s.F * !T, c, Vt), i || b.toString == gt || (b.toString = gt), s(s.P + s.F * o(function () {
        new h(1).slice();
      }), c, { slice: Ut }), s(s.P + s.F * (o(function () {
        return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
      }) || !o(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: Dt }), F[c] = T ? I : O, i || T || f(b, yt, O);
    };
  } else t.exports = function () {};
}, function (t, e, n) {
  var i = n(4);t.exports = function (t, e) {
    if (!i(t)) return t;var n, r;if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t))) return r;if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;throw TypeError("Can't convert object to primitive value");
  };
}, function (t, e, n) {
  var i = n(29)("meta"),
      r = n(4),
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
    s(t, i, { value: { i: "O" + ++a, w: {} } });
  },
      h = t.exports = { KEY: i, NEED: !1, fastKey: function fastKey(t, e) {
      if (!r(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!o(t, i)) {
        if (!u(t)) return "F";if (!e) return "E";l(t);
      }return t[i].i;
    }, getWeak: function getWeak(t, e) {
      if (!o(t, i)) {
        if (!u(t)) return !0;if (!e) return !1;l(t);
      }return t[i].w;
    }, onFreeze: function onFreeze(t) {
      return c && h.NEED && u(t) && !o(t, i) && l(t), t;
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
  var i = n(90),
      r = n(63);t.exports = Object.keys || function (t) {
    return i(t, r);
  };
}, function (t, e, n) {
  var i = n(19),
      r = Math.max,
      o = Math.min;t.exports = function (t, e) {
    return 0 > (t = i(t)) ? r(t + e, 0) : o(t, e);
  };
}, function (t, e, n) {
  var i = n(3),
      r = n(91),
      o = n(63),
      s = n(62)("IE_PROTO"),
      a = function a() {},
      u = "prototype",
      _c = function c() {
    var t,
        e = n(60)("iframe"),
        i = o.length;for (e.style.display = "none", n(64).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _c = t.F; i--;) {
      delete _c[u][o[i]];
    }return _c();
  };t.exports = Object.create || function (t, e) {
    var n;return null === t ? n = _c() : (a[u] = i(t), n = new a(), a[u] = null, n[s] = t), void 0 === e ? n : r(n, e);
  };
}, function (t, e, n) {
  var i = n(90),
      r = n(63).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {
    return i(t, r);
  };
}, function (t, e, n) {
  var i = n(13),
      r = n(10),
      o = n(62)("IE_PROTO"),
      s = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
    return t = r(t), i(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null;
  };
}, function (t, e, n) {
  var i = n(5)("unscopables"),
      r = Array.prototype;null == r[i] && n(14)(r, i, {}), t.exports = function (t) {
    r[i][t] = !0;
  };
}, function (t, e, n) {
  var i = n(4);t.exports = function (t, e) {
    if (!i(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");return t;
  };
}, function (t, e, n) {
  var i = n(9).f,
      r = n(13),
      o = n(5)("toStringTag");t.exports = function (t, e, n) {
    t && !r(t = n ? t : t.prototype, o) && i(t, o, { configurable: !0, value: e });
  };
}, function (t, e, n) {
  var i = n(0),
      r = n(24),
      o = n(2),
      s = n(66),
      a = "[" + s + "]",
      u = RegExp("^" + a + a + "*"),
      c = RegExp(a + a + "*$"),
      l = function l(t, e, n) {
    var r = {},
        a = o(function () {
      return !!s[t]() || "​" != "​"[t]();
    }),
        u = r[t] = a ? e(h) : s[t];n && (r[n] = u), i(i.P + i.F * a, "String", r);
  },
      h = l.trim = function (t, e) {
    return t = r(t) + "", 1 & e && (t = t.replace(u, "")), 2 & e && (t = t.replace(c, "")), t;
  };t.exports = l;
}, function (t) {
  t.exports = {};
}, function (t, e, n) {
  "use strict";
  var i = n(1),
      r = n(9),
      o = n(8),
      s = n(5)("species");t.exports = function (t) {
    var e = i[t];o && e && !e[s] && r.f(e, s, { configurable: !0, get: function get() {
        return this;
      } });
  };
}, function (t) {
  t.exports = function (t, e, n, i) {
    if (!(t instanceof e) || void 0 !== i && i in t) throw TypeError(n + ": incorrect invocation!");return t;
  };
}, function (t, e, n) {
  var i = n(11);t.exports = function (t, e, n) {
    for (var r in e) {
      i(t, r, e[r], n);
    }return t;
  };
}, function (t, e, n) {
  var i = n(23);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
    return "String" == i(t) ? t.split("") : Object(t);
  };
}, function (t, e) {
  e.f = {}.propertyIsEnumerable;
}, function (t, e, n) {
  var i = n(23),
      r = n(5)("toStringTag"),
      o = "Arguments" == i(function () {
    return arguments;
  }());t.exports = function (t) {
    var e, n, s;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
      try {
        return t[e];
      } catch (e) {}
    }(e = Object(t), r)) ? n : o ? i(e) : "Object" == (s = i(e)) && "function" == typeof e.callee ? "Arguments" : s;
  };
}, function (t, e, n) {
  var i = n(3),
      r = n(18),
      o = n(5)("species");t.exports = function (t, e) {
    var n,
        s = i(t).constructor;return void 0 === s || null == (n = i(s)[o]) ? e : r(n);
  };
}, function (t, e, n) {
  var i = n(7),
      r = n(1),
      o = "__core-js_shared__",
      s = r[o] || (r[o] = {});(t.exports = function (t, e) {
    return s[t] || (s[t] = void 0 === e ? {} : e);
  })("versions", []).push({ version: i.version, mode: n(30) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
}, function (t, e, n) {
  var i = n(15),
      r = n(6),
      o = n(32);t.exports = function (t) {
    return function (e, n, s) {
      var a,
          u = i(e),
          c = r(u.length),
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
  var i = n(23);t.exports = Array.isArray || function (t) {
    return "Array" == i(t);
  };
}, function (t, e, n) {
  var i = n(5)("iterator"),
      r = !1;try {
    var o = [7][i]();o.return = function () {
      r = !0;
    }, Array.from(o, function () {
      throw 2;
    });
  } catch (e) {}t.exports = function (t, e) {
    if (!e && !r) return !1;var n = !1;try {
      var o = [7],
          s = o[i]();s.next = function () {
        return { done: n = !0 };
      }, o[i] = function () {
        return s;
      }, t(o);
    } catch (e) {}return n;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(3);t.exports = function () {
    var t = i(this),
        e = "";return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(46),
      r = RegExp.prototype.exec;t.exports = function (t, e) {
    var n = t.exec;if ("function" == typeof n) {
      var o = n.call(t, e);if ("object" != (typeof o === "undefined" ? "undefined" : _typeof(o))) throw new TypeError("RegExp exec method returned something other than an Object or null");return o;
    }if ("RegExp" !== i(t)) throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t, e);
  };
}, function (t, e, n) {
  "use strict";
  n(108);var i = n(11),
      r = n(14),
      o = n(2),
      s = n(24),
      a = n(5),
      u = n(81),
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
      var m = /./[f],
          g = n(s, f, ""[t], function (t, e, n, i, r) {
        return e.exec === u ? d && !r ? { done: !0, value: m.call(e, n, i) } : { done: !0, value: t.call(n, e, i) } : { done: !1 };
      }),
          v = g[0],
          y = g[1];i(String.prototype, t, v), r(RegExp.prototype, f, 2 == e ? function (t, e) {
        return y.call(t, this, e);
      } : function (t) {
        return y.call(t, this);
      });
    }
  };
}, function (t, e, n) {
  var i = n(17),
      r = n(103),
      o = n(76),
      s = n(3),
      a = n(6),
      u = n(78),
      c = {},
      l = {};(e = t.exports = function (t, e, n, h, f) {
    var d,
        p,
        m,
        g,
        v = f ? function () {
      return t;
    } : u(t),
        y = i(n, h, e ? 2 : 1),
        b = 0;if ("function" != typeof v) throw TypeError(t + " is not iterable!");if (o(v)) {
      for (d = a(t.length); d > b; b++) {
        if ((g = e ? y(s(p = t[b])[0], p[1]) : y(t[b])) === c || g === l) return g;
      }
    } else for (m = v.call(t); !(p = m.next()).done;) {
      if ((g = r(m, y, p.value, e)) === c || g === l) return g;
    }
  }).BREAK = c, e.RETURN = l;
}, function (t, e, n) {
  var i = n(1).navigator;t.exports = i && i.userAgent || "";
}, function (t, e, n) {
  "use strict";
  var i = n(1),
      r = n(0),
      o = n(11),
      s = n(43),
      a = n(27),
      u = n(56),
      c = n(42),
      l = n(4),
      h = n(2),
      f = n(52),
      d = n(38),
      p = n(67);t.exports = function (t, e, n, m, g, v) {
    var y = i[t],
        b = y,
        w = g ? "set" : "add",
        x = b && b.prototype,
        S = {},
        E = function E(t) {
      var e = x[t];o(x, t, "delete" == t || "has" == t ? function (t) {
        return (!v || l(t)) && e.call(this, 0 === t ? 0 : t);
      } : "get" == t ? function (t) {
        return v && !l(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
      } : "add" == t ? function (t) {
        return e.call(this, 0 === t ? 0 : t), this;
      } : function (t, n) {
        return e.call(this, 0 === t ? 0 : t, n), this;
      });
    };if ("function" == typeof b && (v || x.forEach && !h(function () {
      new b().entries().next();
    }))) {
      var M = new b(),
          _ = M[w](v ? {} : -0, 1) != M,
          A = h(function () {
        M.has(1);
      }),
          k = f(function (t) {
        new b(t);
      }),
          I = !v && h(function () {
        for (var t = new b(), e = 5; e--;) {
          t[w](e, e);
        }return !t.has(-0);
      });k || ((b = e(function (e, n) {
        c(e, b, t);var i = p(new y(), e, b);return null != n && u(n, g, i[w], i), i;
      })).prototype = x, x.constructor = b), (A || I) && (E("delete"), E("has"), g && E("get")), (I || _) && E(w), v && x.clear && delete x.clear;
    } else b = m.getConstructor(e, t, g, w), s(b.prototype, n), a.NEED = !0;return d(b, t), S[t] = b, r(r.G + r.W + r.F * (b != y), S), v || m.setStrong(b, t, g), b;
  };
}, function (t, e, n) {
  for (var i, r = n(1), o = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!r.ArrayBuffer || !r.DataView), l = c, h = 0, f = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; h < 9;) {
    (i = r[f[h++]]) ? (o(i.prototype, a, !0), o(i.prototype, u, !0)) : l = !1;
  }t.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
}, function (t, e, n) {
  var i = n(4),
      r = n(1).document,
      o = i(r) && i(r.createElement);t.exports = function (t) {
    return o ? r.createElement(t) : {};
  };
}, function (t, e, n) {
  e.f = n(5);
}, function (t, e, n) {
  var i = n(48)("keys"),
      r = n(29);t.exports = function (t) {
    return i[t] || (i[t] = r(t));
  };
}, function (t) {
  t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, function (t, e, n) {
  var i = n(1).document;t.exports = i && i.documentElement;
}, function (t, e, n) {
  var i = n(4),
      r = n(3),
      o = function o(t, e) {
    if (r(t), !i(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
  };t.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, i) {
      try {
        (i = n(17)(Function.call, n(20).f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
      } catch (t) {
        e = !0;
      }return function (t, n) {
        return o(t, n), e ? _defaults(t, n) : i(t, n), t;
      };
    }({}, !1) : void 0), check: o };
}, function (t) {
  t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
}, function (t, e, n) {
  var i = n(4),
      r = n(65).set;t.exports = function (t, e, n) {
    var o,
        s = e.constructor;return s !== n && "function" == typeof s && (o = s.prototype) !== n.prototype && i(o) && r && r(t, o), t;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(19),
      r = n(24);t.exports = function (t) {
    var e = r(this) + "",
        n = "",
        o = i(t);if (0 > o || o == 1 / 0) throw RangeError("Count can't be negative");for (; 0 < o; (o >>>= 1) && (e += e)) {
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
  var i = n(19),
      r = n(24);t.exports = function (t) {
    return function (e, n) {
      var o,
          s,
          a = r(e) + "",
          u = i(n),
          c = a.length;return 0 > u || u >= c ? t ? "" : void 0 : 55296 > (o = a.charCodeAt(u)) || 56319 < o || u + 1 === c || 56320 > (s = a.charCodeAt(u + 1)) || 57343 < s ? t ? a.charAt(u) : o : t ? a.slice(u, u + 2) : s - 56320 + (o - 55296 << 10) + 65536;
    };
  };
}, function (t, e, n) {
  "use strict";
  var i = n(30),
      r = n(0),
      o = n(11),
      s = n(14),
      a = n(40),
      u = n(102),
      c = n(38),
      l = n(35),
      h = n(5)("iterator"),
      f = !([].keys && "next" in [].keys()),
      d = "keys",
      p = "values",
      m = function m() {
    return this;
  };t.exports = function (t, e, n, g, v, y, b) {
    u(n, e, g);var w,
        x,
        S,
        E = function E(t) {
      return !f && t in k ? k[t] : function () {
        return new n(this, t);
      };
    },
        M = e + " Iterator",
        _ = v == p,
        A = !1,
        k = t.prototype,
        I = k[h] || k["@@iterator"] || v && k[v],
        T = I || E(v),
        O = v ? _ ? E("entries") : T : void 0,
        C = "Array" == e && k.entries || I;if (C && (S = l(C.call(new t()))) !== Object.prototype && S.next && (c(S, M, !0), !i && "function" != typeof S[h] && s(S, h, m)), _ && I && I.name !== p && (A = !0, T = function T() {
      return I.call(this);
    }), (!i || b) && (f || A || !k[h]) && s(k, h, T), a[e] = T, a[M] = m, v) if (w = { values: _ ? T : E(p), keys: y ? T : E(d), entries: O }, b) for (x in w) {
      x in k || o(k, x, w[x]);
    } else r(r.P + r.F * (f || A), e, w);return w;
  };
}, function (t, e, n) {
  var i = n(74),
      r = n(24);t.exports = function (t, e, n) {
    if (i(e)) throw TypeError("String#" + n + " doesn't accept regex!");return r(t) + "";
  };
}, function (t, e, n) {
  var i = n(4),
      r = n(23),
      o = n(5)("match");t.exports = function (t) {
    var e;return i(t) && (void 0 === (e = t[o]) ? "RegExp" == r(t) : !!e);
  };
}, function (t, e, n) {
  var i = n(5)("match");t.exports = function (t) {
    var e = /./;try {
      "/./"[t](e);
    } catch (n) {
      try {
        return e[i] = !1, !"/./"[t](e);
      } catch (t) {}
    }return !0;
  };
}, function (t, e, n) {
  var i = n(40),
      r = n(5)("iterator"),
      o = Array.prototype;t.exports = function (t) {
    return void 0 !== t && (i.Array === t || o[r] === t);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(9),
      r = n(28);t.exports = function (t, e, n) {
    e in t ? i.f(t, e, r(0, n)) : t[e] = n;
  };
}, function (t, e, n) {
  var i = n(46),
      r = n(5)("iterator"),
      o = n(40);t.exports = n(7).getIteratorMethod = function (t) {
    if (null != t) return t[r] || t["@@iterator"] || o[i(t)];
  };
}, function (t, e, n) {
  "use strict";
  var i = n(10),
      r = n(32),
      o = n(6);t.exports = function (t) {
    for (var e = i(this), n = o(e.length), s = arguments.length, a = r(1 < s ? arguments[1] : void 0, n), u = 2 < s ? arguments[2] : void 0, c = void 0 === u ? n : r(u, n); c > a;) {
      e[a++] = t;
    }return e;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(36),
      r = n(107),
      o = n(40),
      s = n(15);t.exports = n(72)(Array, "Array", function (t, e) {
    this._t = s(t), this._i = 0, this._k = e;
  }, function () {
    var t = this._t,
        e = this._k,
        n = this._i++;return !t || n >= t.length ? (this._t = void 0, r(1)) : r(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
  }, "values"), o.Arguments = o.Array, i("keys"), i("values"), i("entries");
}, function (t, e, n) {
  "use strict";
  var i = n(53),
      r = RegExp.prototype.exec,
      o = String.prototype.replace,
      s = r,
      a = "lastIndex",
      u = function () {
    var t = /a/,
        e = /b*/g;return r.call(t, "a"), r.call(e, "a"), 0 !== t[a] || 0 !== e[a];
  }(),
      c = void 0 !== /()??/.exec("")[1];(u || c) && (s = function s(t) {
    var e,
        n,
        s,
        l,
        h = this;return c && (n = new RegExp("^" + h.source + "$(?!\\s)", i.call(h))), u && (e = h[a]), s = r.call(h, t), u && s && (h[a] = h.global ? s.index + s[0].length : e), c && s && 1 < s.length && o.call(s[0], n, function () {
      for (l = 1; l < arguments.length - 2; l++) {
        void 0 === arguments[l] && (s[l] = void 0);
      }
    }), s;
  }), t.exports = s;
}, function (t, e, n) {
  "use strict";
  var i = n(71)(!0);t.exports = function (t, e, n) {
    return e + (n ? i(t, e).length : 1);
  };
}, function (t, e, n) {
  var i,
      r,
      o,
      s = n(17),
      a = n(96),
      u = n(64),
      c = n(60),
      l = n(1),
      h = l.process,
      f = l.setImmediate,
      d = l.clearImmediate,
      p = l.MessageChannel,
      m = l.Dispatch,
      g = 0,
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
    }return v[++g] = function () {
      a("function" == typeof t ? t : Function(t), e);
    }, i(g), g;
  }, d = function d(t) {
    delete v[t];
  }, "process" == n(23)(h) ? i = function i(t) {
    h.nextTick(s(b, t, 1));
  } : m && m.now ? i = function i(t) {
    m.now(s(b, t, 1));
  } : p ? (o = (r = new p()).port2, r.port1.onmessage = w, i = s(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (i = function i(t) {
    l.postMessage(t + "", "*");
  }, l.addEventListener("message", w, !1)) : i = y in c("script") ? function (t) {
    u.appendChild(c("script"))[y] = function () {
      u.removeChild(this), b.call(t);
    };
  } : function (t) {
    setTimeout(s(b, t, 1), 0);
  }), t.exports = { set: f, clear: d };
}, function (t, e, n) {
  "use strict";
  function i(t, e, n) {
    var i,
        r,
        o,
        s = Array(n),
        a = 8 * n - e - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        l = 23 === e ? U(2, -24) - U(2, -77) : 0,
        h = 0,
        f = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for ((t = j(t)) != t || t === L ? (r = t == t ? 0 : 1, i = u) : (i = z(V(t) / H), 1 > t * (o = U(2, -i)) && (i--, o *= 2), 2 <= (t += 1 <= i + c ? l / o : l * U(2, 1 - c)) * o && (i++, o /= 2), i + c >= u ? (r = 0, i = u) : 1 <= i + c ? (r = (t * o - 1) * U(2, e), i += c) : (r = t * U(2, c - 1) * U(2, e), i = 0)); 8 <= e; s[h++] = 255 & r, r /= 256, e -= 8) {}for (i = i << e | r, a += e; 0 < a; s[h++] = 255 & i, i /= 256, a -= 8) {}return s[--h] |= 128 * f, s;
  }function r(t, e, n) {
    var i,
        r = 8 * n - e - 1,
        o = (1 << r) - 1,
        s = o >> 1,
        a = r - 7,
        u = n - 1,
        c = t[u--],
        l = 127 & c;for (c >>= 7; 0 < a; l = 256 * l + t[u], u--, a -= 8) {}for (i = l & (1 << -a) - 1, l >>= -a, a += e; 0 < a; i = 256 * i + t[u], u--, a -= 8) {}if (0 === l) l = 1 - s;else {
      if (l === o) return i ? NaN : c ? -L : L;i += U(2, e), l -= s;
    }return (c ? -1 : 1) * i * U(2, l - e);
  }function o(t) {
    return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
  }function s(t) {
    return [255 & t];
  }function a(t) {
    return [255 & t, 255 & t >> 8];
  }function u(t) {
    return [255 & t, 255 & t >> 8, 255 & t >> 16, 255 & t >> 24];
  }function c(t) {
    return i(t, 52, 8);
  }function l(t) {
    return i(t, 23, 4);
  }function h(t, e, n) {
    A(t[C], e, { get: function get() {
        return this[n];
      } });
  }function f(t, e, n, i) {
    var r = M(+n);if (r + e > t[K]) throw R(P);var o = t[Y]._b,
        s = r + t[X],
        a = o.slice(s, s + e);return i ? a : a.reverse();
  }function d(t, e, n, i, r, o) {
    var s = M(+n);if (s + e > t[K]) throw R(P);for (var a = t[Y]._b, u = s + t[X], c = i(+r), l = 0; l < e; l++) {
      a[u + l] = c[o ? l : e - l - 1];
    }
  }var p = n(1),
      m = n(8),
      g = n(30),
      v = n(59),
      y = n(14),
      b = n(43),
      w = n(2),
      x = n(42),
      S = n(19),
      E = n(6),
      M = n(115),
      _ = n(34).f,
      A = n(9).f,
      k = n(79),
      I = n(38),
      T = "ArrayBuffer",
      O = "DataView",
      C = "prototype",
      P = "Wrong index!",
      _B2 = p[T],
      _F = p[O],
      N = p.Math,
      R = p.RangeError,
      L = p.Infinity,
      D = _B2,
      j = N.abs,
      U = N.pow,
      z = N.floor,
      V = N.log,
      H = N.LN2,
      W = "buffer",
      q = "byteLength",
      G = "byteOffset",
      Y = m ? "_b" : W,
      K = m ? "_l" : q,
      X = m ? "_o" : G;if (v.ABV) {
    if (!w(function () {
      _B2(1);
    }) || !w(function () {
      new _B2(-1);
    }) || w(function () {
      return new _B2(), new _B2(1.5), new _B2(NaN), _B2.name != T;
    })) {
      for (var J, $ = (_B2 = function B(t) {
        return x(this, _B2), new D(M(t));
      })[C] = D[C], Q = _(D), Z = 0; Q.length > Z;) {
        (J = Q[Z++]) in _B2 || y(_B2, J, D[J]);
      }g || ($.constructor = _B2);
    }var tt = new _F(new _B2(2)),
        et = _F[C].setInt8;tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), (tt.getInt8(0) || !tt.getInt8(1)) && b(_F[C], { setInt8: function setInt8(t, e) {
        et.call(this, t, e << 24 >> 24);
      }, setUint8: function setUint8(t, e) {
        et.call(this, t, e << 24 >> 24);
      } }, !0);
  } else _B2 = function _B(t) {
    x(this, _B2, T);var e = M(t);this._b = k.call(Array(e), 0), this[K] = e;
  }, _F = function F(t, e, n) {
    x(this, _F, O), x(t, _B2, O);var i = t[K],
        r = S(e);if (0 > r || r > i) throw R("Wrong offset!");if (r + (n = void 0 === n ? i - r : E(n)) > i) throw R("Wrong length!");this[Y] = t, this[X] = r, this[K] = n;
  }, m && (h(_B2, q, "_l"), h(_F, W, "_b"), h(_F, q, "_l"), h(_F, G, "_o")), b(_F[C], { getInt8: function getInt8(t) {
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
      return r(f(this, 4, t, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(t) {
      return r(f(this, 8, t, arguments[1]), 52, 8);
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
    } });I(_B2, T), I(_F, O), y(_F[C], v.VIEW, !0), e[T] = _B2, e[O] = _F;
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
  var i = n(1),
      r = n(7),
      o = n(30),
      s = n(61),
      a = n(9).f;t.exports = function (t) {
    var e = r.Symbol || (r.Symbol = o ? {} : i.Symbol || {});"_" == t.charAt(0) || t in e || a(e, t, { value: s.f(t) });
  };
}, function (t, e, n) {
  var i = n(13),
      r = n(15),
      o = n(49)(!1),
      s = n(62)("IE_PROTO");t.exports = function (t, e) {
    var n,
        a = r(t),
        u = 0,
        c = [];for (n in a) {
      n != s && i(a, n) && c.push(n);
    }for (; e.length > u;) {
      i(a, n = e[u++]) && (~o(c, n) || c.push(n));
    }return c;
  };
}, function (t, e, n) {
  var i = n(9),
      r = n(3),
      o = n(31);t.exports = n(8) ? Object.defineProperties : function (t, e) {
    r(t);for (var n, s = o(e), a = s.length, u = 0; a > u;) {
      i.f(t, n = s[u++], e[n]);
    }return t;
  };
}, function (t, e, n) {
  var i = n(15),
      r = n(34).f,
      o = {}.toString,
      s = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];t.exports.f = function (t) {
    return s && "[object Window]" == o.call(t) ? function (t) {
      try {
        return r(t);
      } catch (t) {
        return s.slice();
      }
    }(t) : r(i(t));
  };
}, function (t, e, n) {
  "use strict";
  var i = n(8),
      r = n(31),
      o = n(50),
      s = n(45),
      a = n(10),
      u = n(44),
      c = Object.assign;t.exports = !c || n(2)(function () {
    var t = {},
        e = {},
        n = Symbol(),
        i = "abcdefghijklmnopqrst";return t[n] = 7, i.split("").forEach(function (t) {
      e[t] = t;
    }), 7 != c({}, t)[n] || Object.keys(c({}, e)).join("") != i;
  }) ? function (t) {
    for (var e = a(t), n = arguments.length, c = 1, l = o.f, h = s.f; n > c;) {
      for (var f, d = u(arguments[c++]), p = l ? r(d).concat(l(d)) : r(d), m = p.length, g = 0; m > g;) {
        f = p[g++], (!i || h.call(d, f)) && (e[f] = d[f]);
      }
    }return e;
  } : c;
}, function (t) {
  t.exports = Object.is || function (t, e) {
    return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(18),
      r = n(4),
      o = n(96),
      s = [].slice,
      a = {},
      u = function u(t, e, n) {
    if (!(e in a)) {
      for (var i = [], r = 0; r < e; r++) {
        i[r] = "a[" + r + "]";
      }a[e] = Function("F,a", "return new F(" + i.join(",") + ")");
    }return a[e](t, n);
  };t.exports = Function.bind || function (t) {
    var e = i(this),
        n = s.call(arguments, 1),
        a = function a() {
      var i = n.concat(s.call(arguments));return this instanceof a ? u(e, i.length, i) : o(e, i, t);
    };return r(e.prototype) && (a.prototype = e.prototype), a;
  };
}, function (t) {
  t.exports = function (t, e, n) {
    var i = void 0 === n;switch (e.length) {case 0:
        return i ? t() : t.call(n);case 1:
        return i ? t(e[0]) : t.call(n, e[0]);case 2:
        return i ? t(e[0], e[1]) : t.call(n, e[0], e[1]);case 3:
        return i ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);case 4:
        return i ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);}return t.apply(n, e);
  };
}, function (t, e, n) {
  var i = n(1).parseInt,
      r = n(39).trim,
      o = n(66),
      s = /^[-+]?0[xX]/;t.exports = 8 !== i(o + "08") || 22 !== i(o + "0x16") ? function (t, e) {
    var n = r(t + "", 3);return i(n, e >>> 0 || (s.test(n) ? 16 : 10));
  } : i;
}, function (t, e, n) {
  var i = n(1).parseFloat,
      r = n(39).trim;t.exports = 1 / i(n(66) + "-0") == -1 / 0 ? i : function (t) {
    var e = r(t + "", 3),
        n = i(e);return 0 === n && "-" == e.charAt(0) ? -0 : n;
  };
}, function (t, e, n) {
  var i = n(23);t.exports = function (t, e) {
    if ("number" != typeof t && "Number" != i(t)) throw TypeError(e);return +t;
  };
}, function (t, e, n) {
  var i = n(4),
      r = Math.floor;t.exports = function (t) {
    return !i(t) && isFinite(t) && r(t) === t;
  };
}, function (t) {
  t.exports = Math.log1p || function (t) {
    return -1e-8 < (t = +t) && 1e-8 > t ? t - t * t / 2 : Math.log(1 + t);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(33),
      r = n(28),
      o = n(38),
      s = {};n(14)(s, n(5)("iterator"), function () {
    return this;
  }), t.exports = function (t, e, n) {
    t.prototype = i(s, { next: r(1, n) }), o(t, e + " Iterator");
  };
}, function (t, e, n) {
  var i = n(3);t.exports = function (t, e, n, r) {
    try {
      return r ? e(i(n)[0], n[1]) : e(n);
    } catch (n) {
      var o = t.return;throw void 0 !== o && i(o.call(t)), n;
    }
  };
}, function (t, e, n) {
  var i = n(216);t.exports = function (t, e) {
    return new (i(t))(e);
  };
}, function (t, e, n) {
  var i = n(18),
      r = n(10),
      o = n(44),
      s = n(6);t.exports = function (t, e, n, a, u) {
    i(e);var c = r(t),
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
  var i = n(10),
      r = n(32),
      o = n(6);t.exports = [].copyWithin || function (t, e) {
    var n = i(this),
        s = o(n.length),
        a = r(t, s),
        u = r(e, s),
        c = 2 < arguments.length ? arguments[2] : void 0,
        l = Math.min((void 0 === c ? s : r(c, s)) - u, s - a),
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
  var i = n(81);n(0)({ target: "RegExp", proto: !0, forced: i !== /./.exec }, { exec: i });
}, function (t, e, n) {
  n(8) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", { configurable: !0, get: n(53) });
}, function (t, e, n) {
  "use strict";
  var i,
      r,
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
      m = n(56),
      g = n(47),
      v = n(83).set,
      y = n(236)(),
      b = n(111),
      w = n(237),
      x = n(57),
      S = n(112),
      E = "Promise",
      M = u.TypeError,
      _ = u.process,
      A = _ && _.versions,
      k = A && A.v8 || "",
      _I = u[E],
      T = "process" == l(_),
      O = function O() {},
      C = r = b.f,
      P = !!function () {
    try {
      var t = _I.resolve(1),
          e = (t.constructor = {})[n(5)("species")] = function (t) {
        t(O, O);
      };return (T || "function" == typeof PromiseRejectionEvent) && t.then(O) instanceof e && 0 !== k.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      B = function B(t) {
    var e;return !(!f(t) || "function" != typeof (e = t.then)) && e;
  },
      F = function F(t, e) {
    if (!t._n) {
      t._n = !0;var n = t._c;y(function () {
        for (var i = t._v, r = 1 == t._s, o = 0, s = function s(e) {
          var n,
              o,
              s,
              a = r ? e.ok : e.fail,
              u = e.resolve,
              c = e.reject,
              l = e.domain;try {
            a ? (!r && (2 == t._h && L(t), t._h = 1), !0 === a ? n = i : (l && l.enter(), n = a(i), l && (l.exit(), s = !0)), n === e.promise ? c(M("Promise-chain cycle")) : (o = B(n)) ? o.call(n, u, c) : u(n)) : c(i);
          } catch (e) {
            l && !s && l.exit(), c(e);
          }
        }; n.length > o;) {
          s(n[o++]);
        }t._c = [], t._n = !1, e && !t._h && N(t);
      });
    }
  },
      N = function N(t) {
    v.call(u, function () {
      var e,
          n,
          i,
          r = t._v,
          o = R(t);if (o && (e = w(function () {
        T ? _.emit("unhandledRejection", r, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: r }) : (i = u.console) && i.error && i.error("Unhandled promise rejection", r);
      }), t._h = T || R(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;
    });
  },
      R = function R(t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      L = function L(t) {
    v.call(u, function () {
      var e;T ? _.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      D = function D(t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, !e._a && (e._a = e._c.slice()), F(e, !0));
  },
      j = function j(t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw M("Promise can't be resolved itself");(e = B(t)) ? y(function () {
          var i = { _w: n, _d: !1 };try {
            e.call(t, c(j, i, 1), c(D, i, 1));
          } catch (t) {
            D.call(i, t);
          }
        }) : (n._v = t, n._s = 1, F(n, !1));
      } catch (e) {
        D.call({ _w: n, _d: !1 }, e);
      }
    }
  };P || (_I = function I(t) {
    p(this, _I, E, "_h"), d(t), i.call(this);try {
      t(c(j, this, 1), c(D, this, 1));
    } catch (t) {
      D.call(this, t);
    }
  }, (i = function i() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_I.prototype, { then: function then(t, e) {
      var n = C(g(this, _I));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = T ? _.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && F(this, !1), n.promise;
    }, catch: function _catch(t) {
      return this.then(void 0, t);
    } }), o = function o() {
    var t = new i();this.promise = t, this.resolve = c(j, t, 1), this.reject = c(D, t, 1);
  }, b.f = C = function C(t) {
    return t === _I || t === s ? new o(t) : r(t);
  }), h(h.G + h.W + h.F * !P, { Promise: _I }), n(38)(_I, E), n(41)(E), s = n(7)[E], h(h.S + h.F * !P, E, { reject: function reject(t) {
      var e = C(this);return (0, e.reject)(t), e.promise;
    } }), h(h.S + h.F * (a || !P), E, { resolve: function resolve(t) {
      return S(a && this === s ? _I : this, t);
    } }), h(h.S + h.F * !(P && n(52)(function (t) {
    _I.all(t).catch(O);
  })), E, { all: function all(t) {
      var e = this,
          n = C(e),
          i = n.resolve,
          r = n.reject,
          o = w(function () {
        var n = [],
            o = 0,
            s = 1;m(t, !1, function (t) {
          var a = o++,
              u = !1;n.push(void 0), s++, e.resolve(t).then(function (t) {
            u || (u = !0, n[a] = t, --s || i(n));
          }, r);
        }), --s || i(n);
      });return o.e && r(o.v), n.promise;
    }, race: function race(t) {
      var e = this,
          n = C(e),
          i = n.reject,
          r = w(function () {
        m(t, !1, function (t) {
          e.resolve(t).then(n.resolve, i);
        });
      });return r.e && i(r.v), n.promise;
    } });
}, function (t, e, n) {
  "use strict";
  function i(t) {
    var e, n;this.promise = new t(function (t, i) {
      if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");e = t, n = i;
    }), this.resolve = r(e), this.reject = r(n);
  }var r = n(18);t.exports.f = function (t) {
    return new i(t);
  };
}, function (t, e, n) {
  var i = n(3),
      r = n(4),
      o = n(111);t.exports = function (t, e) {
    if (i(t), r(e) && e.constructor === t) return e;var n = o.f(t);return (0, n.resolve)(e), n.promise;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(9).f,
      r = n(33),
      o = n(43),
      s = n(17),
      a = n(42),
      u = n(56),
      c = n(72),
      l = n(107),
      h = n(41),
      f = n(8),
      d = n(27).fastKey,
      p = n(37),
      m = f ? "_s" : "size",
      g = function g(t, e) {
    var n,
        i = d(e);if ("F" !== i) return t._i[i];for (n = t._f; n; n = n.n) {
      if (n.k == e) return n;
    }
  };t.exports = { getConstructor: function getConstructor(t, e, n, c) {
      var l = t(function (t, i) {
        a(t, l, e, "_i"), t._t = e, t._i = r(null), t._f = void 0, t._l = void 0, t[m] = 0, null != i && u(i, n, t[c], t);
      });return o(l.prototype, { clear: function clear() {
          for (var t = p(this, e), n = t._i, i = t._f; i; i = i.n) {
            i.r = !0, i.p && (i.p = i.p.n = void 0), delete n[i.i];
          }t._f = t._l = void 0, t[m] = 0;
        }, delete: function _delete(t) {
          var n = p(this, e),
              i = g(n, t);if (i) {
            var r = i.n,
                o = i.p;delete n._i[i.i], i.r = !0, o && (o.n = r), r && (r.p = o), n._f == i && (n._f = r), n._l == i && (n._l = o), n[m]--;
          }return !!i;
        }, forEach: function forEach(t) {
          p(this, e);for (var n, i = s(t, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (i(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        }, has: function has(t) {
          return !!g(p(this, e), t);
        } }), f && i(l.prototype, "size", { get: function get() {
          return p(this, e)[m];
        } }), l;
    }, def: function def(t, e, n) {
      var i,
          r,
          o = g(t, e);return o ? o.v = n : (t._l = o = { i: r = d(e, !0), k: e, v: n, p: i = t._l, n: void 0, r: !1 }, !t._f && (t._f = o), i && (i.n = o), t[m]++, "F" !== r && (t._i[r] = o)), t;
    }, getEntry: g, setStrong: function setStrong(t, e, n) {
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
  var i = n(43),
      r = n(27).getWeak,
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
      m = function m(t) {
    return t._l || (t._l = new g());
  },
      g = function g() {
    this.a = [];
  },
      v = function v(t, e) {
    return f(t.a, function (t) {
      return t[0] === e;
    });
  };g.prototype = { get: function get(t) {
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
      var c = t(function (t, i) {
        a(t, c, e, "_i"), t._t = e, t._i = p++, t._l = void 0, null != i && u(i, n, t[o], t);
      });return i(c.prototype, { delete: function _delete(t) {
          if (!s(t)) return !1;var n = r(t);return !0 === n ? m(h(this, e)).delete(t) : n && l(n, this._i) && delete n[this._i];
        }, has: function has(t) {
          if (!s(t)) return !1;var n = r(t);return !0 === n ? m(h(this, e)).has(t) : n && l(n, this._i);
        } }), c;
    }, def: function def(t, e, n) {
      var i = r(o(e), !0);return !0 === i ? m(t).set(e, n) : i[t._i] = n, t;
    }, ufstore: m };
}, function (t, e, n) {
  var i = n(19),
      r = n(6);t.exports = function (t) {
    if (void 0 === t) return 0;var e = i(t),
        n = r(e);if (e !== n) throw RangeError("Wrong length!");return n;
  };
}, function (t, e, n) {
  var i = n(34),
      r = n(50),
      o = n(3),
      s = n(1).Reflect;t.exports = s && s.ownKeys || function (t) {
    var e = i.f(o(t)),
        n = r.f;return n ? e.concat(n(t)) : e;
  };
}, function (t, e, n) {
  var i = n(6),
      r = n(68),
      o = n(24);t.exports = function (t, e, n, s) {
    var a = o(t) + "",
        u = a.length,
        c = void 0 === n ? " " : n + "",
        l = i(e);if (l <= u || "" == c) return a;var h = l - u,
        f = r.call(c, Math.ceil(h / c.length));return f.length > h && (f = f.slice(0, h)), s ? f + a : a + f;
  };
}, function (t, e, n) {
  var i = n(8),
      r = n(31),
      o = n(15),
      s = n(45).f;t.exports = function (t) {
    return function (e) {
      for (var n, a = o(e), u = r(a), c = u.length, l = 0, h = []; c > l;) {
        n = u[l++], (!i || s.call(a, n)) && h.push(t ? [n, a[n]] : a[n]);
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
    function i() {
      return o();
    }n.d(e, "a", function () {
      return i;
    });var r = function r(t, e, n, i) {
      var o = function o(e, r, _o) {
        return new i(function (t) {
          null !== _o && (_o = n.stringify(_o)), t(_o);
        }).then(function (n) {
          return t(r, { method: e, body: n });
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
          for (var _len = arguments.length, i = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            i[_key - 1] = arguments[_key];
          }

          return t.apply(undefined, [e(n)].concat(i));
        };
      },
          f = function f(t) {
        return function (r, o) {
          return i.resolve(new e(n.stringify({ address: r.slice(t.length), method: o.method, body: n.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var o = "http://" + t,
              s = o + "/api";return { createUser: function createUser(t) {
              return c(s, { devicetype: t });
            }, user: function user(d) {
              Cookies.set("hueid", d);var p = s + "/" + d,
                  m = p + "/capabilities",
                  g = p + "/config",
                  v = p + "/lights",
                  y = p + "/groups",
                  b = p + "/schedules",
                  w = p + "/scenes",
                  x = p + "/sensors",
                  S = p + "/rules",
                  E = p + "/resourcelinks",
                  M = function M(t) {
                return function (e) {
                  return t + "/" + e;
                };
              },
                  _ = M(v),
                  A = M(y),
                  k = M(b),
                  I = M(w),
                  T = M(x),
                  O = M(S),
                  C = M(E);return { getCapabilities: a.bind(null, m), deleteUser: h(l, function (t) {
                  return g + "/whitelist/" + t;
                }), getConfig: a.bind(null, g), setConfig: u.bind(null, g), getFullState: a.bind(null, p), getLights: a.bind(null, v), getNewLights: a.bind(null, v + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(v, t);
                }, getLight: h(a, _), setLight: h(u, _), setLightState: h(u, function (t) {
                  return _(t) + "/state";
                }), deleteLight: h(l, _), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: h(a, A), setGroup: h(u, A), setGroupState: h(u, function (t) {
                  return A(t) + "/action";
                }), deleteGroup: h(l, A), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: h(a, k), setSchedule: h(u, k), deleteSchedule: h(l, k), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return r(f(o), e, n, i).bridge(t).user(d);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: h(a, I), setScene: h(u, I), setSceneLightState: function setSceneLightState(t, e, n) {
                  return u(I(t) + "/lightstates/" + e, n);
                }, deleteScene: h(l, I), getSensors: a.bind(null, x), createSensor: c.bind(null, x), searchForNewSensors: c.bind(null, x, null), getNewSensors: a.bind(null, x + "/new"), getSensor: h(a, T), setSensor: h(u, T), setSensorConfig: h(u, function (t) {
                  return T(t) + "/config";
                }), setSensorState: h(u, function (t) {
                  return T(t) + "/state";
                }), deleteSensor: h(l, T), getRules: a.bind(null, S), createRule: c.bind(null, S), getRule: h(a, O), setRule: h(u, O), deleteRule: h(l, O), ruleActionGenerator: function ruleActionGenerator() {
                  return r(f(p), e, n, i).bridge(t).user(d);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: h(a, C), setResourceLink: h(u, C), deleteResourceLink: h(l, C) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = r.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = o));
  }).call(this, n(308)(t));
}, function (t, e, n) {
  "use strict";
  n(123);var i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(n(295));i.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), i.default._babelPolyfill = !0;
}, function (t, e, n) {
  "use strict";
  n(124), n(267), n(269), n(272), n(274), n(276), n(278), n(280), n(282), n(284), n(286), n(288), n(290), n(294);
}, function (t, e, n) {
  n(125), n(128), n(129), n(130), n(131), n(132), n(133), n(134), n(135), n(136), n(137), n(138), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(206), n(207), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(217), n(218), n(219), n(220), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(228), n(229), n(80), n(230), n(108), n(231), n(109), n(232), n(233), n(234), n(235), n(110), n(238), n(239), n(240), n(241), n(242), n(243), n(244), n(245), n(246), n(247), n(248), n(249), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), t.exports = n(7);
}, function (t, e, n) {
  "use strict";
  var i = n(1),
      r = n(13),
      o = n(8),
      s = n(0),
      a = n(11),
      u = n(27).KEY,
      c = n(2),
      l = n(48),
      h = n(38),
      f = n(29),
      d = n(5),
      p = n(61),
      m = n(89),
      g = n(127),
      v = n(51),
      y = n(3),
      b = n(4),
      w = n(10),
      x = n(15),
      S = n(26),
      E = n(28),
      M = n(33),
      _ = n(92),
      A = n(20),
      k = n(50),
      I = n(9),
      T = n(31),
      O = A.f,
      C = I.f,
      P = _.f,
      _B3 = i.Symbol,
      F = i.JSON,
      N = F && F.stringify,
      R = "prototype",
      L = d("_hidden"),
      D = d("toPrimitive"),
      j = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      z = l("symbols"),
      V = l("op-symbols"),
      H = Object[R],
      W = "function" == typeof _B3 && !!k.f,
      q = i.QObject,
      G = !q || !q[R] || !q[R].findChild,
      Y = o && c(function () {
    return 7 != M(C({}, "a", { get: function get() {
        return C(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var i = O(H, e);i && delete H[e], C(t, e, n), i && t !== H && C(H, e, i);
  } : C,
      K = function K(t) {
    var e = z[t] = M(_B3[R]);return e._k = t, e;
  },
      X = W && "symbol" == _typeof(_B3.iterator) ? function (t) {
    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  } : function (t) {
    return t instanceof _B3;
  },
      J = function J(t, e, n) {
    return t === H && J(V, e, n), y(t), e = S(e, !0), y(n), r(z, e) ? (n.enumerable ? (r(t, L) && t[L][e] && (t[L][e] = !1), n = M(n, { enumerable: E(0, !1) })) : (!r(t, L) && C(t, L, E(1, {})), t[L][e] = !0), Y(t, e, n)) : C(t, e, n);
  },
      $ = function $(t, e) {
    y(t);for (var n, i = g(e = x(e)), r = 0, o = i.length; o > r;) {
      J(t, n = i[r++], e[n]);
    }return t;
  },
      Q = function Q(t) {
    var e = j.call(this, t = S(t, !0));return (this !== H || !r(z, t) || r(V, t)) && (!(e || !r(this, t) || !r(z, t) || r(this, L) && this[L][t]) || e);
  },
      Z = function Z(t, e) {
    if (t = x(t), e = S(e, !0), t !== H || !r(z, e) || r(V, e)) {
      var n = O(t, e);return n && r(z, e) && !(r(t, L) && t[L][e]) && (n.enumerable = !0), n;
    }
  },
      tt = function tt(t) {
    for (var e, n = P(x(t)), i = [], o = 0; n.length > o;) {
      r(z, e = n[o++]) || e == L || e == u || i.push(e);
    }return i;
  },
      et = function et(t) {
    for (var e, n = t === H, i = P(n ? V : x(t)), o = [], s = 0; i.length > s;) {
      r(z, e = i[s++]) && (!n || r(H, e)) && o.push(z[e]);
    }return o;
  };W || (a((_B3 = function B() {
    if (this instanceof _B3) throw TypeError("Symbol is not a constructor!");var t = f(0 < arguments.length ? arguments[0] : void 0),
        e = function e(n) {
      this === H && e.call(V, n), r(this, L) && r(this[L], t) && (this[L][t] = !1), Y(this, t, E(1, n));
    };return o && G && Y(H, t, { configurable: !0, set: e }), K(t);
  })[R], "toString", function () {
    return this._k;
  }), A.f = Z, I.f = J, n(34).f = _.f = tt, n(45).f = Q, k.f = et, o && !n(30) && a(H, "propertyIsEnumerable", Q, !0), p.f = function (t) {
    return K(d(t));
  }), s(s.G + s.W + s.F * !W, { Symbol: _B3 });for (var nt = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], it = 0; nt.length > it;) {
    d(nt[it++]);
  }for (var rt = T(d.store), ot = 0; rt.length > ot;) {
    m(rt[ot++]);
  }s(s.S + s.F * !W, "Symbol", { for: function _for(t) {
      return r(U, t += "") ? U[t] : U[t] = _B3(t);
    }, keyFor: function keyFor(t) {
      if (!X(t)) throw TypeError(t + " is not a symbol!");for (var e in U) {
        if (U[e] === t) return e;
      }
    }, useSetter: function useSetter() {
      G = !0;
    }, useSimple: function useSimple() {
      G = !1;
    } }), s(s.S + s.F * !W, "Object", { create: function create(t, e) {
      return void 0 === e ? M(t) : $(M(t), e);
    }, defineProperty: J, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: tt, getOwnPropertySymbols: et });var st = c(function () {
    k.f(1);
  });s(s.S + s.F * st, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(t) {
      return k.f(w(t));
    } }), F && s(s.S + s.F * (!W || c(function () {
    var t = _B3();return "[null]" != N([t]) || "{}" != N({ a: t }) || "{}" != N(Object(t));
  })), "JSON", { stringify: function stringify(t) {
      for (var e, n, i = [t], r = 1; arguments.length > r;) {
        i.push(arguments[r++]);
      }if (n = e = i[1], (b(e) || void 0 !== t) && !X(t)) return v(e) || (e = function e(t, _e) {
        if ("function" == typeof n && (_e = n.call(this, t, _e)), !X(_e)) return _e;
      }), i[1] = e, N.apply(F, i);
    } }), _B3[R][D] || n(14)(_B3[R], D, _B3[R].valueOf), h(_B3, "Symbol"), h(Math, "Math", !0), h(i.JSON, "JSON", !0);
}, function (t, e, n) {
  t.exports = n(48)("native-function-to-string", Function.toString);
}, function (t, e, n) {
  var i = n(31),
      r = n(50),
      o = n(45);t.exports = function (t) {
    var e = i(t),
        n = r.f;if (n) for (var s, a = n(t), u = o.f, c = 0; a.length > c;) {
      u.call(t, s = a[c++]) && e.push(s);
    }return e;
  };
}, function (t, e, n) {
  var i = n(0);i(i.S, "Object", { create: n(33) });
}, function (t, e, n) {
  var i = n(0);i(i.S + i.F * !n(8), "Object", { defineProperty: n(9).f });
}, function (t, e, n) {
  var i = n(0);i(i.S + i.F * !n(8), "Object", { defineProperties: n(91) });
}, function (t, e, n) {
  var i = n(15),
      r = n(20).f;n(21)("getOwnPropertyDescriptor", function () {
    return function (t, e) {
      return r(i(t), e);
    };
  });
}, function (t, e, n) {
  var i = n(10),
      r = n(35);n(21)("getPrototypeOf", function () {
    return function (t) {
      return r(i(t));
    };
  });
}, function (t, e, n) {
  var i = n(10),
      r = n(31);n(21)("keys", function () {
    return function (t) {
      return r(i(t));
    };
  });
}, function (t, e, n) {
  n(21)("getOwnPropertyNames", function () {
    return n(92).f;
  });
}, function (t, e, n) {
  var i = n(4),
      r = n(27).onFreeze;n(21)("freeze", function (t) {
    return function (e) {
      return t && i(e) ? t(r(e)) : e;
    };
  });
}, function (t, e, n) {
  var i = n(4),
      r = n(27).onFreeze;n(21)("seal", function (t) {
    return function (e) {
      return t && i(e) ? t(r(e)) : e;
    };
  });
}, function (t, e, n) {
  var i = n(4),
      r = n(27).onFreeze;n(21)("preventExtensions", function (t) {
    return function (e) {
      return t && i(e) ? t(r(e)) : e;
    };
  });
}, function (t, e, n) {
  var i = n(4);n(21)("isFrozen", function (t) {
    return function (e) {
      return !i(e) || !!t && t(e);
    };
  });
}, function (t, e, n) {
  var i = n(4);n(21)("isSealed", function (t) {
    return function (e) {
      return !i(e) || !!t && t(e);
    };
  });
}, function (t, e, n) {
  var i = n(4);n(21)("isExtensible", function (t) {
    return function (e) {
      return !!i(e) && (!t || t(e));
    };
  });
}, function (t, e, n) {
  var i = n(0);i(i.S + i.F, "Object", { assign: n(93) });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Object", { is: n(94) });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Object", { setPrototypeOf: n(65).set });
}, function (t, e, n) {
  "use strict";
  var i = n(46);({})[n(5)("toStringTag")] = "z", n(11)(Object.prototype, "toString", function () {
    return "[object " + i(this) + "]";
  }, !0);
}, function (t, e, n) {
  var i = n(0);i(i.P, "Function", { bind: n(95) });
}, function (t, e, n) {
  var i = n(9).f,
      r = Function.prototype,
      o = /^\s*function ([^ (]*)/,
      s = "name";s in r || n(8) && i(r, s, { configurable: !0, get: function get() {
      try {
        return ("" + this).match(o)[1];
      } catch (t) {
        return "";
      }
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(4),
      r = n(35),
      o = n(5)("hasInstance"),
      s = Function.prototype;o in s || n(9).f(s, o, { value: function value(t) {
      if ("function" != typeof this || !i(t)) return !1;if (!i(this.prototype)) return t instanceof this;for (; t = r(t);) {
        if (this.prototype === t) return !0;
      }return !1;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(97);i(i.G + i.F * (parseInt != r), { parseInt: r });
}, function (t, e, n) {
  var i = n(0),
      r = n(98);i(i.G + i.F * (parseFloat != r), { parseFloat: r });
}, function (t, e, n) {
  "use strict";
  var i = n(1),
      r = n(13),
      o = n(23),
      s = n(67),
      a = n(26),
      u = n(2),
      c = n(34).f,
      l = n(20).f,
      h = n(9).f,
      f = n(39).trim,
      d = "Number",
      _p = i[d],
      m = _p,
      g = _p.prototype,
      v = o(n(33)(g)) == d,
      y = "trim" in String.prototype,
      b = function b(t) {
    var e = a(t, !1);if ("string" == typeof e && 2 < e.length) {
      var n,
          i,
          r,
          o = (e = y ? e.trim() : f(e, 3)).charCodeAt(0);if (43 === o || 45 === o) {
        if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
      } else if (48 === o) {
        switch (e.charCodeAt(1)) {case 66:case 98:
            i = 2, r = 49;break;case 79:case 111:
            i = 8, r = 55;break;default:
            return +e;}for (var s, u = e.slice(2), c = 0, l = u.length; c < l; c++) {
          if (48 > (s = u.charCodeAt(c)) || s > r) return NaN;
        }return parseInt(u, i);
      }
    }return +e;
  };if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
    _p = function p(t) {
      var e = 1 > arguments.length ? 0 : t,
          n = this;return n instanceof _p && (v ? u(function () {
        g.valueOf.call(n);
      }) : o(n) != d) ? s(new m(b(e)), n, _p) : b(e);
    };for (var w, x = n(8) ? c(m) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), S = 0; x.length > S; S++) {
      r(m, w = x[S]) && !r(_p, w) && h(_p, w, l(m, w));
    }_p.prototype = g, g.constructor = _p, n(11)(i, d, _p);
  }
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(19),
      o = n(99),
      s = n(68),
      a = 1..toFixed,
      u = Math.floor,
      c = [0, 0, 0, 0, 0, 0],
      l = "Number.toFixed: incorrect invocation!",
      h = "0",
      f = function f(t, e) {
    for (var n = -1, i = e; 6 > ++n;) {
      i += t * c[n], c[n] = i % 1e7, i = u(i / 1e7);
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
      m = function m(t, e, n) {
    return 0 === e ? n : 1 == e % 2 ? m(t, e - 1, n * t) : m(t * t, e / 2, n);
  };i(i.P + i.F * ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0) || !n(2)(function () {
    a.call({});
  })), "Number", { toFixed: function toFixed(t) {
      var e,
          n,
          i,
          a,
          u = o(this, l),
          c = r(t),
          g = "",
          v = h;if (0 > c || 20 < c) throw RangeError(l);if (u != u) return "NaN";if (-1e21 >= u || 1e21 <= u) return u + "";if (0 > u && (g = "-", u = -u), 1e-21 < u) if (n = 0 > (e = function (t) {
        for (var e = 0, n = t; 4096 <= n;) {
          e += 12, n /= 4096;
        }for (; 2 <= n;) {
          e += 1, n /= 2;
        }return e;
      }(u * m(2, 69, 1)) - 69) ? u * m(2, -e, 1) : u / m(2, e, 1), n *= 4503599627370496, 0 < (e = 52 - e)) {
        for (f(0, n), i = c; 7 <= i;) {
          f(1e7, 0), i -= 7;
        }for (f(m(10, i, 1), 0), i = e - 1; 23 <= i;) {
          d(8388608), i -= 23;
        }d(1 << i), f(1, 1), d(2), v = p();
      } else f(0, n), f(1 << -e, 0), v = p() + s.call(h, c);return 0 < c ? v = g + ((a = v.length) <= c ? "0." + s.call(h, c - a) + v : v.slice(0, a - c) + "." + v.slice(a - c)) : v = g + v, v;
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(2),
      o = n(99),
      s = 1..toPrecision;i(i.P + i.F * (r(function () {
    return "1" !== s.call(1, void 0);
  }) || !r(function () {
    s.call({});
  })), "Number", { toPrecision: function toPrecision(t) {
      var e = o(this, "Number#toPrecision: incorrect invocation!");return void 0 === t ? s.call(e) : s.call(e, t);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Number", { EPSILON: 2220446049250313e-31 });
}, function (t, e, n) {
  var i = n(0),
      r = n(1).isFinite;i(i.S, "Number", { isFinite: function isFinite(t) {
      return "number" == typeof t && r(t);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Number", { isInteger: n(100) });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Number", { isNaN: function isNaN(t) {
      return t != t;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(100),
      o = Math.abs;i(i.S, "Number", { isSafeInteger: function isSafeInteger(t) {
      return r(t) && 9007199254740991 >= o(t);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
}, function (t, e, n) {
  var i = n(0),
      r = n(98);i(i.S + i.F * (Number.parseFloat != r), "Number", { parseFloat: r });
}, function (t, e, n) {
  var i = n(0),
      r = n(97);i(i.S + i.F * (Number.parseInt != r), "Number", { parseInt: r });
}, function (t, e, n) {
  var i = n(0),
      r = n(101),
      o = Math.sqrt,
      s = Math.acosh;i(i.S + i.F * !(s && 710 == Math.floor(s(Number.MAX_VALUE)) && s(1 / 0) == 1 / 0), "Math", { acosh: function acosh(t) {
      return 1 > (t = +t) ? NaN : 94906265.62425156 < t ? Math.log(t) + Math.LN2 : r(t - 1 + o(t - 1) * o(t + 1));
    } });
}, function (t, e, n) {
  var i = n(0),
      r = Math.asinh;i(i.S + i.F * !(r && 0 < 1 / r(0)), "Math", { asinh: function t(e) {
      return isFinite(e = +e) && 0 != e ? 0 > e ? -t(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = Math.atanh;i(i.S + i.F * !(r && 0 > 1 / r(-0)), "Math", { atanh: function atanh(t) {
      return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(69);i(i.S, "Math", { cbrt: function cbrt(t) {
      return r(t = +t) * Math.pow(Math.abs(t), 1 / 3);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { clz32: function clz32(t) {
      return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = Math.exp;i(i.S, "Math", { cosh: function cosh(t) {
      return (r(t = +t) + r(-t)) / 2;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(70);i(i.S + i.F * (r != Math.expm1), "Math", { expm1: r });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { fround: n(170) });
}, function (t, e, n) {
  var i = n(69),
      r = Math.pow,
      o = r(2, -52),
      s = r(2, -23),
      a = r(2, 127) * (2 - s),
      u = r(2, -126);t.exports = Math.fround || function (t) {
    var e,
        n,
        r = Math.abs(t),
        c = i(t);return r < u ? c * function (t) {
      return t + 1 / o - 1 / o;
    }(r / u / s) * u * s : (n = (e = (1 + s / o) * r) - (e - r)) > a || n != n ? c * (1 / 0) : c * n;
  };
}, function (t, e, n) {
  var i = n(0),
      r = Math.abs;i(i.S, "Math", { hypot: function hypot() {
      for (var t, e, n = 0, i = 0, o = arguments.length, s = 0; i < o;) {
        s < (t = r(arguments[i++])) ? (n = n * (e = s / t) * e + 1, s = t) : 0 < t ? n += (e = t / s) * e : n += t;
      }return s == 1 / 0 ? 1 / 0 : s * Math.sqrt(n);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = Math.imul;i(i.S + i.F * n(2)(function () {
    return -5 != r(4294967295, 5) || 2 != r.length;
  }), "Math", { imul: function imul(t, e) {
      var n = 65535,
          i = +t,
          r = +e,
          o = n & i,
          s = n & r;return 0 | o * s + ((n & i >>> 16) * s + o * (n & r >>> 16) << 16 >>> 0);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { log10: function log10(t) {
      return Math.log(t) * Math.LOG10E;
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { log1p: n(101) });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { log2: function log2(t) {
      return Math.log(t) / Math.LN2;
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { sign: n(69) });
}, function (t, e, n) {
  var i = n(0),
      r = n(70),
      o = Math.exp;i(i.S + i.F * n(2)(function () {
    return !0;
  }), "Math", { sinh: function sinh(t) {
      return 1 > Math.abs(t = +t) ? (r(t) - r(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(70),
      o = Math.exp;i(i.S, "Math", { tanh: function tanh(t) {
      var e = r(t = +t),
          n = r(-t);return e == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (e - n) / (o(t) + o(-t));
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Math", { trunc: function trunc(t) {
      return (0 < t ? Math.floor : Math.ceil)(t);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(32),
      o = String.fromCharCode,
      s = String.fromCodePoint;i(i.S + i.F * (!!s && 1 != s.length), "String", { fromCodePoint: function fromCodePoint() {
      for (var t, e = [], n = arguments.length, i = 0; n > i;) {
        if (t = +arguments[i++], r(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");e.push(65536 > t ? o(t) : o(55296 + ((t -= 65536) >> 10), t % 1024 + 56320));
      }return e.join("");
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(15),
      o = n(6);i(i.S, "String", { raw: function raw(t) {
      for (var e = r(t.raw), n = o(e.length), i = arguments.length, s = [], a = 0; n > a;) {
        s.push(e[a++] + ""), a < i && s.push(arguments[a] + "");
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
  var i = n(71)(!0);n(72)(String, "String", function (t) {
    this._t = t + "", this._i = 0;
  }, function () {
    var t,
        e = this._t,
        n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = i(e, n), this._i += t.length, { value: t, done: !1 });
  });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(71)(!1);i(i.P, "String", { codePointAt: function codePointAt(t) {
      return r(this, t);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(6),
      o = n(73),
      s = "endsWith";i(i.P + i.F * n(75)(s), "String", { endsWith: function endsWith(t) {
      var e = o(this, t, s),
          n = 1 < arguments.length ? arguments[1] : void 0,
          i = r(e.length),
          a = void 0 === n ? i : Math.min(r(n), i),
          u = t + "";return e.slice(a - u.length, a) === u;
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(73),
      o = "includes";i(i.P + i.F * n(75)(o), "String", { includes: function includes(t) {
      return !!~r(this, t, o).indexOf(t, 1 < arguments.length ? arguments[1] : void 0);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.P, "String", { repeat: n(68) });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(6),
      o = n(73),
      s = "startsWith";i(i.P + i.F * n(75)(s), "String", { startsWith: function startsWith(t) {
      var e = o(this, t, s),
          n = r(Math.min(1 < arguments.length ? arguments[1] : void 0, e.length)),
          i = t + "";return e.slice(n, n + i.length) === i;
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
  var i = n(0);i(i.S, "Date", { now: function now() {
      return new Date().getTime();
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(10),
      o = n(26);i(i.P + i.F * n(2)(function () {
    return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
        return 1;
      } });
  }), "Date", { toJSON: function toJSON() {
      var t = r(this),
          e = o(t);return "number" != typeof e || isFinite(e) ? t.toISOString() : null;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(205);i(i.P + i.F * (Date.prototype.toISOString !== r), "Date", { toISOString: r });
}, function (t, e, n) {
  "use strict";
  var i = n(2),
      r = Date.prototype.getTime,
      o = Date.prototype.toISOString,
      s = function s(t) {
    return 9 < t ? t : "0" + t;
  };t.exports = i(function () {
    return "0385-07-25T07:06:39.999Z" != o.call(new Date(-50000000000001));
  }) || !i(function () {
    o.call(new Date(NaN));
  }) ? function () {
    if (!isFinite(r.call(this))) throw RangeError("Invalid time value");var t = this,
        e = t.getUTCFullYear(),
        n = t.getUTCMilliseconds(),
        i = 0 > e ? "-" : 9999 < e ? "+" : "";return i + ("00000" + Math.abs(e)).slice(i ? -6 : -4) + "-" + s(t.getUTCMonth() + 1) + "-" + s(t.getUTCDate()) + "T" + s(t.getUTCHours()) + ":" + s(t.getUTCMinutes()) + ":" + s(t.getUTCSeconds()) + "." + (99 < n ? n : "0" + s(n)) + "Z";
  } : o;
}, function (t, e, n) {
  var i = Date.prototype,
      r = "Invalid Date",
      o = "toString",
      s = i[o],
      a = i.getTime;new Date(NaN) + "" != r && n(11)(i, o, function () {
    var t = a.call(this);return t == t ? s.call(this) : r;
  });
}, function (t, e, n) {
  var i = n(5)("toPrimitive"),
      r = Date.prototype;i in r || n(14)(r, i, n(208));
}, function (t, e, n) {
  "use strict";
  var i = n(3),
      r = n(26),
      o = "number";t.exports = function (t) {
    if ("string" !== t && t !== o && "default" !== t) throw TypeError("Incorrect hint");return r(i(this), t != o);
  };
}, function (t, e, n) {
  var i = n(0);i(i.S, "Array", { isArray: n(51) });
}, function (t, e, n) {
  "use strict";
  var i = n(17),
      r = n(0),
      o = n(10),
      s = n(103),
      a = n(76),
      u = n(6),
      c = n(77),
      l = n(78);r(r.S + r.F * !n(52)(function (t) {
    Array.from(t);
  }), "Array", { from: function from(t) {
      var e,
          n,
          r,
          h,
          f = o(t),
          d = "function" == typeof this ? this : Array,
          p = arguments.length,
          m = 1 < p ? arguments[1] : void 0,
          g = void 0 !== m,
          v = 0,
          y = l(f);if (g && (m = i(m, 2 < p ? arguments[2] : void 0, 2)), null == y || d == Array && a(y)) for (n = new d(e = u(f.length)); e > v; v++) {
        c(n, v, g ? m(f[v], v) : f[v]);
      } else for (h = y.call(f), n = new d(); !(r = h.next()).done; v++) {
        c(n, v, g ? s(h, m, [r.value, v], !0) : r.value);
      }return n.length = v, n;
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(77);i(i.S + i.F * n(2)(function () {
    function t() {}return !(Array.of.call(t) instanceof t);
  }), "Array", { of: function of() {
      for (var t = 0, e = arguments.length, n = new ("function" == typeof this ? this : Array)(e); e > t;) {
        r(n, t, arguments[t++]);
      }return n.length = e, n;
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(15),
      o = [].join;i(i.P + i.F * (n(44) != Object || !n(16)(o)), "Array", { join: function join(t) {
      return o.call(r(this), void 0 === t ? "," : t);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(64),
      o = n(23),
      s = n(32),
      a = n(6),
      u = [].slice;i(i.P + i.F * n(2)(function () {
    r && u.call(r);
  }), "Array", { slice: function slice(t, e) {
      var n = a(this.length),
          i = o(this);if (e = void 0 === e ? n : e, "Array" == i) return u.call(this, t, e);for (var r = s(t, n), c = s(e, n), l = a(c - r), h = Array(l), f = 0; f < l; f++) {
        h[f] = "String" == i ? this.charAt(r + f) : this[r + f];
      }return h;
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(18),
      o = n(10),
      s = n(2),
      a = [].sort,
      u = [1, 2, 3];i(i.P + i.F * (s(function () {
    u.sort(void 0);
  }) || !s(function () {
    u.sort(null);
  }) || !n(16)(a)), "Array", { sort: function sort(t) {
      return void 0 === t ? a.call(o(this)) : a.call(o(this), r(t));
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(0),
      o = n(16)([].forEach, !0);i(i.P + i.F * !o, "Array", { forEach: function forEach(t) {
      return r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  var i = n(4),
      r = n(51),
      o = n(5)("species");t.exports = function (t) {
    var e;return r(t) && ("function" == typeof (e = t.constructor) && (e === Array || r(e.prototype)) && (e = void 0), i(e) && null === (e = e[o]) && (e = void 0)), void 0 === e ? Array : e;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(1);i(i.P + i.F * !n(16)([].map, !0), "Array", { map: function map(t) {
      return r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(2);i(i.P + i.F * !n(16)([].filter, !0), "Array", { filter: function filter(t) {
      return r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(3);i(i.P + i.F * !n(16)([].some, !0), "Array", { some: function some(t) {
      return r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(4);i(i.P + i.F * !n(16)([].every, !0), "Array", { every: function every(t) {
      return r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(105);i(i.P + i.F * !n(16)([].reduce, !0), "Array", { reduce: function reduce(t) {
      return r(this, t, arguments.length, arguments[1], !1);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(105);i(i.P + i.F * !n(16)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
      return r(this, t, arguments.length, arguments[1], !0);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(49)(!1),
      o = [].indexOf,
      s = !!o && 0 > 1 / [1].indexOf(1, -0);i(i.P + i.F * (s || !n(16)(o)), "Array", { indexOf: function indexOf(t) {
      return s ? o.apply(this, arguments) || 0 : r(this, t, arguments[1]);
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(15),
      o = n(19),
      s = n(6),
      a = [].lastIndexOf,
      u = !!a && 0 > 1 / [1].lastIndexOf(1, -0);i(i.P + i.F * (u || !n(16)(a)), "Array", { lastIndexOf: function lastIndexOf(t) {
      if (u) return a.apply(this, arguments) || 0;var e = r(this),
          n = s(e.length),
          i = n - 1;for (1 < arguments.length && (i = Math.min(i, o(arguments[1]))), 0 > i && (i = n + i); 0 <= i; i--) {
        if (i in e && e[i] === t) return i || 0;
      }return -1;
    } });
}, function (t, e, n) {
  var i = n(0);i(i.P, "Array", { copyWithin: n(106) }), n(36)("copyWithin");
}, function (t, e, n) {
  var i = n(0);i(i.P, "Array", { fill: n(79) }), n(36)("fill");
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(5),
      o = "find",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), i(i.P + i.F * s, "Array", { find: function find(t) {
      return r(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(22)(6),
      o = "findIndex",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), i(i.P + i.F * s, "Array", { findIndex: function findIndex(t) {
      return r(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (t, e, n) {
  n(41)("Array");
}, function (t, e, n) {
  var i = n(1),
      r = n(67),
      o = n(9).f,
      s = n(34).f,
      a = n(74),
      u = n(53),
      _c2 = i.RegExp,
      l = _c2,
      h = _c2.prototype,
      f = /a/g,
      d = /a/g,
      p = new _c2(f) !== f;if (n(8) && (!p || n(2)(function () {
    return d[n(5)("match")] = !1, _c2(f) != f || _c2(d) == d || "/a/i" != _c2(f, "i");
  }))) {
    _c2 = function c(t, e) {
      var n = this instanceof _c2,
          i = a(t),
          o = void 0 === e;return !n && i && t.constructor === _c2 && o ? t : r(p ? new l(i && !o ? t.source : t, e) : l((i = t instanceof _c2) ? t.source : t, i && o ? u.call(t) : e), n ? this : h, _c2);
    };for (var m = function m(t) {
      (t in _c2) || o(_c2, t, { configurable: !0, get: function get() {
          return l[t];
        }, set: function set(e) {
          l[t] = e;
        } });
    }, g = s(l), v = 0; g.length > v;) {
      m(g[v++]);
    }h.constructor = _c2, _c2.prototype = h, n(11)(i, "RegExp", _c2);
  }n(41)("RegExp");
}, function (t, e, n) {
  "use strict";
  n(109);var i = n(3),
      r = n(53),
      o = n(8),
      s = "toString",
      a = /./[s],
      u = function u(t) {
    n(11)(RegExp.prototype, s, t, !0);
  };n(2)(function () {
    return "/a/b" != a.call({ source: "a", flags: "b" });
  }) ? u(function () {
    var t = i(this);return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? r.call(t) : void 0);
  }) : a.name != s && u(function () {
    return a.call(this);
  });
}, function (t, e, n) {
  "use strict";
  var i = n(3),
      r = n(6),
      o = n(82),
      s = n(54);n(55)("match", 1, function (t, e, n, a) {
    return [function (n) {
      var i = t(this),
          r = null == n ? void 0 : n[e];return void 0 === r ? new RegExp(n)[e](i + "") : r.call(n, i);
    }, function (t) {
      var e = a(n, t, this);if (e.done) return e.value;var u = i(t),
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var h, f = [], d = 0; null !== (h = s(u, c));) {
        var p = h[0] + "";f[d] = p, "" == p && (u.lastIndex = o(c, r(u.lastIndex), l)), d++;
      }return 0 == d ? null : f;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var i = n(3),
      r = n(10),
      o = n(6),
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
  };n(55)("replace", 2, function (t, e, n, m) {
    function g(t, e, i, o, s, a) {
      var u = i + t.length,
          c = o.length,
          l = d;return void 0 !== s && (s = r(s), l = f), n.call(a, l, function (n, r) {
        var a;switch (r.charAt(0)) {case "$":
            return "$";case "&":
            return t;case "`":
            return e.slice(0, i);case "'":
            return e.slice(u);case "<":
            a = s[r.slice(1, -1)];break;default:
            var l = +r;if (0 == l) return n;if (l > c) {
              var f = h(l / 10);return 0 === f ? n : f <= c ? void 0 === o[f - 1] ? r.charAt(1) : o[f - 1] + r.charAt(1) : n;
            }a = o[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (i, r) {
      var o = t(this),
          s = null == i ? void 0 : i[e];return void 0 === s ? n.call(o + "", i, r) : s.call(i, o, r);
    }, function (t, e) {
      var r = m(n, t, this, e);if (r.done) return r.value;var h = i(t),
          f = this + "",
          d = "function" == typeof e;d || (e += "");var v = h.global;if (v) {
        var y = h.unicode;h.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(h, f)) && (w.push(b), v);) {
        "" == b[0] + "" && (h.lastIndex = a(f, o(h.lastIndex), y));
      }for (var x = "", S = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", _ = c(l(s(b.index), f.length), 0), A = [], k = 1; k < b.length; k++) {
          A.push(p(b[k]));
        }var I = b.groups;if (d) {
          var T = [M].concat(A, _, f);void 0 !== I && T.push(I);var O = e.apply(void 0, T) + "";
        } else O = g(M, f, _, A, I, e);_ >= S && (x += f.slice(S, _) + O, S = _ + M.length);
      }return x + f.slice(S);
    }];
  });
}, function (t, e, n) {
  "use strict";
  var i = n(3),
      r = n(94),
      o = n(54);n(55)("search", 1, function (t, e, n, s) {
    return [function (n) {
      var i = t(this),
          r = null == n ? void 0 : n[e];return void 0 === r ? new RegExp(n)[e](i + "") : r.call(n, i);
    }, function (t) {
      var e = s(n, t, this);if (e.done) return e.value;var a = i(t),
          u = this + "",
          c = a.lastIndex;r(c, 0) || (a.lastIndex = 0);var l = o(a, u);return r(a.lastIndex, c) || (a.lastIndex = c), null === l ? -1 : l.index;
    }];
  });
}, function (t, e, n) {
  "use strict";
  var i = n(74),
      r = n(3),
      o = n(47),
      s = n(82),
      a = n(6),
      u = n(54),
      c = n(81),
      l = n(2),
      h = Math.min,
      f = [].push,
      d = "split",
      p = "length",
      m = "lastIndex",
      g = 4294967295,
      v = !l(function () {
    RegExp(g, "y");
  });n(55)("split", 2, function (t, e, n, l) {
    var y;return y = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[p] || 2 != "ab"[d](/(?:ab)*/)[p] || 4 != "."[d](/(.?)(.?)/)[p] || 1 < "."[d](/()()/)[p] || ""[d](/.?/)[p] ? function (t, e) {
      var r = this + "";if (void 0 === t && 0 === e) return [];if (!i(t)) return n.call(r, t, e);for (var o, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), h = 0, d = void 0 === e ? g : e >>> 0, v = new RegExp(t.source, l + "g"); (o = c.call(v, r)) && !((s = v[m]) > h && (u.push(r.slice(h, o.index)), 1 < o[p] && o.index < r[p] && f.apply(u, o.slice(1)), a = o[0][p], h = s, u[p] >= d));) {
        v[m] === o.index && v[m]++;
      }return h === r[p] ? (a || !v.test("")) && u.push("") : u.push(r.slice(h)), u[p] > d ? u.slice(0, d) : u;
    } : "0"[d](void 0, 0)[p] ? function (t, e) {
      return void 0 === t && 0 === e ? [] : n.call(this, t, e);
    } : n, [function (n, i) {
      var r = t(this),
          o = null == n ? void 0 : n[e];return void 0 === o ? y.call(r + "", n, i) : o.call(n, r, i);
    }, function (t, e) {
      var i = l(y, t, this, e, y !== n);if (i.done) return i.value;var c = r(t),
          f = this + "",
          d = o(c, RegExp),
          p = c.unicode,
          m = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (v ? "y" : "g"),
          b = new d(v ? c : "^(?:" + c.source + ")", m),
          w = void 0 === e ? g : e >>> 0;if (0 == w) return [];if (0 === f.length) return null === u(b, f) ? [f] : [];for (var x = 0, S = 0, E = []; S < f.length;) {
        b.lastIndex = v ? S : 0;var M,
            _ = u(b, v ? f : f.slice(S));if (null === _ || (M = h(a(b.lastIndex + (v ? 0 : S)), f.length)) === x) S = s(f, S, p);else {
          if (E.push(f.slice(x, S)), E.length === w) return E;for (var A = 1; A <= _.length - 1; A++) {
            if (E.push(_[A]), E.length === w) return E;
          }S = x = M;
        }
      }return E.push(f.slice(x)), E;
    }];
  });
}, function (t, e, n) {
  var i = n(1),
      r = n(83).set,
      o = i.MutationObserver || i.WebKitMutationObserver,
      s = i.process,
      a = i.Promise,
      u = "process" == n(23)(s);t.exports = function () {
    var t,
        e,
        n,
        c = function c() {
      var i, r;for (u && (i = s.domain) && i.exit(); t;) {
        r = t.fn, t = t.next;try {
          r();
        } catch (r) {
          throw t ? n() : e = void 0, r;
        }
      }e = void 0, i && i.enter();
    };if (u) n = function n() {
      s.nextTick(c);
    };else if (!o || i.navigator && i.navigator.standalone) {
      if (a && a.resolve) {
        var l = a.resolve(void 0);n = function n() {
          l.then(c);
        };
      } else n = function n() {
        r.call(i, c);
      };
    } else {
      var h = !0,
          f = document.createTextNode("");new o(c).observe(f, { characterData: !0 }), n = function n() {
        f.data = h = !h;
      };
    }return function (i) {
      var r = { fn: i, next: void 0 };e && (e.next = r), t || (t = r, n()), e = r;
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
  var i = n(113),
      r = n(37),
      o = "Map";t.exports = n(58)(o, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { get: function get(t) {
      var e = i.getEntry(r(this, o), t);return e && e.v;
    }, set: function set(t, e) {
      return i.def(r(this, o), 0 === t ? 0 : t, e);
    } }, i, !0);
}, function (t, e, n) {
  "use strict";
  var i = n(113),
      r = n(37);t.exports = n(58)("Set", function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return i.def(r(this, "Set"), t = 0 === t ? 0 : t, t);
    } }, i);
}, function (t, e, n) {
  "use strict";
  var i,
      r = n(1),
      o = n(22)(0),
      s = n(11),
      a = n(27),
      u = n(93),
      c = n(114),
      l = n(4),
      h = n(37),
      f = n(37),
      d = !r.ActiveXObject && "ActiveXObject" in r,
      p = "WeakMap",
      m = a.getWeak,
      g = Object.isExtensible,
      v = c.ufstore,
      y = function y(t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  },
      b = { get: function get(t) {
      if (l(t)) {
        var e = m(t);return !0 === e ? v(h(this, p)).get(t) : e ? e[this._i] : void 0;
      }
    }, set: function set(t, e) {
      return c.def(h(this, p), t, e);
    } },
      w = t.exports = n(58)(p, y, b, c, !0, !0);f && d && (u((i = c.getConstructor(y, p)).prototype, b), a.NEED = !0, o(["delete", "has", "get", "set"], function (t) {
    var e = w.prototype,
        n = e[t];s(e, t, function (e, r) {
      if (l(e) && !g(e)) {
        this._f || (this._f = new i());var o = this._f[t](e, r);return "set" == t ? this : o;
      }return n.call(this, e, r);
    });
  }));
}, function (t, e, n) {
  "use strict";
  var i = n(114),
      r = n(37),
      o = "WeakSet";n(58)(o, function (t) {
    return function () {
      return t(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(t) {
      return i.def(r(this, o), t, !0);
    } }, i, !1, !0);
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(59),
      o = n(84),
      s = n(3),
      a = n(32),
      u = n(6),
      c = n(4),
      l = n(1).ArrayBuffer,
      h = n(47),
      f = o.ArrayBuffer,
      d = o.DataView,
      p = r.ABV && l.isView,
      m = f.prototype.slice,
      g = r.VIEW,
      v = "ArrayBuffer";i(i.G + i.W + i.F * (l !== f), { ArrayBuffer: f }), i(i.S + i.F * !r.CONSTR, v, { isView: function isView(t) {
      return p && p(t) || c(t) && g in t;
    } }), i(i.P + i.U + i.F * n(2)(function () {
    return !new f(2).slice(1, void 0).byteLength;
  }), v, { slice: function slice(t, e) {
      if (void 0 !== m && void 0 === e) return m.call(s(this), t);for (var n = s(this).byteLength, i = a(t, n), r = a(void 0 === e ? n : e, n), o = new (h(this, f))(u(r - i)), c = new d(this), l = new d(o), p = 0; i < r;) {
        l.setUint8(p++, c.getUint8(i++));
      }return o;
    } }), n(41)(v);
}, function (t, e, n) {
  var i = n(0);i(i.G + i.W + i.F * !n(59).ABV, { DataView: n(84).DataView });
}, function (t, e, n) {
  n(25)("Int8", 1, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Uint8", 1, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Uint8", 1, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  }, !0);
}, function (t, e, n) {
  n(25)("Int16", 2, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Uint16", 2, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Int32", 4, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Uint32", 4, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Float32", 4, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  n(25)("Float64", 8, function (t) {
    return function (e, n, i) {
      return t(this, e, n, i);
    };
  });
}, function (t, e, n) {
  var i = n(0),
      r = n(18),
      o = n(3),
      s = (n(1).Reflect || {}).apply,
      a = Function.apply;i(i.S + i.F * !n(2)(function () {
    s(function () {});
  }), "Reflect", { apply: function apply(t, e, n) {
      var i = r(t),
          u = o(n);return s ? s(i, e, u) : a.call(i, e, u);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(33),
      o = n(18),
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
  });i(i.S + i.F * (h || f), "Reflect", { construct: function construct(t, e) {
      o(t), s(e);var n = 3 > arguments.length ? t : o(arguments[2]);if (f && !h) return l(t, e, n);if (t == n) {
        switch (e.length) {case 0:
            return new t();case 1:
            return new t(e[0]);case 2:
            return new t(e[0], e[1]);case 3:
            return new t(e[0], e[1], e[2]);case 4:
            return new t(e[0], e[1], e[2], e[3]);}var i = [null];return i.push.apply(i, e), new (c.apply(t, i))();
      }var u = n.prototype,
          d = r(a(u) ? u : Object.prototype),
          p = Function.apply.call(t, d, e);return a(p) ? p : d;
    } });
}, function (t, e, n) {
  var i = n(9),
      r = n(0),
      o = n(3),
      s = n(26);r(r.S + r.F * n(2)(function () {
    Reflect.defineProperty(i.f({}, 1, { value: 1 }), 1, { value: 2 });
  }), "Reflect", { defineProperty: function defineProperty(t, e, n) {
      o(t), e = s(e, !0), o(n);try {
        return i.f(t, e, n), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(20).f,
      o = n(3);i(i.S, "Reflect", { deleteProperty: function deleteProperty(t, e) {
      var n = r(o(t), e);return (!n || n.configurable) && delete t[e];
    } });
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(3),
      o = function o(t) {
    this._t = r(t), this._i = 0;var e,
        n = this._k = [];for (e in t) {
      n.push(e);
    }
  };n(102)(o, "Object", function () {
    var t,
        e = this,
        n = e._k;do {
      if (e._i >= n.length) return { value: void 0, done: !0 };
    } while (!((t = n[e._i++]) in e._t));return { value: t, done: !1 };
  }), i(i.S, "Reflect", { enumerate: function enumerate(t) {
      return new o(t);
    } });
}, function (t, e, n) {
  var i = n(20),
      r = n(35),
      o = n(13),
      s = n(0),
      a = n(4),
      u = n(3);s(s.S, "Reflect", { get: function t(e, n) {
      var s,
          c,
          l = 3 > arguments.length ? e : arguments[2];return u(e) === l ? e[n] : (s = i.f(e, n)) ? o(s, "value") ? s.value : void 0 === s.get ? void 0 : s.get.call(l) : a(c = r(e)) ? t(c, n, l) : void 0;
    } });
}, function (t, e, n) {
  var i = n(20),
      r = n(0),
      o = n(3);r(r.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, e) {
      return i.f(o(t), e);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(35),
      o = n(3);i(i.S, "Reflect", { getPrototypeOf: function getPrototypeOf(t) {
      return r(o(t));
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Reflect", { has: function has(t, e) {
      return e in t;
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(3),
      o = Object.isExtensible;i(i.S, "Reflect", { isExtensible: function isExtensible(t) {
      return r(t), !o || o(t);
    } });
}, function (t, e, n) {
  var i = n(0);i(i.S, "Reflect", { ownKeys: n(116) });
}, function (t, e, n) {
  var i = n(0),
      r = n(3),
      o = Object.preventExtensions;i(i.S, "Reflect", { preventExtensions: function preventExtensions(t) {
      r(t);try {
        return o && o(t), !0;
      } catch (t) {
        return !1;
      }
    } });
}, function (t, e, n) {
  var i = n(9),
      r = n(20),
      o = n(35),
      s = n(13),
      a = n(0),
      u = n(28),
      c = n(3),
      l = n(4);a(a.S, "Reflect", { set: function t(e, n, a) {
      var h,
          f,
          d = 4 > arguments.length ? e : arguments[3],
          p = r.f(c(e), n);if (!p) {
        if (l(f = o(e))) return t(f, n, a, d);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(d)) return !1;if (h = r.f(d, n)) {
          if (h.get || h.set || !1 === h.writable) return !1;h.value = a, i.f(d, n, h);
        } else i.f(d, n, u(0, a));return !0;
      }return void 0 !== p.set && (p.set.call(d, a), !0);
    } });
}, function (t, e, n) {
  var i = n(0),
      r = n(65);r && i(i.S, "Reflect", { setPrototypeOf: function setPrototypeOf(t, e) {
      r.check(t, e);try {
        return r.set(t, e), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (t, e, n) {
  n(268), t.exports = n(7).Array.includes;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(49)(!0);i(i.P, "Array", { includes: function includes(t) {
      return r(this, t, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (t, e, n) {
  n(270), t.exports = n(7).Array.flatMap;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(271),
      o = n(10),
      s = n(6),
      a = n(18),
      u = n(104);i(i.P, "Array", { flatMap: function flatMap(t) {
      var e,
          n,
          i = o(this);return a(t), e = s(i.length), n = u(i, 0), r(n, i, i, e, 0, 1, t, arguments[1]), n;
    } }), n(36)("flatMap");
}, function (t, e, n) {
  "use strict";
  var i = n(51),
      r = n(4),
      o = n(6),
      s = n(17),
      a = n(5)("isConcatSpreadable");t.exports = function t(e, n, u, c, l, h, f, d) {
    for (var p, m, g = l, v = 0, y = !!f && s(f, d, 3); v < c;) {
      if (v in u) {
        if (p = y ? y(u[v], v, n) : u[v], m = !1, r(p) && (m = void 0 === (m = p[a]) ? i(p) : !!m), m && 0 < h) g = t(e, n, p, o(p.length), g, h - 1) - 1;else {
          if (9007199254740991 <= g) throw TypeError();e[g] = p;
        }g++;
      }v++;
    }return g;
  };
}, function (t, e, n) {
  n(273), t.exports = n(7).String.padStart;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(117),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);i(i.P + i.F * s, "String", { padStart: function padStart(t) {
      return r(this, t, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (t, e, n) {
  n(275), t.exports = n(7).String.padEnd;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(117),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);i(i.P + i.F * s, "String", { padEnd: function padEnd(t) {
      return r(this, t, 1 < arguments.length ? arguments[1] : void 0, !1);
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
  var i = n(0),
      r = n(116),
      o = n(15),
      s = n(20),
      a = n(77);i(i.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var e, n, i = o(t), u = s.f, c = r(i), l = {}, h = 0; c.length > h;) {
        void 0 !== (n = u(i, e = c[h++])) && a(l, e, n);
      }return l;
    } });
}, function (t, e, n) {
  n(285), t.exports = n(7).Object.values;
}, function (t, e, n) {
  var i = n(0),
      r = n(118)(!1);i(i.S, "Object", { values: function values(t) {
      return r(t);
    } });
}, function (t, e, n) {
  n(287), t.exports = n(7).Object.entries;
}, function (t, e, n) {
  var i = n(0),
      r = n(118)(!0);i(i.S, "Object", { entries: function entries(t) {
      return r(t);
    } });
}, function (t, e, n) {
  "use strict";
  n(110), n(289), t.exports = n(7).Promise.finally;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(7),
      o = n(1),
      s = n(47),
      a = n(112);i(i.P + i.R, "Promise", { finally: function _finally(t) {
      var e = s(this, r.Promise || o.Promise),
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
  var i = n(1),
      r = n(0),
      o = n(57),
      s = [].slice,
      a = /MSIE .\./.test(o),
      u = function u(t) {
    return function (e, n) {
      var i = 2 < arguments.length,
          r = !!i && s.call(arguments, 2);return t(i ? function () {
        ("function" == typeof e ? e : Function(e)).apply(this, r);
      } : e, n);
    };
  };r(r.G + r.B + r.F * a, { setTimeout: u(i.setTimeout), setInterval: u(i.setInterval) });
}, function (t, e, n) {
  var i = n(0),
      r = n(83);i(i.G + i.B, { setImmediate: r.set, clearImmediate: r.clear });
}, function (t, e, n) {
  for (var i = n(80), r = n(31), o = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), h = c("toStringTag"), f = u.Array, d = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = r(d), m = 0; m < p.length; m++) {
    var g,
        v = p[m],
        y = d[v],
        b = s[v],
        w = b && b.prototype;if (w && (w[l] || a(w, l, f), w[h] || a(w, h, v), u[v] = f, y)) for (g in i) {
      w[g] || o(w, g, i[g], !0);
    }
  }
}, function (t) {
  var e = function (t) {
    "use strict";
    function e(t, e, n) {
      return Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }), t[e];
    }function n(t, e, n, i) {
      var o = e && e.prototype instanceof r ? e : r,
          s = Object.create(o.prototype),
          a = new d(i || []);return s._invoke = c(t, n, a), s;
    }function i(t, e, n) {
      try {
        return { type: "normal", arg: t.call(e, n) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }function r() {}function o() {}function s() {}function a(t) {
      ["next", "throw", "return"].forEach(function (n) {
        e(t, n, function (t) {
          return this._invoke(n, t);
        });
      });
    }function u(t, e) {
      function n(r, o, s, a) {
        var u = i(t[r], t, o);if ("throw" !== u.type) {
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
      }var r;this._invoke = function (t, i) {
        function o() {
          return new e(function (e, r) {
            n(t, i, e, r);
          });
        }return r = r ? r.then(o, o) : o();
      };
    }function c(t, e, n) {
      var r = S;return function (o, s) {
        if (r === M) throw new Error("Generator is already running");if (r === _) {
          if ("throw" === o) throw s;return { value: void 0, done: !0 };
        }for (n.method = o, n.arg = s;;) {
          var a = n.delegate;if (a) {
            var u = l(a, n);if (u) {
              if (u === A) continue;return u;
            }
          }if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (r === S) throw r = _, n.arg;n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);r = M;var c = i(t, e, n);if ("normal" === c.type) {
            if (r = n.done ? _ : E, c.arg === A) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (r = _, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(t, e) {
      var n = t.iterator[e.method];if (void 0 === n) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, l(t, e), "throw" === e.method)) return A;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return A;
      }var r = i(n, t.iterator, e.arg);if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, A;var o = r.arg;return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, A) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, A);
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
              i = function e() {
            for (; ++n < t.length;) {
              if (v.call(t, n)) return e.value = t[n], e.done = !1, e;
            }return e.value = void 0, e.done = !0, e;
          };return i.next = i;
        }
      }return { next: m };
    }function m() {
      return { value: void 0, done: !0 };
    }var g = Object.prototype,
        v = g.hasOwnProperty,
        y = "function" == typeof Symbol ? Symbol : {},
        b = y.iterator || "@@iterator",
        w = y.asyncIterator || "@@asyncIterator",
        x = y.toStringTag || "@@toStringTag";try {
      e({}, "");
    } catch (t) {
      e = function e(t, _e2, n) {
        return t[_e2] = n;
      };
    }t.wrap = n;var S = "suspendedStart",
        E = "suspendedYield",
        M = "executing",
        _ = "completed",
        A = {},
        k = {};k[b] = function () {
      return this;
    };var I = Object.getPrototypeOf,
        T = I && I(I(p([])));T && T !== g && v.call(T, b) && (k = T);var O = s.prototype = r.prototype = Object.create(k);return o.prototype = O.constructor = s, s.constructor = o, o.displayName = e(s, x, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (_defaults(t, s), e(t, x, "GeneratorFunction")), t.prototype = Object.create(O), t;
    }, t.awrap = function (t) {
      return { __await: t };
    }, a(u.prototype), u.prototype[w] = function () {
      return this;
    }, t.AsyncIterator = u, t.async = function (e, i, r, o, s) {
      void 0 === s && (s = Promise);var a = new u(n(e, i, r, o), s);return t.isGeneratorFunction(i) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, a(O), e(O, x, "Generator"), O[b] = function () {
      return this;
    }, O.toString = function () {
      return "[object Generator]";
    }, t.keys = function (t) {
      var e = [];for (var n in t) {
        e.push(n);
      }return e.reverse(), function n() {
        for (; e.length;) {
          var i = e.pop();if (i in t) return n.value = i, n.done = !1, n;
        }return n.done = !0, n;
      };
    }, t.values = p, d.prototype = { constructor: d, reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(f), !t) for (var e in this) {
          "t" === e.charAt(0) && v.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
        }
      }, stop: function stop() {
        this.done = !0;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
      }, dispatchException: function dispatchException(t) {
        function e(e, i) {
          return o.type = "throw", o.arg = t, n.next = e, i && (n.method = "next", n.arg = void 0), !!i;
        }if (this.done) throw t;for (var n = this, i = this.tryEntries.length - 1; 0 <= i; --i) {
          var r = this.tryEntries[i],
              o = r.completion;if ("root" === r.tryLoc) return e("end");if (r.tryLoc <= this.prev) {
            var s = v.call(r, "catchLoc"),
                a = v.call(r, "finallyLoc");if (s && a) {
              if (this.prev < r.catchLoc) return e(r.catchLoc, !0);if (this.prev < r.finallyLoc) return e(r.finallyLoc);
            } else if (s) {
              if (this.prev < r.catchLoc) return e(r.catchLoc, !0);
            } else {
              if (!a) throw new Error("try statement without catch or finally");if (this.prev < r.finallyLoc) return e(r.finallyLoc);
            }
          }
        }
      }, abrupt: function abrupt(t, e) {
        for (var n, i = this.tryEntries.length - 1; 0 <= i; --i) {
          if ((n = this.tryEntries[i]).tryLoc <= this.prev && v.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var r = n;break;
          }
        }r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);var o = r ? r.completion : {};return o.type = t, o.arg = e, r ? (this.method = "next", this.next = r.finallyLoc, A) : this.complete(o);
      }, complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), A;
      }, finish: function finish(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).finallyLoc === t) return this.complete(e.completion, e.afterLoc), f(e), A;
        }
      }, catch: function _catch(t) {
        for (var e, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((e = this.tryEntries[n]).tryLoc === t) {
            var i = e.completion;if ("throw" === i.type) {
              var r = i.arg;f(e);
            }return r;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function delegateYield(t, e, n) {
        return this.delegate = { iterator: p(t), resultName: e, nextLoc: n }, "next" === this.method && (this.arg = void 0), A;
      } }, t;
  }(t.exports);try {
    regeneratorRuntime = e;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(e);
  }
}, function (t, e, n) {
  n(296), t.exports = n(119).global;
}, function (t, e, n) {
  var i = n(297);i(i.G, { global: n(85) });
}, function (t, e, n) {
  var i = n(85),
      r = n(119),
      o = n(298),
      s = n(300),
      a = n(307),
      u = "prototype",
      c = function c(t, e, n) {
    var l,
        h,
        f,
        d = t & c.F,
        p = t & c.G,
        m = t & c.S,
        g = t & c.P,
        v = t & c.B,
        y = t & c.W,
        b = p ? r : r[e] || (r[e] = {}),
        w = b[u],
        x = p ? i : m ? i[e] : (i[e] || {})[u];for (l in p && (n = e), n) {
      (h = !d && x && void 0 !== x[l]) && a(b, l) || (f = h ? x[l] : n[l], b[l] = p && "function" != typeof x[l] ? n[l] : v && h ? o(f, i) : y && x[l] == f ? function (t) {
        var e = function e(_e3, n, i) {
          if (this instanceof t) {
            switch (arguments.length) {case 0:
                return new t();case 1:
                return new t(_e3);case 2:
                return new t(_e3, n);}return new t(_e3, n, i);
          }return t.apply(this, arguments);
        };return e[u] = t[u], e;
      }(f) : g && "function" == typeof f ? o(Function.call, f) : f, g && ((b.virtual || (b.virtual = {}))[l] = f, t & c.R && w && !w[l] && s(w, l, f)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
}, function (t, e, n) {
  var i = n(299);t.exports = function (t, e, n) {
    return i(t), void 0 === e ? t : 1 === n ? function (n) {
      return t.call(e, n);
    } : 2 === n ? function (n, i) {
      return t.call(e, n, i);
    } : 3 === n ? function (n, i, r) {
      return t.call(e, n, i, r);
    } : function () {
      return t.apply(e, arguments);
    };
  };
}, function (t) {
  t.exports = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
  };
}, function (t, e, n) {
  var i = n(301),
      r = n(306);t.exports = n(87) ? function (t, e, n) {
    return i.f(t, e, r(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  };
}, function (t, e, n) {
  var i = n(302),
      r = n(303),
      o = n(305),
      s = Object.defineProperty;e.f = n(87) ? Object.defineProperty : function (t, e, n) {
    if (i(t), e = o(e, !0), i(n), r) try {
      return s(t, e, n);
    } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
  };
}, function (t, e, n) {
  var i = n(86);t.exports = function (t) {
    if (!i(t)) throw TypeError(t + " is not an object!");return t;
  };
}, function (t, e, n) {
  t.exports = !n(87) && !n(120)(function () {
    return 7 != Object.defineProperty(n(304)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (t, e, n) {
  var i = n(86),
      r = n(85).document,
      o = i(r) && i(r.createElement);t.exports = function (t) {
    return o ? r.createElement(t) : {};
  };
}, function (t, e, n) {
  var i = n(86);t.exports = function (t, e) {
    if (!i(t)) return t;var n, r;if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t))) return r;if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;throw TypeError("Can't convert object to primitive value");
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
  function i(t) {
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
  }function r(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function o(t) {
    return "string" != typeof t && (t += ""), t;
  }function s(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return ot.iterable && (e[Symbol.iterator] = function () {
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
  }function h(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function f() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : ot.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : ot.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : ot.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : ot.arrayBuffer && ot.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = h(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : ot.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || at(t)) ? this._bodyArrayBuffer = h(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : ot.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, ot.blob && (this.blob = function () {
      var t = u(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? u(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l);
    }), this.text = function () {
      var t = u(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            n = c(e);return e.readAsText(t), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), n = Array(e.length), i = 0; i < e.length; i++) {
          n[i] = G(e[i]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, ot.formData && (this.formData = function () {
      return this.text().then(p);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function d(t, e) {
    var n = (e = e || {}).body;if (t instanceof d) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new a(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new a(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < ut.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function p(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var n = t.split("="),
            i = n.shift().replace(/\+/g, " "),
            r = n.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(i), decodeURIComponent(r));
      }
    }), e;
  }function m(t) {
    var e = new a();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var n = t.split(":"),
          i = n.shift().trim();if (i) {
        var r = n.join(":").trim();e.append(i, r);
      }
    }), e;
  }function g(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new a(e.headers), this.url = e.url || "", this._initBody(t);
  }function v(t, e) {
    return new Promise(function (n, i) {
      function r() {
        s.abort();
      }var o = new d(t, e);if (o.signal && o.signal.aborted) return i(new lt("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var t = { status: s.status, statusText: s.statusText, headers: m(s.getAllResponseHeaders() || "") };t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");var e = "response" in s ? s.response : s.responseText;n(new g(e, t));
      }, s.onerror = function () {
        i(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        i(new TypeError("Network request failed"));
      }, s.onabort = function () {
        i(new lt("Aborted", "AbortError"));
      }, s.open(o.method, o.url, !0), "include" === o.credentials ? s.withCredentials = !0 : "omit" === o.credentials && (s.withCredentials = !1), "responseType" in s && ot.blob && (s.responseType = "blob"), o.headers.forEach(function (t, e) {
        s.setRequestHeader(e, t);
      }), o.signal && (o.signal.addEventListener("abort", r), s.onreadystatechange = function () {
        4 === s.readyState && o.signal.removeEventListener("abort", r);
      }), s.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function y(t) {
    console.log("[OpenAudioMc] " + t);
  }function b(t, e) {
    var n = e.media.loop,
        i = e.media.startInstant,
        r = e.media.mediaId,
        o = e.media.source,
        s = e.media.doPickup,
        a = e.media.fadeTime,
        u = e.distance,
        c = e.media.flag,
        l = e.maxDistance;var h = 100;null != e.media.volume && 0 != e.media.volume && (h = e.media.volume), t.getMediaManager().destroySounds(r, !1, !0);var f = new rt(r);f.trackable = !0;var d = new vt(o);if (d.openAudioMc = t, d.setOa(t), t.getMediaManager().mixer.addChannel(f), f.addSound(d), f.setChannelVolume(0), d.setLooping(n), f.setTag(r), 0 !== l) {
      var _t3 = this.convertDistanceToVolume(l, u);f.setTag("SPECIAL"), f.maxDistance = l, f.fadeChannel(_t3, a);
    } else f.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (f.setChannelVolume(h), f.updateFromMasterVolume()) : (f.updateFromMasterVolume(), f.fadeChannel(h, a));
    }, 1);f.setTag(c), t.getMediaManager().mixer.updateCurrent(), d.finalize().then(function () {
      s && d.startDate(i, !0), d.finish();
    });
  }function w() {
    document.getElementById("card-panel").style.display = "none";
  }function x(t, e) {
    function n(t, e) {
      var n = 0,
          r = e || t.innerHTML,
          o = r.length;xt.push(window.setInterval(function () {
        n >= o && (n = 0), r = i(r, n), t.innerHTML = r, n++;
      }, 0));
    }function i(t, e) {
      var n = G(function (t, e) {
        return J(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + n + t.substr(e + 1, t.length);
    }var r = void 0,
        o = void 0,
        s = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t4 = 0; _t4 < s; _t4++) {
        o = e.childNodes[_t4], 3 === o.nodeType && (r = document.createElement("span"), r.innerHTML = o.nodeValue, e.replaceChild(r, o), n(r));
      }
    } else n(e, t);
  }function S(t, e) {
    var n = e.length,
        i = document.createElement("span"),
        r = !1;for (var _o2 = 0; _o2 < n; _o2++) {
      i.style.cssText += St[e[_o2]] + ";", "§k" === e[_o2] && (x(t, i), r = !0);
    }return r || (i.innerHTML = t), i;
  }function E(t) {
    var e,
        n,
        i = t.match(/&.{1}/g) || [],
        r = [],
        o = [],
        s = document.createDocumentFragment(),
        a = i.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e4 = 0; _e4 < a; _e4++) {
      r.push(t.indexOf(i[_e4])), t = t.replace(i[_e4], "\0\0");
    }0 !== r[0] && s.appendChild(S(t.substring(0, r[0]), []));for (var _u = 0; _u < a; _u++) {
      if (2 === (n = r[_u + 1] - r[_u])) {
        for (; 2 == n;) {
          o.push(i[_u]), _u++, n = r[_u + 1] - r[_u];
        }o.push(i[_u]);
      } else o.push(i[_u]);-1 < o.lastIndexOf("§r") && (o = o.slice(o.lastIndexOf("§r") + 1)), e = t.substring(r[_u], r[_u + 1]), s.appendChild(S(e, o));
    }return s;
  }function M(t, e) {
    var n = JSON.parse(e.serializedCard);new Et().replaceWithJson(e.id, n);
  }function _(t, e) {
    var n = JSON.parse(e.serializedCard);new Et(n);
  }function A(t, e) {
    var n = e.message;t.notificationModule.sendNotification(e.title, n), new nt("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + n);
  }function k(t, e) {
    var n = parseInt(e.protocolRevision);if (console.log("[OpenAudioMc] Received PROTOCOL revision update"), 2 <= n && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0), 3 <= n && (console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks"), t.socketModule.supportsYoutube = !0), 3 > n) {
      new nt("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function I(t, e) {
    var n = e.volume;t.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function T(t, e) {
    t.getMediaManager().destroySounds(e.soundId, e.all, !1, e.fadeTime);
  }function O(t, e) {
    var n = e.lights,
        i = e.hueColor,
        r = "rgba(" + i.r + "," + i.g + "," + i.b + "," + function (t, e, n) {
      return (t - e[0]) * (n[1] - n[0]) / (e[1] - e[0]) + n[0];
    }(i.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(n, r);
  }function C(t, e) {
    function n(t, e) {
      return X((t - e) / t * 100);
    }var i = e.mediaOptions.target,
        r = e.mediaOptions.fadeTime,
        o = e.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = t.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _e5 = _step2.value;
        _e5.hasTag(i) && _e5.fadeChannel(n(_e5.maxDistance, o), r);
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
  }function P(t, e) {
    var n = e.x,
        i = e.y,
        r = e.z,
        o = e.pitch,
        s = e.yaw;t.world.player.updateLocation(new Mt(n, i, r), o, s);
  }function B(t, e) {
    var n = e.clientSpeaker,
        i = new Mt(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        r = new _t(n.id, n.source, i, n.type, n.maxDistance, n.startInstant, t);t.world.addSpeaker(n.id, r);
  }function F(t, e) {
    var n = e.clientSpeaker;t.world.removeSpeaker(n.id);
  }function N(t, e) {
    if (e.clear) console.log("[OpenAudioMc] Clearing pre-fetched resources"), setTimeout(function () {
      mt = {};
    }, 2500);else {
      var _t5 = e.source;console.log("[OpenAudioMc] Pre-fetching resource.."), setTimeout(function () {
        !function (t) {
          t = gt.translate(t);var e = new Audio();e.autoplay = !1, e.src = t, e.load(), mt[t] = e;
        }(_t5);
      }, 2500);
    }
  }function R(t, e, n) {
    v(ht.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: e, message: t }) }).then(function (t) {
      null != n && n(), t.json().then(function (t) {
        console.log("Reported error. Reponse was: " + JSON.stringify(t));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function L(t, e, n, i, r) {
    this.fromSampleRate = t, this.toSampleRate = e, this.channels = 0 | n, this.outputBufferSize = i, this.noReturn = !!r, this.initialize();
  }function D(t, e, n, i, r, o) {
    this.audioChannels = 2 == t ? 2 : 1, Ut = 1 == this.audioChannels, jt = 0 < e && 16777215 >= e ? e : 44100, Rt = n >= Pt << 1 && n < i ? n & (Ut ? 4294967295 : 4294967294) : Pt << 1, Lt = J(i) > Rt + this.audioChannels ? i & (Ut ? 4294967295 : 4294967294) : n << 1, this.underRunCallback = "function" == typeof r ? r : function () {}, zt = -1 <= o && 1 >= o && 0 != o ? o : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function j(t) {
    try {
      var e = new Float32Array(t);
    } catch (e) {
      var e;Array(t);
    }for (var n = 0; n < t; ++n) {
      e[n] = zt * (n / t);
    }return e;
  }function U(t) {
    try {
      var e = new Float32Array(t);
    } catch (i) {
      e = Array(t);var n = 0;do {
        e[n] = 0;
      } while (++n < t);
    }return e;
  }function z() {
    for (var t = "", e = "", n = 0; n < Pt && Wt != qt; ++n) {
      t += G(12288 + (0 | 16383 * $(K(Nt[Wt++] + 1, 0), 2))), e += G(12288 + (0 | 16383 * $(K(Nt[Wt++] + 1, 0), 2))), Wt == Gt && (Wt = 0);
    }return t + e;
  }function V() {
    for (var t = "", e = 0; e < Pt && Wt != qt; ++e) {
      t += G(12288 + (0 | 16383 * $(K(Nt[Wt++] + 1, 0), 2))), Wt == Gt && (Wt = 0);
    }return t;
  }function H() {
    return (Wt <= qt ? 0 : Gt) + qt - Wt;
  }function W(t) {
    Ft = j(Lt), Ht = Lt, Wt = 0, qt = 0, Gt = K(Lt * Math.ceil(jt / t), Pt) << 1, Ut ? (Nt = U(Gt), Vt = new L(jt, t, 1, Gt, !0), V) : (Nt = U(Gt <<= 1), Vt = new L(jt, t, 2, Gt, !0), z);
  }function q() {
    pe.canStart && pe.start();
  }var G = String.fromCharCode,
      Y = Math.abs,
      K = Math.max,
      X = Math.round,
      J = Math.floor,
      $ = Math.min;n.r(e), n(122);
  var Q = function () {
    function Q() {
      _classCallCheck(this, Q);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    Q.prototype.sync = function sync(t, e) {
      var n = new Date(t),
          i = new Date().getTime();i += 60 * e * 60 * 1e3;var r = new Date(i);this.isServerAhead = n.getTime() > r.getTime(), this.msOffset = this.isServerAhead ? n.getTime() - r.getTime() : r.getTime() - n.getTime(), this.hasSynced = !0;
    };

    Q.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return Q;
  }();

  var Z = function () {
    function Z(t) {
      _classCallCheck(this, Z);

      this.fallback = "No message provided in oa+", this.main = t, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    Z.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return Z;
  }();

  var tt = function () {
    function tt(t) {
      _classCallCheck(this, tt);

      this.openAudioMc = t;
    }

    tt.prototype.changeColor = function changeColor(t, e) {
      var n = function (t) {
        return t = t.replace("#", ""), "rgb(" + parseInt(t.substring(0, 2), 16) + ", " + parseInt(t.substring(2, 4), 16) + ", " + parseInt(t.substring(4, 6), 16) + ")";
      }(t);document.querySelectorAll("*").forEach(function (t) {
        var i = window.getComputedStyle(t);Object.keys(i).reduce(function (r, o) {
          var s = i[o],
              a = i.getPropertyValue(s);if (0 <= a.indexOf(n)) {
            var _i = a.replace(n, e);0 <= s.indexOf("border-top") ? t.style.borderTop = "2px solid " + _i : t.style[s] = _i;
          }
        });
      });
    };

    tt.prototype.setMessage = function setMessage(t) {
      document.getElementById("status-message").innerHTML = t;
    };

    tt.prototype.openApp = function openApp() {
      i(et.MAIN_UI), this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    };

    tt.prototype.kickScreen = function kickScreen(t) {
      i(et.KICKED), document.getElementById("kick-message").innerHTML = t;
    };

    return tt;
  }();

  var et = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" };
  var nt = function () {
    function nt(t, e) {
      _classCallCheck(this, nt);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    nt.prototype.show = function show(t) {
      var _this = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
        t.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _t6 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_t6);
        }, this.option.closeTime);
      }return this;
    };

    nt.prototype.onClick = function onClick(t) {
      this.alertBox.onclick = t;
    };

    nt.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(t), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return nt;
  }();

  var it = function () {
    function it(t, e) {
      var _this3 = this;

      _classCallCheck(this, it);

      this.hue = e, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = t, this.hue.discover().then(function (t) {
        t.forEach(function (t) {
          _this3.bridges.push(t), _this3.onDiscover();
        });
      }).catch(function (t) {
        return console.log("Error finding bridges", t);
      }), this.isSsl && this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue"), document.getElementById("hue-start-linking-button").onclick = function () {
        _this3.startSetup();
      };
    }

    it.prototype.onDiscover = function onDiscover() {
      var _this4 = this;

      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-modal").style.display = "none", void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup(), this.requestBox = new nt("#alert-area", { persistent: !0, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;">We found a hue bridge in your network<br/><br/><br/><a id="noti-perm-request-link" class="alert-message-button">hue settings</a></div>'), this.isModalOpen = !1, this.requestBox.onClick(this.openModal), document.body.addEventListener("click", function () {
          _this4.isModalOpen && (document.getElementById("hue-modal").style.display = "none", _this4.isModalOpen = !1);
        });
      } else this.openAudioMc.log("No hue bridges found");
    };

    it.prototype.openModal = function openModal() {
      var t = document.getElementById("hue-modal");document.getElementsByClassName("close")[0].onclick = function () {
        t.style.display = "none";
      }, t.style.display = "block", this.isModalOpen = !0;
    };

    it.prototype.startSetup = function startSetup() {
      var t = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (e) {
        t.linkBridge(e.internalipaddress);
      });
    };

    it.prototype.onConnect = function onConnect() {
      var _this5 = this;

      this.currentUser.getConfig().then(function (t) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this5.openAudioMc.getHueConfiguration().setBridgeName(t.name), _this5.currentUser.getLights().then(function (t) {
          var e = [];for (var _n in t) {
            t.hasOwnProperty(_n) && e.push({ name: t[_n].name, id: parseInt(_n) });
          }_this5.openAudioMc.getHueConfiguration().setLightNamesAndIds(e);null != Cookies.get("hue-state") && (_this5.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this5.openAudioMc.getHueConfiguration().applyState(), _this5.openAudioMc.getHueConfiguration().updateState();
        }), _this5.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    it.prototype.updateSelector = function updateSelector(t) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = t;
      }, 200);
    };

    it.prototype.colorToHueHsv = function colorToHueHsv(t) {
      var e = this.color(t).toHSV();return { on: 0 != 2 * e.alpha * 127.5, hue: J(65535 * e.hue / 360), sat: J(255 * e.saturation), bri: X(2 * e.alpha * 127.5) };
    };

    it.prototype.setLight = function setLight(t, e) {
      var _this6 = this;

      var n = [];if ("number" == typeof t) {
        var _e6 = this.openAudioMc.getHueConfiguration().getBulbStateById(t - 1);if (-1 === _e6) return !1;n.push(_e6);
      } else if (t.startsWith("[")) JSON.parse(t).forEach(function (t) {
        var e = _this6.openAudioMc.getHueConfiguration().getHueIdFromId(t - 1);return -1 !== e && void n.push(e);
      });else {
        var _e7 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(t) - 1);if (-1 === _e7) return !1;n.push(_e7);
      }n.forEach(function (t) {
        _this6.currentUser.setLightState(t, _this6.colorToHueHsv(e)).then(function () {});
      });
    };

    it.prototype.linkBridge = function linkBridge(t, e) {
      var _this7 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == e && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(t).user(this.options.userid), void this.currentUser.getGroups().then(function (e) {
        null != e[0] && null == e[0].error ? _this7.linkBridge(t, "error") : (_this7.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this7.isLinked = !0, _this7.onConnect());
      });if (this.currentBridge = this.hue.bridge(t), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var n = this;var i = 0,
          r = -1;r = setInterval(function () {
        function t() {
          clearInterval(r);
        }if (i++, 60 < i) return t(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this7.startSetup();
        }, void _this7.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var e = 60 - i;document.getElementById("hue-linking-message").innerText = _this7.openAudioMc.getMessages().hueLinking.replace("%sec%", e), n.currentBridge.createUser("OpenAudioMc#WebClient").then(function (e) {
          null == e[0].error ? null != e[0].success && (n.currentUser = n.currentBridge.user(e[0].success.username), _this7.openAudioMc.log("Linked with hue bridge after " + i + " attempt(s)."), n.isLinked = !0, n.onConnect(), t()) : 101 === e[0].error.type || (t(), _this7.openAudioMc.log("Unexpected error while connecting: " + e[0].error.type));
        });
      }, 1e3);
    };

    return it;
  }();

  var rt = function () {
    function rt(t) {
      _classCallCheck(this, rt);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    rt.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    rt.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    rt.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.sounds.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _t7 = _step3.value;
          return !0;
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

      return !1;
    };

    rt.prototype.addSound = function addSound(t) {
      this.sounds.push(t);var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _t8 = _step4.value;
          _t8.registerMixer(this.mixer, this);
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

      this._updateVolume();
    };

    rt.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    rt.prototype.registerMixer = function registerMixer(t) {
      this.mixer = t;var _iteratorNormalCompletion5 = true;
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
    };

    rt.prototype.fadeChannel = function fadeChannel(t, e, n) {
      var _this8 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = t, this.isFading = !0, function (t, e, i, r) {
        e = e || 1e3, i = i || 0, r = r;var o = _this8.channelVolume,
            s = e / Y(o - i),
            a = setInterval(function () {
          o = o > i ? o - 1 : o + 1;var t = _this8.mixer.masterVolume,
              e = o / 100 * t;var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = _this8.sounds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _t11 = _step6.value;
              _t11.setVolume(e);
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

          if (_this8.channelVolume = o, o == i) {
            n(), clearInterval(a);var _t10 = _this8.fadeTimer.indexOf(a);-1 < _t10 && _this8.fadeTimer.splice(_t10, 1), _this8.isFading = !1, a = null;
          }
        }, s);_this8.fadeTimer.push(a);
      }(0, e, t, n);
    };

    rt.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.fadeTimer[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _t12 = _step7.value;
            clearInterval(_t12);
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
      }
    };

    rt.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.sounds[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _t13 = _step8.value;
          _t13.setVolume(e);
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
    };

    rt.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var t = this.mixer.masterVolume,
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

    rt.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _t15 = _step10.value;
          _t15.destroy();
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

    return rt;
  }();

  var ot = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (ot.arrayBuffer) var st = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      at = ArrayBuffer.isView || function (t) {
    return t && -1 < st.indexOf(Object.prototype.toString.call(t));
  };a.prototype.append = function (t, e) {
    t = r(t), e = o(e);var n = this.map[t];this.map[t] = n ? n + ", " + e : e;
  }, a.prototype.delete = function (t) {
    delete this.map[r(t)];
  }, a.prototype.get = function (t) {
    return t = r(t), this.has(t) ? this.map[t] : null;
  }, a.prototype.has = function (t) {
    return this.map.hasOwnProperty(r(t));
  }, a.prototype.set = function (t, e) {
    this.map[r(t)] = o(e);
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
  }, ot.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);var ut = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];d.prototype.clone = function () {
    return new d(this, { body: this._bodyInit });
  }, f.call(d.prototype), f.call(g.prototype), g.prototype.clone = function () {
    return new g(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new a(this.headers), url: this.url });
  }, g.error = function () {
    var t = new g(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var ct = [301, 302, 303, 307, 308];g.redirect = function (t, e) {
    if (-1 === ct.indexOf(e)) throw new RangeError("Invalid status code");return new g(null, { status: e, headers: { location: t } });
  };var lt = self.DOMException;try {
    new lt();
  } catch (e) {
    (lt = function lt(t, e) {
      this.message = t, this.name = e;var n = Error(t);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), lt.prototype.constructor = lt;
  }v.polyfill = !0, self.fetch || (self.fetch = v, self.Headers = a, self.Request = d, self.Response = g);var ht = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", SERVER_STATUS: "https://client.openaudiomc.net/status?referee=", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var ft = function () {
    function ft(t, e, n, i) {
      _classCallCheck(this, ft);

      this.publicServerKey = t, this.uuid = e, this.name = n, this.token = i;
    }

    ft.prototype.initialize = function initialize() {
      return new Promise(function (t) {
        var e = window.location.href;if (null != e) {
          if (2 <= e.split("?").length) {
            var _n2 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(t) {
                if (-1 == t.indexOf("&")) return {};var e = t.split("&");var n = {};for (var _t16 = 0; _t16 < e.length; _t16++) {
                  var _i3 = e[_t16].split("="),
                      _r2 = decodeURIComponent(_i3[0]),
                      _o4 = decodeURIComponent(_i3[1]);void 0 === n[_r2] ? n[_r2] = decodeURIComponent(_o4) : "string" == typeof n[_r2] ? n[_r2] = [n[_r2], decodeURIComponent(_o4)] : n[_r2].push(decodeURIComponent(_o4));
                }return n;
              };

              return _class;
            }().getParametersFromUrl(e.split("?")[1]);if (null == _n2.data) return void t(null);var _i2 = atob(_n2.data).split(":");if (4 !== _i2.length) return t(null), null;var _r = _i2[0],
                _o3 = _i2[1],
                _s = _i2[2],
                _a = _i2[3];null != _r && 16 >= _r.length && null != _o3 && 40 >= _o3.length && null != _s && 40 >= _s.length && null != _a && 5 >= _a.length || t(null);var _u2 = new ft(_s, _o3, _r, _a);window.tokenCache = _u2, t(_u2);
          } else if (2 <= e.split("#").length) {
            var _n3 = e.split("#")[1];v(ht.CLIENT_SESSION_SERVER + "?token=" + _n3).then(function (e) {
              e.json().then(function (e) {
                if (0 < e.errors.length) return console.log("Session error"), void t(null);var n = e.response;null == n.hasOwnProperty("serverIdentity") ? (y("No identity to fetch"), document.getElementById("top-head").src = "https://minotar.net/helm/" + n.playerName) : (y("Loading identity"), function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, e) {
                    var n, i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            y("Fetching identity..");_context.next = 3;
                            return v("https://cloud.openaudiomc.net/identity?token=" + t);

                          case 3:
                            n = _context.sent;
                            _context.next = 6;
                            return n.json();

                          case 6:
                            i = _context.sent;
                            return _context.abrupt("return", 0 < i.errors.length ? void console.error("Could not load identity " + t) : (document.querySelector("link[rel*='icon']").href = i.response.icon + "&name=" + e, document.getElementById("top-head").src = i.response.icon + "&name=" + e, y("Native minecraft version: " + i.response.version), void y("Minecraft motd: " + i.response.motd)));

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
                }));var i = new ft(n.publicKey, n.playerUuid, n.playerName, n.session);window.tokenCache = i, t(i);
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

    ft.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return ft;
  }();

  var dt = { PROXY: ht.CONTENT_PROXY, YOUTUBE: ht.YOUTUBE_PROXY, SOUNDCLOUD: ht.SOUNDCLOUD_PROXY, DRIVE: ht.DRIVE_PROXY };
  var pt = function () {
    function pt() {
      _classCallCheck(this, pt);
    }

    pt.prototype.translate = function translate(t) {
      var e = t = function (t) {
        if (t.startsWith("[") && t.endsWith("]")) {
          var _e8 = JSON.parse(t);return _e8[J(Math.random() * _e8.length)];
        }return t;
      }(t);try {
        if (e.includes("media.openaudiomc.net")) return t;if (e = e.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !e.includes("http")) return null;if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", dt.DRIVE)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", dt.DRIVE)), e.includes("https://drive.google.com/") && (e = e.split("file/d/")[1], e = dt.DRIVE + e.split("/view")[0]), this.isYoutube = !1, e.includes("youtube.")) {
          var _t17 = e.split("v=")[1];e = dt.YOUTUBE + _t17, this.isYoutube = !0;
        } else if (e.includes("youtu.be")) {
          var _t18 = e.split(".be/")[1];e = dt.YOUTUBE + _t18, this.isYoutube = !0;
        }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (e = dt.SOUNDCLOUD + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = dt.PROXY + e);
      } catch (n) {
        return console.log("Middleware error"), console.log(n), t;
      }var n = new ft().fromCache();return e += e.includes("?") ? "&openAudioPlayerName=" + n.name : "?openAudioPlayerName=" + n.name, e += "&openAudioToken=" + n.token, e += "&openAudioPublicServerKey=" + n.publicServerKey, e;
    };

    return pt;
  }();

  var mt = {},
      gt = new pt();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var t = {};return Object.getOwnPropertyNames(this).forEach(function (e) {
        t[e] = this[e];
      }, this), t;
    }, configurable: !0, writable: !0 });
  var vt = function (_pt) {
    _inherits(vt, _pt);

    function vt(t) {
      var _this9;

      _classCallCheck(this, vt);

      (_this9 = _possibleConstructorReturn(this, _pt.call(this)), _this9), t = _this9.translate(t), _this9.soundElement = function (t) {
        t = gt.translate(t);var e = mt[t];return null == e ? new Audio() : e;
      }(t), _this9.hadError = !1, _this9.source = t, _this9.error = null, _this9.trackable = !1, _this9.soundElement.onerror = function (t) {
        _this9.hadError = !0, _this9.error = t, _this9._handleError();
      }, _this9.soundElement.src = t, _this9.soundElement.setAttribute("preload", "auto"), _this9.soundElement.setAttribute("controls", "none"), _this9.soundElement.setAttribute("display", "none"), _this9.soundElement.preload = "auto", _this9.soundElement.abort = console.log, _this9.openAudioMc = null, _this9.onFinish = [], _this9.loop = !1, _this9.mixer = null, _this9.channel = null, _this9.finsishedInitializing = !1, _this9.gotShutDown = !1;return _this9;
    }

    vt.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    vt.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var e = this.soundElement.error.code,
            _n4 = null;if (this.isYoutube ? _n4 = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === e ? _n4 = "MEDIA_ERR_ABORTED" : 2 === e ? _n4 = "MEDIA_ERR_NETWORK" : 3 === e ? _n4 = "MEDIA_ERR_DECODE" : 4 === e && (_n4 = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != _n4) {
          console.log("[OpenAudioMc] Reporting media failure " + _n4);var t = function t(_t19, e, n) {
            var i = {};return Object.getOwnPropertyNames(_t19).forEach(function (e) {
              i[e] = _t19[e];
            }), JSON.stringify(i, e, n);
          };null != this.source && "null" != this.source && this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + _n4 + "\ndump=" + t(this.error, null, "\t") + t(this.soundElement.error, null, "\t") + "\nhostname=" + window.location.host + "\nuseragent=" + window.navigator.userAgent), this.openAudioMc.socketModule.send("media_failure", { mediaError: _n4, source: this.soundElement.src });
        }
      }
    };

    vt.prototype.addNode = function addNode(t, e) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = dt.PROXY + this.soundElement.src), this.controller = t.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(e);
    };

    vt.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    vt.prototype.finalize = function finalize() {
      var _this10 = this;

      return new Promise(function (t) {
        _this10.soundElement.onended = function () {
          _this10.gotShutDown || !_this10.finsishedInitializing || (_this10.onFinish.forEach(function (t) {
            t();
          }), _this10.loop ? (_this10.setTime(0), _this10.soundElement.play()) : (_this10.mixer.removeChannel(_this10.channel), !_this10.soundElement.paused && _this10.soundElement.pause()));
        };var e = !1;var n = function n() {
          if (!_this10.gotShutDown) {
            if (!e) {
              var _e9 = _this10.soundElement.play();_e9 instanceof Promise ? _e9.then(t).catch(t) : t();
            }e = !0;
          }
        };_this10.soundElement.onplay = function () {
          _this10.gotShutDown && (console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason."), _this10.soundElement.pause());
        }, _this10.soundElement.onprogress = n, _this10.soundElement.oncanplay = n, _this10.soundElement.oncanplaythrough = n;
      });
    };

    vt.prototype.setLooping = function setLooping(t) {
      this.loop = t;
    };

    vt.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    vt.prototype.setOnFinish = function setOnFinish(t) {
      this.onFinish.push(t);
    };

    vt.prototype.setVolume = function setVolume(t) {
      100 < t && (t = 100), this.soundElement.volume = t / 100;
    };

    vt.prototype.startDate = function startDate(t) {
      var e = new Date(t),
          n = Y((e.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          i = this.soundElement.duration;if (n > i) {
        n -= J(n / i) * i;
      }this.setTime(n);
    };

    vt.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    vt.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return vt;
  }(pt);

  var yt = function () {
    function yt(t, e) {
      _classCallCheck(this, yt);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null;
    }

    yt.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var t = !1;this.channels.forEach(function (e) {
        e.hasSoundPlaying() && (t = !0);
      }), t != this.areSoundsPlaying && (this._playingStateChangeChanged(t), this.areSoundsPlaying = t);
    };

    yt.prototype._playingStateChangeChanged = function _playingStateChangeChanged(t) {
      null == this.ambianceSoundMedia || (t ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    yt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      var e = new rt("ambiance-lol-dics"),
          n = new vt(t);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), e.mixer = { masterVolume: this.masterVolume }, e.addSound(n), this.ambianceSoundMedia = e, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    yt.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, n) {
        var i = [];e.tags.forEach(function (t, e) {
          i.push(e);
        }), e.trackable && t.push({ name: n, tags: i });
      }), this._updatePlayingSounds();
    };

    yt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.channels.values()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t20 = _step11.value;
          _t20.updateFromMasterVolume();
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

      null != this.ambianceSoundMedia && (this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.updateFromMasterVolume(t));
    };

    yt.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof rt ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this._updatePlayingSounds();
    };

    yt.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    yt.prototype.addChannel = function addChannel(t) {
      if (!(t instanceof rt)) throw new Error("Argument isn't a channel");{
        var e = t.channelName,
            _n5 = this.channels.get(e);null != _n5 && _n5.destroy(), t.registerMixer(this), this.channels.set(e, t);
      }this._updatePlayingSounds();
    };

    return yt;
  }();

  var bt = function () {
    function bt(t) {
      var _this11 = this;

      _classCallCheck(this, bt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.startSound = null, this.mixer = new yt(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this11.setMasterVolume(t), Cookies.set("volume", t);
      };
    }

    bt.prototype.startVolumeMonitor = function startVolumeMonitor() {
      var _this12 = this;

      var t = -1;setInterval(function () {
        t != _this12.masterVolume && (t = _this12.masterVolume, _this12.openAudioMc.socketModule.send("volume_changed", { volume: _this12.masterVolume }));
      }, 300);
    };

    bt.prototype.setupAmbianceSound = function setupAmbianceSound(t) {
      "" == t || null == t || this.mixer.setupAmbianceSound(t);
    };

    bt.prototype.postBoot = function postBoot() {
      var _this13 = this;

      if (setTimeout(this.startVolumeMonitor, 300), null != this.startSound) {
        var _t21 = new rt("startsound"),
            e = new vt(this.startSound);e.openAudioMc = this.openAudioMc, e.setOa(this.openAudioMc), e.setOnFinish(function () {
          setTimeout(function () {
            _this13.mixer._updatePlayingSounds();
          }, 1e3);
        }), e.finalize().then(function () {
          _this13.mixer.addChannel(_t21), _t21.addSound(e), _t21.setChannelVolume(100), _t21.updateFromMasterVolume(), e.finish();
        });
      } else setTimeout(function () {
        _this13.mixer._updatePlayingSounds();
      }, 500);
    };

    bt.prototype.destroySounds = function destroySounds(t, e, n, i) {
      var _this14 = this;

      var r = i;null == r && (r = 500), n && (r = 0);var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        var _loop = function _loop() {
          var n = _step12.value;
          e ? n.fadeChannel(0, r, function () {
            _this14.mixer.removeChannel(n);
          }) : null == t || "" === t ? n.hasTag("SPECIAL") || n.hasTag("REGION") || n.hasTag("SPEAKER") || n.fadeChannel(0, r, function () {
            _this14.mixer.removeChannel(n);
          }) : n.hasTag(t) && (n.sounds.forEach(function (t) {
            t.gotShutDown = !0;
          }), n.fadeChannel(0, r, function () {
            _this14.mixer.removeChannel(n);
          }));
        };

        for (var _iterator12 = this.mixer.getChannels()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          _loop();
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
    };

    bt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, 0 === t ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + t + "%", Cookies.set("volume", t), this.mixer.setMasterVolume(t);
    };

    bt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    bt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return bt;
  }();

  var wt = function () {
    function wt(t, e) {
      var _this15 = this;

      _classCallCheck(this, wt);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], null == new ft().fromCache()) return console.log("Empty authentication"), void i(et.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token;var n = this;this.socket = io(e, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.socketModule.state = "ok", _this15.hasConnected = !0, _this15.outgoingQueue.forEach(function (t) {
          _this15.send(t.key, t.value);
        });
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            n = parseInt(e[1]),
            i = parseInt(e[0]);_this15.openAudioMc.getTimeService().sync(i, n);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), n.state = "closed", t.voiceModule.handleSocketClosed(), i(et.BAD_AUTH), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (t) {
        var e = t.type.split("."),
            i = e[e.length - 1];null != n.handlers[i] && n.handlers[i](t.payload);
      }), this.socket.on("join-call", function (e) {
        var n = e.room,
            i = e.server,
            r = e.accessToken,
            o = e.members,
            s = [];var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = o[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _t22 = _step13.value;
            s.push(_t22.name);
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

        t.voiceModule.promptCall(i, n, r, s, o);
      }), this.socket.on("resub-to-player-in-call", function (e) {
        var n = t.voiceModule.room;null != n && n.resubToPlayer(e);
      }), this.socket.on("member-left-call", function (e) {
        var n = t.voiceModule.room;null != n && n.handleMemberLeaving(e);
      }), this.socket.connect();
    }

    wt.prototype.send = function send(t, e) {
      this.hasConnected ? this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + t), this.socket.emit(t, e)) : console.log("[OpenAudioMc] could not satisfy callback " + t + " because the protocol is outdated") : this.outgoingQueue.push({ key: t, value: e });
    };

    wt.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return wt;
  }();

  var xt = [],
      St = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t23 = xt.length; _t23--;) {
        clearInterval(xt[_t23]);
      }xt = [];
    }(), E(this + "");
  };
  var Et = function () {
    function Et(t) {
      _classCallCheck(this, Et);

      null != t && this.fromJson(t);
    }

    Et.prototype.fromJson = function fromJson(t) {
      document.getElementById("card-panel").style.display = "", this.lines = [], this.title = t.title;var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = t.rows[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _e10 = _step14.value;
          this.lines.push(this.rowToHtml(_e10));
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

      document.getElementById("card-title").innerText = this.title;var e = "";this.lines.forEach(function (t) {
        e += t;
      }), document.getElementById("card-content").innerHTML = e;
    };

    Et.prototype.replaceWithJson = function replaceWithJson(t, e) {
      document.getElementById(t).replaceWith(new DOMParser().parseFromString(this.partToHtml(e), "text/html").body.childNodes[0]);
    };

    Et.prototype.rowToHtml = function rowToHtml(t) {
      var e = "";var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = t.textList[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _n6 = _step15.value;
          e += this.partToHtml(_n6);
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

      return e;
    };

    Et.prototype.partToHtml = function partToHtml(t) {
      var e = "",
          n = [],
          i = [];n.push("<p id='" + t.id + "'>"), i.push("</p>");var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = t.styles[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _e11 = _step16.value;
          "BOLD" === _e11 ? (n.push("<b>"), i.push("</b>")) : "ITALLIC" === _e11 ? (n.push("<i>"), i.push("</i>")) : "UNDERLINE" === _e11 && (n.push("<u>"), i.push("</u>"));
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

      null != t.hyperlink && "" != t.hyperlink && (n.push("<a href='" + t.hyperlink + "'>"), i.push("</a>"));var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = n[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var _t24 = _step17.value;
          e += _t24;
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

      t.text = t.text.split("&").join("&"), E(t.text).childNodes.forEach(function (t) {
        e += t.outerHTML;
      });var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = i[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _t25 = _step18.value;
          e += _t25;
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

      return e;
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
          i = this.z,
          r = t.x,
          o = t.y,
          s = t.z,
          a = t.w,
          u = a * e + o * i - s * n,
          c = a * n + s * e - r * i,
          l = a * i + r * n - o * e,
          h = -r * e - o * n - s * i;return this.x = u * a + h * -r + c * -s - l * -o, this.y = c * a + h * -o + l * -r - u * -s, this.z = l * a + h * -s + u * -o - c * -r, this;
    };

    Mt.prototype.square = function square(t) {
      return t * t;
    };

    Mt.prototype.distance = function distance(t) {
      var e = this.square(this.x - t.x) + this.square(this.y - t.y) + this.square(this.z - t.z);return Math.sqrt(e);
    };

    return Mt;
  }();

  var _t = function () {
    function _t(t, e, n, i, r, o, s) {
      _classCallCheck(this, _t);

      this.id = t, this.source = e, this.location = n, this.type = i, this.maxDistance = r, this.startInstant = o, this.openAudioMc = s, this.channel = null;
    }

    _t.prototype.getDistance = function getDistance(t, e) {
      return e.location.distance(this.location);
    };

    return _t;
  }();

  var At = function At(t) {
    _classCallCheck(this, At);

    function e(e, n) {
      t.socketModule.registerHandler(e, function (e) {
        return n(t, e);
      });
    }e("ClientCreateMediaPayload", b), e("ClientDestroyCardPayload", w), e("ClientUpdateCardPayload", M), e("ClientCreateCardPayload", _), e("NotificationPayload", A), e("ClientVersionPayload", k), e("ClientVolumePayload", I), e("ClientDestroyMediaPayload", T), e("HueColorPayload", O), e("ClientUpdateMediaPayload", C), e("ClientPlayerLocationPayload", P), e("ClientSpeakerCreatePayload", B), e("ClientSpeakerDestroyPayload", F), e("ClientPreFetchPayload", N);
  };

  var kt = function () {
    function kt() {
      var _this16 = this;

      _classCallCheck(this, kt);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this16.select();
        };
      });
    }

    kt.prototype.setBridgeName = function setBridgeName(t) {
      document.getElementById("bridge-name").innerText = t;
    };

    kt.prototype.select = function select() {
      this.updateState();
    };

    kt.prototype.applyState = function applyState() {
      var _this17 = this;

      this.state.forEach(function (t) {
        _this17.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    kt.prototype.updateState = function updateState() {
      var _this18 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this18.state.push(_this18.obtainSelection(t));
      }), Cookies.set("hue-state", this.state);
    };

    kt.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          n = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: n };
    };

    kt.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    kt.prototype.getInputById = function getInputById(t) {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.dropdowns[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var e = _step19.value;
          if (e.dataset.bulb == t) return e;
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

    kt.prototype.getHueIdFromId = function getHueIdFromId(t) {
      return this.state[parseInt(t)].value;
    };

    kt.prototype.setLightNamesAndIds = function setLightNamesAndIds(t) {
      var e = "";t.forEach(function (t) {
        e += "<option data-light='" + t.id + "'>" + t.name + "</option>";
      }), this.dropdowns.forEach(function (t) {
        t.innerHTML = e;
      });
    };

    return kt;
  }();

  var It = function () {
    function It(t) {
      _classCallCheck(this, It);

      this.host = t;
    }

    It.prototype.route = function route(t) {
      var _this19 = this;

      return new Promise(function (e, n) {
        _this19.tokenSet = new ft().fromCache(), v("https://cloud.openaudiomc.net/api/v2/account-services/client/login/" + _this19.tokenSet.publicServerKey).then(function (i) {
          i.json().then(function (i) {
            function r(t, e) {
              var n = t.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + "," + e / 100 + ")";
            }if (null == i.errors || 0 != i.errors.length) return n(i.errors), void console.log(i.errors);var o = i.response;if (o.banned) return void R("Declined connection due to ban " + window.location.host, "Steve", function () {
              window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
            });var s = o.secureEndpoint,
                a = o.ambianceSound;console.log("[OpenAudioMc] accepting and applying settings"), t.debugPrint("Updating settings..."), null != o.backgroundImage && "" != o.backgroundImage && (o.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + o.backgroundImage);var u = o.backgroundImage;"" !== u && (document.getElementById("banner-image").src = u);var c = o.title,
                l = o.clientWelcomeMessage,
                h = o.clientErrorMessage;var f = "";E(h).childNodes.forEach(function (t) {
              f += t.outerHTML;
            });var d = "";E(l).childNodes.forEach(function (t) {
              d += t.outerHTML;
            }), "" !== h && (t.getMessages().errorMessage = f), "" !== l && (t.getMessages().welcomeMessage = d);var p = o.greetingMessage;p = p.replace("%name", t.tokenSet.name), document.getElementById("initialize-text").innerHTML = p, document.getElementById("initialize-button").innerHTML = o.connectButtonText, document.documentElement.style.setProperty("--border-color-dark", o.accentColor);var m = r(o.accentColor, 70),
                g = r(o.accentColor, 40);if (document.documentElement.style.setProperty("--border-color-normal", m), document.documentElement.style.setProperty("--border-color-light", g), t.getUserInterfaceModule().changeColor("#2c78f6", o.accentColor), "" != o.startSound && (t.getMediaManager().startSound = o.startSound), "default" !== c) {
              document.title = c;try {
                parent.document.title = c;
              } catch (t) {}
            }e({ host: s, background: u, ambianceSound: a });
          }).catch(function (t) {
            console.log("Dead end 1"), n(t);
          });
        }).catch(function (t) {
          console.log("Dead end 2"), n(t);
        });
      });
    };

    return It;
  }();

  var Tt = function (_nt) {
    _inherits(Tt, _nt);

    function Tt(t, e, n) {
      var _this20;

      _classCallCheck(this, Tt);

      (_this20 = _possibleConstructorReturn(this, _nt.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this20), _this20.room = t, _this20.username = e, _this20.isMuted = !1, _this20.member = n;var i = '<img class="call-box" src="https://minotar.net/helm/' + e + '" />';i += '<div class="call-content" id="user-box-content-' + e + '">', i += '<div style="text-align: center;"><p>(loading)</p></div>', i += "</div>", _this20.show(i, !0), _this20.setUsernameAsContent(), document.getElementById("user-box-content-" + _this20.username).onmouseenter = function () {
        _this20.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onmouseout = function () {
        _this20.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onclick = function () {
        _this20.room.main.tokenSet.name !== _this20.username && _this20.onClickHandler();
      };return _this20;
    }

    Tt.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    Tt.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    Tt.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return Tt;
  }(nt);

  L.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, L.prototype.compileInterpolationFunction = function () {
    for (var t = "var bufferLength = Math.min(buffer.length, this.outputBufferSize);\tif ((bufferLength % " + this.channels + ") == 0) {\t\tif (bufferLength > 0) {\t\t\tvar ratioWeight = this.ratioWeight;\t\t\tvar weight = 0;", e = 0; e < this.channels; ++e) {
      t += "var output" + e + " = 0;";
    }for (t += "var actualPosition = 0;\t\t\tvar amountToNext = 0;\t\t\tvar alreadyProcessedTail = !this.tailExists;\t\t\tthis.tailExists = false;\t\t\tvar outputBuffer = this.outputBuffer;\t\t\tvar outputOffset = 0;\t\t\tvar currentPosition = 0;\t\t\tdo {\t\t\t\tif (alreadyProcessedTail) {\t\t\t\t\tweight = ratioWeight;", e = 0; e < this.channels; ++e) {
      t += "output" + e + " = 0;";
    }for (t += "}\t\t\t\telse {\t\t\t\t\tweight = this.lastWeight;", e = 0; e < this.channels; ++e) {
      t += "output" + e + " = this.lastOutput[" + e + "];";
    }for (t += "alreadyProcessedTail = true;\t\t\t\t}\t\t\t\twhile (weight > 0 && actualPosition < bufferLength) {\t\t\t\t\tamountToNext = 1 + actualPosition - currentPosition;\t\t\t\t\tif (weight >= amountToNext) {", e = 0; e < this.channels; ++e) {
      t += "output" + e + " += buffer[actualPosition++] * amountToNext;";
    }for (t += "currentPosition = actualPosition;\t\t\t\t\t\tweight -= amountToNext;\t\t\t\t\t}\t\t\t\t\telse {", e = 0; e < this.channels; ++e) {
      t += "output" + e + " += buffer[actualPosition" + (0 < e ? " + " + e : "") + "] * weight;";
    }for (t += "currentPosition += weight;\t\t\t\t\t\tweight = 0;\t\t\t\t\t\tbreak;\t\t\t\t\t}\t\t\t\t}\t\t\t\tif (weight == 0) {", e = 0; e < this.channels; ++e) {
      t += "outputBuffer[outputOffset++] = output" + e + " / ratioWeight;";
    }for (t += "}\t\t\t\telse {\t\t\t\t\tthis.lastWeight = weight;", e = 0; e < this.channels; ++e) {
      t += "this.lastOutput[" + e + "] = output" + e + ";";
    }t += 'this.tailExists = true;\t\t\t\t\tbreak;\t\t\t\t}\t\t\t} while (actualPosition < bufferLength);\t\t\treturn this.bufferSlice(outputOffset);\t\t}\t\telse {\t\t\treturn (this.noReturn) ? 0 : [];\t\t}\t}\telse {\t\tthrow(new Error("Buffer was of incorrect sample length."));\t}', this.interpolate = Function("buffer", t);
  }, L.prototype.bypassResampler = function (t) {
    return this.noReturn ? (this.outputBuffer = t, t.length) : t;
  }, L.prototype.bufferSlice = function (t) {
    if (this.noReturn) return t;try {
      return this.outputBuffer.subarray(0, t);
    } catch (e) {
      try {
        return this.outputBuffer.length = t, this.outputBuffer;
      } catch (e) {
        return this.outputBuffer.slice(0, t);
      }
    }
  }, L.prototype.initializeBuffers = function () {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
    } catch (t) {
      this.outputBuffer = [], this.lastOutput = [];
    }
  }, D.prototype.MOZWriteAudio = function (t) {
    this.MOZWriteAudioNoCallback(t), this.MOZExecuteCallback();
  }, D.prototype.MOZWriteAudioNoCallback = function (t) {
    this.writeMozAudio(t);
  }, D.prototype.callbackBasedWriteAudio = function (t) {
    this.callbackBasedWriteAudioNoCallback(t), this.callbackBasedExecuteCallback();
  }, D.prototype.callbackBasedWriteAudioNoCallback = function (t) {
    if (t) for (var e = t.length, n = 0; n < e && Ht < Lt;) {
      Ft[Ht++] = t[n++];
    }
  }, D.prototype.writeAudio = function (t) {
    0 == this.audioType ? this.MOZWriteAudio(t) : 1 == this.audioType ? this.callbackBasedWriteAudio(t) : 2 == this.audioType && (this.checkFlashInit() || Bt ? this.callbackBasedWriteAudio(t) : this.mozAudioFound && this.MOZWriteAudio(t));
  }, D.prototype.writeAudioNoCallback = function (t) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(t) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(t) : 2 == this.audioType && (this.checkFlashInit() || Bt ? this.callbackBasedWriteAudioNoCallback(t) : this.mozAudioFound && this.MOZWriteAudioNoCallback(t));
  }, D.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (H() * Vt.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Ht;if (2 == this.audioType) {
      if (this.checkFlashInit() || Bt) return (H() * Vt.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Ht;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, D.prototype.MOZExecuteCallback = function () {
    var t = Rt - this.remainingBuffer();0 < t && this.writeMozAudio(this.underRunCallback(t));
  }, D.prototype.callbackBasedExecuteCallback = function () {
    var t = Rt - this.remainingBuffer();0 < t && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(t));
  }, D.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || Bt ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
  }, D.prototype.initializeAudio = function () {
    try {
      if (this.preInitializeMozAudio(), "Linux i686" == navigator.platform) throw new Error("");this.initializeMozAudio();
    } catch (t) {
      try {
        this.initializeWebAudio();
      } catch (t) {
        try {
          this.initializeFlashAudio();
        } catch (t) {
          throw new Error("Browser does not support real time audio output.");
        }
      }
    }
  }, D.prototype.preInitializeMozAudio = function () {
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, jt), this.samplesAlreadyWritten = 0;var t = 2 == this.audioChannels ? [0, 0] : [0],
        e = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        e += this.audioHandleMoz.mozWriteAudio(t);
      }for (var n = e / this.audioChannels, i = 0; i < n; i++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(t);
      }
    }this.samplesAlreadyWritten += e, Rt += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, D.prototype.initializeMozAudio = function () {
    this.writeMozAudio(j(Rt)), this.audioType = 0;
  }, D.prototype.initializeWebAudio = function () {
    if (!Bt) throw new Error("");W(Dt), this.audioType = 1;
  }, D.prototype.initializeFlashAudio = function () {
    var t = document.getElementById("XAudioJS");if (null == t) {
      var e = this,
          n = document.createElement("div");n.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var i = document.createElement("div");i.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), i.setAttribute("id", "XAudioJS"), n.appendChild(i), document.getElementsByTagName("body")[0].appendChild(n), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (t) {
        t.success ? e.audioHandleFlash = t.ref : e.audioType = 1;
      });
    } else this.audioHandleFlash = t;this.audioType = 2;
  }, D.prototype.writeMozAudio = function (t) {
    if (t) {
      var e = this.mozAudioTail.length;if (0 < e) {
        var n = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += n, this.mozAudioTail.splice(0, n);
      }e = $(t.length, Lt - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());n = this.audioHandleMoz.mozWriteAudio(t);this.samplesAlreadyWritten += n;for (var i = 0; e > n; --e) {
        this.mozAudioTail.push(t[i++]);
      }
    }
  }, D.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, zt), W(44100)), this.flashInitialized;
  };var Ot,
      Ct,
      Pt = 2048,
      Bt = !1,
      Ft = [],
      Nt = [],
      Rt = 15e3,
      Lt = 25e3,
      Dt = 44100,
      jt = 0,
      Ut = !1,
      zt = 0,
      Vt = null,
      Ht = 0,
      Wt = 0,
      qt = 0,
      Gt = 2,
      Yt = L;!function (t) {
    t[t.VoIP = 2048] = "VoIP", t[t.Audio = 2049] = "Audio", t[t.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(Ot || (Ot = {})), function (t) {
    t[t.OK = 0] = "OK", t[t.BadArgument = -1] = "BadArgument", t[t.BufferTooSmall = -2] = "BufferTooSmall", t[t.InternalError = -3] = "InternalError", t[t.InvalidPacket = -4] = "InvalidPacket", t[t.Unimplemented = -5] = "Unimplemented", t[t.InvalidState = -6] = "InvalidState", t[t.AllocFail = -7] = "AllocFail";
  }(Ct || (Ct = {}));var Kt = function () {
    function t() {}return t.getVersion = function () {
      var t = _opus_get_version_string();return Pointer_stringify(t);
    }, t.getMaxFrameSize = function (t) {
      return void 0 === t && (t = 1), 3832 * t;
    }, t.getMinFrameDuration = function () {
      return 2.5;
    }, t.getMaxFrameDuration = function () {
      return 60;
    }, t.validFrameDuration = function (t) {
      return [2.5, 5, 10, 20, 40, 60].some(function (e) {
        return e == t;
      });
    }, t.getMaxSamplesPerChannel = function (e) {
      return e / 1e3 * t.getMaxFrameDuration();
    }, t;
  }(),
      Xt = function () {
    function t(t, e, n, i) {
      if (void 0 === i && (i = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !Kt.validFrameDuration(i)) throw "invalid frame duration";this.frame_size = t * i / 1e3;var r = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(t, e, n, r), 0 != getValue(r, "i32")) throw "opus_encoder_create failed: " + getValue(r, "i32");this.in_ptr = _malloc(this.frame_size * e * 4), this.in_len = this.frame_size * e, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = Kt.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return t.prototype.encode = function (t) {
      for (var e = [], n = 0; t.length - n >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_i16.set(t.subarray(n, n + this.in_len - this.in_off), this.in_off), n += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(t.subarray(n, n + this.in_len)), n += this.in_len);var i = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= i) throw "opus_encode failed: " + i;var r = new ArrayBuffer(i);new Uint8Array(r).set(this.out_buf.subarray(0, i)), e.push(r);
      }return n < t.length && (this.in_i16.set(t.subarray(n)), this.in_off = t.length - n), e;
    }, t.prototype.encode_float = function (t) {
      for (var e = [], n = 0; t.length - n >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_f32.set(t.subarray(n, n + this.in_len - this.in_off), this.in_off), n += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(t.subarray(n, n + this.in_len)), n += this.in_len);var i = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= i) throw "opus_encode failed: " + i;var r = new ArrayBuffer(i);new Uint8Array(r).set(this.out_buf.subarray(0, i)), e.push(r);
      }return n < t.length && (this.in_f32.set(t.subarray(n)), this.in_off = t.length - n), e;
    }, t.prototype.encode_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var t = this.in_off; t < this.in_len; ++t) {
        this.in_i16[t] = 0;
      }var e = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= e) throw "opus_encode failed: " + e;var n = new ArrayBuffer(e);return new Uint8Array(n).set(this.out_buf.subarray(0, e)), n;
    }, t.prototype.encode_float_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var t = this.in_off; t < this.in_len; ++t) {
        this.in_f32[t] = 0;
      }var e = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= e) throw "opus_encode failed: " + e;var n = new ArrayBuffer(e);return new Uint8Array(n).set(this.out_buf.subarray(0, e)), n;
    }, t.prototype.destroy = function () {
      this.handle && (_opus_encoder_destroy(this.handle), _free(this.in_ptr), this.handle = this.in_ptr = 0);
    }, t;
  }(),
      Jt = function () {
    function t(t, e) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = e;var n = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(t, e, n), 0 != getValue(n, "i32")) throw "opus_decoder_create failed: " + getValue(n, "i32");this.in_ptr = _malloc(Kt.getMaxFrameSize(e)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Kt.getMaxFrameSize(e)), this.out_len = Kt.getMaxSamplesPerChannel(t);var i = this.out_len * e * 4;this.out_ptr = _malloc(i), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + i >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + i >> 2);
    }return t.prototype.decode = function (t) {
      this.in_buf.set(new Uint8Array(t));var e = _opus_decode(this.handle, this.in_ptr, t.byteLength, this.out_ptr, this.out_len, 0);if (0 > e) throw "opus_decode failed: " + e;var n = new Int16Array(e * this.channels);return n.set(this.out_i16.subarray(0, n.length)), n;
    }, t.prototype.decode_float = function (t) {
      this.in_buf.set(new Uint8Array(t));var e = _opus_decode_float(this.handle, this.in_ptr, t.byteLength, this.out_ptr, this.out_len, 0);if (0 > e) throw "opus_decode failed: " + e;var n = new Float32Array(e * this.channels);return n.set(this.out_f32.subarray(0, n.length)), n;
    }, t.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, t;
  }();var $t = null;
  var Qt = function Qt() {
    _classCallCheck(this, Qt);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = $t;
  };

  var Zt = function (_Qt) {
    _inherits(Zt, _Qt);

    function Zt() {
      var _this21;

      _classCallCheck(this, Zt);

      (_this21 = _possibleConstructorReturn(this, _Qt.call(this)), _this21), _this21.queueSize = 5120, _this21.unstableSeconds = 0, _this21.stableSeconds = 0, _this21.minimalQueueSize = _this21.queueSize;_this21.defaultConfig.codec.sampleRate, _this21.defaultConfig.codec.bufferSize;_this21.perfectRate = 50, _this21.lowestAcceptable = _this21.perfectRate - 5, _this21.highestAcceptable = _this21.perfectRate + 5;return _this21;
    }

    Zt.prototype.isAcceptable = function isAcceptable(t) {
      return t >= this.lowestAcceptable && t <= this.highestAcceptable;
    };

    Zt.prototype.handleMeasurement = function handleMeasurement(t) {
      this.isAcceptable(t) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    Zt.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    Zt.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    Zt.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return Zt;
  }(Qt);

  var te = function () {
    function te(t) {
      var _this22 = this;

      _classCallCheck(this, te);

      this.ticks = 0, this.task = setInterval(function () {
        t(_this22.ticks), _this22.ticks = 0;
      }, 1e3);
    }

    te.prototype.tick = function tick() {
      this.ticks++;
    };

    te.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return te;
  }();

  var ee = function () {
    function ee() {
      var _this23 = this;

      _classCallCheck(this, ee);

      this.buffer = new Float32Array(0), this.processor = new Zt(), this.tickTimer = new te(function (t) {
        _this23.processor.handleMeasurement(t);
      });
    }

    ee.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    ee.prototype.write = function write(t, e) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var n = this.buffer.length;e = t.sampler.resampler(e);var i = new Float32Array(n + e.length);i.set(this.buffer, 0), i.set(e, n), this.buffer = i;
    };

    ee.prototype.read = function read(t) {
      var e = this.buffer.subarray(0, t);return this.buffer = this.buffer.subarray(t, this.buffer.length), e;
    };

    ee.prototype.length = function length() {
      return this.buffer.length;
    };

    ee.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return ee;
  }();

  var ne = function (_Qt2) {
    _inherits(ne, _Qt2);

    function ne(t, e) {
      var _this24;

      _classCallCheck(this, ne);

      (_this24 = _possibleConstructorReturn(this, _Qt2.call(this)), _this24), _this24.config = _this24.defaultConfig, _this24.config.codec = _this24.config.codec || _this24.defaultConfig.codec, _this24.config.server = _this24.config.server || _this24.defaultConfig.server, _this24.sampler = new Yt(_this24.config.codec.sampleRate, _this24.audioContext.sampleRate, 1, _this24.config.codec.bufferSize), _this24.parentSocket = e, _this24.decoder = new Jt(_this24.config.codec.sampleRate, _this24.config.codec.channels), _this24.silence = new Float32Array(_this24.config.codec.bufferSize);return _this24;
    }

    ne.prototype.start = function start() {
      var _this25 = this;

      this.audioQueue = new ee(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (t) {
        _this25.audioQueue.length() ? t.outputBuffer.getChannelData(0).set(_this25.audioQueue.read(_this25.config.codec.bufferSize)) : t.outputBuffer.getChannelData(0).set(_this25.silence);
      }, this.gainNode = this.audioContext.createGain(), this.scriptNode.connect(this.gainNode), this.gainNode.connect(this.audioContext.destination), this.socket = this.parentSocket, this.socket.onmessage = function (t) {
        if (t.data instanceof Blob) {
          _this25.audioQueue.tick();var e = new FileReader();e.onload = function () {
            _this25.audioQueue.write(_this25, _this25.decoder.decode_float(e.result));
          }, e.readAsArrayBuffer(t.data);
        }
      }, this.socketKeepAliveTimer = setInterval(function () {
        try {
          if (_this25.socket.readyState === WebSocket.CLOSED) return void clearInterval(_this25.socketKeepAliveTimer);_this25.socket.send("1");
        } catch (t) {
          clearInterval(_this25.socketKeepAliveTimer);
        }
      }, 1e3);
    };

    ne.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    ne.prototype.setVolume = function setVolume(t) {
      this.gainNode && (this.gainNode.gain.value = t);
    };

    ne.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return ne;
  }(Qt);

  var ie = function () {
    function ie(t, e) {
      _classCallCheck(this, ie);

      this.room = t, this.roomMember = e, this.isStopped = !1, this.player = new ne({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    ie.prototype.setVolume = function setVolume(t) {
      null != this.player && this.player.setVolume(t / 50);
    };

    ie.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return ie;
  }();

  var re = function re(t, e, n) {
    _classCallCheck(this, re);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, e, n) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
      return e(t);
    }).catch(function (t) {
      return n(t);
    }) : void navigator.webkitGetUserMedia(t, e, n) : void navigator.getUserMedia(t, e, n);
  };

  var oe = function (_nt2) {
    _inherits(oe, _nt2);

    function oe(t) {
      _classCallCheck(this, oe);

      var _this26 = _possibleConstructorReturn(this, _nt2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

      var e = [],
          n = !1;navigator.mediaDevices.enumerateDevices().then(function (t) {
        var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
          for (var _iterator20 = t[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
            var _i4 = _step20.value;
            "audioinput" == _i4.kind && ("" === _i4.label ? n = !0 : e.push({ name: _i4.label, id: _i4.deviceId }));
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
      }).then(function () {
        if (n) _this26.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br /><a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> </div>'), document.getElementById("request-mic-permissions").onclick = function () {
          new re({ audio: !0 }, function (e) {
            _this26.hide(), e.getTracks()[0].stop(), new oe(t);
          }, function (e) {
            console.log(e), _this26.hide(), _this26.deniedMessage(), t(null);
          });
        };else {
          null != _this26.requestBox && _this26.requestBox.hide();var _n7 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion21 = true;
          var _didIteratorError21 = false;
          var _iteratorError21 = undefined;

          try {
            for (var _iterator21 = e[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              var _t27 = _step21.value;
              _n7 += '<option value="' + _t27.id + '">' + _t27.name + "</option>";
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

          if (_n7 += "</select>", _this26.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?<br /><small>changes can take a second or two to apply</small><br />' + _n7 + '<div id="mic-loader" style="display:none;"><h2>Switching mic input. Please wait.</h2><div class="loader"></div></div></div>'), null != Cookies.get("default-mic")) {
            var _t26 = document.getElementById("select-mic-dropdown");for (var _e12 = 0; _e12 < _t26.options.length; _e12++) {
              _t26.options[_e12].innerText === Cookies.get("default-mic") && (_t26.options[_e12].selected = !0);
            }
          }document.getElementById("select-mic-dropdown").onchange = function (e) {
            document.getElementById("select-mic-dropdown").disabled = !0, document.getElementById("select-mic-dropdown").style.display = "none", document.getElementById("mic-loader").style.display = "", Cookies.set("default-mic", e.target.selectedOptions[0].childNodes[0].data), t(_this26.getId()), setTimeout(function () {
              document.getElementById("select-mic-dropdown").style.display = "", document.getElementById("mic-loader").style.display = "none", document.getElementById("select-mic-dropdown").disabled = !1;
            }, 6e3);
          }, t(_this26.getId());
        }
      }).catch(function (t) {
        return console.error(t);
      });return _this26;
    }

    oe.prototype.getId = function getId() {
      var t = document.getElementById("select-mic-dropdown");for (var e = 0; e < t.options.length; e++) {
        if (t.options[e].innerText == Cookies.get("default-mic")) return t.options[e].value;
      }return "default";
    };

    oe.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new nt("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return oe;
  }(nt);

  var se = function (_Qt3) {
    _inherits(se, _Qt3);

    function se(t, e) {
      var _this27;

      _classCallCheck(this, se);

      (_this27 = _possibleConstructorReturn(this, _Qt3.call(this)), _this27), _this27.config = t, _this27.config.codec = _this27.config.codec || _this27.defaultConfig.codec, _this27.sampler = new Yt(_this27.audioContext.sampleRate, _this27.config.codec.sampleRate, 1, _this27.config.codec.bufferSize), _this27.parentSocket = e, _this27.encoder = new Xt(_this27.config.codec.sampleRate, _this27.config.codec.channels, _this27.config.codec.app, _this27.config.codec.frameDuration);return _this27;
    }

    se.prototype._makeStream = function _makeStream(t) {
      var _this28 = this;

      new re({ audio: this.config.micId }, function (t) {
        _this28.stream = t, _this28.audioInput = _this28.audioContext.createMediaStreamSource(t), _this28.gainNode = _this28.audioContext.createGain(), _this28.recorder = _this28.audioContext.createScriptProcessor(_this28.config.codec.bufferSize, 1, 1), _this28.recorder.onaudioprocess = function (t) {
          var e = _this28.sampler.resampler(t.inputBuffer.getChannelData(0)),
              n = _this28.encoder.encode_float(e);for (var _t28 = 0; _t28 < n.length; _t28++) {
            1 === _this28.socket.readyState && _this28.socket.send(n[_t28]);
          }
        }, _this28.audioInput.connect(_this28.gainNode), _this28.gainNode.connect(_this28.recorder), _this28.recorder.connect(_this28.audioContext.destination);
      }, t || this.onError);
    };

    se.prototype.start = function start(t) {
      var _this29 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(t);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var e = this.socket.onopen;this.socket.onopen = function () {
          e && e(), _this29._makeStream(t);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this29._shutdown(), console.log("Disconnected from server");
      };
    };

    se.prototype.mute = function mute() {
      this.gainNode.gain.value = 0, console.log("Mic muted");
    };

    se.prototype.unMute = function unMute() {
      this.gainNode.gain.value = 1, console.log("Mic unmuted");
    };

    se.prototype.onError = function onError(t) {
      var e = new Error(t.name);throw e.name = "NavigatorUserMediaError", e;
    };

    se.prototype._shutdown = function _shutdown() {
      this.audioInput && (this.audioInput.disconnect(), this.audioInput = null), this.gainNode && (this.gainNode.disconnect(), this.gainNode = null), this.recorder && (this.recorder.disconnect(), this.recorder = null), null != this.stream && this.stream.getTracks().forEach(function (t) {
        t.stop();
      });
    };

    se.prototype.stop = function stop() {
      this._shutdown(), this.parentSocket || this.socket.close();
    };

    return se;
  }(Qt);

  var ae = function () {
    function ae(t) {
      var _this30 = this;

      _classCallCheck(this, ae);

      this.room = t, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new oe(function (t) {
        _this30.shutdown(), setTimeout(function () {
          _this30.micId = !(null != t) || t, _this30.start();
        }, 5e3);
      });
    }

    ae.prototype.mute = function mute() {
      this.isMuted = !0, this.streamer.mute();
    };

    ae.prototype.unMute = function unMute() {
      this.isMuted = !1, this.streamer.unMute();
    };

    ae.prototype.start = function start() {
      this.streamer = new se({ micId: this.micId }, new WebSocket(this.room.voiceServer.ws + "/stream?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&accessToken=" + this.room.accessToken)), this.streamer.start(), this.isRunning = !0;
    };

    ae.prototype.shutdown = function shutdown() {
      null != this.streamer && this.streamer.stop(), this.isRunning = !1;
    };

    return ae;
  }();

  var ue = function () {
    function ue(t, e, n) {
      _classCallCheck(this, ue);

      this.room = t, this.uuid = e, this.name = n, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new Tt(t, n, this), this.volume = t.main.mediaManager.getMasterVolume();
    }

    ue.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    ue.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new ie(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
    };

    ue.prototype.setVolume = function setVolume(t) {
      this.volume = t, this.card.isMuted || this.voiceReceiver.setVolume(t);
    };

    ue.prototype.muteReceiver = function muteReceiver() {
      this.voiceReceiver.setVolume(0);
    };

    ue.prototype.unmuteReceiver = function unmuteReceiver() {
      this.voiceReceiver.setVolume(this.volume);
    };

    ue.prototype.broadcastStream = function broadcastStream() {
      this.voiceBroadcast = new ae(this.room);
    };

    return ue;
  }();

  var ce = function () {
    function ce(t, e, n, i, r, o) {
      var _this31 = this;

      _classCallCheck(this, ce);

      this.main = t, this.voiceServer = e, this.roomId = n, this.accessToken = r, this.roomMembers = new Map(), this.currentUser = i, this.isUnsubscribing = !1, new nt("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this31.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this31.toggleMic();
      }, o.forEach(function (t) {
        _this31.registerMember(t.uuid, t.name);
      });
    }

    ce.prototype.toggleMic = function toggleMic() {
      var _this32 = this;

      var t = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (e) {
        null != e.voiceBroadcast && (t = e.voiceBroadcast);
      }), t.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", t.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", t.mute()), setTimeout(function () {
        _this32.muteMicButtonElement.disabled = !1, _this32.canToggleMute = !0;
      }, 1e3));
    };

    ce.prototype.unsubscribe = function unsubscribe() {
      var _this33 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new nt("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), v(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (t) {
        t.json().then(function (t) {
          0 !== t.results.length && (_this33.roomMembers.forEach(function (t) {
            _this33.handleMemberLeaving(t.uuid);
          }), document.getElementById("call-control-box").style.display = "none", _this33.main.voiceModule.clearCall());
        }).catch(function (t) {
          console.error(t.stack), _this33.leaveErrorhandler(t);
        });
      }).catch(function (t) {
        console.error(t.stack), _this33.leaveErrorhandler(t);
      }));
    };

    ce.prototype.resubToPlayer = function resubToPlayer(t) {
      var e = this.roomMembers.get(t);null == e || (null != e.voiceReceiver && e.voiceReceiver.shutdown(), e.connectStream());
    };

    ce.prototype.handleMemberLeaving = function handleMemberLeaving(t) {
      var e = this.roomMembers.get(t);null == e || (null != e.voiceBroadcast && (e.voiceBroadcast.shutdown(), e.voiceBroadcast.changeMicPopup.hide()), null != e.voiceReceiver && e.voiceReceiver.shutdown(), e.removeCard(), this.roomMembers.delete(t), 1 === this.roomMembers.size && this.unsubscribe());
    };

    ce.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new nt("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    ce.prototype.errorHandler = function errorHandler(t) {
      new nt("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(t);
    };

    ce.prototype.registerMember = function registerMember(t, e) {
      var n = new ue(this, t, e);this.roomMembers.set(t, n), t == this.currentUser.uuid ? n.broadcastStream() : n.connectStream();
    };

    return ce;
  }();

  var le = function () {
    function le(t, e, n, i) {
      var _this34 = this;

      _classCallCheck(this, le);

      var r = [];e.forEach(function (e) {
        e != t.tokenSet.name && r.push(e);
      }), t.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var o = r.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + o, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this34.ignored = !0, _this34.hide(_this34), new nt("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          n();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var s = function s() {
        _this34.ignored || (_this34.ignored = !0, _this34.hide(_this34), new nt("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), i());
      };this.onTimeout = s, document.getElementById("call-deny-button").onclick = s;
    }

    le.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return le;
  }();

  var he = function () {
    function he(t) {
      _classCallCheck(this, he);

      this.room = null, this.main = t, this.currentUser = t.currentUser;
    }

    he.prototype.promptCall = function promptCall(t, e, n, i, r) {
      var _this35 = this;

      null == this.room ? new le(this.main, i, function () {
        _this35.room = new ce(_this35.main, t, e, _this35.main.tokenSet, n, r);
      }, function () {
        v(_this35.voiceServer.rest + "/leave-room?room=" + e + "&uuid=" + _this35.currentUser.uuid + "&accessToken=" + n).then(function (t) {
          t.json().then(function (t) {
            0 === t.results.length ? _this35.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (t) {
            _this35.leaveErrorhandler(t);
          });
        }).catch(function (t) {
          _this35.leaveErrorhandler(t);
        });
      }) : new nt("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    he.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new nt("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    he.prototype.handleSocketClosed = function handleSocketClosed() {
      null == this.room || this.room.unsubscribe();
    };

    he.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    he.prototype.setVolume = function setVolume(t) {
      null != this.room && this.room.roomMembers.forEach(function (e) {
        null != e.voiceReceiver && e.setVolume(t);
      });
    };

    return he;
  }();

  var fe = function () {
    function fe(t) {
      _classCallCheck(this, fe);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    fe.prototype.setupPermissions = function setupPermissions() {
      var _this36 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new nt("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this36.requestNotificationPermissions();
      });
    };

    fe.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    fe.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this37 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this37.requestBox.hide(), new nt("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this37.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return fe;
  }();

  var de = n(121);var pe = null;
  var me = function me(t, e, n) {
    _classCallCheck(this, me);

    this.x = t || 0, this.y = e || 0, this.z = n || 0;
  };

  var ge = function () {
    function ge(t, e, n, i) {
      _classCallCheck(this, ge);

      this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === i ? 1 : i;
    }

    ge.prototype.setFromEuler = function setFromEuler(t) {
      var e = Math.sin,
          n = Math.cos;var i = t.x,
          r = t.y,
          o = t.z,
          s = n(i / 2),
          a = n(r / 2),
          u = n(o / 2),
          c = e(i / 2),
          l = e(r / 2),
          h = e(o / 2);return this.x = c * a * u + s * l * h, this.y = s * l * u - c * a * h, this.z = s * a * h + c * l * u, this.w = s * a * u - c * l * h, this;
    };

    return ge;
  }();

  var ve = function () {
    function ve() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Mt();
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ge();

      _classCallCheck(this, ve);

      this.position = t, this.rotation = e;
    }

    ve.prototype.applyTo = function applyTo(t) {
      var e = this.position,
          n = new Mt(0, 0, 1).applyQuaternion(this.rotation),
          i = new Mt(0, 1, 0).applyQuaternion(this.rotation);t.positionX ? (t.positionX.value = e.x, t.positionY.value = e.y, t.positionZ.value = e.z) : t.setPosition(e.x, e.y, e.z), t instanceof PannerNode ? t.orientationX ? (t.orientationX.value = n.x, t.orientationY.value = n.y, t.orientationZ.value = n.z) : t.setOrientation(n.x, n.y, n.z) : t.forwardX ? (t.forwardX.value = n.x, t.forwardY.value = n.y, t.forwardZ.value = n.z, t.upX.value = i.x, t.upY.value = i.y, t.upZ.value = i.z) : t.setOrientation(n.x, n.y, n.z, i.x, i.y, i.z);
    };

    return ve;
  }();

  var ye = function () {
    function ye(t, e, n, i) {
      _classCallCheck(this, ye);

      this.world = t, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(e, n, i);
    }

    ye.prototype.updateLocation = function updateLocation(t, e, n) {
      this.location = t, this.pitch = this.toRadians(e), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var i = new me(this.pitch, this.yaw, 0),
          r = new ge();r.setFromEuler(i);new ve(t, r).applyTo(this.listener), this.world.onLocationUpdate();
    };

    ye.prototype.toRadians = function toRadians(t) {
      return t * (Math.PI / 180);
    };

    ye.prototype.normalizeYaw = function normalizeYaw(t) {
      return 0 > (t %= 360) && (t += 360), t;
    };

    return ye;
  }();

  var be = function be(t, e, n) {
    _classCallCheck(this, be);

    this.source = t, this.distance = e, this.speaker = n;
  };

  var we = "SPEAKER_2D";
  var xe = function xe(t, e, n, i) {
    _classCallCheck(this, xe);

    this.pannerNode = n.audioCtx.createPanner(), this.media = i, i.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = t.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var r = t.location;new ve(r).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var Se = function () {
    function Se(t, e, n) {
      var _this38 = this;

      _classCallCheck(this, Se);

      this.id = "SPEAKER__" + e, this.openAudioMc = t, this.speakerNodes = new Map();var i = new rt(this.id);i.trackable = !0, this.channel = i;var r = new vt(e);this.media = r, r.openAudioMc = t, r.setOa(t), i.mixer = this.openAudioMc.getMediaManager().mixer, i.addSound(r), i.setChannelVolume(0), r.startDate(n, !0), r.finalize().then(function () {
        t.getMediaManager().mixer.addChannel(i), r.setLooping(!0), i.setTag(_this38.id), i.setTag("SPECIAL"), _this38.openAudioMc.getMediaManager().mixer.updateCurrent(), r.startDate(n, !0), r.finish();
      });
    }

    Se.prototype.removeSpeakerLocation = function removeSpeakerLocation(t) {
      null != this.speakerNodes.get(t) && this.speakerNodes.delete(t);
    };

    Se.prototype.updateLocation = function updateLocation(t, e, n) {
      if (t.type == we) {
        var _i5 = t.getDistance(e, n),
            _r3 = this._convertDistanceToVolume(t.maxDistance, _i5);if (0 >= _r3) return;this.channel.fadeChannel(_r3, 100);
      } else this.speakerNodes.has(t.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(t.id, new xe(t, e, n, this.media)));
    };

    Se.prototype._convertDistanceToVolume = function _convertDistanceToVolume(t, e) {
      return X((t - e) / t * 100);
    };

    Se.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return Se;
  }();

  var Ee = function () {
    function Ee(t) {
      _classCallCheck(this, Ee);

      this.openAudioMc = t, this.speakers = new Map(), this.audioMap = new Map(), this.player = new ye(this, new Mt(0, 0, 0), 0, 0);
    }

    Ee.prototype.getSpeakerById = function getSpeakerById(t) {
      return this.speakers.get(t);
    };

    Ee.prototype.addSpeaker = function addSpeaker(t, e) {
      this.speakers.set(t, e), this.renderAudio2D();
    };

    Ee.prototype.removeSpeaker = function removeSpeaker(t) {
      this.speakers.delete(t), this.audioMap.forEach(function (t, e) {
        t.removeSpeakerLocation(e);
      }), this.renderAudio2D();
    };

    Ee.prototype.getMediaForSource = function getMediaForSource(t, e) {
      var n = this.audioMap.get(t);if (null != n) return n;if (null == e) return null;var i = new Se(this.openAudioMc, t, e);return this.audioMap.set(t, i), i;
    };

    Ee.prototype.removeMediaFromSource = function removeMediaFromSource(t) {
      var e = this.getMediaForSource(t);null == e || (e.remove(), this.audioMap.delete(t));
    };

    Ee.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    Ee.prototype.isMediaUsed = function isMediaUsed(t) {
      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = this.speakers.values()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var e = _step22.value;
          if (e.source == t) return !0;
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22.return) {
            _iterator22.return();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }

      return !1;
    };

    Ee.prototype.renderAudio2D = function renderAudio2D() {
      var _this39 = this;

      var t = [];this.speakers.forEach(function (e) {
        var n = e.getDistance(_this39, _this39.player);t.push(new be(e.source, n, e));
      });var e = new Map();var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = t[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var _n8 = _step23.value;
          var _t30 = e.get(_n8.source);null != _t30 ? Array.isArray(_t30) ? (_t30.push(_n8), e.set(_n8.source, _t30)) : _t30.distance > _n8.distance && _n8.distance <= _n8.speaker.maxDistance && e.set(_n8.source, _n8) : _n8.speaker.type == we ? _n8.distance <= _n8.speaker.maxDistance && e.set(_n8.source, _n8) : _n8.distance <= _n8.speaker.maxDistance && e.set(_n8.source, [_n8]);
        }
      } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion23 && _iterator23.return) {
            _iterator23.return();
          }
        } finally {
          if (_didIteratorError23) {
            throw _iteratorError23;
          }
        }
      }

      e.forEach(function (t) {
        var e = Array.isArray(t) ? t : [t];var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
          for (var _iterator24 = e[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            var _t29 = _step24.value;
            _this39.getMediaForSource(_t29.source, _t29.speaker.startInstant).updateLocation(_t29.speaker, _this39, _this39.player);
          }
        } catch (err) {
          _didIteratorError24 = true;
          _iteratorError24 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion24 && _iterator24.return) {
              _iterator24.return();
            }
          } finally {
            if (_didIteratorError24) {
              throw _iteratorError24;
            }
          }
        }
      }), this.audioMap.forEach(function (t, e) {
        _this39.isMediaUsed(e) || _this39.removeMediaFromSource(e);
      });
    };

    return Ee;
  }();

  n.d(e, "OpenAudioMc", function () {
    return Me;
  });
  var Me = function (_ref2) {
    _inherits(Me, _ref2);

    function Me() {
      var _this40, _ret2;

      _classCallCheck(this, Me);

      if ((_this40 = _possibleConstructorReturn(this, _ref2.call(this)), _this40), _this40.canStart = !1, _this40.host = null, _this40.background = null, _this40.ambianceSound = "", _this40.tokenSet = new ft().fromCache(), null == _this40.tokenSet) return _ret2 = void i(et.BAD_AUTH), _possibleConstructorReturn(_this40, _ret2);_this40.notificationModule = new fe(_this40), _this40.timeService = new Q(), _this40.messages = new Z(_this40), _this40.userInterfaceModule = new tt(_this40), _this40.hueConfiguration = new kt(_this40), _this40.mediaManager = new bt(_this40), _this40.boot();new It(ht.MAIN_BACKEND).route(_this40).then(function (t) {
        _this40.canStart = !0, _this40.host = t.host, _this40.background = t.background, _this40.ambianceSound = t.ambianceSound, i(et.WELCOME);
      }).catch(function (t) {
        console.error("Exception thrown", t.stack), _this40.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this40);
    }

    Me.prototype.start = function start() {
      this.canStart && (this.canStart = !1, $t = new (window.AudioContext || window.webkitAudioContext)(), this.voiceModule = new he(this), this.world = new Ee(this), this.hueModule = new it(this, Object(de.a)()), this.socketModule = new wt(this, this.host), this.messages.apply(), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new At(this), "" !== this.background && (document.getElementById("banner-image").src = this.background), this.mediaManager.postBoot());
    };

    Me.prototype.sendError = function sendError(t) {
      R(t, this.tokenSet.name);
    };

    return Me;
  }(function (_ref3) {
    _inherits(_class2, _ref3);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ref3.apply(this, arguments));
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

    _class2.prototype.getVoiceService = function getVoiceService() {
      return this.voiceService;
    };

    return _class2;
  }(function () {
    function _class3() {
      _classCallCheck(this, _class3);

      console.log("%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", "background: linear-gradient(#D33106, #571402);border: 1px solid #3E0E02;color: white;display: block;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;line-height: 40px;text-align: center;font-weight: bold"), this.log("Enabling the web client for " + window.navigator.userAgent);
    }

    _class3.prototype.boot = function boot() {
      var t = Cookies.get("volume");Cookies.set("auto-join-call", !1), null != t && this.mediaManager.changeVolume(t);
    };

    return _class3;
  }()));

  window.onload = function () {
    if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");new ft().initialize().then(function (t) {
      return null == t ? (i(et.BAD_AUTH), window.location.href = "/login.html", void R("A faulty login attempt was done at " + window.location.host, "Steve")) : (null != t && null != t.name && (document.getElementById("in-game-name").innerText = t.name, pe = new Me()), document.body.addEventListener("click", q), void (.5 <= Math.random() && v(ht.SERVER_STATUS + t.name).then(function (t) {
        t.json().then(function (t) {
          t.offline ? (console.log("Redirecting because network error"), window.location.href = "https://help.openaudiomc.net/network_error.html") : console.log("[OpenAudioMc] Server status:" + JSON.stringify(t));
        });
      })));
    }).catch(function (t) {
      console.log(t), window.location.href = "https://help.openaudiomc.net/network_error.html";
    });
  };
}]);
