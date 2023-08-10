import React from 'react';
import { connect } from 'react-redux';
import { msg } from '../../client/OpenAudioAppContainer';
import { setGlobalState } from '../../state/store';
import './audiovolume.css';

class AudioVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgGradient: 'white',
      bgColor: 'white',
      textColor: 'blue',
    };
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    this.calculateColors();
  }

  onInput(element) {
    // update state
    setGlobalState({ settings: { normalVolume: element.target.value } });
  }

  getSoftColorAndTextColor(boldColor) {
    // Parse the bold color into HSL values
    const boldHSL = this.hexToHSL(boldColor);

    // Reduce the saturation while keeping the brightness relatively constant
    const softHSL = {
      h: boldHSL.h,
      s: boldHSL.s * 0.7, // Adjust the saturation factor as desired
      l: boldHSL.l,
    };

    // Convert the soft HSL color back to hexadecimal format
    const softColor = this.hslToHex(softHSL);

    // Calculate the luminance of the soft color to determine the appropriate text color
    const luminance = (0.299 * softHSL.l + 0.587 * softHSL.l + 0.114 * softHSL.l) / 255;

    // Choose the text color based on the luminance
    const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

    return { softColor, textColor };
  }

  shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * ((100 + percent) / 100), 10);
    G = parseInt(G * ((100 + percent) / 100), 10);
    B = parseInt(B * ((100 + percent) / 100), 10);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));

    return `#${RR}${GG}${BB}`;
  }

  calculateColors() {
    const { accentColor } = this.props.settings;
    // eslint-disable-next-line prefer-const
    let { softColor, textColor } = this.getSoftColorAndTextColor(accentColor);

    // make a gradient from the mid color to the accent color
    // make shoftcolor a bit darker
    softColor = this.shadeColor(softColor, -15);
    // make colors transparant
    const gradient = `linear-gradient(100deg, ${softColor} 0%, ${accentColor} 80%)`;

    // now make a dark version of the accent color
    const sliderColor = this.shadeColor(accentColor, -50);

    // set css properties for the slider
    document.documentElement.style.setProperty('--main-volume-color', sliderColor);

    // eslint-disable-next-line no-console
    console.log(gradient);
    this.setState({ bgGradient: gradient, textColor, bgColor: accentColor });
  }

  hexToHSL(hex) {
    const red = parseInt(hex.substr(1, 2), 16) / 255;
    const green = parseInt(hex.substr(3, 2), 16) / 255;
    const blue = parseInt(hex.substr(5, 2), 16) / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);

    let hue;
    let
      saturation;
    const lightness = (max + min) / 2;

    if (max === min) {
      // eslint-disable-next-line no-multi-assign
      hue = saturation = 0; // achromatic
    } else {
      const d = max - min;
      saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case red:
          hue = (green - blue) / d + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / d + 2;
          break;
        case blue:
          hue = (red - green) / d + 4;
          break;
        default:
          break;
      }

      hue /= 6;
    }

    return { h: hue, s: saturation, l: lightness };
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  makeColorTransparent(color, opacity) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  hslToHex(hsl) {
    const { h, s, l } = hsl;

    const hueToRGB = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const red = Math.round(hueToRGB(p, q, h + 1 / 3) * 255);
    const green = Math.round(hueToRGB(p, q, h) * 255);
    const blue = Math.round(hueToRGB(p, q, h - 1 / 3) * 255);

    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  }

  render() {
    return (
      <div className="flex justify-center">
        <div className="flex overflow-hidden w-3/4 pt-4">
          <div className="pt-8 pb-8 relative z-10 lg:w-full" style={{ backgroundImage: this.state.bgGradient }}>
            <svg
              className="lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2 hidden-on-mobile"
              fill={this.state.bgColor}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="font-extrabold tracking-tighter pb-4 text-5xl">
                  {msg('home.audioControls')}
                </h1>
                <p
                  className="text-base sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0"
                  style={{ color: this.state.textColor }}
                  dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
                />
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <form className="w-11/12">
                    <label
                      className="uppercase font-bold text-lg"
                      style={{ color: this.state.textColor }}
                      htmlFor="volume-slider"
                    >
                      Audio
                      Volume:
                      {' '}
                      {this.props.volume}
                      %
                    </label>
                    <div className="pt-1">
                      <input
                        onChange={this.onInput}
                        value={this.props.volume}
                        className="rounded-lg overflow-hidden appearance-none bg-gray-200 h-4 w-full main-vol-slider common-rounded"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

          <div className="hidden-on-mobile lg:w-4/5 lg:ml-auto">
            <div className="flex justify-end h-auto">
              <img className="h-auto lg:h-full object-cover serverimage" alt="" />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(AudioVolume);

function mapStateToProps(state) {
  return {
    volume: state.settings.normalVolume,
    settings: state.settings,
  };
}
