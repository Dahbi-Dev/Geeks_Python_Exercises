var express = require("express");
var router = express.Router();

const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Doe" },
    { id: 3, firstName: "Ziv", lastName: "Chen" },
    { id: 4, firstName: "Isaac", lastName: "Groisman" },
    { id: 5, firstName: "Avner", lastName: "Maman" },
    { id: 6, firstName: "Megan", lastName: "Dreyfuss" },
];

/* GET customers listing. */
router.get("/", function (req, res, next) {
    res.json(customers);
});

module.exports = router;
