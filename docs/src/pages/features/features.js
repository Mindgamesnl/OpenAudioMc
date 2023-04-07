import React from "react";

export class Features extends React.Component {

    render() {

        let features = [
            {
                title: "Proximity Voice Chat",
                description: "Automatic location based voice chat with spatial audio support, moderation features and more. All without mods.",
            },
            {
                title: "Region Based Music",
                description: "Assign music to specific World Guard regions or worlds, to add dynamic area music to different parts of your server.",
            },
            {
                title: "Speakers",
                description: "Place speakers throughout your world, to play spatial music/effects emmitting from a block.",
            },
            {
                title: "Strong Customization",
                description: "Customize the look and feel of your Web Client with your own text, colours and images.",
            },
            {
                title: "String Platform Support",
                description: "Whether you're running Spigot, Bungeecord, Paper, Velocity, Lilypad or any combination of the above, we've got you covered.",
            },
            {
                title: "... And best of all",
                description: "OpenAudioMc runs entirely from a browser tab using a magic link. Your player's don't need to download or install anything!"
            }
        ]

        return (
            <div className={"bg-gray-900"}>
                <div className="overflow-hidden">
                    <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
                        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
                            <div className="lg:col-span-1">
                                <h2 className="text-4xl font-bold tracking-tight text-indigo-500 sm:text-4xl">
                                    <span className="block">Unique features to build whatever you want</span>
                                </h2>
                            </div>
                            <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
                                {features.map((feature, index) => {
                                    return <div key={index}>
                                        <dt>
                                            <p className="mt-6 text-lg font-semibold leading-8 text-blue-200">{feature.title}</p>
                                        </dt>
                                        <dd className="mt-2 text-base text-gray-100">
                                            {feature.description}
                                        </dd>
                                    </div>
                                })}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}