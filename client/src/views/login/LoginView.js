import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import {StaticFooter} from "../../components/footer/StaticFooter";
import {VERSION} from "../../index";
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {LoginForm} from "../../components/loginform/LoginForm";

export class LoginView extends React.Component {

    render() {
        return (
            <BlackoutPage>
                <div className="py-12">
                    <OaStyleCard title={"Invalid session"} isDanger={true} body={<LoginForm />} fullWidth={true} />
                </div>
                <StaticFooter>
                    <a href={"https://openaudiomc.net/docs/client_major_changelog"} className={"text-white"}>build {VERSION.build}</a>
                </StaticFooter>
            </BlackoutPage>
        );
    }
}