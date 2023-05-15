const express = require("express");
const bodyparser = require("body-parser");
const node_server = express();
const App_server = require('./app');
const env = require("dotenv").config()



node_server.use(bodyparser.json());
node_server.use(bodyparser.urlencoded({ extended:true }));


require('./dbconfig');

node_server.use('/api',App_server);

const port= process.env.PORT || 5000;
node_server.listen(port,() => {
    console.log('server started', port);
});
