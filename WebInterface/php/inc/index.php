<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */
<<<<<<< HEAD
	// Import Config File
	include('config.php');
?>
<html lang="en">
	<head>
		<!-- Title -->
		<title><?= $wtitle ?> | OpenAudioMC</title>
		
		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
		<link href="css/styles.css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="css/animate.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.min.css" />
		
		<!-- META -->
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta name="viewport"  content="width=device-width, initial-scale=1, maximum-scale=1" />
		
		<!-- JS -->
		<script src="main/Soundmanager2.js"></script>
		<script src="main/main.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script>
			mcname = "<?php echo htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
=======

	// Import Config File
	include('config.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<!-- Title -->
		<title><?= $wtitle ?> | OpenAudioMC</title>
		<!-- CSS -->
		<link href="css/styles.css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="//www.w3schools.com/lib/w3.css" />
		<!-- META -->
		<meta name="viewport"  content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		
		<!-- JS -->
		<script src="main/Soundmanager2.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="main/main.js"></script>
		<script>
			mcname = "<?= htmlspecialchars(strip_tags($mcname), ENT_QUOTES, 'UTF-8'); ?>";
>>>>>>> origin/master
			wshost = "<?= htmlspecialchars(strip_tags($sport), ENT_QUOTES, 'UTF-8'); ?>";
		</script>
		
	</head>
	<body>
		<center>
<<<<<<< HEAD
			<div class="container animated bounceInDown">
				<div class="panel panel-primary">
				<div class="panel-heading"><center><h1><div id="display_name">Hi there (loading)!</div></h1></center></div>
					<div class="panel-body ">
						<div class="row">
							<div class="col-md-12">
							
								<div id="content">
								<div id="status"></div>
								<font size="+2"><b>Change the volume</b></font><br>
								<p>Or use <b>'/volume {new volume}'</b> in the server.<br>
								
								<br>
								<input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';"/>
								<b><font size="+1" id="volume"><b>Volume: 20%</b></font><br></b>
								
=======
			<div class="container">
				<div class="panel panel-primary w3-animate-opacity">
					<div class="panel-heading">
						<center>
							<h1>
								<div id="display_name">
									<p>Hi there (loading)!</p>
								</div>
							</h1>
						</center>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-12">
								<div id="content">
									<div id="status">
									</div>
									<font size="+2">
										<b>Change the volume</b>
									</font>
									</br>
									</br>
									<b>
										<font size="+1" id="volume">
											<b>Volume: 20%</b>
										</font>
										</br>
									</b>
									<input type="range" min="0" id="slider" max="100" value="20" oninput="client.set_volume(this.value); document.getElementById('volume').innerHTML = 'Volume: ' + this.value + '%';" />
								</div>
>>>>>>> origin/master
							</div>
						</div>
					</div>
				</div>	
			</div>
<<<<<<< HEAD
			</div>
=======
		</center>
>>>>>>> origin/master
	</body>
</html>