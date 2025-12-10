import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brands = [
  { 
    name: "Geekmall", 
    domain: "geekmall.eu" 
  },
  { 
    name: "Geekbuying", 
    domain: "geekbuying.com" 
  },
  { 
    name: "Engwe", 
    domain: "engwe-bikes.com" 
  },
  { 
    name: "Imou", 
    domain: "imoulife.com" 
  },
  { 
    name: "Linogy", 
    domain: "linogy.com" 
  },
  { 
    name: "Toocaa", 
    domain: "toocaa.com" 
  },
  { 
    name: "Acmer", 
    domain: "acmerlaser.com" 
  },
  { 
    name: "BIGTREETECH", 
    domain: "bigtree-tech.com" 
  },
  { 
    name: "Monport", 
    domain: "monportlaser.com" 
  },
  { 
    name: "PCBWay", 
    domain: "pcbway.com",
    candidates: [
      "https://logo.clearbit.com/pcbway.com?size=800",
      "https://logo.clearbit.com/pcbway.com",
      "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://pcbway.com&size=256",
      "https://unavatar.io/pcbway.com?fallback=false"
    ]
  },
  { 
    name: "Banggood", 
    domain: "banggood.com",
    candidates: [
      "https://logo.clearbit.com/banggood.com?size=800",
      "https://logo.clearbit.com/banggood.com",
      "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://banggood.com&size=256",
      "https://unavatar.io/banggood.com?fallback=false"
    ]
  },
  { 
    name: "Elegoo", 
    domain: "elegoo.com" 
  },
  { 
    name: "Anycubic", 
    domain: "anycubic.com" 
  },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        // Check content type to ensure it's an image
        const contentType = res.headers['content-type'];
        if (contentType && !contentType.startsWith('image/')) {
          console.log(`Skipping ${url}: Content-Type ${contentType} is not an image.`);
          res.resume();
          resolve(false);
          return;
        }

        const stream = fs.createWriteStream(filepath);
        res.pipe(stream);
        stream.on('finish', () => {
          stream.close();
          // Check file size, if too small (e.g. empty), it might be a failure disguised as 200
          const stats = fs.statSync(filepath);
          if (stats.size < 100) {
             console.log(`Downloaded file ${filepath} is too small (${stats.size} bytes), treating as failure.`);
             fs.unlinkSync(filepath);
             resolve(false);
          } else {
             console.log(`Downloaded: ${filepath} from ${url}`);
             resolve(true);
          }
        });
      } else {
        console.log(`Failed to download ${url}: Status Code ${res.statusCode}`);
        res.resume(); 
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${url}: ${err.message}`);
      resolve(false);
    });
  });
};

async function main() {
  const brandsDir = path.join(__dirname, '../public/brands');
  if (!fs.existsSync(brandsDir)){
    fs.mkdirSync(brandsDir, { recursive: true });
  }
  
  for (const brand of brands) {
    const filename = `${brand.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    const filepath = path.join(brandsDir, filename);
    
    // Determine candidates
    let candidates = [];
    if (brand.candidates) {
      candidates = brand.candidates;
    } else {
      candidates = [`https://unavatar.io/${brand.domain}?fallback=false`];
    }

    let success = false;
    for (const url of candidates) {
      console.log(`Trying to download ${brand.name} from ${url}...`);
      success = await downloadImage(url, filepath);
      if (success) {
        break; 
      }
    }

    if (!success) {
      console.error(`Could not download logo for ${brand.name} from any candidate.`);
    }
  }
}

main();
