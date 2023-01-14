import React from "react";
import PropTypes from "prop-types";

export class DropdownSetting extends React.Component {
    render() {
        let ops = this.props.options.map((option) => {
            return <option key={option.key} value={option.key}>{option.value}</option>;
        });

        return (
            <div className="content-card settings-card">
               <span>
                <div dangerouslySetInnerHTML={{__html: this.props.icon}} className={"inline"}/>
                   {this.props.title}
                </span>
                <div className="content-card-content content-card-content-border-bottom">
                    {this.props.description}
                </div>
                <label className={"hidden"}></label>
                <select value={this.props.value + ""} className="w-full soft-tex content-pill" onChange={this.props.onChange}>
                    { ops }
                </select>
            </div>
        );
    }
}

DropdownSetting.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}