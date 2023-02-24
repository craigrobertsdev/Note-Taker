const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

router.get("/", async (req, res) => {
  readFromFile("./db/db.json").then((json) => res.json(JSON.parse(json)));
});

router.post("/", (req, res) => {});

const readFromFile = util.promisify(fs.readFile);

module.exports = router;
