function oa_volume_increment() {
    if (__volume == 100) return;
    __volume = __volume + 5;
    oa_audio_setvolume(__volume);
    document.getElementsByClassName("oam_volume_display")[0].innerHTML = "Vol: "+__volume+"%";
    document.getElementsByClassName("oam_volume_display_slider")[0].style.width = __volume+"%";
}

function oa_volume_decrement() {
    if (__volume == 0) return;
    __volume = __volume - 5;
    oa_audio_setvolume(__volume);
    document.getElementsByClassName("oam_volume_display")[0].innerHTML = "Vol: "+__volume+"%";
    document.getElementsByClassName("oam_volume_display_slider")[0].style.width = __volume+"%";
}
$( document ).ready(function() {
    $(".close").click(function(){
        $(this).parent().addClass("closed");
    })
});

function oa_ui_show_notification(title, text, color) {
    document.getElementById("notification").className = "notification " + color;
    document.getElementsByClassName("title")[0].innerHTML = title;
    document.getElementById("notitext").innerHTML = text;
}

function oa_ui_setskull(owner) {

    if (owner == "Whoops") {
        document.getElementById("skull").style.background = 'linear-gradient(\n' +
            '          rgba(26, 26, 29, 0.45),\n' +
            '          rgba(30, 30, 33, 0.25),\n' +
            '          rgba(118, 60, 240, 0.25),\n' +
            '          rgba(92, 89, 229, 0.45)),\n' +
            '  url("https://crafatar.com/avatars/MHF_Question")';
        document.getElementById("skull").style.backgroundSize = "cover";
        document.getElementById("username").innerHTML = "Whoops!";
        return;
    }

    document.getElementById("skull").style.background = 'linear-gradient(\n' +
        '          rgba(26, 26, 29, 0.45),\n' +
        '          rgba(30, 30, 33, 0.25),\n' +
        '          rgba(118, 60, 240, 0.25),\n' +
        '          rgba(92, 89, 229, 0.45)),\n' +
        '  url("https://crafatar.com/avatars/'+owner+'")';
    document.getElementById("skull").style.backgroundSize = "cover";
    document.getElementById("username").innerHTML = owner;
}