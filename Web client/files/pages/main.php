<!DOCTYPE html>
<html lang="en">

<head>
	<!-- OpenAudioMC by Mindgamesnl -->

	<!-- Title -->
	<title>OpenAudioMC</title>

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="files/css/bootstrap.css" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link href="files/css/main.css" rel="stylesheet" />
	<link href="files/css/animate.css" rel="stylesheet" />
	<link href="files/css/swall.css" rel="stylesheet" />

	<!-- META -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<!-- ICON -->
	<link rel="icon" href="files/images/small_logo.png" />
	<link rel="image" href="files/images/small_logo.png" />

	<!-- JS -->
	<script src="files/js/jquery.js"></script>
	<script src="files/js/jqueryui.js"></script>
	<script src="files/js/bootstrap.js"></script>
	<script src="files/js/swall.js"></script>
	<script src="files/js/qrcode.js"></script>
	<script src="files/js/hueapi.js"></script>
	<script src="files/core/openaudiomc.js"></script>
	<script src="files/js/soundmanager2.js"></script>
	<script src="<?php echo $socket_io_js; ?>"></script>
	<script>
		mcname = "<?php echo $mcuser; ?>";
		session = "<?php echo $sessionToken; ?>";
		socket_io = "<?php echo $socket_io_host; ?>";
	</script>
</head>

<body>
	<div id="UserBox">
		<aside class="profile-card" id="box">
			<div class="box">
				<span id="status-span" class="status-span status-warning">Connecting to server...</span>
				<div class="inner-box">
					<br><br>
					<div class="container">
						<img src="https://crafatar.com/avatars/<?php echo $mcuser; ?>?overlay" id="skull" class="skull">
					</div>
					<br><br>
					<div class="slider">
		  			<input type="range" name="volume" id="slider" min="0" max="100" value="20" oninput="openaudio.set_volume(this.value); sliderValue(value);" onchange='document.cookie = "volume=" + this.value;' />
		  			<output for="volume" id="volumevalue">20</output>
					</div>
				</div>
				<div class="icons">
					<li><i class="fa fa-lightbulb-o fa-2x footer-icon first" aria-hidden="true" data-toggle="modal" data-target="#Hue"></i></li>
					<li><i class="fa fa-qrcode fa-2x footer-icon fa-qr-check" aria-hidden="true" onclick="showqr();"></i></li>
				</div>
			</div>
		</aside>
	</div>




	<!-- Modal -->
	<div class="modal fade" id="Hue" tabindex="-1" role="dialog" aria-labelledby="HueModal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					<h3 class="modal-title" id="lineModalLabel">Philips Hue Config</h3>
				</div>
				<div class="modal-body">

					<div class="bs-calltoaction bs-calltoaction-success">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<div id="hue_modal_text">
									<h1>
									No philips hue bridge found :(
								</h1>
									<h1>
							</div>
						</div>
					</div>
				</div>
						<div id="HueControlls">
						<div id="HueLightList"></div>
						</div>
						<button type="button" class="btn btn-primary" id="DetectHueButton" onclick="loop_hue_connection();">Retry</button>



				</div>
				<div class="modal-footer">
					<div class="btn-group btn-group-justified" role="group" aria-label="group button">
						<div class="btn-group" role="group">
							<button type="button" class="btn btn-default" data-dismiss="modal" role="button">Close</button>
						</div>
						<div class="btn-group btn-delete hidden" role="group">
							<button type="button" id="delImage" class="btn btn-default btn-hover-red" data-dismiss="modal" role="button">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="faders" style="display:none;">

	</div>
</body>
<footer>
	<span>OpenAudio 2.0 - <a href="http://openaudiomc.net/">OpenAudioMC</a></span>
</footer>
<img class="footer-logo" src="files/images/footer_logo.png">

</html>
