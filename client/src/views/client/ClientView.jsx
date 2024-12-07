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

const SettingsPageMemo = React.memo(SettingsPage);
const DebugPageMemo = React.memo(DebugPage);
const AudioPagememo = React.memo(AudioPage);
const VoicePageMemo = React.memo(VoicePage);
const TabWindowMemo = React.memo(TabWindow);

const IconMemos = {
  Cog: React.memo(CogSVG),
  Debug: React.memo(DebugSVG),
  MusicNote: React.memo(MusicNoteSvg),
  VoiceChat: React.memo(VoiceChatSvg),
};

function ClientView(props) {
  const { title, message, footer } = props.loadingOverlay;

  return (
    <div className="app">
      <div className="wrapper">
        <TabWindowMemo>
          <TabPage
            name={getTranslation(null, 'navbar.audio')}
            content={<AudioPagememo />}
            buttonContent={<IconMemos.MusicNote />}
            colorWhenHasSubtext
          />
          <TabPage
            name={getTranslation(null, 'navbar.vc')}
            hidden={(!props.voiceReady && !props.voiceLoading && !props.voiceError)}
            buttonContent={<IconMemos.VoiceChat />}
            content={<VoicePageMemo />}
            subtext={props.voicePeerCount > 0 ? `${props.voicePeerCount} ${
              props.voicePeerCount === 1 ? getTranslation(null, 'vc.person')
                : getTranslation(null, 'vc.people')
            }` : null}
            colorWhenHasSubtext
          />
          <TabPage
            name={getTranslation(null, 'navbar.settings')}
            hidden={!props.navbarDetails}
            buttonContent={<IconMemos.Cog />}
            content={<SettingsPageMemo />}
          />
          <TabPage
            name={getTranslation(null, 'navbar.debug')}
            hidden={!props.debugMode}
            buttonContent={<IconMemos.Debug />}
            content={<DebugPageMemo />}
          />
        </TabWindowMemo>
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
    voiceReady: state.voiceState.ready,
    voiceLoading: state.voiceState.loading,
    voiceError: state.voiceState.failedGeneric,
    voicePeerCount: Object.keys(state.voiceState.peers).length,
    browserSupportIsLimited: state.browserSupportIsLimited,
    navbarDetails: state.navbarDetails,
  };
}
