var express = require('express');
var router = express.Router();
var jobsContext = require('./../models').jobs;
var jobSkillsContext = require('./../models').jobSkills;
var skillsContext = require('./../models').skills;

/**
 *  @api {post} /api/jobs/createJob create new jobs.
 *  @apiName Post a New job
 *  @apiGroup Jobs
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to create/add new jobs.
 *  @apiSampleRequest http://localhost:80/api/jobs/createJob
 *  @apiSuccess {String} job The user is successfully create a new job.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "jobTitle" : "Software Process management.",
 *       "jobDescription" : "Must be able to solve the problem with creative solution.",
 *       "minimumWage" : "50",
 *       "maximumWage" : "100",
 *       "setWage" : "80",
 *       "location" : "San Jose",
 *       "jobcreation" : "job successfully created!"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "jobTitle" : "Software Process management.",
 *       "jobDescription" : "Must be able to solve the problem with creative solution.",
 *       "minimumWage" : "50",
 *       "maximumWage" : "100",
 *       "setWage" : "80",
 *       "location" : "San Jose" 
 *     }
 *  
 */
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

/**
 *  @api {put} /api/jobs/:jobId/ user update his/her currently posted jobs.
 *  @apiName Update current posted job
 *  @apiGroup Jobs
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  User uses this method to change his/her currently posting job that belong to job id.
 *  @apiSampleRequest http://localhost:80/api/jobs/:jobId
 *  @apiSuccess {String} jobs The jobs is successfully updated.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         Job is successfully updated!
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
 *       "jobTitle" : "Senior Software Engineer"
 *     }
 *  
 */
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

//view jobs
/**
 *  @api {get} /api/user/jobs/ user views current jobs.
 *  @apiName Get jobs
 *  @apiGroup Jobs
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view all the current jobs.
 *  @apiSampleRequest http://localhost:80/api/user/jobs
 *  @apiSuccess {String} jobs The list of jobs that user's need.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
       [
    {
        "jobId": 1,
        "jobTitle": "Software Engineering",
        "jobDescription": "Testing",
        "minimumWage": 30,
        "maximumWage": 50,
        "setWage": 35,
        "jobType": "Engineering",
        "position": "full time",
        "startingDate": null,
        "endDate": null,
        "location": "San Jose",
        "userId": 1,
        "skills": []
    },
    {
        "jobId": 2,
        "jobTitle": "Software developer",
        "jobDescription": "Develop web application",
        "minimumWage": 30,
        "maximumWage": 60,
        "setWage": 40,
        "jobType": "Web Developer",
        "position": "full stack",
        "startingDate": null,
        "endDate": null,
        "location": "2583 Brenford Drive, San Jose, California, ",
        "userId": 2,
        "skills": [
            {
                "name": "AngularJS",
                "skillId": 22,
                "jobSkills": {
                    "importance": null,
                    "createdAt": "2016-05-11T05:07:45.000Z",
                    "updatedAt": "2016-05-11T05:07:45.000Z",
                    "jobJobId": 2,
                    "skillSkillId": 22
                }
            }
        ]
    },
    {
        "jobId": 3,
        "jobTitle": "Application Developer",
        "jobDescription": "Software Developer",
        "minimumWage": 25,
        "maximumWage": 35,
        "setWage": 30,
        "jobType": "App Developer",
        "position": "full time",
        "startingDate": null,
        "endDate": null,
        "location": "Fremont",
        "userId": 2,
        "skills": []
    },
    {
        "jobId": 4,
        "jobTitle": "Java Developer",
        "jobDescription": "Must be able to handle pressure. \nWrite clean code.\nLive close by. Not a remote job.",
        "minimumWage": 40,
        "maximumWage": 60,
        "setWage": 0,
        "jobType": null,
        "position": null,
        "startingDate": null,
        "endDate": null,
        "location": "800 West Taylor Street, San Jose, California, 95126",
        "userId": 2,
        "skills": [
            {
                "name": "Java",
                "skillId": 4,
                "jobSkills": {
                    "importance": null,
                    "createdAt": "2016-05-11T05:03:13.000Z",
                    "updatedAt": "2016-05-11T05:03:13.000Z",
                    "jobJobId": 4,
                    "skillSkillId": 4
                }
            }
        ]
    }]
    
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
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
