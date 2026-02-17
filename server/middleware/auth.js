const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user/gym info to request object
        req.user = decoded.user;
        req.gym = decoded.gym;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
