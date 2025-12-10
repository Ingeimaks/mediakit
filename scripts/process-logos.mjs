import https from 'https';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../images');
const PUBLIC_BRANDS_DIR = path.join(__dirname, '../public/brands');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Ensure directories exist
if (!fs.existsSync(PUBLIC_BRANDS_DIR)) fs.mkdirSync(PUBLIC_BRANDS_DIR, { recursive: true });

// Helper to download file
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode !== 200) {
                fs.unlink(dest, () => {}); // Delete partial file
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(dest));
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

// Helper to fetch page content
const fetchPage = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

async function scrapeBanggood() {
    console.log('Scraping Banggood logo...');
    const html = await fetchPage('https://webcatalog.io/it/apps/banggood');
    // Look for high res icon. Usually in og:image or specific class
    // webcatalog often has icons like https://cdn-1.webcatalog.io/catalog/banggood/banggood-icon-filled-256.png
    const match = html.match(/src="(https:\/\/cdn-\d+\.webcatalog\.io\/catalog\/banggood\/[^"]+)"/);
    if (match) {
        console.log(`Found Banggood URL: ${match[1]}`);
        return match[1];
    }
    // Fallback to og:image
    const ogMatch = html.match(/content="(https:\/\/[^"]+banggood[^"]+)" property="og:image"/);
    if (ogMatch) return ogMatch[1];
    
    return null;
}

async function scrapePcbway() {
    console.log('Scraping PCBWay logo...');
    // Seeklogo page
    const html = await fetchPage('https://seeklogo.com/vector-logo/615986/pcbway');
    // Seeklogo usually shows a preview image
    // <img src="https://seeklogo.com/images/P/pcbway-logo-..."
    const match = html.match(/src="(https:\/\/seeklogo\.com\/images\/P\/pcbway-logo-[^"]+)"/);
    if (match) {
        console.log(`Found PCBWay URL: ${match[1]}`);
        return match[1];
    }
    return null;
}

async function processImages() {
    // 1. Handle Banggood
    try {
        const banggoodUrl = await scrapeBanggood();
        if (banggoodUrl) {
            await downloadFile(banggoodUrl, path.join(PUBLIC_BRANDS_DIR, 'banggood_temp.png'));
            await sharp(path.join(PUBLIC_BRANDS_DIR, 'banggood_temp.png'))
                .resize(500, null, { fit: 'inside', withoutEnlargement: true })
                .png({ quality: 90 })
                .toFile(path.join(PUBLIC_BRANDS_DIR, 'banggood.png'));
            fs.unlinkSync(path.join(PUBLIC_BRANDS_DIR, 'banggood_temp.png'));
            console.log('Banggood logo processed.');
        } else {
            console.error('Could not find Banggood logo URL.');
        }
    } catch (e) {
        console.error('Error processing Banggood:', e);
    }

    // 2. Handle PCBWay (User provided seeklogo, but also have local image. User said "cambiami il logo... e prendi i file nella cartella images". 
    // Wait, the user said "cambiami il logo di banggood... e il logo di pcbway [URLs]" AND THEN "Prendi i file dei logo dei brand presenti nella cartella images...".
    // This implies the images folder might NOT have the best pcbway? 
    // But later "Prendi i file... e sostituisci".
    // I will prioritize the User's URLs if they work, otherwise fall back to images folder for PCBWay.
    // Actually, let's look at `images/PCBWAY.png`. If it exists, use it?
    // User said "sostituisci i loghi esistenti con quelli nuovi" referring to images folder.
    // BUT the previous message said "cambia ... logo di pcbway [URL]".
    // I will try to use the URL for PCBWay as it's likely vector/high quality, but if it fails, use the one in images folder.
    // Actually, I'll download the URL one to `pcbway.png` overwriting the one I copied from images if successful.
    try {
        const pcbwayUrl = await scrapePcbway();
        if (pcbwayUrl) {
            await downloadFile(pcbwayUrl, path.join(PUBLIC_BRANDS_DIR, 'pcbway_temp.png'));
            await sharp(path.join(PUBLIC_BRANDS_DIR, 'pcbway_temp.png'))
                .resize(500, null, { fit: 'inside', withoutEnlargement: true })
                .png({ quality: 90 })
                .toFile(path.join(PUBLIC_BRANDS_DIR, 'pcbway.png'));
            fs.unlinkSync(path.join(PUBLIC_BRANDS_DIR, 'pcbway_temp.png'));
            console.log('PCBWay logo processed from URL.');
        } else {
            // Fallback to images folder if I hadn't already copied it.
            // I already copied images/PCBWAY.png to public/brands/pcbway.png in previous step.
            // So I will just optimize that one if URL fails.
             console.log('Could not find PCBWay logo URL, using local if available.');
        }
    } catch (e) {
        console.error('Error processing PCBWay:', e);
    }

    // 3. Process files from `images` folder
    const files = fs.readdirSync(IMAGES_DIR);
    for (const file of files) {
        const srcPath = path.join(IMAGES_DIR, file);
        const ext = path.extname(file).toLowerCase();
        const name = path.parse(file).name;
        
        console.log(`Processing ${file}...`);

        if (file === '100x100.ico') {
            fs.copyFileSync(srcPath, path.join(PUBLIC_DIR, '100x100.ico'));
            console.log('Copied favicon.');
            continue;
        }

        if (file === 'logoFinito2.png') {
            await sharp(srcPath)
                .resize(200, null, { fit: 'inside', withoutEnlargement: true }) // Header logo doesn't need to be huge
                .png({ quality: 90 })
                .toFile(path.join(PUBLIC_DIR, 'logoFinito2.png'));
            console.log('Processed header logo.');
            continue;
        }

        // Brand logos
        // Map names to public/brands filenames
        let targetName = name.toLowerCase().replace(/\s+/g, '-');
        
        // Handle specific cases if needed, but mostly they match
        // bigtreetech.webp -> bigtreetech.png
        // toocaa.jpg -> toocaa.png
        
        const destPath = path.join(PUBLIC_BRANDS_DIR, `${targetName}.png`);

        try {
            await sharp(srcPath)
                .resize(800, null, { fit: 'inside', withoutEnlargement: true }) // Max width 800 for brands
                .toFormat('png')
                .png({ quality: 85, compressionLevel: 9 })
                .toFile(destPath);
            console.log(`Processed ${file} -> ${targetName}.png`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
}

processImages().then(() => console.log('Done.')).catch(console.error);
