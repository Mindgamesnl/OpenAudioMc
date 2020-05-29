"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  function t(n) {
    if (i[n]) return i[n].exports;var s = i[n] = { i: n, l: !1, exports: {} };return e[n].call(s.exports, s, s.exports, t), s.l = !0, s.exports;
  }var i = {};t.m = e, t.c = i, t.d = function (e, i, n) {
    t.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: n });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, i) {
    if (1 & i && (e = t(e)), 8 & i) return e;if (4 & i && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var n = Object.create(null);if (t.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & i && "string" != typeof e) for (var s in e) {
      t.d(n, s, function (t) {
        return e[t];
      }.bind(null, s));
    }return n;
  }, t.n = function (e) {
    var i = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(i, "a", i), i;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 2);
}([function (e, t, i) {
  "use strict";
  (function (e) {
    function n() {
      return o();
    }i.d(t, "a", function () {
      return n;
    });var s = function s(e, t, i, n) {
      var o = function o(t, s, _o) {
        return new n(function (e) {
          null !== _o && (_o = i.stringify(_o)), e(_o);
        }).then(function (i) {
          return e(s, { method: t, body: i });
        }).then(function (e) {
          return e.json();
        });
      },
          r = function r(e, t) {
        return o(e, t, null);
      },
          a = r.bind(null, "GET"),
          l = o.bind(null, "PUT"),
          h = o.bind(null, "POST"),
          u = r.bind(null, "DELETE"),
          c = function c(e, t) {
        return function (i) {
          for (var _len = arguments.length, n = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(i)].concat(n));
        };
      },
          d = function d(e) {
        return function (s, o) {
          return n.resolve(new t(i.stringify({ address: s.slice(e.length), method: o.method, body: i.parse(o.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(e) {
          var o = "http://" + e,
              r = o + "/api";return { createUser: function createUser(e) {
              return h(r, { devicetype: e });
            }, user: function user(m) {
              Cookies.set("hueid", m);var f = r + "/" + m,
                  p = f + "/capabilities",
                  g = f + "/config",
                  y = f + "/lights",
                  b = f + "/groups",
                  w = f + "/schedules",
                  v = f + "/scenes",
                  _ = f + "/sensors",
                  x = f + "/rules",
                  M = f + "/resourcelinks",
                  E = function E(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  k = E(y),
                  S = E(b),
                  C = E(w),
                  A = E(v),
                  z = E(_),
                  B = E(x),
                  T = E(M);return { getCapabilities: a.bind(null, p), deleteUser: c(u, function (e) {
                  return g + "/whitelist/" + e;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, f), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return h(y, e);
                }, getLight: c(a, k), setLight: c(l, k), setLightState: c(l, function (e) {
                  return k(e) + "/state";
                }), deleteLight: c(u, k), getGroups: a.bind(null, b), createGroup: h.bind(null, b), getGroup: c(a, S), setGroup: c(l, S), setGroupState: c(l, function (e) {
                  return S(e) + "/action";
                }), deleteGroup: c(u, S), getSchedules: a.bind(null, w), createSchedule: h.bind(null, w), getSchedule: c(a, C), setSchedule: c(l, C), deleteSchedule: c(u, C), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return s(d(o), t, i, n).bridge(e).user(m);
                }, getScenes: a.bind(null, v), createScene: h.bind(null, v), getScene: c(a, A), setScene: c(l, A), setSceneLightState: function setSceneLightState(e, t, i) {
                  return l(A(e) + "/lightstates/" + t, i);
                }, deleteScene: c(u, A), getSensors: a.bind(null, _), createSensor: h.bind(null, _), searchForNewSensors: h.bind(null, _, null), getNewSensors: a.bind(null, _ + "/new"), getSensor: c(a, z), setSensor: c(l, z), setSensorConfig: c(l, function (e) {
                  return z(e) + "/config";
                }), setSensorState: c(l, function (e) {
                  return z(e) + "/state";
                }), deleteSensor: c(u, z), getRules: a.bind(null, x), createRule: h.bind(null, x), getRule: c(a, B), setRule: c(l, B), deleteRule: c(u, B), ruleActionGenerator: function ruleActionGenerator() {
                  return s(d(f), t, i, n).bridge(e).user(m);
                }, getResourceLinks: a.bind(null, M), createResourceLink: h.bind(null, M), getResourceLink: c(a, T), setResourceLink: c(l, T), deleteResourceLink: c(u, T) };
            } };
        } };
    };var o = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = s.bind(null, fetch, Response, JSON, Promise), void 0 !== e.exports && (e.exports = o));
  }).call(this, i(1)(e));
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
}, function (e, t, i) {
  "use strict";
  function n(e, t) {
    function i(e, t) {
      var i = 0,
          s = t || e.innerHTML,
          o = s.length;te.push(window.setInterval(function () {
        i >= o && (i = 0), s = n(s, i), e.innerHTML = s, i++;
      }, 0));
    }function n(e, t) {
      var i = D(function (e, t) {
        return q(Math.random() * (t - e + 1)) + e;
      }(64, 90));return e.substr(0, t) + i + e.substr(t + 1, e.length);
    }var s = void 0,
        o = void 0,
        r = t.childNodes.length;if (-1 < e.indexOf("<br>")) {
      t.innerHTML = e;for (var _e2 = 0; _e2 < r; _e2++) {
        o = t.childNodes[_e2], 3 === o.nodeType && (s = document.createElement("span"), s.innerHTML = o.nodeValue, t.replaceChild(s, o), i(s));
      }
    } else i(t, e);
  }function s(e, t) {
    var i = t.length,
        s = document.createElement("span"),
        o = !1;for (var _r = 0; _r < i; _r++) {
      s.style.cssText += ie[t[_r]] + ";", "§k" === t[_r] && (n(e, s), o = !0);
    }return o || (s.innerHTML = e), s;
  }function o(e) {
    var t,
        i,
        n = e.match(/&.{1}/g) || [],
        o = [],
        r = [],
        a = document.createDocumentFragment(),
        l = n.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t = 0; _t < l; _t++) {
      o.push(e.indexOf(n[_t])), e = e.replace(n[_t], "\0\0");
    }0 !== o[0] && a.appendChild(s(e.substring(0, o[0]), []));for (var _h = 0; _h < l; _h++) {
      if (2 === (i = o[_h + 1] - o[_h])) {
        for (; 2 == i;) {
          r.push(n[_h]), _h++, i = o[_h + 1] - o[_h];
        }r.push(n[_h]);
      } else r.push(n[_h]);-1 < r.lastIndexOf("§r") && (r = r.slice(r.lastIndexOf("§r") + 1)), t = e.substring(o[_h], o[_h + 1]), a.appendChild(s(t, r));
    }return a;
  }function r(e, t, i, n) {
    this._x = e || 0, this._y = t || 0, this._z = i || 0, this._w = void 0 === n ? 1 : n;
  }function a(e, t, i) {
    this.x = e || 0, this.y = t || 0, this.z = i || 0;
  }function l(e) {
    if ("string" != typeof e && (e += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function h(e) {
    return "string" != typeof e && (e += ""), e;
  }function u(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return ye.iterable && (t[Symbol.iterator] = function () {
      return t;
    }), t;
  }function c(e) {
    this.map = {}, e instanceof c ? e.forEach(function (e, t) {
      this.append(t, e);
    }, this) : Array.isArray(e) ? e.forEach(function (e) {
      this.append(e[0], e[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t]);
    }, this);
  }function d(e) {
    return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (e.bodyUsed = !0);
  }function m(e) {
    return new Promise(function (t, i) {
      e.onload = function () {
        t(e.result);
      }, e.onerror = function () {
        i(e.error);
      };
    });
  }function f(e) {
    var t = new FileReader(),
        i = m(t);return t.readAsArrayBuffer(e), i;
  }function p(e) {
    if (e.slice) return e.slice(0);var t = new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)), t.buffer;
  }function g() {
    return this.bodyUsed = !1, this._initBody = function (e) {
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : ye.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : ye.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : ye.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : ye.arrayBuffer && ye.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = p(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : ye.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || we(e)) ? this._bodyArrayBuffer = p(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : ye.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, ye.blob && (this.blob = function () {
      var e = d(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? d(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(f);
    }), this.text = function () {
      var e = d(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            i = m(t);return t.readAsText(e), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), i = Array(t.length), n = 0; n < t.length; n++) {
          i[n] = D(t[n]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, ye.formData && (this.formData = function () {
      return this.text().then(b);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function y(e, t) {
    var i = (t = t || {}).body;if (e instanceof y) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new c(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0);
    } else this.url = e + "";if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new c(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return -1 < ve.indexOf(t) ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function b(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var i = e.split("="),
            n = i.shift().replace(/\+/g, " "),
            s = i.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(n), decodeURIComponent(s));
      }
    }), t;
  }function w(e) {
    var t = new c();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var i = e.split(":"),
          n = i.shift().trim();if (n) {
        var s = i.join(":").trim();t.append(n, s);
      }
    }), t;
  }function v(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new c(t.headers), this.url = t.url || "", this._initBody(e);
  }function _(e, t) {
    return new Promise(function (i, n) {
      function s() {
        r.abort();
      }var o = new y(e, t);if (o.signal && o.signal.aborted) return n(new xe("Aborted", "AbortError"));var r = new XMLHttpRequest();r.onload = function () {
        var e = { status: r.status, statusText: r.statusText, headers: w(r.getAllResponseHeaders() || "") };e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");var t = "response" in r ? r.response : r.responseText;i(new v(t, e));
      }, r.onerror = function () {
        n(new TypeError("Network request failed"));
      }, r.ontimeout = function () {
        n(new TypeError("Network request failed"));
      }, r.onabort = function () {
        n(new xe("Aborted", "AbortError"));
      }, r.open(o.method, o.url, !0), "include" === o.credentials ? r.withCredentials = !0 : "omit" === o.credentials && (r.withCredentials = !1), "responseType" in r && ye.blob && (r.responseType = "blob"), o.headers.forEach(function (e, t) {
        r.setRequestHeader(t, e);
      }), o.signal && (o.signal.addEventListener("abort", s), r.onreadystatechange = function () {
        4 === r.readyState && o.signal.removeEventListener("abort", s);
      }), r.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }function x(e, t, i, n, s) {
    this.fromSampleRate = e, this.toSampleRate = t, this.channels = 0 | i, this.outputBufferSize = n, this.noReturn = !!s, this.initialize();
  }function M(e, t, i, n, s, o) {
    this.audioChannels = 2 == e ? 2 : 1, Re = 1 == this.audioChannels, Oe = 0 < t && 16777215 >= t ? t : 44100, Te = i >= Ce << 1 && i < n ? i & (Re ? 4294967295 : 4294967294) : Ce << 1, Ie = q(n) > Te + this.audioChannels ? n & (Re ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof s ? s : function () {}, Le = -1 <= o && 1 >= o && 0 != o ? o : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function E(e) {
    try {
      var t = new Float32Array(e);
    } catch (t) {
      var t;Array(e);
    }for (var i = 0; i < e; ++i) {
      t[i] = Le * (i / e);
    }return t;
  }function k(e) {
    try {
      var t = new Float32Array(e);
    } catch (n) {
      t = Array(e);var i = 0;do {
        t[i] = 0;
      } while (++i < e);
    }return t;
  }function S() {
    for (var e = "", t = "", i = 0; i < Ce && He != Ve; ++i) {
      e += D(12288 + (0 | 16383 * V(H(Be[He++] + 1, 0), 2))), t += D(12288 + (0 | 16383 * V(H(Be[He++] + 1, 0), 2))), He == Ne && (He = 0);
    }return e + t;
  }function C() {
    for (var e = "", t = 0; t < Ce && He != Ve; ++t) {
      e += D(12288 + (0 | 16383 * V(H(Be[He++] + 1, 0), 2))), He == Ne && (He = 0);
    }return e;
  }function A() {
    return (He <= Ve ? 0 : Ne) + Ve - He;
  }function z(e) {
    ze = E(Ie), Ue = Ie, He = 0, Ve = 0, Ne = H(Ie * L(Oe / e), Ce) << 1, Re ? (Be = k(Ne), Fe = new x(Oe, e, 1, Ne, !0), C) : (Be = k(Ne <<= 1), Fe = new x(Oe, e, 2, Ne, !0), S);
  }var B = Math.atan2,
      T = Math.sqrt,
      I = Number.EPSILON,
      P = Math.sin,
      O = Math.cos,
      R = Math.pow,
      L = Math.ceil,
      F = Math.LN2,
      U = Math.log,
      H = Math.max,
      V = Math.min,
      N = Math.PI,
      D = String.fromCharCode,
      W = Math.abs,
      j = Math.round,
      q = Math.floor;i.r(t);
  var Z = function () {
    function Z() {
      _classCallCheck(this, Z);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    Z.prototype.sync = function sync(e, t) {
      var i = new Date(e),
          n = new Date().getTime();n += 60 * t * 60 * 1e3;var s = new Date(n);this.isServerAhead = i.getTime() > s.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - s.getTime() : s.getTime() - i.getTime(), this.hasSynced = !0;
    };

    Z.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return Z;
  }();

  var G = function () {
    function G(e) {
      _classCallCheck(this, G);

      this.fallback = "No message provided in oa+", this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    G.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return G;
  }();

  var Q = function () {
    function Q(e) {
      var _this = this;

      _classCallCheck(this, Q);

      this.openAudioMc = e, document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    Q.prototype.changeColor = function changeColor(e, t) {
      var i = function (e) {
        return e = e.replace("#", ""), "rgb(" + parseInt(e.substring(0, 2), 16) + ", " + parseInt(e.substring(2, 4), 16) + ", " + parseInt(e.substring(4, 6), 16) + ")";
      }(e);document.querySelectorAll("*").forEach(function (e) {
        var n = window.getComputedStyle(e);Object.keys(n).reduce(function (s, o) {
          var r = n[o],
              a = n.getPropertyValue(r);if (0 <= a.indexOf(i)) {
            var _n = a.replace(i, t);0 <= r.indexOf("border-top") ? e.style.borderTop = "2px solid " + _n : e.style[r] = _n;
          }
        });
      });
    };

    Q.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    Q.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    Q.prototype.openApp = function openApp() {
      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage), document.getElementById("page").classList.remove("dark-bg");
    };

    Q.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    Q.prototype.kickScreen = function kickScreen(e) {
      document.getElementById("footer-welcome").innerText = "Session terminated", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = null == e ? this.openAudioMc.messages.errorMessage : e, document.getElementById("welcome").style.display = "", document.getElementById("page").classList.add("dark-bg"), document.getElementById("app").style.display = "none";
    };

    Q.prototype.showVolumeSlider = function showVolumeSlider(e) {
      e ? (document.getElementById("volume-label").style.display = "", document.getElementById("volume-disp").style.display = "") : (document.getElementById("volume-disp").style.display = "none", document.getElementById("volume-label").style.display = "none");
    };

    return Q;
  }();

  var Y = function () {
    function Y(e, t) {
      var _this2 = this;

      _classCallCheck(this, Y);

      this.hue = t, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = e, this.hue.discover().then(function (e) {
        e.forEach(function (e) {
          _this2.bridges.push(e), _this2.onDiscover();
        });
      }).catch(function (e) {
        return console.log("Error finding bridges", e);
      }), this.isSsl && this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue"), document.getElementById("hue-start-linking-button").onclick = function () {
        _this2.startSetup();
      };
    }

    Y.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-bridge-menu-button").style.display = "none", void this.openAudioMc.getUserInterfaceModule().showMain();null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    Y.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    Y.prototype.onConnect = function onConnect() {
      var _this3 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this3.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this3.currentUser.getLights().then(function (e) {
          var t = [];for (var _i in e) {
            e.hasOwnProperty(_i) && t.push({ name: e[_i].name, id: parseInt(_i) });
          }_this3.openAudioMc.getHueConfiguration().setLightNamesAndIds(t);null != Cookies.get("hue-state") && (_this3.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this3.openAudioMc.getHueConfiguration().applyState(), _this3.openAudioMc.getHueConfiguration().updateState();
        }), _this3.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    Y.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    Y.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 0 != 2 * t.alpha * 127.5, hue: q(65535 * t.hue / 360), sat: q(255 * t.saturation), bri: j(2 * t.alpha * 127.5) };
    };

    Y.prototype.setLight = function setLight(e, t) {
      var _this4 = this;

      var i = [];if ("number" == typeof e) {
        var _t2 = this.openAudioMc.getHueConfiguration().getBulbStateById(e - 1);if (-1 === _t2) return !1;i.push(_t2);
      } else if (e.startsWith("[")) JSON.parse(e).forEach(function (e) {
        var t = _this4.openAudioMc.getHueConfiguration().getHueIdFromId(e - 1);return -1 !== t && void i.push(t);
      });else {
        var _t3 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(e) - 1);if (-1 === _t3) return !1;i.push(_t3);
      }i.forEach(function (e) {
        _this4.currentUser.setLightState(e, _this4.colorToHueHsv(t)).then(function () {});
      });
    };

    Y.prototype.linkBridge = function linkBridge(e, t) {
      var _this5 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this5.linkBridge(e, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var n = 0,
          s = -1;s = setInterval(function () {
        function e() {
          clearInterval(s);
        }if (n++, 60 < n) return e(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this5.startSetup();
        }, void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - n;document.getElementById("hue-linking-message").innerText = _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", t), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null == t[0].error ? null != t[0].success && (i.currentUser = i.currentBridge.user(t[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), i.isLinked = !0, i.onConnect(), e()) : 101 === t[0].error.type || (e(), _this5.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type));
        });
      }, 1e3);
    };

    return Y;
  }();

  var X = function () {
    function X(e) {
      _classCallCheck(this, X);

      this.channelName = e, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map();
    }

    X.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    X.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    X.prototype.addSound = function addSound(e) {
      this.sounds.push(e);var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.sounds.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _e3 = _step.value;
          _e3.registerMixer(this.mixer, this);
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

    X.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    X.prototype.registerMixer = function registerMixer(e) {
      this.mixer = e;var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.sounds.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _e4 = _step2.value;
          _e4.registerMixer(this.mixer, this);
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

    X.prototype.fadeChannel = function fadeChannel(e, t, i) {
      var _this6 = this;

      this.interruptFade(), this.targetAfterFade = e, this.isFading = !0;(function (e, t, n, s) {
        t = t || 1e3, n = n || 0, s = "function" == typeof s ? s : function () {};var o = _this6.channelVolume,
            r = t / W(o - n),
            a = setInterval(function () {
          o = o > n ? o - 1 : o + 1;var e = _this6.mixer.masterVolume,
              t = o / 100 * e;var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _this6.sounds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _e6 = _step3.value;
              _e6.setVolume(t);
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
            null != i && i(), s.call(_this6), clearInterval(a);var _e5 = _this6.fadeTimer.indexOf(a);-1 < _e5 && _this6.fadeTimer.splice(_e5, 1), _this6.isFading = !1, a = null;
          }
        }, r);_this6.fadeTimer.push(a);
      })(0, t, e);
    };

    X.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.fadeTimer[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _e7 = _step4.value;
            clearInterval(_e7);
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

    X.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _e8 = _step5.value;
          _e8.setVolume(t);
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

    X.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _e9 = _step6.value;
          _e9.setVolume(t);
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

    X.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _e10 = _step7.value;
          _e10.destroy();
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

    return X;
  }();

  var K = function () {
    function K(e, t) {
      _classCallCheck(this, K);

      this.openAudioMc = t, this.mixerName = e, this.masterVolume = 100, this.channels = new Map();
    }

    K.prototype.updateCurrent = function updateCurrent() {
      var e = [];this.channels.forEach(function (t, i) {
        var n = [];t.tags.forEach(function (e, t) {
          n.push(t);
        }), e.push({ name: i, tags: n });
      }), this.openAudioMc.socketModule.send("current_channels", { tracks: e });
    };

    K.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e;var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.channels.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _e11 = _step8.value;
          _e11.updateFromMasterVolume();
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

    K.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;t = e instanceof X ? e : this.channels.get(e), null != t && (t.destroy(), this.channels.delete(t.channelName)), this.updateCurrent();
    };

    K.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    K.prototype.addChannel = function addChannel(e) {
      if (!(e instanceof X)) throw new Error("Argument isn't a channel");{
        var _t4 = e.channelName,
            _i2 = this.channels.get(_t4);null != _i2 && _i2.destroy(), e.registerMixer(this), this.channels.set(_t4, e);
      }
    };

    return K;
  }();

  var J = function () {
    function J(e) {
      var _this7 = this;

      _classCallCheck(this, J);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.mixer = new K(null, e), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this7.setMasterVolume(e), Cookies.set("volume", e);
      };
    }

    J.prototype.destroySounds = function destroySounds(e, t, i) {
      var _this8 = this;

      this.openAudioMc.debugPrint("starting to quit fade " + e);var n = 250;i && (n = 0);var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step9.value;
          t ? i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          }) : null == e || "" === e ? !i.hasTag("SPECIAL") && !i.hasTag("REGION") && !i.hasTag("SPEAKER") && i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          }) : i.hasTag(e) && i.fadeChannel(0, n, function () {
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

    J.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e, 0 === e ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + e + "%", Cookies.set("volume", e), this.mixer.setMasterVolume(e), this.openAudioMc.voiceModule.setVolume(e);
    };

    J.prototype.changeVolume = function changeVolume(e) {
      document.getElementById("volume-slider").value = e, this.setMasterVolume(e);
    };

    J.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return J;
  }();

  var $ = function () {
    function $(e, t) {
      _classCallCheck(this, $);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    $.prototype.show = function show(e) {
      var _this9 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this9.alertClass.hide(_this9.alertBox);
      }), !this.option.persistent) var i = setTimeout(function () {
        _this9.alertClass.hide(_this9.alertBox), clearTimeout(i);
      }, this.option.closeTime);return this;
    };

    $.prototype.hide = function hide() {
      var _this10 = this;

      this.alertBox.classList.add("hide");var e = setTimeout(function () {
        _this10.alertBox.parentNode.removeChild(_this10.alertBox), clearTimeout(e), null != _this10.onTimeout && _this10.onTimeout();
      }, 500);
    };

    return $;
  }();

  var ee = function () {
    function ee(e, t) {
      var _this11 = this;

      _classCallCheck(this, ee);

      if (this.handlers = {}, this.openAudioMc = e, this.callbacksEnabled = !1, null == function () {
        function _class() {
          _classCallCheck(this, _class);
        }

        _class.getParameter = function getParameter() {
          var e = window.location.href.split("&"),
              t = {};for (var _i3 = 0; _i3 < e.length; _i3++) {
            var _n2 = e[_i3].split("="),
                _s = decodeURIComponent(_n2[0]),
                _o2 = decodeURIComponent(_n2[1]);void 0 === t[_s] ? t[_s] = decodeURIComponent(_o2) : "string" == typeof t[_s] ? t[_s] = [t[_s], decodeURIComponent(_o2)] : t[_s].push(decodeURIComponent(_o2));
          }return t;
        };

        return _class;
      }().getParameter().data) return e.debugPrint("data is empty"), void e.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");e.debugPrint("Username: " + e.tokenSet.name), e.debugPrint("Player uuid: " + e.tokenSet.uuid), e.debugPrint("Server uuid: " + e.tokenSet.publicServerKey), e.debugPrint("Token: " + e.tokenSet.token), this.state = "loading", this.authHeader = "type=client&n=" + e.tokenSet.name + "&player=" + e.tokenSet.uuid + "&s=" + e.tokenSet.publicServerKey + "&p=" + e.tokenSet.token, e.debugPrint(this.authHeader);var i = this;this.socket = io(t, { query: i.authHeader, autoConnect: !1 }), this.socket.on("connect", function () {
        e.userInterfaceModule.openApp(), e.getUserInterfaceModule().setMessage(_this11.openAudioMc.getMessages().welcomeMessage), e.socketModule.state = "ok";
      }), this.socket.on("time-update", function (e) {
        var t = e.split(":"),
            i = parseInt(t[1]),
            n = parseInt(t[0]);_this11.openAudioMc.getTimeService().sync(n, i);
      }), this.socket.on("disconnect", function () {
        e.debugPrint("closed"), e.getMediaManager().destroySounds(null, !0), i.state = "closed", e.voiceModule.handleSocketClosed(), e.userInterfaceModule.kickScreen(), setTimeout(function () {
          e.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (e) {
        null != i.handlers[e.type] && i.handlers[e.type](e.payload);
      }), this.socket.on("join-call", function (t) {
        var i = t.room,
            n = t.server,
            s = t.accessToken,
            o = t.members,
            r = [];var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = o[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _e12 = _step10.value;
            r.push(_e12.name);
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

        e.voiceModule.promptCall(n, i, s, r, o);
      }), this.socket.on("resub-to-player-in-call", function (t) {
        var i = e.voiceModule.room;null != i && i.resubToPlayer(t);
      }), this.socket.on("member-left-call", function (t) {
        var i = e.voiceModule.room;null != i && i.handleMemberLeaving(t);
      }), this.socket.connect();
    }

    ee.prototype.send = function send(e, t) {
      this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + e), this.socket.emit(e, t)) : console.log("[OpenAudioMc] could not satisfy callback " + e + " because the protocol is outdated");
    };

    ee.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return ee;
  }();

  var te = [],
      ie = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _e13 = te.length; _e13--;) {
        clearInterval(te[_e13]);
      }te = [];
    }(), o(this + "");
  };
  var ne = function () {
    function ne(e) {
      _classCallCheck(this, ne);

      null != e && this.fromJson(e);
    }

    ne.prototype.fromJson = function fromJson(e) {
      document.getElementById("card-panel").style.display = "", this.lines = [], this.title = e.title;var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = e.rows[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t5 = _step11.value;
          this.lines.push(this.rowToHtml(_t5));
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

      document.getElementById("card-title").innerText = this.title;var t = "";this.lines.forEach(function (e) {
        t += e;
      }), document.getElementById("card-content").innerHTML = t;
    };

    ne.prototype.replaceWithJson = function replaceWithJson(e, t) {
      document.getElementById(e).replaceWith(new DOMParser().parseFromString(this.partToHtml(t), "text/html").body.childNodes[0]);
    };

    ne.prototype.rowToHtml = function rowToHtml(e) {
      var t = "";var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = e.textList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _i4 = _step12.value;
          t += this.partToHtml(_i4);
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

      return t;
    };

    ne.prototype.partToHtml = function partToHtml(e) {
      var t = "",
          i = [],
          n = [];i.push("<p id='" + e.id + "'>"), n.push("</p>");var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = e.styles[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var _t6 = _step13.value;
          "BOLD" === _t6 ? (i.push("<b>"), n.push("</b>")) : "ITALLIC" === _t6 ? (i.push("<i>"), n.push("</i>")) : "UNDERLINE" === _t6 && (i.push("<u>"), n.push("</u>"));
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

      null != e.hyperlink && "" != e.hyperlink && (i.push("<a href='" + e.hyperlink + "'>"), n.push("</a>"));var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = i[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _e14 = _step14.value;
          t += _e14;
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

      e.text = e.text.split("&").join("&"), o(e.text).childNodes.forEach(function (e) {
        t += e.outerHTML;
      });var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = n[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _e15 = _step15.value;
          t += _e15;
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

      return t;
    };

    return ne;
  }();

  var se = function () {
    function se(e, t, i, n) {
      _classCallCheck(this, se);

      this.publicServerKey = e, this.uuid = t, this.name = i, this.token = n;
    }

    se.prototype.fromUrl = function fromUrl(e) {
      if (null == e) return null;if (2 > e.split("?").length) return null;var t = function () {
        function _class2() {
          _classCallCheck(this, _class2);
        }

        _class2.getParametersFromUrl = function getParametersFromUrl(e) {
          if (-1 < e.indexOf("?&")) return {};var t = e.split("&"),
              i = {};for (var _e16 = 0; _e16 < t.length; _e16++) {
            var _n3 = t[_e16].split("="),
                _s2 = decodeURIComponent(_n3[0]),
                _o3 = decodeURIComponent(_n3[1]);void 0 === i[_s2] ? i[_s2] = decodeURIComponent(_o3) : "string" == typeof i[_s2] ? i[_s2] = [i[_s2], decodeURIComponent(_o3)] : i[_s2].push(decodeURIComponent(_o3));
          }return i;
        };

        return _class2;
      }().getParametersFromUrl(e.split("?")[1]);if (null == t.data) return null;var i = atob(t.data).split(":");if (4 !== i.length) return null;var n = i[0],
          s = i[1],
          o = i[2],
          r = i[3];return null != n && 16 >= n.length && null != s && 40 >= s.length && null != o && 40 >= o.length && null != r && 5 >= r.length ? new se(o, s, n, r) : null;
    };

    return se;
  }();

  var oe = null;
  var re = function () {
    function re(e) {
      var _this12 = this;

      _classCallCheck(this, re);

      this.soundElement = document.createElement("audio"), this.hadError = !1, this.error = null, this.soundElement.onerror = function (e) {
        _this12.hadError = !0, _this12.error = e, _this12._handleError();
      }, this.soundElement.src = e, this.soundElement.setAttribute("preload", "auto"), this.soundElement.setAttribute("controls", "none"), this.soundElement.setAttribute("display", "none"), this.soundElement.preload = "autoauto", this.soundElement.abort = console.log, this.openAudioMc = null, this.onFinish = null, this.loop = !1, this.mixer = null, this.channel = null, this.finsishedInitializing = !1;
    }

    re.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    re.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _e17 = this.soundElement.error.code,
            t = null;1 === _e17 ? t = "MEDIA_ERR_ABORTED" : 2 === _e17 ? t = "MEDIA_ERR_NETWORK" : 3 === _e17 ? t = "MEDIA_ERR_DECODE" : 4 === _e17 && (t = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != t && (console.log("[OpenAudioMc] Reporting media failure " + t), this.openAudioMc.socketModule.send("media_failure", { mediaError: t, source: this.soundElement.src }));
      }
    };

    re.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    re.prototype.finalize = function finalize() {
      var _this13 = this;

      return new Promise(function (e) {
        _this13.soundElement.onended = function () {
          _this13.finsishedInitializing && (null != _this13.onFinish && _this13.onFinish(), _this13.loop ? (_this13.setTime(0), _this13.soundElement.play()) : _this13.mixer.removeChannel(_this13.channel));
        };var t = !1;var i = function i() {
          if (!t) {
            var _t7 = _this13.soundElement.play();_t7 instanceof Promise ? _t7.then(e).catch(e) : e();
          }t = !0;
        };_this13.soundElement.onprogress = i, _this13.soundElement.oncanplay = i, _this13.soundElement.oncanplaythrough = i;
      });
    };

    re.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    re.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    re.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish = e;
    };

    re.prototype.setVolume = function setVolume(e) {
      100 < e && (e = 100), this.soundElement.volume = e / 100;
    };

    re.prototype.startDate = function startDate(e) {
      var t = new Date(e),
          i = W((t.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          n = this.soundElement.duration;if (i > n) {
        i -= q(i / n) * n;
      }this.setTime(i);
    };

    re.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    re.prototype.destroy = function destroy() {
      this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return re;
  }();

  for (var ae = [], le = 0; 256 > le; le++) {
    ae[le] = (16 > le ? "0" : "") + le.toString(16);
  }var he = { DEG2RAD: N / 180, RAD2DEG: 180 / N, generateUUID: function generateUUID() {
      var e = 0 | 4294967295 * Math.random(),
          t = 0 | 4294967295 * Math.random(),
          i = 0 | 4294967295 * Math.random(),
          n = 0 | 4294967295 * Math.random();return (ae[255 & e] + ae[255 & e >> 8] + ae[255 & e >> 16] + ae[255 & e >> 24] + "-" + ae[255 & t] + ae[255 & t >> 8] + "-" + ae[64 | 15 & t >> 16] + ae[255 & t >> 24] + "-" + ae[128 | 63 & i] + ae[255 & i >> 8] + "-" + ae[255 & i >> 16] + ae[255 & i >> 24] + ae[255 & n] + ae[255 & n >> 8] + ae[255 & n >> 16] + ae[255 & n >> 24]).toUpperCase();
    }, clamp: function clamp(e, t, i) {
      return H(t, V(i, e));
    }, euclideanModulo: function euclideanModulo(e, t) {
      return (e % t + t) % t;
    }, mapLinear: function mapLinear(e, t, i, n, s) {
      return n + (e - t) * (s - n) / (i - t);
    }, lerp: function lerp(e, t, i) {
      return (1 - i) * e + i * t;
    }, smoothstep: function smoothstep(e, t, i) {
      return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t)) * e * (3 - 2 * e);
    }, smootherstep: function smootherstep(e, t, i) {
      return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t)) * e * e * (e * (6 * e - 15) + 10);
    }, randInt: function randInt(e, t) {
      return e + q(Math.random() * (t - e + 1));
    }, randFloat: function randFloat(e, t) {
      return e + Math.random() * (t - e);
    }, randFloatSpread: function randFloatSpread(e) {
      return e * (.5 - Math.random());
    }, degToRad: function degToRad(e) {
      return e * he.DEG2RAD;
    }, radToDeg: function radToDeg(e) {
      return e * he.RAD2DEG;
    }, isPowerOfTwo: function isPowerOfTwo(e) {
      return 0 == (e & e - 1) && 0 !== e;
    }, ceilPowerOfTwo: function ceilPowerOfTwo(e) {
      return R(2, L(U(e) / F));
    }, floorPowerOfTwo: function floorPowerOfTwo(e) {
      return R(2, q(U(e) / F));
    }, setQuaternionFromProperEuler: function setQuaternionFromProperEuler(e, t, i, n, s) {
      var o = O,
          r = P,
          a = o(i / 2),
          l = r(i / 2),
          h = o((t + n) / 2),
          u = r((t + n) / 2),
          c = o((t - n) / 2),
          d = r((t - n) / 2),
          m = o((n - t) / 2),
          f = r((n - t) / 2);"XYX" === s ? e.set(a * u, l * c, l * d, a * h) : "YZY" === s ? e.set(l * d, a * u, l * c, a * h) : "ZXZ" === s ? e.set(l * c, l * d, a * u, a * h) : "XZX" === s ? e.set(a * u, l * f, l * m, a * h) : "YXY" === s ? e.set(l * m, a * u, l * f, a * h) : "ZYZ" === s ? e.set(l * f, l * m, a * u, a * h) : console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
    } };_extends(r, { slerp: function slerp(e, t, i, n) {
      return i.copy(e).slerp(t, n);
    }, slerpFlat: function slerpFlat(e, t, i, n, s, o, r) {
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
            b = 1 - g * g;if (b > I) {
          var w = T(b),
              v = B(w, g * y);p = P(p * v) / w, r = P(r * v) / w;
        }var _ = r * y;if (a = a * p + c * _, l = l * p + d * _, h = h * p + m * _, u = u * p + f * _, p == 1 - r) {
          var x = 1 / T(a * a + l * l + h * h + u * u);a *= x, l *= x, h *= x, u *= x;
        }
      }e[t] = a, e[t + 1] = l, e[t + 2] = h, e[t + 3] = u;
    }, multiplyQuaternionsFlat: function multiplyQuaternionsFlat(e, t, i, n, s, o) {
      var r = i[n],
          a = i[n + 1],
          l = i[n + 2],
          h = i[n + 3],
          u = s[o],
          c = s[o + 1],
          d = s[o + 2],
          m = s[o + 3];return e[t] = r * m + h * u + a * d - l * c, e[t + 1] = a * m + h * c + l * u - r * d, e[t + 2] = l * m + h * d + r * c - a * u, e[t + 3] = h * m - r * u - a * c - l * d, e;
    } }), Object.defineProperties(r.prototype, { x: { get: function get() {
        return this._x;
      }, set: function set(e) {
        this._x = e, this._onChangeCallback();
      } }, y: { get: function get() {
        return this._y;
      }, set: function set(e) {
        this._y = e, this._onChangeCallback();
      } }, z: { get: function get() {
        return this._z;
      }, set: function set(e) {
        this._z = e, this._onChangeCallback();
      } }, w: { get: function get() {
        return this._w;
      }, set: function set(e) {
        this._w = e, this._onChangeCallback();
      } } }), _extends(r.prototype, { isQuaternion: !0, set: function set(e, t, i, n) {
      return this._x = e, this._y = t, this._z = i, this._w = n, this._onChangeCallback(), this;
    }, clone: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }, copy: function copy(e) {
      return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
    }, setFromEuler: function setFromEuler(e, t) {
      if (!e || !e.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var i = e._x,
          n = e._y,
          s = e._z,
          o = e.order,
          r = O,
          a = P,
          l = r(i / 2),
          h = r(n / 2),
          u = r(s / 2),
          c = a(i / 2),
          d = a(n / 2),
          m = a(s / 2);return "XYZ" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u - c * d * m) : "YXZ" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u + c * d * m) : "ZXY" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u - c * d * m) : "ZYX" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u + c * d * m) : "YZX" === o ? (this._x = c * h * u + l * d * m, this._y = l * d * u + c * h * m, this._z = l * h * m - c * d * u, this._w = l * h * u - c * d * m) : "XZY" === o ? (this._x = c * h * u - l * d * m, this._y = l * d * u - c * h * m, this._z = l * h * m + c * d * u, this._w = l * h * u + c * d * m) : console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o), !1 !== t && this._onChangeCallback(), this;
    }, setFromAxisAngle: function setFromAxisAngle(e, t) {
      var i = t / 2,
          n = P(i);return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = O(i), this._onChangeCallback(), this;
    }, setFromRotationMatrix: function setFromRotationMatrix(e) {
      var t,
          i = e.elements,
          n = i[0],
          s = i[4],
          o = i[8],
          r = i[1],
          a = i[5],
          l = i[9],
          h = i[2],
          u = i[6],
          c = i[10],
          d = n + a + c;return 0 < d ? (t = .5 / T(d + 1), this._w = .25 / t, this._x = (u - l) * t, this._y = (o - h) * t, this._z = (r - s) * t) : n > a && n > c ? (t = 2 * T(1 + n - a - c), this._w = (u - l) / t, this._x = .25 * t, this._y = (s + r) / t, this._z = (o + h) / t) : a > c ? (t = 2 * T(1 + a - n - c), this._w = (o - h) / t, this._x = (s + r) / t, this._y = .25 * t, this._z = (l + u) / t) : (t = 2 * T(1 + c - n - a), this._w = (r - s) / t, this._x = (o + h) / t, this._y = (l + u) / t, this._z = .25 * t), this._onChangeCallback(), this;
    }, setFromUnitVectors: function setFromUnitVectors(e, t) {
      var i = e.dot(t) + 1;return i < 1e-6 ? (i = 0, W(e.x) > W(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
    }, rotateTowards: function rotateTowards(e, t) {
      var i = this.angleTo(e);if (0 === i) return this;var n = V(1, t / i);return this.slerp(e, n), this;
    }, inverse: function inverse() {
      return this.conjugate();
    }, conjugate: function conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }, dot: function dot(e) {
      return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
    }, lengthSq: function lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }, length: function length() {
      return T(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }, normalize: function normalize() {
      var e = this.length();return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
    }, multiply: function multiply(e, t) {
      return void 0 === t ? this.multiplyQuaternions(this, e) : (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t));
    }, premultiply: function premultiply(e) {
      return this.multiplyQuaternions(e, this);
    }, multiplyQuaternions: function multiplyQuaternions(e, t) {
      var i = e._x,
          n = e._y,
          s = e._z,
          o = e._w,
          r = t._x,
          a = t._y,
          l = t._z,
          h = t._w;return this._x = i * h + o * r + n * l - s * a, this._y = n * h + o * a + s * r - i * l, this._z = s * h + o * l + i * a - n * r, this._w = o * h - i * r - n * a - s * l, this._onChangeCallback(), this;
    }, slerp: function slerp(e, t) {
      if (0 === t) return this;if (1 === t) return this.copy(e);var i = this._x,
          n = this._y,
          s = this._z,
          o = this._w,
          r = o * e._w + i * e._x + n * e._y + s * e._z;if (0 > r ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, r = -r) : this.copy(e), 1 <= r) return this._w = o, this._x = i, this._y = n, this._z = s, this;var a = 1 - r * r;if (a <= I) {
        var l = 1 - t;return this._w = l * o + t * this._w, this._x = l * i + t * this._x, this._y = l * n + t * this._y, this._z = l * s + t * this._z, this.normalize(), this._onChangeCallback(), this;
      }var h = T(a),
          u = B(h, r),
          c = P((1 - t) * u) / h,
          d = P(t * u) / h;return this._w = o * c + this._w * d, this._x = i * c + this._x * d, this._y = n * c + this._y * d, this._z = s * c + this._z * d, this._onChangeCallback(), this;
    }, equals: function equals(e) {
      return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
    }, fromArray: function fromArray(e, t) {
      return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
    }, toArray: function toArray(e, t) {
      return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
    }, fromBufferAttribute: function fromBufferAttribute(e, t) {
      return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this;
    }, _onChange: function _onChange(e) {
      return this._onChangeCallback = e, this;
    }, _onChangeCallback: function _onChangeCallback() {} });var ue = new a(),
      ce = new r();_extends(a.prototype, { isVector3: !0, set: function set(e, t, i) {
      return this.x = e, this.y = t, this.z = i, this;
    }, setScalar: function setScalar(e) {
      return this.x = e, this.y = e, this.z = e, this;
    }, setX: function setX(e) {
      return this.x = e, this;
    }, setY: function setY(e) {
      return this.y = e, this;
    }, setZ: function setZ(e) {
      return this.z = e, this;
    }, setComponent: function setComponent(e, t) {
      switch (e) {case 0:
          this.x = t;break;case 1:
          this.y = t;break;case 2:
          this.z = t;break;default:
          throw new Error("index is out of range: " + e);}return this;
    }, getComponent: function getComponent(e) {
      switch (e) {case 0:
          return this.x;case 1:
          return this.y;case 2:
          return this.z;default:
          throw new Error("index is out of range: " + e);}
    }, clone: function clone() {
      return new this.constructor(this.x, this.y, this.z);
    }, copy: function copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this;
    }, add: function add(e, t) {
      return void 0 === t ? (this.x += e.x, this.y += e.y, this.z += e.z, this) : (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t));
    }, addScalar: function addScalar(e) {
      return this.x += e, this.y += e, this.z += e, this;
    }, addVectors: function addVectors(e, t) {
      return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
    }, addScaledVector: function addScaledVector(e, t) {
      return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
    }, sub: function sub(e, t) {
      return void 0 === t ? (this.x -= e.x, this.y -= e.y, this.z -= e.z, this) : (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t));
    }, subScalar: function subScalar(e) {
      return this.x -= e, this.y -= e, this.z -= e, this;
    }, subVectors: function subVectors(e, t) {
      return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
    }, multiply: function multiply(e, t) {
      return void 0 === t ? (this.x *= e.x, this.y *= e.y, this.z *= e.z, this) : (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t));
    }, multiplyScalar: function multiplyScalar(e) {
      return this.x *= e, this.y *= e, this.z *= e, this;
    }, multiplyVectors: function multiplyVectors(e, t) {
      return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
    }, applyEuler: function applyEuler(e) {
      return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(ce.setFromEuler(e));
    }, applyAxisAngle: function applyAxisAngle(e, t) {
      return this.applyQuaternion(ce.setFromAxisAngle(e, t));
    }, applyMatrix3: function applyMatrix3(e) {
      var t = this.x,
          i = this.y,
          n = this.z,
          s = e.elements;return this.x = s[0] * t + s[3] * i + s[6] * n, this.y = s[1] * t + s[4] * i + s[7] * n, this.z = s[2] * t + s[5] * i + s[8] * n, this;
    }, applyNormalMatrix: function applyNormalMatrix(e) {
      return this.applyMatrix3(e).normalize();
    }, applyMatrix4: function applyMatrix4(e) {
      var t = this.x,
          i = this.y,
          n = this.z,
          s = e.elements,
          o = 1 / (s[3] * t + s[7] * i + s[11] * n + s[15]);return this.x = (s[0] * t + s[4] * i + s[8] * n + s[12]) * o, this.y = (s[1] * t + s[5] * i + s[9] * n + s[13]) * o, this.z = (s[2] * t + s[6] * i + s[10] * n + s[14]) * o, this;
    }, applyQuaternion: function applyQuaternion(e) {
      var t = this.x,
          i = this.y,
          n = this.z,
          s = e.x,
          o = e.y,
          r = e.z,
          a = e.w,
          l = a * t + o * n - r * i,
          h = a * i + r * t - s * n,
          u = a * n + s * i - o * t,
          c = -s * t - o * i - r * n;return this.x = l * a + c * -s + h * -r - u * -o, this.y = h * a + c * -o + u * -s - l * -r, this.z = u * a + c * -r + l * -o - h * -s, this;
    }, project: function project(e) {
      return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
    }, unproject: function unproject(e) {
      return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
    }, transformDirection: function transformDirection(e) {
      var t = this.x,
          i = this.y,
          n = this.z,
          s = e.elements;return this.x = s[0] * t + s[4] * i + s[8] * n, this.y = s[1] * t + s[5] * i + s[9] * n, this.z = s[2] * t + s[6] * i + s[10] * n, this.normalize();
    }, divide: function divide(e) {
      return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
    }, divideScalar: function divideScalar(e) {
      return this.multiplyScalar(1 / e);
    }, min: function min(e) {
      return this.x = V(this.x, e.x), this.y = V(this.y, e.y), this.z = V(this.z, e.z), this;
    }, max: function max(e) {
      return this.x = H(this.x, e.x), this.y = H(this.y, e.y), this.z = H(this.z, e.z), this;
    }, clamp: function clamp(e, t) {
      return this.x = H(e.x, V(t.x, this.x)), this.y = H(e.y, V(t.y, this.y)), this.z = H(e.z, V(t.z, this.z)), this;
    }, clampScalar: function clampScalar(e, t) {
      return this.x = H(e, V(t, this.x)), this.y = H(e, V(t, this.y)), this.z = H(e, V(t, this.z)), this;
    }, clampLength: function clampLength(e, t) {
      var i = this.length();return this.divideScalar(i || 1).multiplyScalar(H(e, V(t, i)));
    }, floor: function floor() {
      return this.x = q(this.x), this.y = q(this.y), this.z = q(this.z), this;
    }, ceil: function ceil() {
      return this.x = L(this.x), this.y = L(this.y), this.z = L(this.z), this;
    }, round: function round() {
      return this.x = j(this.x), this.y = j(this.y), this.z = j(this.z), this;
    }, roundToZero: function roundToZero() {
      return this.x = 0 > this.x ? L(this.x) : q(this.x), this.y = 0 > this.y ? L(this.y) : q(this.y), this.z = 0 > this.z ? L(this.z) : q(this.z), this;
    }, negate: function negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }, dot: function dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z;
    }, lengthSq: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }, length: function length() {
      return T(this.x * this.x + this.y * this.y + this.z * this.z);
    }, manhattanLength: function manhattanLength() {
      return W(this.x) + W(this.y) + W(this.z);
    }, normalize: function normalize() {
      return this.divideScalar(this.length() || 1);
    }, setLength: function setLength(e) {
      return this.normalize().multiplyScalar(e);
    }, lerp: function lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
    }, lerpVectors: function lerpVectors(e, t, i) {
      return this.subVectors(t, e).multiplyScalar(i).add(e);
    }, cross: function cross(e, t) {
      return void 0 === t ? this.crossVectors(this, e) : (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t));
    }, crossVectors: function crossVectors(e, t) {
      var i = e.x,
          n = e.y,
          s = e.z,
          o = t.x,
          r = t.y,
          a = t.z;return this.x = n * a - s * r, this.y = s * o - i * a, this.z = i * r - n * o, this;
    }, projectOnVector: function projectOnVector(e) {
      var t = e.lengthSq();if (0 === t) return this.set(0, 0, 0);var i = e.dot(this) / t;return this.copy(e).multiplyScalar(i);
    }, projectOnPlane: function projectOnPlane(e) {
      return ue.copy(this).projectOnVector(e), this.sub(ue);
    }, reflect: function reflect(e) {
      return this.sub(ue.copy(e).multiplyScalar(2 * this.dot(e)));
    }, angleTo: function angleTo(e) {
      var t = T(this.lengthSq() * e.lengthSq());if (0 === t) return N / 2;var i = this.dot(e) / t;return Math.acos(he.clamp(i, -1, 1));
    }, distanceTo: function distanceTo(e) {
      return T(this.distanceToSquared(e));
    }, distanceToSquared: function distanceToSquared(e) {
      var t = this.x - e.x,
          i = this.y - e.y,
          n = this.z - e.z;return t * t + i * i + n * n;
    }, manhattanDistanceTo: function manhattanDistanceTo(e) {
      return W(this.x - e.x) + W(this.y - e.y) + W(this.z - e.z);
    }, setFromSpherical: function setFromSpherical(e) {
      return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
    }, setFromSphericalCoords: function setFromSphericalCoords(e, t, i) {
      var n = P(t) * e;return this.x = n * P(i), this.y = O(t) * e, this.z = n * O(i), this;
    }, setFromCylindrical: function setFromCylindrical(e) {
      return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
    }, setFromCylindricalCoords: function setFromCylindricalCoords(e, t, i) {
      return this.x = e * P(t), this.y = i, this.z = e * O(t), this;
    }, setFromMatrixPosition: function setFromMatrixPosition(e) {
      var t = e.elements;return this.x = t[12], this.y = t[13], this.z = t[14], this;
    }, setFromMatrixScale: function setFromMatrixScale(e) {
      var t = this.setFromMatrixColumn(e, 0).length(),
          i = this.setFromMatrixColumn(e, 1).length(),
          n = this.setFromMatrixColumn(e, 2).length();return this.x = t, this.y = i, this.z = n, this;
    }, setFromMatrixColumn: function setFromMatrixColumn(e, t) {
      return this.fromArray(e.elements, 4 * t);
    }, setFromMatrix3Column: function setFromMatrix3Column(e, t) {
      return this.fromArray(e.elements, 3 * t);
    }, equals: function equals(e) {
      return e.x === this.x && e.y === this.y && e.z === this.z;
    }, fromArray: function fromArray(e, t) {
      return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
    }, toArray: function toArray(e, t) {
      return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
    }, fromBufferAttribute: function fromBufferAttribute(e, t, i) {
      return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
    }, random: function random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }, square: function square(e) {
      return e * e;
    }, distance: function distance(e) {
      var t = this.square(this.x - e.x) + this.square(this.y - e.y) + this.square(this.z - e.z);return T(t);
    } });var de = "SPEAKER_3D",
      me = "SPEAKER_2D";
  var fe = function () {
    function fe(e, t, i, n, s) {
      _classCallCheck(this, fe);

      if (!(e instanceof String)) throw new Error("Argument 1 must be an id");if (!(t instanceof String)) throw new Error("Argument 2 must be a source");if (!(i instanceof a)) throw new Error("Argument 3 must be a Vector");if (n != me && n != de) throw new Error("A speaker must be 2d or 3d");this.id = e, this.source = t, this.location = i, this.type = n, this.maxDistance = s;
    }

    fe.prototype.initialize = function initialize() {};

    fe.prototype.onPlayerLocationUpdate = function onPlayerLocationUpdate(e, t) {
      if (this.type == de) ;else if (this.type == me) {
        var _e18 = t.location.distance(this.location);this._convertDistanceToVolume(this.maxDistance, _e18);
      }
    };

    fe.prototype.onRemove = function onRemove() {
      console.log("Killing myself " + this);
    };

    fe.prototype._convertDistanceToVolume = function _convertDistanceToVolume(e, t) {
      return j((e - t) / e * 100);
    };

    return fe;
  }();

  var pe = function () {
    function pe(e) {
      var _this14 = this;

      _classCallCheck(this, pe);

      function t(t, i) {
        e.socketModule.registerHandler(t, i);
      }this.openAudioMc = e, t("ClientCreateMediaPayload", function (t) {
        var i = t.media.loop,
            n = t.media.startInstant,
            s = t.media.mediaId,
            o = t.media.source,
            r = t.media.doPickup,
            a = t.media.fadeTime,
            l = t.distance,
            h = t.media.flag,
            u = t.maxDistance;var c = 100;null != t.media.volume && 0 != t.media.volume && (c = t.media.volume), e.getMediaManager().destroySounds(s, !1, !0);var d = new X(s),
            m = new re(o);m.openAudioMc = e, m.setOa(e), r && m.startDate(n, !0), m.finalize().then(function () {
          if (r && m.startDate(n, !0), e.getMediaManager().mixer.addChannel(d), d.addSound(m), d.setChannelVolume(0), m.setLooping(i), d.setTag(s), 0 !== u) {
            var _e19 = _this14.convertDistanceToVolume(u, l);d.setTag("SPECIAL"), d.maxDistance = u, d.fadeChannel(_e19, a);
          } else d.setTag("DEFAULT"), setTimeout(function () {
            0 === a ? (d.setChannelVolume(c), d.updateFromMasterVolume()) : (d.updateFromMasterVolume(), d.fadeChannel(c, a));
          }, 1);d.setTag(h), e.getMediaManager().mixer.updateCurrent(), m.finish();
        });
      }), t("ClientDestroyCardPayload", function () {
        document.getElementById("card-panel").style.display = "none";
      }), t("ClientUpdateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new ne().replaceWithJson(e.id, t);
      }), t("ClientCreateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new ne(t);
      }), t("NotificationPayload", function (e) {
        var t = e.message;_this14.openAudioMc.notificationModule.sendNotification(e.title, t), new $("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + t);
      }), t("ClientSettingsPayload", function (t) {
        _this14.openAudioMc.debugPrint("Updating settings...");var i = t.clientSettings,
            n = i.background,
            s = i.title,
            o = i.welcomeMessage,
            r = i.errorMessage,
            a = i.hueConnected,
            l = i.hueLinking,
            h = i.hueBridgeFound;"default" !== a && (e.getMessages().hueConnected = a), "default" !== l && (e.getMessages().hueLinking = l), "default" !== h && (e.getMessages().hueWelcome = h), "default" !== r && (e.getMessages().errorMessage = r), "default" !== o && (e.getMessages().welcomeMessage = o), "default" !== n && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + n + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== s && (document.title = s), e.getMessages().apply();
      }), t("ClientVersionPayload", function (t) {
        parseInt(t.protocolRevision), console.log("[OpenAudioMc] Received PROTOCOL revision update"), function () {
          return 2;
        } && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), e.socketModule.callbacksEnabled = !0);
      }), t("ClientVolumePayload", function (e) {
        var t = e.volume;_this14.openAudioMc.getMediaManager().setMasterVolume(t), document.getElementById("volume-slider").value = t;
      }), t("ClientDestroyMediaPayload", function (e) {
        _this14.openAudioMc.getMediaManager().destroySounds(e.soundId, e.all);
      }), t("HueColorPayload", function (t) {
        var i = t.lights,
            n = t.hueColor,
            s = "rgba(" + n.r + "," + n.g + "," + n.b + "," + function (e, t, i) {
          return (e - t[0]) * (i[1] - i[0]) / (t[1] - t[0]) + i[0];
        }(n.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(i, s);
      }), t("ClientUpdateMediaPayload", function (t) {
        var i = t.mediaOptions.target,
            n = t.mediaOptions.fadeTime,
            s = t.mediaOptions.distance;var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = e.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var _t8 = _step16.value;
            _t8.hasTag(i) && _t8.fadeChannel(_this14.convertDistanceToVolume(_t8.maxDistance, s), n);
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
      }), t("ClientPlayerLocationPayload", function (e) {
        var t = e.x,
            i = e.y,
            n = e.z,
            s = e.pitch,
            o = e.yaw;_this14.openAudioMc.world.player.updateLocation(new a(t, i, n), s, o);
      }), t("ClientSpeakerCreatePayload", function (e) {
        var t = e.clientSpeaker,
            i = new fe(t.id, t.source, new a(t.location.x, t.location.y, t.location.z), t.type, t.maxDistance);console.log("Created speaker " + i), _this14.openAudioMc.world.addSpeaker(t.id, i);
      }), t("ClientSpeakerDestroyPayload", function (e) {
        var t = e.clientSpeaker;_this14.openAudioMc.world.removeSpeaker(t.id);
      });
    }

    pe.prototype.convertDistanceToVolume = function convertDistanceToVolume(e, t) {
      return j((e - t) / e * 100);
    };

    return pe;
  }();

  var ge = function () {
    function ge() {
      var _this15 = this;

      _classCallCheck(this, ge);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this15.select();
        };
      });
    }

    ge.prototype.setBridgeName = function setBridgeName(e) {
      document.getElementById("bridge-name").innerText = e;
    };

    ge.prototype.select = function select() {
      this.updateState();
    };

    ge.prototype.applyState = function applyState() {
      var _this16 = this;

      this.state.forEach(function (e) {
        _this16.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    ge.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this17.state.push(_this17.obtainSelection(e));
      }), Cookies.set("hue-state", this.state);
    };

    ge.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          i = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: i };
    };

    ge.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    ge.prototype.getInputById = function getInputById(e) {
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = this.dropdowns[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var t = _step17.value;
          if (t.dataset.bulb == e) return t;
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

    ge.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    ge.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return ge;
  }();

  var ye = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (ye.arrayBuffer) var be = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      we = ArrayBuffer.isView || function (e) {
    return e && -1 < be.indexOf(Object.prototype.toString.call(e));
  };c.prototype.append = function (e, t) {
    e = l(e), t = h(t);var i = this.map[e];this.map[e] = i ? i + ", " + t : t;
  }, c.prototype.delete = function (e) {
    delete this.map[l(e)];
  }, c.prototype.get = function (e) {
    return e = l(e), this.has(e) ? this.map[e] : null;
  }, c.prototype.has = function (e) {
    return this.map.hasOwnProperty(l(e));
  }, c.prototype.set = function (e, t) {
    this.map[l(e)] = h(t);
  }, c.prototype.forEach = function (e, t) {
    for (var i in this.map) {
      this.map.hasOwnProperty(i) && e.call(t, this.map[i], i, this);
    }
  }, c.prototype.keys = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push(i);
    }), u(e);
  }, c.prototype.values = function () {
    var e = [];return this.forEach(function (t) {
      e.push(t);
    }), u(e);
  }, c.prototype.entries = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push([i, t]);
    }), u(e);
  }, ye.iterable && (c.prototype[Symbol.iterator] = c.prototype.entries);var ve = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];y.prototype.clone = function () {
    return new y(this, { body: this._bodyInit });
  }, g.call(y.prototype), g.call(v.prototype), v.prototype.clone = function () {
    return new v(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new c(this.headers), url: this.url });
  }, v.error = function () {
    var e = new v(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var _e = [301, 302, 303, 307, 308];v.redirect = function (e, t) {
    if (-1 === _e.indexOf(t)) throw new RangeError("Invalid status code");return new v(null, { status: t, headers: { location: e } });
  };var xe = self.DOMException;try {
    new xe();
  } catch (t) {
    (xe = function xe(e, t) {
      this.message = e, this.name = t;var i = Error(e);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), xe.prototype.constructor = xe;
  }_.polyfill = !0, self.fetch || (self.fetch = _, self.Headers = c, self.Request = y, self.Response = v);
  var Me = function () {
    function Me(e) {
      _classCallCheck(this, Me);

      this.host = e;
    }

    Me.prototype.route = function route(e) {
      var _this18 = this;

      return new Promise(function (t, i) {
        _this18.tokenSet = new se().fromUrl(window.location.href), _(_this18.host + "/api/v1/client/login/" + _this18.tokenSet.publicServerKey).then(function (n) {
          n.json().then(function (n) {
            if (null == n.errors || 0 != n.errors.length) return i(n.errors), void console.log(n.errors);var s = n.response,
                r = s.secureEndpoint;null == r && (r = s.insecureEndpoint), console.log("[OpenAudioMc] accepting and applying settings"), e.debugPrint("Updating settings...");var a = s.backgroundImage,
                l = s.title,
                h = s.clientWelcomeMessage,
                u = s.clientErrorMessage;var c = "";o(u).childNodes.forEach(function (e) {
              c += e.outerHTML;
            });var d = "";o(h).childNodes.forEach(function (e) {
              d += e.outerHTML;
            }), "" !== u && (e.getMessages().errorMessage = c), "" !== h && (e.getMessages().welcomeMessage = d);var m = s.greetingMessage;if (m = m.replace("%name", e.tokenSet.name), document.getElementById("welcome-text-landing").innerHTML = m, document.getElementById("boot-button").style.display = "", document.getElementById("boot-button").innerHTML = s.connectButtonText, e.getUserInterfaceModule().changeColor("#304FFE", s.accentColor), "" != s.startSound) {
              var _t9 = new X("startsound"),
                  _i5 = new re(s.startSound);_i5.openAudioMc = e, _i5.setOa(e), _i5.finalize().then(function () {
                e.getMediaManager().mixer.addChannel(_t9), _t9.addSound(_i5), _t9.setChannelVolume(100), _t9.updateFromMasterVolume(), _i5.finish();
              });
            }"default" !== l && (document.title = l), t({ host: r, background: a });
          }).catch(function (e) {
            console.log("Dead end 1"), i(e);
          });
        }).catch(function (e) {
          console.log("Dead end 2"), i(e);
        });
      });
    };

    return Me;
  }();

  var Ee = function (_$) {
    _inherits(Ee, _$);

    function Ee(e, t, i) {
      var _this19;

      _classCallCheck(this, Ee);

      (_this19 = _possibleConstructorReturn(this, _$.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this19), _this19.room = e, _this19.username = t, _this19.isMuted = !1, _this19.member = i;var n = '<img class="call-box" src="https://minotar.net/avatar/' + t + '" />';n += '<div class="call-content" id="user-box-content-' + t + '">', n += '<div style="text-align: center;"><p>(loading)</p></div>', n += "</div>", _this19.show(n, !0), _this19.setUsernameAsContent(), document.getElementById("user-box-content-" + _this19.username).onmouseenter = function () {
        _this19.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onmouseout = function () {
        _this19.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onclick = function () {
        _this19.room.main.tokenSet.name !== _this19.username && _this19.onClickHandler();
      };return _this19;
    }

    Ee.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    Ee.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    Ee.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return Ee;
  }($);

  x.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, x.prototype.compileInterpolationFunction = function () {
    for (var e = "var bufferLength = Math.min(buffer.length, this.outputBufferSize);\tif ((bufferLength % " + this.channels + ") == 0) {\t\tif (bufferLength > 0) {\t\t\tvar ratioWeight = this.ratioWeight;\t\t\tvar weight = 0;", t = 0; t < this.channels; ++t) {
      e += "var output" + t + " = 0;";
    }for (e += "var actualPosition = 0;\t\t\tvar amountToNext = 0;\t\t\tvar alreadyProcessedTail = !this.tailExists;\t\t\tthis.tailExists = false;\t\t\tvar outputBuffer = this.outputBuffer;\t\t\tvar outputOffset = 0;\t\t\tvar currentPosition = 0;\t\t\tdo {\t\t\t\tif (alreadyProcessedTail) {\t\t\t\t\tweight = ratioWeight;", t = 0; t < this.channels; ++t) {
      e += "output" + t + " = 0;";
    }for (e += "}\t\t\t\telse {\t\t\t\t\tweight = this.lastWeight;", t = 0; t < this.channels; ++t) {
      e += "output" + t + " = this.lastOutput[" + t + "];";
    }for (e += "alreadyProcessedTail = true;\t\t\t\t}\t\t\t\twhile (weight > 0 && actualPosition < bufferLength) {\t\t\t\t\tamountToNext = 1 + actualPosition - currentPosition;\t\t\t\t\tif (weight >= amountToNext) {", t = 0; t < this.channels; ++t) {
      e += "output" + t + " += buffer[actualPosition++] * amountToNext;";
    }for (e += "currentPosition = actualPosition;\t\t\t\t\t\tweight -= amountToNext;\t\t\t\t\t}\t\t\t\t\telse {", t = 0; t < this.channels; ++t) {
      e += "output" + t + " += buffer[actualPosition" + (0 < t ? " + " + t : "") + "] * weight;";
    }for (e += "currentPosition += weight;\t\t\t\t\t\tweight = 0;\t\t\t\t\t\tbreak;\t\t\t\t\t}\t\t\t\t}\t\t\t\tif (weight == 0) {", t = 0; t < this.channels; ++t) {
      e += "outputBuffer[outputOffset++] = output" + t + " / ratioWeight;";
    }for (e += "}\t\t\t\telse {\t\t\t\t\tthis.lastWeight = weight;", t = 0; t < this.channels; ++t) {
      e += "this.lastOutput[" + t + "] = output" + t + ";";
    }e += 'this.tailExists = true;\t\t\t\t\tbreak;\t\t\t\t}\t\t\t} while (actualPosition < bufferLength);\t\t\treturn this.bufferSlice(outputOffset);\t\t}\t\telse {\t\t\treturn (this.noReturn) ? 0 : [];\t\t}\t}\telse {\t\tthrow(new Error("Buffer was of incorrect sample length."));\t}', this.interpolate = Function("buffer", e);
  }, x.prototype.bypassResampler = function (e) {
    return this.noReturn ? (this.outputBuffer = e, e.length) : e;
  }, x.prototype.bufferSlice = function (e) {
    if (this.noReturn) return e;try {
      return this.outputBuffer.subarray(0, e);
    } catch (t) {
      try {
        return this.outputBuffer.length = e, this.outputBuffer;
      } catch (t) {
        return this.outputBuffer.slice(0, e);
      }
    }
  }, x.prototype.initializeBuffers = function () {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
    } catch (e) {
      this.outputBuffer = [], this.lastOutput = [];
    }
  }, M.prototype.MOZWriteAudio = function (e) {
    this.MOZWriteAudioNoCallback(e), this.MOZExecuteCallback();
  }, M.prototype.MOZWriteAudioNoCallback = function (e) {
    this.writeMozAudio(e);
  }, M.prototype.callbackBasedWriteAudio = function (e) {
    this.callbackBasedWriteAudioNoCallback(e), this.callbackBasedExecuteCallback();
  }, M.prototype.callbackBasedWriteAudioNoCallback = function (e) {
    if (e) for (var t = e.length, i = 0; i < t && Ue < Ie;) {
      ze[Ue++] = e[i++];
    }
  }, M.prototype.writeAudio = function (e) {
    0 == this.audioType ? this.MOZWriteAudio(e) : 1 == this.audioType ? this.callbackBasedWriteAudio(e) : 2 == this.audioType && (this.checkFlashInit() || Ae ? this.callbackBasedWriteAudio(e) : this.mozAudioFound && this.MOZWriteAudio(e));
  }, M.prototype.writeAudioNoCallback = function (e) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(e) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(e) : 2 == this.audioType && (this.checkFlashInit() || Ae ? this.callbackBasedWriteAudioNoCallback(e) : this.mozAudioFound && this.MOZWriteAudioNoCallback(e));
  }, M.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (A() * Fe.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Ue;if (2 == this.audioType) {
      if (this.checkFlashInit() || Ae) return (A() * Fe.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Ue;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, M.prototype.MOZExecuteCallback = function () {
    var e = Te - this.remainingBuffer();0 < e && this.writeMozAudio(this.underRunCallback(e));
  }, M.prototype.callbackBasedExecuteCallback = function () {
    var e = Te - this.remainingBuffer();0 < e && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(e));
  }, M.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || Ae ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
  }, M.prototype.initializeAudio = function () {
    try {
      if (this.preInitializeMozAudio(), "Linux i686" == navigator.platform) throw new Error("");this.initializeMozAudio();
    } catch (e) {
      try {
        this.initializeWebAudio();
      } catch (e) {
        try {
          this.initializeFlashAudio();
        } catch (e) {
          throw new Error("Browser does not support real time audio output.");
        }
      }
    }
  }, M.prototype.preInitializeMozAudio = function () {
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, Oe), this.samplesAlreadyWritten = 0;var e = 2 == this.audioChannels ? [0, 0] : [0],
        t = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        t += this.audioHandleMoz.mozWriteAudio(e);
      }for (var i = t / this.audioChannels, n = 0; n < i; n++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(e);
      }
    }this.samplesAlreadyWritten += t, Te += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, M.prototype.initializeMozAudio = function () {
    this.writeMozAudio(E(Te)), this.audioType = 0;
  }, M.prototype.initializeWebAudio = function () {
    if (!Ae) throw new Error("");z(Pe), this.audioType = 1;
  }, M.prototype.initializeFlashAudio = function () {
    var e = document.getElementById("XAudioJS");if (null == e) {
      var t = this,
          i = document.createElement("div");i.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var n = document.createElement("div");n.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), n.setAttribute("id", "XAudioJS"), i.appendChild(n), document.getElementsByTagName("body")[0].appendChild(i), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (e) {
        e.success ? t.audioHandleFlash = e.ref : t.audioType = 1;
      });
    } else this.audioHandleFlash = e;this.audioType = 2;
  }, M.prototype.writeMozAudio = function (e) {
    if (e) {
      var t = this.mozAudioTail.length;if (0 < t) {
        var i = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += i, this.mozAudioTail.splice(0, i);
      }t = V(e.length, Ie - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(e);this.samplesAlreadyWritten += i;for (var n = 0; t > i; --t) {
        this.mozAudioTail.push(e[n++]);
      }
    }
  }, M.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, Le), z(44100)), this.flashInitialized;
  };var ke,
      Se,
      Ce = 2048,
      Ae = !1,
      ze = [],
      Be = [],
      Te = 15e3,
      Ie = 25e3,
      Pe = 44100,
      Oe = 0,
      Re = !1,
      Le = 0,
      Fe = null,
      Ue = 0,
      He = 0,
      Ve = 0,
      Ne = 2,
      De = x;!function (e) {
    e[e.VoIP = 2048] = "VoIP", e[e.Audio = 2049] = "Audio", e[e.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(ke || (ke = {})), function (e) {
    e[e.OK = 0] = "OK", e[e.BadArgument = -1] = "BadArgument", e[e.BufferTooSmall = -2] = "BufferTooSmall", e[e.InternalError = -3] = "InternalError", e[e.InvalidPacket = -4] = "InvalidPacket", e[e.Unimplemented = -5] = "Unimplemented", e[e.InvalidState = -6] = "InvalidState", e[e.AllocFail = -7] = "AllocFail";
  }(Se || (Se = {}));var We = function () {
    function e() {}return e.getVersion = function () {
      var e = _opus_get_version_string();return Pointer_stringify(e);
    }, e.getMaxFrameSize = function (e) {
      return void 0 === e && (e = 1), 3832 * e;
    }, e.getMinFrameDuration = function () {
      return 2.5;
    }, e.getMaxFrameDuration = function () {
      return 60;
    }, e.validFrameDuration = function (e) {
      return [2.5, 5, 10, 20, 40, 60].some(function (t) {
        return t == e;
      });
    }, e.getMaxSamplesPerChannel = function (t) {
      return t / 1e3 * e.getMaxFrameDuration();
    }, e;
  }(),
      je = function () {
    function e(e, t, i, n) {
      if (void 0 === n && (n = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !We.validFrameDuration(n)) throw "invalid frame duration";this.frame_size = e * n / 1e3;var s = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(e, t, i, s), 0 != getValue(s, "i32")) throw "opus_encoder_create failed: " + getValue(s, "i32");this.in_ptr = _malloc(this.frame_size * t * 4), this.in_len = this.frame_size * t, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = We.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return e.prototype.encode = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_i16.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var s = new ArrayBuffer(n);new Uint8Array(s).set(this.out_buf.subarray(0, n)), t.push(s);
      }return i < e.length && (this.in_i16.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_float = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_f32.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var s = new ArrayBuffer(n);new Uint8Array(s).set(this.out_buf.subarray(0, n)), t.push(s);
      }return i < e.length && (this.in_f32.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var e = this.in_off; e < this.in_len; ++e) {
        this.in_i16[e] = 0;
      }var t = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= t) throw "opus_encode failed: " + t;var i = new ArrayBuffer(t);return new Uint8Array(i).set(this.out_buf.subarray(0, t)), i;
    }, e.prototype.encode_float_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var e = this.in_off; e < this.in_len; ++e) {
        this.in_f32[e] = 0;
      }var t = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= t) throw "opus_encode failed: " + t;var i = new ArrayBuffer(t);return new Uint8Array(i).set(this.out_buf.subarray(0, t)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_encoder_destroy(this.handle), _free(this.in_ptr), this.handle = this.in_ptr = 0);
    }, e;
  }(),
      qe = function () {
    function e(e, t) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = t;var i = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(e, t, i), 0 != getValue(i, "i32")) throw "opus_decoder_create failed: " + getValue(i, "i32");this.in_ptr = _malloc(We.getMaxFrameSize(t)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + We.getMaxFrameSize(t)), this.out_len = We.getMaxSamplesPerChannel(e);var n = this.out_len * t * 4;this.out_ptr = _malloc(n), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + n >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + n >> 2);
    }return e.prototype.decode = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Int16Array(t * this.channels);return i.set(this.out_i16.subarray(0, i.length)), i;
    }, e.prototype.decode_float = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode_float(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Float32Array(t * this.channels);return i.set(this.out_f32.subarray(0, i.length)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, e;
  }();var Ze = null;
  var Ge = function Ge() {
    _classCallCheck(this, Ge);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = Ze;
  };

  var Qe = function (_Ge) {
    _inherits(Qe, _Ge);

    function Qe() {
      var _this20;

      _classCallCheck(this, Qe);

      (_this20 = _possibleConstructorReturn(this, _Ge.call(this)), _this20), _this20.queueSize = 5120, _this20.unstableSeconds = 0, _this20.stableSeconds = 0, _this20.minimalQueueSize = _this20.queueSize;_this20.defaultConfig.codec.sampleRate, _this20.defaultConfig.codec.bufferSize;_this20.perfectRate = 50, _this20.lowestAcceptable = _this20.perfectRate - 5, _this20.highestAcceptable = _this20.perfectRate + 5;return _this20;
    }

    Qe.prototype.isAcceptable = function isAcceptable(e) {
      return e >= this.lowestAcceptable && e <= this.highestAcceptable;
    };

    Qe.prototype.handleMeasurement = function handleMeasurement(e) {
      this.isAcceptable(e) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    Qe.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    Qe.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    Qe.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return Qe;
  }(Ge);

  var Ye = function () {
    function Ye(e) {
      var _this21 = this;

      _classCallCheck(this, Ye);

      this.ticks = 0, this.task = setInterval(function () {
        e(_this21.ticks), _this21.ticks = 0;
      }, 1e3);
    }

    Ye.prototype.tick = function tick() {
      this.ticks++;
    };

    Ye.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return Ye;
  }();

  var Xe = function () {
    function Xe() {
      var _this22 = this;

      _classCallCheck(this, Xe);

      this.buffer = new Float32Array(0), this.processor = new Qe(), this.tickTimer = new Ye(function (e) {
        _this22.processor.handleMeasurement(e);
      });
    }

    Xe.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    Xe.prototype.write = function write(e, t) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;t = e.sampler.resampler(t);var n = new Float32Array(i + t.length);n.set(this.buffer, 0), n.set(t, i), this.buffer = n;
    };

    Xe.prototype.read = function read(e) {
      var t = this.buffer.subarray(0, e);return this.buffer = this.buffer.subarray(e, this.buffer.length), t;
    };

    Xe.prototype.length = function length() {
      return this.buffer.length;
    };

    Xe.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return Xe;
  }();

  var Ke = function (_Ge2) {
    _inherits(Ke, _Ge2);

    function Ke(e, t) {
      var _this23;

      _classCallCheck(this, Ke);

      (_this23 = _possibleConstructorReturn(this, _Ge2.call(this)), _this23), _this23.config = _this23.defaultConfig, _this23.config.codec = _this23.config.codec || _this23.defaultConfig.codec, _this23.config.server = _this23.config.server || _this23.defaultConfig.server, _this23.sampler = new De(_this23.config.codec.sampleRate, _this23.audioContext.sampleRate, 1, _this23.config.codec.bufferSize), _this23.parentSocket = t, _this23.decoder = new qe(_this23.config.codec.sampleRate, _this23.config.codec.channels), _this23.silence = new Float32Array(_this23.config.codec.bufferSize);return _this23;
    }

    Ke.prototype.start = function start() {
      var _this24 = this;

      this.audioQueue = new Xe(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (e) {
        _this24.audioQueue.length() ? e.outputBuffer.getChannelData(0).set(_this24.audioQueue.read(_this24.config.codec.bufferSize)) : e.outputBuffer.getChannelData(0).set(_this24.silence);
      }, this.gainNode = this.audioContext.createGain(), this.scriptNode.connect(this.gainNode), this.gainNode.connect(this.audioContext.destination), this.socket = this.parentSocket, this.socket.onmessage = function (e) {
        if (e.data instanceof Blob) {
          _this24.audioQueue.tick();var t = new FileReader();t.onload = function () {
            _this24.audioQueue.write(_this24, _this24.decoder.decode_float(t.result));
          }, t.readAsArrayBuffer(e.data);
        }
      }, this.socketKeepAliveTimer = setInterval(function () {
        try {
          if (_this24.socket.readyState === WebSocket.CLOSED) return void clearInterval(_this24.socketKeepAliveTimer);_this24.socket.send("1");
        } catch (e) {
          clearInterval(_this24.socketKeepAliveTimer);
        }
      }, 1e3);
    };

    Ke.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    Ke.prototype.setVolume = function setVolume(e) {
      this.gainNode && (this.gainNode.gain.value = e);
    };

    Ke.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return Ke;
  }(Ge);

  var Je = function () {
    function Je(e, t) {
      _classCallCheck(this, Je);

      this.room = e, this.roomMember = t, this.isStopped = !1, this.player = new Ke({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    Je.prototype.setVolume = function setVolume(e) {
      null != this.player && this.player.setVolume(e / 50);
    };

    Je.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return Je;
  }();

  var $e = function $e(e, t, i) {
    _classCallCheck(this, $e);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(e, t, i) : void navigator.mediaDevices.getUserMedia(e).then(function (e) {
      return t(e);
    }).catch(function (e) {
      return i(e);
    }) : void navigator.webkitGetUserMedia(e, t, i) : void navigator.getUserMedia(e, t, i);
  };

  var et = function (_$2) {
    _inherits(et, _$2);

    function et(e) {
      _classCallCheck(this, et);

      var _this25 = _possibleConstructorReturn(this, _$2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

      var t = [],
          i = !1;navigator.mediaDevices.enumerateDevices().then(function (e) {
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
          for (var _iterator18 = e[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var _n4 = _step18.value;
            "audioinput" == _n4.kind && ("" === _n4.label ? i = !0 : t.push({ name: _n4.label, id: _n4.deviceId }));
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
          new $e({ audio: !0 }, function (t) {
            _this25.hide(), t.getTracks()[0].stop(), new et(e);
          }, function (t) {
            console.log(t), _this25.hide(), _this25.deniedMessage(), e(null);
          });
        };else {
          null != _this25.requestBox && _this25.requestBox.hide();var _i6 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = t[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _e21 = _step19.value;
              _i6 += '<option value="' + _e21.id + '">' + _e21.name + "</option>";
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
            var _e20 = document.getElementById("select-mic-dropdown");for (var _t10 = 0; _t10 < _e20.options.length; _t10++) {
              _e20.options[_t10].innerText === Cookies.get("default-mic") && (_e20.options[_t10].selected = !0);
            }
          }document.getElementById("select-mic-dropdown").onchange = function (t) {
            document.getElementById("select-mic-dropdown").disabled = !0, document.getElementById("select-mic-dropdown").style.display = "none", document.getElementById("mic-loader").style.display = "", Cookies.set("default-mic", t.target.selectedOptions[0].childNodes[0].data), e(_this25.getId()), setTimeout(function () {
              document.getElementById("select-mic-dropdown").style.display = "", document.getElementById("mic-loader").style.display = "none", document.getElementById("select-mic-dropdown").disabled = !1;
            }, 6e3);
          }, e(_this25.getId());
        }
      }).catch(function (e) {
        return console.error(e);
      });return _this25;
    }

    et.prototype.getId = function getId() {
      var e = document.getElementById("select-mic-dropdown");for (var t = 0; t < e.options.length; t++) {
        if (e.options[t].innerText == Cookies.get("default-mic")) return e.options[t].value;
      }return "default";
    };

    et.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new $("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return et;
  }($);

  var tt = function (_Ge3) {
    _inherits(tt, _Ge3);

    function tt(e, t) {
      var _this26;

      _classCallCheck(this, tt);

      (_this26 = _possibleConstructorReturn(this, _Ge3.call(this)), _this26), _this26.config = e, _this26.config.codec = _this26.config.codec || _this26.defaultConfig.codec, _this26.sampler = new De(_this26.audioContext.sampleRate, _this26.config.codec.sampleRate, 1, _this26.config.codec.bufferSize), _this26.parentSocket = t, _this26.encoder = new je(_this26.config.codec.sampleRate, _this26.config.codec.channels, _this26.config.codec.app, _this26.config.codec.frameDuration);return _this26;
    }

    tt.prototype._makeStream = function _makeStream(e) {
      var _this27 = this;

      new $e({ audio: this.config.micId }, function (e) {
        _this27.stream = e, _this27.audioInput = _this27.audioContext.createMediaStreamSource(e), _this27.gainNode = _this27.audioContext.createGain(), _this27.recorder = _this27.audioContext.createScriptProcessor(_this27.config.codec.bufferSize, 1, 1), _this27.recorder.onaudioprocess = function (e) {
          var t = _this27.sampler.resampler(e.inputBuffer.getChannelData(0)),
              i = _this27.encoder.encode_float(t);for (var _e22 = 0; _e22 < i.length; _e22++) {
            1 === _this27.socket.readyState && _this27.socket.send(i[_e22]);
          }
        }, _this27.audioInput.connect(_this27.gainNode), _this27.gainNode.connect(_this27.recorder), _this27.recorder.connect(_this27.audioContext.destination);
      }, e || this.onError);
    };

    tt.prototype.start = function start(e) {
      var _this28 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(e);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var t = this.socket.onopen;this.socket.onopen = function () {
          t && t(), _this28._makeStream(e);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this28._shutdown(), console.log("Disconnected from server");
      };
    };

    tt.prototype.mute = function mute() {
      this.gainNode.gain.value = 0, console.log("Mic muted");
    };

    tt.prototype.unMute = function unMute() {
      this.gainNode.gain.value = 1, console.log("Mic unmuted");
    };

    tt.prototype.onError = function onError(e) {
      var t = new Error(e.name);throw t.name = "NavigatorUserMediaError", t;
    };

    tt.prototype._shutdown = function _shutdown() {
      this.audioInput && (this.audioInput.disconnect(), this.audioInput = null), this.gainNode && (this.gainNode.disconnect(), this.gainNode = null), this.recorder && (this.recorder.disconnect(), this.recorder = null), null != this.stream && this.stream.getTracks().forEach(function (e) {
        e.stop();
      });
    };

    tt.prototype.stop = function stop() {
      this._shutdown(), this.parentSocket || this.socket.close();
    };

    return tt;
  }(Ge);

  var it = function () {
    function it(e) {
      var _this29 = this;

      _classCallCheck(this, it);

      this.room = e, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new et(function (e) {
        _this29.shutdown(), setTimeout(function () {
          _this29.micId = !(null != e) || e, _this29.start();
        }, 5e3);
      });
    }

    it.prototype.mute = function mute() {
      this.isMuted = !0, this.streamer.mute();
    };

    it.prototype.unMute = function unMute() {
      this.isMuted = !1, this.streamer.unMute();
    };

    it.prototype.start = function start() {
      this.streamer = new tt({ micId: this.micId }, new WebSocket(this.room.voiceServer.ws + "/stream?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&accessToken=" + this.room.accessToken)), this.streamer.start(), this.isRunning = !0;
    };

    it.prototype.shutdown = function shutdown() {
      null != this.streamer && this.streamer.stop(), this.isRunning = !1;
    };

    return it;
  }();

  var nt = function () {
    function nt(e, t, i) {
      _classCallCheck(this, nt);

      this.room = e, this.uuid = t, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new Ee(e, i, this), this.volume = e.main.mediaManager.getMasterVolume();
    }

    nt.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    nt.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new Je(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
    };

    nt.prototype.setVolume = function setVolume(e) {
      this.volume = e, this.card.isMuted || this.voiceReceiver.setVolume(e);
    };

    nt.prototype.muteReceiver = function muteReceiver() {
      this.voiceReceiver.setVolume(0);
    };

    nt.prototype.unmuteReceiver = function unmuteReceiver() {
      this.voiceReceiver.setVolume(this.volume);
    };

    nt.prototype.broadcastStream = function broadcastStream() {
      this.voiceBroadcast = new it(this.room);
    };

    return nt;
  }();

  var st = function () {
    function st(e, t, i, n, s, o) {
      var _this30 = this;

      _classCallCheck(this, st);

      this.main = e, this.voiceServer = t, this.roomId = i, this.accessToken = s, this.roomMembers = new Map(), this.currentUser = n, this.isUnsubscribing = !1, new $("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this30.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this30.toggleMic();
      }, o.forEach(function (e) {
        _this30.registerMember(e.uuid, e.name);
      });
    }

    st.prototype.toggleMic = function toggleMic() {
      var _this31 = this;

      var e = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (t) {
        null != t.voiceBroadcast && (e = t.voiceBroadcast);
      }), e.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", e.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", e.mute()), setTimeout(function () {
        _this31.muteMicButtonElement.disabled = !1, _this31.canToggleMute = !0;
      }, 1e3));
    };

    st.prototype.unsubscribe = function unsubscribe() {
      var _this32 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), _(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (e) {
        e.json().then(function (e) {
          0 !== e.results.length && (_this32.roomMembers.forEach(function (e) {
            _this32.handleMemberLeaving(e.uuid);
          }), document.getElementById("call-control-box").style.display = "none", _this32.main.voiceModule.clearCall());
        }).catch(function (e) {
          console.error(e.stack), _this32.leaveErrorhandler(e);
        });
      }).catch(function (e) {
        console.error(e.stack), _this32.leaveErrorhandler(e);
      }));
    };

    st.prototype.resubToPlayer = function resubToPlayer(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.connectStream());
    };

    st.prototype.handleMemberLeaving = function handleMemberLeaving(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceBroadcast && (t.voiceBroadcast.shutdown(), t.voiceBroadcast.changeMicPopup.hide()), null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.removeCard(), this.roomMembers.delete(e), 1 === this.roomMembers.size && this.unsubscribe());
    };

    st.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new $("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    st.prototype.errorHandler = function errorHandler(e) {
      new $("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(e);
    };

    st.prototype.registerMember = function registerMember(e, t) {
      var i = new nt(this, e, t);this.roomMembers.set(e, i), e == this.currentUser.uuid ? i.broadcastStream() : i.connectStream();
    };

    return st;
  }();

  var ot = function () {
    function ot(e, t, i, n) {
      var _this33 = this;

      _classCallCheck(this, ot);

      var s = [];t.forEach(function (t) {
        t != e.tokenSet.name && s.push(t);
      }), e.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var o = s.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + o, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this33.ignored = !0, _this33.hide(_this33), new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this33.ignored || (_this33.ignored = !0, _this33.hide(_this33), new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), n());
      };this.onTimeout = r, document.getElementById("call-deny-button").onclick = r;
    }

    ot.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return ot;
  }();

  var rt = function () {
    function rt(e) {
      _classCallCheck(this, rt);

      this.room = null, this.main = e, this.currentUser = e.currentUser;
    }

    rt.prototype.promptCall = function promptCall(e, t, i, n, s) {
      var _this34 = this;

      null == this.room ? new ot(this.main, n, function () {
        _this34.room = new st(_this34.main, e, t, _this34.main.tokenSet, i, s);
      }, function () {
        _(_this34.voiceServer.rest + "/leave-room?room=" + t + "&uuid=" + _this34.currentUser.uuid + "&accessToken=" + i).then(function (e) {
          e.json().then(function (e) {
            0 === e.results.length ? _this34.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (e) {
            _this34.leaveErrorhandler(e);
          });
        }).catch(function (e) {
          _this34.leaveErrorhandler(e);
        });
      }) : new $("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    rt.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new $("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    rt.prototype.handleSocketClosed = function handleSocketClosed() {
      null == this.room || this.room.unsubscribe();
    };

    rt.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    rt.prototype.setVolume = function setVolume(e) {
      null != this.room && this.room.roomMembers.forEach(function (t) {
        null != t.voiceReceiver && t.setVolume(e);
      });
    };

    return rt;
  }();

  var at = function () {
    function at(e) {
      _classCallCheck(this, at);

      this.main = e, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    at.prototype.setupPermissions = function setupPermissions() {
      var _this35 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new $("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this35.requestNotificationPermissions();
      });
    };

    at.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/avatar/" + this.main.tokenSet.name });
    };

    at.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this36 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this36.requestBox.hide(), new $("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this36.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return at;
  }();

  var lt = i(0);
  var ht = function () {
    function ht(e, t, i, n) {
      _classCallCheck(this, ht);

      this.world = e, this.updateLocation(t, i, n);
    }

    ht.prototype.updateLocation = function updateLocation(e, t, i) {
      this.location = e, this.pitch = t, this.yaw = i, this.world.onLocationUpdate();
    };

    return ht;
  }();

  var ut = function () {
    function ut(e) {
      _classCallCheck(this, ut);

      this.openAudioMc = e, this.player = new ht(this, new a(0, 0, 0), 0, 0), this.speakers = new Map();
    }

    ut.prototype.getSpeakerById = function getSpeakerById(e) {
      return this.speakers.get(e);
    };

    ut.prototype.addSpeaker = function addSpeaker(e, t) {
      this.speakers.set(e, t), t.initialize();
    };

    ut.prototype.removeSpeaker = function removeSpeaker(e) {
      var t = this.getSpeakerById(e);null != t && t.onRemove(), this.speakers.delete(e);
    };

    ut.prototype.onLocationUpdate = function onLocationUpdate() {
      var _this37 = this;

      this.speakers.forEach(function (e) {
        e.onPlayerLocationUpdate(_this37, _this37.player);
      });
    };

    return ut;
  }();

  i.d(t, "OpenAudioMc", function () {
    return ct;
  });
  var ct = function (_ref) {
    _inherits(ct, _ref);

    function ct() {
      var _this38, _ret2;

      _classCallCheck(this, ct);

      if ((_this38 = _possibleConstructorReturn(this, _ref.call(this)), _this38), _this38.canStart = !1, _this38.host = null, _this38.background = null, _this38.tokenSet = new se().fromUrl(window.location.href), null == _this38.tokenSet) return _ret2 = void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />"), _possibleConstructorReturn(_this38, _ret2);_this38.notificationModule = new at(_this38), _this38.timeService = new Z(), _this38.messages = new G(_this38), _this38.userInterfaceModule = new Q(_this38), _this38.hueConfiguration = new ge(_this38), _this38.mediaManager = new J(_this38), _this38.world = new ut(_this38), Ze = new (window.AudioContext || window.webkitAudioContext)(), _this38.voiceModule = new rt(_this38), _this38.boot();new Me("https://plus.openaudiomc.net/").route(_this38).then(function (e) {
        _this38.canStart = !0, _this38.host = e.host, _this38.background = e.background;
      }).catch(function (e) {
        console.error("Exception thrown", e.stack), _this38.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff."), new $("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred while connecting to the server, please request a new url and try again.");
      });return _possibleConstructorReturn(_this38);
    }

    ct.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.hueModule = new Y(this, Object(lt.a)()), this.socketModule = new ee(this, this.host), this.messages.apply(), new pe(this), "" !== this.background && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + this.background + ");\n    -webkit-background-size: cover;\n    background-size: cover;"));
    };

    return ct;
  }(function (_ref2) {
    _inherits(_class3, _ref2);

    function _class3() {
      _classCallCheck(this, _class3);

      return _possibleConstructorReturn(this, _ref2.apply(this, arguments));
    }

    _class3.prototype.log = function log(e) {
      console.log("[OpenAudioMc] " + e);
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

    _class3.prototype.debugPrint = function debugPrint(e) {
      this.log(e);
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
      var e = Cookies.get("volume");Cookies.set("auto-join-call", !1), null != e && this.mediaManager.changeVolume(e);
    };

    return _class4;
  }()));

  !function () {
    if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/browsers.html");var e = new se().fromUrl(window.location.href);null == e ? (document.getElementById("footer-welcome").innerText = "No authentication provided", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />") : (document.body.onclick = function () {
      oe.canStart && oe.start();
    }, null != e && null != e.name && (document.getElementById("sidebar-head").style.background = "linear-gradient(0deg, rgba(42, 38, 95, .8), rgba(42, 38, 95, .4)), url(https://minotar.net/avatar/" + e.name + ")", document.getElementById("footer-welcome").innerText = "Logged in as " + e.name, oe = new ct()));
  }();
}]);
