__volume = 0;

function oa_volume_increment() {
    if (__volume == 100) return;

    if (__volume + 5 > 100) {
        __volume = 100;
    } else {
        __volume = __volume + 5;
    }
    oa_audio_setvolume(__volume);
}

function oa_ui_setbg(a) {
    if (a.indexOf("http") !== -1) {
        document.body.style.background = "url("+a+")";
        document.body.style.backgroundSize = "cover";
        return;
    }
    document.body.style.background = a;
    document.body.style.backgroundSize = "cover";
}

function oa_volume_set(newvolume) {
    //invalid! dont do it!
    if (newvolume > 100 || newvolume < 0) return;

    //okey i gues its save
    __volume = newvolume;
    oa_audio_setvolume(newvolume);
}

function oa_volume_decrement() {
    if (__volume == 0) return;
    if (__volume - 5 < 0) {
        __volume = 0;
    } else {
        __volume = __volume - 5;
    }
    oa_audio_setvolume(__volume);
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

function oa_ui_setskull(owner, uuid) {

    if (owner == "Whoops") {
        document.getElementById("skull").style.background = 'linear-gradient(\n' +
            '          rgba(26, 26, 29, 0.45),\n' +
            '          rgba(30, 30, 33, 0.25),\n' +
            '          rgba(240, 60, 80, 0.25),\n' +
            '          rgba(240, 60, 80, 0.95)),\n' +
            '  url("https://crafatar.com/avatars/606e2ff0-ed77-4842-9d6c-e1d3321c7838")';
        document.getElementById("skull").style.backgroundSize = "cover";
        document.getElementById("username").innerHTML = "Whoops!";
        return;
    } else {
        document.getElementById("skull").style.background = 'linear-gradient(\n' +
            '          rgba(26, 26, 29, 0.45),\n' +
            '          rgba(30, 30, 33, 0.25),\n' +
            '          rgba(118, 240, 118, 0.25),\n' +
            '          rgba(92, 229, 89, 0.45)),\n' +
            '  url("https://crafatar.com/avatars/'+uuid+'?default=d3c47f6f-ae3a-45c1-ad7c-e2c762b03ae6&overlay")';
        document.getElementById("skull").style.backgroundSize = "cover";
        document.getElementById("username").innerHTML = owner;
    }
}
