const express = require('express');
const cors = require('cors');
// const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

// app.use(bodyParser.json());
app.use(cors);

app.get("/", (req, res) => {
    console.log(req.body);
    console.log(req.body.Name);

    const accountSid = "AC9a90b8b123a70bd07f34ff989f934fc5";
    const authToken = "a6cd5b221b7722cc23b26f7e064040f2";
    const client = require("twilio")(accountSid, authToken);
        client.messages
        .create({
            body: 'Hello from twilio-node',
            to: '+15625786156', // Text your number
            from: '+18336181230', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
        res.send("Request received");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
