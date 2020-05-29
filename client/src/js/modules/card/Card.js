import {parseStyle} from "../../helpers/libs/MinecraftColorCodes";

export class Card {

    constructor(json) {
        if (json != null) this.fromJson(json);
    }

    fromJson(json) {
        document.getElementById("card-panel").style.display = "";

        this.lines = [];
        this.title = json.title;

        for (const row of json.rows) {
            this.lines.push(this.rowToHtml(row));
        }

        document.getElementById("card-title").innerText = this.title;
        let html = "";

        this.lines.forEach(line => {
            html += line
        });

        document.getElementById("card-content").innerHTML = html;
    }

    replaceWithJson(id, text) {
        document.getElementById(id).replaceWith(new DOMParser().parseFromString(this.partToHtml(text), "text/html").body.childNodes[0]);
    }

    rowToHtml(row) {
        let html = "";

        for (const text of row.textList) {
            html += this.partToHtml(text);
        }

        return html;
    }

    partToHtml(part) {
        let html = "";

        let prefixes = [];
        let suffixes = [];

        prefixes.push("<p id='" + part.id + "'>");
        suffixes.push("</p>");

        for (const style of part.styles) {
            if (style === "BOLD") {
                prefixes.push("<b>");
                suffixes.push("</b>");
            } else if (style === "ITALLIC") {
                prefixes.push("<i>");
                suffixes.push("</i>");
            } else if (style === "UNDERLINE") {
                prefixes.push("<u>");
                suffixes.push("</u>");
            }
        }

        if (part.hyperlink != null && part.hyperlink != "") {
            prefixes.push("<a href='" + part.hyperlink + "'>");
            suffixes.push("</a>");
        }

        for (const prefix of prefixes) {
            html += prefix;
        }

        part.text = part.text.split("\u0026").join("&");

        parseStyle(part.text).childNodes.forEach(node => {
            html += node.outerHTML;
        });

        for (const suffix of suffixes) {
            html += suffix;
        }

        return html;
    }

}