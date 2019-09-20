const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model.js');
const secrets = require('../config/secrets.js'); 

router.post('/register', (req, res) => {
  // implement registration
  
  let user = req.body;

  // create hash version of the password 
  const hash = bcrypt.hashSync(user.password, 10); 

  // set the hash as the password 
  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // create a token using generate token function below
        const token = generateToken(user);
        
        // send back the token 
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  // saves the username of the user 
  const payload = {
    username: user.username,
  };
  // expires in one day 
  const options = {
    expiresIn: '1d',
  };
  // use secret file 
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
