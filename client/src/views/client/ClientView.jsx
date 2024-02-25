import React from 'react';
import { connect } from 'react-redux';
import TabWindow, { TabPage } from '../../components/tabwindow/TabWindow';
import AudioPage from './pages/audio/AudioPage';
import VoicePage from './pages/voice/VoicePage';
import ResetLanguageBanner from '../../components/language/ResetLanguageBanner';
import SettingsPage from './pages/settings/SettingsPage';
import { LoadingSpinnerBox } from '../../components/loading/LoadingSpinnerBox';
import { GrayoutPage } from '../../components/layout/GrayoutPage';
import { StaticFooter } from '../../components/footer/StaticFooter';
import { InputModal } from '../../components/modal/InputModal';
import { CogSVG } from '../../components/icons/cog';
import { DebugSVG } from '../../components/icons/debug';
import { getTranslation } from '../../client/OpenAudioAppContainer';
import { OaStyleCard } from '../../components/card/OaStyleCard';
import DebugPage from './pages/debug/DebugPage';
import { MusicNoteSvg } from '../../components/icons/musicnote';
import { VoiceChatSvg } from '../../components/icons/voicechat';

function ClientView(props) {
  const { title, message, footer } = props.loadingOverlay;

  return (
    <div className="app">
      <div className="wrapper">
        <TabWindow>
          <TabPage
            name={getTranslation(null, 'navbar.audio')}
            content={<AudioPage />}
            buttonContent={<MusicNoteSvg />}
            subtext={props.hasPlayingMedia ? getTranslation(null, 'navbar.isPlaying') : null}
            colorWhenHasSubtext
          />
          <TabPage
            name={getTranslation(null, 'navbar.vc')}
            hidden={!props.voiceState.ready}
            buttonContent={<VoiceChatSvg />}
            content={<VoicePage />}
            subtext={Object.keys(props.voiceState.peers).length > 0 ? `${Object.keys(props.voiceState.peers).length} ${
              Object.keys(props.voiceState.peers).length === 1 ? getTranslation(null, 'vc.person')
                : getTranslation(null, 'vc.people')
            }` : null}
            colorWhenHasSubtext
          />
          <TabPage
            name={getTranslation(null, 'navbar.settings')}
            hidden={!props.navbarDetails}
            buttonContent={<CogSVG />}
            content={<SettingsPage />}
          />
          <TabPage
            name={getTranslation(null, 'navbar.debug')}
            hidden={!props.debugMode}
            buttonContent={<DebugSVG />}
            content={<DebugPage />}
          />
        </TabWindow>
      </div>

      {props.loadingOverlay.visible ? (
        <GrayoutPage>
          {props.browserSupportIsLimited ? (
            <OaStyleCard title="">
              {getTranslation(null, 'vc.operaWarning')}
            </OaStyleCard>
          ) : null}
          <LoadingSpinnerBox
            title={title}
            message={message}
            footer={footer}
          />
        </GrayoutPage>
      ) : null}
      <ResetLanguageBanner />

      {props.fixedFooter ? <StaticFooter>{props.fixedFooter}</StaticFooter> : null}
      {props.inputModal.visible ? <InputModal /> : null}
    </div>
  );
}

export default connect(mapStateToProps)(ClientView);

function mapStateToProps(state) {
  return {
    debugMode: state.debug,
    inputModal: state.inputModal,
    fixedFooter: state.fixedFooter,
    loadingOverlay: state.loadingOverlay,
    voiceState: state.voiceState,
    browserSupportIsLimited: state.browserSupportIsLimited,
    navbarDetails: state.navbarDetails,
    hasPlayingMedia: state.hasPlayingMedia,
  };
}
