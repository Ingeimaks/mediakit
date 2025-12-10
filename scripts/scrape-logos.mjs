import https from 'https';

const urls = [
  'https://webcatalog.io/it/apps/banggood',
  'https://seeklogo.com/vector-logo/615986/pcbway'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n--- Content for ${url} ---`);
      // Simple regex to find img src
      const imgMatches = data.match(/<img[^>]+src="([^">]+)"/g);
      if (imgMatches) {
        imgMatches.slice(0, 10).forEach(img => console.log(img));
      } else {
        console.log('No images found');
      }
    });
  }).on('error', (e) => console.error(e));
});
