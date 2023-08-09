import React from 'react';
import PropTypes from 'prop-types';

export class StyledDropdown extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })),
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    title: 'Title',
    description: 'Description about the dropdown',
    options: [{ key: 'default', value: 'default' }, { key: 'default2', value: 'default2' }],
    onChange: () => {},
    value: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.value,
    };

    this.onInput = this.onInput.bind(this);
  }

  onInput(e) {
    // find the option
    const option = this.props.options.find((optionEntry) => optionEntry.key === e.target.value);
    if (option) {
      // is this not the current selected option?
      if (this.state.selected === option.key) {
        return;
      }
      this.setState({ selected: option.key });
      this.props.onChange(option.key, option.value);
    }
  }

  render() {
    return (
      <div className="relative inline-block text-left px-4 py-3 bg-gray-800 rounded-md">
        <div>
          <div className="text-lg leading-6 font-medium text-gray-50">
            {this.props.title}
          </div>
          <div className="text-sm leading-6 font-medium text-gray-400">
            {this.props.description}
          </div>
          <span className="rounded-md shadow-sm w-full">
            <select
              className="inline-flex w-full justify-center mt-2 rounded-md border border-gray-300 px-4 py-2 bg-gray-800 text-sm leading-5 font-medium text-gray-50 hover:bg-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-700 active:text-blue-200 transition ease-in-out duration-150"
              value={this.state.selected}
              onChange={this.onInput}
              onInput={this.onInput}
            >
              {this.props.options.map((option) => <option key={option.key} value={option.key}>{option.value}</option>)}
            </select>
          </span>
        </div>
      </div>
    );
  }
}
