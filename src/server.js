const express = require("express");
const cors = require('cors')
const app = express();

const conn = require('./db/conn')
conn()
app.use(cors())
app.use(express.json());

app.listen(4343, () => console.log("server is running..."));
