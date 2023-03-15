import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import bodyParser from "body-parser";
import config from "./constants/config.js";




const app = express();



import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from 'xss-clean';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import connectDB from "./db/connect.js";




import userRouter from './routers/customers.js';



import errorHandlerMiddleware from "./middleware/error-handler.js";

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());


// app.use(fileUpload({ useTempFiles: true }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/users', userRouter);

// app.use(notFound);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {




    res.json({ "msg": "it is working" })

})

app.get('*', function (req, res) {
    res.send('what???', 404);
});

const PORT = process.env.PORT || 5000;


const start = async () => {


    try {
        await connectDB(config.mongo_connection_uri)
        app.listen(PORT, () => {
            console.log("server is working ")
        })
    } catch (error) {
        console.log(error);
    }
};

start()