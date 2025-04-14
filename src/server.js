const express = require("express");
const app = express();

app.use(express.json());

app.listen(4343, () => console.log("server is running..."));
