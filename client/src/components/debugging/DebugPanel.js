import React from "react";
import {OaStyleCard} from "../card/OaStyleCard";
import PropTypes from "prop-types";
import {Graph} from "../graph/Graph";

export default class DebugPanel extends React.Component {

    render() {
        let data = this.props.data;

        let highest = null;
        let lowest = null;
        let total = 0;
        let average = 0;
        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            if  (highest == null) highest = value;
            if (lowest == null) lowest = value;
            if (value > highest) highest = value;
            if (value < lowest) lowest = value;
            total += value;
            average = total / data.length;
        }

        return (
            <OaStyleCard title={this.props.title}>
                <Graph catchLine={this.props.catchLine} data={data} />
                <table className="w-full text-black">
                    <tbody>
                    <tr>
                        <td className="text-left">Highest</td>
                        <td className="text-right">{highest}</td>
                    </tr>
                    {lowest !== 0 && <tr>
                        <td className="text-left">Lowest</td>
                        <td className="text-right">{lowest}</td>
                    </tr>}
                    <tr>
                        <td className="text-left">Average</td>
                        <td className="text-right">{average}</td>
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
    catchLine: PropTypes.string
}
