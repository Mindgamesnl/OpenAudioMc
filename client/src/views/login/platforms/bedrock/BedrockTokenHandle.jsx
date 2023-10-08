import React from 'react';
import { BlackoutPage } from '../../../../components/layout/BlackoutPage';
import { LoginCode } from './LoginCode';
import { FadeToCtx, OAC } from '../../../../components/contexts';

export class BedrockTokenHandle extends React.Component {
  static contextType = FadeToCtx;

  constructor(props) {
    super(props);
    this.handleCode = this.handleCode.bind(this);
  }

  handleCode(code) {
    // unlock
    OAC.attemptLoginWithTokenSet(JSON.parse(code))
      .then(() => {
        OAC.bootApp();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.context.fadeToComponent(null);
      });
  }

  render() {
    return (
      <BlackoutPage coverImage="/assets/clientbg.jpg">
        <div className="relative bg-gradient-to-bl via-gray-900 from-stone-900 to-gray-900">
          <div
            className="relative mx-auto xl:max-w-7xl py-12 px-6 lg:px-8 lg:py-8 xl:border-l-8 border-solid border-indigo-900"
          >
            <div className="md:ml-auto">
              <h2 className="text-lg font-semibold text-gray-300">Connecting with</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Minecraft: Bedrock Edition
              </p>
              <div className="mt-3 text-lg text-gray-300">
                <p>
                  You&apos;re almost there! Just copy or remember the code below and enter it in the server
                  where you&apos;re playing.
                  Be sure to leave this page open in the background.
                </p>

                <div
                  className="border-t-2 mx-5 my-5 border-r-2 border-solid border-gray-700 rounded-full"
                />

                <LoginCode onAccept={this.handleCode} />
              </div>
            </div>
          </div>
        </div>
      </BlackoutPage>
    );
  }
}
