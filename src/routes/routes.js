const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hola Mundo")
});

router.get('/login', (req, res, next) => {
    if (req.query.error === 'access_denied') {
        return res.status(401).send('Debes iniciar sesión para acceder a más funciones de la web...<br> <span> <a href="/">Volver al inicio</a> </span>');
    } else {
        passport.authenticate('discord', {
            failureMessage: true,
        })(req, res, next);
    }

    (req, res) => {
        res.redirect('/')
    }
});

router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.status(202).send(`Sesión cerrada. <br> <span> <a href="/">Volver al inicio</a> </span>`)
    } else {
        res.redirect('/');
    }
});

module.exports = router;