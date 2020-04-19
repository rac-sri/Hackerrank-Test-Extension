const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function auth( req, res, next){
  
    try{
        const token = req.header('x-auth-token');
        if(!token) throw new Error('no token provided');
      
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        next();
    }catch(ex){
        
        // const options = {redirect: true};

        // if(options.redirect === true )
        // {
            // console.log('aa');    
            
            
            return res.status(401).send({redirect:'auth'});
        // }   
        // else return res.status(403).send('Invalid Token');
        
    }
    
}