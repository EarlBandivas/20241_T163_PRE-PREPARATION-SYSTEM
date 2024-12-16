// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware to verify user role
export const verifyRole = (role) => (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });

        // Check user role
        if (decoded.role !== role) {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
        }

        req.userId = decoded.id; // Add userId to request object for downstream use
        next();
    });
};

// Middleware to verify multiple roles
export const verifyRoles = (...roles) => (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
        }

        req.userId = decoded.id; // Add userId to request object for downstream use
        next();
    });
};
