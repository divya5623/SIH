import localtunnel from 'localtunnel';
import https from 'https';
import fs from 'fs';

function getPublicIp() {
  return new Promise((resolve) => {
    https.get('https://api.ipify.org', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data.trim()));
    }).on('error', () => resolve('Not available'));
  });
}

(async () => {
  try {
    const publicIp = await getPublicIp();
    const tunnel = await localtunnel({ port: 5173 });
    
    const info = `
========================================
AWAAZ SARPANCH PUBLIC TUNNEL URL:
${tunnel.url}

TUNNEL PASSWORD / PUBLIC IP (if asked by loca.lt):
${publicIp}
========================================
`;
    console.log(info);
    fs.writeFileSync('tunnel-info.txt', info);

    tunnel.on('close', () => {
      console.log('Tunnel connection closed');
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Error starting tunnel:', err);
  }
})();
