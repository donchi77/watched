const express = require('express');
const { redirectHome } = require('../utility/session');
const api = require('../utility/api_request');
const { check, validationResult } = require('express-validator');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  let { userID } = req.session;
  res.render('index', { title: 'Watched', id: userID, errors: undefined });
});

/* GET login page */
router.get('/login', redirectHome, (req, res) => {
  res.render('login', { title: 'Login', fail: req.session.fail });
  delete req.session.fail;
});

/* GET sign up page */
router.get('/signup', redirectHome, (req, res) => {
  res.render('signup', { title: 'Sign Up', errors: req.session.errors });
  delete req.session.errors;
});

/* GET search page */
router.get('/search', check('title').notEmpty(), (req, res) => {
  let errors = validationResult(req);
  let { userID } = req.session;
  let title = req.query.title;

  if (!errors.isEmpty())
    res.status(300).render('index', { title: 'Watched', id: userID,  errors: errors.array() });

  if (title) {
    api.search(title, undefined, (err, results) => {
      if (err) console.error(err);

      let data = JSON.parse(results);
      console.log(data);

      res.render('search', { title: title, id: userID, data: data });
    });
  }
});

/* GET film page with all information */
router.get('/film/:id', (req, res) => {
  let { userID } = req.session;
  let idFilm = req.params['id'].replace(':', '');

  api.search(null, idFilm, (err, results) => {
    if (err) console.error(err);

    let data = JSON.parse(results);
    console.log(data);

    res.render('film', { id: userID, idFilm: idFilm, data: data });
  });
});

module.exports = router;
