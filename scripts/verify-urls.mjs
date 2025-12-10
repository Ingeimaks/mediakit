import https from 'https';

const candidates = [
  // PCBWay candidates
  'https://seeklogo.com/images/P/pcbway-logo-8A97725916-seeklogo.com.png',
  
  // Banggood candidates
  'https://cdn.webcatalog.io/catalog/banggood/banggood-icon-filled.png',
  'https://cdn.webcatalog.io/catalog/banggood/banggood-icon.png',
  'https://cdn.webcatalog.io/catalog/banggood/banggood-icon-filled.png?v=1675593310708', // Random timestamp sometimes used
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Banggood_logo.png/800px-Banggood_logo.png'
];

candidates.forEach(url => {
  const options = {
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  const req = https.request(url, options, (res) => {
    console.log(`${res.statusCode} - ${url}`);
    if (res.statusCode === 200) {
      console.log(`  Content-Type: ${res.headers['content-type']}`);
      console.log(`  Content-Length: ${res.headers['content-length']}`);
    }
  });

  req.on('error', (e) => {
    console.error(`Error checking ${url}: ${e.message}`);
  });

  req.end();
});
