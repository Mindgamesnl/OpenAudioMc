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
	<script src="main/Soundmanager2.js"></script>
	<script src="dist/sweetalert.min.js"></script>
	<script src="main/main.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="messages/messages.js"></script>
	<script>
		mcname = "<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
		wshost = "<?= htmlspecialchars(strip_tags($sport), ENT_QUOTES, 'UTF-8'); ?>";
	</script>

</head>

<body>

	<div class="middlePage">
			
		<div class="page-header">
			<h1 class="logo"><div id="display_name"><small >Hi there</small> (loading)<small>!</small></div></h1>
		</div>

		<div class="panel panel-info">
			<div class="panel-body">
				<div class="row">
					<div class="col-md-4">
						<center><img id="face" src="https://crafatar.com/avatars/<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>"></center>
					</div>
					<div class="col-md-8" style="border-left:1px solid #ccc;height:160px">
						<form class="form-horizontal">
							<fieldset>
								<i class="btn-clipboard fa fa-cog fa-2x" onmouseover="this.className='draai btn-clipboard fa fa-cog fa-2x';" onmouseout="this.className='btn-clipboard fa fa-cog fa-2x';" data-toggle="modal" data-target="#settings" aria-hidden="true"></i>
								<h3 id="status">Status: <font style="color:green;">Loading</font></h3>
								<hr />
								<div id="volume">Volume: 20%</div>
								<input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';" />
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div id="LiveBox">
			<Center>
				<div class="container animated bounceInDown">
					<div class="panel panel-default col-md-7">
						<div class="panel-body">
							<div class="row">
								<b><h2 style="color:#F44336;">LIVE <img src="Images/red-dot-md.png" class="animated infinite flash" style="height:20px;"></h2>
							<hr />
							<h3><div>You are listening to our awesome radio stream!</div></h3>
							<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";soundManager.stop("live");soundManager.destroySound("live");' style="background: #C62828; color:white;" class="btn btn-primary">Stop</button>
							<button type="button" onclick='document.getElementById("LiveBox").className = "animated bounceOutUp";' style="background: #009688; color:white;" class="btn btn-primary">Close</button>
									</b>
							</div>
						</div>
					</div>
				</div>
			</center>
		</div>

		<div id="MessageManager">
			<Center>
				<div class="container animated bounceInDown">
					<div class="panel panel-default col-md-7">
						<div class="panel-body">
							<div class="row">
								<b><h2>Last message</h2></b>
								<hr />
								<h3><div id="messageContent">Loading...</div></h3>
								<button type="button" onclick='document.getElementById("MessageManager").className = "animated bounceOutUp";' style="background: #009688; color:white;" class="btn btn-primary">Close</button>
							</div>
						</div>
					</div>
				</div>
			</center>
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
					<input type="checkbox" name="EnableBrowserNotifications" id="EnableBrowserNotifications" checked/> Enable browser nofifications.
					<hr />
					<b>*TIP* Did you know that you can use <i>/volume [number]</i> to change the volume in the server?</b>
					<hr />
					<p>
						OpenAudioMC, the free and easy to use audio server and client.
					</p>
					<i class="fa fa-github fa-3x" aria-hidden="true" onclick="window.open('https://github.com/Mindgamesnl/OpenAudioMc')"></i>
					<i class="fa fa-comment fa-3x" aria-hiddenk="true" onclick="window.open('https://www.spigotmc.org/resources/openaudiomc.30691/')"> </i>
					<i class="fa fa-twitter fa-3x" aria-hiddenk="true" onclick="window.open('https://twitter.com/Me_Is_Matt')"> </i>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	
</body>
</html>