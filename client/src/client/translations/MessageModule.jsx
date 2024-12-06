import Cookies from 'js-cookie';
import React from 'react';
import { API_ENDPOINT } from '../config/ApiEndpoints';
import { setGlobalState, store } from '../../state/store';
import { VERSION } from '../../build';
import { FadeToCtx } from '../../components/contexts';
import LoadingView from '../../views/loading/LoadingView';
import ClientView from '../../views/client/ClientView';
import { oalog } from '../util/log';

export const DEFAULT_LANG = 'gb';

export const MessageModule = new class MessageModule {
  constructor() {
    this.messages = {};
    this.seeded = false;
    this.seededValues = [];
    this.currentLangKey = '';

    /**
     * @type {{[key: string]: {file: string, name: string, visible?: boolean}}}
     * You can add your language here.
     *
     *
     * The KEY: is the language code, this is the code provided by the browser (ISO 639-1)
     * The VALUE: is an object with the following properties:
     * - file: the file name of the language file, this is the file that will be loaded
     * - name: the name of the language, this is the name that will be displayed in the language selector
     * - visible: (optional) if this is set to false, the language will not be displayed in the language selector.
     *   This is used to prevent duplicate languages from being displayed.
     *
     *   https://gist.github.com/msikma/8912e62ed866778ff8cd
     */

    this.languageMappings = {
      gb: {
        file: 'en.lang',
        name: 'English',
        visible: true,
      },
      us: {
        file: 'en.lang',
        name: 'English',
      },
      nl: {
        file: 'nl.lang',
        name: 'Nederlands',
        visible: true,
      }, // dutch
      be: {
        file: 'nl.lang',
        name: 'Nederlands',
      }, // belgium
      sp: {
        file: 'es.lang',
        name: 'Español',
        visible: true,
      }, // spanish
      es: {
        file: 'es.lang',
        name: 'Español',
      }, // spanish
      fr: {
        file: 'fr.lang',
        name: 'Français',
        visible: true,
      }, // french
      de: {
        file: 'de.lang',
        name: 'Deutsch',
        visible: true,
      }, // german
      ja: {
        file: 'jp.lang',
        name: '日本語',
      }, // japanese
      ko: {
        file: 'kr.lang',
        name: '한국어',
        visible: true,
      }, // korean
      'zh-CN': {
        file: 'zh-CN.lang',
        name: '简体中文',
        visible: true,
      }, // simplified chinese
      cn: {
        file: 'zh-CN.lang',
        name: '简体中文',
      }, // simplified chinese
      'zh-TW': {
        file: 'zh-TW.lang',
        name: '繁體中文',
        visible: true,
      }, // tradition chinese
      tw: {
        file: 'zh-TW.lang',
        name: '繁體中文',
      }, // tradition chinese
      vn: {
        file: 'vn.lang',
        name: 'Tiếng Việt',
        visible: true,
      }, // vietnamese
      sv: {
        file: 'sv.lang',
        name: 'Svenska',
        visible: true,
      }, // Swedish
      th: {
        file: 'th.lang',
        name: 'ภาษาไทย',
        visible: true,
      }, // Thai

      // One of these can probably go, but i wasn't provided
      // enough info and am unable to find the correct region code
      // but these are both croatian
      hr: {
        file: 'hr.lang',
        name: 'Hrvatski',
        visible: true,
      },
      scr: {
        file: 'hr.lang',
        name: 'Hrvatski',
      },
      // polish
      pl: {
        file: 'pl.lang',
        name: 'Polski',
        visible: true,
      },
      it: {
        file: 'it.lang',
        name: 'Italiano',
        visible: true,
      },
      cs: {
        file: 'cs.lang',
        name: 'Čeština',
        visible: true,
      },
    };

    this.load = this.load.bind(this);
    this.getString = this.getString.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.updateBanner = this.updateBanner.bind(this);
    this.fetchWithFailover = this.fetchWithFailover.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
  }

  async loadDefault() {
    await this.load(DEFAULT_LANG);
  }

  async handleCountry(countryCode) {
    countryCode = countryCode.toLowerCase();
    const bestLang = this.languageMappings[countryCode];
    if (bestLang != null) {
      await this.load(countryCode);
    }
  }

  updateBanner() {
    if (this.currentLangKey === DEFAULT_LANG) {
      setGlobalState({ translationBanner: null });
      return;
    }

    // is this language the preferred language? keep it!
    if (this.currentLangKey === Cookies.get('lang')) {
      return;
    }

    const reset = function resetToEn() {
      this.load(DEFAULT_LANG);
      setTimeout(async () => {
        await FadeToCtx.fadeToComponent(<LoadingView />);
        FadeToCtx.fadeToComponent(<ClientView />);
      }, 500);
    }.bind(this);

    const placeholders = [['%langName', this.getString('lang.name')]];

    setGlobalState({
      translationBanner: {
        toEn: this.getString('lang.toEn', placeholders),
        detectedAs: this.getString('lang.detectedAs', placeholders),
        keep: this.getString('lang.keep', placeholders),
        reset,
      },
    });
  }

  getString(key, variables = []) {
    let v = this.messages[key];
    if (v == null) {
      // eslint-disable-next-line no-console
      console.error(`Couldn't find message key ${key}`);
      return `?? ${key} ??`;
    }

    for (let i = 0; i < variables.length; i++) {
      v = v.replace(variables[i][0], variables[i][1]);
    }

    return v;
  }

  async fetchWithFailover(file, isFailover = false) {
    let link = (window.location.pathname + window.location.search).split('?')[0];
    if (link.indexOf('.html') !== -1) {
      link = link.substring(0, link.lastIndexOf('/') + 1);
    }
    const prefix = (isFailover ? `${API_ENDPOINT.CONTENT_PROXY}https://session.openaudiomc.net/` : link);
    const request = await fetch(`${prefix + file}?v=${VERSION.revision}`);
    if (request.status !== 200 && !isFailover) {
      return this.fetchWithFailover(file, true);
    }
    const body = await request.text();
    return body.split('\n');
  }

  async load(langMapKey) {
    if (this.currentLangKey === langMapKey) {
      // eslint-disable-next-line no-console
      console.warn(`Language ${langMapKey} is already loaded, skipping`);
      return;
    }
    let lines = [];

    // check if the mappings have a language for this key
    if (this.languageMappings[langMapKey] == null) {
      // eslint-disable-next-line no-console
      console.error(`Language ${langMapKey} is not supported, falling back to ${DEFAULT_LANG}`);
      await this.load(DEFAULT_LANG);
      return;
    }

    // get file from map
    const { file } = this.languageMappings[langMapKey];

    // fetch
    lines = await this.fetchWithFailover(file);
    oalog(`Loaded ${lines.length} lines from ${file}`);

    // parse format:
    // # comment
    // key=value with text, no matter what, just don't use new lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('#') || line.length < 5) continue;
      let finishedKey = false;
      let key = '';
      let value = '';
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (!finishedKey) {
          if (char !== '=') {
            key += char;
          } else {
            finishedKey = true;
          }
        } else {
          value += char;
        }
      }

      if (value !== '') {
        // complete set
        this.messages[key] = value;
      }
    }

    const payload = {
      messages: this.messages,
    };
    store.dispatch({ type: 'SET_LANG_MESSAGES', payload });

    this.currentLangKey = langMapKey;
    setGlobalState({ langName: langMapKey });
    this.updateBanner();

    // not default? save it
    if (langMapKey !== DEFAULT_LANG) {
      Cookies.set('lang', langMapKey, { expires: 365 });
    }
  }
}();
