"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  var t = {};function i(n) {
    if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
  }i.m = e, i.c = t, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
  }, i.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var n = Object.create(null);if (i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {
      i.d(n, o, function (t) {
        return e[t];
      }.bind(null, o));
    }return n;
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return i.d(t, "a", t), t;
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, i.p = "", i(i.s = 2);
}([function (e, t, i) {
  "use strict";
  (function (e) {
    i.d(t, "a", function () {
      return s;
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
          for (var _len = arguments.length, n = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }

          return e.apply(undefined, [t(i)].concat(n));
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
              Cookies.set("hueid", m);var f = r + "/" + m,
                  p = f + "/capabilities",
                  g = f + "/config",
                  y = f + "/lights",
                  b = f + "/groups",
                  w = f + "/schedules",
                  v = f + "/scenes",
                  M = f + "/sensors",
                  k = f + "/rules",
                  E = f + "/resourcelinks",
                  S = function S(e) {
                return function (t) {
                  return e + "/" + t;
                };
              },
                  B = S(y),
                  I = S(b),
                  A = S(w),
                  x = S(v),
                  C = S(M),
                  T = S(k),
                  _ = S(E);return { getCapabilities: a.bind(null, p), deleteUser: d(h, function (e) {
                  return g + "/whitelist/" + e;
                }), getConfig: a.bind(null, g), setConfig: l.bind(null, g), getFullState: a.bind(null, f), getLights: a.bind(null, y), getNewLights: a.bind(null, y + "/new"), searchForNewLights: function searchForNewLights() {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                  return u(y, e);
                }, getLight: d(a, B), setLight: d(l, B), setLightState: d(l, function (e) {
                  return B(e) + "/state";
                }), deleteLight: d(h, B), getGroups: a.bind(null, b), createGroup: u.bind(null, b), getGroup: d(a, I), setGroup: d(l, I), setGroupState: d(l, function (e) {
                  return I(e) + "/action";
                }), deleteGroup: d(h, I), getSchedules: a.bind(null, w), createSchedule: u.bind(null, w), getSchedule: d(a, A), setSchedule: d(l, A), deleteSchedule: d(h, A), scheduleCommandGenerator: function scheduleCommandGenerator() {
                  return n(c(s), t, i, o).bridge(e).user(m);
                }, getScenes: a.bind(null, v), createScene: u.bind(null, v), getScene: d(a, x), setScene: d(l, x), setSceneLightState: function setSceneLightState(e, t, i) {
                  return l(x(e) + "/lightstates/" + t, i);
                }, deleteScene: d(h, x), getSensors: a.bind(null, M), createSensor: u.bind(null, M), searchForNewSensors: u.bind(null, M, null), getNewSensors: a.bind(null, M + "/new"), getSensor: d(a, C), setSensor: d(l, C), setSensorConfig: d(l, function (e) {
                  return C(e) + "/config";
                }), setSensorState: d(l, function (e) {
                  return C(e) + "/state";
                }), deleteSensor: d(h, C), getRules: a.bind(null, k), createRule: u.bind(null, k), getRule: d(a, T), setRule: d(l, T), deleteRule: d(h, T), ruleActionGenerator: function ruleActionGenerator() {
                  return n(c(f), t, i, o).bridge(e).user(m);
                }, getResourceLinks: a.bind(null, E), createResourceLink: u.bind(null, E), getResourceLink: d(a, _), setResourceLink: d(l, _), deleteResourceLink: d(h, _) };
            } };
        } };
    };var o = void 0;function s() {
      return o();
    }"undefined" != typeof fetch && "undefined" != typeof Response && "undefined" != typeof JSON && "undefined" != typeof Promise && (o = n.bind(null, fetch, Response, JSON, Promise), void 0 !== e.exports && (e.exports = o));
  }).call(this, i(1)(e));
}, function (e, t) {
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
  i.r(t);
  var n = function () {
    function n() {
      _classCallCheck(this, n);

      this.isServerAhead = !1, this.msOffset = 0, this.hasSynced = !1;
    }

    n.prototype.sync = function sync(e, t) {
      var i = new Date(e),
          n = new Date().getTime(),
          o = new Date(n += 60 * t * 60 * 1e3);this.isServerAhead = i.getTime() > o.getTime(), this.msOffset = this.isServerAhead ? i.getTime() - o.getTime() : o.getTime() - i.getTime(), this.hasSynced = !0;
    };

    n.prototype.getPredictedTime = function getPredictedTime() {
      this.hasSynced || new Date().getTime();var e = new Date().getTime();return new Date(this.isServerAhead ? e + this.msOffset : e - this.msOffset);
    };

    return n;
  }();

  var o = function () {
    function o(e) {
      _classCallCheck(this, o);

      this.fallback = "No message provided in oa+", this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "We've detected a Philips Hue Bridge! You can connect it to OpenAudioMc and link your in-game session to your lights. This allows your current server to add real-time lighting effects. You can unlink at any time and manually select your lights.", this.welcomeMessage = this.fallback, this.errorMessage = this.fallback;
    }

    o.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state && (document.getElementById("status-message").innerHTML = this.welcomeMessage);
    };

    return o;
  }();

  var s = function () {
    function s(e) {
      var _this = this;

      _classCallCheck(this, s);

      this.openAudioMc = e, document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    s.prototype.changeColor = function changeColor(e, t) {
      var i = (n = (n = e).replace("#", ""), "rgb(" + parseInt(n.substring(0, 2), 16) + ", " + parseInt(n.substring(2, 4), 16) + ", " + parseInt(n.substring(4, 6), 16) + ")");var n;document.querySelectorAll("*").forEach(function (e, n) {
        var o = window.getComputedStyle(e);Object.keys(o).reduce(function (n, s) {
          var r = o[s],
              a = o.getPropertyValue(r);if (a.indexOf(i) >= 0) {
            var _n = a.replace(i, t);r.indexOf("border-top") >= 0 ? e.style.borderTop = "2px solid " + _n : e.style[r] = _n;
          }
        });
      });
    };

    s.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    s.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    s.prototype.openApp = function openApp() {
      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage), document.getElementById("page").classList.remove("dark-bg");
    };

    s.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    s.prototype.kickScreen = function kickScreen(e) {
      document.getElementById("footer-welcome").innerText = "Session terminated", document.getElementById("boot-button").style.display = "none", document.getElementById("welcome-text-landing").innerHTML = null == e ? this.openAudioMc.messages.errorMessage : e, document.getElementById("welcome").style.display = "", document.getElementById("page").classList.add("dark-bg"), document.getElementById("app").style.display = "none";
    };

    s.prototype.showVolumeSlider = function showVolumeSlider(e) {
      e ? (document.getElementById("volume-label").style.display = "", document.getElementById("volume-disp").style.display = "") : (document.getElementById("volume-disp").style.display = "none", document.getElementById("volume-label").style.display = "none");
    };

    return s;
  }();

  var r = "hue_connected",
      a = "media_failure";
  var l = function () {
    function l(e, t) {
      var _this2 = this;

      _classCallCheck(this, l);

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

    l.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return document.getElementById("hue-bridge-menu-button").style.display = "none", void this.openAudioMc.getUserInterfaceModule().showMain();null != this.options.userid && this.openAudioMc.getHueModule().startSetup();
      } else this.openAudioMc.log("No hue bridges found");
    };

    l.prototype.startSetup = function startSetup() {
      var e = this;document.getElementById("hue-link-menu").style.display = "none", document.getElementById("hue-linking-menu").style.display = "", this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    l.prototype.onConnect = function onConnect() {
      var _this3 = this;

      this.currentUser.getConfig().then(function (e) {
        document.getElementById("hue-settings-menu").style.display = "", document.getElementById("hue-linking-menu").style.display = "none", document.getElementById("hue-link-menu").style.display = "none", _this3.openAudioMc.getHueConfiguration().setBridgeName(e.name), _this3.currentUser.getLights().then(function (e) {
          var t = [];for (var _i in e) {
            e.hasOwnProperty(_i) && t.push({ name: e[_i].name, id: parseInt(_i) });
          }_this3.openAudioMc.getHueConfiguration().setLightNamesAndIds(t), null != Cookies.get("hue-state") && (_this3.openAudioMc.getHueConfiguration().state = JSON.parse(Cookies.get("hue-state"))), _this3.openAudioMc.getHueConfiguration().applyState(), _this3.openAudioMc.getHueConfiguration().updateState();
        }), _this3.openAudioMc.socketModule.send(r, {});
      });
    };

    l.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("input-bridge-select").value = e;
      }, 200);
    };

    l.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 2 * t.alpha * 127.5 != 0, hue: Math.floor(65535 * t.hue / 360), sat: Math.floor(255 * t.saturation), bri: Math.round(2 * t.alpha * 127.5) };
    };

    l.prototype.setLight = function setLight(e, t) {
      var _this4 = this;

      var i = [];if ("number" == typeof e) {
        var _t = this.openAudioMc.getHueConfiguration().getBulbStateById(e - 1);if (-1 === _t) return !1;i.push(_t);
      } else if (e.startsWith("[")) JSON.parse(e).forEach(function (e) {
        var t = _this4.openAudioMc.getHueConfiguration().getHueIdFromId(e - 1);if (-1 === t) return !1;i.push(t);
      });else {
        var _t2 = this.openAudioMc.getHueConfiguration().getHueIdFromId(parseInt(e) - 1);if (-1 === _t2) return !1;i.push(_t2);
      }i.forEach(function (e) {
        _this4.currentUser.setLightState(e, _this4.colorToHueHsv(t)).then(function () {});
      });
    };

    l.prototype.linkBridge = function linkBridge(e, t) {
      var _this5 = this;

      if (document.getElementById("hue-linking-message").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("hue-linking-message").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this5.linkBridge(e, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var i = this;var n = 0,
          o = -1;o = setInterval(function () {
        function e() {
          clearInterval(o);
        }if (++n > 60) return e(), document.getElementById("hue-linking-message").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" id='restart-hue-linking'>Click here to try again</span>", document.getElementById("restart-hue-linking").onclick = function () {
          return _this5.startSetup();
        }, void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - n;document.getElementById("hue-linking-message").innerText = _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", t), i.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null != t[0].error ? 101 === t[0].error.type || (e(), _this5.openAudioMc.log("Unexpected error while connecting: " + t[0].error.type)) : null != t[0].success && (i.currentUser = i.currentBridge.user(t[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), i.isLinked = !0, i.onConnect(), e());
        });
      }, 1e3);
    };

    return l;
  }();

  var u = function () {
    function u(e) {
      _classCallCheck(this, u);

      this.channelName = e, this.channelVolume = 100, this.sounds = new Array(), this.mixer = null, this.targetAfterFade = 0, this.isFading = !1, this.fadeTimer = new Array(), this.tags = new Map();
    }

    u.prototype.setTag = function setTag(e) {
      this.tags.set(e, !0);
    };

    u.prototype.hasTag = function hasTag(e) {
      return this.tags.has(e);
    };

    u.prototype.addSound = function addSound(e) {
      this.sounds.push(e);var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.sounds.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _e2 = _step.value;
          _e2.registerMixer(this.mixer, this);
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

    u.prototype.setChannelVolume = function setChannelVolume(e) {
      this.channelVolume = e, this._updateVolume();
    };

    u.prototype.registerMixer = function registerMixer(e) {
      this.mixer = e;var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.sounds.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _e3 = _step2.value;
          _e3.registerMixer(this.mixer, this);
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

    u.prototype.fadeChannel = function fadeChannel(e, t, i) {
      var _this6 = this;

      this.interruptFade(), this.targetAfterFade = e, this.isFading = !0;(function (e, t, n, o) {
        t = t || 1e3, n = n || 0, o = "function" == typeof o ? o : function () {};var s = _this6.channelVolume,
            r = t / Math.abs(s - n),
            a = setInterval(function () {
          s = s > n ? s - 1 : s + 1;var e = _this6.mixer.masterVolume,
              t = s / 100 * e;var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _this6.sounds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _e5 = _step3.value;
              _e5.setVolume(t);
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
            null != i && i(), o.call(_this6), clearInterval(a);var _e4 = _this6.fadeTimer.indexOf(a);_e4 > -1 && _this6.fadeTimer.splice(_e4, 1), _this6.isFading = !1, a = null;
          }
        }, r);_this6.fadeTimer.push(a);
      })(0, t, e);
    };

    u.prototype.interruptFade = function interruptFade() {
      if (this.isFading) {
        this.isFading = !1, this.setChannelVolume(this.targetAfterFade);var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.fadeTimer[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _e6 = _step4.value;
            clearInterval(_e6);
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

    u.prototype._updateVolume = function _updateVolume() {
      this.interruptFade();var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.sounds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _e7 = _step5.value;
          _e7.setVolume(t);
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

    u.prototype.updateFromMasterVolume = function updateFromMasterVolume() {
      var e = this.mixer.masterVolume,
          t = this.channelVolume / 100 * e;var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.sounds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _e8 = _step6.value;
          _e8.setVolume(t);
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

    u.prototype.destroy = function destroy() {
      this.interruptFade();var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.sounds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _e9 = _step7.value;
          _e9.destroy();
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

    return u;
  }();

  var h = function () {
    function h(e) {
      _classCallCheck(this, h);

      this.mixerName = e, this.masterVolume = 100, this.channels = new Map();
    }

    h.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e;var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.channels.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _e10 = _step8.value;
          _e10.updateFromMasterVolume();
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

    h.prototype.removeChannel = function removeChannel(e) {
      var t = void 0;null != (t = e instanceof u ? e : this.channels.get(e)) && (t.destroy(), this.channels.delete(t.channelName));
    };

    h.prototype.getChannels = function getChannels() {
      return this.channels.values();
    };

    h.prototype.addChannel = function addChannel(e) {
      if (!(e instanceof u)) throw new Error("Argument isn't a channel");{
        var _t3 = e.channelName,
            _i2 = this.channels.get(_t3);null != _i2 && _i2.destroy(), e.registerMixer(this), this.channels.set(_t3, e);
      }
    };

    return h;
  }();

  var d = function () {
    function d(e) {
      var _this7 = this;

      _classCallCheck(this, d);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, this.mixer = new h(), document.getElementById("volume-slider").oninput = function () {
        var e = document.getElementById("volume-slider").value;_this7.setMasterVolume(e), Cookies.set("volume", e);
      };
    }

    d.prototype.destroySounds = function destroySounds(e, t, i) {
      var _this8 = this;

      this.openAudioMc.debugPrint("starting to quit fade " + e);var n = 250;i && (n = 0);var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        var _loop = function _loop() {
          var i = _step9.value;
          console.log(i), t ? i.fadeChannel(0, n, function () {
            _this8.mixer.removeChannel(i);
          }) : null == e || "" === e ? i.hasTag("SPECIAL") || i.hasTag("REGION") || i.hasTag("SPEAKER") || i.fadeChannel(0, n, function () {
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

    d.prototype.setMasterVolume = function setMasterVolume(e) {
      this.masterVolume = e, 0 === e ? document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>" : document.getElementById("volume-disp").innerText = "Volume: " + e + "%", Cookies.set("volume", e), this.mixer.setMasterVolume(e), this.openAudioMc.voiceModule.setVolume(e);
    };

    d.prototype.changeVolume = function changeVolume(e) {
      document.getElementById("volume-slider").value = e, this.setMasterVolume(e);
    };

    d.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    return d;
  }();

  var c = function () {
    function c(e) {
      _classCallCheck(this, c);
    }

    c.getParameter = function getParameter() {
      var e = window.location.href.split("&"),
          t = {};for (var _i3 = 0; _i3 < e.length; _i3++) {
        var _n2 = e[_i3].split("="),
            _o = decodeURIComponent(_n2[0]),
            _s2 = decodeURIComponent(_n2[1]);void 0 === t[_o] ? t[_o] = decodeURIComponent(_s2) : "string" == typeof t[_o] ? t[_o] = [t[_o], decodeURIComponent(_s2)] : t[_o].push(decodeURIComponent(_s2));
      }return t;
    };

    return c;
  }();

  var m = function () {
    function m(e, t) {
      _classCallCheck(this, m);

      this.id = e, this.option = t, this.onTimeout = null;
    }

    m.prototype.show = function show(e) {
      var _this9 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if ("" === e || null == e) throw '"msg parameter is empty"';if (this.alertArea = document.querySelector(this.id), this.alertBox = document.createElement("DIV"), this.alertContent = document.createElement("DIV"), this.alertClose = document.createElement("A"), this.alertClass = this, this.alertContent.classList.add("alert-content"), this.alertContent.innerHTML = t ? e : "<p>" + e + "</p>", this.alertClose.classList.add("alert-close"), this.alertClose.setAttribute("href", "#"), this.alertBox.classList.add("alert-box"), this.alertBox.classList.add("blurIn"), null != this.option.extra && this.alertBox.classList.add(this.option.extra), this.alertBox.appendChild(this.alertContent), this.option.hideCloseButton && void 0 !== this.option.hideCloseButton || this.alertBox.appendChild(this.alertClose), this.alertArea.appendChild(this.alertBox), this.alertClose.addEventListener("click", function (e) {
        e.preventDefault(), _this9.alertClass.hide(_this9.alertBox);
      }), !this.option.persistent) var i = setTimeout(function () {
        _this9.alertClass.hide(_this9.alertBox), clearTimeout(i);
      }, this.option.closeTime);return this;
    };

    m.prototype.hide = function hide(e) {
      var _this10 = this;

      this.alertBox.classList.add("hide");var t = setTimeout(function () {
        _this10.alertBox.parentNode.removeChild(_this10.alertBox), clearTimeout(t), null != _this10.onTimeout && _this10.onTimeout();
      }, 500);
    };

    return m;
  }();

  var f = function () {
    function f(e, t) {
      var _this11 = this;

      _classCallCheck(this, f);

      if (this.handlers = {}, this.openAudioMc = e, null == c.getParameter().data) return e.debugPrint("data is empty"), void e.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");e.debugPrint("Username: " + e.tokenSet.name), e.debugPrint("Player uuid: " + e.tokenSet.uuid), e.debugPrint("Server uuid: " + e.tokenSet.publicServerKey), e.debugPrint("Token: " + e.tokenSet.token), this.state = "loading", this.authHeader = "type=client&n=" + e.tokenSet.name + "&player=" + e.tokenSet.uuid + "&s=" + e.tokenSet.publicServerKey + "&p=" + e.tokenSet.token, e.debugPrint(this.authHeader);var i = this;this.socket = io(t, { query: i.authHeader, autoConnect: !1 }), this.socket.on("connect", function () {
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
            var _e11 = _step10.value;
            r.push(_e11.name);
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

    f.prototype.send = function send(e, t) {
      this.socket.emit(e, t);
    };

    f.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return f;
  }();

  var p = [],
      g = { "&4": "font-weight:normal;text-decoration:none;color:#be0000", "&c": "font-weight:normal;text-decoration:none;color:#fe3f3f", "&6": "font-weight:normal;text-decoration:none;color:#d9a334", "&e": "font-weight:normal;text-decoration:none;color:#fefe3f", "&2": "font-weight:normal;text-decoration:none;color:#00be00", "&a": "font-weight:normal;text-decoration:none;color:#3ffe3f", "&b": "font-weight:normal;text-decoration:none;color:#3ffefe", "&3": "font-weight:normal;text-decoration:none;color:#00bebe", "&1": "font-weight:normal;text-decoration:none;color:#0000be", "&9": "font-weight:normal;text-decoration:none;color:#3f3ffe", "&d": "font-weight:normal;text-decoration:none;color:#fe3ffe", "&5": "font-weight:normal;text-decoration:none;color:#be00be", "&f": "font-weight:normal;text-decoration:none;color:#ffffff", "&7": "font-weight:normal;text-decoration:none;color:#bebebe", "&8": "font-weight:normal;text-decoration:none;color:#3f3f3f", "&0": "font-weight:normal;text-decoration:none;color:#000000", "&l": "font-weight:bold", "&n": "text-decoration:underline;text-decoration-skip:spaces", "&o": "font-style:italic", "&m": "text-decoration:line-through;text-decoration-skip:spaces" };function y(e, t) {
    var i = void 0,
        n = void 0,
        o = t.childNodes.length;if (e.indexOf("<br>") > -1) {
      t.innerHTML = e;for (var _e12 = 0; _e12 < o; _e12++) {
        3 === (n = t.childNodes[_e12]).nodeType && ((i = document.createElement("span")).innerHTML = n.nodeValue, t.replaceChild(i, n), s(i));
      }
    } else s(t, e);function s(e, t) {
      var i = 0,
          n = t || e.innerHTML,
          o = n.length;p.push(window.setInterval(function () {
        i >= o && (i = 0), n = function (e, t) {
          var i = String.fromCharCode((n = 64, o = 90, Math.floor(Math.random() * (o - n + 1)) + n));var n, o;return e.substr(0, t) + i + e.substr(t + 1, e.length);
        }(n, i), e.innerHTML = n, i++;
      }, 0));
    }
  }function b(e, t) {
    var i = t.length,
        n = document.createElement("span"),
        o = !1;for (var _s3 = 0; _s3 < i; _s3++) {
      n.style.cssText += g[t[_s3]] + ";", "§k" === t[_s3] && (y(e, n), o = !0);
    }return o || (n.innerHTML = e), n;
  }function w(e) {
    var t,
        i,
        n = e.match(/&.{1}/g) || [],
        o = [],
        s = [],
        r = document.createDocumentFragment(),
        a = n.length;e = e.replace(/\n|\\n/g, "<br>");for (var _t4 = 0; _t4 < a; _t4++) {
      o.push(e.indexOf(n[_t4])), e = e.replace(n[_t4], "\0\0");
    }0 !== o[0] && r.appendChild(b(e.substring(0, o[0]), []));for (var _l = 0; _l < a; _l++) {
      if (2 === (i = o[_l + 1] - o[_l])) {
        for (; 2 === i;) {
          s.push(n[_l]), i = o[++_l + 1] - o[_l];
        }s.push(n[_l]);
      } else s.push(n[_l]);s.lastIndexOf("§r") > -1 && (s = s.slice(s.lastIndexOf("§r") + 1)), t = e.substring(o[_l], o[_l + 1]), r.appendChild(b(t, s));
    }return r;
  }String.prototype.replaceColorCodes = function () {
    return function () {
      var e = p.length;for (; e--;) {
        clearInterval(p[e]);
      }p = [];
    }(), w(String(this));
  };
  var v = function () {
    function v(e) {
      _classCallCheck(this, v);

      null != e && this.fromJson(e);
    }

    v.prototype.fromJson = function fromJson(e) {
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

    v.prototype.replaceWithJson = function replaceWithJson(e, t) {
      document.getElementById(e).replaceWith(new DOMParser().parseFromString(this.partToHtml(t), "text/html").body.childNodes[0]);
    };

    v.prototype.rowToHtml = function rowToHtml(e) {
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

    v.prototype.partToHtml = function partToHtml(e) {
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
          var _e13 = _step14.value;
          t += _e13;
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

      e.text = e.text.split("&").join("&"), w(e.text).childNodes.forEach(function (e) {
        t += e.outerHTML;
      });var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = n[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _e14 = _step15.value;
          t += _e14;
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

    return v;
  }();

  var M = function () {
    function M() {
      _classCallCheck(this, M);
    }

    M.getParametersFromUrl = function getParametersFromUrl(e) {
      if (e.indexOf("?&") > -1) return {};var t = e.split("&"),
          i = {};for (var _e15 = 0; _e15 < t.length; _e15++) {
        var _n3 = t[_e15].split("="),
            _o2 = decodeURIComponent(_n3[0]),
            _s4 = decodeURIComponent(_n3[1]);void 0 === i[_o2] ? i[_o2] = decodeURIComponent(_s4) : "string" == typeof i[_o2] ? i[_o2] = [i[_o2], decodeURIComponent(_s4)] : i[_o2].push(decodeURIComponent(_s4));
      }return i;
    };

    return M;
  }();

  var k = function () {
    function k(e, t, i, n) {
      _classCallCheck(this, k);

      this.publicServerKey = e, this.uuid = t, this.name = i, this.token = n;
    }

    k.prototype.fromUrl = function fromUrl(e) {
      if (null == e) return null;if (e.split("?").length < 2) return null;var t = M.getParametersFromUrl(e.split("?")[1]);if (null == t.data) return null;var i = atob(t.data).split(":");if (4 !== i.length) return null;var n = i[0],
          o = i[1],
          s = i[2],
          r = i[3];return null != n && n.length <= 16 && null != o && o.length <= 40 && null != s && s.length <= 40 && null != r && r.length <= 5 ? new k(s, o, n, r) : null;
    };

    return k;
  }();

  var E = null;
  var S = function () {
    function S(e) {
      var _this12 = this;

      _classCallCheck(this, S);

      this.soundElement = document.createElement("audio"), this.hadError = !1, this.error = null, this.soundElement.onerror = function (e) {
        _this12.hadError = !0, _this12.error = e, _this12._handleError();
      }, this.soundElement.src = e, this.soundElement.setAttribute("preload", "auto"), this.soundElement.setAttribute("controls", "none"), this.soundElement.setAttribute("display", "none"), this.soundElement.preload = "autoauto", this.soundElement.abort = console.log, this.openAudioMc = null, this.onFinish = null, this.loop = !1, this.mixer = null, this.channel = null, this.finsishedInitializing = !1;
    }

    S.prototype.setOa = function setOa(e) {
      this.openAudioMc = e, this._handleError();
    };

    S.prototype._handleError = function _handleError() {
      if (this.hadError && null != this.openAudioMc && "error" == this.error.type) {
        var _e16 = this.soundElement.error.code,
            t = null;1 === _e16 ? t = "MEDIA_ERR_ABORTED" : 2 === _e16 ? t = "MEDIA_ERR_NETWORK" : 3 === _e16 ? t = "MEDIA_ERR_DECODE" : 4 === _e16 && (t = "MEDIA_ERR_SRC_NOT_SUPPORTED"), null != t && (console.log("Reporting media failure " + t), this.openAudioMc.socketModule.send(a, { mediaError: t, source: this.soundElement.src }));
      }
    };

    S.prototype.registerMixer = function registerMixer(e, t) {
      this.mixer = e, this.channel = t;
    };

    S.prototype.finalize = function finalize() {
      var _this13 = this;

      return new Promise(function (e) {
        _this13.soundElement.onended = function () {
          _this13.finsishedInitializing && (console.log("Resource stream ended"), null != _this13.onFinish && _this13.onFinish(), _this13.loop ? (_this13.setTime(0), _this13.soundElement.play()) : _this13.mixer.removeChannel(_this13.channel));
        };var t = !1;var i = function i() {
          if (!t) {
            var _t7 = _this13.soundElement.play();_t7 instanceof Promise ? _t7.then(e).catch(e) : e();
          }t = !0;
        };_this13.soundElement.onprogress = i, _this13.soundElement.oncanplay = i, _this13.soundElement.oncanplaythrough = i;
      });
    };

    S.prototype.setLooping = function setLooping(e) {
      this.loop = e;
    };

    S.prototype.finish = function finish() {
      this.finsishedInitializing = !0;
    };

    S.prototype.setOnFinish = function setOnFinish(e) {
      this.onFinish = e;
    };

    S.prototype.setVolume = function setVolume(e) {
      e > 100 && (e = 100), this.soundElement.volume = e / 100;
    };

    S.prototype.startDate = function startDate(e) {
      console.log("Calculating offset for " + e);var t = new Date(e),
          i = Math.abs((t.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1e3),
          n = this.soundElement.duration;if (i > n) {
        var _e17 = Math.floor(i / n);console.log("Has played " + _e17 + " times"), i -= _e17 * n;
      }this.setTime(i);
    };

    S.prototype.setTime = function setTime(e) {
      console.log("Skipping to " + e), this.soundElement.currentTime = e;
    };

    S.prototype.destroy = function destroy() {
      this.setLooping(!1), this.soundElement.pause(), this.soundElement.remove();
    };

    return S;
  }();

  var B = function () {
    function B(e) {
      var _this14 = this;

      _classCallCheck(this, B);

      this.openAudioMc = e, e.socketModule.registerHandler("ClientCreateMediaPayload", function (t) {
        var i = t.media.loop,
            n = t.media.startInstant,
            o = t.media.mediaId,
            s = t.media.source,
            r = t.media.doPickup,
            a = t.media.fadeTime,
            l = t.distance,
            h = t.media.flag,
            d = t.maxDistance;e.getMediaManager().destroySounds(o, !1, !0);var c = new u(o),
            m = new S(s);m.openAudioMc = e, m.setOa(e), r && m.startDate(n, !0), m.finalize().then(function (t) {
          if (r && m.startDate(n, !0), e.getMediaManager().mixer.addChannel(c), c.addSound(m), c.setChannelVolume(0), m.setLooping(i), c.setTag(o), 0 !== d) {
            var _e18 = _this14.convertDistanceToVolume(d, l);c.setTag("SPECIAL"), c.maxDistance = d, c.fadeChannel(_e18, a);
          } else c.setTag("DEFAULT"), setTimeout(function () {
            0 === a ? (c.setChannelVolume(100), c.updateFromMasterVolume()) : (c.updateFromMasterVolume(), c.fadeChannel(100, a));
          }, 1);c.setTag(h), m.finish();
        });
      }), e.socketModule.registerHandler("ClientDestroyCardPayload", function () {
        document.getElementById("card-panel").style.display = "none";
      }), e.socketModule.registerHandler("ClientUpdateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);new v().replaceWithJson(e.id, t);
      }), e.socketModule.registerHandler("ClientCreateCardPayload", function (e) {
        var t = JSON.parse(e.serializedCard);console.log("creating card "), console.log(t), new v(t);
      }), e.socketModule.registerHandler("NotificationPayload", function (e) {
        var t = e.message;_this14.openAudioMc.notificationModule.sendNotification(e.title, t), new m("#alert-area", { closeTime: 3e4, persistent: !1, hideCloseButton: !1 }).show(e.title + "<hr />" + t);
      }), e.socketModule.registerHandler("ClientSettingsPayload", function (t) {
        _this14.openAudioMc.debugPrint("Updating settings...");var i = t.clientSettings,
            n = i.background,
            o = i.title,
            s = i.welcomeMessage,
            r = i.errorMessage,
            a = i.hueConnected,
            l = i.hueLinking,
            u = i.hueBridgeFound;"default" !== a && (e.getMessages().hueConnected = a), "default" !== l && (e.getMessages().hueLinking = l), "default" !== u && (e.getMessages().hueWelcome = u), "default" !== r && (e.getMessages().errorMessage = r), "default" !== s && (e.getMessages().welcomeMessage = s), "default" !== n && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + n + ");\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== o && (document.title = o), e.getMessages().apply();
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

    B.prototype.convertDistanceToVolume = function convertDistanceToVolume(e, t) {
      return Math.round((e - t) / e * 100);
    };

    return B;
  }();

  var I = function () {
    function I() {
      var _this15 = this;

      _classCallCheck(this, I);

      this.dropdowns = [], this.state = [], this.dropdowns.push(document.getElementById("bulb-selection-1")), this.dropdowns.push(document.getElementById("bulb-selection-2")), this.dropdowns.push(document.getElementById("bulb-selection-3")), this.dropdowns.forEach(function (e) {
        e.onchange = function () {
          _this15.select();
        };
      });
    }

    I.prototype.setBridgeName = function setBridgeName(e) {
      document.getElementById("bridge-name").innerText = e;
    };

    I.prototype.select = function select() {
      this.updateState();
    };

    I.prototype.applyState = function applyState() {
      var _this16 = this;

      this.state.forEach(function (e) {
        _this16.getInputById(e.bulb).selectedIndex = e.selectedIndex;
      });
    };

    I.prototype.updateState = function updateState() {
      var _this17 = this;

      this.state = [], this.dropdowns.forEach(function (e) {
        _this17.state.push(_this17.obtainSelection(e));
      }), Cookies.set("hue-state", this.state);
    };

    I.prototype.obtainSelection = function obtainSelection(e) {
      var t = e.dataset.bulb,
          i = e.options[e.selectedIndex].dataset.light;return { selectedIndex: e.selectedIndex, bulb: t, value: i };
    };

    I.prototype.getBulbStateById = function getBulbStateById(e) {
      return this.state.forEach(function (t) {
        if (t.id == e) return t;
      }), -1;
    };

    I.prototype.getInputById = function getInputById(e) {
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

    I.prototype.getHueIdFromId = function getHueIdFromId(e) {
      return this.state[parseInt(e)].value;
    };

    I.prototype.setLightNamesAndIds = function setLightNamesAndIds(e) {
      var t = "";e.forEach(function (e) {
        t += "<option data-light='" + e.id + "'>" + e.name + "</option>";
      }), this.dropdowns.forEach(function (e) {
        e.innerHTML = t;
      });
    };

    return I;
  }();

  var A = function () {
    function A() {
      _classCallCheck(this, A);

      console.log("%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", ["background: linear-gradient(#D33106, #571402)", "border: 1px solid #3E0E02", "color: white", "display: block", "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)", "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset", "line-height: 40px", "text-align: center", "font-weight: bold"].join(";")), this.log("Enabling the web client for " + window.navigator.userAgent);
    }

    A.prototype.boot = function boot() {
      var e = Cookies.get("volume");Cookies.set("auto-join-call", !1), null != e && this.mediaManager.changeVolume(e);
    };

    return A;
  }();

  var x = function (_A) {
    _inherits(x, _A);

    function x() {
      _classCallCheck(this, x);

      return _possibleConstructorReturn(this, _A.apply(this, arguments));
    }

    x.prototype.log = function log(e) {
      console.log("[OpenAudioMc] " + e);
    };

    x.prototype.getMessages = function getMessages() {
      return this.messages;
    };

    x.prototype.getTimeService = function getTimeService() {
      return this.timeService;
    };

    x.prototype.getHueConfiguration = function getHueConfiguration() {
      return this.hueConfiguration;
    };

    x.prototype.debugPrint = function debugPrint(e) {
      this.log(e);
    };

    x.prototype.getMediaManager = function getMediaManager() {
      return this.mediaManager;
    };

    x.prototype.getHueModule = function getHueModule() {
      return this.hueModule;
    };

    x.prototype.getUserInterfaceModule = function getUserInterfaceModule() {
      return this.userInterfaceModule;
    };

    x.prototype.getVoiceService = function getVoiceService() {
      return this.voiceService;
    };

    return x;
  }(A);

  var C = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };if (C.arrayBuffer) var T = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      _ = ArrayBuffer.isView || function (e) {
    return e && T.indexOf(Object.prototype.toString.call(e)) > -1;
  };function P(e) {
    if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");return e.toLowerCase();
  }function z(e) {
    return "string" != typeof e && (e = String(e)), e;
  }function L(e) {
    var t = { next: function next() {
        var t = e.shift();return { done: void 0 === t, value: t };
      } };return C.iterable && (t[Symbol.iterator] = function () {
      return t;
    }), t;
  }function O(e) {
    this.map = {}, e instanceof O ? e.forEach(function (e, t) {
      this.append(t, e);
    }, this) : Array.isArray(e) ? e.forEach(function (e) {
      this.append(e[0], e[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t]);
    }, this);
  }function R(e) {
    if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));e.bodyUsed = !0;
  }function H(e) {
    return new Promise(function (t, i) {
      e.onload = function () {
        t(e.result);
      }, e.onerror = function () {
        i(e.error);
      };
    });
  }function U(e) {
    var t = new FileReader(),
        i = H(t);return t.readAsArrayBuffer(e), i;
  }function F(e) {
    if (e.slice) return e.slice(0);var t = new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)), t.buffer;
  }function N() {
    return this.bodyUsed = !1, this._initBody = function (e) {
      this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : C.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : C.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : C.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : C.arrayBuffer && C.blob && function (e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }(e) ? (this._bodyArrayBuffer = F(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : C.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || _(e)) ? this._bodyArrayBuffer = F(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : C.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, C.blob && (this.blob = function () {
      var e = R(this);if (e) return e;if (this._bodyBlob) return Promise.resolve(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));if (this._bodyFormData) throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]));
    }, this.arrayBuffer = function () {
      return this._bodyArrayBuffer ? R(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(U);
    }), this.text = function () {
      var e = R(this);if (e) return e;if (this._bodyBlob) return function (e) {
        var t = new FileReader(),
            i = H(t);return t.readAsText(e), i;
      }(this._bodyBlob);if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
        for (var t = new Uint8Array(e), i = new Array(t.length), n = 0; n < t.length; n++) {
          i[n] = String.fromCharCode(t[n]);
        }return i.join("");
      }(this._bodyArrayBuffer));if (this._bodyFormData) throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText);
    }, C.formData && (this.formData = function () {
      return this.text().then(W);
    }), this.json = function () {
      return this.text().then(JSON.parse);
    }, this;
  }O.prototype.append = function (e, t) {
    e = P(e), t = z(t);var i = this.map[e];this.map[e] = i ? i + ", " + t : t;
  }, O.prototype.delete = function (e) {
    delete this.map[P(e)];
  }, O.prototype.get = function (e) {
    return e = P(e), this.has(e) ? this.map[e] : null;
  }, O.prototype.has = function (e) {
    return this.map.hasOwnProperty(P(e));
  }, O.prototype.set = function (e, t) {
    this.map[P(e)] = z(t);
  }, O.prototype.forEach = function (e, t) {
    for (var i in this.map) {
      this.map.hasOwnProperty(i) && e.call(t, this.map[i], i, this);
    }
  }, O.prototype.keys = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push(i);
    }), L(e);
  }, O.prototype.values = function () {
    var e = [];return this.forEach(function (t) {
      e.push(t);
    }), L(e);
  }, O.prototype.entries = function () {
    var e = [];return this.forEach(function (t, i) {
      e.push([i, t]);
    }), L(e);
  }, C.iterable && (O.prototype[Symbol.iterator] = O.prototype.entries);var D = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];function V(e, t) {
    var i = (t = t || {}).body;if (e instanceof V) {
      if (e.bodyUsed) throw new TypeError("Already read");this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new O(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0);
    } else this.url = String(e);if (this.credentials = t.credentials || this.credentials || !t.headers && this.headers || (this.headers = new O(t.headers)), this.method = function (e) {
      var t = e.toUpperCase();return D.indexOf(t) > -1 ? t : e;
    }(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i);
  }function W(e) {
    var t = new FormData();return e.trim().split("&").forEach(function (e) {
      if (e) {
        var i = e.split("="),
            n = i.shift().replace(/\+/g, " "),
            o = i.join("=").replace(/\+/g, " ");t.append(decodeURIComponent(n), decodeURIComponent(o));
      }
    }), t;
  }function j(e) {
    var t = new O();return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
      var i = e.split(":"),
          n = i.shift().trim();if (n) {
        var o = i.join(":").trim();t.append(n, o);
      }
    }), t;
  }function q(e, t) {
    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new O(t.headers), this.url = t.url || "", this._initBody(e);
  }V.prototype.clone = function () {
    return new V(this, { body: this._bodyInit });
  }, N.call(V.prototype), N.call(q.prototype), q.prototype.clone = function () {
    return new q(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new O(this.headers), url: this.url });
  }, q.error = function () {
    var e = new q(null, { status: 0, statusText: "" });return e.type = "error", e;
  };var $ = [301, 302, 303, 307, 308];q.redirect = function (e, t) {
    if (-1 === $.indexOf(t)) throw new RangeError("Invalid status code");return new q(null, { status: t, headers: { location: e } });
  };var G = self.DOMException;try {
    new G();
  } catch (e) {
    (G = function G(e, t) {
      this.message = e, this.name = t;var i = Error(e);this.stack = i.stack;
    }).prototype = Object.create(Error.prototype), G.prototype.constructor = G;
  }function J(e, t) {
    return new Promise(function (i, n) {
      var o = new V(e, t);if (o.signal && o.signal.aborted) return n(new G("Aborted", "AbortError"));var s = new XMLHttpRequest();function r() {
        s.abort();
      }s.onload = function () {
        var e = { status: s.status, statusText: s.statusText, headers: j(s.getAllResponseHeaders() || "") };e.url = "responseURL" in s ? s.responseURL : e.headers.get("X-Request-URL");var t = "response" in s ? s.response : s.responseText;i(new q(t, e));
      }, s.onerror = function () {
        n(new TypeError("Network request failed"));
      }, s.ontimeout = function () {
        n(new TypeError("Network request failed"));
      }, s.onabort = function () {
        n(new G("Aborted", "AbortError"));
      }, s.open(o.method, o.url, !0), "include" === o.credentials ? s.withCredentials = !0 : "omit" === o.credentials && (s.withCredentials = !1), "responseType" in s && C.blob && (s.responseType = "blob"), o.headers.forEach(function (e, t) {
        s.setRequestHeader(t, e);
      }), o.signal && (o.signal.addEventListener("abort", r), s.onreadystatechange = function () {
        4 === s.readyState && o.signal.removeEventListener("abort", r);
      }), s.send(void 0 === o._bodyInit ? null : o._bodyInit);
    });
  }J.polyfill = !0, self.fetch || (self.fetch = J, self.Headers = O, self.Request = V, self.Response = q);
  var K = function () {
    function K(e) {
      _classCallCheck(this, K);

      this.host = e;
    }

    K.prototype.route = function route(e) {
      var _this19 = this;

      return new Promise(function (t, i) {
        _this19.tokenSet = new k().fromUrl(window.location.href), J(_this19.host + "/api/v1/client/login/" + _this19.tokenSet.publicServerKey).then(function (n) {
          n.json().then(function (n) {
            if (null == n.errors || 0 != n.errors.length) return i(n.errors), void console.log(n.errors);var o = n.response,
                s = o.secureEndpoint;null == s && (s = o.insecureEndpoint), console.log("accepting and applying settings"), e.debugPrint("Updating settings...");var r = o.backgroundImage,
                a = o.title,
                l = o.clientWelcomeMessage,
                h = o.clientErrorMessage;var d = "";w(h).childNodes.forEach(function (e) {
              d += e.outerHTML;
            });var c = "";w(l).childNodes.forEach(function (e) {
              c += e.outerHTML;
            }), "" !== h && (e.getMessages().errorMessage = d), "" !== l && (e.getMessages().welcomeMessage = c);var m = o.greetingMessage;if (m = m.replace("%name", e.tokenSet.name), document.getElementById("welcome-text-landing").innerHTML = m, document.getElementById("boot-button").style.display = "", document.getElementById("boot-button").innerHTML = o.connectButtonText, e.getUserInterfaceModule().changeColor("#304FFE", o.accentColor), "" != o.startSound) {
              var _t9 = new u("startsound"),
                  _i5 = new S(o.startSound);_i5.openAudioMc = e, _i5.setOa(e), _i5.finalize().then(function (n) {
                e.getMediaManager().mixer.addChannel(_t9), _t9.addSound(_i5), _t9.setChannelVolume(100), _t9.updateFromMasterVolume(), _i5.finish();
              });
            }"default" !== a && (document.title = a), t({ host: s, background: r });
          }).catch(function (e) {
            console.log("Dead end 1"), i(e);
          });
        }).catch(function (e) {
          console.log("Dead end 2"), i(e);
        });
      });
    };

    return K;
  }();

  var Z = function (_m) {
    _inherits(Z, _m);

    function Z(e, t, i) {
      var _this20;

      _classCallCheck(this, Z);

      (_this20 = _possibleConstructorReturn(this, _m.call(this, "#call-members", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 })), _this20), _this20.room = e, _this20.username = t, _this20.isMuted = !1, _this20.member = i;var n = '<img class="call-box" src="https://minotar.net/avatar/' + t + '" />';n += '<div class="call-content" id="user-box-content-' + t + '">', n += '<div style="text-align: center;"><p>(loading)</p></div>', n += "</div>", _this20.show(n, !0), _this20.setUsernameAsContent(), document.getElementById("user-box-content-" + _this20.username).onmouseenter = function () {
        _this20.setStateAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onmouseout = function () {
        _this20.setUsernameAsContent();
      }, document.getElementById("user-box-content-" + _this20.username).onclick = function () {
        _this20.room.main.tokenSet.name !== _this20.username && _this20.onClickHandler();
      };return _this20;
    }

    Z.prototype.onClickHandler = function onClickHandler() {
      this.isMuted ? (document.getElementById("user-box-content-" + this.username).classList.remove("mutedUser"), this.member.unmuteReceiver()) : (document.getElementById("user-box-content-" + this.username).classList.add("mutedUser"), this.member.muteReceiver()), this.isMuted = !this.isMuted, this.setStateAsContent();
    };

    Z.prototype.setStateAsContent = function setStateAsContent() {
      this.room.main.tokenSet.name !== this.username && (this.isMuted ? document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>' : document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>');
    };

    Z.prototype.setUsernameAsContent = function setUsernameAsContent() {
      document.getElementById("user-box-content-" + this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + "</p></div>";
    };

    return Z;
  }(m);

  function Q(e, t, i, n, o) {
    this.fromSampleRate = e, this.toSampleRate = t, this.channels = 0 | i, this.outputBufferSize = n, this.noReturn = !!o, this.initialize();
  }function Y(e, t, i, n, o, s) {
    this.audioChannels = 2 == e ? 2 : 1, de = 1 == this.audioChannels, he = t > 0 && t <= 16777215 ? t : 44100, ae = i >= te << 1 && i < n ? i & (de ? 4294967295 : 4294967294) : te << 1, le = Math.floor(n) > ae + this.audioChannels ? n & (de ? 4294967295 : 4294967294) : i << 1, this.underRunCallback = "function" == typeof o ? o : function () {}, ce = s >= -1 && s <= 1 && 0 != s ? s : 0, this.audioType = -1, this.mozAudioTail = [], this.audioHandleMoz = null, this.audioHandleFlash = null, this.flashInitialized = !1, this.mozAudioFound = !1, this.initializeAudio();
  }function X(e) {
    try {
      var t = new Float32Array(e);
    } catch (i) {
      t = new Array(e);
    }for (var i = 0; i < e; ++i) {
      t[i] = ce * (i / e);
    }return t;
  }function ee(e) {
    try {
      var t = new Float32Array(e);
    } catch (n) {
      t = new Array(e);var i = 0;do {
        t[i] = 0;
      } while (++i < e);
    }return t;
  }Q.prototype.initialize = function () {
    if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, this.lastWeight = 0, this.initializeBuffers());
  }, Q.prototype.compileInterpolationFunction = function () {
    for (var e = "var bufferLength = Math.min(buffer.length, this.outputBufferSize);\tif ((bufferLength % " + this.channels + ") == 0) {\t\tif (bufferLength > 0) {\t\t\tvar ratioWeight = this.ratioWeight;\t\t\tvar weight = 0;", t = 0; t < this.channels; ++t) {
      e += "var output" + t + " = 0;";
    }for (e += "var actualPosition = 0;\t\t\tvar amountToNext = 0;\t\t\tvar alreadyProcessedTail = !this.tailExists;\t\t\tthis.tailExists = false;\t\t\tvar outputBuffer = this.outputBuffer;\t\t\tvar outputOffset = 0;\t\t\tvar currentPosition = 0;\t\t\tdo {\t\t\t\tif (alreadyProcessedTail) {\t\t\t\t\tweight = ratioWeight;", t = 0; t < this.channels; ++t) {
      e += "output" + t + " = 0;";
    }for (e += "}\t\t\t\telse {\t\t\t\t\tweight = this.lastWeight;", t = 0; t < this.channels; ++t) {
      e += "output" + t + " = this.lastOutput[" + t + "];";
    }for (e += "alreadyProcessedTail = true;\t\t\t\t}\t\t\t\twhile (weight > 0 && actualPosition < bufferLength) {\t\t\t\t\tamountToNext = 1 + actualPosition - currentPosition;\t\t\t\t\tif (weight >= amountToNext) {", t = 0; t < this.channels; ++t) {
      e += "output" + t + " += buffer[actualPosition++] * amountToNext;";
    }for (e += "currentPosition = actualPosition;\t\t\t\t\t\tweight -= amountToNext;\t\t\t\t\t}\t\t\t\t\telse {", t = 0; t < this.channels; ++t) {
      e += "output" + t + " += buffer[actualPosition" + (t > 0 ? " + " + t : "") + "] * weight;";
    }for (e += "currentPosition += weight;\t\t\t\t\t\tweight = 0;\t\t\t\t\t\tbreak;\t\t\t\t\t}\t\t\t\t}\t\t\t\tif (weight == 0) {", t = 0; t < this.channels; ++t) {
      e += "outputBuffer[outputOffset++] = output" + t + " / ratioWeight;";
    }for (e += "}\t\t\t\telse {\t\t\t\t\tthis.lastWeight = weight;", t = 0; t < this.channels; ++t) {
      e += "this.lastOutput[" + t + "] = output" + t + ";";
    }e += 'this.tailExists = true;\t\t\t\t\tbreak;\t\t\t\t}\t\t\t} while (actualPosition < bufferLength);\t\t\treturn this.bufferSlice(outputOffset);\t\t}\t\telse {\t\t\treturn (this.noReturn) ? 0 : [];\t\t}\t}\telse {\t\tthrow(new Error("Buffer was of incorrect sample length."));\t}', this.interpolate = Function("buffer", e);
  }, Q.prototype.bypassResampler = function (e) {
    return this.noReturn ? (this.outputBuffer = e, e.length) : e;
  }, Q.prototype.bufferSlice = function (e) {
    if (this.noReturn) return e;try {
      return this.outputBuffer.subarray(0, e);
    } catch (t) {
      try {
        return this.outputBuffer.length = e, this.outputBuffer;
      } catch (t) {
        return this.outputBuffer.slice(0, e);
      }
    }
  }, Q.prototype.initializeBuffers = function (e) {
    try {
      this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
    } catch (e) {
      this.outputBuffer = [], this.lastOutput = [];
    }
  }, Y.prototype.MOZWriteAudio = function (e) {
    this.MOZWriteAudioNoCallback(e), this.MOZExecuteCallback();
  }, Y.prototype.MOZWriteAudioNoCallback = function (e) {
    this.writeMozAudio(e);
  }, Y.prototype.callbackBasedWriteAudio = function (e) {
    this.callbackBasedWriteAudioNoCallback(e), this.callbackBasedExecuteCallback();
  }, Y.prototype.callbackBasedWriteAudioNoCallback = function (e) {
    if (e) for (var t = e.length, i = 0; i < t && fe < le;) {
      se[fe++] = e[i++];
    }
  }, Y.prototype.writeAudio = function (e) {
    0 == this.audioType ? this.MOZWriteAudio(e) : 1 == this.audioType ? this.callbackBasedWriteAudio(e) : 2 == this.audioType && (this.checkFlashInit() || oe ? this.callbackBasedWriteAudio(e) : this.mozAudioFound && this.MOZWriteAudio(e));
  }, Y.prototype.writeAudioNoCallback = function (e) {
    0 == this.audioType ? this.MOZWriteAudioNoCallback(e) : 1 == this.audioType ? this.callbackBasedWriteAudioNoCallback(e) : 2 == this.audioType && (this.checkFlashInit() || oe ? this.callbackBasedWriteAudioNoCallback(e) : this.mozAudioFound && this.MOZWriteAudioNoCallback(e));
  }, Y.prototype.remainingBuffer = function () {
    if (0 == this.audioType) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();if (1 == this.audioType) return (be() * me.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + fe;if (2 == this.audioType) {
      if (this.checkFlashInit() || oe) return (be() * me.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + fe;if (this.mozAudioFound) return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    }return 0;
  }, Y.prototype.MOZExecuteCallback = function () {
    var e = ae - this.remainingBuffer();e > 0 && this.writeMozAudio(this.underRunCallback(e));
  }, Y.prototype.callbackBasedExecuteCallback = function () {
    var e = ae - this.remainingBuffer();e > 0 && this.callbackBasedWriteAudioNoCallback(this.underRunCallback(e));
  }, Y.prototype.executeCallback = function () {
    0 == this.audioType ? this.MOZExecuteCallback() : 1 == this.audioType ? this.callbackBasedExecuteCallback() : 2 == this.audioType && (this.checkFlashInit() || oe ? this.callbackBasedExecuteCallback() : this.mozAudioFound && this.MOZExecuteCallback());
  }, Y.prototype.initializeAudio = function () {
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
  }, Y.prototype.preInitializeMozAudio = function () {
    this.audioHandleMoz = new Audio(), this.audioHandleMoz.mozSetup(this.audioChannels, he), this.samplesAlreadyWritten = 0;var e = 2 == this.audioChannels ? [0, 0] : [0],
        t = 0;if ("MacIntel" != navigator.platform && "MacPPC" != navigator.platform) {
      for (; 0 == this.audioHandleMoz.mozCurrentSampleOffset();) {
        t += this.audioHandleMoz.mozWriteAudio(e);
      }for (var i = t / this.audioChannels, n = 0; n < i; n++) {
        this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(e);
      }
    }this.samplesAlreadyWritten += t, ae += this.samplesAlreadyWritten, this.mozAudioFound = !0;
  }, Y.prototype.initializeMozAudio = function () {
    this.writeMozAudio(X(ae)), this.audioType = 0;
  }, Y.prototype.initializeWebAudio = function () {
    if (!oe) throw new Error("");we(ue, te), this.audioType = 1;
  }, Y.prototype.initializeFlashAudio = function () {
    var e = document.getElementById("XAudioJS");if (null == e) {
      var t = this,
          i = document.createElement("div");i.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");var n = document.createElement("div");n.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;"), n.setAttribute("id", "XAudioJS"), i.appendChild(n), document.getElementsByTagName("body")[0].appendChild(i), swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, { allowscriptaccess: "always" }, { style: "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none" }, function (e) {
        e.success ? t.audioHandleFlash = e.ref : t.audioType = 1;
      });
    } else this.audioHandleFlash = e;this.audioType = 2;
  }, Y.prototype.writeMozAudio = function (e) {
    if (e) {
      var t = this.mozAudioTail.length;if (t > 0) {
        var i = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);this.samplesAlreadyWritten += i, this.mozAudioTail.splice(0, i);
      }t = Math.min(e.length, le - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());i = this.audioHandleMoz.mozWriteAudio(e);this.samplesAlreadyWritten += i;for (var n = 0; t > i; --t) {
        this.mozAudioTail.push(e[n++]);
      }
    }
  }, Y.prototype.checkFlashInit = function () {
    return !this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize && (this.flashInitialized = !0, this.audioHandleFlash.initialize(this.audioChannels, ce), we(44100, te)), this.flashInitialized;
  };var te = 2048;function ie() {
    for (var e = "", t = "", i = 0; i < te && pe != ge; ++i) {
      e += String.fromCharCode(12288 + (16383 * Math.min(Math.max(re[pe++] + 1, 0), 2) | 0)), t += String.fromCharCode(12288 + (16383 * Math.min(Math.max(re[pe++] + 1, 0), 2) | 0)), pe == ye && (pe = 0);
    }return e + t;
  }function ne() {
    for (var e = "", t = 0; t < te && pe != ge; ++t) {
      e += String.fromCharCode(12288 + (16383 * Math.min(Math.max(re[pe++] + 1, 0), 2) | 0)), pe == ye && (pe = 0);
    }return e;
  }var oe = !1,
      se = [],
      re = [],
      ae = 15e3,
      le = 25e3,
      ue = 44100,
      he = 0,
      de = !1,
      ce = 0,
      me = null,
      fe = 0,
      pe = 0,
      ge = 0,
      ye = 2;function be() {
    return (pe <= ge ? 0 : ye) + ge - pe;
  }function we(e, t) {
    se = X(le), fe = le, pe = 0, ge = 0, ye = Math.max(le * Math.ceil(he / e), te) << 1, de ? (re = ee(ye), me = new Q(he, e, 1, ye, !0), ne) : (re = ee(ye <<= 1), me = new Q(he, e, 2, ye, !0), ie);
  }var ve,
      Me,
      ke = Q;!function (e) {
    e[e.VoIP = 2048] = "VoIP", e[e.Audio = 2049] = "Audio", e[e.RestrictedLowDelay = 2051] = "RestrictedLowDelay";
  }(ve || (ve = {})), function (e) {
    e[e.OK = 0] = "OK", e[e.BadArgument = -1] = "BadArgument", e[e.BufferTooSmall = -2] = "BufferTooSmall", e[e.InternalError = -3] = "InternalError", e[e.InvalidPacket = -4] = "InvalidPacket", e[e.Unimplemented = -5] = "Unimplemented", e[e.InvalidState = -6] = "InvalidState", e[e.AllocFail = -7] = "AllocFail";
  }(Me || (Me = {}));var Ee = function () {
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
      Se = function () {
    function e(e, t, i, n) {
      if (void 0 === n && (n = 20), this.handle = 0, this.frame_size = 0, this.in_ptr = 0, this.in_off = 0, this.out_ptr = 0, !Ee.validFrameDuration(n)) throw "invalid frame duration";this.frame_size = e * n / 1e3;var o = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_encoder_create(e, t, i, o), 0 != getValue(o, "i32")) throw "opus_encoder_create failed: " + getValue(o, "i32");this.in_ptr = _malloc(this.frame_size * t * 4), this.in_len = this.frame_size * t, this.in_i16 = HEAP16.subarray(this.in_ptr >> 1, (this.in_ptr >> 1) + this.in_len), this.in_f32 = HEAPF32.subarray(this.in_ptr >> 2, (this.in_ptr >> 2) + this.in_len), this.out_bytes = Ee.getMaxFrameSize(), this.out_ptr = _malloc(this.out_bytes), this.out_buf = HEAPU8.subarray(this.out_ptr, this.out_ptr + this.out_bytes);
    }return e.prototype.encode = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        this.in_off > 0 ? (this.in_i16.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_i16.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (n <= 0) throw "opus_encode failed: " + n;var o = new ArrayBuffer(n);new Uint8Array(o).set(this.out_buf.subarray(0, n)), t.push(o);
      }return i < e.length && (this.in_i16.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_float = function (e) {
      for (var t = [], i = 0; e.length - i >= this.in_len - this.in_off;) {
        this.in_off > 0 ? (this.in_f32.set(e.subarray(i, i + this.in_len - this.in_off), this.in_off), i += this.in_len - this.in_off, this.in_off = 0) : (this.in_f32.set(e.subarray(i, i + this.in_len)), i += this.in_len);var n = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (n <= 0) throw "opus_encode failed: " + n;var o = new ArrayBuffer(n);new Uint8Array(o).set(this.out_buf.subarray(0, n)), t.push(o);
      }return i < e.length && (this.in_f32.set(e.subarray(i)), this.in_off = e.length - i), t;
    }, e.prototype.encode_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var e = this.in_off; e < this.in_len; ++e) {
        this.in_i16[e] = 0;
      }var t = _opus_encode(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (t <= 0) throw "opus_encode failed: " + t;var i = new ArrayBuffer(t);return new Uint8Array(i).set(this.out_buf.subarray(0, t)), i;
    }, e.prototype.encode_float_final = function () {
      if (0 == this.in_off) return new ArrayBuffer(0);for (var e = this.in_off; e < this.in_len; ++e) {
        this.in_f32[e] = 0;
      }var t = _opus_encode_float(this.handle, this.in_ptr, this.frame_size, this.out_ptr, this.out_bytes);if (t <= 0) throw "opus_encode failed: " + t;var i = new ArrayBuffer(t);return new Uint8Array(i).set(this.out_buf.subarray(0, t)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_encoder_destroy(this.handle), _free(this.in_ptr), this.handle = this.in_ptr = 0);
    }, e;
  }(),
      Be = function () {
    function e(e, t) {
      this.handle = 0, this.in_ptr = 0, this.out_ptr = 0, this.channels = t;var i = allocate(4, "i32", ALLOC_STACK);if (this.handle = _opus_decoder_create(e, t, i), 0 != getValue(i, "i32")) throw "opus_decoder_create failed: " + getValue(i, "i32");this.in_ptr = _malloc(Ee.getMaxFrameSize(t)), this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Ee.getMaxFrameSize(t)), this.out_len = Ee.getMaxSamplesPerChannel(e);var n = this.out_len * t * 4;this.out_ptr = _malloc(n), this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, this.out_ptr + n >> 1), this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, this.out_ptr + n >> 2);
    }return e.prototype.decode = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (t < 0) throw "opus_decode failed: " + t;var i = new Int16Array(t * this.channels);return i.set(this.out_i16.subarray(0, i.length)), i;
    }, e.prototype.decode_float = function (e) {
      this.in_buf.set(new Uint8Array(e));var t = _opus_decode_float(this.handle, this.in_ptr, e.byteLength, this.out_ptr, this.out_len, 0);if (t < 0) throw "opus_decode failed: " + t;var i = new Float32Array(t * this.channels);return i.set(this.out_f32.subarray(0, i.length)), i;
    }, e.prototype.destroy = function () {
      this.handle && (_opus_decoder_destroy(this.handle), _free(this.in_ptr), _free(this.out_ptr), this.handle = this.in_ptr = this.out_ptr = 0);
    }, e;
  }();var Ie = null;
  var Ae = function Ae() {
    _classCallCheck(this, Ae);

    this.defaultConfig = { codec: { sampleRate: 24e3, channels: 1, app: 2048, frameDuration: 20, bufferSize: 2048 } }, this.audioContext = Ie;
  };

  var xe = function (_Ae) {
    _inherits(xe, _Ae);

    function xe() {
      var _this21;

      _classCallCheck(this, xe);

      (_this21 = _possibleConstructorReturn(this, _Ae.call(this)), _this21), _this21.queueSize = 5120, _this21.unstableSeconds = 0, _this21.stableSeconds = 0, _this21.minimalQueueSize = _this21.queueSize;_this21.defaultConfig.codec.sampleRate, _this21.defaultConfig.codec.bufferSize;_this21.perfectRate = 50, _this21.lowestAcceptable = _this21.perfectRate - 5, _this21.highestAcceptable = _this21.perfectRate + 5;return _this21;
    }

    xe.prototype.isAcceptable = function isAcceptable(e) {
      return e >= this.lowestAcceptable && e <= this.highestAcceptable;
    };

    xe.prototype.handleMeasurement = function handleMeasurement(e) {
      this.isAcceptable(e) ? (this.unstableSeconds = 0, this.stableSeconds >= 5 && (this.decreaseBufferSize(), this.stableSeconds = 3), this.stableSeconds++) : (this.stableSeconds = 0, this.unstableSeconds >= 5 && this.increaseBufferSize(), this.unstableSeconds++);
    };

    xe.prototype.increaseBufferSize = function increaseBufferSize() {
      this.queueSize < 10240 && (this.queueSize += 512, console.log("Buffer size increased and is now " + this.queueSize));
    };

    xe.prototype.decreaseBufferSize = function decreaseBufferSize() {
      this.queueSize > this.minimalQueueSize && (this.queueSize -= 512, console.log("Buffer size decreased and is now " + this.queueSize));
    };

    xe.prototype.getBufferSize = function getBufferSize() {
      return this.queueSize;
    };

    return xe;
  }(Ae);

  var Ce = function () {
    function Ce(e) {
      var _this22 = this;

      _classCallCheck(this, Ce);

      this.ticks = 0, this.task = setInterval(function () {
        e(_this22.ticks), _this22.ticks = 0;
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

  var Te = function () {
    function Te() {
      var _this23 = this;

      _classCallCheck(this, Te);

      this.buffer = new Float32Array(0), this.processor = new xe(), this.tickTimer = new Ce(function (e) {
        _this23.processor.handleMeasurement(e);
      });
    }

    Te.prototype.tick = function tick() {
      this.tickTimer.tick();
    };

    Te.prototype.write = function write(e, t) {
      this.length() > this.processor.getBufferSize() && (console.log("Too much delay. Clearing buffer"), this.buffer = new Float32Array(0));var i = this.buffer.length;t = e.sampler.resampler(t);var n = new Float32Array(i + t.length);n.set(this.buffer, 0), n.set(t, i), this.buffer = n;
    };

    Te.prototype.read = function read(e) {
      var t = this.buffer.subarray(0, e);return this.buffer = this.buffer.subarray(e, this.buffer.length), t;
    };

    Te.prototype.length = function length() {
      return this.buffer.length;
    };

    Te.prototype.stop = function stop() {
      this.tickTimer.stop();
    };

    return Te;
  }();

  var _e = function (_Ae2) {
    _inherits(_e, _Ae2);

    function _e(e, t) {
      var _this24;

      _classCallCheck(this, _e);

      (_this24 = _possibleConstructorReturn(this, _Ae2.call(this)), _this24), _this24.config = _this24.defaultConfig, _this24.config.codec = _this24.config.codec || _this24.defaultConfig.codec, _this24.config.server = _this24.config.server || _this24.defaultConfig.server, _this24.sampler = new ke(_this24.config.codec.sampleRate, _this24.audioContext.sampleRate, 1, _this24.config.codec.bufferSize), _this24.parentSocket = t, _this24.decoder = new Be(_this24.config.codec.sampleRate, _this24.config.codec.channels), _this24.silence = new Float32Array(_this24.config.codec.bufferSize);return _this24;
    }

    _e.prototype.start = function start() {
      var _this25 = this;

      this.audioQueue = new Te(), this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1), this.scriptNode.onaudioprocess = function (e) {
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

    _e.prototype.getVolume = function getVolume() {
      return this.gainNode ? this.gainNode.gain.value : "Stream not started yet";
    };

    _e.prototype.setVolume = function setVolume(e) {
      this.gainNode && (this.gainNode.gain.value = e);
    };

    _e.prototype.stop = function stop() {
      this.audioQueue.stop(), this.audioQueue = null, this.scriptNode.disconnect(), this.scriptNode = null, this.gainNode.disconnect(), this.gainNode = null, clearInterval(this.socketKeepAliveTimer), this.parentSocket ? this.socket.onmessage = this.parentOnmessage : this.socket.close();
    };

    return _e;
  }(Ae);

  var Pe = function () {
    function Pe(e, t) {
      _classCallCheck(this, Pe);

      this.room = e, this.roomMember = t, this.isStopped = !1, this.player = new _e({}, new WebSocket(this.room.voiceServer.ws + "/listener?room=" + this.room.roomId + "&uuid=" + this.room.currentUser.uuid + "&target=" + this.roomMember.uuid + "&accessToken=" + this.room.accessToken)), this.player.start(), this.setVolume(this.room.main.getMediaManager().masterVolume);
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

    null == navigator.getUserMedia ? null == navigator.webkitGetUserMedia ? null == navigator.mediaDevices.getUserMedia ? null == navigator.msGetUserMedia ? console.error("Unknown user media platform!") : nnavigator.msGetUserMedia(e, t, i) : navigator.mediaDevices.getUserMedia(e).then(function (e) {
      return t(e);
    }).catch(function (e) {
      return i(e);
    }) : navigator.webkitGetUserMedia(e, t, i) : navigator.getUserMedia(e, t, i);
  };

  var Le = function (_m2) {
    _inherits(Le, _m2);

    function Le(e) {
      _classCallCheck(this, Le);

      var _this26 = _possibleConstructorReturn(this, _m2.call(this, "#alert-area", { closeTime: 6e4, persistent: !0, hideCloseButton: !0 }));

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
        if (i) _this26.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br /><a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> </div>'), document.getElementById("request-mic-permissions").onclick = function () {
          new ze({ audio: !0 }, function (t) {
            _this26.hide(), t.getTracks()[0].stop(), new Le(e);
          }, function (t) {
            console.log(t), _this26.hide(), _this26.deniedMessage(), e(null);
          });
        };else {
          null != _this26.requestBox && _this26.requestBox.hide();var _i6 = '<select id="select-mic-dropdown" class="alert-message-button">';var _iteratorNormalCompletion19 = true;
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

          if (_i6 += "</select>", _this26.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?<br /><small>changes can take a second or two to apply</small><br />' + _i6 + '<div id="mic-loader" style="display:none;"><h2>Switching mic input. Please wait.</h2><div class="loader"></div></div></div>'), null != Cookies.get("default-mic")) {
            var _e19 = document.getElementById("select-mic-dropdown");for (var _t10 = 0; _t10 < _e19.options.length; _t10++) {
              _e19.options[_t10].innerText === Cookies.get("default-mic") && (_e19.options[_t10].selected = !0);
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

    Le.prototype.getId = function getId() {
      var e = document.getElementById("select-mic-dropdown");for (var t = 0; t < e.options.length; t++) {
        if (e.options[t].innerText == Cookies.get("default-mic")) return e.options[t].value;
      }return "default";
    };

    Le.prototype.deniedMessage = function deniedMessage() {
      this.requestBox = new m("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    };

    return Le;
  }(m);

  var Oe = function (_Ae3) {
    _inherits(Oe, _Ae3);

    function Oe(e, t) {
      var _this27;

      _classCallCheck(this, Oe);

      (_this27 = _possibleConstructorReturn(this, _Ae3.call(this)), _this27), _this27.config = e, _this27.config.codec = _this27.config.codec || _this27.defaultConfig.codec, _this27.sampler = new ke(_this27.audioContext.sampleRate, _this27.config.codec.sampleRate, 1, _this27.config.codec.bufferSize), _this27.parentSocket = t, _this27.encoder = new Se(_this27.config.codec.sampleRate, _this27.config.codec.channels, _this27.config.codec.app, _this27.config.codec.frameDuration);return _this27;
    }

    Oe.prototype._makeStream = function _makeStream(e) {
      var _this28 = this;

      new ze({ audio: this.config.micId }, function (e) {
        _this28.stream = e, _this28.audioInput = _this28.audioContext.createMediaStreamSource(e), _this28.gainNode = _this28.audioContext.createGain(), _this28.recorder = _this28.audioContext.createScriptProcessor(_this28.config.codec.bufferSize, 1, 1), _this28.recorder.onaudioprocess = function (e) {
          var t = _this28.sampler.resampler(e.inputBuffer.getChannelData(0)),
              i = _this28.encoder.encode_float(t);for (var _e21 = 0; _e21 < i.length; _e21++) {
            1 === _this28.socket.readyState && _this28.socket.send(i[_e21]);
          }
        }, _this28.audioInput.connect(_this28.gainNode), _this28.gainNode.connect(_this28.recorder), _this28.recorder.connect(_this28.audioContext.destination);
      }, e || this.onError);
    };

    Oe.prototype.start = function start(e) {
      var _this29 = this;

      if (this.socket = this.parentSocket, this.socket.binaryType = "arraybuffer", this.socket.readyState === WebSocket.OPEN) this._makeStream(e);else if (this.socket.readyState === WebSocket.CONNECTING) {
        var t = this.socket.onopen;this.socket.onopen = function () {
          t && t(), _this29._makeStream(e);
        };
      } else console.error("Socket is in CLOSED state");this.socket.onclose = function () {
        onclose && onclose(), _this29._shutdown(), console.log("Disconnected from server");
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
  }(Ae);

  var Re = function () {
    function Re(e) {
      var _this30 = this;

      _classCallCheck(this, Re);

      this.room = e, this.isRunning = !1, this.streamer = null, this.micId = !0, this.isMuted = !1, this.changeMicPopup = new Le(function (e) {
        _this30.shutdown(), setTimeout(function () {
          _this30.micId = null == e || e, _this30.start();
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

      this.room = e, this.uuid = t, this.name = i, this.voiceReceiver = null, this.voiceBroadcast = null, this.card = new Z(e, i, this), this.volume = e.main.mediaManager.getMasterVolume();
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
      var _this31 = this;

      _classCallCheck(this, Ue);

      this.main = e, this.voiceServer = t, this.roomId = i, this.accessToken = o, this.roomMembers = new Map(), this.currentUser = n, this.isUnsubscribing = !1, new m("#call-members", { closeTime: 500, persistent: !1, hideCloseButton: !0 }).show("Loading call.."), document.getElementById("call-control-box").style.display = "", document.getElementById("leave-call-button").onclick = function () {
        _this31.unsubscribe();
      }, this.muteMicButtonElement = document.getElementById("mute-microphone"), this.canToggleMute = !0, this.muteMicButtonElement.onclick = function () {
        _this31.toggleMic();
      }, s.forEach(function (e) {
        _this31.registerMember(e.uuid, e.name);
      });
    }

    Ue.prototype.toggleMic = function toggleMic() {
      var _this32 = this;

      var e = null;this.canToggleMute && (this.muteMicButtonElement.disabled = !0, this.canToggleMute = !1, this.roomMembers.forEach(function (t) {
        null != t.voiceBroadcast && (e = t.voiceBroadcast);
      }), e.isMuted ? (this.muteMicButtonElement.innerText = "Mute Microphone", e.unMute()) : (this.muteMicButtonElement.innerText = "Unmute Microphone", e.mute()), setTimeout(function () {
        _this32.muteMicButtonElement.disabled = !1, _this32.canToggleMute = !0;
      }, 1e3));
    };

    Ue.prototype.unsubscribe = function unsubscribe() {
      var _this33 = this;

      this.isUnsubscribing || (this.isUnsubscribing = !0, new m("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Quitting room, please wait."), J(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken).then(function (e) {
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

    Ue.prototype.resubToPlayer = function resubToPlayer(e) {
      var t = this.roomMembers.get(e);null != t && (null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.connectStream());
    };

    Ue.prototype.handleMemberLeaving = function handleMemberLeaving(e) {
      var t = this.roomMembers.get(e);null != t && (null != t.voiceBroadcast && (t.voiceBroadcast.shutdown(), t.voiceBroadcast.changeMicPopup.hide()), null != t.voiceReceiver && t.voiceReceiver.shutdown(), t.removeCard(), this.roomMembers.delete(e), 1 === this.roomMembers.size && this.unsubscribe());
    };

    Ue.prototype.leaveErrorhandler = function leaveErrorhandler(e) {
      new m("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Something went wrong while leaving your wrong. Please try again in a moment."), this.isUnsubscribing = !1;
    };

    Ue.prototype.errorHandler = function errorHandler(e) {
      new m("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred when loading the voice room."), console.error(e);
    };

    Ue.prototype.registerMember = function registerMember(e, t) {
      var i = new He(this, e, t);this.roomMembers.set(e, i), e != this.currentUser.uuid ? i.connectStream() : i.broadcastStream();
    };

    return Ue;
  }();

  var Fe = function () {
    function Fe(e, t, i, n) {
      var _this34 = this;

      _classCallCheck(this, Fe);

      var o = [];t.forEach(function (t) {
        t != e.tokenSet.name && o.push(t);
      }), e.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");var s = o.join(", ").replace(/,(?=[^,]*$)/, " and");document.getElementById("call-modal-text").innerText = "You have a incoming call with " + s, document.getElementById("call-modal").style.display = "", document.getElementById("modal-overlay").style.display = "", this.ignored = !1, document.getElementById("call-accept-button").onclick = function () {
        _this34.ignored = !0, _this34.hide(_this34), new m("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Starting call."), setTimeout(function () {
          i();
        }, 1e3);
      }, document.getElementById("auto-join-call-or-not").onclick = function () {
        console.log("auto join is set to " + document.getElementById("auto-join-call-or-not").checked), Cookies.set("auto-join-call", document.getElementById("auto-join-call-or-not").checked);
      }, "true" === Cookies.get("auto-join-call") && (this.ignored = !0, document.getElementById("call-accept-button").click());var r = function r() {
        _this34.ignored || (_this34.ignored = !0, _this34.hide(_this34), new m("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Ignored call."), n());
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
      var _this35 = this;

      null == this.room ? new Fe(this.main, n, function () {
        _this35.room = new Ue(_this35.main, e, t, _this35.main.tokenSet, i, o);
      }, function () {
        J(_this35.voiceServer.rest + "/leave-room?room=" + t + "&uuid=" + _this35.currentUser.uuid + "&accessToken=" + i).then(function (e) {
          e.json().then(function (e) {
            0 !== e.results.length ? console.log("cancelled call") : _this35.leaveErrorhandler("denied request");
          }).catch(function (e) {
            _this35.leaveErrorhandler(e);
          });
        }).catch(function (e) {
          _this35.leaveErrorhandler(e);
        });
      }) : new m("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !1, extra: "warning" }).show("You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.");
    };

    Ne.prototype.leaveErrorhandler = function leaveErrorhandler(e) {
      new m("#alert-area", { closeTime: 5e3, persistent: !0, hideCloseButton: !0, extra: "warning" }).show("Failed to cancel call. Please try again in a moment.");
    };

    Ne.prototype.handleSocketClosed = function handleSocketClosed() {
      null != this.room && this.room.unsubscribe();
    };

    Ne.prototype.clearCall = function clearCall() {
      this.room = null;
    };

    Ne.prototype.setVolume = function setVolume(e) {
      null != this.room && this.room.roomMembers.forEach(function (t, i) {
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
      var _this36 = this;

      "granted" !== Notification.permission && "denied" !== Notification.permission && (this.requestBox = new m("#alert-area", { closeTime: 6e4, persistent: !1, hideCloseButton: !0 }), this.requestBox.show('<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'), document.getElementById("noti-perm-request-link").onclick = function () {
        _this36.requestNotificationPermissions();
      });
    };

    De.prototype.sendNotification = function sendNotification(e, t) {
      new Notification(e, { body: t, icon: "https://minotar.net/avatar/" + this.main.tokenSet.name });
    };

    De.prototype.requestNotificationPermissions = function requestNotificationPermissions() {
      var _this37 = this;

      Notification.requestPermission().then(function (e) {
        "granted" === e && (_this37.requestBox.hide(), new m("#alert-area", { closeTime: 1500, persistent: !1, hideCloseButton: !0 }).show("Hurray! you'll now receive notifications"), _this37.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!"));
      });
    };

    return De;
  }();

  var Ve = i(0);i.d(t, "OpenAudioMc", function () {
    return We;
  });
  var We = function (_x3) {
    _inherits(We, _x3);

    function We() {
      var _this38, _ret2;

      _classCallCheck(this, We);

      if ((_this38 = _possibleConstructorReturn(this, _x3.call(this)), _this38), _this38.canStart = !1, _this38.host = null, _this38.background = null, _this38.tokenSet = new k().fromUrl(window.location.href), null == _this38.tokenSet) return _ret2 = void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />"), _possibleConstructorReturn(_this38, _ret2);_this38.notificationModule = new De(_this38), _this38.timeService = new n(), _this38.messages = new o(_this38), _this38.userInterfaceModule = new s(_this38), _this38.hueConfiguration = new I(_this38), _this38.mediaManager = new d(_this38), Ie = new (window.AudioContext || window.webkitAudioContext)(), _this38.voiceModule = new Ne(_this38), _this38.boot(), new K("https://plus.openaudiomc.net/").route(_this38).then(function (e) {
        _this38.canStart = !0, _this38.host = e.host, _this38.background = e.background;
      }).catch(function (e) {
        console.error("Exception thrown", e.stack), _this38.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff."), new m("#alert-area", { closeTime: 2e4, persistent: !1, hideCloseButton: !0, extra: "warning" }).show("A networking error occurred while connecting to the server, please request a new url and try again.");
      });return _possibleConstructorReturn(_this38);
    }

    We.prototype.start = function start() {
      console.log("init"), this.canStart && (this.canStart = !1, this.hueModule = new l(this, Object(Ve.a)()), this.socketModule = new f(this, this.host), this.messages.apply(), new B(this), "" !== this.background && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            url(" + this.background + ");\n    -webkit-background-size: cover;\n    background-size: cover;"));
    };

    return We;
  }(x);

  !function () {
    var e = new k().fromUrl(window.location.href);if (null == e) return document.getElementById("footer-welcome").innerText = "No authentication provided", document.getElementById("boot-button").style.display = "none", void (document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />");document.body.onclick = function () {
      return void (E.canStart && E.start());
    }, null != e && null != e.name && (document.getElementById("sidebar-head").style.background = "linear-gradient(0deg, rgba(42, 38, 95, .8), rgba(42, 38, 95, .4)), url(https://minotar.net/avatar/" + e.name + ")", document.getElementById("footer-welcome").innerText = "Logged in as " + e.name, E = new We());
  }();
}]);
