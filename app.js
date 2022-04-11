const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const https = require ('https');


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get ('/', function (req, res) {

    res.sendFile (__dirname + '/signup.html');
})


app.post('/' , function (req, res) {

 const firstName = req.body.fname;
 const lastName = req.body.lname;
 const email = req.body.email;

 console.log(firstName, lastName, email);    

 const data =  {

    members: [

        {

        email_address: email,
        status: 'subscribed',
        merge_fields: {

            FNAME: firstName,
            LNAME: lastName
        }            
        
        
        }


    ]



 };

 const jsonData = JSON.stringify(data);
 

 const url = 'https://us14.api.mailchimp.com/3.0/lists/1a94178d2e';
 const options = {

    method: 'POST',
    auth: 'arif1:XXXXXXX'

 };

const request =  https.request (url, options, function (response) {

    if (response.statusCode === 200) {

        res.send ('Successfully Subscribed'); 
    } else {
        res.send ('Uh Oh. Please try again later')
    }

 response.on('data', function (data){

    console.log(JSON.parse(data));
 })

 })

 request.write(jsonData);
 request.end();
 

});


app.listen (process.env.PORT || 3000, function(){

    console.log('Server has started at port 3000');
});

