const express = require('express');
const cors = require('cors');
bodyParser = require("body-parser");

const messageSend = false;
const app = express();

//app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.json());
//app.use(cors);
// Allow requests from any origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  // Handle preflight requests
  app.options('*', (req, res) => {
    // Allowed HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    // Allowed headers
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    res.status(204).send();
  });

app.post("/", (req, res) => {
    if(!messageSend){
      const {Name, Phone, Balance, Withdrawn, InsufficientBalance} = req.body;
      console.log("Node here"+InsufficientBalance);
    //console.log(Name,Phone,Balance,Withdrawn);
    const accountSid = "AC9a90b8b123a70bd07f34ff989f934fc5";
    const authToken = "a6cd5b221b7722cc23b26f7e064040f2";
    if (!InsufficientBalance){
      const client = require("twilio")(accountSid, authToken);
        client.messages
        .create({
            body: `Hello ${Name}, you have withdrawn $${Withdrawn}. Your remaining balance is $${Balance-Withdrawn}`,
            to: `+1${Phone}`, // Text your number
            from: '+18336181230', // From a valid Twilio number
        })
        .then(messageSend = !messageSend);
    }

    else{
      const client = require("twilio")(accountSid, authToken);
        client.messages
        .create({
            body: `Hello ${Name}, you are trying to withdraw $${Withdrawn}. Your balance is $${Balance}. You have insufficient balance.`,
            to: `+1${Phone}`, // Text your number
            from: '+18336181230', // From a valid Twilio number
        })
        .then(messageSend = !messageSend);
    }
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
