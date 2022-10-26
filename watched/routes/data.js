const express = require('express');
const router = express.Router();
const { redirectLogin } = require('../utility/session');
const { check, validationResult } = require('express-validator');
const db = require('../utility/database');

router.post('/watched', redirectLogin, [
    check('id').trim().notEmpty().matches('[a-zA-Z0-9]+'),
    check('status').isBoolean(),
    check('poster').isURL()
], (req, res) => {
    debugger
    let errors = validationResult(req);

    if (!errors.isEmpty())
        res.status(400).send('Bad Request');
    else {
        let filmID = req.body.id;
        let status = parseInt(req.body.status);
        let userID = req.session.userID;
        let title = req.body.title;
        let poster = req.body.poster;
        debugger

        if (!isNaN(status)) {
            db.query('SELECT * FROM film WHERE id_api = ? AND id_user = ?', [filmID, userID], (err, results, fields) => {
                if (err) {
                    res.status(500).send(JSON.stringify({ response: false, msg: err }));
                    throw err;
                }

                if (results && results.length) {
                    let rows = JSON.parse(JSON.stringify(results[0]));
                    let id = rows.ID;
                    let tempStatus = rows.status.data[0];

                    if (status === tempStatus) {
                        db.promise().query('DELETE FROM film WHERE ID = ?', [id]);
                        res.status(200).send(JSON.stringify({ response: true, status: true, msg: 'deleted' }));
                    } else {
                        db.promise().query('UPDATE film SET status = ? WHERE ID = ?', [!tempStatus, id]);
                        res.status(200).send(JSON.stringify({ response: true, status: !tempStatus, msg: 'updated' }));
                    }
                } else {
                    db.promise().query('INSERT INTO film (id_api, id_user, status, title, poster) VALUES (?, ?, ?, ?, ?)',
                        [filmID, userID, status, title, poster]);
                    res.status(200).send(JSON.stringify({ response: true, status: status, msg: 'added' }));
                }
            });
        }
    }
});

router.get('/status', redirectLogin, check('id').trim().notEmpty().matches('[a-zA-Z0-9]+'), (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty())
        res.status(400).send('Bad Request');
    else {
        let filmID = req.query.id;
        let userID = req.session.userID;

        db.query('SELECT status FROM film WHERE id_api = ? AND id_user = ?', [filmID, userID], (err, results, fields) => {
            if (err) {
                res.status(500).send(JSON.stringify({ response: false, msg: err }));
                throw err;
            }

            if (results && results.length) {
                let row = JSON.parse(JSON.stringify(results[0]));
                let status = row.status.data[0];

                res.status(200).send(JSON.stringify({ response: true, status: status, msg: status ? 'watched' : 'towatch' }));
            } else
                res.status(200).send(JSON.stringify({ response: false, msg: 'empty' }));
        });
    }
});

module.exports = router;