const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');

const app = express();

// Compress static assets to enhance performance.
// Decrease the download size of your app through gzip compression:
app.use(compression());

//
// appname is the name of the "defaultProject" value that was set in the angular.json file.
// When built in production mode using 'ng build --prod', a ./dist/{appname} folder is
// created, containing the generated application. The appname points to that folder.
//
// Replace the name below to match your own "defaultProject" value!
//
// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'dist/CSWP-Angular-Frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/CSWP-Angular-Frontend/index.html'));
});

// Start the app by listening on the default Heroku port
console.log('-=-=-=-=-=-=-=-=-=-=- SERVER RUNNING -=-=-=-=-=-=-=-=-=-=-' + '\n' +
            '-=-=-=-=-=-=-=-=-=-=- localhost:8080 -=-=-=-=-=-=-=-=-=-=-=');
app.listen(process.env.PORT || 8080);
