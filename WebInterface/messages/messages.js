//create messages object
var messages = {};

//define variables
messages.status_not_connected     = "Hi there <strong>%username%</strong>!";
messages.not_found                = "Status: <font style='color:Red;'>Player not found</font>";
messages.connecting               = "Status: <font style='color:orange;'>Connecting</font>";
messages.could_not_connect        = "Status: <font style='color:Red;'>Could not connect</font>";
messages.connected                = "Status: <font style='color:green;'>Connected</font>";
messages.disconnected             = "Status: <font style='color:Red;'>Disconnected</font>";
messages.volume_max               = '<small>Volume:</small> 100%';
messages.volume_min               = '<small>Volume:</small> 0%';
messages.volume_var               = '<small>Volume:</small> {{VOLUME}}%';
messages.message_header           = "%username% | OpenAudioMc";
messages.connection_error_header  = "Connection lost";
messages.connection_error_content = "Sorry %username%.<br>We lost connection to our server! do you want to re connect?";