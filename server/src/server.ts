import express from 'express';
import cors, { CorsOptions } from 'cors';

const app = express();
const port = Number(process.env.PORT || 3000);
const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN_URL || 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/is-online', (req, res) => {
  res.send({ success: true });
});

console.log(`Listening on port  ${port}  👁  ...️`);
