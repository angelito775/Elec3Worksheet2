function authenticateUser(req, res, next) {
 const token = req.headers.authorization || req.query.token;
 if (token !='12345') {
 return res.status(401).json({
 message: 'Unauthorized access'
 });
 }
 next();
}
module.exports = authenticateUser;