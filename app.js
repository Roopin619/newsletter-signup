const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.post("/", function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
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

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/d01cf695d9",
        method: "POST",
        headers: {
            "Authorization": "Roopin619 7d5e074e50ec309283c3fea52adb9cc5-us4"
        },
        body: jsonData
    };


    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200)
                res.sendFile(__dirname + "/success.html");
            else
                res.sendFile(__dirname + "/failure.html");
        }

    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started running on port 3000.");
});





