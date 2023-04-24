const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors);

app.post("/api", (req, res) => {
  const user = req.body;
  console.log(user);
  res.send("User saved successfully");
});

app.listen(3001, () => {
  console.log("Server started on port 3000");
});
