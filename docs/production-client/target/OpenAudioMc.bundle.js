"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  function t(o) {
    if (i[o]) return i[o].exports;var n = i[o] = { i: o, l: !1, exports: {} };return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
  }var i = {};t.m = e, t.c = i, t.d = function (e, i, o) {
    t.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: o });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, i) {
    if (1 & i && (e = t(e)), 8 & i) return e;if (4 & i && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var o = Object.create(null);if (t.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & i && "string" != typeof e) for (var n in e) {
      t.d(o, n, function (t) {
        return e[t];
      }.bind(null, n));
    }return o;
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
    function o() {
      return s();
    }i.d(t, "a", function () {
      return o;
    });var n = function n(e, t, i, o) {
      var s = function s(t, n, _s) {
        return new o(function (e) {
          null !== _s && (_s = i.stringify(_s)), e(_s);
        }).then(function (i) {
          return e(n, { method: t, body: i });
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
          for (var _len = arguments.length, o = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            o[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(i)].concat(o));
        };
      },
          c = function c(e) {
        return function (n, s) {
          return o.resolve(new t(i.stringify({ address: n.slice(e.length), method: s.method, body: i.parse(s.body) })));
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
                  w = p + "/schedules",
                  v = p + "/scenes",
                  M = p + "/sensors",
                  k = p + "/rules",
                  E = p + "/resourcelinks",
                  S = function S(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  x = S(y),
                  A = S(b),
                  C = S(w),
                  B = S(v),
                  I = S(M),
                  T = S(k),
                  _ = S(E);return { getCapabilities: a.bind(null, f), deleteUser: d(h, function (e) {
                  return g + "/whitelist/" + e;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, p), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return u(y, e);
                }, getLight: d(a, x), setLight: d(l, x), setLightState: d(l, function (e) {
                  return x(e) + "/state";
                }), deleteLight: d(h, x), getGroups: a.bind(null, b), createGroup: u.bind(null, b), getGroup: d(a, A), setGroup: d(l, A), setGroupState: d(l, function (e) {
                  return A(e) + "/action";
                }), deleteGroup: d(h, A), getSchedules: a.bind(null, w), createSchedule: u.bind(null, w), getSchedule: d(a, C), setSchedule: d(l, C), deleteSchedule: d(h, C), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return n(c(s), t, i, o).bridge(e).user(m);
                }, getScenes: a.bind(null, v), createScene: u.bind(null, v), getScene: d(a, B), setScene: d(l, B), setSceneLightState: function setSceneLightState(e, t, i) {
                  return l(B(e) + "/lightstates/" + t, i);
                }, deleteScene: d(h, B), getSensors: a.bind(null, M), createSensor: u.bind(null, M), searchForNewSensors: u.bind(null, M, null), getNewSensors: a.bind(null, M + "/new"), getSensor: d(a, I), setSensor: d(l, I), setSensorConfig: d(l, function (e) {
                  return I(e) + "/config";
                }), setSensorState: d(l, function (e) {
                  return I(e) + "/state";
                }), deleteSensor: d(h, I), getRules: a.bind(null, k), createRule: u.bind(null, k), getRule: d(a, T), setRule: d(l, T), deleteRule: d(h, T), ruleActionGenerator: function ruleActionGenerator() {
                  return n(c(p), t, i, o).bridge(e).user(m);
                }, getResourceLinks: a.bind(null, E), createResourceLink: u.bind(null, E), getResourceLink: d(a, _), setResourceLink: d(l, _), deleteResourceLink: d(h, _) };
            } };
        } };
    };var s = void 0;"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (s = n.bind(null, fetch, Response, JSON, Promise), void 0 !== e.exports && (e.exports = s));
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
  function o(e, t) {
    function i(e, t) {
      var i = 0,
          n = t || e.innerHTML,
          s = n.length;Q.push(window.setInterval(function () {
        i >= s && (i = 0), n = o(n, i), e.innerHTML = n, i++;
      }, 0));
    }function o(e, t) {
      var i = _(function (e, t) {
        return z(Math.random() * (t - e + 1)) + e;
      }(64, 90));return e.substr(0, t) + i + e.substr(t + 1, e.length);
    }var n = void 0,
        s = void 0,
        r = t.childNodes.length;if (-1 < e.indexOf("<br>")) {
      t.innerHTML = e;for (var _e2 = 0; _e2 < r; _e2++) {
        s = t.childNodes[_e2], 3 === s.nodeType && (n = document.createElement("span"), n.innerHTML = s.nodeValue, t.replaceChild(n, s), i(n));
      }
    } else i(t, e);
  }function n(e, t) {
    var i = t.length,
        n = document.createElement("span"),
        s = !1;for (var _r = 0; _r < i; _r++) {
      n.style.cssText += Z[t[_r]] + ";", "§k" === t[_r] && (o(e, n), s = !0);
    }return s || (n.innerHTML = e), n;
  }function s(e) {
    var t,
        i,
        o = e.match(/&.{1}/g) || [],
        s = [],
        r = [],
        a = document.createDocumentFragment(),
        l = o.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t = 0; _t < l; _t++) {
      s.push(e.indexOf(o[_t])), e = e.replace(o[_t], "\0\0");
    }0 !== s[0] && a.appendChild(n(e.substring(0, s[0]), []));for (var _u = 0; _u < l; _u++) {
      if (2 === (i = s[_u + 1] - s[_u])) {
        for (; 2 == i;) {
          r.push(o[_u]), _u++, i = s[_u + 1] - s[_u];
        }r.push(o[_u]);
      } else r.push(o[_u]);-1 < r.lastIndexOf("§r") && (r = r.slice(r.lastIndexOf("§r") + 1)), t = e.substring(s[_u], s[_u + 1]), a.appendChild(n(t, r));
    }return a;
  }function r(e) {
    if ("string" != typeof e && (e += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function a(e) {
    return "string" != typeof e && (e += ""), e;
  }function l(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return oe.iterable && (t[Symbol.iterator] = function () {
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
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : oe.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : oe.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : oe.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : oe.arrayBuffer && oe.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = m(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : oe.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || se(e)) ? this._bodyArrayBuffer = m(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : oe.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, oe.blob && (this.blob = function () {
      var e = h(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(c);
    }), this.text = function () {
      var e = h(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            i = d(t);return t.readAsText(e), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), i = Array(t.length), o = 0; o < t.length; o++) {
          i[o] = _(t[o]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, oe.formData && (this.formData = function () {
      return this.text().then(g);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function f(e, t) {
    var i = (t = t || {}).body;if (e instanceof f) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0);
    } else this.url = e + "";if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return -1 < re.indexOf(t) ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function g(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var i = e.split("="),
            o = i.shift().replace(/\+/g, " "),
            n = i.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(o), decodeURIComponent(n));
      }
    }), t;
  }function y(e) {
    var t = new u();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var i = e.split(":"),
          o = i.shift().trim();if (o) {
        var n = i.join(":").trim();t.append(o, n);
      }
    }), t;
  }function b(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e);
  }function w(e, t) {
    return new Promise(function (i, o) {
      function n() {
        r.abort();
      }var s = new f(e, t);if (s.signal && s.signal.aborted) return o(new le("Aborted", "AbortError"));var r = new XMLHttpRequest();r.onload = function () {
        var e = { status: r.status, statusText: r.statusText, headers: y(r.getAllResponseHeaders() || "") };e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");var t = "response" in r ? r.response : r.responseText;i(new b(t, e));
      }, r.onerror = function () {
        o(new TypeError("Network request failed"));
      }, r.ontimeout = function () {
        o(new TypeError("Network request failed"));
      }, r.onabort = function () {
        o(new le("Aborted", "AbortError"));
      }, r.open(s.method, s.url, !0), "include" === s.credentials ? r.withCredentials = !0 : "omit" === s.credentials && (r.withCredentials = !1), "responseType" in r && oe.blob && (r.responseType = "blob"), s.headers.forEach(function (e, t) {
        r.setRequestHeader(t, e);
      }), s.signal && (s.signal.addEventListener("abort", n), r.onreadystatechange = function () {
        4 === r.readyState && s.signal.removeEventListener("abort", n);
      }), r.send(void 0 === s._bodyInit ? null : s._bodyInit);
    });
  }function v(e, t, i, o, n) {
    this.fromSampleRate = e, this.toSampleRate = t, this.channels = 0 | i, this.outputBufferSize = o, this.noReturn = !!n, this.initialize();
  }function M(e, t, i, o, n, s) {
    this.audioChannels = 2 == e ? 2 : 1, Me = 1 == this.audioChannels, ve = 0 < t && 16777215 >= t ? t : 44100, ye = i >= me << 1 && i < o ? i & (Me ? 4294967295 : 4294967294) : me << 1, be = z(o) > ye + this.audioChannels ? o & (Me ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof n ? n : function () {}, ke = -1 <= s && 1 >= s && 0 != s ? s : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function k(e) {
    try {
      var t = new Float32Array(e);
    } catch (t) {
      var t;Array(e);
    }for (var i = 0; i < e; ++i) {
      t[i] = ke * (i / e);
    }return t;
  }function E(e) {
    try {
      var t = new Float32Array(e);
    } catch (o) {
      t = Array(e);var i = 0;do {
        t[i] = 0;
      } while (++i < e);
    }return t;
  }function S() {
    for (var e = "", t = "", i = 0; i < me && xe != Ae; ++i) {
      e += _(12288 + (0 | 16383 * T(I(ge[xe++] + 1, 0), 2))), t += _(12288 + (0 | 16383 * T(I(ge[xe++] + 1, 0), 2))), xe == Ce && (xe = 0);
    }return e + t;
  }function x() {
    for (var e = "", t = 0; t < me && xe != Ae; ++t) {
      e += _(12288 + (0 | 16383 * T(I(ge[xe++] + 1, 0), 2))), xe == Ce && (xe = 0);
    }return e;
  }function A() {
    return (xe <= Ae ? 0 : Ce) + Ae - xe;
  }function C(e) {
    fe = k(be), Se = be, xe = 0, Ae = 0, Ce = I(be * Math.ceil(ve / e), me) << 1, Me ? (ge = E(Ce), Ee = new v(ve, e, 1, Ce, !0), x) : (ge = E(Ce <<= 1), Ee = new v(ve, e, 2, Ce, !0), S);
  }function B(e, t) {
    w("https://plus.openaudiomc.net/cf-log/production", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: t, message: e }) }).then(function (e) {
      e.json().then(function (e) {
        console.log("Reported error. Reponse was: " + JSON.stringify(e));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }var I = Math.max,
      T = Math.min,
      _ = String.fromCharCode,
      P = Math.abs,
      O = Math.round,
      z = Math.floor;i.r(t);
  var L = function () {
    function L() {
      _classCallCheck(this, L);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    L.prototype.sync = function sync(e, t) {
      var i = new Date(e),
          o = new Date().getTime();o += 60 * t * 60 * 1e3;var n = new Date(o);this.isServerAhead = i.getTime() > n.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - n.getTime() : n.getTime() - i.getTime(), this.hasSynced = !0;
    };

    L.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return L;
  }();

  var R = function () {
    function R(e) {
      _classCallCheck(this, R);

      this.fallback = "No message provided in oa+", this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    R.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return R;
  }();

  var N = function () {
    function N(e) {
      var _this = this;

      _classCallCheck(this, N);

      this.openAudioMc = e, document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    N.prototype.changeColor = function changeColor(e, t) {
      var i = function (e) {
        return e = e.replace("#", ""), "rgb(" + parseInt(e.substring(0, 2), 16) + ", " + parseInt(e.substring(2, 4), 16) + ", " + parseInt(e.substring(4, 6), 16) + ")";
      }(e);document.querySelectorAll("*").forEach(function (e) {
        var o = window.getComputedStyle(e);Object.keys(o).reduce(function (n, s) {
          var r = o[s],
              a = o.getPropertyValue(r);if (0 <= a.indexOf(i)) {
            var _o = a.replace(i, t);0 <= r.indexOf("border-top") ? e.style.borderTop = "2px solid " + _o : e.style[r] = _o;
          }
        });
      });
    };

    N.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    N.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    N.prototype.openApp = function openApp() {
      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage), document.getElementById("page").classList.remove("dark-bg");
    };

    N.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    N.prototype.kickScreen = function kickScreen(e) {
      document.getElementById("footer-welcome").innerText = "Session terminated", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = null == e ? this.openAudioMc.messages.errorMessage : e, document.getElementById("welcome").style.display = "", document.getElementById("page").classList.add("dark-bg"), document.getElementById("app").style.display = "none";
    };

    N.prototype.showVolumeSlider = function showVolumeSlider(e) {
      e ? (document.getElementById("volume-label").style.display = "", document.getElementById("volume-disp").style.display = "") : (document.getElementById("volume-disp").style.display = "none", document.getElementById("volume-label").style.display = "none");
    };

    return N;
  }();

  var U = function () {
    function U(e, t) {
      var _this2 = this;

      _classCallCheck(this, U);

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

    U.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-bridge-menu-button").style.display = "none", void this.openAudioMc.getUserInterfaceModule().showMain();null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    U.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    U.prototype.onConnect = function onConnect() {
      var _this3 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this3.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this3.currentUser.getLights().then(function (e) {
          var t = [];for (var _i in e) {
            e.hasOwnProperty(_i) && t.push({ name: e[_i].name, id: parseInt(_i) });
          }_this3.openAudioMc.getHueConfiguration().setLightNamesAndIds(t);null != Cookies.get("hue-state") && (_this3.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this3.openAudioMc.getHueConfiguration().applyState(), _this3.openAudioMc.getHueConfiguration().updateState();
        }), _this3.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    U.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    U.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 0 != 2 * t.alpha * 127.5, hue: z(65535 * t.hue / 360), sat: z(255 * t.saturation), bri: O(2 * t.alpha * 127.5) };
    };

    U.prototype.setLight = function setLight(e, t) {
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

    U.prototype.linkBridge = function linkBridge(e, t) {
      var _this5 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this5.linkBridge(e, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var o = 0,
          n = -1;n = setInterval(function () {
        function e() {
          clearInterval(n);
        }if (o++, 60 < o) return e(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this5.startSetup();
        }, void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - o;document.getElementById("hue-linking-message").innerText = _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", t), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null == t[0].error ? null != t[0].success && (i.currentUser = i.currentBridge.user(t[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + o + " attempt(s)."), i.isLinked = !0, i.onConnect(), e()) : 101 === t[0].error.type || (e(), _this5.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type));
        });
      }, 1e3);
    };

    return U;
  }();

  var F = function () {
    function F(e) {
      _classCallCheck(this, F);

      this.channelName = e, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    F.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    F.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    F.prototype.addSound = function addSound(e) {
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

    F.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    F.prototype.registerMixer = function registerMixer(e) {
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

    F.prototype.fadeChannel = function fadeChannel(e, t, i) {
      var _this6 = this;

      this.interruptFade(), null == i && (i = function i() {}), this.targetAfterFade = e, this.isFading = !0, function (e, t, o, n) {
        t = t || 1e3, o = o || 0, n = n;var s = _this6.channelVolume,
            r = t / P(s - o),
            a = setInterval(function () {
          s = s > o ? s - 1 : s + 1;var e = _this6.mixer.masterVolume,
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

          if (_this6.channelVolume = s, s == o) {
            i(), clearInterval(a);var _e5 = _this6.fadeTimer.indexOf(a);-1 < _e5 && _this6.fadeTimer.splice(_e5, 1), _this6.isFading = !1, a = null;
          }
        }, r);_this6.fadeTimer.push(a);
      }(0, t, e, i);
    };

    F.prototype.interruptFade = function interruptFade() {
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

    F.prototype._updateVolume = function _updateVolume() {
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

    F.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
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

    F.prototype.destroy = function destroy() {
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

    return F;
  }();

  var D = function () {
    function D(e, t) {
      _classCallCheck(this, D);

      this.openAudioMc = t, this.mixerName = e, this.masterVolume = 100, this.channels = new Map();
    }

    D.prototype.updateCurrent = function updateCurrent() {
      var e = [];this.channels.forEach(function (t, i) {
        var o = [];t.tags.forEach(function (e, t) {
          o.push(t);
        }), t.trackable && e.push({ name: i, tags: o });
      });
    };

    D.prototype.setMasterVolume = function setMasterVolume(e) {
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

    D.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;t = e instanceof F ? e : this.channels.get(e), null != t && (t.destroy(), this.channels.delete(t.channelName)), this.updateCurrent();
    };

    D.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    D.prototype.addChannel = function addChannel(e) {
      if (!(e instanceof F)) throw new Error("Argument isn't a channel");{
        var _t4 = e.channelName,
            _i2 = this.channels.get(_t4);null != _i2 && _i2.destroy(), e.registerMixer(this), this.channels.set(_t4, e);
      }
    };

    return D;
  }();

  var H = function () {
    function H(e, t, i, o) {
      _classCallCheck(this, H);

      this.publicServerKey = e, this.uuid = t, this.name = i, this.token = o;
    }

    H.prototype.fromUrl = function fromUrl(e) {
      if (null == e) return null;if (2 > e.split("?").length) return null;var t = function () {
        function _class() {
          _classCallCheck(this, _class);
        }

        _class.getParametersFromUrl = function getParametersFromUrl(e) {
          if (-1 < e.indexOf("?&")) return {};var t = e.split("&"),
              i = {};for (var _e12 = 0; _e12 < t.length; _e12++) {
            var _o2 = t[_e12].split("="),
                _n = decodeURIComponent(_o2[0]),
                _s2 = decodeURIComponent(_o2[1]);void 0 === i[_n] ? i[_n] = decodeURIComponent(_s2) : "string" == typeof i[_n] ? i[_n] = [i[_n], decodeURIComponent(_s2)] : i[_n].push(decodeURIComponent(_s2));
          }return i;
        };

        return _class;
      }().getParametersFromUrl(e.split("?")[1]);if (null == t.data) return null;var i = atob(t.data).split(":");if (4 !== i.length) return null;var o = i[0],
          n = i[1],
          s = i[2],
          r = i[3];return null != o && 16 >= o.length && null != n && 40 >= n.length && null != s && 40 >= s.length && null != r && 5 >= r.length ? new H(s, n, o, r) : null;
    };

    return H;
  }();

  var V = "https://media.openaudiomc.net/proxy?apiurl=",
      W = "https://media.openaudiomc.net/youtube?id=",
      j = "https://media.openaudiomc.net/soundcloud?u=",
      q = "https://media.openaudiomc.net/googledrive?id=";"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var e = {};return Object.getOwnPropertyNames(this).forEach(function (t) {
        e[t] = this[t];
      }, this), e;
    }, configurable: !0, writable: !0 });
  var G = function (_ref) {
    _inherits(G, _ref);

    function G(e) {
      var _this7;

      _classCallCheck(this, G);

      (_this7 = _possibleConstructorReturn(this, _ref.call(this)), _this7), e = _this7.translate(e), _this7.soundElement = new Audio(), _this7.hadError = !1, _this7.source = e, _this7.error = null, _this7.trackable = !1, _this7.soundElement.onerror = function (e) {
        _this7.hadError = !0, _this7.error = e, _this7._handleError();
      }, _this7.soundElement.src = e, _this7.soundElement.setAttribute("preload", "auto"), _this7.soundElement.setAttribute("controls", "none"), _this7.soundElement.setAttribute("display", "none"), _this7.soundElement.preload = "auto", _this7.soundElement.abort = console.log, _this7.openAudioMc = null, _this7.onFinish = null, _this7.loop = !1, _this7.mixer = null, _this7.channel = null, _this7.finsishedInitializing = !1, _this7.gotShutDown = !1;return _this7;
    }

    G.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    G.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _t5 = this.soundElement.error.code,
            _i3 = null;if (this.isYoutube ? _i3 = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === _t5 ? _i3 = "MEDIA_ERR_ABORTED" : 2 === _t5 ? _i3 = "MEDIA_ERR_NETWORK" : 3 === _t5 ? _i3 = "MEDIA_ERR_DECODE" : 4 === _t5 && (_i3 = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != _i3) {
          console.log("[OpenAudioMc] Reporting media failure " + _i3);var e = function e(_e13, t, i) {
            var o = {};return Object.getOwnPropertyNames(_e13).forEach(function (t) {
              o[t] = _e13[t];
            }), JSON.stringify(o, t, i);
          };this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + _i3 + "\ndump=" + e(this.error, null, "\t") + e(this.soundElement.error, null, "\t") + "\nhostname=" + window.location.host), this.openAudioMc.socketModule.send("media_failure", { mediaError: _i3, source: this.soundElement.src });
        }
      }
    };

    G.prototype.addNode = function addNode(e, t) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", this.soundElement.src.includes("http") && !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + this.soundElement.src), this.controller = e.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(t);
    };

    G.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    G.prototype.finalize = function finalize() {
      var _this8 = this;

      return new Promise(function (e) {
        _this8.soundElement.onended = function () {
          _this8.gotShutDown || !_this8.finsishedInitializing || (null != _this8.onFinish && _this8.onFinish(), _this8.loop ? (_this8.setTime(0), _this8.soundElement.play()) : (_this8.mixer.removeChannel(_this8.channel), !_this8.soundElement.paused && _this8.soundElement.pause()));
        };var t = !1;var i = function i() {
          if (!_this8.gotShutDown) {
            if (!t) {
              var _t6 = _this8.soundElement.play();_t6 instanceof Promise ? _t6.then(e).catch(e) : e();
            }t = !0;
          }
        };_this8.soundElement.onplay = function () {
          _this8.gotShutDown && (console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason."), _this8.soundElement.pause());
        }, _this8.soundElement.onprogress = i, _this8.soundElement.oncanplay = i, _this8.soundElement.oncanplaythrough = i;
      });
    };

    G.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    G.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    G.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish = e;
    };

    G.prototype.setVolume = function setVolume(e) {
      100 < e && (e = 100), this.soundElement.volume = e / 100;
    };

    G.prototype.startDate = function startDate(e) {
      var t = new Date(e),
          i = P((t.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          o = this.soundElement.duration;if (i > o) {
        i -= z(i / o) * o;
      }this.setTime(i);
    };

    G.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    G.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return G;
  }(function () {
    function _class2() {
      _classCallCheck(this, _class2);
    }

    _class2.prototype.translate = function translate(e) {
      if (e.includes("http://docs.google.com/uc?export=open&id=") && (e = e.replace("http://docs.google.com/uc?export=open&id=", q)), e.includes("https://docs.google.com/uc?export=open&id=") && (e = e.replace("https://docs.google.com/uc?export=open&id=", q)), this.isYoutube = !1, e.includes("youtube") || e.includes("youtu.be")) {
        var _t7 = e.split("v=")[1];e = W + _t7, this.isYoutube = !0;
      }e.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (e = e.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), e.includes("soundcloud.com") && (e = j + e), "https:" === location.protocol && e.includes("http") && !e.includes("https://") && (e = V + e);var t = new H().fromUrl(window.location.href);return e += e.includes("?") ? "&openAudioPlayerName=" + t.name : "?openAudioPlayerName=" + t.name, e += "&openAudioToken=" + t.token, e += "&openAudioPublicServerKey=" + t.publicServerKey;
    };

    return _class2;
  }());

  var J = function () {
    function J(e) {
      var _this9 = this;

      _classCallCheck(this, J);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.startSound = null, this.mixer = new D(null, e), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this9.setMasterVolume(e), Cookies.set("volume", e);
      };
    }

    J.prototype.postBoot = function postBoot() {
      var _this10 = this;

      if (null != this.startSound) {
        var _e14 = new F("startsound"),
            _t8 = new G(this.startSound);_t8.openAudioMc = this.openAudioMc, _t8.setOa(this.openAudioMc), _t8.finalize().then(function () {
          _this10.mixer.addChannel(_e14), _e14.addSound(_t8), _e14.setChannelVolume(100), _e14.updateFromMasterVolume(), _t8.finish();
        });
      }
    };

    J.prototype.destroySounds = function destroySounds(e, t, i) {
      var _this11 = this;

      this.openAudioMc.debugPrint("starting to quit fade " + e);var o = 100;i && (o = 0);var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step9.value;
          t ? i.fadeChannel(0, 5 * o, function () {
            _this11.mixer.removeChannel(i);
          }) : null == e || "" === e ? i.hasTag("SPECIAL") || i.hasTag("REGION") || i.hasTag("SPEAKER") || i.fadeChannel(0, 5 * o, function () {
            _this11.mixer.removeChannel(i);
          }) : i.hasTag(e) && (i.sounds.forEach(function (e) {
            e.gotShutDown = !0;
          }), i.fadeChannel(0, o, function () {
            _this11.mixer.removeChannel(i);
          }));
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

  var Y = function () {
    function Y(e, t) {
      _classCallCheck(this, Y);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    Y.prototype.show = function show(e) {
      var _this12 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this12.alertClass.hide(_this12.alertBox);
      }), !this.option.persistent) {
        var _e15 = setTimeout(function () {
          _this12.alertClass.hide(_this12.alertBox), clearTimeout(_e15);
        }, this.option.closeTime);
      }return this;
    };

    Y.prototype.hide = function hide() {
      var _this13 = this;

      this.alertBox.classList.add("hide");var e = setTimeout(function () {
        _this13.alertBox.parentNode.removeChild(_this13.alertBox), clearTimeout(e), null != _this13.onTimeout && _this13.onTimeout();
      }, 500);
    };

    return Y;
  }();

  var K = function () {
    function K(e, t) {
      var _this14 = this;

      _classCallCheck(this, K);

      if (this.handlers = {}, this.openAudioMc = e, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], null == function () {
        function _class3() {
          _classCallCheck(this, _class3);
        }

        _class3.getParameter = function getParameter() {
          var e = window.location.href.split("&"),
              t = {};for (var _i4 = 0; _i4 < e.length; _i4++) {
            var _o3 = e[_i4].split("="),
                _n2 = decodeURIComponent(_o3[0]),
                _s3 = decodeURIComponent(_o3[1]);void 0 === t[_n2] ? t[_n2] = decodeURIComponent(_s3) : "string" == typeof t[_n2] ? t[_n2] = [t[_n2], decodeURIComponent(_s3)] : t[_n2].push(decodeURIComponent(_s3));
          }return t;
        };

        return _class3;
      }().getParameter().data) return e.debugPrint("data is empty"), void e.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");e.debugPrint("Username: " + e.tokenSet.name), e.debugPrint("Player uuid: " + e.tokenSet.uuid), e.debugPrint("Server uuid: " + e.tokenSet.publicServerKey), e.debugPrint("Token: " + e.tokenSet.token), this.state = "loading", this.authHeader = "type=client&n=" + e.tokenSet.name + "&player=" + e.tokenSet.uuid + "&s=" + e.tokenSet.publicServerKey + "&p=" + e.tokenSet.token, e.debugPrint(this.authHeader);var i = this;this.socket = io(t, { query: i.authHeader, autoConnect: !1 }), this.socket.on("connect", function () {
        e.userInterfaceModule.openApp(), e.getUserInterfaceModule().setMessage(_this14.openAudioMc.getMessages().welcomeMessage), e.socketModule.state = "ok", _this14.hasConnected = !0, _this14.outgoingQueue.forEach(function (e) {
          _this14.send(e.key, e.value);
        });
      }), this.socket.on("time-update", function (e) {
        var t = e.split(":"),
            i = parseInt(t[1]),
            o = parseInt(t[0]);_this14.openAudioMc.getTimeService().sync(o, i);
      }), this.socket.on("disconnect", function () {
        e.debugPrint("closed"), e.getMediaManager().destroySounds(null, !0), i.state = "closed", e.voiceModule.handleSocketClosed(), e.userInterfaceModule.kickScreen(), setTimeout(function () {
          e.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (e) {
        var t = e.type.split("."),
            o = t[t.length - 1];null != i.handlers[o] && i.handlers[o](e.payload);
      }), this.socket.on("join-call", function (t) {
        var i = t.room,
            o = t.server,
            n = t.accessToken,
            s = t.members,
            r = [];var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = s[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _e16 = _step10.value;
            r.push(_e16.name);
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

        e.voiceModule.promptCall(o, i, n, r, s);
      }), this.socket.on("resub-to-player-in-call", function (t) {
        var i = e.voiceModule.room;null != i && i.resubToPlayer(t);
      }), this.socket.on("member-left-call", function (t) {
        var i = e.voiceModule.room;null != i && i.handleMemberLeaving(t);
      }), this.socket.connect();
    }

    K.prototype.send = function send(e, t) {
      this.hasConnected ? this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + e), this.socket.emit(e, t)) : console.log("[OpenAudioMc] could not satisfy callback " + e + " because the protocol is outdated") : this.outgoingQueue.push({ key: e, value: t });
    };

    K.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return K;
  }();

  var Q = [],
      Z = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _e17 = Q.length; _e17--;) {
        clearInterval(Q[_e17]);
      }Q = [];
    }(), s(this + "");
  };
  var X = function () {
    function X(e) {
      _classCallCheck(this, X);

      null != e && this.fromJson(e);
    }

    X.prototype.fromJson = function fromJson(e) {
      document.getElementById("card-panel").style.display = "", this.lines = [], this.title = e.title;var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = e.rows[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _t9 = _step11.value;
          this.lines.push(this.rowToHtml(_t9));
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

    X.prototype.replaceWithJson = function replaceWithJson(e, t) {
      document.getElementById(e).replaceWith(new DOMParser().parseFromString(this.partToHtml(t), "text/html").body.childNodes[0]);
    };

    X.prototype.rowToHtml = function rowToHtml(e) {
      var t = "";var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = e.textList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _i5 = _step12.value;
          t += this.partToHtml(_i5);
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

    X.prototype.partToHtml = function partToHtml(e) {
      var t = "",
          i = [],
          o = [];i.push("<p id='" + e.id + "'>"), o.push("</p>");var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = e.styles[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var _t10 = _step13.value;
          "BOLD" === _t10 ? (i.push("<b>"), o.push("</b>")) : "ITALLIC" === _t10 ? (i.push("<i>"), o.push("</i>")) : "UNDERLINE" === _t10 && (i.push("<u>"), o.push("</u>"));
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

      null != e.hyperlink && "" != e.hyperlink && (i.push("<a href='" + e.hyperlink + "'>"), o.push("</a>"));var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = i[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _e18 = _step14.value;
          t += _e18;
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
        for (var _iterator15 = o[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _e19 = _step15.value;
          t += _e19;
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

    return X;
  }();

  var $ = function () {
    function $(e, t, i) {
      _classCallCheck(this, $);

      this.x = e || 0, this.y = t || 0, this.z = i || 0;
    }

    $.prototype.add = function add(e, t, i) {
      return this.x += e, this.y += t, this.z += i, this;
    };

    $.prototype.applyQuaternion = function applyQuaternion(e) {
      var t = this.x,
          i = this.y,
          o = this.z,
          n = e.x,
          s = e.y,
          r = e.z,
          a = e.w,
          l = a * t + s * o - r * i,
          u = a * i + r * t - n * o,
          h = a * o + n * i - s * t,
          d = -n * t - s * i - r * o;return this.x = l * a + d * -n + u * -r - h * -s, this.y = u * a + d * -s + h * -n - l * -r, this.z = h * a + d * -r + l * -s - u * -n, this;
    };

    $.prototype.square = function square(e) {
      return e * e;
    };

    $.prototype.distance = function distance(e) {
      var t = this.square(this.x - e.x) + this.square(this.y - e.y) + this.square(this.z - e.z);return Math.sqrt(t);
    };

    return $;
  }();

  var ee = function () {
    function ee(e, t, i, o, n, s, r) {
      _classCallCheck(this, ee);

      this.id = e, this.source = t, this.location = i, this.type = o, this.maxDistance = n, this.startInstant = s, this.openAudioMc = r, this.channel = null;
    }

    ee.prototype.getDistance = function getDistance(e, t) {
      return t.location.distance(this.location);
    };

    return ee;
  }();

  var te = function () {
    function te(e) {
      var _this15 = this;

      _classCallCheck(this, te);

      function t(t, i) {
        e.socketModule.registerHandler(t, i);
      }this.openAudioMc = e, t("ClientCreateMediaPayload", function (t) {
        var i = t.media.loop,
            o = t.media.startInstant,
            n = t.media.mediaId,
            s = t.media.source,
            r = t.media.doPickup,
            a = t.media.fadeTime,
            l = t.distance,
            u = t.media.flag,
            h = t.maxDistance;var d = 100;null != t.media.volume && 0 != t.media.volume && (d = t.media.volume), e.getMediaManager().destroySounds(n, !1, !0);var c = new F(n);c.trackable = !0;var m = new G(s);if (m.openAudioMc = e, m.setOa(e), e.getMediaManager().mixer.addChannel(c), c.addSound(m), c.setChannelVolume(0), m.setLooping(i), c.setTag(n), 0 !== h) {
          var _e20 = _this15.convertDistanceToVolume(h, l);c.setTag("SPECIAL"), c.maxDistance = h, c.fadeChannel(_e20, a);
        } else c.setTag("DEFAULT"), setTimeout(function () {
          0 === a ? (c.setChannelVolume(d), c.updateFromMasterVolume()) : (c.updateFromMasterVolume(), c.fadeChannel(d, a));
        }, 1);c.setTag(u), e.getMediaManager().mixer.updateCurrent(), m.finalize().then(function () {
          r && m.startDate(o, !0), m.finish();
        });
      }), t("ClientDestroyCardPayload", function () {
        document.getElementById("card-panel").style.display = "none";
      }), t("ClientUpdateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new X().replaceWithJson(e.id, t);
      }), t("ClientCreateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new X(t);
      }), t("NotificationPayload", function (e) {
        var t = e.message;_this15.openAudioMc.notificationModule.sendNotification(e.title, t), new Y("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + t);
      }), t("ClientSettingsPayload", function (t) {
        _this15.openAudioMc.debugPrint("Updating settings...");var i = t.clientSettings,
            o = i.background,
            n = i.title,
            s = i.welcomeMessage,
            r = i.errorMessage,
            a = i.hueConnected,
            l = i.hueLinking,
            u = i.hueBridgeFound;if ("default" !== a && (e.getMessages().hueConnected = a), "default" !== l && (e.getMessages().hueLinking = l), "default" !== u && (e.getMessages().hueWelcome = u), "default" !== r && (e.getMessages().errorMessage = r), "default" !== s && (e.getMessages().welcomeMessage = s), "default" !== o && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + o + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== n) {
          document.title = n;try {
            parent.document.title = n;
          } catch (t) {}
        }e.getMessages().apply();
      }), t("ClientVersionPayload", function (t) {
        var i = parseInt(t.protocolRevision);console.log("[OpenAudioMc] Received PROTOCOL revision update"), 2 <= i && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), e.socketModule.callbacksEnabled = !0), 3 <= i && (console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks"), e.socketModule.supportsYoutube = !0);
      }), t("ClientVolumePayload", function (e) {
        var t = e.volume;_this15.openAudioMc.getMediaManager().setMasterVolume(t), document.getElementById("volume-slider").value = t;
      }), t("ClientDestroyMediaPayload", function (e) {
        _this15.openAudioMc.getMediaManager().destroySounds(e.soundId, e.all);
      }), t("HueColorPayload", function (t) {
        var i = t.lights,
            o = t.hueColor,
            n = "rgba(" + o.r + "," + o.g + "," + o.b + "," + function (e, t, i) {
          return (e - t[0]) * (i[1] - i[0]) / (t[1] - t[0]) + i[0];
        }(o.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(i, n);
      }), t("ClientUpdateMediaPayload", function (t) {
        var i = t.mediaOptions.target,
            o = t.mediaOptions.fadeTime,
            n = t.mediaOptions.distance;var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = e.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var _t11 = _step16.value;
            _t11.hasTag(i) && _t11.fadeChannel(_this15.convertDistanceToVolume(_t11.maxDistance, n), o);
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
            o = e.z,
            n = e.pitch,
            s = e.yaw;_this15.openAudioMc.world.player.updateLocation(new $(t, i, o), n, s);
      }), t("ClientSpeakerCreatePayload", function (e) {
        var t = e.clientSpeaker,
            i = new $(t.location.x, t.location.y, t.location.z).add(.5, .5, .5),
            o = new ee(t.id, t.source, i, t.type, t.maxDistance, t.startInstant, _this15.openAudioMc);_this15.openAudioMc.world.addSpeaker(t.id, o);
      }), t("ClientSpeakerDestroyPayload", function (e) {
        var t = e.clientSpeaker;_this15.openAudioMc.world.removeSpeaker(t.id);
      });
    }

    te.prototype.convertDistanceToVolume = function convertDistanceToVolume(e, t) {
      return O((e - t) / e * 100);
    };

    return te;
  }();

  var ie = function () {
    function ie() {
      var _this16 = this;

      _classCallCheck(this, ie);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this16.select();
        };
      });
    }

    ie.prototype.setBridgeName = function setBridgeName(e) {
      document.getElementById("bridge-name").innerText = e;
    };

    ie.prototype.select = function select() {
      this.updateState();
    };

    ie.prototype.applyState = function applyState() {
      var _this17 = this;

      this.state.forEach(function (e) {
        _this17.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    ie.prototype.updateState = function updateState() {
      var _this18 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this18.state.push(_this18.obtainSelection(e));
      }), Cookies.set("hue-state", this.state);
    };

    ie.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          i = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: i };
    };

    ie.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    ie.prototype.getInputById = function getInputById(e) {
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

    ie.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    ie.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return ie;
  }();

  var oe = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (oe.arrayBuffer) var ne = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      se = ArrayBuffer.isView || function (e) {
    return e && -1 < ne.indexOf(Object.prototype.toString.call(e));
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
  }, oe.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);var re = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];f.prototype.clone = function () {
    return new f(this, { body: this._bodyInit });
  }, p.call(f.prototype), p.call(b.prototype), b.prototype.clone = function () {
    return new b(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new u(this.headers), url: this.url });
  }, b.error = function () {
    var e = new b(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var ae = [301, 302, 303, 307, 308];b.redirect = function (e, t) {
    if (-1 === ae.indexOf(t)) throw new RangeError("Invalid status code");return new b(null, { status: t, headers: { location: e } });
  };var le = self.DOMException;try {
    new le();
  } catch (t) {
    (le = function le(e, t) {
      this.message = e, this.name = t;var i = Error(e);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), le.prototype.constructor = le;
  }w.polyfill = !0, self.fetch || (self.fetch = w, self.Headers = u, self.Request = f, self.Response = b);
  var ue = function () {
    function ue(e) {
      _classCallCheck(this, ue);

      this.host = e;
    }

    ue.prototype.route = function route(e) {
      var _this19 = this;

      return new Promise(function (t, i) {
        _this19.tokenSet = new H().fromUrl(window.location.href), w(_this19.host + "/api/v1/client/login/" + _this19.tokenSet.publicServerKey).then(function (o) {
          o.json().then(function (o) {
            if (null == o.errors || 0 != o.errors.length) return i(o.errors), void console.log(o.errors);var n = o.response;n.banned && (window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/blocked_domain.html");var r = n.secureEndpoint;null == r && (r = n.insecureEndpoint), console.log("[OpenAudioMc] accepting and applying settings"), e.debugPrint("Updating settings..."), null != n.backgroundImage && "" != n.backgroundImage && (n.backgroundImage = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + n.backgroundImage);var a = n.backgroundImage,
                l = n.title,
                u = n.clientWelcomeMessage,
                h = n.clientErrorMessage;var d = "";s(h).childNodes.forEach(function (e) {
              d += e.outerHTML;
            });var c = "";s(u).childNodes.forEach(function (e) {
              c += e.outerHTML;
            }), "" !== h && (e.getMessages().errorMessage = d), "" !== u && (e.getMessages().welcomeMessage = c);var m = n.greetingMessage;if (m = m.replace("%name", e.tokenSet.name), document.getElementById("welcome-text-landing").innerHTML = m, document.getElementById("boot-button").style.display = "", document.getElementById("boot-button").innerHTML = n.connectButtonText, e.getUserInterfaceModule().changeColor("#304FFE", n.accentColor), "" != n.startSound && (e.getMediaManager().startSound = n.startSound), "default" !== l) {
              document.title = l;try {
                parent.document.title = l;
              } catch (e) {}
            }t({ host: r, background: a });
          }).catch(function (e) {
            console.log("Dead end 1"), i(e);
          });
        }).catch(function (e) {
          console.log("Dead end 2"), i(e);
        });
      });
    };

    return ue;
  }();

  var he = function (_Y) {
    _inherits(he, _Y);

    function he(e, t, i) {
      var _this20;

      _classCallCheck(this, he);

      (_this20 = _possibleConstructorReturn(this, _Y.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this20), _this20.room = e, _this20.username = t, _this20.isMuted = !1, _this20.member = i;var o = '<img class="call-box" src="https://minotar.net/avatar/' + t + '" />';o += '<div class="call-content" id="user-box-content-' + t + '">', o += '<div style="text-align: center;"><p>(loading)</p></div>', o += "</div>", _this20.show(o, !0), _this20.setUsernameAsContent(), document.getElementById("user-box-content-" + _this20.username).onmouseenter = function () {
        _this20.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onmouseout = function () {
        _this20.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onclick = function () {
        _this20.room.main.tokenSet.name !== _this20.username && _this20.onClickHandler();
      };return _this20;
    }

    he.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    he.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    he.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return he;
  }(Y);

  v.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, v.prototype.compileInterpolationFunction = function () {
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
  }, v.prototype.bypassResampler = function (e) {
    return this.noReturn ? (this.outputBuffer = e, e.length) : e;
  }, v.prototype.bufferSlice = function (e) {
    if (this.noReturn) return e;try {
      return this.outputBuffer.subarray(0, e);
    } catch (t) {
      try {
        return this.outputBuffer.length = e, this.outputBuffer;
      } catch (t) {
        return this.outputBuffer.slice(0, e);
      }
    }
  }, v.prototype.initializeBuffers = function () {
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
    if (e) for (var t = e.length, i = 0; i < t && Se < be;) {
      fe[Se++] = e[i++];
    }
  }, M.prototype.writeAudio = function (e) {
    0 == this.audioType ? this.MOZWriteAudio(e) : 1 == this.audioType ? this.callbackBasedWriteAudio(e) : 2 == this.audioType && (this.checkFlashInit() || pe ? this.callbackBasedWriteAudio(e) : this.mozAudioFound && this.MOZWriteAudio(e));
  }, M.prototype.writeAudioNoCallback = function (e) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(e) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(e) : 2 == this.audioType && (this.checkFlashInit() || pe ? this.callbackBasedWriteAudioNoCallback(e) : this.mozAudioFound && this.MOZWriteAudioNoCallback(e));
  }, M.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (A() * Ee.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Se;if (2 == this.audioType) {
      if (this.checkFlashInit() || pe) return (A() * Ee.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + Se;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, M.prototype.MOZExecuteCallback = function () {
    var e = ye - this.remainingBuffer();0 < e && this.writeMozAudio(this.underRunCallback(e));
  }, M.prototype.callbackBasedExecuteCallback = function () {
    var e = ye - this.remainingBuffer();0 < e && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(e));
  }, M.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || pe ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
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
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, ve), this.samplesAlreadyWritten = 0;var e = 2 == this.audioChannels ? [0, 0] : [0],
        t = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        t += this.audioHandleMoz.mozWriteAudio(e);
      }for (var i = t / this.audioChannels, o = 0; o < i; o++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(e);
      }
    }this.samplesAlreadyWritten += t, ye += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, M.prototype.initializeMozAudio = function () {
    this.writeMozAudio(k(ye)), this.audioType = 0;
  }, M.prototype.initializeWebAudio = function () {
    if (!pe) throw new Error("");C(we), this.audioType = 1;
  }, M.prototype.initializeFlashAudio = function () {
    var e = document.getElementById("XAudioJS");if (null == e) {
      var t = this,
          i = document.createElement("div");i.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var o = document.createElement("div");o.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), o.setAttribute("id", "XAudioJS"), i.appendChild(o), document.getElementsByTagName("body")[0].appendChild(i), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (e) {
        e.success ? t.audioHandleFlash = e.ref : t.audioType = 1;
      });
    } else this.audioHandleFlash = e;this.audioType = 2;
  }, M.prototype.writeMozAudio = function (e) {
    if (e) {
      var t = this.mozAudioTail.length;if (0 < t) {
        var i = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += i, this.mozAudioTail.splice(0, i);
      }t = T(e.length, be - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(e);this.samplesAlreadyWritten += i;for (var o = 0; t > i; --t) {
        this.mozAudioTail.push(e[o++]);
      }
    }
  }, M.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, ke), C(44100)), this.flashInitialized;
  };var de,
      ce,
      me = 2048,
      pe = !1,
      fe = [],
      ge = [],
      ye = 15e3,
      be = 25e3,
      we = 44100,
      ve = 0,
      Me = !1,
      ke = 0,
      Ee = null,
      Se = 0,
      xe = 0,
      Ae = 0,
      Ce = 2,
      Be = v;!function (e) {
    e[e.VoIP = 2048] = "VoIP", e[e.Audio = 2049] = "Audio", e[e.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(de || (de = {})), function (e) {
    e[e.OK = 0] = "OK", e[e.BadArgument = -1] = "BadArgument", e[e.BufferTooSmall = -2] = "BufferTooSmall", e[e.InternalError = -3] = "InternalError", e[e.InvalidPacket = -4] = "InvalidPacket", e[e.Unimplemented = -5] = "Unimplemented", e[e.InvalidState = -6] = "InvalidState", e[e.AllocFail = -7] = "AllocFail";
  }(ce || (ce = {}));var Ie = function () {
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
      Te = function () {
    function e(e, t, i, o) {
      if (void 0 === o && (o = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !Ie.validFrameDuration(o)) throw "invalid frame duration";this.frame_size = e * o / 1e3;var n = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(e, t, i, n), 0 != getValue(n, "i32")) throw "opus_encoder_create failed: " + getValue(n, "i32");this.in_ptr = _malloc(this.frame_size * t * 4), this.in_len = this.frame_size * t, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = Ie.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return e.prototype.encode = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_i16.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(e.subarray(i, i + this.in_len)), i += this.in_len);var o = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= o) throw "opus_encode failed: " + o;var n = new ArrayBuffer(o);new Uint8Array(n).set(this.out_buf.subarray(0, o)), t.push(n);
      }return i < e.length && (this.in_i16.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_float = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        0 < this.in_off ? (this.in_f32.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(e.subarray(i, i + this.in_len)), i += this.in_len);var o = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (0 >= o) throw "opus_encode failed: " + o;var n = new ArrayBuffer(o);new Uint8Array(n).set(this.out_buf.subarray(0, o)), t.push(n);
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
      _e = function () {
    function e(e, t) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = t;var i = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(e, t, i), 0 != getValue(i, "i32")) throw "opus_decoder_create failed: " + getValue(i, "i32");this.in_ptr = _malloc(Ie.getMaxFrameSize(t)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Ie.getMaxFrameSize(t)), this.out_len = Ie.getMaxSamplesPerChannel(e);var o = this.out_len * t * 4;this.out_ptr = _malloc(o), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + o >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + o >> 2);
    }return e.prototype.decode = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Int16Array(t * this.channels);return i.set(this.out_i16.subarray(0, i.length)), i;
    }, e.prototype.decode_float = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode_float(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (0 > t) throw "opus_decode failed: " + t;var i = new Float32Array(t * this.channels);return i.set(this.out_f32.subarray(0, i.length)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, e;
  }();var Pe = null;
  var Oe = function Oe() {
    _classCallCheck(this, Oe);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = Pe;
  };

  var ze = function (_Oe) {
    _inherits(ze, _Oe);

    function ze() {
      var _this21;

      _classCallCheck(this, ze);

      (_this21 = _possibleConstructorReturn(this, _Oe.call(this)), _this21), _this21.queueSize = 5120, _this21.unstableSeconds = 0, _this21.stableSeconds = 0, _this21.minimalQueueSize = _this21.queueSize;_this21.defaultConfig.codec.sampleRate, _this21.defaultConfig.codec.bufferSize;_this21.perfectRate = 50, _this21.lowestAcceptable = _this21.perfectRate - 5, _this21.highestAcceptable = _this21.perfectRate + 5;return _this21;
    }

    ze.prototype.isAcceptable = function isAcceptable(e) {
      return e >= this.lowestAcceptable && e <= this.highestAcceptable;
    };

    ze.prototype.handleMeasurement = function handleMeasurement(e) {
      this.isAcceptable(e) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    ze.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    ze.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    ze.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return ze;
  }(Oe);

  var Le = function () {
    function Le(e) {
      var _this22 = this;

      _classCallCheck(this, Le);

      this.ticks = 0, this.task = setInterval(function () {
        e(_this22.ticks), _this22.ticks = 0;
      }, 1e3);
    }

    Le.prototype.tick = function tick() {
      this.ticks++;
    };

    Le.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return Le;
  }();

  var Re = function () {
    function Re() {
      var _this23 = this;

      _classCallCheck(this, Re);

      this.buffer = new Float32Array(0), this.processor = new ze(), this.tickTimer = new Le(function (e) {
        _this23.processor.handleMeasurement(e);
      });
    }

    Re.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    Re.prototype.write = function write(e, t) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;t = e.sampler.resampler(t);var o = new Float32Array(i + t.length);o.set(this.buffer, 0), o.set(t, i), this.buffer = o;
    };

    Re.prototype.read = function read(e) {
      var t = this.buffer.subarray(0, e);return this.buffer = this.buffer.subarray(e, this.buffer.length), t;
    };

    Re.prototype.length = function length() {
      return this.buffer.length;
    };

    Re.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return Re;
  }();

  var Ne = function (_Oe2) {
    _inherits(Ne, _Oe2);

    function Ne(e, t) {
      var _this24;

      _classCallCheck(this, Ne);

      (_this24 = _possibleConstructorReturn(this, _Oe2.call(this)), _this24), _this24.config = _this24.defaultConfig, _this24.config.codec = _this24.config.codec || _this24.defaultConfig.codec, _this24.config.server = _this24.config.server || _this24.defaultConfig.server, _this24.sampler = new Be(_this24.config.codec.sampleRate, _this24.audioContext.sampleRate, 1, _this24.config.codec.bufferSize), _this24.parentSocket = t, _this24.decoder = new _e(_this24.config.codec.sampleRate, _this24.config.codec.channels), _this24.silence = new Float32Array(_this24.config.codec.bufferSize);return _this24;
    }

    Ne.prototype.start = function start() {
      var _this25 = this;

      this.audioQueue = new Re(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (e) {
        _this25.audioQueue.length() ? e.outputBuffer.getChannelData(0).set(_this25.audioQueue.read(_this25.config.codec.bufferSize)) : e.outputBuffer.getChannelData(0).set(_this25.silence);
      }, this.gainNode = this.audioContext.createGain(), this.scriptNode.connect(this.gainNode), this.gainNode.connect(this.audioContext.destination), this.socket = this.parentSocket, this.socket.onmessage = function (e) {
        if (e.data instanceof Blob) {
          _this25.audioQueue.tick();var t = new FileReader();t.onload = function () {
            _this25.audioQueue.write(_this25, _this25.decoder.decode_float(t.result));
          }, t.readAsArrayBuffer(e.data);
        }
      }, this.socketKeepAliveTimer = setInterval(function () {
        try {
          if (_this25.socket.readyState === WebSocket.CLOSED) return void clearInterval(_this25.socketKeepAliveTimer);_this25.socket.send("1");
        } catch (e) {
          clearInterval(_this25.socketKeepAliveTimer);
        }
      }, 1e3);
    };

    Ne.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    Ne.prototype.setVolume = function setVolume(e) {
      this.gainNode && (this.gainNode.gain.value = e);
    };

    Ne.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return Ne;
  }(Oe);

  var Ue = function () {
    function Ue(e, t) {
      _classCallCheck(this, Ue);

      this.room = e, this.roomMember = t, this.isStopped = !1, this.player = new Ne({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    Ue.prototype.setVolume = function setVolume(e) {
      null != this.player && this.player.setVolume(e / 50);
    };

    Ue.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return Ue;
  }();

  var Fe = function Fe(e, t, i) {
    _classCallCheck(this, Fe);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(e, t, i) : void navigator.mediaDevices.getUserMedia(e).then(function (e) {
      return t(e);
    }).catch(function (e) {
      return i(e);
    }) : void navigator.webkitGetUserMedia(e, t, i) : void navigator.getUserMedia(e, t, i);
  };

  var De = function (_Y2) {
    _inherits(De, _Y2);

    function De(e) {
      _classCallCheck(this, De);

      var _this26 = _possibleConstructorReturn(this, _Y2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

      var t = [],
          i = !1;navigator.mediaDevices.enumerateDevices().then(function (e) {
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
          for (var _iterator18 = e[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var _o4 = _step18.value;
            "audioinput" == _o4.kind && ("" === _o4.label ? i = !0 : t.push({ name: _o4.label, id: _o4.deviceId }));
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
        if (i) _this26.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br /><a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> </div>'), document.getElementById("request-mic-permissions").onclick = function () {
          new Fe({ audio: !0 }, function (t) {
            _this26.hide(), t.getTracks()[0].stop(), new De(e);
          }, function (t) {
            console.log(t), _this26.hide(), _this26.deniedMessage(), e(null);
          });
        };else {
          null != _this26.requestBox && _this26.requestBox.hide();var _i6 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = t[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _e22 = _step19.value;
              _i6 += '<option value="' + _e22.id + '">' + _e22.name + "</option>";
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

          if (_i6 += "</select>", _this26.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?<br /><small>changes can take a second or two to apply</small><br />' + _i6 + '<div id="mic-loader" style="display:none;"><h2>Switching mic input. Please wait.</h2><div class="loader"></div></div></div>'), null != Cookies.get("default-mic")) {
            var _e21 = document.getElementById("select-mic-dropdown");for (var _t12 = 0; _t12 < _e21.options.length; _t12++) {
              _e21.options[_t12].innerText === Cookies.get("default-mic") && (_e21.options[_t12].selected = !0);
            }
          }document.getElementById("select-mic-dropdown").onchange = function (t) {
            document.getElementById("select-mic-dropdown").disabled = !0, document.getElementById("select-mic-dropdown").style.display = "none", document.getElementById("mic-loader").style.display = "", Cookies.set("default-mic", t.target.selectedOptions[0].childNodes[0].data), e(_this26.getId()), setTimeout(function () {
              document.getElementById("select-mic-dropdown").style.display = "", document.getElementById("mic-loader").style.display = "none", document.getElementById("select-mic-dropdown").disabled = !1;
            }, 6e3);
          }, e(_this26.getId());
        }
      }).catch(function (e) {
        return console.error(e);
      });return _this26;
    }

    De.prototype.getId = function getId() {
      var e = document.getElementById("select-mic-dropdown");for (var t = 0; t < e.options.length; t++) {
        if (e.options[t].innerText == Cookies.get("default-mic")) return e.options[t].value;
      }return "default";
    };

    De.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new Y("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return De;
  }(Y);

  var He = function (_Oe3) {
    _inherits(He, _Oe3);

    function He(e, t) {
      var _this27;

      _classCallCheck(this, He);

      (_this27 = _possibleConstructorReturn(this, _Oe3.call(this)), _this27), _this27.config = e, _this27.config.codec = _this27.config.codec || _this27.defaultConfig.codec, _this27.sampler = new Be(_this27.audioContext.sampleRate, _this27.config.codec.sampleRate, 1, _this27.config.codec.bufferSize), _this27.parentSocket = t, _this27.encoder = new Te(_this27.config.codec.sampleRate, _this27.config.codec.channels, _this27.config.codec.app, _this27.config.codec.frameDuration);return _this27;
    }

    He.prototype._makeStream = function _makeStream(e) {
      var _this28 = this;

      new Fe({ audio: this.config.micId }, function (e) {
        _this28.stream = e, _this28.audioInput = _this28.audioContext.createMediaStreamSource(e), _this28.gainNode = _this28.audioContext.createGain(), _this28.recorder = _this28.audioContext.createScriptProcessor(_this28.config.codec.bufferSize, 1, 1), _this28.recorder.onaudioprocess = function (e) {
          var t = _this28.sampler.resampler(e.inputBuffer.getChannelData(0)),
              i = _this28.encoder.encode_float(t);for (var _e23 = 0; _e23 < i.length; _e23++) {
            1 === _this28.socket.readyState && _this28.socket.send(i[_e23]);
          }
        }, _this28.audioInput.connect(_this28.gainNode), _this28.gainNode.connect(_this28.recorder), _this28.recorder.connect(_this28.audioContext.destination);
      }, e || this.onError);
    };

    He.prototype.start = function start(e) {
      var _this29 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(e);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var t = this.socket.onopen;this.socket.onopen = function () {
          t && t(), _this29._makeStream(e);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this29._shutdown(), console.log("Disconnected from server");
      };
    };

    He.prototype.mute = function mute() {
      this.gainNode.gain.value = 0, console.log("Mic muted");
    };

    He.prototype.unMute = function unMute() {
      this.gainNode.gain.value = 1, console.log("Mic unmuted");
    };

    He.prototype.onError = function onError(e) {
      var t = new Error(e.name);throw t.name = "NavigatorUserMediaError", t;
    };

    He.prototype._shutdown = function _shutdown() {
      this.audioInput && (this.audioInput.disconnect(), this.audioInput = null), this.gainNode && (this.gainNode.disconnect(), this.gainNode = null), this.recorder && (this.recorder.disconnect(), this.recorder = null), null != this.stream && this.stream.getTracks().forEach(function (e) {
        e.stop();
      });
    };

    He.prototype.stop = function stop() {
      this._shutdown(), this.parentSocket || this.socket.close();
    };

    return He;
  }(Oe);

  var Ve = function () {
    function Ve(e) {
      var _this30 = this;

      _classCallCheck(this, Ve);

      this.room = e, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new De(function (e) {
        _this30.shutdown(), setTimeout(function () {
          _this30.micId = !(null != e) || e, _this30.start();
        }, 5e3);
      });
    }

    Ve.prototype.mute = function mute() {
      this.isMuted = !0, this.streamer.mute();
    };

    Ve.prototype.unMute = function unMute() {
      this.isMuted = !1, this.streamer.unMute();
    };

    Ve.prototype.start = function start() {
      this.streamer = new He({ micId: this.micId }, new WebSocket(this.room.voiceServer.ws + "/stream?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&accessToken=" + this.room.accessToken)), this.streamer.start(), this.isRunning = !0;
    };

    Ve.prototype.shutdown = function shutdown() {
      null != this.streamer && this.streamer.stop(), this.isRunning = !1;
    };

    return Ve;
  }();

  var We = function () {
    function We(e, t, i) {
      _classCallCheck(this, We);

      this.room = e, this.uuid = t, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new he(e, i, this), this.volume = e.main.mediaManager.getMasterVolume();
    }

    We.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    We.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new Ue(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
    };

    We.prototype.setVolume = function setVolume(e) {
      this.volume = e, this.card.isMuted || this.voiceReceiver.setVolume(e);
    };

    We.prototype.muteReceiver = function muteReceiver() {
      this.voiceReceiver.setVolume(0);
    };

    We.prototype.unmuteReceiver = function unmuteReceiver() {
      this.voiceReceiver.setVolume(this.volume);
    };

    We.prototype.broadcastStream = function broadcastStream() {
      this.voiceBroadcast = new Ve(this.room);
    };

    return We;
  }();

  var je = function () {
    function je(e, t, i, o, n, s) {
      var _this31 = this;

      _classCallCheck(this, je);

      this.main = e, this.voiceServer = t, this.roomId = i, this.accessToken = n, this.roomMembers = new Map(), this.currentUser = o, this.isUnsubscribing = !1, new Y("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this31.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this31.toggleMic();
      }, s.forEach(function (e) {
        _this31.registerMember(e.uuid, e.name);
      });
    }

    je.prototype.toggleMic = function toggleMic() {
      var _this32 = this;

      var e = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (t) {
        null != t.voiceBroadcast && (e = t.voiceBroadcast);
      }), e.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", e.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", e.mute()), setTimeout(function () {
        _this32.muteMicButtonElement.disabled = !1, _this32.canToggleMute = !0;
      }, 1e3));
    };

    je.prototype.unsubscribe = function unsubscribe() {
      var _this33 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new Y("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), w(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (e) {
        e.json().then(function (e) {
          0 !== e.results.length && (_this33.roomMembers.forEach(function (e) {
            _this33.handleMemberLeaving(e.uuid);
          }), document.getElementById("call-control-box").style.display = "none", _this33.main.voiceModule.clearCall());
        }).catch(function (e) {
          console.error(e.stack), _this33.leaveErrorhandler(e);
        });
      }).catch(function (e) {
        console.error(e.stack), _this33.leaveErrorhandler(e);
      }));
    };

    je.prototype.resubToPlayer = function resubToPlayer(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.connectStream());
    };

    je.prototype.handleMemberLeaving = function handleMemberLeaving(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceBroadcast && (t.voiceBroadcast.shutdown(), t.voiceBroadcast.changeMicPopup.hide()), null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.removeCard(), this.roomMembers.delete(e), 1 === this.roomMembers.size && this.unsubscribe());
    };

    je.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new Y("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    je.prototype.errorHandler = function errorHandler(e) {
      new Y("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(e);
    };

    je.prototype.registerMember = function registerMember(e, t) {
      var i = new We(this, e, t);this.roomMembers.set(e, i), e == this.currentUser.uuid ? i.broadcastStream() : i.connectStream();
    };

    return je;
  }();

  var qe = function () {
    function qe(e, t, i, o) {
      var _this34 = this;

      _classCallCheck(this, qe);

      var n = [];t.forEach(function (t) {
        t != e.tokenSet.name && n.push(t);
      }), e.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var s = n.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + s, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this34.ignored = !0, _this34.hide(_this34), new Y("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this34.ignored || (_this34.ignored = !0, _this34.hide(_this34), new Y("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), o());
      };this.onTimeout = r, document.getElementById("call-deny-button").onclick = r;
    }

    qe.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return qe;
  }();

  var Ge = function () {
    function Ge(e) {
      _classCallCheck(this, Ge);

      this.room = null, this.main = e, this.currentUser = e.currentUser;
    }

    Ge.prototype.promptCall = function promptCall(e, t, i, o, n) {
      var _this35 = this;

      null == this.room ? new qe(this.main, o, function () {
        _this35.room = new je(_this35.main, e, t, _this35.main.tokenSet, i, n);
      }, function () {
        w(_this35.voiceServer.rest + "/leave-room?room=" + t + "&uuid=" + _this35.currentUser.uuid + "&accessToken=" + i).then(function (e) {
          e.json().then(function (e) {
            0 === e.results.length ? _this35.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (e) {
            _this35.leaveErrorhandler(e);
          });
        }).catch(function (e) {
          _this35.leaveErrorhandler(e);
        });
      }) : new Y("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    Ge.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new Y("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    Ge.prototype.handleSocketClosed = function handleSocketClosed() {
      null == this.room || this.room.unsubscribe();
    };

    Ge.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    Ge.prototype.setVolume = function setVolume(e) {
      null != this.room && this.room.roomMembers.forEach(function (t) {
        null != t.voiceReceiver && t.setVolume(e);
      });
    };

    return Ge;
  }();

  var Je = function () {
    function Je(e) {
      _classCallCheck(this, Je);

      this.main = e, this.requestBox = null, "Notification" in window && this.setupPermissions();
    }

    Je.prototype.setupPermissions = function setupPermissions() {
      var _this36 = this;

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new Y("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this36.requestNotificationPermissions();
      });
    };

    Je.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/avatar/" + this.main.tokenSet.name });
    };

    Je.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this37 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this37.requestBox.hide(), new Y("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this37.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return Je;
  }();

  var Ye = i(0);var Ke = null;
  var Qe = function () {
    function Qe(e, t, i) {
      _classCallCheck(this, Qe);

      this.x = e || 0, this.y = t || 0, this.z = i || 0;
    }

    Qe.prototype.copy = function copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this;
    };

    return Qe;
  }();

  var Ze = function () {
    function Ze(e, t, i, o) {
      _classCallCheck(this, Ze);

      this.x = e || 0, this.y = t || 0, this.z = i || 0, this.w = void 0 === o ? 1 : o;
    }

    Ze.prototype.setFromEuler = function setFromEuler(e) {
      var t = Math.sin,
          i = Math.cos;var o = e.x,
          n = e.y,
          s = e.z,
          r = i(o / 2),
          a = i(n / 2),
          l = i(s / 2),
          u = t(o / 2),
          h = t(n / 2),
          d = t(s / 2);return this.x = u * a * l + r * h * d, this.y = r * h * l - u * a * d, this.z = r * a * d + u * h * l, this.w = r * a * l - u * h * d, this;
    };

    return Ze;
  }();

  var Xe = function () {
    function Xe() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new $();
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ze();

      _classCallCheck(this, Xe);

      this.position = e, this.rotation = t;
    }

    Xe.prototype.applyTo = function applyTo(e) {
      var t = this.position,
          i = new $(0, 0, 1).applyQuaternion(this.rotation),
          o = new $(0, 1, 0).applyQuaternion(this.rotation);e.positionX ? (e.positionX.value = t.x, e.positionY.value = t.y, e.positionZ.value = t.z) : e.setPosition(t.x, t.y, t.z), e instanceof PannerNode ? e.orientationX ? (e.orientationX.value = i.x, e.orientationY.value = i.y, e.orientationZ.value = i.z) : e.setOrientation(i.x, i.y, i.z) : e.forwardX ? (e.forwardX.value = i.x, e.forwardY.value = i.y, e.forwardZ.value = i.z, e.upX.value = o.x, e.upY.value = o.y, e.upZ.value = o.z) : e.setOrientation(i.x, i.y, i.z, o.x, o.y, o.z);
    };

    return Xe;
  }();

  var $e = function () {
    function $e(e, t, i, o) {
      _classCallCheck(this, $e);

      this.world = e, this.audioContext = window.AudioContext || window.webkitAudioContext, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(t, i, o);
    }

    $e.prototype.updateLocation = function updateLocation(e, t, i) {
      this.location = e, this.pitch = this.toRadians(t), this.yaw = this.toRadians(this.normalizeYaw(360 - i));var o = new Qe(this.pitch, this.yaw, 0),
          n = new Ze();n.setFromEuler(o);new Xe(e, n).applyTo(this.listener), this.world.onLocationUpdate();
    };

    $e.prototype.toRadians = function toRadians(e) {
      return e * (Math.PI / 180);
    };

    $e.prototype.normalizeYaw = function normalizeYaw(e) {
      return 0 > (e %= 360) && (e += 360), e;
    };

    return $e;
  }();

  var et = function et(e, t, i) {
    _classCallCheck(this, et);

    this.source = e, this.distance = t, this.speaker = i;
  };

  var tt = "SPEAKER_2D";
  var it = function it(e, t, i, o) {
    _classCallCheck(this, it);

    this.pannerNode = i.audioCtx.createPanner(), this.media = o, o.addNode(i, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = e.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var n = e.location;new Xe(n).applyTo(this.pannerNode), this.gainNode = i.audioCtx.createGain(), this.gainNode.gain.value = 1.5, this.pannerNode.connect(this.gainNode), this.gainNode.connect(i.audioCtx.destination);
  };

  var ot = function () {
    function ot(e, t, i) {
      var _this38 = this;

      _classCallCheck(this, ot);

      this.id = "SPEAKER__" + t, this.openAudioMc = e, this.speakerNodes = new Map();var o = new F(this.id);o.trackable = !0, this.channel = o;var n = new G(t);this.media = n, n.openAudioMc = e, n.setOa(e), o.mixer = this.openAudioMc.getMediaManager().mixer, o.addSound(n), this.media.setVolume(0), o.setChannelVolume(0), n.startDate(i, !0), n.finalize().then(function () {
        e.getMediaManager().mixer.addChannel(o), o.fadeChannel(100, 100), n.setLooping(!0), o.setTag(_this38.id), o.setTag("SPECIAL"), _this38.openAudioMc.getMediaManager().mixer.updateCurrent(), n.startDate(i, !0), n.finish();
      });
    }

    ot.prototype.removeSpeakerLocation = function removeSpeakerLocation(e) {
      null != this.speakerNodes.get(e) && this.speakerNodes.delete(e);
    };

    ot.prototype.updateLocation = function updateLocation(e, t, i) {
      if (e.type == tt) {
        var _o5 = e.getDistance(t, i),
            _n3 = this._convertDistanceToVolume(e.maxDistance, _o5);if (0 > _n3) return;this.channel.fadeChannel(_n3, 100);
      } else this.speakerNodes.has(e.id) || this.speakerNodes.set(e.id, new it(e, t, i, this.media));
    };

    ot.prototype._convertDistanceToVolume = function _convertDistanceToVolume(e, t) {
      return O((e - t) / e * 100);
    };

    ot.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return ot;
  }();

  var nt = function () {
    function nt(e) {
      _classCallCheck(this, nt);

      this.openAudioMc = e, this.speakers = new Map(), this.audioMap = new Map(), this.player = new $e(this, new $(0, 0, 0), 0, 0);
    }

    nt.prototype.getSpeakerById = function getSpeakerById(e) {
      return this.speakers.get(e);
    };

    nt.prototype.addSpeaker = function addSpeaker(e, t) {
      this.speakers.set(e, t), this.renderAudio2D();
    };

    nt.prototype.removeSpeaker = function removeSpeaker(e) {
      this.speakers.delete(e), this.audioMap.forEach(function (e, t) {
        e.removeSpeakerLocation(t);
      }), this.renderAudio2D();
    };

    nt.prototype.getMediaForSource = function getMediaForSource(e, t) {
      var i = this.audioMap.get(e);if (null != i) return i;if (null == t) return null;var o = new ot(this.openAudioMc, e, t);return this.audioMap.set(e, o), o;
    };

    nt.prototype.removeMediaFromSource = function removeMediaFromSource(e) {
      var t = this.getMediaForSource(e);null == t || (t.remove(), this.audioMap.delete(e));
    };

    nt.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    nt.prototype.isMediaUsed = function isMediaUsed(e) {
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = this.speakers.values()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var t = _step20.value;
          if (t.source == e) return !0;
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

      return !1;
    };

    nt.prototype.renderAudio2D = function renderAudio2D() {
      var _this39 = this;

      var e = [];this.speakers.forEach(function (t) {
        var i = t.getDistance(_this39, _this39.player);e.push(new et(t.source, i, t));
      });var t = new Map();var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = e[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var _i7 = _step21.value;
          var _e25 = t.get(_i7.source);null != _e25 ? Array.isArray(_e25) ? (_e25.push(_i7), t.set(_i7.source, _e25)) : _e25.distance > _i7.distance && _i7.distance <= _i7.speaker.maxDistance && t.set(_i7.source, _i7) : _i7.speaker.type == tt ? _i7.distance <= _i7.speaker.maxDistance && t.set(_i7.source, _i7) : _i7.distance <= _i7.speaker.maxDistance && t.set(_i7.source, [_i7]);
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

      t.forEach(function (e) {
        var t = Array.isArray(e) ? e : [e];var _iteratorNormalCompletion22 = true;
        var _didIteratorError22 = false;
        var _iteratorError22 = undefined;

        try {
          for (var _iterator22 = t[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
            var _e24 = _step22.value;
            _this39.getMediaForSource(_e24.source, _e24.speaker.startInstant).updateLocation(_e24.speaker, _this39, _this39.player);
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
      }), this.audioMap.forEach(function (e, t) {
        _this39.isMediaUsed(t) || _this39.removeMediaFromSource(t);
      });
    };

    return nt;
  }();

  i.d(t, "OpenAudioMc", function () {
    return st;
  });
  var st = function (_ref2) {
    _inherits(st, _ref2);

    function st() {
      var _this40, _ret2;

      _classCallCheck(this, st);

      if ((_this40 = _possibleConstructorReturn(this, _ref2.call(this)), _this40), _this40.canStart = !1, _this40.host = null, _this40.background = null, _this40.tokenSet = new H().fromUrl(window.location.href), null == _this40.tokenSet) return _ret2 = void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />"), _possibleConstructorReturn(_this40, _ret2);_this40.notificationModule = new Je(_this40), _this40.timeService = new L(), _this40.messages = new R(_this40), _this40.userInterfaceModule = new N(_this40), _this40.hueConfiguration = new ie(_this40), _this40.mediaManager = new J(_this40), Pe = new (window.AudioContext || window.webkitAudioContext)(), _this40.voiceModule = new Ge(_this40), _this40.boot();new ue("https://plus.openaudiomc.net/").route(_this40).then(function (e) {
        _this40.canStart = !0, _this40.host = e.host, _this40.background = e.background;
      }).catch(function (e) {
        console.error("Exception thrown", e.stack), _this40.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff."), new Y("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred while connecting to the server, please request a new url and try again.");
      });return _possibleConstructorReturn(_this40);
    }

    st.prototype.start = function start() {
      this.canStart && (this.canStart = !1, this.world = new nt(this), this.hueModule = new U(this, Object(Ye.a)()), this.socketModule = new K(this, this.host), this.messages.apply(), new te(this), "" !== this.background && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + this.background + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), this.mediaManager.postBoot());
    };

    st.prototype.sendError = function sendError(e) {
      B(e, this.tokenSet.name);
    };

    return st;
  }(function (_ref3) {
    _inherits(_class4, _ref3);

    function _class4() {
      _classCallCheck(this, _class4);

      return _possibleConstructorReturn(this, _ref3.apply(this, arguments));
    }

    _class4.prototype.log = function log(e) {
      console.log("[OpenAudioMc] " + e);
    };

    _class4.prototype.getMessages = function getMessages() {
      return this.messages;
    };

    _class4.prototype.getTimeService = function getTimeService() {
      return this.timeService;
    };

    _class4.prototype.getHueConfiguration = function getHueConfiguration() {
      return this.hueConfiguration;
    };

    _class4.prototype.debugPrint = function debugPrint(e) {
      this.log(e);
    };

    _class4.prototype.getMediaManager = function getMediaManager() {
      return this.mediaManager;
    };

    _class4.prototype.getHueModule = function getHueModule() {
      return this.hueModule;
    };

    _class4.prototype.getUserInterfaceModule = function getUserInterfaceModule() {
      return this.userInterfaceModule;
    };

    _class4.prototype.getVoiceService = function getVoiceService() {
      return this.voiceService;
    };

    return _class4;
  }(function () {
    function _class5() {
      _classCallCheck(this, _class5);

      console.log("%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", "background: linear-gradient(#D33106, #571402);border: 1px solid #3E0E02;color: white;display: block;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;line-height: 40px;text-align: center;font-weight: bold"), this.log("Enabling the web client for " + window.navigator.userAgent);
    }

    _class5.prototype.boot = function boot() {
      var e = Cookies.get("volume");Cookies.set("auto-join-call", !1), null != e && this.mediaManager.changeVolume(e);
    };

    return _class5;
  }()));

  !function () {
    if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/browsers.html");var e = new H().fromUrl(window.location.href);null == e ? (document.getElementById("footer-welcome").innerText = "No authentication provided", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />", B("A faulty login attempt was done at `" + window.location.host + "`", "Steve")) : (document.body.onclick = function () {
      Ke.canStart && Ke.start();
    }, null != e && null != e.name && (document.getElementById("sidebar-head").style.background = "linear-gradient(0deg, rgba(42, 38, 95, .8), rgba(42, 38, 95, .4)), url(https://minotar.net/avatar/" + e.name + ")", document.getElementById("footer-welcome").innerText = "Logged in as " + e.name, Ke = new st()), w("https://client.openaudiomc.net/status?referee=" + e.name).then(function (e) {
      e.json().then(function (e) {
        e.offline ? window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/network_error.html" : console.log("Server status:" + JSON.stringify(e));
      });
    }));
  }();
}]);
