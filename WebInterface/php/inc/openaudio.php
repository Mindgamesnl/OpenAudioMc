<!DOCTYPE html>
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
	<link href='https://fonts.googleapis.com/css?family=Raleway:500' rel='stylesheet' type='text/css'>
	<link href="css/ui2.css" rel="stylesheet" />

	<!-- META -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<!-- ICON -->
	<link rel="icon" href="Images/small_logo.png" />
	<link rel="image" href="Images/small_logo.png" />

	<!-- JS -->
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script src="main/Soundmanager2.js"></script>
	<script src="dist/sweetalert.min.js"></script>
	<script src="dist/qrcode.js"></script>
	<script src="dist/qrcode.min.js"></script>
	<script type="text/javascript" src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
	<script src="main/openaudiomc.js"></script>
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
			//username
			mcname = "<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
			//user sessionToken
			sessionToken = "<?= htmlspecialchars(strip_tags($session), ENT_QUOTES, 'UTF-8'); ?>";
			//hostname
			wshost = "<?= htmlspecialchars(strip_tags($sport), ENT_QUOTES, 'UTF-8'); ?>";
			//get client status
			googlecastmode = "<?= htmlspecialchars(strip_tags($googlecast), ENT_QUOTES, 'UTF-8'); ?>";
		</script>
</head>

<body>
	<!-- Loading Page -->
	<div class="container">
		<div class="row"> </div>
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12">

				<div class="alert alert-info alert-labeled">
					<button type="button" class="close" data-dismiss="alert">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
					<div class="alert-labeled-row">
						<span class="alert-label alert-label-left alert-labelled-cell">
                        <i class="fa fa-warning" style="color: #fff;
    text-shadow: 1px 1px 1px #ccc;
    font-size: 1.5em;"></i>
                    </span>
						<p class="alert-body alert-body-right alert-labelled-cell">
							Placeholder (woking on a new messaging system)
						</p>
					</div>
				</div>


			</div>
		</div>
	</div>
	<div class="loader" id="loading_screen">
		<center>
			<img src="Images/small_logo.png" height="auto" width="80%" style="max-width: 400px; max-height: 400px;" />
			<h1 class="logo">
				Loading the audio client...
			</h1>
		</center>
	</div>
	<!-- ../Loading Page -->

	<!-- Main Page -->

	<div id="faders"></div>
	<div class="middlePage">
		<input type="range" min="0" id="fade_slider" value="10" max="100" style="display:none;" />
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
					<div class="col-md-4" id="skullframething">
						<center><img id="face" src="https://crafatar.com/avatars/<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>"></center>
					</div>
					<div class="col-md-8" id="contentBoxMain" style="border-left:1px solid #ccc;height:160px;">
						<form class="form-horizontal">
							<fieldset>
								<div id="cogparent"><img class="btn-clipboard2 streamingLogo" id="cast_logo" style="position: absolute; top: 20px; right: 50px;" src="Images/google-cast-logo.png" onclick="startCasting();"><i style="position: absolute; top: 20px; right: 20px;" class="btn-clipboard fa fa-cog fa-2x"
										onmouseover="this.className='draai btn-clipboard fa fa-cog fa-2x';" onmouseout="this.className='btn-clipboard fa fa-cog fa-2x';" data-toggle="modal" data-target="#settings" aria-hidden="true"></i></div>
								<h3 id="status">Status: <font style="color:green;">Loading</font></h3>
								<hr />
								<div id="voltextparant">
									<div id="volume"><small>Volume:</small> 20%</div>
								</div>

								<div id="sliderparant">
									<div class="slider"><input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';" onchange='document.cookie = "volume=" + this.value;' /></div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- Messenger Alert -->
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
		<!-- ../Messenger Alert -->

		<!-- Live Stream Mode -->
		<div id="LiveBox">
			<div class="animated bounceInDown">
				<div class="alert white-bg" style="color:black;">
					<center>
						<b><h3 style="color:#F44336;">LIVE <img src="Images/red-dot-md.png" class="animated infinite flash" style="height:20px;"></h3></b>
						<hr />
						<h4>You are listening to our awesome radio stream!</h4>
						<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";' style="background: #009688; color:white;" class="btn btn-primary">Close</button>
						<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";soundManager.stop("live");soundManager.destroySound("live");' style="background: #C62828; color:white;" class="btn btn-primary">Stop</button>
					</center>
				</div>
			</div>
		</div>
		<!-- ../Live Stream Mode -->
	</div>
	<!-- ../Main Page -->

	<!-- Popup Modal for Settings -->
	<div id="settings" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Settings</h4>
				</div>
				<div class="modal-body">
					<hr />
					<input type="checkbox" name="show_skull" id="show_skull" onchange='document.cookie="show_skull="+this.checked; settings.displaySkull(this.checked);' /> Show Minecraft Skull on main page.<br />
					<input type="checkbox" name="smart_volume" id="smart_volume" onchange='document.cookie="smart_volume="+this.checked; settings.displaySkull(this.checked);' /> Remember my volume for when I return later.<br />
					<input type="checkbox" name="EnableBrowserNotifications" id="EnableBrowserNotifications" onchange='document.cookie="browser_notifications="+this.checked;' /> Enable browser notifications.<br />
					<input type="checkbox" name="EnableSoundFading" id="EnableSoundFading" onchange='document.cookie="sound_fading="+this.checked;' /> Enable sound fading when available.
					<p style="display:inline;">May cause performance issues</p>
					<hr />
					<div class="form-group">
						<label for="sel1">Fading speed</label>
						<select class="form-control" id="fadingpseed" onchange='document.cookie = "sound_fading_speed="+getFadingType();'>
							<option id="fading_speed_slow">Slow</option>
							<option id="fading_speed_normal">Normal</option>
							<option id="fading_speed_fast">Fast</option>
  						</select>
					</div>
					<hr />
					<div class="button raised blue" onclick="showqr();" data-dismiss="modal">
						<div class="center" fit>Show QR code</div>
						<paper-ripple fit></paper-ripple>
					</div>
					<hr />
					<b>*TIP* Did you know that you can use <i>/volume [number]</i> to change the volume in the server?</b>
					<hr />
					<p>
						OpenAudioMC, the free and easy to use audio server and client.
					</p>
					<i class="fa fa-github fa-3x" aria-hidden="true" onclick="window.open('https://github.com/Mindgamesnl/OpenAudioMc')"></i>
					<i class="fa fa-globe fa-3x" aria-hidden="true" onclick="window.open('https://www.spigotmc.org/resources/openaudiomc.30691/')"></i>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ../Popup Modal for Settings -->
</body>

</html>
