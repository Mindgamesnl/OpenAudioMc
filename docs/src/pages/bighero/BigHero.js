import React from "react";
import "./bighero.css"
export class BigHero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [
                {
                    text: "Community Interaction",
                    description: "Allow community members to interact with others using spatial proximity voice chat.",
                },
                {
                    text: "Player Experience",
                    description: "Add unique music and location-based sound effects to make your server feel alive.",
                },
                {
                    text: "Server Identity",
                    description: "Make your server stand out from the crowd, unique voice chat and music experience.",
                }
            ],
            logos: [
                {
                    img: "/assets/yardlogo.jpg",
                    url: "https://www.patreon.com/theyard"
                },
                {
                    img: "/assets/imaginefun.png",
                    url: "https://imaginefun.net/"
                },
                {
                    img: "/assets/rinaorc.png",
                    url: "https://rinaorc.com/"
                },
            ],
            currentWord: 0,
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 3500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        let nextIndex = this.state.currentWord + 1;
        if (nextIndex >= this.state.words.length) {
            nextIndex = 0;
        }
        this.setState({
            currentWord: nextIndex,
        })
    }

    render() {

        let logoCount = this.state.logos.length;
        let logoStyle = "mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-" + logoCount;

        return (
            <div className="bg-gray-50">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-y-0 h-full w-full server-pic-bg" aria-hidden="true">
                        <div className="blur"></div>
                    </div>

                    <div className="relative pt-6 pb-16 sm:pb-24">
                        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block text-indigo-300">Supercharge your</span>
                                    <span className="block text-indigo-100">{this.state.words[this.state.currentWord].text}</span>
                                </h1>
                                <p className="mx-auto mt-3 max-w-md text-base text-gray-100 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                                    {this.state.words[this.state.currentWord].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
                            <div className="flex-1"></div>
                            <div className="w-full flex-1 bg-gray-800"></div>
                        </div>
                        <div className="mx-auto max-w-7xl">
                            <img className="relative rounded-lg shadow-lg"
                                 src={"/assets/screenshot.jpeg"}
                                 alt="App screenshot" />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800">
                    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                        <h2 className="text-center text-base font-semibold text-gray-400">
                            Follow over 80,000 other servers, or try it out on one of these
                        </h2>
                        <div className={logoStyle}>
                            {this.state.logos.map((logo) => {
                                return (
                                    <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                        <a href={logo.url}>
                                            <img className="h-12 logomask" src={logo.img}
                                                 alt={logo.img.substring(logo.img.lastIndexOf("/") + 1).split("\.")[0]} key={logo.img} />
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

    )
    }
}