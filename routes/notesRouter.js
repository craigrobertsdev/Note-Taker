const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

// GET /api/notes
// returns all notes from db
router.get("/", (req, res) => {
  readFromFile("./db/db.json").then((json) => res.json(JSON.parse(json)));
});

// POST /api/notes
// Adds the sent note to the database then returns the newly created note.
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

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // read db.json into a variable and convert to an object
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const db = JSON.parse(data);
    // return a new array excluding the note to be deleted
    const newDB = db.filter((note) => {
      return note.id !== id;
    });

    // re-write the file without the deleted item
    fs.writeFile("./db/db.json", JSON.stringify(newDB), (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json(JSON.stringify(newDB));
  });
});

const readFromFile = util.promisify(fs.readFile);

module.exports = router;
