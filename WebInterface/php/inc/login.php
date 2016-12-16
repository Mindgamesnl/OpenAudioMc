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
	<script>
		function login() {
			window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "?user=" + document.getElementById("addon3a").value);
		}
	</script>
	<script src="dist/sweetalert.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="messages/messages.js"></script>
</head>
<body>
	<div class="middlePage">
		<div class="panel panel-danger make-it-slow">
			<div class="panel-heading">OpenAudioMC Login</div>
			<div class="panel-body">
				<div class="row">
					<div class="form-group label-floating">
						<div class="input-group">
							<label class="control-label" for="addon3a">Mc name:</label>
							<input type="text" id="addon3a" class="form-control">
							<span class="input-group-btn">
								<a href="#" onclick="login();" class="btn btn-primary">Login</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>