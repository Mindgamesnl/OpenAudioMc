import React from "react";
import DebugPanel from "../../../../components/debugging/DebugPanel";
import {feedDebugValue, getDebugValues, getLatestDebugValue} from "../../../../client/services/debugging/DebugService";

export default class DebugPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: null,
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
        for (let debugValuesKey in values) {
            // feed latest value to increment time
            let latest = getLatestDebugValue(debugValuesKey);
            if (latest == null) latest = 0;
            panels.push(<DebugPanel title={debugValuesKey} data={values[debugValuesKey]} catchLine={"Latest:" + latest} key={debugValuesKey}/>)
            feedDebugValue(debugValuesKey, latest)
        }

        return (
            <div className="flex flex-wrap">
                {panels}
            </div>
        );
    }
}