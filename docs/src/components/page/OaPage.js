import React from 'react';
import {OaNavbar} from "../navbar/OaNavbar";
import {Footer} from "../footer/footer";

export class OaPage extends React.Component {

        render() {
            return (
                <div>
                    <OaNavbar/>
                    {this.props.children}
                    <Footer />
                </div>
            );
        }
}