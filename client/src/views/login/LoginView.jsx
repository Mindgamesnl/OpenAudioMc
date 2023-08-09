import React from 'react';
import { BlackoutPage } from '../../components/layout/BlackoutPage';
import { StaticFooter } from '../../components/footer/StaticFooter';
import { VERSION } from '../../index';
import { compareProdVersions } from '../../client/util/versioning';
import { PlatformSelection } from './platforms/PlatformSelection';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versionDiff: 'loading...',
    };
  }

  async componentDidMount() {
    try {
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
    return (
      <BlackoutPage coverImage="/assets/bg.png">

        <div className="flex flex-col items-center justify-center h-full w-full">
          <PlatformSelection />
        </div>

        <StaticFooter>
          <a href="https://openaudiomc.net/docs/client_major_changelog" className="text-white">
            build
            {' '}
            {VERSION.build}
            <small
              className={`pl-2 ${this.state.versionDiff.color}`}
            >
              (
              {this.state.versionDiff.text}
              )
            </small>
          </a>
        </StaticFooter>
      </BlackoutPage>
    );
  }
}
