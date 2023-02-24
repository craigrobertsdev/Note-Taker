const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  readFromFile("./db/db.json").then((json) => res.json(JSON.parse(json)));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title: title,
    text: text,
    id: uuidv4(),
  };

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const db = JSON.parse(data);
      db.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        err ? console.log(err) : console.log("Note added to db.");
      });
    }
  });

  res.json(newNote);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const db = await readFromFile("./db/db.json").then((json) => JSON.parse(json));

  const newDB = db.filter((note) => {
    return note.id !== id;
  });

  fs.writeFile("./db/db.json", JSON.stringify(newDB), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.json(JSON.stringify(newDB));
});

const readFromFile = util.promisify(fs.readFile);

module.exports = router;
