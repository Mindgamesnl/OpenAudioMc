<html lang="en">

<head>

	<!-- OpenAudioMC by Mindgamesnl -->

	<!-- Title -->
	<title>OpenAudioMC</title>

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/animate.css" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.css" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.min.css" />
	<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
	<link href='http://fonts.googleapis.com/css?family=Raleway:500' rel='stylesheet' type='text/css'>
	<link href="css/ui2.css" rel="stylesheet" />

	<!-- META -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<!-- ICON -->
	<link rel="icon" href="Images/small_logo.png" />
	<link rel="image" href="Images/small_logo.png" />

	<!-- JS -->
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script src="main/Soundmanager2.js"></script>
	<script src="dist/sweetalert.min.js"></script>
	<script type="text/javascript" src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
	<script src="main/main.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="messages/messages.js"></script>

	<!-- PHP -->
	<?php
	//Only include when client IS NOT a streaming device
	if (htmlspecialchars(strip_tags($googlecast), ENT_QUOTES, 'UTF-8') != true) {
		echo '<script src="main/openaudiomc-tv.js"></script>';
	}
	?>
		<script>
			mcname = "<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
			wshost = "<?= htmlspecialchars(strip_tags($sport), ENT_QUOTES, 'UTF-8'); ?>";
			googlecastmode = "<?= htmlspecialchars(strip_tags($googlecast), ENT_QUOTES, 'UTF-8'); ?>";
		</script>

</head>

<body>
	<div id="faders"></div>
	<div class="middlePage">
		<input type="range" min="0" id="fade_slider" value="20" max="100" style="display:none;" />
		<div class="page-header" id="headerparent">
			<h1 class="logo"><div id="display_name"><small >Hi there</small> (loading)<small>!</small></div></h1>
		</div>

		<div class="panel panel-info make-it-slow">
			<div class="panel-heading" id="streaming_status">
				<i class="fa fa-wifi fa-1x" aria-hidden="true"></i>
				<div id="streaming_text" style="display:inline;">Currently streaming to: <i>%device%</i></div>
				<div class="close-streaming"><i onclick='stopallstraming();' class="fa fa-times" aria-hidden="true"></i></div>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-md-4">
						<center><img id="face" src="https://crafatar.com/avatars/<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>"></center>
					</div>
					<div class="col-md-8" style="border-left:1px solid #ccc;height:160px">
						<form class="form-horizontal">
							<fieldset>
								<div id="cogparent"><img class="btn-clipboard2 streamingLogo" id="cast_logo" src="Images/google-cast-logo.png" onclick="startCasting();"></img><i class="btn-clipboard fa fa-cog fa-2x" onmouseover="this.className='draai btn-clipboard fa fa-cog fa-2x';" onmouseout="this.className='btn-clipboard fa fa-cog fa-2x';"
										data-toggle="modal" data-target="#settings" aria-hidden="true"></i></div>
								<h3 id="status">Status: <font style="color:green;">Loading</font></h3>
								<hr />
								<div id="voltextparant">
									<div id="volume"><small>Volume:</small> 20%</div>
								</div>

								<div id="sliderparant">
									<div class="slider"><input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';" /></div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div id="MessageManager" onclick='document.getElementById("MessageManager").className = "animated bounceOutUp";'>
			<div class="animated bounceInDown">
				<div class="alert white-bg" style="color:black;">
					<div style="display: inline;">
						<font size="+1">
							Last message:
							<div id="messageContent" style="display: inline;"></div>
							<center>
								<p>(Click to close)</p>
							</center>
						</font>
					</div>
				</div>
			</div>
		</div>

		<div id="LiveBox">
			<div class="animated bounceInDown">
				<div class="alert white-bg" style="color:black;">
					<center>

						<b><h3 style="color:#F44336;">LIVE <img src="Images/red-dot-md.png" class="animated infinite flash" style="height:20px;"></h3></b>
						<hr />
						<h4>You are listening to our awesome radio stream!</h4>

						<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";' style="background: #009688; color:white;" class="btn btn-primary">Close</button>
						<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";soundManager.stop("live");soundManager.destroySound("live");' style="background: #C62828; color:white;" class="btn btn-primary">Stop</button>
				</div>
				</center>
			</div>
		</div>

	</div>


	<div id="settings" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Settings</h4>
				</div>
				<div class="modal-body">
					<hr />
					<input type="checkbox" name="EnableBrowserNotifications" id="EnableBrowserNotifications" checked/> Enable browser nofifications.<br />
					<input type="checkbox" name="EnableSoundFading" id="EnableSoundFading" checked/> Enable sound fading when available.
					<p style="display:inline;">May cause performance issues</p>
					<hr />
					<b>*TIP* Did you know that you can use <i>/volume [number]</i> to change the volume in the server?</b>
					<hr />
					<p>
						OpenAudioMC, the free and easy to use audio server and client.
					</p>
					<i class="fa fa-github fa-3x" aria-hidden="true" onclick="window.open('https://github.com/Mindgamesnl/OpenAudioMc')"></i>
					<i class="fa fa-comment fa-3x" aria-hiddenk="true" onclick="window.open('https://www.spigotmc.org/resources/openaudiomc.30691/')"> </i>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</body>

</html>