# OpenAudioMc Licence 2020-2021 [![Build Status](https://travis-ci.org/Mindgamesnl/OpenAudioMc.svg?branch=master)](https://travis-ci.org/Mindgamesnl/OpenAudioMc)

### Document introduction
This document will go over all types of data as processed and/or stored and discloses their purpose, for how long they will be stored and who gets to see them.
This document is subject to change as the service grows with time. Changes will be linked to their corresponding update and mentioned in the Discord server as they happen.

Extra rules and terms are listed at the end of this document.
This document overrides the license as used before May 20th, 2020 at 7 PM (UTC+2)

## Definitions
- The author of this document uses the term **I** and **me** to reference me, Mindgamesnl, as the author of OpenAudioMc.
- I use the term **Craftmend Account** to reference personal accounts made on https://account.craftmend.com/
- I use the term **Client** to reference any user using the website to listen to music or have it idle in the background.
- I use the term **Player** to reference any Minecraft-Player who **is** online on your server.
- I use the term **OA** to reference the OpenAudioMc project.
- I use the term **Data** to describe any (stored) information used as input into OpenAudioMc (automatically by systems or manually by a Player)
- I use the term **Stored** to describe data as being saved on our site, regardless of session duration.
- I use the term **Server** to reference a Minecraft server or the current Minecraft server where a Player is online when used in the context of one.
- I use the term **Player UUID** to reference a unique identifier to a Minecraft account owned by the Player, as provided by Mojang and/or Microsoft.
- I use the term **Client settings** to reference settings accessed through Craftmend Accounts.
- I use the term **Server-Authentication** or **Account** to describe a set of two UUID's to authenticate and acknowledge your server and be used as Tokens.
- I use the term **Ban** to describe the issue of a statement to deny service to a specific Server based on their Server Authentication.
- I use the term **Voice Chat** to describe the online calling feature (proximity voice chat), and its underlying services
- I use the term **Stream ID** to reference a Player-bound unique ID that directly points to their voice stream (if enabled)

## Processed and Stored Data
- **Server-Authentication**: These tokens are stored indefinitely and are randomly generated based. These tokens have timestamps attached to them (date and time of creation) but are not stored with other information about the request (IP, or other)
- **Client Settings**: Any provided Client Settings are stored indefinitely in relation to your Server-Authentication (as described in the first bullet under "Processed Data"). The Client Url setting may be monitored when changed to check whether the specific client installation complies with the Terms (as described below). This is a semi-automatic process, where it only notifies Me when it changed, I then review the page manually and decide to issue a ban or not. (These terms are listed at the end of this document)
- **Online Players**: The Server Authentication stores a list of the Player Names, Session tokens, Connection state and Player UUID's for everyone online on a Minecraft server that has OpenAudioMc installed. This data will be linked to a Craftmend Account if one is linked to the server (these sessions get cleared every time your server restarts or player disconnects)
- **Fatal client errors**: Fatal client errors get logged in a private Discord channel where OpenAudioMc staff can look to assist in the help channel.  This channel gets cleared every week. Logged data contains The player name whose client ran into a problem, the exact js error message and code, and the source that caused the issue (if applicable). This information will not be shared with third parties.
- **Craftmend Accounts**: Craftmend accounts store and process provided information (email, password, addon activation codes etc) for functional purposes and aren't shared with third parties by me. (API keys can be used to expose some of this data, but the distribution of the key is up to you and your own responsibility)
- **Voice Chat**: VoiceChat uses data from your Craftmend Account and Online Players to provide its service. Audio streams **do not** get recorded, but the most recent second of audio will get saved in memory for functional reasons (buffering).
- **Dead Servers**: OpenAudioMc installations that haven't been active for over a month **and** aren't linked to a craftmend account will automatically be deleted, rendering the installation dead. OpenAudioMc installations *with* linked craftmend accounts are allowed two months of inactivity (unless they have addons installed, in which case they will never be deleted)

## Purchases
Purchases made through craftmend accounts (on https://account.craftmend.com/) or other services/sites owned/endorsed by the openaudiomc project or Mindgamesnl fall under the same terms as described in this document.
- Some products/services are timed. This means that they'll be valid for a set amount of days, starting on the day when you (the user/admin) manually activate their installation. Every following day counts, regardless of the usage of the product/service (but exceptions may be made for issues outside of your control).
- Purchases are not eligible for a refund when the owning account has been banned, blocked, or otherwise limited for violating one or more rules or participating in other behaviour related to OpenAudioMc that may be considered unacceptable.
- Purchases/services may be disabled by an OpenAudioMc team member without prior warning if/when the owning account (or owner of that account) violates one or more project terms/rules or participate in other behaviour related to OpenAudioMc that may be considered unacceptable.
- Unannounced payment chargebacks will cause the product (and service) to be blocked for the entire account and may limit account functionality.
- Purchases and payments are handled by a third party (https://www.mollie.com/en), and I am not responsible for any failures or errors on their end. Purchases and other actions related to bank transactions or payments depend on the functioning of their platform as expected.



## Other terms, Notes and Rules
- All services and features OpenAudioMc provides for free (so that's excluding partner and/or features through addons) may not be locked behind a paywall of any kind. Examples:
   1. You may not lock OpenAudioMc permissions behind paid ranks
   2. You may not restrict access to the web client based on rank, unless it's for selected testing purposes.
- Every Minecraft server is allowed to host their own installation of the web client, given that it meets the following demands.
   1. The website has an unchanged and readable OpenAudioMc copyright notice in the footer.
   2. The website is not modified to function in ways that contradicts the needs of a Player (abuse, spam and related)
   3. The website does not communicate to the OpenAudioMc servers that fall out of protocol (or as released in any current/previous public release/beta build)
- The Java plugin may be altered for as long as it does not harm Players or any other OpenAudioMc related services.
- Disobeying one or more rules, terms or notes may result in the termination or a "Ban" of your OpenAudioMc installation or complete craftmend account.
- The use of OpenAudioMc's backend servers always follows the rules and privacy statement as in the latest version of this document, no matter the released version use of the individual. Mocking these servers is not allowed except for Development purposes.
- I do not provide any warranty and/or uptime guarantees for any of OpenAudioMc's backend services or infrastructure, but will go with my best effort. (doesn't apply for partnerships with whom I made a specific agreement)
- I do not have to disclose a reason for a ban publicly or privately.
- I decide whether a Ban is necessary and or deserved for any reason given in this document or as stated in the context of the ban.
- https://craftmend.com/ (and its sub domains), https://openaudiomc.net/ (and its sub domains) and the original author of the OpenAudioMc project an are not responsible for user content of any kind (text, external links, voice data, etc.)

## Rights
Users have the rights to get a full copy of their data and have all of their data removed through the GDPR.
Please contact me (Mindgamesnl) in the OpenAudioMc Discord if you wish to do any of the above, or to terminate your account. (I will ask you to send proof of account ownership, either through a digital fingerprint or email confirmation).

## Ending notes
Spelling errors and changes reserved,
Mindgamesnl 10th of February
2021

I am not a lawyer, nor do I claim to be one.
I'm just a nerd with a computer.
