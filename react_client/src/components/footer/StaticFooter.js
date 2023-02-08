import React from 'react';
import './staticFooter.css';

export class StaticFooter extends React.Component {

    render() {
        return (
            <div {...this.props} className={"staticFooter"}>
                {this.props.children}
            </div>
        );
    }

}