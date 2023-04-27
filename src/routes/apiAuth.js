function apiAuth(req, res, next) {
    const apiKey = req.headers['api-key'];
  
    if (apiKey && apiKey === 'DigtalCrafts') {
      next();
    } else {
      // If the API key is invalid, return an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  }

  module.exports = apiAuth;