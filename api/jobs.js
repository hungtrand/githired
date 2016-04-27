var express = require('express');
var router = express.Router();
var jobsContext = require('./../models').jobs;

router.post("", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var job = jobsContext.build({
        JobTitle: req.body["inputJobTitle"]
        , JobDescription: req.body["inputJobDescription"]
        , MinimumWage: req.body["minWage"]
        , MaximumWage: req.body["maxWage"]
        , SetWage: req.body["setWage"]
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
        , 'minimumWage', 'maximumWage', 'jobType'
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
