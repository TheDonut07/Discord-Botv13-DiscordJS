const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

module.exports = async (client) => {
  const Table = new Ascii("Buttons Handler");
  const buttonsFolder = await PG(`${process.cwd()}/Buttons/**/*.js`);

  buttonsFolder.map(async (file) => {
    const buttonFile = require(file);
    if(!buttonFile.id) return;

    client.buttons.set(buttonFile.id, buttonFile);
    Table.addRow(buttonFile.id, "✔ LOADED");
  });

  console.log(Table.toString());
}