const express = require('express');
const { redirectLogin } = require('../utility/session');
const db = require('../utility/database');
const router = express.Router();

/* GET private page */
router.get('/', redirectLogin, (req, res) => {
    let { userID, username } = req.session;
    let listFilmW, listFilmTW, countFilmW, countFilmTW;

    db.query('SELECT id_api, title, poster FROM film WHERE id_user = ? AND status = ?', [userID, true], (err, results) => {
        if (err) throw err;

        if (results && results.length) {
            listFilmW = JSON.parse(JSON.stringify(results));
            console.log(listFilmW);
            countFilmW = results.length;
        }

        db.query('SELECT id_api, title, poster FROM film WHERE id_user = ? AND status = ?', [userID, false], (err, results) => {
            if (err) throw err;
    
            if (results && results.length) {
                listFilmTW = JSON.parse(JSON.stringify(results));
                console.log(listFilmTW);
                countFilmTW = results.length;
            }

            res.render('private', { title: 'My Profile', id: userID, username: username, 
                list1: listFilmW, list2: listFilmTW, count1: countFilmW, count2: countFilmTW });
        });
    });
});

module.exports = router;