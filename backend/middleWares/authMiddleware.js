const jwt = require('jsonwebtoken');

// Middleware to verify authentication token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error); 
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
