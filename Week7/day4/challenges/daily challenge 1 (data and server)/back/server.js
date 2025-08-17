const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.get("/api/hello", (req, res) => {
    res.send("Hello From Express!");
});

app.post("/api/world", (req, res) => {
    console.log(req.body)
    const {message} = req.body;
    if (message) {
        res.send(`I received your post request. This is what you sent me: ${message}`);
    } else {
        res.status(400).send("No message provided");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
