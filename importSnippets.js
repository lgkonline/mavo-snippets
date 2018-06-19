/**
 * This scripts receives information from the offical Mavo documentation and saves attributes to ./snippets.json.
 * It will not overwrite existing entries but adds missing attributes.
 */

const https = require("https");
const fs = require("fs");

let snippets = require("./snippets/snippets.json");

function getDocsIndex(callback) {
    https.get("https://raw.githubusercontent.com/mavoweb/mavo.io/master/docs/index.json", resp => {
        let data = "";

        resp.on("data", chunk => {
            data += chunk;
        });

        resp.on("end", () => {
            callback(JSON.parse(data));
        });
    }).on("error", err => {
        console.log("Error: " + err.message);
    });
}

getDocsIndex(docsIndex => {
    Object.keys(docsIndex).map(propName => {
        // Right now only take attributes for snippets
        if (propName.toLowerCase().indexOf("attribute") > -1) {

            docsIndex[propName].map(attr => {
                // Only insert if it's not already there
                if (!snippets[attr.name]) {
                    snippets[attr.name] = {
                        "prefix": attr.name,
                        "body": [
                            attr.name + "=\"$0\""
                        ],
                        "description": attr.purpose
                    };
                }
            });
        }
    });

    fs.writeFileSync("./snippets/snippets.json", JSON.stringify(snippets, null, 4));
});