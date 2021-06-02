import {LoadLibrary} from "../../../helpers/libs/LibraryLoader";

export function DoBetaWelcome() {

    let lastCallToAction = Cookies.get("vc-beta-call-to-action");
    if (lastCallToAction != null) {
        return
    }

    LoadLibrary("https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js", () => {
        window.confetti.start(2500);

        Swal.fire({
            title: 'Welcome to beta voice chat!',
            html: `
            <b>Its finally here!</b><br />
            A server administrator got their hands on the voice chat beta, so welcome to the cool kids club!
            <br />
            Please let us know what you think in our <u><a href="https://discord.openaudiomc.net/">Discord</a></u>, we'd love to hear your feedback, or <a href="https://donate.craftmend.com">consider donating if you want to support further development and help to keep the service free</a>
            <h1>enjoy!</h1>
            `,
            imageUrl: 'https://media.hearthpwn.com/attachments/96/921/tada.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'TADAAAA',
            backdrop: '',
            allowOutsideClick: false,
        })
    })

    Cookies.set("vc-beta-call-to-action", true);

}
