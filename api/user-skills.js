var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skillsContext = require('./../models').skills;
var userSkills = require('./../models').userSkills;

router.get("/:userId/skills", function(req, res, next) {
    var userId = req.params['userId'];
    usersContext.findOne({ where: { userId: userId }})
    .then(function(user) {
        user.getSkills({
            attributes: ['skillId', 'name'],
            joinTableAttributes: [['userUserId', 'userId'], 'yearsOfExperience'] 
        })
        .then(function(skills) {
            res.send(skills);
        });
    });
});

router.post("/:userId/skills", function(req, res, next) {
    var userId = req.params['userId'];
    var skills = req.body;

    for (var i = 0, l = skills.length; i < l; i++) {
        var skillName = skills[i].name;
        var years = skills[i].userSkills.yearsOfExperience;
        var skillId = skills[i].skillId || 0;
        var toBeDeleted = skills[i].delete || false;
        
        (function(skillName, years, skillId, toBeDeleted) {
        
            skillsContext.findOrCreate({ 
                where : {
                    name: skillName
                },
                defaults: {
                    name: skillName
                }
            })
            .spread(function(theSkill, created) {
                userSkills.findOrCreate({
                    where: {
                        skillSkillId: theSkill.skillId,
                        userUserId: userId
                    },
                    defaults: {
                        userUserId: userId,
                        skillSkillId: theSkill.skillId,
                        yearsOfExperience: years
                    }
                })
                .spread(function(theUserSkill, created) {

                    if (!created) {
                        if (toBeDeleted) {
                            theUserSkill.destroy();
                            console.log(theUserSkill);
                        } else {
                            theUserSkill.yearsOfExperience = years;
                            theUserSkill.save();  
                        }

                    }
                });
            });

        })(skillName, years, skillId, toBeDeleted);
    }

    res.send(201, { success: true});
});

module.exports = function(app) {
    app.use("/api/user", router);
}


