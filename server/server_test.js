const express = require ("express");
const cors = require("cors");
const dbo = require("./connect");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./api.js"));


app.listen(PORT, () => console.log(`Node server started on port: ${PORT}`));
dbo.connectToServer();