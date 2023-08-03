import React, { Component } from "react";

export class LogViewer extends Component {
    render() {
        const { log } = this.props;
        return (
            <div className="bg-gray-900 text-gray-400 p-4 rounded-lg h-full w-full">
                {log.map((message, index) => (
                    <div key={index}>
                        <span className="text-green-400">{"$> "}</span>
                        <span>{message}</span>
                    </div>
                ))}
            </div>
        );
    }
}
