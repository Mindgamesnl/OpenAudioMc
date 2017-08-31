/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

soundManager.setup({
    defaultOptions: {
        onfinish: function() {
            handleSoundEnd(this.id);
            soundManager.destroySound(this.id);
            if (this.id != "oa_ambiane_") {
                OpenAudioManager.getMain().onSoundEndHandler();
            }
        },
        onplay: function() {
            if (this.id != "oa_ambiane_") {
                OpenAudioManager.getMain().onPlayHandler();
            }
        },
        onstop: function() {
            if (this.id != "oa_ambiane_") {
                OpenAudioManager.getMain().onSoundEndHandler();
            }
        }
    }
});

OpenAudioManager = function() {

    //global variables
    this.__sounds = {};
    this.__speaker = null;
    this.__region = null;
    this.__ambiance = null;
    this.__ambianceTimer = 0;
    this.__volume = 25;


    //Normal sound
    this.NormalSound = function (url, autoplay) {
        this._randToken = Math.floor(Math.random() * 100) + 1;
        this._Uuid = "AudioMan_sound_" + _randToken+"_";
        this._url = url;

        this._sound = soundManager.createSound({
            url: _url,
            volume: volume,
            id: _Uuid,
            autoPlay: autoplay
        });

        this.play = function () {
            this._sound.play();
        };

        this._restart = function () {
            this._sound.play();
            this._sound.onfinish = function () {
                this._restart();
            }
        };

        this.setVolume = function(targetvol) {
            fadeIdTarget(this._Uuid, targetvol);
        };

        this.jumpTo = function (time) {
            var s = parseInt(timeInS);
            var t = s * 1000;
            this._sound.setPosition(t);
        };

        this.toggle = function () {
            this._sound.togglePause();
        };

        this.getUuid = function() {
            return this._Uuid;
        }

        this.stop = function (callback) {
            if (callback != null) {
                fadeIdOut(this._Uuid, callback);
            } else {
                fadeIdOut(this._Uuid);
            }
        };

        this.setDirectVolume = function (_vol) {
            this._sound.setVolume(_vol);
        };

        this.loop = function() {
            this._sound.onfinish = function () {
                this._restart();
            }
        };
    };


    //OpenAudio Ambiance
    this.AmbianceSound = function(url) {
        this._url = url;
        this._Uuid = "oa_ambiane_";

        this._sound = soundManager.createSound({
            url: _url,
            volume: OpenAudioManager.getMain().getVolume(),
            id: _Uuid,
            autoPlay: true,
            onfinish: function () {
                this._restart();
            }
        });

        this._restart = function () {
            this._sound.play();
            this._sound.onfinish = function () {
                this._restart();
            }
        };

        this.stop = function (callback) {
            if (callback != null) {
                fadeIdOut(this._Uuid, callback,500, this.volume);
            } else {
                fadeIdOut(this._Uuid, function () {},500, this.volume);
            }
        };

        this.setDirectVolume = function (_vol) {
            this._sound.setVolume(_vol);
            this.volume = _newVol;
        };

        this.setVolume = function (_newVol) {
            fadeIdTarget(this._Uuid, _newVol, 500, this.volume);
            this.volume = _newVol;
        };
    };


    //speaker object
    this.Speaker = function(url, Ttime, Tvol) {
        this._url = url;
        this._startVolume = Tvol;
        this._startTime = (Ttime * 1000);
        this.volume = Tvol;
        this._randToken = Math.floor(Math.random() * 100) + 1;
        this._Uuid = "AudioMan_speaker_" + _randToken;

        this._sound = soundManager.createSound({
            url: _url,
            volume: _startVolume,
            id: _Uuid,
            from: _startTime,
            autoPlay: true,
            onfinish: function () {
                this._restart();
            }
        });

        this._restart = function () {
            this._sound.play();
            this._sound.onfinish = function () {
                this._restart();
            }
        };

        this.getSource = function () {
            return this._url;
        };

        this.stop = function (callback) {
            if (callback != null) {
                fadeIdOut(this._Uuid, callback,500, this.volume);
            } else {
                fadeIdOut(this._Uuid, function () {},500, this.volume);
            }
        };

        this.setDirectVolume = function (_vol) {
            this._sound.setVolume(_vol);
            this.volume = _newVol;
        };

        this.setVolume = function (_newVol) {
            fadeIdTarget(this._Uuid, _newVol, 500, this.volume);
            this.volume = _newVol;
        };
    };


    //Managers
    this.speakerManager = function() {
        this.startSpeaker = function (data) {
            var source = data.source;
            var time = data.time;
            var targetVolume = data.volume;

            if (this.__speaker == null) {
                this.__speaker = new this.Speaker(source, time, ((targetVolume * 100) / this.getMain().getVolume()));
            } else {
                this.__speaker.stop(function () {
                    this.__speaker = new this.Speaker(source, time, ((targetVolume * 100) / this.getMain().getVolume()));
                });
            }
        };
        
        this.setVolume = function (_newvolume) {
            if (this.__speaker != null) {
                this.__speaker.setVolume(((_newvolume * 100) / this.getMain().getVolume()));
            }
        };

        this.stopSpeaker = function () {
            if (this.__speaker != null) {
                this.__speaker.stop(function () {
                   this.__speaker = null;
                });
            }
        }
    };


    this.regionManager = function () {
        this.startRegion = function (url) {
            var source = url;

            if (this.__region == null) {
                var Sound = new this.NormalSound(source)
                    .loop();
                this.__region = Sound;
            } else {
                this.__region.stop(function () {
                    var Sound = new this.NormalSound(source)
                        .loop();
                    this.__region = Sound;
                });
            }
        };

        this.setVolume = function (_newvolume) {
            if (this.__region != null) {
                this.__region.setVolume(_newvolume);
            }
        };

        this.stopRegion = function () {
            if (this.__region != null) {
                this.__region.stop(function () {
                    this.__region = null;
                });
            }
        }
    };


    this.ambianceManager = function () {
        this.start = function () {
            this.__ambianceTimer = setTimeout(function () {
                if (this.__ambiance == null) {
                    if (OpenAudioCore.getOAPlusManager().__ambianceUrl != null) {
                        this.__ambiance = new this.AmbianceSound(OpenAudioCore.getOAPlusManager().__ambianceUrl);
                    }
                }
            }, OpenAudioCore.getOAPlusManager().__ambianceDelay);
        };

        this.stop = function () {
            if (this.__ambiance != null) {
                if (OpenAudioCore.getOAPlusManager().__ambianceUrl != null) {
                    this.__ambiance.stop(function () {
                        this.__ambiance = null;
                    });
                }
            }
        };

        this.setVolume = function (_vol) {
            if (this.__ambiance != null) {
                this.__ambiance.setVolume(_vol);
            }
        };

        this.setDirectVolume = function (_vol) {
            if (this.__ambiance != null) {
                this.__ambiance.setDirectVolume(_vol);
            }
        };
    };


    this.soundManager = function () {
        this.stopAll = function() {
            for (var key in this.__sounds) {
                if (this.__sounds.hasOwnProperty(key)) {
                    this.__sounds[i].stop();
                }
            }
        };

        this.getSound = function (_id) {
            this.__sounds[id];
        };
        
        this.createSound = function (_url, _id, autoplay) {
            if (_id == null) {
                var randid = Math.floor(Math.random() * 100) + 1;
                this.__sounds[randid] = new this.NormalSound(_url);
                return this.__sounds[randid];
            } else if (this.__sounds[_id] == nul) {
                var ap = true;
                if (autoplay != null) {
                    if (autoplay == false) {
                        ap = false;
                    }
                }
                this.__sounds[_id] = new this.NormalSound(_url, ap);
                return this.__sounds[_id];
            } else {
                var ap = true;
                if (autoplay != null) {
                    if (autoplay == false) {
                        ap = false;
                    }
                }
                this.__sounds[_id].stop(function () {
                    this.__sounds[_id] = new this.NormalSound(_url, ap);
                    return this.__sounds[_id];
                });
            }
        };

        this.setDirectVolume = function (_vol) {
            for (var key in this.__sounds) {
                if (this.__sounds.hasOwnProperty(key)) {
                    this.__sounds[i].setDirectVolume(_vol);
                }
            }
        };

        this.setVolume = function (_vol) {
            for (var key in this.__sounds) {
                if (this.__sounds.hasOwnProperty(key)) {
                    this.__sounds[i].setVolume(_vol);
                }
            }
        };
    };


    //Getters
    this.getMain = function() {
        return this._main;
    };

    this.getRegionManager = function () {
        return this._regionMan;
    };

    this.getSpeakerManager = function () {
        return this._SpeakerManager;
    };


    this.getAudioManager = function () {
        return this._SoundManager;
    };

    this.getAmbianceManager = function () {
        return this.__ambman;
    };


    //Main
    this.main = function () {

        this.getPropperUrl = function (url) {
            var returnValue = url;
        };

        this.getVolume = function () {
            return this.__volume;
        };

        this.setDirectVolume = function (_vol) {
            this.getSpeakerManager().setDirectVolume(_vol);
            this.getAudioManager().setDirectVolume(_vol);
            this.getRegionManager().setDirectVolume(_vol);
            this.getAmbianceManager().setDirectVolume(_vol);
            this.__volume = _vol;
        };

        this.setVolume = function (_vol) {
            this.getSpeakerManager().setVolume(_vol);
            this.getAudioManager().setVolume(_vol);
            this.getRegionManager().setVolume(_vol);
            this.getAmbianceManager().setVolume(_vol);
            this.__volume = _vol;
        };

        this.getTotalPlayingSounds = function () {
            var obj = soundManager.sounds;
            var str = 0;
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str++;
                }
            }
            return str;
        };

        this.whisperSoundEnd = function (id) {
            var id = fullId.split("_")[3];
            if (id != "undefined") {
                var whisper = {};
                whisper.command = "SoundEnded";
                whisper.id = id;
                OpenAudioCore.getSocketManager().whisper(JSON.stringify(whisper));
            }
        };

        this.onPlayHandler = function () {
            if (this.__ambiance != null) {
                OpenAudioManager.getAmbianceManager().stop();
            }

        };

        this.onSoundEndHandler = function () {
            if (this.__region == null && this.__speaker == null && this.__ambiance == null && OpenAudioManager.getMain().getTotalPlayingSounds() == 0) {
                OpenAudioManager.getAmbianceManager().start();
            }
        };
    };

    this._main = new this.main();
    this._SoundManager = new this.SoundManager();
    this._SpeakerManager = new this.speakerManager();
    this.__ambman = new this.ambianceManager();
    this._regionMan = new this.regionManager();
};


//all the fading c
$(document).ready(function() {
    window.fadeIdOut = function(soundId, callback, _time, _start) {
        var dealy=1000;
        if (_time != null) {
            dealy = _time;
        }
        var start = OpenAudioManager.getMain().getVolume();
        if (_start != null) {
            start = _start;
        }
        var x = document.createElement("INPUT");
        x.setAttribute("type", "range");
        document.body.appendChild(x);
        x.id = soundId + "_Slider";
        x.min = 0;
        x.max = 100;
        x.value = start;
        x.style = "display:none;";
        var backAudio = $('#' + soundId + "_Slider");
        document.getElementById('faders').appendChild(x);

        if (FadeEnabled) {
            isFading[soundId] = true;
            backAudio.animate({
                value: 0
            }, {
                duration: dealy,
                step: function(currentLeft, animProperties) {
                    //call event when a sound started
                    if (stopFading[soundId] !== true) {
                        try {
                            soundManager.setVolume(soundId, currentLeft);
                        } catch (e) {}
                    }
                },
                done: function() {
                    if (stopFading[soundId] !== true) {
                        try {
                            soundManager.stop(soundId);
                            soundManager.destroySound(soundId);
                        } catch (e) {}
                    }
                    isFading[soundId] = false;
                    stopFading[soundId] = false;
                    x.remove();
                    if (callback != null) {
                        callback();
                    }
                }
            });
        } else {
            try {
                soundManager.stop(soundId);
                soundManager.destroySound(soundId);
                if (callback != null) {
                    callback();
                }
            } catch (e) {}
            x.remove();
        }
    }

    window.fadeIdTarget = function(soundId, volumeTarget,_time, _start) {
        var dealy=1000;
        if (_time != null) {
            dealy = _time;
        }
        var start = OpenAudioManager.getMain().getVolume();
        if (_start != null) {
            start = _start;
        }
        var x = document.createElement("INPUT");
        x.setAttribute("type", "range");
        document.body.appendChild(x);
        x.id = soundId.replace(/\./g, 'oapoint').replace(/\:/g, 'oadubblepoint').replace(/\//g, 'oaslash') + "_Slider_type_2";
        x.min = 0;
        x.max = 100;
        x.value = start;
        x.style = "display:none;";
        var backAudio = $('#' + soundId.replace(/\./g, 'oapoint').replace(/\:/g, 'oadubblepoint').replace(/\//g, 'oaslash') + "_Slider_type_2");
        document.getElementById('faders').appendChild(x);

        if (FadeEnabled) {
            isFading[soundId] = true;
            backAudio.animate({
                value: volumeTarget
            }, {
                duration: dealy,
                step: function(currentLeft, animProperties) {
                    if (stopFading[soundId + "_Slider_type_2"] !== true) {
                        soundManager.setVolume(soundId.replace(/\oapoint/g, '.').replace(/\oadubblepoint/g, ':').replace(/\oaslas/g, '/'), currentLeft);
                    }
                },
                done: function() {
                    isFading[soundId] = false;
                    stopFading[soundId] = false;
                    soundManager.setVolume(soundId.replace(/\oapoint/g, '.').replace(/\oadubblepoint/g, ':').replace(/\oaslas/g, '/'), volumeTarget);
                    x.remove();
                }
            });
        } else {
            soundManager.setVolume(soundId.replace(/\oapoint/g, '.').replace(/\oadubblepoint/g, ':').replace(/\oaslas/g, '/'), volumeTarget);
            x.remove();
        }
    }
});