# OpenAudioMc Licence 2020 [![Build Status](https://travis-ci.org/Mindgamesnl/OpenAudioMc.svg?branch=master)](https://travis-ci.org/Mindgamesnl/OpenAudioMc)

### Document introduction
This document will go over all types of data as processed and/or stored and discloses their purpose, for how long they will be stored and who gets to see them.
This document is subject to change as the service grows with time. Changes will be linked to their corresponding update and mentioned in the Discord server as they happen.

Extra rules and terms are listed at the end of this document.
This document overrides the license as used before May 20th, 2020 at 7PM (UTC+2)

## Definitions
 - The author of this document uses the term **I** and **me** to reference me, Mindgamesnl, as the author of OpenAudioMc.
 - I use the term **Client** to reference any user using the website to listen to music or have it idle in the background.
 - I use the term **Player** to reference any Minecraft-Player who **is** online on your server.
 - I use the term **OA** to reference the OpenAudioMc project.
 - I use the term **Data** to describe any (stored) information used as input into OpenAudioMc (automatically by systems or manually by a Player)
 - I use the term **Stored** to describe data as being saved on our side, regardless of session duration.
 - I use the term **Server** to reference a Minecraft server, or the current Minecraft server where a Player is online, when used in context of one.
 - I use the term **OpenAudioMc Plus** or **OA Plus** to reference the OpenAudioMc-Plus web administration panel at https://plus.openaudiomc.net/
 - I use the term **Player UUID** to reference a unique identifier to a Minecraft account owned by the Player, as provided by Mojang and/or Microsoft.
 - I use the term **Client settings** to reference settings in the OpenAudioMc Plus platform,  provided by a Player with administrative rights.
 - I use the term **Server-Authentication** or **Account** to describe a set of two UUID's to authenticate and acknowledge your server and be used as Tokens.
 - I use the term **Ban** to describe the issue of a statement to deny service to a specific Server based on their Server Authentication.
 
## Processed and Stored Data
 - **Server-Authentication**: These tokens are stored indefinitely and are randomly generated based. These tokens have timestamps attached to them (date and time of creation) but are not stored with other information about the request (IP, or other)
 - **Plus-Authentication**: OA Players who have administrative-rights can access the OpenAudioMc Plus get a unique token assigned to login to the OA Plus panel. this token is associated with their Player Username, Player UUID, A four-character string for verification, the public-and private key of the Server and date of creation. This token gets deleted as soon as the Player quits their session and closes Minecraft. This token is only public to those who received the URL from the command, but can be looked up by me for customer support reasons (only when the player explicitly gives to me their Player UUID and Server-Authentication)
 - **Client Settings**: Any provided Client Settings are stored indefinitely in relation to your Server-Authentication (as described in the first bullet under "Processed Data"). The Client Url setting may be monitored when changed to check whether the specific client installation complies with the Terms (as described below). This is a semi-automatic process, where it only notifies Me when it changed, I then review the page manually and decide to issue a ban or not. (These terms are listed at the end of this document)
 - **Online Players**: OpenAudioMc Plus stores a list of the Player Names, OpenAudioMc-Tokens and Player UUID's for everyone online on a Minecraft server that has OpenAudioMc installed **AND** player synchronization enabled on the OA Plus panel. Data related to a Player gets removed once they Close the game after their session, or if a Player disables the setting in OpenAudioMc Plus.
 
## Removal of references
We provide the option for Players with administrative privileges on their server to have their Server-Authentication removed along with all the other Data linked to it (settings and possibly active tokens). Please contact Me (Mats, Mindgamesnl) through the OpenAudioMc Discord (https://discord.openaudiomc.net/) or via the GitHub issues. I'll ask you for your public and private key (and other validation if I deem it necessary) before deleting all traces of your servers existence on the OpenAudioMc platform.

## Other terms, Notes and Rules
 - All services and features OpenAudioMc provides for free (so that's excluding partner-specific features) may not be locked behind a paywall of any kind. Examples:
    1. You may not lock OpenAudioMc permissions behind paid ranks
    2. You may not restrict access to the web client based on rank, unless its for selected testing purposes. 
 - Every Minecraft server is allowed to host their on installation of the web-client, given that it meets the following demands.
    1. The website has an unchanged and readable OpenAudioMc copyright notice in the footer.
    2. The website is not modified to function in ways that contradicts the needs of a Player (abuse, spam and related)
    3. The website does not communicate to the OpenAudioMc servers that fall out of protocol (or as released in any current/previous public release/beta build)
 - The Java plugin may be altered for as long as it does not harm Players or any other OpenAudioMc related services.
 - Disobeying one or more rules, terms or notes may result in the termination or a "Ban" of your account.
 - The use of OpenAudioMc's backend servers always follows the rules and privacy statement as in the latest version of this document, no matter the released version use of the individual.
 - I do not have to disclose a reason for a ban publicly or privately.
 - I decide whether a Ban is necessary and or deserved for any reason given in this document or as stated in context of the ban.
 
 spelling errors and changes reserved,
 Mindgamesnl 12th of June
 2020
 
 I am not a lawyer, nor do I claim to be one.
 I'm just a nerd with a computer.