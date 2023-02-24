const router = require("express").Router();
const notes = require("./notesRouter");

router.use("/notes", notes);

module.exports = router;
