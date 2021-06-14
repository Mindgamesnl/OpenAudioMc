export function DoBetaWelcome(openAudioMc) {

    if (!openAudioMc.isPatreon) {
        Swal.fire({
            title: 'Welcome to beta voice chat!',
            html: `
            <b>Its finally here!</b><br />
            A server administrator got their hands on the voice chat beta, so welcome to the cool kids club!
            <br />
            Please let us know what you think in our <u><a href="https://discord.openaudiomc.net/">Discord</a></u>, we'd love to hear your feedback, or unlock more slots by supporting the project on Patreon (which also removes this message) <a href="https://www.patreon.com/bePatron?u=536149" data-patreon-widget-type="become-patron-button">Become a Patron!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
            <h1>enjoy!</h1>
            `,
            imageUrl: 'https://media.hearthpwn.com/attachments/96/921/tada.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'TADAAAA',
            backdrop: '',
            allowOutsideClick: false,
        })
    }
}
