<html lang="en">
<head>
	<?php include('config.php'); ?>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<title>Welkom | OpenAudio</title>
		<link href="css/styles.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<meta name="viewport"  content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="stylesheet" type="text/css" href="http://www.w3schools.com/lib/w3.css" />
	<script src="main/Soundmanager2.js"></script>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script>
		mcname = "<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
		wshost = "<?php echo htmlspecialchars(strip_tags($a), ENT_QUOTES, 'UTF-8'); ?>";
	</script>
	
</head>
<body>
	<center>
		<div class="container">
			<div class="panel panel-primary w3-animate-opacity">
			<div class="panel-heading"><center><h1><div id="display_name">Hi there (loading)!</div></h1></center></div>
				<div class="panel-body ">
					<div class="row">
						<div class="col-md-12">
							<div id="content">
							<div id="status"></div>
							<font size="+2"><b>Change the volume</b></font><br><br>
							<b><font size="+1" id="volume"><b>Volume: 20%</b></font><br></b>
							<input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="main/main.js"></script>
		</div>
</body>
</html>