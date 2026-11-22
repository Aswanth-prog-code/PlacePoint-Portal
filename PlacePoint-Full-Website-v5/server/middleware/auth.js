const jwt = require('jsonwebtoken');
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.student = { id: payload.sub, email: payload.email };
    return next();
  } catch { return res.status(401).json({ message: 'Invalid or expired session.' }); }
}
module.exports = requireAuth;
