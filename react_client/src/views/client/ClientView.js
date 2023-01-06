import React from "react";
import {TabPage, TabWindow} from "../../components/tabwindow/TabWindow";
import {AudioPage} from "./pages/audio/AudioPage";
import {VoicePage} from "./pages/voice/VoicePage";

export class ClientView extends React.Component {
  render() {
    return (
        <div className="app">
            <div className="wrapper">
                <TabWindow>
                    <TabPage name="Audio" content={<AudioPage />}/>
                    <TabPage name="VoiceChat" content={<VoicePage />}/>
                    <TabPage name="Contact" content={<div>Contact</div>}/>
                </TabWindow>
            </div>
        </div>
    );
  }
}