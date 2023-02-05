import React from 'react';
import './staticFooter.css';

export class StaticFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"staticFooter"}>
                {this.props.children}
            </div>
        );
    }

}