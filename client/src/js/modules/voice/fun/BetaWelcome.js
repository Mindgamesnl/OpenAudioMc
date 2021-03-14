import {LoadLibrary} from "../../../helpers/libs/LibraryLoader";

export function DoBetaWelcome() {

    let lastCallToAction = Cookies.get("vc-beta-call-to-action");
    if (lastCallToAction != null) {
        // return
    }

    LoadLibrary("https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js", () => {
        window.confetti.start(2500);

        Swal.fire({
            title: 'Voice BETA 0.2',
            html: `
            <b>Its finally here!</b><br />
            Your client just updated to beta 0.2, adding a bunch of new features and fixing a ton of pesky bugs.
            <br />
            Please check <u>our latest blog post</u> to read up on changes and new things to look out for in the future.<br />
            Please reach out <u><a href="https://discord.openaudiomc.net/">in the OpenAudioMc Discord</a></u> if you have any questions or feedback.
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
