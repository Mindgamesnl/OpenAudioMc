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
          c = function c(e, t) {
        return function (i) {
          for (var _len = arguments.length, n = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(i)].concat(n));
        };
      },
          d = function d(e) {
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
                  w = p + "/schedules",
                  v = p + "/scenes",
                  M = p + "/sensors",
                  S = p + "/rules",
                  E = p + "/resourcelinks",
                  k = function k(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  A = k(y),
                  x = k(b),
                  C = k(w),
                  _ = k(v),
                  T = k(M),
                  B = k(S),
                  I = k(E);return { getCapabilities: a.bind(null, f), deleteUser: c(h, function (e) {
                  return g + "/whitelist/" + e;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, p), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return u(y, e);
                }, getLight: c(a, A), setLight: c(l, A), setLightState: c(l, function (e) {
                  return A(e) + "/state";
                }), deleteLight: c(h, A), getGroups: a.bind(null, b), createGroup: u.bind(null, b), getGroup: c(a, x), setGroup: c(l, x), setGroupState: c(l, function (e) {
                  return x(e) + "/action";
                }), deleteGroup: c(h, x), getSchedules: a.bind(null, w), createSchedule: u.bind(null, w), getSchedule: c(a, C), setSchedule: c(l, C), deleteSchedule: c(h, C), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return o(d(s), t, i, n).bridge(e).user(m);
                }, getScenes: a.bind(null, v), createScene: u.bind(null, v), getScene: c(a, _), setScene: c(l, _), setSceneLightState: function setSceneLightState(e, t, i) {
                  return l(_(e) + "/lightstates/" + t, i);
                }, deleteScene: c(h, _), getSensors: a.bind(null, M), createSensor: u.bind(null, M), searchForNewSensors: u.bind(null, M, null), getNewSensors: a.bind(null, M + "/new"), getSensor: c(a, T), setSensor: c(l, T), setSensorConfig: c(l, function (e) {
                  return T(e) + "/config";
                }), setSensorState: c(l, function (e) {
                  return T(e) + "/state";
                }), deleteSensor: c(h, T), getRules: a.bind(null, S), createRule: u.bind(null, S), getRule: c(a, B), setRule: c(l, B), deleteRule: c(h, B), ruleActionGenerator: function ruleActionGenerator() {
                  return o(d(p), t, i, n).bridge(e).user(m);
                }, getResourceLinks: a.bind(null, E), createResourceLink: u.bind(null, E), getResourceLink: c(a, I), setResourceLink: c(l, I), deleteResourceLink: c(h, I) };
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
  function n(e) {
    var t = document.querySelectorAll("[data-type=card]");var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = t[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _e2 = _step.value;
        _e2.style.display = "none";
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
  }function o(e) {
    if ("string" != typeof e && (e += ""), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function s(e) {
    return "string" != typeof e && (e += ""), e;
  }function r(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return ne.iterable && (t[Symbol.iterator] = function () {
      return t;
    }), t;
  }function a(e) {
    this.map = {}, e instanceof a ? e.forEach(function (e, t) {
      this.append(t, e);
    }, this) : Array.isArray(e) ? e.forEach(function (e) {
      this.append(e[0], e[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t]);
    }, this);
  }function l(e) {
    return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (e.bodyUsed = !0);
  }function u(e) {
    return new Promise(function (t, i) {
      e.onload = function () {
        t(e.result);
      }, e.onerror = function () {
        i(e.error);
      };
    });
  }function h(e) {
    var t = new FileReader(),
        i = u(t);return t.readAsArrayBuffer(e), i;
  }function c(e) {
    if (e.slice) return e.slice(0);var t = new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)), t.buffer;
  }function d() {
    return this.bodyUsed = !1, this._initBody = function (e) {
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : ne.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : ne.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : ne.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : ne.arrayBuffer && ne.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = c(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : ne.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || se(e)) ? this._bodyArrayBuffer = c(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : ne.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, ne.blob && (this.blob = function () {
      var e = l(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h);
    }), this.text = function () {
      var e = l(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            i = u(t);return t.readAsText(e), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), i = Array(t.length), n = 0; n < t.length; n++) {
          i[n] = Y(t[n]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, ne.formData && (this.formData = function () {
      return this.text().then(p);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }function m(e, t) {
    var i = (t = t || {}).body;if (e instanceof m) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new a(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0);
    } else this.url = e + "";if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new a(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return -1 < re.indexOf(t) ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function p(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var i = e.split("="),
            n = i.shift().replace(/\+/g, " "),
            o = i.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(n), decodeURIComponent(o));
      }
    }), t;
  }function f(e) {
    var t = new a();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var i = e.split(":"),
          n = i.shift().trim();if (n) {
        var o = i.join(":").trim();t.append(n, o);
      }
    }), t;
  }function g(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && 300 > this.status, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new a(t.headers), this.url = t.url || "", this._initBody(e);
  }function y(e, t) {
    return new Promise(function (i, n) {
      function o() {
        r.abort();
      }var s = new m(e, t);if (s.signal && s.signal.aborted) return n(new le("Aborted", "AbortError"));var r = new XMLHttpRequest();r.onload = function () {
        var e = { status: r.status, statusText: r.statusText, headers: f(r.getAllResponseHeaders() || "") };e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");var t = "response" in r ? r.response : r.responseText;i(new g(t, e));
      }, r.onerror = function () {
        n(new TypeError("Network request failed"));
      }, r.ontimeout = function () {
        n(new TypeError("Network request failed"));
      }, r.onabort = function () {
        n(new le("Aborted", "AbortError"));
      }, r.open(s.method, s.url, !0), "include" === s.credentials ? r.withCredentials = !0 : "omit" === s.credentials && (r.withCredentials = !1), "responseType" in r && ne.blob && (r.responseType = "blob"), s.headers.forEach(function (e, t) {
        r.setRequestHeader(t, e);
      }), s.signal && (s.signal.addEventListener("abort", o), r.onreadystatechange = function () {
        4 === r.readyState && s.signal.removeEventListener("abort", o);
      }), r.send(void 0 === s._bodyInit ? null : s._bodyInit);
    });
  }function b(e, t) {
    var i = t.media.loop,
        n = t.media.startInstant,
        o = t.media.mediaId,
        s = t.media.source,
        r = t.media.doPickup,
        a = t.media.fadeTime,
        l = t.distance,
        u = t.media.flag,
        h = t.maxDistance;var c = 100;null != t.media.volume && 0 != t.media.volume && (c = t.media.volume), e.getMediaManager().destroySounds(o, !1, !0);var d = new ie(o);d.trackable = !0;var m = new de(s);if (m.openAudioMc = e, m.setOa(e), e.getMediaManager().mixer.addChannel(d), d.addSound(m), d.setChannelVolume(0), m.setLooping(i), d.setTag(o), 0 !== h) {
      var _e3 = this.convertDistanceToVolume(h, l);d.setTag("SPECIAL"), d.maxDistance = h, d.fadeChannel(_e3, a);
    } else d.setTag("DEFAULT"), setTimeout(function () {
      0 === a ? (d.setChannelVolume(c), d.updateFromMasterVolume()) : (d.updateFromMasterVolume(), d.fadeChannel(c, a));
    }, 1);d.setTag(u), e.getMediaManager().mixer.updateCurrent(), m.finalize().then(function () {
      r && m.startDate(n, !0), m.finish();
    });
  }function w() {
    document.getElementById("card-panel").style.display = "none";
  }function v(e, t) {
    function i(e, t) {
      var i = 0,
          o = t || e.innerHTML,
          s = o.length;ge.push(window.setInterval(function () {
        i >= s && (i = 0), o = n(o, i), e.innerHTML = o, i++;
      }, 0));
    }function n(e, t) {
      var i = Y(function (e, t) {
        return X(Math.random() * (t - e + 1)) + e;
      }(64, 90));return e.substr(0, t) + i + e.substr(t + 1, e.length);
    }var o = void 0,
        s = void 0,
        r = t.childNodes.length;if (-1 < e.indexOf("<br>")) {
      t.innerHTML = e;for (var _e4 = 0; _e4 < r; _e4++) {
        s = t.childNodes[_e4], 3 === s.nodeType && (o = document.createElement("span"), o.innerHTML = s.nodeValue, t.replaceChild(o, s), i(o));
      }
    } else i(t, e);
  }function M(e, t) {
    var i = t.length,
        n = document.createElement("span"),
        o = !1;for (var _s2 = 0; _s2 < i; _s2++) {
      n.style.cssText += ye[t[_s2]] + ";", "§k" === t[_s2] && (v(e, n), o = !0);
    }return o || (n.innerHTML = e), n;
  }function S(e) {
    var t,
        i,
        n = e.match(/&.{1}/g) || [],
        o = [],
        s = [],
        r = document.createDocumentFragment(),
        a = n.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t = 0; _t < a; _t++) {
      o.push(e.indexOf(n[_t])), e = e.replace(n[_t], "\0\0");
    }0 !== o[0] && r.appendChild(M(e.substring(0, o[0]), []));for (var _l = 0; _l < a; _l++) {
      if (2 === (i = o[_l + 1] - o[_l])) {
        for (; 2 == i;) {
          s.push(n[_l]), _l++, i = o[_l + 1] - o[_l];
        }s.push(n[_l]);
      } else s.push(n[_l]);-1 < s.lastIndexOf("§r") && (s = s.slice(s.lastIndexOf("§r") + 1)), t = e.substring(o[_l], o[_l + 1]), r.appendChild(M(t, s));
    }return r;
  }function E(e, t) {
    var i = JSON.parse(t.serializedCard);new be().replaceWithJson(t.id, i);
  }function k(e, t) {
    var i = JSON.parse(t.serializedCard);new be(i);
  }function A(e, t) {
    var i = t.message;e.notificationModule.sendNotification(t.title, i), new ee("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(t.title + "<hr />" + i);
  }function x(e, t) {
    var i = parseInt(t.protocolRevision);if (console.log("[OpenAudioMc] Received PROTOCOL revision update"), 2 <= i && (console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks"), e.socketModule.callbacksEnabled = !0), 3 <= i && (console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks"), e.socketModule.supportsYoutube = !0), 3 > i) {
      new ee("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }).show('<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>');
    }
  }function C(e, t) {
    var i = t.volume;e.getMediaManager().setMasterVolume(i), document.getElementById("volume-slider").value = i;
  }function _(e, t) {
    e.getMediaManager().destroySounds(t.soundId, t.all, !1, t.fadeTime);
  }function T(e, t) {
    var i = t.lights,
        n = t.hueColor,
        o = "rgba(" + n.r + "," + n.g + "," + n.b + "," + function (e, t, i) {
      return (e - t[0]) * (i[1] - i[0]) / (t[1] - t[0]) + i[0];
    }(n.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(i, o);
  }function B(e, t) {
    function i(e, t) {
      return K((e - t) / e * 100);
    }var n = t.mediaOptions.target,
        o = t.mediaOptions.fadeTime,
        s = t.mediaOptions.distance;var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = e.getMediaManager().mixer.getChannels()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _t2 = _step2.value;
        _t2.hasTag(n) && _t2.fadeChannel(i(_t2.maxDistance, s), o);
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
  }function I(e, t) {
    var i = t.x,
        n = t.y,
        o = t.z,
        s = t.pitch,
        r = t.yaw;e.world.player.updateLocation(new we(i, n, o), s, r);
  }function O(e, t) {
    var i = t.clientSpeaker,
        n = new we(i.location.x, i.location.y, i.location.z).add(.5, .5, .5),
        o = new ve(i.id, i.source, n, i.type, i.maxDistance, i.startInstant, e);e.world.addSpeaker(i.id, o);
  }function P(e, t) {
    var i = t.clientSpeaker;e.world.removeSpeaker(i.id);
  }function R(e, t, i) {
    y(ue.ERROR_REPORTING, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName: t, message: e }) }).then(function (e) {
      null != i && i(), e.json().then(function (e) {
        console.log("Reported error. Reponse was: " + JSON.stringify(e));
      });
    }).catch(function () {
      console.log("An error occoured while reporting another error. Weird.");
    });
  }function N(e, t, i, n, o) {
    this.fromSampleRate = e, this.toSampleRate = t, this.channels = 0 | i, this.outputBufferSize = n, this.noReturn = !!o, this.initialize();
  }function z(e, t, i, n, o, s) {
    this.audioChannels = 2 == e ? 2 : 1, Ne = 1 == this.audioChannels, Re = 0 < t && 16777215 >= t ? t : 44100, Ie = i >= Ce << 1 && i < n ? i & (Ne ? 4294967295 : 4294967294) : Ce << 1, Oe = X(n) > Ie + this.audioChannels ? n & (Ne ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof o ? o : function () {}, ze = -1 <= s && 1 >= s && 0 != s ? s : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function L(e) {
    try {
      var t = new Float32Array(e);
    } catch (t) {
      var t;Array(e);
    }for (var i = 0; i < e; ++i) {
      t[i] = ze * (i / e);
    }return t;
  }function D(e) {
    try {
      var t = new Float32Array(e);
    } catch (n) {
      t = Array(e);var i = 0;do {
        t[i] = 0;
      } while (++i < e);
    }return t;
  }function U() {
    for (var e = "", t = "", i = 0; i < Ce && Ue != Fe; ++i) {
      e += Y(12288 + (0 | 16383 * q(j(Be[Ue++] + 1, 0), 2))), t += Y(12288 + (0 | 16383 * q(j(Be[Ue++] + 1, 0), 2))), Ue == He && (Ue = 0);
    }return e + t;
  }function F() {
    for (var e = "", t = 0; t < Ce && Ue != Fe; ++t) {
      e += Y(12288 + (0 | 16383 * q(j(Be[Ue++] + 1, 0), 2))), Ue == He && (Ue = 0);
    }return e;
  }function H() {
    return (Ue <= Fe ? 0 : He) + Fe - Ue;
  }function V(e) {
    Te = L(Oe), De = Oe, Ue = 0, Fe = 0, He = j(Oe * Math.ceil(Re / e), Ce) << 1, Ne ? (Be = D(He), Le = new N(Re, e, 1, He, !0), F) : (Be = D(He <<= 1), Le = new N(Re, e, 2, He, !0), U);
  }function W() {
    ut.canStart && ut.start();
  }var j = Math.max,
      q = Math.min,
      Y = String.fromCharCode,
      G = Math.abs,
      K = Math.round,
      X = Math.floor;i.r(t);
  var J = function () {
    function J() {
      _classCallCheck(this, J);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    J.prototype.sync = function sync(e, t) {
      var i = new Date(e),
          n = new Date().getTime();n += 60 * t * 60 * 1e3;var o = new Date(n);this.isServerAhead = i.getTime() > o.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - o.getTime() : o.getTime() - i.getTime(), this.hasSynced = !0;
    };

    J.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return J;
  }();

  var Q = function () {
    function Q(e) {
      _classCallCheck(this, Q);

      this.fallback = "No message provided in oa+", this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    Q.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return Q;
  }();

  var Z = function () {
    function Z(e) {
      _classCallCheck(this, Z);

      this.openAudioMc = e;
    }

    Z.prototype.changeColor = function changeColor(e, t) {
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

    Z.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    Z.prototype.openApp = function openApp() {
      n($.MAIN_UI), this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    };

    Z.prototype.kickScreen = function kickScreen(e) {
      n($.KICKED), document.getElementById("kick-message").innerHTML = e;
    };

    return Z;
  }();

  var $ = { BAD_AUTH: "bad-auth-card", WELCOME: "welcome-card", KICKED: "kicked-card", MAIN_UI: "main-card" };
  var ee = function () {
    function ee(e, t) {
      _classCallCheck(this, ee);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    ee.prototype.show = function show(e) {
      var _this = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this.alertClass.hide(_this.alertBox);
      }), !this.option.persistent) {
        var _e5 = setTimeout(function () {
          _this.alertClass.hide(_this.alertBox), clearTimeout(_e5);
        }, this.option.closeTime);
      }return this;
    };

    ee.prototype.onClick = function onClick(e) {
      this.alertBox.onclick = e;
    };

    ee.prototype.hide = function hide() {
      var _this2 = this;

      this.alertBox.classList.add("hide");var e = setTimeout(function () {
        _this2.alertBox.parentNode.removeChild(_this2.alertBox), clearTimeout(e), null != _this2.onTimeout && _this2.onTimeout();
      }, 500);
    };

    return ee;
  }();

  var te = function () {
    function te(e, t) {
      var _this3 = this;

      _classCallCheck(this, te);

      this.hue = t, this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = { userid: Cookies.get("hueid") }, this.openAudioMc = e, this.hue.discover().then(function (e) {
        e.forEach(function (e) {
          _this3.bridges.push(e), _this3.onDiscover();
        });
      }).catch(function (e) {
        return console.log("Error finding bridges", e);
      }), this.isSsl && this.openAudioMc.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue"), document.getElementById("hue-start-linking-button").onclick = function () {
        _this3.startSetup();
      };
    }

    te.prototype.onDiscover = function onDiscover() {
      var _this4 = this;

      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-modal").style.display = "none", void (document.getElementById("hue-bridge-menu-button").style.display = "none");null != this.options.userid && this.openAudioMc.getHueModule().startSetup(), this.requestBox = new ee("#alert-area", { persistent: !0, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;">We found a hue bridge in your network<br/><br/><br/><a id="noti-perm-request-link" class="alert-message-button">hue settings</a></div>'), this.isModalOpen = !1, this.requestBox.onClick(this.openModal), document.body.addEventListener("click", function () {
          _this4.isModalOpen && (document.getElementById("hue-modal").style.display = "none", _this4.isModalOpen = !1);
        });
      } else this.openAudioMc.log("No hue bridges found");
    };

    te.prototype.openModal = function openModal() {
      var e = document.getElementById("hue-modal");document.getElementsByClassName("close")[0].onclick = function () {
        e.style.display = "none";
      }, e.style.display = "block", this.isModalOpen = !0;
    };

    te.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    te.prototype.onConnect = function onConnect() {
      var _this5 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this5.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this5.currentUser.getLights().then(function (e) {
          var t = [];for (var _i in e) {
            e.hasOwnProperty(_i) && t.push({ name: e[_i].name, id: parseInt(_i) });
          }_this5.openAudioMc.getHueConfiguration().setLightNamesAndIds(t);null != Cookies.get("hue-state") && (_this5.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this5.openAudioMc.getHueConfiguration().applyState(), _this5.openAudioMc.getHueConfiguration().updateState();
        }), _this5.openAudioMc.socketModule.send("hue_connected", {});
      });
    };

    te.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    te.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 0 != 2 * t.alpha * 127.5, hue: X(65535 * t.hue / 360), sat: X(255 * t.saturation), bri: K(2 * t.alpha * 127.5) };
    };

    te.prototype.setLight = function setLight(e, t) {
      var _this6 = this;

      var i = [];if ("number" == typeof e) {
        var _t3 = this.openAudioMc.getHueConfiguration().getBulbStateById(e - 1);if (-1 === _t3) return !1;i.push(_t3);
      } else if (e.startsWith("[")) JSON.parse(e).forEach(function (e) {
        var t = _this6.openAudioMc.getHueConfiguration().getHueIdFromId(e - 1);return -1 !== t && void i.push(t);
      });else {
        var _t4 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(e) - 1);if (-1 === _t4) return !1;i.push(_t4);
      }i.forEach(function (e) {
        _this6.currentUser.setLightState(e, _this6.colorToHueHsv(t)).then(function () {});
      });
    };

    te.prototype.linkBridge = function linkBridge(e, t) {
      var _this7 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this7.linkBridge(e, "error") : (_this7.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this7.isLinked = !0, _this7.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var n = 0,
          o = -1;o = setInterval(function () {
        function e() {
          clearInterval(o);
        }if (n++, 60 < n) return e(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this7.startSetup();
        }, void _this7.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - n;document.getElementById("hue-linking-message").innerText = _this7.openAudioMc.getMessages().hueLinking.replace("%sec%", t), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null == t[0].error ? null != t[0].success && (i.currentUser = i.currentBridge.user(t[0].success.username), _this7.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), i.isLinked = !0, i.onConnect(), e()) : 101 === t[0].error.type || (e(), _this7.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type));
        });
      }, 1e3);
    };

    return te;
  }();

  var ie = function () {
    function ie(e) {
      _classCallCheck(this, ie);

      this.channelName = e, this.channelVolume = 100, this.sounds = [], this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = [], this.tags = new Map(), this.trackable = !1;
    }

    ie.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    ie.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    ie.prototype.hasSoundPlaying = function hasSoundPlaying() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.sounds.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _e6 = _step3.value;
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

    ie.prototype.addSound = function addSound(e) {
      this.sounds.push(e);var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.sounds.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _e7 = _step4.value;
          _e7.registerMixer(this.mixer, this);
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

    ie.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    ie.prototype.registerMixer = function registerMixer(e) {
      this.mixer = e;var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _e8 = _step5.value;
          _e8.registerMixer(this.mixer, this);
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

    ie.prototype.fadeChannel = function fadeChannel(e, t, i) {
      var _this8 = this;

      this.interruptFade(), null == i && (i = function i() {}), this.targetAfterFade = e, this.isFading = !0, function (e, t, n, o) {
        t = t || 1e3, n = n || 0, o = o;var s = _this8.channelVolume,
            r = t / G(s - n),
            a = setInterval(function () {
          s = s > n ? s - 1 : s + 1;var e = _this8.mixer.masterVolume,
              t = s / 100 * e;var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = _this8.sounds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _e10 = _step6.value;
              _e10.setVolume(t);
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

          if (_this8.channelVolume = s, s == n) {
            i(), clearInterval(a);var _e9 = _this8.fadeTimer.indexOf(a);-1 < _e9 && _this8.fadeTimer.splice(_e9, 1), _this8.isFading = !1, a = null;
          }
        }, r);_this8.fadeTimer.push(a);
      }(0, t, e, i);
    };

    ie.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.fadeTimer[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _e11 = _step7.value;
            clearInterval(_e11);
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

    ie.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.sounds[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _e12 = _step8.value;
          _e12.setVolume(t);
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

    ie.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.sounds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _e13 = _step9.value;
          _e13.setVolume(t);
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

    ie.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.sounds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _e14 = _step10.value;
          _e14.destroy();
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

    return ie;
  }();

  var ne = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (ne.arrayBuffer) var oe = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      se = ArrayBuffer.isView || function (e) {
    return e && -1 < oe.indexOf(Object.prototype.toString.call(e));
  };a.prototype.append = function (e, t) {
    e = o(e), t = s(t);var i = this.map[e];this.map[e] = i ? i + ", " + t : t;
  }, a.prototype.delete = function (e) {
    delete this.map[o(e)];
  }, a.prototype.get = function (e) {
    return e = o(e), this.has(e) ? this.map[e] : null;
  }, a.prototype.has = function (e) {
    return this.map.hasOwnProperty(o(e));
  }, a.prototype.set = function (e, t) {
    this.map[o(e)] = s(t);
  }, a.prototype.forEach = function (e, t) {
    for (var i in this.map) {
      this.map.hasOwnProperty(i) && e.call(t, this.map[i], i, this);
    }
  }, a.prototype.keys = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push(i);
    }), r(e);
  }, a.prototype.values = function () {
    var e = [];return this.forEach(function (t) {
      e.push(t);
    }), r(e);
  }, a.prototype.entries = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push([i, t]);
    }), r(e);
  }, ne.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);var re = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];m.prototype.clone = function () {
    return new m(this, { body: this._bodyInit });
  }, d.call(m.prototype), d.call(g.prototype), g.prototype.clone = function () {
    return new g(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new a(this.headers), url: this.url });
  }, g.error = function () {
    var e = new g(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var ae = [301, 302, 303, 307, 308];g.redirect = function (e, t) {
    if (-1 === ae.indexOf(t)) throw new RangeError("Invalid status code");return new g(null, { status: t, headers: { location: e } });
  };var le = self.DOMException;try {
    new le();
  } catch (t) {
    (le = function le(e, t) {
      this.message = e, this.name = t;var i = Error(e);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), le.prototype.constructor = le;
  }y.polyfill = !0, self.fetch || (self.fetch = y, self.Headers = a, self.Request = m, self.Response = g);var ue = { CONTENT_PROXY: "https://media.openaudiomc.net/proxy?apiurl=", YOUTUBE_PROXY: "https://media.openaudiomc.net/youtube?id=", SOUNDCLOUD_PROXY: "https://media.openaudiomc.net/soundcloud?u=", DRIVE_PROXY: "https://media.openaudiomc.net/googledrive?id=", ERROR_REPORTING: "https://plus.openaudiomc.net/cf-log/production", SERVER_STATUS: "https://client.openaudiomc.net/status?referee=", MAIN_BACKEND: "https://plus.openaudiomc.net/", CLIENT_SESSION_SERVER: "https://plus.openaudiomc.net/session" };
  var he = function () {
    function he(e, t, i, n) {
      _classCallCheck(this, he);

      this.publicServerKey = e, this.uuid = t, this.name = i, this.token = n;
    }

    he.prototype.initialize = function initialize() {
      return new Promise(function (e) {
        var t = window.location.href;if (null != t) {
          if (2 <= t.split("?").length) {
            var _i2 = function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              _class.getParametersFromUrl = function getParametersFromUrl(e) {
                if (-1 == e.indexOf("&")) return {};var t = e.split("&");var i = {};for (var _e15 = 0; _e15 < t.length; _e15++) {
                  var _n3 = t[_e15].split("="),
                      _o2 = decodeURIComponent(_n3[0]),
                      _s4 = decodeURIComponent(_n3[1]);void 0 === i[_o2] ? i[_o2] = decodeURIComponent(_s4) : "string" == typeof i[_o2] ? i[_o2] = [i[_o2], decodeURIComponent(_s4)] : i[_o2].push(decodeURIComponent(_s4));
                }return i;
              };

              return _class;
            }().getParametersFromUrl(t.split("?")[1]);if (null == _i2.data) return void e(null);var _n2 = atob(_i2.data).split(":");if (4 !== _n2.length) return e(null), null;var _o = _n2[0],
                _s3 = _n2[1],
                _r = _n2[2],
                _a = _n2[3];null != _o && 16 >= _o.length && null != _s3 && 40 >= _s3.length && null != _r && 40 >= _r.length && null != _a && 5 >= _a.length || e(null);var _l2 = new he(_r, _s3, _o, _a);window.tokenCache = _l2, e(_l2);
          } else if (2 <= t.split("#").length) {
            var _i3 = t.split("#")[1];y(ue.CLIENT_SESSION_SERVER + "?token=" + _i3).then(function (t) {
              t.json().then(function (t) {
                if (0 < t.errors.length) return console.log("Session error"), void e(null);var i = t.response;var n = new he(i.publicKey, i.playerUuid, i.playerName, i.session);window.tokenCache = n, e(n);
              });
            }).catch(function (t) {
              console.error(t), e(null);
            });
          } else e(null);
        } else e(null);
      });
    };

    he.prototype.fromCache = function fromCache() {
      if (null != window.tokenCache) return window.tokenCache;throw new Error("No token cache in window.");
    };

    return he;
  }();

  var ce = { PROXY: ue.CONTENT_PROXY, YOUTUBE: ue.YOUTUBE_PROXY, SOUNDCLOUD: ue.SOUNDCLOUD_PROXY, DRIVE: ue.DRIVE_PROXY };"toJSON" in Error.prototype || Object.defineProperty(Error.prototype, "toJSON", { value: function value() {
      var e = {};return Object.getOwnPropertyNames(this).forEach(function (t) {
        e[t] = this[t];
      }, this), e;
    }, configurable: !0, writable: !0 });
  var de = function (_ref) {
    _inherits(de, _ref);

    function de(e) {
      var _this9;

      _classCallCheck(this, de);

      (_this9 = _possibleConstructorReturn(this, _ref.call(this)), _this9), e = _this9.translate(e), _this9.soundElement = new Audio(), _this9.hadError = !1, _this9.source = e, _this9.error = null, _this9.trackable = !1, _this9.soundElement.onerror = function (e) {
        _this9.hadError = !0, _this9.error = e, _this9._handleError();
      }, _this9.soundElement.src = e, _this9.soundElement.setAttribute("preload", "auto"), _this9.soundElement.setAttribute("controls", "none"), _this9.soundElement.setAttribute("display", "none"), _this9.soundElement.preload = "auto", _this9.soundElement.abort = console.log, _this9.openAudioMc = null, _this9.onFinish = [], _this9.loop = !1, _this9.mixer = null, _this9.channel = null, _this9.finsishedInitializing = !1, _this9.gotShutDown = !1;return _this9;
    }

    de.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    de.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var t = this.soundElement.error.code,
            _i4 = null;if (this.isYoutube ? _i4 = this.openAudioMc.socketModule.supportsYoutube ? "YOUTUBE_ERR" : "MEDIA_ERR_SRC_NOT_SUPPORTED" : 1 === t ? _i4 = "MEDIA_ERR_ABORTED" : 2 === t ? _i4 = "MEDIA_ERR_NETWORK" : 3 === t ? _i4 = "MEDIA_ERR_DECODE" : 4 === t && (_i4 = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != _i4) {
          console.log("[OpenAudioMc] Reporting media failure " + _i4);var e = function e(_e16, t, i) {
            var n = {};return Object.getOwnPropertyNames(_e16).forEach(function (t) {
              n[t] = _e16[t];
            }), JSON.stringify(n, t, i);
          };null != this.source && "null" != this.source && this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + _i4 + "\ndump=" + e(this.error, null, "\t") + e(this.soundElement.error, null, "\t") + "\nhostname=" + window.location.host + "\nuseragent=" + window.navigator.userAgent), this.openAudioMc.socketModule.send("media_failure", { mediaError: _i4, source: this.soundElement.src });
        }
      }
    };

    de.prototype.addNode = function addNode(e, t) {
      null == this.controller && (this.soundElement.crossOrigin = "anonymous", !this.soundElement.src.includes("openaudiomc.net") && (this.soundElement.src = ce.PROXY + this.soundElement.src), this.controller = e.audioCtx.createMediaElementSource(this.soundElement)), this.controller.connect(t);
    };

    de.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    de.prototype.finalize = function finalize() {
      var _this10 = this;

      return new Promise(function (e) {
        _this10.soundElement.onended = function () {
          _this10.gotShutDown || !_this10.finsishedInitializing || (_this10.onFinish.forEach(function (e) {
            e();
          }), _this10.loop ? (_this10.setTime(0), _this10.soundElement.play()) : (_this10.mixer.removeChannel(_this10.channel), !_this10.soundElement.paused && _this10.soundElement.pause()));
        };var t = !1;var i = function i() {
          if (!_this10.gotShutDown) {
            if (!t) {
              var _t5 = _this10.soundElement.play();_t5 instanceof Promise ? _t5.then(e).catch(e) : e();
            }t = !0;
          }
        };_this10.soundElement.onplay = function () {
          _this10.gotShutDown && (console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason."), _this10.soundElement.pause());
        }, _this10.soundElement.onprogress = i, _this10.soundElement.oncanplay = i, _this10.soundElement.oncanplaythrough = i;
      });
    };

    de.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    de.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    de.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish.push(e);
    };

    de.prototype.setVolume = function setVolume(e) {
      100 < e && (e = 100), this.soundElement.volume = e / 100;
    };

    de.prototype.startDate = function startDate(e) {
      var t = new Date(e),
          i = G((t.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          n = this.soundElement.duration;if (i > n) {
        i -= X(i / n) * n;
      }this.setTime(i);
    };

    de.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    de.prototype.destroy = function destroy() {
      this.gotShutDown = !0, this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return de;
  }(function () {
    function _class2() {
      _classCallCheck(this, _class2);
    }

    _class2.prototype.translate = function translate(e) {
      var t = e = function (e) {
        if (e.startsWith("[") && e.endsWith("]")) {
          var _t6 = JSON.parse(e);return _t6[X(Math.random() * _t6.length)];
        }return e;
      }(e);try {
        if (t.includes("media.openaudiomc.net")) return e;if (t = t.replace("https://api.openaudiomc.net/stream.php?u=", ""), window.location.href.includes("client.openaudiomc.net") && !t.includes("http")) return null;if (t.includes("http://docs.google.com/uc?export=open&id=") && (t = t.replace("http://docs.google.com/uc?export=open&id=", ce.DRIVE)), t.includes("https://docs.google.com/uc?export=open&id=") && (t = t.replace("https://docs.google.com/uc?export=open&id=", ce.DRIVE)), t.includes("https://drive.google.com/") && (t = t.split("file/d/")[1], t = ce.DRIVE + t.split("/view")[0]), this.isYoutube = !1, t.includes("youtube.")) {
          var _e17 = t.split("v=")[1];t = ce.YOUTUBE + _e17, this.isYoutube = !0;
        } else if (t.includes("youtu.be")) {
          var _e18 = t.split(".be/")[1];t = ce.YOUTUBE + _e18, this.isYoutube = !0;
        }t.includes("https://weathered-dust-0281.craftmend.workers.dev/") && (t = t.replace("https://weathered-dust-0281.craftmend.workers.dev/", "")), t.includes("soundcloud.com") && (t = ce.SOUNDCLOUD + t), "https:" === location.protocol && t.includes("http") && !t.includes("https://") && (t = ce.PROXY + t);
      } catch (i) {
        return console.log("Middleware error"), console.log(i), e;
      }var i = new he().fromCache();return t += t.includes("?") ? "&openAudioPlayerName=" + i.name : "?openAudioPlayerName=" + i.name, t += "&openAudioToken=" + i.token, t += "&openAudioPublicServerKey=" + i.publicServerKey, t;
    };

    return _class2;
  }());

  var me = function () {
    function me(e, t) {
      _classCallCheck(this, me);

      this.openAudioMc = t, this.mixerName = e, this.masterVolume = 100, this.channels = new Map(), this.areSoundsPlaying = !1, this.ambianceSoundMedia = null;
    }

    me.prototype._updatePlayingSounds = function _updatePlayingSounds() {
      var e = !1;this.channels.forEach(function (t) {
        t.hasSoundPlaying() && (e = !0);
      }), e != this.areSoundsPlaying && (this._playingStateChangeChanged(e), this.areSoundsPlaying = e);
    };

    me.prototype._playingStateChangeChanged = function _playingStateChangeChanged(e) {
      null == this.ambianceSoundMedia || (e ? (console.log("Stopping ambiance sound"), this.ambianceSoundMedia.fadeChannel(0, 800, function () {})) : (console.log("Starting ambiance sound"), this.ambianceSoundMedia.fadeChannel(this.masterVolume, 800, function () {})));
    };

    me.prototype.setupAmbianceSound = function setupAmbianceSound(e) {
      var t = new ie("ambiance-lol-dics"),
          i = new de(e);i.setLooping(!0), i.setVolume(0), i.finalize().then(function () {
        i.finish();
      }), t.mixer = { masterVolume: this.masterVolume }, t.addSound(i), this.ambianceSoundMedia = t, this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.setChannelVolume(0), this.ambianceSoundMedia.updateFromMasterVolume(this.masterVolume), this._updatePlayingSounds();
    };

    me.prototype.updateCurrent = function updateCurrent() {
      var e = [];this.channels.forEach(function (t, i) {
        var n = [];t.tags.forEach(function (e, t) {
          n.push(t);
        }), t.trackable && e.push({ name: i, tags: n });
      }), this._updatePlayingSounds();
    };

    me.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e;var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.channels.values()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _e19 = _step11.value;
          _e19.updateFromMasterVolume();
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

      null != this.ambianceSoundMedia && (this.ambianceSoundMedia.mixer = { masterVolume: this.masterVolume }, this.ambianceSoundMedia.updateFromMasterVolume(e));
    };

    me.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;t = e instanceof ie ? e : this.channels.get(e), null != t && (t.destroy(), this.channels.delete(t.channelName)), this._updatePlayingSounds();
    };

    me.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    me.prototype.addChannel = function addChannel(e) {
      if (!(e instanceof ie)) throw new Error("Argument isn't a channel");{
        var t = e.channelName,
            _i5 = this.channels.get(t);null != _i5 && _i5.destroy(), e.registerMixer(this), this.channels.set(t, e);
      }this._updatePlayingSounds();
    };

    return me;
  }();

  var pe = function () {
    function pe(e) {
      var _this11 = this;

      _classCallCheck(this, pe);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.startSound = null, this.mixer = new me(null, e), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this11.setMasterVolume(e), Cookies.set("volume", e);
      };
    }

    pe.prototype.setupAmbianceSound = function setupAmbianceSound(e) {
      "" == e || null == e || this.mixer.setupAmbianceSound(e);
    };

    pe.prototype.postBoot = function postBoot() {
      var _this12 = this;

      if (null != this.startSound) {
        var _e20 = new ie("startsound"),
            t = new de(this.startSound);t.openAudioMc = this.openAudioMc, t.setOa(this.openAudioMc), t.setOnFinish(function () {
          setTimeout(function () {
            _this12.mixer._updatePlayingSounds();
          }, 1e3);
        }), t.finalize().then(function () {
          _this12.mixer.addChannel(_e20), _e20.addSound(t), _e20.setChannelVolume(100), _e20.updateFromMasterVolume(), t.finish();
        });
      } else setTimeout(function () {
        _this12.mixer._updatePlayingSounds();
      }, 500);
    };

    pe.prototype.destroySounds = function destroySounds(e, t, i, n) {
      var _this13 = this;

      var o = n;null == o && (o = 500), i && (o = 0);var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step12.value;
          t ? i.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(i);
          }) : null == e || "" === e ? i.hasTag("SPECIAL") || i.hasTag("REGION") || i.hasTag("SPEAKER") || i.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(i);
          }) : i.hasTag(e) && (i.sounds.forEach(function (e) {
            e.gotShutDown = !0;
          }), i.fadeChannel(0, o, function () {
            _this13.mixer.removeChannel(i);
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

    pe.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e, 0 === e ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + e + "%", Cookies.set("volume", e), this.mixer.setMasterVolume(e);
    };

    pe.prototype.changeVolume = function changeVolume(e) {
      document.getElementById("volume-slider").value = e, this.setMasterVolume(e);
    };

    pe.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return pe;
  }();

  var fe = function () {
    function fe(e, t) {
      var _this14 = this;

      _classCallCheck(this, fe);

      if (this.handlers = {}, this.openAudioMc = e, this.callbacksEnabled = !1, this.supportsYoutube = !1, this.hasConnected = !1, this.outgoingQueue = [], null == new he().fromCache()) return console.log("Empty authentication"), void n($.BAD_AUTH);this.state = "loading", this.authHeader = "type=client&n=" + e.tokenSet.name + "&player=" + e.tokenSet.uuid + "&s=" + e.tokenSet.publicServerKey + "&p=" + e.tokenSet.token;var i = this;this.socket = io(t, { query: i.authHeader, autoConnect: !1, withCredentials: !1 }), this.socket.on("connect", function () {
        e.userInterfaceModule.openApp(), e.socketModule.state = "ok", _this14.hasConnected = !0, _this14.outgoingQueue.forEach(function (e) {
          _this14.send(e.key, e.value);
        });
      }), this.socket.on("time-update", function (e) {
        var t = e.split(":"),
            i = parseInt(t[1]),
            n = parseInt(t[0]);_this14.openAudioMc.getTimeService().sync(n, i);
      }), this.socket.on("disconnect", function () {
        e.debugPrint("closed"), e.getMediaManager().destroySounds(null, !0), i.state = "closed", e.voiceModule.handleSocketClosed(), n($.BAD_AUTH), setTimeout(function () {
          e.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (e) {
        var t = e.type.split("."),
            n = t[t.length - 1];null != i.handlers[n] && i.handlers[n](e.payload);
      }), this.socket.on("join-call", function (t) {
        var i = t.room,
            n = t.server,
            o = t.accessToken,
            s = t.members,
            r = [];var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = s[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _e21 = _step13.value;
            r.push(_e21.name);
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

        e.voiceModule.promptCall(n, i, o, r, s);
      }), this.socket.on("resub-to-player-in-call", function (t) {
        var i = e.voiceModule.room;null != i && i.resubToPlayer(t);
      }), this.socket.on("member-left-call", function (t) {
        var i = e.voiceModule.room;null != i && i.handleMemberLeaving(t);
      }), this.socket.connect();
    }

    fe.prototype.send = function send(e, t) {
      this.hasConnected ? this.callbacksEnabled ? (console.log("[OpenAudioMc] Submitting value for " + e), this.socket.emit(e, t)) : console.log("[OpenAudioMc] could not satisfy callback " + e + " because the protocol is outdated") : this.outgoingQueue.push({ key: e, value: t });
    };

    fe.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return fe;
  }();

  var ge = [],
      ye = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };String.prototype.replaceColorCodes = function () {
    return function () {
      for (var _e22 = ge.length; _e22--;) {
        clearInterval(ge[_e22]);
      }ge = [];
    }(), S(this + "");
  };
  var be = function () {
    function be(e) {
      _classCallCheck(this, be);

      null != e && this.fromJson(e);
    }

    be.prototype.fromJson = function fromJson(e) {
      document.getElementById("card-panel").style.display = "", this.lines = [], this.title = e.title;var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = e.rows[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _t7 = _step14.value;
          this.lines.push(this.rowToHtml(_t7));
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

      document.getElementById("card-title").innerText = this.title;var t = "";this.lines.forEach(function (e) {
        t += e;
      }), document.getElementById("card-content").innerHTML = t;
    };

    be.prototype.replaceWithJson = function replaceWithJson(e, t) {
      document.getElementById(e).replaceWith(new DOMParser().parseFromString(this.partToHtml(t), "text/html").body.childNodes[0]);
    };

    be.prototype.rowToHtml = function rowToHtml(e) {
      var t = "";var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = e.textList[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _i6 = _step15.value;
          t += this.partToHtml(_i6);
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

    be.prototype.partToHtml = function partToHtml(e) {
      var t = "",
          i = [],
          n = [];i.push("<p id='" + e.id + "'>"), n.push("</p>");var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = e.styles[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _t8 = _step16.value;
          "BOLD" === _t8 ? (i.push("<b>"), n.push("</b>")) : "ITALLIC" === _t8 ? (i.push("<i>"), n.push("</i>")) : "UNDERLINE" === _t8 && (i.push("<u>"), n.push("</u>"));
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

      null != e.hyperlink && "" != e.hyperlink && (i.push("<a href='" + e.hyperlink + "'>"), n.push("</a>"));var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = i[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var _e23 = _step17.value;
          t += _e23;
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

      e.text = e.text.split("&").join("&"), S(e.text).childNodes.forEach(function (e) {
        t += e.outerHTML;
      });var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = n[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _e24 = _step18.value;
          t += _e24;
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

    return be;
  }();

  var we = function () {
    function we(e, t, i) {
      _classCallCheck(this, we);

      this.x = e || 0, this.y = t || 0, this.z = i || 0;
    }

    we.prototype.add = function add(e, t, i) {
      return this.x += e, this.y += t, this.z += i, this;
    };

    we.prototype.applyQuaternion = function applyQuaternion(e) {
      var t = this.x,
          i = this.y,
          n = this.z,
          o = e.x,
          s = e.y,
          r = e.z,
          a = e.w,
          l = a * t + s * n - r * i,
          u = a * i + r * t - o * n,
          h = a * n + o * i - s * t,
          c = -o * t - s * i - r * n;return this.x = l * a + c * -o + u * -r - h * -s, this.y = u * a + c * -s + h * -o - l * -r, this.z = h * a + c * -r + l * -s - u * -o, this;
    };

    we.prototype.square = function square(e) {
      return e * e;
    };

    we.prototype.distance = function distance(e) {
      var t = this.square(this.x - e.x) + this.square(this.y - e.y) + this.square(this.z - e.z);return Math.sqrt(t);
    };

    return we;
  }();

  var ve = function () {
    function ve(e, t, i, n, o, s, r) {
      _classCallCheck(this, ve);

      this.id = e, this.source = t, this.location = i, this.type = n, this.maxDistance = o, this.startInstant = s, this.openAudioMc = r, this.channel = null;
    }

    ve.prototype.getDistance = function getDistance(e, t) {
      return t.location.distance(this.location);
    };

    return ve;
  }();

  var Me = function Me(e) {
    _classCallCheck(this, Me);

    function t(t, i) {
      e.socketModule.registerHandler(t, function (t) {
        return i(e, t);
      });
    }t("ClientCreateMediaPayload", b), t("ClientDestroyCardPayload", w), t("ClientUpdateCardPayload", E), t("ClientCreateCardPayload", k), t("NotificationPayload", A), t("ClientVersionPayload", x), t("ClientVolumePayload", C), t("ClientDestroyMediaPayload", _), t("HueColorPayload", T), t("ClientUpdateMediaPayload", B), t("ClientPlayerLocationPayload", I), t("ClientSpeakerCreatePayload", O), t("ClientSpeakerDestroyPayload", P);
  };

  var Se = function () {
    function Se() {
      var _this15 = this;

      _classCallCheck(this, Se);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this15.select();
        };
      });
    }

    Se.prototype.setBridgeName = function setBridgeName(e) {
      document.getElementById("bridge-name").innerText = e;
    };

    Se.prototype.select = function select() {
      this.updateState();
    };

    Se.prototype.applyState = function applyState() {
      var _this16 = this;

      this.state.forEach(function (e) {
        _this16.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    Se.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this17.state.push(_this17.obtainSelection(e));
      }), Cookies.set("hue-state", this.state);
    };

    Se.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          i = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: i };
    };

    Se.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    Se.prototype.getInputById = function getInputById(e) {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.dropdowns[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var t = _step19.value;
          if (t.dataset.bulb == e) return t;
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

    Se.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    Se.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return Se;
  }();

  var Ee = function () {
    function Ee(e) {
      _classCallCheck(this, Ee);

      this.host = e;
    }

    Ee.prototype.route = function route(e) {
      var _this18 = this;

      return new Promise(function (t, i) {
        _this18.tokenSet = new he().fromCache(), y("https://cloud.openaudiomc.net/api/v2/account-services/client/login/" + _this18.tokenSet.publicServerKey).then(function (n) {
          n.json().then(function (n) {
            function o(e, t) {
              var i = e.replace("#", "");return "rgba(" + parseInt(i.substring(0, 2), 16) + "," + parseInt(i.substring(2, 4), 16) + "," + parseInt(i.substring(4, 6), 16) + "," + t / 100 + ")";
            }if (null == n.errors || 0 != n.errors.length) return i(n.errors), void console.log(n.errors);var s = n.response;if (s.banned) return void R("Declined connection due to ban " + window.location.host, "Steve", function () {
              window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/blocked_domain.html";
            });var r = s.secureEndpoint,
                a = s.ambianceSound;console.log("[OpenAudioMc] accepting and applying settings"), e.debugPrint("Updating settings..."), null != s.backgroundImage && "" != s.backgroundImage && (s.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + s.backgroundImage);var l = s.backgroundImage;"" !== l && (document.getElementById("banner-image").src = l);var u = s.title,
                h = s.clientWelcomeMessage,
                c = s.clientErrorMessage;var d = "";S(c).childNodes.forEach(function (e) {
              d += e.outerHTML;
            });var m = "";S(h).childNodes.forEach(function (e) {
              m += e.outerHTML;
            }), "" !== c && (e.getMessages().errorMessage = d), "" !== h && (e.getMessages().welcomeMessage = m);var p = s.greetingMessage;p = p.replace("%name", e.tokenSet.name), document.getElementById("initialize-text").innerHTML = p, document.getElementById("initialize-button").innerHTML = s.connectButtonText, document.documentElement.style.setProperty("--border-color-dark", s.accentColor);var f = o(s.accentColor, 70),
                g = o(s.accentColor, 40);if (document.documentElement.style.setProperty("--border-color-normal", f), document.documentElement.style.setProperty("--border-color-light", g), e.getUserInterfaceModule().changeColor("#2c78f6", s.accentColor), "" != s.startSound && (e.getMediaManager().startSound = s.startSound), "default" !== u) {
              document.title = u;try {
                parent.document.title = u;
              } catch (e) {}
            }t({ host: r, background: l, ambianceSound: a });
          }).catch(function (e) {
            console.log("Dead end 1"), i(e);
          });
        }).catch(function (e) {
          console.log("Dead end 2"), i(e);
        });
      });
    };

    return Ee;
  }();

  var ke = function (_ee) {
    _inherits(ke, _ee);

    function ke(e, t, i) {
      var _this19;

      _classCallCheck(this, ke);

      (_this19 = _possibleConstructorReturn(this, _ee.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this19), _this19.room = e, _this19.username = t, _this19.isMuted = !1, _this19.member = i;var n = '<img class="call-box" src="https://minotar.net/helm/' + t + '" />';n += '<div class="call-content" id="user-box-content-' + t + '">', n += '<div style="text-align: center;"><p>(loading)</p></div>', n += "</div>", _this19.show(n, !0), _this19.setUsernameAsContent(), document.getElementById("user-box-content-" + _this19.username).onmouseenter = function () {
        _this19.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onmouseout = function () {
        _this19.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this19.username).onclick = function () {
        _this19.room.main.tokenSet.name !== _this19.username && _this19.onClickHandler();
      };return _this19;
    }

    ke.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    ke.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name === this.username || (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    ke.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return ke;
  }(ee);

  N.prototype.initialize = function () {
    if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, N.prototype.compileInterpolationFunction = function () {
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
  }, N.prototype.bypassResampler = function (e) {
    return this.noReturn ? (this.outputBuffer = e, e.length) : e;
  }, N.prototype.bufferSlice = function (e) {
    if (this.noReturn) return e;try {
      return this.outputBuffer.subarray(0, e);
    } catch (t) {
      try {
        return this.outputBuffer.length = e, this.outputBuffer;
      } catch (t) {
        return this.outputBuffer.slice(0, e);
      }
    }
  }, N.prototype.initializeBuffers = function () {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
    } catch (e) {
      this.outputBuffer = [], this.lastOutput = [];
    }
  }, z.prototype.MOZWriteAudio = function (e) {
    this.MOZWriteAudioNoCallback(e), this.MOZExecuteCallback();
  }, z.prototype.MOZWriteAudioNoCallback = function (e) {
    this.writeMozAudio(e);
  }, z.prototype.callbackBasedWriteAudio = function (e) {
    this.callbackBasedWriteAudioNoCallback(e), this.callbackBasedExecuteCallback();
  }, z.prototype.callbackBasedWriteAudioNoCallback = function (e) {
    if (e) for (var t = e.length, i = 0; i < t && De < Oe;) {
      Te[De++] = e[i++];
    }
  }, z.prototype.writeAudio = function (e) {
    0 == this.audioType ? this.MOZWriteAudio(e) : 1 == this.audioType ? this.callbackBasedWriteAudio(e) : 2 == this.audioType && (this.checkFlashInit() || _e ? this.callbackBasedWriteAudio(e) : this.mozAudioFound && this.MOZWriteAudio(e));
  }, z.prototype.writeAudioNoCallback = function (e) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(e) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(e) : 2 == this.audioType && (this.checkFlashInit() || _e ? this.callbackBasedWriteAudioNoCallback(e) : this.mozAudioFound && this.MOZWriteAudioNoCallback(e));
  }, z.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (H() * Le.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + De;if (2 == this.audioType) {
      if (this.checkFlashInit() || _e) return (H() * Le.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + De;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, z.prototype.MOZExecuteCallback = function () {
    var e = Ie - this.remainingBuffer();0 < e && this.writeMozAudio(this.underRunCallback(e));
  }, z.prototype.callbackBasedExecuteCallback = function () {
    var e = Ie - this.remainingBuffer();0 < e && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(e));
  }, z.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || _e ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
  }, z.prototype.initializeAudio = function () {
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
  }, z.prototype.preInitializeMozAudio = function () {
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, Re), this.samplesAlreadyWritten = 0;var e = 2 == this.audioChannels ? [0, 0] : [0],
        t = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        t += this.audioHandleMoz.mozWriteAudio(e);
      }for (var i = t / this.audioChannels, n = 0; n < i; n++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(e);
      }
    }this.samplesAlreadyWritten += t, Ie += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, z.prototype.initializeMozAudio = function () {
    this.writeMozAudio(L(Ie)), this.audioType = 0;
  }, z.prototype.initializeWebAudio = function () {
    if (!_e) throw new Error("");V(Pe), this.audioType = 1;
  }, z.prototype.initializeFlashAudio = function () {
    var e = document.getElementById("XAudioJS");if (null == e) {
      var t = this,
          i = document.createElement("div");i.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var n = document.createElement("div");n.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), n.setAttribute("id", "XAudioJS"), i.appendChild(n), document.getElementsByTagName("body")[0].appendChild(i), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (e) {
        e.success ? t.audioHandleFlash = e.ref : t.audioType = 1;
      });
    } else this.audioHandleFlash = e;this.audioType = 2;
  }, z.prototype.writeMozAudio = function (e) {
    if (e) {
      var t = this.mozAudioTail.length;if (0 < t) {
        var i = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += i, this.mozAudioTail.splice(0, i);
      }t = q(e.length, Oe - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(e);this.samplesAlreadyWritten += i;for (var n = 0; t > i; --t) {
        this.mozAudioTail.push(e[n++]);
      }
    }
  }, z.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, ze), V(44100)), this.flashInitialized;
  };var Ae,
      xe,
      Ce = 2048,
      _e = !1,
      Te = [],
      Be = [],
      Ie = 15e3,
      Oe = 25e3,
      Pe = 44100,
      Re = 0,
      Ne = !1,
      ze = 0,
      Le = null,
      De = 0,
      Ue = 0,
      Fe = 0,
      He = 2,
      Ve = N;!function (e) {
    e[e.VoIP = 2048] = "VoIP", e[e.Audio = 2049] = "Audio", e[e.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(Ae || (Ae = {})), function (e) {
    e[e.OK = 0] = "OK", e[e.BadArgument = -1] = "BadArgument", e[e.BufferTooSmall = -2] = "BufferTooSmall", e[e.InternalError = -3] = "InternalError", e[e.InvalidPacket = -4] = "InvalidPacket", e[e.Unimplemented = -5] = "Unimplemented", e[e.InvalidState = -6] = "InvalidState", e[e.AllocFail = -7] = "AllocFail";
  }(xe || (xe = {}));var We = function () {
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
      if (void 0 === n && (n = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !We.validFrameDuration(n)) throw "invalid frame duration";this.frame_size = e * n / 1e3;var o = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(e, t, i, o), 0 != getValue(o, "i32")) throw "opus_encoder_create failed: " + getValue(o, "i32");this.in_ptr = _malloc(this.frame_size * t * 4), this.in_len = this.frame_size * t, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = We.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
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
  }();var Ye = null;
  var Ge = function Ge() {
    _classCallCheck(this, Ge);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = Ye;
  };

  var Ke = function (_Ge) {
    _inherits(Ke, _Ge);

    function Ke() {
      var _this20;

      _classCallCheck(this, Ke);

      (_this20 = _possibleConstructorReturn(this, _Ge.call(this)), _this20), _this20.queueSize = 5120, _this20.unstableSeconds = 0, _this20.stableSeconds = 0, _this20.minimalQueueSize = _this20.queueSize;_this20.defaultConfig.codec.sampleRate, _this20.defaultConfig.codec.bufferSize;_this20.perfectRate = 50, _this20.lowestAcceptable = _this20.perfectRate - 5, _this20.highestAcceptable = _this20.perfectRate + 5;return _this20;
    }

    Ke.prototype.isAcceptable = function isAcceptable(e) {
      return e >= this.lowestAcceptable && e <= this.highestAcceptable;
    };

    Ke.prototype.handleMeasurement = function handleMeasurement(e) {
      this.isAcceptable(e) ? (this.unstableSeconds = 0, 5 <= this.stableSeconds && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, 5 <= this.unstableSeconds && this.increaseBufferSize(), this.unstableSeconds++);
    };

    Ke.prototype.increaseBufferSize = function increaseBufferSize() {
      10240 > this.queueSize && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    Ke.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    Ke.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return Ke;
  }(Ge);

  var Xe = function () {
    function Xe(e) {
      var _this21 = this;

      _classCallCheck(this, Xe);

      this.ticks = 0, this.task = setInterval(function () {
        e(_this21.ticks), _this21.ticks = 0;
      }, 1e3);
    }

    Xe.prototype.tick = function tick() {
      this.ticks++;
    };

    Xe.prototype.stop = function stop() {
      clearInterval(this.task);
    };

    return Xe;
  }();

  var Je = function () {
    function Je() {
      var _this22 = this;

      _classCallCheck(this, Je);

      this.buffer = new Float32Array(0), this.processor = new Ke(), this.tickTimer = new Xe(function (e) {
        _this22.processor.handleMeasurement(e);
      });
    }

    Je.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    Je.prototype.write = function write(e, t) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;t = e.sampler.resampler(t);var n = new Float32Array(i + t.length);n.set(this.buffer, 0), n.set(t, i), this.buffer = n;
    };

    Je.prototype.read = function read(e) {
      var t = this.buffer.subarray(0, e);return this.buffer = this.buffer.subarray(e, this.buffer.length), t;
    };

    Je.prototype.length = function length() {
      return this.buffer.length;
    };

    Je.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return Je;
  }();

  var Qe = function (_Ge2) {
    _inherits(Qe, _Ge2);

    function Qe(e, t) {
      var _this23;

      _classCallCheck(this, Qe);

      (_this23 = _possibleConstructorReturn(this, _Ge2.call(this)), _this23), _this23.config = _this23.defaultConfig, _this23.config.codec = _this23.config.codec || _this23.defaultConfig.codec, _this23.config.server = _this23.config.server || _this23.defaultConfig.server, _this23.sampler = new Ve(_this23.config.codec.sampleRate, _this23.audioContext.sampleRate, 1, _this23.config.codec.bufferSize), _this23.parentSocket = t, _this23.decoder = new qe(_this23.config.codec.sampleRate, _this23.config.codec.channels), _this23.silence = new Float32Array(_this23.config.codec.bufferSize);return _this23;
    }

    Qe.prototype.start = function start() {
      var _this24 = this;

      this.audioQueue = new Je(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (e) {
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

    Qe.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    Qe.prototype.setVolume = function setVolume(e) {
      this.gainNode && (this.gainNode.gain.value = e);
    };

    Qe.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return Qe;
  }(Ge);

  var Ze = function () {
    function Ze(e, t) {
      _classCallCheck(this, Ze);

      this.room = e, this.roomMember = t, this.isStopped = !1, this.player = new Qe({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    Ze.prototype.setVolume = function setVolume(e) {
      null != this.player && this.player.setVolume(e / 50);
    };

    Ze.prototype.shutdown = function shutdown() {
      this.isStopped || (this.isStopped = !0, this.player.stop());
    };

    return Ze;
  }();

  var $e = function $e(e, t, i) {
    _classCallCheck(this, $e);

    return null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? void console.error("Unknown user media platform!") : void nnavigator.msGetUserMedia(e, t, i) : void navigator.mediaDevices.getUserMedia(e).then(function (e) {
      return t(e);
    }).catch(function (e) {
      return i(e);
    }) : void navigator.webkitGetUserMedia(e, t, i) : void navigator.getUserMedia(e, t, i);
  };

  var et = function (_ee2) {
    _inherits(et, _ee2);

    function et(e) {
      _classCallCheck(this, et);

      var _this25 = _possibleConstructorReturn(this, _ee2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

      var t = [],
          i = !1;navigator.mediaDevices.enumerateDevices().then(function (e) {
        var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
          for (var _iterator20 = e[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
            var _n4 = _step20.value;
            "audioinput" == _n4.kind && ("" === _n4.label ? i = !0 : t.push({ name: _n4.label, id: _n4.deviceId }));
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
        if (i) _this25.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br /><a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> </div>'), document.getElementById("request-mic-permissions").onclick = function () {
          new $e({ audio: !0 }, function (t) {
            _this25.hide(), t.getTracks()[0].stop(), new et(e);
          }, function (t) {
            console.log(t), _this25.hide(), _this25.deniedMessage(), e(null);
          });
        };else {
          null != _this25.requestBox && _this25.requestBox.hide();var _i7 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion21 = true;
          var _didIteratorError21 = false;
          var _iteratorError21 = undefined;

          try {
            for (var _iterator21 = t[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              var _e26 = _step21.value;
              _i7 += '<option value="' + _e26.id + '">' + _e26.name + "</option>";
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

          if (_i7 += "</select>", _this25.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?<br /><small>changes can take a second or two to apply</small><br />' + _i7 + '<div id="mic-loader" style="display:none;"><h2>Switching mic input. Please wait.</h2><div class="loader"></div></div></div>'), null != Cookies.get("default-mic")) {
            var _e25 = document.getElementById("select-mic-dropdown");for (var _t9 = 0; _t9 < _e25.options.length; _t9++) {
              _e25.options[_t9].innerText === Cookies.get("default-mic") && (_e25.options[_t9].selected = !0);
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
      this.requestBox = new ee("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return et;
  }(ee);

  var tt = function (_Ge3) {
    _inherits(tt, _Ge3);

    function tt(e, t) {
      var _this26;

      _classCallCheck(this, tt);

      (_this26 = _possibleConstructorReturn(this, _Ge3.call(this)), _this26), _this26.config = e, _this26.config.codec = _this26.config.codec || _this26.defaultConfig.codec, _this26.sampler = new Ve(_this26.audioContext.sampleRate, _this26.config.codec.sampleRate, 1, _this26.config.codec.bufferSize), _this26.parentSocket = t, _this26.encoder = new je(_this26.config.codec.sampleRate, _this26.config.codec.channels, _this26.config.codec.app, _this26.config.codec.frameDuration);return _this26;
    }

    tt.prototype._makeStream = function _makeStream(e) {
      var _this27 = this;

      new $e({ audio: this.config.micId }, function (e) {
        _this27.stream = e, _this27.audioInput = _this27.audioContext.createMediaStreamSource(e), _this27.gainNode = _this27.audioContext.createGain(), _this27.recorder = _this27.audioContext.createScriptProcessor(_this27.config.codec.bufferSize, 1, 1), _this27.recorder.onaudioprocess = function (e) {
          var t = _this27.sampler.resampler(e.inputBuffer.getChannelData(0)),
              i = _this27.encoder.encode_float(t);for (var _e27 = 0; _e27 < i.length; _e27++) {
            1 === _this27.socket.readyState && _this27.socket.send(i[_e27]);
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

      this.room = e, this.uuid = t, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new ke(e, i, this), this.volume = e.main.mediaManager.getMasterVolume();
    }

    nt.prototype.removeCard = function removeCard() {
      this.card.hide();
    };

    nt.prototype.connectStream = function connectStream() {
      console.log("opening channel"), this.voiceReceiver = new Ze(this.room, this), this.card.isMuted && this.voiceReceiver.setVolume(0);
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

  var ot = function () {
    function ot(e, t, i, n, o, s) {
      var _this30 = this;

      _classCallCheck(this, ot);

      this.main = e, this.voiceServer = t, this.roomId = i, this.accessToken = o, this.roomMembers = new Map(), this.currentUser = n, this.isUnsubscribing = !1, new ee("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this30.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this30.toggleMic();
      }, s.forEach(function (e) {
        _this30.registerMember(e.uuid, e.name);
      });
    }

    ot.prototype.toggleMic = function toggleMic() {
      var _this31 = this;

      var e = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (t) {
        null != t.voiceBroadcast && (e = t.voiceBroadcast);
      }), e.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", e.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", e.mute()), setTimeout(function () {
        _this31.muteMicButtonElement.disabled = !1, _this31.canToggleMute = !0;
      }, 1e3));
    };

    ot.prototype.unsubscribe = function unsubscribe() {
      var _this32 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new ee("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), y(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (e) {
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

    ot.prototype.resubToPlayer = function resubToPlayer(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.connectStream());
    };

    ot.prototype.handleMemberLeaving = function handleMemberLeaving(e) {
      var t = this.roomMembers.get(e);null == t || (null != t.voiceBroadcast && (t.voiceBroadcast.shutdown(), t.voiceBroadcast.changeMicPopup.hide()), null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.removeCard(), this.roomMembers.delete(e), 1 === this.roomMembers.size && this.unsubscribe());
    };

    ot.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new ee("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    ot.prototype.errorHandler = function errorHandler(e) {
      new ee("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(e);
    };

    ot.prototype.registerMember = function registerMember(e, t) {
      var i = new nt(this, e, t);this.roomMembers.set(e, i), e == this.currentUser.uuid ? i.broadcastStream() : i.connectStream();
    };

    return ot;
  }();

  var st = function () {
    function st(e, t, i, n) {
      var _this33 = this;

      _classCallCheck(this, st);

      var o = [];t.forEach(function (t) {
        t != e.tokenSet.name && o.push(t);
      }), e.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var s = o.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + s, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this33.ignored = !0, _this33.hide(_this33), new ee("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this33.ignored || (_this33.ignored = !0, _this33.hide(_this33), new ee("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), n());
      };this.onTimeout = r, document.getElementById("call-deny-button").onclick = r;
    }

    st.prototype.hide = function hide() {
      document.getElementById("call-modal").style.display = "none", document.getElementById("modal-overlay").style.display = "none";
    };

    return st;
  }();

  var rt = function () {
    function rt(e) {
      _classCallCheck(this, rt);

      this.room = null, this.main = e, this.currentUser = e.currentUser;
    }

    rt.prototype.promptCall = function promptCall(e, t, i, n, o) {
      var _this34 = this;

      null == this.room ? new st(this.main, n, function () {
        _this34.room = new ot(_this34.main, e, t, _this34.main.tokenSet, i, o);
      }, function () {
        y(_this34.voiceServer.rest + "/leave-room?room=" + t + "&uuid=" + _this34.currentUser.uuid + "&accessToken=" + i).then(function (e) {
          e.json().then(function (e) {
            0 === e.results.length ? _this34.leaveErrorhandler("denied request") : console.log("cancelled call");
          }).catch(function (e) {
            _this34.leaveErrorhandler(e);
          });
        }).catch(function (e) {
          _this34.leaveErrorhandler(e);
        });
      }) : new ee("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    rt.prototype.leaveErrorhandler = function leaveErrorhandler() {
      new ee("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
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

      "granted" === Notification.permission || "denied" !== Notification.permission && (this.requestBox = new ee("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this35.requestNotificationPermissions();
      });
    };

    at.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/helm/" + this.main.tokenSet.name });
    };

    at.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this36 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this36.requestBox.hide(), new ee("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this36.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return at;
  }();

  var lt = i(0);var ut = null;
  var ht = function ht(e, t, i) {
    _classCallCheck(this, ht);

    this.x = e || 0, this.y = t || 0, this.z = i || 0;
  };

  var ct = function () {
    function ct(e, t, i, n) {
      _classCallCheck(this, ct);

      this.x = e || 0, this.y = t || 0, this.z = i || 0, this.w = void 0 === n ? 1 : n;
    }

    ct.prototype.setFromEuler = function setFromEuler(e) {
      var t = Math.sin,
          i = Math.cos;var n = e.x,
          o = e.y,
          s = e.z,
          r = i(n / 2),
          a = i(o / 2),
          l = i(s / 2),
          u = t(n / 2),
          h = t(o / 2),
          c = t(s / 2);return this.x = u * a * l + r * h * c, this.y = r * h * l - u * a * c, this.z = r * a * c + u * h * l, this.w = r * a * l - u * h * c, this;
    };

    return ct;
  }();

  var dt = function () {
    function dt() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new we();
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ct();

      _classCallCheck(this, dt);

      this.position = e, this.rotation = t;
    }

    dt.prototype.applyTo = function applyTo(e) {
      var t = this.position,
          i = new we(0, 0, 1).applyQuaternion(this.rotation),
          n = new we(0, 1, 0).applyQuaternion(this.rotation);e.positionX ? (e.positionX.value = t.x, e.positionY.value = t.y, e.positionZ.value = t.z) : e.setPosition(t.x, t.y, t.z), e instanceof PannerNode ? e.orientationX ? (e.orientationX.value = i.x, e.orientationY.value = i.y, e.orientationZ.value = i.z) : e.setOrientation(i.x, i.y, i.z) : e.forwardX ? (e.forwardX.value = i.x, e.forwardY.value = i.y, e.forwardZ.value = i.z, e.upX.value = n.x, e.upY.value = n.y, e.upZ.value = n.z) : e.setOrientation(i.x, i.y, i.z, n.x, n.y, n.z);
    };

    return dt;
  }();

  var mt = function () {
    function mt(e, t, i, n) {
      _classCallCheck(this, mt);

      this.world = e, this.audioCtx = new AudioContext(), this.listener = this.audioCtx.listener, this.updateLocation(t, i, n);
    }

    mt.prototype.updateLocation = function updateLocation(e, t, i) {
      this.location = e, this.pitch = this.toRadians(t), this.yaw = this.toRadians(this.normalizeYaw(360 - i));var n = new ht(this.pitch, this.yaw, 0),
          o = new ct();o.setFromEuler(n);new dt(e, o).applyTo(this.listener), this.world.onLocationUpdate();
    };

    mt.prototype.toRadians = function toRadians(e) {
      return e * (Math.PI / 180);
    };

    mt.prototype.normalizeYaw = function normalizeYaw(e) {
      return 0 > (e %= 360) && (e += 360), e;
    };

    return mt;
  }();

  var pt = function pt(e, t, i) {
    _classCallCheck(this, pt);

    this.source = e, this.distance = t, this.speaker = i;
  };

  var ft = "SPEAKER_2D";
  var gt = function gt(e, t, i, n) {
    _classCallCheck(this, gt);

    this.pannerNode = i.audioCtx.createPanner(), this.media = n, n.addNode(i, this.pannerNode), this.pannerNode.panningModel = "HRTF", this.pannerNode.maxDistance = e.maxDistance, this.pannerNode.rolloffFactor = .9, this.pannerNode.distanceModel = "linear";var o = e.location;new dt(o).applyTo(this.pannerNode), this.gainNode = i.audioCtx.createGain(), this.gainNode.gain.value = 1.2, this.pannerNode.connect(this.gainNode), this.gainNode.connect(i.audioCtx.destination);
  };

  var yt = function () {
    function yt(e, t, i) {
      var _this37 = this;

      _classCallCheck(this, yt);

      this.id = "SPEAKER__" + t, this.openAudioMc = e, this.speakerNodes = new Map();var n = new ie(this.id);n.trackable = !0, this.channel = n;var o = new de(t);this.media = o, o.openAudioMc = e, o.setOa(e), n.mixer = this.openAudioMc.getMediaManager().mixer, n.addSound(o), n.setChannelVolume(0), o.startDate(i, !0), o.finalize().then(function () {
        e.getMediaManager().mixer.addChannel(n), o.setLooping(!0), n.setTag(_this37.id), n.setTag("SPECIAL"), _this37.openAudioMc.getMediaManager().mixer.updateCurrent(), o.startDate(i, !0), o.finish();
      });
    }

    yt.prototype.removeSpeakerLocation = function removeSpeakerLocation(e) {
      null != this.speakerNodes.get(e) && this.speakerNodes.delete(e);
    };

    yt.prototype.updateLocation = function updateLocation(e, t, i) {
      if (e.type == ft) {
        var _n5 = e.getDistance(t, i),
            _o3 = this._convertDistanceToVolume(e.maxDistance, _n5);if (0 > _o3) return;this.channel.fadeChannel(_o3, 100);
      } else this.speakerNodes.has(e.id) || (this.channel.fadeChannel(100, 100), this.speakerNodes.set(e.id, new gt(e, t, i, this.media)));
    };

    yt.prototype._convertDistanceToVolume = function _convertDistanceToVolume(e, t) {
      return K((e - t) / e * 100);
    };

    yt.prototype.remove = function remove() {
      this.openAudioMc.getMediaManager().destroySounds(this.id, !1);
    };

    return yt;
  }();

  var bt = function () {
    function bt(e) {
      _classCallCheck(this, bt);

      this.openAudioMc = e, this.speakers = new Map(), this.audioMap = new Map(), this.player = new mt(this, new we(0, 0, 0), 0, 0);
    }

    bt.prototype.getSpeakerById = function getSpeakerById(e) {
      return this.speakers.get(e);
    };

    bt.prototype.addSpeaker = function addSpeaker(e, t) {
      this.speakers.set(e, t), this.renderAudio2D();
    };

    bt.prototype.removeSpeaker = function removeSpeaker(e) {
      this.speakers.delete(e), this.audioMap.forEach(function (e, t) {
        e.removeSpeakerLocation(t);
      }), this.renderAudio2D();
    };

    bt.prototype.getMediaForSource = function getMediaForSource(e, t) {
      var i = this.audioMap.get(e);if (null != i) return i;if (null == t) return null;var n = new yt(this.openAudioMc, e, t);return this.audioMap.set(e, n), n;
    };

    bt.prototype.removeMediaFromSource = function removeMediaFromSource(e) {
      var t = this.getMediaForSource(e);null == t || (t.remove(), this.audioMap.delete(e));
    };

    bt.prototype.onLocationUpdate = function onLocationUpdate() {
      this.renderAudio2D();
    };

    bt.prototype.isMediaUsed = function isMediaUsed(e) {
      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = this.speakers.values()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var t = _step22.value;
          if (t.source == e) return !0;
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

    bt.prototype.renderAudio2D = function renderAudio2D() {
      var _this38 = this;

      var e = [];this.speakers.forEach(function (t) {
        var i = t.getDistance(_this38, _this38.player);e.push(new pt(t.source, i, t));
      });var t = new Map();var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = e[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var _i8 = _step23.value;
          var _e29 = t.get(_i8.source);null != _e29 ? Array.isArray(_e29) ? (_e29.push(_i8), t.set(_i8.source, _e29)) : _e29.distance > _i8.distance && _i8.distance <= _i8.speaker.maxDistance && t.set(_i8.source, _i8) : _i8.speaker.type == ft ? _i8.distance <= _i8.speaker.maxDistance && t.set(_i8.source, _i8) : _i8.distance <= _i8.speaker.maxDistance && t.set(_i8.source, [_i8]);
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

      t.forEach(function (e) {
        var t = Array.isArray(e) ? e : [e];var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
          for (var _iterator24 = t[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            var _e28 = _step24.value;
            _this38.getMediaForSource(_e28.source, _e28.speaker.startInstant).updateLocation(_e28.speaker, _this38, _this38.player);
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
      }), this.audioMap.forEach(function (e, t) {
        _this38.isMediaUsed(t) || _this38.removeMediaFromSource(t);
      });
    };

    return bt;
  }();

  i.d(t, "OpenAudioMc", function () {
    return wt;
  });
  var wt = function (_ref2) {
    _inherits(wt, _ref2);

    function wt() {
      var _this39, _ret2;

      _classCallCheck(this, wt);

      if ((_this39 = _possibleConstructorReturn(this, _ref2.call(this)), _this39), _this39.canStart = !1, _this39.host = null, _this39.background = null, _this39.ambianceSound = "", _this39.tokenSet = new he().fromCache(), null == _this39.tokenSet) return _ret2 = void n($.BAD_AUTH), _possibleConstructorReturn(_this39, _ret2);_this39.notificationModule = new at(_this39), _this39.timeService = new J(), _this39.messages = new Q(_this39), _this39.userInterfaceModule = new Z(_this39), _this39.hueConfiguration = new Se(_this39), _this39.mediaManager = new pe(_this39), _this39.boot();new Ee(ue.MAIN_BACKEND).route(_this39).then(function (e) {
        _this39.canStart = !0, _this39.host = e.host, _this39.background = e.background, _this39.ambianceSound = e.ambianceSound, n($.WELCOME);
      }).catch(function (e) {
        console.error("Exception thrown", e.stack), _this39.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.");
      });return _possibleConstructorReturn(_this39);
    }

    wt.prototype.start = function start() {
      this.canStart && (this.canStart = !1, Ye = new (window.AudioContext || window.webkitAudioContext)(), this.voiceModule = new rt(this), this.world = new bt(this), this.hueModule = new te(this, Object(lt.a)()), this.socketModule = new fe(this, this.host), this.messages.apply(), this.mediaManager.setupAmbianceSound(this.ambianceSound), this.mediaManager.postBoot(), new Me(this), "" !== this.background && (document.getElementById("banner-image").src = this.background), this.mediaManager.postBoot());
    };

    wt.prototype.sendError = function sendError(e) {
      R(e, this.tokenSet.name);
    };

    return wt;
  }(function (_ref3) {
    _inherits(_class3, _ref3);

    function _class3() {
      _classCallCheck(this, _class3);

      return _possibleConstructorReturn(this, _ref3.apply(this, arguments));
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

  window.onload = function () {
    if (0 < document.getElementsByTagName("v6").length) return void (window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/old_client.html");if (navigator.vendor && -1 < navigator.vendor.indexOf("Apple") && navigator.userAgent && -1 == navigator.userAgent.indexOf("CriOS") && -1 == navigator.userAgent.indexOf("FxiOS")) return void (window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/browsers.html");new he().initialize().then(function (e) {
      return console.log(e), null == e ? (n($.BAD_AUTH), void R("A faulty login attempt was done at " + window.location.host, "Steve")) : (null != e && null != e.name && (document.getElementById("top-head").src = "https://minotar.net/helm/" + e.name, document.getElementById("in-game-name").innerText = e.name, ut = new wt()), document.body.addEventListener("click", W), void y(ue.SERVER_STATUS + e.name).then(function (e) {
        e.json().then(function (e) {
          e.offline ? (console.log("Redirecting because network error"), window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/network_error.html") : console.log("[OpenAudioMc] Server status:" + JSON.stringify(e));
        });
      }));
    }).catch(function (e) {
      console.log(e), window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/network_error.html";
    });
  };
}]);
