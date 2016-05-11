var express = require('express');
var router = express.Router();
var jobsContext = require('./../models').jobs;
var jobSkillsContext = require('./../models').jobSkills;
var skillsContext = require('./../models').skills;

router.post("/createJob", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var formattedAddress = req.body.jobAddress['number'];
    formattedAddress += ' ' + req.body.jobAddress['street'];   
    formattedAddress += ', ' + req.body.jobAddress['city'];
    formattedAddress += ', ' + req.body.jobAddress['state'];
    formattedAddress += ', ' + req.body.jobAddress['postal'];

    var job = jobsContext.build({
        jobTitle: req.body["jobTitle"]
        , jobDescription: req.body["jobDescription"]
        , minimumWage: req.body["minimumWage"] || 0
        , maximumWage: req.body["maximumWage"] || 0
        , setWage: req.body["setWage"] || 0
        , location: formattedAddress
        , userId: req.query["userId"]
    });

    var skills = req.body['skills'];

    job
        .save()
        .then(function(theJob) {
            for (var i = 0, l = skills.length; i < l; i++) {
                var skillName = skills[i].name;

                (function(skillName) {

                    skillsContext.findOrCreate({ 
                        where : {
                            name: skillName
                        },
                        defaults: {
                            name: skillName
                        }
                    })
                    .spread(function(theSkill, created) {
                        jobSkillsContext.findOrCreate({
                            where: {
                                skillSkillId: theSkill.skillId,
                            jobJobId: theJob.jobId
                            },
                            defaults: {
                                jobJobId: theJob.jobId,
                            skillSkillId: theSkill.skillId
                            }
                        })
                        .spread(function(theJobSkill, created) {
                            console.log("########### created #######");
                            console.log(theJobSkill);
                            console.log("############################");
                        });
                    });

                })(skillName);
            }

            jobsContext.findOne(
                    { 
                        where: { jobId: theJob.jobId },
            include: [
            { 
                model: skillsContext,
            attributes: ['name', 'skillId'],
            as: 'skills',
            required: false
            }
            ]
                    }
                    ).then(function(foundJob) {
                        foundJob.skills = skills;
                        res.send(JSON.stringify(foundJob));
                    }).catch(function(err) {
                        res.send(500, JSON.stringify(err));
                    });
        }).catch(function(err) {
            res.send(500, JSON.stringify(err));
        });
});

router.put("/:jobId", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var formattedAddress = req.body.jobAddress['number'];
    formattedAddress += ' ' + req.body.jobAddress['street'];   
    formattedAddress += ', ' + req.body.jobAddress['city'];
    formattedAddress += ', ' + req.body.jobAddress['state'];
    formattedAddress += ', ' + req.body.jobAddress['postal'];
    var jobId = req.params['jobId'];
    
    var skills = req.body['skills'];
    for (var i = 0, l = skills.length; i < l; i++) {
        var skillName = skills[i].name;
        var skillId = skills[i].skillId || 0;
        var toBeDeleted = skills[i].delete || false;
        var lastOne = false;
        if (i == l - 1) lastOne = true;
        
        (function(skillName, skillId, toBeDeleted, lastOne) {
        
            skillsContext.findOrCreate({ 
                where : {
                    name: skillName
                },
                defaults: {
                    name: skillName
                }
            })
            .spread(function(theSkill, created) {
                jobSkillsContext.findOrCreate({
                    where: {
                        skillSkillId: theSkill.skillId,
                        jobJobId: jobId
                    },
                    defaults: {
                        jobJobId: jobId,
                        skillSkillId: theSkill.skillId
                    }
                })
                .spread(function(theJobSkill, created) {

                    if (!created) {
                        if (toBeDeleted) {
                            theJobSkill.destroy();
                            console.log(theJobSkill);
                        } else {
                            theJobSkill.save();  
                        }

                    }
                    
                    if (lastOne) {
                        jobsContext.findOne(
                                { 
                                    where: { jobId: jobId },
                                include: [
                                    { 
                                        model: skillsContext,
                                        attributes: ['name', 'skillId'],
                                        as: 'skills',
                                        required: false
                                    }
                                    ]
                                }
                                ).then(function(foundJob) {
                                    foundJob.jobTitle = req.body['jobTitle'];
                                    foundJob.jobDescription = req.body['jobDescription'];
                                    foundJob.minimumWage = req.body['minimumWage'];
                                    foundJob.maximumWage = req.body['maximumWage'];
                                    foundJob.setWage = req.body['setWage'];
                                    foundJob.location = formattedAddress;

                                    foundJob.save().then(function() {
                                        res.send(200, JSON.stringify(foundJob));
                                    }).catch(function(err) {
                                        res.send(500, JSON.stringify(err));
                                    });
                                }).catch(function(err) {
                                    res.send(500, JSON.stringify(err));
                                }); 
                    }

                });
            });

        })(skillName, skillId, toBeDeleted, lastOne);
    }
});

router.get("", function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    jobsContext.findAll({

        attributes: ['jobId', 'jobTitle', 'jobDescription'
        , 'minimumWage', 'maximumWage', 'setWage' 
        , 'jobType', 'position', 'startingDate', 'endDate'
        , 'location', 'userId'],
        include: [
    { 
        model: skillsContext,
        attributes: ['name', 'skillId'],
        as: 'skills',
        required: false
    }
    ]
    })
    .then(function(jobs){
        if (jobs){
            res.send(JSON.stringify(jobs));
        } else {
            res.send(401, JSON.stringify(jobs));
        }
    })
    .catch(function(err){
        res.send(500, JSON.stringify(err));
    })

});

router.post("", function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    var skills = req.body['skills'];
    var skillsCond = [];
    for (var i = 0, l = skills.length; i < l; i ++) {
        var c = { name: { $like: skills[i] }};
        skillsCond.push(c);
    }

    jobsContext.findAll({

        attributes: ['jobId', 'jobTitle', 'jobDescription'
        , 'minimumWage', 'maximumWage', 'setWage' 
        , 'jobType', 'position', 'startingDate', 'endDate'
        , 'location', 'userId'],
        include: [
    { 
        model: skillsContext,
        attributes: ['name', 'skillId'],
        as: 'skills',
        required: true,
        where: {
            $or: skillsCond
        }
    }
    ]
    })
    .then(function(jobs){
        if (jobs){
            res.send(JSON.stringify(jobs));
        } else {
            res.send(401, JSON.stringify(jobs));
        }
    })
    .catch(function(err){
        res.send(500, JSON.stringify(err));
    })

});



module.exports = function(app) {
    app.use("/api/jobs", router);
};
