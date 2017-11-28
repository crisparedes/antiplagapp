//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');
var app = express();
var server = http.createServer(app);

var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client')));

// credenciales de cloudinary
cloudinary.config({ 
  cloud_name: 'dpgsdfcto', 
  api_key: '124696961325414', 
  api_secret: 'JqsPIJdKGOq8iY2mfGah5q-wu70' 
});


// respond with "hello world" when a GET request is made to the homepage
app.post('/subirimagen', function(req, res) {

var img=req.body.imagen.toString();

img=img.split(' ').join('+');
var linkImagen="";
 cloudinary.uploader.upload(img , function(result) { 
 console.log(result.secure_url);
  linkImagen=result.secure_url;
 
     
res.json({ 
    link: linkImagen
  });
 });

});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
