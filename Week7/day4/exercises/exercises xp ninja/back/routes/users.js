var express = require("express");
var router = express.Router();

const users = [
    { id: 1, username: "somebody" },
    { id: 2, username: "somebody_else" },
];


/* GET users listing. */
router.get("/", function (req, res, next) {
    res.json(users);
});

module.exports = router;
