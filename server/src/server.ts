import express from 'express';
import cors, { CorsOptions } from 'cors';
import cheerio from 'cheerio';
import axios from 'axios';
import fetch from 'cross-fetch';
import playwright from 'playwright';
import ytdl from 'ytdl-core';
import dotenv from 'dotenv';
dotenv.config();

const { BRIGHT_DATA_KEY } = process.env;

const app = express();
const port = Number(process.env.PORT || 8080);
const corsOptions: CorsOptions = {
  // origin: process.env.ORIGIN_URL || 'http://localhost:3000',
  origin: '*',
  credentials: false,
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.get('/is-online', (req, res) => {
  res.send({ success: true });
});
const getHtmlPlaywright = async (url: string) => {
  // @ts-ignore
  const browser = await playwright.chrome.launch({
    headless: true,
    devtools: false,
  });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto(url);
  let html: string = await page.content();
  console.log(html);
  // if (element) {
  //   html = await page.$(element).content();
  // }
  // "downloadAddr"\s*:\s*"[^"]+"
  await browser.close();

  return html;
};
const get = async () => {
  const htmlResult = await getHtmlPlaywright(
    'https://www.tiktok.com/@javascript_wizz/video/7006233363338038533',
  );
  // const htmlResult = await getHtmlPlaywright(url);
  const jsonStringifiedUri = htmlResult.match(/"downloadAddr"\s*:\s*"([^"]+)"/)[1];

  const downloadAddr = JSON.parse(`["${jsonStringifiedUri}"]`)[0];
  console.log(downloadAddr);

  return downloadAddr;
};

const getYT = async (url: string) => {
  // const url = 'https://www.youtube.com/watch?v=yoigsHYc77s';
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
  const foo = format.url;
  console.log(foo);
};

const getInsta = async (url: string) => {
  // https://www.instagram.com/p/Ca5nG5VoIe4/
  // const htmlResult = await getHtmlPlaywright(url);
  // console.log({ htmlResult: htmlResult.toString().match(/\<video/g) });
  // return htmlResult.match(/<video.+src\="([^]")+"/)[1];
};

const getTikTok = async (url: string) => {
  const authorization = `Bearer ${BRIGHT_DATA_KEY}`;

  const responseTrigger = await fetch(
    'https://api.luminati.io/dca/trigger_immediate?collector=c_l16uz9632i0mxrs8yk',
    {
      body: `{"url":"${url}"}`,
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
  const { response_id } = await responseTrigger.json();
  const response = await fetch(
    `https://api.luminati.io/dca/get_result?response_id=${response_id}`,
    {
      headers: {
        Authorization: authorization,
      },
    },
  );

  const data = await response.json();
  console.log(data);
};

app.post('/geturl', async (req, res) => {
  const { url, type } = req.body;
  if (type === 'youtube') {
    return getYT(url);
  }

  // return get(url);
});
app.post('/tiktok', async (req, res) => {
  const { url } = req.body;
  const urlResponse = await axios(url);
  const html_data = urlResponse.data;
  const $ = cheerio.load(html_data);
});
app.listen(port, () => {
  console.log(`Listening on port  ${port}  👁  ...️`);
  // get();
  // getYT();
  // getInsta('https://www.instagram.com/p/Ca5nG5VoIe4/');
  getTikTok('https://www.tiktok.com/@icepresso/video/6980670280649755906');
});
