function authenticateUser(req, res, next) {
 const token = req.headers.authorization;
 if (!token) {
 return res.status(401).json({
 message: 'Unauthorized access'
 });
 }
 next();
}
module.exports = authenticateUser;