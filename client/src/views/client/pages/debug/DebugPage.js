import React from "react";
import DebugPanel from "../../../../components/debugging/DebugPanel";
import {feedDebugValue, getDebugValues, getLatestDebugValue} from "../../../../client/services/debugging/DebugService";
import {OaStyleCard} from "../../../../components/card/OaStyleCard";
import {VERSION} from "../../../../index";
import {getGlobalState} from "../../../../state/store";

export default class DebugPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: null,
            clearColors: [
                "Crimson",
                "Navy",
                "blue",
                "red",
                "purple",
                "brown",
                "green",
                "grey",
                "magenta",
            ]
        }
    }

    componentDidMount() {
        this.setState({
            task: setInterval(() => {
                this.forceUpdate();
            }, 500)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.task);
    }
    render() {
        let panels = []
        let values = getDebugValues();

        // sort values by name
        let keys = Object.keys(values);
        keys.sort();
        let sortedValues = {};
        for (let key of keys) {
            sortedValues[key] = values[key];
        }
        values = sortedValues;

        let ci = 0;
        for (let debugValueName in values) {
            // feed latest value to increment time
            let stat = values[debugValueName];
            let latest = getLatestDebugValue(stat);
            if (latest == null) latest = 0;
            panels.push(<DebugPanel title={debugValueName} color={this.state.clearColors[ci]} fill={stat.fill} data={stat.values} catchLine={"Latest:" + latest} key={debugValueName}/>)
            if (!stat.advancesItself) {
                feedDebugValue(stat, latest); // advance time
            }
            ci++;
            if (ci >= this.state.clearColors.length) ci = 0;
        }

        return (
            <div className={"w-full h-full flex flex-col"}>
                <div className="flex flex-wrap">
                    <OaStyleCard title={"whoami"} isDanger={true} dark={true}>
                        <p className={"text-white"}>Welcome to the debugging page. You can toggle this tab by pressing <i className={"text-blue-100"}>d</i></p>
                        <hr />
                        <p className={"text-white"}><b>Build:</b> <i className={"text-blue-200"}>{VERSION.build}</i></p>
                        <p className={"text-white"}><b>Build date:</b> <i className={"text-blue-200"}>{VERSION.date}</i></p>
                        <p className={"text-white"}><b>Build tag:</b> <i className={"text-blue-200"}>{VERSION.tag}</i></p>
                        <p className={"text-white"}><b>Player:</b> <i className={"text-blue-200"}>{getGlobalState().currentUser.userName}</i></p>
                    </OaStyleCard>
                    {panels}
                </div>
            </div>
        );
    }
}