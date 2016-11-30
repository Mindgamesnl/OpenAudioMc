//create messages object
var messages = {};

//define variables
messages.status_not_connected     = "Welkom terug <strong>%username%</strong>!";
messages.not_found                = "Status: <font style='color:Red;'>Speler niet gevonden</font>";
messages.connecting               = "Status: <font style='color:orange;'>Verbinden...</font>";
messages.could_not_connect        = "Status: <font style='color:Red;'>Kan niet verbinden.</font>";
messages.connected                = "Status: <font style='color:green;'>Verbonden</font>";
messages.disconnected             = "Status: <font style='color:Red;'>Niet verbonden</font>";
messages.volume_max               = '<small>Volume:</small> 100%';
messages.volume_min               = '<small>Volume:</small> 0%';
messages.volume_var               = '<small>Volume:</small> {{VOLUME}}%';
messages.message_header           = "%username% | OpenAudioMc";
messages.connection_error_header  = "Connection lost";
messages.connection_error_content = "Sorry %username%.<br>We zijn de verbinding verloren, wil je opnieuw verbinden?";