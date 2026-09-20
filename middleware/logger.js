function logRequests(req, res, next) {
 console.log('--- INCOMING REQUEST ---');
 console.log('Method:', req.method);
 console.log('URL:', req.url);
 console.log('Time:', new Date().toLocaleString());

 next();
}
module.exports = logRequests;