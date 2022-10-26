const express = require('express');
const db = require('../utility/database');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const { redirectHome, redirectLogin } = require('../utility/session');
const router = express.Router();

/*  POST for authentication */
router.post('/login', redirectHome, [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Input value must be and email.'),
  check('passwd')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty.'),
], (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.session.fail = true;

    res.status(400).redirect('/login');
  } else {
    let { email, passwd } = req.body;

    if (email && passwd) {
      try {
        db.query('SELECT salt FROM users WHERE email = ?', [email], (err, results, fields) => {
          if (err) {
            console.error(err);
            return;
          }

          if (results && results.length) {
            let rows = JSON.parse(JSON.stringify(results[0]));
            let hashPasswd = crypto.createHash('sha256').update(passwd + rows.salt).digest('hex');

            db.query('SELECT * FROM users WHERE email = ? AND passwd = ?', [email, hashPasswd], (error, results, fields) => {
              if (error) {
                console.error(error);
                return;
              }

              if (results && results.length) {
                delete req.session.fail;

                req.session.userID = JSON.parse(JSON.stringify(results[0].ID));
                req.session.username = JSON.parse(JSON.stringify(results[0].username));
                
                res.status(301).redirect(req.body.prevPage ? req.body.prevPage : '/user');
              } else {
                req.session.fail = true;

                res.status(400).redirect('/login');
              }
            });
          } else {
            req.session.fail = true;
            res.status(400).redirect('/login');
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
});

/* POST for new user */
router.post('/signup', redirectHome, [
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Invalid email'),
  check('passwd')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isStrongPassword()
    .withMessage('Password must have 1 uppercase, 1 lowercase, 1 number, 1 symbol and 8 at least characters'),
  check('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .matches('[a-zA-Z0-9]+')
    .isLength({ min: 5, max: 16 })
    .withMessage('Username can only contain characters and numbers')
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.errors = errors.array();
    res.status(400).redirect('/signup');
  } else {
    let { username, email, passwd } = req.body;
    if (username && email && passwd) {
      try {
        db.query('SELECT email FROM users WHERE email = ?', [email], (err, results, fields) => {
          if (err) {
            console.error(err);
            return;
          }

          if (results && results.length) {
            req.session.errors = [{ msg: 'Email already exists' }];
            res.status(400).redirect('/signup');
          } else {
            let salt = crypto.randomBytes(32).toString('hex');
            let hashPasswd = crypto.createHash('sha256').update(passwd + salt).digest('hex');
            db.query('INSERT INTO users (email, passwd, salt, username) VALUES (?, ?, ?, ?)',
              [email, hashPasswd, salt, username], (err, results, fields) => {
                delete req.session.errors;
                res.status(200).redirect('/login');
              });
          }
        });
      } catch (err) {
        console.error(err);
        res.status(400).redirect('/signup');
      }
    }
  }
});

router.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err)
      return res.redirect('/private');
      
    res.redirect('/');
  });
});

module.exports = router;