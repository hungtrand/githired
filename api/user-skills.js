var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skillsContext = require('./../models').skills;
var userSkills = require('./../models').userSkills;


/**
 *  @api {get} /api/user/:userId/skills user views skills.
 *  @apiName View skills
 *  @apiGroup User Skills
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view his/her skills.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/skills
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
            {
            "skillId": 1,
            "name": "Software Engineering",
            "userSkills": {
            "userId": 1,
            "yearsOfExperience": 5
                }
            }
        ]
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
router.get("/:userId/skills", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
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



//user add more skills.
/**
 *  @api {post} /api/user/:userId/skills user creates/adds new skills.
 *  @apiName Add user's new skills
 *  @apiGroup Skills
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  User uses this method to add new skills in his/her profile.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/skills
 *  @apiSuccess {String} skills The added new skills.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         New skills added!
        }   
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParam {number} amount user amount
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "skills" : "[Java, C++, keyboardwarrior]"
 *     }
 *  
 */
router.post("/:userId/skills", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
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


