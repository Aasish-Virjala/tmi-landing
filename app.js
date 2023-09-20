const express  = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public/Site1')));

app.post('/subscribe', (req, res) => {
    email = req.body.email
    const data = {
        members: [
            {
                email_address: email,
                status: 'pending'
            }
        ]
    }
    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us21.api.mailchimp.com/3.0/lists/96374c376b',
        method: 'POST',
        headers: {
            Authorization: 'auth e8bb5b66cd88f31725fe5e7e701dddc2-us21'

        },
        body: postData
    }

    request(options, (err, response, body) => {
        if(err) {
            res.send("Error")
        } else {
            if(response.statusCode == 200) {
                res.send("Success! You are now subscribed.")
            }
        }
    })
})

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on ${PORT}`));