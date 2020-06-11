# Hosted Client
OpenAudioMc gives you the option to host your own client, however, there are some caveats
- You will become responsible for frequent updates, meaning that you have to update your webclient regularly.
- You will have to follow the rules as described [here](https://github.com/Mindgamesnl/OpenAudioMc/blob/master/LICENCE_and_PRIVACY.md).
- We do not recommend that you host the client yourself and will not help you setting it up aside from this document.

# Setup
1. Clone the OpenAudioMc [repository](https://github.com/Mindgamesnl/OpenAudioMc) (or download it as a zip file) 
2. Upload the pre-compiled client (in `docs/client/`) to your webserver.
3. Open [OpenAudioMc+](OpenAudioMc+.md), go to the settings page and change the client url to where you uploaded yours, then save.
4. Execute `/oa reload`
5. Generate a new URL by re-joining the server.

# Compiling your own JS bundle
Requirements:
 - A system running MacOS (mojave or newer)
 - NodeJS & NPM
 
 To compile
 1. Clone the OpenAudioMc [repository](https://github.com/Mindgamesnl/OpenAudioMc) (or download it as a zip file)
 2. Navigate to `client/`
 3. Install dependencies running `npm install`
 4. Run the build-script running `npm run-script build`
 5. Your new custom build will appear in the `target` directory, follow the setup instructions to set it up. 