"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

!function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;var i = n[r] = { i: r, l: !1, exports: {} };return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
  }var n = {};t.m = e, t.c = n, t.d = function (e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;if (4 & n && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var r = Object.create(null);if (t.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & n && "string" != typeof e) for (var i in e) {
      t.d(r, i, function (t) {
        return e[t];
      }.bind(null, i));
    }return r;
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(n, "a", n), n;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 334);
}([function (e, t, n) {
  var r = n(1),
      i = n(7),
      o = n(14),
      s = n(11),
      a = n(17),
      u = "prototype",
      c = function c(e, t, n) {
    var l,
        h,
        d,
        f,
        p = e & c.F,
        g = e & c.G,
        m = e & c.S,
        v = e & c.P,
        y = e & c.B,
        b = g ? r : m ? r[t] || (r[t] = {}) : (r[t] || {})[u],
        w = g ? i : i[t] || (i[t] = {}),
        S = w[u] || (w[u] = {});for (l in g && (n = t), n) {
      d = ((h = !p && b && void 0 !== b[l]) ? b : n)[l], f = y && h ? a(d, r) : v && "function" == typeof d ? a(Function.call, d) : d, b && s(b, l, d, e & c.U), w[l] != d && o(w, l, f), v && S[l] != d && (S[l] = d);
    }
  };r.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
}, function (e) {
  var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = t);
}, function (e) {
  e.exports = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  };
}, function (e, t, n) {
  var r = n(4);e.exports = function (e) {
    if (!r(e)) throw TypeError(e + " is not an object!");return e;
  };
}, function (e) {
  e.exports = function (e) {
    return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? null !== e : "function" == typeof e;
  };
}, function (e, t, n) {
  var r = n(48)("wks"),
      i = n(29),
      o = n(1).Symbol,
      s = "function" == typeof o;(e.exports = function (e) {
    return r[e] || (r[e] = s && o[e] || (s ? o : i)("Symbol." + e));
  }).store = r;
}, function (e, t, n) {
  var r = n(19),
      i = Math.min;e.exports = function (e) {
    return 0 < e ? i(r(e), 9007199254740991) : 0;
  };
}, function (e) {
  var t = e.exports = { version: "2.6.11" };"number" == typeof __e && (__e = t);
}, function (e, t, n) {
  e.exports = !n(2)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (e, t, n) {
  var r = n(3),
      i = n(89),
      o = n(26),
      s = Object.defineProperty;t.f = n(8) ? Object.defineProperty : function (e, t, n) {
    if (r(e), t = o(t, !0), r(n), i) try {
      return s(e, t, n);
    } catch (t) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;
  };
}, function (e, t, n) {
  var r = n(24);e.exports = function (e) {
    return Object(r(e));
  };
}, function (e, t, n) {
  var r = n(1),
      i = n(14),
      o = n(13),
      s = n(29)("src"),
      a = n(138),
      u = "toString",
      c = ("" + a).split(u);n(7).inspectSource = function (e) {
    return a.call(e);
  }, (e.exports = function (e, t, n, a) {
    var u = "function" == typeof n;u && (o(n, "name") || i(n, "name", t)), e[t] === n || (u && (o(n, s) || i(n, s, e[t] ? "" + e[t] : c.join(t + ""))), e === r ? e[t] = n : a ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)));
  })(Function.prototype, u, function () {
    return "function" == typeof this && this[s] || a.call(this);
  });
}, function (e, t, n) {
  var r = n(0),
      i = n(2),
      o = n(24),
      s = /"/g,
      a = function a(e, t, n, r) {
    var i = o(e) + "",
        a = "<" + t;return "" !== n && (a += " " + n + '="' + (r + "").replace(s, "&quot;") + '"'), a + ">" + i + "</" + t + ">";
  };e.exports = function (e, t) {
    var n = {};n[e] = t(a), r(r.P + r.F * i(function () {
      var t = ""[e]('"');return t !== t.toLowerCase() || 3 < t.split('"').length;
    }), "String", n);
  };
}, function (e) {
  var t = {}.hasOwnProperty;e.exports = function (e, n) {
    return t.call(e, n);
  };
}, function (e, t, n) {
  var r = n(9),
      i = n(28);e.exports = n(8) ? function (e, t, n) {
    return r.f(e, t, i(1, n));
  } : function (e, t, n) {
    return e[t] = n, e;
  };
}, function (e, t, n) {
  var r = n(44),
      i = n(24);e.exports = function (e) {
    return r(i(e));
  };
}, function (e, t, n) {
  "use strict";
  var r = n(2);e.exports = function (e, t) {
    return !!e && r(function () {
      t ? e.call(null, function () {}, 1) : e.call(null);
    });
  };
}, function (e, t, n) {
  var r = n(18);e.exports = function (e, t, n) {
    return r(e), void 0 === t ? e : 1 === n ? function (n) {
      return e.call(t, n);
    } : 2 === n ? function (n, r) {
      return e.call(t, n, r);
    } : 3 === n ? function (n, r, i) {
      return e.call(t, n, r, i);
    } : function () {
      return e.apply(t, arguments);
    };
  };
}, function (e) {
  e.exports = function (e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;
  };
}, function (e) {
  var t = Math.ceil,
      n = Math.floor;e.exports = function (e) {
    return isNaN(e = +e) ? 0 : (0 < e ? n : t)(e);
  };
}, function (e, t, n) {
  var r = n(45),
      i = n(28),
      o = n(15),
      s = n(26),
      a = n(13),
      u = n(89),
      c = Object.getOwnPropertyDescriptor;t.f = n(8) ? c : function (e, t) {
    if (e = o(e), t = s(t, !0), u) try {
      return c(e, t);
    } catch (t) {}return a(e, t) ? i(!r.f.call(e, t), e[t]) : void 0;
  };
}, function (e, t, n) {
  var r = n(0),
      i = n(7),
      o = n(2);e.exports = function (e, t) {
    var n = (i.Object || {})[e] || Object[e],
        s = {};s[e] = t(n), r(r.S + r.F * o(function () {
      n(1);
    }), "Object", s);
  };
}, function (e, t, n) {
  var r = n(17),
      i = n(44),
      o = n(10),
      s = n(6),
      a = n(105);e.exports = function (e, t) {
    var n = 1 == e,
        u = 4 == e,
        c = 6 == e,
        l = t || a;return function (t, a, h) {
      for (var d, f, p = o(t), g = i(p), m = r(a, h, 3), v = s(g.length), y = 0, b = n ? l(t, v) : 2 == e ? l(t, 0) : void 0; v > y; y++) {
        if ((5 == e || c || y in g) && (f = m(d = g[y], y, p), e)) if (n) b[y] = f;else if (f) switch (e) {case 3:
            return !0;case 5:
            return d;case 6:
            return y;case 2:
            b.push(d);} else if (u) return !1;
      }return c ? -1 : 3 == e || u ? u : b;
    };
  };
}, function (e) {
  var t = {}.toString;e.exports = function (e) {
    return t.call(e).slice(8, -1);
  };
}, function (e) {
  e.exports = function (e) {
    if (null == e) throw TypeError("Can't call method on  " + e);return e;
  };
}, function (e, t, n) {
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
        A = n(29),
        T = n(5),
        _ = n(22),
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
        Z = _(0),
        ee = _(2),
        te = _(3),
        ne = _(4),
        re = _(5),
        ie = _(6),
        oe = P(!0),
        se = P(!1),
        ae = N.values,
        ue = N.keys,
        ce = N.entries,
        le = X.lastIndexOf,
        he = X.reduce,
        de = X.reduceRight,
        fe = X.join,
        pe = X.sort,
        ge = X.slice,
        me = X.toString,
        ve = X.toLocaleString,
        ye = T("iterator"),
        be = T("toStringTag"),
        we = A("typed_constructor"),
        Se = A("def_constructor"),
        xe = a.CONSTR,
        Ee = a.TYPED,
        Me = a.VIEW,
        ke = "Wrong length!",
        Ce = _(1, function (e, t) {
      return Pe(I(e, e[Se]), t);
    }),
        Oe = o(function () {
      return 1 === new W(new Uint16Array([1]).buffer)[0];
    }),
        Ae = !!W && !!W[Y].set && o(function () {
      new W(1).set({});
    }),
        Te = function Te(e, t) {
      var n = p(e);if (0 > n || n % t) throw H("Wrong offset!");return n;
    },
        _e = function _e(e) {
      if (S(e) && Ee in e) return e;throw G(e + " is not a typed array!");
    },
        Pe = function Pe(e, t) {
      if (!S(e) || !(we in e)) throw G("It is not a typed array constructor!");return new e(t);
    },
        Ie = function Ie(e, t) {
      return Ne(I(e, e[Se]), t);
    },
        Ne = function Ne(e, t) {
      for (var n = 0, r = t.length, i = Pe(e, r); r > n;) {
        i[n] = t[n++];
      }return i;
    },
        Re = function Re(e, t, n) {
      V(e, t, { get: function get() {
          return this._d[n];
        } });
    },
        Fe = function Fe(e) {
      var t,
          n,
          r,
          i,
          o,
          s,
          a = x(e),
          u = arguments.length,
          l = 1 < u ? arguments[1] : void 0,
          h = void 0 !== l,
          d = O(a);if (null != d && !E(d)) {
        for (s = d.call(a), r = [], t = 0; !(o = s.next()).done; t++) {
          r.push(o.value);
        }a = r;
      }for (h && 2 < u && (l = c(l, arguments[2], 2)), t = 0, n = g(a.length), i = Pe(this, n); n > t; t++) {
        i[t] = h ? l(a[t], t) : a[t];
      }return i;
    },
        Le = function Le() {
      for (var e = 0, t = arguments.length, n = Pe(this, t); t > e;) {
        n[e] = arguments[e++];
      }return n;
    },
        Be = !!W && o(function () {
      ve.call(new W(1));
    }),
        De = function De() {
      return ve.apply(Be ? ge.call(_e(this)) : _e(this), arguments);
    },
        je = { copyWithin: function copyWithin(e, t) {
        return D.call(_e(this), e, t, 2 < arguments.length ? arguments[2] : void 0);
      }, every: function every(e) {
        return ne(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, fill: function fill() {
        return B.apply(_e(this), arguments);
      }, filter: function filter(e) {
        return Ie(this, ee(_e(this), e, 1 < arguments.length ? arguments[1] : void 0));
      }, find: function find(e) {
        return re(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, findIndex: function findIndex(e) {
        return ie(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, forEach: function forEach(e) {
        Z(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, indexOf: function indexOf(e) {
        return se(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, includes: function includes(e) {
        return oe(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, join: function join() {
        return fe.apply(_e(this), arguments);
      }, lastIndexOf: function lastIndexOf() {
        return le.apply(_e(this), arguments);
      }, map: function map(e) {
        return Ce(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, reduce: function reduce() {
        return he.apply(_e(this), arguments);
      }, reduceRight: function reduceRight() {
        return de.apply(_e(this), arguments);
      }, reverse: function reverse() {
        for (var e, t = this, n = _e(t).length, r = Math.floor(n / 2), i = 0; i < r;) {
          e = t[i], t[i++] = t[--n], t[n] = e;
        }return t;
      }, some: function some(e) {
        return te(_e(this), e, 1 < arguments.length ? arguments[1] : void 0);
      }, sort: function sort(e) {
        return pe.call(_e(this), e);
      }, subarray: function subarray(e, t) {
        var n = _e(this),
            r = n.length,
            i = v(e, r);return new (I(n, n[Se]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, g((void 0 === t ? r : v(t, r)) - i));
      } },
        Ue = function Ue(e, t) {
      return Ie(this, ge.call(_e(this), e, t));
    },
        Ve = function Ve(e) {
      _e(this);var t = Te(arguments[1], 1),
          n = this.length,
          r = x(e),
          i = g(r.length),
          o = 0;if (i + t > n) throw H(ke);for (; o < i;) {
        this[t + o] = r[o++];
      }
    },
        ze = { entries: function entries() {
        return ce.call(_e(this));
      }, keys: function keys() {
        return ue.call(_e(this));
      }, values: function values() {
        return ae.call(_e(this));
      } },
        He = function He(e, t) {
      return S(e) && e[Ee] && "symbol" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && t in e && +t + "" == t + "";
    },
        Ge = function Ge(e, t) {
      return He(e, t = y(t, !0)) ? h(2, e[t]) : z(e, t);
    },
        We = function We(e, t, n) {
      return !(He(e, t = y(t, !0)) && S(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(e, t, n) : (e[t] = n.value, e);
    };xe || (U.f = Ge, j.f = We), s(s.S + s.F * !xe, "Object", { getOwnPropertyDescriptor: Ge, defineProperty: We }), o(function () {
      me.call({});
    }) && (me = ve = function ve() {
      return fe.call(this);
    });var Ke = f({}, je);f(Ke, ze), d(Ke, ye, ze.values), f(Ke, { slice: Ue, set: Ve, constructor: function constructor() {}, toString: me, toLocaleString: De }), Re(Ke, "buffer", "b"), Re(Ke, "byteOffset", "o"), Re(Ke, "byteLength", "l"), Re(Ke, "length", "e"), V(Ke, be, { get: function get() {
        return this[Ee];
      } }), e.exports = function (e, t, n, u) {
      var c = e + ((u = !!u) ? "Clamped" : "") + "Array",
          h = i[c],
          f = h || {},
          p = h && k(h),
          v = !h || !a.ABV,
          y = {},
          b = h && h[Y],
          x = function x(n, r) {
        var i = n._d;return i.v["get" + e](r * t + i.o, Oe);
      },
          E = function E(n, r, i) {
        var o = n._d;u && (i = 0 > (i = Math.round(i)) ? 0 : 255 < i ? 255 : 255 & i), o.v["set" + e](r * t + o.o, i, Oe);
      },
          O = function O(e, t) {
        V(e, t, { get: function get() {
            return x(this, t);
          }, set: function set(e) {
            return E(this, t, e);
          }, enumerable: !0 });
      };v ? (h = n(function (e, n, r, i) {
        l(e, h, c, "_d");var o,
            s,
            a,
            u,
            f = 0,
            p = 0;if (S(n)) {
          if (!(n instanceof $ || (u = w(n)) == K || u == q)) return Ee in n ? Ne(h, n) : Fe.call(h, n);o = n, p = Te(r, t);var v = n.byteLength;if (void 0 === i) {
            if (v % t) throw H(ke);if (0 > (s = v - p)) throw H(ke);
          } else if ((s = g(i) * t) + p > v) throw H(ke);a = s / t;
        } else a = m(n), o = new $(s = a * t);for (d(e, "_d", { b: o, o: p, l: s, e: a, v: new Q(o) }); f < a;) {
          O(e, f++);
        }
      }), b = h[Y] = M(Ke), d(b, "constructor", h)) : (!o(function () {
        h(1);
      }) || !o(function () {
        new h(-1);
      }) || !F(function (e) {
        new h(), new h(null), new h(1.5), new h(e);
      }, !0)) && (h = n(function (e, n, r, i) {
        var o;return l(e, h, c), S(n) ? n instanceof $ || (o = w(n)) == K || o == q ? void 0 === i ? void 0 === r ? new f(n) : new f(n, Te(r, t)) : new f(n, Te(r, t), i) : Ee in n ? Ne(h, n) : Fe.call(h, n) : new f(m(n));
      }), Z(p === Function.prototype ? C(f) : C(f).concat(C(p)), function (e) {
        e in h || d(h, e, f[e]);
      }), h[Y] = b, !r && (b.constructor = h));var A = b[ye],
          T = !!A && ("values" == A.name || null == A.name),
          _ = ze.values;d(h, we, !0), d(b, Ee, c), d(b, Me, !0), d(b, Se, h), (u ? new h(1)[be] != c : !(be in b)) && V(b, be, { get: function get() {
          return c;
        } }), y[c] = h, s(s.G + s.W + s.F * (h != f), y), s(s.S, c, { BYTES_PER_ELEMENT: t }), s(s.S + s.F * o(function () {
        f.of.call(h, 1);
      }), c, { from: Fe, of: Le }), J in b || d(b, J, t), s(s.P, c, je), L(c), s(s.P + s.F * Ae, c, { set: Ve }), s(s.P + s.F * !T, c, ze), r || b.toString == me || (b.toString = me), s(s.P + s.F * o(function () {
        new h(1).slice();
      }), c, { slice: Ue }), s(s.P + s.F * (o(function () {
        return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
      }) || !o(function () {
        b.toLocaleString.call([1, 2]);
      })), c, { toLocaleString: De }), R[c] = T ? A : _, r || T || d(b, ye, _);
    };
  } else e.exports = function () {};
}, function (e, t, n) {
  var r = n(4);e.exports = function (e, t) {
    if (!r(e)) return e;var n, i;if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;throw TypeError("Can't convert object to primitive value");
  };
}, function (e, t, n) {
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
      l = function l(e) {
    s(e, r, { value: { i: "O" + ++a, w: {} } });
  },
      h = e.exports = { KEY: r, NEED: !1, fastKey: function fastKey(e, t) {
      if (!i(e)) return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : ("string" == typeof e ? "S" : "P") + e;if (!o(e, r)) {
        if (!u(e)) return "F";if (!t) return "E";l(e);
      }return e[r].i;
    }, getWeak: function getWeak(e, t) {
      if (!o(e, r)) {
        if (!u(e)) return !0;if (!t) return !1;l(e);
      }return e[r].w;
    }, onFreeze: function onFreeze(e) {
      return c && h.NEED && u(e) && !o(e, r) && l(e), e;
    } };
}, function (e) {
  e.exports = function (e, t) {
    return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
  };
}, function (e) {
  var t = 0,
      n = Math.random();e.exports = function (e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++t + n).toString(36));
  };
}, function (e) {
  e.exports = !1;
}, function (e, t, n) {
  var r = n(91),
      i = n(64);e.exports = Object.keys || function (e) {
    return r(e, i);
  };
}, function (e, t, n) {
  var r = n(19),
      i = Math.max,
      o = Math.min;e.exports = function (e, t) {
    return 0 > (e = r(e)) ? i(e + t, 0) : o(e, t);
  };
}, function (e, t, n) {
  var r = n(3),
      i = n(92),
      o = n(64),
      s = n(63)("IE_PROTO"),
      a = function a() {},
      u = "prototype",
      _c = function c() {
    var e,
        t = n(61)("iframe"),
        r = o.length;for (t.style.display = "none", n(65).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _c = e.F; r--;) {
      delete _c[u][o[r]];
    }return _c();
  };e.exports = Object.create || function (e, t) {
    var n;return null === e ? n = _c() : (a[u] = r(e), n = new a(), a[u] = null, n[s] = e), void 0 === t ? n : i(n, t);
  };
}, function (e, t, n) {
  var r = n(91),
      i = n(64).concat("length", "prototype");t.f = Object.getOwnPropertyNames || function (e) {
    return r(e, i);
  };
}, function (e, t, n) {
  var r = n(13),
      i = n(10),
      o = n(63)("IE_PROTO"),
      s = Object.prototype;e.exports = Object.getPrototypeOf || function (e) {
    return e = i(e), r(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
  };
}, function (e, t, n) {
  var r = n(5)("unscopables"),
      i = Array.prototype;null == i[r] && n(14)(i, r, {}), e.exports = function (e) {
    i[r][e] = !0;
  };
}, function (e, t, n) {
  var r = n(4);e.exports = function (e, t) {
    if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");return e;
  };
}, function (e, t, n) {
  var r = n(9).f,
      i = n(13),
      o = n(5)("toStringTag");e.exports = function (e, t, n) {
    e && !i(e = n ? e : e.prototype, o) && r(e, o, { configurable: !0, value: t });
  };
}, function (e, t, n) {
  var r = n(0),
      i = n(24),
      o = n(2),
      s = n(67),
      a = "[" + s + "]",
      u = RegExp("^" + a + a + "*"),
      c = RegExp(a + a + "*$"),
      l = function l(e, t, n) {
    var i = {},
        a = o(function () {
      return !!s[e]() || "​" != "​"[e]();
    }),
        u = i[e] = a ? t(h) : s[e];n && (i[n] = u), r(r.P + r.F * a, "String", i);
  },
      h = l.trim = function (e, t) {
    return e = i(e) + "", 1 & t && (e = e.replace(u, "")), 2 & t && (e = e.replace(c, "")), e;
  };e.exports = l;
}, function (e) {
  e.exports = {};
}, function (e, t, n) {
  "use strict";
  var r = n(1),
      i = n(9),
      o = n(8),
      s = n(5)("species");e.exports = function (e) {
    var t = r[e];o && t && !t[s] && i.f(t, s, { configurable: !0, get: function get() {
        return this;
      } });
  };
}, function (e) {
  e.exports = function (e, t, n, r) {
    if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");return e;
  };
}, function (e, t, n) {
  var r = n(11);e.exports = function (e, t, n) {
    for (var i in t) {
      r(e, i, t[i], n);
    }return e;
  };
}, function (e, t, n) {
  var r = n(23);e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
    return "String" == r(e) ? e.split("") : Object(e);
  };
}, function (e, t) {
  t.f = {}.propertyIsEnumerable;
}, function (e, t, n) {
  var r = n(23),
      i = n(5)("toStringTag"),
      o = "Arguments" == r(function () {
    return arguments;
  }());e.exports = function (e) {
    var t, n, s;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
      try {
        return e[t];
      } catch (t) {}
    }(t = Object(e), i)) ? n : o ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s;
  };
}, function (e, t, n) {
  var r = n(3),
      i = n(18),
      o = n(5)("species");e.exports = function (e, t) {
    var n,
        s = r(e).constructor;return void 0 === s || null == (n = r(s)[o]) ? t : i(n);
  };
}, function (e, t, n) {
  var r = n(7),
      i = n(1),
      o = "__core-js_shared__",
      s = i[o] || (i[o] = {});(e.exports = function (e, t) {
    return s[e] || (s[e] = void 0 === t ? {} : t);
  })("versions", []).push({ version: r.version, mode: n(30) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
}, function (e, t, n) {
  var r = n(15),
      i = n(6),
      o = n(32);e.exports = function (e) {
    return function (t, n, s) {
      var a,
          u = r(t),
          c = i(u.length),
          l = o(s, c);if (e && n != n) {
        for (; c > l;) {
          if ((a = u[l++]) != a) return !0;
        }
      } else for (; c > l; l++) {
        if ((e || l in u) && u[l] === n) return e || l || 0;
      }return !e && -1;
    };
  };
}, function (e, t) {
  t.f = Object.getOwnPropertySymbols;
}, function (e, t, n) {
  var r = n(23);e.exports = Array.isArray || function (e) {
    return "Array" == r(e);
  };
}, function (e, t, n) {
  var r = n(5)("iterator"),
      i = !1;try {
    var o = [7][r]();o.return = function () {
      i = !0;
    }, Array.from(o, function () {
      throw 2;
    });
  } catch (t) {}e.exports = function (e, t) {
    if (!t && !i) return !1;var n = !1;try {
      var o = [7],
          s = o[r]();s.next = function () {
        return { done: n = !0 };
      }, o[r] = function () {
        return s;
      }, e(o);
    } catch (t) {}return n;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(3);e.exports = function () {
    var e = r(this),
        t = "";return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(46),
      i = RegExp.prototype.exec;e.exports = function (e, t) {
    var n = e.exec;if ("function" == typeof n) {
      var o = n.call(e, t);if ("object" != (typeof o === "undefined" ? "undefined" : _typeof(o))) throw new TypeError("RegExp exec method returned something other than an Object or null");return o;
    }if ("RegExp" !== r(e)) throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(e, t);
  };
}, function (e, t, n) {
  "use strict";
  n(109);var r = n(11),
      i = n(14),
      o = n(2),
      s = n(24),
      a = n(5),
      u = n(82),
      c = a("species"),
      l = !o(function () {
    var e = /./;return e.exec = function () {
      var e = [];return e.groups = { a: "7" }, e;
    }, "7" !== "".replace(e, "$<a>");
  }),
      h = function () {
    var e = /(?:)/,
        t = e.exec;e.exec = function () {
      return t.apply(this, arguments);
    };var n = "ab".split(e);return 2 === n.length && "a" === n[0] && "b" === n[1];
  }();e.exports = function (e, t, n) {
    var d = a(e),
        f = !o(function () {
      var t = {};return t[d] = function () {
        return 7;
      }, 7 != ""[e](t);
    }),
        p = f ? !o(function () {
      var t = !1,
          n = /a/;return n.exec = function () {
        return t = !0, null;
      }, "split" === e && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[d](""), !t;
    }) : void 0;if (!f || !p || "replace" === e && !l || "split" === e && !h) {
      var g = /./[d],
          m = n(s, d, ""[e], function (e, t, n, r, i) {
        return t.exec === u ? f && !i ? { done: !0, value: g.call(t, n, r) } : { done: !0, value: e.call(n, t, r) } : { done: !1 };
      }),
          v = m[0],
          y = m[1];r(String.prototype, e, v), i(RegExp.prototype, d, 2 == t ? function (e, t) {
        return y.call(e, this, t);
      } : function (e) {
        return y.call(e, this);
      });
    }
  };
}, function (e, t, n) {
  var r = n(17),
      i = n(104),
      o = n(77),
      s = n(3),
      a = n(6),
      u = n(79),
      c = {},
      l = {};(t = e.exports = function (e, t, n, h, d) {
    var f,
        p,
        g,
        m,
        v = d ? function () {
      return e;
    } : u(e),
        y = r(n, h, t ? 2 : 1),
        b = 0;if ("function" != typeof v) throw TypeError(e + " is not iterable!");if (o(v)) {
      for (f = a(e.length); f > b; b++) {
        if ((m = t ? y(s(p = e[b])[0], p[1]) : y(e[b])) === c || m === l) return m;
      }
    } else for (g = v.call(e); !(p = g.next()).done;) {
      if ((m = i(g, y, p.value, t)) === c || m === l) return m;
    }
  }).BREAK = c, t.RETURN = l;
}, function (e, t, n) {
  var r = n(1).navigator;e.exports = r && r.userAgent || "";
}, function (e, t, n) {
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
      p = n(68);e.exports = function (e, t, n, g, m, v) {
    var y = r[e],
        b = y,
        w = m ? "set" : "add",
        S = b && b.prototype,
        x = {},
        E = function E(e) {
      var t = S[e];o(S, e, "delete" == e || "has" == e ? function (e) {
        return (!v || l(e)) && t.call(this, 0 === e ? 0 : e);
      } : "get" == e ? function (e) {
        return v && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
      } : "add" == e ? function (e) {
        return t.call(this, 0 === e ? 0 : e), this;
      } : function (e, n) {
        return t.call(this, 0 === e ? 0 : e, n), this;
      });
    };if ("function" == typeof b && (v || S.forEach && !h(function () {
      new b().entries().next();
    }))) {
      var M = new b(),
          k = M[w](v ? {} : -0, 1) != M,
          C = h(function () {
        M.has(1);
      }),
          O = d(function (e) {
        new b(e);
      }),
          A = !v && h(function () {
        for (var e = new b(), t = 5; t--;) {
          e[w](t, t);
        }return !e.has(-0);
      });O || ((b = t(function (t, n) {
        c(t, b, e);var r = p(new y(), t, b);return null != n && u(n, m, r[w], r), r;
      })).prototype = S, S.constructor = b), (C || A) && (E("delete"), E("has"), m && E("get")), (A || k) && E(w), v && S.clear && delete S.clear;
    } else b = g.getConstructor(t, e, m, w), s(b.prototype, n), a.NEED = !0;return f(b, e), x[e] = b, i(i.G + i.W + i.F * (b != y), x), v || g.setStrong(b, e, m), b;
  };
}, function (e, t, n) {
  for (var r, i = n(1), o = n(14), s = n(29), a = s("typed_array"), u = s("view"), c = !(!i.ArrayBuffer || !i.DataView), l = c, h = 0, d = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; h < 9;) {
    (r = i[d[h++]]) ? (o(r.prototype, a, !0), o(r.prototype, u, !0)) : l = !1;
  }e.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
}, function (e, t, n) {
  "use strict";
  (function (e, r) {
    n.d(t, "a", function () {
      return i;
    }), function (t) {
      if ("function" == typeof bootstrap) bootstrap("hark", t);else if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports))) e.exports = t();else if ("function" == typeof define && n(332)) define(t);else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;ses.makeHark = t;
      } else "undefined" == typeof window ? r.hark = t() : window.hark = t();
    }(function () {
      return function (e, t, n) {
        function r(n, o) {
          if (!t[n]) {
            if (!e[n]) {
              if (i) return i(n, !0);throw new Error("Cannot find module '" + n + "'");
            }var s = t[n] = { exports: {} };e[n][0].call(s.exports, function (t) {
              var i = e[n][1][t];return r(i || t);
            }, s, s.exports);
          }return t[n].exports;
        }for (var i = !1, o = 0; o < n.length; o++) {
          r(n[o]);
        }return r;
      }({ 1: [function (e, t) {
          var n,
              r = e("wildemitter");"undefined" != typeof window && (n = window.AudioContext || window.webkitAudioContext);var i = null;t.exports = function (e, t) {
            var o = new r();if (!n) return o;var s,
                a,
                u,
                c = (t = t || {}).smoothing || .1,
                l = t.interval || 50,
                h = t.threshold,
                d = t.play,
                f = t.history || 10,
                p = !0;i = t.audioContext || i || new n(), (u = i.createAnalyser()).fftSize = 512, u.smoothingTimeConstant = c, a = new Float32Array(u.frequencyBinCount), e.jquery && (e = e[0]), e instanceof HTMLAudioElement || e instanceof HTMLVideoElement ? (s = i.createMediaElementSource(e), void 0 === d && (d = !0), h = h || -50) : (s = i.createMediaStreamSource(e), h = h || -50), s.connect(u), d && u.connect(i.destination), o.speaking = !1, o.getThreshold = function () {
              return h;
            }, o.suspend = function () {
              return i.suspend();
            }, o.resume = function () {
              return i.resume();
            }, Object.defineProperty(o, "state", { get: function get() {
                return i.state;
              } }), i.onstatechange = function () {
              o.emit("state_change", i.state);
            }, o.setThreshold = function (e) {
              h = e;
            }, o.setInterval = function (e) {
              l = e;
            }, o.stop = function () {
              p = !1, o.emit("volume_change", -100, h), o.speaking && (o.speaking = !1, o.emit("stopped_speaking")), u.disconnect(), s.disconnect();
            }, o.speakingHistory = [];for (var g = 0; g < f; g++) {
              o.speakingHistory.push(0);
            }var m = function m() {
              setTimeout(function () {
                if (p) {
                  var e = function (e, t) {
                    var n = -1 / 0;e.getFloatFrequencyData(t);for (var r = 4, i = t.length; r < i; r++) {
                      t[r] > n && 0 > t[r] && (n = t[r]);
                    }return n;
                  }(u, a);o.emit("volume_change", e, h);var t = 0;if (e > h && !o.speaking) {
                    for (var n = o.speakingHistory.length - 3; n < o.speakingHistory.length; n++) {
                      t += o.speakingHistory[n];
                    }2 <= t && (o.speaking = !0, o.emit("speaking"));
                  } else if (e < h && o.speaking) {
                    for (n = 0; n < o.speakingHistory.length; n++) {
                      t += o.speakingHistory[n];
                    }0 == t && (o.speaking = !1, o.emit("stopped_speaking"));
                  }o.speakingHistory.shift(), o.speakingHistory.push(0 + (e > h)), m();
                }
              }, l);
            };return m(), o;
          };
        }, { wildemitter: 2 }], 2: [function (e, t) {
          function n() {}t.exports = n, n.mixin = function (e) {
            var t = e.prototype || e;t.isWildEmitter = !0, t.on = function (e) {
              this.callbacks = this.callbacks || {};var t = 3 === arguments.length,
                  n = t ? arguments[1] : void 0,
                  r = t ? arguments[2] : arguments[1];return r._groupName = n, (this.callbacks[e] = this.callbacks[e] || []).push(r), this;
            }, t.once = function (e) {
              function t() {
                n.off(e, t), o.apply(this, arguments);
              }var n = this,
                  r = 3 === arguments.length,
                  i = r ? arguments[1] : void 0,
                  o = r ? arguments[2] : arguments[1];return this.on(e, i, t), this;
            }, t.releaseGroup = function (e) {
              var t, n, r, i;for (t in this.callbacks = this.callbacks || {}, this.callbacks) {
                for (n = 0, r = (i = this.callbacks[t]).length; n < r; n++) {
                  i[n]._groupName === e && (i.splice(n, 1), n--, r--);
                }
              }return this;
            }, t.off = function (e, t) {
              this.callbacks = this.callbacks || {};var n,
                  r = this.callbacks[e];return r ? 1 === arguments.length ? (delete this.callbacks[e], this) : (n = r.indexOf(t), r.splice(n, 1), 0 === r.length && delete this.callbacks[e], this) : this;
            }, t.emit = function (e) {
              this.callbacks = this.callbacks || {};var t,
                  n,
                  r,
                  i = [].slice.call(arguments, 1),
                  o = this.callbacks[e],
                  s = this.getWildcardCallbacks(e);if (o) for (t = 0, n = (r = o.slice()).length; t < n && r[t]; ++t) {
                r[t].apply(this, i);
              }if (s) for (n = s.length, t = 0, n = (r = s.slice()).length; t < n && r[t]; ++t) {
                r[t].apply(this, [e].concat(i));
              }return this;
            }, t.getWildcardCallbacks = function (e) {
              this.callbacks = this.callbacks || {};var t,
                  n,
                  r = [];for (t in this.callbacks) {
                n = t.split("*"), ("*" === t || 2 === n.length && e.slice(0, n[0].length) === n[0]) && (r = r.concat(this.callbacks[t]));
              }return r;
            };
          }, n.mixin(n);
        }, {}] }, {}, [1])(1);
    });var i = window.hark;
  }).call(this, n(130)(e), n(331));
}, function (e, t, n) {
  var r = n(4),
      i = n(1).document,
      o = r(i) && r(i.createElement);e.exports = function (e) {
    return o ? i.createElement(e) : {};
  };
}, function (e, t, n) {
  t.f = n(5);
}, function (e, t, n) {
  var r = n(48)("keys"),
      i = n(29);e.exports = function (e) {
    return r[e] || (r[e] = i(e));
  };
}, function (e) {
  e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, function (e, t, n) {
  var r = n(1).document;e.exports = r && r.documentElement;
}, function (e, t, n) {
  var r = n(4),
      i = n(3),
      o = function o(e, t) {
    if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
  };e.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
      try {
        (r = n(17)(Function.call, n(20).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array);
      } catch (e) {
        t = !0;
      }return function (e, n) {
        return o(e, n), t ? _defaults(e, n) : r(e, n), e;
      };
    }({}, !1) : void 0), check: o };
}, function (e) {
  e.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
}, function (e, t, n) {
  var r = n(4),
      i = n(66).set;e.exports = function (e, t, n) {
    var o,
        s = t.constructor;return s !== n && "function" == typeof s && (o = s.prototype) !== n.prototype && r(o) && i && i(e, o), e;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(19),
      i = n(24);e.exports = function (e) {
    var t = i(this) + "",
        n = "",
        o = r(e);if (0 > o || o == 1 / 0) throw RangeError("Count can't be negative");for (; 0 < o; (o >>>= 1) && (t += t)) {
      1 & o && (n += t);
    }return n;
  };
}, function (e) {
  e.exports = Math.sign || function (e) {
    return 0 == (e = +e) || e != e ? e : 0 > e ? -1 : 1;
  };
}, function (e) {
  var t = Math.expm1;e.exports = !t || 22025.465794806718 < t(10) || 22025.465794806718 > t(10) || -2e-17 != t(-2e-17) ? function (e) {
    return 0 == (e = +e) ? e : -1e-6 < e && 1e-6 > e ? e + e * e / 2 : Math.exp(e) - 1;
  } : t;
}, function (e, t, n) {
  var r = n(19),
      i = n(24);e.exports = function (e) {
    return function (t, n) {
      var o,
          s,
          a = i(t) + "",
          u = r(n),
          c = a.length;return 0 > u || u >= c ? e ? "" : void 0 : 55296 > (o = a.charCodeAt(u)) || 56319 < o || u + 1 === c || 56320 > (s = a.charCodeAt(u + 1)) || 57343 < s ? e ? a.charAt(u) : o : e ? a.slice(u, u + 2) : s - 56320 + (o - 55296 << 10) + 65536;
    };
  };
}, function (e, t, n) {
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
  };e.exports = function (e, t, n, m, v, y, b) {
    u(n, t, m);var w,
        S,
        x,
        E = function E(e) {
      return !d && e in O ? O[e] : function () {
        return new n(this, e);
      };
    },
        M = t + " Iterator",
        k = v == p,
        C = !1,
        O = e.prototype,
        A = O[h] || O["@@iterator"] || v && O[v],
        T = A || E(v),
        _ = v ? k ? E("entries") : T : void 0,
        P = "Array" == t && O.entries || A;if (P && (x = l(P.call(new e()))) !== Object.prototype && x.next && (c(x, M, !0), !r && "function" != typeof x[h] && s(x, h, g)), k && A && A.name !== p && (C = !0, T = function T() {
      return A.call(this);
    }), (!r || b) && (d || C || !O[h]) && s(O, h, T), a[t] = T, a[M] = g, v) if (w = { values: k ? T : E(p), keys: y ? T : E(f), entries: _ }, b) for (S in w) {
      S in O || o(O, S, w[S]);
    } else i(i.P + i.F * (d || C), t, w);return w;
  };
}, function (e, t, n) {
  var r = n(75),
      i = n(24);e.exports = function (e, t, n) {
    if (r(t)) throw TypeError("String#" + n + " doesn't accept regex!");return i(e) + "";
  };
}, function (e, t, n) {
  var r = n(4),
      i = n(23),
      o = n(5)("match");e.exports = function (e) {
    var t;return r(e) && (void 0 === (t = e[o]) ? "RegExp" == i(e) : !!t);
  };
}, function (e, t, n) {
  var r = n(5)("match");e.exports = function (e) {
    var t = /./;try {
      "/./"[e](t);
    } catch (n) {
      try {
        return t[r] = !1, !"/./"[e](t);
      } catch (e) {}
    }return !0;
  };
}, function (e, t, n) {
  var r = n(40),
      i = n(5)("iterator"),
      o = Array.prototype;e.exports = function (e) {
    return void 0 !== e && (r.Array === e || o[i] === e);
  };
}, function (e, t, n) {
  "use strict";
  var r = n(9),
      i = n(28);e.exports = function (e, t, n) {
    t in e ? r.f(e, t, i(0, n)) : e[t] = n;
  };
}, function (e, t, n) {
  var r = n(46),
      i = n(5)("iterator"),
      o = n(40);e.exports = n(7).getIteratorMethod = function (e) {
    if (null != e) return e[i] || e["@@iterator"] || o[r(e)];
  };
}, function (e, t, n) {
  "use strict";
  var r = n(10),
      i = n(32),
      o = n(6);e.exports = function (e) {
    for (var t = r(this), n = o(t.length), s = arguments.length, a = i(1 < s ? arguments[1] : void 0, n), u = 2 < s ? arguments[2] : void 0, c = void 0 === u ? n : i(u, n); c > a;) {
      t[a++] = e;
    }return t;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(36),
      i = n(108),
      o = n(40),
      s = n(15);e.exports = n(73)(Array, "Array", function (e, t) {
    this._t = s(e), this._i = 0, this._k = t;
  }, function () {
    var e = this._t,
        t = this._k,
        n = this._i++;return !e || n >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
  }, "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries");
}, function (e, t, n) {
  "use strict";
  var r = n(53),
      i = RegExp.prototype.exec,
      o = String.prototype.replace,
      s = i,
      a = "lastIndex",
      u = function () {
    var e = /a/,
        t = /b*/g;return i.call(e, "a"), i.call(t, "a"), 0 !== e[a] || 0 !== t[a];
  }(),
      c = void 0 !== /()??/.exec("")[1];(u || c) && (s = function s(e) {
    var t,
        n,
        s,
        l,
        h = this;return c && (n = new RegExp("^" + h.source + "$(?!\\s)", r.call(h))), u && (t = h[a]), s = i.call(h, e), u && s && (h[a] = h.global ? s.index + s[0].length : t), c && s && 1 < s.length && o.call(s[0], n, function () {
      for (l = 1; l < arguments.length - 2; l++) {
        void 0 === arguments[l] && (s[l] = void 0);
      }
    }), s;
  }), e.exports = s;
}, function (e, t, n) {
  "use strict";
  var r = n(72)(!0);e.exports = function (e, t, n) {
    return t + (n ? r(e, t).length : 1);
  };
}, function (e, t, n) {
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
    var e = +this;if (v.hasOwnProperty(e)) {
      var t = v[e];delete v[e], t();
    }
  },
      w = function w(e) {
    b.call(e.data);
  };d && f || (d = function d(e) {
    for (var t = [], n = 1; arguments.length > n;) {
      t.push(arguments[n++]);
    }return v[++m] = function () {
      a("function" == typeof e ? e : Function(e), t);
    }, r(m), m;
  }, f = function f(e) {
    delete v[e];
  }, "process" == n(23)(h) ? r = function r(e) {
    h.nextTick(s(b, e, 1));
  } : g && g.now ? r = function r(e) {
    g.now(s(b, e, 1));
  } : p ? (o = (i = new p()).port2, i.port1.onmessage = w, r = s(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function r(e) {
    l.postMessage(e + "", "*");
  }, l.addEventListener("message", w, !1)) : r = y in c("script") ? function (e) {
    u.appendChild(c("script"))[y] = function () {
      u.removeChild(this), b.call(e);
    };
  } : function (e) {
    setTimeout(s(b, e, 1), 0);
  }), e.exports = { set: d, clear: f };
}, function (e, t, n) {
  "use strict";
  function r(e, t, n) {
    var r,
        i,
        o,
        s = Array(n),
        a = 8 * n - t - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        l = 23 === t ? U(2, -24) - U(2, -77) : 0,
        h = 0,
        d = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;for ((e = j(e)) != e || e === B ? (i = e == e ? 0 : 1, r = u) : (r = V(z(e) / H), 1 > e * (o = U(2, -r)) && (r--, o *= 2), 2 <= (e += 1 <= r + c ? l / o : l * U(2, 1 - c)) * o && (r++, o /= 2), r + c >= u ? (i = 0, r = u) : 1 <= r + c ? (i = (e * o - 1) * U(2, t), r += c) : (i = e * U(2, c - 1) * U(2, t), r = 0)); 8 <= t; s[h++] = 255 & i, i /= 256, t -= 8) {}for (r = r << t | i, a += t; 0 < a; s[h++] = 255 & r, r /= 256, a -= 8) {}return s[--h] |= 128 * d, s;
  }function i(e, t, n) {
    var r,
        i = 8 * n - t - 1,
        o = (1 << i) - 1,
        s = o >> 1,
        a = i - 7,
        u = n - 1,
        c = e[u--],
        l = 127 & c;for (c >>= 7; 0 < a; l = 256 * l + e[u], u--, a -= 8) {}for (r = l & (1 << -a) - 1, l >>= -a, a += t; 0 < a; r = 256 * r + e[u], u--, a -= 8) {}if (0 === l) l = 1 - s;else {
      if (l === o) return r ? NaN : c ? -B : B;r += U(2, t), l -= s;
    }return (c ? -1 : 1) * r * U(2, l - t);
  }function o(e) {
    return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0];
  }function s(e) {
    return [255 & e];
  }function a(e) {
    return [255 & e, 255 & e >> 8];
  }function u(e) {
    return [255 & e, 255 & e >> 8, 255 & e >> 16, 255 & e >> 24];
  }function c(e) {
    return r(e, 52, 8);
  }function l(e) {
    return r(e, 23, 4);
  }function h(e, t, n) {
    C(e[P], t, { get: function get() {
        return this[n];
      } });
  }function d(e, t, n, r) {
    var i = M(+n);if (i + t > e[J]) throw L(I);var o = e[q]._b,
        s = i + e[Y],
        a = o.slice(s, s + t);return r ? a : a.reverse();
  }function f(e, t, n, r, i, o) {
    var s = M(+n);if (s + t > e[J]) throw L(I);for (var a = e[q]._b, u = s + e[Y], c = r(+i), l = 0; l < t; l++) {
      a[u + l] = c[o ? l : t - l - 1];
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
      A = n(38),
      T = "ArrayBuffer",
      _ = "DataView",
      P = "prototype",
      I = "Wrong index!",
      _N2 = p[T],
      _R = p[_],
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
      return new _N2(), new _N2(1.5), new _N2(NaN), _N2.name != T;
    })) {
      for (var X, $ = (_N2 = function N(e) {
        return S(this, _N2), new D(M(e));
      })[P] = D[P], Q = k(D), Z = 0; Q.length > Z;) {
        (X = Q[Z++]) in _N2 || y(_N2, X, D[X]);
      }m || ($.constructor = _N2);
    }var ee = new _R(new _N2(2)),
        te = _R[P].setInt8;ee.setInt8(0, 2147483648), ee.setInt8(1, 2147483649), (ee.getInt8(0) || !ee.getInt8(1)) && b(_R[P], { setInt8: function setInt8(e, t) {
        te.call(this, e, t << 24 >> 24);
      }, setUint8: function setUint8(e, t) {
        te.call(this, e, t << 24 >> 24);
      } }, !0);
  } else _N2 = function _N(e) {
    S(this, _N2, T);var t = M(e);this._b = O.call(Array(t), 0), this[J] = t;
  }, _R = function R(e, t, n) {
    S(this, _R, _), S(e, _N2, _);var r = e[J],
        i = x(t);if (0 > i || i > r) throw L("Wrong offset!");if (i + (n = void 0 === n ? r - i : E(n)) > r) throw L("Wrong length!");this[q] = e, this[Y] = i, this[J] = n;
  }, g && (h(_N2, W, "_l"), h(_R, G, "_b"), h(_R, W, "_l"), h(_R, K, "_o")), b(_R[P], { getInt8: function getInt8(e) {
      return d(this, 1, e)[0] << 24 >> 24;
    }, getUint8: function getUint8(e) {
      return d(this, 1, e)[0];
    }, getInt16: function getInt16(e) {
      var t = d(this, 2, e, arguments[1]);return (t[1] << 8 | t[0]) << 16 >> 16;
    }, getUint16: function getUint16(e) {
      var t = d(this, 2, e, arguments[1]);return t[1] << 8 | t[0];
    }, getInt32: function getInt32(e) {
      return o(d(this, 4, e, arguments[1]));
    }, getUint32: function getUint32(e) {
      return o(d(this, 4, e, arguments[1])) >>> 0;
    }, getFloat32: function getFloat32(e) {
      return i(d(this, 4, e, arguments[1]), 23, 4);
    }, getFloat64: function getFloat64(e) {
      return i(d(this, 8, e, arguments[1]), 52, 8);
    }, setInt8: function setInt8(e, t) {
      f(this, 1, e, s, t);
    }, setUint8: function setUint8(e, t) {
      f(this, 1, e, s, t);
    }, setInt16: function setInt16(e, t) {
      f(this, 2, e, a, t, arguments[2]);
    }, setUint16: function setUint16(e, t) {
      f(this, 2, e, a, t, arguments[2]);
    }, setInt32: function setInt32(e, t) {
      f(this, 4, e, u, t, arguments[2]);
    }, setUint32: function setUint32(e, t) {
      f(this, 4, e, u, t, arguments[2]);
    }, setFloat32: function setFloat32(e, t) {
      f(this, 4, e, l, t, arguments[2]);
    }, setFloat64: function setFloat64(e, t) {
      f(this, 8, e, c, t, arguments[2]);
    } });A(_N2, T), A(_R, _), y(_R[P], v.VIEW, !0), t[T] = _N2, t[_] = _R;
}, function (e) {
  var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = t);
}, function (e) {
  e.exports = function (e) {
    return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? null !== e : "function" == typeof e;
  };
}, function (e, t, n) {
  e.exports = !n(121)(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (e, t, n) {
  e.exports = !n(8) && !n(2)(function () {
    return 7 != Object.defineProperty(n(61)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (e, t, n) {
  var r = n(1),
      i = n(7),
      o = n(30),
      s = n(62),
      a = n(9).f;e.exports = function (e) {
    var t = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});"_" == e.charAt(0) || e in t || a(t, e, { value: s.f(e) });
  };
}, function (e, t, n) {
  var r = n(13),
      i = n(15),
      o = n(49)(!1),
      s = n(63)("IE_PROTO");e.exports = function (e, t) {
    var n,
        a = i(e),
        u = 0,
        c = [];for (n in a) {
      n != s && r(a, n) && c.push(n);
    }for (; t.length > u;) {
      r(a, n = t[u++]) && (~o(c, n) || c.push(n));
    }return c;
  };
}, function (e, t, n) {
  var r = n(9),
      i = n(3),
      o = n(31);e.exports = n(8) ? Object.defineProperties : function (e, t) {
    i(e);for (var n, s = o(t), a = s.length, u = 0; a > u;) {
      r.f(e, n = s[u++], t[n]);
    }return e;
  };
}, function (e, t, n) {
  var r = n(15),
      i = n(34).f,
      o = {}.toString,
      s = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];e.exports.f = function (e) {
    return s && "[object Window]" == o.call(e) ? function (e) {
      try {
        return i(e);
      } catch (e) {
        return s.slice();
      }
    }(e) : i(r(e));
  };
}, function (e, t, n) {
  "use strict";
  var r = n(8),
      i = n(31),
      o = n(50),
      s = n(45),
      a = n(10),
      u = n(44),
      c = Object.assign;e.exports = !c || n(2)(function () {
    var e = {},
        t = {},
        n = Symbol(),
        r = "abcdefghijklmnopqrst";return e[n] = 7, r.split("").forEach(function (e) {
      t[e] = e;
    }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
  }) ? function (e) {
    for (var t = a(e), n = arguments.length, c = 1, l = o.f, h = s.f; n > c;) {
      for (var d, f = u(arguments[c++]), p = l ? i(f).concat(l(f)) : i(f), g = p.length, m = 0; g > m;) {
        d = p[m++], (!r || h.call(f, d)) && (t[d] = f[d]);
      }
    }return t;
  } : c;
}, function (e) {
  e.exports = Object.is || function (e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(18),
      i = n(4),
      o = n(97),
      s = [].slice,
      a = {},
      u = function u(e, t, n) {
    if (!(t in a)) {
      for (var r = [], i = 0; i < t; i++) {
        r[i] = "a[" + i + "]";
      }a[t] = Function("F,a", "return new F(" + r.join(",") + ")");
    }return a[t](e, n);
  };e.exports = Function.bind || function (e) {
    var t = r(this),
        n = s.call(arguments, 1),
        a = function a() {
      var r = n.concat(s.call(arguments));return this instanceof a ? u(t, r.length, r) : o(t, r, e);
    };return i(t.prototype) && (a.prototype = t.prototype), a;
  };
}, function (e) {
  e.exports = function (e, t, n) {
    var r = void 0 === n;switch (t.length) {case 0:
        return r ? e() : e.call(n);case 1:
        return r ? e(t[0]) : e.call(n, t[0]);case 2:
        return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);case 3:
        return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);case 4:
        return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);}return e.apply(n, t);
  };
}, function (e, t, n) {
  var r = n(1).parseInt,
      i = n(39).trim,
      o = n(67),
      s = /^[-+]?0[xX]/;e.exports = 8 !== r(o + "08") || 22 !== r(o + "0x16") ? function (e, t) {
    var n = i(e + "", 3);return r(n, t >>> 0 || (s.test(n) ? 16 : 10));
  } : r;
}, function (e, t, n) {
  var r = n(1).parseFloat,
      i = n(39).trim;e.exports = 1 / r(n(67) + "-0") == -1 / 0 ? r : function (e) {
    var t = i(e + "", 3),
        n = r(t);return 0 === n && "-" == t.charAt(0) ? -0 : n;
  };
}, function (e, t, n) {
  var r = n(23);e.exports = function (e, t) {
    if ("number" != typeof e && "Number" != r(e)) throw TypeError(t);return +e;
  };
}, function (e, t, n) {
  var r = n(4),
      i = Math.floor;e.exports = function (e) {
    return !r(e) && isFinite(e) && i(e) === e;
  };
}, function (e) {
  e.exports = Math.log1p || function (e) {
    return -1e-8 < (e = +e) && 1e-8 > e ? e - e * e / 2 : Math.log(1 + e);
  };
}, function (e, t, n) {
  "use strict";
  var r = n(33),
      i = n(28),
      o = n(38),
      s = {};n(14)(s, n(5)("iterator"), function () {
    return this;
  }), e.exports = function (e, t, n) {
    e.prototype = r(s, { next: i(1, n) }), o(e, t + " Iterator");
  };
}, function (e, t, n) {
  var r = n(3);e.exports = function (e, t, n, i) {
    try {
      return i ? t(r(n)[0], n[1]) : t(n);
    } catch (n) {
      var o = e.return;throw void 0 !== o && r(o.call(e)), n;
    }
  };
}, function (e, t, n) {
  var r = n(228);e.exports = function (e, t) {
    return new (r(e))(t);
  };
}, function (e, t, n) {
  var r = n(18),
      i = n(10),
      o = n(44),
      s = n(6);e.exports = function (e, t, n, a, u) {
    r(t);var c = i(e),
        l = o(c),
        h = s(c.length),
        d = u ? h - 1 : 0,
        f = u ? -1 : 1;if (2 > n) for (;;) {
      if (d in l) {
        a = l[d], d += f;break;
      }if (d += f, u ? 0 > d : h <= d) throw TypeError("Reduce of empty array with no initial value");
    }for (; u ? 0 <= d : h > d; d += f) {
      d in l && (a = t(a, l[d], d, c));
    }return a;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(10),
      i = n(32),
      o = n(6);e.exports = [].copyWithin || function (e, t) {
    var n = r(this),
        s = o(n.length),
        a = i(e, s),
        u = i(t, s),
        c = 2 < arguments.length ? arguments[2] : void 0,
        l = Math.min((void 0 === c ? s : i(c, s)) - u, s - a),
        h = 1;for (u < a && a < u + l && (h = -1, u += l - 1, a += l - 1); 0 < l--;) {
      u in n ? n[a] = n[u] : delete n[a], a += h, u += h;
    }return n;
  };
}, function (e) {
  e.exports = function (e, t) {
    return { value: t, done: !!e };
  };
}, function (e, t, n) {
  "use strict";
  var r = n(82);n(0)({ target: "RegExp", proto: !0, forced: r !== /./.exec }, { exec: r });
}, function (e, t, n) {
  n(8) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", { configurable: !0, get: n(53) });
}, function (e, t, n) {
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
      _A = u[E],
      T = "process" == l(k),
      _ = function _() {},
      P = i = b.f,
      I = !!function () {
    try {
      var e = _A.resolve(1),
          t = (e.constructor = {})[n(5)("species")] = function (e) {
        e(_, _);
      };return (T || "function" == typeof PromiseRejectionEvent) && e.then(_) instanceof t && 0 !== O.indexOf("6.6") && -1 === S.indexOf("Chrome/66");
    } catch (t) {}
  }(),
      N = function N(e) {
    var t;return !(!d(e) || "function" != typeof (t = e.then)) && t;
  },
      R = function R(e, t) {
    if (!e._n) {
      e._n = !0;var n = e._c;y(function () {
        for (var r = e._v, i = 1 == e._s, o = 0, s = function s(t) {
          var n,
              o,
              s,
              a = i ? t.ok : t.fail,
              u = t.resolve,
              c = t.reject,
              l = t.domain;try {
            a ? (!i && (2 == e._h && B(e), e._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === t.promise ? c(M("Promise-chain cycle")) : (o = N(n)) ? o.call(n, u, c) : u(n)) : c(r);
          } catch (t) {
            l && !s && l.exit(), c(t);
          }
        }; n.length > o;) {
          s(n[o++]);
        }e._c = [], e._n = !1, t && !e._h && F(e);
      });
    }
  },
      F = function F(e) {
    v.call(u, function () {
      var t,
          n,
          r,
          i = e._v,
          o = L(e);if (o && (t = w(function () {
        T ? k.emit("unhandledRejection", i, e) : (n = u.onunhandledrejection) ? n({ promise: e, reason: i }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", i);
      }), e._h = T || L(e) ? 2 : 1), e._a = void 0, o && t.e) throw t.v;
    });
  },
      L = function L(e) {
    return 1 !== e._h && 0 === (e._a || e._c).length;
  },
      B = function B(e) {
    v.call(u, function () {
      var t;T ? k.emit("rejectionHandled", e) : (t = u.onrejectionhandled) && t({ promise: e, reason: e._v });
    });
  },
      D = function D(e) {
    var t = this;t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, !t._a && (t._a = t._c.slice()), R(t, !0));
  },
      j = function j(e) {
    var t,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === e) throw M("Promise can't be resolved itself");(t = N(e)) ? y(function () {
          var r = { _w: n, _d: !1 };try {
            t.call(e, c(j, r, 1), c(D, r, 1));
          } catch (e) {
            D.call(r, e);
          }
        }) : (n._v = e, n._s = 1, R(n, !1));
      } catch (t) {
        D.call({ _w: n, _d: !1 }, t);
      }
    }
  };I || (_A = function A(e) {
    p(this, _A, E, "_h"), f(e), r.call(this);try {
      e(c(j, this, 1), c(D, this, 1));
    } catch (e) {
      D.call(this, e);
    }
  }, (r = function r() {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(43)(_A.prototype, { then: function then(e, t) {
      var n = P(m(this, _A));return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = T ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise;
    }, catch: function _catch(e) {
      return this.then(void 0, e);
    } }), o = function o() {
    var e = new r();this.promise = e, this.resolve = c(j, e, 1), this.reject = c(D, e, 1);
  }, b.f = P = function P(e) {
    return e === _A || e === s ? new o(e) : i(e);
  }), h(h.G + h.W + h.F * !I, { Promise: _A }), n(38)(_A, E), n(41)(E), s = n(7)[E], h(h.S + h.F * !I, E, { reject: function reject(e) {
      var t = P(this);return (0, t.reject)(e), t.promise;
    } }), h(h.S + h.F * (a || !I), E, { resolve: function resolve(e) {
      return x(a && this === s ? _A : this, e);
    } }), h(h.S + h.F * !(I && n(52)(function (e) {
    _A.all(e).catch(_);
  })), E, { all: function all(e) {
      var t = this,
          n = P(t),
          r = n.resolve,
          i = n.reject,
          o = w(function () {
        var n = [],
            o = 0,
            s = 1;g(e, !1, function (e) {
          var a = o++,
              u = !1;n.push(void 0), s++, t.resolve(e).then(function (e) {
            u || (u = !0, n[a] = e, --s || r(n));
          }, i);
        }), --s || r(n);
      });return o.e && i(o.v), n.promise;
    }, race: function race(e) {
      var t = this,
          n = P(t),
          r = n.reject,
          i = w(function () {
        g(e, !1, function (e) {
          t.resolve(e).then(n.resolve, r);
        });
      });return i.e && r(i.v), n.promise;
    } });
}, function (e, t, n) {
  "use strict";
  function r(e) {
    var t, n;this.promise = new e(function (e, r) {
      if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");t = e, n = r;
    }), this.resolve = i(t), this.reject = i(n);
  }var i = n(18);e.exports.f = function (e) {
    return new r(e);
  };
}, function (e, t, n) {
  var r = n(3),
      i = n(4),
      o = n(112);e.exports = function (e, t) {
    if (r(e), i(t) && t.constructor === e) return t;var n = o.f(e);return (0, n.resolve)(t), n.promise;
  };
}, function (e, t, n) {
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
      m = function m(e, t) {
    var n,
        r = f(t);if ("F" !== r) return e._i[r];for (n = e._f; n; n = n.n) {
      if (n.k == t) return n;
    }
  };e.exports = { getConstructor: function getConstructor(e, t, n, c) {
      var l = e(function (e, r) {
        a(e, l, t, "_i"), e._t = t, e._i = i(null), e._f = void 0, e._l = void 0, e[g] = 0, null != r && u(r, n, e[c], e);
      });return o(l.prototype, { clear: function clear() {
          for (var e = p(this, t), n = e._i, r = e._f; r; r = r.n) {
            r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
          }e._f = e._l = void 0, e[g] = 0;
        }, delete: function _delete(e) {
          var n = p(this, t),
              r = m(n, e);if (r) {
            var i = r.n,
                o = r.p;delete n._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), n._f == r && (n._f = i), n._l == r && (n._l = o), n[g]--;
          }return !!r;
        }, forEach: function forEach(e) {
          p(this, t);for (var n, r = s(e, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
            for (r(n.v, n.k, this); n && n.r;) {
              n = n.p;
            }
          }
        }, has: function has(e) {
          return !!m(p(this, t), e);
        } }), d && r(l.prototype, "size", { get: function get() {
          return p(this, t)[g];
        } }), l;
    }, def: function def(e, t, n) {
      var r,
          i,
          o = m(e, t);return o ? o.v = n : (e._l = o = { i: i = f(t, !0), k: t, v: n, p: r = e._l, n: void 0, r: !1 }, !e._f && (e._f = o), r && (r.n = o), e[g]++, "F" !== i && (e._i[i] = o)), e;
    }, getEntry: m, setStrong: function setStrong(e, t, n) {
      c(e, t, function (e, n) {
        this._t = p(e, t), this._k = n, this._l = void 0;
      }, function () {
        for (var e = this, t = e._k, n = e._l; n && n.r;) {
          n = n.p;
        }return e._t && (e._l = n = n ? n.n : e._t._f) ? l(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v]) : (e._t = void 0, l(1));
      }, n ? "entries" : "values", !n, !0), h(t);
    } };
}, function (e, t, n) {
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
      g = function g(e) {
    return e._l || (e._l = new m());
  },
      m = function m() {
    this.a = [];
  },
      v = function v(e, t) {
    return d(e.a, function (e) {
      return e[0] === t;
    });
  };m.prototype = { get: function get(e) {
      var t = v(this, e);if (t) return t[1];
    }, has: function has(e) {
      return !!v(this, e);
    }, set: function set(e, t) {
      var n = v(this, e);n ? n[1] = t : this.a.push([e, t]);
    }, delete: function _delete(e) {
      var t = f(this.a, function (t) {
        return t[0] === e;
      });return ~t && this.a.splice(t, 1), !!~t;
    } }, e.exports = { getConstructor: function getConstructor(e, t, n, o) {
      var c = e(function (e, r) {
        a(e, c, t, "_i"), e._t = t, e._i = p++, e._l = void 0, null != r && u(r, n, e[o], e);
      });return r(c.prototype, { delete: function _delete(e) {
          if (!s(e)) return !1;var n = i(e);return !0 === n ? g(h(this, t)).delete(e) : n && l(n, this._i) && delete n[this._i];
        }, has: function has(e) {
          if (!s(e)) return !1;var n = i(e);return !0 === n ? g(h(this, t)).has(e) : n && l(n, this._i);
        } }), c;
    }, def: function def(e, t, n) {
      var r = i(o(t), !0);return !0 === r ? g(e).set(t, n) : r[e._i] = n, e;
    }, ufstore: g };
}, function (e, t, n) {
  var r = n(19),
      i = n(6);e.exports = function (e) {
    if (void 0 === e) return 0;var t = r(e),
        n = i(t);if (t !== n) throw RangeError("Wrong length!");return n;
  };
}, function (e, t, n) {
  var r = n(34),
      i = n(50),
      o = n(3),
      s = n(1).Reflect;e.exports = s && s.ownKeys || function (e) {
    var t = r.f(o(e)),
        n = i.f;return n ? t.concat(n(e)) : t;
  };
}, function (e, t, n) {
  var r = n(6),
      i = n(69),
      o = n(24);e.exports = function (e, t, n, s) {
    var a = o(e) + "",
        u = a.length,
        c = void 0 === n ? " " : n + "",
        l = r(t);if (l <= u || "" == c) return a;var h = l - u,
        d = i.call(c, Math.ceil(h / c.length));return d.length > h && (d = d.slice(0, h)), s ? d + a : a + d;
  };
}, function (e, t, n) {
  var r = n(8),
      i = n(31),
      o = n(15),
      s = n(45).f;e.exports = function (e) {
    return function (t) {
      for (var n, a = o(t), u = i(a), c = u.length, l = 0, h = []; c > l;) {
        n = u[l++], (!r || s.call(a, n)) && h.push(e ? [n, a[n]] : a[n]);
      }return h;
    };
  };
}, function (e) {
  var t = e.exports = { version: "2.6.11" };"number" == typeof __e && (__e = t);
}, function (e) {
  e.exports = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  };
}, function (e) {
  e.exports = { "border-radius": 1, "border-top-left-radius": 1, "border-top-right-radius": 1, "border-bottom-left-radius": 1, "border-bottom-right-radius": 1, "box-shadow": 1, order: 1, flex: function flex(e, t) {
      return [t + "box-flex"];
    }, "box-flex": 1, "box-align": 1, animation: 1, "animation-duration": 1, "animation-name": 1, transition: 1, "transition-duration": 1, transform: 1, "transform-style": 1, "transform-origin": 1, "backface-visibility": 1, perspective: 1, "box-pack": 1 };
}, function (e) {
  e.exports = { animation: 1, "column-count": 1, columns: 1, "font-weight": 1, opacity: 1, "order  ": 1, "z-index": 1, zoom: 1, flex: 1, "box-flex": 1, transform: 1, perspective: 1, "box-pack": 1, "box-align": 1, colspan: 1, rowspan: 1 };
}, function (e, t, n) {
  "use strict";
  n(125);var r = n(321),
      i = n(128),
      o = n(127),
      s = n(129),
      a = n(326),
      u = n(327),
      c = function c(e, t, n, i) {
    r(t).forEach(function (t) {
      e[i ? i(t) : t] = n;
    });
  },
      l = { cssUnitless: n(123) },
      h = function h(e, t, n, r) {
    "string" == typeof e && (e = function (e) {
      e = (e || "").split(";");var t = {};return e.forEach(function (e) {
        var n = e.split(":");2 == n.length && (t[n[0].trim()] = n[1].trim());
      }), t;
    }(e)), (t = t || l).cssUnitless = t.cssUnitless || l.cssUnitless, r = r || {};var d,
        f,
        p,
        g,
        m,
        v,
        y,
        b,
        w = t.scope || {},
        S = null == t.addUnits ? !(w && null != w.addUnits) || w.addUnits : t.addUnits,
        x = (null == t.cssUnitless ? w ? w.cssUnitless : null : t.cssUnitless) || {},
        E = (t.cssUnit || w ? w.cssUnit : null) || "px",
        M = t.prefixProperties || (w ? w.prefixProperties : null) || {},
        k = t.camelize ? o : i;for (p in e) {
      if (s(e, p)) {
        if (g = e[p], f = i(n ? n + p : p), d = !1, b = !1, u(g) && (y = g.call(w || e, g, p, f, e), a(y) && null != y.value ? (g = y.value, b = y.prefix, f = y.name ? i(y.name) : f) : g = y), v = "number" == (m = typeof g === "undefined" ? "undefined" : _typeof(g)) || "string" == m && "" != g && 1 * g == g, null == g || null == f || "" === f) continue;if ((v || "string" == m) && (d = !0), !d && null != g.value && g.prefix && (d = !0, b = g.prefix, g = g.value), d) {
          if (b = b || !!M[f], v && (g = S && !(f in x) ? g + E : g + ""), "border" != f && (f.indexOf("border") || ~f.indexOf("radius") || ~f.indexOf("width")) || !v || (f += "-width"), !f.indexOf("border-radius-") && (f.replace(/border(-radius)(-(.*))/, function (e, t, n) {
            var r = { "-top": ["-top-left", "-top-right"], "-left": ["-top-left", "-bottom-left"], "-right": ["-top-right", "-bottom-right"], "-bottom": ["-bottom-left", "-bottom-right"] };n in r ? (f = [], r[n].forEach(function (e) {
              f.push("border" + e + t);
            })) : f = "border" + n + t;
          }), Array.isArray(f))) {
            f.forEach(function (e) {
              b ? c(r, e, g, k) : r[k(e)] = g;
            });continue;
          }b ? c(r, f, g, k) : r[k(f)] = g;
        } else h(g, t, f + "-", r);
      }
    }return r;
  };e.exports = h;
}, function (e, t, n) {
  "use strict";
  var r = n(126),
      i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
      o = "undefined" == typeof document ? {} : document.documentElement.style,
      s = function () {
    var e = function () {
      for (var e in o) {
        if (i.test(e)) return e.match(i)[0];
      }return "WebkitOpacity" in o ? "Webkit" : "KhtmlOpacity" in o ? "Khtml" : "";
    }(),
        t = e.toLowerCase();return { style: e, css: "-" + t + "-", dom: { Webkit: "WebKit", ms: "MS", o: "WebKit" }[e] || r(e) };
  }();e.exports = s;
}, function (e) {
  "use strict";
  e.exports = function (e) {
    return e.length ? e.charAt(0).toUpperCase() + e.substring(1) : e;
  };
}, function (e, t, n) {
  "use strict";
  var r = function r(e, t) {
    return t ? t.toUpperCase() : "";
  },
      i = n(323);e.exports = function (e) {
    return e ? e.replace(i, r) : "";
  };
}, function (e, t, n) {
  "use strict";
  var r = n(324);e.exports = function (e) {
    return r(e).toLowerCase();
  };
}, function (e) {
  "use strict";
  var t = Object.prototype.hasOwnProperty;e.exports = function (e, n) {
    return t.call(e, n);
  };
}, function (e) {
  e.exports = function (e) {
    if (!e.webpackPolyfill) {
      var t = Object.create(e);t.children || (t.children = []), Object.defineProperty(t, "loaded", { enumerable: !0, get: function get() {
          return t.l;
        } }), Object.defineProperty(t, "id", { enumerable: !0, get: function get() {
          return t.i;
        } }), Object.defineProperty(t, "exports", { enumerable: !0 }), t.webpackPolyfill = 1;
    }return t;
  };
}, function (e, t, n) {
  function r(e, t) {
    this._init(e, t);
  }var i = n(320).string,
      o = n(329),
      s = n(330);r.prototype._init = function (e, t) {
    this.container = document.createElement("div"), this.container.id = "j3-info-popup";_extends({}, s.defaultContainerStyles, t || {});var n = i(s.defaultContainerStyles, { addUnits: !0 });n && (this.container.style.cssText = n), (e || document.body).appendChild(this.container);
  }, r.prototype.addPanel = function (e, t) {
    var n = document.createElement("div");if (n.classList.add("panel"), 0 < this.container.children.length && (n.style.cssText = i(s.defaultPanelStyles)), e) {
      var r = document.createElement("div");r.style.cssText = i(s.defaultPanelTitleStyles), r.innerText = e, n.appendChild(r);
    }if (t) {
      var a = document.createElement("div");a.style.cssText = i(s.defaultPanelContentStyles), o.number(t) || o.boolean(t) || o.string(t) ? this._generatePrimitive(n, a, t) : o.function(t) ? this._generateFunction(n, a, t) : t.nodeType && 1 === t.nodeType ? this._generateDOMElement(n, a, t) : o.object(t) ? this._generateObject(n, a, t) : console.error("Unsupported content data type");
    }this.container.appendChild(n);
  }, r.prototype._generatePrimitive = function (e, t, n) {
    t.innerText = n, e.appendChild(t);
  }, r.prototype._generateFunction = function (e, t, n) {
    e.appendChild(t);var r = function r() {
      var e = n();e ? (t.innerText = e, requestAnimationFrame(r)) : (t.innerText = "void function", console.warn("Detected void return in callback function. Callback function executed only once"));
    };requestAnimationFrame(r);
  }, r.prototype._generateDOMElement = function (e, t, n) {
    t.innerHTML = n.innerHTML, e.appendChild(t);
  }, r.prototype._generateObject = function (e, t, n) {
    t.innerText = JSON.stringify(n), e.appendChild(t);
  }, e.exports = r;
}, function (e, t, n) {
  "use strict";
  (function (e) {
    function r() {
      return o();
    }n.d(t, "a", function () {
      return r;
    });var i = function i(e, t, n, r) {
      var o = function o(t, i, _o) {
        return new r(function (e) {
          null !== _o && (_o = n.stringify(_o)), e(_o);
        }).then(function (n) {
          return e(i, { method: t, body: n });
        }).then(function (e) {
          return e.json();
        });
      },
          s = function s(e, t) {
        return o(e, t, null);
      },
          a = s.bind(null, "GET"),
          u = o.bind(null, "PUT"),
          c = o.bind(null, "POST"),
          l = s.bind(null, "DELETE"),
          h = function h(e, t) {
        return function (n) {
          for (var _len = arguments.length, r = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            r[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(n)].concat(r));
        };
      },
          d = function d(e) {
        return function (i, o) {
          return r.resolve(new t(n.stringify({ address: i.slice(e.length), method: o.method, body: n.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(e) {
          var o = "http://" + e,
              s = o + "/api";return { createUser: function createUser(e) {
              return c(s, { devicetype: e });
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
                  M = function M(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  k = M(v),
                  C = M(y),
                  O = M(b),
                  A = M(w),
                  T = M(S),
                  _ = M(x),
                  P = M(E);return { getCapabilities: a.bind(null, g), deleteUser: h(l, function (e) {
                  return m + "/whitelist/" + e;
                }), getConfig: a.bind(null, m), setConfig: u.bind(null, m), getFullState: a.bind(null, p), getLights: a.bind(null, v), getNewLights: a.bind(null, v + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return c(v, e);
                }, getLight: h(a, k), setLight: h(u, k), setLightState: h(u, function (e) {
                  return k(e) + "/state";
                }), deleteLight: h(l, k), getGroups: a.bind(null, y), createGroup: c.bind(null, y), getGroup: h(a, C), setGroup: h(u, C), setGroupState: h(u, function (e) {
                  return C(e) + "/action";
                }), deleteGroup: h(l, C), getSchedules: a.bind(null, b), createSchedule: c.bind(null, b), getSchedule: h(a, O), setSchedule: h(u, O), deleteSchedule: h(l, O), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return i(d(o), t, n, r).bridge(e).user(f);
                }, getScenes: a.bind(null, w), createScene: c.bind(null, w), getScene: h(a, A), setScene: h(u, A), setSceneLightState: function setSceneLightState(e, t, n) {
                  return u(A(e) + "/lightstates/" + t, n);
                }, deleteScene: h(l, A), getSensors: a.bind(null, S), createSensor: c.bind(null, S), searchForNewSensors: c.bind(null, S, null), getNewSensors: a.bind(null, S + "/new"), getSensor: h(a, T), setSensor: h(u, T), setSensorConfig: h(u, function (e) {
                  return T(e) + "/config";
                }), setSensorState: h(u, function (e) {
                  return T(e) + "/state";
                }), deleteSensor: h(l, T), getRules: a.bind(null, x), createRule: c.bind(null, x), getRule: h(a, _), setRule: h(u, _), deleteRule: h(l, _), ruleActionGenerator: function ruleActionGenerator() {
                  return i(d(p), t, n, r).bridge(e).user(f);
                }, getResourceLinks: a.bind(null, E), createResourceLink: c.bind(null, E), getResourceLink: h(a, P), setResourceLink: h(u, P), deleteResourceLink: h(l, P) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = i.bind(null, fetch, Response, JSON, Promise), void 0 !== e.exports && (e.exports = o));
  }).call(this, n(130)(e));
}, function (e, t, n) {
  function r(e) {
    if (this.support = i.webAudio && i.mediaStream, this.gain = 1, this.support) {
      var t = this.context = new i.AudioContext();this.microphone = t.createMediaStreamSource(e), this.gainFilter = t.createGain(), this.destination = t.createMediaStreamDestination(), this.outputStream = this.destination.stream, this.microphone.connect(this.gainFilter), this.gainFilter.connect(this.destination), e.addTrack(this.outputStream.getAudioTracks()[0]), e.removeTrack(e.getAudioTracks()[0]);
    }this.stream = e;
  }var i = n(333);r.prototype.setGain = function (e) {
    this.support && (this.gainFilter.gain.value = e, this.gain = e);
  }, r.prototype.getGain = function () {
    return this.gain;
  }, r.prototype.off = function () {
    return this.setGain(0);
  }, r.prototype.on = function () {
    this.setGain(1);
  }, e.exports = r;
}, function (e, t, n) {
  "use strict";
  n(135);var r = function (e) {
    return e && e.__esModule ? e : { default: e };
  }(n(307));r.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), r.default._babelPolyfill = !0;
}, function (e, t, n) {
  "use strict";
  n(136), n(279), n(281), n(284), n(286), n(288), n(290), n(292), n(294), n(296), n(298), n(300), n(302), n(306);
}, function (e, t, n) {
  n(137), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(216), n(218), n(219), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(229), n(230), n(231), n(232), n(233), n(234), n(235), n(236), n(237), n(238), n(239), n(240), n(241), n(81), n(242), n(109), n(243), n(110), n(244), n(245), n(246), n(247), n(111), n(250), n(251), n(252), n(253), n(254), n(255), n(256), n(257), n(258), n(259), n(260), n(261), n(262), n(263), n(264), n(265), n(266), n(267), n(268), n(269), n(270), n(271), n(272), n(273), n(274), n(275), n(276), n(277), n(278), e.exports = n(7);
}, function (e, t, n) {
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
      A = n(9),
      T = n(31),
      _ = C.f,
      P = A.f,
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
  }) ? function (e, t, n) {
    var r = _(H, t);r && delete H[t], P(e, t, n), r && e !== H && P(H, t, r);
  } : P,
      J = function J(e) {
    var t = V[e] = M(_N3[L]);return t._k = e, t;
  },
      Y = G && "symbol" == _typeof(_N3.iterator) ? function (e) {
    return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
  } : function (e) {
    return e instanceof _N3;
  },
      X = function X(e, t, n) {
    return e === H && X(z, t, n), y(e), t = x(t, !0), y(n), i(V, t) ? (n.enumerable ? (i(e, B) && e[B][t] && (e[B][t] = !1), n = M(n, { enumerable: E(0, !1) })) : (!i(e, B) && P(e, B, E(1, {})), e[B][t] = !0), q(e, t, n)) : P(e, t, n);
  },
      $ = function $(e, t) {
    y(e);for (var n, r = m(t = S(t)), i = 0, o = r.length; o > i;) {
      X(e, n = r[i++], t[n]);
    }return e;
  },
      Q = function Q(e) {
    var t = j.call(this, e = x(e, !0));return (this !== H || !i(V, e) || i(z, e)) && (!(t || !i(this, e) || !i(V, e) || i(this, B) && this[B][e]) || t);
  },
      Z = function Z(e, t) {
    if (e = S(e), t = x(t, !0), e !== H || !i(V, t) || i(z, t)) {
      var n = _(e, t);return n && i(V, t) && !(i(e, B) && e[B][t]) && (n.enumerable = !0), n;
    }
  },
      ee = function ee(e) {
    for (var t, n = I(S(e)), r = [], o = 0; n.length > o;) {
      i(V, t = n[o++]) || t == B || t == u || r.push(t);
    }return r;
  },
      te = function te(e) {
    for (var t, n = e === H, r = I(n ? z : S(e)), o = [], s = 0; r.length > s;) {
      i(V, t = r[s++]) && (!n || i(H, t)) && o.push(V[t]);
    }return o;
  };G || (a((_N3 = function N() {
    if (this instanceof _N3) throw TypeError("Symbol is not a constructor!");var e = d(0 < arguments.length ? arguments[0] : void 0),
        t = function t(n) {
      this === H && t.call(z, n), i(this, B) && i(this[B], e) && (this[B][e] = !1), q(this, e, E(1, n));
    };return o && K && q(H, e, { configurable: !0, set: t }), J(e);
  })[L], "toString", function () {
    return this._k;
  }), C.f = Z, A.f = X, n(34).f = k.f = ee, n(45).f = Q, O.f = te, o && !n(30) && a(H, "propertyIsEnumerable", Q, !0), p.f = function (e) {
    return J(f(e));
  }), s(s.G + s.W + s.F * !G, { Symbol: _N3 });for (var ne = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], re = 0; ne.length > re;) {
    f(ne[re++]);
  }for (var ie = T(f.store), oe = 0; ie.length > oe;) {
    g(ie[oe++]);
  }s(s.S + s.F * !G, "Symbol", { for: function _for(e) {
      return i(U, e += "") ? U[e] : U[e] = _N3(e);
    }, keyFor: function keyFor(e) {
      if (!Y(e)) throw TypeError(e + " is not a symbol!");for (var t in U) {
        if (U[t] === e) return t;
      }
    }, useSetter: function useSetter() {
      K = !0;
    }, useSimple: function useSimple() {
      K = !1;
    } }), s(s.S + s.F * !G, "Object", { create: function create(e, t) {
      return void 0 === t ? M(e) : $(M(e), t);
    }, defineProperty: X, defineProperties: $, getOwnPropertyDescriptor: Z, getOwnPropertyNames: ee, getOwnPropertySymbols: te });var se = c(function () {
    O.f(1);
  });s(s.S + s.F * se, "Object", { getOwnPropertySymbols: function getOwnPropertySymbols(e) {
      return O.f(w(e));
    } }), R && s(s.S + s.F * (!G || c(function () {
    var e = _N3();return "[null]" != F([e]) || "{}" != F({ a: e }) || "{}" != F(Object(e));
  })), "JSON", { stringify: function stringify(e) {
      for (var t, n, r = [e], i = 1; arguments.length > i;) {
        r.push(arguments[i++]);
      }if (n = t = r[1], (b(t) || void 0 !== e) && !Y(e)) return v(t) || (t = function t(e, _t) {
        if ("function" == typeof n && (_t = n.call(this, e, _t)), !Y(_t)) return _t;
      }), r[1] = t, F.apply(R, r);
    } }), _N3[L][D] || n(14)(_N3[L], D, _N3[L].valueOf), h(_N3, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0);
}, function (e, t, n) {
  e.exports = n(48)("native-function-to-string", Function.toString);
}, function (e, t, n) {
  var r = n(31),
      i = n(50),
      o = n(45);e.exports = function (e) {
    var t = r(e),
        n = i.f;if (n) for (var s, a = n(e), u = o.f, c = 0; a.length > c;) {
      u.call(e, s = a[c++]) && t.push(s);
    }return t;
  };
}, function (e, t, n) {
  var r = n(0);r(r.S, "Object", { create: n(33) });
}, function (e, t, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperty: n(9).f });
}, function (e, t, n) {
  var r = n(0);r(r.S + r.F * !n(8), "Object", { defineProperties: n(92) });
}, function (e, t, n) {
  var r = n(15),
      i = n(20).f;n(21)("getOwnPropertyDescriptor", function () {
    return function (e, t) {
      return i(r(e), t);
    };
  });
}, function (e, t, n) {
  var r = n(10),
      i = n(35);n(21)("getPrototypeOf", function () {
    return function (e) {
      return i(r(e));
    };
  });
}, function (e, t, n) {
  var r = n(10),
      i = n(31);n(21)("keys", function () {
    return function (e) {
      return i(r(e));
    };
  });
}, function (e, t, n) {
  n(21)("getOwnPropertyNames", function () {
    return n(93).f;
  });
}, function (e, t, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("freeze", function (e) {
    return function (t) {
      return e && r(t) ? e(i(t)) : t;
    };
  });
}, function (e, t, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("seal", function (e) {
    return function (t) {
      return e && r(t) ? e(i(t)) : t;
    };
  });
}, function (e, t, n) {
  var r = n(4),
      i = n(27).onFreeze;n(21)("preventExtensions", function (e) {
    return function (t) {
      return e && r(t) ? e(i(t)) : t;
    };
  });
}, function (e, t, n) {
  var r = n(4);n(21)("isFrozen", function (e) {
    return function (t) {
      return !r(t) || !!e && e(t);
    };
  });
}, function (e, t, n) {
  var r = n(4);n(21)("isSealed", function (e) {
    return function (t) {
      return !r(t) || !!e && e(t);
    };
  });
}, function (e, t, n) {
  var r = n(4);n(21)("isExtensible", function (e) {
    return function (t) {
      return !!r(t) && (!e || e(t));
    };
  });
}, function (e, t, n) {
  var r = n(0);r(r.S + r.F, "Object", { assign: n(94) });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Object", { is: n(95) });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Object", { setPrototypeOf: n(66).set });
}, function (e, t, n) {
  "use strict";
  var r = n(46);({})[n(5)("toStringTag")] = "z", n(11)(Object.prototype, "toString", function () {
    return "[object " + r(this) + "]";
  }, !0);
}, function (e, t, n) {
  var r = n(0);r(r.P, "Function", { bind: n(96) });
}, function (e, t, n) {
  var r = n(9).f,
      i = Function.prototype,
      o = /^\s*function ([^ (]*)/,
      s = "name";s in i || n(8) && r(i, s, { configurable: !0, get: function get() {
      try {
        return ("" + this).match(o)[1];
      } catch (e) {
        return "";
      }
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(4),
      i = n(35),
      o = n(5)("hasInstance"),
      s = Function.prototype;o in s || n(9).f(s, o, { value: function value(e) {
      if ("function" != typeof this || !r(e)) return !1;if (!r(this.prototype)) return e instanceof this;for (; e = i(e);) {
        if (this.prototype === e) return !0;
      }return !1;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(98);r(r.G + r.F * (parseInt != i), { parseInt: i });
}, function (e, t, n) {
  var r = n(0),
      i = n(99);r(r.G + r.F * (parseFloat != i), { parseFloat: i });
}, function (e, t, n) {
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
      b = function b(e) {
    var t = a(e, !1);if ("string" == typeof t && 2 < t.length) {
      var n,
          r,
          i,
          o = (t = y ? t.trim() : d(t, 3)).charCodeAt(0);if (43 === o || 45 === o) {
        if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN;
      } else if (48 === o) {
        switch (t.charCodeAt(1)) {case 66:case 98:
            r = 2, i = 49;break;case 79:case 111:
            r = 8, i = 55;break;default:
            return +t;}for (var s, u = t.slice(2), c = 0, l = u.length; c < l; c++) {
          if (48 > (s = u.charCodeAt(c)) || s > i) return NaN;
        }return parseInt(u, r);
      }
    }return +t;
  };if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
    _p = function p(e) {
      var t = 1 > arguments.length ? 0 : e,
          n = this;return n instanceof _p && (v ? u(function () {
        m.valueOf.call(n);
      }) : o(n) != f) ? s(new g(b(t)), n, _p) : b(t);
    };for (var w, S = n(8) ? c(g) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; S.length > x; x++) {
      i(g, w = S[x]) && !i(_p, w) && h(_p, w, l(g, w));
    }_p.prototype = m, m.constructor = _p, n(11)(r, f, _p);
  }
}, function (e, t, n) {
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
      d = function d(e, t) {
    for (var n = -1, r = t; 6 > ++n;) {
      r += e * c[n], c[n] = r % 1e7, r = u(r / 1e7);
    }
  },
      f = function f(e) {
    for (var t = 6, n = 0; 0 <= --t;) {
      n += c[t], c[t] = u(n / e), n = n % e * 1e7;
    }
  },
      p = function p() {
    for (var e = 6, t = ""; 0 <= --e;) {
      if ("" !== t || 0 == e || 0 !== c[e]) {
        var n = c[e] + "";t = "" === t ? n : t + s.call(h, 7 - n.length) + n;
      }
    }return t;
  },
      g = function g(e, t, n) {
    return 0 === t ? n : 1 == t % 2 ? g(e, t - 1, n * e) : g(e * e, t / 2, n);
  };r(r.P + r.F * ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0) || !n(2)(function () {
    a.call({});
  })), "Number", { toFixed: function toFixed(e) {
      var t,
          n,
          r,
          a,
          u = o(this, l),
          c = i(e),
          m = "",
          v = h;if (0 > c || 20 < c) throw RangeError(l);if (u != u) return "NaN";if (-1e21 >= u || 1e21 <= u) return u + "";if (0 > u && (m = "-", u = -u), 1e-21 < u) if (n = 0 > (t = function (e) {
        for (var t = 0, n = e; 4096 <= n;) {
          t += 12, n /= 4096;
        }for (; 2 <= n;) {
          t += 1, n /= 2;
        }return t;
      }(u * g(2, 69, 1)) - 69) ? u * g(2, -t, 1) : u / g(2, t, 1), n *= 4503599627370496, 0 < (t = 52 - t)) {
        for (d(0, n), r = c; 7 <= r;) {
          d(1e7, 0), r -= 7;
        }for (d(g(10, r, 1), 0), r = t - 1; 23 <= r;) {
          f(8388608), r -= 23;
        }f(1 << r), d(1, 1), f(2), v = p();
      } else d(0, n), d(1 << -t, 0), v = p() + s.call(h, c);return 0 < c ? v = m + ((a = v.length) <= c ? "0." + s.call(h, c - a) + v : v.slice(0, a - c) + "." + v.slice(a - c)) : v = m + v, v;
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(2),
      o = n(100),
      s = 1..toPrecision;r(r.P + r.F * (i(function () {
    return "1" !== s.call(1, void 0);
  }) || !i(function () {
    s.call({});
  })), "Number", { toPrecision: function toPrecision(e) {
      var t = o(this, "Number#toPrecision: incorrect invocation!");return void 0 === e ? s.call(t) : s.call(t, e);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Number", { EPSILON: 2220446049250313e-31 });
}, function (e, t, n) {
  var r = n(0),
      i = n(1).isFinite;r(r.S, "Number", { isFinite: function isFinite(e) {
      return "number" == typeof e && i(e);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Number", { isInteger: n(101) });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Number", { isNaN: function isNaN(e) {
      return e != e;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(101),
      o = Math.abs;r(r.S, "Number", { isSafeInteger: function isSafeInteger(e) {
      return i(e) && 9007199254740991 >= o(e);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
}, function (e, t, n) {
  var r = n(0),
      i = n(99);r(r.S + r.F * (Number.parseFloat != i), "Number", { parseFloat: i });
}, function (e, t, n) {
  var r = n(0),
      i = n(98);r(r.S + r.F * (Number.parseInt != i), "Number", { parseInt: i });
}, function (e, t, n) {
  var r = n(0),
      i = n(102),
      o = Math.sqrt,
      s = Math.acosh;r(r.S + r.F * !(s && 710 == Math.floor(s(Number.MAX_VALUE)) && s(1 / 0) == 1 / 0), "Math", { acosh: function acosh(e) {
      return 1 > (e = +e) ? NaN : 94906265.62425156 < e ? Math.log(e) + Math.LN2 : i(e - 1 + o(e - 1) * o(e + 1));
    } });
}, function (e, t, n) {
  var r = n(0),
      i = Math.asinh;r(r.S + r.F * !(i && 0 < 1 / i(0)), "Math", { asinh: function e(t) {
      return isFinite(t = +t) && 0 != t ? 0 > t ? -e(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = Math.atanh;r(r.S + r.F * !(i && 0 > 1 / i(-0)), "Math", { atanh: function atanh(e) {
      return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(70);r(r.S, "Math", { cbrt: function cbrt(e) {
      return i(e = +e) * Math.pow(Math.abs(e), 1 / 3);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { clz32: function clz32(e) {
      return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = Math.exp;r(r.S, "Math", { cosh: function cosh(e) {
      return (i(e = +e) + i(-e)) / 2;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(71);r(r.S + r.F * (i != Math.expm1), "Math", { expm1: i });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { fround: n(182) });
}, function (e, t, n) {
  var r = n(70),
      i = Math.pow,
      o = i(2, -52),
      s = i(2, -23),
      a = i(2, 127) * (2 - s),
      u = i(2, -126);e.exports = Math.fround || function (e) {
    var t,
        n,
        i = Math.abs(e),
        c = r(e);return i < u ? c * function (e) {
      return e + 1 / o - 1 / o;
    }(i / u / s) * u * s : (n = (t = (1 + s / o) * i) - (t - i)) > a || n != n ? c * (1 / 0) : c * n;
  };
}, function (e, t, n) {
  var r = n(0),
      i = Math.abs;r(r.S, "Math", { hypot: function hypot() {
      for (var e, t, n = 0, r = 0, o = arguments.length, s = 0; r < o;) {
        s < (e = i(arguments[r++])) ? (n = n * (t = s / e) * t + 1, s = e) : 0 < e ? n += (t = e / s) * t : n += e;
      }return s == 1 / 0 ? 1 / 0 : s * Math.sqrt(n);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = Math.imul;r(r.S + r.F * n(2)(function () {
    return -5 != i(4294967295, 5) || 2 != i.length;
  }), "Math", { imul: function imul(e, t) {
      var n = 65535,
          r = +e,
          i = +t,
          o = n & r,
          s = n & i;return 0 | o * s + ((n & r >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { log10: function log10(e) {
      return Math.log(e) * Math.LOG10E;
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { log1p: n(102) });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { log2: function log2(e) {
      return Math.log(e) / Math.LN2;
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { sign: n(70) });
}, function (e, t, n) {
  var r = n(0),
      i = n(71),
      o = Math.exp;r(r.S + r.F * n(2)(function () {
    return !0;
  }), "Math", { sinh: function sinh(e) {
      return 1 > Math.abs(e = +e) ? (i(e) - i(-e)) / 2 : (o(e - 1) - o(-e - 1)) * (Math.E / 2);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(71),
      o = Math.exp;r(r.S, "Math", { tanh: function tanh(e) {
      var t = i(e = +e),
          n = i(-e);return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (o(e) + o(-e));
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Math", { trunc: function trunc(e) {
      return (0 < e ? Math.floor : Math.ceil)(e);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(32),
      o = String.fromCharCode,
      s = String.fromCodePoint;r(r.S + r.F * (!!s && 1 != s.length), "String", { fromCodePoint: function fromCodePoint() {
      for (var e, t = [], n = arguments.length, r = 0; n > r;) {
        if (e = +arguments[r++], i(e, 1114111) !== e) throw RangeError(e + " is not a valid code point");t.push(65536 > e ? o(e) : o(55296 + ((e -= 65536) >> 10), e % 1024 + 56320));
      }return t.join("");
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(15),
      o = n(6);r(r.S, "String", { raw: function raw(e) {
      for (var t = i(e.raw), n = o(t.length), r = arguments.length, s = [], a = 0; n > a;) {
        s.push(t[a++] + ""), a < r && s.push(arguments[a] + "");
      }return s.join("");
    } });
}, function (e, t, n) {
  "use strict";
  n(39)("trim", function (e) {
    return function () {
      return e(this, 3);
    };
  });
}, function (e, t, n) {
  "use strict";
  var r = n(72)(!0);n(73)(String, "String", function (e) {
    this._t = e + "", this._i = 0;
  }, function () {
    var e,
        t = this._t,
        n = this._i;return n >= t.length ? { value: void 0, done: !0 } : (e = r(t, n), this._i += e.length, { value: e, done: !1 });
  });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(72)(!1);r(r.P, "String", { codePointAt: function codePointAt(e) {
      return i(this, e);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(6),
      o = n(74),
      s = "endsWith";r(r.P + r.F * n(76)(s), "String", { endsWith: function endsWith(e) {
      var t = o(this, e, s),
          n = 1 < arguments.length ? arguments[1] : void 0,
          r = i(t.length),
          a = void 0 === n ? r : Math.min(i(n), r),
          u = e + "";return t.slice(a - u.length, a) === u;
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(74),
      o = "includes";r(r.P + r.F * n(76)(o), "String", { includes: function includes(e) {
      return !!~i(this, e, o).indexOf(e, 1 < arguments.length ? arguments[1] : void 0);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.P, "String", { repeat: n(69) });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(6),
      o = n(74),
      s = "startsWith";r(r.P + r.F * n(76)(s), "String", { startsWith: function startsWith(e) {
      var t = o(this, e, s),
          n = i(Math.min(1 < arguments.length ? arguments[1] : void 0, t.length)),
          r = e + "";return t.slice(n, n + r.length) === r;
    } });
}, function (e, t, n) {
  "use strict";
  n(12)("anchor", function (e) {
    return function (t) {
      return e(this, "a", "name", t);
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("big", function (e) {
    return function () {
      return e(this, "big", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("blink", function (e) {
    return function () {
      return e(this, "blink", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("bold", function (e) {
    return function () {
      return e(this, "b", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("fixed", function (e) {
    return function () {
      return e(this, "tt", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("fontcolor", function (e) {
    return function (t) {
      return e(this, "font", "color", t);
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("fontsize", function (e) {
    return function (t) {
      return e(this, "font", "size", t);
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("italics", function (e) {
    return function () {
      return e(this, "i", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("link", function (e) {
    return function (t) {
      return e(this, "a", "href", t);
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("small", function (e) {
    return function () {
      return e(this, "small", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("strike", function (e) {
    return function () {
      return e(this, "strike", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("sub", function (e) {
    return function () {
      return e(this, "sub", "", "");
    };
  });
}, function (e, t, n) {
  "use strict";
  n(12)("sup", function (e) {
    return function () {
      return e(this, "sup", "", "");
    };
  });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Date", { now: function now() {
      return new Date().getTime();
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(10),
      o = n(26);r(r.P + r.F * n(2)(function () {
    return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
        return 1;
      } });
  }), "Date", { toJSON: function toJSON() {
      var e = i(this),
          t = o(e);return "number" != typeof t || isFinite(t) ? e.toISOString() : null;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(217);r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", { toISOString: i });
}, function (e, t, n) {
  "use strict";
  var r = n(2),
      i = Date.prototype.getTime,
      o = Date.prototype.toISOString,
      s = function s(e) {
    return 9 < e ? e : "0" + e;
  };e.exports = r(function () {
    return "0385-07-25T07:06:39.999Z" != o.call(new Date(-50000000000001));
  }) || !r(function () {
    o.call(new Date(NaN));
  }) ? function () {
    if (!isFinite(i.call(this))) throw RangeError("Invalid time value");var e = this,
        t = e.getUTCFullYear(),
        n = e.getUTCMilliseconds(),
        r = 0 > t ? "-" : 9999 < t ? "+" : "";return r + ("00000" + Math.abs(t)).slice(r ? -6 : -4) + "-" + s(e.getUTCMonth() + 1) + "-" + s(e.getUTCDate()) + "T" + s(e.getUTCHours()) + ":" + s(e.getUTCMinutes()) + ":" + s(e.getUTCSeconds()) + "." + (99 < n ? n : "0" + s(n)) + "Z";
  } : o;
}, function (e, t, n) {
  var r = Date.prototype,
      i = "Invalid Date",
      o = "toString",
      s = r[o],
      a = r.getTime;new Date(NaN) + "" != i && n(11)(r, o, function () {
    var e = a.call(this);return e == e ? s.call(this) : i;
  });
}, function (e, t, n) {
  var r = n(5)("toPrimitive"),
      i = Date.prototype;r in i || n(14)(i, r, n(220));
}, function (e, t, n) {
  "use strict";
  var r = n(3),
      i = n(26),
      o = "number";e.exports = function (e) {
    if ("string" !== e && e !== o && "default" !== e) throw TypeError("Incorrect hint");return i(r(this), e != o);
  };
}, function (e, t, n) {
  var r = n(0);r(r.S, "Array", { isArray: n(51) });
}, function (e, t, n) {
  "use strict";
  var r = n(17),
      i = n(0),
      o = n(10),
      s = n(104),
      a = n(77),
      u = n(6),
      c = n(78),
      l = n(79);i(i.S + i.F * !n(52)(function (e) {
    Array.from(e);
  }), "Array", { from: function from(e) {
      var t,
          n,
          i,
          h,
          d = o(e),
          f = "function" == typeof this ? this : Array,
          p = arguments.length,
          g = 1 < p ? arguments[1] : void 0,
          m = void 0 !== g,
          v = 0,
          y = l(d);if (m && (g = r(g, 2 < p ? arguments[2] : void 0, 2)), null == y || f == Array && a(y)) for (n = new f(t = u(d.length)); t > v; v++) {
        c(n, v, m ? g(d[v], v) : d[v]);
      } else for (h = y.call(d), n = new f(); !(i = h.next()).done; v++) {
        c(n, v, m ? s(h, g, [i.value, v], !0) : i.value);
      }return n.length = v, n;
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(78);r(r.S + r.F * n(2)(function () {
    function e() {}return !(Array.of.call(e) instanceof e);
  }), "Array", { of: function of() {
      for (var e = 0, t = arguments.length, n = new ("function" == typeof this ? this : Array)(t); t > e;) {
        i(n, e, arguments[e++]);
      }return n.length = t, n;
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(15),
      o = [].join;r(r.P + r.F * (n(44) != Object || !n(16)(o)), "Array", { join: function join(e) {
      return o.call(i(this), void 0 === e ? "," : e);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(65),
      o = n(23),
      s = n(32),
      a = n(6),
      u = [].slice;r(r.P + r.F * n(2)(function () {
    i && u.call(i);
  }), "Array", { slice: function slice(e, t) {
      var n = a(this.length),
          r = o(this);if (t = void 0 === t ? n : t, "Array" == r) return u.call(this, e, t);for (var i = s(e, n), c = s(t, n), l = a(c - i), h = Array(l), d = 0; d < l; d++) {
        h[d] = "String" == r ? this.charAt(i + d) : this[i + d];
      }return h;
    } });
}, function (e, t, n) {
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
  }) || !n(16)(a)), "Array", { sort: function sort(e) {
      return void 0 === e ? a.call(o(this)) : a.call(o(this), i(e));
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(0),
      o = n(16)([].forEach, !0);r(r.P + r.F * !o, "Array", { forEach: function forEach(e) {
      return i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  var r = n(4),
      i = n(51),
      o = n(5)("species");e.exports = function (e) {
    var t;return i(e) && ("function" == typeof (t = e.constructor) && (t === Array || i(t.prototype)) && (t = void 0), r(t) && null === (t = t[o]) && (t = void 0)), void 0 === t ? Array : t;
  };
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(1);r(r.P + r.F * !n(16)([].map, !0), "Array", { map: function map(e) {
      return i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(2);r(r.P + r.F * !n(16)([].filter, !0), "Array", { filter: function filter(e) {
      return i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(3);r(r.P + r.F * !n(16)([].some, !0), "Array", { some: function some(e) {
      return i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(4);r(r.P + r.F * !n(16)([].every, !0), "Array", { every: function every(e) {
      return i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(106);r(r.P + r.F * !n(16)([].reduce, !0), "Array", { reduce: function reduce(e) {
      return i(this, e, arguments.length, arguments[1], !1);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(106);r(r.P + r.F * !n(16)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(e) {
      return i(this, e, arguments.length, arguments[1], !0);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(49)(!1),
      o = [].indexOf,
      s = !!o && 0 > 1 / [1].indexOf(1, -0);r(r.P + r.F * (s || !n(16)(o)), "Array", { indexOf: function indexOf(e) {
      return s ? o.apply(this, arguments) || 0 : i(this, e, arguments[1]);
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(15),
      o = n(19),
      s = n(6),
      a = [].lastIndexOf,
      u = !!a && 0 > 1 / [1].lastIndexOf(1, -0);r(r.P + r.F * (u || !n(16)(a)), "Array", { lastIndexOf: function lastIndexOf(e) {
      if (u) return a.apply(this, arguments) || 0;var t = i(this),
          n = s(t.length),
          r = n - 1;for (1 < arguments.length && (r = Math.min(r, o(arguments[1]))), 0 > r && (r = n + r); 0 <= r; r--) {
        if (r in t && t[r] === e) return r || 0;
      }return -1;
    } });
}, function (e, t, n) {
  var r = n(0);r(r.P, "Array", { copyWithin: n(107) }), n(36)("copyWithin");
}, function (e, t, n) {
  var r = n(0);r(r.P, "Array", { fill: n(80) }), n(36)("fill");
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(5),
      o = "find",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { find: function find(e) {
      return i(this, e, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(22)(6),
      o = "findIndex",
      s = !0;o in [] && [,][o](function () {
    s = !1;
  }), r(r.P + r.F * s, "Array", { findIndex: function findIndex(e) {
      return i(this, e, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)(o);
}, function (e, t, n) {
  n(41)("Array");
}, function (e, t, n) {
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
    _c2 = function c(e, t) {
      var n = this instanceof _c2,
          r = a(e),
          o = void 0 === t;return !n && r && e.constructor === _c2 && o ? e : i(p ? new l(r && !o ? e.source : e, t) : l((r = e instanceof _c2) ? e.source : e, r && o ? u.call(e) : t), n ? this : h, _c2);
    };for (var g = function g(e) {
      (e in _c2) || o(_c2, e, { configurable: !0, get: function get() {
          return l[e];
        }, set: function set(t) {
          l[e] = t;
        } });
    }, m = s(l), v = 0; m.length > v;) {
      g(m[v++]);
    }h.constructor = _c2, _c2.prototype = h, n(11)(r, "RegExp", _c2);
  }n(41)("RegExp");
}, function (e, t, n) {
  "use strict";
  n(110);var r = n(3),
      i = n(53),
      o = n(8),
      s = "toString",
      a = /./[s],
      u = function u(e) {
    n(11)(RegExp.prototype, s, e, !0);
  };n(2)(function () {
    return "/a/b" != a.call({ source: "a", flags: "b" });
  }) ? u(function () {
    var e = r(this);return "/".concat(e.source, "/", "flags" in e ? e.flags : !o && e instanceof RegExp ? i.call(e) : void 0);
  }) : a.name != s && u(function () {
    return a.call(this);
  });
}, function (e, t, n) {
  "use strict";
  var r = n(3),
      i = n(6),
      o = n(83),
      s = n(54);n(55)("match", 1, function (e, t, n, a) {
    return [function (n) {
      var r = e(this),
          i = null == n ? void 0 : n[t];return void 0 === i ? new RegExp(n)[t](r + "") : i.call(n, r);
    }, function (e) {
      var t = a(n, e, this);if (t.done) return t.value;var u = r(e),
          c = this + "";if (!u.global) return s(u, c);var l = u.unicode;u.lastIndex = 0;for (var h, d = [], f = 0; null !== (h = s(u, c));) {
        var p = h[0] + "";d[f] = p, "" == p && (u.lastIndex = o(c, i(u.lastIndex), l)), f++;
      }return 0 == f ? null : d;
    }];
  });
}, function (e, t, n) {
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
      p = function p(e) {
    return void 0 === e ? e : e + "";
  };n(55)("replace", 2, function (e, t, n, g) {
    function m(e, t, r, o, s, a) {
      var u = r + e.length,
          c = o.length,
          l = f;return void 0 !== s && (s = i(s), l = d), n.call(a, l, function (n, i) {
        var a;switch (i.charAt(0)) {case "$":
            return "$";case "&":
            return e;case "`":
            return t.slice(0, r);case "'":
            return t.slice(u);case "<":
            a = s[i.slice(1, -1)];break;default:
            var l = +i;if (0 == l) return n;if (l > c) {
              var d = h(l / 10);return 0 === d ? n : d <= c ? void 0 === o[d - 1] ? i.charAt(1) : o[d - 1] + i.charAt(1) : n;
            }a = o[l - 1];}return void 0 === a ? "" : a;
      });
    }return [function (r, i) {
      var o = e(this),
          s = null == r ? void 0 : r[t];return void 0 === s ? n.call(o + "", r, i) : s.call(r, o, i);
    }, function (e, t) {
      var i = g(n, e, this, t);if (i.done) return i.value;var h = r(e),
          d = this + "",
          f = "function" == typeof t;f || (t += "");var v = h.global;if (v) {
        var y = h.unicode;h.lastIndex = 0;
      }for (var b, w = []; null !== (b = u(h, d)) && (w.push(b), v);) {
        "" == b[0] + "" && (h.lastIndex = a(d, o(h.lastIndex), y));
      }for (var S = "", x = 0, E = 0; E < w.length; E++) {
        for (var M = (b = w[E])[0] + "", k = c(l(s(b.index), d.length), 0), C = [], O = 1; O < b.length; O++) {
          C.push(p(b[O]));
        }var A = b.groups;if (f) {
          var T = [M].concat(C, k, d);void 0 !== A && T.push(A);var _ = t.apply(void 0, T) + "";
        } else _ = m(M, d, k, C, A, t);k >= x && (S += d.slice(x, k) + _, x = k + M.length);
      }return S + d.slice(x);
    }];
  });
}, function (e, t, n) {
  "use strict";
  var r = n(3),
      i = n(95),
      o = n(54);n(55)("search", 1, function (e, t, n, s) {
    return [function (n) {
      var r = e(this),
          i = null == n ? void 0 : n[t];return void 0 === i ? new RegExp(n)[t](r + "") : i.call(n, r);
    }, function (e) {
      var t = s(n, e, this);if (t.done) return t.value;var a = r(e),
          u = this + "",
          c = a.lastIndex;i(c, 0) || (a.lastIndex = 0);var l = o(a, u);return i(a.lastIndex, c) || (a.lastIndex = c), null === l ? -1 : l.index;
    }];
  });
}, function (e, t, n) {
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
  });n(55)("split", 2, function (e, t, n, l) {
    var y;return y = "c" == "abbc"[f](/(b)*/)[1] || 4 != "test"[f](/(?:)/, -1)[p] || 2 != "ab"[f](/(?:ab)*/)[p] || 4 != "."[f](/(.?)(.?)/)[p] || 1 < "."[f](/()()/)[p] || ""[f](/.?/)[p] ? function (e, t) {
      var i = this + "";if (void 0 === e && 0 === t) return [];if (!r(e)) return n.call(i, e, t);for (var o, s, a, u = [], l = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), h = 0, f = void 0 === t ? m : t >>> 0, v = new RegExp(e.source, l + "g"); (o = c.call(v, i)) && !((s = v[g]) > h && (u.push(i.slice(h, o.index)), 1 < o[p] && o.index < i[p] && d.apply(u, o.slice(1)), a = o[0][p], h = s, u[p] >= f));) {
        v[g] === o.index && v[g]++;
      }return h === i[p] ? (a || !v.test("")) && u.push("") : u.push(i.slice(h)), u[p] > f ? u.slice(0, f) : u;
    } : "0"[f](void 0, 0)[p] ? function (e, t) {
      return void 0 === e && 0 === t ? [] : n.call(this, e, t);
    } : n, [function (n, r) {
      var i = e(this),
          o = null == n ? void 0 : n[t];return void 0 === o ? y.call(i + "", n, r) : o.call(n, i, r);
    }, function (e, t) {
      var r = l(y, e, this, t, y !== n);if (r.done) return r.value;var c = i(e),
          d = this + "",
          f = o(c, RegExp),
          p = c.unicode,
          g = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (v ? "y" : "g"),
          b = new f(v ? c : "^(?:" + c.source + ")", g),
          w = void 0 === t ? m : t >>> 0;if (0 == w) return [];if (0 === d.length) return null === u(b, d) ? [d] : [];for (var S = 0, x = 0, E = []; x < d.length;) {
        b.lastIndex = v ? x : 0;var M,
            k = u(b, v ? d : d.slice(x));if (null === k || (M = h(a(b.lastIndex + (v ? 0 : x)), d.length)) === S) x = s(d, x, p);else {
          if (E.push(d.slice(S, x)), E.length === w) return E;for (var C = 1; C <= k.length - 1; C++) {
            if (E.push(k[C]), E.length === w) return E;
          }x = S = M;
        }
      }return E.push(d.slice(S)), E;
    }];
  });
}, function (e, t, n) {
  var r = n(1),
      i = n(84).set,
      o = r.MutationObserver || r.WebKitMutationObserver,
      s = r.process,
      a = r.Promise,
      u = "process" == n(23)(s);e.exports = function () {
    var e,
        t,
        n,
        c = function c() {
      var r, i;for (u && (r = s.domain) && r.exit(); e;) {
        i = e.fn, e = e.next;try {
          i();
        } catch (i) {
          throw e ? n() : t = void 0, i;
        }
      }t = void 0, r && r.enter();
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
      var i = { fn: r, next: void 0 };t && (t.next = i), e || (e = i, n()), t = i;
    };
  };
}, function (e) {
  e.exports = function (e) {
    try {
      return { e: !1, v: e() };
    } catch (e) {
      return { e: !0, v: e };
    }
  };
}, function (e, t, n) {
  "use strict";
  var r = n(114),
      i = n(37),
      o = "Map";e.exports = n(58)(o, function (e) {
    return function () {
      return e(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { get: function get(e) {
      var t = r.getEntry(i(this, o), e);return t && t.v;
    }, set: function set(e, t) {
      return r.def(i(this, o), 0 === e ? 0 : e, t);
    } }, r, !0);
}, function (e, t, n) {
  "use strict";
  var r = n(114),
      i = n(37);e.exports = n(58)("Set", function (e) {
    return function () {
      return e(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(e) {
      return r.def(i(this, "Set"), e = 0 === e ? 0 : e, e);
    } }, r);
}, function (e, t, n) {
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
      y = function y(e) {
    return function () {
      return e(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  },
      b = { get: function get(e) {
      if (l(e)) {
        var t = g(e);return !0 === t ? v(h(this, p)).get(e) : t ? t[this._i] : void 0;
      }
    }, set: function set(e, t) {
      return c.def(h(this, p), e, t);
    } },
      w = e.exports = n(58)(p, y, b, c, !0, !0);d && f && (u((r = c.getConstructor(y, p)).prototype, b), a.NEED = !0, o(["delete", "has", "get", "set"], function (e) {
    var t = w.prototype,
        n = t[e];s(t, e, function (t, i) {
      if (l(t) && !m(t)) {
        this._f || (this._f = new r());var o = this._f[e](t, i);return "set" == e ? this : o;
      }return n.call(this, t, i);
    });
  }));
}, function (e, t, n) {
  "use strict";
  var r = n(115),
      i = n(37),
      o = "WeakSet";n(58)(o, function (e) {
    return function () {
      return e(this, 0 < arguments.length ? arguments[0] : void 0);
    };
  }, { add: function add(e) {
      return r.def(i(this, o), e, !0);
    } }, r, !1, !0);
}, function (e, t, n) {
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
      v = "ArrayBuffer";r(r.G + r.W + r.F * (l !== d), { ArrayBuffer: d }), r(r.S + r.F * !i.CONSTR, v, { isView: function isView(e) {
      return p && p(e) || c(e) && m in e;
    } }), r(r.P + r.U + r.F * n(2)(function () {
    return !new d(2).slice(1, void 0).byteLength;
  }), v, { slice: function slice(e, t) {
      if (void 0 !== g && void 0 === t) return g.call(s(this), e);for (var n = s(this).byteLength, r = a(e, n), i = a(void 0 === t ? n : t, n), o = new (h(this, d))(u(i - r)), c = new f(this), l = new f(o), p = 0; r < i;) {
        l.setUint8(p++, c.getUint8(r++));
      }return o;
    } }), n(41)(v);
}, function (e, t, n) {
  var r = n(0);r(r.G + r.W + r.F * !n(59).ABV, { DataView: n(85).DataView });
}, function (e, t, n) {
  n(25)("Int8", 1, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Uint8", 1, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Uint8", 1, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  }, !0);
}, function (e, t, n) {
  n(25)("Int16", 2, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Uint16", 2, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Int32", 4, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Uint32", 4, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Float32", 4, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  n(25)("Float64", 8, function (e) {
    return function (t, n, r) {
      return e(this, t, n, r);
    };
  });
}, function (e, t, n) {
  var r = n(0),
      i = n(18),
      o = n(3),
      s = (n(1).Reflect || {}).apply,
      a = Function.apply;r(r.S + r.F * !n(2)(function () {
    s(function () {});
  }), "Reflect", { apply: function apply(e, t, n) {
      var r = i(e),
          u = o(n);return s ? s(r, t, u) : a.call(r, t, u);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(33),
      o = n(18),
      s = n(3),
      a = n(4),
      u = n(2),
      c = n(96),
      l = (n(1).Reflect || {}).construct,
      h = u(function () {
    function e() {}return !(l(function () {}, [], e) instanceof e);
  }),
      d = !u(function () {
    l(function () {});
  });r(r.S + r.F * (h || d), "Reflect", { construct: function construct(e, t) {
      o(e), s(t);var n = 3 > arguments.length ? e : o(arguments[2]);if (d && !h) return l(e, t, n);if (e == n) {
        switch (t.length) {case 0:
            return new e();case 1:
            return new e(t[0]);case 2:
            return new e(t[0], t[1]);case 3:
            return new e(t[0], t[1], t[2]);case 4:
            return new e(t[0], t[1], t[2], t[3]);}var r = [null];return r.push.apply(r, t), new (c.apply(e, r))();
      }var u = n.prototype,
          f = i(a(u) ? u : Object.prototype),
          p = Function.apply.call(e, f, t);return a(p) ? p : f;
    } });
}, function (e, t, n) {
  var r = n(9),
      i = n(0),
      o = n(3),
      s = n(26);i(i.S + i.F * n(2)(function () {
    Reflect.defineProperty(r.f({}, 1, { value: 1 }), 1, { value: 2 });
  }), "Reflect", { defineProperty: function defineProperty(e, t, n) {
      o(e), t = s(t, !0), o(n);try {
        return r.f(e, t, n), !0;
      } catch (t) {
        return !1;
      }
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(20).f,
      o = n(3);r(r.S, "Reflect", { deleteProperty: function deleteProperty(e, t) {
      var n = i(o(e), t);return (!n || n.configurable) && delete e[t];
    } });
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(3),
      o = function o(e) {
    this._t = i(e), this._i = 0;var t,
        n = this._k = [];for (t in e) {
      n.push(t);
    }
  };n(103)(o, "Object", function () {
    var e,
        t = this,
        n = t._k;do {
      if (t._i >= n.length) return { value: void 0, done: !0 };
    } while (!((e = n[t._i++]) in t._t));return { value: e, done: !1 };
  }), r(r.S, "Reflect", { enumerate: function enumerate(e) {
      return new o(e);
    } });
}, function (e, t, n) {
  var r = n(20),
      i = n(35),
      o = n(13),
      s = n(0),
      a = n(4),
      u = n(3);s(s.S, "Reflect", { get: function e(t, n) {
      var s,
          c,
          l = 3 > arguments.length ? t : arguments[2];return u(t) === l ? t[n] : (s = r.f(t, n)) ? o(s, "value") ? s.value : void 0 === s.get ? void 0 : s.get.call(l) : a(c = i(t)) ? e(c, n, l) : void 0;
    } });
}, function (e, t, n) {
  var r = n(20),
      i = n(0),
      o = n(3);i(i.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(e, t) {
      return r.f(o(e), t);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(35),
      o = n(3);r(r.S, "Reflect", { getPrototypeOf: function getPrototypeOf(e) {
      return i(o(e));
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Reflect", { has: function has(e, t) {
      return t in e;
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(3),
      o = Object.isExtensible;r(r.S, "Reflect", { isExtensible: function isExtensible(e) {
      return i(e), !o || o(e);
    } });
}, function (e, t, n) {
  var r = n(0);r(r.S, "Reflect", { ownKeys: n(117) });
}, function (e, t, n) {
  var r = n(0),
      i = n(3),
      o = Object.preventExtensions;r(r.S, "Reflect", { preventExtensions: function preventExtensions(e) {
      i(e);try {
        return o && o(e), !0;
      } catch (e) {
        return !1;
      }
    } });
}, function (e, t, n) {
  var r = n(9),
      i = n(20),
      o = n(35),
      s = n(13),
      a = n(0),
      u = n(28),
      c = n(3),
      l = n(4);a(a.S, "Reflect", { set: function e(t, n, a) {
      var h,
          d,
          f = 4 > arguments.length ? t : arguments[3],
          p = i.f(c(t), n);if (!p) {
        if (l(d = o(t))) return e(d, n, a, f);p = u(0);
      }if (s(p, "value")) {
        if (!1 === p.writable || !l(f)) return !1;if (h = i.f(f, n)) {
          if (h.get || h.set || !1 === h.writable) return !1;h.value = a, r.f(f, n, h);
        } else r.f(f, n, u(0, a));return !0;
      }return void 0 !== p.set && (p.set.call(f, a), !0);
    } });
}, function (e, t, n) {
  var r = n(0),
      i = n(66);i && r(r.S, "Reflect", { setPrototypeOf: function setPrototypeOf(e, t) {
      i.check(e, t);try {
        return i.set(e, t), !0;
      } catch (t) {
        return !1;
      }
    } });
}, function (e, t, n) {
  n(280), e.exports = n(7).Array.includes;
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(49)(!0);r(r.P, "Array", { includes: function includes(e) {
      return i(this, e, 1 < arguments.length ? arguments[1] : void 0);
    } }), n(36)("includes");
}, function (e, t, n) {
  n(282), e.exports = n(7).Array.flatMap;
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(283),
      o = n(10),
      s = n(6),
      a = n(18),
      u = n(105);r(r.P, "Array", { flatMap: function flatMap(e) {
      var t,
          n,
          r = o(this);return a(e), t = s(r.length), n = u(r, 0), i(n, r, r, t, 0, 1, e, arguments[1]), n;
    } }), n(36)("flatMap");
}, function (e, t, n) {
  "use strict";
  var r = n(51),
      i = n(4),
      o = n(6),
      s = n(17),
      a = n(5)("isConcatSpreadable");e.exports = function e(t, n, u, c, l, h, d, f) {
    for (var p, g, m = l, v = 0, y = !!d && s(d, f, 3); v < c;) {
      if (v in u) {
        if (p = y ? y(u[v], v, n) : u[v], g = !1, i(p) && (g = void 0 === (g = p[a]) ? r(p) : !!g), g && 0 < h) m = e(t, n, p, o(p.length), m, h - 1) - 1;else {
          if (9007199254740991 <= m) throw TypeError();t[m] = p;
        }m++;
      }v++;
    }return m;
  };
}, function (e, t, n) {
  n(285), e.exports = n(7).String.padStart;
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(118),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padStart: function padStart(e) {
      return i(this, e, 1 < arguments.length ? arguments[1] : void 0, !0);
    } });
}, function (e, t, n) {
  n(287), e.exports = n(7).String.padEnd;
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(118),
      o = n(57),
      s = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P + r.F * s, "String", { padEnd: function padEnd(e) {
      return i(this, e, 1 < arguments.length ? arguments[1] : void 0, !1);
    } });
}, function (e, t, n) {
  n(289), e.exports = n(7).String.trimLeft;
}, function (e, t, n) {
  "use strict";
  n(39)("trimLeft", function (e) {
    return function () {
      return e(this, 1);
    };
  }, "trimStart");
}, function (e, t, n) {
  n(291), e.exports = n(7).String.trimRight;
}, function (e, t, n) {
  "use strict";
  n(39)("trimRight", function (e) {
    return function () {
      return e(this, 2);
    };
  }, "trimEnd");
}, function (e, t, n) {
  n(293), e.exports = n(62).f("asyncIterator");
}, function (e, t, n) {
  n(90)("asyncIterator");
}, function (e, t, n) {
  n(295), e.exports = n(7).Object.getOwnPropertyDescriptors;
}, function (e, t, n) {
  var r = n(0),
      i = n(117),
      o = n(15),
      s = n(20),
      a = n(78);r(r.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(e) {
      for (var t, n, r = o(e), u = s.f, c = i(r), l = {}, h = 0; c.length > h;) {
        void 0 !== (n = u(r, t = c[h++])) && a(l, t, n);
      }return l;
    } });
}, function (e, t, n) {
  n(297), e.exports = n(7).Object.values;
}, function (e, t, n) {
  var r = n(0),
      i = n(119)(!1);r(r.S, "Object", { values: function values(e) {
      return i(e);
    } });
}, function (e, t, n) {
  n(299), e.exports = n(7).Object.entries;
}, function (e, t, n) {
  var r = n(0),
      i = n(119)(!0);r(r.S, "Object", { entries: function entries(e) {
      return i(e);
    } });
}, function (e, t, n) {
  "use strict";
  n(111), n(301), e.exports = n(7).Promise.finally;
}, function (e, t, n) {
  "use strict";
  var r = n(0),
      i = n(7),
      o = n(1),
      s = n(47),
      a = n(113);r(r.P + r.R, "Promise", { finally: function _finally(e) {
      var t = s(this, i.Promise || o.Promise),
          n = "function" == typeof e;return this.then(n ? function (n) {
        return a(t, e()).then(function () {
          return n;
        });
      } : e, n ? function (n) {
        return a(t, e()).then(function () {
          throw n;
        });
      } : e);
    } });
}, function (e, t, n) {
  n(303), n(304), n(305), e.exports = n(7);
}, function (e, t, n) {
  var r = n(1),
      i = n(0),
      o = n(57),
      s = [].slice,
      a = /MSIE .\./.test(o),
      u = function u(e) {
    return function (t, n) {
      var r = 2 < arguments.length,
          i = !!r && s.call(arguments, 2);return e(r ? function () {
        ("function" == typeof t ? t : Function(t)).apply(this, i);
      } : t, n);
    };
  };i(i.G + i.B + i.F * a, { setTimeout: u(r.setTimeout), setInterval: u(r.setInterval) });
}, function (e, t, n) {
  var r = n(0),
      i = n(84);r(r.G + r.B, { setImmediate: i.set, clearImmediate: i.clear });
}, function (e, t, n) {
  for (var r = n(81), i = n(31), o = n(11), s = n(1), a = n(14), u = n(40), c = n(5), l = c("iterator"), h = c("toStringTag"), d = u.Array, f = { CSSRuleList: !0, CSSStyleDeclaration: !1, CSSValueList: !1, ClientRectList: !1, DOMRectList: !1, DOMStringList: !1, DOMTokenList: !0, DataTransferItemList: !1, FileList: !1, HTMLAllCollection: !1, HTMLCollection: !1, HTMLFormElement: !1, HTMLSelectElement: !1, MediaList: !0, MimeTypeArray: !1, NamedNodeMap: !1, NodeList: !0, PaintRequestList: !1, Plugin: !1, PluginArray: !1, SVGLengthList: !1, SVGNumberList: !1, SVGPathSegList: !1, SVGPointList: !1, SVGStringList: !1, SVGTransformList: !1, SourceBufferList: !1, StyleSheetList: !0, TextTrackCueList: !1, TextTrackList: !1, TouchList: !1 }, p = i(f), g = 0; g < p.length; g++) {
    var m,
        v = p[g],
        y = f[v],
        b = s[v],
        w = b && b.prototype;if (w && (w[l] || a(w, l, d), w[h] || a(w, h, v), u[v] = d, y)) for (m in r) {
      w[m] || o(w, m, r[m], !0);
    }
  }
}, function (e) {
  var t = function (e) {
    "use strict";
    function t(e, t, n) {
      return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t];
    }function n(e, t, n, r) {
      var o = t && t.prototype instanceof i ? t : i,
          s = Object.create(o.prototype),
          a = new f(r || []);return s._invoke = c(e, n, a), s;
    }function r(e, t, n) {
      try {
        return { type: "normal", arg: e.call(t, n) };
      } catch (e) {
        return { type: "throw", arg: e };
      }
    }function i() {}function o() {}function s() {}function a(e) {
      ["next", "throw", "return"].forEach(function (n) {
        t(e, n, function (e) {
          return this._invoke(n, e);
        });
      });
    }function u(e, t) {
      function n(i, o, s, a) {
        var u = r(e[i], e, o);if ("throw" !== u.type) {
          var c = u.arg,
              l = c.value;return l && "object" == (typeof l === "undefined" ? "undefined" : _typeof(l)) && v.call(l, "__await") ? t.resolve(l.__await).then(function (e) {
            n("next", e, s, a);
          }, function (e) {
            n("throw", e, s, a);
          }) : t.resolve(l).then(function (e) {
            c.value = e, s(c);
          }, function (e) {
            return n("throw", e, s, a);
          });
        }a(u.arg);
      }var i;this._invoke = function (e, r) {
        function o() {
          return new t(function (t, i) {
            n(e, r, t, i);
          });
        }return i = i ? i.then(o, o) : o();
      };
    }function c(e, t, n) {
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
          } else "return" === n.method && n.abrupt("return", n.arg);i = M;var c = r(e, t, n);if ("normal" === c.type) {
            if (i = n.done ? k : E, c.arg === C) continue;return { value: c.arg, done: n.done };
          }"throw" === c.type && (i = k, n.method = "throw", n.arg = c.arg);
        }
      };
    }function l(e, t) {
      var n = e.iterator[t.method];if (void 0 === n) {
        if (t.delegate = null, "throw" === t.method) {
          if (e.iterator.return && (t.method = "return", t.arg = void 0, l(e, t), "throw" === t.method)) return C;t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
        }return C;
      }var i = r(n, e.iterator, t.arg);if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, C;var o = i.arg;return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, C) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, C);
    }function h(e) {
      var t = { tryLoc: e[0] };1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
    }function d(e) {
      var t = e.completion || {};t.type = "normal", delete t.arg, e.completion = t;
    }function f(e) {
      this.tryEntries = [{ tryLoc: "root" }], e.forEach(h, this), this.reset(!0);
    }function p(e) {
      if (e) {
        var t = e[b];if (t) return t.call(e);if ("function" == typeof e.next) return e;if (!isNaN(e.length)) {
          var n = -1,
              r = function t() {
            for (; ++n < e.length;) {
              if (v.call(e, n)) return t.value = e[n], t.done = !1, t;
            }return t.value = void 0, t.done = !0, t;
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
      t({}, "");
    } catch (e) {
      t = function t(e, _t2, n) {
        return e[_t2] = n;
      };
    }e.wrap = n;var x = "suspendedStart",
        E = "suspendedYield",
        M = "executing",
        k = "completed",
        C = {},
        O = {};O[b] = function () {
      return this;
    };var A = Object.getPrototypeOf,
        T = A && A(A(p([])));T && T !== m && v.call(T, b) && (O = T);var _ = s.prototype = i.prototype = Object.create(O);return o.prototype = _.constructor = s, s.constructor = o, o.displayName = t(s, S, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
      var t = "function" == typeof e && e.constructor;return !!t && (t === o || "GeneratorFunction" === (t.displayName || t.name));
    }, e.mark = function (e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, s) : (_defaults(e, s), t(e, S, "GeneratorFunction")), e.prototype = Object.create(_), e;
    }, e.awrap = function (e) {
      return { __await: e };
    }, a(u.prototype), u.prototype[w] = function () {
      return this;
    }, e.AsyncIterator = u, e.async = function (t, r, i, o, s) {
      void 0 === s && (s = Promise);var a = new u(n(t, r, i, o), s);return e.isGeneratorFunction(r) ? a : a.next().then(function (e) {
        return e.done ? e.value : a.next();
      });
    }, a(_), t(_, S, "Generator"), _[b] = function () {
      return this;
    }, _.toString = function () {
      return "[object Generator]";
    }, e.keys = function (e) {
      var t = [];for (var n in e) {
        t.push(n);
      }return t.reverse(), function n() {
        for (; t.length;) {
          var r = t.pop();if (r in e) return n.value = r, n.done = !1, n;
        }return n.done = !0, n;
      };
    }, e.values = p, f.prototype = { constructor: f, reset: function reset(e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(d), !e) for (var t in this) {
          "t" === t.charAt(0) && v.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
        }
      }, stop: function stop() {
        this.done = !0;var e = this.tryEntries[0].completion;if ("throw" === e.type) throw e.arg;return this.rval;
      }, dispatchException: function dispatchException(e) {
        function t(t, r) {
          return o.type = "throw", o.arg = e, n.next = t, r && (n.method = "next", n.arg = void 0), !!r;
        }if (this.done) throw e;for (var n = this, r = this.tryEntries.length - 1; 0 <= r; --r) {
          var i = this.tryEntries[r],
              o = i.completion;if ("root" === i.tryLoc) return t("end");if (i.tryLoc <= this.prev) {
            var s = v.call(i, "catchLoc"),
                a = v.call(i, "finallyLoc");if (s && a) {
              if (this.prev < i.catchLoc) return t(i.catchLoc, !0);if (this.prev < i.finallyLoc) return t(i.finallyLoc);
            } else if (s) {
              if (this.prev < i.catchLoc) return t(i.catchLoc, !0);
            } else {
              if (!a) throw new Error("try statement without catch or finally");if (this.prev < i.finallyLoc) return t(i.finallyLoc);
            }
          }
        }
      }, abrupt: function abrupt(e, t) {
        for (var n, r = this.tryEntries.length - 1; 0 <= r; --r) {
          if ((n = this.tryEntries[r]).tryLoc <= this.prev && v.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var i = n;break;
          }
        }i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = e, o.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, C) : this.complete(o);
      }, complete: function complete(e, t) {
        if ("throw" === e.type) throw e.arg;return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), C;
      }, finish: function finish(e) {
        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((t = this.tryEntries[n]).finallyLoc === e) return this.complete(t.completion, t.afterLoc), d(t), C;
        }
      }, catch: function _catch(e) {
        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) {
          if ((t = this.tryEntries[n]).tryLoc === e) {
            var r = t.completion;if ("throw" === r.type) {
              var i = r.arg;d(t);
            }return i;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function delegateYield(e, t, n) {
        return this.delegate = { iterator: p(e), resultName: t, nextLoc: n }, "next" === this.method && (this.arg = void 0), C;
      } }, e;
  }(e.exports);try {
    regeneratorRuntime = t;
  } catch (e) {
    Function("r", "regeneratorRuntime = r")(t);
  }
}, function (e, t, n) {
  n(308), e.exports = n(120).global;
}, function (e, t, n) {
  var r = n(309);r(r.G, { global: n(86) });
}, function (e, t, n) {
  var r = n(86),
      i = n(120),
      o = n(310),
      s = n(312),
      a = n(319),
      u = "prototype",
      c = function c(e, t, n) {
    var l,
        h,
        d,
        f = e & c.F,
        p = e & c.G,
        g = e & c.S,
        m = e & c.P,
        v = e & c.B,
        y = e & c.W,
        b = p ? i : i[t] || (i[t] = {}),
        w = b[u],
        S = p ? r : g ? r[t] : (r[t] || {})[u];for (l in p && (n = t), n) {
      (h = !f && S && void 0 !== S[l]) && a(b, l) || (d = h ? S[l] : n[l], b[l] = p && "function" != typeof S[l] ? n[l] : v && h ? o(d, r) : y && S[l] == d ? function (e) {
        var t = function t(_t3, n, r) {
          if (this instanceof e) {
            switch (arguments.length) {case 0:
                return new e();case 1:
                return new e(_t3);case 2:
                return new e(_t3, n);}return new e(_t3, n, r);
          }return e.apply(this, arguments);
        };return t[u] = e[u], t;
      }(d) : m && "function" == typeof d ? o(Function.call, d) : d, m && ((b.virtual || (b.virtual = {}))[l] = d, e & c.R && w && !w[l] && s(w, l, d)));
    }
  };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
}, function (e, t, n) {
  var r = n(311);e.exports = function (e, t, n) {
    return r(e), void 0 === t ? e : 1 === n ? function (n) {
      return e.call(t, n);
    } : 2 === n ? function (n, r) {
      return e.call(t, n, r);
    } : 3 === n ? function (n, r, i) {
      return e.call(t, n, r, i);
    } : function () {
      return e.apply(t, arguments);
    };
  };
}, function (e) {
  e.exports = function (e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;
  };
}, function (e, t, n) {
  var r = n(313),
      i = n(318);e.exports = n(88) ? function (e, t, n) {
    return r.f(e, t, i(1, n));
  } : function (e, t, n) {
    return e[t] = n, e;
  };
}, function (e, t, n) {
  var r = n(314),
      i = n(315),
      o = n(317),
      s = Object.defineProperty;t.f = n(88) ? Object.defineProperty : function (e, t, n) {
    if (r(e), t = o(t, !0), r(n), i) try {
      return s(e, t, n);
    } catch (t) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;
  };
}, function (e, t, n) {
  var r = n(87);e.exports = function (e) {
    if (!r(e)) throw TypeError(e + " is not an object!");return e;
  };
}, function (e, t, n) {
  e.exports = !n(88) && !n(121)(function () {
    return 7 != Object.defineProperty(n(316)("div"), "a", { get: function get() {
        return 7;
      } }).a;
  });
}, function (e, t, n) {
  var r = n(87),
      i = n(86).document,
      o = r(i) && r(i.createElement);e.exports = function (e) {
    return o ? i.createElement(e) : {};
  };
}, function (e, t, n) {
  var r = n(87);e.exports = function (e, t) {
    if (!r(e)) return e;var n, i;if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;throw TypeError("Can't convert object to primitive value");
  };
}, function (e) {
  e.exports = function (e, t) {
    return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
  };
}, function (e) {
  var t = {}.hasOwnProperty;e.exports = function (e, n) {
    return t.call(e, n);
  };
}, function (e, t, n) {
  "use strict";
  e.exports = { prefixProperties: n(122), cssUnitless: n(123), object: n(124), string: n(328) };
}, function (e, t, n) {
  e.exports = n(322)();
}, function (e, t, n) {
  "use strict";
  var r = n(127),
      i = n(128),
      o = n(325),
      s = n(126),
      a = n(125),
      u = n(122),
      c = "undefined" == typeof document ? {} : document.documentElement.style;e.exports = function (e) {
    return function (t, n) {
      n = n || {};var l = o(r(t)),
          h = i(t),
          d = e ? l : h,
          f = a.style ? e ? a.style : a.css : "";if (l in c) return n.asString ? d : [d];var p = d,
          g = u[h],
          m = [];if (e && (p = s(d)), "function" == typeof g) {
        var v = g(d, f) || [];v && !Array.isArray(v) && (v = [v]), v.length && (v = v.map(function (t) {
          return e ? o(r(t)) : i(t);
        })), m = m.concat(v);
      }return f && m.push(f + p), m.push(d), n.asString || 1 == m.length ? m[0] : m;
    };
  };
}, function (e) {
  e.exports = /[-\s]+(.)?/g;
}, function (e) {
  "use strict";
  var t = /::/g,
      n = /([A-Z]+)([A-Z][a-z])/g,
      r = /([a-z\d])([A-Z])/g,
      i = /_/g;e.exports = function (e, o) {
    return e ? e.replace(t, "/").replace(n, "$1_$2").replace(r, "$1_$2").replace(i, o || "-") : "";
  };
}, function (e) {
  "use strict";
  e.exports = function (e) {
    return e.length ? e.charAt(0).toLowerCase() + e.substring(1) : e;
  };
}, function (e) {
  "use strict";
  var t = Object.prototype.toString;e.exports = function (e) {
    return !!e && "[object Object]" === t.call(e);
  };
}, function (e) {
  "use strict";
  var t = Object.prototype.toString;e.exports = function (e) {
    return "[object Function]" === t.apply(e);
  };
}, function (e, t, n) {
  "use strict";
  var r = n(124),
      i = n(129);e.exports = function (e, t) {
    e = r(e, t);var n,
        o = [];for (n in e) {
      i(e, n) && o.push(n + ": " + e[n]);
    }return o.join("; ");
  };
}, function (e, t, n) {
  var r;!function () {
    "use strict";
    function i(e) {
      return null != e;
    }function o(e) {
      return "number" == typeof e && e > V && e < z;
    }function s(e) {
      return "number" == typeof e && 0 == e % 1;
    }function a(e, t) {
      return o(e) && e > t;
    }function u(e, t) {
      return o(e) && e < t;
    }function c(e, t) {
      return o(e) && e >= t;
    }function l(e, t) {
      return o(e) && e <= t;
    }function h(e) {
      return "string" == typeof e;
    }function d(e) {
      return h(e) && "" !== e;
    }function _f(e) {
      return "[object Object]" === Object.prototype.toString.call(e);
    }function p(e, t) {
      try {
        return e instanceof t;
      } catch (e) {
        return !1;
      }
    }function g(e) {
      return H(e);
    }function m(e) {
      return i(e) && c(e.length, 0);
    }function v(e) {
      return "function" == typeof e;
    }function y(e, t) {
      var n;for (n = 0; n < e.length; n += 1) {
        if (e[n] === t) return t;
      }return !t;
    }function b(e, t) {
      var n, r;for (n in e) {
        if (e.hasOwnProperty(n)) {
          if (_f(r = e[n]) && b(r, t) === t) return t;if (r === t) return t;
        }
      }return !t;
    }function w(e, t) {
      return Object.keys(t).forEach(function (n) {
        e[n] = t[n];
      }), e;
    }function S(e, t) {
      return function () {
        return x(e, arguments, t);
      };
    }function x(e, t, n) {
      var r = e.l || e.length,
          i = t[r],
          o = t[r + 1];return E(e.apply(null, t), d(i) ? i : n, v(o) ? o : TypeError), t[0];
    }function E(e, t, n) {
      if (e) return e;throw new (n || Error)(t || "Assertion failed");
    }function M(e) {
      var t = function t() {
        return k(e.apply(null, arguments));
      };return t.l = e.length, t;
    }function k(e) {
      return !e;
    }function C(e, t, n) {
      var r = function r() {
        var r, o;if (r = arguments[0], "maybe" === e && B.assigned(r)) return !0;if (!t(r)) return !1;r = O(t, r), o = U.call(arguments, 1);try {
          r.forEach(function (t) {
            if (("maybe" !== e || i(t)) && !n.apply(null, [t].concat(o))) throw 0;
          });
        } catch (e) {
          return !1;
        }return !0;
      };return r.l = n.length, r;
    }function O(e, t) {
      return e === m ? U.call(t) : e === _f ? Object.keys(t).map(function (e) {
        return t[e];
      }) : t;
    }function A(e, t) {
      return T([e, R, t]);
    }function T(e) {
      var t, n, r, i;return t = e.shift(), n = e.pop(), r = e.pop(), i = n || {}, Object.keys(r).forEach(function (n) {
        Object.defineProperty(i, n, { configurable: !1, enumerable: !0, writable: !1, value: t.apply(null, e.concat(r[n], N[n])) });
      }), i;
    }function _(e, t) {
      return T([e, t, null]);
    }function P(e, t) {
      j.forEach(function (n) {
        e[n].of = _(t, R[n].of);
      });
    }var I, N, R, F, L, B, D, j, U, V, z, H, G;I = { v: "value", n: "number", s: "string", b: "boolean", o: "object", t: "type", a: "array", al: "array-like", i: "iterable", d: "date", f: "function", l: "length" }, N = {}, R = {}, [{ n: "equal", f: function f(e, t) {
        return e === t;
      }, s: "v" }, { n: "undefined", f: function f(e) {
        return void 0 === e;
      }, s: "v" }, { n: "null", f: function f(e) {
        return null === e;
      }, s: "v" }, { n: "assigned", f: i, s: "v" }, { n: "primitive", f: function f(e) {
        var t;return !(null != e && !1 !== e && !0 !== e) || "string" === (t = typeof e === "undefined" ? "undefined" : _typeof(e)) || "number" === t || G && "symbol" === t;
      }, s: "v" }, { n: "includes", f: function f(e, t) {
        var n, r, o, s, a;if (!i(e)) return !1;if (G && e[Symbol.iterator] && v(e.values)) {
          n = e.values();do {
            if ((r = n.next()).value === t) return !0;
          } while (!r.done);return !1;
        }for (s = (o = Object.keys(e)).length, a = 0; a < s; ++a) {
          if (e[o[a]] === t) return !0;
        }return !1;
      }, s: "v" }, { n: "zero", f: function f(e) {
        return 0 === e;
      } }, { n: "infinity", f: function f(e) {
        return e === V || e === z;
      } }, { n: "number", f: o }, { n: "integer", f: s }, { n: "even", f: function f(e) {
        return "number" == typeof e && 0 == e % 2;
      } }, { n: "odd", f: function f(e) {
        return s(e) && 0 != e % 2;
      } }, { n: "greater", f: a }, { n: "less", f: u }, { n: "between", f: function f(e, t, n) {
        return t < n ? a(e, t) && e < n : u(e, t) && e > n;
      } }, { n: "greaterOrEqual", f: c }, { n: "lessOrEqual", f: l }, { n: "inRange", f: function f(e, t, n) {
        return t < n ? c(e, t) && e <= n : l(e, t) && e >= n;
      } }, { n: "positive", f: function f(e) {
        return a(e, 0);
      } }, { n: "negative", f: function f(e) {
        return u(e, 0);
      } }, { n: "string", f: h, s: "s" }, { n: "emptyString", f: function f(e) {
        return "" === e;
      }, s: "s" }, { n: "nonEmptyString", f: d, s: "s" }, { n: "contains", f: function f(e, t) {
        return h(e) && -1 !== e.indexOf(t);
      }, s: "s" }, { n: "match", f: function f(e, t) {
        return h(e) && !!e.match(t);
      }, s: "s" }, { n: "boolean", f: function f(e) {
        return !1 === e || !0 === e;
      }, s: "b" }, { n: "object", f: _f, s: "o" }, { n: "emptyObject", f: function f(e) {
        return _f(e) && 0 === Object.keys(e).length;
      }, s: "o" }, { n: "nonEmptyObject", f: function f(e) {
        return _f(e) && 0 < Object.keys(e).length;
      }, s: "o" }, { n: "instanceStrict", f: p, s: "t" }, { n: "instance", f: function f(e, t) {
        try {
          return p(e, t) || e.constructor.name === t.name || Object.prototype.toString.call(e) === "[object " + t.name + "]";
        } catch (e) {
          return !1;
        }
      }, s: "t" }, { n: "like", f: function e(t, n) {
        for (var r in n) {
          if (n.hasOwnProperty(r)) {
            if (!1 === t.hasOwnProperty(r) || _typeof(t[r]) != _typeof(n[r])) return !1;if (_f(t[r]) && !1 === e(t[r], n[r])) return !1;
          }
        }return !0;
      }, s: "t" }, { n: "array", f: g, s: "a" }, { n: "emptyArray", f: function f(e) {
        return g(e) && 0 === e.length;
      }, s: "a" }, { n: "nonEmptyArray", f: function f(e) {
        return g(e) && a(e.length, 0);
      }, s: "a" }, { n: "arrayLike", f: m, s: "al" }, { n: "iterable", f: function f(e) {
        return G ? i(e) && v(e[Symbol.iterator]) : m(e);
      }, s: "i" }, { n: "date", f: function f(e) {
        return p(e, Date) && s(e.getTime());
      }, s: "d" }, { n: "function", f: v, s: "f" }, { n: "hasLength", f: function f(e, t) {
        return i(e) && e.length === t;
      }, s: "l" }].map(function (e) {
      var t = e.n;N[t] = "Invalid " + I[e.s || "n"], R[t] = e.f;
    }), F = { apply: function apply(e, t) {
        return L.array(e), v(t) ? e.map(function (e) {
          return t(e);
        }) : (L.array(t), L.hasLength(e, t.length), e.map(function (e, n) {
          return t[n](e);
        }));
      }, map: function map(e, t) {
        return L.object(e), v(t) ? function (e, t) {
          var n = {};return Object.keys(e).forEach(function (r) {
            n[r] = t(e[r]);
          }), n;
        }(e, t) : (L.object(t), function e(t, n) {
          var r = {};return Object.keys(n).forEach(function (i) {
            var o = n[i];v(o) ? B.assigned(t) ? r[i] = !!o.m : r[i] = o(t[i]) : _f(o) && (r[i] = e(t[i], o));
          }), r;
        }(e, t));
      }, all: function all(e) {
        return g(e) ? y(e, !1) : (L.object(e), b(e, !1));
      }, any: function any(e) {
        return g(e) ? y(e, !0) : (L.object(e), b(e, !0));
      } }, j = ["array", "arrayLike", "iterable", "object"], U = Array.prototype.slice, V = Number.NEGATIVE_INFINITY, z = Number.POSITIVE_INFINITY, H = Array.isArray, G = "function" == typeof Symbol, F = w(F, R), L = A(S, E), B = A(M, k), D = A(function (e) {
      var t = function t() {
        return !!B.assigned(arguments[0]) || e.apply(null, arguments);
      };return t.l = e.length, t.m = !0, t;
    }, function (e) {
      return !(!1 !== i(e)) || e;
    }), L.not = _(S, B), L.maybe = _(S, D), j.forEach(function (e) {
      R[e].of = T([C.bind(null, null), R[e], R, null]);
    }), P(L, S), P(B, M), j.forEach(function (e) {
      D[e].of = T([C.bind(null, "maybe"), R[e], R, null]), L.maybe[e].of = _(S, D[e].of), L.not[e].of = _(S, B[e].of);
    }), function (i) {
      void 0 === (r = function () {
        return i;
      }.call(t, n, t, e)) || (e.exports = r);
    }(w(F, { assert: L, not: B, maybe: D }));
  }();
}, function (e) {
  e.exports = { defaultContainerStyles: { backgroundColor: "rgba(0,0,0,0.8)", minWidth: 100, minHeight: 45, position: "fixed", top: 10, right: 10, padding: 15, fontSize: 16, color: "white", borderRadius: 3, boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.2)", fontFamily: "sans-serif" }, defaultPanelStyles: { borderTop: "1px solid #4a4444", marginTop: 5, paddingTop: 5 }, defaultPanelTitleStyles: { color: "#b1b0b0" }, defaultPanelContentStyles: { fontSize: 12 } };
}, function (e) {
  var t = function () {
    return this;
  }();try {
    t = t || new Function("return this")();
  } catch (e) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (t = window);
  }e.exports = t;
}, function (e) {
  (function (t) {
    e.exports = t;
  }).call(this, {});
}, function (e) {
  var t, n;window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (t = "moz", n = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (t = "webkit", n = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));var r = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
      i = window.mozRTCIceCandidate || window.RTCIceCandidate,
      o = window.mozRTCSessionDescription || window.RTCSessionDescription,
      s = window.webkitMediaStream || window.MediaStream,
      a = "https:" === window.location.protocol && ("webkit" === t && 26 <= n || "moz" === t && 33 <= n),
      u = window.AudioContext || window.webkitAudioContext,
      c = document.createElement("video"),
      l = c && c.canPlayType && "probably" === c.canPlayType('video/webm; codecs="vp8", vorbis'),
      h = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;e.exports = { prefix: t, browserVersion: n, support: !!r && l && !!h, supportRTCPeerConnection: !!r, supportVp8: l, supportGetUserMedia: !!h, supportDataChannel: !!(r && r.prototype && r.prototype.createDataChannel), supportWebAudio: !(!u || !u.prototype.createMediaStreamSource), supportMediaStream: !(!s || !s.prototype.removeTrack), supportScreenSharing: !!a, dataChannel: !!(r && r.prototype && r.prototype.createDataChannel), webAudio: !(!u || !u.prototype.createMediaStreamSource), mediaStream: !(!s || !s.prototype.removeTrack), screenSharing: !!a, AudioContext: u, PeerConnection: r, SessionDescription: o, IceCandidate: i, MediaStream: s, getUserMedia: h };
}, function (e, t, n) {
  "use strict";
  function r(e, t, n) {
    if (e in ie) for (var _n, _r = 0; _r < ie[e].length; _r++) {
      _n = ie[e][_r], _n.element.setAttribute(_n.att, t);
    } else {
      c("Building property cache for " + e);var _i = [];(function t(r) {
        if (r.children.length) for (var _o2 = 0; _o2 < r.children.length; _o2++) {
          t(r.children[_o2]);var _s = r.children[_o2].attributes;for (var _t4, _a = 0; _a < _s.length; _a++) {
            _t4 = _s[_a], -1 !== _t4.value.indexOf(e) && (r.children[_o2].removeAttribute(_t4.name), _i.push({ element: r.children[_o2], att: n }));
          }
        }
      })(document), ie[e] = _i, r(e, t);
    }
  }function i(e, t) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    function i(e) {
      return (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }if (e in re && !r) for (var _r2 = 0; _r2 < re[e].length; _r2++) {
      if (n && "RAW" === re[e][_r2].parentElement.tagName) {
        var _n2 = re[e][_r2].parentElement;for (; _n2.hasChildNodes();) {
          _n2.removeChild(_n2.childNodes[0]);
        }var _i2 = o(t);for (var _t5 = 0; _t5 < _i2.length; _t5++) {
          _n2.appendChild(_i2[_t5]), re[e][_r2] = _n2.childNodes[0];
        }
      } else re[e][_r2].nodeValue = t;
    } else c("Building element cache for " + e), function () {
      var e = [];return function t(n) {
        if (n.childNodes.length) for (var r = 0; r < n.childNodes.length; r++) {
          t(n.childNodes[r]);
        } else n.nodeType === Node.TEXT_NODE && e.push(n);
      }(document), e;
    }().forEach(function (r) {
      if (-1 !== r.nodeValue.indexOf(e)) {
        var _s2 = re[e];if (null == _s2 && (_s2 = []), n && "RAW" === r.parentElement.tagName) {
          var _n3 = r.parentElement;for (; _n3.hasChildNodes();) {
            _n3.removeChild(_n3.childNodes[0]);
          }var _s3 = o(r.nodeValue.replace(new RegExp(i(e), "g"), t));for (var _e2 = 0; _e2 < _s3.length; _e2++) {
            _n3.appendChild(_s3[_e2]), r = _n3.childNodes[0];
          }
        } else r.nodeValue = r.nodeValue.replace(new RegExp(i(e), "g"), t);_s2.push(r), re[e] = _s2;
      }
    });
  }function o(e) {
    var t = document.createElement("template");return t.innerHTML = e, t.content.childNodes;
  }function s(e) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(e);
    });
  }function a() {
    window.debugUi = new ne.a(document.body, { zIndex: 999999999, backgroundColor: "black" }), s(function () {
      document.getElementById("j3-info-popup").style.zIndex = 99999999, document.getElementById("j3-info-popup").style.backgroundColor = "black";
    }), window.debugUi.addPanel(oe.BUILD, function () {
      return mt.build + " by " + mt.compiler + " " + mt.envDescription;
    });for (var _e3 = 0; _e3 < ue.length; _e3++) {
      ue[_e3]();
    }if (!se) {
      se = !0;for (var _e4 = 0; _e4 < ae.length; _e4++) {
        ae[_e4]();
      }
    }c("Enabling debug mode");
  }function u(e) {
    return se ? (!mt.isProd && e(), void ue.push(e)) : void ae.push(e);
  }function c(e) {
    console.log("[OpenAudioMc] " + e), ce.push(e), 7 < ce.length && ce.shift();
  }function l(e) {
    var t = document.querySelectorAll("[data-type=card]");var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = t[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _e5 = _step.value;
        _e5.style.display = "none";
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

    document.getElementById(e).style.display = "";
  }function h(e) {
    if ("string" != typeof e && (e += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function d(e) {
    return "string" != typeof e && (e += ""), e;
  }function f(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return ve.iterable && (t[Symbol.iterator] = function () {
      return t;
    }), t;
  }function p(e) {
    this.map = {}, e instanceof p ? e.forEach(function (e, t) {
      this.append(t, e);
    }, this) : Array.isArray(e) ? e.forEach(function (e) {
      this.append(e[0], e[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t]);
    }, this);
  }function g(e) {
    return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (e.bodyUsed = !0);
  }function m(e) {
    return new Promise(function (t, n) {
      e.onload = function () {
        t(e.result);
      }, e.onerror = function () {
        n(e.error);
      };
    });
  }function v(e) {
    var t = new FileReader(),
        n = m(t);return t.readAsArrayBuffer(e), n;
  }function y(e) {
    if (e.slice) return e.slice(0);var t = new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)), t.buffer;
  }function b() {
    return this.bodyUsed = !1, this._initBody = function (e) {
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : ve.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : ve.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : ve.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : ve.arrayBuffer && ve.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = y(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : ve.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || be(e)) ? this._bodyArrayBuffer = y(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : ve.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, ve.blob && (this.blob = function () {
      var e = g(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? g(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(v);
    }), this.text = function () {
      var e = g(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            n = m(t);return t.readAsText(e), n;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), n = Array(t.length), r = 0; r < t.length; r++) {
          n[r] = $(t[r]);
        }return n.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, ve.formData && (this.formData = function () {
      return this.text().then(S);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function w(e, t) {
    var n = (t = t || {}).body;if (e instanceof w) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new p(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0);
    } else this.url = e + "";if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new p(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return -1 < we.indexOf(t) ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n);
  }function S(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var n = e.split("="),
            r = n.shift().replace(/\+/g, " "),
            i = n.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(r), decodeURIComponent(i));
      }
    }), t;
  }function x(e) {
    var t = new p();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var n = e.split(":"),
          r = n.shift().trim();if (r) {
        var i = n.join(":").trim();t.append(r, i);
      }
    }), t;
  }function E(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new p(t.headers), this.url = t.url || "", this._initBody(e);
  }function M(e, t) {
    return new Promise(function (n, r) {
      function i() {
        s.abort();
      }var o = new w(e, t);if (o.signal && o.signal.aborted) return r(new xe("Aborted", "AbortError"));var s = new XMLHttpRequest();s.onload = function () {
        var e = { status: s.status, statusText: s.statusText, headers: x(s.getAllResponseHeaders() || "") };e.url = "responseURL" in s ? s.responseURL : e.headers.get("X-Request-URL");var t = "response" in s ? s.response : s.responseText;n(new E(t, e));
      }, s.onerror = function () {
        r(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        r(new TypeError("Network request failed"));
      }, s.onabort = function () {
        r(new xe("Aborted", "AbortError"));
      }, s.open(o.method, o.url, !0), "include" === o.credentials ? s.withCredentials = !0 : "omit" === o.credentials && (s.withCredentials = !1), "responseType" in s && ve.blob && (s.responseType = "blob"), o.headers.forEach(function (e, t) {
        s.setRequestHeader(t, e);
      }), o.signal && (o.signal.addEventListener("abort", i), s.onreadystatechange = function () {
        4 === s.readyState && o.signal.removeEventListener("abort", i);
      }), s.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function k(e) {
    c(e);
  }function C(e, t, n) {
    M(Ee.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: t, message: "build 588: " + e }) }).then(function (e) {
      null != n && n(), e.json().then(function (e) {
        console.log("Reported error. Reponse was: " + JSON.stringify(e));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function O(e, t) {
    var n = t.media.loop,
        r = t.media.startInstant,
        i = t.media.mediaId,
        o = t.media.source,
        s = t.media.doPickup,
        a = t.media.fadeTime,
        u = t.distance,
        c = t.media.flag,
        l = t.maxDistance;var h = 100;null != t.media.volume && 0 != t.media.volume && (h = t.media.volume), e.getMediaManager().destroySounds(i, !1, !0);var d = new me(i);d.trackable = !0;var f = new Te(o);if (f.openAudioMc = e, f.setOa(e), e.getMediaManager().mixer.addChannel(d), d.addSound(f), d.setChannelVolume(0), f.setLooping(n), d.setTag(i), 0 !== l) {
      var _e6 = this.convertDistanceToVolume(l, u);d.setTag("SPECIAL"), d.maxDistance = l, d.fadeChannel(_e6, a);
    } else d.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (d.setChannelVolume(h), d.updateFromMasterVolume()) : (d.updateFromMasterVolume(), d.fadeChannel(h, a));
    }, 1);d.setTag(c), e.getMediaManager().mixer.updateCurrent(), f.finalize().then(function () {
      s && f.startDate(r, !0), f.finish();
    });
  }function A(e, t) {
    var n = t.message;e.notificationModule.sendNotification(t.title, n), new pe("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(t.title + "<hr />" + n);
  }function T(e, t) {
    var n = parseInt(t.protocolRevision);if (c("Received PROTOCOL revision update"), 2 <= n && (c("PROTO rev => 2, enabling callbacks"), e.socketModule.callbacksEnabled = !0), 3 <= n && (c("PROTO rev => 3, enabling youtube callbacks"), e.socketModule.supportsYoutube = !0), 4 <= n && (c("PROTO rev => 4, enabling volume callbacks"), e.mediaManager.startVolumeWatcher(e)), 3 > n) {
      new pe("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function _(e, t) {
    var n = t.volume;e.getMediaManager().setMasterVolume(n), document.getElementById("volume-slider").value = n;
  }function P(e, t) {
    e.getMediaManager().destroySounds(t.soundId, t.all, !1, t.fadeTime);
  }function I(e, t) {
    var n = t.lights,
        r = t.hueColor,
        i = "rgba(" + r.r + "," + r.g + "," + r.b + "," + function (e, t, n) {
      return (e - t[0]) * (n[1] - n[0]) / (t[1] - t[0]) + n[0];
    }(r.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(n, i);
  }function N(e, t) {
    function n(e, t) {
      return Z((e - t) / e * 100);
    }var r = t.mediaOptions.target,
        i = t.mediaOptions.fadeTime,
        o = t.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = e.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _t6 = _step2.value;
        _t6.hasTag(r) && _t6.fadeChannel(n(_t6.maxDistance, o), i);
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
  }function R(e, t) {
    var n = t.x,
        r = t.y,
        i = t.z,
        o = t.pitch,
        s = t.yaw;e.world.player.updateLocation(new Ne(n, r, i), o, s);
  }function F(e, t) {
    var n = t.clientSpeaker,
        r = new Ne(n.location.x, n.location.y, n.location.z).add(.5, .5, .5),
        i = new Re(n.id, n.source, r, n.type, n.maxDistance, n.startInstant, e);e.world.addSpeaker(n.id, i);
  }function L(e, t) {
    var n = t.clientSpeaker;e.world.removeSpeaker(n.id);
  }function B(e, t) {
    if (t.clear) c("Clearing pre-fetched resources"), setTimeout(function () {
      Oe = {};
    }, 2500);else {
      var _e7 = t.source;c("Pre-fetching resource.."), setTimeout(function () {
        !function (e) {
          e = Ae.translate(e);var t = new Audio();t.autoplay = !1, t.src = e, t.load(), Oe[e] = t;
        }(_e7);
      }, 2500);
    }
  }function D(e, t) {
    return null == RTCPeerConnection ? void Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "WebRTC is disabled!", text: "Your browser doesn't  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it." }) : void e.voiceModule.enable(t.streamServer, t.streamKey, t.radius);
  }function j(e, t) {
    e.voiceModule.addPeer(t.targetUuid, t.targetPlayerName, t.targetStreamKey, t.location);
  }function U(e, t) {
    null == t.streamKey ? e.voiceModule.removeAllPeers() : e.voiceModule.removePeer(t.streamKey);
  }function V(e, t) {
    for (var _n4, _r3 = 0; _r3 < t.updateSet.length; _r3++) {
      _n4 = t.updateSet[_r3], e.voiceModule.peerLocationUpdate(_n4.streamKey, _n4.x, _n4.y, _n4.z);
    }
  }function z() {
    (0, document.getElementById("vc-mic-mute").onmousedown)();
  }function H(e, t) {
    t.blurred ? e.voiceModule.blurWithReason() : e.voiceModule.unblur();
  }function G(e, t) {
    function n(e, t) {
      var n = 0,
          i = t || e.innerHTML,
          o = i.length;Be.push(window.setInterval(function () {
        n >= o && (n = 0), i = r(i, n), e.innerHTML = i, n++;
      }, 0));
    }function r(e, t) {
      var n = $(function (e, t) {
        return ee(Math.random() * (t - e + 1)) + e;
      }(64, 90));return e.substr(0, t) + n + e.substr(t + 1, e.length);
    }var i = void 0,
        o = void 0,
        s = t.childNodes.length;if (-1 < e.indexOf("<br>")) {
      t.innerHTML = e;for (var _e8 = 0; _e8 < s; _e8++) {
        o = t.childNodes[_e8], 3 === o.nodeType && (i = document.createElement("span"), i.innerHTML = o.nodeValue, t.replaceChild(i, o), n(i));
      }
    } else n(t, e);
  }function W(e, t) {
    var n = t.length,
        r = document.createElement("span"),
        i = !1;for (var _o3 = 0; _o3 < n; _o3++) {
      r.style.cssText += De[t[_o3]] + ";", "§k" === t[_o3] && (G(e, r), i = !0);
    }return i || (r.innerHTML = e), r;
  }function K(e, t, n, i) {
    M("https://cloud.openaudiomc.net/api/v3/account-services/client/login/" + i.publicServerKey).then(function (i) {
      i.json().then(function (i) {
        function o(e) {
          r("{{ oam.side_image }}", e), r("{{ oam.bg_image_map }}", "--bg-map:url('" + e + "');");
        }function s(t) {
          document.documentElement.style.setProperty("--border-color-dark", t);var n = function (e, t) {
            var n = e.replace("#", "");return "rgba(" + parseInt(n.substring(0, 2), 16) + "," + parseInt(n.substring(2, 4), 16) + "," + parseInt(n.substring(4, 6), 16) + "," + t / 100 + ")";
          }(t, 40);document.documentElement.style.setProperty("--border-color-normal", t), document.documentElement.style.setProperty("--border-color-light", n);for (var _n5 = 0; _n5 < je.length; _n5++) {
            e.getUserInterfaceModule().changeColor(je[_n5], t);
          }je = [t];
        }if (null == i.errors || 0 != i.errors.length) return n(i.errors), void console.log(i.errors);var a = i.response;if (a.settings.banned) return void C("Declined connection due to ban " + window.location.host, "Steve", function () {
          window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
        });var u = a.secureEndpoint;c("accepting and applying settings");var l = a.settings.ambianceSound;null != a.settings.backgroundImage && "" != a.settings.backgroundImage && (a.settings.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + a.settings.backgroundImage);var h = a.settings.backgroundImage;window.debugHooks.setBgImage = o, "" !== h && o(h);var d = a.settings.title,
            f = a.settings.activeMessage;var p = a.settings.welcomeMessage;if (p = p.replace("%name", e.tokenSet.name), i.response.settings.useTranslations || (e.messageModule.setKey("landing.clickBelow", p), e.messageModule.setKey("landing.connectButton", a.settings.startButton), e.messageModule.setKey("main.content", f)), s(a.settings.color), window.debugHooks.setBgColor = s, "" != a.settings.startSound && (e.getMediaManager().startSound = a.settings.startSound), "default" !== d) {
          document.title = d;try {
            parent.document.title = d;
          } catch (e) {}
        }c("Logging into " + a.name + " with " + a.playerCount + " online player(s)"), t({ fromCache: i.fromCache, host: u, background: h, ambianceSound: l, playerCount: i.response.playerCount, claimed: i.response.claimed, rtc: i.response.rtc, serverName: i.response.name, isPatreon: i.response.isPatreon, countryCode: i.response.countryCode, useTranslations: i.response.settings.useTranslations });
      }).catch(function (e) {
        console.log("Dead end 1"), n(e);
      });
    }).catch(function (e) {
      console.log("Dead end 2"), n(e);
    });
  }function q() {
    He.canStart && He.start();
  }function J(e) {
    r("{{ oam.loading_tagline_style }}", "", "style"), i("{{ oam.loading_tagline_text }}", e);
  }function Y() {
    i("{{ oam.rtc_peer_count }}", "(" + tt + ")");
  }function X(e) {
    var t = document.querySelectorAll("[data-type=voice-card]");var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = t[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _e9 = _step3.value;
        _e9.style.display = "none";
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

    document.getElementById(e).style.display = "";
  }var $ = String.fromCharCode,
      Q = Math.abs,
      Z = Math.round,
      ee = Math.floor;n.r(t);n(134);var te = n(131),
      ne = n.n(te);var re = {},
      ie = {},
      oe = { BUILD: "Build", UI: "Ui Templating", SESSION: "Session", ACCOUNT: "Account", AUDIO: "Mixer", SOCKET: "Socket", LOG: "Latest Log", RTC: "Streaming" };var se = !1,
      ae = [],
      ue = [],
      ce = [];
  var le = function () {
    function le() {
      _classCallCheck(this, le);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    le.prototype.sync = function sync(e) {
      var t = new Date(e),
          n = new Date();this.isServerAhead = t.getTime() > n.getTime(), this.msOffset = this.isServerAhead ? t.getTime() - n.getTime() : n.getTime() - t.getTime(), this.hasSynced = !0;
    };

    le.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return le;
  }();

  Date.prototype.addHours = function (e) {
    return this.setTime(this.getTime() + 60 * e * 60 * 1e3), this;
  };
  var he = function () {
    function he(e) {
      _classCallCheck(this, he);

      this.openAudioMc = e;
    }

    he.prototype.changeColor = function changeColor(e, t) {
      var n = function (e) {
        return e = e.replace("#", ""), "rgb(" + parseInt(e.substring(0, 2), 16) + ", " + parseInt(e.substring(2, 4), 16) + ", " + parseInt(e.substring(4, 6), 16) + ")";
      }(e);document.querySelectorAll("*").forEach(function (e) {
        var r = window.getComputedStyle(e);Object.keys(r).reduce(function (i, o) {
          var s = r[o],
              a = r.getPropertyValue(s);if (0 <= a.indexOf(n)) {
            var _r4 = a.replace(n, t);0 <= s.indexOf("border-top") ? e.style.borderTop = "2px solid " + _r4 : e.style[s] = _r4;
          }
        });
      });
    };

    he.prototype.openApp = function openApp() {
      l(de.MAIN_UI);
    };

    he.prototype.kickScreen = function kickScreen(e) {
      l(de.KICKED), document.getElementById("kick-message").innerHTML = e;
    };

    return he;
  }();

  var de = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" },
      fe = "rtc_initialized";
  var pe = function () {
    function pe(e, t) {
      _classCallCheck(this, pe);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    pe.prototype.show = function show(e) {
      var _this = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("p-3"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _e10 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_e10);
        }, this.option.closeTime);
      }return this;
    };

    pe.prototype.onClick = function onClick(e) {
      this.alertBox.onclick = e;
    };

    pe.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var e = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(e), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return pe;
  }();

  var ge = function () {
    function ge(e, t) {
      var _this3 = this;

      _classCallCheck(this, ge);

      return this.hue = t, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = e, this.isSsl ? void this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue") : (this.hue.discover().then(function (e) {
        e.forEach(function (e) {
          _this3.bridges.push(e), _this3.onDiscover();
        });
      }).catch(function (e) {
        return console.log("Error finding bridges", e);
      }), void (document.getElementById("hue-start-linking-button").onclick = function () {
        _this3.startSetup();
      }));
    }

    ge.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", document.getElementById("hue-setup-box").style.display = "", document.getElementById("hue-bridge-menu-button").onclick = this.openModal, this.isSsl) return void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    ge.prototype.openModal = function openModal() {
      document.getElementById("hue-modal-parent").style.display = "";
    };

    ge.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    ge.prototype.onConnect = function onConnect() {
      var _this4 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this4.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this4.currentUser.getLights().then(function (e) {
          var t = [];for (var _n6 in e) {
            e.hasOwnProperty(_n6) && t.push({ name: e[_n6].name, id: parseInt(_n6) });
          }_this4.openAudioMc.getHueConfiguration().setLightNamesAndIds(t);null != Cookies.get("hue-state") && (_this4.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this4.openAudioMc.getHueConfiguration().applyState(), _this4.openAudioMc.getHueConfiguration().updateState();
        }), _this4.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    ge.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    ge.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 0 != 2 * t.alpha * 127.5, hue: ee(65535 * t.hue / 360), sat: ee(255 * t.saturation), bri: Z(2 * t.alpha * 127.5) };
    };

    ge.prototype.setLight = function setLight(e, t) {
      var _this5 = this;

      var n = [];if ("number" == typeof e) {
        var _t7 = this.openAudioMc.getHueConfiguration().getBulbStateById(e - 1);if (-1 === _t7) return !1;n.push(_t7);
      } else if (e.startsWith("[")) JSON.parse(e).forEach(function (e) {
        var t = _this5.openAudioMc.getHueConfiguration().getHueIdFromId(e - 1);return -1 !== t && void n.push(t);
      });else {
        var _t8 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(e) - 1);if (-1 === _t8) return !1;n.push(_t8);
      }n.forEach(function (e) {
        _this5.currentUser.setLightState(e, _this5.colorToHueHsv(t)).then(function () {});
      });
    };

    ge.prototype.linkBridge = function linkBridge(e, t) {
      var _this6 = this;

      if (i("{{ hue.linkingUpdate }}", window.getMessageString("hue.preparing")), null == t && null != this.options.userid) return i("{{ hue.linkingUpdate }}", window.getMessageString("hue.loggingIn")), this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this6.linkBridge(e, "error") : (_this6.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this6.isLinked = !0, _this6.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var n = this;var r = 0,
          o = -1;o = setInterval(function () {
        function e() {
          clearInterval(o);
        }if (r++, 60 < r) return e(), _this6.startSetup(), void _this6.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - r;i("{{ hue.linkingUpdate }}", window.getMessageString("hue.linking"), [["%sec", t]]), n.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null == t[0].error ? null != t[0].success && (n.currentUser = n.currentBridge.user(t[0].success.username), _this6.openAudioMc.log("Linked with hue bridge after " + r + " attempt(s)."), n.isLinked = !0, n.onConnect(), e()) : 101 === t[0].error.type || (e(), _this6.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type));
        });
      }, 1e3);
    };

    return ge;
  }();

  var me = function () {
    function me(e) {
      _classCallCheck(this, me);

      this.channelName = e, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    me.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    me.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    me.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _e11 = _step4.value;
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

    me.prototype.addSound = function addSound(e) {
      this.sounds.push(e);var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _e12 = _step5.value;
          _e12.registerMixer(this.mixer, this);
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

    me.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    me.prototype.registerMixer = function registerMixer(e) {
      this.mixer = e;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _e13 = _step6.value;
          _e13.registerMixer(this.mixer, this);
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

    me.prototype.fadeChannel = function fadeChannel(e, t, n) {
      var _this7 = this;

      this.interruptFade(), null == n && (n = function n() {}), this.targetAfterFade = e, this.isFading = !0, function (e, t, r, i) {
        t = t || 1e3, r = r || 0, i = i;var o = _this7.channelVolume,
            s = t / Q(o - r),
            a = setInterval(function () {
          o = o > r ? o - 1 : o + 1;var e = _this7.mixer.masterVolume,
              t = o / 100 * e;var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this7.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _e15 = _step7.value;
              _e15.setVolume(t);
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
            n(), clearInterval(a);var _e14 = _this7.fadeTimer.indexOf(a);-1 < _e14 && _this7.fadeTimer.splice(_e14, 1), _this7.isFading = !1, a = null;
          }
        }, s);_this7.fadeTimer.push(a);
      }(0, t, e, n);
    };

    me.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.fadeTimer[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _e16 = _step8.value;
            clearInterval(_e16);
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

    me.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.sounds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _e17 = _step9.value;
          _e17.setVolume(t);
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

    me.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _e18 = _step10.value;
          _e18.setVolume(t);
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

    me.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.sounds[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _e19 = _step11.value;
          _e19.destroy();
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

    return me;
  }();

  var ve = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (ve.arrayBuffer) var ye = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      be = ArrayBuffer.isView || function (e) {
    return e && -1 < ye.indexOf(Object.prototype.toString.call(e));
  };p.prototype.append = function (e, t) {
    e = h(e), t = d(t);var n = this.map[e];this.map[e] = n ? n + ", " + t : t;
  }, p.prototype.delete = function (e) {
    delete this.map[h(e)];
  }, p.prototype.get = function (e) {
    return e = h(e), this.has(e) ? this.map[e] : null;
  }, p.prototype.has = function (e) {
    return this.map.hasOwnProperty(h(e));
  }, p.prototype.set = function (e, t) {
    this.map[h(e)] = d(t);
  }, p.prototype.forEach = function (e, t) {
    for (var n in this.map) {
      this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
    }
  }, p.prototype.keys = function () {
    var e = [];return this.forEach(function (t, n) {
      e.push(n);
    }), f(e);
  }, p.prototype.values = function () {
    var e = [];return this.forEach(function (t) {
      e.push(t);
    }), f(e);
  }, p.prototype.entries = function () {
    var e = [];return this.forEach(function (t, n) {
      e.push([n, t]);
    }), f(e);
  }, ve.iterable && (p.prototype[Symbol.iterator] = p.prototype.entries);var we = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];w.prototype.clone = function () {
    return new w(this, { body: this._bodyInit });
  }, b.call(w.prototype), b.call(E.prototype), E.prototype.clone = function () {
    return new E(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new p(this.headers), url: this.url });
  }, E.error = function () {
    var e = new E(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var Se = [301, 302, 303, 307, 308];E.redirect = function (e, t) {
    if (-1 === Se.indexOf(t)) throw new RangeError("Invalid status code");return new E(null, { status: t, headers: { location: e } });
  };var xe = self.DOMException;try {
    new xe();
  } catch (t) {
    (xe = function xe(e, t) {
      this.message = e, this.name = t;var n = Error(e);this.stack = n.stack;
    }).prototype = Object.create(Error.prototype), xe.prototype.constructor = xe;
  }M.polyfill = !0, self.fetch || (self.fetch = M, self.Headers = p, self.Request = w, self.Response = E);var Ee = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var Me = function () {
    function Me(e, t, n, r, i) {
      _classCallCheck(this, Me);

      this.publicServerKey = e, this.uuid = t, this.name = n, this.token = r, this.scope = i, this.attempts = 0;
    }

    Me.prototype.initialize = function initialize() {
      var _this8 = this;

      return new Promise(function (e) {
        var t = window.location.href;if (null != t) {
          if (2 <= t.split("?").length) {
            var _n7 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(e) {
                if (-1 == e.indexOf("&")) return {};var t = e.split("&");var n = {};for (var _e20 = 0; _e20 < t.length; _e20++) {
                  var _r6 = t[_e20].split("="),
                      _i4 = decodeURIComponent(_r6[0]),
                      _o5 = decodeURIComponent(_r6[1]);void 0 === n[_i4] ? n[_i4] = decodeURIComponent(_o5) : "string" == typeof n[_i4] ? n[_i4] = [n[_i4], decodeURIComponent(_o5)] : n[_i4].push(decodeURIComponent(_o5));
                }return n;
              };

              return _class;
            }().getParametersFromUrl(t.split("?")[1]);if (null == _n7.data) return void e(null);var _r5 = atob(_n7.data).split(":");if (4 !== _r5.length) return e(null), null;var _i3 = _r5[0],
                _o4 = _r5[1],
                _s4 = _r5[2],
                _a2 = _r5[3];null != _i3 && 16 >= _i3.length && null != _o4 && 40 >= _o4.length && null != _s4 && 40 >= _s4.length && null != _a2 && 5 >= _a2.length || e(null);var _u = new Me(_s4, _o4, _i3, _a2);window.tokenCache = _u, e(_u);
          } else if (2 <= t.split("#").length) {
            var _n8 = t.split("#")[1];M(Ee.CLIENT_SESSION_SERVER + "?token=" + _n8).then(function (t) {
              t.json().then(function (t) {
                if (0 < t.errors.length) return void (3 > _this8.attempts ? (c("Failed to load session, trying again in a bit."), setTimeout(function () {
                  _this8.requestWasPreviouslyAttempted = !0, _this8.initialize().then(e), _this8.attempts++;
                }, 1e3)) : (console.log("Session error"), e(null)));var n = t.response;null == n.hasOwnProperty("serverIdentity") ? (k("No identity to fetch"), r("{{ oam.logo_image }}", "https://minotar.net/helm/" + n.playerName)) : function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, t) {
                    var n, i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            k("Fetching identity..");_context.next = 3;
                            return M("https://cloud.openaudiomc.net/identity?token=" + e);

                          case 3:
                            n = _context.sent;
                            _context.next = 6;
                            return n.json();

                          case 6:
                            i = _context.sent;
                            return _context.abrupt("return", 0 < i.errors.length ? void console.error("Could not load identity " + e) : (document.querySelector("link[rel*='icon']").href = i.response.icon + "&name=" + t, r("{{ oam.logo_image }}", i.response.icon + "&name=" + t), k("Native minecraft version: " + i.response.version), void k("Minecraft motd: " + i.response.motd)));

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
                });var i = new Me(n.publicKey, n.playerUuid, n.playerName, n.session, n.scope);window.tokenCache = i, e(i);
              }).catch(function (e) {
                console.error(e);
              });
            }).catch(function (e) {
              C("Something went while requesting tokens. Error: " + e.toJSON(), window.tokenCache.name), console.error(e);
            });
          } else e(null);
        } else e(null);
      });
    };

    Me.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return Me;
  }();

  var ke = { PROXY: Ee.CONTENT_PROXY, YOUTUBE: Ee.YOUTUBE_PROXY, SOUNDCLOUD: Ee.SOUNDCLOUD_PROXY, DRIVE: Ee.DRIVE_PROXY };
  var Ce = function () {
    function Ce() {
      _classCallCheck(this, Ce);

      this.startedRandomly = !1, this.lastIndex = 0;
    }

    Ce.prototype.translate = function translate(e) {
      var t = this.handleRandomizedPlaylist(e);try {
        if (t.includes("media.openaudiomc.net")) return e;if (t = t.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !t.includes("http")) return null;if (t.includes("http://docs.google.com/uc?export=open&id=") && (t = t.replace("http://docs.google.com/uc?export=open&id=", ke.DRIVE)), t.includes("https://docs.google.com/uc?export=open&id=") && (t = t.replace("https://docs.google.com/uc?export=open&id=", ke.DRIVE)), t.includes("https://drive.google.com/") && (t = t.split("file/d/")[1], t = ke.DRIVE + t.split("/view")[0]), this.isYoutube = !1, t.includes("youtube.")) {
          var _e21 = t.split("v=")[1];_e21.includes("&") && (_e21 = _e21.split("&")[0]), t = ke.YOUTUBE + _e21, this.isYoutube = !0;
        } else if (t.includes("youtu.be")) {
          var _e22 = t.split(".be/")[1];t = ke.YOUTUBE + _e22, this.isYoutube = !0;
        }t.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (t = t.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), t.includes("soundcloud.com") && (fetch("https://media.openaudiomc.net/2/soundcloud?u=" + t).then(function (e) {
          return e.json();
        }).then(function (e) {
          document.getElementById("sc-cover").style.display = "", document.getElementById("sc-title").style.display = "", i("{{ oam.soundcloud_title }}", e.artist + " - " + e.title), document.getElementById("sc-title").onclick = function () {
            window.open(e.link);
          }, document.getElementById("sc-cover").src = e.photo;
        }), t = ke.SOUNDCLOUD + t), "https:" === location.protocol && t.includes("http") && !t.includes("https://") && (t = ke.PROXY + t);
      } catch (t) {
        return console.log("Middleware error"), console.log(t), e;
      }return t;
    };

    Ce.prototype.handleRandomizedPlaylist = function handleRandomizedPlaylist(e) {
      if (e.startsWith("[") && e.endsWith("]")) {
        var t = JSON.parse(e);if (!this.startedRandomly) {
          var _e23 = ee(Math.random() * t.length);return this.lastIndex = _e23, this.startedRandomly = !0, t[_e23];
        }return this.lastIndex++, this.lastIndex > t.length - 1 && (this.lastIndex = 0), t[this.lastIndex];
      }return e;
    };

    return Ce;
  }();

  var Oe = {},
      Ae = new Ce();"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var e = {};return Object.getOwnPropertyNames(this).forEach(function (t) {
        e[t] = this[t];
      }, this), e;
    }, configurable: !0, writable: !0 });
  var Te = function (_Ce) {
    _inherits(Te, _Ce);

    function Te(e) {
      var _this9;

      _classCallCheck(this, Te);

      (_this9 = _possibleConstructorReturn(this, _Ce.call(this)), _this9), _this9.rawSource = e;try {
        e = _this9.translate(e);
      } catch (t) {
        c("Failed to translate source: " + e);
      }_this9.soundElement = function (e) {
        e = Ae.translate(e);var t = Oe[e];return null == t ? new Audio() : t;
      }(e), _this9.hadError = !1, _this9.source = e, _this9.error = null, _this9.trackable = !1, _this9.soundElement.onerror = function (e) {
        _this9.hadError = !0, _this9.error = e, _this9._handleError();
      }, _this9.soundElement.src = e, _this9.soundElement.setAttribute("preload", "auto"), _this9.soundElement.setAttribute("controls", "none"), _this9.soundElement.setAttribute("display", "none"), _this9.soundElement.preload = "auto", _this9.soundElement.abort = console.log, _this9.openAudioMc = null, _this9.onFinish = [], _this9.loop = !1, _this9.mixer = null, _this9.channel = null, _this9.finsishedInitializing = !1, _this9.gotShutDown = !1;return _this9;
    }

    Te.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    Te.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var t = this.soundElement.error.code,
            _n9 = null;if (this.isYoutube ? _n9 = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === t ? _n9 = "MEDIA_ERR_ABORTED" : 2 === t ? _n9 = "MEDIA_ERR_NETWORK" : 3 === t ? _n9 = "MEDIA_ERR_DECODE" : 4 === t && (_n9 = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != _n9) {
          c("Reporting media failure " + _n9);var e = function e(_e24, t, n) {
            var r = {};return Object.getOwnPropertyNames(_e24).forEach(function (t) {
              r[t] = _e24[t];
            }), JSON.stringify(r, t, n);
          };null != this.source && "null" != this.source && this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + _n9 + "\ndump=" + e(this.error, null, "\t") + e(this.soundElement.error, null, "\t") + "\nhostname=" + window.location.host + "\nuseragent=" + window.navigator.userAgent), this.openAudioMc.socketModule.send("media_failure", { mediaError: _n9, source: this.soundElement.src });
        }
      }
    };

    Te.prototype.addNode = function addNode(e, t) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = ke.PROXY + this.soundElement.src), this.controller = e.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(t);
    };

    Te.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    Te.prototype.finalize = function finalize() {
      var _this10 = this;

      return new Promise(function (e) {
        _this10.soundElement.onended = function () {
          _this10.gotShutDown || !_this10.finsishedInitializing || (_this10.onFinish.forEach(function (e) {
            e();
          }), _this10.loop ? (_this10.soundElement.src = _this10.translate(_this10.rawSource), _this10.setTime(0), _this10.soundElement.play()) : (_this10.mixer.removeChannel(_this10.channel), !_this10.soundElement.paused && _this10.soundElement.pause()));
        };var t = !1;var n = function n() {
          if (!_this10.gotShutDown) {
            if (!t) {
              var _t9 = _this10.soundElement.play();_t9 instanceof Promise ? _t9.then(e).catch(e) : e();
            }t = !0;
          }
        };_this10.soundElement.onplay = function () {
          _this10.gotShutDown && (c("Canceled a sound that started to play, for some reason."), _this10.soundElement.pause());
        }, _this10.soundElement.onprogress = n, _this10.soundElement.oncanplay = n, _this10.soundElement.oncanplaythrough = n;
      });
    };

    Te.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    Te.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    Te.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish.push(e);
    };

    Te.prototype.setVolume = function setVolume(e) {
      100 < e && (e = 100), this.soundElement.volume = e / 100;
    };

    Te.prototype.startDate = function startDate(e) {
      var t = new Date(e),
          n = (this.openAudioMc.timeService.getPredictedTime() - t) / 1e3;c("Started " + n + " ago");var r = this.soundElement.duration;if (n > r) {
        n -= ee(n / r) * r;
      }c("Starting " + n + " in"), this.setTime(n);
    };

    Te.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    Te.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return Te;
  }(Ce);

  var _e = function () {
    function _e(e, t) {
      var _this11 = this;

      _classCallCheck(this, _e);

      this.openAudioMc = t, this.mixerName = e, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null, this.recentSource = "/none", u(function () {
        window.debugUi.addPanel(oe.AUDIO, function () {
          return "playingChannels=" + _this11.channels.size + ", prefetched=" + Object.keys(Oe).length + ", recent=" + _this11.recentSource.split("/")[_this11.recentSource.split("/").length - 1];
        });
      });
    }

    _e.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var e = !1;this.channels.forEach(function (t) {
        t.hasSoundPlaying() && (e = !0);
      }), e != this.areSoundsPlaying && (this._playingStateChangeChanged(e), this.areSoundsPlaying = e);
    };

    _e.prototype._playingStateChangeChanged = function _playingStateChangeChanged(e) {
      null == this.ambianceSoundMedia || (e ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    _e.prototype.setupAmbianceSound = function setupAmbianceSound(e) {
      var t = new me("ambiance-lol-dics"),
          n = new Te(e);n.setLooping(!0), n.setVolume(0), n.finalize().then(function () {
        n.finish();
      }), t.mixer = { masterVolume: this.masterVolume }, t.addSound(n), this.ambianceSoundMedia = t, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    _e.prototype.updateCurrent = function updateCurrent() {
      var e = [];this.channels.forEach(function (t, n) {
        var r = [];t.tags.forEach(function (e, t) {
          r.push(t);
        }), t.trackable && e.push({ name: n, tags: r });
      }), this._updatePlayingSounds();
    };

    _e.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e;var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.channels.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _e25 = _step12.value;
          _e25.updateFromMasterVolume();
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

      null != this.ambianceSoundMedia && (this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.updateFromMasterVolume(e));
    };

    _e.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;t = e instanceof me ? e : this.channels.get(e), null != t && (t.destroy(), this.channels.delete(t.channelName)), this._updatePlayingSounds();
    };

    _e.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    _e.prototype.addChannel = function addChannel(e) {
      var _this12 = this;

      if (!(e instanceof me)) throw new Error("Argument isn't a channel");{
        var t = e.channelName,
            _n10 = this.channels.get(t);null != _n10 && _n10.destroy(), e.registerMixer(this), this.channels.set(t, e), setTimeout(function () {
          for (var _t10 in e.sounds) {
            _this12.recentSource = e.sounds[_t10].rawSource;
          }
        }, 1e3);
      }this._updatePlayingSounds();
    };

    return _e;
  }();

  var Pe = function () {
    function Pe(e) {
      var _this13 = this;

      _classCallCheck(this, Pe);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.startSound = null, this.mixer = new _e(null, e), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this13.setMasterVolume(e), Cookies.set("volume", e, { expires: 30 });
      };
    }

    Pe.prototype.startVolumeMonitor = function startVolumeMonitor(e) {
      var _this14 = this;

      var t = -1;setInterval(function () {
        t != _this14.masterVolume && (t = _this14.masterVolume, e.socketModule.send("volume_changed", { volume: _this14.masterVolume }));
      }, 300);
    };

    Pe.prototype.setupAmbianceSound = function setupAmbianceSound(e) {
      "" == e || null == e || this.mixer.setupAmbianceSound(e);
    };

    Pe.prototype.startVolumeWatcher = function startVolumeWatcher(e) {
      this.startVolumeMonitor(e);
    };

    Pe.prototype.postBoot = function postBoot() {
      var _this15 = this;

      if (null != this.startSound) {
        var _e26 = new me("startsound"),
            t = new Te(this.startSound);t.openAudioMc = this.openAudioMc, t.setOa(this.openAudioMc), t.setOnFinish(function () {
          setTimeout(function () {
            _this15.mixer._updatePlayingSounds();
          }, 1e3);
        }), t.finalize().then(function () {
          _this15.mixer.addChannel(_e26), _e26.addSound(t), _e26.setChannelVolume(100), _e26.updateFromMasterVolume(), t.finish();
        });
      } else setTimeout(function () {
        _this15.mixer._updatePlayingSounds();
      }, 500);
    };

    Pe.prototype.destroySounds = function destroySounds(e, t, n, r) {
      var _this16 = this;

      var i = r;null == i && (i = 500), n && (i = 0);var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        var _loop = function _loop() {
          var n = _step13.value;
          t ? n.fadeChannel(0, i, function () {
            _this16.mixer.removeChannel(n);
          }) : null == e || "" === e ? n.hasTag("SPECIAL") || n.hasTag("REGION") || n.hasTag("SPEAKER") || n.fadeChannel(0, i, function () {
            _this16.mixer.removeChannel(n);
          }) : n.hasTag(e) && (n.sounds.forEach(function (e) {
            e.gotShutDown = !0;
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

    Pe.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e, i("{{ oam.volume }}", 0 === e ? e + "(muted)" : e + "%"), Cookies.set("volume", e, { expires: 30 }), this.mixer.setMasterVolume(e);
    };

    Pe.prototype.changeVolume = function changeVolume(e) {
      document.getElementById("volume-slider").value = e, this.setMasterVolume(e);
    };

    Pe.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return Pe;
  }();

  var Ie = function () {
    function Ie(e, t) {
      var _this17 = this;

      _classCallCheck(this, Ie);

      if (this.handlers = {}, this.openAudioMc = e, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], this.inCount = 0, this.outCount = 0, u(function () {
        window.debugUi.addPanel(oe.SOCKET, function () {
          return "in=" + _this17.inCount + ", out=" + _this17.outCount + ", ok=" + _this17.socket.connected;
        });
      }), null == new Me().fromCache()) return console.log("Empty authentication"), void l(de.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + e.tokenSet.name + "&player=" + e.tokenSet.uuid + "&s=" + e.tokenSet.publicServerKey + "&p=" + e.tokenSet.token;var n = this;this.socket = io(t, { query: n.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        e.userInterfaceModule.openApp(), e.socketModule.state = "ok", _this17.hasConnected = !0, _this17.outgoingQueue.forEach(function (e) {
          _this17.send(e.key, e.value);
        });
      }), this.socket.on("time-update", function (e) {
        var t = e.split(":"),
            n = parseInt(t[1]),
            r = parseInt(t[0]);_this17.openAudioMc.getTimeService().sync(r, n);
      }), this.socket.on("disconnect", function () {
        e.debugPrint("closed"), e.getMediaManager().destroySounds(null, !0), n.state = "closed", l(de.BAD_AUTH), setTimeout(function () {
          e.getMediaManager().sounds = {};
        }, 1010), e.voiceModule.shutDown();
      }), this.socket.on("data", function (e) {
        var t = e.type.split("."),
            r = t[t.length - 1];null != n.handlers[r] && n.handlers[r](e.payload), _this17.inCount++;
      }), this.socket.connect();
    }

    Ie.prototype.send = function send(e, t) {
      if (this.outCount++, this.hasConnected) {
        if (!this.callbacksEnabled) return void c("could not satisfy callback " + e + " because the protocol is outdated");c("Submitting value for " + e), this.socket.emit(e, t);
      } else this.outgoingQueue.push({ key: e, value: t });
    };

    Ie.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return Ie;
  }();

  var Ne = function () {
    function Ne(e, t, n) {
      _classCallCheck(this, Ne);

      this.x = e || 0, this.y = t || 0, this.z = n || 0;
    }

    Ne.prototype.add = function add(e, t, n) {
      return this.x += e, this.y += t, this.z += n, this;
    };

    Ne.prototype.applyQuaternion = function applyQuaternion(e) {
      var t = this.x,
          n = this.y,
          r = this.z,
          i = e.x,
          o = e.y,
          s = e.z,
          a = e.w,
          u = a * t + o * r - s * n,
          c = a * n + s * t - i * r,
          l = a * r + i * n - o * t,
          h = -i * t - o * n - s * r;return this.x = u * a + h * -i + c * -s - l * -o, this.y = c * a + h * -o + l * -i - u * -s, this.z = l * a + h * -s + u * -o - c * -i, this;
    };

    Ne.prototype.square = function square(e) {
      return e * e;
    };

    Ne.prototype.distance = function distance(e) {
      var t = this.square(this.x - e.x) + this.square(this.y - e.y) + this.square(this.z - e.z);return Math.sqrt(t);
    };

    return Ne;
  }();

  var Re = function () {
    function Re(e, t, n, r, i, o, s) {
      _classCallCheck(this, Re);

      this.id = e, this.source = t, this.location = n, this.type = r, this.maxDistance = i, this.startInstant = o, this.openAudioMc = s, this.channel = null;
    }

    Re.prototype.getDistance = function getDistance(e, t) {
      return t.location.distance(this.location);
    };

    return Re;
  }();

  window.enableOpenAudioDebugMode = function () {
    mt.isProd = !1, a();
  };
  var Fe = function Fe(e) {
    _classCallCheck(this, Fe);

    function t(t, n) {
      e.socketModule.registerHandler(t, function (t) {
        return n(e, t);
      });
    }t("ClientVersionPayload", T), t("NotificationPayload", A), t("HueColorPayload", I), t("ClientPlayerLocationPayload", R), t("ClientSpeakerCreatePayload", F), t("ClientSpeakerDestroyPayload", L), t("ClientPreFetchPayload", B), t("ClientUpdateMediaPayload", N), t("ClientCreateMediaPayload", O), t("ClientDestroyMediaPayload", P), t("ClientVolumePayload", _), t("ClientVoiceChatUnlockPayload", D), t("ClientVoiceSubscribePayload", j), t("ClientVoiceDropPayload", U), t("ClientVoiceUpdatePeerLocationsPayload", V), t("ClientVoiceChatToggleMicrophonePayload", z), t("ClientVoiceBlurUiPayload", H);
  };

  var Le = function () {
    function Le() {
      var _this18 = this;

      _classCallCheck(this, Le);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this18.select();
        };
      });
    }

    Le.prototype.setBridgeName = function setBridgeName(e) {
      i("{{ oam.hue_bridge_name }}", e);
    };

    Le.prototype.select = function select() {
      this.updateState();
    };

    Le.prototype.applyState = function applyState() {
      var _this19 = this;

      this.state.forEach(function (e) {
        _this19.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    Le.prototype.updateState = function updateState() {
      var _this20 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this20.state.push(_this20.obtainSelection(e));
      }), Cookies.set("hue-state", this.state, { expires: 30 });
    };

    Le.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          n = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: n };
    };

    Le.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    Le.prototype.getInputById = function getInputById(e) {
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = this.dropdowns[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var t = _step14.value;
          if (t.dataset.bulb == e) return t;
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

    Le.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    Le.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return Le;
  }();

  var Be = [],
      De = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _e27 = Be.length; _e27--;) {
        clearInterval(Be[_e27]);
      }Be = [];
    }(), function (e) {
      var t,
          n,
          r = e.match(/&.{1}/g) || [],
          i = [],
          o = [],
          s = document.createDocumentFragment(),
          a = r.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t11 = 0; _t11 < a; _t11++) {
        i.push(e.indexOf(r[_t11])), e = e.replace(r[_t11], "\0\0");
      }0 !== i[0] && s.appendChild(W(e.substring(0, i[0]), []));for (var _u2 = 0; _u2 < a; _u2++) {
        if (2 === (n = i[_u2 + 1] - i[_u2])) {
          for (; 2 == n;) {
            o.push(r[_u2]), _u2++, n = i[_u2 + 1] - i[_u2];
          }o.push(r[_u2]);
        } else o.push(r[_u2]);-1 < o.lastIndexOf("§r") && (o = o.slice(o.lastIndexOf("§r") + 1)), t = e.substring(i[_u2], i[_u2 + 1]), s.appendChild(W(t, o));
      }return s;
    }(this + "");
  };var je = ["#2c78f6", "#4F46E5"];
  var Ue = function () {
    function Ue(e) {
      _classCallCheck(this, Ue);

      this.host = e;
    }

    Ue.prototype.route = function route(e) {
      var _this21 = this;

      return new Promise(function (t, n) {
        _this21.tokenSet = new Me().fromCache(), "ACCOUNT" === _this21.tokenSet.scope && (c("Using account based profile system..."), K(e, t, n, _this21.tokenSet));
      });
    };

    return Ue;
  }();

  var Ve = function () {
    function Ve(e) {
      _classCallCheck(this, Ve);

      this.main = e, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    Ve.prototype.setupPermissions = function setupPermissions() {
      var _this22 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new pe("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><span id="noti-perm-request-link" class="alert-message-button">Setup</span></div>'), s(function () {
        document.getElementById("noti-perm-request-link").onclick = _this22.requestNotificationPermissions;
      }));
    };

    Ve.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    Ve.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this23 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this23.requestBox.hide(), new pe("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this23.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return Ve;
  }();

  var ze = n(132);var He = null;
  var Ge = function Ge(e, t, n) {
    _classCallCheck(this, Ge);

    this.x = e || 0, this.y = t || 0, this.z = n || 0;
  };

  var We = function () {
    function We(e, t, n, r) {
      _classCallCheck(this, We);

      this.x = e || 0, this.y = t || 0, this.z = n || 0, this.w = void 0 === r ? 1 : r;
    }

    We.prototype.setFromEuler = function setFromEuler(e) {
      var t = Math.sin,
          n = Math.cos;var r = e.x,
          i = e.y,
          o = e.z,
          s = n(r / 2),
          a = n(i / 2),
          u = n(o / 2),
          c = t(r / 2),
          l = t(i / 2),
          h = t(o / 2);return this.x = c * a * u + s * l * h, this.y = s * l * u - c * a * h, this.z = s * a * h + c * l * u, this.w = s * a * u - c * l * h, this;
    };

    return We;
  }();

  var Ke = function () {
    function Ke() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Ne();
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new We();

      _classCallCheck(this, Ke);

      this.position = e, this.rotation = t;
    }

    Ke.prototype.applyTo = function applyTo(e) {
      var t = this.position,
          n = new Ne(0, 0, 1).applyQuaternion(this.rotation),
          r = new Ne(0, 1, 0).applyQuaternion(this.rotation);e.positionX ? (e.positionX.value = t.x, e.positionY.value = t.y, e.positionZ.value = t.z) : e.setPosition(t.x, t.y, t.z), e instanceof PannerNode ? e.orientationX ? (e.orientationX.value = n.x, e.orientationY.value = n.y, e.orientationZ.value = n.z) : e.setOrientation(n.x, n.y, n.z) : e.forwardX ? (e.forwardX.value = n.x, e.forwardY.value = n.y, e.forwardZ.value = n.z, e.upX.value = r.x, e.upY.value = r.y, e.upZ.value = r.z) : e.setOrientation(n.x, n.y, n.z, r.x, r.y, r.z);
    };

    return Ke;
  }();

  var qe = function () {
    function qe(e, t, n, r) {
      _classCallCheck(this, qe);

      this.world = e, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(t, n, r);
    }

    qe.prototype.updateLocation = function updateLocation(e, t, n) {
      this.location = e, this.pitch = this.toRadians(t), this.yaw = this.toRadians(this.normalizeYaw(360 - n));var r = new Ge(this.pitch, this.yaw, 0),
          i = new We();i.setFromEuler(r);new Ke(e, i).applyTo(this.listener), this.world.onLocationUpdate();
    };

    qe.prototype.toRadians = function toRadians(e) {
      return e * (Math.PI / 180);
    };

    qe.prototype.normalizeYaw = function normalizeYaw(e) {
      return 0 > (e %= 360) && (e += 360), e;
    };

    return qe;
  }();

  var Je = function Je(e, t, n) {
    _classCallCheck(this, Je);

    this.source = e, this.distance = t, this.speaker = n;
  };

  var Ye = "SPEAKER_2D";
  var Xe = function Xe(e, t, n, r) {
    _classCallCheck(this, Xe);

    this.pannerNode = n.audioCtx.createPanner(), this.media = r, r.addNode(n, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear", this.pannerNode.maxDistance = e.maxDistance;var i = e.location;new Ke(i).applyTo(this.pannerNode), this.pannerNode.connect(n.audioCtx.destination);
  };

  var $e = function () {
    function $e(e, t, n) {
      var _this24 = this;

      _classCallCheck(this, $e);

      this.id = "SPEAKER__" + t, this.openAudioMc = e, this.speakerNodes = new Map();var r = new me(this.id);r.trackable = !0, this.channel = r;var i = new Te(t);this.media = i, i.openAudioMc = e, i.setOa(e), r.mixer = this.openAudioMc.getMediaManager().mixer, r.addSound(i), r.setChannelVolume(0), i.startDate(n, !0), i.finalize().then(function () {
        e.getMediaManager().mixer.addChannel(r), i.setLooping(!0), r.setTag(_this24.id), r.setTag("SPECIAL"), _this24.openAudioMc.getMediaManager().mixer.updateCurrent(), i.startDate(n, !0), i.finish();
      });
    }

    $e.prototype.removeSpeakerLocation = function removeSpeakerLocation(e) {
      null != this.speakerNodes.get(e) && this.speakerNodes.delete(e);
    };

    $e.prototype.updateLocation = function updateLocation(e, t, n) {
      if (e.type == Ye) {
        var _r7 = e.getDistance(t, n),
            _i5 = this._convertDistanceToVolume(e.maxDistance, _r7);if (0 >= _i5) return;this.channel.fadeChannel(_i5, 100);
      } else this.speakerNodes.has(e.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(e.id, new Xe(e, t, n, this.media)));
    };

    $e.prototype._convertDistanceToVolume = function _convertDistanceToVolume(e, t) {
      return Z((e - t) / e * 100);
    };

    $e.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return $e;
  }();

  var Qe = function () {
    function Qe(e) {
      _classCallCheck(this, Qe);

      this.openAudioMc = e, this.speakers = new Map(), this.audioMap = new Map(), this.player = new qe(this, new Ne(0, 0, 0), 0, 0);
    }

    Qe.prototype.getSpeakerById = function getSpeakerById(e) {
      return this.speakers.get(e);
    };

    Qe.prototype.addSpeaker = function addSpeaker(e, t) {
      this.speakers.set(e, t), this.renderAudio2D();
    };

    Qe.prototype.removeSpeaker = function removeSpeaker(e) {
      this.speakers.delete(e), this.audioMap.forEach(function (e, t) {
        e.removeSpeakerLocation(t);
      }), this.renderAudio2D();
    };

    Qe.prototype.getMediaForSource = function getMediaForSource(e, t) {
      var n = this.audioMap.get(e);if (null != n) return n;if (null == t) return null;var r = new $e(this.openAudioMc, e, t);return this.audioMap.set(e, r), r;
    };

    Qe.prototype.removeMediaFromSource = function removeMediaFromSource(e) {
      var t = this.getMediaForSource(e);null == t || (t.remove(), this.audioMap.delete(e));
    };

    Qe.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    Qe.prototype.isMediaUsed = function isMediaUsed(e) {
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = this.speakers.values()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var t = _step15.value;
          if (t.source == e) return !0;
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

    Qe.prototype.renderAudio2D = function renderAudio2D() {
      var _this25 = this;

      var e = [];this.speakers.forEach(function (t) {
        var n = t.getDistance(_this25, _this25.player);e.push(new Je(t.source, n, t));
      });var t = new Map();var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = e[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _n11 = _step16.value;
          var _e29 = t.get(_n11.source);null != _e29 ? Array.isArray(_e29) ? (_e29.push(_n11), t.set(_n11.source, _e29)) : _e29.distance > _n11.distance && _n11.distance <= _n11.speaker.maxDistance && t.set(_n11.source, _n11) : _n11.speaker.type == Ye ? _n11.distance <= _n11.speaker.maxDistance && t.set(_n11.source, _n11) : _n11.distance <= _n11.speaker.maxDistance && t.set(_n11.source, [_n11]);
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

      t.forEach(function (e) {
        var t = Array.isArray(e) ? e : [e];var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
          for (var _iterator17 = t[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            var _e28 = _step17.value;
            _this25.getMediaForSource(_e28.source, _e28.speaker.startInstant).updateLocation(_e28.speaker, _this25, _this25.player);
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
      }), this.audioMap.forEach(function (e, t) {
        _this25.isMediaUsed(t) || _this25.removeMediaFromSource(t);
      });
    };

    return Qe;
  }();

  var Ze = function () {
    function Ze() {
      _classCallCheck(this, Ze);

      this.successCallback = alert, this.errorCallback = alert;
    }

    Ze.prototype.getUserMedia = function getUserMedia(e) {
      var _this26 = this;

      return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(e, this.successCallback, this.errorCallback) : void navigator.mediaDevices.getUserMedia(e).then(function (e) {
        return _this26.successCallback(e);
      }).catch(function (e) {
        return _this26.errorCallback(e);
      }) : void navigator.webkitGetUserMedia(e, this.successCallback, this.errorCallback) : void navigator.getUserMedia(e, this.successCallback, this.errorCallback);
    };

    return Ze;
  }();

  var et = {};window.handlePeerVolumeEvent = function (e) {
    var t = et[e.id];null != t && t(e);
  };var tt = 0;Y();
  var nt = function () {
    function nt(e, t, n, r, i) {
      var _this27 = this;

      _classCallCheck(this, nt);

      this.openAudioMc = e, this.playerName = t, this.onVolumeChange = i, this.removed = !1;var o = '\n        <div class="flex items-center p-2" id="vc-user-card-' + t + '">\n            <div class="w-12 h-12 rounded-full mr-3 overflow-hidden flex items-center" id="vc-user-card-' + t + '-indicator">\n                <img id="vc-user-card-' + t + '-picture" src="https://visage.surgeplay.com/bust/512/' + n + '" class="w-16">\n            </div>\n            <div class="flex-1">\n                <div class="flex items-center">\n                    <div class="font-semibold text-normal text-teal-500"><svg id="vc-user-card-' + t + '-muted" class="h-8 w-8 text-red-500" style="display: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="1" y1="1" x2="23" y2="23" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /> <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /> <line x1="12" y1="19" x2="12" y2="23" /> <line x1="8" y1="23" x2="16" y2="23" /></svg>' + t + ' <small id="vc-user-card-' + t + '-volume-disp">(' + r + '% volume)</small>\n                    </div>\n                </div>\n                <div><input id="vc-user-card-' + t + '-volume-input" oninput="handlePeerVolumeEvent(this)"\n                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"\n                            type="range" min="0" max="120" step="1" value="' + r + '"/></div>\n            </div>\n        </div>\n        ';document.getElementById("vc-call-members").innerHTML += o, tt++, Y(), et["vc-user-card-" + this.playerName + "-volume-input"] = function (e) {
        this.callingSliderUpdate(e);
      }.bind(this), setTimeout(function () {
        _this27.updatePlaceholder();
      }, 10);
    }

    nt.prototype.callingSliderUpdate = function callingSliderUpdate() {
      if (!this.removed) {
        var e = document.getElementById("vc-user-card-" + this.playerName + "-volume-input").value;this.onVolumeChange(e), this.updateVolumeDisplay(e);
      }
    };

    nt.prototype.updatePlaceholder = function updatePlaceholder() {
      document.getElementById("empty-call-placeholder").style.display = 0 == this.openAudioMc.voiceModule.peerMap.size ? "" : "none";
    };

    nt.prototype.remove = function remove() {
      tt--, Y(), this.removed = !0, document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName)), this.updatePlaceholder(), delete et["vc-user-card-" + this.playerName + "-volume-input"];
    };

    nt.prototype.setVisuallyTalking = function setVisuallyTalking(e) {
      this.removed || (e ? (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = "lime", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "0 0 10pt 2pt lime") : (document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "", document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = ""));
    };

    nt.prototype.setVisuallyMuted = function setVisuallyMuted(e) {
      this.removed || (e ? (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "0.2", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "inline") : (document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "1", document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "none"));
    };

    nt.prototype.updateVolumeDisplay = function updateVolumeDisplay(e) {
      this.removed || (document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + e + "% volume)");
    };

    return nt;
  }();

  var rt = n(60);
  var it = function () {
    function it(e, t, n, r, i, o) {
      _classCallCheck(this, it);

      this.openAudioMc = e, this.server = t, this.streamKey = n, this.peerStreamKey = r, this.volume = i, this.volBooster = 1.2, this.uiInst = o, this.harkEvents = null;
    }

    it.prototype.start = function start(e) {
      var _this28 = this;

      var t = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);t.onFinish(function (t) {
        var n = _this28.openAudioMc.world.player.audioCtx;_this28.setVolume(_this28.volume), _this28.gainNode = n.createGain(), _this28.audio = new Audio(), _this28.audio.autoplay = !0, _this28.audio.srcObject = t, _this28.gainNode.gain.value = _this28.volume / 100 * _this28.volBooster, window.debugAudio = _this28.audio, _this28.audio.muted = !0;var r = n.createMediaStreamSource(_this28.audio.srcObject);if (_this28.harkEvents = Object(rt.a)(t, {}), _this28.harkEvents.setThreshold(-75), _this28.harkEvents.on("speaking", function () {
          _this28.uiInst.setVisuallyTalking(!0);
        }), _this28.harkEvents.on("stopped_speaking", function () {
          _this28.uiInst.setVisuallyTalking(!1);
        }), _this28.audio.muted = !0, _this28.openAudioMc.voiceModule.surroundSwitch.isOn()) {
          var _e30 = _this28.gainNode;_this28.pannerNode = n.createPanner(), _this28.pannerNode.maxDistance = _this28.openAudioMc.voiceModule.blocksRadius, _this28.pannerNode.panningModel = "HRTF", _this28.pannerNode.rolloffFactor = .9, _this28.pannerNode.distanceModel = "linear", _this28.pannerNode.coneOuterGain = .7, _this28.pannerNode.coneInnerAngle = 120, _this28.setLocation(_this28.x, _this28.y, _this28.z, !0), r.connect(_e30), _e30.connect(_this28.pannerNode), _this28.pannerNode.connect(n.destination);
        } else {
          var _e31 = _this28.gainNode;r.connect(_e31), _e31.connect(n.destination);
        }_this28.audio.play().then(function () {}).catch(function (e) {
          console.log("Denied from promise", e);
        }), e();
      }), t.onReject(function (e) {
        c("Stream for " + _this28.peerStreamKey + " got denied: " + e);
      });
    };

    it.prototype.setLocation = function setLocation(e, t, n, r) {
      if (this.openAudioMc.voiceModule.useSurround) {
        if (r && null != this.pannerNode) {
          new Ke(new Ne(this.x, this.y, this.z)).applyTo(this.pannerNode);
        } else r && c("Warning, attempted to update a peer location while the panner node is nil");this.x = e, this.y = t, this.z = n;
      }
    };

    it.prototype.setVolume = function setVolume(e) {
      this.volume = e, null != this.gainNode && (this.gainNode.gain.value = this.volume / 100 * this.volBooster);
    };

    it.prototype.stop = function stop() {
      null != this.audio && (this.audio.pause(), this.audio.src = null, this.audio.srcObject = null, this.gainNode.gain.value = 0), null != this.harkEvents && this.harkEvents.stop();
    };

    return it;
  }();

  var ot = function () {
    function ot(e, t, n, r, i, o) {
      var _this29 = this;

      _classCallCheck(this, ot);

      this.openAudioMc = e, this.playerName = t, this.playerUuid = t, this.streamKey = r, this.active = !0, this.ready = !1, this.location = o, this.volume = 80;var s = Cookies.get("vc-volume-of-" + t);null != s && (this.volume = parseInt(s)), this.ui = new nt(this.openAudioMc, t, n, this.volume, function (e) {
        _this29.volume = e, Cookies.set("vc-volume-of-" + t, e, { expires: 30 }), _this29.ready && _this29.stream.setVolume(_this29.volume);
      }), this.stream = new it(e, i, e.voiceModule.streamKey, r, this.volume, this.ui), this.stream.setLocation(o.x, o.y, o.z, !1), this.stream.start(function () {
        return _this29.active ? (_this29.stream.setVolume(_this29.volume), void (_this29.ready = !0)) : void _this29.stop();
      });
    }

    ot.prototype.updateLocation = function updateLocation(e, t, n) {
      this.stream.setLocation(e, t, n, !0);
    };

    ot.prototype.stop = function stop() {
      null != this.openAudioMc.voiceModule.peerManager && this.openAudioMc.voiceModule.peerManager.dropStream(this.streamKey), this.active = !1, this.ui.remove(), null != this.stream && this.stream.stop();
    };

    return ot;
  }();

  var st = function () {
    function st(e, t, n) {
      var _this30 = this;

      _classCallCheck(this, st);

      this.id = e, this.onToggle = n, this.state = null == Cookies.get(e) ? t : JSON.parse(Cookies.get(e)), this.setVisuallyActive(this.state), s(function () {
        document.getElementById(_this30.id).checked = !_this30.state, document.getElementById(_this30.id).onclick = function () {
          _this30.state = !_this30.state, Cookies.set(_this30.id, _this30.state, { expires: 30 }), _this30.onToggle(_this30.state), _this30.setVisuallyActive(_this30.state);
        };
      });
    }

    st.prototype.setVisuallyActive = function setVisuallyActive(e) {
      e ? (document.getElementById(this.id).style.backgroundColor = "", document.getElementById(this.id).style.color = "") : (document.getElementById(this.id).style.backgroundColor = "#EF4444", document.getElementById(this.id).style.color = "#F3F4F6");
    };

    st.prototype.getState = function getState() {
      return this.state;
    };

    st.prototype.isOn = function isOn() {
      return this.state;
    };

    return st;
  }();

  var at = function () {
    function at() {
      _classCallCheck(this, at);

      this.eventName = "", this.params = new Map();
    }

    at.prototype.fromString = function fromString(e) {
      this.original = e;var t = e.split("~");for (var _e32 = 0; _e32 < t.length; _e32++) {
        if (0 === _e32) this.eventName = t[_e32];else {
          var _n12 = t[_e32];if (-1 !== _n12.indexOf("=")) {
            var _e33 = _n12.split("=");this.params.set(_e33[0], _e33[1]);
          }
        }
      }return this;
    };

    at.prototype.setParam = function setParam(e, t) {
      return this.params.set(e, t), this;
    };

    at.prototype.getParam = function getParam(e) {
      return this.params.get(e);
    };

    at.prototype.setEventName = function setEventName(e) {
      return this.eventName = e, mt.isProd || c("Building bus message " + e), this;
    };

    at.prototype.getEventName = function getEventName() {
      return this.eventName;
    };

    at.prototype.serialize = function serialize() {
      var e = this.eventName + "~";var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = this.params[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _step18$value = _slicedToArray(_step18.value, 2),
              t = _step18$value[0],
              _n13 = _step18$value[1];

          e += t + "=" + _n13 + "~";
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

    at.prototype.trimmed = function trimmed() {
      var e = this.eventName.length,
          t = "";for (var _n14, _r8 = 0; _r8 < this.original.length; _r8++) {
        _n14 = this.original.charAt(_r8), _r8 <= e || (t += _n14);
      }return t;
    };

    return at;
  }();

  var ut = function () {
    function ut() {
      _classCallCheck(this, ut);

      this.whenFinished = function () {
        c("A promised channel got finished before it got used");
      }, this.whenRejected = function () {
        c("A promised channel got finished before it got used");
      }, this.error = null, this.payload = null;
    }

    ut.prototype.onFinish = function onFinish(e) {
      return null == this.payload ? void (this.whenFinished = e) : void e(this.payload);
    };

    ut.prototype.onReject = function onReject(e) {
      return null == this.error ? void (this.whenRejected = e) : void e(this.error);
    };

    ut.prototype.handleData = function handleData(e) {
      this.payload = e, this.whenFinished(e);
    };

    ut.prototype.handleError = function handleError(e) {
      this.error = e, this.whenRejected(e);
    };

    return ut;
  }();

  var ct = function () {
    function ct(e, t, n, r, i) {
      var _this31 = this;

      _classCallCheck(this, ct);

      this.openAudioMc = e, this.server = t, this.micProcessor = i, this.streamKey = n, this.waitingPromises = new Map(), this.trackQueue = new Map(), this.updateNegotiation = !0, this.micStream = r, this.isMuted = !1, document.getElementById("vc-mic-mute").onmousedown = function () {
        return _this31.muteCooldown ? void Swal.fire({ icon: "warning", text: "Please wait a moment before doing this again", backdrop: "", timer: 3e3 }) : void _this31.setMute(!_this31.isMuted);
      }, this.muteCooldown = !1;
    }

    ct.prototype.onStart = function onStart() {
      c("Confluence started"), this.openAudioMc.socketModule.send(fe, { enabled: !0 });
    };

    ct.prototype.dropStream = function dropStream(e) {
      "open" === this.dataChannel.readyState ? this.dataChannel.send(new at().setEventName("DROP_STREAM").setParam("owner", e).serialize()) : c("Warning! can't drop a stream because the connection is closed");
    };

    ct.prototype.requestStream = function requestStream(e) {
      if ("open" === this.dataChannel.readyState) {
        var t = new ut();return this.waitingPromises.set(e, t), this.dataChannel.send(new at().setEventName("REQUEST_STREAM").setParam("owner", e).serialize()), t;
      }{
        c("Warning! attempted to request a stream for " + e + " but the eb is closed");var _t12 = new ut();return _t12.handleError("Connection is closed"), _t12;
      }
    };

    ct.prototype.initializeRenegotiation = function initializeRenegotiation() {
      var _this32 = this;

      this.lastNegotiationRequest = performance.now(), this.pcReceiver.createOffer().then(function (e) {
        return _this32.pcReceiver.setLocalDescription(e);
      }).then(function () {
        var e = JSON.stringify({ sdp: btoa(JSON.stringify(_this32.pcReceiver.localDescription)) }),
            t = new at().setEventName("KICKSTART_RENEG").serialize();t += e, _this32.dataChannel.send(t);
      }).catch(function (e) {
        _this32.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
      });
    };

    ct.prototype.handleRenagEnd = function handleRenagEnd() {
      if (null != this.lastNegotiationRequest) {
        var e = performance.now(),
            t = Math.ceil(e - this.lastNegotiationRequest);c("Renegotiation took " + t + " MS - " + (500 < t ? "Warning! Renegotiation took too long!" : ""));
      }
    };

    ct.prototype.registerDataChannel = function registerDataChannel(e, t) {
      var _this33 = this;

      e.addEventListener("open", function () {
        c("Opened RTC event bus");
      }), e.addEventListener("close", function () {
        c("Closed RTC event bus");
      }), e.addEventListener("message", function (e) {
        var n = e.data;var r = new at().fromString(n);switch (mt.isProd || c("Handling bus " + r.getEventName()), r.getEventName()) {case "REQUEST_NEG_INIT":
            c("Server requested renag start"), _this33.initializeRenegotiation();break;case "NEGOTIATION_RESPONSE":
            var _e34 = r.trimmed(),
                _n15 = JSON.parse(_e34);c("response was " + _e34.length), _this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_n15.sdp)))).then(function () {
              _this33.handleRenagEnd(), _this33.dataChannel.send(new at().setEventName("CLIENT_CONFIRMED_NEG").serialize());
            });break;case "PROCESS_OFFER":
            _this33.lastNegotiationRequest = performance.now();var _i6 = JSON.parse(r.trimmed());_this33.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(_i6.sdp)))).then(function () {
              _this33.pcReceiver.createAnswer().then(function (e) {
                var t = new at().setEventName("PROCESS_RESPONSE").serialize();t += btoa(JSON.stringify(e)), _this33.dataChannel.send(t), _this33.pcReceiver.setLocalDescription(e).catch(function (e) {
                  _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
                });
              }).catch(function (e) {
                _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
              });
            }).catch(function (e) {
              _this33.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
            });break;case "CONFIRM_NEGOTIATION":
            _this33.handleRenagEnd();break;case "NEGOTIATION_CANCELLED":
            c("Negotiation was ignored, server doesn't think it to be needed.");break;case "OK":
            null != t && t(), c("Received Confluence channel confirmation");break;case "REJECT_REQUEST":
            var _o6 = r.getParam("owner");c("The server rejected a stream request to " + _o6), _this33.waitingPromises.has(_o6) && (_this33.waitingPromises.get(_o6).handleError("Request got denied by the server"), _this33.waitingPromises.delete(_o6));break;case "CONFIRM_REQUEST":
            _this33.trackQueue.set(r.getParam("streamid"), r.getParam("owner"));break;case "CONTEXT_EVENT":
            _this33.contextEvent(r);break;case "IDENTIFY_SELF":
            _this33.dataChannel.send(new at().setEventName("VERSION").setParam("build", mt.build + "").setParam("author", mt.compiler).setParam("isProd", mt.isProd + "").serialize());break;default:
            c("Warning! received a rtc packet called " + r.getEventName() + " but I don't have a clue what it does.");}
      });
    };

    ct.prototype.contextEvent = function contextEvent(e) {
      var t = e.getParam("type");"client-muted" === t ? this.openAudioMc.voiceModule.peerMap.get(e.getParam("who")).ui.setVisuallyMuted(!0) : "client-unmuted" === t && this.openAudioMc.voiceModule.peerMap.get(e.getParam("who")).ui.setVisuallyMuted(!1);
    };

    ct.prototype.onInternalTrack = function onInternalTrack(e, t, n) {
      var _this34 = this;

      var r = e.id;if (!e.active) return void c("Received an inactive track! cancelling.");if (!this.trackQueue.has(r)) return void c("Received an unknown track called " + r + ". Ignoring it.");var i = this.trackQueue.get(r),
          o = this.waitingPromises.get(i);return null == o ? void (t ? c("Got a stream that doesn't seem to be asked for, skipping it. it was " + r) : (c("Got a stream that doesn't seem to be asked for, trying again in 1s"), setTimeout(function () {
        _this34.onInternalTrack(e, !0, n);
      }, 1e3))) : (o.handleData(e), this.waitingPromises.delete(i), void this.trackQueue.delete(r));
    };

    ct.prototype.setup = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var _this35 = this;

        var t, n, r, i, _e35;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                t = this.server + "webrtc/confluence/sdp/m/" + tokenCache.publicServerKey + "/pu/" + tokenCache.uuid + "/pn/" + tokenCache.name + "/sk/" + this.streamKey;
                this.pcReceiver = new RTCPeerConnection();n = !1, r = function r(e) {
                  if ("connected" === _this35.pcReceiver.connectionState || "connected" === e.target.iceConnectionState) {
                    if (n) return;n = !0, _this35.onStart();
                  }
                };
                this.pcReceiver.oniceconnectionstatechange = r, this.pcReceiver.addEventListener("connectionstatechange", r), this.pcReceiver.onnegotiationneeded = function () {
                  c("Finished negotiation round");
                }, this.dataChannel = this.pcReceiver.createDataChannel("eb"), this.registerDataChannel(this.dataChannel, e), this.listenForTracks();i = this.micStream.getTracks();
                for (_e35 = 0; _e35 < i.length; _e35++) {
                  this.pcReceiver.addTrack(this.micStream.getTracks()[_e35]);
                }this.pcReceiver.createOffer().then(function (e) {
                  return _this35.pcReceiver.setLocalDescription(e);
                }).then(function () {
                  fetch(t, { method: "POST", body: JSON.stringify({ sdp: btoa(JSON.stringify(_this35.pcReceiver.localDescription)) }) }).then(function (e) {
                    200 === e.status ? e.json().then(function (e) {
                      _this35.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(e.Sdp))));
                    }) : (Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: "Connection error", text: "Something went wrong while connecting to the OpenAudioMc voice service. Please try again in a minute or so.", footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' }), e.json().then(function (t) {
                      _this35.openAudioMc.voiceModule.handleCrash("RTC connection error, received status body " + JSON.stringify(t) + " " + e.status);
                    }));
                  }).catch(function (e) {
                    console.error(e), _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
                  });
                }).catch(function (e) {
                  _this35.openAudioMc.voiceModule.handleCrash(JSON.stringify(e.toJSON()));
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

    ct.prototype.playInternalSound = function playInternalSound(e) {
      var _this36 = this;

      c("Playing internal sound " + e);var t = new me(e),
          n = new Te(e);n.openAudioMc = this.openAudioMc, n.setOa(this.openAudioMc), n.setOnFinish(function () {
        _this36.openAudioMc.mediaManager.mixer._updatePlayingSounds(), _this36.openAudioMc.mediaManager.mixer.removeChannel(e);
      }), n.finalize().then(function () {
        _this36.openAudioMc.mediaManager.mixer.addChannel(t), t.addSound(n), t.setChannelVolume(100), t.updateFromMasterVolume(), n.finish();
      });
    };

    ct.prototype.setMute = function setMute(e) {
      var _this37 = this;

      if (this.muteCooldown) Swal.fire("Please wait a moment before doing this again");else {
        e ? this.playInternalSound("assets/mute.mp3") : this.playInternalSound("assets/unmute.mp3"), this.isMuted = e, this.setVisualMuteState(!e), this.muteCooldown = !0, setTimeout(function () {
          _this37.muteCooldown = !1;
        }, 500);for (var t = 0; t < this.micStream.getAudioTracks().length; t++) {
          this.micStream.getAudioTracks()[t].enabled = !e;
        }e ? (this.openAudioMc.voiceModule.microphoneProcessing.onMute(), this.openAudioMc.voiceModule.pushSocketEvent(ft.MIC_MUTE), this.dataChannel.send(new at().setEventName("CONTEXT_EVENT").setParam("type", "muted-stream").serialize())) : (this.openAudioMc.voiceModule.microphoneProcessing.onUnmute(), this.openAudioMc.voiceModule.pushSocketEvent(ft.MIC_UNMTE), this.dataChannel.send(new at().setEventName("CONTEXT_EVENT").setParam("type", "unmuted-stream").serialize()));
      }
    };

    ct.prototype.setVisualMuteState = function setVisualMuteState(e) {
      e ? (document.getElementById("vc-mic-mute").style.backgroundColor = "", document.getElementById("vc-mic-mute").style.color = "") : (document.getElementById("vc-mic-mute").style.backgroundColor = "#EF4444", document.getElementById("vc-mic-mute").style.color = "#F3F4F6");
    };

    ct.prototype.stop = function stop() {
      this.micStream.getTracks().forEach(function (e) {
        e.stop();
      }), this.pcReceiver.close();
    };

    ct.prototype.listenForTracks = function listenForTracks() {
      var _this38 = this;

      this.pcReceiver.addEventListener("track", function (e) {
        for (var t = 0; t < e.streams.length; t++) {
          if ("dead-mans-track" === e.streams[t].id) return;e.track.onended = function () {
            _this38.dataChannel.send(new at().setEventName("SCHEDULE_RENAG").serialize());
          }, _this38.onInternalTrack(e.streams[t], !1, e.track);
        }
      });
    };

    return ct;
  }();

  var lt = n(133),
      ht = n.n(lt);
  var dt = function () {
    function dt(e, t, n) {
      var _this39 = this;

      _classCallCheck(this, dt);

      this.openAudioMc = e, this.stream = n, this.voiceModule = t, this.id = "visual-speaking-indicator", this.startedTalking = null, this.shortTriggers = 0, this.isStreaming = !1, this.isMuted = !1, this.harkEvents = Object(rt.a)(this.stream, {}), this.gainController = new ht.a(n), this.gainController.on(), this.loadDefaults(), this.longSessions = 0, setInterval(function () {
        if (_this39.isSpeaking) {
          10 < (new Date().getTime() - _this39.startedTalking) / 1e3 && (_this39.longSessions++, _this39.startedTalking = new Date().getTime()), 1 < _this39.longSessions && (_this39.decreaseSensitivity(), _this39.longSessions = 0, _this39.startedTalking = new Date().getTime());
        }
      }, 500), this.hookListeners();
    }

    dt.prototype.updateSensitivity = function updateSensitivity(e) {
      var t = -Q(e);this.harkEvents.setThreshold(t), Cookies.set("mic-sensitivity", t + "", { expires: 30 }), this.currentThreshold = this.harkEvents.getThreshold();
    };

    dt.prototype.decreaseSensitivity = function decreaseSensitivity() {
      if (!this.enabledAutoAdjustments) return;var e = Q(this.currentThreshold);e -= 5, this.updateSensitivity(e), document.getElementById("mic-sensitive-slider").value = e;
    };

    dt.prototype.onMute = function onMute() {
      this.isMuted = !0, this.isSpeaking && this.shouldStream(!1);
    };

    dt.prototype.onUnmute = function onUnmute() {
      this.isMuted = !1, this.isSpeaking && this.shouldStream(!0);
    };

    dt.prototype.onSpeakStart = function onSpeakStart() {
      this.isMuted || this.shouldStream(!0);
    };

    dt.prototype.onSpeakEnd = function onSpeakEnd() {
      this.isMuted || this.shouldStream(!1);
    };

    dt.prototype.stop = function stop() {
      this.harkEvents.stop();
    };

    dt.prototype.shouldStream = function shouldStream(e) {
      var _this40 = this;

      e ? (!this.isStreaming && (this.isStreaming = !0, "open" === this.openAudioMc.voiceModule.peerManager.dataChannel.readyState && this.openAudioMc.voiceModule.peerManager.dataChannel.send(new at().setEventName("DISTRIBUTE_RTP").serialize())), document.getElementById(this.id).style.backgroundColor = "#34D399", document.getElementById(this.id).style.color = "#EC4899", clearTimeout(this.haltRtpTask)) : (this.haltRtpTask = setTimeout(function () {
        "open" === _this40.openAudioMc.voiceModule.peerManager.dataChannel.readyState && (_this40.isStreaming = !1, _this40.openAudioMc.voiceModule.peerManager.dataChannel.send(new at().setEventName("HALT_RTP").serialize()));
      }, 500), document.getElementById(this.id).style.backgroundColor = "", document.getElementById(this.id).style.color = "");
    };

    dt.prototype.loadDefaults = function loadDefaults() {
      var _this41 = this;

      this.enabledAutoAdjustments = "enabled" === Cookies.get("mic-sensitivity-bot"), document.getElementById("enable-auto-adjustments").checked = this.enabledAutoAdjustments, document.getElementById("enable-auto-adjustments").onchange = function (e) {
        e.target.checked ? (_this41.enabledAutoAdjustments = !0, Cookies.set("enable-auto-adjustments", "enabled", { expires: 30 })) : (_this41.enabledAutoAdjustments = !1, Cookies.set("enable-auto-adjustments", "disabled", { expires: 30 }));
      };var e = Cookies.get("mic-sensitivity");null != e && (e = parseInt(e), this.harkEvents.setThreshold(e)), document.getElementById("mic-sensitive-slider").value = Q(this.harkEvents.getThreshold()), this.currentThreshold = this.harkEvents.getThreshold(), this.isSpeaking = !1, this.harkEvents.setInterval(5), document.getElementById("mic-sensitive-slider").oninput = function (e) {
        _this41.updateSensitivity(e.target.value);
      };
    };

    dt.prototype.hookListeners = function hookListeners() {
      var _this42 = this;

      this.harkEvents.on("speaking", function () {
        _this42.isSpeaking = !0, _this42.startedTalking = new Date().getTime(), _this42.onSpeakStart();
      }), this.harkEvents.on("stopped_speaking", function () {
        _this42.isSpeaking = !1, _this42.onSpeakEnd(), 1.5 > (new Date().getTime() - _this42.startedTalking) / 1e3 ? (_this42.shortTriggers++, 25 < _this42.shortTriggers && (_this42.decreaseSensitivity(), _this42.shortTriggers = 0)) : _this42.shortTriggers = 0;
      });
    };

    return dt;
  }();

  var ft = { MIC_MUTE: "MICROPHONE_MUTED", MIC_UNMTE: "MICROPHONE_UNMUTE" };
  var pt = function () {
    function pt(e) {
      var _this43 = this;

      _classCallCheck(this, pt);

      this.openAudioMc = e, this.peerManager = null, this.peerMap = new Map(), this.loadedDeviceList = !1, this.loadeMicPreference = Cookies.get("preferred-mic"), this.loudnessDetectionEnabled = !1, this.surroundSwitch = new st("use-surround", !0, function (e) {
        _this43.openAudioMc.socketModule.send(fe, { enabled: !1 }), _this43.useSurround = e, _this43.onSurrroundUpdate();
      }), this.useSurround = this.surroundSwitch.isOn();
    }

    pt.prototype.enable = function enable(e, t, n) {
      var _this44 = this;

      this.blocksRadius = n, this.server = e, this.streamKey = t, document.getElementById("vc-controls").style.display = "", i("{{ vc.onboarding.panel }}", window.getMessageString("vc.onboarding", [["%range", this.blocksRadius + " blocks"]])), document.getElementById("vc-connect-button").onclick = function () {
        _this44.consent(_this44.loadeMicPreference);
      }, X("vc-onboarding");
    };

    pt.prototype.addPeer = function addPeer(e, t, n, r) {
      this.peerMap.set(n, new ot(this.openAudioMc, t, e, n, this.server, r));
    };

    pt.prototype.peerLocationUpdate = function peerLocationUpdate(e, t, n, r) {
      this.peerMap.has(e) && this.peerMap.get(e).updateLocation(t, n, r);
    };

    pt.prototype.removeAllPeers = function removeAllPeers() {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.peerMap[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var _step19$value = _slicedToArray(_step19.value, 2),
              e = _step19$value[0],
              t = _step19$value[1];

          this.removePeer(e);
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

    pt.prototype.removePeer = function removePeer(e) {
      if (this.peerMap.has(e)) {
        var t = this.peerMap.get(e);this.peerMap.delete(e), t.stop();
      } else c("Couldn't remove peer " + e + " because, well, there is no such peer");
    };

    pt.prototype.onSurrroundUpdate = function onSurrroundUpdate() {
      var _this45 = this;

      this.openAudioMc.socketModule.send(fe, { enabled: !1 }), Swal.fire({ title: window.getMessageString("vc.reloadingPopupTitle"), html: window.getMessageString("vc.reloadingPopup"), timer: 3500, showCloseButton: !1, backdrop: "", showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (e) {
        e.dismiss === Swal.DismissReason.timer && _this45.openAudioMc.socketModule.send(fe, { enabled: !0 });
      });
    };

    pt.prototype.handleCrash = function handleCrash(e) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong while starting your voice chat session. Please report this problem and try again later.", backdrop: "" }), C("Something went wrong while enabling voicechat. Error: " + e, window.tokenCache.name);
    };

    pt.prototype.handleAudioPermissions = function handleAudioPermissions(e) {
      var _this46 = this;

      document.getElementById("welcome-back-box").style.display = "none", this.loadedDeviceList || (navigator.mediaDevices.enumerateDevices().then(function (e) {
        var t = [];for (var _n16, _r9 = 0; _r9 < e.length; _r9++) {
          _n16 = e[_r9], "audioinput" === _n16.kind && t.push({ name: _n16.label, id: _n16.deviceId });
        }_this46.loadedDevices(t);
      }).catch(function (e) {
        console.error(e), _this46.handleCrash(JSON.stringify(e.toJSON()));
      }), this.loadedDeviceList = !0), Swal.fire({ backdrop: "", title: window.getMessageString("vc.startingPopupTitle"), html: window.getMessageString("vc.startingPopup"), showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        } }), this.microphoneProcessing = new dt(this.openAudioMc, this, e), this.peerManager = new ct(this.openAudioMc, this.server, this.streamKey, e, this.microphoneProcessing), this.peerManager.setup(this.onOutoingStreamStart.bind(this)).catch(function (e) {
        _this46.handleCrash(JSON.stringify(e.toJSON()));
      }), u(function () {
        c("Enabling rtc debugging"), window.debugUi.addPanel(oe.RTC, function () {
          return "waitingPromises=" + _this46.peerManager.waitingPromises.size + ", trackQueue=" + _this46.peerManager.trackQueue.size + ", state=" + _this46.peerManager.pcReceiver.connectionState + ", ice=" + _this46.peerManager.pcReceiver.iceConnectionState + ", isSpeaking=" + _this46.microphoneProcessing.isSpeaking + ", transceivers=" + _this46.peerManager.pcReceiver.getTransceivers().length + ", muxPolicy=" + _this46.peerManager.pcReceiver.getConfiguration().rtcpMuxPolicy;
        });
      });
    };

    pt.prototype.changeInput = function changeInput(e) {
      var _this47 = this;

      c("Stopping current streamer, and restarting with a diferent user input"), Cookies.set("preferred-mic", e, { expires: 30 }), this.peerManager.setMute(!1), this.peerManager.stop(), this.peerManager = null, this.openAudioMc.socketModule.send(fe, { enabled: !1 }), Swal.fire({ backdrop: "", title: window.getMessageString("vc.updatingMicPopupTitle"), html: window.getMessageString("vc.updatingMicPopup"), timer: 3500, showCloseButton: !1, showCancelButton: !1, timerProgressBar: !1, allowOutsideClick: !1, allowEscapeKey: !1, allowEnterKey: !1, didOpen: function didOpen() {
          Swal.showLoading();
        }, willClose: function willClose() {
          clearInterval(void 0);
        } }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && _this47.consent(e);
      });
    };

    pt.prototype.loadedDevices = function loadedDevices(e) {
      var _this48 = this;

      var t = document.getElementById("vc-mic-select");for (; 0 < t.options.length;) {
        t.remove(0);
      }for (var _n17 = 0; _n17 < e.length; _n17++) {
        var _r10 = e[_n17],
            _i7 = document.createElement("option");null == this.loadeMicPreference && 0 == _n17 && (_i7.selected = !0), _i7.value = _r10.id, _i7.innerText = _r10.name, _i7.dataset.deviceId = _r10.id, t.add(_i7);
      }null != this.loadeMicPreference && (t.value = this.loadeMicPreference), t.onchange = function (e) {
        var t = e.target.value;_this48.changeInput(t);
      };
    };

    pt.prototype.onOutoingStreamStart = function onOutoingStreamStart() {
      this.peerManager.playInternalSound("assets/unmute.mp3"), X("voice-home"), Swal.close();
    };

    pt.prototype.consent = function consent(e) {
      var t = e ? { audio: { deviceId: { exact: e }, noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } } : { audio: { noiseSuppression: !0, echoCancellation: !1, autoGainControl: !1, channelCount: 1 } },
          n = new Ze();n.successCallback = function (e) {
        this.openAudioMc.voiceModule.handleAudioPermissions(e);
      }.bind(this), n.errorCallback = function (t) {
        return null == e ? (console.error(t), "OverconstrainedError" === t.name || t instanceof OverconstrainedError ? (c("Couldn't get microphone, ignoring and trying again"), void this.consent(null)) : void this.openAudioMc.voiceModule.permissionError(t)) : (Cookies.remove("preferred-mic"), void this.consent(null));
      }.bind(this), n.getUserMedia(t);
    };

    pt.prototype.permissionError = function permissionError() {
      X("vc-onboarding"), Swal.fire({ backdrop: "", showClass: { popup: "swal2-noanimation", backdrop: "swal2-noanimation" }, icon: "error", title: window.getMessageString("vc.micErrorPopupTitle"), text: window.getMessageString("vc.micErrorPopup"), footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>' });
    };

    pt.prototype.shutDown = function shutDown() {
      document.getElementById("vc-controls").style.display = "none", null != this.peerManager && this.peerManager.stop(), null != this.microphoneProcessing && this.microphoneProcessing.stop();var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = this.peerMap[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var _step20$value = _slicedToArray(_step20.value, 2),
              e = _step20$value[0],
              t = _step20$value[1];

          t.stop();
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

    pt.prototype.pushSocketEvent = function pushSocketEvent(e) {
      null != this.peerManager && this.openAudioMc.socketModule.send(fe, { event: e });
    };

    pt.prototype.blurWithReason = function blurWithReason() {
      document.getElementById("vc-content").classList.add("filter"), document.getElementById("vc-content").classList.add("blur-md"), document.getElementById("vc-disabled-overlay").style.display = "", i("{{ oam.vc.disabled }}", window.getMessageString("vc.disabled"), [["%server", this.openAudioMc.serverName]]);
    };

    pt.prototype.unblur = function unblur() {
      document.getElementById("vc-content").classList.remove("filter"), document.getElementById("vc-content").classList.remove("blur-md"), document.getElementById("vc-disabled-overlay").style.display = "none";
    };

    return pt;
  }();

  var gt = function () {
    function gt() {
      _classCallCheck(this, gt);

      this.messages = {}, this.seeded = !1, this.seededValues = [], this.currentLangFile = "", this.forcedValues = {}, this.languageMappings = { gb: "en.lang", us: "en.lang", nl: "nl.lang", be: "nl.lang", fr: "fr.lang", ru: "ru.lang", ua: "ru.lang", kz: "ru.lang", md: "ru.lang", hk: "chi.lang", cn: "chi.lang", ro: "ro.lang" }, window.getMessageString = this.getString, window.debugHooks.loadLanguage = this.load;
    }

    gt.prototype.setKey = function setKey(e, t) {
      this.forcedValues[e] = t;
    };

    gt.prototype.handleCountry = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var t;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e = e.toLowerCase();t = this.languageMappings[e];
                _context3.t0 = null != t;

                if (!_context3.t0) {
                  _context3.next = 7;
                  break;
                }

                c("Switching to " + e + " > " + t);
                _context3.next = 7;
                return this.load(t);

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

    gt.prototype.updateBanner = function updateBanner() {
      var _this49 = this;

      if (Cookies.get("preferred-lang") === this.currentLangFile) return void (document.getElementById("lang-change-banner").style.display = "none");var e = [["%langName", getMessageString("lang.name")]];i("{{ ui.lang.detectedAs }}", getMessageString("lang.detectedAs", e)), i("{{ ui.lang.toEn }}", getMessageString("lang.toEn", e)), i("{{ ui.lang.keep }}", getMessageString("lang.keep", e)), document.getElementById("lang-back-to-en").onclick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this49.load("en.lang");

              case 2:
                document.getElementById("lang-change-banner").style.display = "none";

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this49);
      })), document.getElementById("lang-keep").onclick = function () {
        Cookies.set("preferred-lang", _this49.currentLangFile, { expires: 30 }), document.getElementById("lang-change-banner").style.display = "none";
      }, document.getElementById("lang-change-banner").style.display = "";
    };

    gt.prototype.getString = function getString(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var n = window.openAudioMc.messageModule.messages[e];if (null == n) return c("Couldn't find message key " + e), "?? " + e + " ??";var r = window.openAudioMc.messageModule.forcedValues[e];null != r && (n = r);for (var _e36 = 0; _e36 < t.length; _e36++) {
        n = n.replace(t[_e36][0], t[_e36][1]);
      }return n;
    };

    gt.prototype.renderKeyToDom = function renderKeyToDom(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var r = this.getString(t, n),
          o = window.openAudioMc.messageModule.forcedValues[e];null != o && (r = o), i(e, r, !0);
    };

    gt.prototype.seedStatic = function seedStatic(e) {
      var t = function (e) {
        function t() {
          var e = [];return function t(n) {
            if (n.childNodes.length) for (var r = 0; r < n.childNodes.length; r++) {
              t(n.childNodes[r]);
            } else n.nodeType === Node.TEXT_NODE && e.push(n);
          }(document), e;
        }var n = [];for (var _r11, _i8 = 0; _i8 < t().length; _i8++) {
          _r11 = t()[_i8], -1 !== _r11.nodeValue.indexOf(e) && n.push(_r11.nodeValue);
        }return n;
      }("{%"),
          n = {};for (var _e37 = 0; _e37 < t.length; _e37++) {
        var r = t[_e37];var _i9 = "",
            _o7 = !1;var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
          for (var _iterator21 = r[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
            var _e38 = _step21.value;
            _o7 ? _i9 += _e38 : " " !== _e38 && "\n" !== _e38 && (_o7 = !0, _i9 += _e38);
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
      }for (var _t13 in n) {
        this.seededValues.push({ key: _t13, value: n[_t13], placeholders: e }), this.renderKeyToDom(_t13, n[_t13], e);
      }this.seeded = !0;
    };

    gt.prototype.fetchWithFailover = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var n, r;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                n = t ? Ee.CONTENT_PROXY + "https://client.openaudiomc.net/" : window.location.pathname + window.location.search;
                _context5.next = 3;
                return fetch(n + e);

              case 3:
                r = _context5.sent;

                if (!(200 === r.status || t)) {
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
                return window.openAudioMc.messageModule.fetchWithFailover(e, !0);

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

      function fetchWithFailover(_x14) {
        return _ref5.apply(this, arguments);
      }

      return fetchWithFailover;
    }();

    gt.prototype.load = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
        var t, _e39, _n18, _r12, _i10, _o8, _t14, _n19, _e40, _t15;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.currentLangFile === e)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                t = [];
                _context6.next = 5;
                return window.openAudioMc.messageModule.fetchWithFailover(e);

              case 5:
                t = _context6.sent;
                _n18 = 0;

              case 7:
                if (!(_n18 < t.length)) {
                  _context6.next = 16;
                  break;
                }

                if (!(_e39 = t[_n18], _e39.startsWith("#") || 5 > _e39.length)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("continue", 13);

              case 10:
                _r12 = !1, _i10 = "", _o8 = "";
                for (_n19 = 0; _n19 < _e39.length; _n19++) {
                  _t14 = _e39[_n19], _r12 ? _o8 += _t14 : "=" === _t14 ? _r12 = !0 : _i10 += _t14;
                }"" !== _o8 && (window.openAudioMc.messageModule.messages[_i10] = _o8);

              case 13:
                _n18++;
                _context6.next = 7;
                break;

              case 16:
                if (this.currentLangFile = e, window.openAudioMc.messageModule.seeded) {
                  for (_t15 = 0; _t15 < window.openAudioMc.messageModule.seededValues.length; _t15++) {
                    _e40 = window.openAudioMc.messageModule.seededValues[_t15], window.openAudioMc.messageModule.renderKeyToDom(_e40.key, _e40.value, _e40.placeholders);
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

    return gt;
  }();

  n.d(t, "OpenAudioEnv", function () {
    return mt;
  }), n.d(t, "OpenAudioMc", function () {
    return vt;
  });var mt = { build: "588", compiler: "Mindgamesnl", platform: "Production", environment: "Linux", isProd: JSON.parse("true"), envDescription: "default-prod" };window.debugHooks = {}, u(function () {
    window.debugUi.addPanel(oe.UI, function () {
      return "componentElementCache=" + Object.keys(re).length + ", propertyCache=" + Object.keys(ie).length;
    });
  });
  var vt = function (_ref7) {
    _inherits(vt, _ref7);

    function vt() {
      var _this51 = this;

      var _this50, _ret2;

      _classCallCheck(this, vt);

      if ((_this50 = _possibleConstructorReturn(this, _ref7.call(this)), _this50), c("Starting build " + JSON.stringify(mt)), _this50.messageModule = new gt(), _this50.canStart = !1, _this50.host = null, _this50.background = null, _this50.ambianceSound = "", _this50.isPatreon = !1, _this50.tokenSet = new Me().fromCache(), null == _this50.tokenSet) return _ret2 = void l(de.BAD_AUTH), _possibleConstructorReturn(_this50, _ret2);_this50.notificationModule = new Ve(_this50), _this50.timeService = new le(), _this50.userInterfaceModule = new he(_this50), _this50.hueConfiguration = new Le(_this50), _this50.mediaManager = new Pe(_this50), _this50.voiceModule = new pt(_this50), J("preparing session, welcome " + _this50.tokenSet.name);new Ue(Ee.MAIN_BACKEND).route(_this50).then(function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(e) {
          var t;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  J("Loading language, welcome " + _this50.tokenSet.name);
                  _context7.next = 3;
                  return _this50.messageModule.load("en.lang");

                case 3:
                  _this50.messageModule.seedStatic([["%player", _this50.tokenSet.name], ["%server", e.serverName]]);

                  _context7.t0 = e.useTranslations;

                  if (!_context7.t0) {
                    _context7.next = 9;
                    break;
                  }

                  c("Enabling automatic translations");
                  _context7.next = 9;
                  return _this50.messageModule.handleCountry(e.countryCode);

                case 9:
                  _this50.serverName = e.serverName;
                  _this50.canStart = !0;
                  _this50.host = e.host;
                  _this50.background = e.background;
                  _this50.ambianceSound = e.ambianceSound;
                  _this50.isPatreon = e.isPatreon;
                  l(de.WELCOME);
                  c("Server: " + e.serverName);
                  u(function () {
                    window.debugUi.addPanel(oe.ACCOUNT, "cached=" + e.fromCache + ", pc=" + e.playerCount + ", claimed=" + e.claimed + ", sfu=" + e.host + ", rtc=" + e.rtc);
                  });
                  t = Cookies.get("volume");
                  null == t ? _this50.mediaManager.changeVolume(25) : _this50.mediaManager.changeVolume(t), _this50.isPatreon && c("This server is supporting the project on Patreon! that's awesome!"), i("{{ craftmend.account.serverName }}", e.serverName), setTimeout(function () {
                    r("{{ oam.loader_style }}", "display: none;", "style");
                  }, 250);
                case 20:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, _this51);
        }));

        return function (_x16) {
          return _ref8.apply(this, arguments);
        };
      }()).catch(function (e) {
        console.error(e), console.error("Exception thrown", e.stack), _this50.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this50);
    }

    vt.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new Qe(this), this.hueModule = new ge(this, Object(ze.a)()), this.socketModule = new Ie(this, this.host), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new Fe(this), "" !== this.background && (r("{{ oam.side_image }}", this.background), r("{{ oam.bg_image_map }}", "--bg-map:url('" + this.background + "');")), this.mediaManager.postBoot());
    };

    vt.prototype.sendError = function sendError(e) {
      C(e, this.tokenSet.name);
    };

    return vt;
  }(function (_ref9) {
    _inherits(_class2, _ref9);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ref9.apply(this, arguments));
    }

    _class2.prototype.log = function log(e) {
      c(e);
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

    _class2.prototype.debugPrint = function debugPrint(e) {
      this.log(e);
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
    J("loading assets..."), mt.isProd || a(), u(function () {
      window.debugUi.addPanel(oe.LOG, function () {
        return ce.join("\n");
      });
    });if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://help.openaudiomc.net/browsers.html");r("{{ oam.side_image }}", "assets/bg.jpg", "src"), r("{{ oam.logo_image }}", "assets/logo.png", "src"), r("{{ oam.bg_image_map }}", "--bg-map:url('../assets/bg.jpg');", "style"), i("{{ oam.hue_bridge_name }}", "No bridge"), J("logging in..."), new Me().initialize().then(function (e) {
      return null == e ? (l(de.BAD_AUTH), window.location = location.protocol + "//" + window.location.host + window.location.pathname + "/login.html", void C("A faulty login attempt was done at " + window.location.host, "Steve")) : (u(function () {
        window.debugUi.addPanel(oe.SESSION, e.name + "@" + e.publicServerKey + "/" + e.scope);
      }), null != e && null != e.name && (i("{{ oam.player_name }}", e.name), He = new vt(), window.openAudioMc = He), void document.body.addEventListener("click", q));
    });
  }, window.onhashchange = function () {
    return window.location.reload();
  }, "toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var e = {};return Object.getOwnPropertyNames(this).forEach(function (t) {
        e[t] = this[t];
      }, this), e;
    }, configurable: !0, writable: !0 });
}]);
