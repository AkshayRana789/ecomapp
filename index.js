const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB  = require('./config/dbconfig');

//env configuration
dotenv.config();

//database connections
connectDB();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Done" });
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

