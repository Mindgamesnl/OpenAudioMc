import React from 'react';
import PropTypes from 'prop-types';
import { ChecklistItem } from '../../../../components/checklist/ChecklistItem';
import { API_ENDPOINT } from '../../../../client/config/ApiEndpoints';

export class LoginCode extends React.Component {
  static propTypes = {
    onAccept: PropTypes.func,
  };

  static defaultProps = {
    onAccept: () => {
    },
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
    if (this.state.finished) {
      return (
        <div className="w-full flex flex-col justify-center items-center align-middle">
          <div className="xl:w-1/4">
            <ChecklistItem
              text="Done!"
              subtext={"You'll now be logged in"}
              checked
            />
          </div>
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

    const codeGrid = [];
    for (let i = 0; i < this.state.code.length; i++) {
      codeGrid.push(
        <div
          key={i}
          className="p-2 m-1 rounded-md text-center bg-gray-700 text-white text-4xl"
        >
          {this.state.code.charAt(i)}
        </div>,
      );
    }

    return (
      <div className="w-full flex flex-col justify-center items-center align-middle">
        <p className="text-3xl">Your login code is:</p>
        <div className="flex">
          {codeGrid}
        </div>
        <div>
          <p className="text-sm mt-2">
            Enter it through the command
            {' '}
            <code
              className="bg-gray-700 p-1 ml-1 rounded-md text-white"
            >
              /audio
              {' '}
              {this.state.code}
            </code>
          </p>
        </div>
      </div>
    );
  }
}
