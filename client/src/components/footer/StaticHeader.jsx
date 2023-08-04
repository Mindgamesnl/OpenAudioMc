import React from 'react';
import './staticFooter.css';

export class StaticHeader extends React.Component {

    render() {
        return (
            <div {...this.props} className={"staticHeader"}>
                {this.props.children}
            </div>
        );
    }

}