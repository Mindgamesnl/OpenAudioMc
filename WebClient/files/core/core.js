function validateSession() {
    if (getQueryVariable("s") == false) {
        return;
    }
    var sessionData = atob(getQueryVariable("s")).split(":");

    var name = sessionData[0];
    var server = sessionData[1];
    var token = sessionData[2];
    oa_socket_startup(name, server,token);
    oa_ui_setskull(name);

}

onload = validateSession;

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

hue = new HueModule();