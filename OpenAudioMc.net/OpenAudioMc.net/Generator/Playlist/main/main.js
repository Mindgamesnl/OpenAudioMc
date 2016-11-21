


sounds = 1;

function add(url) {
	var table = document.getElementById("playlist");
	var row = table.insertRow(sounds++);
	var soundid = sounds - 1;
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = soundid;
	row.id = soundid;
	cell2.innerHTML = url;
	cell2.className = "text-center";
	console.log("[Add] added sound with data:\nSrc: " + url + "\nID: " + soundid + "");
}


function addButton() {
	if (document.getElementById("src").value === "") {
		console.log("[Add] invalid src");
	} else {
		add(document.getElementById("src").value);
		document.getElementById("src").value = "";
	}
}

function tableToJson(table) {
	var data = [];
	var headers = [];
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
	}
	for (var i = 1; i < table.rows.length; i++) {
		var tableRow = table.rows[i];
		var rowData = {};
		for (var j = 0; j < tableRow.cells.length; j++) {
			rowData[headers[j]] = tableRow.cells[j].innerHTML;
		}
		data.push(rowData);
	}
	return data;
}

function echoJson() {
	console.log(JSON.stringify(tableToJson(document.getElementById("playlist"))));
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadPlaylist(name) {
	var list = JSON.stringify(tableToJson(document.getElementById("playlist")))
	download('playlist_' + name + '.js', 'var playlist_' + name + " = " + list + ";");
}

function downloadButton() {
	swal({
  title: "Playlist name!",
  text: "Please enter a name for your playlist:",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "MyAwesomePlaylist"
},
function(inputValue){
  if (inputValue === false) return false;
  
  if (inputValue === "" || /\s/.test(inputValue)) {
    swal.showInputError("Nope, that's not a valid name.");
    return false
  } else {
		 downloadPlaylist(inputValue);
	}
  
  swal("Nice!", "Please upload this file in the 'playlist' folder (in the webclient)");
});
}

function help() {
	swal("Hi there, welcome to the Playlistmaker, add a sound to get started, then click 'Download' to generate your playlist!")
}
onload=help