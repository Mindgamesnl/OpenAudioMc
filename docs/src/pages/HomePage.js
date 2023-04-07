import React from "react";
import {OaPage} from "../components/page/OaPage";
import {BigHero} from "./bighero/BigHero";
import {Features} from "./features/features";

export class HomePage extends React.Component {

    render() {
        return (
            <OaPage>
                <BigHero />
                <Features />
            </OaPage>
        );
    }

}