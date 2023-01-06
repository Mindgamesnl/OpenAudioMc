import React from "react";
import {TabPage, TabWindow} from "../../components/tabwindow/TabWindow";

export class ClientView extends React.Component {
  render() {
    return (
        <div className="app">
            <div className="wrapper">
                <TabWindow>
                    <TabPage name="Home" content={<div>Home</div>}/>
                    <TabPage name="About" content={<div>About</div>}/>
                    <TabPage name="Contact" content={<div>Contact</div>}/>
                </TabWindow>
            </div>
        </div>
    );
  }
}