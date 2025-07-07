const axios = require('axios'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  path = require('path');
const BASE = 'https://pfps.gg/banners',
  DIR = path.join(__dirname, 'banners');
const HEADERS = {
    'User-Agent': 'Mozilla/5.0',
    'Accept-Language': 'en-US,en;q=0.9'
  },
  EXT = /\.(png|jpe?g|gif|webp)$/i;

const getExt = u => (u.match(EXT) ?.[0] || '.other').slice(1);
const download = async u => {
  const ext = getExt(u),
    folder = path.join(DIR, ext),
    file = path.join(folder, path.basename(u));
  fs.mkdirSync(folder, {
    recursive: true
  });
  if (fs.existsSync(file)) return console.log(`${path.basename(file)}`);
  try {
    const {
      data
    } = await axios.get(u, {
      responseType: 'stream'
    });
    await new Promise((resv, rej) => data.pipe(fs.createWriteStream(file)).on('finish', resv).on('error', rej));
    console.log(`${path.basename(file)}`);
  } catch (e) {
    console.error(`❌ ${u}: ${e.message}`);
  }
};

(async () => {
  fs.mkdirSync(DIR, {
    recursive: true
  });
  for (let page = 1;; page++) {
    console.log(`🔍 Page ${page}`);
    try {
      const {
        data
      } = await axios.get(`${BASE}?page=${page}`, {
        headers: HEADERS
      });
      const $ = cheerio.load(data);
      const imgs = $('img').map((_, el) => $(el).attr('src')).get()
        .filter(s => s ?.startsWith('https://cdn.pfps.gg/banners') && EXT.test(s));
      if (!imgs.length) break;
      for (const u of imgs) await download(u);
    } catch (e) {
      console.error(`❌ Page ${page}: ${e.message}`);
      break;
    }
  }
})();