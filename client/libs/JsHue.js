/**
 * jsHue
 * JavaScript library for Philips Hue.
 *
 * @module jshue
 * @version 2.1.1
 * @author John Peloquin
 * @copyright Copyright 2013 - 2017, John Peloquin and the jsHue contributors.
 */

/**
 * jsHue API class.
 *
 * @class jsHueAPI
 * @constructor
 * @param {Function} fetch fetch dependency
 * @param {Function} Response response dependency
 * @param {Object} JSON JSON dependency
 * @param {Function} Promise promise dependency
 * @return {Object} instance
 */
var jsHueAPI = (fetch, Response, JSON, Promise) => {
    /**
     * Performs fetch request.
     *
     * @method _requestJson
     * @private
     * @param {String} method GET, PUT, POST, or DELETE
     * @param {String} url request URL
     * @param {Object} data request data object to serialize for request JSON
     * @return {Promise} promise resolving to response data object
     */
    var _requestJson = (method, url, data) =>
        (new Promise(resolve => {
            if(data !== null) {
                data = JSON.stringify(data);
            }
            resolve(data);
        }))
            .then(data => fetch(url, {method: method, body: data}))
            .then(response => response.json());

    /**
     * Performs fetch request with JSON (no body).
     *
     * @method _requestJsonUrl
     * @private
     * @param {String} method GET, PUT, POST, or DELETE
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _requestJsonUrl = (method, url) => _requestJson(method, url, null);

    /**
     * Performs fetch GET.
     *
     * @method _get
     * @private
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _get = _requestJsonUrl.bind(null, 'GET');

    /**
     * Performs fetch PUT.
     *
     * @method _put
     * @private
     * @param {String} url request URL
     * @param {Object} data request data object
     * @return {Promise} promise resolving to response data object
     */
    var _put = _requestJson.bind(null, 'PUT');

    /**
     * Performs fetch POST.
     *
     * @method _post
     * @private
     * @param {String} url request URL
     * @param {Object} data request data object
     * @return {Promise} promise resolving to response data object
     */
    var _post = _requestJson.bind(null, 'POST');

    /**
     * Performs fetch DELETE.
     *
     * @method _delete
     * @private
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _delete = _requestJsonUrl.bind(null, 'DELETE');

    /**
     * Creates a parametrized fetch request function.
     *
     * The given request URL generator function should generate a request URL from
     * a single input parameter. For example:
     *
     * (id) => { return `http://path/to/resource/${id}`; }
     *
     * The returned parametrized request function takes this same input parameter
     * plus the remaining parameters of the given request function. For example, a
     * parametrized _get or _delete will have the following signature:
     *
     * (id)
     *
     * A parametrized _put or _post will have the following signature:
     *
     * (id, data)
     *
     * These functions will make appropriate requests to the URLs generated from the
     * first input parameter.
     *
     * @method _parametrize
     * @private
     * @param {Function} method request function (_get, _put, _post, or _delete)
     * @param {Function} url request URL generator function
     * @return {Function} parametrized request function
     */
    var _parametrize = (method, url) => (p, ...rest) => method(url(p), ...rest);

    /**
     * Creates an echo.
     *
     * The returned function acts as a fetch implementation which just echoes back
     * the request. This is used for schedule command and rule action generation.
     *
     * @method _echo
     * @private
     * @param {String} baseUrl base URL to strip out
     * @return {Function} echo fetch implementation
     */
    var _echo = baseUrl => (url, data) => Promise.resolve(new Response(JSON.stringify({
        address: url.slice(baseUrl.length),
        method: data.method,
        body: JSON.parse(data.body)
    })));

    return {
        /* ================================================== */
        /* Portal API                                         */
        /* ================================================== */

        /**
         * Discovers local bridges.
         *
         * @method discover
         * @return {Promise} promise resolving to response data object
         */
        discover: _get.bind(null, 'https://www.meethue.com/api/nupnp'),
        /**
         * Creates bridge object (jsHueBridge).
         *
         * @method bridge
         * @param {String} ip ip address or hostname of bridge
         * @return {Object} bridge object
         */
        bridge: ip => {
            /**
             * @class jsHueBridge
             */
            var _baseUrl = `http://${ip}`,
                _bridgeUrl = `${_baseUrl}/api`;

            return {
                /**
                 * Creates new user in bridge whitelist.
                 *
                 * @method createUser
                 * @param {String} type device type
                 * @return {Promise} promise resolving to response data object
                 */
                createUser: type => _post(_bridgeUrl, { devicetype: type }),
                /**
                 * Creates user object (jsHueUser).
                 *
                 * @method user
                 * @param {String} username username
                 * @return {Object} user object
                 */
                user: username => {
                    openAudioMc.getHueModule().setUserId(username);

                    /**
                     * @class jsHueUser
                     */
                    var _userUrl = `${_bridgeUrl}/${username}`,
                        _capabilitiesUrl = `${_userUrl}/capabilities`,
                        _configUrl = `${_userUrl}/config`,
                        _lightsUrl = `${_userUrl}/lights`,
                        _groupsUrl = `${_userUrl}/groups`,
                        _schedulesUrl = `${_userUrl}/schedules`,
                        _scenesUrl = `${_userUrl}/scenes`,
                        _sensorsUrl = `${_userUrl}/sensors`,
                        _rulesUrl = `${_userUrl}/rules`,
                        _linksUrl = `${_userUrl}/resourcelinks`;

                    var _objectUrl = baseUrl => id => `${baseUrl}/${id}`;

                    var _lightUrl = _objectUrl(_lightsUrl),
                        _groupUrl = _objectUrl(_groupsUrl),
                        _scheduleUrl = _objectUrl(_schedulesUrl),
                        _sceneUrl = _objectUrl(_scenesUrl),
                        _sensorUrl = _objectUrl(_sensorsUrl),
                        _ruleUrl = _objectUrl(_rulesUrl),
                        _linkUrl = _objectUrl(_linksUrl);

                    return {
                        /* ================================================== */
                        /* Capabilities API                                   */
                        /* ================================================== */

                        /**
                         * Gets bridge capabilities.
                         *
                         * @method getCapabilities
                         * @return {Promise} promise resolving to response data object
                         */
                        getCapabilities: _get.bind(null, _capabilitiesUrl),

                        /* ================================================== */
                        /* Configuration API                                  */
                        /* ================================================== */

                        /**
                         * Deletes user from bridge whitelist.
                         *
                         * @method deleteUser
                         * @param {String} username username
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteUser: _parametrize(_delete, username => `${_configUrl}/whitelist/${username}`),
                        /**
                         * Gets bridge configuration.
                         *
                         * @method getConfig
                         * @return {Promise} promise resolving to response data object
                         */
                        getConfig: _get.bind(null, _configUrl),
                        /**
                         * Sets bridge configuration.
                         *
                         * @method setConfig
                         * @param {Object} data config data
                         * @return {Promise} promise resolving to response data object
                         */
                        setConfig: _put.bind(null, _configUrl),
                        /**
                         * Gets bridge full state.
                         *
                         * @method getFullState
                         * @return {Promise} promise resolving to response data object
                         */
                        getFullState: _get.bind(null, _userUrl),

                        /* ================================================== */
                        /* Lights API                                         */
                        /* ================================================== */

                        /**
                         * Gets lights.
                         *
                         * @method getLights
                         * @return {Promise} promise resolving to response data object
                         */
                        getLights: _get.bind(null, _lightsUrl),
                        /**
                         * Gets new lights.
                         *
                         * @method getNewLights
                         * @return {Promise} promise resolving to response data object
                         */
                        getNewLights: _get.bind(null, `${_lightsUrl}/new`),
                        /**
                         * Searches for new lights.
                         *
                         * @method searchForNewLights
                         * @param {Object} data data (optional)
                         * @return {Promise} promise resolving to response data object
                         */
                        searchForNewLights: (data = null) => _post(_lightsUrl, data),
                        /**
                         * Gets light attributes and state.
                         *
                         * @method getLight
                         * @param {Number} id light ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getLight: _parametrize(_get, _lightUrl),
                        /**
                         * Sets light attributes.
                         *
                         * @method setLight
                         * @param {Number} id light ID
                         * @param {Object} data attribute data
                         * @return {Promise} promise resolving to response data object
                         */
                        setLight: _parametrize(_put, _lightUrl),
                        /**
                         * Sets light state.
                         *
                         * @method setLightState
                         * @param {Number} id light ID
                         * @param {Object} data state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setLightState: _parametrize(_put, id => `${_lightUrl(id)}/state`),
                        /**
                         * Deletes a light.
                         *
                         * @method deleteLight
                         * @param {Number} id light ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteLight: _parametrize(_delete, _lightUrl),

                        /* ================================================== */
                        /* Groups API                                         */
                        /* ================================================== */

                        /**
                         * Gets groups.
                         *
                         * @method getGroups
                         * @return {Promise} promise resolving to response data object
                         */
                        getGroups: _get.bind(null, _groupsUrl),
                        /**
                         * Creates a group.
                         *
                         * @method createGroup
                         * @param {Object} data group data
                         * @return {Promise} promise resolving to response data object
                         */
                        createGroup: _post.bind(null, _groupsUrl),
                        /**
                         * Gets group attributes.
                         *
                         * @method getGroup
                         * @param {Number} id group ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getGroup: _parametrize(_get, _groupUrl),
                        /**
                         * Sets group attributes.
                         *
                         * @method setGroup
                         * @param {Number} id group ID
                         * @param {Object} data attribute data
                         * @return {Promise} promise resolving to response data object
                         */
                        setGroup: _parametrize(_put, _groupUrl),
                        /**
                         * Sets group state.
                         *
                         * @method setGroupState
                         * @param {Number} id group ID
                         * @param {Object} data state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setGroupState: _parametrize(_put, id => `${_groupUrl(id)}/action`),
                        /**
                         * Deletes a group.
                         *
                         * @method deleteGroup
                         * @param {Number} id group ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteGroup: _parametrize(_delete, _groupUrl),

                        /* ================================================== */
                        /* Schedules API                                      */
                        /* ================================================== */

                        /**
                         * Gets schedules.
                         *
                         * @method getSchedules
                         * @return {Promise} promise resolving to response data object
                         */
                        getSchedules: _get.bind(null, _schedulesUrl),
                        /**
                         * Creates a schedule.
                         *
                         * @method createSchedule
                         * @param {Object} data schedule data
                         * @return {Promise} promise resolving to response data object
                         */
                        createSchedule: _post.bind(null, _schedulesUrl),
                        /**
                         * Gets schedule attributes.
                         *
                         * @method getSchedule
                         * @param {Number} id schedule ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getSchedule: _parametrize(_get, _scheduleUrl),
                        /**
                         * Sets schedule attributes.
                         *
                         * @method setSchedule
                         * @param {Number} id schedule ID
                         * @param {Object} data schedule data
                         * @return {Promise} promise resolving to response data object
                         */
                        setSchedule: _parametrize(_put, _scheduleUrl),
                        /**
                         * Deletes a schedule.
                         *
                         * @method deleteSchedule
                         * @param {Number} id schedule ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteSchedule: _parametrize(_delete, _scheduleUrl),
                        /**
                         * Creates schedule command generator object.
                         *
                         * @experimental
                         * @method scheduleCommandGenerator
                         * @return {Object} schedule command generator
                         */
                        scheduleCommandGenerator: () =>
                            jsHueAPI(_echo(_baseUrl), Response, JSON, Promise).bridge(ip).user(username),

                        /* ================================================== */
                        /* Scenes API                                         */
                        /* ================================================== */

                        /**
                         * Gets scenes.
                         *
                         * @method getScenes
                         * @return {Promise} promise resolving to response data object
                         */
                        getScenes: _get.bind(null, _scenesUrl),
                        /**
                         * Creates a scene.
                         *
                         * @method createScene
                         * @param {Object} data scene data
                         * @return {Promise} promise resolving to response data object
                         */
                        createScene: _post.bind(null, _scenesUrl),
                        /**
                         * Gets scene attributes.
                         *
                         * @method getScene
                         * @param {String} id scene ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getScene: _parametrize(_get, _sceneUrl),
                        /**
                         * Sets scene attributes.
                         *
                         * @method setScene
                         * @param {String} id scene ID
                         * @param {Object} data scene data
                         * @return {Promise} promise resolving to response data object
                         */
                        setScene: _parametrize(_put, _sceneUrl),
                        /**
                         * Sets the state of a light in a scene.
                         *
                         * @method setSceneLightState
                         * @param {String} sceneId scene ID
                         * @param {Number} lightId light ID
                         * @param {Object} data scene light state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setSceneLightState: (sceneId, lightId, data) =>
                            _put(`${_sceneUrl(sceneId)}/lightstates/${lightId}`, data),
                        /**
                         * Deletes a scene.
                         *
                         * @method deleteScene
                         * @param {String} id scene ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteScene: _parametrize(_delete, _sceneUrl),

                        /* ================================================== */
                        /* Sensors API                                        */
                        /* ================================================== */

                        /**
                         * Gets sensors.
                         *
                         * @method getSensors
                         * @return {Promise} promise resolving to response data object
                         */
                        getSensors: _get.bind(null, _sensorsUrl),
                        /**
                         * Creates a sensor.
                         *
                         * @method createSensor
                         * @param {Object} data sensor data
                         * @return {Promise} promise resolving to response data object
                         */
                        createSensor: _post.bind(null, _sensorsUrl),
                        /**
                         * Searches for new sensors.
                         *
                         * @method searchForNewSensors
                         * @return {Promise} promise resolving to response data object
                         */
                        searchForNewSensors: _post.bind(null, _sensorsUrl, null),
                        /**
                         * Gets new sensors since last search.
                         *
                         * @method getNewSensors
                         * @return {Promise} promise resolving to response data object
                         */
                        getNewSensors: _get.bind(null, `${_sensorsUrl}/new`),
                        /**
                         * Gets sensor attributes and state.
                         *
                         * @method getSensor
                         * @param {Number} id sensor ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getSensor: _parametrize(_get, _sensorUrl),
                        /**
                         * Sets sensor attributes.
                         *
                         * @method setSensor
                         * @param {Number} id sensor ID
                         * @param {Object} data attribute data
                         * @return {Promise} promise resolving to response data object
                         */
                        setSensor: _parametrize(_put, _sensorUrl),
                        /**
                         * Sets sensor configuration.
                         *
                         * @method setSensorConfig
                         * @param {Number} id sensor ID
                         * @param {Object} data config data
                         * @return {Promise} promise resolving to response data object
                         */
                        setSensorConfig: _parametrize(_put, id => `${_sensorUrl(id)}/config`),
                        /**
                         * Sets sensor state.
                         *
                         * @method setSensorState
                         * @param {Number} id sensor ID
                         * @param {Object} data state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setSensorState: _parametrize(_put, id => `${_sensorUrl(id)}/state`),
                        /**
                         * Deletes a sensor.
                         *
                         * May not be supported by the bridge.
                         *
                         * @method deleteSensor
                         * @param {Number} id sensor ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteSensor: _parametrize(_delete, _sensorUrl),

                        /* ================================================== */
                        /* Rules API                                          */
                        /* ================================================== */

                        /**
                         * Gets rules.
                         *
                         * @method getRules
                         * @return {Promise} promise resolving to response data object
                         */
                        getRules: _get.bind(null, _rulesUrl),
                        /**
                         * Creates a rule.
                         *
                         * @method createRule
                         * @param {Object} data rule data
                         * @return {Promise} promise resolving to response data object
                         */
                        createRule: _post.bind(null, _rulesUrl),
                        /**
                         * Gets rule attributes.
                         *
                         * @method getRule
                         * @param {Number} id rule ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getRule: _parametrize(_get, _ruleUrl),
                        /**
                         * Sets rule attributes.
                         *
                         * @method setRule
                         * @param {Number} id rule ID
                         * @param {Object} data rule data
                         * @return {Promise} promise resolving to response data object
                         */
                        setRule: _parametrize(_put, _ruleUrl),
                        /**
                         * Deletes a rule.
                         *
                         * @method deleteRule
                         * @param {Number} id rule ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteRule: _parametrize(_delete, _ruleUrl),
                        /**
                         * Creates rule action generator object.
                         *
                         * @experimental
                         * @method ruleActionGenerator
                         * @return {Object} rule action generator object
                         */
                        ruleActionGenerator: () =>
                            jsHueAPI(_echo(_userUrl), Response, JSON, Promise).bridge(ip).user(username),

                        /* ================================================== */
                        /* Resourcelinks API                                  */
                        /* ================================================== */

                        /**
                         * Gets all resourcelinks.
                         *
                         * @method getResourceLinks
                         * @return {Promise} promise resolving to response data object
                         */
                        getResourceLinks: _get.bind(null, _linksUrl),
                        /**
                         * Creates a resourcelink.
                         *
                         * @method createResourceLink
                         * @param {Object} data resourcelink data
                         * @return {Promise} promise resolving to response data object
                         */
                        createResourceLink: _post.bind(null, _linksUrl),
                        /**
                         * Gets resourcelink attributes.
                         *
                         * @method getResourceLink
                         * @param {Number} id resourcelink ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getResourceLink: _parametrize(_get, _linkUrl),
                        /**
                         * Sets resourcelink attributes.
                         *
                         * @method setResourceLink
                         * @param {Number} id resourcelink ID
                         * @param {Object} data resourcelink data
                         * @return {Promise} promise resolving to response data object
                         */
                        setResourceLink: _parametrize(_put, _linkUrl),
                        /**
                         * Deletes a resourcelink.
                         *
                         * @method deleteResourceLink
                         * @param {Number} id resourcelink ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteResourceLink: _parametrize(_delete, _linkUrl)
                    };
                }
            };
        }
    };
};

if(typeof fetch !== 'undefined' && typeof Response !== 'undefined'
    && typeof JSON !== 'undefined' && typeof Promise !== 'undefined') {
    /**
     * jsHue class.
     *
     * @class jsHue
     * @extends jsHueAPI
     * @constructor
     * @return {Object} instance
     */
    var jsHue = jsHueAPI.bind(null, fetch, Response, JSON, Promise);

    // Try to export to be used as a module via a bundler
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = jsHue;
    }
}