import React from "react";
import DebugPanel from "../../../../components/debugging/DebugPanel";
import {
    feedDebugValue,
    getDebugLog,
    getDebugValues,
    getLatestDebugValue
} from "../../../../client/services/debugging/DebugService";
import {OaStyleCard} from "../../../../components/card/OaStyleCard";
import {VERSION} from "../../../../index";
import {getGlobalState} from "../../../../state/store";
import {Radar} from "../../../../components/graph/Radar";
import {WorldModule} from "../../../../client/services/world/WorldModule";
import {VoiceModule} from "../../../../client/services/voice/VoiceModule";
import MixerStateView from "../../../../components/mixer/MixerStateView";
import {LogViewer} from "../../../../components/logs/DebugLogComponent";
import {connect} from "react-redux";

export class DebugPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radarTask: null,
            graphTask: null,
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
            ],
            playerLocation: {},
            speakers: [],
            peers: [],
            panels: [],
        }
    }

    componentDidMount() {
        this.setState({
            radarTask: setInterval(() => {
                if (this.props.voiceState.peersHidden) return;
                this.setState({
                    playerLocation: {x: WorldModule.player.location.x,
                        y: WorldModule.player.location.y,
                        z: WorldModule.player.location.z,
                        yaw: WorldModule.player.yaw,
                    },
                    peers: VoiceModule.getPeerLocations(),
                    speakers: WorldModule.getSpeakerLocations()
                })
            }, 50),
            graphTask: setInterval(() => {
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

                this.setState({
                    panels: panels
                })
            }, 500)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.radarTask);
        clearInterval(this.state.graphTask);
    }

    render() {
        let log = getDebugLog();

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
                    {this.state.panels}


                    <OaStyleCard title={"Spatial Rendering"}>
                        <Radar player={this.state.playerLocation} entities={this.state.peers} speakers={this.state.speakers} />/>
                        <p className={"text-black"}>My location X:{this.state.playerLocation.x} Y:{this.state.playerLocation.y} Z:{this.state.playerLocation.z}</p>
                        {this.state.peers.length === 0 && <p>
                            <i className={"text-black"}>No peers in range or peers are hidden</i>
                        </p>}
                    </OaStyleCard>

                    <OaStyleCard title={"Logs"} width={"2"} noPadding={true}>
                        <LogViewer log={log}/>
                    </OaStyleCard>

                    <MixerStateView />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(DebugPage);
function mapStateToProps(state) {
    return {
        voiceState: state.voiceState,
    };
}