"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (t) {
  function e(n) {
    if (i[n]) return i[n].exports;var s = i[n] = { i: n, l: !1, exports: {} };return t[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports;
  }var i = {};e.m = t, e.c = i, e.d = function (t, i, n) {
    e.o(t, i) || Object.defineProperty(t, i, { enumerable: !0, get: n });
  }, e.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, e.t = function (t, i) {
    if (1 & i && (t = e(t)), 8 & i) return t;if (4 & i && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var n = Object.create(null);if (e.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & i && "string" != typeof t) for (var s in t) {
      e.d(n, s, function (e) {
        return t[e];
      }.bind(null, s));
    }return n;
  }, e.n = function (t) {
    var i = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return e.d(i, "a", i), i;
  }, e.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, e.p = "", e(e.s = 2);
}([function (t, e, i) {
  "use strict";
  (function (t) {
    function n() {
      return o();
    }i.d(e, "a", function () {
      return n;
    });var s = function s(t, e, i, n) {
      var o = function o(e, s, _o) {
        return new n(function (t) {
          null !== _o && (_o = i.stringify(_o)), t(_o);
        }).then(function (i) {
          return t(s, { method: e, body: i });
        }).then(function (t) {
          return t.json();
        });
      },
          r = function r(t, e) {
        return o(t, e, null);
      },
          a = r.bind(null, "GET"),
          l = o.bind(null, "PUT"),
          h = o.bind(null, "POST"),
          u = r.bind(null, "DELETE"),
          c = function c(t, e) {
        return function (i) {
          for (var _len = arguments.length, n = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }

          return t.apply(undefined, [e(i)].concat(n));
        };
      },
          d = function d(t) {
        return function (s, o) {
          return n.resolve(new e(i.stringify({ address: s.slice(t.length), method: o.method, body: i.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(t) {
          var o = "http://" + t,
              r = o + "/api";return { createUser: function createUser(t) {
              return h(r, { devicetype: t });
            }, user: function user(m) {
              Cookies.set("hueid", m);var f = r + "/" + m,
                  p = f + "/capabilities",
                  g = f + "/config",
                  y = f + "/lights",
                  b = f + "/groups",
                  _ = f + "/schedules",
                  w = f + "/scenes",
                  v = f + "/sensors",
                  x = f + "/rules",
                  M = f + "/resourcelinks",
                  k = function k(t) {
                return function (e) {
                  return t + "/" + e;
                };
              },
                  E = k(y),
                  C = k(b),
                  z = k(_),
                  S = k(w),
                  A = k(v),
                  T = k(x),
                  B = k(M);return { getCapabilities: a.bind(null, p), deleteUser: c(u, function (t) {
                  return g + "/whitelist/" + t;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, f), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return h(y, t);
                }, getLight: c(a, E), setLight: c(l, E), setLightState: c(l, function (t) {
                  return E(t) + "/state";
                }), deleteLight: c(u, E), getGroups: a.bind(null, b), createGroup: h.bind(null, b), getGroup: c(a, C), setGroup: c(l, C), setGroupState: c(l, function (t) {
                  return C(t) + "/action";
                }), deleteGroup: c(u, C), getSchedules: a.bind(null, _), createSchedule: h.bind(null, _), getSchedule: c(a, z), setSchedule: c(l, z), deleteSchedule: c(u, z), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return s(d(o), e, i, n).bridge(t).user(m);
                }, getScenes: a.bind(null, w), createScene: h.bind(null, w), getScene: c(a, S), setScene: c(l, S), setSceneLightState: function setSceneLightState(t, e, i) {
                  return l(S(t) + "/lightstates/" + e, i);
                }, deleteScene: c(u, S), getSensors: a.bind(null, v), createSensor: h.bind(null, v), searchForNewSensors: h.bind(null, v, null), getNewSensors: a.bind(null, v + "/new"), getSensor: c(a, A), setSensor: c(l, A), setSensorConfig: c(l, function (t) {
                  return A(t) + "/config";
                }), setSensorState: c(l, function (t) {
                  return A(t) + "/state";
                }), deleteSensor: c(u, A), getRules: a.bind(null, x), createRule: h.bind(null, x), getRule: c(a, T), setRule: c(l, T), deleteRule: c(u, T), ruleActionGenerator: function ruleActionGenerator() {
                  return s(d(f), e, i, n).bridge(t).user(m);
                }, getResourceLinks: a.bind(null, M), createResourceLink: h.bind(null, M), getResourceLink: c(a, B), setResourceLink: c(l, B), deleteResourceLink: c(u, B) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = s.bind(null, fetch, Response, JSON, Promise), void 0 !== t.exports && (t.exports = o));
  }).call(this, i(1)(t));
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
}, function (t, e, i) {
  "use strict";
  function n(t, e) {
    function i(t, e) {
      var i = 0,
          s = e || t.innerHTML,
          o = s.length;nt.push(window.setInterval(function () {
        i >= o && (i = 0), s = n(s, i), t.innerHTML = s, i++;
      }, 0));
    }function n(t, e) {
      var i = W(function (t, e) {
        return Y(Math.random() * (e - t + 1)) + t;
      }(64, 90));return t.substr(0, e) + i + t.substr(e + 1, t.length);
    }var s = void 0,
        o = void 0,
        r = e.childNodes.length;if (-1 < t.indexOf("<br>")) {
      e.innerHTML = t;for (var _t2 = 0; _t2 < r; _t2++) {
        o = e.childNodes[_t2], 3 === o.nodeType && (s = document.createElement("span"), s.innerHTML = o.nodeValue, e.replaceChild(s, o), i(s));
      }
    } else i(e, t);
  }function s(t, e) {
    var i = e.length,
        s = document.createElement("span"),
        o = !1;for (var _r = 0; _r < i; _r++) {
      s.style.cssText += st[e[_r]] + ";", "§k" === e[_r] && (n(t, s), o = !0);
    }return o || (s.innerHTML = t), s;
  }function o(t) {
    var e,
        i,
        n = t.match(/&.{1}/g) || [],
        o = [],
        r = [],
        a = document.createDocumentFragment(),
        l = n.length;t = t.replace(/\n|\\n/g, "<br>");for (var _e = 0; _e < l; _e++) {
      o.push(t.indexOf(n[_e])), t = t.replace(n[_e], "\0\0");
    }0 !== o[0] && a.appendChild(s(t.substring(0, o[0]), []));for (var _h = 0; _h < l; _h++) {
      if (2 === (i = o[_h + 1] - o[_h])) {
        for (; 2 == i;) {
          r.push(n[_h]), _h++, i = o[_h + 1] - o[_h];
        }r.push(n[_h]);
      } else r.push(n[_h]);-1 < r.lastIndexOf("§r") && (r = r.slice(r.lastIndexOf("§r") + 1)), e = t.substring(o[_h], o[_h + 1]), a.appendChild(s(e, r));
    }return a;
  }function r(t, e, i, n) {
    this._x = t || 0, this._y = e || 0, this._z = i || 0, this._w = void 0 === n ? 1 : n;
  }function a(t, e, i) {
    this.x = t || 0, this.y = e || 0, this.z = i || 0;
  }function l() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
  }function h(t, e, i, n) {
    this._x = t || 0, this._y = e || 0, this._z = i || 0, this._order = n || h.DefaultOrder;
  }function u(t) {
    if ("string" != typeof t && (t += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");return t.toLowerCase();
  }function c(t) {
    return "string" != typeof t && (t += ""), t;
  }function d(t) {
    var e = { next: function next() {
        var e = t.shift();return { done: void 0 === e, value: e };
      } };return Et.iterable && (e[Symbol.iterator] = function () {
      return e;
    }), e;
  }function m(t) {
    this.map = {}, t instanceof m ? t.forEach(function (t, e) {
      this.append(e, t);
    }, this) : Array.isArray(t) ? t.forEach(function (t) {
      this.append(t[0], t[1]);
    }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
      this.append(e, t[e]);
    }, this);
  }function f(t) {
    return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0);
  }function p(t) {
    return new Promise(function (e, i) {
      t.onload = function () {
        e(t.result);
      }, t.onerror = function () {
        i(t.error);
      };
    });
  }function g(t) {
    var e = new FileReader(),
        i = p(e);return e.readAsArrayBuffer(t), i;
  }function y(t) {
    if (t.slice) return t.slice(0);var e = new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)), e.buffer;
  }function b() {
    return this.bodyUsed = !1, this._initBody = function (t) {
      this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : Et.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : Et.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : Et.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : Et.arrayBuffer && Et.blob && function (t) {
        return t && DataView.prototype.isPrototypeOf(t);
      }(t) ? (this._bodyArrayBuffer = y(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : Et.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || zt(t)) ? this._bodyArrayBuffer = y(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : Et.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, Et.blob && (this.blob = function () {
      var t = f(this);if (t) return t;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(g);
    }), this.text = function () {
      var t = f(this);if (t) return t;if (this._bodyBlob) return function (t) {
        var e = new FileReader(),
            i = p(e);return e.readAsText(t), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (t) {
        for (var e = new Uint8Array(t), i = Array(e.length), n = 0; n < e.length; n++) {
          i[n] = W(e[n]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, Et.formData && (this.formData = function () {
      return this.text().then(w);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function _(t, e) {
    var i = (e = e || {}).body;if (t instanceof _) {
      if (t.bodyUsed) throw new TypeError("Already read");this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new m(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, i || null == t._bodyInit || (i = t._bodyInit, t.bodyUsed = !0);
    } else this.url = t + "";if (this.credentials = e.credentials || this.credentials || !e.headers && this.headers || (this.headers = new m(e.headers)), this.method = function (t) {
      var e = t.toUpperCase();return -1 < St.indexOf(e) ? e : t;
    }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function w(t) {
    var e = new FormData();return t.trim().split("&").forEach(function (t) {
      if (t) {
        var i = t.split("="),
            n = i.shift().replace(/\+/g, " "),
            s = i.join("=").replace(/\+/g, " ");e.append(decodeURIComponent(n), decodeURIComponent(s));
      }
    }), e;
  }function v(t) {
    var e = new m();return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (t) {
      var i = t.split(":"),
          n = i.shift().trim();if (n) {
        var s = i.join(":").trim();e.append(n, s);
      }
    }), e;
  }function x(t, e) {
    e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new m(e.headers), this.url = e.url || "", this._initBody(t);
  }function M(t, e) {
    return new Promise(function (i, n) {
      function s() {
        r.abort();
      }var o = new _(t, e);if (o.signal && o.signal.aborted) return n(new Tt("Aborted", "AbortError"));var r = new XMLHttpRequest();r.onload = function () {
        var t = { status: r.status, statusText: r.statusText, headers: v(r.getAllResponseHeaders() || "") };t.url = "responseURL" in r ? r.responseURL : t.headers.get("X-Request-URL");var e = "response" in r ? r.response : r.responseText;i(new x(e, t));
      }, r.onerror = function () {
        n(new TypeError("Network request failed"));
      }, r.ontimeout = function () {
        n(new TypeError("Network request failed"));
      }, r.onabort = function () {
        n(new Tt("Aborted", "AbortError"));
      }, r.open(o.method, o.url, !0), "include" === o.credentials ? r.withCredentials = !0 : "omit" === o.credentials && (r.withCredentials = !1), "responseType" in r && Et.blob && (r.responseType = "blob"), o.headers.forEach(function (t, e) {
        r.setRequestHeader(e, t);
      }), o.signal && (o.signal.addEventListener("abort", s), r.onreadystatechange = function () {
        4 === r.readyState && o.signal.removeEventListener("abort", s);
      }), r.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function k(t, e, i, n, s) {
    this.fromSampleRate = t, this.toSampleRate = e, this.channels = 0 | i, this.outputBufferSize = n, this.noReturn = !!s, this.initialize();
  }function E(t, e, i, n, s, o) {
    this.audioChannels = 2 == t ? 2 : 1, jt = 1 == this.audioChannels, Dt = 0 < e && 16777215 >= e ? e : 44100, Ut = i >= Ft << 1 && i < n ? i & (jt ? 4294967295 : 4294967294) : Ft << 1, Vt = Y(n) > Ut + this.audioChannels ? n & (jt ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof s ? s : function () {}, Wt = -1 <= o && 1 >= o && 0 != o ? o : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function C(t) {
    try {
      var e = new Float32Array(t);
    } catch (e) {
      var e;Array(t);
    }for (var i = 0; i < t; ++i) {
      e[i] = Wt * (i / t);
    }return e;
  }function z(t) {
    try {
      var e = new Float32Array(t);
    } catch (n) {
      e = Array(t);var i = 0;do {
        e[i] = 0;
      } while (++i < t);
    }return e;
  }function S() {
    for (var t = "", e = "", i = 0; i < Ft && Yt != Xt; ++i) {
      t += W(12288 + (0 | 16383 * L(O(Lt[Yt++] + 1, 0), 2))), e += W(12288 + (0 | 16383 * L(O(Lt[Yt++] + 1, 0), 2))), Yt == Qt && (Yt = 0);
    }return t + e;
  }function A() {
    for (var t = "", e = 0; e < Ft && Yt != Xt; ++e) {
      t += W(12288 + (0 | 16383 * L(O(Lt[Yt++] + 1, 0), 2))), Yt == Qt && (Yt = 0);
    }return t;
  }function T() {
    return (Yt <= Xt ? 0 : Qt) + Xt - Yt;
  }function B(t) {
    Ht = C(Vt), Zt = Vt, Yt = 0, Xt = 0, Qt = O(Vt * P(Dt / t), Ft) << 1, jt ? (Lt = z(Qt), qt = new k(Dt, t, 1, Qt, !0), A) : (Lt = z(Qt <<= 1), qt = new k(Dt, t, 2, Qt, !0), S);
  }var I = Math.pow,
      P = Math.ceil,
      R = Math.LN2,
      F = Math.log,
      O = Math.max,
      H = Math.PI,
      L = Math.min,
      U = Math.cos,
      V = Math.sin,
      N = Math.atan2,
      D = Math.sqrt,
      j = Number.EPSILON,
      W = String.fromCharCode,
      q = Math.abs,
      Z = Math.round,
      Y = Math.floor;i.r(e);
  var X = function () {
    function X() {
      _classCallCheck(this, X);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    X.prototype.sync = function sync(t, e) {
      var i = new Date(t),
          n = new Date().getTime();n += 60 * e * 60 * 1e3;var s = new Date(n);this.isServerAhead = i.getTime() > s.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - s.getTime() : s.getTime() - i.getTime(), this.hasSynced = !0;
    };

    X.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var t = new Date().getTime();return new Date(this.isServerAhead ? t + this.msOffset : t - this.msOffset);
    };

    return X;
  }();

  var Q = function () {
    function Q(t) {
      _classCallCheck(this, Q);

      this.fallback = "No message provided in oa+", this.main = t, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    Q.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return Q;
  }();

  var G = function () {
    function G(t) {
      var _this = this;

      _classCallCheck(this, G);

      this.openAudioMc = t, document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    G.prototype.changeColor = function changeColor(t, e) {
      var i = function (t) {
        return t = t.replace("#", ""), "rgb(" + parseInt(t.substring(0, 2), 16) + ", " + parseInt(t.substring(2, 4), 16) + ", " + parseInt(t.substring(4, 6), 16) + ")";
      }(t);document.querySelectorAll("*").forEach(function (t) {
        var n = window.getComputedStyle(t);Object.keys(n).reduce(function (s, o) {
          var r = n[o],
              a = n.getPropertyValue(r);if (0 <= a.indexOf(i)) {
            var _n = a.replace(i, e);0 <= r.indexOf("border-top") ? t.style.borderTop = "2px solid " + _n : t.style[r] = _n;
          }
        });
      });
    };

    G.prototype.setMessage = function setMessage(t) {
      document.getElementById("status-message").innerHTML = t;
    };

    G.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    G.prototype.openApp = function openApp() {
      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage), document.getElementById("page").classList.remove("dark-bg");
    };

    G.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    G.prototype.kickScreen = function kickScreen(t) {
      document.getElementById("footer-welcome").innerText = "Session terminated", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = null == t ? this.openAudioMc.messages.errorMessage : t, document.getElementById("welcome").style.display = "", document.getElementById("page").classList.add("dark-bg"), document.getElementById("app").style.display = "none";
    };

    G.prototype.showVolumeSlider = function showVolumeSlider(t) {
      t ? (document.getElementById("volume-label").style.display = "", document.getElementById("volume-disp").style.display = "") : (document.getElementById("volume-disp").style.display = "none", document.getElementById("volume-label").style.display = "none");
    };

    return G;
  }();

  var J = function () {
    function J(t, e) {
      var _this2 = this;

      _classCallCheck(this, J);

      this.hue = e, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = t, this.hue.discover().then(function (t) {
        t.forEach(function (t) {
          _this2.bridges.push(t), _this2.onDiscover();
        });
      }).catch(function (t) {
        return console.log("Error finding bridges", t);
      }), this.isSsl && this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue"), document.getElementById("hue-start-linking-button").onclick = function () {
        _this2.startSetup();
      };
    }

    J.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-bridge-menu-button").style.display = "none", void this.openAudioMc.getUserInterfaceModule().showMain();null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    J.prototype.startSetup = function startSetup() {
      var t = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (e) {
        t.linkBridge(e.internalipaddress);
      });
    };

    J.prototype.onConnect = function onConnect() {
      var _this3 = this;

      this.currentUser.getConfig().then(function (t) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this3.openAudioMc.getHueConfiguration().setBridgeName(t.name), _this3.currentUser.getLights().then(function (t) {
          var e = [];for (var _i in t) {
            t.hasOwnProperty(_i) && e.push({ name: t[_i].name, id: parseInt(_i) });
          }_this3.openAudioMc.getHueConfiguration().setLightNamesAndIds(e);null != Cookies.get("hue-state") && (_this3.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this3.openAudioMc.getHueConfiguration().applyState(), _this3.openAudioMc.getHueConfiguration().updateState();
        }), _this3.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    J.prototype.updateSelector = function updateSelector(t) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = t;
      }, 200);
    };

    J.prototype.colorToHueHsv = function colorToHueHsv(t) {
      var e = this.color(t).toHSV();return { on: 0 != 2 * e.alpha * 127.5, hue: Y(65535 * e.hue / 360), sat: Y(255 * e.saturation), bri: Z(2 * e.alpha * 127.5) };
    };

    J.prototype.setLight = function setLight(t, e) {
      var _this4 = this;

      var i = [];if ("number" == typeof t) {
        var _e2 = this.openAudioMc.getHueConfiguration().getBulbStateById(t - 1);if (-1 === _e2) return !1;i.push(_e2);
      } else if (t.startsWith("[")) JSON.parse(t).forEach(function (t) {
        var e = _this4.openAudioMc.getHueConfiguration().getHueIdFromId(t - 1);return -1 !== e && void i.push(e);
      });else {
        var _e3 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(t) - 1);if (-1 === _e3) return !1;i.push(_e3);
      }i.forEach(function (t) {
        _this4.currentUser.setLightState(t, _this4.colorToHueHsv(e)).then(function () {});
      });
    };

    J.prototype.linkBridge = function linkBridge(t, e) {
      var _this5 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == e && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(t).user(this.options.userid), void this.currentUser.getGroups().then(function (e) {
        null != e[0] && null == e[0].error ? _this5.linkBridge(t, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(t), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var n = 0,
          s = -1;s = setInterval(function () {
        function t() {
          clearInterval(s);
        }if (n++, 60 < n) return t(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this5.startSetup();
        }, void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var e = 60 - n;document.getElementById("hue-linking-message").innerText = _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", e), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (e) {
          null == e[0].error ? null != e[0].success && (i.currentUser = i.currentBridge.user(e[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), i.isLinked = !0, i.onConnect(), t()) : 101 === e[0].error.type || (t(), _this5.openAudioMc.log("Unexpected error while connecting: " + e[0].error.type));
        });
      }, 1e3);
    };

    return J;
  }();

  var K = function () {
    function K(t) {
      _classCallCheck(this, K);

      this.channelName = t, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map();
    }

    K.prototype.setTag = function setTag(t) {
      this.tags.set(t, !0);
    };

    K.prototype.hasTag = function hasTag(t) {
      return this.tags.has(t);
    };

    K.prototype.addSound = function addSound(t) {
      this.sounds.push(t);var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.sounds.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _t3 = _step.value;
          _t3.registerMixer(this.mixer, this);
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

      this._updateVolume();
    };

    K.prototype.setChannelVolume = function setChannelVolume(t) {
      this.channelVolume = t, this._updateVolume();
    };

    K.prototype.registerMixer = function registerMixer(t) {
      this.mixer = t;var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.sounds.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _t4 = _step2.value;
          _t4.registerMixer(this.mixer, this);
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
    };

    K.prototype.fadeChannel = function fadeChannel(t, e, i) {
      var _this6 = this;

      this.interruptFade(), this.targetAfterFade = t, this.isFading = !0;(function (t, e, n, s) {
        e = e || 1e3, n = n || 0, s = "function" == typeof s ? s : function () {};var o = _this6.channelVolume,
            r = e / q(o - n),
            a = setInterval(function () {
          o = o > n ? o - 1 : o + 1;var t = _this6.mixer.masterVolume,
              e = o / 100 * t;var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _this6.sounds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _t6 = _step3.value;
              _t6.setVolume(e);
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

          if (_this6.channelVolume = o, o == n) {
            null != i && i(), s.call(_this6), clearInterval(a);var _t5 = _this6.fadeTimer.indexOf(a);-1 < _t5 && _this6.fadeTimer.splice(_t5, 1), _this6.isFading = !1, a = null;
          }
        }, r);_this6.fadeTimer.push(a);
      })(0, e, t);
    };

    K.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.fadeTimer[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _t7 = _step4.value;
            clearInterval(_t7);
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
      }
    };

    K.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _t8 = _step5.value;
          _t8.setVolume(e);
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

    K.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var t = this.mixer.masterVolume,
          e = this.channelVolume / 100 * t;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _t9 = _step6.value;
          _t9.setVolume(e);
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

    K.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _t10 = _step7.value;
          _t10.destroy();
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
    };

    return K;
  }();

  var $ = function () {
    function $(t, e) {
      _classCallCheck(this, $);

      this.openAudioMc = e, this.mixerName = t, this.masterVolume = 100, this.channels = new Map();
    }

    $.prototype.updateCurrent = function updateCurrent() {
      var t = [];this.channels.forEach(function (e, i) {
        var n = [];e.tags.forEach(function (t, e) {
          n.push(e);
        }), t.push({ name: i, tags: n });
      }), this.openAudioMc.socketModule.send("current_channels", { tracks: t });
    };

    $.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t;var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.channels.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _t11 = _step8.value;
          _t11.updateFromMasterVolume();
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

    $.prototype.removeChannel = function removeChannel(t) {
      var e = void 0;e = t instanceof K ? t : this.channels.get(t), null != e && (e.destroy(), this.channels.delete(e.channelName)), this.updateCurrent();
    };

    $.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    $.prototype.addChannel = function addChannel(t) {
      if (!(t instanceof K)) throw new Error("Argument isn't a channel");{
        var _e4 = t.channelName,
            _i2 = this.channels.get(_e4);null != _i2 && _i2.destroy(), t.registerMixer(this), this.channels.set(_e4, t);
      }
    };

    return $;
  }();

  var tt = function () {
    function tt(t) {
      var _this7 = this;

      _classCallCheck(this, tt);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = t, this.mixer = new $(null, t), document.getElementById("volume-slider").oninput = function () {
        var t = document.getElementById("volume-slider").value;_this7.setMasterVolume(t), Cookies.set("volume", t);
      };
    }

    tt.prototype.destroySounds = function destroySounds(t, e, i) {
      var _this8 = this;

      this.openAudioMc.debugPrint("starting to quit fade " + t);var n = 250;i && (n = 0);var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step9.value;
          e ? i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          }) : null == t || "" === t ? !i.hasTag("SPECIAL") && !i.hasTag("REGION") && !i.hasTag("SPEAKER") && i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          }) : i.hasTag(t) && i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          });
        };

        for (var _iterator9 = this.mixer.getChannels()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          _loop();
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

    tt.prototype.setMasterVolume = function setMasterVolume(t) {
      this.masterVolume = t, 0 === t ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + t + "%", Cookies.set("volume", t), this.mixer.setMasterVolume(t), this.openAudioMc.voiceModule.setVolume(t);
    };

    tt.prototype.changeVolume = function changeVolume(t) {
      document.getElementById("volume-slider").value = t, this.setMasterVolume(t);
    };

    tt.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return tt;
  }();

  var et = function () {
    function et(t, e) {
      _classCallCheck(this, et);

      this.id = t, this.option = e, this.onTimeout = null;
    }

    et.prototype.show = function show(t) {
      var _this9 = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === t || null == t) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = e ? t : "<p>" + t + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (t) {
        t.preventDefault(), _this9.alertClass.hide(_this9.alertBox);
      }), !this.option.persistent) var i = setTimeout(function () {
        _this9.alertClass.hide(_this9.alertBox), clearTimeout(i);
      }, this.option.closeTime);return this;
    };

    et.prototype.hide = function hide() {
      var _this10 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this10.alertBox.parentNode.removeChild(_this10.alertBox), clearTimeout(t), null != _this10.onTimeout && _this10.onTimeout();
      }, 500);
    };

    return et;
  }();

  var it = function () {
    function it(t, e) {
      var _this11 = this;

      _classCallCheck(this, it);

      if (this.handlers = {}, this.openAudioMc = t, this.callbacksEnabled = !1, null == function () {
        function _class() {
          _classCallCheck(this, _class);
        }

        _class.getParameter = function getParameter() {
          var t = window.location.href.split("&"),
              e = {};for (var _i3 = 0; _i3 < t.length; _i3++) {
            var _n2 = t[_i3].split("="),
                _s = decodeURIComponent(_n2[0]),
                _o2 = decodeURIComponent(_n2[1]);void 0 === e[_s] ? e[_s] = decodeURIComponent(_o2) : "string" == typeof e[_s] ? e[_s] = [e[_s], decodeURIComponent(_o2)] : e[_s].push(decodeURIComponent(_o2));
          }return e;
        };

        return _class;
      }().getParameter().data) return t.debugPrint("data is empty"), void t.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");t.debugPrint("Username: " + t.tokenSet.name), t.debugPrint("Player uuid: " + t.tokenSet.uuid), t.debugPrint("Server uuid: " + t.tokenSet.publicServerKey), t.debugPrint("Token: " + t.tokenSet.token), this.state = "loading", this.authHeader = "type=client&n=" + t.tokenSet.name + "&player=" + t.tokenSet.uuid + "&s=" + t.tokenSet.publicServerKey + "&p=" + t.tokenSet.token, t.debugPrint(this.authHeader);var i = this;this.socket = io(e, { query: i.authHeader, autoConnect: !1 }), this.socket.on("connect", function () {
        t.userInterfaceModule.openApp(), t.getUserInterfaceModule().setMessage(_this11.openAudioMc.getMessages().welcomeMessage), t.socketModule.state = "ok";
      }), this.socket.on("time-update", function (t) {
        var e = t.split(":"),
            i = parseInt(e[1]),
            n = parseInt(e[0]);_this11.openAudioMc.getTimeService().sync(n, i);
      }), this.socket.on("disconnect", function () {
        t.debugPrint("closed"), t.getMediaManager().destroySounds(null, !0), i.state = "closed", t.voiceModule.handleSocketClosed(), t.userInterfaceModule.kickScreen(), setTimeout(function () {
          t.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (t) {
        null != i.handlers[t.type] && i.handlers[t.type](t.payload);
      }), this.socket.on("join-call", function (e) {
        var i = e.room,
            n = e.server,
            s = e.accessToken,
            o = e.members,
            r = [];var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = o[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _t12 = _step10.value;
            r.push(_t12.name);
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

        t.voiceModule.promptCall(n, i, s, r, o);
      }), this.socket.on("resub-to-player-in-call", function (e) {
        var i = t.voiceModule.room;null != i && i.resubToPlayer(e);
      }), this.socket.on("member-left-call", function (e) {
        var i = t.voiceModule.room;null != i && i.handleMemberLeaving(e);
      }), this.socket.connect();
    }

    it.prototype.send = function send(t, e) {
      this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + t), this.socket.emit(t, e)) : console.log("[OpenAudioMc] could not satisfy callback " + t + " because the protocol is outdated");
    };

    it.prototype.registerHandler = function registerHandler(t, e) {
      this.handlers[t] = e;
    };

    return it;
  }();

  var nt = [],
      st = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _t13 = nt.length; _t13--;) {
        clearInterval(nt[_t13]);
      }nt = [];
    }(), o(this + "");
  };
  var ot = function () {
    function ot(t) {
      _classCallCheck(this, ot);

      null != t && this.fromJson(t);
    }

    ot.prototype.fromJson = function fromJson(t) {
      document.getElementById("card-panel").style.display = "", this.lines = [], this.title = t.title;var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = t.rows[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _e5 = _step11.value;
          this.lines.push(this.rowToHtml(_e5));
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

      document.getElementById("card-title").innerText = this.title;var e = "";this.lines.forEach(function (t) {
        e += t;
      }), document.getElementById("card-content").innerHTML = e;
    };

    ot.prototype.replaceWithJson = function replaceWithJson(t, e) {
      document.getElementById(t).replaceWith(new DOMParser().parseFromString(this.partToHtml(e), "text/html").body.childNodes[0]);
    };

    ot.prototype.rowToHtml = function rowToHtml(t) {
      var e = "";var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = t.textList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _i4 = _step12.value;
          e += this.partToHtml(_i4);
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

      return e;
    };

    ot.prototype.partToHtml = function partToHtml(t) {
      var e = "",
          i = [],
          n = [];i.push("<p id='" + t.id + "'>"), n.push("</p>");var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = t.styles[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var _e6 = _step13.value;
          "BOLD" === _e6 ? (i.push("<b>"), n.push("</b>")) : "ITALLIC" === _e6 ? (i.push("<i>"), n.push("</i>")) : "UNDERLINE" === _e6 && (i.push("<u>"), n.push("</u>"));
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

      null != t.hyperlink && "" != t.hyperlink && (i.push("<a href='" + t.hyperlink + "'>"), n.push("</a>"));var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = i[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _t14 = _step14.value;
          e += _t14;
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

      t.text = t.text.split("&").join("&"), o(t.text).childNodes.forEach(function (t) {
        e += t.outerHTML;
      });var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = n[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _t15 = _step15.value;
          e += _t15;
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

    return ot;
  }();

  var rt = function () {
    function rt(t, e, i, n) {
      _classCallCheck(this, rt);

      this.publicServerKey = t, this.uuid = e, this.name = i, this.token = n;
    }

    rt.prototype.fromUrl = function fromUrl(t) {
      if (null == t) return null;if (2 > t.split("?").length) return null;var e = function () {
        function _class2() {
          _classCallCheck(this, _class2);
        }

        _class2.getParametersFromUrl = function getParametersFromUrl(t) {
          if (-1 < t.indexOf("?&")) return {};var e = t.split("&"),
              i = {};for (var _t16 = 0; _t16 < e.length; _t16++) {
            var _n3 = e[_t16].split("="),
                _s2 = decodeURIComponent(_n3[0]),
                _o3 = decodeURIComponent(_n3[1]);void 0 === i[_s2] ? i[_s2] = decodeURIComponent(_o3) : "string" == typeof i[_s2] ? i[_s2] = [i[_s2], decodeURIComponent(_o3)] : i[_s2].push(decodeURIComponent(_o3));
          }return i;
        };

        return _class2;
      }().getParametersFromUrl(t.split("?")[1]);if (null == e.data) return null;var i = atob(e.data).split(":");if (4 !== i.length) return null;var n = i[0],
          s = i[1],
          o = i[2],
          r = i[3];return null != n && 16 >= n.length && null != s && 40 >= s.length && null != o && 40 >= o.length && null != r && 5 >= r.length ? new rt(o, s, n, r) : null;
    };

    return rt;
  }();

  var at = null;
  var lt = function () {
    function lt(t) {
      var _this12 = this;

      _classCallCheck(this, lt);

      this.soundElement = document.createElement("audio"), this.hadError = !1, this.error = null, this.soundElement.onerror = function (t) {
        _this12.hadError = !0, _this12.error = t, _this12._handleError();
      }, this.soundElement.src = t, this.soundElement.setAttribute("preload", "auto"), this.soundElement.setAttribute("controls", "none"), this.soundElement.setAttribute("display", "none"), this.soundElement.preload = "autoauto", this.soundElement.abort = console.log, this.openAudioMc = null, this.onFinish = null, this.loop = !1, this.mixer = null, this.channel = null, this.finsishedInitializing = !1;
    }

    lt.prototype.setOa = function setOa(t) {
      this.openAudioMc = t, this._handleError();
    };

    lt.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _t17 = this.soundElement.error.code,
            e = null;1 === _t17 ? e = "MEDIA_ERR_ABORTED" : 2 === _t17 ? e = "MEDIA_ERR_NETWORK" : 3 === _t17 ? e = "MEDIA_ERR_DECODE" : 4 === _t17 && (e = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != e && (console.log("[OpenAudioMc] Reporting media failure " + e), this.openAudioMc.socketModule.send("media_failure", { mediaError: e, source: this.soundElement.src }));
      }
    };

    lt.prototype.registerMixer = function registerMixer(t, e) {
      this.mixer = t, this.channel = e;
    };

    lt.prototype.finalize = function finalize() {
      var _this13 = this;

      return new Promise(function (t) {
        _this13.soundElement.onended = function () {
          _this13.finsishedInitializing && (null != _this13.onFinish && _this13.onFinish(), _this13.loop ? (_this13.setTime(0), _this13.soundElement.play()) : _this13.mixer.removeChannel(_this13.channel));
        };var e = !1;var i = function i() {
          if (!e) {
            var _e7 = _this13.soundElement.play();_e7 instanceof Promise ? _e7.then(t).catch(t) : t();
          }e = !0;
        };_this13.soundElement.onprogress = i, _this13.soundElement.oncanplay = i, _this13.soundElement.oncanplaythrough = i;
      });
    };

    lt.prototype.setLooping = function setLooping(t) {
      this.loop = t;
    };

    lt.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    lt.prototype.setOnFinish = function setOnFinish(t) {
      this.onFinish = t;
    };

    lt.prototype.setVolume = function setVolume(t) {
      100 < t && (t = 100), this.soundElement.volume = t / 100;
    };

    lt.prototype.startDate = function startDate(t) {
      var e = new Date(t),
          i = q((e.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          n = this.soundElement.duration;if (i > n) {
        i -= Y(i / n) * n;
      }this.setTime(i);
    };

    lt.prototype.setTime = function setTime(t) {
      this.soundElement.currentTime = t;
    };

    lt.prototype.destroy = function destroy() {
      this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return lt;
  }();

  _extends(r, { slerp: function slerp(t, e, i, n) {
      return i.copy(t).slerp(e, n);
    }, slerpFlat: function slerpFlat(t, e, i, n, s, o, r) {
      var a = i[n + 0],
          l = i[n + 1],
          h = i[n + 2],
          u = i[n + 3],
          c = s[o + 0],
          d = s[o + 1],
          m = s[o + 2],
          f = s[o + 3];if (u !== f || a !== c || l !== d || h !== m) {
        var p = 1 - r,
            g = a * c + l * d + h * m + u * f,
            y = 0 <= g ? 1 : -1,
            b = 1 - g * g;if (b > j) {
          var _ = D(b),
              w = N(_, g * y);p = V(p * w) / _, r = V(r * w) / _;
        }var v = r * y;if (a = a * p + c * v, l = l * p + d * v, h = h * p + m * v, u = u * p + f * v, p == 1 - r) {
          var x = 1 / D(a * a + l * l + h * h + u * u);a *= x, l *= x, h *= x, u *= x;
        }
      }t[e] = a, t[e + 1] = l, t[e + 2] = h, t[e + 3] = u;
    }, multiplyQuaternionsFlat: function multiplyQuaternionsFlat(t, e, i, n, s, o) {
      var r = i[n],
          a = i[n + 1],
          l = i[n + 2],
          h = i[n + 3],
          u = s[o],
          c = s[o + 1],
          d = s[o + 2],
          m = s[o + 3];return t[e] = r * m + h * u + a * d - l * c, t[e + 1] = a * m + h * c + l * u - r * d, t[e + 2] = l * m + h * d + r * c - a * u, t[e + 3] = h * m - r * u - a * c - l * d, t;
    } }), Object.defineProperties(r.prototype, { x: { get: function get() {
        return this._x;
      }, set: function set(t) {
        this._x = t, this._onChangeCallback();
      } }, y: { get: function get() {
        return this._y;
      }, set: function set(t) {
        this._y = t, this._onChangeCallback();
      } }, z: { get: function get() {
        return this._z;
      }, set: function set(t) {
        this._z = t, this._onChangeCallback();
      } }, w: { get: function get() {
        return this._w;
      }, set: function set(t) {
        this._w = t, this._onChangeCallback();
      } } }), _extends(r.prototype, { isQuaternion: !0, set: function set(t, e, i, n) {
      return this._x = t, this._y = e, this._z = i, this._w = n, this._onChangeCallback(), this;
    }, clone: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }, copy: function copy(t) {
      return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
    }, setFromEuler: function setFromEuler(t, e) {
      if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var i = t._x,
          n = t._y,
          s = t._z,
          o = t.order,
          r = U,
          a = V,
          l = r(i / 2),
          h = r(n / 2),
          u = r(s / 2),
          c = a(i / 2),
          d = a(n / 2),
          m = a(s / 2);return "XYZ" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u - c * d * m) : "YXZ" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u + c * d * m) : "ZXY" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u - c * d * m) : "ZYX" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u + c * d * m) : "YZX" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u - c * d * m) : "XZY" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u + c * d * m) : console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o), !1 !== e && this._onChangeCallback(), this;
    }, setFromAxisAngle: function setFromAxisAngle(t, e) {
      var i = e / 2,
          n = V(i);return this._x = t.x * n, this._y = t.y * n, this._z = t.z * n, this._w = U(i), this._onChangeCallback(), this;
    }, setFromRotationMatrix: function setFromRotationMatrix(t) {
      var e,
          i = t.elements,
          n = i[0],
          s = i[4],
          o = i[8],
          r = i[1],
          a = i[5],
          l = i[9],
          h = i[2],
          u = i[6],
          c = i[10],
          d = n + a + c;return 0 < d ? (e = .5 / D(d + 1), this._w = .25 / e, this._x = (u - l) * e, this._y = (o - h) * e, this._z = (r - s) * e) : n > a && n > c ? (e = 2 * D(1 + n - a - c), this._w = (u - l) / e, this._x = .25 * e, this._y = (s + r) / e, this._z = (o + h) / e) : a > c ? (e = 2 * D(1 + a - n - c), this._w = (o - h) / e, this._x = (s + r) / e, this._y = .25 * e, this._z = (l + u) / e) : (e = 2 * D(1 + c - n - a), this._w = (r - s) / e, this._x = (o + h) / e, this._y = (l + u) / e, this._z = .25 * e), this._onChangeCallback(), this;
    }, setFromUnitVectors: function setFromUnitVectors(t, e) {
      var i = t.dot(e) + 1;return i < 1e-6 ? (i = 0, q(t.x) > q(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = i)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = i), this.normalize();
    }, rotateTowards: function rotateTowards(t, e) {
      var i = this.angleTo(t);if (0 === i) return this;var n = L(1, e / i);return this.slerp(t, n), this;
    }, inverse: function inverse() {
      return this.conjugate();
    }, conjugate: function conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }, dot: function dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }, lengthSq: function lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }, length: function length() {
      return D(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }, normalize: function normalize() {
      var t = this.length();return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x *= t, this._y *= t, this._z *= t, this._w *= t), this._onChangeCallback(), this;
    }, multiply: function multiply(t, e) {
      return void 0 === e ? this.multiplyQuaternions(this, t) : (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e));
    }, premultiply: function premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }, multiplyQuaternions: function multiplyQuaternions(t, e) {
      var i = t._x,
          n = t._y,
          s = t._z,
          o = t._w,
          r = e._x,
          a = e._y,
          l = e._z,
          h = e._w;return this._x = i * h + o * r + n * l - s * a, this._y = n * h + o * a + s * r - i * l, this._z = s * h + o * l + i * a - n * r, this._w = o * h - i * r - n * a - s * l, this._onChangeCallback(), this;
    }, slerp: function slerp(t, e) {
      if (0 === e) return this;if (1 === e) return this.copy(t);var i = this._x,
          n = this._y,
          s = this._z,
          o = this._w,
          r = o * t._w + i * t._x + n * t._y + s * t._z;if (0 > r ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, r = -r) : this.copy(t), 1 <= r) return this._w = o, this._x = i, this._y = n, this._z = s, this;var a = 1 - r * r;if (a <= j) {
        var l = 1 - e;return this._w = l * o + e * this._w, this._x = l * i + e * this._x, this._y = l * n + e * this._y, this._z = l * s + e * this._z, this.normalize(), this._onChangeCallback(), this;
      }var h = D(a),
          u = N(h, r),
          c = V((1 - e) * u) / h,
          d = V(e * u) / h;return this._w = o * c + this._w * d, this._x = i * c + this._x * d, this._y = n * c + this._y * d, this._z = s * c + this._z * d, this._onChangeCallback(), this;
    }, equals: function equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }, fromArray: function fromArray(t, e) {
      return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
    }, toArray: function toArray(t, e) {
      return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
    }, fromBufferAttribute: function fromBufferAttribute(t, e) {
      return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this;
    }, _onChange: function _onChange(t) {
      return this._onChangeCallback = t, this;
    }, _onChangeCallback: function _onChangeCallback() {} });for (var ht = [], ut = 0; 256 > ut; ut++) {
    ht[ut] = (16 > ut ? "0" : "") + ut.toString(16);
  }var ct = { DEG2RAD: H / 180, RAD2DEG: 180 / H, generateUUID: function generateUUID() {
      var t = 0 | 4294967295 * Math.random(),
          e = 0 | 4294967295 * Math.random(),
          i = 0 | 4294967295 * Math.random(),
          n = 0 | 4294967295 * Math.random();return (ht[255 & t] + ht[255 & t >> 8] + ht[255 & t >> 16] + ht[255 & t >> 24] + "-" + ht[255 & e] + ht[255 & e >> 8] + "-" + ht[64 | 15 & e >> 16] + ht[255 & e >> 24] + "-" + ht[128 | 63 & i] + ht[255 & i >> 8] + "-" + ht[255 & i >> 16] + ht[255 & i >> 24] + ht[255 & n] + ht[255 & n >> 8] + ht[255 & n >> 16] + ht[255 & n >> 24]).toUpperCase();
    }, clamp: function clamp(t, e, i) {
      return O(e, L(i, t));
    }, euclideanModulo: function euclideanModulo(t, e) {
      return (t % e + e) % e;
    }, mapLinear: function mapLinear(t, e, i, n, s) {
      return n + (t - e) * (s - n) / (i - e);
    }, lerp: function lerp(t, e, i) {
      return (1 - i) * t + i * e;
    }, smoothstep: function smoothstep(t, e, i) {
      return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e)) * t * (3 - 2 * t);
    }, smootherstep: function smootherstep(t, e, i) {
      return t <= e ? 0 : t >= i ? 1 : (t = (t - e) / (i - e)) * t * t * (t * (6 * t - 15) + 10);
    }, randInt: function randInt(t, e) {
      return t + Y(Math.random() * (e - t + 1));
    }, randFloat: function randFloat(t, e) {
      return t + Math.random() * (e - t);
    }, randFloatSpread: function randFloatSpread(t) {
      return t * (.5 - Math.random());
    }, degToRad: function degToRad(t) {
      return t * ct.DEG2RAD;
    }, radToDeg: function radToDeg(t) {
      return t * ct.RAD2DEG;
    }, isPowerOfTwo: function isPowerOfTwo(t) {
      return 0 == (t & t - 1) && 0 !== t;
    }, ceilPowerOfTwo: function ceilPowerOfTwo(t) {
      return I(2, P(F(t) / R));
    }, floorPowerOfTwo: function floorPowerOfTwo(t) {
      return I(2, Y(F(t) / R));
    }, setQuaternionFromProperEuler: function setQuaternionFromProperEuler(t, e, i, n, s) {
      var o = U,
          r = V,
          a = o(i / 2),
          l = r(i / 2),
          h = o((e + n) / 2),
          u = r((e + n) / 2),
          c = o((e - n) / 2),
          d = r((e - n) / 2),
          m = o((n - e) / 2),
          f = r((n - e) / 2);"XYX" === s ? t.set(a * u, l * c, l * d, a * h) : "YZY" === s ? t.set(l * d, a * u, l * c, a * h) : "ZXZ" === s ? t.set(l * c, l * d, a * u, a * h) : "XZX" === s ? t.set(a * u, l * f, l * m, a * h) : "YXY" === s ? t.set(l * m, a * u, l * f, a * h) : "ZYZ" === s ? t.set(l * f, l * m, a * u, a * h) : console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
    } },
      dt = new a(),
      mt = new r();_extends(a.prototype, { isVector3: !0, set: function set(t, e, i) {
      return this.x = t, this.y = e, this.z = i, this;
    }, setScalar: function setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this;
    }, setX: function setX(t) {
      return this.x = t, this;
    }, setY: function setY(t) {
      return this.y = t, this;
    }, setZ: function setZ(t) {
      return this.z = t, this;
    }, setComponent: function setComponent(t, e) {
      switch (t) {case 0:
          this.x = e;break;case 1:
          this.y = e;break;case 2:
          this.z = e;break;default:
          throw new Error("index is out of range: " + t);}return this;
    }, getComponent: function getComponent(t) {
      switch (t) {case 0:
          return this.x;case 1:
          return this.y;case 2:
          return this.z;default:
          throw new Error("index is out of range: " + t);}
    }, clone: function clone() {
      return new this.constructor(this.x, this.y, this.z);
    }, copy: function copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this;
    }, add: function add(t, e) {
      return void 0 === e ? (this.x += t.x, this.y += t.y, this.z += t.z, this) : (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e));
    }, addScalar: function addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this;
    }, addVectors: function addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
    }, addScaledVector: function addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
    }, sub: function sub(t, e) {
      return void 0 === e ? (this.x -= t.x, this.y -= t.y, this.z -= t.z, this) : (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e));
    }, subScalar: function subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this;
    }, subVectors: function subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
    }, multiply: function multiply(t, e) {
      return void 0 === e ? (this.x *= t.x, this.y *= t.y, this.z *= t.z, this) : (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e));
    }, multiplyScalar: function multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }, multiplyVectors: function multiplyVectors(t, e) {
      return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
    }, applyEuler: function applyEuler(t) {
      return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(mt.setFromEuler(t));
    }, applyAxisAngle: function applyAxisAngle(t, e) {
      return this.applyQuaternion(mt.setFromAxisAngle(t, e));
    }, applyMatrix3: function applyMatrix3(t) {
      var e = this.x,
          i = this.y,
          n = this.z,
          s = t.elements;return this.x = s[0] * e + s[3] * i + s[6] * n, this.y = s[1] * e + s[4] * i + s[7] * n, this.z = s[2] * e + s[5] * i + s[8] * n, this;
    }, applyNormalMatrix: function applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }, applyMatrix4: function applyMatrix4(t) {
      var e = this.x,
          i = this.y,
          n = this.z,
          s = t.elements,
          o = 1 / (s[3] * e + s[7] * i + s[11] * n + s[15]);return this.x = (s[0] * e + s[4] * i + s[8] * n + s[12]) * o, this.y = (s[1] * e + s[5] * i + s[9] * n + s[13]) * o, this.z = (s[2] * e + s[6] * i + s[10] * n + s[14]) * o, this;
    }, applyQuaternion: function applyQuaternion(t) {
      var e = this.x,
          i = this.y,
          n = this.z,
          s = t.x,
          o = t.y,
          r = t.z,
          a = t.w,
          l = a * e + o * n - r * i,
          h = a * i + r * e - s * n,
          u = a * n + s * i - o * e,
          c = -s * e - o * i - r * n;return this.x = l * a + c * -s + h * -r - u * -o, this.y = h * a + c * -o + u * -s - l * -r, this.z = u * a + c * -r + l * -o - h * -s, this;
    }, project: function project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }, unproject: function unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }, transformDirection: function transformDirection(t) {
      var e = this.x,
          i = this.y,
          n = this.z,
          s = t.elements;return this.x = s[0] * e + s[4] * i + s[8] * n, this.y = s[1] * e + s[5] * i + s[9] * n, this.z = s[2] * e + s[6] * i + s[10] * n, this.normalize();
    }, divide: function divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
    }, divideScalar: function divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }, min: function min(t) {
      return this.x = L(this.x, t.x), this.y = L(this.y, t.y), this.z = L(this.z, t.z), this;
    }, max: function max(t) {
      return this.x = O(this.x, t.x), this.y = O(this.y, t.y), this.z = O(this.z, t.z), this;
    }, clamp: function clamp(t, e) {
      return this.x = O(t.x, L(e.x, this.x)), this.y = O(t.y, L(e.y, this.y)), this.z = O(t.z, L(e.z, this.z)), this;
    }, clampScalar: function clampScalar(t, e) {
      return this.x = O(t, L(e, this.x)), this.y = O(t, L(e, this.y)), this.z = O(t, L(e, this.z)), this;
    }, clampLength: function clampLength(t, e) {
      var i = this.length();return this.divideScalar(i || 1).multiplyScalar(O(t, L(e, i)));
    }, floor: function floor() {
      return this.x = Y(this.x), this.y = Y(this.y), this.z = Y(this.z), this;
    }, ceil: function ceil() {
      return this.x = P(this.x), this.y = P(this.y), this.z = P(this.z), this;
    }, round: function round() {
      return this.x = Z(this.x), this.y = Z(this.y), this.z = Z(this.z), this;
    }, roundToZero: function roundToZero() {
      return this.x = 0 > this.x ? P(this.x) : Y(this.x), this.y = 0 > this.y ? P(this.y) : Y(this.y), this.z = 0 > this.z ? P(this.z) : Y(this.z), this;
    }, negate: function negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }, dot: function dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }, lengthSq: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }, length: function length() {
      return D(this.x * this.x + this.y * this.y + this.z * this.z);
    }, manhattanLength: function manhattanLength() {
      return q(this.x) + q(this.y) + q(this.z);
    }, normalize: function normalize() {
      return this.divideScalar(this.length() || 1);
    }, setLength: function setLength(t) {
      return this.normalize().multiplyScalar(t);
    }, lerp: function lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
    }, lerpVectors: function lerpVectors(t, e, i) {
      return this.subVectors(e, t).multiplyScalar(i).add(t);
    }, cross: function cross(t, e) {
      return void 0 === e ? this.crossVectors(this, t) : (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e));
    }, crossVectors: function crossVectors(t, e) {
      var i = t.x,
          n = t.y,
          s = t.z,
          o = e.x,
          r = e.y,
          a = e.z;return this.x = n * a - s * r, this.y = s * o - i * a, this.z = i * r - n * o, this;
    }, projectOnVector: function projectOnVector(t) {
      var e = t.lengthSq();if (0 === e) return this.set(0, 0, 0);var i = t.dot(this) / e;return this.copy(t).multiplyScalar(i);
    }, projectOnPlane: function projectOnPlane(t) {
      return dt.copy(this).projectOnVector(t), this.sub(dt);
    }, reflect: function reflect(t) {
      return this.sub(dt.copy(t).multiplyScalar(2 * this.dot(t)));
    }, angleTo: function angleTo(t) {
      var e = D(this.lengthSq() * t.lengthSq());if (0 === e) return H / 2;var i = this.dot(t) / e;return Math.acos(ct.clamp(i, -1, 1));
    }, distanceTo: function distanceTo(t) {
      return D(this.distanceToSquared(t));
    }, distanceToSquared: function distanceToSquared(t) {
      var e = this.x - t.x,
          i = this.y - t.y,
          n = this.z - t.z;return e * e + i * i + n * n;
    }, manhattanDistanceTo: function manhattanDistanceTo(t) {
      return q(this.x - t.x) + q(this.y - t.y) + q(this.z - t.z);
    }, setFromSpherical: function setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }, setFromSphericalCoords: function setFromSphericalCoords(t, e, i) {
      var n = V(e) * t;return this.x = n * V(i), this.y = U(e) * t, this.z = n * U(i), this;
    }, setFromCylindrical: function setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }, setFromCylindricalCoords: function setFromCylindricalCoords(t, e, i) {
      return this.x = t * V(e), this.y = i, this.z = t * U(e), this;
    }, setFromMatrixPosition: function setFromMatrixPosition(t) {
      var e = t.elements;return this.x = e[12], this.y = e[13], this.z = e[14], this;
    }, setFromMatrixScale: function setFromMatrixScale(t) {
      var e = this.setFromMatrixColumn(t, 0).length(),
          i = this.setFromMatrixColumn(t, 1).length(),
          n = this.setFromMatrixColumn(t, 2).length();return this.x = e, this.y = i, this.z = n, this;
    }, setFromMatrixColumn: function setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }, setFromMatrix3Column: function setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }, equals: function equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }, fromArray: function fromArray(t, e) {
      return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
    }, toArray: function toArray(t, e) {
      return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
    }, fromBufferAttribute: function fromBufferAttribute(t, e, i) {
      return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
    }, random: function random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    } });var ft = new a(),
      pt = new l(),
      gt = new a(0, 0, 0),
      yt = new a(1, 1, 1),
      bt = new a(),
      _t = new a(),
      wt = new a();_extends(l.prototype, { isMatrix4: !0, set: function set(t, e, i, n, s, o, r, a, l, h, u, c, d, m, f, p) {
      var g = this.elements;return g[0] = t, g[4] = e, g[8] = i, g[12] = n, g[1] = s, g[5] = o, g[9] = r, g[13] = a, g[2] = l, g[6] = h, g[10] = u, g[14] = c, g[3] = d, g[7] = m, g[11] = f, g[15] = p, this;
    }, identity: function identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }, clone: function clone() {
      return new l().fromArray(this.elements);
    }, copy: function copy(t) {
      var e = this.elements,
          i = t.elements;return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], e[9] = i[9], e[10] = i[10], e[11] = i[11], e[12] = i[12], e[13] = i[13], e[14] = i[14], e[15] = i[15], this;
    }, copyPosition: function copyPosition(t) {
      var e = this.elements,
          i = t.elements;return e[12] = i[12], e[13] = i[13], e[14] = i[14], this;
    }, extractBasis: function extractBasis(t, e, i) {
      return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this;
    }, makeBasis: function makeBasis(t, e, i) {
      return this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1), this;
    }, extractRotation: function extractRotation(t) {
      var e = this.elements,
          i = t.elements,
          n = 1 / ft.setFromMatrixColumn(t, 0).length(),
          s = 1 / ft.setFromMatrixColumn(t, 1).length(),
          o = 1 / ft.setFromMatrixColumn(t, 2).length();return e[0] = i[0] * n, e[1] = i[1] * n, e[2] = i[2] * n, e[3] = 0, e[4] = i[4] * s, e[5] = i[5] * s, e[6] = i[6] * s, e[7] = 0, e[8] = i[8] * o, e[9] = i[9] * o, e[10] = i[10] * o, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }, makeRotationFromEuler: function makeRotationFromEuler(t) {
      t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var e = this.elements,
          i = t.x,
          n = t.y,
          s = t.z,
          o = U(i),
          r = V(i),
          a = U(n),
          l = V(n),
          h = U(s),
          u = V(s);if ("XYZ" === t.order) {
        var c = o * h,
            d = o * u,
            m = r * h,
            f = r * u;e[0] = a * h, e[4] = -a * u, e[8] = l, e[1] = d + m * l, e[5] = c - f * l, e[9] = -r * a, e[2] = f - c * l, e[6] = m + d * l, e[10] = o * a;
      } else if ("YXZ" === t.order) {
        var p = a * h,
            g = a * u,
            y = l * h,
            b = l * u;e[0] = p + b * r, e[4] = y * r - g, e[8] = o * l, e[1] = o * u, e[5] = o * h, e[9] = -r, e[2] = g * r - y, e[6] = b + p * r, e[10] = o * a;
      } else if ("ZXY" === t.order) {
        p = a * h, g = a * u, y = l * h, b = l * u;e[0] = p - b * r, e[4] = -o * u, e[8] = y + g * r, e[1] = g + y * r, e[5] = o * h, e[9] = b - p * r, e[2] = -o * l, e[6] = r, e[10] = o * a;
      } else if ("ZYX" === t.order) {
        c = o * h, d = o * u, m = r * h, f = r * u;e[0] = a * h, e[4] = m * l - d, e[8] = c * l + f, e[1] = a * u, e[5] = f * l + c, e[9] = d * l - m, e[2] = -l, e[6] = r * a, e[10] = o * a;
      } else if ("YZX" === t.order) {
        var _ = o * a,
            w = o * l,
            v = r * a,
            x = r * l;e[0] = a * h, e[4] = x - _ * u, e[8] = v * u + w, e[1] = u, e[5] = o * h, e[9] = -r * h, e[2] = -l * h, e[6] = w * u + v, e[10] = _ - x * u;
      } else if ("XZY" === t.order) {
        _ = o * a, w = o * l, v = r * a, x = r * l;e[0] = a * h, e[4] = -u, e[8] = l * h, e[1] = _ * u + x, e[5] = o * h, e[9] = w * u - v, e[2] = v * u - w, e[6] = r * h, e[10] = x * u + _;
      }return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }, makeRotationFromQuaternion: function makeRotationFromQuaternion(t) {
      return this.compose(gt, t, yt);
    }, lookAt: function lookAt(t, e, i) {
      var n = this.elements;return wt.subVectors(t, e), 0 === wt.lengthSq() && (wt.z = 1), wt.normalize(), bt.crossVectors(i, wt), 0 === bt.lengthSq() && (1 === q(i.z) ? wt.x += 1e-4 : wt.z += 1e-4, wt.normalize(), bt.crossVectors(i, wt)), bt.normalize(), _t.crossVectors(wt, bt), n[0] = bt.x, n[4] = _t.x, n[8] = wt.x, n[1] = bt.y, n[5] = _t.y, n[9] = wt.y, n[2] = bt.z, n[6] = _t.z, n[10] = wt.z, this;
    }, multiply: function multiply(t, e) {
      return void 0 === e ? this.multiplyMatrices(this, t) : (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e));
    }, premultiply: function premultiply(t) {
      return this.multiplyMatrices(t, this);
    }, multiplyMatrices: function multiplyMatrices(t, e) {
      var i = t.elements,
          n = e.elements,
          s = this.elements,
          o = i[0],
          r = i[4],
          a = i[8],
          l = i[12],
          h = i[1],
          u = i[5],
          c = i[9],
          d = i[13],
          m = i[2],
          f = i[6],
          p = i[10],
          g = i[14],
          y = i[3],
          b = i[7],
          _ = i[11],
          w = i[15],
          v = n[0],
          x = n[4],
          M = n[8],
          k = n[12],
          E = n[1],
          C = n[5],
          z = n[9],
          S = n[13],
          A = n[2],
          T = n[6],
          B = n[10],
          I = n[14],
          P = n[3],
          R = n[7],
          F = n[11],
          O = n[15];return s[0] = o * v + r * E + a * A + l * P, s[4] = o * x + r * C + a * T + l * R, s[8] = o * M + r * z + a * B + l * F, s[12] = o * k + r * S + a * I + l * O, s[1] = h * v + u * E + c * A + d * P, s[5] = h * x + u * C + c * T + d * R, s[9] = h * M + u * z + c * B + d * F, s[13] = h * k + u * S + c * I + d * O, s[2] = m * v + f * E + p * A + g * P, s[6] = m * x + f * C + p * T + g * R, s[10] = m * M + f * z + p * B + g * F, s[14] = m * k + f * S + p * I + g * O, s[3] = y * v + b * E + _ * A + w * P, s[7] = y * x + b * C + _ * T + w * R, s[11] = y * M + b * z + _ * B + w * F, s[15] = y * k + b * S + _ * I + w * O, this;
    }, multiplyScalar: function multiplyScalar(t) {
      var e = this.elements;return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
    }, determinant: function determinant() {
      var t = this.elements,
          e = t[0],
          i = t[4],
          n = t[8],
          s = t[12],
          o = t[1],
          r = t[5],
          a = t[9],
          l = t[13],
          h = t[2],
          u = t[6],
          c = t[10],
          d = t[14];return t[3] * (+s * a * u - n * l * u - s * r * c + i * l * c + n * r * d - i * a * d) + t[7] * (+e * a * d - e * l * c + s * o * c - n * o * d + n * l * h - s * a * h) + t[11] * (+e * l * u - e * r * d - s * o * u + i * o * d + s * r * h - i * l * h) + t[15] * (-n * r * h - e * a * u + e * r * c + n * o * u - i * o * c + i * a * h);
    }, transpose: function transpose() {
      var t,
          e = this.elements;return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
    }, setPosition: function setPosition(t, e, i) {
      var n = this.elements;return t.isVector3 ? (n[12] = t.x, n[13] = t.y, n[14] = t.z) : (n[12] = t, n[13] = e, n[14] = i), this;
    }, getInverse: function getInverse(t, e) {
      void 0 !== e && console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");var i = this.elements,
          n = t.elements,
          s = n[0],
          o = n[1],
          r = n[2],
          a = n[3],
          l = n[4],
          h = n[5],
          u = n[6],
          c = n[7],
          d = n[8],
          m = n[9],
          f = n[10],
          p = n[11],
          g = n[12],
          y = n[13],
          b = n[14],
          _ = n[15],
          w = m * b * c - y * f * c + y * u * p - h * b * p - m * u * _ + h * f * _,
          v = g * f * c - d * b * c - g * u * p + l * b * p + d * u * _ - l * f * _,
          x = d * y * c - g * m * c + g * h * p - l * y * p - d * h * _ + l * m * _,
          M = g * m * u - d * y * u - g * h * f + l * y * f + d * h * b - l * m * b,
          k = s * w + o * v + r * x + a * M;if (0 == k) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);var E = 1 / k;return i[0] = w * E, i[1] = (y * f * a - m * b * a - y * r * p + o * b * p + m * r * _ - o * f * _) * E, i[2] = (h * b * a - y * u * a + y * r * c - o * b * c - h * r * _ + o * u * _) * E, i[3] = (m * u * a - h * f * a - m * r * c + o * f * c + h * r * p - o * u * p) * E, i[4] = v * E, i[5] = (d * b * a - g * f * a + g * r * p - s * b * p - d * r * _ + s * f * _) * E, i[6] = (g * u * a - l * b * a - g * r * c + s * b * c + l * r * _ - s * u * _) * E, i[7] = (l * f * a - d * u * a + d * r * c - s * f * c - l * r * p + s * u * p) * E, i[8] = x * E, i[9] = (g * m * a - d * y * a - g * o * p + s * y * p + d * o * _ - s * m * _) * E, i[10] = (l * y * a - g * h * a + g * o * c - s * y * c - l * o * _ + s * h * _) * E, i[11] = (d * h * a - l * m * a - d * o * c + s * m * c + l * o * p - s * h * p) * E, i[12] = M * E, i[13] = (d * y * r - g * m * r + g * o * f - s * y * f - d * o * b + s * m * b) * E, i[14] = (g * h * r - l * y * r - g * o * u + s * y * u + l * o * b - s * h * b) * E, i[15] = (l * m * r - d * h * r + d * o * u - s * m * u - l * o * f + s * h * f) * E, this;
    }, scale: function scale(t) {
      var e = this.elements,
          i = t.x,
          n = t.y,
          s = t.z;return e[0] *= i, e[4] *= n, e[8] *= s, e[1] *= i, e[5] *= n, e[9] *= s, e[2] *= i, e[6] *= n, e[10] *= s, e[3] *= i, e[7] *= n, e[11] *= s, this;
    }, getMaxScaleOnAxis: function getMaxScaleOnAxis() {
      var t = this.elements,
          e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
          i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
          n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];return D(O(e, i, n));
    }, makeTranslation: function makeTranslation(t, e, i) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1), this;
    }, makeRotationX: function makeRotationX(t) {
      var e = U(t),
          i = V(t);return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this;
    }, makeRotationY: function makeRotationY(t) {
      var e = U(t),
          i = V(t);return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this;
    }, makeRotationZ: function makeRotationZ(t) {
      var e = U(t),
          i = V(t);return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }, makeRotationAxis: function makeRotationAxis(t, e) {
      var i = U(e),
          n = V(e),
          s = 1 - i,
          o = t.x,
          r = t.y,
          a = t.z,
          l = s * o,
          h = s * r;return this.set(l * o + i, l * r - n * a, l * a + n * r, 0, l * r + n * a, h * r + i, h * a - n * o, 0, l * a - n * r, h * a + n * o, s * a * a + i, 0, 0, 0, 0, 1), this;
    }, makeScale: function makeScale(t, e, i) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
    }, makeShear: function makeShear(t, e, i) {
      return this.set(1, e, i, 0, t, 1, i, 0, t, e, 1, 0, 0, 0, 0, 1), this;
    }, compose: function compose(t, e, i) {
      var n = this.elements,
          s = e._x,
          o = e._y,
          r = e._z,
          a = e._w,
          l = s + s,
          h = o + o,
          u = r + r,
          c = s * l,
          d = s * h,
          m = s * u,
          f = o * h,
          p = o * u,
          g = r * u,
          y = a * l,
          b = a * h,
          _ = a * u,
          w = i.x,
          v = i.y,
          x = i.z;return n[0] = (1 - (f + g)) * w, n[1] = (d + _) * w, n[2] = (m - b) * w, n[3] = 0, n[4] = (d - _) * v, n[5] = (1 - (c + g)) * v, n[6] = (p + y) * v, n[7] = 0, n[8] = (m + b) * x, n[9] = (p - y) * x, n[10] = (1 - (c + f)) * x, n[11] = 0, n[12] = t.x, n[13] = t.y, n[14] = t.z, n[15] = 1, this;
    }, decompose: function decompose(t, e, i) {
      var n = this.elements,
          s = ft.set(n[0], n[1], n[2]).length(),
          o = ft.set(n[4], n[5], n[6]).length(),
          r = ft.set(n[8], n[9], n[10]).length();0 > this.determinant() && (s = -s), t.x = n[12], t.y = n[13], t.z = n[14], pt.copy(this);var a = 1 / s,
          l = 1 / o,
          h = 1 / r;return pt.elements[0] *= a, pt.elements[1] *= a, pt.elements[2] *= a, pt.elements[4] *= l, pt.elements[5] *= l, pt.elements[6] *= l, pt.elements[8] *= h, pt.elements[9] *= h, pt.elements[10] *= h, e.setFromRotationMatrix(pt), i.x = s, i.y = o, i.z = r, this;
    }, makePerspective: function makePerspective(t, e, i, n, s, o) {
      void 0 === o && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var r = this.elements;return r[0] = 2 * s / (e - t), r[4] = 0, r[8] = (e + t) / (e - t), r[12] = 0, r[1] = 0, r[5] = 2 * s / (i - n), r[9] = (i + n) / (i - n), r[13] = 0, r[2] = 0, r[6] = 0, r[10] = -(o + s) / (o - s), r[14] = -2 * o * s / (o - s), r[3] = 0, r[7] = 0, r[11] = -1, r[15] = 0, this;
    }, makeOrthographic: function makeOrthographic(t, e, i, n, s, o) {
      var r = this.elements,
          a = 1 / (e - t),
          l = 1 / (i - n),
          h = 1 / (o - s);return r[0] = 2 * a, r[4] = 0, r[8] = 0, r[12] = -(e + t) * a, r[1] = 0, r[5] = 2 * l, r[9] = 0, r[13] = -(i + n) * l, r[2] = 0, r[6] = 0, r[10] = -2 * h, r[14] = -(o + s) * h, r[3] = 0, r[7] = 0, r[11] = 0, r[15] = 1, this;
    }, equals: function equals(t) {
      for (var e = this.elements, i = t.elements, n = 0; 16 > n; n++) {
        if (e[n] !== i[n]) return !1;
      }return !0;
    }, fromArray: function fromArray(t, e) {
      void 0 === e && (e = 0);for (var i = 0; 16 > i; i++) {
        this.elements[i] = t[i + e];
      }return this;
    }, toArray: function toArray(t, e) {
      void 0 === t && (t = []), void 0 === e && (e = 0);var i = this.elements;return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t[e + 9] = i[9], t[e + 10] = i[10], t[e + 11] = i[11], t[e + 12] = i[12], t[e + 13] = i[13], t[e + 14] = i[14], t[e + 15] = i[15], t;
    } });var vt = new l(),
      xt = new r();h.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], h.DefaultOrder = "XYZ", Object.defineProperties(h.prototype, { x: { get: function get() {
        return this._x;
      }, set: function set(t) {
        this._x = t, this._onChangeCallback();
      } }, y: { get: function get() {
        return this._y;
      }, set: function set(t) {
        this._y = t, this._onChangeCallback();
      } }, z: { get: function get() {
        return this._z;
      }, set: function set(t) {
        this._z = t, this._onChangeCallback();
      } }, order: { get: function get() {
        return this._order;
      }, set: function set(t) {
        this._order = t, this._onChangeCallback();
      } } }), _extends(h.prototype, { isEuler: !0, set: function set(t, e, i, n) {
      return this._x = t, this._y = e, this._z = i, this._order = n || this._order, this._onChangeCallback(), this;
    }, clone: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }, copy: function copy(t) {
      return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
    }, setFromRotationMatrix: function setFromRotationMatrix(t, e, i) {
      var n = Math.asin,
          s = ct.clamp,
          o = t.elements,
          r = o[0],
          a = o[4],
          l = o[8],
          h = o[1],
          u = o[5],
          c = o[9],
          d = o[2],
          m = o[6],
          f = o[10];return "XYZ" === (e = e || this._order) ? (this._y = n(s(l, -1, 1)), .9999999 > q(l) ? (this._x = N(-c, f), this._z = N(-a, r)) : (this._x = N(m, u), this._z = 0)) : "YXZ" === e ? (this._x = n(-s(c, -1, 1)), .9999999 > q(c) ? (this._y = N(l, f), this._z = N(h, u)) : (this._y = N(-d, r), this._z = 0)) : "ZXY" === e ? (this._x = n(s(m, -1, 1)), .9999999 > q(m) ? (this._y = N(-d, f), this._z = N(-a, u)) : (this._y = 0, this._z = N(h, r))) : "ZYX" === e ? (this._y = n(-s(d, -1, 1)), .9999999 > q(d) ? (this._x = N(m, f), this._z = N(h, r)) : (this._x = 0, this._z = N(-a, u))) : "YZX" === e ? (this._z = n(s(h, -1, 1)), .9999999 > q(h) ? (this._x = N(-c, u), this._y = N(-d, r)) : (this._x = 0, this._y = N(l, f))) : "XZY" === e ? (this._z = n(-s(a, -1, 1)), .9999999 > q(a) ? (this._x = N(m, u), this._y = N(l, r)) : (this._x = N(-c, f), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e), this._order = e, !1 !== i && this._onChangeCallback(), this;
    }, setFromQuaternion: function setFromQuaternion(t, e, i) {
      return vt.makeRotationFromQuaternion(t), this.setFromRotationMatrix(vt, e, i);
    }, setFromVector3: function setFromVector3(t, e) {
      return this.set(t.x, t.y, t.z, e || this._order);
    }, reorder: function reorder(t) {
      return xt.setFromEuler(this), this.setFromQuaternion(xt, t);
    }, equals: function equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }, fromArray: function fromArray(t) {
      return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this._onChangeCallback(), this;
    }, toArray: function toArray(t, e) {
      return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
    }, toVector3: function toVector3(t) {
      return t ? t.set(this._x, this._y, this._z) : new a(this._x, this._y, this._z);
    }, _onChange: function _onChange(t) {
      return this._onChangeCallback = t, this;
    }, _onChangeCallback: function _onChangeCallback() {} });
  var Mt = function () {
    function Mt(t) {
      var _this14 = this;

      _classCallCheck(this, Mt);

      this.openAudioMc = t, t.socketModule.registerHandler("ClientCreateMediaPayload", function (e) {
        var i = e.media.loop,
            n = e.media.startInstant,
            s = e.media.mediaId,
            o = e.media.source,
            r = e.media.doPickup,
            a = e.media.fadeTime,
            l = e.distance,
            h = e.media.flag,
            u = e.maxDistance;t.getMediaManager().destroySounds(s, !1, !0);var c = new K(s),
            d = new lt(o);d.openAudioMc = t, d.setOa(t), r && d.startDate(n, !0), d.finalize().then(function () {
          if (r && d.startDate(n, !0), t.getMediaManager().mixer.addChannel(c), c.addSound(d), c.setChannelVolume(0), d.setLooping(i), c.setTag(s), 0 !== u) {
            var _t18 = _this14.convertDistanceToVolume(u, l);c.setTag("SPECIAL"), c.maxDistance = u, c.fadeChannel(_t18, a);
          } else c.setTag("DEFAULT"), setTimeout(function () {
            0 === a ? (c.setChannelVolume(100), c.updateFromMasterVolume()) : (c.updateFromMasterVolume(), c.fadeChannel(100, a));
          }, 1);c.setTag(h), t.getMediaManager().mixer.updateCurrent(), d.finish();
        });
      }), t.socketModule.registerHandler("ClientDestroyCardPayload", function () {
        document.getElementById("card-panel").style.display = "none";
      }), t.socketModule.registerHandler("ClientUpdateCardPayload", function (t) {
        var e = JSON.parse(t.serializedCard);new ot().replaceWithJson(t.id, e);
      }), t.socketModule.registerHandler("ClientCreateCardPayload", function (t) {
        var e = JSON.parse(t.serializedCard);new ot(e);
      }), t.socketModule.registerHandler("NotificationPayload", function (t) {
        var e = t.message;_this14.openAudioMc.notificationModule.sendNotification(t.title, e), new et("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(t.title + "<hr />" + e);
      }), t.socketModule.registerHandler("ClientSettingsPayload", function (e) {
        _this14.openAudioMc.debugPrint("Updating settings...");var i = e.clientSettings,
            n = i.background,
            s = i.title,
            o = i.welcomeMessage,
            r = i.errorMessage,
            a = i.hueConnected,
            l = i.hueLinking,
            h = i.hueBridgeFound;"default" !== a && (t.getMessages().hueConnected = a), "default" !== l && (t.getMessages().hueLinking = l), "default" !== h && (t.getMessages().hueWelcome = h), "default" !== r && (t.getMessages().errorMessage = r), "default" !== o && (t.getMessages().welcomeMessage = o), "default" !== n && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + n + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== s && (document.title = s), t.getMessages().apply();
      }), t.socketModule.registerHandler("ClientVersionPayload", function (e) {
        parseInt(e.protocolRevision), console.log("[OpenAudioMc] Received PROTOCOL revision update"), function () {
          return 2;
        } && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), t.socketModule.callbacksEnabled = !0);
      }), t.socketModule.registerHandler("ClientVolumePayload", function (t) {
        var e = t.volume;_this14.openAudioMc.getMediaManager().setMasterVolume(e), document.getElementById("volume-slider").value = e;
      }), t.socketModule.registerHandler("ClientDestroyMediaPayload", function (t) {
        _this14.openAudioMc.getMediaManager().destroySounds(t.soundId, t.all);
      }), t.socketModule.registerHandler("HueColorPayload", function (e) {
        var i = e.lights,
            n = e.hueColor,
            s = "rgba(" + n.r + "," + n.g + "," + n.b + "," + function (t, e, i) {
          return (t - e[0]) * (i[1] - i[0]) / (e[1] - e[0]) + i[0];
        }(n.bir, [0, 255], [0, 1]) + ")";t.getHueModule().isLinked && t.getHueModule().setLight(i, s);
      }), t.socketModule.registerHandler("ClientUpdateMediaPayload", function (e) {
        var i = e.mediaOptions.target,
            n = e.mediaOptions.fadeTime,
            s = e.mediaOptions.distance;var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = t.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var _e8 = _step16.value;
            _e8.hasTag(i) && _e8.fadeChannel(_this14.convertDistanceToVolume(_e8.maxDistance, s), n);
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
      }), t.socketModule.registerHandler("ClientPlayerLocationPayload", function (t) {
        var e = t.x,
            i = t.y,
            n = t.z,
            s = t.pitch,
            o = new h(t.yaw, s, 0, "XYZ"),
            l = new r();l.setFromEuler(o);var u = new a(e, i, n);u.applyQuaternion(l), console.log(u);
      });
    }

    Mt.prototype.convertDistanceToVolume = function convertDistanceToVolume(t, e) {
      return Z((t - e) / t * 100);
    };

    return Mt;
  }();

  var kt = function () {
    function kt() {
      var _this15 = this;

      _classCallCheck(this, kt);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (t) {
        t.onchange = function () {
          _this15.select();
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
      var _this16 = this;

      this.state.forEach(function (t) {
        _this16.getInputById(t.bulb).selectedIndex = t.selectedIndex;
      });
    };

    kt.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (t) {
        _this17.state.push(_this17.obtainSelection(t));
      }), Cookies.set("hue-state", this.state);
    };

    kt.prototype.obtainSelection = function obtainSelection(t) {
      var e = t.dataset.bulb,
          i = t.options[t.selectedIndex].dataset.light;return { selectedIndex: t.selectedIndex, bulb: e, value: i };
    };

    kt.prototype.getBulbStateById = function getBulbStateById(t) {
      return this.state.forEach(function (e) {
        if (e.id == t) return e;
      }), -1;
    };

    kt.prototype.getInputById = function getInputById(t) {
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = this.dropdowns[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var e = _step17.value;
          if (e.dataset.bulb == t) return e;
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

  var Et = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (t) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (Et.arrayBuffer) var Ct = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      zt = ArrayBuffer.isView || function (t) {
    return t && -1 < Ct.indexOf(Object.prototype.toString.call(t));
  };m.prototype.append = function (t, e) {
    t = u(t), e = c(e);var i = this.map[t];this.map[t] = i ? i + ", " + e : e;
  }, m.prototype.delete = function (t) {
    delete this.map[u(t)];
  }, m.prototype.get = function (t) {
    return t = u(t), this.has(t) ? this.map[t] : null;
  }, m.prototype.has = function (t) {
    return this.map.hasOwnProperty(u(t));
  }, m.prototype.set = function (t, e) {
    this.map[u(t)] = c(e);
  }, m.prototype.forEach = function (t, e) {
    for (var i in this.map) {
      this.map.hasOwnProperty(i) && t.call(e, this.map[i], i, this);
    }
  }, m.prototype.keys = function () {
    var t = [];return this.forEach(function (e, i) {
      t.push(i);
    }), d(t);
  }, m.prototype.values = function () {
    var t = [];return this.forEach(function (e) {
      t.push(e);
    }), d(t);
  }, m.prototype.entries = function () {
    var t = [];return this.forEach(function (e, i) {
      t.push([i, e]);
    }), d(t);
  }, Et.iterable && (m.prototype[Symbol.iterator] = m.prototype.entries);var St = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];_.prototype.clone = function () {
    return new _(this, { body: this._bodyInit });
  }, b.call(_.prototype), b.call(x.prototype), x.prototype.clone = function () {
    return new x(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new m(this.headers), url: this.url });
  }, x.error = function () {
    var t = new x(null, { status: 0, statusText: "" });return t.type = "error", t;
  };var At = [301, 302, 303, 307, 308];x.redirect = function (t, e) {
    if (-1 === At.indexOf(e)) throw new RangeError("Invalid status code");return new x(null, { status: e, headers: { location: t } });
  };var Tt = self.DOMException;try {
    new Tt();
  } catch (e) {
    (Tt = function Tt(t, e) {
      this.message = t, this.name = e;var i = Error(t);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), Tt.prototype.constructor = Tt;
  }M.polyfill = !0, self.fetch || (self.fetch = M, self.Headers = m, self.Request = _, self.Response = x);
  var Bt = function () {
    function Bt(t) {
      _classCallCheck(this, Bt);

      this.host = t;
    }

    Bt.prototype.route = function route(t) {
      var _this18 = this;

      return new Promise(function (e, i) {
        _this18.tokenSet = new rt().fromUrl(window.location.href), M(_this18.host + "/api/v1/client/login/" + _this18.tokenSet.publicServerKey).then(function (n) {
          n.json().then(function (n) {
            if (null == n.errors || 0 != n.errors.length) return i(n.errors), void console.log(n.errors);var s = n.response,
                r = s.secureEndpoint;null == r && (r = s.insecureEndpoint), console.log("[OpenAudioMc] accepting and applying settings"), t.debugPrint("Updating settings...");var a = s.backgroundImage,
                l = s.title,
                h = s.clientWelcomeMessage,
                u = s.clientErrorMessage;var c = "";o(u).childNodes.forEach(function (t) {
              c += t.outerHTML;
            });var d = "";o(h).childNodes.forEach(function (t) {
              d += t.outerHTML;
            }), "" !== u && (t.getMessages().errorMessage = c), "" !== h && (t.getMessages().welcomeMessage = d);var m = s.greetingMessage;if (m = m.replace("%name", t.tokenSet.name), document.getElementById("welcome-text-landing").innerHTML = m, document.getElementById("boot-button").style.display = "", document.getElementById("boot-button").innerHTML = s.connectButtonText, t.getUserInterfaceModule().changeColor("#304FFE", s.accentColor), "" != s.startSound) {
              var _e9 = new K("startsound"),
                  _i5 = new lt(s.startSound);_i5.openAudioMc = t, _i5.setOa(t), _i5.finalize().then(function () {
                t.getMediaManager().mixer.addChannel(_e9), _e9.addSound(_i5), _e9.setChannelVolume(100), _e9.updateFromMasterVolume(), _i5.finish();
              });
            }"default" !== l && (document.title = l), e({ host: r, background: a });
          }).catch(function (t) {
            console.log("Dead end 1"), i(t);
          });
        }).catch(function (t) {
          console.log("Dead end 2"), i(t);
        });
      });
    };

    return Bt;
  }();

  var It = function (_et) {
    _inherits(It, _et);

    function It(t, e, i) {
      var _this19;

      _classCallCheck(this, It);

      (_this19 = _possibleConstructorReturn(this, _et.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this19), _this19.room = t, _this19.username = e, _this19.isMuted = !1, _this19.member = i;var n = '<img class="call-box" src="https://minotar.net/avatar/' + e + '" />';n += '<div class="call-content" id="user-box-content-' + e + '">', n += '<div style="text-align: center;"><p>(loading)</p></div>', n += "</div>", _this19.show(n, !0), _this19.setUsernameAsContent(), document.getElementById("user-box-content-" + _this19.username).onmouseenter = function () {
        _this19.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onmouseout = function () {
        _this19.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onclick = function () {
        _this19.room.main.tokenSet.name !== _this19.username && _this19.onClickHandler();
      };return _this19;
    }

    It.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    It.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    It.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return It;
  }(et);

  k.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, k.prototype.compileInterpolationFunction = function () {
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
  }, k.prototype.bypassResampler = function (t) {
    return this.noReturn ? (this.outputBuffer = t, t.length) : t;
  }, k.prototype.bufferSlice = function (t) {
    if (this.noReturn) return t;try {
      return this.outputBuffer.subarray(0, t);
    } catch (e) {
      try {
        return this.outputBuffer.length = t, this.outputBuffer;
      } catch (e) {
        return this.outputBuffer.slice(0, t);
      }
    }
  }, k.prototype.initializeBuffers = function () {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
    } catch (t) {
      this.outputBuffer = [], this.lastOutput = [];
    }
  }, E.prototype.MOZWriteAudio = function (t) {
    this.MOZWriteAudioNoCallback(t), this.MOZExecuteCallback();
  }, E.prototype.MOZWriteAudioNoCallback = function (t) {
    this.writeMozAudio(t);
  }, E.prototype.callbackBasedWriteAudio = function (t) {
    this.callbackBasedWriteAudioNoCallback(t), this.callbackBasedExecuteCallback();
  }, E.prototype.callbackBasedWriteAudioNoCallback = function (t) {
    if (t) for (var e = t.length, i = 0; i < e && Zt < Vt;) {
      Ht[Zt++] = t[i++];
    }
  }, E.prototype.writeAudio = function (t) {
    0 == this.audioType ? this.MOZWriteAudio(t) : 1 == this.audioType ? this.callbackBasedWriteAudio(t) : 2 == this.audioType && (this.checkFlashInit() || Ot ? this.callbackBasedWriteAudio(t) : this.mozAudioFound && this.MOZWriteAudio(t));
  }, E.prototype.writeAudioNoCallback = function (t) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(t) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(t) : 2 == this.audioType && (this.checkFlashInit() || Ot ? this.callbackBasedWriteAudioNoCallback(t) : this.mozAudioFound && this.MOZWriteAudioNoCallback(t));
  }, E.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (T() * qt.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Zt;if (2 == this.audioType) {
      if (this.checkFlashInit() || Ot) return (T() * qt.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Zt;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, E.prototype.MOZExecuteCallback = function () {
    var t = Ut - this.remainingBuffer();0 < t && this.writeMozAudio(this.underRunCallback(t));
  }, E.prototype.callbackBasedExecuteCallback = function () {
    var t = Ut - this.remainingBuffer();0 < t && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(t));
  }, E.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || Ot ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
  }, E.prototype.initializeAudio = function () {
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
  }, E.prototype.preInitializeMozAudio = function () {
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, Dt), this.samplesAlreadyWritten = 0;var t = 2 == this.audioChannels ? [0, 0] : [0],
        e = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        e += this.audioHandleMoz.mozWriteAudio(t);
      }for (var i = e / this.audioChannels, n = 0; n < i; n++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(t);
      }
    }this.samplesAlreadyWritten += e, Ut += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, E.prototype.initializeMozAudio = function () {
    this.writeMozAudio(C(Ut)), this.audioType = 0;
  }, E.prototype.initializeWebAudio = function () {
    if (!Ot) throw new Error("");B(Nt), this.audioType = 1;
  }, E.prototype.initializeFlashAudio = function () {
    var t = document.getElementById("XAudioJS");if (null == t) {
      var e = this,
          i = document.createElement("div");i.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var n = document.createElement("div");n.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), n.setAttribute("id", "XAudioJS"), i.appendChild(n), document.getElementsByTagName("body")[0].appendChild(i), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (t) {
        t.success ? e.audioHandleFlash = t.ref : e.audioType = 1;
      });
    } else this.audioHandleFlash = t;this.audioType = 2;
  }, E.prototype.writeMozAudio = function (t) {
    if (t) {
      var e = this.mozAudioTail.length;if (0 < e) {
        var i = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += i, this.mozAudioTail.splice(0, i);
      }e = L(t.length, Vt - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(t);this.samplesAlreadyWritten += i;for (var n = 0; e > i; --e) {
        this.mozAudioTail.push(t[n++]);
      }
    }
  }, E.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, Wt), B(44100)), this.flashInitialized;
  };var Pt,
      Rt,
      Ft = 2048,
      Ot = !1,
      Ht = [],
      Lt = [],
      Ut = 15e3,
      Vt = 25e3,
      Nt = 44100,
      Dt = 0,
      jt = !1,
      Wt = 0,
      qt = null,
      Zt = 0,
      Yt = 0,
      Xt = 0,
      Qt = 2,
      Gt = k;!function (t) {
    t[t.VoIP = 2048] = "VoIP", t[t.Audio = 2049] = "Audio", t[t.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(Pt || (Pt = {})), function (t) {
    t[t.OK = 0] = "OK", t[t.BadArgument = -1] = "BadArgument", t[t.BufferTooSmall = -2] = "BufferTooSmall", t[t.InternalError = -3] = "InternalError", t[t.InvalidPacket = -4] = "InvalidPacket", t[t.Unimplemented = -5] = "Unimplemented", t[t.InvalidState = -6] = "InvalidState", t[t.AllocFail = -7] = "AllocFail";
  }(Rt || (Rt = {}));var Jt = function () {
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
      Kt = function () {
    function t(t, e, i, n) {
      if (void 0 === n && (n = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !Jt.validFrameDuration(n)) throw "invalid frame duration";this.frame_size = t * n / 1e3;var s = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(t, e, i, s), 0 != getValue(s, "i32")) throw "opus_encoder_create failed: " + getValue(s, "i32");this.in_ptr = _malloc(this.frame_size * e * 4), this.in_len = this.frame_size * e, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = Jt.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return t.prototype.encode = function (t) {
      for (var e = [], i = 0; t.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_i16.set(t.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(t.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var s = new ArrayBuffer(n);new Uint8Array(s).set(this.out_buf.subarray(0, n)), e.push(s);
      }return i < t.length && (this.in_i16.set(t.subarray(i)), this.in_off = t.length - i), e;
    }, t.prototype.encode_float = function (t) {
      for (var e = [], i = 0; t.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_f32.set(t.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(t.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var s = new ArrayBuffer(n);new Uint8Array(s).set(this.out_buf.subarray(0, n)), e.push(s);
      }return i < t.length && (this.in_f32.set(t.subarray(i)), this.in_off = t.length - i), e;
    }, t.prototype.encode_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var t = this.in_off; t < this.in_len; ++t) {
        this.in_i16[t] = 0;
      }var e = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= e) throw "opus_encode failed: " + e;var i = new ArrayBuffer(e);return new Uint8Array(i).set(this.out_buf.subarray(0, e)), i;
    }, t.prototype.encode_float_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var t = this.in_off; t < this.in_len; ++t) {
        this.in_f32[t] = 0;
      }var e = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= e) throw "opus_encode failed: " + e;var i = new ArrayBuffer(e);return new Uint8Array(i).set(this.out_buf.subarray(0, e)), i;
    }, t.prototype.destroy = function () {
      this.handle && (_opus_encoder_destroy(this.handle), _free(this.in_ptr), this.handle = this.in_ptr = 0);
    }, t;
  }(),
      $t = function () {
    function t(t, e) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = e;var i = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(t, e, i), 0 != getValue(i, "i32")) throw "opus_decoder_create failed: " + getValue(i, "i32");this.in_ptr = _malloc(Jt.getMaxFrameSize(e)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Jt.getMaxFrameSize(e)), this.out_len = Jt.getMaxSamplesPerChannel(t);var n = this.out_len * e * 4;this.out_ptr = _malloc(n), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + n >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + n >> 2);
    }return t.prototype.decode = function (t) {
      this.in_buf.set(new Uint8Array(t));var e = _opus_decode(this.handle, this.in_ptr, t.byteLength, this.out_ptr, this.out_len, 0);if (0 > e) throw "opus_decode failed: " + e;var i = new Int16Array(e * this.channels);return i.set(this.out_i16.subarray(0, i.length)), i;
    }, t.prototype.decode_float = function (t) {
      this.in_buf.set(new Uint8Array(t));var e = _opus_decode_float(this.handle, this.in_ptr, t.byteLength, this.out_ptr, this.out_len, 0);if (0 > e) throw "opus_decode failed: " + e;var i = new Float32Array(e * this.channels);return i.set(this.out_f32.subarray(0, i.length)), i;
    }, t.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, t;
  }();var te = null;
  var ee = function ee() {
    _classCallCheck(this, ee);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = te;
  };

  var ie = function (_ee) {
    _inherits(ie, _ee);

    function ie() {
      var _this20;

      _classCallCheck(this, ie);

      (_this20 = _possibleConstructorReturn(this, _ee.call(this)), _this20), _this20.queueSize = 5120, _this20.unstableSeconds = 0, _this20.stableSeconds = 0, _this20.minimalQueueSize = _this20.queueSize;_this20.defaultConfig.codec.sampleRate, _this20.defaultConfig.codec.bufferSize;_this20.perfectRate = 50, _this20.lowestAcceptable = _this20.perfectRate - 5, _this20.highestAcceptable = _this20.perfectRate + 5;return _this20;
    }

    ie.prototype.isAcceptable = function isAcceptable(t) {
      return t >= this.lowestAcceptable && t <= this.highestAcceptable;
    };

    ie.prototype.handleMeasurement = function handleMeasurement(t) {
      this.isAcceptable(t) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    ie.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    ie.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    ie.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return ie;
  }(ee);

  var ne = function () {
    function ne(t) {
      var _this21 = this;

      _classCallCheck(this, ne);

      this.ticks = 0, this.task = setInterval(function () {
        t(_this21.ticks), _this21.ticks = 0;
      }, 1e3);
    }

    ne.prototype.tick = function tick() {
      this.ticks++;
    };

    ne.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return ne;
  }();

  var se = function () {
    function se() {
      var _this22 = this;

      _classCallCheck(this, se);

      this.buffer = new Float32Array(0), this.processor = new ie(), this.tickTimer = new ne(function (t) {
        _this22.processor.handleMeasurement(t);
      });
    }

    se.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    se.prototype.write = function write(t, e) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;e = t.sampler.resampler(e);var n = new Float32Array(i + e.length);n.set(this.buffer, 0), n.set(e, i), this.buffer = n;
    };

    se.prototype.read = function read(t) {
      var e = this.buffer.subarray(0, t);return this.buffer = this.buffer.subarray(t, this.buffer.length), e;
    };

    se.prototype.length = function length() {
      return this.buffer.length;
    };

    se.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return se;
  }();

  var oe = function (_ee2) {
    _inherits(oe, _ee2);

    function oe(t, e) {
      var _this23;

      _classCallCheck(this, oe);

      (_this23 = _possibleConstructorReturn(this, _ee2.call(this)), _this23), _this23.config = _this23.defaultConfig, _this23.config.codec = _this23.config.codec || _this23.defaultConfig.codec, _this23.config.server = _this23.config.server || _this23.defaultConfig.server, _this23.sampler = new Gt(_this23.config.codec.sampleRate, _this23.audioContext.sampleRate, 1, _this23.config.codec.bufferSize), _this23.parentSocket = e, _this23.decoder = new $t(_this23.config.codec.sampleRate, _this23.config.codec.channels), _this23.silence = new Float32Array(_this23.config.codec.bufferSize);return _this23;
    }

    oe.prototype.start = function start() {
      var _this24 = this;

      this.audioQueue = new se(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (t) {
        _this24.audioQueue.length() ? t.outputBuffer.getChannelData(0).set(_this24.audioQueue.read(_this24.config.codec.bufferSize)) : t.outputBuffer.getChannelData(0).set(_this24.silence);
      }, this.gainNode = this.audioContext.createGain(), this.scriptNode.connect(this.gainNode), this.gainNode.connect(this.audioContext.destination), this.socket = this.parentSocket, this.socket.onmessage = function (t) {
        if (t.data instanceof Blob) {
          _this24.audioQueue.tick();var e = new FileReader();e.onload = function () {
            _this24.audioQueue.write(_this24, _this24.decoder.decode_float(e.result));
          }, e.readAsArrayBuffer(t.data);
        }
      }, this.socketKeepAliveTimer = setInterval(function () {
        try {
          if (_this24.socket.readyState === WebSocket.CLOSED) return void clearInterval(_this24.socketKeepAliveTimer);_this24.socket.send("1");
        } catch (t) {
          clearInterval(_this24.socketKeepAliveTimer);
        }
      }, 1e3);
    };

    oe.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    oe.prototype.setVolume = function setVolume(t) {
      this.gainNode && (this.gainNode.gain.value = t);
    };

    oe.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return oe;
  }(ee);

  var re = function () {
    function re(t, e) {
      _classCallCheck(this, re);

      this.room = t, this.roomMember = e, this.isStopped = !1, this.player = new oe({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    re.prototype.setVolume = function setVolume(t) {
      null != this.player && this.player.setVolume(t / 50);
    };

    re.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return re;
  }();

  var ae = function ae(t, e, i) {
    _classCallCheck(this, ae);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(t, e, i) : void navigator.mediaDevices.getUserMedia(t).then(function (t) {
      return e(t);
    }).catch(function (t) {
      return i(t);
    }) : void navigator.webkitGetUserMedia(t, e, i) : void navigator.getUserMedia(t, e, i);
  };

  var le = function (_et2) {
    _inherits(le, _et2);

    function le(t) {
      _classCallCheck(this, le);

      var _this25 = _possibleConstructorReturn(this, _et2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

      var e = [],
          i = !1;navigator.mediaDevices.enumerateDevices().then(function (t) {
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
          for (var _iterator18 = t[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var _n4 = _step18.value;
            "audioinput" == _n4.kind && ("" === _n4.label ? i = !0 : e.push({ name: _n4.label, id: _n4.deviceId }));
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
      }).then(function () {
        if (i) _this25.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br /><a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> </div>'), document.getElementById("request-mic-permissions").onclick = function () {
          new ae({ audio: !0 }, function (e) {
            _this25.hide(), e.getTracks()[0].stop(), new le(t);
          }, function (e) {
            console.log(e), _this25.hide(), _this25.deniedMessage(), t(null);
          });
        };else {
          null != _this25.requestBox && _this25.requestBox.hide();var _i6 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = e[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _t20 = _step19.value;
              _i6 += '<option value="' + _t20.id + '">' + _t20.name + "</option>";
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

          if (_i6 += "</select>", _this25.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?<br /><small>changes can take a second or two to apply</small><br />' + _i6 + '<div id="mic-loader" style="display:none;"><h2>Switching mic input. Please wait.</h2><div class="loader"></div></div></div>'), null != Cookies.get("default-mic")) {
            var _t19 = document.getElementById("select-mic-dropdown");for (var _e10 = 0; _e10 < _t19.options.length; _e10++) {
              _t19.options[_e10].innerText === Cookies.get("default-mic") && (_t19.options[_e10].selected = !0);
            }
          }document.getElementById("select-mic-dropdown").onchange = function (e) {
            document.getElementById("select-mic-dropdown").disabled = !0, document.getElementById("select-mic-dropdown").style.display = "none", document.getElementById("mic-loader").style.display = "", Cookies.set("default-mic", e.target.selectedOptions[0].childNodes[0].data), t(_this25.getId()), setTimeout(function () {
              document.getElementById("select-mic-dropdown").style.display = "", document.getElementById("mic-loader").style.display = "none", document.getElementById("select-mic-dropdown").disabled = !1;
            }, 6e3);
          }, t(_this25.getId());
        }
      }).catch(function (t) {
        return console.error(t);
      });return _this25;
    }

    le.prototype.getId = function getId() {
      var t = document.getElementById("select-mic-dropdown");for (var e = 0; e < t.options.length; e++) {
        if (t.options[e].innerText == Cookies.get("default-mic")) return t.options[e].value;
      }return "default";
    };

    le.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new et("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return le;
  }(et);

  var he = function (_ee3) {
    _inherits(he, _ee3);

    function he(t, e) {
      var _this26;

      _classCallCheck(this, he);

      (_this26 = _possibleConstructorReturn(this, _ee3.call(this)), _this26), _this26.config = t, _this26.config.codec = _this26.config.codec || _this26.defaultConfig.codec, _this26.sampler = new Gt(_this26.audioContext.sampleRate, _this26.config.codec.sampleRate, 1, _this26.config.codec.bufferSize), _this26.parentSocket = e, _this26.encoder = new Kt(_this26.config.codec.sampleRate, _this26.config.codec.channels, _this26.config.codec.app, _this26.config.codec.frameDuration);return _this26;
    }

    he.prototype._makeStream = function _makeStream(t) {
      var _this27 = this;

      new ae({ audio: this.config.micId }, function (t) {
        _this27.stream = t, _this27.audioInput = _this27.audioContext.createMediaStreamSource(t), _this27.gainNode = _this27.audioContext.createGain(), _this27.recorder = _this27.audioContext.createScriptProcessor(_this27.config.codec.bufferSize, 1, 1), _this27.recorder.onaudioprocess = function (t) {
          var e = _this27.sampler.resampler(t.inputBuffer.getChannelData(0)),
              i = _this27.encoder.encode_float(e);for (var _t21 = 0; _t21 < i.length; _t21++) {
            1 === _this27.socket.readyState && _this27.socket.send(i[_t21]);
          }
        }, _this27.audioInput.connect(_this27.gainNode), _this27.gainNode.connect(_this27.recorder), _this27.recorder.connect(_this27.audioContext.destination);
      }, t || this.onError);
    };

    he.prototype.start = function start(t) {
      var _this28 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(t);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var e = this.socket.onopen;this.socket.onopen = function () {
          e && e(), _this28._makeStream(t);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this28._shutdown(), console.log("Disconnected from server");
      };
    };

    he.prototype.mute = function mute() {
      this.gainNode.gain.value = 0, console.log("Mic muted");
    };

    he.prototype.unMute = function unMute() {
      this.gainNode.gain.value = 1, console.log("Mic unmuted");
    };

    he.prototype.onError = function onError(t) {
      var e = new Error(t.name);throw e.name = "NavigatorUserMediaError", e;
    };

    he.prototype._shutdown = function _shutdown() {
      this.audioInput && (this.audioInput.disconnect(), this.audioInput = null), this.gainNode && (this.gainNode.disconnect(), this.gainNode = null), this.recorder && (this.recorder.disconnect(), this.recorder = null), null != this.stream && this.stream.getTracks().forEach(function (t) {
        t.stop();
      });
    };

    he.prototype.stop = function stop() {
      this._shutdown(), this.parentSocket || this.socket.close();
    };

    return he;
  }(ee);

  var ue = function () {
    function ue(t) {
      var _this29 = this;

      _classCallCheck(this, ue);

      this.room = t, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new le(function (t) {
        _this29.shutdown(), setTimeout(function () {
          _this29.micId = !(null != t) || t, _this29.start();
        }, 5e3);
      });
    }

    ue.prototype.mute = function mute() {
      this.isMuted = !0, this.streamer.mute();
    };

    ue.prototype.unMute = function unMute() {
      this.isMuted = !1, this.streamer.unMute();
    };

    ue.prototype.start = function start() {
      this.streamer = new he({ micId: this.micId }, new WebSocket(this.room.voiceServer.ws + "/stream?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&accessToken=" + this.room.accessToken)), this.streamer.start(), this.isRunning = !0;
    };

    ue.prototype.shutdown = function shutdown() {
      null != this.streamer && this.streamer.stop(), this.isRunning = !1;
    };

    return ue;
  }();

  var ce = function () {
    function ce(t, e, i) {
      _classCallCheck(this, ce);

      this.room = t, this.uuid = e, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new It(t, i, this), this.volume = t.main.mediaManager.getMasterVolume();
    }

    ce.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    ce.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new re(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
    };

    ce.prototype.setVolume = function setVolume(t) {
      this.volume = t, this.card.isMuted || this.voiceReceiver.setVolume(t);
    };

    ce.prototype.muteReceiver = function muteReceiver() {
      this.voiceReceiver.setVolume(0);
    };

    ce.prototype.unmuteReceiver = function unmuteReceiver() {
      this.voiceReceiver.setVolume(this.volume);
    };

    ce.prototype.broadcastStream = function broadcastStream() {
      this.voiceBroadcast = new ue(this.room);
    };

    return ce;
  }();

  var de = function () {
    function de(t, e, i, n, s, o) {
      var _this30 = this;

      _classCallCheck(this, de);

      this.main = t, this.voiceServer = e, this.roomId = i, this.accessToken = s, this.roomMembers = new Map(), this.currentUser = n, this.isUnsubscribing = !1, new et("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this30.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this30.toggleMic();
      }, o.forEach(function (t) {
        _this30.registerMember(t.uuid, t.name);
      });
    }

    de.prototype.toggleMic = function toggleMic() {
      var _this31 = this;

      var t = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (e) {
        null != e.voiceBroadcast && (t = e.voiceBroadcast);
      }), t.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", t.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", t.mute()), setTimeout(function () {
        _this31.muteMicButtonElement.disabled = !1, _this31.canToggleMute = !0;
      }, 1e3));
    };

    de.prototype.unsubscribe = function unsubscribe() {
      var _this32 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new et("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), M(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (t) {
        t.json().then(function (t) {
          0 !== t.results.length && (_this32.roomMembers.forEach(function (t) {
            _this32.handleMemberLeaving(t.uuid);
          }), document.getElementById("call-control-box").style.display = "none", _this32.main.voiceModule.clearCall());
        }).catch(function (t) {
          console.error(t.stack), _this32.leaveErrorhandler(t);
        });
      }).catch(function (t) {
        console.error(t.stack), _this32.leaveErrorhandler(t);
      }));
    };

    de.prototype.resubToPlayer = function resubToPlayer(t) {
      var e = this.roomMembers.get(t);null == e || (null != e.voiceReceiver && e.voiceReceiver.shutdown(), e.connectStream());
    };

    de.prototype.handleMemberLeaving = function handleMemberLeaving(t) {
      var e = this.roomMembers.get(t);null == e || (null != e.voiceBroadcast && (e.voiceBroadcast.shutdown(), e.voiceBroadcast.changeMicPopup.hide()), null != e.voiceReceiver && e.voiceReceiver.shutdown(), e.removeCard(), this.roomMembers.delete(t), 1 === this.roomMembers.size && this.unsubscribe());
    };

    de.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new et("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    de.prototype.errorHandler = function errorHandler(t) {
      new et("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(t);
    };

    de.prototype.registerMember = function registerMember(t, e) {
      var i = new ce(this, t, e);this.roomMembers.set(t, i), t == this.currentUser.uuid ? i.broadcastStream() : i.connectStream();
    };

    return de;
  }();

  var me = function () {
    function me(t, e, i, n) {
      var _this33 = this;

      _classCallCheck(this, me);

      var s = [];e.forEach(function (e) {
        e != t.tokenSet.name && s.push(e);
      }), t.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var o = s.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + o, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this33.ignored = !0, _this33.hide(_this33), new et("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this33.ignored || (_this33.ignored = !0, _this33.hide(_this33), new et("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), n());
      };this.onTimeout = r, document.getElementById("call-deny-button").onclick = r;
    }

    me.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return me;
  }();

  var fe = function () {
    function fe(t) {
      _classCallCheck(this, fe);

      this.room = null, this.main = t, this.currentUser = t.currentUser;
    }

    fe.prototype.promptCall = function promptCall(t, e, i, n, s) {
      var _this34 = this;

      null == this.room ? new me(this.main, n, function () {
        _this34.room = new de(_this34.main, t, e, _this34.main.tokenSet, i, s);
      }, function () {
        M(_this34.voiceServer.rest + "/leave-room?room=" + e + "&uuid=" + _this34.currentUser.uuid + "&accessToken=" + i).then(function (t) {
          t.json().then(function (t) {
            0 === t.results.length ? _this34.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (t) {
            _this34.leaveErrorhandler(t);
          });
        }).catch(function (t) {
          _this34.leaveErrorhandler(t);
        });
      }) : new et("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    fe.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new et("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    fe.prototype.handleSocketClosed = function handleSocketClosed() {
      null == this.room || this.room.unsubscribe();
    };

    fe.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    fe.prototype.setVolume = function setVolume(t) {
      null != this.room && this.room.roomMembers.forEach(function (e) {
        null != e.voiceReceiver && e.setVolume(t);
      });
    };

    return fe;
  }();

  var pe = function () {
    function pe(t) {
      _classCallCheck(this, pe);

      this.main = t, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    pe.prototype.setupPermissions = function setupPermissions() {
      var _this35 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new et("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this35.requestNotificationPermissions();
      });
    };

    pe.prototype.sendNotification = function sendNotification(t, e) {
      new Notification(t, { body: e, icon: "https://minotar.net/avatar/" + this.main.tokenSet.name });
    };

    pe.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this36 = this;

      Notification.requestPermission().then(function (t) {
        "granted" === t && (_this36.requestBox.hide(), new et("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this36.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return pe;
  }();

  var ge = i(0);i.d(e, "OpenAudioMc", function () {
    return ye;
  });
  var ye = function (_ref) {
    _inherits(ye, _ref);

    function ye() {
      var _this37, _ret2;

      _classCallCheck(this, ye);

      if ((_this37 = _possibleConstructorReturn(this, _ref.call(this)), _this37), _this37.canStart = !1, _this37.host = null, _this37.background = null, _this37.tokenSet = new rt().fromUrl(window.location.href), null == _this37.tokenSet) return _ret2 = void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />"), _possibleConstructorReturn(_this37, _ret2);_this37.notificationModule = new pe(_this37), _this37.timeService = new X(), _this37.messages = new Q(_this37), _this37.userInterfaceModule = new G(_this37), _this37.hueConfiguration = new kt(_this37), _this37.mediaManager = new tt(_this37), te = new (window.AudioContext || window.webkitAudioContext)(), _this37.voiceModule = new fe(_this37), _this37.boot();new Bt("https://plus.openaudiomc.net/").route(_this37).then(function (t) {
        _this37.canStart = !0, _this37.host = t.host, _this37.background = t.background;
      }).catch(function (t) {
        console.error("Exception thrown", t.stack), _this37.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff."), new et("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred while connecting to the server, please request a new url and try again.");
      });return _possibleConstructorReturn(_this37);
    }

    ye.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.hueModule = new J(this, Object(ge.a)()), this.socketModule = new it(this, this.host), this.messages.apply(), new Mt(this), "" !== this.background && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + this.background + ");\n    -webkit-background-size: cover;\n    background-size: cover;"));
    };

    return ye;
  }(function (_ref2) {
    _inherits(_class3, _ref2);

    function _class3() {
      _classCallCheck(this, _class3);

      return _possibleConstructorReturn(this, _ref2.apply(this, arguments));
    }

    _class3.prototype.log = function log(t) {
      console.log("[OpenAudioMc] " + t);
    };

    _class3.prototype.getMessages = function getMessages() {
      return this.messages;
    };

    _class3.prototype.getTimeService = function getTimeService() {
      return this.timeService;
    };

    _class3.prototype.getHueConfiguration = function getHueConfiguration() {
      return this.hueConfiguration;
    };

    _class3.prototype.debugPrint = function debugPrint(t) {
      this.log(t);
    };

    _class3.prototype.getMediaManager = function getMediaManager() {
      return this.mediaManager;
    };

    _class3.prototype.getHueModule = function getHueModule() {
      return this.hueModule;
    };

    _class3.prototype.getUserInterfaceModule = function getUserInterfaceModule() {
      return this.userInterfaceModule;
    };

    _class3.prototype.getVoiceService = function getVoiceService() {
      return this.voiceService;
    };

    return _class3;
  }(function () {
    function _class4() {
      _classCallCheck(this, _class4);

      console.log("%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", "background: linear-gradient(#D33106, #571402);border: 1px solid #3E0E02;color: white;display: block;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;line-height: 40px;text-align: center;font-weight: bold"), this.log("Enabling the web client for " + window.navigator.userAgent);
    }

    _class4.prototype.boot = function boot() {
      var t = Cookies.get("volume");Cookies.set("auto-join-call", !1), null != t && this.mediaManager.changeVolume(t);
    };

    return _class4;
  }()));

  !function () {
    var t = new rt().fromUrl(window.location.href);null == t ? (document.getElementById("footer-welcome").innerText = "No authentication provided", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />") : (document.body.onclick = function () {
      at.canStart && at.start();
    }, null != t && null != t.name && (document.getElementById("sidebar-head").style.background = "linear-gradient(0deg, rgba(42, 38, 95, .8), rgba(42, 38, 95, .4)), url(https://minotar.net/avatar/" + t.name + ")", document.getElementById("footer-welcome").innerText = "Logged in as " + t.name, at = new ye()));
  }();
}]);
