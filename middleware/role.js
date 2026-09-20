function checkRole(req, res, next) {
 const role = req.headers['x-user-role'];
 if (role !== 'Faculty') {
 return res.status(403).json({
 message: 'Faculty access only'
 });
 }
 
 next();
}
module.exports = checkRole;
