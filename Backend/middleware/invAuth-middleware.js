const config = require('config');

module.exports = function invAuth(req,res,next){
    const invAuth = req.header('x-invAuth');
    if(!invAuth) return res.status(401).send('Access Denied-invAuth not found--Cant access allowed hostnames');
    if(invAuth !== config.get('invAuth')) return res.status(403).send('Forbidden--Invalid invAuth');
    next();
}
