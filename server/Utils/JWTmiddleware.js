const jwt = require('jsonwebtoken');
const User = require('../Repository/UserRepository');
const dotenv = require('dotenv');

dotenv.config();

const auth = async(req, res, next) => {
    
    try {
        const token = req.cookies.key || req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT);
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

}

module.exports = auth;