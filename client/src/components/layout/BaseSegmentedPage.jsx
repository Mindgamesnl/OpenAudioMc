/* eslint-disable */
import React from 'react';
import { Globe } from 'lucide-react';
import { compareProdVersions } from '../../client/util/versioning';
import { getGlobalState } from '../../state/store';
import PropTypes from "prop-types";

export class BaseSegmentedPage extends React.Component {

  // prop types
  static propTypes = {
    showVersion: PropTypes.bool,
  }

  // default props
  static defaultProps = {
    showVersion: false,
  }

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
    let {
      backgroundImage, accentColor, serverDisplayName, logoImage,
    } = getGlobalState().settings;

    // do we have a previous background image or accent color?
    if (backgroundImage != null && backgroundImage != '') {
      // sanity check, make sure it ends with .png, .jpg, jpeg, webp or gif
      const lower = backgroundImage.toLowerCase();
      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif')) {
        backgroundImage = `url(${backgroundImage})`;
      }
    } else {
      // default to our local
      backgroundImage = 'url(assets/clientbg.jpg)';
    }

    let borderAccentColorStyle = {};
    if (accentColor != null && accentColor !== '') {
      borderAccentColorStyle = {
        borderColor: accentColor,
      };

      document.documentElement.style.setProperty('--accent-color', accentColor);
    }

    return (
      <div className="min-h-screen bg-black flex items-stretch overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-black z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 z-0"
            style={{
              backgroundPosition: 'center',
              backgroundImage,
              backgroundSize: 'cover',
              filter: 'blur(2px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-80 z-1"></div>
        </div>

        {/* Content container with glass morphism */}
        <div className="container mx-auto my-8 z-10 flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
          {React.cloneElement(this.props.children, {
            accentColor,
            serverDisplayName,
            logoImage,
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-xs text-gray-500 bg-black bg-opacity-80 backdrop-blur-md border-t border-gray-800 z-10">
          <div>
            &copy; OpenAudioMc 2016-2025. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            {this.props.showVersion && (
              <a
                href="https://openaudiomc.net/docs/client_major_changelog"
                className="text-gray-500 hover:text-white flex items-center transition-colors duration-200"
              >
                <span className="text-sm font-mono">v1.125.301</span>
                <span className={`ml-2 ${this.state.versionDiff.color}`}>
                ({this.state.versionDiff.text})
              </span>
              </a>
            )}
            <a
              href="https://openaudiomc.net/"
              className="text-gray-500 hover:text-white flex items-center transition-colors duration-200"
            >
              <Globe size={14} className="mr-1" />
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
