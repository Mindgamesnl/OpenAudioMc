import React from 'react';
import PropTypes from 'prop-types';
import { ChecklistItem } from '../../../../components/checklist/ChecklistItem';
import { API_ENDPOINT } from '../../../../client/config/ApiEndpoints';

export class LoginCode extends React.Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    copied: PropTypes.bool,
  };

  static defaultProps = {
    copied: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      connected: false,
      errored: false,
      code: null,
      finished: false,
      errorContext: null,
    };
    this.websocket = null;
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount() {
    this.websocket = new WebSocket(API_ENDPOINT.PREAUTH_WS);
    this.websocket.onopen = () => {
      this.setState({
        connected: true,
      });
    };

    let msgHandler = (event) => {
      if (event.data.startsWith('code:')) {
        const code = event.data.split(':')[1];
        this.setState({
          loading: false,
          code,
        });
      } else {
        this.setState({
          finished: true,
        });
        this.onMessage(event.data);
      }
    };

    msgHandler = msgHandler.bind(this);

    this.websocket.onmessage = msgHandler;

    const erOrClose = (error) => {
      let errorMessage = null;
      if (error && error.message) {
        errorMessage = error.message;
        // call window.onerror
        window.onerror(errorMessage, 'bedrock-auth-ws', 0, 0, error);
      }

      const newState = {
        loading: false,
        connected: false,
        code: null,
        errored: true,
      };

      if (errorMessage) {
        newState.errorContext = errorMessage;
      }

      this.setState(newState);
    };

    this.websocket.onerror = erOrClose;
    this.websocket.onclose = erOrClose;
  }

  componentWillUnmount() {
    try {
      this.websocket.close();
    } catch (e) {
      // ignore
    }
  }

  onMessage(event) {
    this.props.onAccept(event);
  }

  render() {
    const { copied, onCopy } = this.props;

    if (this.state.finished) {
      return (
        <div className="w-full flex flex-col justify-center items-center align-middle">
          <ChecklistItem
            text="Connecting!"
            subtext="Please wait for the connection to complete"
            checked
          />
        </div>
      );
    }

    // initial display
    if (this.state.code == null) {
      let text = 'Connecting...';
      let subtext = "We're getting a code for you";

      if (this.state.errored) {
        text = 'Error connecting';
        subtext = `Something went wrong, please try again later. Error: ${this.state.errorContext}`;
      }

      if (this.state.connected) {
        text = 'Connected!';
        subtext = 'Waiting for a code';
      }

      return (
        <div className="w-full flex flex-col justify-center items-center align-middle">
          <div className="xl:w-1/4">
            <ChecklistItem
              text={text}
              subtext={subtext}
              loading={this.state.loading}
              checked={!this.state.errored}
            />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="bg-gray-900 rounded-lg overflow-hidden mx-auto mb-6 max-w-md border border-gray-800">
          <div className="bg-blue-900 bg-opacity-30 p-6 w-full">
            <p className="text-blue-200 text-xl opacity-70 text-left">Your login code is:</p>

            <div className="flex justify-center space-x-2 my-4">
              {this.state.code.split('').map((char, index) => (
                <div
                  key={index}
                  className="w-14 h-14 flex items-center justify-center bg-gray-700 rounded-md text-white text-3xl font-bold"
                >
                  {char}
                </div>
              ))}
            </div>

            <p className="text-blue-200 text-sm opacity-70 text-left">
              Enter it through the command:
              <span className="inline-block bg-blue-800 bg-opacity-40 px-2 py-1 rounded text-white ml-2 font-mono">
                /audio
                {' '}
                {this.state.code}
              </span>
            </p>
          </div>

          <div className="p-4 bg-gray-950 flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
              <code className="text-white font-mono">
                /audio
                {' '}
                {this.state.code}
              </code>
            </div>
            <button
              type="button"
              onClick={() => onCopy(this.state.code)}
              className="text-white focus:outline-none"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg max-w-md mx-auto p-4 border border-gray-800">
          <div className="flex items-center justify-center mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2" />
            <span className="text-white text-sm font-medium">IMPORTANT</span>
          </div>
          <p className="text-gray-300 text-sm">Keep this browser tab open while playing</p>
          <p className="text-gray-300 text-sm">The connection will automatically complete once you enter the code</p>
        </div>
      </>
    );
  }
}
