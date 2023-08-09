import React from 'react';

import java from './editions/alt_java.png';
import bedrock from './editions/alt_bedrock.png';
import { BedrockAuthFlow } from './bedrock/BedrockAuthFlow';
import { FadeToCtx } from '../../../components/contexts';

export class PlatformSelection extends React.Component {
  static contextType = FadeToCtx;

  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };

    this.startBedrock = this.startBedrock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const btnClass = 'rounded-sm py-2.5 text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center';

    // render general selection
    return (
      <div className="flex flex-col xl:flex-row align-middle items-center justify-center w-full py-8 xl:py-0">
        <div
          className="hidden-on-mobile md:flex mx-4 xl:mx-5 flex-col common-rounded-top pt-2 px-2 common-rounded-bottom shadow-lg xl:p-6 clickprompt-box rounded-md"
        >

          <div className="h-full pb-2 flex flex-col mb-4">
            <div className="text-white m-5">
              <div className="flex items-center justify-center align-middle space-x-3">
                <img src={java} alt="Logo for Minecraft: Java Edition" className="w-2/3 xl:w-full" />
              </div>
            </div>
            <div className="grid content-end h-full">
              <div className="w-full flex justify-center align-middle text-white">

                <p className="w-2/3 text-center text-sm xl:text-base tracking-wide cursor-pointer">
                  Please request a new link by running
                  {' '}
                  <b>/audio</b>
                  {' '}
                  in the server chat, and then clicking the message that appears.
                </p>

              </div>
            </div>
          </div>

        </div>

        <div
          className="mx-4 xl:mx-0 flex flex-col common-rounded-top pt-2 px-2 common-rounded-bottom shadow-lg xl:p-6 clickprompt-box rounded-md w-full"
        >
          <div className="h-full pt-2 flex flex-col mb-5 xl:mb-0">
            <div className="text-white mt-2 mb-5">
              <div className="flex items-center justify-center align-middle w-full">
                <img src={bedrock} alt="Logo for Minecraft: Bedrock Edition" className="w-2/3" />
              </div>
            </div>
            <div className="grid content-end h-full">
              <div className="w-full flex justify-center align-bottom">
                <p className="text-center text-white mb-1 tracking-wide">
                  Link your in-game session to run the client while in the background.
                </p>
              </div>
              <div className="w-full flex justify-center align-middle">
                <button
                  onClick={this.startBedrock}
                  className={`${btnClass} w-2/3 xl:w-1/2 mx-5`}
                  type="button"
                >
                  Continue to Bedrock Setup
                </button>
              </div>
            </div>
          </div>

          <div className="h-full py-2 flex flex-col mb-1">
            <div className="grid content-end h-full">
              <div className="w-full flex justify-center align-middle text-white ">
                <div className="w-2/3 xl:w-1/2">
                  <div className="flex justify-center align-middle">
                    <p className="text-center text-sm mb-1 tracking-wide cursor-pointer">
                      Or enter your token here if you received one
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <input
                      type="text"
                      placeholder="Enter your token here"
                      autoComplete="off"
                      autoCapitalize="none"
                      onInput={(e) => this.setState({ token: e.target.value })}
                      className="w-3/4 px-2.5 text-white mr-2.5 bg-gray-500 leading-tight rounded-sm focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      onClick={this.onSubmit}
                      className={`${btnClass} w-1/4`}
                    >
                      Submit
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
