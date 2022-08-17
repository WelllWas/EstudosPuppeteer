const express = require('express');
const router = express.Router();
require('dotenv').config();
const ig = require('./instaBot');

router.get('/insta', async (req, res) => {
    try {
        let user = req.body.user;
        let password = req.body.password;
        let tags = req.body.tags;
        await ig.initialize();
        await ig.login(user, password);
        await ig.likeTagsProcess(tags);
        res.status(201).send("Sucessfully Downloaded!");
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

module.exports = router;