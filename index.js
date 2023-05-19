const express = require("express");
const bodyparser = require("body-parser");
const node_server = express();
const App_server = require('./app');
const { ServerApiVersion } = require("mongodb");
const env = require("dotenv").config()
const cors = require("cors")


node_server.use(cors());
node_server.use(bodyparser.json());
node_server.use(bodyparser.urlencoded({ extended:true }));


require('./dbconfig');

node_server.use("/",App_server)


const port= process.env.PORT || 5000;
node_server.listen(port,() => {
    console.log('server started', port);
});
