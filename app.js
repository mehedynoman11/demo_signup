const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/f6242243b7"; // Replace YOUR_LIST_ID with your Mailchimp list ID
  const options = {
    method: "POST",
    auth: "anystring:1f7816e01896a820b69a8eade89fc980-us21" // Replace YOUR_API_KEY with your Mailchimp API key
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 1111, function() {
  console.log("Server Is Running at Port: 1111");
});


// API Key: 1f7816e01896a820b69a8eade89fc980-us21
// Unique Id: f6242243b7
// const options = {
//   method: "POST",
//   auth: "1f7816e01896a820b69a8eade89fc980-us21"
// }
