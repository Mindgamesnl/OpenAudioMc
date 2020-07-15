export class CueueElement {

    constructor(element) {
        this.element = element;
        this.id = element.id;
        this.timestamp = element.timestamp;
        this.payload = element.task.payload;
        this.taskType = element.task.type;
    }

    msToHMS( ms ) {
        // 1- Convert to seconds:
        var seconds = ms / 1000;
        // 2- Extract hours:
        var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;

        if ((hours +"").length == 1) {
            hours = "0" + hours;
        }

        if ((minutes +"").length == 1) {
            minutes = "0" + minutes;
        }

        if ((seconds +"").length == 1) {
            seconds = "0" + seconds;
        }

        return ( hours+":"+minutes+":"+seconds);
    }

    insertIntoPage() {
        let typeName = this.taskType.split(".")[this.taskType.split(".").length - 1]

        let html = `<ul class="data col horizontal" id="` + this.id + `-cueue-row">
                        <li class="content">
                            <div>` + this.msToHMS(this.timestamp) +`</div>
                            <div class="secondary">rlts</div>
                        </li>
                        <li class="content">
                            <div>` + this.humanifyJson(this.payload) + `</div>
                            <div class="secondary">Type: ` + typeName + `</div>
                        </li>
                        <li class="content">
                            <div class="icon-wrapper">
                                <span class="icon play" id="` + this.id + `-run-now" data-tooltip="Run"></span><span class="icon edit"
                                    id="` + this.id + `-ediw-row" data-tooltip="Edit"></span><span
                                    class="icon delete" id="` + this.id + `-delete-cueue" data-tooltip="Delete"></span></div>
                        </li>
                    </ul>`;

        document.getElementById("show-cue-list").innerHTML += html;

        // hook after dom update
        setTimeout(() => {

            document.getElementById(this.id + "-run-now").onclick = () => {
                // execute now
            }

            document.getElementById(this.id + "-edit-row").onclick = () => {
                // edit now
            }

            document.getElementById(this.id + "-delete-cueue").onclick = () => {
                // delete now
                
            }
        }, 50)
    }

    humanifyJson(json) {
        let typeName = this.taskType.split(".")[this.taskType.split(".").length - 1]

        // skip anything internal
        if (typeName == "CommandRunnable") {
            return this.payload.command;
        }

        let output = "";
        for (var prop in json) {
            if (Object.prototype.hasOwnProperty.call(json, prop)) {
                output += prop + ": " + json[prop] + ", "
            }
        }
        return output;
    }

}