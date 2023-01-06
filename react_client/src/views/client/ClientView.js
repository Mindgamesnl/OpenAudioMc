import React from "react";
import {TabPage, TabWindow} from "../../components/tabwindow/TabWindow";
import {AudioPage} from "./pages/AudioPage";

export class ClientView extends React.Component {
  render() {
    return (
        <div className="app">
            <div className="wrapper">
                <TabWindow>
                    <TabPage name="Audio" content={<AudioPage />}/>
                    <TabPage name="About" content={<div>About</div>}/>
                    <TabPage name="Contact" content={<div>Contact</div>}/>
                </TabWindow>
            </div>
        </div>
    );
  }
}