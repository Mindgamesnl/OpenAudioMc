import React from 'react';
import { Globe } from 'lucide-react';
import PropTypes from 'prop-types';
import { compareProdVersions } from '../../client/util/versioning';
import { getGlobalState } from '../../state/store';
import { VERSION } from '../../build';

export class BaseSegmentedPage extends React.Component {
  // prop types
  static propTypes = {
    showVersion: PropTypes.bool,
    noFooter: PropTypes.bool,
  };

  // default props
  static defaultProps = {
    showVersion: false,
    noFooter: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      versionDiff: 'loading...',
    };
  }

  async componentDidMount() {
    try {
      if (!this.props.showVersion) return;
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

  render() {
    const { settings } = getGlobalState();
    let {
      backgroundImage,
    } = settings;
    const { accentColor, serverDisplayName, logoImage } = settings;

    // do we have a previous background image or accent color?
    if (backgroundImage != null && backgroundImage !== '') {
      // sanity check, make sure it ends with .png, .jpg, jpeg, webp or gif
      const lower = backgroundImage.toLowerCase();
      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif')) {
        backgroundImage = `url(${backgroundImage})`;
      }
    } else {
      // default to our local
      backgroundImage = 'url(assets/clientbg.jpg)';
    }

    document.documentElement.style.setProperty('--accent-color', accentColor);

    return (
      <div className="h-full bg-black flex flex-col overflow-auto">
        {/* Background */}
        <div className="fixed inset-0 bg-black z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 z-0"
            style={{
              backgroundPosition: 'center',
              backgroundImage,
              backgroundSize: 'cover',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90 z-1" />
        </div>

        {/* Main content container */}
        <div className="flex-grow flex items-center justify-center z-10 py-8">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 pb-16 sm:pb-0">
            {React.cloneElement(this.props.children, {
              accentColor,
              serverDisplayName,
              logoImage,
            })}
          </div>
        </div>

        {/* Footer */}
        {!this.props.noFooter ? (
          <div className="relative w-full p-4 mt-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 bg-gray-900 border-t border-gray-800 z-10">
            <div className="mb-2 sm:mb-0 text-center sm:text-left">
              &copy; OpenAudioMc 2016-2025. All Rights Reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-2 sm:space-y-0">
              {this.props.showVersion ? (
                <a
                  href="https://openaudiomc.net/docs/client_major_changelog"
                  className="text-gray-500 hover:text-white flex items-center transition-colors duration-200"
                >
                  <span className="text-sm font-mono">
                    Version
                    {' '}
                    {VERSION.revision}
                  </span>
                  <span className={`ml-2 ${this.state.versionDiff.color}`}>
                    (
                    {this.state.versionDiff.text}
                    )
                  </span>
                </a>
              ) : null}
              <a
                href="https://openaudiomc.net/"
                className="text-gray-500 hover:text-white flex items-center transition-colors duration-200"
              >
                <Globe size={14} className="mr-1" />
                <span>Website</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
