const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  readFromFile("./db/db.json").then((json) => res.json(JSON.parse(json)));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title: title,
    text: text,
    id: uuidv4(),
  };

  fs.readFile("./db/db.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const db = JSON.parse(data);
      db.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(db), (error) => {
        error ? console.log(error) : console.log("Note added to db.");
      });
    }
  });

  res.json(newNote);
});

const readFromFile = util.promisify(fs.readFile);

module.exports = router;
