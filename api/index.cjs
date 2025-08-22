// CommonJS wrapper for Vercel when project uses "type": "module"
// It dynamically imports the ESM handler (api/index.js) and forwards the request.
module.exports = function (req, res) {
  // Dynamic import of the ESM module
  import('./index.js')
    .then((mod) => {
      const handler = mod && (mod.default || mod);
      if (typeof handler === 'function') {
        try {
          return handler(req, res);
        } catch (err) {
          console.error('Handler error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        }
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid handler export');
      }
    })
    .catch((err) => {
      console.error('Failed to import ESM handler:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
    });
};
