<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */
?>
	<html lang="en">

	<head>
		<!-- Title -->
		<title>OpenAudioMC | Setup</title>

		<!-- CSS -->
		<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css">
		<link rel="stylesheet" href="http://bootsnipp.com/dist/bootsnipp.min.css?ver=7d23ff901039aef6293954d33d23c066">
		<link href="css/setup.css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="css/animate.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.min.css" />
		<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">

		<!-- META -->
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

		<!-- JS -->
		<script src="main/checkconnection.js"></script>
		<script src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="dist/sweetalert.min.js"></script>
		<script src="main/setup.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap-wizard/1.2/jquery.bootstrap.wizard.js"></script>
	</head>

	<body>
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-md-offset-4">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">OpenAudioMc Setup</h3>
						</div>
						<div class="panel-body">
							<h1>
								Testing connection...
							</h1>
							<hr />
								<div id="content">
									Loading...
								</div>
								
							<?php
								if($_POST['wshost'] !== "" && $_POST['wsport'] !== "") {
									echo("<script>testing('" . $_POST['wshost'] . "', '" . $_POST['wsport'] . "');</script>");
									$wsdata = $_POST['wshost'] . ":" . $_POST['wsport'];
								} else {
									echo('<h2>INVALID DATA<h1>Please check your server data from the previous form</h1>');
								} 
							?>
							<div id="next" style="display:none;">
									<input class="btn btn-lg btn-success btn-block" type="submit" value="Next" onclick='window.location.replace("index.php?setup=3&wsdata=<?php echo $wsdata; ?>");'>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	</html>