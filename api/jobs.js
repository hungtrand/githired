var express = require('express');
var router = express.Router();
var jobsContext = require('./../models').jobs;

router.post("/createJob", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var job = jobsContext.build({
        jobTitle: req.body["jobTitle"]
        , jobDescription: req.body["jobDescription"]
        , minimumWage: req.body["jobMinWage"]
        , maximumWage: req.body["jobMaxWage"]
        , setWage: req.body["jobSetWage"]
        , location: req.body.jobAddress["formattedAddress"]
        , userId: req.query["userId"]
    });

    // console.log(job);
    job
        .save()
        .then(function(results) {
            res.send(JSON.stringify(results.dataValues));
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
        , 'jobType'
        , 'position', 'startingDate', 'endDate'
        , 'location', 'userId']
    })
    .then(function(jobs){
        if (jobs){
            res.send(JSON.stringify(jobs));
        } else {
            res.sendStatus(401);
        }
    })
    .catch(function(err){
        res.send(JSON.stringify(err));
    })

});


module.exports = function(app) {
    app.use("/api/jobs", router);
};
