import React from "react";
import {OaStyleCard} from "../card/OaStyleCard";
import PropTypes from "prop-types";
import {Graph} from "../graph/Graph";

export default class DebugPanel extends React.Component {

    render() {
        let data = this.props.data;

        let highest = null;
        let lowest = null;
        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            if  (highest == null) highest = value;
            if (lowest == null) lowest = value;
            if (value > highest) highest = value;
            if (value < lowest) lowest = value;
        }

        return (
            <OaStyleCard title={this.props.title}>
                <Graph color={this.props.color} catchLine={this.props.title} data={data} fill={this.props.fill} />
                <table className="w-full text-black">
                    <tbody>
                    <tr>
                        <td className="text-left">Highest</td>
                        <td className="text-right">{highest}</td>
                    </tr>
                    <tr>
                        <td className="text-left">Lowest</td>
                        <td className="text-right">{lowest}</td>
                    </tr>
                    </tbody>
                </table>
            </OaStyleCard>
        );
    }

}

DebugPanel.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    catchLine: PropTypes.string,
    color: PropTypes.string,
    fill: PropTypes.bool,
}
