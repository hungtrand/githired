var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skills = require('./../models').skills;
var userSkills = require('./../models').userSkills;

router.get("/:userId/skills", function(req, res, next) {
    var userId = req.params['userId'];

    var skills = [];
    userSkills
        .findAll({ where: { userId: userId } })
        .then(function(skills) {
            console.log(skills);
        });
    res.send('hello');
});

module.exports = function(app) {
    app.use("/api/user", router);
}


