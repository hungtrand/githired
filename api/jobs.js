var express = require('express');
var router = express.Router();
var jobsContext = require('./../models').jobs;
var jobSkillsContext = require('./../models').jobSkills;
var skillsContext = require('./../models').skills;

router.post("/createJob", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var job = jobsContext.build({
        jobTitle: req.body["jobTitle"]
        , jobDescription: req.body["jobDescription"]
        , minimumWage: req.body["jobMinWage"]
        , maximumWage: req.body["jobMaxWage"]
        , setWage: req.body["jobSetWage"] || 0
        , location: req.body.jobAddress["formattedAddress"]
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
        res.send(JSON.stringify(theJob));
    })
.catch(function(err) {
    res.send(JSON.stringify(err));
});
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
