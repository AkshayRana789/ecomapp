const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
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
app.use(cookieParser());

//routes import
const userRoute = require('./routes/userRouters');

//Use Routes
app.use('/api/users',userRoute);

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Done" });
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

