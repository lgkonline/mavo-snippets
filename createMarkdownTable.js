/**
 * You can run this script with `npm start`.
 * This script inserts all snippets as a table to the README.
 * If you want to change the README, please edit `README.template.md` 
 * instead of `README.md`. Otherwise you're changes will be overwritten after
 * running this script.
 */

const table = require("markdown-table");
const fs = require("fs");

const snippets = require("./snippets/snippets.json");

let tableArray = [
    ["Prefix", "Description"]
];

Object.keys(snippets).sort().forEach(prop => {
    const snippet = snippets[prop];

    tableArray.push(["`" + snippet.prefix + "`", snippet.description]);
});

const snippetsTable = table(tableArray);

let template = fs.readFileSync("./README.template.md");
const markdown = template.toString().replace("${snippetsTable}", snippetsTable);

fs.writeFileSync("./README.md", markdown);