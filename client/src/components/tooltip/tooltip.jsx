import React from 'react';
import PropTypes from 'prop-types';
import { getTranslation } from '../../client/OpenAudioAppContainer';

export class Tooltip extends React.Component {
  constructor(s) {
    super(s);

    this.state = {
      isClosed: false,
    };

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ isClosed: true });
  }

  render() {
    if (!this.props.visible || this.state.isClosed) {
      return this.props.children;
    }

    return (
      <div>
        {this.props.children}
        <span className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 absolute">
          <div
            className="z-20 -mt-16 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-indigo-700 p-4 rounded z-[100]"
          >
            <svg
              className="absolute left-0 -ml-7 bottom-0 top-0 h-full"
              width="9px"
              height="16px"
              viewBox="0 0 9 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#4338CA">
                  <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                    <g id="Group-2" transform="translate(24.000000, 0.000000)">
                      <polygon
                        id="Triangle"
                        transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                        points="4.5 57.5 12.5 66.5 -3.5 66.5"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-l font-bold text-white pb-1">{this.props.title}</p>
            <p className="text-sm leading-4 text-white pb-3">
              {this.props.text}
            </p>
            <div className="flex justify-end">
              <button onClick={this.close} type="submit" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-400 focus:outline-none focus:text-white bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-200 rounded text-indigo-700 px-5 py-1 text-xs">
                { getTranslation(null, 'tooltip.close') }
              </button>
            </div>
          </div>
        </span>
        <div />
      </div>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};
