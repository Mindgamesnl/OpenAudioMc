const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "en.lang");
const propertiesToJSON = require("properties-to-json");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (!err) {
        console.log(propertiesToJSON(data));
    }
});