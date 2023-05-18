const res = require('express/lib/response')
const req = require('request')

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, secretKey);

    // Attach the user information to the request object
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
