<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>Spigot documentation</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; width=device-width;">
	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
</head>

<body>
	<div class="table-title">
		<h3>
			Bukkit API documentation
		</h3>
	</div>
	<table class="table-fill">
		<thead>
			<tr>
				<th class="text-left">Goal</th>
				<th class="text-left">Code</th>
			</tr>
		</thead>
		<tbody class="table-hover">
			<tr>
				<td class="text-left">Import api</td>
				<td class="text-left"><pre class="prettyprint">import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;</pre></td>
			</tr>
			<tr>
				<td class="text-left">Play sound</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.playSound(Player, "http://your.site/sound.mp3");</pre></td>
			</tr>
			<tr>
				<td class="text-left">Stop sound</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.stopSound(Player);</pre></td>
			</tr>
			<tr>
				<td class="text-left">Send message</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.sendMessage(Player, "My cool message");</pre></td>
			</tr>
			<tr>
				<td class="text-left">Switch server</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.switchServer(Player, "New socket host");</pre></td>
			</tr>
			<tr>
				<td class="text-left">Kick player</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.kickPlayer(Player);</pre></td>
			</tr>
			<tr>
				<td class="text-left">Set bg immage</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.setBg(Player, "http://your.site/image.png");</pre></td>
			</tr>
			<tr>
				<td class="text-left">Set volume to 50%</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.setVolume(Player, 50);</pre></td>
			</tr>
			<tr>
				<td class="text-left">Play for player in worldguard region</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.playRegion("My_awesome_region", "http://your.site/sound.mp3");</pre></td>
			</tr>
			<tr>
				<td class="text-left">Get session key of player (returns a string)</td>
				<td class="text-left"><pre class="prettyprint">OpenAudioApi.getSessionKey(Player);</pre></td>
			</tr>
		</tbody>
	</table>


</body>