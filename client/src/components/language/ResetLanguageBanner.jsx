import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { getGlobalState, setGlobalState } from '../../state/store';
import { DEFAULT_LANG } from '../../client/translations/MessageModule';

class ResetLanguageBanner extends React.Component {
  constructor(props) {
    super(props);

    this.acceptLang = this.acceptLang.bind(this);
    this.resetLanguage = this.resetLanguage.bind(this);
  }

  acceptLang() {
    Cookies.set('lang', getGlobalState().langName, { expires: 365 });
    setGlobalState({ translationBanner: null });
  }

  resetLanguage() {
    Cookies.set('lang', DEFAULT_LANG, { expires: 365 });
    this.props.translationBanner.reset();
  }

  render() {
    if (this.props.translationBanner == null) {
      return <div />;
    }

    return (
      <div className="bg-gray-100 flex flex-col justify-center">
        <div
          className="max-w-screen-lg mx-auto fixed bg-white inset-x-5 p-5 bottom-5 common-rounded-top common-rounded-bottom drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between"
        >
          <div className="w-full text-black">{this.props.translationBanner.detectedAs}</div>
          <div className="flex gap-4 items-center flex-shrink-0">
            <button type="button" className="text-indigo-600 focus:outline-none hover:underline" onClick={this.resetLanguage}>
              {this.props.translationBanner.toEn}
            </button>
            <button type="submit" className="bg-indigo-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none" onClick={this.acceptLang}>
              {this.props.translationBanner.keep}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResetLanguageBanner);
function mapStateToProps(state) {
  return {
    translationBanner: state.translationBanner,
  };
}
