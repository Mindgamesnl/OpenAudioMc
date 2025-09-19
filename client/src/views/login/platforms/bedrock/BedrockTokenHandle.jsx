import React from 'react';
import { BaseSegmentedPage } from '../../../../components/layout/BaseSegmentedPage';
import { LoginCode } from './LoginCode';
import { FadeToCtx, OAC } from '../../../../components/contexts';

class BedrockTokenHandleContent extends React.Component {
  static contextType = FadeToCtx;

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.handleCode = this.handleCode.bind(this);
    this.copyCommand = this.copyCommand.bind(this);
  }

  handleCode(code) {
    // unlock
    OAC.attemptLoginWithTokenSet(JSON.parse(code))
      .then(() => {
        OAC.bootApp();
      })
      .catch(() => {
        this.context.fadeToComponent(null);
      });
  }

  copyCommand(code) {
    const command = `/audio ${code}`;
    navigator.clipboard.writeText(command)
      .then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      })
      .catch(() => {
        // Could not copy text
      });
  }

  render() {
    const { copied } = this.state;

    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
        <div className="w-full rounded-lg overflow-hidden bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Header */}
          <div className="py-6">
            <h2 className="text-white text-3xl font-medium">Connection Code</h2>
            <p className="text-gray-300 mt-2">
              Copy or remember the code below and enter it in your game
            </p>
          </div>

          {/* Main content */}
          <div className="px-4 pb-6">
            <LoginCode
              onAccept={this.handleCode}
              onCopy={this.copyCommand}
              copied={copied}
            />
          </div>
        </div>
      </div>
    );
  }
}

export function BedrockTokenHandle() {
  return (
    <BaseSegmentedPage showVersion>
      <BedrockTokenHandleContent />
    </BaseSegmentedPage>
  );
}
