import React from 'react';
import '@fontsource/roboto/300.css';
import './css/login-glow.css';
import JAVA_LOGO from './platforms/editions/java.png';
import BEDROCK_LOGO from './platforms/editions/bedrock.png';
import { StaticFooter } from '../../components/footer/StaticFooter';
import { VERSION } from '../../index';
import { compareProdVersions } from '../../client/util/versioning';
import { FadeToCtx } from '../../components/contexts';
import { BedrockAuthFlow } from './platforms/bedrock/BedrockAuthFlow';

export class LoginView extends React.Component {
  static contextType = FadeToCtx;

  constructor(props) {
    super(props);
    this.state = {
      versionDiff: 'loading...',
      token: '',
    };

    this.startBedrock = this.startBedrock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const version = await compareProdVersions();
      this.setState({ versionDiff: version });
    } catch (e) {
      this.setState({
        versionDiff: {
          text: 'Failed to fetch version',
          outOfDate: false,
          color: 'text-red-500',
        },
      });
    }
  }

  onSubmit() {
    let name = this.state.token;

    if (name.indexOf('#') !== -1) {
      // eslint-disable-next-line prefer-destructuring
      name = name.split('#')[1];
    }

    if (name.length > 3) {
      window.location = `#${name}`;
      window.location.reload();
    }
  }

  startBedrock() {
    this.context.fadeToComponent(<BedrockAuthFlow />);
  }

  render() {
    return (
      <div className="relative min-h-screen  grid bg-black">
        <div
          className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 "
        >
          <div
            className="sm:w-1/2 xl:w-3/5 bg-black h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden  text-white bg-no-repeat bg-cover relative"
          >
            <div
              className="absolute bg-black  opacity-25 inset-0 z-0"
              style={{ backgroundPosition: 'center', backgroundImage: 'url(assets/bg.png)' }}
            />
            <div className="w-full  lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
              <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center">
                <img src="assets/logo.png" alt="logo" className="w-1/4 mx-auto image-glow" />
                <h1 style={{ fontFamily: 'roboto' }} className="p-2 text-xl">OpenAudioMc Web Client</h1>
              </div>
            </div>
          </div>

          <div
            className="md:flex lg:max-w-2xl md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none "
          >
            <div className="w-full space-y-2">
              <div className="lg:text-left text-center">

                <div className="items-center justify-center flex flex-col">
                  <div className="hidden-on-mobile bg-black flex flex-col w-80 border border-gray-600 rounded-lg px-8 py-10 shadow-lg shadow-slate-800 mb-4">
                    <div className="flex flex-col space-y-4">
                      <img src={JAVA_LOGO} alt="java logo" className="w-full mx-auto" />
                      <p className="text-gray-400">
                        Go in-game and type
                        {' '}
                        <b>/audio</b>
                        {'. '}
                        It will give you a message you can click to login
                      </p>
                    </div>
                  </div>

                  <div className="bg-black flex flex-col w-80 border border-gray-700 rounded-lg px-8 py-10">
                    <div className="flex flex-col space-y-4">
                      <img src={BEDROCK_LOGO} alt="bedrock logo" className="w-full mx-auto" />
                      <p className="text-gray-400">
                        The bedrock login method lets you run this page in the background,
                        without leaving the game
                      </p>
                      <button
                        type="submit"
                        onClick={this.startBedrock}
                        className="border border-indigo-600 bg-black text-white rounded-lg py-3
                            font-semibold"
                      >
                        Continue to bedrock login
                      </button>
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                      <p className="text-gray-400">or enter your token here if you received one</p>
                      <input
                        id="token"
                        type="text"
                        placeholder="Your token / pin"
                        onInput={(e) => this.setState({ token: e.target.value })}
                        className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                      />
                      <button
                        type="submit"
                        onClick={this.onSubmit}
                        className="border border-indigo-600 bg-black text-white rounded-lg py-3
                            font-semibold"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                </div>
                <StaticFooter>
                  <a href="https://openaudiomc.net/docs/client_major_changelog" className="text-white">
                    {VERSION.build}
                    <small
                      className={`pl-2 ${this.state.versionDiff.color}`}
                    >
                      (
                      {this.state.versionDiff.text}
                      )
                    </small>
                  </a>
                </StaticFooter>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
