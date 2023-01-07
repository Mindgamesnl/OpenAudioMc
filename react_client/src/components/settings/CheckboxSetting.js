import React from "react";
import PropTypes from "prop-types";

export class CheckboxSetting extends React.Component {
    render() {
        return (
            <div className="content-card settings-card">
               <span className={"inline"}>
                <div dangerouslySetInnerHTML={{__html: this.props.icon}} className={"inline"}/>
                   {this.props.title}
                </span>
                <div className="content-card-content content-card-content-border-bottom">
                    {this.props.description}
                </div>
                <div className="content-card-buttons">
                    <label className="content-pill status-button">
                        <input type="checkbox" className={"inline mr-2"} checked={this.props.isChecked}
                               onChange={this.props.onChange}/>
                        <span className={"inline"}>{this.props.buttonText}</span>
                    </label>
                </div>
            </div>
        );
    }
}

CheckboxSetting.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    buttonText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}