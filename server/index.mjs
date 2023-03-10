import express from "express";
import cors from 'cors'
import morgan from "morgan"
import * as dotenv from "dotenv";
import envPath from "./env_path.mjs";
import connect from "./utils/connect.mjs";
import authRoutes from "./routes/auth.mjs"
import bucketRoutes from "./routes/bucket.mjs"
import cardRoutes from "./routes/card.mjs";

dotenv.config({ path: envPath });
const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log("Connected to Database"))
    .catch(err => console.error(err.message));

app.get('/hello', (_, res) => res.send('Hello World!'))
app.use('/api/auth', authRoutes)
app.use('/api/buckets', bucketRoutes)
app.use('/api/cards', cardRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.LOCALHOST_SERVER}`)
})