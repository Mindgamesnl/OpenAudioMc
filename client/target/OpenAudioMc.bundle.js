"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  function t(n) {
    if (i[n]) return i[n].exports;var o = i[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }var i = {};t.m = e, t.c = i, t.d = function (e, i, n) {
    t.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: n });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, i) {
    if (1 & i && (e = t(e)), 8 & i) return e;if (4 & i && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var n = Object.create(null);if (t.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & i && "string" != typeof e) for (var o in e) {
      t.d(n, o, function (t) {
        return e[t];
      }.bind(null, o));
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
      return s();
    }i.d(t, "a", function () {
      return n;
    });var o = function o(e, t, i, n) {
      var s = function s(t, o, _s) {
        return new n(function (e) {
          null !== _s && (_s = i.stringify(_s)), e(_s);
        }).then(function (i) {
          return e(o, { method: t, body: i });
        }).then(function (e) {
          return e.json();
        });
      },
          r = function r(e, t) {
        return s(e, t, null);
      },
          a = r.bind(null, "GET"),
          l = s.bind(null, "PUT"),
          u = s.bind(null, "POST"),
          h = r.bind(null, "DELETE"),
          d = function d(e, t) {
        return function (i) {
          for (var _len = arguments.length, n = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(i)].concat(n));
        };
      },
          c = function c(e) {
        return function (o, s) {
          return n.resolve(new t(i.stringify({ address: o.slice(e.length), method: s.method, body: i.parse(s.body) })));
        };
      };return { discover: a.bind(null, "https://discovery.meethue.com"), bridge: function bridge(e) {
          var s = "http://" + e,
              r = s + "/api";return { createUser: function createUser(e) {
              return u(r, { devicetype: e });
            }, user: function user(m) {
              Cookies.set("hueid", m);var p = r + "/" + m,
                  f = p + "/capabilities",
                  g = p + "/config",
                  y = p + "/lights",
                  b = p + "/groups",
                  v = p + "/schedules",
                  w = p + "/scenes",
                  M = p + "/sensors",
                  k = p + "/rules",
                  E = p + "/resourcelinks",
                  B = function B(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  S = B(y),
                  A = B(b),
                  I = B(v),
                  x = B(w),
                  C = B(M),
                  _ = B(k),
                  T = B(E);return { getCapabilities: a.bind(null, f), deleteUser: d(h, function (e) {
                  return g + "/whitelist/" + e;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, p), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return u(y, e);
                }, getLight: d(a, S), setLight: d(l, S), setLightState: d(l, function (e) {
                  return S(e) + "/state";
                }), deleteLight: d(h, S), getGroups: a.bind(null, b), createGroup: u.bind(null, b), getGroup: d(a, A), setGroup: d(l, A), setGroupState: d(l, function (e) {
                  return A(e) + "/action";
                }), deleteGroup: d(h, A), getSchedules: a.bind(null, v), createSchedule: u.bind(null, v), getSchedule: d(a, I), setSchedule: d(l, I), deleteSchedule: d(h, I), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return o(c(s), t, i, n).bridge(e).user(m);
                }, getScenes: a.bind(null, w), createScene: u.bind(null, w), getScene: d(a, x), setScene: d(l, x), setSceneLightState: function setSceneLightState(e, t, i) {
                  return l(x(e) + "/lightstates/" + t, i);
                }, deleteScene: d(h, x), getSensors: a.bind(null, M), createSensor: u.bind(null, M), searchForNewSensors: u.bind(null, M, null), getNewSensors: a.bind(null, M + "/new"), getSensor: d(a, C), setSensor: d(l, C), setSensorConfig: d(l, function (e) {
                  return C(e) + "/config";
                }), setSensorState: d(l, function (e) {
                  return C(e) + "/state";
                }), deleteSensor: d(h, C), getRules: a.bind(null, k), createRule: u.bind(null, k), getRule: d(a, _), setRule: d(l, _), deleteRule: d(h, _), ruleActionGenerator: function ruleActionGenerator() {
                  return o(c(p), t, i, n).bridge(e).user(m);
                }, getResourceLinks: a.bind(null, E), createResourceLink: u.bind(null, E), getResourceLink: d(a, T), setResourceLink: d(l, T), deleteResourceLink: d(h, T) };
            } };
        } };
    };var s = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (s = o.bind(null, fetch, Response, JSON, Promise), void 0 !== e.exports && (e.exports = s));
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
          o = t || e.innerHTML,
          s = o.length;W.push(window.setInterval(function () {
        i >= s && (i = 0), o = n(o, i), e.innerHTML = o, i++;
      }, 0));
    }function n(e, t) {
      var i = _(function (e, t) {
        return z(Math.random() * (t - e + 1)) + e;
      }(64, 90));return e.substr(0, t) + i + e.substr(t + 1, e.length);
    }var o = void 0,
        s = void 0,
        r = t.childNodes.length;if (-1 < e.indexOf("<br>")) {
      t.innerHTML = e;for (var _e2 = 0; _e2 < r; _e2++) {
        s = t.childNodes[_e2], 3 === s.nodeType && (o = document.createElement("span"), o.innerHTML = s.nodeValue, t.replaceChild(o, s), i(o));
      }
    } else i(t, e);
  }function o(e, t) {
    var i = t.length,
        o = document.createElement("span"),
        s = !1;for (var _r = 0; _r < i; _r++) {
      o.style.cssText += j[t[_r]] + ";", "§k" === t[_r] && (n(e, o), s = !0);
    }return s || (o.innerHTML = e), o;
  }function s(e) {
    var t,
        i,
        n = e.match(/&.{1}/g) || [],
        s = [],
        r = [],
        a = document.createDocumentFragment(),
        l = n.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t = 0; _t < l; _t++) {
      s.push(e.indexOf(n[_t])), e = e.replace(n[_t], "\0\0");
    }0 !== s[0] && a.appendChild(o(e.substring(0, s[0]), []));for (var _u = 0; _u < l; _u++) {
      if (2 === (i = s[_u + 1] - s[_u])) {
        for (; 2 == i;) {
          r.push(n[_u]), _u++, i = s[_u + 1] - s[_u];
        }r.push(n[_u]);
      } else r.push(n[_u]);-1 < r.lastIndexOf("§r") && (r = r.slice(r.lastIndexOf("§r") + 1)), t = e.substring(s[_u], s[_u + 1]), a.appendChild(o(t, r));
    }return a;
  }function r(e) {
    if ("string" != typeof e && (e += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function a(e) {
    return "string" != typeof e && (e += ""), e;
  }function l(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return $.iterable && (t[Symbol.iterator] = function () {
      return t;
    }), t;
  }function u(e) {
    this.map = {}, e instanceof u ? e.forEach(function (e, t) {
      this.append(t, e);
    }, this) : Array.isArray(e) ? e.forEach(function (e) {
      this.append(e[0], e[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t]);
    }, this);
  }function h(e) {
    return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (e.bodyUsed = !0);
  }function d(e) {
    return new Promise(function (t, i) {
      e.onload = function () {
        t(e.result);
      }, e.onerror = function () {
        i(e.error);
      };
    });
  }function c(e) {
    var t = new FileReader(),
        i = d(t);return t.readAsArrayBuffer(e), i;
  }function m(e) {
    if (e.slice) return e.slice(0);var t = new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)), t.buffer;
  }function p() {
    return this.bodyUsed = !1, this._initBody = function (e) {
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : $.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : $.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : $.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : $.arrayBuffer && $.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = m(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : $.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || X(e)) ? this._bodyArrayBuffer = m(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : $.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, $.blob && (this.blob = function () {
      var e = h(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(c);
    }), this.text = function () {
      var e = h(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            i = d(t);return t.readAsText(e), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), i = Array(t.length), n = 0; n < t.length; n++) {
          i[n] = _(t[n]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, $.formData && (this.formData = function () {
      return this.text().then(g);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function f(e, t) {
    var i = (t = t || {}).body;if (e instanceof f) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0);
    } else this.url = e + "";if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return -1 < ee.indexOf(t) ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function g(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var i = e.split("="),
            n = i.shift().replace(/\+/g, " "),
            o = i.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(n), decodeURIComponent(o));
      }
    }), t;
  }function y(e) {
    var t = new u();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var i = e.split(":"),
          n = i.shift().trim();if (n) {
        var o = i.join(":").trim();t.append(n, o);
      }
    }), t;
  }function b(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e);
  }function v(e, t) {
    return new Promise(function (i, n) {
      function o() {
        r.abort();
      }var s = new f(e, t);if (s.signal && s.signal.aborted) return n(new ie("Aborted", "AbortError"));var r = new XMLHttpRequest();r.onload = function () {
        var e = { status: r.status, statusText: r.statusText, headers: y(r.getAllResponseHeaders() || "") };e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");var t = "response" in r ? r.response : r.responseText;i(new b(t, e));
      }, r.onerror = function () {
        n(new TypeError("Network request failed"));
      }, r.ontimeout = function () {
        n(new TypeError("Network request failed"));
      }, r.onabort = function () {
        n(new ie("Aborted", "AbortError"));
      }, r.open(s.method, s.url, !0), "include" === s.credentials ? r.withCredentials = !0 : "omit" === s.credentials && (r.withCredentials = !1), "responseType" in r && $.blob && (r.responseType = "blob"), s.headers.forEach(function (e, t) {
        r.setRequestHeader(t, e);
      }), s.signal && (s.signal.addEventListener("abort", o), r.onreadystatechange = function () {
        4 === r.readyState && s.signal.removeEventListener("abort", o);
      }), r.send(void 0 === s._bodyInit ? null : s._bodyInit);
    });
  }function w(e, t, i, n, o) {
    this.fromSampleRate = e, this.toSampleRate = t, this.channels = 0 | i, this.outputBufferSize = n, this.noReturn = !!o, this.initialize();
  }function M(e, t, i, n, o, s) {
    this.audioChannels = 2 == e ? 2 : 1, fe = 1 == this.audioChannels, pe = 0 < t && 16777215 >= t ? t : 44100, de = i >= ae << 1 && i < n ? i & (fe ? 4294967295 : 4294967294) : ae << 1, ce = z(n) > de + this.audioChannels ? n & (fe ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof o ? o : function () {}, ge = -1 <= s && 1 >= s && 0 != s ? s : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function k(e) {
    try {
      var t = new Float32Array(e);
    } catch (t) {
      var t;Array(e);
    }for (var i = 0; i < e; ++i) {
      t[i] = ge * (i / e);
    }return t;
  }function E(e) {
    try {
      var t = new Float32Array(e);
    } catch (n) {
      t = Array(e);var i = 0;do {
        t[i] = 0;
      } while (++i < e);
    }return t;
  }function B() {
    for (var e = "", t = "", i = 0; i < ae && ve != we; ++i) {
      e += _(12288 + (0 | 16383 * C(x(he[ve++] + 1, 0), 2))), t += _(12288 + (0 | 16383 * C(x(he[ve++] + 1, 0), 2))), ve == Me && (ve = 0);
    }return e + t;
  }function S() {
    for (var e = "", t = 0; t < ae && ve != we; ++t) {
      e += _(12288 + (0 | 16383 * C(x(he[ve++] + 1, 0), 2))), ve == Me && (ve = 0);
    }return e;
  }function A() {
    return (ve <= we ? 0 : Me) + we - ve;
  }function I(e) {
    ue = k(ce), be = ce, ve = 0, we = 0, Me = x(ce * Math.ceil(pe / e), ae) << 1, fe ? (he = E(Me), ye = new w(pe, e, 1, Me, !0), S) : (he = E(Me <<= 1), ye = new w(pe, e, 2, Me, !0), B);
  }var x = Math.max,
      C = Math.min,
      _ = String.fromCharCode,
      T = Math.abs,
      P = Math.round,
      z = Math.floor;i.r(t);
  var L = function () {
    function L() {
      _classCallCheck(this, L);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    L.prototype.sync = function sync(e, t) {
      var i = new Date(e),
          n = new Date().getTime();n += 60 * t * 60 * 1e3;var o = new Date(n);this.isServerAhead = i.getTime() > o.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - o.getTime() : o.getTime() - i.getTime(), this.hasSynced = !0;
    };

    L.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return L;
  }();

  var O = function () {
    function O(e) {
      _classCallCheck(this, O);

      this.fallback = "No message provided in oa+", this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    O.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return O;
  }();

  var R = function () {
    function R(e) {
      var _this = this;

      _classCallCheck(this, R);

      this.openAudioMc = e, document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    R.prototype.changeColor = function changeColor(e, t) {
      var i = function (e) {
        return e = e.replace("#", ""), "rgb(" + parseInt(e.substring(0, 2), 16) + ", " + parseInt(e.substring(2, 4), 16) + ", " + parseInt(e.substring(4, 6), 16) + ")";
      }(e);document.querySelectorAll("*").forEach(function (e) {
        var n = window.getComputedStyle(e);Object.keys(n).reduce(function (o, s) {
          var r = n[s],
              a = n.getPropertyValue(r);if (0 <= a.indexOf(i)) {
            var _n = a.replace(i, t);0 <= r.indexOf("border-top") ? e.style.borderTop = "2px solid " + _n : e.style[r] = _n;
          }
        });
      });
    };

    R.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    R.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    R.prototype.openApp = function openApp() {
      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage), document.getElementById("page").classList.remove("dark-bg");
    };

    R.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    R.prototype.kickScreen = function kickScreen(e) {
      document.getElementById("footer-welcome").innerText = "Session terminated", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = null == e ? this.openAudioMc.messages.errorMessage : e, document.getElementById("welcome").style.display = "", document.getElementById("page").classList.add("dark-bg"), document.getElementById("app").style.display = "none";
    };

    R.prototype.showVolumeSlider = function showVolumeSlider(e) {
      e ? (document.getElementById("volume-label").style.display = "", document.getElementById("volume-disp").style.display = "") : (document.getElementById("volume-disp").style.display = "none", document.getElementById("volume-label").style.display = "none");
    };

    return R;
  }();

  var H = function () {
    function H(e, t) {
      var _this2 = this;

      _classCallCheck(this, H);

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

    H.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-bridge-menu-button").style.display = "none", void this.openAudioMc.getUserInterfaceModule().showMain();null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    H.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    H.prototype.onConnect = function onConnect() {
      var _this3 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this3.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this3.currentUser.getLights().then(function (e) {
          var t = [];for (var _i in e) {
            e.hasOwnProperty(_i) && t.push({ name: e[_i].name, id: parseInt(_i) });
          }_this3.openAudioMc.getHueConfiguration().setLightNamesAndIds(t);null != Cookies.get("hue-state") && (_this3.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this3.openAudioMc.getHueConfiguration().applyState(), _this3.openAudioMc.getHueConfiguration().updateState();
        }), _this3.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    H.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    H.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 0 != 2 * t.alpha * 127.5, hue: z(65535 * t.hue / 360), sat: z(255 * t.saturation), bri: P(2 * t.alpha * 127.5) };
    };

    H.prototype.setLight = function setLight(e, t) {
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

    H.prototype.linkBridge = function linkBridge(e, t) {
      var _this5 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this5.linkBridge(e, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var n = 0,
          o = -1;o = setInterval(function () {
        function e() {
          clearInterval(o);
        }if (n++, 60 < n) return e(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this5.startSetup();
        }, void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - n;document.getElementById("hue-linking-message").innerText = _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", t), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null == t[0].error ? null != t[0].success && (i.currentUser = i.currentBridge.user(t[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), i.isLinked = !0, i.onConnect(), e()) : 101 === t[0].error.type || (e(), _this5.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type));
        });
      }, 1e3);
    };

    return H;
  }();

  var U = function () {
    function U(e) {
      _classCallCheck(this, U);

      this.channelName = e, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map();
    }

    U.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    U.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    U.prototype.addSound = function addSound(e) {
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

    U.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    U.prototype.registerMixer = function registerMixer(e) {
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

    U.prototype.fadeChannel = function fadeChannel(e, t, i) {
      var _this6 = this;

      this.interruptFade(), this.targetAfterFade = e, this.isFading = !0, function (e, t, n, o) {
        t = t || 1e3, n = n || 0, o = "function" == typeof o ? o : function () {};var s = _this6.channelVolume,
            r = t / T(s - n),
            a = setInterval(function () {
          s = s > n ? s - 1 : s + 1;var e = _this6.mixer.masterVolume,
              t = s / 100 * e;var _iteratorNormalCompletion3 = true;
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

          if (_this6.channelVolume = s, s == n) {
            null != i && i(), o.call(_this6), clearInterval(a);var _e5 = _this6.fadeTimer.indexOf(a);-1 < _e5 && _this6.fadeTimer.splice(_e5, 1), _this6.isFading = !1, a = null;
          }
        }, r);_this6.fadeTimer.push(a);
      }(0, t, e);
    };

    U.prototype.interruptFade = function interruptFade() {
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

    U.prototype._updateVolume = function _updateVolume() {
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

    U.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
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

    U.prototype.destroy = function destroy() {
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

    return U;
  }();

  var F = function () {
    function F(e, t) {
      _classCallCheck(this, F);

      this.openAudioMc = t, this.mixerName = e, this.masterVolume = 100, this.channels = new Map();
    }

    F.prototype.updateCurrent = function updateCurrent() {
      var e = [];this.channels.forEach(function (t, i) {
        var n = [];t.tags.forEach(function (e, t) {
          n.push(t);
        }), e.push({ name: i, tags: n });
      }), this.openAudioMc.socketModule.send("current_channels", { tracks: e });
    };

    F.prototype.setMasterVolume = function setMasterVolume(e) {
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

    F.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;t = e instanceof U ? e : this.channels.get(e), null != t && (t.destroy(), this.channels.delete(t.channelName)), this.updateCurrent();
    };

    F.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    F.prototype.addChannel = function addChannel(e) {
      if (!(e instanceof U)) throw new Error("Argument isn't a channel");{
        var _t4 = e.channelName,
            _i2 = this.channels.get(_t4);null != _i2 && _i2.destroy(), e.registerMixer(this), this.channels.set(_t4, e);
      }
    };

    return F;
  }();

  var N = function () {
    function N(e) {
      var _this7 = this;

      _classCallCheck(this, N);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.mixer = new F(null, e), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this7.setMasterVolume(e), Cookies.set("volume", e);
      };
    }

    N.prototype.destroySounds = function destroySounds(e, t, i) {
      var _this8 = this;

      this.openAudioMc.debugPrint("starting to quit fade " + e);var n = 250;i && (n = 0);var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step9.value;
          console.log(i), t ? i.fadeChannel(0, n, function () {
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

    N.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e, 0 === e ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + e + "%", Cookies.set("volume", e), this.mixer.setMasterVolume(e), this.openAudioMc.voiceModule.setVolume(e);
    };

    N.prototype.changeVolume = function changeVolume(e) {
      document.getElementById("volume-slider").value = e, this.setMasterVolume(e);
    };

    N.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return N;
  }();

  var D = function () {
    function D(e, t) {
      _classCallCheck(this, D);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    D.prototype.show = function show(e) {
      var _this9 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this9.alertClass.hide(_this9.alertBox);
      }), !this.option.persistent) var i = setTimeout(function () {
        _this9.alertClass.hide(_this9.alertBox), clearTimeout(i);
      }, this.option.closeTime);return this;
    };

    D.prototype.hide = function hide() {
      var _this10 = this;

      this.alertBox.classList.add("hide");var e = setTimeout(function () {
        _this10.alertBox.parentNode.removeChild(_this10.alertBox), clearTimeout(e), null != _this10.onTimeout && _this10.onTimeout();
      }, 500);
    };

    return D;
  }();

  var V = function () {
    function V(e, t) {
      var _this11 = this;

      _classCallCheck(this, V);

      if (this.handlers = {}, this.openAudioMc = e, this.callbacksEnabled = !1, null == function () {
        function _class() {
          _classCallCheck(this, _class);
        }

        _class.getParameter = function getParameter() {
          var e = window.location.href.split("&"),
              t = {};for (var _i3 = 0; _i3 < e.length; _i3++) {
            var _n2 = e[_i3].split("="),
                _o = decodeURIComponent(_n2[0]),
                _s2 = decodeURIComponent(_n2[1]);void 0 === t[_o] ? t[_o] = decodeURIComponent(_s2) : "string" == typeof t[_o] ? t[_o] = [t[_o], decodeURIComponent(_s2)] : t[_o].push(decodeURIComponent(_s2));
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
            o = t.accessToken,
            s = t.members,
            r = [];var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = s[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
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

        e.voiceModule.promptCall(n, i, o, r, s);
      }), this.socket.on("resub-to-player-in-call", function (t) {
        var i = e.voiceModule.room;null != i && i.resubToPlayer(t);
      }), this.socket.on("member-left-call", function (t) {
        var i = e.voiceModule.room;null != i && i.handleMemberLeaving(t);
      }), this.socket.connect();
    }

    V.prototype.send = function send(e, t) {
      this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + e), this.socket.emit(e, t)) : console.log("[OpenAudioMc] could not satisfy callback " + e + " because the protocol is outdated");
    };

    V.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return V;
  }();

  var W = [],
      j = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _e13 = W.length; _e13--;) {
        clearInterval(W[_e13]);
      }W = [];
    }(), s(this + "");
  };
  var q = function () {
    function q(e) {
      _classCallCheck(this, q);

      null != e && this.fromJson(e);
    }

    q.prototype.fromJson = function fromJson(e) {
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

    q.prototype.replaceWithJson = function replaceWithJson(e, t) {
      document.getElementById(e).replaceWith(new DOMParser().parseFromString(this.partToHtml(t), "text/html").body.childNodes[0]);
    };

    q.prototype.rowToHtml = function rowToHtml(e) {
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

    q.prototype.partToHtml = function partToHtml(e) {
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

      e.text = e.text.split("&").join("&"), s(e.text).childNodes.forEach(function (e) {
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

    return q;
  }();

  var G = function () {
    function G(e, t, i, n) {
      _classCallCheck(this, G);

      this.publicServerKey = e, this.uuid = t, this.name = i, this.token = n;
    }

    G.prototype.fromUrl = function fromUrl(e) {
      if (null == e) return null;if (2 > e.split("?").length) return null;var t = function () {
        function _class2() {
          _classCallCheck(this, _class2);
        }

        _class2.getParametersFromUrl = function getParametersFromUrl(e) {
          if (-1 < e.indexOf("?&")) return {};var t = e.split("&"),
              i = {};for (var _e16 = 0; _e16 < t.length; _e16++) {
            var _n3 = t[_e16].split("="),
                _o2 = decodeURIComponent(_n3[0]),
                _s3 = decodeURIComponent(_n3[1]);void 0 === i[_o2] ? i[_o2] = decodeURIComponent(_s3) : "string" == typeof i[_o2] ? i[_o2] = [i[_o2], decodeURIComponent(_s3)] : i[_o2].push(decodeURIComponent(_s3));
          }return i;
        };

        return _class2;
      }().getParametersFromUrl(e.split("?")[1]);if (null == t.data) return null;var i = atob(t.data).split(":");if (4 !== i.length) return null;var n = i[0],
          o = i[1],
          s = i[2],
          r = i[3];return null != n && 16 >= n.length && null != o && 40 >= o.length && null != s && 40 >= s.length && null != r && 5 >= r.length ? new G(s, o, n, r) : null;
    };

    return G;
  }();

  var J = null;
  var K = function () {
    function K(e) {
      var _this12 = this;

      _classCallCheck(this, K);

      this.soundElement = document.createElement("audio"), this.hadError = !1, this.error = null, this.soundElement.onerror = function (e) {
        _this12.hadError = !0, _this12.error = e, _this12._handleError();
      }, this.soundElement.src = e, this.soundElement.setAttribute("preload", "auto"), this.soundElement.setAttribute("controls", "none"), this.soundElement.setAttribute("display", "none"), this.soundElement.preload = "autoauto", this.soundElement.abort = console.log, this.openAudioMc = null, this.onFinish = null, this.loop = !1, this.mixer = null, this.channel = null, this.finsishedInitializing = !1;
    }

    K.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    K.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _e17 = this.soundElement.error.code,
            t = null;1 === _e17 ? t = "MEDIA_ERR_ABORTED" : 2 === _e17 ? t = "MEDIA_ERR_NETWORK" : 3 === _e17 ? t = "MEDIA_ERR_DECODE" : 4 === _e17 && (t = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != t && (console.log("Reporting media failure " + t), this.openAudioMc.socketModule.send("media_failure", { mediaError: t, source: this.soundElement.src }));
      }
    };

    K.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    K.prototype.finalize = function finalize() {
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

    K.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    K.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    K.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish = e;
    };

    K.prototype.setVolume = function setVolume(e) {
      100 < e && (e = 100), this.soundElement.volume = e / 100;
    };

    K.prototype.startDate = function startDate(e) {
      var t = new Date(e),
          i = T((t.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          n = this.soundElement.duration;if (i > n) {
        i -= z(i / n) * n;
      }this.setTime(i);
    };

    K.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    K.prototype.destroy = function destroy() {
      this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return K;
  }();

  var Z = function () {
    function Z(e) {
      var _this14 = this;

      _classCallCheck(this, Z);

      this.openAudioMc = e, e.socketModule.registerHandler("ClientCreateMediaPayload", function (t) {
        var i = t.media.loop,
            n = t.media.startInstant,
            o = t.media.mediaId,
            s = t.media.source,
            r = t.media.doPickup,
            a = t.media.fadeTime,
            l = t.distance,
            u = t.media.flag,
            h = t.maxDistance;e.getMediaManager().destroySounds(o, !1, !0);var d = new U(o),
            c = new K(s);c.openAudioMc = e, c.setOa(e), r && c.startDate(n, !0), c.finalize().then(function () {
          if (r && c.startDate(n, !0), e.getMediaManager().mixer.addChannel(d), d.addSound(c), d.setChannelVolume(0), c.setLooping(i), d.setTag(o), 0 !== h) {
            var _e18 = _this14.convertDistanceToVolume(h, l);d.setTag("SPECIAL"), d.maxDistance = h, d.fadeChannel(_e18, a);
          } else d.setTag("DEFAULT"), setTimeout(function () {
            0 === a ? (d.setChannelVolume(100), d.updateFromMasterVolume()) : (d.updateFromMasterVolume(), d.fadeChannel(100, a));
          }, 1);d.setTag(u), e.getMediaManager().mixer.updateCurrent(), c.finish();
        });
      }), e.socketModule.registerHandler("ClientDestroyCardPayload", function () {
        document.getElementById("card-panel").style.display = "none";
      }), e.socketModule.registerHandler("ClientUpdateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new q().replaceWithJson(e.id, t);
      }), e.socketModule.registerHandler("ClientCreateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);console.log("creating card "), console.log(t), new q(t);
      }), e.socketModule.registerHandler("NotificationPayload", function (e) {
        var t = e.message;_this14.openAudioMc.notificationModule.sendNotification(e.title, t), new D("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + t);
      }), e.socketModule.registerHandler("ClientSettingsPayload", function (t) {
        _this14.openAudioMc.debugPrint("Updating settings...");var i = t.clientSettings,
            n = i.background,
            o = i.title,
            s = i.welcomeMessage,
            r = i.errorMessage,
            a = i.hueConnected,
            l = i.hueLinking,
            u = i.hueBridgeFound;"default" !== a && (e.getMessages().hueConnected = a), "default" !== l && (e.getMessages().hueLinking = l), "default" !== u && (e.getMessages().hueWelcome = u), "default" !== r && (e.getMessages().errorMessage = r), "default" !== s && (e.getMessages().welcomeMessage = s), "default" !== n && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + n + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== o && (document.title = o), e.getMessages().apply();
      }), e.socketModule.registerHandler("ClientVersionPayload", function (t) {
        parseInt(t.protocolRevision), console.log("[OpenAudioMc] Received revision update"), function () {
          return 2;
        } && (console.log("[OpenAudioMc] rev => 2, enabling callbacks"), e.socketModule.callbacksEnabled = !0);
      }), e.socketModule.registerHandler("ClientVolumePayload", function (e) {
        var t = e.volume;_this14.openAudioMc.getMediaManager().setMasterVolume(t), document.getElementById("volume-slider").value = t;
      }), e.socketModule.registerHandler("ClientDestroyMediaPayload", function (e) {
        _this14.openAudioMc.getMediaManager().destroySounds(e.soundId, e.all);
      }), e.socketModule.registerHandler("HueColorPayload", function (t) {
        var i = t.lights,
            n = t.hueColor,
            o = "rgba(" + n.r + "," + n.g + "," + n.b + "," + function (e, t, i) {
          return (e - t[0]) * (i[1] - i[0]) / (t[1] - t[0]) + i[0];
        }(n.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(i, o);
      }), e.socketModule.registerHandler("ClientUpdateMediaPayload", function (t) {
        var i = t.mediaOptions.target,
            n = t.mediaOptions.fadeTime,
            o = t.mediaOptions.distance;var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = e.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var _t8 = _step16.value;
            _t8.hasTag(i) && _t8.fadeChannel(_this14.convertDistanceToVolume(_t8.maxDistance, o), n);
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
      });
    }

    Z.prototype.convertDistanceToVolume = function convertDistanceToVolume(e, t) {
      return P((e - t) / e * 100);
    };

    return Z;
  }();

  var Q = function () {
    function Q() {
      var _this15 = this;

      _classCallCheck(this, Q);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this15.select();
        };
      });
    }

    Q.prototype.setBridgeName = function setBridgeName(e) {
      document.getElementById("bridge-name").innerText = e;
    };

    Q.prototype.select = function select() {
      this.updateState();
    };

    Q.prototype.applyState = function applyState() {
      var _this16 = this;

      this.state.forEach(function (e) {
        _this16.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    Q.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this17.state.push(_this17.obtainSelection(e));
      }), Cookies.set("hue-state", this.state);
    };

    Q.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          i = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: i };
    };

    Q.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    Q.prototype.getInputById = function getInputById(e) {
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

    Q.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    Q.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return Q;
  }();

  var $ = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if ($.arrayBuffer) var Y = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      X = ArrayBuffer.isView || function (e) {
    return e && -1 < Y.indexOf(Object.prototype.toString.call(e));
  };u.prototype.append = function (e, t) {
    e = r(e), t = a(t);var i = this.map[e];this.map[e] = i ? i + ", " + t : t;
  }, u.prototype.delete = function (e) {
    delete this.map[r(e)];
  }, u.prototype.get = function (e) {
    return e = r(e), this.has(e) ? this.map[e] : null;
  }, u.prototype.has = function (e) {
    return this.map.hasOwnProperty(r(e));
  }, u.prototype.set = function (e, t) {
    this.map[r(e)] = a(t);
  }, u.prototype.forEach = function (e, t) {
    for (var i in this.map) {
      this.map.hasOwnProperty(i) && e.call(t, this.map[i], i, this);
    }
  }, u.prototype.keys = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push(i);
    }), l(e);
  }, u.prototype.values = function () {
    var e = [];return this.forEach(function (t) {
      e.push(t);
    }), l(e);
  }, u.prototype.entries = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push([i, t]);
    }), l(e);
  }, $.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);var ee = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];f.prototype.clone = function () {
    return new f(this, { body: this._bodyInit });
  }, p.call(f.prototype), p.call(b.prototype), b.prototype.clone = function () {
    return new b(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new u(this.headers), url: this.url });
  }, b.error = function () {
    var e = new b(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var te = [301, 302, 303, 307, 308];b.redirect = function (e, t) {
    if (-1 === te.indexOf(t)) throw new RangeError("Invalid status code");return new b(null, { status: t, headers: { location: e } });
  };var ie = self.DOMException;try {
    new ie();
  } catch (t) {
    (ie = function ie(e, t) {
      this.message = e, this.name = t;var i = Error(e);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), ie.prototype.constructor = ie;
  }v.polyfill = !0, self.fetch || (self.fetch = v, self.Headers = u, self.Request = f, self.Response = b);
  var ne = function () {
    function ne(e) {
      _classCallCheck(this, ne);

      this.host = e;
    }

    ne.prototype.route = function route(e) {
      var _this18 = this;

      return new Promise(function (t, i) {
        _this18.tokenSet = new G().fromUrl(window.location.href), v(_this18.host + "/api/v1/client/login/" + _this18.tokenSet.publicServerKey).then(function (n) {
          n.json().then(function (n) {
            if (null == n.errors || 0 != n.errors.length) return i(n.errors), void console.log(n.errors);var o = n.response,
                r = o.secureEndpoint;null == r && (r = o.insecureEndpoint), console.log("accepting and applying settings"), e.debugPrint("Updating settings...");var a = o.backgroundImage,
                l = o.title,
                u = o.clientWelcomeMessage,
                h = o.clientErrorMessage;var d = "";s(h).childNodes.forEach(function (e) {
              d += e.outerHTML;
            });var c = "";s(u).childNodes.forEach(function (e) {
              c += e.outerHTML;
            }), "" !== h && (e.getMessages().errorMessage = d), "" !== u && (e.getMessages().welcomeMessage = c);var m = o.greetingMessage;if (m = m.replace("%name", e.tokenSet.name), document.getElementById("welcome-text-landing").innerHTML = m, document.getElementById("boot-button").style.display = "", document.getElementById("boot-button").innerHTML = o.connectButtonText, e.getUserInterfaceModule().changeColor("#304FFE", o.accentColor), "" != o.startSound) {
              var _t9 = new U("startsound"),
                  _i5 = new K(o.startSound);_i5.openAudioMc = e, _i5.setOa(e), _i5.finalize().then(function () {
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

    return ne;
  }();

  var oe = function (_D) {
    _inherits(oe, _D);

    function oe(e, t, i) {
      var _this19;

      _classCallCheck(this, oe);

      (_this19 = _possibleConstructorReturn(this, _D.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this19), _this19.room = e, _this19.username = t, _this19.isMuted = !1, _this19.member = i;var n = '<img class="call-box" src="https://minotar.net/avatar/' + t + '" />';n += '<div class="call-content" id="user-box-content-' + t + '">', n += '<div style="text-align: center;"><p>(loading)</p></div>', n += "</div>", _this19.show(n, !0), _this19.setUsernameAsContent(), document.getElementById("user-box-content-" + _this19.username).onmouseenter = function () {
        _this19.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onmouseout = function () {
        _this19.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onclick = function () {
        _this19.room.main.tokenSet.name !== _this19.username && _this19.onClickHandler();
      };return _this19;
    }

    oe.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    oe.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    oe.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return oe;
  }(D);

  w.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, w.prototype.compileInterpolationFunction = function () {
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
  }, w.prototype.bypassResampler = function (e) {
    return this.noReturn ? (this.outputBuffer = e, e.length) : e;
  }, w.prototype.bufferSlice = function (e) {
    if (this.noReturn) return e;try {
      return this.outputBuffer.subarray(0, e);
    } catch (t) {
      try {
        return this.outputBuffer.length = e, this.outputBuffer;
      } catch (t) {
        return this.outputBuffer.slice(0, e);
      }
    }
  }, w.prototype.initializeBuffers = function () {
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
    if (e) for (var t = e.length, i = 0; i < t && be < ce;) {
      ue[be++] = e[i++];
    }
  }, M.prototype.writeAudio = function (e) {
    0 == this.audioType ? this.MOZWriteAudio(e) : 1 == this.audioType ? this.callbackBasedWriteAudio(e) : 2 == this.audioType && (this.checkFlashInit() || le ? this.callbackBasedWriteAudio(e) : this.mozAudioFound && this.MOZWriteAudio(e));
  }, M.prototype.writeAudioNoCallback = function (e) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(e) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(e) : 2 == this.audioType && (this.checkFlashInit() || le ? this.callbackBasedWriteAudioNoCallback(e) : this.mozAudioFound && this.MOZWriteAudioNoCallback(e));
  }, M.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (A() * ye.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + be;if (2 == this.audioType) {
      if (this.checkFlashInit() || le) return (A() * ye.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + be;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, M.prototype.MOZExecuteCallback = function () {
    var e = de - this.remainingBuffer();0 < e && this.writeMozAudio(this.underRunCallback(e));
  }, M.prototype.callbackBasedExecuteCallback = function () {
    var e = de - this.remainingBuffer();0 < e && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(e));
  }, M.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || le ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
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
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, pe), this.samplesAlreadyWritten = 0;var e = 2 == this.audioChannels ? [0, 0] : [0],
        t = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        t += this.audioHandleMoz.mozWriteAudio(e);
      }for (var i = t / this.audioChannels, n = 0; n < i; n++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(e);
      }
    }this.samplesAlreadyWritten += t, de += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, M.prototype.initializeMozAudio = function () {
    this.writeMozAudio(k(de)), this.audioType = 0;
  }, M.prototype.initializeWebAudio = function () {
    if (!le) throw new Error("");I(me), this.audioType = 1;
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
      }t = C(e.length, ce - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(e);this.samplesAlreadyWritten += i;for (var n = 0; t > i; --t) {
        this.mozAudioTail.push(e[n++]);
      }
    }
  }, M.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, ge), I(44100)), this.flashInitialized;
  };var se,
      re,
      ae = 2048,
      le = !1,
      ue = [],
      he = [],
      de = 15e3,
      ce = 25e3,
      me = 44100,
      pe = 0,
      fe = !1,
      ge = 0,
      ye = null,
      be = 0,
      ve = 0,
      we = 0,
      Me = 2,
      ke = w;!function (e) {
    e[e.VoIP = 2048] = "VoIP", e[e.Audio = 2049] = "Audio", e[e.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(se || (se = {})), function (e) {
    e[e.OK = 0] = "OK", e[e.BadArgument = -1] = "BadArgument", e[e.BufferTooSmall = -2] = "BufferTooSmall", e[e.InternalError = -3] = "InternalError", e[e.InvalidPacket = -4] = "InvalidPacket", e[e.Unimplemented = -5] = "Unimplemented", e[e.InvalidState = -6] = "InvalidState", e[e.AllocFail = -7] = "AllocFail";
  }(re || (re = {}));var Ee = function () {
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
      Be = function () {
    function e(e, t, i, n) {
      if (void 0 === n && (n = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !Ee.validFrameDuration(n)) throw "invalid frame duration";this.frame_size = e * n / 1e3;var o = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(e, t, i, o), 0 != getValue(o, "i32")) throw "opus_encoder_create failed: " + getValue(o, "i32");this.in_ptr = _malloc(this.frame_size * t * 4), this.in_len = this.frame_size * t, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = Ee.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return e.prototype.encode = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_i16.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var o = new ArrayBuffer(n);new Uint8Array(o).set(this.out_buf.subarray(0, n)), t.push(o);
      }return i < e.length && (this.in_i16.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_float = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_f32.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= n) throw "opus_encode failed: " + n;var o = new ArrayBuffer(n);new Uint8Array(o).set(this.out_buf.subarray(0, n)), t.push(o);
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
      Se = function () {
    function e(e, t) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = t;var i = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(e, t, i), 0 != getValue(i, "i32")) throw "opus_decoder_create failed: " + getValue(i, "i32");this.in_ptr = _malloc(Ee.getMaxFrameSize(t)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Ee.getMaxFrameSize(t)), this.out_len = Ee.getMaxSamplesPerChannel(e);var n = this.out_len * t * 4;this.out_ptr = _malloc(n), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + n >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + n >> 2);
    }return e.prototype.decode = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Int16Array(t * this.channels);return i.set(this.out_i16.subarray(0, i.length)), i;
    }, e.prototype.decode_float = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode_float(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Float32Array(t * this.channels);return i.set(this.out_f32.subarray(0, i.length)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, e;
  }();var Ae = null;
  var Ie = function Ie() {
    _classCallCheck(this, Ie);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = Ae;
  };

  var xe = function (_Ie) {
    _inherits(xe, _Ie);

    function xe() {
      var _this20;

      _classCallCheck(this, xe);

      (_this20 = _possibleConstructorReturn(this, _Ie.call(this)), _this20), _this20.queueSize = 5120, _this20.unstableSeconds = 0, _this20.stableSeconds = 0, _this20.minimalQueueSize = _this20.queueSize;_this20.defaultConfig.codec.sampleRate, _this20.defaultConfig.codec.bufferSize;_this20.perfectRate = 50, _this20.lowestAcceptable = _this20.perfectRate - 5, _this20.highestAcceptable = _this20.perfectRate + 5;return _this20;
    }

    xe.prototype.isAcceptable = function isAcceptable(e) {
      return e >= this.lowestAcceptable && e <= this.highestAcceptable;
    };

    xe.prototype.handleMeasurement = function handleMeasurement(e) {
      this.isAcceptable(e) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    xe.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    xe.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    xe.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return xe;
  }(Ie);

  var Ce = function () {
    function Ce(e) {
      var _this21 = this;

      _classCallCheck(this, Ce);

      this.ticks = 0, this.task = setInterval(function () {
        e(_this21.ticks), _this21.ticks = 0;
      }, 1e3);
    }

    Ce.prototype.tick = function tick() {
      this.ticks++;
    };

    Ce.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return Ce;
  }();

  var _e = function () {
    function _e() {
      var _this22 = this;

      _classCallCheck(this, _e);

      this.buffer = new Float32Array(0), this.processor = new xe(), this.tickTimer = new Ce(function (e) {
        _this22.processor.handleMeasurement(e);
      });
    }

    _e.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    _e.prototype.write = function write(e, t) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;t = e.sampler.resampler(t);var n = new Float32Array(i + t.length);n.set(this.buffer, 0), n.set(t, i), this.buffer = n;
    };

    _e.prototype.read = function read(e) {
      var t = this.buffer.subarray(0, e);return this.buffer = this.buffer.subarray(e, this.buffer.length), t;
    };

    _e.prototype.length = function length() {
      return this.buffer.length;
    };

    _e.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return _e;
  }();

  var Te = function (_Ie2) {
    _inherits(Te, _Ie2);

    function Te(e, t) {
      var _this23;

      _classCallCheck(this, Te);

      (_this23 = _possibleConstructorReturn(this, _Ie2.call(this)), _this23), _this23.config = _this23.defaultConfig, _this23.config.codec = _this23.config.codec || _this23.defaultConfig.codec, _this23.config.server = _this23.config.server || _this23.defaultConfig.server, _this23.sampler = new ke(_this23.config.codec.sampleRate, _this23.audioContext.sampleRate, 1, _this23.config.codec.bufferSize), _this23.parentSocket = t, _this23.decoder = new Se(_this23.config.codec.sampleRate, _this23.config.codec.channels), _this23.silence = new Float32Array(_this23.config.codec.bufferSize);return _this23;
    }

    Te.prototype.start = function start() {
      var _this24 = this;

      this.audioQueue = new _e(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (e) {
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

    Te.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    Te.prototype.setVolume = function setVolume(e) {
      this.gainNode && (this.gainNode.gain.value = e);
    };

    Te.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return Te;
  }(Ie);

  var Pe = function () {
    function Pe(e, t) {
      _classCallCheck(this, Pe);

      this.room = e, this.roomMember = t, this.isStopped = !1, this.player = new Te({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    Pe.prototype.setVolume = function setVolume(e) {
      null != this.player && this.player.setVolume(e / 50);
    };

    Pe.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return Pe;
  }();

  var ze = function ze(e, t, i) {
    _classCallCheck(this, ze);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(e, t, i) : void navigator.mediaDevices.getUserMedia(e).then(function (e) {
      return t(e);
    }).catch(function (e) {
      return i(e);
    }) : void navigator.webkitGetUserMedia(e, t, i) : void navigator.getUserMedia(e, t, i);
  };

  var Le = function (_D2) {
    _inherits(Le, _D2);

    function Le(e) {
      _classCallCheck(this, Le);

      var _this25 = _possibleConstructorReturn(this, _D2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

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
          new ze({ audio: !0 }, function (t) {
            _this25.hide(), t.getTracks()[0].stop(), new Le(e);
          }, function (t) {
            console.log(t), _this25.hide(), _this25.deniedMessage(), e(null);
          });
        };else {
          null != _this25.requestBox && _this25.requestBox.hide();var _i6 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = t[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _e20 = _step19.value;
              _i6 += '<option value="' + _e20.id + '">' + _e20.name + "</option>";
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
            var _e19 = document.getElementById("select-mic-dropdown");for (var _t10 = 0; _t10 < _e19.options.length; _t10++) {
              _e19.options[_t10].innerText === Cookies.get("default-mic") && (_e19.options[_t10].selected = !0);
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

    Le.prototype.getId = function getId() {
      var e = document.getElementById("select-mic-dropdown");for (var t = 0; t < e.options.length; t++) {
        if (e.options[t].innerText == Cookies.get("default-mic")) return e.options[t].value;
      }return "default";
    };

    Le.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new D("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return Le;
  }(D);

  var Oe = function (_Ie3) {
    _inherits(Oe, _Ie3);

    function Oe(e, t) {
      var _this26;

      _classCallCheck(this, Oe);

      (_this26 = _possibleConstructorReturn(this, _Ie3.call(this)), _this26), _this26.config = e, _this26.config.codec = _this26.config.codec || _this26.defaultConfig.codec, _this26.sampler = new ke(_this26.audioContext.sampleRate, _this26.config.codec.sampleRate, 1, _this26.config.codec.bufferSize), _this26.parentSocket = t, _this26.encoder = new Be(_this26.config.codec.sampleRate, _this26.config.codec.channels, _this26.config.codec.app, _this26.config.codec.frameDuration);return _this26;
    }

    Oe.prototype._makeStream = function _makeStream(e) {
      var _this27 = this;

      new ze({ audio: this.config.micId }, function (e) {
        _this27.stream = e, _this27.audioInput = _this27.audioContext.createMediaStreamSource(e), _this27.gainNode = _this27.audioContext.createGain(), _this27.recorder = _this27.audioContext.createScriptProcessor(_this27.config.codec.bufferSize, 1, 1), _this27.recorder.onaudioprocess = function (e) {
          var t = _this27.sampler.resampler(e.inputBuffer.getChannelData(0)),
              i = _this27.encoder.encode_float(t);for (var _e21 = 0; _e21 < i.length; _e21++) {
            1 === _this27.socket.readyState && _this27.socket.send(i[_e21]);
          }
        }, _this27.audioInput.connect(_this27.gainNode), _this27.gainNode.connect(_this27.recorder), _this27.recorder.connect(_this27.audioContext.destination);
      }, e || this.onError);
    };

    Oe.prototype.start = function start(e) {
      var _this28 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(e);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var t = this.socket.onopen;this.socket.onopen = function () {
          t && t(), _this28._makeStream(e);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this28._shutdown(), console.log("Disconnected from server");
      };
    };

    Oe.prototype.mute = function mute() {
      this.gainNode.gain.value = 0, console.log("Mic muted");
    };

    Oe.prototype.unMute = function unMute() {
      this.gainNode.gain.value = 1, console.log("Mic unmuted");
    };

    Oe.prototype.onError = function onError(e) {
      var t = new Error(e.name);throw t.name = "NavigatorUserMediaError", t;
    };

    Oe.prototype._shutdown = function _shutdown() {
      this.audioInput && (this.audioInput.disconnect(), this.audioInput = null), this.gainNode && (this.gainNode.disconnect(), this.gainNode = null), this.recorder && (this.recorder.disconnect(), this.recorder = null), null != this.stream && this.stream.getTracks().forEach(function (e) {
        e.stop();
      });
    };

    Oe.prototype.stop = function stop() {
      this._shutdown(), this.parentSocket || this.socket.close();
    };

    return Oe;
  }(Ie);

  var Re = function () {
    function Re(e) {
      var _this29 = this;

      _classCallCheck(this, Re);

      this.room = e, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new Le(function (e) {
        _this29.shutdown(), setTimeout(function () {
          _this29.micId = !(null != e) || e, _this29.start();
        }, 5e3);
      });
    }

    Re.prototype.mute = function mute() {
      this.isMuted = !0, this.streamer.mute();
    };

    Re.prototype.unMute = function unMute() {
      this.isMuted = !1, this.streamer.unMute();
    };

    Re.prototype.start = function start() {
      this.streamer = new Oe({ micId: this.micId }, new WebSocket(this.room.voiceServer.ws + "/stream?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&accessToken=" + this.room.accessToken)), this.streamer.start(), this.isRunning = !0;
    };

    Re.prototype.shutdown = function shutdown() {
      null != this.streamer && this.streamer.stop(), this.isRunning = !1;
    };

    return Re;
  }();

  var He = function () {
    function He(e, t, i) {
      _classCallCheck(this, He);

      this.room = e, this.uuid = t, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new oe(e, i, this), this.volume = e.main.mediaManager.getMasterVolume();
    }

    He.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    He.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new Pe(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
    };

    He.prototype.setVolume = function setVolume(e) {
      this.volume = e, this.card.isMuted || this.voiceReceiver.setVolume(e);
    };

    He.prototype.muteReceiver = function muteReceiver() {
      this.voiceReceiver.setVolume(0);
    };

    He.prototype.unmuteReceiver = function unmuteReceiver() {
      this.voiceReceiver.setVolume(this.volume);
    };

    He.prototype.broadcastStream = function broadcastStream() {
      this.voiceBroadcast = new Re(this.room);
    };

    return He;
  }();

  var Ue = function () {
    function Ue(e, t, i, n, o, s) {
      var _this30 = this;

      _classCallCheck(this, Ue);

      this.main = e, this.voiceServer = t, this.roomId = i, this.accessToken = o, this.roomMembers = new Map(), this.currentUser = n, this.isUnsubscribing = !1, new D("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this30.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this30.toggleMic();
      }, s.forEach(function (e) {
        _this30.registerMember(e.uuid, e.name);
      });
    }

    Ue.prototype.toggleMic = function toggleMic() {
      var _this31 = this;

      var e = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (t) {
        null != t.voiceBroadcast && (e = t.voiceBroadcast);
      }), e.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", e.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", e.mute()), setTimeout(function () {
        _this31.muteMicButtonElement.disabled = !1, _this31.canToggleMute = !0;
      }, 1e3));
    };

    Ue.prototype.unsubscribe = function unsubscribe() {
      var _this32 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new D("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), v(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (e) {
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

    Ue.prototype.resubToPlayer = function resubToPlayer(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.connectStream());
    };

    Ue.prototype.handleMemberLeaving = function handleMemberLeaving(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceBroadcast && (t.voiceBroadcast.shutdown(), t.voiceBroadcast.changeMicPopup.hide()), null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.removeCard(), this.roomMembers.delete(e), 1 === this.roomMembers.size && this.unsubscribe());
    };

    Ue.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new D("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    Ue.prototype.errorHandler = function errorHandler(e) {
      new D("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(e);
    };

    Ue.prototype.registerMember = function registerMember(e, t) {
      var i = new He(this, e, t);this.roomMembers.set(e, i), e == this.currentUser.uuid ? i.broadcastStream() : i.connectStream();
    };

    return Ue;
  }();

  var Fe = function () {
    function Fe(e, t, i, n) {
      var _this33 = this;

      _classCallCheck(this, Fe);

      var o = [];t.forEach(function (t) {
        t != e.tokenSet.name && o.push(t);
      }), e.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var s = o.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + s, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this33.ignored = !0, _this33.hide(_this33), new D("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this33.ignored || (_this33.ignored = !0, _this33.hide(_this33), new D("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), n());
      };this.onTimeout = r, document.getElementById("call-deny-button").onclick = r;
    }

    Fe.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return Fe;
  }();

  var Ne = function () {
    function Ne(e) {
      _classCallCheck(this, Ne);

      this.room = null, this.main = e, this.currentUser = e.currentUser;
    }

    Ne.prototype.promptCall = function promptCall(e, t, i, n, o) {
      var _this34 = this;

      null == this.room ? new Fe(this.main, n, function () {
        _this34.room = new Ue(_this34.main, e, t, _this34.main.tokenSet, i, o);
      }, function () {
        v(_this34.voiceServer.rest + "/leave-room?room=" + t + "&uuid=" + _this34.currentUser.uuid + "&accessToken=" + i).then(function (e) {
          e.json().then(function (e) {
            0 === e.results.length ? _this34.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (e) {
            _this34.leaveErrorhandler(e);
          });
        }).catch(function (e) {
          _this34.leaveErrorhandler(e);
        });
      }) : new D("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    Ne.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new D("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    Ne.prototype.handleSocketClosed = function handleSocketClosed() {
      null == this.room || this.room.unsubscribe();
    };

    Ne.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    Ne.prototype.setVolume = function setVolume(e) {
      null != this.room && this.room.roomMembers.forEach(function (t) {
        null != t.voiceReceiver && t.setVolume(e);
      });
    };

    return Ne;
  }();

  var De = function () {
    function De(e) {
      _classCallCheck(this, De);

      this.main = e, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    De.prototype.setupPermissions = function setupPermissions() {
      var _this35 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new D("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this35.requestNotificationPermissions();
      });
    };

    De.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/avatar/" + this.main.tokenSet.name });
    };

    De.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this36 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this36.requestBox.hide(), new D("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this36.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return De;
  }();

  var Ve = i(0);i.d(t, "OpenAudioMc", function () {
    return We;
  });
  var We = function (_ref) {
    _inherits(We, _ref);

    function We() {
      var _this37, _ret2;

      _classCallCheck(this, We);

      if ((_this37 = _possibleConstructorReturn(this, _ref.call(this)), _this37), _this37.canStart = !1, _this37.host = null, _this37.background = null, _this37.tokenSet = new G().fromUrl(window.location.href), null == _this37.tokenSet) return _ret2 = void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />"), _possibleConstructorReturn(_this37, _ret2);_this37.notificationModule = new De(_this37), _this37.timeService = new L(), _this37.messages = new O(_this37), _this37.userInterfaceModule = new R(_this37), _this37.hueConfiguration = new Q(_this37), _this37.mediaManager = new N(_this37), Ae = new (window.AudioContext || window.webkitAudioContext)(), _this37.voiceModule = new Ne(_this37), _this37.boot();new ne("https://plus.openaudiomc.net/").route(_this37).then(function (e) {
        _this37.canStart = !0, _this37.host = e.host, _this37.background = e.background;
      }).catch(function (e) {
        console.error("Exception thrown", e.stack), _this37.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff."), new D("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred while connecting to the server, please request a new url and try again.");
      });return _possibleConstructorReturn(_this37);
    }

    We.prototype.start = function start() {
      console.log("init"), this.canStart && (this.canStart = !1, this.hueModule = new H(this, Object(Ve.a)()), this.socketModule = new V(this, this.host), this.messages.apply(), new Z(this), "" !== this.background && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + this.background + ");\n    -webkit-background-size: cover;\n    background-size: cover;"));
    };

    return We;
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
    var e = new G().fromUrl(window.location.href);null == e ? (document.getElementById("footer-welcome").innerText = "No authentication provided", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />") : (document.body.onclick = function () {
      J.canStart && J.start();
    }, null != e && null != e.name && (document.getElementById("sidebar-head").style.background = "linear-gradient(0deg, rgba(42, 38, 95, .8), rgba(42, 38, 95, .4)), url(https://minotar.net/avatar/" + e.name + ")", document.getElementById("footer-welcome").innerText = "Logged in as " + e.name, J = new We()));
  }();
}]);
